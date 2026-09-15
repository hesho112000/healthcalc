import type { ConditionData, NutritionRules } from './types';

const nutritionRules: NutritionRules = {
  lowSodium: true,
  avoid: ['Salt', 'Sugary drinks', 'Excess animal protein'],
  prefer: ['Water', 'Citrus', 'Vegetables', 'Whole grains'],
};

export const kidneyStonesCondition: ConditionData = {
  id: 'kidney-stones',
  icon: '💧',
  defaultHealthScore: 72,
  focus: 'Hydration and stone prevention',
  source: 'EAU kidney stone prevention guidance',
  suitableExercises: ['Walking', 'Swimming', 'Cycling', 'Yoga'],
  exerciseAvoidKeywords: [],
  nutritionRules,
  avoidKeywords: ['salted', 'cola', 'soda', 'processed meat'],
  preferKeywords: ['water', 'lemon', 'citrus', 'vegetable', 'whole grain'],
  sampleMeals: { Egyptian: ['Vegetable soup, low salt', 'Chicken with rice and salad'], American: ['Citrus water and oats', 'Vegetable grain bowl'] },
  dailyCalorieAdjustment: 0,
};
