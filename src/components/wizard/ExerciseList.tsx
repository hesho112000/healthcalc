import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { ExerciseItem, ExerciseDifficulty, ExerciseImpact } from '../../data/exercises';
import { getWizardExerciseType, getWizardExercisesByType } from '../../data/exercises';

const DIFF_COLOR: Record<ExerciseDifficulty, { bg: string; text: string }> = {
  easy: { bg: 'bg-[#D5F5E3]', text: 'text-[#0F4C3A]' },
  med: { bg: 'bg-[#FFF8E7]', text: 'text-[#B8860B]' },
  hard: { bg: 'bg-[#FFE8D5]', text: 'text-[#C05621]' },
};

const DIFF_LABEL_KEY: Record<ExerciseDifficulty, string> = {
  easy: 'wizard.exerciseList.diffEasy',
  med: 'wizard.exerciseList.diffMed',
  hard: 'wizard.exerciseList.diffHard',
};

const IMPACT_KEY: Record<ExerciseImpact, string> = {
  low: 'wizard.exerciseList.impact.low',
  medium: 'wizard.exerciseList.impact.medium',
  high: 'wizard.exerciseList.impact.high',
};

interface Props {
  selectedType: string | null;
  selectedExerciseIds: string[];
  onToggleExercise: (exercise: ExerciseItem) => void;
}

export const ExerciseList: React.FC<Props> = ({ selectedType, selectedExerciseIds, onToggleExercise }) => {
  const { t, dir } = useLanguage();

  const type = selectedType ? getWizardExerciseType(selectedType) : undefined;
  const exercises = selectedType ? getWizardExercisesByType(selectedType) : [];
  const typeName = selectedType ? t(`wizard.exerciseType.name.${selectedType}` as any) : '';

  return (
    <div className="space-y-5" dir={dir}>
      {/* divider */}
      <div className="flex items-center gap-3 my-2">
        <div className="flex-1 h-px bg-[#D5D2CC]" />
        <span className="text-[11px] sm:text-[12px] font-bold text-[#A0A8A4] uppercase tracking-[0.1em] whitespace-nowrap">
          {t('wizard.exerciseList.divider').replace('{type}', typeName)}
        </span>
        <div className="flex-1 h-px bg-[#D5D2CC]" />
      </div>

      {/* header */}
      <div>
        <h3 className="text-[20px] font-extrabold text-[#0F4C3A]">
          {t('wizard.exerciseList.title').replace('{type}', typeName)}
        </h3>
        <p className="mt-1 text-[13px] text-[#6B7A75]">{t('wizard.exerciseList.subtitle')}</p>
      </div>

      {/* exercise cards */}
      <div className="space-y-2.5">
        {exercises.map((ex) => {
          const isSelected = selectedExerciseIds.includes(ex.id);
          const diffColor = DIFF_COLOR[ex.difficulty];
          const impactLabel = t(IMPACT_KEY[ex.impact] as any);
          const diffLabel = t(DIFF_LABEL_KEY[ex.difficulty] as any);

          return (
            <div
              key={ex.id}
              className="w-full bg-white rounded-[16px] shadow-[0_2px_10px_rgba(15,76,58,0.06)] border border-[#EFEBE4] flex items-center gap-3 px-3 sm:px-4 py-3 transition-all hover:shadow-[0_4px_16px_rgba(15,76,58,0.1)]"
            >
              {/* emoji circle */}
              <div className="w-12 h-12 rounded-full bg-[#F4F1EB] flex items-center justify-center text-[24px] shrink-0 select-none">
                {ex.emoji}
              </div>

              {/* name + details */}
              <div className="flex-1 min-w-0">
                <div className="text-[14px] sm:text-[15px] font-bold text-[#0F4C3A] leading-tight truncate">{ex.name}</div>
                <div className="text-[11px] sm:text-[12px] text-[#6B7A75] leading-snug mt-0.5">
                  {ex.muscle} · {impactLabel}
                </div>
              </div>

              {/* duration + calories */}
              <div className="hidden sm:flex flex-col items-end shrink-0 text-[12px] sm:text-[13px] font-semibold text-[#0F4C3A] leading-snug">
                <span>{t('wizard.exerciseList.duration').replace('{n}', String(ex.minutes))}</span>
                <span className="text-[#6B7A75]">{t('wizard.exerciseList.calories').replace('{n}', String(ex.kcal))}</span>
              </div>

              {/* difficulty badge */}
              <span className={`${diffColor.bg} ${diffColor.text} text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0`}>
                {diffLabel}
              </span>

              {/* add button */}
              <button
                type="button"
                onClick={() => onToggleExercise(ex)}
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-90 text-[16px] font-extrabold ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#0F4C3A] shadow-[0_2px_10px_rgba(212,175,55,0.4)]'
                    : 'bg-[#FFF8E7] text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-white'
                }`}
                aria-label={isSelected ? 'Added' : 'Add'}
              >
                {isSelected ? '✓' : '+'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
