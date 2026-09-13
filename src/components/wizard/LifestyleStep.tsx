import React from 'react';
import type { TKey, WizardLifestyle } from './stepTypes';

type T = (key: TKey) => string;

const tk = (key: string): TKey => key as TKey;

interface LifestyleStepProps {
  t: T;
  lifestyle: WizardLifestyle;
  onChange: (patch: Partial<WizardLifestyle>) => void;
  onContinue: () => void;
}

const ACTIVITY_KEY: Record<string, { label: TKey; desc: TKey; emoji: string }> = {
  sedentary: { label: 'wizard.activity.sedentary', desc: 'wizard.activity.sedentary.desc', emoji: '🪑' },
  light:     { label: 'wizard.activity.light',         desc: 'wizard.activity.light.desc',         emoji: '🚶' },
  moderate:  { label: 'wizard.activity.moderate',       desc: 'wizard.activity.moderate.desc',      emoji: '🧍' },
  active:    { label: 'wizard.activity.active',         desc: 'wizard.activity.active.desc',         emoji: '🏃' },
  veryActive:{ label: 'wizard.activity.very_active',    desc: 'wizard.activity.very_active.desc',   emoji: '🏋️' },
};

const SLEEP_OPTIONS: Array<{ id: WizardLifestyle['sleep']; emoji: string }> = [
  { id: 'less6', emoji: '😴' },
  { id: '6to7', emoji: '💤' },
  { id: '7to8', emoji: '🌙' },
  { id: 'more8', emoji: '🛌' },
];

const STRESS_OPTIONS: Array<{ id: WizardLifestyle['stress']; emoji: string }> = [
  { id: 'low', emoji: '😌' },
  { id: 'medium', emoji: '🙂' },
  { id: 'high', emoji: '😰' },
];

const LifestyleStep: React.FC<LifestyleStepProps> = ({ t, lifestyle, onChange, onContinue }) => {
  const ready = Boolean(lifestyle.activity && lifestyle.sleep && lifestyle.stress);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.activity'))}</h3>
        <div className="space-y-2">
          {Object.entries(ACTIVITY_KEY).map(([id, entry]) => {
            const active = lifestyle.activity === id;
            const typedId = id as WizardLifestyle['activity'];
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange({ activity: typedId })}
                className={`w-full rounded-2xl border bg-white p-3.5 text-left transition ${
                  active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl">{entry.emoji}</span>
                  <span className="text-sm font-bold text-slate-900">{t(entry.label)}</span>
                  <span className="text-[#4A5A55] text-sm ml-auto text-right">{t(entry.desc)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.sleep'))}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SLEEP_OPTIONS.map(({ id, emoji }) => {
            const active = lifestyle.sleep === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange({ sleep: id })}
                className={`rounded-2xl border bg-white p-3 text-center transition ${
                  active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'
                }`}
              >
                <span className="text-xl block">{emoji}</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">{t(tk(`wizard.sleep.${id}`))}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.stress'))}</h3>
        <div className="grid grid-cols-3 gap-2">
          {STRESS_OPTIONS.map(({ id, emoji }) => {
            const active = lifestyle.stress === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange({ stress: id })}
                className={`rounded-2xl border bg-white p-3 text-center transition ${
                  active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'
                }`}
              >
                <span className="text-xl block">{emoji}</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">{t(tk(`wizard.stress.${id}`))}</span>
                <span className="text-[10px] text-[#4A5A55] block mt-0.5">{t(tk(`wizard.stress.${id}.desc`))}</span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        disabled={!ready}
        onClick={onContinue}
        className="w-full mt-4 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition disabled:opacity-40"
      >
        {t(tk('wizard.care.next'))}
      </button>
    </div>
  );
};

export default LifestyleStep;