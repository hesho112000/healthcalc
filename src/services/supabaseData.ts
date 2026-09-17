import { supabase } from '../lib/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

export interface SyncProfile {
  full_name?: string | null;
  age?: number | null;
  gender?: 'male' | 'female' | null;
  height_cm?: number | null;
  weight_kg?: number | null;
}

export interface SyncProfileRow {
  id: string;
  full_name: string | null;
  age: number | null;
  gender: 'male' | 'female' | null;
  height_cm: number | null;
  weight_kg: number | null;
  updated_at: string | null;
}

export interface SyncConditionRow {
  user_id: string;
  condition_id: string;
}

export interface SyncLabRow {
  marker: string;
  value: number | null;
  unit: string | null;
}

export interface SyncProgressDay {
  date: string;
  water_liters?: number | null;
  weight_kg?: number | null;
  mood?: string | null;
}

export interface SyncProgressRow extends SyncProgressDay {
  created_at?: string | null;
}

export interface SyncPlanRow {
  plan_data: Record<string, unknown> | null;
  created_at: string | null;
}

export interface SyncResult {
  error: PostgrestError | null;
}

const toNumber = (value: number | string | null | undefined): number | null => {
  if (value === null || value === undefined || value === '') return null;
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : null;
};

export const saveProfile = async (userId: string, profile: SyncProfile): Promise<SyncResult> => {
  const payload: Record<string, unknown> = {
    id: userId,
    updated_at: new Date().toISOString(),
  };
  if (profile.full_name !== undefined && profile.full_name !== null && profile.full_name !== '') {
    payload.full_name = profile.full_name;
  }
  if (profile.age !== undefined && profile.age !== null) payload.age = profile.age;
  if (profile.gender !== undefined && profile.gender !== null) payload.gender = profile.gender;
  if (profile.height_cm !== undefined && profile.height_cm !== null) payload.height_cm = profile.height_cm;
  if (profile.weight_kg !== undefined && profile.weight_kg !== null) payload.weight_kg = profile.weight_kg;
  const { error } = await supabase.from('profiles').upsert(payload, { onConflict: 'id' });
  return { error };
};

export const getProfile = async (userId: string): Promise<{ data: SyncProfileRow | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, age, gender, height_cm, weight_kg, updated_at')
    .eq('id', userId)
    .maybeSingle();
  return { data: (data as SyncProfileRow | null) ?? null, error };
};

export const saveConditions = async (userId: string, conditionIds: string[]): Promise<SyncResult> => {
  const { error: delError } = await supabase.from('user_conditions').delete().eq('user_id', userId);
  if (delError) return { error: delError };
  if (!conditionIds.length) return { error: null };
  const rows: SyncConditionRow[] = conditionIds.map((condition_id) => ({ user_id: userId, condition_id }));
  const { error } = await supabase.from('user_conditions').insert(rows);
  return { error };
};

export const getConditions = async (userId: string): Promise<{ data: string[]; error: PostgrestError | null }> => {
  const { data, error } = await supabase.from('user_conditions').select('condition_id').eq('user_id', userId);
  return { data: ((data as Array<{ condition_id: string }>) ?? []).map((r) => r.condition_id).filter(Boolean), error };
};

export const saveLabs = async (
  userId: string,
  labs: Record<string, Record<string, number>>,
  units: Record<string, string> = {},
): Promise<SyncResult> => {
  const { error: delError } = await supabase.from('labs').delete().eq('user_id', userId);
  if (delError) return { error: delError };
  const rows: SyncLabRow[] = [];
  const seen = new Set<string>();
  Object.values(labs).forEach((markers) => {
    Object.entries(markers).forEach(([marker, value]) => {
      if (!Number.isFinite(value) || seen.has(marker)) return;
      seen.add(marker);
      rows.push({ marker, value, unit: units[marker] ?? null });
    });
  });
  if (!rows.length) return { error: null };
  const { error } = await supabase
    .from('labs')
    .insert(rows.map((r) => ({ user_id: userId, marker: r.marker, value: r.value, unit: r.unit })));
  return { error };
};

export const getLabs = async (userId: string): Promise<{ data: SyncLabRow[]; error: PostgrestError | null }> => {
  const { data, error } = await supabase.from('labs').select('marker, value, unit').eq('user_id', userId);
  return { data: (data as SyncLabRow[] | null) ?? [], error };
};

export const savePlan = async (userId: string, planData: unknown): Promise<SyncResult> => {
  const { error } = await supabase.from('plans').insert({ user_id: userId, plan_data: planData });
  return { error };
};

export const getLatestPlan = async (userId: string): Promise<{ data: SyncPlanRow | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from('plans')
    .select('plan_data, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  const row = data as SyncPlanRow | null;
  if (!row || !row.plan_data || typeof row.plan_data !== 'object') return { data: null, error };
  return { data: { plan_data: row.plan_data, created_at: row.created_at ?? null }, error };
};

export const saveProgress = async (userId: string, day: SyncProgressDay): Promise<SyncResult> => {
  const { error } = await supabase
    .from('progress')
    .upsert(
      {
        user_id: userId,
        date: day.date,
        water_liters: day.water_liters ?? null,
        weight_kg: day.weight_kg ?? null,
        mood: day.mood ?? null,
      },
      { onConflict: 'user_id,date' },
    );
  return { error };
};

export const getProgress = async (
  userId: string,
  limit = 31,
): Promise<{ data: SyncProgressRow[]; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from('progress')
    .select('date, water_liters, weight_kg, mood, created_at')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit);
  return {
    data: (data as SyncProgressRow[] | null)?.map((r) => ({
      date: r.date,
      water_liters: toNumber(r.water_liters as number | string | null | undefined),
      weight_kg: toNumber(r.weight_kg as number | string | null | undefined),
      mood: r.mood,
      created_at: r.created_at,
    })) ?? [],
    error,
  };
};