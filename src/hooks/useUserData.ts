import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getConditions, getLabs, getLatestPlan, getProfile, getProgress } from '../services/supabaseData';
import type { SyncLabRow, SyncProfileRow, SyncProgressRow } from '../services/supabaseData';

export interface UserDataPlan {
  plan_data: Record<string, unknown> | null;
  created_at: string | null;
}

export interface UserDataState {
  profile: SyncProfileRow | null;
  conditions: string[];
  labs: SyncLabRow[];
  plan: UserDataPlan | null;
  progress: SyncProgressRow[];
  loading: boolean;
  refetch: () => void;
}

const EMPTY_ROW = (): { data: null; error: null } => ({ data: null, error: null });

export const useUserData = (): UserDataState => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<SyncProfileRow | null>(null);
  const [conditions, setConditions] = useState<string[]>([]);
  const [labs, setLabs] = useState<SyncLabRow[]>([]);
  const [plan, setPlan] = useState<UserDataPlan | null>(null);
  const [progress, setProgress] = useState<SyncProgressRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [tick, setTick] = useState(0);

  const refetch = useCallback(() => setTick((v) => v + 1), []);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setConditions([]);
      setLabs([]);
      setPlan(null);
      setProgress([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      const [profileResult, conditionsResult, labsResult, planResult, progressResult] = await Promise.all([
        getProfile(user.id).catch(() => EMPTY_ROW()),
        getConditions(user.id).catch(() => ({ data: [] as string[], error: null })),
        getLabs(user.id).catch(() => ({ data: [] as SyncLabRow[], error: null })),
        getLatestPlan(user.id).catch(() => EMPTY_ROW()),
        getProgress(user.id).catch(() => ({ data: [] as SyncProgressRow[], error: null })),
      ]);
      if (cancelled) return;
      const planData = planResult.data?.plan_data && typeof planResult.data.plan_data === 'object' ? planResult.data.plan_data : null;
      setProfile(profileResult.data ?? null);
      setConditions(conditionsResult.data ?? []);
      setLabs(labsResult.data ?? []);
      setPlan(planData ? { plan_data: planData, created_at: planResult.data?.created_at ?? null } : null);
      setProgress(progressResult.data ?? []);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user, tick]);

  return { profile, conditions, labs, plan, progress, loading, refetch };
};