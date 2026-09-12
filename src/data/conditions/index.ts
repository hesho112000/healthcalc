import { EXERCISES_DATABASE } from '../exercises/index';
import type { Exercise } from '../exercises/types';
import { FOODS_DATABASE } from '../../utils/calculations';
import type { FoodItem } from '../../utils/calculations';
import type {
  ConditionData,
  ConditionId,
  FoodScore,
  ScoredExercise,
  ScoredFood,
} from './types';
import { diabetesCondition } from './diabetes';
import { hypertensionCondition } from './hypertension';
import { cholesterolCondition } from './cholesterol';
import { goutCondition } from './gout';
import { liverCondition } from './liver';
import { kidneyCondition } from './kidney';
import { thyroidCondition } from './thyroid';
import { ibsCondition } from './ibs';
import { priorityOf } from './priority';

export * from './types';
export { CONDITION_PRIORITY, priorityOf, sortByRestrictiveness } from './priority';

export const CONDITION_IDS: ConditionId[] = [
  'diabetes',
  'hypertension',
  'cholesterol',
  'gout',
  'liver',
  'kidney',
  'thyroid',
  'ibs',
];

export const CONDITION_DATA: Record<string, ConditionData> = {
  diabetes: diabetesCondition,
  hypertension: hypertensionCondition,
  cholesterol: cholesterolCondition,
  gout: goutCondition,
  liver: liverCondition,
  kidney: kidneyCondition,
  thyroid: thyroidCondition,
  ibs: ibsCondition,
};

export const getConditionData = (id: string): ConditionData | undefined => CONDITION_DATA[id];

export const isConditionId = (v: string): v is ConditionId =>
  (CONDITION_IDS as readonly string[]).includes(v);

const dedupe = (arr: string[]): string[] => [...new Set(arr)];

const matchesPreference = (ex: Exercise, pref: string): boolean => {
  const lower = ex.nameEn.toLowerCase();
  switch (pref) {
    case 'Walking':
    case 'Brisk Walking':
      return /walk|treadmill|hike|stair|race|power walk/i.test(lower);
    case 'Cycling':
    case 'Light Cycling':
      return /cycl|bike|spin|row|elliptical|recumbent/i.test(lower);
    case 'Swimming':
      return /swim|aqua|water/i.test(lower);
    case 'Yoga':
    case 'Low-impact yoga':
      return /yoga|vinyasa|nidra|pranayama|chair/i.test(lower);
    case 'Light Strength':
      return (
        ex.type === 'strength' &&
        ex.difficulty !== 'advanced' &&
        !['barbell', 'cable'].includes(ex.equipment)
      );
    case 'Resistance Training':
      return ex.type === 'strength';
    case 'Deep Breathing':
      return /breath|breathing|pranayama|meditat/i.test(lower);
    case 'Stretching':
      return /stretch|mobility|foam|flexib/i.test(lower) || ex.type === 'flexibility';
    case 'Pilates':
      return /pilates/i.test(lower);
    case 'Tai Chi':
      return /tai chi|qigong|chi kung/i.test(lower);
    default:
      return lower.includes(pref.toLowerCase());
  }
};

const scoreOrder: Record<FoodScore, number> = { safe: 0, limit: 1, avoid: 2 };

export const scoreExercise = (ex: Exercise, ids: ConditionId[]): FoodScore => {
  const conds = ids.map((id) => CONDITION_DATA[id]);
  const avoidKws = dedupe(conds.flatMap((c) => c.exerciseAvoidKeywords));
  const prefers = dedupe(conds.flatMap((c) => c.suitableExercises));
  const lower = ex.nameEn.toLowerCase();
  if (avoidKws.some((k) => lower.includes(k.toLowerCase()))) return 'avoid';
  if (prefers.some((p) => matchesPreference(ex, p))) return 'safe';
  return 'limit';
};

export const exercisePoolFor = (ids: ConditionId[]): ScoredExercise[] => {
  if (ids.length === 0) return [];
  const conds = ids.map((id) => CONDITION_DATA[id]);
  const prefs = dedupe(conds.flatMap((c) => c.suitableExercises));
  if (prefs.length === 0) return [];
  return EXERCISES_DATABASE.filter((ex) => prefs.some((p) => matchesPreference(ex, p)))
    .map((ex) => ({ exercise: ex, score: scoreExercise(ex, ids) }))
    .sort(
      (a, b) =>
        scoreOrder[a.score] - scoreOrder[b.score] ||
        a.exercise.nameEn.localeCompare(b.exercise.nameEn),
    );
};

const FOOD_PROBE_FIELDS = (food: FoodItem): string =>
  [food.name_en, food.name, food.category, food.benefits, food.note]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

const foodMatchesKws = (food: FoodItem, kws: string[]): boolean => {
  const probe = FOOD_PROBE_FIELDS(food);
  return kws.some((k) => probe.includes(k.toLowerCase()));
};

export const scoreFood = (food: FoodItem, ids: ConditionId[]): FoodScore => {
  const conds = ids.map((id) => CONDITION_DATA[id]);
  const avoidKws = dedupe(conds.flatMap((c) => c.avoidKeywords));
  const preferKws = dedupe(conds.flatMap((c) => c.preferKeywords));

  if (foodMatchesKws(food, avoidKws)) return 'avoid';
  if (foodMatchesKws(food, preferKws)) return 'safe';

  const anyLowSodium = conds.some(
    (c) => c.nutritionRules.lowSodium || c.nutritionRules.DASH,
  );
  if (anyLowSodium && food.sodium != null && food.sodium > 900) return 'avoid';
  if (conds.some((c) => c.nutritionRules.lowProtein) && food.protein > 35) return 'avoid';
  if (
    conds.some((c) => c.nutritionRules.lowFat) &&
    ((food.saturatedFat ?? 0) > 10 || (food.sugar ?? 0) > 20)
  ) {
    return 'avoid';
  }
  if (conds.some((c) => c.nutritionRules.lowGI) && (food.sugar ?? 0) > 18) {
    return 'avoid';
  }
  if (
    conds.some(
      (c) =>
        c.nutritionRules.highOmega3 ||
        c.nutritionRules.solubleFiber ||
        c.nutritionRules.highFiber ||
        c.nutritionRules.antioxidants,
    ) &&
    (food.fiber ?? 0) >= 4
  ) {
    return 'safe';
  }
  if (food.healthy === true && (food.fiber ?? 0) >= 3) return 'safe';
  return 'limit';
};

export const foodPoolFor = (ids: ConditionId[]): ScoredFood[] => {
  if (ids.length === 0) return [];
  return FOODS_DATABASE.map((food) => ({ food, score: scoreFood(food, ids) })).sort(
    (a, b) =>
      scoreOrder[a.score] - scoreOrder[b.score] ||
      a.food.calories - b.food.calories,
  );
};

export const isFoodAvoid = (score: FoodScore): boolean => score === 'avoid';
export const isFoodSafe = (score: FoodScore): boolean => score === 'safe';

export interface ConflictPair {
  a: string;
  b: string;
}

export interface ConflictResolution {
  prioritized: string[];
  compromised: string[];
  conflictDetected: boolean;
  pairs: ConflictPair[];
}

export const resolveConflicts = (ids: string[]): ConflictResolution | null => {
  if (ids.length < 2) return null;
  const prioritized = [...ids].sort((a, b) => priorityOf(a) - priorityOf(b));
  const pairs: ConflictPair[] = [];
  let conflictDetected = false;
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const A = CONDITION_DATA[ids[i]];
      const B = CONDITION_DATA[ids[j]];
      if (!A || !B) continue;
      const aAvoid = new Set(A.avoidKeywords.map((k) => k.toLowerCase()));
      const bAvoid = new Set(B.avoidKeywords.map((k) => k.toLowerCase()));
      const aPref = new Set(A.preferKeywords.map((k) => k.toLowerCase()));
      const bPref = new Set(B.preferKeywords.map((k) => k.toLowerCase()));
      const aConflictsB = [...bPref].some((k) => aAvoid.has(k));
      const bConflictsA = [...aPref].some((k) => bAvoid.has(k));
      if (aConflictsB || bConflictsA) {
        conflictDetected = true;
        pairs.push({ a: ids[i], b: ids[j] });
      }
    }
  }
  return { prioritized, compromised: prioritized.slice(1), conflictDetected, pairs };
};

export const filterExercisesByCondition = (
  exercises: Exercise[],
  condition: ConditionData,
): ScoredExercise[] =>
  exercises
    .map((exercise) => ({ exercise, score: scoreExercise(exercise, [condition.id]) }))
    .sort(
      (a, b) =>
        scoreOrder[a.score] - scoreOrder[b.score] ||
        a.exercise.nameEn.localeCompare(b.exercise.nameEn),
    );

export const filterFoodsByCondition = (
  foods: FoodItem[],
  condition: ConditionData,
): ScoredFood[] =>
  foods
    .map((food) => ({ food, score: scoreFood(food, [condition.id]) }))
    .sort(
      (a, b) =>
        scoreOrder[a.score] - scoreOrder[b.score] || a.food.calories - b.food.calories,
    );