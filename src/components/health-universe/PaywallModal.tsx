import React from 'react';
import { ArrowRight, Check, Lock, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';
import {
  FEATURES,
  TIER_PRICE,
  tierPlanKey,
  useSubscription,
} from '../../context/SubscriptionContext';
import type { FeatureId, Tier } from '../../context/SubscriptionContext';

type TKey = keyof typeof translations.en;

interface PaywallModalProps {
  open: boolean;
  feature: FeatureId | null;
  onClose: () => void;
  onUpgrade: (tier: Tier) => void;
}

const TTS = (
  t: (key: TKey) => string,
  key: TKey,
  params?: Record<string, string>,
): string => {
  let text = t(key);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.split(`{${k}}`).join(v);
    });
  }
  return text;
};

const TIERS: Array<{ tier: Tier; items: TKey[] }> = [
  { tier: 'basic', items: ['feat.dashboard', 'feat.meals', 'feat.exercises'] },
  {
    tier: 'pro',
    items: ['feat.dashboard', 'feat.meals', 'feat.exercises', 'feat.lab', 'feat.fullPlan', 'feat.pdf'],
  },
  {
    tier: 'elite',
    items: [
      'feat.dashboard',
      'feat.meals',
      'feat.exercises',
      'feat.lab',
      'feat.fullPlan',
      'feat.pdf',
      'feat.sync',
      'feat.support',
    ],
  },
];

const PaywallModal: React.FC<PaywallModalProps> = ({ open, feature, onClose, onUpgrade }) => {
  const { t, dir } = useLanguage();
  const { tierForFeature } = useSubscription();

  if (!open || !feature) return null;

  const requiredTier = tierForFeature(feature);
  const planName = t(tierPlanKey(requiredTier));
  const highlighted = requiredTier === 'basic' ? 0 : requiredTier === 'pro' ? 1 : 2;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" dir={dir}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl animate-slideUp">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 end-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F1EB] text-[#0F4C3A] hover:bg-[#EFEBE4] transition-colors"
        >
          <X size={17} strokeWidth={2.5} />
        </button>

        <div className="px-7 pt-9 pb-2 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F4C3A]/10 text-[#0F4C3A]">
            <Lock size={24} strokeWidth={2.2} />
          </span>
          <h3 className="mt-4 text-[28px] font-extrabold leading-none text-[#0F4C3A]">
            {t('paywall.title')}
          </h3>
          <p className="mt-3 text-base text-[#6B7A75]">
            {TTS(t, 'paywall.subtitle', { requiredTier: planName })}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 px-7 pt-6 md:grid-cols-3">
          {TIERS.map(({ tier, items }, index) => {
            const isRequired = index === highlighted;
            return (
              <div
                key={tier}
                className={`relative rounded-3xl border p-5 ${
                  isRequired
                    ? 'border-[#D4AF37] bg-[#FDFBF7] shadow-[0_12px_28px_rgba(212,175,55,0.25)]'
                    : 'border-[#EFEBE4] bg-white'
                }`}
              >
                {isRequired && (
                  <span className="absolute -top-2.5 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rounded-full bg-[#D4AF37] px-3 py-0.5 text-[10px] font-extrabold text-[#0F4C3A]">
                    {t(FEATURES[feature].labelKey)}
                  </span>
                )}
                <div className="text-sm font-extrabold text-[#0F4C3A]">
                  {t(`paywall.tier.${tier}` as TKey)}
                </div>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-2xl font-extrabold text-[#0F4C3A] tabular-nums">
                    {TIER_PRICE[tier]}
                  </span>
                  <span className="mb-0.5 text-[11px] font-bold text-[#6B7A75]">
                    {t('paywall.perMonth')}
                  </span>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-start">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0F4C3A]/10 text-[#0F4C3A]">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span className="text-xs font-semibold text-[#4A5A55]">{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="px-7 pb-9 pt-6 text-center">
          <button
            type="button"
            onClick={() => onUpgrade(requiredTier)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 text-base font-extrabold text-[#0F4C3A] hover:bg-[#c9a12f] shadow-[0_10px_26px_rgba(212,175,55,0.35)] transition-all"
          >
            {t('paywall.cta.startTrial')}
            <ArrowRight size={19} strokeWidth={2.5} className="rtl:rotate-180" />
          </button>
          <p className="mt-3 text-xs font-semibold text-[#6B7A75]">{t('paywall.trust')}</p>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;