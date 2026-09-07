import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  CUISINE_OPTIONS,
  EXERCISE_TYPE_LABELS,
  EXERCISE_TYPE_OPTIONS,
} from '../../utils/calculations_expanded';
import type { Cuisine, ExerciseType } from '../../utils/calculations_expanded';
import { getCuisineLabel } from '../../utils/healthPlans';
import { MealPlan } from '../../types';
import { PlanType } from './PlanTypeSelector';
import { FunnelGoal } from './GoalSelector';
import MealPreferencesSelector, { ProteinSource, DietStyle, ExcludePref } from './MealPreferencesSelector';
import FoodChecker from './FoodChecker';

export type { ProteinSource, DietStyle, ExcludePref };

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

interface HealthBlueprintProps {
  planType: PlanType;
  cuisine: Cuisine | null;
  onCuisineChange: (cuisine: Cuisine | null) => void;
  workoutDays: number;
  onWorkoutDaysChange: (days: number) => void;
  exerciseType: ExerciseType | 'auto';
  onExerciseTypeChange: (type: ExerciseType | 'auto') => void;
  selectedProteins: ProteinSource[];
  onProteinsChange: (proteins: ProteinSource[]) => void;
  selectedStyle: DietStyle[];
  onStyleChange: (style: DietStyle[]) => void;
  selectedExcludes: ExcludePref[];
  onExcludesChange: (excludes: ExcludePref[]) => void;
  selectedGoals: FunnelGoal[];
  onAddMeal: (meal: MealPlan) => void;
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
  selectedProteins,
  onProteinsChange,
  selectedStyle,
  onStyleChange,
  selectedExcludes,
  onExcludesChange,
  selectedGoals,
  onAddMeal,
  onGenerate,
}) => {
  const { t, language } = useLanguage();
  const fmt = (tpl: string, vars: Record<string, string | number>) => tpl.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));

  const toggleCuisine = (key: Cuisine) => {
    if (cuisine === key) onCuisineChange(null);
    else onCuisineChange(key);
  };

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

  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <span className="w-8 h-8 inline-flex items-center justify-center rounded-xl bg-black text-white text-sm font-bold">3</span>
        {t('wlfBlueprintTitle')}
      </h2>
      <p className="text-sm text-gray-500 mt-1">{t('wlfBlueprintSub')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
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
                  onClick={() => toggleCuisine(opt.key as Cuisine)}
                  className={`w-full text-left p-3 rounded-lg flex justify-between items-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : isRecommended
                        ? 'bg-white border-2 border-emerald-300 text-gray-900'
                        : 'hover:bg-gray-50 border border-transparent hover:border-gray-200 text-gray-900'
                  }`}
                >
                  <div>
                    <div className="font-semibold flex items-center gap-1.5">
                      <span>{opt.flag}</span>
                      {getCuisineLabel({ label_ar: opt.label_ar, label_en: opt.label_en }, language)}
                      {isRecommended && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>✨ {t('wlfRecommended')}</span>}
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>{blurb(opt.key)}</div>
                  </div>
                  {isSelected ? (
                    <span
                      onClick={(e) => { e.stopPropagation(); onCuisineChange(null); }}
                      title={t('wlfClearCuisine')}
                      className="w-6 h-6 rounded-full bg-white text-emerald-600 flex items-center justify-center text-sm font-bold shrink-0 hover:bg-emerald-50"
                    >
                      ✕
                    </span>
                  ) : isRecommended ? (
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 border-2 border-emerald-300 text-emerald-600">✨</span>
                  ) : (
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 border-gray-200" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className={includesMeal(planType) ? 'block' : 'hidden'}>
          <MealPreferencesSelector
            selectedProteins={selectedProteins}
            onProteinsChange={onProteinsChange}
            selectedStyle={selectedStyle}
            onStyleChange={onStyleChange}
            selectedExcludes={selectedExcludes}
            onExcludesChange={onExcludesChange}
          />
        </div>
      </div>

      <div className={`mt-6 ${includesWorkout(planType) ? 'block' : 'hidden'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
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
          </div>

          <div>
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

      <div className="mt-6">
        <FoodChecker selectedGoals={selectedGoals} onAddMeal={onAddMeal} />
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
    </section>
  );
};

export default HealthBlueprint;