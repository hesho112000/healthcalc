export * from './calculations';

export const calculateIdealWeight = (height: number, gender: string): number => {
  const h = height / 100;
  return gender === 'male' ? Math.round(22 * h * h) : Math.round(21 * h * h);
};

export const calculateBodyFat = (waist: number, neck: number, height: number, gender: string): number => {
  if (gender === 'male') {
    return +(86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76).toFixed(1);
  }
  return +(163.205 * Math.log10(waist + 0.1 * waist - neck) - 97.684 * Math.log10(height) - 78.387).toFixed(1);
};

export const calculateWaterIntake = (weight: number): number => Math.round(weight * 0.033 * 1000);

export { FOODS_DATABASE, CUISINE_META, CUISINE_OPTIONS, getFoodsByCuisine, generateMealWithCuisine } from './calculations';
export type { Cuisine, FoodItem } from './calculations';

import type { Exercise, ExerciseType } from '../data/exercises';
import {
  EXERCISES_DATABASE,
  EXERCISES_BY_TYPE,
  strengthExercises,
  cardioExercises,
  hiitExercises,
  flexibilityExercises,
  balanceExercises,
  functionalExercises,
  mindbodyExercises,
} from '../data/exercises';

export {
  EXERCISES_DATABASE,
  EXERCISES_BY_TYPE,
  strengthExercises,
  cardioExercises,
  hiitExercises,
  flexibilityExercises,
  balanceExercises,
  functionalExercises,
  mindbodyExercises,
} from '../data/exercises';
export type {
  Exercise,
  ExerciseType,
  ExerciseDifficulty,
  ExerciseEquipment,
  MuscleGroup,
  ExerciseGoal,
} from '../data/exercises';

export const EXERCISE_TYPE_LABELS: Record<ExerciseType, { en: string; fr: string; es: string; ar: string }> = {
  strength: { en: 'Strength', fr: 'Force', es: 'Fuerza', ar: 'مقاومة وقوة' },
  cardio: { en: 'Cardio', fr: 'Cardio', es: 'Cardio', ar: 'هوائية' },
  hiit: { en: 'HIIT', fr: 'HIIT', es: 'HIIT', ar: 'كثافة عالية' },
  flexibility: { en: 'Flexibility', fr: 'Souplesse', es: 'Flexibilidad', ar: 'مرونة وإطالة' },
  balance: { en: 'Balance', fr: 'Équilibre', es: 'Equilibrio', ar: 'توازن وثبات' },
  functional: { en: 'Functional', fr: 'Fonctionnel', es: 'Funcional', ar: 'وظيفية' },
  mindbody: { en: 'Mind-Body', fr: 'Corps-esprit', es: 'Mente-cuerpo', ar: 'عقل وجسد' },
};

export const EXERCISE_GOAL_LABELS: Record<ExerciseType, { en: string; fr: string; es: string; ar: string }> = {
  strength: { en: 'Muscle & Strength', fr: 'Muscle et force', es: 'Músculo y fuerza', ar: 'عضلات وقوة' },
  cardio: { en: 'Heart Health', fr: 'Santé du cœur', es: 'Salud del corazón', ar: 'صحة القلب' },
  hiit: { en: 'Fat Burn & Power', fr: 'Perte de graisse et puissance', es: 'Quema grasa y potencia', ar: 'حرق الدهون والقوة' },
  flexibility: { en: 'Mobility & Recovery', fr: 'Mobilité et récupération', es: 'Movilidad y recuperación', ar: 'مرونة وتعافٍ' },
  balance: { en: 'Stability & Falls Prevention', fr: 'Stabilité et prévention des chutes', es: 'Estabilidad y prevención de caídas', ar: 'ثبات ووقاية من السقوط' },
  functional: { en: 'Everyday Strength', fr: 'Force quotidienne', es: 'Fuerza diaria', ar: 'قوة يومية' },
  mindbody: { en: 'Stress Relief & Calm', fr: 'Anti-stress et sérénité', es: 'Alivio del estrés', ar: 'تخفيف التوتر والسكينة' },
};

export const EXERCISE_TYPE_OPTIONS: ExerciseType[] = ['strength', 'cardio', 'hiit', 'flexibility', 'balance', 'functional', 'mindbody'];

export const getExercisesByType = (type: ExerciseType): Exercise[] =>
  EXERCISES_DATABASE.filter((e) => e.type === type);

export const recommendExercises = (bmi: number, goal: string, fitnessLevel: string): Exercise[] => {
  return EXERCISES_DATABASE.filter((e) => {
    const matchesBmi = !e.bmiRange || (bmi >= e.bmiRange[0] && bmi <= e.bmiRange[1]);
    const matchesGoal = !e.goals || e.goals.includes(goal);
    const matchesDifficulty = fitnessLevel === 'advanced' || e.difficulty === fitnessLevel || e.difficulty === 'beginner';
    return matchesBmi && matchesGoal && matchesDifficulty;
  }).slice(0, 6);
};