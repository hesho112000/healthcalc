import React from 'react';
import { CheckCircle2, Flame, Target } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const FloatingStats: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="floating-stats" aria-hidden="true">
      <div className="fs-card fs-card1 animate-float-card" style={{ animationDelay: '0s' }}>
        <span className="fs-card-icon">
          <CheckCircle2 size={17} />
        </span>
        <div>
          <b>22.5</b>
          <small>{t('homeHeroBmiCard')} · {t('homeHeroHealthy')}</small>
        </div>
      </div>

      <div className="fs-card fs-card2 animate-float-card" style={{ animationDelay: '1.2s' }}>
        <span className="fs-card-icon gold">
          <Target size={17} />
        </span>
        <div>
          <b>2,087</b>
          <small>{t('homeHeroDailyTarget')} · {t('homeHeroKcalDay')}</small>
        </div>
      </div>

      <div className="fs-card fs-card3 animate-float-card" style={{ animationDelay: '2.1s' }}>
        <span className="fs-card-icon gold">
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