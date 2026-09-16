import React from 'react';
import { CONDITION_DATA } from '../../data/conditions';
import type { ConditionId } from '../../data/conditions';
import type { TKey, LabValues } from './stepTypes';

type T = (key: TKey) => string;

const tk = (key: string): TKey => key as TKey;

const LAB_FIELD_UNITS: Record<string, string> = {
  fasting: 'mg/dL', hba1c: '%', systolic: 'mmHg', diastolic: 'mmHg', uricAcid: 'mg/dL',
  total: 'mg/dL', ldl: 'mg/dL', hdl: 'mg/dL', triglycerides: 'mg/dL',
  alt: 'U/L', ast: 'U/L', bilirubin: 'mg/dL', creatinine: 'mg/dL',
  egfr: 'mL/min', potassium: 'mmol/L', tsh: 'mIU/L', t3: 'ng/dL', t4: 'µg/dL',
  vitaminD: 'ng/mL', b12: 'pg/mL', iron: 'µg/L',
};

const LAB_FIELD_KEYS: Record<Exclude<ConditionId, 'ibs'>, string[]> = {
  diabetes: ['fasting', 'hba1c'],
  hypertension: ['systolic', 'diastolic'],
  cholesterol: ['total', 'ldl', 'hdl', 'triglycerides'],
  gout: ['uricAcid'],
  liver: ['alt', 'ast', 'bilirubin'],
  kidney: ['creatinine', 'egfr', 'potassium'],
  thyroid: ['tsh', 't3', 't4'],
  'mental-wellness': ['vitaminD', 'b12', 'iron', 'tsh'],
  'heart-lipids': ['systolic', 'diastolic', 'total', 'ldl', 'hdl', 'triglycerides'],
  'kidney-stones': ['uricAcid'],
  pcos: ['fasting', 'hba1c'],
  'weight-obesity': [],
  'bones-joints': ['vitaminD'],
};

const LAB_FIELD_HINTS = new Set([
  'fasting', 'hba1c', 'systolic', 'diastolic', 'uricAcid', 'total', 'ldl', 'hdl',
  'triglycerides', 'alt', 'ast', 'bilirubin', 'creatinine', 'egfr', 'potassium', 'tsh',
  'vitaminD', 'b12', 'iron',
]);

interface LabsStepProps {
  t: T;
  selected: ConditionId[];
  hasLabs: boolean | null;
  setHasLabs: (val: boolean | null) => void;
  labs: LabValues;
  setLabs: (next: LabValues) => void;
  onContinue: () => void;
}

const LabsStep: React.FC<LabsStepProps> = ({ t, selected, hasLabs, setHasLabs, labs, setLabs, onContinue }) => {
  const activeFields = selected.flatMap((id) => (id === 'ibs' ? [] : LAB_FIELD_KEYS[id] ?? []));
  const labReady =
    hasLabs === false ||
    (hasLabs === true && selected.every((id) => id === 'ibs' || (LAB_FIELD_KEYS[id] ?? []).every((key) => labs[key]?.trim())));

  return (
    <div className="space-y-5">
      <p className="text-[#4A5A55]">{t(tk('wizard.labsIntro'))}</p>

      <div className="grid md:grid-cols-2 gap-4">
        {([
          ['true', t(tk('wizard.labsYes')), '📋'],
          ['false', t(tk('wizard.labsNo')), '🌱'],
        ] as const).map(([value, label, emoji]) => {
          const active = hasLabs === (value === 'true');
          return (
            <button
              key={value}
              type="button"
              onClick={() => setHasLabs(value === 'true')}
              className={`rounded-2xl border bg-white p-5 text-left transition ${
                active
                  ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]'
                  : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'
              }`}
            >
              <span className="text-2xl">{emoji}</span>
              <strong className="block mt-2 text-slate-900">{label}</strong>
              <small className="block mt-1 text-[#4A5A55]">
                {value === 'true' ? t(tk('wizard.labsYesSub')) : t(tk('wizard.labsNoSub'))}
              </small>
            </button>
          );
        })}
      </div>

      {hasLabs === true && activeFields.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          {activeFields.map((key) => (
            <label key={key} className="block text-sm font-semibold text-slate-900">
              {t(tk(`wizard.lab.${key}`))} <span className="text-[#4A5A55] font-normal">({LAB_FIELD_UNITS[key]})</span>
              <input
                required
                type="number"
                value={labs[key] || ''}
                onChange={(e) => setLabs({ ...labs, [key]: e.target.value })}
                placeholder={LAB_FIELD_HINTS.has(key) ? t(tk(`advanced.lab.field.${key}.hint`)) : '—'}
                className="w-full mt-2 rounded-xl border border-[#EFEBE4] px-4 py-3 outline-none focus:border-[#D4AF37] bg-[#F4F1EB]/40 text-slate-900"
              />
              {LAB_FIELD_HINTS.has(key) && (
                <small className="text-[#4A5A55] font-normal">{t(tk(`advanced.lab.field.${key}.hint`))}</small>
              )}
            </label>
          ))}
        </div>
      )}

      {hasLabs === false && activeFields.length > 0 && (
        <div className="rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 p-4">
          <p className="text-sm font-bold text-[#0F4C3A] mb-2">{t(tk('wizard.recommendedTests'))}</p>
          <ul className="space-y-1">
            {activeFields.map((key) => (
              <li key={key} className="text-sm text-[#4A5A55] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                {t(tk(`wizard.lab.${key}`))} ({LAB_FIELD_UNITS[key]})
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-[#4A5A55] bg-[#F4F1EB]/60 rounded-xl p-3">{t(tk('wizard.labNote'))}</p>

      {hasLabs === true && (
        <div className={`p-4 rounded-2xl text-sm font-bold ${labReady ? 'bg-[#0F4C3A]/10 text-[#0F4C3A]' : 'bg-[#D4AF37]/15 text-[#0F4C3A]'}`}>
          {labReady ? '✓ ' + t(tk('wizard.step6.planHeader')) : t(tk('wizard.step6.empty'))}
        </div>
      )}

      <button
        type="button"
        disabled={hasLabs === null || (hasLabs === true && !labReady)}
        onClick={onContinue}
        className="w-full mt-4 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition disabled:opacity-40"
      >
        {t(tk('wizard.care.next'))}
      </button>
    </div>
  );
};

export default LabsStep;