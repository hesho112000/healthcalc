import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  calculateOverallScore,
  getOrganDetail,
  organScore,
  organStatus,
} from '../../utils/healthScoring';
import { coveredOrgans } from './data';

interface HealthScoreCardsProps {
  conditions: string[];
}

const HealthScoreCards: React.FC<HealthScoreCardsProps> = ({ conditions }) => {
  const { t } = useLanguage();
  const [openScore, setOpenScore] = useState<string | null>(null);

  const covered = useMemo(() => coveredOrgans(conditions), [conditions]);

  const overallScore = useMemo(() => {
    const scores = covered
      .map((o) => organScore(o.id))
      .filter((v): v is number => typeof v === 'number');
    return calculateOverallScore(scores);
  }, [covered]);

  const barColor = (score: number): string => {
    if (score < 50) return '#B91C1C';
    if (score <= 75) return '#D4AF37';
    return '#0F4C3A';
  };

  const statusColor = (score: number): string => {
    const status = organStatus(score);
    if (status === 'healthy') return '#0F4C3A';
    if (status === 'warning') return '#8A6D1C';
    return '#B91C1C';
  };

  const statusLabel = (score: number): string => {
    const status = organStatus(score);
    return status === 'healthy'
      ? t('universe.score.healthy')
      : status === 'warning'
        ? t('universe.score.warning')
        : t('universe.score.critical');
  };

  return (
    <section>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="flex items-center gap-2 font-extrabold text-lg text-[#0F4C3A]">
          <Activity size={19} />
          {t('hub.healthScore')}
        </h2>
        <Link
          to="/advanced-care"
          className="text-xs font-bold text-[#0F4C3A] underline decoration-[#D4AF37] underline-offset-4"
        >
          {t('universe.score.calcLink')}
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] border-2 border-[#D4AF37] p-6 text-[#FDFBF7]">
          <div className="flex items-center justify-between text-sm text-[#FDFBF7]/80">
            <span className="font-bold">{t('hub.scores.overall')}</span>
            <Sparkles size={16} className="text-[#D4AF37]" />
          </div>
          <div className="mt-3 text-5xl font-extrabold text-[#D4AF37] tabular-nums">
            {overallScore === null ? '—' : overallScore}
          </div>
          {overallScore === null ? (
            <p className="mt-2 text-xs text-[#FDFBF7]/70">{t('universe.score.enterLabs')}</p>
          ) : (
            <>
              <p className="mt-1 text-xs font-bold text-[#FDFBF7]/90">{statusLabel(overallScore)}</p>
              <div className="mt-4 h-2.5 rounded-full bg-[#FDFBF7]/15 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#D4AF37] transition-all duration-500"
                  style={{ width: `${overallScore}%` }}
                />
              </div>
            </>
          )}
        </div>
        {covered.map((organ) => {
          const score = organScore(organ.id);
          const color = score === null ? '#D4AF37' : barColor(score);
          const detail = score === null ? null : getOrganDetail(organ.id);
          const expanded = openScore === organ.id;
          return (
            <div key={organ.id} className="rounded-3xl bg-white border border-[#EFEBE4] p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#0F4C3A]">{t(organ.nameKey)}</span>
                <span className="text-xl">{organ.icon}</span>
              </div>
              <div className="mt-3 text-4xl font-extrabold text-[#0F4C3A] tabular-nums">
                {score === null ? '—' : score}
              </div>
              {score === null ? (
                <p className="mt-1.5 text-xs text-[#6B7A75]">{t('universe.score.enterLabs')}</p>
              ) : (
                <>
                  <p className="mt-1 text-xs font-bold" style={{ color: statusColor(score) }}>
                    {statusLabel(score)}
                  </p>
                  <div className="mt-4 h-2.5 rounded-full bg-[#F4F1EB] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${score}%`, background: color }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenScore(expanded ? null : organ.id)}
                    className="mt-4 flex items-center gap-1 text-xs font-bold text-[#0F4C3A] underline decoration-[#D4AF37] underline-offset-4"
                  >
                    {t('universe.score.calcLink')}
                    <ChevronDown size={13} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
                  </button>
                  {expanded && detail && (
                    <div className="mt-3 space-y-1.5 rounded-xl bg-[#F4F1EB]/50 p-3">
                      {detail.factors.map((f, fi) => (
                        <div key={fi} className="flex items-center justify-between text-xs">
                          <span className="text-[#6B7A75]">{t(f.labelKey)}</span>
                          <b className="text-[#0F4C3A]">
                            {f.value}
                            {f.unit ? ` ${f.unit}` : f.unitKey ? ` ${t(f.unitKey)}` : ''}
                          </b>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HealthScoreCards;