export type Language = 'en' | 'fr' | 'es' | 'ar';

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
