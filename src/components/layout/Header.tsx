import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Language } from '../../types';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const Header: React.FC = () => {
  const { t, language, setLanguage, dir } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchQuery('');
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const navLinks = [
    { path: '/', label: t('navHome') },
    { path: '/smartwatch-sync', label: t('navSmartwatch') },
    { path: '/fitness', label: t('navFitness') },
    { path: '/weight-loss', label: t('navWeight') },
    { path: '/advanced-care', label: t('navAdvanced') },
    { path: '/lab-to-plan', label: t('navLabs') },
  ];

  const currentLang = languages.find((l) => l.code === language);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handleSearchSubmit = () => {
    const q = searchQuery.trim();
    if (!q) return;
    setSearchQuery('');
    setSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="site-header sticky top-0 z-50 bg-white border-b border-[#f1f5f9] backdrop-blur">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="brand-mark flex items-center gap-2.5 shrink-0" aria-label="HealthCalc.ai home">
            <div className="brand-icon w-9 h-9 bg-gradient-to-br from-primary-500 to-sage-500 rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="hidden sm:block">
              <span className="text-lg font-extrabold text-gray-900">Health</span>
              <span className="text-lg font-extrabold text-primary-600">Calc</span>
              <span className="text-xs font-semibold text-sage-500 ml-0.5">.ai</span>
            </span>
          </Link>

          <nav className="hidden lg:flex flex-1" aria-label="Primary">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path ? 'text-[#0f172a]' : 'text-[#475569] hover:text-[#0f172a]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-1.5 shrink-0">
            <div className="relative">
              <button
                onClick={() => { setLangDropdownOpen(!langDropdownOpen); setUserDropdownOpen(false); }}
                aria-label="Select language"
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl hover:bg-gray-50 transition-all text-sm"
              >
                <span className="text-base">{currentLang?.flag}</span>
                <span className="hidden sm:inline font-medium text-gray-600 text-xs">{currentLang?.code.toUpperCase()}</span>
                <svg className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangDropdownOpen(false)} />
                  <div className={`absolute top-full mt-2 bg-white rounded-2xl shadow-elevated border border-gray-100 py-1.5 min-w-[160px] z-50 ${dir === 'rtl' ? 'left-0' : 'right-0'}`}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          const match = location.pathname.match(/^\/(en|fr|es|ar)\/landing\/(.+)$/);
                          if (match) {
                            navigate(`/${lang.code}/landing/${match[2]}`, { replace: true });
                          }
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all hover:bg-gray-50 ${
                          language === lang.code ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-gray-600'
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => { setSearchOpen((o) => !o); setLangDropdownOpen(false); setUserDropdownOpen(false); }}
                aria-label={t('searchPlaceholder')}
                aria-expanded={searchOpen}
                className="flex items-center justify-center w-10 h-10 bg-[#f8fafc] border border-[#e2e8f0] rounded-full hover:bg-white hover:shadow-sm transition-all"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {searchOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSearchOpen(false)} />
                  <div
                    className={`absolute z-50 w-[320px] max-w-[calc(100vw-2rem)] bg-white border border-[#e2e8f0] rounded-2xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.1)] ${dir === 'rtl' ? 'left-0' : 'right-0'}`}
                    style={{ top: 48 }}
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={t('searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSearchSubmit(); }}
                      className="w-full p-3 border border-[#e2e8f0] rounded-[10px] text-sm text-gray-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/30 transition-all"
                    />
                  </div>
                </>
              )}
            </div>

            {isAuthenticated ? (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => { setUserDropdownOpen(!userDropdownOpen); setLangDropdownOpen(false); }}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-white">{user?.name?.charAt(0)?.toUpperCase()}</span>
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-gray-700 max-w-[80px] truncate">{user?.name}</span>
                  <svg className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} />
                    <div className={`absolute top-full mt-2 bg-white rounded-2xl shadow-elevated border border-gray-100 py-1.5 min-w-[200px] z-50 ${dir === 'rtl' ? 'left-0' : 'right-0'}`}>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-all"
                      >
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                        </svg>
                        {t('headerDashboard')}
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                          </svg>
                          {t('headerSignOut')}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-0.5">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-[#475569] hover:text-[#0f172a] hover:bg-gray-50 transition-all"
                >
                  {t('headerSignIn')}
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
                >
                  {t('heroCTA')}
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-all"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 animate-fade-in" onClick={() => setMobileMenuOpen(false)} />
          <div
            className={`absolute inset-y-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-80 max-w-[85%] bg-white shadow-2xl flex flex-col`}
            style={{ animation: 'careSlide .25s ease-out' }}
            role="dialog"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="flex items-center gap-2">
                <span className="brand-icon w-8 h-8 bg-gradient-to-br from-primary-500 to-sage-500 rounded-xl flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </span>
                <span className="text-base font-extrabold text-gray-900">Health<span className="text-primary-600">Calc</span><span className="text-xs font-semibold text-sage-500">.ai</span></span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 rounded-xl hover:bg-gray-100 transition-all"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 px-4 py-4 overflow-y-auto" aria-label="Mobile">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      location.pathname === link.path
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="border-t border-gray-100 px-4 py-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    {t('headerDashboard')}
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
                  >
                    {t('headerSignOut')}
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    {t('headerSignIn')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-semibold text-white shadow-sm hover:from-emerald-600 hover:to-teal-600 transition-all"
                  >
                    {t('heroCTA')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;