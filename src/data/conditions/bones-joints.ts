import type { ConditionData, NutritionRules } from './types';

const nutritionRules: NutritionRules = {
  highOmega3: true,
  antioxidants: true,
  avoid: ['Ultra-processed foods', 'Excess alcohol'],
  prefer: ['Fatty fish', 'Leafy greens', 'Beans', 'Whole grains'],
};

export const bonesJointsCondition: ConditionData = {
  id: 'bones-joints',
  icon: '🦴',
  defaultHealthScore: 76,
  focus: 'Mobility, bone and joint support',
  source: 'WHO musculoskeletal health guidance',
  suitableExercises: ['Walking', 'Swimming', 'Yoga', 'Light Strength'],
  exerciseAvoidKeywords: ['sprint', 'explosive', 'heavy'],
  nutritionRules,
  avoidKeywords: ['fried', 'soda', 'processed'],
  preferKeywords: ['salmon', 'yogurt', 'broccoli', 'spinach', 'bean'],
  sampleMeals: { Egyptian: ['Grilled fish and greens', 'Yogurt with fruit'], American: ['Salmon salad', 'Bean and vegetable bowl'] },
  dailyCalorieAdjustment: 0,
};
