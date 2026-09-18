import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProgress, saveProgress } from '../../services/supabaseData';
import type { MealSlot } from './data';

export interface LoggedMeal {
  id: string;
  name: string;
  emoji: string;
  slot: MealSlot;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DayData {
  meals: LoggedMeal[];
  exercises: string[];
  water: number;
  weight?: number;
  mood?: string;
}

type DayMap = Record<string, DayData>;

const STORAGE_KEY = 'hc_hub_today_v1';

export const todayKey = (): string => new Date().toLocaleDateString('en-CA');

const emptyDay = (): DayData => ({ meals: [], exercises: [], water: 0 });

const load = (): DayMap => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DayMap;
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch {
    /* ignore */
  }
  return {};
};

let map: DayMap = load();
let activeUser: string | null = null;
let lastError = false;
const listeners = new Set<() => void>();

const persist = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
  listeners.forEach((fn) => fn());
};

const dayFor = (key: string): DayData => {
  if (!map[key]) map[key] = emptyDay();
  return map[key];
};

const syncProgress = (key: string, day: DayData): void => {
  if (!activeUser) return;
  if (day.water === 0 && day.weight === undefined && day.mood === undefined) return;
  void saveProgress(activeUser, {
    date: key,
    water_liters: day.water,
    weight_kg: day.weight,
    mood: day.mood,
  })
    .then((res) => {
      lastError = Boolean(res.error);
    })
    .catch(() => {
      lastError = true;
    });
};

const hydrateFromServer = async (userId: string): Promise<void> => {
  try {
    const { data, error } = await getProgress(userId).catch(() => ({ data: null, error: null }));
    if (error || !data) return;
    let changed = false;
    data.forEach((row) => {
      if (!row.date) return;
      const day = dayFor(row.date);
      if (row.water_liters !== null && row.water_liters !== undefined && row.water_liters !== day.water) {
        day.water = row.water_liters;
        changed = true;
      }
      if (row.weight_kg !== null && row.weight_kg !== undefined && row.weight_kg !== day.weight) {
        day.weight = row.weight_kg;
        changed = true;
      }
      if (row.mood && row.mood !== day.mood) {
        day.mood = row.mood;
        changed = true;
      }
    });
    if (changed) persist();
  } catch {
    /* ignore */
  }
};

export const setHubUser = (userId: string | null): void => {
  if (activeUser === userId) return;
  activeUser = userId;
  if (userId) void hydrateFromServer(userId);
  listeners.forEach((fn) => fn());
};

export const addMeal = (day: string, meal: Omit<LoggedMeal, 'id'>): void => {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  dayFor(day).meals.unshift({ ...meal, id });
  persist();
};

export const removeMeal = (day: string, id: string): void => {
  const d = dayFor(day);
  d.meals = d.meals.filter((m) => m.id !== id);
  persist();
};

export const toggleExercise = (day: string, id: string): void => {
  const d = dayFor(day);
  d.exercises = d.exercises.includes(id)
    ? d.exercises.filter((e) => e !== id)
    : [...d.exercises, id];
  persist();
};

export const markAllExercises = (day: string, ids: string[]): void => {
  const d = dayFor(day);
  d.exercises = [...new Set([...d.exercises, ...ids])];
  persist();
};

export const resetExercises = (day: string): void => {
  dayFor(day).exercises = [];
  persist();
};

export const addWater = (day: string, delta: number): void => {
  const d = dayFor(day);
  d.water = Math.max(0, Math.round((d.water + delta / 1000) * 100) / 100);
  persist();
  syncProgress(day, d);
};

export const setWeight = (day: string, kg: number): void => {
  if (!Number.isFinite(kg) || kg <= 0) return;
  const d = dayFor(day);
  d.weight = Math.round(kg * 10) / 10;
  persist();
  syncProgress(day, d);
};

export const setMood = (day: string, mood: string): void => {
  const d = dayFor(day);
  d.mood = mood;
  persist();
  syncProgress(day, d);
};

export interface HubDailyState {
  day: DayData;
  key: string;
  hasUser: boolean;
  syncError: boolean;
}

export const useHubDaily = (): HubDailyState => {
  const { user } = useAuth();
  const [, force] = useState(0);
  const [keySync, setKeySync] = useState<string>(todayKey());
  const [userId, setUserIdLocal] = useState<string | null>(activeUser);

  useEffect(() => {
    setHubUser(user?.id ?? null);
    const today = todayKey();
    if (today !== keySync) setKeySync(today);
    const onUserIdUpdate = () => {
      setUserIdLocal(activeUser);
    };
    listeners.add(onUserIdUpdate);
    const onTick = () => {
      const todayKeyNow = todayKey();
      if (todayKeyNow !== keySync) setKeySync(todayKeyNow);
      force((v) => v + 1);
    };
    listeners.add(onTick);
    return () => {
      listeners.delete(onUserIdUpdate);
      listeners.delete(onTick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keySync, user?.id]);

  const today = todayKey();
  const day = dayFor(today);
  return { day, key: today, hasUser: Boolean(userId), syncError: lastError };
};