import React, { useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { coveredOrgans, readHubConditions, readHubPlan, tk } from './data';
import { organScore } from '../../utils/healthScoring';
import ScoreRing from './ScoreRing';
import LockedCard from './LockedCard';

interface ProjectionCardProps {
  paid: boolean;
  onUnlock: () => void;
}

const ProjectionCard: React.FC<ProjectionCardProps> = ({ paid, onUnlock }) => {
  const { t } = useLanguage();
  const plan = useMemo(() => readHubPlan(), []);
  const covered = coveredOrgans(readHubConditions());
  const organScores = covered
    .map((o) => organScore(o.id))
    .filter((s): s is number => s !== null);

  const overall =
    typeof plan?.overall === 'number'
      ? plan.overall
      : organScores.length > 0
        ? Math.round(organScores.reduce((a, b) => a + b, 0) / organScores.length)
        : null;
  const projected =
    typeof plan?.projected === 'number'
      ? plan.projected
      : overall === null
        ? null
        : Math.min(95, overall + 12);

  if (!paid) {
    return <LockedCard title={t(tk('hub.projection'))} subtitle={t(tk('hub.projection.sub'))} onUnlock={onUnlock} />;
  }

  return (
    <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8" aria-label={t(tk('hub.projection'))}>
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">{t(tk('hub.projection'))}</span>
          <p className="mt-1 text-sm text-[#6B7A75] max-w-md leading-relaxed">
            {overall !== null && projected !== null
              ? t(tk('hub.projection.body')).replace('{from}', String(overall)).replace('{to}', String(projected))
              : t(tk('hub.projection.sub'))}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <ScoreRing score={overall} size={104} stroke={9} />
            <span className="mt-1 text-[11px] font-bold text-[#6B7A75]">{t(tk('wizard.results.today'))}</span>
          </div>
          <span className="text-2xl font-extrabold text-[#D4AF37]">→</span>
          <div className="flex flex-col items-center">
            <ScoreRing score={projected} size={104} stroke={9} />
            <span className="mt-1 text-[11px] font-bold text-[#6B7A75]">{t(tk('wizard.results.month3'))}</span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-[#6B7A75] bg-[#F4F1EB]/70 rounded-xl px-3 py-2">{t(tk('hub.projection.sub'))}</p>
    </section>
  );
};

export default ProjectionCard;