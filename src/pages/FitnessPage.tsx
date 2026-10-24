import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Flame, Gauge, HeartPulse, Ruler, Wind } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import FitnessHeroVisual from '../components/illustrations/FitnessHeroVisual';
import { useUserProfile, type UserGoal, type UserProfile } from '../hooks/useUserProfile';
import type { Language } from '../types';

interface FormData { age: string; gender: 'male' | 'female'; heightCm: string; weightKg: string; activityLevel: string; goal: UserGoal | '' }

const ACT: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
const ACT_ORDER = ['sedentary', 'light', 'moderate', 'active', 'very_active'];
const ACT_LABELS: Record<string, string> = { sedentary: 'fcSedentary', light: 'fcLight', moderate: 'fcModerate', active: 'fcActive', very_active: 'fcVeryActive' };
const NUMBER_LOCALE_BY_LANGUAGE: Record<Language, string> = { en: 'en-US', fr: 'fr-FR', es: 'es-ES', ar: 'ar-EG', de: 'de-DE' };

function bmiValue(hCm: number, wKg: number) { const h = hCm / 100; return h ? wKg / (h * h) : 0; }
function bmrValue(g: 'male' | 'female', age: number, hCm: number, wKg: number) {
  return g === 'male' ? 10 * wKg + 6.25 * hCm - 5 * age + 5 : 10 * wKg + 6.25 * hCm - 5 * age - 161;
}
function bmiStatus(bmi: number) {
  if (bmi < 18.5) return { key: 'fcBmiUnder', color: '#8EA39A' };
  if (bmi < 25) return { key: 'fcBmiNormal', color: '#0F4C3A' };
  if (bmi < 30) return { key: 'fcBmiOver', color: '#C49B45' };
  return { key: 'fcBmiObese', color: '#C77762' };
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

const HR_COLORS = ['#0F4C3A', '#D4A017', '#fb923c', '#ef4444'];
const riskColor = (k: string) => (k === 'fcWhrLevelLow' ? '#0F4C3A' : k === 'fcWhrLevelModerate' ? '#f59e0b' : '#ef4444');
const vo2Color = (k: string) => (k === 'fcVo2Poor' ? '#ef4444' : k === 'fcVo2Fair' ? '#f59e0b' : k === 'fcVo2Good' ? '#0F4C3A' : k === 'fcVo2Excellent' ? '#3b82f6' : '#8b5cf6');
const bfColor = (k: string) => (k === 'fcBfLevelObese' ? '#ef4444' : k === 'fcBfLevelAverage' ? '#f59e0b' : '#0F4C3A');

interface MacroChartDatum {
  name: string;
  percentage: number;
  grams: number;
  color: string;
}

const FitnessPage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { profile, updateProfile, resetProfile } = useUserProfile();
  const [form, setForm] = useState<FormData>(() => ({
    age: profile.age === null ? '' : String(profile.age),
    gender: profile.gender ?? 'male',
    heightCm: profile.height === null ? '' : String(profile.height),
    weightKg: profile.weight === null ? '' : String(profile.weight),
    activityLevel: profile.activityLevel ?? 'moderate',
    goal: profile.goal ?? '',
  }));
  const [calculated, setCalculated] = useState(() => profile.age !== null && profile.height !== null && profile.weight !== null);
  const [error, setError] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);

  const metrics = useMemo(() => {
    const age = +form.age;
    const h = +form.heightCm;
    const w = +form.weightKg;
    if (!age || !h || !w) return null;
    const bmi = Math.round(bmiValue(h, w) * 10) / 10;
    const bmr = Math.round(bmrValue(form.gender, age, h, w));
    const maintain = Math.round(bmr * (ACT[form.activityLevel] || 1.55));
    const lose = Math.max(1200, maintain - 500);
    const maxHr = 220 - age;
    const bodyFat = Math.round(estBodyFat(form.gender, bmi, age) * 10) / 10;
    const vo2 = estVo2(form.gender, age, form.activityLevel);
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

  const validate = useCallback(() => {
    const age = parseInt(form.age, 10);
    const height = parseInt(form.heightCm, 10);
    const weight = parseInt(form.weightKg, 10);
    if (!age || age < 10 || age > 120) return t('fitnessPage.error.age');
    if (!height || height < 100 || height > 250) return t('fitnessPage.error.height');
    if (!weight || weight < 20 || weight > 300) return t('fitnessPage.error.weight');
    return '';
  }, [form, t]);

  const saveSharedProfile = () => {
    const updated: Partial<UserProfile> = {
      age: +form.age || null,
      gender: form.gender,
      height: +form.heightCm || null,
      weight: +form.weightKg || null,
      activityLevel: form.activityLevel as UserProfile['activityLevel'],
      goal: form.goal || null,
    };
    updateProfile(updated);
  };

  const handleBridge = useCallback(() => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    saveSharedProfile();
    localStorage.setItem('hc_calculator_bridge', JSON.stringify({
      age: +form.age,
      gender: form.gender,
      height: +form.heightCm,
      weight: +form.weightKg,
      activityLevel: form.activityLevel,
      goal: form.goal === 'lose' ? 'lose_weight' : form.goal || profile.goal || 'lose_weight',
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
  }, [form, metrics, profile.goal, validate, updateProfile, navigate]);

  const handleCalculate = useCallback(() => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    saveSharedProfile();
    setCalculated(true);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }, [validate, saveSharedProfile]);

  const patch = (p: Partial<FormData>) => {
    const next = { ...form, ...p };
    setForm(next);
    const updated: Partial<UserProfile> = {
      age: +next.age || null,
      gender: next.gender,
      height: +next.heightCm || null,
      weight: +next.weightKg || null,
      activityLevel: next.activityLevel as UserProfile['activityLevel'],
      goal: next.goal || null,
    };
    updateProfile(updated);
  };

  const bmiStatusD = metrics ? bmiStatus(metrics.bmi) : null;
  const bfs = metrics ? bfLevel(form.gender, metrics.bodyFat) : 'fcBfLevelFitness';
  const bfPct = metrics ? Math.max(4, Math.min(100, (metrics.bodyFat / 45) * 100)) : 0;
  const whr = metrics ? whrRisk(form.gender, metrics.whr) : 'fcWhrLevelLow';
  const vo2lvl = metrics ? vo2Level(metrics.vo2) : 'fcVo2Good';
  const macroTargetCalories = metrics ? (form.goal === 'lose' ? metrics.lose : metrics.maintain) : 0;
  const macroProteinPercent = form.goal === 'gain_muscle' ? 35 : 30;
  const macroCarbsPercent = 40;
  const macroFatPercent = 100 - macroProteinPercent - macroCarbsPercent;
  const macroChartData: MacroChartDatum[] = [
    {
      name: t('wizard.macro.protein' as any),
      percentage: macroProteinPercent,
      grams: Math.round((macroTargetCalories * macroProteinPercent) / 100 / 4),
      color: '#16815F',
    },
    {
      name: t('wizard.macro.carbs' as any),
      percentage: macroCarbsPercent,
      grams: Math.round((macroTargetCalories * macroCarbsPercent) / 100 / 4),
      color: '#D5A447',
    },
    {
      name: t('wizard.macro.fat' as any),
      percentage: macroFatPercent,
      grams: Math.round((macroTargetCalories * macroFatPercent) / 100 / 9),
      color: '#E18A70',
    },
  ];
  const bmiScaleRanges = [
    { label: t('fcBmiUnder'), range: '<18.5', min: 14, max: 18.5, color: '#D9E2DC' },
    { label: t('fcBmiNormal'), range: '18.5–24.9', min: 18.5, max: 25, color: '#16815F' },
    { label: t('fcBmiOver'), range: '25–29.9', min: 25, max: 30, color: '#E9D49A' },
    { label: t('fcBmiObese'), range: '≥30', min: 30, max: 40, color: '#E8B7A8' },
  ];
  const bmiScalePosition = metrics ? Math.max(0, Math.min(100, ((metrics.bmi - 14) / (40 - 14)) * 100)) : 0;

  const unitSuffix = (u: string) => (
    <span className="absolute inset-inline-end-4 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[#A0A8A4] pointer-events-none">{u}</span>
  );

  const resultCard = 'rounded-3xl bg-white p-7 border border-[#EFEBE4] shadow-[0_8px_24px_rgba(15,76,58,0.08)]';

  return (
    <div className="tool-page min-h-screen bg-[#FDFBF7]">
      <SEO title={t('seo.fitness.title')} description={t('seo.fitness.description')} url="/fitness" />
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
              <span className="block text-[12px] font-extrabold uppercase tracking-[2px] text-[#D4A017] mb-3">
                {t('fitnessPage.eyebrow')}
              </span>
              <h1 className="text-4xl md:text-[48px] font-extrabold tracking-tight leading-[1.08]">
                <span className="block text-[#0F4C3A]">{t('fitnessPage.titleLine1')}</span>
                <span className="block text-[#D4A017]">{t('fitnessPage.titleLine2')}</span>
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
                  <input id="wiz-age" type="number" inputMode="numeric" min={10} max={120} className="wiz-input" value={form.age} onChange={(e) => { setError(''); patch({ age: e.target.value }); }} />
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
                  <input id="wiz-height" type="number" inputMode="decimal" min={100} max={250} step={0.5} className="wiz-input" value={form.heightCm} onChange={(e) => { setError(''); patch({ heightCm: e.target.value }); }} />
                  {unitSuffix('cm')}
                </div>
              </div>
              <div>
                <label className="wiz-label" htmlFor="wiz-weight">{t('fitnessPage.profile.weight')}</label>
                <div className="relative">
                  <input id="wiz-weight" type="number" inputMode="decimal" min={20} max={300} step={0.5} className="wiz-input" value={form.weightKg} onChange={(e) => { setError(''); patch({ weightKg: e.target.value }); }} />
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

            <div className="mt-5">
              <label className="wiz-label" htmlFor="fitness-goal">{t('goal')}</label>
              <select id="fitness-goal" className="wiz-input" value={form.goal} onChange={(e) => patch({ goal: e.target.value as UserGoal | '' })}>
                <option value="">{t('fitnessPage.profile.goalPlaceholder')}</option>
                <option value="lose">{t('wizard.step4.goalTypes.lose')}</option>
                <option value="gain_muscle">{t('wizard.step4.goalTypes.gainMuscle')}</option>
                <option value="gain_weight">{t('wizard.step4.goalTypes.gainWeight')}</option>
                <option value="wellness">{t('wizard.step4.goalTypes.wellness')}</option>
                <option value="athletic">{t('wizard.step4.goalTypes.athletic')}</option>
              </select>
            </div>

            <div className="mt-8">
              {error && <p className="mb-4 text-center text-[13px] font-bold text-[#ef4444]">{error}</p>}
              <button type="button" className="cta-calc" onClick={handleCalculate}>
                {t('fitnessPage.cta.calculate')}
              </button>
            </div>
            <p className="mt-5 text-center text-[12px] text-[#A0A8A4]">{t('fcProfileNote')}</p>
            <button
              type="button"
              onClick={() => {
                resetProfile();
                setForm({ age: '', gender: 'male', heightCm: '', weightKg: '', activityLevel: 'moderate', goal: '' });
                setCalculated(false);
                setError('');
              }}
              className="mx-auto mt-3 block rounded-full px-4 py-2 text-xs font-semibold text-[#6B7A75] hover:bg-[#F4F1EB]"
            >
              {t('fitnessPage.profile.resetSaved')}
            </button>
          </div>
        </section>

        {calculated && metrics && bmiStatusD && (
          <div ref={resultsRef} id="results" className="animate-fade-in scroll-mt-24">
            <div className="text-center mb-8">
              <h2 className="text-[24px] font-extrabold text-[#0F4C3A]">{t('fitnessPage.results.title')}</h2>
              <p className="mt-1 text-[14px] text-[#6B7A75]">{t('fitnessPage.results.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <section className={`${resultCard} min-w-0 p-5 sm:p-7`} aria-labelledby="fitness-macro-chart-title">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#A17D3E]">{t('fitnessPage.results.macrosEyebrow')}</span>
                    <h3 id="fitness-macro-chart-title" className="mt-1 text-[18px] font-extrabold text-[#153A2E]">{t('fitnessPage.results.macrosTitle')}</h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-[#74847A]">{t('fitnessPage.results.macrosSubtitle')}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-[#E1EAE1] bg-[#F5F8F3] px-3 py-1.5 text-[10px] font-bold text-[#52705C]">{t('fitnessPage.results.dailyTarget')}</span>
                </div>

                <div className="mt-3 grid grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(210px,.95fr)_minmax(0,1.05fr)] sm:gap-3">
                  <div className="relative mx-auto h-[230px] w-full max-w-[280px]" role="img" aria-label={macroChartData.map((macro) => `${macro.name}: ${macro.grams} grams, ${macro.percentage}%`).join('. ')}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={macroChartData}
                          dataKey="percentage"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={67}
                          outerRadius={94}
                          paddingAngle={4}
                          cornerRadius={5}
                          stroke="none"
                          isAnimationActive
                          animationDuration={1050}
                          animationEasing="ease-out"
                        >
                          {macroChartData.map((macro) => <Cell key={macro.name} fill={macro.color} />)}
                        </Pie>
                        <Tooltip
                          cursor={false}
                          formatter={(_value, _name, item) => {
                            const macro = item.payload as MacroChartDatum;
                            return [`${macro.grams} g · ${macro.percentage}%`, macro.name];
                          }}
                          contentStyle={{ borderRadius: 14, border: '1px solid #E3EAE2', boxShadow: '0 10px 28px rgba(20, 55, 39, .12)', fontSize: 12 }}
                          labelStyle={{ color: '#17382F', fontWeight: 700 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#87958A]">{t('fitnessPage.results.dailyCalories')}</span>
                      <strong className="num mt-1 text-[27px] font-black leading-none tracking-tight text-[#153A2E]">{macroTargetCalories.toLocaleString(NUMBER_LOCALE_BY_LANGUAGE[language])}</strong>
                      <span className="mt-1 text-[10px] font-semibold text-[#87958A]">kcal / day</span>
                    </div>
                  </div>

                  <div className="space-y-2" aria-label={t('fitnessPage.results.macroLegend')}>
                    {macroChartData.map((macro) => (
                      <div key={macro.name} className="flex items-center justify-between gap-3 rounded-2xl border border-[#E8EDE7] bg-[#FBFCF9] px-3.5 py-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: macro.color }} />
                          <span className="truncate text-[12px] font-bold text-[#40554A]">{macro.name}</span>
                        </div>
                        <div className="shrink-0 text-end">
                          <strong className="num text-[13px] font-extrabold text-[#183E30]">{macro.grams} g</strong>
                          <span className="ms-1.5 text-[10px] font-semibold text-[#89958C]">{macro.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className={`${resultCard} min-w-0 p-5 sm:p-7`} aria-labelledby="fitness-bmi-scale-title">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#A17D3E]">BMI · kg/m²</span>
                    <h3 id="fitness-bmi-scale-title" className="mt-1 text-[18px] font-extrabold text-[#153A2E]">{t('fitnessPage.results.bmiScaleTitle')}</h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-[#74847A]">{t('fitnessPage.results.bmiScaleSubtitle')}</p>
                  </div>
                  <span className="shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold" style={{ background: `${bmiStatusD.color}18`, color: bmiStatusD.color }}>{t(bmiStatusD.key as any)}</span>
                </div>

                <div className="mt-7 flex items-baseline gap-2">
                  <span className="num text-[42px] font-black leading-none tracking-tight text-[#153A2E]">{metrics.bmi.toFixed(1)}</span>
                  <span className="text-[12px] font-semibold text-[#87958A]">kg/m²</span>
                </div>
                <div
                  className="mt-6"
                  role="meter"
                  aria-label={`${t('fitnessPage.results.bmiScaleTitle')}: ${metrics.bmi.toFixed(1)}, ${t(bmiStatusD.key as any)}`}
                  aria-valuetext={`${metrics.bmi.toFixed(1)} (${t(bmiStatusD.key as any)})`}
                  aria-valuemin={14}
                  aria-valuemax={40}
                  aria-valuenow={Math.max(14, Math.min(40, metrics.bmi))}
                >
                  <div className="relative">
                    <div className="flex h-3.5 overflow-hidden rounded-full ring-1 ring-inset ring-black/5">
                      {bmiScaleRanges.map((range) => (
                        <span
                          key={range.label}
                          className="h-full"
                          style={{ width: `${((range.max - range.min) / (40 - 14)) * 100}%`, backgroundColor: range.color }}
                        />
                      ))}
                    </div>
                    <span className="absolute top-[-7px] z-10 -translate-x-1/2 transition-[left] duration-1000 ease-out" style={{ left: `${bmiScalePosition}%` }} aria-hidden="true">
                      <span className="mx-auto block h-[27px] w-[3px] rounded-full bg-[#17382F] shadow-[0_1px_4px_rgba(12,40,28,.3)]" />
                      <span className="absolute left-1/2 top-[-2px] h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-[#17382F] shadow-sm" />
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between px-0.5 text-[9px] font-semibold tabular-nums text-[#98A198]"><span>14</span><span>18.5</span><span>25</span><span>30</span><span>40+</span></div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-4">
                  {bmiScaleRanges.map((range) => (
                    <div key={range.label} className="min-w-0">
                      <span className="flex items-center gap-1.5 text-[9px] font-bold leading-tight text-[#58695E]">
                        <i className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: range.color }} />
                        <span className="truncate">{range.label}</span>
                      </span>
                      <span className="ms-3.5 mt-1 block text-[8px] font-semibold text-[#98A198]">{range.range}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-[#D4A017] p-7 shadow-[0_12px_30px_rgba(15,76,58,0.18)]" style={{ background: 'linear-gradient(135deg,#0F4C3A,#14532D 60%,#1f6b52)' }}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-[#D4A017]"><Flame size={20} strokeWidth={2.3} /></span>
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-white/80">TDEE</span>
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="num text-[40px] leading-none font-extrabold text-[#D4A017]">{metrics.maintain.toLocaleString()}</span>
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
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(212,160,23,0.18)] text-[#B8860B]"><HeartPulse size={20} strokeWidth={2.3} /></span>
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
