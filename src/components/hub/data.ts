import { translations } from '../../i18n/translations';
import type { Language } from '../../types';
import type { HealthOrganId } from '../../utils/healthScoring';
import { exercisePoolFor, foodPoolFor, isConditionId } from '../../data/conditions';
import type { ConditionId } from '../../data/conditions';
import { EXERCISES_DATABASE } from '../../data/exercises/index';
import type { Exercise } from '../../data/exercises/types';
import { FOODS_DATABASE } from '../../utils/calculations';
import type { FoodItem } from '../../utils/calculations';

export type TKey = keyof typeof translations.en;
export const tk = (key: string) => key as TKey;

export const tt = (t: (key: TKey) => string, key: string, params?: Record<string, string>): string => {
  let text = t(tk(key));
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.split(`{${k}}`).join(v);
    });
  }
  return text;
};

export interface HubOrgan {
  id: HealthOrganId;
  nameKey: TKey;
  icon: string;
  conditions: string[];
}

export const HUB_ORGANS: HubOrgan[] = [
  { id: 'brain', nameKey: tk('universe.organ.brain.name'), icon: '🧠', conditions: [] },
  { id: 'heart', nameKey: tk('universe.organ.heart.name'), icon: '❤️', conditions: ['hypertension', 'cholesterol'] },
  { id: 'pancreas', nameKey: tk('universe.organ.pancreas.name'), icon: '🍬', conditions: ['diabetes'] },
  { id: 'liver', nameKey: tk('universe.organ.liver.name'), icon: '🫁', conditions: ['liver'] },
  { id: 'kidneys', nameKey: tk('universe.organ.kidneys.name'), icon: '🫘', conditions: ['kidney'] },
  { id: 'thyroid', nameKey: tk('universe.organ.thyroid.name'), icon: '🦋', conditions: ['thyroid'] },
  { id: 'gut', nameKey: tk('universe.organ.gut.name'), icon: '🌿', conditions: ['ibs'] },
  { id: 'joints', nameKey: tk('universe.organ.joints.name'), icon: '🦴', conditions: ['gout'] },
];

export const coveredOrgans = (conditions: string[]): HubOrgan[] =>
  HUB_ORGANS.filter((o) => o.conditions.length === 0 || o.conditions.some((c) => conditions.includes(c)));

export type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export const SLOTS: Array<{ key: MealSlot; i18n: TKey; index: number }> = [
  { key: 'breakfast', i18n: tk('wizard.step6.mealBreakfast'), index: 0 },
  { key: 'lunch', i18n: tk('wizard.step6.mealLunch'), index: 1 },
  { key: 'dinner', i18n: tk('wizard.step6.mealDinner'), index: 2 },
  { key: 'snack', i18n: tk('wizard.step6.mealSnack'), index: 3 },
];

export const MOODS = ['😀', '🙂', '😐', '😟', '😢'];

const EX_EMOJI: Record<string, string> = {
  strength: '🏋️',
  cardio: '🏃',
  hiit: '🔥',
  flexibility: '🧘',
  balance: '⚖️',
  functional: '🤸',
  mindbody: '🧠',
};

export const exerciseEmoji = (type: string): string => EX_EMOJI[type] ?? '💪';

export const conditionIds = (conditions: string[]): ConditionId[] =>
  conditions.filter((c): c is ConditionId => isConditionId(c));

export const exercisePoolForConditions = (conditions: string[]): Exercise[] => {
  const pool = exercisePoolFor(conditionIds(conditions))
    .filter((s) => s.score !== 'avoid')
    .map((s) => s.exercise);
  return pool.length > 0 ? pool : EXERCISES_DATABASE;
};

export const foodPoolForConditions = (conditions: string[]): FoodItem[] => {
  const pool = foodPoolFor(conditionIds(conditions))
    .filter((s) => s.score !== 'avoid')
    .map((s) => s.food);
  return pool.length > 0 ? pool : FOODS_DATABASE.filter((f) => f.healthy === true);
};

export const dayExercises = (pool: Exercise[], day: number): Exercise[] => {
  const out: Exercise[] = [];
  const seen = new Set<string>();
  let idx = 0;
  while (out.length < 5 && idx < 40) {
    const ex = pool[(idx * 3 + (day - 1) * 2) % pool.length];
    if (!seen.has(ex.id)) {
      seen.add(ex.id);
      out.push(ex);
    }
    idx += 1;
  }
  return out;
};

export const dayMeals = (pool: FoodItem[], day: number): Array<{ slot: MealSlot; foods: FoodItem[] }> =>
  SLOTS.map(({ key, index }) => {
    const slotFoods = pool.filter((f) => (f.mealType ?? undefined) === key);
    const source = slotFoods.length > 0 ? slotFoods : pool;
    const picks: FoodItem[] = [];
    const count = key === 'snack' ? 2 : 1;
    for (let i = 0; i < count; i += 1) {
      const food = source[(i * 5 + (day - 1) * 3 + index) % source.length];
      if (!picks.some((p) => p.name_en === food.name_en)) picks.push(food);
    }
    return { slot: key, foods: picks };
  });

export const exerciseName = (ex: Exercise, lang: Language): string => {
  if (lang === 'ar') return ex.nameAr || ex.nameEn;
  if (lang === 'fr') return ex.nameFr || ex.nameEn;
  if (lang === 'es') return ex.nameEs || ex.nameEn;
  return ex.nameEn;
};

export const foodDisplayName = (food: FoodItem, lang: Language): string =>
  lang === 'ar' && food.name_ar ? food.name_ar : food.name_en;

export interface HubStoredPlan {
  conditions?: string[];
  profile?: { age: number; height: number; weight: number; gender: string };
  foodNames?: string[];
  exerciseIds?: string[];
  calories?: number;
  cuisine?: string;
  lifestyle?: { activity?: string; sleep?: string; stress?: string };
  goal?: { type?: string; targetWeight?: string; timelineMonths?: number; intensity?: string };
  exerciseTypes?: string[];
  overall?: number | null;
  projected?: number | null;
}

export const readHubPlan = (): HubStoredPlan | null => {
  try {
    const raw = localStorage.getItem('hc_advanced_care_plan');
    if (raw) {
      const parsed = JSON.parse(raw) as HubStoredPlan;
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch {
    /* ignore */
  }
  try {
    const raw = localStorage.getItem('healthcalc_plan');
    if (raw) {
      const parsed = JSON.parse(raw) as HubStoredPlan;
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
};

export const readHubConditions = (): string[] => {
  try {
    const fromPlan = readHubPlan()?.conditions;
    if (fromPlan && Array.isArray(fromPlan) && fromPlan.length > 0) return fromPlan;
  } catch {
    /* ignore */
  }
  try {
    const raw = localStorage.getItem('healthcalc_conditions');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.filter((c) => typeof c === 'string');
    }
  } catch {
    /* ignore */
  }
  return [];
};

export const readHubProfile = (): HubStoredPlan['profile'] | undefined => {
  const fromPlan = readHubPlan()?.profile;
  if (fromPlan && typeof fromPlan === 'object') return fromPlan;
  try {
    const raw = localStorage.getItem('healthcalc_user_profile');
    if (raw) {
      const parsed = JSON.parse(raw) as HubStoredPlan['profile'];
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch {
    /* ignore */
  }
  return undefined;
};

export const hasPlanData = (): boolean => {
  try {
    const keys = ['hc_advanced_care_plan', 'healthcalc_plan', 'healthcalc_conditions'];
    return keys.some((k) => Boolean(localStorage.getItem(k)));
  } catch {
    return false;
  }
};