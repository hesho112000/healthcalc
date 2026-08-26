import { UserProfile, CalorieResult, Macros, MealPlan, DailyMealPlan, WorkoutPlan, DiabetesInputs, LabResult, BPResult } from '../types';

export const calculateBMI = (weight: number, height: number): number => {
  const h = height / 100;
  return +(weight / (h * h)).toFixed(1);
};

export const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
  if (gender === 'male' || gender === 'Male') return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
};

export const calculateTDEE = (bmr: number, activity: string): number => {
  const map: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
  return Math.round(bmr * (map[activity] || 1.55));
};

export const calculateCalories = calculateTDEE;

export const calculateMacros = (calories: number) => ({
  protein: Math.round((calories * 0.3) / 4),
  carbs: Math.round((calories * 0.45) / 4),
  fat: Math.round((calories * 0.25) / 9),
});

const generateMealPlan = (targetCalories: number): MealPlan[] => {
  const meals: MealPlan[] = [
    { meal: '🌅 Breakfast', icon: 'meal', calories: Math.round(targetCalories * 0.3), protein: Math.round(targetCalories * 0.3 * 0.3 / 4), carbs: Math.round(targetCalories * 0.3 * 0.45 / 4), fat: Math.round(targetCalories * 0.3 * 0.25 / 9), items: ['Oatmeal with berries', 'Greek yogurt', 'Green tea'], description: 'Healthy breakfast' },
    { meal: '🍎 Morning Snack', icon: 'snack', calories: Math.round(targetCalories * 0.1), protein: 5, carbs: 15, fat: 5, items: ['Apple slices', 'Almond butter'], description: 'Light snack' },
    { meal: '☀️ Lunch', icon: 'meal', calories: Math.round(targetCalories * 0.3), protein: Math.round(targetCalories * 0.3 * 0.3 / 4), carbs: Math.round(targetCalories * 0.3 * 0.45 / 4), fat: Math.round(targetCalories * 0.3 * 0.25 / 9), items: ['Grilled chicken breast', 'Brown rice', 'Steamed broccoli'], description: 'Balanced lunch' },
    { meal: '🍎 Afternoon Snack', icon: 'snack', calories: Math.round(targetCalories * 0.1), protein: 8, carbs: 15, fat: 4, items: ['Greek yogurt', 'Honey drizzle'], description: 'Afternoon energy' },
    { meal: '🌙 Dinner', icon: 'meal', calories: Math.round(targetCalories * 0.2), protein: Math.round(targetCalories * 0.2 * 0.3 / 4), carbs: Math.round(targetCalories * 0.2 * 0.45 / 4), fat: Math.round(targetCalories * 0.2 * 0.25 / 9), items: ['Baked fish', 'Roasted vegetables', 'Couscous'], description: 'Light dinner' },
  ];
  return meals;
};

const generateFullMealPlan = (targetCalories: number): DailyMealPlan[] => {
  const days: DailyMealPlan[] = [];
  const themes = ['Mediterranean', 'Protein Focus', 'High Fiber', 'Low Carb', 'Balanced', 'Asian Inspired', 'Plant Based'];
  for (let i = 0; i < 30; i++) {
    days.push({
      day: i + 1,
      label: `Day ${i + 1}`,
      theme: themes[i % themes.length],
      meals: generateMealPlan(targetCalories),
    });
  }
  return days;
};

const generateWorkoutPlan = (goal: string): WorkoutPlan => {
  const days = goal === 'gain_muscle' ? ['Chest & Triceps', 'Back & Biceps', 'Rest', 'Legs & Glutes', 'Shoulders & Abs', 'Cardio', 'Rest']
    : goal === 'lose_weight' ? ['Cardio HIIT', 'Full Body', 'Cardio', 'Upper Body', 'Lower Body', 'Active Recovery', 'Rest']
    : ['Full Body', 'Cardio', 'Rest', 'Yoga', 'Light Weights', 'Cardio', 'Rest'];
  return {
    duration: '30 days',
    days: days.map((focus, i) => ({ day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i], focus, exercises: [] })),
  };
};

export const calculateFullResults = (profile: UserProfile): CalorieResult => {
  const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
  const tdee = calculateTDEE(bmr, profile.activityLevel);
  let targetCalories = tdee;
  if (profile.goal === 'lose_weight') targetCalories = Math.round(tdee - 500);
  else if (profile.goal === 'gain_muscle') targetCalories = Math.round(tdee + 300);
  const macros: Macros = {
    protein: Math.round((targetCalories * 0.3) / 4),
    carbs: Math.round((targetCalories * 0.45) / 4),
    fat: Math.round((targetCalories * 0.25) / 9),
    proteinGrams: Math.round((targetCalories * 0.3) / 4),
    carbsGrams: Math.round((targetCalories * 0.45) / 4),
    fatGrams: Math.round((targetCalories * 0.25) / 9),
  };
  return {
    bmr, tdee, targetCalories, macros,
    mealPlan: generateMealPlan(targetCalories),
    fullMealPlan: generateFullMealPlan(targetCalories),
    workoutPlan: generateWorkoutPlan(profile.goal),
  };
};

export const interpretLabResults = (inputs: DiabetesInputs | Record<string, number>): LabResult[] => {
  const mapping: Array<{ param: string; key: string; min: number; max: number; unit: string }> = [
    { param: 'Fasting Glucose', key: 'fastingGlucose', min: 70, max: 100, unit: 'mg/dL' },
    { param: 'Post-Prandial Glucose', key: 'postPrandialGlucose', min: 0, max: 140, unit: 'mg/dL' },
    { param: 'HbA1c', key: 'hba1c', min: 4.0, max: 5.7, unit: '%' },
    { param: 'Systolic BP', key: 'systolicBP', min: 90, max: 120, unit: 'mmHg' },
    { param: 'Diastolic BP', key: 'diastolicBP', min: 60, max: 80, unit: 'mmHg' },
  ];
  return mapping.map(({ param, key, min, max, unit }) => {
    const value = (inputs as any)[key] ?? 0;
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    if (value < min * 0.8 || value > max * 1.5) status = 'critical';
    else if (value < min || value > max) status = 'warning';
    const interpretation = status === 'normal' ? 'Within normal range' : status === 'warning' ? 'Outside normal range — consult doctor' : 'Critical — seek medical attention';
    return { parameter: param, value, unit, normalRange: `${min}–${max} ${unit}`, status, interpretation };
  });
};

export const classifyBloodPressure = (systolic: number, diastolic: number): BPResult => {
  if (systolic < 120 && diastolic < 80) return { category: 'Normal', systolicRange: '90-119', diastolicRange: '60-79', color: 'green', recommendations: ['Maintain healthy lifestyle', 'Continue regular exercise'] };
  if (systolic < 130 && diastolic < 80) return { category: 'Elevated', systolicRange: '120-129', diastolicRange: '60-79', color: 'yellow', recommendations: ['Reduce sodium intake', 'Increase physical activity', 'Monitor regularly'] };
  if (systolic < 140 || diastolic < 90) return { category: 'High Blood Pressure Stage 1', systolicRange: '130-139', diastolicRange: '80-89', color: 'orange', recommendations: ['Consult a physician', 'Reduce sodium', 'Regular monitoring', 'Medication may be needed'] };
  return { category: 'High Blood Pressure Stage 2', systolicRange: '≥140', diastolicRange: '≥90', color: 'red', recommendations: ['Seek medical attention', 'Medication likely required', 'Lifestyle changes essential', 'Regular monitoring critical'] };
};

export interface FoodItem {
  name: string;
  name_en: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
  cuisine: string[];
  portion: string;
}

export type Cuisine = 'mediterranean' | 'asian' | 'american' | 'mexican' | 'indian' | 'middle_eastern' | 'african' | 'egyptian';

export const FOODS_DATABASE: FoodItem[] = [
  { name: 'Grilled Chicken Breast', name_en: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, category: 'protein', cuisine: ['american', 'mediterranean'], portion: '150g' },
  { name: 'Salmon Fillet', name_en: 'Salmon Fillet', calories: 208, protein: 20, carbs: 0, fat: 13, category: 'protein', cuisine: ['mediterranean', 'asian'], portion: '150g' },
  { name: 'Brown Rice', name_en: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8, category: 'grain', cuisine: ['asian'], portion: '1 cup' },
  { name: 'Quinoa', name_en: 'Quinoa', calories: 222, protein: 8, carbs: 39, fat: 3.5, category: 'grain', cuisine: ['mediterranean'], portion: '1 cup' },
  { name: 'Sweet Potato', name_en: 'Sweet Potato', calories: 103, protein: 2, carbs: 24, fat: 0.1, category: 'vegetable', cuisine: ['american', 'african'], portion: '1 medium' },
  { name: 'Avocado', name_en: 'Avocado', calories: 240, protein: 3, carbs: 12, fat: 22, category: 'fruit', cuisine: ['mexican', 'mediterranean'], portion: '1 whole' },
  { name: 'Greek Yogurt', name_en: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0.7, category: 'dairy', cuisine: ['mediterranean'], portion: '170g' },
  { name: 'Hummus', name_en: 'Hummus', calories: 166, protein: 8, carbs: 14, fat: 10, category: 'legume', cuisine: ['middle_eastern'], portion: '100g' },
  { name: 'Lentil Soup', name_en: 'Lentil Soup', calories: 230, protein: 18, carbs: 35, fat: 2, category: 'legume', cuisine: ['middle_eastern', 'egyptian'], portion: '1 bowl' },
  { name: 'Chicken Tikka Masala', name_en: 'Chicken Tikka Masala', calories: 430, protein: 30, carbs: 20, fat: 25, category: 'protein', cuisine: ['indian'], portion: '1 serving' },
  { name: 'Sushi Roll', name_en: 'Sushi Roll', calories: 255, protein: 9, carbs: 38, fat: 7, category: 'grain', cuisine: ['asian'], portion: '6 pieces' },
  { name: 'Tacos', name_en: 'Tacos', calories: 380, protein: 18, carbs: 30, fat: 20, category: 'protein', cuisine: ['mexican'], portion: '2 pieces' },
  { name: 'Falafel Bowl', name_en: 'Falafel Bowl', calories: 450, protein: 15, carbs: 50, fat: 22, category: 'legume', cuisine: ['middle_eastern'], portion: '1 bowl' },
  { name: 'Eggs (2 large)', name_en: 'Eggs (2 large)', calories: 143, protein: 13, carbs: 1, fat: 10, category: 'protein', cuisine: ['american', 'mediterranean'], portion: '2 large' },
  { name: 'Oatmeal', name_en: 'Oatmeal', calories: 154, protein: 5, carbs: 27, fat: 3, category: 'grain', cuisine: ['american'], portion: '1 cup' },
  { name: 'Banana', name_en: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, category: 'fruit', cuisine: ['african'], portion: '1 medium' },
  { name: 'Almonds', name_en: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14, category: 'nuts', cuisine: ['mediterranean', 'indian'], portion: '1oz (28g)' },
  { name: 'Broccoli', name_en: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, category: 'vegetable', cuisine: ['asian', 'mediterranean'], portion: '1 cup' },
  { name: 'Tuna (canned)', name_en: 'Tuna (canned)', calories: 128, protein: 26, carbs: 0, fat: 2.5, category: 'protein', cuisine: ['american', 'mediterranean'], portion: '1 can' },
  { name: 'Couscous', name_en: 'Couscous', calories: 176, protein: 6, carbs: 36, fat: 0.3, category: 'grain', cuisine: ['mediterranean', 'middle_eastern'], portion: '1 cup' },
  { name: 'Koshari', name_en: 'Koshari', calories: 450, protein: 15, carbs: 70, fat: 10, category: 'grain', cuisine: ['egyptian'], portion: '1 plate' },
  { name: 'Ful Medames', name_en: 'Ful Medames', calories: 340, protein: 18, carbs: 40, fat: 12, category: 'legume', cuisine: ['egyptian', 'middle_eastern'], portion: '1 bowl' },
  { name: 'Molokhia', name_en: 'Molokhia', calories: 280, protein: 14, carbs: 30, fat: 10, category: 'vegetable', cuisine: ['egyptian'], portion: '1 bowl' },
];

export const CUISINE_META: Record<string, { label: string; emoji: string; color: string; flag: string; label_ar: string; label_en: string }> = {
  mediterranean: { label: 'Mediterranean', emoji: '🫒', color: 'bg-blue-100 text-blue-700', flag: '🌍', label_ar: 'متوسطية', label_en: 'Mediterranean' },
  asian: { label: 'Asian', emoji: '🥢', color: 'bg-red-100 text-red-700', flag: '🌏', label_ar: 'آسيوية', label_en: 'Asian' },
  american: { label: 'American', emoji: '🍔', color: 'bg-yellow-100 text-yellow-700', flag: '🇺🇸', label_ar: 'أمريكية', label_en: 'American' },
  mexican: { label: 'Mexican', emoji: '🌮', color: 'bg-green-100 text-green-700', flag: '🇲🇽', label_ar: 'مكسيكية', label_en: 'Mexican' },
  indian: { label: 'Indian', emoji: '🍛', color: 'bg-orange-100 text-orange-700', flag: '🇮🇳', label_ar: 'هندية', label_en: 'Indian' },
  middle_eastern: { label: 'Middle Eastern', emoji: '🧆', color: 'bg-amber-100 text-amber-700', flag: '🇸🇦', label_ar: 'شرق أوسطية', label_en: 'Middle Eastern' },
  african: { label: 'African', emoji: '🌍', color: 'bg-emerald-100 text-emerald-700', flag: '🌍', label_ar: 'أفريقية', label_en: 'African' },
  egyptian: { label: 'Egyptian', emoji: '🇪🇬', color: 'bg-red-100 text-red-700', flag: '🇪🇬', label_ar: 'مصرية', label_en: 'Egyptian' },
};

export const getFoodsByCuisine = (cuisine: Cuisine, _targetCalories?: number): FoodItem[] =>
  FOODS_DATABASE.filter((f) => f.cuisine.includes(cuisine));

export const generateMealWithCuisine = (cuisine: Cuisine, calories: number): FoodItem[] => {
  const foods = getFoodsByCuisine(cuisine);
  const meal: FoodItem[] = [];
  let remaining = calories;
  const shuffled = [...foods].sort(() => Math.random() - 0.5);
  for (const food of shuffled) {
    if (remaining <= 0) break;
    meal.push(food);
    remaining -= food.calories;
  }
  return meal;
};
