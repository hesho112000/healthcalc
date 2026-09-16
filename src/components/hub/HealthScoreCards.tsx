import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  calculateOverallScore,
  getOrganDetail,
  organScore,
  organStatus,
} from '../../utils/healthScoring';
import { coveredOrgans, tk, tt } from './data';
import type { HubOrgan } from './data';
import ScoreTransparencyModal from './ScoreTransparencyModal';

interface HealthScoreCardsProps {
  conditions: string[];
}

const wizardStep3 = (organ: HubOrgan): string => {
  let conds = organ.conditions;
  if (conds.includes('heart-lipids')) conds = ['heart-lipids'];
  const qs = conds.length > 0 ? `?conditions=${conds.join(',')}&step=3` : '?step=3';
  return `/advanced-care/wizard${qs}`;
};

const HealthScoreCards: React.FC<HealthScoreCardsProps> = ({ conditions }) => {
  const { t } = useLanguage();
  const [openModal, setOpenModal] = useState<HubOrgan | null>(null);

  const covered = useMemo(() => coveredOrgans(conditions), [conditions]);

  const rows = useMemo(
    () =>
      covered.map((organ) => {
        const score = organScore(organ.id);
        return { organ, score, detail: score === null ? null : getOrganDetail(organ.id) };
      }),
    [covered],
  );

  const presentCount = rows.filter((row) => row.score !== null).length;
  const overallScore = calculateOverallScore(
    rows.map((row) => row.score).filter((value): value is number => value !== null),
  );
  const openRow =
    openModal === null ? null : rows.find((row) => row.organ.id === openModal.id) ?? null;

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
            <p className="mt-2 text-xs text-[#FDFBF7]/70">{t('score.completeData')}</p>
          ) : (
            <>
              <p className="mt-1 text-xs font-bold text-[#FDFBF7]/90">{statusLabel(overallScore)}</p>
              <p className="mt-1 text-[11px] text-[#FDFBF7]/70">
                {presentCount < covered.length
                  ? tt(t, 'score.basedOnXofY', {
                      x: String(presentCount),
                      y: String(covered.length),
                    })
                  : t('score.basedOnData')}
              </p>
              <div className="mt-4 h-2.5 rounded-full bg-[#FDFBF7]/15 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#D4AF37] transition-all duration-500"
                  style={{ width: `${overallScore}%` }}
                />
              </div>
            </>
          )}
        </div>
        {rows.map(({ organ, score, detail }) => {
          const color = score === null ? '#D4AF37' : barColor(score);
          return (
            <div key={organ.id} className="rounded-3xl bg-white border border-[#EFEBE4] p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#0F4C3A]">{t(organ.nameKey)}</span>
                <span className="text-xl">{organ.icon}</span>
              </div>
              <div className="mt-3 text-4xl font-extrabold text-[#0F4C3A] tabular-nums">
                {score === null ? '—' : score}
              </div>
              {score === null ? (
                <div className="mt-1.5 flex flex-col gap-3">
                  <p className="text-xs text-[#6B7A75]">{t('score.noData')}</p>
                  <Link
                    to={wizardStep3(organ)}
                    className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-extrabold text-[#0F4C3A] transition hover:bg-[#c9a52e]"
                  >
                    {t('score.addData')}
                    <ArrowRight size={13} strokeWidth={2.5} className="rtl:rotate-180" />
                  </Link>
                </div>
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
                    onClick={() => setOpenModal(organ)}
                    className="mt-auto pt-4 text-start text-xs font-bold text-[#0F4C3A] underline decoration-[#D4AF37] underline-offset-4"
                  >
                    {t('universe.score.calcLink')}
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
      {openRow && openRow.detail && openRow.score !== null && (
        <ScoreTransparencyModal
          organ={openRow.organ}
          score={openRow.score}
          factors={openRow.detail.factors}
          onClose={() => setOpenModal(null)}
        />
      )}
    </section>
  );
};

export default HealthScoreCards;