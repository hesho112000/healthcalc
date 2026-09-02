import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

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
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('healthcalc-lang');
    const lang = (saved as Language) || 'en';
    document.documentElement.dir = languageConfig[lang].dir;
    document.documentElement.lang = lang;
    return lang;
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('healthcalc-lang', lang);
    document.documentElement.dir = languageConfig[lang].dir;
    document.documentElement.lang = lang;
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
