import React from 'react';
import { CheckCircle2, Flame, Target } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const FloatingStats: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="floating-stats" aria-hidden="true">
      <div
        className="stat-floating absolute right-6 top-6 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/60 p-4 shadow-[0_15px_40px_rgba(15,76,58,0.08)] backdrop-blur-xl"
        style={{ animationDelay: '0s' }}
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700">
          <CheckCircle2 size={17} />
        </span>
        <div>
          <b>22.5</b>
          <small>{t('homeHeroBmiCard')} · {t('homeHeroHealthy')}</small>
        </div>
      </div>

      <div
        className="stat-floating absolute left-6 top-[40%] flex items-center gap-3 rounded-2xl border border-white/80 bg-white/60 p-4 shadow-[0_15px_40px_rgba(15,76,58,0.08)] backdrop-blur-xl"
        style={{ animationDelay: '1.2s' }}
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/25 text-emerald-800">
          <Target size={17} />
        </span>
        <div>
          <b>2,087</b>
          <small>{t('homeHeroDailyTarget')}</small>
        </div>
      </div>

      <div
        className="stat-floating absolute bottom-6 right-6 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/60 p-4 shadow-[0_15px_40px_rgba(15,76,58,0.08)] backdrop-blur-xl"
        style={{ animationDelay: '2.1s' }}
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/25 text-emerald-800">
          <Flame size={17} />
        </span>
        <div>
          <b>{t('homeHeroStreakDays')}</b>
          <small>{t('homeHeroStreak')}</small>
        </div>
      </div>
    </div>
  );
};

export default FloatingStats;