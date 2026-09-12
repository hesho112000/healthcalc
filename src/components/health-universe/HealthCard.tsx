import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Dumbbell, Microscope, Plus, UtensilsCrossed, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';
import LabInterpreter, { isLabCondition } from '../lab/LabInterpreter';
import { exercisePoolFor, foodPoolFor } from '../../data/conditions';
import type { FoodScore } from '../../data/conditions';
import type { Exercise } from '../../data/exercises/types';
import type { FoodItem } from '../../utils/calculations';
import {
  ORGAN_CONFIG,
  organConditionKey,
  organDescKey,
  organNameKey,
  organScore,
  organStatus,
} from './BodyMap';
import type { OrganId, OrganStatus, ToolKey } from './BodyMap';

type TKey = keyof typeof translations.en;

const scoreMeta: Record<OrganStatus, { bar: string; text: string; chip: string }> = {
  healthy: {
    bar: '#0F4C3A',
    text: 'text-[#0F4C3A]',
    chip: 'bg-[#0F4C3A]/10 text-[#0F4C3A]',
  },
  warning: {
    bar: '#D4AF37',
    text: 'text-[#9c7c1e]',
    chip: 'bg-[#D4AF37]/15 text-[#8a6d1c]',
  },
  critical: {
    bar: '#B91C1C',
    text: 'text-[#B91C1C]',
    chip: 'bg-[#B91C1C]/10 text-[#B91C1C]',
  },
};

const toolMeta: Record<ToolKey, { icon: React.ReactNode; labelKey: TKey }> = {
  lab: { icon: <Microscope size={20} strokeWidth={2.2} />, labelKey: 'universe.tool.lab' },
  nutrition: {
    icon: <UtensilsCrossed size={20} strokeWidth={2.2} />,
    labelKey: 'universe.tool.nutrition',
  },
  exercise: {
    icon: <Dumbbell size={20} strokeWidth={2.2} />,
    labelKey: 'universe.tool.exercise',
  },
};

interface HealthCardProps {
  organ: OrganId;
  inPlan: boolean;
  onTogglePlan: () => void;
  onClose: () => void;
}

const HealthCard: React.FC<HealthCardProps> = ({ organ, inPlan, onTogglePlan, onClose }) => {
  const { t, dir, language } = useLanguage();
  const [tool, setTool] = useState<ToolKey | null>(null);

  const config = ORGAN_CONFIG[organ];
  const conditionIds = config.conditionIds;
  const score = organScore(organ);
  const status = organStatus(score);
  const meta = scoreMeta[status];

  const labConditionIds = useMemo(
    () => conditionIds.filter((id) => isLabCondition(id)),
    [conditionIds],
  );
  const foods = useMemo(
    () => foodPoolFor(conditionIds).filter((item) => item.score !== 'avoid').slice(0, 6),
    [conditionIds],
  );
  const exercises = useMemo(
    () => exercisePoolFor(conditionIds).filter((item) => item.score !== 'avoid').slice(0, 6),
    [conditionIds],
  );

  const exNameKey = (({ en: 'nameEn', fr: 'nameFr', es: 'nameEs', ar: 'nameAr', de: 'nameEn' }) as const)[
    language
  ];
  const foodName = (f: FoodItem): string =>
    language === 'ar' ? f.name_ar || f.name_en : f.name_en || f.name;
  const exerciseName = (ex: Exercise): string => ex[exNameKey] || ex.nameEn;

  const scoreLabelKey: TKey =
    status === 'critical'
      ? 'universe.score.critical'
      : status === 'warning'
        ? 'universe.score.warning'
        : 'universe.score.healthy';

  const BadgeDot: React.FC<{ score: FoodScore }> = ({ score }) =>
    score === 'limit' ? (
      <span className="shrink-0 rounded-full bg-[#D4AF37]/15 text-[#8a6d1c] text-[10px] font-extrabold px-2 py-0.5">
        {t('wizard.badge.limit')}
      </span>
    ) : (
      <span className="shrink-0 w-2.5 h-2.5 rounded-full bg-[#0F4C3A]" />
    );

  return (
    <div className="hu-slide-in relative max-w-xl mx-auto" dir={dir}>
      <style>{`
        .hu-slide-in { animation: hu-slide-in .35s cubic-bezier(.2,.7,.3,1); }
        @keyframes hu-slide-in { from { opacity:0; transform: translateX(24px); } to { opacity:1; transform: translateX(0); } }
      `}</style>
      <div className="rounded-[28px] border border-[#EFEBE4] bg-white p-6 sm:p-8 shadow-[0_18px_50px_rgba(15,76,58,0.08)]">
        <div className="flex items-start gap-4">
          <span className="w-14 h-14 shrink-0 rounded-full bg-[#F4F1EB] flex items-center justify-center text-3xl">
            {config.emoji}
          </span>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-extrabold text-[#0F4C3A] leading-tight">
              {t(organNameKey(organ))}
            </h2>
            <span className="inline-block mt-1.5 rounded-full bg-[#D4AF37]/15 text-[#8a6d1c] text-[11px] font-bold px-3 py-1">
              {t(organConditionKey(organ))}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 w-9 h-9 rounded-full bg-[#F4F1EB] text-[#0F4C3A] hover:bg-[#EFEBE4] flex items-center justify-center transition-colors"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        <button
          type="button"
          onClick={onTogglePlan}
          className={`mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-extrabold transition-all ${
            inPlan
              ? 'bg-[#0F4C3A] text-[#FDFBF7] shadow-[0_10px_26px_rgba(15,76,58,0.25)]'
              : 'bg-[#D4AF37] text-[#0F4C3A] hover:bg-[#c9a12f] shadow-[0_10px_26px_rgba(212,175,55,0.35)]'
          }`}
        >
          {inPlan ? <Check size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
          {t(inPlan ? 'universe.cta.added' : 'universe.cta.addToPlan')}
        </button>

        {!tool && (
          <>
            <p className="mt-5 text-sm text-[#6B7A75] leading-relaxed">
              {t(organDescKey(organ))}
            </p>

            <div className="mt-6 rounded-2xl bg-[#FDFBF7] border border-[#EFEBE4] p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-extrabold text-[#0F4C3A]">
                  {t('universe.score.title')}
                </span>
                <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${meta.chip}`}>
                  {t(scoreLabelKey)}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-2.5 rounded-full bg-[#F4F1EB] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${score}%`, background: meta.bar }}
                  />
                </div>
                <span className={`text-xl font-extrabold tabular-nums ${meta.text}`}>{score}</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(toolMeta) as ToolKey[]).map((tk) => (
                  <button
                    key={tk}
                    type="button"
                    onClick={() => setTool(tk)}
                    className="group rounded-2xl border border-[#EFEBE4] bg-white p-4 text-start hover:border-[#D4AF37]/60 hover:shadow-[0_12px_28px_rgba(15,76,58,0.08)] transition-all"
                  >
                    <span className="w-10 h-10 rounded-xl bg-[#F4F1EB] text-[#0F4C3A] flex items-center justify-center group-hover:bg-[#D4AF37]/15 transition-colors">
                      {toolMeta[tk].icon}
                    </span>
                    <span className="mt-3 block text-sm font-extrabold text-[#0F4C3A]">
                      {t(toolMeta[tk].labelKey)}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#6B7A75]">
                      <ArrowRight size={12} strokeWidth={2.5} className="rtl:rotate-180" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {tool && (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setTool(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7A75] hover:text-[#0F4C3A] transition-colors"
            >
              <ArrowRight size={14} strokeWidth={2.5} className="rtl:rotate-180" />
              {t('universe.tools.back')}
            </button>
            <div className="mt-3 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#8a6d1c] flex items-center justify-center">
                {toolMeta[tool].icon}
              </span>
              <h3 className="text-base font-extrabold text-[#0F4C3A]">
                {t(toolMeta[tool].labelKey)}
              </h3>
            </div>

            <div className="mt-4">
              {conditionIds.length === 0 ? (
                <p className="text-sm text-[#6B7A75] leading-relaxed rounded-2xl bg-[#F4F1EB] p-4">
                  {t('universe.comingSoon')}
                </p>
              ) : tool === 'lab' ? (
                labConditionIds.length > 0 ? (
                  <LabInterpreter conditions={labConditionIds} />
                ) : (
                  <p className="text-sm text-[#6B7A75] leading-relaxed rounded-2xl bg-[#F4F1EB] p-4">
                    {t('universe.tools.labNone')}
                  </p>
                )
              ) : tool === 'nutrition' ? (
                <div className="space-y-2.5">
                  {foods.length === 0 && (
                    <p className="text-sm text-[#6B7A75] leading-relaxed rounded-2xl bg-[#F4F1EB] p-4">
                      {t('universe.comingSoon')}
                    </p>
                  )}
                  {foods.map(({ food, score }) => (
                    <div
                      key={food.name_en}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-[#FDFBF7] border border-[#EFEBE4] px-4 py-3"
                    >
                      <span className="text-sm font-bold text-[#0F4C3A] min-w-0 break-words">
                        {foodName(food)}
                      </span>
                      <span className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-[#6B7A75] font-bold">
                          {food.calories} kcal
                        </span>
                        <BadgeDot score={score} />
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {exercises.length === 0 && (
                    <p className="text-sm text-[#6B7A75] leading-relaxed rounded-2xl bg-[#F4F1EB] p-4">
                      {t('universe.comingSoon')}
                    </p>
                  )}
                  {exercises.map(({ exercise, score }) => (
                    <div
                      key={exercise.id}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-[#FDFBF7] border border-[#EFEBE4] px-4 py-3"
                    >
                      <span className="text-sm font-bold text-[#0F4C3A] min-w-0 break-words">
                        {exerciseName(exercise)}
                      </span>
                      <span className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-[#6B7A75] font-bold">
                          {exercise.duration}
                        </span>
                        <BadgeDot score={score} />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthCard;