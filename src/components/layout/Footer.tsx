import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { supabaseClient } from '../../lib/supabaseClient';

const Footer: React.FC = () => {
  const { t, dir } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'warning' | 'error' | ''>('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setStatusMessage('');
    setStatusType('');

    try {
      if (supabaseClient) {
        const { error } = await supabaseClient.from('subscribers').insert([{ email: email.trim(), source: 'Footer Newsletter' }]);
        if (!error) {
          setEmail('');
          setStatusMessage('Subscribed successfully!');
          setStatusType('success');
        } else if ((error as any).code === '23505') {
          setStatusMessage('You are already subscribed!');
          setStatusType('warning');
        } else {
          setStatusMessage('Something went wrong. Please try again.');
          setStatusType('error');
        }
      } else {
        setEmail('');
        setStatusMessage('Subscribed successfully!');
        setStatusType('success');
      }
    } catch (err) {
      setStatusMessage('Something went wrong. Please try again.');
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
            <Link to="/" className="footer-logo">{t('brandName')} <span>🌿</span></Link>
            <p className="footer-desc">
              {t('footerTagline')}
            </p>
          </div>

          <div className="footer-col">
            <h4>{t('footerPlatform')}</h4>
            <Link to="/weight-loss">{t('footerPlan')}</Link>
            <Link to="/fitness">{t('footerCalories')}</Link>
            <Link to="/fitness">{t('footerBmi')}</Link>
            <Link to="/food-library">{t('footerFoodLibrary')}</Link>
          </div>

          <div className="footer-col">
            <h4>{t('footerLearn')}</h4>
            <Link to="/about">{t('footerAbout')}</Link>
            <Link to="/resources">{t('footerResources')}</Link>
          </div>

          <div className="footer-col">
            <h4>{t('footerHelp')}</h4>
            <Link to="/faq">{t('footerFaq')}</Link>
            <Link to="/contact">{t('footerContact')}</Link>
            <Link to="/privacy">{t('footerPrivacy')}</Link>
            <Link to="/terms">{t('footerTerms')}</Link>
            <Link to="/cookies">{t('footerCookies')}</Link>
          </div>

          <div className="footer-col">
            <h4>{t('footerNews')}</h4>
            <p className="footer-news-text">{t('footerNewsText')}</p>
            <form className="footer-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                placeholder={t('footerEmailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Subscribing...' : t('footerSubscribe')}
              </button>
            </form>
            {statusMessage && (
              <p className={`text-xs mt-2 ${
                statusType === 'success' ? 'text-green-600' :
                statusType === 'warning' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {statusMessage}
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
