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
  brain: ['mental-wellness'],
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
  vitaminD: 'ng/mL',
  b12: 'pg/mL',
  iron: 'µg/L',
};

interface LabMetric {
  key: string;
  idealLo: number;
  idealHi: number;
  riskHi: number;
  invert?: boolean;
  weight?: number;
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
    { key: 'egfr', idealLo: 60, idealHi: 90, riskHi: 90, invert: true, weight: 2 },
    { key: 'potassium', idealLo: 3.5, idealHi: 5.0, riskHi: 5.5 },
  ],
  thyroid: [
    { key: 'tsh', idealLo: 0.4, idealHi: 4.0, riskHi: 10, weight: 2 },
    { key: 't3', idealLo: 80, idealHi: 200, riskHi: 240 },
    { key: 't4', idealLo: 4.5, idealHi: 12.5, riskHi: 14 },
  ],
  'mental-wellness': [
    { key: 'vitaminD', idealLo: 30, idealHi: 60, riskHi: 100 },
    { key: 'b12', idealLo: 300, idealHi: 900, riskHi: 1200 },
    { key: 'iron', idealLo: 30, idealHi: 300, riskHi: 500 },
  ],
};

const clamp = (v: number, lo: number, hi: number): number =>
  Math.min(hi, Math.max(lo, v));

const piecewise = (points: readonly { x: number; y: number }[]) => {
  const graph = points.length === 0 ? [{ x: 0, y: 100 }] : points;
  return (value: number): number => {
    if (value <= graph[0].x) return graph[0].y;
    for (let i = 0; i < graph.length - 1; i += 1) {
      const a = graph[i];
      const b = graph[i + 1];
      if (value <= b.x) {
        const span = b.x - a.x || 1;
        const t = clamp((value - a.x) / span, 0, 1);
        return Math.round(a.y + (b.y - a.y) * t);
      }
    }
    return graph[graph.length - 1].y;
  };
};

const band = (points: readonly [number, number][]): ((v: number) => number) =>
  piecewise(points.map(([x, y]) => ({ x, y })));

const BANDS: Record<string, (v: number) => number> = {
  fasting: band([[70, 100], [99, 100], [125, 70], [250, 40]]),
  hba1c: band([[4, 100], [5.6, 100], [6.4, 70], [8, 40]]),
  systolic: band([[90, 100], [119, 100], [129, 80], [139, 60], [180, 40]]),
  diastolic: band([[60, 100], [79, 100], [89, 80], [99, 60], [120, 40]]),
  total: band([[125, 100], [199, 100], [239, 70], [350, 40]]),
  ldl: band([[40, 100], [99, 100], [129, 70], [190, 40]]),
  hdl: band([[20, 40], [40, 70], [60, 100], [90, 100]]),
  triglycerides: band([[50, 100], [149, 100], [199, 70], [350, 40]]),
  uricAcid: band([[2, 100], [5.9, 100], [7, 70], [8, 50], [10, 30]]),
  alt: band([[5, 100], [39, 100], [80, 70], [160, 40]]),
  ast: band([[5, 100], [39, 100], [80, 70], [160, 40]]),
  bilirubin: band([[0.1, 100], [1.2, 100], [2.4, 70], [5, 40]]),
  creatinine: band([[0.5, 100], [1.3, 100], [1.8, 70], [3, 45]]),
  egfr: band([[20, 30], [45, 50], [60, 70], [90, 100], [120, 100]]),
  potassium: band([[2.8, 40], [3.5, 100], [5, 100], [5.5, 70], [6.5, 40]]),
  tsh: band([[0.05, 35], [0.4, 100], [4, 100], [10, 70], [30, 40]]),
  t3: band([[50, 70], [80, 100], [200, 100], [240, 70], [300, 50]]),
  t4: band([[3, 60], [4.5, 100], [12.5, 100], [14, 70], [20, 50]]),
  vitaminD: band([[10, 50], [20, 70], [30, 100], [60, 100]]),
};

const sleepBand = band([[3, 40], [5, 70], [7, 100], [9, 100], [12, 70]]);

const ACTIVITY_SCORE: Record<string, number> = {
  sedentary: 45,
  light: 70,
  moderate: 85,
  active: 100,
  veryActive: 100,
};

export const readStoredLabs = (): Record<string, Record<string, number>> => {
  const out: Record<string, Record<string, number>> = {};
  const merge = (source: unknown): void => {
    if (!source || typeof source !== 'object' || Array.isArray(source)) return;
    Object.entries(source as Record<string, unknown>).forEach(([cid, values]) => {
      if (values && typeof values === 'object' && !Array.isArray(values)) {
        out[cid] = { ...(out[cid] ?? {}), ...(values as Record<string, number>) };
      }
    });
  };
  try {
    merge(JSON.parse(localStorage.getItem(LAB_STORAGE_KEY) || 'null'));
  } catch {
    /* ignore */
  }
  try {
    merge(JSON.parse(localStorage.getItem('healthcalc_labs') || 'null'));
  } catch {
    /* ignore */
  }
  return out;
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
  stress?: string;
  mood?: string;
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
  const stressVal = typeof s.stress === 'string' ? s.stress : typeof s.stressLevel === 'string' ? s.stressLevel : undefined;
  if (stressVal) out.stress = stressVal;
  if (typeof s.mood === 'string') out.mood = s.mood;
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
    mergeProfile(out, parse('healthcalc_user_profile'));
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

export const calculateMentalWellnessScore = (
  profile: UserProfileData | null | undefined,
  labs: Record<string, number> | null | undefined,
): number | null => {
  if (!profile || typeof profile !== 'object') return null;
  const l = labs ?? {};
  const sleep =
    typeof profile.sleepHours === 'number' && Number.isFinite(profile.sleepHours)
      ? profile.sleepHours
      : undefined;
  const stress =
    profile.stress === 'low' || profile.stress === 'medium' || profile.stress === 'high'
      ? profile.stress
      : undefined;
  const vitD =
    typeof l.vitaminD === 'number' && Number.isFinite(l.vitaminD) ? l.vitaminD : undefined;
  const activity =
    profile.activityLevel && ACTIVITY_SCORE[profile.activityLevel] !== undefined
      ? profile.activityLevel
      : undefined;

  const parts: Array<{ score: number; weight: number }> = [];
  if (typeof sleep === 'number') parts.push({ score: sleepBand(sleep), weight: 4 });
  if (stress) {
    parts.push({
      score: stress === 'low' ? 100 : stress === 'medium' ? 70 : 50,
      weight: 3,
    });
  }
  if (typeof vitD === 'number') parts.push({ score: BANDS.vitaminD(vitD), weight: 2 });
  if (activity) parts.push({ score: ACTIVITY_SCORE[activity], weight: 1 });

  if (parts.length === 0) return null;
  const weight = parts.reduce((acc, part) => acc + part.weight, 0);
  const total = parts.reduce((acc, part) => acc + part.score * part.weight, 0);
  return Math.round(total / weight);
};

const scoreFromMetrics = (
  metrics: readonly LabMetric[],
  labs: Record<string, number>,
): { score: number | null } => {
  let total = 0;
  let weight = 0;
  metrics.forEach((metric) => {
    const v = labs[metric.key];
    if (typeof v !== 'number' || !Number.isFinite(v)) return;
    const fn = BANDS[metric.key];
    if (!fn) return;
    const w = metric.weight ?? 1;
    total += fn(v) * w;
    weight += w;
  });
  if (weight === 0) return { score: null };
  return { score: Math.round(total / weight) };
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
  const byCount: Record<number, number> = { 1: 90, 2: 80, 3: 70, 4: 60, 5: 50, 6: 40, 7: 30 };
  return byCount[count] ?? 30;
};

export const calculateOverallScore = (scores: readonly number[]): number | null => {
  const valid = (scores || []).filter((v) => typeof v === 'number' && Number.isFinite(v));
  if (valid.length === 0) return null;
  return Math.round(valid.reduce((a, b) => a + b, 0) / valid.length);
};

export const organScore = (id: HealthOrganId): number | null => {
  switch (id) {
    case 'brain':
      return calculateMentalWellnessScore(readUserProfile(), labsFor(HEALTH_ORGAN_CONDITIONS.brain));
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
      const labs = labsFor(HEALTH_ORGAN_CONDITIONS.brain);
      const score = calculateMentalWellnessScore(profile, labs);
      if (score === null) return null;
      const factors: ScoreFactor[] = [];
      if (typeof profile.sleepHours === 'number') {
        factors.push({
          labelKey: 'universe.factor.sleepHours',
          value: num(profile.sleepHours),
          unitKey: 'universe.factor.hours',
        });
      }
      if (profile.stress) {
        factors.push({ labelKey: 'universe.factor.stress', value: profile.stress });
      }
      if (profile.activityLevel) {
        const activityKey =
          profile.activityLevel === 'veryActive' ? 'very_active' : profile.activityLevel;
        factors.push({
          labelKey: `wizard.activity.${activityKey}` as TKey,
          value: '',
        });
      }
      factors.push(...labFactors(LAB_METRICS['mental-wellness'], labs));
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

export interface ReferenceRangeItem {
  labelKey: TKey;
  value: string;
}

export const referenceRangesFor = (organ: HealthOrganId): ReferenceRangeItem[] => {
  const out: ReferenceRangeItem[] = [];
  HEALTH_ORGAN_CONDITIONS[organ].forEach((cid) => {
    (LAB_METRICS[cid] ?? []).forEach((metric) => {
      const unit = LAB_UNITS[metric.key] ?? '';
      out.push({
        labelKey: `advanced.lab.field.${metric.key}.label` as TKey,
        value: `${num(metric.idealLo)}–${num(metric.idealHi)}${unit ? ` ${unit}` : ''}`,
      });
    });
  });
  if (out.length === 0) {
    out.push({ labelKey: 'universe.factor.symptomCount', value: '0–5+' });
  }
  return out;
};