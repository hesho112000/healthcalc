import React, { useState } from 'react';
import { useAuth, hasPremiumAccess } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import CheckoutModal from './CheckoutModal';

interface PremiumGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PremiumGate: React.FC<PremiumGateProps> = ({ children, fallback }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [showCheckout, setShowCheckout] = useState(false);
  const isPremium = hasPremiumAccess(user);

  if (isPremium) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] rounded-2xl flex items-center justify-center">
          <div className="text-center p-6 max-w-xs">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">{t('premiumRequired') || 'Premium Required'}</h4>
            <p className="text-xs text-gray-500 mb-3">{t('premiumUnlockDescription') || 'Unlock the Advanced Health Suite with full access to all condition modules.'}</p>
            <button
              onClick={() => setShowCheckout(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm"
            >
              {t('upgradeToPremium') || 'Upgrade — $15/year'}
            </button>
          </div>
        </div>
        <div className="opacity-40 pointer-events-none select-none">{children}</div>
      </div>
      <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} onSuccess={() => setShowCheckout(false)} price="$15/year" />
    </>
  );
};

export default PremiumGate;
