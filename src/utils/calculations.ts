import { UserProfile, CalorieResult, Macros, MealPlan, DailyMealPlan, WorkoutPlan, DiabetesInputs, LabResult, BPResult } from '../types';
import { CUISINE_GROUPS, CUISINE_FLAGS, REGIONAL_FOODS, FRUITS, JUICES, CUISINE_FRUITS, CUISINE_JUICES, getPortion, getPortionMeasure, type Portion, type Cuisine, type MealType } from './cuisineCatalog';
import { usdaEnrich } from './usda-meals-database';
import { isHeavyMeal } from '../data/cuisine-allowed';
import { EGYPTIAN_FULL, type EgyptianFullDish } from '../data/egyptian-full';
import { LIBYAN_FULL, type LibyanFullDish } from '../data/libyan-full';
import { TUNISIAN_FULL, type TunisianFullDish } from '../data/tunisian-full';
import { ALGERIAN_FULL, type AlgerianFullDish } from '../data/algerian-full';
import { MOROCCAN_FULL, type MoroccanFullDish } from '../data/moroccan-full';
import { SAUDI_FULL, type SaudiFullDish } from '../data/saudi-full';
import { EMIRATI_FULL, type EmiratiFullDish } from '../data/emirati-full';
import { KUWAITI_FULL, type KuwaitiFullDish } from '../data/kuwaiti-full';
import { QATAR_FULL, type QatarFullDish } from '../data/qatar-full';
import { BAHRAINI_FULL, type BahrainiFullDish } from '../data/bahraini-full';
import { OMANI_FULL, type OmaniFullDish } from '../data/omani-full';
import { INDIAN_FULL, type IndianFullDish } from '../data/indian-full';
import { PAKISTANI_FULL, type PakistaniFullDish } from '../data/pakistani-full';
import { CHINESE_FULL, type ChineseFullDish } from '../data/chinese-full';
import { JAPANESE_FULL, type JapaneseFullDish } from '../data/japanese-full';
import { KOREAN_FULL, type KoreanFullDish } from '../data/korean-full';
import { THAI_FULL, type ThaiFullDish } from '../data/thai-full';
import { ITALIAN_FULL, type ItalianFullDish } from '../data/italian-full';
import { FRENCH_FULL, type FrenchFullDish } from '../data/french-full';
import { SPANISH_FULL, type SpanishFullDish } from '../data/spanish-full';
import { GREEK_FULL, type GreekFullDish } from '../data/greek-full';
import { TURKISH_FULL, type TurkishFullDish } from '../data/turkish-full';
import { BRITISH_FULL, type BritishFullDish } from '../data/british-full';
import { SWISS_FULL, type SwissFullDish } from '../data/swiss-full';
import { MEXICAN_FULL, type MexicanFullDish } from '../data/mexican-full';
import { AMERICAN_FULL, type AmericanFullDish } from '../data/american-full';
import { CUBAN_FULL, type CubanFullDish } from '../data/cuban-full';
import { COSTA_RICAN_FULL, type CostaRicanFullDish } from '../data/costa-rican-full';
import { JAMAICAN_FULL, type JamaicanFullDish } from '../data/jamaican-full';

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

export const getActivityFactor = (days: number): number => {
  if (days <= 1) return 1.2;
  if (days <= 3) return 1.375;
  if (days <= 5) return 1.55;
  return 1.725;
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
    { meal: '🌅 Breakfast', icon: 'meal', calories: Math.round(targetCalories * 0.3), protein: Math.round(targetCalories * 0.3 * 0.3 / 4), carbs: Math.round(targetCalories * 0.3 * 0.45 / 4), fat: Math.round(targetCalories * 0.3 * 0.25 / 9), items: lang === 'ar' ? ['شوفان مع التوت', 'زبادي يوناني', 'شاي أخضر', '🍎 فاكهة: تفاحة (غنية بالألياف وفيتامين سي)', '🧃 مشروب: عصير برتقال (فيتامين سي وبوتاسيوم)'] : ['Oatmeal with berries', 'Greek yogurt', 'Green tea', '🍎 Fruit: Apple (Rich in fiber & Vitamin C)', '🧃 Drink: Orange Juice (Vitamin C & potassium)'], description: lang === 'ar' ? 'فطور صحي' : 'Healthy breakfast' },
    { meal: '🍎 Morning Snack', icon: 'snack', calories: Math.round(targetCalories * 0.1), protein: 5, carbs: 15, fat: 5, items: lang === 'ar' ? ['🍌 فاكهة: موزة (بوتاسيوم وطاقة طبيعية)', 'زبدة لوز'] : ['🍌 Fruit: Banana (Potassium & natural energy)', 'Almond butter'], description: lang === 'ar' ? 'وجبة خفيفة' : 'Light snack' },
    { meal: '☀️ Lunch', icon: 'meal', calories: Math.round(targetCalories * 0.3), protein: Math.round(targetCalories * 0.3 * 0.3 / 4), carbs: Math.round(targetCalories * 0.3 * 0.45 / 4), fat: Math.round(targetCalories * 0.3 * 0.25 / 9), items: lang === 'ar' ? ['صدر دجاج مشوي', 'أرز بني', 'بروكلي مطهو على البخار', '🥭 فاكهة: مانجو (غني بفيتامين أ وسي)'] : ['Grilled chicken breast', 'Brown rice', 'Steamed broccoli', '🥭 Fruit: Mango (Rich in Vitamin A & C)'], description: lang === 'ar' ? 'غداء متوازن' : 'Balanced lunch' },
    { meal: '🍎 Afternoon Snack', icon: 'snack', calories: Math.round(targetCalories * 0.1), protein: 8, carbs: 15, fat: 4, items: lang === 'ar' ? ['🧃 مشروب: عصير رمان (قوة البوليفينول)', 'زبادي يوناني'] : ['🧃 Drink: Pomegranate Juice (Polyphenol powerhouse)', 'Greek yogurt'], description: lang === 'ar' ? 'طاقة بعد الظهر' : 'Afternoon energy' },
    { meal: '🌙 Dinner', icon: 'meal', calories: Math.round(targetCalories * 0.2), protein: Math.round(targetCalories * 0.2 * 0.3 / 4), carbs: Math.round(targetCalories * 0.2 * 0.45 / 4), fat: Math.round(targetCalories * 0.2 * 0.25 / 9), items: lang === 'ar' ? ['سمك مشوي', 'خضار مشوية', 'كسكس'] : ['Baked fish', 'Roasted vegetables', 'Couscous'], description: lang === 'ar' ? 'عشاء خفيف' : 'Light dinner' },
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

const FRUIT_EMOJI: Record<string, string> = {
  'Apple': '🍎', 'Banana': '🍌', 'Orange': '🍊', 'Mango': '🥭', 'Strawberries': '🍓', 'Watermelon': '🍉',
  'Pineapple': '🍍', 'Kiwi': '🥝', 'Avocado': '🥑', 'Grapes': '🍇', 'Peach': '🍑', 'Pear': '🍐',
  'Blueberries': '🫐', 'Raspberries': '🍇', 'Blackberries': '🍇', 'Cherries': '🍒', 'Pomegranate': '🍎',
  'Papaya': '🍈', 'Guava': '🍈', 'Cantaloupe': '🍈', 'Honeydew Melon': '🍈', 'Plum': '🍑', 'Apricot': '🍑',
  'Fig': '🍇', 'Dates (3 pcs)': '🌴', 'Lemon': '🍋', 'Lime': '🍋', 'Grapefruit': '🍊', 'Starfruit': '⭐',
  'Dragon Fruit': '🐉', 'Passion Fruit': '🍈', 'Coconut (fresh)': '🥥', 'Cranberries': '🍒',
};

const buildCuisineMealPlan = (targetCalories: number, cuisineId: Cuisine, lang: string): MealPlan[] => {
  const L = (f: FoodItem): string => (lang === 'ar' ? f.name_ar : f.name_en);
  const fruitWord = lang === 'ar' ? 'فاكهة' : 'Fruit';
  const drinkWord = lang === 'ar' ? 'مشروب' : 'Drink';
  const measurePart = (f: FoodItem): string => {
    const m = getPortionMeasure(f.portion, lang);
    return m ? ` · ${m}` : '';
  };
  const setUp = (f: FoodItem): string =>
    f.type === 'fruit'
      ? `${FRUIT_EMOJI[f.name_en] || '🍏'} ${fruitWord}: ${L(f)} (${f.benefits})${measurePart(f)}`
      : f.type === 'juice'
        ? `🧃 ${drinkWord}: ${L(f)} (${f.benefits})${measurePart(f)}`
        : `${L(f)}${measurePart(f)}`;
  const pickMain = (mealType: MealType, count: number): FoodItem[] =>
    shuffleFoods(foodsForSlot(cuisineId, mealType).filter((f) => f.type !== 'fruit' && f.type !== 'juice')).slice(0, count);
  const pickByMealType = (mealType: MealType, count: number): FoodItem[] => shuffleFoods(foodsForSlot(cuisineId, mealType)).slice(0, count);
  const pickSnack = (): FoodItem[] =>
    Math.random() < 0.5
      ? [...pickByMealType('fruit', 1), ...pickByMealType('juice', 1)]
      : pickMain('snack', 2);

  const breakfastMain = pickMain('breakfast', 1);
  const breakfastFruit = pickByMealType('fruit', 1);
  const breakfastJuice = pickByMealType('juice', 1);
  const morningSnack = pickSnack();
  const lunch = pickMain('lunch', 3);
  const lunchFruit = pickByMealType('fruit', 1);
  const afternoonSnack = pickSnack();
  const dinner = pickMain('dinner', 3);

  const pct = (p: number) => Math.round(targetCalories * p);
  const pProtein = (cal: number) => Math.round(cal * 0.3 / 4);
  const pCarbs = (cal: number) => Math.round(cal * 0.45 / 4);
  const pFat = (cal: number) => Math.round(cal * 0.25 / 9);

  const breakfastCal = pct(0.3);
  const lunchCal = pct(0.3);
  const dinnerCal = pct(0.2);

  return [
    {
      meal: '🌅 Breakfast', icon: 'meal', calories: breakfastCal,
      protein: pProtein(breakfastCal), carbs: pCarbs(breakfastCal), fat: pFat(breakfastCal),
      items: [...breakfastMain, ...breakfastFruit, ...breakfastJuice].map(setUp),
      description: `${lang === 'ar' ? 'فطور متوازن' : 'Balanced breakfast'} · ${getCuisineName(cuisineId, lang)}`,
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
      items: [...lunch, ...lunchFruit].map(setUp),
      description: `${lang === 'ar' ? 'غداء متوازن' : 'Balanced lunch'} · ${getCuisineName(cuisineId, lang)}`,
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
      description: `${lang === 'ar' ? 'عشاء خفيف' : 'Light dinner'} · ${getCuisineName(cuisineId, lang)}`,
    },
  ];
};

const getCuisineName = (cuisineId: Cuisine, lang: string): string => {
  const meta = CUISINE_META[cuisineId];
  if (!meta) return cuisineId;
  return lang === 'ar' ? meta.label_ar : meta.label_en;
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
  const activityFactor = profile.workoutDays !== undefined
    ? getActivityFactor(profile.workoutDays)
    : ({ sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 } as Record<string, number>)[profile.activityLevel] || 1.55;
  const tdee = Math.round(bmr * activityFactor);
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
  portion: Portion;
  type?: 'fruit' | 'juice';
  verified?: boolean;
  nutritionSource?: string;
  fiber?: number;
  sodium?: number;
  sugar?: number;
  saturatedFat?: number;
  cholesterol?: number;
  benefits?: string;
  halal?: boolean;
  heavy?: boolean;
}

export const CUISINE_OPTIONS: Array<{ key: Cuisine; label_ar: string; label_en: string; flag: string }> =
  CUISINE_GROUPS.flatMap((g) => g.items.map((i) => ({
    key: i.id,
    label_ar: i.nameAr,
    label_en: i.nameEn,
    flag: CUISINE_FLAGS[i.id] || '🍽️',
  })));

export const FOODS_DATABASE_RAW: FoodItem[] = [
  ...FRUITS.map((f) => ({
    name: f.name_en, name_en: f.name_en, name_ar: f.name_ar,
    calories: f.calories, protein: f.protein, carbs: f.carbs, fat: f.fat,
    category: f.type, cuisine: ['all'], mealType: f.mealType, type: f.type, benefits: f.benefits,
    portion: getPortion(f.name_en, f.mealType),
  })),
  ...JUICES.map((f) => ({
    name: f.name_en, name_en: f.name_en, name_ar: f.name_ar,
    calories: f.calories, protein: f.protein, carbs: f.carbs, fat: f.fat,
    category: f.type, cuisine: ['all'], mealType: f.mealType, type: f.type, benefits: f.benefits,
    portion: getPortion(f.name_en, f.mealType),
  })),
  ...Object.entries(CUISINE_FRUITS).flatMap(([cuisineId, list]) =>
    list.map((f) => ({
      name: f.name_en, name_en: f.name_en, name_ar: f.name_ar,
      calories: f.calories, protein: f.protein, carbs: f.carbs, fat: f.fat,
      category: f.type, cuisine: [cuisineId], mealType: f.mealType, type: f.type, benefits: f.benefits,
      portion: getPortion(f.name_en, f.mealType),
    }))
  ),
  ...Object.entries(CUISINE_JUICES).flatMap(([cuisineId, list]) =>
    list.map((f) => ({
      name: f.name_en, name_en: f.name_en, name_ar: f.name_ar,
      calories: f.calories, protein: f.protein, carbs: f.carbs, fat: f.fat,
      category: f.type, cuisine: [cuisineId], mealType: f.mealType, type: f.type, benefits: f.benefits,
      portion: getPortion(f.name_en, f.mealType),
    }))
  ),
  { name: 'Grilled Chicken Breast', name_en: 'Grilled Chicken Breast', name_ar: 'صدر دجاج مشوي', calories: 165, protein: 31, carbs: 0, fat: 3.6, category: 'protein', cuisine: ['american', 'mediterranean', 'high_protein'], portion: { grams: 150, measure: '1 breast (150g)' } },
  { name: 'Salmon Fillet', name_en: 'Salmon Fillet', name_ar: 'فيليه سلمون', calories: 208, protein: 20, carbs: 0, fat: 13, category: 'protein', cuisine: ['mediterranean', 'asian', 'keto', 'high_protein'], portion: { grams: 150, measure: '1 fillet (150g)' } },
  { name: 'Brown Rice', name_en: 'Brown Rice', name_ar: 'أرز بني', calories: 216, protein: 5, carbs: 45, fat: 1.8, category: 'grain', cuisine: ['asian'], portion: { grams: 195, measure: '1 cup (195g)' } },
  { name: 'Quinoa', name_en: 'Quinoa', name_ar: 'كينوا', calories: 222, protein: 8, carbs: 39, fat: 3.5, category: 'grain', cuisine: ['mediterranean'], portion: { grams: 185, measure: '1 cup (185g)' } },
  { name: 'Sweet Potato', name_en: 'Sweet Potato', name_ar: 'بطاطا حلوة', calories: 103, protein: 2, carbs: 24, fat: 0.1, category: 'vegetable', cuisine: ['american', 'african'], portion: { grams: 130, measure: '1 medium (130g)' } },
  { name: 'Avocado', name_en: 'Avocado', name_ar: 'أفوكادو', calories: 240, protein: 3, carbs: 12, fat: 22, category: 'fruit', cuisine: ['mexican', 'mediterranean', 'keto'], portion: { grams: 100, measure: '½ medium (100g)' } },
  { name: 'Greek Yogurt', name_en: 'Greek Yogurt', name_ar: 'زبادي يوناني', calories: 100, protein: 17, carbs: 6, fat: 0.7, category: 'dairy', cuisine: ['mediterranean', 'high_protein'], portion: { grams: 170, measure: '1 cup (170g)' } },
  { name: 'Hummus', name_en: 'Hummus', name_ar: 'حمص', calories: 166, protein: 8, carbs: 14, fat: 10, category: 'legume', cuisine: ['middle_eastern'], portion: { grams: 100, measure: '¼ cup (100g)' } },
  { name: 'Lentil Soup', name_en: 'Lentil Soup', name_ar: 'شوربة عدس', calories: 230, protein: 18, carbs: 35, fat: 2, category: 'legume', cuisine: ['middle_eastern', 'egyptian'], portion: { grams: 245, measure: '1 cup (245g)' } },
  { name: 'Chicken Tikka Masala', name_en: 'Chicken Tikka Masala', name_ar: 'دجاج تكا ماسالا', calories: 430, protein: 30, carbs: 20, fat: 25, category: 'protein', cuisine: ['indian', 'high_protein'], portion: { grams: 200, measure: '1 bowl (200g)' } },
  { name: 'Sushi Roll', name_en: 'Sushi Roll', name_ar: 'رول سوشي', calories: 255, protein: 9, carbs: 38, fat: 7, category: 'grain', cuisine: ['asian'], portion: { grams: 180, measure: '6 pieces (180g)' } },
  { name: 'Tacos', name_en: 'Tacos', name_ar: 'تاكوس', calories: 380, protein: 18, carbs: 30, fat: 20, category: 'protein', cuisine: ['mexican'], portion: { grams: 180, measure: '2 tacos (180g)' } },
  { name: 'Falafel Bowl', name_en: 'Falafel Bowl', name_ar: 'طبق فلافل', calories: 450, protein: 15, carbs: 50, fat: 22, category: 'legume', cuisine: ['middle_eastern'], portion: { grams: 300, measure: '1 bowl (300g)' } },
  { name: 'Eggs (2 large)', name_en: 'Eggs (2 large)', name_ar: 'بيض (2 حبة)', calories: 143, protein: 13, carbs: 1, fat: 10, category: 'protein', cuisine: ['american', 'mediterranean', 'keto', 'high_protein'], portion: { grams: 100, measure: '2 large eggs (100g)' } },
  { name: 'Oatmeal', name_en: 'Oatmeal', name_ar: 'شوفان', calories: 154, protein: 5, carbs: 27, fat: 3, category: 'grain', cuisine: ['american'], portion: { grams: 234, measure: '1 cup cooked (234g)' } },
  { name: 'Banana', name_en: 'Banana', name_ar: 'موزة', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, category: 'fruit', cuisine: ['african'], portion: { grams: 118, measure: '1 medium (118g)' } },
  { name: 'Almonds', name_en: 'Almonds', name_ar: 'لوز', calories: 164, protein: 6, carbs: 6, fat: 14, category: 'nuts', cuisine: ['mediterranean', 'indian', 'keto'], portion: { grams: 28, measure: '1 oz (28g)' } },
  { name: 'Broccoli', name_en: 'Broccoli', name_ar: 'بروكلي', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, category: 'vegetable', cuisine: ['asian', 'mediterranean', 'keto'], portion: { grams: 91, measure: '1 cup (91g)' } },
  { name: 'Tuna (canned)', name_en: 'Tuna (canned)', name_ar: 'تونة (معلبة)', calories: 128, protein: 26, carbs: 0, fat: 2.5, category: 'protein', cuisine: ['american', 'mediterranean', 'keto', 'high_protein'], portion: { grams: 140, measure: '1 can (140g)' } },
  { name: 'Couscous', name_en: 'Couscous', name_ar: 'كسكس', calories: 176, protein: 6, carbs: 36, fat: 0.3, category: 'grain', cuisine: ['mediterranean', 'middle_eastern'], portion: { grams: 157, measure: '1 cup (157g)' } },
  { name: 'Koshari', name_en: 'Koshari', name_ar: 'كشري', calories: 450, protein: 15, carbs: 70, fat: 10, category: 'grain', cuisine: ['egyptian'], portion: { grams: 250, measure: '1 plate (250g)' } },
  { name: 'Ful Medames', name_en: 'Ful Medames', name_ar: 'فول مدمس', calories: 340, protein: 18, carbs: 40, fat: 12, category: 'legume', cuisine: ['egyptian', 'middle_eastern'], portion: { grams: 150, measure: '1 bowl (150g)' } },
  { name: 'Molokhia', name_en: 'Molokhia', name_ar: 'ملوخية', calories: 280, protein: 14, carbs: 30, fat: 10, category: 'vegetable', cuisine: ['egyptian'], portion: { grams: 200, measure: '1 bowl (200g)' } },
  { name: 'Pasta Bolognese', name_en: 'Pasta Bolognese', name_ar: 'معكرونة بولونيز', calories: 480, protein: 25, carbs: 55, fat: 15, category: 'grain', cuisine: ['italian'], portion: { grams: 200, measure: '1 plate (200g cooked)' } },
  { name: 'Margherita Pizza', name_en: 'Margherita Pizza', name_ar: 'بيتزا مارغريتا', calories: 400, protein: 18, carbs: 42, fat: 16, category: 'grain', cuisine: ['italian'], portion: { grams: 150, measure: '1 slice of 12-inch (150g)' } },
  { name: 'Risotto', name_en: 'Risotto', name_ar: 'ريزوتو', calories: 380, protein: 12, carbs: 50, fat: 12, category: 'grain', cuisine: ['italian'], portion: { grams: 250, measure: '1 cup (250g)' } },
  { name: 'Grilled Steak', name_en: 'Grilled Steak', name_ar: 'ستيك مشوي', calories: 350, protein: 40, carbs: 0, fat: 18, category: 'protein', cuisine: ['american', 'high_protein'], portion: { grams: 200, measure: '1 steak (200g)' } },
  { name: 'Cottage Cheese', name_en: 'Cottage Cheese', name_ar: 'جبنة قريش', calories: 110, protein: 14, carbs: 5, fat: 4, category: 'dairy', cuisine: ['high_protein'], portion: { grams: 150, measure: '1 cup (150g)' } },
  { name: 'Whey Protein Shake', name_en: 'Whey Protein Shake', name_ar: 'شيك بروتين مصل اللبن', calories: 120, protein: 25, carbs: 3, fat: 1, category: 'protein', cuisine: ['high_protein'], portion: { grams: 250, measure: '1 shake (250ml)', ml: 250 } },
  { name: 'Paneer Tikka', name_en: 'Paneer Tikka', name_ar: 'بانير تيكا', calories: 320, protein: 22, carbs: 8, fat: 22, category: 'protein', cuisine: ['indian', 'high_protein'], portion: { grams: 200, measure: '1 plate (200g)' } },
  { name: 'Butter Chicken', name_en: 'Butter Chicken', name_ar: 'دجاج بالزبدة', calories: 480, protein: 28, carbs: 16, fat: 32, category: 'protein', cuisine: ['indian'], portion: { grams: 200, measure: '1 bowl (200g)', note: '100g steamed rice on the side' } },
  { name: 'Pad Thai', name_en: 'Pad Thai', name_ar: 'باد تاي', calories: 420, protein: 18, carbs: 50, fat: 14, category: 'grain', cuisine: ['asian'], portion: { grams: 250, measure: '1 plate (250g)' } },
  { name: 'Caesar Salad', name_en: 'Caesar Salad', name_ar: 'سلطة سيزر', calories: 350, protein: 22, carbs: 12, fat: 24, category: 'vegetable', cuisine: ['american', 'mediterranean'], portion: { grams: 200, measure: '1 bowl (200g)' } },
  { name: 'Steak & Eggs', name_en: 'Steak & Eggs', name_ar: 'ستيك وبويض', calories: 450, protein: 42, carbs: 2, fat: 28, category: 'protein', cuisine: ['american', 'keto', 'high_protein'], portion: { grams: 250, measure: '1 plate (250g)' } },
  { name: 'Keto Salmon Bowl', name_en: 'Keto Salmon Bowl', name_ar: 'طبق سلمون كيتو', calories: 380, protein: 30, carbs: 5, fat: 26, category: 'protein', cuisine: ['keto', 'mediterranean'], portion: { grams: 300, measure: '1 bowl (300g)' } },
  { name: 'Cheese Omelette', name_en: 'Cheese Omelette', name_ar: 'أومليت بالجبنة', calories: 300, protein: 20, carbs: 2, fat: 22, category: 'protein', cuisine: ['american', 'italian', 'keto', 'high_protein'], portion: { grams: 200, measure: '3 eggs (200g)' } },
  { name: 'Grilled Vegetables', name_en: 'Grilled Vegetables', name_ar: 'خضروات مشوية', calories: 120, protein: 4, carbs: 14, fat: 6, category: 'vegetable', cuisine: ['mediterranean', 'italian'], portion: { grams: 150, measure: '1 plate (150g)' } },
  { name: 'Caesar Chicken Wrap', name_en: 'Caesar Chicken Wrap', name_ar: 'ساندويتش سيزر بالدجاج', calories: 380, protein: 28, carbs: 30, fat: 14, category: 'protein', cuisine: ['american'], portion: { grams: 200, measure: '1 wrap (200g)' } },
  { name: 'Tofu Stir Fry', name_en: 'Tofu Stir Fry', name_ar: 'توفو مقلي', calories: 280, protein: 16, carbs: 18, fat: 16, category: 'protein', cuisine: ['asian'], portion: { grams: 300, measure: '1 plate (300g)' } },
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
      portion: f.portion ?? getPortion(f.name_en, f.mealType),
    }))
  ),
];

const fullFoodBase = (mt: string): 'breakfast' | 'lunch' | 'dinner' | 'fruit' | 'drink' | 'side' | 'salad' => {
  if (mt === 'breakfast') return 'breakfast';
  if (mt === 'lunch') return 'lunch';
  if (mt === 'dinner') return 'dinner';
  if (mt === 'fruit') return 'fruit';
  if (mt === 'side') return 'side';
  if (mt === 'salad') return 'salad';
  return 'drink';
};

const toFullFood = (e: EgyptianFullDish | LibyanFullDish | TunisianFullDish | AlgerianFullDish | MoroccanFullDish | SaudiFullDish | EmiratiFullDish | KuwaitiFullDish | QatarFullDish | BahrainiFullDish | OmaniFullDish | IndianFullDish | PakistaniFullDish | ChineseFullDish | JapaneseFullDish | KoreanFullDish | ThaiFullDish | ItalianFullDish | FrenchFullDish | SpanishFullDish | GreekFullDish | TurkishFullDish | BritishFullDish | SwissFullDish | MexicanFullDish | AmericanFullDish | CubanFullDish | CostaRicanFullDish | JamaicanFullDish, cuisineId: string): FoodItem => {
  const base = fullFoodBase(e.mealType);
  const type = base === 'fruit' ? 'fruit' : undefined;
  return {
    id: e.id,
    name: e.nameEn,
    name_en: e.nameEn,
    name_ar: e.nameAr,
    calories: e.kcal,
    protein: e.protein,
    carbs: e.carbs,
    fat: e.fat,
    category: base,
    cuisine: [cuisineId],
    mealType: base,
    type,
    portion: { grams: e.grams, measure: `${e.grams} g`, measureAr: `${e.grams} جم` },
    verified: false,
    halal: true,
    heavy: isHeavyMeal(e.nameEn, e.kcal, e.fat),
  } as FoodItem;
};

const toEgyptianFood = (e: EgyptianFullDish): FoodItem => toFullFood(e, 'egyptian');

const toLibyanFood = (e: LibyanFullDish): FoodItem => toFullFood(e, 'libyan');

const toTunisianFood = (e: TunisianFullDish): FoodItem => toFullFood(e, 'tunisian');

const toAlgerianFood = (e: AlgerianFullDish): FoodItem => toFullFood(e, 'algerian');

const toMoroccanFood = (e: MoroccanFullDish): FoodItem => toFullFood(e, 'moroccan');

const toSaudiFood = (e: SaudiFullDish): FoodItem => toFullFood(e, 'saudi');

const toEmiratiFood = (e: EmiratiFullDish): FoodItem => toFullFood(e, 'emirati');

const toKuwaitiFood = (e: KuwaitiFullDish): FoodItem => toFullFood(e, 'kuwaiti');

const toQatarFood = (e: QatarFullDish): FoodItem => toFullFood(e, 'qatar');

const toBahrainiFood = (e: BahrainiFullDish): FoodItem => toFullFood(e, 'bahraini');

const toOmaniFood = (e: OmaniFullDish): FoodItem => toFullFood(e, 'omani');

const toIndianFood = (e: IndianFullDish): FoodItem => toFullFood(e, 'indian');

const toPakistaniFood = (e: PakistaniFullDish): FoodItem => toFullFood(e, 'pakistani');

const toChineseFood = (e: ChineseFullDish): FoodItem => toFullFood(e, 'chinese');

const toJapaneseFood = (e: JapaneseFullDish): FoodItem => toFullFood(e, 'japanese');

const toKoreanFood = (e: KoreanFullDish): FoodItem => toFullFood(e, 'korean');

const toThaiFood = (e: ThaiFullDish): FoodItem => toFullFood(e, 'thai');
const toItalianFood = (e: ItalianFullDish): FoodItem => toFullFood(e, 'italian');
const toFrenchFood = (e: FrenchFullDish): FoodItem => toFullFood(e, 'french');
const toSpanishFood = (e: SpanishFullDish): FoodItem => toFullFood(e, 'spanish');
const toGreekFood = (e: GreekFullDish): FoodItem => toFullFood(e, 'greek');
const toTurkishFood = (e: TurkishFullDish): FoodItem => toFullFood(e, 'turkish');
const toBritishFood = (e: BritishFullDish): FoodItem => toFullFood(e, 'british');
const toSwissFood = (e: SwissFullDish): FoodItem => toFullFood(e, 'swiss');

const toMexicanFood = (e: MexicanFullDish): FoodItem => toFullFood(e, 'mexican');
const toAmericanFood = (e: AmericanFullDish): FoodItem => toFullFood(e, 'american');
const toCubanFood = (e: CubanFullDish): FoodItem => toFullFood(e, 'cuban');
const toCostaRicanFood = (e: CostaRicanFullDish): FoodItem => toFullFood(e, 'costa_rican');
const toJamaicanFood = (e: JamaicanFullDish): FoodItem => toFullFood(e, 'jamaican');

const ENRICHED_ALL: FoodItem[] = FOODS_DATABASE_RAW.map((f) => {
  const enriched = usdaEnrich(f, f.portion?.grams ?? (f.portion?.ml ?? 100));
  return {
    ...f,
    ...enriched,
    verified: enriched.verified,
    nutritionSource: enriched.source,
    halal: true,
    heavy: isHeavyMeal(f.name_en || f.name, f.calories, f.fat),
  };
});

const FULL_CUISINES = ['egyptian', 'libyan', 'tunisian', 'algerian', 'moroccan', 'saudi', 'emirati', 'kuwaiti', 'qatar', 'bahraini', 'omani', 'indian', 'pakistani', 'chinese', 'japanese', 'korean', 'thai', 'italian', 'french', 'spanish', 'greek', 'turkish', 'british', 'swiss', 'mexican', 'american', 'cuban', 'costa_rican', 'jamaican'];

export const FOODS_DATABASE: FoodItem[] = [
  ...ENRICHED_ALL
    .filter((f) => (FULL_CUISINES.some((c) => f.cuisine.includes(c)) ? f.cuisine.length > 1 : true))
    .map((f) => (FULL_CUISINES.some((c) => f.cuisine.includes(c)) ? { ...f, cuisine: f.cuisine.filter((c) => !FULL_CUISINES.includes(c)) } : f)),
  ...EGYPTIAN_FULL.map(toEgyptianFood),
  ...LIBYAN_FULL.map(toLibyanFood),
  ...TUNISIAN_FULL.map(toTunisianFood),
  ...ALGERIAN_FULL.map(toAlgerianFood),
  ...MOROCCAN_FULL.map(toMoroccanFood),
  ...SAUDI_FULL.map(toSaudiFood),
  ...EMIRATI_FULL.map(toEmiratiFood),
  ...KUWAITI_FULL.map(toKuwaitiFood),
  ...QATAR_FULL.map(toQatarFood),
  ...BAHRAINI_FULL.map(toBahrainiFood),
  ...OMANI_FULL.map(toOmaniFood),
  ...INDIAN_FULL.map(toIndianFood),
  ...PAKISTANI_FULL.map(toPakistaniFood),
  ...CHINESE_FULL.map(toChineseFood),
  ...JAPANESE_FULL.map(toJapaneseFood),
  ...KOREAN_FULL.map(toKoreanFood),
  ...THAI_FULL.map(toThaiFood),
  ...ITALIAN_FULL.map(toItalianFood),
  ...FRENCH_FULL.map(toFrenchFood),
  ...SPANISH_FULL.map(toSpanishFood),
  ...GREEK_FULL.map(toGreekFood),
  ...TURKISH_FULL.map(toTurkishFood),
  ...BRITISH_FULL.map(toBritishFood),
  ...SWISS_FULL.map(toSwissFood),
  ...MEXICAN_FULL.map(toMexicanFood),
  ...AMERICAN_FULL.map(toAmericanFood),
  ...CUBAN_FULL.map(toCubanFood),
  ...COSTA_RICAN_FULL.map(toCostaRicanFood),
  ...JAMAICAN_FULL.map(toJamaicanFood),
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
