import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, History, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSubscription, TIER_PRICE, tierPlanKey } from '../context/SubscriptionContext';
import { translations } from '../i18n/translations';

type TKey = keyof typeof translations.en;

const tk = (key: string): TKey => key as TKey;

const SubscriptionPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const { tier } = useSubscription();

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <header className="bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] text-[#FDFBF7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <Link
            to="/my-health-hub"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FDFBF7]/80 hover:text-[#D4A017] transition-colors mb-5"
          >
            <ArrowRight size={14} strokeWidth={2.5} className="rtl:rotate-180" />
            {t(tk('sub.backToHub'))}
          </Link>
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[2px] text-[#D4A017]">
            <ShieldCheck size={14} />
            {t(tk('sub.eyebrow'))}
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">{t(tk('sub.title'))}</h1>
          <p className="mt-2 text-sm text-[#FDFBF7]/75 max-w-xl">{t(tk('sub.subtitle'))}</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 space-y-6 pb-16">
        <section className="rounded-[32px] border-2 border-[#D4A017] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-8 text-[#FDFBF7]">
          <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4A017]">
            {t(tk('sub.currentPlan'))}
          </span>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            <div>
              <span className="block text-xs font-bold text-[#FDFBF7]/60">{t(tk('sub.planName'))}</span>
              <b className="mt-1 block text-3xl font-extrabold">{t(tierPlanKey(tier))}</b>
            </div>
            <div>
              <span className="block text-xs font-bold text-[#FDFBF7]/60">{t(tk('sub.planPrice'))}</span>
              <b className="mt-1 block text-3xl font-extrabold text-[#D4A017] tabular-nums">{TIER_PRICE[tier]}</b>
            </div>
            <div>
              <span className="block text-xs font-bold text-[#FDFBF7]/60">{t(tk('sub.nextBilling'))}</span>
              <b className="mt-1 block text-lg font-extrabold tabular-nums">
                —
              </b>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#FDFBF7]/10 px-3 py-1 text-xs font-bold">
                <span className="h-2 w-2 rounded-full bg-[#D4A017]" />
                {t(tk(tier === 'free' ? 'sub.statusFree' : 'sub.statusActive'))}
              </span>
            </div>
          </div>
          <div role="status" className="mt-8 rounded-2xl bg-[#FDFBF7]/10 p-4 text-sm font-semibold text-[#FDFBF7]">
            Coming Soon — Premium · {t('universe.comingSoon')}
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
            <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4A017]">
              <CreditCard size={14} />
              {t(tk('sub.paymentMethod'))}
            </span>
            <p className="mt-4 rounded-2xl bg-[#F4F1EB] p-4 text-sm text-[#6B7A75]">{t('universe.comingSoon')}</p>
          </section>

          <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
            <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4A017]">
              <History size={14} />
              {t(tk('sub.billingHistory'))}
            </span>
            <p className="mt-4 text-sm text-[#6B7A75]">{t(tk('sub.billingEmpty'))}</p>
          </section>
        </div>
      </main>

    </div>
  );
};

export default SubscriptionPage;
