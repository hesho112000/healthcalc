import React from 'react';
import type { TKey, WizardGoal, WizardProfile, PlanIntensity, WeightGoalKey, LifestyleGoalKey } from './stepTypes';

type T = (key: TKey) => string;

const tk = (key: string): TKey => key as TKey;

interface GoalStepProps {
  t: T;
  goal: WizardGoal;
  profile: WizardProfile;
  onChange: (patch: Partial<WizardGoal>) => void;
  calorieTarget: number;
  timelineStep: number;
  deficits?: Record<string, number>;
  onContinue: () => void;
}

const INTENSITY_OPTIONS: Array<{ id: PlanIntensity; emoji: string }> = [
  { id: 'light', emoji: '🌱' },
  { id: 'medium', emoji: '⚖️' },
  { id: 'intense', emoji: '🔥' },
];

const WEIGHT_GOAL_OPTIONS: Array<{ id: WeightGoalKey; emoji: string; key: string; requiresTarget: boolean }> = [
  { id: 'lose', emoji: '⚖️', key: 'wizard.goal.loseWeight', requiresTarget: true },
  { id: 'gain', emoji: '💪', key: 'wizard.goal.gainMuscle', requiresTarget: true },
  { id: 'maintain', emoji: '⚖️', key: 'wizard.goal.maintain', requiresTarget: false },
];

const LIFESTYLE_GOAL_OPTIONS: Array<{ id: LifestyleGoalKey; emoji: string; key: string }> = [
  { id: 'general', emoji: '🌿', key: 'wizard.goal.generalHealth' },
  { id: 'athletic', emoji: '🏃', key: 'wizard.goal.athletic' },
  { id: 'sleep', emoji: '😴', key: 'wizard.goal.sleep' },
  { id: 'stress', emoji: '🧘', key: 'wizard.goal.stress' },
];

const GoalStep: React.FC<GoalStepProps> = ({
  t,
  goal,
  profile,
  onChange,
  calorieTarget,
  timelineStep,
  deficits = {},
  onContinue,
}) => {
  const weightGoal = goal.weightGoal ?? null;
  const lifestyleGoals = goal.lifestyleGoals ?? [];

  const currentWeight = Number(profile.weight) || 0;
  const targetWeight = Number(goal.targetWeight);
  const needsTarget = weightGoal === 'lose' || weightGoal === 'gain';
  const targetIsValid =
    !goal.targetWeight ||
    (targetWeight > 0 &&
      targetWeight < 300 &&
      (weightGoal === 'lose'
        ? targetWeight < currentWeight
        : weightGoal === 'gain'
          ? targetWeight > currentWeight
          : true));
  const ready = Boolean(
    goal.intensity &&
      (weightGoal !== null || lifestyleGoals.length > 0) &&
      targetIsValid &&
      (!needsTarget || targetWeight > 0),
  );

  const toggleWeightGoal = (id: WeightGoalKey) => onChange({ weightGoal: id });
  const toggleLifestyleGoal = (id: LifestyleGoalKey) => {
    const next = lifestyleGoals.includes(id) ? lifestyleGoals.filter((g) => g !== id) : [...lifestyleGoals, id];
    onChange({ lifestyleGoals: next });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.goal.weightGoalLabel'))}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {WEIGHT_GOAL_OPTIONS.map(({ id, emoji, key }) => {
            const active = weightGoal === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => toggleWeightGoal(id)}
                className={`rounded-2xl border bg-white p-3.5 text-left transition ${
                  active
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]'
                    : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'
                }`}
              >
                <span className="text-xl block">{emoji}</span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">{t(tk(key))}</span>
              </button>
            );
          })}
        </div>
      </div>

      {weightGoal === 'maintain' && (
        <div className="rounded-2xl border border-[#EFEBE4] bg-[#F4F1EB] p-4 text-sm font-semibold text-[#0F4C3A]">
          {t(tk('wizard.goal.maintainHint'))}
        </div>
      )}

      {needsTarget && (
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block text-sm font-semibold text-slate-900">
            {t(tk('wizard.targetWeight'))}
            <input
              type="number"
              min="20"
              max="300"
              value={goal.targetWeight}
              placeholder={String(profile.weight)}
              onChange={(e) => onChange({ targetWeight: e.target.value })}
              className="w-full mt-2 rounded-xl border border-[#EFEBE4] px-4 py-3 outline-none focus:border-[#D4AF37] bg-[#F4F1EB]/40 text-slate-900"
            />
            {goal.targetWeight && targetWeight > 0 && !targetIsValid && (
              <span className="mt-1.5 block text-[11px] font-bold text-[#B91C1C]">
                {t(tk(weightGoal === 'lose' ? 'wizard.goal.validation.lose' : 'wizard.goal.validation.gain'))}
              </span>
            )}
          </label>
          <label className="block text-sm font-semibold text-slate-900">
            {t(tk('wizard.timeline'))} <output className="ml-2 text-[#D4AF37] font-bold">{goal.timelineMonths} {t(tk('wizard.months'))}</output>
            <input
              type="range"
              min="1"
              max="12"
              step={timelineStep}
              value={goal.timelineMonths}
              onChange={(e) => onChange({ timelineMonths: +e.target.value })}
              className="w-full mt-3 accent-[#0F4C3A]"
            />
          </label>
        </div>
      )}

      <div>
        <h3 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.goal.lifestyleGoalsLabel'))}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {LIFESTYLE_GOAL_OPTIONS.map(({ id, emoji, key }) => {
            const active = lifestyleGoals.includes(id);
            return (
              <button
                key={id}
                type="button"
                role="checkbox"
                aria-checked={active}
                onClick={() => toggleLifestyleGoal(id)}
                className={`rounded-2xl border bg-white p-3.5 text-left transition ${
                  active
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]'
                    : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'
                }`}
              >
                <span className="text-xl block">{emoji}</span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">{t(tk(key))}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.intensity'))}</h3>
        <div className="grid grid-cols-3 gap-2">
          {INTENSITY_OPTIONS.map(({ id, emoji }) => {
            const active = goal.intensity === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange({ intensity: id })}
                className={`rounded-2xl border bg-white p-3.5 text-center transition ${
                  active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'
                }`}
              >
                <span className="text-xl block">{emoji}</span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">{t(tk(`wizard.intensity.${id}`))}</span>
                <span className="text-[11px] text-[#4A5A55] block mt-0.5">
                  {t(tk(`wizard.intensity.${id}.desc`))} · −{deficits[id] ?? 0} kcal
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-[#0F4C3A] text-[#FDFBF7] p-4 flex items-center justify-between gap-3">
        <span className="text-sm font-bold">{t(tk('wizard.calorieTarget')).replace('{kcal}', String(calorieTarget))}</span>
      </div>

      <button
        type="button"
        disabled={!ready}
        onClick={onContinue}
        className="w-full mt-2 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition disabled:opacity-40"
      >
        {t(tk('wizard.care.next'))}
      </button>
    </div>
  );
};

export default GoalStep;