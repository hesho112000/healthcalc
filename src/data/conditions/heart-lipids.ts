import type { ConditionData, NutritionRules } from './types';

const nutritionRules: NutritionRules = {
  DASH: true,
  lowSodium: true,
  highOmega3: true,
  solubleFiber: true,
  avoid: ['Trans fats', 'Fried foods', 'Processed meats', 'Excess salt'],
  prefer: ['Oats', 'Salmon', 'Beans', 'Leafy greens', 'Olive oil'],
};

export const heartLipidsCondition: ConditionData = {
  id: 'heart-lipids',
  icon: '❤️',
  defaultHealthScore: 74,
  focus: 'Blood pressure and lipid health',
  source: 'AHA & DASH guidelines',
  suitableExercises: ['Walking', 'Cycling', 'Swimming', 'Resistance Training'],
  exerciseAvoidKeywords: ['sprint', 'burpee', 'explosive', 'heavy'],
  nutritionRules,
  avoidKeywords: ['fried', 'sausage', 'bacon', 'burger', 'canned', 'salted'],
  preferKeywords: ['salmon', 'oat', 'bean', 'spinach', 'olive', 'lentil'],
  sampleMeals: { Egyptian: ['Grilled fish with lentils', 'Ful and greens'], American: ['Oatmeal with walnuts', 'Salmon and spinach'] },
  dailyCalorieAdjustment: 0,
  labs: ['systolic', 'diastolic', 'total', 'ldl', 'hdl', 'triglycerides'],
};
