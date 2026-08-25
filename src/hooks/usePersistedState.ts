import { useState, useEffect, useCallback } from 'react';

function loadState<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveState(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export function usePersistedState<T>(fallback: T, key?: string): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => key ? loadState(key, fallback) : fallback);

  useEffect(() => { if (key) saveState(key, state); }, [key, state]);

  return [state, setState];
}

export function useDayCompletions(planKey: string, totalDays: number) {
  const [completions, setCompletions] = usePersistedState<Record<number, boolean>>(
    {},
    `hc_completions_${planKey}`
  );

  const toggle = useCallback((dayIndex: number) => {
    setCompletions(prev => ({ ...prev, [dayIndex]: !prev[dayIndex] }));
  }, [setCompletions]);

  const completedCount = Object.values(completions).filter(Boolean).length;

  return { completions, toggle, completedCount, totalDays };
}

export function useMealSwapTags(planKey: string) {
  return usePersistedState<Record<number, string>>({}, `hc_swap_tags_${planKey}`);
}
