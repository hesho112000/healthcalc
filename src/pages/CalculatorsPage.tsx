import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import MedicalDisclaimer from '../components/MedicalDisclaimer';

interface CalcData { age: number; gender: 'male' | 'female'; heightCm: number; weightKg: number; activityLevel: string }
interface BmiResult { bmi: number; category: string; color: string; bgColor: string; borderColor: string }
interface CalorieResult { bmr: number; tdee: number; targetLose: number; targetMaintain: number; targetGain: number; proteinG: number; carbsG: number; fatG: number }
interface IdealWeightResult { min: number; max: number; midpoint: number }
interface AccordionState { bmi: boolean; bmr: boolean; calorie: boolean; ideal: boolean }

const actMult: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
const actLabels: Record<string, string> = { sedentary: 'calcSedentary', light: 'calcLight', moderate: 'calcModerate', active: 'calcActive', very_active: 'calcVeryActive' };
const bmiCats = [
  { min: 0, max: 18.5, label: 'calcBmiUnder', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', gauge: '#3b82f6' },
  { min: 18.5, max: 25, label: 'calcBmiNormal', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', gauge: '#10b981' },
  { min: 25, max: 30, label: 'calcBmiOver', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', gauge: '#f59e0b' },
  { min: 30, max: 100, label: 'calcBmiObese', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', gauge: '#ef4444' },
];

function getBmiCat(bmi: number) { return bmiCats.find(c => bmi >= c.min && bmi < c.max) || bmiCats[3]; }

const loadJSON = <T,>(key: string, fallback: T): T => { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; } };

type TranslateFn = (key: any) => string;

interface CalcControlProps { data: CalcData; updateData: (patch: Partial<CalcData>) => void; t: TranslateFn }

interface AccordionHeaderProps { k: keyof AccordionState; icon: string; title: string; subtitle: string; open: AccordionState; toggle: (k: keyof AccordionState) => void; t: TranslateFn }

const ActToggle: React.FC<CalcControlProps> = ({ data, updateData, t }) => (
  <div>
    <label className="label">{t('activityLevel')}</label>
    <div className="flex flex-wrap gap-1.5">
      {Object.keys(actMult).map(k => (
        <button key={k} type="button" onClick={() => updateData({ activityLevel: k })}
          className={`px-3 py-2 rounded-xl text-[11px] font-semibold transition-all ${data.activityLevel === k ? 'bg-primary-600 text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
          {t(actLabels[k] as any)}
        </button>
      ))}
    </div>
  </div>
);

const GenderToggle: React.FC<CalcControlProps> = ({ data, updateData, t }) => (
  <div>
    <label className="label">{t('gender')}</label>
    <div className="toggle-group">
      <button type="button" onClick={() => updateData({ gender: 'male' })} className={data.gender === 'male' ? 'toggle-btn-active' : 'toggle-btn-inactive'}>♂ {t('male')}</button>
      <button type="button" onClick={() => updateData({ gender: 'female' })} className={data.gender === 'female' ? 'toggle-btn-active' : 'toggle-btn-inactive'}>♀ {t('female')}</button>
    </div>
  </div>
);

const SharedInputs: React.FC<CalcControlProps> = ({ data, updateData, t }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="label">{t('age')}</label>
      <input type="number" min={2} max={120} value={data.age} onChange={e => updateData({ age: +e.target.value })} className="input-field-lg" />
    </div>
    <div>
      <label className="label">{t('height')} (cm)</label>
      <input type="number" min={100} max={250} step={0.5} value={data.heightCm} onChange={e => updateData({ heightCm: +e.target.value })} className="input-field-lg" />
    </div>
    <div>
      <label className="label">{t('weightLabel')} (kg)</label>
      <input type="number" min={20} max={300} step={0.5} value={data.weightKg} onChange={e => updateData({ weightKg: +e.target.value })} className="input-field-lg" />
    </div>
  </div>
);

const AccordionHeader: React.FC<AccordionHeaderProps> = ({ k, icon, title, subtitle, open, toggle }) => (
  <button onClick={() => toggle(k)} className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-gray-50/50 transition-all rounded-2xl">
    <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-sage-50 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
      <span className="text-xl">{icon}</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-bold text-gray-900">{title}</p>
      <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
    </div>
    <svg className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${open[k] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
  </button>
);

const CalculatorsPage: React.FC = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState<AccordionState>({ bmi: true, bmr: false, calorie: false, ideal: false });
  const [data, setData] = useState<CalcData>(() => loadJSON<CalcData>('hc_calc_profile', { age: 30, gender: 'male', heightCm: 170, weightKg: 70, activityLevel: 'moderate' }));
  const [bmiResult, setBmiResult] = useState<BmiResult | null>(null);
  const [calResult, setCalResult] = useState<CalorieResult | null>(null);
  const [idealResult, setIdealResult] = useState<IdealWeightResult | null>(null);
  const [saved, setSaved] = useState(false);

  const toggle = useCallback((k: keyof AccordionState) => setOpen(p => ({ ...p, [k]: !p[k] })), []);

  const updateData = useCallback((patch: Partial<CalcData>) => {
    setData(prev => { const next = { ...prev, ...patch }; localStorage.setItem('hc_calc_profile', JSON.stringify(next)); return next; });
    setSaved(false);
  }, []);

  const calcBmi = useCallback(() => {
    const h = data.heightCm / 100;
    const bmi = Math.round((data.weightKg / (h * h)) * 10) / 10;
    const cat = getBmiCat(bmi);
    setBmiResult({ bmi, category: cat.label, color: cat.color, bgColor: cat.bg, borderColor: cat.border });
    setSaved(false);
  }, [data]);

  const calcBmr = useCallback(() => {
    const bmr = data.gender === 'male' ? 10 * data.weightKg + 6.25 * data.heightCm - 5 * data.age + 5 : 10 * data.weightKg + 6.25 * data.heightCm - 5 * data.age - 161;
    setCalResult(null);
    setBmiResult(null);
    setIdealResult(null);
    setCalResult({
      bmr: Math.round(bmr),
      tdee: Math.round(bmr * (actMult[data.activityLevel] || 1.55)),
      targetLose: Math.round(bmr * (actMult[data.activityLevel] || 1.55) - 500),
      targetMaintain: Math.round(bmr * (actMult[data.activityLevel] || 1.55)),
      targetGain: Math.round(bmr * (actMult[data.activityLevel] || 1.55) + 300),
      proteinG: Math.round(data.weightKg * 1.6),
      carbsG: Math.round((bmr * (actMult[data.activityLevel] || 1.55) * 0.45) / 4),
      fatG: Math.round((bmr * (actMult[data.activityLevel] || 1.55) * 0.25) / 9),
    });
    setSaved(false);
  }, [data]);

  const calcIdeal = useCallback(() => {
    const h = data.heightCm / 100;
    const min = Math.round(18.5 * h * h * 10) / 10;
    const max = Math.round(24.9 * h * h * 10) / 10;
    setIdealResult({ min, max, midpoint: Math.round((min + max) / 2 * 10) / 10 });
    setSaved(false);
  }, [data]);

  const saveAndBridge = useCallback(() => {
    const payload = { ...data, bmi: bmiResult?.bmi, bmr: calResult?.bmr, tdee: calResult?.tdee, savedAt: new Date().toISOString() };
    localStorage.setItem('hc_calc_profile', JSON.stringify(data));
    localStorage.setItem('hc_calculator_bridge', JSON.stringify(payload));
    setSaved(true);
  }, [data, bmiResult, calResult]);

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
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3 tracking-tight">{t('calcTitle')}</h1>
            <p className="text-primary-100 text-sm md:text-base leading-relaxed">{t('calcSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Calculators — left */}
          <div className="lg:col-span-3 space-y-4">
            {/* Shared Profile Inputs */}
            <div className="card">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-lg">👤</span> {t('calcSharedProfile')}
              </h3>
              <SharedInputs data={data} updateData={updateData} t={t} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <GenderToggle data={data} updateData={updateData} t={t} />
                <ActToggle data={data} updateData={updateData} t={t} />
              </div>
              <p className="text-[10px] text-gray-400 mt-3">{t('calcSharedHint')}</p>
            </div>

            {/* BMI Accordion */}
            <div className="card !p-0 overflow-hidden">
              <AccordionHeader k="bmi" icon="⚖️" title={t('calcBmiTitle')} subtitle={t('calcBmiSubtitle')} open={open} toggle={toggle} t={t} />
              {open.bmi && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-5 animate-fade-in">
                  <button onClick={calcBmi} className="btn-primary w-full text-center mb-4">{t('calculate')} {t('calcBmiTitle')}</button>
                  {bmiResult && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex flex-col items-center py-6">
                        <div className="relative w-48 h-24 mb-3">
                          <svg viewBox="0 0 200 100" className="w-full h-full">
                            <path d="M 10 95 A 90 90 0 0 1 55 15" fill="none" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" opacity="0.25" />
                            <path d="M 55 15 A 90 90 0 0 1 145 15" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" opacity="0.25" />
                            <path d="M 145 15 A 90 90 0 0 1 180 55" fill="none" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" opacity="0.25" />
                            <path d="M 180 55 A 90 90 0 0 1 190 95" fill="none" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" opacity="0.25" />
                            <g transform={`rotate(${Math.min(Math.max(bmiResult.bmi, 10), 45) <= 10 ? -90 : ((Math.min(Math.max(bmiResult.bmi, 10), 45) - 10) / 35) * 180 - 90}, 100, 95)`}>
                              <line x1="100" y1="95" x2="100" y2="25" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
                              <circle cx="100" cy="95" r="4" fill="#1f2937" />
                            </g>
                          </svg>
                        </div>
                        <div className={`inline-flex items-baseline gap-2 px-5 py-2.5 rounded-2xl ${bmiResult.bgColor} ${bmiResult.borderColor} border`}>
                          <span className={`text-3xl font-extrabold ${bmiResult.color}`}>{bmiResult.bmi}</span>
                          <span className="text-xs font-semibold text-gray-500">kg/m²</span>
                        </div>
                        <p className={`mt-2 text-sm font-bold ${bmiResult.color}`}>{t(bmiResult.category as any)}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="stat-card text-center"><p className="text-lg font-extrabold text-gray-900">{bmiResult.bmi}</p><p className="text-[10px] text-gray-500">{t('calcBmiValue')}</p></div>
                        <div className="stat-card text-center"><p className="text-lg font-extrabold text-emerald-600">18.5 – 24.9</p><p className="text-[10px] text-gray-500">{t('calcBmiHealthy')}</p></div>
                      </div>
                      {/* Bridge Banner */}
                      <button onClick={saveAndBridge} className={`w-full rounded-2xl border p-4 text-left transition-all hover:shadow-card-hover hover:-translate-y-0.5 ${bmiResult.bgColor} ${bmiResult.borderColor}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm"><span className="text-lg">🏥</span></div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold ${bmiResult.color}`}>{saved ? t('calcSaved') : t('calcBridgeTitle')}</p>
                            <p className="text-xs text-gray-500">{saved ? t('calcSavedDesc') : t('calcBridgeDesc')}</p>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* BMR Accordion */}
            <div className="card !p-0 overflow-hidden">
              <AccordionHeader k="bmr" icon="🔥" title={t('calcBmrTitle')} subtitle={t('calcBmrSubtitle')} open={open} toggle={toggle} t={t} />
              {open.bmr && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-5 animate-fade-in">
                  <button onClick={calcBmr} className="btn-primary w-full text-center mb-4">{t('calculate')} {t('calcBmrTitle')}</button>
                  {calResult && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="stat-card text-center"><p className="text-2xl font-extrabold text-primary-600">{calResult.bmr}</p><p className="text-[10px] text-gray-500">{t('calcBmrLabel')}</p><p className="text-[9px] text-gray-400 mt-0.5">kcal/day</p></div>
                        <div className="stat-card text-center"><p className="text-2xl font-extrabold text-sage-600">{calResult.tdee}</p><p className="text-[10px] text-gray-500">{t('calcTdee')}</p><p className="text-[9px] text-gray-400 mt-0.5">kcal/day</p></div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-2xl bg-blue-50 border border-blue-200 p-3 text-center"><p className="text-lg font-extrabold text-blue-600">{calResult.targetLose}</p><p className="text-[10px] text-blue-500">{t('calcGoalLose')}</p></div>
                        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-center"><p className="text-lg font-extrabold text-emerald-600">{calResult.targetMaintain}</p><p className="text-[10px] text-emerald-500">{t('calcGoalMaintain')}</p></div>
                        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3 text-center"><p className="text-lg font-extrabold text-amber-600">{calResult.targetGain}</p><p className="text-[10px] text-amber-500">{t('calcGoalGain')}</p></div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="stat-card text-center"><p className="text-base font-extrabold text-primary-600">{calResult.proteinG}g</p><p className="text-[10px] text-gray-500">{t('protein')}</p></div>
                        <div className="stat-card text-center"><p className="text-base font-extrabold text-sage-600">{calResult.carbsG}g</p><p className="text-[10px] text-gray-500">{t('carbs')}</p></div>
                        <div className="stat-card text-center"><p className="text-base font-extrabold text-amber-600">{calResult.fatG}g</p><p className="text-[10px] text-gray-500">{t('fat')}</p></div>
                      </div>
                      {/* Bridge Banner */}
                      <button onClick={saveAndBridge} className="w-full rounded-2xl border p-4 text-left transition-all hover:shadow-card-hover hover:-translate-y-0.5 bg-primary-50 border-primary-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm"><span className="text-lg">📅</span></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-primary-700">{saved ? t('calcSaved') : t('calcBridgeCalTitle')}</p>
                            <p className="text-xs text-gray-500">{saved ? t('calcSavedDesc') : t('calcBridgeCalDesc')}</p>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Calorie / TDEE Accordion */}
            <div className="card !p-0 overflow-hidden">
              <AccordionHeader k="calorie" icon="🍽️" title={t('calcCalTitle')} subtitle={t('calcCalSubtitle')} open={open} toggle={toggle} t={t} />
              {open.calorie && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-5 animate-fade-in">
                  <button onClick={calcBmr} className="btn-primary w-full text-center mb-4">{t('calculate')} {t('calcCalTitle')}</button>
                  {calResult && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-sage-50 border border-primary-200 p-5 text-center">
                        <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">{t('calcDailyTarget')}</p>
                        <p className="text-4xl font-extrabold text-gray-900">{calResult.targetMaintain}</p>
                        <p className="text-xs text-gray-500 mt-1">kcal/day to maintain · {calResult.targetLose} to lose · {calResult.targetGain} to gain</p>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="stat-card text-center"><p className="text-base font-extrabold text-primary-600">{calResult.proteinG}g</p><p className="text-[10px] text-gray-500">{t('protein')}</p></div>
                        <div className="stat-card text-center"><p className="text-base font-extrabold text-sage-600">{calResult.carbsG}g</p><p className="text-[10px] text-gray-500">{t('carbs')}</p></div>
                        <div className="stat-card text-center"><p className="text-base font-extrabold text-amber-600">{calResult.fatG}g</p><p className="text-[10px] text-gray-500">{t('fat')}</p></div>
                      </div>
                      {/* Bridge Banner */}
                      <button onClick={saveAndBridge} className="w-full rounded-2xl border p-4 text-left transition-all hover:shadow-card-hover hover:-translate-y-0.5 bg-sage-50 border-sage-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm"><span className="text-lg">🏥</span></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-sage-700">{saved ? t('calcSaved') : t('calcBridgeAdvanced')}</p>
                            <p className="text-xs text-gray-500">{saved ? t('calcSavedDesc') : t('calcBridgeAdvancedDesc')}</p>
                          </div>
                          <Link to="/premium" onClick={saveAndBridge} className="shrink-0"><svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></Link>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Ideal Weight Accordion */}
            <div className="card !p-0 overflow-hidden">
              <AccordionHeader k="ideal" icon="🎯" title={t('calcIdealTitle')} subtitle={t('calcIdealSubtitle')} open={open} toggle={toggle} t={t} />
              {open.ideal && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-5 animate-fade-in">
                  <button onClick={calcIdeal} className="btn-primary w-full text-center mb-4">{t('calculate')} {t('calcIdealTitle')}</button>
                  {idealResult && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="stat-card text-center"><p className="text-lg font-extrabold text-blue-600">{idealResult.min}</p><p className="text-[10px] text-gray-500">{t('calcIdealMin')}</p><p className="text-[9px] text-gray-400">kg</p></div>
                        <div className="stat-card text-center bg-emerald-50 border-emerald-200"><p className="text-lg font-extrabold text-emerald-600">{idealResult.midpoint}</p><p className="text-[10px] text-gray-500">{t('calcIdealMid')}</p><p className="text-[9px] text-gray-400">kg</p></div>
                        <div className="stat-card text-center"><p className="text-lg font-extrabold text-amber-600">{idealResult.max}</p><p className="text-[10px] text-gray-500">{t('calcIdealMax')}</p><p className="text-[9px] text-gray-400">kg</p></div>
                      </div>
                      {data.weightKg < idealResult.min && (
                        <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4">
                          <p className="text-sm font-bold text-blue-700 mb-1">{t('calcIdealBelow')}</p>
                          <p className="text-xs text-blue-600">{Math.round((idealResult.midpoint - data.weightKg) * 10) / 10} kg {t('calcIdealBelowDesc')}</p>
                        </div>
                      )}
                      {data.weightKg > idealResult.max && (
                        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
                          <p className="text-sm font-bold text-amber-700 mb-1">{t('calcIdealAbove')}</p>
                          <p className="text-xs text-amber-600">{Math.round((data.weightKg - idealResult.midpoint) * 10) / 10} kg {t('calcIdealAboveDesc')}</p>
                        </div>
                      )}
                      {data.weightKg >= idealResult.min && data.weightKg <= idealResult.max && (
                        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
                          <p className="text-sm font-bold text-emerald-700">{t('calcIdealPerfect')}</p>
                          <p className="text-xs text-emerald-600">{t('calcIdealPerfectDesc')}</p>
                        </div>
                      )}
                      {/* Bridge Banner */}
                      <button onClick={saveAndBridge} className="w-full rounded-2xl border p-4 text-left transition-all hover:shadow-card-hover hover:-translate-y-0.5 bg-primary-50 border-primary-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm"><span className="text-lg">📅</span></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-primary-700">{saved ? t('calcSaved') : t('calcBridgeWeight')}</p>
                            <p className="text-xs text-gray-500">{saved ? t('calcSavedDesc') : t('calcBridgeWeightDesc')}</p>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-2 space-y-5">
            {/* How It Works */}
            <div className="card">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><span className="text-lg">🧩</span> {t('calcHowTitle')}</h3>
              <ul className="space-y-3">
                {[
                  { icon: '1️⃣', text: t('calcHow1') },
                  { icon: '2️⃣', text: t('calcHow2') },
                  { icon: '3️⃣', text: t('calcHow3') },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="text-base shrink-0">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Summary */}
            {(bmiResult || calResult || idealResult) && (
              <div className="card bg-gradient-to-br from-sage-50 to-primary-50 border-sage-200/80">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-lg">📊</span> {t('calcSummary')}</h3>
                <div className="space-y-2">
                  {bmiResult && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-200/60">
                      <span className="text-sm text-gray-600">BMI</span>
                      <span className={`text-sm font-bold ${bmiResult.color}`}>{bmiResult.bmi} kg/m²</span>
                    </div>
                  )}
                  {calResult && (
                    <>
                      <div className="flex items-center justify-between py-2 border-b border-gray-200/60">
                        <span className="text-sm text-gray-600">BMR</span>
                        <span className="text-sm font-bold text-primary-600">{calResult.bmr} kcal</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-200/60">
                        <span className="text-sm text-gray-600">TDEE</span>
                        <span className="text-sm font-bold text-sage-600">{calResult.tdee} kcal</span>
                      </div>
                    </>
                  )}
                  {idealResult && (
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">{t('calcIdealTitle')}</span>
                      <span className="text-sm font-bold text-amber-600">{idealResult.min}–{idealResult.max} kg</span>
                    </div>
                  )}
                </div>
                <Link to="/premium" onClick={saveAndBridge} className="btn-primary w-full text-center mt-4">
                  {t('calcGoAdvanced')}
                </Link>
              </div>
            )}

            {!bmiResult && !calResult && !idealResult && (
              <div className="card flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-sage-50 rounded-3xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{t('calcEmptyTitle')}</h3>
                <p className="text-xs text-gray-500">{t('calcEmptyDesc')}</p>
              </div>
            )}

            {/* Educational Accordions */}
            <div className="card !p-0 overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all list-none">
                  <span className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="text-lg">📐</span> {t('calcEduFormula')}</span>
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-6 pb-5 border-t border-gray-100 pt-4 space-y-3">
                  <div className="bg-gray-50 rounded-xl p-4"><p className="text-sm font-mono text-gray-700 text-center">BMI = weight (kg) ÷ height² (m²)</p></div>
                  <div className="bg-gray-50 rounded-xl p-4"><p className="text-sm font-mono text-gray-700 text-center">BMR = 10w + 6.25h − 5a + 5 (♂) / − 161 (♀)</p></div>
                  <p className="text-xs text-gray-500">{t('calcEduFormulaNote')}</p>
                </div>
              </details>
            </div>

            <div className="card !p-0 overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all list-none">
                  <span className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="text-lg">📊</span> {t('calcEduBmiTable')}</span>
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-6 pb-5 border-t border-gray-100 pt-4 space-y-2">
                  {bmiCats.map(c => (
                    <div key={c.label} className={`flex items-center justify-between p-3 rounded-xl ${c.bg} border ${c.border}`}>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.gauge }} /><span className={`text-sm font-semibold ${c.color}`}>{t(c.label as any)}</span></div>
                      <span className="text-xs font-mono text-gray-600">{c.min === 0 ? '< 18.5' : c.max === 100 ? '≥ 30' : `${c.min} – ${c.max - 0.1}`}</span>
                    </div>
                  ))}
                </div>
              </details>
            </div>

            <MedicalDisclaimer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorsPage;
