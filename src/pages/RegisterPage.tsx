import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ENABLE_PHONE_AUTH } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';

const GoogleIcon: React.FC = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

const RegisterPage: React.FC = () => {
  const { signUp, signInWithGoogle, signInWithPhone, verifyOtp } = useAuth();
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError(t('authPasswordsMatch'));
      return;
    }
    if (form.password.length < 6) {
      setError(t('authPasswordMin6'));
      return;
    }

    setLoading(true);
    try {
      await signUp(form.name, form.email, form.password);
      navigate('/my-health-hub');
    } catch (err: any) {
      setError(err.message || t('authRegisterFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || t('authRegisterFailed'));
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithPhone(phone);
      setOtpSent(true);
    } catch (err: any) {
      setError(err.message || t('authRegisterFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await verifyOtp(phone, otp);
      navigate('/my-health-hub');
    } catch (err: any) {
      setError(err.message || t('authRegisterFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/50 via-white to-sage-50/30 flex items-center justify-center px-4 py-12" dir={dir}>
      <SEO title={t('seo.register.title')} description={t('seo.register.description')} url="/register" />
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-sage-500 rounded-2xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-extrabold text-gray-900">Health</span>
              <span className="text-xl font-extrabold text-primary-600">Calc</span>
              <span className="text-sm font-semibold text-sage-500 ms-0.5">.ai</span>
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{t('authCreateAccount')}</h1>
          <p className="text-sm text-gray-500 mt-1.5">{t('authRegisterDesc')}</p>
        </div>

        <div className="card p-7">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-2xl mb-5 flex items-center gap-2.5">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              {error}
            </div>
          )}

          {ENABLE_PHONE_AUTH && (
            <div className="grid grid-cols-2 gap-1 rounded-2xl bg-[#F4F1EB]/60 p-1 mb-5">
              <button
                type="button"
                onClick={() => { setMode('email'); setOtpSent(false); setError(''); }}
                className={`py-2 rounded-xl text-sm font-bold transition-all ${mode === 'email' ? 'bg-white text-[#0F4C3A] shadow-sm' : 'text-[#6B7A75] hover:text-[#0F4C3A]'}`}
              >
                {t('auth.tabEmail')}
              </button>
              <button
                type="button"
                onClick={() => { setMode('phone'); setOtpSent(false); setError(''); }}
                className={`py-2 rounded-xl text-sm font-bold transition-all ${mode === 'phone' ? 'bg-white text-[#0F4C3A] shadow-sm' : 'text-[#6B7A75] hover:text-[#0F4C3A]'}`}
              >
                {t('auth.tabPhone')}
              </button>
            </div>
          )}

          {mode === 'email' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">{t('authFullName')}</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">{t('authEmailAddress')}</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">{t('authPassword')}</label>
                <input
                  type="password"
                  required
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">{t('authConfirmPassword')}</label>
                <input
                  type="password"
                  required
                  placeholder={t('authRepeatPassword')}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="input-field"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('authCreatingAccount')}
                  </>
                ) : (
                  t('authCreateAccount')
                )}
              </button>
            </form>
          )}

          {mode === 'phone' && !otpSent && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="label">{t('auth.tabPhone')}</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 555 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                  style={{ direction: 'ltr' }}
                />
                <p className="text-[11px] text-gray-400 mt-1">{t('auth.enterPhone')}</p>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('authCreatingAccount')}
                  </>
                ) : (
                  t('auth.signInWithPhone')
                )}
              </button>
            </form>
          )}

          {mode === 'phone' && otpSent && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="label">{t('auth.enterOtp')}</label>
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="input-field tracking-[0.3em] text-center font-bold"
                  style={{ direction: 'ltr' }}
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('authCreatingAccount')}
                  </>
                ) : (
                  t('auth.verifyOtp')
                )}
              </button>
            </form>
          )}

          <div className="my-5">
            <div className="relative text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <span className="relative px-3 bg-white text-xs font-semibold text-gray-400">{t('auth.orContinueWith')}</span>
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="mt-4 w-full inline-flex items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <GoogleIcon />
              {t('auth.continueWithGoogle')}
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              {t('authAlreadyHave')}{' '}
              <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                {t('authSignIn')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;