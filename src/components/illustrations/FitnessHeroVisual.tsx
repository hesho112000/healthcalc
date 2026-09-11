import React from 'react';
import { Flame, HeartPulse } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  bmi: string;
  tdee: string;
  maxHr: number;
}

const FitnessHeroVisual: React.FC<Props> = ({ bmi, tdee, maxHr }) => {
  const { t, dir } = useLanguage();
  const bmiNum = parseFloat(bmi);
  const ringPct = Number.isFinite(bmiNum) ? Math.max(4, Math.min(100, ((bmiNum - 14) / 26) * 100)) : 60;
  const C = 2 * Math.PI * 34;

  return (
    <div className="relative w-full max-w-[420px] mx-auto" dir={dir}>
      <div
        className="absolute -inset-10 rounded-full opacity-60 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(212,175,55,.3), transparent 60%), radial-gradient(circle at 75% 75%, rgba(15,76,58,.25), transparent 65%)' }}
        aria-hidden="true"
      />
      <div className="hero-preview-card animate-float-card relative p-7 sm:p-8 shadow-[0_24px_60px_rgba(15,76,58,0.14)]">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[12px] font-extrabold uppercase tracking-[2px] text-[#0F4C3A]">Live Preview</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_6px_14px_rgba(15,76,58,0.08)]">
            <div className="relative w-[68px] h-[68px] shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#EFEBE4" strokeWidth="7" />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="#0F4C3A"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={`${(ringPct / 100) * C} ${C}`}
                />
              </svg>
              <span className="num absolute inset-0 flex items-center justify-center text-[16px] font-extrabold text-[#0F4C3A]">{bmi}</span>
            </div>
            <div className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B7A75]">BMI</span>
              <span className="num block text-[22px] leading-tight font-extrabold text-[#0F4C3A] mt-0.5">
                {bmi} <small className="text-[11px] font-semibold text-[#A0A8A4]">kg/m²</small>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_6px_14px_rgba(15,76,58,0.08)]">
            <span className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-full bg-[rgba(212,175,55,0.18)] text-[#B8860B] shrink-0">
              <Flame size={24} strokeWidth={2.4} />
            </span>
            <div className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B7A75]">TDEE</span>
              <span className="num block text-[22px] leading-tight font-extrabold text-[#B8860B] mt-0.5">
                {tdee} <small className="text-[11px] font-semibold text-[#A0A8A4]">kcal/day</small>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_6px_14px_rgba(15,76,58,0.08)]">
            <span className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-full bg-[rgba(15,76,58,0.08)] text-[#0F4C3A] shrink-0">
              <HeartPulse size={24} strokeWidth={2.4} />
            </span>
            <div className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B7A75]">{t('fcHrMax')}</span>
              <span className="num block text-[22px] leading-tight font-extrabold text-[#0F4C3A] mt-0.5">
                {maxHr} <small className="text-[11px] font-semibold text-[#A0A8A4]">bpm</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessHeroVisual;