import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export type PlanType = 'both' | 'meal' | 'workout';

const PLANS: Array<{
  key: PlanType;
  emoji: string;
  nameKey: 'wlfPlanMealTitle' | 'wlfPlanWorkoutTitle' | 'wlfPlanBothTitle';
  descKey: 'wlfPlanMealDesc' | 'wlfPlanWorkoutDesc' | 'wlfPlanBothDesc';
}> = [
  { key: 'both', emoji: '🎯', nameKey: 'wlfPlanBothTitle', descKey: 'wlfPlanBothDesc' },
  { key: 'meal', emoji: '🍽️', nameKey: 'wlfPlanMealTitle', descKey: 'wlfPlanMealDesc' },
  { key: 'workout', emoji: '🏋️', nameKey: 'wlfPlanWorkoutTitle', descKey: 'wlfPlanWorkoutDesc' },
];

interface PlanTypeSelectorProps {
  value: PlanType;
  onChange: (planType: PlanType) => void;
}

const PlanTypeSelector: React.FC<PlanTypeSelectorProps> = ({ value, onChange }) => {
  const { t } = useLanguage();

  return (
    <section className="card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white text-sm font-bold">2</span>
            {t('wlfStepPlanTitle')}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{t('wlfStepPlanSub')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        {PLANS.map((plan) => {
          const isSelected = value === plan.key;
          return (
            <button
              key={plan.key}
              type="button"
              onClick={() => onChange(plan.key)}
              className={`text-left rounded-2xl border-2 p-4 transition-all ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
              }`}
            >
              <span className="flex items-center justify-between">
                <span className="text-xl">{plan.emoji}</span>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-emerald-600' : 'border-gray-300'
                }`}>
                  {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />}
                </span>
              </span>
              <span className="mt-1.5 block font-bold text-gray-900">{t(plan.nameKey)}</span>
              <span className="mt-0.5 block text-xs text-gray-500 leading-relaxed">{t(plan.descKey)}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default PlanTypeSelector;