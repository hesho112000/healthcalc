import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Footer: React.FC = () => {
  const { t, dir } = useLanguage();
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
    setEmail('');
  };

  return (
    <footer className="premium-footer" dir={dir}>
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="footer-logo">{t('brandName')} <span>🌿</span></Link>
            <p className="footer-desc">
              {t('footerTagline')}
            </p>
            <div className="footer-social">
              <a href="#!" aria-label={t('footerFb')}>f</a>
              <a href="#!" aria-label={t('footerIg')}>ig</a>
              <a href="#!" aria-label={t('footerX')}>x</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('footerPlatform')}</h4>
            <Link to="/plan">{t('footerPlan')}</Link>
            <Link to="/tracking">{t('footerTracking')}</Link>
            <Link to="/diabetes">{t('footerDiabetes')}</Link>
            <Link to="/bio-age">{t('footerBioAge')}</Link>
          </div>

          <div className="footer-col">
            <h4>{t('footerHelp')}</h4>
            <Link to="/faq">{t('footerFaq')}</Link>
            <Link to="/contact">{t('footerContact')}</Link>
            <Link to="/privacy">{t('footerPrivacy')}</Link>
            <Link to="/terms">{t('footerTerms')}</Link>
          </div>

          <div className="footer-col">
            <h4>{t('footerNews')}</h4>
            <p className="footer-news-text">{t('footerNewsText')}</p>
            <form className="footer-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder={t('footerEmailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">{joined ? t('footerSubscribed') : t('footerSubscribe')}</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t('footerRights')}</span>
          <span>{t('footerMade')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;