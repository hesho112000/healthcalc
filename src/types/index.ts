export type Language = 'en' | 'fr' | 'es' | 'ar' | 'hi' | 'de';

/**
 * Localized copy used across recipes and articles.
 *
 * `en` and `ar` are always present. The newer SEO languages (`fr`, `es`, `hi`)
 * are optional while translations are being rolled out; every reader must go
 * through `pickLocalized` so a missing or blank value falls back to English.
 */
export type LangText = {
  en: string;
  ar: string;
  fr?: string;
  es?: string;
  hi?: string;
};

/** Localized string arrays (recipe ingredients, instructions, and similar). */
export type LocalizedTextList = {
  en: string[];
  ar: string[];
  fr?: string[];
  es?: string[];
  hi?: string[];
};

/**
 * Pick a localized value with an English fallback.
 *
 * Falls back when the requested locale is absent, undefined, an empty string,
 * or an empty array. This prevents partially translated content from rendering
 * blank UI.
 */
export function pickLocalized<T>(
  values: Partial<Record<Language, T>> & { en: T },
  language: Language,
): T {
  const value = values[language];

  if (typeof value === 'string') {
    return (value.trim() ? value : values.en) as T;
  }
  if (Array.isArray(value)) {
    return (value.length > 0 ? value : values.en) as T;
  }
  return (value ?? values.en) as T;
}

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export interface UserProfile {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: ActivityLevel;
  goal: HealthGoal;
  workoutDays?: number;
}

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type HealthGoal = 'lose_weight' | 'maintain' | 'gain_muscle';

export interface CalorieResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  macros: Macros;
  mealPlan: MealPlan[];
  fullMealPlan: DailyMealPlan[];
  workoutPlan: WorkoutPlan;
}

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

export interface MealPlan {
  meal: string;
  icon: 'meal' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  items: string[];
  description: string;
  nameAr?: string;
  nameEn?: string;
  verified?: boolean;
  saturatedFat?: number;
  cholesterol?: number;
  fiber?: number;
  sodium?: number;
}

export interface DailyMealPlan {
  day: number;
  label: string;
  theme: string;
  meals: MealPlan[];
}

export interface WorkoutPlan {
  duration: string;
  days: WorkoutDay[];
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

export interface DiabetesInputs {
  fastingGlucose: number;
  postPrandialGlucose: number;
  hba1c: number;
  systolicBP: number;
  diastolicBP: number;
  age: number;
  weight: number;
}

export interface LabResult {
  parameter: string;
  value: number;
  unit: string;
  normalRange: string;
  status: 'normal' | 'warning' | 'critical';
  interpretation: string;
}

export interface BPResult {
  category: string;
  systolicRange: string;
  diastolicRange: string;
  color: string;
  recommendations: string[];
}
