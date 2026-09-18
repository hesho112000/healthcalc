import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Plus, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import { translations } from '../i18n/translations';
import { CONDITION_DATA, UNIVERSE_CONDITION_IDS } from '../data/conditions';
import type { ConditionId } from '../data/conditions';
import BodyMap, { BODY_DOTS, dotNameKey } from '../components/health-universe/BodyMap';

type TKey = keyof typeof translations.en;

const tt = (t: (key: TKey) => string, key: TKey, params?: Record<string, string>): string => {
  let text = t(key);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.split(`{${k}}`).join(v);
    });
  }
  return text;
};

const STORAGE_KEY = 'healthcalc_conditions';
const LEGACY_STORAGE_KEY = 'hc_health_universe';

const LEGACY_ORGAN_CONDITION: Record<string, ConditionId> = {
  brain: 'mental-wellness',
  thyroid: 'thyroid',
  heart: 'heart-lipids',
  pancreas: 'diabetes',
  liver: 'liver',
  kidneys: 'kidney',
  gut: 'ibs',
  joints: 'gout',
};

const CONDITION_ROUTE: Record<ConditionId, string> = BODY_DOTS.reduce(
  (map, dot) => ({ ...map, [dot.id]: dot.route }),
  {} as Record<ConditionId, string>,
);

const wkey = (id: ConditionId, suffix: 'name' | 'desc'): TKey =>
  `wizard.condition.${id}.${suffix}` as TKey;

const HealthUniversePage: React.FC = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [toast, setToast] = useState('');

  const [selected, setSelected] = useState<ConditionId[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return (JSON.parse(raw) as ConditionId[]).filter((id) =>
          (UNIVERSE_CONDITION_IDS as readonly string[]).includes(id),
        );
      }
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        const legacyIds = JSON.parse(legacyRaw) as string[];
        return [...new Set(legacyIds.map((id) => LEGACY_ORGAN_CONDITION[id]).filter(Boolean))] as ConditionId[];
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    } catch {
      /* ignore */
    }
  }, [selected]);

  const toggleCondition = (id: ConditionId) =>
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const handleToggleCondition = (id: ConditionId) => {
    const adding = !selected.includes(id);
    toggleCondition(id);
    if (adding) {
      showToast(tt(t, 'universe.toast.added', { condition: t(dotNameKey(id)) }));
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      navigate(`/advanced-care/wizard?conditions=${selected.join(',')}`);
    } else {
      navigate('/advanced-care/wizard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <SEO title={t('seo.universe.title')} description={t('seo.universe.description')} url="/advanced-care" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalWebPage',
          name: t('seo.universe.title'),
          description: t('seo.universe.description'),
          url: 'https://hesho112000.github.io/healthcalc/#/advanced-care',
          about: { '@type': 'MedicalCondition' },
          audience: { '@type': 'MedicalAudience' },
        })}</script>
      </Helmet>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_120%_at_50%_0%,rgba(212,175,55,0.10),rgba(255,255,255,0)_60%)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-12 text-center">
          <span className="hero-eyebrow" aria-hidden="true" />
          <h1 className="hero-title">
            <span className="hero-title-line1">{t('universe.title')}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#4A5A55]">{t('universe.subtitle')}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6">
        <div className="max-w-md mx-auto rounded-[32px] border border-[#EFEBE4] bg-[#FDFBF7] p-6 sm:p-8 shadow-[0_18px_50px_rgba(15,76,58,0.06)]">
          <BodyMap selectedConditions={selected} />
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm font-bold text-[#4A5A55] bg-[#F4F1EB] rounded-2xl px-5 py-3">
          {t('universe.hint')}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-14 pb-28">
        <h2 className="text-center text-2xl font-extrabold text-[#0F4C3A]">
          {t('universe.conditionsTitle' as TKey)}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {UNIVERSE_CONDITION_IDS.map((id) => {
            const inPlan = selected.includes(id);
            const data = CONDITION_DATA[id];
            return (
              <div
                key={id}
                className="group flex flex-col rounded-[24px] border border-[#EFEBE4] bg-white p-5 shadow-[0_8px_24px_rgba(15,76,58,0.04)] hover:border-[#D4AF37]/70 hover:shadow-[0_14px_34px_rgba(15,76,58,0.10)] transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F1EB] text-xl group-hover:bg-[#D4AF37]/15 transition-colors">
                    {data.icon}
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate(`/advanced-care/${CONDITION_ROUTE[id]}`)}
                    className="text-[11px] font-bold text-[#0F4C3A] underline decoration-[#D4AF37] underline-offset-4 hover:text-[#D4AF37] transition-colors"
                  >
                    {t('universe.viewDetails' as TKey)}
                  </button>
                </div>
                <span className="mt-3 block text-base font-extrabold text-[#0F4C3A] leading-tight">
                  {t(wkey(id, 'name'))}
                </span>
                <span className="mt-1 block text-[12px] font-semibold text-[#6B7A75] leading-relaxed">
                  {t(wkey(id, 'desc'))}
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => handleToggleCondition(id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggleCondition(id);
                    }
                  }}
                  className={`mt-4 inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-extrabold transition-colors ${
                    inPlan
                      ? 'bg-[#0F4C3A]/10 text-[#0F4C3A]'
                      : 'bg-[#D4AF37]/15 text-[#6a4f0e] hover:bg-[#D4AF37]/25'
                  }`}
                >
                  {inPlan ? <Check size={13} strokeWidth={2.5} /> : <Plus size={13} strokeWidth={2.5} />}
                  <span className="pointer-events-none">
                    {inPlan ? t('universe.cta.added') : t('universe.cta.addToPlan')}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <h2 className="text-center text-lg font-extrabold text-[#0F4C3A]">
            {t('universe.selectedConditions' as TKey)}
          </h2>
          {selected.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2">
              {selected.map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#EFEBE4] px-3 py-1.5 text-xs font-bold text-[#0F4C3A]"
                >
                  <span>{CONDITION_DATA[id].icon}</span>
                  {t(dotNameKey(id))} ✓
                  <button
                    type="button"
                    onClick={() => handleToggleCondition(id)}
                    aria-label={`${t('universe.cta.addToPlan')} ${t(dotNameKey(id))}`}
                    className="text-[#4A5A55] hover:text-[#B91C1C] transition-colors"
                  >
                    <X size={13} strokeWidth={2.5} />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm font-bold text-[#6B7A75] bg-[#F4F1EB] rounded-2xl px-5 py-3">
              {t('universe.noConditions' as TKey)}
            </p>
          )}
          <button
            type="button"
            onClick={handleContinue}
            disabled={selected.length === 0}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-extrabold transition-all ${
              selected.length > 0
                ? 'bg-[#D4AF37] text-[#0F4C3A] hover:bg-[#c9a12f] shadow-[0_10px_26px_rgba(212,175,55,0.35)]'
                : 'bg-[#EFEBE4] text-[#6B7A75] cursor-not-allowed'
            }`}
          >
            {t('universe.continueCta')}
            <ArrowRight size={18} strokeWidth={2.5} className="rtl:rotate-180" />
          </button>
        </div>
      </section>

      {toast && (
        <div className="fixed bottom-24 inset-x-0 z-[60] flex justify-center px-4 pointer-events-none">
          <div className="rounded-full bg-[#0F4C3A] text-[#FDFBF7] text-sm font-bold px-6 py-3 shadow-lg">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthUniversePage;