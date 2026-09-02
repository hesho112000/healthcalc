import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Exercise, ExerciseType, EXERCISES_DATABASE, EXERCISE_TYPE_LABELS,
  EXERCISE_TYPE_OPTIONS, getExercisesByType, recommendExercises,
} from '../../utils/calculations_expanded';

interface WorkoutDay {
  day: number;
  label: string;
  exercises: Exercise[];
  calorieBurnTarget: number;
  workoutGoal: string;
}

interface WorkoutBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  bmi?: number;
  goal?: string;
  fitnessLevel?: string;
  workoutPlan?: WorkoutDay[];
  selectedDay?: number;
  onDayChange?: (day: number) => void;
  weight: number;
  onSave: () => void;
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-sage-100 text-sage-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-rose-100 text-rose-700',
};

const typeColors: Record<ExerciseType, string> = {
  strength: 'bg-blue-50 text-blue-700 border-blue-200',
  cardio: 'bg-rose-50 text-rose-700 border-rose-200',
  hiit: 'bg-orange-50 text-orange-700 border-orange-200',
  flexibility: 'bg-purple-50 text-purple-700 border-purple-200',
  balance: 'bg-teal-50 text-teal-700 border-teal-200',
  functional: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  mindbody: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const WorkoutBlueprintModal: React.FC<WorkoutBlueprintModalProps> = ({
  isOpen, onClose, bmi = 25, goal = 'lose_weight', fitnessLevel = 'beginner',
  workoutPlan: propPlan, selectedDay: externalDay, onDayChange, weight, onSave,
}) => {
  const { t, language } = useLanguage();

  const fmt = (template: string, vars: Record<string, string | number>): string =>
    template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
  const [internalDay, setInternalDay] = useState(externalDay ?? 0);
  const activeDay = externalDay ?? internalDay;
  const setDay = onDayChange ?? setInternalDay;

  const [selectedType, setSelectedType] = useState<ExerciseType | 'auto'>('auto');
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [showProgressTracker, setShowProgressTracker] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const generateDefaultPlan = useCallback((): WorkoutDay[] => {
    return Array.from({ length: 30 }, (_, i) => {
      const exercises = selectedType === 'auto'
        ? recommendExercises(bmi, goal, fitnessLevel)
        : getExercisesByType(selectedType);
      const calorieBurnTarget = exercises.reduce((sum, e) => sum + e.calories, 0);
      return {
        day: i + 1,
        label: `Day ${i + 1}`,
        exercises: exercises.slice(0, 4),
        calorieBurnTarget,
        workoutGoal: selectedType === 'auto' ? 'Full Body Workout' : `${EXERCISE_TYPE_LABELS[selectedType].en} Session`,
      };
    });
  }, [selectedType, bmi, goal, fitnessLevel]);

  const plan = useMemo(() => propPlan ?? generateDefaultPlan(), [propPlan, generateDefaultPlan]);

  const currentDay = plan[activeDay] || plan[0];

  useEffect(() => {
    setCompleted(new Array(currentDay?.exercises.length || 0).fill(false));
  }, [activeDay, currentDay?.exercises.length]);

  const completedCount = completed.filter(Boolean).length;
  const completionPct = currentDay?.exercises.length ? Math.round((completedCount / currentDay.exercises.length) * 100) : 0;

  const toggleComplete = useCallback((index: number) => {
    setCompleted(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose} style={{ overflowY: 'auto' }}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-4 flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-orange-500 text-white px-6 py-5 shrink-0 print:bg-rose-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-lg font-bold shrink-0">
                💪
              </div>
              <div>
                <h2 className="text-lg font-extrabold tracking-tight">
                  {t('wbTitle')}
                </h2>
                <p className="text-rose-200 text-xs">
                  {t('wbSubtitle')}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 print:hidden"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Day Navigation Bar */}
        <div className="bg-white border-b border-gray-100 px-6 py-3 shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDay(Math.max(0, activeDay - 1))}
              disabled={activeDay === 0}
              className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-gray-100 flex items-center justify-center transition-all shrink-0"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-gray-900">
                  {t('wbDay')} {activeDay + 1}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-rose-50 text-rose-600">
                  {currentDay?.workoutGoal}
                </span>
              </div>
              <div className="flex gap-1 overflow-x-auto scrollbar-thin">
                {Array.from({ length: Math.min(plan.length, 30) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setDay(i)}
                    className={`shrink-0 w-7 h-7 rounded-lg text-[10px] font-bold transition-all duration-200 ${
                      activeDay === i
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setDay(Math.min(plan.length - 1, activeDay + 1))}
              disabled={activeDay >= plan.length - 1}
              className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-gray-100 flex items-center justify-center transition-all shrink-0"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Exercise Type Selector */}
        <div className="bg-gradient-to-r from-rose-50/80 to-orange-50/80 border-b border-rose-100 px-6 py-3 shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 shrink-0">
              {t('wbType')}
            </span>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-thin flex-1">
              <button
                type="button"
                onClick={() => setSelectedType('auto')}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all duration-200 ${
                  selectedType === 'auto'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-rose-300 hover:text-rose-600'
                }`}
              >
                🤖 {t('wbAuto')}
              </button>
              {EXERCISE_TYPE_OPTIONS.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all duration-200 ${
                    selectedType === type
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-rose-300 hover:text-rose-600'
                  }`}
                >
                  {EXERCISE_TYPE_LABELS[type][language === 'ar' ? 'ar' : 'en']}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top Summary Bar */}
        <div className="bg-gradient-to-r from-rose-50 to-orange-50 border-b border-rose-100 px-6 py-4 shrink-0 print:bg-rose-50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-lg">🔥</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-rose-600 uppercase tracking-wider">
                  {t('wbBurnTarget')}
                </p>
                <p className="text-xl font-black text-gray-900">{currentDay?.calorieBurnTarget || 0} <span className="text-sm font-bold text-gray-500">kcal</span></p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-rose-200" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-lg">🎯</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-orange-600 uppercase tracking-wider">
                  {t('wbGoal')}
                </p>
                <p className="text-sm font-bold text-gray-900">{currentDay?.workoutGoal}</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-rose-200" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-amber-700">{completedCount}/{currentDay?.exercises.length || 0}</span>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider">
                  {t('wbExercisesDone')}
                </p>
                <div className="h-2 bg-amber-100 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Bar */}
        <div className="border-b border-gray-100 bg-white px-6 py-3 shrink-0 flex items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                const subject = encodeURIComponent('My HealthCalc.ai Workout Plan');
                const body = encodeURIComponent(
                  `Workout Plan — Day ${activeDay + 1}\n\n${currentDay?.exercises.map(e => `${e.nameEn} (${e.type}) — ${e.duration}, ${e.calories} kcal`).join('\n') || ''}`
                );
                window.open(`mailto:?subject=${subject}&body=${body}`);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              {t('wbEmailPlan')}
            </button>
          </div>
          <button
            onClick={() => setShowProgressTracker(!showProgressTracker)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
              showProgressTracker
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>
            {t('progressTracker')}
          </button>
        </div>

        {/* Progress Tracker Panel */}
        {showProgressTracker && (
          <div className="bg-amber-50/80 border-b border-amber-100 px-6 py-4 shrink-0 animate-fade-in print:hidden">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-700">
                    {t('wbDailyProgress')}
                  </span>
                  <span className="text-xs font-bold text-amber-600">{completionPct}%</span>
                </div>
                <div className="h-3 bg-amber-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-amber-700">{completedCount}</p>
                <p className="text-[10px] font-semibold text-amber-500 uppercase">
                  {fmt(t('wbOfEx'), { n: currentDay?.exercises.length || 0 })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Exercise Cards */}
        <div className="overflow-y-auto flex-1 px-6 py-6 print:overflow-visible print:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-3">
            {currentDay?.exercises.map((exercise, i) => (
              <div
                key={i}
                className={`relative bg-gradient-to-br from-white to-gray-50 border rounded-2xl p-5 transition-all duration-300 hover:shadow-card-hover print:shadow-none print:border-gray-200 animate-fade-in ${
                  completed[i] ? 'ring-2 ring-sage-300 bg-sage-50/50' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${typeColors[exercise.type] || 'bg-gray-100'}`}>
                    {exercise.type === 'strength' ? '💪' :
                     exercise.type === 'cardio' ? '🏃' :
                     exercise.type === 'hiit' ? '⚡' :
                     exercise.type === 'flexibility' ? '🧘' :
                     exercise.type === 'balance' ? '⚖️' :
                     exercise.type === 'functional' ? '🏋️' : '🧠'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold ${completed[i] ? 'text-sage-700' : 'text-gray-900'}`}>
                      {language === 'ar' ? exercise.nameAr : exercise.nameEn}
                    </h3>
                    <p className={`text-xs ${completed[i] ? 'text-sage-400' : 'text-gray-400'}`}>
                      {exercise.duration} · {exercise.calories} kcal
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 print:hidden">
                    <button
                      onClick={() => toggleComplete(i)}
                      className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                        completed[i]
                          ? 'bg-sage-500 border-sage-500 text-white'
                          : 'border-gray-200 hover:border-sage-300 text-transparent'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border ${typeColors[exercise.type] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {EXERCISE_TYPE_LABELS[exercise.type]?.[language === 'ar' ? 'ar' : 'en']}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${difficultyColors[exercise.difficulty] || 'bg-gray-100 text-gray-600'}`}>
                    {exercise.difficulty === 'beginner' ? t('wbLevelBeginner') : exercise.difficulty === 'intermediate' ? t('wbLevelIntermediate') : t('wbLevelAdvanced')}
                  </span>
                </div>
                {completed[i] && (
                  <div className="absolute top-3 left-3 print:hidden">
                    <span className="badge-sage text-[10px]">
                      ✓ {t('wbDone')}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4 shrink-0 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 bg-sage-400 rounded-full" />
            {completedCount}/{currentDay?.exercises.length || 0} {t('wbExercisesCompleted')}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="btn-ghost text-gray-500 hover:text-gray-700"
            >
              {t('close')}
            </button>
            <button
              onClick={onSave}
              className="btn-primary"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {t('saveProgress')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutBlueprintModal;
