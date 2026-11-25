import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const FooterNewsletter = lazy(() => import('./FooterNewsletter'));

const Footer: React.FC = () => {
  const { t, dir } = useLanguage();
  const newsletterRef = useRef<HTMLDivElement | null>(null);
  const [newsletterReady, setNewsletterReady] = useState(false);

  useEffect(() => {
    const node = newsletterRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNewsletterReady(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        setNewsletterReady(true);
      }
    }, { rootMargin: '300px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
            <div ref={newsletterRef} className="min-h-[94px]">
              {newsletterReady ? (
                <Suspense fallback={<div className="footer-form min-h-[42px]" aria-hidden="true" />}>
                  <FooterNewsletter />
                </Suspense>
              ) : (
                <div className="min-h-[42px]" aria-hidden="true" />
              )}
            </div>
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
