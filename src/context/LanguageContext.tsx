import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Language } from '../types';
import type { TranslationKeys } from '../i18n/translationTypes';

const SUPPORTED: Language[] = ['en', 'fr', 'es', 'ar', 'de'];

const loadLocale: Record<Language, () => Promise<TranslationKeys>> = {
  en: () => import('../i18n/locales/en').then((module) => module.default),
  fr: () => import('../i18n/locales/fr').then((module) => module.default),
  es: () => import('../i18n/locales/es').then((module) => module.default),
  ar: () => import('../i18n/locales/ar').then((module) => module.default),
  de: () => import('../i18n/locales/de').then((module) => module.default),
};

function resolveInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const queryLanguage = new URLSearchParams(window.location.search).get('lang');
    if (queryLanguage && (SUPPORTED as string[]).includes(queryLanguage)) {
      try {
        window.localStorage.setItem('healthcalc-lang', queryLanguage);
      } catch {
        // Continue with the URL language when browser storage is unavailable.
      }
      return queryLanguage as Language;
    }

    try {
      const saved = window.localStorage.getItem('healthcalc-lang');
      if (saved && (SUPPORTED as string[]).includes(saved)) return saved as Language;
    } catch {
      // Fall back to English when browser storage is unavailable.
    }
  }
  return 'en';
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
  dir: 'ltr' | 'rtl';
  dictionary: TranslationKeys | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languageConfig: Record<Language, { dir: 'ltr' | 'rtl' }> = {
  en: { dir: 'ltr' },
  fr: { dir: 'ltr' },
  es: { dir: 'ltr' },
  ar: { dir: 'rtl' },
  de: { dir: 'ltr' },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(resolveInitialLanguage);
  const [dictionary, setDictionary] = useState<TranslationKeys | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadLocale[language]().then((locale) => {
      if (!cancelled) setDictionary(locale);
    });
    return () => {
      cancelled = true;
    };
  }, [language]);

  useEffect(() => {
    document.documentElement.dir = languageConfig[language].dir;
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    if (lang !== language) {
      setLanguage(lang);
      setDictionary(null);
    }
    try {
      localStorage.setItem('healthcalc-lang', lang);
    } catch {
      // Language selection still applies for this session when storage is unavailable.
    }
  };

  const t = (key: keyof TranslationKeys): string => {
    const val = dictionary?.[key] ?? key;
    return typeof val === 'string' ? val : val.title;
  };

  const dir = languageConfig[language].dir;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, dir, dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
