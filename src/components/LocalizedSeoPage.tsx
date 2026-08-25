import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Language } from '../types';
import SeoLandingPage, { SeoPageData } from './SeoLandingPage';
import { allSeoPages } from '../data/seo';

const SUPPORTED_LANGS: Language[] = ['en', 'fr', 'es', 'ar'];

const langLabels: Record<Language, { native: string; flag: string }> = {
  en: { native: 'English', flag: '🇺🇸' },
  fr: { native: 'Français', flag: '🇫🇷' },
  es: { native: 'Español', flag: '🇪🇸' },
  ar: { native: 'العربية', flag: '🇸🇦' },
};

const LocalizedSeoPage: React.FC = () => {
  const { lang, slug } = useParams<{ lang: string; slug: string }>();

  const validLang = SUPPORTED_LANGS.includes(lang as Language) ? (lang as Language) : null;

  const pageData = useMemo(() => {
    return allSeoPages.find((p) => p.slug === slug) || null;
  }, [slug]);

  if (!validLang) {
    return <Navigate to={`/en/landing/${slug}`} replace />;
  }

  if (!pageData) {
    return <Navigate to={`/${validLang}`} replace />;
  }

  return (
    <>
      <LanguageSwitcherBar currentLang={validLang} slug={slug!} />
      <SeoLandingPage data={pageData} pageLang={validLang} />
    </>
  );
};

const LanguageSwitcherBar: React.FC<{ currentLang: Language; slug: string }> = ({ currentLang, slug }) => {
  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium hidden sm:inline">
          {currentLang === 'ar' ? 'اختر اللغة' : currentLang === 'fr' ? 'Choisir la langue' : currentLang === 'es' ? 'Elegir idioma' : 'Choose language'}
        </span>
        <div className="flex items-center gap-1 sm:gap-2 mx-auto sm:mx-0">
          {SUPPORTED_LANGS.map((l) => (
            <Link
              key={l}
              to={`/${l}/landing/${slug}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                l === currentLang
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span>{langLabels[l].flag}</span>
              <span className="hidden sm:inline">{langLabels[l].native}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalizedSeoPage;
