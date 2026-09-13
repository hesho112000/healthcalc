import React, { useMemo, useState } from 'react';
import { Award, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { hasPlanData, tk } from './data';
import LockedCard from './LockedCard';

interface AchievementsProps {
  paid: boolean;
  onUnlock: () => void;
  onNote: (message: string) => void;
}

const toDayKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const readDays = (): string[] => {
  try {
    const raw = localStorage.getItem('hc_hub_days');
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
};

const computeStreak = (days: string[]): number => {
  const set = new Set(days);
  let streak = 0;
  let cursor = new Date();
  if (!set.has(toDayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (set.has(toDayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

const Achievements: React.FC<AchievementsProps> = ({ paid, onUnlock, onNote }) => {
  const { t } = useLanguage();
  const [days, setDays] = useState<string[]>(readDays);
  const streak = useMemo(() => computeStreak(days), [days]);

  if (!paid) {
    return <LockedCard title={t(tk('hub.streaks'))} onUnlock={onUnlock} />;
  }

  const markDone = () => {
    const today = toDayKey(new Date());
    const next = days.includes(today) ? days : [...days, today];
    setDays(next);
    try {
      localStorage.setItem('hc_hub_days', JSON.stringify(next));
    } catch {
      /* ignore */
    }
    onNote(t(tk('hub.streaks.done')));
  };

  const badge = (
    labelKey: string,
    active: boolean,
    emoji: string,
  ) => (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${
        active
          ? 'border-[#D4AF37]/60 bg-[#D4AF37]/10 text-[#0F4C3A]'
          : 'border-[#EFEBE4] bg-[#F4F1EB]/50 text-[#6B7A75]'
      }`}
    >
      <span>{active ? '✔' : emoji}</span>
      {t(tk(labelKey))}
    </div>
  );

  return (
    <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <span className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
            <Award size={20} className="text-[#D4AF37]" />
          </span>
          <div>
            <span className="block text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">{t(tk('hub.streaks'))}</span>
            <p className="mt-1 text-xs text-[#6B7A75]">
              {t(tk('hub.streaks.day')).replace('{count}', String(streak))}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={markDone}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C3A] text-[#FDFBF7] font-bold px-5 py-2.5 text-sm transition hover:bg-[#0F4C3A]/90"
        >
          <Check size={15} />
          {t(tk('hub.streaks.markDone'))}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {badge('hub.streaks.planReady', hasPlanData(), '📋')}
        {badge('hub.streaks.eatGreen', streak >= 3, '🥗')}
        {badge('hub.streaks.dailyLog', streak >= 7, '🔥')}
      </div>
    </section>
  );
};

export default Achievements;