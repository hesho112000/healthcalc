import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallBanner: React.FC = () => {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem('hc_install_dismissed') === 'true'; } catch { return false; }
  });

  useEffect(() => {
    if (dismissed) return;
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    const iosCheck = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (iosCheck && !(window.navigator as any).standalone) {
      setShowBanner(true);
    }
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [dismissed]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setShowBanner(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    try { localStorage.setItem('hc_install_dismissed', 'true'); } catch {}
  };

  if (!showBanner || dismissed) return null;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[60] animate-slideUp">
      <div className="bg-white rounded-2xl shadow-elevated border border-gray-100 p-4 flex items-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-sage-500 rounded-xl flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 mb-0.5">{t('installTitle')}</p>
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            {isIOS
              ? t('installIosHint')
              : t('installHint')}
          </p>
          <div className="flex items-center gap-2">
            {!isIOS && deferredPrompt && (
              <button onClick={handleInstall} className="btn-primary text-xs py-1.5 px-4">
                {t('installBtn')}
              </button>
            )}
            <button onClick={handleDismiss} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              {t('installNotNow')}
            </button>
          </div>
        </div>
        <button onClick={handleDismiss} className="text-gray-300 hover:text-gray-500 transition-colors shrink-0 p-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InstallBanner;
