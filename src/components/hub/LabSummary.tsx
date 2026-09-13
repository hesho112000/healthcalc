import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { readStoredLabs } from '../../utils/healthScoring';
import { tk } from './data';

export interface LabRef {
  lo: number;
  hi: number;
  unit: string;
  invert?: boolean;
}

export const LAB_REF: Record<string, LabRef> = {
  fasting: { lo: 70, hi: 99, unit: 'mg/dL' },
  hba1c: { lo: 4.0, hi: 5.6, unit: '%' },
  systolic: { lo: 90, hi: 119, unit: 'mmHg' },
  diastolic: { lo: 60, hi: 79, unit: 'mmHg' },
  total: { lo: 125, hi: 199, unit: 'mg/dL' },
  ldl: { lo: 40, hi: 99, unit: 'mg/dL' },
  hdl: { lo: 40, hi: 60, invert: true, unit: 'mg/dL' },
  triglycerides: { lo: 50, hi: 149, unit: 'mg/dL' },
  uricAcid: { lo: 3.5, hi: 7.0, unit: 'mg/dL' },
  alt: { lo: 7, hi: 56, unit: 'U/L' },
  ast: { lo: 10, hi: 40, unit: 'U/L' },
  bilirubin: { lo: 0.1, hi: 1.2, unit: 'mg/dL' },
  creatinine: { lo: 0.6, hi: 1.3, unit: 'mg/dL' },
  egfr: { lo: 60, hi: 90, invert: true, unit: 'mL/min' },
  potassium: { lo: 3.5, hi: 5.0, unit: 'mmol/L' },
  tsh: { lo: 0.4, hi: 4.0, unit: 'mIU/L' },
  t3: { lo: 80, hi: 200, unit: 'ng/dL' },
  t4: { lo: 4.5, hi: 12.5, unit: 'µg/dL' },
};

const statusFor = (v: number, ref: LabRef): 'high' | 'low' | 'normal' => {
  if (v < ref.lo) return ref.invert ? 'high' : 'low';
  if (v > ref.hi) return ref.invert ? 'low' : 'high';
  return 'normal';
};

interface LabSummaryProps {
  paid: boolean;
  onUnlock: () => void;
}

const LabSummary: React.FC<LabSummaryProps> = ({ paid, onUnlock }) => {
  const { t } = useLanguage();
  const [openLab, setOpenLab] = useState<string | null>(null);

  const labRows = Object.entries(readStoredLabs()).flatMap(([cond, markers]) =>
    Object.entries(markers)
      .filter(([key]) => LAB_REF[key])
      .map(([key, value]) => ({ key, value, cond })),
  );

  const visibleLabs = paid ? labRows : labRows.slice(0, 3);
  const lockedLabCount = Math.max(0, labRows.length - 3);

  return (
    <section className="rounded-3xl bg-white border border-[#EFEBE4] p-6 md:p-8">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="font-extrabold text-lg text-[#0F4C3A]">{t('hub.labResults')}</h2>
        {!paid && lockedLabCount > 0 && (
          <button
            type="button"
            onClick={onUnlock}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 text-[#0F4C3A] px-3 py-1.5 text-xs font-bold hover:bg-[#D4AF37]/25 transition"
          >
            <Lock size={13} />
            {t('hub.labs.seeFull')}
          </button>
        )}
      </div>
      {labRows.length === 0 ? (
        <Link to="/advanced-care" className="block rounded-2xl border border-dashed border-[#D4AF37]/50 bg-[#FDFBF7] p-5 text-sm font-semibold text-[#0F4C3A] text-center hover:bg-[#F4F1EB] transition">
          {t('universe.score.enterLabs')}
        </Link>
      ) : (
        <div className="space-y-2">
          {visibleLabs.map((row) => {
            const ref = LAB_REF[row.key];
            const status = statusFor(row.value, ref);
            const isOpen = openLab === `${row.cond}:${row.key}`;
            const statusText = status === 'normal' ? t('hub.labs.normal') : status === 'high' ? t('hub.labs.high') : t('hub.labs.low');
            const statusColor =
              status === 'normal'
                ? 'bg-[#0F4C3A]/10 text-[#0F4C3A]'
                : status === 'high'
                  ? ref.invert
                    ? 'bg-[#D4AF37]/15 text-[#0F4C3A]'
                    : 'bg-[#B91C1C]/10 text-[#B91C1C]'
                  : ref.invert
                    ? 'bg-[#B91C1C]/10 text-[#B91C1C]'
                    : 'bg-[#D4AF37]/15 text-[#0F4C3A]';
            return (
              <div key={`${row.cond}:${row.key}`}>
                <button
                  type="button"
                  onClick={() => setOpenLab(isOpen ? null : `${row.cond}:${row.key}`)}
                  className="w-full flex items-center justify-between gap-3 rounded-xl border border-[#EFEBE4] bg-[#F4F1EB]/30 p-3 text-start transition hover:bg-[#F4F1EB]/60"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="truncate text-sm font-bold text-slate-900">
                      {t(tk(`advanced.lab.field.${row.key}.label`))}
                    </span>
                    <span className="shrink-0 text-xs text-[#6B7A75]">{row.value} {ref.unit}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${statusColor}`}>{statusText}</span>
                  </span>
                  <ChevronDown size={14} className={`shrink-0 text-[#6B7A75] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="mt-1 rounded-xl bg-[#F4F1EB]/50 px-3 py-2 text-xs text-[#6B7A75]">
                    {t('hub.labs.range')}: {ref.lo}–{ref.hi} {ref.unit}
                  </div>
                )}
              </div>
            );
          })}
          {!paid && lockedLabCount > 0 && (
            <div className="relative rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 p-3 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 rounded-full bg-[#FDFBF7] border border-[#D4AF37]/40 px-4 py-2 text-xs font-bold text-[#0F4C3A] shadow-sm">
                  <Lock size={13} />
                  +{lockedLabCount} {t('hub.labs.seeFull')}
                </div>
              </div>
              <div className="space-y-2 blur-sm">
                {labRows.slice(3, 6).map((row) => (
                  <div key={`${row.cond}:${row.key}`} className="rounded-lg bg-white p-3 text-xs font-semibold text-[#6B7A75]">
                    {t(tk(`advanced.lab.field.${row.key}.label`))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default LabSummary;