import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { to: '/', label: 'الرئيسية' },
    { to: '/plan', label: 'خطتي' },
    { to: '/tracking', label: 'تتبع الأمراض' },
    { to: '/articles', label: 'المقالات' },
    { to: '/about', label: 'عن المنصة' },
  ];

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <nav className={`premium-navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <span>🌿</span> بصمتك الحيوية
          </Link>

          <div className="nav-links">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={isActive(link.to) ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <Link to="/login" className="nav-login">تسجيل الدخول</Link>
            <Link to="/wizard/step1" className="nav-cta" style={{ textDecoration: 'none' }}>
              ابدأ الآن
            </Link>
          </div>

          <button
            className="nav-hamburger"
            aria-label="فتح القائمة"
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`nav-drawer${open ? ' open' : ''}`}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={isActive(link.to) ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/login" onClick={() => setOpen(false)}>تسجيل الدخول</Link>
        <Link to="/wizard/step1" className="nav-cta" style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
          ابدأ الآن
        </Link>
      </div>

      <div className={`nav-overlay${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
    </>
  );
};

export default Header;