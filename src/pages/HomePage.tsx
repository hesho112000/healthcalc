import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, CheckCircle2, Cross, Droplet, Dumbbell, Globe, HeartPulse, Hourglass, Languages, Moon, RefreshCw, Salad, Smartphone, Sparkles, Star, Target, Timer, TrendingDown, Users, UtensilsCrossed, Watch } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ArticleCategory } from '../data/articles';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import { useUserProfile } from '../hooks/useUserProfile';
import SectionIllustration from '../components/illustrations/SectionIllustration';
import HealthFingerprint from '../components/illustrations/HealthFingerprint';
import FloatingStats from '../components/illustrations/FloatingStats';
import TrustBar from '../components/sections/TrustBar';
import HowItWorks from '../components/sections/HowItWorks';
import StartFreeDropdown from '../components/layout/StartFreeDropdown';
import Flag from '../components/common/Flag';
import { ENABLE_PREMIUM } from '../config/featureFlags';

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

type TrustLabelKey = 'trustsec.stat1.label' | 'trustsec.stat2.label' | 'trustsec.stat3.label' | 'trustsec.stat4.label';

const trustSignals: Array<{ icon: LucideIcon; value: number; decimals?: number; suffix?: string; labelKey: TrustLabelKey }> = [
  { icon: Star, value: 4.9, decimals: 1, suffix: '/5', labelKey: 'trustsec.stat1.label' },
  { icon: Users, value: 12450, suffix: '+', labelKey: 'trustsec.stat2.label' },
  { icon: TrendingDown, value: 3.2, decimals: 1, suffix: ' kg', labelKey: 'trustsec.stat3.label' },
  { icon: Target, value: 92, suffix: '%', labelKey: 'trustsec.stat4.label' },
];

const TRUST_SOURCES = ['WHO', 'ADA', 'NHS', 'Mayo Clinic', 'Harvard Medical'];

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
  const { profile, updateProfile, resetProfile } = useUserProfile();
  const inputClass = 'mixed-text mt-1 block w-full border-0 bg-transparent p-0 text-sm font-bold text-[#0F4C3A] outline-none focus:ring-0';
  const selectClass = 'mt-1 w-full min-w-0 rounded-lg border border-[#E4E8E2] bg-white px-2 py-1.5 text-xs font-semibold text-[#0F4C3A] outline-none focus:border-[#0F4C3A]';
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

  const countLocale = localeFor(language);
  const fmtCount = (n: number): string => n.toLocaleString(countLocale);
  const kitchenSectionRef = useRef<HTMLElement | null>(null);
  const [kitchenData, setKitchenData] = useState<typeof import('../data/kitchens') | null>(null);
  useEffect(() => {
    const node = kitchenSectionRef.current;
    if (!node) return;
    let cancelled = false;
    const load = () => {
      import('../data/kitchens')
        .then((mod) => { if (!cancelled) setKitchenData(mod); })
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
  const heroSamples = useMemo(() => {
    if (!kitchenData || !countryKitchens[0]) return [];
    return Array.from(new Set(countryKitchens[0].dishes.map((d) => kitchenData.getDishName(d, language)).filter(Boolean))).slice(0, 3);
  }, [kitchenData, countryKitchens, language]);

  const [fastingEmail, setFastingEmail] = useState('');
  const [fastingJoined, setFastingJoined] = useState(false);
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

  const handleFastingNotify = (event: React.FormEvent) => {
    event.preventDefault();
    const email = fastingEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    try {
      const saved: string[] = JSON.parse(localStorage.getItem('hf_fasting_notify') || '[]');
      if (!saved.includes(email)) saved.push(email);
      localStorage.setItem('hf_fasting_notify', JSON.stringify(saved));
    } catch {}
    setFastingJoined(true);
  };

  const handleWatchNotify = (event: React.FormEvent) => {
    event.preventDefault();
    const email = watchEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    try {
      const saved: string[] = JSON.parse(localStorage.getItem('hf_watch_notify') || '[]');
      if (!saved.includes(email)) saved.push(email);
      localStorage.setItem('hf_watch_notify', JSON.stringify(saved));
    } catch {}
    setWatchJoined(true);
  };

  return (
    <div className="home-shell" dir={dir}>
      <SEO title={t('seo.home.title')} description={t('seo.home.description')} url="/" />
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
              <div className="hero-stats" aria-label="HealthFingerprint in numbers">
                <div className="hero-stat">
                  <span className="hero-stat-icon"><UtensilsCrossed aria-hidden="true" size={19} /></span>
                  <span className="min-w-0"><b>{t('heroStatDishesValue')}</b><small>{t('heroStatDishesLabel')}</small></span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-icon"><Globe aria-hidden="true" size={19} /></span>
                  <span className="min-w-0"><b>{t('heroStatKitchensValue')}</b><small>{t('heroStatKitchensLabel')}</small></span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-icon"><Languages aria-hidden="true" size={19} /></span>
                  <span className="min-w-0"><b>{t('heroStatLanguagesValue')}</b><small>{t('heroStatLanguagesLabel')}</small></span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-icon"><Star aria-hidden="true" size={19} /></span>
                  <span className="min-w-0"><b>{t('trustRatingValue')}</b><small>{t('trustRating')}</small></span>
                </div>
              </div>
              <div className="hero-actions">
                <Link to="/fitness" className="hero-cta">{t('heroCta')} <ArrowRight aria-hidden="true" size={20} className="rtl:rotate-180" /></Link>
                <a href="#how-it-works" className="hero-link">{t('heroSecondaryCta')}</a>
              </div>
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
            <div className="mock-inputs">
              <div>
                <label htmlFor="home-profile-age">{t('homeMockAge')} (years)</label>
                <input id="home-profile-age" type="number" min={10} max={120} inputMode="numeric" className={inputClass} value={profile.age ?? ''} placeholder="28" onChange={(event) => updateProfile({ age: event.target.value ? Number(event.target.value) : null })} />
              </div>
              <div>
                <label htmlFor="home-profile-height">{t('homeMockHeight')} (cm)</label>
                <input id="home-profile-height" type="number" min={100} max={250} inputMode="decimal" className={inputClass} value={profile.height ?? ''} placeholder="172" onChange={(event) => updateProfile({ height: event.target.value ? Number(event.target.value) : null })} />
              </div>
              <div>
                <label htmlFor="home-profile-weight">{t('homeMockWeight')} (kg)</label>
                <input id="home-profile-weight" type="number" min={20} max={300} inputMode="decimal" className={inputClass} value={profile.weight ?? ''} placeholder="74" onChange={(event) => updateProfile({ weight: event.target.value ? Number(event.target.value) : null })} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <label className="min-w-0 text-[10px] font-extrabold tracking-wide text-[#6B7A75]" htmlFor="home-profile-gender">
                {t('gender')}
                <select id="home-profile-gender" className={selectClass} value={profile.gender ?? ''} onChange={(event) => updateProfile({ gender: event.target.value === 'male' || event.target.value === 'female' ? event.target.value : null })}>
                  <option value="">{language === 'ar' ? 'اختر' : 'Select'}</option>
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                </select>
              </label>
              <label className="min-w-0 text-[10px] font-extrabold tracking-wide text-[#6B7A75]" htmlFor="home-profile-activity">
                {t('activityLevel')}
                <select id="home-profile-activity" className={selectClass} value={profile.activityLevel ?? ''} onChange={(event) => updateProfile({ activityLevel: (event.target.value || null) as typeof profile.activityLevel })}>
                  <option value="">{language === 'ar' ? 'اختر' : 'Select'}</option>
                  {(['sedentary', 'light', 'moderate', 'active', 'very_active'] as const).map((level) => <option key={level} value={level}>{t(`wizard.activity.${level}` as any)}</option>)}
                </select>
              </label>
              <label className="min-w-0 text-[10px] font-extrabold tracking-wide text-[#6B7A75]" htmlFor="home-profile-goal">
                {t('goal')}
                <select id="home-profile-goal" className={selectClass} value={profile.goal ?? ''} onChange={(event) => updateProfile({ goal: (event.target.value || null) as typeof profile.goal })}>
                  <option value="">{language === 'ar' ? 'اختر' : 'Select'}</option>
                  {(['lose', 'gain_muscle', 'gain_weight', 'wellness', 'athletic'] as const).map((goalKey) => <option key={goalKey} value={goalKey}>{t(`wizard.step4.goalTypes.${goalKey === 'gain_muscle' ? 'gainMuscle' : goalKey === 'gain_weight' ? 'gainWeight' : goalKey}` as any)}</option>)}
                </select>
              </label>
            </div>
            <div className="feature-list">{[t('homeFeat1'), t('homeFeat2'), t('homeFeat3')].map((x) => <span key={x}>✓ {x}</span>)}</div>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/fitness" className="btn-primary">{t('homeTryCalc')} <span>→</span></Link>
              <button type="button" onClick={resetProfile} className="rounded-full px-3 py-2 text-xs font-semibold text-[#6B7A75] hover:bg-[#F4F1EB]">
                {language === 'ar' ? 'مسح البيانات' : 'Reset data'}
              </button>
            </div>
            <p className="panel-note">{t('homePanelNote')}</p>
          </div>
        </div>
      </section>

      <section className="section-wrap section-tint" ref={kitchenSectionRef}>
        {kitchenData && heroKitchen ? (
          <>
            <div className="kitchen-head">
              <span className="step-pill gold">{t('kitchensEyebrow')}</span>
              <h2 className="kitchen-title">{countryKitchens.length} {t('kitchensTitleKitchens')}<span className="kitchen-title-dot">·</span>{fmtCount(kitchenData.totalDishesAll)} {t('kitchensTitleDishes')}</h2>
              <p className="kitchen-sub">{t('kitchensSubtitle')}</p>
              <Link to="/weight-loss" className="btn-primary">{t('kitchensViewAll')} <ArrowRight size={16} className="rtl:rotate-180" /></Link>
            </div>

            <div className="kitchen-bento">
              <Link to="/weight-loss" className="kitchen-tile kitchen-tile-hero">
                <span className="kitchen-flag-wrap"><Flag countryCode={heroKitchen.flag} alt={kitchenData.getKitchenCountry(heroKitchen, language)} className="h-10 w-14" /></span>
                <span className="kitchen-featured-label">{t('kitchensFeatured')}</span>
                <h3 className="kitchen-tile-name">{kitchenData.getKitchenName(heroKitchen, language)}</h3>
                <p className="kitchen-tile-meta">{kitchenData.getKitchenCountry(heroKitchen, language)} · {fmtCount(heroKitchen.total)} {t('kitchensDishes')}</p>
                <ul className="kitchen-samples">{heroSamples.map((s) => <li key={s}>{s}</li>)}</ul>
                <span className="kitchen-cta">{t('kitchensExplore').replace('{kitchen}', kitchenData.getKitchenName(heroKitchen, language))} <ArrowRight size={16} className="rtl:rotate-180" /></span>
              </Link>
              {countryKitchens.slice(1, 4).map((k, i) => (
                <Link to="/weight-loss" key={k.id} className={`kitchen-tile kitchen-tile-small${i === 2 ? ' kitchen-tile-wide' : ''}`}>
                  <span className="kitchen-flag-wrap"><Flag countryCode={k.flag} alt={kitchenData.getKitchenCountry(k, language)} className="h-7 w-10" /></span>
                  <h4 className="kitchen-tile-name small">{kitchenData.getKitchenName(k, language)}</h4>
                  <p className="kitchen-tile-meta">{fmtCount(k.total)} {t('kitchensDishes')}</p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="kitchen-bento kitchen-bento-loading" aria-hidden="true">
            <div className="kitchen-tile kitchen-tile-hero" />
            <div className="kitchen-tile kitchen-tile-small" />
            <div className="kitchen-tile kitchen-tile-small" />
            <div className="kitchen-tile kitchen-tile-small kitchen-tile-wide" />
          </div>
        )}
      </section>

      {ENABLE_PREMIUM && (
        <section className="section-wrap">
          <div className="explainer-grid">
            <SectionIllustration kind="care" />
            <div className="section-intro"><span className="step-pill purple">{t('homeStep3')}</span><h2>{t('homeStep3Title')}</h2><p>{t('homeStep3Desc')}</p>
              <div className="condition-grid">{conditions.map(([icon, en, ar, path]) => <Link to={path} key={en}><span>{icon}</span><b>{language === 'ar' ? ar : en}</b></Link>)}</div>
              <Link to="/advanced-care" className="btn-primary">{t('homeExploreCare')} <span>→</span></Link>
            </div>
          </div>
        </section>
      )}

      <HowItWorks />

      <section className="section-wrap trustsec-section">
        <div className="trustsec-head">
          <span className="step-pill gold">{t('trustsec.eyebrow')}</span>
          <h2 className="trustsec-title">{t('trustsec.title')}</h2>
          <p className="trustsec-sub">{t('trustsec.subtitle')}</p>
        </div>

        <div className="trustsec-grid">
          {trustSignals.map(({ icon: Icon, value, decimals, suffix, labelKey }) => (
            <div className="trustsec-card" key={labelKey}>
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
                  className="fasting-input"
                />
                <button type="submit" className="btn-primary">{t('fastingHub.notify')} <ArrowRight size={16} className="rtl:rotate-180" /></button>
              </form>
            )}
            <p className="fasting-note">{t('fastingHub.privacyNote')}</p>
          </div>
          <div className="fasting-glow" aria-hidden="true"><Hourglass size={132} strokeWidth={1.1} /></div>
        </div>
      </section>

      <section className="section-wrap" ref={blogSectionRef}>
        <div className="trustsec-head">
          <span className="step-pill gold">{t('homeBlog.eyebrow')}</span>
          <h2 className="trustsec-title">{t('homeBlog.title')}</h2>
        </div>
        {articlesData ? (
          <div className="blog-grid">
            {latestArticles.map((article) => {
              const CategoryIcon = CATEGORY_ICON[article.category];
              return (
                <Link to={`/resources/article/${article.slug}`} className="blog-card" key={article.id}>
                  <span className="blog-thumb"><CategoryIcon size={26} strokeWidth={2} /></span>
                  <span className="blog-cat">{t(`article.category.${article.category}` as any)}</span>
                  <h3 className="blog-title">{articlesData.lt(article.title, language)}</h3>
                  <p className="blog-excerpt">{articlesData.lt(article.excerpt, language)}</p>
                  <span className="blog-meta">{article.readTime} {t('homeBlog.minRead')}</span>
                  <span className="blog-more">{t('common.readMore')} <ArrowRight size={15} className="rtl:rotate-180" /></span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="blog-grid" aria-hidden="true">
            <div className="blog-card blog-card-skeleton" />
            <div className="blog-card blog-card-skeleton" />
            <div className="blog-card blog-card-skeleton" />
          </div>
        )}
        <div className="blog-cta">
          <Link to="/resources" className="btn-primary">{t('homeBlog.viewAll')} <ArrowRight size={16} className="rtl:rotate-180" /></Link>
        </div>
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
                    className="min-w-0 flex-1 rounded-full border border-[#0F4C3A]/15 bg-white px-5 py-3 text-sm font-medium text-[#111827] shadow-sm outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20"
                  />
                  <button type="submit" className="btn-primary shrink-0">
                    {t('watchNotify')} <ArrowRight aria-hidden="true" size={16} className="rtl:rotate-180" />
                  </button>
                </div>
                <p className="mt-2.5 text-xs text-[#6B7A75]">{t('watchPrivacyNote')}</p>
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
