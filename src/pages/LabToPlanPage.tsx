import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import Breadcrumbs from '../components/Breadcrumbs';
import { DaySelectorBar, PlanTabBar, MealCard, WorkoutCard, DayProgressHeader, StreakBar } from '../components/HealthPlanTemplate';
import { getMealLabel } from '../utils/mealLabels';
import { generateDiabetesPlan, generateHypertensionPlan, type DayPlan } from '../utils/healthPlans';
import { toDayPlans } from '../utils/mealBuilder';
import { type Cuisine } from '../utils/calculations_expanded';
import MealPlanModal from '../components/MealPlanModal';
import CuisineRegionCards from '../components/CuisineRegionCards';
import MealBuilder from '../components/MealBuilder';
import WorkoutBlueprintModal from '../components/WorkoutBlueprintModal';

/* ──────────────── Types ──────────────── */
type MealSlot = 'breakfast' | 'lunch' | 'dinner';
type HealthStatus = 'normal' | 'elevated' | 'high_stage1' | 'high_stage2' | 'crisis' | 'low';
type GlucoseStatus = 'normal' | 'prediabetes' | 'diabetes' | 'low';

interface MealOption {
  title: string;
  desc: string;
  items: string[];
  calories: number;
  gi: number;
  sodium: number;
  netCarbs: number;
}

interface ConditionMeal {
  meal: string;
  calories: number;
  items: string[];
  tips: string;
}

interface ConditionWorkout {
  exercise: string;
  sets: string;
  notes: string;
  precaution?: string;
}

interface ConditionData {
  mealPlan: ConditionMeal[];
  workout: ConditionWorkout[];
  guidelines: string[];
}

interface Evaluation {
  glucoseStatus: GlucoseStatus;
  glucoseLabel: string;
  glucoseColor: string;
  bpStatus: HealthStatus;
  bpLabel: string;
  bpColor: string;
  overallRisk: 'low' | 'moderate' | 'high';
  dietTags: string[];
  exerciseTags: string[];
  summary: string;
}

interface TrackingRow {
  label: string;
  unit: string;
  target: number;
  actual: number;
  safeRange: string;
}

interface ProgressEntry {
  id: string;
  date: string;
  fasting: number;
  postprandial: number;
  hba1c: number;
  systolic: number;
  diastolic: number;
  weight: number;
}

/* ──────────────── Helpers ──────────────── */
const STORAGE_KEY = 'healthcalc_progress';
const loadProgress = (): ProgressEntry[] => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
};
const saveProgress = (entries: ProgressEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

function calcBMR(weight: number, height: number, age: number, gender: string): number {
  if (gender === 'male') return 10 * weight + 6.25 * height - 5 * age + 5;
  return 10 * weight + 6.25 * height - 5 * age - 161;
}
function calcTDEE(bmr: number): number { return Math.round(bmr * 1.4); }
function bmi(weight: number, heightCm: number): number { return +(weight / ((heightCm / 100) ** 2)).toFixed(1); }

/* ──────────────── Condition Content ──────────────── */
const conditionContent: Record<string, ConditionData> = {
  diabetes: {
    mealPlan: [
      { meal: 'Breakfast', calories: 350, items: ['Steel-cut oatmeal (50g)', 'Chopped walnuts (15g)', 'Blueberries (80g)', 'Cinnamon sprinkle', 'Green tea'], tips: 'Low-GI base: oats provide soluble fiber to slow glucose absorption' },
      { meal: 'Morning Snack', calories: 120, items: ['Greek yogurt (100g)', 'Almonds (8 pieces)', 'Chia seeds (1 tsp)'], tips: 'Protein + healthy fat slows carb absorption' },
      { meal: 'Lunch', calories: 430, items: ['Grilled chicken breast (130g)', 'Quinoa (120g cooked)', 'Roasted non-starchy vegetables', 'Olive oil & lemon dressing (1 tbsp)'], tips: 'Balanced macros: lean protein, complex carbs, healthy fat' },
      { meal: 'Afternoon Snack', calories: 100, items: ['Apple slices (100g)', 'Peanut butter (1 tbsp)'], tips: 'Fruit paired with fat prevents glucose spikes' },
      { meal: 'Dinner', calories: 380, items: ['Baked salmon (120g)', 'Sweet potato (100g)', 'Steamed broccoli & green beans', 'Herbal tea'], tips: 'Omega-3 from salmon supports insulin sensitivity' },
    ],
    workout: [
      { exercise: 'Brisk Walking', sets: '30 min', notes: 'Post-meal walks lower blood sugar by 15-20%', precaution: 'Check blood sugar before exercise; carry fast-acting carbs' },
      { exercise: 'Resistance Bands (Full Body)', sets: '20 min', notes: 'Muscle contraction improves glucose uptake', precaution: 'Avoid heavy lifting if retinopathy present' },
      { exercise: 'Cycling (Moderate)', sets: '25 min', notes: 'Sustained cardio improves insulin sensitivity', precaution: 'Monitor feet for blisters; wear proper footwear' },
      { exercise: 'Yoga (Balancing Poses)', sets: '15 min', notes: 'Reduces cortisol, stabilizes blood sugar', precaution: 'Avoid inverted poses if uncontrolled hypertension' },
    ],
    guidelines: [
      'Follow the Glycemic Index: choose foods with GI < 55 for carbs',
      'Carb counting: aim for 30-45g carbs per meal, 15-20g per snack',
      'Blood glucose targets: fasting 80-130 mg/dL, post-meal < 180 mg/dL',
      'Eat meals at consistent times to prevent glucose fluctuations',
      'Pair carbs with protein or fat to reduce glycemic impact',
      'Limit added sugars, refined grains, and sugary beverages',
      'Monitor HbA1c every 3 months (target < 7%)',
      'Regular foot checks and annual eye exams',
    ],
  },
  hypertension: {
    mealPlan: [
      { meal: 'Breakfast', calories: 340, items: ['Oatmeal (50g) with flaxseeds', 'Sliced banana (80g)', 'Unsalted almonds (10g)', 'Low-fat milk (200ml)'], tips: 'DASH-aligned: high potassium, low sodium' },
      { meal: 'Morning Snack', calories: 110, items: ['Carrot sticks (100g)', 'Hummus (2 tbsp)', 'Whole-grain crackers (4)'], tips: 'Plant-based snacks rich in magnesium' },
      { meal: 'Lunch', calories: 440, items: ['Grilled chicken breast (120g)', 'Brown rice (150g cooked)', 'Steamed spinach & tomatoes', 'Olive oil (1 tbsp)'], tips: 'Sodium < 150mg per meal on DASH diet' },
      { meal: 'Afternoon Snack', calories: 100, items: ['Mixed berries (100g)', 'Pumpkin seeds (1 tbsp)'], tips: 'Berries are rich in anthocyanins for vascular health' },
      { meal: 'Dinner', calories: 370, items: ['Baked cod (120g)', 'Roasted sweet potato (100g)', 'Kale & beet salad', 'Herbal tea'], tips: 'Nitrate-rich beets support vasodilation' },
    ],
    workout: [
      { exercise: 'Brisk Walking / Jogging', sets: '30 min', notes: 'Aerobic exercise lowers BP by 5-8 mmHg', precaution: 'Stop if dizzy or lightheaded; monitor BP post-exercise' },
      { exercise: 'Swimming', sets: '25 min', notes: 'Full-body, joint-friendly, reduces arterial stiffness', precaution: 'Avoid cold water; warm pool preferred' },
      { exercise: 'Cycling (Moderate)', sets: '20 min', notes: 'Improves endothelial function', precaution: 'Avoid high resistance; keep RPE at 4-6/10' },
      { exercise: 'Yoga (Restorative Poses)', sets: '15 min', notes: 'Reduces sympathetic nervous system activity', precaution: 'Avoid breath-holding (Valsalva maneuver)' },
    ],
    guidelines: [
      'Follow the DASH diet: rich in fruits, vegetables, whole grains, lean protein',
      'Sodium restriction: aim for < 1,500 mg/day (ideal) or < 2,300 mg/day',
      'Increase potassium intake: bananas, potatoes, spinach, avocados',
      'Limit alcohol to 1 drink/day (women) or 2 drinks/day (men)',
      'Target blood pressure: < 130/80 mmHg for most adults',
      'Aerobic exercise 150 min/week minimum (30 min, 5 days/week)',
      'Maintain healthy weight: BMI 18.5-24.9',
      'Monitor BP at home regularly with validated cuff device',
    ],
  },
};

/* ──────────────── Shuffle Meal Database ──────────────── */
const mealDB: Record<MealSlot, MealOption[]> = {
  breakfast: [
    { title: 'Steel-Cut Oatmeal Bowl', desc: 'Low-GI oats with berries and walnuts', items: ['Steel-cut oats (50g)', 'Blueberries (80g)', 'Walnuts (15g)', 'Cinnamon', 'Almond milk (100ml)'], calories: 320, gi: 42, sodium: 45, netCarbs: 38 },
    { title: 'Veggie Egg Scramble', desc: 'High-protein, low-carb with vegetables', items: ['Eggs (2 whole + 1 white)', 'Spinach (40g)', 'Bell peppers (30g)', 'Feta (15g)', 'Whole-grain toast (1 slice)'], calories: 310, gi: 18, sodium: 380, netCarbs: 16 },
    { title: 'Greek Yogurt Parfait', desc: 'Probiotic-rich with seeds and fruit', items: ['Greek yogurt (150g)', 'Chia seeds (1 tbsp)', 'Strawberries (60g)', 'Almonds (10g)', 'Honey (1 tsp)'], calories: 280, gi: 33, sodium: 65, netCarbs: 28 },
    { title: 'Avocado Toast with Seeds', desc: 'Heart-healthy fats on whole grain', items: ['Whole-grain bread (2 slices)', 'Avocado (80g)', 'Hemp seeds (1 tbsp)', 'Cherry tomatoes (4)', 'Lemon juice'], calories: 340, gi: 38, sodium: 290, netCarbs: 26 },
    { title: 'Smoothie Bowl', desc: 'Nutrient-dense blended bowl', items: ['Banana (80g)', 'Spinach (30g)', 'Protein powder (20g)', 'Almond milk (150ml)', 'Pumpkin seeds (1 tbsp)'], calories: 290, gi: 40, sodium: 110, netCarbs: 32 },
    { title: 'Smoked Salmon Wrap', desc: 'Omega-3 rich with fresh herbs', items: ['Whole-wheat wrap (1)', 'Smoked salmon (60g)', 'Light cream cheese (1 tbsp)', 'Cucumber (40g)', 'Dill'], calories: 300, gi: 25, sodium: 480, netCarbs: 22 },
  ],
  lunch: [
    { title: 'Grilled Chicken Quinoa Bowl', desc: 'Lean protein with complete grain', items: ['Chicken breast (130g)', 'Quinoa (120g cooked)', 'Roasted zucchini (80g)', 'Cherry tomatoes (60g)', 'Olive oil (1 tbsp)'], calories: 440, gi: 35, sodium: 320, netCarbs: 34 },
    { title: 'Mediterranean Salmon Salad', desc: 'Omega-3 rich over mixed greens', items: ['Salmon fillet (120g)', 'Mixed greens (80g)', 'Feta (20g)', 'Olives (6)', 'Lemon-olive oil dressing'], calories: 420, gi: 12, sodium: 410, netCarbs: 8 },
    { title: 'Lentil Vegetable Soup', desc: 'High-fiber, plant-based soup', items: ['Red lentils (80g dry)', 'Carrots (60g)', 'Celery (40g)', 'Onion (40g)', 'Whole-grain bread (1 slice)'], calories: 380, gi: 30, sodium: 350, netCarbs: 42 },
    { title: 'Turkey & Avocado Lettuce Wraps', desc: 'Low-carb with lean protein', items: ['Turkey breast (120g)', 'Butter lettuce (4 leaves)', 'Avocado (60g)', 'Cucumber (50g)', 'Mustard (1 tsp)'], calories: 360, gi: 5, sodium: 390, netCarbs: 8 },
    { title: 'Chickpea Power Bowl', desc: 'Plant-based with roasted vegetables', items: ['Chickpeas (120g cooked)', 'Sweet potato (100g)', 'Kale (60g)', 'Tahini (1 tbsp)', 'Lemon dressing'], calories: 410, gi: 38, sodium: 280, netCarbs: 44 },
    { title: 'Tuna Poke Bowl', desc: 'Fresh tuna with brown rice', items: ['Ahi tuna (110g)', 'Brown rice (100g cooked)', 'Edamame (40g)', 'Avocado (40g)', 'Soy sauce (1 tsp)'], calories: 430, gi: 42, sodium: 520, netCarbs: 36 },
  ],
  dinner: [
    { title: 'Baked Salmon & Asparagus', desc: 'Omega-3 dinner with spring vegetables', items: ['Salmon fillet (130g)', 'Asparagus (100g)', 'Quinoa (80g cooked)', 'Lemon (1/2)', 'Garlic (1 clove)'], calories: 400, gi: 28, sodium: 210, netCarbs: 22 },
    { title: 'Herb-Crusted Chicken Breast', desc: 'Lean protein with root vegetables', items: ['Chicken breast (140g)', 'Sweet potato (100g)', 'Green beans (80g)', 'Rosemary', 'Olive oil (1 tbsp)'], calories: 410, gi: 42, sodium: 260, netCarbs: 30 },
    { title: 'Turkey Meatball Zoodles', desc: 'Low-carb Italian dinner', items: ['Turkey meatballs (120g)', 'Zucchini noodles (150g)', 'Marinara (60ml)', 'Parmesan (10g)', 'Basil'], calories: 360, gi: 15, sodium: 380, netCarbs: 14 },
    { title: 'Cod with Roasted Vegetables', desc: 'White fish with Mediterranean veg', items: ['Cod fillet (140g)', 'Bell peppers (80g)', 'Red onion (50g)', 'Cherry tomatoes (60g)', 'Olive oil (1 tbsp)'], calories: 340, gi: 18, sodium: 230, netCarbs: 16 },
    { title: 'Lentil Shepherd\'s Pie', desc: 'Plant-based comfort food', items: ['Green lentils (100g cooked)', 'Cauliflower mash (120g)', 'Carrots (60g)', 'Peas (40g)', 'Thyme'], calories: 380, gi: 32, sodium: 310, netCarbs: 40 },
    { title: 'Grilled Shrimp & Broccoli', desc: 'Quick light dinner', items: ['Shrimp (130g)', 'Broccoli (120g)', 'Brown rice (80g cooked)', 'Mango salsa (30g)', 'Lime'], calories: 350, gi: 38, sodium: 290, netCarbs: 32 },
  ],
};

/* ──────────────── Evaluation Engine ──────────────── */
function evaluateLabs(fasting: number, postprandial: number, hba1c: number, systolic: number, diastolic: number): Evaluation {
  let glucoseStatus: GlucoseStatus; let glucoseLabel: string; let glucoseColor: string;
  if (fasting < 70) { glucoseStatus = 'low'; glucoseLabel = 'Hypoglycemia'; glucoseColor = 'text-blue-600 bg-blue-50 border-blue-200'; }
  else if (fasting <= 99 && postprandial <= 140 && hba1c < 5.7) { glucoseStatus = 'normal'; glucoseLabel = 'Normal (ADA)'; glucoseColor = 'text-emerald-700 bg-emerald-50 border-emerald-200'; }
  else if (fasting <= 125 || postprandial <= 199 || hba1c <= 6.4) { glucoseStatus = 'prediabetes'; glucoseLabel = 'Prediabetes Range'; glucoseColor = 'text-amber-700 bg-amber-50 border-amber-200'; }
  else { glucoseStatus = 'diabetes'; glucoseLabel = 'Diabetic Range'; glucoseColor = 'text-red-700 bg-red-50 border-red-200'; }

  let bpStatus: HealthStatus; let bpLabel: string; let bpColor: string;
  if (systolic < 90 || diastolic < 60) { bpStatus = 'low'; bpLabel = 'Low BP'; bpColor = 'text-blue-600 bg-blue-50 border-blue-200'; }
  else if (systolic <= 120 && diastolic <= 80) { bpStatus = 'normal'; bpLabel = 'Normal (AHA)'; bpColor = 'text-emerald-700 bg-emerald-50 border-emerald-200'; }
  else if (systolic <= 129 && diastolic <= 80) { bpStatus = 'elevated'; bpLabel = 'Elevated'; bpColor = 'text-amber-700 bg-amber-50 border-amber-200'; }
  else if (systolic <= 139 || diastolic <= 89) { bpStatus = 'high_stage1'; bpLabel = 'Hypertension Stage 1'; bpColor = 'text-orange-700 bg-orange-50 border-orange-200'; }
  else if (systolic <= 179 || diastolic <= 119) { bpStatus = 'high_stage2'; bpLabel = 'Hypertension Stage 2'; bpColor = 'text-red-700 bg-red-50 border-red-200'; }
  else { bpStatus = 'crisis'; bpLabel = 'Hypertensive Crisis'; bpColor = 'text-red-800 bg-red-100 border-red-300'; }

  const isHypertensive = bpStatus === 'high_stage1' || bpStatus === 'high_stage2' || bpStatus === 'crisis';
  const isDiabetic = glucoseStatus === 'diabetes' || glucoseStatus === 'prediabetes';
  const overallRisk: 'low' | 'moderate' | 'high' =
    bpStatus === 'crisis' || glucoseStatus === 'diabetes' ? 'high' : isHypertensive || isDiabetic ? 'moderate' : 'low';

  const dietTags: string[] = []; const exerciseTags: string[] = []; const summaryParts: string[] = [];

  if (glucoseStatus === 'normal') { dietTags.push('Balanced low-GI diet', 'Maintain fiber intake (25-30g/day)'); summaryParts.push('Blood glucose is within normal ADA targets.'); }
  else if (glucoseStatus === 'prediabetes') { dietTags.push('Strict low-GI (<55)', 'Carb counting (30-45g/meal)', 'Soluble fiber priority', 'Avoid refined sugars'); summaryParts.push('Prediabetic glucose levels detected — dietary intervention can prevent progression to Type 2.'); }
  else if (glucoseStatus === 'diabetes') { dietTags.push('Very low-GI foods only', 'Carb counting (25-40g/meal)', 'Pair carbs with protein/fat', 'Monitor post-meal glucose'); summaryParts.push('Diabetic glucose levels — strict glycemic management required.'); }
  else if (glucoseStatus === 'low') { dietTags.push('Fast-acting carbs for emergencies', 'Regular meal timing', 'Avoid skipped meals'); summaryParts.push('Low blood glucose detected — ensure regular meal schedule.'); }

  if (isHypertensive) { dietTags.push('DASH diet principles', 'Sodium <1,500 mg/day', 'Increase potassium (bananas, spinach)', 'Limit alcohol & caffeine'); exerciseTags.push('Aerobic 150 min/week (walking, swimming)', 'Avoid heavy lifting / Valsalva'); summaryParts.push('Blood pressure requires DASH diet and consistent aerobic exercise.'); }
  else if (bpStatus === 'elevated') { dietTags.push('Reduce sodium (<2,300 mg/day)', 'Increase fruits & vegetables', 'Limit processed foods'); exerciseTags.push('Brisk walking 30 min/day', 'Light resistance training 2x/week'); summaryParts.push('Blood pressure is elevated — lifestyle changes recommended.'); }
  else { dietTags.push('Maintain current dietary habits', 'Continue balanced nutrition'); exerciseTags.push('Regular activity 150 min/week', 'Strength training 2-3x/week'); }

  if (!exerciseTags.length) exerciseTags.push('Moderate aerobic exercise 150 min/week', 'Strength training 2-3x/week');

  return { glucoseStatus, glucoseLabel, glucoseColor, bpStatus, bpLabel, bpColor, overallRisk, dietTags, exerciseTags, summary: summaryParts.join(' ') };
}

/* ──────────────── Component ──────────────── */
const LabToPlanPage: React.FC = () => {
  const { t, language } = useLanguage();

  const [age, setAge] = useState<number>(45);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(170);
  const [gender, setGender] = useState<string>('male');

  const [fasting, setFasting] = useState<number>(110);
  const [postprandial, setPostprandial] = useState<number>(155);
  const [hba1c, setHba1c] = useState<number>(5.9);
  const [systolic, setSystolic] = useState<number>(135);
  const [diastolic, setDiastolic] = useState<number>(85);

  const [evaluated, setEvaluated] = useState<Evaluation | null>(null);
  const [showResults, setShowResults] = useState(false);

  const [mealIndices, setMealIndices] = useState<Record<MealSlot, number>>({ breakfast: 0, lunch: 0, dinner: 0 });
  const [shuffleCount, setShuffleCount] = useState<Record<MealSlot, number>>({ breakfast: 0, lunch: 0, dinner: 0 });

  const [tracking, setTracking] = useState<TrackingRow[]>([
    { label: 'Sodium', unit: 'mg', target: 1500, actual: 0, safeRange: '≤ 1,500 mg' },
    { label: 'Net Carbohydrates', unit: 'g', target: 150, actual: 0, safeRange: '120–200 g' },
    { label: 'Hydration', unit: 'glasses', target: 8, actual: 0, safeRange: '8–12 glasses' },
  ]);

  const [progress, setProgress] = useState<ProgressEntry[]>(() => loadProgress());
  const [showProgress, setShowProgress] = useState(false);
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const [diabetesSelectedDay, setDiabetesSelectedDay] = useState(0);
  const [diabetesActiveTab, setDiabetesActiveTab] = useState<'macros' | 'meals' | 'workout'>('meals');
  const [htSelectedDay, setHtSelectedDay] = useState(0);
  const [htActiveTab, setHtActiveTab] = useState<'macros' | 'meals' | 'workout'>('meals');
  const [showDiabetesPlan, setShowDiabetesPlan] = useState(false);
  const [showHtPlan, setShowHtPlan] = useState(false);
  const [customDiabetesPlan, setCustomDiabetesPlan] = useState<DayPlan[] | null>(null);
  const [customHtPlan, setCustomHtPlan] = useState<DayPlan[] | null>(null);

  const handleOpenFullPlan = (kind: 'diabetes' | 'ht' = 'diabetes') => {
    console.log('OPEN FULL-30 DAY PLAN');
    setShowDiabetesPlan(kind === 'diabetes');
    setShowHtPlan(kind === 'ht');
  };

  const [showDiabetesWorkoutModal, setShowDiabetesWorkoutModal] = useState(false);
  const [showHtWorkoutModal, setShowHtWorkoutModal] = useState(false);
  const [diabetesWorkoutSelectedDay, setDiabetesWorkoutSelectedDay] = useState(0);
  const [htWorkoutSelectedDay, setHtWorkoutSelectedDay] = useState(0);

  const [diabetesCompletions, setDiabetesCompletions] = useState<Record<number, Record<number, boolean>>>({});
  const [diabetesWorkoutCompletions, setDiabetesWorkoutCompletions] = useState<Record<number, Record<number, boolean>>>({});
  const [diabetesStreak, setDiabetesStreak] = useState({ current: 0, longest: 0, daysCompleted: 0 });

  const [htCompletions, setHtCompletions] = useState<Record<number, Record<number, boolean>>>({});
  const [htWorkoutCompletions, setHtWorkoutCompletions] = useState<Record<number, Record<number, boolean>>>({});
  const [htStreak, setHtStreak] = useState({ current: 0, longest: 0, daysCompleted: 0 });

  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine>(() => {
    const saved = localStorage.getItem('hc_selectedCuisine');
    return (saved as Cuisine) || 'egyptian';
  });

  const handleCuisineChange = useCallback((cuisine: Cuisine) => {
    setSelectedCuisine(cuisine);
    localStorage.setItem('hc_selectedCuisine', cuisine);
  }, []);

  useEffect(() => { saveProgress(progress); }, [progress]);

  const bmr = calcBMR(weight, height, age, gender);
  const tdee = calcTDEE(bmr);
  const userBMI = bmi(weight, height);

  const showDiabetes = evaluated && (evaluated.glucoseStatus === 'diabetes' || evaluated.glucoseStatus === 'prediabetes');
  const showHypertension = evaluated && (evaluated.bpStatus === 'high_stage1' || evaluated.bpStatus === 'high_stage2' || evaluated.bpStatus === 'crisis');

  const diabetesPlan = useMemo(() => generateDiabetesPlan({ age, weight, height }, { hba1c, fastingGlucose: fasting }, selectedCuisine), [age, weight, height, hba1c, fasting, selectedCuisine]);
  const htPlan = useMemo(() => generateHypertensionPlan({ age, weight, height }, { systolic, diastolic }, selectedCuisine), [age, weight, height, systolic, diastolic, selectedCuisine]);
  const diabetesCurrentDay = (customDiabetesPlan ?? diabetesPlan)[diabetesSelectedDay];
  const htCurrentDay = (customHtPlan ?? htPlan)[htSelectedDay];

  const toggleDiabetesMeal = useCallback((dayIdx: number, mealIdx: number, done: boolean) => {
    setDiabetesCompletions(prev => ({ ...prev, [dayIdx]: { ...prev[dayIdx], [mealIdx]: done } }));
  }, []);

  const toggleDiabetesWorkout = useCallback((dayIdx: number, workoutIdx: number, done: boolean) => {
    setDiabetesWorkoutCompletions(prev => ({ ...prev, [dayIdx]: { ...prev[dayIdx], [workoutIdx]: done } }));
  }, []);

  const toggleHtMeal = useCallback((dayIdx: number, mealIdx: number, done: boolean) => {
    setHtCompletions(prev => ({ ...prev, [dayIdx]: { ...prev[dayIdx], [mealIdx]: done } }));
  }, []);

  const toggleHtWorkout = useCallback((dayIdx: number, workoutIdx: number, done: boolean) => {
    setHtWorkoutCompletions(prev => ({ ...prev, [dayIdx]: { ...prev[dayIdx], [workoutIdx]: done } }));
  }, []);

  const handleEvaluate = useCallback(() => {
    const result = evaluateLabs(fasting, postprandial, hba1c, systolic, diastolic);
    setEvaluated(result);
    setShowResults(true);

    const totalSodium = (['breakfast', 'lunch', 'dinner'] as MealSlot[]).reduce((sum, s) => sum + mealDB[s][mealIndices[s]].sodium, 0);
    const totalCarbs = (['breakfast', 'lunch', 'dinner'] as MealSlot[]).reduce((sum, s) => sum + mealDB[s][mealIndices[s]].netCarbs, 0);
    setTracking(prev => [{ ...prev[0], actual: totalSodium }, { ...prev[1], actual: totalCarbs }, prev[2]]);

    const entry: ProgressEntry = { id: Date.now().toString(), date: new Date().toLocaleDateString(), fasting, postprandial, hba1c, systolic, diastolic, weight };
    setProgress(prev => [...prev.slice(-29), entry]);
  }, [fasting, postprandial, hba1c, systolic, diastolic, weight, mealIndices]);

  const shuffleMeal = useCallback((slot: MealSlot) => {
    setMealIndices(prev => {
      const newIdx = (prev[slot] + 1) % mealDB[slot].length;
      const updated = { ...prev, [slot]: newIdx };
      setTracking(prevT => {
        const sodium = mealDB.breakfast[updated.breakfast].sodium + mealDB.lunch[updated.lunch].sodium + mealDB.dinner[updated.dinner].sodium;
        const carbs = mealDB.breakfast[updated.breakfast].netCarbs + mealDB.lunch[updated.lunch].netCarbs + mealDB.dinner[updated.dinner].netCarbs;
        return [prevT[0], { ...prevT[1], actual: sodium }, prevT[2]];
      });
      return updated;
    });
    setShuffleCount(prev => ({ ...prev, [slot]: prev[slot] + 1 }));
  }, []);

  const updateWater = useCallback((delta: number) => {
    setTracking(prev => [prev[0], prev[1], { ...prev[2], actual: Math.max(0, prev[2].actual + delta) }]);
  }, []);

  const clearProgress = useCallback(() => { setProgress([]); }, []);

  const getStatusColor = (row: TrackingRow): string => {
    if (row.label === 'Hydration') { if (row.actual >= row.target && row.actual <= 12) return 'bg-emerald-50 text-emerald-700 border-emerald-200'; if (row.actual >= row.target - 2) return 'bg-amber-50 text-amber-700 border-amber-200'; return 'bg-red-50 text-red-700 border-red-200'; }
    if (row.actual <= row.target) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (row.actual <= row.target * 1.15) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  const getStatusLabel = (row: TrackingRow): string => {
    if (row.label === 'Hydration') { if (row.actual >= row.target && row.actual <= 12) return 'On Track'; if (row.actual >= row.target - 2) return 'Needs Attention'; return 'Below Target'; }
    if (row.actual <= row.target) return 'Safe';
    if (row.actual <= row.target * 1.15) return 'Needs Attention';
    return 'Over Limit';
  };

  const currentMeals: MealSlot[] = ['breakfast', 'lunch', 'dinner'];
  const totalCalories = currentMeals.reduce((sum, s) => sum + mealDB[s][mealIndices[s]].calories, 0);
  const totalGI = Math.round(currentMeals.reduce((sum, s) => sum + mealDB[s][mealIndices[s]].gi, 0) / 3);
  const slotLabels: Record<MealSlot, { label: string; icon: string }> = { breakfast: { label: 'Breakfast', icon: '🌅' }, lunch: { label: 'Lunch', icon: '☀️' }, dinner: { label: 'Dinner', icon: '🌙' } };

  const getExerciseForProfile = (base: ConditionWorkout[]): ConditionWorkout[] => {
    return base.map(ex => {
      let extra = '';
      if (age > 60) extra = 'Age 60+: Reduce intensity by 20%; extend rest periods.';
      else if (age > 45) extra = 'Age 45+: Moderate intensity; warm up 5-10 min first.';
      if (userBMI > 30) extra += (extra ? ' ' : '') + 'BMI >30: Joint-friendly options preferred; avoid high-impact.';
      else if (userBMI > 25) extra += (extra ? ' ' : '') + 'BMI >25: Focus on calorie-burning cardio.';
      return { ...ex, notes: ex.notes + (extra ? ` ${extra}` : '') };
    });
  };

  const handlePrint = () => { window.print(); };

  const handleEmail = () => {
    const meals = currentMeals.map(s => { const m = mealDB[s][mealIndices[s]]; return `${slotLabels[s].label}: ${m.title}\n  ${m.items.join(', ')}\n  ${m.calories} kcal`; }).join('\n\n');
    let condSection = '';
    if (showDiabetes) { const d = conditionContent.diabetes; condSection += `\n\n══ DIABETES MANAGEMENT ══\nMEAL PLAN\n` + d.mealPlan.map(m => `  ${getMealLabel(m.meal, language)} (${m.calories}kcal): ${m.items.join(', ')}`).join('\n') + `\nEXERCISE\n` + d.workout.map(w => `  ${w.exercise} (${w.sets}): ${w.notes}`).join('\n') + `\nGUIDELINES\n` + d.guidelines.map((g, i) => `  ${i + 1}. ${g}`).join('\n'); }
    if (showHypertension) { const h = conditionContent.hypertension; condSection += `\n\n══ HYPERTENSION MANAGEMENT ══\nMEAL PLAN\n` + h.mealPlan.map(m => `  ${getMealLabel(m.meal, language)} (${m.calories}kcal): ${m.items.join(', ')}`).join('\n') + `\nEXERCISE\n` + h.workout.map(w => `  ${w.exercise} (${w.sets}): ${w.notes}`).join('\n') + `\nGUIDELINES\n` + h.guidelines.map((g, i) => `  ${i + 1}. ${g}`).join('\n'); }

    const body = encodeURIComponent(`HEALTHCALC.AI — DAILY HEALTH REPORT\nDate: ${new Date().toLocaleDateString()}\n${'═'.repeat(40)}\n\nPROFILE\n  Age: ${age} | Weight: ${weight}kg | Height: ${height}cm | BMI: ${userBMI}\n  BMR: ${bmr} kcal | TDEE: ${tdee} kcal\n\nLAB VALUES\n  Fasting: ${fasting} mg/dL | Postprandial: ${postprandial} mg/dL | HbA1c: ${hba1c}%\n  BP: ${systolic}/${diastolic} mmHg\n  Glucose: ${evaluated?.glucoseLabel} | BP: ${evaluated?.bpLabel}\n\nDAILY MEALS (${totalCalories} kcal)\n\n${meals}${condSection}\n\nTRACKING\n  Sodium: ${tracking[0].actual}/${tracking[0].target}mg (${getStatusLabel(tracking[0])})\n  Net Carbs: ${tracking[1].actual}/${tracking[1].target}g (${getStatusLabel(tracking[1])})\n  Hydration: ${tracking[2].actual}/${tracking[2].target} glasses (${getStatusLabel(tracking[2])})\n\nGenerated by HealthCalc.ai`);
    window.location.href = `mailto:?subject=${encodeURIComponent('HealthCalc.ai — Daily Health Report')}&body=${body}`;
    setShowEmailSuccess(true);
    setTimeout(() => setShowEmailSuccess(false), 4000);
  };

  const recentGlucose = progress.slice(-7);
  const maxGlucose = Math.max(200, ...recentGlucose.map(e => Math.max(e.fasting, e.postprandial)));
  const recentBP = progress.slice(-7);
  const maxSystolic = Math.max(160, ...recentBP.map(e => e.systolic));

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Breadcrumbs />
      {/* ─── Hero ─── */}
      <div className="print:hidden bg-gradient-to-r from-primary-600 to-sage-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-primary-200 rounded-full animate-pulse-soft" />
              <span className="text-xs font-medium text-primary-100">Smart Health Engine</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">Diabetes &amp; Hypertension Suite</h1>
            <p className="text-primary-100 text-sm md:text-base leading-relaxed">
              Enter your profile and lab values to instantly receive personalized meal plans, exercise routines, and progress tracking — all aligned with ADA and AHA clinical guidelines.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ─── Input Panel ─── */}
        <div className="print:hidden card mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-2xl flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5m-4.25-11.398c.251.023.501.05.75.082M5 14.5l-.94 1.88a2.25 2.25 0 002.064 3.12h9.752a2.25 2.25 0 002.064-3.12L19 14.5" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Profile &amp; Lab Values</h2>
              <p className="text-xs text-gray-500">Enter your metrics for personalized ADA &amp; AHA evaluation</p>
            </div>
          </div>

          {/* Profile Row */}
          <div className="bg-gradient-to-br from-sage-50 to-primary-50 rounded-2xl p-5 border border-sage-100/80 mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><span className="text-lg">👤</span> User Profile</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="label text-sage-600">Age</label>
                <input type="number" value={age} onChange={e => setAge(+e.target.value)} className="input-field-lg bg-white" />
              </div>
              <div>
                <label className="label text-sage-600">Weight (kg)</label>
                <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="input-field-lg bg-white" />
              </div>
              <div>
                <label className="label text-sage-600">Height (cm)</label>
                <input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="input-field-lg bg-white" />
              </div>
              <div>
                <label className="label text-sage-600">Gender</label>
                <select value={gender} onChange={e => setGender(e.target.value)} className="input-field-lg bg-white">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="badge-sage">BMI: {userBMI}</span>
              <span className="badge-primary">BMR: {bmr} kcal/day</span>
              <span className="badge-amber">TDEE: {tdee} kcal/day</span>
            </div>
          </div>

          {/* Lab Values Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-5 border border-rose-100/80">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><span className="text-lg">🩸</span> Blood Glucose</h3>
              <div className="space-y-3">
                <div><label className="label text-rose-600">Fasting (mg/dL)</label><input type="number" value={fasting} onChange={e => setFasting(+e.target.value)} className="input-field-lg bg-white" /><p className="text-[10px] text-gray-400 mt-1">Normal: 70–99 · Pre: 100–125 · Diabetes: ≥126</p></div>
                <div><label className="label text-rose-600">Postprandial 2hr (mg/dL)</label><input type="number" value={postprandial} onChange={e => setPostprandial(+e.target.value)} className="input-field-lg bg-white" /><p className="text-[10px] text-gray-400 mt-1">Normal: &lt;140 · Pre: 140–199 · Diabetes: ≥200</p></div>
                <div><label className="label text-rose-600">HbA1c (%)</label><input type="number" step="0.1" value={hba1c} onChange={e => setHba1c(+e.target.value)} className="input-field-lg bg-white" /><p className="text-[10px] text-gray-400 mt-1">Normal: &lt;5.7% · Pre: 5.7–6.4% · Diabetes: ≥6.5%</p></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100/80">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><span className="text-lg">❤️</span> Blood Pressure</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-1"><label className="label text-blue-600">Systolic (mmHg)</label><input type="number" value={systolic} onChange={e => setSystolic(+e.target.value)} className="input-field-lg bg-white" /></div>
                  <div className="flex-1"><label className="label text-blue-600">Diastolic (mmHg)</label><input type="number" value={diastolic} onChange={e => setDiastolic(+e.target.value)} className="input-field-lg bg-white" /></div>
                </div>
                <div className="bg-white/60 rounded-xl p-3 text-[11px] text-gray-500 space-y-1">
                  <div className="flex justify-between"><span>Normal (AHA):</span><span className="font-medium">≤120 / ≤80</span></div>
                  <div className="flex justify-between"><span>Elevated:</span><span className="font-medium">121–129 / &lt;80</span></div>
                  <div className="flex justify-between"><span>Stage 1 HTN:</span><span className="font-medium">130–139 / 80–89</span></div>
                  <div className="flex justify-between"><span>Stage 2 HTN:</span><span className="font-medium">≥140 / ≥90</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleEvaluate} className="btn-primary flex-1 sm:flex-none">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              Evaluate &amp; Generate Plan
            </button>
            <button onClick={() => setShowProgress(!showProgress)} className="btn-outline flex-1 sm:flex-none print:hidden">
              {showProgress ? 'Hide' : 'Show'} Progress
            </button>
          </div>
        </div>

        {/* ─── Results ─── */}
        {showResults && evaluated && (
          <div ref={reportRef} className="animate-fade-in space-y-8">

            {/* Status Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`card border ${evaluated.glucoseColor.split(' ')[2]} flex items-center gap-3`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${evaluated.glucoseColor.split(' ').slice(1).join(' ')}`}>🩸</div>
                <div><p className="text-[9px] font-semibold text-gray-400 uppercase">Glucose</p><p className={`font-bold text-xs ${evaluated.glucoseColor.split(' ')[0]}`}>{evaluated.glucoseLabel}</p></div>
              </div>
              <div className={`card border ${evaluated.bpColor.split(' ')[2]} flex items-center gap-3`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${evaluated.bpColor.split(' ').slice(1).join(' ')}`}>❤️</div>
                <div><p className="text-[9px] font-semibold text-gray-400 uppercase">Blood Pressure</p><p className={`font-bold text-xs ${evaluated.bpColor.split(' ')[0]}`}>{evaluated.bpLabel}</p></div>
              </div>
              <div className="card border border-sage-200 bg-sage-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-sage-100">⚖️</div>
                <div><p className="text-[9px] font-semibold text-gray-400 uppercase">BMI</p><p className="font-bold text-xs text-sage-700">{userBMI} {userBMI > 30 ? 'Obese' : userBMI > 25 ? 'Overweight' : userBMI > 18.5 ? 'Normal' : 'Underweight'}</p></div>
              </div>
              <div className={`card border ${evaluated.overallRisk === 'high' ? 'border-red-200 bg-red-50' : evaluated.overallRisk === 'moderate' ? 'border-amber-200 bg-amber-50' : 'border-emerald-200 bg-emerald-50'} flex items-center gap-3`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${evaluated.overallRisk === 'high' ? 'bg-red-100 text-red-700' : evaluated.overallRisk === 'moderate' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {evaluated.overallRisk === 'high' ? '⚠️' : evaluated.overallRisk === 'moderate' ? '⚡' : '✅'}
                </div>
                <div><p className="text-[9px] font-semibold text-gray-400 uppercase">Risk</p><p className={`font-bold text-xs capitalize ${evaluated.overallRisk === 'high' ? 'text-red-700' : evaluated.overallRisk === 'moderate' ? 'text-amber-700' : 'text-emerald-700'}`}>{evaluated.overallRisk}</p></div>
              </div>
            </div>

            {/* Calorie Targets */}
            <div className="card bg-gradient-to-br from-sage-50 to-primary-50 border-sage-200/80">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center"><span className="text-lg">🎯</span></div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Your Daily Targets</h3>
                    <p className="text-[10px] text-gray-500">Calculated from age, weight, height, and activity level</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="badge-primary">TDEE: {tdee} kcal</span>
                  <span className="badge-sage">Protein: {Math.round(weight * 1.2)}g</span>
                  <span className="badge-amber">Carbs: {Math.round(tdee * 0.45 / 4)}g</span>
                  <span className="badge bg-gray-100 text-gray-700">Fat: {Math.round(tdee * 0.30 / 9)}g</span>
                </div>
              </div>
            </div>

            {/* ─── DIABETES SECTION ─── */}
            {showDiabetes && (
              <div className="space-y-6">
                <div className="print:hidden bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-2xl px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center text-xl">🩸</div>
                    <div><h3 className="text-base font-extrabold tracking-tight">Diabetes Management Plan</h3><p className="text-rose-100 text-xs">ADA guideline-based · Low-GI · Carb-counted · Age-adjusted</p></div>
                  </div>
                  <span className="print:hidden badge bg-white/20 text-white text-[10px] font-bold">Free</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-5 border border-rose-100/80">
                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-base">📊</span> Glucose Profile</h4>
                    <div className="space-y-2">
                      {[['Fasting', `${fasting} mg/dL`], ['Postprandial', `${postprandial} mg/dL`], ['HbA1c', `${hba1c}%`], ['Status', evaluated.glucoseLabel]].map(([l, v], i) => (
                        <div key={i} className="flex items-center justify-between bg-white/60 rounded-xl px-3 py-2"><span className="text-xs text-gray-600">{l}</span><span className="font-bold text-xs text-rose-700">{v}</span></div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-100/80">
                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-base">🎯</span> ADA Targets</h4>
                    <div className="space-y-2">
                      {[['Fasting', '80–130 mg/dL'], ['Post-meal', '<180 mg/dL'], ['HbA1c', '<7.0%'], ['Carb/Meal', '30–45g']].map(([l, v], i) => (
                        <div key={i} className="flex items-center justify-between bg-white/60 rounded-xl px-3 py-2"><span className="text-xs text-gray-600">{l}</span><span className="font-bold text-xs text-gray-700">{v}</span></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[{ label: 'GI Target', value: '<55', icon: '📉', bg: 'from-emerald-50 to-sage-50', border: 'border-emerald-200/80' },
                    { label: 'Carb Budget', value: `${Math.round(tdee * 0.45 / 4)}g/day`, icon: '🍞', bg: 'from-amber-50 to-orange-50', border: 'border-amber-200/80' },
                    { label: 'Fiber Goal', value: '25–30g', icon: '🥦', bg: 'from-primary-50 to-blue-50', border: 'border-primary-200/80' }
                  ].map((c, i) => (
                    <div key={i} className={`bg-gradient-to-br ${c.bg} rounded-2xl p-4 border ${c.border} text-center`}>
                      <span className="text-xl mb-2 block">{c.icon}</span>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase">{c.label}</p>
                      <p className="font-extrabold text-lg text-gray-900">{c.value}</p>
                    </div>
                  ))}
                </div>

                <DaySelectorBar days={30} activeDay={diabetesSelectedDay + 1} onSelect={(d) => setDiabetesSelectedDay(d - 1)} label="30-Day Diabetes Meal & Workout Plan" subtitle={diabetesCurrentDay?.phase || 'Foundation'} />
                <PlanTabBar activeTab={diabetesActiveTab} onChange={setDiabetesActiveTab} />

                {diabetesActiveTab === 'meals' && diabetesCurrentDay && (
                  <div className="space-y-3">
                    <DayProgressHeader
                      completed={Object.values(diabetesCompletions[diabetesSelectedDay] || {}).filter(Boolean).length}
                      total={diabetesCurrentDay.meals.length}
                      dailyGoal={diabetesCurrentDay.dailyGoal}
                    />
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm"><span>🍽️</span> {diabetesCurrentDay.label} — Diabetes Meals <span className="badge-primary text-[10px]">ADA-Aligned</span></h4>
                    <div className="card p-4">
                      <label className="text-xs font-bold text-gray-500 mb-2 block">🍽️ {t('chooseCuisine')}</label>
                      <CuisineRegionCards selected={selectedCuisine} onChange={handleCuisineChange} />
                    </div>
                    <div className="card p-5">
                      <MealBuilder
                        cuisine={selectedCuisine}
                        sectionType="lab-to-plan"
                        filters={{ lowSugar: true }}
                        onGenerate={(payload) => {
                          setCustomDiabetesPlan(toDayPlans(payload.fullMealPlan, diabetesPlan));
                          setShowDiabetesPlan(true);
                        }}
                        onCuisineChange={handleCuisineChange}
                      />
                    </div>
                    {diabetesCurrentDay.meals.map((meal, i) => (
                      <MealCard
                        key={i}
                        meal={meal}
                        done={!!diabetesCompletions[diabetesSelectedDay]?.[i]}
                        onToggle={(done) => toggleDiabetesMeal(diabetesSelectedDay, i, done)}
                      />
                    ))}
                    <div className="mt-8 space-y-4">
                      <div className="border-t pt-6">
                        <button
                          onClick={() => handleOpenFullPlan('diabetes')}
                          className="w-full bg-green-50 border border-green-200 text-green-700 py-4 px-6 rounded-xl font-medium hover:bg-green-100 transition-all flex items-center justify-center gap-2"
                        >
                          <span>📄</span> Open Full-30 Day Plan with PDF / Print
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-2">Download or print your complete personalized plan</p>
                      </div>
                    </div>
                  </div>
                )}

                {diabetesActiveTab === 'workout' && diabetesCurrentDay && (
                  <div className="space-y-3">
                    <DayProgressHeader
                      completed={Object.values(diabetesWorkoutCompletions[diabetesSelectedDay] || {}).filter(Boolean).length}
                      total={diabetesCurrentDay.workouts.length}
                      dailyGoal="Complete all exercises"
                    />
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm"><span>🏃</span> {diabetesCurrentDay.label} — Exercise Protocol <span className="badge-sage text-[10px]">Age-Adjusted</span></h4>
                    <button
                      onClick={() => setShowDiabetesWorkoutModal(true)}
                      className="w-full py-3 text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white rounded-2xl transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                      </svg>
                      Full 30-Day Workout Plan
                    </button>
                    {diabetesCurrentDay.workouts.map((w, i) => (
                      <WorkoutCard
                        key={i}
                        workout={w}
                        index={i}
                        done={!!diabetesWorkoutCompletions[diabetesSelectedDay]?.[i]}
                        onToggle={(done) => toggleDiabetesWorkout(diabetesSelectedDay, i, done)}
                      />
                    ))}
                  </div>
                )}

                <div className="card bg-gradient-to-br from-gray-50 to-white">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm"><span>📋</span> ADA Guidelines</h4>
                  <ul className="space-y-2">
                    {conditionContent.diabetes.guidelines.map((g, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600"><span className="w-5 h-5 bg-rose-100 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-rose-700">{i + 1}</span>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* ─── HYPERTENSION SECTION ─── */}
            {showHypertension && (
              <div className="space-y-6">
                <div className="print:hidden bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center text-xl">❤️</div>
                    <div><h3 className="text-base font-extrabold tracking-tight">Hypertension Management Plan</h3><p className="text-red-100 text-xs">AHA guideline-based · DASH diet · Low-sodium · Weight-aware</p></div>
                  </div>
                  <span className="print:hidden badge bg-white/20 text-white text-[10px] font-bold">Free</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100/80">
                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-base">📊</span> BP Profile</h4>
                    <div className="space-y-2">
                      {[['Systolic', `${systolic} mmHg`], ['Diastolic', `${diastolic} mmHg`], ['Reading', `${systolic}/${diastolic}`], ['Status', evaluated.bpLabel]].map(([l, v], i) => (
                        <div key={i} className="flex items-center justify-between bg-white/60 rounded-xl px-3 py-2"><span className="text-xs text-gray-600">{l}</span><span className="font-bold text-xs text-blue-700">{v}</span></div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100/80">
                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-base">🎯</span> AHA Targets</h4>
                    <div className="space-y-2">
                      {[['BP Target', '<130/80 mmHg'], ['Sodium', '<1,500 mg/day'], ['Potassium', '3,500–5,000 mg/day'], ['Exercise', '150 min/week']].map(([l, v], i) => (
                        <div key={i} className="flex items-center justify-between bg-white/60 rounded-xl px-3 py-2"><span className="text-xs text-gray-600">{l}</span><span className="font-bold text-xs text-gray-700">{v}</span></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[{ label: 'Sodium', value: '<1,500mg', icon: '🧂', bg: 'from-blue-50 to-indigo-50', border: 'border-blue-200/80' },
                    { label: 'Potassium', value: '4,700mg', icon: '🍌', bg: 'from-emerald-50 to-sage-50', border: 'border-emerald-200/80' },
                    { label: 'BMI Target', value: '18.5–24.9', icon: '⚖️', bg: 'from-amber-50 to-orange-50', border: 'border-amber-200/80' }
                  ].map((c, i) => (
                    <div key={i} className={`bg-gradient-to-br ${c.bg} rounded-2xl p-4 border ${c.border} text-center`}>
                      <span className="text-xl mb-2 block">{c.icon}</span>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase">{c.label}</p>
                      <p className="font-extrabold text-lg text-gray-900">{c.value}</p>
                    </div>
                  ))}
                </div>

                <DaySelectorBar days={30} activeDay={htSelectedDay + 1} onSelect={(d) => setHtSelectedDay(d - 1)} label="30-Day Hypertension Meal & Workout Plan" subtitle={htCurrentDay?.phase || 'Foundation'} />
                <PlanTabBar activeTab={htActiveTab} onChange={setHtActiveTab} />

                {htActiveTab === 'meals' && htCurrentDay && (
                  <div className="space-y-3">
                    <DayProgressHeader
                      completed={Object.values(htCompletions[htSelectedDay] || {}).filter(Boolean).length}
                      total={htCurrentDay.meals.length}
                      dailyGoal={htCurrentDay.dailyGoal}
                    />
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm"><span>🍽️</span> {htCurrentDay.label} — DASH Meals <span className="badge-sage text-[10px]">DASH-Aligned</span></h4>
                    <div className="card p-4">
                      <label className="text-xs font-bold text-gray-500 mb-2 block">🍽️ {t('chooseCuisine')}</label>
                      <CuisineRegionCards selected={selectedCuisine} onChange={handleCuisineChange} />
                    </div>
                    <div className="card p-5">
                      <MealBuilder
                        cuisine={selectedCuisine}
                        sectionType="lab-to-plan"
                        filters={{ lowSodium: true }}
                        onGenerate={(payload) => {
                          setCustomHtPlan(toDayPlans(payload.fullMealPlan, htPlan));
                          setShowHtPlan(true);
                        }}
                        onCuisineChange={handleCuisineChange}
                      />
                    </div>
                    {htCurrentDay.meals.map((meal, i) => (
                      <MealCard
                        key={i}
                        meal={meal}
                        done={!!htCompletions[htSelectedDay]?.[i]}
                        onToggle={(done) => toggleHtMeal(htSelectedDay, i, done)}
                      />
                    ))}
                    <div className="mt-8 space-y-4">
                      <div className="border-t pt-6">
                        <button
                          onClick={() => handleOpenFullPlan('ht')}
                          className="w-full bg-green-50 border border-green-200 text-green-700 py-4 px-6 rounded-xl font-medium hover:bg-green-100 transition-all flex items-center justify-center gap-2"
                        >
                          <span>📄</span> Open Full-30 Day Plan with PDF / Print
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-2">Download or print your complete personalized plan</p>
                      </div>
                    </div>
                  </div>
                )}

                {htActiveTab === 'workout' && htCurrentDay && (
                  <div className="space-y-3">
                    <DayProgressHeader
                      completed={Object.values(htWorkoutCompletions[htSelectedDay] || {}).filter(Boolean).length}
                      total={htCurrentDay.workouts.length}
                      dailyGoal="Complete all exercises"
                    />
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm"><span>🏊</span> {htCurrentDay.label} — Exercise Protocol <span className="badge-sage text-[10px]">Weight-Aware</span></h4>
                    <button
                      onClick={() => setShowHtWorkoutModal(true)}
                      className="w-full py-3 text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white rounded-2xl transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                      </svg>
                      Full 30-Day Workout Plan
                    </button>
                    {htCurrentDay.workouts.map((w, i) => (
                      <WorkoutCard
                        key={i}
                        workout={w}
                        index={i}
                        done={!!htWorkoutCompletions[htSelectedDay]?.[i]}
                        onToggle={(done) => toggleHtWorkout(htSelectedDay, i, done)}
                      />
                    ))}
                  </div>
                )}

                <div className="card bg-gradient-to-br from-gray-50 to-white">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm"><span>📋</span> AHA Guidelines</h4>
                  <ul className="space-y-2">
                    {conditionContent.hypertension.guidelines.map((g, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600"><span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-blue-700">{i + 1}</span>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* ─── SHUFFLE MEAL PLAN ─── */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div><h2 className="section-title text-xl mb-1">Daily Meal Plan</h2><p className="text-xs text-gray-500">{totalCalories} kcal · Avg GI: {totalGI} · {tdee} kcal target</p></div>
                <div className="print:hidden bg-primary-50 text-primary-700 px-3 py-1.5 rounded-xl text-xs font-bold">{tracking[0].actual}mg Na · {tracking[1].actual}g carbs</div>
              </div>
              <div className="space-y-4">
                {currentMeals.map(slot => {
                  const meal = mealDB[slot][mealIndices[slot]]; const info = slotLabels[slot];
                  return (
                    <div key={`${slot}-${shuffleCount[slot]}`} className="card animate-fade-in group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{info.icon}</span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">{info.label}</span>
                              <span className="badge-primary text-[10px]">{meal.calories} kcal</span>
                              <span className="badge-sage text-[10px]">GI {meal.gi}</span>
                              <span className="badge-amber text-[10px]">{meal.sodium}mg Na</span>
                            </div>
                            <h3 className="font-bold text-gray-900 text-sm mt-1">{meal.title}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{meal.desc}</p>
                          </div>
                        </div>
                        <button onClick={() => shuffleMeal(slot)} className="print:hidden shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-xl text-xs font-semibold transition-all active:scale-95">
                          <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" /></svg>
                          Shuffle
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3"><ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">{meal.items.map((item, i) => <li key={i} className="flex items-center gap-2 text-xs text-gray-600"><span className="w-1.5 h-1.5 bg-primary-400 rounded-full shrink-0" />{item}</li>)}</ul></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── TRACKING TABLE ─── */}
            <div className="card">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm"><span>📊</span> Daily Tracking</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-[10px] font-bold text-gray-400 uppercase">Metric</th>
                    <th className="text-center py-3 px-4 text-[10px] font-bold text-gray-400 uppercase">Target</th>
                    <th className="text-center py-3 px-4 text-[10px] font-bold text-gray-400 uppercase">Actual</th>
                    <th className="text-center py-3 px-4 text-[10px] font-bold text-gray-400 uppercase">Status</th>
                  </tr></thead>
                  <tbody>
                    {tracking.map((row, i) => {
                      const sc = getStatusColor(row); const sl = getStatusLabel(row);
                      return (
                        <tr key={i} className="border-b border-gray-50">
                          <td className="py-3 px-4"><div className="flex items-center gap-2"><span className="text-base">{['🧂', '🍞', '💧'][i]}</span><div><p className="font-semibold text-gray-900 text-xs">{row.label}</p><p className="text-[10px] text-gray-400">{row.safeRange}</p></div></div></td>
                          <td className="text-center py-3 px-4 text-xs font-medium text-gray-600">{row.label === 'Hydration' ? `${row.target} glasses` : row.label === 'Net Carbohydrates' ? `${row.target}g` : `${row.target} mg`}</td>
                          <td className="text-center py-3 px-4">
                            {row.label === 'Hydration' ? (
                              <div className="flex items-center justify-center gap-2">
                                <button onClick={() => updateWater(-1)} className="print:hidden w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">−</button>
                                <span className="font-bold text-gray-900 text-xs min-w-[3ch] text-center">{row.actual}</span>
                                <button onClick={() => updateWater(1)} className="print:hidden w-6 h-6 rounded-lg bg-primary-50 hover:bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">+</button>
                              </div>
                            ) : <span className="font-bold text-gray-900 text-xs">{row.actual}{row.unit === 'g' ? 'g' : ' mg'}</span>}
                          </td>
                          <td className="text-center py-3 px-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${sc}`}>
                              {sl === 'Safe' || sl === 'On Track' ? <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> : <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg>}
                              {sl}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ─── PROGRESS TRACKING ─── */}
            {showProgress && (
              <div className="card animate-fade-in">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm"><span>📈</span> Progress Tracking <span className="badge-sage text-[10px]">{progress.length} entries</span></h3>
                  {progress.length > 0 && <button onClick={clearProgress} className="print:hidden text-[10px] text-red-500 hover:text-red-700 font-semibold">Clear All</button>}
                </div>

                {progress.length === 0 ? (
                  <p className="text-center text-xs text-gray-400 py-8">No readings yet. Click "Evaluate & Generate Plan" to log your first entry.</p>
                ) : (
                  <>
                    {/* Trend Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      {/* Glucose Trend */}
                      <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-4 border border-rose-100/80">
                        <h4 className="text-xs font-bold text-gray-900 mb-3">Glucose Trend (Recent 7)</h4>
                        <div className="flex items-end gap-1.5 h-24">
                          {recentGlucose.map((e, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                              <div className="w-full rounded-t-md bg-rose-400 transition-all" style={{ height: `${(e.fasting / maxGlucose) * 80}px` }} title={`Fasting: ${e.fasting}`} />
                              <div className="w-full rounded-t-md bg-amber-400 transition-all" style={{ height: `${(e.postprandial / maxGlucose) * 80}px` }} title={`Post: ${e.postprandial}`} />
                              <span className="text-[8px] text-gray-400 mt-0.5">{e.date.split('/')[0]}/{e.date.split('/')[1]}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-3 mt-2"><span className="text-[9px] text-gray-500 flex items-center gap-1"><span className="w-2 h-2 bg-rose-400 rounded-sm" />Fasting</span><span className="text-[9px] text-gray-500 flex items-center gap-1"><span className="w-2 h-2 bg-amber-400 rounded-sm" />Postprandial</span></div>
                      </div>

                      {/* BP Trend */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100/80">
                        <h4 className="text-xs font-bold text-gray-900 mb-3">Blood Pressure Trend (Recent 7)</h4>
                        <div className="flex items-end gap-1.5 h-24">
                          {recentBP.map((e, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                              <div className="w-full rounded-t-md bg-blue-400 transition-all" style={{ height: `${(e.systolic / maxSystolic) * 80}px` }} title={`Sys: ${e.systolic}`} />
                              <div className="w-full rounded-t-md bg-cyan-400 transition-all" style={{ height: `${(e.diastolic / maxSystolic) * 80}px` }} title={`Dia: ${e.diastolic}`} />
                              <span className="text-[8px] text-gray-400 mt-0.5">{e.date.split('/')[0]}/{e.date.split('/')[1]}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-3 mt-2"><span className="text-[9px] text-gray-500 flex items-center gap-1"><span className="w-2 h-2 bg-blue-400 rounded-sm" />Systolic</span><span className="text-[9px] text-gray-500 flex items-center gap-1"><span className="w-2 h-2 bg-cyan-400 rounded-sm" />Diastolic</span></div>
                      </div>
                    </div>

                    {/* Weight Trend */}
                    {progress.some(e => e.weight > 0) && (
                      <div className="bg-gradient-to-br from-sage-50 to-emerald-50 rounded-2xl p-4 border border-sage-100/80 mb-5">
                        <h4 className="text-xs font-bold text-gray-900 mb-3">Weight Trend</h4>
                        <div className="flex items-end gap-1.5 h-20">
                          {recentGlucose.map((e, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                              <div className="w-full rounded-t-md bg-sage-400 transition-all" style={{ height: `${((e.weight - 40) / 60) * 70}px` }} title={`${e.weight}kg`} />
                              <span className="text-[8px] text-gray-400 mt-0.5">{e.weight}kg</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* History Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-100">
                          <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase">Date</th>
                          <th className="text-center py-2 px-3 text-[9px] font-bold text-gray-400 uppercase">Fasting</th>
                          <th className="text-center py-2 px-3 text-[9px] font-bold text-gray-400 uppercase">Post.</th>
                          <th className="text-center py-2 px-3 text-[9px] font-bold text-gray-400 uppercase">HbA1c</th>
                          <th className="text-center py-2 px-3 text-[9px] font-bold text-gray-400 uppercase">BP</th>
                          <th className="text-center py-2 px-3 text-[9px] font-bold text-gray-400 uppercase">Weight</th>
                        </tr></thead>
                        <tbody>
                          {progress.slice().reverse().slice(0, 14).map((e, i) => {
                            const gOk = e.fasting <= 125; const bpOk = e.systolic <= 139;
                            return (
                              <tr key={i} className="border-b border-gray-50">
                                <td className="py-2 px-3 text-xs text-gray-600">{e.date}</td>
                                <td className={`text-center py-2 px-3 text-xs font-bold ${gOk ? 'text-emerald-600' : 'text-red-600'}`}>{e.fasting}</td>
                                <td className={`text-center py-2 px-3 text-xs font-bold ${e.postprandial <= 199 ? 'text-emerald-600' : 'text-red-600'}`}>{e.postprandial}</td>
                                <td className={`text-center py-2 px-3 text-xs font-bold ${e.hba1c <= 6.4 ? 'text-emerald-600' : 'text-red-600'}`}>{e.hba1c}%</td>
                                <td className={`text-center py-2 px-3 text-xs font-bold ${bpOk ? 'text-emerald-600' : 'text-red-600'}`}>{e.systolic}/{e.diastolic}</td>
                                <td className="text-center py-2 px-3 text-xs font-bold text-gray-700">{e.weight}kg</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ─── SUMMARY ─── */}
            <div className="card bg-gradient-to-br from-gray-50 to-white">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Clinical Summary</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{evaluated.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {evaluated.dietTags.slice(0, 3).map((tag, i) => <span key={`d${i}`} className="badge-sage text-[10px]">{tag}</span>)}
                {evaluated.exerciseTags.map((tag, i) => <span key={`e${i}`} className="badge-primary text-[10px]">{tag}</span>)}
              </div>
            </div>

            {/* ─── EXPORT ─── */}
            <div className="print:hidden flex flex-col sm:flex-row gap-3">
              <button onClick={handlePrint} className="btn-primary flex-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m0 0a48.468 48.468 0 018.5 0" /></svg>
                Print / Download Report
              </button>
              <button onClick={handleEmail} className="btn-secondary flex-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                Email Report
              </button>
            </div>
            {showEmailSuccess && (
              <div className="print:hidden animate-fade-in bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0"><svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div>
                <div><p className="text-sm font-semibold text-emerald-800">Email client opened</p><p className="text-xs text-emerald-600">Your full health report with profile, plans, and progress is ready to send.</p></div>
              </div>
            )}
          </div>
        )}

        {!showResults && (
          <div className="print:hidden text-center py-16 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5m-4.25-11.398c.251.023.501.05.75.082M5 14.5l-.94 1.88a2.25 2.25 0 002.064 3.12h9.752a2.25 2.25 0 002.064-3.12L19 14.5" /></svg>
            <p className="text-sm font-medium">Enter your profile and lab values above, then click <strong>Evaluate &amp; Generate Plan</strong>.</p>
          </div>
        )}
      </div>

      <MedicalDisclaimer />
      <MealPlanModal isOpen={showDiabetesPlan} onClose={() => setShowDiabetesPlan(false)} targetCalories={0} mealPlan={[]} fullMealPlan={customDiabetesPlan ?? diabetesPlan} selectedDay={diabetesSelectedDay} onDayChange={setDiabetesSelectedDay} weight={0} onSave={() => setShowDiabetesPlan(false)} cuisine={selectedCuisine} onCuisineChange={handleCuisineChange} labSummary={`🩸 Fasting ${fasting} mg/dL · Postprandial ${postprandial} mg/dL · HbA1c ${hba1c}%`} />
      <MealPlanModal isOpen={showHtPlan} onClose={() => setShowHtPlan(false)} targetCalories={0} mealPlan={[]} fullMealPlan={customHtPlan ?? htPlan} selectedDay={htSelectedDay} onDayChange={setHtSelectedDay} weight={0} onSave={() => setShowHtPlan(false)} cuisine={selectedCuisine} onCuisineChange={handleCuisineChange} labSummary={`❤️ BP ${systolic}/${diastolic} mmHg`} />
      <WorkoutBlueprintModal isOpen={showDiabetesWorkoutModal} onClose={() => setShowDiabetesWorkoutModal(false)} bmi={25} goal="lose_weight" fitnessLevel="beginner" weight={75} selectedDay={diabetesWorkoutSelectedDay} onDayChange={setDiabetesWorkoutSelectedDay} onSave={() => setShowDiabetesWorkoutModal(false)} />
      <WorkoutBlueprintModal isOpen={showHtWorkoutModal} onClose={() => setShowHtWorkoutModal(false)} bmi={25} goal="lose_weight" fitnessLevel="beginner" weight={75} selectedDay={htWorkoutSelectedDay} onDayChange={setHtWorkoutSelectedDay} onSave={() => setShowHtWorkoutModal(false)} />
    </div>
  );
};

export default LabToPlanPage;
