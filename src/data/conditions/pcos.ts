import type { ConditionData, NutritionRules } from './types';

const nutritionRules: NutritionRules = {
  lowGI: true,
  highFiber: true,
  avoid: ['Sugary drinks', 'Refined grains', 'Ultra-processed foods'],
  prefer: ['Vegetables', 'Whole grains', 'Lean protein', 'Nuts'],
};

export const pcosCondition: ConditionData = {
  id: 'pcos',
  icon: '🌸',
  defaultHealthScore: 68,
  focus: 'Insulin-aware hormone support',
  source: 'International evidence-based PCOS guideline',
  suitableExercises: ['Walking', 'Resistance Training', 'Cycling', 'Yoga'],
  exerciseAvoidKeywords: ['sprint', 'burpee', 'explosive'],
  nutritionRules,
  avoidKeywords: ['soda', 'candy', 'juice', 'white bread', 'pastry'],
  preferKeywords: ['oat', 'vegetable', 'salad', 'fish', 'lentil', 'almond'],
  sampleMeals: { Egyptian: ['Eggs and salad', 'Lentil soup with greens'], American: ['Greek yogurt and berries', 'Salmon and quinoa'] },
  dailyCalorieAdjustment: -200,
};
