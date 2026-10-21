import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { t, dir } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" dir={dir}>
      <button
        type="button"
        aria-label={t('ok')}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="premium-coming-soon-title"
        className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
      >
        <h2 id="premium-coming-soon-title" className="text-xl font-bold text-gray-900">
          {t('healthSuiteLabel')}
        </h2>
        <p className="mt-3 text-base font-semibold text-[#0F4C3A]">Coming Soon — Premium</p>
        <p className="mt-2 text-sm text-gray-500">{t('universe.comingSoon')}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-primary-600 py-3 font-semibold text-white transition-all hover:bg-primary-700"
        >
          {t('ok')}
        </button>
      </section>
    </div>
  );
};

export default CheckoutModal;
