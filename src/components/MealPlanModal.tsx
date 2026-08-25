import React, { useEffect, useState, useCallback } from 'react';
import { MealPlan, DailyMealPlan } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MealPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCalories: number;
  mealPlan: MealPlan[];
  fullMealPlan?: DailyMealPlan[];
  selectedDay?: number;
  onDayChange?: (day: number) => void;
  weight: number;
  onSave: () => void;
}

const mealIcons: Record<string, string> = {
  meal: '🍳',
  snack: '🥤',
};

const mealCardColors: string[] = [
  'from-blue-50 to-white border-blue-100',
  'from-purple-50 to-white border-purple-100',
  'from-amber-50 to-white border-amber-100',
  'from-rose-50 to-white border-rose-100',
  'from-emerald-50 to-white border-emerald-100',
  'from-cyan-50 to-white border-cyan-100',
];

const mealIconBg: string[] = [
  'bg-blue-100 text-blue-600',
  'bg-purple-100 text-purple-600',
  'bg-amber-100 text-amber-600',
  'bg-rose-100 text-rose-600',
  'bg-emerald-100 text-emerald-600',
  'bg-cyan-100 text-cyan-600',
];

const mealSwapOptions: string[][] = [
  ['50g Rolled Oats + 170g Greek Yogurt + 15g Almonds', '2 Whole Eggs + 1 Slice Whole-Grain Toast + Avocado (50g)', 'Smoothie: 1 Scoop Protein + 1 Banana + 200ml Almond Milk'],
  ['30g Whey Isolate + 250ml Almond Milk', '150g Cottage Cheese + Cucumber Slices', '2 Hard-Boiled Eggs + Cherry Tomatoes'],
  ['180g Grilled Salmon + 150g Quinoa + 200g Roasted Veg', '180g Grilled Chicken + 150g Brown Rice + Green Salad', '180g Lean Turkey + 150g Sweet Potato + Steamed Broccoli'],
  ['170g Greek Yogurt + 15g Walnuts + 50g Raspberries', 'Apple (150g) + 20g Almond Butter', 'Protein Bar (30g Protein) + Green Tea'],
  ['50g Rolled Oats + 170g Greek Yogurt', '120g Grilled Chicken + Large Mixed Salad', '150g Baked Cod + Steamed Asparagus'],
  ['125g 2% Cottage Cheese + Cinnamon', 'Casein Shake (30g) + 200ml Water', 'Herbal Tea + 15g Pumpkin Seeds'],
];

const MealPlanModal: React.FC<MealPlanModalProps> = ({ isOpen, onClose, targetCalories, mealPlan, fullMealPlan, selectedDay: externalDay, onDayChange, weight, onSave }) => {
  const { t } = useLanguage();
  const [internalDay, setInternalDay] = useState(externalDay ?? 0);
  const activeDay = externalDay ?? internalDay;
  const setDay = onDayChange ?? setInternalDay;

  const currentDayData = fullMealPlan && fullMealPlan[activeDay] ? fullMealPlan[activeDay] : null;
  const activeMealPlan = currentDayData ? currentDayData.meals : mealPlan;
  const dayTheme = currentDayData?.theme ?? 'Today\'s Plan';

  const [completed, setCompleted] = useState<boolean[]>(new Array(activeMealPlan.length).fill(false));
  const [showProgressTracker, setShowProgressTracker] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);
  const [swappedMeals, setSwappedMeals] = useState<number[]>([]);
  const [showSwapFor, setShowSwapFor] = useState<number | null>(null);

  const waterGoal = Math.round(weight * 0.033 * 10) / 10;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCompleted(new Array(activeMealPlan.length).fill(false));
      setWaterIntake(0);
      setSwappedMeals([]);
      setShowSwapFor(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, activeMealPlan.length]);

  useEffect(() => {
    setCompleted(new Array(activeMealPlan.length).fill(false));
    setSwappedMeals([]);
    setShowSwapFor(null);
  }, [activeDay, activeMealPlan.length]);

  const toggleComplete = useCallback((index: number) => {
    setCompleted(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, []);

  const completedCount = completed.filter(Boolean).length;
  const completionPct = activeMealPlan.length > 0 ? Math.round((completedCount / activeMealPlan.length) * 100) : 0;

  if (!isOpen) return null;

  const handlePrint = () => { window.print(); };

  const handleDownloadPDF = () => {
    const content = document.getElementById('meal-plan-printable');
    if (!content) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>HealthCalc.ai - Meal Plan</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px; color: #1f2937; }
        h1 { font-size: 24px; margin-bottom: 4px; }
        .sub { color: #6b7280; font-size: 13px; margin-bottom: 24px; }
        .target { background: #f0faf4; padding: 16px; border-radius: 12px; margin-bottom: 24px; }
        .target span { font-size: 28px; font-weight: 900; }
        .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 12px; page-break-inside: avoid; }
        .card h3 { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
        .card .meta { font-size: 12px; color: #6b7280; margin-bottom: 8px; }
        .card ul { padding-left: 16px; }
        .card li { font-size: 13px; margin-bottom: 4px; }
        .card .desc { font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 8px; margin-top: 8px; }
      </style></head><body>
      <h1>Your Personalized Health Blueprint</h1>
      <p class="sub">HealthCalc.ai — Science-Based Nutrition Planning</p>
      <div class="target">Daily Caloric Target: <span>${targetCalories} kcal</span></div>
      ${fullMealPlan && fullMealPlan[activeDay] ? `<p style="font-size:14px;font-weight:600;margin-bottom:16px;">Day ${activeDay + 1} — ${fullMealPlan[activeDay].theme}</p>` : ''}
      ${activeMealPlan.map((meal, i) => `
        <div class="card">
          <h3>${mealIcons[meal.icon]} ${meal.meal}</h3>
          <p class="meta">${meal.calories} kcal · ${meal.protein}g Protein · ${meal.carbs}g Carbs · ${meal.fat}g Fat</p>
          <ul>${meal.items.map(item => `<li>${item}</li>`).join('')}</ul>
          <p class="desc">${meal.description}</p>
        </div>
      `).join('')}
      <p style="font-size:11px;color:#9ca3af;margin-top:24px;text-align:center;">Generated by HealthCalc.ai — For educational purposes only. Consult a healthcare professional.</p>
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in print:shadow-none print:max-h-none print:max-w-none print:rounded-none">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-5 shrink-0 print:bg-primary-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-lg font-bold shrink-0">
                HC
              </div>
              <div>
                <h2 className="text-lg font-extrabold tracking-tight">{t('mealPlanTitle')}</h2>
                <p className="text-primary-200 text-xs">{t('mealPlanSubtitle')}</p>
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
        {fullMealPlan && fullMealPlan.length > 0 && (
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
                  <span className="text-sm font-bold text-gray-900">{t('dayLabel')} {activeDay + 1}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-primary-50 text-primary-600">{dayTheme}</span>
                </div>
                <div className="flex gap-1 overflow-x-auto scrollbar-thin">
                  {Array.from({ length: Math.min(fullMealPlan.length, 30) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setDay(i)}
                      className={`shrink-0 w-7 h-7 rounded-lg text-[10px] font-bold transition-all duration-200 ${
                        activeDay === i
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setDay(Math.min(fullMealPlan.length - 1, activeDay + 1))}
                disabled={activeDay >= fullMealPlan.length - 1}
                className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-gray-100 flex items-center justify-center transition-all shrink-0"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Top Summary Bar: Calories + Water */}
        <div className="bg-gradient-to-r from-sage-50 to-primary-50 border-b border-sage-100 px-6 py-4 shrink-0 print:bg-sage-50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            {/* Caloric Target */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sage-100 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-sage-600 uppercase tracking-wider">{t('dailyCaloricTarget')}</p>
                <p className="text-xl font-black text-gray-900">{targetCalories} <span className="text-sm font-bold text-gray-500">kcal</span></p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-sage-200" />

            {/* Water Intake Tracker */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">{t('waterGoal')}</p>
                  <p className="text-[10px] font-bold text-blue-700">{waterIntake.toFixed(1)} / {waterGoal} L</p>
                </div>
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((waterIntake / waterGoal) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 print:hidden">
                  <button
                    onClick={() => setWaterIntake(prev => Math.max(0, Math.round((prev - 0.25) * 10) / 10))}
                    className="w-6 h-6 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold transition-all"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setWaterIntake(prev => Math.round((prev + 0.25) * 10) / 10)}
                    className="w-6 h-6 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold transition-all"
                  >
                    +
                  </button>
                  <span className="text-[10px] text-blue-400 ml-1">+250ml per tap</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-sage-200" />

            {/* Completion Tracker */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-amber-700">{completedCount}/{activeMealPlan.length}</span>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider">{t('mealsDone')}</p>
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

        {/* Interactive Control Bar */}
        <div className="border-b border-gray-100 bg-white px-6 py-3 shrink-0 flex items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary-50 text-primary-700 hover:bg-primary-100 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              {t('downloadPdf')}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
              </svg>
              Print
            </button>
            <button
              onClick={() => {
                const subject = encodeURIComponent('My HealthCalc.ai Meal Plan');
                const body = encodeURIComponent(`Check out my personalized meal plan from HealthCalc.ai!\n\nDaily Target: ${targetCalories} kcal\n\n${activeMealPlan.map(m => `${m.meal}: ${m.description}`).join('\n\n')}`);
                window.open(`mailto:?subject=${subject}&body=${body}`);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-sage-50 text-sage-700 hover:bg-sage-100 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              {t('emailPlan')}
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
                  <span className="text-xs font-bold text-amber-700">{t('dailyProgress')}</span>
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
                <p className="text-[10px] font-semibold text-amber-500 uppercase">{activeMealPlan.length} {t('ofMeals')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-blue-700">{waterIntake.toFixed(1)}L</p>
                <p className="text-[10px] font-semibold text-blue-500 uppercase">{t('water')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Meal Cards */}
        <div className="overflow-y-auto flex-1 px-6 py-6 print:overflow-visible print:p-6" id="meal-plan-printable">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-3">
            {activeMealPlan.map((meal, i) => (
              <div
                key={i}
                className={`relative bg-gradient-to-br ${mealCardColors[i % mealCardColors.length]} border rounded-2xl p-5 transition-all duration-300 hover:shadow-card-hover print:shadow-none print:border-gray-200 animate-fade-in stagger-${Math.min(i + 1, 5)} ${completed[i] ? 'ring-2 ring-sage-300 bg-sage-50/50' : ''}`}
              >
                {/* Meal Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${mealIconBg[i % mealIconBg.length]} rounded-xl flex items-center justify-center text-lg shrink-0`}>
                    {mealIcons[meal.icon] || '🍽️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold ${completed[i] ? 'text-sage-700' : 'text-gray-900'}`}>{meal.meal}</h3>
                    <p className={`text-xs ${completed[i] ? 'text-sage-400' : 'text-gray-400'}`}>{meal.calories} kcal</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 print:hidden">
                    <button
                      onClick={() => setShowSwapFor(showSwapFor === i ? null : i)}
                      className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-white/80 text-gray-500 hover:bg-white hover:text-primary-600 border border-gray-200/80 transition-all duration-200"
                    >
                      ↻ {t('smartSwap')}
                    </button>
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

                {/* Swap Options */}
                {showSwapFor === i && (
                  <div className="mb-3 p-3 bg-white/90 rounded-xl border border-gray-100 animate-fade-in print:hidden">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{t('altOptions')}</p>
                    <div className="space-y-1.5">
                      {(mealSwapOptions[i] || []).map((opt, j) => (
                        <button
                          key={j}
                          onClick={() => {
                            setSwappedMeals(prev => {
                              const next = [...prev];
                              next[i] = j;
                              return next;
                            });
                            setShowSwapFor(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                            swappedMeals[i] === j
                              ? 'bg-primary-50 text-primary-700 font-semibold border border-primary-200'
                              : 'bg-gray-50 text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-transparent'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Macro Badges */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-primary-50 text-primary-600">
                    🥩 {meal.protein}g {t('proteinLabel')}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-sage-50 text-sage-600">
                    🌾 {meal.carbs}g {t('carbsLabel')}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-amber-50 text-amber-600">
                    🫒 {meal.fat}g {t('fatLabel')}
                  </span>
                </div>

                {/* Food Items */}
                <ul className="space-y-1.5">
                  {(swappedMeals[i] !== undefined
                    ? [mealSwapOptions[i][swappedMeals[i]]]
                    : meal.items
                  ).map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-sage-400 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Description */}
                <p className={`text-xs mt-3 pt-3 border-t border-gray-100/80 leading-relaxed ${completed[i] ? 'text-sage-400' : 'text-gray-400'}`}>
                  {meal.description}
                </p>

                {/* Completed overlay */}
                {completed[i] && (
                  <div className="absolute top-3 left-3 print:hidden">
                    <span className="badge-sage text-[10px]">✓ {t('eaten')}</span>
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
            {completedCount}/{activeMealPlan.length} {t('mealsCompleted')}
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

export default MealPlanModal;
