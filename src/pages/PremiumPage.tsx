import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth, hasPremiumAccess } from '../context/AuthContext';
import { usePersistedState } from '../hooks/usePersistedState';
import AdPlaceholder from '../components/AdPlaceholder';
import Breadcrumbs from '../components/Breadcrumbs';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import CheckoutModal from '../components/CheckoutModal';
import MealPlanModal from '../components/MealPlanModal';
import CuisineRegionCards from '../components/CuisineRegionCards';
import WorkoutBlueprintModal from '../components/WorkoutBlueprintModal';
import { DaySelectorBar, PlanTabBar, MealCard, WorkoutCard, DayProgressHeader, StreakBar } from '../components/HealthPlanTemplate';
import {
  generate30DayPlan, getCheckInFields, computeAIAdjustments, computeStreak,
  buildCSVExport, buildEmailReport, triggerFoods, symptomOptions,
  type DayPlan, type CheckInField, type SymptomTrigger, type AIAdjustment, type StreakBadge,
} from '../utils/healthPlans';
import { type Cuisine } from '../utils/calculations_expanded';

/* ═══════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════ */
interface ConditionMeal { meal: string; calories: number; items: string[]; tips: string }
interface ConditionWorkout { exercise: string; sets: string; notes: string }
interface ConditionData { mealPlan: ConditionMeal[]; workout: ConditionWorkout[]; guidelines: string[] }
interface PatientProfile { age: number; weight: number; height: number }
interface LabValues { [param: string]: number }
interface Milestone { id: string; label: string; target: number; unit: string; currentValue: number; completed: boolean }
interface LabInputDef { key: string; label: string; unit: string; min: number; max: number; step: number; placeholder: number }
interface ProgressEntry { id: string; date: string; [key: string]: string | number }
type Tab = 'plan30' | 'checkin' | 'analytics' | 'guidelines';

/* ═══════════════════════════════════════════════════════════════════
   STATIC CONDITION DATA (condensed — same content as before)
   ═══════════════════════════════════════════════════════════════════ */
const premiumContent: Record<string, ConditionData> = {
  diabetes: {
    mealPlan: [{ meal: 'Breakfast', calories: 350, items: ['Steel-cut oatmeal (50g)', 'Walnuts (15g)', 'Blueberries (80g)', 'Cinnamon', 'Green tea'], tips: 'Low-GI base: soluble fiber slows glucose' }, { meal: 'Snack AM', calories: 120, items: ['Greek yogurt (100g)', 'Almonds (8)', 'Chia seeds (1 tsp)'], tips: 'Protein + fat slows carb absorption' }, { meal: 'Lunch', calories: 430, items: ['Grilled chicken (130g)', 'Quinoa (120g)', 'Roasted vegetables', 'Olive oil dressing'], tips: 'Balanced macros, low-GI grains' }, { meal: 'Snack PM', calories: 100, items: ['Apple slices (100g)', 'Peanut butter (1 tbsp)'], tips: 'Fruit + fat prevents glucose spikes' }, { meal: 'Dinner', calories: 380, items: ['Baked salmon (120g)', 'Sweet potato (100g)', 'Steamed broccoli', 'Herbal tea'], tips: 'Omega-3 supports insulin sensitivity' }],
    workout: [{ exercise: 'Brisk Walking', sets: '30 min', notes: 'Post-meal walks lower blood sugar 15-20%' }, { exercise: 'Resistance Bands', sets: '20 min', notes: 'Muscle contraction improves glucose uptake' }, { exercise: 'Cycling', sets: '25 min', notes: 'Sustained cardio improves insulin sensitivity' }, { exercise: 'Yoga', sets: '15 min', notes: 'Reduces cortisol, stabilizes blood sugar' }],
    guidelines: ['GI < 55 for carbs', 'Carb counting: 30-45g/meal', 'Fasting glucose 80-130 mg/dL', 'Pair carbs with protein/fat', 'HbA1c every 3 months (target < 7%)', 'Daily foot checks, annual eye exams', 'Limit added sugars and refined grains', 'Consistent meal timing'],
  },
  hypertension: {
    mealPlan: [{ meal: 'Breakfast', calories: 340, items: ['Oatmeal (50g) + flaxseeds', 'Banana (80g)', 'Almonds (10g)', 'Low-fat milk (200ml)'], tips: 'DASH: high potassium, low sodium' }, { meal: 'Snack AM', calories: 110, items: ['Carrot sticks (100g)', 'Hummus (2 tbsp)', 'Crackers (4)'], tips: 'Magnesium-rich plant snack' }, { meal: 'Lunch', calories: 440, items: ['Grilled chicken (120g)', 'Brown rice (150g)', 'Spinach & tomatoes', 'Olive oil (1 tbsp)'], tips: 'Sodium < 150mg per meal' }, { meal: 'Snack PM', calories: 100, items: ['Berries (100g)', 'Pumpkin seeds (1 tbsp)'], tips: 'Anthocyanins for vascular health' }, { meal: 'Dinner', calories: 370, items: ['Baked cod (120g)', 'Sweet potato (100g)', 'Kale & beet salad', 'Herbal tea'], tips: 'Nitrate-rich beets support vasodilation' }],
    workout: [{ exercise: 'Brisk Walking', sets: '30 min', notes: 'Lowers BP by 5-8 mmHg' }, { exercise: 'Swimming', sets: '25 min', notes: 'Joint-friendly, reduces arterial stiffness' }, { exercise: 'Cycling', sets: '20 min', notes: 'Improves endothelial function' }, { exercise: 'Yoga', sets: '15 min', notes: 'Reduces sympathetic activity' }],
    guidelines: ['DASH diet principles', 'Sodium < 1500mg/day', 'Increase potassium intake', 'Limit alcohol', 'Target BP < 130/80', 'Aerobic 150 min/week', 'BMI 18.5-24.9', 'Regular home BP monitoring'],
  },
  ibs: {
    mealPlan: [{ meal: 'Breakfast', calories: 320, items: ['GF oatmeal (40g)', 'Blueberries (50g)', 'Pumpkin seeds (1 tbsp)', 'Peppermint tea'], tips: 'Low-FODMAP start' }, { meal: 'Snack', calories: 150, items: ['Rice cakes (2)', 'Peanut butter (1 tbsp)', 'Green tea'], tips: 'Small portions reduce gut load' }, { meal: 'Lunch', calories: 420, items: ['Grilled chicken (130g)', 'White rice (150g)', 'Carrots & zucchini', 'Olive oil (1 tbsp)'], tips: 'Avoid high-FODMAP vegetables' }, { meal: 'Dinner', calories: 380, items: ['Baked salmon (120g)', 'Quinoa (100g)', 'Roasted bell peppers', 'Ginger tea'], tips: 'Cook vegetables well' }],
    workout: [{ exercise: 'Walking', sets: '30 min', notes: 'Gentle pace, reduces stress' }, { exercise: 'Yoga', sets: '20 min', notes: 'Cat-Cow, Child\'s Pose relieve tension' }, { exercise: 'Deep Breathing', sets: '10 min', notes: 'Activates parasympathetic system' }, { exercise: 'Light Swimming', sets: '20 min', notes: 'Non-impact, full-body' }],
    guidelines: ['Low-FODMAP for 2-6 weeks then reintroduce', 'Eat at regular times', 'Chew food thoroughly', 'Limit caffeine and alcohol', 'Manage stress with meditation', 'Identify personal trigger foods', 'Soluble fiber (psyllium)', 'Peppermint oil capsules'],
  },
  gout: {
    mealPlan: [{ meal: 'Breakfast', calories: 340, items: ['Whole grain toast (2)', 'Scrambled eggs (2)', 'Strawberries (100g)', 'Skim milk (200ml)'], tips: 'Low-purine breakfast' }, { meal: 'Snack', calories: 130, items: ['Cherries (100g)', 'Almonds (10)'], tips: 'Cherries reduce uric acid' }, { meal: 'Lunch', calories: 430, items: ['Grilled chicken (120g)', 'Brown rice (150g)', 'Mixed salad', 'Lemon water'], tips: 'Avoid organ meats, shellfish' }, { meal: 'Dinner', calories: 390, items: ['Baked cod (130g)', 'Steamed broccoli', 'Sweet potato (100g)', 'Herbal tea'], tips: 'Drink 8+ glasses water daily' }],
    workout: [{ exercise: 'Swimming', sets: '25 min', notes: 'Joint-friendly, low impact' }, { exercise: 'Cycling', sets: '20 min', notes: 'Avoid high resistance' }, { exercise: 'ROM Exercises', sets: '15 min', notes: 'Gentle joint movements' }, { exercise: 'Stretching', sets: '10 min', notes: 'Focus on ankles and knees' }],
    guidelines: ['Limit purine-rich foods', 'Drink 2-3L water daily', 'Avoid alcohol, especially beer', 'Cherries reduce flare risk 35%', 'Gradual weight loss only', 'Vitamin C 500mg/day', 'Anti-inflammatory foods', 'Monitor uric acid levels'],
  },
  kidney: {
    mealPlan: [{ meal: 'Breakfast', calories: 330, items: ['White bread (2)', 'Cream cheese (2 tbsp)', 'Blueberries (50g)', 'Herbal tea'], tips: 'Limit potassium and phosphorus' }, { meal: 'Snack', calories: 120, items: ['Unsalted crackers (6)', 'Cucumber slices'], tips: 'Low-sodium snack' }, { meal: 'Lunch', calories: 400, items: ['Grilled chicken (100g)', 'White pasta (120g)', 'Green beans', 'Olive oil dressing'], tips: 'Control protein per doctor' }, { meal: 'Dinner', calories: 370, items: ['Egg whites (3)', 'White rice (100g)', 'Lettuce & cabbage salad', 'Apple (small)'], tips: 'Low-potassium fruits' }],
    workout: [{ exercise: 'Walking', sets: '20-30 min', notes: 'Moderate pace, daily' }, { exercise: 'Light Resistance Bands', sets: '15 min', notes: 'Upper and lower body' }, { exercise: 'Stretching', sets: '10 min', notes: 'Full body flexibility' }, { exercise: 'Deep Breathing', sets: '5 min', notes: 'Reduce fluid retention stress' }],
    guidelines: ['Phosphorus & potassium restrictions', 'Sodium < 2000mg/day', 'Fluid monitoring', 'Protein per CKD stage', 'Avoid phosphorus additives', 'Regular lab monitoring', 'Limit high-potassium foods', 'Vitamin D and iron as prescribed'],
  },
  liver: {
    mealPlan: [{ meal: 'Breakfast', calories: 310, items: ['Oatmeal (40g) + banana', 'Flaxseeds (1 tbsp)', 'Green tea', 'Walnuts (5)'], tips: 'Liver-friendly, high fiber' }, { meal: 'Snack', calories: 140, items: ['Apple slices', 'Almond butter (1 tbsp)'], tips: 'Antioxidant-rich' }, { meal: 'Lunch', calories: 420, items: ['Grilled fish (120g)', 'Lentils (100g)', 'Roasted vegetables', 'Lemon dressing'], tips: 'Lean protein, plant fiber' }, { meal: 'Dinner', calories: 360, items: ['Turkey breast (110g)', 'Sweet potato (100g)', 'Steamed kale', 'Turmeric milk'], tips: 'Anti-inflammatory foods' }],
    workout: [{ exercise: 'Walking', sets: '25 min', notes: 'Gentle, consistent' }, { exercise: 'Yoga', sets: '20 min', notes: 'Reduce stress, circulation' }, { exercise: 'Light Cycling', sets: '15 min', notes: 'Low resistance' }, { exercise: 'Tai Chi', sets: '15 min', notes: 'Balance and mindfulness' }],
    guidelines: ['Zero alcohol', 'Limit processed/fried foods', 'Antioxidant-rich daily', 'Protein 1.0-1.5 g/kg/day', 'No sugary drinks', 'Avoid hepatotoxins', 'Coffee 2-3 cups/day (NAFLD)', 'Regular LFT monitoring'],
  },
  cholesterol: {
    mealPlan: [{ meal: 'Breakfast', calories: 330, items: ['Steel-cut oats (50g)', 'Chia seeds (1 tbsp)', 'Banana (sliced)', 'Cinnamon'], tips: 'Oats lower LDL' }, { meal: 'Snack', calories: 130, items: ['Walnuts (7)', 'Pear'], tips: 'Omega-3 from walnuts' }, { meal: 'Lunch', calories: 440, items: ['Grilled salmon (130g)', 'Quinoa (100g)', 'Avocado (50g)', 'Green salad'], tips: 'Omega-3 + healthy fats' }, { meal: 'Dinner', calories: 380, items: ['Bean chili', 'Brown rice (100g)', 'Steamed broccoli', 'Olive oil (1 tsp)'], tips: 'Soluble fiber lowers cholesterol' }],
    workout: [{ exercise: 'Brisk Walking', sets: '30 min', notes: 'Raises HDL' }, { exercise: 'Resistance Training', sets: '20 min', notes: '3x/week, full body' }, { exercise: 'Cycling', sets: '25 min', notes: 'Moderate intensity' }, { exercise: 'Jump Rope', sets: '10 min', notes: 'Cardiovascular health' }],
    guidelines: ['Saturated fat < 7% calories', 'Soluble fiber 10-25g/day', 'Fatty fish 2-3x/week', 'Exercise 150 min/week', 'Plant sterols 2g/day', 'LDL < 100 mg/dL', 'Eliminate trans fats', 'Niacin/fiber supplements'],
  },
  thyroid: {
    mealPlan: [{ meal: 'Breakfast', calories: 340, items: ['Eggs (2) + whole grain toast', 'Brazil nuts (2)', 'Strawberries (80g)', 'Lemon water'], tips: 'Selenium supports thyroid' }, { meal: 'Snack', calories: 140, items: ['Greek yogurt (100g)', 'Pumpkin seeds (1 tbsp)'], tips: 'Zinc and selenium-rich' }, { meal: 'Lunch', calories: 430, items: ['Chicken breast (120g)', 'Brown rice (150g)', 'Roasted seaweed', 'Mixed greens'], tips: 'Iodine from seaweed (moderate)' }, { meal: 'Dinner', calories: 370, items: ['Cod fillet (120g)', 'Baked potato (100g)', 'Steamed asparagus', 'Olive oil'], tips: 'Iodine-rich fish' }],
    workout: [{ exercise: 'Walking', sets: '30 min', notes: 'Boosts metabolism gently' }, { exercise: 'Yoga', sets: '20 min', notes: 'Supports adrenal health' }, { exercise: 'Light Weights', sets: '20 min', notes: 'Combats thyroid fatigue' }, { exercise: 'Swimming', sets: '20 min', notes: 'Energizing without overexertion' }],
    guidelines: ['Iodine 150mcg, Selenium 55mcg/day', 'Cook cruciferous vegetables', 'Take meds on empty stomach', 'Manage stress (cortisol suppresses)', 'TSH/T3/T4 every 6-8 weeks', 'Selenium reduces thyroid antibodies', 'Check ferritin levels', 'Separate calcium/iron 4h from meds'],
  },
};

const conditions = [
  { id: 'diabetes', name: 'Diabetes Management', icon: '🩸', color: 'from-rose-500 to-red-600', isFree: true, features: ['Glycemic index control', 'Carb counting', 'Blood glucose monitoring', 'Low-GI meal plans'], guidance: [{ icon: '📉', title: 'Glycemic Index Control', desc: 'Meals prioritize low-GI carbs (GI < 55) for sustained glucose release.' }, { icon: '🔢', title: 'Carb Counting', desc: '30-45g per main meal, 15-20g per snack for insulin dosing.' }, { icon: '🎯', title: 'Glucose Targets', desc: 'Fasting 80-130, post-meal < 180 mg/dL, HbA1c < 7%.' }, { icon: '🥗', title: 'Meal Architecture', desc: 'Fiber-rich complex carbs + lean protein + healthy fat + non-starchy veg.' }, { icon: '🏃', title: 'Exercise', desc: 'Post-meal walks reduce blood sugar 15-20%. Resistance training 3x/week.' }, { icon: '🛡️', title: 'Complication Prevention', desc: 'Daily foot checks, annual eye exams, kidney monitoring.' }] },
  { id: 'hypertension', name: 'Hypertension', icon: '❤️', color: 'from-red-500 to-rose-500', isFree: true, features: ['DASH diet principles', 'Sodium restriction', 'BP monitoring', 'Aerobic exercise'], guidance: [{ icon: '🥬', title: 'DASH Diet', desc: 'Lowers systolic BP 8-14 mmHg — comparable to medication.' }, { icon: '🧂', title: 'Sodium Restriction', desc: '< 1500mg/day ideal, < 2300mg acceptable.' }, { icon: '📏', title: 'BP Monitoring', desc: 'Home monitoring with validated cuff, 2-3 readings.' }, { icon: '⚖️', title: 'K+/Mg+ Balance', desc: 'Potassium 3500-5000mg/day, Magnesium 310-420mg/day.' }, { icon: '🚴', title: 'Aerobic Protocol', desc: '150 min/week moderate activity lowers BP 5-8 mmHg.' }, { icon: '🧘', title: 'Stress Management', desc: 'Mindfulness, 7-9h sleep, weight loss reduces BP.' }] },
  { id: 'ibs', name: 'IBS', icon: '🩺', color: 'from-purple-500 to-indigo-500', isFree: false, features: ['Low-FODMAP plan', 'Trigger identification', 'Gut-friendly exercise', 'Stress management'], guidance: [{ icon: '🧬', title: 'Low-FODMAP', desc: 'Gold-standard: eliminate 2-6 weeks, reintroduce, personalize.' }, { icon: '🔍', title: 'Trigger Foods', desc: 'Track food, symptoms, timing in elimination diary.' }, { icon: '🧠', title: 'Gut-Brain Axis', desc: 'Stress worsens symptoms. Hypnotherapy and breathing help.' }, { icon: '🌿', title: 'Probiotics', desc: 'L. plantarum, B. infantis have clinical evidence.' }, { icon: '🧘', title: 'Exercise', desc: 'Gentle movement improves motility. Cat-Cow, Child\'s Pose.' }, { icon: '🍵', title: 'Beverages', desc: 'Peppermint oil, ginger tea. Limit caffeine.' }] },
  { id: 'gout', name: 'Gout Management', icon: '🦴', color: 'from-blue-500 to-cyan-500', isFree: false, features: ['Purine-restricted diet', 'Anti-inflammatory foods', 'Joint-safe exercises', 'Hydration plan'], guidance: [{ icon: '🧪', title: 'Purine Diet', desc: '< 200mg purines/day. Plant proteins preferred.' }, { icon: '🍒', title: 'Anti-Inflammatory', desc: 'Cherries reduce flare risk 35%. Turmeric, ginger, omega-3.' }, { icon: '💧', title: 'Hydration', desc: '2-3L water daily. Avoid beer and fructose drinks.' }, { icon: '🏃', title: 'Joint-Safe Exercise', desc: 'Low-impact: swimming, cycling, ROM exercises.' }, { icon: '⚖️', title: 'Weight Management', desc: 'Gradual loss 0.5-1 kg/week. Rapid loss triggers flares.' }, { icon: '💊', title: 'Nutrients', desc: 'Vitamin C 500mg/day, low-fat dairy.' }] },
  { id: 'kidney', name: 'CKD', icon: '🫘', color: 'from-green-500 to-emerald-500', isFree: false, features: ['Phosphorus & potassium limits', 'Protein management', 'Sodium restriction', 'Renal meal plans'], guidance: [{ icon: '⚗️', title: 'Mineral Management', desc: 'Damaged kidneys can\'t excrete phosphorus/potassium.' }, { icon: '🥩', title: 'Protein by Stage', desc: 'Stages 3-5: 0.6-0.8 g/kg/day. Dialysis: 1.0-1.2.' }, { icon: '🧂', title: 'Sodium', desc: '< 2000mg/day for BP and fluid control.' }, { icon: '💧', title: 'Fluid', desc: 'May need restriction in advanced CKD.' }, { icon: '🔬', title: 'Lab Tracking', desc: 'Creatinine, BUN, GFR, electrolytes regularly.' }, { icon: '🥗', title: 'Renal Meals', desc: 'Low-K vegetables, low-P carbs, controlled protein.' }] },
  { id: 'liver', name: 'Liver Health', icon: '🫁', color: 'from-amber-500 to-orange-500', isFree: false, features: ['Liver-supportive nutrition', 'Alcohol elimination', 'Detox-friendly meals', 'Gentle exercise'], guidance: [{ icon: '🚫', title: 'Alcohol Abstinence', desc: 'Hepatotoxic. Elimination plan provided.' }, { icon: '🌿', title: 'Hepatoprotective', desc: 'Coffee 2-3 cups/day, Vitamin E, omega-3, Mediterranean.' }, { icon: '⚖️', title: 'Protein Balance', desc: '1.0-1.5 g/kg/day, small frequent meals.' }, { icon: '💊', title: 'Med Safety', desc: 'Acetaminophen < 2g/day. Avoid kava, comfrey.' }, { icon: '🏃', title: 'Exercise', desc: 'Reduces liver fat 20-30%. 150 min/week.' }, { icon: '🔬', title: 'Labs', desc: 'ALT, AST, GGT, bilirubin, albumin, INR.' }] },
  { id: 'cholesterol', name: 'High Cholesterol', icon: '🫀', color: 'from-pink-500 to-red-400', isFree: false, features: ['Heart-healthy meals', 'Fat reduction', 'Omega-3 guide', 'Cardio exercise'], guidance: [{ icon: '📉', title: 'LDL/HDL Targets', desc: 'LDL < 100, HDL > 40/50, TG < 150.' }, { icon: '🫒', title: 'Fat Elimination', desc: 'Saturated < 7%, trans fats zero.' }, { icon: '🐟', title: 'Omega-3 & Fiber', desc: 'Fish 2-3x/week, soluble fiber 10-25g/day.' }, { icon: '🥜', title: 'Plant Sterols', desc: '2g/day blocks absorption, lowers LDL 5-15%.' }, { icon: '🚴', title: 'Cardio', desc: '150 min/week raises HDL 5-10%.' }, { icon: '📊', title: 'Risk Assessment', desc: 'Framingham Risk Score, statin indications.' }] },
  { id: 'thyroid', name: 'Thyroid Disorders', icon: '🦋', color: 'from-teal-500 to-green-500', isFree: false, features: ['Iodine management', 'Metabolism-boosting foods', 'Energy-safe workouts', 'Selenium & zinc'], guidance: [{ icon: '🧬', title: 'Iodine Balance', desc: '150 mcg/day RDA. Deficiency → hypothyroidism.' }, { icon: '🇧🇷', title: 'Selenium', desc: '2 Brazil nuts/day. 200mcg reduces antibodies 40-60%.' }, { icon: '🥦', title: 'Goitrogens', desc: 'Cooking reduces 80-90% of goitrogens.' }, { icon: '💊', title: 'Med Timing', desc: 'Levothyroxine 30-60 min before food.' }, { icon: '🏋️', title: 'Exercise', desc: 'Progressive: gentle → resistance. Avoid overexertion.' }, { icon: '🔬', title: 'Labs', desc: 'TSH 0.5-2.5 optimal. T3, T4, antibodies.' }] },
];

const labInputDefs: Record<string, LabInputDef[]> = {
  diabetes: [{ key: 'hba1c', label: 'HbA1c', unit: '%', min: 3, max: 15, step: 0.1, placeholder: 6.5 }, { key: 'fasting', label: 'Fasting Glucose', unit: 'mg/dL', min: 40, max: 500, step: 1, placeholder: 110 }, { key: 'postprandial', label: 'Post-meal Glucose', unit: 'mg/dL', min: 40, max: 500, step: 1, placeholder: 155 }],
  hypertension: [{ key: 'systolic', label: 'Systolic BP', unit: 'mmHg', min: 60, max: 250, step: 1, placeholder: 135 }, { key: 'diastolic', label: 'Diastolic BP', unit: 'mmHg', min: 30, max: 150, step: 1, placeholder: 85 }],
  liver: [{ key: 'alt', label: 'ALT', unit: 'U/L', min: 0, max: 500, step: 1, placeholder: 30 }, { key: 'ast', label: 'AST', unit: 'U/L', min: 0, max: 500, step: 1, placeholder: 28 }],
  cholesterol: [{ key: 'ldl', label: 'LDL', unit: 'mg/dL', min: 20, max: 300, step: 1, placeholder: 120 }, { key: 'hdl', label: 'HDL', unit: 'mg/dL', min: 10, max: 120, step: 1, placeholder: 50 }, { key: 'triglycerides', label: 'Triglycerides', unit: 'mg/dL', min: 30, max: 800, step: 1, placeholder: 140 }],
  kidney: [{ key: 'creatinine', label: 'Creatinine', unit: 'mg/dL', min: 0.3, max: 15, step: 0.1, placeholder: 1.0 }, { key: 'gfr', label: 'GFR', unit: 'mL/min', min: 5, max: 150, step: 1, placeholder: 75 }],
  thyroid: [{ key: 'tsh', label: 'TSH', unit: 'mIU/L', min: 0.01, max: 30, step: 0.01, placeholder: 2.0 }, { key: 'freeT3', label: 'Free T3', unit: 'pg/mL', min: 0.5, max: 10, step: 0.1, placeholder: 3.0 }],
  gout: [{ key: 'uricAcid', label: 'Uric Acid', unit: 'mg/dL', min: 1, max: 20, step: 0.1, placeholder: 6.5 }],
};

/* ═══════════════════════════════════════════════════════════════════
   CONFLICTS & SCORES (retained from previous version)
   ═══════════════════════════════════════════════════════════════════ */
const conflictPairs: Record<string, { warning: string; icon: string; severity: 'warning' | 'danger' | 'info' }> = {
  'hypertension+kidney': { warning: 'DASH diet may be too high in potassium for CKD stage 3+. Consult nephrologist.', icon: '⚠️', severity: 'warning' },
  'diabetes+kidney': { warning: 'CKD protein restriction may conflict with diabetes plans. Prioritize CKD limits.', icon: '⚠️', severity: 'warning' },
  'hypertension+cholesterol': { warning: 'Positive synergy: DASH and cholesterol management share dietary principles.', icon: '✅', severity: 'info' },
  'liver+diabetes': { warning: 'Impaired liver function may affect metformin metabolism. Consult hepatologist.', icon: '⚠️', severity: 'warning' },
  'liver+kidney': { warning: 'Both require careful protein/medication management. Strict supervision needed.', icon: '🚨', severity: 'danger' },
  'cholesterol+gout': { warning: 'Some statins may increase uric acid. Monitor flare frequency.', icon: '⚠️', severity: 'warning' },
  'diabetes+hypertension': { warning: 'Coexist frequently. BP target for diabetics: < 130/80 mmHg.', icon: 'ℹ️', severity: 'info' },
  'diabetes+cholesterol': { warning: 'Diabetes increases CV risk. LDL target may need < 70 mg/dL.', icon: 'ℹ️', severity: 'info' },
};

function detectConflicts(active: Set<string>) {
  const result: Array<{ pair: string; warning: string; icon: string; severity: string }> = [];
  const arr = Array.from(active);
  for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) {
    const rule = conflictPairs[`${arr[i]}+${arr[j]}`] || conflictPairs[`${arr[j]}+${arr[i]}`];
    if (rule) result.push({ pair: `${arr[i]} ↔ ${arr[j]}`, ...rule });
  }
  return result;
}

function calcBMI(w: number, h: number) { return +(w / ((h / 100) ** 2)).toFixed(1); }

/* ═══════════════════════════════════════════════════════════════════
   STORAGE HELPERS
   ═══════════════════════════════════════════════════════════════════ */
const loadJSON = <T,>(key: string, fallback: T): T => { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; } };
const saveJSON = (key: string, val: unknown) => localStorage.setItem(key, JSON.stringify(val));

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
const PremiumPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const isUnlocked = hasPremiumAccess(user);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedConditions, setSelectedConditions] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<Tab>('plan30');
  const detailRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<PatientProfile>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('hc_calc_profile') || 'null');
      if (stored && stored.age && stored.weightKg && stored.heightCm) {
        return { age: stored.age, weight: stored.weightKg, height: stored.heightCm };
      }
    } catch {}
    return { age: 45, weight: 75, height: 170 };
  });
  const [labValues, setLabValues] = useState<Record<string, LabValues>>({});
  const [profileApplied, setProfileApplied] = useState(false);

  const [plans30, setPlans30] = useState<Record<string, DayPlan[]>>({});
  const [activeDay, setActiveDay] = useState(1);
  const [selectedPlanTab, setSelectedPlanTab] = useState<'meals' | 'workout'>('meals');
  const [mealCompletions, setMealCompletions] = usePersistedState<Record<string, Record<number, Record<number, boolean>>>>({}, 'hc_premium_meals');
  const [workoutCompletions, setWorkoutCompletions] = usePersistedState<Record<string, Record<number, Record<number, boolean>>>>({}, 'hc_premium_workouts');
  const [showFullPlan, setShowFullPlan] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [workoutSelectedDay, setWorkoutSelectedDay] = useState(0);
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine>(() => {
    const saved = localStorage.getItem('hc_selectedCuisine');
    return (saved as Cuisine) || 'egyptian';
  });

  const [checkIns, setCheckIns] = useState<Record<string, Array<Record<string, string | number>>>>({});
  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [checkInValues, setCheckInValues] = useState<Record<string, number>>({});

  const [milestones, setMilestones] = useState<Record<string, Milestone[]>>({});
  const [customMilestoneText, setCustomMilestoneText] = useState('');
  const [customMilestoneTarget, setCustomMilestoneTarget] = useState('');
  const [customMilestoneUnit, setCustomMilestoneUnit] = useState('');

  const [symptomTriggers, setSymptomTriggers] = useState<Record<string, SymptomTrigger[]>>({});
  const [showTriggerForm, setShowTriggerForm] = useState(false);
  const [triggerSymptom, setTriggerSymptom] = useState('');
  const [triggerCause, setTriggerCause] = useState('');
  const [triggerSeverity, setTriggerSeverity] = useState(5);
  const [triggerNotes, setTriggerNotes] = useState('');

  const [aiAdjustments, setAiAdjustments] = useState<Record<string, AIAdjustment[]>>({});

  useEffect(() => {
    if (selectedConditions.size > 0 && detailRef.current)
      setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, [selectedConditions]);

  useEffect(() => {
    try {
      const bridge = JSON.parse(localStorage.getItem('hc_calculator_bridge') || 'null');
      if (bridge && bridge.age && bridge.weightKg && bridge.heightCm) {
        setProfile(prev => {
          if (prev.age === 45 && prev.weight === 75 && prev.height === 170) {
            return { age: bridge.age, weight: bridge.weightKg, height: bridge.heightCm };
          }
          return prev;
        });
      }
    } catch {}
  }, []);

  useEffect(() => {
    const loaded: Record<string, Array<Record<string, string | number>>> = {};
    const loadedSymptoms: Record<string, SymptomTrigger[]> = {};
    selectedConditions.forEach(cid => {
      loaded[cid] = loadJSON(`ac_checkins_${cid}`, []);
      loadedSymptoms[cid] = loadJSON(`ac_triggers_${cid}`, []);
    });
    setCheckIns(loaded);
    setSymptomTriggers(loadedSymptoms);
  }, [selectedConditions]);

  const firstSelected = selectedConditions.size > 0 ? Array.from(selectedConditions)[0] : null;
  const selectedInfo = firstSelected ? conditions.find(c => c.id === firstSelected) : null;
  const freeCount = conditions.filter(c => c.isFree).length;

  const handleCardClick = useCallback((id: string) => {
    const c = conditions.find(x => x.id === id);
    if (!c?.isFree && !isUnlocked) { setShowCheckout(true); return; }
    setSelectedConditions(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
    setActiveTab('plan30');
  }, [isUnlocked]);

  const handleApplyProfile = useCallback(() => {
    setProfileApplied(true);
    const newPlans: Record<string, DayPlan[]> = {};
    const newMilestones: Record<string, Milestone[]> = {};
    selectedConditions.forEach(cid => {
      newPlans[cid] = generate30DayPlan(cid, profile, labValues[cid] || {});
      const existing = loadJSON<Milestone[]>(`ac_milestones_${cid}`, []);
      newMilestones[cid] = existing.length > 0 ? existing : generateDefaultMilestones(cid, profile, labValues[cid] || {});
    });
    setPlans30(newPlans);
    setMilestones(prev => ({ ...prev, ...newMilestones }));

    const newAdjustments: Record<string, AIAdjustment[]> = {};
    selectedConditions.forEach(cid => {
      const weekEntries = (checkIns[cid] || []).slice(-7);
      if (weekEntries.length >= 3) {
        const plan = newPlans[cid];
        const targetCals = plan[0]?.meals.reduce((s, m) => s + m.calories, 0) || 2000;
        newAdjustments[cid] = computeAIAdjustments(cid, weekEntries, targetCals);
      }
    });
    setAiAdjustments(newAdjustments);
  }, [selectedConditions, profile, labValues, checkIns]);

  const currentPlan = firstSelected && plans30[firstSelected] ? plans30[firstSelected] : null;
  const currentDay = currentPlan ? currentPlan[activeDay - 1] : null;

  const togglePremiumMeal = useCallback((condId: string, dayIdx: number, mealIdx: number, done: boolean) => {
    setMealCompletions(prev => ({ ...prev, [condId]: { ...prev[condId], [dayIdx]: { ...(prev[condId]?.[dayIdx] || {}), [mealIdx]: done } } }));
  }, []);

  const togglePremiumWorkout = useCallback((condId: string, dayIdx: number, workoutIdx: number, done: boolean) => {
    setWorkoutCompletions(prev => ({ ...prev, [condId]: { ...prev[condId], [dayIdx]: { ...(prev[condId]?.[dayIdx] || {}), [workoutIdx]: done } } }));
  }, []);

  const handleCuisineChange = useCallback((cuisine: Cuisine) => {
    setSelectedCuisine(cuisine);
    localStorage.setItem('hc_selectedCuisine', cuisine);
    // Regenerate plans for all selected conditions with new cuisine
    const newPlans: Record<string, DayPlan[]> = {};
    selectedConditions.forEach(cid => {
      newPlans[cid] = generate30DayPlan(cid, profile, labValues[cid], cuisine);
    });
    setPlans30(newPlans);
  }, [selectedConditions, profile, labValues]);

  const checkInFields = firstSelected ? getCheckInFields(firstSelected) : [];
  const streak = firstSelected ? computeStreak((checkIns[firstSelected] || []).map(e => String(e.date || ''))) : { current: 0, longest: 0, badges: [] as StreakBadge[] };
  const hasTriggerFeature = firstSelected && ['ibs', 'gout', 'liver'].includes(firstSelected);

  const handleCheckIn = useCallback(() => {
    if (!firstSelected) return;
    const entry = { ...checkInValues, date: new Date().toLocaleDateString(), day: activeDay };
    const updated = [...(checkIns[firstSelected] || []), entry];
    setCheckIns(prev => ({ ...prev, [firstSelected]: updated }));
    saveJSON(`ac_checkins_${firstSelected}`, updated);
    setCheckInValues({});
    setShowCheckInForm(false);

    const weekEntries = updated.slice(-7);
    if (weekEntries.length >= 3 && currentPlan) {
      const targetCals = currentPlan[0]?.meals.reduce((s, m) => s + m.calories, 0) || 2000;
      setAiAdjustments(prev => ({ ...prev, [firstSelected]: computeAIAdjustments(firstSelected, weekEntries, targetCals) }));
    }
  }, [firstSelected, checkInValues, activeDay, checkIns, currentPlan]);

  const handleLogTrigger = useCallback(() => {
    if (!firstSelected || !triggerSymptom) return;
    const entry: SymptomTrigger = { id: Math.random().toString(36).slice(2, 9), date: new Date().toLocaleDateString(), symptom: triggerSymptom, severity: triggerSeverity, possibleCause: triggerCause, notes: triggerNotes };
    const updated = [...(symptomTriggers[firstSelected] || []), entry];
    setSymptomTriggers(prev => ({ ...prev, [firstSelected]: updated }));
    saveJSON(`ac_triggers_${firstSelected}`, updated);
    setShowTriggerForm(false);
    setTriggerSymptom(''); setTriggerCause(''); setTriggerSeverity(5); setTriggerNotes('');
  }, [firstSelected, triggerSymptom, triggerCause, triggerSeverity, triggerNotes, symptomTriggers]);

  const toggleMilestone = useCallback((cid: string, mid: string) => {
    setMilestones(prev => {
      const updated = { ...prev };
      if (updated[cid]) {
        updated[cid] = updated[cid].map(m => m.id === mid ? { ...m, completed: !m.completed } : m);
        saveJSON(`ac_milestones_${cid}`, updated[cid]);
      }
      return updated;
    });
  }, []);

  const addCustomMilestone = useCallback((cid: string) => {
    if (!customMilestoneText || !customMilestoneTarget) return;
    const ms: Milestone = { id: Math.random().toString(36).slice(2, 9), label: customMilestoneText, target: parseFloat(customMilestoneTarget), unit: customMilestoneUnit, currentValue: 0, completed: false };
    setMilestones(prev => {
      const updated = { ...prev, [cid]: [...(prev[cid] || []), ms] };
      saveJSON(`ac_milestones_${cid}`, updated[cid]);
      return updated;
    });
    setCustomMilestoneText(''); setCustomMilestoneTarget(''); setCustomMilestoneUnit('');
  }, [customMilestoneText, customMilestoneTarget, customMilestoneUnit]);

  const handlePrint = useCallback(() => { window.print(); }, []);

  const handleEmail = useCallback(() => {
    if (!firstSelected || !selectedInfo) return;
    const report = buildEmailReport(firstSelected, profile, checkIns[firstSelected] || [], streak);
    window.location.href = `mailto:?subject=${encodeURIComponent(`HealthCalc.ai — ${selectedInfo.name} 30-Day Report`)}&body=${encodeURIComponent(report)}`;
  }, [firstSelected, selectedInfo, profile, checkIns, streak]);

  const handleCSVExport = useCallback(() => {
    if (!firstSelected || !currentPlan) return;
    const csv = buildCSVExport(firstSelected, checkIns[firstSelected] || [], currentPlan);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `healthcalc_${firstSelected}_30day_report.csv`; a.click();
    URL.revokeObjectURL(url);
  }, [firstSelected, checkIns, currentPlan]);

  const conflicts = useMemo(() => detectConflicts(selectedConditions), [selectedConditions]);
  const scores = useMemo(() => {
    const s: Record<string, number> = {};
    selectedConditions.forEach(cid => { s[cid] = computeHealthScore(cid, profile, labValues[cid] || {}); });
    return s;
  }, [selectedConditions, profile, labValues]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} onSuccess={() => setShowCheckout(false)} price="$15/year" />
      <Breadcrumbs />

      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-amber-200 rounded-full" />
              <span className="text-xs font-medium text-amber-100">Advanced Health Suite</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">{t('module3Title')}</h1>
              <span className="badge bg-white/20 text-white text-[10px] font-bold">{freeCount} Free Modules</span>
            </div>
            <p className="text-amber-100 text-sm md:text-base leading-relaxed">30-day structured health journeys with AI-adaptive plans, daily tracking, and clinical export for 8 conditions.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {isUnlocked && (
          <div className="card bg-gradient-to-br from-sage-50 to-primary-50 border-sage-200/80 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center"><svg className="w-6 h-6 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
              <div>
                <h2 className="font-bold text-gray-900">Advanced Care Suite Active</h2>
                <p className="text-sm text-gray-500">Full access to all modules including {freeCount} free condition programs.</p>
              </div>
            </div>
          </div>
        )}

        <AdPlaceholder size="banner" className="mx-auto mb-8" />

        {conflicts.length > 0 && (
          <div className="mb-8 space-y-3 animate-fade-in">
            {conflicts.map((c, i) => (
              <div key={i} className={`rounded-2xl border p-4 ${c.severity === 'danger' ? 'bg-red-50 border-red-200 text-red-800' : c.severity === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
                <div className="flex items-start gap-3"><span className="text-lg shrink-0">{c.icon}</span><div><p className="font-bold text-sm mb-1">Cross-Condition Advisory</p><p className="text-xs leading-relaxed">{c.warning}</p></div></div>
              </div>
            ))}
          </div>
        )}

        {/* ─── Module Cards ─── */}
        <div className="mb-8"><h2 className="section-title mb-2">Condition Modules</h2><p className="section-subtitle">Select conditions to activate 30-day health journeys</p></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
          {conditions.map((condition, idx) => {
            const isSelected = selectedConditions.has(condition.id);
            return (
              <button key={condition.id} type="button" onClick={() => handleCardClick(condition.id)}
                className={`text-left relative overflow-hidden cursor-pointer bg-white rounded-2xl shadow-card border border-gray-100/80 p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 stagger-${Math.min(idx + 1, 5)} ${isSelected ? 'ring-2 ring-amber-400 shadow-card-hover -translate-y-0.5' : ''}`}>
                <div className="absolute top-3 right-3">
                  {isSelected ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700">✓ Active</span>
                    : condition.isFree ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200/60">Free</span>
                    : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-600 border border-amber-200/60">🔒 Premium</span>}
                </div>
                <div className={`w-14 h-14 bg-gradient-to-br ${condition.color} rounded-2xl flex items-center justify-center mb-4 text-white text-2xl shadow-sm`}>{condition.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3 pr-16">{condition.name}</h3>
                <ul className="space-y-2 mb-3">
                  {condition.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600"><span className="w-4 h-4 bg-sage-100 rounded-full flex items-center justify-center shrink-0"><svg className="w-2.5 h-2.5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></span>{feat}</li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-gray-100 text-center">
                  {isSelected ? <span className="text-xs text-amber-600 font-semibold">Click to deactivate ↑</span> : <span className="text-xs text-primary-600 font-semibold">Click to activate →</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── Expanded Panel ─── */}
        {selectedConditions.size > 0 && firstSelected && selectedInfo && (
          <div ref={detailRef} className="animate-fade-in space-y-6 mb-10 scroll-mt-4">
            {selectedConditions.size > 1 && (
              <div className="flex flex-wrap gap-2">
                {Array.from(selectedConditions).map(cid => {
                  const info = conditions.find(c => c.id === cid);
                  return <button key={cid} type="button" onClick={() => setSelectedConditions(prev => { const n = new Set([cid]); prev.forEach(p => { if (p !== cid) n.add(p); }); return n; })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${cid === firstSelected ? 'bg-primary-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{info?.icon} {info?.name}</button>;
                })}
              </div>
            )}

            <div className="card bg-gradient-to-br from-primary-50 to-sage-50 border-primary-200/80">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedInfo.icon}</span>
                  <div><h3 className="font-bold text-gray-900 text-lg">{selectedInfo.name}</h3>
                    <p className="text-sm text-gray-500">30-Day Health Journey {profileApplied && <span className="text-sage-600 font-medium">· Customized</span>}</p></div>
                </div>
                <div className="flex items-center gap-2 no-print">
                  <button onClick={handlePrint} className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all shadow-sm flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>Print</button>
                  <button onClick={handleEmail} className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all shadow-sm flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>Email</button>
                  <button onClick={handleCSVExport} className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all shadow-sm flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>CSV Export</button>
                  <button onClick={() => setSelectedConditions(new Set())} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all shrink-0"><svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
            </div>

            {/* ─── Patient Profile ─── */}
            <div className="card bg-gradient-to-br from-gray-50 to-white border-gray-200/80 animate-fade-in">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><span className="text-lg">👤</span> Patient Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Age</label><input type="number" value={profile.age} onChange={e => { setProfile(p => ({ ...p, age: +e.target.value })); setProfileApplied(false); }} className="input-field-lg w-full" min={1} max={120} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Weight (kg)</label><input type="number" value={profile.weight} onChange={e => { setProfile(p => ({ ...p, weight: +e.target.value })); setProfileApplied(false); }} className="input-field-lg w-full" min={20} max={300} step={0.5} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Height (cm)</label><input type="number" value={profile.height} onChange={e => { setProfile(p => ({ ...p, height: +e.target.value })); setProfileApplied(false); }} className="input-field-lg w-full" min={100} max={250} /></div>
              </div>
              {Array.from(selectedConditions).map(cid => {
                const defs = labInputDefs[cid]; if (!defs) return null;
                const info = conditions.find(c => c.id === cid);
                return (
                  <div key={cid} className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2"><span>{info?.icon}</span> {info?.name} — Lab Values</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {defs.map(d => (
                        <div key={d.key}><label className="block text-xs font-semibold text-gray-600 mb-1">{d.label} ({d.unit})</label>
                          <input type="number" step={d.step} min={d.min} max={d.max} value={labValues[cid]?.[d.key] ?? d.placeholder} onChange={e => { setLabValues(prev => ({ ...prev, [cid]: { ...prev[cid], [d.key]: +e.target.value } })); setProfileApplied(false); }} className="input-field-lg w-full" /></div>
                      ))}
                    </div>
                  </div>
                );
              })}
              <div className="mt-4 flex items-center gap-3">
                <button onClick={handleApplyProfile} className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-all shadow-sm">Generate 30-Day Plan</button>
                {profileApplied && <span className="text-xs text-sage-600 font-medium flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Plans generated &amp; customized</span>}
              </div>
              {profileApplied && (
                <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from(selectedConditions).map(cid => {
                    const sc = scores[cid] ?? 0; const info = conditions.find(c => c.id === cid);
                    const color = sc >= 70 ? 'text-emerald-600' : sc >= 40 ? 'text-amber-600' : 'text-red-600';
                    return (
                      <div key={cid} className={`rounded-2xl border p-4 ${sc >= 70 ? 'bg-emerald-50 border-emerald-200' : sc >= 40 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14 shrink-0">
                            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-200" /><circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray={`${sc} ${100 - sc}`} strokeLinecap="round" className={color} /></svg>
                            <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${color}`}>{sc}%</span>
                          </div>
                          <div><p className="text-xs font-bold text-gray-900">{info?.icon} {info?.name}</p><p className={`text-[10px] font-semibold ${color}`}>Health Score</p></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ─── Streak Badge Bar ─── */}
            {profileApplied && (
              <div className="card">
                <div className="flex items-center justify-between mb-3">
                  <div><p className="font-bold text-gray-900 text-sm flex items-center gap-2"><span>🔥</span> Check-In Streak</p><p className="text-[10px] text-gray-500">Current: {streak.current} days · Longest: {streak.longest} days</p></div>
                  <div className="flex gap-1.5">{streak.badges.map(b => (
                    <span key={b.id} title={`${b.label}: ${b.description}`} className={`text-lg ${b.earned ? '' : 'opacity-30 grayscale'}`}>{b.icon}</span>
                  ))}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2"><div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (streak.current / 30) * 100)}%` }} /></div>
                  <span className="text-[10px] font-bold text-gray-500">{streak.current}/30</span>
                </div>
              </div>
            )}

            {/* ─── AI Auto-Adjustment Alerts ─── */}
            {profileApplied && aiAdjustments[firstSelected] && aiAdjustments[firstSelected].length > 0 && (
              <div className="space-y-2 animate-fade-in">
                {aiAdjustments[firstSelected].map((adj, i) => (
                  <div key={i} className={`rounded-2xl border p-3 flex items-start gap-3 ${adj.direction === 'decrease' ? 'bg-amber-50 border-amber-200' : adj.direction === 'increase' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                    <span className="text-lg shrink-0">🤖</span>
                    <div><p className="text-xs font-bold text-gray-900">AI Auto-Adjustment: {adj.type.charAt(0).toUpperCase() + adj.type.slice(1)}</p>
                      <p className="text-[11px] text-gray-600">{adj.reason}</p>
                      <p className={`text-[10px] font-semibold mt-1 ${adj.direction === 'decrease' ? 'text-amber-700' : adj.direction === 'increase' ? 'text-blue-700' : 'text-gray-600'}`}>
                        {adj.direction === 'decrease' ? '↓' : adj.direction === 'increase' ? '↑' : '='} {adj.type} {adj.adjustment > 0 ? '+' : ''}{adj.adjustment}{adj.type === 'calories' ? ' kcal' : adj.type === 'sodium' ? ' mg' : adj.type === 'carbs' ? 'g' : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─── Main Tabs ─── */}
            <div className="toggle-group flex flex-wrap gap-1">
              {([ { key: 'plan30' as Tab, label: '📅 30-Day Plan' }, { key: 'checkin' as Tab, label: '✅ Daily Check-In' }, { key: 'analytics' as Tab, label: '📊 Analytics & Streaks' }, { key: 'guidelines' as Tab, label: '📋 Guidelines' } ]).map(tab => (
                <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} className={activeTab === tab.key ? 'toggle-btn-active' : 'toggle-btn-inactive'}>{tab.label}</button>
              ))}
            </div>

            {/* ═══════ 30-DAY PLAN TAB ═══════ */}
            {activeTab === 'plan30' && currentPlan && (
              <div className="space-y-5 animate-fade-in">
                <DaySelectorBar
                  days={30}
                  activeDay={activeDay}
                  onSelect={setActiveDay}
                  checkedDays={checkIns[firstSelected]?.map(e => Number(e.day)).filter(Boolean) || []}
                  label={`${selectedInfo.name} — 30-Day Plan`}
                  subtitle={`${currentDay?.phase} · ${currentDay?.dailyGoal}`}
                />

                {/* Cuisine Selector */}
                <div className="card p-4">
                  <label className="text-xs font-bold text-gray-500 mb-2 block">🍽️ {t('chooseCuisine')}</label>
                  <CuisineRegionCards selected={selectedCuisine} onChange={handleCuisineChange} />
                </div>

                {currentDay && (
                  <>
                    <div className="card bg-gradient-to-br from-primary-50 to-sage-50 border-primary-200/80">
                      <p className="text-[10px] font-bold text-primary-600 uppercase tracking-wider mb-1">{currentDay.phase}</p>
                      <h3 className="font-bold text-gray-900 text-lg">{currentDay.label}</h3>
                      <p className="text-xs text-sage-600 mt-1">🎯 {currentDay.dailyGoal}</p>
                    </div>

                    <PlanTabBar activeTab={selectedPlanTab === 'meals' ? 'meals' : 'workout'} onChange={(tab) => { if (tab === 'meals' || tab === 'workout') setSelectedPlanTab(tab); }} />

                    {selectedPlanTab === 'meals' && (
                      <div className="space-y-4 animate-fade-in">
                        <button
                          onClick={() => setShowFullPlan(true)}
                          className="w-full btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                          </svg>
                          Full 30-Day Plan
                        </button>
                        <StreakBar
                          currentStreak={streak.current}
                          longestStreak={streak.longest}
                          todayChecked={firstSelected ? Object.values(mealCompletions[firstSelected]?.[activeDay - 1] || {}).filter(Boolean).length >= (currentDay?.meals.length || 0) : false}
                          daysCompleted={streak.current}
                          totalDays={30}
                        />
                        <DayProgressHeader
                          completed={Object.values(mealCompletions[firstSelected || '']?.[activeDay - 1] || {}).filter(Boolean).length}
                          total={currentDay.meals.length}
                          dailyGoal={currentDay.dailyGoal}
                        />
                        {currentDay.meals.map((meal, i) => (
                          <MealCard
                            key={i}
                            meal={meal}
                            done={!!mealCompletions[firstSelected || '']?.[activeDay - 1]?.[i]}
                            onToggle={(done) => firstSelected && togglePremiumMeal(firstSelected, activeDay - 1, i, done)}
                          />
                        ))}
                      </div>
                    )}

                    {selectedPlanTab === 'workout' && (
                      <div className="space-y-3 animate-fade-in">
                        <button
                          onClick={() => setShowWorkoutModal(true)}
                          className="w-full py-3 text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white rounded-2xl transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                          </svg>
                          Full 30-Day Workout Plan
                        </button>
                        <DayProgressHeader
                          completed={Object.values(workoutCompletions[firstSelected || '']?.[activeDay - 1] || {}).filter(Boolean).length}
                          total={currentDay.workouts.length}
                          dailyGoal="Complete all exercises"
                        />
                        {currentDay.workouts.map((w, i) => (
                          <WorkoutCard
                            key={i}
                            workout={w}
                            index={i}
                            done={!!workoutCompletions[firstSelected || '']?.[activeDay - 1]?.[i]}
                            onToggle={(done) => firstSelected && togglePremiumWorkout(firstSelected, activeDay - 1, i, done)}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
                <MedicalDisclaimer />
              </div>
            )}

            {/* ═══════ DAILY CHECK-IN TAB ═══════ */}
            {activeTab === 'checkin' && (
              <div className="space-y-4 animate-fade-in">
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <div><h4 className="font-bold text-gray-900 flex items-center gap-2"><span>✅</span> Daily Check-In</h4><p className="text-xs text-gray-500">Day {activeDay} of 30 · Log your daily markers</p></div>
                    <button onClick={() => setShowCheckInForm(!showCheckInForm)} className="no-print px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-semibold hover:bg-primary-700 transition-all flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      {showCheckInForm ? 'Cancel' : 'Log Today'}
                    </button>
                  </div>

                  {showCheckInForm && (
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 animate-fade-in mb-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {checkInFields.map(f => (
                          <div key={f.key}>
                            <label className="block text-[10px] font-semibold text-gray-600 mb-1">{f.icon} {f.label}</label>
                            <input type="number" step={f.step} min={f.min} max={f.max} value={checkInValues[f.key] ?? ''} onChange={e => setCheckInValues(prev => ({ ...prev, [f.key]: +e.target.value }))}
                              className="input-field-lg w-full" placeholder={String(f.placeholder)} />
                          </div>
                        ))}
                      </div>
                      <button onClick={handleCheckIn} className="mt-3 px-4 py-2 bg-sage-600 text-white rounded-xl text-xs font-semibold hover:bg-sage-700 transition-all no-print">Save Check-In</button>
                    </div>
                  )}

                  {/* Recent check-ins */}
                  {checkIns[firstSelected] && checkIns[firstSelected].length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead><tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-2 font-semibold text-gray-600">Day</th>
                          <th className="text-left py-2 px-2 font-semibold text-gray-600">Date</th>
                          {checkInFields.slice(0, 4).map(f => <th key={f.key} className="text-right py-2 px-2 font-semibold text-gray-600">{f.icon} {f.label}</th>)}
                        </tr></thead>
                        <tbody>
                          {checkIns[firstSelected].slice(-10).reverse().map((e, i) => (
                            <tr key={i} className="border-b border-gray-50">
                              <td className="py-2 px-2 text-gray-500 font-medium">Day {String(e.day ?? '?')}</td>
                              <td className="py-2 px-2 text-gray-500">{String(e.date)}</td>
                              {checkInFields.slice(0, 4).map(f => <td key={f.key} className="py-2 px-2 text-right font-medium text-gray-700">{typeof e[f.key] === 'number' ? e[f.key] : '—'}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* ─── Symptom Trigger Logger (IBS/Gout/Liver) ─── */}
                {hasTriggerFeature && (
                  <div className="card">
                    <div className="flex items-center justify-between mb-3">
                      <div><h4 className="font-bold text-gray-900 flex items-center gap-2"><span>🔍</span> Symptom Trigger Log</h4><p className="text-xs text-gray-500">Record flare-ups and identify patterns</p></div>
                      <button onClick={() => setShowTriggerForm(!showTriggerForm)} className="no-print px-3 py-1.5 bg-amber-500 text-white rounded-xl text-xs font-semibold hover:bg-amber-600 transition-all">Log Trigger</button>
                    </div>
                    {showTriggerForm && firstSelected && (
                      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 mb-3 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-[10px] font-semibold text-gray-600 mb-1">Symptom</label>
                            <select value={triggerSymptom} onChange={e => setTriggerSymptom(e.target.value)} className="input-field-lg w-full">
                              <option value="">Select...</option>
                              {(symptomOptions[firstSelected] || []).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-gray-600 mb-1">Possible Trigger Food/Cause</label>
                            <select value={triggerCause} onChange={e => setTriggerCause(e.target.value)} className="input-field-lg w-full">
                              <option value="">Select or type custom...</option>
                              {(triggerFoods[firstSelected] || []).map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-gray-600 mb-1">Severity (1-10): {triggerSeverity}</label>
                            <input type="range" min={1} max={10} value={triggerSeverity} onChange={e => setTriggerSeverity(+e.target.value)} className="w-full" />
                          </div>
                          <div><label className="block text-[10px] font-semibold text-gray-600 mb-1">Notes</label><input type="text" value={triggerNotes} onChange={e => setTriggerNotes(e.target.value)} className="input-field-lg w-full" placeholder="Additional context..." /></div>
                        </div>
                        <button onClick={handleLogTrigger} className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-semibold hover:bg-amber-600 transition-all no-print">Save Trigger</button>
                      </div>
                    )}
                    {symptomTriggers[firstSelected] && symptomTriggers[firstSelected].length > 0 && (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {symptomTriggers[firstSelected].slice(-10).reverse().map(t => (
                          <div key={t.id} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 border border-gray-100">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${t.severity <= 3 ? 'bg-emerald-500' : t.severity <= 6 ? 'bg-amber-500' : 'bg-red-500'}`}>{t.severity}</div>
                            <div className="flex-1 min-w-0"><p className="text-xs font-bold text-gray-900">{t.symptom}</p><p className="text-[10px] text-gray-500">{t.possibleCause && `Trigger: ${t.possibleCause} · `}{t.date}</p></div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ═══════ ANALYTICS & STREAKS TAB ═══════ */}
            {activeTab === 'analytics' && (
              <div className="space-y-4 animate-fade-in">
                {/* Milestones */}
                {milestones[firstSelected] && milestones[firstSelected].length > 0 && (
                  <div className="card">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><span>🎯</span> Weekly Milestones</h4>
                    <div className="space-y-2 mb-4">
                      {milestones[firstSelected].map(m => (
                        <div key={m.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${m.completed ? 'bg-sage-50 border-sage-200' : 'bg-white border-gray-100'}`}>
                          <button onClick={() => toggleMilestone(firstSelected, m.id)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${m.completed ? 'bg-sage-500 border-sage-500' : 'border-gray-300 hover:border-sage-400'}`}>
                            {m.completed && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                          </button>
                          <div className="flex-1"><p className={`text-sm font-medium ${m.completed ? 'text-sage-700 line-through' : 'text-gray-900'}`}>{m.label}</p><p className="text-[10px] text-gray-500">Target: {m.target} {m.unit} {m.currentValue > 0 ? `(current: ${m.currentValue})` : ''}</p></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-end gap-2">
                      <input type="text" placeholder="Milestone description" value={customMilestoneText} onChange={e => setCustomMilestoneText(e.target.value)} className="input-field-lg flex-1 min-w-[150px]" />
                      <input type="number" placeholder="Target" value={customMilestoneTarget} onChange={e => setCustomMilestoneTarget(e.target.value)} className="input-field-lg w-24" />
                      <input type="text" placeholder="Unit" value={customMilestoneUnit} onChange={e => setCustomMilestoneUnit(e.target.value)} className="input-field-lg w-20" />
                      <button onClick={() => addCustomMilestone(firstSelected)} className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-semibold hover:bg-primary-700 transition-all no-print">Add</button>
                    </div>
                  </div>
                )}

                {/* Weekly Trend Chart */}
                {checkIns[firstSelected] && checkIns[firstSelected].length >= 2 && (
                  <div className="card">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><span>📈</span> Recent Trends</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {checkInFields.slice(0, 2).map(field => {
                        const data = checkIns[firstSelected].slice(-7);
                        const vals = data.map(e => typeof e[field.key] === 'number' ? e[field.key] as number : 0).filter(v => v > 0);
                        if (vals.length < 2) return null;
                        const maxV = Math.max(...vals);
                        const minV = Math.min(...vals);
                        const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
                        const trend = vals[vals.length - 1] - vals[0];
                        return (
                          <div key={field.key} className="p-4 bg-gray-50 rounded-2xl">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-2">{field.icon} {field.label}</p>
                            <div className="flex items-end gap-1 h-16 mb-2">
                              {data.map((e, i) => {
                                const v = typeof e[field.key] === 'number' ? e[field.key] as number : 0;
                                const h = maxV > minV ? ((v - minV) / (maxV - minV)) * 80 + 20 : 50;
                                return <div key={i} className="flex-1 flex flex-col items-center gap-1"><div className={`w-full rounded-t-md ${v <= avg ? 'bg-sage-400' : 'bg-amber-400'}`} style={{ height: `${h}%` }} /><span className="text-[7px] text-gray-400">{String(e.date).split('/').slice(0, 2).join('/')}</span></div>;
                              })}
                            </div>
                            <div className="flex items-center gap-3 text-[10px]">
                              <span className="text-gray-500">Avg: {avg.toFixed(1)}</span>
                              <span className={trend < 0 ? 'text-sage-600' : trend > 0 ? 'text-amber-600' : 'text-gray-500'}>{trend < 0 ? '↓' : trend > 0 ? '↑' : '→'} {Math.abs(trend).toFixed(1)} {field.unit}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Summary Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="stat-card text-center"><p className="text-2xl font-bold text-primary-600">{checkIns[firstSelected]?.length || 0}</p><p className="text-[10px] text-gray-500">Check-Ins</p></div>
                  <div className="stat-card text-center"><p className="text-2xl font-bold text-sage-600">{streak.current}</p><p className="text-[10px] text-gray-500">Day Streak</p></div>
                  <div className="stat-card text-center"><p className="text-2xl font-bold text-amber-600">{milestones[firstSelected]?.filter(m => m.completed).length || 0}/{milestones[firstSelected]?.length || 0}</p><p className="text-[10px] text-gray-500">Milestones</p></div>
                  <div className="stat-card text-center"><p className="text-2xl font-bold text-red-500">{symptomTriggers[firstSelected]?.length || 0}</p><p className="text-[10px] text-gray-500">Triggers Logged</p></div>
                </div>
              </div>
            )}

            {/* ═══════ GUIDELINES TAB ═══════ */}
            {activeTab === 'guidelines' && (
              <div className="space-y-4 animate-fade-in">
                <div className="card">
                  <h4 className="font-bold text-gray-900 mb-4">Medical Guidelines &amp; Recommendations</h4>
                  <ul className="space-y-3">
                    {(premiumContent[firstSelected]?.guidelines || []).map((g, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-primary-700">{i + 1}</span>{g}
                      </li>
                    ))}
                  </ul>
                </div>
                <MedicalDisclaimer />
              </div>
            )}
          </div>
        )}

        <MealPlanModal isOpen={showFullPlan} onClose={() => setShowFullPlan(false)} targetCalories={0} mealPlan={[]} fullMealPlan={currentPlan || undefined} selectedDay={activeDay - 1} onDayChange={(d) => setActiveDay(d + 1)} weight={0} onSave={() => setShowFullPlan(false)} cuisine={selectedCuisine} onCuisineChange={handleCuisineChange} />
        <AdPlaceholder size="sidebar" className="mx-auto mb-10" />

        <div className="card bg-gradient-to-br from-gray-50 to-white">
          <h2 className="section-title mb-2 text-center">What's Included?</h2>
          <p className="section-subtitle text-center mb-8">Complete condition-specific health management</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📅', title: '30-Day Plans', desc: 'Structured daily journeys with meals, exercises, and clinical goals' },
              { icon: '✅', title: 'Daily Tracking', desc: 'Check-in logs, symptom triggers, and medication compliance' },
              { icon: '🤖', title: 'AI Adaptation', desc: 'Smart auto-adjustments based on your tracking data' },
              { icon: '📊', title: 'Clinical Export', desc: 'PDF/CSV reports for physician consultations' },
            ].map((item, i) => (
              <div key={i} className="stat-card text-center"><span className="text-3xl mb-3 block">{item.icon}</span><h3 className="font-bold text-gray-900 mb-1">{item.title}</h3><p className="text-xs text-gray-500">{item.desc}</p></div>
            ))}
          </div>
        </div>
        <WorkoutBlueprintModal isOpen={showWorkoutModal} onClose={() => setShowWorkoutModal(false)} bmi={25} goal="lose_weight" fitnessLevel="beginner" weight={75} selectedDay={workoutSelectedDay} onDayChange={setWorkoutSelectedDay} onSave={() => setShowWorkoutModal(false)} />
      </div>
    </div>
  );
};

function computeHealthScore(conditionId: string, profile: PatientProfile, labs: LabValues): number {
  const b = calcBMI(profile.weight, profile.height);
  let bmiScore: number;
  if (b >= 18.5 && b <= 24.9) bmiScore = 100;
  else if (b < 18.5) bmiScore = Math.max(0, 100 - (18.5 - b) * 10);
  else bmiScore = Math.max(0, 100 - (b - 24.9) * 5);
  let lScore = 80;
  if (conditionId === 'diabetes') { const h = labs.hba1c ?? 5.5; lScore = h < 5.7 ? 100 : h <= 6.4 ? 65 : h <= 7.5 ? 35 : 10; }
  else if (conditionId === 'hypertension') { const s = labs.systolic ?? 120; lScore = s <= 120 ? 100 : s <= 129 ? 75 : s <= 139 ? 50 : s <= 179 ? 25 : 5; }
  else if (conditionId === 'liver') { const alt = labs.alt ?? 25; lScore = alt < 40 ? 100 : alt < 80 ? 55 : 15; }
  else if (conditionId === 'cholesterol') { const ldl = labs.ldl ?? 100; lScore = ldl < 100 ? 100 : ldl < 130 ? 60 : ldl < 160 ? 35 : 10; }
  else if (conditionId === 'kidney') { const gfr = labs.gfr ?? 90; lScore = gfr >= 60 ? 100 : gfr >= 30 ? 50 : 15; }
  else if (conditionId === 'thyroid') { const tsh = labs.tsh ?? 2; lScore = tsh >= 0.5 && tsh <= 2.5 ? 100 : tsh <= 5 ? 50 : 15; }
  const ageScore = Math.max(0, 100 - Math.abs(profile.age - 40) * 1.2);
  return Math.round(bmiScore * 0.4 + lScore * 0.4 + ageScore * 0.2);
}

function generateDefaultMilestones(conditionId: string, profile: PatientProfile, labs: LabValues): Milestone[] {
  const uid2 = () => Math.random().toString(36).slice(2, 9);
  const ms: Milestone[] = [];
  switch (conditionId) {
    case 'diabetes': { const f = labs.fasting ?? 110; ms.push({ id: uid2(), label: 'Reduce fasting glucose', target: Math.max(80, f - 5), unit: 'mg/dL', currentValue: f, completed: false }); break; }
    case 'hypertension': { const s = labs.systolic ?? 135; ms.push({ id: uid2(), label: 'Reduce systolic BP', target: Math.max(110, s - 3), unit: 'mmHg', currentValue: s, completed: false }); break; }
    case 'liver': { const alt = labs.alt ?? 30; ms.push({ id: uid2(), label: alt > 40 ? 'Reduce ALT to normal' : 'Maintain ALT < 40', target: 40, unit: 'U/L', currentValue: alt, completed: false }); break; }
    case 'cholesterol': { const ldl = labs.ldl ?? 120; ms.push({ id: uid2(), label: 'Reduce LDL', target: Math.max(70, ldl - 5), unit: 'mg/dL', currentValue: ldl, completed: false }); break; }
    case 'kidney': { const gfr = labs.gfr ?? 75; ms.push({ id: uid2(), label: 'Maintain GFR stability', target: gfr, unit: 'mL/min', currentValue: gfr, completed: false }); break; }
    case 'thyroid': { ms.push({ id: uid2(), label: 'Keep TSH in optimal range', target: 2.5, unit: 'mIU/L', currentValue: labs.tsh ?? 2, completed: false }); break; }
    case 'gout': { const ua = labs.uricAcid ?? 6.5; ms.push({ id: uid2(), label: 'Reduce uric acid', target: Math.max(3.5, ua - 0.5), unit: 'mg/dL', currentValue: ua, completed: false }); break; }
  }
  if (calcBMI(profile.weight, profile.height) > 24.9) ms.push({ id: uid2(), label: 'Lose 0.5kg this week', target: +(profile.weight - 0.5).toFixed(1), unit: 'kg', currentValue: profile.weight, completed: false });
  return ms;
}

export default PremiumPage;
