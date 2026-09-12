import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SectionIllustration from '../components/illustrations/SectionIllustration';
import HealthFingerprint from '../components/illustrations/HealthFingerprint';
import FloatingStats from '../components/illustrations/FloatingStats';
import TrustBar from '../components/sections/TrustBar';
import TrustStats from '../components/sections/TrustStats';
import HowItWorks from '../components/sections/HowItWorks';
import StartFreeDropdown from '../components/layout/StartFreeDropdown';

const conditions = [
  ['🩸', 'Diabetes', 'سكر', '/diabetes'],
  ['💗', 'Hypertension', 'ضغط', '/premium'],
  ['🫀', 'Cholesterol', 'كوليسترول', '/premium'],
  ['🦶', 'Gout', 'نقرس', '/premium'],
  ['🧡', 'Liver health', 'كبد', '/premium'],
  ['🫘', 'Kidney care', 'كلى', '/premium'],
  ['🦋', 'Thyroid', 'غدة درقية', '/premium'],
  ['🌿', 'IBS', 'قولون', '/premium'],
];

const cuisines = [
  ['🇪🇬', 'Egyptian'], ['🇮🇳', 'Indian'], ['🇸🇦', 'Arabic'], ['🇬🇷', 'Mediterranean'],
  ['🌏', 'Asian'], ['🇺🇸', 'American'], ['🥗', 'Vegetarian'], ['🥑', 'Keto'],
];

const HomePage: React.FC = () => {
  const { t, dir, language } = useLanguage();
  return (
    <div className="home-shell" dir={dir}>
<section className="hero-section">
        <div className="hero-mesh" />
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
            <div className="hero-copy">
              <span className="hero-eyebrow">{t('heroEyebrow')}</span>
              <h1 className="hero-title">
                <span className="hero-title-line1">{t('heroTitleLine1')}</span>
                <span className="hero-title-line2">{t('heroTitleLine2')}</span>
              </h1>
              <p>{t('heroSubtitle')}</p>
              <div className="hero-progress" role="progressbar" aria-label={t('homeProgressLabel')} aria-valuemin={0} aria-valuemax={5} aria-valuenow={1}>
                <span className="hero-progress-label">{t('homeProgressLabel')}</span>
                <span className="hero-progress-track"><i style={{ width: '20%' }} /></span>
              </div>
              <Link to="/fitness" className="hero-cta">{t('heroCta')} 🔥</Link>
              <div className="hero-trust">
                <span>⭐ {t('trustRatingValue')}</span>
                <span className="hero-trust-sep">·</span>
                <span>👥 {t('trustUsersValue')} · {t('trustUsers')}</span>
                <span className="hero-trust-sep">·</span>
                <span>📚 {t('trustDoctor')}</span>
              </div>
            </div>
            <div className="hero-visual">
              <HealthFingerprint />
              <FloatingStats />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="section-wrap" id="calculator">
        <div className="section-intro"><span className="step-pill">{t('homeStep1')}</span><h2>{t('homeStep1Title')}</h2><p>{t('homeStep1Desc')}</p></div>
        <div className="explainer-grid">
          <SectionIllustration kind="calculator" />
          <div className="feature-panel">
            <div className="mock-inputs"><div><label>{t('homeMockAge')}</label><strong className="mixed-text">{t('homeMockAgeVal')}</strong></div><div><label>{t('homeMockHeight')}</label><strong className="mixed-text">{t('homeMockHeightVal')}</strong></div><div><label>{t('homeMockWeight')}</label><strong className="mixed-text">{t('homeMockWeightVal')}</strong></div></div>
            <div className="feature-list">{[t('homeFeat1'), t('homeFeat2'), t('homeFeat3')].map((x) => <span key={x}>✓ {x}</span>)}</div>
            <Link to="/fitness" className="btn-primary">{t('homeTryCalc')} <span>→</span></Link>
            <p className="panel-note">{t('homePanelNote')}</p>
          </div>
        </div>
      </section>

      <section className="section-wrap section-tint">
        <div className="explainer-grid reverse">
          <div className="section-intro"><span className="step-pill pink">{t('homeStep2')}</span><h2>{t('homeStep2Title')}</h2><p>{t('homeStep2Desc')}</p>
            <div className="cuisine-grid">{cuisines.map(([flag, name]) => <span key={name}>{flag} {name}</span>)}</div>
            <Link to="/weight-loss" className="btn-primary">{t('homeSeePlan')} <span>→</span></Link>
          </div>
          <SectionIllustration kind="plan" />
        </div>
      </section>

      <section className="section-wrap">
        <div className="explainer-grid">
          <SectionIllustration kind="care" />
          <div className="section-intro"><span className="step-pill purple">{t('homeStep3')}</span><h2>{t('homeStep3Title')}</h2><p>{t('homeStep3Desc')}</p>
            <div className="condition-grid">{conditions.map(([icon, en, ar, path]) => <Link to={path} key={en}><span>{icon}</span><b>{language === 'ar' ? ar : en}</b></Link>)}</div>
            <Link to="/advanced-care" className="btn-primary">{t('homeExploreCare')} <span>→</span></Link>
          </div>
        </div>
      </section>

      <HowItWorks />

      <TrustStats />

      <section className="section-wrap">
        <div className="watch-banner"><SectionIllustration kind="smartwatch" /><div><span className="step-pill blue">{t('homeWatchPill')}</span><h2>{t('homeWatchTitle')}</h2><p>{t('homeWatchDesc')}</p><div className="watch-steps"><span className="num">{t('homeWatch1')}</span><span className="num">{t('homeWatch2')}</span><span className="num">{t('homeWatch3')}</span></div><Link to="/smartwatch-sync" className="btn-primary">{t('homeConnectWatch')}</Link></div></div>
      </section>

      <section className="section-wrap final-cta"><div><span className="eyebrow">{t('homeFinalEyebrow')}</span><h2>{t('homeFinalTitle')}</h2><p>{t('homeFinalDesc')}</p><div className="flex justify-center"><StartFreeDropdown /></div></div></section>
    </div>
  );
};

export default HomePage;