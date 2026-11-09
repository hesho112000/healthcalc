import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Language } from '../types';
import type { TranslationKeys } from '../i18n/translationTypes';
import en from '../i18n/locales/en';

const SUPPORTED: Language[] = ['en', 'fr', 'es', 'ar', 'hi', 'de'];

/**
 * Returns a displayable string for a dictionary entry. Some entries are
 * objects (for example `workoutPlanBuilder`), so unwrap their `title`.
 */
function readTranslation(dictionary: TranslationKeys | null, key: keyof TranslationKeys): string | undefined {
  const value = dictionary?.[key];
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && typeof value.title === 'string') return value.title;
  return undefined;
}

const loadLocale: Record<Exclude<Language, 'en'>, () => Promise<TranslationKeys>> = {
  fr: () => import('../i18n/locales/fr').then((module) => module.default),
  es: () => import('../i18n/locales/es').then((module) => module.default),
  ar: () => import('../i18n/locales/ar').then((module) => module.default),
  hi: () => import('../i18n/locales/hi').then((module) => module.default),
  de: () => import('../i18n/locales/de').then((module) => module.default),
};

function resolveInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    // Path-based locale URLs (`/fr/...`, `/hi/...`) take precedence.
    const pathLanguage = window.location.pathname.split('/').filter(Boolean)[0];
    if (pathLanguage && (SUPPORTED as string[]).includes(pathLanguage)) {
      try {
        window.localStorage.setItem('healthcalc-lang', pathLanguage);
      } catch {
        // Continue with the URL language when browser storage is unavailable.
      }
      return pathLanguage as Language;
    }

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
  hi: { dir: 'ltr' },
  de: { dir: 'ltr' },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(resolveInitialLanguage);
  // English is bundled statically so the first paint always has readable text
  // instead of raw dictionary keys while a locale chunk is loading.
  const [dictionary, setDictionary] = useState<TranslationKeys>(en);

  useEffect(() => {
    let cancelled = false;
    const loadSelectedLocale = async () => {
      if (language === 'en') {
        if (!cancelled) setDictionary(en);
        return;
      }

      try {
        const locale = await loadLocale[language]();
        // Merge over English so any key missing from the selected locale
        // gracefully falls back to English rather than a raw key.
        if (!cancelled) setDictionary({ ...en, ...locale });
      } catch {
        if (!cancelled) setDictionary(en);
      }
    };
    void loadSelectedLocale();
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
      // Keep English visible during the switch; never show raw keys.
      setDictionary(en);
    }
    try {
      localStorage.setItem('healthcalc-lang', lang);
    } catch {
      // Language selection still applies for this session when storage is unavailable.
    }
  };

  const t = (key: keyof TranslationKeys): string => {
    const selected = readTranslation(dictionary, key);
    if (selected !== undefined) return selected;

    const fallback = readTranslation(en, key);
    if (fallback !== undefined) return fallback;

    // Last resort: never expose the raw key in the UI.
    if (import.meta.env.DEV) {
      console.warn(`[i18n] Missing translation key: ${String(key)}`);
    }
    return '';
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
