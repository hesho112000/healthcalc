import type { ConditionId } from '../../data/conditions';
import { translations } from '../../i18n/translations';

export type TKey = keyof typeof translations.en;

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
export type SleepHours = 'less6' | '6to7' | '7to8' | 'more8';
export type StressLevel = 'low' | 'medium' | 'high';
export type GoalType = 'lose' | 'maintain' | 'gain' | 'general';
export type WeightGoalKey = 'lose' | 'gain' | 'maintain';
export type LifestyleGoalKey = 'general' | 'athletic' | 'sleep' | 'stress';
export const WEIGHT_GOALS: WeightGoalKey[] = ['lose', 'gain', 'maintain'];
export const LIFESTYLE_GOALS: LifestyleGoalKey[] = ['general', 'athletic', 'sleep', 'stress'];
export type PlanIntensity = 'light' | 'medium' | 'intense';

export interface WizardProfile {
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female';
}

export interface WizardLifestyle {
  activity: ActivityLevel | '';
  sleep: SleepHours | '';
  stress: StressLevel | '';
}

export interface WizardGoal {
  weightGoal: WeightGoalKey | null;
  lifestyleGoals: LifestyleGoalKey[];
  targetWeight: string;
  timelineMonths: number;
  intensity: PlanIntensity | '';
}

export type LabValues = Record<string, string>;

export const CUISINE_CARDS: Array<{ id: string; countryCode: string; label: string }> = [
  { id: 'Egyptian', countryCode: 'eg', label: 'Egyptian' },
  { id: 'Tunisian', countryCode: 'tn', label: 'Tunisian' },
  { id: 'Saudi', countryCode: 'sa', label: 'Saudi' },
  { id: 'Lebanese', countryCode: 'lb', label: 'Lebanese' },
  { id: 'American', countryCode: 'us', label: 'American' },
  { id: 'Italian', countryCode: 'it', label: 'Italian' },
  { id: 'Austrian', countryCode: 'at', label: 'Austrian' },
  { id: 'Benelux', countryCode: 'nl', label: 'Benelux' },
  { id: 'Norwegian', countryCode: 'no', label: 'Norwegian' },
  { id: 'Swedish', countryCode: 'se', label: 'Swedish' },
  { id: 'Danish', countryCode: 'dk', label: 'Danish' },
  { id: 'Finnish', countryCode: 'fi', label: 'Finnish' },
];

export const EXERCISE_TYPE_CATEGORIES: Array<{ id: string; key: TKey; emoji: string }> = [
  { id: 'cardio', key: 'wizard.exercise.cardio' as TKey, emoji: '🏃' },
  { id: 'strength', key: 'wizard.exercise.strength' as TKey, emoji: '🏋️' },
  { id: 'hiit', key: 'wizard.exercise.hiit' as TKey, emoji: '🔥' },
  { id: 'yoga', key: 'wizard.exercise.yoga' as TKey, emoji: '🧘' },
  { id: 'swimming', key: 'wizard.exercise.swimming' as TKey, emoji: '🏊' },
  { id: 'walking', key: 'wizard.exercise.walking' as TKey, emoji: '🚶' },
  { id: 'pilates', key: 'wizard.exercise.pilates' as TKey, emoji: '🤸' },
  { id: 'cycling', key: 'wizard.exercise.cycling' as TKey, emoji: '🚴' },
];

export interface ConditionScoreRow {
  id: ConditionId;
  icon: string;
  label: string;
  score: number;
}
