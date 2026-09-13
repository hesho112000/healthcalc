import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CreditCard, History, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSubscription, TIER_PRICE, tierPlanKey } from '../context/SubscriptionContext';
import type { Tier } from '../context/SubscriptionContext';
import { translations } from '../i18n/translations';

type TKey = keyof typeof translations.en;

const tk = (key: string): TKey => key as TKey;

const TIERS: Tier[] = ['free', 'basic', 'pro', 'elite'];

const formatDate = (days: number): string => {
  const date = new Date(Date.now() + days * 86400000);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const SubscriptionPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const { tier, upgrade, setTier } = useSubscription();
  const [toast, setToast] = useState('');

  const index = TIERS.indexOf(tier);
  const nextTier = index < TIERS.length - 1 ? TIERS[index + 1] : null;
  const prevTier = index > 0 ? TIERS[index - 1] : null;

  const note = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const handleUpgrade = () => {
    if (!nextTier) return;
    upgrade(nextTier);
    note(`${t(tierPlanKey(nextTier))} · ${t(tk('sub.upgraded'))}`);
  };

  const handleDowngrade = () => {
    if (!prevTier) return;
    setTier(prevTier);
    note(`${t(tierPlanKey(prevTier))} · ${t(tk('sub.downgraded'))}`);
  };

  const handleCancel = () => {
    setTier('free');
    note(t(tk('sub.cancelled')));
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <header className="bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] text-[#FDFBF7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <Link
            to="/my-health-hub"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FDFBF7]/80 hover:text-[#D4AF37] transition-colors mb-5"
          >
            <ArrowRight size={14} strokeWidth={2.5} className="rtl:rotate-180" />
            {t(tk('sub.backToHub'))}
          </Link>
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
            <ShieldCheck size={14} />
            {t(tk('sub.eyebrow'))}
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">{t(tk('sub.title'))}</h1>
          <p className="mt-2 text-sm text-[#FDFBF7]/75 max-w-xl">{t(tk('sub.subtitle'))}</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 space-y-6 pb-16">
        <section className="rounded-[32px] border-2 border-[#D4AF37] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-8 text-[#FDFBF7]">
          <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
            {t(tk('sub.currentPlan'))}
          </span>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            <div>
              <span className="block text-xs font-bold text-[#FDFBF7]/60">{t(tk('sub.planName'))}</span>
              <b className="mt-1 block text-3xl font-extrabold">{t(tierPlanKey(tier))}</b>
            </div>
            <div>
              <span className="block text-xs font-bold text-[#FDFBF7]/60">{t(tk('sub.planPrice'))}</span>
              <b className="mt-1 block text-3xl font-extrabold text-[#D4AF37] tabular-nums">{TIER_PRICE[tier]}</b>
            </div>
            <div>
              <span className="block text-xs font-bold text-[#FDFBF7]/60">{t(tk('sub.nextBilling'))}</span>
              <b className="mt-1 block text-lg font-extrabold tabular-nums">
                {tier === 'free' ? '—' : formatDate(30)}
              </b>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#FDFBF7]/10 px-3 py-1 text-xs font-bold">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                {t(tk(tier === 'free' ? 'sub.statusFree' : 'sub.statusActive'))}
              </span>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleUpgrade}
              disabled={!nextTier}
              className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-[#0F4C3A] px-6 py-3 text-sm font-extrabold hover:bg-[#c9a52e] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t(tk('sub.upgrade'))}
              <ArrowLeft size={15} strokeWidth={2.5} className="rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={handleDowngrade}
              disabled={!prevTier}
              className="inline-flex items-center gap-2 rounded-full bg-[#FDFBF7]/10 text-[#FDFBF7] px-6 py-3 text-sm font-extrabold hover:bg-[#FDFBF7]/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t(tk('sub.downgrade'))}
            </button>
            {tier !== 'free' && (
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-2 rounded-full border border-[#B91C1C]/70 text-[#f2a0a0] px-6 py-3 text-sm font-extrabold hover:bg-[#B91C1C]/20 transition"
              >
                {t(tk('sub.cancel'))}
              </button>
            )}
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
            <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
              <CreditCard size={14} />
              {t(tk('sub.paymentMethod'))}
            </span>
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#F4F1EB] p-4">
              <span className="inline-flex h-10 w-14 items-center justify-center rounded-lg bg-[#0F4C3A] text-xs font-extrabold text-[#FDFBF7]">
                VISA
              </span>
              <div>
                <b className="block text-sm text-[#0F4C3A] tabular-nums">{t(tk('sub.card'))}</b>
                <span className="text-xs text-[#6B7A75]">{t(tk('sub.cardHint'))}</span>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
            <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
              <History size={14} />
              {t(tk('sub.billingHistory'))}
            </span>
            <p className="mt-4 text-sm text-[#6B7A75]">{t(tk('sub.billingEmpty'))}</p>
          </section>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-8 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
          <div className="rounded-full bg-[#0F4C3A] text-[#FDFBF7] text-sm font-bold px-6 py-3 shadow-lg">{toast}</div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;