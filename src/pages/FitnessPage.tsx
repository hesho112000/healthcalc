import React, { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import MedicalDisclaimer from '../components/MedicalDisclaimer';

type Tab = 'bmi' | 'bmr' | 'calorie' | 'ideal';

interface FormData { age: number; gender: 'male' | 'female'; heightCm: number; weightKg: number; activityLevel: string }
interface BmiResult { bmi: number; category: string; color: string; bg: string; border: string; gauge: string; risk: string }
interface BmrResult { bmr: number; tdee: number }
interface CalorieResult { tdee: number; lose: number; maintain: number; gain: number; protein: number; carbs: number; fat: number }
interface IdealResult { min: number; max: number; mid: number }

const ACT: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
const ACT_LABELS: Record<string, string> = { sedentary: 'fcSedentary', light: 'fcLight', moderate: 'fcModerate', active: 'fcActive', very_active: 'fcVeryActive' };
const BMI_CATS = [
  { min: 0, max: 18.5, cat: 'Underweight', key: 'fcBmiUnder', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', gauge: '#3b82f6', risk: 'Moderate' },
  { min: 18.5, max: 25, cat: 'Normal', key: 'fcBmiNormal', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', gauge: '#10b981', risk: 'Low' },
  { min: 25, max: 30, cat: 'Overweight', key: 'fcBmiOver', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', gauge: '#f59e0b', risk: 'Increased' },
  { min: 30, max: 100, cat: 'Obese', key: 'fcBmiObese', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', gauge: '#ef4444', risk: 'High' },
];

function bmiCat(bmi: number) { return BMI_CATS.find(c => bmi >= c.min && bmi < c.max) || BMI_CATS[3]; }
function gaugeRot(bmi: number) { return ((Math.min(Math.max(bmi, 10), 45) - 10) / 35) * 180 - 90; }
function idealRange(hCm: number) { const h = hCm / 100; return { min: Math.round(18.5 * h * h * 10) / 10, max: Math.round(24.9 * h * h * 10) / 10 }; }

const FitnessPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('bmi');
  const [form, setForm] = useState<FormData>({ age: 30, gender: 'male', heightCm: 170, weightKg: 70, activityLevel: 'moderate' });
  const [bmiRes, setBmiRes] = useState<BmiResult | null>(null);
  const [bmrRes, setBmrRes] = useState<BmrResult | null>(null);
  const [calRes, setCalRes] = useState<CalorieResult | null>(null);
  const [idealRes, setIdealRes] = useState<IdealResult | null>(null);
  const [saved, setSaved] = useState(false);

  const set = useCallback((patch: Partial<FormData>) => setForm(p => ({ ...p, ...patch })), []);

  const saveProfile = useCallback(() => {
    localStorage.setItem('hc_calc_profile', JSON.stringify(form));
  }, [form]);

  const calcBmi = useCallback(() => {
    const h = form.heightCm / 100;
    const bmi = Math.round((form.weightKg / (h * h)) * 10) / 10;
    const c = bmiCat(bmi);
    setBmiRes({ bmi, category: c.key, color: c.color, bg: c.bg, border: c.border, gauge: c.gauge, risk: c.risk });
    saveProfile();
  }, [form, saveProfile]);

  const calcBmr = useCallback(() => {
    const bmr = form.gender === 'male'
      ? 10 * form.weightKg + 6.25 * form.heightCm - 5 * form.age + 5
      : 10 * form.weightKg + 6.25 * form.heightCm - 5 * form.age - 161;
    const tdee = Math.round(bmr * (ACT[form.activityLevel] || 1.55));
    setBmrRes({ bmr: Math.round(bmr), tdee });
    setCalRes({ tdee, lose: tdee - 500, maintain: tdee, gain: tdee + 300, protein: Math.round(form.weightKg * 1.6), carbs: Math.round((tdee * 0.45) / 4), fat: Math.round((tdee * 0.25) / 9) });
    saveProfile();
  }, [form, saveProfile]);

  const calcIdeal = useCallback(() => {
    const r = idealRange(form.heightCm);
    setIdealRes({ min: r.min, max: r.max, mid: Math.round((r.min + r.max) / 2 * 10) / 10 });
    saveProfile();
  }, [form, saveProfile]);

  const handleBridge = useCallback(() => {
    saveProfile();
    localStorage.setItem('hc_calculator_bridge', JSON.stringify({
      age: form.age,
      gender: form.gender,
      height: form.heightCm,
      weight: form.weightKg,
      activityLevel: form.activityLevel,
      goal: 'lose_weight',
      bmi: bmiRes?.bmi,
      bmr: bmrRes?.bmr,
      tdee: bmrRes?.tdee,
      savedAt: new Date().toISOString(),
    }));
    setSaved(true);
  }, [form, bmiRes, bmrRes, saveProfile]);


  const hasResult = bmiRes || bmrRes || calRes || idealRes;

  const SavedBanner: React.FC = () => (
    <div className="animate-fade-in space-y-4">
      {/* Confirmation strip */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-sage-600 text-white p-5 flex items-center gap-4 shadow-lg">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <div>
          <p className="font-bold text-white text-sm">{t('fcSaved')}</p>
          <p className="text-emerald-100 text-xs">{t('fcSavedDesc')}</p>
        </div>
      </div>
      {/* CTA Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2Mkg3VjI4aDI5ek0xNiA0MnYySDV2LTJoMTF6bTIwLTV2MkgxOHYtMmgyNXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="relative z-10 text-center">
          <p className="text-amber-100 text-xs font-semibold uppercase tracking-wider mb-2">{t('fcCtaLabel')}</p>
          <h3 className="text-xl md:text-2xl font-extrabold mb-2 leading-tight">{t('fcCtaHeadline')}</h3>
          <p className="text-orange-100 text-sm mb-5 max-w-md mx-auto">{t('fcCtaSub')}</p>
          <button onClick={() => navigate('/weight-loss')}
              className="inline-flex items-center gap-3 bg-white text-orange-600 font-extrabold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm md:text-base">
              <span className="text-xl">🏋️</span>
              {t('fcCtaButton')}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
        </div>
      </div>
    </div>
  );

  const tabs: { key: Tab; icon: string; label: string }[] = [
    { key: 'bmi', icon: '⚖️', label: t('fcTabBmi') },
    { key: 'bmr', icon: '🔥', label: t('fcTabBmr') },
    { key: 'calorie', icon: '🍽️', label: t('fcTabCal') },
    { key: 'ideal', icon: '🎯', label: t('fcTabIdeal') },
  ];

  const SharedInputs: React.FC = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="label">{t('age')}</label>
          <input type="number" min={2} max={120} value={form.age} onChange={e => set({ age: +e.target.value })} className="input-field-lg" />
        </div>
        <div>
          <label className="label">{t('gender')}</label>
          <div className="toggle-group">
            <button type="button" onClick={() => set({ gender: 'male' })} className={form.gender === 'male' ? 'toggle-btn-active' : 'toggle-btn-inactive'}>♂ {t('male')}</button>
            <button type="button" onClick={() => set({ gender: 'female' })} className={form.gender === 'female' ? 'toggle-btn-active' : 'toggle-btn-inactive'}>♀ {t('female')}</button>
          </div>
        </div>
        <div>
          <label className="label">{t('height')} (cm)</label>
          <input type="number" min={100} max={250} step={0.5} value={form.heightCm} onChange={e => set({ heightCm: +e.target.value })} className="input-field-lg" />
        </div>
        <div>
          <label className="label">{t('weightLabel')} (kg)</label>
          <input type="number" min={20} max={300} step={0.5} value={form.weightKg} onChange={e => set({ weightKg: +e.target.value })} className="input-field-lg" />
        </div>
      </div>
      {(tab === 'bmr' || tab === 'calorie') && (
        <div>
          <label className="label">{t('activityLevel')}</label>
          <div className="flex flex-wrap gap-1.5">
            {Object.keys(ACT).map(k => (
              <button key={k} type="button" onClick={() => set({ activityLevel: k })}
                className={`px-3 py-2 rounded-xl text-[11px] font-semibold transition-all ${form.activityLevel === k ? 'bg-primary-600 text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {t(ACT_LABELS[k] as any)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const LaunchButton: React.FC = () => (
    <button onClick={handleBridge}
      className="w-full rounded-2xl bg-gradient-to-r from-primary-600 to-sage-600 text-white p-5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="flex items-center justify-center gap-3">
        <span className="text-2xl">🏋️</span>
        <div className="text-left">
          <p className="font-extrabold text-sm md:text-base">{t('fcCtaLaunch')}</p>
          <p className="text-primary-100 text-xs">{t('fcCtaLaunchSub')}</p>
        </div>
        <svg className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-sage-300 rounded-full" />
              <span className="text-xs font-medium text-primary-100">WHO · CDC · NIH · Mifflin-St Jeor</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3 tracking-tight">{t('fcTitle')}</h1>
            <p className="text-primary-100 text-sm md:text-base leading-relaxed">{t('fcSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Shared Profile */}
        <div className="card">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><span className="text-lg">👤</span> {t('fcProfile')}</h3>
          <SharedInputs />
          <p className="text-[10px] text-gray-400 mt-3">{t('fcProfileHint')}</p>
        </div>

        {/* Tab Bar */}
        <div className="toggle-group flex flex-wrap gap-1">
          {tabs.map(tb => (
            <button key={tb.key} type="button" onClick={() => setTab(tb.key)} className={tab === tb.key ? 'toggle-btn-active' : 'toggle-btn-inactive'}>
              <span className="mr-1">{tb.icon}</span> {tb.label}
            </button>
          ))}
        </div>

        {/* ═══════ BMI TAB ═══════ */}
        {tab === 'bmi' && (
          <div className="space-y-5 animate-fade-in">
            <div className="card">
              <button onClick={calcBmi} className="btn-primary w-full text-center">{t('calculate')} {t('fcTabBmi')}</button>
            </div>
            {bmiRes && (
              <div className="space-y-5 animate-fade-in">
                {/* Gauge */}
                <div className="card flex flex-col items-center py-8">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">{t('fcBmiYourBmi')}</p>
                  <div className="relative w-52 h-28 mb-4">
                    <svg viewBox="0 0 200 100" className="w-full h-full">
                      <path d="M 10 95 A 90 90 0 0 1 55 15" fill="none" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" opacity="0.25" />
                      <path d="M 55 15 A 90 90 0 0 1 145 15" fill="none" stroke="#10b981" strokeWidth="10" strokeLinecap="round" opacity="0.25" />
                      <path d="M 145 15 A 90 90 0 0 1 180 55" fill="none" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" opacity="0.25" />
                      <path d="M 180 55 A 90 90 0 0 1 190 95" fill="none" stroke="#ef4444" strokeWidth="10" strokeLinecap="round" opacity="0.25" />
                      <g transform={`rotate(${gaugeRot(bmiRes.bmi)}, 100, 95)`}>
                        <line x1="100" y1="95" x2="100" y2="20" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="100" cy="95" r="5" fill="#1f2937" />
                      </g>
                    </svg>
                  </div>
                  <div className={`inline-flex items-baseline gap-2 px-5 py-2.5 rounded-2xl ${bmiRes.bg} ${bmiRes.border} border`}>
                    <span className={`text-4xl font-extrabold ${bmiRes.color}`}>{bmiRes.bmi}</span>
                    <span className="text-sm font-semibold text-gray-500">kg/m²</span>
                  </div>
                  <p className={`mt-3 text-sm font-bold ${bmiRes.color}`}>{t(bmiRes.category as any)}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{t('fcBmiRisk')}: {bmiRes.risk}</p>
                </div>
                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="stat-card text-center"><p className="text-lg font-extrabold text-gray-900">{bmiRes.bmi}</p><p className="text-[10px] text-gray-500">{t('fcBmiValue')}</p></div>
                  <div className="stat-card text-center"><p className="text-lg font-extrabold text-emerald-600">18.5 – 24.9</p><p className="text-[10px] text-gray-500">{t('fcBmiHealthy')}</p></div>
                  <div className="stat-card text-center col-span-2 sm:col-span-1">
                    <p className="text-lg font-extrabold text-primary-600">{idealRange(form.heightCm).min} – {idealRange(form.heightCm).max} kg</p>
                    <p className="text-[10px] text-gray-500">{t('fcBmiIdeal')}</p>
                  </div>
                </div>
                {saved ? <SavedBanner /> : <LaunchButton />}
              </div>
            )}
          </div>
        )}

        {/* ═══════ BMR TAB ═══════ */}
        {tab === 'bmr' && (
          <div className="space-y-5 animate-fade-in">
            <div className="card">
              <button onClick={calcBmr} className="btn-primary w-full text-center">{t('calculate')} {t('fcTabBmr')}</button>
            </div>
            {bmrRes && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div className="card text-center py-8">
                    <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2">{t('fcBmrLabel')}</p>
                    <p className="text-4xl font-extrabold text-gray-900">{bmrRes.bmr}</p>
                    <p className="text-xs text-gray-500 mt-1">kcal/day</p>
                    <p className="text-[10px] text-gray-400 mt-2">{t('fcBmrDesc')}</p>
                  </div>
                  <div className="card text-center py-8 bg-gradient-to-br from-sage-50 to-primary-50 border-sage-200/80">
                    <p className="text-xs font-bold text-sage-600 uppercase tracking-wider mb-2">{t('fcBmrTdee')}</p>
                    <p className="text-4xl font-extrabold text-sage-700">{bmrRes.tdee}</p>
                    <p className="text-xs text-gray-500 mt-1">kcal/day</p>
                    <p className="text-[10px] text-gray-400 mt-2">{t('fcBmrTdeeDesc')}</p>
                  </div>
                </div>
                {saved ? <SavedBanner /> : <LaunchButton />}
              </div>
            )}
          </div>
        )}

        {/* ═══════ CALORIE / TDEE TAB ═══════ */}
        {tab === 'calorie' && (
          <div className="space-y-5 animate-fade-in">
            <div className="card">
              <button onClick={calcBmr} className="btn-primary w-full text-center">{t('calculate')} {t('fcTabCal')}</button>
            </div>
            {calRes && (
              <div className="space-y-5 animate-fade-in">
                {/* Hero target */}
                <div className="card bg-gradient-to-br from-primary-50 to-sage-50 border-primary-200/80 py-8 text-center">
                  <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">{t('fcCalDaily')}</p>
                  <p className="text-5xl font-extrabold text-gray-900">{calRes.maintain}</p>
                  <p className="text-sm text-gray-500 mt-2">kcal/day to maintain · <span className="text-blue-600 font-semibold">{calRes.lose}</span> to lose · <span className="text-amber-600 font-semibold">{calRes.gain}</span> to gain</p>
                </div>
                {/* Goal cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 text-center">
                    <p className="text-xs font-bold text-blue-600 mb-1">{t('fcCalLose')}</p>
                    <p className="text-2xl font-extrabold text-blue-700">{calRes.lose}</p>
                    <p className="text-[10px] text-blue-500">kcal/day</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center">
                    <p className="text-xs font-bold text-emerald-600 mb-1">{t('fcCalMaintain')}</p>
                    <p className="text-2xl font-extrabold text-emerald-700">{calRes.maintain}</p>
                    <p className="text-[10px] text-emerald-500">kcal/day</p>
                  </div>
                  <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center">
                    <p className="text-xs font-bold text-amber-600 mb-1">{t('fcCalGain')}</p>
                    <p className="text-2xl font-extrabold text-amber-700">{calRes.gain}</p>
                    <p className="text-[10px] text-amber-500">kcal/day</p>
                  </div>
                </div>
                {/* Macros */}
                <div className="card">
                  <h4 className="font-bold text-gray-900 mb-3">{t('fcCalMacros')}</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="stat-card text-center"><p className="text-xl font-extrabold text-primary-600">{calRes.protein}g</p><p className="text-[10px] text-gray-500">{t('protein')}</p></div>
                    <div className="stat-card text-center"><p className="text-xl font-extrabold text-sage-600">{calRes.carbs}g</p><p className="text-[10px] text-gray-500">{t('carbs')}</p></div>
                    <div className="stat-card text-center"><p className="text-xl font-extrabold text-amber-600">{calRes.fat}g</p><p className="text-[10px] text-gray-500">{t('fat')}</p></div>
                  </div>
                </div>
                {saved ? <SavedBanner /> : <LaunchButton />}
              </div>
            )}
          </div>
        )}

        {/* ═══════ IDEAL WEIGHT TAB ═══════ */}
        {tab === 'ideal' && (
          <div className="space-y-5 animate-fade-in">
            <div className="card">
              <button onClick={calcIdeal} className="btn-primary w-full text-center">{t('calculate')} {t('fcTabIdeal')}</button>
            </div>
            {idealRes && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-3 gap-3">
                  <div className="stat-card text-center py-6"><p className="text-2xl font-extrabold text-blue-600">{idealRes.min}</p><p className="text-[10px] text-gray-500 mt-1">{t('fcIdealMin')}</p><p className="text-[9px] text-gray-400">kg</p></div>
                  <div className="stat-card text-center py-6 bg-emerald-50 border-emerald-200"><p className="text-2xl font-extrabold text-emerald-600">{idealRes.mid}</p><p className="text-[10px] text-gray-500 mt-1">{t('fcIdealMid')}</p><p className="text-[9px] text-gray-400">kg</p></div>
                  <div className="stat-card text-center py-6"><p className="text-2xl font-extrabold text-amber-600">{idealRes.max}</p><p className="text-[10px] text-gray-500 mt-1">{t('fcIdealMax')}</p><p className="text-[9px] text-gray-400">kg</p></div>
                </div>
                {/* Status */}
                {form.weightKg < idealRes.min && (
                  <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4">
                    <p className="text-sm font-bold text-blue-700">{t('fcIdealBelow')}</p>
                    <p className="text-xs text-blue-600 mt-1">{Math.round((idealRes.mid - form.weightKg) * 10) / 10} kg {t('fcIdealBelowDesc')}</p>
                  </div>
                )}
                {form.weightKg > idealRes.max && (
                  <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
                    <p className="text-sm font-bold text-amber-700">{t('fcIdealAbove')}</p>
                    <p className="text-xs text-amber-600 mt-1">{Math.round((form.weightKg - idealRes.mid) * 10) / 10} kg {t('fcIdealAboveDesc')}</p>
                  </div>
                )}
                {form.weightKg >= idealRes.min && form.weightKg <= idealRes.max && (
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
                    <p className="text-sm font-bold text-emerald-700">{t('fcIdealPerfect')}</p>
                    <p className="text-xs text-emerald-600 mt-1">{t('fcIdealPerfectDesc')}</p>
                  </div>
                )}
                {saved ? <SavedBanner /> : <LaunchButton />}
              </div>
            )}
          </div>
        )}

        {/* ═══════ VIEW CLINICAL DETAILS (Progressive Disclosure) ═══════ */}
        <div className="space-y-3">
          <div className="card !p-0 overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all list-none">
                <span className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="text-lg">📐</span> {t('fcViewFormula')}</span>
                <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-5 border-t border-gray-100 pt-4 space-y-3">
                <div className="bg-gray-50 rounded-xl p-4"><p className="text-sm font-mono text-gray-700 text-center">BMI = weight (kg) ÷ height² (m²)</p></div>
                <div className="bg-gray-50 rounded-xl p-4"><p className="text-sm font-mono text-gray-700 text-center">BMR = 10w + 6.25h − 5a + 5 (♂) / − 161 (♀)</p></div>
                <div className="bg-gray-50 rounded-xl p-4"><p className="text-sm font-mono text-gray-700 text-center">TDEE = BMR × Activity Factor</p></div>
                <p className="text-xs text-gray-500">{t('fcFormulaNote')}</p>
              </div>
            </details>
          </div>
          <div className="card !p-0 overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all list-none">
                <span className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="text-lg">📊</span> {t('fcViewBmiTable')}</span>
                <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-5 border-t border-gray-100 pt-4 space-y-2">
                {BMI_CATS.map(c => (
                  <div key={c.key} className={`flex items-center justify-between p-3 rounded-xl ${c.bg} border ${c.border}`}>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.gauge }} /><span className={`text-sm font-semibold ${c.color}`}>{t(c.key as any)}</span></div>
                    <span className="text-xs font-mono text-gray-600">{c.min === 0 ? '< 18.5' : c.max === 100 ? '≥ 30' : `${c.min} – ${c.max - 0.1}`}</span>
                  </div>
                ))}
              </div>
            </details>
          </div>
          <div className="card !p-0 overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all list-none">
                <span className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="text-lg">⚠️</span> {t('fcViewRisks')}</span>
                <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-5 border-t border-gray-100 pt-4 space-y-3">
                {[
                  { cat: t('fcBmiUnder'), risks: ['Nutrient deficiencies', 'Weakened immune system', 'Bone density loss', 'Fertility issues'], color: 'text-blue-600' },
                  { cat: t('fcBmiOver'), risks: ['Type 2 diabetes risk ↑', 'Heart disease risk ↑', 'Sleep apnea', 'Joint stress'], color: 'text-amber-600' },
                  { cat: t('fcBmiObese'), risks: ['Cardiovascular disease', 'Type 2 diabetes', 'Certain cancers risk ↑', 'Metabolic syndrome'], color: 'text-red-600' },
                ].map(r => (
                  <div key={r.cat} className="bg-gray-50 rounded-xl p-4">
                    <p className={`text-sm font-bold ${r.color} mb-2`}>{r.cat}</p>
                    <ul className="space-y-1">{r.risks.map((risk, i) => <li key={i} className="text-xs text-gray-600 flex items-center gap-1.5"><span className="w-1 h-1 bg-gray-400 rounded-full" />{risk}</li>)}</ul>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-rose-600 to-orange-500 text-white p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5 justify-between">
              <div>
                <p className="text-orange-100 text-xs font-semibold uppercase tracking-wider mb-1">💪</p>
                <h3 className="text-xl md:text-2xl font-extrabold leading-tight">{t('workoutPlan')}</h3>
                <p className="text-orange-100 text-sm mt-1 max-w-md">{t('workoutPlanBuilder')}</p>
              </div>
              <Link to="/workout-plan" className="inline-flex items-center gap-2 bg-white text-rose-600 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm whitespace-nowrap">
                🏋️ {t('workoutPlan')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </div>
          </div>

          <MedicalDisclaimer />
      </div>
    </div>
  );
};

export default FitnessPage;
