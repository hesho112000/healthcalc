import { Router } from 'express';
import db from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();

router.post('/', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    const { module, inputs, results, notes } = req.body;

    if (!module || !inputs || !results) {
      return res.status(400).json({ error: 'Module, inputs, and results are required' });
    }

    const allowedModules = ['weight-loss', 'diabetes', 'premium-ibs', 'premium-gout', 'premium-kidney', 'premium-liver', 'premium-cholesterol', 'premium-thyroid'];
    if (!allowedModules.includes(module)) {
      return res.status(400).json({ error: 'Invalid module type' });
    }

    const result = db.prepare(
      'INSERT INTO health_history (user_id, module, inputs, results, notes) VALUES (?, ?, ?, ?, ?)'
    ).run(userId, module, JSON.stringify(inputs), JSON.stringify(results), notes || '');

    res.status(201).json({
      id: result.lastInsertRowid,
      message: 'Health data saved successfully',
    });
  } catch (err) {
    console.error('Save health data error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    const { module, limit = 50, offset = 0 } = req.query;

    let query = 'SELECT * FROM health_history WHERE user_id = ?';
    const params = [userId];

    if (module) {
      query += ' AND module = ?';
      params.push(module);
    }

    query += ' ORDER BY date DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const rows = db.prepare(query).all(...params);

    const total = db.prepare(
      module
        ? 'SELECT COUNT(*) as count FROM health_history WHERE user_id = ? AND module = ?'
        : 'SELECT COUNT(*) as count FROM health_history WHERE user_id = ?'
    ).get(...(module ? [userId, module] : [userId]));

    const parsed = rows.map((row) => ({
      ...row,
      inputs: JSON.parse(row.inputs),
      results: JSON.parse(row.results),
    }));

    res.json({ data: parsed, total: total.count });
  } catch (err) {
    console.error('Get health data error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const row = db.prepare('SELECT * FROM health_history WHERE id = ? AND user_id = ?').get(id, userId);
    if (!row) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({
      ...row,
      inputs: JSON.parse(row.inputs),
      results: JSON.parse(row.results),
    });
  } catch (err) {
    console.error('Get single record error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const row = db.prepare('SELECT * FROM health_history WHERE id = ? AND user_id = ?').get(id, userId);
    if (!row) {
      return res.status(404).json({ error: 'Record not found' });
    }

    db.prepare('DELETE FROM health_history WHERE id = ? AND user_id = ?').run(id, userId);
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    console.error('Delete record error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/stats/summary', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;

    const totalRecords = db.prepare('SELECT COUNT(*) as count FROM health_history WHERE user_id = ?').get(userId);
    const byModule = db.prepare(
      'SELECT module, COUNT(*) as count, MIN(date) as first_entry, MAX(date) as last_entry FROM health_history WHERE user_id = ? GROUP BY module'
    ).all(userId);
    const recentEntries = db.prepare(
      'SELECT id, date, module FROM health_history WHERE user_id = ? ORDER BY date DESC LIMIT 5'
    ).all(userId);

    res.json({
      totalRecords: totalRecords.count,
      byModule,
      recentEntries,
    });
  } catch (err) {
    console.error('Get stats error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
