import React from 'react';
import type { TKey, WizardGoal, WizardProfile, PlanIntensity } from './stepTypes';

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

const GOAL_OPTIONS: Array<{ id: Exclude<WizardGoal['type'], ''>; emoji: string; key: string }> = [
  { id: 'lose', emoji: '⚖️', key: 'wizard.goal.lose' },
  { id: 'gain', emoji: '💪', key: 'wizard.goal.gain' },
  { id: 'general', emoji: '🌿', key: 'wizard.goal.general' },
  { id: 'maintain', emoji: '🛡️', key: 'wizard.goal.maintain' },
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
  const currentWeight = Number(profile.weight) || 0;
  const targetWeight = Number(goal.targetWeight);
  const targetIsValid =
    !goal.targetWeight ||
    (targetWeight > 0 &&
      targetWeight < 300 &&
      (goal.type === 'lose' ? targetWeight < currentWeight : goal.type === 'gain' ? targetWeight > currentWeight : true));
  const ready = Boolean(
    goal.type && goal.intensity && targetIsValid && (goal.type === 'general' ? true : targetWeight > 0),
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.goal.title'))}</h3>
        <div className="grid grid-cols-2 gap-2">
          {GOAL_OPTIONS.map(({ id, emoji, key }) => {
            const active = goal.type === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange({ type: id })}
                className={`rounded-2xl border bg-white p-3.5 text-left transition ${
                  active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'
                }`}
              >
                <span className="text-xl block">{emoji}</span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">{t(tk(key))}</span>
                <span className="text-[11px] text-[#4A5A55] block mt-0.5">{t(tk(`${key}.desc`))}</span>
              </button>
            );
          })}
        </div>
      </div>

      {goal.type && goal.type !== 'general' && (
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