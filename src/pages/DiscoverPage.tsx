import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Bean, CalendarDays, Check, ChevronDown, Droplet, Filter, Flame, Footprints, HeartPulse, Languages, Leaf, Mars, Ruler, Salad, Scale, ShieldCheck, Sparkles, UtensilsCrossed, Venus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TranslationKeys } from '../i18n/translationTypes';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import { useUserProfile } from '../hooks/useUserProfile';
import type { UserGoal, WizardGoalSelection } from '../hooks/useUserProfile';
import SectionIllustration from '../components/illustrations/SectionIllustration';
import StartFreeDropdown from '../components/layout/StartFreeDropdown';
import Flag from '../components/common/Flag';
import { ENABLE_PREMIUM } from '../config/featureFlags';
import './HomeHero.css';

const TrustBar = lazy(() => import('../components/sections/TrustBar'));
const HowItWorks = lazy(() => import('../components/sections/HowItWorks'));
const TrustHighlights = lazy(() => import('../components/sections/TrustHighlights'));
const DeferredHighlights = lazy(() => import('../components/sections/DeferredHighlights'));

const conditions: Array<{ icon: LucideIcon; labelKey: keyof TranslationKeys; path: string }> = [
  { icon: Droplet, labelKey: 'wizard.condition.diabetes.name', path: '/diabetes' },
  { icon: HeartPulse, labelKey: 'wizard.condition.hypertension.name', path: '/premium' },
  { icon: Activity, labelKey: 'wizard.condition.cholesterol.name', path: '/premium' },
  { icon: Footprints, labelKey: 'wizard.condition.gout.name', path: '/premium' },
  { icon: Filter, labelKey: 'wizard.condition.liver.name', path: '/premium' },
  { icon: Bean, labelKey: 'wizard.condition.kidney.name', path: '/premium' },
  { icon: Flame, labelKey: 'wizard.condition.thyroid.name', path: '/premium' },
  { icon: Leaf, labelKey: 'wizard.condition.ibs.name', path: '/premium' },
];

const HERO_GOAL_TO_USER_GOAL: Record<WizardGoalSelection, UserGoal> = {
  lose_weight: 'lose',
  maintain_weight: 'wellness',
  build_muscle: 'gain_muscle',
  improve_health: 'wellness',
};

const HERO_GOALS: { value: WizardGoalSelection; labelKey: keyof TranslationKeys }[] = [
  { value: 'lose_weight', labelKey: 'home.calculator.goalLose' },
  { value: 'maintain_weight', labelKey: 'home.calculator.goalMaintain' },
  { value: 'build_muscle', labelKey: 'home.calculator.goalBuild' },
  { value: 'improve_health', labelKey: 'home.calculator.goalHealth' },
];

const localeFor = (lang: string): string =>
  lang === 'ar' ? 'ar-EG' : lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : lang === 'de' ? 'de-DE' : 'en-US';

const DiscoverPage: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserProfile();
  const [heroProfileError, setHeroProfileError] = useState(false);
  const heroGoal: WizardGoalSelection = profile.wizardGoal ?? (
    profile.goal === 'gain_muscle' || profile.goal === 'gain_weight' || profile.goal === 'athletic' ? 'build_muscle'
      : profile.goal === 'wellness' ? 'maintain_weight'
        : 'lose_weight'
  );
  const countLocale = localeFor(language);
  const fmtCount = (n: number): string => n.toLocaleString(countLocale);
  const kitchenSectionRef = useRef<HTMLElement | null>(null);
  const [kitchenData, setKitchenData] = useState<typeof import('../data/kitchens') | null>(null);
  useEffect(() => {
    const node = kitchenSectionRef.current;
    if (!node) return;
    let cancelled = false;
    const load = () => {
      void import('../data/kitchens')
        .then(async (mod) => {
          await mod.loadDietKitchens();
          if (!cancelled) setKitchenData(mod);
        })
        .catch(() => {});
    };
    if (typeof IntersectionObserver === 'undefined') { load(); return; }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { observer.disconnect(); load(); }
    }, { rootMargin: '320px' });
    observer.observe(node);
    return () => { cancelled = true; observer.disconnect(); };
  }, []);
  const countryKitchens = useMemo(
    () => (kitchenData ? kitchenData.kitchensRegistry.filter((k) => !k.id.startsWith('diet-')).sort((a, b) => b.total - a.total) : []),
    [kitchenData]
  );
  const heroKitchen = countryKitchens[0];

  const foodHighlights = useMemo(() => {
    if (!kitchenData) return [];
    return countryKitchens.flatMap((kitchen) => {
      const dish = kitchen.sample ?? kitchen.dishes[0];
      if (!dish) return [];
      const name = kitchenData.getDishName(dish, language);
      if (!name) return [];
      return [{ kitchen, dish, name }];
    }).slice(0, 4);
  }, [kitchenData, countryKitchens, language]);

  const handleHeroGoalChange = (value: WizardGoalSelection) => {
    updateProfile({
      goal: HERO_GOAL_TO_USER_GOAL[value],
      wizardGoal: value,
      goalDiscovery: value,
      goals: [value],
    });
  };

  const handleHeroCalculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (profile.gender === null || profile.age === null || profile.height === null || profile.weight === null) {
      setHeroProfileError(true);
      return;
    }
    setHeroProfileError(false);
    updateProfile({
      age: profile.age,
      gender: profile.gender,
      height: profile.height,
      weight: profile.weight,
      goal: HERO_GOAL_TO_USER_GOAL[heroGoal],
      wizardGoal: heroGoal,
      goalDiscovery: heroGoal,
      goals: [heroGoal],
    });
    navigate('/weight-loss', { state: { startWithHeroProfile: true } });
  };

  return (
    <div className="home-shell" dir={dir}>
      <SEO title={t('discover.seoTitle')} description={t('discover.seoDescription')} url="/meal-planner" />
      <section className="hero-section home-hero-hook" dir={dir}>
        <div className="hh-preview__ambient hh-preview__ambient--one" aria-hidden="true" />
        <div className="hh-preview__ambient hh-preview__ambient--two" aria-hidden="true" />
        <div className="hh-preview__hero">
          <div className="hh-preview__message" dir={dir}>
            <span className="hh-preview__badge"><Sparkles size={13} /> {t('home.hero.badge')}</span>
            <h1>{t('home.hero.title1')}<br />{t('home.hero.title2')} <em>{t('home.hero.title2Accent')}</em></h1>
            <p className="hh-preview__subhead">{t('home.hero.subtitle')}</p>
            <div className="hh-hero-media">
              <img
                src="/images/hero-bowl.webp"
                alt={t('home.hero.imageAlt')}
                width={672}
                height={448}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
              <div className="hh-preview__proof" aria-label={t('home.hero.highlights')}>
                <div className="hh-proof-item"><span className="hh-proof-item__icon"><UtensilsCrossed size={16} /></span><strong>18,000<sup>+</sup></strong><small>{t('home.stats.dishes')}</small></div>
                <span className="hh-preview__proof-divider" />
                <div className="hh-proof-item"><span className="hh-proof-item__icon"><Languages size={16} /></span><strong>5</strong><small>{t('home.stats.languages')}</small></div>
                <span className="hh-preview__proof-divider" />
                <div className="hh-proof-item"><span className="hh-proof-item__icon"><HeartPulse size={16} /></span><strong>100%</strong><small>{t('home.stats.free')}</small></div>
            </div>
          </div>

          <section className="hh-calculator" dir={dir} aria-labelledby="hh-calculator-heading">
            <div className="hh-calculator__shine" aria-hidden="true" />
            <div className="hh-calculator__topline"><span><i /> {t('home.calculator.yourStartingPoint')}</span><span className="hh-calculator__time"><Sparkles size={12} /> {t('home.calculator.time')}</span></div>
            <div className="hh-calculator__heading"><div><span className="hh-calculator__eyebrow">{t('home.calculator.quickDetails')}</span><h2 id="hh-calculator-heading">{t('home.calculator.titlePrefix')} <em>{t('home.calculator.titleAccent')}</em></h2></div><span className="hh-calculator__step">01 <i>/</i> 01</span></div>

            <form onSubmit={handleHeroCalculate}>
              <div className="hh-form-grid hh-form-grid--three">
                <label className="hh-field" htmlFor="hero-profile-age">
                  <span><CalendarDays size={13} /> {t('age')}</span>
                  <span className="hh-field__control"><input id="hero-profile-age" type="number" min="12" max="80" inputMode="numeric" value={profile.age ?? ''} onChange={(event) => { setHeroProfileError(false); updateProfile({ age: event.target.value ? Number(event.target.value) : null }); }} required name="hero-profile-age" /><small>{t('years')}</small></span>
                </label>
                <label className="hh-field" htmlFor="hero-profile-height">
                  <span><Ruler size={13} /> {t('height')}</span>
                  <span className="hh-field__control"><input id="hero-profile-height" type="number" min="120" max="220" inputMode="decimal" value={profile.height ?? ''} onChange={(event) => { setHeroProfileError(false); updateProfile({ height: event.target.value ? Number(event.target.value) : null }); }} required name="hero-profile-height" /><small>{t('cm')}</small></span>
                </label>
                <label className="hh-field" htmlFor="hero-profile-weight">
                  <span><Scale size={13} /> {t('weightLabel')}</span>
                  <span className="hh-field__control"><input id="hero-profile-weight" type="number" min="30" max="250" inputMode="decimal" value={profile.weight ?? ''} onChange={(event) => { setHeroProfileError(false); updateProfile({ weight: event.target.value ? Number(event.target.value) : null }); }} required name="hero-profile-weight" /><small>{t('kg')}</small></span>
                </label>
              </div>

              <div className="hh-form-grid hh-form-grid--two">
                <fieldset className="hh-gender-field">
                  <legend>{t('gender')}</legend>
                  <div className="hh-gender-switch" role="group" aria-label={t('gender')}>
                    <button type="button" className={profile.gender === 'female' ? 'is-selected' : ''} aria-pressed={profile.gender === 'female'} onClick={() => { setHeroProfileError(false); updateProfile({ gender: 'female' }); }}><Venus size={14} /> {t('home.calculator.woman')}</button>
                    <button type="button" className={profile.gender === 'male' ? 'is-selected' : ''} aria-pressed={profile.gender === 'male'} onClick={() => { setHeroProfileError(false); updateProfile({ gender: 'male' }); }}><Mars size={14} /> {t('home.calculator.man')}</button>
                  </div>
                </fieldset>
                <label className="hh-field hh-goal-field" htmlFor="hero-profile-goal">
                  <span>{t('home.calculator.primaryGoal')}</span>
                  <span className="hh-select-wrap"><select id="hero-profile-goal" value={heroGoal} onChange={(event) => handleHeroGoalChange(event.target.value as WizardGoalSelection)} name="hero-profile-goal">{HERO_GOALS.map((goal) => <option key={goal.value} value={goal.value}>{t(goal.labelKey)}</option>)}</select><ChevronDown size={15} /></span>
                </label>
              </div>

              {heroProfileError && <p className="hh-profile-error" role="alert">{t('home.calculator.profileError')}</p>}
              <button className="hh-calculate-button" type="submit" aria-label={t('home.calculator.calculateAria')}>{t('home.calculator.calculate')} <ArrowRight size={19} aria-hidden="true" /></button>
              <p className="hh-no-signup"><ShieldCheck size={14} /> {t('home.calculator.noSignup')}</p>
            </form>
          </section>
        </div>
      </section>

      <Suspense fallback={<div className="trust-bar" aria-hidden="true" />}>
        <TrustBar />
      </Suspense>

      <section className="section-wrap" id="calculator">
        <div className="section-intro"><span className="step-pill">{t('homeStep1')}</span><h2>{t('homeStep1Title')}</h2><p>{t('homeStep1Desc')}</p></div>
        <div className="explainer-grid">
          <SectionIllustration kind="calculator" />
          <div className="feature-panel">
            <div className="feature-list">{[t('homeFeat1'), t('homeFeat2'), t('homeFeat3')].map((x) => <span key={x}><Check size={15} strokeWidth={3} aria-hidden="true" /> {x}</span>)}</div>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              {t('home.calculator.return')}
            </button>
          </div>
        </div>
      </section>

      <section className="section-wrap section-tint food-showcase-section" ref={kitchenSectionRef}>
        {kitchenData && heroKitchen ? (
          <>
            <div className="kitchen-head">
              <span className="step-pill gold">{t('homeFood.eyebrow')}</span>
              <h2 className="kitchen-title">{t('homeFood.title')}</h2>
              <p className="kitchen-sub">{t('homeFood.subtitle').replace('{count}', fmtCount(kitchenData.totalDishesAll))}</p>
              <Link to="/food-library" className="btn-primary">{t('homeFood.viewAll')} <ArrowRight size={16} className="rtl:rotate-180" /></Link>
            </div>

            <div className="home-food-grid">
              {foodHighlights.map(({ kitchen, dish, name }, index) => (
                <Link to="/food-library" key={kitchen.id} className={`home-food-card${index === 0 ? ' home-food-card--featured' : ''}`}>
                  <span className="home-food-art" aria-hidden="true"><Salad size={index === 0 ? 48 : 36} strokeWidth={1.5} /></span>
                  <span className="home-food-origin"><Flag countryCode={kitchen.flag} alt={kitchenData.getKitchenCountry(kitchen, language)} className="h-5 w-7" />{kitchenData.getKitchenName(kitchen, language)}</span>
                  <h3>{name}</h3>
                  <span className="home-food-calories">{fmtCount(Math.round(dish.cal_serv))} kcal <small>{t('homeFood.perServing')}</small></span>
                  <span className="home-food-macros"><span>P <b>{fmtCount(Math.round(dish.p))}g</b></span><span>C <b>{fmtCount(Math.round(dish.c))}g</b></span><span>F <b>{fmtCount(Math.round(dish.f))}g</b></span></span>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="home-food-grid home-food-grid--loading" aria-hidden="true">
            <div className="home-food-card" /><div className="home-food-card" /><div className="home-food-card" /><div className="home-food-card" />
          </div>
        )}
      </section>

      {ENABLE_PREMIUM && (
        <section className="section-wrap">
          <div className="explainer-grid">
            <SectionIllustration kind="care" />
            <div className="section-intro"><span className="step-pill purple">{t('homeStep3')}</span><h2>{t('homeStep3Title')}</h2><p>{t('homeStep3Desc')}</p>
              <div className="condition-grid">{conditions.map(({ icon: Icon, labelKey, path }) => <Link to={path} key={labelKey}><span><Icon size={20} strokeWidth={2.25} aria-hidden="true" /></span><b>{t(labelKey)}</b></Link>)}</div>
              <Link to="/advanced-care" className="btn-primary">{t('homeExploreCare')} <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
      )}

      <Suspense fallback={<div className="howitworks-section py-12 lg:py-24" aria-hidden="true"><div className="mx-auto max-w-[1120px]" style={{ minHeight: 560 }} /></div>}>
        <HowItWorks />
      </Suspense>

      <Suspense fallback={<section className="section-wrap trustsec-section" aria-hidden="true"><div style={{ minHeight: 420 }} /></section>}>
        <TrustHighlights />
      </Suspense>

      <Suspense fallback={
        <>
          <section className="section-wrap" aria-hidden="true"><div style={{ minHeight: 300 }} /></section>
          <section className="section-wrap" aria-hidden="true"><div style={{ minHeight: 380 }} /></section>
          <section className="section-wrap" aria-hidden="true"><div style={{ minHeight: 420 }} /></section>
        </>
      }>
        <DeferredHighlights />
      </Suspense>

      <section className="section-wrap final-cta"><div><span className="eyebrow">{t('homeFinalEyebrow')}</span><h2>{t('homeFinalTitle')}</h2><p>{t('homeFinalDesc')}</p><div className="flex justify-center"><StartFreeDropdown /></div></div></section>
    </div>
  );
};

export default DiscoverPage;
