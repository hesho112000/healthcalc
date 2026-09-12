import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Dumbbell, Play, Sparkles, Utensils } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';
import { ORGAN_CONFIG, organConditionKey, organNameKey, organScore, organStatus } from './BodyMap';
import type { OrganId } from './BodyMap';
import { exercisePoolFor, foodPoolFor } from '../../data/conditions';
import type { ConditionId } from '../../data/conditions';
import type { FoodItem } from '../../utils/calculations';
import type { Exercise } from '../../data/exercises/types';

type TKey = keyof typeof translations.en;

const MEAL_SLOTS: Array<NonNullable<FoodItem['mealType']>> = ['breakfast', 'lunch', 'dinner', 'snack'];

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const statusChip = (status: 'healthy' | 'warning' | 'critical') =>
  status === 'healthy'
    ? 'bg-[#0F4C3A]/10 text-[#0F4C3A]'
    : status === 'warning'
      ? 'bg-[#D4AF37]/15 text-[#6a4f0e]'
      : 'bg-[#B91C1C]/10 text-[#B91C1C]';

const barColor = (score: number) =>
  score > 75 ? 'bg-[#0F4C3A]' : score >= 50 ? 'bg-[#D4AF37]' : 'bg-[#B91C1C]';

interface HealthDashboardProps {
  organs: OrganId[];
  onViewOrgan: (id: OrganId) => void;
  onContinue: () => void;
}

const HealthDashboard: React.FC<HealthDashboardProps> = ({ organs, onViewOrgan, onContinue }) => {
  const { t, dir, language } = useLanguage();
  const [checkedMeals, setCheckedMeals] = useState<Set<number>>(new Set());
  const [startedExercises, setStartedExercises] = useState<Set<number>>(new Set());

  const conditions = useMemo(() => {
    const set = new Set<string>();
    organs.forEach((id) =>
      ORGAN_CONFIG[id].conditionIds.forEach((cid) => set.add(cid)),
    );
    return [...set] as ConditionId[];
  }, [organs]);

  const safeFoods = useMemo(
    () => foodPoolFor(conditions).filter((item) => item.score !== 'avoid'),
    [conditions],
  );
  const safeExercises = useMemo(
    () => exercisePoolFor(conditions).filter((item) => item.score !== 'avoid'),
    [conditions],
  );

  const meals = useMemo(() => {
    const taken = new Set<string>();
    const out: FoodItem[] = [];
    for (const slot of MEAL_SLOTS) {
      const pick =
        safeFoods.find((item) => (item.food.mealType ?? undefined) === slot && !taken.has(item.food.name_en)) ??
        safeFoods.find((item) => !taken.has(item.food.name_en));
      if (!pick) break;
      taken.add(pick.food.name_en);
      out.push(pick.food);
    }
    return out;
  }, [safeFoods]);

  const exercises = useMemo(
    () => safeExercises.map((item) => item.exercise).slice(0, 4),
    [safeExercises],
  );

  const overall = useMemo(
    () =>
      organs.length > 0
        ? Math.round(organs.reduce((sum, id) => sum + organScore(id), 0) / organs.length)
        : 0,
    [organs],
  );

  const overallStatus: TKey =
    overall >= 75
      ? 'dashboard.status.healthy'
      : overall >= 50
        ? 'dashboard.status.warning'
        : 'dashboard.status.critical';

  const overallChip =
    overall >= 75
      ? 'bg-[#0F4C3A]/15 text-white'
      : overall >= 50
        ? 'bg-[#D4AF37] text-[#0F4C3A]'
        : 'bg-[#B91C1C] text-white';

  const exNameKey = (({ en: 'nameEn', fr: 'nameFr', es: 'nameEs', ar: 'nameAr', de: 'nameEn' }) as const)[
    language
  ];
  const foodName = (food: FoodItem): string =>
    language === 'ar' ? food.name_ar || food.name_en : food.name_en || food.name;
  const exerciseName = (exercise: Exercise): string => exercise[exNameKey] || exercise.nameEn;

  const toggleMeal = (index: number) =>
    setCheckedMeals((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const toggleExercise = (index: number) =>
    setStartedExercises((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const ringOffset = RING_CIRCUMFERENCE * (1 - overall / 100);

  return (
    <div className="mt-7" dir={dir}>
      {organs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E3DCC9] bg-[#FDFBF7] p-8 text-center">
          <span className="mx-auto w-12 h-12 rounded-full bg-[#F4F1EB] flex items-center justify-center text-2xl">
            🧭
          </span>
          <p className="mt-3 text-sm font-bold text-[#4A5A55]">{t('universe.hd.empty')}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {organs.map((id) => {
              const score = organScore(id);
              const status = organStatus(score);
              return (
                <div
                  key={id}
                  className="rounded-[24px] border border-[#EFEBE4] bg-white p-5 shadow-[0_10px_30px_rgba(15,76,58,0.05)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-11 h-11 shrink-0 rounded-full bg-[#F4F1EB] flex items-center justify-center text-2xl">
                      {ORGAN_CONFIG[id].emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-extrabold text-[#0F4C3A]">
                        {t(organNameKey(id))}
                      </h3>
                      <p className="truncate text-xs font-semibold text-[#6B7A75]">
                        {t(organConditionKey(id))}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-3xl font-extrabold text-[#0F4C3A] tabular-nums leading-none">
                      {score}
                    </span>
                    <span className="text-xs font-bold text-[#6B7A75] mb-0.5">/100</span>
                    <span className="ms-auto text-[10px] font-extrabold uppercase tracking-wide text-[#6B7A75]">
                      {t('dashboard.organScore')}
                    </span>
                  </div>

                  <div className="mt-3 h-2.5 rounded-full bg-[#F4F1EB] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor(score)} transition-all duration-700`}
                      style={{ width: `${score}%` }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-extrabold ${statusChip(status)}`}
                    >
                      {status === 'healthy'
                        ? t('universe.score.healthy')
                        : status === 'warning'
                          ? t('universe.score.warning')
                          : t('universe.score.critical')}
                    </span>
                    <button
                      type="button"
                      onClick={() => onViewOrgan(id)}
                      className="inline-flex items-center gap-1 rounded-full bg-[#0F4C3A]/5 px-3 py-1.5 text-xs font-extrabold text-[#0F4C3A] hover:bg-[#0F4C3A]/10 transition-colors"
                    >
                      {t('universe.hd.view')}
                      <ArrowRight size={13} strokeWidth={2.5} className="rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col items-center gap-6 rounded-[28px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-6 sm:p-8 text-white sm:flex-row sm:justify-between">
            <div className="flex flex-col items-center text-center sm:items-start sm:text-start">
              <span className="w-10 h-10 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center">
                <Sparkles size={18} strokeWidth={2.2} />
              </span>
              <h3 className="mt-3 text-lg font-extrabold">{t('dashboard.overallScore')}</h3>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-white/75">
                {t('universe.hd.overallSub')}
              </p>
            </div>

            <div className="relative shrink-0">
              <svg width="132" height="132" viewBox="0 0 132 132" className="block">
                <circle
                  cx="66"
                  cy="66"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="10"
                />
                <circle
                  cx="66"
                  cy="66"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={ringOffset}
                  transform="rotate(-90 66 66)"
                  style={{ transition: 'stroke-dashoffset .8s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold tabular-nums leading-none">{overall}</span>
                <span className="mt-1 text-[11px] font-bold text-white/70">/100</span>
              </div>
            </div>

            <span className={`rounded-full px-4 py-2 text-xs font-extrabold ${overallChip}`}>
              {t(overallStatus)}
            </span>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-extrabold text-[#0F4C3A]">{t('dashboard.todayPlan.title')}</h3>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-[24px] border border-[#EFEBE4] bg-white p-5">
                <div className="flex items-center gap-2">
                  <Utensils size={16} strokeWidth={2.2} className="text-[#0F4C3A]" />
                  <span className="text-sm font-extrabold text-[#0F4C3A]">{t('dashboard.todayPlan.meals')}</span>
                </div>
                <ul className="mt-2 divide-y divide-[#EFEBE4]">
                  {meals.length === 0 && (
                    <li className="py-4 text-sm font-semibold text-[#6B7A75]">
                      {t('universe.hd.empty')}
                    </li>
                  )}
                  {meals.map((meal, index) => {
                    const done = checkedMeals.has(index);
                    return (
                      <li key={`${meal.name_en}-${index}`}>
                        <button
                          type="button"
                          onClick={() => toggleMeal(index)}
                          className="flex w-full items-center gap-3 py-3 text-start"
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                              done ? 'border-[#0F4C3A] bg-[#0F4C3A] text-white' : 'border-[#E3DCC9] bg-white'
                            }`}
                          >
                            {done && <Check size={13} strokeWidth={3} />}
                          </span>
                          <span
                            className={`flex-1 text-sm font-bold transition-colors ${
                              done ? 'text-[#6B7A75] line-through' : 'text-[#0F4C3A]'
                            }`}
                          >
                            {foodName(meal)}
                          </span>
                          <span className="shrink-0 text-xs font-bold text-[#6B7A75] tabular-nums">
                            {meal.calories} kcal
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-[24px] border border-[#EFEBE4] bg-white p-5">
                <div className="flex items-center gap-2">
                  <Dumbbell size={16} strokeWidth={2.2} className="text-[#0F4C3A]" />
                  <span className="text-sm font-extrabold text-[#0F4C3A]">
                    {t('dashboard.todayPlan.exercises')}
                  </span>
                </div>
                <ul className="mt-2 divide-y divide-[#EFEBE4]">
                  {exercises.length === 0 && (
                    <li className="py-4 text-sm font-semibold text-[#6B7A75]">
                      {t('universe.hd.empty')}
                    </li>
                  )}
                  {exercises.map((exercise, index) => {
                    const started = startedExercises.has(index);
                    return (
                      <li key={`${exercise.id}-${index}`}>
                        <div className="flex items-center gap-3 py-3">
                          <span
                            className={`h-2 w-2 shrink-0 rounded-full ${
                              started ? 'bg-[#0F4C3A]' : 'bg-[#D4AF37]'
                            }`}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-[#0F4C3A]">
                              {exerciseName(exercise)}
                            </p>
                            <p className="text-[11px] font-semibold text-[#6B7A75]">
                              {exercise.duration} · {exercise.calories} kcal
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleExercise(index)}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-colors ${
                              started
                                ? 'bg-[#0F4C3A] text-white'
                                : 'bg-[#D4AF37]/15 text-[#6a4f0e] hover:bg-[#D4AF37]/25'
                            }`}
                          >
                            {started ? (
                              <Check size={13} strokeWidth={3} />
                            ) : (
                              <Play size={12} strokeWidth={2.5} />
                            )}
                            {t(started ? 'universe.hd.started' : 'universe.hd.start')}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 text-base font-extrabold text-[#0F4C3A] hover:bg-[#c9a12f] shadow-[0_10px_26px_rgba(212,175,55,0.35)] transition-all"
            >
              {t('dashboard.cta.continue')}
              <ArrowRight size={20} strokeWidth={2.5} className="rtl:rotate-180" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HealthDashboard;