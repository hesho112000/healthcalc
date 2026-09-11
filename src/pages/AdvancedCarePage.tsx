import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  ChevronDown,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

type TKey = keyof typeof translations.en;

const conditions: { id: string; icon: string; titleKey: TKey; descKey: TKey }[] = [
  { id: 'diabetes', icon: '🩸', titleKey: 'advanced.condition.diabetes.title', descKey: 'advanced.condition.diabetes.desc' },
  { id: 'hypertension', icon: '💗', titleKey: 'advanced.condition.hypertension.title', descKey: 'advanced.condition.hypertension.desc' },
  { id: 'cholesterol', icon: '🫀', titleKey: 'advanced.condition.cholesterol.title', descKey: 'advanced.condition.cholesterol.desc' },
  { id: 'gout', icon: '🦶', titleKey: 'advanced.condition.gout.title', descKey: 'advanced.condition.gout.desc' },
  { id: 'liver', icon: '🧡', titleKey: 'advanced.condition.liver.title', descKey: 'advanced.condition.liver.desc' },
  { id: 'kidney', icon: '🫘', titleKey: 'advanced.condition.kidney.title', descKey: 'advanced.condition.kidney.desc' },
  { id: 'thyroid', icon: '🦋', titleKey: 'advanced.condition.thyroid.title', descKey: 'advanced.condition.thyroid.desc' },
  { id: 'ibs', icon: '🌿', titleKey: 'advanced.condition.ibs.title', descKey: 'advanced.condition.ibs.desc' },
];

const whyFeatures: { icon: React.ReactNode; titleKey: TKey; descKey: TKey }[] = [
  { icon: <ShieldCheck size={22} strokeWidth={2.2} />, titleKey: 'advanced.why.feature1.title', descKey: 'advanced.why.feature1.desc' },
  { icon: <Microscope size={22} strokeWidth={2.2} />, titleKey: 'advanced.why.feature2.title', descKey: 'advanced.why.feature2.desc' },
  { icon: <TrendingUp size={22} strokeWidth={2.2} />, titleKey: 'advanced.why.feature3.title', descKey: 'advanced.why.feature3.desc' },
  { icon: <BellRing size={22} strokeWidth={2.2} />, titleKey: 'advanced.why.feature4.title', descKey: 'advanced.why.feature4.desc' },
];

const steps: { icon: React.ReactNode; titleKey: TKey; descKey: TKey }[] = [
  { icon: <HeartPulse size={22} strokeWidth={2.2} />, titleKey: 'advanced.howItWorks.step1.title', descKey: 'advanced.howItWorks.step1.desc' },
  { icon: <Microscope size={22} strokeWidth={2.2} />, titleKey: 'advanced.howItWorks.step2.title', descKey: 'advanced.howItWorks.step2.desc' },
  { icon: <Sparkles size={22} strokeWidth={2.2} />, titleKey: 'advanced.howItWorks.step3.title', descKey: 'advanced.howItWorks.step3.desc' },
];

interface PlanItem {
  id: string;
  nameKey: TKey;
  priceKey: TKey;
  periodKey: TKey;
  saveKey: TKey;
  ctaKey: TKey;
  featKeys: TKey[];
  featured: boolean;
}

const plans: PlanItem[] = [
  {
    id: 'plan1',
    nameKey: 'advanced.pricing.plan1.name',
    priceKey: 'advanced.pricing.plan1.price',
    periodKey: 'advanced.pricing.plan1.period',
    saveKey: 'advanced.pricing.plan1.save',
    ctaKey: 'advanced.pricing.plan1.cta',
    featKeys: ['advanced.pricing.plan1.feat1', 'advanced.pricing.plan1.feat2', 'advanced.pricing.plan1.feat3', 'advanced.pricing.plan1.feat4'],
    featured: false,
  },
  {
    id: 'plan2',
    nameKey: 'advanced.pricing.plan2.name',
    priceKey: 'advanced.pricing.plan2.price',
    periodKey: 'advanced.pricing.plan2.period',
    saveKey: 'advanced.pricing.plan2.save',
    ctaKey: 'advanced.pricing.plan2.cta',
    featKeys: ['advanced.pricing.plan2.feat1', 'advanced.pricing.plan2.feat2', 'advanced.pricing.plan2.feat3', 'advanced.pricing.plan2.feat4'],
    featured: false,
  },
  {
    id: 'plan3',
    nameKey: 'advanced.pricing.plan3.name',
    priceKey: 'advanced.pricing.plan3.price',
    periodKey: 'advanced.pricing.plan3.period',
    saveKey: 'advanced.pricing.plan3.save',
    ctaKey: 'advanced.pricing.plan3.cta',
    featKeys: ['advanced.pricing.plan3.feat1', 'advanced.pricing.plan3.feat2', 'advanced.pricing.plan3.feat3', 'advanced.pricing.plan3.feat4'],
    featured: true,
  },
];

const faqs: { qKey: TKey; aKey: TKey }[] = [
  { qKey: 'advanced.faq.q1', aKey: 'advanced.faq.a1' },
  { qKey: 'advanced.faq.q2', aKey: 'advanced.faq.a2' },
  { qKey: 'advanced.faq.q3', aKey: 'advanced.faq.a3' },
  { qKey: 'advanced.faq.q4', aKey: 'advanced.faq.a4' },
  { qKey: 'advanced.faq.q5', aKey: 'advanced.faq.a5' },
];

const AdvancedCarePage: React.FC = () => {
  const { t, dir } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-[#FDFBF7] overflow-hidden" dir={dir}>
      {/* HERO */}
      <section className="hero-section relative">
        <div className="hero-mesh" />
        <div className="max-w-7xl mx-auto px-6 py-14 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
            <div className="hero-copy">
              <span className="hero-eyebrow">{t('advanced.hero.eyebrow')}</span>
              <h1 className="hero-title">
                <span className="hero-title-line1">{t('advanced.hero.title')}</span>
              </h1>
              <p>{t('advanced.hero.subtitle')}</p>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link to="/register" className="btn-primary">{t('advanced.hero.ctaPrimary')}</Link>
                <a href="#advanced-conditions" className="btn-outline">{t('advanced.hero.ctaSecondary')}</a>
              </div>
              <div className="hero-trust">
                <span>{t('advanced.trust.badge1')}</span>
                <span className="hero-trust-sep">·</span>
                <span>{t('advanced.trust.badge2')}</span>
                <span className="hero-trust-sep">·</span>
                <span>{t('advanced.trust.badge3')}</span>
                <span className="hero-trust-sep">·</span>
                <span>{t('advanced.trust.badge4')}</span>
              </div>
            </div>

            {/* Glass lab card visual */}
            <div className="relative hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-md rounded-[28px] border border-[#EFEBE4] bg-white/80 backdrop-blur-xl p-7 shadow-[0_22px_70px_rgba(15,76,58,0.16)]">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F4F1EB] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[2px] text-[#0F4C3A]">
                  <Microscope size={13} strokeWidth={2.4} /> {t('advanced.lab.eyebrow')}
                </span>
                <div className="mt-5 grid gap-3">
                  {[
                    ['🩸', 'advanced.lab.field.fasting.label', '126'],
                    ['💗', 'advanced.lab.field.systolic.label', '120'],
                    ['🫀', 'advanced.lab.field.hdl.label', '48'],
                  ].map(([icon, labelKey, value]) => (
                    <div key={String(labelKey)} className="flex items-center gap-3 rounded-2xl bg-[#FDFBF7] p-3.5 border border-[#EFEBE4]">
                      <span className="w-10 h-10 shrink-0 rounded-xl bg-white flex items-center justify-center text-lg">{icon}</span>
                      <span className="flex-1 text-sm font-bold text-[#0F4C3A]">{t(labelKey as TKey)}</span>
                      <span className="px-3 py-1 rounded-lg bg-[#0F4C3A] text-white text-sm font-extrabold">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#0F4C3A] to-[#1a6b53] p-4 text-white">
                  <Stethoscope size={18} strokeWidth={2.2} className="text-[#D4AF37]" />
                  <span className="text-sm font-bold leading-snug">{t('advanced.lab.interpretation')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-[#EFEBE4] bg-[#F4F1EB]">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          {[
            ['🛡️', 'advanced.trust.badge1'],
            ['🧪', 'advanced.trust.badge2'],
            ['📈', 'advanced.trust.badge3'],
            ['🌍', 'advanced.trust.badge4'],
          ].map(([icon, key]) => (
            <span key={String(key)} className="flex items-center justify-center gap-2.5 text-sm font-extrabold text-[#0F4C3A]">
              <span className="text-lg">{icon}</span>
              {t(key as TKey)}
            </span>
          ))}
        </div>
      </section>

      {/* CONDITIONS GRID */}
      <section id="advanced-conditions" className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow">{t('advanced.conditions.title')}</span>
          <h2 className="mt-4 text-3xl md:text-[40px] font-extrabold tracking-tight text-[#0F4C3A] leading-tight">
            {t('advanced.conditions.title')}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#6B7A75]">{t('advanced.conditions.subtitle')}</p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {conditions.map(({ id, icon, titleKey, descKey }) => (
            <Link
              key={id}
              to={`/advanced-care/lab?condition=${id}`}
              className="group rounded-[24px] border border-[#EFEBE4] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-[0_18px_50px_rgba(15,76,58,0.1)]"
            >
              <span className="inline-flex w-12 h-12 items-center justify-center rounded-2xl bg-[#F4F1EB] text-2xl transition-transform duration-300 group-hover:scale-110">
                {icon}
              </span>
              <h3 className="mt-4 text-[17px] font-extrabold text-[#0F4C3A] leading-snug">{t(titleKey)}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6B7A75]">{t(descKey)}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-extrabold text-[#B8860B] transition-colors group-hover:text-[#D4AF37]">
                {t('advanced.conditions.explore')}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY ADVANCED CARE */}
      <section className="border-y border-[#EFEBE4] bg-[#F4F1EB]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="eyebrow">{t('advanced.why.title')}</span>
            <h2 className="mt-4 text-3xl md:text-[40px] font-extrabold tracking-tight text-[#0F4C3A] leading-tight">
              {t('advanced.why.title')}
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {whyFeatures.map(({ icon, titleKey, descKey }) => (
              <div key={titleKey} className="rounded-[24px] bg-white border border-[#EFEBE4] p-7 flex gap-5">
                <span className="w-12 h-12 shrink-0 inline-flex items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#0F4C3A]">
                  {icon}
                </span>
                <div>
                  <h3 className="text-[17px] font-extrabold text-[#0F4C3A]">{t(titleKey)}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#6B7A75]">{t(descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <span className="eyebrow">{t('advanced.howItWorks.title')}</span>
          <h2 className="mt-4 text-3xl md:text-[40px] font-extrabold tracking-tight text-[#0F4C3A] leading-tight">
            {t('advanced.howItWorks.title')}
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map(({ icon, titleKey, descKey }, index) => (
            <div key={titleKey} className="relative rounded-[24px] border border-[#EFEBE4] bg-white p-7 text-center">
              <span className="absolute -top-3 left-6 rounded-full bg-[#0F4C3A] text-white text-[11px] font-extrabold px-3 py-1">
                0{index + 1}
              </span>
              <span className="mx-auto mt-2 w-12 h-12 inline-flex items-center justify-center rounded-2xl bg-[#F4F1EB] text-[#0F4C3A]">
                {icon}
              </span>
              <h3 className="mt-4 text-[17px] font-extrabold text-[#0F4C3A]">{t(titleKey)}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#6B7A75]">{t(descKey)}</p>
            </div>
          ))}
        </div>

        {/* Free vs Advanced comparison */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          <div className="rounded-[28px] border border-[#EFEBE4] bg-white p-8 flex flex-col">
            <span className="inline-flex w-fit rounded-full bg-[#F4F1EB] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[2px] text-[#6B7A75]">
              {t('howItWorks.free.badge')}
            </span>
            <h3 className="mt-4 text-xl font-extrabold text-[#0F4C3A]">{t('howItWorks.free.title')}</h3>
            <p className="mt-2 text-sm text-[#6B7A75]">{t('howItWorks.free.subtitle')}</p>
            <div className="mt-6 space-y-4">
              {[
                ['howItWorks.free.step1.title', 'howItWorks.free.step1.desc'],
                ['howItWorks.free.step2.title', 'howItWorks.free.step2.desc'],
                ['howItWorks.free.step3.title', 'howItWorks.free.step3.desc'],
              ].map(([titleKey, descKey]) => (
                <div key={String(titleKey)} className="flex gap-3">
                  <CheckCircle2 size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-[#6B7A75]" />
                  <div>
                    <b className="block text-sm font-extrabold text-[#0F4C3A]">{t(titleKey as TKey)}</b>
                    <span className="text-[13px] text-[#6B7A75] leading-relaxed">{t(descKey as TKey)}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/fitness" className="btn-outline w-full mt-8">{t('howItWorks.free.cta')}</Link>
            <p className="mt-3 text-center text-xs font-bold text-[#6B7A75]">{t('howItWorks.free.note')}</p>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <span className="rounded-full bg-[#D4AF37] text-[#0F4C3A] text-[11px] font-extrabold tracking-[2px] px-4 py-2">{t('howItWorks.or')}</span>
          </div>

          <div className="relative rounded-[28px] border-2 border-[#D4AF37] bg-[#0F4C3A] p-8 flex flex-col shadow-[0_22px_60px_rgba(15,76,58,0.3)]">
            <span className="absolute -top-3.5 right-6 rounded-full bg-[#D4AF37] text-[#0F4C3A] px-4 py-1 text-[11px] font-extrabold uppercase tracking-[2px]">
              {t('howItWorks.advanced.floatingBadge')}
            </span>
            <span className="inline-flex w-fit rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
              {t('howItWorks.advanced.badge')}
            </span>
            <h3 className="mt-4 text-xl font-extrabold text-white">{t('howItWorks.advanced.title')}</h3>
            <p className="mt-2 text-sm text-[#A7C4B8]">{t('howItWorks.advanced.subtitle')}</p>
            <div className="mt-6 space-y-4">
              {[
                ['howItWorks.advanced.step1.title', 'howItWorks.advanced.step1.desc'],
                ['howItWorks.advanced.step2.title', 'howItWorks.advanced.step2.desc'],
                ['howItWorks.advanced.step3.title', 'howItWorks.advanced.step3.desc'],
                ['howItWorks.advanced.step4.title', 'howItWorks.advanced.step4.desc'],
              ].map(([titleKey, descKey]) => (
                <div key={String(titleKey)} className="flex gap-3">
                  <CheckCircle2 size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-[#D4AF37]" />
                  <div>
                    <b className="block text-sm font-extrabold text-white">{t(titleKey as TKey)}</b>
                    <span className="text-[13px] text-[#A7C4B8] leading-relaxed">{t(descKey as TKey)}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/register" className="btn-primary w-full mt-8">{t('howItWorks.advanced.cta')}</Link>
            <p className="mt-3 text-center text-xs font-bold text-[#A7C4B8]">{t('howItWorks.advanced.note')}</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-[#EFEBE4] bg-[#F4F1EB]">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <span className="eyebrow">{t('advanced.pricing.title')}</span>
            <h2 className="mt-4 text-3xl md:text-[40px] font-extrabold tracking-tight text-[#0F4C3A] leading-tight">
              {t('advanced.pricing.title')}
            </h2>
            <p className="mt-3 text-[15px] text-[#6B7A75]">{t('advanced.pricing.subtitle')}</p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mx-auto max-w-5xl">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-[28px] p-8 ${
                  plan.featured
                    ? 'bg-[#0F4C3A] text-white border-2 border-[#D4AF37] shadow-[0_22px_60px_rgba(15,76,58,0.3)]'
                    : 'bg-white border border-[#EFEBE4]'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#D4AF37] text-[#0F4C3A] px-4 py-1 text-[11px] font-extrabold uppercase tracking-[2px]">
                    {t('advanced.pricing.bestValue')}
                  </span>
                )}
                <h3 className="text-lg font-extrabold">{t(plan.nameKey)}</h3>
                <span
                  className={`mt-1 w-fit rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ${
                    plan.featured ? 'bg-white/10 text-[#D4AF37]' : 'bg-[#F4F1EB] text-[#B8860B]'
                  }`}
                >
                  {t(plan.saveKey)}
                </span>
                <div className={`mt-5 flex items-baseline gap-1 ${plan.featured ? 'text-white' : 'text-[#0F4C3A]'}`}>
                  <span className="text-[44px] font-extrabold leading-none tracking-tight">{t(plan.priceKey)}</span>
                  <span className={`text-sm font-bold ${plan.featured ? 'text-[#A7C4B8]' : 'text-[#6B7A75]'}`}>{t(plan.periodKey)}</span>
                </div>
                <ul className="mt-6 space-y-3.5">
                  {plan.featKeys.map((featKey) => (
                    <li key={featKey} className="flex gap-3 text-[14px] leading-snug">
                      <CheckCircle2 size={18} strokeWidth={2.4} className={`mt-0.5 shrink-0 ${plan.featured ? 'text-[#D4AF37]' : 'text-[#0F4C3A]'}`} />
                      <span className={plan.featured ? 'text-[#EAF3EF]' : 'text-[#334155]'}>{t(featKey)}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={`${plan.featured ? 'btn-primary' : 'btn-outline'} w-full mt-8`}>
                  {t(plan.ctaKey)}
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm font-bold text-[#6B7A75]">
            {t('advanced.pricing.note')}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-[#0F4C3A] leading-tight">FAQ</h2>
        </div>
        <div className="mt-12 space-y-4">
          {faqs.map(({ qKey, aKey }, index) => {
            const open = openFaq === index;
            return (
              <div key={qKey} className={`rounded-2xl border transition-colors ${open ? 'border-[#D4AF37] bg-white' : 'border-[#EFEBE4] bg-white'}`}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
                  aria-expanded={open}
                >
                  <span className="text-[16px] font-extrabold text-[#0F4C3A]">{t(qKey)}</span>
                  <ChevronDown
                    size={20}
                    strokeWidth={2.6}
                    className={`shrink-0 text-[#0F4C3A] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[14px] leading-relaxed text-[#6B7A75]">{t(aKey)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-wrap final-cta">
        <div>
          <span className="eyebrow">{t('advanced.trust.badge1')}</span>
          <h2>{t('advanced.finalCta.title')}</h2>
          <div className="flex justify-center">
            <Link to="/register" className="btn-primary">
              {t('advanced.finalCta.cta')}
              <ArrowRight size={18} strokeWidth={2.5} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedCarePage;