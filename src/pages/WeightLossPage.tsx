import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import { kitchensRegistry, totalDishesAll } from '../data/kitchens';
import type { KitchenInfo, KitchenDish, KitchenCategory } from '../data/kitchens';
import { getWizardExercisesByType } from '../data/exercises';
import type { ExerciseItem } from '../data/exercises';
import { ExerciseTypeSelector } from '../components/wizard/ExerciseTypeSelector';
import { ExerciseList } from '../components/wizard/ExerciseList';
import AddDishModal from '../components/wizard/AddDishModal';
import { useAuth } from '../context/AuthContext';
import { savePlan, saveProfile } from '../services/supabaseData';
import { useKitchenDishes } from '../hooks/useKitchenDishes';
import { useKitchenDishCounts } from '../hooks/useKitchenDishCounts';
import { generateWeeklyPlan } from '../utils/mealPlanGenerator';
import type { PlanDay, PlanDish, PlanMealType } from '../utils/mealPlanGenerator';

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

const readWizardInput = (): { age?: string; height?: string; weight?: string; sex?: Sex; activityLevel?: ActivityKey } => {
  try {
    const raw = localStorage.getItem('fitness-inputs') || localStorage.getItem('fitness-wizard-input');
    if (!raw) return {};
    const d = JSON.parse(raw);
    const out: { age?: string; height?: string; weight?: string; sex?: Sex; activityLevel?: ActivityKey } = {};
    if (d && d.age !== undefined && d.age !== null && d.age !== '') out.age = String(d.age);
    const heightRaw = d && (d.height !== undefined ? d.height : d.heightCm);
    const weightRaw = d && (d.weight !== undefined ? d.weight : d.weightKg);
    if (d && heightRaw !== undefined && heightRaw !== null && heightRaw !== '') out.height = String(heightRaw);
    if (d && weightRaw !== undefined && weightRaw !== null && weightRaw !== '') out.weight = String(weightRaw);
    if (d && (d.gender === 'male' || d.gender === 'female')) out.sex = d.gender as Sex;
    if (d && ACTIVITY[d.activityLevel as ActivityKey]) out.activityLevel = d.activityLevel as ActivityKey;
    return out;
  } catch {
    return {};
  }
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
    { id: 'normal_lose', label: 'رجيم عادي - نزول صحي', short: 'عادي', emoji: '🟢', deficit: 300, surplus: 0, rate: '0.25 كجم/أسبوع', desc: 'نزول بطيء صحي', workoutMod: 1.0, proteinFactor: 1.2, level: 'normal', healthyOnly: false },
    { id: 'medium_lose', label: 'متوسط - نزول متوسط', short: 'متوسط', emoji: '🟡', deficit: 500, surplus: 0, rate: '0.5 كجم/أسبوع', desc: 'الأكثر شيوعاً', workoutMod: 1.1, proteinFactor: 1.6, level: 'medium', healthyOnly: false },
    { id: 'harsh_lose', label: 'قاسي - نزول سريع', short: 'قاسي', emoji: '🔴', deficit: 800, surplus: 0, rate: '0.8-1 كجم/أسبوع', desc: 'سريع لكن يحتاج متابعة', workoutMod: 1.3, proteinFactor: 2.0, level: 'harsh', healthyOnly: true, warning: 'استشر مختصاً' },
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

const FEATURED_KITCHEN_IDS = ['egyptian', 'tunisian', 'moroccan', 'diet-keto', 'diet-vegan', 'diet-high-protein', 'diet-mediterranean', 'diet-low-carb'];

interface RegionDef {
  id: string;
  emoji: string;
  en: string;
  ar: string;
  ids: string[];
}

const REGIONS: RegionDef[] = [
  { id: 'africa', emoji: '🌍', en: 'Africa', ar: 'أفريقيا', ids: ['egyptian', 'libyan', 'tunisian', 'algerian', 'moroccan', 'nigerian', 'ethiopian', 'kenyan', 'rwandan', 'south-african'] },
  { id: 'middle-east', emoji: '🕌', en: 'Middle East & Gulf', ar: 'الشرق الأوسط والخليج', ids: ['saudi', 'emirati', 'omani', 'kuwaiti', 'qatar', 'bahraini', 'lebanese', 'palestinian', 'syrian', 'jordanian'] },
  { id: 'asia', emoji: '🌏', en: 'Asia', ar: 'آسيا', ids: ['indian', 'pakistani', 'chinese', 'japanese', 'korean', 'thai', 'australian', 'new-zealand'] },
  { id: 'americas', emoji: '🌎', en: 'Americas', ar: 'الأمريكتان', ids: ['american', 'mexican', 'jamaican', 'cuban', 'costa-rican', 'brazilian', 'peruvian', 'colombian', 'chilean', 'venezuelan'] },
  { id: 'europe', emoji: '🏰', en: 'Europe', ar: 'أوروبا', ids: ['italian', 'french', 'spanish', 'greek', 'turkish', 'british', 'swiss'] },
  { id: 'special-diets', emoji: '🌿', en: 'Special Diets', ar: 'أنظمة غذائية خاصة', ids: ['diet-keto', 'diet-vegan', 'diet-vegetarian', 'diet-high-protein', 'diet-mediterranean', 'diet-low-carb', 'diet-dash', 'diet-gluten-free', 'diet-intermittent-fasting', 'diet-paleo'] },
];

const SAUDI_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇸🇦', en: 'All Saudi', ar: 'كل المطبخ السعودي' },
  { id: 'pan_saudi', emoji: '🥘', en: 'General Saudi', ar: 'عام (كل المناطق)' },
  { id: 'najdi', emoji: '🏜️', en: 'Najdi', ar: 'نجدي' },
  { id: 'hijazi', emoji: '🕋', en: 'Hijazi', ar: 'حجازي' },
  { id: 'janubi', emoji: '🏔️', en: 'Southern', ar: 'جنوبي' },
  { id: 'sharqi', emoji: '🏝️', en: 'Eastern', ar: 'شرقي' },
  { id: 'gulf_shared', emoji: '🌊', en: 'Gulf Shared', ar: 'خليجي مشترك' },
];

const EMIRATI_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇦🇪', en: 'All Emirati', ar: 'كل المطبخ الإماراتي' },
  { id: 'pan_emirati', emoji: '🥘', en: 'General Emirati', ar: 'عام (كل الإمارات)' },
  { id: 'gulf_shared', emoji: '🌊', en: 'Gulf Shared', ar: 'خليجي مشترك' },
  { id: 'ras_al_khaimah', emoji: '🏔️', en: 'Ras Al Khaimah', ar: 'رأس الخيمة' },
];

const KUWAITI_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇰🇼', en: 'All Kuwaiti', ar: 'كل المطبخ الكويتي' },
  { id: 'pan_kuwaiti', emoji: '🥘', en: 'General Kuwaiti', ar: 'عام (كل الكويت)' },
  { id: 'gulf_shared', emoji: '🌊', en: 'Gulf Shared', ar: 'خليجي مشترك' },
];

const QATARI_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇶🇦', en: 'All Qatari', ar: 'كل المطبخ القطري' },
  { id: 'pan_qatari', emoji: '🥘', en: 'General Qatari', ar: 'عام (كل قطر)' },
  { id: 'gulf_shared', emoji: '🌊', en: 'Gulf Shared', ar: 'خليجي مشترك' },
];

const BAHRAINI_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇧🇭', en: 'All Bahraini', ar: 'كل المطبخ البحريني' },
  { id: 'pan_bahraini', emoji: '🥘', en: 'General Bahraini', ar: 'عام (كل البحرين)' },
  { id: 'gulf_shared', emoji: '🌊', en: 'Gulf Shared', ar: 'خليجي مشترك' },
];

const OMANI_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇴🇲', en: 'All Omani', ar: 'كل المطبخ العماني' },
  { id: 'pan_omani', emoji: '🥘', en: 'General Omani', ar: 'عام (كل عمان)' },
  { id: 'gulf_shared', emoji: '🌊', en: 'Gulf Shared', ar: 'خليجي مشترك' },
];

const MOROCCAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇲🇦', en: 'All Moroccan', ar: 'كل المطبخ المغربي' },
  { id: 'pan_moroccan', emoji: '🥘', en: 'General Moroccan', ar: 'عام (كل المغرب)' },
  { id: 'maghreb_shared', emoji: '🌊', en: 'Maghreb Shared', ar: 'مغاربي مشترك' },
  { id: 'fes', emoji: '🏛️', en: 'Fes', ar: 'فاس' },
  { id: 'marrakech', emoji: '🫖', en: 'Marrakech', ar: 'مراكش' },
  { id: 'tangier', emoji: '⚓', en: 'Tangier', ar: 'طنجة' },
  { id: 'essouira', emoji: '🐟', en: 'Essaouira', ar: 'الصويرة' },
  { id: 'chefchaouen', emoji: '💙', en: 'Chefchaouen', ar: 'شفشاون' },
  { id: 'sahara', emoji: '🏜️', en: 'Sahara', ar: 'الصحراء' },
];

const EGYPTIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇪🇬', en: 'All Egyptian', ar: 'كل المطبخ المصري' },
  { id: 'pan_egyptian', emoji: '🥘', en: 'General Egyptian', ar: 'عام (كل مصر)' },
  { id: 'mena_shared', emoji: '🌍', en: 'MENA Shared', ar: 'شرق أوسطي مشترك' },
  { id: 'cairo', emoji: '🏙️', en: 'Cairo', ar: 'القاهرة' },
  { id: 'alexandria', emoji: '⚓', en: 'Alexandria', ar: 'الإسكندرية' },
  { id: 'delta', emoji: '🌾', en: 'Nile Delta', ar: 'الدلتا' },
  { id: 'upper_egypt', emoji: '⛵', en: 'Upper Egypt', ar: 'الصعيد' },
  { id: 'sinai', emoji: '⛰️', en: 'Sinai', ar: 'سيناء' },
  { id: 'nubia', emoji: '🛶', en: 'Nubia', ar: 'النوبة' },
];

const TUNISIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇹🇳', en: 'All Tunisian', ar: 'كل المطبخ التونسي' },
  { id: 'pan_tunisian', emoji: '🥘', en: 'General Tunisian', ar: 'عام (كل تونس)' },
  { id: 'maghreb_shared', emoji: '🌊', en: 'Maghreb Shared', ar: 'مغاربي مشترك' },
  { id: 'tunis', emoji: '🏛️', en: 'Tunis', ar: 'تونس العاصمة' },
  { id: 'sfax', emoji: '🐟', en: 'Sfax', ar: 'صفاقس' },
  { id: 'sousse', emoji: '🛥️', en: 'Sousse', ar: 'سوسة' },
  { id: 'nabeul', emoji: '🍊', en: 'Nabeul', ar: 'نابل' },
  { id: 'gabes', emoji: '🌴', en: 'Gabes', ar: 'قابس' },
  { id: 'medenine', emoji: '🏜️', en: 'Medenine', ar: 'مدنين' },
  { id: 'bizerte', emoji: '⚓', en: 'Bizerte', ar: 'بنزرت' },
];

const ALGERIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇩🇿', en: 'All Algerian', ar: 'كل المطبخ الجزائري' },
  { id: 'pan_algerian', emoji: '🥘', en: 'General Algerian', ar: 'عام (كل الجزائر)' },
  { id: 'maghreb_shared', emoji: '🌊', en: 'Maghreb Shared', ar: 'مغاربي مشترك' },
  { id: 'alger', emoji: '🏛️', en: 'Algiers', ar: 'الجزائر العاصمة' },
  { id: 'oran', emoji: '🛥️', en: 'Oran', ar: 'وهران' },
  { id: 'constantine', emoji: '🏰', en: 'Constantine', ar: 'قسنطينة' },
  { id: 'annaba', emoji: '⚓', en: 'Annaba', ar: 'عنابة' },
  { id: 'tlemcen', emoji: '🏺', en: 'Tlemcen', ar: 'تلمسان' },
  { id: 'bejaia', emoji: '⛰️', en: 'Bejaia', ar: 'بجاية' },
  { id: 'kabylie', emoji: '🌄', en: 'Kabylie', ar: 'القبائل' },
];

const LIBYAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇱🇾', en: 'All Libyan', ar: 'كل المطبخ الليبي' },
  { id: 'pan_libyan', emoji: '🍲', en: 'General Libyan', ar: 'عام (كل ليبيا)' },
  { id: 'maghreb_shared', emoji: '🌊', en: 'Maghreb Shared', ar: 'مغاربي مشترك' },
  { id: 'tripoli', emoji: '🏛️', en: 'Tripoli', ar: 'طرابلس' },
  { id: 'benghazi', emoji: '⛵', en: 'Benghazi', ar: 'بنغازي' },
  { id: 'misrata', emoji: '⚓', en: 'Misrata', ar: 'مصراتة' },
  { id: 'zwara', emoji: '🎣', en: 'Zwara', ar: 'زوارة' },
  { id: 'sabratha', emoji: '🏺', en: 'Sabratha', ar: 'صبراتة' },
  { id: 'ghadames', emoji: '🏜️', en: 'Ghadames', ar: 'غدامس' },
  { id: 'kufra', emoji: '🌴', en: 'Kufra', ar: 'الكفرة' },
];

const SYRIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇸🇾', en: 'All Syrian', ar: 'كل المطبخ السوري' },
  { id: 'pan_syrian', emoji: '🥘', en: 'General Syrian', ar: 'عام (كل سوريا)' },
  { id: 'levantine_shared', emoji: '🕊️', en: 'Levant Shared', ar: 'شامي مشترك' },
  { id: 'mena_shared', emoji: '🌍', en: 'MENA Shared', ar: 'شرق أوسطي مشترك' },
  { id: 'damascus', emoji: '🕌', en: 'Damascus', ar: 'دمشق' },
  { id: 'aleppo', emoji: '🏛️', en: 'Aleppo', ar: 'حلب' },
  { id: 'homs', emoji: '🏙️', en: 'Homs', ar: 'حمص' },
  { id: 'hama', emoji: '🌊', en: 'Hama', ar: 'حماة' },
  { id: 'lataqia', emoji: '⚓', en: 'Latakia', ar: 'اللاذقية' },
  { id: 'tartus', emoji: '🏖️', en: 'Tartus', ar: 'طرطوس' },
  { id: 'dayr_ez_zawr', emoji: '🏜️', en: 'Deir ez-Zor', ar: 'دير الزور' },
  { id: 'hasakah', emoji: '🌾', en: 'Hasakah', ar: 'الحسكة' },
  { id: 'swaida', emoji: '🗻', en: 'Sweida', ar: 'السويداء' },
  { id: 'daraa', emoji: '🌿', en: 'Daraa', ar: 'درعا' },
  { id: 'idlib', emoji: '🕊️', en: 'Idlib', ar: 'إدلب' },
  { id: 'raqqa', emoji: '🏺', en: 'Raqqa', ar: 'الرقة' },
];

const LEBANESE_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇱🇧', en: 'All Lebanese', ar: 'كل المطبخ اللبناني' },
  { id: 'pan_lebanese', emoji: '🥘', en: 'General Lebanese', ar: 'عام (كل لبنان)' },
  { id: 'levantine_shared', emoji: '🕊️', en: 'Levant Shared', ar: 'شامي مشترك' },
  { id: 'mena_shared', emoji: '🌍', en: 'MENA Shared', ar: 'شرق أوسطي مشترك' },
  { id: 'beirut', emoji: '🏙️', en: 'Beirut', ar: 'بيروت' },
  { id: 'tarablus', emoji: '🏛️', en: 'Tripoli (Lebanon)', ar: 'طرابلس الشام' },
  { id: 'sidon', emoji: '⚓', en: 'Sidon', ar: 'صيدا' },
  { id: 'jbeil', emoji: '🏺', en: 'Byblos (Jbeil)', ar: 'جبيل' },
  { id: 'baalbek', emoji: '🏛️', en: 'Baalbek', ar: 'بعلبك' },
  { id: 'zahle', emoji: '🍷', en: 'Zahle', ar: 'زحلة' },
  { id: 'jezzine', emoji: '🌲', en: 'Jezzine', ar: 'جزين' },
];

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
    return (
      cn.includes('ألبان') ||
      cn.includes('بيض') ||
      cn.includes('مخبوزات') ||
      cn.includes('مربات') ||
      cn.includes('مربى') ||
      cn.includes('مقبلات') ||
      (cn.includes('عصائر') && dish.cal_100 < 50)
    );
  },
  lunch: (cat) => {
    const cn = cat.name_ar;
    return (
      cn.includes('لحوم') ||
      cn.includes('طيور') ||
      cn.includes('دواجن') ||
      cn.includes('أسماك') ||
      cn.includes('خضروات') ||
      cn.includes('بقوليات') ||
      cn.includes('شوربة') ||
      cn.includes('صلصات')
    );
  },
  dinner: (cat, dish) => {
    const cn = cat.name_ar;
    return (
      cn.includes('شوربة') ||
      cn.includes('سلطات') ||
      cn.includes('خضروات') ||
      (cn.includes('بيض') && dish.cal_serv < 200) ||
      (cn.includes('ألبان') && dish.cal_serv < 150)
    );
  },
  snacks: (cat, dish) => {
    const cn = cat.name_ar;
    return (
      cn.includes('فواكه') ||
      cn.includes('عصائر') ||
      cn.includes('حلويات') ||
      cn.includes('مخللات') ||
      (cn.includes('مخبوزات') && dish.serv_g <= 60)
    );
  },
};

const TUNISIAN_MEAL: Record<MealKey, MealDefinition['filter']> = {
  breakfast: (cat, dish) => {
    const cn = cat.name_ar;
    const dn = dish.name;
    return (
      cn.includes('مخبوزات') ||
      cn.includes('المقبلات المقلية') ||
      (cn.includes('مشروبات') && (dn.includes('قهوة') || dn.includes('شاي') || dn.includes('ليموناضة') || (dn.includes('عصير') && dish.cal_serv <= 120)))
    );
  },
  lunch: (cat, dish) => {
    const cn = cat.name_ar;
    const dn = dish.name;
    return (
      cn.includes('شوربات') ||
      cn.includes('الرئيسية') ||
      cn.includes('يخنات') ||
      cn.includes('مرق') ||
      cn.includes('كسكسي') ||
      cn.includes('أسماك') ||
      cn.includes('لحوم') ||
      cn.includes('دواجن') ||
      cn.includes('مشويات') ||
      (cn.includes('المقبلات المقلية') && dn.includes('طاجين'))
    );
  },
  dinner: (cat, dish) => {
    const cn = cat.name_ar;
    return (cn.includes('شوربات') && dish.cal_serv < 120) || (cn.includes('سلطات') && dish.cal_serv < 120);
  },
  snacks: (cat, dish) => {
    const cn = cat.name_ar;
    const dn = dish.name;
    return (
      cn.includes('حلويات') ||
      (cn.includes('مشروبات') && (dn.includes('عصير') || dn.includes('شراب') || dn.includes('روزاطة'))) ||
      (cn.includes('مشروبات') && dn.includes('مخلل'))
    );
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
  if (Array.isArray(dish.mealTypes)) {
    const dataTypes: MealKey[] = [];
    for (const m of dish.mealTypes) {
      if ((MEAL_ORDER as readonly string[]).includes(m) && !dataTypes.includes(m as MealKey)) dataTypes.push(m as MealKey);
    }
    return dataTypes;
  }
  const dn = dish.name;
  if (/ترايفل|حلاوة|حلوى|بسبوسة|كنافة|قطايف|كيك|بسكويت|شوكولاتة/i.test(dn)) return ['snacks'];
  if (/حبوب|بذور|لقاح/i.test(dn)) return ['snacks'];
  if (/مكرون|معكرون|شعرية|مقرونة|نودلز|pasta|macaroni|noodle/i.test(dn)) return ['lunch', 'dinner'];
  if (/رز|أرز|rice/i.test(dn) && !/بلبن|حليب|pudding|بودنج/i.test(dn)) return ['lunch', 'dinner'];
  if (/كسكسي|couscous/i.test(dn)) return ['lunch', 'dinner'];
  if (/خبز|عيش|bread/i.test(dn)) return ['breakfast'];
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
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [planType, setPlanType] = useState<PlanType>('both');
  const [age, setAge] = useState<string>(() => readWizardInput().age ?? '26');
  const [sex, setSex] = useState<Sex>(() => readWizardInput().sex ?? 'male');
  const [height, setHeight] = useState<string>(() => readWizardInput().height ?? '175');
  const [weight, setWeight] = useState<string>(() => readWizardInput().weight ?? '70');
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
  const [step2Data, setStep2Data] = useState<{ activityLevel: ActivityKey; exerciseType: string | null; selectedExercises: string[] }>({
    activityLevel: readWizardInput().activityLevel ?? 'moderate',
    exerciseType: null,
    selectedExercises: [],
  });
  const [autoBuildMode, setAutoBuildMode] = useState(false);
  const [mealTab, setMealTab] = useState<MealKey>('breakfast');
  const [regionSel, setRegionSel] = useState<string | null>(null);
  const [cuisineSel, setCuisineSel] = useState<string | null>(null);
  const [kitchenRegion, setKitchenRegion] = useState<string>('all');
  const [dishSearch, setDishSearch] = useState('');
  const [savedSearch, setSavedSearch] = useState('');
  const [healthyOnly, setHealthyOnly] = useState(false);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [selectedDishKeys, setSelectedDishKeys] = useState<string[]>([]);
  const [assignedDishes, setAssignedDishes] = useState<Record<string, MealKey[]>>({});
  const [editField, setEditField] = useState<'age' | 'height' | 'weight' | null>(null);
  const [dietId, setDietId] = useState('normal_lose');
  const [weeklyPlan, setWeeklyPlan] = useState<PlanDay[]>(() => {
    try {
      const raw = localStorage.getItem(`hc_weekly_plan_${'egyptian'}`);
      if (raw) {
        const p = JSON.parse(raw) as PlanDay[];
        if (Array.isArray(p) && p.length === 7) return p;
      }
    } catch {
      /* ignore */
    }
    return [];
  });
  const [selectedPlanDay, setSelectedPlanDay] = useState(1);
  const [dishModal, setDishModal] = useState<{ mode: 'add' | 'swap'; dayIndex: number; mealIndex: number; mealType: PlanMealType; dishIndex: number } | null>(null);
  const [removingDish, setRemovingDish] = useState<string | null>(null);
  const [swapFlash, setSwapFlash] = useState<string | null>(null);
  const [water, setWater] = useState(0);
  const [mealsDone, setMealsDone] = useState([false, false, false, false]);
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailText, setEmailText] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailDone, setEmailDone] = useState('');
  const [autoBuilding, setAutoBuilding] = useState(false);
  const [expandedMealPlan, setExpandedMealPlan] = useState<MealKey | null>(null);
  const [collapsedSaved, setCollapsedSaved] = useState<Set<MealKey>>(new Set());
  const [showAllSaved, setShowAllSaved] = useState<Set<MealKey>>(new Set());
  const [toast, setToast] = useState('');
  const [toastUndo, setToastUndo] = useState<{ label: string; action: () => void } | null>(null);

  useEffect(() => {
    autoPickExercises(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  useEffect(() => {
    if (!weeklyPlan.length) return;
    try {
      localStorage.setItem(`hc_weekly_plan_${selectedKitchenId}`, JSON.stringify(weeklyPlan));
    } catch {
      /* ignore */
    }
  }, [weeklyPlan, selectedKitchenId]);

  const haptic = (ms = 12) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms);
    } catch {
      /* ignore */
    }
  };

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

  const { kitchens: supabaseKitchens } = useKitchenDishes();
  const kitchenCounts = useKitchenDishCounts();
  const kitchens = useMemo<KitchenInfo[]>(
    () => kitchensRegistry.map((k) => supabaseKitchens[k.id] ?? k),
    [supabaseKitchens],
  );

  const selectedKitchen = useMemo<KitchenInfo>(
    () => kitchens.find((k) => k.id === selectedKitchenId) ?? kitchens[0],
    [selectedKitchenId, kitchens],
  );

  const featuredKitchens = useMemo(() => {
    const found = FEATURED_KITCHEN_IDS.map((id) => kitchens.find((k) => k.id === id)).filter((k): k is KitchenInfo => !!k);
    for (const k of kitchens) {
      if (found.length >= FEATURED_KITCHEN_IDS.length) break;
      if (k.dishes.length && !found.some((f) => f.id === k.id)) found.push(k);
    }
    return found;
  }, [kitchens]);
  const selectedKitchenCats = useMemo<KitchenCategory[]>(() => getKitchenCategories(selectedKitchen), [selectedKitchen]);
  const dishPoolByMeal = useMemo(
    () => (mealType: MealKey) =>
      selectedKitchenCats.flatMap((cat) =>
        cat.dishes.filter((d) => getMealTypesForDish(selectedKitchen, cat, d).includes(mealType)),
      ),
    [selectedKitchenCats, selectedKitchen],
  );
  const countryKitchens = useMemo<KitchenInfo[]>(() => {
    const e = kitchens.find((k) => k.id === 'egyptian');
    return e && e.dishes.length ? [e] : [selectedKitchen];
  }, [selectedKitchen, kitchens]);
  const regionKitchens = useMemo<Record<string, KitchenInfo[]>>(() => {
    const out: Record<string, KitchenInfo[]> = {};
    for (const r of REGIONS) {
      out[r.id] = r.ids
        .map((id) => kitchens.find((k) => k.id === id))
        .filter((k): k is KitchenInfo => !!k && (k.dishes.length > 0 || (kitchenCounts[k.id] ?? 0) > 0));
    }
    return out;
  }, [kitchens, kitchenCounts]);
  const browseKitchens = useMemo<KitchenInfo[]>(() => {
    if (cuisineSel) {
      const k = kitchens.find((x) => x.id === cuisineSel);
      if (k && k.dishes.length) return [k];
    }
    return countryKitchens;
  }, [cuisineSel, countryKitchens, kitchens]);
  const planKitchens = useMemo<KitchenInfo[]>(() => {
    if (kitchenMode === 'auto' && !countryKitchens.some((k) => k.id === selectedKitchen.id)) return [selectedKitchen];
    return countryKitchens;
  }, [countryKitchens, selectedKitchen, kitchenMode]);
  const dishRows = useMemo(() => {
    const rows: { key: string; kitchen: KitchenInfo; cat: KitchenCategory; dish: KitchenDish; meals: MealKey[] }[] = [];
    for (const k of browseKitchens) {
      for (const cat of getKitchenCategories(k)) {
        for (const d of cat.dishes) {
          rows.push({ key: `${k.id}::${cat.id}::${d.name}`, kitchen: k, cat, dish: d, meals: getMealTypesForDish(k, cat, d) });
        }
      }
    }
    return rows;
  }, [browseKitchens]);
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
          { n: 3, label: t('wizard.steps.goals') },
          { n: 4, label: t('wizard.steps.kitchen') },
          { n: 5, label: t('wizard.steps.blueprint') },
        ]
      : [
          { n: 1, label: t('wizard.steps.info') },
          { n: 2, label: t('wizard.steps.body') },
          { n: 3, label: t('wizard.steps.goals') },
          { n: 4, label: t('wizard.steps.kitchen') },
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
    const tdeeBase = bmr * ACTIVITY[step2Data.activityLevel].factor;
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
  }, [parsed, sex, step2Data.activityLevel, goal, dietId, workout, exerciseTypes]);

  const diet = numbers ? numbers.diet : getDiet(goal, dietId);

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
    if (step === 2) {
      setStep(3);
      return;
    }
    const s = step >= 5 ? 1 : ((step + 1) as Step);
    setStep(s);
  };
  const back = () => {
    if (step === 4 && planType === 'fitness') {
      setStep(3);
      return;
    }
    const s = Math.max(1, step - 1) as Step;
    setStep(s);
  };

  const selectExerciseType = (typeId: string) => {
    setStep2Data((d) => ({ ...d, exerciseType: typeId }));
    setExerciseTypes((prev) => (prev.includes(typeId) ? prev : [...prev, typeId]));
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
    if (step2Data.activityLevel === 'sedentary' || step2Data.activityLevel === 'light') {
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

  const toPlannedShape = (ex: ExerciseItem): PlannedExercise => ({
    id: ex.id,
    type: ex.typeId,
    name: ex.name,
    sets: '3',
    reps: '12',
    dur: `${ex.minutes} min`,
    emoji: ex.emoji,
  });

  const toggleWizardExercise = (ex: ExerciseItem) => {
    const on = step2Data.selectedExercises.includes(ex.id);
    setStep2Data((d) => ({ ...d, selectedExercises: on ? d.selectedExercises.filter((id) => id !== ex.id) : [...d.selectedExercises, ex.id] }));
    setPlannedExercises((prev) => {
      const others = prev.filter((p) => p.id !== ex.id);
      return on ? others : [...others, toPlannedShape(ex)];
    });
    if (!on) notify(t('wizard.exerciseList.added'));
  };

  const runAutoBuild = () => {
    if (autoBuildMode) return;
    setAutoBuildMode(true);
    window.setTimeout(() => {
      const map: Record<GoalKey, string[]> = {
        lose: ['cardio', 'hiit', 'running'],
        gain_muscle: ['strength', 'crossfit', 'swimming'],
        gain_weight: ['strength', 'yoga', 'swimming'],
        wellness: ['yoga', 'pilates', 'tai_chi', 'dance'],
        athletic: ['strength', 'running', 'boxing', 'swimming'],
      };
      const all = map[goal];
      const typePicks =
        step2Data.activityLevel === 'sedentary' || step2Data.activityLevel === 'light'
          ? all.filter((p) => !['hiit', 'boxing', 'crossfit'].includes(p)).slice(0, 3)
          : all;
      const picked: ExerciseItem[] = [];
      for (const tid of typePicks) {
        picked.push(...getWizardExercisesByType(tid).filter((e) => e.difficulty !== 'hard').slice(0, 2));
      }
      const ids = picked.map((e) => e.id);
      setStep2Data((d) => ({ ...d, selectedExercises: ids, exerciseType: typePicks[0] }));
      setPlannedExercises(picked.map(toPlannedShape));
      setExerciseTypes(typePicks);
      setAutoBuildMode(false);
      notify(t('wizard.toast.autoExercises'));
    }, 2000);
  };

  const goEditExercises = () => {
    setStep(2);
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
    setKitchenRegion('all');
  };

  const runAutoKitchen = () => {
    if (autoBuilding) return;
    setAutoBuilding(true);
    window.setTimeout(() => {
      const plan = generateWeeklyPlan({
        age: parseInt(age, 10),
        height: parseInt(height, 10),
        weight: parseFloat(weight),
        gender: sex,
        targetCalories: numbers ? numbers.targetCal : 2000,
        goal,
        kitchens: [selectedKitchen],
        region: kitchenRegion === 'all' ? undefined : kitchenRegion,
        varietyAcrossDays: true,
        maxDishesPerMeal: 5,
      });
      setWeeklyPlan(plan);
      setSelectedPlanDay(1);
      setAutoBuilding(false);
      setStep(5);
      notify(`Generated 7-day plan: ${plan.length} days`);
    }, 1500);
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

  const notify = (m: string, undo?: { label: string; action: () => void }) => {
    setToast(m);
    setToastUndo(undo ?? null);
    window.setTimeout(() => {
      setToast('');
      setToastUndo(null);
    }, 3800);
  };

  const sendEmail = () => {
    if (!emailText.trim() || emailSending) return;
    setEmailSending(true);
    window.setTimeout(() => {
      setEmailSending(false);
      setEmailDone(emailText.trim());
      setToast(`PDF sent to ${emailText.trim()}`);
      setToastUndo(null);
      window.setTimeout(() => {
        setToast('');
        setToastUndo(null);
      }, 3200);
    }, 2200);
  };

  const handleSaveProgress = () => {
    notify(t('wizard.step5.savedToast'));
    if (!user) return;
    void (async () => {
      try {
        await saveProfile(user.id, {
          full_name: user.name ?? undefined,
          age: parsed.age || undefined,
          gender: sex,
          height_cm: parsed.height || undefined,
          weight_kg: parsed.weight || undefined,
        });
        await savePlan(user.id, {
          kind: 'weight-loss',
          profile: { age: parsed.age, height: parsed.height, weight: parsed.weight, gender: sex },
          goal,
          targetWeightKg: parsed.target,
          timelineWeeks: parsed.timeline,
          activityLevel: step2Data.activityLevel,
          workout: numbers ? numbers.wk.id : WORKOUTS.find((w) => w.id === workout)?.id,
          calories: numbers ? numbers.targetCal : 0,
          macros: numbers ? { protein: numbers.protein, carbs: numbers.carbs, fat: numbers.fat } : null,
          exerciseTypes,
          exercises: plannedExercises,
          dishes: selectedDishKeys,
          kitchen: selectedKitchenId,
          diet: dietId,
          mealLines: (weeklyPlan[selectedPlanDay - 1]?.meals ?? []).map((m) => ({
            meal: m.label,
            dish: m.dishes.map((d) => d.dish.name).join('، '),
            grams: Math.round(m.dishes.reduce((s, d) => s + d.grams, 0)),
          })),
          savedAt: Date.now(),
        });
      } catch {
        /* ignore */
      }
    })();
  };

  const recalcDay = (d: PlanDay): PlanDay => {
    const meals = d.meals.map((m) => ({ ...m, totalCal: m.dishes.reduce((s, x) => s + x.calories, 0) }));
    return { ...d, meals, totalCal: meals.reduce((s, m) => s + m.totalCal, 0) };
  };

  const dishKey = (dayIndex: number, mealIndex: number, dishIndex: number, dish: PlanDish) =>
    `d${dayIndex}-m${mealIndex}-x${dishIndex}-${dish.dish.name}`;

  const lastRemoved = useRef<{ dayIndex: number; mealIndex: number; dishIndex: number; dish: PlanDish } | null>(null);

  const handleRemoveDish = (dayIndex: number, mealIndex: number, dishIndex: number) => {
    const day = weeklyPlan[dayIndex];
    const meal = day?.meals[mealIndex];
    const removed = meal?.dishes[dishIndex];
    if (!removed) return;
    lastRemoved.current = { dayIndex, mealIndex, dishIndex, dish: removed };
    haptic(8);
    setRemovingDish(dishKey(dayIndex, mealIndex, dishIndex, removed));
    window.setTimeout(() => {
      setRemovingDish(null);
      setWeeklyPlan((prev) =>
        prev.map((d, di) => {
          if (di !== dayIndex) return d;
          const meals = d.meals.map((m, mi) =>
            mi === mealIndex ? { ...m, dishes: m.dishes.filter((_, i) => i !== dishIndex) } : m,
          );
          return recalcDay({ ...d, meals });
        }),
      );
      notify(language === 'ar' ? 'تم حذف الطبق' : 'Dish removed', {
        label: language === 'ar' ? 'تراجع' : 'Undo',
        action: () => {
          const lr = lastRemoved.current;
          if (!lr) return;
          lastRemoved.current = null;
          setWeeklyPlan((prev) =>
            prev.map((d, di) => {
              if (di !== lr.dayIndex) return d;
              const meals = d.meals.map((m, mi) => {
                if (mi !== lr.mealIndex) return m;
                const dishes = [...m.dishes];
                dishes.splice(Math.min(lr.dishIndex, dishes.length), 0, lr.dish);
                return { ...m, dishes };
              });
              return recalcDay({ ...d, meals });
            }),
          );
        },
      });
    }, 210);
  };

  const handleAddDish = (dayIndex: number, mealIndex: number, dish: KitchenDish) => {
    haptic(8);
    setWeeklyPlan((prev) =>
      prev.map((d, di) => {
        if (di !== dayIndex) return d;
        const meals = d.meals.map((m, mi) => {
          if (mi !== mealIndex) return m;
          const pd: PlanDish = {
            dish,
            mealTypes: [m.mealType],
            servings: 1,
            grams: dish.serv_g > 0 ? dish.serv_g : 100,
            calories: dish.cal_serv,
          };
          return { ...m, dishes: [...m.dishes, pd] };
        });
        return recalcDay({ ...d, meals });
      }),
    );
    notify(language === 'ar' ? 'تمت إضافة الطبق' : 'Dish added');
  };

  const handleSwapDish = (dayIndex: number, mealIndex: number, dishIndex: number, dish: KitchenDish) => {
    haptic(10);
    const flashKey = `d${dayIndex}-m${mealIndex}-s-${dish.name}`;
    setSwapFlash(flashKey);
    window.setTimeout(() => setSwapFlash((k) => (k === flashKey ? null : k)), 900);
    setWeeklyPlan((prev) =>
      prev.map((d, di) => {
        if (di !== dayIndex) return d;
        const meals = d.meals.map((m, mi) => {
          if (mi !== mealIndex) return m;
          const pd: PlanDish = {
            dish,
            mealTypes: [m.mealType],
            servings: 1,
            grams: dish.serv_g > 0 ? dish.serv_g : 100,
            calories: dish.cal_serv,
          };
          return { ...m, dishes: m.dishes.map((x, i) => (i === dishIndex ? pd : x)) };
        });
        return recalcDay({ ...d, meals });
      }),
    );
    notify(language === 'ar' ? 'تم تبديل الطبق' : 'Dish swapped');
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
      <SEO title={t('seo.weightLoss.title')} description={t('seo.weightLoss.description')} url="/weight-loss" />
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
                        className={`relative flex flex-col items-center justify-center pt-4 pb-3 rounded-[20px] border-2 transition-all min-w-0 ${on ? 'border-[#0F4C3A] bg-[#0F4C3A] shadow-[0_8px_18px_rgba(15,76,58,0.25)]' : 'border-[#EFEBE4] bg-white hover:border-[#D4AF37]'}`}
                      >
                        <span className={`flex items-center justify-center w-[72px] h-[72px] rounded-full transition-colors ${on ? 'bg-white/15 border border-white/25' : 'bg-[#F4F1EB]'}`}>
                          <BodyFigure kind={x} />
                        </span>
                        <span className={`mt-2 text-[14px] font-bold leading-none ${on ? 'text-white' : 'text-[#6B7A75]'}`}>{t(x)}</span>
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

        {step === 2 && planType === 'nutrition' && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-6`}>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-[18px] font-extrabold">{t('wizard.step2.activity')}</h2>
                  <p className="mt-1 text-[13px] text-[#6B7A75]">{t('wizard.step2.activitySub')}</p>
                </div>
                <span className="text-[30px] leading-none shrink-0">{ACTIVITY[step2Data.activityLevel].emoji}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {ACTIVITY_ORDER.map((x) => {
                  const opt = ACTIVITY[x];
                  const on = step2Data.activityLevel === x;
                  return (
                    <button
                      key={x}
                      type="button"
                      onClick={() => setStep2Data((d) => ({ ...d, activityLevel: x }))}
                      className={`px-[18px] py-2 rounded-full text-[13px] font-bold flex items-center gap-1.5 transition-all active:scale-95 ${on ? 'bg-[#0F4C3A] text-white shadow-[0_6px_14px_rgba(15,76,58,0.25)]' : 'bg-[#F4F1EB] text-[#6B7A75] hover:bg-[#ECE8DD]'}`}
                    >
                      <span className="shrink-0">{opt.emoji}</span>
                      {ACTIVITY_LABEL(x)}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-[12.5px] font-medium text-[#6B7A75]">💬 {ACTIVITY_DESC(step2Data.activityLevel)}</p>
            </div>

            {numbers && (
              <div className={`${cardBase} p-6`}>
                <p className="text-[13px] text-[#6B7A75] leading-relaxed">{t('wizard.step2.onlyNutrition')}</p>
                <div className="mt-4 rounded-[14px] bg-[#F4F1EB] p-3.5 text-[12px] text-[#6B7A75] leading-relaxed">
                  <div className="font-bold text-[#0F4C3A]">{t('wizard.step2.tdeePreview')}</div>
                  <div className="mt-1">
                    {t('wizard.step2.maintenance')}: <b className="num">{numbers.tdeeBase}</b> kcal/day
                  </div>
                  <div className="mt-0.5">{macrosT(numbers.protein, numbers.carbs, numbers.fat)}</div>
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

        {step === 2 && (planType === 'fitness' || planType === 'both') && (
          <div className="mt-6 flex flex-col gap-5">
            {/* SECTION 1: ACTIVITY LEVEL (Compact Row) */}
            <div className={`${cardBase} p-5`}>
              <h2 className="text-[18px] font-extrabold text-[#0F4C3A]">{t('wizard.step2.activity')}</h2>
              <p className="mt-1 text-[13px] text-[#6B7A75]">{t('wizard.step2.activitySub')}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ACTIVITY_ORDER.map((x) => {
                  const opt = ACTIVITY[x];
                  const on = step2Data.activityLevel === x;
                  return (
                    <button
                      key={x}
                      type="button"
                      onClick={() => setStep2Data((d) => ({ ...d, activityLevel: x }))}
                      className={`px-[18px] py-2 rounded-full text-[13px] font-bold flex items-center gap-1.5 transition-all active:scale-95 ${on ? 'bg-[#0F4C3A] text-white shadow-[0_6px_14px_rgba(15,76,58,0.25)]' : 'bg-[#F4F1EB] text-[#6B7A75] hover:bg-[#ECE8DD]'}`}
                    >
                      <span className="shrink-0">{opt.emoji}</span>
                      {ACTIVITY_LABEL(x)}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-[12.5px] font-medium text-[#6B7A75]">💬 {ACTIVITY_DESC(step2Data.activityLevel)}</p>
            </div>

            {/* SECTION 2: EXERCISE TYPE (Horizontal Scroll) */}
            <ExerciseTypeSelector selectedType={step2Data.exerciseType} onSelectType={selectExerciseType} />

            {/* SECTION 3: EXERCISE LIST (Inline) */}
            {step2Data.exerciseType && (
              <ExerciseList
                key={step2Data.exerciseType}
                selectedType={step2Data.exerciseType}
                selectedExerciseIds={step2Data.selectedExercises}
                onToggleExercise={toggleWizardExercise}
              />
            )}

            {/* SECTION 4: AUTO-BUILD BANNER */}
            <div
              className="rounded-[20px] p-6 relative overflow-hidden text-white border-2 border-[#D4AF37]"
              style={{ background: 'linear-gradient(135deg,#0F4C3A 0%,#1a6b53 100%)', boxShadow: '0 8px 20px rgba(212,175,55,0.35)' }}
            >
              <div className="absolute -top-10 -end-10 text-[110px] leading-none opacity-[0.08] select-none pointer-events-none">✨</div>
              <h3 className="text-[17px] font-extrabold text-[#D4AF37]">✨ {t('wizard.exerciseType.autoBuild.title')}</h3>
              <p className="mt-2 text-[13px] text-white/85 leading-relaxed max-w-[520px]">{t('wizard.exerciseType.autoBuild.desc')}</p>
              {autoBuildMode ? (
                <div className="mt-5 flex items-center gap-3 rounded-[18px] bg-white/10 border border-white/15 px-5 py-4">
                  <span className="text-[20px] animate-bounce select-none">🤖</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold">{t('wizard.exerciseType.autoBuild.loading')}</p>
                    <div className="mt-2 h-[6px] bg-white/20 rounded-full overflow-hidden">
                      <div className="wiz-loading-bar h-full bg-[#D4AF37] rounded-full" />
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={runAutoBuild}
                  className="mt-5 h-[52px] px-8 rounded-full bg-[#D4AF37] text-[#0F4C3A] font-extrabold text-[15px] flex items-center gap-2 shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:translate-y-[-1px] transition-all active:scale-95"
                >
                  {t('wizard.exerciseType.autoBuild.cta')}
                </button>
              )}
            </div>

            {/* SECTION 5: STICKY FOOTER */}
            <div className="no-print step2-footer">
              <button type="button" onClick={back} className="h-[52px] px-6 rounded-full border-2 border-[#0F4C3A] text-[#0F4C3A] text-[15px] font-bold bg-transparent hover:bg-[#F4F1EB] transition-all active:scale-95">
                {t('wizard.back')}
              </button>
              <button
                type="button"
                onClick={next}
                className="h-[52px] px-8 rounded-full bg-[#D4AF37] text-[#0F4C3A] font-extrabold text-[15px] flex items-center gap-2 shadow-[0_10px_24px_rgba(212,175,55,0.45)] hover:translate-y-[-1px] transition-all active:scale-95"
              >
                {t('wizard.exerciseList.cta')}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="mt-6 space-y-5">

            <div className={`${cardBase} p-6`}>
              <div>
                <h2 className="text-[18px] font-extrabold">{t('wizard.step3.chooseCuisine')}</h2>
                <p className="mt-0.5 text-[12px] text-[#6B7A75]">✨ {t('wizard.step3.manualBtn')}</p>
              </div>

              {regionSel === null ? (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {REGIONS.map((r) => {
                    const kits = regionKitchens[r.id];
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => {
                          setRegionSel(r.id);
                          setCuisineSel(null);
                        }}
                        className="rounded-[20px] border-2 border-[#EFEBE4] bg-white hover:border-[#D4AF37] p-4 flex flex-col items-center text-center cursor-pointer min-w-0 transition-all active:scale-95"
                      >
                        <span className="text-[34px] leading-none">{r.emoji}</span>
                        <span className="mt-2 text-[14px] font-extrabold leading-none truncate max-w-full text-[#0F4C3A]">{language === 'ar' ? r.ar : r.en}</span>
                        <span className="mt-1 text-[11px] text-[#6B7A75]">
                          {kits.length} {language === 'ar' ? 'مطبخ' : 'cuisines'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : cuisineSel === null ? (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setRegionSel(null)}
                    className="text-[12.5px] font-bold text-[#0F4C3A] hover:text-[#B8860B] transition-all"
                  >
                    ← {language === 'ar' ? 'العودة للمناطق' : 'Back to Regions'}
                  </button>
                  {(() => {
                    const r = REGIONS.find((x) => x.id === regionSel);
                    return r ? (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-[24px] leading-none">{r.emoji}</span>
                        <span className="text-[16px] font-extrabold text-[#0F4C3A]">{language === 'ar' ? r.ar : r.en}</span>
                        <span className="text-[11px] font-bold bg-[#F4F1EB] text-[#6B7A75] px-2.5 py-1 rounded-full">{regionKitchens[r.id].length}</span>
                      </div>
                    ) : null;
                  })()}
                  <div className="mt-3 flex flex-wrap justify-center gap-3">
                    {regionKitchens[regionSel].map((k) => {
                      const on = selectedKitchenId === k.id;
                      return (
                        <div
                          key={k.id}
                          onClick={() => {
                            chooseKitchen(k);
                            setCuisineSel(k.id);
                          }}
                          className={`w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] rounded-[20px] border-2 p-4 flex flex-col items-center text-center cursor-pointer min-w-0 transition-all active:scale-95 ${on ? 'border-[#D4AF37] bg-[#FFFBEF] shadow-[0_0_0_4px_rgba(212,175,55,0.15)]' : 'border-[#EFEBE4] bg-white hover:border-[#D4AF37]'}`}
                        >
                          <span className="text-[34px] leading-none">{k.flag}</span>
                          <span className={`mt-2 text-[14px] font-extrabold leading-none truncate max-w-full text-[#0F4C3A]`}>{k.country}</span>
                          <span className="mt-1 text-[11px] text-[#6B7A75] leading-tight truncate max-w-full">{k.kitchen}</span>
                          {k.sample && <span className="mt-1.5 text-[10.5px] text-[#8A938E] truncate max-w-full">🍽 {k.sample.name}</span>}
                          <span className={`mt-2 text-[11px] font-bold px-2.5 py-1 rounded-full ${on ? 'bg-[#D4AF37] text-[#0F4C3A]' : 'bg-[#F4F1EB] text-[#6B7A75]'}`}>
                            {t('wizard.step3.dishCount').replace('{n}', String(kitchenCounts[k.id] ?? k.total))}
                          </span>
                          {on && <span className="mt-1.5 text-[11px] font-bold text-[#B8860B]">✓ {t('wizard.step2.auto')}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setCuisineSel(null)}
                    className="text-[12.5px] font-bold text-[#0F4C3A] hover:text-[#B8860B] transition-all"
                  >
                    ←{' '}
                    {language === 'ar'
                      ? `العودة إلى ${REGIONS.find((x) => x.id === regionSel)?.ar ?? ''}`
                      : `Back to ${REGIONS.find((x) => x.id === regionSel)?.en ?? ''}`}
                  </button>
                  {(() => {
                    const k = kitchens.find((x) => x.id === cuisineSel);
                    return k ? (
                      <div className="mt-3 rounded-[20px] border-2 border-[#D4AF37] bg-[#FFFBEF] p-4 flex flex-col items-center text-center">
                        <span className="text-[34px] leading-none">{k.flag}</span>
                        <span className="mt-2 text-[14px] font-extrabold leading-none truncate max-w-full text-[#0F4C3A]">{k.country}</span>
                        <span className="mt-1 text-[11px] text-[#6B7A75] leading-tight truncate max-w-full">{k.kitchen}</span>
                        {k.sample && <span className="mt-1.5 text-[10.5px] text-[#8A938E] truncate max-w-full">🍽 {k.sample.name}</span>}
                        <span className="mt-2 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#0F4C3A]">
                          {t('wizard.step3.dishCount').replace('{n}', String(kitchenCounts[k.id] ?? k.total))}
                        </span>
                      </div>
                    ) : null;
                  })()}
                  </div>
              )}
            </div>

            {cuisineSel && (
              <div className="space-y-2">
                {(() => {
                  const picked = kitchens.find((x) => x.id === cuisineSel);
                  const hasRegions = !!picked && (picked.id === 'kuwaiti' || picked.id === 'qatar' || picked.id === 'bahraini' || picked.id === 'omani' || picked.id === 'moroccan' || picked.id === 'egyptian' || picked.id === 'tunisian' || picked.id === 'algerian' || picked.id === 'libyan' || picked.id === 'lebanese' || picked.id === 'syrian' || (Array.isArray(picked.regions) && picked.regions.length > 0));
                  if (!hasRegions) return null;
                  return (
                    <div className="rounded-[20px] border-2 border-[#EFEBE4] bg-white p-4">
                      <div className="text-[12px] font-bold text-[#6B7A75]">
                        {language === 'ar' ? '🏷️ اختر المنطقة (تلقائي: عام)' : '🏷️ Choose a region (default: General)'}
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {(picked.id === 'emirati' ? EMIRATI_REGION_META : picked.id === 'saudi' ? SAUDI_REGION_META : picked.id === 'kuwaiti' ? KUWAITI_REGION_META : picked.id === 'qatar' ? QATARI_REGION_META : picked.id === 'bahraini' ? BAHRAINI_REGION_META : picked.id === 'omani' ? OMANI_REGION_META : picked.id === 'moroccan' ? MOROCCAN_REGION_META : picked.id === 'egyptian' ? EGYPTIAN_REGION_META : picked.id === 'tunisian' ? TUNISIAN_REGION_META : picked.id === 'algerian' ? ALGERIAN_REGION_META : picked.id === 'libyan' ? LIBYAN_REGION_META : picked.id === 'lebanese' ? LEBANESE_REGION_META : picked.id === 'syrian' ? SYRIAN_REGION_META : []).map((r) => {
                          const on = kitchenRegion === r.id;
                          return (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => setKitchenRegion(r.id)}
                              className={`rounded-full border-2 px-3 py-1.5 text-[12px] font-bold flex items-center gap-1.5 transition-all active:scale-95 ${on ? 'border-[#D4AF37] bg-[#FFFBEF] text-[#0F4C3A] shadow-[0_0_0_3px_rgba(212,175,55,0.15)]' : 'border-[#EFEBE4] bg-white text-[#6B7A75] hover:border-[#D4AF37]'}`}
                            >
                              <span>{r.emoji}</span>
                              <span>{language === 'ar' ? r.ar : r.en}</span>
                            </button>
                          );
                        })}
                      </div>
                      {kitchenRegion !== 'all' && picked && (
                        <p className="mt-2 text-[11px] text-[#8A938E] leading-snug">
                          {language === 'ar'
                            ? 'إذا كانت أطباق المنطقة أقل من 7 سيُكمل المولّد تلقائياً من الأطباق العامة، دون تكرار أي طبق أكثر من مرتين بالأسبوع.'
                            : 'If the region has fewer than 7 dishes, the generator auto-fills from general dishes, never repeating a meal more than twice a week.'}
                        </p>
                      )}
                    </div>
                  );
                })()}
                <button
                  type="button"
                  onClick={runAutoKitchen}
                  disabled={autoBuilding}
                  className={`w-full h-[56px] rounded-full bg-[#D4AF37] text-[#0F4C3A] font-extrabold text-[15px] flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(212,175,55,0.45)] transition-all ${autoBuilding ? 'opacity-70 cursor-wait' : 'hover:translate-y-[-1px] active:scale-95'}`}
                >
                  {autoBuilding ? (
                    <>
                      <span className="w-5 h-5 rounded-full border-[3px] border-[#0F4C3A] border-t-transparent animate-spin shrink-0" />
                      {t('wizard.step3.loading')}
                    </>
                  ) : (
                    <span>
                      {language === 'ar'
                        ? '✅ ابدأ — ابنيلي خطة أسبوعية'
                        : '✅ Auto-Select — Build my 7-day plan'}
                    </span>
                  )}
                </button>
                <p className="text-center text-[11.5px] text-[#8A938E] leading-snug">
                  {language === 'ar'
                    ? 'سيختار تلقائياً 7 أيام × 4 وجبات من الأطباق المناسبة لهدفك'
                    : 'It will automatically pick 7 days × 4 meals of dishes matching your goal'}
                </p>
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

        {step === 3 && (
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
                  <div className="mt-3 rounded-[12px] bg-red-50 border border-red-200 px-3.5 py-2 text-[12px] font-semibold text-red-600 leading-snug">
                    ⚠️ {v} ({parsed.weight} {t('wizard.unit.kg')}).
                  </div>
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
                <div className="mt-2 text-[12px] text-[#8A938E]">{numbers.wk.name} · {ACTIVITY_LABEL(step2Data.activityLevel)}</div>
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
                    <span className="text-[16px] font-extrabold text-[#0F4C3A] shrink-0">{t('wizard.step5.day').replace('{n}', String(selectedPlanDay))}</span>
                    <span className="text-[11px] font-bold bg-[#FFF8E7] text-[#B8860B] px-2.5 py-1 rounded-full shrink-0">{t('wizard.step5.dayHeader')}</span>
                  </div>
                  <div className="text-[11px] text-[#8A938E] font-semibold shrink-0">{t('wizard.step5.dayOf').replace('{n}', String(selectedPlanDay))}</div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button type="button" onClick={() => setSelectedPlanDay((s) => Math.max(1, s - 1))} className="w-9 h-9 rounded-full bg-white border border-[#E9E5DB] flex items-center justify-center text-[#0F4C3A] hover:border-[#D4AF37] shrink-0">‹</button>
                  <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar justify-between min-w-0">
                    {[1, 2, 3, 4, 5, 6, 7].map((d) => {
                      const ad = d === selectedPlanDay;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setSelectedPlanDay(d)}
                          className={`relative w-9 h-9 min-w-[36px] rounded-xl flex items-center justify-center text-[13px] font-bold transition-all ${ad ? 'bg-[#D4AF37] text-[#0F4C3A] shadow-[0_4px_10px_rgba(212,175,55,0.4)]' : 'bg-white border border-[#E9E5DB] text-[#6B7A75] hover:border-[#D4AF37]'}`}
                        >
                          <span className="num">{d}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button type="button" onClick={() => setSelectedPlanDay((s) => Math.min(7, s + 1))} className="w-9 h-9 rounded-full bg-white border border-[#E9E5DB] flex items-center justify-center text-[#0F4C3A] hover:border-[#D4AF37] shrink-0">›</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-[22px] p-5 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#D4AF37,#C9A032 70%,#b3922c)' }}>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#3a2f05]/80">{t('wizard.step5.dailyTarget')}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="num text-[34px] font-black text-[#0F4C3A] leading-none">{numbers!.targetCal}</span>
                  <span className="text-[15px] font-bold text-[#0F4C3A]">kcal</span>
                </div>
                <div className="mt-1 text-[11.5px] font-semibold text-[#3a2f05]/80">
                  {numbers!.delta < 0
                    ? t('wizard.step5.basedOnMaintenance').replace('{m}', String(numbers!.tdeeWorkout)).replace('{d}', String(Math.abs(numbers!.delta)))
                    : (
                      <>
                        {t('wizard.step2.maintenance')} <span className="num">{numbers!.tdeeWorkout}</span> + <span className="num">{numbers!.delta}</span>
                      </>
                    )}
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
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, (water / waterGoal) * 100)}%`, background: 'linear-gradient(90deg,#1a6b53,#0F4C3A)' }} />
                  </div>
                  <button type="button" onClick={() => setWater((s) => Math.min(waterGoal, +(s + 0.25).toFixed(2)))} className="w-7 h-7 rounded-full bg-[#F4F1EB] border border-[#E9E5DB] flex items-center justify-center text-[#0F4C3A] text-[14px] font-bold">+</button>
                </div>
                <div className="mt-1.5 text-[11px] font-bold text-[#D4AF37]">+250ml</div>
              </div>

              <div className="rounded-[22px] p-5 border border-[#E8E2D4] bg-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6B7A75]">🍽️ {t('wizard.step5.statMealsDone')}</div>
                  <span className="num w-9 h-9 rounded-full bg-[#FFF8E7] border border-[#E9D9A8] text-[#B8860B] flex items-center justify-center text-[14px] font-extrabold">{doneCount}/4</span>
                </div>
                <div className="mt-3 h-2.5 rounded-full bg-[#E9E5DB] overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(doneCount / 4) * 100}%`, background: 'linear-gradient(90deg,#D4AF37,#C9A032)' }} />
                </div>
                <div className="mt-2 text-[12px] font-semibold text-[#6B7A75]">
                  {t('wizard.step5.completed').replace('{n}', String(doneCount))}
                </div>
              </div>
            </div>

            <div id="step5-daily-plan" className="rounded-[26px] bg-white border border-[#EFEBE4] shadow-[0_10px_30px_rgba(15,76,58,0.06)] p-5 md:p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="text-[16px] font-extrabold">🍱 {t('wizard.step5.statMealsDone')}</h3>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${(() => {
                  const dayIdx = selectedPlanDay - 1;
                  const day = weeklyPlan[dayIdx];
                  const computed = (day?.meals ?? []).reduce((s, m) => s + m.dishes.reduce((x, d) => x + d.calories, 0), 0);
                  const target = numbers!.targetCal;
                  const pct = target ? Math.round(((computed - target) / target) * 100) : 0;
                  const abs = Math.abs(pct);
                  if (abs > 20) return 'bg-red-50 text-red-600';
                  if (abs > 10) return 'bg-[#FFF8E7] text-[#B8860B]';
                  return 'bg-[#E4F2EC] text-[#0F4C3A]';
                })()}`}>
                  {(() => {
                    const dayIdx = selectedPlanDay - 1;
                    const day = weeklyPlan[dayIdx];
                    const computed = (day?.meals ?? []).reduce((s, m) => s + m.dishes.reduce((x, d) => x + d.calories, 0), 0);
                    const target = numbers!.targetCal;
                    const pct = target ? Math.round(((computed - target) / target) * 100) : 0;
                    const sign = pct > 0 ? '+' : '';
                    const mark = Math.abs(pct) > 20 ? '🔴' : Math.abs(pct) > 10 ? '⚠️' : '✅';
                    return `${t('wizard.step5.day').replace('{n}', String(selectedPlanDay))} — ${computed} / ${target} kcal (${sign}${pct}% ${mark})`;
                  })()}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(weeklyPlan[selectedPlanDay - 1]?.meals ?? []).map((meal, idx) => {
                  const emoji = step5Meals.find((s) => s.key === meal.mealType)?.emoji ?? '🍽️';
                  const mealCal = meal.dishes.reduce((s, x) => s + x.calories, 0);
                  const done = idx < 4 ? mealsDone[idx] : false;
                  return (
                    <div
                      key={meal.mealType}
                      className={`rounded-[18px] border-2 p-4 transition-colors ${done ? 'border-[#0F4C3A] bg-[#F2F8F4]' : 'border-[#EFEBE4] bg-white'}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-11 h-11 rounded-[14px] bg-[#F4F1EB] flex items-center justify-center text-[18px] shrink-0">{emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[13px] font-extrabold text-[#0F4C3A]">{meal.label}</span>
                            <span className="text-[11px] text-[#8A938E]">{mealTime(meal.mealType)}</span>
                          </div>
                          <div className="mt-0.5 text-[12px] text-[#6B7A75]">
                            <span className="num font-bold text-[#B8860B]">{mealCal}</span> kcal
                          </div>
                        </div>
                        {idx < 4 && (
                          <button
                            type="button"
                            aria-label={done ? (language === 'ar' ? 'إلغاء إكمال الوجبة' : 'Unmark meal done') : (language === 'ar' ? 'تحديد الوجبة كمكتملة' : 'Mark meal done')}
                            onClick={() => {
                              haptic(6);
                              setMealsDone((prev) => prev.map((v, i) => (i === idx ? !v : v)));
                            }}
                            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ml-2 ${done ? 'bg-[#0F4C3A] border-[#0F4C3A] text-white' : 'border-[#C8C4B8] bg-white'}`}
                          >
                            {done ? '✓' : ''}
                          </button>
                        )}
                      </div>
                      <div className="mt-3 space-y-1.5">
                        {meal.dishes.map((d, di) => {
                          const rowKey = `${di}-${d.dish.name}`;
                          const leaveKey = `d${selectedPlanDay - 1}-m${idx}-x${di}-${d.dish.name}`;
                          const flashKey = `d${selectedPlanDay - 1}-m${idx}-s-${d.dish.name}`;
                          return (
                            <div
                              key={rowKey}
                              className={`flex items-center justify-between gap-2 text-[12px] min-w-0 group rounded-[12px] px-2 py-1 ${
                                removingDish === leaveKey ? 'dish-leave' : 'dish-enter'
                              } ${swapFlash === flashKey ? 'dish-swap-flash' : ''}`}
                            >
                              <span className="font-semibold text-[#0F4C3A] min-w-0 truncate">• {d.dish.name}</span>
                              <span className="flex items-center gap-1.5 shrink-0 text-[#8A938E]">
                                <span className="flex items-center gap-1 min-w-0">
                                  <span className="num font-bold text-[#B8860B]">{d.calories}</span>
                                  <span>kcal</span>
                                  <span className="text-[#C8C4B8]">·</span>
                                  <span className="num font-bold text-[#6B7A75]">{Math.round(d.grams)}g</span>
                                </span>
                                <button
                                  type="button"
                                  aria-label={language === 'ar' ? 'تبديل الطبق' : 'Swap dish'}
                                  title={language === 'ar' ? 'تبديل الطبق' : 'Swap dish'}
                                  onClick={() => setDishModal({ mode: 'swap', dayIndex: selectedPlanDay - 1, mealIndex: idx, mealType: meal.mealType, dishIndex: di })}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] border border-[#E9E5DB] bg-white hover:border-[#D4AF37] hover:bg-[#FFFBEF] text-[#0F4C3A] transition-all active:scale-95 shrink-0"
                                >
                                  🔄
                                </button>
                                <button
                                  type="button"
                                  aria-label={language === 'ar' ? 'إزالة الطبق' : 'Remove dish'}
                                  title={language === 'ar' ? 'إزالة الطبق' : 'Remove dish'}
                                  onClick={() => handleRemoveDish(selectedPlanDay - 1, idx, di)}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] border border-[#E9E5DB] bg-white hover:border-red-300 hover:bg-red-50 text-[#9AA19D] hover:text-red-500 transition-all active:scale-95 shrink-0"
                                >
                                  ✕
                                </button>
                              </span>
                            </div>
                          );
                        })}
                        <button
                          type="button"
                          aria-label={language === 'ar' ? 'أضف طبقاً' : 'Add dish'}
                          onClick={() => setDishModal({ mode: 'add', dayIndex: selectedPlanDay - 1, mealIndex: idx, mealType: meal.mealType, dishIndex: 0 })}
                          className="w-full h-9 rounded-[12px] border-2 border-dashed border-[#E3E0D8] text-[12px] font-bold text-[#0F4C3A] hover:border-[#D4AF37] hover:bg-[#FFFBEF] flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
                        >
                          <span>+</span> {language === 'ar' ? 'أضف طبقاً' : 'Add dish'}
                        </button>
                      </div>
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
                <button type="button" onClick={goEditExercises} className="rounded-full bg-white border border-[#E9E5DB] text-[#0F4C3A] px-5 py-2.5 text-[13px] font-bold flex items-center gap-1.5 hover:border-[#D4AF37] transition-all">
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
                <button type="button" onClick={goEditExercises} className="mt-3 text-[11.5px] text-[#B8860B] underline decoration-dotted">{t('wizard.step5.editExercises')}</button>
              </div>
            )}

            {planType !== 'fitness' && (
              <div className="rounded-[26px] bg-white border border-[#EFEBE4] shadow-[0_10px_30px_rgba(15,76,58,0.06)] p-5 md:p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-[12px] bg-[#F4F1EB] flex items-center justify-center text-[16px] shrink-0">🍽️</span>
                    <div>
                      <div className="text-[15px] font-extrabold">{t('wizard.step5.planTitle')}</div>
                      <div className="text-[11px] text-[#8A938E]">{selectedKitchen.flag} {selectedKitchen.country}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold bg-[#FFF8E7] text-[#B8860B] px-3 py-1 rounded-full shrink-0">
                    {t('wizard.step5.todayProgress').replace('{n}', String(doneCount))}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-7 gap-1.5">
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                    const dayTotal = (weeklyPlan[i]?.meals ?? []).reduce((s, m) => s + m.dishes.reduce((x, d) => x + d.calories, 0), 0);
                    const target = numbers!.targetCal;
                    const pct = target ? Math.round(((dayTotal - target) / target) * 100) : 0;
                    const sign = pct > 0 ? '+' : '';
                    const abs = Math.abs(pct);
                    const active = i === selectedPlanDay - 1;
                    const badgeCls = !weeklyPlan[i] ? '' : abs > 20 ? 'bg-red-50 text-red-600' : abs > 10 ? 'bg-[#FFF8E7] text-[#B8860B]' : 'bg-[#E4F2EC] text-[#0F4C3A]';
                    const mark = !weeklyPlan[i] ? '' : abs > 20 ? '🔴' : abs > 10 ? '⚠️' : '✅';
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedPlanDay(i + 1)}
                        className={`rounded-[12px] py-2 text-center transition-all ${active ? 'bg-[#0F4C3A] text-white shadow-md' : 'bg-[#F4F1EB] text-[#6B7A75] hover:bg-[#EDE8DF]'}`}
                      >
                        <div className="text-[10px] font-extrabold">{t('wizard.step5.day').replace('{n}', String(i + 1))}</div>
                        <div className="text-[9.5px] opacity-80 mt-0.5">
                          {weeklyPlan[i] ? `${dayTotal} kcal` : '—'}
                        </div>
                        {weeklyPlan[i] && (
                          <div className={`mt-1 inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${badgeCls}`}>
                            {sign}{pct}% {mark}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 rounded-[16px] bg-[#FAF8F3] px-4 py-3 flex items-center justify-between gap-2">
                  <span className="text-[12px] font-bold text-[#0F4C3A]">{t('wizard.step5.completed').replace('{n}', String(doneCount))}</span>
                  <span className="w-9 h-9 rounded-full bg-white border border-[#E9E5DB] text-[#B8860B] flex items-center justify-center text-[13px] font-extrabold">{doneCount}/4</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="button" onClick={() => document.getElementById('step5-daily-plan')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="h-10 rounded-[14px] px-4 bg-[#0F4C3A] text-white text-[12px] font-bold hover:bg-[#0a3a2c] transition-all shrink-0">🗓️ {t('wizard.step5.viewFullPlan')}</button>
                  <button type="button" onClick={() => setStep(4)} className="h-10 rounded-[14px] px-4 bg-white border border-[#E3E0D8] text-[12px] font-bold text-[#0F4C3A] hover:border-[#D4AF37] transition-all shrink-0">🍳 {t('wizard.step5.changeCuisineBtn')}</button>
                </div>
              </div>
            )}

            <div className="no-print save-bar rounded-t-[20px]">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
                <span className="text-[12px] font-bold text-[#6B7A75] truncate">{t('wizard.step5.completed').replace('{n}', String(doneCount))}</span>
              </div>
              <button type="button" onClick={() => notify(t('wizard.toast.closePreview'))} className="text-[12.5px] font-bold text-[#6B7A75] px-3 py-2 rounded-xl hover:bg-[#F4F1EB] shrink-0">
                {t('wizard.step5.close')}
              </button>
              <button
                type="button"
                onClick={handleSaveProgress}
                className="save-btn"
              >
                <span>✓</span> {t('wizard.step5.saveProgress')}
              </button>
            </div>
          </div>
        )}
      </main>

      {toast && (
        <div className="no-print fixed bottom-24 left-1/2 z-50 flex items-center gap-3 rounded-full bg-[#0F4C3A] text-white text-[12.5px] font-semibold px-5 py-2.5 shadow-lg whitespace-nowrap toast-in" style={{ transform: 'translate(-50%, 0)' }} role="status" aria-live="polite" aria-atomic="true">
          <span>{toast}</span>
          {toastUndo && (
            <button
              type="button"
              onClick={toastUndo.action}
              className="text-[#D4AF37] font-extrabold text-[12px] uppercase tracking-wide hover:underline shrink-0"
            >
              {toastUndo.label}
            </button>
          )}
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

      {dishModal && (() => {
        const day = weeklyPlan[dishModal.dayIndex];
        const meal = day?.meals[dishModal.mealIndex];
        const cur = dishModal.mode === 'swap' ? meal?.dishes[dishModal.dishIndex] ?? null : null;
        return (
          <AddDishModal
            open={!!dishModal}
            mode={dishModal.mode}
            mealType={dishModal.mealType}
            mealLabel={meal ? meal.label : mealLabel(dishModal.mealType)}
            pool={dishPoolByMeal(dishModal.mealType)}
            currentDish={cur ? { calories: cur.calories, name: cur.dish.name } : null}
            language={language}
            onClose={() => setDishModal(null)}
            onSelect={(dish) => {
              if (dishModal.mode === 'add') {
                handleAddDish(dishModal.dayIndex, dishModal.mealIndex, dish);
              } else if (cur) {
                handleSwapDish(dishModal.dayIndex, dishModal.mealIndex, dishModal.dishIndex, dish);
              }
              setDishModal(null);
            }}
          />
        );
      })()}
    </div>
  );
};

export default WeightLossPage;