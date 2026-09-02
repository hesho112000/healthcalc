import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { type FoodItem } from '../../utils/calculations';
import { getPortionMeasure } from '../../utils/cuisineCatalog';
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
  getDishSuitability,
  isLowSodiumOption,
  scaleMeal,
} from '../../utils/mealBuilder';
import { detectCuisineByLocation, getCuisineLocalName, getGeoMeta } from '../../utils/geo';

export interface MealBuilderProps {
  cuisine: string;
  sectionType: MealBuilderSection;
  filters?: MealBuilderFilters;
  targetCalories?: number;
  macros?: Partial<MealMacros>;
  onGenerate: (payload: MealBuilderGeneratePayload) => void;
  onCuisineChange?: (cuisine: string) => void;
  condition?: string;
  className?: string;
}

type MealSlotId = 'breakfast' | 'lunch' | 'dinner';

const TABS: Array<{ id: 'breakfast' | 'lunch' | 'dinner' | 'extras'; key: 'mealBreakfast' | 'mealLunch' | 'mealDinner' | 'mbExtras'; emoji: string }> = [
  { id: 'breakfast', key: 'mealBreakfast', emoji: '🍳' },
  { id: 'lunch', key: 'mealLunch', emoji: '☀️' },
  { id: 'dinner', key: 'mealDinner', emoji: '🌙' },
  { id: 'extras', key: 'mbExtras', emoji: '🥖' },
];

const EXTRA_GROUPS: Array<{ slot: 'breads' | 'juices' | 'fruits' | 'sides' | 'salads'; key: 'mbBread' | 'mbDrinks' | 'mbFruits' | 'mbSides' | 'mbSalads'; emoji: string }> = [
  { slot: 'breads', key: 'mbBread', emoji: '🥖' },
  { slot: 'salads', key: 'mbSalads', emoji: '🥗' },
  { slot: 'sides', key: 'mbSides', emoji: '🍲' },
  { slot: 'juices', key: 'mbDrinks', emoji: '🧃' },
  { slot: 'fruits', key: 'mbFruits', emoji: '🍎' },
];

const SLOT_NAME_KEYS: Record<MealSlotId, 'mealBreakfast' | 'mealLunch' | 'mealDinner'> = {
  breakfast: 'mealBreakfast',
  lunch: 'mealLunch',
  dinner: 'mealDinner',
};

const fmt = (template: string, vars: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));

const MealBuilder: React.FC<MealBuilderProps> = ({ cuisine, sectionType, filters, targetCalories = 2000, macros, onGenerate, onCuisineChange, condition, className = '' }) => {
  const { language, t } = useLanguage();
  const ar = language === 'ar';
  const conditionKey = condition || (sectionType === 'diabetes' ? 'diabetes' : sectionType === 'hypertension' ? 'hypertension' : sectionType === 'weight-loss' ? 'overweight' : 'cholesterol');

  const pool = useMemo(() => buildBuilderPool(cuisine, sectionType, filters), [cuisine, sectionType, filters]);
  const [suitabilityFilter, setSuitabilityFilter] = useState<'all' | 'allowed' | 'disallowed'>('all');
  const filteredPool = useMemo(() => {
    const next: BuilderPool = { ...pool };
    (Object.keys(next) as BuilderSlot[]).forEach((slot) => {
      const items = next[slot] ?? [];
      if (suitabilityFilter === 'all') {
        next[slot] = items;
        return;
      }
      next[slot] = items.filter((item) => getDishSuitability(item, conditionKey).status === suitabilityFilter);
    });
    return next;
  }, [pool, conditionKey, suitabilityFilter]);

  const [selections, setSelections] = useState<BuilderSelections>(() => autoSelect(pool));
  const [activeTab, setActiveTab] = useState<'breakfast' | 'lunch' | 'dinner' | 'extras'>('breakfast');
  const [openSlots, setOpenSlots] = useState<Record<string, boolean>>({});

  const effectiveMacros: MealMacros = useMemo(
    () => ({ ...SECTION_MACROS[sectionType], ...(macros ?? {}) }),
    [sectionType, macros],
  );

  const slotTarget = (slot: MealSlotId) => Math.round(targetCalories * MEAL_ALLOC[slot]);

  const slotFoods = (slot: MealSlotId): FoodItem[] => {
    if (slot === 'breakfast') return [...selections.breakfast, ...selections.fruits.slice(0, 1)];
    if (slot === 'lunch') return [...selections.lunch, ...selections.breads.slice(0, 1)];
    return [...selections.dinner];
  };

  useEffect(() => {
    setSelections((prev) => ensureFilled(prev, pool));
  }, [pool]);

  const adjustCount = (slot: MealSlotId, delta: number) => {
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
    const suitability = getDishSuitability(item, conditionKey);
    const suitabilityStateClass = suitability.status === 'allowed'
      ? 'border-emerald-500 bg-emerald-50 shadow-sm'
      : suitability.status === 'disallowed'
        ? 'border-red-400 bg-red-50 opacity-60'
        : '';

    return (
      <button
        key={key}
        type="button"
        onClick={() => toggle(slot, item)}
        disabled={atMax}
        className={`group relative text-left rounded-xl border-2 p-3 transition-all cursor-pointer ${
          selected
            ? 'ring-2 ring-emerald-300'
            : atMax
              ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
              : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
        } ${suitabilityStateClass}`}
        title={suitability.title}
      >
        {suitability.status === 'allowed' ? (
          <span title={suitability.title} className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">✓</span>
        ) : suitability.status === 'disallowed' ? (
          <span title={suitability.title} className="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">✕</span>
        ) : selected ? (
          <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">✓</span>
        ) : null}
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
            <span className="px-1.5 py-0.5 rounded-md bg-red-100 text-[10px] font-bold text-red-700" title="Heavy dish">⚠️ {t('mbHeavy')}</span>
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

  const renderSlot = (slot: MealSlotId) => {
    const items = filteredPool[slot];
    const { min, max } = SLOT_LIMITS[slot];
    const count = selections[slot].length;
    const preview = scaleMeal(slotTarget(slot), slotFoods(slot), effectiveMacros, language);
    const open = !!openSlots[slot];
    const slotNameKey = SLOT_NAME_KEYS[slot];
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
              {fmt(t('mbDishes'), { min, max })}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-bold">
            {fmt(t('mbTarget'), { kcal: slotTarget(slot) })}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {items.map((item, idx) => renderCard(item, slot, idx))}
        </div>
        <div className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3">
          <button
            type="button"
            onClick={() => setOpenSlots((prev) => ({ ...prev, [slot]: !prev[slot] }))}
            className="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
          >
            <span className="text-xs font-extrabold text-indigo-800">{t('mbSmartPortions')}</span>
            <span className={`text-[11px] font-bold whitespace-nowrap ${open ? 'text-indigo-700' : 'bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg'}`}>
              {open ? '▾ ' : '▸ '}
              {fmt(open ? t('mbHidePlan') : t('mbShowPlan'), { meal: t(slotNameKey), kcal: slotTarget(slot) })}
            </span>
          </button>
          {open && (
            <div className="mt-2">
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-indigo-200/70">
                      <th className="pb-1.5 pr-1">{t('mbDish')}</th>
                      <th className="pb-1.5 text-center">{t('mbGrams')}</th>
                      <th className="pb-1.5 text-center">{t('mbCalories')}</th>
                      <th className="pb-1.5 text-center">{t('mbProtein')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-100/70">
                    {preview.rows.map((r, i) => (
                      <tr key={i}>
                        <td className="py-1.5 pr-1 font-medium text-gray-700">{r.label}</td>
                        <td className="py-1.5 text-center text-gray-600">
                          <span title={fmt(t('mbCarbsFat'), { carbs: r.carbs, fat: r.fat })} className="cursor-help">
                            {r.grams} {r.unit === 'ml' ? (ar ? 'مل' : 'ml') : (ar ? 'جم' : 'g')}
                          </span>
                        </td>
                        <td className="py-1.5 text-center"><span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-md font-bold">{r.kcal}</span></td>
                        <td className="py-1.5 text-center font-bold text-gray-700">{r.protein}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-indigo-200 font-extrabold text-indigo-800">
                      <td className="pt-1.5 pr-1">{t('mbTotal')}</td>
                      <td className="pt-1.5 text-center">
                        <span title={fmt(t('mbCarbsFat'), { carbs: preview.carbs, fat: preview.fat })} className="cursor-help">
                          {preview.rows.reduce((s, r) => s + r.grams, 0)} {ar ? 'جم' : 'g'}
                        </span>
                      </td>
                      <td className="pt-1.5 text-center"><span className="bg-indigo-600 text-white px-1.5 py-0.5 rounded-md">{preview.calories}</span></td>
                      <td className="pt-1.5 text-center">{preview.protein}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className="mt-2 text-[10px] text-indigo-400">
                {t('mbAdaptiveDesc')}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderExtras = () => (
    <div className="space-y-5">
      {EXTRA_GROUPS.filter((group) => filteredPool[group.slot].length > 0).map((group) => {
        const items = filteredPool[group.slot];
        const { min, max } = SLOT_LIMITS[group.slot];
        const count = selections[group.slot].length;
        return (
          <div key={group.slot}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg leading-none">{group.emoji}</span>
              <span className="text-sm font-extrabold text-gray-800">{t(group.key)}</span>
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
        <h3 className="font-bold text-gray-900">{t('mbBuild')}</h3>
        <span className="ml-auto text-[11px] font-bold text-gray-400">{fmt(t('mbPicked'), { n: totalPicked })}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['all', 'allowed', 'disallowed'] as const).map((filter) => {
          const active = suitabilityFilter === filter;
          const label = filter === 'all' ? (ar ? 'الكل' : 'All') : filter === 'allowed' ? (ar ? '✅ المسموح' : '✅ Allowed') : (ar ? '❌ غير المسموح' : '❌ Not allowed');
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setSuitabilityFilter(filter)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                active
                  ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {geo && onCuisineChange && detectedCuisine !== cuisine && (
        <div className="flex items-center gap-2 justify-between bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 text-xs">
          <span className="text-blue-700 font-medium">
            📍 {fmt(t('mbDetectedCuisine'), { country: ar ? geo.countryAr : geo.countryEn, cuisine: getCuisineLocalName(detectedCuisine, language) })}
          </span>
          <button type="button" onClick={() => onCuisineChange(detectedCuisine)} className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold hover:bg-blue-700 transition-colors cursor-pointer">
            {t('mbUse')}
          </button>
        </div>
      )}
      {geo && onCuisineChange && detectedCuisine === cuisine && (
        <div className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-500">
          📍 {fmt(t('mbDetectedRegion'), { country: ar ? geo.countryAr : geo.countryEn, cuisine: getCuisineLocalName(cuisine, language) })}
        </div>
      )}

      <div className="text-[11px] text-gray-400 -mt-1">
        {fmt(t('mbAutoFill'), { cuisine: getCuisineLocalName(cuisine, language) })}
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
            {tab.emoji} {t(tab.key)}
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
          ✨ {t('mbGenerate30')}
        </button>
      </div>
    </div>
  );
};

export default MealBuilder;