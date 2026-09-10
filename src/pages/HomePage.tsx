import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, CheckCircle2, ClipboardList, HeartPulse, Microscope, ShieldCheck, Star, Target, Users, Watch } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { IconScene } from '../components/IconScene';
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
  const { t } = useLanguage();
  const item = illustrations[kind];
  const stat = kind === 'calculator' ? 'BMI 22.4' : kind === 'watch' ? t('homeCardSteps') : t('homeCardComplete');
  const labelTop = kind === 'lab' ? t('homeCardLab') : t('homeCardHealth');
  const bottom = kind === 'care' ? t('homeCardCare') : kind === 'plan' ? t('homeCardPlan') : t('homeCardScience');
  return (
    <IconScene
      icon={item.icon}
      color={item.color}
      large={large}
      chip={{ value: stat, sub: labelTop }}
      chip2={{ value: bottom }}
    />
  );
};

const HomePage: React.FC = () => {
  const { t, dir, language } = useLanguage();
  return (
    <div className="home-shell" dir={dir}>
<section className="hero-section">
        <div className="hero-mesh" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hero-copy">
              <span className="hero-eyebrow">{t('homeHeroEyebrow')}</span>
              <h1>{t('homeHeroA')} <span className="hero-highlight">{t('homeHeroB')}</span></h1>
              <p>{t('homeHeroSub')}</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/fitness" className="hero-cta">{t('homeCta')}</Link>
              </div>
              <div className="hero-trust">
                <span><Star size={18} /> {t('homeTrustStars')}</span>
                <span><Users size={18} /> {t('homeTrustUsers')}</span>
                <span><ShieldCheck size={18} /> {t('homeTrustDoctor')}</span>
              </div>
            </div>
            <div className="hero-visual">
              <Illustration kind="calculator" large />
              <div className="hero-float-card hero-float-bmi">
                <span className="hero-float-check"><CheckCircle2 size={18} /></span>
                <div><b>22.5</b><small>{t('homeHeroBmiCard')} · {t('homeHeroHealthy')}</small></div>
              </div>
              <div className="hero-float-card hero-float-target">
                <span className="hero-float-target-icon"><Target size={18} /></span>
                <div><b>2,087</b><small>{t('homeHeroTargetCard')} · {t('homeHeroKcalDay')}</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

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