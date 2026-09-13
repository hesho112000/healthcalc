import React from 'react';
import { translations } from '../../i18n/translations';
import { TIER_PRICE, tierPlanKey } from '../../context/SubscriptionContext';
import type { Tier } from '../../context/SubscriptionContext';
import type { TKey } from './stepTypes';

type T = (key: TKey) => string;

const tk = (key: string): TKey => key as TKey;

interface SubscriptionStepProps {
  t: T;
  hasFull: boolean;
  onTrial: () => void;
  onPreview: () => void;
  onFree: () => void;
}

const COMPARE: Array<{ key: TKey; free: boolean; basic: boolean; pro: boolean; elite: boolean }> = [
  { key: 'wizard.subscription.row.daily' as TKey, free: false, basic: true, pro: true, elite: true },
  { key: 'wizard.subscription.row.scores' as TKey, free: true, basic: true, pro: true, elite: true },
  { key: 'wizard.subscription.row.cuisine' as TKey, free: false, basic: false, pro: true, elite: true },
  { key: 'wizard.subscription.row.subs' as TKey, free: false, basic: false, pro: true, elite: true },
  { key: 'wizard.subscription.row.chat' as TKey, free: false, basic: false, pro: true, elite: true },
  { key: 'wizard.subscription.row.pdf' as TKey, free: false, basic: false, pro: true, elite: true },
  { key: 'wizard.subscription.row.family' as TKey, free: false, basic: false, pro: false, elite: true },
];

const TIERS: Tier[] = ['free', 'basic', 'pro', 'elite'];

const Cell: React.FC<{ ok: boolean }> = ({ ok }) => (
  <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-extrabold ${ok ? 'bg-[#0F4C3A]/10 text-[#0F4C3A]' : 'text-[#C7CFCB]'}`}>
    {ok ? '✓' : '—'}
  </span>
);

const SubscriptionStep: React.FC<SubscriptionStepProps> = ({ t, hasFull, onTrial, onPreview, onFree }) => (
  <div className="space-y-8">
    <section className="rounded-[32px] border-2 border-[#D4AF37] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-8 text-center md:p-12">
      <h2 className="text-2xl font-extrabold tracking-tight text-[#FDFBF7] md:text-[34px]">{t(tk('wizard.subscription.title'))}</h2>
      <p className="mt-3 text-sm text-[#A7C4B8] md:text-[15px]">{t(tk('wizard.subscription.subtitle'))}</p>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={onTrial}
          className="w-full max-w-md rounded-full bg-[#D4AF37] px-8 py-4 font-extrabold text-[#0F4C3A] shadow-[0_14px_34px_-10px_rgba(212,175,55,0.75)] transition hover:bg-[#c9a52e]"
        >
          {t(tk('wizard.subscription.trial'))}
        </button>
        <button
          type="button"
          onClick={onPreview}
          className="w-full max-w-md rounded-full border border-[#D4AF37]/70 text-[#D4AF37] px-8 py-3.5 font-bold transition hover:bg-[#D4AF37]/10"
        >
          {t(tk('wizard.subscription.preview'))}
        </button>
        <button
          type="button"
          onClick={onFree}
          className="text-sm font-semibold text-[#A7C4B8] underline underline-offset-4 transition hover:text-[#FDFBF7]"
        >
          {t(tk('wizard.subscription.free'))}
        </button>
      </div>
      {hasFull && (
        <p className="mt-5 rounded-full bg-[#FDFBF7]/10 px-5 py-2 text-xs font-bold text-[#D4AF37] inline-block">
          ✓ {t(tk('wizard.subscription.trial.sub'))}
        </p>
      )}
    </section>

    <section className="rounded-[28px] border border-[#EFEBE4] bg-white p-6 md:p-8">
      <h3 className="font-extrabold text-lg text-[#0F4C3A] mb-4">{t(tk('wizard.subscription.compare'))}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr>
              <th className="text-start font-extrabold text-[#0F4C3A] py-2" />
              {TIERS.map((tier) => (
                <th key={tier} className="text-center font-extrabold text-[#0F4C3A] py-2">
                  {t(tierPlanKey(tier))}
                  <span className="block text-xs font-bold text-[#D4AF37] tabular-nums">{TIER_PRICE[tier]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row) => (
              <tr key={row.key} className="border-t border-[#EFEBE4]">
                <td className="py-3 text-[#4A5A55] font-semibold">{t(row.key)}</td>
                <td className="py-3 text-center"><Cell ok={row.free} /></td>
                <td className="py-3 text-center"><Cell ok={row.basic} /></td>
                <td className="py-3 text-center"><Cell ok={row.pro} /></td>
                <td className="py-3 text-center"><Cell ok={row.elite} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </div>
);

export default SubscriptionStep;