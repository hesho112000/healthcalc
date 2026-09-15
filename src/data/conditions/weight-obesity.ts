import type { ConditionData, NutritionRules } from './types';

const nutritionRules: NutritionRules = {
  highFiber: true,
  lowGI: true,
  avoid: ['Sugary drinks', 'Fried foods', 'Ultra-processed foods'],
  prefer: ['Vegetables', 'Whole grains', 'Lean protein', 'Beans'],
};

export const weightObesityCondition: ConditionData = {
  id: 'weight-obesity',
  icon: '⚖️',
  defaultHealthScore: 70,
  focus: 'Sustainable weight management',
  source: 'NICE & WHO healthy weight guidelines',
  suitableExercises: ['Walking', 'Cycling', 'Swimming', 'Resistance Training'],
  exerciseAvoidKeywords: ['sprint', 'burpee', 'explosive', 'heavy'],
  nutritionRules,
  avoidKeywords: ['soda', 'candy', 'fried', 'fast food', 'pastry'],
  preferKeywords: ['vegetable', 'salad', 'oat', 'bean', 'lentil', 'chicken', 'fish'],
  sampleMeals: { Egyptian: ['Ful with salad', 'Grilled chicken and vegetables'], American: ['Oats and berries', 'Salmon grain bowl'] },
  dailyCalorieAdjustment: -300,
};
