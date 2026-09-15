import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';
import type { ConditionId } from '../../data/conditions';
import type { HealthOrganId } from '../../utils/healthScoring';

type TKey = keyof typeof translations.en;

export type OrganId = HealthOrganId;

export type ToolKey = 'lab' | 'nutrition' | 'exercise';

export interface OrganConfig {
  id: OrganId;
  emoji: string;
  top: number;
  left: number;
  conditionIds: ConditionId[];
  route?: string;
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
  brain: {
    id: 'brain',
    emoji: '🧠',
    top: 8,
    left: 50,
    conditionIds: ['mental-wellness'],
    route: 'mental-wellness',
  },
  thyroid: { id: 'thyroid', emoji: '🦋', top: 21, left: 50, conditionIds: ['thyroid'] },
  heart: { id: 'heart', emoji: '❤️', top: 31, left: 56, conditionIds: ['heart-lipids'] },
  pancreas: { id: 'pancreas', emoji: '🩸', top: 44, left: 50, conditionIds: ['diabetes-insulin'] },
  liver: { id: 'liver', emoji: '🧡', top: 38, left: 44, conditionIds: ['fatty-liver'] },
  kidneys: { id: 'kidneys', emoji: '🫘', top: 55, left: 42, conditionIds: ['kidney-ckd', 'kidney-stones'] },
  gut: { id: 'gut', emoji: '🥦', top: 57, left: 50, conditionIds: ['gut-ibs'] },
  joints: { id: 'joints', emoji: '🦶', top: 85, left: 42, conditionIds: ['gout', 'pcos', 'weight-obesity', 'bones-joints'] },
};

export interface ConditionDotConfig {
  id: ConditionId;
  emoji: string;
  top: number;
  left: number;
  organId: OrganId;
}

export const CONDITION_DOT_CONFIG: readonly ConditionDotConfig[] = [
  { id: 'mental-wellness', emoji: '🧠', top: 8, left: 50, organId: 'brain' },
  { id: 'thyroid', emoji: '🦋', top: 19, left: 50, organId: 'thyroid' },
  { id: 'heart-lipids', emoji: '❤️', top: 28, left: 56, organId: 'heart' },
  { id: 'fatty-liver', emoji: '🫀', top: 35, left: 44, organId: 'liver' },
  { id: 'diabetes-insulin', emoji: '🩸', top: 40, left: 50, organId: 'pancreas' },
  { id: 'kidney-ckd', emoji: '🫘', top: 47, left: 43, organId: 'kidneys' },
  { id: 'kidney-stones', emoji: '💧', top: 49, left: 57, organId: 'kidneys' },
  { id: 'gut-ibs', emoji: '🍽️', top: 52, left: 50, organId: 'gut' },
  { id: 'pcos', emoji: '🌸', top: 56, left: 50, organId: 'joints' },
  { id: 'weight-obesity', emoji: '⚖️', top: 44, left: 50, organId: 'joints' },
  { id: 'bones-joints', emoji: '🦴', top: 68, left: 42, organId: 'joints' },
  { id: 'gout', emoji: '🦶', top: 88, left: 50, organId: 'joints' },
];

export const organNameKey = (id: OrganId): TKey => `universe.organ.${id}.name` as TKey;
export const organConditionKey = (id: OrganId): TKey =>
  `universe.organ.${id}.condition` as TKey;
export const organDescKey = (id: OrganId): TKey => `universe.organ.${id}.desc` as TKey;

export type { OrganStatus } from '../../utils/healthScoring';
export {
  LAB_STORAGE_KEY,
  readStoredLabs,
  writeStoredLabs,
  organScore,
  organHasLabData,
  organStatus,
  getOrganDetail,
} from '../../utils/healthScoring';

const BODY_MAP_SRC = '/assets/body-map.png';

interface BodyMapProps {
  selectedConditions?: readonly ConditionId[];
  selectedOrgans?: readonly OrganId[];
  onToggle?: (id: OrganId) => void;
}

const BodyMap: React.FC<BodyMapProps> = ({ selectedConditions = [] }) => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<OrganId | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-[500px]" dir={dir}>
      <style>{`
        @keyframes hu-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        .hu-active { animation: hu-pulse 1.6s ease-in-out infinite; }
        .hu-selected { animation: hu-pulse 2s ease-in-out infinite; }
      `}</style>
      <img
        src={BODY_MAP_SRC}
        alt={t('universe.title')}
        className="w-full h-auto select-none"
        draggable={false}
      />

      {CONDITION_DOT_CONFIG.map((cfg) => {
        const selected = selectedConditions.includes(cfg.id);
        return (
          <div
            key={cfg.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${cfg.top}%`, left: `${cfg.left}%` }}
          >
            <button
              type="button"
              onClick={() => navigate(`/advanced-care/${cfg.organId}`)}
              aria-pressed={selected}
              aria-label={cfg.id}
              onMouseEnter={() => setHovered(cfg.organId)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white transition-transform duration-200 hover:scale-125 active:scale-95 ${
                selected
                  ? 'bg-[#0F4C3A] ring-4 ring-[#D4AF37] hu-selected'
                  : 'bg-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.7)]'
              }`}
            >
              <span className="sr-only">{cfg.emoji}</span>
            </button>

            {hovered === cfg.organId && (
              <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#D4AF37]/40 bg-[#0F4C3A] px-3 py-1.5 text-xs font-bold text-[#FDFBF7] shadow-[0_6px_18px_rgba(15,76,58,0.28)]">
                {cfg.emoji}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BodyMap;