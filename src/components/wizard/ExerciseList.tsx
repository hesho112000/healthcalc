import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { ExerciseItem, ExerciseDifficulty } from '../../data/exercises';
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

const VISIBLE_COUNT = 6;

interface Props {
  selectedType: string | null;
  selectedExerciseIds: string[];
  onToggleExercise: (exercise: ExerciseItem) => void;
}

export const ExerciseList: React.FC<Props> = ({ selectedType, selectedExerciseIds, onToggleExercise }) => {
  const { t, dir } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const type = selectedType ? getWizardExerciseType(selectedType) : undefined;
  const exercises = selectedType ? getWizardExercisesByType(selectedType) : [];
  const typeName = selectedType ? t(`wizard.exerciseType.name.${selectedType}` as any) : '';

  const visible = showAll || exercises.length <= VISIBLE_COUNT ? exercises : exercises.slice(0, VISIBLE_COUNT);

  return (
    <div className="rounded-[20px] bg-white border border-[#EFEBE4] shadow-[0_2px_10px_rgba(15,76,58,0.05)] p-5" dir={dir}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[16px] font-extrabold text-[#0F4C3A]">
          {t('wizard.exerciseList.title').replace('{type}', typeName)}
        </h3>
        {type && (
          <span className="text-[11px] font-bold bg-[#F4F1EB] text-[#0F4C3A] px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
            {t('wizard.exerciseType.count').replace('{n}', String(exercises.length))}
          </span>
        )}
      </div>
      <p className="mt-1 text-[12px] text-[#4A5A55]">{t('wizard.exerciseList.subtitle')}</p>

      <div className="mt-4 space-y-2">
        {visible.map((ex) => {
          const isSelected = selectedExerciseIds.includes(ex.id);
          const diffColor = DIFF_COLOR[ex.difficulty];
          const diffLabel = t(DIFF_LABEL_KEY[ex.difficulty] as any);

          return (
            <div
              key={ex.id}
              className="w-full bg-white rounded-[12px] shadow-[0_2px_8px_rgba(15,76,58,0.06)] border border-[#EFEBE4] flex items-center gap-2.5 px-3 py-3 transition-all hover:shadow-[0_4px_14px_rgba(15,76,58,0.1)]"
            >
              <div className="w-9 h-9 rounded-full bg-[#F4F1EB] flex items-center justify-center text-[20px] shrink-0 select-none">
                {ex.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] font-bold text-[#0F4C3A] leading-tight truncate">{ex.name}</div>
                <div className="text-[11px] text-[#4A5A55] leading-snug mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  {t('wizard.exerciseList.duration').replace('{n}', String(ex.minutes))} ·{' '}
                  {t('wizard.exerciseList.calories').replace('{n}', String(ex.kcal))}
                </div>
              </div>

              <span className={`${diffColor.bg} ${diffColor.text} text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0`}>
                {diffLabel}
              </span>

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

      {exercises.length > VISIBLE_COUNT && (
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          className="mt-3 w-full h-10 rounded-[12px] text-[12.5px] font-bold text-[#0F4C3A] bg-[#F4F1EB] hover:bg-[#ECE8DD] border border-[#EFEBE4] transition-all"
        >
          {showAll ? t('wizard.exerciseList.showLess') : t('wizard.exerciseList.showAll').replace('{n}', String(exercises.length - VISIBLE_COUNT))}
        </button>
      )}
    </div>
  );
};