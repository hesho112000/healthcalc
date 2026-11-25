import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getSupabaseClient } from '../../lib/supabaseClient';
import type { TranslationKeys } from '../../i18n/translationTypes';

const Footer: React.FC = () => {
  const { t, dir } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<keyof TranslationKeys | ''>('');
  const [statusType, setStatusType] = useState<'success' | 'warning' | 'error' | ''>('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setStatusMessage('');
    setStatusType('');

    try {
      const client = await getSupabaseClient();
      if (client) {
        const { error } = await client.from('subscribers').insert([{ email: email.trim(), source: 'Footer Newsletter' }]);
        if (!error) {
          setEmail('');
          setStatusMessage('common.subscribed');
          setStatusType('success');
        } else if ((error as any).code === '23505') {
          setStatusMessage('common.alreadySubscribed');
          setStatusType('warning');
        } else {
          setStatusMessage('common.errorTryAgain');
          setStatusType('error');
        }
      } else {
        setEmail('');
        setStatusMessage('common.subscribed');
        setStatusType('success');
      }
    } catch {
      setStatusMessage('common.errorTryAgain');
      setStatusType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="site-footer" dir={dir}>
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="footer-logo" aria-label={`${t('brandName')} home`}>{t('brandName')} <span aria-hidden="true">🌿</span></Link>
            <p className="footer-desc">
              {t('footerTagline')}
            </p>
          </div>

          <div className="footer-col">
            <h3>{t('footerPlatform')}</h3>
            <Link to="/meal-planner">{t('footerPlan')}</Link>
            <Link to="/">{t('footerCalories')}</Link>
            <Link to="/?tab=bmi">{t('footerBmi')}</Link>
            <Link to="/food-library">{t('footerFoodLibrary')}</Link>
          </div>

          <div className="footer-col">
            <h3>{t('footerLearn')}</h3>
            <Link to="/about">{t('footerAbout')}</Link>
            <Link to="/resources">{t('footerResources')}</Link>
          </div>

          <div className="footer-col">
            <h3>{t('footerHelp')}</h3>
            <Link to="/faq">{t('footerFaq')}</Link>
            <Link to="/contact">{t('footerContact')}</Link>
            <Link to="/privacy">{t('footerPrivacy')}</Link>
            <Link to="/terms">{t('footerTerms')}</Link>
            <Link to="/cookies">{t('footerCookies')}</Link>
          </div>

          <div className="footer-col">
            <h3>{t('footerNews')}</h3>
            <p className="footer-news-text">{t('footerNewsText')}</p>
            <form className="footer-form" onSubmit={handleSubscribe}>
              <input
                id="footer-email"
                name="email"
                type="email"
                required
                placeholder={t('footerEmailPlaceholder')}
                aria-label={t('footerEmailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? t('common.subscribing') : t('footerSubscribe')}
              </button>
            </form>
            {statusMessage && (
              <p className={`text-xs mt-2 ${
                statusType === 'success' ? 'text-green-300' :
                statusType === 'warning' ? 'text-amber-300' :
                'text-red-300'
              }`}>
                {statusMessage ? t(statusMessage) : ''}
              </p>
            )}
          </div>
        </div>

        <div className="footer-disclaimer">
          {t('disclaimer')}
        </div>

        <div className="footer-bottom">
          <span>{t('footerRights')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
