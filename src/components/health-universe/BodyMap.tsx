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
  thyroid: { id: 'thyroid', emoji: '🦋', x: 200, y: 136, conditionIds: ['thyroid'] },
  heart: {
    id: 'heart',
    emoji: '💗',
    x: 168,
    y: 252,
    conditionIds: ['hypertension', 'cholesterol'],
  },
  pancreas: { id: 'pancreas', emoji: '🩸', x: 208, y: 306, conditionIds: ['diabetes'] },
  liver: { id: 'liver', emoji: '🧡', x: 230, y: 342, conditionIds: ['liver'] },
  kidneys: { id: 'kidneys', emoji: '🫘', x: 172, y: 396, conditionIds: ['kidney'] },
  gut: { id: 'gut', emoji: '🥦', x: 200, y: 452, conditionIds: ['ibs'] },
  joints: { id: 'joints', emoji: '🦶', x: 168, y: 596, conditionIds: ['gout'] },
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
        .hu-dot { transform-box: fill-box; transform-origin: center; transition: transform .2s ease; }
        .hu-dot:hover { transform: scale(1.2); }
        .hu-active { transform: scale(1.15); }
        .hu-glow { transform-box: fill-box; transform-origin: center; }
        .hu-active .hu-glow { animation: hu-glow-pulse 1.6s ease-in-out infinite; }
        @keyframes hu-glow-pulse { 0%,100% { transform: scale(1); opacity:.25; } 50% { transform: scale(1.6); opacity:.06; } }
        .hu-tooltip { position:absolute; transform: translate(-50%, -135%); white-space: nowrap; pointer-events: none; }
      `}</style>
      <svg
        viewBox="0 0 400 800"
        className="w-full max-w-[300px] sm:max-w-[420px] mx-auto block select-none"
        fill="none"
        aria-label={t('universe.title')}
      >
        <rect width="400" height="800" rx="40" fill="#F4F1EB" />
        <g>
          <circle cx="200" cy="78" r="44" fill="#0F4C3A" />
          <rect x="188" y="118" width="24" height="24" rx="9" fill="#0F4C3A" />
          <path d="M158 162 Q151 260 158 428 L242 428 Q249 260 242 162 Q200 148 158 162 Z" fill="#0F4C3A" />
          <path d="M160 176 Q124 206 114 332" stroke="#0F4C3A" strokeWidth="22" strokeLinecap="round" />
          <path d="M240 176 Q276 206 286 332" stroke="#0F4C3A" strokeWidth="22" strokeLinecap="round" />
          <path d="M168 424 Q166 522 170 644" stroke="#0F4C3A" strokeWidth="24" strokeLinecap="round" />
          <path d="M232 424 Q234 522 230 644" stroke="#0F4C3A" strokeWidth="24" strokeLinecap="round" />
          <path d="M170 636 Q156 656 142 652" stroke="#0F4C3A" strokeWidth="20" strokeLinecap="round" />
          <path d="M230 636 Q244 656 258 652" stroke="#0F4C3A" strokeWidth="20" strokeLinecap="round" />
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