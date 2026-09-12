import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

interface EmbeddedPricingProps {
  onCta: () => void;
}

interface Plan {
  id: number;
  featured: boolean;
  badgeKey: string;
  nameKey: string;
  priceKey: string;
  periodKey: string;
  saveKey: string;
  perMonthKey: string;
  ctaKey: string;
  featKeys: string[];
}

const plans: Plan[] = [
  {
    id: 1,
    featured: false,
    badgeKey: 'advanced.pricing.plan1.save',
    nameKey: 'advanced.pricing.plan1.name',
    priceKey: 'advanced.pricing.plan1.price',
    periodKey: 'advanced.pricing.plan1.period',
    saveKey: 'advanced.pricing.plan1.save',
    perMonthKey: 'wizard.blueprint.pricing.perMonth1',
    ctaKey: 'advanced.pricing.plan1.cta',
    featKeys: ['advanced.pricing.plan1.feat1', 'advanced.pricing.plan1.feat2', 'advanced.pricing.plan1.feat3', 'advanced.pricing.plan1.feat4'],
  },
  {
    id: 2,
    featured: false,
    badgeKey: 'advanced.pricing.plan2.save',
    nameKey: 'advanced.pricing.plan2.name',
    priceKey: 'advanced.pricing.plan2.price',
    periodKey: 'advanced.pricing.plan2.period',
    saveKey: 'advanced.pricing.plan2.save',
    perMonthKey: 'wizard.blueprint.pricing.perMonth2',
    ctaKey: 'advanced.pricing.plan2.cta',
    featKeys: ['advanced.pricing.plan2.feat1', 'advanced.pricing.plan2.feat2', 'advanced.pricing.plan2.feat3', 'advanced.pricing.plan2.feat4'],
  },
  {
    id: 3,
    featured: true,
    badgeKey: 'advanced.pricing.bestValue',
    nameKey: 'advanced.pricing.plan3.name',
    priceKey: 'advanced.pricing.plan3.price',
    periodKey: 'advanced.pricing.plan3.period',
    saveKey: 'advanced.pricing.plan3.save',
    perMonthKey: 'wizard.blueprint.pricing.perMonth3',
    ctaKey: 'advanced.pricing.plan3.cta',
    featKeys: ['advanced.pricing.plan3.feat1', 'advanced.pricing.plan3.feat2', 'advanced.pricing.plan3.feat3', 'advanced.pricing.plan3.feat4'],
  },
];

const EmbeddedPricing: React.FC<EmbeddedPricingProps> = ({ onCta }) => {
  const { t, dir } = useLanguage();
  const tk = (key: string) => key as keyof typeof translations.en;

  return (
    <section dir={dir}>
      <div className="max-w-2xl mx-auto text-center">
        <span className="eyebrow">{t(tk('wizard.blueprint.pricing.eyebrow'))}</span>
        <h2 className="mt-3 text-3xl md:text-[36px] font-extrabold tracking-tight text-[#0F4C3A]">
          {t(tk('wizard.blueprint.pricing.title'))}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#4A5A55]">{t(tk('wizard.blueprint.pricing.subtitle'))}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-[28px] p-8 transition ${
              plan.featured
                ? 'border-2 border-[#D4AF37] bg-[#0F4C3A] text-[#FDFBF7] shadow-[0_22px_60px_rgba(15,76,58,0.3)]'
                : 'border border-[#EFEBE4] bg-white text-slate-900 hover:border-[#D4AF37]/60'
            }`}
          >
            {plan.featured && (
              <span className={`absolute -top-3.5 rounded-full bg-[#D4AF37] text-[11px] font-extrabold uppercase tracking-[2px] px-4 py-1 text-[#0F4C3A] ${dir === 'rtl' ? 'right-6' : 'left-6'}`}>
                {t(tk(plan.badgeKey))}
              </span>
            )}

            <span className="inline-flex w-fit rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
              {t(tk(plan.nameKey))}
            </span>

            <div className="mt-5 flex items-end gap-1.5">
              <span className="text-4xl font-extrabold text-[#D4AF37]">{t(tk(plan.priceKey))}</span>
              <span className={`mb-1 text-sm font-bold ${plan.featured ? 'text-[#A7C4B8]' : 'text-[#4A5A55]'}`}>
                {t(tk(plan.periodKey))}
              </span>
            </div>
            <span className={`mt-1 text-[11px] font-bold ${plan.featured ? 'text-[#FDFBF7]/60' : 'text-[#4A5A55]'}`}>
              {t(tk(plan.perMonthKey))}
            </span>
            <span className={`mt-2 inline-flex w-fit rounded-full bg-[#D4AF37]/15 px-3 py-1 text-[11px] font-extrabold text-[#D4AF37]`}>
              {t(tk(plan.saveKey))}
            </span>

            <div className="mt-5 space-y-3">
              {plan.featKeys.map((featKey) => (
                <div key={featKey} className="flex items-start gap-2.5">
                  <CheckCircle2 size={17} strokeWidth={2.2} className="mt-0.5 shrink-0 text-[#D4AF37]" />
                  <span className={`text-sm font-semibold leading-snug ${plan.featured ? 'text-[#FDFBF7]' : 'text-[#0F4C3A]'}`}>
                    {t(tk(featKey))}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onCta}
              className="mt-8 w-full rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-extrabold text-[#0F4C3A] shadow-[0_12px_28px_-10px_rgba(212,175,55,0.55)] transition hover:bg-[#C9A032]"
            >
              {t(tk(plan.ctaKey))}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs font-bold text-[#4A5A55]">{t(tk('advanced.pricing.note'))}</p>
    </section>
  );
};

export default EmbeddedPricing;