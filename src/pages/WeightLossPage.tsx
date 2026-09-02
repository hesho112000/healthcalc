import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UserProfile, CalorieResult, MealPlan, DailyMealPlan, HealthGoal } from '../types';
import { calculateFullResults } from '../utils/calculations';
import AdviceBox from '../features/health-tools/AdviceBox';
import { usePersistedState } from '../hooks/usePersistedState';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import SaveProgressButton from '../features/health-tools/SaveProgressButton';
import MealPlanModal from '../features/plan-builder/MealPlanModal';
import WorkoutBlueprintModal from '../features/plan-builder/WorkoutBlueprintModal';
import CuisineRegionCards from '../features/plan-builder/CuisineRegionCards';
import MealBuilder from '../features/plan-builder/MealBuilder';
import {
  PageHero, TwoColumnLayout, StatsBar, DaySelectorBar,
  PlanTabBar, MacroBreakdown, MealCard, EmptyPlanState,
  DayProgressHeader, StreakBar,
} from '../features/plan-builder/HealthPlanTemplate';

import { FOODS_DATABASE, CUISINE_META, Cuisine, CUISINE_OPTIONS, recommendExercises, EXERCISE_TYPE_LABELS, EXERCISE_TYPE_OPTIONS, ExerciseType } from '../utils/calculations_expanded';
import { getPortionMeasure } from '../utils/cuisineCatalog';
import { getCuisineLabel } from '../utils/healthPlans';

const GOAL_OPTIONS: Array<{ key: HealthGoal; en: string; ar: string; emoji: string }> = [
  { key: 'lose_weight', en: 'Lose Fat', ar: 'خسارة الدهون', emoji: '🔥' },
  { key: 'maintain', en: 'Maintain', ar: 'المحافظة', emoji: '⚖️' },
  { key: 'gain_muscle', en: 'Gain Muscle', ar: 'بناء العضلات', emoji: '💪' },
];

const GOAL_DELTA: Record<HealthGoal, number> = { lose_weight: -500, maintain: 0, gain_muscle: 300 };

const WeightLossPage: React.FC = () => {
  const { t, language } = useLanguage();
  const fmt = (tpl: string, vars: Record<string, string | number>) => tpl.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [activeTab, setActiveTab] = useState<'calories' | 'meals' | 'workout'>('calories');
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [customPlan, setCustomPlan] = useState<{ mealPlan: MealPlan[]; fullMealPlan: DailyMealPlan[] } | null>(null);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(() => (new Date().getDate() % 30));
  const [workoutSelectedDay, setWorkoutSelectedDay] = useState(0);
  const [workoutType, setWorkoutType] = useState<ExerciseType | 'auto'>('auto');
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [dayCompletions, setDayCompletions] = usePersistedState<Record<number, Record<number, boolean>>>({}, 'hc_wl_day_completions');
  const [streak, setStreak] = useState({ current: 0, longest: 0, daysCompleted: 0 });
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine>(() => {
    const saved = localStorage.getItem('hc_selectedCuisine');
    return (saved as Cuisine) || 'egyptian';
  });
  
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

  const [activeGoal, setActiveGoal] = useState<HealthGoal>(form.goal);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateFullResults(form, selectedCuisine, language);
    setResult(res);
    setActiveGoal(form.goal);
    setCompletedExercises({});
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleGoalChange = (goal: HealthGoal) => {
    setActiveGoal(goal);
    setForm((prev) => ({ ...prev, goal }));
    const res = calculateFullResults({ ...form, goal }, selectedCuisine, language);
    setResult(res);
    setCustomPlan(null);
  };

  const toggleExercise = useCallback((key: string) => {
    setCompletedExercises(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const displayResult = customPlan && result ? { ...result, mealPlan: customPlan.mealPlan, fullMealPlan: customPlan.fullMealPlan } : result;
  const dayMeals = displayResult?.fullMealPlan[selectedDay]?.meals || [];
  const dayDone = dayCompletions[selectedDay] || {};
  const dayDoneCount = Object.values(dayDone).filter(Boolean).length;
  const todayAllDone = dayDoneCount === (dayMeals.length + 1) && dayMeals.length > 0;

  const toggleMealDone = useCallback((mealIdx: number, done: boolean) => {
    setDayCompletions(prev => ({ ...prev, [selectedDay]: { ...prev[selectedDay], [mealIdx]: done } }));
  }, [selectedDay]);

  const handleCuisineChange = useCallback((cuisine: Cuisine) => {
    setSelectedCuisine(cuisine);
    localStorage.setItem('hc_selectedCuisine', cuisine);
  }, []);

  useEffect(() => {
    if (!result) return;
    setResult((prev) => {
      if (!prev) return prev;
      const next = calculateFullResults(form, selectedCuisine, language);
      return {
        ...next,
        bmr: prev.bmr,
        tdee: prev.tdee,
        targetCalories: prev.targetCalories,
        macros: prev.macros,
        workoutPlan: prev.workoutPlan,
      };
    });
  }, [selectedCuisine, language]);

  const filteredFoods = useMemo(() => {
    return FOODS_DATABASE.filter(f => f.cuisine.includes(selectedCuisine)).slice(0, 8);
  }, [selectedCuisine]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Breadcrumbs />
      <PageHero pill={t('wlHeroPill')} title={t('module1Title')} description={t('module1Desc')} />

      <TwoColumnLayout
        sidebar={
          <form onSubmit={handleCalculate} className="card sticky top-24 p-6">
            <h2 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary-50 rounded-xl flex items-center justify-center">👤</div>
              {t('yourProfile')}
            </h2>
            <div className="space-y-5">
              <div>
                <label className="label">{t('age')} ({t('wlAgeYears')})</label>
                <input type="number" min={14} max={100} value={form.age} onChange={(e) => setForm({ ...form, age: +e.target.value })} className="input-field-lg" />
              </div>
              <div>
                <label className="label">{t('gender')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {[{ value: 'male' as const, label: t('male'), icon: '👨' }, { value: 'female' as const, label: t('female'), icon: '👩' }].map((g) => (
                    <button key={g.value} type="button" onClick={() => setForm({ ...form, gender: g.value })}
                      className={`py-3.5 rounded-2xl text-sm font-semibold border-2 ${form.gender === g.value ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-500'}`}>
                      <span className="mr-1.5">{g.icon}</span> {g.label}
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
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">{t('wlWorkoutDaysPerWeek')}</label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="range"
                    min="0" max="7"
                    value={form.workoutDays ?? 3}
                    onChange={(e) => setForm({ ...form, workoutDays: +e.target.value })}
                    className="flex-1 accent-blue-600"
                  />
                  <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg min-w-[76px] text-center">
                    <span className="font-bold text-blue-700">{fmt(t('wlDays'), { n: form.workoutDays ?? 3 })}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0 - {t('wlSedentary')}</span>
                  <span>3-4 - {t('wlModerate')}</span>
                  <span>6-7 - {t('wlVeryActive')}</span>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full py-4 text-base font-bold">{t('calculate')}</button>
            </div>
          </form>
        }
      >
        {!result ? <EmptyPlanState /> : (
            <div className="space-y-6">
              <StatsBar stats={{ bmr: result.bmr, tdee: result.tdee, targetCalories: result.targetCalories }} />

              <div className="card p-5">
                <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                  🎯 {t('wlGoalSelector')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {GOAL_OPTIONS.map((g) => {
                    const kcal = result.tdee + GOAL_DELTA[g.key];
                    const selected = activeGoal === g.key;
                    return (
                      <button
                        key={g.key}
                        type="button"
                        onClick={() => handleGoalChange(g.key)}
                        className={`text-left rounded-2xl border-2 p-4 transition-all ${
                          selected ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg">{g.emoji}</span>
                          <input type="radio" readOnly checked={selected} className="pointer-events-none accent-primary-600" />
                        </div>
                        <div className="mt-1.5 font-bold text-gray-900">{language === 'ar' ? g.ar : g.en}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {GOAL_DELTA[g.key] > 0 && <>TDEE +{GOAL_DELTA[g.key]}</>}
                          {GOAL_DELTA[g.key] < 0 && <>TDEE {GOAL_DELTA[g.key]}</>}
                          {GOAL_DELTA[g.key] === 0 && <>TDEE</>} = <span className="font-bold text-gray-700">{kcal}</span> kcal
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <AdviceBox
                weight={form.weight}
                height={form.height}
                age={form.age}
                gender={form.gender}
                targetCalories={result.targetCalories}
                goal={activeGoal}
              />

              <PlanTabBar activeTab={activeTab === 'calories' ? 'meals' : activeTab as any} onChange={(tab) => setActiveTab(tab as any)} />
              <DaySelectorBar days={30} activeDay={selectedDay + 1} onSelect={(d) => setSelectedDay(d - 1)} />

              {activeTab === 'calories' && (
                <div className="space-y-6">
                  <MacroBreakdown proteinG={result.macros.proteinGrams} proteinPct={result.macros.protein} carbsG={result.macros.carbsGrams} carbsPct={result.macros.carbs} fatG={result.macros.fatGrams} fatPct={result.macros.fat} />
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">📊 {fmt(t('wlCaloriesSchedule'), { cuisine: `${CUISINE_META[selectedCuisine].flag} ${getCuisineLabel(CUISINE_OPTIONS.find(c => c.key === selectedCuisine) || CUISINE_OPTIONS[0], language)}` })}</h3>
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">{t('wlUsdaAccurate')}</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="text-left text-[11px] text-gray-400 uppercase border-b"><th className="pb-2">{t('foodLibColItem')}</th><th className="pb-2">{t('foodLibColPortion')}</th><th className="pb-2 text-center">{t('foodLibColCalories')}</th><th className="pb-2 text-center">{t('foodLibColProtein')}</th></tr></thead>
                        <tbody>
                          {filteredFoods.map((food, idx) => (
                            <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                              <td className="py-2.5 font-medium">
                                <div className="flex items-center gap-1.5">
                                  {food.name}
                                  {food.verified && <span className="px-1 py-0.5 rounded bg-emerald-600 text-[8px] font-bold text-white" title={t('wlUsdaAccurate')}>USDA ✓</span>}
                                </div>
                                <div className="text-xs text-gray-400">{food.name_en}</div>
                              </td>
                              <td className="py-2.5 text-gray-500">
                                <div>{getPortionMeasure(food.portion, language)}</div>
                                <span className="inline-block mt-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap">
                                  {food.portion.grams}g • {food.calories} kcal
                                </span>
                              </td>
                              <td className="py-2.5 text-center"><span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-bold">{food.calories}</span></td>
                              <td className="py-2.5 text-center font-bold">{food.protein}{t('wlProteinUnit')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'meals' && (
                <div className="space-y-5">
                  {/* Cuisine Selector */}
                  <div className="card p-5">
                    <h3 className="font-bold mb-3 flex items-center gap-2">🍽️ {t('chooseCuisine')}</h3>
                    <CuisineRegionCards selected={selectedCuisine} onChange={handleCuisineChange} />
                  </div>

                  <div className="card p-5">
                    <MealBuilder
                      cuisine={selectedCuisine}
                      sectionType="weight-loss"
                      condition={form.goal === 'lose_weight' ? 'overweight' : undefined}
                      targetCalories={result?.targetCalories ?? 2000}
                      onGenerate={(payload) => {
                        setCustomPlan({ mealPlan: payload.mealPlan, fullMealPlan: payload.fullMealPlan });
                        setShowMealPlanModal(true);
                      }}
                      onCuisineChange={handleCuisineChange}
                    />
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
                </div>
              )}

              {activeTab === 'workout' && (
                <div className="space-y-5">
                  <StreakBar currentStreak={streak.current} longestStreak={streak.longest} todayChecked={false} daysCompleted={streak.daysCompleted} totalDays={30} />

                  {/* Exercise Type Selector */}
                  <div className="card p-5">
                    <h3 className="font-bold mb-3 flex items-center gap-2">💪 {t('wlExerciseType')}</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setWorkoutType('auto')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                          workoutType === 'auto'
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
                          onClick={() => setWorkoutType(type)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                            workoutType === type
                              ? 'border-rose-500 bg-rose-50 text-rose-700'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {EXERCISE_TYPE_LABELS[type][language]}
                        </button>
                      ))}
                    </div>
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

                  <div className="text-center py-8 text-gray-400 text-sm">
                    {t('wlWorkoutHint')}
                  </div>
                </div>
              )}
              <MedicalDisclaimer />
            </div>
          )
        }
      </TwoColumnLayout>

      {displayResult && (
        <MealPlanModal isOpen={showMealPlanModal} onClose={() => setShowMealPlanModal(false)} targetCalories={displayResult.targetCalories} mealPlan={displayResult.mealPlan} fullMealPlan={displayResult.fullMealPlan} selectedDay={selectedDay} onDayChange={setSelectedDay} weight={form.weight} onSave={() => setShowMealPlanModal(false)} cuisine={selectedCuisine} onCuisineChange={handleCuisineChange} />
      )}
      {result && (
        <WorkoutBlueprintModal isOpen={showWorkoutModal} onClose={() => setShowWorkoutModal(false)} bmi={+(form.weight / ((form.height / 100) ** 2)).toFixed(1)} goal={form.goal} fitnessLevel="beginner" weight={form.weight} selectedDay={workoutSelectedDay} onDayChange={setWorkoutSelectedDay} onSave={() => setShowWorkoutModal(false)} />
      )}
    </div>
  );
};

export default WeightLossPage;
