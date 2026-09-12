import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, KeyRound } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

const AdminLoginPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const { isAdmin, enableAdmin } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      navigate('/advanced-care', { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleSubmit = () => {
    if (enableAdmin(password)) {
      navigate('/advanced-care');
      return;
    }
    setError(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4 py-12" dir={dir}>
      <div className="w-full max-w-md">
        <div className="rounded-[32px] border border-[#EFEBE4] bg-white p-8 sm:p-10 shadow-[0_18px_50px_rgba(15,76,58,0.08)] text-center">
          <span className="mx-auto w-16 h-16 rounded-full bg-[#F4F1EB] flex items-center justify-center text-3xl">
            🛡️
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-[#0F4C3A] leading-tight">
            {t('admin.login.title')}
          </h1>
          <p className="mt-2 text-sm text-[#6B7A75] leading-relaxed">
            {t('admin.login.subtitle')}
          </p>

          <form
            className="mt-7 text-start"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <label className="block">
              <span className="text-sm font-bold text-[#0F4C3A]">{t('admin.login.password')}</span>
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder={t('admin.login.password')}
                className="mt-2 w-full rounded-2xl border border-transparent bg-[#F4F1EB] px-4 py-3.5 text-base text-[#0F4C3A] placeholder-[#94A3B8] outline-none transition-all duration-200 focus:border-[#D4AF37] focus:bg-[#FFF] focus:ring-2 focus:ring-[rgba(212,175,55,0.4)]"
              />
            </label>

            {error && (
              <p className="mt-3 text-xs font-bold text-[#B91C1C]">{t('admin.login.error')}</p>
            )}

            <button
              type="submit"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] text-[#0F4C3A] hover:bg-[#c9a12f] shadow-[0_10px_26px_rgba(212,175,55,0.35)] px-6 py-3.5 text-sm font-extrabold transition-all"
            >
              <KeyRound size={18} strokeWidth={2.2} />
              {t('admin.login.unlock')}
              <ArrowRight size={18} strokeWidth={2.5} className="rtl:rotate-180" />
            </button>
          </form>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7A75] hover:text-[#0F4C3A] transition-colors"
          >
            {t('admin.login.back')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;