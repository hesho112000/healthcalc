import { useEffect, useState } from 'react';

export type UserGender = 'male' | 'female';
export type UserActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type UserGoal = 'lose' | 'gain_muscle' | 'gain_weight' | 'wellness' | 'athletic';
export type WizardGoalSelection = 'lose_weight' | 'maintain_weight' | 'build_muscle' | 'improve_health';
export type UserPlanType = 'nutrition' | 'fitness' | 'both';
export type SleepHours = 'under_6' | 'six_to_seven' | 'seven_to_eight' | 'eight_plus';
export type StressLevel = 'low' | 'medium' | 'high';
export type WorkType = 'sedentary' | 'light' | 'active' | 'very_active';
export type SmokingStatus = 'no' | 'occasionally' | 'yes';
export type MealsPerDay = 'one_to_two' | 'three' | 'four' | 'five_plus';
export type SnackFrequency = 'never' | 'sometimes' | 'often';
export type BreakfastType = 'skip' | 'light' | 'full';
export type MeatFrequency = 'daily' | 'weekly' | 'rarely' | 'never';
export type VegetablesFrequency = 'daily' | 'weekly' | 'rarely';
export type SugaryDrinksFrequency = 'never' | 'sometimes' | 'daily';
export type GoalDiscoverySelection = 'lose_weight' | 'maintain_weight' | 'build_muscle' | 'improve_health' | 'not_sure';
export type BodyConcern = 'belly_fat' | 'love_handles' | 'chest_sagging' | 'arm_fat' | 'thigh_fat' | 'back_fat' | 'skin_laxity' | 'none';
export type KitchenMode = 'manual' | 'surprise';

export interface UserRecommendations {
  dietType: string;
  dailyCalories: number;
  macroPercentages: { protein: number; carbs: number; fat: number };
  mealsPerDay: number;
  exerciseSummary: string[];
}

export type PreviewMealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface UserPlanPreview {
  kitchenId: string;
  meals: {
    mealType: PreviewMealType;
    calories: number;
    dishes: { name: string; nameAr: string | null; calories: number }[];
  }[];
  totalCalories: number;
  macroPercentages: { protein: number; carbs: number; fat: number };
}

export interface UserProfile {
  age: number | null;
  gender: UserGender | null;
  height: number | null;
  weight: number | null;
  targetWeight: number | null;
  timelineWeeks: number | null;
  goal: UserGoal | null;
  wizardGoal: WizardGoalSelection | null;
  planType: UserPlanType | null;
  activityLevel: UserActivityLevel | null;
  exerciseTypes: string[];
  dietaryPreferences: string[];
  dietIntensity: string | null;
  kitchenPreference: string | null;
  selectedKitchen: string | null;
  kitchenMode: KitchenMode | null;
  recommendations: UserRecommendations | null;
  planPreview: UserPlanPreview | null;
  healthConditions: string[];
  dietAffectingMedication: boolean | null;
  waist: number | null;
  sleepHours: SleepHours | null;
  stressLevel: StressLevel | null;
  workType: WorkType | null;
  waterGlasses: number | null;
  smoking: SmokingStatus | null;
  caffeineCups: number | null;
  mealsPerDay: MealsPerDay | null;
  snacksBetweenMeals: SnackFrequency | null;
  breakfastType: BreakfastType | null;
  meatFrequency: MeatFrequency | null;
  vegetablesFrequency: VegetablesFrequency | null;
  sugaryDrinks: SugaryDrinksFrequency | null;
  goalDiscovery: GoalDiscoverySelection | null;
  goals: WizardGoalSelection[];
  bodyConcerns: BodyConcern[];
  exerciseRecommendations: string[];
}

export const USER_PROFILE_STORAGE_KEY = 'healthcalc_user_profile';
export const WIZARD_DRAFT_STORAGE_KEY = 'healthcalc_wizard_draft_v1';
export const WIZARD_STEP_STORAGE_KEY = 'healthcalc_wizard_step_v1';
const PROFILE_CLEARED_EVENT = 'healthcalc:user-profile-cleared';

const LEGACY_KEYS = ['fitness-inputs', 'fitness-wizard-input', 'hc_calc_profile', 'hc_calculator_bridge'];
const PROFILE_STORAGE_KEYS = [
  USER_PROFILE_STORAGE_KEY,
  WIZARD_DRAFT_STORAGE_KEY,
  WIZARD_STEP_STORAGE_KEY,
  ...LEGACY_KEYS,
  'healthcalc_conditions',
  'userTDEE',
  'userBMR',
];

export const clearUserProfileStorage = (): void => {
  try {
    PROFILE_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  } catch {
    /* ignore storage failures */
  }
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(PROFILE_CLEARED_EVENT));
};

const EMPTY_PROFILE: UserProfile = {
  age: null,
  gender: null,
  height: null,
  weight: null,
  targetWeight: null,
  timelineWeeks: null,
  goal: null,
  wizardGoal: null,
  planType: null,
  activityLevel: null,
  exerciseTypes: [],
  dietaryPreferences: [],
  dietIntensity: null,
  kitchenPreference: null,
  selectedKitchen: null,
  kitchenMode: null,
  recommendations: null,
  planPreview: null,
  healthConditions: [],
  dietAffectingMedication: null,
  waist: null,
  sleepHours: null,
  stressLevel: null,
  workType: null,
  waterGlasses: null,
  smoking: null,
  caffeineCups: null,
  mealsPerDay: null,
  snacksBetweenMeals: null,
  breakfastType: null,
  meatFrequency: null,
  vegetablesFrequency: null,
  sugaryDrinks: null,
  goalDiscovery: null,
  goals: [],
  bodyConcerns: [],
  exerciseRecommendations: [],
};

const LEGACY_DIET_INTENSITIES = new Set([
  'normal_lose', 'medium_lose', 'harsh_lose',
  'lean_bulk', 'moderate_bulk', 'aggressive_bulk',
  'normal_gain', 'medium_gain', 'harsh_gain',
  'well_balanced', 'well_deficit', 'well_surplus',
  'ath_endurance', 'ath_strength', 'ath_peak',
]);

type ProfileRecord = Record<string, unknown>;

const asRecord = (value: unknown): ProfileRecord | null => (
  value && typeof value === 'object' && !Array.isArray(value) ? value as ProfileRecord : null
);

const asNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value))) return Number(value);
  return null;
};

const asStringList = (value: unknown): string[] => (
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
);

const SLEEP_HOURS_OPTIONS = ['under_6', 'six_to_seven', 'seven_to_eight', 'eight_plus'] as const;
const STRESS_LEVEL_OPTIONS = ['low', 'medium', 'high'] as const;
const WORK_TYPE_OPTIONS = ['sedentary', 'light', 'active', 'very_active'] as const;
const SMOKING_STATUS_OPTIONS = ['no', 'occasionally', 'yes'] as const;
const MEALS_PER_DAY_OPTIONS = ['one_to_two', 'three', 'four', 'five_plus'] as const;
const SNACK_FREQUENCY_OPTIONS = ['never', 'sometimes', 'often'] as const;
const BREAKFAST_TYPE_OPTIONS = ['skip', 'light', 'full'] as const;
const MEAT_FREQUENCY_OPTIONS = ['daily', 'weekly', 'rarely', 'never'] as const;
const VEGETABLES_FREQUENCY_OPTIONS = ['daily', 'weekly', 'rarely'] as const;
const SUGARY_DRINKS_FREQUENCY_OPTIONS = ['never', 'sometimes', 'daily'] as const;
const GOAL_DISCOVERY_OPTIONS = ['lose_weight', 'maintain_weight', 'build_muscle', 'improve_health', 'not_sure'] as const;
const MULTI_GOAL_OPTIONS = ['lose_weight', 'maintain_weight', 'build_muscle', 'improve_health'] as const;
const BODY_CONCERN_OPTIONS = ['belly_fat', 'love_handles', 'chest_sagging', 'arm_fat', 'thigh_fat', 'back_fat', 'skin_laxity', 'none'] as const;

const asEnum = <T extends string>(value: unknown, options: readonly T[]): T | null =>
  typeof value === 'string' && options.includes(value as T) ? (value as T) : null;

const asEnumList = <T extends string>(value: unknown, options: readonly T[]): T[] =>
  Array.isArray(value) ? value.filter((item): item is T => typeof item === 'string' && options.includes(item as T)) : [];

const normalizePlanPreview = (value: unknown): UserPlanPreview | null => {
  const record = asRecord(value);
  const macros = asRecord(record?.macroPercentages);
  const totalCalories = asNumber(record?.totalCalories);
  const protein = asNumber(macros?.protein);
  const carbs = asNumber(macros?.carbs);
  const fat = asNumber(macros?.fat);
  if (!record || typeof record.kitchenId !== 'string' || !Array.isArray(record.meals) || totalCalories === null || protein === null || carbs === null || fat === null) return null;

  const meals = record.meals.flatMap((value) => {
    const meal = asRecord(value);
    const calories = asNumber(meal?.calories);
    if (!meal || !['breakfast', 'lunch', 'dinner', 'snacks'].includes(String(meal.mealType)) || !Array.isArray(meal.dishes) || calories === null) return [];
    const dishes = meal.dishes.flatMap((value) => {
      const dish = asRecord(value);
      const dishCalories = asNumber(dish?.calories);
      if (!dish || typeof dish.name !== 'string' || dishCalories === null) return [];
      return [{ name: dish.name, nameAr: typeof dish.nameAr === 'string' ? dish.nameAr : null, calories: dishCalories }];
    });
    return [{ mealType: meal.mealType as PreviewMealType, calories, dishes }];
  });

  if (meals.length !== 4) return null;
  return { kitchenId: record.kitchenId, meals, totalCalories, macroPercentages: { protein, carbs, fat } };
};

const normalizeProfile = (value: unknown): UserProfile => {
  const record = asRecord(value) ?? {};
  const data = { ...(asRecord(record.profile) ?? {}), ...record };
  const savedPreferences = asStringList(data.dietaryPreferences);
  const legacyDietIntensity = savedPreferences.find((item) => LEGACY_DIET_INTENSITIES.has(item));
  const rawGoal = typeof data.goal === 'string' ? data.goal : null;
  const goal = rawGoal === 'lose_weight' || rawGoal === 'weight_loss'
    ? 'lose'
    : rawGoal && ['lose', 'gain_muscle', 'gain_weight', 'wellness', 'athletic'].includes(rawGoal)
      ? rawGoal as UserGoal
      : null;
  const rawGender = data.gender ?? data.sex;
  const rawActivity = data.activityLevel;
  const rawWizardGoal = data.wizardGoal;
  const rawPlanType = data.planType;

  return {
    age: asNumber(data.age),
    gender: rawGender === 'male' || rawGender === 'female' ? rawGender : null,
    height: asNumber(data.height ?? data.heightCm),
    weight: asNumber(data.weight ?? data.weightKg),
    targetWeight: asNumber(data.targetWeight),
    timelineWeeks: asNumber(data.timelineWeeks),
    goal,
    wizardGoal: typeof rawWizardGoal === 'string' && ['lose_weight', 'maintain_weight', 'build_muscle', 'improve_health'].includes(rawWizardGoal)
      ? rawWizardGoal as WizardGoalSelection
      : null,
    planType: rawPlanType === 'nutrition' || rawPlanType === 'fitness' || rawPlanType === 'both'
      ? rawPlanType
      : null,
    activityLevel: typeof rawActivity === 'string' && ['sedentary', 'light', 'moderate', 'active', 'very_active'].includes(rawActivity)
      ? rawActivity as UserActivityLevel
      : null,
    exerciseTypes: asStringList(data.exerciseTypes),
    dietaryPreferences: savedPreferences.filter((item) => !LEGACY_DIET_INTENSITIES.has(item)),
    dietIntensity: typeof data.dietIntensity === 'string'
      ? data.dietIntensity
      : typeof data.dietId === 'string' && data.dietId
        ? data.dietId
        : legacyDietIntensity ?? null,
    kitchenPreference: typeof data.kitchenPreference === 'string' ? data.kitchenPreference : null,
    selectedKitchen: typeof data.selectedKitchen === 'string' ? data.selectedKitchen : null,
    kitchenMode: data.kitchenMode === 'manual' || data.kitchenMode === 'surprise' ? data.kitchenMode : null,
    recommendations: (() => {
      const saved = asRecord(data.recommendations);
      const macros = asRecord(saved?.macroPercentages);
      const dailyCalories = asNumber(saved?.dailyCalories);
      const mealsPerDay = asNumber(saved?.mealsPerDay);
      if (!saved || !macros || dailyCalories === null || mealsPerDay === null) return null;
      const protein = asNumber(macros.protein);
      const carbs = asNumber(macros.carbs);
      const fat = asNumber(macros.fat);
      if (protein === null || carbs === null || fat === null || typeof saved.dietType !== 'string') return null;
      return {
        dietType: saved.dietType,
        dailyCalories,
        macroPercentages: { protein, carbs, fat },
        mealsPerDay,
        exerciseSummary: asStringList(saved.exerciseSummary),
      };
    })(),
    planPreview: normalizePlanPreview(data.planPreview),
    healthConditions: asStringList(data.healthConditions).length
      ? asStringList(data.healthConditions)
      : asStringList(data.conditions),
    dietAffectingMedication: typeof data.dietAffectingMedication === 'boolean'
      ? data.dietAffectingMedication
      : null,
    waist: asNumber(data.waist ?? data.waistCircumference),
    sleepHours: asEnum(data.sleepHours, SLEEP_HOURS_OPTIONS),
    stressLevel: asEnum(data.stressLevel, STRESS_LEVEL_OPTIONS),
    workType: asEnum(data.workType, WORK_TYPE_OPTIONS),
    waterGlasses: asNumber(data.waterGlasses),
    smoking: asEnum(data.smoking, SMOKING_STATUS_OPTIONS),
    caffeineCups: asNumber(data.caffeineCups),
    mealsPerDay: asEnum(data.mealsPerDay, MEALS_PER_DAY_OPTIONS),
    snacksBetweenMeals: asEnum(data.snacksBetweenMeals, SNACK_FREQUENCY_OPTIONS),
    breakfastType: asEnum(data.breakfastType, BREAKFAST_TYPE_OPTIONS),
    meatFrequency: asEnum(data.meatFrequency, MEAT_FREQUENCY_OPTIONS),
    vegetablesFrequency: asEnum(data.vegetablesFrequency, VEGETABLES_FREQUENCY_OPTIONS),
    sugaryDrinks: asEnum(data.sugaryDrinks, SUGARY_DRINKS_FREQUENCY_OPTIONS),
    goalDiscovery: asEnum(data.goalDiscovery, GOAL_DISCOVERY_OPTIONS),
    goals: asEnumList(data.goals, MULTI_GOAL_OPTIONS),
    bodyConcerns: asEnumList(data.bodyConcerns, BODY_CONCERN_OPTIONS),
    exerciseRecommendations: asStringList(data.exerciseRecommendations),
  };
};

const parseStoredRecord = (key: string): ProfileRecord | null => {
  try {
    return asRecord(JSON.parse(localStorage.getItem(key) || 'null'));
  } catch {
    return null;
  }
};

const writeProfile = (profile: UserProfile): void => {
  try {
    const existing = parseStoredRecord(USER_PROFILE_STORAGE_KEY) ?? {};
    localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify({ ...existing, ...profile }));
  } catch {
    /* ignore storage failures */
  }
};

const readProfile = (): UserProfile => {
  try {
    const current = parseStoredRecord(USER_PROFILE_STORAGE_KEY);
    if (current) return normalizeProfile(current);

    const legacyRecords = LEGACY_KEYS.map(parseStoredRecord).filter((record): record is ProfileRecord => !!record);
    let legacyConditions: string[] = [];
    try {
      const parsed = JSON.parse(localStorage.getItem('healthcalc_conditions') || 'null');
      if (Array.isArray(parsed)) legacyConditions = parsed.filter((item): item is string => typeof item === 'string');
    } catch {
      /* ignore malformed legacy conditions */
    }
    if (!legacyRecords.length && !legacyConditions.length) return { ...EMPTY_PROFILE };

    const migrated = normalizeProfile(Object.assign({}, ...legacyRecords));
    if (!migrated.healthConditions.length) migrated.healthConditions = legacyConditions;
    writeProfile(migrated);
    return migrated;
  } catch {
    return { ...EMPTY_PROFILE };
  }
};

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(readProfile);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === USER_PROFILE_STORAGE_KEY) setProfile(readProfile());
    };
    const handleProfileCleared = () => setProfile({ ...EMPTY_PROFILE });
    window.addEventListener('storage', handleStorage);
    window.addEventListener(PROFILE_CLEARED_EVENT, handleProfileCleared);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(PROFILE_CLEARED_EVENT, handleProfileCleared);
    };
  }, []);

  const updateProfile = (updates: Partial<UserProfile>): void => {
    const next = normalizeProfile({ ...profile, ...updates });
    writeProfile(next);
    setProfile(next);
  };

  const resetProfile = (): void => {
    clearUserProfileStorage();
    setProfile({ ...EMPTY_PROFILE });
  };

  return { profile, updateProfile, resetProfile };
};
