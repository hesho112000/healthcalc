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

const CONDITIONS: Array<{ key: ConditionKey; en: string; ar: string; emoji: string; tipEn: string; tipAr: string }> = [
  {
    key: 'diabetes', en: 'Diabetes', ar: 'سكري', emoji: '🍬',
    tipEn: 'Choose low-glycemic carbs, spread meals evenly, and monitor HbA1c. Prefer fiber-rich vegetables.',
    tipAr: 'اختر كربوهيدرات منخفضة المؤشر الجلايسيمي، ووزّع الوجبات بالتساوي، وتابع فحص HbA1c. فضّل الخضروات الغنية بالألياف.',
  },
  {
    key: 'bp', en: 'Blood Pressure', ar: 'ضغط الدم', emoji: '❤️',
    tipEn: 'Reduce sodium below 5g/day, avoid processed & pickled foods, and include potassium-rich vegetables.',
    tipAr: 'قلل الصوديوم لأقل من 5 جم يوميًا، وتجنب الأطعمة المصنعة والمخللات، وادمج الخضروات الغنية بالبوتاسيوم.',
  },
  {
    key: 'cholesterol', en: 'Cholesterol', ar: 'كوليسترول', emoji: '🩸',
    tipEn: 'Keep saturated fat under 7% of calories, focus on LDL, and raise fiber with oats, legumes & fruit.',
    tipAr: 'أبقِ الدهون المشبعة أقل من 7% من السعرات، وركّز على مستوى LDL، وزد الألياف بالشوفان والبقوليات والفواكه.',
  },
];

const AdviceBox: React.FC<AdviceBoxProps> = ({ weight, height, age, gender, targetCalories, goal }) => {
  const { language } = useLanguage();
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
  const catEn = category === 'under' ? 'Underweight' : category === 'normal' ? 'Normal' : category === 'over' ? 'Overweight' : 'Obese';
  const catAr = category === 'under' ? 'نحافة' : category === 'normal' ? 'طبيعي' : category === 'over' ? 'وزن زائد' : 'سمنة';

  const pG = Math.round((targetCalories * 0.3) / 4);
  const cG = Math.round((targetCalories * 0.45) / 4);
  const fG = Math.round((targetCalories * 0.25) / 9);

  const chip = (c: (typeof CONDITIONS)[number]) =>
    conditions.includes(c.key)
      ? conditions.filter((k) => k !== c.key)
      : [...conditions, c.key];

  const active = CONDITIONS.find((c) => conditions.includes(c.key));

  return (
    <div className="card p-6 border-blue-100 bg-gradient-to-br from-blue-50/60 to-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          🧭 {ar ? 'الدليل الصحي الشخصي' : 'Personal Health Advice'}
        </h3>
        <span className="text-[11px] bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
          {ar ? 'تحديث مباشر' : 'Live update'}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className={`px-4 py-2 rounded-2xl ${category === 'over' || category === 'obese' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
          <span className="text-xs font-bold uppercase tracking-wide">{ar ? 'مؤشر كتلة الجسم' : 'BMI'}</span>
          <div className="text-2xl font-extrabold leading-tight">
            {bmiR} <span className="text-xs font-semibold">({ar ? catAr : catEn})</span>
          </div>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-purple-100 text-purple-800">
          <span className="text-xs font-bold uppercase tracking-wide">{ar ? 'الوزن المثالي' : 'Ideal weight'}</span>
          <div className="text-lg font-bold leading-tight">{calculateIdealWeight(height, gender)} kg</div>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-sky-100 text-sky-800">
          <span className="text-xs font-bold uppercase tracking-wide">{ar ? 'معدل الأيض الأساسي' : 'BMR'}</span>
          <div className="text-lg font-bold leading-tight">{bmr} kcal</div>
        </div>
      </div>

      <div className="mb-4 rounded-2xl bg-white border border-gray-100 px-4 py-2 text-xs text-gray-500">
        {goal === 'lose_weight'
          ? (ar ? 'هدفك: خفض 500 سعر يوميًا لفقدان ~0.5 كجم أسبوعيًا.' : 'Goal: 500 kcal daily deficit ≈ 0.5 kg/week loss.')
          : goal === 'gain_muscle'
            ? (ar ? 'هدفك: زيادة 300 سعر يوميًا مع تدريب مقاومة لبناء العضلات.' : 'Goal: 300 kcal daily surplus plus resistance training to build muscle.')
            : (ar ? 'هدفك: الحفاظ على الوزن عبر موازنة السعرات مع الإنفاق.' : 'Goal: maintain weight by balancing intake with expenditure.')}
      </div>

      {advice.loss > 0 && (
        <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <span className="font-bold">BMI {bmiR} — {ar ? 'وزن زائد' : 'Overweight'}.</span>{' '}
          {ar
            ? `نوصي بفقدان ${advice.loss} كجم للوصول للوزن المثالي (~${advice.weeks} أسبوع بمعدل 0.5 كجم/أسبوع).`
            : `Recommended weight loss: ${advice.loss} kg to reach your ideal weight (~${advice.weeks} weeks at 0.5 kg/week).`}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="rounded-2xl bg-white border border-gray-100 p-3.5 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-gray-400 mb-1">{ar ? 'البروتين / اليوم' : 'Protein / day'}</div>
          <div className="text-lg font-extrabold text-gray-900">{advice.pLo}–{advice.pHi} g</div>
          <div className="text-xs text-gray-400">{ar ? 'كمية الوزن × 1.6–2.2 جم' : 'weight × 1.6–2.2 g'}</div>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-3.5 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-gray-400 mb-1">{ar ? 'الماء / اليوم' : 'Water / day'}</div>
          <div className="text-lg font-extrabold text-gray-900">{advice.waterL} L</div>
          <div className="text-xs text-gray-400">{ar ? 'الوزن × 0.033 لتر' : 'weight × 0.033 L'}</div>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-3.5 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-gray-400 mb-1">{ar ? 'المغذيات (هدفك)' : 'Macros (your target)'}</div>
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
            {c.emoji} {ar ? c.ar : c.en}
          </button>
        ))}
      </div>

      {active && (
        <p className="mt-3 text-sm text-gray-600 bg-white border border-primary-100 rounded-2xl px-4 py-3">
          <span className="font-bold text-primary-700">{active.emoji} {ar ? active.ar : active.en}: </span>
          {ar ? active.tipAr : active.tipEn}
        </p>
      )}
    </div>
  );
};

export default AdviceBox;