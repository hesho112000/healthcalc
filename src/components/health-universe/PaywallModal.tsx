import React from 'react';
import { ArrowRight, Lock, X } from 'lucide-react';
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

const tt = (t: (key: TKey) => string, key: TKey, params?: Record<string, string>) => {
  let text = t(key);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.split(`{${k}}`).join(v);
    });
  }
  return text;
};

const PaywallModal: React.FC<PaywallModalProps> = ({ open, feature, onClose, onUpgrade }) => {
  const { t, dir } = useLanguage();
  const { tier, tierForFeature } = useSubscription();

  if (!open || !feature) return null;

  const requiredTier = tierForFeature(feature);
  const planName = t(tierPlanKey(requiredTier));
  const price = TIER_PRICE[requiredTier];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" dir={dir}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-[28px] bg-white shadow-2xl overflow-hidden animate-slideUp">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 end-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#0F4C3A] hover:bg-[#F4F1EB] transition-colors"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        <div className="bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-7 text-center text-white">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37]">
            <Lock size={24} strokeWidth={2.2} />
          </span>
          <h3 className="mt-4 text-xl font-extrabold">{t('paywall.locked')}</h3>
          <span className="mt-2 inline-block rounded-full bg-[#D4AF37] px-4 py-1 text-xs font-extrabold text-[#0F4C3A]">
            {t(FEATURES[feature].labelKey)}
          </span>
        </div>

        <div className="p-7">
          <p className="text-center text-sm font-bold text-[#4A5A55]">
            {tt(t, 'paywall.required', { plan: planName })}
          </p>
          <p className="mt-1.5 text-center text-xs leading-relaxed text-[#6B7A75]">
            {tt(t, 'paywall.desc', { plan: planName })}
          </p>

          <div className="mt-5 rounded-2xl border border-[#EFEBE4] bg-[#FDFBF7] p-4 text-center">
            <span className="text-3xl font-extrabold text-[#0F4C3A] tabular-nums">{price}</span>
            <span className="ms-1.5 text-xs font-bold text-[#6B7A75]">{t('paywall.perYear')}</span>
          </div>

          <div className="mt-2 text-center text-[11px] font-semibold text-[#6B7A75]">
            {tt(t, 'paywall.current', { plan: t(tierPlanKey(tier)) })}
          </div>

          <button
            type="button"
            onClick={() => onUpgrade(requiredTier)}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-6 py-3.5 text-sm font-extrabold text-[#0F4C3A] hover:bg-[#c9a12f] shadow-[0_10px_26px_rgba(212,175,55,0.35)] transition-all"
          >
            {t('paywall.upgrade')}
            <ArrowRight size={17} strokeWidth={2.5} className="rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="mt-3 w-full rounded-2xl border border-[#E3DCC9] px-6 py-3 text-sm font-bold text-[#4A5A55] hover:bg-[#F4F1EB] transition-colors"
          >
            {t('paywall.later')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;