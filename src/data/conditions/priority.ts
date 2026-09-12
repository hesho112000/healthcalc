import type { ConditionId } from './types';

export const CONDITION_PRIORITY: Record<ConditionId, number> = {
  kidney: 0,
  diabetes: 10,
  gout: 20,
  liver: 30,
  hypertension: 40,
  cholesterol: 50,
  thyroid: 60,
  ibs: 70,
};

export const priorityOf = (id: string): number =>
  CONDITION_PRIORITY[id as ConditionId] ?? 999;

export const sortByRestrictiveness = (ids: string[]): string[] =>
  [...ids].sort((a, b) => priorityOf(a) - priorityOf(b));