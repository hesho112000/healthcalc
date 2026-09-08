import React, { useMemo, useState } from 'react';
import { EGYPTIAN_FULL, EGYPTIAN_PORTION_GUIDE } from '../data/egyptian-full';
import { TUNISIAN_FULL, TUNISIAN_PORTION_GUIDE } from '../data/tunisian-full';

type Step = 1 | 2 | 3 | 4;
type Sex = 'male' | 'female';
type ActivityKey = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type KitchenKey = 'egyptian' | 'tunisian' | 'both';
type GoalKey = 'lose' | 'maintain' | 'gain';

interface SampleDish {
  ar: string;
  cal: number;
  conf: number;
  kitchen: 'egyptian' | 'tunisian';
  protein: number;
  carbs: number;
  fat: number;
  servG: number;
  calServ: number;
  source?: string;
}

const ACTIVITY: Record<ActivityKey, { factor: number; label: string; desc: string }> = {
  sedentary: { factor: 1.2, label: 'خامل', desc: 'مكتبي - بدون رياضة' },
  light: { factor: 1.375, label: 'خفيف', desc: '1-3 أيام / أسبوع' },
  moderate: { factor: 1.55, label: 'متوسط', desc: '3-5 أيام / أسبوع' },
  active: { factor: 1.725, label: 'نشط', desc: '6-7 أيام / أسبوع' },
  very_active: { factor: 1.9, label: 'نشط جدا', desc: 'عمل شاق + رياضة' },
};

const CURATED: Array<{ kitchen: 'egyptian' | 'tunisian'; name: string }> = [
  { kitchen: 'egyptian', name: 'الفول المدمس السادة' },
  { kitchen: 'egyptian', name: 'الفتة المصرية بالخل والثوم والعيش المحمص' },
  { kitchen: 'egyptian', name: 'بفتيك اللحم المقلي بالبقسماط' },
  { kitchen: 'egyptian', name: 'ملوخية' },
  { kitchen: 'tunisian', name: 'شوربة عدس بالكمون' },
  { kitchen: 'tunisian', name: 'كسكسي تونسي باللحم الضاني (العلوش) والخضار' },
  { kitchen: 'tunisian', name: 'علوش مشوي على الفحم (ضاني)' },
  { kitchen: 'tunisian', name: 'بريك البيض والبطاطس التقليدي' },
];

const buildSampleList = (): SampleDish[] => {
  const eg = new Map(EGYPTIAN_FULL.map((d) => [d.nameAr, d]));
  const tn = new Map(TUNISIAN_FULL.map((d) => [d.nameAr, d]));
  return CURATED.map(({ kitchen, name }) => {
    const d = kitchen === 'egyptian' ? eg.get(name) : tn.get(name);
    const kcalFallback = Math.round(((d?.cal100 ?? 100) * (d?.servG ?? 100)) / 100);
    return {
      ar: name,
      cal: d?.cal100 ?? 100,
      conf: d?.confidence ?? 70,
      kitchen,
      protein: d?.p100 ?? 5,
      carbs: d?.c100 ?? 10,
      fat: d?.f100 ?? 4,
      servG: d?.servG ?? 100,
      calServ: d?.kcal ?? kcalFallback,
      source: d?.source,
    };
  });
};

const ALL_SAMPLES = buildSampleList();

const STEP_TITLES: Record<Step, string> = {
  1: 'Basic Info',
  2: 'Body & Kitchen',
  3: 'Goals',
  4: 'Review',
};

const confClass = (conf: number): string =>
  conf === 100
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : conf === 85
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-orange-50 text-orange-700 border-orange-200';

const confBadge = (conf: number): { cls: string; label: string } =>
  conf === 100
    ? { cls: 'bg-emerald-100 text-emerald-800', label: '100% موثوق' }
    : conf === 85
      ? { cls: 'bg-yellow-100 text-yellow-800', label: '85% متوسط' }
      : { cls: 'bg-orange-100 text-orange-800', label: '70% تقديري' };

const WeightLossPage: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [age, setAge] = useState('28');
  const [sex, setSex] = useState<Sex>('male');
  const [height, setHeight] = useState('176');
  const [weight, setWeight] = useState('82');
  const [activity, setActivity] = useState<ActivityKey>('moderate');
  const [kitchen, setKitchen] = useState<KitchenKey>('both');
  const [goal, setGoal] = useState<GoalKey>('lose');
  const [targetWeight, setTargetWeight] = useState('75');
  const [timeline, setTimeline] = useState('12');
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

  const numbers = useMemo(() => {
    const { age: a, height: h, weight: w } = parsed;
    if (!a || !h || !w) return null;
    const bmi = +(w / Math.pow(h / 100, 2)).toFixed(1);
    const bmr = sex === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * ACTIVITY[activity].factor;
    let target = tdee;
    if (goal === 'lose') target = tdee - 500;
    if (goal === 'gain') target = tdee + 320;
    return {
      bmi,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCal: Math.round(target),
      bmiCat: bmi < 18.5 ? 'نقص وزن' : bmi < 25 ? 'طبيعي' : bmi < 30 ? 'زيادة' : 'سمنة',
    };
  }, [parsed, sex, activity, goal]);

  const samples = useMemo(() => {
    const eg = ALL_SAMPLES.filter((s) => s.kitchen === 'egyptian');
    const tn = ALL_SAMPLES.filter((s) => s.kitchen === 'tunisian');
    if (kitchen === 'egyptian') return eg;
    if (kitchen === 'tunisian') return tn;
    return [eg[0], tn[0], eg[1], tn[1], eg[2], tn[2], eg[3], tn[3]].filter((d): d is SampleDish => !!d);
  }, [kitchen]);

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

  const meals = [
    { meal: 'فطار', dish: samples[0], grams: 250 },
    { meal: 'غدا', dish: samples[1] || samples[0], grams: 350 },
    { meal: 'عشاء', dish: samples[2] || samples[0], grams: 300 },
    { meal: 'سناك', dish: samples[3] || samples[0], grams: 150 },
  ];

  const confCounts = useMemo(() => {
    const count = (list: { confidence: number }[], c: number) => list.filter((d) => d.confidence === c).length;
    const eg100 = count(EGYPTIAN_FULL, 100);
    const eg85 = count(EGYPTIAN_FULL, 85);
    const eg70 = count(EGYPTIAN_FULL, 70);
    const tn100 = count(TUNISIAN_FULL, 100);
    const tn85 = count(TUNISIAN_FULL, 85);
    const tn70 = count(TUNISIAN_FULL, 70);
    return { eg100, eg85, eg70, tn100, tn85, tn70, t100: eg100 + tn100, t85: eg85 + tn85, t70: eg70 + tn70 };
  }, []);

  const macros = numbers
    ? {
        protein: Math.round((numbers.targetCal * 0.3) / 4),
        carbs: Math.round((numbers.targetCal * 0.4) / 4),
        fat: Math.round((numbers.targetCal * 0.3) / 9),
      }
    : null;

  const goalRate =
    goal === 'lose'
      ? (parsed.weight - parsed.target) / Math.max(1, parsed.timeline || 1)
      : goal === 'gain'
        ? (parsed.target - parsed.weight) / Math.max(1, parsed.timeline || 1)
        : 0;
  const deficit = goal === 'lose' ? -500 : goal === 'gain' ? 320 : 0;
  const goalProgress =
    numbers && parsed.weight !== parsed.target
      ? Math.min(100, Math.max(0, goal === 'lose' ? ((parsed.weight - parsed.target) / parsed.weight) * 100 : ((parsed.target - parsed.weight) / parsed.target) * 100))
      : 0;
  const kitchenPortions =
    kitchen === 'egyptian' ? EGYPTIAN_PORTION_GUIDE : kitchen === 'tunisian' ? TUNISIAN_PORTION_GUIDE : [...EGYPTIAN_PORTION_GUIDE, ...TUNISIAN_PORTION_GUIDE];

  const kitchenOptions = [
    { id: 'egyptian' as KitchenKey, label: 'Egyptian', count: `${EGYPTIAN_FULL.length} dishes`, ar: 'المطبخ المصري' },
    { id: 'tunisian' as KitchenKey, label: 'Tunisian', count: `${TUNISIAN_FULL.length} dishes`, ar: 'المطبخ التونسي' },
    { id: 'both' as KitchenKey, label: 'Both', count: `${EGYPTIAN_FULL.length + TUNISIAN_FULL.length} dishes`, ar: 'الاثنين معا' },
  ];

  const kitchenLabel = kitchen === 'both' ? 'Mixed kitchens' : kitchen;

  const inputClass = 'w-full h-[48px] rounded-[8px] border border-zinc-300 px-4 outline-none focus:border-[#1e40af] focus:ring-[3px] focus:ring-blue-100 bg-white';

  return (
    <div className="wiz-page min-h-screen bg-white text-zinc-900 overflow-x-hidden antialiased" dir="ltr">
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
                <div className="grid gap-2">
                  {(Object.keys(ACTIVITY) as ActivityKey[]).map((x) => {
                    const opt = ACTIVITY[x];
                    const on = activity === x;
                    return (
                      <button
                        key={x}
                        type="button"
                        onClick={() => setActivity(x)}
                        className={`w-full text-left rounded-[10px] border px-4 py-3 flex items-center justify-between transition-all min-w-0 ${on ? 'border-[#1e40af] bg-blue-50/60 ring-[3px] ring-blue-100' : 'border-zinc-200 bg-white hover:border-zinc-300'}`}
                      >
                        <div className="min-w-0">
                          <div className="text-[13.5px] font-semibold">{opt.label}</div>
                          <div className="text-[12px] text-zinc-500 break-words">{opt.desc} · x{opt.factor}</div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${on ? 'border-[#1e40af]' : 'border-zinc-300'}`}>
                          {on && <div className="w-2 h-2 rounded-full bg-[#1e40af]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[13px] font-medium text-zinc-700">Kitchen selector</label>
                <div className="grid grid-cols-1 gap-2">
                  {kitchenOptions.map((x) => (
                    <button
                      key={x.id}
                      type="button"
                      onClick={() => setKitchen(x.id)}
                      className={`h-[56px] rounded-[10px] border px-4 flex items-center justify-between text-left transition-all ${kitchen === x.id ? 'border-[#1e40af] bg-blue-50/50 ring-[3px] ring-blue-100' : 'border-zinc-200 bg-white'}`}
                    >
                      <div>
                        <div className="text-[13.5px] font-semibold">{x.label} <span className="font-normal text-zinc-500">· {x.count}</span></div>
                        <div className="text-[11.5px] text-zinc-500">{x.ar}</div>
                      </div>
                      <div className="text-[12px]">{kitchen === x.id ? '●' : '○'}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold">Sample dishes · {samples.length} shown</h3>
                  <div className="flex gap-1.5">
                    <span className="text-[10px] px-2 py-1 rounded-full border bg-emerald-50 border-emerald-200 text-emerald-700">100%</span>
                    <span className="text-[10px] px-2 py-1 rounded-full border bg-amber-50 border-amber-200 text-amber-700">85%</span>
                    <span className="text-[10px] px-2 py-1 rounded-full border bg-orange-50 border-orange-200 text-orange-700">70%</span>
                  </div>
                </div>
                <div className="grid gap-2">
                  {samples.map((x) => (
                    <div key={x.ar} className="w-full rounded-[10px] border border-zinc-200 bg-white px-3.5 py-3 flex items-center justify-between gap-3 min-w-0">
                      <div className="min-w-0">
                        <div className="text-[13px] font-medium leading-tight break-words">{x.ar}</div>
                        <div className="text-[11.5px] text-zinc-500 mt-0.5 break-words">{x.cal} cal / 100g · {x.protein}g protein</div>
                      </div>
                      <span className={`shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full border ${confClass(x.conf)}`}>{x.conf}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-zinc-700">Goal type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['lose', 'maintain', 'gain'] as GoalKey[]).map((x) => (
                    <button
                      key={x}
                      type="button"
                      onClick={() => setGoal(x)}
                      className={`h-[48px] rounded-[8px] border text-[13px] font-medium capitalize ${goal === x ? 'bg-[#1e40af] text-white border-[#1e40af]' : 'bg-white border-zinc-300 text-zinc-700'}`}
                    >
                      {x === 'lose' ? 'Lose ↓' : x === 'gain' ? 'Gain ↑' : 'Maintain →'}
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

              {numbers && (
                <div className="rounded-[12px] border border-zinc-200 bg-zinc-50/70 p-4 space-y-2">
                  <div className="text-[12px] font-semibold text-zinc-700">Projection</div>
                  <div className="text-[13px] text-zinc-600 leading-relaxed break-words">
                    من {parsed.weight}kg إلى {parsed.target}kg خلال {parsed.timeline} أسابيع = {((parsed.weight - parsed.target > 0 ? parsed.weight - parsed.target : parsed.target - parsed.weight) / (parsed.timeline || 1)).toFixed(2)}kg / أسبوع.{' '}
                    {goal === 'lose' && parsed.weight > parsed.target ? 'معدل آمن.' : goal === 'gain' ? 'زيادة محسوبة.' : 'ثبات وزن.'}
                  </div>
                  <div className="text-[12px] text-zinc-500">Target calories: ~{numbers.targetCal} kcal / day</div>
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
                  <span className="text-[11.5px] px-2.5 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700 capitalize">{goal}</span>
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
                    <div className="grid grid-cols-3 gap-2">
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
                        <div className="text-[11px] text-zinc-500 mt-1 break-words">kcal/day</div>
                      </div>
                      <div className="rounded-[10px] bg-[#1e40af] text-white p-3 min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-blue-200 font-semibold">TDEE</div>
                        <div className="text-[20px] font-bold leading-none mt-1">{numbers.tdee}</div>
                        <div className="text-[11px] text-blue-100 mt-1 break-words">maintenance</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[12px]">
                      <div className="rounded-[8px] border border-zinc-200 px-3 py-2.5">
                        <span className="text-zinc-500">Age</span> <span className="font-semibold ml-1">{parsed.age}y · {sex}</span>
                      </div>
                      <div className="rounded-[8px] border border-zinc-200 px-3 py-2.5">
                        <span className="text-zinc-500">Activity</span> <span className="font-semibold ml-1">{ACTIVITY[activity].label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[14px] border border-zinc-200 bg-white p-4 md:p-5 space-y-3">
                    <h3 className="text-[13px] font-bold">Goal</h3>
                    <div className="text-[13px] text-zinc-700 break-words">
                      {goal === 'lose' ? `Lose ${goalRate.toFixed(2)}kg/week` : goal === 'gain' ? `Gain ${goalRate.toFixed(2)}kg/week` : 'Maintain weight'} · target {parsed.target}kg in {parsed.timeline}w
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
                      <span className="px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700 break-words">{deficit > 0 ? `+${deficit}` : deficit} kcal/day</span>
                      <span className="px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700">Target {numbers.targetCal} kcal</span>
                    </div>
                  </div>

                  <div className="rounded-[14px] border border-zinc-200 bg-white p-4 md:p-5 space-y-3">
                    <h3 className="text-[13px] font-bold">Daily Macros · ~{numbers.targetCal}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-[10px] bg-emerald-50 border border-emerald-100 p-3 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Protein</div>
                        <div className="text-[17px] font-bold leading-tight mt-1">{macros!.protein}g</div>
                        <div className="text-[10.5px] text-emerald-700 mt-0.5">30%</div>
                      </div>
                      <div className="rounded-[10px] bg-blue-50 border border-blue-100 p-3 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-blue-700">Carbs</div>
                        <div className="text-[17px] font-bold leading-tight mt-1">{macros!.carbs}g</div>
                        <div className="text-[10.5px] text-blue-700 mt-0.5">40%</div>
                      </div>
                      <div className="rounded-[10px] bg-amber-50 border border-amber-100 p-3 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Fat</div>
                        <div className="text-[17px] font-bold leading-tight mt-1">{macros!.fat}g</div>
                        <div className="text-[10.5px] text-amber-700 mt-0.5">30%</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[14px] border border-zinc-200 bg-white p-4 md:p-5 space-y-3">
                    <h3 className="text-[13px] font-bold">Confidence Score · مصدر البيانات</h3>
                    <div className="space-y-2 text-[12px] leading-relaxed text-zinc-700 break-words">
                      <div className="flex items-center justify-between gap-3 rounded-[8px] bg-emerald-50/70 border border-emerald-100 px-3 py-2">
                        <div className="min-w-0">
                          <span className="font-bold">🟢 100%</span> <span className="text-zinc-600">المعهد القومي</span>
                        </div>
                        <span className="shrink-0 font-bold text-emerald-800">{confCounts.t100} أطباق</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-[8px] bg-yellow-50/70 border border-yellow-100 px-3 py-2">
                        <div className="min-w-0">
                          <span className="font-bold">🟡 85%</span> <span className="text-zinc-600">USDA + وصفة تقليدية</span>
                        </div>
                        <span className="shrink-0 font-bold text-yellow-800">{confCounts.t85} أطباق</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-[8px] bg-orange-50/70 border border-orange-100 px-3 py-2">
                        <div className="min-w-0">
                          <span className="font-bold">🟠 70%</span> <span className="text-zinc-600">تقديري محلي</span>
                        </div>
                        <span className="shrink-0 font-bold text-orange-800">{confCounts.t70} أطباق</span>
                      </div>
                      <div className="text-[11.5px] text-zinc-500">دقة الأرقام حسب مصدر كل طبق من قاعدة بيانات {confCounts.t100 + confCounts.t85 + confCounts.t70} طبق.</div>
                    </div>
                  </div>

                  <div className="rounded-[14px] border border-zinc-200 bg-white p-4 md:p-5 space-y-3">
                    <h3 className="text-[13px] font-bold">Kitchen Database</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-[10px] bg-zinc-50 border border-dashed border-zinc-300 p-3 min-w-0">
                        <div className="text-[12px] font-bold">المصري {EGYPTIAN_FULL.length} طبق</div>
                        <div className="mt-1 text-[10.5px] text-zinc-500 break-words">100%: {confCounts.eg100} · 85%: {confCounts.eg85} · 70%: {confCounts.eg70}</div>
                      </div>
                      <div className="rounded-[10px] bg-zinc-50 border border-dashed border-zinc-300 p-3 min-w-0">
                        <div className="text-[12px] font-bold">التونسي {TUNISIAN_FULL.length} طبق</div>
                        <div className="mt-1 text-[10.5px] text-zinc-500 break-words">100%: {confCounts.tn100} · 85%: {confCounts.tn85} · 70%: {confCounts.tn70}</div>
                      </div>
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
                          <div className="text-[15px] font-bold">{macros!.protein}g</div>
                          <div className="text-[10px] text-zinc-500">Protein</div>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[15px] font-bold">{macros!.carbs}g</div>
                          <div className="text-[10px] text-zinc-500">Carbs</div>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[15px] font-bold">{macros!.fat}g</div>
                          <div className="text-[10px] text-zinc-500">Fat</div>
                        </div>
                      </div>
                    </div>
                    {kitchenPortions.length > 0 && (
                      <div className="text-[11.5px] text-zinc-500 leading-relaxed break-words">
                        <span className="font-semibold text-zinc-700">Portion guide · </span>
                        {kitchenPortions.slice(0, 6).join(' · ')}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[13px] font-bold">Meal Plan · {kitchenLabel} · ~{numbers.targetCal} kcal</h3>
                    <div className="grid gap-3">
                      {meals.map((x, idx) => {
                        const kcal = Math.round((x.dish.cal * x.grams) / 100);
                        const calServ = x.dish.calServ || kcal;
                        const p = Math.round((x.dish.protein * x.grams) / 100);
                        const c = Math.round((x.dish.carbs * x.grams) / 100);
                        const f = Math.round((x.dish.fat * x.grams) / 100);
                        const badge = confBadge(x.dish.conf);
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
                                  <div className="text-[13.5px] font-medium leading-snug break-words">{x.dish.ar}</div>
                                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600">{x.dish.kitchen === 'egyptian' ? 'مصري' : 'تونسي'}</span>
                                    <span className="text-[10.5px] text-zinc-500">{calServ} kcal · {x.dish.servG || x.grams}g serving</span>
                                    {x.dish.source && <span className="max-w-full break-words text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700">{x.dish.source}</span>}
                                  </div>
                                  <div className="mt-1 text-[10.5px] text-zinc-500 break-words">{x.dish.cal} kcal/100g</div>
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
                              <span className="font-bold">{kcal} kcal</span>
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
                HealthCalc.io · Your Personalized Health Blueprint · Generated {new Date().toLocaleDateString()} · Egyptian {EGYPTIAN_FULL.length} dishes, Tunisian {TUNISIAN_FULL.length} dishes
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