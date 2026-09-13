import React, { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Plus, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import BodyMap, {
  ORGAN_CONFIG,
  ORGAN_IDS,
  organConditionKey,
  organDescKey,
  organNameKey,
} from '../components/health-universe/BodyMap';
import type { OrganId } from '../components/health-universe/BodyMap';
import {
  getOrganDetail,
  HEALTH_ORGAN_CONDITIONS,
  organScore,
  organStatus,
  readStoredLabs,
  readUserProfile,
} from '../utils/healthScoring';
import {
  dayExercises,
  dayMeals,
  exerciseName,
  foodDisplayName,
  foodPoolForConditions,
  exercisePoolForConditions,
  hasPlanData,
  tk,
} from '../components/hub/data';
import type { TKey } from '../components/hub/data';
import ScoreRing from '../components/hub/ScoreRing';

const SLOT_KEY: Record<string, TKey> = {
  breakfast: tk('wizard.step6.mealBreakfast'),
  lunch: tk('wizard.step6.mealLunch'),
  dinner: tk('wizard.step6.mealDinner'),
  snack: tk('wizard.step6.mealSnack'),
};

const STORAGE_KEY = 'hc_health_universe';

const MENTAL_LABS: Array<{ key: string; unit: string }> = [
  { key: 'vitaminD', unit: 'ng/mL' },
  { key: 'b12', unit: 'pg/mL' },
  { key: 'tsh', unit: 'mIU/L' },
  { key: 'iron', unit: 'µg/L' },
];

const OrganHubPage: React.FC = () => {
  const { t, dir, language: lang } = useLanguage();
  const navigate = useNavigate();
  const { organId } = useParams<{ organId: string }>();
  const [toast, setToast] = useState('');

  const normId = organId ?? '';
  const isMental = normId === 'mental-wellness';
  const id: OrganId | null = isMental
    ? 'brain'
    : ORGAN_IDS.includes(normId as OrganId)
      ? (normId as OrganId)
      : null;

  const conditions = useMemo(
    () => (id ? [...HEALTH_ORGAN_CONDITIONS[id]] : []),
    [id],
  );
  const exPool = useMemo(() => exercisePoolForConditions(conditions), [conditions]);
  const foodPool = useMemo(() => foodPoolForConditions(conditions), [conditions]);

  const storedLabs = useMemo(() => readStoredLabs(), []);
  const profile = useMemo(() => readUserProfile(), []);

  const dataReady =
    Object.keys(profile).length > 0 ||
    conditions.some((cid) => {
      const stored = storedLabs[cid];
      return Boolean(stored && Object.keys(stored).length > 0);
    }) ||
    hasPlanData();

  const [plan, setPlan] = useState<OrganId[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw
        ? (JSON.parse(raw) as OrganId[]).filter((entry) => (ORGAN_IDS as readonly string[]).includes(entry))
        : [];
    } catch {
      return [];
    }
  });

  const note = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  if (!id) return <Navigate to="/advanced-care" replace />;

  const score = organScore(id);
  const detail = getOrganDetail(id);
  const status = score === null ? null : organStatus(score);
  const statusKey =
    status === 'critical' ? 'organHub.status.critical' : status === 'warning' ? 'organHub.status.warning' : 'organHub.status.healthy';
  const inPlan = plan.includes(id);
  const emoji = ORGAN_CONFIG[id].emoji;

  const dayFitness = dayExercises(exPool, 1);
  const dayMealsList = dayMeals(foodPool, 1);

  const addToPlan = () => {
    if (inPlan) return;
    const next = [...plan, id];
    setPlan(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    note(t(tk('universe.toast.added')).replace('{condition}', t(organConditionKey(id))));
  };

  const goWizard = () => {
    const qs = conditions.length > 0 ? `?conditions=${conditions.join(',')}` : '';
    navigate(`/advanced-care/wizard${qs}`);
  };

  const headerTitle = isMental ? t(tk('condition.mentalWellness.name')) : t(organNameKey(id));
  const headerKicker = isMental ? t(tk('organHub.mentalWellness.title')) : t(organConditionKey(id));
  const headerDesc = isMental ? t(tk('condition.mentalWellness.desc')) : t(organDescKey(id));
  const exerciseHeader = isMental ? t(tk('organHub.mentalWellness.exercises')) : t(tk('hub.exercisePlan'));
  const nutritionHeader = isMental ? t(tk('organHub.mentalWellness.nutrition')) : t(tk('hub.nutritionPlan'));

  const stressText = (value: string): string => {
    const v = String(value).toLowerCase();
    return v === 'low' || v === 'medium' || v === 'high'
      ? t(tk(`universe.level.${v}`))
      : String(value);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-16" dir={dir}>
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <button
          type="button"
          onClick={() => navigate('/advanced-care')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#D4AF37] transition-colors mb-5"
        >
          <ArrowRight size={14} strokeWidth={2.5} className="rtl:rotate-180" />
          {t(tk('hub.backToUniverse'))}
        </button>

        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-8 md:p-12 text-[#FDFBF7]">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <BodyMap />
          </div>
          <div className="relative">
            <span className="w-16 h-16 rounded-3xl bg-[#FDFBF7]/10 flex items-center justify-center text-4xl">
              {emoji}
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl font-extrabold leading-tight">
              {headerTitle}
            </h1>
            <p className="mt-2 text-sm font-bold text-[#D4AF37] uppercase tracking-[2px]">
              {headerKicker}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#FDFBF7]/85">
              {headerDesc}
            </p>
            {isMental && (
              <p className="mt-3 text-xs font-bold text-[#D4AF37]/90">
                {t(tk('organHub.mentalWellness.subtitle'))}
              </p>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={addToPlan}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition ${
                  inPlan
                    ? 'bg-[#0F4C3A] text-[#FDFBF7] ring-2 ring-[#FDFBF7]/30'
                    : 'bg-white text-[#0F4C3A] hover:bg-[#F4F1EB]'
                }`}
              >
                {inPlan ? <Check size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
                {inPlan ? t(tk('universe.cta.added')) : t(tk('organHub.addToPlan'))}
              </button>
              <button
                type="button"
                onClick={goWizard}
                className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-[#0F4C3A] px-6 py-3 text-sm font-extrabold shadow-[0_10px_26px_rgba(212,175,55,0.4)] transition hover:bg-[#c9a52e]"
              >
                {t(tk('organHub.continueWizard'))}
                <ArrowRight size={16} strokeWidth={2.5} className="rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        {!dataReady ? (
          <section className="rounded-3xl border border-[#D4AF37]/50 bg-white p-8 md:p-12 text-center">
            <span className="text-5xl">📋</span>
            <h2 className="mt-4 text-2xl font-extrabold text-[#0F4C3A]">
              {t(tk('organHub.emptyTitle'))}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#4A5A55]">
              {t(tk('organHub.emptyDesc'))}
            </p>
            <button
              type="button"
              onClick={goWizard}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-[#0F4C3A] px-7 py-3 text-sm font-extrabold shadow-[0_10px_26px_rgba(212,175,55,0.4)] transition hover:bg-[#c9a52e]"
            >
              {t(tk('organHub.emptyCta'))}
              <ArrowRight size={16} strokeWidth={2.5} className="rtl:rotate-180" />
            </button>
          </section>
        ) : (
          <>
            <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
              <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
                {t(tk('hub.healthScore'))}
              </span>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                {score !== null ? (
                  <>
                    <ScoreRing score={score} size={128} stroke={11} />
                    <div className="space-y-2">
                      {status && (
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold ${
                            status === 'healthy'
                              ? 'border-[#0F4C3A]/30 bg-[#0F4C3A]/5 text-[#0F4C3A]'
                              : status === 'warning'
                                ? 'border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#6b4f0c]'
                                : 'border-[#B91C1C]/30 bg-[#B91C1C]/5 text-[#B91C1C]'
                          }`}
                        >
                          {t(tk(statusKey))}
                        </span>
                      )}
                      {(detail?.factors?.length ?? 0) > 0 && (
                        <ul className="space-y-1">
                          {detail!.factors.map((f) => (
                            <li key={String(f.labelKey)} className="text-sm text-[#4A5A55]">
                              <span className="inline-block min-w-28">
                                {String(f.labelKey).startsWith('advanced.lab.') || String(f.labelKey).startsWith('universe.')
                                  ? t(String(f.labelKey) as TKey)
                                  : String(f.labelKey)}
                              </span>
                              <span className="font-extrabold text-[#0F4C3A]">
                                {String(f.labelKey) === 'universe.factor.stress' && ['low', 'medium', 'high'].includes(String(f.value))
                                  ? stressText(String(f.value))
                                  : f.value}
                              </span>
                              {f.unit && <span className="text-[#6B7A75]"> {f.unit}</span>}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-[#6B7A75]">
                    — {t(tk('organHub.generalData'))}
                  </p>
                )}
              </div>
              <p className="mt-4 text-xs text-[#6B7A75] bg-[#F4F1EB]/70 rounded-xl px-3 py-2">
                {t(tk('universe.score.disclaimer'))}
              </p>
            </section>

            <div className="grid lg:grid-cols-2 gap-6">
              <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
                <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
                  {exerciseHeader}
                </span>
                <div className="mt-4 space-y-3">
                  {dayFitness.map((ex) => (
                    <div
                      key={ex.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-[#EFEBE4] p-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{String(ex.type || '').startsWith('strength') ? '🏋️' : String(ex.type || '').startsWith('hiit') ? '🔥' : String(ex.type || '').startsWith('mindbody') ? '🧘' : '🏃'}</span>
                        <span>
                          <b className="block text-sm text-[#0F4C3A]">{exerciseName(ex, lang)}</b>
                          <span className="text-xs text-[#6B7A75]">{ex.duration}</span>
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#0F4C3A] whitespace-nowrap">{ex.calories} kcal</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
                <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
                  {nutritionHeader}
                </span>
                <div className="mt-4 space-y-3">
                  {dayMealsList.flatMap((row) =>
                    row.foods.map((food) => (
                      <div
                        key={food.name_en}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-[#EFEBE4] p-3.5"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">🍽️</span>
                          <span>
                            <b className="block text-sm text-[#0F4C3A]">{foodDisplayName(food, lang)}</b>
                            <span className="text-xs text-[#6B7A75]">{t(SLOT_KEY[row.slot])}</span>
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#0F4C3A] whitespace-nowrap">{food.calories} kcal</span>
                      </div>
                    )),
                  )}
                </div>
              </section>
            </div>

            {isMental && (
              <div className="grid lg:grid-cols-2 gap-6">
                <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
                  <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
                    {t(tk('organHub.mentalWellness.labs'))}
                  </span>
                  <div className="mt-4 space-y-3">
                    {MENTAL_LABS.map((lab) => {
                      const value = storedLabs['mental-wellness']?.[lab.key];
                      return (
                        <div
                          key={lab.key}
                          className="flex items-center justify-between gap-3 rounded-2xl border border-[#EFEBE4] p-3.5"
                        >
                          <span className="text-sm font-bold text-[#0F4C3A]">
                            {t(tk(`wizard.lab.${lab.key}`))}
                          </span>
                          <span className="text-xs font-bold text-[#0F4C3A] whitespace-nowrap tabular-nums">
                            {typeof value === 'number' ? `${Math.round(value * 10) / 10} ${lab.unit}` : '—'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/advanced-care/wizard?conditions=mental-wellness&step=3')}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#D4AF37] transition-colors"
                  >
                    {t(tk('organHub.addLabs'))}
                    <ArrowRight size={14} strokeWidth={2.5} className="rtl:rotate-180" />
                  </button>
                </section>

                <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
                  <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
                    {t(tk('hub.progressTracker'))}
                  </span>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#EFEBE4] p-3.5">
                      <span className="text-sm font-bold text-[#0F4C3A]">{t(tk('universe.factor.sleepHours'))}</span>
                      <span className="text-xs font-bold text-[#0F4C3A] whitespace-nowrap tabular-nums">
                        {typeof profile.sleepHours === 'number' ? `${Math.round(profile.sleepHours * 10) / 10} ${t(tk('universe.factor.hours'))}` : '—'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#EFEBE4] p-3.5">
                      <span className="text-sm font-bold text-[#0F4C3A]">{t(tk('universe.factor.stress'))}</span>
                      <span className="text-xs font-bold text-[#0F4C3A] whitespace-nowrap">
                        {profile.stress ? stressText(profile.stress) : '—'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#EFEBE4] p-3.5">
                      <span className="text-sm font-bold text-[#0F4C3A]">{t(tk('universe.factor.mood'))}</span>
                      <span className="text-xs font-bold text-[#0F4C3A] whitespace-nowrap">
                        {profile.mood ? profile.mood : '—'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/advanced-care/wizard?conditions=mental-wellness&step=4')}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:text-[#D4AF37] transition-colors"
                  >
                    {t(tk('organHub.addProgress'))}
                    <ArrowRight size={14} strokeWidth={2.5} className="rtl:rotate-180" />
                  </button>
                </section>
              </div>
            )}
          </>
        )}
      </main>

      {toast && (
        <div className="fixed bottom-8 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
          <div className="rounded-full bg-[#0F4C3A] text-[#FDFBF7] text-sm font-bold px-6 py-3 shadow-lg">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganHubPage;