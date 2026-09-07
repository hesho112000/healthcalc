import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UserProfile, CalorieResult, HealthGoal, MealPlan } from '../types';
import { calculateFullResults, generateMealPlan, generateFullMealPlan } from '../utils/calculations';
import AdviceBox from '../features/health-tools/AdviceBox';
import { usePersistedState } from '../hooks/usePersistedState';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import SaveProgressButton from '../features/health-tools/SaveProgressButton';
import MealPlanModal from '../features/plan-builder/MealPlanModal';
import WorkoutBlueprintModal from '../features/plan-builder/WorkoutBlueprintModal';
import {
  PageHero, StatsBar, DaySelectorBar,
  MacroBreakdown, MealCard, DayProgressHeader, StreakBar,
} from '../features/plan-builder/HealthPlanTemplate';
import GoalSelector, { FunnelGoal } from '../features/weight-funnel/GoalSelector';
import PlanTypeSelector, { PlanType } from '../features/weight-funnel/PlanTypeSelector';
import HealthBlueprint, { ProteinSource, DietStyle, ExcludePref, MealCount } from '../features/weight-funnel/HealthBlueprint';

import { FOODS_DATABASE, CUISINE_META, Cuisine, CUISINE_OPTIONS, EXERCISE_TYPE_LABELS, EXERCISE_TYPE_OPTIONS, ExerciseType } from '../utils/calculations_expanded';
import { getSwapOptions, addCustomToCuisineDB } from '../utils/cuisineSwapDB';
import { getCuisineLabel } from '../utils/healthPlans';
import { ClipboardList } from 'lucide-react';

const getPrimaryGoal = (goals: FunnelGoal[]): HealthGoal =>
  goals.includes('lose_fat') ? 'lose_weight' : goals.includes('gain_muscle') ? 'gain_muscle' : 'maintain';

const getTargetCalories = (tdee: number, goals: FunnelGoal[]): number => {
  if (goals.includes('lose_fat')) return Math.round(tdee - 500);
  if (goals.includes('gain_weight')) return Math.round(tdee + 450);
  if (goals.includes('gain_muscle')) return Math.round(tdee + 300);
  return Math.round(tdee);
};

const includesMeal = (planType: PlanType) => planType === 'meal' || planType === 'both';
const includesWorkout = (planType: PlanType) => planType === 'workout' || planType === 'both';

const slotOf = (meal: MealPlan): 'breakfast' | 'lunch' | 'dinner' | 'snack' =>
  /breakfast/i.test(meal.meal) ? 'breakfast'
    : /lunch/i.test(meal.meal) ? 'lunch'
      : /dinner/i.test(meal.meal) ? 'dinner' : 'snack';

interface SwapAlt { name: string; nameAr?: string; calories: number; protein: number; carbs: number; fat: number; best?: string }
interface SwapItem extends SwapAlt { qty: number }
interface SwapState { foods: SwapItem[]; isAuto: boolean; original: MealPlan }
type AutoGoal = 'lose_fat' | 'gain_muscle' | 'gain_weight' | 'overall';

const SLOT_BUDGET: Record<'breakfast' | 'lunch' | 'dinner' | 'snack', number> = { breakfast: 0.25, lunch: 0.35, dinner: 0.25, snack: 0.1 };

const MEAL_STRUCTURES: Record<MealCount, Array<{ slot: 'breakfast' | 'lunch' | 'dinner' | 'snack'; pct: number }>> = {
  3: [{ slot: 'breakfast', pct: 0.3 }, { slot: 'lunch', pct: 0.4 }, { slot: 'dinner', pct: 0.3 }],
  4: [{ slot: 'breakfast', pct: 0.25 }, { slot: 'snack', pct: 0.1 }, { slot: 'lunch', pct: 0.35 }, { slot: 'dinner', pct: 0.3 }],
  5: [{ slot: 'breakfast', pct: 0.25 }, { slot: 'snack', pct: 0.1 }, { slot: 'lunch', pct: 0.3 }, { slot: 'snack', pct: 0.1 }, { slot: 'dinner', pct: 0.25 }],
};

const applyMealStructure = (source: MealPlan[], mealCount: MealCount, target: number): MealPlan[] => {
  const structure = MEAL_STRUCTURES[mealCount];
  const used = new Set<number>();
  return structure.map(({ slot, pct }) => {
    const idx = slot === 'snack'
      ? source.findIndex((m, i) => !used.has(i) && slotOf(m) === 'snack')
      : source.findIndex((m, i) => !used.has(i) && slotOf(m) === slot);
    if (idx >= 0) used.add(idx);
    const src = idx >= 0 ? source[idx] : undefined;
    const fallback: MealPlan = {
      meal: slot === 'snack' ? '🍎 Snack' : slot === 'breakfast' ? '🌅 Breakfast' : slot === 'lunch' ? '☀️ Lunch' : '🌙 Dinner',
      icon: slot === 'snack' ? 'snack' : 'meal',
      calories: 0, protein: 0, carbs: 0, fat: 0, items: [], description: '',
    };
    const base = src ?? fallback;
    const kcal = Math.round(target * pct);
    return {
      ...base,
      calories: kcal,
      protein: Math.round(kcal * 0.3 / 4),
      carbs: Math.round(kcal * 0.45 / 4),
      fat: Math.round(kcal * 0.25 / 9),
    };
  });
};

const suggestMealCount = (goals: FunnelGoal[], target: number): MealCount => {
  if (goals.includes('lose_fat') && target < 1800) return 3;
  if (goals.includes('gain_muscle') || goals.includes('gain_weight') || target > 2200) return 5;
  return 4;
};

const autoRate = (goal: AutoGoal, food: SwapAlt): number => {
  if (goal === 'lose_fat') return food.fat > 10 ? 0.3 : food.protein > 20 ? 0.6 : 0.7;
  if (goal === 'gain_muscle') return food.protein > 20 ? 0.5 : food.carbs > 25 ? 0.4 : 0.5;
  if (goal === 'gain_weight') return 0.7;
  return 0.5;
};

const autoReasonKey = (goal: AutoGoal, food: SwapAlt): 'wlAutoReasonFat' | 'wlAutoReasonProtein' | 'wlAutoReasonCarb' | 'wlAutoReasonBulking' | 'wlAutoReasonDefault' => {
  if (goal === 'lose_fat') return food.fat > 10 ? 'wlAutoReasonFat' : food.protein > 20 ? 'wlAutoReasonProtein' : 'wlAutoReasonCarb';
  if (goal === 'gain_muscle') return food.protein > 20 ? 'wlAutoReasonProtein' : food.carbs > 25 ? 'wlAutoReasonCarb' : 'wlAutoReasonDefault';
  if (goal === 'gain_weight') return 'wlAutoReasonBulking';
  return 'wlAutoReasonDefault';
};

const snapQty = (x: number) => Math.min(300, Math.max(50, Math.round(x / 25) * 25));

const slotWordKey = (best?: string): '' | 'wlMealBreakfast' | 'wlMealLunch' | 'wlMealDinner' | 'wlMealSnack' =>
  best === 'breakfast' ? 'wlMealBreakfast' : best === 'lunch' ? 'wlMealLunch' : best === 'dinner' ? 'wlMealDinner' : best === 'snack' ? 'wlMealSnack' : '';

const toSwapAlt = (o: { name: string; nameAr: string; calories: number; protein: number; carbs: number; fat: number }, slot: string): SwapAlt => ({
  name: o.name, nameAr: o.nameAr, calories: o.calories, protein: o.protein, carbs: o.carbs, fat: o.fat, best: slot,
});

const WeightLossPage: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const fmt = (tpl: string, vars: Record<string, string | number>) => tpl.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
  const resultsRef = useRef<HTMLDivElement>(null);

  const [selectedGoals, setSelectedGoals] = useState<FunnelGoal[]>(() => {
    const bridge = localStorage.getItem('hc_calculator_bridge');
    if (bridge) {
      try {
        const data = JSON.parse(bridge);
        if (data.goal === 'lose_weight') return ['lose_fat' as FunnelGoal];
      } catch {}
    }
    return [];
  });
  const [planType, setPlanType] = useState<PlanType>('both');
  const [mealCount, setMealCount] = useState<MealCount>(4);
  const [goalError, setGoalError] = useState<string | null>(null);

  const [form, setForm] = useState<UserProfile>(() => {
    const bridge = localStorage.getItem('hc_calculator_bridge');
    if (bridge) {
      try {
        const data = JSON.parse(bridge);
        return {
          age: data.age ?? 30, gender: data.gender ?? 'male', height: data.height ?? 175,
          weight: data.weight ?? 75, activityLevel: data.activityLevel ?? 'moderate', goal: data.goal ?? 'lose_weight',
          workoutDays: data.workoutDays ?? 3,
        };
      } catch {}
    }
    return { age: 30, gender: 'male', height: 175, weight: 75, activityLevel: 'moderate', goal: 'lose_weight', workoutDays: 3 };
  });

  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const [exerciseType, setExerciseType] = useState<ExerciseType | 'auto'>('auto');
  const [selectedProteins, setSelectedProteins] = useState<ProteinSource[]>(['chicken', 'eggs', 'fish']);
  const [selectedStyle, setSelectedStyle] = useState<DietStyle[]>(['high_protein']);
  const [selectedExcludes, setSelectedExcludes] = useState<ExcludePref[]>([]);
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(() => (new Date().getDate() % 30));
  const [workoutSelectedDay, setWorkoutSelectedDay] = useState(0);
  const [dayCompletions, setDayCompletions] = usePersistedState<Record<number, Record<number, boolean>>>({}, 'hc_wl_day_completions');
  const [streak, setStreak] = useState({ current: 0, longest: 0, daysCompleted: 0 });
  const [swapOpen, setSwapOpen] = useState<number | null>(null);
  const [swapState, setSwapState] = useState<Record<number, SwapState>>({});
  const [swapIsAuto, setSwapIsAuto] = useState<Record<number, boolean>>({});
  const [portions, setPortions] = useState<Record<number, number>>({});
  const [customSwap, setCustomSwap] = useState('');
  const [selectedSwaps, setSelectedSwaps] = useState<Record<number, SwapItem[]>>({});

  const tdee = useMemo(() => {
    const base = calculateFullResults({ ...form, goal: 'maintain' }, undefined, language);
    return base.tdee;
  }, [form, language]);

  const suggestedMealCount = useMemo(
    () => suggestMealCount(selectedGoals, getTargetCalories(tdee, selectedGoals)),
    [selectedGoals, tdee],
  );

  useEffect(() => {
    if (selectedGoals.length > 0) setMealCount(suggestedMealCount);
  }, [suggestedMealCount, selectedGoals.length]);

  const buildResult = useCallback(
    (goals: FunnelGoal[], cuisine: Cuisine | null, lang: string): CalorieResult => {
      const primary = getPrimaryGoal(goals);
      const base = calculateFullResults({ ...form, goal: primary }, cuisine ?? undefined, lang);
      const target = getTargetCalories(base.tdee, goals);
      const macros = {
        protein: Math.round((target * 0.3) / 4),
        carbs: Math.round((target * 0.45) / 4),
        fat: Math.round((target * 0.25) / 9),
        proteinGrams: Math.round((target * 0.3) / 4),
        carbsGrams: Math.round((target * 0.45) / 4),
        fatGrams: Math.round((target * 0.25) / 9),
      };
      return {
        ...base,
        targetCalories: target,
        macros,
        mealPlan: generateMealPlan(target, cuisine ?? undefined, lang),
        fullMealPlan: generateFullMealPlan(target, cuisine ?? undefined, lang).map((d) => ({
          ...d,
          meals: applyMealStructure(d.meals, mealCount, target),
        })),
      };
    },
    [form, mealCount],
  );

  const handleGenerate = () => {
    if (!selectedGoals.length) {
      setGoalError(t('wlfSelectGoalError'));
      return;
    }
    setGoalError(null);
    setResult(buildResult(selectedGoals, selectedCuisine, language));
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  useEffect(() => {
    if (!result) return;
    setResult(buildResult(selectedGoals, selectedCuisine, language));
  }, [selectedCuisine, language, mealCount, buildResult]);

  const handleCuisineChange = useCallback((cuisine: Cuisine | null) => {
    setSelectedCuisine(cuisine);
    if (cuisine) localStorage.setItem('hc_selectedCuisine', cuisine);
    else localStorage.removeItem('hc_selectedCuisine');
  }, []);

  const toggleMealDone = useCallback((mealIdx: number, done: boolean) => {
    setDayCompletions(prev => ({ ...prev, [selectedDay]: { ...prev[selectedDay], [mealIdx]: done } }));
  }, [selectedDay]);

  const dayMeals = result?.fullMealPlan[selectedDay]?.meals || [];
  const dayDone = dayCompletions[selectedDay] || {};
  const dayDoneCount = Object.values(dayDone).filter(Boolean).length;
  const activeGoal = getPrimaryGoal(selectedGoals);

  const autoGoal: AutoGoal = selectedGoals.includes('lose_fat') ? 'lose_fat'
    : selectedGoals.includes('gain_muscle') ? 'gain_muscle'
      : selectedGoals.includes('gain_weight') ? 'gain_weight' : 'overall';

  const displayMeal = (idx: number): MealPlan => {
    const st = swapState[idx];
    const base = st?.original ?? dayMeals[idx];
    if (!st || !st.foods.length) return base;
    const totals = st.foods.reduce((acc, s) => {
      acc.calories += Math.round(s.calories * s.qty / 100);
      acc.protein += Math.round(s.protein * s.qty / 100);
      acc.carbs += Math.round(s.carbs * s.qty / 100);
      acc.fat += Math.round(s.fat * s.qty / 100);
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
    const join = (fmtG: (s: SwapItem) => string) => st.foods.map(fmtG).join(' + ');
    const enLabel = join((s) => `${s.name} ${s.qty}g`);
    const arLabel = join((s) => `${s.nameAr ?? s.name} ${s.qty}جم`);
    return {
      ...base,
      nameEn: enLabel,
      nameAr: arLabel,
      calories: totals.calories,
      protein: totals.protein,
      carbs: totals.carbs,
      fat: totals.fat,
      items: st.foods.map((s) => (language === 'ar' ? `${s.nameAr ?? s.name} ${s.qty}جم` : `${s.name} ${s.qty}g`)),
    };
  };

  const applyAutoAdjust = (idx: number, foods: SwapItem[]): SwapItem[] => {
    if (!foods.length) return foods;
    const slot = slotOf(swapState[idx]?.original ?? dayMeals[idx]);
    const budget = SLOT_BUDGET[slot] * (result?.targetCalories ?? 0);
    let remaining = budget;
    return foods.map((s) => {
      if (remaining <= 0) return { ...s, qty: 50 };
      const rate = autoRate(autoGoal, s);
      const qty = snapQty(remaining * rate / s.calories * 100);
      remaining -= qty * s.calories / 100;
      return { ...s, qty };
    });
  };

  const dayTotals = useMemo(() => dayMeals.reduce((acc, _meal, idx) => {
    const base = displayMeal(idx);
    const scale = (portions[idx] ?? 150) / 150;
    acc.kcal += Math.round(base.calories * scale);
    acc.protein += Math.round((base.protein ?? 0) * scale);
    return acc;
  }, { kcal: 0, protein: 0 }), [dayMeals, swapState, portions, language]);

  const toggleSwapSel = (idx: number, alt: SwapAlt) => {
    setSelectedSwaps(prev => {
      const cur = prev[idx] ?? [];
      const next = cur.some(s => s.name === alt.name)
        ? cur.filter(s => s.name !== alt.name)
        : [...cur, { ...alt, qty: 150 }];
      const adjusted = (swapIsAuto[idx] ?? true) ? applyAutoAdjust(idx, next) : next;
      return { ...prev, [idx]: adjusted };
    });
  };

  const toggleCustomSel = (idx: number, alt: SwapAlt) => {
    toggleSwapSel(idx, alt);
    setCustomSwap('');
  };

  const setSwapQty = (idx: number, name: string, qty: number) => {
    setSelectedSwaps(prev => ({ ...prev, [idx]: (prev[idx] ?? []).map(s => (s.name === name ? { ...s, qty } : s)) }));
  };

  const checkCustom = (idx: number) => {
    const q = customSwap.trim();
    if (!q) return;
    const slot = slotOf(swapState[idx]?.original ?? dayMeals[idx]);
    const found = FOODS_DATABASE.find((f) => f.name.toLowerCase().includes(q.toLowerCase()) || (f.name_ar || '').includes(q));
    const alt: SwapAlt = found
      ? { name: found.name, nameAr: found.name_ar, calories: found.calories, protein: found.protein, carbs: found.carbs, fat: found.fat, best: slot }
      : { name: q, calories: 200, protein: 10, carbs: 20, fat: 8, best: slot };
    addCustomToCuisineDB({ name: alt.name, nameAr: alt.nameAr, calories: alt.calories, protein: alt.protein, carbs: alt.carbs, fat: alt.fat }, selectedCuisine, slot);
    toggleCustomSel(idx, alt);
  };

  const openEdit = (idx: number) => {
    setSelectedSwaps(prev => prev[idx] ? prev : { ...prev, [idx]: (swapState[idx]?.foods ?? []).map(f => ({ ...f })) });
    setSwapOpen(idx);
    setCustomSwap('');
  };

  const commitSave = (idx: number) => {
    const foods = selectedSwaps[idx] ?? [];
    if (!foods.length) return;
    const original = swapState[idx]?.original ?? dayMeals[idx];
    const isAuto = swapIsAuto[idx] ?? true;
    setSwapState(prev => ({ ...prev, [idx]: { foods, isAuto, original } }));
    setSwapOpen(null);
    setCustomSwap('');
  };

  const resetMeal = (idx: number) => {
    setSwapState(prev => { const n = { ...prev }; delete n[idx]; return n; });
    setSelectedSwaps(prev => { const n = { ...prev }; delete n[idx]; return n; });
    setSwapOpen(null);
    setCustomSwap('');
  };

  const resetAllSel = (idx: number) => {
    setSelectedSwaps(prev => ({ ...prev, [idx]: [] }));
    setSwapIsAuto(prev => ({ ...prev, [idx]: true }));
    setCustomSwap('');
  };

  const handleAddMeal = useCallback((meal: MealPlan) => {
    setResult(prev => prev ? { ...prev, fullMealPlan: prev.fullMealPlan.map((d, i) => (i === selectedDay ? { ...d, meals: [...d.meals, meal] } : d)) } : prev);
  }, [selectedDay]);

  const filteredFoods = useMemo(() => {
    const key = selectedCuisine ?? 'egyptian';
    return FOODS_DATABASE.filter(f => f.cuisine.includes(key)).slice(0, 8);
  }, [selectedCuisine]);

  const showMeals = includesMeal(planType);
  const showWorkouts = includesWorkout(planType);
  const activeCuisineLabel = selectedCuisine
    ? `${getCuisineLabel(CUISINE_OPTIONS.find(c => c.key === selectedCuisine) || CUISINE_OPTIONS[0], language)} ${CUISINE_META[selectedCuisine].flag}`
    : '';

  return (
    <div className="tool-page min-h-screen bg-[#f8fafc]" dir={dir}>
      <Breadcrumbs />
      <PageHero pill={t('wlHeroPill')} title={t('module1Title')} description={t('module1Desc')} icon={ClipboardList} color="#f59e0b" />

      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-6">
        <section className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">👤</div>
            {t('wlfBasicsTitle')}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{t('wlfBasicsSub')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            <div>
              <label className="label">{t('age')} ({t('wlAgeYears')})</label>
              <input type="number" min={14} max={100} value={form.age} onChange={(e) => setForm({ ...form, age: +e.target.value })} className="input-field-lg" />
            </div>
            <div>
              <label className="label">{t('gender')}</label>
              <div className="grid grid-cols-2 gap-1.5">
                {[{ value: 'male' as const, icon: '👨' }, { value: 'female' as const, icon: '👩' }].map((g) => (
                  <button key={g.value} type="button" onClick={() => setForm({ ...form, gender: g.value })}
                    className={`py-3 rounded-xl text-sm font-semibold border-2 ${form.gender === g.value ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-500'}`}>
                    <span className="mr-1">{g.icon}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">{t('height')} ({t('cmUnit')})</label>
              <input type="number" min={100} max={250} value={form.height} onChange={(e) => setForm({ ...form, height: +e.target.value })} className="input-field-lg" />
            </div>
            <div>
              <label className="label">{t('weightLabel')} ({t('kgUnit')})</label>
              <input type="number" min={30} max={300} value={form.weight} onChange={(e) => setForm({ ...form, weight: +e.target.value })} className="input-field-lg" />
            </div>
          </div>
        </section>

        <GoalSelector selected={selectedGoals} onChange={setSelectedGoals} error={goalError} tdee={tdee} />

        <PlanTypeSelector value={planType} onChange={setPlanType} />

        <HealthBlueprint
          planType={planType}
          cuisine={selectedCuisine}
          onCuisineChange={handleCuisineChange}
          workoutDays={form.workoutDays ?? 3}
          onWorkoutDaysChange={(days) => setForm((prev) => ({ ...prev, workoutDays: days }))}
          exerciseType={exerciseType}
          onExerciseTypeChange={setExerciseType}
          selectedProteins={selectedProteins}
          onProteinsChange={setSelectedProteins}
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          selectedExcludes={selectedExcludes}
          onExcludesChange={setSelectedExcludes}
          selectedGoals={selectedGoals}
          onAddMeal={handleAddMeal}
          tdee={tdee}
          mealCount={mealCount}
          onMealCountChange={setMealCount}
          suggestedMealCount={suggestedMealCount}
          onGenerate={handleGenerate}
        />

        {result && (
          <div ref={resultsRef} className="space-y-6 scroll-mt-24">
            <div className="pt-2">
              <h2 className="text-xl font-bold text-gray-900">🚀 {t('wlfResultsTitle')}</h2>
              <p className="text-sm text-gray-500">{t('wlfResultsSub')}</p>
            </div>

            <StatsBar stats={{ bmr: result.bmr, tdee: result.tdee, targetCalories: result.targetCalories }} />

            {showMeals && <AdviceBox weight={form.weight} height={form.height} age={form.age} gender={form.gender} targetCalories={result.targetCalories} goal={activeGoal} />}

            {showMeals && (
              <section className="space-y-5">
                <div className="pt-2 flex items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-900">🍽️ {t('wlfMealSectionTitle')}</h3>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">{result.targetCalories} {t('wlfKcalDay')}</span>
                </div>

                <MacroBreakdown proteinG={result.macros.proteinGrams} proteinPct={result.macros.protein} carbsG={result.macros.carbsGrams} carbsPct={result.macros.carbs} fatG={result.macros.fatGrams} fatPct={result.macros.fat} />

                <DaySelectorBar days={30} activeDay={selectedDay + 1} onSelect={(d) => setSelectedDay(d - 1)} />

                <div className="card p-4 bg-white border border-emerald-200 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <span className="text-sm font-bold text-gray-900">{t('wlDayTotals')}</span>
                  <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-bold">🔥 {Math.round(dayTotals.kcal)} kcal</span>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold">💪 {fmt(t('wlSwapAlt'), { kcal: 0, protein: dayTotals.protein }).split(' | ')[1]}</span>
                </div>

                <DayProgressHeader completed={dayDoneCount} total={dayMeals.length + 1} dailyGoal={t('wlCompleteAllMeals')} />
                <button
                  onClick={() => setShowMealPlanModal(true)}
                  className="w-full btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                  </svg>
                  {t('wlFullPlan')}
                </button>

                <div className="grid gap-4">
                  {dayMeals.map((meal, idx) => {
                    const st = swapState[idx];
                    const base = displayMeal(idx);
                    const grams = portions[idx] ?? 150;
                    const scale = grams / 150;
                    const scaled: MealPlan = {
                      ...base,
                      calories: Math.round(base.calories * scale),
                      protein: Math.round((base.protein ?? 0) * scale),
                      carbs: Math.round((base.carbs ?? 0) * scale),
                      fat: Math.round((base.fat ?? 0) * scale),
                    };
                    const altSlot = slotOf(base);
                    const alts: SwapAlt[] = getSwapOptions(selectedCuisine, altSlot).map((o) => toSwapAlt(o, altSlot));
                    return (
                      <div key={idx} className="relative space-y-2">
                        <MealCard meal={scaled} done={!!dayDone[idx]} onToggle={(done) => toggleMealDone(idx, done)} />
                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5">
                          <button
                            type="button"
                            onClick={() => { openEdit(idx); if (swapOpen === idx) setSwapOpen(null); }}
                            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                              swapOpen === idx ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-gray-200 hover:border-emerald-300'
                            }`}
                          >
                            🔄 {t('wlSwapBtn')}
                          </button>
                          <span className="text-[11px] font-medium text-gray-500 shrink-0">{t('wlPortion')}</span>
                          <input
                            type="range"
                            min={50} max={300} step={50}
                            value={grams}
                            onChange={(e) => setPortions(prev => ({ ...prev, [idx]: +e.target.value }))}
                            className="flex-1 accent-emerald-600 min-w-0"
                          />
                          <span className="text-xs font-bold text-gray-700 shrink-0 whitespace-nowrap">{fmt(t('wlGrams'), { g: grams })} · {scaled.calories} kcal</span>
                        </div>

                        {st && (
                          <div className="flex gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() => { openEdit(idx); }}
                              className="text-[11px] px-2.5 py-1 bg-white border border-gray-200 rounded-full font-semibold text-gray-700 hover:border-emerald-300 transition-all"
                            >
                              ✏️ {t('wlEditMeal')}
                            </button>
                            <button
                              type="button"
                              onClick={() => resetMeal(idx)}
                              className="text-[11px] px-2.5 py-1 bg-white border border-red-200 rounded-full font-semibold text-red-600 hover:bg-red-50 transition-all"
                            >
                              🔄 {t('wlResetMeal')}
                            </button>
                          </div>
                        )}

                        {swapOpen === idx && (() => {
                          const sel = selectedSwaps[idx] ?? [];
                          const selTotal = sel.reduce((a, s) => a + Math.round(s.calories * s.qty / 100), 0);
                          const isAuto = swapIsAuto[idx] ?? true;
                          const slotName = slotOf(swapState[idx]?.original ?? dayMeals[idx]);
                          const goalLabel = t(autoGoal === 'lose_fat' ? 'wlfGoalLoseTitle' : autoGoal === 'gain_muscle' ? 'wlfGoalMuscleTitle' : autoGoal === 'gain_weight' ? 'wlfGoalGainTitle' : 'wlfGoalHealthTitle');
                          const slotKey = slotWordKey(slotName);
                          const mealLabel = slotKey ? t(slotKey) : t('wlMealSnack');
                          const cuisineOption = selectedCuisine ? CUISINE_OPTIONS.find((c) => c.key === selectedCuisine) : null;
                          const cuisineName = selectedCuisine ? (cuisineOption ? getCuisineLabel(cuisineOption, language) : selectedCuisine) : t('wlSwapMixed');
                          const cuisineFlag = selectedCuisine === 'egyptian' ? '🇪🇬' : selectedCuisine === 'mediterranean' ? '🥗' : (cuisineOption?.flag ?? '🍽️');
                          const reasonText = sel.map(s => `${language === 'ar' ? (s.nameAr ?? s.name) : s.name} → ${s.qty}g (${t(autoReasonKey(autoGoal, s))})`).join('، ');
                          const applyAutoNow = () => {
                            setSelectedSwaps(prev => ({ ...prev, [idx]: applyAutoAdjust(idx, prev[idx] ?? []) }));
                            setSwapIsAuto(prev => ({ ...prev, [idx]: true }));
                          };
                          return (
                            <div className="absolute z-10 p-3 bg-white border border-gray-200 rounded-xl shadow-xl w-80 right-0 -bottom-2 translate-y-full max-h-[70vh] overflow-y-auto scrollbar-thin">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-sm font-bold text-gray-900">{t('wlSwapCuisineTitle')}</span>
                                <span className="px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[11px] font-bold">{cuisineName} {cuisineFlag}</span>
                                <span className="text-[11px] text-gray-500">({mealLabel} - {alts.length} {t('wlSwapOptions')})</span>
                              </div>
                              {!selectedCuisine && (
                                <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800 mb-1">{t('wlSwapCuisineHint')}</div>
                              )}
                              <div className="flex justify-between items-center mt-1 mb-2">
                                <span className="text-[11px] font-semibold text-gray-600">{fmt(t('wlSwapSelected'), { n: sel.length, kcal: selTotal })}</span>
                                {sel.length > 0 && (
                                  <button type="button" onClick={() => resetAllSel(idx)} className="text-[11px] px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full hover:bg-red-100 transition-all shrink-0">
                                    {t('wlResetAll')}
                                  </button>
                                )}
                              </div>
                              <div className="mt-2 space-y-1">
                                {alts.map((alt, i) => {
                                  const checked = sel.some(s => s.name === alt.name);
                                  const rowItem = sel.find(s => s.name === alt.name);
                                  const slotKey = slotWordKey(alt.best);
                                  return (
                                    <label key={i} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${checked ? 'bg-emerald-50 border-emerald-500 border-2' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${checked ? 'bg-emerald-600 border-emerald-600' : 'border-gray-300 bg-white'}`}>
                                        {checked && <span className="text-white text-xs font-bold">✓</span>}
                                      </div>
                                      <input type="checkbox" className="hidden" checked={checked} onChange={() => toggleSwapSel(idx, alt)} />
                                      <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-800">{language === 'ar' ? (alt.nameAr ?? alt.name) : alt.name}</div>
                                        <div className="text-[11px] text-gray-500">{alt.calories} kcal • {alt.protein}g P{slotKey ? ` • ${t('commonBest')}: ${t(slotKey)}` : ''}</div>
                                      </div>
                                      {checked && (
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                          <input type="range" min={50} max={300} step={25} value={rowItem?.qty ?? 150} disabled={isAuto} onChange={(e) => setSwapQty(idx, alt.name, +e.target.value)} className={`w-20 h-1 accent-emerald-600 ${isAuto ? 'opacity-50 cursor-not-allowed' : ''}`} />
                                          <span className="text-xs font-bold text-gray-700 w-10 text-right">{rowItem?.qty ?? 150}g</span>
                                        </div>
                                      )}
                                    </label>
                                  );
                                })}
                              </div>
                              {sel.length > 0 && (
                                <div className="p-2 bg-blue-50 border border-blue-100 rounded-lg text-[11px] text-blue-800 mt-2">
                                  <div>🤖 {fmt(t('wlAutoLine1'), { goal: goalLabel, kcal: result?.targetCalories ?? 0, meal: mealLabel })}</div>
                                  <div className="mt-0.5 leading-snug">{reasonText}</div>
                                  <div className="mt-1.5 flex items-center gap-2">
                                    <button type="button" disabled={!isAuto} onClick={() => setSwapIsAuto(prev => ({ ...prev, [idx]: false }))} className="underline font-bold disabled:opacity-40 disabled:cursor-not-allowed">{t('wlManualEdit')}</button>
                                    <span className="text-blue-300">|</span>
                                    <button type="button" disabled={isAuto} onClick={applyAutoNow} className="underline font-bold disabled:opacity-40 disabled:cursor-not-allowed">{t('wlApplyAuto')}</button>
                                  </div>
                                </div>
                              )}
                              <div className="mt-3 pt-3 border-t flex gap-2">
                                <input
                                  value={customSwap}
                                  onChange={(e) => setCustomSwap(e.target.value)}
                                  onKeyDown={(e) => e.key === 'Enter' && checkCustom(idx)}
                                  placeholder={t('wlSwapCustomPlaceholder')}
                                  className="flex-1 h-8 px-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-300"
                                />
                                <button type="button" onClick={() => checkCustom(idx)} className="text-xs text-emerald-600 font-bold shrink-0">{t('wlcCheck')}</button>
                              </div>
                              <button
                                type="button"
                                disabled={sel.length === 0}
                                onClick={() => commitSave(idx)}
                                className={`mt-3 w-full h-10 rounded-xl text-sm font-bold transition-all ${sel.length ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-emerald-100 text-emerald-400 cursor-not-allowed'}`}
                              >
                                {sel.length ? fmt(t('wlSwapSaveBtn'), { n: sel.length, kcal: selTotal }) : t('wlSwapSaveDisabled')}
                              </button>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  })}
                </div>

                <div className="card p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <h4 className="font-bold mb-3">💡 {fmt(t('wlSuggestions'), { cuisine: activeCuisineLabel || t('wlfMealPrefTitle') })}</h4>
                  <div className="flex flex-wrap gap-2">
                    {filteredFoods.map((food, idx) => (
                      <span key={idx} className="bg-white border px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
                        {fmt(t('wlCaloriesItem'), { name: food.name, kcal: food.calories })}
                      </span>
                    ))}
                  </div>
                </div>

                <SaveProgressButton module="weightloss" inputs={form} results={result} />
              </section>
            )}

            {showWorkouts && (
              <section className="space-y-5">
                <div className="pt-2">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">🏋️ {t('wlfWorkoutSectionTitle')}</h3>
                </div>

                <StreakBar currentStreak={streak.current} longestStreak={streak.longest} todayChecked={false} daysCompleted={streak.daysCompleted} totalDays={30} />

                <div className="card p-5">
                  <h4 className="font-bold mb-3 flex items-center gap-2">💪 {t('wlExerciseType')}</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setExerciseType('auto')}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                        exerciseType === 'auto'
                          ? 'border-rose-500 bg-rose-50 text-rose-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      🤖 {t('wlAutoRecommend')}
                    </button>
                    {EXERCISE_TYPE_OPTIONS.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setExerciseType(type)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                          exerciseType === type
                            ? 'border-rose-500 bg-rose-50 text-rose-700'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {EXERCISE_TYPE_LABELS[type][language]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {result.workoutPlan.days.map((day, idx) => (
                    <div key={idx} className="card p-3 text-center">
                      <div className="text-[11px] font-bold text-gray-400 uppercase">{day.day}</div>
                      <div className="mt-1 text-xs font-semibold text-gray-800 leading-snug">{day.focus}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowWorkoutModal(true)}
                  className="w-full btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                  </svg>
                  {t('wlFullWorkout')}
                </button>

                <div className="text-center py-4 text-gray-400 text-sm">
                  {t('wlWorkoutHint')}
                </div>
              </section>
            )}

            <MedicalDisclaimer />
          </div>
        )}
      </div>

      {result && (
        <MealPlanModal isOpen={showMealPlanModal} onClose={() => setShowMealPlanModal(false)} targetCalories={result.targetCalories} mealPlan={result.mealPlan} fullMealPlan={result.fullMealPlan} selectedDay={selectedDay} onDayChange={setSelectedDay} weight={form.weight} onSave={() => setShowMealPlanModal(false)} cuisine={selectedCuisine ?? 'egyptian'} onCuisineChange={handleCuisineChange} />
      )}
      {result && (
        <WorkoutBlueprintModal isOpen={showWorkoutModal} onClose={() => setShowWorkoutModal(false)} bmi={+(form.weight / ((form.height / 100) ** 2)).toFixed(1)} goal={activeGoal} fitnessLevel="beginner" weight={form.weight} selectedDay={workoutSelectedDay} onDayChange={setWorkoutSelectedDay} onSave={() => setShowWorkoutModal(false)} />
      )}
    </div>
  );
};

export default WeightLossPage;