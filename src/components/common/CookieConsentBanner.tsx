import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const CONSENT_KEY = 'cookie_consent_accepted';
const CONSENT_CHOICE_KEY = 'cookie_consent_choice';

const CookieConsentBanner: React.FC = () => {
  const { t, dir } = useLanguage();
  const [consent, setConsentState] = useState<boolean | null>(() => {
    try {
      const choice = localStorage.getItem(CONSENT_CHOICE_KEY);
      if (choice === 'true') return true;
      if (choice === 'false') return false;
      return localStorage.getItem(CONSENT_KEY) === 'true' ? true : null;
    } catch { return null; }
  });

  const setConsent = (value: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, String(value));
      localStorage.setItem(CONSENT_CHOICE_KEY, String(value));
    } catch {}
    setConsentState(value);
  };

  if (consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] p-3 md:p-4" dir={dir} role="dialog" aria-live="polite" aria-label={t('cookiePolicy')}>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-elevated border border-gray-100 p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-sage-500 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 mb-0.5">{t('cookiePolicy')}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{t('cookieConsentText')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 md:justify-end">
          <Link
            to="/cookies"
            className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors underline underline-offset-2"
          >
            {t('cookieConsentLearnMore')}
          </Link>
          <button onClick={() => setConsent(false)} className="text-xs font-semibold text-gray-700 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50">
            {t('cookieConsentDecline')}
          </button>
          <button onClick={() => setConsent(true)} className="btn-primary text-xs py-2 px-5">
            {t('cookieConsentAccept')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
