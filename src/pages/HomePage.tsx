import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Clock, HeartPulse, Moon, RefreshCw, Smartphone, Watch } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import SectionIllustration from '../components/illustrations/SectionIllustration';
import HealthFingerprint from '../components/illustrations/HealthFingerprint';
import FloatingStats from '../components/illustrations/FloatingStats';
import TrustBar from '../components/sections/TrustBar';
import TrustStats from '../components/sections/TrustStats';
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

const cuisines: Array<{ name: string; countryCode?: string; icon?: string }> = [
  { countryCode: 'eg', name: 'Egyptian' }, { countryCode: 'in', name: 'Indian' },
  { countryCode: 'sa', name: 'Arabic' }, { countryCode: 'gr', name: 'Mediterranean' },
  { icon: '🌏', name: 'Asian' }, { countryCode: 'us', name: 'American' },
  { icon: '🥗', name: 'Vegetarian' }, { icon: '🥑', name: 'Keto' },
];

const HomePage: React.FC = () => {
  const { t, dir, language } = useLanguage();
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
            <div className="cuisine-grid">{cuisines.map(({ countryCode, icon, name }) => <span key={name}>{countryCode ? <Flag countryCode={countryCode} alt={`${name} flag`} /> : icon} {name}</span>)}</div>
            <Link to="/weight-loss" className="btn-primary">{t('homeSeePlan')} <span>→</span></Link>
          </div>
          <SectionIllustration kind="plan" />
        </div>
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

      <TrustStats />

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
                <span className="absolute -top-6 h-7 w-12 rounded-t-xl bg-[#D4AF37]/70" />
                <span className="absolute -bottom-6 h-7 w-12 rounded-b-xl bg-[#D4AF37]/70" />
                <div className="flex h-full w-full flex-col items-center justify-center rounded-[21px] bg-[#F8FAF7] text-[#0F4C3A]">
                  <Watch aria-hidden="true" size={40} strokeWidth={1.7} />
                  <span className="mt-1 text-[11px] font-extrabold">8,420</span>
                  <Activity aria-hidden="true" size={20} className="mt-1 text-[#D4AF37]" />
                </div>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-white text-[#0F4C3A] shadow-sm">
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
            <span className="absolute bottom-7 left-7 h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />
            <span className="absolute right-8 top-8 h-3 w-3 rounded-full bg-[#0F4C3A]/20" />
          </div>

          <div dir={dir} className="min-w-0 text-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-white/80 px-3 py-1.5 text-[11px] font-extrabold tracking-[0.12em] text-[#8A6D1B]">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
              {language === 'ar' ? 'مزامنة الساعة الذكية' : 'SMART WATCH SYNC'}
            </span>
            <h2 className="mt-4 text-balance text-[30px] font-extrabold leading-tight tracking-tight text-[#111827] sm:text-[36px]">
              {language === 'ar' ? 'زامن ساعتك الذكية' : 'Sync Your Wearable'}
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

            <div role="status" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#FFF8E5] px-5 py-2.5 text-sm font-bold text-[#806313]">
              <Clock aria-hidden="true" size={17} />
              {language === 'ar' ? 'قريبًا' : 'Coming Soon'}
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap final-cta"><div><span className="eyebrow">{t('homeFinalEyebrow')}</span><h2>{t('homeFinalTitle')}</h2><p>{t('homeFinalDesc')}</p><div className="flex justify-center"><StartFreeDropdown /></div></div></section>
    </div>
  );
};

export default HomePage;
