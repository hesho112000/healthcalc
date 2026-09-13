import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Plus, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import BodyMap, {
  ORGAN_CONFIG,
  ORGAN_IDS,
  organConditionKey,
  organNameKey,
} from '../components/health-universe/BodyMap';
import type { ConditionId } from '../data/conditions';
import type { OrganId } from '../components/health-universe/BodyMap';

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

const STORAGE_KEY = 'hc_health_universe';

const HealthUniversePage: React.FC = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [toast, setToast] = useState('');
  const [plan, setPlan] = useState<OrganId[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw
        ? (JSON.parse(raw) as OrganId[]).filter((id) => (ORGAN_IDS as readonly string[]).includes(id))
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    } catch {
      /* ignore */
    }
  }, [plan]);

  const togglePlan = (id: OrganId) =>
    setPlan((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const handleTogglePlan = (id: OrganId) => {
    const adding = !plan.includes(id);
    togglePlan(id);
    if (adding) {
      showToast(tt(t, 'universe.toast.added', { condition: t(organConditionKey(id)) }));
    }
  };

  const unionConditions = useMemo(() => {
    const set = new Set<string>();
    plan.forEach((id) => ORGAN_CONFIG[id].conditionIds.forEach((cid) => set.add(cid)));
    return [...set] as ConditionId[];
  }, [plan]);

  const handleContinue = () => {
    if (unionConditions.length > 0) {
      navigate(`/advanced-care/wizard?conditions=${unionConditions.join(',')}`);
    } else {
      navigate('/advanced-care/wizard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
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
        <div
          className="max-w-2xl mx-auto rounded-[32px] border border-[#EFEBE4] bg-white/80 p-6 sm:p-8 shadow-[0_18px_50px_rgba(15,76,58,0.06)]"
        >
          <BodyMap />
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm font-bold text-[#4A5A55] bg-[#F4F1EB] rounded-2xl px-5 py-3">
          {t('universe.hint')}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-12 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ORGAN_IDS.map((id) => {
            const inPlan = plan.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => navigate(`/advanced-care/${id}`)}
                className="group flex flex-col rounded-[24px] border border-[#EFEBE4] bg-white p-5 text-start shadow-[0_8px_24px_rgba(15,76,58,0.04)] hover:border-[#D4AF37]/70 hover:shadow-[0_14px_34px_rgba(15,76,58,0.10)] transition-all"
              >
                <span className="flex items-start justify-between">
                  <span className="w-11 h-11 rounded-2xl bg-[#F4F1EB] flex items-center justify-center text-xl group-hover:bg-[#D4AF37]/15 transition-colors">
                    {ORGAN_CONFIG[id].emoji}
                  </span>
                </span>
                <span className="mt-3 block text-base font-extrabold text-[#0F4C3A] leading-tight">
                  {t(organNameKey(id))}
                </span>
                <span className="mt-1 block text-[11px] font-bold text-[#6B7A75]">
                  {t(organConditionKey(id))}
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTogglePlan(id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTogglePlan(id);
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
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          {plan.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {plan.map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#EFEBE4] px-3 py-1.5 text-xs font-bold text-[#0F4C3A]"
                >
                  <span>{ORGAN_CONFIG[id].emoji}</span>
                  {t(organNameKey(id))}
                  <button
                    type="button"
                    onClick={() => handleTogglePlan(id)}
                    aria-label={t('universe.tools.back')}
                    className="text-[#4A5A55] hover:text-[#B91C1C] transition-colors"
                  >
                    <X size={13} strokeWidth={2.5} />
                  </button>
                </span>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 text-sm font-extrabold text-[#0F4C3A] hover:bg-[#c9a12f] shadow-[0_10px_26px_rgba(212,175,55,0.35)] transition-all"
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