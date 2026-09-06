import React, { useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export type FunnelGoal = 'lose_fat' | 'gain_weight' | 'overall_health' | 'gain_muscle';

export const incompatibleGoals: Record<FunnelGoal, FunnelGoal[]> = {
  lose_fat: ['gain_weight'],
  gain_weight: ['lose_fat'],
  overall_health: [],
  gain_muscle: [],
};

const GOALS: Array<{
  key: FunnelGoal;
  emoji: string;
  nameKey: 'wlfGoalLoseTitle' | 'wlfGoalGainTitle' | 'wlfGoalHealthTitle' | 'wlfGoalMuscleTitle';
  descKey: 'wlfGoalLoseDesc' | 'wlfGoalGainDesc' | 'wlfGoalHealthDesc' | 'wlfGoalMuscleDesc';
  kcal?: (tdee: number) => number;
}> = [
  { key: 'lose_fat', emoji: '🔥', nameKey: 'wlfGoalLoseTitle', descKey: 'wlfGoalLoseDesc', kcal: (tdee) => Math.round(tdee - 500) },
  { key: 'gain_weight', emoji: '⚖️', nameKey: 'wlfGoalGainTitle', descKey: 'wlfGoalGainDesc', kcal: (tdee) => Math.round(tdee + 450) },
  { key: 'overall_health', emoji: '❤️', nameKey: 'wlfGoalHealthTitle', descKey: 'wlfGoalHealthDesc' },
  { key: 'gain_muscle', emoji: '💪', nameKey: 'wlfGoalMuscleTitle', descKey: 'wlfGoalMuscleDesc', kcal: (tdee) => Math.round(tdee + 300) },
];

interface GoalSelectorProps {
  selected: FunnelGoal[];
  onChange: (goals: FunnelGoal[]) => void;
  error?: string | null;
  tdee: number;
}

const GoalSelector: React.FC<GoalSelectorProps> = ({ selected, onChange, error, tdee }) => {
  const { t } = useLanguage();
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const name = (goal: FunnelGoal) => t(GOALS.find((g) => g.key === goal)!.nameKey);

  const toggleGoal = (goal: FunnelGoal) => {
    if (selected.includes(goal)) {
      onChange(selected.filter((g) => g !== goal));
      return;
    }
    const block = incompatibleGoals[goal] || [];
    const conflict = selected.find((g) => block.includes(g));
    if (conflict) {
      setToast(t('wlfCannotCombine').replace('{a}', name(goal)).replace('{b}', name(conflict)));
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setToast(null), 2600);
      return;
    }
    onChange([...selected, goal]);
  };

  const isDisabled = (goal: FunnelGoal) => {
    const block = incompatibleGoals[goal] || [];
    return selected.some((g) => block.includes(g));
  };

  return (
    <section className="card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white text-sm font-bold">1</span>
            {t('wlfStepGoalTitle')}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{t('wlfStepGoalSub')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        {GOALS.map((goal) => {
          const isSelected = selected.includes(goal.key);
          const disabled = isDisabled(goal.key);
          const conflict = disabled ? selected.find((g) => (incompatibleGoals[goal.key] || []).includes(g)) : undefined;
          return (
            <button
              key={goal.key}
              type="button"
              onClick={() => toggleGoal(goal.key)}
              disabled={disabled}
              title={conflict ? t('wlfCannotCombine').replace('{a}', name(goal.key)).replace('{b}', name(conflict)) : undefined}
              className={`relative text-left rounded-2xl border-2 p-4 transition-all ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50'
                  : disabled
                    ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                    : 'border-gray-200 bg-white hover:border-emerald-300'
              }`}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
              )}
              <span className="block text-xl">{goal.emoji}</span>
              <span className="mt-1.5 block font-bold text-gray-900">{t(goal.nameKey)}</span>
              <span className="mt-0.5 block text-xs text-gray-500 leading-relaxed">{t(goal.descKey)}</span>
              <span className="mt-2.5 block">
                {goal.kcal ? (
                  <span className="inline-flex items-baseline gap-1 bg-white border border-gray-200 px-2.5 py-1 rounded-lg">
                    <span className="font-bold text-gray-900">{goal.kcal(tdee)}</span>
                    <span className="text-[11px] text-gray-500">{t('wlfKcalDay')}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                    <span>{t('wlfGoalNoTargetDesc')}</span>
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-3 text-sm font-semibold text-rose-600 flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 inline-flex items-center justify-center text-[10px] font-bold">!</span>
          {error}
        </p>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-rose-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}
    </section>
  );
};

export default GoalSelector;