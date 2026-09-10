import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    { id: 'normal_lose', label: 'رجيم عادي - نزول صحي', short: 'عادي', emoji: '🟢', deficit: 300, surplus: 0, rate: '0.25 كجم/أسبوع', desc: 'نزول بطيء صحي - مناسب للمبتدئين - لا جوع', workoutMod: 1.0, proteinFactor: 1.2, level: 'normal', healthyOnly: false },
    { id: 'medium_lose', label: 'رجيم متوسط - نزول متوسط', short: 'متوسط', emoji: '🟡', deficit: 500, surplus: 0, rate: '0.5 كجم/أسبوع', desc: 'الأكثر شيوعاً - توازن بين النزول والطاقة', workoutMod: 1.1, proteinFactor: 1.6, level: 'medium', healthyOnly: false },
    { id: 'harsh_lose', label: 'رجيم قاسي - نزول سريع', short: 'قاسي', emoji: '🔴', deficit: 800, surplus: 0, rate: '0.8-1 كجم/أسبوع', desc: 'سريع لكن يحتاج متابعة - عالي البروتين - تمارين أكثر', workoutMod: 1.3, proteinFactor: 2.0, level: 'harsh', healthyOnly: true, warning: 'استشر طبيب' },
  ],
  gain_muscle: [
    { id: 'lean_bulk', label: 'Lean Bulk - بناء نظيف', short: 'Lean', emoji: '🟢', deficit: 0, surplus: 250, rate: '+0.25 كجم/أسبوع', desc: 'زيادة عضل نظيفة - دهون قليلة', workoutMod: 1.2, proteinFactor: 2.0, level: 'normal', healthyOnly: false },
    { id: 'moderate_bulk', label: 'Moderate Bulk - زيادة متوازنة', short: 'Moderate', emoji: '🟡', deficit: 0, surplus: 400, rate: '+0.4 كجم/أسبوع', desc: 'زيادة متوازنة عضل + وزن', workoutMod: 1.3, proteinFactor: 2.0, level: 'medium', healthyOnly: false },
    { id: 'aggressive_bulk', label: 'Aggressive Bulk - تضخيم سريع', short: 'Aggressive', emoji: '🔴', deficit: 0, surplus: 600, rate: '+0.6 كجم/أسبوع', desc: 'تضخيم سريع - سعرات عالية + تمارين قوية', workoutMod: 1.5, proteinFactor: 2.2, level: 'harsh', healthyOnly: false },
  ],
  gain_weight: [
    { id: 'normal_gain', label: 'زيادة عادية - نظيفة', short: 'عادي', emoji: '🟢', deficit: 0, surplus: 250, rate: '+0.25 كجم/أسبوع', desc: 'زيادة وزن صحية - دهون قليلة', workoutMod: 1.2, proteinFactor: 1.8, level: 'normal', healthyOnly: false },
    { id: 'medium_gain', label: 'زيادة متوسطة', short: 'متوسط', emoji: '🟡', deficit: 0, surplus: 400, rate: '+0.4 كجم/أسبوع', desc: 'زيادة متوازنة عضل + وزن', workoutMod: 1.3, proteinFactor: 2.0, level: 'medium', healthyOnly: false },
    { id: 'harsh_gain', label: 'زيادة قاسية - تضخيم سريع', short: 'قاسي', emoji: '🔴', deficit: 0, surplus: 600, rate: '+0.6 كجم/أسبوع', desc: 'تضخيم سريع - سعرات عالية + تمارين قوية', workoutMod: 1.5, proteinFactor: 2.2, level: 'harsh', healthyOnly: false },
  ],
  wellness: [
    { id: 'well_balanced', label: 'Balanced - متوازن', short: 'Balanced', emoji: '🟢', deficit: 0, surplus: 0, rate: '0 كجم/أسبوع', desc: 'متوازن تماماً - طعام صحي فقط', workoutMod: 1.0, proteinFactor: 1.4, level: 'normal', healthyOnly: true },
    { id: 'well_deficit', label: 'Slight Deficit - عجز خفيف', short: 'Deficit', emoji: '🟡', deficit: 200, surplus: 0, rate: '-0.2 كجم/أسبوع', desc: 'عجز خفيف - صحي - طعام صحي فقط', workoutMod: 1.1, proteinFactor: 1.6, level: 'medium', healthyOnly: true },
    { id: 'well_surplus', label: 'Slight Surplus - فائض خفيف', short: 'Surplus', emoji: '🔵', deficit: 0, surplus: 200, rate: '+0.2 كجم/أسبوع', desc: 'فائض خفيف لزيادة الطاقة - طعام طاقة', workoutMod: 1.1, proteinFactor: 1.5, level: 'medium', healthyOnly: false },
  ],
  athletic: [
    { id: 'ath_endurance', label: 'تحمّل Endurance', short: 'Endurance', emoji: '🟢', deficit: 0, surplus: 100, rate: 'أداء متوازن', desc: 'تغذية تحمّل - كربوهيدرات كافية', workoutMod: 1.2, proteinFactor: 1.6, level: 'normal', healthyOnly: false },
    { id: 'ath_strength', label: 'قوة Strength', short: 'Strength', emoji: '🟡', deficit: 0, surplus: 200, rate: 'أداء قوة', desc: 'بروتين أعلى + سعرات للقوة', workoutMod: 1.3, proteinFactor: 1.8, level: 'medium', healthyOnly: false },
    { id: 'ath_peak', label: 'أداء عالي Peak', short: 'Peak', emoji: '🔴', deficit: 0, surplus: 300, rate: 'أداء احترافي', desc: 'سعرات عالية + بروتين للأداء العالي', workoutMod: 1.5, proteinFactor: 2.0, level: 'harsh', healthyOnly: false },
  ],
};

const GOAL_ICONS: Record<GoalKey, string> = { lose: '⚖️', gain_muscle: '💪', gain_weight: '📈', wellness: '✨', athletic: '🏃' };
const GOAL_BTN: Record<GoalKey, string> = { lose: 'Lose Weight', gain_muscle: 'Gain Muscle', gain_weight: 'Gain Weight', wellness: 'Wellness & Maint.', athletic: 'Athletic' };
const GOAL_LABELS: Record<GoalKey, string> = { lose: 'تخسيس', gain_muscle: 'بناء عضلات', gain_weight: 'زيادة وزن صحية', wellness: 'صحة وعافية', athletic: 'أداء رياضي' };
const GOAL_INTENSITY_LABEL: Record<GoalKey, string> = {
  lose: 'اختر شدة الرجيم للتخسيس',
  gain_muscle: 'اختر شدة بناء العضلات',
  gain_weight: 'اختر شدة زيادة الوزن',
  wellness: 'اختر شدة الصحة والعافية',
  athletic: 'اختر شدة الأداء الرياضي',
};

const signedDelta = (g: GoalKey, d: DietIntensity): string => {
  if (g === 'wellness') return d.deficit ? `-${d.deficit}` : d.surplus ? `+${d.surplus}` : '0';
  if (g === 'lose') return `-${d.deficit}`;
  return d.surplus ? `+${d.surplus}` : '0';
};

const getDiet = (g: GoalKey, id: string): DietIntensity => DIETS[g].find((d) => d.id === id) ?? DIETS[g][0];

const STEP_TITLES: Record<Step, string> = {
  1: 'Basic Info',
  2: 'Body',
  3: 'Kitchen & Food',
  4: 'Goals',
  5: 'Blueprint',
};

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

const MEAL_TABS: { key: MealKey; label: string; emoji: string; active: string }[] = [
  { key: 'breakfast', label: 'فطار', emoji: '🍳', active: 'bg-emerald-600 text-white border-emerald-600' },
  { key: 'lunch', label: 'غدا', emoji: '🍛', active: 'bg-emerald-600 text-white border-emerald-600' },
  { key: 'dinner', label: 'عشا', emoji: '🌙', active: 'bg-emerald-600 text-white border-emerald-600' },
  { key: 'snacks', label: 'سناك', emoji: '🍎', active: 'bg-emerald-600 text-white border-emerald-600' },
];

function getMealTypesForDish(k: KitchenInfo, cat: KitchenCategory, dish: KitchenDish): MealKey[] {
  const types: MealKey[] = [];
  for (const key of ['breakfast', 'lunch', 'dinner', 'snacks'] as MealKey[]) {
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
  <svg viewBox="0 0 100 160" className="h-[80px] w-[50px] shrink-0 overflow-visible" aria-hidden="true">
    <defs>
      <linearGradient id={`gb${kind === 'male' ? 'M' : 'F'}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6ee7b7" />
        <stop offset="0.5" stopColor="#10b981" />
        <stop offset="1" stopColor="#065f46" />
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
  const [kitchenMode, setKitchenMode] = useState<'manual' | 'auto'>('manual');
  const [categoryMode, setCategoryMode] = useState<'manual' | 'auto'>('manual');
  const [exerciseMode, setExerciseMode] = useState<'manual' | 'auto'>('manual');
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
  const [toast, setToast] = useState('');

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
    console.log('Loaded:', found.length, 'total:', found.reduce((s, k) => s + k.total, 0));
    return found;
  }, []);
  const selectedKitchenCats = useMemo<KitchenCategory[]>(() => getKitchenCategories(selectedKitchen), [selectedKitchen]);
  const countryOptions = useMemo(() => {
    const e = kitchensRegistry.find((k) => k.id === 'egyptian');
    const t = kitchensRegistry.find((k) => k.id === 'tunisian');
    const eTot = e?.total ?? 0;
    const tTot = t?.total ?? 0;
    return [
      { m: 'egyptian' as const, flag: '🇪🇬', label: 'مصر', count: eTot },
      { m: 'tunisian' as const, flag: '🇹🇳', label: 'تونس', count: tTot },
      { m: 'both' as const, flag: '🌍', label: 'الاثنين', count: eTot + tTot },
    ];
  }, []);
  const searchPlaceholder = countryMode === 'egyptian' ? 'ابحث عن أكلة مصرية...' : countryMode === 'tunisian' ? 'ابحث عن أكلة تونسية...' : 'ابحث عن أكلة...';
  const countryKitchens = useMemo<KitchenInfo[]>(() => {
    const e = kitchensRegistry.find((k) => k.id === 'egyptian');
    const t = kitchensRegistry.find((k) => k.id === 'tunisian');
    const base: KitchenInfo[] = [];
    if (countryMode === 'both') {
      if (e) base.push(e);
      if (t) base.push(t);
    } else {
      const k = countryMode === 'egyptian' ? e : t;
      if (k) base.push(k);
    }
    return base.length ? base : [selectedKitchen];
  }, [countryMode, selectedKitchen]);
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
  const filteredKitchens = useMemo(
    () => featuredKitchens.filter((k) => k.country.includes(kitchenSearch) || k.kitchen.includes(kitchenSearch) || k.flag.includes(kitchenSearch)),
    [featuredKitchens, kitchenSearch],
  );
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
  const fmtMeal = (list: { key: string; dish: KitchenDish }[]): string => {
    if (!list.length) return 'لم تختر أطباق لهذه الوجبة';
    const parts = list.map((x) => `${x.dish.name} ${x.dish.cal_serv}`);
    const cal = list.reduce((s, x) => s + x.dish.cal_serv, 0);
    const p = list.reduce((s, x) => s + (x.dish.p || 0), 0);
    const c = list.reduce((s, x) => s + (x.dish.c || 0), 0);
    const f = list.reduce((s, x) => s + (x.dish.f || 0), 0);
    return `${parts.join(' + ')} = ${cal} سعر | P:${p} C:${c} F:${f}`;
  };
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
          { n: 1, label: 'Info' },
          { n: 2, label: 'Body' },
          { n: 4, label: 'Goals' },
          { n: 5, label: 'Blueprint' },
        ]
      : [
          { n: 1, label: 'Info' },
          { n: 2, label: 'Body' },
          { n: 3, label: 'Kitchen' },
          { n: 4, label: 'Goals' },
          { n: 5, label: 'Blueprint' },
        ];
  const visIdx = visibleSteps.findIndex((x) => x.n === step);

  const kitchenCard = (k: KitchenInfo) => {
    const on = selectedKitchenId === k.id;
    return (
      <div
        key={k.id}
        onClick={() => chooseKitchen(k)}
        className={`rounded-[10px] border-2 cursor-pointer p-2 flex flex-col gap-1.5 transition-all min-w-0 ${on ? 'border-emerald-500 bg-white shadow-md' : 'border-white/70 bg-white/80 hover:border-emerald-300'}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-8 h-8 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-[18px] leading-none shrink-0">{k.flag}</span>
          <div className="min-w-0 flex-1">
            <div className="truncate font-bold text-[12px] leading-tight">{k.country}</div>
            <div className="truncate text-[10.5px] text-zinc-500 leading-snug">{k.kitchen}</div>
          </div>
          <span className="shrink-0 text-[10px] bg-zinc-900 text-white px-2 py-0.5 rounded-full">{k.total}</span>
        </div>
        {k.sample && (
          <div className="rounded-[8px] bg-zinc-50 px-2 py-1 min-w-0">
            <div className="truncate text-[10px] text-zinc-600">🍽 {k.sample.name}</div>
          </div>
        )}
        <div className="flex flex-wrap gap-1">
          {k.conf100 > 0 && <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full">{k.conf100}×100%</span>}
          {k.conf85 > 0 && <span className="text-[9px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">{k.conf85}×85%</span>}
          {k.conf70 > 0 && <span className="text-[9px] bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-full">{k.conf70}×70%</span>}
          {on && <span className="ml-auto text-[9px] font-semibold text-emerald-600">✓ مختار</span>}
        </div>
      </div>
    );
  };

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
      for (const k of countryKitchens) {
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
    const fallbackKitchen = countryKitchens[0] ?? selectedKitchen;
    const fallback = pickPlate(filterDishes(fallbackKitchen, diet, goal));
    const meals: { meal: string; dish: KitchenDish | undefined; grams: number }[] = [
      { meal: MEAL_NAMES.breakfast, dish: pickAssigned('breakfast') ?? pickLight(poolFor('breakfast')), grams: Math.round(baseG * 0.85) },
      { meal: MEAL_NAMES.lunch, dish: pickAssigned('lunch') ?? pickHeavy(poolFor('lunch')), grams: Math.round(baseG * 1.4) },
      { meal: MEAL_NAMES.dinner, dish: pickAssigned('dinner') ?? pickLight(poolFor('dinner')), grams: Math.round(baseG * 1.25) },
      { meal: MEAL_NAMES.snacks, dish: pickAssigned('snacks') ?? pickSmall(poolFor('snacks')), grams: Math.round(baseG * 0.6) },
    ];
    return meals.map((m, i) => ({ meal: m.meal, dish: m.dish ?? fallback[i], grams: m.grams }));
  }, [countryKitchens, selectedKitchen, diet, goal, mealSummary]);

  const isValid = (): boolean => {
    if (step === 1) {
      return parsed.age >= 12 && parsed.age <= 80 && parsed.height >= 120 && parsed.height <= 220 && parsed.weight >= 30 && parsed.weight <= 250;
    }
    if (step === 4) {
      return parsed.target >= 30 && parsed.target <= 250 && parsed.timeline >= 2 && parsed.timeline <= 52;
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

  const autoPickExercises = () => {
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
    notify('تم الاختيار التلقائي حسب هدفك ونشاطك 🤖');
  };

  const saveExercises = () => {
    localStorage.setItem('hc_planned_exercises', JSON.stringify(plannedExercises));
    notify(`تم حفظ ${plannedExercises.length} تمرين للـ Blueprint 💾`);
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
    notify(`تم اختيار ${keys.length} طبق تلقائياً 🤖`);
  };

  const toggleDish = (key: string) => {
    setSelectedDishKeys((prev) => (prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]));
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

  const inputClass = 'w-full h-[44px] rounded-[8px] border border-zinc-300 px-4 text-[16px] outline-none focus:border-[#1e40af] focus:ring-[3px] focus:ring-blue-100 bg-white';
  const waterGoal = numbers ? +Math.max(2, Math.min(3.5, parsed.weight * 0.033)).toFixed(1) : 2.3;
  const doneCount = mealsDone.filter(Boolean).length;
  const projectionText = !numbers
    ? ''
    : goal === 'wellness'
      ? `الحفاظ على ${parsed.weight}kg وتحسين الصحة العامة · ${numbers.diet.rate} · نوم ونشاط أفضل.`
      : `من ${parsed.weight}kg إلى ${parsed.target}kg خلال ${parsed.timeline} أسابيع · ${numbers.diet.rate} · ${
          goal === 'lose' && parsed.weight > parsed.target ? 'معدل آمن.' : goal === 'gain_muscle' || goal === 'gain_weight' ? 'زيادة محسوبة.' : 'أداء محسوب.'
        }`;

  return (
    <div className={`wiz-page min-h-screen text-zinc-900 overflow-x-hidden antialiased ${step === 1 || step === 3 ? 'bg-gradient-to-b from-[#a7f3d0] via-[#6ee7b7] to-[#34d399]' : 'bg-[#f8fafc]'}`} dir="ltr">
      <main className={`w-full mx-auto transition-all ${step === 1 ? 'max-w-[400px] px-5 pt-6 pb-[150px] md:pb-24 overflow-x-hidden' : step === 2 ? 'max-w-[480px] px-4 md:px-5 pb-[120px] md:pb-16 pt-2 md:pt-4' : step === 3 ? 'max-w-[480px] px-4 md:px-5 pt-2 md:pt-4 pb-[120px] md:pb-16 overflow-x-hidden' : 'max-w-[760px] px-4 md:px-0 pb-[120px] md:pb-16 pt-8 md:pt-12 overflow-x-hidden'}`}>
        {step !== 1 && step !== 2 && step !== 3 && step !== 5 && (
          <>
            <div className="mb-8">
              <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight leading-none">Weight &amp; Fitness</h1>
              <p className="mt-2.5 text-[14px] text-zinc-500 leading-snug">Complete the 5-step setup to calculate your metrics &amp; recommendations</p>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-[14px] left-[14px] right-[14px] h-[2px] bg-zinc-200" />
                <div className="absolute top-[14px] left-[14px] h-[2px] bg-[#1e40af] transition-all duration-300" style={{ width: `${(visIdx / (visibleSteps.length - 1)) * 100}%`, maxWidth: 'calc(100% - 28px)' }} />
                {visibleSteps.map((x) => {
                  const done = step > x.n;
                  const active = step === x.n;
                  return (
                    <div key={x.n} className="relative flex flex-col items-center gap-2 z-10">
                      <div className={`w-7 h-7 rounded-full border-[2px] flex items-center justify-center text-[12px] font-bold bg-white transition-all ${done ? 'bg-[#1e40af] border-[#1e40af] text-white' : ''} ${active ? 'border-[#1e40af] text-[#1e40af] shadow-[0_0_0_4px_rgba(30,64,175,0.12)]' : 'border-zinc-300 text-zinc-400'}`}>
                        {done ? '✓' : x.n}
                      </div>
                      <span className={`text-[11.5px] font-medium tracking-wide ${active ? 'text-[#1e40af]' : done ? 'text-zinc-700' : 'text-zinc-400'}`}>{x.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 text-[12.5px] font-medium text-zinc-500">Step {step} · {STEP_TITLES[step]}</div>
            </div>
          </>
        )}

        <div className="w-full min-w-0">
          {step === 1 && (
            <div className="w-full bg-[#e8f5e9]/90 backdrop-blur rounded-[28px] p-5 shadow-2xl min-w-0">
              <div className="w-full bg-white rounded-full h-12 flex items-center justify-between px-3 shadow-sm min-w-0">
                <button type="button" onClick={() => navigate('/')} aria-label="Back" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-[18px] shrink-0 select-none active:scale-95">‹</button>
                <div className="text-[14px] font-bold text-emerald-900 whitespace-nowrap">Step 1 of 3</div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-3 h-3 rounded-full bg-emerald-600" />
                  <span className="w-2 h-2 rounded-full bg-emerald-300" />
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                </div>
              </div>

              <h2 className="mt-4 text-[26px] font-black leading-tight text-black">Tell us about yourself</h2>
              <p className="text-[14px] text-gray-600 mt-1">We'll use this to personalize your plan</p>

              <div className="mt-5">
                <div className="text-[14px] font-bold mb-2">Age</div>
                <div
                  onClick={() => setEditField((p) => (p === 'age' ? null : 'age'))}
                  className={`rounded-[16px] bg-white shadow-sm border flex items-center px-4 min-h-[68px] cursor-pointer transition-transform active:scale-[0.98] ${editField === 'age' ? 'border-emerald-400 ring-[3px] ring-emerald-100' : 'border-gray-100'}`}
                >
                  <span className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-[22px] shrink-0">📅</span>
                  <div className="flex-1 px-3 min-w-0">
                    <div className="text-[11px] text-gray-500">Age</div>
                    {editField === 'age' ? (
                      <input autoFocus value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, ''))} inputMode="numeric" className="w-full bg-transparent text-[22px] font-bold text-black outline-none min-h-[44px]" />
                    ) : (
                      <div className="text-[22px] font-bold leading-none text-black">{age} years</div>
                    )}
                  </div>
                  <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-[16px] shrink-0">›</span>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-[14px] font-bold text-black mb-2">Gender</div>
                <div className="grid grid-cols-2 gap-3">
                  {(['male', 'female'] as Sex[]).map((x) => {
                    const on = sex === x;
                    return (
                      <button
                        key={x}
                        type="button"
                        onClick={() => setSex(x)}
                        className={`relative flex flex-col items-center justify-center pt-5 pb-4 rounded-[16px] transition-all min-w-0 min-h-[160px] ${on ? 'bg-emerald-500 border-2 border-emerald-600 shadow-md scale-[1.03]' : 'bg-white border border-gray-200 shadow-sm'}`}
                      >
                        <BodyFigure kind={x} />
                        <span className={`mt-2 text-[14px] font-bold leading-none ${on ? 'text-black' : 'text-gray-500'}`}>{x === 'male' ? 'Male' : 'Female'}</span>
                        {on && <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[12px] font-bold shadow-sm">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div
                  onClick={() => setEditField((p) => (p === 'height' ? null : 'height'))}
                  className={`rounded-[16px] bg-white shadow-sm border flex items-center px-3 min-h-[68px] cursor-pointer transition-transform active:scale-[0.98] min-w-0 ${editField === 'height' ? 'border-emerald-400 ring-[3px] ring-emerald-100' : 'border-gray-200'}`}
                >
                  <span className="w-11 h-11 rounded-full bg-emerald-600 flex items-center justify-center text-[20px] shrink-0">📏</span>
                  <div className="flex-1 px-2 min-w-0">
                    <div className="text-[11px] text-emerald-700">Height</div>
                    {editField === 'height' ? (
                      <input autoFocus value={height} onChange={(e) => setHeight(e.target.value.replace(/\D/g, ''))} inputMode="numeric" className="w-full bg-transparent text-[20px] font-bold text-black outline-none min-h-[44px]" />
                    ) : (
                      <div className="text-[20px] font-bold leading-none text-black truncate">{height} cm</div>
                    )}
                  </div>
                  <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-[16px] shrink-0">›</span>
                </div>
                <div
                  onClick={() => setEditField((p) => (p === 'weight' ? null : 'weight'))}
                  className={`rounded-[16px] bg-white shadow-sm border flex items-center px-3 min-h-[68px] cursor-pointer transition-transform active:scale-[0.98] min-w-0 ${editField === 'weight' ? 'border-emerald-400 ring-[3px] ring-emerald-100' : 'border-gray-200'}`}
                >
                  <span className="w-11 h-11 rounded-full bg-emerald-600 flex items-center justify-center text-[20px] shrink-0">⚖️</span>
                  <div className="flex-1 px-2 min-w-0">
                    <div className="text-[11px] text-emerald-700">Weight</div>
                    {editField === 'weight' ? (
                      <input autoFocus value={weight} onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ''))} inputMode="decimal" className="w-full bg-transparent text-[20px] font-bold text-black outline-none min-h-[44px]" />
                    ) : (
                      <div className="text-[20px] font-bold leading-none text-black truncate">{weight} kg</div>
                    )}
                  </div>
                  <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-[16px] shrink-0">›</span>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-[15px] font-bold text-black text-center mb-2">Plan type</div>
                <div className="space-y-2">
                  {([
                    { pt: 'nutrition' as PlanType, emoji: '🍃', label: 'Nutrition only' },
                    { pt: 'fitness' as PlanType, emoji: '🏋️', label: 'Fitness only' },
                    { pt: 'both' as PlanType, emoji: '🎯', label: 'Both' },
                  ]).map(({ pt, emoji, label }) => {
                    const on = planType === pt;
                    return (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => setPlanType(pt)}
                        className={`w-full rounded-full h-10 min-h-[44px] flex items-center px-3 gap-3 border shadow-sm transition-all min-w-0 ${on ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-black border-gray-200'}`}
                      >
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[15px] shrink-0 ${on ? 'bg-white/20' : 'bg-emerald-100'}`}>{emoji}</span>
                        <span className="flex-1 text-left text-[13px] font-bold truncate">{label}</span>
                        {on && <span className="w-6 h-6 rounded-full bg-white text-emerald-600 flex items-center justify-center text-[13px] font-bold shrink-0">✓</span>}
                      </button>
                    );
                  })}
                </div>
                {planType !== 'both' && (
                  <div className="mt-3 rounded-[14px] bg-white/80 border border-emerald-100 px-3.5 py-2 text-[11.5px] text-zinc-600 leading-snug break-words">
                    {planType === 'nutrition' ? '🍽️ Nutrition only: سنخفي التمارين ونركز على المطبخ والأطباق.' : '🏋️ Fitness only: سنخفي المطبخ ونركز على التمارين والحرق.'}
                  </div>
                )}
              </div>

              <div className="sticky bottom-[14px] mt-4 space-y-1 min-w-0">
                <button
                  type="button"
                  onClick={next}
                  disabled={!isValid()}
                  className={`w-full min-h-[56px] rounded-[16px] text-[18px] font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-lg transition-all active:scale-[0.98] ${!isValid() ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  Continue
                </button>
                <button type="button" onClick={() => navigate('/')} className="w-full h-10 min-h-[44px] text-[14px] text-gray-600 underline text-center">Back</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 min-w-0">
              <div className="sticky top-0 z-30 bg-emerald-700 h-14 rounded-t-[20px] flex items-center justify-between px-4 shadow-md min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <button type="button" onClick={() => setStep(1)} className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-emerald-100 text-[18px] shrink-0 active:scale-95">‹</button>
                  <span className="text-[20px] leading-none shrink-0">🏋️</span>
                  <span className="text-white font-bold text-[20px] leading-none whitespace-nowrap">Fitness Body</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[18px] leading-none">🔔</span>
                  <span className="w-8 h-8 rounded-full bg-emerald-600 border border-emerald-400 flex items-center justify-center text-[15px] leading-none">👤</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[18px] font-bold text-gray-900">Activity Level</div>
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">i</span>
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto snap-x no-scrollbar">
                  {(Object.keys(ACTIVITY) as ActivityKey[]).map((x) => {
                    const opt = ACTIVITY[x];
                    const on = activity === x;
                    return (
                      <button
                        key={x}
                        type="button"
                        onClick={() => setActivity(x)}
                        className={`shrink-0 snap-start h-10 min-w-[92px] rounded-full border-2 border-emerald-600 text-[12px] font-bold px-3 flex items-center justify-center gap-1 transition-all active:scale-95 ${on ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-700'}`}
                      >
                        {opt.emoji} {opt.label} {on && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {planType !== 'nutrition' && (
              <>
                <div>
                  <div className="h-12 bg-emerald-100 rounded-[14px] flex items-center px-4 mt-1 border-2 border-emerald-200 focus-within:border-emerald-500 transition-colors">
                    <input
                      value={exerciseSearch}
                      onChange={(e) => setExerciseSearch(e.target.value)}
                      placeholder="ابحث عن نوع تمرين..."
                      dir="rtl"
                      className="flex-1 bg-transparent outline-none text-[16px] text-gray-600 placeholder:text-gray-400 min-w-0"
                    />
                    <span className="text-emerald-700 text-[20px] shrink-0">🔍</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button type="button" onClick={() => setExerciseMode('manual')} className={`flex-1 h-12 rounded-[14px] text-[14px] font-bold border-2 transition-all ${exerciseMode === 'manual' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-700 border-emerald-600'}`}>👆 يدوي</button>
                    <button type="button" onClick={autoPickExercises} className={`flex-1 h-12 rounded-[14px] text-[14px] font-bold border-2 transition-all ${exerciseMode === 'auto' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-700 border-emerald-600'}`}>🤖 الموقع يختار تلقائي</button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[18px] font-bold text-gray-900">Exercise Types</div>
                    <span className="text-[12px] font-semibold text-emerald-700 shrink-0">{EXERCISE_TYPES.length} نوع</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {EXERCISE_TYPES.filter((t) => t.name.includes(exerciseSearch) || t.en.toLowerCase().includes(exerciseSearch.toLowerCase()) || t.focus.includes(exerciseSearch)).map((t) => {
                      const on = exerciseTypes.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => toggleExerciseType(t.id)}
                          className={`relative rounded-[12px] flex flex-col items-center justify-center gap-1.5 py-2 min-h-[80px] cursor-pointer transition-all min-w-0 ${on ? 'border-2 border-emerald-600 bg-emerald-100 shadow-sm' : 'border border-emerald-100 bg-emerald-50 active:scale-95 active:bg-emerald-100 shadow-sm'}`}
                        >
                          {on && <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-bold">✓</span>}
                          <span className="w-10 h-10 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-[20px] shadow-sm shrink-0">{t.emoji}</span>
                          <span className="text-[12px] font-bold text-gray-900 leading-none truncate max-w-full">{t.en}</span>
                        </button>
                      );
                    })}
                    {EXERCISE_TYPES.filter((t) => t.name.includes(exerciseSearch) || t.en.toLowerCase().includes(exerciseSearch.toLowerCase()) || t.focus.includes(exerciseSearch)).length === 0 && (
                      <div className="col-span-3 text-[12px] text-gray-400 text-center py-4">لا يوجد نوع تمرين مطابق</div>
                    )}
                  </div>
                </div>

                <div className="border-2 border-dashed border-emerald-400 rounded-[18px] bg-emerald-50/20 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[16px] font-bold text-gray-900">🔖 Saved Exercises</div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full shrink-0">{plannedExercises.length} تمرين</span>
                  </div>
                  <p className="mt-1 text-[10px] text-gray-500 leading-snug">اختر من الأعلى أو اضغط 🤖 تلقائي · المحفوظات تنتقل للـ Blueprint تلقائياً</p>
                  <div className="h-10 bg-white border border-emerald-200 rounded-lg flex items-center px-3 mt-2 focus-within:border-emerald-500">
                    <input value={selectedExerciseSearch} onChange={(e) => setSelectedExerciseSearch(e.target.value)} placeholder="ابحث في المحفوظة..." dir="rtl" className="flex-1 bg-transparent outline-none text-[16px] text-gray-600 placeholder:text-gray-400 min-w-0" />
                    <span className="text-emerald-700 text-[16px] shrink-0">🔍</span>
                  </div>
                  <div className="mt-3 min-h-[40px] flex flex-wrap gap-2">
                    {filteredPlanned.length ? (
                      filteredPlanned.map((ex) => (
                        <span key={ex.id} className="inline-flex items-center gap-1.5 bg-white border border-emerald-200 rounded-full h-8 px-3 text-[12px] font-medium text-gray-700 max-w-full">
                          <span className="shrink-0">{ex.emoji}</span>
                          <span className="truncate max-w-[130px]">{ex.name}</span>
                          <button type="button" onClick={() => removeExercise(ex.id)} className="text-zinc-400 hover:text-red-500 text-[11px] shrink-0">✕</button>
                        </span>
                      ))
                    ) : (
                      <span className="text-[11.5px] text-gray-400">لا تمارين محفوظة بعد — اضغط 🤖 الموقع يختار تلقائي</span>
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="text-[13px] font-bold text-gray-900 mb-2">Workout Routine</div>
                    <div className="grid grid-cols-2 gap-2">
                      {WORKOUTS.map((w) => {
                        const on = workout === w.id;
                        return (
                          <div
                            key={w.id}
                            onClick={() => setWorkout(w.id)}
                            className={`rounded-[12px] p-2.5 cursor-pointer min-w-0 transition-all active:scale-95 ${on ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-100 text-gray-700'}`}
                          >
                            <div className="text-[12px] font-bold leading-tight break-words">{w.name}</div>
                            <div className={`text-[10px] mt-0.5 leading-snug break-words ${on ? 'text-emerald-50' : 'text-gray-500'}`}>{w.dur} · {w.focus}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {numbers && (
                    <div className="mt-3 rounded-[12px] bg-emerald-100 p-3 text-[11px] leading-relaxed">
                      <div className="font-bold text-emerald-800">🔥 TDEE Preview</div>
                      <div className="mt-1 text-emerald-900">
                        Maintenance: <b>{numbers.tdeeBase} kcal/day</b> •{' '}
                        {goal === 'lose' ? 'Target for fat loss' : goal === 'gain_muscle' || goal === 'gain_weight' ? 'Target for muscle gain' : 'Maintenance target'}:{' '}
                        <b>{goal === 'lose' ? numbers.tdeeBase - 500 : goal === 'gain_muscle' || goal === 'gain_weight' ? numbers.tdeeBase + 300 : numbers.tdeeBase} kcal/day</b>
                      </div>
                      <div className="mt-0.5 text-emerald-900">Protein {numbers.protein}g · Carbs {numbers.carbs}g · Fats {numbers.fat}g</div>
                    </div>
                  )}

                  <button type="button" onClick={saveExercises} className="w-full h-11 rounded-[12px] bg-emerald-600 text-white text-[13px] font-bold mt-3 transition-all active:scale-[0.97]">حفظ للـ Blueprint 💾</button>
                </div>
              </>
              )}

              {planType === 'nutrition' && numbers && (
                <div className="rounded-[12px] bg-emerald-100 p-3 text-[11px] leading-relaxed">
                  <div className="font-bold text-emerald-800">🔥 TDEE Preview</div>
                  <div className="mt-1 text-emerald-900">
                    Maintenance: <b>{numbers.tdeeBase} kcal/day</b> •{' '}
                    {goal === 'lose' ? 'Target for fat loss' : goal === 'gain_muscle' || goal === 'gain_weight' ? 'Target for muscle gain' : 'Maintenance target'}:{' '}
                    <b>{goal === 'lose' ? numbers.tdeeBase - 500 : goal === 'gain_muscle' || goal === 'gain_weight' ? numbers.tdeeBase + 300 : numbers.tdeeBase} kcal/day</b>
                  </div>
                  <div className="mt-0.5 text-emerald-900">Protein {numbers.protein}g · Carbs {numbers.carbs}g · Fats {numbers.fat}g</div>
                </div>
              )}

              <div className="flex gap-3 mt-6 mb-4">
                <button type="button" onClick={() => setStep(1)} className="flex-1 h-14 rounded-[14px] bg-white border-2 border-gray-300 text-gray-700 text-[16px] font-bold flex items-center justify-center gap-2 transition-all active:bg-gray-100 active:scale-[0.98] min-w-0">
                  <span className="shrink-0">←</span> رجوع
                </button>
                <button type="button" onClick={next} className="flex-1 h-14 rounded-[14px] bg-emerald-600 text-white text-[16px] font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 min-w-0">
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="w-full bg-[#e8f5e9]/90 backdrop-blur rounded-[28px] p-5 shadow-2xl min-w-0">
              <div className="w-full bg-white rounded-full h-12 flex items-center justify-between px-3 shadow-sm min-w-0">
                <button type="button" onClick={() => setStep(2)} aria-label="Back" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-[18px] shrink-0 select-none active:scale-95">‹</button>
                <div className="text-[14px] font-bold text-emerald-900 whitespace-nowrap">Step 3 of 3</div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-3 h-3 rounded-full bg-emerald-600" />
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                </div>
              </div>

              <h2 className="mt-4 text-[22px] font-black leading-tight text-black">اختر مطبخك 🌍</h2>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {countryOptions.map((o) => {
                  const on = countryMode === o.m;
                  return (
                    <button
                      key={o.m}
                      type="button"
                      onClick={() => chooseCountry(o.m)}
                      className={`relative flex flex-col items-center justify-center gap-1.5 min-h-[88px] rounded-[16px] border-2 shadow-sm transition-all min-w-0 active:scale-95 ${on ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-200 text-gray-700'}`}
                    >
                      <span className="text-[24px] leading-none shrink-0">{o.flag}</span>
                      <span className="text-[14px] font-bold leading-none">{o.label}</span>
                      <span className={`text-[11px] font-semibold leading-none ${on ? 'text-white/80' : 'text-gray-500'}`}>{o.count} طبق</span>
                      {on && <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white text-emerald-700 flex items-center justify-center text-[11px] font-bold">✓</span>}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4">
                <div className="h-10 bg-emerald-100 rounded-full px-4 flex items-center justify-center gap-2 shadow-sm w-fit min-w-0">
                  <span className="text-[16px] leading-none">🔥</span>
                  <span className="text-[14px] font-bold text-emerald-700 whitespace-nowrap">{totalCal} سعرة اليوم</span>
                </div>
              </div>

              <div className="mt-4 flex gap-1.5 overflow-x-auto no-scrollbar">
                {MEAL_TABS.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setMealTab(t.key)}
                    className={`h-11 min-w-[96px] shrink-0 rounded-full border-2 px-3 text-[14px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 ${mealTab === t.key ? t.active : 'bg-white text-gray-700 border-gray-200'}`}
                  >
                    {t.emoji} {t.label} <span className="text-[11px] opacity-80">({tabCounts[t.key]})</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <div className="h-12 bg-white border-2 border-gray-200 rounded-[14px] flex items-center px-4 focus-within:border-emerald-500 transition-colors min-w-0">
                  <input
                    value={dishSearch}
                    onChange={(e) => setDishSearch(e.target.value)}
                    placeholder={searchPlaceholder}
                    dir="rtl"
                    className="flex-1 bg-transparent outline-none text-[16px] text-gray-700 placeholder:text-gray-400 min-w-0"
                  />
                  <span className="text-[20px] text-emerald-700 shrink-0">🔍</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHealthyOnly((p) => !p)}
                    className={`h-10 rounded-full px-4 text-[13px] font-semibold border-2 transition-all flex items-center gap-1.5 ${healthyOnly ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200'}`}
                  >
                    ✅ صحي فقط
                  </button>
                  <div className="flex gap-1.5 shrink-0 ml-auto">
                    <button type="button" onClick={() => setCategoryMode('manual')} className={`px-3 h-9 rounded-full text-[11px] font-semibold border transition-all ${categoryMode === 'manual' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200'}`}>✋ يدوي</button>
                    <button type="button" onClick={autoPickDishes} className={`px-3 h-9 rounded-full text-[11px] font-semibold border transition-all ${categoryMode === 'auto' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200'}`}>🤖 تلقائي</button>
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-2 max-h-[360px] overflow-y-auto">
                {displayedRows.length ? (
                  displayedRows.map((r) => {
                    const checked = selectedDishKeys.includes(r.key);
                    const dot = r.dish.confidence_color;
                    return (
                      <div key={r.key} className={`flex items-center gap-3 min-h-[88px] p-2.5 bg-white rounded-[14px] border shadow-sm transition-all min-w-0 ${checked ? 'border-emerald-400 bg-emerald-50/30' : 'border-gray-200'}`}>
                        <span className="w-16 h-16 rounded-[14px] bg-emerald-50 flex items-center justify-center text-[28px] shrink-0">🍲</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="font-bold text-[14px] text-black truncate">{r.dish.name}</span>
                            <span className={`w-2 h-2 rounded-full shrink-0 ${dot === 'green' ? 'bg-green-500' : dot === 'yellow' ? 'bg-yellow-500' : 'bg-orange-500'}`} />
                          </div>
                          <div className="text-[11px] text-gray-500 truncate mt-0.5">{r.cat.name_ar}{r.dish.healthy ? ' · صحي ✅' : ''}</div>
                          <div className="text-[12px] text-gray-500 mt-0.5">P {r.dish.p}g · C {r.dish.c}g · F {r.dish.f}g</div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span className="text-[14px] font-bold text-emerald-700 whitespace-nowrap">{r.dish.cal_serv} سعر</span>
                          <button type="button" onClick={() => addDish(r.key)} className={`w-9 h-9 rounded-full flex items-center justify-center text-[18px] text-white shadow-sm transition-all active:scale-95 ${checked ? 'bg-gray-400' : 'bg-emerald-600'}`}>
                            {checked ? '✓' : '+'}
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-[13px] text-gray-400 py-6">لا توجد أطباق مطابقة</div>
                )}
              </div>

              <div className="mt-4 border-2 border-dashed border-emerald-400 rounded-[18px] bg-emerald-50/20 p-4 min-w-0">
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <div className="text-[15px] font-bold text-gray-900 min-w-0 truncate">🍱 الوجبات المحفوظة للـ Blueprint</div>
                  {!selectedDishKeys.length && <span className="text-[10px] text-gray-400 shrink-0">لا يوجد محفوظات بعد</span>}
                </div>
                <div className="h-10 bg-white border border-emerald-200 rounded-[10px] flex items-center px-3 mt-2 focus-within:border-emerald-500 transition-colors min-w-0">
                  <input value={savedSearch} onChange={(e) => setSavedSearch(e.target.value)} placeholder="ابحث في المحفوظة..." dir="rtl" className="flex-1 bg-transparent outline-none text-[16px] text-gray-600 placeholder:text-gray-400 min-w-0" />
                  <span className="text-emerald-700 text-[16px] shrink-0">🔍</span>
                </div>
                <div className="mt-3 space-y-3">
                  {MEAL_TABS.map((t) => {
                    const list = mealSummary[t.key].filter((x) => !savedSearch.trim() || x.dish.name.includes(savedSearch.trim()));
                    if (!list.length) return null;
                    return (
                      <div key={t.key} className="min-w-0">
                        <div className="text-[12px] font-bold text-gray-700 mb-1">{t.emoji} {t.label} محفوظ ({list.length})</div>
                        <div className="flex flex-wrap gap-1.5">
                          {list.map((x) => (
                            <span key={x.key} className="inline-flex items-center gap-1.5 bg-white border border-emerald-200 rounded-full h-8 px-3 text-[12px] font-medium text-gray-700 max-w-full">
                              <span className="truncate max-w-[140px]">{x.dish.name} {x.dish.cal_serv}</span>
                              <button type="button" onClick={() => removeChip(x.key, t.key)} className="text-gray-400 hover:text-red-500 text-[11px] shrink-0">✕</button>
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {!selectedDishKeys.length && <div className="text-[11px] text-gray-400">اضغط + بجانب أي طبق لإضافته هنا وحفظه في الـ Blueprint</div>}
                </div>
                <div className="mt-3 rounded-[12px] border border-emerald-200 bg-white p-2.5">
                  <div className="text-[12px] text-emerald-900 font-semibold">✅ المجموع: <b>{totalCal}</b> سعر · <b>{selectedDishKeys.length}</b> طبق · {countryMode === 'both' ? 'مصر + تونس' : countryMode === 'egyptian' ? 'مصر 🇪🇬' : 'تونس 🇹🇳'}</div>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button type="button" onClick={() => setStep(2)} className="flex-1 h-14 rounded-[14px] bg-white border-2 border-gray-300 text-gray-700 text-[16px] font-bold flex items-center justify-center gap-2 transition-all active:bg-gray-100 active:scale-[0.98] min-w-0">
                  <span className="shrink-0">←</span> Back
                </button>
                <button type="button" onClick={() => setStep(4)} className="flex-1 h-14 rounded-[14px] bg-emerald-600 text-white text-[16px] font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 min-w-0">
                  Next →
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-zinc-700">Goal type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['lose', 'gain_muscle', 'gain_weight', 'wellness', 'athletic'] as GoalKey[]).map((x) => (
                    <button
                      key={x}
                      type="button"
                      onClick={() => changeGoal(x)}
                      className={`h-[44px] rounded-[8px] border text-[12px] font-semibold ${goal === x ? 'bg-[#1e40af] text-white border-[#1e40af]' : 'bg-white border-zinc-300 text-zinc-700 hover:border-zinc-400'}`}
                    >
                      {GOAL_ICONS[x]} {GOAL_BTN[x]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5 min-w-0">
                  <label className="text-[13px] font-medium text-zinc-700">Target weight (kg)</label>
                  <input value={targetWeight} onChange={(e) => setTargetWeight(e.target.value.replace(/[^0-9.]/g, ''))} inputMode="decimal" className={inputClass} />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <label className="text-[13px] font-medium text-zinc-700">Timeline (weeks)</label>
                  <input value={timeline} onChange={(e) => setTimeline(e.target.value.replace(/\D/g, ''))} inputMode="numeric" className={inputClass} />
                </div>
              </div>

              <div className="space-y-3">
                  <label className="text-[13px] font-bold">{GOAL_ICONS[goal]} {GOAL_INTENSITY_LABEL[goal]}</label>
                  {goal === 'wellness' && (
                    <div className="rounded-[8px] bg-violet-50 border border-violet-100 px-3 py-2 text-[11px] text-zinc-600 leading-snug break-words">
                      ✨ Recomposition &amp; Wellness = الحفاظ + تحسين الصحة العامة
                    </div>
                  )}
                  <div className="diet-intensity-scroll-box h-[96px] overflow-y-auto border-2 border-zinc-200 rounded-[12px] p-1.5 bg-white grid grid-cols-3 gap-1.5">
                    {DIETS[goal].map((d) => {
                      const on = dietId === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDietId(d.id)}
                          className={`rounded-[8px] border-2 p-2 text-left transition-all min-w-0 ${on ? 'border-orange-500 bg-orange-50' : 'border-zinc-200'}`}
                        >
                          <div className="text-[10.5px] font-bold leading-tight break-words">{d.emoji} {d.short}</div>
                          <div className="mt-0.5 text-[10px] text-zinc-500 leading-snug break-words">{d.rate}</div>
                          <div className="mt-0.5 text-[10.5px] font-semibold text-red-600">{signedDelta(goal, d)} سعر</div>
                        </button>
                      );
                    })}
                  </div>
                  {diet.warning && <div className="text-[11px] text-red-600">⚠️ {diet.warning}</div>}
                </div>

              {numbers && (
                <div className="rounded-[12px] border border-zinc-200 bg-zinc-50/70 p-4 space-y-2">
                  <div className="text-[12px] font-semibold text-zinc-700">Projection</div>
                  <div className="text-[13px] text-zinc-600 leading-relaxed break-words">{projectionText}</div>
                  <div className="text-[12px] text-zinc-500">Target calories: ~{numbers.targetCal} kcal / day ({numbers.wk.name})</div>
                </div>
              )}
            </div>
          )}

{step === 5 && numbers && (
            <div className="w-full max-w-[480px] mx-auto flex flex-col">
              <div className="bg-gradient-to-r from-[#0e9f6e] to-[#0a8a5e] px-4 pt-3 pb-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-[13px] tracking-wider border border-white/20 shrink-0">HC</div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-[18px] font-bold leading-[18px] truncate">Your Personalized Health Blueprint</div>
                  <div className="text-white/80 text-[12px] leading-[14px] mt-0.5 truncate">HealthCalc.ai — Science-Based Nutrition Planning</div>
                </div>
                <button type="button" onClick={() => notify('Close preview')} className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-white/90 hover:bg-white/25 shrink-0">
                  <span className="text-[18px] leading-none">×</span>
                </button>
              </div>

              <div className="bg-white px-3 py-2 flex items-center justify-between border-b border-gray-100">
                <button type="button" onClick={() => setStep(4)} className="rounded-full bg-white border border-gray-200 text-[12px] font-semibold text-gray-700 px-3 py-1.5 flex items-center gap-1 hover:bg-gray-50 min-w-0">
                  <span className="shrink-0">←</span> Back to Edit
                </button>
                <div className="text-[10px] text-gray-400 text-right pl-2 min-w-0 truncate">{numbers.targetCal} kcal • {selectedKitchen.kitchen}</div>
              </div>

              <div className="bg-white px-4 pt-3 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[18px] font-bold text-gray-900 shrink-0">Day {selectedDay}</span>
                    <span className="text-[12px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">Protein Focus</span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium shrink-0">Day {selectedDay} of 8</div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button type="button" onClick={() => setSelectedDay((s) => Math.max(1, s - 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">‹</button>
                  <div className="flex-1 flex gap-2 overflow-x-auto justify-between min-w-0">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((d) => {
                      const ad = d === selectedDay;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setSelectedDay(d)}
                          className={`relative w-9 h-9 min-w-[36px] rounded-xl flex items-center justify-center text-[13px] font-bold transition-all ${ad ? 'bg-white border border-gray-900 text-gray-900 shadow-sm' : 'bg-gray-100 text-gray-600'}`}
                        >
                          {d}
                          {ad && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-gray-900 rounded-full" />}
                        </button>
                      );
                    })}
                  </div>
                  <button type="button" onClick={() => setSelectedDay((s) => Math.min(8, s + 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">›</button>
                </div>
              </div>

              <div className="bg-[#f0fdf9] border-y border-[#e6f4ef] px-4 py-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-[12px] shrink-0">🍽️</div>
                <span className="text-[13px] font-medium text-gray-700 shrink-0">Cuisine:</span>
                <span className="bg-blue-50 text-[#1e40af] px-3 py-1 rounded-lg text-[13px] font-semibold flex items-center gap-1.5 border border-blue-100 min-w-0">
                  <span className="shrink-0">{selectedKitchen.flag}</span>
                  <span className="truncate">{selectedKitchen.country}</span>
                </span>
                <button type="button" onClick={() => setStep(3)} className="ml-auto text-[11px] text-gray-500 underline decoration-dotted hover:text-gray-700 shrink-0">(Change from main page)</button>
              </div>

              <div className="bg-[#f6fef9] px-4 py-4 space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#dcfce7] flex items-center justify-center text-[12px] shrink-0">🔥</div>
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Daily Caloric Target</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-[24px] font-extrabold text-gray-900 leading-none">{numbers.targetCal}</span>
                      <span className="text-[14px] font-bold text-gray-700">kcal</span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1">TDEE {numbers.tdeeWorkout} + {numbers.delta}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[11px] text-gray-500">Goal • {GOAL_LABELS[goal]}</div>
                    <div className="mt-1 inline-flex text-[10px] bg-white border px-2 py-1 rounded-full">{ACTIVITY[activity].label} • {numbers.wk.name}</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[12px] shrink-0">💧</div>
                      <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Water Goal</span>
                    </div>
                    <span className="text-[16px] font-extrabold text-gray-900 shrink-0">{water.toFixed(1)} / {waterGoal.toFixed(1)} L</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 shrink-0">
                      <button type="button" onClick={() => setWater((s) => Math.max(0, +(s - 0.25).toFixed(2)))} className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 text-[14px] font-bold">−</button>
                      <button type="button" onClick={() => setWater((s) => Math.min(waterGoal, +(s + 0.25).toFixed(2)))} className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 text-[14px] font-bold">+</button>
                      <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">+250ml</span>
                    </div>
                    <div className="flex-1 mx-3 h-2 rounded-full bg-blue-100 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${Math.min(100, (water / waterGoal) * 100)}%` }} />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Meals Done</span>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#fef3c7] text-amber-700 flex items-center justify-center text-[14px] font-extrabold border border-amber-200">{doneCount}/3</span>
                    </div>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-amber-100 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${(doneCount / 3) * 100}%` }} />
                  </div>
                </div>
              </div>

              <div className="bg-white px-3 py-3 flex flex-wrap gap-2 border-y border-gray-100">
                <button type="button" onClick={() => window.print()} className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-2 text-[13px] font-semibold flex items-center gap-1.5">
                  <span>⬇️</span> Download PDF
                </button>
                <button type="button" onClick={() => setEmailOpen(true)} className="rounded-full bg-green-50 text-green-700 border border-green-100 px-4 py-2 text-[13px] font-semibold flex items-center gap-1.5">
                  <span>✉️</span> Email Plan
                </button>
                <button type="button" onClick={() => notify('Progress tracker preview')} className="rounded-full bg-gray-100 text-gray-700 px-4 py-2 text-[13px] font-semibold flex items-center gap-1.5">
                  <span>📊</span> Progress Tracker
                </button>
                {planType !== 'nutrition' && (
                  <button type="button" onClick={() => setStep(2)} className="rounded-full bg-violet-50 text-violet-700 border border-violet-100 px-4 py-2 text-[13px] font-semibold flex items-center gap-1.5">
                    <span>🏋️</span> Exercise Change
                  </button>
                )}
              </div>

              <div className="bg-[#f6fef9] px-3 py-3 space-y-3 pb-6">
                {[
                  { name: 'Breakfast', time: '8:00 AM', icon: '🍳' },
                  { name: 'Lunch', time: '1:30 PM', icon: '🥗' },
                  { name: 'Dinner', time: '7:30 PM', icon: '🍽️' },
                ].map((m, idx) => {
                  const plan = mealPlan[idx];
                  const calServ = plan && plan.dish ? Math.round((plan.dish.cal_100 * plan.grams) / 100) : 420;
                  const done = mealsDone[idx];
                  return (
                    <div key={m.name} className={`bg-white rounded-2xl border p-3 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-colors ${done ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-100'}`}>
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[16px] shrink-0">{m.icon}</div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[12px] md:text-[13px] font-bold text-gray-900">{m.name}</span>
                            <span className="text-[11px] text-gray-500">{m.time}</span>
                            <span className="text-[11px] font-semibold bg-gray-100 px-2 py-0.5 rounded-full">{calServ} kcal</span>
                          </div>
                          <div className="text-[12px] text-gray-600 truncate break-words min-w-0 mt-0.5">{plan && plan.dish ? plan.dish.name : ''}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <button type="button" onClick={() => notify(`${m.name} details`)} className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 text-[13px]">🔍</button>
                        <button
                          type="button"
                          onClick={() => setMealsDone((prev) => prev.map((v, i) => (i === idx ? !v : v)))}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${done ? 'bg-[#0e9f6e] border-[#0e9f6e] text-white' : 'border-gray-300 bg-white'}`}
                        >
                          {done ? '✓' : ''}
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="text-[11px] text-gray-400 text-center pt-2">Day {selectedDay} • {selectedKitchen.flag} {selectedKitchen.kitchen} • {numbers.targetCal} kcal • {totalDishesAll} dishes pool</div>
              </div>

              {planType !== 'nutrition' && (
                <div className="bg-white px-4 py-4 space-y-3 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-[12px] shrink-0">🏋️</div>
                      <span className="text-[11px] font-bold text-violet-800 uppercase tracking-wider">Fitness Plan</span>
                    </div>
                    <span className="text-[11px] font-semibold bg-violet-50 text-violet-700 px-2 py-1 rounded-full shrink-0">{plannedExercises.length} تمارين</span>
                  </div>
                  {plannedExercises.length ? (
                    <div className="space-y-1.5">
                      {plannedExercises.map((ex) => (
                        <div key={ex.id} className="flex items-center gap-2 rounded-[10px] border border-zinc-100 bg-zinc-50/60 px-2.5 py-2 min-w-0">
                          <span className="text-[14px] leading-none shrink-0">{ex.emoji}</span>
                          <span className="truncate text-[11.5px] font-semibold flex-1 min-w-0">{ex.name}</span>
                          <span className="shrink-0 text-[10px] font-semibold bg-white border border-zinc-200 px-2 py-0.5 rounded-full">{ex.sets !== '1' ? `${ex.sets} × ${ex.reps}` : ex.reps} • {ex.dur}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[11px] text-zinc-400">لم تحدد تمارين بعد — أضفها من خطوة Body.</div>
                  )}
                  <button type="button" onClick={() => setStep(2)} className="text-[11px] text-violet-600 underline decoration-dotted hover:text-violet-800">(تعديل التمارين)</button>
                </div>
              )}

              {planType !== 'fitness' && (
                <div className="bg-white px-4 py-4 space-y-3 border-t border-gray-100 pb-28">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-[12px] shrink-0">🍽️</div>
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Nutrition Plan</span>
                    </div>
                    <span className="shrink-0 text-[11px] font-semibold bg-amber-50 text-amber-700 px-2 py-1 rounded-full">{selectedKitchen.flag} {selectedKitchen.country} · {selectedDishKeys.length} طبق</span>
                  </div>
                  <div className="space-y-1.5">
                    {selectedDishKeys.length ? (
                      MEAL_TABS.map((t) => (
                        <div key={t.key} className="text-[11px] leading-relaxed break-words">
                          <span className="font-bold">{t.emoji} {t.label}:</span> {fmtMeal(mealSummary[t.key])}
                        </div>
                      ))
                    ) : (
                      <span className="text-[11px] text-zinc-400">اختر الأطباق من خطوة Kitchen.</span>
                    )}
                  </div>
                  {selectedDishKeys.length > 0 && (
                    <div className="text-[12px] font-semibold text-emerald-700 pt-1 border-t border-gray-100">✅ المجموع: {totalCal} سعر · {selectedDishKeys.length} طبق</div>
                  )}
                  <button type="button" onClick={() => setStep(3)} className="text-[11px] text-amber-700 underline decoration-dotted hover:text-amber-900">(تغيير المطبخ)</button>
                </div>
              )}

              <div className="no-print fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white border-t border-gray-200 px-3 py-3 flex items-center justify-between gap-2 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] rounded-t-2xl z-40">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[12px] font-semibold text-gray-700 truncate">{doneCount}/3 meals completed</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button type="button" onClick={() => notify('Closed')} className="text-[13px] font-semibold text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-50">Close</button>
                  <button type="button" onClick={() => setStep(4)} className="text-[12px] font-semibold text-gray-700 bg-white border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50 flex items-center gap-1">
                    <span>←</span> Edit Previous Step
                  </button>
                  <button type="button" onClick={() => notify('Progress saved!')} className="bg-[#0e9f6e] text-white font-bold text-[13px] px-4 py-2.5 rounded-2xl flex items-center gap-1.5 shadow-[0_4px_14px_-2px_#0e9f6e]">
                    <span>✓</span> Save Progress
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 5 && !numbers && (
            <div className="rounded-[12px] border border-zinc-200 p-4 text-[12.5px] text-zinc-500">Complete the previous steps to review your blueprint.</div>
          )}        </div>

        <div className="mt-8">
          {step !== 5 && step !== 1 && step !== 2 && step !== 3 && (
            <div className="hidden md:flex gap-3">
              <button
                type="button"
                onClick={back}
                disabled={false}
                className="h-[48px] px-6 rounded-[8px] border text-[14px] font-medium transition-all bg-zinc-50 hover:bg-zinc-100 border-zinc-300 text-zinc-700"
              >
                Back
              </button>
              <button
                type="button"
                onClick={next}
                disabled={!isValid()}
                className={`flex-1 h-[48px] rounded-[8px] text-[14px] font-semibold transition-all flex items-center justify-center gap-2 ${!isValid() ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed' : 'bg-[#1e40af] text-white hover:bg-[#1c3aa0] shadow-[0_1px_2px_rgba(0,0,0,0.08)]'}`}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </main>

      {step !== 5 && step !== 1 && step !== 2 && step !== 3 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-4 py-3 flex gap-3 z-40">
          <button
            type="button"
            onClick={back}
            disabled={false}
            className="h-[48px] px-5 rounded-[8px] border text-[14px] font-medium shrink-0 bg-zinc-50 border-zinc-300 text-zinc-700"
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!isValid()}
            className={`flex-1 h-[48px] rounded-[8px] text-[15px] font-semibold flex items-center justify-center gap-2 ${!isValid() ? 'bg-zinc-300 text-zinc-500' : 'bg-[#1e40af] text-white'}`}
          >
            Next →
          </button>
        </div>
      )}

      {toast && (
        <div className="no-print fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-full bg-zinc-900 text-white text-[12.5px] font-medium px-4 py-2 shadow-lg whitespace-nowrap">
          {toast}
        </div>
      )}

      {emailOpen && (
        <div className="no-print fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-end md:items-center justify-center">
          <div className="w-full max-w-[560px] bg-white rounded-t-[16px] md:rounded-[16px] p-5 shadow-xl relative">
            <button
              type="button"
              onClick={() => {
                setEmailOpen(false);
                setEmailDone('');
                setEmailSending(false);
              }}
              className="absolute top-4 right-4 w-7 h-7 rounded-full text-zinc-400 hover:text-zinc-700 text-[16px]"
            >
              ✕
            </button>
            {emailDone ? (
              <div className="pt-2">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">✓</div>
                <h3 className="mt-3 text-[17px] font-bold">Sent</h3>
                <p className="mt-1 text-[13.5px] text-zinc-600 break-words">PDF sent to {emailDone}</p>
                <button
                  type="button"
                  onClick={() => {
                    setEmailOpen(false);
                    setEmailDone('');
                    setEmailSending(false);
                  }}
                  className="mt-5 w-full h-[48px] rounded-[8px] bg-[#1e40af] text-white text-[14px] font-semibold"
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
                  className="mt-1.5 w-full h-[48px] rounded-[8px] border border-zinc-300 px-4 outline-none focus:border-[#1e40af] focus:ring-[3px] focus:ring-blue-100 bg-white"
                />
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEmailOpen(false)}
                    className="h-[48px] px-5 rounded-[8px] border border-zinc-300 bg-zinc-50 text-zinc-700 text-[14px] font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={sendEmail}
                    disabled={emailSending || !emailText.trim()}
                    className={`flex-1 h-[48px] rounded-[8px] text-[14px] font-semibold ${emailSending || !emailText.trim() ? 'bg-zinc-300 text-zinc-500' : 'bg-[#1e40af] text-white'}`}
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