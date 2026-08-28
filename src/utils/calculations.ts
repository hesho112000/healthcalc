import { UserProfile, CalorieResult, Macros, MealPlan, DailyMealPlan, WorkoutPlan, DiabetesInputs, LabResult, BPResult } from '../types';
import { CUISINE_GROUPS, CUISINE_FLAGS, REGIONAL_FOODS, FRUITS, JUICES, type Cuisine, type MealType } from './cuisineCatalog';

export type { Cuisine, MealType } from './cuisineCatalog';

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

const generateMealPlan = (targetCalories: number, cuisineId?: Cuisine, lang: string = 'en'): MealPlan[] => {
  if (cuisineId) {
    return buildCuisineMealPlan(targetCalories, cuisineId, lang);
  }
  const meals: MealPlan[] = [
    { meal: '🌅 Breakfast', icon: 'meal', calories: Math.round(targetCalories * 0.3), protein: Math.round(targetCalories * 0.3 * 0.3 / 4), carbs: Math.round(targetCalories * 0.3 * 0.45 / 4), fat: Math.round(targetCalories * 0.3 * 0.25 / 9), items: ['Oatmeal with berries', 'Greek yogurt', 'Green tea', '🍎 Apple (Rich in fiber & Vitamin C)', '🧃 Orange Juice (Vitamin C & potassium)'], description: 'Healthy breakfast' },
    { meal: '🍎 Morning Snack', icon: 'snack', calories: Math.round(targetCalories * 0.1), protein: 5, carbs: 15, fat: 5, items: ['🍌 Banana (Potassium & natural energy)', 'Almond butter'], description: 'Light snack' },
    { meal: '☀️ Lunch', icon: 'meal', calories: Math.round(targetCalories * 0.3), protein: Math.round(targetCalories * 0.3 * 0.3 / 4), carbs: Math.round(targetCalories * 0.3 * 0.45 / 4), fat: Math.round(targetCalories * 0.3 * 0.25 / 9), items: ['Grilled chicken breast', 'Brown rice', 'Steamed broccoli', '🍎 Mango (Rich in Vitamin A & C)'], description: 'Balanced lunch' },
    { meal: '🍎 Afternoon Snack', icon: 'snack', calories: Math.round(targetCalories * 0.1), protein: 8, carbs: 15, fat: 4, items: ['🧃 Pomegranate Juice (Polyphenol powerhouse)', 'Greek yogurt'], description: 'Afternoon energy' },
    { meal: '🌙 Dinner', icon: 'meal', calories: Math.round(targetCalories * 0.2), protein: Math.round(targetCalories * 0.2 * 0.3 / 4), carbs: Math.round(targetCalories * 0.2 * 0.45 / 4), fat: Math.round(targetCalories * 0.2 * 0.25 / 9), items: ['Baked fish', 'Roasted vegetables', 'Couscous'], description: 'Light dinner' },
  ];
  return meals;
};

const shuffleFoods = (foods: FoodItem[]): FoodItem[] => [...foods].sort(() => Math.random() - 0.5);

const foodsForSlot = (cuisineId: Cuisine, mealType: MealType): FoodItem[] => {
  const pool = FOODS_DATABASE.filter((f) => f.cuisine.includes(cuisineId) || f.cuisine.includes('all'));
  const source = pool.length > 0 ? pool : FOODS_DATABASE;
  const exact = source.filter((f) => (f.mealType ?? undefined) === mealType);
  if (exact.length >= 2) return exact;
  if (exact.length === 1) return [...exact, ...source.filter((f) => f.mealType !== mealType)];
  return source;
};

export const buildMealRowsForCuisine = (cuisineId: Cuisine, lang: string = 'en', targetCalories: number = 2000): MealPlan[] =>
  buildCuisineMealPlan(targetCalories, cuisineId, lang);

const buildCuisineMealPlan = (targetCalories: number, cuisineId: Cuisine, lang: string): MealPlan[] => {
  const L = (f: FoodItem): string => (lang === 'ar' ? f.name_ar : f.name_en);
  const setUp = (f: FoodItem): string =>
    f.type === 'fruit'
      ? `${L(f)} 🍎 (${f.benefits})`
      : f.type === 'juice'
        ? `${L(f)} 🧃 (${f.benefits})`
        : L(f);
  const pickMain = (mealType: MealType, count: number): FoodItem[] =>
    shuffleFoods(foodsForSlot(cuisineId, mealType).filter((f) => f.type !== 'fruit' && f.type !== 'juice')).slice(0, count);
  const pickUniversal = (type: 'fruit' | 'juice', count: number): FoodItem[] =>
    shuffleFoods(FOODS_DATABASE.filter((f) => f.cuisine.includes('all') && f.type === type)).slice(0, count);
  const pickSnack = (): FoodItem[] =>
    Math.random() < 0.5
      ? shuffleFoods(FOODS_DATABASE.filter((f) => f.cuisine.includes('all') && (f.type === 'fruit' || f.type === 'juice'))).slice(0, 2)
      : pickMain('snack', 2);

  const breakfast = pickMain('breakfast', 3);
  const breakfastFruit = pickUniversal('fruit', 1);
  const breakfastJuice = pickUniversal('juice', 1);
  const morningSnack = pickSnack();
  const lunch = pickMain('lunch', 3);
  const lunchFruit = pickUniversal('fruit', 1);
  const afternoonSnack = pickSnack();
  const dinner = pickMain('dinner', 3);

  const pct = (p: number) => Math.round(targetCalories * p);
  const pProtein = (cal: number) => Math.round(cal * 0.3 / 4);
  const pCarbs = (cal: number) => Math.round(cal * 0.45 / 4);
  const pFat = (cal: number) => Math.round(cal * 0.25 / 9);

  const breakfastCal = pct(0.3);
  const lunchCal = pct(0.3);
  const dinnerCal = pct(0.2);
  const fruitsNote = lang === 'ar' ? ' + فواكه طازجة وعصير طبيعي' : ' + fresh fruit & natural juice';

  return [
    {
      meal: '🌅 Breakfast', icon: 'meal', calories: breakfastCal,
      protein: pProtein(breakfastCal), carbs: pCarbs(breakfastCal), fat: pFat(breakfastCal),
      items: [...breakfast, breakfastFruit[0], breakfastJuice[0]].filter(Boolean).map(setUp),
      description: `${lang === 'ar' ? 'فطور متوازن' : 'Balanced breakfast'} · ${getCuisineName(cuisineId)}${fruitsNote}`,
    },
    {
      meal: '🍎 Morning Snack', icon: 'snack', calories: pct(0.1),
      protein: Math.round(pct(0.1) * 0.2 / 4), carbs: 15, fat: 5,
      items: morningSnack.map(setUp),
      description: lang === 'ar' ? 'وجبة خفيفة' : 'Light snack',
    },
    {
      meal: '☀️ Lunch', icon: 'meal', calories: lunchCal,
      protein: pProtein(lunchCal), carbs: pCarbs(lunchCal), fat: pFat(lunchCal),
      items: [...lunch, lunchFruit[0]].filter(Boolean).map(setUp),
      description: `${lang === 'ar' ? 'غداء متوازن' : 'Balanced lunch'} · ${getCuisineName(cuisineId)}`,
    },
    {
      meal: '🍎 Afternoon Snack', icon: 'snack', calories: pct(0.1),
      protein: 8, carbs: 15, fat: 4,
      items: afternoonSnack.map(setUp),
      description: lang === 'ar' ? 'طاقة بعد الظهر' : 'Afternoon energy',
    },
    {
      meal: '🌙 Dinner', icon: 'meal', calories: dinnerCal,
      protein: pProtein(dinnerCal), carbs: pCarbs(dinnerCal), fat: pFat(dinnerCal),
      items: dinner.map(setUp),
      description: `${lang === 'ar' ? 'عشاء خفيف' : 'Light dinner'} · ${getCuisineName(cuisineId)}`,
    },
  ];
};

const getCuisineName = (cuisineId: Cuisine): string => {
  const meta = CUISINE_META[cuisineId];
  return meta ? meta.label_en : cuisineId;
};

const generateFullMealPlan = (targetCalories: number, cuisineId?: Cuisine, lang: string = 'en'): DailyMealPlan[] => {
  const days: DailyMealPlan[] = [];
  const themes: Record<string, string[]> = {
    egyptian: ['Egyptian Classics', 'High Fiber', 'Balanced', 'Legume Focus', 'Veggie Rich', 'Traditional', 'Protein Focus'],
    italian: ['Mediterranean Italian', 'Pasta Night', 'Balanced', 'Seafood', 'Vegetarian', 'Risotto', 'Lean Protein'],
    asian: ['Asian Inspired', 'Wok Night', 'Balanced', 'Rice Focus', 'Stir Fry', 'Noodle Night', 'Light'],
    mexican: ['Mexican Fiesta', 'Fresh & Light', 'Beans & Grains', 'Taco Night', 'Balanced', 'Grilled', 'Protein Focus'],
    american: ['American Classics', 'Lean Grill', 'Balanced', 'Protein Focus', 'Farm Fresh', 'Comfort Light', 'High Protein'],
    indian: ['Indian Spices', 'Curry Night', 'Balanced', 'Dal Focus', 'Tandoori', 'Vegetarian', 'Protein Focus'],
    mediterranean: ['Mediterranean', 'Protein Focus', 'High Fiber', 'Low Carb', 'Balanced', 'Seafood', 'Plant Based'],
  };
  const baseThemes = ['Mediterranean', 'Protein Focus', 'High Fiber', 'Low Carb', 'Balanced', 'Asian Inspired', 'Plant Based'];
  const regionLabel = cuisineId && CUISINE_GROUPS.find((g) => g.items.some((i) => i.id === cuisineId))?.region;
  const themesForCuisine = cuisineId && themes[cuisineId]
    ? themes[cuisineId]
    : regionLabel
      ? [`${regionLabel} Classics`, 'Protein Focus', 'High Fiber', 'Low Carb', 'Balanced', 'Fresh & Light', 'Plant Based']
      : baseThemes;
  for (let i = 0; i < 30; i++) {
    days.push({
      day: i + 1,
      label: `Day ${i + 1}`,
      theme: themesForCuisine[i % themesForCuisine.length],
      meals: generateMealPlan(targetCalories, cuisineId, lang),
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

export const calculateFullResults = (profile: UserProfile, cuisineId?: Cuisine, lang: string = 'en'): CalorieResult => {
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
    mealPlan: generateMealPlan(targetCalories, cuisineId, lang),
    fullMealPlan: generateFullMealPlan(targetCalories, cuisineId, lang),
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
  name_ar: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
  cuisine: string[];
  mealType?: MealType;
  portion: string;
  type?: 'fruit' | 'juice';
  benefits?: string;
}

export const CUISINE_OPTIONS: Array<{ key: Cuisine; label_ar: string; label_en: string; flag: string }> =
  CUISINE_GROUPS.flatMap((g) => g.items.map((i) => ({
    key: i.id,
    label_ar: i.nameAr,
    label_en: i.nameEn,
    flag: CUISINE_FLAGS[i.id] || '🍽️',
  })));

export const FOODS_DATABASE: FoodItem[] = [
  ...FRUITS.map((f) => ({
    name: f.name_en, name_en: f.name_en, name_ar: f.name_ar,
    calories: f.calories, protein: f.protein, carbs: f.carbs, fat: f.fat,
    category: f.type, cuisine: ['all'], mealType: f.mealType, type: f.type, benefits: f.benefits,
    portion: '1 serving',
  })),
  ...JUICES.map((f) => ({
    name: f.name_en, name_en: f.name_en, name_ar: f.name_ar,
    calories: f.calories, protein: f.protein, carbs: f.carbs, fat: f.fat,
    category: f.type, cuisine: ['all'], mealType: f.mealType, type: f.type, benefits: f.benefits,
    portion: '1 glass',
  })),
  { name: 'Grilled Chicken Breast', name_en: 'Grilled Chicken Breast', name_ar: 'صدر دجاج مشوي', calories: 165, protein: 31, carbs: 0, fat: 3.6, category: 'protein', cuisine: ['american', 'mediterranean', 'high_protein'], portion: '150g' },
  { name: 'Salmon Fillet', name_en: 'Salmon Fillet', name_ar: 'فيليه سلمون', calories: 208, protein: 20, carbs: 0, fat: 13, category: 'protein', cuisine: ['mediterranean', 'asian', 'keto', 'high_protein'], portion: '150g' },
  { name: 'Brown Rice', name_en: 'Brown Rice', name_ar: 'أرز بني', calories: 216, protein: 5, carbs: 45, fat: 1.8, category: 'grain', cuisine: ['asian'], portion: '1 cup' },
  { name: 'Quinoa', name_en: 'Quinoa', name_ar: 'كينوا', calories: 222, protein: 8, carbs: 39, fat: 3.5, category: 'grain', cuisine: ['mediterranean'], portion: '1 cup' },
  { name: 'Sweet Potato', name_en: 'Sweet Potato', name_ar: 'بطاطا حلوة', calories: 103, protein: 2, carbs: 24, fat: 0.1, category: 'vegetable', cuisine: ['american', 'african'], portion: '1 medium' },
  { name: 'Avocado', name_en: 'Avocado', name_ar: 'أفوكادو', calories: 240, protein: 3, carbs: 12, fat: 22, category: 'fruit', cuisine: ['mexican', 'mediterranean', 'keto'], portion: '1 whole' },
  { name: 'Greek Yogurt', name_en: 'Greek Yogurt', name_ar: 'زبادي يوناني', calories: 100, protein: 17, carbs: 6, fat: 0.7, category: 'dairy', cuisine: ['mediterranean', 'high_protein'], portion: '170g' },
  { name: 'Hummus', name_en: 'Hummus', name_ar: 'حمص', calories: 166, protein: 8, carbs: 14, fat: 10, category: 'legume', cuisine: ['middle_eastern'], portion: '100g' },
  { name: 'Lentil Soup', name_en: 'Lentil Soup', name_ar: 'شوربة عدس', calories: 230, protein: 18, carbs: 35, fat: 2, category: 'legume', cuisine: ['middle_eastern', 'egyptian'], portion: '1 bowl' },
  { name: 'Chicken Tikka Masala', name_en: 'Chicken Tikka Masala', name_ar: 'دجاج تكا ماسالا', calories: 430, protein: 30, carbs: 20, fat: 25, category: 'protein', cuisine: ['indian', 'high_protein'], portion: '1 serving' },
  { name: 'Sushi Roll', name_en: 'Sushi Roll', name_ar: 'رول سوشي', calories: 255, protein: 9, carbs: 38, fat: 7, category: 'grain', cuisine: ['asian'], portion: '6 pieces' },
  { name: 'Tacos', name_en: 'Tacos', name_ar: 'تاكوس', calories: 380, protein: 18, carbs: 30, fat: 20, category: 'protein', cuisine: ['mexican'], portion: '2 pieces' },
  { name: 'Falafel Bowl', name_en: 'Falafel Bowl', name_ar: 'طبق فلافل', calories: 450, protein: 15, carbs: 50, fat: 22, category: 'legume', cuisine: ['middle_eastern'], portion: '1 bowl' },
  { name: 'Eggs (2 large)', name_en: 'Eggs (2 large)', name_ar: 'بيض (2 حبة)', calories: 143, protein: 13, carbs: 1, fat: 10, category: 'protein', cuisine: ['american', 'mediterranean', 'keto', 'high_protein'], portion: '2 large' },
  { name: 'Oatmeal', name_en: 'Oatmeal', name_ar: 'شوفان', calories: 154, protein: 5, carbs: 27, fat: 3, category: 'grain', cuisine: ['american'], portion: '1 cup' },
  { name: 'Banana', name_en: 'Banana', name_ar: 'موزة', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, category: 'fruit', cuisine: ['african'], portion: '1 medium' },
  { name: 'Almonds', name_en: 'Almonds', name_ar: 'لوز', calories: 164, protein: 6, carbs: 6, fat: 14, category: 'nuts', cuisine: ['mediterranean', 'indian', 'keto'], portion: '1oz (28g)' },
  { name: 'Broccoli', name_en: 'Broccoli', name_ar: 'بروكلي', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, category: 'vegetable', cuisine: ['asian', 'mediterranean', 'keto'], portion: '1 cup' },
  { name: 'Tuna (canned)', name_en: 'Tuna (canned)', name_ar: 'تونة (معلبة)', calories: 128, protein: 26, carbs: 0, fat: 2.5, category: 'protein', cuisine: ['american', 'mediterranean', 'keto', 'high_protein'], portion: '1 can' },
  { name: 'Couscous', name_en: 'Couscous', name_ar: 'كسكس', calories: 176, protein: 6, carbs: 36, fat: 0.3, category: 'grain', cuisine: ['mediterranean', 'middle_eastern'], portion: '1 cup' },
  { name: 'Koshari', name_en: 'Koshari', name_ar: 'كشري', calories: 450, protein: 15, carbs: 70, fat: 10, category: 'grain', cuisine: ['egyptian'], portion: '1 plate' },
  { name: 'Ful Medames', name_en: 'Ful Medames', name_ar: 'فول مدمس', calories: 340, protein: 18, carbs: 40, fat: 12, category: 'legume', cuisine: ['egyptian', 'middle_eastern'], portion: '1 bowl' },
  { name: 'Molokhia', name_en: 'Molokhia', name_ar: 'ملوخية', calories: 280, protein: 14, carbs: 30, fat: 10, category: 'vegetable', cuisine: ['egyptian'], portion: '1 bowl' },
  { name: 'Pasta Bolognese', name_en: 'Pasta Bolognese', name_ar: 'معكرونة بولونيز', calories: 480, protein: 25, carbs: 55, fat: 15, category: 'grain', cuisine: ['italian'], portion: '1 plate' },
  { name: 'Margherita Pizza', name_en: 'Margherita Pizza', name_ar: 'بيتزا مارغريتا', calories: 400, protein: 18, carbs: 42, fat: 16, category: 'grain', cuisine: ['italian'], portion: '2 slices' },
  { name: 'Risotto', name_en: 'Risotto', name_ar: 'ريزوتو', calories: 380, protein: 12, carbs: 50, fat: 12, category: 'grain', cuisine: ['italian'], portion: '1 cup' },
  { name: 'Grilled Steak', name_en: 'Grilled Steak', name_ar: 'ستيك مشوي', calories: 350, protein: 40, carbs: 0, fat: 18, category: 'protein', cuisine: ['american', 'high_protein'], portion: '200g' },
  { name: 'Cottage Cheese', name_en: 'Cottage Cheese', name_ar: 'جبنة قريش', calories: 110, protein: 14, carbs: 5, fat: 4, category: 'dairy', cuisine: ['high_protein'], portion: '150g' },
  { name: 'Whey Protein Shake', name_en: 'Whey Protein Shake', name_ar: 'شيك بروتين مصل اللبن', calories: 120, protein: 25, carbs: 3, fat: 1, category: 'protein', cuisine: ['high_protein'], portion: '1 scoop' },
  { name: 'Paneer Tikka', name_en: 'Paneer Tikka', name_ar: 'بانير تيكا', calories: 320, protein: 22, carbs: 8, fat: 22, category: 'protein', cuisine: ['indian', 'high_protein'], portion: '1 serving' },
  { name: 'Butter Chicken', name_en: 'Butter Chicken', name_ar: 'دجاج بالزبدة', calories: 480, protein: 28, carbs: 16, fat: 32, category: 'protein', cuisine: ['indian'], portion: '1 serving' },
  { name: 'Pad Thai', name_en: 'Pad Thai', name_ar: 'باد تاي', calories: 420, protein: 18, carbs: 50, fat: 14, category: 'grain', cuisine: ['asian'], portion: '1 plate' },
  { name: 'Caesar Salad', name_en: 'Caesar Salad', name_ar: 'سلطة سيزر', calories: 350, protein: 22, carbs: 12, fat: 24, category: 'vegetable', cuisine: ['american', 'mediterranean'], portion: '1 bowl' },
  { name: 'Steak & Eggs', name_en: 'Steak & Eggs', name_ar: 'ستيك وبويض', calories: 450, protein: 42, carbs: 2, fat: 28, category: 'protein', cuisine: ['american', 'keto', 'high_protein'], portion: '1 plate' },
  { name: 'Keto Salmon Bowl', name_en: 'Keto Salmon Bowl', name_ar: 'طبق سلمون كيتو', calories: 380, protein: 30, carbs: 5, fat: 26, category: 'protein', cuisine: ['keto', 'mediterranean'], portion: '1 bowl' },
  { name: 'Cheese Omelette', name_en: 'Cheese Omelette', name_ar: 'أومليت بالجبنة', calories: 300, protein: 20, carbs: 2, fat: 22, category: 'protein', cuisine: ['american', 'italian', 'keto', 'high_protein'], portion: '3 eggs' },
  { name: 'Grilled Vegetables', name_en: 'Grilled Vegetables', name_ar: 'خضروات مشوية', calories: 120, protein: 4, carbs: 14, fat: 6, category: 'vegetable', cuisine: ['mediterranean', 'italian'], portion: '1 plate' },
  { name: 'Caesar Chicken Wrap', name_en: 'Caesar Chicken Wrap', name_ar: 'ساندويتش سيزر بالدجاج', calories: 380, protein: 28, carbs: 30, fat: 14, category: 'protein', cuisine: ['american'], portion: '1 wrap' },
  { name: 'Tofu Stir Fry', name_en: 'Tofu Stir Fry', name_ar: 'توفو مقلي', calories: 280, protein: 16, carbs: 18, fat: 16, category: 'protein', cuisine: ['asian'], portion: '1 plate' },
  ...Object.entries(REGIONAL_FOODS).flatMap(([cuisineId, foods]) =>
    foods.map((f) => ({
      name: f.name_en,
      name_en: f.name_en,
      name_ar: f.name_ar,
      calories: f.calories,
      protein: f.protein,
      carbs: f.carbs,
      fat: f.fat,
      category: f.mealType,
      cuisine: [cuisineId],
      mealType: f.mealType,
      portion: '1 serving',
    }))
  ),
];

const CUISINE_COLORS = ['bg-blue-100 text-blue-700', 'bg-red-100 text-red-700', 'bg-yellow-100 text-yellow-700', 'bg-green-100 text-green-700', 'bg-orange-100 text-orange-700', 'bg-amber-100 text-amber-700', 'bg-emerald-100 text-emerald-700', 'bg-rose-100 text-rose-700', 'bg-lime-100 text-lime-700', 'bg-purple-100 text-purple-700', 'bg-indigo-100 text-indigo-700', 'bg-teal-100 text-teal-700'];

export const CUISINE_META: Record<string, { label: string; emoji: string; color: string; flag: string; label_ar: string; label_en: string }> =
  CUISINE_GROUPS.flatMap((g) => g.items).reduce((acc, item, idx) => {
    acc[item.id] = {
      label: item.nameEn,
      emoji: CUISINE_FLAGS[item.id] || '🍽️',
      color: CUISINE_COLORS[idx % CUISINE_COLORS.length],
      flag: CUISINE_FLAGS[item.id] || '🍽️',
      label_ar: item.nameAr,
      label_en: item.nameEn,
    };
    return acc;
  }, {} as Record<string, { label: string; emoji: string; color: string; flag: string; label_ar: string; label_en: string }>);

export { CUISINE_GROUPS, CUISINE_FLAGS, REGIONAL_FOODS } from './cuisineCatalog';

export const getFoodsByCuisine = (cuisine: Cuisine, _targetCalories?: number): FoodItem[] =>
  FOODS_DATABASE.filter((f) => f.cuisine.includes(cuisine) || f.cuisine.includes('all'));

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
