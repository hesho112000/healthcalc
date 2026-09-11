import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MealPlan } from '../../types';
import { FunnelGoal } from './GoalSelector';
import { translations } from '../../i18n/translations';

type TKey = keyof typeof translations.en;

interface FoodEntry {
  en: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: Record<string, boolean>;
  best: { en: string; ar: string };
  bestShort: { en: string; ar: string };
  reason: { en: string; ar: string };
  suitable: { loseFat?: 'yes' | 'moderate' | 'no'; gainMuscle?: 'yes' | 'moderate' | 'no' };
}

const EGYPTIAN_FOOD_DB: Record<string, FoodEntry> = {
  'فول': { en: 'Foul Medames', kcal: 120, protein: 7.5, carbs: 15, fat: 2, tags: { breakfast: true, lunch: true, dinner: false, snack: false }, best: { ar: 'فطار', en: 'Breakfast' }, bestShort: { ar: 'فطار', en: 'breakfast' }, reason: { ar: 'بروتين نباتي وألياف بيشبع الصبح', en: 'Plant protein and fiber keep you full all morning' }, suitable: { loseFat: 'yes', gainMuscle: 'yes' } },
  'كشري': { en: 'Koshari', kcal: 165, protein: 5.5, carbs: 28, fat: 2, tags: { breakfast: false, lunch: true, dinner: false, snack: false }, best: { ar: 'غدا (11ص - 4م)', en: 'Lunch (11am - 4pm)' }, bestShort: { ar: 'غدا', en: 'lunch' }, reason: { ar: 'كارب عالي محتاج تحرقه طول اليوم', en: 'High carb — you need to burn it through the day' }, suitable: { loseFat: 'moderate', gainMuscle: 'yes' } },
  'شاورما فراخ': { en: 'Chicken Shawarma', kcal: 250, protein: 20, carbs: 15, fat: 12, tags: { breakfast: false, lunch: true, dinner: true, snack: false }, best: { ar: 'غدا', en: 'Lunch' }, bestShort: { ar: 'غدا', en: 'lunch' }, reason: { ar: 'بروتين عالي ينفع غدا أو عشاء خفيف', en: 'High protein — great lunch or light dinner' }, suitable: { loseFat: 'yes' } },
  'طعمية': { en: 'Falafel', kcal: 330, protein: 13, carbs: 32, fat: 18, tags: { breakfast: true, lunch: false, dinner: false, snack: false }, best: { ar: 'فطار فقط - 3 قطع', en: 'Breakfast only - 3 pieces' }, bestShort: { ar: 'فطار', en: 'breakfast' }, reason: { ar: 'مقلية ودهون عالية', en: 'Fried and high in fat' }, suitable: { loseFat: 'no' } },
  'زبادي يوناني': { en: 'Greek Yogurt', kcal: 60, protein: 10, carbs: 4, fat: 0.5, tags: { breakfast: true, lunch: false, dinner: true, snack: true }, best: { ar: 'فطار أو عشاء أو سناك', en: 'Breakfast, dinner or snack' }, bestShort: { ar: 'سناك', en: 'snack' }, reason: { ar: 'خفيف وبروتين كازين يغذي العضلة بليل', en: 'Light casein protein feeds your muscles overnight' }, suitable: { loseFat: 'yes' } },
  'بيض': { en: 'Eggs', kcal: 140, protein: 12, carbs: 1, fat: 10, tags: { breakfast: true, lunch: true, dinner: false, snack: false }, best: { ar: 'فطار', en: 'Breakfast' }, bestShort: { ar: 'فطار', en: 'breakfast' }, reason: { ar: 'بروتين كامل مثالي للصبح', en: 'Complete protein — perfect for the morning' }, suitable: { loseFat: 'yes' } },
  'شوفان': { en: 'Oats', kcal: 68, protein: 2.5, carbs: 12, fat: 1, tags: { breakfast: true, lunch: false, dinner: false, snack: true }, best: { ar: 'فطار', en: 'Breakfast' }, bestShort: { ar: 'فطار', en: 'breakfast' }, reason: { ar: 'ألياف وكارب بطيء', en: 'Fiber and slow-release carbs' }, suitable: { loseFat: 'yes' } },
  'رز': { en: 'Rice', kcal: 130, protein: 2.5, carbs: 28, fat: 0.3, tags: { breakfast: false, lunch: true, dinner: false, snack: false }, best: { ar: 'غدا', en: 'Lunch' }, bestShort: { ar: 'غدا', en: 'lunch' }, reason: { ar: 'كارب سريع للطاقة', en: 'Quick carbs for energy' }, suitable: { loseFat: 'moderate' } },
  'فراخ مشوية': { en: 'Grilled Chicken', kcal: 165, protein: 31, carbs: 0, fat: 3.6, tags: { breakfast: false, lunch: true, dinner: true, snack: false }, best: { ar: 'غدا أو عشاء', en: 'Lunch or dinner' }, bestShort: { ar: 'غدا', en: 'lunch' }, reason: { ar: 'بروتين صافي', en: 'Pure protein' }, suitable: { loseFat: 'yes' } },
  'تونة': { en: 'Tuna', kcal: 144, protein: 30, carbs: 0, fat: 1, tags: { breakfast: false, lunch: true, dinner: true, snack: false }, best: { ar: 'غدا أو عشاء', en: 'Lunch or dinner' }, bestShort: { ar: 'غدا', en: 'lunch' }, reason: { ar: 'بروتين عالي جداً', en: 'Very high protein' }, suitable: { loseFat: 'yes' } },
};

type Suitability = 'yes' | 'moderate' | 'no';

interface ClassifiedFood {
  query: string;
  data: FoodEntry;
  suitability: Suitability;
  portion: string;
  grams: number;
}

const FALLBACK: FoodEntry = {
  en: 'Custom Food', kcal: 200, protein: 10, carbs: 20, fat: 8,
  tags: { breakfast: false, lunch: true, dinner: false, snack: false },
  best: { ar: 'غدا', en: 'Lunch' }, bestShort: { ar: 'غدا', en: 'lunch' },
  reason: { ar: 'تقديري', en: 'Estimated values' }, suitable: {},
};

const normArabic = (s: string) =>
  s.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[\u064B-\u0652]/g, '').trim();

const gramsFrom = (portion: string): number => {
  const m = portion.match(/\d+/);
  return m ? parseInt(m[0], 10) : 100;
};

interface FoodCheckerProps {
  selectedGoals: FunnelGoal[];
  onAddMeal: (meal: MealPlan) => void;
}

const FoodChecker: React.FC<FoodCheckerProps> = ({ selectedGoals, onAddMeal }) => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ClassifiedFood | null>(null);
  const [customTime, setCustomTime] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | null>(null);

  const classify = (rawQuery: string): ClassifiedFood => {
    const target = normArabic(rawQuery.toLowerCase());
    const keyMatch = Object.keys(EGYPTIAN_FOOD_DB).find((k) => normArabic(k.toLowerCase()).includes(target) || target.includes(normArabic(k.toLowerCase())));
    const enMatch = Object.keys(EGYPTIAN_FOOD_DB).find((k) => EGYPTIAN_FOOD_DB[k].en.toLowerCase().includes(rawQuery.toLowerCase()));
    const data = (keyMatch || enMatch ? EGYPTIAN_FOOD_DB[keyMatch || enMatch!] : FALLBACK);

    let suitability: Suitability = 'yes';
    if (selectedGoals.includes('lose_fat')) {
      suitability = data.suitable.loseFat ?? 'yes';
      if (data.fat > 15) suitability = suitability === 'yes' ? 'moderate' : 'no';
      if (data.kcal > 300 && data.fat > 15) suitability = 'no';
    } else if (selectedGoals.includes('gain_weight')) {
      suitability = 'yes';
    } else if (selectedGoals.includes('gain_muscle')) {
      suitability = data.suitable.gainMuscle ?? 'yes';
    }

    let portion = '100g';
    if (selectedGoals.includes('lose_fat')) portion = data.kcal > 200 ? '100-150g' : '200g';
    else if (selectedGoals.includes('gain_weight')) portion = '250-300g';
    else if (selectedGoals.includes('gain_muscle')) portion = '150-200g';
    else portion = '150g';

    return { query: rawQuery, data, suitability, portion, grams: gramsFrom(portion) };
  };

  const handleCheck = () => {
    if (!query.trim()) return;
    setResult(classify(query.trim()));
    setCustomTime(null);
  };

  const bag = (active: boolean, key: TKey) => (
    <span key={key} className={`px-2 py-1 rounded-full text-[11px] font-semibold ${active ? 'bg-[#0F4C3A] text-white' : 'bg-white border'}`}>{t(key)}</span>
  );

  const suitLabel = (s: Suitability) => (s === 'yes' ? t('wlcYes') : s === 'moderate' ? t('wlcModerate') : t('wlcNo'));

  const timeWord = customTime ?? (result?.data.tags.dinner ? 'dinner' : result?.data.tags.lunch ? 'lunch' : result?.data.tags.breakfast ? 'breakfast' : 'snack');

  const addMeal = () => {
    if (!result) return;
    const { data, grams } = result;
    const name = language === 'ar' ? result.query : data.en;
    const scale = grams / 100;
    onAddMeal({
      meal: data.en,
      icon: 'meal',
      calories: Math.round(data.kcal * scale),
      protein: Math.round(data.protein * scale),
      carbs: Math.round(data.carbs * scale),
      fat: Math.round(data.fat * scale),
      items: [name],
      description: language === 'ar' ? data.reason.ar : data.reason.en,
      nameAr: result.query,
      nameEn: data.en,
      verified: result.query !== FALLBACK.en ? undefined : undefined,
    });
  };

  const addTimeLabel = timeWord === 'breakfast' ? t('wlcBadgeBreakfast').replace(/[🍎☀️🌙🌅]/g, '').trim() : timeWord === 'lunch' ? t('wlcBadgeLunch').replace(/[🍎☀️🌙🌅]/g, '').trim() : timeWord === 'dinner' ? t('wlcBadgeDinner').replace(/[🍎☀️🌙🌅]/g, '').trim() : t('wlcBadgeSnack').replace(/[🍎☀️🌙🌅]/g, '').trim();

  return (
    <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
      <h4 className="font-bold text-gray-900 flex items-center gap-2">🔍 {t('wlcTitle')}</h4>
      <p className="text-sm text-gray-500 mt-1">{t('wlcSub')}</p>

      <div className="mt-3 flex gap-2">
        <input
          id="foodCheckerInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          placeholder={t('wlcPlaceholder')}
          className="flex-1 h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
        />
        <button
          type="button"
          onClick={handleCheck}
          className="h-11 px-6 bg-[#0F4C3A] text-white rounded-xl font-semibold text-sm hover:bg-[#0b3a2c] transition-colors"
        >
          {t('wlcCheck')}
        </button>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-white rounded-xl border-2 border-[#E3E0D8] shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-gray-900">{FALLBACK.en === result.data.en ? result.query : `${result.data.en} - ${result.query}`}</div>
              <div className="mt-1.5 flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  result.suitability === 'yes' ? 'bg-[#EAF2EE] text-[#0F4C3A]' : result.suitability === 'moderate' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                }`}>{suitLabel(result.suitability)}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 text-right">{t('wlcPer100')}</div>
          </div>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 bg-gray-50 rounded-lg text-center"><div className="text-[10px] text-gray-500">{t('wlcCalories')}</div><div className="font-bold text-gray-900 text-sm">{result.data.kcal} kcal</div></div>
            <div className="p-2.5 bg-[#F4F1EB] rounded-lg text-center"><div className="text-[10px] text-gray-500">{t('wlcProtein')}</div><div className="font-bold text-[#0F4C3A] text-sm">{result.data.protein}g</div></div>
            <div className="p-2.5 bg-blue-50 rounded-lg text-center"><div className="text-[10px] text-gray-500">{t('wlcCarbs')}</div><div className="font-bold text-blue-700 text-sm">{result.data.carbs}g</div></div>
            <div className="p-2.5 bg-amber-50 rounded-lg text-center"><div className="text-[10px] text-gray-500">{t('wlcFat')}</div><div className="font-bold text-amber-700 text-sm">{result.data.fat}g</div></div>
          </div>

          <div className="mt-3 p-3 bg-[#F4F1EB] rounded-lg border border-[#E3E0D8]">
            <div className="text-sm font-bold text-[#0F4C3A]">🕐 {t('wlcBestTime')} <span>{language === 'ar' ? result.data.best.ar : result.data.best.en}</span></div>
            <div className="text-xs text-[#0F4C3A] mt-1">{language === 'ar' ? result.data.reason.ar : result.data.reason.en}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {bag(!!result.data.tags.breakfast, 'wlcBadgeBreakfast')}
              {bag(!!result.data.tags.lunch, 'wlcBadgeLunch')}
              {bag(!!result.data.tags.dinner, 'wlcBadgeDinner')}
              {bag(!!result.data.tags.snack, 'wlcBadgeSnack')}
            </div>
            <div className="mt-2 text-xs font-semibold text-[#0F4C3A]">
              💡 {t('wlcPortionLabel')} <span>{result.portion} = {Math.round(result.data.kcal * result.grams / 100)} kcal</span>
            </div>
          </div>

          <button
            type="button"
            onClick={addMeal}
            className="mt-3 w-full h-10 bg-white border-2 border-[#0F4C3A] text-[#0F4C3A] rounded-xl text-sm font-bold hover:bg-[#F4F1EB] transition-colors"
          >
            {t('wlcAdd').replace('{time}', addTimeLabel)}
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodChecker;