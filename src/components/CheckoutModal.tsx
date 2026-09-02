import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  price: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess, price }) => {
  const { t, dir } = useLanguage();
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState<'form' | 'processing' | 'success' | 'error'>('form');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  useEffect(() => {
    if (isOpen && user) {
      setForm(prev => ({ ...prev, name: user.name || '', email: user.email || '' }));
      setStep('form');
      setErrorMsg('');
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center animate-slideUp">
          <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{t('loginRequired')}</h3>
          <p className="text-sm text-gray-500 mb-6">{t('loginToSubscribe')}</p>
          <button onClick={onClose} className="w-full py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all">{t('ok')}</button>
        </div>
      </div>
    );
  }

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + ' / ' + digits.slice(2);
    return digits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setErrorMsg('');
    try {
      await api.subscribe();
      const profile = await api.getProfile();
      updateUser(profile.user);
      setStep('success');
      setTimeout(() => { onSuccess(); }, 2000);
    } catch (err: any) {
      console.error('Subscription error:', err);
      setStep('error');
      setErrorMsg(err.message || t('coPaymentFailedFallback'));
    }
  };

  const isValid = form.name.trim() && form.email.trim() && form.cardNumber.replace(/\s/g, '').length >= 15 && form.expiry.length >= 7 && form.cvv.length >= 3;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={step === 'processing' ? undefined : onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
        <button
          onClick={step === 'processing' ? undefined : onClose}
          className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all ${step === 'processing' ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-200'}`}
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">{t('unlockPremium')}</h3>
          <p className="text-amber-100 text-sm mt-1">{t('coAnnualSub')}</p>
        </div>

        <div className="p-6">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                <p className="text-sm text-amber-700 font-medium">{t('coAdvancedSuite')}</p>
                <p className="text-3xl font-black text-amber-600">{price}</p>
                <p className="text-xs text-amber-600 mt-1">{t('coAnnualBilling')}</p>
              </div>

              <div>
                <label className="label">{t('coFullName')}</label>
                <input type="text" required placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
              </div>

              <div>
                <label className="label">{t('coEmailAddress')}</label>
                <input type="email" required placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
              </div>

              <div>
                <label className="label">{t('coCardNumber')}</label>
                <div className="relative">
                  <input type="text" required placeholder="4242 4242 4242 4242" value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: formatCardNumber(e.target.value) })} maxLength={19} className={`input-field ${dir === 'rtl' ? 'pl-12 text-left' : 'pl-12'}`} style={{ direction: 'ltr' }} />
                  <div className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-3' : 'left-3'} flex gap-1`}>
                    <div className="w-8 h-5 bg-blue-600 rounded text-[8px] text-white font-bold flex items-center justify-center">VISA</div>
                    <div className="w-8 h-5 bg-red-500 rounded text-[8px] text-white font-bold flex items-center justify-center">MC</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">{t('coExpiryDate')}</label>
                  <input type="text" required placeholder="MM / YY" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })} maxLength={7} className="input-field" style={{ direction: 'ltr' }} />
                </div>
                <div>
                  <label className="label">{t('coCvv')}</label>
                  <div className="relative">
                    <input type="text" required placeholder="123" value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })} maxLength={4} className="input-field" style={{ direction: 'ltr' }} />
                    <svg className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${dir === 'rtl' ? 'left-3' : 'right-3'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                <svg className="w-4 h-4 text-sage-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>{t('coSecurityNote')}</span>
              </div>

              <button type="submit" disabled={!isValid} className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all duration-200 ${isValid ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-xl active:scale-[0.98]' : 'bg-gray-300 cursor-not-allowed'}`}>
                {t('coPay')} {price} →
              </button>
            </form>
          )}

          {step === 'processing' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t('coProcessing')}</h3>
              <p className="text-sm text-gray-500">{t('coVerifyWait')}</p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-12 animate-fadeIn">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t('coPaymentSuccess')}</h3>
              <p className="text-sm text-gray-500 mb-4">{t('coWelcomeSuite')}</p>
              <p className="text-xs text-gray-400">{t('coRedirecting')}</p>
            </div>
          )}

          {step === 'error' && (
            <div className="text-center py-12 animate-fadeIn">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t('coPaymentFailed')}</h3>
              <p className="text-sm text-gray-500 mb-4">{errorMsg}</p>
              <button onClick={() => setStep('form')} className="px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-all">
                {t('coTryAgain')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
