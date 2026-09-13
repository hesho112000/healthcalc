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

const BODY_MAP_SRC = `${import.meta.env.BASE_URL}assets/body-map.png`;

const BodyMap: React.FC = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<OrganId | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[420px]" dir={dir}>
      <style>{`
        @keyframes hu-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .hu-active { animation: hu-pulse 1.6s ease-in-out infinite; }
      `}</style>
      <img
        src={BODY_MAP_SRC}
        alt={t('universe.title')}
        className="w-full h-auto select-none"
        draggable={false}
      />

      {ORGAN_IDS.map((id) => {
        const cfg = ORGAN_CONFIG[id];
        return (
          <div
            key={id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${cfg.top}%`, left: `${cfg.left}%` }}
          >
            <button
              type="button"
              onClick={() => navigate(`/advanced-care/${cfg.route ?? cfg.id}`)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`${t(organNameKey(id))} · ${t(organConditionKey(id))}`}
              className={`relative flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white bg-[#D4AF37] shadow-[0_4px_12px_rgba(212,175,55,0.45)] transition-transform duration-200 hover:scale-110 active:scale-95 sm:h-6 sm:w-6 ${
                hovered === id ? 'hu-active' : ''
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