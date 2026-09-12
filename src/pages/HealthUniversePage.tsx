import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, LayoutDashboard, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import BodyMap, {
  ORGAN_CONFIG,
  ORGAN_IDS,
  organNameKey,
  organStatus,
  organScore,
} from '../components/health-universe/BodyMap';
import HealthCard from '../components/health-universe/HealthCard';
import { exercisePoolFor, foodPoolFor, mostRestrictiveCondition } from '../data/conditions';
import type { ConditionId } from '../data/conditions';
import type { OrganId } from '../components/health-universe/BodyMap';

type TKey = keyof typeof translations.en;

const STORAGE_KEY = 'hc_health_universe';

const HealthUniversePage: React.FC = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [activeOrgan, setActiveOrgan] = useState<OrganId | null>(null);
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

  const selection = useMemo(
    () => (activeOrgan && !plan.includes(activeOrgan) ? [...plan, activeOrgan] : plan),
    [plan, activeOrgan],
  );

  const unionConditions = useMemo(() => {
    const set = new Set<string>();
    selection.forEach((id) => ORGAN_CONFIG[id].conditionIds.forEach((cid) => set.add(cid)));
    return [...set] as ConditionId[];
  }, [selection]);

  const primary = useMemo(
    () => mostRestrictiveCondition(unionConditions),
    [unionConditions],
  );

  const foodCount = useMemo(
    () => foodPoolFor(unionConditions).filter((f) => f.score !== 'avoid').length,
    [unionConditions],
  );
  const exerciseCount = useMemo(
    () => exercisePoolFor(unionConditions).filter((e) => e.score !== 'avoid').length,
    [unionConditions],
  );

  const handleContinue = () =>
    navigate(primary ? `/advanced-care/wizard?condition=${primary}` : '/advanced-care/wizard');

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-32" dir={dir}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_120%_at_50%_0%,rgba(212,175,55,0.10),rgba(255,255,255,0)_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-14 lg:py-20 text-center">
          <span className="hero-eyebrow" aria-hidden="true" />
          <h1 className="hero-title">
            <span className="hero-title-line1">{t('universe.title')}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl">{t('universe.subtitle')}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-14 items-start">
          <div>
            <div className="rounded-[32px] border border-[#EFEBE4] bg-white p-6 sm:p-10 shadow-[0_18px_50px_rgba(15,76,58,0.08)]">
              <BodyMap activeOrgan={activeOrgan} onSelect={setActiveOrgan} />
            </div>
            {!activeOrgan && (
              <p className="mt-6 text-center text-sm font-bold text-[#6B7A75] bg-[#F4F1EB] rounded-2xl px-5 py-3">
                {t('universe.hint')}
              </p>
            )}
          </div>

          <div>
            {activeOrgan ? (
              <HealthCard
                key={activeOrgan}
                organ={activeOrgan}
                inPlan={plan.includes(activeOrgan)}
                onTogglePlan={() => togglePlan(activeOrgan)}
                onClose={() => setActiveOrgan(null)}
              />
            ) : (
              <div className="rounded-[32px] border border-dashed border-[#E3DCC9] bg-[#FDFBF7] p-10 text-center max-w-xl mx-auto">
                <span className="mx-auto w-16 h-16 rounded-full bg-[#F4F1EB] flex items-center justify-center text-3xl">
                  🫀
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-[#0F4C3A]">
                  {t('universe.title')}
                </h3>
                <p className="mt-2 text-sm text-[#6B7A75] leading-relaxed">
                  {t('universe.hint')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {activeOrgan && (
        <section className="max-w-7xl mx-auto px-6 mt-14">
          <div className="rounded-[32px] border border-[#EFEBE4] bg-white p-6 sm:p-10 shadow-[0_18px_50px_rgba(15,76,58,0.08)]">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 shrink-0 rounded-full bg-[#F4F1EB] text-[#0F4C3A] flex items-center justify-center">
                <LayoutDashboard size={22} strokeWidth={2.2} />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-[#0F4C3A] leading-tight">
                  {t('universe.dash.title')}
                </h2>
                <p className="mt-0.5 text-sm text-[#6B7A75]">{t('universe.dash.subtitle')}</p>
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-[#FDFBF7] border border-[#EFEBE4] p-5">
              <span className="text-sm font-extrabold text-[#0F4C3A]">
                {t('universe.dash.myPlan')}
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {selection.map((id) => (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#EFEBE4] px-3 py-1.5 text-xs font-bold text-[#0F4C3A]"
                  >
                    <span>{ORGAN_CONFIG[id].emoji}</span>
                    {t(organNameKey(id))}
                    <button
                      type="button"
                      onClick={() => {
                        togglePlan(id);
                        if (activeOrgan === id) setActiveOrgan(null);
                      }}
                      aria-label={t('universe.tools.back')}
                      className="text-[#6B7A75] hover:text-[#B91C1C] transition-colors"
                    >
                      <X size={13} strokeWidth={2.5} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: t('universe.dash.organs'), value: selection.length },
                { label: t('universe.dash.conditions'), value: unionConditions.length },
                { label: t('universe.dash.foods'), value: foodCount },
                { label: t('universe.dash.exercises'), value: exerciseCount },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-[#FDFBF7] border border-[#EFEBE4] p-5 text-center"
                >
                  <div className="text-3xl font-extrabold text-[#0F4C3A] tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-bold text-[#6B7A75]">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4 justify-between rounded-2xl bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-6 text-white">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 shrink-0 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center">
                  <Sparkles size={18} strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold">{t('universe.dash.subtitle')}</h3>
                  <p className="mt-0.5 text-xs text-white/80">{t('universe.dash.myPlan')}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-6 py-3.5 text-sm font-extrabold text-[#0F4C3A] hover:bg-[#c9a12f] shadow-[0_10px_26px_rgba(212,175,55,0.35)] transition-all"
              >
                {t('universe.cta.continue')}
                <ArrowRight size={18} strokeWidth={2.5} className="rtl:rotate-180" />
              </button>
            </div>
          </div>
        </section>
      )}

      {activeOrgan && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#EFEBE4] bg-[#FDFBF7]/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="hidden sm:flex sm:items-center gap-2 text-xs font-bold text-[#6B7A75]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              {t('universe.dash.title')}
            </div>
            <button
              type="button"
              onClick={handleContinue}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-3.5 text-sm font-extrabold text-[#0F4C3A] hover:bg-[#c9a12f] shadow-[0_10px_26px_rgba(212,175,55,0.35)] transition-all"
            >
              {t('universe.cta.continue')}
              <ArrowRight size={18} strokeWidth={2.5} className="rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthUniversePage;