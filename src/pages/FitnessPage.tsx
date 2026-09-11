import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Flame, Gauge, HeartPulse, Ruler, Wind } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import FitnessHeroVisual from '../components/illustrations/FitnessHeroVisual';

interface FormData { age: number; gender: 'male' | 'female'; heightCm: number; weightKg: number; activityLevel: string }

const ACT: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
const ACT_ORDER = ['sedentary', 'light', 'moderate', 'active', 'very_active'];
const ACT_LABELS: Record<string, string> = { sedentary: 'fcSedentary', light: 'fcLight', moderate: 'fcModerate', active: 'fcActive', very_active: 'fcVeryActive' };

function bmiValue(hCm: number, wKg: number) { const h = hCm / 100; return h ? wKg / (h * h) : 0; }
function bmrValue(g: 'male' | 'female', age: number, hCm: number, wKg: number) {
  return g === 'male' ? 10 * wKg + 6.25 * hCm - 5 * age + 5 : 10 * wKg + 6.25 * hCm - 5 * age - 161;
}
function bmiStatus(bmi: number) {
  if (bmi < 18.5) return { key: 'fcBmiUnder', color: '#3b82f6' };
  if (bmi < 25) return { key: 'fcPillHealthy', color: '#0F4C3A' };
  if (bmi < 30) return { key: 'fcBmiOver', color: '#f59e0b' };
  return { key: 'fcBmiObese', color: '#ef4444' };
}
function estBodyFat(g: 'male' | 'female', bmi: number, age: number) {
  return g === 'male' ? 1.2 * bmi + 0.23 * age - 16.2 : 1.2 * bmi + 0.23 * age - 5.4;
}
function bfLevel(g: 'male' | 'female', bf: number): string {
  const tiers: Array<[number, string]> = g === 'male'
    ? [[5, 'fcBfLevelEssential'], [13, 'fcBfLevelAthlete'], [17, 'fcBfLevelFitness'], [24, 'fcBfLevelAverage'], [Infinity, 'fcBfLevelObese']]
    : [[13, 'fcBfLevelEssential'], [20, 'fcBfLevelAthlete'], [24, 'fcBfLevelFitness'], [31, 'fcBfLevelAverage'], [Infinity, 'fcBfLevelObese']];
  const hit = tiers.find(([max]) => bf <= max);
  return hit ? hit[1] : 'fcBfLevelObese';
}
function estVo2(g: 'male' | 'female', age: number, act: string) {
  const base = g === 'male' ? 60.4 : 49.7;
  const idx = Math.max(0, ACT_ORDER.indexOf(act));
  const raw = base - 0.55 * age + (idx - 2) * 4;
  return Math.max(25, Math.min(75, Math.round(raw * 10) / 10));
}
function vo2Level(v: number): string {
  if (v < 35) return 'fcVo2Poor';
  if (v <= 42) return 'fcVo2Fair';
  if (v <= 50) return 'fcVo2Good';
  if (v <= 58) return 'fcVo2Excellent';
  return 'fcVo2Superior';
}
function estWhr(g: 'male' | 'female', bmi: number) {
  const d = g === 'male' ? 0.9 : 0.8;
  return Math.round(d * Math.sqrt(bmi / 22) * 100) / 100;
}
function whrRisk(g: 'male' | 'female', whr: number): string {
  const [lo, hi] = g === 'male' ? [0.9, 1.0] : [0.8, 0.85];
  if (whr < lo) return 'fcWhrLevelLow';
  if (whr < hi) return 'fcWhrLevelModerate';
  return 'fcWhrLevelHigh';
}

const HR_COLORS = ['#0F4C3A', '#D4AF37', '#fb923c', '#ef4444'];
const riskColor = (k: string) => (k === 'fcWhrLevelLow' ? '#0F4C3A' : k === 'fcWhrLevelModerate' ? '#f59e0b' : '#ef4444');
const vo2Color = (k: string) => (k === 'fcVo2Poor' ? '#ef4444' : k === 'fcVo2Fair' ? '#f59e0b' : k === 'fcVo2Good' ? '#0F4C3A' : k === 'fcVo2Excellent' ? '#3b82f6' : '#8b5cf6');
const bfColor = (k: string) => (k === 'fcBfLevelObese' ? '#ef4444' : k === 'fcBfLevelAverage' ? '#f59e0b' : '#0F4C3A');

const FitnessPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({ age: 30, gender: 'male', heightCm: 170, weightKg: 70, activityLevel: 'moderate' });
  const [calculated, setCalculated] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const metrics = useMemo(() => {
    if (!form.age || !form.heightCm || !form.weightKg) return null;
    const bmi = Math.round(bmiValue(form.heightCm, form.weightKg) * 10) / 10;
    const bmr = Math.round(bmrValue(form.gender, form.age, form.heightCm, form.weightKg));
    const maintain = Math.round(bmr * (ACT[form.activityLevel] || 1.55));
    const lose = Math.max(1200, maintain - 500);
    const maxHr = 220 - form.age;
    const bodyFat = Math.round(estBodyFat(form.gender, bmi, form.age) * 10) / 10;
    const vo2 = estVo2(form.gender, form.age, form.activityLevel);
    const whr = estWhr(form.gender, bmi);
    const mk = (lo: number, hi: number) => `${Math.round((maxHr * lo) / 100)}–${Math.round((maxHr * hi) / 100)}`;
    const zones = [
      { key: 'fcHrWarm', pct: '50–60%', bpm: mk(50, 60) },
      { key: 'fcHrFatBurn', pct: '60–70%', bpm: mk(60, 70) },
      { key: 'fcHrCardio', pct: '70–80%', bpm: mk(70, 80) },
      { key: 'fcHrPeak', pct: '80–90%', bpm: mk(80, 90) },
    ];
    return { bmi, bmr, maintain, lose, maxHr, bodyFat, vo2, whr, zones };
  }, [form]);

  const saveProfile = useCallback(() => {
    localStorage.setItem('hc_calc_profile', JSON.stringify(form));
  }, [form]);

  const handleBridge = useCallback(() => {
    saveProfile();
    localStorage.setItem('hc_calculator_bridge', JSON.stringify({
      age: form.age,
      gender: form.gender,
      height: form.heightCm,
      weight: form.weightKg,
      activityLevel: form.activityLevel,
      goal: 'lose_weight',
      bmi: metrics?.bmi,
      bmr: metrics?.bmr,
      tdee: metrics?.maintain,
      savedAt: new Date().toISOString(),
    }));
    if (metrics) {
      localStorage.setItem('userTDEE', String(metrics.maintain));
      localStorage.setItem('userBMR', String(metrics.bmr));
    }
    navigate('/weight-loss');
  }, [form, metrics, saveProfile, navigate]);

  const handleCalculate = useCallback(() => {
    saveProfile();
    setCalculated(true);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }, [saveProfile]);

  const patch = (p: Partial<FormData>) => setForm((f) => ({ ...f, ...p }));

  const bmiStatusD = metrics ? bmiStatus(metrics.bmi) : null;
  const bmiPct = metrics ? Math.max(4, Math.min(100, ((metrics.bmi - 14) / 26) * 100)) : 0;
  const bfs = metrics ? bfLevel(form.gender, metrics.bodyFat) : 'fcBfLevelFitness';
  const bfPct = metrics ? Math.max(4, Math.min(100, (metrics.bodyFat / 45) * 100)) : 0;
  const whr = metrics ? whrRisk(form.gender, metrics.whr) : 'fcWhrLevelLow';
  const vo2lvl = metrics ? vo2Level(metrics.vo2) : 'fcVo2Good';

  const unitSuffix = (u: string) => (
    <span className="absolute inset-inline-end-4 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[#A0A8A4] pointer-events-none">{u}</span>
  );

  const resultCard = 'rounded-3xl bg-white p-7 border border-[#EFEBE4] shadow-[0_8px_24px_rgba(15,76,58,0.08)]';

  return (
    <div className="tool-page min-h-screen bg-[#FDFBF7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div className="flex items-center gap-4">
          <div className="wiz-progress flex-1">
            <div className="wiz-progress-fill" style={{ width: '20%' }} />
          </div>
          <span className="wiz-progress-badge">{t('fitnessPage.step')}</span>
        </div>
      </div>

      <div className="page-hero page-hero-light">
        <div className="page-hero-mesh" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            <div className="page-hero-copy">
              <span className="block text-[12px] font-extrabold uppercase tracking-[2px] text-[#D4AF37] mb-3">
                {t('fitnessPage.eyebrow')}
              </span>
              <h1 className="text-4xl md:text-[48px] font-extrabold tracking-tight leading-[1.08]">
                <span className="block text-[#0F4C3A]">{t('fitnessPage.titleLine1')}</span>
                <span className="block text-[#D4AF37]">{t('fitnessPage.titleLine2')}</span>
              </h1>
              <p className="mt-4 text-lg text-[#6B7A75] leading-relaxed">{t('fitnessPage.subtitle')}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="rounded-full bg-[#F4F1EB] text-[#0F4C3A] text-[12px] font-bold px-4 py-1.5">{t('fitnessPage.badge1')}</span>
                <span className="rounded-full bg-[#F4F1EB] text-[#0F4C3A] text-[12px] font-bold px-4 py-1.5">{t('fitnessPage.badge2')}</span>
                <span className="rounded-full bg-[#F4F1EB] text-[#6B7A75] text-[12px] font-bold px-4 py-1.5">{t('fitnessPage.badge3')}</span>
              </div>
            </div>
            <FitnessHeroVisual
              bmi={metrics ? metrics.bmi.toFixed(1) : '--'}
              tdee={metrics ? metrics.maintain.toLocaleString() : '--'}
              maxHr={metrics ? metrics.maxHr : 190}
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <section id="profile" className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[28px] p-8 sm:p-10 border border-[#EFEBE4] shadow-[0_12px_36px_rgba(15,76,58,0.08)]">
            <h2 className="text-[22px] font-extrabold text-[#0F4C3A]">{t('fitnessPage.profile.title')}</h2>
            <p className="mt-1 text-[14px] text-[#6B7A75]">{t('fitnessPage.profile.subtitle')}</p>

            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="wiz-label" htmlFor="wiz-age">{t('fitnessPage.profile.age')}</label>
                <div className="relative">
                  <input id="wiz-age" type="number" min={2} max={120} className="wiz-input" value={form.age} onChange={(e) => patch({ age: Math.max(2, Math.min(120, +e.target.value || 2)) })} />
                  {unitSuffix(t('fcYears'))}
                </div>
              </div>
              <div>
                <label className="wiz-label">{t('fitnessPage.profile.gender')}</label>
                <div className="flex gap-2">
                  {(['male', 'female'] as const).map((g) => (
                    <button key={g} type="button" onClick={() => patch({ gender: g })}
                      className={`flex-1 rounded-xl px-3 py-[14px] text-[14px] font-bold transition-all duration-200 ${form.gender === g ? 'bg-[#0F4C3A] text-white shadow-[0_6px_14px_rgba(15,76,58,0.3)]' : 'bg-[#F4F1EB] text-[#6B7A75] hover:bg-[#ECE5D6] hover:text-[#0F4C3A]'}`}>
                      {t(g)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="wiz-label" htmlFor="wiz-height">{t('fitnessPage.profile.height')}</label>
                <div className="relative">
                  <input id="wiz-height" type="number" min={100} max={250} step={0.5} className="wiz-input" value={form.heightCm} onChange={(e) => patch({ heightCm: Math.max(100, Math.min(250, +e.target.value || 100)) })} />
                  {unitSuffix('cm')}
                </div>
              </div>
              <div>
                <label className="wiz-label" htmlFor="wiz-weight">{t('fitnessPage.profile.weight')}</label>
                <div className="relative">
                  <input id="wiz-weight" type="number" min={20} max={300} step={0.5} className="wiz-input" value={form.weightKg} onChange={(e) => patch({ weightKg: Math.max(20, Math.min(300, +e.target.value || 20)) })} />
                  {unitSuffix('kg')}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="wiz-label" htmlFor="wiz-activity">{t('fitnessPage.profile.activity')}</label>
              <select id="wiz-activity" className="wiz-input" value={form.activityLevel} onChange={(e) => patch({ activityLevel: e.target.value })}>
                {ACT_ORDER.map((k) => <option key={k} value={k}>{t(ACT_LABELS[k] as any)}</option>)}
              </select>
            </div>

            <div className="mt-8">
              <button type="button" className="cta-calc" onClick={handleCalculate}>
                {t('fitnessPage.cta.calculate')}
              </button>
            </div>
            <p className="mt-5 text-center text-[12px] text-[#A0A8A4]">{t('fcProfileNote')}</p>
          </div>
        </section>

        {calculated && metrics && bmiStatusD && (
          <div ref={resultsRef} id="results" className="animate-fade-in scroll-mt-24">
            <div className="text-center mb-8">
              <h2 className="text-[24px] font-extrabold text-[#0F4C3A]">{t('fitnessPage.results.title')}</h2>
              <p className="mt-1 text-[14px] text-[#6B7A75]">{t('fitnessPage.results.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className={resultCard}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(15,76,58,0.08)] text-[#0F4C3A]"><Gauge size={20} strokeWidth={2.3} /></span>
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#6B7A75]">BMI</span>
                  </span>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: `${bmiStatusD.color}18`, color: bmiStatusD.color }}>{t(bmiStatusD.key as any)}</span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="num text-[40px] leading-none font-extrabold text-[#0F4C3A]">{metrics.bmi}</span>
                  <span className="text-[12px] font-semibold text-[#A0A8A4]">kg/m²</span>
                </div>
                <div className="mt-4 h-2.5 rounded-full bg-[#F4F1EB] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${bmiPct}%`, background: bmiStatusD.color }} />
                </div>
              </div>

              <div className="rounded-3xl p-7 border border-[#D4AF37] shadow-[0_12px_30px_rgba(15,76,58,0.18)]" style={{ background: 'linear-gradient(135deg,#0F4C3A,#14532D 60%,#1f6b52)' }}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-[#D4AF37]"><Flame size={20} strokeWidth={2.3} /></span>
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-white/80">TDEE</span>
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="num text-[40px] leading-none font-extrabold text-[#D4AF37]">{metrics.maintain.toLocaleString()}</span>
                  <span className="text-[12px] font-semibold text-white/70">kcal/day</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-[12px] font-bold text-white">
                    {t('fcTdeeBmr')} <span className="num">{metrics.bmr}</span> kcal
                  </span>
                  <span className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-[12px] font-bold text-white">
                    {t('fcTdeeLose')} <span className="num">{metrics.lose.toLocaleString()}</span> kcal
                  </span>
                </div>
              </div>

              <div className={resultCard}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(15,76,58,0.08)] text-[#0F4C3A]"><Dumbbell size={20} strokeWidth={2.3} /></span>
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#6B7A75]">{t('fcBfTitle')}</span>
                  </span>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: `${bfColor(bfs)}18`, color: bfColor(bfs) }}>{t(bfs as any)}</span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="num text-[40px] leading-none font-extrabold text-[#0F4C3A]">{metrics.bodyFat}</span>
                  <span className="text-[12px] font-semibold text-[#A0A8A4]">%</span>
                </div>
                <div className="mt-4 h-2.5 rounded-full bg-[#F4F1EB] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${bfPct}%`, background: bfColor(bfs) }} />
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className={resultCard}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(15,76,58,0.08)] text-[#0F4C3A]"><Ruler size={20} strokeWidth={2.3} /></span>
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#6B7A75]">WH-R</span>
                  </span>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full text-white" style={{ background: riskColor(whr) }}>{t(whr as any)}</span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="num text-[34px] leading-none font-extrabold text-[#0F4C3A]">{metrics.whr.toFixed(2)}</span>
                  <span className="text-[12px] font-semibold text-[#A0A8A4]">waist/hip</span>
                </div>
                <div className="mt-4 flex gap-1.5">
                  {[0, 0.25, 0.5, 0.75, 1].map((p) => (
                    <span key={p} className="h-1.5 flex-1 rounded-full" style={{ background: metrics.whr > 0.55 + p * 0.12 ? riskColor(whr) : '#F4F1EB' }} />
                  ))}
                </div>
              </div>

              <div className={resultCard}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(15,76,58,0.08)] text-[#0F4C3A]"><Wind size={20} strokeWidth={2.3} /></span>
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#6B7A75]">VO2 MAX</span>
                  </span>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full text-white" style={{ background: vo2Color(vo2lvl) }}>{t(vo2lvl as any)}</span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="num text-[34px] leading-none font-extrabold text-[#0F4C3A]">{metrics.vo2}</span>
                  <span className="text-[12px] font-semibold text-[#A0A8A4]">ml/kg/min</span>
                </div>
                <div className="mt-4 flex gap-1.5">
                  {[0, 0.25, 0.5, 0.75, 1].map((p) => (
                    <span key={p} className="h-1.5 flex-1 rounded-full" style={{ background: metrics.vo2 > 30 + p * 10 ? vo2Color(vo2lvl) : '#F4F1EB' }} />
                  ))}
                </div>
              </div>
            </div>

            <div className={`${resultCard} mt-5`} style={{ direction: 'ltr' }}>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2.5">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(212,175,55,0.18)] text-[#B8860B]"><HeartPulse size={20} strokeWidth={2.3} /></span>
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#6B7A75]">{t('fcHrTitle')}</span>
                </span>
                <span className="rounded-full bg-[#F4F1EB] text-[#0F4C3A] text-[12px] font-extrabold px-4 py-1.5">
                  {t('fcHrMax')} <span className="num">{metrics.maxHr}</span> bpm
                </span>
              </div>
              <div className="mt-5 flex h-4 rounded-full overflow-hidden">
                {metrics.zones.map((z, i) => (
                  <div key={z.key} className="h-full" style={{ width: '25%', background: HR_COLORS[i] }} />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {metrics.zones.map((z, i) => (
                  <div key={z.key} className="rounded-2xl bg-[#FDFBF7] border border-[#EFEBE4] p-3.5">
                    <span className="flex items-center gap-1.5 text-[13px] font-bold text-[#0F4C3A]">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: HR_COLORS[i] }} />
                      {t(z.key as any)}
                    </span>
                    <span className="num block mt-2 text-[13px] font-extrabold text-[#0F4C3A]">{z.bpm} <small className="text-[10px] font-semibold text-[#A0A8A4]">bpm</small></span>
                    <span className="block mt-0.5 text-[11px] font-semibold text-[#A0A8A4]">{z.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {calculated && (
          <div className="max-w-3xl mx-auto pt-4">
            <button type="button" className="cta-continue" onClick={handleBridge}>
              {t('fitnessPage.cta.continue')}
            </button>
            <p className="mt-4 text-center text-[12px] text-[#A0A8A4]">{t('fcProfileNote')}</p>
          </div>
        )}

        <MedicalDisclaimer />
      </div>
    </div>
  );
};

export default FitnessPage;