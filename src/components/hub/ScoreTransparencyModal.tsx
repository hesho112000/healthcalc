import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { HEALTH_ORGAN_CONDITIONS, referenceRangesFor } from '../../utils/healthScoring';
import type { ScoreFactor } from '../../utils/healthScoring';
import type { HubOrgan } from './data';
import { tk } from './data';

interface ScoreTransparencyModalProps {
  organ: HubOrgan;
  score: number;
  factors: ScoreFactor[];
  onClose: () => void;
}

const ScoreTransparencyModal: React.FC<ScoreTransparencyModalProps> = ({
  organ,
  score,
  factors,
  onClose,
}) => {
  const { t, dir } = useLanguage();
  const conditions = HEALTH_ORGAN_CONDITIONS[organ.id];
  const ranges = referenceRangesFor(organ.id);

  const factorValue = (factor: ScoreFactor): string => {
    if (
      String(factor.labelKey) === 'universe.factor.stress' &&
      ['low', 'medium', 'high'].includes(String(factor.value))
    ) {
      return t(tk(`universe.level.${String(factor.value)}`));
    }
    return String(factor.value);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-6"
      dir={dir}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-[#FDFBF7] p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">
              {t('score.howCalculated')}
            </span>
            <h3 className="mt-1 flex items-center gap-2 text-lg font-extrabold text-[#0F4C3A]">
              <span className="text-2xl">{organ.icon}</span>
              {t(organ.nameKey)}
              <span className="text-2xl font-extrabold text-[#D4AF37] tabular-nums">{score}</span>
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#F4F1EB] p-2 text-[#0F4C3A] hover:bg-[#EFEBE4] transition-colors"
            aria-label={t('score.close')}
          >
            <X size={16} />
          </button>
        </div>

        {conditions.length > 0 && (
          <section className="mt-5">
            <h4 className="text-xs font-extrabold uppercase tracking-[1px] text-[#0F4C3A]">
              {t('score.formula')}
            </h4>
            <div className="mt-2 space-y-2">
              {conditions.map((cid) => (
                <p key={cid} className="text-sm leading-relaxed text-[#4A5A55]">
                  {t(tk(`score.formula.${cid}`))}
                </p>
              ))}
            </div>
          </section>
        )}

        {factors.length > 0 && (
          <section className="mt-5">
            <h4 className="text-xs font-extrabold uppercase tracking-[1px] text-[#0F4C3A]">
              {t('score.yourValues')}
            </h4>
            <div className="mt-2 space-y-1.5 rounded-2xl bg-[#F4F1EB]/60 p-3">
              {factors.map((factor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-[#6B7A75]">{t(factor.labelKey)}</span>
                  <b className="text-[#0F4C3A] tabular-nums">
                    {factorValue(factor)}
                    {factor.unit ? ` ${factor.unit}` : factor.unitKey ? ` ${t(factor.unitKey)}` : ''}
                  </b>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-5">
          <h4 className="text-xs font-extrabold uppercase tracking-[1px] text-[#0F4C3A]">
            {t('score.referenceRange')}
          </h4>
          <div className="mt-2 space-y-1.5 rounded-2xl bg-[#F4F1EB]/60 p-3">
            {ranges.map((range) => (
              <div
                key={String(range.labelKey)}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="text-[#6B7A75]">{t(range.labelKey)}</span>
                <b className="text-[#0F4C3A] tabular-nums" dir="ltr">
                  {range.value}
                </b>
              </div>
            ))}
          </div>
        </section>

        {conditions.length > 0 && (
          <section className="mt-5">
            <h4 className="text-xs font-extrabold uppercase tracking-[1px] text-[#0F4C3A]">
              {t('score.source')}
            </h4>
            <div className="mt-2 space-y-1">
              {conditions.map((cid) => (
                <p key={cid} className="text-xs font-bold text-[#4A5A55]">
                  {t(tk(`score.source.${cid}`))}
                </p>
              ))}
            </div>
          </section>
        )}

        <p className="mt-5 rounded-2xl bg-[#F4F1EB]/70 px-3 py-2 text-xs leading-relaxed text-[#6B7A75]">
          {t('score.disclaimer')}
        </p>
      </div>
    </div>
  );
};

export default ScoreTransparencyModal;