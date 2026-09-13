import React from 'react';
import type { TKey } from './stepTypes';
import { CUISINE_CARDS, EXERCISE_TYPE_CATEGORIES } from './stepTypes';

type T = (key: TKey) => string;

const tk = (key: string): TKey => key as TKey;

interface CuisineExercisesStepProps {
  t: T;
  cuisine: string;
  onCuisine: (cuisine: string) => void;
  exerciseTypes: string[];
  onToggleExerciseType: (type: string) => void;
  onAutoSelect: () => void;
  onBuild: () => void;
}

const CuisineExercisesStep: React.FC<CuisineExercisesStepProps> = ({
  t,
  cuisine,
  onCuisine,
  exerciseTypes,
  onToggleExerciseType,
  onAutoSelect,
  onBuild,
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.cuisine'))}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {CUISINE_CARDS.map(({ id, flag, label }) => {
          const active = cuisine === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onCuisine(id)}
              className={`rounded-2xl border bg-white p-3 text-center transition ${
                active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'
              }`}
            >
              <span className="text-2xl block">{flag}</span>
              <span className={`text-xs font-bold mt-1 block ${active ? 'text-[#0F4C3A]' : 'text-slate-900'}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>

    <div>
      <h3 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.exercises'))}</h3>
      <div className="flex flex-wrap gap-2">
        {EXERCISE_TYPE_CATEGORIES.map(({ id, key, emoji }) => {
          const active = exerciseTypes.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => onToggleExerciseType(id)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                active
                  ? 'border-[#0F4C3A] bg-[#0F4C3A] text-[#FDFBF7]'
                  : 'border-[#EFEBE4] bg-white text-[#4A5A55] hover:border-[#0F4C3A]/40'
              }`}
            >
              <span className="mr-1.5">{emoji}</span>
              {t(tk(key))}
            </button>
          );
        })}
      </div>
    </div>

    <div className="rounded-2xl bg-[#0F4C3A] text-[#FDFBF7] p-4 flex items-center justify-between gap-3">
      <span className="text-sm font-bold">{t(tk('wizard.autoSelect'))}</span>
      <button
        type="button"
        onClick={onAutoSelect}
        className="rounded-full bg-[#D4AF37] text-[#0F4C3A] font-bold px-4 py-2 text-sm hover:bg-[#c9a52e] transition"
      >
        ✨ {t(tk('wizard.autoSelect'))}
      </button>
    </div>

    <button
      type="button"
      onClick={onBuild}
      className="w-full mt-2 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition"
    >
      {t(tk('wizard.buildPlan'))}
    </button>
  </div>
);

export default CuisineExercisesStep;