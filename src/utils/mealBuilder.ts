import type { DailyMealPlan, MealPlan } from '../types';
import type { DayPlan } from './healthPlans';
import { FOODS_DATABASE, type FoodItem } from './calculations';
import { getPortionMeasure, type Portion } from './cuisineCatalog';

export type MealBuilderSection = 'weight-loss' | 'diabetes' | 'hypertension' | 'lab-to-plan' | 'advanced-care';

export interface MealBuilderFilters {
  lowSugar?: boolean;
  lowSodium?: boolean;
  wholeGrainOnly?: boolean;
}

export interface BuilderPool {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  breads: FoodItem[];
  juices: FoodItem[];
  fruits: FoodItem[];
}

export type BuilderSlot = keyof BuilderPool;

export interface BuilderSelections {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  breads: FoodItem[];
  juices: FoodItem[];
  fruits: FoodItem[];
}

export interface MealBuilderGeneratePayload {
  selections: BuilderSelections;
  targetCalories: number;
  mealPlan: MealPlan[];
  fullMealPlan: DailyMealPlan[];
}

export const SLOT_LIMITS: Record<BuilderSlot, { min: number; max: number }> = {
  breakfast: { min: 3, max: 5 },
  lunch: { min: 3, max: 5 },
  dinner: { min: 3, max: 5 },
  breads: { min: 1, max: 3 },
  juices: { min: 1, max: 3 },
  fruits: { min: 1, max: 3 },
};

interface BreadSeed {
  name_en: string;
  name_ar: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  wholeGrain: boolean;
  sodium?: number;
  cuisines: string[];
  portion: Portion;
}

const BREAD_SEEDS: BreadSeed[] = [
  { name_en: 'Whole Wheat Toast', name_ar: 'توست قمح كامل', calories: 80, protein: 4, carbs: 14, fat: 1, wholeGrain: true, sodium: 130, cuisines: ['all'], portion: { grams: 50, measure: '2 slices (50g)', measureAr: 'شريحتان (50 جم)' } },
  { name_en: 'Multigrain Bread', name_ar: 'خبز الحبوب المتعددة', calories: 85, protein: 4, carbs: 15, fat: 1.5, wholeGrain: true, sodium: 150, cuisines: ['all'], portion: { grams: 50, measure: '1 slice (50g)', measureAr: 'شريحة واحدة (50 جم)' } },
  { name_en: 'Oat Bread', name_ar: 'خبز الشوفان', calories: 90, protein: 4, carbs: 16, fat: 1.5, wholeGrain: true, sodium: 120, cuisines: ['all'], portion: { grams: 50, measure: '1 slice (50g)', measureAr: 'شريحة واحدة (50 جم)' } },
  { name_en: 'Rye Bread', name_ar: 'خبز الجاودار', calories: 80, protein: 3, carbs: 15, fat: 1, wholeGrain: true, sodium: 160, cuisines: ['german', 'all'], portion: { grams: 50, measure: '1 slice (50g)', measureAr: 'شريحة واحدة (50 جم)' } },
  { name_en: 'Sourdough Bread', name_ar: 'خبز الصردو', calories: 90, protein: 3, carbs: 17, fat: 1, wholeGrain: true, sodium: 130, cuisines: ['australian', 'french', 'all'], portion: { grams: 45, measure: '1 slice (45g)', measureAr: 'شريحة واحدة (45 جم)' } },
  { name_en: 'White Toast', name_ar: 'توست أبيض', calories: 70, protein: 2, carbs: 13, fat: 1, wholeGrain: false, sodium: 140, cuisines: ['all'], portion: { grams: 45, measure: '2 slices (45g)', measureAr: 'شريحتان (45 جم)' } },
  { name_en: 'Baguette', name_ar: 'باغيت', calories: 130, protein: 4, carbs: 26, fat: 1, wholeGrain: false, sodium: 210, cuisines: ['french'], portion: { grams: 60, measure: '2 slices (60g)', measureAr: 'شريحتان (60 جم)' } },
  { name_en: 'Ciabatta', name_ar: 'تشاباتا', calories: 140, protein: 5, carbs: 28, fat: 1.5, wholeGrain: false, sodium: 320, cuisines: ['italian'], portion: { grams: 60, measure: '½ roll (60g)', measureAr: 'نصف رغيف (60 جم)' } },
  { name_en: 'Pita Bread', name_ar: 'خبز البيتا', calories: 165, protein: 5, carbs: 33, fat: 1, wholeGrain: false, sodium: 330, cuisines: ['middle_eastern', 'greek', 'turkish'], portion: { grams: 60, measure: '1 pita (60g)', measureAr: 'قرص واحد (60 جم)' } },
  { name_en: 'Egyptian Baladi Bread', name_ar: 'عيش بلدي', calories: 150, protein: 5, carbs: 31, fat: 0.5, wholeGrain: true, sodium: 300, cuisines: ['egyptian'], portion: { grams: 60, measure: '1 loaf (60g)', measureAr: 'رغيف واحد (60 جم)' } },
  { name_en: 'Corn Tortilla', name_ar: 'خبز التورتيلا بالذرة', calories: 104, protein: 2, carbs: 21, fat: 1, wholeGrain: true, sodium: 20, cuisines: ['mexican', 'costa_rican'], portion: { grams: 60, measure: '2 tortillas (60g)', measureAr: 'قرصان (60 جم)' } },
  { name_en: 'Flour Tortilla', name_ar: 'خبز التورتيلا بالدقيق', calories: 110, protein: 3, carbs: 21, fat: 2, wholeGrain: false, sodium: 300, cuisines: ['mexican', 'american'], portion: { grams: 60, measure: '2 tortillas (60g)', measureAr: 'قرصان (60 جم)' } },
  { name_en: 'Naan Bread', name_ar: 'خبز نان', calories: 260, protein: 9, carbs: 45, fat: 5, wholeGrain: false, sodium: 250, cuisines: ['indian', 'pakistani'], portion: { grams: 90, measure: '1 naan (90g)', measureAr: 'رغيف واحد (90 جم)' } },
  { name_en: 'Croissant', name_ar: 'كرواسون', calories: 230, protein: 5, carbs: 26, fat: 12, wholeGrain: false, sodium: 220, cuisines: ['french'], portion: { grams: 60, measure: '1 croissant (60g)', measureAr: 'واحد (60 جم)' } },
];

const BREADS: FoodItem[] = BREAD_SEEDS.map((b) => ({
  name: b.name_en,
  name_en: b.name_en,
  name_ar: b.name_ar,
  calories: b.calories,
  protein: b.protein,
  carbs: b.carbs,
  fat: b.fat,
  category: 'bread',
  cuisine: b.cuisines,
  portion: b.portion,
}));

export const isWholeGrainBread = (f: FoodItem): boolean => {
  const seed = BREAD_SEEDS.find((b) => b.name_en === (f.name_en || f.name));
  if (seed) return seed.wholeGrain;
  return /whole|multigrain|oat|rye|baladi|sourdough|corn/i.test(f.name_en || f.name);
};

export const getBreadSodium = (f: FoodItem): number | undefined => BREAD_SEEDS.find((b) => b.name_en === (f.name_en || f.name))?.sodium;

const SLOT_BY_MEALTYPE: Record<BuilderSlot, 'breakfast' | 'lunch' | 'dinner' | 'juice' | 'fruit' | null> = {
  breakfast: 'breakfast',
  lunch: 'lunch',
  dinner: 'dinner',
  breads: null,
  juices: 'juice',
  fruits: 'fruit',
};

const MIN_POOL: Record<BuilderSlot, number> = { breakfast: 8, lunch: 8, dinner: 8, breads: 6, juices: 5, fruits: 7 };

export const buildBuilderPool = (cuisine: string, _section?: MealBuilderSection, filters?: MealBuilderFilters): BuilderPool => {
  const db = FOODS_DATABASE;
  const inCuisine = (f: FoodItem) => f.cuisine.includes(cuisine) || f.cuisine.includes('all');

  const mainPool = (slot: 'breakfast' | 'lunch' | 'dinner'): FoodItem[] => {
    const exact = db.filter((f) => f.mealType === slot && !f.type && f.cuisine.includes(cuisine));
    const globals = db.filter((f) => f.mealType === slot && !f.type && f.cuisine.includes('all') && !f.cuisine.includes(cuisine));
    const others = db.filter((f) => f.mealType === slot && !f.type && !inCuisine(f));
    const pool: FoodItem[] = [];
    const seen = new Set<string>();
    const push = (f: FoodItem) => {
      const key = f.name_en || f.name;
      if (seen.has(key)) return;
      seen.add(key);
      pool.push(f);
    };
    exact.forEach(push);
    globals.forEach(push);
    others.forEach(push);
    let lowSodium = filters?.lowSodium;
    if (lowSodium) {
      const filtered = pool.filter((f) => !/(processed|deli|pickl|canned|smok|salted|sausage|bacon|salami)/i.test(f.name_en || f.name));
      if (filtered.length >= MIN_POOL[slot] - 2) return filtered;
    }
    if (pool.length < MIN_POOL[slot]) {
      const extras = db.filter((f) => f.mealType === slot && !f.type && !seen.has(f.name_en || f.name));
      extras.forEach(push);
    }
    return pool;
  };

  const juicePool = (): FoodItem[] => {
    const exact = db.filter((f) => f.type === 'juice' && f.cuisine.includes(cuisine));
    const globals = db.filter((f) => f.type === 'juice' && f.cuisine.includes('all') && !f.cuisine.includes(cuisine));
    const others = db.filter((f) => f.type === 'juice' && !inCuisine(f));
    let pool: FoodItem[] = [];
    const seen = new Set<string>();
    const push = (f: FoodItem) => {
      const key = f.name_en || f.name;
      if (seen.has(key)) return;
      seen.add(key);
      pool.push(f);
    };
    [...exact, ...globals, ...others].forEach(push);
    if (filters?.lowSugar) {
      const clean = pool.filter((f) => (f.carbs ?? 0) < 20 && !/sugarcane/i.test(f.name_en || f.name));
      pool = clean.length >= 3 ? clean : pool.filter((f) => (f.carbs ?? 0) < 24 && !/sugarcane/i.test(f.name_en || f.name));
      if (pool.length === 0) pool = [...exact, ...globals];
    }
    return pool.length >= MIN_POOL.juices ? pool : pool;
  };

  const fruitPool = (): FoodItem[] => {
    const exact = db.filter((f) => f.type === 'fruit' && f.cuisine.includes(cuisine));
    const globals = db.filter((f) => f.type === 'fruit' && f.cuisine.includes('all') && !f.cuisine.includes(cuisine));
    const others = db.filter((f) => f.type === 'fruit' && !inCuisine(f));
    const pool: FoodItem[] = [];
    const seen = new Set<string>();
    const push = (f: FoodItem) => {
      const key = f.name_en || f.name;
      if (seen.has(key)) return;
      seen.add(key);
      pool.push(f);
    };
    [...exact, ...globals, ...others].forEach(push);
    return pool;
  };

  const breadPool = (): FoodItem[] => {
    const exact = BREADS.filter((b) => b.cuisine.includes(cuisine) && !b.cuisine.includes('all'));
    const globals = BREADS.filter((b) => b.cuisine.includes('all') && !b.cuisine.includes(cuisine));
    const others = BREADS.filter((b) => !b.cuisine.includes(cuisine) && !b.cuisine.includes('all'));
    let pool: FoodItem[] = [...exact, ...globals, ...others];
    const seen = new Set<string>();
    const singles: FoodItem[] = [];
    pool.forEach((b) => {
      const key = b.name_en || b.name;
      if (seen.has(key)) return;
      seen.add(key);
      singles.push(b);
    });
    pool = singles;
    if (filters?.wholeGrainOnly) {
      let wg = pool.filter((b) => isWholeGrainBread(b));
      if (wg.length < 3) {
        const added = new Set(wg.map((b) => b.name_en));
        wg = [...wg, ...pool.filter((b) => !added.has(b.name_en))];
      }
      pool = wg;
    }
    if (filters?.lowSodium) {
      const low = pool.filter((b) => (getBreadSodium(b) ?? 0) <= 180 || getBreadSodium(b) === undefined);
      if (low.length >= 3) pool = low;
    }
    return pool;
  };

  return {
    breakfast: mainPool('breakfast'),
    lunch: mainPool('lunch'),
    dinner: mainPool('dinner'),
    breads: breadPool(),
    juices: juicePool(),
    fruits: fruitPool(),
  };
};

export const autoSelect = (pool: BuilderPool): BuilderSelections => ({
  breakfast: pool.breakfast.slice(0, SLOT_LIMITS.breakfast.min),
  lunch: pool.lunch.slice(0, SLOT_LIMITS.lunch.min),
  dinner: pool.dinner.slice(0, SLOT_LIMITS.dinner.min),
  breads: pool.breads.slice(0, SLOT_LIMITS.breads.min),
  juices: pool.juices.slice(0, SLOT_LIMITS.juices.min),
  fruits: pool.fruits.slice(0, SLOT_LIMITS.fruits.min),
});

export const ensureFilled = (selections: BuilderSelections, pool: BuilderPool): BuilderSelections => {
  const fill = (sel: FoodItem[] | undefined, poolArr: FoodItem[], slot: BuilderSlot): FoodItem[] => {
    const min = SLOT_LIMITS[slot].min;
    const present = (sel ?? []).filter((f) => poolArr.some((p) => (p.name_en || p.name) === (f.name_en || f.name)));
    if (present.length >= min) return present;
    const missing = poolArr.filter((p) => !present.some((s) => (s.name_en || s.name) === (p.name_en || p.name)));
    return [...present, ...missing.slice(0, min - present.length)];
  };
  return {
    breakfast: fill(selections.breakfast, pool.breakfast, 'breakfast'),
    lunch: fill(selections.lunch, pool.lunch, 'lunch'),
    dinner: fill(selections.dinner, pool.dinner, 'dinner'),
    breads: fill(selections.breads, pool.breads, 'breads'),
    juices: fill(selections.juices, pool.juices, 'juices'),
    fruits: fill(selections.fruits, pool.fruits, 'fruits'),
  };
};

const GI_EST: Record<string, number> = {
  'Orange Juice': 52, 'Apple Juice': 41, 'Pomegranate Juice': 53, 'Watermelon Juice': 72, 'Carrot Juice': 43, 'Tomato Juice': 38,
  'Mango Juice': 51, 'Grape Juice': 59, 'Pineapple Juice': 66,
  'Banana': 51, 'Mango': 51, 'Watermelon': 72, 'Dates (3 pcs)': 55, 'Grapes': 59, 'Figs': 61,
  'White Rice': 73, 'Brown Rice': 50, 'White Potato': 78, 'Sweet Potato': 61, 'Oatmeal': 55, 'White Bread': 70,
  'Koshari': 66, 'Couscous': 65, 'Pasta': 58,
};

export const estimateGL = (f: FoodItem): number => {
  const carbs = f.carbs ?? 0;
  if (carbs <= 0) return 0;
  const gi = GI_EST[f.name_en] ?? 55;
  return Math.max(1, Math.round((carbs * gi) / 100));
};

export const isLowSodiumOption = (f: FoodItem): boolean => !/(processed|deli|pickl|canned|smok|salted|sausage|bacon|salami)/i.test(f.name_en || f.name);

const FRUIT_EMOJI: Record<string, string> = {
  Apple: '🍎', Banana: '🍌', Orange: '🍊', Mango: '🥭', Strawberries: '🍓', Watermelon: '🍉',
  Pineapple: '🍍', Kiwi: '🥝', Avocado: '🥑', Grapes: '🍇', Peach: '🍑', Pear: '🍐',
  Blueberries: '🫐', Cherries: '🍒', Pomegranate: '🍎', Papaya: '🍈', Guava: '🍈', Plum: '🍑',
  Apricot: '🍑', Fig: '🍇', Dates: '🌴', Lemon: '🍋', Grapefruit: '🍊', Cantaloupe: '🍈',
  Coconut: '🥥', Starfruit: '⭐', 'Dragon Fruit': '🐉', 'Passion Fruit': '🍈',
};

const MEAL_LABEL: Record<string, { ar: string; en: string; icon: 'meal' | 'snack' }> = {
  breakfast: { ar: '🌅 الإفطار', en: '🌅 Breakfast', icon: 'meal' },
  morningSnack: { ar: '🍎 وجبة خفيفة صباحية', en: '🍎 Morning Snack', icon: 'snack' },
  lunch: { ar: '☀️ الغداء', en: '☀️ Lunch', icon: 'meal' },
  afternoonSnack: { ar: '🍎 وجبة خفيفة مسائية', en: '🍎 Afternoon Snack', icon: 'snack' },
  dinner: { ar: '🌙 العشاء', en: '🌙 Dinner', icon: 'meal' },
};

const FOOD_DESC: Record<string, { ar: string; en: string }> = {
  breakfast: { ar: 'فطور صحي', en: 'Healthy breakfast' },
  morningSnack: { ar: 'وجبة خفيفة', en: 'Light snack' },
  lunch: { ar: 'غداء متوازن', en: 'Balanced lunch' },
  afternoonSnack: { ar: 'طاقة بعد الظهر', en: 'Afternoon energy' },
  dinner: { ar: 'عشاء خفيف', en: 'Light dinner' },
};

const THEMES: Array<{ ar: string; en: string }> = [
  { ar: 'بداية منعشة', en: 'Fresh Start' },
  { ar: 'أصالة وتراث', en: 'Roots & Heritage' },
  { ar: 'نسيم البحر', en: 'Coastal Breeze' },
  { ar: 'أناقة البيت', en: 'Home Comforts' },
  { ar: 'طاقة طبيعية', en: 'Natural Energy' },
  { ar: 'نكهات متنوعة', en: 'Flavor Variety' },
  { ar: 'بساطة صحية', en: 'Healthy Simplicity' },
  { ar: 'توازن مثالي', en: 'Perfect Balance' },
  { ar: 'تقاليد المطبخ', en: 'Culinary Traditions' },
  { ar: 'حيوية ونشاط', en: 'Vitality & Activity' },
];

const setUp = (f: FoodItem, lang: string, role?: 'fruit' | 'juice' | 'bread'): string => {
  const L = lang === 'ar' ? f.name_ar : f.name_en;
  const m = getPortionMeasure(f.portion, lang);
  const mass = m ? ` · ${m}` : '';
  const benefits = f.benefits ? ` (${f.benefits})` : '';
  if (role === 'fruit' || f.type === 'fruit') {
    const emoji = FRUIT_EMOJI[f.name_en] || '🍏';
    return `${emoji} ${lang === 'ar' ? 'فاكهة' : 'Fruit'}: ${L}${benefits}${mass}`;
  }
  if (role === 'juice' || f.type === 'juice') {
    return `🧃 ${lang === 'ar' ? 'مشروب' : 'Drink'}: ${L}${benefits}${mass}`;
  }
  if (role === 'bread') {
    return `🥖 ${L}${mass}`;
  }
  return `${L}${mass}`;
};

const pickCounts = (arr: FoodItem[], base: number, count: number, offset = 0): FoodItem[] => {
  const n = arr.length;
  if (!n) return [];
  const step = Math.max(1, Math.floor(n / Math.max(1, Math.min(count, n))));
  const out: FoodItem[] = [];
  for (let i = 0; i < count; i++) {
    out.push(arr[(base * (count + 1) + i * step + offset) % n]);
  }
  return out;
};

const sumMacros = (items: FoodItem[]): { calories: number; protein: number; carbs: number; fat: number } =>
  items.reduce((acc, f) => ({
    calories: acc.calories + (f.calories || 0),
    protein: acc.protein + (f.protein || 0),
    carbs: acc.carbs + (f.carbs || 0),
    fat: acc.fat + (f.fat || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

export const buildCustomMealPlan = (targetCalories: number, lang: string, selections: BuilderSelections): MealPlan[] => {
  const makeRow = (key: string, items: FoodItem[], extras?: FoodItem[]): MealPlan => {
    const all = [...items, ...(extras || [])];
    const macros = sumMacros(all);
    return {
      meal: MEAL_LABEL[key].en.replace(/^[^\s]+\s/, ''),
      icon: MEAL_LABEL[key].icon,
      calories: macros.calories || Math.round(targetCalories * 0.2),
      protein: Math.round(macros.protein),
      carbs: Math.round(macros.carbs),
      fat: Math.round(macros.fat),
      items: all.map((f) => setUp(f, lang)),
      description: lang === 'ar' ? FOOD_DESC[key].ar : FOOD_DESC[key].en,
    };
  };

  const mk = (key: string, items: FoodItem[]): MealPlan => makeRow(key, items);

  return [
    mk('breakfast', [...pickCounts(selections.breakfast, 0, 2, 0), ...pickCounts(selections.fruits, 0, 1, 0), ...pickCounts(selections.juices, 0, 1, 0)]),
    mk('morningSnack', [...pickCounts(selections.fruits, 0, 1, 3), ...pickCounts(selections.juices, 0, 1, 3)]),
    mk('lunch', [...pickCounts(selections.lunch, 0, 3, 0), ...pickCounts(selections.breads, 0, 1, 0)]),
    mk('afternoonSnack', [...pickCounts(selections.fruits, 0, 1, 6), ...pickCounts(selections.juices, 0, 1, 6)]),
    mk('dinner', [...pickCounts(selections.dinner, 0, 3, 1)]),
  ];
};

export const buildCustomFullMealPlan = (targetCalories: number, lang: string, selections: BuilderSelections, days = 30): DailyMealPlan[] => {
  const plans: DailyMealPlan[] = [];
  for (let d = 0; d < days; d++) {
    const pick = (slot: BuilderSlot, count: number, offset = 0): FoodItem[] => {
      const arr = selections[slot];
      return pickCounts(arr, d, count, offset);
    };
    const items = [
      { key: 'breakfast', foods: [...pick('breakfast', 2, 0), ...pick('fruits', 1, 0), ...pick('juices', 1, 0)] },
      { key: 'morningSnack', foods: [...pick('fruits', 1, 3), ...pick('juices', 1, 3)] },
      { key: 'lunch', foods: [...pick('lunch', 3, 0), ...pick('breads', 1, 0)] },
      { key: 'afternoonSnack', foods: [...pick('fruits', 1, 6), ...pick('juices', 1, 6)] },
      { key: 'dinner', foods: [...pick('dinner', 3, 1)] },
    ];
    const meals: MealPlan[] = items.map(({ key, foods }) => {
      const macros = sumMacros(foods);
      return {
        meal: MEAL_LABEL[key].en.replace(/^[^\s]+\s/, ''),
        icon: MEAL_LABEL[key].icon,
        calories: macros.calories || Math.round(targetCalories * 0.2),
        protein: Math.round(macros.protein),
        carbs: Math.round(macros.carbs),
        fat: Math.round(macros.fat),
        items: foods.map((f) => setUp(f, lang)),
        description: lang === 'ar' ? FOOD_DESC[key].ar : FOOD_DESC[key].en,
      };
    });
    const theme = THEMES[d % THEMES.length];
    plans.push({
      day: d + 1,
      label: lang === 'ar' ? `اليوم ${d + 1}` : `Day ${d + 1}`,
      theme: lang === 'ar' ? theme.ar : theme.en,
      meals,
    });
  }
  return plans;
};

export const buildCustomPlan = (targetCalories: number, lang: string, selections: BuilderSelections | undefined, pool: BuilderPool): MealBuilderGeneratePayload => {
  const filled = ensureFilled(selections ?? autoSelect(pool), pool);
  const mealPlan = buildCustomMealPlan(targetCalories, lang, filled);
  const fullMealPlan = buildCustomFullMealPlan(targetCalories, lang, filled);
  return { selections: filled, targetCalories, mealPlan, fullMealPlan };
};

export const toDayPlans = (custom: DailyMealPlan[], base?: DayPlan[]): DayPlan[] =>
  custom.map((d, i) => ({
    day: d.day,
    label: d.label,
    phase: base?.[i]?.phase ?? 'Custom',
    meals: d.meals.map((m) => ({
      meal: m.meal,
      label: m.description || 'Custom meal',
      calories: m.calories,
      items: m.items,
      tips: m.description || '',
      protein: m.protein,
      carbs: m.carbs,
      fat: m.fat,
      nameAr: m.nameAr,
      nameEn: m.nameEn,
    })),
    workouts: base?.[i]?.workouts ?? [],
    dailyGoal: base?.[i]?.dailyGoal ?? '',
    guidelines: base?.[i]?.guidelines ?? [],
  }));