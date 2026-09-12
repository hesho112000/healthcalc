import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

export interface BlueprintExerciseItem {
  name: string;
  meta: string;
}

export interface BlueprintFoodItem {
  name: string;
  slot: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  kcal: number;
  meta: string;
}

interface WhatsIncludedProps {
  exerciseCount: number;
  mealCount: number;
  snackCount: number;
  exercises: BlueprintExerciseItem[];
  foods: BlueprintFoodItem[];
}

type PreviewSection = 'exercise' | 'food' | 'tracking' | null;

const WhatsIncluded: React.FC<WhatsIncludedProps> = ({ exerciseCount, mealCount, snackCount, exercises, foods }) => {
  const { t, dir } = useLanguage();
  const tk = (key: string) => key as keyof typeof translations.en;
  const [preview, setPreview] = useState<PreviewSection>(null);

  const slotKey = (slot: BlueprintFoodItem['slot']): string => {
    if (slot === 'breakfast') return 'wizard.step6.mealBreakfast';
    if (slot === 'lunch') return 'wizard.step6.mealLunch';
    if (slot === 'dinner') return 'wizard.step6.mealDinner';
    return 'wizard.step6.mealSnack';
  };

  const cards: Array<{
    id: Exclude<PreviewSection, null>;
    emoji: string;
    title: string;
    desc: string;
    chip: string;
  }> = [
    {
      id: 'exercise',
      emoji: '🏃',
      title: t(tk('wizard.blueprint.included.card1.title')),
      desc: t(tk('wizard.blueprint.included.card1.desc')).replace('{count}', String(exerciseCount)),
      chip: t(tk('wizard.step6.summary.exercises')).replace('{count}', String(exerciseCount)),
    },
    {
      id: 'food',
      emoji: '🍽️',
      title: t(tk('wizard.blueprint.included.card2.title')),
      desc: t(tk('wizard.blueprint.included.card2.desc'))
        .replace('{meals}', String(mealCount))
        .replace('{snacks}', String(snackCount)),
      chip: t(tk('wizard.step6.summary.meals')).replace('{count}', String(mealCount)) + ' · ' + t(tk('wizard.step6.summary.snacks')).replace('{count}', String(snackCount)),
    },
    {
      id: 'tracking',
      emoji: '📈',
      title: t(tk('wizard.blueprint.included.card3.title')),
      desc: t(tk('wizard.blueprint.included.card3.desc')),
      chip: '4.9 ★',
    },
  ];

  const modalTitle = (): string => {
    if (preview === 'exercise') return t(tk('wizard.blueprint.included.modal.exercises'));
    if (preview === 'food') return t(tk('wizard.blueprint.included.modal.nutrition'));
    return t(tk('wizard.blueprint.included.modal.tracking'));
  };

  const trackingRows: Array<{ emoji: string; label: string; value: number; max: number }> = [
    { emoji: '🍽️', label: t(tk('wizard.step6.summary.meals')).replace('{count}', ''), value: mealCount, max: 3 },
    { emoji: '🍎', label: t(tk('wizard.step6.summary.snacks')).replace('{count}', ''), value: snackCount, max: 2 },
    { emoji: '🏃', label: t(tk('wizard.step6.summary.exercises')).replace('{count}', ''), value: exerciseCount, max: 7 },
  ];

  return (
    <section dir={dir}>
      <div className="max-w-2xl mx-auto text-center">
        <span className="eyebrow">{t(tk('wizard.blueprint.included.eyebrow'))}</span>
        <h2 className="mt-3 text-3xl md:text-[36px] font-extrabold tracking-tight text-[#0F4C3A]">
          {t(tk('wizard.blueprint.included.title'))}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#6B7A75]">{t(tk('wizard.blueprint.included.subtitle'))}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => (
          <div key={card.id} className="flex flex-col rounded-[24px] border border-[#EFEBE4] bg-white p-6 transition hover:border-[#D4AF37] hover:shadow-[0_18px_50px_rgba(15,76,58,0.1)]">
            <span className="inline-flex w-12 h-12 items-center justify-center rounded-2xl bg-[#F4F1EB] text-2xl">
              {card.emoji}
            </span>
            <h3 className="mt-4 text-[17px] font-extrabold text-[#0F4C3A]">{card.title}</h3>
            <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#6B7A75]">{card.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-[#0F4C3A] px-3 py-1 text-[11px] font-bold text-[#FDFBF7]">{card.chip}</span>
              <button
                type="button"
                onClick={() => setPreview(card.id)}
                className="text-[13px] font-extrabold text-[#B8860B] transition hover:text-[#D4AF37]"
              >
                {t(tk('wizard.blueprint.included.preview'))} →
              </button>
            </div>
          </div>
        ))}
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F4C3A]/50 p-4 backdrop-blur-sm" onClick={() => setPreview(null)}>
          <div
            className="relative w-full max-w-lg rounded-[28px] border border-[#EFEBE4] bg-[#FDFBF7] p-6 max-h-[80vh] overflow-y-auto shadow-[0_30px_90px_-30px_rgba(15,76,58,0.5)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-extrabold text-[#0F4C3A]">{modalTitle()}</h3>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4F1EB] text-[#0F4C3A] transition hover:bg-[#EFEBE4]"
                aria-label="close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-2.5">
              {preview === 'exercise' &&
                (exercises.length === 0 ? (
                  <p className="text-sm text-[#6B7A75]">{t(tk('wizard.blueprint.journey.empty'))}</p>
                ) : (
                  exercises.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-3 rounded-2xl border border-[#EFEBE4] bg-white p-3.5">
                      <b className="text-sm text-slate-900">{item.name}</b>
                      <span className="shrink-0 text-xs font-semibold text-[#6B7A75]">{item.meta}</span>
                    </div>
                  ))
                ))}

              {preview === 'food' &&
                (foods.length === 0 ? (
                  <p className="text-sm text-[#6B7A75]">{t(tk('wizard.blueprint.journey.empty'))}</p>
                ) : (
                  foods.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-3 rounded-2xl border border-[#EFEBE4] bg-white p-3.5">
                      <div>
                        <b className="block text-sm text-slate-900">{item.name}</b>
                        <small className="text-xs text-[#6B7A75]">{t(tk(slotKey(item.slot)))} · {item.kcal} kcal</small>
                      </div>
                      <span className="shrink-0 rounded-full bg-[#D4AF37] px-2.5 py-1 text-[11px] font-bold text-[#0F4C3A]">
                        {item.kcal} kcal
                      </span>
                    </div>
                  ))
                ))}

              {preview === 'tracking' && (
                <div className="space-y-4">
                  {trackingRows.map((row) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-[#0F4C3A]">
                          {row.emoji} {row.label}
                        </span>
                        <span className="text-xs font-bold text-[#6B7A75]">
                          {Math.min(row.value, row.max)} / {row.max}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#F4F1EB]">
                        <div
                          className="h-full rounded-full bg-[#0F4C3A] transition-all"
                          style={{ width: `${Math.min(100, (row.value / Math.max(1, row.max)) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="pt-2 text-xs leading-relaxed text-[#6B7A75]">
                    {t(tk('wizard.blueprint.included.card3.desc'))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhatsIncluded;