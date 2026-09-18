import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">🔍</span>
        </div>
        <h1 className="text-6xl font-extrabold text-gray-200 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-900 mb-3">{t('notFoundTitle')}</h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">{t('notFoundDesc')}</p>
        <Link to="/" className="btn-primary text-base py-3.5 px-8">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;