import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';
import type { ConditionId } from '../../data/conditions';
import type { HealthOrganId } from '../../utils/healthScoring';

type TKey = keyof typeof translations.en;

export interface BodyDot {
  id: ConditionId;
  key: string;
  emoji: string;
  top: number;
  left: number;
  route: string;
}

export const BODY_DOTS: readonly BodyDot[] = [
  { id: 'mental-wellness', key: 'brain', emoji: '🧠', top: 8, left: 50, route: 'mental-wellness' },
  { id: 'thyroid', key: 'thyroid', emoji: '🦋', top: 19, left: 50, route: 'thyroid' },
  { id: 'heart-lipids', key: 'heart', emoji: '❤️', top: 28, left: 56, route: 'heart' },
  { id: 'liver', key: 'liver', emoji: '🫀', top: 35, left: 44, route: 'liver' },
  { id: 'diabetes', key: 'pancreas', emoji: '🩸', top: 40, left: 50, route: 'pancreas' },
  { id: 'kidney', key: 'kidneys', emoji: '🫘', top: 47, left: 43, route: 'kidneys' },
  { id: 'kidney-stones', key: 'stones', emoji: '💧', top: 49, left: 57, route: 'stones' },
  { id: 'ibs', key: 'gut', emoji: '🥦', top: 52, left: 50, route: 'gut' },
  { id: 'pcos', key: 'pcos', emoji: '🌸', top: 56, left: 50, route: 'pcos' },
  { id: 'weight-obesity', key: 'weight', emoji: '⚖️', top: 44, left: 50, route: 'weight' },
  { id: 'bones-joints', key: 'bones', emoji: '🦴', top: 68, left: 42, route: 'bones' },
  { id: 'gout', key: 'joints', emoji: '🦶', top: 88, left: 50, route: 'joints' },
];

export const dotNameKey = (id: ConditionId): TKey => `wizard.condition.${id}.name` as TKey;

export const ORGAN_META: Record<HealthOrganId, { emoji: string }> = {
  brain: { emoji: '🧠' },
  thyroid: { emoji: '🦋' },
  heart: { emoji: '❤️' },
  pancreas: { emoji: '🩸' },
  liver: { emoji: '🫀' },
  kidneys: { emoji: '🫘' },
  stones: { emoji: '💧' },
  gut: { emoji: '🥦' },
  joints: { emoji: '🦶' },
  pcos: { emoji: '🌸' },
  weight: { emoji: '⚖️' },
  bones: { emoji: '🦴' },
};

export const organNameKey = (id: HealthOrganId): TKey => `universe.organ.${id}.name` as TKey;
export const organConditionKey = (id: HealthOrganId): TKey =>
  `universe.organ.${id}.condition` as TKey;
export const organDescKey = (id: HealthOrganId): TKey => `universe.organ.${id}.desc` as TKey;

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

interface BodyMapProps {
  selectedConditions?: readonly ConditionId[];
  interactive?: boolean;
}

const BodyMap: React.FC<BodyMapProps> = ({ selectedConditions = [], interactive = true }) => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[420px]" dir={dir}>
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

      <div className={interactive ? '' : 'pointer-events-none'}>
        {BODY_DOTS.map((dot) => {
          const selected = selectedConditions.includes(dot.id);
          return (
            <div
              key={dot.key}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${dot.top}%`, left: `${dot.left}%` }}
            >
              <button
                type="button"
                onClick={() => navigate(`/advanced-care/${dot.route}`)}
                aria-pressed={selected}
                aria-label={t(dotNameKey(dot.id))}
                onMouseEnter={() => setHovered(dot.key)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative flex h-[18px] w-[18px] items-center justify-center rounded-full before:absolute before:rounded-full before:inset-[-13px] before:content-[''] sm:h-6 sm:w-6 sm:before:inset-[-10px] transition-all duration-200 active:scale-95 ${
                  selected
                    ? 'border-[3px] border-[#D4AF37] bg-[#0F4C3A] shadow-[0_4px_14px_rgba(212,175,55,0.55)]'
                    : 'border-2 border-white bg-[#D4AF37] shadow-[0_4px_12px_rgba(212,175,55,0.45)] hover:scale-110'
                } ${selected ? 'hu-selected' : ''} ${hovered === dot.key && !selected ? 'hu-active' : ''}`}
              >
                <span className="select-none text-[10px]">{dot.emoji}</span>

                {selected && (
                  <span className="absolute -bottom-1 -end-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] shadow-[0_2px_6px_rgba(212,175,55,0.6)] sm:h-[18px] sm:w-[18px]">
                    <Check size={10} strokeWidth={3.5} className="text-[#FDFBF7]" />
                  </span>
                )}
              </button>

              {hovered === dot.key && (
                <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#D4AF37]/40 bg-[#0F4C3A] px-3 py-1.5 text-xs font-bold text-[#FDFBF7] shadow-[0_6px_18px_rgba(15,76,58,0.28)]">
                  {t(dotNameKey(dot.id))}
                  {selected ? ` · ${t('universe.cta.added')}` : ''}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BodyMap;