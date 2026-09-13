import React from 'react';
import type { TKey, WizardProfile } from './stepTypes';

type T = (key: TKey) => string;

const tk = (key: string): TKey => key as TKey;

interface BasicInfoStepProps {
  t: T;
  profile: WizardProfile;
  onChange: (patch: Partial<WizardProfile>) => void;
  onContinue: () => void;
}

const bmiStatus = (bmi: number, t: T): string => {
  if (bmi < 18.5) return t(tk('wizard.bmiUnder'));
  if (bmi < 25) return t(tk('wizard.bmiNormal'));
  if (bmi < 30) return t(tk('wizard.bmiOver'));
  return t(tk('wizard.bmiObese'));
};

const bmiColor = (bmi: number): string => {
  if (bmi < 18.5) return 'bg-[#D4AF37]/15 text-[#8A6D1C] border-[#D4AF37]/40';
  if (bmi < 25) return 'bg-[#0F4C3A]/10 text-[#0F4C3A] border-[#0F4C3A]/25';
  if (bmi < 30) return 'bg-[#D4AF37]/15 text-[#8A6D1C] border-[#D4AF37]/40';
  return 'bg-[#B91C1C]/10 text-[#B91C1C] border-[#B91C1C]/25';
};

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ t, profile, onChange, onContinue }) => {
  const bmi = profile.height > 0 ? Math.round((profile.weight / Math.pow(profile.height / 100, 2)) * 10) / 10 : 0;

  return (
    <div className="space-y-5">
      <label className="block text-sm font-semibold text-slate-900">
        {t(tk('wizard.age'))} <output className="ml-2 text-[#D4AF37] font-bold">{profile.age} {t(tk('years'))}</output>
        <input
          type="range"
          min="18"
          max="80"
          value={profile.age}
          onChange={(e) => onChange({ age: +e.target.value })}
          className="w-full mt-3 accent-[#0F4C3A]"
        />
      </label>

      <div>
        <span className="block text-sm font-semibold text-slate-900 mb-2">{t(tk('wizard.sex'))}</span>
        <div className="flex gap-2">
          {([
            ['male', t(tk('wizard.male'))],
            ['female', t(tk('wizard.female'))],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ gender: value })}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                profile.gender === value
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0F4C3A]'
                  : 'border-[#EFEBE4] text-[#4A5A55] hover:border-[#0F4C3A]/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm font-semibold text-slate-900">
          {t(tk('wizard.height'))} <span className="text-[#4A5A55] font-normal">({t(tk('cm'))})</span>
          <input
            type="number"
            min="100"
            max="250"
            value={profile.height}
            onChange={(e) => onChange({ height: +e.target.value })}
            className="w-full mt-2 rounded-xl border border-[#EFEBE4] px-4 py-3 outline-none focus:border-[#D4AF37] bg-[#F4F1EB]/40 text-slate-900"
          />
        </label>
        <label className="block text-sm font-semibold text-slate-900">
          {t(tk('wizard.weight'))} <span className="text-[#4A5A55] font-normal">({t(tk('kg'))})</span>
          <input
            type="number"
            min="20"
            max="300"
            value={profile.weight}
            onChange={(e) => onChange({ weight: +e.target.value })}
            className="w-full mt-2 rounded-xl border border-[#EFEBE4] px-4 py-3 outline-none focus:border-[#D4AF37] bg-[#F4F1EB]/40 text-slate-900"
          />
        </label>
      </div>

      <div className="rounded-2xl bg-[#0F4C3A] text-[#FDFBF7] p-4 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">{t(tk('wizard.bmi'))}</span>
          <p className="mt-1 text-2xl font-extrabold tabular-nums">{bmi}</p>
        </div>
        <span className={`rounded-full border px-4 py-2 text-sm font-bold ${bmiColor(bmi)}`}>{bmiStatus(bmi, t)}</span>
      </div>

      <button
        type="button"
        disabled={!(profile.height >= 100 && profile.weight >= 20)}
        onClick={onContinue}
        className="w-full mt-4 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition disabled:opacity-40"
      >
        {t(tk('wizard.care.next'))}
      </button>
    </div>
  );
};

export default BasicInfoStep;