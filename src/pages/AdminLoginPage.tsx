import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AdminLoginPage: React.FC = () => {
  const { t, dir } = useLanguage();

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
          <p role="status" className="mt-7 rounded-2xl bg-[#F4F1EB] px-4 py-4 text-sm font-semibold text-[#0F4C3A]">
            {t('universe.comingSoon')} — Admin access is disabled until server-side authorization is configured.
          </p>

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
