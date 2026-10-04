import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

const SUPPORTED: Language[] = ['en', 'fr', 'es', 'ar', 'de'];

function resolveInitialLanguage(): Language {
  const saved = localStorage.getItem('healthcalc-lang');
  if (saved && (SUPPORTED as string[]).includes(saved)) return saved as Language;
  return 'en';
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  dir: 'ltr' | 'rtl';
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

  useEffect(() => {
    document.documentElement.dir = languageConfig[language].dir;
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('healthcalc-lang', lang);
  };

  const t = (key: keyof typeof translations.en): string => {
    const val = translations[language]?.[key] ?? translations.en[key] ?? key;
    return typeof val === 'string' ? val : val.title;
  };

  const dir = languageConfig[language].dir;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, dir }}>
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
