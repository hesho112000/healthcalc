import { Router } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js';
import { generateToken, authMiddleware } from '../auth.js';

const router = Router();

router.post('/register', (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const result = db.prepare(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)'
    ).run(name, email.toLowerCase().trim(), passwordHash);

    const user = { id: result.lastInsertRowid, name, email: email.toLowerCase().trim() };
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, subscription_status: 'free', subscription_end_date: null },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim());
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = bcrypt.compareSync(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken({ id: user.id, email: user.email, name: user.name });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        subscription_status: user.subscription_status,
        subscription_end_date: user.subscription_end_date,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/me', authMiddleware, (req, res) => {
  try {
    const user = db.prepare('SELECT id, name, email, subscription_status, subscription_end_date, created_at FROM users WHERE id = ?').get(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/me', authMiddleware, (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name is required' });
    }

    db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name.trim(), req.user.id);
    const user = db.prepare('SELECT id, name, email, subscription_status, subscription_end_date, created_at FROM users WHERE id = ?').get(req.user.id);
    res.json({ user });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/me/password', authMiddleware, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
    const valid = bcrypt.compareSync(currentPassword, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, req.user.id);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/subscribe', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const endDate = new Date(now);
    endDate.setFullYear(endDate.getFullYear() + 1);

    const startDateStr = now.toISOString();
    const endDateStr = endDate.toISOString();

    db.prepare(
      'INSERT INTO subscriptions (user_id, plan_type, price, currency, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(userId, 'annual', 15.00, 'USD', startDateStr, endDateStr, 'active');

    db.prepare(
      'UPDATE users SET subscription_status = ?, subscription_end_date = ? WHERE id = ?'
    ).run('premium', endDateStr, userId);

    const user = db.prepare('SELECT id, name, email, subscription_status, subscription_end_date, created_at FROM users WHERE id = ?').get(userId);

    res.json({ user, message: 'Subscription activated successfully' });
  } catch (err) {
    console.error('Subscribe error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/unsubscribe', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;

    db.prepare(
      'UPDATE subscriptions SET status = ? WHERE user_id = ? AND status = ?'
    ).run('cancelled', userId, 'active');

    db.prepare(
      'UPDATE users SET subscription_status = ?, subscription_end_date = ? WHERE id = ?'
    ).run('free', null, userId);

    const user = db.prepare('SELECT id, name, email, subscription_status, subscription_end_date, created_at FROM users WHERE id = ?').get(userId);

    res.json({ user, message: 'Subscription cancelled' });
  } catch (err) {
    console.error('Unsubscribe error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
