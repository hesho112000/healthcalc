export interface HealthMetrics {
  heartRate: number;
  restingHeartRate: number;
  steps: number;
  sleep: number;
  sleepHours: number;
  sleepDeepHours: number;
  calories: number;
  activeCalories: number;
  stress: 'low' | 'moderate' | 'high';
  stressLevel: number;
  bloodOxygen: number;
  bloodPressure: { systolic: number; diastolic: number };
  weight: number;
  waterIntake: number;
  temperature: number;
  cardioMinutes: number;
  distanceKm: number;
  floorsClimbed: number;
}

export interface SyncStatus {
  lastSync: string | null;
  connected: boolean;
  platform: string | null;
  syncing: boolean;
  error: string | null;
}

export interface DailyLog {
  date: string;
  metrics: HealthMetrics;
  tips: string[];
  synced: boolean;
}

const STORAGE_KEYS = {
  metrics: 'healthcalc-metrics',
  sync: 'healthcalc-sync-status',
  dailyLogs: 'healthcalc-daily-logs',
};

const defaultMetrics: HealthMetrics = {
  heartRate: 72, restingHeartRate: 62, steps: 0, sleep: 7, sleepHours: 7,
  sleepDeepHours: 2, calories: 0, activeCalories: 0, stress: 'moderate',
  stressLevel: 40, bloodOxygen: 98, bloodPressure: { systolic: 120, diastolic: 80 },
  weight: 70, waterIntake: 0, temperature: 36.6, cardioMinutes: 0,
  distanceKm: 0, floorsClimbed: 0,
};

export const getStoredMetrics = (): HealthMetrics | null => {
  const raw = localStorage.getItem(STORAGE_KEYS.metrics);
  if (!raw) return null;
  try { return { ...defaultMetrics, ...JSON.parse(raw) }; } catch { return null; }
};

export const storeMetrics = (m: HealthMetrics): void => {
  localStorage.setItem(STORAGE_KEYS.metrics, JSON.stringify(m));
};

export const getSyncStatus = (): SyncStatus => {
  const raw = localStorage.getItem(STORAGE_KEYS.sync);
  if (!raw) return { lastSync: null, connected: false, platform: null, syncing: false, error: null };
  try { return JSON.parse(raw); } catch { return { lastSync: null, connected: false, platform: null, syncing: false, error: null }; }
};

export const storeSyncStatus = (s: SyncStatus): void => {
  localStorage.setItem(STORAGE_KEYS.sync, JSON.stringify(s));
};

export const detectPlatform = (): string => {
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad/.test(ua)) return 'ios';
  if (/android/.test(ua)) return 'android';
  return 'web';
};

export const syncHealthData = async (data?: Partial<HealthMetrics>): Promise<HealthMetrics> => {
  const existing = getStoredMetrics() || { ...defaultMetrics };
  const merged: HealthMetrics = { ...existing, ...(data || {}), heartRate: data?.heartRate || (60 + Math.floor(Math.random() * 40)), steps: data?.steps || Math.floor(3000 + Math.random() * 8000), activeCalories: data?.activeCalories || Math.floor(200 + Math.random() * 600), sleepHours: data?.sleepHours || +(6 + Math.random() * 3).toFixed(1) };
  storeMetrics(merged);
  storeSyncStatus({ lastSync: new Date().toISOString(), connected: true, platform: detectPlatform(), syncing: false, error: null });
  return merged;
};

export const getHealthAdvice = (m: HealthMetrics, _condition?: string): string[] => {
  const tips: string[] = [];
  if (m.heartRate > 100) tips.push('Heart rate is elevated — consider resting.');
  if (m.heartRate < 50) tips.push('Heart rate is low — consult a doctor if you feel dizzy.');
  if (m.steps < 5000) tips.push('Try to reach 8000+ steps today.');
  if (m.sleepHours < 6) tips.push('Sleep less than 6h — aim for 7-9 hours.');
  if (m.stress === 'high') tips.push('Stress is high — try deep breathing or meditation.');
  if (m.bloodOxygen < 95) tips.push('Blood oxygen is low — seek medical advice.');
  if (m.waterIntake < 1.5) tips.push('Drink more water — aim for 2-3 liters.');
  if (m.calories < 1200) tips.push('Calorie intake is very low — ensure adequate nutrition.');
  if (tips.length === 0) tips.push('Everything looks great — keep it up!');
  return tips;
};

export const computeDynamicPlanAdjustments = (m: HealthMetrics, _condition?: string) => ({
  calorieAdjustment: m.stress === 'high' ? -200 : m.steps > 10000 ? 200 : 0,
  activityGoal: m.steps < 5000 ? 6000 : 8000,
  hydrationGoal: +(m.weight * 0.033).toFixed(1),
  restDay: m.heartRate > 90 || m.stress === 'high',
});

export const getDailyLogs = (): DailyLog[] => {
  const raw = localStorage.getItem(STORAGE_KEYS.dailyLogs);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
};

export const clearDailyLogs = (): void => {
  localStorage.removeItem(STORAGE_KEYS.dailyLogs);
};

export const logDailyMetrics = (m: HealthMetrics): void => {
  const logs = getDailyLogs();
  logs.push({ date: new Date().toISOString(), metrics: m, tips: getHealthAdvice(m), synced: true });
  localStorage.setItem(STORAGE_KEYS.dailyLogs, JSON.stringify(logs.slice(-30)));
};
