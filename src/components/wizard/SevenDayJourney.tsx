import React, { useMemo, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

export interface JourneyFoodItem {
  name: string;
  slot: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  kcal: number;
}

export interface JourneyExerciseItem {
  name: string;
  meta: string;
}

interface SevenDayJourneyProps {
  foods: JourneyFoodItem[];
  exercises: JourneyExerciseItem[];
}

interface DayPlan {
  meals: Array<{ slot: JourneyFoodItem['slot']; name: string; kcal: number }>;
  exercises: Array<{ name: string; meta: string }>;
}

const SLOTS: Array<JourneyFoodItem['slot']> = ['breakfast', 'lunch', 'dinner', 'snack'];

const SevenDayJourney: React.FC<SevenDayJourneyProps> = ({ foods, exercises }) => {
  const { t, dir } = useLanguage();
  const tk = (key: string) => key as keyof typeof translations.en;
  const [activeDay, setActiveDay] = useState(1);

  const slotKey = (slot: JourneyFoodItem['slot']): string => {
    if (slot === 'breakfast') return 'wizard.step6.mealBreakfast';
    if (slot === 'lunch') return 'wizard.step6.mealLunch';
    if (slot === 'dinner') return 'wizard.step6.mealDinner';
    return 'wizard.step6.mealSnack';
  };

  const bySlot = useMemo(() => {
    const map: Record<JourneyFoodItem['slot'], JourneyFoodItem[]> = { breakfast: [], lunch: [], dinner: [], snack: [] };
    foods.forEach((food) => {
      map[food.slot].push(food);
    });
    return map;
  }, [foods]);

  const buildDay = (day: number): DayPlan => {
    const offset = day - 1;
    const meals = SLOTS.flatMap((slot) => {
      const pool = bySlot[slot];
      if (pool.length === 0) return [];
      return [{ slot, name: pool[offset % pool.length].name, kcal: pool[offset % pool.length].kcal }];
    });
    const dayExercises = exercises.length
      ? [0, 1, 2]
          .map((step) => exercises[(offset + step * 2) % exercises.length])
          .filter((item, index, all) => all.findIndex((candidate) => candidate.name === item.name) === index)
      : [];
    return { meals, exercises: dayExercises };
  };

  const dayPlan = useMemo(() => buildDay(activeDay), [activeDay, bySlot, exercises]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isEmpty = dayPlan.meals.length === 0 && dayPlan.exercises.length === 0;

  return (
    <section dir={dir}>
      <div className="max-w-2xl mx-auto text-center">
        <span className="eyebrow">{t(tk('wizard.blueprint.journey.eyebrow'))}</span>
        <h2 className="mt-3 text-3xl md:text-[36px] font-extrabold tracking-tight text-[#0F4C3A]">
          {t(tk('wizard.blueprint.journey.title'))}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#6B7A75]">{t(tk('wizard.blueprint.journey.subtitle'))}</p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setActiveDay(day)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition ${
              activeDay === day ? 'bg-[#0F4C3A] text-[#FDFBF7] shadow' : 'bg-[#F4F1EB] text-[#6B7A75] hover:bg-[#EFEBE4]'
            }`}
          >
            {t(tk('wizard.blueprint.journey.tab')).replace('{n}', String(day))}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-[24px] border border-[#EFEBE4] bg-white p-6">
        {isEmpty ? (
          <p className="text-sm text-[#6B7A75]">{t(tk('wizard.blueprint.journey.empty'))}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {dayPlan.meals.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#0F4C3A]">
                  <span className="text-lg">🍽️</span> {t(tk('wizard.blueprint.journey.meals'))}
                </h4>
                <div className="mt-3 space-y-2">
                  {dayPlan.meals.map((meal) => (
                    <div key={meal.slot + meal.name} className="flex items-center justify-between gap-3 rounded-2xl border border-[#EFEBE4] bg-[#FDFBF7] p-3">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-[#D4AF37]/15 px-2.5 py-1 text-[11px] font-bold text-[#0F4C3A]">
                          {t(tk(slotKey(meal.slot)))}
                        </span>
                        <b className="text-sm text-slate-900">{meal.name}</b>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-[#6B7A75]">{meal.kcal} kcal</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {dayPlan.exercises.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#0F4C3A]">
                  <span className="text-lg">🏃</span> {t(tk('wizard.blueprint.journey.exercises'))}
                </h4>
                <div className="mt-3 space-y-2">
                  {dayPlan.exercises.map((exercise) => (
                    <div key={exercise.name} className="flex items-center justify-between gap-3 rounded-2xl border border-[#EFEBE4] bg-[#FDFBF7] p-3">
                      <b className="text-sm text-slate-900">{exercise.name}</b>
                      <span className="shrink-0 text-xs font-bold text-[#6B7A75]">{exercise.meta}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SevenDayJourney;