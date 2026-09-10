import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { kitchensRegistry, totalDishesAll } from '../data/kitchens';
import type { KitchenInfo, KitchenDish, KitchenCategory } from '../data/kitchens';

type Step = 1 | 2 | 3 | 4 | 5;
type Sex = 'male' | 'female';
type PlanType = 'nutrition' | 'fitness' | 'both';
type ActivityKey = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type GoalKey = 'lose' | 'gain_muscle' | 'gain_weight' | 'wellness' | 'athletic';
type DietLevel = 'normal' | 'medium' | 'harsh';

interface Workout {
  id: string;
  name: string;
  days: number;
  dur: string;
  focus: string;
  burn: number;
  level: string;
}

interface ExerciseType {
  id: string;
  name: string;
  en: string;
  emoji: string;
  burn: string;
  focus: string;
}

interface PlannedExercise {
  id: string;
  type: string;
  name: string;
  sets: string;
  reps: string;
  dur: string;
  emoji: string;
}

interface DietIntensity {
  id: string;
  label: string;
  short: string;
  emoji: string;
  deficit: number;
  surplus: number;
  rate: string;
  desc: string;
  workoutMod: number;
  proteinFactor: number;
  level: DietLevel;
  healthyOnly: boolean;
  warning?: string;
}

const ACTIVITY: Record<ActivityKey, { factor: number; label: string; desc: string; emoji: string }> = {
  sedentary: { factor: 1.2, label: 'خامل', desc: 'مكتبي - بدون رياضة', emoji: '🛋️' },
  light: { factor: 1.375, label: 'خفيف', desc: '1-3 أيام / أسبوع', emoji: '🚶' },
  moderate: { factor: 1.55, label: 'متوسط', desc: '3-5 أيام / أسبوع', emoji: '🏃' },
  active: { factor: 1.725, label: 'نشط', desc: '6-7 أيام / أسبوع', emoji: '💪' },
  very_active: { factor: 1.9, label: 'نشط جدا', desc: 'عمل شاق + رياضة', emoji: '🔥' },
};

const ACTIVITY_ORDER: ActivityKey[] = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

const WORKOUTS: Workout[] = [
  { id: 'full_body', name: 'Full Body 3x', days: 3, dur: '45د', focus: 'كل الجسم', burn: 150, level: 'مبتدئ' },
  { id: 'upper_lower', name: 'Upper/Lower 4x', days: 4, dur: '50د', focus: 'علوي/سفلي', burn: 200, level: 'متوسط' },
  { id: 'ppl', name: 'PPL 5x', days: 5, dur: '60د', focus: 'Push Pull Legs', burn: 250, level: 'متقدم' },
  { id: 'bodyweight_only', name: 'وزن الجسم فقط 3x', days: 3, dur: '30د', focus: 'بدون أدوات', burn: 160, level: 'مبتدئ' },
  { id: 'bro_split', name: 'Bro Split 5x', days: 5, dur: '60د', focus: 'عضلة يومياً', burn: 220, level: 'متقدم' },
  { id: 'custom', name: 'مخصص بحسب روتينك', days: 4, dur: '45د', focus: 'حسب اختيارك', burn: 180, level: 'مخصص' },
];

const EXERCISE_TYPES: ExerciseType[] = [
  { id: 'cardio', name: 'كارديو', en: 'Cardio', emoji: '🏃', burn: '300-500', focus: 'حرق دهون' },
  { id: 'strength', name: 'قوة وحديد', en: 'Strength', emoji: '🏋️', burn: '200-350', focus: 'بناء عضل' },
  { id: 'hiit', name: 'هايت HIIT', en: 'HIIT', emoji: '⚡', burn: '400-600', focus: 'حرق سريع' },
  { id: 'yoga', name: 'يوجا', en: 'Yoga', emoji: '🧘', burn: '150-250', focus: 'مرونة وتوازن' },
  { id: 'pilates', name: 'بيلاتس', en: 'Pilates', emoji: '🤸', burn: '200-300', focus: 'قوة مركزية' },
  { id: 'tai_chi', name: 'تاي تشي', en: 'Tai Chi', emoji: '☯️', burn: '150-200', focus: 'توازن وهدوء' },
  { id: 'crossfit', name: 'كروس فيت', en: 'CrossFit', emoji: '💥', burn: '350-500', focus: 'لياقة وظيفية' },
  { id: 'swimming', name: 'سباحة', en: 'Swimming', emoji: '🏊', burn: '300-450', focus: 'كل الجسم' },
  { id: 'cycling', name: 'دراجة', en: 'Cycling', emoji: '🚴', burn: '250-400', focus: 'أرجل وكارديو' },
  { id: 'running', name: 'جري', en: 'Running', emoji: '🏃‍♂️', burn: '350-500', focus: 'تحمل' },
  { id: 'boxing', name: 'ملاكمة', en: 'Boxing', emoji: '🥊', burn: '400-600', focus: 'قوة ورد فعل' },
  { id: 'dance', name: 'رقص زومبا', en: 'Dance', emoji: '💃', burn: '250-400', focus: 'حرق ومرح' },
  { id: 'calisthenics', name: 'وزن الجسم', en: 'Calisthenics', emoji: '🤾', burn: '200-350', focus: 'قوة بدون معدات' },
];

const EXERCISE_PRESETS: Record<string, PlannedExercise[]> = {
  cardio: [
    { id: 'cx1', type: 'cardio', name: 'جري خفيف', sets: '1', reps: '-', dur: '20 د', emoji: '🏃' },
    { id: 'cx2', type: 'cardio', name: 'نط حبل', sets: '3', reps: '60 ث', dur: '12 د', emoji: '🤸' },
  ],
  strength: [
    { id: 'st1', type: 'strength', name: 'سكوات بار', sets: '4', reps: '8-12', dur: '15 د', emoji: '🏋️' },
    { id: 'st2', type: 'strength', name: 'ديدليفت', sets: '4', reps: '6-10', dur: '15 د', emoji: '🏋️' },
    { id: 'st3', type: 'strength', name: 'بنش برس', sets: '4', reps: '8-10', dur: '12 د', emoji: '🏋️' },
  ],
  hiit: [
    { id: 'hi1', type: 'hiit', name: 'بيربي Burpee', sets: '4', reps: '15', dur: '8 د', emoji: '⚡' },
    { id: 'hi2', type: 'hiit', name: 'Mountain Climber', sets: '3', reps: '30 ث', dur: '6 د', emoji: '⚡' },
  ],
  yoga: [
    { id: 'yo1', type: 'yoga', name: 'تحية الشمس', sets: '3', reps: '5', dur: '10 د', emoji: '🧘' },
    { id: 'yo2', type: 'yoga', name: 'وضعية المحارب', sets: '2', reps: '30 ث', dur: '6 د', emoji: '🧘' },
  ],
  pilates: [{ id: 'pi1', type: 'pilates', name: 'The Hundred', sets: '3', reps: '10', dur: '8 د', emoji: '🤸' }],
  tai_chi: [{ id: 'ta1', type: 'tai_chi', name: 'تاي تشي تنفس', sets: '1', reps: '-', dur: '20 د', emoji: '☯️' }],
  crossfit: [{ id: 'cr1', type: 'crossfit', name: 'WOD فرح', sets: '5', reps: 'AMRAP', dur: '20 د', emoji: '💥' }],
  swimming: [{ id: 'sw1', type: 'swimming', name: 'سباحة حرة 400م', sets: '2', reps: '-', dur: '25 د', emoji: '🏊' }],
  cycling: [{ id: 'cy1', type: 'cycling', name: 'دراجة ثابتة', sets: '1', reps: '-', dur: '30 د', emoji: '🚴' }],
  running: [{ id: 'rn1', type: 'running', name: 'جري فترات', sets: '6', reps: '400م', dur: '25 د', emoji: '🏃‍♂️' }],
  boxing: [{ id: 'bx1', type: 'boxing', name: 'شادو بوكسينج', sets: '3', reps: '3 د', dur: '12 د', emoji: '🥊' }],
  dance: [{ id: 'dn1', type: 'dance', name: 'زومبا', sets: '1', reps: '-', dur: '30 د', emoji: '💃' }],
  calisthenics: [
    { id: 'ca1', type: 'calisthenics', name: 'بوش أب', sets: '4', reps: '15', dur: '8 د', emoji: '🤾' },
    { id: 'ca2', type: 'calisthenics', name: 'بول أب', sets: '4', reps: '8', dur: '8 د', emoji: '🤾' },
  ],
};

const DIETS: Record<GoalKey, DietIntensity[]> = {
  lose: [
    { id: 'normal_lose', label: 'رجيم عادي - نزول صحي', short: 'عادي', emoji: '🟢', deficit: 300, surplus: 0, rate: '0.25 كجم/أسبوع', desc: 'نزول بطيء صحي', workoutMod: 1.0, proteinFactor: 1.2, level: 'normal', healthyOnly: false },
    { id: 'medium_lose', label: 'متوسط - نزول متوسط', short: 'متوسط', emoji: '🟡', deficit: 500, surplus: 0, rate: '0.5 كجم/أسبوع', desc: 'الأكثر شيوعاً', workoutMod: 1.1, proteinFactor: 1.6, level: 'medium', healthyOnly: false },
    { id: 'harsh_lose', label: 'قاسي - نزول سريع', short: 'قاسي', emoji: '🔴', deficit: 800, surplus: 0, rate: '0.8-1 كجم/أسبوع', desc: 'سريع لكن يحتاج متابعة', workoutMod: 1.3, proteinFactor: 2.0, level: 'harsh', healthyOnly: true, warning: 'استشر طبيب' },
  ],
  gain_muscle: [
    { id: 'lean_bulk', label: 'Lean Bulk - بناء نظيف', short: 'Lean', emoji: '🟢', deficit: 0, surplus: 250, rate: '+0.25 كجم/أسبوع', desc: 'زيادة عضل نظيفة', workoutMod: 1.2, proteinFactor: 2.0, level: 'normal', healthyOnly: false },
    { id: 'moderate_bulk', label: 'Moderate Bulk - زيادة متوازنة', short: 'Moderate', emoji: '🟡', deficit: 0, surplus: 400, rate: '+0.4 كجم/أسبوع', desc: 'زيادة متوازنة', workoutMod: 1.3, proteinFactor: 2.0, level: 'medium', healthyOnly: false },
    { id: 'aggressive_bulk', label: 'Aggressive Bulk - تضخيم سريع', short: 'Aggressive', emoji: '🔴', deficit: 0, surplus: 600, rate: '+0.6 كجم/أسبوع', desc: 'تضخيم سريع', workoutMod: 1.5, proteinFactor: 2.2, level: 'harsh', healthyOnly: false },
  ],
  gain_weight: [
    { id: 'normal_gain', label: 'زيادة عادية - نظيفة', short: 'عادي', emoji: '🟢', deficit: 0, surplus: 250, rate: '+0.25 كجم/أسبوع', desc: 'زيادة وزن صحية', workoutMod: 1.2, proteinFactor: 1.8, level: 'normal', healthyOnly: false },
    { id: 'medium_gain', label: 'زيادة متوسطة', short: 'متوسط', emoji: '🟡', deficit: 0, surplus: 400, rate: '+0.4 كجم/أسبوع', desc: 'زيادة متوازنة', workoutMod: 1.3, proteinFactor: 2.0, level: 'medium', healthyOnly: false },
    { id: 'harsh_gain', label: 'زيادة قاسية - تضخيم سريع', short: 'قاسي', emoji: '🔴', deficit: 0, surplus: 600, rate: '+0.6 كجم/أسبوع', desc: 'تضخيم سريع', workoutMod: 1.5, proteinFactor: 2.2, level: 'harsh', healthyOnly: false },
  ],
  wellness: [
    { id: 'well_balanced', label: 'Balanced - متوازن', short: 'Balanced', emoji: '🟢', deficit: 0, surplus: 0, rate: '0 كجم/أسبوع', desc: 'متوازن تماماً', workoutMod: 1.0, proteinFactor: 1.4, level: 'normal', healthyOnly: true },
    { id: 'well_deficit', label: 'Slight Deficit - عجز خفيف', short: 'Deficit', emoji: '🟡', deficit: 200, surplus: 0, rate: '-0.2 كجم/أسبوع', desc: 'عجز خفيف صحي', workoutMod: 1.1, proteinFactor: 1.6, level: 'medium', healthyOnly: true },
    { id: 'well_surplus', label: 'Slight Surplus - فائض خفيف', short: 'Surplus', emoji: '🔵', deficit: 0, surplus: 200, rate: '+0.2 كجم/أسبوع', desc: 'فائض خفيف', workoutMod: 1.1, proteinFactor: 1.5, level: 'medium', healthyOnly: false },
  ],
  athletic: [
    { id: 'ath_endurance', label: 'تحمّل Endurance', short: 'Endurance', emoji: '🟢', deficit: 0, surplus: 100, rate: 'أداء متوازن', desc: 'تغذية تحمّل', workoutMod: 1.2, proteinFactor: 1.6, level: 'normal', healthyOnly: false },
    { id: 'ath_strength', label: 'قوة Strength', short: 'Strength', emoji: '🟡', deficit: 0, surplus: 200, rate: 'أداء قوة', desc: 'بروتين أعلى', workoutMod: 1.3, proteinFactor: 1.8, level: 'medium', healthyOnly: false },
    { id: 'ath_peak', label: 'أداء عالي Peak', short: 'Peak', emoji: '🔴', deficit: 0, surplus: 300, rate: 'أداء احترافي', desc: 'سعرات عالية', workoutMod: 1.5, proteinFactor: 2.0, level: 'harsh', healthyOnly: false },
  ],
};

const GOAL_ICONS: Record<GoalKey, string> = { lose: '⚖️', gain_muscle: '💪', gain_weight: '📈', wellness: '✨', athletic: '🏃' };
const GOAL_ORDER: GoalKey[] = ['lose', 'gain_muscle', 'gain_weight', 'wellness', 'athletic'];

const signedDelta = (g: GoalKey, d: DietIntensity): number => {
  if (g === 'wellness') return d.deficit ? -d.deficit : d.surplus ? d.surplus : 0;
  if (g === 'lose') return -d.deficit;
  return d.surplus || 0;
};

const getDiet = (g: GoalKey, id: string): DietIntensity => DIETS[g].find((d) => d.id === id) ?? DIETS[g][0];

function filterDishes(kitchen: KitchenInfo, diet: DietIntensity, goal: GoalKey): KitchenDish[] {
  const dishes = kitchen.dishes;
  if (!dishes.length) return [];
  if (goal === 'lose') {
    if (diet.level === 'harsh') {
      const f = dishes.filter((x) => x.healthy && x.cal_100 <= 150 && x.confidence >= 85);
      return f.length ? f : dishes.filter((x) => x.cal_100 <= 180);
    }
    if (diet.level === 'medium') {
      const f = dishes.filter((x) => x.cal_100 <= 220);
      return f.length ? f : dishes;
    }
    const f = dishes.filter((x) => x.cal_100 <= 250);
    return f.length ? f : dishes;
  }
  if (goal === 'gain_muscle' || goal === 'gain_weight') {
    const sorted = [...dishes].sort((a, b) => b.p - a.p || b.cal_100 - a.cal_100);
    if (diet.level === 'harsh') {
      const f = sorted.filter((x) => x.p >= 5);
      return f.length ? f : sorted;
    }
    if (diet.level === 'medium') {
      const f = sorted.filter((x) => x.p >= 4);
      return f.length ? f : sorted;
    }
    return sorted;
  }
  if (goal === 'wellness') {
    const sorted = [...dishes].sort((a, b) => b.p - a.p || b.cal_100 - a.cal_100);
    if (diet.healthyOnly) {
      const f = dishes.filter((x) => x.healthy);
      return f.length ? f : sorted;
    }
    const f = dishes.filter((x) => x.cal_100 >= 120);
    return f.length ? f : sorted;
  }
  const sorted = [...dishes].sort((a, b) => b.p - a.p || b.cal_100 - a.cal_100);
  return sorted;
}

function portionGrams(diet: DietIntensity, goal: GoalKey): number {
  if (goal === 'lose') {
    if (diet.level === 'harsh') return 150;
    if (diet.level === 'medium') return 175;
    return 200;
  }
  if (goal === 'gain_muscle' || goal === 'gain_weight' || goal === 'athletic') {
    if (diet.level === 'harsh') return 300;
    if (diet.level === 'medium') return 280;
    return 250;
  }
  return 200;
}

function pickPlate(pool: KitchenDish[]): KitchenDish[] {
  if (!pool.length) return [];
  const light = [...pool].sort((a, b) => a.cal_100 - b.cal_100 || b.p - a.p);
  const heavy = [...pool].sort((a, b) => b.p - a.p || b.cal_100 - a.cal_100);
  const breakfast = light.find((x) => x.healthy) ?? light[0];
  const snack = light.find((x) => x !== breakfast && x.cal_100 <= 180) ?? light[1] ?? light[0];
  const lunch = heavy[0];
  const dinner = light.find((x) => x !== breakfast && x !== lunch && x !== snack) ?? heavy[1] ?? light[light.length - 1];
  return [breakfast, lunch, dinner, snack];
}

const FEATURED_KITCHEN_IDS = ['egyptian', 'tunisian', 'diet-keto', 'diet-vegan', 'diet-high-protein', 'diet-mediterranean', 'diet-low-carb'];

const MEAL_LABELS: Record<string, string> = {
  breakfast: 'فطار 🍳',
  lunch: 'غدا 🍲',
  dinner: 'عشاء 🍽️',
  side: 'أطباق جانبية 🥗',
  salad: 'سلطات 🥬',
  fruit: 'فواكه 🍉',
  juice: 'عصائر 🧃',
  dessert: 'حلويات 🍮',
  snacks: 'سناكس 🍿',
  soup: 'شوربة 🥣',
  main: 'أطباق رئيسية 🥘',
};

function getKitchenCategories(k: KitchenInfo): KitchenCategory[] {
  if (k.categories && k.categories.length) return k.categories;
  const groups = new Map<string, KitchenDish[]>();
  for (const d of k.dishes) {
    const key = d.mealType && d.mealType !== 'main' ? d.mealType : 'main';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(d);
  }
  const arr = [...groups.entries()].map(([id, ds]) => ({ id, name_ar: MEAL_LABELS[id] ?? id, count: ds.length, dishes: ds }));
  return arr.length ? arr : [{ id: 'all', name_ar: 'جميع الأطباق', count: k.total, dishes: k.dishes }];
}

type MealKey = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

interface MealDefinition {
  label: string;
  emoji: string;
  filter: (cat: KitchenCategory, dish: KitchenDish) => boolean;
}

const MEAL_MAP: Record<MealKey, MealDefinition> = {
  breakfast: {
    label: 'الفطار',
    emoji: '🌅',
    filter: (cat, dish) => {
      const cn = cat.name_ar;
      const dn = dish.name;
      return (
        cn.includes('فطور') ||
        cn.includes('فطار') ||
        cn.includes('أجبان') ||
        cn.includes('ألبان') ||
        cn.includes('مقبلات') ||
        cn.includes('معجنات') ||
        cn.includes('مخبوزات') ||
        cn.includes('عيش') ||
        (cn.includes('عصائر') && dish.cal_100 < 50) ||
        dn.includes('فول') ||
        dn.includes('طعمية') ||
        dn.includes('بيض') ||
        dn.includes('جبنة') ||
        dn.includes('عيش') ||
        dn.includes('شاي') ||
        dn.includes('عصير برتقال') ||
        dn.includes('ليمون')
      );
    },
  },
  lunch: {
    label: 'الغداء',
    emoji: '🌞',
    filter: (cat, dish) => {
      const cn = cat.name_ar;
      return (
        cn.includes('لحوم') ||
        cn.includes('طيور') ||
        cn.includes('دواجن') ||
        cn.includes('أسماك') ||
        cn.includes('بحرية') ||
        cn.includes('نشويات') ||
        cn.includes('أرز') ||
        cn.includes('محاشي') ||
        cn.includes('مكرون') ||
        cn.includes('كسكسي') ||
        cn.includes('مسفوف') ||
        cn.includes('مرقة') ||
        cn.includes('يخنات') ||
        cn.includes('ملوخية') ||
        cn.includes('رئيسية') ||
        cn.includes('غدا') ||
        (dish.cal_serv >= 200 && dish.cal_serv <= 550 && !cn.includes('حلويات') && !cn.includes('عصائر') && !cn.includes('مشروبات'))
      );
    },
  },
  dinner: {
    label: 'العشاء',
    emoji: '🌙',
    filter: (cat, dish) => {
      const cn = cat.name_ar;
      const dn = dish.name;
      return (
        cn.includes('شوربة') ||
        cn.includes('شوربات') ||
        cn.includes('سلطة') ||
        cn.includes('سلطات') ||
        cn.includes('عشاء') ||
        cn.includes('جانبية') ||
        dn.includes('شوربة') ||
        dn.includes('سلطة') ||
        (dish.healthy && dish.cal_serv < 250)
      );
    },
  },
  snacks: {
    label: 'سناك',
    emoji: '🍪',
    filter: (cat, dish) => {
      const cn = cat.name_ar;
      return (
        cn.includes('حلويات') ||
        cn.includes('عصائر') ||
        cn.includes('مشروبات') ||
        cn.includes('فواكه') ||
        cn.includes('سناكس') ||
        cn.includes('بريك') ||
        cn.includes('المقبلات المقلية') ||
        dish.serv_g <= 60
      );
    },
  },
};

const MEAL_NAMES: Record<MealKey, string> = { breakfast: 'فطار', lunch: 'غدا', dinner: 'عشاء', snacks: 'سناك' };

const EGYPTIAN_MEAL: Record<MealKey, MealDefinition['filter']> = {
  breakfast: (cat, dish) => {
    const cn = cat.name_ar;
    const dn = dish.name;
    if (cn.includes('سادساً')) return true;
    if (cn.includes('سابعاً') && dish.cal_serv <= 40) return true;
    if (cn.includes('عاشراً') && (dn.includes('شاي') || dn.includes('حلبة') || dn.includes('عصير برتقال') || dn.includes('ليمون بالنعناع'))) return true;
    if (cn.includes('ثامناً') && (dn.includes('الخبز البلدي') || dn.includes('عيش الشامي'))) return true;
    return false;
  },
  lunch: (cat) => {
    const cn = cat.name_ar;
    return cn.includes('ثانياً') || cn.includes('ثالثاً') || cn.includes('رابعاً') || cn.includes('خامساً');
  },
  dinner: (cat) => {
    const cn = cat.name_ar;
    return cn.includes('أولاً') || cn.includes('سابعاً');
  },
  snacks: (cat, dish) => {
    const cn = cat.name_ar;
    return cn.includes('تاسعاً') || (cn.includes('عاشراً') && dish.cal_serv >= 100) || (cn.includes('ثامناً') && dish.serv_g <= 40);
  },
};

const TUNISIAN_MEAL: Record<MealKey, MealDefinition['filter']> = {
  breakfast: (cat, dish) => {
    const cn = cat.name_ar;
    const dn = dish.name;
    if (cn.includes('ثانياً') && dish.cal_serv <= 60) return true;
    if (cn.includes('ثانياً') && dn.includes('بسطرمة بالبيض')) return true;
    if (cn.includes('ثالثاً') && dn.includes('بريك البيض والبطاطس')) return true;
    if (cn.includes('ثامناً') && (dn.includes('الطابونة') || dn.includes('الشعير الصحي') || dn.includes('البذرات') || dn.includes('الدائري') || dn.includes('الباغات'))) return true;
    if (cn.includes('عاشراً') && (dn.includes('قهوة') || dn.includes('شاي') || dn.includes('برتقال') || dn.includes('رمان') || dn.includes('تين شوكي'))) return true;
    return false;
  },
  lunch: (cat) => {
    const cn = cat.name_ar;
    return cn.includes('أولاً') || cn.includes('رابعاً') || cn.includes('خامساً') || cn.includes('سادساً') || cn.includes('سابعاً');
  },
  dinner: (cat, dish) => {
    const cn = cat.name_ar;
    return (cn.includes('أولاً') && dish.cal_serv < 120) || (cn.includes('ثانياً') && dish.cal_serv < 60);
  },
  snacks: (cat, dish) => {
    const cn = cat.name_ar;
    return cn.includes('تاسعاً') || (cn.includes('عاشراً') && dish.cal_serv >= 100);
  },
};

function getMealFilter(k: KitchenInfo, key: MealKey): MealDefinition['filter'] {
  if (k.id === 'egyptian') return EGYPTIAN_MEAL[key];
  if (k.id === 'tunisian') return TUNISIAN_MEAL[key];
  return MEAL_MAP[key].filter;
}

const MEAL_TABS: { key: MealKey; label: string; emoji: string }[] = [
  { key: 'breakfast', label: 'فطار', emoji: '🍳' },
  { key: 'lunch', label: 'غدا', emoji: '🍛' },
  { key: 'dinner', label: 'عشا', emoji: '🌙' },
  { key: 'snacks', label: 'سناك', emoji: '🍎' },
];

const MEAL_ORDER: MealKey[] = ['breakfast', 'lunch', 'dinner', 'snacks'];

function getMealTypesForDish(k: KitchenInfo, cat: KitchenCategory, dish: KitchenDish): MealKey[] {
  const types: MealKey[] = [];
  for (const key of MEAL_ORDER) {
    if (getMealFilter(k, key)(cat, dish)) types.push(key);
  }
  return types.length ? types : ['lunch'];
}

function dishesForMeal(k: KitchenInfo, key: MealKey): KitchenDish[] {
  const fn = getMealFilter(k, key);
  const out: KitchenDish[] = [];
  for (const cat of getKitchenCategories(k)) {
    for (const d of cat.dishes) {
      if (fn(cat, d)) out.push(d);
    }
  }
  return out.filter((d, i, a) => a.findIndex((x) => x.name === d.name) === i);
}

const BodyFigure: React.FC<{ kind: Sex }> = ({ kind }) => (
  <svg viewBox="0 0 100 160" className="h-[70px] w-[46px] shrink-0 overflow-visible" aria-hidden="true">
    <defs>
      <linearGradient id={`gb${kind === 'male' ? 'M' : 'F'}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2a7a5d" />
        <stop offset="0.5" stopColor="#0F4C3A" />
        <stop offset="1" stopColor="#0b3a2c" />
      </linearGradient>
    </defs>
    {kind === 'male' ? (
      <g fill="url(#gbM)">
        <circle cx="50" cy="20" r="15" />
        <rect x="44" y="32" width="12" height="9" rx="4.5" />
        <rect x="36" y="40" width="28" height="54" rx="13" />
        <rect x="25" y="46" width="9" height="52" rx="4.5" />
        <rect x="66" y="46" width="9" height="52" rx="4.5" />
        <rect x="42" y="94" width="9" height="52" rx="4.5" />
        <rect x="49" y="94" width="9" height="52" rx="4.5" />
        <ellipse cx="46.5" cy="146" rx="7" ry="4" />
        <ellipse cx="53.5" cy="146" rx="7" ry="4" />
      </g>
    ) : (
      <g fill="url(#gbF)">
        <circle cx="50" cy="20" r="14" />
        <rect x="45" y="32" width="10" height="8" rx="4" />
        <rect x="40" y="39" width="20" height="26" rx="10" />
        <rect x="45" y="62" width="10" height="9" rx="4" />
        <path d="M45 71 L55 71 L70 128 L30 128 Z" />
        <rect x="27" y="46" width="8" height="44" rx="4" />
        <rect x="65" y="46" width="8" height="44" rx="4" />
        <rect x="42" y="128" width="7" height="18" rx="3.5" />
        <rect x="51" y="128" width="7" height="18" rx="3.5" />
        <ellipse cx="45.5" cy="146" rx="7" ry="4" />
        <ellipse cx="54.5" cy="146" rx="7" ry="4" />
      </g>
    )}
    <ellipse cx="50" cy={kind === 'male' ? 58 : 55} rx="5" ry={kind === 'male' ? 14 : 10} fill="#ffffff" opacity="0.28" />
  </svg>
);

const WeightLossPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>(1);
  const [planType, setPlanType] = useState<PlanType>('both');
  const [age, setAge] = useState('26');
  const [sex, setSex] = useState<Sex>('male');
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [activity, setActivity] = useState<ActivityKey>('moderate');
  const [goal, setGoal] = useState<GoalKey>('lose');
  const [targetWeight, setTargetWeight] = useState('75');
  const [timeline, setTimeline] = useState('12');
  const [selectedKitchenId, setSelectedKitchenId] = useState<string>('egyptian');
  const [workout, setWorkout] = useState('full_body');
  const [exerciseTypes, setExerciseTypes] = useState<string[]>(['cardio', 'strength']);
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [selectedExerciseSearch, setSelectedExerciseSearch] = useState('');
  const [plannedExercises, setPlannedExercises] = useState<PlannedExercise[]>(() => {
    const saved = localStorage.getItem('hc_planned_exercises');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (Array.isArray(p) && p.length) return p as PlannedExercise[];
      } catch {
        /* ignore */
      }
    }
    return [...(EXERCISE_PRESETS.cardio ?? []), ...(EXERCISE_PRESETS.strength ?? [])];
  });
  const [kitchenSearch, setKitchenSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [kitchenMode, setKitchenMode] = useState<'manual' | 'auto'>('auto');
  const [categoryMode, setCategoryMode] = useState<'manual' | 'auto'>('manual');
  const [exerciseMode, setExerciseMode] = useState<'manual' | 'auto'>('auto');
  const [mealTab, setMealTab] = useState<MealKey>('breakfast');
  const [countryMode, setCountryMode] = useState<'egyptian' | 'tunisian' | 'both'>('egyptian');
  const [dishSearch, setDishSearch] = useState('');
  const [savedSearch, setSavedSearch] = useState('');
  const [healthyOnly, setHealthyOnly] = useState(false);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [selectedDishKeys, setSelectedDishKeys] = useState<string[]>([]);
  const [assignedDishes, setAssignedDishes] = useState<Record<string, MealKey[]>>({});
  const [editField, setEditField] = useState<'age' | 'height' | 'weight' | null>(null);
  const [dietId, setDietId] = useState('normal_lose');
  const [selectedDay, setSelectedDay] = useState(1);
  const [water, setWater] = useState(0);
  const [mealsDone, setMealsDone] = useState([false, false, false]);
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailText, setEmailText] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailDone, setEmailDone] = useState('');
  const [autoBuilding, setAutoBuilding] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    autoPickExercises(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parsed = useMemo(
    () => ({
      age: parseInt(age, 10) || 0,
      height: parseInt(height, 10) || 0,
      weight: parseFloat(weight) || 0,
      target: parseFloat(targetWeight) || 0,
      timeline: parseInt(timeline, 10) || 0,
    }),
    [age, height, weight, targetWeight, timeline],
  );

  const selectedKitchen = useMemo<KitchenInfo>(
    () => kitchensRegistry.find((k) => k.id === selectedKitchenId) ?? kitchensRegistry[0],
    [selectedKitchenId],
  );

  const featuredKitchens = useMemo(() => {
    const found = FEATURED_KITCHEN_IDS.map((id) => kitchensRegistry.find((k) => k.id === id)).filter((k): k is KitchenInfo => !!k);
    for (const k of kitchensRegistry) {
      if (found.length >= FEATURED_KITCHEN_IDS.length) break;
      if (k.dishes.length && !found.some((f) => f.id === k.id)) found.push(k);
    }
    return found;
  }, []);
  const selectedKitchenCats = useMemo<KitchenCategory[]>(() => getKitchenCategories(selectedKitchen), [selectedKitchen]);
  const countryOptions = useMemo(() => {
    const e = kitchensRegistry.find((k) => k.id === 'egyptian');
    const tns = kitchensRegistry.find((k) => k.id === 'tunisian');
    const eTot = e?.total ?? 0;
    const tTot = tns?.total ?? 0;
    return [
      { m: 'egyptian' as const, flag: '🇪🇬', label: t('wizard.step3.countryEgypt'), count: eTot },
      { m: 'tunisian' as const, flag: '🇹🇳', label: t('wizard.step3.countryTunis'), count: tTot },
      { m: 'both' as const, flag: '🌍', label: t('wizard.step3.countryBoth'), count: eTot + tTot },
    ];
  }, [t]);
  const countryKitchens = useMemo<KitchenInfo[]>(() => {
    const e = kitchensRegistry.find((k) => k.id === 'egyptian');
    const tns = kitchensRegistry.find((k) => k.id === 'tunisian');
    const base: KitchenInfo[] = [];
    if (countryMode === 'both') {
      if (e) base.push(e);
      if (tns) base.push(tns);
    } else {
      const k = countryMode === 'egyptian' ? e : tns;
      if (k) base.push(k);
    }
    return base.length ? base : [selectedKitchen];
  }, [countryMode, selectedKitchen]);
  const planKitchens = useMemo<KitchenInfo[]>(() => {
    if (kitchenMode === 'auto' && !countryKitchens.some((k) => k.id === selectedKitchen.id)) return [selectedKitchen];
    return countryKitchens;
  }, [countryKitchens, selectedKitchen, kitchenMode]);
  const dishRows = useMemo(() => {
    const rows: { key: string; kitchen: KitchenInfo; cat: KitchenCategory; dish: KitchenDish; meals: MealKey[] }[] = [];
    for (const k of countryKitchens) {
      for (const cat of getKitchenCategories(k)) {
        for (const d of cat.dishes) {
          rows.push({ key: `${k.id}::${cat.id}::${d.name}`, kitchen: k, cat, dish: d, meals: getMealTypesForDish(k, cat, d) });
        }
      }
    }
    return rows;
  }, [countryKitchens]);
  const tabCounts = useMemo(() => {
    const c: Record<MealKey, number> = { breakfast: 0, lunch: 0, dinner: 0, snacks: 0 };
    for (const r of dishRows) for (const mm of r.meals) c[mm]++;
    return c;
  }, [dishRows]);
  const displayedRows = useMemo(
    () =>
      dishRows.filter((r) => {
        if (healthyOnly && !r.dish.healthy) return false;
        if (!r.meals.includes(mealTab)) return false;
        const q = dishSearch.trim();
        if (q && !r.dish.name.includes(q) && !r.cat.name_ar.includes(q)) return false;
        return true;
      }),
    [dishRows, healthyOnly, mealTab, dishSearch],
  );
  const dishMealOf = useMemo(() => {
    const m = new Map<string, MealKey[]>();
    for (const r of dishRows) m.set(r.key, r.meals);
    return m;
  }, [dishRows]);
  const selectedDishMap = useMemo(() => {
    const m = new Map<string, KitchenDish>();
    for (const r of dishRows) m.set(r.key, r.dish);
    return m;
  }, [dishRows]);
  const mealSummary = useMemo(() => {
    const per: Record<MealKey, { key: string; dish: KitchenDish }[]> = { breakfast: [], lunch: [], dinner: [], snacks: [] };
    for (const key of selectedDishKeys) {
      const dish = selectedDishMap.get(key);
      if (!dish) continue;
      const meals = assignedDishes[key] ? assignedDishes[key] : (dishMealOf.get(key) ?? []);
      for (const m of meals) {
        if (per[m]) per[m].push({ key, dish });
      }
    }
    return per;
  }, [selectedDishKeys, selectedDishMap, assignedDishes, dishMealOf]);
  const totalCal = useMemo(
    () => selectedDishKeys.reduce((s, k) => s + (selectedDishMap.get(k)?.cal_serv ?? 0), 0),
    [selectedDishKeys, selectedDishMap],
  );
  const filteredPlanned = useMemo(
    () => plannedExercises.filter((p) => p.name.includes(selectedExerciseSearch) || p.type.includes(selectedExerciseSearch.toLowerCase())),
    [plannedExercises, selectedExerciseSearch],
  );

  const visibleSteps: { n: Step; label: string }[] =
    planType === 'fitness'
      ? [
          { n: 1, label: t('wizard.steps.info') },
          { n: 2, label: t('wizard.steps.body') },
          { n: 4, label: t('wizard.steps.goals') },
          { n: 5, label: t('wizard.steps.blueprint') },
        ]
      : [
          { n: 1, label: t('wizard.steps.info') },
          { n: 2, label: t('wizard.steps.body') },
          { n: 3, label: t('wizard.steps.kitchen') },
          { n: 4, label: t('wizard.steps.goals') },
          { n: 5, label: t('wizard.steps.blueprint') },
        ];
  const visIdx = visibleSteps.findIndex((x) => x.n === step);
  const progressPct = visibleSteps.length > 1 ? Math.max(0, Math.min(100, (visIdx / (visibleSteps.length - 1)) * 100)) : 0;
  const stepTitle = (() => {
    if (step === 1) return t('wizard.step1.title');
    if (step === 2) return t('wizard.step2.title');
    if (step === 3) return t('wizard.step3.title');
    if (step === 4) return t('wizard.step4.title');
    return t('wizard.step5.title');
  })();
  const stepEyebrow = (() => {
    if (step === 1) return t('wizard.step1.eyebrow');
    if (step === 2) return t('wizard.step2.eyebrow');
    if (step === 3) return t('wizard.step3.eyebrow');
    if (step === 4) return t('wizard.step4.eyebrow');
    return t('wizard.step5.eyebrow');
  })();

  const numbers = useMemo(() => {
    const { age: a, height: h, weight: w } = parsed;
    if (!a || !h || !w) return null;
    const diet = getDiet(goal, dietId);
    const wk = WORKOUTS.find((x) => x.id === workout) ?? WORKOUTS[0];
    const bmi = +(w / Math.pow(h / 100, 2)).toFixed(1);
    const bmr = sex === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdeeBase = bmr * ACTIVITY[activity].factor;
    const exBurnMid = EXERCISE_TYPES.filter((e) => exerciseTypes.includes(e.id)).map((e) => {
      const [lo, hi] = e.burn.split('-').map(Number);
      return (lo + hi) / 2;
    });
    const avgExBurn = exBurnMid.length ? exBurnMid.reduce((s, v) => s + v, 0) / exBurnMid.length : 0;
    const burnAvg = Math.round(((avgExBurn * wk.days) / 7) * diet.workoutMod);
    const tdeeWorkout = Math.round(tdeeBase + burnAvg);
    const delta =
      goal === 'lose' ? -diet.deficit : goal === 'wellness' ? (diet.deficit ? -diet.deficit : diet.surplus) : diet.surplus;
    const targetCal = Math.round(tdeeWorkout + delta);
    const protein = Math.round(w * diet.proteinFactor);
    const fat = Math.round(w * (diet.level === 'normal' ? 0.8 : 0.7));
    const carbs = Math.max(0, Math.round((targetCal - protein * 4 - fat * 9) / 4));
    return {
      bmi,
      bmiCat: bmi < 18.5 ? 'نقص وزن' : bmi < 25 ? 'طبيعي' : bmi < 30 ? 'زيادة' : 'سمنة',
      bmr: Math.round(bmr),
      tdeeBase: Math.round(tdeeBase),
      avgExBurn: Math.round(avgExBurn),
      exCount: exBurnMid.length,
      burnAvg,
      tdeeWorkout,
      delta,
      targetCal,
      protein,
      carbs,
      fat,
      diet,
      wk,
    };
  }, [parsed, sex, activity, goal, dietId, workout, exerciseTypes]);

  const diet = numbers ? numbers.diet : getDiet(goal, dietId);

  const mealPlan = useMemo(() => {
    const baseG = portionGrams(diet, goal);
    const pickLight = (pool: KitchenDish[]): KitchenDish | undefined =>
      pool.length ? [...pool].sort((a, b) => a.cal_100 - b.cal_100 || b.p - a.p)[0] : undefined;
    const pickHeavy = (pool: KitchenDish[]): KitchenDish | undefined =>
      pool.length ? [...pool].sort((a, b) => b.p - a.p || b.cal_100 - a.cal_100)[0] : undefined;
    const pickSmall = (pool: KitchenDish[]): KitchenDish | undefined =>
      pool.length ? [...pool].sort((a, b) => a.serv_g - b.serv_g || a.cal_100 - b.cal_100)[0] : undefined;
    const poolFor = (key: MealKey): KitchenDish[] => {
      const seen = new Set<string>();
      const out: KitchenDish[] = [];
      for (const k of planKitchens) {
        for (const d of dishesForMeal(k, key)) {
          if (!seen.has(d.name)) {
            seen.add(d.name);
            out.push(d);
          }
        }
      }
      return out;
    };
    const pickAssigned = (key: MealKey): KitchenDish | undefined => {
      const list = mealSummary[key];
      if (!list.length) return undefined;
      const sorted = [...list].sort((a, b) => (key === 'lunch' ? b.dish.p - a.dish.p : a.dish.cal_100 - b.dish.cal_100));
      return sorted[0].dish;
    };
    const fallbackKitchen = planKitchens[0] ?? selectedKitchen;
    const fallback = pickPlate(filterDishes(fallbackKitchen, diet, goal));
    const meals: { meal: string; dish: KitchenDish | undefined; grams: number }[] = [
      { meal: MEAL_NAMES.breakfast, dish: pickAssigned('breakfast') ?? pickLight(poolFor('breakfast')), grams: Math.round(baseG * 0.85) },
      { meal: MEAL_NAMES.lunch, dish: pickAssigned('lunch') ?? pickHeavy(poolFor('lunch')), grams: Math.round(baseG * 1.4) },
      { meal: MEAL_NAMES.dinner, dish: pickAssigned('dinner') ?? pickLight(poolFor('dinner')), grams: Math.round(baseG * 1.25) },
      { meal: MEAL_NAMES.snacks, dish: pickAssigned('snacks') ?? pickSmall(poolFor('snacks')), grams: Math.round(baseG * 0.6) },
    ];
    return meals.map((m, i) => ({ meal: m.meal, dish: m.dish ?? fallback[i], grams: m.grams }));
  }, [planKitchens, selectedKitchen, diet, goal, mealSummary]);

  const goalViolation = (): string => {
    if (goal === 'lose') {
      if (parsed.target && parsed.weight && parsed.target >= parsed.weight) return t('wizard.step4.hintLose');
      return '';
    }
    if (goal === 'gain_muscle' || goal === 'gain_weight') {
      if (parsed.target && parsed.weight && parsed.target <= parsed.weight) return t('wizard.step4.hintGain');
      return '';
    }
    return '';
  };

  const isValid = (): boolean => {
    if (step === 1) {
      return parsed.age >= 12 && parsed.age <= 80 && parsed.height >= 120 && parsed.height <= 220 && parsed.weight >= 30 && parsed.weight <= 250;
    }
    if (step === 4) {
      const base =
        parsed.target >= 30 &&
        parsed.target <= 250 &&
        parsed.timeline >= 2 &&
        parsed.timeline <= 52 &&
        parsed.weight >= 30 &&
        parsed.weight <= 250;
      if (!base) return false;
      if (goal === 'lose') return parsed.target < parsed.weight;
      if (goal === 'gain_muscle' || goal === 'gain_weight') return parsed.target > parsed.weight;
      return true;
    }
    return true;
  };

  const next = () => {
    if (!isValid()) return;
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 2 && planType === 'fitness') {
      setStep(4);
      return;
    }
    if (step === 2 && planType === 'nutrition') {
      setStep(3);
      return;
    }
    const s = step >= 5 ? 1 : ((step + 1) as Step);
    setStep(s);
  };
  const back = () => {
    if (step === 4 && planType === 'fitness') {
      setStep(2);
      return;
    }
    const s = Math.max(1, step - 1) as Step;
    setStep(s);
  };

  const toggleExerciseType = (id: string) => {
    setExerciseMode('manual');
    const on = exerciseTypes.includes(id);
    setExerciseTypes((prev) => (on ? prev.filter((x) => x !== id) : [...prev, id]));
    const presets = EXERCISE_PRESETS[id] ?? [];
    setPlannedExercises((prev) => {
      const others = prev.filter((p) => p.type !== id);
      return on ? others : [...others, ...presets];
    });
  };

  const autoPickExercises = (silent = false) => {
    const picks: string[] =
      goal === 'gain_muscle'
        ? ['strength', 'calisthenics', 'swimming']
        : goal === 'gain_weight'
          ? ['strength', 'yoga', 'swimming']
          : goal === 'wellness'
            ? ['yoga', 'pilates', 'tai_chi', 'dance']
            : goal === 'athletic'
              ? ['strength', 'running', 'boxing', 'swimming']
              : ['cardio', 'hiit', 'strength'];
    if (activity === 'sedentary' || activity === 'light') {
      const trimmed = picks.filter((p) => !['hiit', 'boxing'].includes(p));
      setExerciseTypes(trimmed.length >= 3 ? trimmed.slice(0, 3) : picks.slice(0, 3));
    } else {
      setExerciseTypes(picks.slice(0, 4));
    }
    setPlannedExercises((prev) => [...prev.filter((p) => !picks.includes(p.type)), ...picks.flatMap((p) => EXERCISE_PRESETS[p] ?? [])]);
    setWorkout(goal === 'lose' ? 'full_body' : goal === 'gain_muscle' || goal === 'gain_weight' ? 'ppl' : 'upper_lower');
    setExerciseMode('auto');
    if (!silent) notify(t('wizard.toast.autoExercises'));
  };

  const saveExercises = () => {
    localStorage.setItem('hc_planned_exercises', JSON.stringify(plannedExercises));
    notify(t('wizard.toast.savedExercises').replace('{n}', String(plannedExercises.length)));
  };

  const removeExercise = (id: string) => {
    setPlannedExercises((prev) => prev.filter((p) => p.id !== id));
  };

  const autoPickKitchen = () => {
    const map: Record<GoalKey, string> = {
      gain_muscle: 'diet-high-protein',
      lose: 'diet-low-carb',
      gain_weight: 'egyptian',
      wellness: 'diet-mediterranean',
      athletic: 'diet-high-protein',
    };
    const id = map[goal];
    if (featuredKitchens.some((k) => k.id === id)) chooseKitchen(featuredKitchens.find((k) => k.id === id)!);
    setKitchenMode('auto');
  };

  const chooseKitchen = (k: KitchenInfo) => {
    setSelectedKitchenId(k.id);
    setKitchenMode('manual');
    setCategorySearch('');
    setExpandedCat(null);
    setSelectedDishKeys([]);
    setAssignedDishes({});
  };

  const runAutoKitchen = () => {
    if (autoBuilding) return;
    setAutoBuilding(true);
    window.setTimeout(() => {
      autoPickKitchen();
      setAutoBuilding(false);
      setStep(5);
      notify(t('wizard.toast.autoKitchen'));
    }, 1500);
  };

  const chooseCountry = (m: 'egyptian' | 'tunisian' | 'both') => {
    setCountryMode(m);
    const id = m === 'both' ? 'egyptian' : m;
    const k = kitchensRegistry.find((x) => x.id === id);
    if (k) setSelectedKitchenId(k.id);
    setDishSearch('');
    setSelectedDishKeys([]);
    setAssignedDishes({});
  };

  const addDish = (key: string) => {
    const on = selectedDishKeys.includes(key);
    const dm = dishMealOf.get(key) ?? ['lunch'];
    if (on) {
      setSelectedDishKeys((prev) => prev.filter((k) => k !== key));
      setAssignedDishes((prev) => {
        const cp = { ...prev };
        delete cp[key];
        return cp;
      });
    } else {
      setSelectedDishKeys((prev) => [...prev, key]);
      setAssignedDishes((prev) => ({ ...prev, [key]: dm }));
    }
  };

  const removeChip = (key: string, meal: MealKey) => {
    const dm = dishMealOf.get(key) ?? ['lunch'];
    const cur = assignedDishes[key] ? assignedDishes[key] : dm;
    const next = cur.filter((m) => m !== meal);
    setAssignedDishes((prev) => {
      const cp = { ...prev };
      if (next.length) cp[key] = next;
      else delete cp[key];
      return cp;
    });
    if (!next.length) setSelectedDishKeys((prev) => prev.filter((k) => k !== key));
  };

  const autoPickDishes = () => {
    const keys: string[] = [];
    const assigned: Record<string, MealKey[]> = {};
    for (const k of countryKitchens) {
      for (const cat of getKitchenCategories(k)) {
        for (const d of cat.dishes) {
          const mk = `${k.id}::${cat.id}::${d.name}`;
          keys.push(mk);
          assigned[mk] = getMealTypesForDish(k, cat, d);
        }
      }
    }
    setSelectedDishKeys(keys);
    setAssignedDishes(assigned);
    setCategoryMode('auto');
  };

  const assignDishToMeal = (key: string, meal: MealKey) => {
    setAssignedDishes((prev) => {
      const cur = prev[key] ? prev[key] : (dishMealOf.get(key) ?? []);
      const next = cur.includes(meal) ? cur.filter((x) => x !== meal) : [...cur, meal];
      const cp = { ...prev };
      if (next.length) cp[key] = next;
      else delete cp[key];
      return cp;
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedCat((prev) => (prev === id ? null : id));
  };

  const changeGoal = (g: GoalKey) => {
    setGoal(g);
    setDietId(DIETS[g][0].id);
  };

  const notify = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(''), 3200);
  };

  const sendEmail = () => {
    if (!emailText.trim() || emailSending) return;
    setEmailSending(true);
    window.setTimeout(() => {
      setEmailSending(false);
      setEmailDone(emailText.trim());
      setToast(`PDF sent to ${emailText.trim()}`);
      window.setTimeout(() => setToast(''), 3200);
    }, 2200);
  };

  const macrosT = (p: number, c: number, f: number): string =>
    t('wizard.step3.macros').replace('{p}', String(Math.round(p))).replace('{c}', String(Math.round(c))).replace('{f}', String(Math.round(f)));
  const calT = (n: number): string => t('wizard.step3.cal').replace('{n}', String(n));

  const waterGoal = numbers ? +Math.max(2, Math.min(3.5, parsed.weight * 0.033)).toFixed(1) : 2.3;
  const doneCount = mealsDone.filter(Boolean).length;
  const projectionText = !numbers
    ? ''
    : `${parsed.weight}${t('wizard.unit.kg')} → ${parsed.target}${t('wizard.unit.kg')} · ${parsed.timeline} ${t('wizard.unit.weeks')}`;
  const GOAL_LABEL_KEY: Record<GoalKey, string> = {
    lose: 'wizard.step4.goalTypes.lose',
    gain_muscle: 'wizard.step4.goalTypes.gainMuscle',
    gain_weight: 'wizard.step4.goalTypes.gainWeight',
    wellness: 'wizard.step4.goalTypes.wellness',
    athletic: 'wizard.step4.goalTypes.athletic',
  };
  const goalLabel = (g: GoalKey): string => t(GOAL_LABEL_KEY[g] as any);

  const DELTA_KEYS: Record<GoalKey, 'lose' | 'gain'> = { lose: 'lose', gain_muscle: 'gain', gain_weight: 'gain', wellness: 'gain', athletic: 'gain' };
  const deltaT = (g: GoalKey, d: DietIntensity): string => {
    const v = signedDelta(g, d);
    if (v === 0) return t('wizard.step4.delta.zero');
    const key = DELTA_KEYS[g] ?? 'gain';
    return t(v < 0 ? 'wizard.step4.delta.lose' : `wizard.step4.delta.${key}`).replace('{n}', String(Math.abs(v)));
  };

  const intensityLabel = (lv: DietLevel): string => t(('wizard.step4.intensity.' + lv) as any);
  const intensityTag = (lv: DietLevel): string => t(('wizard.step4.intensityTag.' + lv) as any);
  const mealLabel = (mk: MealKey): string => t(('wizard.step3.meals.' + mk) as any);
  const mealTime = (mk: MealKey): string => t(('wizard.step5.mealTime.' + mk) as any);
  const ACTIVITY_LABEL = (x: ActivityKey): string => t(('wizard.activity.' + x) as any);
  const ACTIVITY_DESC = (x: ActivityKey): string => t(('wizard.activity.' + x + '.desc') as any);

  const step5Meals: { key: MealKey; emoji: string }[] = [
    { key: 'breakfast', emoji: '🌅' },
    { key: 'lunch', emoji: '🌞' },
    { key: 'dinner', emoji: '🌙' },
    { key: 'snacks', emoji: '🍪' },
  ];

  const inputDefault = 'wiz-input';
  const cardBase = 'rounded-[26px] bg-white border border-[#EFEBE4] shadow-[0_10px_30px_rgba(15,76,58,0.06)]';

  return (
    <div className="wiz-page min-h-screen text-[#0F4C3A] overflow-x-hidden antialiased bg-[#FDFBF7]">
      {step !== 5 && (
        <header className="sticky top-0 z-40 bg-[#FDFBF7]/92 backdrop-blur-md border-b border-[#EFEBE4]">
          <div className="max-w-[880px] mx-auto px-4 md:px-6 pt-4 pb-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => (step === 1 ? navigate('/') : back())}
                aria-label={t('wizard.back')}
                className="w-10 h-10 rounded-full bg-white border border-[#EFEBE4] shadow-sm flex items-center justify-center text-[#0F4C3A] text-[20px] shrink-0 hover:border-[#D4AF37] transition-all active:scale-95"
              >
                ‹
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="wiz-progress-badge truncate">{stepEyebrow}</span>
                  <span className="text-[12px] font-bold text-[#6B7A75] whitespace-nowrap shrink-0">
                    {t('wizard.stepOf')} <span className="num">{step}</span> {t('wizard.of')} <span className="num">{visibleSteps.length}</span>
                  </span>
                </div>
                <h1 className="mt-2 text-[22px] md:text-[26px] font-extrabold leading-tight text-[#0F4C3A]">{stepTitle}</h1>
              </div>
            </div>
            <div className="mt-3">
              <div className="wiz-progress">
                <div className="wiz-progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
              <div className="flex justify-between mt-2.5 px-1">
                {visibleSteps.map((x) => {
                  const done = step > x.n;
                  const active = step === x.n;
                  return (
                    <div key={x.n} className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-7 h-7 rounded-full border-[2px] flex items-center justify-center text-[12px] font-bold transition-all ${
                          done ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0F4C3A]' : active ? 'border-[#0F4C3A] bg-white text-[#0F4C3A]' : 'border-[#E3E0D8] bg-white text-[#A0A8A4]'
                        }`}
                      >
                        {done ? '✓' : x.n}
                      </div>
                      <span className={`text-[10.5px] font-semibold tracking-wide ${active ? 'text-[#0F4C3A]' : done ? 'text-[#6B7A75]' : 'text-[#A0A8A4]'}`}>{x.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </header>
      )}

      <main className="w-full mx-auto px-4 md:px-6 pb-32 md:pb-16 max-w-[880px]">
        {step === 1 && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            <div className={`${cardBase} p-6`}>
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-[#F4F1EB] flex items-center justify-center text-[22px] shrink-0">🧭</span>
                <div>
                  <h2 className="text-[18px] font-extrabold leading-none">{t('wizard.step1.profile')}</h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{t('wizard.step1.profileSub')}</p>
                </div>
              </div>

              <div className="mt-6">
                <label className="wiz-label" htmlFor="wz-age">{t('age')}</label>
                <div className="relative">
                  <input
                    id="wz-age"
                    inputMode="numeric"
                    value={age}
                    onChange={(e) => setAge(e.target.value.replace(/\D/g, ''))}
                    className={`${inputDefault} pr-16`}
                  />
                  <span className="absolute inset-y-0 end-4 flex items-center text-[13px] font-bold text-[#A0A8A4]">{t('wizard.unit.years')}</span>
                </div>
              </div>

              <div className="mt-5">
                <label className="wiz-label">{t('gender')}</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['male', 'female'] as Sex[]).map((x) => {
                    const on = sex === x;
                    return (
                      <button
                        key={x}
                        type="button"
                        onClick={() => setSex(x)}
                        className={`relative flex flex-col items-center justify-center pt-4 pb-3 rounded-[20px] border-2 transition-all min-w-0 ${on ? 'border-[#0F4C3A] bg-[#F4F1EB] shadow-[0_8px_18px_rgba(15,76,58,0.12)]' : 'border-[#EFEBE4] bg-white hover:border-[#D4AF37]'}`}
                      >
                        <BodyFigure kind={x} />
                        <span className={`mt-2 text-[14px] font-bold leading-none ${on ? 'text-[#0F4C3A]' : 'text-[#6B7A75]'}`}>{t(x)}</span>
                        {on && (
                          <span className="absolute top-2.5 end-2.5 w-5 h-5 rounded-full bg-[#D4AF37] text-[#0F4C3A] flex items-center justify-center text-[12px] font-bold shadow-sm">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div>
                  <label className="wiz-label" htmlFor="wz-height">{t('height')}</label>
                  <div className="relative">
                    <input
                      id="wz-height"
                      inputMode="numeric"
                      value={height}
                      onChange={(e) => setHeight(e.target.value.replace(/\D/g, ''))}
                      className={`${inputDefault} pr-16`}
                    />
                    <span className="absolute inset-y-0 end-4 flex items-center text-[13px] font-bold text-[#A0A8A4]">{t('wizard.unit.cm')}</span>
                  </div>
                </div>
                <div>
                  <label className="wiz-label" htmlFor="wz-weight">{t('weightLabel')}</label>
                  <div className="relative">
                    <input
                      id="wz-weight"
                      inputMode="decimal"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ''))}
                      className={`${inputDefault} pr-16`}
                    />
                    <span className="absolute inset-y-0 end-4 flex items-center text-[13px] font-bold text-[#A0A8A4]">{t('wizard.unit.kg')}</span>
                  </div>
                </div>
              </div>

              {numbers && (
                <div className="mt-5 rounded-[16px] bg-[#F4F1EB] border border-[#EFEBE4] px-4 py-3 text-[12px] text-[#6B7A75] leading-snug">
                  BMI <span className="num font-bold text-[#0F4C3A]">{numbers.bmi}</span> · {numbers.bmiCat} ·{' '}
                  {t('wizard.step2.maintenance')} <span className="num font-bold text-[#0F4C3A]">{numbers.tdeeBase}</span> kcal
                </div>
              )}
            </div>

            <div className={`${cardBase} p-6`}>
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-[#0F4C3A] flex items-center justify-center text-[20px] shrink-0">🎯</span>
                <div>
                  <h2 className="text-[18px] font-extrabold leading-none">{t('wizard.step1.planType')}</h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{t('wizard.step1.planTypeSub')}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {(['nutrition', 'fitness', 'both'] as PlanType[]).map((pt) => {
                  const on = planType === pt;
                  return (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => setPlanType(pt)}
                      className={`w-full rounded-[18px] border-2 px-4 py-3.5 text-start transition-all min-w-0 ${on ? 'border-[#D4AF37] bg-[#FFFBEF] shadow-[0_8px_18px_rgba(212,175,55,0.18)]' : 'border-[#EFEBE4] bg-white hover:border-[#D4AF37]'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[16px]" style={{ flexShrink: 0 }}>{pt === 'nutrition' ? '🍃' : pt === 'fitness' ? '🏋️' : '🎯'}</span>
                        <span className={`flex-1 text-[14px] font-extrabold ${on ? 'text-[#0F4C3A]' : 'text-[#6B7A75]'}`}>
                          {t(pt === 'nutrition' ? 'wizard.step1.plan.nutrition.title' : pt === 'fitness' ? 'wizard.step1.plan.fitness.title' : 'wizard.step1.plan.both.title')}
                        </span>
                        {on && <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#0F4C3A] flex items-center justify-center text-[12px] font-bold shrink-0">✓</span>}
                      </div>
                      <p className="mt-1.5 text-[12px] text-[#6B7A75] leading-snug">
                        {t(pt === 'nutrition' ? 'wizard.step1.plan.nutrition.desc' : pt === 'fitness' ? 'wizard.step1.plan.fitness.desc' : 'wizard.step1.plan.both.desc')}
                      </p>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3.5 text-[11.5px] text-[#A0A8A4] leading-snug">{t('fcProfileNote')}</p>
            </div>

            <div className="lg:col-span-2">
              <button type="button" onClick={next} disabled={!isValid()} className="cta-calc disabled:opacity-50 disabled:cursor-not-allowed">
                {t('wizard.step1.cta')}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-6`}>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-[18px] font-extrabold">{t('wizard.step2.activity')}</h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{t('wizard.step2.activitySub')}</p>
                </div>
                <span className="text-[30px] leading-none shrink-0">{ACTIVITY[activity].emoji}</span>
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar snap-x pb-1">
                {ACTIVITY_ORDER.map((x) => {
                  const opt = ACTIVITY[x];
                  const on = activity === x;
                  return (
                    <button
                      key={x}
                      type="button"
                      onClick={() => setActivity(x)}
                      className={`shrink-0 snap-start rounded-full border-2 px-4 h-[46px] text-[13px] font-bold flex items-center gap-1.5 transition-all active:scale-95 ${on ? 'bg-[#0F4C3A] border-[#0F4C3A] text-white shadow-[0_8px_18px_rgba(15,76,58,0.25)]' : 'bg-white border-[#EFEBE4] text-[#0F4C3A] hover:border-[#D4AF37]'}`}
                    >
                      <span className="shrink-0">{opt.emoji}</span>
                      {ACTIVITY_LABEL(x)}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-[12.5px] font-medium text-[#6B7A75]">💬 {ACTIVITY_DESC(activity)}</p>
            </div>

            {planType === 'nutrition' ? (
              <div className={`${cardBase} p-6`}>
                <p className="text-[13px] text-[#6B7A75] leading-relaxed">{t('wizard.step2.onlyNutrition')}</p>
                {numbers && (
                  <div className="mt-4 rounded-[14px] bg-[#F4F1EB] p-3.5 text-[12px] text-[#6B7A75] leading-relaxed">
                    <div className="font-bold text-[#0F4C3A]">{t('wizard.step2.tdeePreview')}</div>
                    <div className="mt-1">
                      {t('wizard.step2.maintenance')}: <b className="num">{numbers.tdeeBase}</b> kcal/day
                    </div>
                    <div className="mt-0.5">{macrosT(numbers.protein, numbers.carbs, numbers.fat)}</div>
                  </div>
                )}
              </div>
            ) : exerciseMode === 'auto' ? (
              <div
                className="rounded-[26px] p-6 md:p-7 relative overflow-hidden text-white"
                style={{ background: 'linear-gradient(135deg,#0F4C3A,#14532D 55%,#1f6b52)' }}
              >
                <div className="absolute -top-8 -end-8 text-[120px] leading-none opacity-15 select-none">🤖</div>
                <div className="flex items-center gap-2">
                  <span className="wiz-progress-badge">{t('wizard.step2.autoTitle')}</span>
                  <span className="text-[12px] font-semibold text-white/70">{t('wizard.step2.autoResult').replace('{n}', String(exerciseTypes.length))}</span>
                </div>
                <p className="mt-3 text-[13.5px] text-white/85 leading-relaxed max-w-[520px]">{t('wizard.step2.autoDesc')}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {plannedExercises.map((ex) => (
                    <span key={ex.id} className="inline-flex items-center gap-1.5 bg-white/12 border border-white/15 rounded-full h-9 px-3.5 text-[12.5px] font-bold text-white">
                      <span className="shrink-0">{ex.emoji}</span>
                      <span className="truncate max-w-[150px]">{ex.name}</span>
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => autoPickExercises()}
                    className="h-[46px] px-6 rounded-full bg-[#D4AF37] text-[#0F4C3A] font-extrabold text-[14px] flex items-center gap-2 shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:translate-y-[-1px] transition-all active:scale-95"
                  >
                    {t('wizard.step2.regenerate')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setExerciseMode('manual')}
                    className="h-[46px] px-5 rounded-full bg-white/10 border border-white/25 text-white font-bold text-[13.5px] hover:bg-white/20 transition-all active:scale-95"
                  >
                    {t('wizard.step2.switchManual')}
                  </button>
                </div>
              </div>
            ) : null}

            {planType !== 'nutrition' && exerciseMode === 'manual' && (
              <div className="space-y-5">
                <div className={`${cardBase} p-6`}>
                  <div className="flex items-center gap-2">
                    <span className="wiz-progress-badge">{t('wizard.step2.manual')}</span>
                    <span className="text-[12px] font-semibold text-[#6B7A75] shrink-0">{t('wizard.step2.exerciseTypes')}</span>
                    <span className="ms-auto text-[12px] font-semibold text-[#D4AF37] bg-[#FFF8E7] px-3 py-1 rounded-full shrink-0">
                      {t('wizard.step2.typesCount').replace('{n}', String(EXERCISE_TYPES.length))}
                    </span>
                  </div>
                  <div className="mt-4 h-[46px] bg-[#F4F1EB] rounded-[14px] flex items-center px-4 border-2 border-transparent focus-within:border-[#D4AF37] transition-colors">
                    <input
                      value={exerciseSearch}
                      onChange={(e) => setExerciseSearch(e.target.value)}
                      placeholder={t('wizard.step2.search')}
                      className="flex-1 bg-transparent outline-none text-[15px] text-[#0F4C3A] placeholder:text-[#A0A8A4] min-w-0"
                    />
                    <span className="text-[#0F4C3A] text-[18px] shrink-0">🔍</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {EXERCISE_TYPES.filter((ty) => ty.name.includes(exerciseSearch) || ty.en.toLowerCase().includes(exerciseSearch.toLowerCase()) || ty.focus.includes(exerciseSearch)).map((ty) => {
                      const on = exerciseTypes.includes(ty.id);
                      return (
                        <button
                          key={ty.id}
                          type="button"
                          onClick={() => toggleExerciseType(ty.id)}
                          className={`relative rounded-[16px] flex flex-col items-center justify-center gap-1.5 py-2.5 min-h-[84px] cursor-pointer transition-all min-w-0 ${on ? 'border-2 border-[#0F4C3A] bg-[#0F4C3A] shadow-[0_8px_16px_rgba(15,76,58,0.2)]' : 'border border-[#E3E0D8] bg-white hover:border-[#D4AF37]'}`}
                        >
                          {on && (
                            <span className="absolute top-1.5 end-1.5 w-5 h-5 rounded-full bg-[#D4AF37] text-[#0F4C3A] text-[11px] flex items-center justify-center font-bold">✓</span>
                          )}
                          <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[20px] shadow-sm shrink-0 ${on ? 'bg-white/15' : 'bg-[#F4F1EB]'}`}>{ty.emoji}</span>
                          <span className={`text-[12px] font-bold leading-none truncate max-w-full ${on ? 'text-white' : 'text-[#0F4C3A]'}`}>{ty.en}</span>
                        </button>
                      );
                    })}
                    {EXERCISE_TYPES.filter((ty) => ty.name.includes(exerciseSearch) || ty.en.toLowerCase().includes(exerciseSearch.toLowerCase()) || ty.focus.includes(exerciseSearch)).length === 0 && (
                      <div className="col-span-full text-[12.5px] text-[#A0A8A4] text-center py-4">{t('wizard.step2.noMatches')}</div>
                    )}
                  </div>
                </div>

                <div className={`${cardBase} p-6`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] shrink-0">🔖</span>
                      <h3 className="text-[15px] font-extrabold">{t('wizard.step2.saved')}</h3>
                    </div>
                    <span className="text-[12px] font-semibold bg-[#FFF8E7] text-[#B8860B] px-3 py-1 rounded-full shrink-0">
                      {t('wizard.step5.exercisesCount').replace('{n}', String(plannedExercises.length))}
                    </span>
                  </div>
                  <p className="mt-1 text-[11.5px] text-[#6B7A75]">{t('wizard.step2.savedSub')}</p>

                  <div className="grid grid-cols-2 gap-2.5 mt-3">
                    {WORKOUTS.map((w) => {
                      const on = workout === w.id;
                      return (
                        <div
                          key={w.id}
                          onClick={() => setWorkout(w.id)}
                          className={`rounded-[14px] p-3 cursor-pointer min-w-0 transition-all active:scale-95 ${on ? 'bg-[#0F4C3A] text-white shadow-[0_8px_16px_rgba(15,76,58,0.2)]' : 'bg-[#F4F1EB] text-[#0F4C3A] hover:border hover:border-[#D4AF37]'}`}
                        >
                          <div className="text-[12.5px] font-bold leading-tight break-words">{w.name}</div>
                          <div className={`text-[10.5px] mt-0.5 leading-snug break-words ${on ? 'text-white/70' : 'text-[#6B7A75]'}`}>
                            {w.dur} · {w.focus}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 h-[44px] bg-[#F4F1EB] rounded-[12px] flex items-center px-3 border-2 border-transparent focus-within:border-[#D4AF37]">
                    <input value={selectedExerciseSearch} onChange={(e) => setSelectedExerciseSearch(e.target.value)} placeholder={t('wizard.step3.savedSearch')} className="flex-1 bg-transparent outline-none text-[14px] text-[#0F4C3A] placeholder:text-[#A0A8A4] min-w-0" />
                    <span className="text-[#0F4C3A] text-[15px] shrink-0">🔍</span>
                  </div>
                  <div className="mt-3 min-h-[40px] flex flex-wrap gap-2">
                    {filteredPlanned.length ? (
                      filteredPlanned.map((ex) => (
                        <span key={ex.id} className="inline-flex items-center gap-1.5 bg-[#F4F1EB] border border-[#EFEBE4] rounded-full h-9 px-3.5 text-[12.5px] font-semibold text-[#0F4C3A] max-w-full">
                          <span className="shrink-0">{ex.emoji}</span>
                          <span className="truncate max-w-[140px]">{ex.name}</span>
                          <button type="button" onClick={() => removeExercise(ex.id)} className="text-[#9AA19D] hover:text-red-500 text-[11px] shrink-0">✕</button>
                        </span>
                      ))
                    ) : (
                      <span className="text-[12px] text-[#A0A8A4]">{t('wizard.step2.savedEmpty')}</span>
                    )}
                  </div>

                  {numbers && (
                    <div className="mt-4 rounded-[14px] bg-[#F4F1EB] p-3.5 text-[12px] text-[#6B7A75] leading-relaxed">
                      <div className="font-bold text-[#0F4C3A]">{t('wizard.step2.tdeePreview')}</div>
                      <div className="mt-1">
                        {t('wizard.step2.maintenance')}: <b className="num">{numbers.tdeeBase}</b> kcal/day ·{' '}
                        {goal === 'lose' ? t('wizard.step2.targetLose') : goal === 'gain_muscle' || goal === 'gain_weight' ? t('wizard.step2.targetGain') : t('wizard.step2.targetMaintain')}:{' '}
                        <b className="num">{goal === 'lose' ? numbers.tdeeBase - 500 : goal === 'gain_muscle' || goal === 'gain_weight' ? numbers.tdeeBase + 300 : numbers.tdeeBase}</b> kcal/day
                      </div>
                      <div className="mt-0.5">{macrosT(numbers.protein, numbers.carbs, numbers.fat)}</div>
                    </div>
                  )}

                  <button type="button" onClick={saveExercises} className="btn-primary w-full mt-4 rounded-[14px]">
                    {t('wizard.step2.saveBlueprint')}
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={back} className="btn-secondary flex-1 h-[54px] rounded-[16px] text-[15px] font-bold">
                {t('wizard.back')}
              </button>
              <button type="button" onClick={next} className="btn-primary flex-1 h-[54px] rounded-[16px] text-[15px] font-bold">
                {t('wizard.continue')}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 space-y-5">
            <div
              className="rounded-[26px] p-6 md:p-7 relative overflow-hidden text-white"
              style={{ background: 'linear-gradient(135deg,#0F4C3A,#14532D 55%,#1f6b52)' }}
            >
              <div className="absolute -top-6 -end-6 text-[110px] leading-none opacity-15 select-none">✨</div>
              <div className="flex items-center gap-2">
                <span className="wiz-progress-badge">{t('wizard.step3.autoTitle')}</span>
              </div>
              <p className="mt-3 text-[13.5px] text-white/85 leading-relaxed max-w-[560px]">{t('wizard.step3.autoDesc')}</p>

              {autoBuilding ? (
                <div className="mt-5 flex items-center gap-3 rounded-[18px] bg-white/10 border border-white/15 px-5 py-4">
                  <span className="w-9 h-9 rounded-full border-[3px] border-[#D4AF37] border-t-transparent animate-spin shrink-0" />
                  <span className="text-[15px] font-bold">{t('wizard.step3.loading')}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={runAutoKitchen}
                  className="mt-5 h-[54px] px-7 rounded-full bg-[#D4AF37] text-[#0F4C3A] font-extrabold text-[15px] flex items-center gap-2 shadow-[0_10px_24px_rgba(212,175,55,0.45)] hover:translate-y-[-1px] transition-all active:scale-95"
                >
                  {t('wizard.step3.autoBtn')}
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-[#E9E5DB]" />
              <span className="px-4 py-1.5 rounded-full bg-white border border-[#E9E5DB] text-[12px] font-extrabold tracking-[0.2em] text-[#6B7A75]">{t('wizard.step3.or')}</span>
              <span className="h-px flex-1 bg-[#E9E5DB]" />
            </div>

            <div className={`${cardBase} p-6`}>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <h2 className="text-[18px] font-extrabold">{t('wizard.step3.chooseCuisine')}</h2>
                  <p className="mt-0.5 text-[12px] text-[#6B7A75]">✨ {t('wizard.step3.manualBtn')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setHealthyOnly((p) => !p)}
                  className={`h-10 rounded-full px-4 text-[13px] font-bold border-2 transition-all ${healthyOnly ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]' : 'bg-white text-[#0F4C3A] border-[#E3E0D8] hover:border-[#D4AF37]'}`}
                >
                  {t('wizard.step3.healthyOnly')}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {featuredKitchens.map((k) => {
                  const on = selectedKitchenId === k.id;
                  return (
                    <div
                      key={k.id}
                      onClick={() => chooseKitchen(k)}
                      className={`rounded-[20px] border-2 p-4 flex flex-col items-center text-center cursor-pointer min-w-0 transition-all active:scale-95 ${on ? 'border-[#D4AF37] bg-[#FFFBEF] shadow-[0_0_0_4px_rgba(212,175,55,0.15)]' : 'border-[#EFEBE4] bg-white hover:border-[#D4AF37]'}`}
                    >
                      <span className="text-[34px] leading-none">{k.flag}</span>
                      <span className={`mt-2 text-[14px] font-extrabold leading-none truncate max-w-full ${on ? 'text-[#0F4C3A]' : 'text-[#0F4C3A]'}`}>{k.country}</span>
                      <span className="mt-1 text-[11px] text-[#6B7A75] leading-tight truncate max-w-full">{k.kitchen}</span>
                      {k.sample && <span className="mt-1.5 text-[10.5px] text-[#8A938E] truncate max-w-full">🍽 {k.sample.name}</span>}
                      <span className={`mt-2 text-[11px] font-bold px-2.5 py-1 rounded-full ${on ? 'bg-[#D4AF37] text-[#0F4C3A]' : 'bg-[#F4F1EB] text-[#6B7A75]'}`}>
                        {t('wizard.step3.dishCount').replace('{n}', String(k.total))}
                      </span>
                      {on && <span className="mt-1.5 text-[11px] font-bold text-[#B8860B]">✓ {t('wizard.step2.auto')}</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {planType !== 'fitness' && (
              <div className={`${cardBase} p-6`}>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] shrink-0">🌍</span>
                    <h3 className="text-[15px] font-extrabold">{t('wizard.step3.country')}</h3>
                  </div>
                  <span className="text-[12px] font-bold bg-[#FFF8E7] text-[#B8860B] px-3 py-1 rounded-full shrink-0">
                    {t('wizard.step3.totalToday').replace('{n}', String(totalCal))}
                  </span>
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
                  {countryOptions.map((o) => {
                    const on = countryMode === o.m;
                    return (
                      <button
                        key={o.m}
                        type="button"
                        onClick={() => chooseCountry(o.m)}
                        className={`shrink-0 h-[46px] rounded-full px-5 text-[13px] font-bold border-2 transition-all active:scale-95 ${on ? 'bg-[#0F4C3A] border-[#0F4C3A] text-white' : 'bg-white border-[#E3E0D8] text-[#0F4C3A] hover:border-[#D4AF37]'}`}
                      >
                        {o.label} <span className={`num text-[11px] ${on ? 'text-white/70' : 'text-[#6B7A75]'}`}>{o.count}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex gap-1.5 overflow-x-auto no-scrollbar">
                  {MEAL_TABS.map((tab) => {
                    const on = mealTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setMealTab(tab.key)}
                        className={`shrink-0 h-11 rounded-full px-4 text-[13.5px] font-bold flex items-center gap-1.5 border-2 transition-all active:scale-95 ${on ? 'bg-[#0F4C3A] border-[#0F4C3A] text-white' : 'bg-white text-[#0F4C3A] border-[#E3E0D8] hover:border-[#D4AF37]'}`}
                      >
                        <span className="shrink-0">{tab.emoji}</span>
                        {mealLabel(tab.key)}
                        <span className={`text-[11px] ${on ? 'text-white/70' : 'text-[#6B7A75]'}`}>({tabCounts[tab.key]})</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 h-[46px] bg-[#F4F1EB] rounded-[14px] flex items-center px-4 border-2 border-transparent focus-within:border-[#D4AF37]">
                  <input value={dishSearch} onChange={(e) => setDishSearch(e.target.value)} placeholder={t('wizard.step3.searchPlaceholder')} className="flex-1 bg-transparent outline-none text-[15px] text-[#0F4C3A] placeholder:text-[#A0A8A4] min-w-0" />
                  <span className="text-[#0F4C3A] text-[18px] shrink-0">🔍</span>
                </div>

                <div className="mt-3 space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                  {displayedRows.length ? (
                    displayedRows.map((r) => {
                      const checked = selectedDishKeys.includes(r.key);
                      const dot = r.dish.confidence_color;
                      return (
                        <div
                          key={r.key}
                          className={`flex items-center gap-3 min-h-[84px] p-3 bg-white rounded-[18px] border-2 transition-all min-w-0 ${checked ? 'border-[#D4AF37] bg-[#FFFBEF]' : 'border-[#EFEBE4] hover:border-[#D4AF37]'}`}
                        >
                          <span className="w-14 h-14 rounded-[14px] bg-[#F4F1EB] flex items-center justify-center text-[26px] shrink-0">🍲</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="font-extrabold text-[13.5px] text-[#0F4C3A] truncate">{r.dish.name}</span>
                              <span className={`w-2 h-2 rounded-full shrink-0 ${dot === 'green' ? 'bg-green-500' : dot === 'yellow' ? 'bg-yellow-500' : 'bg-orange-500'}`} />
                            </div>
                            <div className="text-[11px] text-[#6B7A75] truncate mt-0.5">
                              {r.cat.name_ar}
                              {r.dish.healthy ? ` · ${t('wizard.step3.healthyTag')}` : ''}
                            </div>
                            <div className="text-[11px] text-[#8A938E] mt-0.5">{macrosT(r.dish.p, r.dish.c, r.dish.f)}</div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <span className="text-[13.5px] font-extrabold text-[#B8860B] whitespace-nowrap">{calT(r.dish.cal_serv)}</span>
                            <button
                              type="button"
                              onClick={() => addDish(r.key)}
                              className={`w-9 h-9 rounded-full flex items-center justify-center text-[18px] text-white shadow-sm transition-all active:scale-95 ${checked ? 'bg-[#9AA19D]' : 'bg-[#D4AF37]'}`}
                            >
                              {checked ? '✓' : '+'}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-[13px] text-[#A0A8A4] py-6">{t('wizard.step3.noDishes')}</div>
                  )}
                </div>

                <div className="mt-4 border-2 border-dashed border-[#E3E0D8] rounded-[18px] bg-[#FAF8F3] p-4 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[15px] font-extrabold text-[#0F4C3A] truncate">{t('wizard.step3.savedTitle')}</div>
                    {!selectedDishKeys.length && <span className="text-[10.5px] text-[#A0A8A4] shrink-0">—</span>}
                  </div>
                  <div className="h-[42px] bg-white border border-[#E9E5DB] rounded-[12px] flex items-center px-3 mt-2.5 focus-within:border-[#D4AF37]">
                    <input value={savedSearch} onChange={(e) => setSavedSearch(e.target.value)} placeholder={t('wizard.step3.savedSearch')} className="flex-1 bg-transparent outline-none text-[14px] text-[#0F4C3A] placeholder:text-[#A0A8A4] min-w-0" />
                    <span className="text-[#0F4C3A] text-[15px] shrink-0">🔍</span>
                  </div>
                  <div className="mt-3 space-y-3">
                    {MEAL_ORDER.map((mk) => {
                      const list = mealSummary[mk].filter((x) => !savedSearch.trim() || x.dish.name.includes(savedSearch.trim()));
                      if (!list.length) return null;
                      return (
                        <div key={mk} className="min-w-0">
                          <div className="text-[12px] font-bold text-[#6B7A75] mb-1">{t('wizard.step3.savedArea').replace('{meal}', mealLabel(mk)).replace('{n}', String(list.length))}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {list.map((x) => (
                              <span key={x.key} className="inline-flex items-center gap-1.5 bg-white border border-[#E9E5DB] rounded-full h-9 px-3.5 text-[12px] font-semibold text-[#0F4C3A] max-w-full">
                                <span className="truncate max-w-[150px]">{x.dish.name} <span className="num">{x.dish.cal_serv}</span></span>
                                <button type="button" onClick={() => removeChip(x.key, mk)} className="text-[#9AA19D] hover:text-red-500 text-[11px] shrink-0">✕</button>
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    {!selectedDishKeys.length && <div className="text-[11.5px] text-[#A0A8A4]">{t('wizard.step3.addHint')}</div>}
                  </div>
                  {selectedDishKeys.length > 0 && (
                    <div className="mt-3 rounded-[12px] border border-[#D4AF37]/50 bg-[#FFF8E7] p-2.5">
                      <div className="text-[12px] text-[#0F4C3A] font-semibold">
                        {t('wizard.step3.total').replace('{cal}', String(totalCal)).replace('{n}', String(selectedDishKeys.length))}
                      </div>
                    </div>
                  )}
                  {planType !== 'nutrition' && (
                    <button type="button" onClick={autoPickDishes} className="mt-3 w-full h-11 rounded-[14px] bg-[#F4F1EB] text-[#0F4C3A] text-[13px] font-bold border border-[#E3E0D8] hover:border-[#D4AF37] transition-all active:scale-[0.98]">
                      {t('wizard.step2.autoBtn')} 🍽️
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={back} className="btn-secondary flex-1 h-[54px] rounded-[16px] text-[15px] font-bold">
                {t('wizard.back')}
              </button>
              <button type="button" onClick={next} className="btn-primary flex-1 h-[54px] rounded-[16px] text-[15px] font-bold">
                {t('wizard.step3.continue')}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-6`}>
              <h2 className="text-[18px] font-extrabold">{t('wizard.step4.goal')}</h2>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {GOAL_ORDER.map((g) => {
                  const on = goal === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => changeGoal(g)}
                      className={`relative rounded-[18px] border-2 px-2 py-4 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${on ? 'border-[#0F4C3A] bg-[#0F4C3A] text-white shadow-[0_8px_18px_rgba(15,76,58,0.22)]' : 'border-[#EFEBE4] bg-white text-[#0F4C3A] hover:border-[#D4AF37]'}`}
                    >
                      <span className="text-[24px] leading-none">{GOAL_ICONS[g]}</span>
                      <span className={`text-[12px] font-bold text-center leading-tight ${on ? 'text-white' : 'text-[#0F4C3A]'}`}>{goalLabel(g)}</span>
                      {on && <span className="absolute top-2 end-2 w-5 h-5 rounded-full bg-[#D4AF37] text-[#0F4C3A] flex items-center justify-center text-[11px] font-bold">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`${cardBase} p-6`}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="wiz-label" htmlFor="wz-target">{t('wizard.step4.targetWeight')}</label>
                  <div className="relative">
                    <input
                      id="wz-target"
                      value={targetWeight}
                      onChange={(e) => setTargetWeight(e.target.value.replace(/[^0-9.]/g, ''))}
                      inputMode="decimal"
                      className={`${inputDefault} pr-14`}
                    />
                    <span className="absolute inset-y-0 end-4 flex items-center text-[13px] font-bold text-[#A0A8A4]">{t('wizard.unit.kg')}</span>
                  </div>
                </div>
                <div>
                  <label className="wiz-label" htmlFor="wz-timeline">{t('wizard.step4.timeline')}</label>
                  <div className="relative">
                    <input
                      id="wz-timeline"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value.replace(/\D/g, ''))}
                      inputMode="numeric"
                      className={`${inputDefault} pr-14`}
                    />
                    <span className="absolute inset-y-0 end-4 flex items-center text-[13px] font-bold text-[#A0A8A4]">{t('wizard.unit.weeks')}</span>
                  </div>
                </div>
              </div>
              {(() => {
                const v = goalViolation();
                return v ? (
                  <div className="mt-3 rounded-[12px] bg-red-50 border border-red-200 px-3.5 py-2 text-[12px] font-semibold text-red-600 leading-snug">⚠️ {v}</div>
                ) : null;
              })()}
              {!numbers && <div className="mt-3 text-[12px] text-[#A0A8A4]">{t('fcProfileNote')}</div>}
            </div>

            <div className={`${cardBase} p-6`}>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <h2 className="text-[18px] font-extrabold">
                    {GOAL_ICONS[goal]} {t('wizard.step4.intensity')}
                  </h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{t('wizard.step4.intensitySub')}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DIETS[goal].map((d, idx) => {
                  const on = dietId === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDietId(d.id)}
                      className={`relative rounded-[18px] border-2 p-4 text-start transition-all min-w-0 ${on ? 'border-[#D4AF37] bg-[#FFFBEF] shadow-[0_0_0_4px_rgba(212,175,55,0.15)]' : 'border-[#EFEBE4] bg-white hover:border-[#D4AF37]'}`}
                    >
                      {idx === 1 && (
                        <span className="absolute -top-2.5 end-3 text-[9.5px] font-extrabold tracking-wide bg-[#0F4C3A] text-white px-2.5 py-0.5 rounded-full">
                          {t('wizard.step4.recommended')}
                        </span>
                      )}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[18px] leading-none">{d.emoji}</span>
                        {on && <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#0F4C3A] flex items-center justify-center text-[11px] font-bold">✓</span>}
                      </div>
                      <div className="mt-2 text-[14px] font-extrabold leading-tight">{intensityLabel(d.level)}</div>
                      <div className="mt-0.5 text-[11px] text-[#6B7A75] leading-snug">{intensityTag(d.level)}</div>
                      <div className="mt-2 inline-flex items-center text-[12px] font-bold text-[#B8860B] bg-[#FFF8E7] px-2.5 py-1 rounded-full">
                        {deltaT(goal, d)}
                      </div>
                      {d.warning && <div className="mt-2 text-[10.5px] font-semibold text-red-600 leading-snug">⚠️ {t('wizard.step4.consultDoctor')}</div>}
                    </button>
                  );
                })}
              </div>
            </div>

            {numbers && (
              <div className={`${cardBase} p-6`}>
                <h2 className="text-[16px] font-extrabold">📈 {t('wizard.step4.projection')}</h2>
                <p className="mt-2 text-[14px] text-[#6B7A75] leading-relaxed break-words">{projectionText}</p>
                <div className="mt-2 text-[13px] font-semibold text-[#0F4C3A]">
                  {t('wizard.step4.targetCal').replace('{n}', String(numbers.targetCal))}
                </div>
                <div className="mt-2 text-[12px] text-[#8A938E]">{numbers.wk.name} · {ACTIVITY_LABEL(activity)}</div>
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={back} className="btn-secondary flex-1 h-[54px] rounded-[16px] text-[15px] font-bold">
                {t('wizard.back')}
              </button>
              <button type="button" onClick={next} disabled={!isValid()} className="btn-primary flex-1 h-[54px] rounded-[16px] text-[15px] font-bold disabled:opacity-40 disabled:cursor-not-allowed">
                {t('wizard.next')}
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="mt-6 max-w-[940px] mx-auto flex flex-col gap-5">
            <div className="rounded-[26px] overflow-hidden border border-[#EFEBE4] shadow-[0_14px_40px_rgba(15,76,58,0.1)]">
              <div className="px-5 md:px-6 py-4 text-white flex items-center gap-3" style={{ background: 'linear-gradient(135deg,#0F4C3A,#14532D 60%,#1f6b52)' }}>
                <span className="w-11 h-11 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white font-extrabold text-[15px] tracking-wider shrink-0">HC</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[17px] md:text-[19px] font-extrabold leading-tight truncate">{t('wizard.step5.title')}</div>
                  <div className="text-white/75 text-[12px] leading-[14px] mt-0.5 truncate">{t('wizard.step5.subtitle')}</div>
                </div>
                <span className="wiz-progress-badge shrink-0 hidden sm:inline-flex">{t('wizard.step5.eyebrow')}</span>
              </div>

              <div className="bg-white px-4 md:px-6 py-3 flex items-center justify-between gap-2 border-b border-[#F0ECE2]">
                <button type="button" onClick={() => setStep(4)} className="rounded-full bg-[#F4F1EB] text-[#0F4C3A] text-[12px] font-bold px-4 py-2 flex items-center gap-1 hover:bg-[#ECE8DD] min-w-0">
                  <span className="shrink-0">←</span> {t('wizard.step5.backToEdit')}
                </button>
                <div className="text-[11.5px] text-[#8A938E] min-w-0 truncate text-end">
                  <span className="num">{numbers!.targetCal}</span> kcal · {selectedKitchen.flag} {selectedKitchen.kitchen}
                </div>
              </div>

              <div className="bg-[#FDFBF7] border-b border-[#F0ECE2] px-4 md:px-6 py-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[16px] font-extrabold text-[#0F4C3A] shrink-0">{t('wizard.step5.day').replace('{n}', String(selectedDay))}</span>
                    <span className="text-[11px] font-bold bg-[#FFF8E7] text-[#B8860B] px-2.5 py-1 rounded-full shrink-0">{t('wizard.step5.dayHeader')}</span>
                  </div>
                  <div className="text-[11px] text-[#8A938E] font-semibold shrink-0">{t('wizard.step5.dayOf').replace('{n}', String(selectedDay))}</div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button type="button" onClick={() => setSelectedDay((s) => Math.max(1, s - 1))} className="w-9 h-9 rounded-full bg-white border border-[#E9E5DB] flex items-center justify-center text-[#0F4C3A] hover:border-[#D4AF37] shrink-0">‹</button>
                  <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar justify-between min-w-0">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((d) => {
                      const ad = d === selectedDay;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setSelectedDay(d)}
                          className={`relative w-9 h-9 min-w-[36px] rounded-xl flex items-center justify-center text-[13px] font-bold transition-all ${ad ? 'bg-[#D4AF37] text-[#0F4C3A] shadow-[0_4px_10px_rgba(212,175,55,0.4)]' : 'bg-white border border-[#E9E5DB] text-[#6B7A75] hover:border-[#D4AF37]'}`}
                        >
                          <span className="num">{d}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button type="button" onClick={() => setSelectedDay((s) => Math.min(8, s + 1))} className="w-9 h-9 rounded-full bg-white border border-[#E9E5DB] flex items-center justify-center text-[#0F4C3A] hover:border-[#D4AF37] shrink-0">›</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-[22px] p-5 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#D4AF37,#C9A032 70%,#b3922c)' }}>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#3a2f05]/80">{t('wizard.step5.statCalories')}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="num text-[34px] font-black text-[#0F4C3A] leading-none">{numbers!.targetCal}</span>
                  <span className="text-[15px] font-bold text-[#0F4C3A]">kcal</span>
                </div>
                <div className="mt-1 text-[11.5px] font-semibold text-[#3a2f05]/80">
                  {t('wizard.step2.maintenance')} <span className="num">{numbers!.tdeeWorkout}</span> + <span className="num">{numbers!.delta}</span>
                </div>
              </div>

              <div className="rounded-[22px] p-5 border border-[#E8E2D4] bg-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6B7A75]">💧 {t('wizard.step5.statWater')}</div>
                  <span className="num text-[17px] font-extrabold text-[#0F4C3A]">{t('wizard.step5.water').replace('{cur}', water.toFixed(1)).replace('{goal}', waterGoal.toFixed(1))}</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button type="button" onClick={() => setWater((s) => Math.max(0, +(s - 0.25).toFixed(2)))} className="w-7 h-7 rounded-full bg-[#F4F1EB] border border-[#E9E5DB] flex items-center justify-center text-[#0F4C3A] text-[14px] font-bold">−</button>
                  <div className="flex-1 h-2.5 rounded-full bg-[#E9E5DB] overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, (water / waterGoal) * 100)}%`, background: 'linear-gradient(90deg,#2ba17f,#0F4C3A)' }} />
                  </div>
                  <button type="button" onClick={() => setWater((s) => Math.min(waterGoal, +(s + 0.25).toFixed(2)))} className="w-7 h-7 rounded-full bg-[#F4F1EB] border border-[#E9E5DB] flex items-center justify-center text-[#0F4C3A] text-[14px] font-bold">+</button>
                </div>
                <div className="mt-1.5 text-[11px] font-bold text-[#2ba17f]">+250ml</div>
              </div>

              <div className="rounded-[22px] p-5 border border-[#E8E2D4] bg-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6B7A75]">🍽️ {t('wizard.step5.statMealsDone')}</div>
                  <span className="num w-9 h-9 rounded-full bg-[#FFF8E7] border border-[#E9D9A8] text-[#B8860B] flex items-center justify-center text-[14px] font-extrabold">{doneCount}/3</span>
                </div>
                <div className="mt-3 h-2.5 rounded-full bg-[#E9E5DB] overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(doneCount / 3) * 100}%`, background: 'linear-gradient(90deg,#D4AF37,#C9A032)' }} />
                </div>
                <div className="mt-2 text-[12px] font-semibold text-[#6B7A75]">
                  {t('wizard.step5.completed').replace('{n}', String(doneCount))}
                </div>
              </div>
            </div>

            <div className="rounded-[26px] bg-white border border-[#EFEBE4] shadow-[0_10px_30px_rgba(15,76,58,0.06)] p-5 md:p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="text-[16px] font-extrabold">🍱 {t('wizard.step5.statMealsDone')}</h3>
                <span className="text-[11px] font-bold bg-[#FFF8E7] text-[#B8860B] px-3 py-1 rounded-full">
                  {t('wizard.step5.day').replace('{n}', String(selectedDay))} · {calT(numbers!.targetCal)}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {step5Meals.map((m, idx) => {
                  const plan = mealPlan[idx];
                  const calServ = plan && plan.dish ? Math.round((plan.dish.cal_100 * plan.grams) / 100) : 380;
                  const p = plan && plan.dish ? Math.round((plan.dish.p * plan.grams) / 100) : 0;
                  const c = plan && plan.dish ? Math.round((plan.dish.c * plan.grams) / 100) : 0;
                  const f = plan && plan.dish ? Math.round((plan.dish.f * plan.grams) / 100) : 0;
                  const done = idx < 3 ? mealsDone[idx] : false;
                  return (
                    <div
                      key={m.key}
                      className={`rounded-[18px] border-2 p-4 flex items-center justify-between transition-colors ${done ? 'border-[#0F4C3A] bg-[#F2F8F4]' : 'border-[#EFEBE4] bg-white'}`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="w-11 h-11 rounded-[14px] bg-[#F4F1EB] flex items-center justify-center text-[18px] shrink-0">{m.emoji}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[13px] font-extrabold text-[#0F4C3A]">{mealLabel(m.key)}</span>
                            <span className="text-[11px] text-[#8A938E]">{mealTime(m.key)}</span>
                          </div>
                          <div className="text-[12px] text-[#6B7A75] truncate break-words min-w-0 mt-0.5">{plan && plan.dish ? plan.dish.name : ''}</div>
                          <div className="mt-1 text-[10.5px] text-[#8A938E]">
                            <span className="num font-bold text-[#B8860B]">{calServ}</span> kcal · {macrosT(p, c, f)}
                          </div>
                        </div>
                      </div>
                      {idx < 3 && (
                        <button
                          type="button"
                          onClick={() => setMealsDone((prev) => prev.map((v, i) => (i === idx ? !v : v)))}
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ml-2 ${done ? 'bg-[#0F4C3A] border-[#0F4C3A] text-white' : 'border-[#C8C4B8] bg-white'}`}
                        >
                          {done ? '✓' : ''}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button type="button" onClick={() => window.print()} className="rounded-full bg-white border border-[#E9E5DB] text-[#0F4C3A] px-5 py-2.5 text-[13px] font-bold flex items-center gap-1.5 hover:border-[#D4AF37] transition-all">
                <span>⬇️</span> {t('wizard.step5.downloadPdf')}
              </button>
              <button type="button" onClick={() => setEmailOpen(true)} className="rounded-full bg-white border border-[#E9E5DB] text-[#0F4C3A] px-5 py-2.5 text-[13px] font-bold flex items-center gap-1.5 hover:border-[#D4AF37] transition-all">
                <span>✉️</span> {t('wizard.step5.emailPlan')}
              </button>
              <button type="button" onClick={() => notify(t('wizard.toast.progress'))} className="rounded-full bg-white border border-[#E9E5DB] text-[#0F4C3A] px-5 py-2.5 text-[13px] font-bold flex items-center gap-1.5 hover:border-[#D4AF37] transition-all">
                <span>📊</span> {t('wizard.step5.progressTracker')}
              </button>
              {planType !== 'nutrition' && (
                <button type="button" onClick={() => setStep(2)} className="rounded-full bg-white border border-[#E9E5DB] text-[#0F4C3A] px-5 py-2.5 text-[13px] font-bold flex items-center gap-1.5 hover:border-[#D4AF37] transition-all">
                  <span>🏋️</span> {t('wizard.step5.exerciseChange')}
                </button>
              )}
            </div>

            {planType !== 'nutrition' && (
              <div className="rounded-[26px] bg-white border border-[#EFEBE4] shadow-[0_10px_30px_rgba(15,76,58,0.06)] p-5 md:p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-[12px] bg-[#F4F1EB] flex items-center justify-center text-[16px] shrink-0">🏋️</span>
                    <div>
                      <div className="text-[15px] font-extrabold">{t('wizard.step5.fitnessPlan')}</div>
                      <div className="text-[11px] text-[#8A938E]">{numbers!.wk.name}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold bg-[#FFF8E7] text-[#B8860B] px-3 py-1 rounded-full shrink-0">
                    {t('wizard.step5.exercisesCount').replace('{n}', String(plannedExercises.length))}
                  </span>
                </div>
                {plannedExercises.length ? (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {plannedExercises.map((ex) => (
                      <div key={ex.id} className="flex items-center gap-2.5 rounded-[14px] border border-[#EFEBE4] bg-[#FDFBF7] px-3 py-2.5 min-w-0">
                        <span className="text-[15px] leading-none shrink-0">{ex.emoji}</span>
                        <span className="truncate text-[12px] font-bold flex-1 min-w-0">{ex.name}</span>
                        <span className="shrink-0 text-[10.5px] font-bold bg-white border border-[#E9E5DB] px-2 py-0.5 rounded-full">{ex.sets !== '1' ? `${ex.sets} × ${ex.reps}` : ex.reps} · {ex.dur}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 text-[12px] text-[#8A938E]">{t('wizard.step5.noExercises')}</div>
                )}
                <button type="button" onClick={() => setStep(2)} className="mt-3 text-[11.5px] text-[#B8860B] underline decoration-dotted">{t('wizard.step5.editExercises')}</button>
              </div>
            )}

            {planType !== 'fitness' && (
              <div className="rounded-[26px] bg-white border border-[#EFEBE4] shadow-[0_10px_30px_rgba(15,76,58,0.06)] p-5 md:p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-[12px] bg-[#F4F1EB] flex items-center justify-center text-[16px] shrink-0">🍽️</span>
                    <div>
                      <div className="text-[15px] font-extrabold">{t('wizard.step5.nutritionPlan')}</div>
                      <div className="text-[11px] text-[#8A938E]">{selectedKitchen.flag} {selectedKitchen.country}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold bg-[#FFF8E7] text-[#B8860B] px-3 py-1 rounded-full shrink-0">
                    {selectedDishKeys.length ? t('wizard.step5.dishesCount').replace('{n}', String(selectedDishKeys.length)) : calT(numbers!.targetCal)}
                  </span>
                </div>
                <div className="mt-3 space-y-1.5">
                  {selectedDishKeys.length ? (
                    MEAL_ORDER.map((mk) => {
                      const list = mealSummary[mk];
                      if (!list.length) return null;
                      return (
                        <div key={mk} className="text-[11.5px] leading-relaxed break-words text-[#6B7A75]">
                          <span className="font-extrabold text-[#0F4C3A]">{mealLabel(mk)}:</span>{' '}
                          {list.map((x, i) => (
                            <span key={x.key}>
                              {i > 0 && ' + '}
                              {x.dish.name} <span className="num">({x.dish.cal_serv})</span>
                            </span>
                          ))}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-[12px] text-[#8A938E]">
                      {t('wizard.step5.noDishes')} — {t('wizard.step3.autoTitle')} ✨
                    </div>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setStep(3)} className="text-[11.5px] text-[#B8860B] underline decoration-dotted">{t('wizard.step5.changeCuisine')}</button>
                  {selectedDishKeys.length > 0 && (
                    <span className="text-[12px] font-bold text-[#0F4C3A]">
                      {t('wizard.step3.total').replace('{cal}', String(totalCal)).replace('{n}', String(selectedDishKeys.length))}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="no-print fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-[#EFEBE4] px-4 py-3 flex items-center justify-between gap-2 max-w-[940px] mx-auto rounded-t-[20px] shadow-[0_-8px_24px_rgba(15,76,58,0.08)]">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#2ba17f] animate-pulse shrink-0" />
                <span className="text-[12px] font-bold text-[#6B7A75] truncate">{t('wizard.step5.completed').replace('{n}', String(doneCount))}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button type="button" onClick={() => notify(t('wizard.toast.closePreview'))} className="text-[12.5px] font-bold text-[#6B7A75] px-3 py-2 rounded-xl hover:bg-[#F4F1EB]">
                  {t('wizard.step5.close')}
                </button>
                <button
                  type="button"
                  onClick={() => notify(t('wizard.step5.savedToast'))}
                  className="h-[46px] px-5 rounded-[16px] bg-[#D4AF37] text-[#0F4C3A] font-extrabold text-[14px] flex items-center gap-2 shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:translate-y-[-1px] transition-all active:scale-95"
                >
                  <span>✓</span> {t('wizard.step5.saveProgress')}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {toast && (
        <div className="no-print fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-full bg-[#0F4C3A] text-white text-[12.5px] font-semibold px-5 py-2.5 shadow-lg whitespace-nowrap">
          {toast}
        </div>
      )}

      {emailOpen && (
        <div className="no-print fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-end md:items-center justify-center">
          <div className="w-full max-w-[520px] bg-white rounded-t-[20px] md:rounded-[20px] p-5 shadow-xl relative">
            <button
              type="button"
              onClick={() => {
                setEmailOpen(false);
                setEmailDone('');
                setEmailSending(false);
              }}
              className="absolute top-4 end-4 w-7 h-7 rounded-full text-zinc-400 hover:text-zinc-700 text-[16px]"
            >
              ✕
            </button>
            {emailDone ? (
              <div className="pt-2">
                <div className="h-10 w-10 rounded-full bg-[#FFF8E7] border border-[#E9D9A8] text-[#B8860B] flex items-center justify-center text-xl">✓</div>
                <h3 className="mt-3 text-[17px] font-bold">Sent</h3>
                <p className="mt-1 text-[13.5px] text-zinc-600 break-words">PDF sent to {emailDone}</p>
                <button
                  type="button"
                  onClick={() => {
                    setEmailOpen(false);
                    setEmailDone('');
                    setEmailSending(false);
                  }}
                  className="mt-5 w-full h-[48px] rounded-[14px] bg-[#D4AF37] text-[#0F4C3A] text-[14px] font-extrabold"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="pt-2">
                <h3 className="text-[17px] font-bold">Send Blueprint</h3>
                <p className="mt-1 text-[13px] text-zinc-500">Receive the blueprint as a PDF on your email.</p>
                <label className="mt-4 block text-[12.5px] font-medium text-zinc-700">Email address</label>
                <input
                  type="email"
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  placeholder="you@example.com"
                  inputMode="email"
                  className="mt-1.5 w-full h-[48px] rounded-[14px] border border-[#E9E5DB] px-4 outline-none focus:border-[#D4AF37] focus:ring-[3px] focus:ring-[#D4AF37]/20 bg-white"
                />
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEmailOpen(false)}
                    className="h-[48px] px-5 rounded-[14px] border border-[#E9E5DB] bg-[#F4F1EB] text-[#0F4C3A] text-[14px] font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={sendEmail}
                    disabled={emailSending || !emailText.trim()}
                    className={`flex-1 h-[48px] rounded-[14px] text-[14px] font-extrabold ${emailSending || !emailText.trim() ? 'bg-[#E9E5DB] text-[#A0A8A4]' : 'bg-[#D4AF37] text-[#0F4C3A]'}`}
                  >
                    {emailSending ? 'Sending…' : 'Send'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeightLossPage;