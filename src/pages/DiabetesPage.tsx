import React, { useState, useMemo, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DiabetesInputs, LabResult, BPResult } from '../types';
import { interpretLabResults, classifyBloodPressure } from '../utils/calculations';
import { generateDiabetesPlan, type DayPlan } from '../utils/healthPlans';
import { toDayPlans } from '../utils/mealBuilder';
import { usePersistedState } from '../hooks/usePersistedState';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import SaveProgressButton from '../features/health-tools/SaveProgressButton';
import { DaySelectorBar, PlanTabBar, MealCard, WorkoutCard, DayProgressHeader, StreakBar } from '../features/plan-builder/HealthPlanTemplate';
import { type Cuisine } from '../utils/calculations_expanded';
import MealPlanModal from '../features/plan-builder/MealPlanModal';
import CuisineRegionCards from '../features/plan-builder/CuisineRegionCards';
import MealBuilder from '../features/plan-builder/MealBuilder';
import WorkoutBlueprintModal from '../features/plan-builder/WorkoutBlueprintModal';

const DiabetesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState<'labs' | 'bp' | 'meal' | 'workout'>('labs');
  const [selectedDay, setSelectedDay] = useState(0);
  const [activeTab, setActiveTab] = useState<'macros' | 'meals' | 'workout'>('meals');
  const [labResults, setLabResults] = useState<LabResult[] | null>(null);
  const [bpResult, setBpResult] = useState<BPResult | null>(null);
  const [form, setForm] = useState<DiabetesInputs>({
    fastingGlucose: 90,
    postPrandialGlucose: 120,
    hba1c: 5.4,
    systolicBP: 120,
    diastolicBP: 80,
    age: 45,
    weight: 75,
  });
  const [dayCompletions, setDayCompletions] = usePersistedState<Record<number, Record<number, boolean>>>({}, 'hc_diabetes_day_completions');
  const [streak, setStreak] = useState({ current: 0, longest: 0, daysCompleted: 0 });
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine>(() => {
    const saved = localStorage.getItem('hc_selectedCuisine');
    return (saved as Cuisine) || 'egyptian';
  });
  const [showFullPlan, setShowFullPlan] = useState(false);
  const [customDayPlan, setCustomDayPlan] = useState<DayPlan[] | null>(null);
  const [workoutCompletions, setWorkoutCompletions] = usePersistedState<Record<number, Record<number, boolean>>>({}, 'hc_diabetes_workout_completions');
  const [showDiabetesWorkoutModal, setShowDiabetesWorkoutModal] = useState(false);
  const [diabetesWorkoutSelectedDay, setDiabetesWorkoutSelectedDay] = useState(0);

  const handleAnalyzeLabs = (e: React.FormEvent) => {
    e.preventDefault();
    setLabResults(interpretLabResults(form));
  };

  const handleAnalyzeBP = (e: React.FormEvent) => {
    e.preventDefault();
    setBpResult(classifyBloodPressure(form.systolicBP, form.diastolicBP));
  };

  const thirtyDayPlan = useMemo(() =>
    generateDiabetesPlan({ age: form.age, weight: form.weight, height: 170 }, { hba1c: form.hba1c, fastingGlucose: form.fastingGlucose }, selectedCuisine),
    [form.age, form.weight, form.hba1c, form.fastingGlucose, selectedCuisine]
  );

  const currentDay: DayPlan = (customDayPlan ?? thirtyDayPlan)[selectedDay];

  const toggleMealDone = useCallback((dayIdx: number, mealIdx: number, done: boolean) => {
    setDayCompletions(prev => ({ ...prev, [dayIdx]: { ...prev[dayIdx], [mealIdx]: done } }));
  }, []);

  const toggleWorkoutDone = useCallback((dayIdx: number, workoutIdx: number, done: boolean) => {
    setWorkoutCompletions(prev => ({ ...prev, [dayIdx]: { ...prev[dayIdx], [workoutIdx]: done } }));
  }, []);

  const handleCuisineChange = useCallback((cuisine: Cuisine) => {
    setSelectedCuisine(cuisine);
    localStorage.setItem('hc_selectedCuisine', cuisine);
  }, []);

  const sections = [
    { key: 'labs' as const, label: 'Lab Interpreter', icon: '🔬' },
    { key: 'bp' as const, label: 'BP Calculator', icon: '❤️' },
    { key: 'meal' as const, label: t('mealPlan'), icon: '🥗' },
    { key: 'workout' as const, label: t('workoutPlan'), icon: '🏃' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Breadcrumbs />
      <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-rose-200 rounded-full" />
              <span className="text-xs font-medium text-rose-100">ADA · AHA · DASH</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3 tracking-tight">{t('module2Title')}</h1>
            <p className="text-rose-100 text-sm md:text-base leading-relaxed">{t('module2Desc')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeSection === s.key
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {activeSection === 'labs' && (
              <form onSubmit={handleAnalyzeLabs} className="card sticky top-24 p-6">
                <h2 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-rose-50 rounded-xl flex items-center justify-center">
                    <span className="text-sm">🔬</span>
                  </div>
                  Lab Values
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="label">{t('fastingGlucose')} (mg/dL)</label>
                    <input type="number" min={40} max={500} value={form.fastingGlucose}
                      onChange={(e) => setForm({ ...form, fastingGlucose: +e.target.value })}
                      className="input-field-lg" />
                    <p className="text-[11px] text-gray-400 mt-1.5">Normal: 70–99 mg/dL (ADA)</p>
                  </div>
                  <div>
                    <label className="label">{t('postPrandialGlucose')} (mg/dL)</label>
                    <input type="number" min={40} max={500} value={form.postPrandialGlucose}
                      onChange={(e) => setForm({ ...form, postPrandialGlucose: +e.target.value })}
                      className="input-field-lg" />
                    <p className="text-[11px] text-gray-400 mt-1.5">Normal: &lt; 140 mg/dL</p>
                  </div>
                  <div>
                    <label className="label">{t('hba1c')} (%)</label>
                    <input type="number" min={3} max={20} step={0.1} value={form.hba1c}
                      onChange={(e) => setForm({ ...form, hba1c: +e.target.value })}
                      className="input-field-lg" />
                    <p className="text-[11px] text-gray-400 mt-1.5">Normal: &lt; 5.7% (ADA)</p>
                  </div>
                  <div>
                    <label className="label">{t('systolicBP')} (mmHg)</label>
                    <input type="number" min={60} max={250} value={form.systolicBP}
                      onChange={(e) => setForm({ ...form, systolicBP: +e.target.value })}
                      className="input-field-lg" />
                  </div>
                  <div>
                    <label className="label">{t('diastolicBP')} (mmHg)</label>
                    <input type="number" min={30} max={150} value={form.diastolicBP}
                      onChange={(e) => setForm({ ...form, diastolicBP: +e.target.value })}
                      className="input-field-lg" />
                  </div>
                  <button type="submit" className="btn-primary w-full py-3.5 text-base bg-rose-600 hover:bg-rose-700">
                    {t('analyzeLabs')}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </button>
                </div>
              </form>
            )}

            {activeSection === 'bp' && (
              <form onSubmit={handleAnalyzeBP} className="card sticky top-24 p-6">
                <h2 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-rose-50 rounded-xl flex items-center justify-center">
                    <span className="text-sm">❤️</span>
                  </div>
                  Blood Pressure
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="label">{t('systolicBP')} (mmHg)</label>
                    <input type="number" min={60} max={250} value={form.systolicBP}
                      onChange={(e) => setForm({ ...form, systolicBP: +e.target.value })}
                      className="input-field-lg" />
                  </div>
                  <div>
                    <label className="label">{t('diastolicBP')} (mmHg)</label>
                    <input type="number" min={30} max={150} value={form.diastolicBP}
                      onChange={(e) => setForm({ ...form, diastolicBP: +e.target.value })}
                      className="input-field-lg" />
                  </div>
                  <div>
                    <label className="label">{t('age')}</label>
                    <input type="number" min={14} max={100} value={form.age}
                      onChange={(e) => setForm({ ...form, age: +e.target.value })}
                      className="input-field-lg" />
                  </div>
                  <button type="submit" className="btn-primary w-full py-3.5 text-base bg-rose-600 hover:bg-rose-700">
                    Classify BP
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
                    </svg>
                  </button>
                </div>
              </form>
            )}

            {activeSection === 'meal' && (
              <div className="card sticky top-24 p-6">
                <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-sage-50 rounded-xl flex items-center justify-center">
                    <span className="text-sm">🥗</span>
                  </div>
                  DASH Diet Guidelines
                </h2>
                <div className="space-y-3">
                  {[
                    { title: 'Sodium Limit', desc: '< 2,300mg/day (ideally < 1,500mg)', bg: 'bg-primary-50', text: 'text-primary-700' },
                    { title: 'Daily Targets', desc: '4-5 servings fruits, 4-5 vegetables, 6-8 grains', bg: 'bg-sage-50', text: 'text-sage-700' },
                    { title: 'Protein', desc: 'Lean meats, fish, poultry. 2 or fewer servings/day', bg: 'bg-amber-50', text: 'text-amber-700' },
                    { title: 'Limit', desc: 'Sweets ≤ 5 servings/week, Sodium ≤ 2,300mg', bg: 'bg-purple-50', text: 'text-purple-700' },
                  ].map((item, i) => (
                    <div key={i} className={`p-3.5 ${item.bg} rounded-2xl`}>
                      <p className={`font-semibold ${item.text} mb-0.5 text-sm`}>{item.title}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'workout' && (
              <div className="card sticky top-24 p-6">
                <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-primary-50 rounded-xl flex items-center justify-center">
                    <span className="text-sm">🏃</span>
                  </div>
                  Exercise Guidelines (ACSM)
                </h2>
                <div className="space-y-3">
                  {[
                    { title: 'Aerobic', desc: '150 min/week moderate OR 75 min/week vigorous', bg: 'bg-primary-50', text: 'text-primary-700' },
                    { title: 'Resistance', desc: '2-3 sessions/week, all major muscle groups', bg: 'bg-sage-50', text: 'text-sage-700' },
                    { title: 'Flexibility', desc: '2-3 days/week, hold stretches 15-60 seconds', bg: 'bg-amber-50', text: 'text-amber-700' },
                    { title: 'Precautions', desc: 'Check blood sugar before/after exercise. Carry fast-acting glucose.', bg: 'bg-rose-50', text: 'text-rose-700' },
                  ].map((item, i) => (
                    <div key={i} className={`p-3.5 ${item.bg} rounded-2xl`}>
                      <p className={`font-semibold ${item.text} mb-0.5 text-sm`}>{item.title}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            {activeSection === 'labs' && labResults && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">{t('labResults')}</h3>
                  <SaveProgressButton module="diabetes" inputs={form} results={{ labResults }} />
                </div>
                {labResults.map((result, i) => (
                  <div key={i} className="card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">{result.parameter}</h4>
                        <p className="text-xs text-gray-400">Normal range: {result.normalRange}</p>
                      </div>
                      <span className={`badge ${
                        result.status === 'normal' ? 'bg-sage-50 text-sage-700' :
                        result.status === 'warning' ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {result.status === 'normal' ? '✓ Normal' :
                         result.status === 'warning' ? '⚠ Elevated' : '⚠ Critical'}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-3xl font-black text-gray-900">{result.value}</span>
                      <span className="text-sm text-gray-400">{result.unit}</span>
                    </div>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl leading-relaxed">{result.interpretation}</p>
                  </div>
                ))}
                <MedicalDisclaimer />
              </div>
            )}

            {activeSection === 'labs' && !labResults && (
              <div className="card text-center py-20">
                <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🔬</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t('dbLabInterpreter')}</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
                  {t('dbLabsEmpty')}
                </p>
              </div>
            )}

            {activeSection === 'bp' && bpResult && (
              <div className="space-y-4 animate-fade-in">
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">{t('dbBpClassification')}</h3>
                    <SaveProgressButton module="diabetes" inputs={{ systolicBP: form.systolicBP, diastolicBP: form.diastolicBP }} results={{ bpResult }} />
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-black text-gray-900">{form.systolicBP}/{form.diastolicBP}</span>
                    <span className="text-sm text-gray-400">mmHg</span>
                  </div>
                  <div className={`text-lg font-bold ${bpResult.color} mb-5`}>{bpResult.category}</div>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3.5 bg-gray-50 rounded-2xl">
                      <p className="text-xs text-gray-400 mb-0.5">{t('dbSystolicRange')}</p>
                      <p className="font-semibold text-sm">{bpResult.systolicRange} mmHg</p>
                    </div>
                    <div className="p-3.5 bg-gray-50 rounded-2xl">
                      <p className="text-xs text-gray-400 mb-0.5">{t('dbDiastolicRange')}</p>
                      <p className="font-semibold text-sm">{bpResult.diastolicRange} mmHg</p>
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3">{t('dbRecommendations')}</h4>
                  <ul className="space-y-2.5">
                    {bpResult.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-1.5 shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                <MedicalDisclaimer />
              </div>
            )}

            {activeSection === 'bp' && !bpResult && (
              <div className="card text-center py-20">
                <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">❤️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t('dbBpClassifier')}</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
                  {t('dbBpEmpty')}
                </p>
              </div>
            )}

            {activeSection === 'meal' && (
              <div className="space-y-4 animate-fade-in">
                <StreakBar currentStreak={streak.current} longestStreak={streak.longest} todayChecked={false} daysCompleted={streak.daysCompleted} totalDays={30} />
                <DaySelectorBar
                  days={30}
                  activeDay={selectedDay + 1}
                  onSelect={(d) => setSelectedDay(d - 1)}
                  label={t('db30DayMealPlan')}
                  subtitle={currentDay?.phase || t('dbFoundation')}
                />
                <PlanTabBar activeTab={activeTab} onChange={setActiveTab} />
                {activeTab === 'meals' && currentDay && (
                  <div className="space-y-4">
                    <DayProgressHeader
                      completed={Object.values(dayCompletions[selectedDay] || {}).filter(Boolean).length}
                      total={currentDay.meals.length}
                      dailyGoal={currentDay.dailyGoal}
                    />
                    <div className="card bg-gradient-to-r from-sage-50 to-primary-50 border-sage-100 p-5">
                      <h3 className="font-bold text-gray-900 mb-1">{currentDay.label} — Diabetes Management</h3>
                      <p className="text-sm text-gray-500">{currentDay.phase} · {currentDay.dailyGoal}</p>
                    </div>
                    {/* Cuisine Selector */}
                    <div className="card p-4">
                      <label className="text-xs font-bold text-gray-500 mb-2 block">🍽️ {t('chooseCuisine')}</label>
                      <CuisineRegionCards selected={selectedCuisine} onChange={handleCuisineChange} />
                    </div>
                    <div className="card p-5">
                      <MealBuilder
                        cuisine={selectedCuisine}
                        sectionType="diabetes"
                        condition="diabetes"
                        filters={{ lowSugar: true, wholeGrainOnly: true }}
                        onGenerate={(payload) => {
                          setCustomDayPlan(toDayPlans(payload.fullMealPlan, thirtyDayPlan));
                          setShowFullPlan(true);
                        }}
                        onCuisineChange={handleCuisineChange}
                      />
                    </div>
                    <button
                      onClick={() => setShowFullPlan(true)}
                      className="w-full btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                      </svg>
                      Full 30-Day Plan
                    </button>
                    {currentDay.meals.map((meal, i) => (
                      <MealCard
                        key={i}
                        meal={meal}
                        done={!!dayCompletions[selectedDay]?.[i]}
                        onToggle={(done) => toggleMealDone(selectedDay, i, done)}
                      />
                    ))}
                  </div>
                )}
                {activeTab === 'workout' && currentDay && (
                  <div className="space-y-4">
                    <DayProgressHeader
                      completed={Object.values(workoutCompletions[selectedDay] || {}).filter(Boolean).length}
                      total={currentDay.workouts.length}
                      dailyGoal="Complete all exercises"
                    />
                    <div className="card bg-gradient-to-r from-primary-50 to-sage-50 border-primary-100 p-5">
                      <h3 className="font-bold text-gray-900 mb-1">{currentDay.label} — Exercise Protocol</h3>
                      <p className="text-sm text-gray-500">ACSM guidelines · Monitor blood glucose before/after exercise</p>
                    </div>
                    <button
                      onClick={() => setShowDiabetesWorkoutModal(true)}
                      className="w-full py-3 text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white rounded-2xl transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                      </svg>
                      Full 30-Day Workout Plan
                    </button>
                    {currentDay.workouts.map((w, i) => (
                      <WorkoutCard
                        key={i}
                        workout={w}
                        index={i}
                        done={!!workoutCompletions[selectedDay]?.[i]}
                        onToggle={(done) => toggleWorkoutDone(selectedDay, i, done)}
                      />
                    ))}
                  </div>
                )}
                <MedicalDisclaimer />
                <MealPlanModal isOpen={showFullPlan} onClose={() => setShowFullPlan(false)} targetCalories={0} mealPlan={[]} fullMealPlan={customDayPlan ?? thirtyDayPlan} selectedDay={selectedDay} onDayChange={setSelectedDay} weight={0} onSave={() => setShowFullPlan(false)} cuisine={selectedCuisine} onCuisineChange={handleCuisineChange} />
              </div>
            )}

            {activeSection === 'workout' && (
              <div className="space-y-4 animate-fade-in">
                <StreakBar currentStreak={streak.current} longestStreak={streak.longest} todayChecked={false} daysCompleted={streak.daysCompleted} totalDays={30} />
                <DaySelectorBar
                  days={30}
                  activeDay={selectedDay + 1}
                  onSelect={(d) => setSelectedDay(d - 1)}
                  label="30-Day Diabetes Workout Plan"
                  subtitle={currentDay?.phase || 'Foundation'}
                />
                <PlanTabBar activeTab={activeTab} onChange={setActiveTab} />
                {activeTab === 'meals' && currentDay && (
                  <div className="space-y-4">
                    <DayProgressHeader
                      completed={Object.values(dayCompletions[selectedDay] || {}).filter(Boolean).length}
                      total={currentDay.meals.length}
                      dailyGoal={currentDay.dailyGoal}
                    />
                    <div className="card bg-gradient-to-r from-sage-50 to-primary-50 border-sage-100 p-5">
                      <h3 className="font-bold text-gray-900 mb-1">{currentDay.label} — Nutrition</h3>
                      <p className="text-sm text-gray-500">{currentDay.phase} · {currentDay.dailyGoal}</p>
                    </div>
                    <div className="card p-4">
                      <label className="text-xs font-bold text-gray-500 mb-2 block">🍽️ {t('chooseCuisine')}</label>
                      <CuisineRegionCards selected={selectedCuisine} onChange={handleCuisineChange} />
                    </div>
                    {currentDay.meals.map((meal, i) => (
                      <MealCard
                        key={i}
                        meal={meal}
                        done={!!dayCompletions[selectedDay]?.[i]}
                        onToggle={(done) => toggleMealDone(selectedDay, i, done)}
                      />
                    ))}
                  </div>
                )}
                {activeTab === 'workout' && currentDay && (
                  <div className="space-y-4">
                    <DayProgressHeader
                      completed={Object.values(workoutCompletions[selectedDay] || {}).filter(Boolean).length}
                      total={currentDay.workouts.length}
                      dailyGoal="Complete all exercises"
                    />
                    <div className="card bg-gradient-to-r from-primary-50 to-sage-50 border-primary-100 p-5">
                      <h3 className="font-bold text-gray-900 mb-1">{currentDay.label} — Exercise Protocol</h3>
                      <p className="text-sm text-gray-500">ACSM guidelines · Monitor blood glucose before/after exercise</p>
                    </div>
                    <button
                      onClick={() => setShowDiabetesWorkoutModal(true)}
                      className="w-full py-3 text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white rounded-2xl transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                      </svg>
                      Full 30-Day Workout Plan
                    </button>
                    {currentDay.workouts.map((w, i) => (
                      <WorkoutCard
                        key={i}
                        workout={w}
                        index={i}
                        done={!!workoutCompletions[selectedDay]?.[i]}
                        onToggle={(done) => toggleWorkoutDone(selectedDay, i, done)}
                      />
                    ))}
                  </div>
                )}
                <MedicalDisclaimer />
              </div>
            )}
          </div>
        </div>
      </div>
      <WorkoutBlueprintModal isOpen={showDiabetesWorkoutModal} onClose={() => setShowDiabetesWorkoutModal(false)} bmi={25} goal="lose_weight" fitnessLevel="beginner" weight={75} selectedDay={diabetesWorkoutSelectedDay} onDayChange={setDiabetesWorkoutSelectedDay} onSave={() => setShowDiabetesWorkoutModal(false)} />
    </div>
  );
};

export default DiabetesPage;
