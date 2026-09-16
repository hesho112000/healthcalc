import type { ConditionId } from './types';

export const CONDITION_PRIORITY: Record<ConditionId, number> = {
  kidney: 0,
  'kidney-stones': 5,
  diabetes: 10,
  gout: 20,
  liver: 30,
  'heart-lipids': 35,
  hypertension: 40,
  'weight-obesity': 45,
  cholesterol: 50,
  pcos: 55,
  thyroid: 60,
  'bones-joints': 65,
  ibs: 70,
  'mental-wellness': 80,
};

export const priorityOf = (id: string): number =>
  CONDITION_PRIORITY[id as ConditionId] ?? 999;

export const sortByRestrictiveness = (ids: string[]): string[] =>
  [...ids].sort((a, b) => priorityOf(a) - priorityOf(b));