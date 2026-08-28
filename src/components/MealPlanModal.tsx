import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MealPlan } from '../types';
import { Cuisine, CUISINE_META } from '../utils/calculations_expanded';
import { buildMealRowsForCuisine } from '../utils/calculations';
import { useLanguage } from '../context/LanguageContext';
import { getMealName, getFoodItemText } from '../utils/mealLabels';

interface ModalDayData {
  meals: Array<{ meal: string; calories: number; protein: number; carbs: number; fat: number; items: string[]; icon?: string; description?: string; tips?: string; nameAr?: string; nameEn?: string; verified?: boolean; saturatedFat?: number; cholesterol?: number }>;
  theme?: string;
  label?: string;
  day?: number;
}

interface MealPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCalories: number;
  mealPlan: MealPlan[];
  fullMealPlan?: ModalDayData[];
  selectedDay?: number;
  onDayChange?: (day: number) => void;
  weight: number;
  onSave: () => void;
  cuisine?: Cuisine;
  onCuisineChange?: (cuisine: Cuisine) => void;
  labSummary?: string;
}

const mealIcons: Record<string, string> = { meal: '🍳', snack: '🥤' };

const MealPlanModal: React.FC<MealPlanModalProps> = ({
  isOpen, onClose, targetCalories, mealPlan, fullMealPlan,
  selectedDay: externalDay, onDayChange, weight, onSave,
  cuisine: propCuisine,
  labSummary,
}) => {
  const { t, language } = useLanguage();
  const [internalDay, setInternalDay] = useState(externalDay ?? 0);
  const activeDay = externalDay ?? internalDay;
  const setDay = onDayChange ?? setInternalDay;

  const [internalCuisine] = useState<Cuisine>(() => {
    const saved = localStorage.getItem('hc_selectedCuisine');
    return (saved as Cuisine) || 'egyptian';
  });
  const activeCuisine = propCuisine ?? internalCuisine;

  const currentDayData = fullMealPlan && fullMealPlan[activeDay] ? fullMealPlan[activeDay] : null;
  const cuisineMeals = useMemo(() => buildMealRowsForCuisine(activeCuisine, language === 'ar' ? 'ar' : 'en', targetCalories || 2000), [activeCuisine, language, targetCalories]);
  const activeMealPlan = currentDayData ? currentDayData.meals : (mealPlan.length > 0 ? cuisineMeals : mealPlan);
  const dayTheme = currentDayData?.theme ?? 'Today\'s Plan';
  const displayCalories = targetCalories > 0 ? targetCalories : Math.round(activeMealPlan.reduce((sum, m) => sum + (m.calories || 0), 0));
  const cuisineMeta = CUISINE_META[activeCuisine];
  const cuisineLabel = cuisineMeta
    ? `${cuisineMeta.flag || ''} ${language === 'ar' ? cuisineMeta.label_ar : cuisineMeta.label_en}`
    : activeCuisine;

  const [completed, setCompleted] = useState<boolean[]>([]);
  const [showProgressTracker, setShowProgressTracker] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);

  const waterGoal = Math.round(weight * 0.033 * 10) / 10;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCompleted(new Array(activeMealPlan.length).fill(false));
      setWaterIntake(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setCompleted(new Array(activeMealPlan.length).fill(false));
    }
  }, [activeDay, activeCuisine, isOpen]);

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
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>HealthCalc.ai - Meal Plan</title>
      <style>
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:40px;color:#1f2937}
        h1{font-size:24px;margin-bottom:4px}.sub{color:#6b7280;font-size:13px;margin-bottom:24px}
        .target{background:#f0faf4;padding:16px;border-radius:12px;margin-bottom:24px}
        .target span{font-size:28px;font-weight:900}
        .card{border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin-bottom:12px;page-break-inside:avoid}
        .card h3{font-size:16px;font-weight:700;margin-bottom:4px}
        .card .meta{font-size:12px;color:#6b7280;margin-bottom:8px}
        .card ul{padding-left:16px}.card li{font-size:13px;margin-bottom:4px}
        .card .desc{font-size:12px;color:#9ca3af;border-top:1px solid #f3f4f6;padding-top:8px;margin-top:8px}
      </style></head><body>
      <h1>Your Personalized Health Blueprint</h1>
      <p class="sub">HealthCalc.ai — Science-Based Nutrition Planning</p>
      <div class="target">Daily Caloric Target: <span>${displayCalories} kcal</span></div>
      ${fullMealPlan && fullMealPlan[activeDay] ? `<p style="font-size:14px;font-weight:600;margin-bottom:16px;">Day ${activeDay + 1} — ${fullMealPlan[activeDay].theme}</p>` : ''}
      ${activeMealPlan.map(meal => `
        <div class="card">
          <h3>${mealIcons[meal.icon ?? 'meal'] || '🍽️'} ${getMealName(meal, language)}</h3>
          <p class="meta">${meal.calories} kcal · ${meal.protein}g Protein · ${meal.carbs}g Carbs · ${meal.fat}g Fat${meal.verified ? ` · <span style="color:#059669;font-weight:700;">USDA ✓</span>` : ''}${meal.saturatedFat != null && meal.saturatedFat > 0 ? ` · Sat ${meal.saturatedFat}g` : ''}${meal.cholesterol != null && meal.cholesterol > 0 ? ` · Chol ${meal.cholesterol}mg` : ''}</p>
          <ul>${meal.items.map(item => `<li>${getFoodItemText(item, meal.nameAr, meal.nameEn, language)}</li>`).join('')}</ul>
          <p class="desc">${meal.description}</p>
        </div>
      `).join('')}
      <p style="font-size:11px;color:#9ca3af;margin-top:24px;text-align:center;">Generated by HealthCalc.ai — For educational purposes only.</p>
      </body></html>`);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose} style={{ overflowY: 'auto' }}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-4 flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 rounded-t-2xl shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center text-lg font-bold">HC</div>
              <div>
                <h2 className="text-lg font-extrabold">{t('mealPlanTitle')}</h2>
                <p className="text-primary-200 text-xs">{t('mealPlanSubtitle')}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all cursor-pointer">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Day Selector */}
        {fullMealPlan && fullMealPlan.length > 0 && (
          <div className="border-b border-gray-100 px-6 py-3 shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => setDay(Math.max(0, activeDay - 1))} disabled={activeDay === 0}
                className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed">
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-gray-900">{t('dayLabel')} {activeDay + 1}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-primary-50 text-primary-600">{dayTheme}</span>
                </div>
                <div className="flex gap-1 overflow-x-auto">
                  {Array.from({ length: Math.min(fullMealPlan.length, 30) }, (_, i) => (
                    <button key={i} onClick={() => setDay(i)} className="shrink-0 w-7 h-7 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                      style={activeDay === i ? { background: '#1a6df5', color: '#fff' } : { background: '#f3f4f6', color: '#9ca3af' }}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setDay(Math.min(fullMealPlan.length - 1, activeDay + 1))} disabled={activeDay >= fullMealPlan.length - 1}
                className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed">
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* Lab Results */}
        {labSummary && (
          <div className="bg-blue-50/60 border-b border-blue-100 px-6 py-2 shrink-0 flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">🩸 {language === 'ar' ? 'نتائج التحاليل' : 'Lab Results'}</span>
            <span className="text-xs text-gray-700 font-medium">{labSummary}</span>
          </div>
        )}

        {/* Cuisine (read-only, changed from main page) */}
        <div className="bg-gradient-to-r from-sage-50/80 to-primary-50/80 border-b border-sage-100 px-6 py-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 shrink-0">🍽️</span>
            <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
              <span className="font-semibold">{language === 'ar' ? 'المطبخ' : 'Cuisine'}:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold">{cuisineLabel}</span>
              <span className="text-[10px] text-gray-400">({language === 'ar' ? 'غيّره من الصفحة الرئيسية' : 'Change from main page'})</span>
            </div>
          </div>
        </div>

        {/* Summary Bar */}
        <div className="bg-gradient-to-r from-sage-50 to-primary-50 border-b border-sage-100 px-6 py-4 shrink-0">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sage-100 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-lg">🔥</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-sage-600 uppercase tracking-wider">{t('dailyCaloricTarget')}</p>
                <p className="text-xl font-black text-gray-900">{displayCalories} <span className="text-sm font-bold text-gray-500">kcal</span></p>
              </div>
            </div>
            <div className="w-px h-10 bg-sage-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-lg">💧</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">{t('waterGoal')}</p>
                <p className="text-sm font-bold text-gray-900">{waterIntake.toFixed(1)} / {waterGoal} L</p>
                <div className="flex items-center gap-1 mt-1">
                  <button onClick={() => setWaterIntake(prev => Math.max(0, +(prev - 0.25).toFixed(1)))}
                    className="w-6 h-6 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold cursor-pointer transition-all">-</button>
                  <button onClick={() => setWaterIntake(prev => +(prev + 0.25).toFixed(1))}
                    className="w-6 h-6 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold cursor-pointer transition-all">+</button>
                  <span className="text-[10px] text-blue-400 ml-1">+250ml</span>
                </div>
              </div>
            </div>
            <div className="w-px h-10 bg-sage-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-amber-700">{completedCount}/{activeMealPlan.length}</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider">{t('mealsDone')}</p>
                <div className="h-2 bg-amber-100 rounded-full overflow-hidden mt-1 w-20">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all" style={{ width: `${completionPct}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Bar */}
        <div className="border-b border-gray-100 bg-white px-6 py-3 shrink-0 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={handleDownloadPDF} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary-50 text-primary-700 hover:bg-primary-100 transition-all cursor-pointer">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              {t('downloadPdf')}
            </button>
            <button onClick={handlePrint} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all cursor-pointer">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" /></svg>
              Print
            </button>
            <button onClick={() => { const s = encodeURIComponent('My HealthCalc.ai Meal Plan'); const b = encodeURIComponent(`Target: ${displayCalories} kcal\n\n${activeMealPlan.map(m => `${getMealName(m, language)}: ${m.description}`).join('\n')}`); window.open(`mailto:?subject=${s}&body=${b}`); }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-sage-50 text-sage-700 hover:bg-sage-100 transition-all cursor-pointer">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              {t('emailPlan')}
            </button>
          </div>
          <button onClick={() => setShowProgressTracker(!showProgressTracker)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            style={showProgressTracker ? { background: '#fef3c7', color: '#b45309' } : { background: '#f3f4f6', color: '#6b7280' }}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg>
            {t('progressTracker')}
          </button>
        </div>

        {/* Progress Tracker */}
        {showProgressTracker && (
          <div className="bg-amber-50 border-b border-amber-100 px-6 py-4 shrink-0">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-700">{t('dailyProgress')}</span>
                  <span className="text-xs font-bold text-amber-600">{completionPct}%</span>
                </div>
                <div className="h-3 bg-amber-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all" style={{ width: `${completionPct}%` }} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-amber-700">{completedCount}</p>
                <p className="text-[10px] font-semibold text-amber-500 uppercase">{activeMealPlan.length} {t('ofMeals')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Meal Cards */}
        <div className="overflow-y-auto flex-1 px-6 py-6" id="meal-plan-printable">
          {activeMealPlan.length === 0 ? (
            <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
              <span className="text-5xl mb-4">📋</span>
              <p className="font-extrabold text-gray-800 text-base">{language === 'ar' ? 'لا توجد بيانات تحاليل بعد' : 'No lab data yet'}</p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">{language === 'ar' ? 'أدخل نتائج فحص الدم من الصفحة الرئيسية ثم اضغط "تقييم وتوليد الخطة"' : 'Enter your blood test results on the main page, then click "Evaluate & Generate Plan".'}</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeMealPlan.map((meal, i) => (
              <div key={i} className="relative border rounded-2xl p-5 transition-all"
                style={completed[i]
                  ? { background: '#f0fdf4', borderColor: '#86efac' }
                  : { background: '#fff', borderColor: '#e5e7eb' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: '#f0f4ff', color: '#3b82f6' }}>
                    {mealIcons[meal.icon ?? 'meal'] || '🍽️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold" style={{ color: completed[i] ? '#15803d' : '#111827' }}>{getMealName(meal, language)}</h3>
                    <div className="flex items-center gap-1.5">
                      {meal.verified && (
                        <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold text-white" style={{ background: '#059669' }}>USDA ✓</span>
                      )}
                      <p className="text-xs" style={{ color: completed[i] ? '#86efac' : '#9ca3af' }}>{meal.calories} kcal</p>
                    </div>
                  </div>
                  <button onClick={() => toggleComplete(i)} className="w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer shrink-0"
                    style={completed[i]
                      ? { background: '#22c55e', borderColor: '#22c55e', color: '#fff' }
                      : { borderColor: '#e5e7eb', color: 'transparent' }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </button>
                </div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg" style={{ background: '#eff6ff', color: '#2563eb' }}>🥩 {meal.protein}g {t('proteinLabel')}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg" style={{ background: '#f0fdf4', color: '#16a34a' }}>🌾 {meal.carbs}g {t('carbsLabel')}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg" style={{ background: '#fffbeb', color: '#d97706' }}>🫒 {meal.fat}g {t('fatLabel')}</span>
                  {meal.saturatedFat != null && meal.saturatedFat > 0 && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg" style={{ background: '#fff1f2', color: '#e11d48' }}>🥩 Sat {meal.saturatedFat}g</span>
                  )}
                  {meal.cholesterol != null && meal.cholesterol > 0 && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg" style={{ background: '#fff7ed', color: '#c2410c' }}>🥚 Chol {meal.cholesterol}mg</span>
                  )}
                </div>
                <ul className="space-y-1.5">
                  {meal.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#86efac' }} />
                      {getFoodItemText(item, meal.nameAr, meal.nameEn, language)}
                    </li>
                  ))}
                </ul>
                <p className="text-xs mt-3 pt-3 border-t leading-relaxed" style={{ borderColor: '#f3f4f6', color: completed[i] ? '#86efac' : '#9ca3af' }}>
                  {meal.description}
                </p>
                {completed[i] && (
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg" style={{ background: '#dcfce7', color: '#15803d' }}>✓ {t('eaten')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          )}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 shrink-0 flex items-center justify-between rounded-b-2xl">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full" style={{ background: '#86efac' }} />
            {completedCount}/{activeMealPlan.length} {t('mealsCompleted')}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-all cursor-pointer">{t('close')}</button>
            <button onClick={onSave} className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              {t('saveProgress')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanModal;
