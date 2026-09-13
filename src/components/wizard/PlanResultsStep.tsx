import React from 'react';
import type { TKey, ConditionScoreRow } from './stepTypes';

type T = (key: TKey) => string;

const tk = (key: string): TKey => key as TKey;

interface PlanResultsStepProps {
  t: T;
  firstName: string;
  scoreRows: ConditionScoreRow[];
  overall: number | null;
  projected: number | null;
  dailyKcal: number;
  macros: { protein: number; carbs: number; fat: number };
  sampleMeals: string[];
  mealBreakdown: Array<{ key: TKey; kcal: number }>;
  exerciseItems: Array<{ name: string; meta: string }>;
  onStart: () => void;
}

const scoreColor = (score: number): string => {
  if (score >= 80) return '#0F4C3A';
  if (score >= 60) return '#D4AF37';
  return '#B91C1C';
};

const MacrosBar: React.FC<{ label: string; grams: number; pct: number; color: string }> = ({ label, grams, pct, color }) => (
  <div>
    <div className="flex items-center justify-between text-xs mb-1">
      <span className="font-bold text-slate-900">{label}</span>
      <span className="text-[#4A5A55] tabular-nums">{grams} g</span>
    </div>
    <div className="h-2 rounded-full bg-[#EFEBE4] overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${Math.min(100, pct)}%`, backgroundColor: color }} />
    </div>
  </div>
);

const PlanResultsStep: React.FC<PlanResultsStepProps> = ({
  t,
  firstName,
  scoreRows,
  overall,
  projected,
  dailyKcal,
  macros,
  sampleMeals,
  mealBreakdown,
  exerciseItems,
  onStart,
}) => {
  const totalPct = Math.max(1, macros.protein + macros.carbs + macros.fat);

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-[#EFEBE4] bg-white p-6 md:p-8">
        <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">{t(tk('wizard.results.scoreTitle'))}</span>
        <div className="mt-4 flex flex-wrap items-center gap-6">
          {overall !== null && (
            <div className="relative h-28 w-28 shrink-0">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(${scoreColor(overall)} ${overall * 3.6}deg, #EFEBE4 0deg)`,
                }}
              >
                <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                  <span className="text-3xl font-extrabold text-[#0F4C3A] tabular-nums">{overall}</span>
                </div>
              </div>
              <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-extrabold text-[#0F4C3A]" title={t(tk('wizard.results.overall'))}>
                ★
              </span>
            </div>
          )}
          <div className="min-w-[200px] flex-1">
            <p className="text-sm text-[#4A5A55] leading-relaxed">{t(tk('wizard.results.scoreSub'))}</p>
            {scoreRows.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {scoreRows.map((row) => (
                  <span
                    key={row.id}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold"
                    style={{ borderColor: `${scoreColor(row.score)}40`, color: scoreColor(row.score), backgroundColor: `${scoreColor(row.score)}0d` }}
                  >
                    {row.icon} {row.label} · {row.score}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-5">
        <div className="rounded-[28px] border border-[#EFEBE4] bg-white p-6">
          <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">{t(tk('wizard.results.nutritionTitle'))}</span>
          <p className="mt-1 text-sm text-[#4A5A55]">{t(tk('wizard.results.nutritionSub'))}</p>
          <div className="mt-4 rounded-2xl bg-[#0F4C3A] text-[#FDFBF7] px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-bold">{t(tk('wizard.results.calories'))}</span>
            <span className="text-xl font-extrabold tabular-nums">{dailyKcal} kcal</span>
          </div>
          <div className="mt-4 space-y-3">
            <MacrosBar label={t(tk('wizard.macro.protein'))} grams={macros.protein} pct={(macros.protein / totalPct) * 100} color="#0F4C3A" />
            <MacrosBar label={t(tk('wizard.macro.carbs'))} grams={macros.carbs} pct={(macros.carbs / totalPct) * 100} color="#D4AF37" />
            <MacrosBar label={t(tk('wizard.macro.fat'))} grams={macros.fat} pct={(macros.fat / totalPct) * 100} color="#6B7A75" />
          </div>
          {mealBreakdown.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {mealBreakdown.map((slot) => (
                <span key={slot.key} className="rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#0F4C3A] text-xs px-3 py-1.5 font-semibold tabular-nums">
                  {t(slot.key)} · {slot.kcal} kcal
                </span>
              ))}
            </div>
          )}
          {sampleMeals.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {sampleMeals.map((meal) => (
                <span key={meal} className="rounded-full bg-[#F4F1EB] text-[#4A5A55] text-xs px-3 py-1.5">{meal}</span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[28px] border border-[#EFEBE4] bg-white p-6">
          <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">{t(tk('wizard.results.exerciseTitle'))}</span>
          <p className="mt-1 text-sm text-[#4A5A55]">{t(tk('wizard.results.exerciseSub'))}</p>
          {exerciseItems.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {exerciseItems.map((item) => (
                <li key={item.name} className="flex items-center justify-between rounded-2xl border border-[#EFEBE4] bg-[#FDFBF7] px-4 py-3">
                  <span className="text-sm font-bold text-[#0F4C3A]">{item.name}</span>
                  <span className="text-xs text-[#4A5A55] tabular-nums">{item.meta}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-[#4A5A55]">—</p>
          )}
        </div>
      </section>

      {overall !== null && projected !== null && (
        <section className="rounded-[32px] border-2 border-[#D4AF37] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-8 text-center md:p-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">{t(tk('wizard.results.projectionTitle'))}</span>
          <p className="mt-3 text-sm text-[#A7C4B8] md:text-[15px]">
            {t(tk('wizard.results.projectionBody')).replace('{from}', String(overall)).replace('{to}', String(projected))}
          </p>
          <div className="mt-6 flex items-center justify-center gap-6">
            <div>
              <span className="block text-4xl font-extrabold text-[#FDFBF7] tabular-nums">{t(tk('wizard.results.today'))}</span>
              <span className="block text-2xl font-extrabold text-[#D4AF37] tabular-nums">{overall}</span>
            </div>
            <span className="text-3xl text-[#D4AF37]">→</span>
            <div>
              <span className="block text-4xl font-extrabold text-[#FDFBF7] tabular-nums">{t(tk('wizard.results.month3'))}</span>
              <span className="block text-2xl font-extrabold text-[#D4AF37] tabular-nums">{projected}</span>
            </div>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={onStart}
        className="w-full mt-2 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-4 text-base hover:bg-[#c9a52e] transition shadow-[0_14px_34px_-10px_rgba(212,175,55,0.7)]"
      >
        {firstName ? `${t(tk('wizard.results.startMyPlan'))} ${firstName}!` : t(tk('wizard.results.startMyPlan'))}
      </button>
    </div>
  );
};

export default PlanResultsStep;