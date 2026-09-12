import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Globe, Leaf, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAdmin } from '../../context/AdminContext';
import { translations } from '../../i18n/translations';
import type { Language } from '../../types';

const languageOptions: { code: Language; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'ar', flag: '🇸🇦', label: 'العربية' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const { t, language, setLanguage, dir } = useLanguage();
  const { isAdmin, disableAdmin } = useAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const drawerLangRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
    setAdminOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktop = desktopLangRef.current?.contains(target);
      const insideDrawer = drawerLangRef.current?.contains(target);
      const insideAdmin = adminRef.current?.contains(target);
      if (!insideDesktop && !insideDrawer && !insideAdmin) {
        setLangOpen(false);
        setAdminOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  const links: { to: string; exact?: boolean; key: string }[] = [
    { to: '/', key: 'nav.home', exact: true },
    { to: '/fitness', key: 'nav.calculators' },
    { to: '/advanced-care', key: 'nav.advancedCare' },
    { to: '/articles', key: 'nav.resources' },
    { to: '/about', key: 'nav.about' },
    { to: '/contact', key: 'nav.contact' },
  ];

  const isActive = (to: string, exact?: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  const linkClass = (to: string, exact?: boolean) =>
    `app-header-link${isActive(to, exact) ? ' active' : ''}`;

  return (
    <>
      <header className="app-header" dir={dir}>
        <div className="app-header-inner">
          <div className="flex items-center gap-3">
          <Link to="/" className="app-header-logo">
            <span className="app-header-logo-icon">
              <Leaf size={20} />
            </span>
            <span>{t('brandName')}</span>
          </Link>

          {isAdmin && (
            <div className="relative" ref={adminRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={adminOpen}
                onClick={() => setAdminOpen((o) => !o)}
                className="inline-flex items-center gap-1 rounded-full bg-[#D4AF37] text-[#0F4C3A] px-2.5 py-1 text-[10px] font-extrabold tracking-wide whitespace-nowrap hover:shadow-[0_4px_14px_rgba(212,175,55,0.45)] transition-shadow"
              >
                🔑 {t('admin.badge.label')}
              </button>
              {adminOpen && (
                <div className="absolute top-full mt-2 end-0 z-50 min-w-[200px] rounded-2xl bg-white border border-[#EFEBE4] shadow-[0_12px_32px_rgba(15,76,58,0.12)] p-2">
                  <button
                    type="button"
                    onClick={() => {
                      disableAdmin();
                      setAdminOpen(false);
                    }}
                    className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-start text-sm font-bold text-[#B91C1C] hover:bg-[#FDFBF7] transition-colors"
                  >
                    🔓 {t('admin.badge.disable')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

          <nav className="app-header-nav">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className={linkClass(link.to, link.exact)}>
                {t(link.key as keyof typeof translations.en)}
              </Link>
            ))}
          </nav>

          <div className="app-header-actions">
            <div className="relative" ref={desktopLangRef}>
              <button
                type="button"
                className="app-header-lang"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((o) => !o)}
              >
                <Globe size={16} />
                <span>{language.toUpperCase()}</span>
                <ChevronDown size={14} className={`app-header-lang-caret${langOpen ? ' open' : ''}`} />
              </button>
              {langOpen && (
                <div className="app-header-lang-menu">
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      className={`app-header-lang-option${language === opt.code ? ' active' : ''}`}
                      onClick={() => {
                        setLanguage(opt.code);
                        setLangOpen(false);
                      }}
                    >
                      <span>{opt.flag}</span> {opt.label}
                      {language === opt.code && <span className="app-header-lang-check">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/login" className="app-header-login">{t('nav.login')}</Link>
            <Link to="/wizard/step1" className="app-header-start">{t('nav.startNow')}</Link>
          </div>

          <button
            type="button"
            className="app-header-burger"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div className={`app-header-drawer${mobileOpen ? ' open' : ''}`}>
          <div className="app-header-drawer-head">
            <Link to="/" className="app-header-logo" onClick={() => setMobileOpen(false)}>
              <span className="app-header-logo-icon">
                <Leaf size={20} />
              </span>
              <span>{t('brandName')}</span>
            </Link>
          </div>

          <nav className="app-header-drawer-nav">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={linkClass(link.to, link.exact)}
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key as keyof typeof translations.en)}
              </Link>
            ))}
          </nav>

          <div className="app-header-drawer-actions">
            <div className="relative" ref={drawerLangRef}>
              <button
                type="button"
                className="app-header-lang app-header-lang-full"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((o) => !o)}
              >
                <Globe size={16} />
                <span>{language.toUpperCase()}</span>
                <ChevronDown size={14} className={`app-header-lang-caret${langOpen ? ' open' : ''}`} />
              </button>
              {langOpen && (
                <div className="app-header-lang-menu app-header-lang-menu-static">
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      className={`app-header-lang-option${language === opt.code ? ' active' : ''}`}
                      onClick={() => {
                        setLanguage(opt.code);
                        setLangOpen(false);
                      }}
                    >
                      <span>{opt.flag}</span> {opt.label}
                      {language === opt.code && <span className="app-header-lang-check">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/login" className="app-header-login" onClick={() => setMobileOpen(false)}>
              {t('nav.login')}
            </Link>
            <Link to="/wizard/step1" className="app-header-start" onClick={() => setMobileOpen(false)}>
              {t('nav.startNow')}
            </Link>
          </div>
        </div>

        {mobileOpen && (
          <button
            type="button"
            className="app-header-overlay"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </header>
    </>
  );
};

export default Header;