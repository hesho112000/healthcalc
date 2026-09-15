import type { ConditionId } from './types';

export const CONDITION_PRIORITY: Record<ConditionId, number> = {
  'kidney-ckd': 0,
  'kidney-stones': 5,
  'diabetes-insulin': 10,
  gout: 20,
  'fatty-liver': 30,
  'heart-lipids': 40,
  pcos: 50,
  'weight-obesity': 60,
  thyroid: 70,
  'gut-ibs': 80,
  'bones-joints': 90,
  'mental-wellness': 100,
};

export const priorityOf = (id: string): number =>
  CONDITION_PRIORITY[id as ConditionId] ?? 999;

export const sortByRestrictiveness = (ids: string[]): string[] =>
  [...ids].sort((a, b) => priorityOf(a) - priorityOf(b));