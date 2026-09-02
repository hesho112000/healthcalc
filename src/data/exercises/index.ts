import { Exercise } from './types';
import { strengthExercises } from './strength-full';
import { cardioExercises } from './cardio-full';
import { hiitExercises } from './hiit-full';
import { flexibilityExercises } from './flexibility-full';
import { balanceExercises } from './balance-full';
import { functionalExercises } from './functional-full';
import { mindbodyExercises } from './mindbody-full';

export * from './types';
export {
  strengthExercises,
  cardioExercises,
  hiitExercises,
  flexibilityExercises,
  balanceExercises,
  functionalExercises,
  mindbodyExercises,
};

export const EXERCISES_DATABASE: Exercise[] = [
  ...strengthExercises,
  ...cardioExercises,
  ...hiitExercises,
  ...flexibilityExercises,
  ...balanceExercises,
  ...functionalExercises,
  ...mindbodyExercises,
];

export const EXERCISES_BY_TYPE = (type: Exercise['type']): Exercise[] =>
  EXERCISES_DATABASE.filter((e) => e.type === type);