import React, { useMemo, useState } from 'react';
import { Plus, Trash2, UtensilsCrossed } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SLOTS, type MealSlot } from './data';
import { removeMeal, useHubDaily } from './hubDailyStore';
import AddFoodModal from './AddFoodModal';

const MealLoggingTabs: React.FC = () => {
  const { t } = useLanguage();
  const { day, key } = useHubDaily();
  const [activeSlot, setActiveSlot] = useState<MealSlot>('breakfast');
  const [modalOpen, setModalOpen] = useState(false);

  const bySlot = useMemo(() => {
    const map: Record<MealSlot, typeof day.meals> = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    };
    day.meals.forEach((m) => {
      if (map[m.slot]) map[m.slot].push(m);
    });
    return map;
  }, [day.meals]);

  const slotMeals = bySlot[activeSlot];

  const totals = useMemo(
    () =>
      day.meals.reduce(
        (acc, m) => ({
          calories: acc.calories + m.calories,
          protein: acc.protein + m.protein,
          carbs: acc.carbs + m.carbs,
          fat: acc.fat + m.fat,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 },
      ),
    [day.meals],
  );

  return (
    <section className="rounded-3xl bg-white border border-[#EFEBE4] p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
      <h3 className="flex items-center gap-2 font-extrabold text-sm text-[#0F4C3A] mb-4">
        <UtensilsCrossed size={16} />
        {t('hub.meals.title')}
      </h3>

      <div className="grid grid-cols-4 gap-1.5 rounded-2xl bg-[#F4F1EB]/60 p-1.5">
        {SLOTS.map((slot) => (
          <button
            key={slot.key}
            type="button"
            onClick={() => setActiveSlot(slot.key)}
            className={`relative rounded-xl px-2 py-2 text-[11px] font-bold transition ${
              activeSlot === slot.key ? 'bg-[#0F4C3A] text-[#FDFBF7] shadow-sm' : 'text-[#6B7A75] hover:text-[#0F4C3A]'
            }`}
          >
            {t(slot.i18n)}
            {bySlot[slot.key].length > 0 && (
              <span
                className={`ms-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-extrabold tabular-nums ${
                  activeSlot === slot.key ? 'bg-[#D4AF37] text-[#0F4C3A]' : 'bg-[#D4AF37]/20 text-[#8A6D1C]'
                }`}
              >
                {bySlot[slot.key].length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-[#6B7A75]">
        <span>{t('hub.nutrition.dayCalories').replace('{cal}', String(Math.round(totals.calories)))}</span>
        <span className="tabular-nums">
          P {Math.round(totals.protein)}g · C {Math.round(totals.carbs)}g · F {Math.round(totals.fat)}g
        </span>
      </div>

      <div className="mt-3 space-y-2 min-h-[120px]">
        {slotMeals.length === 0 ? (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full rounded-2xl border-2 border-dashed border-[#D4AF37]/50 bg-[#D4AF37]/5 px-4 py-6 text-xs font-bold text-[#8A6D1C] hover:bg-[#D4AF37]/10 transition"
          >
            {t('hub.meals.empty')} — {t('hub.meals.addFood')}
          </button>
        ) : (
          slotMeals.map((meal) => (
            <div
              key={meal.id}
              className="flex items-center gap-3 rounded-2xl border border-[#EFEBE4] bg-[#FDFBF7] px-3 py-2.5"
            >
              <span className="h-9 w-9 rounded-xl bg-[#F4F1EB] flex items-center justify-center text-lg shrink-0">
                {meal.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-[#0F4C3A]">{meal.name}</span>
                <span className="block text-[11px] text-[#6B7A75] tabular-nums">
                  {meal.calories} kcal · P {meal.protein}g · C {meal.carbs}g · F {meal.fat}g
                </span>
              </span>
              <button
                type="button"
                onClick={() => removeMeal(key, meal.id)}
                aria-label="Remove"
                className="h-8 w-8 rounded-full flex items-center justify-center text-[#6B7A75] hover:bg-[#F4F1EB] hover:text-[#B91C1C] transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F4C3A] px-4 py-3 text-xs font-extrabold text-[#FDFBF7] hover:bg-[#1a6b53] transition"
      >
        <Plus size={15} strokeWidth={3} />
        {t('hub.meals.addFood')}
      </button>

      <AddFoodModal
        open={modalOpen}
        slot={activeSlot}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default MealLoggingTabs;