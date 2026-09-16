import React from 'react';
import type { TKey, WizardGoal, WizardProfile, PlanIntensity, GoalKey } from './stepTypes';

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

const GOAL_OPTIONS: Array<{ id: GoalKey; emoji: string; key: string; requiresTarget: boolean }> = [
  { id: 'lose', emoji: '⚖️', key: 'wizard.goal.loseWeight', requiresTarget: true },
  { id: 'gain', emoji: '💪', key: 'wizard.goal.gainMuscle', requiresTarget: true },
  { id: 'maintain', emoji: '⚖️', key: 'wizard.goal.maintain', requiresTarget: false },
  { id: 'general', emoji: '🌿', key: 'wizard.goal.generalHealth', requiresTarget: false },
  { id: 'athletic', emoji: '🏃', key: 'wizard.goal.athletic', requiresTarget: false },
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
  const goals = goal.goals ?? [];
  const requiresTarget = goals.includes('lose') || goals.includes('gain');
  const currentWeight = Number(profile.weight) || 0;
  const targetWeight = Number(goal.targetWeight);
  const targetIsValid =
    !goal.targetWeight ||
    (targetWeight > 0 &&
      targetWeight < 300 &&
      (goals.includes('lose')
        ? targetWeight < currentWeight
        : goals.includes('gain')
          ? targetWeight > currentWeight
          : true));
  const ready = Boolean(goals.length > 0 && goal.intensity && targetIsValid && (!requiresTarget || targetWeight > 0));

  const toggleGoal = (id: GoalKey) => {
    const next = goals.includes(id) ? goals.filter((g) => g !== id) : [...goals, id];
    onChange({ goals: next });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#0F4C3A]">{t(tk('wizard.goal.title'))}</h3>
          <span className="text-[11px] font-semibold text-[#6B7A75]">{t(tk('wizard.goal.multiSelectHint'))}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {GOAL_OPTIONS.map(({ id, emoji, key, requiresTarget: needsTarget }) => {
            const active = goals.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleGoal(id)}
                className={`rounded-2xl border bg-white p-3.5 text-left transition ${
                  active
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]'
                    : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'
                }`}
              >
                <span className="text-xl block">{emoji}</span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">{t(tk(key))}</span>
                {needsTarget && (
                  <span className="text-[11px] text-[#4A5A55] block mt-0.5">{t(tk('wizard.goal.targetHint'))}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {requiresTarget && (
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
              <span className="mt-1.5 block text-[11px] font-bold text-[#B91C1C]">{t(tk('wizard.targetError'))}</span>
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