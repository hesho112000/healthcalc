import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { calculateIdealWeight, calculateBMR } from '../utils/calculations_expanded';
import type { HealthGoal } from '../types';

export interface AdviceBoxProps {
  weight: number;
  height: number;
  age: number;
  gender: string;
  targetCalories: number;
  goal: HealthGoal;
}

type ConditionKey = 'diabetes' | 'bp' | 'cholesterol';

const CONDITIONS: Array<{ key: ConditionKey; emoji: string; nameKey: 'adviceCondDiabetes' | 'adviceCondBp' | 'adviceCondCholesterol'; tipKey: 'adviceCondDiabetesTip' | 'adviceCondBpTip' | 'adviceCondCholesterolTip' }> = [
  { key: 'diabetes', emoji: '🍬', nameKey: 'adviceCondDiabetes', tipKey: 'adviceCondDiabetesTip' },
  { key: 'bp', emoji: '❤️', nameKey: 'adviceCondBp', tipKey: 'adviceCondBpTip' },
  { key: 'cholesterol', emoji: '🩸', nameKey: 'adviceCondCholesterol', tipKey: 'adviceCondCholesterolTip' },
];

const fmt = (template: string, vars: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));

const AdviceBox: React.FC<AdviceBoxProps> = ({ weight, height, age, gender, targetCalories, goal }) => {
  const { language, t } = useLanguage();
  const ar = language === 'ar';
  const [conditions, setConditions] = useState<ConditionKey[]>([]);

  const advice = useMemo(() => {
    if (!weight || !height || height <= 0) return null;
    const h = height / 100;
    const bmi = weight / (h * h);
    const idealW = calculateIdealWeight(height, gender);
    const loss = Math.max(0, Math.round(weight - idealW));
    const pLo = Math.round(weight * 1.6);
    const pHi = Math.round(weight * 2.2);
    const waterL = (weight * 0.033).toFixed(2).replace(/\.?0+$/, '');
    const weeks = loss > 0 ? Math.ceil(loss / 0.5) : 0;
    return { bmi, loss, pLo, pHi, waterL, weeks };
  }, [weight, height, gender]);

  if (!advice) return null;

  const bmr = Math.round(calculateBMR(weight, height, age, gender));
  const bmiR = +advice.bmi.toFixed(1);
  const category = bmiR < 18.5 ? 'under' : bmiR < 25 ? 'normal' : bmiR < 30 ? 'over' : 'obese';
  const catKey = category === 'under' ? 'adviceCatUnderweight' : category === 'normal' ? 'adviceCatNormal' : category === 'over' ? 'adviceCatOverweight' : 'adviceCatObese';
  const catLabel = t(catKey);

  const pG = Math.round((targetCalories * 0.3) / 4);
  const cG = Math.round((targetCalories * 0.45) / 4);
  const fG = Math.round((targetCalories * 0.25) / 9);

  const chip = (c: (typeof CONDITIONS)[number]) =>
    conditions.includes(c.key)
      ? conditions.filter((k) => k !== c.key)
      : [...conditions, c.key];

  const active = CONDITIONS.find((c) => conditions.includes(c.key));

  const goalLine = goal === 'lose_weight' ? t('adviceGoalDeficit') : goal === 'gain_muscle' ? t('adviceGoalSurplus') : t('adviceGoalMaintain');

  return (
    <div className="card p-6 border-blue-100 bg-gradient-to-br from-blue-50/60 to-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          🧭 {t('adviceTitle')}
        </h3>
        <span className="text-[11px] bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
          {t('adviceLive')}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className={`px-4 py-2 rounded-2xl ${category === 'over' || category === 'obese' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
          <span className="text-xs font-bold uppercase tracking-wide">{t('adviceBmi')}</span>
          <div className="text-2xl font-extrabold leading-tight">
            {bmiR} <span className="text-xs font-semibold">({catLabel})</span>
          </div>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-purple-100 text-purple-800">
          <span className="text-xs font-bold uppercase tracking-wide">{t('adviceIdealWeight')}</span>
          <div className="text-lg font-bold leading-tight">{calculateIdealWeight(height, gender)} {ar ? 'كجم' : 'kg'}</div>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-sky-100 text-sky-800">
          <span className="text-xs font-bold uppercase tracking-wide">{t('adviceBmr')}</span>
          <div className="text-lg font-bold leading-tight">{bmr} kcal</div>
        </div>
      </div>

      <div className="mb-4 rounded-2xl bg-white border border-gray-100 px-4 py-2 text-xs text-gray-500">
        {goalLine}
      </div>

      {advice.loss > 0 && (
        <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <span className="font-bold">{t('adviceBmi')} {bmiR} — {t('adviceCatOverweight')}.</span>{' '}
          {fmt(t('adviceRecLoss'), { loss: advice.loss, weeks: advice.weeks })}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="rounded-2xl bg-white border border-gray-100 p-3.5 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-gray-400 mb-1">{t('adviceProteinDay')}</div>
          <div className="text-lg font-extrabold text-gray-900">{advice.pLo}–{advice.pHi} g</div>
          <div className="text-xs text-gray-400">{t('adviceWeightMult')}</div>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-3.5 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-gray-400 mb-1">{t('adviceWaterDay')}</div>
          <div className="text-lg font-extrabold text-gray-900">{advice.waterL} L</div>
          <div className="text-xs text-gray-400">{t('adviceWaterMult')}</div>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-3.5 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-gray-400 mb-1">{t('adviceMacros')}</div>
          <div className="text-lg font-extrabold text-gray-900">{targetCalories} kcal</div>
          <div className="text-xs text-gray-400">P {pG} · C {cG} · F {fG}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CONDITIONS.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setConditions(chip(c))}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
              conditions.includes(c.key)
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
            }`}
          >
            {c.emoji} {t(c.nameKey)}
          </button>
        ))}
      </div>

      {active && (
        <p className="mt-3 text-sm text-gray-600 bg-white border border-primary-100 rounded-2xl px-4 py-3">
          <span className="font-bold text-primary-700">{active.emoji} {t(active.nameKey)}: </span>
          {t(active.tipKey)}
        </p>
      )}
    </div>
  );
};

export default AdviceBox;