import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const STORAGE_KEY = 'hc_disclaimer_dismissed';

const MedicalDisclaimer: React.FC = () => {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, String(dismissed)); } catch {}
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-6 relative">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-amber-400 hover:text-amber-600 transition-colors p-1 rounded-lg hover:bg-amber-100"
        title={t('mdDismiss')}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-amber-900 mb-1">{t('mdTitle')}</h4>
          <p className="text-xs text-amber-800 leading-relaxed">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
