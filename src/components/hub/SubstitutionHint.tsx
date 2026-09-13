import React, { useMemo, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { foodDisplayName, foodPoolForConditions, readHubConditions, readHubPlan, tk } from './data';
import LockedCard from './LockedCard';

interface SubstitutionHintProps {
  paid: boolean;
  onUnlock: () => void;
}

const readPlanFoods = (): string[] => {
  const plan = readHubPlan();
  return Array.isArray(plan?.foodNames) ? plan.foodNames : [];
};

const SubstitutionHint: React.FC<SubstitutionHintProps> = ({ paid, onUnlock }) => {
  const { t, language: lang } = useLanguage();
  const [index, setIndex] = useState(0);

  const suggestion = useMemo(() => {
    const pool = foodPoolForConditions(readHubConditions());
    const inPlan = new Set(readPlanFoods());
    const inPlanList = pool.filter((food) => inPlan.has(food.name_en));
    if (inPlanList.length === 0) return null;
    const item = inPlanList[index % inPlanList.length];
    const alternatives = pool
      .filter((food) => !inPlan.has(food.name_en))
      .filter((food) => item.mealType ? food.mealType === item.mealType : true)
      .sort((a, b) => (b.calories || 0) - (a.calories || 0));
    if (alternatives.length === 0) return null;
    return { item: foodDisplayName(item, lang), alt: foodDisplayName(alternatives[0], lang) };
  }, [index, lang]);

  if (!paid) {
    return <LockedCard title={t(tk('hub.substitution'))} onUnlock={onUnlock} />;
  }

  return (
    <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
      <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">{t(tk('hub.substitution'))}</span>
      {suggestion ? (
        <div className="mt-3 space-y-3">
          <p className="text-sm text-[#4A5A55] leading-relaxed">
            {t(tk('hub.substitution.body')).replace('{item}', suggestion.item).replace('{alt}', suggestion.alt)}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#B91C1C]/30 bg-[#B91C1C]/5 text-[#B91C1C] text-xs font-bold px-3 py-1.5">
              {suggestion.item}
            </span>
            <span className="text-[#6B7A75]">→</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0F4C3A]/30 bg-[#0F4C3A]/5 text-[#0F4C3A] text-xs font-bold px-3 py-1.5">
              ✨ {suggestion.alt}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIndex((i) => i + 1)}
            className="rounded-full border border-[#D4AF37]/60 text-[#0F4C3A] text-xs font-bold px-4 py-2 hover:bg-[#D4AF37]/10 transition"
          >
            ↻ {t(tk('wizard.step2.regenerate'))}
          </button>
        </div>
      ) : (
        <p className="mt-3 text-sm text-[#6B7A75]">—</p>
      )}
    </section>
  );
};

export default SubstitutionHint;