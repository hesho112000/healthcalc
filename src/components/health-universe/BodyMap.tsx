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
  brain: { id: 'brain', emoji: '🧠', x: 200, y: 80, conditionIds: [] },
  thyroid: { id: 'thyroid', emoji: '🦋', x: 200, y: 150, conditionIds: ['thyroid'] },
  heart: {
    id: 'heart',
    emoji: '💗',
    x: 168,
    y: 250,
    conditionIds: ['hypertension', 'cholesterol'],
  },
  pancreas: { id: 'pancreas', emoji: '🩸', x: 200, y: 360, conditionIds: ['diabetes'] },
  liver: { id: 'liver', emoji: '🧡', x: 232, y: 320, conditionIds: ['liver'] },
  kidneys: { id: 'kidneys', emoji: '🫘', x: 180, y: 400, conditionIds: ['kidney'] },
  gut: { id: 'gut', emoji: '🥦', x: 200, y: 470, conditionIds: ['ibs'] },
  joints: { id: 'joints', emoji: '🦶', x: 180, y: 650, conditionIds: ['gout'] },
};

export const organNameKey = (id: OrganId): TKey => `universe.organ.${id}.name` as TKey;
export const organConditionKey = (id: OrganId): TKey =>
  `universe.organ.${id}.condition` as TKey;
export const organDescKey = (id: OrganId): TKey => `universe.organ.${id}.desc` as TKey;

export type OrganStatus = 'critical' | 'warning' | 'healthy';

export const organScore = (id: OrganId): number => {
  const ids = ORGAN_CONFIG[id].conditionIds;
  if (ids.length === 0) return 97;
  const scores = ids.map((cid) => {
    const data = CONDITION_DATA[cid];
    if (!data) return 90;
    const flags = Object.entries(data.nutritionRules).filter(([, v]) => v === true).length;
    const raw =
      88 - data.avoidKeywords.length * 0.5 + data.preferKeywords.length * 1.2 - flags * 1.5;
    return Math.round(Math.max(48, Math.min(97, raw)));
  });
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
};

export const organStatus = (score: number): OrganStatus =>
  score >= 85 ? 'healthy' : score >= 70 ? 'warning' : 'critical';

interface BodyMapProps {
  activeOrgan: OrganId | null;
  onSelect: (id: OrganId) => void;
}

const BodyMap: React.FC<BodyMapProps> = ({ activeOrgan, onSelect }) => {
  const { t, dir } = useLanguage();
  const [hovered, setHovered] = useState<OrganId | null>(null);

  return (
    <div className="relative" dir={dir}>
      <style>{`
        .hu-dot { transform-box: fill-box; transform-origin: center; transition: transform .2s ease; cursor: pointer; }
        .hu-dot:hover { transform: scale(1.2); }
        .hu-active { transform: scale(1.15); }
        .hu-glow { transform-box: fill-box; transform-origin: center; }
        .hu-active .hu-glow { animation: hu-glow-pulse 1.5s ease-in-out infinite; }
        @keyframes hu-glow-pulse { 0%,100% { transform: scale(1); opacity:.35; } 50% { transform: scale(1.75); opacity:.08; } }
        .hu-dot-ring { animation: hu-ring-dim 3s ease-in-out infinite; }
        .hu-active .hu-dot-ring { animation: hu-ring-pulse 1.5s ease-in-out infinite; }
        @keyframes hu-ring-dim { 0%,100% { opacity:.55; } 50% { opacity:.9; } }
        @keyframes hu-ring-pulse { 0%,100% { opacity:1; } 50% { opacity:.55; } }
        .hu-bodyline { stroke: #0F4C3A; stroke-linecap: round; stroke-linejoin: round; fill: none; }
        .hu-tooltip { position:absolute; transform: translate(-50%, -135%); white-space: nowrap; pointer-events: none; }
      `}</style>
      <svg
        viewBox="0 0 400 800"
        className="w-full max-w-[300px] sm:max-w-[420px] mx-auto block select-none"
        fill="none"
        aria-label={t('universe.title')}
      >
        <rect width="400" height="800" rx="40" fill="#F4F1EB" />
        <rect x="16" y="16" width="368" height="768" rx="30" stroke="#0F4C3A" strokeOpacity="0.10" strokeWidth="1.5" strokeDasharray="3 7" fill="none" />

        <circle cx="200" cy="40" r="64" fill="#D4AF37" opacity="0.10" />
        <circle cx="200" cy="740" r="70" fill="#0F4C3A" opacity="0.06" />

        <line x1="200" y1="176" x2="200" y2="720" stroke="#0F4C3A" strokeOpacity="0.10" strokeWidth="1.5" strokeDasharray="2 8" />

        <g className="hu-bodyline" strokeWidth="3.5">
          <circle cx="200" cy="80" r="46" fill="#FDFBF7" />
          <path d="M156,72 a14,14 0 0 0 0,20" fill="none" />
          <path d="M244,72 a14,14 0 0 1 0,20" fill="none" />

          <g strokeWidth="2" strokeOpacity="0.55">
            <path d="M182,78 q3,5 7,0" fill="none" />
            <path d="M211,78 q3,5 7,0" fill="none" />
            <path d="M200,84 v8" fill="none" />
            <path d="M193,99 q7,6 14,0" fill="none" />
          </g>

          <path
            d="M186,122 h28 a7,7 0 0 1 7,7 v22 a7,7 0 0 1 -7,7 h-28 a7,7 0 0 1 -7,-7 v-22 a7,7 0 0 1 7,-7 Z"
            fill="#FDFBF7"
          />

          <path
            d="M188,158 C156,166 146,196 148,224 C149,254 161,292 168,330 C177,368 160,410 163,448 C166,482 196,492 200,492 C204,492 234,482 237,448 C240,410 223,368 232,330 C239,292 251,254 252,224 C254,196 244,166 212,158 C208,156 192,156 188,158 Z"
            fill="#FDFBF7"
          />

          <path d="M172,212 Q200,198 228,212" stroke="#D4AF37" strokeOpacity="0.75" strokeWidth="2" fill="none" />
          <path d="M200,344 v10" strokeOpacity="0.5" strokeWidth="2" fill="none" />

          <path d="M152,188 C140,252 137,390 146,512" />
          <path d="M248,188 C260,252 263,390 254,512" />
          <path d="M143,506 q-6,24 1,44" />
          <path d="M257,506 q6,24 -1,44" />

          <path d="M164,444 C155,548 158,652 161,748" />
          <path d="M236,444 C245,548 242,652 239,748" />
          <path d="M160,626 q0,8 0,16" strokeOpacity="0.4" strokeWidth="2" />
          <path d="M240,626 q0,8 0,16" strokeOpacity="0.4" strokeWidth="2" />

          <rect x="118" y="746" width="52" height="16" rx="8" transform="rotate(8 144 754)" fill="#FDFBF7" />
          <rect x="230" y="746" width="52" height="16" rx="8" transform="rotate(-8 256 754)" fill="#FDFBF7" />
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
              <circle className="hu-dot-ring" cx={x} cy={y} r="9" fill="none" stroke="#D4AF37" strokeWidth="2" />
              <circle className="hu-glow" cx={x} cy={y} r="20" fill="#D4AF37" opacity="0.22" />
              <circle cx={x} cy={y} r="14" fill="#D4AF37" stroke="#FDFBF7" strokeWidth="2" />
              <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central" fontSize="15">
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