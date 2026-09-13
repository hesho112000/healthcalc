import React, { useEffect, useMemo, useState } from 'react';
import { Check, Dumbbell, Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { dayExercises, exerciseEmoji, exerciseName, exercisePoolForConditions, tt } from './data';

interface ExerciseDayWizardProps {
  conditions: string[];
  paid: boolean;
  day: number;
  onDayChange: (day: number) => void;
  onUnlock: () => void;
  onAdjust: () => void;
}

const ExerciseDayWizard: React.FC<ExerciseDayWizardProps> = ({ conditions, paid, day, onDayChange, onUnlock, onAdjust }) => {
  const { t, language: lang } = useLanguage();

  const [exDone, setExDone] = useState<Record<number, string[]>>(() => {
    try {
      const raw = localStorage.getItem('hc_hub_ex_done');
      return raw ? (JSON.parse(raw) as Record<number, string[]>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('hc_hub_ex_done', JSON.stringify(exDone));
  }, [exDone]);

  const pool = useMemo(() => exercisePoolForConditions(conditions), [conditions]);
  const currentExercises = useMemo(() => dayExercises(pool, day), [pool, day]);
  const checked = exDone[day] ?? [];

  const handleDay = (d: number) => {
    if (!paid && d > 1) {
      onUnlock();
      return;
    }
    onDayChange(d);
  };

  const toggle = (id: string) => {
    setExDone((prev) => {
      const list = new Set(prev[day] ?? []);
      if (list.has(id)) list.delete(id);
      else list.add(id);
      return { ...prev, [day]: [...list] };
    });
  };

  const markAll = () => {
    setExDone((prev) => ({ ...prev, [day]: currentExercises.map((ex) => ex.id) }));
  };

  return (
    <section className="rounded-3xl bg-white border border-[#EFEBE4] p-6 md:p-8">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="flex items-center gap-2 font-extrabold text-lg text-[#0F4C3A]">
          <Dumbbell size={19} />
          {t('hub.exercisePlan')}
        </h2>
        {!paid && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#D4AF37]/15 text-[#0F4C3A] px-2.5 py-1 text-[10px] font-extrabold">
            <Lock size={11} />
            {t('hub.badge.premium')}
          </span>
        )}
      </div>
      <div className="flex gap-1.5 mb-4 overflow-x-auto">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((d) => {
          const active = d === day;
          const locked = !paid && d > 1;
          return (
            <button
              key={d}
              type="button"
              onClick={() => handleDay(d)}
              className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${active ? (paid ? 'bg-[#0F4C3A] text-[#FDFBF7]' : 'bg-[#D4AF37] text-[#0F4C3A]') : locked ? 'bg-[#F4F1EB]/50 text-[#6B7A75]' : 'bg-[#F4F1EB]/50 text-[#0F4C3A] hover:bg-[#F4F1EB]'}`}
            >
              {locked ? <Lock size={12} className="mx-auto" /> : tt(t, 'hub.day', { n: String(d) })}
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        {currentExercises.map((ex) => {
          const active = checked.includes(ex.id);
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => toggle(ex.id)}
              className={`w-full flex items-center justify-between gap-3 rounded-xl border p-3 transition ${active ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] bg-[#F4F1EB]/30'}`}
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className={`h-5 w-5 rounded-md border flex items-center justify-center text-xs font-bold shrink-0 ${active ? 'bg-[#0F4C3A] border-[#0F4C3A] text-[#FDFBF7]' : 'border-[#D4AF37] text-transparent'}`}>
                  ✓
                </span>
                <span className="text-base">{exerciseEmoji(ex.type)}</span>
                <span className={`min-w-0 ${active ? 'text-[#6B7A75] line-through' : ''}`}>
                  <b className="block truncate text-sm text-slate-900">{exerciseName(ex, lang)}</b>
                  <small className="text-[#6B7A75]">{ex.duration} · {ex.calories} kcal</small>
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={markAll}
          className="inline-flex items-center gap-2 rounded-full bg-[#0F4C3A] text-[#FDFBF7] px-5 py-2.5 text-xs font-bold hover:bg-[#1a6b53] transition"
        >
          <Check size={14} />
          {t('hub.markAllDone')}
        </button>
        <button
          type="button"
          onClick={() => (paid ? onAdjust() : onUnlock())}
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#0F4C3A] text-[#0F4C3A] px-5 py-2.5 text-xs font-bold hover:bg-[#0F4C3A]/5 transition"
        >
          {!paid && <Lock size={13} />}
          {t('hub.adjustExercises')}
        </button>
      </div>
      {!paid && (
        <p className="mt-3 text-xs text-[#6B7A75]">{t('hub.locked')}</p>
      )}
    </section>
  );
};

export default ExerciseDayWizard;