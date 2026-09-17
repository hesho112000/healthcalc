import { saveConditions, saveLabs, savePlan, saveProfile, saveProgress } from './supabaseData';
import { readHubConditions, readHubProfile } from '../components/hub/data';
import { LAB_REF } from '../components/hub/LabSummary';

export interface MigrateResult {
  uploaded: boolean;
  error?: string;
  counts: { conditions: number; labs: number; plans: number; progress: number };
}

interface MigrationProgressDay {
  date?: string;
  water?: number;
  weight?: number;
  mood?: string;
}

const PLAN_KEYS = ['hc_advanced_care_plan', 'healthcalc_plan'];

const readJSON = <T,>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const cleanup = (): void => {
  try {
    localStorage.removeItem('hc_advanced_care_plan');
    localStorage.removeItem('healthcalc_plan');
    localStorage.removeItem('healthcalc_conditions');
    localStorage.removeItem('healthcalc_labs');
    localStorage.removeItem('healthcalc_user_profile');
    localStorage.removeItem('hc_hub_progress');
  } catch {
    /* ignore */
  }
};

export const migrateLocalData = async (userId: string, clearAfter = false): Promise<MigrateResult> => {
  const counts = { conditions: 0, labs: 0, plans: 0, progress: 0 };
  let uploaded = false;

  const profile = readHubProfile();
  if (profile && typeof profile === 'object') {
    const heightCm = typeof profile.height === 'number' ? profile.height : undefined;
    const weightKg = typeof profile.weight === 'number' ? profile.weight : undefined;
    const age = typeof profile.age === 'number' ? profile.age : undefined;
    if (heightCm !== undefined || weightKg !== undefined || age !== undefined) {
      const res = await saveProfile(userId, {
        age,
        gender: profile.gender === 'male' || profile.gender === 'female' ? profile.gender : undefined,
        height_cm: heightCm,
        weight_kg: weightKg,
      });
      if (res.error) return { uploaded: false, error: res.error.message, counts };
      uploaded = true;
    }
  }

  const conditions = readHubConditions().filter((c) => typeof c === 'string');
  if (conditions.length) {
    const res = await saveConditions(userId, conditions);
    if (res.error) return { uploaded: false, error: res.error.message, counts };
    counts.conditions = conditions.length;
    uploaded = true;
  }

  const labs = readJSON<Record<string, Record<string, number>>>('healthcalc_labs');
  if (labs && Object.keys(labs).length) {
    const units: Record<string, string> = {};
    Object.entries(LAB_REF).forEach(([key, ref]) => {
      units[key] = ref.unit;
    });
    const res = await saveLabs(userId, labs, units);
    if (res.error) return { uploaded: false, error: res.error.message, counts };
    counts.labs = Object.keys(labs).length;
    uploaded = true;
  }

  const plan = PLAN_KEYS.map((key) => readJSON<Record<string, unknown>>(key)).find((p) => !!p && Object.keys(p as object).length > 0);
  if (plan) {
    const res = await savePlan(userId, plan);
    if (res.error) return { uploaded: false, error: res.error.message, counts };
    counts.plans = 1;
    uploaded = true;
  }

  const progress = readJSON<Record<string, MigrationProgressDay>>('hc_hub_progress');
  if (progress) {
    const days = Object.values(progress);
    for (const day of days) {
      if (!day.date) continue;
      const res = await saveProgress(userId, {
        date: day.date,
        water_liters: Number.isFinite(day.water ?? NaN) ? day.water : undefined,
        weight_kg: Number.isFinite(day.weight ?? NaN) ? day.weight : undefined,
        mood: day.mood,
      });
      if (res.error) return { uploaded: false, error: res.error.message, counts };
      counts.progress += 1;
      uploaded = true;
    }
  }

  if (clearAfter && uploaded) cleanup();

  return { uploaded, counts };
};