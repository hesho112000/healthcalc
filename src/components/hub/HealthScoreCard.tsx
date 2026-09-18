import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  calculateOverallScore,
  getOrganDetail,
  organScore,
  organStatus,
} from '../../utils/healthScoring';
import { coveredOrgans, tk } from './data';

interface HealthScoreCardProps {
  conditions: string[];
}

const wizardStep3 = (conditions: string[]): string => {
  const conds = conditions.length > 0 ? `?conditions=${conditions.join(',')}&step=3` : '?step=3';
  return `/advanced-care/wizard${conds}`;
};

const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ conditions }) => {
  const { t } = useLanguage();

  const rows = useMemo(
    () =>
      coveredOrgans(conditions)
        .map((organ) => {
          const score = organScore(organ.id);
          return { organ, score, detail: score === null ? null : getOrganDetail(organ.id) };
        })
        .slice(0, 4),
    [conditions],
  );

  const overallScore = useMemo(
    () =>
      calculateOverallScore(
        rows.map((r) => r.score).filter((v): v is number => v !== null),
      ),
    [rows],
  );

  const presentCount = rows.filter((r) => r.score !== null).length;

  const statusLabel = (score: number): string => {
    const status = organStatus(score);
    return status === 'healthy'
      ? t('universe.score.healthy')
      : status === 'warning'
        ? t('universe.score.warning')
        : t('universe.score.critical');
  };

  const statusColor = (score: number): string => {
    const status = organStatus(score);
    if (status === 'healthy') return '#0F4C3A';
    if (status === 'warning') return '#8A6D1C';
    return '#B91C1C';
  };

  const barColor = (score: number): string => {
    if (score < 50) return '#B91C1C';
    if (score <= 75) return '#D4AF37';
    return '#0F4C3A';
  };

  return (
    <section className="rounded-3xl bg-white border border-[#EFEBE4] p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
      <h3 className="flex items-center gap-2 font-extrabold text-sm text-[#0F4C3A] mb-4">
        <Activity size={16} />
        {t('hub.healthScore')}
      </h3>

      <div className="rounded-2xl bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] border-2 border-[#D4AF37] p-5 text-[#FDFBF7]">
        <div className="flex items-center justify-between text-xs text-[#FDFBF7]/80">
          <span className="font-bold">{t('hub.scores.overall')}</span>
          <Sparkles size={15} className="text-[#D4AF37]" />
        </div>
        <div className="mt-2 text-4xl font-extrabold text-[#D4AF37] tabular-nums">
          {overallScore === null ? '—' : overallScore}
        </div>
        {overallScore === null ? (
          <p className="mt-1 text-xs text-[#FDFBF7]/70">{t('score.completeData')}</p>
        ) : (
          <>
            <p className="mt-1 text-xs font-bold text-[#FDFBF7]/90">{statusLabel(overallScore)}</p>
            <div className="mt-3 h-2.5 rounded-full bg-[#FDFBF7]/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#D4AF37] transition-all duration-500"
                style={{ width: `${overallScore}%` }}
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {rows.length === 0 && (
          <p className="text-xs text-[#6B7A75]">{t('score.noData')}</p>
        )}
        {rows.map(({ organ, score }) => {
          const color = score === null ? '#D4AF37' : barColor(score);
          return (
            <div key={organ.id}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0F4C3A]">
                  <span className="me-1">{organ.icon}</span>
                  {t(organ.nameKey)}
                </span>
                <span
                  className="font-extrabold tabular-nums"
                  style={{ color: score === null ? '#6B7A75' : statusColor(score) }}
                >
                  {score === null ? '—' : score}
                </span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-[#F4F1EB] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${score ?? 0}%`, background: color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Link
        to={presentCount < rows.length ? wizardStep3(conditions) : '/advanced-care'}
        className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-[#EFEBE4] bg-[#F4F1EB]/40 px-4 py-2.5 text-xs font-bold text-[#0F4C3A] hover:bg-[#F4F1EB] transition"
      >
        {presentCount < rows.length ? t('score.addData') : t('universe.score.calcLink')}
        <ArrowRight size={13} strokeWidth={2.5} className="rtl:rotate-180" />
      </Link>
    </section>
  );
};

export default HealthScoreCard;