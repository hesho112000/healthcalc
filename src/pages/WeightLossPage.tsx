import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UserProfile, CalorieResult } from '../types';
import { calculateFullResults } from '../utils/calculations';
import { smartMealSwap } from '../utils/healthPlans';
import { usePersistedState } from '../hooks/usePersistedState';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import Breadcrumbs from '../components/Breadcrumbs';
import SaveProgressButton from '../components/SaveProgressButton';
import MealPlanModal from '../components/MealPlanModal';
import {
  PageHero, TwoColumnLayout, StatsBar, DaySelectorBar,
  PlanTabBar, MacroBreakdown, MealCard, WorkoutCard, EmptyPlanState,
  DayProgressHeader, StreakBar,
} from '../components/HealthPlanTemplate';

const WeightLossPage: React.FC = () => {
  const { t } = useLanguage();
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [activeTab, setActiveTab] = useState<'calories' | 'meals' | 'workout'>('calories');
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(() => (new Date().getDate() % 30));
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [showExerciseInfo, setShowExerciseInfo] = useState<string | null>(null);
  const [dayCompletions, setDayCompletions] = usePersistedState<Record<number, Record<number, boolean>>>({}, 'hc_wl_day_completions');
  const [streak, setStreak] = useState({ current: 0, longest: 0, daysCompleted: 0 });
  const [swapTags, setSwapTags] = usePersistedState<Record<number, Record<number, string>>>({}, 'hc_wl_swap_tags');
  const [form, setForm] = useState<UserProfile>(() => {
    const bridge = localStorage.getItem('hc_calculator_bridge');
    if (bridge) {
      try {
        const data = JSON.parse(bridge);
        return {
          age: data.age ?? 30,
          gender: data.gender ?? 'male',
          height: data.height ?? 175,
          weight: data.weight ?? 75,
          activityLevel: data.activityLevel ?? 'moderate',
          goal: data.goal ?? 'lose_weight',
        };
      } catch { /* ignore */ }
    }
    return { age: 30, gender: 'male', height: 175, weight: 75, activityLevel: 'moderate', goal: 'lose_weight' };
  });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateFullResults(form);
    setResult(res);
    setCompletedExercises({});
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  useEffect(() => {
    const bridge = localStorage.getItem('hc_calculator_bridge');
    if (bridge) {
      try {
        const data = JSON.parse(bridge);
        if (data.savedAt) {
          const res = calculateFullResults(form);
          setResult(res);
          localStorage.removeItem('hc_calculator_bridge');
        }
      } catch { /* ignore */ }
    }
  }, []);

  const toggleExercise = useCallback((key: string) => {
    setCompletedExercises(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const dayMeals = result?.fullMealPlan[selectedDay]?.meals || [];
  const dayTotalTasks = dayMeals.length + 1;
  const dayDone = dayCompletions[selectedDay] || {};
  const dayDoneCount = Object.values(dayDone).filter(Boolean).length;
  const todayAllDone = dayDoneCount === dayTotalTasks && dayTotalTasks > 0;

  const toggleMealDone = useCallback((mealIdx: number, done: boolean) => {
    setDayCompletions(prev => ({ ...prev, [selectedDay]: { ...prev[selectedDay], [mealIdx]: done } }));
  }, [selectedDay]);

  const handleMealSwap = useCallback((mealIdx: number) => {
    const meal = dayMeals[mealIdx];
    if (!meal) return;
    const alt = smartMealSwap('weightloss', meal.meal, { calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fat: meal.fat });
    if (!alt) return;
    setSwapTags(prev => ({ ...prev, [selectedDay]: { ...prev[selectedDay], [mealIdx]: `Swapped → ${alt.label}` } }));
  }, [selectedDay, dayMeals]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Breadcrumbs />
      <PageHero pill="Mifflin-St Jeor · ACSM · USDA" title={t('module1Title')} description={t('module1Desc')} />

      <TwoColumnLayout
        sidebar={
          <form onSubmit={handleCalculate} className="card sticky top-24 p-6">
            <h2 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary-50 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              {t('yourProfile')}
            </h2>

            <div className="space-y-5">
              <div>
                <label className="label">{t('age')} (years)</label>
                <input type="number" min={14} max={100} value={form.age} onChange={(e) => setForm({ ...form, age: +e.target.value })} className="input-field-lg" />
              </div>

              <div>
                <label className="label">{t('gender')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'male' as const, label: t('male'), icon: '👨' },
                    { value: 'female' as const, label: t('female'), icon: '👩' },
                  ].map((g) => (
                    <button key={g.value} type="button" onClick={() => setForm({ ...form, gender: g.value })}
                      className={`py-3.5 rounded-2xl text-sm font-semibold border-2 transition-all duration-200 ${form.gender === g.value ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}>
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

              <div>
                <label className="label">{t('activityLevel')}</label>
                <select value={form.activityLevel} onChange={(e) => setForm({ ...form, activityLevel: e.target.value as any })} className="select-field">
                  <option value="sedentary">{t('sedentary')}</option>
                  <option value="light">{t('light')}</option>
                  <option value="moderate">{t('moderate')}</option>
                  <option value="active">{t('active')}</option>
                  <option value="very_active">{t('veryActive')}</option>
                </select>
              </div>

              <div>
                <label className="label">{t('goal')}</label>
                <div className="space-y-2">
                  {[
                    { value: 'lose_weight', label: t('loseWeight'), icon: '📉', color: 'primary' },
                    { value: 'maintain', label: t('maintain'), icon: '⚖️', color: 'sage' },
                    { value: 'gain_muscle', label: t('gainMuscle'), icon: '💪', color: 'amber' },
                  ].map((g) => (
                    <button key={g.value} type="button" onClick={() => setForm({ ...form, goal: g.value as any })}
                      className={`w-full py-3.5 rounded-2xl text-sm font-semibold border-2 text-left px-4 transition-all duration-200 flex items-center gap-3 ${form.goal === g.value ? `border-${g.color}-500 bg-${g.color}-50 text-${g.color}-700 shadow-sm` : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}>
                      <span className="text-lg">{g.icon}</span>{g.label}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-3.5 text-base">
                {t('calculate')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              </button>
            </div>
          </form>
        }
      >
        {!result ? (
          <EmptyPlanState />
        ) : (
          <div className="space-y-6 animate-fade-in">
            <StatsBar stats={{ bmr: result.bmr, tdee: result.tdee, targetCalories: result.targetCalories }} />

            <div className="flex justify-end">
              <SaveProgressButton module="weight-loss" inputs={form} results={result} />
            </div>

            <div className="toggle-group">
              {[
                { key: 'calories' as const, label: t('macros') },
                { key: 'meals' as const, label: t('mealPlan') },
                { key: 'workout' as const, label: t('workoutPlan') },
              ].map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={activeTab === tab.key ? 'toggle-btn-active' : 'toggle-btn-inactive'}>
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'calories' && (
              <MacroBreakdown
                proteinG={result.macros.proteinGrams} proteinPct={result.macros.protein}
                carbsG={result.macros.carbsGrams} carbsPct={result.macros.carbs}
                fatG={result.macros.fatGrams} fatPct={result.macros.fat}
              />
            )}

            {activeTab === 'meals' && (
              <div className="space-y-4 animate-fade-in">
                <StreakBar currentStreak={streak.current} longestStreak={streak.longest} todayChecked={todayAllDone} daysCompleted={streak.daysCompleted} totalDays={30} />
                <DaySelectorBar
                  days={30}
                  activeDay={selectedDay + 1}
                  onSelect={(d) => setSelectedDay(d - 1)}
                  checkedDays={Object.keys(dayCompletions).filter(k => {
                    const dk = Number(k);
                    const d = dayCompletions[dk];
                    return d && Object.keys(d).length > 0 && Object.values(d).filter(Boolean).length >= dayTotalTasks;
                  }).map(Number)}
                  label={t('mealPlan')}
                  subtitle={result.fullMealPlan[selectedDay]?.theme || 'Your personalized day'}
                  action={
                    <button onClick={() => setShowMealPlanModal(true)} className="btn-primary text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                      Full 30-Day Plan
                    </button>
                  }
                />
                <DayProgressHeader completed={dayDoneCount} total={dayTotalTasks} dailyGoal={result.fullMealPlan[selectedDay]?.theme} />
                {result.fullMealPlan[selectedDay] && (
                  <div className="space-y-4">
                    {result.fullMealPlan[selectedDay].meals.map((meal, i) => (
                      <MealCard
                        key={i}
                        meal={meal}
                        done={!!dayDone[i]}
                        onToggle={(done) => toggleMealDone(i, done)}
                        onSwap={() => handleMealSwap(i)}
                        swappedTag={swapTags[selectedDay]?.[i]}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'workout' && (
              <div className="space-y-5 animate-fade-in">
                <div className="card bg-gradient-to-r from-sage-50 to-primary-50 border-sage-100 p-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-soft shrink-0">
                        <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-sage-500 uppercase tracking-wider">Session Duration</p>
                        <p className="text-xl font-black text-gray-900">{result.workoutPlan.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { const c = document.getElementById('workout-printable'); if (!c) return; const w = window.open('', '_blank'); if (!w) return; w.document.write(`<html><head><title>HealthCalc.ai - Workout Plan</title><style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:40px;color:#1f2937;}h1{font-size:22px;margin-bottom:4px;}.sub{color:#6b7280;font-size:13px;margin-bottom:20px;}.day{border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin-bottom:16px;page-break-inside:avoid;}.day h3{font-size:16px;font-weight:700;margin-bottom:8px;}table{width:100%;font-size:13px;border-collapse:collapse;}th{text-align:left;padding:6px 8px;border-bottom:2px solid #e5e7eb;font-size:11px;color:#6b7280;text-transform:uppercase;}td{padding:6px 8px;border-bottom:1px solid #f3f4f6;}</style></head><body><h1>Your Workout Routine</h1><p class="sub">HealthCalc.ai — Duration: ${result.workoutPlan.duration}</p>${result.workoutPlan.days.map(d => `<div class="day"><h3>${d.day} — ${d.focus}</h3><table><thead><tr><th>Exercise</th><th>Sets</th><th>Reps</th><th>Rest</th></tr></thead><tbody>${d.exercises.map(e => `<tr><td>${e.name}</td><td>${e.sets}</td><td>${e.reps}</td><td>${e.rest}</td></tr>`).join('')}</tbody></table></div>`).join('')}</body></html>`); w.document.close(); setTimeout(() => w.print(), 300); }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white text-sage-700 hover:bg-sage-50 border border-sage-200 shadow-soft transition-all duration-200">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" /></svg>
                        Print Routine
                      </button>
                      <button onClick={() => { const s = encodeURIComponent('My HealthCalc.ai Workout Plan'); const b = encodeURIComponent(`Check out my workout plan!\n\nDuration: ${result.workoutPlan.duration}\n\n` + result.workoutPlan.days.map(d => `${d.day} — ${d.focus}\n${d.exercises.map(e => `  • ${e.name}: ${e.sets}×${e.reps} (${e.rest} rest)`).join('\n')}`).join('\n\n')); window.open(`mailto:?subject=${s}&body=${b}`); }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white text-primary-700 hover:bg-primary-50 border border-primary-200 shadow-soft transition-all duration-200">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                        Email Routine
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-5" id="workout-printable">
                  {result.workoutPlan.days.map((day, i) => {
                    const isRestDay = day.exercises.length === 1 && (day.exercises[0].name.includes('optional') || day.exercises[0].name.includes('rest') || day.exercises[0].name.includes('Rest'));
                    const focusLower = day.focus.toLowerCase();
                    const muscleIcon = focusLower.includes('upper') || focusLower.includes('chest') ? '💪' :
                      focusLower.includes('back') || focusLower.includes('bicep') ? '🔙' :
                      focusLower.includes('lower') || focusLower.includes('leg') ? '🦵' :
                      focusLower.includes('shoulder') || focusLower.includes('abs') ? '🏋️' :
                      focusLower.includes('cardio') || focusLower.includes('hiit') ? '❤️' :
                      focusLower.includes('flex') || focusLower.includes('core') || focusLower.includes('yoga') ? '🧘' :
                      focusLower.includes('recovery') || focusLower.includes('rest') ? '🌿' :
                      focusLower.includes('full') ? '⚡' : '🏃';
                    const intensity = isRestDay ? 'Rest' :
                      focusLower.includes('hiit') || focusLower.includes('full body') ? 'High' :
                      focusLower.includes('cardio') ? 'Medium-High' :
                      focusLower.includes('recovery') || focusLower.includes('flex') || focusLower.includes('yoga') ? 'Low' : 'Medium';
                    const intensityColor = isRestDay ? 'bg-gray-100 text-gray-500' :
                      intensity === 'High' ? 'bg-red-50 text-red-600' :
                      intensity === 'Medium-High' ? 'bg-orange-50 text-orange-600' :
                      intensity === 'Low' ? 'bg-sage-50 text-sage-600' : 'bg-primary-50 text-primary-600';
                    const estimatedCalories = isRestDay ? '50-80' :
                      focusLower.includes('hiit') ? '350-450' :
                      focusLower.includes('cardio') ? '300-400' :
                      focusLower.includes('upper') || focusLower.includes('chest') || focusLower.includes('back') ? '250-350' :
                      focusLower.includes('lower') || focusLower.includes('leg') ? '300-400' :
                      focusLower.includes('shoulder') ? '200-300' :
                      focusLower.includes('recovery') || focusLower.includes('flex') ? '100-150' : '250-350';
                    const dayCardBg = isRestDay ? 'from-gray-50 to-white border-gray-100' :
                      i % 2 === 0 ? 'from-primary-50/50 to-white border-primary-100/60' : 'from-sage-50/50 to-white border-sage-100/60';
                    const totalSets = day.exercises.reduce((sum, e) => sum + (isRestDay ? 0 : e.sets), 0);
                    return (
                      <div key={i} className={`bg-gradient-to-br ${dayCardBg} border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-card-hover print:shadow-none animate-fade-in stagger-${Math.min(i + 1, 5)}`}>
                        <div className="px-5 py-4 border-b border-gray-100/80">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{muscleIcon}</span>
                              <div>
                                <h4 className="font-bold text-gray-900 text-base">{day.day}</h4>
                                <p className="text-xs text-gray-400">{day.focus}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-xl ${intensityColor}`}>{intensity}</span>
                              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-xl bg-amber-50 text-amber-600">🔥 {estimatedCalories} kcal</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-3 text-[10px] text-gray-400 font-medium">
                            <span>{day.exercises.length} exercises</span>
                            {!isRestDay && <span>{totalSets} total sets</span>}
                            <span>{result.workoutPlan.duration}</span>
                          </div>
                        </div>
                        {day.exercises.length > 0 && day.exercises[0].name !== '-' ? (
                          <div className="p-5">
                            <div className="hidden sm:block">
                              <table className="w-full text-sm">
                                <thead><tr className="text-left text-[10px] text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                  <th className="pb-2.5 font-semibold w-8"></th>
                                  <th className="pb-2.5 font-semibold">Exercise</th>
                                  <th className="pb-2.5 font-semibold text-center">Sets</th>
                                  <th className="pb-2.5 font-semibold text-center">Reps</th>
                                  <th className="pb-2.5 font-semibold text-center">Rest</th>
                                  <th className="pb-2.5 font-semibold text-center w-16">Info</th>
                                </tr></thead>
                                <tbody>
                                  {day.exercises.map((ex, j) => {
                                    const exKey = `${i}-${j}`;
                                    const isDone = completedExercises[exKey];
                                    return (
                                      <tr key={j} className={`border-b border-gray-50 last:border-0 transition-colors ${isDone ? 'bg-sage-50/50' : 'hover:bg-gray-50/50'}`}>
                                        <td className="py-3"><button onClick={() => toggleExercise(exKey)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${isDone ? 'bg-sage-500 border-sage-500 text-white' : 'border-gray-200 hover:border-sage-300 text-transparent'}`}><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></button></td>
                                        <td className="py-3"><span className={`font-semibold ${isDone ? 'text-sage-600 line-through' : 'text-gray-900'}`}>{ex.name}</span></td>
                                        <td className="py-3 text-center"><span className="inline-flex items-center justify-center w-8 h-6 bg-primary-50 text-primary-700 text-xs font-bold rounded-lg">{ex.sets}</span></td>
                                        <td className="py-3 text-center"><span className="text-gray-700 font-medium">{ex.reps}</span></td>
                                        <td className="py-3 text-center"><span className="inline-flex items-center gap-1 text-gray-400 text-xs"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{ex.rest}</span></td>
                                        <td className="py-3 text-center"><button onClick={() => setShowExerciseInfo(showExerciseInfo === exKey ? null : exKey)} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-primary-50 text-gray-400 hover:text-primary-600 flex items-center justify-center transition-all duration-200"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg></button></td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                            <div className="sm:hidden space-y-2">
                              {day.exercises.map((ex, j) => {
                                const exKey = `${i}-${j}`;
                                const isDone = completedExercises[exKey];
                                return (
                                  <div key={j} className={`rounded-xl p-3.5 border transition-all duration-200 ${isDone ? 'bg-sage-50 border-sage-200' : 'bg-white border-gray-100'}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                      <button onClick={() => toggleExercise(exKey)} className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${isDone ? 'bg-sage-500 border-sage-500 text-white' : 'border-gray-200 hover:border-sage-300 text-transparent'}`}><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></button>
                                      <span className={`font-semibold text-sm flex-1 ${isDone ? 'text-sage-600 line-through' : 'text-gray-900'}`}>{ex.name}</span>
                                    </div>
                                    <div className="flex gap-2 text-xs ml-10">
                                      <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-lg font-semibold">{ex.sets} sets</span>
                                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium">{ex.reps}</span>
                                      <span className="bg-gray-50 text-gray-400 px-2 py-1 rounded-lg flex items-center gap-1">
                                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{ex.rest}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="p-5 text-center"><p className="text-sm text-gray-400 italic">{day.exercises[0]?.name || 'Rest day'}</p></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <MedicalDisclaimer />
          </div>
        )}
      </TwoColumnLayout>

      {result && (
        <MealPlanModal
          isOpen={showMealPlanModal}
          onClose={() => setShowMealPlanModal(false)}
          targetCalories={result.targetCalories}
          mealPlan={result.mealPlan}
          fullMealPlan={result.fullMealPlan}
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
          weight={form.weight}
          onSave={() => setShowMealPlanModal(false)}
        />
      )}
    </div>
  );
};

export default WeightLossPage;
