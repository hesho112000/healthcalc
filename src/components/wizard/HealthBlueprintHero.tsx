import React from 'react';
import { PartyPopper } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

interface HealthBlueprintHeroProps {
  name: string;
  dailyKcal: number;
  exerciseCount: number;
  mealCount: number;
  snackCount: number;
  focusTags: string[];
  lowCal: boolean;
  onCta: () => void;
}

const HealthBlueprintHero: React.FC<HealthBlueprintHeroProps> = ({
  name,
  dailyKcal,
  exerciseCount,
  mealCount,
  snackCount,
  focusTags,
  lowCal,
  onCta,
}) => {
  const { t, dir } = useLanguage();
  const tk = (key: string) => key as keyof typeof translations.en;

  const displayName = name.trim() || t(tk('wizard.blueprint.hero.nameFallback'));

  const stats: Array<{ emoji: string; value: string; label: string }> = [
    {
      emoji: '🏃',
      value: String(exerciseCount),
      label: t(tk('wizard.step6.summary.exercises')).replace('{count}', String(exerciseCount)),
    },
    {
      emoji: '🍽️',
      value: String(mealCount),
      label: t(tk('wizard.step6.summary.meals')).replace('{count}', String(mealCount)),
    },
    {
      emoji: '🍎',
      value: String(snackCount),
      label: t(tk('wizard.step6.summary.snacks')).replace('{count}', String(snackCount)),
    },
    {
      emoji: '🔥',
      value: String(dailyKcal),
      label: t(tk('wizard.step6.summary.calories')).replace('{kcal}', String(dailyKcal)),
    },
  ];

  return (
    <section
      dir={dir}
      className="relative overflow-hidden rounded-[32px] border border-[#D4AF37]/30 bg-[radial-gradient(120%_120%_at_50%_0%,#1a6b53_0%,#0F4C3A_55%,#0b3a2c_100%)] p-6 sm:p-10 md:p-16 shadow-[0_24px_80px_-24px_rgba(15,76,58,0.55)]"
    >
      <div className="max-w-3xl mx-auto text-center">
        <PartyPopper size={44} strokeWidth={1.6} className="mx-auto text-[#D4AF37]" />
        <p className="mt-4 text-[11px] font-extrabold uppercase tracking-[4px] text-[#D4AF37]">
          {t(tk('wizard.blueprint.hero.eyebrow'))}
        </p>
        <h2 className="mt-3 text-[28px] leading-tight sm:text-[36px] font-extrabold tracking-tight text-[#D4AF37]">
          {t(tk('wizard.blueprint.hero.title')).replace('{name}', displayName)}
        </h2>
        <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#FDFBF7]/85">
          {t(tk('wizard.blueprint.hero.subtitle'))}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[#FDFBF7]/10 bg-[#FDFBF7]/10 p-4 backdrop-blur-sm">
              <div className="text-xl">{stat.emoji}</div>
              <div className="mt-1 text-2xl font-extrabold text-[#D4AF37]">{stat.value}</div>
              <div className="mt-0.5 text-[11px] font-semibold text-[#FDFBF7]/75">{stat.label}</div>
            </div>
          ))}
        </div>

        {focusTags.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold text-[#FDFBF7]/70">{t(tk('wizard.blueprint.hero.focusLabel'))}:</span>
            {focusTags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full border border-[#D4AF37]/40 bg-[#FDFBF7]/10 px-3.5 py-1.5 text-xs font-bold text-[#D4AF37]">
                {tag}
              </span>
            ))}
          </div>
        )}

        {lowCal && (
          <div className="mt-6 rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/15 p-3.5 text-sm font-semibold leading-relaxed text-[#FDFBF7]">
            {t(tk('wizard.blueprint.hero.lowCal'))}
          </div>
        )}

        <button
          type="button"
          onClick={onCta}
          className="mt-8 w-full max-w-sm rounded-full bg-[#D4AF37] px-8 py-4 font-extrabold text-[#0F4C3A] shadow-[0_14px_34px_-10px_rgba(212,175,55,0.7)] transition hover:bg-[#c9a52e]"
        >
          {t(tk('advanced.finalCta.cta'))}
        </button>
        <p className="mt-3 text-xs font-semibold text-[#FDFBF7]/60">{t(tk('wizard.blueprint.hero.trust'))}</p>
      </div>
    </section>
  );
};

export default HealthBlueprintHero;