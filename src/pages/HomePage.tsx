import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Bean, BookOpen, CalendarDays, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Cross, Droplet, Dumbbell, Filter, Flame, Footprints, HeartPulse, Hourglass, Languages, Leaf, Mars, Moon, RefreshCw, Ruler, Salad, Scale, ShieldCheck, Smartphone, Sparkles, Star, Target, Timer, TrendingDown, Users, UtensilsCrossed, Venus, Watch } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ArticleCategory } from '../data/articles';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import { useUserProfile } from '../hooks/useUserProfile';
import type { UserGoal, WizardGoalSelection } from '../hooks/useUserProfile';
import SectionIllustration from '../components/illustrations/SectionIllustration';
import TrustBar from '../components/sections/TrustBar';
import HowItWorks from '../components/sections/HowItWorks';
import StartFreeDropdown from '../components/layout/StartFreeDropdown';
import Flag from '../components/common/Flag';
import { ENABLE_PREMIUM } from '../config/featureFlags';
import './HomeHero.css';
import { supabaseClient } from '../lib/supabaseClient';

const conditions: Array<{ icon: LucideIcon; en: string; ar: string; path: string }> = [
  { icon: Droplet, en: 'Diabetes', ar: 'سكر', path: '/diabetes' },
  { icon: HeartPulse, en: 'Hypertension', ar: 'ضغط', path: '/premium' },
  { icon: Activity, en: 'Cholesterol', ar: 'كوليسترول', path: '/premium' },
  { icon: Footprints, en: 'Gout', ar: 'نقرس', path: '/premium' },
  { icon: Filter, en: 'Liver health', ar: 'كبد', path: '/premium' },
  { icon: Bean, en: 'Kidney care', ar: 'كلى', path: '/premium' },
  { icon: Flame, en: 'Thyroid', ar: 'غدة درقية', path: '/premium' },
  { icon: Leaf, en: 'IBS', ar: 'قولون', path: '/premium' },
];

type TrustLabelKey = 'trustsec.stat1.label' | 'trustsec.stat2.label' | 'trustsec.stat3.label' | 'trustsec.stat4.label';

const trustSignals: Array<{ icon: LucideIcon; value: number; decimals?: number; suffix?: string; labelKey: TrustLabelKey }> = [
  { icon: Star, value: 4.9, decimals: 1, suffix: '/5', labelKey: 'trustsec.stat1.label' },
  { icon: Users, value: 12450, suffix: '+', labelKey: 'trustsec.stat2.label' },
  { icon: TrendingDown, value: 3.2, decimals: 1, suffix: ' kg', labelKey: 'trustsec.stat3.label' },
  { icon: Target, value: 92, suffix: '%', labelKey: 'trustsec.stat4.label' },
];

const TRUST_SOURCES = ['WHO', 'ADA', 'NHS', 'Mayo Clinic', 'Harvard Medical'];

const HERO_GOAL_TO_USER_GOAL: Record<WizardGoalSelection, UserGoal> = {
  lose_weight: 'lose',
  maintain_weight: 'wellness',
  build_muscle: 'gain_muscle',
  improve_health: 'wellness',
};

const HERO_GOALS: { value: WizardGoalSelection; label: string }[] = [
  { value: 'lose_weight', label: 'Lose weight' },
  { value: 'maintain_weight', label: 'Maintain weight' },
  { value: 'build_muscle', label: 'Build muscle' },
  { value: 'improve_health', label: 'Feel healthier' },
];

const localeFor = (lang: string): string =>
  lang === 'ar' ? 'ar-EG' : lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : lang === 'de' ? 'de-DE' : 'en-US';

const TrustCountUp: React.FC<{ value: number; decimals?: number; suffix?: string; locale: string }> = ({ value, decimals = 0, suffix = '', locale }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') { setDisplay(value); return; }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting) || started.current) return;
      started.current = true;
      observer.disconnect();
      const duration = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(value * eased);
        if (progress < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);
  const formatted = display.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span ref={ref}>{formatted}{suffix}</span>;
};

const CATEGORY_ICON: Record<ArticleCategory, LucideIcon> = {
  diabetes: Droplet,
  heart: HeartPulse,
  nutrition: Salad,
  lifestyle: Sparkles,
  fitness: Dumbbell,
};

const HomePage: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserProfile();
  const [heroProfileError, setHeroProfileError] = useState(false);
  const heroGoal: WizardGoalSelection = profile.wizardGoal ?? (
    profile.goal === 'gain_muscle' || profile.goal === 'gain_weight' || profile.goal === 'athletic' ? 'build_muscle'
      : profile.goal === 'wellness' ? 'maintain_weight'
        : 'lose_weight'
  );
  const watchBenefits = language === 'ar'
    ? [
        { icon: RefreshCw, text: 'مزامنة نشاطك اليومي تلقائيًا' },
        { icon: HeartPulse, text: 'متابعة نبض القلب وجودة النوم' },
        { icon: Activity, text: 'تعديل خطة الوجبات حسب بياناتك الفعلية' },
      ]
    : [
        { icon: RefreshCw, text: 'Auto-sync your daily activity' },
        { icon: HeartPulse, text: 'Track heart rate & sleep quality' },
        { icon: Activity, text: 'Adjust your meal plan based on real data' },
      ];
  const [watchEmail, setWatchEmail] = useState('');
  const [watchJoined, setWatchJoined] = useState(false);
  const [watchLoading, setWatchLoading] = useState(false);
  const [watchError, setWatchError] = useState('');

  const countLocale = localeFor(language);
  const fmtCount = (n: number): string => n.toLocaleString(countLocale);
  const kitchenSectionRef = useRef<HTMLElement | null>(null);
  const widgetCarouselRef = useRef<HTMLDivElement | null>(null);
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

  const [fastingEmail, setFastingEmail] = useState('');
  const [fastingJoined, setFastingJoined] = useState(false);
  const [fastingLoading, setFastingLoading] = useState(false);
  const [fastingError, setFastingError] = useState('');
  const blogSectionRef = useRef<HTMLElement | null>(null);
  const [articlesData, setArticlesData] = useState<typeof import('../data/articles') | null>(null);
  useEffect(() => {
    const node = blogSectionRef.current;
    if (!node) return;
    let cancelled = false;
    const load = () => {
      import('../data/articles')
        .then((mod) => { if (!cancelled) setArticlesData(mod); })
        .catch(() => {});
    };
    if (typeof IntersectionObserver === 'undefined') { load(); return; }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { observer.disconnect(); load(); }
    }, { rootMargin: '320px' });
    observer.observe(node);
    return () => { cancelled = true; observer.disconnect(); };
  }, []);
  const latestArticles = useMemo(
    () => (articlesData ? [...articlesData.ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3) : []),
    [articlesData]
  );
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

  const scrollWidgetCarousel = (direction: -1 | 1) => {
    const track = widgetCarouselRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.home-widget-card');
    const distance = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * distance * (dir === 'rtl' ? -1 : 1), behavior: 'smooth' });
  };

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

  const handleSubscribe = async (e: React.FormEvent, sourceName: string) => {
    e.preventDefault();
    if (!supabaseClient) {
      // Fallback to localStorage if no Supabase
      const email = sourceName === 'Fasting Hub' ? fastingEmail.trim() : watchEmail.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
      try {
        const key = sourceName === 'Fasting Hub' ? 'hf_fasting_notify' : 'hf_watch_notify';
        const saved: string[] = JSON.parse(localStorage.getItem(key) || '[]');
        if (!saved.includes(email)) saved.push(email);
        localStorage.setItem(key, JSON.stringify(saved));
      } catch {}
      if (sourceName === 'Fasting Hub') setFastingJoined(true);
      else setWatchJoined(true);
      return;
    }

    const email = sourceName === 'Fasting Hub' ? fastingEmail.trim() : watchEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    if (sourceName === 'Fasting Hub') {
      setFastingLoading(true);
      setFastingError('');
    } else {
      setWatchLoading(true);
      setWatchError('');
    }

    try {
      if (supabaseClient) {
        const { error } = await supabaseClient.from('subscribers').insert([{ email: email, source: sourceName }]);
        if (!error) {
          if (sourceName === 'Fasting Hub') setFastingJoined(true);
          else setWatchJoined(true);
        } else if ((error as any).code === '23505') {
          if (sourceName === 'Fasting Hub') setFastingError("You're already subscribed!");
          else setWatchError("You're already subscribed!");
        } else {
          if (sourceName === 'Fasting Hub') setFastingError('Something went wrong. Please try again.');
          else setWatchError('Something went wrong. Please try again.');
        }
      } else {
        if (sourceName === 'Fasting Hub') setFastingError('Subscription service is temporarily unavailable.');
        else setWatchError('Subscription service is temporarily unavailable.');
      }
    } catch (err) {
      if (sourceName === 'Fasting Hub') setFastingError('Something went wrong. Please try again.');
      else setWatchError('Something went wrong. Please try again.');
    } finally {
      if (sourceName === 'Fasting Hub') setFastingLoading(false);
      else setWatchLoading(false);
    }
  };

  const handleFastingNotify = (event: React.FormEvent) => {
    handleSubscribe(event, 'Fasting Hub');
  };

  const handleWatchNotify = (event: React.FormEvent) => {
    handleSubscribe(event, 'Sync Devices');
  };

  return (
    <div className="home-shell" dir={dir}>
      <SEO title={t('seo.home.title')} description={t('seo.home.description')} url="/" />
      <section className="hero-section home-hero-hook" dir="ltr">
        <div className="hh-preview__ambient hh-preview__ambient--one" aria-hidden="true" />
        <div className="hh-preview__ambient hh-preview__ambient--two" aria-hidden="true" />
        <div className="hh-preview__hero">
          <div className="hh-preview__message">
            <span className="hh-preview__badge"><Sparkles size={13} /> The Ultimate Health &amp; Diet Platform</span>
            <h1>Know Your Macros.<br />Eat What You <em>Love.</em></h1>
            <p className="hh-preview__subhead">Calculate your daily calories, explore 18,000+ global dishes, and get personalized meal plans in seconds.</p>
            <img
              className="mt-6 aspect-[2/1] w-full max-w-[430px] rounded-2xl object-cover object-center shadow-md"
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&fit=crop&w=800&h=400&fm=webp&q=80"
              alt="A colorful, healthy meal bowl with fresh vegetables"
              width={800}
              height={400}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="hh-preview__proof" aria-label="Platform highlights">
              <div className="hh-proof-item"><span className="hh-proof-item__icon"><UtensilsCrossed size={16} /></span><strong>18,000<sup>+</sup></strong><small>Dishes</small></div>
              <span className="hh-preview__proof-divider" />
              <div className="hh-proof-item"><span className="hh-proof-item__icon"><Languages size={16} /></span><strong>5</strong><small>Languages</small></div>
              <span className="hh-preview__proof-divider" />
              <div className="hh-proof-item"><span className="hh-proof-item__icon"><HeartPulse size={16} /></span><strong>100%</strong><small>Free</small></div>
            </div>
          </div>

          <section className="hh-calculator" aria-labelledby="hh-calculator-heading">
            <div className="hh-calculator__shine" aria-hidden="true" />
            <div className="hh-calculator__topline"><span><i /> YOUR PERSONAL STARTING POINT</span><span className="hh-calculator__time"><Sparkles size={12} /> 30 sec</span></div>
            <div className="hh-calculator__heading"><div><span className="hh-calculator__eyebrow">A FEW QUICK DETAILS</span><h2 id="hh-calculator-heading">Let’s make it <em>yours.</em></h2></div><span className="hh-calculator__step">01 <i>/</i> 01</span></div>

            <form onSubmit={handleHeroCalculate}>
              <div className="hh-form-grid hh-form-grid--three">
                <label className="hh-field" htmlFor="hero-profile-age">
                  <span><CalendarDays size={13} /> Age</span>
                  <span className="hh-field__control"><input id="hero-profile-age" type="number" min="12" max="80" inputMode="numeric" value={profile.age ?? ''} onChange={(event) => { setHeroProfileError(false); updateProfile({ age: event.target.value ? Number(event.target.value) : null }); }} required name="hero-profile-age" /><small>years</small></span>
                </label>
                <label className="hh-field" htmlFor="hero-profile-height">
                  <span><Ruler size={13} /> Height</span>
                  <span className="hh-field__control"><input id="hero-profile-height" type="number" min="120" max="220" inputMode="decimal" value={profile.height ?? ''} onChange={(event) => { setHeroProfileError(false); updateProfile({ height: event.target.value ? Number(event.target.value) : null }); }} required name="hero-profile-height" /><small>cm</small></span>
                </label>
                <label className="hh-field" htmlFor="hero-profile-weight">
                  <span><Scale size={13} /> Weight</span>
                  <span className="hh-field__control"><input id="hero-profile-weight" type="number" min="30" max="250" inputMode="decimal" value={profile.weight ?? ''} onChange={(event) => { setHeroProfileError(false); updateProfile({ weight: event.target.value ? Number(event.target.value) : null }); }} required name="hero-profile-weight" /><small>kg</small></span>
                </label>
              </div>

              <div className="hh-form-grid hh-form-grid--two">
                <fieldset className="hh-gender-field">
                  <legend>Gender</legend>
                  <div className="hh-gender-switch" role="group" aria-label="Gender">
                    <button type="button" className={profile.gender === 'female' ? 'is-selected' : ''} aria-pressed={profile.gender === 'female'} onClick={() => { setHeroProfileError(false); updateProfile({ gender: 'female' }); }}><Venus size={14} /> Woman</button>
                    <button type="button" className={profile.gender === 'male' ? 'is-selected' : ''} aria-pressed={profile.gender === 'male'} onClick={() => { setHeroProfileError(false); updateProfile({ gender: 'male' }); }}><Mars size={14} /> Man</button>
                  </div>
                </fieldset>
                <label className="hh-field hh-goal-field" htmlFor="hero-profile-goal">
                  <span>Your primary goal</span>
                  <span className="hh-select-wrap"><select id="hero-profile-goal" value={heroGoal} onChange={(event) => handleHeroGoalChange(event.target.value as WizardGoalSelection)} name="hero-profile-goal">{HERO_GOALS.map((goal) => <option key={goal.value} value={goal.value}>{goal.label}</option>)}</select><ChevronDown size={15} /></span>
                </label>
              </div>

              {heroProfileError && <p className="hh-profile-error" role="alert">Add your age, measurements, and gender to get started.</p>}
              <button className="hh-calculate-button" type="submit" aria-label="Calculate my health and nutrition results">Calculate My Results <ArrowRight size={19} aria-hidden="true" /></button>
              <p className="hh-no-signup"><ShieldCheck size={14} /> No sign-up required. Instant results.</p>
            </form>
          </section>
        </div>
      </section>

      <TrustBar />

      <section className="section-wrap" id="calculator">
        <div className="section-intro"><span className="step-pill">{t('homeStep1')}</span><h2>{t('homeStep1Title')}</h2><p>{t('homeStep1Desc')}</p></div>
        <div className="explainer-grid">
          <SectionIllustration kind="calculator" />
          <div className="feature-panel">
            <div className="feature-list">{[t('homeFeat1'), t('homeFeat2'), t('homeFeat3')].map((x) => <span key={x}><Check size={15} strokeWidth={3} aria-hidden="true" /> {x}</span>)}</div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn-primary"
            >
              Return to calculator
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
              <div className="condition-grid">{conditions.map(({ icon: Icon, en, ar, path }) => <Link to={path} key={en}><span><Icon size={20} strokeWidth={2.25} aria-hidden="true" /></span><b>{language === 'ar' ? ar : en}</b></Link>)}</div>
              <Link to="/advanced-care" className="btn-primary">{t('homeExploreCare')} <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
      )}

      <HowItWorks />

      <section className="section-wrap trustsec-section">
        <div className="trustsec-head">
          <span className="step-pill gold">{t('trustsec.eyebrow')}</span>
          <h2 className="trustsec-title">{t('homeWidgets.title')}</h2>
          <p className="trustsec-sub">{t('homeWidgets.subtitle')}</p>
          <div className="home-widget-controls" aria-label={t('homeWidgets.carouselLabel')}>
            <button type="button" onClick={() => scrollWidgetCarousel(-1)} aria-label={t('homeWidgets.previous')}><ChevronLeft size={19} /></button>
            <button type="button" onClick={() => scrollWidgetCarousel(1)} aria-label={t('homeWidgets.next')}><ChevronRight size={19} /></button>
          </div>
        </div>

        <div className="home-widget-track no-scrollbar" ref={widgetCarouselRef} role="region" aria-label={t('homeWidgets.carouselLabel')} tabIndex={0}>
          {trustSignals.map(({ icon: Icon, value, decimals, suffix, labelKey }, index) => (
            <div className="trustsec-card home-widget-card" key={labelKey} role="group" aria-roledescription="slide" aria-label={`${index + 1} / ${trustSignals.length}`}>
              <span className="trustsec-icon"><Icon size={24} strokeWidth={2.5} /></span>
              <span className="trustsec-num"><TrustCountUp value={value} decimals={decimals} suffix={suffix} locale={countLocale} /></span>
              <span className="trustsec-label">{t(labelKey)}</span>
            </div>
          ))}
        </div>

        <div className="trustsec-sources">
          <p className="trustsec-sources-title">{t('trustsec.sources.title')}</p>
          <div className="trustsec-sources-row">
            {TRUST_SOURCES.map((source) => <span className="trustsec-source" key={source}>{source}</span>)}
          </div>
          <p className="trustsec-sources-note">{t('trustsec.sources.note')}</p>
        </div>

        <p className="trustsec-disclaimer">{t('trustsec.disclaimer')}</p>
      </section>

      <section className="section-wrap">
        <div className="fasting-card">
          <div className="fasting-copy">
            <span className="step-pill gold">{t('fastingHub.eyebrow')}</span>
            <h2 className="fasting-title">{t('fastingHub.title')}</h2>
            <p className="fasting-sub">{t('fastingHub.subtitle')}</p>
            <ul className="fasting-chips">
              <li><Moon size={18} /><span>{t('fastingHub.chip1')}</span></li>
              <li><Cross size={18} /><span>{t('fastingHub.chip2')}</span></li>
              <li><Timer size={18} /><span>{t('fastingHub.chip3')}</span></li>
            </ul>
            {fastingJoined ? (
              <div className="fasting-thanks" aria-live="polite">
                <CheckCircle2 size={20} />
                <div>
                  <b>{t('fastingHub.thanksTitle')}</b>
                  <p>{t('fastingHub.thanksDesc')}</p>
                </div>
              </div>
            ) : (
              <form className="fasting-form" onSubmit={handleFastingNotify}>
                <input
                  type="email"
                  required
                  value={fastingEmail}
                  onChange={(event) => setFastingEmail(event.target.value)}
                  placeholder={t('fastingHub.notifyPlaceholder')}
                  aria-label={t('fastingHub.notifyPlaceholder')}
                  className="fasting-input" id="field-pages-homepage-465" name="field-pages-homepage-465"
                />
                <button type="submit" className="btn-primary" disabled={fastingLoading}>
                  {fastingLoading ? 'Sending...' : <>{t('fastingHub.notify')} <ArrowRight size={16} className="rtl:rotate-180" /></>}
                </button>
              </form>
            )}
            {fastingError && !fastingJoined && (
              <p className="text-sm text-red-600 mt-2">{fastingError}</p>
            )}
            <p className="fasting-note">{t('fastingHub.privacyNote')}</p>
          </div>
          <div className="fasting-glow" aria-hidden="true"><Hourglass size={132} strokeWidth={1.1} /></div>
        </div>
      </section>

      <section className="section-wrap" ref={blogSectionRef}>
        <div className="trustsec-head">
          <span className="step-pill gold">{t('homeDaily.eyebrow')}</span>
          <h2 className="trustsec-title">{t('homeDaily.title')}</h2>
        </div>
        {articlesData && latestArticles.length > 0 ? (
          <div className="home-daily-layout">
            {(() => {
              const article = latestArticles[0];
              const CategoryIcon = CATEGORY_ICON[article.category];
              return (
                <Link to={`/resources/article/${article.slug}`} className="home-daily-feature">
                  <span className="home-daily-feature-icon"><CategoryIcon size={28} strokeWidth={1.8} /></span>
                  <span className="blog-cat">{t(`article.category.${article.category}` as any)}</span>
                  <h3>{articlesData.lt(article.title, language)}</h3>
                  <p>{articlesData.lt(article.excerpt, language)}</p>
                  <span className="home-daily-date">{new Date(`${article.publishedAt}T00:00:00`).toLocaleDateString(countLocale, { year: 'numeric', month: 'long', day: 'numeric' })} <span>·</span> {article.readTime} {t('homeBlog.minRead')}</span>
                  <span className="blog-more">{t('common.readMore')} <ArrowRight size={15} className="rtl:rotate-180" /></span>
                </Link>
              );
            })()}
            <div className="home-daily-more">
              <h3>{t('homeDaily.more')}</h3>
              {latestArticles.slice(1).map((article) => {
                const CategoryIcon = CATEGORY_ICON[article.category];
                return (
                  <Link to={`/resources/article/${article.slug}`} className="home-daily-link" key={article.id}>
                    <span className="home-daily-link-icon"><CategoryIcon size={19} /></span>
                    <span><small>{t(`article.category.${article.category}` as any)}</small><b>{articlesData.lt(article.title, language)}</b><small>{article.readTime} {t('homeBlog.minRead')}</small></span>
                    <ArrowRight size={16} className="rtl:rotate-180" />
                  </Link>
                );
              })}
              <Link to="/resources" className="home-daily-all">{t('homeBlog.viewAll')} <ArrowRight size={15} className="rtl:rotate-180" /></Link>
            </div>
          </div>
        ) : (
          <div className="home-daily-layout" aria-hidden="true">
            <div className="home-daily-feature blog-card-skeleton" />
            <div className="home-daily-more blog-card-skeleton" />
          </div>
        )}
      </section>

      <section className="section-wrap">
        <div
          dir="ltr"
          className="grid min-w-0 grid-cols-1 items-center gap-7 rounded-[32px] border border-[#E4ECE5] bg-gradient-to-br from-[#F0FAF3] via-white to-[#FFF8E5] p-5 shadow-[0_18px_50px_rgba(15,76,58,0.08)] sm:p-8 md:grid-cols-2 md:gap-10 lg:p-10"
        >
          <div
            role="img"
            aria-label={language === 'ar' ? 'رسم توضيحي لساعة وهاتف متصلين' : 'Smartwatch connected to a phone'}
            className="relative mx-auto flex aspect-square w-full max-w-[360px] items-center justify-center overflow-hidden rounded-[28px] border border-white/80 bg-gradient-to-br from-white via-[#F1F8F1] to-[#FFF6DD] shadow-[0_12px_35px_rgba(15,76,58,0.08)]"
          >
            <div className="absolute left-[14%] top-[17%] flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0F4C3A] shadow-[0_8px_24px_rgba(15,76,58,0.1)]">
              <HeartPulse aria-hidden="true" size={22} />
            </div>
            <div className="absolute bottom-[17%] right-[12%] flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#B28B22] shadow-[0_8px_24px_rgba(15,76,58,0.1)]">
              <Moon aria-hidden="true" size={21} />
            </div>
            <div className="relative z-10 flex items-center gap-2 sm:gap-4">
              <div className="relative flex h-[148px] w-[88px] items-center justify-center rounded-[27px] border-[5px] border-[#0F4C3A] bg-white shadow-[0_14px_30px_rgba(15,76,58,0.16)] sm:h-[170px] sm:w-[100px]">
                <span className="absolute -top-6 h-7 w-12 rounded-t-xl bg-[#D4A017]/70" />
                <span className="absolute -bottom-6 h-7 w-12 rounded-b-xl bg-[#D4A017]/70" />
                <div className="flex h-full w-full flex-col items-center justify-center rounded-[21px] bg-[#F8FAF7] text-[#0F4C3A]">
                  <Watch aria-hidden="true" size={40} strokeWidth={1.7} />
                  <span className="mt-1 text-[11px] font-extrabold">8,420</span>
                  <Activity aria-hidden="true" size={20} className="mt-1 text-[#D4A017]" />
                </div>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4A017]/50 bg-white text-[#0F4C3A] shadow-sm">
                <RefreshCw aria-hidden="true" size={17} />
              </span>
              <div className="relative h-[180px] w-[100px] rounded-[25px] border-[5px] border-[#0F4C3A] bg-[#0F4C3A] p-1.5 shadow-[0_14px_30px_rgba(15,76,58,0.16)] sm:h-[210px] sm:w-[116px]">
                <div className="flex h-full flex-col items-center rounded-[18px] bg-white px-2.5 py-3">
                  <span className="mb-4 h-1.5 w-10 rounded-full bg-[#E5E7EB]" />
                  <Smartphone aria-hidden="true" size={25} className="text-[#0F4C3A]" />
                  <span className="mt-3 text-[10px] font-bold text-gray-700">TODAY</span>
                  <div className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#F0FAF3] px-2 py-2 text-[#0F4C3A]">
                    <HeartPulse aria-hidden="true" size={14} />
                    <span className="text-[10px] font-bold">72 bpm</span>
                  </div>
                  <div className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#FFF8E5] px-2 py-2 text-[#8A6D1B]">
                    <Moon aria-hidden="true" size={14} />
                    <span className="text-[10px] font-bold">7.8 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <span className="absolute bottom-7 left-7 h-2.5 w-2.5 rounded-full bg-[#D4A017]" />
            <span className="absolute right-8 top-8 h-3 w-3 rounded-full bg-[#0F4C3A]/20" />
          </div>

          <div dir={dir} className="min-w-0 text-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A017]/35 bg-white/80 px-3 py-1.5 text-[11px] font-extrabold tracking-[0.12em] text-[#8A6D1B]">
              <span className="h-2 w-2 rounded-full bg-[#D4A017]" />
              {language === 'ar' ? 'مزامنة الساعة الذكية' : 'SMART WATCH SYNC'}
            </span>
            <h2 className="mt-4 text-balance text-[30px] font-extrabold leading-tight tracking-tight text-[#111827] sm:text-[36px]">
              {t('watchHeadline')}
            </h2>
            <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-[#4B5563] sm:text-base">
              {language === 'ar'
                ? 'اربط Apple Watch أو Fitbit أو Garmin لتتبع الخطوات ونبض القلب والنوم تلقائيًا.'
                : 'Connect your Apple Watch, Fitbit, or Garmin to automatically track steps, heart rate, and sleep.'}
            </p>

            <ul className="mt-5 grid gap-3">
              {watchBenefits.map(({ icon: Icon, text }) => (
                <li key={text} className="flex min-w-0 items-center gap-3 text-sm font-medium text-gray-700 sm:text-[15px]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0F4C3A] shadow-sm ring-1 ring-[#0F4C3A]/10">
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <span className="min-w-0 break-words">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#0F4C3A]/10 pt-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                {language === 'ar' ? 'يدعم' : 'SUPPORTED DEVICES'}
              </span>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-extrabold tracking-[0.08em] text-gray-500 grayscale opacity-70" aria-label="Apple Watch, Fitbit, Garmin">
                <span>APPLE WATCH</span>
                <span className="text-[15px] tracking-[0.02em]">fitbit</span>
                <span>GARMIN</span>
              </div>
            </div>

            {watchJoined ? (
              <div role="status" aria-live="polite" className="mt-6 flex max-w-md items-center gap-3 rounded-2xl border border-[#059669]/25 bg-[#F0FAF3] px-5 py-4">
                <CheckCircle2 aria-hidden="true" size={22} className="shrink-0 text-[#059669]" />
                <span>
                  <span className="block text-[15px] font-extrabold text-[#0F4C3A]">{t('watchThanksTitle')}</span>
                  <span className="mt-0.5 block text-[13px] font-medium text-[#6B7A75]">{t('watchThanksDesc')}</span>
                </span>
              </div>
            ) : (
              <form onSubmit={handleWatchNotify} className="mt-6 max-w-md">
                <label htmlFor="watch-email" className="sr-only">{t('watchEmailPlaceholder')}</label>
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <input
                    id="watch-email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={watchEmail}
                    onChange={(event) => setWatchEmail(event.target.value)}
                    placeholder={t('watchEmailPlaceholder')}
                    className="min-w-0 flex-1 rounded-full border border-[#0F4C3A]/15 bg-white px-5 py-3 text-sm font-medium text-[#111827] shadow-sm outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20" name="watch-email"
                  />
                  <button type="submit" className="btn-primary shrink-0" disabled={watchLoading}>
                    {watchLoading ? 'Sending...' : <>{t('watchNotify')} <ArrowRight aria-hidden="true" size={16} className="rtl:rotate-180" /></>}
                  </button>
                </div>
                {watchError && (
                  <p className="mt-2.5 text-xs text-red-600">{watchError}</p>
                )}
                {!watchError && (
                  <p className="mt-2.5 text-xs text-[#6B7A75]">{t('watchPrivacyNote')}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section-wrap final-cta"><div><span className="eyebrow">{t('homeFinalEyebrow')}</span><h2>{t('homeFinalTitle')}</h2><p>{t('homeFinalDesc')}</p><div className="flex justify-center"><StartFreeDropdown /></div></div></section>
    </div>
  );
};

export default HomePage;
