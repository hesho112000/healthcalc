export interface PlanMealItem {
  meal: string;
  label: string;
  calories: number;
  items: string[];
  tips: string;
  protein: number;
  carbs: number;
  fat: number;
}

export interface PlanWorkoutItem {
  exercise: string;
  sets: string;
  notes: string;
  duration: string;
  calories: number;
}

export interface DayPlan {
  day: number;
  label: string;
  phase: string;
  meals: PlanMealItem[];
  workouts: PlanWorkoutItem[];
  dailyGoal: string;
  guidelines: string[];
}

export interface CheckInField {
  key: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  placeholder: number;
  icon: string;
}

export interface SymptomTrigger {
  id: string;
  date: string;
  symptom: string;
  severity: number;
  possibleCause: string;
  notes: string;
}

export interface AIAdjustment {
  direction: string;
  type: string;
  reason: string;
  adjustment: number;
}

export interface StreakBadge {
  id: string;
  label: string;
  description: string;
  icon: string;
  earned: boolean;
  days?: number;
  current?: number;
  longest?: number;
  badges?: StreakBadge[];
}

type PlanMeal = PlanMealItem;
type PlanWorkout = PlanWorkoutItem;

const mealPool: PlanMealItem[] = [
  { meal: '🌅 Breakfast', label: '🌅 Breakfast', calories: 400, items: ['Oatmeal with berries', 'Greek yogurt', 'Green tea'], tips: 'Eat within 1 hour of waking', protein: 20, carbs: 50, fat: 10 },
  { meal: '🌅 Breakfast', label: '🌅 Breakfast', calories: 350, items: ['Egg white omelette', 'Whole wheat toast', 'Avocado'], tips: 'High protein start', protein: 25, carbs: 30, fat: 12 },
  { meal: '🌅 Breakfast', label: '🌅 Breakfast', calories: 320, items: ['Smoothie bowl', 'Chia seeds', 'Banana'], tips: 'Blend with almond milk', protein: 15, carbs: 45, fat: 8 },
  { meal: '☀️ Lunch', label: '☀️ Lunch', calories: 550, items: ['Grilled chicken breast', 'Brown rice', 'Steamed broccoli'], tips: 'Include colorful vegetables', protein: 40, carbs: 45, fat: 12 },
  { meal: '☀️ Lunch', label: '☀️ Lunch', calories: 500, items: ['Salmon fillet', 'Quinoa salad', 'Mixed greens'], tips: 'Omega-3 rich meal', protein: 35, carbs: 35, fat: 18 },
  { meal: '☀️ Lunch', label: '☀️ Lunch', calories: 480, items: ['Turkey wrap', 'Sweet potato fries', 'Side salad'], tips: 'Keep portions moderate', protein: 30, carbs: 40, fat: 15 },
  { meal: '🌙 Dinner', label: '🌙 Dinner', calories: 450, items: ['Baked fish', 'Roasted vegetables', 'Couscous'], tips: 'Light dinner, finish 3h before bed', protein: 30, carbs: 35, fat: 14 },
  { meal: '🌙 Dinner', label: '🌙 Dinner', calories: 420, items: ['Stir-fry vegetables', 'Tofu', 'Brown rice'], tips: 'Use minimal oil', protein: 20, carbs: 40, fat: 10 },
  { meal: '🌙 Dinner', label: '🌙 Dinner', calories: 400, items: ['Lentil soup', 'Mixed salad', 'Whole grain bread'], tips: 'High fiber meal', protein: 22, carbs: 45, fat: 8 },
  { meal: '🍎 Snack', label: '🍎 Snack', calories: 150, items: ['Apple slices', 'Almond butter'], tips: 'Between meals only', protein: 5, carbs: 15, fat: 8 },
  { meal: '🍎 Snack', label: '🍎 Snack', calories: 120, items: ['Greek yogurt', 'Honey drizzle'], tips: 'Afternoon snack', protein: 12, carbs: 15, fat: 2 },
  { meal: '🍎 Snack', label: '🍎 Snack', calories: 180, items: ['Trail mix', 'Dark chocolate'], tips: 'Keep to a small handful', protein: 6, carbs: 18, fat: 10 },
];

const workoutPool: PlanWorkoutItem[] = [
  { exercise: 'Push-ups', sets: '3×15', notes: 'Chest and triceps', duration: '15 min', calories: 120 },
  { exercise: 'Squats', sets: '4×12', notes: 'Legs and glutes', duration: '20 min', calories: 150 },
  { exercise: 'Plank Hold', sets: '3×60s', notes: 'Core stability', duration: '10 min', calories: 80 },
  { exercise: 'Jump Rope', sets: '3×3 min', notes: 'Cardio', duration: '15 min', calories: 200 },
  { exercise: 'Deadlifts', sets: '4×10', notes: 'Back and hamstrings', duration: '25 min', calories: 180 },
  { exercise: 'Lunges', sets: '3×12 each', notes: 'Legs', duration: '15 min', calories: 130 },
  { exercise: 'Burpees', sets: '4×10', notes: 'Full body', duration: '10 min', calories: 160 },
  { exercise: 'Bench Press', sets: '4×10', notes: 'Chest', duration: '20 min', calories: 140 },
  { exercise: 'Bicycle Crunches', sets: '3×20', notes: 'Core', duration: '10 min', calories: 90 },
  { exercise: 'Mountain Climbers', sets: '3×30s', notes: 'Full body cardio', duration: '10 min', calories: 140 },
];

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const pickN = <T>(arr: T[], n: number): T[] => [...arr].sort(() => Math.random() - 0.5).slice(0, n);
const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const buildMealsFromCuisine = (cuisine?: string): PlanMealItem[] => {
  const FOODS: Array<{ name: string; calories: number; protein: number; carbs: number; fat: number; cuisine: string[] }> = [
    { name: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, cuisine: ['american', 'mediterranean', 'high_protein'] },
    { name: 'Salmon Fillet', calories: 208, protein: 20, carbs: 0, fat: 13, cuisine: ['mediterranean', 'asian', 'keto', 'high_protein'] },
    { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8, cuisine: ['asian'] },
    { name: 'Quinoa', calories: 222, protein: 8, carbs: 39, fat: 3.5, cuisine: ['mediterranean'] },
    { name: 'Sweet Potato', calories: 103, protein: 2, carbs: 24, fat: 0.1, cuisine: ['american', 'african'] },
    { name: 'Avocado', calories: 240, protein: 3, carbs: 12, fat: 22, cuisine: ['mexican', 'mediterranean', 'keto'] },
    { name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0.7, cuisine: ['mediterranean', 'high_protein'] },
    { name: 'Hummus + Pita', calories: 250, protein: 10, carbs: 30, fat: 10, cuisine: ['middle_eastern'] },
    { name: 'Lentil Soup', calories: 230, protein: 18, carbs: 35, fat: 2, cuisine: ['middle_eastern', 'egyptian'] },
    { name: 'Chicken Tikka Masala', calories: 430, protein: 30, carbs: 20, fat: 25, cuisine: ['indian', 'high_protein'] },
    { name: 'Sushi Roll', calories: 255, protein: 9, carbs: 38, fat: 7, cuisine: ['asian'] },
    { name: 'Tacos', calories: 380, protein: 18, carbs: 30, fat: 20, cuisine: ['mexican'] },
    { name: 'Falafel Bowl', calories: 450, protein: 15, carbs: 50, fat: 22, cuisine: ['middle_eastern'] },
    { name: 'Eggs (2 large)', calories: 143, protein: 13, carbs: 1, fat: 10, cuisine: ['american', 'mediterranean', 'keto', 'high_protein'] },
    { name: 'Oatmeal', calories: 154, protein: 5, carbs: 27, fat: 3, cuisine: ['american'] },
    { name: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14, cuisine: ['mediterranean', 'indian', 'keto'] },
    { name: 'Broccoli Stir Fry', calories: 120, protein: 8, carbs: 12, fat: 5, cuisine: ['asian', 'mediterranean', 'keto'] },
    { name: 'Tuna Salad', calories: 200, protein: 28, carbs: 5, fat: 8, cuisine: ['american', 'mediterranean', 'keto', 'high_protein'] },
    { name: 'Couscous Salad', calories: 280, protein: 10, carbs: 42, fat: 6, cuisine: ['mediterranean', 'middle_eastern'] },
    { name: 'Koshari', calories: 450, protein: 15, carbs: 70, fat: 10, cuisine: ['egyptian'] },
    { name: 'Ful Medames', calories: 340, protein: 18, carbs: 40, fat: 12, cuisine: ['egyptian', 'middle_eastern'] },
    { name: 'Molokhia', calories: 280, protein: 14, carbs: 30, fat: 10, cuisine: ['egyptian'] },
    { name: 'Pasta Bolognese', calories: 480, protein: 25, carbs: 55, fat: 15, cuisine: ['italian'] },
    { name: 'Margherita Pizza', calories: 400, protein: 18, carbs: 42, fat: 16, cuisine: ['italian'] },
    { name: 'Risotto', calories: 380, protein: 12, carbs: 50, fat: 12, cuisine: ['italian'] },
    { name: 'Grilled Steak', calories: 350, protein: 40, carbs: 0, fat: 18, cuisine: ['american', 'high_protein'] },
    { name: 'Cottage Cheese', calories: 110, protein: 14, carbs: 5, fat: 4, cuisine: ['high_protein'] },
    { name: 'Whey Protein Shake', calories: 120, protein: 25, carbs: 3, fat: 1, cuisine: ['high_protein'] },
    { name: 'Paneer Tikka', calories: 320, protein: 22, carbs: 8, fat: 22, cuisine: ['indian', 'high_protein'] },
    { name: 'Butter Chicken', calories: 480, protein: 28, carbs: 16, fat: 32, cuisine: ['indian'] },
    { name: 'Pad Thai', calories: 420, protein: 18, carbs: 50, fat: 14, cuisine: ['asian'] },
    { name: 'Caesar Salad', calories: 350, protein: 22, carbs: 12, fat: 24, cuisine: ['american', 'mediterranean'] },
    { name: 'Steak & Eggs', calories: 450, protein: 42, carbs: 2, fat: 28, cuisine: ['american', 'keto', 'high_protein'] },
    { name: 'Keto Salmon Bowl', calories: 380, protein: 30, carbs: 5, fat: 26, cuisine: ['keto', 'mediterranean'] },
    { name: 'Cheese Omelette', calories: 300, protein: 20, carbs: 2, fat: 22, cuisine: ['american', 'italian', 'keto', 'high_protein'] },
    { name: 'Grilled Vegetables', calories: 120, protein: 4, carbs: 14, fat: 6, cuisine: ['mediterranean', 'italian'] },
    { name: 'Tofu Stir Fry', calories: 280, protein: 16, carbs: 18, fat: 16, cuisine: ['asian'] },
    { name: 'Fattoush Salad', calories: 180, protein: 5, carbs: 18, fat: 10, cuisine: ['middle_eastern'] },
    { name: 'Shawarma Plate', calories: 500, protein: 30, carbs: 35, fat: 24, cuisine: ['middle_eastern'] },
  ];

  const labels = ['🌅 Breakfast', '☀️ Lunch', '🌙 Dinner'];
  const filtered = cuisine ? FOODS.filter(f => f.cuisine.includes(cuisine)) : FOODS;
  const pool = filtered.length >= 3 ? filtered : FOODS;
  const picked = pickN(pool, 3);

  return picked.map((food, i) => ({
    meal: labels[i],
    label: labels[i],
    calories: food.calories,
    items: [food.name],
    tips: `${food.calories} kcal · ${food.protein}g protein`,
    protein: food.protein,
    carbs: food.carbs,
    fat: food.fat,
  }));
};

const generatePlan = (days: number, condition: string, cuisine?: string): DayPlan[] => {
  const phases = ['Foundation', 'Building', 'Peak', 'Maintenance'];
  const guidelines: Record<string, string[]> = {
    diabetes: ['Monitor blood glucose before meals', 'Limit refined carbs to <45g per meal', 'Walk 15 min after each meal', 'Stay hydrated — aim for 8 glasses daily'],
    hypertension: ['Limit sodium to <2300mg/day', 'Include potassium-rich foods', 'Practice 10 min meditation daily', 'Avoid processed foods'],
    weightloss: ['Create a 500 calorie deficit', 'Drink water before meals', 'Track all food intake', 'Get 7-8 hours sleep'],
    muscle: ['Eat protein within 30 min post-workout', 'Aim for 1.6-2.2g protein/kg', 'Progressive overload each week', 'Rest 48h between same muscle groups'],
    general: ['Eat a balanced diet', 'Stay active daily', 'Get enough sleep', 'Manage stress'],
  };
  const condKey = condition.toLowerCase().includes('diab') ? 'diabetes'
    : condition.toLowerCase().includes('hyper') ? 'hypertension'
    : condition.toLowerCase().includes('weight') ? 'weightloss'
    : condition.toLowerCase().includes('muscle') ? 'muscle' : 'general';
  return Array.from({ length: days }, (_, i) => {
    const phase = phases[Math.min(Math.floor(i / Math.max(1, Math.floor(days / phases.length))), phases.length - 1)];
    return {
      day: i + 1,
      label: `Day ${i + 1}`,
      phase,
      meals: buildMealsFromCuisine(cuisine),
      workouts: pickN(workoutPool, 2),
      dailyGoal: 'Complete all meals and at least 30 min activity',
      guidelines: guidelines[condKey] || guidelines.general,
    };
  });
};

export const generateDiabetesPlan = (_profile?: any, _labs?: any, cuisine?: string): DayPlan[] => generatePlan(30, 'diabetes', cuisine);
export const generateHypertensionPlan = (_profile?: any, _labs?: any, cuisine?: string): DayPlan[] => generatePlan(30, 'hypertension', cuisine);
export const generateWeightLossPlan = (_profile?: any, _labs?: any, cuisine?: string): DayPlan[] => generatePlan(30, 'weightloss', cuisine);
export const generateMuscleGainPlan = (_profile?: any, _labs?: any, cuisine?: string): DayPlan[] => generatePlan(30, 'muscle', cuisine);
export const generate30DayPlan = (condition: string, _profile?: any, _labs?: any, cuisine?: string): DayPlan[] => generatePlan(30, condition, cuisine);

export const getCheckInFields = (_condition?: string): CheckInField[] => [
  { key: 'weight', label: 'Weight', unit: 'kg', min: 30, max: 250, step: 0.5, placeholder: 70, icon: '⚖️' },
  { key: 'waist', label: 'Waist', unit: 'cm', min: 50, max: 150, step: 1, placeholder: 80, icon: '📏' },
  { key: 'fasting_glucose', label: 'Fasting Glucose', unit: 'mg/dL', min: 50, max: 400, step: 1, placeholder: 95, icon: '🩸' },
  { key: 'systolic_bp', label: 'Systolic BP', unit: 'mmHg', min: 80, max: 200, step: 1, placeholder: 120, icon: '❤️' },
  { key: 'steps', label: 'Steps', unit: 'steps', min: 0, max: 50000, step: 100, placeholder: 8000, icon: '👟' },
  { key: 'sleep', label: 'Sleep', unit: 'hrs', min: 0, max: 16, step: 0.5, placeholder: 7, icon: '😴' },
];

export const computeAIAdjustments = (_condition: string, entries: Record<string, any>[], targetCalories: number): AIAdjustment[] => {
  if (entries.length < 2) return [];
  const latest = entries[entries.length - 1];
  const prev = entries[entries.length - 2];
  const adj: AIAdjustment[] = [];
  const wLatest = Number(latest?.weight || 0);
  const wPrev = Number(prev?.weight || 0);
  if (wLatest > 0 && wPrev > 0 && wLatest < wPrev) adj.push({ direction: 'decrease', type: 'calories', reason: 'Weight is decreasing — keep up the current plan', adjustment: -100 });
  if (wLatest > 0 && wPrev > 0 && wLatest > wPrev) adj.push({ direction: 'increase', type: 'calories', reason: 'Weight is increasing — reduce intake slightly', adjustment: -200 });
  const steps = Number(latest?.steps || 0);
  if (steps > 10000) adj.push({ direction: 'increase', type: 'activity', reason: 'Activity is above target — consider adding strength training', adjustment: 200 });
  if (steps < 3000) adj.push({ direction: 'decrease', type: 'activity', reason: 'Activity is below target — add more walking', adjustment: -100 });
  return adj;
};

export const computeStreak = (dates: string[]): StreakBadge & { current: number; longest: number; badges: StreakBadge[] } => {
  const days = dates.length;
  const badges: StreakBadge[] = [
    { id: 'b1', label: 'Beginner', description: 'First 7 days', icon: '🌱', earned: days >= 7 },
    { id: 'b2', label: 'Dedicated', description: '14 days streak', icon: '⭐', earned: days >= 14 },
    { id: 'b3', label: 'Champion', description: '30 days streak', icon: '🏆', earned: days >= 30 },
  ];
  return {
    id: 'current', label: days >= 30 ? 'Champion' : days >= 14 ? 'Dedicated' : days >= 7 ? 'Getting Started' : 'Beginner',
    description: `${days} day streak`, icon: days >= 30 ? '🏆' : days >= 14 ? '⭐' : days >= 7 ? '🔥' : '🌱',
    earned: days > 0, current: days, longest: days, badges,
  };
};

export const buildCSVExport = (_condition: string, entries: Record<string, any>[], _plan?: any): string => {
  if (entries.length === 0) return '';
  const headers = Object.keys(entries[0]);
  const rows = entries.map((e) => headers.map((h) => String(e[h] ?? '')).join(','));
  return [headers.join(','), ...rows].join('\n');
};

export const buildEmailReport = (_condition: string, _profile: any, entries: Record<string, any>[], streak: any): string => {
  const streakDays = streak?.current || entries.length;
  return `Health Report\nStreak: ${streakDays} days\nEntries: ${entries.length}`;
};

export const triggerFoods: Record<string, string[]> = {
  diabetes: ['White bread', 'Sugary drinks', 'Fruit juice', 'White rice', 'Candy', 'Pastries'],
  hypertension: ['Salty snacks', 'Processed meats', 'Canned soups', 'Pickles', 'Soy sauce'],
  gout: ['Red meat', 'Organ meats', 'Shellfish', 'Beer', 'Fructose drinks'],
  ibs: ['Dairy', 'Gluten', 'Beans', 'Onions', 'Apples'],
  liver: ['Fried foods', 'Alcohol', 'Processed foods', 'Excess sugar'],
  general: ['Sugary drinks', 'Fast food', 'Processed snacks', 'Excess salt'],
};

export const symptomOptions: Record<string, string[]> = {
  diabetes: ['Blood sugar spike', 'Dizziness', 'Fatigue', 'Blurred vision', 'Frequent urination'],
  hypertension: ['Headache', 'Chest pain', 'Shortness of breath', 'Dizziness', 'Nosebleed'],
  gout: ['Joint pain', 'Swelling', 'Redness', 'Limited mobility', 'Warmth in joint'],
  ibs: ['Bloating', 'Cramping', 'Diarrhea', 'Constipation', 'Gas'],
  liver: ['Nausea', 'Abdominal pain', 'Dark urine', 'Jaundice', 'Fatigue'],
  general: ['Headache', 'Fatigue', 'Nausea', 'Joint pain', 'Bloating'],
};

export const smartMealSwap = (_condition: string, _mealName: string, _options?: any): PlanMealItem | null => {
  const alt = pick(mealPool);
  return { ...alt, label: alt.meal, tips: 'Swapped for variety' };
};

export const MEAL_POOLS_BY_CUISINE: Record<string, PlanMealItem[]> = {
  egyptian: [
    { meal: '🌅 Breakfast', label: '🌅 Breakfast', calories: 420, items: ['Ful Medames', 'Taameya (falafel)', 'Egyptian bread', 'Pickled vegetables'], tips: 'Rich in plant protein', protein: 18, carbs: 50, fat: 14 },
    { meal: '☀️ Lunch', label: '☀️ Lunch', calories: 580, items: ['Koshari bowl', 'Molokhia soup', 'Rice', 'Bread'], tips: 'Traditional Egyptian lunch', protein: 22, carbs: 75, fat: 12 },
    { meal: '🌙 Dinner', label: '🌙 Dinner', calories: 400, items: ['Grilled kofta', 'Salad', 'Rice', 'Yogurt'], tips: 'Light Egyptian dinner', protein: 28, carbs: 35, fat: 16 },
  ],
  khaleeji: [
    { meal: '🌅 Breakfast', label: '🌅 Breakfast', calories: 450, items: ['Chebab (Emirati pancakes)', 'Date syrup', 'Laban'], tips: 'Traditional Gulf breakfast', protein: 15, carbs: 60, fat: 16 },
    { meal: '☀️ Lunch', label: '☀️ Lunch', calories: 620, items: ['Kabsa (spiced rice)', 'Lamb', 'Vegetable salad', 'Yogurt sauce'], tips: 'Filling and protein-rich', protein: 38, carbs: 60, fat: 22 },
    { meal: '🌙 Dinner', label: '🌙 Dinner', calories: 420, items: ['Shawarma wrap', 'Hummus', 'Pickles', 'Garlic sauce'], tips: 'Moderate portions', protein: 30, carbs: 35, fat: 18 },
  ],
  healthy: [
    { meal: '🌅 Breakfast', label: '🌅 Breakfast', calories: 350, items: ['Overnight oats', 'Chia seeds', 'Mixed berries', 'Almond milk'], tips: 'High fiber start', protein: 15, carbs: 45, fat: 10 },
    { meal: '☀️ Lunch', label: '☀️ Lunch', calories: 480, items: ['Grilled salmon', 'Quinoa', 'Roasted vegetables', 'Olive oil dressing'], tips: 'Omega-3 rich', protein: 35, carbs: 35, fat: 20 },
    { meal: '🌙 Dinner', label: '🌙 Dinner', calories: 380, items: ['Lentil soup', 'Mixed green salad', 'Whole grain bread'], tips: 'Light and nutritious', protein: 20, carbs: 40, fat: 8 },
  ],
  vegetarian: [
    { meal: '🌅 Breakfast', label: '🌅 Breakfast', calories: 380, items: ['Tofu scramble', 'Whole wheat toast', 'Avocado', 'Tomatoes'], tips: 'Protein-packed vegan', protein: 20, carbs: 35, fat: 16 },
    { meal: '☀️ Lunch', label: '☀️ Lunch', calories: 500, items: ['Chickpea curry', 'Brown rice', 'Raita', 'Papadum'], tips: 'Complete protein combo', protein: 18, carbs: 65, fat: 14 },
    { meal: '🌙 Dinner', label: '🌙 Dinner', calories: 400, items: ['Bean burrito bowl', 'Guacamole', 'Salsa', 'Lettuce'], tips: 'Fiber-rich dinner', protein: 22, carbs: 45, fat: 12 },
  ],
};

interface CuisineProfile { age: number; weight: number; height: number }

export const getMealPlanByCuisine = (cuisine: string, day: number, _profile?: CuisineProfile, _labs?: Record<string, number>): Array<{ meal: string; calories: number; cuisine: string; tips: string; items: string[] }> => {
  const pool = MEAL_POOLS_BY_CUISINE[cuisine] || MEAL_POOLS_BY_CUISINE.healthy;
  const seed = (day * 7 + Object.keys(pool).length) % pool.length;
  return pool.map((m, i) => ({
    meal: m.meal,
    calories: m.calories + ((seed + i) % 3) * 20,
    cuisine,
    tips: m.tips,
    items: m.items,
  }));
};
