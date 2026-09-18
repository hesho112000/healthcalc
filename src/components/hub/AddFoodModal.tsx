import React, { useMemo, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { FOODS_DATABASE, type FoodItem } from '../../utils/calculations';
import { getPortionMeasure } from '../../utils/cuisineCatalog';
import { foodDisplayName, type MealSlot } from './data';
import { addMeal } from './hubDailyStore';

interface AddFoodModalProps {
  open: boolean;
  slot: MealSlot;
  onClose: () => void;
  onAdded?: () => void;
}

const CAT_EMOJI: Record<string, string> = {
  fruit: '🍎',
  juice: '🧃',
  bread: '🍞',
  protein: '🍗',
  grain: '🍚',
  vegetable: '🥦',
  dairy: '🧀',
  legume: '🥣',
  nuts: '🥜',
  seafood: '🐟',
  snack: '🍿',
  sweet: '🍰',
  beverage: '🥤',
  salad: '🥗',
};

const foodEmoji = (food: FoodItem): string =>
  CAT_EMOJI[food.category] ?? (food.type === 'fruit' ? '🍎' : food.type === 'juice' ? '🧃' : '🍽️');

const AddFoodModal: React.FC<AddFoodModalProps> = ({ open, slot, onClose, onAdded }) => {
  const { t, language: lang } = useLanguage();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FOODS_DATABASE.slice(0, 24);
    return FOODS_DATABASE.filter(
      (f) =>
        f.name_en.toLowerCase().includes(q) ||
        (lang === 'ar' && f.name_ar ? f.name_ar.includes(query.trim()) : false),
    ).slice(0, 40);
  }, [query, lang]);

  if (!open) return null;

  const pick = (food: FoodItem) => {
    addMeal(new Date().toLocaleDateString('en-CA'), {
      slot,
      name: foodDisplayName(food, lang),
      emoji: foodEmoji(food),
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
    });
    setQuery('');
    onAdded?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-[#0F4C3A]/40 backdrop-blur-sm" />
      <div className="relative w-full sm:max-w-lg max-h-[85vh] sm:rounded-3xl rounded-t-3xl bg-[#FDFBF7] shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3 border-b border-[#EFEBE4]">
          <h3 className="flex items-center gap-2 font-extrabold text-[#0F4C3A]">
            <Plus size={17} />
            {t('hub.meals.addFood')}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-[#F4F1EB]/60 text-[#0F4C3A] hover:bg-[#F4F1EB] transition flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-5 pt-4">
          <div className="flex items-center gap-2 rounded-2xl border border-[#EFEBE4] bg-white px-4 py-2.5 focus-within:border-[#D4AF37]">
            <Search size={16} className="text-[#6B7A75]" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('hub.meals.search')}
              className="w-full bg-transparent text-sm text-slate-900 outline-0 placeholder:text-[#9AA7A2]"
            />
          </div>
        </div>

        <div className="mt-3 px-2 pb-5 overflow-y-auto min-h-[220px]">
          {results.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-[#6B7A75]">{t('hub.meals.noResults')}</p>
          ) : (
            results.map((food) => (
              <button
                key={food.name_en}
                type="button"
                onClick={() => pick(food)}
                className="w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-start hover:bg-white transition"
              >
                <span className="h-11 w-11 rounded-2xl bg-[#F4F1EB] flex items-center justify-center text-xl shrink-0">
                  {foodEmoji(food)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-[#0F4C3A]">
                    {foodDisplayName(food, lang)}
                  </span>
                  <span className="block text-[11px] text-[#6B7A75]">
                    {getPortionMeasure(food.portion, lang)} · {food.calories} kcal · P {food.protein} / C {food.carbs} / F {food.fat}
                  </span>
                </span>
                <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-[#D4AF37] px-2.5 py-1 text-[11px] font-extrabold text-[#0F4C3A]">
                  <Plus size={12} strokeWidth={3} />
                  {t('hub.meals.add')}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFoodModal;