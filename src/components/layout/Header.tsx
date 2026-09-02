import React, { useState, useRef, useEffect } from 'react';
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

const searchPages = [
  { path: '/fitness', title: 'Fitness Calculators', keywords: 'bmi bmr tdee calorie ideal weight calculator', icon: '⚖️' },
  { path: '/weight-loss', title: 'Weight & Fitness Plans', keywords: 'weight loss meal plan workout 30 day calorie deficit', icon: '🏋️' },
  { path: '/workout-plan', title: 'Workout Plan Builder', keywords: 'workout exercise trainer gym strength cardio hiit routine weekly plan builder', icon: '💪' },
  { path: '/diabetes', title: 'Diabetes Management', keywords: 'diabetes glucose hba1c blood sugar lab interpreter bp', icon: '🩸' },
  { path: '/lab-to-plan', title: 'Lab-to-Plan Engine', keywords: 'lab results blood work interpretation personalized plan', icon: '🔬' },
  { path: '/smartwatch-sync', title: 'Smartwatch Sync', keywords: 'smartwatch apple health google health connect fitness tracker watch sync wearable', icon: '⌚' },
  { path: '/premium', title: 'Advanced Care Plans', keywords: 'ibs gout kidney liver cholesterol thyroid hypertension premium', icon: '✨' },
  { path: '/privacy', title: 'Privacy Policy', keywords: 'privacy data protection gdpr', icon: '🔒' },
  { path: '/terms', title: 'Terms of Service', keywords: 'terms conditions legal', icon: '📜' },
  { path: '/contact', title: 'Contact Us', keywords: 'contact support help email', icon: '📧' },
];

const Header: React.FC = () => {
  const { t, language, setLanguage, dir } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredResults = searchQuery.trim().length > 1
    ? searchPages.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.keywords.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        (searchRef.current && searchRef.current.contains(target)) ||
        (mobileSearchRef.current && mobileSearchRef.current.contains(target))
      ) return;
      setSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSearchQuery('');
    setSearchOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSelect = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setSearchOpen(false);
  };

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/smartwatch-sync', label: `⌚ ${t('swNav')}` },
    { path: '/fitness', label: t('fcNav') },
    { path: '/workout-plan', label: `💪 ${t('workoutPlan')}` },
    { path: '/weight-loss', label: t('weightLoss') },
    { path: '/diabetes', label: t('diabetes') },
    { path: '/lab-to-plan', label: 'Lab-to-Plan' },
    { path: '/premium', label: t('premium') },
  ];

  const currentLang = languages.find((l) => l.code === language);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-sage-500 rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-extrabold text-gray-900">Health</span>
              <span className="text-lg font-extrabold text-primary-600">Calc</span>
              <span className="text-xs font-semibold text-sage-500 ml-0.5">.ai</span>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8" ref={searchRef}>
            <div className="relative w-full">
              <svg className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                className={`w-full py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:border-primary-300 transition-all ${dir === 'rtl' ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'}`}
              />
              {searchOpen && filteredResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-elevated border border-gray-100 py-2 z-50 animate-fade-in">
                  {filteredResults.map((page) => (
                    <button
                      key={page.path}
                      onClick={() => handleSearchSelect(page.path)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-all"
                    >
                      <span className="text-lg">{page.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{page.title}</span>
                    </button>
                  ))}
                </div>
              )}
              {searchOpen && searchQuery.trim().length > 1 && filteredResults.length === 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-elevated border border-gray-100 py-6 z-50 text-center animate-fade-in">
                  <p className="text-sm text-gray-400">{t('headerNoResults')} "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <div className="relative">
              <button
                onClick={() => { setLangDropdownOpen(!langDropdownOpen); setUserDropdownOpen(false); }}
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

            {isAuthenticated ? (
              <div className="relative">
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
              <div className="flex items-center gap-1.5">
                <Link
                  to="/login"
                  className="hidden sm:inline-flex px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                >
                  {t('headerSignIn')}
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex px-4 py-2 rounded-xl text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-all shadow-sm"
                >
                  {t('headerSignUp')}
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        <div className="lg:hidden border-t border-gray-100 bg-white animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            <div className="relative mb-3" ref={mobileSearchRef}>
              <svg className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                className={`w-full py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400/40 ${dir === 'rtl' ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'}`}
              />
              {searchOpen && filteredResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-elevated border border-gray-100 py-2 z-50">
                  {filteredResults.map((page) => (
                    <button
                      key={page.path}
                      onClick={() => { handleSearchSelect(page.path); setMobileMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-all"
                    >
                      <span className="text-lg">{page.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{page.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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
            <div className="border-t border-gray-100 mt-2 pt-2">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    {t('headerDashboard')}
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50">
                    {t('headerSignOut')}
                  </button>
                </>
              ) : (
                <div className="flex gap-2 px-4">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50">
                    {t('headerSignIn')}
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700">
                    {t('headerSignUp')}
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
