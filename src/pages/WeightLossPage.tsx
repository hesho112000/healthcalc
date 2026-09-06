import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UserProfile, CalorieResult, HealthGoal } from '../types';
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
import HealthBlueprint, { ProteinSource, DietStyle, ExcludePref } from '../features/weight-funnel/HealthBlueprint';

import { FOODS_DATABASE, CUISINE_META, Cuisine, CUISINE_OPTIONS, EXERCISE_TYPE_LABELS, EXERCISE_TYPE_OPTIONS, ExerciseType } from '../utils/calculations_expanded';
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

  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine>(() => {
    const saved = localStorage.getItem('hc_selectedCuisine');
    return (saved as Cuisine) || 'mediterranean';
  });
  const [exerciseType, setExerciseType] = useState<ExerciseType | 'auto'>('auto');
  const [selectedSources, setSelectedSources] = useState<ProteinSource[]>(['chicken', 'eggs', 'fish']);
  const [selectedStyle, setSelectedStyle] = useState<DietStyle[]>(['high_protein']);
  const [selectedExcludes, setSelectedExcludes] = useState<ExcludePref[]>([]);
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(() => (new Date().getDate() % 30));
  const [workoutSelectedDay, setWorkoutSelectedDay] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [dayCompletions, setDayCompletions] = usePersistedState<Record<number, Record<number, boolean>>>({}, 'hc_wl_day_completions');
  const [streak, setStreak] = useState({ current: 0, longest: 0, daysCompleted: 0 });

  const tdee = useMemo(() => {
    const base = calculateFullResults({ ...form, goal: 'maintain' }, 'egyptian', language);
    return base.tdee;
  }, [form, language]);

  const buildResult = useCallback(
    (goals: FunnelGoal[], cuisine: Cuisine, lang: string): CalorieResult => {
      const primary = getPrimaryGoal(goals);
      const base = calculateFullResults({ ...form, goal: primary }, cuisine, lang);
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
        mealPlan: generateMealPlan(target, cuisine, lang),
        fullMealPlan: generateFullMealPlan(target, cuisine, lang),
      };
    },
    [form],
  );

  const handleGenerate = () => {
    if (!selectedGoals.length) {
      setGoalError(t('wlfSelectGoalError'));
      return;
    }
    setGoalError(null);
    setResult(buildResult(selectedGoals, selectedCuisine, language));
    setCompletedExercises({});
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  useEffect(() => {
    if (!result) return;
    setResult(buildResult(selectedGoals, selectedCuisine, language));
  }, [selectedCuisine, language, buildResult]);

  const handleCuisineChange = useCallback((cuisine: Cuisine) => {
    setSelectedCuisine(cuisine);
    localStorage.setItem('hc_selectedCuisine', cuisine);
  }, []);

  const toggleMealDone = useCallback((mealIdx: number, done: boolean) => {
    setDayCompletions(prev => ({ ...prev, [selectedDay]: { ...prev[selectedDay], [mealIdx]: done } }));
  }, [selectedDay]);

  const dayMeals = result?.fullMealPlan[selectedDay]?.meals || [];
  const dayDone = dayCompletions[selectedDay] || {};
  const dayDoneCount = Object.values(dayDone).filter(Boolean).length;
  const activeGoal = getPrimaryGoal(selectedGoals);

  const filteredFoods = useMemo(() => {
    return FOODS_DATABASE.filter(f => f.cuisine.includes(selectedCuisine)).slice(0, 8);
  }, [selectedCuisine]);

  const showMeals = includesMeal(planType);
  const showWorkouts = includesWorkout(planType);

  return (
    <div className="tool-page min-h-screen bg-[#f8fafc]" dir={dir}>
      <Breadcrumbs />
      <PageHero pill={t('wlHeroPill')} title={t('module1Title')} description={t('module1Desc')} icon={ClipboardList} color="#f59e0b" />

      <div className="max-w-3xl mx-auto px-4 pb-16 space-y-6">
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
          selectedSources={selectedSources}
          onSourcesChange={setSelectedSources}
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          selectedExcludes={selectedExcludes}
          onExcludesChange={setSelectedExcludes}
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
                  {dayMeals.map((meal, idx) => (
                    <MealCard key={idx} meal={meal as any} done={!!dayDone[idx]} onToggle={(done) => toggleMealDone(idx, done)} />
                  ))}
                </div>

                <div className="card p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <h4 className="font-bold mb-3">💡 {fmt(t('wlSuggestions'), { cuisine: `${getCuisineLabel(CUISINE_OPTIONS.find(c => c.key === selectedCuisine) || CUISINE_OPTIONS[0], language)} ${CUISINE_META[selectedCuisine].flag}` })}</h4>
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
        <MealPlanModal isOpen={showMealPlanModal} onClose={() => setShowMealPlanModal(false)} targetCalories={result.targetCalories} mealPlan={result.mealPlan} fullMealPlan={result.fullMealPlan} selectedDay={selectedDay} onDayChange={setSelectedDay} weight={form.weight} onSave={() => setShowMealPlanModal(false)} cuisine={selectedCuisine} onCuisineChange={handleCuisineChange} />
      )}
      {result && (
        <WorkoutBlueprintModal isOpen={showWorkoutModal} onClose={() => setShowWorkoutModal(false)} bmi={+(form.weight / ((form.height / 100) ** 2)).toFixed(1)} goal={activeGoal} fitnessLevel="beginner" weight={form.weight} selectedDay={workoutSelectedDay} onDayChange={setWorkoutSelectedDay} onSave={() => setShowWorkoutModal(false)} />
      )}
    </div>
  );
};

export default WeightLossPage;