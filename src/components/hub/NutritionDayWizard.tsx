import React, { useEffect, useMemo, useState } from 'react';
import { Check, Lock, UtensilsCrossed } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { dayMeals, foodDisplayName, foodPoolForConditions, SLOTS, tt } from './data';

interface NutritionDayWizardProps {
  conditions: string[];
  paid: boolean;
  day: number;
  onDayChange: (day: number) => void;
  onUnlock: () => void;
}

const NutritionDayWizard: React.FC<NutritionDayWizardProps> = ({ conditions, paid, day, onDayChange, onUnlock }) => {
  const { t, language: lang } = useLanguage();

  const [mealDone, setMealDone] = useState<Record<number, string[]>>(() => {
    try {
      const raw = localStorage.getItem('hc_hub_meal_done');
      return raw ? (JSON.parse(raw) as Record<number, string[]>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('hc_hub_meal_done', JSON.stringify(mealDone));
  }, [mealDone]);

  const pool = useMemo(() => foodPoolForConditions(conditions), [conditions]);
  const currentMeals = useMemo(() => dayMeals(pool, day), [pool, day]);
  const checked = mealDone[day] ?? [];
  const dayCalories = currentMeals.reduce((sum, row) => sum + row.foods.reduce((a, f) => a + (f.calories || 0), 0), 0);

  const handleDay = (d: number) => {
    if (!paid && d > 1) {
      onUnlock();
      return;
    }
    onDayChange(d);
  };

  const toggle = (foodNameEn: string) => {
    setMealDone((prev) => {
      const list = new Set(prev[day] ?? []);
      if (list.has(foodNameEn)) list.delete(foodNameEn);
      else list.add(foodNameEn);
      return { ...prev, [day]: [...list] };
    });
  };

  const logAll = () => {
    const all = currentMeals.flatMap((row) => row.foods.map((f) => f.name_en));
    setMealDone((prev) => ({ ...prev, [day]: [...new Set(all)] }));
  };

  return (
    <section className="rounded-3xl bg-white border border-[#EFEBE4] p-6 md:p-8">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="flex items-center gap-2 font-extrabold text-lg text-[#0F4C3A]">
          <UtensilsCrossed size={19} />
          {t('hub.nutritionPlan')}
        </h2>
        {!paid && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#D4AF37]/15 text-[#0F4C3A] px-2.5 py-1 text-[10px] font-extrabold">
            <Lock size={11} />
            {t('hub.badge.premium')}
          </span>
        )}
      </div>
      <div className="flex gap-1.5 mb-4 overflow-x-auto">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((d) => {
          const active = d === day;
          const locked = !paid && d > 1;
          return (
            <button
              key={d}
              type="button"
              onClick={() => handleDay(d)}
              className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${active ? (paid ? 'bg-[#0F4C3A] text-[#FDFBF7]' : 'bg-[#D4AF37] text-[#0F4C3A]') : locked ? 'bg-[#F4F1EB]/50 text-[#6B7A75]' : 'bg-[#F4F1EB]/50 text-[#0F4C3A] hover:bg-[#F4F1EB]'}`}
            >
              {locked ? <Lock size={12} className="mx-auto" /> : tt(t, 'hub.day', { n: String(d) })}
            </button>
          );
        })}
      </div>
      <div className="space-y-3">
        {currentMeals.map(({ slot, foods }) => (
          <div key={slot}>
            <h3 className="text-xs font-bold text-[#6B7A75] uppercase tracking-wide mb-1.5">
              {t(SLOTS.find((s) => s.key === slot)!.i18n)}
            </h3>
            <div className="space-y-2">
              {foods.map((food) => {
                const active = checked.includes(food.name_en);
                return (
                  <button
                    key={food.name_en}
                    type="button"
                    onClick={() => toggle(food.name_en)}
                    className={`w-full flex items-center justify-between gap-3 rounded-xl border p-3 transition ${active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] bg-[#F4F1EB]/30'}`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span className={`h-5 w-5 rounded-md border flex items-center justify-center text-xs font-bold shrink-0 ${active ? 'bg-[#0F4C3A] border-[#0F4C3A] text-[#FDFBF7]' : 'border-[#D4AF37] text-transparent'}`}>
                        ✓
                      </span>
                      <span className="text-base">🍽️</span>
                      <b className={`truncate text-sm ${active ? 'text-[#6B7A75] line-through' : 'text-slate-900'}`}>{foodDisplayName(food, lang)}</b>
                    </span>
                    <span className="shrink-0 text-xs text-[#6B7A75]">{food.calories || 0} kcal</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="rounded-full bg-[#0F4C3A]/5 border border-[#0F4C3A]/10 px-4 py-2 text-xs font-bold text-[#0F4C3A]">
          {tt(t, 'hub.nutrition.dayCalories', { cal: String(dayCalories) })}
        </div>
        <button
          type="button"
          onClick={logAll}
          className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-[#0F4C3A] px-5 py-2.5 text-xs font-bold hover:bg-[#c9a52e] transition"
        >
          <Check size={14} />
          {t('hub.logAll')}
        </button>
      </div>
    </section>
  );
};

export default NutritionDayWizard;