import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { WIZARD_EXERCISE_TYPES, getWizardExercisesByType } from '../../data/exercises';

interface Props {
  onSelectType: (typeId: string) => void;
  selectedType: string | null;
}

export const ExerciseTypeSelector: React.FC<Props> = ({ onSelectType, selectedType }) => {
  const { t, dir } = useLanguage();

  return (
    <div className="rounded-[20px] bg-white border border-[#EFEBE4] shadow-[0_2px_10px_rgba(15,76,58,0.05)] p-5">
      <h2 className="text-[18px] font-extrabold text-[#0F4C3A]">{t('wizard.exerciseType.title')}</h2>
      <p className="mt-1 text-[13px] text-[#6B7A75]">{t('wizard.exerciseType.subtitle')}</p>

      <div className="ex-type-rail mt-4" dir={dir}>
        {WIZARD_EXERCISE_TYPES.map((ty) => {
          const isActive = selectedType === ty.id;
          const exercises = getWizardExercisesByType(ty.id);
          return (
            <button
              key={ty.id}
              type="button"
              onClick={() => onSelectType(ty.id)}
              className={`ex-type-card ${isActive ? 'on' : ''}`}
              dir={dir}
            >
              <span className="text-[28px] leading-none select-none">{ty.emoji}</span>
              <span className="text-[13px] font-bold text-[#0F4C3A] leading-tight mt-1">{t(`wizard.exerciseType.name.${ty.id}` as any)}</span>
              <span className="text-[10px] text-[#6B7A75] font-medium">{t('wizard.exerciseType.count').replace('{n}', String(exercises.length))}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};