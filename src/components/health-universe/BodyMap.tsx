import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';
import { CONDITION_DATA } from '../../data/conditions';
import type { ConditionId } from '../../data/conditions';

type TKey = keyof typeof translations.en;

export type OrganId =
  | 'brain'
  | 'heart'
  | 'pancreas'
  | 'liver'
  | 'kidneys'
  | 'thyroid'
  | 'gut'
  | 'joints';

export type ToolKey = 'lab' | 'nutrition' | 'exercise';

export interface OrganConfig {
  id: OrganId;
  emoji: string;
  top: number;
  left: number;
  conditionIds: ConditionId[];
}

export const ORGAN_IDS: readonly OrganId[] = [
  'brain',
  'thyroid',
  'heart',
  'pancreas',
  'liver',
  'kidneys',
  'gut',
  'joints',
];

export const ORGAN_CONFIG: Record<OrganId, OrganConfig> = {
  brain: { id: 'brain', emoji: '🧠', top: 8, left: 50, conditionIds: [] },
  thyroid: { id: 'thyroid', emoji: '🦋', top: 21, left: 50, conditionIds: ['thyroid'] },
  heart: {
    id: 'heart',
    emoji: '💗',
    top: 31,
    left: 56,
    conditionIds: ['hypertension', 'cholesterol'],
  },
  pancreas: { id: 'pancreas', emoji: '🩸', top: 44, left: 50, conditionIds: ['diabetes'] },
  liver: { id: 'liver', emoji: '🧡', top: 38, left: 44, conditionIds: ['liver'] },
  kidneys: { id: 'kidneys', emoji: '🫘', top: 55, left: 42, conditionIds: ['kidney'] },
  gut: { id: 'gut', emoji: '🥦', top: 57, left: 50, conditionIds: ['ibs'] },
  joints: { id: 'joints', emoji: '🦶', top: 85, left: 42, conditionIds: ['gout'] },
};

export const organNameKey = (id: OrganId): TKey => `universe.organ.${id}.name` as TKey;
export const organConditionKey = (id: OrganId): TKey =>
  `universe.organ.${id}.condition` as TKey;
export const organDescKey = (id: OrganId): TKey => `universe.organ.${id}.desc` as TKey;

export type OrganStatus = 'critical' | 'warning' | 'healthy';

export const LAB_STORAGE_KEY = 'hc_health_universe_labs';

interface LabSig {
  key: string;
  min: number;
  max: number;
  invert?: boolean;
}

const LAB_SIGS: Record<string, readonly LabSig[]> = {
  diabetes: [
    { key: 'fasting', min: 70, max: 99 },
    { key: 'hba1c', min: 4.0, max: 5.6 },
  ],
  hypertension: [
    { key: 'systolic', min: 90, max: 129 },
    { key: 'diastolic', min: 60, max: 84 },
  ],
  cholesterol: [
    { key: 'total', min: 125, max: 200 },
    { key: 'ldl', min: 40, max: 100 },
    { key: 'hdl', min: 40, max: 100, invert: true },
    { key: 'triglycerides', min: 50, max: 150 },
  ],
  gout: [{ key: 'uricAcid', min: 3.5, max: 7.2 }],
  liver: [
    { key: 'alt', min: 7, max: 56 },
    { key: 'ast', min: 10, max: 40 },
    { key: 'bilirubin', min: 0.1, max: 1.2 },
  ],
  kidney: [
    { key: 'creatinine', min: 0.6, max: 1.3 },
    { key: 'egfr', min: 60, max: 120, invert: true },
    { key: 'potassium', min: 3.5, max: 5.0 },
  ],
  thyroid: [
    { key: 'tsh', min: 0.4, max: 4.0 },
    { key: 't3', min: 80, max: 200 },
    { key: 't4', min: 4.5, max: 12.5 },
  ],
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

const labValueScore = (value: number, sig: LabSig): number => {
  if (sig.invert) {
    if (value >= sig.min) {
      if (value > sig.max) return 95;
      const span = sig.max - sig.min || 1;
      const t = Math.min(1, Math.max(0, (value - sig.min) / span));
      return Math.round(88 + (1 - Math.abs(t - 0.5) * 2) * 9);
    }
    const below = sig.min - value;
    if (below <= sig.min * 0.3) return 66;
    if (below <= sig.min * 0.6) return 50;
    return 32;
  }
  if (value >= sig.min && value <= sig.max) {
    const span = sig.max - sig.min || 1;
    const t = (value - sig.min) / span;
    return Math.round(88 + (1 - Math.abs(t - 0.5) * 2) * 9);
  }
  const excess = value > sig.max ? value - sig.max : sig.min - value;
  const bound = value > sig.max ? sig.max : sig.min;
  if (bound <= 0) return 40;
  const rel = excess / bound;
  if (rel <= 0.3) return 66;
  if (rel <= 0.7) return 50;
  return 32;
};

const conditionLabScore = (condition: string): number | null => {
  const stored = readStoredLabs()[condition];
  if (!stored) return null;
  const sigs = LAB_SIGS[condition];
  if (!sigs || sigs.length === 0) return null;
  const parts: number[] = [];
  sigs.forEach((sig) => {
    const v = stored[sig.key];
    if (typeof v === 'number' && Number.isFinite(v)) parts.push(labValueScore(v, sig));
  });
  if (parts.length === 0) return null;
  return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);
};

export const organScore = (id: OrganId): number | null => {
  const ids = ORGAN_CONFIG[id].conditionIds;
  if (ids.length === 0) return null;
  const parts = ids.map((cid) => {
    const lab = conditionLabScore(cid);
    if (lab !== null) return lab;
    const data = CONDITION_DATA[cid];
    return data && typeof data.defaultHealthScore === 'number'
      ? data.defaultHealthScore
      : 80;
  });
  return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);
};

export const organHasLabData = (id: OrganId): boolean =>
  ORGAN_CONFIG[id].conditionIds.some((cid) =>
    (LAB_SIGS[cid] ?? []).some((sig) => {
      const stored = readStoredLabs()[cid];
      return stored ? typeof stored[sig.key] === 'number' : false;
    }),
  );

export const organStatus = (score: number): OrganStatus =>
  score >= 80 ? 'healthy' : score >= 60 ? 'warning' : 'critical';

interface BodyMapProps {
  activeOrgan: OrganId | null;
  onSelect: (id: OrganId) => void;
}

const BodyMap: React.FC<BodyMapProps> = ({ activeOrgan, onSelect }) => {
  const { t, dir } = useLanguage();
  const [hovered, setHovered] = useState<OrganId | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[420px]" dir={dir}>
      <style>{`
        @keyframes hu-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .hu-active { animation: hu-pulse 1.6s ease-in-out infinite; }
      `}</style>
      <img
        src="/assets/body-map.png"
        alt={t('universe.title')}
        className="w-full h-auto select-none"
        draggable={false}
      />

      {ORGAN_IDS.map((id) => {
        const cfg = ORGAN_CONFIG[id];
        const active = id === activeOrgan;
        return (
          <div
            key={id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${cfg.top}%`, left: `${cfg.left}%` }}
          >
            <button
              type="button"
              onClick={() => onSelect(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              aria-pressed={active}
              aria-label={`${t(organNameKey(id))} · ${t(organConditionKey(id))}`}
              className={`relative flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white bg-[#D4AF37] shadow-[0_4px_12px_rgba(212,175,55,0.45)] transition-transform duration-200 hover:scale-110 active:scale-95 sm:h-6 sm:w-6 ${
                active ? 'hu-active' : ''
              }`}
            >
              <span className="select-none text-[10px]">{cfg.emoji}</span>
            </button>

            {hovered === id && (
              <span className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#D4AF37]/40 bg-[#0F4C3A] px-3 py-1.5 text-xs font-bold text-[#FDFBF7] shadow-[0_6px_18px_rgba(15,76,58,0.28)]">
                {t(organNameKey(id))}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BodyMap;