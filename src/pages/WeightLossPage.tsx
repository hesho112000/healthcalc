import React, { useMemo, useState } from 'react';
import { kitchensRegistry, totalDishesAll } from '../data/kitchens';
import type { KitchenInfo, KitchenDish } from '../data/kitchens';

type Step = 1 | 2 | 3 | 4;
type Sex = 'male' | 'female';
type ActivityKey = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type GoalKey = 'lose' | 'gain_muscle' | 'gain_weight' | 'wellness' | 'athletic';
type DietLevel = 'normal' | 'medium' | 'harsh';

interface Workout {
  id: string;
  name: string;
  days: number;
  dur: string;
  focus: string;
  burn: number;
  level: string;
}

interface DietIntensity {
  id: string;
  label: string;
  short: string;
  emoji: string;
  deficit: number;
  surplus: number;
  rate: string;
  desc: string;
  workoutMod: number;
  proteinFactor: number;
  level: DietLevel;
  healthyOnly: boolean;
  warning?: string;
}

const ACTIVITY: Record<ActivityKey, { factor: number; label: string; desc: string }> = {
  sedentary: { factor: 1.2, label: 'خامل', desc: 'مكتبي - بدون رياضة' },
  light: { factor: 1.375, label: 'خفيف', desc: '1-3 أيام / أسبوع' },
  moderate: { factor: 1.55, label: 'متوسط', desc: '3-5 أيام / أسبوع' },
  active: { factor: 1.725, label: 'نشط', desc: '6-7 أيام / أسبوع' },
  very_active: { factor: 1.9, label: 'نشط جدا', desc: 'عمل شاق + رياضة' },
};

const WORKOUTS: Workout[] = [
  { id: 'none', name: 'بدون تمارين', days: 0, dur: '-', focus: 'راحة', burn: 0, level: 'none' },
  { id: 'beginner', name: 'مبتدئ Full Body 3x', days: 3, dur: '30د', focus: 'كل الجسم', burn: 150, level: 'light' },
  { id: 'hiit', name: 'حرق دهون HIIT 4x', days: 4, dur: '25د', focus: 'كارديو عالي', burn: 300, level: 'intense' },
  { id: 'ppl', name: 'بناء عضل PPL 5x', days: 5, dur: '60د', focus: 'Push Pull Legs', burn: 400, level: 'intense' },
  { id: 'bodyweight', name: 'منزلي بدون أدوات 3x', days: 3, dur: '30د', focus: 'وزن الجسم', burn: 200, level: 'moderate' },
  { id: 'cardio_core', name: 'كارديو + بطن 4x', days: 4, dur: '35د', focus: 'جري + بطن', burn: 280, level: 'moderate' },
  { id: 'strength', name: 'قوة Strength 5x5', days: 3, dur: '45د', focus: 'أوزان ثقيلة', burn: 250, level: 'heavy' },
];

const DIETS: Record<GoalKey, DietIntensity[]> = {
  lose: [
    { id: 'normal_lose', label: 'رجيم عادي - نزول صحي', short: 'عادي', emoji: '🟢', deficit: 300, surplus: 0, rate: '0.25 كجم/أسبوع', desc: 'نزول بطيء صحي - مناسب للمبتدئين - لا جوع', workoutMod: 1.0, proteinFactor: 1.2, level: 'normal', healthyOnly: false },
    { id: 'medium_lose', label: 'رجيم متوسط - نزول متوسط', short: 'متوسط', emoji: '🟡', deficit: 500, surplus: 0, rate: '0.5 كجم/أسبوع', desc: 'الأكثر شيوعاً - توازن بين النزول والطاقة', workoutMod: 1.1, proteinFactor: 1.6, level: 'medium', healthyOnly: false },
    { id: 'harsh_lose', label: 'رجيم قاسي - نزول سريع', short: 'قاسي', emoji: '🔴', deficit: 800, surplus: 0, rate: '0.8-1 كجم/أسبوع', desc: 'سريع لكن يحتاج متابعة - عالي البروتين - تمارين أكثر', workoutMod: 1.3, proteinFactor: 2.0, level: 'harsh', healthyOnly: true, warning: 'استشر طبيب' },
  ],
  gain_muscle: [
    { id: 'lean_bulk', label: 'Lean Bulk - بناء نظيف', short: 'Lean', emoji: '🟢', deficit: 0, surplus: 250, rate: '+0.25 كجم/أسبوع', desc: 'زيادة عضل نظيفة - دهون قليلة', workoutMod: 1.2, proteinFactor: 2.0, level: 'normal', healthyOnly: false },
    { id: 'moderate_bulk', label: 'Moderate Bulk - زيادة متوازنة', short: 'Moderate', emoji: '🟡', deficit: 0, surplus: 400, rate: '+0.4 كجم/أسبوع', desc: 'زيادة متوازنة عضل + وزن', workoutMod: 1.3, proteinFactor: 2.0, level: 'medium', healthyOnly: false },
    { id: 'aggressive_bulk', label: 'Aggressive Bulk - تضخيم سريع', short: 'Aggressive', emoji: '🔴', deficit: 0, surplus: 600, rate: '+0.6 كجم/أسبوع', desc: 'تضخيم سريع - سعرات عالية + تمارين قوية', workoutMod: 1.5, proteinFactor: 2.2, level: 'harsh', healthyOnly: false },
  ],
  gain_weight: [
    { id: 'normal_gain', label: 'زيادة عادية - نظيفة', short: 'عادي', emoji: '🟢', deficit: 0, surplus: 250, rate: '+0.25 كجم/أسبوع', desc: 'زيادة وزن صحية - دهون قليلة', workoutMod: 1.2, proteinFactor: 1.8, level: 'normal', healthyOnly: false },
    { id: 'medium_gain', label: 'زيادة متوسطة', short: 'متوسط', emoji: '🟡', deficit: 0, surplus: 400, rate: '+0.4 كجم/أسبوع', desc: 'زيادة متوازنة عضل + وزن', workoutMod: 1.3, proteinFactor: 2.0, level: 'medium', healthyOnly: false },
    { id: 'harsh_gain', label: 'زيادة قاسية - تضخيم سريع', short: 'قاسي', emoji: '🔴', deficit: 0, surplus: 600, rate: '+0.6 كجم/أسبوع', desc: 'تضخيم سريع - سعرات عالية + تمارين قوية', workoutMod: 1.5, proteinFactor: 2.2, level: 'harsh', healthyOnly: false },
  ],
  wellness: [
    { id: 'well_balanced', label: 'Balanced - متوازن', short: 'Balanced', emoji: '🟢', deficit: 0, surplus: 0, rate: '0 كجم/أسبوع', desc: 'متوازن تماماً - طعام صحي فقط', workoutMod: 1.0, proteinFactor: 1.4, level: 'normal', healthyOnly: true },
    { id: 'well_deficit', label: 'Slight Deficit - عجز خفيف', short: 'Deficit', emoji: '🟡', deficit: 200, surplus: 0, rate: '-0.2 كجم/أسبوع', desc: 'عجز خفيف - صحي - طعام صحي فقط', workoutMod: 1.1, proteinFactor: 1.6, level: 'medium', healthyOnly: true },
    { id: 'well_surplus', label: 'Slight Surplus - فائض خفيف', short: 'Surplus', emoji: '🔵', deficit: 0, surplus: 200, rate: '+0.2 كجم/أسبوع', desc: 'فائض خفيف لزيادة الطاقة - طعام طاقة', workoutMod: 1.1, proteinFactor: 1.5, level: 'medium', healthyOnly: false },
  ],
  athletic: [
    { id: 'ath_endurance', label: 'تحمّل Endurance', short: 'Endurance', emoji: '🟢', deficit: 0, surplus: 100, rate: 'أداء متوازن', desc: 'تغذية تحمّل - كربوهيدرات كافية', workoutMod: 1.2, proteinFactor: 1.6, level: 'normal', healthyOnly: false },
    { id: 'ath_strength', label: 'قوة Strength', short: 'Strength', emoji: '🟡', deficit: 0, surplus: 200, rate: 'أداء قوة', desc: 'بروتين أعلى + سعرات للقوة', workoutMod: 1.3, proteinFactor: 1.8, level: 'medium', healthyOnly: false },
    { id: 'ath_peak', label: 'أداء عالي Peak', short: 'Peak', emoji: '🔴', deficit: 0, surplus: 300, rate: 'أداء احترافي', desc: 'سعرات عالية + بروتين للأداء العالي', workoutMod: 1.5, proteinFactor: 2.0, level: 'harsh', healthyOnly: false },
  ],
};

const GOAL_ICONS: Record<GoalKey, string> = { lose: '⚖️', gain_muscle: '💪', gain_weight: '📈', wellness: '✨', athletic: '🏃' };
const GOAL_BTN: Record<GoalKey, string> = { lose: 'Lose ↓', gain_muscle: 'Build Muscle', gain_weight: 'Gain Weight', wellness: 'Wellness', athletic: 'Athletic' };
const GOAL_LABELS: Record<GoalKey, string> = { lose: 'تخسيس', gain_muscle: 'بناء عضلات', gain_weight: 'زيادة وزن صحية', wellness: 'صحة وعافية', athletic: 'أداء رياضي' };
const GOAL_INTENSITY_LABEL: Record<GoalKey, string> = {
  lose: 'اختر شدة الرجيم للتخسيس',
  gain_muscle: 'اختر شدة بناء العضلات',
  gain_weight: 'اختر شدة زيادة الوزن',
  wellness: 'اختر شدة الصحة والعافية',
  athletic: 'اختر شدة الأداء الرياضي',
};

const signedDelta = (g: GoalKey, d: DietIntensity): string => {
  if (g === 'wellness') return d.deficit ? `-${d.deficit}` : d.surplus ? `+${d.surplus}` : '0';
  if (g === 'lose') return `-${d.deficit}`;
  return d.surplus ? `+${d.surplus}` : '0';
};

const getDiet = (g: GoalKey, id: string): DietIntensity => DIETS[g].find((d) => d.id === id) ?? DIETS[g][0];

const STEP_TITLES: Record<Step, string> = {
  1: 'Basic Info',
  2: 'Body & Kitchen',
  3: 'Goals',
  4: 'Review',
};

const confBadge = (conf: number): { cls: string; label: string } =>
  conf === 100
    ? { cls: 'bg-emerald-100 text-emerald-800', label: '100% موثوق' }
    : conf === 85
      ? { cls: 'bg-yellow-100 text-yellow-800', label: '85% متوسط' }
      : { cls: 'bg-orange-100 text-orange-800', label: '70% تقديري' };

function filterDishes(kitchen: KitchenInfo, diet: DietIntensity, goal: GoalKey): KitchenDish[] {
  const dishes = kitchen.dishes;
  if (!dishes.length) return [];
  if (goal === 'lose') {
    if (diet.level === 'harsh') {
      const f = dishes.filter((x) => x.healthy && x.cal_100 <= 150 && x.confidence >= 85);
      return f.length ? f : dishes.filter((x) => x.cal_100 <= 180);
    }
    if (diet.level === 'medium') {
      const f = dishes.filter((x) => x.cal_100 <= 220);
      return f.length ? f : dishes;
    }
    const f = dishes.filter((x) => x.cal_100 <= 250);
    return f.length ? f : dishes;
  }
  if (goal === 'gain_muscle' || goal === 'gain_weight') {
    const sorted = [...dishes].sort((a, b) => b.p - a.p || b.cal_100 - a.cal_100);
    if (diet.level === 'harsh') {
      const f = sorted.filter((x) => x.p >= 5);
      return f.length ? f : sorted;
    }
    if (diet.level === 'medium') {
      const f = sorted.filter((x) => x.p >= 4);
      return f.length ? f : sorted;
    }
    return sorted;
  }
  if (goal === 'wellness') {
    const sorted = [...dishes].sort((a, b) => b.p - a.p || b.cal_100 - a.cal_100);
    if (diet.healthyOnly) {
      const f = dishes.filter((x) => x.healthy);
      return f.length ? f : sorted;
    }
    const f = dishes.filter((x) => x.cal_100 >= 120);
    return f.length ? f : sorted;
  }
  const sorted = [...dishes].sort((a, b) => b.p - a.p || b.cal_100 - a.cal_100);
  return sorted;
}

function portionGrams(diet: DietIntensity, goal: GoalKey): number {
  if (goal === 'lose') {
    if (diet.level === 'harsh') return 150;
    if (diet.level === 'medium') return 175;
    return 200;
  }
  if (goal === 'gain_muscle' || goal === 'gain_weight' || goal === 'athletic') {
    if (diet.level === 'harsh') return 300;
    if (diet.level === 'medium') return 280;
    return 250;
  }
  return 200;
}

function pickPlate(pool: KitchenDish[]): KitchenDish[] {
  if (!pool.length) return [];
  const light = [...pool].sort((a, b) => a.cal_100 - b.cal_100 || b.p - a.p);
  const heavy = [...pool].sort((a, b) => b.p - a.p || b.cal_100 - a.cal_100);
  const breakfast = light.find((x) => x.healthy) ?? light[0];
  const snack = light.find((x) => x !== breakfast && x.cal_100 <= 180) ?? light[1] ?? light[0];
  const lunch = heavy[0];
  const dinner = light.find((x) => x !== breakfast && x !== lunch && x !== snack) ?? heavy[1] ?? light[light.length - 1];
  return [breakfast, lunch, dinner, snack];
}

const WeightLossPage: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [age, setAge] = useState('28');
  const [sex, setSex] = useState<Sex>('male');
  const [height, setHeight] = useState('176');
  const [weight, setWeight] = useState('82');
  const [activity, setActivity] = useState<ActivityKey>('moderate');
  const [goal, setGoal] = useState<GoalKey>('lose');
  const [targetWeight, setTargetWeight] = useState('75');
  const [timeline, setTimeline] = useState('12');
  const [selectedKitchenId, setSelectedKitchenId] = useState<string>('egyptian');
  const [workout, setWorkout] = useState('none');
  const [dietId, setDietId] = useState('normal_lose');
  const [blueprintPage, setBlueprintPage] = useState<1 | 2>(1);
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailText, setEmailText] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailDone, setEmailDone] = useState('');
  const [toast, setToast] = useState('');

  const parsed = useMemo(
    () => ({
      age: parseInt(age, 10) || 0,
      height: parseInt(height, 10) || 0,
      weight: parseFloat(weight) || 0,
      target: parseFloat(targetWeight) || 0,
      timeline: parseInt(timeline, 10) || 0,
    }),
    [age, height, weight, targetWeight, timeline],
  );

  const selectedKitchen = useMemo<KitchenInfo>(
    () => kitchensRegistry.find((k) => k.id === selectedKitchenId) ?? kitchensRegistry[0],
    [selectedKitchenId],
  );

  const numbers = useMemo(() => {
    const { age: a, height: h, weight: w } = parsed;
    if (!a || !h || !w) return null;
    const diet = getDiet(goal, dietId);
    const wk = WORKOUTS.find((x) => x.id === workout) ?? WORKOUTS[0];
    const bmi = +(w / Math.pow(h / 100, 2)).toFixed(1);
    const bmr = sex === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdeeBase = bmr * ACTIVITY[activity].factor;
    const burnAvg = Math.round(((wk.burn * wk.days) / 7) * diet.workoutMod);
    const tdeeWorkout = Math.round(tdeeBase + burnAvg);
    const delta =
      goal === 'lose' ? -diet.deficit : goal === 'wellness' ? (diet.deficit ? -diet.deficit : diet.surplus) : diet.surplus;
    const targetCal = Math.round(tdeeWorkout + delta);
    const protein = Math.round(w * diet.proteinFactor);
    const fat = Math.round(w * (diet.level === 'normal' ? 0.8 : 0.7));
    const carbs = Math.max(0, Math.round((targetCal - protein * 4 - fat * 9) / 4));
    return {
      bmi,
      bmiCat: bmi < 18.5 ? 'نقص وزن' : bmi < 25 ? 'طبيعي' : bmi < 30 ? 'زيادة' : 'سمنة',
      bmr: Math.round(bmr),
      tdeeBase: Math.round(tdeeBase),
      burnAvg,
      tdeeWorkout,
      delta,
      targetCal,
      protein,
      carbs,
      fat,
      diet,
      wk,
    };
  }, [parsed, sex, activity, goal, dietId, workout]);

  const diet = numbers ? numbers.diet : getDiet(goal, dietId);

  const mealPlan = useMemo(() => {
    const pool = filterDishes(selectedKitchen, diet, goal);
    const picks = pickPlate(pool);
    const baseG = portionGrams(diet, goal);
    return [
      { meal: 'فطار', dish: picks[0], grams: Math.max(1, Math.round(baseG * 0.85)) },
      { meal: 'غدا', dish: picks[1], grams: Math.max(1, Math.round(baseG * 1.4)) },
      { meal: 'عشاء', dish: picks[2], grams: Math.max(1, Math.round(baseG * 1.25)) },
      { meal: 'سناك', dish: picks[3], grams: Math.max(1, Math.round(baseG * 0.6)) },
    ];
  }, [selectedKitchen, diet, goal]);

  const mealTotal = useMemo(
    () => mealPlan.reduce((s, m) => s + Math.round((m.dish.cal_100 * m.grams) / 100), 0),
    [mealPlan],
  );

  const registryTotals = useMemo(
    () =>
      kitchensRegistry.reduce(
        (acc, k) => ({ t100: acc.t100 + k.conf100, t85: acc.t85 + k.conf85, t70: acc.t70 + k.conf70 }),
        { t100: 0, t85: 0, t70: 0 },
      ),
    [],
  );

  const isValid = (): boolean => {
    if (step === 1) {
      return parsed.age >= 12 && parsed.age <= 80 && parsed.height >= 120 && parsed.height <= 220 && parsed.weight >= 30 && parsed.weight <= 250;
    }
    if (step === 3) {
      return parsed.target >= 30 && parsed.target <= 250 && parsed.timeline >= 2 && parsed.timeline <= 52;
    }
    return true;
  };

  const next = () => {
    const s = step >= 4 ? 1 : ((step + 1) as Step);
    setStep(s);
    if (s === 4) setBlueprintPage(1);
  };
  const back = () => {
    const s = Math.max(1, step - 1) as Step;
    setStep(s);
    if (s === 4) setBlueprintPage(1);
  };

  const changeGoal = (g: GoalKey) => {
    setGoal(g);
    setDietId(DIETS[g][0].id);
  };

  const sendEmail = () => {
    if (!emailText.trim() || emailSending) return;
    setEmailSending(true);
    window.setTimeout(() => {
      setEmailSending(false);
      setEmailDone(emailText.trim());
      setToast(`PDF sent to ${emailText.trim()}`);
      window.setTimeout(() => setToast(''), 3200);
    }, 2200);
  };

  const inputClass = 'w-full h-[48px] rounded-[8px] border border-zinc-300 px-4 outline-none focus:border-[#1e40af] focus:ring-[3px] focus:ring-blue-100 bg-white';
  const goalProgress = numbers && parsed.weight !== parsed.target ? Math.min(100, Math.max(0, parsed.target < parsed.weight ? ((parsed.weight - parsed.target) / parsed.weight) * 100 : ((parsed.target - parsed.weight) / parsed.target) * 100)) : 0;
  const proteinPct = numbers ? Math.round((numbers.protein * 4 * 100) / numbers.targetCal) : 0;
  const carbsPct = numbers ? Math.round((numbers.carbs * 4 * 100) / numbers.targetCal) : 0;
  const fatPct = numbers ? Math.round((numbers.fat * 9 * 100) / numbers.targetCal) : 0;
  const portionGuideText = selectedKitchen.portion_guide || 'شوربة طبق 250مل · لحم قطعة 150جم · أرز طبق 200جم · خضار 200جم · فواكه 150جم';
  const projectionText = !numbers
    ? ''
    : goal === 'wellness'
      ? `الحفاظ على ${parsed.weight}kg وتحسين الصحة العامة · ${numbers.diet.rate} · نوم ونشاط أفضل.`
      : `من ${parsed.weight}kg إلى ${parsed.target}kg خلال ${parsed.timeline} أسابيع · ${numbers.diet.rate} · ${
          goal === 'lose' && parsed.weight > parsed.target ? 'معدل آمن.' : goal === 'gain_muscle' || goal === 'gain_weight' ? 'زيادة محسوبة.' : 'أداء محسوب.'
        }`;

  return (
    <div className="wiz-page min-h-screen bg-[#f8fafc] text-zinc-900 overflow-x-hidden antialiased" dir="ltr">
      <main className="w-full max-w-[560px] mx-auto px-4 md:px-0 pb-[120px] md:pb-16 pt-8 md:pt-12 overflow-x-hidden">
        <div className="mb-8">
          <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight leading-none">Weight &amp; Fitness</h1>
          <p className="mt-2.5 text-[14px] text-zinc-500 leading-snug">Complete the 4-step setup to calculate your metrics &amp; recommendations</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-[14px] left-[14px] right-[14px] h-[2px] bg-zinc-200" />
            <div className="absolute top-[14px] left-[14px] h-[2px] bg-[#1e40af] transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%`, maxWidth: 'calc(100% - 28px)' }} />
            {[{ n: 1 as Step, label: 'Info' }, { n: 2 as Step, label: 'Body' }, { n: 3 as Step, label: 'Goals' }, { n: 4 as Step, label: 'Review' }].map((x) => {
              const done = step > x.n;
              const active = step === x.n;
              return (
                <div key={x.n} className="relative flex flex-col items-center gap-2 z-10">
                  <div className={`w-7 h-7 rounded-full border-[2px] flex items-center justify-center text-[12px] font-bold bg-white transition-all ${done ? 'bg-[#1e40af] border-[#1e40af] text-white' : ''} ${active ? 'border-[#1e40af] text-[#1e40af] shadow-[0_0_0_4px_rgba(30,64,175,0.12)]' : 'border-zinc-300 text-zinc-400'}`}>
                    {done ? '✓' : x.n}
                  </div>
                  <span className={`text-[11.5px] font-medium tracking-wide ${active ? 'text-[#1e40af]' : done ? 'text-zinc-700' : 'text-zinc-400'}`}>{x.label}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-5 text-[12.5px] font-medium text-zinc-500">Step {step} · {STEP_TITLES[step]}</div>
        </div>

        <div className="w-full min-w-0">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-start gap-2 rounded-[10px] bg-blue-50/80 border border-blue-100 px-3.5 py-3">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-bold mt-0.5 shrink-0">i</span>
                <p className="text-[12.5px] leading-[1.5] text-zinc-600 min-w-0 break-words">نستخدم معادلة Mifflin-St Jeor المعتمدة طبيا. كل الحسابات محلية بدون إرسال بيانات.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-zinc-700">Age (years)</label>
                <input value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, ''))} placeholder="e.g. 28" inputMode="numeric" className={inputClass} />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-zinc-700">Sex</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['male', 'female'] as Sex[]).map((x) => (
                    <button
                      key={x}
                      type="button"
                      onClick={() => setSex(x)}
                      className={`h-[48px] rounded-[8px] border text-[14px] font-medium capitalize transition-all ${sex === x ? 'bg-[#1e40af] text-white border-[#1e40af]' : 'bg-white border-zinc-300 text-zinc-700 hover:border-zinc-400'}`}
                    >
                      {x === 'male' ? 'Male ♂' : 'Female ♀'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5 min-w-0">
                  <label className="text-[13px] font-medium text-zinc-700">Height (cm)</label>
                  <input value={height} onChange={(e) => setHeight(e.target.value.replace(/\D/g, ''))} placeholder="176" inputMode="numeric" className={inputClass} />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <label className="text-[13px] font-medium text-zinc-700">Weight (kg)</label>
                  <input value={weight} onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="82" inputMode="decimal" className={inputClass} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-7">
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-zinc-700">Activity level</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {(Object.keys(ACTIVITY) as ActivityKey[]).map((x) => {
                    const opt = ACTIVITY[x];
                    const on = activity === x;
                    return (
                      <button
                        key={x}
                        type="button"
                        onClick={() => setActivity(x)}
                        className={`rounded-[10px] border px-3 py-2.5 text-left transition-all min-w-0 ${on ? 'border-[#1e40af] bg-blue-50/60 ring-2 ring-blue-100' : 'border-zinc-200 bg-white hover:border-zinc-300'}`}
                      >
                        <div className="text-[12.5px] font-semibold leading-tight">{opt.label}</div>
                        <div className="mt-0.5 text-[10.5px] text-zinc-500 leading-snug break-words">{opt.desc.split(' - ')[0]} · x{opt.factor}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[13px] font-bold">📍 اختر الدولة ومطبخها ({kitchensRegistry.length} دولة - {totalDishesAll} طبق)</label>
                <div className="kitchen-city-scroll-box h-[200px] overflow-y-auto border-2 border-zinc-200 rounded-[12px] p-2.5 bg-white shadow-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                  {kitchensRegistry.map((k) => {
                    const on = selectedKitchenId === k.id;
                    return (
                      <div
                        key={k.id}
                        onClick={() => setSelectedKitchenId(k.id)}
                        className={`rounded-[10px] border-2 cursor-pointer p-2.5 flex flex-col gap-1.5 transition-all min-w-0 ${on ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-zinc-200 hover:border-zinc-300'}`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[18px] leading-none shrink-0">{k.flag}</span>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-bold text-[12.5px] leading-tight">{k.country}</div>
                            <div className="truncate text-[10.5px] text-zinc-500 leading-snug">{k.kitchen}</div>
                          </div>
                          <span className="shrink-0 text-[10px] bg-zinc-900 text-white px-2 py-0.5 rounded-full">{k.total}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full">{k.conf100}×100%</span>
                          <span className="text-[9px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">{k.conf85}×85%</span>
                          <span className="text-[9px] bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-full">{k.conf70}×70%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[13px] font-bold">🏋️ اختر روتين التمرين</label>
                <div className="workout-scroll-box h-[180px] overflow-y-auto border-2 border-zinc-200 rounded-[12px] p-2.5 bg-white grid grid-cols-2 gap-2">
                  {WORKOUTS.map((w) => {
                    const on = workout === w.id;
                    return (
                      <div
                        key={w.id}
                        onClick={() => setWorkout(w.id)}
                        className={`p-2.5 rounded-[10px] border-2 cursor-pointer min-w-0 ${on ? 'border-blue-500 bg-blue-50' : 'border-zinc-200'}`}
                      >
                        <div className="text-[12px] font-bold leading-tight break-words">{w.name}</div>
                        <div className="mt-0.5 text-[10px] text-zinc-500 leading-snug break-words">{w.days}x/أسبوع · {w.dur} · {w.focus}</div>
                        <div className="mt-0.5 text-[10.5px] font-semibold text-blue-600">حرق +{w.burn} سعر</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {numbers && (
                <div className="rounded-[12px] border border-[#1e40af]/30 bg-blue-50/70 p-4">
                  <div className="text-[13px] font-bold text-[#1e40af]">TDEE Preview</div>
                  <div className="mt-1.5 text-[12.5px] text-zinc-700 leading-relaxed break-words">
                    BMR {numbers.bmr} × {ACTIVITY[activity].factor} = {numbers.tdeeBase} kcal
                    <br />
                    + تمرين ({numbers.wk.name} +{numbers.burnAvg}) = <span className="font-bold text-[#1e40af]">{numbers.tdeeWorkout} kcal</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-zinc-700">Goal type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['lose', 'gain_muscle', 'gain_weight', 'wellness', 'athletic'] as GoalKey[]).map((x) => (
                    <button
                      key={x}
                      type="button"
                      onClick={() => changeGoal(x)}
                      className={`h-[44px] rounded-[8px] border text-[12px] font-semibold ${goal === x ? 'bg-[#1e40af] text-white border-[#1e40af]' : 'bg-white border-zinc-300 text-zinc-700 hover:border-zinc-400'}`}
                    >
                      {GOAL_ICONS[x]} {GOAL_BTN[x]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5 min-w-0">
                  <label className="text-[13px] font-medium text-zinc-700">Target weight (kg)</label>
                  <input value={targetWeight} onChange={(e) => setTargetWeight(e.target.value.replace(/[^0-9.]/g, ''))} inputMode="decimal" className={inputClass} />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <label className="text-[13px] font-medium text-zinc-700">Timeline (weeks)</label>
                  <input value={timeline} onChange={(e) => setTimeline(e.target.value.replace(/\D/g, ''))} inputMode="numeric" className={inputClass} />
                </div>
              </div>

              <div className="space-y-3">
                  <label className="text-[13px] font-bold">{GOAL_ICONS[goal]} {GOAL_INTENSITY_LABEL[goal]}</label>
                  {goal === 'wellness' && (
                    <div className="rounded-[8px] bg-violet-50 border border-violet-100 px-3 py-2 text-[11px] text-zinc-600 leading-snug break-words">
                      ✨ Recomposition &amp; Wellness = الحفاظ + تحسين الصحة العامة
                    </div>
                  )}
                  <div className="diet-intensity-scroll-box h-[96px] overflow-y-auto border-2 border-zinc-200 rounded-[12px] p-1.5 bg-white grid grid-cols-3 gap-1.5">
                    {DIETS[goal].map((d) => {
                      const on = dietId === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDietId(d.id)}
                          className={`rounded-[8px] border-2 p-2 text-left transition-all min-w-0 ${on ? 'border-orange-500 bg-orange-50' : 'border-zinc-200'}`}
                        >
                          <div className="text-[10.5px] font-bold leading-tight break-words">{d.emoji} {d.short}</div>
                          <div className="mt-0.5 text-[10px] text-zinc-500 leading-snug break-words">{d.rate}</div>
                          <div className="mt-0.5 text-[10.5px] font-semibold text-red-600">{signedDelta(goal, d)} سعر</div>
                        </button>
                      );
                    })}
                  </div>
                  {diet.warning && <div className="text-[11px] text-red-600">⚠️ {diet.warning}</div>}
                </div>

              {numbers && (
                <div className="rounded-[12px] border border-zinc-200 bg-zinc-50/70 p-4 space-y-2">
                  <div className="text-[12px] font-semibold text-zinc-700">Projection</div>
                  <div className="text-[13px] text-zinc-600 leading-relaxed break-words">{projectionText}</div>
                  <div className="text-[12px] text-zinc-500">Target calories: ~{numbers.targetCal} kcal / day ({numbers.wk.name})</div>
                </div>
              )}
            </div>
          )}

          {step === 4 && numbers && (
            <div className="space-y-5">
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-[19px] md:text-[22px] font-bold tracking-tight leading-tight">Your Personalized Health Blueprint</h2>
                  <span className="shrink-0 text-[10.5px] font-bold px-2 py-1 rounded-full bg-zinc-900 text-white">Step {blueprintPage} of 2</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11.5px] px-2.5 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700">{parsed.age}y</span>
                  <span className="text-[11.5px] px-2.5 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700">{parsed.weight}kg → {parsed.target}kg</span>
                  <span className="text-[11.5px] px-2.5 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700 capitalize">{selectedKitchen.country}</span>
                </div>
                <p className="text-[13px] text-zinc-500 leading-snug break-words">{blueprintPage === 1 ? 'Your Metrics & Summary' : `Your Meal Plan · ~${numbers.targetCal} kcal/day`}</p>

                <div className="flex items-center gap-2">
                  {[{ n: 1 as 1 | 2, label: 'Metrics' }, { n: 2 as 1 | 2, label: 'Meal Plan' }].map((x) => (
                    <button
                      key={x.n}
                      type="button"
                      onClick={() => setBlueprintPage(x.n)}
                      className={`flex-1 h-[38px] rounded-[8px] border text-[12.5px] font-semibold transition-all ${blueprintPage === x.n ? 'bg-[#1e40af] text-white border-[#1e40af]' : 'bg-white border-zinc-300 text-zinc-500 hover:border-zinc-400'}`}
                    >
                      {x.n} · {x.label}
                    </button>
                  ))}
                </div>

                <button type="button" onClick={() => setStep(3)} className="text-[12px] font-semibold text-[#1e40af] hover:underline">‹ Edit setup</button>
              </div>

              {blueprintPage === 1 && (
                <div className="space-y-4">
                  <div className="rounded-[14px] border border-zinc-200 bg-white p-4 md:p-5 space-y-3">
                    <h3 className="text-[13px] font-bold">Body Metrics</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-[10px] bg-zinc-50 border border-zinc-200 p-3 min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">BMI</div>
                        <div className="text-[20px] font-bold leading-none mt-1">{numbers.bmi}</div>
                        <div className="mt-1">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${numbers.bmiCat === 'طبيعي' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{numbers.bmiCat}</span>
                        </div>
                      </div>
                      <div className="rounded-[10px] bg-zinc-50 border border-zinc-200 p-3 min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">BMR</div>
                        <div className="text-[20px] font-bold leading-none mt-1">{numbers.bmr}</div>
                        <div className="text-[11px] text-zinc-500 mt-1 break-words">kcal/day Mifflin-St Jeor</div>
                      </div>
                      <div className="rounded-[10px] bg-zinc-50 border border-zinc-200 p-3 min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">TDEE base</div>
                        <div className="text-[20px] font-bold leading-none mt-1">{numbers.tdeeBase}</div>
                        <div className="text-[11px] text-zinc-500 mt-1 break-words">{ACTIVITY[activity].label} ×{ACTIVITY[activity].factor}</div>
                      </div>
                      <div className="rounded-[10px] bg-[#1e40af] text-white p-3 min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-blue-200 font-semibold">TDEE + workout</div>
                        <div className="text-[20px] font-bold leading-none mt-1">{numbers.tdeeWorkout}</div>
                        <div className="text-[11px] text-blue-100 mt-1 break-words">burn +{numbers.burnAvg}/day</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[14px] border border-zinc-200 bg-white p-4 md:p-5 space-y-3">
                    <h3 className="text-[13px] font-bold">Goal · {GOAL_ICONS[goal]} {GOAL_LABELS[goal]}</h3>
                    {goal === 'wellness' && <div className="text-[11px] text-violet-600 leading-snug break-words">✨ Recomposition &amp; Wellness = الحفاظ + تحسين الصحة العامة</div>}
                    <div className="text-[13px] text-zinc-700 break-words">
                      {numbers.diet.rate} · target {parsed.target}kg in {parsed.timeline}w · {numbers.wk.name}
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-[11.5px] text-zinc-500">
                        <span>{parsed.weight}kg</span>
                        <span className="font-bold text-zinc-800">{goalProgress.toFixed(0)}%</span>
                        <span>{parsed.target}kg</span>
                      </div>
                      <div className="relative h-[8px] rounded-full bg-zinc-100 overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-[#1e40af] transition-all duration-300" style={{ width: `${goalProgress}%` }} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11.5px]">
                      <span className="px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700 break-words">{numbers.delta > 0 ? `+${numbers.delta}` : numbers.delta} kcal/day</span>
                      <span className="px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700">Target {numbers.targetCal} kcal</span>
                      <span className="px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700 break-words">{numbers.diet.emoji} {numbers.diet.label}</span>
                    </div>
                  </div>

                  <div className="rounded-[14px] border border-zinc-200 bg-white p-4 md:p-5 space-y-3">
                    <h3 className="text-[13px] font-bold">Daily Macros · ~{numbers.targetCal}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-[10px] bg-emerald-50 border border-emerald-100 p-3 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Protein</div>
                        <div className="text-[17px] font-bold leading-tight mt-1">{numbers.protein}g</div>
                        <div className="text-[10.5px] text-emerald-700 mt-0.5">{proteinPct}%</div>
                      </div>
                      <div className="rounded-[10px] bg-blue-50 border border-blue-100 p-3 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-blue-700">Carbs</div>
                        <div className="text-[17px] font-bold leading-tight mt-1">{numbers.carbs}g</div>
                        <div className="text-[10.5px] text-blue-700 mt-0.5">{carbsPct}%</div>
                      </div>
                      <div className="rounded-[10px] bg-amber-50 border border-amber-100 p-3 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Fat</div>
                        <div className="text-[17px] font-bold leading-tight mt-1">{numbers.fat}g</div>
                        <div className="text-[10.5px] text-amber-700 mt-0.5">{fatPct}%</div>
                      </div>
                    </div>
                    <div className="text-[11px] text-zinc-500 break-words">بروتين {parsed.weight} × {numbers.diet.proteinFactor} = {numbers.protein}g · {numbers.diet.label}</div>
                  </div>

                  <div className="rounded-[14px] border border-zinc-200 bg-white p-4 md:p-5 space-y-3">
                    <h3 className="text-[13px] font-bold">Selected Plan</h3>
                    <div className="space-y-2 text-[12px] leading-relaxed text-zinc-700 break-words">
                      <div className="flex items-center gap-2.5 rounded-[8px] bg-zinc-50 border border-zinc-200 px-3 py-2">
                        <span className="text-[16px] shrink-0">{selectedKitchen.flag}</span>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold">{selectedKitchen.country} · {selectedKitchen.kitchen}</div>
                          <div className="text-[11px] text-zinc-500">{selectedKitchen.total} طبق · {selectedKitchen.conf100}×100% · {selectedKitchen.conf85}×85% · {selectedKitchen.conf70}×70%</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-[8px] bg-zinc-50 border border-zinc-200 px-3 py-2">
                        <span className="text-[16px] shrink-0">🏋️</span>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold">{numbers.wk.name}</div>
                          <div className="text-[11px] text-zinc-500">{numbers.wk.days}x/أسبوع · حرق +{numbers.burnAvg} kcal/يوم ×{numbers.diet.workoutMod}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-[8px] bg-zinc-50 border border-zinc-200 px-3 py-2">
                        <span className="text-[16px] shrink-0">⚖️</span>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold">{numbers.diet.emoji} {numbers.diet.label}</div>
                          <div className="text-[11px] text-zinc-500">{numbers.diet.rate} · {numbers.delta > 0 ? `+${numbers.delta}` : numbers.delta} kcal/day</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[14px] border border-zinc-200 bg-white p-4 md:p-5 space-y-3">
                    <h3 className="text-[13px] font-bold">Confidence Score · مصدر البيانات</h3>
                    <div className="space-y-2 text-[12px] leading-relaxed text-zinc-700 break-words">
                      <div className="flex items-center justify-between gap-3 rounded-[8px] bg-emerald-50/70 border border-emerald-100 px-3 py-2">
                        <div className="min-w-0">
                          <span className="font-bold">🟢 100%</span> <span className="text-zinc-600">المعهد القومي / مؤكد</span>
                        </div>
                        <span className="shrink-0 font-bold text-emerald-800">{registryTotals.t100} أطباق</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-[8px] bg-yellow-50/70 border border-yellow-100 px-3 py-2">
                        <div className="min-w-0">
                          <span className="font-bold">🟡 85%</span> <span className="text-zinc-600">USDA + وصفة تقليدية</span>
                        </div>
                        <span className="shrink-0 font-bold text-yellow-800">{registryTotals.t85} أطباق</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-[8px] bg-orange-50/70 border border-orange-100 px-3 py-2">
                        <div className="min-w-0">
                          <span className="font-bold">🟠 70%</span> <span className="text-zinc-600">تقديري محلي</span>
                        </div>
                        <span className="shrink-0 font-bold text-orange-800">{registryTotals.t70} أطباق</span>
                      </div>
                      <div className="text-[11.5px] text-zinc-500">دقة الأرقام حسب مصدر كل طبق من {kitchensRegistry.length} دولة و {totalDishesAll} طبق.</div>
                    </div>
                  </div>

                  <div className="rounded-[14px] border border-zinc-200 bg-white p-4 md:p-5 space-y-3">
                    <h3 className="text-[13px] font-bold">Kitchen Database</h3>
                    <div className="rounded-[10px] bg-zinc-50 border border-dashed border-zinc-300 p-3 min-w-0">
                      <div className="text-[12px] font-bold break-words">{selectedKitchen.flag} {selectedKitchen.country} · {selectedKitchen.kitchen}</div>
                      <div className="mt-1 text-[10.5px] text-zinc-500 break-words">{selectedKitchen.total} طبق · 100%: {selectedKitchen.conf100} · 85%: {selectedKitchen.conf85} · 70%: {selectedKitchen.conf70}</div>
                    </div>
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {kitchensRegistry.map((k) => (
                        <span
                          key={k.id}
                          onClick={() => setSelectedKitchenId(k.id)}
                          className={`shrink-0 cursor-pointer text-[10px] px-2 py-1 rounded-full border ${selectedKitchenId === k.id ? 'border-[#1e40af] bg-[#1e40af] text-white' : 'border-zinc-200 bg-white text-zinc-600'}`}
                        >
                          {k.flag} {k.country} · {k.total}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="no-print pt-1">
                    <button type="button" onClick={() => setBlueprintPage(2)} className="w-full h-[50px] rounded-[10px] bg-[#1e40af] text-white text-[15px] font-semibold hover:bg-[#1c3aa0] shadow-[0_1px_2px_rgba(0,0,0,0.08)]">Next → See Meal Plan</button>
                    <p className="mt-2 text-center text-[11px] text-zinc-400">مصمم لموبايل كروم 390px · طباعة نظيفة</p>
                  </div>
                </div>
              )}

              {blueprintPage === 2 && (
                <div className="space-y-4">
                  <div className="rounded-[14px] border border-zinc-200 bg-white p-4 md:p-5 space-y-3">
                    <h3 className="text-[13px] font-bold">Daily Total</h3>
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <div className="text-[28px] font-bold leading-none">{numbers.targetCal}</div>
                        <div className="text-[11px] text-zinc-500 mt-1">kcal / day</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-right">
                        <div className="min-w-0">
                          <div className="text-[15px] font-bold">{numbers.protein}g</div>
                          <div className="text-[10px] text-zinc-500">Protein</div>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[15px] font-bold">{numbers.carbs}g</div>
                          <div className="text-[10px] text-zinc-500">Carbs</div>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[15px] font-bold">{numbers.fat}g</div>
                          <div className="text-[10px] text-zinc-500">Fat</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[11.5px] text-zinc-500 leading-relaxed break-words">
                      <span className="font-semibold text-zinc-700">Portion guide · </span>
                      {portionGuideText}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[13px] font-bold">Meal Plan · {selectedKitchen.kitchen} · ~{mealTotal} kcal</h3>
                    <div className="grid gap-3">
                      {mealPlan.map((x, idx) => {
                        const calServ = Math.round((x.dish.cal_100 * x.grams) / 100);
                        const p = Math.round((x.dish.p * x.grams) / 100);
                        const c = Math.round((x.dish.c * x.grams) / 100);
                        const f = Math.round((x.dish.f * x.grams) / 100);
                        const badge = confBadge(x.dish.confidence);
                        return (
                          <div key={idx} className="meal-card print-break w-full rounded-[10px] border border-zinc-200 bg-white min-w-0">
                            <div className="px-3.5 py-2.5 border-b border-dashed border-zinc-200 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-full bg-zinc-900 text-white">{x.meal}</span>
                                <span className="text-[12px] text-zinc-500">{x.grams}g</span>
                              </div>
                              <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.cls}`}>{badge.label}</span>
                            </div>
                            <div className="p-3.5 min-w-0">
                              <div className="flex items-start justify-between gap-3 min-w-0">
                                <div className="min-w-0 flex-1">
                                  <div className="text-[13.5px] font-medium leading-snug break-words">{x.dish.name}</div>
                                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600">{selectedKitchen.flag} {selectedKitchen.kitchen}</span>
                                    <span className="text-[10.5px] text-zinc-500">{calServ} kcal · {x.grams}g serving</span>
                                    {x.dish.source && <span className="max-w-full break-words text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700">{x.dish.source}</span>}
                                  </div>
                                  <div className="mt-1 text-[10.5px] text-zinc-500 break-words">{x.dish.cal_100} kcal/100g</div>
                                  <div className="mt-2 grid grid-cols-3 gap-1.5">
                                    <div className="rounded-[8px] bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 text-[11px]">
                                      <span className="font-bold text-emerald-800">{p}g</span> <span className="text-emerald-600">P</span>
                                    </div>
                                    <div className="rounded-[8px] bg-blue-50 border border-blue-100 px-2.5 py-1.5 text-[11px]">
                                      <span className="font-bold text-blue-800">{c}g</span> <span className="text-blue-600">C</span>
                                    </div>
                                    <div className="rounded-[8px] bg-amber-50 border border-amber-100 px-2.5 py-1.5 text-[11px]">
                                      <span className="font-bold text-amber-800">{f}g</span> <span className="text-amber-600">F</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="shrink-0 rounded-[8px] bg-zinc-900 text-white px-2.5 py-1.5 text-[12px] font-bold break-words max-w-[64px] text-center">{calServ} kcal</div>
                              </div>
                            </div>
                            <div className="px-3.5 py-2 border-t border-dashed border-zinc-200 flex items-center justify-between text-[11.5px]">
                              <span className="text-zinc-500">Meal total</span>
                              <span className="font-bold">{Math.round((x.dish.cal_100 * x.grams) / 100)} kcal</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button type="button" onClick={() => setBlueprintPage(1)} className="text-[12.5px] font-semibold text-zinc-500 hover:text-zinc-800">← Back to Metrics</button>
                </div>
              )}

              <div className="print-only mt-6 text-[11px] text-zinc-500 leading-relaxed break-words">
                HealthCalc.io · Your Personalized Health Blueprint · Generated {new Date().toLocaleDateString()} · {kitchensRegistry.length} countries, {totalDishesAll} dishes · {selectedKitchen.kitchen}
              </div>
            </div>
          )}

          {step === 4 && !numbers && (
            <div className="rounded-[12px] border border-zinc-200 p-4 text-[12.5px] text-zinc-500">Complete the previous steps to review your blueprint.</div>
          )}
        </div>

        <div className="mt-8">
          {step !== 4 ? (
            <div className="hidden md:flex gap-3">
              <button
                type="button"
                onClick={back}
                disabled={step === 1}
                className={`h-[48px] px-6 rounded-[8px] border text-[14px] font-medium transition-all ${step === 1 ? 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed' : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-300 text-zinc-700'}`}
              >
                Back
              </button>
              <button
                type="button"
                onClick={next}
                disabled={!isValid()}
                className={`flex-1 h-[48px] rounded-[8px] text-[14px] font-semibold transition-all flex items-center justify-center gap-2 ${!isValid() ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed' : 'bg-[#1e40af] text-white hover:bg-[#1c3aa0] shadow-[0_1px_2px_rgba(0,0,0,0.08)]'}`}
              >
                Next →
              </button>
            </div>
          ) : (
            <div className="no-print hidden md:flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="h-[48px] px-6 rounded-[8px] border bg-zinc-50 hover:bg-zinc-100 border-zinc-300 text-zinc-700 text-[14px] font-medium"
              >
                🖨 Print / PDF
              </button>
              <button
                type="button"
                onClick={() => setEmailOpen(true)}
                className="flex-1 h-[48px] rounded-[8px] bg-[#1e40af] text-white text-[14px] font-semibold hover:bg-[#1c3aa0] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
              >
                ✉️ Send via Email
              </button>
            </div>
          )}
        </div>
      </main>

      {step !== 4 ? (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-4 py-3 flex gap-3 z-40">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className={`h-[48px] px-5 rounded-[8px] border text-[14px] font-medium shrink-0 ${step === 1 ? 'bg-zinc-100 text-zinc-400 border-zinc-200' : 'bg-zinc-50 border-zinc-300 text-zinc-700'}`}
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!isValid()}
            className={`flex-1 h-[48px] rounded-[8px] text-[15px] font-semibold flex items-center justify-center gap-2 ${!isValid() ? 'bg-zinc-300 text-zinc-500' : 'bg-[#1e40af] text-white'}`}
          >
            Next →
          </button>
        </div>
      ) : (
        <div className="no-print md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-4 py-3 flex gap-3 z-40">
          <button
            type="button"
            onClick={() => window.print()}
            className="h-[48px] px-4 rounded-[8px] border bg-zinc-50 border-zinc-300 text-zinc-700 text-[14px] font-medium shrink-0"
          >
            🖨 Print
          </button>
          <button
            type="button"
            onClick={() => setEmailOpen(true)}
            className="flex-1 h-[48px] rounded-[8px] text-[15px] font-semibold flex items-center justify-center gap-2 bg-[#1e40af] text-white"
          >
            ✉️ Send via Email
          </button>
        </div>
      )}

      {toast && (
        <div className="no-print fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-full bg-zinc-900 text-white text-[12.5px] font-medium px-4 py-2 shadow-lg whitespace-nowrap">
          {toast}
        </div>
      )}

      {emailOpen && (
        <div className="no-print fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-end md:items-center justify-center">
          <div className="w-full max-w-[560px] bg-white rounded-t-[16px] md:rounded-[16px] p-5 shadow-xl relative">
            <button
              type="button"
              onClick={() => {
                setEmailOpen(false);
                setEmailDone('');
                setEmailSending(false);
              }}
              className="absolute top-4 right-4 w-7 h-7 rounded-full text-zinc-400 hover:text-zinc-700 text-[16px]"
            >
              ✕
            </button>
            {emailDone ? (
              <div className="pt-2">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">✓</div>
                <h3 className="mt-3 text-[17px] font-bold">Sent</h3>
                <p className="mt-1 text-[13.5px] text-zinc-600 break-words">PDF sent to {emailDone}</p>
                <button
                  type="button"
                  onClick={() => {
                    setEmailOpen(false);
                    setEmailDone('');
                    setEmailSending(false);
                  }}
                  className="mt-5 w-full h-[48px] rounded-[8px] bg-[#1e40af] text-white text-[14px] font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="pt-2">
                <h3 className="text-[17px] font-bold">Send Blueprint</h3>
                <p className="mt-1 text-[13px] text-zinc-500">Receive the blueprint as a PDF on your email.</p>
                <label className="mt-4 block text-[12.5px] font-medium text-zinc-700">Email address</label>
                <input
                  type="email"
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  placeholder="you@example.com"
                  inputMode="email"
                  className="mt-1.5 w-full h-[48px] rounded-[8px] border border-zinc-300 px-4 outline-none focus:border-[#1e40af] focus:ring-[3px] focus:ring-blue-100 bg-white"
                />
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEmailOpen(false)}
                    className="h-[48px] px-5 rounded-[8px] border border-zinc-300 bg-zinc-50 text-zinc-700 text-[14px] font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={sendEmail}
                    disabled={emailSending || !emailText.trim()}
                    className={`flex-1 h-[48px] rounded-[8px] text-[14px] font-semibold ${emailSending || !emailText.trim() ? 'bg-zinc-300 text-zinc-500' : 'bg-[#1e40af] text-white'}`}
                  >
                    {emailSending ? 'Sending…' : 'Send'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeightLossPage;