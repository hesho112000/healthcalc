import type { Exercise } from '../exercises/types';
import type { FoodItem } from '../../utils/calculations';

export type ConditionId =
  | 'diabetes'
  | 'hypertension'
  | 'cholesterol'
  | 'gout'
  | 'liver'
  | 'kidney'
  | 'thyroid'
  | 'ibs';

export interface NutritionRuleFlags {
  lowGlycemicIndex?: boolean;
  highFiber?: boolean;
  dashDiet?: boolean;
  lowSodium?: boolean;
  highPotassium?: boolean;
  highOmega3?: boolean;
  solubleFiber?: boolean;
  lowPurine?: boolean;
  lowFat?: boolean;
  antioxidants?: boolean;
  lowProtein?: boolean;
  lowPotassium?: boolean;
  iodineAware?: boolean;
  lowFODMAP?: boolean;
}

export interface NutritionRules extends NutritionRuleFlags {
  avoid: string[];
  prefer: string[];
}

export interface ConditionData {
  id: ConditionId;
  icon: string;
  exercisePreferences: string[];
  exerciseAvoid?: string[];
  exerciseAvoidKeywords: string[];
  nutritionRules: NutritionRules;
  avoidKeywords: string[];
  preferKeywords: string[];
  mealFocus: string;
  source: string;
  sampleMeals: Record<string, string[]>;
}

export type FoodScore = 'safe' | 'limit' | 'avoid';

export type ScoredExercise = { exercise: Exercise; score: FoodScore };
export type ScoredFood = { food: FoodItem; score: FoodScore };