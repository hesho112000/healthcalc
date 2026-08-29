import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { type FoodItem } from '../utils/calculations';
import { getPortionMeasure } from '../utils/cuisineCatalog';
import {
  type BuilderPool,
  type BuilderSelections,
  type BuilderSlot,
  type MealBuilderFilters,
  type MealBuilderGeneratePayload,
  type MealBuilderSection,
  type MealMacros,
  MEAL_ALLOC,
  SLOT_LIMITS,
  SECTION_MACROS,
  autoSelect,
  buildBuilderPool,
  buildCustomPlan,
  ensureFilled,
  estimateGL,
  getBreadSodium,
  isLowSodiumOption,
  scaleMeal,
} from '../utils/mealBuilder';
import { detectCuisineByLocation, getCuisineLocalName, getGeoMeta } from '../utils/geo';

export interface MealBuilderProps {
  cuisine: string;
  sectionType: MealBuilderSection;
  filters?: MealBuilderFilters;
  targetCalories?: number;
  macros?: Partial<MealMacros>;
  onGenerate: (payload: MealBuilderGeneratePayload) => void;
  onCuisineChange?: (cuisine: string) => void;
  className?: string;
}

const TABS: Array<{ id: 'breakfast' | 'lunch' | 'dinner' | 'extras'; en: string; ar: string; emoji: string }> = [
  { id: 'breakfast', en: 'Breakfast', ar: 'الإفطار', emoji: '🍳' },
  { id: 'lunch', en: 'Lunch', ar: 'الغداء', emoji: '☀️' },
  { id: 'dinner', en: 'Dinner', ar: 'العشاء', emoji: '🌙' },
  { id: 'extras', en: 'Extras', ar: 'إضافات', emoji: '🥖' },
];

const EXTRA_GROUPS: Array<{ slot: 'breads' | 'juices' | 'fruits'; en: string; ar: string; emoji: string }> = [
  { slot: 'breads', en: 'Bread', ar: 'خبز', emoji: '🥖' },
  { slot: 'juices', en: 'Drinks', ar: 'مشروبات', emoji: '🧃' },
  { slot: 'fruits', en: 'Fruits', ar: 'فواكه', emoji: '🍎' },
];

const MealBuilder: React.FC<MealBuilderProps> = ({ cuisine, sectionType, filters, targetCalories = 2000, macros, onGenerate, onCuisineChange, className = '' }) => {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const pool = useMemo(() => buildBuilderPool(cuisine, sectionType, filters), [cuisine, sectionType, filters]);

  const [selections, setSelections] = useState<BuilderSelections>(() => autoSelect(pool));
  const [activeTab, setActiveTab] = useState<'breakfast' | 'lunch' | 'dinner' | 'extras'>('breakfast');

  const effectiveMacros: MealMacros = useMemo(
    () => ({ ...SECTION_MACROS[sectionType], ...(macros ?? {}) }),
    [sectionType, macros],
  );

  const slotTarget = (slot: 'breakfast' | 'lunch' | 'dinner') => Math.round(targetCalories * MEAL_ALLOC[slot]);

  const slotFoods = (slot: 'breakfast' | 'lunch' | 'dinner'): FoodItem[] => {
    if (slot === 'breakfast') return [...selections.breakfast, ...selections.fruits.slice(0, 1)];
    if (slot === 'lunch') return [...selections.lunch, ...selections.breads.slice(0, 1)];
    return [...selections.dinner];
  };

  useEffect(() => {
    setSelections((prev) => ensureFilled(prev, pool));
  }, [pool]);

  const adjustCount = (slot: 'breakfast' | 'lunch' | 'dinner', delta: number) => {
    setSelections((prev) => {
      const list = prev[slot];
      const count = list.length + delta;
      if (count < SLOT_LIMITS[slot].min || count > SLOT_LIMITS[slot].max) return prev;
      if (delta > 0) {
        const missing = pool[slot].filter((p) => !list.some((s) => (s.name_en || s.name) === (p.name_en || p.name)));
        if (!missing.length) return prev;
        return { ...prev, [slot]: [...list, missing[0]] };
      }
      return { ...prev, [slot]: list.slice(0, count) };
    });
  };

  const geo = useMemo(() => getGeoMeta(), []);
  const detectedCuisine = useMemo(() => detectCuisineByLocation(), []);

  const toggle = (slot: BuilderSlot, item: FoodItem) => {
    setSelections((prev) => {
      const list = prev[slot];
      const exists = list.some((f) => (f.name_en || f.name) === (item.name_en || item.name));
      if (exists) {
        return { ...prev, [slot]: list.filter((f) => (f.name_en || f.name) !== (item.name_en || item.name)) };
      }
      const max = SLOT_LIMITS[slot].max;
      if (list.length >= max) return prev;
      return { ...prev, [slot]: [...list, item] };
    });
  };

  const isSelected = (slot: BuilderSlot, item: FoodItem) =>
    selections[slot].some((f) => (f.name_en || f.name) === (item.name_en || item.name));

  const getName = (item: FoodItem) => (ar ? item.name_ar : item.name_en);
  const getMeasure = (item: FoodItem) => getPortionMeasure(item.portion, language);

  const handleGenerate = () => {
    onGenerate(buildCustomPlan(targetCalories, language, selections, pool, effectiveMacros));
  };

  const renderCard = (item: FoodItem, slot: BuilderSlot, key: number) => {
    const selected = isSelected(slot, item);
    const atMax = selections[slot].length >= SLOT_LIMITS[slot].max && !selected;
    const gl = sectionType === 'diabetes' || filters?.lowSugar ? estimateGL(item) : 0;
    const showGl = gl > 0 && (item.type === 'juice' || item.type === 'fruit' || (item.carbs ?? 0) > 10);
    const sodium = getBreadSodium(item);
    const showLowSodium = sectionType === 'hypertension' || filters?.lowSodium;

    return (
      <button
        key={key}
        type="button"
        onClick={() => toggle(slot, item)}
        disabled={atMax}
        className={`group relative text-left rounded-xl border-2 p-3 transition-all cursor-pointer ${
          selected
            ? 'border-emerald-500 bg-emerald-50 shadow-sm'
            : atMax
              ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
              : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
        }`}
      >
        {selected && (
          <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">✓</span>
        )}
        <div className="text-sm font-bold text-gray-800 leading-tight pr-6">{getName(item)}</div>
        {getMeasure(item) && <div className="text-[11px] text-gray-400 mt-0.5">{getMeasure(item)}</div>}
        <div className="flex flex-wrap gap-1 mt-1.5">
          <span className="px-1.5 py-0.5 rounded-md bg-gray-100 text-[10px] font-semibold text-gray-600">{item.calories} kcal</span>
          {item.verified && (
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-[10px] font-bold text-white" title={item.nutritionSource || 'USDA verified'}>USDA ✓</span>
          )}
          <span className="px-1.5 py-0.5 rounded-md bg-orange-50 text-[10px] font-semibold text-orange-600">P {item.protein}g</span>
          <span className="px-1.5 py-0.5 rounded-md bg-yellow-50 text-[10px] font-semibold text-yellow-700">C {item.carbs}g</span>
          {item.heavy && (
            <span className="px-1.5 py-0.5 rounded-md bg-red-100 text-[10px] font-bold text-red-700" title="Heavy dish">⚠️ {ar ? 'ثقيلة' : 'Heavy'}</span>
          )}
          {showGl && <span className="px-1.5 py-0.5 rounded-md bg-rose-50 text-[10px] font-semibold text-rose-600">GL≈{gl}</span>}
          {showLowSodium && sodium !== undefined && (
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold ${sodium <= 180 ? 'bg-teal-50 text-teal-700' : 'bg-gray-100 text-gray-500'}`}>
              Na {sodium}mg
            </span>
          )}
          {showLowSodium && sodium === undefined && isLowSodiumOption(item) && (
            <span className="px-1.5 py-0.5 rounded-md bg-teal-50 text-[10px] font-semibold text-teal-700">Low-Na ✓</span>
          )}
        </div>
      </button>
    );
  };

  const renderSlot = (slot: 'breakfast' | 'lunch' | 'dinner') => {
    const items = pool[slot];
    const { min, max } = SLOT_LIMITS[slot];
    const count = selections[slot].length;
    const preview = scaleMeal(slotTarget(slot), slotFoods(slot), effectiveMacros, language);
    return (
      <div>
        <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => adjustCount(slot, -1)}
              disabled={count <= min}
              className="w-6 h-6 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-bold leading-none disabled:opacity-40 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              −
            </button>
            <span className={`min-w-6 text-center px-1.5 py-0.5 rounded-full text-[11px] font-bold ${count >= 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {count}
            </span>
            <button
              type="button"
              onClick={() => adjustCount(slot, 1)}
              disabled={count >= max}
              className="w-6 h-6 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-bold leading-none disabled:opacity-40 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              +
            </button>
            <span className="ml-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
              {ar ? `${min}-${max} أطباق` : `${min}–${max} dishes`}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-bold">
            {ar ? `الهدف ${slotTarget(slot)} سعرة` : `Target ${slotTarget(slot)} kcal`}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {items.map((item, idx) => renderCard(item, slot, idx))}
        </div>
        <div className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-extrabold text-indigo-800">{ar ? 'حِصص متكيفة تلقائيًا' : 'Smart adaptive portions'}</span>
            <span className="text-[11px] font-bold text-indigo-700">
              {preview.calories} <span className="font-medium">{ar ? 'سعرة' : 'kcal'}</span> · P{preview.protein} · C{preview.carbs} · F{preview.fat}
            </span>
          </div>
          <ul className="space-y-0.5 text-[11px] text-gray-600 font-medium">
            {preview.items.map((line, i) => (
              <li key={i} className="leading-snug">{line}</li>
            ))}
          </ul>
          <p className="mt-1.5 text-[10px] text-indigo-400">
            {ar
              ? 'تتغير الحصص تلقائيًا لتظل الوجبة دائمًا عند الهدف — أضف أو احذف أطباقًا وتتقلص الحصص أو تكبر.'
              : 'Portions auto-resize so the meal always lands on target — add or remove dishes and portions shrink or grow.'}
          </p>
        </div>
      </div>
    );
  };

  const renderExtras = () => (
    <div className="space-y-5">
      {EXTRA_GROUPS.filter((group) => pool[group.slot].length > 0).map((group) => {
        const items = pool[group.slot];
        const { min, max } = SLOT_LIMITS[group.slot];
        const count = selections[group.slot].length;
        return (
          <div key={group.slot}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg leading-none">{group.emoji}</span>
              <span className="text-sm font-extrabold text-gray-800">{ar ? group.ar : group.en}</span>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-[11px] font-bold ${count >= min ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {count}/{max}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {items.map((item, idx) => renderCard(item, group.slot, idx))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const totalPicked = Object.values(selections).reduce((s, arr) => s + arr.length, 0);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xs font-extrabold flex items-center justify-center">2</span>
        <h3 className="font-bold text-gray-900">{ar ? 'ابني وجباتك' : 'Build Your Meals'}</h3>
        <span className="ml-auto text-[11px] font-bold text-gray-400">{ar ? `${totalPicked} اختيار` : `${totalPicked} picked`}</span>
      </div>

      {geo && onCuisineChange && detectedCuisine !== cuisine && (
        <div className="flex items-center gap-2 justify-between bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 text-xs">
          <span className="text-blue-700 font-medium">
            📍 {ar ? `اكتشفنا أنك في ${geo.countryAr} — خطة ${getCuisineLocalName(detectedCuisine, language)}` : `Detected you're in ${geo.countryEn} — ${getCuisineLocalName(detectedCuisine, 'en')} plan`}
          </span>
          <button type="button" onClick={() => onCuisineChange(detectedCuisine)} className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold hover:bg-blue-700 transition-colors cursor-pointer">
            {ar ? 'استخدم' : 'Use'}
          </button>
        </div>
      )}
      {geo && onCuisineChange && detectedCuisine === cuisine && (
        <div className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-500">
          📍 {ar ? `اكتشفنا منطقتك: ${geo.countryAr} — مطبخ ${getCuisineLocalName(cuisine, language)}` : `Detected region: ${geo.countryEn} — ${getCuisineLocalName(cuisine, 'en')} cuisine`}
        </div>
      )}

      <div className="text-[11px] text-gray-400 -mt-1">
        {ar ? 'تم ملؤها تلقائيًا باختيارات المطبخ المفضلة — عدّل بحرية' : `Auto-filled with ${getCuisineLocalName(cuisine, ar ? 'ar' : 'en')} favorites — adjust freely`}
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300'
            }`}
          >
            {tab.emoji} {ar ? tab.ar : tab.en}
          </button>
        ))}
      </div>

      {activeTab === 'breakfast' && renderSlot('breakfast')}
      {activeTab === 'lunch' && renderSlot('lunch')}
      {activeTab === 'dinner' && renderSlot('dinner')}
      {activeTab === 'extras' && renderExtras()}

      <div className="flex items-center gap-2 pt-1">
        <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs font-extrabold flex items-center justify-center">3</span>
        <button
          type="button"
          onClick={handleGenerate}
          className="flex-1 btn-primary py-3.5 text-sm font-extrabold flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          ✨ {ar ? 'أنشئ خطتي لـ 30 يومًا' : 'Generate My 30-Day Plan'}
        </button>
      </div>
    </div>
  );
};

export default MealBuilder;