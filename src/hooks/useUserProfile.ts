import { useEffect, useState } from 'react';

export type UserGender = 'male' | 'female';
export type UserActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type UserGoal = 'lose' | 'gain_muscle' | 'gain_weight' | 'wellness' | 'athletic';

export interface UserProfile {
  age: number | null;
  gender: UserGender | null;
  height: number | null;
  weight: number | null;
  goal: UserGoal | null;
  activityLevel: UserActivityLevel | null;
  dietaryPreferences: string[];
  healthConditions: string[];
}

export const USER_PROFILE_STORAGE_KEY = 'healthcalc_user_profile';

const LEGACY_KEYS = ['fitness-inputs', 'fitness-wizard-input', 'hc_calc_profile', 'hc_calculator_bridge'];
const EMPTY_PROFILE: UserProfile = {
  age: null,
  gender: null,
  height: null,
  weight: null,
  goal: null,
  activityLevel: null,
  dietaryPreferences: [],
  healthConditions: [],
};

type ProfileRecord = Record<string, unknown>;

const asRecord = (value: unknown): ProfileRecord | null => (
  value && typeof value === 'object' && !Array.isArray(value) ? value as ProfileRecord : null
);

const asNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value))) return Number(value);
  return null;
};

const asStringList = (value: unknown): string[] => (
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
);

const normalizeProfile = (value: unknown): UserProfile => {
  const record = asRecord(value) ?? {};
  const data = { ...(asRecord(record.profile) ?? {}), ...record };
  const rawGoal = typeof data.goal === 'string' ? data.goal : null;
  const goal = rawGoal === 'lose_weight' || rawGoal === 'weight_loss'
    ? 'lose'
    : rawGoal && ['lose', 'gain_muscle', 'gain_weight', 'wellness', 'athletic'].includes(rawGoal)
      ? rawGoal as UserGoal
      : null;
  const rawGender = data.gender ?? data.sex;
  const rawActivity = data.activityLevel;

  return {
    age: asNumber(data.age),
    gender: rawGender === 'male' || rawGender === 'female' ? rawGender : null,
    height: asNumber(data.height ?? data.heightCm),
    weight: asNumber(data.weight ?? data.weightKg),
    goal,
    activityLevel: typeof rawActivity === 'string' && ['sedentary', 'light', 'moderate', 'active', 'very_active'].includes(rawActivity)
      ? rawActivity as UserActivityLevel
      : null,
    dietaryPreferences: asStringList(data.dietaryPreferences).length
      ? asStringList(data.dietaryPreferences)
      : typeof data.dietId === 'string' && data.dietId ? [data.dietId] : [],
    healthConditions: asStringList(data.healthConditions).length
      ? asStringList(data.healthConditions)
      : asStringList(data.conditions),
  };
};

const parseStoredRecord = (key: string): ProfileRecord | null => {
  try {
    return asRecord(JSON.parse(localStorage.getItem(key) || 'null'));
  } catch {
    return null;
  }
};

const writeProfile = (profile: UserProfile): void => {
  try {
    const existing = parseStoredRecord(USER_PROFILE_STORAGE_KEY) ?? {};
    localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify({ ...existing, ...profile }));
  } catch {
    /* ignore storage failures */
  }
};

const readProfile = (): UserProfile => {
  try {
    const current = parseStoredRecord(USER_PROFILE_STORAGE_KEY);
    if (current) return normalizeProfile(current);

    const legacyRecords = LEGACY_KEYS.map(parseStoredRecord).filter((record): record is ProfileRecord => !!record);
    let legacyConditions: string[] = [];
    try {
      const parsed = JSON.parse(localStorage.getItem('healthcalc_conditions') || 'null');
      if (Array.isArray(parsed)) legacyConditions = parsed.filter((item): item is string => typeof item === 'string');
    } catch {
      /* ignore malformed legacy conditions */
    }
    if (!legacyRecords.length && !legacyConditions.length) return { ...EMPTY_PROFILE };

    const migrated = normalizeProfile(Object.assign({}, ...legacyRecords));
    if (!migrated.healthConditions.length) migrated.healthConditions = legacyConditions;
    writeProfile(migrated);
    return migrated;
  } catch {
    return { ...EMPTY_PROFILE };
  }
};

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(readProfile);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === USER_PROFILE_STORAGE_KEY) setProfile(readProfile());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updateProfile = (updates: Partial<UserProfile>): void => {
    const next = normalizeProfile({ ...profile, ...updates });
    writeProfile(next);
    setProfile(next);
  };

  const resetProfile = (): void => {
    try {
      [USER_PROFILE_STORAGE_KEY, ...LEGACY_KEYS, 'healthcalc_conditions', 'userTDEE', 'userBMR'].forEach((key) => localStorage.removeItem(key));
    } catch {
      /* ignore storage failures */
    }
    setProfile({ ...EMPTY_PROFILE });
  };

  return { profile, updateProfile, resetProfile };
};
