import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Lock, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { getProgress, saveProgress } from '../../services/supabaseData';
import type { SyncProgressRow } from '../../services/supabaseData';
import { MOODS } from './data';

interface ProgressTrackerProps {
  paid: boolean;
  onUnlock: () => void;
  initialWeight?: number;
}

interface ProgressDay {
  date: string;
  water: number;
  weight?: number;
  mood?: string;
}

const dateKey = (offset: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString('en-CA');
};

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ paid, onUnlock, initialWeight }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [syncStatus, setSyncStatus] = useState<'idle' | 'loading' | 'saving' | 'saved' | 'error'>('idle');
  const hydratedRef = useRef(false);

  const [progress, setProgress] = useState<Record<string, ProgressDay>>(() => {
    try {
      const raw = localStorage.getItem('hc_hub_progress');
      return raw ? (JSON.parse(raw) as Record<string, ProgressDay>) : {};
    } catch {
      return {};
    }
  });
  const [weightInput, setWeightInput] = useState('');
  const todayKey = useMemo(() => dateKey(0), []);

  useEffect(() => {
    localStorage.setItem('hc_hub_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setSyncStatus('loading');
      const { data, error } = await getProgress(user.id).catch(() => ({ data: null as SyncProgressRow[] | null, error: null }));
      if (cancelled) return;
      if (error) {
        setSyncStatus('error');
        return;
      }
      if (data && data.length) {
        setProgress((prev) => {
          const merged: Record<string, ProgressDay> = {};
          Object.values(prev).forEach((d) => {
            if (d.date) merged[d.date] = { ...d, date: d.date };
          });
          data.forEach((row) => {
            const key = row.date;
            const existing = merged[key];
            merged[key] = {
              date: key,
              water: row.water_liters !== null && row.water_liters !== undefined ? row.water_liters : existing?.water ?? 0,
              weight: row.weight_kg !== null && row.weight_kg !== undefined ? row.weight_kg : existing?.weight,
              mood: row.mood ?? existing?.mood,
            };
          });
          return merged;
        });
      }
      hydratedRef.current = true;
      setSyncStatus('idle');
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (!user || !hydratedRef.current) return;
    const day = progress[todayKey];
    if (!day || !day.date) return;
    setSyncStatus('saving');
    let cancelled = false;
    (async () => {
      const { error } = await saveProgress(user.id, {
        date: day.date,
        water_liters: day.water,
        weight_kg: day.weight,
        mood: day.mood,
      }).catch(() => ({ error: { message: 'Network error' } as { message: string } }));
      if (cancelled) return;
      setSyncStatus(error ? 'error' : 'saved');
    })();
    return () => {
      cancelled = true;
    };
  }, [user, progress, todayKey]);

  const setDay = (key: string, patch: Partial<ProgressDay>) =>
    setProgress((prev) => ({ ...prev, [key]: { ...(prev[key] ?? {}), date: key, ...patch } }));

  const addWater = (delta: number) =>
    setDay(todayKey, { water: Math.max(0, (progress[todayKey]?.water ?? 0) + delta) });

  const logWeight = () => {
    const kg = parseFloat(weightInput);
    if (Number.isFinite(kg) && kg > 0) {
      setDay(todayKey, { weight: Math.round(kg * 10) / 10 });
      setWeightInput('');
    }
  };

  const chart = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => progress[dateKey(i - 6)] ?? ({ date: dateKey(i - 6), water: 0 } as ProgressDay));
    const weightOnly = paid ? days.filter((d) => d.weight !== undefined).map((d) => d.weight as number) : [];
    return { days, weightOnly };
  }, [progress, paid]);

  const points = useMemo(() => {
    if (chart.weightOnly.length < 2) return '';
    const min = Math.min(...chart.weightOnly);
    const max = Math.max(...chart.weightOnly);
    const range = max - min || 1;
    const pad = 8;
    const y = (v: number) => 74 - ((v - min) / range) * (74 - pad * 2) - (pad - 8);
    return chart.weightOnly
      .map(
        (v, i) =>
          `${(i / (chart.weightOnly.length - 1)) * 120 + 8},${Math.max(6, Math.min(88, y(v))) + 6}`,
      )
      .join(' ');
  }, [chart.weightOnly]);

  return (
    <section className="rounded-3xl bg-white border border-[#EFEBE4] p-6 md:p-8">
      <h2 className="flex items-center gap-2 font-extrabold text-lg text-[#0F4C3A] mb-4">
        <TrendingUp size={19} />
        {t('hub.progressTracker')}
      </h2>
      {paid ? (
        <>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-[#6B7A75] uppercase tracking-wide mb-2">{t('hub.water')}</h3>
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" onClick={() => addWater(1)} className="h-9 w-9 rounded-full bg-[#0F4C3A] text-[#FDFBF7] font-extrabold hover:bg-[#1a6b53] transition">+</button>
                <button type="button" onClick={() => addWater(-1)} className="h-9 w-9 rounded-full border border-[#EFEBE4] bg-[#F4F1EB]/40 text-[#0F4C3A] font-extrabold hover:bg-[#F4F1EB] transition">−</button>
                <span className="text-sm font-semibold text-slate-900">{progress[todayKey]?.water ?? 0} 🥤</span>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#6B7A75] uppercase tracking-wide mb-2">{t('hub.weight')}</h3>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  inputMode="decimal"
                  placeholder={String(initialWeight ?? 0)}
                  className="w-32 rounded-xl border border-[#EFEBE4] bg-[#F4F1EB]/30 px-3 py-2 text-sm text-slate-900 outline-0 focus:border-[#D4AF37]"
                />
                <button type="button" onClick={logWeight} className="rounded-full bg-[#0F4C3A] text-[#FDFBF7] px-4 py-2.5 text-xs font-bold hover:bg-[#1a6b53] transition">{t('hub.logWeight')}</button>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#6B7A75] uppercase tracking-wide mb-2">{t('hub.mood')}</h3>
              <div className="flex flex-wrap gap-1.5">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDay(todayKey, { mood: m })}
                    className={`h-10 w-10 rounded-full border text-lg transition ${progress[todayKey]?.mood === m ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] bg-[#F4F1EB]/40 hover:bg-[#F4F1EB]'}`}
                  >
                    {m}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setDay(todayKey, { mood: undefined })}
                  className="h-10 rounded-full border border-[#EFEBE4] bg-[#F4F1EB]/40 px-3 text-xs font-bold text-[#6B7A75] hover:bg-[#F4F1EB] transition"
                >
                  {t('hub.logMood')}
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-[#EFEBE4] bg-[#FDFBF7] p-4">
            <div className="flex items-center justify-between text-xs text-[#6B7A75] font-semibold mb-2">
              <span>{t('hub.progress.week')}</span>
            </div>
            <svg viewBox="0 0 140 96" className="w-full h-24">
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1="0" y1={i * 24 + 8} x2="140" y2={i * 24 + 8} stroke="#EFEBE4" strokeWidth="1" />
              ))}
              {points && <polyline points={points} fill="none" stroke="#0F4C3A" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />}
              {points === '' && !chart.weightOnly.length && (
                <text x="70" y="48" textAnchor="middle" fontSize="9" fill="#6B7A75">{t('hub.progress.locked')}</text>
              )}
            </svg>
            <div className="flex justify-between">
              {chart.days.map((d) => (
                <span key={d.date} className={`h-2.5 w-2.5 rounded-full ${(d.water ?? 0) > 0 ? 'bg-[#0F4C3A]' : 'bg-[#D4AF37]/50'}`} />
              ))}
            </div>
          </div>
        </div>
        {syncStatus !== 'idle' && (
          <p className="mt-4 text-xs font-semibold text-[#6B7A75]">
            {syncStatus === 'loading'
              ? t('sync.loading')
              : syncStatus === 'saving'
                ? t('sync.saving')
                : syncStatus === 'error'
                  ? t('sync.error')
                  : t('sync.saved')}
          </p>
        )}
        </>
      ) : (
        <div className="relative rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 p-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={onUnlock}
              className="inline-flex items-center gap-2 rounded-full bg-[#FDFBF7] border border-[#D4AF37]/40 px-5 py-2.5 text-xs font-bold text-[#0F4C3A] shadow-sm hover:bg-[#F4F1EB] transition"
            >
              <Lock size={14} />
              {t('hub.unlockPremium')}
            </button>
          </div>
          <div className="blur-sm select-none">
            <div className="flex gap-3">
              <div className="flex h-9 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#6B7A75]">{t('hub.water')}</div>
              <div className="flex h-9 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#6B7A75]">{t('hub.weight')}</div>
              <div className="flex h-9 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#6B7A75]">{t('hub.mood')}</div>
            </div>
            <div className="mt-5 h-24 rounded-2xl bg-white opacity-60" />
            <div className="mt-5 flex justify-between">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full bg-white opacity-70" />
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-xs font-semibold text-[#0F4C3A]">{t('hub.lockedDesc')}</p>
        </div>
      )}
    </section>
  );
};

export default ProgressTracker;