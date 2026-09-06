import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import { ANIME_IMAGES } from '../utils/animeImages';

type Tab = 'bmi' | 'bmr' | 'calorie' | 'ideal';

interface FormData { age: number; gender: 'male' | 'female'; heightCm: number; weightKg: number; activityLevel: string }
interface BmiResult { bmi: number; category: string; color: string; bg: string; border: string; gauge: string; risk: string }

const ACT: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
const ACT_LABELS: Record<string, string> = { sedentary: 'fcSedentary', light: 'fcLight', moderate: 'fcModerate', active: 'fcActive', very_active: 'fcVeryActive' };
const BMI_CATS = [
  { min: 0, max: 18.5, cat: 'Underweight', key: 'fcBmiUnder', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', gauge: '#3b82f6', risk: 'Moderate' },
  { min: 18.5, max: 25, cat: 'Normal', key: 'fcBmiNormal', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', gauge: '#10b981', risk: 'Low' },
  { min: 25, max: 30, cat: 'Overweight', key: 'fcBmiOver', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', gauge: '#f59e0b', risk: 'Increased' },
  { min: 30, max: 100, cat: 'Obese', key: 'fcBmiObese', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', gauge: '#ef4444', risk: 'High' },
];
const STATUS_KEY: Record<string, string> = { Underweight: 'fcBmiUnder', Healthy: 'fcPillHealthy', Overweight: 'fcBmiOver', Obese: 'fcBmiObese' };

function bmiCat(bmi: number) { return BMI_CATS.find(c => bmi >= c.min && bmi < c.max) || BMI_CATS[3]; }
function idealRange(hCm: number) { const h = hCm / 100; return { min: Math.round(18.5 * h * h * 10) / 10, max: Math.round(24.9 * h * h * 10) / 10 }; }

const GAUGE = { cx: 120, cy: 115, r: 92 };
function pt(deg: number) { const a = (deg * Math.PI) / 180; return { x: GAUGE.cx + GAUGE.r * Math.cos(a), y: GAUGE.cy - GAUGE.r * Math.sin(a) }; }
function arc(d1: number, d2: number) {
  const p1 = pt(Math.max(d1, d2));
  const p2 = pt(Math.min(d1, d2));
  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${GAUGE.r} ${GAUGE.r} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
}
function bmiAngle(bmi: number) { return 180 - ((Math.min(Math.max(bmi, 10), 45) - 10) / 35) * 180; }

const glass: React.CSSProperties = { background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' };
const segBtn = (active: boolean): React.CSSProperties => ({ flex: 1, height: 32, borderRadius: 8, fontSize: 12, fontWeight: 600, transition: 'all .2s', background: active ? '#10b981' : 'transparent', color: active ? '#fff' : '#64748b' });
const flexRow: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 12 };

interface FitnessPageProps {
  initialTab?: Tab;
}

const FitnessPage: React.FC<FitnessPageProps> = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({ age: 30, gender: 'male', heightCm: 170, weightKg: 70, activityLevel: 'moderate' });
  const [bmiRes, setBmiRes] = useState<BmiResult | null>(null);
  const [live, setLive] = useState({ bmi: '--', bmiStatus: 'Healthy', bmiColor: '#10b981', cal: '--', rmr: '--', ideal: '--' });
  const [liveActive, setLiveActive] = useState(false);

  const updateLive = useCallback((f: FormData) => {
    const h = f.heightCm / 100;
    if (!h || !f.weightKg || !f.age) return;
    const bmi = f.weightKg / (h * h);
    const rmr = f.gender === 'male'
      ? 10 * f.weightKg + 6.25 * f.heightCm - 5 * f.age + 5
      : 10 * f.weightKg + 6.25 * f.heightCm - 5 * f.age - 161;
    const r = idealRange(f.heightCm);
    let status = 'Healthy'; let color = '#10b981';
    if (bmi < 18.5) { status = 'Underweight'; color = '#3b82f6'; }
    else if (bmi < 25) { status = 'Healthy'; color = '#10b981'; }
    else if (bmi < 30) { status = 'Overweight'; color = '#f59e0b'; }
    else { status = 'Obese'; color = '#ef4444'; }
    setLiveActive(true);
    setLive({
      bmi: bmi.toFixed(1),
      bmiStatus: status,
      bmiColor: color,
      cal: Math.round(rmr * 1.55).toLocaleString(),
      rmr: Math.round(rmr).toLocaleString(),
      ideal: `${r.min}–${r.max}`,
    });
  }, []);

  const handleChange = useCallback((patch: Partial<FormData>) => {
    setForm(p => ({ ...p, ...patch }));
    updateLive({ ...form, ...patch });
  }, [form, updateLive]);

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

  const handleBridge = useCallback(() => {
    saveProfile();
    const num = (s: string) => parseInt(s.replace(/,/g, ''), 10);
    localStorage.setItem('hc_calculator_bridge', JSON.stringify({
      age: form.age,
      gender: form.gender,
      height: form.heightCm,
      weight: form.weightKg,
      activityLevel: form.activityLevel,
      goal: 'lose_weight',
      bmi: bmiRes?.bmi,
      bmr: liveActive ? num(live.rmr) : undefined,
      tdee: liveActive ? num(live.cal) : undefined,
      savedAt: new Date().toISOString(),
    }));
    navigate('/weight-loss');
  }, [form, bmiRes, live, liveActive, saveProfile, navigate]);

  const scrollProfile = useCallback(() => {
    document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  const scrollDetails = useCallback(() => {
    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const CalcDisclaimer: React.FC = () => (
    <div className="mixed-text" style={{ marginTop: 20, padding: 14, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, fontSize: 11, color: '#92400e', lineHeight: 1.5 }}>
      <strong>{t('medicalDisclaimer')}: </strong>{t('disclaimer')}
    </div>
  );

  const bmiPercent = liveActive && live.bmi !== '--' ? Math.min(100, Math.max(0, ((parseFloat(live.bmi) - 10) / 35) * 100)) : 62;
  const statusPill: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, padding: '2px 6px', borderRadius: 999,
    color: liveActive ? live.bmiColor : '#059669',
    background: liveActive ? `${live.bmiColor}15` : '#ecfdf5',
  };

  const details = [
    { icon: '📐', title: t('fcViewFormula'), body: t('fcAccFormulaBody') },
    { icon: '📊', title: t('fcAccMethod'), body: t('fcAccSourcesBody') },
    { icon: '⚠️', title: t('fcAccLimits'), body: t('fcAccLimitsBody') },
  ];

  return (
    <div className="tool-page min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <div className="page-hero page-hero-light">
        <div className="page-hero-mesh" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            {/* Left copy */}
            <div className="page-hero-copy">
              <h1 className="text-4xl md:text-[48px] font-extrabold tracking-tight leading-tight">{t('fcTitle')}</h1>
              <p className="mt-4 text-lg text-gray-500 leading-relaxed mixed-text">{t('fcSubtitle')}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '12px 0' }}>
                <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, padding: '6px 14px', fontSize: 12, color: '#475569', fontWeight: 600 }}>✓ {t('fcEvidence')}</span>
                <span className="mixed-text" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, padding: '6px 14px', fontSize: 12, color: '#475569', fontWeight: 600 }}>{t('fcBasedOn')}</span>
                <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, padding: '6px 14px', fontSize: 12, color: '#475569', fontWeight: 600 }}>{t('fcInfoOnly')}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
                <button onClick={scrollProfile} style={{ height: 46, padding: '0 28px', borderRadius: 999, background: 'linear-gradient(90deg,#10b981,#14b8a6)', color: '#fff', fontWeight: 600, fontSize: 14, boxShadow: '0 8px 20px rgba(16,185,129,0.25)', cursor: 'pointer' }}>{t('fcHeroCta')}</button>
                <button onClick={scrollDetails} style={{ height: 46, padding: '0 28px', borderRadius: 999, background: '#fff', border: '1px solid #99f6e4', color: '#047857', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>{t('fcHeroLearn')}</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 32, fontSize: 12, color: '#94a3b8' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#e2e8f0', border: '2px solid #fff' }} />
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#d1fae5', border: '2px solid #fff', marginInlineStart: -8 }} />
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#cffafe', border: '2px solid #fff', marginInlineStart: -8 }} />
                </div>
                <span className="mixed-text">{t('fcHeroTrust')}</span>
              </div>
            </div>

            {/* Right: anime + holographic live cards */}
            <div className="relative mx-auto w-full max-w-[420px]">
              <img className="page-anime" src={ANIME_IMAGES.calculator} alt="" aria-hidden="true"
                style={{ maxWidth: 420, margin: '0 auto', display: 'block' }} />

              {/* Floating cards — desktop (absolute) */}
              <div className="hidden md:block">
                {/* BMI */}
                <div className="holo-card" style={{ position: 'absolute', top: '5%', right: '-6%', width: 148, padding: '12px 14px', border: '1px solid rgba(16,185,129,0.7)', borderRadius: 16, boxShadow: '0 8px 24px rgba(16,185,129,0.18)', ...glass, animation: 'float 3s ease-in-out infinite' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#059669' }}>BMI</span>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>◐</span>
                  </div>
                  <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a' }}>{liveActive ? live.bmi : '--'}</span>
                    <span style={statusPill}>{liveActive ? t(STATUS_KEY[live.bmiStatus] as any) : t('fcPillHealthy')}</span>
                  </div>
                  <div style={{ marginTop: 8, height: 6, width: '100%', background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${bmiPercent}%`, background: 'linear-gradient(90deg,#34d399,#2dd4bf)', borderRadius: 999 }} />
                  </div>
                </div>

                {/* Daily Calories */}
                <div className="holo-card" style={{ position: 'absolute', top: '30%', right: '-12%', width: 150, padding: '12px 14px', border: '1px solid rgba(59,130,246,0.7)', borderRadius: 16, boxShadow: '0 8px 24px rgba(59,130,246,0.18)', ...glass, animation: 'float 3s ease-in-out 0.4s infinite' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12 }}>🔥</span>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2563eb' }}>{t('fcCalories')}</span>
                  </div>
                  <div style={{ marginTop: 4, fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a' }}>
                    {liveActive ? `${live.cal} ` : '-- '}<span style={{ fontSize: 11, fontWeight: 500, color: '#64748b' }}>kcal</span>
                  </div>
                  <div className="mixed-text" style={{ marginTop: 4, fontSize: 10, color: '#64748b' }}>{t('fcMaintenance')} • {t(ACT_LABELS[form.activityLevel] as any)}</div>
                </div>

                {/* RMR */}
                <div className="holo-card" style={{ position: 'absolute', top: '54%', right: '2%', width: 148, padding: '12px 14px', border: '1px solid rgba(139,92,246,0.7)', borderRadius: 16, boxShadow: '0 8px 24px rgba(139,92,246,0.16)', ...glass, animation: 'float 3s ease-in-out 0.8s infinite' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7c3aed' }}>RMR</div>
                  <div style={{ marginTop: 4, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
                    {liveActive ? `${live.rmr} ` : '-- '}<span style={{ fontSize: 11, fontWeight: 500, color: '#64748b' }}>kcal/day</span>
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                    <div style={{ height: 4, flex: 1, background: '#ddd6fe', borderRadius: 999 }} />
                    <div style={{ height: 4, flex: 1, background: '#ddd6fe', borderRadius: 999 }} />
                    <div style={{ height: 4, flex: 1, background: '#f1f5f9', borderRadius: 999 }} />
                  </div>
                </div>

                {/* Ideal Weight */}
                <div className="holo-card" style={{ position: 'absolute', top: '77%', right: '8%', width: 152, padding: '12px 14px', border: '1px solid rgba(245,158,11,0.7)', borderRadius: 16, boxShadow: '0 8px 24px rgba(245,158,11,0.16)', ...glass, animation: 'float 3s ease-in-out 1.2s infinite' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d97706' }}>{t('fcTabIdeal')}</div>
                  <div style={{ marginTop: 4, fontSize: 16, fontWeight: 800, color: '#0f172a' }}>
                    {liveActive ? `${live.ideal} ` : '-- '}<span style={{ fontSize: 11, fontWeight: 500, color: '#64748b' }}>kg</span>
                  </div>
                  <div className="mixed-text" style={{ marginTop: 4, fontSize: 10, color: '#64748b' }}>{t('fcCardIdealSub')}</div>
                </div>
              </div>

              {/* Mobile: static 2x2 grid below anime */}
              <div className="mt-6 grid grid-cols-2 gap-3 md:hidden">
                <div className="holo-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(16,185,129,0.7)', borderRadius: 16, padding: '12px 14px', boxShadow: '0 8px 24px rgba(16,185,129,0.15)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#059669' }}>BMI</div>
                  <div style={{ marginTop: 4, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{liveActive ? live.bmi : '--'}</div>
                  <div style={statusPill}>{liveActive ? t(STATUS_KEY[live.bmiStatus] as any) : t('fcPillHealthy')}</div>
                </div>
                <div className="holo-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(59,130,246,0.7)', borderRadius: 16, padding: '12px 14px', boxShadow: '0 8px 24px rgba(59,130,246,0.15)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#2563eb' }}>{t('fcCalories')} 🔥</div>
                  <div style={{ marginTop: 4, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{liveActive ? `${live.cal} kcal` : '-- kcal'}</div>
                </div>
                <div className="holo-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(139,92,246,0.7)', borderRadius: 16, padding: '12px 14px', boxShadow: '0 8px 24px rgba(139,92,246,0.15)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#7c3aed' }}>RMR</div>
                  <div style={{ marginTop: 4, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{liveActive ? `${live.rmr} kcal/day` : '-- kcal/day'}</div>
                </div>
                <div className="holo-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(245,158,11,0.7)', borderRadius: 16, padding: '12px 14px', boxShadow: '0 8px 24px rgba(245,158,11,0.15)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#d97706' }}>{t('fcTabIdeal')}</div>
                  <div style={{ marginTop: 4, fontSize: 16, fontWeight: 800, color: '#0f172a' }}>{liveActive ? `${live.ideal} kg` : '-- kg'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Profile */}
        <section id="profile">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 className="text-[22px] lg:text-[26px] font-bold tracking-tight text-gray-900">{t('fcProfile')}</h2>
            <span className="hidden lg:inline" style={{ fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' }}>{t('fcProfileNote')}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {/* Card 1: Age & Gender */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: 20, padding: 20 }}>
              <div style={flexRow}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👤</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{t('fcCardAge')}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{t('fcCardAgeSub')}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 11, fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('age')}</label>
                  <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0 12px', height: 44 }}>
                    <input type="number" min={2} max={120} value={form.age} onChange={e => handleChange({ age: +e.target.value })} style={{ width: '100%', background: 'transparent', outline: 'none', fontSize: 15, fontWeight: 600, color: '#0f172a' }} />
                    <span className="mixed-text" style={{ fontSize: 12, color: '#94a3b8', marginInlineStart: 8 }}>{t('fcYears')}</span>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 11, fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('gender')}</label>
                  <div style={{ marginTop: 6, display: 'flex', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 4 }}>
                    <button type="button" onClick={() => handleChange({ gender: 'male' })} style={segBtn(form.gender === 'male')}>{t('male')}</button>
                    <button type="button" onClick={() => handleChange({ gender: 'female' })} style={segBtn(form.gender === 'female')}>{t('female')}</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Height & Weight */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: 20, padding: 20 }}>
              <div style={flexRow}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📐</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{t('fcCardHw')}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{t('fcCardHwSub')}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 11, fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('height')}</label>
                  <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0 12px', height: 44 }}>
                    <input type="number" min={100} max={250} step={0.5} value={form.heightCm} onChange={e => handleChange({ heightCm: +e.target.value })} style={{ width: '100%', background: 'transparent', outline: 'none', fontSize: 15, fontWeight: 600, color: '#0f172a' }} />
                    <span style={{ fontSize: 12, color: '#94a3b8', marginInlineStart: 8 }}>cm</span>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 11, fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('weightLabel')}</label>
                  <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0 12px', height: 44 }}>
                    <input type="number" min={20} max={300} step={0.5} value={form.weightKg} onChange={e => handleChange({ weightKg: +e.target.value })} style={{ width: '100%', background: 'transparent', outline: 'none', fontSize: 15, fontWeight: 600, color: '#0f172a' }} />
                    <span style={{ fontSize: 12, color: '#94a3b8', marginInlineStart: 8 }}>kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Activity Level */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: 20, padding: 20 }}>
              <div style={flexRow}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{t('activityLevel')}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{t('fcCardActSub')}</div>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('fcDailyActivity')}</label>
                <div style={{ marginTop: 6, position: 'relative' }}>
                  <select value={form.activityLevel} onChange={e => handleChange({ activityLevel: e.target.value })} style={{ width: '100%', appearance: 'none', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0 12px', height: 44, fontSize: 13, fontWeight: 500, outline: 'none', color: '#0f172a', cursor: 'pointer' }}>
                    {Object.keys(ACT).map(k => (
                      <option key={k} value={k}>{t(ACT_LABELS[k] as any)}</option>
                    ))}
                  </select>
                  <span style={{ position: 'absolute', insetInlineEnd: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none', fontSize: 12 }}>▼</span>
                </div>
                <div className="mixed-text" style={{ marginTop: 8, fontSize: 11, color: '#64748b' }}>{t('fcActHint')}</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
            <button onClick={calcBmi} style={{ width: '100%', maxWidth: 600, height: 52, borderRadius: 999, background: 'linear-gradient(90deg,#10b981,#14b8a6)', color: '#fff', fontWeight: 600, fontSize: 15, boxShadow: '0 12px 24px rgba(16,185,129,0.28)', cursor: 'pointer', transition: 'all .2s' }}>{t('fcCalcBmi')}</button>
          </div>
        </section>

        {/* Result */}
        {bmiRes && (
          <section id="result" className="animate-fade-in">
            <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(15,23,42,0.04)', padding: '24px 32px' }}>
              <div className="flex flex-col lg:flex-row items-center" style={{ gap: 32 }}>
                {/* Gauge */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ position: 'relative', width: 240, height: 150 }}>
                    <svg width={240} height={140} viewBox="0 0 240 130" style={{ overflow: 'visible' }}>
                      <path d={arc(180, 0)} fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
                      <path d={arc(bmiAngle(18.5), bmiAngle(bmiRes.bmi))} fill="none" stroke={bmiRes.gauge} strokeWidth="12" strokeLinecap="round" />
                      <circle cx={pt(bmiAngle(bmiRes.bmi)).x} cy={pt(bmiAngle(bmiRes.bmi)).y} r="7" fill="#fff" stroke={bmiRes.gauge} strokeWidth="3" />
                      <circle cx={pt(bmiAngle(bmiRes.bmi)).x} cy={pt(bmiAngle(bmiRes.bmi)).y} r="3" fill={bmiRes.gauge} />
                    </svg>
                    <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', lineHeight: 1 }}>{bmiRes.bmi}</div>
                      <div style={{ marginTop: 4, fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: `${bmiRes.gauge}15`, color: bmiRes.gauge }}>{t(bmiRes.category as any)}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 16, fontSize: 11, color: '#64748b', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#60a5fa' }} /> {t('fcScaleUnder')}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} /> {t('fcScaleHealthy')}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fbbf24' }} /> {t('fcScaleOver')}</span>
                  </div>
                </div>

                {/* Breakdown */}
                <div style={{ flex: 1, width: '100%' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16 }}>
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', fontWeight: 500 }}>{t('fcBmiRangeLabel')}</div>
                      <div style={{ marginTop: 4, fontSize: 14, fontWeight: 600, color: '#0f172a' }}>18.5 – 24.9 kg/m²</div>
                      <div style={{ marginTop: 4, fontSize: 11, color: '#64748b' }}>{t('fcBmiRangeRef')}</div>
                    </div>
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', fontWeight: 500 }}>{t('fcIdealFor')}</div>
                      <div style={{ marginTop: 4, fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{idealRange(form.heightCm).min} – {idealRange(form.heightCm).max} kg</div>
                      <div className="mixed-text" style={{ marginTop: 4, fontSize: 11, color: '#64748b' }}>{t('fcIdealAt').replace('{height}', String(form.heightCm))}</div>
                    </div>
                    <div style={{ background: '#ecfdf5', border: '1px solid #d1fae5', borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#047857', fontWeight: 500 }}>{t('fcPonderal')}</div>
                      <div className="mixed-text" style={{ marginTop: 4, fontSize: 13, fontWeight: 500, color: '#065f46', lineHeight: 1.45 }}>{bmiRes.bmi < 18.5 ? t('fcInsightUnder') : bmiRes.bmi < 25 ? t('fcInsightOk') : t('fcInsightAbove')}</div>
                    </div>
                  </div>
                  <button onClick={handleBridge} className="mixed-text" style={{ marginTop: 24, width: '100%', height: 48, borderRadius: 12, background: '#059669', color: '#fff', fontWeight: 600, fontSize: 14, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'background .2s' }}>{t('fcCtaLaunch')} →</button>
                  <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 999, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 11, color: '#475569' }}>{t('fcChipFormula')}</span>
                    <span style={{ padding: '4px 10px', borderRadius: 999, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 11, color: '#475569' }}>{t('fcChipRmr')}</span>
                    <span style={{ padding: '4px 10px', borderRadius: 999, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 11, color: '#475569' }}>{t('fcChipTdee')}</span>
                  </div>
                  <CalcDisclaimer />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════ Clinical Details (Progressive Disclosure) ═══════ */}
        <div id="details" className="space-y-3">
          {details.map((d, i) => (
            <div key={i} className="card !p-0 overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all list-none">
                  <span className="text-sm font-bold text-gray-900 flex items-center gap-2"><span className="text-lg">{d.icon}</span> {d.title}</span>
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-6 pb-5 border-t border-gray-100 pt-4">
                  <p className="text-xs leading-relaxed text-slate-600">{d.body}</p>
                </div>
              </details>
            </div>
          ))}
        </div>

        <MedicalDisclaimer />
      </div>
    </div>
  );
};

export default FitnessPage;