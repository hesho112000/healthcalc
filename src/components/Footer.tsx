import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { allSeoPages } from '../data/seo';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const seoLinks = allSeoPages.map((page) => ({
    path: `/${language}/landing/${page.slug}`,
    label: page.title[language] || page.title.en,
  }));

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-sage-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-extrabold text-white">Health</span>
                <span className="text-lg font-extrabold text-primary-400">Calc</span>
                <span className="text-xs font-semibold text-sage-400 ml-0.5">.ai</span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              {t('footerTagline')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['ADA', 'DASH', 'USDA', 'ACSM'].map((g) => (
                <span key={g} className="text-[10px] font-semibold bg-gray-800 px-2 py-1 rounded-lg text-gray-500">{g}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm hover:text-white transition-colors">{t('home')}</Link></li>
              <li><Link to="/weight-loss" className="text-sm hover:text-white transition-colors">{t('weightLoss')}</Link></li>
              <li><Link to="/diabetes" className="text-sm hover:text-white transition-colors">{t('diabetes')}</Link></li>
              <li><Link to="/premium" className="text-sm hover:text-white transition-colors">{t('premium')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">
              {t('footerLegal')}
            </h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-sm hover:text-white transition-colors">{t('privacyPolicy')}</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-white transition-colors">{t('termsOfService')}</Link></li>
              <li><Link to="/disclaimer" className="text-sm hover:text-white transition-colors">{t('medicalDisclaimer')}</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-white transition-colors">{t('contactUs')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">
              {t('footerHealthGuides')}
            </h4>
            <ul className="space-y-3">
              {seoLinks.slice(0, 6).map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-white transition-colors line-clamp-1">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <p className="text-center text-xs text-gray-600">{t('allRights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
