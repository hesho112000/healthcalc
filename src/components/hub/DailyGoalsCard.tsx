import React, { useMemo } from 'react';
import { Flame, Target } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useHubDaily } from './hubDailyStore';
import { tt } from './data';

interface DailyGoalsCardProps {
  baseCalories?: number;
}

interface Goal {
  key: string;
  label: string;
  target: number;
  current: number;
  unit: string;
  color: string;
}

const ring = (current: number, target: number): number => {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
};

const Ring: React.FC<{ goal: Goal }> = ({ goal }) => {
  const pct = ring(goal.current, goal.target);
  const r = 26;
  const c = 2 * Math.PI * r;
  const statusColor = pct >= 100 ? '#0F4C3A' : pct >= 75 ? '#D4AF37' : '#B91C1C';
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative">
        <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" stroke="#F4F1EB" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke={statusColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct / 100)}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-extrabold text-[#0F4C3A]">
          {pct}%
        </div>
      </div>
      <div className="text-center">
        <div className="text-[11px] font-bold text-[#6B7A75]">{goal.label}</div>
        <div className="text-sm font-extrabold text-[#0F4C3A] tabular-nums">
          {Math.round(goal.current)}
          <span className="text-[11px] font-bold text-[#6B7A75]"> / {goal.target}{goal.unit}</span>
        </div>
      </div>
    </div>
  );
};

const DailyGoalsCard: React.FC<DailyGoalsCardProps> = ({ baseCalories }) => {
  const { t } = useLanguage();
  const { day } = useHubDaily();

  const totals = useMemo(() => {
    return day.meals.reduce(
      (acc, m) => ({
        calories: acc.calories + m.calories,
        protein: acc.protein + m.protein,
        carbs: acc.carbs + m.carbs,
        fat: acc.fat + m.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );
  }, [day.meals]);

  const goals: Goal[] = useMemo(
    () => [
      { key: 'calories', label: t('hub.goals.calories'), target: baseCalories ?? 2100, current: totals.calories, unit: '', color: '#0F4C3A' },
      { key: 'protein', label: t('hub.goals.protein'), target: 145, current: totals.protein, unit: 'g', color: '#D4AF37' },
      { key: 'carbs', label: t('hub.goals.carbs'), target: 260, current: totals.carbs, unit: 'g', color: '#0F4C3A' },
      { key: 'fat', label: t('hub.goals.fat'), target: 70, current: totals.fat, unit: 'g', color: '#D4AF37' },
    ],
    [baseCalories, totals, t],
  );

  const remaining = Math.max(0, (baseCalories ?? 2100) - totals.calories);

  return (
    <section className="rounded-3xl bg-white border border-[#EFEBE4] p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
      <h3 className="flex items-center gap-2 font-extrabold text-sm text-[#0F4C3A] mb-4">
        <Target size={16} />
        {t('hub.goals.title')}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {goals.map((g) => (
          <Ring key={g.key} goal={g} />
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-[#F4F1EB]/60 px-4 py-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7A75]">
          <Flame size={14} className="text-[#D4AF37]" />
          {tt(t, 'hub.goals.remaining', { n: String(remaining) })}
        </span>
        <span className="text-xs font-bold text-[#0F4C3A] tabular-nums">
          {Math.round(totals.calories)} kcal
        </span>
      </div>
    </section>
  );
};

export default DailyGoalsCard;