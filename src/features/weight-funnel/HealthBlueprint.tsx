import React, { useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  CUISINE_OPTIONS,
  EXERCISE_TYPE_LABELS,
  EXERCISE_TYPE_OPTIONS,
} from '../../utils/calculations_expanded';
import type { Cuisine, ExerciseType } from '../../utils/calculations_expanded';
import { getCuisineLabel } from '../../utils/healthPlans';
import { PlanType } from './PlanTypeSelector';

export type ProteinSource = 'chicken' | 'eggs' | 'red_meat' | 'fish' | 'tuna';
export type DietStyle = 'vegetarian' | 'high_protein' | 'low_carb';
export type ExcludePref = 'nuts' | 'dairy' | 'gluten';

const CUISINE_BLURB: Record<string, { en: string; ar: string }> = {
  mediterranean: { en: 'Balanced, heart-healthy', ar: 'متوازنة وصحية للقلب' },
  egyptian: { en: 'Herbs, legumes, balanced protein', ar: 'أعشاب وبقوليات وبروتين متوازن' },
  libyan: { en: 'Hearty stews & fresh seafood', ar: 'يخنات مشبعة وأسماك طازجة' },
  tunisian: { en: 'Bold spices, spicy & colorful', ar: 'توابل قوية وحار ومليء بالألوان' },
  algerian: { en: 'Rich tagines & slow-cooked dishes', ar: 'طواجن غنية وأطباق مطهوة ببطء' },
  moroccan: { en: 'Warm spices & vibrant tagines', ar: 'توابل دافئة وطواجن نابضة' },
  saudi: { en: 'Rice, grilled meats & dates', ar: 'أرز ولحوم مشوية وتمور' },
  lebanese: { en: 'Fresh mezze, olive oil & grains', ar: 'مقبلات طازجة وزيت زيتون وحبوب' },
  turkish: { en: 'Kebabs, meze & rich pastries', ar: 'كباب ومقبلات ومعجنات غنية' },
  indian: { en: 'Fragrant curries & lentils', ar: 'كاري عطري وعدس' },
  pakistani: { en: 'Spiced barbecue & rice dishes', ar: 'مشاوي متبلة وأطباق أرز' },
  chinese: { en: 'Stir-fries, rice & noodles', ar: 'مقليات سريعة وأرز ونودلز' },
  japanese: { en: 'Fresh, light & minimal', ar: 'طازج وخفيف وبسيط' },
  korean: { en: 'Fermented sides & barbecue', ar: 'أطباق جانبية مخمرة ومشاوي' },
  thai: { en: 'Sweet, sour & spicy balance', ar: 'توازن حلو وحامض وحار' },
  italian: { en: 'Pasta, tomatoes & fresh herbs', ar: 'باستا وطماطم وأعشاب طازجة' },
  greek: { en: 'Olive oil, fish & vegetables', ar: 'زيت زيتون وأسماك وخضروات' },
  french: { en: 'Light sauces & fresh produce', ar: 'صلصات خفيفة ومنتجات طازجة' },
  british: { en: 'Hearty roasts & seasonal veg', ar: 'مشويات مشبعة وخضروات موسمية' },
  american: { en: 'Classic proteins & vegetables', ar: 'بروتينات كلاسيكية وخضروات' },
  mexican: { en: 'Beans, corn, avocado & salsa', ar: 'فاصوليا وذرة وأفوكادو وصلصة' },
  australian: { en: 'Fresh produce & grilled foods', ar: 'منتجات طازجة وأطعمة مشوية' },
};

const PROTEIN_SOURCES: Array<{ id: ProteinSource; emoji: string; labelKey: 'wlfSrcChicken' | 'wlfSrcEggs' | 'wlfSrcRedMeat' | 'wlfSrcFish' | 'wlfSrcTuna'; meat: boolean }> = [
  { id: 'chicken', emoji: '🍗', labelKey: 'wlfSrcChicken', meat: true },
  { id: 'eggs', emoji: '🥚', labelKey: 'wlfSrcEggs', meat: false },
  { id: 'red_meat', emoji: '🥩', labelKey: 'wlfSrcRedMeat', meat: true },
  { id: 'fish', emoji: '🐟', labelKey: 'wlfSrcFish', meat: true },
  { id: 'tuna', emoji: '🐠', labelKey: 'wlfSrcTuna', meat: true },
];

const DIET_STYLES: Array<{ id: DietStyle; emoji: string; labelKey: 'wlfStyleVeg' | 'wlfStyleHighProtein' | 'wlfStyleLowCarb' }> = [
  { id: 'vegetarian', emoji: '🥦', labelKey: 'wlfStyleVeg' },
  { id: 'high_protein', emoji: '💪', labelKey: 'wlfStyleHighProtein' },
  { id: 'low_carb', emoji: '🥑', labelKey: 'wlfStyleLowCarb' },
];

const EXCLUDES: Array<{ id: ExcludePref; emoji: string; labelKey: 'wlfExcNuts' | 'wlfExcDairy' | 'wlfExcGluten' }> = [
  { id: 'nuts', emoji: '🥜', labelKey: 'wlfExcNuts' },
  { id: 'dairy', emoji: '🥛', labelKey: 'wlfExcDairy' },
  { id: 'gluten', emoji: '🌾', labelKey: 'wlfExcGluten' },
];

const STYLE_CONFLICTS: Record<DietStyle, DietStyle[]> = {
  vegetarian: [],
  high_protein: ['low_carb'],
  low_carb: ['high_protein'],
};

const MEAT_SOURCES = new Set<ProteinSource>(['chicken', 'red_meat', 'fish', 'tuna']);

interface HealthBlueprintProps {
  planType: PlanType;
  cuisine: Cuisine;
  onCuisineChange: (cuisine: Cuisine) => void;
  workoutDays: number;
  onWorkoutDaysChange: (days: number) => void;
  exerciseType: ExerciseType | 'auto';
  onExerciseTypeChange: (type: ExerciseType | 'auto') => void;
  selectedSources: ProteinSource[];
  onSourcesChange: (sources: ProteinSource[]) => void;
  selectedStyle: DietStyle[];
  onStyleChange: (style: DietStyle[]) => void;
  selectedExcludes: ExcludePref[];
  onExcludesChange: (excludes: ExcludePref[]) => void;
  onGenerate: () => void;
}

const includesMeal = (planType: PlanType) => planType === 'meal' || planType === 'both';
const includesWorkout = (planType: PlanType) => planType === 'workout' || planType === 'both';

const HealthBlueprint: React.FC<HealthBlueprintProps> = ({
  planType,
  cuisine,
  onCuisineChange,
  workoutDays,
  onWorkoutDaysChange,
  exerciseType,
  onExerciseTypeChange,
  selectedSources,
  onSourcesChange,
  selectedStyle,
  onStyleChange,
  selectedExcludes,
  onExcludesChange,
  onGenerate,
}) => {
  const { t, language } = useLanguage();
  const fmt = (tpl: string, vars: Record<string, string | number>) => tpl.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2600);
  };

  const combineMsg = (a: string, b: string) => t('wlfCannotCombine').replace('{a}', a).replace('{b}', b);

  const orderedCuisines = React.useMemo(() => {
    const med = CUISINE_OPTIONS.find((o) => o.key === 'mediterranean');
    const rest = CUISINE_OPTIONS.filter((o) => o.key !== 'mediterranean');
    return med ? [med, ...rest] : rest;
  }, []);

  const blurb = (key: string) => {
    const b = CUISINE_BLURB[key];
    if (!b) return t('wlfCuisineGenericDesc');
    return language === 'ar' ? b.ar : b.en;
  };

  const vegetarian = selectedStyle.includes('vegetarian');

  const toggleSource = (source: ProteinSource) => {
    if (vegetarian && MEAT_SOURCES.has(source)) return;
    onSourcesChange(selectedSources.includes(source)
      ? selectedSources.filter((s) => s !== source)
      : [...selectedSources, source]);
  };

  const toggleStyle = (style: DietStyle) => {
    if (selectedStyle.includes(style)) {
      onStyleChange(selectedStyle.filter((s) => s !== style));
      return;
    }
    if (style === 'vegetarian') {
      const meats = selectedSources.filter((s) => MEAT_SOURCES.has(s));
      if (meats.length) {
        onSourcesChange(selectedSources.filter((s) => !MEAT_SOURCES.has(s)));
        showToast(combineMsg(t('wlfStyleVeg'), t(`wlfSrc${meats[0] === 'chicken' ? 'Chicken' : meats[0] === 'red_meat' ? 'RedMeat' : meats[0] === 'fish' ? 'Fish' : 'Tuna'}`)));
      }
      onStyleChange([...selectedStyle, style]);
      return;
    }
    const conflict = (STYLE_CONFLICTS[style] || []).find((c) => selectedStyle.includes(c));
    if (conflict) {
      showToast(combineMsg(t(style === 'high_protein' ? 'wlfStyleHighProtein' : 'wlfStyleLowCarb'), t(conflict === 'high_protein' ? 'wlfStyleHighProtein' : 'wlfStyleLowCarb')));
      return;
    }
    onStyleChange([...selectedStyle, style]);
  };

  const toggleExclude = (exclude: ExcludePref) => {
    onExcludesChange(selectedExcludes.includes(exclude)
      ? selectedExcludes.filter((e) => e !== exclude)
      : [...selectedExcludes, exclude]);
  };

  const renderChip = (emoji: string, label: string, active: boolean, disabled: boolean, onClick: () => void, tooltip?: string) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
        active
          ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
          : disabled
            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
      }`}
    >
      <span className="text-base leading-none">{emoji}</span>
      {label}
      {active && (
        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center ml-0.5">
          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
      )}
    </button>
  );

  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <span className="w-8 h-8 inline-flex items-center justify-center rounded-xl bg-black text-white text-sm font-bold">3</span>
        {t('wlfBlueprintTitle')}
      </h2>
      <p className="text-sm text-gray-500 mt-1">{t('wlfBlueprintSub')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className={includesMeal(planType) ? 'block' : 'hidden'}>
          <h4 className="font-semibold text-gray-900">{t('wlfCuisineTitle')}</h4>
          <p className="text-sm text-gray-500">{t('wlfCuisineSub')}</p>
          <div className="mt-3 h-80 overflow-y-auto border border-gray-200 rounded-xl p-2 space-y-1 scrollbar-thin">
            {orderedCuisines.map((opt, idx) => {
              const isRecommended = idx === 0 && opt.key === 'mediterranean';
              const isSelected = cuisine === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => onCuisineChange(opt.key as Cuisine)}
                  className={`w-full text-left p-3 rounded-lg flex justify-between items-center gap-2 transition-all ${
                    isRecommended
                      ? 'bg-emerald-600 text-white'
                      : isSelected
                        ? 'bg-emerald-50 border-2 border-emerald-600 text-gray-900'
                        : 'hover:bg-gray-50 border border-transparent hover:border-gray-200 text-gray-900'
                  }`}
                >
                  <div>
                    <div className="font-semibold flex items-center gap-1.5">
                      <span>{opt.flag}</span>
                      {getCuisineLabel({ label_ar: opt.label_ar, label_en: opt.label_en }, language)}
                      {isRecommended && <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded-full">✨ {t('wlfRecommended')}</span>}
                    </div>
                    <div className={`text-xs ${isRecommended ? 'text-white/90' : 'text-gray-500'}`}>{blurb(opt.key)}</div>
                  </div>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                    isRecommended ? 'bg-white text-emerald-600' : isSelected ? 'bg-emerald-600 text-white' : 'border-2 border-gray-200'
                  }`}>
                    {isRecommended ? '✓' : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={includesWorkout(planType) ? 'block' : 'hidden'}>
          <h4 className="font-semibold text-gray-900">🏋️ {t('wlfWorkoutSectionTitle')}</h4>
          <p className="text-sm text-gray-500 mt-1">{t('wlWorkoutDaysPerWeek')}</p>
          <div className="mt-3 flex items-center gap-3">
            <input
              type="range"
              min="0" max="7"
              value={workoutDays}
              onChange={(e) => onWorkoutDaysChange(+e.target.value)}
              className="flex-1 accent-emerald-600"
            />
            <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-lg min-w-[76px] text-center">
              <span className="font-bold text-emerald-700">{fmt(t('wlDays'), { n: workoutDays })}</span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0 - {t('wlSedentary')}</span>
            <span>3-4 - {t('wlModerate')}</span>
            <span>6-7 - {t('wlVeryActive')}</span>
          </div>

          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-700">{t('wlExerciseType')}</h5>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onExerciseTypeChange('auto')}
                className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                  exerciseType === 'auto' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                🤖 {t('wlAutoRecommend')}
              </button>
              {EXERCISE_TYPE_OPTIONS.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => onExerciseTypeChange(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                    exerciseType === type ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {EXERCISE_TYPE_LABELS[type][language]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div>
          <h4 className="font-semibold text-gray-900">🥚 {t('wlfSourcesTitle')}</h4>
          <p className="text-sm text-gray-500">{t('wlfSourcesSub')}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PROTEIN_SOURCES.map((source) => {
              const disabled = vegetarian && source.meat;
              return renderChip(
                source.emoji,
                t(source.labelKey),
                selectedSources.includes(source.id),
                disabled,
                () => toggleSource(source.id),
                disabled ? combineMsg(t(source.labelKey), t('wlfStyleVeg')) : undefined,
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">🥗 {t('wlfStyleTitle')}</h4>
          <p className="text-sm text-gray-500">{t('wlfStyleSub')}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {DIET_STYLES.map((style) =>
              renderChip(
                style.emoji,
                t(style.labelKey),
                selectedStyle.includes(style.id),
                false,
                () => toggleStyle(style.id),
              ),
            )}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">🚫 {t('wlfExcludeTitle')}</h4>
          <p className="text-sm text-gray-500">{t('wlfExcludeSub')}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {EXCLUDES.map((exclude) =>
              renderChip(
                exclude.emoji,
                t(exclude.labelKey),
                selectedExcludes.includes(exclude.id),
                false,
                () => toggleExclude(exclude.id),
              ),
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        className="mt-6 w-full btn-primary py-4 text-base font-bold flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        {t('wlfGenerate')}
      </button>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-rose-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}
    </section>
  );
};

export default HealthBlueprint;