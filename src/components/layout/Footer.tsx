import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
    setEmail('');
  };

  return (
    <footer className="premium-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="footer-logo">بصمتك الحيوية <span>🌿</span></Link>
            <p className="footer-desc">
              منصة التغذية العلاجية المتكاملة لمتابعة الضغط والسكري والكوليسترول وحساب عمرك الحيوي بدقة.
            </p>
            <div className="footer-social">
              <a href="#!" aria-label="فيسبوك">f</a>
              <a href="#!" aria-label="انستجرام">ig</a>
              <a href="#!" aria-label="إكس">x</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>المنصة</h4>
            <Link to="/plan">خطتي الغذائية</Link>
            <Link to="/tracking">تتبع الضغط</Link>
            <Link to="/diabetes">تتبع السكري</Link>
            <Link to="/bio-age">حساب العمر الحيوي</Link>
          </div>

          <div className="footer-col">
            <h4>المساعدة</h4>
            <Link to="/faq">الأسئلة الشائعة</Link>
            <Link to="/contact">تواصل معنا</Link>
            <Link to="/privacy">سياسة الخصوصية</Link>
            <Link to="/terms">شروط الاستخدام</Link>
          </div>

          <div className="footer-col">
            <h4>النشرة البريدية</h4>
            <p className="footer-news-text">احصل على نصائح تغذية علاجية أسبوعية.</p>
            <form className="footer-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">{joined ? 'تم الاشتراك' : 'اشترك'}</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 بصمتك الحيوية - جميع الحقوق محفوظة.</span>
          <span>صنع بكل حب في مصر 🇪🇬</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;