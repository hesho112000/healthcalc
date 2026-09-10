import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ClipboardList, HeartPulse, Microscope, Watch } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { IconScene } from '../components/IconScene';
import HealthFingerprint from '../components/illustrations/HealthFingerprint';
import FloatingStats from '../components/illustrations/FloatingStats';
import TrustBar from '../components/sections/TrustBar';
import StartFreeDropdown from '../components/layout/StartFreeDropdown';

type IllustrationKind = 'calculator' | 'plan' | 'care' | 'lab' | 'watch';

const illustrations: Record<IllustrationKind, { icon: LucideIcon; color: string; title: string }> = {
  calculator: { icon: Calculator, color: '#10b981', title: 'Health dashboard' },
  plan: { icon: ClipboardList, color: '#f59e0b', title: 'Personal plan' },
  care: { icon: HeartPulse, color: '#8b5cf6', title: 'Compassionate care' },
  lab: { icon: Microscope, color: '#14b8a6', title: 'Lab interpreter' },
  watch: { icon: Watch, color: '#3b82f6', title: 'Smart sync' },
};

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

const Illustration: React.FC<{ kind: IllustrationKind; large?: boolean }> = ({ kind, large = false }) => {
  const item = illustrations[kind];
  return <IconScene icon={item.icon} color={item.color} large={large} />;
};

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
                <span>🛡️ {t('trustDoctor')}</span>
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
          <Illustration kind="calculator" />
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
            <Link to="/weight-loss" className="btn-secondary">{t('homeSeePlan')} <span>→</span></Link>
          </div>
          <Illustration kind="plan" />
        </div>
      </section>

      <section className="section-wrap">
        <div className="explainer-grid">
          <Illustration kind="care" />
          <div className="section-intro"><span className="step-pill purple">{t('homeStep3')}</span><h2>{t('homeStep3Title')}</h2><p>{t('homeStep3Desc')}</p>
            <div className="condition-grid">{conditions.map(([icon, en, ar, path]) => <Link to={path} key={en}><span>{icon}</span><b>{language === 'ar' ? ar : en}</b></Link>)}</div>
            <Link to="/advanced-care" className="btn-primary">{t('homeExploreCare')} <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="section-wrap section-tint">
        <div className="section-intro center"><span className="step-pill">{t('homeLabPill')}</span><h2>{t('homeLabTitle')}</h2><p>{t('homeLabDesc')}</p></div>
        <div className="lab-feature"><Illustration kind="lab" large /><div className="lab-copy"><span className="lab-chip">{t('homeLive')}</span><h3>{t('homeLabH3')}</h3><div className="lab-bars"><span><i style={{ width: '78%' }} />{t('homeBarGlucose')}</span><span><i style={{ width: '52%' }} />{t('homeBarBp')}</span><span><i style={{ width: '88%' }} />{t('homeBarChol')}</span></div><Link to="/lab-to-plan" className="btn-outline">{t('homeStartInterpret')}</Link></div></div>
      </section>

      <section className="section-wrap">
        <div className="watch-banner"><Illustration kind="watch" /><div><span className="step-pill blue">{t('homeWatchPill')}</span><h2>{t('homeWatchTitle')}</h2><p>{t('homeWatchDesc')}</p><div className="watch-steps"><span className="num">{t('homeWatch1')}</span><span className="num">{t('homeWatch2')}</span><span className="num">{t('homeWatch3')}</span></div><Link to="/smartwatch-sync" className="btn-primary">{t('homeConnectWatch')}</Link></div></div>
      </section>

      <section className="section-wrap final-cta"><div><span className="eyebrow">{t('homeFinalEyebrow')}</span><h2>{t('homeFinalTitle')}</h2><p>{t('homeFinalDesc')}</p><div className="flex justify-center"><StartFreeDropdown /></div></div></section>
    </div>
  );
};

export default HomePage;