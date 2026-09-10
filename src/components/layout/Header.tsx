import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Globe, Leaf, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
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
          <Link to="/" className="app-header-logo">
            <span className="app-header-logo-icon">
              <Leaf size={20} />
            </span>
            <span>بصمتك الحيوية</span>
          </Link>

          <nav className="app-header-nav">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className={linkClass(link.to, link.exact)}>
                {t(link.key as keyof typeof translations.en)}
              </Link>
            ))}
          </nav>

          <div className="app-header-actions">
            <div className="relative" ref={langRef}>
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
              <span>بصمتك الحيوية</span>
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
            <div className="relative" ref={langRef}>
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