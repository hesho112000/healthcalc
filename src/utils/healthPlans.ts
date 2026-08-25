/* ═══════════════════════════════════════════════════════════════════
   healthPlans.ts — 30-Day Plan Generators, Meal Pools, Smart Features
   ═══════════════════════════════════════════════════════════════════ */

export interface PlanMeal { meal: string; calories: number; items: string[]; tips: string; gi?: number; sodium?: number; purines?: number }
export interface PlanWorkout { exercise: string; sets: string; notes: string }
export interface DayPlan { day: number; label: string; phase: string; meals: PlanMeal[]; workouts: PlanWorkout[]; guidelines: string[]; dailyGoal: string }
export interface MealSwap { label: string; items: string[]; calories: number; tips: string; gi?: number; sodium?: number; purines?: number }
export interface CheckInField { key: string; label: string; unit: string; min: number; max: number; step: number; placeholder: number; icon: string }
export interface SymptomTrigger { id: string; date: string; symptom: string; severity: number; possibleCause: string; notes: string }

const uid = () => Math.random().toString(36).slice(2, 9);

/* ═══════════════════════════════════════════════════════════════════
   30-DAY PLAN GENERATORS — 4 PHASES: W1=Foundation, W2=Build, W3=Intensify, W4=Sustain
   ═══════════════════════════════════════════════════════════════════ */

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function phaseLabel(day: number): string {
  if (day <= 7) return 'Week 1 — Foundation';
  if (day <= 14) return 'Week 2 — Build';
  if (day <= 21) return 'Week 3 — Intensify';
  return 'Week 4 — Sustain';
}

function weekday(day: number): string { return DAY_NAMES[(day - 1) % 7]; }

function adjustCals(base: number, profile: { age: number; weight: number; height: number }, labs: Record<string, number>, conditionId: string): number {
  const bmr = Math.round(10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5);
  const tdee = Math.round(bmr * 1.4);
  const scale = tdee / 2000;
  let modifier = 1;
  if (conditionId === 'diabetes' && (labs.hba1c ?? 6.5) > 7) modifier = 0.95;
  if (conditionId === 'kidney' && (labs.gfr ?? 90) < 60) modifier = 0.9;
  return Math.round(base * scale * modifier);
}

/* ─── DIABETES 30-DAY PLAN ─── */
const diabetesMealPool: PlanMeal[][] = [
  [{ meal: 'Breakfast', calories: 350, items: ['Steel-cut oatmeal (50g)', 'Walnuts (15g)', 'Blueberries (80g)', 'Cinnamon', 'Green tea'], tips: 'Low-GI base, soluble fiber slows glucose', gi: 42 },
   { meal: 'Snack AM', calories: 120, items: ['Greek yogurt (100g)', 'Almonds (8)', 'Chia seeds (1 tsp)'], tips: 'Protein + fat slows carb absorption', gi: 15 },
   { meal: 'Lunch', calories: 430, items: ['Grilled chicken (130g)', 'Quinoa (120g)', 'Roasted vegetables', 'Olive oil dressing'], tips: 'Balanced macros, low-GI grains', gi: 35 },
   { meal: 'Snack PM', calories: 100, items: ['Apple slices (100g)', 'Peanut butter (1 tbsp)'], tips: 'Fruit + fat prevents spikes', gi: 38 },
   { meal: 'Dinner', calories: 380, items: ['Baked salmon (120g)', 'Sweet potato (100g)', 'Steamed broccoli', 'Herbal tea'], tips: 'Omega-3 supports insulin sensitivity', gi: 44 }],
  [{ meal: 'Breakfast', calories: 330, items: ['Veggie egg scramble (2 eggs)', 'Whole grain toast (1 slice)', 'Avocado (40g)', 'Green tea'], tips: 'High-protein, low-carb start', gi: 18 },
   { meal: 'Snack AM', calories: 110, items: ['Celery sticks (100g)', 'Almond butter (1 tbsp)'], tips: 'Crunchy, low-carb, high fiber', gi: 10 },
   { meal: 'Lunch', calories: 440, items: ['Turkey lettuce wraps (120g)', 'Brown rice (100g)', 'Mixed salad', 'Lemon dressing'], tips: 'Lettuce wraps reduce carb load', gi: 30 },
   { meal: 'Snack PM', calories: 100, items: ['Mixed nuts (20g)', 'Cherry tomatoes (60g)'], tips: 'Healthy fats, minimal carbs', gi: 12 },
   { meal: 'Dinner', calories: 390, items: ['Cod fillet (130g)', 'Cauliflower mash (120g)', 'Steamed green beans', 'Turmeric tea'], tips: 'Cauliflower replaces potato for lower GI', gi: 15 }],
  [{ meal: 'Breakfast', calories: 340, items: ['Chia pudding (30g chia)', 'Almond milk (150ml)', 'Strawberries (60g)', 'Pumpkin seeds'], tips: 'Chia seeds form gel, slow glucose release', gi: 20 },
   { meal: 'Snack AM', calories: 115, items: ['Edamame (80g)', 'Sea salt pinch'], tips: 'Plant protein, very low GI', gi: 15 },
   { meal: 'Lunch', calories: 420, items: ['Grilled salmon (120g)', 'Lentils (100g)', 'Roasted bell peppers', 'Olive oil'], tips: 'Lentils have very low GI', gi: 25 },
   { meal: 'Snack PM', calories: 105, items: ['Cucumber (100g)', 'Hummus (2 tbsp)'], tips: 'Fiber + plant protein', gi: 18 },
   { meal: 'Dinner', calories: 375, items: ['Herb chicken (130g)', 'Zucchini noodles (150g)', 'Cherry tomatoes', 'Parmesan (10g)'], tips: 'Zoodles cut carbs dramatically', gi: 12 }],
  [{ meal: 'Breakfast', calories: 320, items: ['Smoked salmon (60g)', 'Light cream cheese', 'Whole grain rye (2 slices)', 'Dill', 'Lemon'], tips: 'Rye has lower GI than wheat', gi: 35 },
   { meal: 'Snack AM', calories: 120, items: ['Pumpkin seeds (20g)', 'Brazil nuts (3)'], tips: 'Selenium + magnesium support insulin', gi: 8 },
   { meal: 'Lunch', calories: 450, items: ['Chickpea bowl (120g)', 'Sweet potato (80g)', 'Kale', 'Tahini dressing'], tips: 'Plant protein, high fiber', gi: 32 },
   { meal: 'Snack PM', calories: 95, items: ['Dark chocolate (20g, 85%+)', 'Walnuts (5)'], tips: 'Flavonoids support insulin sensitivity', gi: 22 },
   { meal: 'Dinner', calories: 385, items: ['Lean beef stir-fry (120g)', 'Broccoli & snap peas', 'Brown rice (80g)', 'Ginger'], tips: 'Iron + B12 support energy', gi: 38 }],
  [{ meal: 'Breakfast', calories: 310, items: ['Cottage cheese (150g)', 'Flaxseeds (1 tbsp)', 'Peach slices (80g)', 'Cinnamon'], tips: 'Casein protein is slow-digesting', gi: 28 },
   { meal: 'Snack AM', calories: 110, items: ['Cherry tomatoes (100g)', 'Mozzarella (20g)'], tips: 'Low-carb, lycopene-rich', gi: 10 },
   { meal: 'Lunch', calories: 435, items: ['Shrimp salad (130g)', 'Quinoa (80g)', 'Avocado (50g)', 'Lime dressing'], tips: 'Lean protein, healthy fats', gi: 25 },
   { meal: 'Snack PM', calories: 100, items: ['Pear (80g)', 'Almonds (8)'], tips: 'Fiber + fat combo', gi: 35 },
   { meal: 'Dinner', calories: 380, items: ['Turkey meatballs (120g)', 'Spaghetti squash (120g)', 'Marinara (60ml)', 'Basil'], tips: 'Squash is a low-GI pasta alternative', gi: 18 }],
];

const diabetesWorkoutPool: PlanWorkout[][] = [
  [{ exercise: 'Brisk Walking', sets: '30 min', notes: 'Post-meal walks lower blood sugar by 15-20%' },
   { exercise: 'Resistance Bands (Upper Body)', sets: '20 min', notes: 'Muscle contraction improves glucose uptake' },
   { exercise: 'Yoga (Balance Poses)', sets: '15 min', notes: 'Reduces cortisol, stabilizes blood sugar' }],
  [{ exercise: 'Cycling (Moderate)', sets: '25 min', notes: 'Sustained cardio improves insulin sensitivity' },
   { exercise: 'Resistance Bands (Lower Body)', sets: '20 min', notes: 'Leg muscles are largest glucose sinks' },
   { exercise: 'Stretching', sets: '10 min', notes: 'Full body flexibility and recovery' }],
  [{ exercise: 'Swimming', sets: '25 min', notes: 'Low-impact, full-body glucose burn' },
   { exercise: 'Bodyweight Circuit', sets: '20 min', notes: 'Push-ups, squats, lunges — no equipment needed' },
   { exercise: 'Deep Breathing', sets: '10 min', notes: 'Cortisol reduction for glucose stability' }],
  [{ exercise: 'Brisk Walking', sets: '35 min', notes: 'Week 4: increase duration for adaptation' },
   { exercise: 'Resistance Training', sets: '25 min', notes: 'Progressive overload for insulin sensitivity' },
   { exercise: 'Yoga (Restorative)', sets: '15 min', notes: 'Active recovery and stress relief' }],
];

const diabetesGuidelinesWeeks: string[][] = [
  ['Monitor fasting glucose daily (target: 80-130 mg/dL)', 'Eat meals at consistent times — no skipping', 'Pair every carb with protein or fat', 'Post-meal 10-min walk if glucose > 140 mg/dL'],
  ['Increase soluble fiber to 25-30g/day', 'Carb count meals: 30-45g per main meal', 'Add resistance training 3x/week', 'Limit alcohol — can cause delayed hypoglycemia'],
  ['Check post-meal glucose 2h after eating', 'Introduce meal rotation for variety', 'Review and adjust portion sizes based on glucose logs', 'Add 5 min of post-meal walking per 10 mg/dL above 140'],
  ['Prepare for HbA1c check at month end', 'Review 30-day glucose log for patterns', 'Discuss medication adjustments with doctor', 'Set maintenance plan for next 30 days'],
];

export function generateDiabetesPlan(profile: { age: number; weight: number; height: number }, labs: Record<string, number>): DayPlan[] {
  const days: DayPlan[] = [];
  for (let d = 1; d <= 30; d++) {
    const wIdx = Math.min(Math.floor((d - 1) / 8), 3);
    const meals = diabetesMealPool[(d - 1) % diabetesMealPool.length].map(m => ({
      ...m, calories: adjustCals(m.calories, profile, labs, 'diabetes')
    }));
    const workouts = diabetesWorkoutPool[wIdx % diabetesWorkoutPool.length];
    const weekGuidelines = diabetesGuidelinesWeeks[wIdx];
    const goals = ['Check fasting glucose before breakfast', 'Log all meals', '10-min post-meal walk', 'Drink 8 glasses water'];
    days.push({ day: d, label: `${weekday(d)} Day ${d}`, phase: phaseLabel(d), meals, workouts, guidelines: weekGuidelines, dailyGoal: goals[(d - 1) % goals.length] });
  }
  return days;
}

/* ─── HYPERTENSION 30-DAY PLAN ─── */
const htMealPool: PlanMeal[][] = [
  [{ meal: 'Breakfast', calories: 340, items: ['Oatmeal (50g) + flaxseeds', 'Banana (80g)', 'Unsalted almonds (10g)', 'Low-fat milk (200ml)'], tips: 'DASH-aligned: high potassium, low sodium', sodium: 120 },
   { meal: 'Snack AM', calories: 110, items: ['Carrot sticks (100g)', 'Hummus (2 tbsp)', 'Whole-grain crackers (4)'], tips: 'Magnesium-rich plant snack', sodium: 180 },
   { meal: 'Lunch', calories: 440, items: ['Grilled chicken (120g)', 'Brown rice (150g)', 'Steamed spinach & tomatoes', 'Olive oil (1 tbsp)'], tips: 'Sodium < 150mg per meal on DASH', sodium: 150 },
   { meal: 'Snack PM', calories: 100, items: ['Mixed berries (100g)', 'Pumpkin seeds (1 tbsp)'], tips: 'Anthocyanins for vascular health', sodium: 15 },
   { meal: 'Dinner', calories: 370, items: ['Baked cod (120g)', 'Roasted sweet potato (100g)', 'Kale & beet salad', 'Herbal tea'], tips: 'Nitrate-rich beets support vasodilation', sodium: 130 }],
  [{ meal: 'Breakfast', calories: 330, items: ['Whole grain toast (2)', 'Avocado (60g)', 'Cherry tomatoes (60g)', 'Olive oil drizzle'], tips: 'Monounsaturated fats support arterial health', sodium: 140 },
   { meal: 'Snack AM', calories: 115, items: ['Greek yogurt (100g)', 'Walnuts (7)'], tips: 'Calcium + omega-3 for BP', sodium: 50 },
   { meal: 'Lunch', calories: 450, items: ['Lentil soup (200ml)', 'Whole grain bread (1 slice)', 'Mixed green salad', 'Lemon-olive oil'], tips: 'Legumes lower BP by 3-4 mmHg', sodium: 160 },
   { meal: 'Snack PM', calories: 95, items: ['Banana (80g)', 'Almond butter (1 tsp)'], tips: 'Potassium + magnesium combo', sodium: 10 },
   { meal: 'Dinner', calories: 375, items: ['Grilled trout (120g)', 'Quinoa (100g)', 'Steamed asparagus', 'Herbal tea'], tips: 'Omega-3 for endothelial function', sodium: 110 }],
  [{ meal: 'Breakfast', calories: 350, items: ['Smoothie bowl: spinach, banana, berries, almond milk', 'Hemp seeds (1 tbsp)', 'Granola (20g)'], tips: 'Potassium-packed smoothie', sodium: 80 },
   { meal: 'Snack AM', calories: 110, items: ['Edamame (80g)', 'Sea salt free'], tips: 'Plant protein + folate', sodium: 15 },
   { meal: 'Lunch', calories: 430, items: ['Turkey breast (120g)', 'Sweet potato (100g)', 'Steamed broccoli', 'Tahini dressing'], tips: 'Vitamin C + potassium', sodium: 120 },
   { meal: 'Snack PM', calories: 105, items: ['Apple slices (100g)', 'Unsalted peanut butter (1 tbsp)'], tips: 'Quercetin in apple skin lowers BP', sodium: 20 },
   { meal: 'Dinner', calories: 365, items: ['Baked chicken thigh (skinless, 120g)', 'Brown rice (100g)', 'Roasted beets', 'Dill'], tips: 'Beets provide nitric oxide for vasodilation', sodium: 100 }],
  [{ meal: 'Breakfast', calories: 335, items: ['Overnight oats (50g)', 'Chia seeds (1 tbsp)', 'Mango (80g)', 'Low-fat yogurt (100g)'], tips: 'Prep ahead, no-cook DASH breakfast', sodium: 60 },
   { meal: 'Snack AM', calories: 100, items: ['Bell pepper strips (100g)', 'Hummus (2 tbsp)'], tips: 'Vitamin C enhances iron absorption', sodium: 150 },
   { meal: 'Lunch', calories: 445, items: ['Salmon burger (120g)', 'Whole wheat bun', 'Avocado (40g)', 'Side salad'], tips: 'Omega-3 fatty acids reduce inflammation', sodium: 190 },
   { meal: 'Snack PM', calories: 110, items: ['Dark chocolate (20g, 70%+)', 'Almonds (8)'], tips: 'Flavanols improve arterial flexibility', sodium: 5 },
   { meal: 'Dinner', calories: 370, items: ['Herb-crusted chicken (120g)', 'Roasted vegetables', 'Couscous (100g)', 'Mint tea'], tips: 'Herbs replace salt for flavor', sodium: 90 }],
];

const htWorkoutPool: PlanWorkout[][] = [
  [{ exercise: 'Brisk Walking', sets: '30 min', notes: 'Lowers BP by 5-8 mmHg' },
   { exercise: 'Swimming', sets: '25 min', notes: 'Joint-friendly, reduces arterial stiffness' },
   { exercise: 'Yoga (Restorative)', sets: '15 min', notes: 'Reduces sympathetic nervous system activity' }],
  [{ exercise: 'Cycling (Moderate)', sets: '25 min', notes: 'Improves endothelial function' },
   { exercise: 'Resistance Bands (Light)', sets: '20 min', notes: 'Avoid heavy lifting — no Valsalva' },
   { exercise: 'Deep Breathing', sets: '10 min', notes: 'Parasympathetic activation lowers BP' }],
  [{ exercise: 'Jogging (Easy Pace)', sets: '25 min', notes: 'Progress from walking to light jog' },
   { exercise: 'Swimming', sets: '20 min', notes: 'Water pressure aids venous return' },
   { exercise: 'Stretching', sets: '10 min', notes: 'Full body, focus on neck and shoulders' }],
  [{ exercise: 'Brisk Walking', sets: '35 min', notes: 'Increase duration in Week 4' },
   { exercise: 'Resistance Training', sets: '20 min', notes: 'Light weights, high reps (15-20)' },
   { exercise: 'Meditation', sets: '15 min', notes: 'Guided body scan for stress reduction' }],
];

export function generateHypertensionPlan(profile: { age: number; weight: number; height: number }, labs: Record<string, number>): DayPlan[] {
  const days: DayPlan[] = [];
  for (let d = 1; d <= 30; d++) {
    const wIdx = Math.min(Math.floor((d - 1) / 8), 3);
    const meals = htMealPool[(d - 1) % htMealPool.length].map(m => ({
      ...m, calories: adjustCals(m.calories, profile, labs, 'hypertension'),
      sodium: (m.sodium ?? 150) + Math.round((d > 15 ? -15 : 0))
    }));
    const workouts = htWorkoutPool[wIdx % htWorkoutPool.length];
    const goals = ['Measure morning BP', 'Keep sodium under 1500mg today', '10-min walk after lunch', 'Practice 5-min deep breathing'];
    days.push({ day: d, label: `${weekday(d)} Day ${d}`, phase: phaseLabel(d), meals, workouts, guidelines: htMealPool[0][0].tips ? ['Follow DASH principles', 'Sodium < 1500mg/day', 'Potassium-rich foods', '150 min aerobic/week'] : [], dailyGoal: goals[(d - 1) % goals.length] });
  }
  return days;
}

/* ─── IBS 30-DAY PLAN ─── */
const ibsMealPool: PlanMeal[][] = [
  [{ meal: 'Breakfast', calories: 320, items: ['GF oatmeal (40g)', 'Blueberries (50g)', 'Pumpkin seeds (1 tbsp)', 'Peppermint tea'], tips: 'Low-FODMAP start to the day' },
   { meal: 'Snack', calories: 150, items: ['Rice cakes (2)', 'Peanut butter (1 tbsp)', 'Green tea'], tips: 'Keep portions small to reduce gut load' },
   { meal: 'Lunch', calories: 420, items: ['Grilled chicken (130g)', 'White rice (150g)', 'Steamed carrots & zucchini', 'Olive oil (1 tbsp)'], tips: 'Avoid high-FODMAP vegetables' },
   { meal: 'Dinner', calories: 380, items: ['Baked salmon (120g)', 'Quinoa (100g)', 'Roasted bell peppers', 'Ginger tea'], tips: 'Cook vegetables well for easier digestion' }],
  [{ meal: 'Breakfast', calories: 310, items: ['Sourdough toast (2)', 'Scrambled eggs (2)', 'Spinach (30g)', 'Lemon water'], tips: 'Sourdough fermentation reduces fructans' },
   { meal: 'Snack', calories: 140, items: ['Rice crackers (6)', 'Cheddar cheese (30g)'], tips: 'Low-lactose dairy option' },
   { meal: 'Lunch', calories: 430, items: ['Turkey breast (120g)', 'Potato (120g)', 'Carrots (80g)', 'Olive oil (1 tbsp)'], tips: 'Well-cooked root vegetables are gentle' },
   { meal: 'Dinner', calories: 370, items: ['White fish (130g)', 'White rice (100g)', 'Green beans (80g)', 'Ginger'], tips: 'White fish is easiest to digest' }],
  [{ meal: 'Breakfast', calories: 300, items: ['Banana pancakes (2, no wheat)', 'Maple syrup (1 tsp)', 'Strawberries (60g)', 'Rooibos tea'], tips: 'Banana-based, gluten-free option' },
   { meal: 'Snack', calories: 130, items: ['Peanut butter on rice cake', 'Kiwi (1, peeled)'], tips: 'Kiwi improves motility' },
   { meal: 'Lunch', calories: 440, items: ['Chicken & rice bowl (130g chicken)', 'Bell peppers', 'Carrots', 'Soy sauce (low-FODMAP)'], tips: 'Simple, predictable ingredients' },
   { meal: 'Dinner', calories: 385, items: ['Turkey meatballs (120g)', 'Zucchini (100g)', 'Potato (100g)', 'Basil'], tips: 'Minimize sauce complexity' }],
  [{ meal: 'Breakfast', calories: 315, items: ['Oat porridge (40g)', 'Strawberries (50g)', 'Peanut butter (1 tsp)', 'Peppermint tea'], tips: 'Soluble fiber from oats regulates bowel' },
   { meal: 'Snack', calories: 145, items: ['Walnuts (10)', 'Banana (small, firm)'], tips: 'Firm bananas are lower FODMAP' },
   { meal: 'Lunch', calories: 425, items: ['Grilled tofu (120g)', 'Rice noodles (120g)', 'Bok choy', 'Sesame oil'], tips: 'Tofu is well-tolerated plant protein' },
   { meal: 'Dinner', calories: 375, items: ['Baked cod (130g)', 'Mashed potato (120g)', 'Steamed carrots', 'Fennel tea'], tips: 'Fennel aids digestion and reduces gas' }],
];

export function generateIBSPlan(profile: { age: number; weight: number; height: number }, _labs: Record<string, number>): DayPlan[] {
  const days: DayPlan[] = [];
  for (let d = 1; d <= 30; d++) {
    const meals = ibsMealPool[(d - 1) % ibsMealPool.length].map(m => ({ ...m, calories: adjustCals(m.calories, profile, _labs, 'ibs') }));
    const wIdx = Math.min(Math.floor((d - 1) / 8), 3);
    const workoutSets = ['30 min', '25 min', '20 min', '35 min'];
    const workouts: PlanWorkout[] = [
      { exercise: 'Walking (gentle pace)', sets: workoutSets[wIdx], notes: 'Reduces stress, stimulates motility' },
      { exercise: 'Yoga (Cat-Cow, Child\'s Pose)', sets: '20 min', notes: 'Relieves abdominal tension' },
      { exercise: 'Deep Breathing', sets: '10 min', notes: 'Activates parasympathetic nervous system' },
    ];
    const phaseGoals = ['Identify trigger foods via diary', 'Maintain consistent meal times', 'Build stress management routine', 'Review 30-day symptom log'];
    days.push({ day: d, label: `${weekday(d)} Day ${d}`, phase: phaseLabel(d), meals, workouts, guidelines: ['Chew food thoroughly', 'Eat at regular times', 'Limit caffeine', 'Track symptoms daily'], dailyGoal: phaseGoals[(d - 1) % 7 < 4 ? 0 : Math.min(wIdx, 3)] });
  }
  return days;
}

/* ─── GOUT 30-DAY PLAN ─── */
const goutMealPool: PlanMeal[][] = [
  [{ meal: 'Breakfast', calories: 340, items: ['Whole grain toast (2)', 'Scrambled eggs (2)', 'Strawberries (100g)', 'Skim milk (200ml)'], tips: 'Low-purine breakfast', purines: 30 },
   { meal: 'Snack', calories: 130, items: ['Cherries (100g)', 'Almonds (10)'], tips: 'Cherries reduce uric acid levels', purines: 5 },
   { meal: 'Lunch', calories: 430, items: ['Grilled chicken (120g)', 'Brown rice (150g)', 'Mixed salad', 'Lemon water'], tips: 'Avoid organ meats, shellfish', purines: 55 },
   { meal: 'Dinner', calories: 390, items: ['Baked cod (130g)', 'Steamed broccoli', 'Sweet potato (100g)', 'Herbal tea'], tips: 'Drink 8+ glasses of water daily', purines: 40 }],
  [{ meal: 'Breakfast', calories: 330, items: ['Oatmeal (50g)', 'Blueberries (80g)', 'Chia seeds (1 tbsp)', 'Green tea'], tips: 'Oats are naturally very low purine', purines: 10 },
   { meal: 'Snack', calories: 125, items: ['Cherry juice (150ml)', 'Walnuts (7)'], tips: 'Cherry juice reduces flare risk 35%', purines: 3 },
   { meal: 'Lunch', calories: 440, items: ['Turkey breast (120g)', 'Pasta (120g)', 'Roasted vegetables', 'Olive oil'], tips: 'Poultry is moderate purine — acceptable', purines: 60 },
   { meal: 'Dinner', calories: 385, items: ['Egg omelette (3)', 'White rice (100g)', 'Steamed green beans', 'Turmeric tea'], tips: 'Eggs are very low purine', purines: 10 }],
  [{ meal: 'Breakfast', calories: 335, items: ['Whole wheat wrap', 'Avocado (60g)', 'Cherry tomatoes', 'Hummus (2 tbsp)'], tips: 'Plant-based breakfast', purines: 15 },
   { meal: 'Snack', calories: 135, items: ['Greek yogurt (100g)', 'Pumpkin seeds (1 tbsp)'], tips: 'Dairy increases uric acid excretion', purines: 5 },
   { meal: 'Lunch', calories: 425, items: ['Bean chili (no meat)', 'Brown rice (100g)', 'Side salad', 'Lemon dressing'], tips: 'Beans are low purine, high fiber', purines: 20 },
   { meal: 'Dinner', calories: 395, items: ['Grilled chicken (120g)', 'Sweet potato (100g)', 'Steamed asparagus', 'Ginger tea'], tips: 'Moderate portions, plenty of water', purines: 50 }],
  [{ meal: 'Breakfast', calories: 325, items: ['Buckwheat pancakes (2)', 'Strawberries (60g)', 'Maple syrup (1 tsp)', 'Skim milk'], tips: 'Buckwheat is low purine and anti-inflammatory', purines: 8 },
   { meal: 'Snack', calories: 120, items: ['Cherries (80g)', 'Almonds (10)'], tips: 'Tart cherries are most effective', purines: 4 },
   { meal: 'Lunch', calories: 435, items: ['Lentil soup (200ml)', 'Whole grain bread', 'Mixed salad', 'Olive oil'], tips: 'Lentils are low purine plant protein', purines: 25 },
   { meal: 'Dinner', calories: 380, items: ['Baked cod (130g)', 'Mashed cauliflower', 'Steamed broccoli', 'Herbal tea'], tips: 'White fish is lower purine than shellfish', purines: 35 }],
];

export function generateGoutPlan(profile: { age: number; weight: number; height: number }, labs: Record<string, number>): DayPlan[] {
  const days: DayPlan[] = [];
  for (let d = 1; d <= 30; d++) {
    const meals = goutMealPool[(d - 1) % goutMealPool.length].map(m => ({ ...m, calories: adjustCals(m.calories, profile, labs, 'gout') }));
    const wIdx = Math.min(Math.floor((d - 1) / 8), 3);
    const dur = ['25 min', '20 min', '15 min', '30 min'];
    const workouts: PlanWorkout[] = [
      { exercise: 'Swimming', sets: dur[wIdx], notes: 'Joint-friendly, low impact' },
      { exercise: 'Range of Motion Exercises', sets: '15 min', notes: 'Gentle joint movements' },
      { exercise: 'Stretching', sets: '10 min', notes: 'Focus on ankles and knees' },
    ];
    days.push({ day: d, label: `${weekday(d)} Day ${d}`, phase: phaseLabel(d), meals, workouts, guidelines: ['Limit purine-rich foods', 'Drink 2-3L water daily', 'Avoid alcohol', 'Cherry intake daily'], dailyGoal: ['Drink 10 glasses of water', 'Eat 100g cherries', 'Avoid red meat today', '10-min joint mobility'][((d - 1) % 4)] });
  }
  return days;
}

/* ─── CKD (KIDNEY) 30-DAY PLAN ─── */
const kidneyMealPool: PlanMeal[][] = [
  [{ meal: 'Breakfast', calories: 330, items: ['White bread (2)', 'Cream cheese (2 tbsp)', 'Blueberries (50g)', 'Herbal tea'], tips: 'Limit potassium and phosphorus' },
   { meal: 'Snack', calories: 120, items: ['Unsalted crackers (6)', 'Cucumber slices'], tips: 'Low-sodium snack' },
   { meal: 'Lunch', calories: 400, items: ['Grilled chicken (100g)', 'White pasta (120g)', 'Green beans', 'Olive oil dressing'], tips: 'Control protein per doctor recommendation' },
   { meal: 'Dinner', calories: 370, items: ['Egg whites omelette (3)', 'White rice (100g)', 'Lettuce & cabbage salad', 'Apple (small)'], tips: 'Choose low-potassium fruits' }],
  [{ meal: 'Breakfast', calories: 320, items: ['White toast (2)', 'Butter (1 tsp)', 'Strawberries (60g)', 'Herbal tea'], tips: 'Strawberries are lower in potassium than bananas' },
   { meal: 'Snack', calories: 115, items: ['Rice cakes (2)', 'Honey (1 tsp)'], tips: 'Simple, low-mineral snack' },
   { meal: 'Lunch', calories: 410, items: ['Turkey breast (100g)', 'White rice (120g)', 'Cabbage (80g)', 'Sunflower oil'], tips: 'Cabbage is low-potassium vegetable' },
   { meal: 'Dinner', calories: 365, items: ['Egg (2)', 'White pasta (100g)', 'Green beans (80g)', 'Olive oil (1 tsp)'], tips: 'Moderate protein, low phosphorus' }],
  [{ meal: 'Breakfast', calories: 325, items: ['Cream of rice (50g)', 'Blueberries (40g)', 'Maple syrup (1 tsp)', 'Herbal tea'], tips: 'Rice-based cereals are renal-friendly' },
   { meal: 'Snack', calories: 125, items: ['White crackers (6)', 'Cream cheese (1 tbsp)'], tips: 'Low potassium, low phosphorus' },
   { meal: 'Lunch', calories: 405, items: ['Grilled fish (100g)', 'White bread (2)', 'Lettuce salad', 'Olive oil'], tips: 'White fish provides protein without excess minerals' },
   { meal: 'Dinner', calories: 375, items: ['Chicken meatballs (100g)', 'Egg noodles (120g)', 'Carrots (60g)', 'Dill'], tips: 'Limit tomato sauce — high potassium' }],
  [{ meal: 'Breakfast', calories: 315, items: ['Waffles (2, plain)', 'Strawberries (50g)', 'Whipped cream', 'Herbal tea'], tips: 'Low-potassium fruits only' },
   { meal: 'Snack', calories: 110, items: ['Ginger snaps (4)', 'Peeled apple slices (60g)'], tips: 'Peeled fruits have less potassium' },
   { meal: 'Lunch', calories: 415, items: ['Turkey burger (100g)', 'White bun', 'Lettuce & cucumber', 'Mustard'], tips: 'Avoid ketchup — high sodium and potassium' },
   { meal: 'Dinner', calories: 360, items: ['Egg white omelette (4)', 'White toast (1)', 'Steamed cabbage', 'Herbal tea'], tips: 'Egg whites are pure protein, no phosphorus' }],
];

export function generateKidneyPlan(profile: { age: number; weight: number; height: number }, labs: Record<string, number>): DayPlan[] {
  const days: DayPlan[] = [];
  for (let d = 1; d <= 30; d++) {
    const meals = kidneyMealPool[(d - 1) % kidneyMealPool.length].map(m => ({ ...m, calories: adjustCals(m.calories, profile, labs, 'kidney') }));
    const workouts: PlanWorkout[] = [
      { exercise: 'Walking', sets: `${20 + Math.min(Math.floor((d - 1) / 10) * 5, 10)} min`, notes: 'Moderate pace, daily' },
      { exercise: 'Light Resistance Bands', sets: '15 min', notes: 'Upper and lower body' },
      { exercise: 'Stretching', sets: '10 min', notes: 'Full body flexibility' },
    ];
    days.push({ day: d, label: `${weekday(d)} Day ${d}`, phase: phaseLabel(d), meals, workouts, guidelines: ['Phosphorus & potassium limits', 'Sodium < 2000mg/day', 'Protein per CKD stage', 'Monitor fluid intake'], dailyGoal: ['Log fluid intake', 'Check sodium on labels', 'Measure daily weight', 'Record all meals'][((d - 1) % 4)] });
  }
  return days;
}

/* ─── LIVER 30-DAY PLAN ─── */
const liverMealPool: PlanMeal[][] = [
  [{ meal: 'Breakfast', calories: 310, items: ['Oatmeal (40g) + banana', 'Flaxseeds (1 tbsp)', 'Green tea', 'Walnuts (5)'], tips: 'Liver-friendly, high fiber' },
   { meal: 'Snack', calories: 140, items: ['Apple slices', 'Almond butter (1 tbsp)'], tips: 'Antioxidant-rich snacks' },
   { meal: 'Lunch', calories: 420, items: ['Grilled fish (120g)', 'Lentils (100g)', 'Roasted vegetables', 'Lemon dressing'], tips: 'Lean protein, plant-based fiber' },
   { meal: 'Dinner', calories: 360, items: ['Turkey breast (110g)', 'Sweet potato (100g)', 'Steamed kale', 'Turmeric golden milk'], tips: 'Anti-inflammatory foods support liver' }],
  [{ meal: 'Breakfast', calories: 305, items: ['Green smoothie: spinach, lemon, ginger, apple', 'Chia seeds (1 tbsp)'], tips: 'Detox-supportive morning drink' },
   { meal: 'Snack', calories: 135, items: ['Carrot sticks (100g)', 'Hummus (2 tbsp)'], tips: 'Beta-carotene supports liver' },
   { meal: 'Lunch', calories: 425, items: ['Grilled chicken (120g)', 'Quinoa (100g)', 'Beetroot salad', 'Olive oil'], tips: 'Beets support Phase II detox' },
   { meal: 'Dinner', calories: 355, items: ['Baked cod (120g)', 'Brown rice (80g)', 'Steamed broccoli', 'Green tea'], tips: 'Cruciferous veggies support detox enzymes' }],
  [{ meal: 'Breakfast', calories: 315, items: ['Whole grain toast (2)', 'Avocado (50g)', 'Cherry tomatoes', 'Green tea'], tips: 'Healthy fats, no alcohol required' },
   { meal: 'Snack', calories: 130, items: ['Grapefruit (100g)', 'Pumpkin seeds (1 tbsp)'], tips: 'Grapefruit supports CYP enzymes (check med interactions)' },
   { meal: 'Lunch', calories: 415, items: ['Lentil soup (200ml)', 'Whole grain bread', 'Mixed salad', 'Lemon dressing'], tips: 'Plant-based protein eases liver load' },
   { meal: 'Dinner', calories: 365, items: ['Turkey meatballs (110g)', 'Sweet potato (100g)', 'Steamed asparagus', 'Turmeric tea'], tips: 'Turmeric is hepatoprotective' }],
  [{ meal: 'Breakfast', calories: 320, items: ['Overnight oats (40g)', 'Almond milk', 'Blueberries (50g)', 'Walnuts (5)'], tips: 'Prep-ahead liver-friendly breakfast' },
   { meal: 'Snack', calories: 140, items: ['Orange slices (100g)', 'Almonds (10)'], tips: 'Vitamin C supports glutathione' },
   { meal: 'Lunch', calories: 410, items: ['Grilled fish (120g)', 'Brown rice (100g)', 'Roasted cauliflower', 'Olive oil'], tips: 'Cauliflower activates detox pathways' },
   { meal: 'Dinner', calories: 370, items: ['Chicken breast (120g)', 'Mashed sweet potato', 'Steamed green beans', 'Ginger tea'], tips: 'Ginger reduces liver inflammation markers' }],
];

export function generateLiverPlan(profile: { age: number; weight: number; height: number }, labs: Record<string, number>): DayPlan[] {
  const days: DayPlan[] = [];
  for (let d = 1; d <= 30; d++) {
    const meals = liverMealPool[(d - 1) % liverMealPool.length].map(m => ({ ...m, calories: adjustCals(m.calories, profile, labs, 'liver') }));
    const wIdx = Math.min(Math.floor((d - 1) / 8), 3);
    const dur = ['25 min', '20 min', '15 min', '30 min'];
    const workouts: PlanWorkout[] = [
      { exercise: 'Walking', sets: dur[wIdx], notes: 'Gentle, consistent daily movement' },
      { exercise: 'Yoga', sets: '20 min', notes: 'Reduce stress, improve circulation' },
      { exercise: 'Tai Chi', sets: '15 min', notes: 'Balance and mindfulness' },
    ];
    days.push({ day: d, label: `${weekday(d)} Day ${d}`, phase: phaseLabel(d), meals, workouts, guidelines: ['Zero alcohol', 'Antioxidant-rich foods', 'Moderate protein', 'Coffee 2-3 cups/day'], dailyGoal: ['Zero alcohol today', 'Eat 5 servings vegetables', 'Drink 3 cups coffee', 'No processed foods'][((d - 1) % 4)] });
  }
  return days;
}

/* ─── CHOLESTEROL 30-DAY PLAN ─── */
const cholMealPool: PlanMeal[][] = [
  [{ meal: 'Breakfast', calories: 330, items: ['Steel-cut oatmeal (50g)', 'Chia seeds (1 tbsp)', 'Banana (sliced)', 'Cinnamon'], tips: 'Oats lower LDL cholesterol' },
   { meal: 'Snack', calories: 130, items: ['Walnuts (7)', 'Pear'], tips: 'Omega-3 from walnuts' },
   { meal: 'Lunch', calories: 440, items: ['Grilled salmon (130g)', 'Quinoa (100g)', 'Avocado (50g)', 'Green salad'], tips: 'Omega-3 and healthy fats' },
   { meal: 'Dinner', calories: 380, items: ['Bean chili (no meat)', 'Brown rice (100g)', 'Steamed broccoli', 'Olive oil (1 tsp)'], tips: 'Soluble fiber from beans lowers cholesterol' }],
  [{ meal: 'Breakfast', calories: 320, items: ['Muesli (50g)', 'Low-fat yogurt (100g)', 'Flaxseeds (1 tbsp)', 'Berries (60g)'], tips: 'Beta-glucan in oats binds bile acids' },
   { meal: 'Snack', calories: 125, items: ['Apple slices', 'Almond butter (1 tbsp)'], tips: 'Pectin (soluble fiber) lowers LDL' },
   { meal: 'Lunch', calories: 445, items: ['Grilled chicken (130g)', 'Brown rice (100g)', 'Edamame (60g)', 'Sesame dressing'], tips: 'Plant sterols in soy lower cholesterol' },
   { meal: 'Dinner', calories: 375, items: ['Baked trout (120g)', 'Roasted vegetables', 'Barley (80g)', 'Dill'], tips: 'Barley is rich in beta-glucan fiber' }],
  [{ meal: 'Breakfast', calories: 325, items: ['Whole grain toast (2)', 'Avocado (60g)', 'Tomato slices', 'Olive oil drizzle'], tips: 'Monounsaturated fats raise HDL' },
   { meal: 'Snack', calories: 135, items: ['Mixed nuts (20g)', 'Dark chocolate (10g)'], tips: 'Flavonoids improve lipid profile' },
   { meal: 'Lunch', calories: 435, items: ['Lentil salad (120g)', 'Quinoa (80g)', 'Roasted beetroot', 'Balsamic dressing'], tips: 'Plant protein and soluble fiber' },
   { meal: 'Dinner', calories: 385, items: ['Grilled salmon (130g)', 'Sweet potato (100g)', 'Steamed asparagus', 'Lemon'], tips: 'EPA/DHA lower triglycerides 15-30%' }],
  [{ meal: 'Breakfast', calories: 335, items: ['Chia pudding (30g)', 'Almond milk', 'Blueberries (80g)', 'Hemp seeds (1 tbsp)'], tips: 'Omega-3 ALA from chia and hemp' },
   { meal: 'Snack', calories: 120, items: ['Carrot sticks (100g)', 'Hummus (2 tbsp)'], tips: 'Fiber-rich, low saturated fat' },
   { meal: 'Lunch', calories: 430, items: ['Turkey burger (120g)', 'Whole wheat bun', 'Lettuce, tomato', 'Avocado (40g)'], tips: 'Lean protein with plant fats' },
   { meal: 'Dinner', calories: 390, items: ['Shrimp stir-fry (130g)', 'Mixed vegetables', 'Brown rice (100g)', 'Ginger-soy'], tips: 'Shrimp is low in saturated fat' }],
];

export function generateCholesterolPlan(profile: { age: number; weight: number; height: number }, labs: Record<string, number>): DayPlan[] {
  const days: DayPlan[] = [];
  for (let d = 1; d <= 30; d++) {
    const meals = cholMealPool[(d - 1) % cholMealPool.length].map(m => ({ ...m, calories: adjustCals(m.calories, profile, labs, 'cholesterol') }));
    const wIdx = Math.min(Math.floor((d - 1) / 8), 3);
    const dur = ['30 min', '25 min', '20 min', '35 min'];
    const workouts: PlanWorkout[] = [
      { exercise: 'Brisk Walking/Jogging', sets: dur[wIdx], notes: 'Raises HDL cholesterol' },
      { exercise: 'Resistance Training', sets: '20 min', notes: 'Full body, 3x/week' },
      { exercise: 'Cycling', sets: '25 min', notes: 'Moderate intensity' },
    ];
    days.push({ day: d, label: `${weekday(d)} Day ${d}`, phase: phaseLabel(d), meals, workouts, guidelines: ['Saturated fat < 7% calories', 'Soluble fiber 10-25g/day', 'Fatty fish 2-3x/week', 'Exercise 150 min/week'], dailyGoal: ['Eat oats or barley today', 'Avoid fried foods', 'Walk 30 minutes', 'Eat fatty fish'][((d - 1) % 4)] });
  }
  return days;
}

/* ─── THYROID 30-DAY PLAN ─── */
const thyroidMealPool: PlanMeal[][] = [
  [{ meal: 'Breakfast', calories: 340, items: ['Eggs (2) on whole grain toast', 'Brazil nuts (2)', 'Strawberries (80g)', 'Lemon water'], tips: 'Selenium from Brazil nuts supports thyroid' },
   { meal: 'Snack', calories: 140, items: ['Greek yogurt (100g)', 'Pumpkin seeds (1 tbsp)'], tips: 'Zinc and selenium-rich' },
   { meal: 'Lunch', calories: 430, items: ['Chicken breast (120g)', 'Brown rice (150g)', 'Roasted seaweed side', 'Mixed greens'], tips: 'Iodine from seaweed (moderate)' },
   { meal: 'Dinner', calories: 370, items: ['Cod fillet (120g)', 'Baked potato (100g)', 'Steamed asparagus', 'Olive oil drizzle'], tips: 'Iodine-rich fish, avoid excess raw cruciferous' }],
  [{ meal: 'Breakfast', calories: 330, items: ['Scrambled eggs (2)', 'Spinach (40g)', 'Whole grain toast', 'Green tea'], tips: 'Iron from spinach aids thyroid hormone synthesis' },
   { meal: 'Snack', calories: 135, items: ['Brazil nuts (2)', 'Dried apricots (4)'], tips: 'Selenium + iron combination' },
   { meal: 'Lunch', calories: 440, items: ['Grilled turkey (120g)', 'Quinoa (120g)', 'Roasted broccoli (cooked)', 'Olive oil'], tips: 'Cook broccoli to reduce goitrogens' },
   { meal: 'Dinner', calories: 365, items: ['Salmon (120g)', 'Sweet potato (100g)', 'Steamed green beans', 'Turmeric'], tips: 'Omega-3 reduces thyroid inflammation' }],
  [{ meal: 'Breakfast', calories: 335, items: ['Oatmeal (50g)', 'Walnuts (10)', 'Banana (sliced)', 'Cinnamon'], tips: 'Iodized salt in oatmeal for iodine' },
   { meal: 'Snack', calories: 130, items: ['Greek yogurt (100g)', 'Hemp seeds (1 tbsp)'], tips: 'Probiotics support gut-thyroid axis' },
   { meal: 'Lunch', calories: 435, items: ['Chicken & vegetable stir-fry (120g)', 'Brown rice (130g)', 'Bell peppers', 'Ginger'], tips: 'Cooked vegetables only — no raw goitrogens' },
   { meal: 'Dinner', calories: 375, items: ['Lean beef (110g)', 'Baked potato (100g)', 'Steamed kale (cooked)', 'Lemon'], tips: 'Iron + zinc from beef support thyroid' }],
  [{ meal: 'Breakfast', calories: 325, items: ['Smoothie: almond milk, banana, spinach, protein powder', 'Brazil nuts (2)'], tips: 'Quick thyroid-supportive breakfast' },
   { meal: 'Snack', calories: 140, items: ['Pumpkin seeds (20g)', 'Dark chocolate (10g)'], tips: 'Zinc in pumpkin seeds supports T3 conversion' },
   { meal: 'Lunch', calories: 425, items: ['Tuna salad (120g)', 'Mixed greens', 'Avocado (50g)', 'Lemon-olive oil'], tips: 'Selenium and omega-3 combo' },
   { meal: 'Dinner', calories: 370, items: ['Chicken breast (120g)', 'Quinoa (100g)', 'Roasted carrots & parsnips', 'Herbal tea'], tips: 'Root vegetables are thyroid-safe' }],
];

export function generateThyroidPlan(profile: { age: number; weight: number; height: number }, labs: Record<string, number>): DayPlan[] {
  const days: DayPlan[] = [];
  for (let d = 1; d <= 30; d++) {
    const meals = thyroidMealPool[(d - 1) % thyroidMealPool.length].map(m => ({ ...m, calories: adjustCals(m.calories, profile, labs, 'thyroid') }));
    const wIdx = Math.min(Math.floor((d - 1) / 8), 3);
    const dur = ['30 min', '25 min', '20 min', '35 min'];
    const workouts: PlanWorkout[] = [
      { exercise: 'Walking', sets: dur[wIdx], notes: 'Boosts metabolism gently' },
      { exercise: 'Yoga', sets: '20 min', notes: 'Supports adrenal health' },
      { exercise: 'Light Weight Training', sets: '20 min', notes: 'Combats thyroid fatigue' },
    ];
    days.push({ day: d, label: `${weekday(d)} Day ${d}`, phase: phaseLabel(d), meals, workouts, guidelines: ['Iodine 150mcg/day, Selenium 55mcg/day', 'Take thyroid meds on empty stomach', 'Avoid raw cruciferous in excess', 'Manage stress — cortisol suppresses thyroid'], dailyGoal: ['Take thyroid med correctly', 'Eat 2 Brazil nuts', 'Manage stress 10 min', 'Avoid raw cruciferous today'][((d - 1) % 4)] });
  }
  return days;
}

/* ═══════════════════════════════════════════════════════════════════
   30-DAY PLAN GENERATOR DISPATCHER
   ═══════════════════════════════════════════════════════════════════ */
export function generate30DayPlan(conditionId: string, profile: { age: number; weight: number; height: number }, labs: Record<string, number>): DayPlan[] {
  switch (conditionId) {
    case 'diabetes': return generateDiabetesPlan(profile, labs);
    case 'hypertension': return generateHypertensionPlan(profile, labs);
    case 'ibs': return generateIBSPlan(profile, labs);
    case 'gout': return generateGoutPlan(profile, labs);
    case 'kidney': return generateKidneyPlan(profile, labs);
    case 'liver': return generateLiverPlan(profile, labs);
    case 'cholesterol': return generateCholesterolPlan(profile, labs);
    case 'thyroid': return generateThyroidPlan(profile, labs);
    default: return generateDiabetesPlan(profile, labs);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   CHECK-IN FIELD DEFINITIONS PER CONDITION
   ═══════════════════════════════════════════════════════════════════ */
export function getCheckInFields(conditionId: string): CheckInField[] {
  const base: CheckInField[] = [
    { key: 'water', label: 'Water Intake', unit: 'glasses', min: 0, max: 20, step: 1, placeholder: 8, icon: '💧' },
    { key: 'mood', label: 'Mood (1-10)', unit: '/10', min: 1, max: 10, step: 1, placeholder: 7, icon: '😊' },
    { key: 'medication', label: 'Medication Taken', unit: '(1=yes)', min: 0, max: 1, step: 1, placeholder: 1, icon: '💊' },
  ];
  switch (conditionId) {
    case 'diabetes': return [
      { key: 'fastingGlucose', label: 'Fasting Glucose', unit: 'mg/dL', min: 40, max: 500, step: 1, placeholder: 110, icon: '🩸' },
      { key: 'postMealGlucose', label: 'Post-Meal Glucose', unit: 'mg/dL', min: 40, max: 500, step: 1, placeholder: 150, icon: '📊' },
      ...base,
    ];
    case 'hypertension': return [
      { key: 'systolic', label: 'Systolic BP', unit: 'mmHg', min: 60, max: 250, step: 1, placeholder: 135, icon: '❤️' },
      { key: 'diastolic', label: 'Diastolic BP', unit: 'mmHg', min: 30, max: 150, step: 1, placeholder: 85, icon: '❤️' },
      ...base,
    ];
    case 'ibs': return [
      { key: 'bloating', label: 'Bloating (1-10)', unit: '/10', min: 1, max: 10, step: 1, placeholder: 3, icon: '🫄' },
      { key: 'pain', label: 'Abdominal Pain (1-10)', unit: '/10', min: 1, max: 10, step: 1, placeholder: 2, icon: '😣' },
      { key: 'bowelFrequency', label: 'Bowel Movements', unit: 'count', min: 0, max: 10, step: 1, placeholder: 2, icon: '🚽' },
      ...base,
    ];
    case 'gout': return [
      { key: 'painLevel', label: 'Joint Pain (1-10)', unit: '/10', min: 1, max: 10, step: 1, placeholder: 2, icon: '🦴' },
      { key: 'swelling', label: 'Joint Swelling (1-10)', unit: '/10', min: 1, max: 10, step: 1, placeholder: 1, icon: '🩹' },
      ...base,
    ];
    case 'kidney': return [
      { key: 'fluidIntake', label: 'Fluid Intake', unit: 'ml', min: 0, max: 5000, step: 100, placeholder: 2000, icon: '🥤' },
      { key: 'urineColor', label: 'Urine Color (1=pale 8=dark)', unit: '', min: 1, max: 8, step: 1, placeholder: 3, icon: '🟡' },
      ...base,
    ];
    case 'liver': return [
      { key: 'fatigue', label: 'Fatigue Level (1-10)', unit: '/10', min: 1, max: 10, step: 1, placeholder: 4, icon: '😴' },
      { key: 'alcoholFree', label: 'Alcohol-Free Today', unit: '(1=yes)', min: 0, max: 1, step: 1, placeholder: 1, icon: '🚫' },
      ...base,
    ];
    case 'cholesterol': return [
      { key: 'saturatedFat', label: 'Saturated Fat Est.', unit: 'grams', min: 0, max: 80, step: 1, placeholder: 15, icon: '🫒' },
      { key: 'fiberIntake', label: 'Fiber Intake Est.', unit: 'grams', min: 0, max: 50, step: 1, placeholder: 25, icon: '🥦' },
      ...base,
    ];
    case 'thyroid': return [
      { key: 'energyLevel', label: 'Energy Level (1-10)', unit: '/10', min: 1, max: 10, step: 1, placeholder: 6, icon: '⚡' },
      { key: 'medTiming', label: 'Took Med on Empty Stomach', unit: '(1=yes)', min: 0, max: 1, step: 1, placeholder: 1, icon: '💊' },
      ...base,
    ];
    default: return base;
  }
}

/* ═══════════════════════════════════════════════════════════════════
   SYMPTOM TRIGGER IDENTIFIER (IBS / Gout / Liver)
   ═══════════════════════════════════════════════════════════════════ */
export const triggerFoods: Record<string, string[]> = {
  ibs: ['Onion', 'Garlic', 'Wheat', 'Apple', 'Honey', 'Beans', 'Dairy (milk)', 'Artificial sweeteners', 'Caffeine', 'Alcohol', 'Cruciferous veg', 'Mushrooms'],
  gout: ['Red meat', 'Organ meats', 'Shellfish', 'Beer', 'Fructose syrup', 'Anchovies', 'Sardines', 'Yeast extract'],
  liver: ['Alcohol', 'Fried foods', 'High-sugar drinks', 'Processed meats', 'Excess acetaminophen', 'Herbal supplements (kava)', 'Raw shellfish'],
};

export const symptomOptions: Record<string, string[]> = {
  ibs: ['Bloating', 'Cramping', 'Diarrhea', 'Constipation', 'Gas', 'Nausea', 'Urgency', 'Mucus in stool'],
  gout: ['Joint pain', 'Swelling', 'Redness', 'Warmth', 'Limited mobility', 'Flare-up', 'Stiffness'],
  liver: ['Fatigue', 'Abdominal pain', 'Nausea', 'Loss of appetite', 'Dark urine', 'Itchy skin', 'Yellow skin/eyes'],
};

/* ═══════════════════════════════════════════════════════════════════
   AI AUTO-ADJUSTMENT ENGINE
   ═══════════════════════════════════════════════════════════════════ */
export interface AIAdjustment {
  type: 'calories' | 'sodium' | 'carbs' | 'protein' | 'exercise';
  reason: string;
  adjustment: number;
  direction: 'increase' | 'decrease' | 'maintain';
}

export function computeAIAdjustments(conditionId: string, weekEntries: Array<Record<string, number | string>>, currentTarget: number): AIAdjustment[] {
  if (weekEntries.length < 3) return [];

  const adj: AIAdjustment[] = [];
  const avg = (key: string) => {
    const vals = weekEntries.map(e => typeof e[key] === 'number' ? e[key] as number : 0).filter(v => v > 0);
    return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  };

  switch (conditionId) {
    case 'diabetes': {
      const avgFasting = avg('fastingGlucose');
      const avgPostMeal = avg('postMealGlucose');
      if (avgFasting > 130) adj.push({ type: 'carbs', reason: `Avg fasting glucose ${Math.round(avgFasting)} mg/dL exceeds 130 target`, adjustment: -10, direction: 'decrease' });
      if (avgFasting < 90 && avgPostMeal < 140) adj.push({ type: 'carbs', reason: `Glucose well-controlled — can slightly increase carb allowance`, adjustment: 5, direction: 'increase' });
      const med = avg('medication');
      if (med < 0.8) adj.push({ type: 'calories', reason: 'Medication adherence below 80% — maintain current plan', adjustment: 0, direction: 'maintain' });
      break;
    }
    case 'hypertension': {
      const avgSys = avg('systolic');
      if (avgSys > 140) adj.push({ type: 'sodium', reason: `Avg systolic ${Math.round(avgSys)} mmHg exceeds 140 target`, adjustment: -200, direction: 'decrease' });
      if (avgSys <= 120) adj.push({ type: 'sodium', reason: `BP well-controlled at avg ${Math.round(avgSys)} mmHg`, adjustment: 50, direction: 'increase' });
      break;
    }
    case 'ibs': {
      const avgBloating = avg('bloating');
      const avgPain = avg('pain');
      if (avgBloating > 5 || avgPain > 5) adj.push({ type: 'calories', reason: `Symptoms elevated (bloating ${avgBloating.toFixed(1)}, pain ${avgPain.toFixed(1)}) — reduce meal sizes`, adjustment: -100, direction: 'decrease' });
      break;
    }
    case 'gout': {
      const avgPain = avg('painLevel');
      if (avgPain > 5) adj.push({ type: 'protein', reason: `Joint pain ${avgPain.toFixed(1)}/10 — reduce purine-heavy proteins`, adjustment: -15, direction: 'decrease' });
      break;
    }
    case 'liver': {
      const avgFatigue = avg('fatigue');
      if (avgFatigue > 7) adj.push({ type: 'calories', reason: `Fatigue ${avgFatigue.toFixed(1)}/10 — increase caloric intake`, adjustment: 100, direction: 'increase' });
      const alc = avg('alcoholFree');
      if (alc < 1) adj.push({ type: 'calories', reason: 'CRITICAL: Alcohol consumption detected — absolute abstinence required', adjustment: 0, direction: 'maintain' });
      break;
    }
    default: break;
  }

  return adj;
}

/* ═══════════════════════════════════════════════════════════════════
   STREAK & REWARDS
   ═══════════════════════════════════════════════════════════════════ */
export interface StreakBadge {
  id: string; label: string; description: string; icon: string; requirement: number; earned: boolean;
}

export function computeStreak(checkInDates: string[]): { current: number; longest: number; badges: StreakBadge[] } {
  const sorted = [...new Set(checkInDates)].sort();
  let current = 0;
  let longest = 0;
  let streak = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / 86400000);
    if (diffDays === 1) { streak++; } else { longest = Math.max(longest, streak); streak = 1; }
  }
  current = streak;
  longest = Math.max(longest, streak);

  const badges: StreakBadge[] = [
    { id: 'b3', label: 'Getting Started', description: '3-day check-in streak', icon: '🌱', requirement: 3, earned: longest >= 3 },
    { id: 'b7', label: 'Week Warrior', description: '7-day check-in streak', icon: '💪', requirement: 7, earned: longest >= 7 },
    { id: 'b14', label: 'Halfway Hero', description: '14-day check-in streak', icon: '⭐', requirement: 14, earned: longest >= 14 },
    { id: 'b21', label: 'Dedication Pro', description: '21-day check-in streak', icon: '🏆', requirement: 21, earned: longest >= 21 },
    { id: 'b30', label: '30-Day Champion', description: 'Complete 30-day streak', icon: '👑', requirement: 30, earned: longest >= 30 },
  ];

  return { current, longest, badges };
}

/* ═══════════════════════════════════════════════════════════════════
   CSV EXPORT BUILDER
   ═══════════════════════════════════════════════════════════════════ */
export function buildCSVExport(conditionId: string, entries: Array<Record<string, string | number>>, plan: DayPlan[]): string {
  const fields = getCheckInFields(conditionId);
  const header = ['Day', 'Date', ...fields.map(f => `${f.label} (${f.unit})`)].join(',');
  const rows = entries.map((e, i) => {
    return [i + 1, e.date || '', ...fields.map(f => String(e[f.key] ?? ''))].join(',');
  });

  const summary = [
    '', '--- 30-DAY PLAN SUMMARY ---',
    `Condition: ${conditionId}`,
    `Total Check-ins: ${entries.length}`,
    `Days Completed: ${entries.length}/30`,
    '',
    '--- DAILY PLAN ---',
    'Day,Phase,Meal,Calories,Items,Workout,Duration',
  ];

  plan.forEach(d => {
    d.meals.forEach(m => {
      summary.push(`${d.day},${d.phase},"${m.meal}",${m.calories},"${m.items.join('; ')}","",""`);
    });
    d.workouts.forEach(w => {
      summary.push(`${d.day},${d.phase},"","","","${w.exercise}","${w.sets}"`);
    });
  });

  return [header, ...rows, ...summary].join('\n');
}

export function buildEmailReport(conditionId: string, profile: { age: number; weight: number; height: number }, entries: Array<Record<string, string | number>>, streak: { current: number; longest: number }): string {
  const bmi = +(profile.weight / ((profile.height / 100) ** 2)).toFixed(1);
  let report = `HealthCalc.ai — 30-Day ${conditionId.charAt(0).toUpperCase() + conditionId.slice(1)} Progress Report\n`;
  report += `${'═'.repeat(55)}\n\n`;
  report += `Patient Profile:\n  Age: ${profile.age} | Weight: ${profile.weight}kg | Height: ${profile.height}cm | BMI: ${bmi}\n\n`;
  report += `Engagement:\n  Check-ins: ${entries.length}/30 | Current Streak: ${streak.current} days | Longest: ${streak.longest} days\n\n`;

  if (entries.length > 0) {
    report += `Daily Log Summary:\n`;
    report += `${'─'.repeat(40)}\n`;
    entries.slice(-10).forEach((e, i) => {
      report += `  Day ${entries.length - 10 + i + 1} (${e.date}): `;
      const vals = Object.entries(e).filter(([k]) => k !== 'id' && k !== 'date').map(([k, v]) => `${k}=${v}`);
      report += vals.join(', ') + '\n';
    });
    if (entries.length > 10) report += `  ... and ${entries.length - 10} more entries\n`;
  }

  report += `\n${'═'.repeat(55)}\nGenerated by HealthCalc.ai — For physician review`;
  return report;
}

/* ═══════════════════════════════════════════════════════════════════
   SMART MEAL SWAP ENGINE — macro-matched alternatives
   ═══════════════════════════════════════════════════════════════════ */
interface SwapAlternative {
  label: string;
  items: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tips: string;
}

type SwapPool = Record<string, SwapAlternative[]>;

const SWAP_POOLS: Record<string, SwapPool> = {
  diabetes: {
    breakfast: [
      { label: 'Steel-Cut Oatmeal + Walnuts', items: ['Steel-cut oats 60g', 'Walnuts 15g', 'Cinnamon', 'Chia seeds 10g', 'Unsweetened almond milk'], calories: 320, protein: 12, carbs: 42, fat: 12, tips: 'Low GI oats stabilize morning blood sugar' },
      { label: 'Veggie Egg Scramble', items: ['Whole eggs ×2', 'Spinach', 'Bell peppers', 'Feta 20g', 'Whole wheat toast 1 slice'], calories: 340, protein: 22, carbs: 24, fat: 18, tips: 'High protein, low carb for glucose control' },
      { label: 'Greek Yogurt Parfait', items: ['Plain Greek yogurt 170g', 'Mixed berries 80g', 'Almonds 10g', 'Flaxseed 8g'], calories: 290, protein: 20, carbs: 28, fat: 10, tips: 'Probiotic-rich, low glycemic impact' },
    ],
    lunch: [
      { label: 'Grilled Salmon Salad', items: ['Salmon fillet 150g', 'Mixed greens', 'Avocado ¼', 'Olive oil dressing 10ml', 'Cherry tomatoes'], calories: 420, protein: 35, carbs: 12, fat: 24, tips: 'Omega-3 fatty acids improve insulin sensitivity' },
      { label: 'Lentil & Chicken Bowl', items: ['Chicken breast 120g', 'Green lentils 80g (cooked)', 'Roasted cauliflower', 'Lemon tahini 10ml'], calories: 410, protein: 38, carbs: 30, fat: 14, tips: 'High fiber slows glucose absorption' },
      { label: 'Tuna Lettuce Wraps', items: ['Tuna in water 140g', 'Butter lettuce cups', 'Cucumber', 'Low-fat mayo 10g', 'Apple slices'], calories: 370, protein: 36, carbs: 14, fat: 16, tips: 'Light and protein-dense option' },
    ],
    dinner: [
      { label: 'Baked Cod with Vegetables', items: ['Cod fillet 160g', 'Steamed broccoli', 'Cauliflower mash', 'Herb butter 5g'], calories: 350, protein: 38, carbs: 14, fat: 12, tips: 'Lean protein, minimal carbs for evening' },
      { label: 'Chicken Stir-Fry', items: ['Chicken breast 140g', 'Broccoli', 'Snap peas', 'Bell pepper', 'Coconut aminos 15ml'], calories: 370, protein: 36, carbs: 20, fat: 14, tips: 'Low-sugar sauce alternatives' },
      { label: 'Turkey Meatballs + Zoodles', items: ['Turkey mince 150g', 'Zucchini noodles 200g', 'Sugar-free marinara', 'Parmesan 10g'], calories: 360, protein: 34, carbs: 16, fat: 16, tips: 'Zucchini replaces pasta for low-carb' },
    ],
    'snack am': [
      { label: 'Almond Butter + Celery', items: ['Almond butter 15g', 'Celery sticks', 'Cinnamon'], calories: 110, protein: 4, carbs: 6, fat: 8, tips: 'Healthy fat keeps you full' },
      { label: 'Protein Shake', items: ['Whey protein 25g', 'Unsweeted almond milk 200ml', 'Ice'], calories: 130, protein: 26, carbs: 3, fat: 2, tips: 'Quick protein with minimal carbs' },
    ],
    'snack pm': [
      { label: 'Cheese + Walnuts', items: ['Cheddar 20g', 'Walnuts 10g', 'Cherry tomatoes'], calories: 140, protein: 8, carbs: 3, fat: 11, tips: 'Balanced fat/protein snack' },
      { label: 'Hummus + Veggies', items: ['Hummus 30g', 'Carrot sticks', 'Cucumber slices'], calories: 120, protein: 5, carbs: 12, fat: 6, tips: 'Fiber-rich plant protein' },
    ],
  },
  hypertension: {
    breakfast: [
      { label: 'Oatmeal + Berries', items: ['Rolled oats 50g', 'Blueberries 80g', 'Ground flax 10g', 'Cinnamon', 'Low-fat milk 100ml'], calories: 310, protein: 11, carbs: 48, fat: 8, tips: 'High fiber supports DASH diet' },
      { label: 'Avocado Toast + Egg', items: ['Whole wheat toast', 'Avocado ½', 'Poached egg', 'Cherry tomatoes'], calories: 340, protein: 14, carbs: 30, fat: 18, tips: 'Potassium-rich avocado helps lower BP' },
      { label: 'Banana Smoothie Bowl', items: ['Banana', 'Low-fat yogurt 150g', 'Oats 20g', 'Hemp seeds 10g', 'Berries'], calories: 330, protein: 14, carbs: 50, fat: 8, tips: 'Potassium + magnesium blend' },
    ],
    lunch: [
      { label: 'Grilled Chicken + Quinoa', items: ['Chicken breast 140g', 'Quinoa 80g (cooked)', 'Roasted vegetables', 'Lemon juice'], calories: 400, protein: 36, carbs: 32, fat: 10, tips: 'Low sodium, high magnesium' },
      { label: 'Salmon Rice Bowl', items: ['Salmon 130g', 'Brown rice 80g', 'Edamame', 'Avocado ¼', 'Low-sodium soy 5ml'], calories: 420, protein: 34, carbs: 38, fat: 14, tips: 'Omega-3s support cardiovascular health' },
      { label: 'Bean & Sweet Potato Bowl', items: ['Black beans 100g', 'Sweet potato 150g', 'Lime juice', 'Coriander', 'Greek yogurt'], calories: 380, protein: 18, carbs: 52, fat: 6, tips: 'Potassium-rich plant meal' },
    ],
    dinner: [
      { label: 'Herb-Baked Chicken + Greens', items: ['Chicken thigh 160g (skinless)', 'Steamed kale', 'Mashed sweet potato', 'Rosemary'], calories: 380, protein: 36, carbs: 28, fat: 12, tips: 'Low-sodium herb seasoning' },
      { label: 'Steamed Fish + Vegetables', items: ['White fish 160g', 'Steamed broccoli', 'Brown rice 60g', 'Ginger'], calories: 350, protein: 34, carbs: 30, fat: 6, tips: 'Light and heart-friendly' },
      { label: 'Turkey Chili + Beans', items: ['Turkey mince 140g', 'Kidney beans 80g', 'Diced tomatoes', 'Bell pepper', 'Cumin'], calories: 370, protein: 34, carbs: 26, fat: 12, tips: 'High potassium, low sodium' },
    ],
    'snack am': [
      { label: 'Banana + Almond Butter', items: ['Banana', 'Almond butter 10g'], calories: 150, protein: 4, carbs: 24, fat: 5, tips: 'Potassium-rich morning snack' },
      { label: 'Yogurt + Pumpkin Seeds', items: ['Low-fat yogurt 150g', 'Pumpkin seeds 10g', 'Berries'], calories: 140, protein: 12, carbs: 16, fat: 4, tips: 'Magnesium supports blood pressure' },
    ],
    'snack pm': [
      { label: 'Dark Chocolate + Almonds', items: ['Dark chocolate 70% 15g', 'Almonds 10g'], calories: 130, protein: 4, carbs: 8, fat: 9, tips: 'Flavanols support vascular health' },
      { label: 'Carrots + Hummus', items: ['Carrot sticks', 'Hummus 25g'], calories: 110, protein: 4, carbs: 12, fat: 5, tips: 'Low sodium crunchy snack' },
    ],
  },
  weightloss: {
    breakfast: [
      { label: 'Protein Oats', items: ['Rolled oats 40g', 'Whey protein 20g', 'Berries 60g', 'Water/unsweetened milk'], calories: 260, protein: 26, carbs: 30, fat: 5, tips: 'High-protein breakfast for satiety' },
      { label: 'Egg White Veggie Scramble', items: ['Egg whites ×4', 'Spinach', 'Mushrooms', 'Cherry tomatoes', '1 slice whole wheat toast'], calories: 220, protein: 24, carbs: 18, fat: 4, tips: 'Volume eating with minimal calories' },
      { label: 'Cottage Cheese Bowl', items: ['Low-fat cottage cheese 150g', 'Pineapple 50g', 'Chia seeds 8g', 'Cinnamon'], calories: 210, protein: 22, carbs: 16, fat: 5, tips: 'Casein protein keeps you full longer' },
    ],
    lunch: [
      { label: 'Grilled Chicken Salad', items: ['Chicken breast 130g', 'Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Lemon dressing 10ml'], calories: 320, protein: 34, carbs: 10, fat: 14, tips: 'Low calorie, high volume meal' },
      { label: 'Turkey Lettuce Wraps', items: ['Turkey mince 120g', 'Butter lettuce', 'Carrot', 'Low-sodium soy 5ml', 'Sesame seeds'], calories: 280, protein: 28, carbs: 10, fat: 12, tips: 'Lettuce wraps save 200+ calories' },
      { label: 'Tuna Salad Plate', items: ['Tuna in water 130g', 'Mixed greens', 'Cucumber', 'Chickpeas 40g', 'Lime juice'], calories: 290, protein: 32, carbs: 14, fat: 8, tips: 'Lean protein with fiber' },
    ],
    dinner: [
      { label: 'Herb-Baked Fish + Greens', items: ['White fish 150g', 'Steamed green beans', 'Lemon', 'Herbs'], calories: 280, protein: 32, carbs: 10, fat: 10, tips: 'Low-calorie dinner, high protein' },
      { label: 'Chicken Stir-Fry (Light)', items: ['Chicken breast 130g', 'Mixed vegetables 200g', 'Low-sodium soy 5ml', 'Ginger'], calories: 300, protein: 32, carbs: 16, fat: 10, tips: 'Volume stir-fry with minimal oil' },
      { label: 'Turkey + Roasted Vegetables', items: ['Turkey breast 140g', 'Roasted zucchini', 'Roasted peppers', 'Herbs'], calories: 290, protein: 34, carbs: 12, fat: 8, tips: 'Lean protein, high fiber' },
    ],
    'snack am': [
      { label: 'Apple + Protein Shake', items: ['Apple', 'Whey protein 20g', 'Water'], calories: 180, protein: 22, carbs: 20, fat: 2, tips: 'Fruit + protein = satisfying snack' },
      { label: 'Greek Yogurt + Berries', items: ['Low-fat Greek yogurt 130g', 'Mixed berries 60g'], calories: 130, protein: 16, carbs: 14, fat: 2, tips: 'High protein, low calorie snack' },
    ],
    'snack pm': [
      { label: 'Cucumber + Hummus', items: ['Cucumber slices', 'Hummus 20g'], calories: 80, protein: 3, carbs: 8, fat: 4, tips: 'Light crunch with plant protein' },
      { label: 'Turkey Jerky', items: ['Turkey jerky 30g'], calories: 90, protein: 14, carbs: 3, fat: 2, tips: 'Portable high-protein snack' },
    ],
  },
};

function macroDistance(a: { calories: number; protein: number; carbs: number; fat: number }, b: { calories: number; protein: number; carbs: number; fat: number }): number {
  return Math.abs(a.calories - b.calories) + Math.abs(a.protein - b.protein) * 3 + Math.abs(a.carbs - b.carbs) * 2 + Math.abs(a.fat - b.fat) * 2.5;
}

export function smartMealSwap(
  conditionId: string,
  mealType: string,
  original: { calories: number; protein?: number; carbs?: number; fat?: number },
  excludeIndex: number = -1
): SwapAlternative | null {
  const poolKey = conditionId === 'cholesterol' || conditionId === 'liver' || conditionId === 'kidney' || conditionId === 'gout' || conditionId === 'ibs' || conditionId === 'thyroid'
    ? 'weightloss' : conditionId;
  const pool = SWAP_POOLS[poolKey]?.[mealType.toLowerCase()];
  if (!pool || pool.length === 0) return null;

  const origMacros = {
    calories: original.calories,
    protein: original.protein ?? Math.round(original.calories * 0.3 / 4),
    carbs: original.carbs ?? Math.round(original.calories * 0.45 / 4),
    fat: original.fat ?? Math.round(original.calories * 0.25 / 9),
  };

  const scored = pool
    .map((alt, idx) => ({ alt, idx, dist: macroDistance(origMacros, alt) }))
    .filter(({ idx }) => idx !== excludeIndex)
    .sort((a, b) => a.dist - b.dist);

  return scored.length > 0 ? scored[0].alt : pool[0];
}

