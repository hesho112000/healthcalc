import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getMealName, getFoodItemText, normalizeMealKey } from '../utils/mealLabels';
import { isHeavyMeal } from '../data/cuisine-allowed';

/* ═══════════════════════════════════════════════════════════════════
   SHARED TYPES
   ═══════════════════════════════════════════════════════════════════ */
export interface PlanMealItem { meal: string; calories: number; items: string[]; tips?: string; protein?: number; carbs?: number; fat?: number; nameAr?: string; nameEn?: string; verified?: boolean; saturatedFat?: number; cholesterol?: number }
export interface PlanWorkoutItem { exercise: string; sets: string; notes: string; duration?: string; calories?: number }
export interface PlanDay { day: number; label: string; phase: string; meals: PlanMealItem[]; workouts: PlanWorkoutItem[]; dailyGoal: string; guidelines?: string[] }
export interface StatsData { bmr?: number; tdee?: number; targetCalories?: number }
export type ContentTab = 'macros' | 'meals' | 'workout';

/* ═══════════════════════════════════════════════════════════════════
   STREAK BAR — gamification counter
   ═══════════════════════════════════════════════════════════════════ */
export const StreakBar: React.FC<{
  currentStreak: number;
  longestStreak: number;
  todayChecked: boolean;
  daysCompleted: number;
  totalDays: number;
}> = ({ currentStreak, longestStreak, todayChecked, daysCompleted, totalDays }) => {
  const { t } = useLanguage();
  const progressPct = Math.round((daysCompleted / totalDays) * 100);
  return (
    <div className="card p-4 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-amber-200/60">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">{t('streak')}</p>
              <p className="text-2xl font-black text-gray-900 leading-none">{currentStreak} <span className="text-sm font-bold text-amber-600">{t('days')}</span></p>
            </div>
          </div>
          <div className="w-px h-10 bg-amber-200" />
          <div className="text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">{t('best')}</p>
            <p className="text-lg font-extrabold text-gray-700">{longestStreak}</p>
          </div>
          <div className="w-px h-10 bg-amber-200" />
          <div className="text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">{t('today')}</p>
            {todayChecked ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-sage-100 text-sage-700 text-xs font-bold">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {t('done')}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-gray-100 text-gray-400 text-xs font-bold">{t('pending')}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-gray-400 uppercase">{t('journey')}</p>
            <p className="text-sm font-bold text-gray-700">{daysCompleted}/{totalDays} {t('days')}</p>
          </div>
          <div className="w-24 h-2 rounded-full bg-white overflow-hidden shadow-inner">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   DAY PROGRESS HEADER — progress bar + daily goal
   ═══════════════════════════════════════════════════════════════════ */
export const DayProgressHeader: React.FC<{
  completed: number;
  total: number;
  dailyGoal?: string;
}> = ({ completed, total, dailyGoal }) => {
  const { t } = useLanguage();
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isAllDone = completed === total && total > 0;
  return (
    <div className={`card p-4 transition-all duration-300 ${isAllDone ? 'bg-sage-50 border-sage-200 ring-1 ring-sage-300' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isAllDone ? (
            <span className="text-lg">🎉</span>
          ) : (
            <span className="text-lg">📊</span>
          )}
          <h4 className="font-bold text-gray-900 text-sm">
            {isAllDone ? t('allComplete') : t('dailyProgress')}
          </h4>
        </div>
        <span className={`text-sm font-black ${isAllDone ? 'text-sage-600' : 'text-primary-600'}`}>
          {completed}/{total}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden mb-1.5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isAllDone ? 'bg-gradient-to-r from-sage-400 to-sage-500' : 'bg-gradient-to-r from-primary-500 to-primary-600'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-gray-400 font-medium">{pct}% {t('completed')}</p>
        {dailyGoal && <p className="text-[10px] text-sage-600 font-semibold">🎯 {dailyGoal}</p>}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   DAY SELECTOR BAR — scrollable horizontal day chips
   ═══════════════════════════════════════════════════════════════════ */
export const DaySelectorBar: React.FC<{
  days: number;
  activeDay: number;
  onSelect: (day: number) => void;
  checkedDays?: number[];
  label?: string;
  subtitle?: string;
  action?: React.ReactNode;
}> = ({ days, activeDay, onSelect, checkedDays = [], label, subtitle, action }) => {
  const { t } = useLanguage();
  return (
    <div className="card p-4">
    <div className="flex items-center justify-between mb-3">
      <div>
        {label && <h3 className="font-bold text-gray-900">{label}</h3>}
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
      {Array.from({ length: days }, (_, i) => (
        <button key={i} onClick={() => onSelect(i + 1)}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
            activeDay === i + 1
              ? 'bg-primary-600 text-white shadow-sm'
              : checkedDays.includes(i + 1)
              ? 'bg-sage-100 text-sage-700 border border-sage-300'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
          }`}>
          {checkedDays.includes(i + 1) ? '✓ ' : ''}{t('dayLabel')} {i + 1}
        </button>
      ))}
    </div>
  </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   STAT CARDS — BMR / TDEE / Target Calories
   ═══════════════════════════════════════════════════════════════════ */
export const StatsBar: React.FC<{ stats: StatsData; labels?: { bmr?: string; tdee?: string; daily?: string } }> = ({ stats, labels }) => {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.bmr !== undefined && (
        <div className="stat-card bg-gradient-to-br from-primary-50 to-white border-primary-100">
          <p className="text-xs font-semibold text-primary-500 uppercase tracking-wider mb-1">{labels?.bmr || 'BMR'}</p>
          <p className="text-3xl font-black text-primary-700">{stats.bmr}</p>
          <p className="text-xs text-primary-400 mt-0.5">{t('kcal')}/day</p>
        </div>
      )}
      {stats.tdee !== undefined && (
        <div className="stat-card bg-gradient-to-br from-sage-50 to-white border-sage-100">
          <p className="text-xs font-semibold text-sage-500 uppercase tracking-wider mb-1">{labels?.tdee || 'TDEE'}</p>
          <p className="text-3xl font-black text-sage-700">{stats.tdee}</p>
          <p className="text-xs text-sage-400 mt-0.5">{t('kcal')}/day</p>
        </div>
      )}
      {stats.targetCalories !== undefined && (
        <div className="stat-card bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">{labels?.daily || t('dailyCalories')}</p>
          <p className="text-3xl font-black text-amber-700">{stats.targetCalories}</p>
          <p className="text-xs text-amber-400 mt-0.5">{t('kcal')}/day</p>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MACRO BREAKDOWN TAB — protein/carbs/fat cards + progress bar
   ═══════════════════════════════════════════════════════════════════ */
export const MacroBreakdown: React.FC<{
  proteinG: number; proteinPct: number;
  carbsG: number; carbsPct: number;
  fatG: number; fatPct: number;
}> = ({ proteinG, proteinPct, carbsG, carbsPct, fatG, fatPct }) => {
  const { t } = useLanguage();
  const macros = [
    { label: t('protein'), grams: proteinG, pct: proteinPct, colorClass: 'text-primary-600 bg-primary-50', barColor: 'bg-primary-500', calories: proteinG * 4 },
    { label: t('carbs'), grams: carbsG, pct: carbsPct, colorClass: 'text-sage-600 bg-sage-50', barColor: 'bg-sage-500', calories: carbsG * 4 },
    { label: t('fat'), grams: fatG, pct: fatPct, colorClass: 'text-amber-600 bg-amber-50', barColor: 'bg-amber-500', calories: fatG * 9 },
  ];
  return (
    <div className="card animate-fade-in p-6">
      <h3 className="font-bold text-gray-900 mb-5">{t('macros')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {macros.map((m, i) => (
          <div key={i} className="text-center p-5 rounded-2xl bg-gray-50/80">
            <div className={`text-3xl font-black ${m.colorClass.split(' ')[0]} mb-1`}>{m.grams}g</div>
            <p className="text-sm font-semibold text-gray-700 mb-1">{m.label}</p>
            <p className="text-xs text-gray-400">{m.pct}% · {m.calories} {t('kcal')}</p>
          </div>
        ))}
      </div>
      <div className="h-3 rounded-full overflow-hidden flex bg-gray-100">
        <div className="bg-primary-500 h-full transition-all duration-700" style={{ width: `${proteinPct}%` }} />
        <div className="bg-sage-500 h-full transition-all duration-700" style={{ width: `${carbsPct}%` }} />
        <div className="bg-amber-500 h-full transition-all duration-700" style={{ width: `${fatPct}%` }} />
      </div>
      <div className="flex justify-between mt-3 text-xs text-gray-400">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-primary-500 rounded-full" /> {t('protein')}</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-sage-500 rounded-full" /> {t('carbs')}</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-500 rounded-full" /> {t('fat')}</span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SMART MEAL CARD — macro badges, calorie counter, swap, checkbox
   ═══════════════════════════════════════════════════════════════════ */
const mealIcons: Record<string, string> = {
  breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🥜',
  'morning snack': '🍏', 'afternoon snack': '🥜',
};

export const MealCard: React.FC<{
  meal: PlanMealItem;
  done?: boolean;
  onToggle?: (done: boolean) => void;
  onSwap?: () => void;
  swappedTag?: string;
}> = ({ meal, done: doneProp, onToggle, onSwap, swappedTag }) => {
  const { t, language } = useLanguage();
  const [localDone, setLocalDone] = useState(false);
  const isDone = doneProp ?? localDone;
  const mealKey = normalizeMealKey(meal.meal);
  const icon = mealIcons[mealKey] || '🍽️';
  const protein = meal.protein ?? Math.round(meal.calories * 0.3 / 4);
  const carbs = meal.carbs ?? Math.round(meal.calories * 0.45 / 4);
  const fat = meal.fat ?? Math.round(meal.calories * 0.25 / 9);
  const heavy = isHeavyMeal(meal.meal, meal.calories, fat);

  const toggle = () => {
    const next = !isDone;
    if (onToggle) onToggle(next);
    else setLocalDone(next);
  };

  return (
    <div className={`card p-5 transition-all duration-300 ${isDone ? 'ring-2 ring-sage-400 bg-sage-50/50' : 'hover:shadow-md'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <button onClick={toggle}
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 active:scale-90 ${
              isDone ? 'bg-sage-500 text-white shadow-sm scale-110' : 'bg-gray-100 text-gray-400 hover:bg-sage-100 hover:text-sage-600'
            }`}>
            {isDone ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="9" /></svg>
            )}
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base">{icon}</span>
              <h4 className={`font-bold text-sm ${isDone ? 'text-sage-600 line-through' : 'text-gray-900'}`}>{getMealName(meal, language)}</h4>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5">
            {meal.verified && (
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-[9px] font-bold text-white" title="USDA Database">USDA ✓</span>
            )}
            {heavy && (
              <span className="px-1.5 py-0.5 rounded-md bg-red-100 text-[9px] font-bold text-red-700" title="Heavy dish · best at lunch">⚠️ {t('mbHeavy')}</span>
            )}
            <p className="text-2xl font-black text-primary-700 leading-none">{meal.calories}</p>
          </div>
          <p className="text-[10px] font-semibold text-primary-400 uppercase">{t('kcal')}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 text-[10px] font-bold border border-primary-100">
          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" /> {t('proteinLabel')} {protein}g
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sage-50 text-sage-700 text-[10px] font-bold border border-sage-100">
          <span className="w-1.5 h-1.5 bg-sage-500 rounded-full" /> {t('carbsLabel')} {carbs}g
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-100">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> {t('fatLabel')} {fat}g
        </span>
        {meal.saturatedFat != null && meal.saturatedFat > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-100">
            🥩 Sat {meal.saturatedFat}g
          </span>
        )}
        {meal.cholesterol != null && meal.cholesterol > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 text-[10px] font-bold border border-orange-100">
            🥚 Chol {meal.cholesterol}mg
          </span>
        )}
      </div>

      {swappedTag && (
        <div className="flex items-center gap-1.5 mb-3 px-3 py-1.5 bg-sage-50 rounded-lg border border-sage-200">
          <svg className="w-3 h-3 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          <span className="text-[10px] font-bold text-sage-700">{swappedTag}</span>
        </div>
      )}

      {meal.tips && <p className="text-[11px] text-sage-600 mb-3 italic bg-sage-50/50 rounded-lg px-3 py-2">💡 {meal.tips}</p>}

      <div className="bg-gray-50 rounded-xl p-3 mb-3">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
          {meal.items.map((item, j) => (
            <li key={j} className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-1.5 h-1.5 bg-sage-400 rounded-full shrink-0" />{getFoodItemText(item, meal.nameAr, meal.nameEn, language)}
            </li>
          ))}
        </ul>
      </div>

      {onSwap && (
        <button onClick={onSwap} className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 transition-all active:scale-[0.98]">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" /></svg>
          {t('smartSwap')}
        </button>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MEAL PLAN VIEW — list of MealCards for a day
   ═══════════════════════════════════════════════════════════════════ */
export const MealPlanView: React.FC<{ meals: PlanMealItem[] }> = ({ meals }) => (
  <div className="space-y-4 animate-fade-in">
    {meals.map((meal, i) => <MealCard key={i} meal={meal} />)}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   SMART WORKOUT CARD — icon, duration, calories, checkbox
   ═══════════════════════════════════════════════════════════════════ */
export const WorkoutCard: React.FC<{
  workout: PlanWorkoutItem;
  index?: number;
  done?: boolean;
  onToggle?: (done: boolean) => void;
  onSwap?: () => void;
}> = ({ workout, index = 0, done: doneProp, onToggle, onSwap }) => {
  const { t } = useLanguage();
  const [localDone, setLocalDone] = useState(false);
  const isDone = doneProp ?? localDone;
  const focusLower = workout.exercise.toLowerCase();
  const icon = focusLower.includes('walk') ? '🚶' :
    focusLower.includes('swim') ? '🏊' :
    focusLower.includes('yoga') || focusLower.includes('stretch') ? '🧘' :
    focusLower.includes('cycle') || focusLower.includes('bike') ? '🚴' :
    focusLower.includes('strength') || focusLower.includes('weight') || focusLower.includes('resistance') ? '🏋️' :
    focusLower.includes('run') || focusLower.includes('jog') ? '🏃' :
    focusLower.includes('breath') || focusLower.includes('meditat') ? '🌿' :
    focusLower.includes('tai') ? '☯️' : '⚡';
  const caloriesBurned = workout.calories ?? Math.round(parseInt(workout.sets) || 30) * 8;

  const toggle = () => {
    const next = !isDone;
    if (onToggle) onToggle(next);
    else setLocalDone(next);
  };

  return (
    <div className={`card p-5 transition-all duration-300 ${isDone ? 'ring-2 ring-sage-400 bg-sage-50/50' : 'hover:shadow-md'}`}>
      <div className="flex items-center gap-4">
        <button onClick={toggle}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-200 active:scale-90 ${
            isDone ? 'bg-sage-500 text-white shadow-sm scale-110' : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
          }`}>
          {isDone ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          ) : (
            <span className="text-lg">{icon}</span>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h4 className={`font-bold ${isDone ? 'text-sage-600 line-through' : 'text-gray-900'}`}>{workout.exercise}</h4>
          <p className={`text-sm ${isDone ? 'text-sage-400' : 'text-gray-600'}`}>{workout.notes}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-primary-50 text-primary-700 text-[10px] font-bold border border-primary-100">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {workout.sets}
            </span>
            {caloriesBurned > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-100">
                🔥 ~{caloriesBurned} {t('kcal')}
              </span>
            )}
          </div>
        </div>

        {onSwap && (
          <button onClick={onSwap} className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-all" title="Swap exercise">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" /></svg>
          </button>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   WORKOUT PLAN VIEW — list of WorkoutCards for a day
   ═══════════════════════════════════════════════════════════════════ */
export const WorkoutPlanView: React.FC<{ workouts: PlanWorkoutItem[] }> = ({ workouts }) => (
  <div className="space-y-3 animate-fade-in">
    {workouts.map((w, i) => <WorkoutCard key={i} workout={w} index={i} />)}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   PLAN TAB BAR — Meals / Workout toggle
   ═══════════════════════════════════════════════════════════════════ */
export const PlanTabBar: React.FC<{
  activeTab: ContentTab;
  onChange: (tab: ContentTab) => void;
}> = ({ activeTab, onChange }) => {
  const { t } = useLanguage();
  return (
    <div className="flex gap-2">
      <button type="button" onClick={() => onChange('meals')}
        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === 'meals' ? 'bg-sage-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
        🍽️ {t('mealPlan')}
      </button>
      <button type="button" onClick={() => onChange('workout')}
        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === 'workout' ? 'bg-primary-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
        🏃 {t('workoutPlan')}
      </button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   EMPTY STATE — shown before calculation
   ═══════════════════════════════════════════════════════════════════ */
export const EmptyPlanState: React.FC<{ title?: string; description?: string }> = ({ title, description }) => {
  const { t } = useLanguage();
  return (
    <div className="card text-center py-20">
      <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title || t('enterDetails')}</h3>
      <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">{description || t('enterDetailsDesc')}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   PAGE LAYOUT — hero + 2-column grid
   ═══════════════════════════════════════════════════════════════════ */
export const PageHero: React.FC<{
  gradient?: string;
  badge?: string;
  title: string;
  description: string;
  pill?: string;
}> = ({ gradient = 'from-primary-600 to-primary-700', badge, title, description, pill }) => (
  <div className={`bg-gradient-to-r ${gradient} text-white`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      <div className="max-w-2xl">
        {pill && (
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-sage-300 rounded-full" />
            <span className="text-xs font-medium text-primary-100">{pill}</span>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">{title}</h1>
          {badge && <span className="badge bg-white/20 text-white text-[10px] font-bold">{badge}</span>}
        </div>
        <p className="text-primary-100 text-sm md:text-base leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

export const TwoColumnLayout: React.FC<{
  sidebar: React.ReactNode;
  children: React.ReactNode;
}> = ({ sidebar, children }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">{sidebar}</div>
      <div className="lg:col-span-2">{children}</div>
    </div>
  </div>
);
