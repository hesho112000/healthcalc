import React, { useMemo, useState } from 'react';
import { ArrowRight, Microscope } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

export type LabCondition =
  | 'diabetes'
  | 'hypertension'
  | 'cholesterol'
  | 'gout'
  | 'liver'
  | 'kidney'
  | 'thyroid';

export const LAB_CONDITIONS: readonly LabCondition[] = [
  'diabetes',
  'hypertension',
  'cholesterol',
  'gout',
  'liver',
  'kidney',
  'thyroid',
];

export const isLabCondition = (value: string | null): value is LabCondition =>
  !!value && (LAB_CONDITIONS as readonly string[]).includes(value);

export const conditionEmoji: Record<LabCondition, string> = {
  diabetes: '🩸',
  hypertension: '💗',
  cholesterol: '🫀',
  gout: '🦶',
  liver: '🧡',
  kidney: '🫘',
  thyroid: '🦋',
};

type TKey = keyof typeof translations.en;

interface LabField {
  key: string;
  unit: string;
  labelKey: TKey;
  hintKey: TKey;
}

const conditionFields: Record<LabCondition, readonly LabField[]> = {
  diabetes: [
    { key: 'fasting', unit: 'mg/dL', labelKey: 'advanced.lab.field.fasting.label', hintKey: 'advanced.lab.field.fasting.hint' },
    { key: 'hba1c', unit: '%', labelKey: 'advanced.lab.field.hba1c.label', hintKey: 'advanced.lab.field.hba1c.hint' },
  ],
  hypertension: [
    { key: 'systolic', unit: 'mmHg', labelKey: 'advanced.lab.field.systolic.label', hintKey: 'advanced.lab.field.systolic.hint' },
    { key: 'diastolic', unit: 'mmHg', labelKey: 'advanced.lab.field.diastolic.label', hintKey: 'advanced.lab.field.diastolic.hint' },
  ],
  cholesterol: [
    { key: 'total', unit: 'mg/dL', labelKey: 'advanced.lab.field.total.label', hintKey: 'advanced.lab.field.total.hint' },
    { key: 'ldl', unit: 'mg/dL', labelKey: 'advanced.lab.field.ldl.label', hintKey: 'advanced.lab.field.ldl.hint' },
    { key: 'hdl', unit: 'mg/dL', labelKey: 'advanced.lab.field.hdl.label', hintKey: 'advanced.lab.field.hdl.hint' },
    { key: 'triglycerides', unit: 'mg/dL', labelKey: 'advanced.lab.field.triglycerides.label', hintKey: 'advanced.lab.field.triglycerides.hint' },
  ],
  gout: [
    { key: 'uricAcid', unit: 'mg/dL', labelKey: 'advanced.lab.field.uricAcid.label', hintKey: 'advanced.lab.field.uricAcid.hint' },
  ],
  liver: [
    { key: 'alt', unit: 'U/L', labelKey: 'advanced.lab.field.alt.label', hintKey: 'advanced.lab.field.alt.hint' },
    { key: 'ast', unit: 'U/L', labelKey: 'advanced.lab.field.ast.label', hintKey: 'advanced.lab.field.ast.hint' },
    { key: 'bilirubin', unit: 'mg/dL', labelKey: 'advanced.lab.field.bilirubin.label', hintKey: 'advanced.lab.field.bilirubin.hint' },
  ],
  kidney: [
    { key: 'creatinine', unit: 'mg/dL', labelKey: 'advanced.lab.field.creatinine.label', hintKey: 'advanced.lab.field.creatinine.hint' },
    { key: 'egfr', unit: 'mL/min', labelKey: 'advanced.lab.field.egfr.label', hintKey: 'advanced.lab.field.egfr.hint' },
    { key: 'potassium', unit: 'mmol/L', labelKey: 'advanced.lab.field.potassium.label', hintKey: 'advanced.lab.field.potassium.hint' },
  ],
  thyroid: [
    { key: 'tsh', unit: 'mIU/L', labelKey: 'advanced.lab.field.tsh.label', hintKey: 'advanced.lab.field.tsh.hint' },
    { key: 't3', unit: 'ng/dL', labelKey: 'advanced.lab.field.t3.label', hintKey: 'advanced.lab.field.t3.hint' },
    { key: 't4', unit: 'µg/dL', labelKey: 'advanced.lab.field.t4.label', hintKey: 'advanced.lab.field.t4.hint' },
  ],
};

const interpKeys: Record<LabCondition, TKey> = {
  diabetes: 'advanced.lab.interp.diabetes',
  hypertension: 'advanced.lab.interp.hypertension',
  cholesterol: 'advanced.lab.interp.cholesterol',
  gout: 'advanced.lab.interp.gout',
  liver: 'advanced.lab.interp.liver',
  kidney: 'advanced.lab.interp.kidney',
  thyroid: 'advanced.lab.interp.thyroid',
};

const conditionTitleKeys: Record<LabCondition, TKey> = {
  diabetes: 'advanced.condition.diabetes.title',
  hypertension: 'advanced.condition.hypertension.title',
  cholesterol: 'advanced.condition.cholesterol.title',
  gout: 'advanced.condition.gout.title',
  liver: 'advanced.condition.liver.title',
  kidney: 'advanced.condition.kidney.title',
  thyroid: 'advanced.condition.thyroid.title',
};

interface LabInterpreterProps {
  condition: LabCondition;
}

const LabInterpreter: React.FC<LabInterpreterProps> = ({ condition }) => {
  const { t, dir } = useLanguage();
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const fields = useMemo(() => conditionFields[condition], [condition]);

  const valid = fields.every((field) => values[field.key]?.trim());

  const apply = (field: LabField, value: string) => {
    setValues((current) => ({ ...current, [field.key]: value }));
    setSubmitted(false);
  };

  return (
    <div className="rounded-[28px] border border-[#EFEBE4] bg-white p-6 sm:p-8 shadow-[0_18px_50px_rgba(15,76,58,0.08)]" dir={dir}>
      <div className="flex items-center gap-4">
        <span className="w-14 h-14 shrink-0 rounded-full bg-[#F4F1EB] flex items-center justify-center text-2xl">
          {conditionEmoji[condition]}
        </span>
        <div>
          <h2 className="text-xl font-extrabold text-[#0F4C3A] leading-tight">{t(conditionTitleKeys[condition])}</h2>
          <p className="text-sm text-[#6B7A75] mt-0.5">{t('advanced.lab.subtitle')}</p>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <label key={field.key} className="block">
            <span className="flex items-center justify-between gap-2 text-sm font-bold text-[#0F4C3A]">
              <span>{t(field.labelKey)}</span>
              <span className="rounded-full bg-[#F4F1EB] text-[10px] font-extrabold text-[#0F4C3A] px-2.5 py-1 tracking-wide">
                {field.unit}
              </span>
            </span>
            <input
              type="number"
              inputMode="decimal"
              value={values[field.key] || ''}
              onChange={(e) => apply(field, e.target.value)}
              placeholder={t(field.hintKey)}
              className="mt-2 w-full rounded-xl border border-transparent bg-[#F4F1EB] px-4 py-3 text-base text-[#0F4C3A] placeholder-[#94A3B8] outline-none transition-all duration-200 focus:border-[#D4AF37] focus:bg-[#FFF] focus:ring-2 focus:ring-[rgba(212,175,55,0.4)]"
            />
            <small className="mt-1.5 block text-xs text-[#6B7A75]">{t(field.hintKey)}</small>
          </label>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={!valid}
          onClick={() => setSubmitted(true)}
          className="btn-primary disabled:opacity-40 disabled:pointer-events-none"
        >
          <Microscope size={18} strokeWidth={2.2} />
          {t('advanced.lab.submit')}
          <ArrowRight size={18} strokeWidth={2.5} className="rtl:rotate-180" />
        </button>
        {valid && !submitted && (
          <span className="text-xs font-bold text-[#6B7A75]">✓ {t('advanced.lab.submit')}</span>
        )}
      </div>

      {submitted && (
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-6 text-white shadow-[0_16px_40px_rgba(15,76,58,0.25)] animate-fade-in">
          <b className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[1.5px] text-[#D4AF37]">
            <Microscope size={16} strokeWidth={2.4} />
            {t('advanced.lab.interpretation')}
          </b>
          <p className="mt-3 text-[15px] leading-relaxed">{t(interpKeys[condition])}</p>
        </div>
      )}
    </div>
  );
};

export default LabInterpreter;