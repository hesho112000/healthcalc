import { UserProfile, ActivityLevel, HealthGoal, CalorieResult, DailyMealPlan, DiabetesInputs, LabResult, BPResult } from '../types';

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const calculateBMR = (profile: UserProfile): number => {
  const { age, gender, height, weight } = profile;
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
};

export const calculateTDEE = (bmr: number, activityLevel: ActivityLevel): number => {
  return Math.round(bmr * activityMultipliers[activityLevel]);
};

export const getTargetCalories = (tdee: number, goal: HealthGoal): number => {
  switch (goal) {
    case 'lose_weight':
      return Math.round(tdee - 500);
    case 'gain_muscle':
      return Math.round(tdee + 300);
    default:
      return tdee;
  }
};

export const calculateMacros = (calories: number, goal: HealthGoal, weight: number) => {
  let proteinRatio: number;
  let carbRatio: number;
  let fatRatio: number;

  switch (goal) {
    case 'lose_weight':
      proteinRatio = 0.35;
      carbRatio = 0.35;
      fatRatio = 0.30;
      break;
    case 'gain_muscle':
      proteinRatio = 0.30;
      carbRatio = 0.45;
      fatRatio = 0.25;
      break;
    default:
      proteinRatio = 0.25;
      carbRatio = 0.45;
      fatRatio = 0.30;
  }

  const proteinCalories = calories * proteinRatio;
  const carbCalories = calories * carbRatio;
  const fatCalories = calories * fatRatio;

  return {
    protein: Math.round(proteinRatio * 100),
    carbs: Math.round(carbRatio * 100),
    fat: Math.round(fatRatio * 100),
    proteinGrams: Math.round(proteinCalories / 4),
    carbsGrams: Math.round(carbCalories / 4),
    fatGrams: Math.round(fatCalories / 9),
  };
};

interface RecipeComponent {
  name: string;
  baseGrams: number;
  proteinPer100: number;
  carbsPer100: number;
  fatPer100: number;
}

interface MealTemplate {
  label: string;
  icon: 'meal' | 'snack';
  caloriePct: number;
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
  components: RecipeComponent[];
  garnish: string[];
  style: string;
}

const BREAKFAST_TEMPLATES: MealTemplate[] = [
  { label: 'Protein Oat Bowl', icon: 'meal', caloriePct: 0.25, proteinPct: 0.25, carbsPct: 0.30, fatPct: 0.18, components: [{ name: 'Rolled Oats', baseGrams: 50, proteinPer100: 13, carbsPer100: 66, fatPer100: 7 }, { name: 'Greek Yogurt', baseGrams: 170, proteinPer100: 10, carbsPer100: 6, fatPer100: 0.7 }, { name: 'Chopped Almonds', baseGrams: 15, proteinPer100: 21, carbsPer100: 22, fatPer100: 49 }], garnish: ['Sprinkle of cinnamon', '50g fresh blueberries'], style: 'A balanced high-protein breakfast bowl' },
  { label: 'Veggie Egg Scramble', icon: 'meal', caloriePct: 0.24, proteinPct: 0.28, carbsPct: 0.18, fatPct: 0.22, components: [{ name: 'Whole Eggs', baseGrams: 120, proteinPer100: 13, carbsPer100: 1.1, fatPer100: 11 }, { name: 'Whole-Grain Toast', baseGrams: 60, proteinPer100: 13, carbsPer100: 41, fatPer100: 6 }, { name: 'Avocado', baseGrams: 50, proteinPer100: 2, carbsPer100: 9, fatPer100: 15 }], garnish: ['Handful of baby spinach', 'Cherry tomatoes (50g)'], style: 'A savory protein-packed scramble with healthy fats' },
  { label: 'Berry Protein Smoothie', icon: 'meal', caloriePct: 0.22, proteinPct: 0.30, carbsPct: 0.28, fatPct: 0.12, components: [{ name: 'Whey Protein Isolate', baseGrams: 30, proteinPer100: 80, carbsPer100: 8, fatPer100: 3 }, { name: 'Banana', baseGrams: 120, proteinPer100: 1, carbsPer100: 23, fatPer100: 0.3 }, { name: 'Mixed Berries', baseGrams: 100, proteinPer100: 1.4, carbsPer100: 12, fatPer100: 0.3 }], garnish: ['250ml unsweetened almond milk', '1 tbsp chia seeds'], style: 'A quick blended breakfast with antioxidants' },
  { label: 'Smoked Salmon Toast', icon: 'meal', caloriePct: 0.25, proteinPct: 0.26, carbsPct: 0.22, fatPct: 0.24, components: [{ name: 'Smoked Salmon', baseGrams: 80, proteinPer100: 25, carbsPer100: 0, fatPer100: 4.3 }, { name: 'Whole-Grain Toast', baseGrams: 70, proteinPer100: 13, carbsPer100: 41, fatPer100: 6 }, { name: 'Cream Cheese', baseGrams: 30, proteinPer100: 6, carbsPer100: 4, fatPer100: 34 }], garnish: ['Capers (5g)', 'Fresh dill', 'Thinly sliced red onion'], style: 'Omega-3 rich open-face toast' },
  { label: 'Cottage Cheese Pancakes', icon: 'meal', caloriePct: 0.26, proteinPct: 0.30, carbsPct: 0.25, fatPct: 0.15, components: [{ name: 'Cottage Cheese', baseGrams: 150, proteinPer100: 11, carbsPer100: 3.4, fatPer100: 4.3 }, { name: 'Oat Flour', baseGrams: 40, proteinPer100: 13, carbsPer100: 66, fatPer100: 7 }, { name: 'Egg Whites', baseGrams: 60, proteinPer100: 11, carbsPer100: 0.7, fatPer100: 0.2 }], garnish: ['100g sliced strawberries', 'Sugar-free maple syrup (15ml)'], style: 'Fluffy high-protein pancakes' },
  { label: 'Mediterranean Yogurt Bowl', icon: 'meal', caloriePct: 0.23, proteinPct: 0.24, carbsPct: 0.28, fatPct: 0.20, components: [{ name: 'Greek Yogurt', baseGrams: 200, proteinPer100: 10, carbsPer100: 6, fatPer100: 0.7 }, { name: 'Walnuts', baseGrams: 15, proteinPer100: 15, carbsPer100: 14, fatPer100: 65 }, { name: 'Granola', baseGrams: 30, proteinPer100: 12, carbsPer100: 60, fatPer100: 15 }], garnish: ['1 tbsp honey', 'Fresh figs or berries (60g)'], style: 'Creamy Mediterranean breakfast bowl' },
  { label: 'Turkey Breakfast Wrap', icon: 'meal', caloriePct: 0.25, proteinPct: 0.30, carbsPct: 0.22, fatPct: 0.18, components: [{ name: 'Lean Turkey Breast', baseGrams: 80, proteinPer100: 29, carbsPer100: 0, fatPer100: 1 }, { name: 'Whole-Wheat Tortilla', baseGrams: 60, proteinPer100: 10, carbsPer100: 44, fatPer100: 6 }, { name: 'Scrambled Egg Whites', baseGrams: 80, proteinPer100: 11, carbsPer100: 0.7, fatPer100: 0.2 }], garnish: ['Salsa (30g)', 'Sliced avocado (30g)'], style: 'A lean high-protein wrap to start the day' },
  { label: 'Chia Pudding Parfait', icon: 'meal', caloriePct: 0.22, proteinPct: 0.20, carbsPct: 0.30, fatPct: 0.22, components: [{ name: 'Chia Seeds', baseGrams: 30, proteinPer100: 17, carbsPer100: 42, fatPer100: 31 }, { name: 'Greek Yogurt', baseGrams: 120, proteinPer100: 10, carbsPer100: 6, fatPer100: 0.7 }, { name: 'Mixed Berries', baseGrams: 80, proteinPer100: 1.4, carbsPer100: 12, fatPer100: 0.3 }], garnish: ['200ml almond milk', '10g sliced almonds'], style: 'Overnight-set omega-3 rich pudding' },
  { label: 'Egg White Frittata', icon: 'meal', caloriePct: 0.24, proteinPct: 0.32, carbsPct: 0.15, fatPct: 0.16, components: [{ name: 'Egg Whites', baseGrams: 180, proteinPer100: 11, carbsPer100: 0.7, fatPer100: 0.2 }, { name: 'Whole Egg', baseGrams: 50, proteinPer100: 13, carbsPer100: 1.1, fatPer100: 11 }, { name: 'Whole-Grain Toast', baseGrams: 50, proteinPer100: 13, carbsPer100: 41, fatPer100: 6 }], garnish: ['Diced bell peppers (60g)', 'Fresh basil', 'Mushrooms (40g)'], style: 'A fluffy low-fat frittata with veggies' },
  { label: 'Overnight Oats Jar', icon: 'meal', caloriePct: 0.25, proteinPct: 0.24, carbsPct: 0.32, fatPct: 0.18, components: [{ name: 'Rolled Oats', baseGrams: 55, proteinPer100: 13, carbsPer100: 66, fatPer100: 7 }, { name: 'Greek Yogurt', baseGrams: 100, proteinPer100: 10, carbsPer100: 6, fatPer100: 0.7 }, { name: 'Peanut Butter', baseGrams: 15, proteinPer100: 25, carbsPer100: 20, fatPer100: 50 }], garnish: ['200ml unsweetened almond milk', 'Sliced banana (80g)', 'Chia seeds (10g)'], style: 'Prep-ahead creamy overnight oats' },
  { label: 'Smoked Mackerel Plate', icon: 'meal', caloriePct: 0.26, proteinPct: 0.28, carbsPct: 0.18, fatPct: 0.26, components: [{ name: 'Smoked Mackerel', baseGrams: 80, proteinPer100: 21, carbsPer100: 0, fatPer100: 14 }, { name: 'Rye Bread', baseGrams: 60, proteinPer100: 10, carbsPer100: 48, fatPer100: 3 }, { name: 'Cream Cheese', baseGrams: 25, proteinPer100: 6, carbsPer100: 4, fatPer100: 34 }], garnish: ['Cucumber slices (80g)', 'Fresh lemon wedge', 'Cracked black pepper'], style: 'Omega-3 rich open-face breakfast' },
  { label: 'Peanut Butter Banana Toast', icon: 'meal', caloriePct: 0.25, proteinPct: 0.22, carbsPct: 0.30, fatPct: 0.22, components: [{ name: 'Whole-Grain Bread', baseGrams: 70, proteinPer100: 13, carbsPer100: 41, fatPer100: 6 }, { name: 'Peanut Butter', baseGrams: 20, proteinPer100: 25, carbsPer100: 20, fatPer100: 50 }, { name: 'Banana', baseGrams: 100, proteinPer100: 1, carbsPer100: 23, fatPer100: 0.3 }], garnish: ['Drizzle of honey (10g)', 'Chia seeds (8g)'], style: 'Quick energy-dense morning toast' },
];

const SNACK_AM_TEMPLATES: MealTemplate[] = [
  { label: 'Protein Shake', icon: 'snack', caloriePct: 0.08, proteinPct: 0.18, carbsPct: 0.06, fatPct: 0.05, components: [{ name: 'Whey Protein Isolate', baseGrams: 30, proteinPer100: 80, carbsPer100: 8, fatPer100: 3 }], garnish: ['250ml unsweetened almond milk', 'Ice cubes'], style: 'A quick-absorbing post-workout shake' },
  { label: 'Cottage Cheese & Fruit', icon: 'snack', caloriePct: 0.09, proteinPct: 0.15, carbsPct: 0.08, fatPct: 0.08, components: [{ name: 'Low-Fat Cottage Cheese', baseGrams: 150, proteinPer100: 11, carbsPer100: 3.4, fatPer100: 4.3 }], garnish: ['Pineapple chunks (60g)', 'Sprinkle of cinnamon'], style: 'Slow-digesting casein snack' },
  { label: 'Trail Mix', icon: 'snack', caloriePct: 0.08, proteinPct: 0.12, carbsPct: 0.08, fatPct: 0.12, components: [{ name: 'Almonds', baseGrams: 15, proteinPer100: 21, carbsPer100: 22, fatPer100: 49 }, { name: 'Walnuts', baseGrams: 10, proteinPer100: 15, carbsPer100: 14, fatPer100: 65 }], garnish: ['Dried cranberries (15g)', 'Pumpkin seeds (10g)'], style: 'A crunchy energy-dense trail mix' },
  { label: 'Greek Yogurt & Seeds', icon: 'snack', caloriePct: 0.09, proteinPct: 0.16, carbsPct: 0.06, fatPct: 0.08, components: [{ name: 'Greek Yogurt', baseGrams: 120, proteinPer100: 10, carbsPer100: 6, fatPer100: 0.7 }, { name: 'Pumpkin Seeds', baseGrams: 10, proteinPer100: 30, carbsPer100: 5, fatPer100: 49 }], garnish: ['Sliced kiwi (50g)', 'Drizzle of honey (5g)'], style: 'Creamy yogurt with crunchy seeds' },
  { label: 'Hummus & Veggies', icon: 'snack', caloriePct: 0.07, proteinPct: 0.10, carbsPct: 0.08, fatPct: 0.08, components: [{ name: 'Hummus', baseGrams: 50, proteinPer100: 8, carbsPer100: 12, fatPer100: 15 }], garnish: ['Carrot sticks (80g)', 'Celery sticks (60g)', 'Cucumber slices (60g)'], style: 'A fiber-rich savory snack plate' },
  { label: 'Hard-Boiled Eggs', icon: 'snack', caloriePct: 0.08, proteinPct: 0.18, carbsPct: 0.02, fatPct: 0.10, components: [{ name: 'Whole Eggs (hard-boiled)', baseGrams: 100, proteinPer100: 13, carbsPer100: 1.1, fatPer100: 11 }], garnish: ['Cherry tomatoes (60g)', 'Pinch of sea salt & paprika'], style: 'A portable high-protein snack' },
  { label: 'Edamame Bowl', icon: 'snack', caloriePct: 0.07, proteinPct: 0.14, carbsPct: 0.06, fatPct: 0.06, components: [{ name: 'Shelled Edamame', baseGrams: 80, proteinPer100: 11, carbsPer100: 9, fatPer100: 5 }], garnish: ['Squeeze of lemon', 'Flaky sea salt'], style: 'A complete plant-protein snack' },
  { label: 'Tuna Rice Cakes', icon: 'snack', caloriePct: 0.08, proteinPct: 0.16, carbsPct: 0.08, fatPct: 0.04, components: [{ name: 'Canned Tuna (in water)', baseGrams: 60, proteinPer100: 26, carbsPer100: 0, fatPer100: 1 }, { name: 'Brown Rice Cakes', baseGrams: 20, proteinPer100: 8, carbsPer100: 72, fatPer100: 5 }], garnish: ['Thin avocado slices (30g)', 'Sesame seeds'], style: 'Light crunchy tuna bites' },
  { label: 'Protein Energy Balls', icon: 'snack', caloriePct: 0.09, proteinPct: 0.14, carbsPct: 0.10, fatPct: 0.10, components: [{ name: 'Oat Flour', baseGrams: 20, proteinPer100: 13, carbsPer100: 66, fatPer100: 7 }, { name: 'Peanut Butter', baseGrams: 15, proteinPer100: 25, carbsPer100: 20, fatPer100: 50 }], garnish: ['Whey protein (10g)', 'Dark chocolate chips (5g)', 'Honey (5g)'], style: 'No-bake protein-packed bites' },
  { label: 'Apple & Almond Butter', icon: 'snack', caloriePct: 0.08, proteinPct: 0.10, carbsPct: 0.10, fatPct: 0.10, components: [{ name: 'Apple', baseGrams: 150, proteinPer100: 0.3, carbsPer100: 14, fatPer100: 0.2 }, { name: 'Almond Butter', baseGrams: 15, proteinPer100: 21, carbsPer100: 19, fatPer100: 50 }], garnish: ['Sprinkle of cinnamon'], style: 'Classic fiber + healthy fat combo' },
  { label: 'Beef Jerky & Crackers', icon: 'snack', caloriePct: 0.08, proteinPct: 0.18, carbsPct: 0.06, fatPct: 0.04, components: [{ name: 'Lean Beef Jerky', baseGrams: 30, proteinPer100: 33, carbsPer100: 11, fatPer100: 7 }], garnish: ['Whole-grain crackers (20g)', 'Mustard dip (10g)'], style: 'A portable high-protein savory snack' },
  { label: 'Roasted Chickpeas', icon: 'snack', caloriePct: 0.07, proteinPct: 0.12, carbsPct: 0.10, fatPct: 0.04, components: [{ name: 'Roasted Chickpeas', baseGrams: 50, proteinPer100: 19, carbsPer100: 48, fatPer100: 6 }], garnish: ['Paprika & cumin seasoning', 'Sea salt'], style: 'Crunchy plant-protein snack' },
];

const LUNCH_TEMPLATES: MealTemplate[] = [
  { label: 'Grilled Salmon & Quinoa Bowl', icon: 'meal', caloriePct: 0.30, proteinPct: 0.35, carbsPct: 0.32, fatPct: 0.32, components: [{ name: 'Grilled Salmon Fillet', baseGrams: 150, proteinPer100: 22, carbsPer100: 0, fatPer100: 12 }, { name: 'Cooked Quinoa', baseGrams: 130, proteinPer100: 4.4, carbsPer100: 21, fatPer100: 1.9 }, { name: 'Roasted Vegetables', baseGrams: 150, proteinPer100: 2.5, carbsPer100: 7, fatPer100: 0.5 }], garnish: ['Olive oil drizzle (10ml)', 'Fresh lemon squeeze'], style: 'Omega-3 rich power bowl with complete protein' },
  { label: 'Chicken Caesar Salad', icon: 'meal', caloriePct: 0.28, proteinPct: 0.38, carbsPct: 0.18, fatPct: 0.28, components: [{ name: 'Grilled Chicken Breast', baseGrams: 160, proteinPer100: 31, carbsPer100: 0, fatPer100: 3.6 }, { name: 'Romaine Lettuce', baseGrams: 120, proteinPer100: 1.2, carbsPer100: 2, fatPer100: 0.3 }], garnish: ['Parmesan shavings (15g)', 'Light Caesar dressing (20ml)', 'Whole-grain croutons (20g)'], style: 'A classic high-protein salad' },
  { label: 'Turkey & Sweet Potato Plate', icon: 'meal', caloriePct: 0.30, proteinPct: 0.34, carbsPct: 0.30, fatPct: 0.22, components: [{ name: 'Roasted Turkey Breast', baseGrams: 140, proteinPer100: 29, carbsPer100: 0, fatPer100: 1 }, { name: 'Baked Sweet Potato', baseGrams: 150, proteinPer100: 1.6, carbsPer100: 20, fatPer100: 0.1 }, { name: 'Steamed Broccoli', baseGrams: 120, proteinPer100: 2.8, carbsPer100: 7, fatPer100: 0.4 }], garnish: ['Olive oil (10ml)', 'Fresh herbs'], style: 'Lean protein with complex carbs' },
  { label: 'Tuna Poke Bowl', icon: 'meal', caloriePct: 0.29, proteinPct: 0.36, carbsPct: 0.30, fatPct: 0.20, components: [{ name: 'Sushi-Grade Tuna', baseGrams: 120, proteinPer100: 29, carbsPer100: 0, fatPer100: 1 }, { name: 'Sushi Rice', baseGrams: 120, proteinPer100: 2.7, carbsPer100: 28, fatPer100: 0.3 }], garnish: ['Edamame (40g)', 'Avocado slices (50g)', 'Soy sauce (10ml)', 'Sesame seeds', 'Nori strips'], style: 'Fresh Japanese-inspired protein bowl' },
  { label: 'Lean Beef Stir-Fry', icon: 'meal', caloriePct: 0.30, proteinPct: 0.36, carbsPct: 0.28, fatPct: 0.24, components: [{ name: 'Lean Beef Sirloin Strips', baseGrams: 130, proteinPer100: 26, carbsPer100: 0, fatPer100: 6 }, { name: 'Brown Rice', baseGrams: 130, proteinPer100: 2.7, carbsPer100: 23, fatPer100: 0.9 }], garnish: ['Bell pepper strips (80g)', 'Snap peas (60g)', 'Low-sodium soy sauce (15ml)', 'Ginger & garlic'], style: 'An iron-rich Asian-inspired stir-fry' },
  { label: 'Mediterranean Chicken Wrap', icon: 'meal', caloriePct: 0.29, proteinPct: 0.32, carbsPct: 0.30, fatPct: 0.26, components: [{ name: 'Grilled Chicken Breast', baseGrams: 130, proteinPer100: 31, carbsPer100: 0, fatPer100: 3.6 }, { name: 'Whole-Wheat Wrap', baseGrams: 65, proteinPer100: 10, carbsPer100: 44, fatPer100: 6 }], garnish: ['Hummus (30g)', 'Cucumber & tomato mix (80g)', 'Feta crumbles (15g)', 'Fresh mint'], style: 'A fresh wrap with Mediterranean flavors' },
  { label: 'Shrimp & Veggie Pasta', icon: 'meal', caloriePct: 0.30, proteinPct: 0.34, carbsPct: 0.34, fatPct: 0.22, components: [{ name: 'Grilled Shrimp', baseGrams: 130, proteinPer100: 24, carbsPer100: 0.2, fatPer100: 0.3 }, { name: 'Whole-Wheat Pasta', baseGrams: 120, proteinPer100: 5, carbsPer100: 25, fatPer100: 1.1 }], garnish: ['Cherry tomatoes (60g)', 'Spinach (40g)', 'Olive oil (10ml)', 'Garlic & basil'], style: 'Light seafood pasta with veggies' },
  { label: 'Lentil & Vegetable Soup Plate', icon: 'meal', caloriePct: 0.28, proteinPct: 0.28, carbsPct: 0.35, fatPct: 0.18, components: [{ name: 'Cooked Green Lentils', baseGrams: 150, proteinPer100: 9, carbsPer100: 20, fatPer100: 0.4 }, { name: 'Mixed Root Vegetables', baseGrams: 120, proteinPer100: 1.5, carbsPer100: 12, fatPer100: 0.2 }], garnish: ['Olive oil (10ml)', 'Fresh parsley', 'Whole-grain bread roll (40g)'], style: 'A hearty plant-based protein bowl' },
  { label: 'Grilled Lamb Chops Plate', icon: 'meal', caloriePct: 0.31, proteinPct: 0.36, carbsPct: 0.24, fatPct: 0.30, components: [{ name: 'Grilled Lamb Loin Chops', baseGrams: 120, proteinPer100: 25, carbsPer100: 0, fatPer100: 10 }, { name: 'Couscous', baseGrams: 100, proteinPer100: 3.8, carbsPer100: 22, fatPer100: 0.2 }], garnish: ['Roasted eggplant (80g)', 'Tzatziki (20g)', 'Fresh mint & lemon'], style: 'Mediterranean-style lean red meat plate' },
  { label: 'Black Bean Burrito Bowl', icon: 'meal', caloriePct: 0.29, proteinPct: 0.30, carbsPct: 0.35, fatPct: 0.22, components: [{ name: 'Black Beans', baseGrams: 120, proteinPer100: 8.9, carbsPer100: 17, fatPer100: 0.5 }, { name: 'Brown Rice', baseGrams: 120, proteinPer100: 2.7, carbsPer100: 23, fatPer100: 0.9 }], garnish: ['Grilled chicken (80g)', 'Corn salsa (40g)', 'Avocado (40g)', 'Lime squeeze'], style: 'A fiber-rich Mexican-inspired bowl' },
  { label: 'Cod & Roasted Potato Plate', icon: 'meal', caloriePct: 0.29, proteinPct: 0.35, carbsPct: 0.30, fatPct: 0.18, components: [{ name: 'Baked Cod Fillet', baseGrams: 150, proteinPer100: 18, carbsPer100: 0, fatPer100: 0.7 }, { name: 'Roasted Baby Potatoes', baseGrams: 130, proteinPer100: 2, carbsPer100: 17, fatPer100: 0.1 }], garnish: ['Asparagus spears (80g)', 'Olive oil (10ml)', 'Lemon-herb sauce (15g)'], style: 'A clean lean fish and potato plate' },
  { label: 'Chicken & Veggie Curry Bowl', icon: 'meal', caloriePct: 0.30, proteinPct: 0.34, carbsPct: 0.32, fatPct: 0.24, components: [{ name: 'Diced Chicken Breast', baseGrams: 140, proteinPer100: 31, carbsPer100: 0, fatPer100: 3.6 }, { name: 'Basmati Rice', baseGrams: 120, proteinPer100: 2.7, carbsPer100: 28, fatPer100: 0.3 }], garnish: ['Light coconut milk (40ml)', 'Cauliflower & spinach (100g)', 'Curry spices', 'Fresh cilantro'], style: 'A warming spiced curry with lean protein' },
];

const SNACK_PM_TEMPLATES: MealTemplate[] = [
  { label: 'Greek Yogurt & Walnuts', icon: 'snack', caloriePct: 0.08, proteinPct: 0.12, carbsPct: 0.06, fatPct: 0.12, components: [{ name: 'Greek Yogurt', baseGrams: 150, proteinPer100: 10, carbsPer100: 6, fatPer100: 0.7 }, { name: 'Walnuts', baseGrams: 12, proteinPer100: 15, carbsPer100: 14, fatPer100: 65 }], garnish: ['Fresh raspberries (50g)'], style: 'Creamy omega-3 rich afternoon snack' },
  { label: 'Protein Bar & Green Tea', icon: 'snack', caloriePct: 0.08, proteinPct: 0.16, carbsPct: 0.08, fatPct: 0.06, components: [{ name: 'Protein Bar (30g protein)', baseGrams: 60, proteinPer100: 50, carbsPer100: 25, fatPer100: 12 }], garnish: ['Hot green tea (250ml)'], style: 'A convenient afternoon protein boost' },
  { label: 'Apple & Peanut Butter', icon: 'snack', caloriePct: 0.08, proteinPct: 0.10, carbsPct: 0.10, fatPct: 0.10, components: [{ name: 'Apple', baseGrams: 150, proteinPer100: 0.3, carbsPer100: 14, fatPer100: 0.2 }, { name: 'Peanut Butter', baseGrams: 15, proteinPer100: 25, carbsPer100: 20, fatPer100: 50 }], garnish: ['Cinnamon dust'], style: 'Fiber + healthy fat afternoon pick-me-up' },
  { label: 'Tuna Salad Sticks', icon: 'snack', caloriePct: 0.07, proteinPct: 0.16, carbsPct: 0.04, fatPct: 0.06, components: [{ name: 'Canned Tuna (in water)', baseGrams: 60, proteinPer100: 26, carbsPer100: 0, fatPer100: 1 }], garnish: ['Celery sticks (80g)', 'Light mayo (10g)', 'Black pepper'], style: 'A lean omega-3 snack' },
  { label: 'Dark Chocolate & Almonds', icon: 'snack', caloriePct: 0.08, proteinPct: 0.08, carbsPct: 0.08, fatPct: 0.12, components: [{ name: 'Dark Chocolate (85%)', baseGrams: 15, proteinPer100: 10, carbsPer100: 30, fatPer100: 42 }, { name: 'Almonds', baseGrams: 12, proteinPer100: 21, carbsPer100: 22, fatPer100: 49 }], garnish: [], style: 'Antioxidant-rich indulgent snack' },
  { label: 'Cottage Cheese & Pineapple', icon: 'snack', caloriePct: 0.07, proteinPct: 0.14, carbsPct: 0.08, fatPct: 0.04, components: [{ name: 'Low-Fat Cottage Cheese', baseGrams: 150, proteinPer100: 11, carbsPer100: 3.4, fatPer100: 4.3 }], garnish: ['Pineapple chunks (60g)', 'Sprinkle of black pepper'], style: 'Sweet and savory protein snack' },
  { label: 'Hummus & Bell Pepper', icon: 'snack', caloriePct: 0.07, proteinPct: 0.08, carbsPct: 0.08, fatPct: 0.08, components: [{ name: 'Hummus', baseGrams: 40, proteinPer100: 8, carbsPer100: 12, fatPer100: 15 }], garnish: ['Red bell pepper strips (100g)', 'Cucumber slices (60g)'], style: 'A colorful veggie and dip snack' },
  { label: 'Casein Shake', icon: 'snack', caloriePct: 0.08, proteinPct: 0.18, carbsPct: 0.04, fatPct: 0.04, components: [{ name: 'Casein Protein Powder', baseGrams: 30, proteinPer100: 80, carbsPer100: 8, fatPer100: 3 }], garnish: ['250ml water', 'Ice & blend'], style: 'Slow-digesting evening protein shake' },
  { label: 'Pumpkin Seed & Cranberry Mix', icon: 'snack', caloriePct: 0.07, proteinPct: 0.10, carbsPct: 0.08, fatPct: 0.10, components: [{ name: 'Pumpkin Seeds', baseGrams: 15, proteinPer100: 30, carbsPer100: 5, fatPer100: 49 }, { name: 'Dried Cranberries', baseGrams: 15, proteinPer100: 0.1, carbsPer100: 82, fatPer100: 1.4 }], garnish: ['Sunflower seeds (10g)'], style: 'A mineral-rich crunchy snack' },
  { label: 'Turkey Jerky & Cheese', icon: 'snack', caloriePct: 0.07, proteinPct: 0.16, carbsPct: 0.04, fatPct: 0.08, components: [{ name: 'Turkey Jerky', baseGrams: 25, proteinPer100: 33, carbsPer100: 8, fatPer100: 3 }, { name: 'Light Cheese Slice', baseGrams: 20, proteinPer100: 20, carbsPer100: 3, fatPer100: 25 }], garnish: [], style: 'A portable high-protein combo' },
  { label: 'Edamame & Seaweed', icon: 'snack', caloriePct: 0.06, proteinPct: 0.12, carbsPct: 0.06, fatPct: 0.04, components: [{ name: 'Shelled Edamame', baseGrams: 70, proteinPer100: 11, carbsPer100: 9, fatPer100: 5 }], garnish: ['Roasted seaweed sheets (5g)', 'Sesame seeds'], style: 'An iodine-rich Asian snack' },
  { label: 'Rice Cakes & Avocado', icon: 'snack', caloriePct: 0.07, proteinPct: 0.06, carbsPct: 0.08, fatPct: 0.08, components: [{ name: 'Brown Rice Cakes', baseGrams: 20, proteinPer100: 8, carbsPer100: 72, fatPer100: 5 }, { name: 'Avocado', baseGrams: 40, proteinPer100: 2, carbsPer100: 9, fatPer100: 15 }], garnish: ['Everything bagel seasoning', 'Lime squeeze'], style: 'Light crunchy toast with healthy fats' },
];

const DINNER_TEMPLATES: MealTemplate[] = [
  { label: 'Grilled Chicken & Sweet Potato', icon: 'meal', caloriePct: 0.28, proteinPct: 0.28, carbsPct: 0.28, fatPct: 0.22, components: [{ name: 'Grilled Chicken Breast', baseGrams: 140, proteinPer100: 31, carbsPer100: 0, fatPer100: 3.6 }, { name: 'Baked Sweet Potato', baseGrams: 130, proteinPer100: 1.6, carbsPer100: 20, fatPer100: 0.1 }], garnish: ['Steamed green beans (100g)', 'Olive oil (8ml)', 'Herb seasoning'], style: 'A clean high-protein dinner' },
  { label: 'Baked Salmon & Asparagus', icon: 'meal', caloriePct: 0.28, proteinPct: 0.26, carbsPct: 0.20, fatPct: 0.30, components: [{ name: 'Baked Salmon Fillet', baseGrams: 130, proteinPer100: 22, carbsPer100: 0, fatPer100: 12 }, { name: 'Asparagus Spears', baseGrams: 120, proteinPer100: 2.2, carbsPer100: 3.9, fatPer100: 0.1 }], garnish: ['Lemon-herb butter (10g)', 'Cherry tomatoes (60g)'], style: 'Omega-3 rich elegant dinner' },
  { label: 'Turkey Meatball Pasta', icon: 'meal', caloriePct: 0.28, proteinPct: 0.30, carbsPct: 0.30, fatPct: 0.20, components: [{ name: 'Lean Turkey Meatballs', baseGrams: 120, proteinPer100: 22, carbsPer100: 5, fatPer100: 8 }, { name: 'Whole-Wheat Penne', baseGrams: 100, proteinPer100: 5, carbsPer100: 25, fatPer100: 1.1 }], garnish: ['Marinara sauce (80g)', 'Parmesan (10g)', 'Fresh basil'], style: 'Comfort food with lean protein' },
  { label: 'Cod with Roasted Vegetables', icon: 'meal', caloriePct: 0.26, proteinPct: 0.30, carbsPct: 0.24, fatPct: 0.18, components: [{ name: 'Baked Cod Fillet', baseGrams: 150, proteinPer100: 18, carbsPer100: 0, fatPer100: 0.7 }, { name: 'Roasted Mediterranean Vegetables', baseGrams: 180, proteinPer100: 2, carbsPer100: 6, fatPer100: 0.3 }], garnish: ['Olive oil (10ml)', 'Fresh lemon', 'Herb crust'], style: 'A light white fish dinner' },
  { label: 'Beef & Broccoli Stir-Fry', icon: 'meal', caloriePct: 0.28, proteinPct: 0.32, carbsPct: 0.26, fatPct: 0.24, components: [{ name: 'Lean Beef Strips', baseGrams: 120, proteinPer100: 26, carbsPer100: 0, fatPer100: 6 }, { name: 'Steamed Jasmine Rice', baseGrams: 120, proteinPer100: 2.7, carbsPer100: 28, fatPer100: 0.3 }], garnish: ['Broccoli florets (100g)', 'Low-sodium soy sauce (10ml)', 'Ginger & garlic'], style: 'A classic iron-rich stir-fry' },
  { label: 'Grilled Pork Tenderloin', icon: 'meal', caloriePct: 0.27, proteinPct: 0.32, carbsPct: 0.24, fatPct: 0.20, components: [{ name: 'Grilled Pork Tenderloin', baseGrams: 130, proteinPer100: 26, carbsPer100: 0, fatPer100: 3.5 }, { name: 'Mashed Cauliflower', baseGrams: 150, proteinPer100: 2, carbsPer100: 5, fatPer100: 0.3 }], garnish: ['Roasted Brussels sprouts (80g)', 'Apple cider glaze (10ml)'], style: 'A lean pork dinner with low-carb mash' },
  { label: 'Chicken Tikka Bowl', icon: 'meal', caloriePct: 0.28, proteinPct: 0.32, carbsPct: 0.30, fatPct: 0.22, components: [{ name: 'Tandoori Chicken', baseGrams: 130, proteinPer100: 28, carbsPer100: 3, fatPer100: 5 }, { name: 'Basmati Rice', baseGrams: 110, proteinPer100: 2.7, carbsPer100: 28, fatPer100: 0.3 }], garnish: ['Raita (30g)', 'Sautéed spinach (60g)', 'Fresh cilantro & lime'], style: 'Aromatic Indian-inspired dinner' },
  { label: 'Shrimp Tacos', icon: 'meal', caloriePct: 0.27, proteinPct: 0.30, carbsPct: 0.28, fatPct: 0.22, components: [{ name: 'Grilled Shrimp', baseGrams: 120, proteinPer100: 24, carbsPer100: 0.2, fatPer100: 0.3 }, { name: 'Corn Tortillas (2)', baseGrams: 50, proteinPer100: 6, carbsPer100: 44, fatPer100: 3 }], garnish: ['Cabbage slaw (60g)', 'Avocado crema (20g)', 'Fresh lime & cilantro'], style: 'Light seafood tacos with fresh toppings' },
  { label: 'Lentil Shepherd\'s Pie', icon: 'meal', caloriePct: 0.28, proteinPct: 0.26, carbsPct: 0.32, fatPct: 0.20, components: [{ name: 'Cooked Green Lentils', baseGrams: 140, proteinPer100: 9, carbsPer100: 20, fatPer100: 0.4 }, { name: 'Mashed Sweet Potato Topping', baseGrams: 120, proteinPer100: 1.6, carbsPer100: 20, fatPer100: 0.1 }], garnish: ['Diced carrots & peas (80g)', 'Tomato paste (15g)', 'Thyme & rosemary'], style: 'A hearty plant-based comfort dinner' },
  { label: 'Grilled Lamb Kebabs', icon: 'meal', caloriePct: 0.28, proteinPct: 0.30, carbsPct: 0.26, fatPct: 0.26, components: [{ name: 'Grilled Lamb Cubes', baseGrams: 110, proteinPer100: 25, carbsPer100: 0, fatPer100: 10 }, { name: 'Cooked Bulgur Wheat', baseGrams: 100, proteinPer100: 3.1, carbsPer100: 19, fatPer100: 0.2 }], garnish: ['Grilled peppers & onions (80g)', 'Tzatziki (25g)', 'Fresh mint'], style: 'Middle Eastern-style kebab plate' },
  { label: 'Stuffed Bell Peppers', icon: 'meal', caloriePct: 0.27, proteinPct: 0.30, carbsPct: 0.28, fatPct: 0.22, components: [{ name: 'Ground Turkey', baseGrams: 100, proteinPer100: 21, carbsPer100: 0, fatPer100: 8 }, { name: 'Brown Rice Stuffing', baseGrams: 80, proteinPer100: 2.7, carbsPer100: 23, fatPer100: 0.9 }], garnish: ['Large bell peppers (2 halves)', 'Tomato sauce (40g)', 'Mozzarella (15g)', 'Italian herbs'], style: 'Colorful protein-packed stuffed peppers' },
  { label: 'Pan-Seared Duck Breast', icon: 'meal', caloriePct: 0.29, proteinPct: 0.30, carbsPct: 0.24, fatPct: 0.28, components: [{ name: 'Duck Breast (skinless)', baseGrams: 110, proteinPer100: 23, carbsPer100: 0, fatPer100: 6 }, { name: 'Roasted Baby Potatoes', baseGrams: 100, proteinPer100: 2, carbsPer100: 17, fatPer100: 0.1 }], garnish: ['Sautéed kale (80g)', 'Balsamic reduction (15ml)', 'Fresh thyme'], style: 'An elegant lean poultry dinner' },
];

const EVENING_SNACK_TEMPLATES: MealTemplate[] = [
  { label: 'Cottage Cheese & Cinnamon', icon: 'snack', caloriePct: 0.06, proteinPct: 0.06, carbsPct: 0.04, fatPct: 0.06, components: [{ name: 'Low-Fat Cottage Cheese', baseGrams: 125, proteinPer100: 11, carbsPer100: 3.4, fatPer100: 4.3 }], garnish: ['Sprinkle of cinnamon', 'Few walnut halves (8g)'], style: 'Slow-digesting casein before bed' },
  { label: 'Casein Night Shake', icon: 'snack', caloriePct: 0.06, proteinPct: 0.08, carbsPct: 0.04, fatPct: 0.04, components: [{ name: 'Casein Protein', baseGrams: 25, proteinPer100: 80, carbsPer100: 8, fatPer100: 3 }], garnish: ['200ml unsweetened almond milk', 'Ice & blend until thick'], style: 'Overnight muscle recovery shake' },
  { label: 'Almonds & Herbal Tea', icon: 'snack', caloriePct: 0.06, proteinPct: 0.04, carbsPct: 0.03, fatPct: 0.08, components: [{ name: 'Almonds', baseGrams: 15, proteinPer100: 21, carbsPer100: 22, fatPer100: 49 }], garnish: ['Chamomile tea (250ml)'], style: 'A calming magnesium-rich evening snack' },
  { label: 'Warm Milk & Walnuts', icon: 'snack', caloriePct: 0.05, proteinPct: 0.04, carbsPct: 0.04, fatPct: 0.06, components: [{ name: 'Warm Skim Milk', baseGrams: 200, proteinPer100: 3.4, carbsPer100: 5, fatPer100: 0.1 }], garnish: ['Walnut halves (10g)', 'Pinch of nutmeg'], style: 'A soothing tryptophan-rich bedtime drink' },
  { label: 'Kiwi & Yogurt', icon: 'snack', caloriePct: 0.05, proteinPct: 0.05, carbsPct: 0.06, fatPct: 0.03, components: [{ name: 'Greek Yogurt', baseGrams: 100, proteinPer100: 10, carbsPer100: 6, fatPer100: 0.7 }], garnish: ['Kiwi fruit (80g)', 'Drizzle of honey (5g)'], style: 'A light vitamin-C rich evening snack' },
  { label: 'Turkey Roll-Ups', icon: 'snack', caloriePct: 0.05, proteinPct: 0.06, carbsPct: 0.02, fatPct: 0.04, components: [{ name: 'Sliced Turkey Breast', baseGrams: 40, proteinPer100: 29, carbsPer100: 0, fatPer100: 1 }], garnish: ['Mustard (5g)', 'Cucumber slices (40g)'], style: 'A zero-carb lean protein bite' },
  { label: 'Cherry & Almond Bowl', icon: 'snack', caloriePct: 0.05, proteinPct: 0.04, carbsPct: 0.06, fatPct: 0.05, components: [{ name: 'Fresh Cherries', baseGrams: 80, proteinPer100: 1.1, carbsPer100: 16, fatPer100: 0.2 }, { name: 'Almonds', baseGrams: 8, proteinPer100: 21, carbsPer100: 22, fatPer100: 49 }], garnish: [], style: 'Tart cherries aid sleep quality' },
  { label: 'Pumpkin Seeds & Dark Chocolate', icon: 'snack', caloriePct: 0.06, proteinPct: 0.05, carbsPct: 0.04, fatPct: 0.08, components: [{ name: 'Pumpkin Seeds', baseGrams: 10, proteinPer100: 30, carbsPer100: 5, fatPer100: 49 }, { name: 'Dark Chocolate (85%)', baseGrams: 10, proteinPer100: 10, carbsPer100: 30, fatPer100: 42 }], garnish: [], style: 'Magnesium-rich evening treat' },
  { label: 'Cucumber & Hummus Bites', icon: 'snack', caloriePct: 0.04, proteinPct: 0.04, carbsPct: 0.04, fatPct: 0.04, components: [{ name: 'Hummus', baseGrams: 25, proteinPer100: 8, carbsPer100: 12, fatPer100: 15 }], garnish: ['Thick cucumber rounds (80g)', 'Paprika dust'], style: 'A light crunchy pre-bed snack' },
  { label: 'Herbal Tea & Rice Cake', icon: 'snack', caloriePct: 0.04, proteinPct: 0.02, carbsPct: 0.05, fatPct: 0.02, components: [{ name: 'Brown Rice Cake', baseGrams: 10, proteinPer100: 8, carbsPer100: 72, fatPer100: 5 }], garnish: ['Peppermint tea (250ml)', 'Thin almond butter smear (5g)'], style: 'A minimal evening nibble' },
  { label: 'Pineapple & Cottage Cheese', icon: 'snack', caloriePct: 0.05, proteinPct: 0.06, carbsPct: 0.05, fatPct: 0.03, components: [{ name: 'Low-Fat Cottage Cheese', baseGrams: 80, proteinPer100: 11, carbsPer100: 3.4, fatPer100: 4.3 }], garnish: ['Pineapple chunks (50g)', 'Sprinkle of black pepper'], style: 'Bromelain + casein bedtime combo' },
  { label: 'Chia & Berry Small Bowl', icon: 'snack', caloriePct: 0.05, proteinPct: 0.04, carbsPct: 0.05, fatPct: 0.05, components: [{ name: 'Chia Seeds', baseGrams: 10, proteinPer100: 17, carbsPer100: 42, fatPer100: 31 }, { name: 'Mixed Berries', baseGrams: 50, proteinPer100: 1.4, carbsPer100: 12, fatPer100: 0.3 }], garnish: ['100ml almond milk', 'Stir and let sit 5 min'], style: 'Quick omega-3 chia pudding' },
];

const DAY_LABELS = [
  'High-Protein Power', 'Mediterranean Day', 'Lean & Clean', 'Omega-3 Focus',
  'Plant-Forward', 'Asian-Inspired', 'Comfort Classics', 'Iron-Rich Day',
  'Fiber Boost', 'Antioxidant Day', 'Omega-3 Power', 'Lean Builder',
  'Mediterranean II', 'Low-Fat Focus', 'Potassium Rich', 'Iso-Caloric',
  'High-Thermic', 'Rest & Recover', 'Vitamin D Day', 'Mineral Boost',
  'Complex Carb Day', 'Protein Peak', 'Lean & Green', 'Anti-Inflammatory',
  'Hydration Focus', 'Electrolyte Day', 'Metabolic Boost', 'Pre-Workout Fuel',
  'Recovery Day', 'Reset & Recharge',
];

function pickTemplate<T>(pool: T[], dayIndex: number, slotOffset: number): T {
  return pool[(dayIndex + slotOffset) % pool.length];
}

function scaleGrams(targetGrams: number, component: RecipeComponent, macroType: 'protein' | 'carbs' | 'fat'): number {
  if (component[macroType + 'Per100' as keyof RecipeComponent] === 0) return component.baseGrams;
  const targetPerComponent = targetGrams * 0.45;
  const needed = (targetPerComponent / (component[macroType + 'Per100' as keyof RecipeComponent] as number)) * 100;
  return Math.max(20, Math.round(Math.min(needed, component.baseGrams * 2.2) / 5) * 5);
}

function buildMeal(tmpl: MealTemplate, calories: number, macros: ReturnType<typeof calculateMacros>, dayIdx: number): import('../types').MealPlan {
  const kcal = (pct: number) => Math.round(calories * pct);
  const pg = (pct: number) => Math.round(macros.proteinGrams * pct);
  const cg = (pct: number) => Math.round(macros.carbsGrams * pct);
  const fg = (pct: number) => Math.round(macros.fatGrams * pct);

  const targetP = pg(tmpl.proteinPct);
  const targetC = cg(tmpl.carbsPct);
  const targetF = fg(tmpl.fatPct);

  const scaledItems = tmpl.components.map((comp) => {
    const bestMacro = targetP > targetC && targetP > targetF ? 'protein' : targetC > targetF ? 'carbs' : 'fat';
    const grams = scaleGrams(targetP * (comp.proteinPer100 > 20 ? 0.6 : 0.3), comp, bestMacro);
    return `${grams}g ${comp.name}`;
  });

  const garnishStr = tmpl.garnish.length > 0 ? `, ${tmpl.garnish.join(', ')}` : '';
  const allItems = [...scaledItems, ...tmpl.garnish];

  return {
    meal: tmpl.label,
    icon: tmpl.icon,
    calories: kcal(tmpl.caloriePct),
    protein: pg(tmpl.proteinPct),
    carbs: cg(tmpl.carbsPct),
    fat: fg(tmpl.fatPct),
    items: allItems,
    description: `${tmpl.style} — ${scaledItems.join(', ')}${garnishStr}. Approx. ${kcal(tmpl.caloriePct)} kcal, ${pg(tmpl.proteinPct)}g Protein, ${cg(tmpl.carbsPct)}g Carbs, ${fg(tmpl.fatPct)}g Fat.`,
  };
}

export const generateMealPlan = (calories: number, macros: ReturnType<typeof calculateMacros>) => {
  return buildDayMeals(0, calories, macros).meals;
};

export const generate30DayMealPlan = (calories: number, macros: ReturnType<typeof calculateMacros>): DailyMealPlan[] => {
  const plan: DailyMealPlan[] = [];
  for (let day = 0; day < 30; day++) {
    plan.push(buildDayMeals(day, calories, macros));
  }
  return plan;
};

function buildDayMeals(dayIndex: number, calories: number, macros: ReturnType<typeof calculateMacros>): DailyMealPlan {
  const breakfast = pickTemplate(BREAKFAST_TEMPLATES, dayIndex, 0);
  const snackAm = pickTemplate(SNACK_AM_TEMPLATES, dayIndex, 1);
  const lunch = pickTemplate(LUNCH_TEMPLATES, dayIndex, 2);
  const snackPm = pickTemplate(SNACK_PM_TEMPLATES, dayIndex, 3);
  const dinner = pickTemplate(DINNER_TEMPLATES, dayIndex, 4);
  const eveningSnack = pickTemplate(EVENING_SNACK_TEMPLATES, dayIndex, 5);

  return {
    day: dayIndex + 1,
    label: `Day ${dayIndex + 1}`,
    theme: DAY_LABELS[dayIndex % DAY_LABELS.length],
    meals: [
      buildMeal(breakfast, calories, macros, dayIndex),
      buildMeal(snackAm, calories, macros, dayIndex),
      buildMeal(lunch, calories, macros, dayIndex),
      buildMeal(snackPm, calories, macros, dayIndex),
      buildMeal(dinner, calories, macros, dayIndex),
      buildMeal(eveningSnack, calories, macros, dayIndex),
    ],
  };
}

export const generateWorkoutPlan = (goal: HealthGoal) => {
  if (goal === 'lose_weight') {
    return {
      duration: '45-60 min',
      days: [
        {
          day: 'Monday',
          focus: 'Upper Body Strength',
          exercises: [
            { name: 'Push-ups', sets: 3, reps: '12-15', rest: '60s' },
            { name: 'Dumbbell Rows', sets: 3, reps: '12', rest: '60s' },
            { name: 'Shoulder Press', sets: 3, reps: '12', rest: '60s' },
            { name: 'Bicep Curls', sets: 3, reps: '15', rest: '45s' },
            { name: 'Tricep Dips', sets: 3, reps: '12', rest: '45s' },
          ],
        },
        {
          day: 'Tuesday',
          focus: 'Cardio & Core',
          exercises: [
            { name: 'Brisk Walking/Jogging', sets: 1, reps: '30 min', rest: '-' },
            { name: 'Plank Hold', sets: 3, reps: '45s', rest: '30s' },
            { name: 'Bicycle Crunches', sets: 3, reps: '20', rest: '30s' },
            { name: 'Mountain Climbers', sets: 3, reps: '20', rest: '30s' },
          ],
        },
        {
          day: 'Wednesday',
          focus: 'Lower Body',
          exercises: [
            { name: 'Squats', sets: 4, reps: '15', rest: '60s' },
            { name: 'Lunges', sets: 3, reps: '12 each', rest: '60s' },
            { name: 'Glute Bridges', sets: 3, reps: '15', rest: '45s' },
            { name: 'Calf Raises', sets: 3, reps: '20', rest: '30s' },
          ],
        },
        {
          day: 'Thursday',
          focus: 'Active Recovery',
          exercises: [
            { name: 'Light Walking', sets: 1, reps: '20 min', rest: '-' },
            { name: 'Stretching Routine', sets: 1, reps: '15 min', rest: '-' },
          ],
        },
        {
          day: 'Friday',
          focus: 'Full Body HIIT',
          exercises: [
            { name: 'Jumping Jacks', sets: 3, reps: '30s', rest: '15s' },
            { name: 'Burpees', sets: 3, reps: '10', rest: '30s' },
            { name: 'High Knees', sets: 3, reps: '30s', rest: '15s' },
            { name: 'Squat Jumps', sets: 3, reps: '12', rest: '30s' },
            { name: 'Push-up to Plank', sets: 3, reps: '10', rest: '30s' },
          ],
        },
        {
          day: 'Saturday',
          focus: 'Flexibility & Core',
          exercises: [
            { name: 'Yoga Flow', sets: 1, reps: '30 min', rest: '-' },
            { name: 'Dead Bugs', sets: 3, reps: '15', rest: '30s' },
            { name: 'Bird Dogs', sets: 3, reps: '12 each', rest: '30s' },
          ],
        },
        {
          day: 'Sunday',
          focus: 'Rest Day',
          exercises: [
            { name: 'Light Walking (optional)', sets: 1, reps: '15-20 min', rest: '-' },
            { name: 'Foam Rolling', sets: 1, reps: '10 min', rest: '-' },
          ],
        },
      ],
    };
  }

  if (goal === 'gain_muscle') {
    return {
      duration: '60-75 min',
      days: [
        {
          day: 'Monday',
          focus: 'Chest & Triceps',
          exercises: [
            { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s' },
            { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '75s' },
            { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '60s' },
            { name: 'Tricep Pushdowns', sets: 3, reps: '10-12', rest: '60s' },
            { name: 'Overhead Tricep Extension', sets: 3, reps: '12', rest: '60s' },
          ],
        },
        {
          day: 'Tuesday',
          focus: 'Back & Biceps',
          exercises: [
            { name: 'Deadlifts', sets: 4, reps: '6-8', rest: '120s' },
            { name: 'Pull-ups/Lat Pulldowns', sets: 4, reps: '8-10', rest: '90s' },
            { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '75s' },
            { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60s' },
            { name: 'Hammer Curls', sets: 3, reps: '12', rest: '60s' },
          ],
        },
        {
          day: 'Wednesday',
          focus: 'Rest',
          exercises: [
            { name: 'Light stretching or walking', sets: 1, reps: '20 min', rest: '-' },
          ],
        },
        {
          day: 'Thursday',
          focus: 'Shoulders & Abs',
          exercises: [
            { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s' },
            { name: 'Lateral Raises', sets: 4, reps: '12-15', rest: '60s' },
            { name: 'Face Pulls', sets: 3, reps: '15', rest: '60s' },
            { name: 'Hanging Leg Raises', sets: 3, reps: '12-15', rest: '60s' },
            { name: 'Cable Crunches', sets: 3, reps: '15', rest: '45s' },
          ],
        },
        {
          day: 'Friday',
          focus: 'Legs',
          exercises: [
            { name: 'Barbell Squats', sets: 4, reps: '8-10', rest: '120s' },
            { name: 'Romanian Deadlifts', sets: 3, reps: '10-12', rest: '90s' },
            { name: 'Leg Press', sets: 3, reps: '12', rest: '75s' },
            { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '60s' },
            { name: 'Leg Curls', sets: 3, reps: '12', rest: '60s' },
          ],
        },
        {
          day: 'Saturday',
          focus: 'Arms & Weak Points',
          exercises: [
            { name: 'Preacher Curls', sets: 3, reps: '10-12', rest: '60s' },
            { name: 'Skull Crushers', sets: 3, reps: '10-12', rest: '60s' },
            { name: 'Concentration Curls', sets: 3, reps: '12', rest: '45s' },
            { name: 'Tricep Dips', sets: 3, reps: '12-15', rest: '60s' },
          ],
        },
        {
          day: 'Sunday',
          focus: 'Rest Day',
          exercises: [
            { name: 'Complete rest or light yoga', sets: 1, reps: '20 min', rest: '-' },
          ],
        },
      ],
    };
  }

  return {
    duration: '45-60 min',
    days: [
      {
        day: 'Monday',
        focus: 'Full Body',
        exercises: [
          { name: 'Squats', sets: 3, reps: '12', rest: '60s' },
          { name: 'Bench Press', sets: 3, reps: '12', rest: '60s' },
          { name: 'Bent-over Rows', sets: 3, reps: '12', rest: '60s' },
          { name: 'Plank', sets: 3, reps: '45s', rest: '30s' },
        ],
      },
      {
        day: 'Tuesday',
        focus: 'Cardio',
        exercises: [
          { name: 'Brisk Walking/Light Jogging', sets: 1, reps: '30 min', rest: '-' },
          { name: 'Stretching', sets: 1, reps: '10 min', rest: '-' },
        ],
      },
      {
        day: 'Wednesday',
        focus: 'Upper Body',
        exercises: [
          { name: 'Push-ups', sets: 3, reps: '12', rest: '60s' },
          { name: 'Shoulder Press', sets: 3, reps: '12', rest: '60s' },
          { name: 'Lat Pulldowns', sets: 3, reps: '12', rest: '60s' },
          { name: 'Bicep Curls', sets: 3, reps: '15', rest: '45s' },
        ],
      },
      {
        day: 'Thursday',
        focus: 'Rest',
        exercises: [{ name: 'Light stretching', sets: 1, reps: '15 min', rest: '-' }],
      },
      {
        day: 'Friday',
        focus: 'Lower Body',
        exercises: [
          { name: 'Lunges', sets: 3, reps: '12 each', rest: '60s' },
          { name: 'Leg Press', sets: 3, reps: '12', rest: '60s' },
          { name: 'Calf Raises', sets: 3, reps: '15', rest: '45s' },
          { name: 'Glute Bridges', sets: 3, reps: '15', rest: '45s' },
        ],
      },
      {
        day: 'Saturday',
        focus: 'Core & Flexibility',
        exercises: [
          { name: 'Bicycle Crunches', sets: 3, reps: '20', rest: '30s' },
          { name: 'Dead Bugs', sets: 3, reps: '15', rest: '30s' },
          { name: 'Yoga/Stretching', sets: 1, reps: '15 min', rest: '-' },
        ],
      },
      {
        day: 'Sunday',
        focus: 'Rest Day',
        exercises: [{ name: 'Complete rest', sets: 0, reps: '-', rest: '-' }],
      },
    ],
  };
};

export const calculateFullResults = (profile: UserProfile): CalorieResult => {
  const bmr = calculateBMR(profile);
  const tdee = calculateTDEE(bmr, profile.activityLevel);
  const targetCalories = getTargetCalories(tdee, profile.goal);
  const macros = calculateMacros(targetCalories, profile.goal, profile.weight);
  const mealPlan = generateMealPlan(targetCalories, macros);
  const fullMealPlan = generate30DayMealPlan(targetCalories, macros);
  const workoutPlan = generateWorkoutPlan(profile.goal);

  return { bmr, tdee, targetCalories, macros, mealPlan, fullMealPlan, workoutPlan };
};

export const interpretLabResults = (inputs: DiabetesInputs): LabResult[] => {
  const results: LabResult[] = [];

  // Fasting Blood Glucose (ADA Guidelines)
  let fbStatus: 'normal' | 'warning' | 'critical' = 'normal';
  let fbInterp = 'Normal fasting glucose level.';
  if (inputs.fastingGlucose >= 100 && inputs.fastingGlucose <= 125) {
    fbStatus = 'warning';
    fbInterp = 'Fasting glucose in the pre-diabetic range (ADA). Consider lifestyle modifications.';
  } else if (inputs.fastingGlucose >= 126) {
    fbStatus = 'critical';
    fbInterp = 'Fasting glucose in the diabetic range (ADA). Consult your physician immediately.';
  }

  results.push({
    parameter: 'Fasting Blood Glucose',
    value: inputs.fastingGlucose,
    unit: 'mg/dL',
    normalRange: '70-99 mg/dL',
    status: fbStatus,
    interpretation: fbInterp,
  });

  // HbA1c (ADA Guidelines)
  let hba1cStatus: 'normal' | 'warning' | 'critical' = 'normal';
  let hba1cInterp = 'Normal HbA1c level.';
  if (inputs.hba1c >= 5.7 && inputs.hba1c <= 6.4) {
    hba1cStatus = 'warning';
    hba1cInterp = 'HbA1c in pre-diabetic range (ADA: 5.7-6.4%). Lifestyle changes recommended.';
  } else if (inputs.hba1c >= 6.5) {
    hba1cStatus = 'critical';
    hba1cInterp = 'HbA1c in diabetic range (ADA: ≥6.5%). Medical consultation required.';
  }

  results.push({
    parameter: 'HbA1c',
    value: inputs.hba1c,
    unit: '%',
    normalRange: '< 5.7%',
    status: hba1cStatus,
    interpretation: hba1cInterp,
  });

  // Post-prandial Glucose
  let ppStatus: 'normal' | 'warning' | 'critical' = 'normal';
  let ppInterp = 'Normal post-prandial glucose.';
  if (inputs.postPrandialGlucose >= 140 && inputs.postPrandialGlucose <= 199) {
    ppStatus = 'warning';
    ppInterp = 'Elevated post-prandial glucose (ADA impaired range). Monitor carbohydrate intake.';
  } else if (inputs.postPrandialGlucose >= 200) {
    ppStatus = 'critical';
    ppInterp = 'Post-prandial glucose in diabetic range. Seek medical advice.';
  }

  results.push({
    parameter: 'Post-Prandial Glucose',
    value: inputs.postPrandialGlucose,
    unit: 'mg/dL',
    normalRange: '< 140 mg/dL',
    status: ppStatus,
    interpretation: ppInterp,
  });

  // Systolic Blood Pressure
  let sysStatus: 'normal' | 'warning' | 'critical' = 'normal';
  let sysInterp = 'Normal systolic blood pressure.';
  if (inputs.systolicBP >= 120 && inputs.systolicBP <= 139) {
    sysStatus = 'warning';
    sysInterp = 'Elevated / Stage 1 Hypertension (AHA). Reduce sodium, exercise regularly.';
  } else if (inputs.systolicBP >= 140) {
    sysStatus = 'critical';
    sysInterp = 'Stage 2 Hypertension (AHA). Medical management likely needed.';
  }

  results.push({
    parameter: 'Systolic BP',
    value: inputs.systolicBP,
    unit: 'mmHg',
    normalRange: '< 120 mmHg',
    status: sysStatus,
    interpretation: sysInterp,
  });

  // Diastolic Blood Pressure
  let diaStatus: 'normal' | 'warning' | 'critical' = 'normal';
  let diaInterp = 'Normal diastolic blood pressure.';
  if (inputs.diastolicBP >= 80 && inputs.diastolicBP <= 89) {
    diaStatus = 'warning';
    diaInterp = 'Stage 1 Hypertension (AHA). DASH diet recommended.';
  } else if (inputs.diastolicBP >= 90) {
    diaStatus = 'critical';
    diaInterp = 'Stage 2 Hypertension (AHA). Consult your physician.';
  }

  results.push({
    parameter: 'Diastolic BP',
    value: inputs.diastolicBP,
    unit: 'mmHg',
    normalRange: '< 80 mmHg',
    status: diaStatus,
    interpretation: diaInterp,
  });

  return results;
};

export const classifyBloodPressure = (systolic: number, diastolic: number): BPResult => {
  if (systolic < 120 && diastolic < 80) {
    return {
      category: 'Normal',
      systolicRange: '< 120',
      diastolicRange: '< 80',
      color: 'text-green-600',
      recommendations: [
        'Maintain a healthy lifestyle',
        'Continue regular physical activity',
        'Follow a balanced diet',
      ],
    };
  }
  if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
    return {
      category: 'Elevated',
      systolicRange: '120-129',
      diastolicRange: '< 80',
      color: 'text-yellow-600',
      recommendations: [
        'Adopt the DASH diet',
        'Reduce sodium intake to < 2,300mg/day',
        'Exercise 150 minutes/week',
        'Limit alcohol consumption',
      ],
    };
  }
  if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
    return {
      category: 'Stage 1 Hypertension',
      systolicRange: '130-139',
      diastolicRange: '80-89',
      color: 'text-orange-500',
      recommendations: [
        'DASH diet with emphasis on fruits/vegetables',
        'Limit sodium to < 1,500mg/day',
        'Regular aerobic exercise',
        'Consult physician for possible medication',
        'Monitor blood pressure regularly',
      ],
    };
  }
  if (systolic >= 140 || diastolic >= 90) {
    return {
      category: 'Stage 2 Hypertension',
      systolicRange: '≥ 140',
      diastolicRange: '≥ 90',
      color: 'text-red-600',
      recommendations: [
        'Seek immediate medical consultation',
        'DASH diet is strongly recommended',
        'Limit sodium to < 1,500mg/day',
        'Medication likely required',
        'Monitor BP daily',
        'Reduce stress levels',
      ],
    };
  }
  if (systolic > 180 || diastolic > 120) {
    return {
      category: 'Hypertensive Crisis',
      systolicRange: '> 180',
      diastolicRange: '> 120',
      color: 'text-red-700 font-bold',
      recommendations: [
        'SEEK EMERGENCY MEDICAL CARE IMMEDIATELY',
        'Do not wait—call emergency services',
        'This is a medical emergency',
      ],
    };
  }
  return {
    category: 'Normal',
    systolicRange: '< 120',
    diastolicRange: '< 80',
    color: 'text-green-600',
    recommendations: ['Maintain healthy lifestyle'],
  };
};
