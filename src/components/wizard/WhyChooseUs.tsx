import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

const WhyChooseUs: React.FC = () => {
  const { t, dir } = useLanguage();
  const tk = (key: string) => key as keyof typeof translations.en;

  const cards: Array<{ emoji: string; titleKey: string; descKey: string }> = [
    { emoji: '📚', titleKey: 'wizard.blueprint.why.card1.title', descKey: 'wizard.blueprint.why.card1.desc' },
    { emoji: '🧪', titleKey: 'wizard.blueprint.why.card2.title', descKey: 'wizard.blueprint.why.card2.desc' },
    { emoji: '📈', titleKey: 'wizard.blueprint.why.card3.title', descKey: 'wizard.blueprint.why.card3.desc' },
    { emoji: '🍽️', titleKey: 'wizard.blueprint.why.card4.title', descKey: 'wizard.blueprint.why.card4.desc' },
  ];

  return (
    <section dir={dir} className="rounded-[32px] border border-[#EFEBE4] bg-[#F4F1EB] p-6 sm:p-10 md:p-14">
      <div className="max-w-2xl mx-auto text-center">
        <span className="eyebrow">{t(tk('wizard.blueprint.why.eyebrow'))}</span>
        <h2 className="mt-3 text-3xl md:text-[36px] font-extrabold tracking-tight text-[#0F4C3A]">
          {t(tk('wizard.blueprint.why.title'))}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#4A5A55]">{t(tk('wizard.blueprint.why.subtitle'))}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <div key={card.titleKey} className="rounded-[24px] border border-[#EFEBE4] bg-white p-6 transition hover:border-[#D4AF37] hover:shadow-[0_18px_50px_rgba(15,76,58,0.1)]">
            <span className="inline-flex w-12 h-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-2xl">
              {card.emoji}
            </span>
            <h3 className="mt-4 text-[17px] font-extrabold text-[#0F4C3A]">{t(tk(card.titleKey))}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#4A5A55]">{t(tk(card.descKey))}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;