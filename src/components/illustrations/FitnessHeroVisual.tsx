import React from 'react';
import { Activity, Flame, HeartPulse, type LucideIcon } from 'lucide-react';

interface Props {
  bmi: string;
  tdee: string;
  maxHr: number;
}

const FitnessHeroVisual: React.FC<Props> = ({ bmi, tdee, maxHr }) => {
  const cards: Array<{ icon: LucideIcon; label: string; value: string; unit: string; cls: string; delay: string }> = [
    { icon: Activity, label: 'BMI', value: bmi, unit: 'kg/m²', cls: 'bg-[rgba(15,76,58,0.08)] text-[#0F4C3A]', delay: '0s' },
    { icon: Flame, label: 'TDEE', value: tdee, unit: 'kcal/day', cls: 'bg-[rgba(212,175,55,0.18)] text-[#B8860B]', delay: '0.8s' },
    { icon: HeartPulse, label: 'MAX HR', value: String(maxHr), unit: 'bpm', cls: 'bg-[rgba(15,76,58,0.08)] text-[#0F4C3A]', delay: '1.6s' },
  ];

  return (
    <div className="relative w-full max-w-[440px] mx-auto">
      <div
        className="absolute -inset-8 rounded-full opacity-60 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(212,175,55,.35), transparent 60%), radial-gradient(circle at 75% 75%, rgba(15,76,58,.28), transparent 65%)' }}
        aria-hidden="true"
      />
      <div className="glass-soft relative rounded-[28px] p-7 sm:p-8 shadow-[0_24px_60px_rgba(15,76,58,0.14)]">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[12px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">Live Preview</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="space-y-4">
          {cards.map(({ icon: Icon, label, value, unit, cls, delay }) => (
            <div
              key={label}
              className="animate-float-card flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_6px_14px_rgba(15,76,58,0.08)]"
              style={{ animationDelay: delay }}
            >
              <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${cls} shrink-0`}>
                <Icon size={22} strokeWidth={2.4} />
              </span>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B7A75]">{label}</span>
                <span className="num block text-[22px] leading-tight font-extrabold text-[#0F4C3A] mt-0.5">
                  {value} <small className="text-[11px] font-semibold text-[#A0A8A4]">{unit}</small>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FitnessHeroVisual;