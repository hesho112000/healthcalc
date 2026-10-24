import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Activity, ArrowRight, Beef, Briefcase, Check, ChevronLeft, Cigarette, Coffee, Cookie, CupSoda, Droplets, Dumbbell, Info, Minus, Moon,
  PartyPopper, Play, Plus, Ruler, Salad, ShieldCheck, Smile, Sparkles, Sun, Target, Timer, User, UtensilsCrossed,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import { kitchensRegistry, totalDishesAll, getDishName, getCategoryName, getKitchenName, getKitchenCountry, KITCHEN_REGION_KITCHEN_IDS } from '../data/kitchens';
import type { KitchenInfo, KitchenDish, KitchenCategory } from '../data/kitchens';
import type { UnifiedExercise } from '../data/exercises/unified';
import { useUnifiedExercises } from '../hooks/useUnifiedExercises';
import AddDishModal from '../components/wizard/AddDishModal';
import MealCard from '../components/meal-plan/MealCard';
import Flag, { getCountryCode } from '../components/common/Flag';
import { useAuth } from '../context/AuthContext';
import { savePlan, saveProfile } from '../services/supabaseData';
import { useKitchenDishes } from '../hooks/useKitchenDishes';
import { useKitchenDishCounts, KITCHEN_ID_ALIAS } from '../hooks/useKitchenDishCounts';
import { useUserProfile, WIZARD_DRAFT_STORAGE_KEY, WIZARD_STEP_STORAGE_KEY, type UserProfile, type WizardGoalSelection, type SleepHours, type StressLevel, type WorkType, type SmokingStatus, type MealsPerDay, type SnackFrequency, type BreakfastType, type MeatFrequency, type VegetablesFrequency, type SugaryDrinksFrequency, type GoalDiscoverySelection, type BodyConcern, type KitchenMode, type UserRecommendations, type UserPlanPreview } from '../hooks/useUserProfile';
import { generateWeeklyPlan, MEAL_ORDER as PLAN_MEAL_ORDER } from '../utils/mealPlanGenerator';
import type { PlanDay, PlanDish, PlanMealType } from '../utils/mealPlanGenerator';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
type Sex = 'male' | 'female';
type PlanType = 'nutrition' | 'fitness' | 'both';
type ActivityKey = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type GoalKey = 'lose' | 'gain_muscle' | 'gain_weight' | 'wellness' | 'athletic';
type DietLevel = 'normal' | 'medium' | 'harsh';

const WIZARD_GOAL_CALC: Record<WizardGoalSelection, GoalKey> = {
  lose_weight: 'lose',
  maintain_weight: 'wellness',
  build_muscle: 'gain_muscle',
  improve_health: 'wellness',
};

const recommendWizardGoal = (conditions: string[], bmi: number | null): WizardGoalSelection => {
  if (conditions.some((condition) => ['diabetes', 'hypertension', 'high_cholesterol'].includes(condition))) return 'improve_health';
  return bmi !== null && bmi >= 25 ? 'lose_weight' : 'maintain_weight';
};

const initialWizardGoal = (profile: UserProfile): WizardGoalSelection => {
  if (profile.wizardGoal) return profile.wizardGoal;
  if (profile.goal === 'lose') return 'lose_weight';
  if (profile.goal === 'gain_muscle' || profile.goal === 'gain_weight' || profile.goal === 'athletic') return 'build_muscle';
  if (profile.goal === 'wellness') return 'maintain_weight';
  const bmi = profile.height && profile.weight ? profile.weight / Math.pow(profile.height / 100, 2) : null;
  return recommendWizardGoal(profile.healthConditions, bmi);
};

const GOAL_SELECTION_OPTIONS: { id: WizardGoalSelection; icon: string; en: string; ar: string; enDesc: string; arDesc: string }[] = [
  { id: 'lose_weight', icon: '⚖️', en: 'Lose Weight', ar: 'إنقاص الوزن', enDesc: 'Steady, sustainable fat loss', arDesc: 'خسارة دهون ثابتة ومستدامة' },
  { id: 'maintain_weight', icon: '🌿', en: 'Maintain Weight', ar: 'الحفاظ على الوزن', enDesc: 'Build healthy habits and hold steady', arDesc: 'عادات صحية والحفاظ على وزنك' },
  { id: 'build_muscle', icon: '💪', en: 'Build Muscle', ar: 'بناء العضلات', enDesc: 'Strength training with more protein', arDesc: 'تمارين قوة مع بروتين أعلى' },
  { id: 'improve_health', icon: '🩺', en: 'Improve Specific Health', ar: 'تحسين حالة صحية محددة', enDesc: 'Personalize habits for your health needs', arDesc: 'عادات مخصصة لاحتياجاتك الصحية' },
];

const GOAL_DISCOVERY_OPTIONS: { id: GoalDiscoverySelection; icon: string; en: string; ar: string }[] = [
  { id: 'lose_weight', icon: '⚖️', en: 'Lose Weight', ar: 'إنقاص الوزن' },
  { id: 'maintain_weight', icon: '🌿', en: 'Maintain Weight', ar: 'الحفاظ على الوزن' },
  { id: 'build_muscle', icon: '💪', en: 'Build Muscle', ar: 'بناء العضلات' },
  { id: 'improve_health', icon: '🩺', en: 'Improve Specific Health', ar: 'تحسين حالة صحية محددة' },
  { id: 'not_sure', icon: '🤔', en: 'Not sure — help me decide', ar: 'لست متأكداً — ساعدني في الاختيار' },
];

const TIMELINE_OPTIONS: { weeks: number; en: string; ar: string }[] = [
  { weeks: 4, en: '1 month', ar: 'شهر واحد' },
  { weeks: 13, en: '3 months', ar: '3 أشهر' },
  { weeks: 26, en: '6 months', ar: '6 أشهر' },
  { weeks: 52, en: '1 year', ar: 'سنة واحدة' },
];

const PRIMARY_GOAL_ORDER: WizardGoalSelection[] = ['lose_weight', 'build_muscle', 'improve_health', 'maintain_weight'];
const primaryGoalSelection = (goals: WizardGoalSelection[]): WizardGoalSelection =>
  PRIMARY_GOAL_ORDER.find((g) => goals.includes(g)) ?? 'maintain_weight';

const EXERCISE_RECOMMENDATION_OPTIONS = [
  { id: 'cardio', en: 'Cardio', ar: 'تمارين القلب', Icon: Activity },
  { id: 'strength', en: 'Strength', ar: 'تمارين القوة', Icon: Dumbbell },
  { id: 'hiit', en: 'HIIT', ar: 'تمارين عالية الكثافة', Icon: Activity },
  { id: 'balance', en: 'Balance', ar: 'التوازن', Icon: Target },
  { id: 'flexibility', en: 'Flexibility', ar: 'المرونة', Icon: Activity },
] as const;

type ExerciseRecommendationType = typeof EXERCISE_RECOMMENDATION_OPTIONS[number]['id'];

const recommendExerciseTypes = (goals: WizardGoalSelection[], concerns: BodyConcern[]): ExerciseRecommendationType[] => {
  const picks = new Set<ExerciseRecommendationType>();
  if (goals.includes('lose_weight')) ['cardio', 'hiit', 'strength'].forEach((id) => picks.add(id as ExerciseRecommendationType));
  if (goals.includes('build_muscle')) picks.add('strength');
  if (goals.includes('improve_health')) ['cardio', 'strength', 'flexibility'].forEach((id) => picks.add(id as ExerciseRecommendationType));
  if (goals.includes('maintain_weight') || !goals.length) ['cardio', 'strength', 'flexibility'].forEach((id) => picks.add(id as ExerciseRecommendationType));
  concerns.forEach((concern) => {
    if (concern === 'belly_fat') ['balance', 'cardio'].forEach((id) => picks.add(id as ExerciseRecommendationType));
    if (concern === 'love_handles') ['balance', 'cardio'].forEach((id) => picks.add(id as ExerciseRecommendationType));
    if (['chest_sagging', 'arm_fat', 'thigh_fat', 'back_fat'].includes(concern)) picks.add('strength');
    if (concern === 'back_fat') picks.add('flexibility');
  });
  if (picks.size < 3) ['cardio', 'strength', 'flexibility'].forEach((id) => picks.add(id as ExerciseRecommendationType));
  return [...picks].slice(0, 4);
};

interface Workout {
  id: string;
  nameKey: string;
  days: number;
  burn: number;
}

type WizardExerciseCategory = 'cardio' | 'strength' | 'hiit' | 'flexibility' | 'balance';

interface PlannedExercise {
  id: string;
  type: string;
  name: string;
  sets: string;
  reps: string;
  dur: string;
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

const LEGACY_EXERCISE_TYPE_MAP: Record<string, WizardExerciseCategory> = {
  cardio: 'cardio',
  strength: 'strength',
  hiit: 'hiit',
  flexibility: 'flexibility',
  balance: 'balance',
  yoga: 'flexibility',
  pilates: 'flexibility',
  tai_chi: 'balance',
  crossfit: 'hiit',
  swimming: 'cardio',
  cycling: 'cardio',
  running: 'cardio',
  boxing: 'hiit',
  dance: 'cardio',
  calisthenics: 'strength',
  functional: 'strength',
  mindbody: 'balance',
  core: 'balance',
};

const normalizeExerciseCategories = (types: string[]): WizardExerciseCategory[] =>
  [...new Set(types.map((type) => LEGACY_EXERCISE_TYPE_MAP[type]).filter((type): type is WizardExerciseCategory => !!type))];

const hasFourFilledMeals = (value: unknown, expectedTarget?: number): value is PlanDay[] =>
  Array.isArray(value) && value.length === 7 && value.every((day) => {
    if (!Array.isArray(day?.meals) || day.meals.length !== PLAN_MEAL_ORDER.length || !Number.isFinite(day.targetCal) || day.targetCal <= 0) return false;
    const mealsTotal = day.meals.reduce((sum: number, meal: { dishes?: Array<{ calories?: number }> }) =>
      sum + (meal.dishes ?? []).reduce((mealSum, dish) => mealSum + (Number(dish?.calories) || 0), 0), 0);
    if (Math.abs(mealsTotal - day.totalCal) > 1 || Math.abs(day.totalCal - day.targetCal) > day.targetCal * 0.03) return false;
    if (expectedTarget !== undefined && Math.abs(day.targetCal - expectedTarget) > expectedTarget * 0.03) return false;
    return PLAN_MEAL_ORDER.every((mealType) => {
      const meal = day.meals.find((item: { mealType?: PlanMealType }) => item?.mealType === mealType);
      return Array.isArray(meal?.dishes) && meal.dishes.some((dish: { calories?: number }) => Number(dish?.calories) > 0);
    });
  });

const ACTIVITY: Record<ActivityKey, { factor: number; label: string; desc: string; emoji: string }> = {
  sedentary: { factor: 1.2, label: 'خامل', desc: 'مكتبي - بدون رياضة', emoji: '🛋️' },
  light: { factor: 1.375, label: 'خفيف', desc: '1-3 أيام / أسبوع', emoji: '🚶' },
  moderate: { factor: 1.55, label: 'متوسط', desc: '3-5 أيام / أسبوع', emoji: '🏃' },
  active: { factor: 1.725, label: 'نشط', desc: '6-7 أيام / أسبوع', emoji: '💪' },
  very_active: { factor: 1.9, label: 'نشط جدا', desc: 'عمل شاق + رياضة', emoji: '🔥' },
};

const ACTIVITY_ORDER: ActivityKey[] = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

const SLEEP_OPTIONS: { value: SleepHours; en: string; ar: string }[] = [
  { value: 'under_6', en: '< 6 hours', ar: 'أقل من 6 ساعات' },
  { value: 'six_to_seven', en: '6–7 hours', ar: '6–7 ساعات' },
  { value: 'seven_to_eight', en: '7–8 hours', ar: '7–8 ساعات' },
  { value: 'eight_plus', en: '8+ hours', ar: 'أكثر من 8 ساعات' },
];
const STRESS_OPTIONS: { value: StressLevel; en: string; ar: string }[] = [
  { value: 'low', en: 'Low', ar: 'منخفض' },
  { value: 'medium', en: 'Medium', ar: 'متوسط' },
  { value: 'high', en: 'High', ar: 'مرتفع' },
];
const WORK_TYPE_OPTIONS: { value: WorkType; en: string; ar: string }[] = [
  { value: 'sedentary', en: 'Desk job', ar: 'عمل مكتبي' },
  { value: 'light', en: 'Light activity', ar: 'نشاط خفيف' },
  { value: 'active', en: 'Active work', ar: 'عمل نشط' },
  { value: 'very_active', en: 'Physical work', ar: 'عمل بدني' },
];
const SMOKING_OPTIONS: { value: SmokingStatus; en: string; ar: string }[] = [
  { value: 'no', en: 'No', ar: 'لا' },
  { value: 'occasionally', en: 'Occasionally', ar: 'أحياناً' },
  { value: 'yes', en: 'Daily', ar: 'يومياً' },
];
const MEALS_PER_DAY_OPTIONS: { value: MealsPerDay; en: string; ar: string }[] = [
  { value: 'one_to_two', en: '1–2 meals', ar: 'وجبة أو وجبتان' },
  { value: 'three', en: '3 meals', ar: '3 وجبات' },
  { value: 'four', en: '4 meals', ar: '4 وجبات' },
  { value: 'five_plus', en: '5+ meals', ar: '5 وجبات أو أكثر' },
];
const SNACK_OPTIONS: { value: SnackFrequency; en: string; ar: string }[] = [
  { value: 'never', en: 'Rarely', ar: 'نادراً' },
  { value: 'sometimes', en: 'Sometimes', ar: 'أحياناً' },
  { value: 'often', en: 'Often', ar: 'غالباً' },
];
const BREAKFAST_OPTIONS: { value: BreakfastType; en: string; ar: string }[] = [
  { value: 'skip', en: 'I skip it', ar: 'أتخطاه' },
  { value: 'light', en: 'Light', ar: 'خفيف' },
  { value: 'full', en: 'Full meal', ar: 'وجبة كاملة' },
];
const MEAT_OPTIONS: { value: MeatFrequency; en: string; ar: string }[] = [
  { value: 'daily', en: 'Daily', ar: 'يومياً' },
  { value: 'weekly', en: 'A few times a week', ar: 'بضع مرات أسبوعياً' },
  { value: 'rarely', en: 'Rarely', ar: 'نادراً' },
  { value: 'never', en: 'Never', ar: 'أبداً' },
];
const VEGETABLE_OPTIONS: { value: VegetablesFrequency; en: string; ar: string }[] = [
  { value: 'daily', en: 'Daily', ar: 'يومياً' },
  { value: 'weekly', en: 'A few times a week', ar: 'بضع مرات أسبوعياً' },
  { value: 'rarely', en: 'Rarely', ar: 'نادراً' },
];
const SUGARY_DRINK_OPTIONS: { value: SugaryDrinksFrequency; en: string; ar: string }[] = [
  { value: 'never', en: 'Rarely', ar: 'نادراً' },
  { value: 'sometimes', en: 'Sometimes', ar: 'أحياناً' },
  { value: 'daily', en: 'Daily', ar: 'يومياً' },
];

const hasBasicInfo = (profile: UserProfile): boolean => profile.age !== null && profile.gender !== null;
const hasMeasurements = (profile: UserProfile): boolean => profile.height !== null && profile.weight !== null;
const enteredFromCalculator = (profile: UserProfile): boolean => hasBasicInfo(profile) && hasMeasurements(profile) && (profile.goal !== null || profile.wizardGoal !== null);

type WizardDraft = {
  step?: number;
  startedFromHero?: boolean;
  planType?: PlanType;
  age?: string;
  sex?: Sex;
  height?: string;
  weight?: string;
  wizardGoal?: WizardGoalSelection;
  goal?: GoalKey;
  targetWeight?: string;
  timeline?: string;
  selectedKitchenId?: string;
  workout?: string;
  exerciseTypes?: string[];
  kitchenMode?: KitchenMode | null;
  kitchenSelectionAccepted?: boolean;
  categoryMode?: 'manual' | 'auto';
  exerciseMode?: 'manual' | 'auto';
  step2Data?: { activityLevel: ActivityKey; exerciseType: string | null; selectedExercises: string[] };
  autoBuildMode?: boolean;
  dietId?: string;
  dietaryPreferences?: string[];
  healthConditions?: string[];
  dietAffectingMedication?: boolean | null;
  waist?: string;
  sleepHours?: SleepHours;
  stressLevel?: StressLevel;
  workType?: WorkType;
  waterGlasses?: number;
  smoking?: SmokingStatus;
  caffeineCups?: number;
  mealsPerDay?: MealsPerDay;
  snacksBetweenMeals?: SnackFrequency;
  breakfastType?: BreakfastType;
  meatFrequency?: MeatFrequency;
  vegetablesFrequency?: VegetablesFrequency;
  sugaryDrinks?: SugaryDrinksFrequency;
  goalDiscovery?: GoalDiscoverySelection | null;
  goals?: WizardGoalSelection[];
  bodyConcerns?: BodyConcern[];
  exerciseRecommendationTypes?: ExerciseRecommendationType[];
  adjustingExerciseRecommendations?: boolean;
  plannedExercises?: PlannedExercise[];
  selectedDishKeys?: string[];
  assignedDishes?: Record<string, MealKey[]>;
  weeklyPlan?: PlanDay[];
  planPreview?: UserPlanPreview | null;
  selectedPlanDay?: number;
  activeCuisineRegion?: CuisineRegionId;
  kitchenRegion?: string;
  regionSel?: string | null;
  cuisineSel?: string | null;
};

type StoredWizardDraft = { version: 1; step: number; data: WizardDraft };

const readWizardDraft = (): WizardDraft | null => {
  try {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(WIZARD_DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredWizardDraft> | null;
    if (!parsed || parsed.version !== 1 || !Number.isInteger(parsed.step) || parsed.step! < 1 || parsed.step! > 13) return null;
    if (!parsed.data || typeof parsed.data !== 'object' || Array.isArray(parsed.data)) return null;
    return { ...parsed.data, step: parsed.step } as WizardDraft;
  } catch {
    return null;
  }
};

const saveWizardDraft = (step: Step, draft: WizardDraft): void => {
  try {
    if (typeof localStorage === 'undefined') return;
    const stored: StoredWizardDraft = { version: 1, step, data: draft };
    localStorage.setItem(WIZARD_DRAFT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    /* ignore */
  }
};

const clearWizardDraft = (): void => {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(WIZARD_DRAFT_STORAGE_KEY);
    localStorage.removeItem(WIZARD_STEP_STORAGE_KEY);
  } catch {
    /* ignore */
  }
};

const saveWizardStep = (step: Step): void => {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(WIZARD_STEP_STORAGE_KEY, String(step));
  } catch {
    /* ignore */
  }
};

const initialWizardStep = (profile: UserProfile, draft: WizardDraft | null): Step => {
  if (typeof draft?.step === 'number' && Number.isInteger(draft.step) && draft.step >= 1 && draft.step <= 13) {
    return draft.step as Step;
  }
  return enteredFromCalculator(profile) ? 4 : 1;
};

const draftStringList = (value: unknown, fallback: string[] = []): string[] => (
  Array.isArray(value) && value.every((item) => typeof item === 'string') ? value : fallback
);

const draftStep2Data = (value: unknown, fallback: { activityLevel: ActivityKey; exerciseType: string | null; selectedExercises: string[] }) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return fallback;
  const candidate = value as Record<string, unknown>;
  const activityLevels: ActivityKey[] = ['sedentary', 'light', 'moderate', 'active', 'very_active'];
  if (!activityLevels.includes(candidate.activityLevel as ActivityKey)) return fallback;
  if (candidate.exerciseType !== null && typeof candidate.exerciseType !== 'string') return fallback;
  if (!Array.isArray(candidate.selectedExercises) || !candidate.selectedExercises.every((item) => typeof item === 'string')) return fallback;
  return {
    activityLevel: candidate.activityLevel as ActivityKey,
    exerciseType: candidate.exerciseType as string | null,
    selectedExercises: candidate.selectedExercises,
  };
};

const draftPlannedExercises = (value: unknown): PlannedExercise[] | null => {
  if (!Array.isArray(value)) return null;
  const valid = value.every((item) => item && typeof item === 'object'
    && ['id', 'type', 'name', 'sets', 'reps', 'dur'].every((field) => typeof (item as Record<string, unknown>)[field] === 'string'));
  return valid ? value as PlannedExercise[] : null;
};

const draftWeeklyPlan = (value: unknown): PlanDay[] | null => {
  try {
    return hasFourFilledMeals(value) ? value : null;
  } catch {
    return null;
  }
};

const draftPlanPreview = (value: unknown): UserPlanPreview | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const candidate = value as Partial<UserPlanPreview>;
  return typeof candidate.kitchenId === 'string'
    && Array.isArray(candidate.meals)
    && Number.isFinite(candidate.totalCalories)
    && candidate.macroPercentages != null
    ? candidate as UserPlanPreview
    : null;
};

const WORKOUTS: Workout[] = [
  { id: 'full_body', nameKey: 'wizard.workout.fullBody', days: 3, burn: 150 },
  { id: 'upper_lower', nameKey: 'wizard.workout.upperLower', days: 4, burn: 200 },
  { id: 'ppl', nameKey: 'wizard.workout.pushPullLegs', days: 5, burn: 250 },
  { id: 'bodyweight_only', nameKey: 'wizard.workout.bodyweight', days: 3, burn: 160 },
  { id: 'bro_split', nameKey: 'wizard.workout.broSplit', days: 5, burn: 220 },
  { id: 'custom', nameKey: 'wizard.workout.custom', days: 4, burn: 180 },
];

const EXERCISE_TYPES: { id: WizardExerciseCategory; burn: string }[] = [
  { id: 'cardio', burn: '300-500' },
  { id: 'strength', burn: '200-350' },
  { id: 'hiit', burn: '400-600' },
  { id: 'flexibility', burn: '150-250' },
  { id: 'balance', burn: '150-250' },
];

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
  translationKey?: 'region.north-america' | 'region.south-america';
}

const RegionMarker: React.FC<{ value: string; label: string; className?: string }> = ({ value, label, className = '' }) => {
  const countryCode = getCountryCode(value);
  return countryCode
    ? <Flag countryCode={countryCode} alt={`${label} flag`} className={className} />
    : <span className={className}>{value}</span>;
};

const REGIONS: RegionDef[] = [
  { id: 'africa', emoji: '🌍', en: 'Africa', ar: 'أفريقيا', ids: ['egyptian', 'libyan', 'tunisian', 'algerian', 'moroccan', 'nigerian', 'ethiopian', 'kenyan', 'rwandan', 'seychellois', 'mauritian', 'gabonese', 'botswanan', 'south-african', 'ghanaian'] },
  { id: 'middle-east', emoji: '🕌', en: 'Middle East & Gulf', ar: 'الشرق الأوسط والخليج', ids: ['saudi', 'emirati', 'omani', 'kuwaiti', 'qatar', 'bahraini', 'lebanese', 'palestinian', 'syrian', 'jordanian'] },
  { id: 'asia', emoji: '🌏', en: 'Asia & Oceania', ar: 'آسيا وأوقيانوسيا', ids: ['indian', 'pakistani', 'indonesian', 'malaysian', 'chinese', 'japanese', 'korean', 'thai', 'vietnamese', 'filipino', 'australasia'] },
  { id: 'north-america', emoji: '🌎', en: 'North America', ar: 'أمريكا الشمالية', translationKey: 'region.north-america', ids: [...KITCHEN_REGION_KITCHEN_IDS['north-america']] },
  { id: 'south-america', emoji: '🌎', en: 'South America', ar: 'أمريكا الجنوبية', translationKey: 'region.south-america', ids: [...KITCHEN_REGION_KITCHEN_IDS['south-america']] },
  { id: 'europe', emoji: '🏰', en: 'Europe', ar: 'أوروبا', ids: ['italian', 'french', 'spanish', 'greek', 'turkey', 'british', 'swiss', 'germany', 'austria', 'benelux', 'norway', 'sweden', 'denmark', 'finland', 'ukraine', 'eastern-european'] },
  { id: 'special-diets', emoji: '🌿', en: 'Diet Plans', ar: 'برامج غذائية', ids: [...KITCHEN_REGION_KITCHEN_IDS['diet-plans']] },
];

type CuisineRegionId = 'diet-plans' | 'europe' | 'asia' | 'americas' | 'mena' | 'africa';

const CUISINE_REGIONS: { id: CuisineRegionId; en: string; ar: string; translationKey?: 'region.diet-plans'; ids: string[] }[] = [
  { id: 'europe', en: 'Europe', ar: 'أوروبا', ids: ['italian', 'french', 'spanish', 'greek', 'turkey', 'british', 'swiss', 'germany', 'austria', 'benelux', 'norway', 'sweden', 'denmark', 'finland', 'ukraine', 'eastern-european'] },
  { id: 'asia', en: 'Asia & Oceania', ar: 'آسيا وأوقيانوسيا', ids: ['indian', 'pakistani', 'indonesian', 'malaysian', 'chinese', 'japanese', 'korean', 'thai', 'vietnamese', 'filipino', 'taiwan', 'australasia', 'australian', 'new-zealand'] },
  { id: 'americas', en: 'Americas', ar: 'الأمريكتان', ids: [...KITCHEN_REGION_KITCHEN_IDS['north-america'], ...KITCHEN_REGION_KITCHEN_IDS['south-america'], 'american'] },
  { id: 'mena', en: 'Middle East', ar: 'الشرق الأوسط', ids: ['egyptian', 'libyan', 'tunisian', 'algerian', 'moroccan', 'saudi', 'emirati', 'omani', 'kuwaiti', 'qatar', 'bahraini', 'lebanese', 'palestinian', 'syrian', 'jordanian'] },
  { id: 'africa', en: 'Africa', ar: 'أفريقيا', ids: ['nigerian', 'ethiopian', 'kenyan', 'rwandan', 'seychellois', 'mauritian', 'gabonese', 'botswanan', 'south-african', 'ghanaian'] },
  { id: 'diet-plans', en: 'Diet Plans', ar: 'برامج غذائية', translationKey: 'region.diet-plans', ids: [...KITCHEN_REGION_KITCHEN_IDS['diet-plans']] },
];

const cuisineRegionForKitchen = (kitchenId: string): CuisineRegionId =>
  CUISINE_REGIONS.find((region) => region.ids.includes(kitchenId))?.id ?? 'europe';

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

const JORDANIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇯🇴', en: 'All Jordanian', ar: 'كل المطبخ الأردني' },
  { id: 'pan_jordanian', emoji: '🥘', en: 'General Jordanian', ar: 'عام (كل الأردن)' },
  { id: 'levantine_shared', emoji: '🕊️', en: 'Levant Shared', ar: 'شامي مشترك' },
  { id: 'mena_shared', emoji: '🌍', en: 'MENA Shared', ar: 'شرق أوسطي مشترك' },
  { id: 'amman', emoji: '🕌', en: 'Amman', ar: 'عمّان' },
  { id: 'irbid', emoji: '🏛️', en: 'Irbid', ar: 'إربد' },
  { id: 'zarqa', emoji: '🏭', en: 'Zarqa', ar: 'الزرقاء' },
  { id: 'balqa', emoji: '🌄', en: 'Balqa', ar: 'البلقاء' },
  { id: 'mafraq', emoji: '🏜️', en: 'Mafraq', ar: 'المفرق' },
  { id: 'jerash', emoji: '🏺', en: 'Jerash', ar: 'جرش' },
  { id: 'ajloun', emoji: '🌲', en: 'Ajloun', ar: 'عجلون' },
  { id: 'karak', emoji: '🏰', en: 'Karak', ar: 'الكرك' },
  { id: 'tafilah', emoji: '⛰️', en: 'Tafilah', ar: 'الطفيلة' },
  { id: 'maan', emoji: '🗻', en: 'Maan', ar: 'معان' },
  { id: 'aqaba', emoji: '⚓', en: 'Aqaba', ar: 'العقبة' },
  { id: 'madaba', emoji: '🏛️', en: 'Madaba', ar: 'مادبا' },
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

const PALESTINIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇵🇸', en: 'All Palestinian', ar: 'كل المطبخ الفلسطيني' },
  { id: 'pan_palestinian', emoji: '🥘', en: 'General Palestinian', ar: 'عام (كل فلسطين)' },
  { id: 'levantine_shared', emoji: '🕊️', en: 'Levant Shared', ar: 'شامي مشترك' },
  { id: 'mena_shared', emoji: '🌍', en: 'MENA Shared', ar: 'شرق أوسطي مشترك' },
  { id: 'jerusalem', emoji: '🕌', en: 'Jerusalem', ar: 'القدس' },
  { id: 'gaza', emoji: '⚓', en: 'Gaza', ar: 'غزة' },
  { id: 'nablus', emoji: '🏙️', en: 'Nablus', ar: 'نابلس' },
  { id: 'hebron', emoji: '🕌', en: 'Hebron', ar: 'الخليل' },
  { id: 'jenin', emoji: '🕊️', en: 'Jenin', ar: 'جنين' },
  { id: 'tulkarim', emoji: '🌾', en: 'Tulkarm', ar: 'طولكرم' },
  { id: 'ramallah', emoji: '🏙️', en: 'Ramallah', ar: 'رام الله' },
  { id: 'bethlehem', emoji: '⛪', en: 'Bethlehem', ar: 'بيت لحم' },
  { id: 'jaffa', emoji: '🌊', en: 'Jaffa', ar: 'يافا' },
  { id: 'haifa', emoji: '🏔️', en: 'Haifa', ar: 'حيفا' },
  { id: 'safad', emoji: '⛰️', en: 'Safad', ar: 'صفد' },
  { id: 'qalqilya', emoji: '🌿', en: 'Qalqilya', ar: 'قلقيلية' },
  { id: 'tubas', emoji: '🏜️', en: 'Tubas', ar: 'طوباس' },
];

const INDIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇮🇳', en: 'All Indian', ar: 'كل المطبخ الهندي' },
  { id: 'pan_indian', emoji: '🥘', en: 'General Indian', ar: 'عام (كل الهند)' },
  { id: 'asian_shared', emoji: '🌏', en: 'South Asian Shared', ar: 'آسيوي مشترك' },
  { id: 'punjab', emoji: '🌾', en: 'Punjab', ar: 'البنجاب' },
  { id: 'delhi', emoji: '🏛️', en: 'Delhi', ar: 'دلهي' },
  { id: 'lucknow', emoji: '🏺', en: 'Lucknow', ar: 'لكناو' },
  { id: 'tamil_nadu', emoji: '🛕', en: 'Tamil Nadu', ar: 'تاميل نادو' },
  { id: 'kerala', emoji: '🌴', en: 'Kerala', ar: 'كيرالا' },
  { id: 'karnataka', emoji: '🏞️', en: 'Karnataka', ar: 'كارناتاكا' },
  { id: 'hyderabad', emoji: '🕌', en: 'Hyderabad', ar: 'حيدر أباد' },
  { id: 'kashmir', emoji: '🏔️', en: 'Kashmir', ar: 'كشمير' },
  { id: 'rajasthan', emoji: '🏜️', en: 'Rajasthan', ar: 'راجستان' },
  { id: 'gujarat', emoji: '🦁', en: 'Gujarat', ar: 'غوجارات' },
  { id: 'maharashtra', emoji: '🗿', en: 'Maharashtra', ar: 'مهاراشترا' },
  { id: 'goa', emoji: '🏖️', en: 'Goa', ar: 'غوا' },
  { id: 'bengal', emoji: '🐟', en: 'Bengal', ar: 'البنغال' },
  { id: 'bihar', emoji: '🌅', en: 'Bihar', ar: 'بيهار' },
];

const PAKISTANI_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇵🇰', en: 'All Pakistani', ar: 'كل المطبخ الباكستاني' },
  { id: 'pan_pakistani', emoji: '🥘', en: 'General Pakistani', ar: 'عام (كل باكستان)' },
  { id: 'asian_shared', emoji: '🌏', en: 'South Asian Shared', ar: 'آسيوي مشترك' },
  { id: 'punjab', emoji: '🌾', en: 'Punjab', ar: 'البنجاب' },
  { id: 'sindh', emoji: '🏝️', en: 'Sindh', ar: 'السند' },
  { id: 'kpk', emoji: '🗻', en: 'Khyber Pakhtunkhwa', ar: 'خيبر بختونخوا' },
  { id: 'balochistan', emoji: '🏜️', en: 'Balochistan', ar: 'بلوشستان' },
  { id: 'gilgit_baltistan', emoji: '🏔️', en: 'Gilgit-Baltistan', ar: 'جلجت بلتستان' },
];

const INDONESIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇮🇩', en: 'All Indonesian', ar: 'كل المطبخ الإندونيسي' },
  { id: 'pan_indonesian', emoji: '🥘', en: 'General Indonesian', ar: 'عام (كل إندونيسيا)' },
  { id: 'asian_shared', emoji: '🌏', en: 'Southeast Asian Shared', ar: 'آسيوي مشترك' },
  { id: 'java', emoji: '🌋', en: 'Java', ar: 'جاوة' },
  { id: 'sumatra', emoji: '🌶️', en: 'Sumatra', ar: 'سومطرة' },
  { id: 'bali', emoji: '🏝️', en: 'Bali', ar: 'بالي' },
  { id: 'sulawesi', emoji: '🐟', en: 'Sulawesi', ar: 'سولاويسي' },
];

const MALAYSIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇲🇾', en: 'All Malaysian', ar: 'كل المطبخ الماليزي' },
  { id: 'pan_malaysian', emoji: '🥘', en: 'General Malaysian', ar: 'عام (كل ماليزيا)' },
  { id: 'asian_shared', emoji: '🌏', en: 'Southeast Asian Shared', ar: 'آسيوي مشترك' },
  { id: 'peninsular_malaysia', emoji: '🌴', en: 'Peninsular Malaysia', ar: 'شبه الجزيرة الماليزية' },
  { id: 'borneo', emoji: '🏝️', en: 'Malaysian Borneo', ar: 'بورنيو الماليزية' },
];

const NIGERIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇳🇬', en: 'All Nigerian', ar: 'كل المطبخ النيجيري' },
  { id: 'pan_nigerian', emoji: '🥘', en: 'General Nigerian', ar: 'عام (كل نيجيريا)' },
  { id: 'african_shared', emoji: '🌍', en: 'West African Shared', ar: 'أفريقي مشترك' },
  { id: 'hausa', emoji: '🏜️', en: 'Hausa (North)', ar: 'الهوسا (الشمال)' },
  { id: 'yoruba', emoji: '🥁', en: 'Yoruba (Southwest)', ar: 'اليوروبا (الجنوب الغربي)' },
  { id: 'igbo', emoji: '🛶', en: 'Igbo (Southeast)', ar: 'الإيغبو (الجنوب الشرقي)' },
  { id: 'efik_calabar', emoji: '🐟', en: 'Efik Calabar (South-south)', ar: 'إفيك كالابار (جنوب الجنوب)' },
  { id: 'niger_delta', emoji: '🌊', en: 'Niger Delta', ar: 'دلتا النيجر' },
];

const ETHIOPIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇪🇹', en: 'All Ethiopian', ar: 'كل المطبخ الإثيوبي' },
  { id: 'pan_ethiopian', emoji: '🥘', en: 'General Ethiopian', ar: 'عام (كل إثيوبيا)' },
  { id: 'african_shared', emoji: '🌍', en: 'East African Shared', ar: 'أفريقي شرقي مشترك' },
  { id: 'amhara', emoji: '🏔️', en: 'Amhara (Highlands)', ar: 'الأمهرة (المرتفعات)' },
  { id: 'addis_ababa', emoji: '🏙️', en: 'Addis Ababa', ar: 'أديس أبابا' },
  { id: 'oromia', emoji: '🌿', en: 'Oromia', ar: 'أوروميا' },
  { id: 'tigray', emoji: '⛰️', en: 'Tigray (North)', ar: 'تيغراي (الشمال)' },
  { id: 'sidama', emoji: '☕', en: 'Sidama', ar: 'سيداما' },
  { id: 'afar', emoji: '🌋', en: 'Afar (Depression)', ar: 'عفار (المنخفض)' },
];

const KENYAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇰🇪', en: 'All Kenyan', ar: 'كل المطبخ الكيني' },
  { id: 'pan_kenyan', emoji: '🥘', en: 'General Kenyan', ar: 'عام (كل كينيا)' },
  { id: 'african_shared', emoji: '🌍', en: 'East African Shared', ar: 'أفريقي شرقي مشترك' },
  { id: 'nairobi', emoji: '🏙️', en: 'Nairobi', ar: 'نيروبي' },
  { id: 'mombasa', emoji: '🏖️', en: 'Mombasa', ar: 'مومباسا' },
  { id: 'kisumu', emoji: '🌊', en: 'Kisumu', ar: 'كيسومو' },
  { id: 'nakuru', emoji: '🏔️', en: 'Nakuru', ar: 'ناكورو' },
   { id: 'nyeri', emoji: '🌿', en: 'Nyeri', ar: 'نيري' },
 ];

const SOUTH_AFRICAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇿🇦', en: 'All South African', ar: 'كل المطبخ الجنوب أفريقي' },
  { id: 'pan_south_african', emoji: '🥘', en: 'General South African', ar: 'عام (كل جنوب أفريقيا)' },
  { id: 'african_shared', emoji: '🌍', en: 'African Shared', ar: 'أفريقي مشترك' },
  { id: 'cape_town', emoji: '🏙️', en: 'Cape Town', ar: 'كيب تاون' },
  { id: 'johannesburg', emoji: '🏜️', en: 'Johannesburg', ar: 'جوهانسبرغ' },
  { id: 'durban', emoji: '🏖️', en: 'Durban', ar: 'ديربان' },
  { id: 'pretoria', emoji: '🏛️', en: 'Pretoria', ar: 'بريتوريا' },
  { id: 'port_elizabeth', emoji: '🌊', en: 'Port Elizabeth', ar: 'بورت إليزابيث' },
];

const GHANAIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇬🇭', en: 'All Ghanaian', ar: 'كل المطبخ الغاني' },
  { id: 'pan_ghanaian', emoji: '🥘', en: 'General Ghanaian', ar: 'عام (كل غانا)' },
  { id: 'african_shared', emoji: '🌍', en: 'African Shared', ar: 'أفريقي مشترك' },
  { id: 'accra', emoji: '🏙️', en: 'Accra', ar: 'أكرا' },
  { id: 'kumasi', emoji: '🌿', en: 'Kumasi', ar: 'كوماسي' },
  { id: 'tamale', emoji: '🏜️', en: 'Tamale', ar: 'تامالي' },
];

 const RWANDAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇷🇼', en: 'All Rwandan', ar: 'كل المطبخ الرواندي' },
  { id: 'pan_rwandan', emoji: '🥘', en: 'General Rwandan', ar: 'عام (كل رواندا)' },
  { id: 'african_shared', emoji: '🌍', en: 'East African Shared', ar: 'أفريقي شرقي مشترك' },
  { id: 'kigali', emoji: '🏙️', en: 'Kigali', ar: 'كيغالي' },
  { id: 'butare', emoji: '🏛️', en: 'Butare (Huye)', ar: 'بوتاري (هويي)' },
  { id: 'musanze', emoji: '🌋', en: 'Musanze', ar: 'موسانزي' },
  { id: 'rwamagana', emoji: '🌾', en: 'Rwamagana', ar: 'رواماغانا' },
  { id: 'gisenyi', emoji: '🌊', en: 'Gisenyi (Rubavu)', ar: 'غيسيني (روبافو)' },
];

 const SEYCHELLOIS_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇸🇨', en: 'All Seychellois', ar: 'كل المطبخ السيشيلي' },
  { id: 'pan_seychellois', emoji: '🥘', en: 'General Seychellois', ar: 'عام (كل سيشل)' },
  { id: 'african_shared', emoji: '🌍', en: 'African / Indian Ocean Shared', ar: 'أفريقي ومحيط هندي مشترك' },
  { id: 'mahe', emoji: '🏝️', en: 'Mahe', ar: 'ماهي' },
  { id: 'praslin', emoji: '🪸', en: 'Praslin', ar: 'براسلين' },
  { id: 'la_digue', emoji: '🌊', en: 'La Digue', ar: 'لا ديغ' },
  { id: 'outer_islands', emoji: '⛵', en: 'Outer Islands', ar: 'الجزر الخارجية' },
];

 const MAURITIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇲🇺', en: 'All Mauritian', ar: 'كل المطبخ الموريشوسي' },
  { id: 'pan_mauritian', emoji: '🥘', en: 'General Mauritian', ar: 'عام (كل موريشيوس)' },
  { id: 'african_shared', emoji: '🌍', en: 'African / Indian Ocean Shared', ar: 'أفريقي ومحيط هندي مشترك' },
  { id: 'port_louis', emoji: '🏙️', en: 'Port Louis', ar: 'بورت لويس' },
  { id: 'curepipe', emoji: '⛪', en: 'Curepipe', ar: 'كوريبي' },
  { id: 'quatre_bornes', emoji: '🏘️', en: 'Quatre Bornes', ar: 'كواتر بورن' },
  { id: 'vacoas', emoji: '🌊', en: 'Vacoas', ar: 'فاكواس' },
  { id: 'mahebourg', emoji: '⛵', en: 'Mahebourg', ar: 'مهيبورغ' },
  { id: 'flacq', emoji: '🌾', en: 'Flacq', ar: 'فلاك' },
];

 const GABONESE_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇬🇦', en: 'All Gabonese', ar: 'كل المطبخ الغابوني' },
  { id: 'pan_gabonese', emoji: '🥘', en: 'General Gabonese', ar: 'عام (كل غابون)' },
  { id: 'african_shared', emoji: '🌍', en: 'Central African Shared', ar: 'أفريقي مشترك (وسط أفريقيا)' },
  { id: 'libreville', emoji: '🏙️', en: 'Libreville', ar: 'ليبرفيل' },
  { id: 'port_gentil', emoji: '⚓', en: 'Port-Gentil', ar: 'بورت جنديل' },
  { id: 'franceville', emoji: '🌳', en: 'Franceville', ar: 'فرانسفيل' },
  { id: 'lambarene', emoji: '🛶', en: 'Lambaréné', ar: 'لامبارينيه' },
  { id: 'oyem', emoji: '🌋', en: 'Oyem', ar: 'وييم' },
  { id: 'moanda', emoji: '⚙️', en: 'Moanda', ar: 'مواندا' },
  { id: 'mayumba', emoji: '🏖️', en: 'Mayumba', ar: 'مايومبا' },
];

 const BOTSWANAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇧🇼', en: 'All Botswanan', ar: 'كل المطبخ البوتسواناوي' },
  { id: 'pan_botswanan', emoji: '🥘', en: 'General Botswanan', ar: 'عام (كل بوتسوانا)' },
  { id: 'african_shared', emoji: '🌍', en: 'Southern African Shared', ar: 'أفريقي مشترك (الجنوب الأفريقي)' },
  { id: 'gaborone', emoji: '🏙️', en: 'Gaborone', ar: 'غابورون' },
  { id: 'francistown', emoji: '⚓', en: 'Francistown', ar: 'فرانسيستاون' },
  { id: 'maun', emoji: '🌊', en: 'Maun', ar: 'ماون' },
  { id: 'serowe', emoji: '🌳', en: 'Serowe', ar: 'سيروي' },
  { id: 'molepoloni', emoji: '🏘️', en: 'Molepololi', ar: 'موليبولولي' },
  { id: 'palapye', emoji: '🌾', en: 'Palapye', ar: 'بلاپاي' },
  { id: 'kanye', emoji: '⛰️', en: 'Kanye', ar: 'كني' },
  { id: 'jwaneng', emoji: '💎', en: 'Jwaneng', ar: 'جوانينغ' },
];

 const FILIPINO_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇵🇭', en: 'All Filipino', ar: 'كل المطبخ الفلبيني' },
  { id: 'pan_filipino', emoji: '🥘', en: 'General Filipino', ar: 'عام (كل الفلبين)' },
  { id: 'asian_shared', emoji: '🌏', en: 'Asian Shared', ar: 'آسيوي مشترك' },
  { id: 'manila', emoji: '🏙️', en: 'Manila', ar: 'مانيلا' },
  { id: 'cebu', emoji: '⛵', en: 'Cebu', ar: 'سيبو' },
  { id: 'davao', emoji: '🥭', en: 'Davao', ar: 'داڤو' },
  { id: 'iloilo', emoji: '🍲', en: 'Iloilo', ar: 'إيلويلو' },
  { id: 'bacolod', emoji: '🍗', en: 'Bacolod', ar: 'باكولود' },
  { id: 'baguio', emoji: '🥟', en: 'Baguio', ar: 'باغيو' },
  { id: 'cagayan_de_oro', emoji: '🐟', en: 'Cagayan de Oro', ar: 'كاغايان دي أورو' },
  { id: 'zamboanga', emoji: '🌶️', en: 'Zamboanga', ar: 'زامبوانغا' },
  { id: 'bicol', emoji: '🌶️', en: 'Bicol', ar: 'بيكول' },
];

 const THAI_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇹🇭', en: 'All Thai', ar: 'كل المطبخ التايلندي' },
  { id: 'pan_thai', emoji: '🥘', en: 'General Thai', ar: 'عام (كل تايلاند)' },
  { id: 'asian_shared', emoji: '🌏', en: 'Asian Shared', ar: 'آسيوي مشترك' },
  { id: 'bangkok', emoji: '🏙️', en: 'Bangkok', ar: 'بانكوك' },
  { id: 'chiang_mai', emoji: '⛰️', en: 'Chiang Mai', ar: 'تشيانغ ماي' },
  { id: 'isan', emoji: '🌾', en: 'Isan', ar: 'إيسان' },
  { id: 'hua_hin', emoji: '🌊', en: 'Hua Hin', ar: 'هوا هين' },
  { id: 'pattaya', emoji: '🏖️', en: 'Pattaya', ar: 'باتايا' },
  { id: 'phuket', emoji: '🏝️', en: 'Phuket', ar: 'فوكيت' },
  { id: 'songkhla', emoji: '🦐', en: 'Songkhla', ar: 'سونغكلا' },
  { id: 'krabi', emoji: '🪨', en: 'Krabi', ar: 'كرابي' },
];

 const VIETNAMESE_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇻🇳', en: 'All Vietnamese', ar: 'كل المطبخ الفيتنامي' },
  { id: 'pan_vietnamese', emoji: '🥘', en: 'General Vietnamese', ar: 'عام (كل فيتنام)' },
  { id: 'asian_shared', emoji: '🌏', en: 'Asian Shared', ar: 'آسيوي مشترك' },
];

 const CHINESE_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇨🇳', en: 'All Chinese', ar: 'كل المطبخ الصيني' },
{ id: 'pan_chinese', emoji: '🥘', en: 'General Chinese', ar: 'عام (كل الصين)' },
  { id: 'asian_shared', emoji: '🌏', en: 'Asian Shared', ar: 'آسيوي مشترك' },
];

 const JAPANESE_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇯🇵', en: 'All Japanese', ar: 'كل المطبخ الياباني' },
  { id: 'pan_japanese', emoji: '🥘', en: 'General Japanese', ar: 'عام (كل اليابان)' },
  { id: 'asian_shared', emoji: '🌏', en: 'Asian Shared', ar: 'آسيوي مشترك' },
  { id: 'tokyo', emoji: '🏙️', en: 'Tokyo', ar: 'طوكيو' },
  { id: 'osaka', emoji: '🏮', en: 'Osaka', ar: 'أوساكا' },
  { id: 'kyoto', emoji: '⛩️', en: 'Kyoto', ar: 'كيوتو' },
  { id: 'hokkaido', emoji: '❄️', en: 'Hokkaido', ar: 'هوكايدو' },
  { id: 'fukuoka', emoji: '🏮', en: 'Fukuoka', ar: 'فوكوكا' },
  { id: 'sapporo', emoji: '⛄', en: 'Sapporo', ar: 'سابورو' },
  { id: 'sendai', emoji: '🌲', en: 'Sendai', ar: 'سنداي' },
  { id: 'nagoya', emoji: '🏯', en: 'Nagoya', ar: 'ناغويا' },
];

 const KOREAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇰🇷', en: 'All Korean', ar: 'كل المطبخ الكوري' },
  { id: 'pan_korean', emoji: '🥘', en: 'General Korean', ar: 'عام (كل كوريا)' },
  { id: 'seoul', emoji: '🏙️', en: 'Seoul', ar: 'سيول' },
  { id: 'busan', emoji: '🌊', en: 'Busan', ar: 'بوسان' },
  { id: 'jeju', emoji: '🍊', en: 'Jeju', ar: 'جيجو' },
  { id: 'jeonju', emoji: '🏛️', en: 'Jeonju', ar: 'جونسو' },
  { id: 'goryeong', emoji: '🌾', en: 'Goryeong', ar: 'غوريونغ' },
  { id: 'gangneung', emoji: '⛵', en: 'Gangneung', ar: 'غانغnung' },
  { id: 'boseong', emoji: '🍵', en: 'Boseong', ar: 'بوسونغ' },
];

 const TAIWANESE_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇹🇼', en: 'All Taiwanese', ar: 'كل المطبخ التايواني' },
  { id: 'pan_taiwanese', emoji: '🥘', en: 'General Taiwanese', ar: 'عام (كل تايوان)' },
  { id: 'taipei', emoji: '🏙️', en: 'Taipei', ar: 'تايبيه' },
  { id: 'tainan', emoji: '🏛️', en: 'Tainan', ar: 'تاينان' },
  { id: 'taichung', emoji: '🌆', en: 'Taichung', ar: 'تايتشونغ' },
  { id: 'kaohsiung', emoji: '⚓', en: 'Kaohsiung', ar: 'كاوهسيونغ' },
  { id: 'hsinchu', emoji: '💻', en: 'Hsinchu', ar: 'شينشو' },
  { id: 'hualien', emoji: '🏔️', en: 'Hualien', ar: 'هوالين' },
  { id: 'taitung', emoji: '🌾', en: 'Taitung', ar: 'تايتونغ' },
  { id: 'keelung', emoji: '⛵', en: 'Keelung', ar: 'كييلونغ' },
  { id: 'chiayi', emoji: '🍈', en: 'Chiayi', ar: 'تشيايي' },
  { id: 'nantou', emoji: '🍵', en: 'Nantou', ar: 'نانتاو' },
  { id: 'yilan', emoji: '🌊', en: 'Yilan', ar: 'يلان' },
  { id: 'pingtung', emoji: '🥭', en: 'Pingtung', ar: 'بينغتونغ' },
];

const AMERICAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇺🇸', en: 'All American', ar: 'كل المطبخ الأمريكي' },
  { id: 'pan_american', emoji: '🥘', en: 'General American', ar: 'عام (كل أمريكا)' },
  { id: 'new_england', emoji: '🦞', en: 'New England', ar: 'نيو إنجلاند' },
  { id: 'mid_atlantic', emoji: '🗽', en: 'Mid-Atlantic', ar: 'المحيط الأوسط' },
  { id: 'south', emoji: '🍗', en: 'Southern', ar: 'الجنوب' },
  { id: 'deep_south', emoji: '🌽', en: 'Deep South', ar: 'الجنوب العميق' },
  { id: 'cajun', emoji: '🫕', en: 'Cajun', ar: 'كاجون' },
  { id: 'texas', emoji: '🤠', en: 'Texas', ar: 'تكساس' },
  { id: 'southwest', emoji: '🌵', en: 'Southwest', ar: 'الجنوب الغربي' },
  { id: 'california', emoji: '🥑', en: 'California', ar: 'كاليفورنيا' },
  { id: 'pacific_northwest', emoji: '🌲', en: 'Pacific Northwest', ar: 'المحيط الهادئ الشمالي' },
  { id: 'midwest', emoji: '🌾', en: 'Midwest', ar: 'وسط الغرب' },
  { id: 'hawaii', emoji: '🌺', en: 'Hawaii', ar: 'هاواي' },
  { id: 'alaska', emoji: '🐟', en: 'Alaska', ar: 'ألاسكا' },
  { id: 'soul_food', emoji: '🍞', en: 'Soul Food', ar: 'طعام الروح' },
  { id: 'bbq', emoji: '🔥', en: 'BBQ', ar: 'الشواء' },
  { id: 'native_american', emoji: '🪶', en: 'Native American', ar: 'الأصليون الأمريكيون' },
];

const CANADIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇨🇦', en: 'All Canadian', ar: 'كل المطبخ الكندي' },
  { id: 'pan_canadian', emoji: '🥘', en: 'General Canadian', ar: 'عام (كل كندا)' },
  { id: 'quebec', emoji: '🍁', en: 'Quebec', ar: 'كيبيك' },
  { id: 'ontario', emoji: '🏙️', en: 'Ontario', ar: 'أونتاريو' },
  { id: 'british_columbia', emoji: '🏔️', en: 'British Columbia', ar: 'كولومبيا البريطانية' },
  { id: 'prairies', emoji: '🌾', en: 'Prairies', ar: 'البراري' },
  { id: 'atlantic_canada', emoji: '🌊', en: 'Atlantic Canada', ar: 'كندا الأطلسية' },
  { id: 'northern_canada', emoji: '❄️', en: 'Northern Canada', ar: 'شمال كندا' },
  { id: 'indigenous_canada', emoji: '🪶', en: 'Indigenous Canada', ar: 'كندا للسكان الأصليين' },
];

const AUSTRALASIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🌏', en: 'All Australasian', ar: 'كل مطبخ أستراليا ونيوزيلندا' },
  { id: 'pan_australasian', emoji: '🥘', en: 'General Australasian', ar: 'عام (أستراليا ونيوزيلندا)' },
  { id: 'nsw', emoji: '🌉', en: 'New South Wales', ar: 'نيو ساوث ويلز' },
  { id: 'victoria', emoji: '🏙️', en: 'Victoria', ar: 'فيكتوريا' },
  { id: 'queensland', emoji: '🌴', en: 'Queensland', ar: 'كوينزلاند' },
  { id: 'western_australia', emoji: '🌅', en: 'Western Australia', ar: 'أستراليا الغربية' },
  { id: 'south_australia', emoji: '🍇', en: 'South Australia', ar: 'أستراليا الجنوبية' },
  { id: 'tasmania', emoji: '🦞', en: 'Tasmania', ar: 'تسمانيا' },
  { id: 'northern_territory', emoji: '🪨', en: 'Northern Territory', ar: 'الإقليم الشمالي' },
  { id: 'auckland', emoji: '⛵', en: 'Auckland', ar: 'أوكلاند' },
  { id: 'wellington', emoji: '🌬️', en: 'Wellington', ar: 'ويلينغتون' },
  { id: 'canterbury', emoji: '🏔️', en: 'Canterbury', ar: 'كانتربري' },
  { id: 'otago', emoji: '🌿', en: 'Otago', ar: 'أوتاغو' },
  { id: 'maori', emoji: '🪶', en: 'Māori', ar: 'ماوري' },
];

const BRITISH_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇬🇧', en: 'All British', ar: 'كل المطبخ البريطاني' },
  { id: 'pan_british', emoji: '🥘', en: 'General British', ar: 'عام (كل بريطانيا)' },
  { id: 'london', emoji: '🌉', en: 'London', ar: 'لندن' },
  { id: 'south_east', emoji: '🏛️', en: 'South East', ar: 'الجنوب الشرقي' },
  { id: 'south_west', emoji: '🌊', en: 'South West', ar: 'الجنوب الغربي' },
  { id: 'east_anglia', emoji: '⛵', en: 'East Anglia', ar: 'أنغليا الشرقية' },
  { id: 'midlands', emoji: '🏙️', en: 'Midlands', ar: 'الميدلاندز' },
  { id: 'north_west', emoji: '🏔️', en: 'North West', ar: 'الشمال الغربي' },
  { id: 'yorkshire', emoji: '🏞️', en: 'Yorkshire', ar: 'يوركشاير' },
  { id: 'north_east', emoji: '⛰️', en: 'North East', ar: 'الشمال الشرقي' },
  { id: 'lowlands', emoji: '🌾', en: 'Lowlands', ar: 'الأراضي المنخفضة' },
  { id: 'highlands', emoji: '🏔️', en: 'Highlands', ar: 'المرتفعات' },
  { id: 'wales', emoji: '🐉', en: 'Wales', ar: 'ويلز' },
  { id: 'ulster', emoji: '🍀', en: 'Ulster', ar: 'ألستر' },
];

// Germany's 13 anchors: pan_german plus the 12 Laender that carry their own
// demonym (bavarian, Berliner, Hamburgisch, ...). asian_shared stays 0.
const GERMAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇩🇪', en: 'All German', ar: 'كل المطبخ الألماني' },
  { id: 'pan_german', emoji: '🥘', en: 'General German', ar: 'عام (كل ألمانيا)' },
  { id: 'bavaria', emoji: '🍺', en: 'Bavaria', ar: 'بافاريا' },
  { id: 'berlin', emoji: '🧱', en: 'Berlin', ar: 'برلين' },
  { id: 'hamburg', emoji: '🏴', en: 'Hamburg', ar: 'هامبورغ' },
  { id: 'hesse', emoji: '🍷', en: 'Hesse', ar: 'هيسه' },
  { id: 'rhineland', emoji: '🏰', en: 'Rhineland', ar: 'راينلاند' },
  { id: 'saxony', emoji: '🎼', en: 'Saxony', ar: 'ساكسونيا' },
  { id: 'lower_saxony', emoji: '🌾', en: 'Lower Saxony', ar: 'ساكسونيا السفلى' },
  { id: 'thuringia', emoji: '🎄', en: 'Thuringia', ar: 'تورينغيا' },
  { id: 'brandenburg', emoji: '🏛️', en: 'Brandenburg', ar: 'براندنبورغ' },
  { id: 'baden_wurttemberg', emoji: '🚗', en: 'Baden-Württemberg', ar: 'بادن فورتمبيرغ' },
  { id: 'saarland', emoji: '⛏️', en: 'Saarland', ar: 'سارلاند' },
  { id: 'bremen', emoji: '⚓', en: 'Bremen', ar: 'بريمن' },
];

const AUSTRIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇦🇹', en: 'All Austrian', ar: 'كل المطبخ النمساوي' },
  { id: 'pan_austrian', emoji: '🥘', en: 'General Austrian', ar: 'عام (كل النمسا)' },
  { id: 'vienna', emoji: '🏙️', en: 'Vienna', ar: 'فيينا' },
  { id: 'tyrol', emoji: '🏔️', en: 'Tyrol', ar: 'تيرول' },
  { id: 'salzburg', emoji: '🎼', en: 'Salzburg', ar: 'سالزبورغ' },
  { id: 'styria', emoji: '🌲', en: 'Styria', ar: 'شتايرمارك' },
  { id: 'carinthia', emoji: '🏞️', en: 'Carinthia', ar: 'كارينثيا' },
  { id: 'upper_austria', emoji: '🌾', en: 'Upper Austria', ar: 'النمسا العليا' },
  { id: 'lower_austria', emoji: '🏰', en: 'Lower Austria', ar: 'النمسا السفلى' },
  { id: 'burgenland', emoji: '🍇', en: 'Burgenland', ar: 'بورغنلاند' },
  { id: 'vorarlberg', emoji: '⛷️', en: 'Vorarlberg', ar: 'فورارلبرغ' },
];

const FRENCH_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇫🇷', en: 'All French', ar: 'كل المطبخ الفرنسي' },
  { id: 'pan_french', emoji: '🥘', en: 'General French', ar: 'عام (كل فرنسا)' },
  { id: 'paris', emoji: '🗼', en: 'Paris', ar: 'باريس' },
  { id: 'normandy', emoji: '🌊', en: 'Normandy', ar: 'نورماندي' },
  { id: 'provence', emoji: '🌿', en: 'Provence', ar: 'بروفانس' },
  { id: 'lyon', emoji: '🍽️', en: 'Lyon', ar: 'ليون' },
  { id: 'bordeaux', emoji: '🍷', en: 'Bordeaux', ar: 'بوردو' },
  { id: 'alsace', emoji: '🥨', en: 'Alsace', ar: 'الألزاس' },
  { id: 'brittany', emoji: '⚓', en: 'Brittany', ar: 'بريتاني' },
  { id: 'burgundy', emoji: '🍇', en: 'Burgundy', ar: 'بورغونيا' },
  { id: 'toulouse', emoji: '🪿', en: 'Toulouse', ar: 'تولوز' },
  { id: 'marseille', emoji: '⛵', en: 'Marseille', ar: 'مرسيليا' },
  { id: 'loire', emoji: '🏰', en: 'Loire', ar: 'لوار' },
  { id: 'corsica', emoji: '🏝️', en: 'Corsica', ar: 'كورسيكا' },
];

// Benelux's 13 anchors: pan_benelux plus the 12 sub-regions that carry their own
// demonym (Brussels, Flanders, ..., Ardennes). asian_shared stays 0.
const BENELUX_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇧🇪', en: 'All Benelux', ar: 'كل مطبخ البنيلوكس' },
  { id: 'pan_benelux', emoji: '🥘', en: 'General Benelux', ar: 'عام (كل البنيلوكس)' },
  { id: 'brussels', emoji: '🏙️', en: 'Brussels', ar: 'بروكسل' },
  { id: 'flanders', emoji: '🦁', en: 'Flanders', ar: 'فلاندرز' },
  { id: 'wallonia', emoji: '🐓', en: 'Wallonia', ar: 'والونيا' },
  { id: 'antwerp', emoji: '💎', en: 'Antwerp', ar: 'أنتويرب' },
  { id: 'amsterdam', emoji: '🚲', en: 'Amsterdam', ar: 'أمستردام' },
  { id: 'rotterdam', emoji: '⚓', en: 'Rotterdam', ar: 'روتردام' },
  { id: 'hague', emoji: '⚖️', en: 'The Hague', ar: 'لاهاي' },
  { id: 'utrecht', emoji: '⛪', en: 'Utrecht', ar: 'أوتريخت' },
  { id: 'holland_north', emoji: '🌷', en: 'North Holland', ar: 'هولندا الشمالية' },
  { id: 'luxembourg_city', emoji: '🏰', en: 'Luxembourg City', ar: 'مدينة لوكسمبورغ' },
  { id: 'luxembourg_south', emoji: '🍇', en: 'South Luxembourg', ar: 'جنوب لوكسمبورغ' },
  { id: 'ardennes', emoji: '🌲', en: 'Ardennes', ar: 'الأردين' },
];

// Italy's 13 anchors: pan_italian plus the 12 regions that carry their own
// demonym (Rome, Milan, Naples, ...). asian_shared stays 0.
const ITALIAN_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇮🇹', en: 'All Italian', ar: 'كل المطبخ الإيطالي' },
  { id: 'pan_italian', emoji: '🥘', en: 'General Italian', ar: 'عام (كل إيطاليا)' },
  { id: 'rome', emoji: '🏛️', en: 'Rome', ar: 'روما' },
  { id: 'milan', emoji: '👗', en: 'Milan', ar: 'ميلانو' },
  { id: 'naples', emoji: '🍕', en: 'Naples', ar: 'نابولي' },
  { id: 'sicily', emoji: '🍋', en: 'Sicily', ar: 'صقلية' },
  { id: 'tuscany', emoji: '🌻', en: 'Tuscany', ar: 'توسكانا' },
  { id: 'venice', emoji: '🛶', en: 'Venice', ar: 'البندقية' },
  { id: 'florence', emoji: '🎨', en: 'Florence', ar: 'فلورنسا' },
  { id: 'bologna', emoji: '🍝', en: 'Bologna', ar: 'بولونيا' },
  { id: 'turin', emoji: '🍫', en: 'Turin', ar: 'تورينو' },
  { id: 'genoa', emoji: '⚓', en: 'Genoa', ar: 'جنوة' },
  { id: 'sardinia', emoji: '🏝️', en: 'Sardinia', ar: 'سردينيا' },
  { id: 'puglia', emoji: '🫒', en: 'Puglia', ar: 'بوليا' },
];

// Spain's 13 anchors: pan_spanish plus the 12 regions that carry their own
// demonym (Madrid, Barcelona, Valencia, ...). asian_shared stays 0.
const SPANISH_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇪🇸', en: 'All Spanish', ar: 'كل المطبخ الإسباني' },
  { id: 'pan_spanish', emoji: '🥘', en: 'General Spanish', ar: 'عام (كل إسبانيا)' },
  { id: 'madrid', emoji: '🏙️', en: 'Madrid', ar: 'مدريد' },
  { id: 'barcelona', emoji: '🏗️', en: 'Barcelona', ar: 'برشلونة' },
  { id: 'valencia', emoji: '🍊', en: 'Valencia', ar: 'فالنسيا' },
  { id: 'seville', emoji: '💃', en: 'Seville', ar: 'إشبيلية' },
  { id: 'basque', emoji: '⛰️', en: 'Basque Country', ar: 'الباسك' },
  { id: 'galicia', emoji: '🐙', en: 'Galicia', ar: 'غاليسيا' },
  { id: 'andalusia', emoji: '🌴', en: 'Andalusia', ar: 'الأندلس' },
  { id: 'castile', emoji: '🏰', en: 'Castile', ar: 'قشتالة' },
  { id: 'aragon', emoji: '🥁', en: 'Aragon', ar: 'أراغون' },
  { id: 'catalonia', emoji: '🎭', en: 'Catalonia', ar: 'كتالونيا' },
  { id: 'canary_islands', emoji: '🌋', en: 'Canary Islands', ar: 'جزر الكناري' },
  { id: 'balearic', emoji: '🏖️', en: 'Balearic Islands', ar: 'جزر البليار' },
];

// Greece's 11 anchors: pan_greek plus the 10 regions that carry their own
// demonym (Athens, Thessaloniki, Crete, ...). asian_shared stays 0.
const GREEK_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇬🇷', en: 'All Greek', ar: 'كل المطبخ اليوناني' },
  { id: 'pan_greek', emoji: '🥘', en: 'General Greek', ar: 'عام (كل اليونان)' },
  { id: 'athens', emoji: '🏛️', en: 'Athens', ar: 'أثينا' },
  { id: 'thessaloniki', emoji: '🌊', en: 'Thessaloniki', ar: 'سالونيك' },
  { id: 'crete', emoji: '🫒', en: 'Crete', ar: 'كريت' },
  { id: 'santorini', emoji: '🌅', en: 'Santorini', ar: 'سانتوريني' },
  { id: 'mykonos', emoji: '🎡', en: 'Mykonos', ar: 'ميكونوس' },
  { id: 'corfu', emoji: '🌿', en: 'Corfu', ar: 'كورفو' },
  { id: 'rhodes', emoji: '🏰', en: 'Rhodes', ar: 'رودس' },
  { id: 'peloponnese', emoji: '🍇', en: 'Peloponnese', ar: 'بيلوبونيز' },
  { id: 'epirus', emoji: '🧀', en: 'Epirus', ar: 'إبيروس' },
  { id: 'macedonia_gr', emoji: '🌻', en: 'Macedonia', ar: 'مقدونيا اليونانية' },
];

// Turkey's 16 anchors: pan_turkish plus the 15 regions that carry their own
// demonym (Istanbul, Ankara, Izmir, ...). asian_shared stays 0.
const TURKISH_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇹🇷', en: 'All Turkish', ar: 'كل المطبخ التركي' },
  { id: 'pan_turkish', emoji: '🥘', en: 'General Turkish', ar: 'عام (كل تركيا)' },
  { id: 'istanbul', emoji: '🌉', en: 'Istanbul', ar: 'إسطنبول' },
  { id: 'ankara', emoji: '🏛️', en: 'Ankara', ar: 'أنقرة' },
  { id: 'izmir', emoji: '🌊', en: 'Izmir', ar: 'إزمير' },
  { id: 'bursa', emoji: '🌳', en: 'Bursa', ar: 'بورصة' },
  { id: 'antalya', emoji: '🏖️', en: 'Antalya', ar: 'أنطاليا' },
  { id: 'gaziantep', emoji: '🍯', en: 'Gaziantep', ar: 'غازي عنتاب' },
  { id: 'konya', emoji: '🕌', en: 'Konya', ar: 'قونية' },
  { id: 'adana', emoji: '🌶️', en: 'Adana', ar: 'أضنة' },
  { id: 'trabzon', emoji: '⚓', en: 'Trabzon', ar: 'طرابزون' },
  { id: 'diyarbakir', emoji: '🏰', en: 'Diyarbakir', ar: 'ديار بكر' },
  { id: 'kayseri', emoji: '🥟', en: 'Kayseri', ar: 'قيصرية' },
  { id: 'mardin', emoji: '🪨', en: 'Mardin', ar: 'ماردين' },
  { id: 'sanliurfa', emoji: '🐟', en: 'Sanliurfa', ar: 'شانلي أورفة' },
  { id: 'van', emoji: '🐈', en: 'Van', ar: 'وان' },
  { id: 'eskisehir', emoji: '🎓', en: 'Eskisehir', ar: 'أسكي شهير' },
];

// Switzerland's 13 anchors: pan_swiss plus the 12 cantons that carry their own
// demonym (Zurich, Bern, Geneva, ...). asian_shared stays 0.
const SWISS_REGION_META: { id: string; emoji: string; en: string; ar: string }[] = [
  { id: 'all', emoji: '🇨🇭', en: 'All Swiss', ar: 'كل المطبخ السويسري' },
  { id: 'pan_swiss', emoji: '🥘', en: 'General Swiss', ar: 'عام (كل سويسرا)' },
  { id: 'zurich', emoji: '🏙️', en: 'Zurich', ar: 'زوريخ' },
  { id: 'bern', emoji: '🏔️', en: 'Bern', ar: 'برن' },
  { id: 'geneva', emoji: '⛵', en: 'Geneva', ar: 'جنيف' },
  { id: 'lucerne', emoji: '🌉', en: 'Lucerne', ar: 'لوسيرن' },
  { id: 'basel', emoji: '🎨', en: 'Basel', ar: 'بازل' },
  { id: 'lausanne', emoji: '🍷', en: 'Lausanne', ar: 'لوزان' },
  { id: 'ticino', emoji: '🗻', en: 'Ticino', ar: 'تيسينو' },
  { id: 'valais', emoji: '🏔️', en: 'Valais', ar: 'وادي الرون' },
  { id: 'grisons', emoji: '🏔️', en: 'Grisons', ar: 'غريسون' },
  { id: 'vaud', emoji: '🌾', en: 'Vaud', ar: 'فو' },
  { id: 'aargau', emoji: '🏰', en: 'Aargau', ar: 'أرغاو' },
  { id: 'st_gallen', emoji: '📚', en: 'St. Gallen', ar: 'سانت غالن' },
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

const OptionChip: React.FC<{ on: boolean; onClick: () => void; children: React.ReactNode; className?: string }> = ({ on, onClick, children, className }) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onClick}
    className={`flex min-h-[46px] items-center justify-center gap-1.5 rounded-[14px] border-2 px-3 py-2.5 text-[13px] font-bold transition-all active:scale-95 ${on ? 'border-[#0F4C3A] bg-[#0F4C3A] text-white shadow-[0_6px_14px_rgba(15,76,58,0.22)]' : 'border-[#EFEBE4] bg-white text-[#6B7A75] hover:border-[#D4A017]'} ${className ?? ''}`}
  >
    {children}
  </button>
);

const Stepper: React.FC<{ value: number; min: number; max: number; onChange: (v: number) => void; suffix?: string; step?: number }> = ({ value, min, max, onChange, suffix, step = 1 }) => (
  <div className="flex items-center gap-3 rounded-[14px] border-2 border-[#EFEBE4] bg-white p-2">
    <button
      type="button"
      aria-label="decrease"
      onClick={() => onChange(Math.max(min, value - step))}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F1EB] text-[#0F4C3A] transition-all active:scale-95 hover:border-[#D4A017]"
    >
      <Minus size={18} />
    </button>
    <span className="num flex-1 text-center text-[16px] font-black text-[#0F4C3A]">
      {value}
      {suffix ? <span className="mr-1 text-[12px] font-bold text-[#6B7A75]">{suffix}</span> : null}
    </span>
    <button
      type="button"
      aria-label="increase"
      onClick={() => onChange(Math.min(max, value + step))}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F1EB] text-[#0F4C3A] transition-all active:scale-95 hover:border-[#D4A017]"
    >
      <Plus size={18} />
    </button>
  </div>
);

const WizardFooter: React.FC<{ onBack: () => void; onNext: () => void; nextDisabled?: boolean; backLabel: string; nextLabel: string }> = ({ onBack, onNext, nextDisabled, backLabel, nextLabel }) => (
  <div className="flex gap-3">
    <button type="button" onClick={onBack} className="btn-secondary flex-1 h-[54px] rounded-[16px] text-[15px] font-bold">
      {backLabel}
    </button>
    <button type="button" onClick={onNext} disabled={nextDisabled} className="btn-primary flex-1 h-[54px] rounded-[16px] text-[15px] font-bold disabled:cursor-not-allowed disabled:opacity-40">
      {nextLabel}
    </button>
  </div>
);

const WeightLossPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const startWithHeroProfile = (location.state as { startWithHeroProfile?: boolean } | null)?.startWithHeroProfile === true;
  const { t, language } = useLanguage();
  const { profile, updateProfile, resetProfile } = useUserProfile();
  const { exercises: unifiedExercises, loading: unifiedExercisesLoading } = useUnifiedExercises();
  const kitchenLabel = (k: KitchenInfo) => {
    const translated = k.id === 'chilean' ? t('kitchen.chilean.name')
      : k.id === 'peruvian' ? t('kitchen.peruvian.name')
        : k.id === 'colombian' ? t('kitchen.colombian.name')
          : k.id === 'mexican' ? t('kitchen.mexican.name')
            : k.id === 'argentinian' ? t('kitchen.argentinian.name')
              : k.id === 'eastern-european' ? t('kitchen.eastern-european.name')
                : null;
    if (translated) return translated;
    if (language === 'ar') return k.kitchen || `مطبخ ${k.country}`;
    if (language === 'en') return k.kitchenEn || `${k.countryEn ?? k.country} Kitchen`;
    return getKitchenName(k, language) || k.kitchenEn || `${k.countryEn ?? k.country} Kitchen`;
  };
  const regionLabel = (region: RegionDef) =>
    region.translationKey ? t(region.translationKey) : language === 'ar' ? region.ar : region.en;
  const { user } = useAuth();
  const profileInitials = user?.name?.trim() && user.name !== 'Guest'
    ? user.name.trim().split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join('').toUpperCase()
    : 'HC';
  const [restoredDraft] = useState<WizardDraft | null>(() => startWithHeroProfile ? null : readWizardDraft());
  const [startedFromHero, setStartedFromHero] = useState(startWithHeroProfile || restoredDraft?.startedFromHero === true);
  const wizardCompletedRef = useRef(false);
  const [step, setStep] = useState<Step>(() => initialWizardStep(profile, restoredDraft));
  const [planType, setPlanType] = useState<PlanType>(() => restoredDraft?.planType ?? profile.planType ?? 'both');
  const [age, setAge] = useState<string>(() => restoredDraft?.age ?? (profile.age === null ? '' : String(profile.age)));
  const [sex, setSex] = useState<Sex>(() => restoredDraft?.sex ?? profile.gender ?? 'male');
  const [height, setHeight] = useState<string>(() => restoredDraft?.height ?? (profile.height === null ? '' : String(profile.height)));
  const [weight, setWeight] = useState<string>(() => restoredDraft?.weight ?? (profile.weight === null ? '' : String(profile.weight)));
  const [wizardGoal, setWizardGoal] = useState<WizardGoalSelection>(() => restoredDraft?.wizardGoal ?? initialWizardGoal(profile));
  const [goal, setGoal] = useState<GoalKey>(() => restoredDraft?.goal ?? profile.goal ?? WIZARD_GOAL_CALC[initialWizardGoal(profile)]);
  const [editingSavedProfile, setEditingSavedProfile] = useState(false);
  const [targetWeight, setTargetWeight] = useState(() => {
    if (restoredDraft?.targetWeight !== undefined) return restoredDraft.targetWeight;
    if (profile.targetWeight !== null) return String(profile.targetWeight);
    if (profile.weight === null) return '';
    if (initialWizardGoal(profile) === 'build_muscle') return String(profile.weight + 5);
    if (initialWizardGoal(profile) === 'lose_weight') return String(Math.max(30, profile.weight - 5));
    return String(profile.weight);
  });
  const [timeline, setTimeline] = useState(() => restoredDraft?.timeline ?? (profile.timelineWeeks === null ? '12' : String(profile.timelineWeeks)));
  const [selectedKitchenId, setSelectedKitchenId] = useState<string>(() => restoredDraft?.selectedKitchenId ?? profile.selectedKitchen ?? profile.kitchenPreference ?? 'egyptian');
  const [workout, setWorkout] = useState(() => restoredDraft?.workout ?? 'full_body');
  const [exerciseTypes, setExerciseTypes] = useState<string[]>(() => {
    if (Array.isArray(restoredDraft?.exerciseTypes)) return draftStringList(restoredDraft.exerciseTypes);
    const normalized = normalizeExerciseCategories(profile.exerciseTypes);
    return normalized.length ? normalized : ['cardio', 'strength'];
  });
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [selectedExerciseSearch, setSelectedExerciseSearch] = useState('');
  const getUnifiedExercisesByType = (typeId: WizardExerciseCategory) => unifiedExercises.filter((exercise) => exercise.type === typeId);
  const localizedExerciseName = (exercise: UnifiedExercise) =>
    language === 'ar' ? exercise.nameAr
      : language === 'fr' ? exercise.nameFr
        : language === 'es' ? exercise.nameEs
          : language === 'de' ? exercise.nameDe || exercise.nameEn
            : exercise.nameEn;
  const toPlannedShape = (exercise: UnifiedExercise): PlannedExercise => {
    const durationMinutes = Number(exercise.duration.match(/\d+/)?.[0]) || 10;
    const reps = exercise.reps !== undefined
      ? String(exercise.reps)
      : exercise.repsMin !== undefined && exercise.repsMax !== undefined
        ? `${exercise.repsMin}-${exercise.repsMax}`
        : exercise.timedDuration !== undefined
          ? `${exercise.timedDuration} sec`
          : exercise.timedDurationMin !== undefined && exercise.timedDurationMax !== undefined
            ? `${exercise.timedDurationMin}-${exercise.timedDurationMax} sec`
            : '';
    return {
      id: exercise.id,
      type: exercise.type,
      name: localizedExerciseName(exercise),
      sets: exercise.sets === null ? '' : String(exercise.sets),
      reps,
      dur: t('wizard.exerciseList.duration').replace(/^⏱\s*/, '').replace('{n}', String(durationMinutes)),
    };
  };
  const [plannedExercises, setPlannedExercises] = useState<PlannedExercise[]>(() => {
    const draftExercises = draftPlannedExercises(restoredDraft?.plannedExercises);
    if (draftExercises) return draftExercises;
    const saved = localStorage.getItem('hc_planned_exercises');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (Array.isArray(p)) {
          const migrated = p.flatMap((item: { id?: unknown }) => {
            if (typeof item?.id !== 'string') return [];
            const exercise = unifiedExercises.find((entry) => entry.id === item.id);
            return exercise ? [toPlannedShape(exercise)] : [];
          });
          if (migrated.length) return migrated;
        }
      } catch {
        /* ignore */
      }
    }
    return (['cardio', 'strength'] as const).flatMap((type) => getUnifiedExercisesByType(type).slice(0, 2).map(toPlannedShape));
  });
  const [kitchenSearch, setKitchenSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [kitchenMode, setKitchenMode] = useState<KitchenMode | null>(() => restoredDraft?.kitchenMode !== undefined ? restoredDraft.kitchenMode : profile.kitchenMode);
  const [kitchenSelectionAccepted, setKitchenSelectionAccepted] = useState(() => restoredDraft?.kitchenSelectionAccepted ?? false);
  const [categoryMode, setCategoryMode] = useState<'manual' | 'auto'>(() => restoredDraft?.categoryMode ?? 'manual');
  const [exerciseMode, setExerciseMode] = useState<'manual' | 'auto'>(() => restoredDraft?.exerciseMode ?? 'auto');
  const [step2Data, setStep2Data] = useState<{ activityLevel: ActivityKey; exerciseType: string | null; selectedExercises: string[] }>(() => draftStep2Data(restoredDraft?.step2Data, {
    activityLevel: profile.activityLevel ?? 'moderate',
    exerciseType: null,
    selectedExercises: [],
  }));
  const [autoBuildMode, setAutoBuildMode] = useState(false);
  const [mealTab, setMealTab] = useState<MealKey>('breakfast');
  const [openMealAccordion, setOpenMealAccordion] = useState<MealKey | null>(null);
  const [regionSel, setRegionSel] = useState<string | null>(() => restoredDraft?.regionSel !== undefined ? restoredDraft.regionSel : null);
  const [cuisineSel, setCuisineSel] = useState<string | null>(() => restoredDraft?.cuisineSel !== undefined ? restoredDraft.cuisineSel : null);
  const [kitchenRegion, setKitchenRegion] = useState<string>(() => restoredDraft?.kitchenRegion ?? 'all');
  const [activeCuisineRegion, setActiveCuisineRegion] = useState<CuisineRegionId>(() => restoredDraft?.activeCuisineRegion ?? cuisineRegionForKitchen(profile.selectedKitchen ?? profile.kitchenPreference ?? 'egyptian'));
  const cuisineRegionTabRefs = useRef<Partial<Record<CuisineRegionId, HTMLButtonElement | null>>>({});
  const [dishSearch, setDishSearch] = useState('');
  const [savedSearch, setSavedSearch] = useState('');
  const [healthyOnly, setHealthyOnly] = useState(false);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [selectedDishKeys, setSelectedDishKeys] = useState<string[]>(() => draftStringList(restoredDraft?.selectedDishKeys));
  const [assignedDishes, setAssignedDishes] = useState<Record<string, MealKey[]>>(() => {
    const value = restoredDraft?.assignedDishes;
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    const validMealKeys: MealKey[] = ['breakfast', 'lunch', 'dinner', 'snacks'];
    return Object.fromEntries(Object.entries(value).flatMap(([key, meals]) => {
      if (!Array.isArray(meals)) return [];
      const selected = meals.filter((meal): meal is MealKey => validMealKeys.includes(meal));
      return selected.length ? [[key, selected]] : [];
    }));
  });
  const [editField, setEditField] = useState<'age' | 'height' | 'weight' | null>(null);
  const [dietId, setDietId] = useState(() => restoredDraft?.dietId ?? profile.dietIntensity ?? 'normal_lose');
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(() => draftStringList(restoredDraft?.dietaryPreferences, profile.dietaryPreferences));
  const [healthConditions, setHealthConditions] = useState<string[]>(() => draftStringList(restoredDraft?.healthConditions, profile.healthConditions));
  const [dietAffectingMedication, setDietAffectingMedication] = useState<boolean | null>(() => restoredDraft?.dietAffectingMedication !== undefined ? restoredDraft.dietAffectingMedication : profile.dietAffectingMedication);
  const [waist, setWaist] = useState<string>(() => restoredDraft?.waist ?? (profile.waist === null ? '' : String(profile.waist)));
  const [sleepHours, setSleepHours] = useState<SleepHours>(() => restoredDraft?.sleepHours ?? profile.sleepHours ?? 'seven_to_eight');
  const [stressLevel, setStressLevel] = useState<StressLevel>(() => restoredDraft?.stressLevel ?? profile.stressLevel ?? 'medium');
  const [workType, setWorkType] = useState<WorkType>(() => restoredDraft?.workType ?? profile.workType ?? 'sedentary');
  const [waterGlasses, setWaterGlasses] = useState<number>(() => restoredDraft?.waterGlasses ?? profile.waterGlasses ?? 8);
  const [smoking, setSmoking] = useState<SmokingStatus>(() => restoredDraft?.smoking ?? profile.smoking ?? 'no');
  const [caffeineCups, setCaffeineCups] = useState<number>(() => restoredDraft?.caffeineCups ?? profile.caffeineCups ?? 1);
  const [mealsPerDay, setMealsPerDay] = useState<MealsPerDay>(() => restoredDraft?.mealsPerDay ?? profile.mealsPerDay ?? 'three');
  const [snacksBetweenMeals, setSnacksBetweenMeals] = useState<SnackFrequency>(() => restoredDraft?.snacksBetweenMeals ?? profile.snacksBetweenMeals ?? 'sometimes');
  const [breakfastType, setBreakfastType] = useState<BreakfastType>(() => restoredDraft?.breakfastType ?? profile.breakfastType ?? 'light');
  const [meatFrequency, setMeatFrequency] = useState<MeatFrequency>(() => restoredDraft?.meatFrequency ?? profile.meatFrequency ?? 'daily');
  const [vegetablesFrequency, setVegetablesFrequency] = useState<VegetablesFrequency>(() => restoredDraft?.vegetablesFrequency ?? profile.vegetablesFrequency ?? 'daily');
  const [sugaryDrinks, setSugaryDrinks] = useState<SugaryDrinksFrequency>(() => restoredDraft?.sugaryDrinks ?? profile.sugaryDrinks ?? 'sometimes');
  const [goalDiscovery, setGoalDiscovery] = useState<GoalDiscoverySelection | null>(() => restoredDraft?.goalDiscovery !== undefined ? restoredDraft.goalDiscovery : profile.goalDiscovery ?? null);
  const [goals, setGoals] = useState<WizardGoalSelection[]>(() => Array.isArray(restoredDraft?.goals) ? restoredDraft.goals : profile.goals.length ? profile.goals : (profile.wizardGoal ? [profile.wizardGoal] : []));
  const [bodyConcerns, setBodyConcerns] = useState<BodyConcern[]>(() => Array.isArray(restoredDraft?.bodyConcerns) ? restoredDraft.bodyConcerns : profile.bodyConcerns);
  const [exerciseRecommendationTypes, setExerciseRecommendationTypes] = useState<ExerciseRecommendationType[]>(() => {
    if (Array.isArray(restoredDraft?.exerciseRecommendationTypes)) return restoredDraft.exerciseRecommendationTypes;
    const saved = profile.exerciseRecommendations.filter((id): id is ExerciseRecommendationType => EXERCISE_RECOMMENDATION_OPTIONS.some((option) => option.id === id));
    return saved.length ? saved : recommendExerciseTypes(profile.goals.length ? profile.goals : (profile.wizardGoal ? [profile.wizardGoal] : []), profile.bodyConcerns);
  });
  const [adjustingExerciseRecommendations, setAdjustingExerciseRecommendations] = useState(false);
  const [weeklyPlan, setWeeklyPlan] = useState<PlanDay[]>(() => {
    const draftPlan = draftWeeklyPlan(restoredDraft?.weeklyPlan);
    if (draftPlan) return draftPlan;
    try {
      const kitchenId = restoredDraft?.selectedKitchenId ?? profile.selectedKitchen ?? profile.kitchenPreference ?? 'egyptian';
      const raw = localStorage.getItem(`hc_weekly_plan_${kitchenId}`);
      if (raw) {
        const p = JSON.parse(raw);
        if (hasFourFilledMeals(p)) return p;
      }
    } catch {
      /* ignore */
    }
    return [];
  });
  const [planPreview, setPlanPreview] = useState<UserPlanPreview | null>(() => restoredDraft?.planPreview !== undefined ? draftPlanPreview(restoredDraft.planPreview) : profile.planPreview);
  const [selectedPlanDay, setSelectedPlanDay] = useState(() => restoredDraft?.selectedPlanDay && restoredDraft.selectedPlanDay >= 1 && restoredDraft.selectedPlanDay <= 7 ? restoredDraft.selectedPlanDay : 1);
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
  const [showPlan, setShowPlan] = useState(false);
  const [showStartOverConfirm, setShowStartOverConfirm] = useState(false);
  const [collapsedSaved, setCollapsedSaved] = useState<Set<MealKey>>(new Set());
  const [showAllSaved, setShowAllSaved] = useState<Set<MealKey>>(new Set());
  const [toast, setToast] = useState('');
  const [toastUndo, setToastUndo] = useState<{ label: string; action: () => void } | null>(null);

  useEffect(() => {
    if (!unifiedExercisesLoading && !restoredDraft) autoPickExercises(true);
  }, [unifiedExercisesLoading]);

  useEffect(() => {
    if (startWithHeroProfile) navigate(location.pathname, { replace: true, state: null });
  }, [startWithHeroProfile, location.pathname, navigate]);

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

  useEffect(() => {
    if (wizardCompletedRef.current) return;
    saveWizardStep(step);
    saveWizardDraft(step, {
      startedFromHero,
      planType,
      age,
      sex,
      height,
      weight,
      wizardGoal,
      goal,
      targetWeight,
      timeline,
      selectedKitchenId,
      workout,
      exerciseTypes,
      kitchenMode,
      kitchenSelectionAccepted,
      categoryMode,
      exerciseMode,
      step2Data,
      dietId,
      dietaryPreferences,
      healthConditions,
      dietAffectingMedication,
      waist,
      sleepHours,
      stressLevel,
      workType,
      waterGlasses,
      smoking,
      caffeineCups,
      mealsPerDay,
      snacksBetweenMeals,
      breakfastType,
      meatFrequency,
      vegetablesFrequency,
      sugaryDrinks,
      goalDiscovery,
      goals,
      bodyConcerns,
      exerciseRecommendationTypes,
      adjustingExerciseRecommendations,
      plannedExercises,
      selectedDishKeys,
      assignedDishes,
      weeklyPlan,
      planPreview,
      selectedPlanDay,
      activeCuisineRegion,
      kitchenRegion,
      regionSel,
      cuisineSel,
    });
  }, [
    step,
    startedFromHero,
    planType,
    age,
    sex,
    height,
    weight,
    wizardGoal,
    goal,
    targetWeight,
    timeline,
    selectedKitchenId,
    workout,
    exerciseTypes,
    kitchenMode,
    kitchenSelectionAccepted,
    categoryMode,
    exerciseMode,
    step2Data,
    dietId,
    dietaryPreferences,
    healthConditions,
    dietAffectingMedication,
    waist,
    sleepHours,
    stressLevel,
    workType,
    waterGlasses,
    smoking,
    caffeineCups,
    mealsPerDay,
    snacksBetweenMeals,
    breakfastType,
    meatFrequency,
    vegetablesFrequency,
    sugaryDrinks,
    goalDiscovery,
    goals,
    bodyConcerns,
    exerciseRecommendationTypes,
    adjustingExerciseRecommendations,
    plannedExercises,
    selectedDishKeys,
    assignedDishes,
    weeklyPlan,
    planPreview,
    selectedPlanDay,
    activeCuisineRegion,
    kitchenRegion,
    regionSel,
    cuisineSel,
  ]);

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
    () => kitchens.find((k) => k.id === selectedKitchenId) ?? kitchens.find((k) => k.id === 'diet-mediterranean') ?? kitchens.find((k) => k.id === 'egyptian') ?? kitchens[0],
    [selectedKitchenId, kitchens],
  );
  const availableKitchens = useMemo(
    () => kitchens.filter((k) => k.dishes.length > 0 || k.total > 0 || (kitchenCounts[k.id] ?? 0) > 0).sort((a, b) => kitchenLabel(a).localeCompare(kitchenLabel(b))),
    [kitchens, kitchenCounts, language],
  );
  const kitchensByCuisineRegion = useMemo<Record<CuisineRegionId, KitchenInfo[]>>(() => {
    const uniqueKitchens = new Map<string, KitchenInfo>();
    for (const kitchen of availableKitchens) {
      const existing = uniqueKitchens.get(kitchen.id);
      if (!existing || kitchen.dishes.length > existing.dishes.length) uniqueKitchens.set(kitchen.id, kitchen);
    }

    return Object.fromEntries(CUISINE_REGIONS.map((region) => [
      region.id,
      [...uniqueKitchens.values()]
        .filter((kitchen) =>
          kitchen.regionId === region.id ||
          region.ids.includes(kitchen.id),
        )
        .sort((a, b) => kitchenLabel(a).localeCompare(kitchenLabel(b))),
    ])) as Record<CuisineRegionId, KitchenInfo[]>;
  }, [availableKitchens, language]);

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
  const countryKitchens = useMemo<KitchenInfo[]>(() => [selectedKitchen], [selectedKitchen]);
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
    if (kitchenMode === 'surprise' && !countryKitchens.some((k) => k.id === selectedKitchen.id)) return [selectedKitchen];
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
        if (q && !getDishName(r.dish, language).toLowerCase().includes(q.toLowerCase()) && !getCategoryName(r.cat, language).toLowerCase().includes(q.toLowerCase()) && !r.dish.name.includes(q) && !r.cat.name_ar.includes(q)) return false;
        return true;
      }),
    [dishRows, healthyOnly, mealTab, dishSearch, language],
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

  const fromCalculator = enteredFromCalculator(profile);
  const wizardSteps: { n: Step; label: string }[] = [
    { n: 1, label: language === 'ar' ? 'البداية' : 'Welcome' },
    { n: 2, label: language === 'ar' ? 'الأساسيات' : 'Basics' },
    { n: 3, label: language === 'ar' ? 'القياسات' : 'Measurements' },
    { n: 4, label: language === 'ar' ? 'نمط الحياة' : 'Lifestyle' },
    { n: 5, label: language === 'ar' ? 'عادات الأكل' : 'Eating' },
    { n: 6, label: language === 'ar' ? 'اكتشاف الهدف' : 'Goal Discovery' },
    { n: 7, label: language === 'ar' ? 'اختيار الأهداف' : 'Goal Selection' },
    { n: 8, label: language === 'ar' ? 'مناطق الاهتمام' : 'Body Concerns' },
    { n: 9, label: language === 'ar' ? 'التمارين المقترحة' : 'Exercise' },
    { n: 10, label: language === 'ar' ? 'المطبخ' : 'Kitchen' },
    { n: 11, label: language === 'ar' ? 'التوصيات' : 'Recommendations' },
    { n: 12, label: language === 'ar' ? 'المعاينة' : 'Preview' },
    { n: 13, label: language === 'ar' ? 'المراجعة' : 'Review' },
  ];
  const visibleSteps = startedFromHero
    ? wizardSteps.filter((x) => x.n >= 4 && (x.n !== 6 || step === 6))
    : fromCalculator ? wizardSteps.filter((x) => x.n >= 4) : wizardSteps;
  const visIdx = Math.max(0, visibleSteps.findIndex((x) => x.n === step));
  const visibleStepNumber = visIdx + 1;
  const progressTotal = startedFromHero ? visibleSteps.length : wizardSteps.length;
  const progressStepNumber = startedFromHero ? visibleStepNumber : step;
  const progressPct = progressTotal > 1 ? Math.max(0, Math.min(100, (visibleStepNumber / progressTotal) * 100)) : 0;
  const stepTitle = (() => {
    if (step === 1) return language === 'ar' ? 'لنبنِ خطة غذائك الشخصية' : "Let's build your personalized nutrition plan";
    if (step === 2) return language === 'ar' ? 'المعلومات الأساسية' : 'Basic Information';
    if (step === 3) return language === 'ar' ? 'قياسات الجسم' : 'Body Measurements';
    if (step === 4) return language === 'ar' ? 'نمط الحياة' : 'Lifestyle';
    if (step === 5) return language === 'ar' ? 'العادات الغذائية الحالية' : 'Current Dietary Habits';
    if (step === 6) return language === 'ar' ? 'ما الذي ترغب في تحقيقه؟' : 'What would you like to achieve?';
    if (step === 7) return language === 'ar' ? 'اختر أهدافك' : 'Select Your Goals';
    if (step === 8) return language === 'ar' ? 'مناطق الجسم التي تريد تحسينها' : 'Specific Body Areas to Work On';
    if (step === 9) return language === 'ar' ? 'تمارين مقترحة بناءً على أهدافك' : 'Recommended Exercises For Your Goals';
    if (step === 10) return language === 'ar' ? 'اختر مطبخك المفضل' : 'Choose Your Cuisine';
    if (step === 11) return language === 'ar' ? 'توصياتك الشخصية' : 'Your Final Recommendations';
    if (step === 12) return language === 'ar' ? 'معاينة خطتك' : 'Your Plan Preview';
    return language === 'ar' ? 'خطتك الشخصية جاهزة!' : 'Your Personalized Plan is Ready!';
  })();
  const stepEyebrow = (() => {
    if (step === 1) return language === 'ar' ? 'مرحباً بك' : 'WELCOME';
    if (step === 2) return language === 'ar' ? 'المعلومات الأساسية' : 'BASIC INFORMATION';
    if (step === 3) return language === 'ar' ? 'قياسات الجسم' : 'BODY MEASUREMENTS';
    if (step === 4) return language === 'ar' ? 'نمط حياتك' : 'LIFESTYLE';
    if (step === 5) return language === 'ar' ? 'عاداتك الغذائية الحالية' : 'CURRENT EATING HABITS';
    if (step === 6) return language === 'ar' ? 'اكتشاف الهدف' : 'GOAL DISCOVERY';
    if (step === 7) return language === 'ar' ? 'اختيار الأهداف' : 'GOAL SELECTION';
    if (step === 8) return language === 'ar' ? 'مناطق الاهتمام' : 'BODY CONCERNS';
    if (step === 9) return language === 'ar' ? 'التمارين' : 'EXERCISE';
    if (step === 10) return language === 'ar' ? 'اختيار المطبخ' : 'KITCHEN SELECTION';
    if (step === 11) return language === 'ar' ? 'بناءً على إجاباتك' : 'BASED ON YOUR PROFILE';
    if (step === 12) return language === 'ar' ? 'معاينة الخطة' : 'PLAN PREVIEW';
    return language === 'ar' ? 'الخطة مكتملة' : 'PLAN COMPLETE';
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
    const targetCal = Math.max(1200, Math.round(tdeeWorkout + delta));
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

  const recommendedDiet = healthConditions.includes('diabetes')
    ? language === 'ar' ? 'قليل الكربوهيدرات' : 'Low-Carb'
    : goals.includes('build_muscle')
      ? language === 'ar' ? 'غني بالبروتين' : 'High-Protein'
      : dietaryPreferences.includes('low_carb') || dietaryPreferences.includes('keto')
        ? language === 'ar' ? 'قليل الكربوهيدرات' : 'Low-Carb'
        : dietaryPreferences.includes('vegetarian') || dietaryPreferences.includes('vegan')
          ? language === 'ar' ? 'نباتي متوازن' : 'Vegetarian Balanced'
          : healthConditions.includes('hypertension') || healthConditions.includes('high_cholesterol') || dietaryPreferences.includes('mediterranean')
            ? language === 'ar' ? 'حمية البحر المتوسط' : 'Mediterranean'
            : language === 'ar' ? 'متوازن على نمط البحر المتوسط' : 'Balanced Mediterranean';
  const recommendedWizardGoal = recommendWizardGoal(healthConditions, numbers?.bmi ?? null);
  const recommendedGoalCalc = WIZARD_GOAL_CALC[recommendedWizardGoal];
  const recommendedGoalDiet = DIETS[recommendedGoalCalc][0];
  const recommendedMaintenance = numbers?.tdeeWorkout ?? 2000;
  const recommendedDelta = goals.includes('lose_weight') ? -400 : goals.includes('build_muscle') ? 250 : 0;
  const recommendedDailyCalories = numbers?.targetCal ?? Math.max(1200, recommendedMaintenance + recommendedDelta);

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
    if (step === 2) {
      return parsed.age >= 12 && parsed.age <= 80;
    }
    if (step === 3) {
      return parsed.height >= 120 && parsed.height <= 220 && parsed.weight >= 30 && parsed.weight <= 250;
    }
    if (step === 6) {
      if (!goalDiscovery) return false;
      return true;
    }
    if (step === 7) {
      if (goals.length === 0 || goals.length > 3) return false;
      const hasLose = goals.includes('lose_weight');
      const hasMaintain = goals.includes('maintain_weight');
      if (hasLose && hasMaintain) return false;
      return true;
    }
    if (step === 8) {
      return true;
    }
    if (step === 9) {
      return true;
    }
    if (step === 10) return kitchenMode === 'manual'
      ? kitchenSelectionAccepted && availableKitchens.some((k) => k.id === selectedKitchenId)
      : kitchenMode === 'surprise' && kitchenSelectionAccepted && !!recommendedKitchen;
    if (step === 12) return !!planPreview && !autoBuilding;
    return true;
  };

  const primaryGoal = primaryGoalSelection(goals.length ? goals : (wizardGoal ? [wizardGoal] : []));
  const hasConflictGoals = goals.includes('lose_weight') && goals.includes('maintain_weight');
  const targetWeeks = TIMELINE_OPTIONS.find((t) => t.weeks === parsed.timeline) ? parsed.timeline : 12;
  const lossKgPerWeek = parsed.weight && parsed.target && parsed.target < parsed.weight && targetWeeks > 0
    ? ((parsed.weight - parsed.target) / targetWeeks) / 7
    : null;
  const safeLoss = lossKgPerWeek === null ? null : lossKgPerWeek >= 0.5 && lossKgPerWeek <= 1.0;
  const diabetesConcern = healthConditions.includes('diabetes');
  const macroProtein = diabetesConcern || goals.includes('build_muscle') || bodyConcerns.includes('belly_fat') ? 35 : 30;
  const macroCarbs = diabetesConcern ? 30 : bodyConcerns.includes('belly_fat') ? 35 : 40;
  const mealsPerDayCount: Record<MealsPerDay, number> = { one_to_two: 2, three: 3, four: 4, five_plus: 5 };
  const finalRecommendations: UserRecommendations = {
    dietType: recommendedDiet,
    dailyCalories: recommendedDailyCalories,
    macroPercentages: { protein: macroProtein, carbs: macroCarbs, fat: 100 - macroProtein - macroCarbs },
    mealsPerDay: mealsPerDayCount[mealsPerDay],
    exerciseSummary: exerciseRecommendationTypes,
  };
  const recommendedKitchenIds = primaryGoal === 'lose_weight'
    ? ['diet-mediterranean', 'japanese']
    : primaryGoal === 'build_muscle'
      ? ['american', 'turkish']
      : primaryGoal === 'improve_health'
        ? ['diet-mediterranean', 'greek']
        : ['diet-mediterranean', 'greek'];
  const recommendedKitchen = recommendedKitchenIds
    .map((id) => availableKitchens.find((k) => k.id === id))
    .find((k): k is KitchenInfo => !!k)
    ?? availableKitchens[0]
    ?? null;
  const recommendedKitchenBenefit = primaryGoal === 'build_muscle'
    ? (language === 'ar' ? 'غني بالبروتين' : 'High-protein')
    : primaryGoal === 'improve_health'
      ? (language === 'ar' ? 'خيارات متوازنة' : 'Balanced options')
      : primaryGoal === 'lose_weight'
        ? (language === 'ar' ? 'خيارات أقل بالسعرات' : 'Lower-calorie options')
        : (language === 'ar' ? 'خيارات يومية متوازنة' : 'Balanced everyday options');

  const saveWizardProfile = () => updateProfile({
    age: parsed.age || null,
    gender: sex,
    height: parsed.height || null,
    weight: parsed.weight || null,
    targetWeight: parsed.target || null,
    timelineWeeks: parsed.timeline || null,
    planType,
    goal,
    wizardGoal,
    activityLevel: step2Data.activityLevel,
    exerciseTypes,
    dietaryPreferences,
    dietIntensity: dietId,
    kitchenPreference: selectedKitchenId,
    selectedKitchen: kitchenMode === 'manual' ? selectedKitchenId : null,
    kitchenMode,
    recommendations: finalRecommendations,
    planPreview,
    healthConditions,
    dietAffectingMedication,
    waist: waist ? Number(waist) : null,
    sleepHours,
    stressLevel,
    workType,
    waterGlasses,
    smoking,
    caffeineCups,
    mealsPerDay,
    snacksBetweenMeals,
    breakfastType,
    meatFrequency,
    vegetablesFrequency,
    sugaryDrinks,
    goalDiscovery,
    goals,
    bodyConcerns,
  });

  const completeWizardDraft = () => {
    wizardCompletedRef.current = true;
    clearWizardDraft();
  };

  const next = () => {
    if (!isValid()) return;
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 2) {
      updateProfile({ age: parsed.age || null, gender: sex, planType });
      setStep(3);
      return;
    }
    if (step === 3) {
      updateProfile({ height: parsed.height || null, weight: parsed.weight || null, waist: waist ? Number(waist) : null });
      setStep(4);
      return;
    }
    if (step === 4) {
      updateProfile({ sleepHours, stressLevel, workType, waterGlasses, smoking, caffeineCups });
      setStep(5);
      return;
    }
    if (step === 5) {
      updateProfile({ mealsPerDay, snacksBetweenMeals, breakfastType, meatFrequency, vegetablesFrequency, sugaryDrinks, dietaryPreferences });
      setStep(startedFromHero && profile.wizardGoal !== null ? 7 : 6);
      return;
    }
    if (step === 6) {
      const recommended = goalDiscovery;
      let selected = goals;
      if (recommended === 'not_sure') {
        const bmi = numbers?.bmi ?? null;
        selected = [recommendWizardGoal(healthConditions, bmi)];
      }
      else selected = recommended ? [recommended] : goals;
      if (selected.length === 1) {
        const sel = selected[0];
        setGoals(selected);
        setWizardGoal(sel);
        setGoal(WIZARD_GOAL_CALC[sel]);
        updateProfile({ goalDiscovery, goals: selected, wizardGoal: sel, goal: WIZARD_GOAL_CALC[sel] });
      } else {
        updateProfile({ goalDiscovery, goals });
      }
      setStep(7);
      return;
    }
    if (step === 7) {
      const w = primaryGoal;
      setWizardGoal(w);
      setGoal(WIZARD_GOAL_CALC[w]);
      if (w === 'lose_weight') {
        const t = Math.max(30, parsed.weight - 5);
        setTargetWeight(String(t));
      } else if (w === 'build_muscle') {
        setTargetWeight(String(parsed.weight + 5));
      } else {
        setTargetWeight(String(parsed.weight));
      }
      setTimeline(String(targetWeeks));
      updateProfile({ goals, wizardGoal: w, goal: WIZARD_GOAL_CALC[w] });
      setStep(8);
      return;
    }
    if (step === 8) {
      updateProfile({ bodyConcerns });
      setExerciseRecommendationTypes(recommendExerciseTypes(goals.length ? goals : [primaryGoal], bodyConcerns));
      setAdjustingExerciseRecommendations(false);
      setStep(9);
      return;
    }
    if (step === 9) {
      acceptExerciseRecommendations();
      setStep(10);
      return;
    }
    if (step === 10) {
      updateProfile({
        kitchenMode,
        selectedKitchen: kitchenMode === 'manual' ? selectedKitchenId : null,
        kitchenPreference: selectedKitchenId,
      });
      setStep(11);
      return;
    }
    if (step === 11) {
      updateProfile({ goal, wizardGoal, targetWeight: parsed.target || null, timelineWeeks: parsed.timeline || null, dietIntensity: dietId, recommendations: finalRecommendations });
      setStep(12);
      runAutoKitchen(false);
      return;
    }
    if (step === 12) {
      saveWizardProfile();
      setStep(13);
      return;
    }
    if (step === 13) {
      setStep(13);
    }
  };
  const back = () => {
    const s = Math.max(1, step - 1) as Step;
    setStep(s);
  };

  const selectExerciseType = (typeId: string) => {
    const category = LEGACY_EXERCISE_TYPE_MAP[typeId];
    if (!category) return;
    setStep2Data((d) => ({ ...d, exerciseType: category }));
    setExerciseTypes((prev) => (prev.includes(category) ? prev : [...prev, category]));
  };

  const autoPickExercises = (silent = false) => {
    const picks: WizardExerciseCategory[] =
      goal === 'gain_muscle'
        ? ['strength', 'cardio', 'balance']
        : goal === 'gain_weight'
          ? ['strength', 'cardio', 'balance']
          : goal === 'wellness'
            ? ['flexibility', 'balance', 'cardio']
            : goal === 'athletic'
              ? ['strength', 'cardio', 'hiit', 'balance']
              : ['cardio', 'hiit', 'strength'];
    const selectedPicks = step2Data.activityLevel === 'sedentary' || step2Data.activityLevel === 'light'
      ? picks.filter((type) => type !== 'hiit').slice(0, 3)
      : picks.slice(0, 4);
    setExerciseTypes(selectedPicks);
    setPlannedExercises((prev) => [
      ...prev.filter((exercise) => !selectedPicks.includes(exercise.type as WizardExerciseCategory)),
      ...selectedPicks.flatMap((type) => getUnifiedExercisesByType(type).slice(0, 2).map(toPlannedShape)),
    ]);
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

  const toggleWizardExercise = (ex: UnifiedExercise) => {
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
      const map: Record<GoalKey, WizardExerciseCategory[]> = {
        lose: ['cardio', 'hiit', 'strength'],
        gain_muscle: ['strength', 'cardio', 'balance'],
        gain_weight: ['strength', 'cardio', 'balance'],
        wellness: ['flexibility', 'balance', 'cardio'],
        athletic: ['strength', 'cardio', 'hiit', 'balance'],
      };
      const all = map[goal];
      const typePicks =
        step2Data.activityLevel === 'sedentary' || step2Data.activityLevel === 'light'
          ? all.filter((type) => type !== 'hiit').slice(0, 3)
          : all;
      const picked = typePicks.flatMap((type) => getUnifiedExercisesByType(type)
        .filter((exercise) => exercise.difficulty !== 'advanced')
        .slice(0, 2));
      const ids = picked.map((e) => e.id);
      setStep2Data((d) => ({ ...d, selectedExercises: ids, exerciseType: typePicks[0] }));
      setPlannedExercises(picked.map(toPlannedShape));
      setExerciseTypes(typePicks);
      setAutoBuildMode(false);
      notify(t('wizard.toast.autoExercises'));
    }, 2000);
  };

  const goEditExercises = () => {
    setStep(9);
  };

  const autoPickKitchen = () => {
    selectSurpriseMode();
  };

  const chooseKitchen = (k: KitchenInfo) => {
    if (selectedKitchenId !== k.id) setWeeklyPlan([]);
    setSelectedKitchenId(k.id);
    setActiveCuisineRegion(cuisineRegionForKitchen(k.id));
    updateProfile({ kitchenPreference: k.id, selectedKitchen: k.id, kitchenMode: 'manual' });
    setKitchenMode('manual');
    setKitchenSelectionAccepted(true);
    setCategorySearch('');
    setExpandedCat(null);
    setSelectedDishKeys([]);
    setAssignedDishes({});
    setKitchenRegion('all');
  };

  const selectSurpriseMode = () => {
    setKitchenMode('surprise');
    setKitchenSelectionAccepted(false);
    if (!recommendedKitchen) return;
    if (selectedKitchenId !== recommendedKitchen.id) setWeeklyPlan([]);
    setSelectedKitchenId(recommendedKitchen.id);
    setRegionSel(null);
    setCuisineSel(null);
    setKitchenRegion('all');
  };

  const acceptSurpriseKitchen = () => {
    if (!recommendedKitchen) return;
    setKitchenSelectionAccepted(true);
    if (selectedKitchenId !== recommendedKitchen.id) setWeeklyPlan([]);
    setSelectedKitchenId(recommendedKitchen.id);
    updateProfile({ kitchenPreference: recommendedKitchen.id, selectedKitchen: null, kitchenMode: 'surprise' });
  };

  const createPlanPreview = (day: PlanDay): UserPlanPreview => {
    let proteinGrams = 0;
    let carbGrams = 0;
    let fatGrams = 0;
    const meals = day.meals.map((meal) => {
      const dishes = meal.dishes.slice(0, 2).map((planned) => {
        proteinGrams += planned.dish.p * planned.grams / 100;
        carbGrams += planned.dish.c * planned.grams / 100;
        fatGrams += planned.dish.f * planned.grams / 100;
        return { name: getDishName(planned.dish, language), nameAr: planned.dish.nameAr ?? null, calories: planned.calories };
      });
      return { mealType: meal.mealType, calories: dishes.reduce((total, dish) => total + dish.calories, 0), dishes };
    });
    const macroCalories = { protein: proteinGrams * 4, carbs: carbGrams * 4, fat: fatGrams * 9 };
    const macroTotal = macroCalories.protein + macroCalories.carbs + macroCalories.fat || 1;
    const protein = Math.round(macroCalories.protein / macroTotal * 100);
    const carbs = Math.round(macroCalories.carbs / macroTotal * 100);
    return {
      kitchenId: selectedKitchenId,
      meals,
      totalCalories: meals.reduce((total, meal) => total + meal.calories, 0),
      macroPercentages: { protein, carbs, fat: 100 - protein - carbs },
    };
  };

  const savePlanPreview = (day: PlanDay) => {
    const preview = createPlanPreview(day);
    setPlanPreview(preview);
    updateProfile({ planPreview: preview });
  };

  const localizedPreviewDishName = (previewDish: UserPlanPreview['meals'][number]['dishes'][number]) => {
    const sourceDish = weeklyPlan[0]?.meals
      .flatMap((meal) => meal.dishes)
      .find(({ dish }) => dish.name === previewDish.name || dish.nameAr === previewDish.nameAr || dish.nameEn === previewDish.name || dish.nameFr === previewDish.name || dish.nameEs === previewDish.name || dish.nameDe === previewDish.name)
      ?.dish
      ?? selectedKitchen.dishes.find((dish) => dish.name === previewDish.name || dish.nameAr === previewDish.nameAr || dish.nameEn === previewDish.name || dish.nameFr === previewDish.name || dish.nameEs === previewDish.name || dish.nameDe === previewDish.name);
    return sourceDish ? getDishName(sourceDish, language) : previewDish.name;
  };

  const runAutoKitchen = (openPlan = false) => {
    if (autoBuilding) return;
    if (!openPlan) {
      setPlanPreview(null);
      updateProfile({ planPreview: null });
    }
    setAutoBuilding(true);
    window.setTimeout(() => {
      const plan = generateWeeklyPlan({
        age: parseInt(age, 10),
        height: parseInt(height, 10),
        weight: parseFloat(weight),
        gender: sex,
        targetCalories: finalRecommendations.dailyCalories,
        goal,
        kitchens: [selectedKitchen],
        region: kitchenRegion === 'all' ? undefined : kitchenRegion,
        varietyAcrossDays: true,
        maxDishesPerMeal: 2,
      });
      setWeeklyPlan(plan);
      if (plan[0]) savePlanPreview(plan[0]);
      setSelectedPlanDay(1);
      setOpenMealAccordion(null);
      setAutoBuilding(false);
      if (openPlan) completeWizardDraft();
      setStep(openPlan ? 13 : 12);
      if (openPlan) setShowPlan(true);
      notify(`Generated 7-day plan: ${plan.length} days`);
    }, 1500);
  };

  const regeneratePlanPreview = () => {
    if (!hasFourFilledMeals(weeklyPlan, finalRecommendations.dailyCalories)) {
      runAutoKitchen(false);
      return;
    }
    const swapIndex = 1 + Math.floor(Math.random() * (weeklyPlan.length - 1));
    const nextPlan = [...weeklyPlan];
    const dayOne = nextPlan[0];
    const alternate = nextPlan[swapIndex];
    nextPlan[0] = { ...alternate, day: 1, label: dayOne.label };
    nextPlan[swapIndex] = { ...dayOne, day: alternate.day, label: alternate.label };
    setWeeklyPlan(nextPlan);
    savePlanPreview(nextPlan[0]);
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

  const toggleGoalSelection = (id: WizardGoalSelection) => {
    setGoals((prev) => {
      if (prev.includes(id)) {
        return prev.filter((g) => g !== id);
      }
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };
  const acceptDiscovery = () => {
    if (!goalDiscovery) return;
    let sel: WizardGoalSelection[] = [];
    if (goalDiscovery === 'not_sure') {
      const bmi = numbers?.bmi ?? null;
      sel = [recommendWizardGoal(healthConditions, bmi)];
    } else {
      sel = [goalDiscovery as WizardGoalSelection];
    }
    setGoals(sel);
  };

  const toggleDietaryPreference = (id: string) => {
    const next = id === 'none'
      ? dietaryPreferences.includes('none') ? [] : ['none']
      : dietaryPreferences.includes(id)
        ? dietaryPreferences.filter((preference) => preference !== id)
        : [...dietaryPreferences.filter((preference) => preference !== 'none'), id];
    setDietaryPreferences(next);
    updateProfile({ dietaryPreferences: next });
  };

  const toggleBodyConcern = (id: BodyConcern) => {
    const next: BodyConcern[] = id === 'none'
      ? bodyConcerns.includes('none') ? [] : ['none']
      : bodyConcerns.includes(id)
        ? bodyConcerns.filter((concern) => concern !== id && concern !== 'none')
        : [...bodyConcerns.filter((concern) => concern !== 'none'), id];
    setBodyConcerns(next);
    updateProfile({ bodyConcerns: next });
    if (id === 'none' && !bodyConcerns.includes('none')) {
      setExerciseRecommendationTypes(recommendExerciseTypes(goals.length ? goals : [primaryGoal], next));
      setAdjustingExerciseRecommendations(false);
      setStep(9);
    }
  };
  const recommendedActivityLevel: ActivityKey = ['sedentary', 'light'].includes(step2Data.activityLevel) ? 'light' : 'moderate';
  const exerciseMovementSuggestions = [
    ...(goals.includes('build_muscle') ? [{ en: 'Progressive overload', ar: 'زيادة الحمل التدريجي' }] : []),
    ...(bodyConcerns.includes('belly_fat') ? [{ en: 'Core training', ar: 'تمارين الجذع' }] : []),
    ...(bodyConcerns.includes('chest_sagging') ? [{ en: 'Push-ups', ar: 'تمارين الضغط' }, { en: 'Chest press', ar: 'ضغط الصدر' }] : []),
    ...(bodyConcerns.includes('love_handles') ? [{ en: 'Oblique exercises', ar: 'تمارين العضلات المائلة' }] : []),
    ...(bodyConcerns.includes('arm_fat') ? [{ en: 'Triceps', ar: 'العضلة ثلاثية الرؤوس' }, { en: 'Biceps', ar: 'العضلة ذات الرأسين' }] : []),
    ...(bodyConcerns.includes('thigh_fat') ? [{ en: 'Squats', ar: 'القرفصاء' }, { en: 'Lunges', ar: 'الاندفاع' }] : []),
    ...(bodyConcerns.includes('back_fat') ? [{ en: 'Rows', ar: 'تمارين التجديف' }, { en: 'Mobility', ar: 'تمارين الحركة' }] : []),
  ];
  const weeklyExerciseFocus = exerciseRecommendationTypes.includes('cardio') && exerciseRecommendationTypes.includes('strength')
    ? t('wizard.step9.weeklyFocus.cardioStrength')
    : exerciseRecommendationTypes.includes('strength')
      ? t('wizard.step9.weeklyFocus.strengthFlexibility')
      : t('wizard.step9.weeklyFocus.cardioFlexibility');
  const toggleExerciseRecommendation = (id: ExerciseRecommendationType) => {
    setExerciseRecommendationTypes((current) => {
      if (current.includes(id)) return current.filter((type) => type !== id);
      return current.length < 4 ? [...current, id] : current;
    });
  };
  const acceptExerciseRecommendations = () => {
    const mappedExerciseTypes = [...exerciseRecommendationTypes];
    setExerciseTypes(mappedExerciseTypes);
    setStep2Data((current) => ({ ...current, activityLevel: recommendedActivityLevel, selectedExercises: mappedExerciseTypes }));
    updateProfile({ exerciseRecommendations: exerciseRecommendationTypes, exerciseTypes: mappedExerciseTypes, activityLevel: recommendedActivityLevel });
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

  const startOver = () => {
    wizardCompletedRef.current = false;
    clearWizardDraft();
    resetProfile();
    setShowPlan(false);
    setShowStartOverConfirm(false);
    setStep(1);
    setStartedFromHero(false);
    setPlanType('both');
    setAge('');
    setSex('male');
    setHeight('');
    setWeight('');
    setWizardGoal('lose_weight');
    setGoal('lose');
    setTargetWeight('');
    setTimeline('12');
    setDietId('normal_lose');
    setDietaryPreferences([]);
    setHealthConditions([]);
    setDietAffectingMedication(null);
    setWaist('');
    setSleepHours('seven_to_eight');
    setStressLevel('medium');
    setWorkType('sedentary');
    setWaterGlasses(8);
    setSmoking('no');
    setCaffeineCups(1);
    setMealsPerDay('three');
    setSnacksBetweenMeals('sometimes');
    setBreakfastType('light');
    setMeatFrequency('daily');
    setVegetablesFrequency('daily');
    setSugaryDrinks('sometimes');
    setGoalDiscovery(null);
    setGoals([]);
    setBodyConcerns([]);
    setExerciseRecommendationTypes(recommendExerciseTypes(['lose_weight'], []));
    setAdjustingExerciseRecommendations(false);
    setStep2Data({ activityLevel: 'moderate', exerciseType: null, selectedExercises: [] });
    setWorkout('full_body');
    setExerciseTypes(['cardio', 'strength']);
    setCategoryMode('manual');
    setExerciseMode('auto');
    setAutoBuildMode(false);
    setPlannedExercises([]);
    setEditingSavedProfile(false);
    setSelectedKitchenId('egyptian');
    setKitchenMode(null);
    setKitchenSelectionAccepted(false);
    setKitchenRegion('all');
    setActiveCuisineRegion(cuisineRegionForKitchen('egyptian'));
    setWeeklyPlan([]);
    setPlanPreview(null);
    setSelectedPlanDay(1);
    setSelectedDishKeys([]);
    setAssignedDishes({});
    setRegionSel(null);
    setCuisineSel(null);
    setKitchenSearch('');
    setCategorySearch('');
    setDishSearch('');
    setSavedSearch('');
    try {
      localStorage.removeItem(`hc_weekly_plan_${selectedKitchenId}`);
      localStorage.removeItem('hc_planned_exercises');
    } catch {
      /* ignore storage failures */
    }
  };

  const viewMyPlan = () => {
    saveWizardProfile();
    if (hasFourFilledMeals(weeklyPlan, finalRecommendations.dailyCalories)) {
      completeWizardDraft();
      setShowPlan(true);
      return;
    }
    runAutoKitchen(true);
  };

  const handleSaveProgress = () => {
    saveWizardProfile();
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
            meal: t((m.mealType === 'lunch' ? 'mealLunch' : m.mealType === 'dinner' ? 'mealDinner' : m.mealType === 'breakfast' ? 'mealBreakfast' : 'mealSnack') as any),
            dish: m.dishes.map((d) => getDishName(d.dish, language)).join('، '),
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
  const selectedDayMeals = weeklyPlan[selectedPlanDay - 1]?.meals ?? [];
  const projectionText = !numbers
    ? ''
    : `${parsed.weight}${t('wizard.unit.kg')} → ${parsed.target}${t('wizard.unit.kg')} · ${parsed.timeline} ${t('wizard.unit.weeks')}`;
  const wizardGoalLabel = (g: WizardGoalSelection): string => {
    const labels: Record<WizardGoalSelection, { en: string; ar: string }> = {
      lose_weight: { en: 'Lose Weight', ar: 'إنقاص الوزن' },
      maintain_weight: { en: 'Maintain Weight', ar: 'الحفاظ على الوزن' },
      build_muscle: { en: 'Build Muscle', ar: 'بناء العضلات' },
      improve_health: { en: 'Improve Specific Health', ar: 'تحسين حالة صحية محددة' },
    };
    return language === 'ar' ? labels[g].ar : labels[g].en;
  };

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
  const dietaryPreferenceLabel = (id: string): string => {
    const labels: Record<string, { en: string; ar: string }> = {
      none: { en: 'No restrictions', ar: 'لا تفضيلات محددة' }, vegetarian: { en: 'Vegetarian', ar: 'نباتي' },
      vegan: { en: 'Vegan', ar: 'نباتي صرف' }, pescatarian: { en: 'Pescatarian', ar: 'نباتي مع السمك' },
      mediterranean: { en: 'Mediterranean', ar: 'متوسطي' }, low_carb: { en: 'Low carb', ar: 'قليل الكربوهيدرات' },
      keto: { en: 'Keto', ar: 'كيتو' }, gluten_free: { en: 'Gluten-free', ar: 'خالٍ من الغلوتين' },
      dairy_free: { en: 'Dairy-free', ar: 'خالٍ من الألبان' }, halal: { en: 'Halal', ar: 'حلال' },
      lose_weight: { en: 'Lose Weight', ar: 'إنقاص الوزن' }, maintain_weight: { en: 'Maintain Weight', ar: 'الحفاظ على الوزن' },
      build_muscle: { en: 'Build Muscle', ar: 'بناء العضلات' }, improve_health: { en: 'Improve Specific Health', ar: 'تحسين حالة صحية محددة' },
      not_sure: { en: 'Not sure — help me decide', ar: 'لست متأكداً — ساعدني في الاختيار' },
    };
    return labels[id] ? language === 'ar' ? labels[id].ar : labels[id].en : id;
  };
  const healthConditionLabel = (id: string): string => {
    const labels: Record<string, { en: string; ar: string }> = {
      diabetes: { en: 'Diabetes', ar: 'السكري' }, hypertension: { en: 'Hypertension', ar: 'ارتفاع ضغط الدم' },
      high_cholesterol: { en: 'High Cholesterol', ar: 'ارتفاع الكوليسترول' }, thyroid: { en: 'Thyroid issues', ar: 'مشكلات الغدة الدرقية' },
      ibs_digestive: { en: 'IBS / Digestive issues', ar: 'القولون العصبي / مشكلات الهضم' }, none: { en: 'None of the above', ar: 'لا شيء مما سبق' },
    };
    return labels[id] ? language === 'ar' ? labels[id].ar : labels[id].en : id;
  };

  const inputDefault = 'wiz-input';
  const cardBase = 'rounded-[26px] bg-white border border-[#EFEBE4] shadow-[0_10px_30px_rgba(15,76,58,0.06)]';

  return (
    <div className="wiz-page min-h-screen text-[#0F4C3A] overflow-x-hidden antialiased bg-[#FDFBF7]">
      <SEO title={t('seo.weightLoss.title')} description={t('seo.weightLoss.description')} url="/weight-loss" />
      {!showPlan && <header className="sticky top-0 z-40 bg-[#FDFBF7]/92 backdrop-blur-md border-b border-[#EFEBE4]">
          <div className="max-w-[880px] mx-auto px-4 md:px-6 pt-4 pb-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => (step === 1 ? navigate('/') : back())}
                aria-label={t('wizard.back')}
                className="w-10 h-10 rounded-full bg-white border border-[#EFEBE4] shadow-sm flex items-center justify-center text-[#0F4C3A] text-[20px] shrink-0 hover:border-[#D4A017] transition-all active:scale-95"
              >
                ‹
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="wiz-progress-badge truncate">{stepEyebrow}</span>
                   <span className="text-[12px] font-bold text-[#6B7A75] whitespace-nowrap shrink-0">
                     {t('wizard.stepOf')} <span className="num">{progressStepNumber}</span> {t('wizard.of')} <span className="num">{progressTotal}</span>
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
                    <div key={x.n} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                      <div
                        className={`w-7 h-7 rounded-full border-[2px] flex items-center justify-center text-[12px] font-bold transition-all ${
                          done ? 'bg-[#D4A017] border-[#D4A017] text-[#0F4C3A]' : active ? 'border-[#0F4C3A] bg-white text-[#0F4C3A]' : 'border-[#E3E0D8] bg-white text-[#A0A8A4]'
                        }`}
                      >
                        {done ? '✓' : startedFromHero ? visibleSteps.findIndex((visibleStep) => visibleStep.n === x.n) + 1 : x.n}
                      </div>
                      <span className={`hidden max-w-full truncate text-center text-[10.5px] font-semibold tracking-wide sm:block ${active ? 'text-[#0F4C3A]' : done ? 'text-[#6B7A75]' : 'text-[#A0A8A4]'}`}>{x.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
      </header>}

      <main className="w-full mx-auto px-4 md:px-6 pb-32 md:pb-16 max-w-[880px]">
        {step === 1 && (
          <div className="mt-6">
            <div className={`${cardBase} p-6 text-center sm:p-8`}>
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF3ED] text-[#0F4C3A]">
                <Sparkles size={30} />
              </span>
              <h2 className="mx-auto mt-5 max-w-[420px] text-[21px] font-extrabold leading-snug text-[#0F4C3A]">
                {language === 'ar' ? 'لنبنِ خطة غذائك الشخصية' : "Let's build your personalized nutrition plan"}
              </h2>
              <div className="mx-auto mt-6 max-w-[400px] space-y-3 text-start">
                <div className="flex items-center gap-3 rounded-[16px] bg-[#F4F1EB] px-4 py-3">
                  <Timer size={18} className="shrink-0 text-[#0F4C3A]" />
                  <span className="text-[13px] font-semibold text-[#52635A]">
                    {language === 'ar' ? 'الوقت المتوقع: 3-5 دقائق.' : 'Estimated time: 3-5 minutes.'}
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-[16px] bg-[#F4F1EB] px-4 py-3">
                  <ShieldCheck size={18} className="shrink-0 text-[#0F4C3A]" />
                  <span className="text-[13px] font-semibold text-[#52635A]">
                    {language === 'ar' ? 'يتم حفظ إجاباتك محلياً على جهازك.' : 'Your answers are saved locally on your device.'}
                  </span>
                </div>
              </div>
              <button type="button" onClick={next} className="cta-calc mx-auto mt-7 max-w-[400px]">
                <span className="inline-flex items-center justify-center gap-2">
                  <Play size={18} /> {language === 'ar' ? 'ابدأ الآن' : 'Start Now'}
                </span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-6`}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F4F1EB] text-[#0F4C3A]">
                  <User size={22} />
                </span>
                <div>
                  <h2 className="text-[18px] font-extrabold leading-none">{language === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}</h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{language === 'ar' ? 'أخبرنا عن عمرك وجنسك.' : 'Tell us your age and gender.'}</p>
                </div>
              </div>

              <div className="mt-6">
                <label className="wiz-label" htmlFor="wz-age">{t('age')}</label>
                <div className="relative">
                  <input
                    id="wz-age"
                    inputMode="numeric"
                    value={age}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setAge(value);
                      updateProfile({ age: value ? Number(value) : null });
                    }}
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
                        onClick={() => {
                          setSex(x);
                          updateProfile({ gender: x });
                        }}
                        className={`relative flex flex-col items-center justify-center pt-4 pb-3 rounded-[20px] border-2 transition-all min-w-0 ${on ? 'border-[#0F4C3A] bg-[#0F4C3A] shadow-[0_8px_18px_rgba(15,76,58,0.25)]' : 'border-[#EFEBE4] bg-white hover:border-[#D4A017]'}`}
                      >
                        <span className={`flex items-center justify-center w-[72px] h-[72px] rounded-full transition-colors ${on ? 'bg-white/15 border border-white/25' : 'bg-[#F4F1EB]'}`}>
                          <BodyFigure kind={x} />
                        </span>
                        <span className={`mt-2 text-[14px] font-bold leading-none ${on ? 'text-white' : 'text-[#6B7A75]'}`}>{t(x)}</span>
                        {on && (
                          <span className="absolute top-2.5 end-2.5 w-5 h-5 rounded-full bg-[#D4A017] text-[#0F4C3A] flex items-center justify-center text-[12px] font-bold shadow-sm">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <WizardFooter onBack={back} onNext={next} nextDisabled={!isValid()} backLabel={t('wizard.back')} nextLabel={t('wizard.continue')} />
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-6`}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F4F1EB] text-[#0F4C3A]">
                  <Ruler size={22} />
                </span>
                <div>
                  <h2 className="text-[18px] font-extrabold leading-none">{language === 'ar' ? 'قياسات الجسم' : 'Body Measurements'}</h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{language === 'ar' ? 'نحتاجها لحساب احتياجك اليومي.' : 'We need these to calculate your daily needs.'}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <label className="wiz-label" htmlFor="wz-height">{t('height')}</label>
                  <div className="relative">
                    <input
                      id="wz-height"
                      inputMode="numeric"
                      value={height}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setHeight(value);
                        updateProfile({ height: value ? Number(value) : null });
                      }}
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
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9.]/g, '');
                        setWeight(value);
                        updateProfile({ weight: value ? Number(value) : null });
                      }}
                      className={`${inputDefault} pr-16`}
                    />
                    <span className="absolute inset-y-0 end-4 flex items-center text-[13px] font-bold text-[#A0A8A4]">{t('wizard.unit.kg')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="wiz-label" htmlFor="wz-waist">
                  {language === 'ar' ? 'محيط الخصر' : 'Waist circumference'}{' '}
                  <span className="font-medium text-[#A0A8A4]">{language === 'ar' ? '(اختياري)' : '(optional)'}</span>
                </label>
                <div className="relative">
                  <input
                    id="wz-waist"
                    inputMode="numeric"
                    value={waist}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setWaist(value);
                      updateProfile({ waist: value ? Number(value) : null });
                    }}
                    className={`${inputDefault} pr-16`}
                  />
                  <span className="absolute inset-y-0 end-4 flex items-center text-[13px] font-bold text-[#A0A8A4]">{t('wizard.unit.cm')}</span>
                </div>
              </div>

              {numbers && (
                <div className="mt-5 rounded-[16px] bg-[#F4F1EB] border border-[#EFEBE4] px-4 py-3 text-[12px] text-[#6B7A75] leading-snug">
                  BMI <span className="num font-bold text-[#0F4C3A]">{numbers.bmi}</span> · {numbers.bmiCat} ·{' '}
                  {t('wizard.step2.maintenance')} <span className="num font-bold text-[#0F4C3A]">{numbers.tdeeBase}</span> kcal
                </div>
              )}
            </div>
            <WizardFooter onBack={back} onNext={next} nextDisabled={!isValid()} backLabel={t('wizard.back')} nextLabel={t('wizard.continue')} />
          </div>
        )}

        {step === 4 && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-6`}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F4C3A] text-white">
                  <Moon size={20} />
                </span>
                <div>
                  <h2 className="text-[18px] font-extrabold leading-none">{language === 'ar' ? 'نمط حياتك اليومي' : 'Your Daily Lifestyle'}</h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{language === 'ar' ? 'هذه التفاصيل تساعدنا على فهم روتينك.' : 'These details help us understand your routine.'}</p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <span className="wiz-label inline-flex items-center gap-1.5"><Moon size={14} /> {language === 'ar' ? 'ساعات النوم ليلاً' : 'Sleep hours per night'}</span>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {SLEEP_OPTIONS.map((o) => (
                      <OptionChip key={o.value} on={sleepHours === o.value} onClick={() => { setSleepHours(o.value); updateProfile({ sleepHours: o.value }); }}>
                        {language === 'ar' ? o.ar : o.en}
                      </OptionChip>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="wiz-label inline-flex items-center gap-1.5"><Smile size={14} /> {language === 'ar' ? 'مستوى التوتر' : 'Stress level'}</span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {STRESS_OPTIONS.map((o) => (
                      <OptionChip key={o.value} on={stressLevel === o.value} onClick={() => { setStressLevel(o.value); updateProfile({ stressLevel: o.value }); }}>
                        {language === 'ar' ? o.ar : o.en}
                      </OptionChip>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="wiz-label inline-flex items-center gap-1.5"><Briefcase size={14} /> {language === 'ar' ? 'طبيعة العمل' : 'Work type'}</span>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {WORK_TYPE_OPTIONS.map((o) => (
                      <OptionChip key={o.value} on={workType === o.value} onClick={() => { setWorkType(o.value); updateProfile({ workType: o.value }); }}>
                        {language === 'ar' ? o.ar : o.en}
                      </OptionChip>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="wiz-label inline-flex items-center gap-1.5"><Droplets size={14} /> {language === 'ar' ? 'شرب الماء (كوب/يوم)' : 'Water intake (glasses/day)'}</span>
                  <Stepper value={waterGlasses} min={0} max={20} onChange={(v) => { setWaterGlasses(v); updateProfile({ waterGlasses: v }); }} suffix={language === 'ar' ? 'كوب' : 'glasses'} />
                </div>

                <div>
                  <span className="wiz-label inline-flex items-center gap-1.5"><Cigarette size={14} /> {language === 'ar' ? 'التدخين' : 'Smoking'}</span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {SMOKING_OPTIONS.map((o) => (
                      <OptionChip key={o.value} on={smoking === o.value} onClick={() => { setSmoking(o.value); updateProfile({ smoking: o.value }); }}>
                        {language === 'ar' ? o.ar : o.en}
                      </OptionChip>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="wiz-label inline-flex items-center gap-1.5"><Coffee size={14} /> {language === 'ar' ? 'الكافيين (كوب/يوم)' : 'Caffeine (cups/day)'}</span>
                  <Stepper value={caffeineCups} min={0} max={10} onChange={(v) => { setCaffeineCups(v); updateProfile({ caffeineCups: v }); }} suffix={language === 'ar' ? 'كوب' : 'cups'} />
                </div>
              </div>
            </div>
            <WizardFooter onBack={back} onNext={next} nextDisabled={!isValid()} backLabel={t('wizard.back')} nextLabel={t('wizard.continue')} />
          </div>
        )}

        {step === 5 && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-6`}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F4C3A] text-white">
                  <UtensilsCrossed size={20} />
                </span>
                <div>
                  <h2 className="text-[18px] font-extrabold leading-none">{language === 'ar' ? 'عاداتك الغذائية' : 'Your Dietary Habits'}</h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{language === 'ar' ? 'أخبرنا كيف تأكل عادةً.' : 'Tell us how you usually eat.'}</p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <span className="wiz-label inline-flex items-center gap-1.5"><UtensilsCrossed size={14} /> {language === 'ar' ? 'عدد الوجبات يومياً' : 'Meals per day'}</span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {MEALS_PER_DAY_OPTIONS.map((o) => (
                      <OptionChip key={o.value} on={mealsPerDay === o.value} onClick={() => { setMealsPerDay(o.value); updateProfile({ mealsPerDay: o.value }); }}>
                        {language === 'ar' ? o.ar : o.en}
                      </OptionChip>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="wiz-label inline-flex items-center gap-1.5"><Cookie size={14} /> {language === 'ar' ? 'وجبات خفيفة بين الوجبات' : 'Snacks between meals'}</span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {SNACK_OPTIONS.map((o) => (
                      <OptionChip key={o.value} on={snacksBetweenMeals === o.value} onClick={() => { setSnacksBetweenMeals(o.value); updateProfile({ snacksBetweenMeals: o.value }); }}>
                        {language === 'ar' ? o.ar : o.en}
                      </OptionChip>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="wiz-label inline-flex items-center gap-1.5"><Sun size={14} /> {language === 'ar' ? 'الفطور' : 'Breakfast'}</span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {BREAKFAST_OPTIONS.map((o) => (
                      <OptionChip key={o.value} on={breakfastType === o.value} onClick={() => { setBreakfastType(o.value); updateProfile({ breakfastType: o.value }); }}>
                        {language === 'ar' ? o.ar : o.en}
                      </OptionChip>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="wiz-label inline-flex items-center gap-1.5"><Beef size={14} /> {language === 'ar' ? 'تكرار تناول اللحوم' : 'Meat frequency'}</span>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {MEAT_OPTIONS.map((o) => (
                      <OptionChip key={o.value} on={meatFrequency === o.value} onClick={() => { setMeatFrequency(o.value); updateProfile({ meatFrequency: o.value }); }}>
                        {language === 'ar' ? o.ar : o.en}
                      </OptionChip>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="wiz-label inline-flex items-center gap-1.5"><Salad size={14} /> {language === 'ar' ? 'تكرار تناول الخضروات' : 'Vegetables frequency'}</span>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {VEGETABLE_OPTIONS.map((o) => (
                      <OptionChip key={o.value} on={vegetablesFrequency === o.value} onClick={() => { setVegetablesFrequency(o.value); updateProfile({ vegetablesFrequency: o.value }); }}>
                        {language === 'ar' ? o.ar : o.en}
                      </OptionChip>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="wiz-label inline-flex items-center gap-1.5"><CupSoda size={14} /> {language === 'ar' ? 'المشروبات السكرية' : 'Sugary drinks'}</span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {SUGARY_DRINK_OPTIONS.map((o) => (
                      <OptionChip key={o.value} on={sugaryDrinks === o.value} onClick={() => { setSugaryDrinks(o.value); updateProfile({ sugaryDrinks: o.value }); }}>
                        {language === 'ar' ? o.ar : o.en}
                      </OptionChip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <WizardFooter onBack={back} onNext={next} nextDisabled={!isValid()} backLabel={t('wizard.back')} nextLabel={t('wizard.continue')} />
          </div>
        )}

        {step === 6 && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-6`}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F4C3A] text-white">
                  <Sparkles size={20} />
                </span>
                <div>
                  <h2 className="text-[18px] font-extrabold leading-none">{language === 'ar' ? 'ما الذي ترغب في تحقيقه؟' : 'What would you like to achieve?'}</h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{language === 'ar' ? 'اختر ما يناسبك، وسنخصص خطتك بناءً عليه.' : 'Choose what matters most and we’ll tailor your plan around it.'}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {GOAL_DISCOVERY_OPTIONS.map((option) => (
                  <OptionChip
                    key={option.id}
                    on={goalDiscovery === option.id}
                    onClick={() => {
                      setGoalDiscovery(option.id);
                      updateProfile({ goalDiscovery: option.id });
                    }}
                    className="w-full min-h-[56px]"
                  >
                    <span>{option.icon}</span>
                    <span>{language === 'ar' ? option.ar : option.en}</span>
                  </OptionChip>
                ))}
              </div>
            </div>
            <WizardFooter onBack={back} onNext={next} nextDisabled={!isValid()} backLabel={t('wizard.back')} nextLabel={t('wizard.continue')} />
          </div>
        )}

        {step === 7 && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-6`}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F4C3A] text-white">
                  <Sparkles size={20} />
                </span>
                <div>
                  <h2 className="text-[18px] font-extrabold leading-none">{language === 'ar' ? 'اختر أهدافك' : 'Select Your Goals'}</h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{language === 'ar' ? 'يمكنك اختيار 1-3 أهداف.' : 'You can select 1–3 goals.'}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {GOAL_SELECTION_OPTIONS.map((option) => {
                  const on = goals.includes(option.id);
                  const disabled = !on && goals.length >= 3;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleGoalSelection(option.id)}
                      disabled={disabled}
                      className={`flex min-h-[58px] items-center gap-3 rounded-[16px] border-2 px-4 py-3 text-start text-[13px] font-bold transition-all ${on ? 'border-[#0F4C3A] bg-[#EAF3ED] text-[#0F4C3A]' : 'border-[#EFEBE4] bg-white text-[#6B7A75] hover:border-[#D4A017]'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-[18px]">{option.icon}</span>
                      <span className="flex-1">{language === 'ar' ? option.ar : option.en}</span>
                      {on && <span aria-hidden="true" className="text-[#B8860B]">✓</span>}
                    </button>
                  );
                })}
              </div>

              {hasConflictGoals && (
                <div className="mt-4 rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 text-[12px] font-semibold text-red-600 leading-snug">
                  {language === 'ar' ? 'لا يمكن اختيار "إنقاص الوزن" و"الحفاظ على الوزن" معاً.' : '"Lose Weight" and "Maintain Weight" cannot be selected together.'}
                </div>
              )}
            </div>

            {goals.includes('lose_weight') && (
              <div className={`${cardBase} p-6`}>
                <h2 className="text-[18px] font-extrabold">{language === 'ar' ? 'الوزن المستهدف والمدة' : 'Target Weight & Timeline'}</h2>
                <p className="mt-1 text-[12.5px] text-[#6B7A75]">{language === 'ar' ? 'حدد وزنك المستهدف والمدة المناسبة.' : 'Set your target weight and desired timeline.'}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div>
                    <label className="wiz-label" htmlFor="targetWeight">{t('wizard.step4.targetWeight')}</label>
                    <input id="targetWeight" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value.replace(/[^0-9.]/g, ''))} inputMode="decimal" className={`${inputDefault} pr-12`} />
                  </div>
                  <div>
                    <label className="wiz-label" htmlFor="timeline">{t('wizard.step4.timeline')}</label>
                    <input id="timeline" value={timeline} onChange={(e) => setTimeline(e.target.value.replace(/\D/g, ''))} inputMode="numeric" className={`${inputDefault} pr-16`} />
                  </div>
                </div>
                {lossKgPerWeek !== null && (
                  <div className="mt-3 rounded-[14px] bg-[#F4F1EB] px-4 py-3 text-[12px] text-[#6B7A75] leading-relaxed">
                    {language === 'ar' ? 'خسارة ' : 'Losing '}
                    <span className="num font-bold text-[#0F4C3A]">{(lossKgPerWeek * targetWeeks / (targetWeeks > 0 ? targetWeeks : 1)).toFixed(1)}</span>
                    {language === 'ar' ? ' كجم في ' : ' kg in '}
                    {targetWeeks}
                    {language === 'ar' ? ' أسبوع = ' : ' weeks = '}
                    <span className="num font-bold text-[#0F4C3A]">{lossKgPerWeek.toFixed(2)}</span>
                    {language === 'ar' ? ' كجم/أسبوع. ' : ' kg/week. '}
                    {safeLoss ? (language === 'ar' ? 'معدل آمن.' : 'Safe rate.') : (language === 'ar' ? 'قد يكون المعدل مرتفعاً — راجع طبيبك.' : 'Rate may be high — consult your doctor.')}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={back} className="btn-secondary flex-1 h-[54px] rounded-[16px] text-[15px] font-bold">{t('wizard.back')}</button>
              <button type="button" onClick={next} disabled={!isValid()} className="btn-primary flex-1 h-[54px] rounded-[16px] text-[15px] font-bold disabled:cursor-not-allowed disabled:opacity-40">{t('wizard.continue')}</button>
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-6`}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF3ED] text-[#0F4C3A]"><Target size={22} /></span>
                <div>
                  <h2 className="text-[18px] font-extrabold">{language === 'ar' ? 'هل لديك منطقة محددة تريد العمل عليها؟' : 'Do you have a specific body area you want to work on?'}</h2>
                  <p className="mt-1 text-[13px] text-[#6B7A75]">{language === 'ar' ? 'هذا السؤال اختياري. اختر كل ما ينطبق.' : 'This is optional. Select all that apply.'}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {[
                  { id: 'belly_fat' as const, en: 'Belly Fat', ar: 'الكرش' },
                  { id: 'love_handles' as const, en: 'Love Handles', ar: 'الجوانب' },
                  { id: 'chest_sagging' as const, en: 'Chest Sagging', ar: 'ترهل الصدر' },
                  { id: 'arm_fat' as const, en: 'Arm Fat', ar: 'الذراعين' },
                  { id: 'thigh_fat' as const, en: 'Thigh Fat', ar: 'الفخذين' },
                  { id: 'back_fat' as const, en: 'Back Fat', ar: 'الظهر' },
                  { id: 'none' as const, en: 'None of the above', ar: 'لا شيء مما سبق' },
                ].map((concern) => {
                  const on = bodyConcerns.includes(concern.id);
                  return (
                    <OptionChip
                      key={concern.id}
                      on={on}
                      onClick={() => toggleBodyConcern(concern.id)}
                      className={concern.id === 'none' ? 'col-span-2' : ''}
                    >
                      {language === 'ar' ? concern.ar : concern.en}
                    </OptionChip>
                  );
                })}
              </div>
            </div>

            <WizardFooter onBack={back} onNext={next} nextDisabled={!isValid()} backLabel={t('wizard.back')} nextLabel={t('wizard.continue')} />
          </div>
        )}

        {step === 9 && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-5 sm:p-6`}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF3ED] text-[#0F4C3A]"><Dumbbell size={22} /></span>
                <div>
                  <h2 className="text-[18px] font-extrabold">{language === 'ar' ? 'تمارين مقترحة بناءً على أهدافك' : 'Exercise recommendations based on your goals'}</h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{language === 'ar' ? 'توصيات مخصصة يمكنك قبولها أو تعديلها.' : 'Personalized suggestions you can accept or adjust.'}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-[16px] bg-[#F4F1EB] p-4">
                  <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-[#8A938E]"><Activity size={16} />{language === 'ar' ? 'مستوى النشاط المقترح' : 'Recommended Activity Level'}</div>
                  <p className="mt-2 text-[16px] font-extrabold text-[#0F4C3A]">{ACTIVITY_LABEL(recommendedActivityLevel)}</p>
                </div>
                <div className="rounded-[16px] bg-[#F4F1EB] p-4">
                  <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-[#8A938E]"><Target size={16} />{language === 'ar' ? 'التركيز الأسبوعي' : 'Weekly Focus'}</div>
                  <p className="mt-2 text-[14px] font-extrabold text-[#0F4C3A]">{weeklyExerciseFocus}</p>
                </div>
                <div className="rounded-[16px] bg-[#F4F1EB] p-4">
                  <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-[#8A938E]"><Timer size={16} />{language === 'ar' ? 'مدة الجلسة' : 'Session Duration'}</div>
                  <p className="mt-2 text-[16px] font-extrabold text-[#0F4C3A]">{recommendedActivityLevel === 'light' ? 20 : 30} {language === 'ar' ? 'دقيقة' : 'min'}</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[14px] font-extrabold">{language === 'ar' ? 'أنواع التمارين' : 'Exercise Types'}</h3>
                  <button type="button" aria-pressed={adjustingExerciseRecommendations} onClick={() => setAdjustingExerciseRecommendations((editing) => !editing)} className="min-h-10 rounded-full border border-[#0F4C3A]/20 bg-white px-4 text-xs font-bold text-[#0F4C3A] hover:bg-[#E9F2EA]">
                    {adjustingExerciseRecommendations ? (language === 'ar' ? 'إنهاء التعديل' : 'Done Adjusting') : (language === 'ar' ? 'تعديل' : 'Adjust')}
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {EXERCISE_RECOMMENDATION_OPTIONS.map(({ id, en, ar, Icon }) => (
                    <OptionChip key={id} on={exerciseRecommendationTypes.includes(id)} onClick={() => { if (adjustingExerciseRecommendations) toggleExerciseRecommendation(id); }} className="w-full">
                      <Icon size={16} />{language === 'ar' ? ar : en}
                    </OptionChip>
                  ))}
                </div>
              </div>

              {exerciseMovementSuggestions.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-[13px] font-extrabold">{language === 'ar' ? 'تركيز إضافي مقترح' : 'Additional focus suggestions'}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {exerciseMovementSuggestions.map((suggestion) => <span key={suggestion.en} className="rounded-full border border-[#DDE9DF] bg-[#F3F8F3] px-3 py-2 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? suggestion.ar : suggestion.en}</span>)}
                  </div>
                </div>
              )}
            </div>

            <p className="rounded-[16px] border border-[#E9D9A8] bg-[#FFF8E7] px-4 py-3 text-[12px] leading-relaxed text-[#6B5A28]">
              {language === 'ar' ? 'استشر دائماً مختصاً قبل البدء ببرنامج تمارين جديد.' : 'Always consult a professional before starting a new exercise program.'}
            </p>

            <WizardFooter onBack={back} onNext={next} backLabel={t('wizard.back')} nextLabel={adjustingExerciseRecommendations ? (language === 'ar' ? 'حفظ ومتابعة' : 'Save & Continue') : (language === 'ar' ? 'قبول ومتابعة' : 'Accept & Continue')} />
          </div>
        )}

        {step === 11 && (
          <div className="mt-6 space-y-5">
            <div className="rounded-[18px] border border-[#DDE9DF] bg-[#F3F8F3] px-4 py-4 sm:px-5">
              <div className="flex items-center gap-2 text-[#0F4C3A]"><Sparkles size={18} /><h2 className="text-[16px] font-extrabold">{language === 'ar' ? 'ملخص توصياتك الشخصية' : 'Your Personalized Recommendations'}</h2></div>
              <p className="mt-1 text-[12px] leading-relaxed text-[#52635A]">{language === 'ar' ? 'تم إعدادها بناءً على أهدافك وقياساتك وعاداتك واختياراتك.' : 'Based on your goals, measurements, habits, and choices.'}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className={`${cardBase} p-4`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2"><Salad size={18} className="shrink-0 text-[#0F4C3A]" /><h3 className="text-[13px] font-extrabold">{language === 'ar' ? 'نوع النظام الغذائي' : 'Recommended Diet Type'}</h3></div>
                  <button type="button" onClick={() => setStep(5)} className="min-h-9 shrink-0 rounded-full border border-[#0F4C3A]/20 px-3 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                </div>
                <p className="mt-3 text-[17px] font-extrabold text-[#0F4C3A]">{finalRecommendations.dietType}</p>
                {diabetesConcern && <p className="mt-1 text-[11px] text-[#6B7A75]">{language === 'ar' ? 'اختير منخفض الكربوهيدرات لمراعاة السكري.' : 'Low-carb selected to account for diabetes.'}</p>}
              </div>

              <div className={`${cardBase} p-4`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2"><Activity size={18} className="shrink-0 text-[#0F4C3A]" /><h3 className="text-[13px] font-extrabold">{language === 'ar' ? 'السعرات اليومية' : 'Daily Calorie Target'}</h3></div>
                  <button type="button" onClick={() => setStep(7)} className="min-h-9 shrink-0 rounded-full border border-[#0F4C3A]/20 px-3 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                </div>
                <p className="num mt-3 text-[26px] font-black text-[#0F4C3A]">{finalRecommendations.dailyCalories}<span className="ms-1 text-[11px] font-bold text-[#6B7A75]">kcal/day</span></p>
                <p className="mt-1 text-[11px] text-[#6B7A75]">
                  {numbers ? `BMR ${numbers.bmr} · TDEE ${numbers.tdeeWorkout}` : (language === 'ar' ? 'تقدير أولي، حدّث قياساتك لمزيد من الدقة.' : 'Estimate; add measurements for better accuracy.')}
                  {goals.includes('lose_weight') ? (language === 'ar' ? ' · عجز 400 سعرة' : ' · 400 kcal deficit') : goals.includes('build_muscle') ? (language === 'ar' ? ' · فائض 250 سعرة' : ' · 250 kcal surplus') : ''}
                </p>
              </div>

              <div className={`${cardBase} p-4`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2"><Beef size={18} className="shrink-0 text-[#0F4C3A]" /><h3 className="text-[13px] font-extrabold">{language === 'ar' ? 'توزيع المغذيات الكبرى' : 'Macro Breakdown'}</h3></div>
                  <button type="button" onClick={() => setStep(7)} className="min-h-9 shrink-0 rounded-full border border-[#0F4C3A]/20 px-3 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                </div>
                <div className="mt-4 flex h-4 overflow-hidden rounded-full bg-[#F4F1EB]" role="img" aria-label={`${finalRecommendations.macroPercentages.protein}% protein, ${finalRecommendations.macroPercentages.carbs}% carbs, ${finalRecommendations.macroPercentages.fat}% fat`}>
                  <span style={{ width: `${finalRecommendations.macroPercentages.protein}%` }} className="bg-[#0F4C3A]" />
                  <span style={{ width: `${finalRecommendations.macroPercentages.carbs}%` }} className="bg-[#D4A017]" />
                  <span style={{ width: `${finalRecommendations.macroPercentages.fat}%` }} className="bg-[#6A9FB5]" />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1 text-[10px] font-bold text-[#52635A]">
                  <span>{language === 'ar' ? 'بروتين' : 'Protein'} {finalRecommendations.macroPercentages.protein}%</span>
                  <span className="text-center">{language === 'ar' ? 'كربوهيدرات' : 'Carbs'} {finalRecommendations.macroPercentages.carbs}%</span>
                  <span className="text-end">{language === 'ar' ? 'دهون' : 'Fat'} {finalRecommendations.macroPercentages.fat}%</span>
                </div>
                {bodyConcerns.includes('belly_fat') && <p className="mt-2 text-[11px] text-[#6B7A75]">{language === 'ar' ? 'بروتين أعلى وكربوهيدرات معتدلة.' : 'Higher protein with moderate carbohydrates.'}</p>}
              </div>

              <div className={`${cardBase} p-4`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2"><UtensilsCrossed size={18} className="shrink-0 text-[#0F4C3A]" /><h3 className="text-[13px] font-extrabold">{language === 'ar' ? 'الوجبات يومياً' : 'Meals per Day'}</h3></div>
                  <button type="button" onClick={() => setStep(5)} className="min-h-9 shrink-0 rounded-full border border-[#0F4C3A]/20 px-3 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                </div>
                <p className="mt-3 text-[23px] font-black text-[#0F4C3A]">{finalRecommendations.mealsPerDay}<span className="ms-1 text-[12px] font-bold text-[#6B7A75]">{language === 'ar' ? 'وجبات' : 'meals'}</span></p>
              </div>

              <div className={`${cardBase} p-4 sm:col-span-2`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2"><Dumbbell size={18} className="shrink-0 text-[#0F4C3A]" /><h3 className="text-[13px] font-extrabold">{language === 'ar' ? 'ملخص التمارين' : 'Exercise Summary'}</h3></div>
                  <button type="button" onClick={() => setStep(9)} className="min-h-9 shrink-0 rounded-full border border-[#0F4C3A]/20 px-3 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {finalRecommendations.exerciseSummary.map((id) => {
                    const option = EXERCISE_RECOMMENDATION_OPTIONS.find((exercise) => exercise.id === id);
                    return option ? <span key={id} className="rounded-full bg-[#EAF3ED] px-3 py-2 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? option.ar : option.en}</span> : null;
                  })}
                  {finalRecommendations.exerciseSummary.length === 0 && <span className="text-[12px] text-[#6B7A75]">{language === 'ar' ? 'لم يتم اختيار تمارين.' : 'No exercises selected.'}</span>}
                  {exerciseMovementSuggestions.map((suggestion) => <span key={suggestion.en} className="rounded-full border border-[#DDE9DF] bg-white px-3 py-2 text-[11px] font-semibold text-[#52635A]">{language === 'ar' ? suggestion.ar : suggestion.en}</span>)}
                </div>
              </div>

              <div className={`${cardBase} p-4 sm:col-span-2`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2"><Flag countryCode={selectedKitchen.flag} alt={getKitchenCountry(selectedKitchen, language)} className="h-6 w-8 shrink-0" /><h3 className="text-[13px] font-extrabold">{language === 'ar' ? 'مطبخ خطة الوجبات' : 'Meal Plan Cuisine'}</h3></div>
                  <button type="button" onClick={() => setStep(10)} className="min-h-9 shrink-0 rounded-full border border-[#0F4C3A]/20 px-3 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                </div>
                <p className="mt-2 text-[15px] font-extrabold text-[#0F4C3A]">{kitchenLabel(selectedKitchen)}</p>
              </div>
            </div>

            <WizardFooter onBack={back} onNext={next} backLabel={t('wizard.back')} nextLabel={language === 'ar' ? 'متابعة' : 'Continue'} />
          </div>
        )}

        {step === 11 && kitchenMode === null && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-6`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[18px] font-extrabold">{language === 'ar' ? 'معاينة خطتك' : 'Your Plan Preview'}</h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{language === 'ar' ? 'ملخص سريع قبل المراجعة النهائية.' : 'A quick summary before your final review.'}</p>
                </div>
                <button type="button" onClick={() => setStep(12)} className="min-h-10 rounded-full border border-[#0F4C3A]/20 bg-white px-4 text-xs font-bold text-[#0F4C3A] hover:bg-[#E9F2EA]">{language === 'ar' ? 'تعديل الهدف' : 'Edit'}</button>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-[16px] bg-[#F4F1EB] p-3">
                  <div className="text-[10px] font-extrabold uppercase text-[#8A938E]">{language === 'ar' ? 'السعرات اليومية' : 'Daily calories'}</div>
                  <div className="num mt-1 text-[20px] font-black text-[#0F4C3A]">{numbers?.targetCal ?? 0}</div>
                  <div className="text-[10px] text-[#6B7A75]">kcal/day</div>
                </div>
                <div className="rounded-[16px] bg-[#F4F1EB] p-3">
                  <div className="text-[10px] font-extrabold uppercase text-[#8A938E]">{language === 'ar' ? 'المغذيات الكبرى' : 'Macros'}</div>
                <div className="mt-1 text-[11px] font-bold leading-relaxed text-[#0F4C3A]">Protein {numbers?.protein ?? 0}g · Carbs {numbers?.carbs ?? 0}g · Fat {numbers?.fat ?? 0}g</div>
                </div>
                <div className="rounded-[16px] bg-[#F4F1EB] p-3">
                  <div className="text-[10px] font-extrabold uppercase text-[#8A938E]">{language === 'ar' ? 'الوجبات يومياً' : 'Meals per day'}</div>
                  <div className="mt-1 text-[20px] font-black text-[#0F4C3A]">4</div>
                </div>
                <div className="rounded-[16px] bg-[#F4F1EB] p-3">
                  <div className="text-[10px] font-extrabold uppercase text-[#8A938E]">{language === 'ar' ? 'المطبخ' : 'Kitchen'}</div>
                  <div className="mt-1 truncate text-[12px] font-extrabold text-[#0F4C3A]">{kitchenLabel(selectedKitchen)}</div>
                </div>
              </div>
            </div>

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
                        className="rounded-[20px] border-2 border-[#EFEBE4] bg-white hover:border-[#D4A017] p-4 flex flex-col items-center text-center cursor-pointer min-w-0 transition-all active:scale-95"
                      >
                        <RegionMarker value={r.emoji} label={regionLabel(r)} className="text-[34px] leading-none" />
                        <span className="mt-2 text-[14px] font-extrabold leading-none truncate max-w-full text-[#0F4C3A]">{regionLabel(r)}</span>
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
                        <RegionMarker value={r.emoji} label={language === 'ar' ? r.ar : r.en} className="text-[24px] leading-none" />
                        <span className="text-[16px] font-extrabold text-[#0F4C3A]">{regionLabel(r)}</span>
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
                          className={`w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] rounded-[20px] border-2 p-4 flex flex-col items-center text-center cursor-pointer min-w-0 transition-all active:scale-95 ${on ? 'border-[#D4A017] bg-[#FFFBEF] shadow-[0_0_0_4px_rgba(212,160,23,0.15)]' : 'border-[#EFEBE4] bg-white hover:border-[#D4A017]'}`}
                        >
                          <Flag countryCode={k.flag} alt={getKitchenCountry(k, language)} className="h-[34px] w-[44px]" />
                          <span className={`mt-2 text-[14px] font-extrabold leading-none truncate max-w-full text-[#0F4C3A]`}>{getKitchenCountry(k, language)}</span>
                          <span className="mt-1 text-[11px] text-[#6B7A75] leading-tight truncate max-w-full">{kitchenLabel(k)}</span>
                          {k.id === 'eastern-european' && <span className="mt-1 text-[10px] text-[#8A938E]">{t('kitchen.eastern-european.description')}</span>}
                          {k.id === 'mexican' && <span className="mt-1 text-[10px] text-[#8A938E]">{t('kitchen.mexican.description')}</span>}
                          {k.id === 'argentinian' && <span className="mt-1 text-[10px] text-[#8A938E]">{t('kitchen.argentinian.description')}</span>}
                          {k.id === 'colombian' && <span className="mt-1 text-[10px] text-[#8A938E]">{t('kitchen.colombian.description')}</span>}
                          {k.id === 'peruvian' && <span className="mt-1 text-[10px] text-[#8A938E]">{t('kitchen.peruvian.description')}</span>}
                          {k.id === 'chilean' && <span className="mt-1 text-[10px] text-[#8A938E]">{t('kitchen.chilean.description')}</span>}
                          {k.sample && <span className="mt-1.5 text-[10.5px] text-[#8A938E] truncate max-w-full">🍽 {getDishName(k.sample, language)}</span>}
                          <span className={`mt-2 text-[11px] font-bold px-2.5 py-1 rounded-full ${on ? 'bg-[#D4A017] text-[#0F4C3A]' : 'bg-[#F4F1EB] text-[#6B7A75]'}`}>
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
                      : `Back to ${REGIONS.find((x) => x.id === regionSel) ? regionLabel(REGIONS.find((x) => x.id === regionSel)!) : ''}`}
                  </button>
                  {(() => {
                    const k = kitchens.find((x) => x.id === cuisineSel);
                    return k ? (
                      <div className="mt-3 rounded-[20px] border-2 border-[#D4A017] bg-[#FFFBEF] p-4 flex flex-col items-center text-center">
                        <Flag countryCode={k.flag} alt={getKitchenCountry(k, language)} className="h-[34px] w-[44px]" />
                        <span className="mt-2 text-[14px] font-extrabold leading-none truncate max-w-full text-[#0F4C3A]">{getKitchenCountry(k, language)}</span>
                        <span className="mt-1 text-[11px] text-[#6B7A75] leading-tight truncate max-w-full">{kitchenLabel(k)}</span>
                        {k.id === 'eastern-european' && <span className="mt-1 text-[10px] text-[#8A938E]">{t('kitchen.eastern-european.description')}</span>}
                        {k.id === 'mexican' && <span className="mt-1 text-[10px] text-[#8A938E]">{t('kitchen.mexican.description')}</span>}
                        {k.id === 'argentinian' && <span className="mt-1 text-[10px] text-[#8A938E]">{t('kitchen.argentinian.description')}</span>}
                        {k.id === 'colombian' && <span className="mt-1 text-[10px] text-[#8A938E]">{t('kitchen.colombian.description')}</span>}
                        {k.id === 'peruvian' && <span className="mt-1 text-[10px] text-[#8A938E]">{t('kitchen.peruvian.description')}</span>}
                        {k.id === 'chilean' && <span className="mt-1 text-[10px] text-[#8A938E]">{t('kitchen.chilean.description')}</span>}
                        {k.sample && <span className="mt-1.5 text-[10.5px] text-[#8A938E] truncate max-w-full">🍽 {getDishName(k.sample, language)}</span>}
                        <span className="mt-2 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#D4A017] text-[#0F4C3A]">
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
                   const pickedCid = picked ? KITCHEN_ID_ALIAS[picked.id] ?? picked.id : '';
                  const hasRegions = !!picked && (pickedCid === 'kuwaiti' || pickedCid === 'qatar' || pickedCid === 'bahraini' || pickedCid === 'omani' || pickedCid === 'moroccan' || pickedCid === 'egyptian' || pickedCid === 'tunisian' || pickedCid === 'algerian' || pickedCid === 'libyan' || pickedCid === 'lebanese' || pickedCid === 'syrian' || pickedCid === 'jordanian' || pickedCid === 'palestinian' || pickedCid === 'indian' || pickedCid === 'pakistani' || pickedCid === 'indonesian' || pickedCid === 'malaysian' || pickedCid === 'nigerian' || pickedCid === 'ethiopian' || pickedCid === 'kenyan' || pickedCid === 'south-african' || pickedCid === 'ghanaian' || pickedCid === 'rwandan' || pickedCid === 'seychellois' || pickedCid === 'mauritian' || pickedCid === 'gabonese' || pickedCid === 'botswanan' || pickedCid === 'filipino' || pickedCid === 'thai' || pickedCid === 'vietnamese' || pickedCid === 'chinese' || pickedCid === 'japanese' || pickedCid === 'korean' || pickedCid === 'american' || pickedCid === 'canadian' || pickedCid === 'british' || pickedCid === 'australasian' || pickedCid === 'german' || pickedCid === 'austrian' || pickedCid === 'swiss' || pickedCid === 'french' || pickedCid === 'benelux' || pickedCid === 'italian' || pickedCid === 'spanish' || pickedCid === 'greek' || pickedCid === 'turkish' || (Array.isArray(picked.regions) && picked.regions.length > 0));
                  if (!hasRegions) return null;
                  return (
                    <div className="rounded-[20px] border-2 border-[#EFEBE4] bg-white p-4">
                      <div className="text-[12px] font-bold text-[#6B7A75]">
                        {language === 'ar' ? '🏷️ اختر المنطقة (تلقائي: عام)' : '🏷️ Choose a region (default: General)'}
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                          {(pickedCid === 'emirati' ? EMIRATI_REGION_META : pickedCid === 'saudi' ? SAUDI_REGION_META : pickedCid === 'kuwaiti' ? KUWAITI_REGION_META : pickedCid === 'qatar' ? QATARI_REGION_META : pickedCid === 'bahraini' ? BAHRAINI_REGION_META : pickedCid === 'omani' ? OMANI_REGION_META : pickedCid === 'moroccan' ? MOROCCAN_REGION_META : pickedCid === 'egyptian' ? EGYPTIAN_REGION_META : pickedCid === 'tunisian' ? TUNISIAN_REGION_META : pickedCid === 'algerian' ? ALGERIAN_REGION_META : pickedCid === 'libyan' ? LIBYAN_REGION_META : pickedCid === 'lebanese' ? LEBANESE_REGION_META : pickedCid === 'syrian' ? SYRIAN_REGION_META : pickedCid === 'jordanian' ? JORDANIAN_REGION_META : pickedCid === 'palestinian' ? PALESTINIAN_REGION_META : pickedCid === 'indian' ? INDIAN_REGION_META : pickedCid === 'pakistani' ? PAKISTANI_REGION_META : pickedCid === 'indonesian' ? INDONESIAN_REGION_META : pickedCid === 'malaysian' ? MALAYSIAN_REGION_META : pickedCid === 'nigerian' ? NIGERIAN_REGION_META : pickedCid === 'ethiopian' ? ETHIOPIAN_REGION_META : pickedCid === 'kenyan' ? KENYAN_REGION_META : pickedCid === 'south-african' ? SOUTH_AFRICAN_REGION_META : pickedCid === 'ghanaian' ? GHANAIAN_REGION_META : pickedCid === 'rwandan' ? RWANDAN_REGION_META : pickedCid === 'seychellois' ? SEYCHELLOIS_REGION_META : pickedCid === 'mauritian' ? MAURITIAN_REGION_META : pickedCid === 'gabonese' ? GABONESE_REGION_META : pickedCid === 'botswanan' ? BOTSWANAN_REGION_META : pickedCid === 'filipino' ? FILIPINO_REGION_META : pickedCid === 'thai' ? THAI_REGION_META : pickedCid === 'vietnamese' ? VIETNAMESE_REGION_META : pickedCid === 'chinese' ? CHINESE_REGION_META : pickedCid === 'japanese' ? JAPANESE_REGION_META : pickedCid === 'korean' ? KOREAN_REGION_META : pickedCid === 'taiwanese' ? TAIWANESE_REGION_META : pickedCid === 'american' ? AMERICAN_REGION_META : pickedCid === 'canadian' ? CANADIAN_REGION_META : pickedCid === 'british' ? BRITISH_REGION_META : pickedCid === 'australasian' ? AUSTRALASIAN_REGION_META : pickedCid === 'german' ? GERMAN_REGION_META : pickedCid === 'austrian' ? AUSTRIAN_REGION_META : pickedCid === 'french' ? FRENCH_REGION_META : pickedCid === 'benelux' ? BENELUX_REGION_META : pickedCid === 'italian' ? ITALIAN_REGION_META : pickedCid === 'spanish' ? SPANISH_REGION_META : pickedCid === 'greek' ? GREEK_REGION_META : pickedCid === 'turkish' ? TURKISH_REGION_META : pickedCid === 'swiss' ? SWISS_REGION_META : []).map((r) => {
                          const on = kitchenRegion === r.id;
                          return (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => setKitchenRegion(r.id)}
                              className={`rounded-full border-2 px-3 py-1.5 text-[12px] font-bold flex items-center gap-1.5 transition-all active:scale-95 ${on ? 'border-[#D4A017] bg-[#FFFBEF] text-[#0F4C3A] shadow-[0_0_0_3px_rgba(212,160,23,0.15)]' : 'border-[#EFEBE4] bg-white text-[#6B7A75] hover:border-[#D4A017]'}`}
                            >
                              <RegionMarker value={r.emoji} label={language === 'ar' ? r.ar : r.en} />
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
                  onClick={() => runAutoKitchen()}
                  disabled={autoBuilding}
                  className={`w-full h-[56px] rounded-full bg-[#D4A017] text-[#0F4C3A] font-extrabold text-[15px] flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(212,160,23,0.45)] transition-all ${autoBuilding ? 'opacity-70 cursor-wait' : 'hover:translate-y-[-1px] active:scale-95'}`}
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
                {t('wizard.continue')}
              </button>
            </div>
          </div>
        )}

        {step === 10 && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-5 sm:p-6`}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF3ED] text-[#0F4C3A]"><UtensilsCrossed size={21} /></span>
                <div>
                  <h2 className="text-[18px] font-extrabold">{language === 'ar' ? 'أي مطبخ تفضله لخطة وجباتك؟' : 'Which cuisine would you like for your meal plan?'}</h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{language === 'ar' ? 'اختر بنفسك أو دعنا نفاجئك باختيار يناسب هدفك.' : 'Choose a cuisine or let us recommend one for your goal.'}</p>
                </div>
              </div>

              {!kitchenSelectionAccepted && (
                <div className="mt-5">
                  <div
                    role="tablist"
                    aria-label={language === 'ar' ? 'تصفّح المطابخ حسب المنطقة' : 'Browse kitchens by region'}
                    aria-orientation="horizontal"
                    className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
                  >
                    {CUISINE_REGIONS.map((region, index) => {
                      const active = activeCuisineRegion === region.id;
                      const regionName = region.translationKey ? t(region.translationKey) : (language === 'ar' ? region.ar : region.en);
                      const dishTotal = kitchensByCuisineRegion[region.id].reduce((sum, kitchen) => sum + (kitchenCounts[kitchen.id] ?? kitchen.total), 0);
                      const formatNumber = (value: number) => new Intl.NumberFormat(language === 'ar' ? 'ar' : 'en-US').format(value);
                      return (
                        <button
                          key={region.id}
                          ref={(element) => { cuisineRegionTabRefs.current[region.id] = element; }}
                          id={`kitchen-region-tab-${region.id}`}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          aria-controls="kitchen-region-panel"
                          aria-label={`${regionName} · ${formatNumber(dishTotal)} ${language === 'ar' ? 'طبق' : 'dishes'}`}
                          tabIndex={active ? 0 : -1}
                          onClick={() => setActiveCuisineRegion(region.id)}
                          onKeyDown={(event) => {
                            if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
                            event.preventDefault();
                            const direction = language === 'ar' ? -1 : 1;
                            const offset = event.key === 'ArrowRight' ? direction : -direction;
                            const nextRegion = CUISINE_REGIONS[(index + offset + CUISINE_REGIONS.length) % CUISINE_REGIONS.length];
                            setActiveCuisineRegion(nextRegion.id);
                            cuisineRegionTabRefs.current[nextRegion.id]?.focus();
                          }}
                          className={`shrink-0 rounded-full px-4 py-2.5 text-[12px] font-extrabold transition-colors ${active ? 'bg-[#059669] text-white shadow-sm' : 'bg-[#F1F3F2] text-[#34433C] hover:bg-[#E5E9E7]'}`}
                        >
                          {regionName} · {formatNumber(dishTotal)}
                        </button>
                      );
                    })}
                  </div>

                  <div
                    id="kitchen-region-panel"
                    role="tabpanel"
                    aria-labelledby={`kitchen-region-tab-${activeCuisineRegion}`}
                    className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4"
                  >
                    <button
                      type="button"
                      aria-pressed={kitchenMode === 'surprise'}
                      aria-label={language === 'ar' ? 'فاجئني، دعنا نختار المطبخ الأنسب لهدفك' : 'Surprise Me. Let us pick the best kitchen for your goals.'}
                      onClick={selectSurpriseMode}
                      className={`relative flex min-h-[142px] min-w-0 flex-col items-start justify-center rounded-[16px] border-2 border-[#D4A017] bg-[#FFFBEB] p-3 text-start transition-all hover:-translate-y-0.5 hover:shadow-md ${kitchenMode === 'surprise' ? 'ring-2 ring-[#D4A017]/30' : ''}`}
                    >
                      <Sparkles size={19} className="text-[#A47B00]" aria-hidden="true" />
                      <span className="mt-2 text-[12px] font-extrabold text-[#5B470D]">{language === 'ar' ? 'فاجئني' : 'Surprise Me'}</span>
                      <span className="mt-1 text-[10px] leading-snug text-[#79672E]">{language === 'ar' ? 'دعنا نختار أفضل مطبخ يناسب أهدافك.' : 'Let us pick the best kitchen for your goals.'}</span>
                    </button>

                    {kitchensByCuisineRegion[activeCuisineRegion].map((kitchen) => {
                      const selected = kitchenMode === 'manual' && selectedKitchenId === kitchen.id;
                      const dishCount = kitchenCounts[kitchen.id] ?? kitchen.total;
                      const formattedDishCount = new Intl.NumberFormat(language === 'ar' ? 'ar' : 'en-US').format(dishCount);
                      return (
                        <button
                          key={kitchen.id}
                          type="button"
                          aria-pressed={selected}
                          aria-label={`${kitchenLabel(kitchen)}, ${formattedDishCount} ${language === 'ar' ? 'طبق' : 'dishes'}`}
                          onClick={() => chooseKitchen(kitchen)}
                          className={`relative flex min-h-[142px] min-w-0 flex-col items-center justify-center rounded-[16px] border-2 p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-md ${selected ? 'border-green-600 bg-emerald-50 shadow-sm' : 'border-[#E5E9E7] bg-white hover:border-[#A7D9C6]'}`}
                        >
                          {selected && <Check size={17} className="absolute end-2.5 top-2.5 text-green-700" aria-hidden="true" />}
                          <Flag countryCode={kitchen.flag} alt={getKitchenCountry(kitchen, language)} className="h-7 w-9 shrink-0" />
                          <span className="mt-2 w-full truncate text-[12px] font-extrabold text-[#173B30]">{kitchenLabel(kitchen)}</span>
                          <span className="mt-1 text-[10px] font-medium text-[#66756E]">{formattedDishCount} {language === 'ar' ? 'طبق' : 'dishes'}</span>
                        </button>
                      );
                    })}
                  </div>

                  {kitchensByCuisineRegion[activeCuisineRegion].length === 0 && (
                    <p className="mt-3 text-sm text-[#6B7A75]">{language === 'ar' ? 'لا تتوفر مطابخ حالياً.' : 'No cuisines are currently available in this region.'}</p>
                  )}
                </div>
              )}

              {kitchenMode === 'surprise' && recommendedKitchen && !kitchenSelectionAccepted && (
                <div className="mt-5 rounded-[18px] border border-[#DDE9DF] bg-[#F3F8F3] p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <Flag countryCode={recommendedKitchen.flag} alt={getKitchenCountry(recommendedKitchen, language)} className="mt-1 h-8 w-10 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#6B7A75]">{language === 'ar' ? 'مقترح لهدفك' : 'Recommended for your goal'}</p>
                      <h3 className="mt-1 text-[17px] font-extrabold text-[#0F4C3A]">{kitchenLabel(recommendedKitchen)}</h3>
                      <p className="mt-1 text-[12px] text-[#52635A]">{recommendedKitchenBenefit}</p>
                      <p className="mt-1 text-[11px] text-[#6B7A75]">{t('wizard.step3.dishCount').replace('{n}', String(kitchenCounts[recommendedKitchen.id] ?? recommendedKitchen.total))}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button type="button" onClick={acceptSurpriseKitchen} className="btn-primary min-h-[48px] flex-1 rounded-[14px] text-[13px] font-bold">{language === 'ar' ? 'قبول التوصية' : 'Accept'}</button>
                    <button type="button" onClick={() => { setKitchenMode('manual'); setActiveCuisineRegion(cuisineRegionForKitchen(recommendedKitchen.id)); }} className="btn-secondary min-h-[48px] flex-1 rounded-[14px] text-[13px] font-bold">{language === 'ar' ? 'تغيير' : 'Change'}</button>
                  </div>
                </div>
              )}

              {kitchenSelectionAccepted && (
                <div className="mt-5 flex items-center gap-3 rounded-[16px] border border-[#DDE9DF] bg-[#F3F8F3] p-3 sm:p-4">
                  <Flag countryCode={selectedKitchen.flag} alt={getKitchenCountry(selectedKitchen, language)} className="h-7 w-9 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-extrabold text-[#173B30]">{kitchenLabel(selectedKitchen)}</p>
                    <p className="mt-0.5 text-[10px] text-[#66756E]">{new Intl.NumberFormat(language === 'ar' ? 'ar' : 'en-US').format(kitchenCounts[selectedKitchen.id] ?? selectedKitchen.total)} {language === 'ar' ? 'طبق' : 'dishes'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setKitchenMode('manual');
                      setKitchenSelectionAccepted(false);
                      setActiveCuisineRegion(cuisineRegionForKitchen(selectedKitchen.id));
                    }}
                    className="min-h-10 shrink-0 rounded-full border border-[#059669]/30 bg-white px-4 text-[11px] font-extrabold text-[#047857] hover:bg-emerald-50"
                  >
                    {language === 'ar' ? 'تغيير' : 'Change'}
                  </button>
                </div>
              )}
            </div>

            <WizardFooter onBack={back} onNext={next} nextDisabled={!isValid()} backLabel={t('wizard.back')} nextLabel={t('wizard.continue')} />
          </div>
        )}

        {false && step === 10 && (
          <div className="mt-6 space-y-5">
            {(profile.age !== null || profile.height !== null || profile.weight !== null || profile.activityLevel !== null) && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#DDE9DF] bg-[#F3F8F3] px-4 py-3">
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-[#0F4C3A]">{language === 'ar' ? 'إجاباتك المحفوظة' : 'Using your saved answers'}</p>
                  <p className="mt-1 break-words text-xs text-[#52635A]">
                    {[profile.age !== null ? `${profile.age} ${language === 'ar' ? 'سنة' : 'yrs'}` : null,
                       profile.gender ? t(profile.gender as 'male' | 'female') : null,
                      profile.height !== null ? `${profile.height} cm` : null,
                      profile.weight !== null ? `${profile.weight} kg` : null,
                      profile.activityLevel ? t(`wizard.activity.${profile.activityLevel}` as any) : null,
                      wizardGoalLabel(wizardGoal)]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
                <button type="button" onClick={() => { setEditingSavedProfile(true); setStep(2); }} className="min-h-11 shrink-0 rounded-full border border-[#0F4C3A]/20 bg-white px-4 text-xs font-bold text-[#0F4C3A] hover:bg-[#E9F2EA]">
                  {language === 'ar' ? 'تعديل' : 'Edit'}
                </button>
              </div>
            )}
            <div className={`${cardBase} p-6`}>
              <h2 className="text-[18px] font-extrabold">{language === 'ar' ? 'ما هدفك؟' : 'What is your goal?'}</h2>
              <p className="mt-1 text-[12.5px] text-[#6B7A75]">{language === 'ar' ? 'يمكنك اختيار توصيتنا أو اختيار هدف مختلف.' : 'Accept our recommendation or choose a different goal.'}</p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {([
                  { id: 'lose_weight', icon: '⚖️', en: 'Lose Weight', ar: 'إنقاص الوزن', enDesc: `Steady progress over about ${timeline} weeks`, arDesc: `تقدم تدريجي خلال نحو ${timeline} أسبوعاً` },
                  { id: 'maintain_weight', icon: '🌿', en: 'Maintain Weight', ar: 'الحفاظ على الوزن', enDesc: 'Build healthy habits and maintain your weight', arDesc: 'عادات صحية للحفاظ على وزنك' },
                  { id: 'build_muscle', icon: '💪', en: 'Build Muscle', ar: 'بناء العضلات', enDesc: 'Strength training with a protein-focused plan', arDesc: 'تمارين قوة وخطة غنية بالبروتين' },
                  { id: 'improve_health', icon: '🩺', en: 'Improve Specific Health', ar: 'تحسين حالة صحية محددة', enDesc: `Personalize habits for ${healthConditions.includes('diabetes') ? 'diabetes' : 'your health needs'}`, arDesc: healthConditions.includes('diabetes') ? 'عادات مخصصة للمساعدة في إدارة السكري' : 'عادات مخصصة لاحتياجاتك الصحية' },
                ] as { id: WizardGoalSelection; icon: string; en: string; ar: string; enDesc: string; arDesc: string }[]).map((option) => {
                  const on = wizardGoal === option.id;
                  const recommended = recommendedWizardGoal === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleGoalSelection(option.id)}
                      className={`relative flex min-h-[118px] items-start gap-3 rounded-[18px] border-2 p-4 text-start transition-all ${on ? 'border-[#0F4C3A] bg-[#EAF3ED] shadow-[0_0_0_3px_rgba(15,76,58,0.08)]' : 'border-[#EFEBE4] bg-white hover:border-[#D4A017]'}`}
                    >
                      <span className="text-[25px] leading-none">{option.icon}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14px] font-extrabold text-[#0F4C3A]">{language === 'ar' ? option.ar : option.en}</span>
                        <span className="mt-1 block text-[11.5px] leading-snug text-[#6B7A75]">{language === 'ar' ? option.arDesc : option.enDesc}</span>
                      </span>
                      {recommended && <span className="absolute end-3 top-3 rounded-full bg-[#FFF8E7] px-2 py-1 text-[9px] font-extrabold text-[#9A7510]">{language === 'ar' ? 'مقترح' : 'RECOMMENDED'}</span>}
                      {on && <span aria-hidden="true" className="absolute bottom-3 end-3 text-[13px] font-bold text-[#0F4C3A]">✓</span>}
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

          </div>
        )}

        {false && step === 10 && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-6`}>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <h2 className="text-[18px] font-extrabold">{GOAL_ICONS[goal]} {t('wizard.step4.intensity')}</h2>
                  <p className="mt-1 text-[12.5px] text-[#6B7A75]">{t('wizard.step4.intensitySub')}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {DIETS[goal].map((d, idx) => {
                  const on = dietId === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => {
                        setDietId(d.id);
                        updateProfile({ dietIntensity: d.id });
                      }}
                      className={`relative rounded-[18px] border-2 p-4 text-start transition-all min-w-0 ${on ? 'border-[#D4A017] bg-[#FFFBEF] shadow-[0_0_0_4px_rgba(212,160,23,0.15)]' : 'border-[#EFEBE4] bg-white hover:border-[#D4A017]'}`}
                    >
                      {idx === 1 && (
                        <span className="absolute -top-2.5 end-3 text-[9.5px] font-extrabold tracking-wide bg-[#0F4C3A] text-white px-2.5 py-0.5 rounded-full">
                          {t('wizard.step4.recommended')}
                        </span>
                      )}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[18px] leading-none">{d.emoji}</span>
                        {on && <span className="w-5 h-5 rounded-full bg-[#D4A017] text-[#0F4C3A] flex items-center justify-center text-[11px] font-bold">✓</span>}
                      </div>
                      <div className="mt-2 text-[14px] font-extrabold leading-tight">{intensityLabel(d.level)}</div>
                      <div className="mt-0.5 text-[11px] text-[#6B7A75] leading-snug">{intensityTag(d.level)}</div>
                      <div className="mt-2 inline-flex items-center text-[12px] font-bold text-[#B8860B] bg-[#FFF8E7] px-2.5 py-1 rounded-full">{deltaT(goal, d)}</div>
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
                <div className="mt-2 text-[13px] font-semibold text-[#0F4C3A]">{t('wizard.step4.targetCal').replace('{n}', String(numbers!.targetCal))}</div>
                 <div className="mt-2 text-[12px] text-[#8A938E]">{t(numbers!.wk.nameKey as any)} · {ACTIVITY_LABEL(step2Data.activityLevel)}</div>
              </div>
            )}
            <div className="flex gap-3">
              <button type="button" onClick={back} className="btn-secondary flex-1 h-[54px] rounded-[16px] text-[15px] font-bold">{t('wizard.back')}</button>
              <button type="button" onClick={next} disabled={!isValid()} className="btn-primary flex-1 h-[54px] rounded-[16px] text-[15px] font-bold disabled:cursor-not-allowed disabled:opacity-40">{t('wizard.continue')}</button>
            </div>
          </div>
        )}

        {step === 12 && (
          <div className="mt-6 space-y-5">
            <div className={`${cardBase} p-5 sm:p-6`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF3ED] text-[#0F4C3A]"><UtensilsCrossed size={21} /></span>
                  <div>
                    <h2 className="text-[18px] font-extrabold">{language === 'ar' ? 'اليوم الأول' : 'Day 1 Sample'}</h2>
                    <p className="mt-1 text-[12px] text-[#6B7A75]">{kitchenLabel(selectedKitchen)}</p>
                  </div>
                </div>
                <Flag countryCode={selectedKitchen.flag} alt={getKitchenCountry(selectedKitchen, language)} className="h-8 w-10 shrink-0" />
              </div>

              {autoBuilding && !planPreview ? (
                <div className="mt-6 flex min-h-36 flex-col items-center justify-center gap-3 text-[13px] font-semibold text-[#6B7A75]">
                  <span className="h-7 w-7 animate-spin rounded-full border-[3px] border-[#0F4C3A] border-t-transparent" />
                  {language === 'ar' ? 'جارٍ إعداد معاينة اليوم الأول…' : 'Preparing your Day 1 preview…'}
                </div>
              ) : planPreview ? (
                <div className="mt-5 space-y-3">
                  {planPreview.meals.map((meal) => {
                    const MealIcon = meal.mealType === 'breakfast' ? Sun : meal.mealType === 'lunch' ? Salad : meal.mealType === 'dinner' ? Moon : Cookie;
                    const mealTitle = meal.mealType === 'breakfast'
                      ? (language === 'ar' ? 'الإفطار' : 'Breakfast')
                      : meal.mealType === 'lunch'
                        ? (language === 'ar' ? 'الغداء' : 'Lunch')
                        : meal.mealType === 'dinner'
                          ? (language === 'ar' ? 'العشاء' : 'Dinner')
                          : (language === 'ar' ? 'وجبة خفيفة' : 'Snack');
                    return (
                      <section key={meal.mealType} className="rounded-[16px] border border-[#EFEBE4] bg-white p-4">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="flex items-center gap-2 text-[14px] font-extrabold text-[#0F4C3A]"><MealIcon size={17} />{mealTitle}</h3>
                          <span className="num whitespace-nowrap text-[12px] font-bold text-[#6B7A75]">{meal.calories} kcal</span>
                        </div>
                        <ul className="mt-3 space-y-2">
                          {meal.dishes.map((dish, index) => (
                            <li key={`${dish.name}-${index}`} className="flex items-start justify-between gap-3 text-[12px]">
                              <span className="min-w-0 font-semibold text-[#52635A]">{localizedPreviewDishName(dish)}</span>
                              <span className="num shrink-0 text-[#8A938E]">{dish.calories} kcal</span>
                            </li>
                          ))}
                          {meal.dishes.length === 0 && <li className="text-[12px] text-[#8A938E]">{language === 'ar' ? 'لا توجد أطباق متاحة لهذه الوجبة.' : 'No dishes available for this meal.'}</li>}
                        </ul>
                      </section>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-5 rounded-[14px] bg-[#FFF8E7] px-4 py-3 text-[12px] text-[#6B5A28]">{language === 'ar' ? 'تعذر إعداد المعاينة. أعد إنشاء الخطة.' : 'The preview could not be prepared. Regenerate the plan to try again.'}</p>
              )}
            </div>

            {planPreview && (
              <div className={`${cardBase} p-5 sm:p-6`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-[15px] font-extrabold">{language === 'ar' ? 'إجمالي اليوم والمغذيات' : 'Daily Total & Macros'}</h2>
                    <p className="num mt-1 text-[22px] font-black text-[#0F4C3A]">{planPreview.totalCalories} kcal</p>
                  </div>
                  <span className="text-[11px] text-[#6B7A75]">{language === 'ar' ? 'اليوم الأول' : 'Day 1'}</span>
                </div>
                <div className="mt-4 flex h-4 overflow-hidden rounded-full bg-[#F4F1EB]" role="img" aria-label={language === 'ar' ? `بروتين ${planPreview.macroPercentages.protein}%، كربوهيدرات ${planPreview.macroPercentages.carbs}%، دهون ${planPreview.macroPercentages.fat}%` : `${planPreview.macroPercentages.protein}% protein, ${planPreview.macroPercentages.carbs}% carbs, ${planPreview.macroPercentages.fat}% fat`}>
                  <span style={{ width: `${planPreview.macroPercentages.protein}%` }} className="bg-[#0F4C3A]" />
                  <span style={{ width: `${planPreview.macroPercentages.carbs}%` }} className="bg-[#D4A017]" />
                  <span style={{ width: `${planPreview.macroPercentages.fat}%` }} className="bg-[#6A9FB5]" />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1 text-[10px] font-bold text-[#52635A]">
                  <span>{language === 'ar' ? 'بروتين' : 'Protein'} {planPreview.macroPercentages.protein}%</span>
                  <span className="text-center">{language === 'ar' ? 'كربوهيدرات' : 'Carbs'} {planPreview.macroPercentages.carbs}%</span>
                  <span className="text-end">{language === 'ar' ? 'دهون' : 'Fat'} {planPreview.macroPercentages.fat}%</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={regeneratePlanPreview} disabled={autoBuilding} className="min-h-12 rounded-[14px] border-2 border-[#0F4C3A] bg-white px-3 text-[12px] font-bold text-[#0F4C3A] disabled:opacity-50">
                {language === 'ar' ? 'إعادة إنشاء الخطة' : 'Regenerate Plan'}
              </button>
              <button type="button" onClick={() => setStep(10)} className="min-h-12 rounded-[14px] border-2 border-[#EFEBE4] bg-white px-3 text-[12px] font-bold text-[#52635A]">
                {language === 'ar' ? 'تغيير المطبخ' : 'Change Kitchen'}
              </button>
            </div>

            <WizardFooter onBack={back} onNext={next} nextDisabled={!isValid()} backLabel={t('wizard.back')} nextLabel={language === 'ar' ? 'التالي' : 'Next'} />
          </div>
        )}

        {step === 13 && !showPlan && (
          <div className="mt-6 space-y-5 pb-8">
            <div className={`${cardBase} p-6 text-center sm:p-8`}>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF3ED] text-[#0F4C3A]"><PartyPopper size={28} /></span>
              <h2 className="mt-4 text-[23px] font-extrabold leading-tight text-[#0F4C3A]">{language === 'ar' ? 'خطتك الشخصية جاهزة!' : 'Your Personalized Plan is Ready!'}</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6B7A75]">{language === 'ar' ? 'بناءً على 13 معلومة، أعددنا خطة تناسبك.' : "Based on 13 data points, we've built a plan just for you."}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <section className={`${cardBase} p-4`}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-[13px] font-extrabold"><User size={17} />{language === 'ar' ? 'المعلومات الأساسية' : 'Basic Info'}</h3>
                  <button type="button" onClick={() => setStep(2)} className="min-h-9 rounded-full border border-[#0F4C3A]/20 px-3 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                </div>
                <p className="mt-3 text-[12px] leading-relaxed text-[#52635A]">{parsed.age} {t('wizard.unit.years')} · {t(sex)} · {parsed.weight} kg · {parsed.height} cm</p>
              </section>

              <section className={`${cardBase} p-4`}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-[13px] font-extrabold"><Moon size={17} />{language === 'ar' ? 'نمط الحياة' : 'Lifestyle'}</h3>
                  <button type="button" onClick={() => setStep(4)} className="min-h-9 rounded-full border border-[#0F4C3A]/20 px-3 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                </div>
                <p className="mt-3 text-[12px] leading-relaxed text-[#52635A]">
                  {language === 'ar' ? 'النوم' : 'Sleep'}: {language === 'ar' ? ({ under_6: 'أقل من 6 ساعات', six_to_seven: '6 إلى 7 ساعات', seven_to_eight: '7 إلى 8 ساعات', eight_plus: '8 ساعات أو أكثر' } as const)[sleepHours] : sleepHours.replace(/_/g, ' ')} · {language === 'ar' ? 'التوتر' : 'Stress'}: {language === 'ar' ? ({ low: 'منخفض', medium: 'متوسط', high: 'مرتفع' } as const)[stressLevel] : stressLevel} · {language === 'ar' ? 'النشاط' : 'Activity'}: {ACTIVITY_LABEL(step2Data.activityLevel)}
                </p>
              </section>

              <section className={`${cardBase} p-4`}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-[13px] font-extrabold"><Target size={17} />{language === 'ar' ? 'الأهداف' : 'Goals'}</h3>
                  <button type="button" onClick={() => setStep(7)} className="min-h-9 rounded-full border border-[#0F4C3A]/20 px-3 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                </div>
                <p className="mt-3 text-[12px] leading-relaxed text-[#52635A]">{(goals.length ? goals : [wizardGoal]).map(wizardGoalLabel).join(' · ')} · {parsed.timeline} {t('wizard.unit.weeks')}</p>
              </section>

              {bodyConcerns.some((concern) => concern !== 'none') && (
                <section className={`${cardBase} p-4`}>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="flex items-center gap-2 text-[13px] font-extrabold"><Target size={17} />{language === 'ar' ? 'مناطق الجسم' : 'Body Concerns'}</h3>
                    <button type="button" onClick={() => setStep(8)} className="min-h-9 rounded-full border border-[#0F4C3A]/20 px-3 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                  </div>
                  <p className="mt-3 text-[12px] leading-relaxed text-[#52635A]">{bodyConcerns.filter((concern) => concern !== 'none').map((concern) => {
                    const labels: Partial<Record<BodyConcern, string>> = {
                      belly_fat: language === 'ar' ? 'الكرش' : 'Belly Fat',
                      love_handles: language === 'ar' ? 'الجوانب' : 'Love Handles',
                      chest_sagging: language === 'ar' ? 'ترهل الصدر' : 'Chest Sagging',
                      arm_fat: language === 'ar' ? 'الذراعين' : 'Arm Fat',
                      thigh_fat: language === 'ar' ? 'الفخذين' : 'Thigh Fat',
                      back_fat: language === 'ar' ? 'الظهر' : 'Back Fat',
                      skin_laxity: language === 'ar' ? 'ترهل الجلد' : 'Skin Laxity',
                    };
                    return labels[concern] ?? concern;
                  }).join(' · ')}</p>
                </section>
              )}

              <section className={`${cardBase} p-4`}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-[13px] font-extrabold"><Dumbbell size={17} />{language === 'ar' ? 'خطة التمارين' : 'Exercise Plan'}</h3>
                  <button type="button" onClick={() => setStep(9)} className="min-h-9 rounded-full border border-[#0F4C3A]/20 px-3 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                </div>
                <p className="mt-3 text-[12px] leading-relaxed text-[#52635A]">{finalRecommendations.exerciseSummary.map((id) => {
                  const option = EXERCISE_RECOMMENDATION_OPTIONS.find((exercise) => exercise.id === id);
                  return option ? (language === 'ar' ? option.ar : option.en) : id;
                }).join(' · ') || (language === 'ar' ? 'لم يتم تحديد تمارين' : 'No exercise types selected')}</p>
              </section>

              <section className={`${cardBase} p-4`}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-[13px] font-extrabold"><UtensilsCrossed size={17} />{language === 'ar' ? 'المطبخ' : 'Kitchen'}</h3>
                  <button type="button" onClick={() => setStep(10)} className="min-h-9 rounded-full border border-[#0F4C3A]/20 px-3 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                </div>
                <p className="mt-3 flex items-center gap-2 text-[12px] font-semibold text-[#52635A]"><Flag countryCode={selectedKitchen.flag} alt={getKitchenCountry(selectedKitchen, language)} className="h-5 w-7 shrink-0" />{kitchenLabel(selectedKitchen)}</p>
              </section>

              <section className={`${cardBase} p-4 sm:col-span-2`}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-[13px] font-extrabold"><Activity size={17} />{language === 'ar' ? 'الأهداف اليومية' : 'Daily Targets'}</h3>
                  <button type="button" onClick={() => setStep(11)} className="min-h-9 rounded-full border border-[#0F4C3A]/20 px-3 text-[11px] font-bold text-[#0F4C3A]">{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                </div>
                <p className="num mt-3 text-[21px] font-black text-[#0F4C3A]">{finalRecommendations.dailyCalories} kcal/day</p>
                <div className="mt-3 flex h-3.5 overflow-hidden rounded-full bg-[#F4F1EB]" role="img" aria-label={`${finalRecommendations.macroPercentages.protein}% protein, ${finalRecommendations.macroPercentages.carbs}% carbs, ${finalRecommendations.macroPercentages.fat}% fat`}>
                  <span style={{ width: `${finalRecommendations.macroPercentages.protein}%` }} className="bg-[#0F4C3A]" />
                  <span style={{ width: `${finalRecommendations.macroPercentages.carbs}%` }} className="bg-[#D4A017]" />
                  <span style={{ width: `${finalRecommendations.macroPercentages.fat}%` }} className="bg-[#6A9FB5]" />
                </div>
                <p className="mt-2 text-[10px] font-bold text-[#52635A]">{language === 'ar' ? `بروتين ${finalRecommendations.macroPercentages.protein}% · كربوهيدرات ${finalRecommendations.macroPercentages.carbs}% · دهون ${finalRecommendations.macroPercentages.fat}%` : `Protein ${finalRecommendations.macroPercentages.protein}% · Carbs ${finalRecommendations.macroPercentages.carbs}% · Fat ${finalRecommendations.macroPercentages.fat}%`}</p>
              </section>
            </div>

            <div className={`${cardBase} p-5 text-center`}>
              <button type="button" onClick={viewMyPlan} disabled={autoBuilding} className="cta-calc disabled:cursor-wait disabled:opacity-60">
                {autoBuilding ? (language === 'ar' ? 'جارٍ إعداد خطتك…' : 'Preparing your plan…') : (language === 'ar' ? 'عرض الخطة كاملة' : 'View Full Plan')}
              </button>
              <button type="button" onClick={() => setShowStartOverConfirm(true)} className="mt-3 min-h-[46px] w-full rounded-[14px] border border-[#E5E0D5] bg-white text-[13px] font-bold text-[#6B7A75] hover:border-[#D4A017]">
                {language === 'ar' ? 'البدء من جديد' : 'Start Over'}
              </button>
              <p className="mt-3 text-[11px] text-[#8A938E]">{language === 'ar' ? 'يمكنك تعديل خطتك في أي وقت من لوحة التحكم.' : 'You can edit your plan anytime from your dashboard.'}</p>
            </div>

            {showStartOverConfirm && (
              <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4" role="presentation">
                <section role="dialog" aria-modal="true" aria-labelledby="start-over-title" className="w-full max-w-[380px] rounded-[22px] border border-[#EFEBE4] bg-white p-5 shadow-2xl">
                  <h2 id="start-over-title" className="text-[17px] font-extrabold text-[#0F4C3A]">{language === 'ar' ? 'البدء من جديد؟' : 'Start over?'}</h2>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#6B7A75]">{language === 'ar' ? 'سيتم مسح إجابات المعالج والخطة المحفوظة.' : 'This will clear your wizard answers and saved preview.'}</p>
                  <div className="mt-5 flex gap-3">
                    <button type="button" onClick={() => setShowStartOverConfirm(false)} className="btn-secondary min-h-11 flex-1 rounded-[13px] text-[12px] font-bold">{language === 'ar' ? 'إلغاء' : 'Cancel'}</button>
                    <button type="button" onClick={startOver} className="min-h-11 flex-1 rounded-[13px] bg-[#0F4C3A] px-3 text-[12px] font-bold text-white">{language === 'ar' ? 'تأكيد البدء من جديد' : 'Confirm Start Over'}</button>
                  </div>
                </section>
              </div>
            )}
          </div>
        )}

        {step === 13 && showPlan && (
          <div className="mt-6 max-w-[940px] mx-auto flex flex-col gap-5">
            <div className="rounded-[26px] border border-[#EFEBE4] bg-white shadow-[0_14px_40px_rgba(15,76,58,0.1)]">
              <div className="rounded-t-[25px] px-4 sm:px-5 md:px-6 py-4 text-white flex items-start sm:items-center gap-3" style={{ background: 'linear-gradient(135deg,#0F4C3A,#14532D 60%,#1f6b52)' }}>
                <span aria-hidden="true" className="w-11 h-11 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white font-extrabold text-[15px] tracking-wider shrink-0">{profileInitials}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[16px] sm:text-[17px] md:text-[19px] font-extrabold leading-snug break-words">{t('wizard.step5.title')}</div>
                  <div className="text-white/75 text-[12px] leading-relaxed mt-0.5 break-words">{t('wizard.step5.subtitle')}</div>
                </div>
              </div>

              <div className="bg-white px-4 md:px-6 py-3 flex items-center justify-between gap-2 border-b border-[#F0ECE2]">
                <button type="button" onClick={() => { wizardCompletedRef.current = false; setShowPlan(false); setStep(12); }} className="rounded-full bg-[#F4F1EB] text-[#0F4C3A] text-[12px] font-bold px-4 py-2 flex items-center gap-1 hover:bg-[#ECE8DD] min-w-0">
                  <span className="shrink-0">←</span> {t('wizard.step5.backToEdit')}
                </button>
                <div className="text-[11.5px] text-[#8A938E] min-w-0 break-words text-end">
                  <span className="num">{numbers!.targetCal}</span> kcal · <Flag countryCode={selectedKitchen.flag} alt={getKitchenCountry(selectedKitchen, language)} className="h-3.5 w-5" /> {kitchenLabel(selectedKitchen)}
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
                  <button type="button" onClick={() => { setOpenMealAccordion(null); setSelectedPlanDay((s) => Math.max(1, s - 1)); }} className="w-9 h-9 rounded-full bg-white border border-[#E9E5DB] flex items-center justify-center text-[#0F4C3A] hover:border-[#D4A017] shrink-0">‹</button>
                  <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar justify-between min-w-0">
                    {[1, 2, 3, 4, 5, 6, 7].map((d) => {
                      const ad = d === selectedPlanDay;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => { setOpenMealAccordion(null); setSelectedPlanDay(d); }}
                          className={`relative w-9 h-9 min-w-[36px] rounded-xl flex items-center justify-center text-[13px] font-bold transition-all ${ad ? 'bg-[#D4A017] text-[#0F4C3A] shadow-[0_4px_10px_rgba(212,160,23,0.4)]' : 'bg-white border border-[#E9E5DB] text-[#6B7A75] hover:border-[#D4A017]'}`}
                        >
                          <span className="num">{d}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button type="button" onClick={() => { setOpenMealAccordion(null); setSelectedPlanDay((s) => Math.min(7, s + 1)); }} className="w-9 h-9 rounded-full bg-white border border-[#E9E5DB] flex items-center justify-center text-[#0F4C3A] hover:border-[#D4A017] shrink-0">›</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-3 lg:gap-4">
              <div className="min-w-0 rounded-[22px] p-5 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#D4A017,#B8860B 70%,#b3922c)' }}>
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

              <div className="min-w-0 rounded-[22px] p-5 border border-[#E8E2D4] bg-white">
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
                <div className="mt-1.5 text-[11px] font-bold text-[#D4A017]">+250ml</div>
              </div>

              <div className="min-w-0 rounded-[22px] p-5 border border-[#E8E2D4] bg-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#6B7A75]">🍽️ {t('wizard.step5.statMealsDone')}</div>
                  <span className="num w-9 h-9 rounded-full bg-[#FFF8E7] border border-[#E9D9A8] text-[#B8860B] flex items-center justify-center text-[14px] font-extrabold">{doneCount}/4</span>
                </div>
                <div className="mt-3 h-2.5 rounded-full bg-[#E9E5DB] overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(doneCount / 4) * 100}%`, background: 'linear-gradient(90deg,#D4A017,#B8860B)' }} />
                </div>
                <div className="mt-2 text-[12px] font-semibold text-[#6B7A75]">
                  {t('wizard.step5.completed').replace('{n}', String(doneCount))}
                </div>
              </div>
            </div>

              <div className="-my-5">
                <div
                  data-ad-slot="weight-loss-meal-plan"
                  role="complementary"
                  aria-label={language === 'ar' ? 'مساحة إعلانية' : 'Advertisement'}
                  className="ad-slot w-full"
                  style={{ minHeight: '100px', margin: '20px 0' }}
                />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-0">
                {hasFourFilledMeals(weeklyPlan, finalRecommendations.dailyCalories) ? selectedDayMeals.map((meal, idx) => {
                  const mealCal = meal.dishes.reduce((s, x) => s + x.calories, 0);
                  const isOpen = openMealAccordion === meal.mealType;
                  const title = t((meal.mealType === 'lunch' ? 'mealLunch' : meal.mealType === 'dinner' ? 'mealDinner' : meal.mealType === 'breakfast' ? 'mealBreakfast' : 'mealSnack') as any);
                  return (
                    <MealCard
                      key={meal.mealType}
                      mealType={meal.mealType}
                      title={title}
                      time={mealTime(meal.mealType)}
                      calories={mealCal}
                      dishes={meal.dishes.map((dish, dishIndex) => {
                        const leaveKey = `d${selectedPlanDay - 1}-m${idx}-x${dishIndex}-${dish.dish.name}`;
                        const flashKey = `d${selectedPlanDay - 1}-m${idx}-s-${dish.dish.name}`;
                        return {
                          id: `${dishIndex}-${dish.dish.name}`,
                          name: getDishName(dish.dish, language),
                          grams: Math.round(dish.grams),
                          calories: dish.calories,
                          imageUrl: 'imageUrl' in dish.dish && typeof dish.dish.imageUrl === 'string' ? dish.dish.imageUrl : undefined,
                          rowClassName: `${removingDish === leaveKey ? 'dish-leave' : 'dish-enter'} ${swapFlash === flashKey ? 'dish-swap-flash' : ''}`,
                        };
                      })}
                      isExpanded={isOpen}
                      isDone={mealsDone[idx] ?? false}
                      showDoneControl={idx < 4}
                      isArabic={language === 'ar'}
                      onToggle={() => setOpenMealAccordion((open) => open === meal.mealType ? null : meal.mealType)}
                      onAddDish={() => setDishModal({ mode: 'add', dayIndex: selectedPlanDay - 1, mealIndex: idx, mealType: meal.mealType, dishIndex: 0 })}
                      onSwapDish={(dishIndex) => setDishModal({ mode: 'swap', dayIndex: selectedPlanDay - 1, mealIndex: idx, mealType: meal.mealType, dishIndex })}
                      onRemoveDish={(dishIndex) => handleRemoveDish(selectedPlanDay - 1, idx, dishIndex)}
                      onDoneChange={(done) => {
                        haptic(6);
                        setMealsDone((prev) => prev.map((value, mealIndex) => (mealIndex === idx ? done : value)));
                      }}
                    />
                  );
                }) : (
                  <div role="status" className="col-span-full rounded-2xl border border-dashed border-[#D8D2C4] bg-[#FAF8F3] px-4 py-6 text-center">
                    <p className="text-sm font-semibold text-[#6B7A75]">{t('wizard.step5.planPreparing')}</p>
                    <button type="button" disabled={autoBuilding} onClick={() => runAutoKitchen(true)} className="mt-3 min-h-11 rounded-xl bg-[#0F4C3A] px-4 text-xs font-bold text-white disabled:opacity-50">
                      {t('wizard.step5.rebuildPlan')}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button type="button" onClick={() => window.print()} className="rounded-full bg-white border border-[#E9E5DB] text-[#0F4C3A] px-5 py-2.5 text-[13px] font-bold flex items-center gap-1.5 hover:border-[#D4A017] transition-all">
                <span>⬇️</span> {t('wizard.step5.downloadPdf')}
              </button>
              <button type="button" onClick={() => setEmailOpen(true)} className="rounded-full bg-white border border-[#E9E5DB] text-[#0F4C3A] px-5 py-2.5 text-[13px] font-bold flex items-center gap-1.5 hover:border-[#D4A017] transition-all">
                <span>✉️</span> {t('wizard.step5.emailPlan')}
              </button>
              <button type="button" onClick={() => notify(t('wizard.toast.progress'))} className="rounded-full bg-white border border-[#E9E5DB] text-[#0F4C3A] px-5 py-2.5 text-[13px] font-bold flex items-center gap-1.5 hover:border-[#D4A017] transition-all">
                <span>📊</span> {t('wizard.step5.progressTracker')}
              </button>
              {planType !== 'nutrition' && (
                <button type="button" onClick={goEditExercises} className="rounded-full bg-white border border-[#E9E5DB] text-[#0F4C3A] px-5 py-2.5 text-[13px] font-bold flex items-center gap-1.5 hover:border-[#D4A017] transition-all">
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
                       <div className="text-[11px] text-[#8A938E]">{t(numbers!.wk.nameKey as any)}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold bg-[#FFF8E7] text-[#B8860B] px-3 py-1 rounded-full shrink-0">
                    {t('wizard.step5.exercisesCount').replace('{n}', String(plannedExercises.length))}
                  </span>
                </div>
                {plannedExercises.length ? (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {plannedExercises.map((ex) => {
                      const exercise = unifiedExercises.find((item) => item.id === ex.id);
                      return (
                        <div key={ex.id} className="flex items-center gap-2.5 rounded-[14px] border border-[#EFEBE4] bg-[#FDFBF7] px-3 py-2.5 min-w-0">
                          <Dumbbell aria-hidden="true" size={16} className="shrink-0 text-[#6B7A75]" />
                          <span className="truncate text-[12px] font-bold flex-1 min-w-0">{exercise ? localizedExerciseName(exercise) : ex.name}</span>
                          <span className="shrink-0 text-[10.5px] font-bold bg-white border border-[#E9E5DB] px-2 py-0.5 rounded-full">{ex.dur}</span>
                        </div>
                      );
                    })}
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
                      <div className="text-[11px] text-[#8A938E] flex items-center gap-1"><Flag countryCode={selectedKitchen.flag} alt={getKitchenCountry(selectedKitchen, language)} className="h-3 w-4" /> {getKitchenCountry(selectedKitchen, language)}</div>
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
                        onClick={() => { setOpenMealAccordion(null); setSelectedPlanDay(i + 1); }}
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
                  <button type="button" onClick={() => { setShowPlan(false); setStep(11); }} className="h-10 rounded-[14px] px-4 bg-white border border-[#E3E0D8] text-[12px] font-bold text-[#0F4C3A] hover:border-[#D4A017] transition-all shrink-0">🍳 {t('wizard.step5.changeCuisineBtn')}</button>
                </div>
              </div>
            )}

            <p className="rounded-[16px] border border-[#EFEBE4] bg-white/70 px-4 py-3 text-[11px] leading-relaxed text-[#7D8782]">
              This site is for educational purposes only and does not substitute professional medical advice. Always consult with a qualified healthcare provider.
            </p>

            <div className="no-print save-bar rounded-t-[20px]">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse shrink-0" />
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
              className="text-[#D4A017] font-extrabold text-[12px] uppercase tracking-wide hover:underline shrink-0"
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
                  className="mt-5 w-full h-[48px] rounded-[14px] bg-[#D4A017] text-[#0F4C3A] text-[14px] font-extrabold"
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
                  className="mt-1.5 w-full h-[48px] rounded-[14px] border border-[#E9E5DB] px-4 outline-none focus:border-[#D4A017] focus:ring-[3px] focus:ring-[#D4A017]/20 bg-white"
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
                    className={`flex-1 h-[48px] rounded-[14px] text-[14px] font-extrabold ${emailSending || !emailText.trim() ? 'bg-[#E9E5DB] text-[#A0A8A4]' : 'bg-[#D4A017] text-[#0F4C3A]'}`}
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
            mealLabel={meal ? t((meal.mealType === 'lunch' ? 'mealLunch' : meal.mealType === 'dinner' ? 'mealDinner' : meal.mealType === 'breakfast' ? 'mealBreakfast' : 'mealSnack') as any) : mealLabel(dishModal.mealType)}
            pool={dishPoolByMeal(dishModal.mealType)}
            currentDish={cur ? { calories: cur.calories, name: getDishName(cur.dish, language) } : null}
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
