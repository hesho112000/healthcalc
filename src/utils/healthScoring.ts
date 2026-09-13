import { translations } from '../i18n/translations';
import type { ConditionId } from '../data/conditions';

type TKey = keyof typeof translations.en;

export type HealthOrganId =
  | 'brain'
  | 'heart'
  | 'pancreas'
  | 'liver'
  | 'kidneys'
  | 'thyroid'
  | 'gut'
  | 'joints';

export type OrganStatus = 'critical' | 'warning' | 'healthy';

export const HEALTH_ORGAN_CONDITIONS: Record<HealthOrganId, readonly ConditionId[]> = {
  brain: [],
  thyroid: ['thyroid'],
  heart: ['hypertension', 'cholesterol'],
  pancreas: ['diabetes'],
  liver: ['liver'],
  kidneys: ['kidney'],
  gut: ['ibs'],
  joints: ['gout'],
};

export const LAB_STORAGE_KEY = 'hc_health_universe_labs';

const LAB_UNITS: Record<string, string> = {
  fasting: 'mg/dL',
  hba1c: '%',
  systolic: 'mmHg',
  diastolic: 'mmHg',
  total: 'mg/dL',
  ldl: 'mg/dL',
  hdl: 'mg/dL',
  triglycerides: 'mg/dL',
  uricAcid: 'mg/dL',
  alt: 'U/L',
  ast: 'U/L',
  bilirubin: 'mg/dL',
  creatinine: 'mg/dL',
  egfr: 'mL/min',
  potassium: 'mmol/L',
  tsh: 'mIU/L',
  t3: 'ng/dL',
  t4: 'µg/dL',
};

interface LabMetric {
  key: string;
  idealLo: number;
  idealHi: number;
  riskHi: number;
  invert?: boolean;
}

const LAB_METRICS: Record<string, readonly LabMetric[]> = {
  diabetes: [
    { key: 'fasting', idealLo: 70, idealHi: 99, riskHi: 125 },
    { key: 'hba1c', idealLo: 4.0, idealHi: 5.6, riskHi: 6.4 },
  ],
  hypertension: [
    { key: 'systolic', idealLo: 90, idealHi: 119, riskHi: 139 },
    { key: 'diastolic', idealLo: 60, idealHi: 79, riskHi: 89 },
  ],
  cholesterol: [
    { key: 'total', idealLo: 125, idealHi: 199, riskHi: 239 },
    { key: 'ldl', idealLo: 40, idealHi: 99, riskHi: 159 },
    { key: 'hdl', idealLo: 40, idealHi: 60, riskHi: 60, invert: true },
    { key: 'triglycerides', idealLo: 50, idealHi: 149, riskHi: 199 },
  ],
  gout: [{ key: 'uricAcid', idealLo: 3.5, idealHi: 7.0, riskHi: 8.0 }],
  liver: [
    { key: 'alt', idealLo: 7, idealHi: 56, riskHi: 120 },
    { key: 'ast', idealLo: 10, idealHi: 40, riskHi: 80 },
    { key: 'bilirubin', idealLo: 0.1, idealHi: 1.2, riskHi: 2.4 },
  ],
  kidney: [
    { key: 'creatinine', idealLo: 0.6, idealHi: 1.3, riskHi: 1.8 },
    { key: 'egfr', idealLo: 60, idealHi: 90, riskHi: 90, invert: true },
    { key: 'potassium', idealLo: 3.5, idealHi: 5.0, riskHi: 5.5 },
  ],
  thyroid: [
    { key: 'tsh', idealLo: 0.4, idealHi: 4.0, riskHi: 10 },
    { key: 't3', idealLo: 80, idealHi: 200, riskHi: 240 },
    { key: 't4', idealLo: 4.5, idealHi: 12.5, riskHi: 14 },
  ],
};

const clamp = (v: number, lo: number, hi: number): number =>
  Math.min(hi, Math.max(lo, v));

const metricScore = (value: number, metric: LabMetric): number => {
  if (metric.invert) {
    if (value >= metric.idealLo) {
      if (value >= metric.idealHi) {
        const span = (metric.idealHi - metric.idealLo) || 1;
        return Math.round(Math.min(97, 88 + ((value - metric.idealLo) / span) * 9));
      }
      const span = (metric.idealHi - metric.idealLo) || 1;
      const t = clamp((value - metric.idealLo) / span, 0, 1);
      return Math.round(88 + (1 - Math.abs(t - 0.5) * 2) * 9);
    }
    const below = metric.idealLo - value;
    return Math.round(Math.max(20, 88 - (below / metric.idealLo) * 55));
  }
  if (value < metric.idealLo) {
    const low = (metric.idealLo - value) / metric.idealLo;
    return Math.round(Math.max(40, 88 - low * 30));
  }
  if (value <= metric.idealHi) {
    const span = (metric.idealHi - metric.idealLo) || 1;
    const t = clamp((value - metric.idealLo) / span, 0, 1);
    return Math.round(88 + (1 - Math.abs(t - 0.5) * 2) * 9);
  }
  if (value <= metric.riskHi) {
    const span = (metric.riskHi - metric.idealHi) || 1;
    const t = clamp((value - metric.idealHi) / span, 0, 1);
    return Math.round(87 - t * 27);
  }
  const excess = (value - metric.riskHi) / metric.riskHi;
  return Math.round(Math.max(20, 60 - excess * 40));
};

export const readStoredLabs = (): Record<string, Record<string, number>> => {
  try {
    const raw = localStorage.getItem(LAB_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, Record<string, number>>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

export const writeStoredLabs = (
  condition: string,
  values: Record<string, number>,
): void => {
  try {
    const all = readStoredLabs();
    all[condition] = { ...(all[condition] ?? {}), ...values };
    localStorage.setItem(LAB_STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* ignore */
  }
};

const labsFor = (conditions: readonly string[]): Record<string, number> => {
  const stored = readStoredLabs();
  const out: Record<string, number> = {};
  conditions.forEach((cid) => Object.assign(out, stored[cid] || {}));
  return out;
};

export interface UserProfileData {
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  activityLevel?: string;
  sleepHours?: number;
}

const mergeProfile = (out: UserProfileData, src: unknown): void => {
  if (!src || typeof src !== 'object') return;
  const s = src as Record<string, unknown>;
  if (typeof s.age === 'number' && Number.isFinite(s.age)) out.age = s.age;
  if (typeof s.gender === 'string') out.gender = s.gender;
  if (typeof s.activityLevel === 'string') out.activityLevel = s.activityLevel;
  if (typeof s.sleepHours === 'number' && Number.isFinite(s.sleepHours)) {
    out.sleepHours = s.sleepHours;
  }
  if (typeof s.sleep === 'number' && Number.isFinite(s.sleep)) out.sleepHours = s.sleep;
  const h = typeof s.height === 'number' ? s.height : s.heightCm;
  if (typeof h === 'number' && Number.isFinite(h)) out.height = h;
  const w = typeof s.weight === 'number' ? s.weight : s.weightKg;
  if (typeof w === 'number' && Number.isFinite(w)) out.weight = w;
};

export const readUserProfile = (): UserProfileData => {
  const out: UserProfileData = {};
  try {
    const parse = (key: string): unknown => {
      try {
        return JSON.parse(localStorage.getItem(key) || 'null');
      } catch {
        return null;
      }
    };
    mergeProfile(out, parse('healthcalc-metrics'));
    mergeProfile(out, parse('hc_calc_profile'));
    mergeProfile(out, parse('hc_calculator_bridge'));
    mergeProfile(out, parse('hc_advanced_care'));
    mergeProfile(out, parse('hc_advanced_care_plan'));
  } catch {
    /* ignore */
  }
  return out;
};

export interface GutSymptomEntry {
  severity?: number;
}

export const readIbsSymptoms = (): GutSymptomEntry[] => {
  try {
    const raw = localStorage.getItem('ac_triggers_ibs');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as GutSymptomEntry[]) : [];
  } catch {
    return [];
  }
};

export interface BrainInput {
  age?: number;
  activityLevel?: string;
  sleepHours?: number;
}

export const calculateBrainScore = (userData: BrainInput | null | undefined): number | null => {
  if (!userData || typeof userData.age !== 'number' || !Number.isFinite(userData.age)) {
    return null;
  }
  let score = 100 - (userData.age > 50 ? (userData.age - 50) * 0.3 : 0);
  if (userData.activityLevel === 'sedentary') score -= 15;
  if (typeof userData.sleepHours === 'number' && userData.sleepHours < 7) {
    score -= (7 - userData.sleepHours) * 2;
  }
  return Math.round(clamp(score, 0, 100));
};

const scoreFromMetrics = (
  metrics: readonly LabMetric[],
  labs: Record<string, number>,
): { score: number | null } => {
  const parts: number[] = [];
  metrics.forEach((metric) => {
    const v = labs[metric.key];
    if (typeof v === 'number' && Number.isFinite(v)) {
      parts.push(metricScore(v, metric));
    }
  });
  if (parts.length === 0) return { score: null };
  return { score: Math.round(parts.reduce((a, b) => a + b, 0) / parts.length) };
};

export const calculateHeartScore = (
  labs: Record<string, number> | null | undefined,
): number | null => {
  const metrics = [
    ...LAB_METRICS.hypertension,
    ...LAB_METRICS.cholesterol,
  ];
  return scoreFromMetrics(metrics, labs || {}).score;
};

export const calculatePancreasScore = (
  labs: Record<string, number> | null | undefined,
): number | null => scoreFromMetrics(LAB_METRICS.diabetes, labs || {}).score;

export const calculateKidneyScore = (
  labs: Record<string, number> | null | undefined,
): number | null => scoreFromMetrics(LAB_METRICS.kidney, labs || {}).score;

export const calculateLiverScore = (
  labs: Record<string, number> | null | undefined,
): number | null => scoreFromMetrics(LAB_METRICS.liver, labs || {}).score;

export const calculateGoutScore = (
  labs: Record<string, number> | null | undefined,
): number | null => scoreFromMetrics(LAB_METRICS.gout, labs || {}).score;

export const calculateThyroidScore = (
  labs: Record<string, number> | null | undefined,
): number | null => scoreFromMetrics(LAB_METRICS.thyroid, labs || {}).score;

export const calculateGutScore = (
  symptoms: readonly GutSymptomEntry[] | number | null | undefined,
): number | null => {
  if (symptoms === null || symptoms === undefined) return null;
  const count = typeof symptoms === 'number' ? symptoms : symptoms.length;
  if (!Number.isFinite(count) || count <= 0) return null;
  let severityPenalty = 0;
  if (Array.isArray(symptoms)) {
    const severities = symptoms
      .map((s) => s.severity)
      .filter((v): v is number => typeof v === 'number' && Number.isFinite(v) && v >= 0);
    if (severities.length > 0) {
      severityPenalty = Math.round(
        severities.reduce((a, b) => a + b, 0) / severities.length,
      );
    }
  }
  return Math.round(clamp(100 - count * 10 - severityPenalty, 20, 100));
};

export const calculateOverallScore = (scores: readonly number[]): number | null => {
  const valid = (scores || []).filter((v) => typeof v === 'number' && Number.isFinite(v));
  if (valid.length === 0) return null;
  return Math.round(valid.reduce((a, b) => a + b, 0) / valid.length);
};

export const organScore = (id: HealthOrganId): number | null => {
  switch (id) {
    case 'brain':
      return calculateBrainScore(readUserProfile());
    case 'gut':
      return calculateGutScore(readIbsSymptoms());
    case 'heart':
      return calculateHeartScore(labsFor(HEALTH_ORGAN_CONDITIONS.heart));
    case 'pancreas':
      return calculatePancreasScore(labsFor(HEALTH_ORGAN_CONDITIONS.pancreas));
    case 'kidneys':
      return calculateKidneyScore(labsFor(HEALTH_ORGAN_CONDITIONS.kidneys));
    case 'liver':
      return calculateLiverScore(labsFor(HEALTH_ORGAN_CONDITIONS.liver));
    case 'joints':
      return calculateGoutScore(labsFor(HEALTH_ORGAN_CONDITIONS.joints));
    case 'thyroid':
      return calculateThyroidScore(labsFor(HEALTH_ORGAN_CONDITIONS.thyroid));
  }
};

export const organHasLabData = (id: HealthOrganId): boolean =>
  HEALTH_ORGAN_CONDITIONS[id].some((cid) => {
    const stored = readStoredLabs()[cid];
    if (!stored) return false;
    return (LAB_METRICS[cid] ?? []).some(
      (metric) => typeof stored[metric.key] === 'number',
    );
  });

export const organStatus = (score: number): OrganStatus =>
  score >= 80 ? 'healthy' : score >= 60 ? 'warning' : 'critical';

const num = (v: number): string =>
  Number.isInteger(v) ? String(v) : String(Math.round(v * 10) / 10);

export interface ScoreFactor {
  labelKey: TKey;
  value: string;
  unit?: string;
  unitKey?: TKey;
}

export interface OrganScoreDetail {
  score: number;
  factors: ScoreFactor[];
}

const labFactors = (metrics: readonly LabMetric[], labs: Record<string, number>): ScoreFactor[] => {
  const out: ScoreFactor[] = [];
  metrics.forEach((metric) => {
    const v = labs[metric.key];
    if (typeof v === 'number' && Number.isFinite(v)) {
      out.push({
        labelKey: `advanced.lab.field.${metric.key}.label` as TKey,
        value: num(v),
        unit: LAB_UNITS[metric.key],
      });
    }
  });
  return out;
};

export const getOrganDetail = (id: HealthOrganId): OrganScoreDetail | null => {
  switch (id) {
    case 'brain': {
      const profile = readUserProfile();
      const score = calculateBrainScore(profile);
      if (score === null) return null;
      const factors: ScoreFactor[] = [];
      if (typeof profile.age === 'number') {
        factors.push({ labelKey: 'age', value: num(profile.age), unitKey: 'years' });
      }
      if (profile.activityLevel) {
        factors.push({ labelKey: profile.activityLevel as TKey, value: '' });
      }
      if (typeof profile.sleepHours === 'number') {
        factors.push({
          labelKey: 'universe.factor.sleepHours',
          value: num(profile.sleepHours),
          unitKey: 'universe.factor.hours',
        });
      }
      return { score, factors };
    }
    case 'gut': {
      const symptoms = readIbsSymptoms();
      const score = calculateGutScore(symptoms);
      if (score === null) return null;
      const sev = symptoms
        .map((s) => s.severity)
        .filter((v): v is number => typeof v === 'number' && Number.isFinite(v));
      const countText = sev.length > 0 ? `${symptoms.length} (${num(sev.reduce((a, b) => a + b, 0) / sev.length)}/10)` : String(symptoms.length);
      return {
        score,
        factors: [
          { labelKey: 'universe.factor.symptomCount', value: countText },
        ],
      };
    }
    case 'heart': {
      const labs = labsFor(HEALTH_ORGAN_CONDITIONS.heart);
      const metrics = [...LAB_METRICS.hypertension, ...LAB_METRICS.cholesterol];
      const { score } = scoreFromMetrics(metrics, labs);
      if (score === null) return null;
      return { score, factors: labFactors(metrics, labs) };
    }
    case 'pancreas': {
      const labs = labsFor(HEALTH_ORGAN_CONDITIONS.pancreas);
      const { score } = scoreFromMetrics(LAB_METRICS.diabetes, labs);
      if (score === null) return null;
      return { score, factors: labFactors(LAB_METRICS.diabetes, labs) };
    }
    case 'kidneys': {
      const labs = labsFor(HEALTH_ORGAN_CONDITIONS.kidneys);
      const { score } = scoreFromMetrics(LAB_METRICS.kidney, labs);
      if (score === null) return null;
      return { score, factors: labFactors(LAB_METRICS.kidney, labs) };
    }
    case 'liver': {
      const labs = labsFor(HEALTH_ORGAN_CONDITIONS.liver);
      const { score } = scoreFromMetrics(LAB_METRICS.liver, labs);
      if (score === null) return null;
      return { score, factors: labFactors(LAB_METRICS.liver, labs) };
    }
    case 'joints': {
      const labs = labsFor(HEALTH_ORGAN_CONDITIONS.joints);
      const { score } = scoreFromMetrics(LAB_METRICS.gout, labs);
      if (score === null) return null;
      return { score, factors: labFactors(LAB_METRICS.gout, labs) };
    }
    case 'thyroid': {
      const labs = labsFor(HEALTH_ORGAN_CONDITIONS.thyroid);
      const { score } = scoreFromMetrics(LAB_METRICS.thyroid, labs);
      if (score === null) return null;
      return { score, factors: labFactors(LAB_METRICS.thyroid, labs) };
    }
  }
};