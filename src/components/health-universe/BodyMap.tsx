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
  x: number;
  y: number;
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
  brain: { id: 'brain', emoji: '🧠', x: 200, y: 70, conditionIds: [] },
  thyroid: { id: 'thyroid', emoji: '🦋', x: 200, y: 150, conditionIds: ['thyroid'] },
  heart: {
    id: 'heart',
    emoji: '💗',
    x: 165,
    y: 250,
    conditionIds: ['hypertension', 'cholesterol'],
  },
  pancreas: { id: 'pancreas', emoji: '🩸', x: 200, y: 360, conditionIds: ['diabetes'] },
  liver: { id: 'liver', emoji: '🧡', x: 235, y: 320, conditionIds: ['liver'] },
  kidneys: { id: 'kidneys', emoji: '🫘', x: 175, y: 400, conditionIds: ['kidney'] },
  gut: { id: 'gut', emoji: '🥦', x: 200, y: 480, conditionIds: ['ibs'] },
  joints: { id: 'joints', emoji: '🦶', x: 255, y: 650, conditionIds: ['gout'] },
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

  const limbs = [
    'M120,196 C96,226 82,296 86,370 C88,416 98,452 110,474',
    'M280,196 C304,226 318,296 314,370 C312,416 302,452 290,474',
    'M162,452 C155,540 152,638 153,736',
    'M238,452 C245,540 248,638 247,736',
  ];

  return (
    <div className="relative" dir={dir}>
      <style>{`
        .hu-fig path, .hu-fig circle, .hu-fig rect { vector-effect: non-scaling-stroke; }
        .hu-solid { fill: url(#hu-fill); stroke: #0F4C3A; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
        .hu-limb { fill: none; stroke: rgba(15,76,58,0.06); stroke-width: 30; stroke-linecap: round; }
        .hu-limb-outer { fill: none; stroke: #0F4C3A; stroke-width: 2; stroke-linecap: round; }
        .hu-detail { fill: none; stroke: #0F4C3A; stroke-width: 2; stroke-linecap: round; stroke-opacity: 0.35; }
        .hu-dot { transition: transform .2s ease; cursor: pointer; filter: drop-shadow(0 4px 10px rgba(212,175,55,0.45)); }
        .hu-dot:hover { transform: scale(1.2); }
        .hu-active { animation: hu-pulse 1.6s ease-in-out infinite; }
        @keyframes hu-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .hu-tooltip { position:absolute; transform: translate(-50%, -135%); white-space: nowrap; pointer-events: none; }
      `}</style>
      <svg
        viewBox="0 0 400 800"
        className="w-full max-w-[300px] sm:max-w-[360px] mx-auto block select-none"
        fill="none"
        aria-label={t('universe.title')}
      >
        <defs>
          <radialGradient id="hu-bg" cx="50%" cy="38%" r="68%">
            <stop offset="0%" stopColor="rgba(15,76,58,0.07)" />
            <stop offset="100%" stopColor="rgba(15,76,58,0)" />
          </radialGradient>
          <linearGradient id="hu-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(15,76,58,0.045)" />
            <stop offset="55%" stopColor="rgba(15,76,58,0.075)" />
            <stop offset="100%" stopColor="rgba(15,76,58,0.045)" />
          </linearGradient>
        </defs>

        <rect width="400" height="800" rx="44" fill="url(#hu-bg)" />
        <rect
          x="14"
          y="14"
          width="372"
          height="772"
          rx="30"
          fill="none"
          stroke="#0F4C3A"
          strokeOpacity="0.10"
          strokeWidth="1.5"
          strokeDasharray="2 8"
        />

        <g className="hu-fig">
          {limbs.map((d) => (
            <path key={`${d}-body`} d={d} className="hu-limb" />
          ))}
          {limbs.map((d) => (
            <path key={d} d={d} className="hu-limb-outer" />
          ))}

          <path
            d="M150,730 Q122,730 110,744 Q101,756 116,760 Q138,764 151,748 Z"
            className="hu-solid"
          />
          <path
            d="M250,730 Q278,730 290,744 Q299,756 284,760 Q262,764 249,748 Z"
            className="hu-solid"
          />

          <rect x="100" y="480" width="22" height="34" rx="11" className="hu-solid" />
          <rect x="278" y="480" width="22" height="34" rx="11" className="hu-solid" />

          <path
            d="M200,130 L187,133 C154,141 126,160 114,190 C105,214 108,248 112,282 C117,310 122,338 134,370 C146,401 152,424 152,446 C152,462 158,468 164,471 C179,480 221,480 236,471 C242,468 248,462 248,446 C248,424 254,401 266,370 C278,338 283,310 288,282 C292,248 295,214 286,190 C274,160 246,141 213,133 Z"
            className="hu-solid"
          />

          <path
            d="M191,124 h18 a8,8 0 0 1 8,8 v20 a8,8 0 0 1 -8,8 h-18 a8,8 0 0 1 -8,-8 v-20 a8,8 0 0 1 8,-8 Z"
            className="hu-solid"
          />
          <circle cx="200" cy="86" r="38" className="hu-solid" />

          <path d="M162,84 a7,7 0 0 0 0,10" className="hu-detail" />
          <path d="M238,84 a7,7 0 0 1 0,10" className="hu-detail" />
          <path d="M192,110 Q200,117 208,110" className="hu-detail" strokeOpacity="0.3" />

          <path d="M160,198 Q200,182 240,198" className="hu-detail" />
          <path d="M150,372 Q200,382 250,372" className="hu-detail" />
        </g>

        {ORGAN_IDS.map((id) => {
          const { x, y, emoji } = ORGAN_CONFIG[id];
          const active = id === activeOrgan;
          return (
            <g
              key={id}
              className={`hu-dot ${active ? 'hu-active' : ''}`}
              role="button"
              aria-pressed={active}
              aria-label={t(organNameKey(id))}
              onClick={() => onSelect(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={x} cy={y} r="14" fill="#D4AF37" stroke="#FFFFFF" strokeWidth="2" />
              <text
                x={x}
                y={y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="15"
              >
                {emoji}
              </text>
            </g>
          );
        })}
      </svg>

      {hovered && (
        <div
          className="hu-tooltip z-20"
          style={{
            left: `${(ORGAN_CONFIG[hovered].x / 400) * 100}%`,
            top: `${(ORGAN_CONFIG[hovered].y / 800) * 100}%`,
          }}
        >
          <span className="block rounded-full bg-[#0F4C3A] text-[#FDFBF7] border border-[#D4AF37]/40 text-xs font-bold px-3 py-1.5 shadow-[0_6px_18px_rgba(15,76,58,0.28)]">
            {t(organNameKey(hovered))}
          </span>
        </div>
      )}
    </div>
  );
};

export default BodyMap;