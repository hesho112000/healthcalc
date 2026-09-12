import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

const FAQ_KEYS = [
  { q: 'advanced.faq.q1', a: 'advanced.faq.a1' },
  { q: 'advanced.faq.q2', a: 'advanced.faq.a2' },
  { q: 'advanced.faq.q3', a: 'advanced.faq.a3' },
  { q: 'advanced.faq.q4', a: 'advanced.faq.a4' },
  { q: 'advanced.faq.q5', a: 'advanced.faq.a5' },
];

const EmbeddedFAQ: React.FC = () => {
  const { t, dir } = useLanguage();
  const tk = (key: string) => key as keyof typeof translations.en;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section dir={dir}>
      <div className="max-w-2xl mx-auto text-center">
        <span className="eyebrow">{t(tk('wizard.blueprint.faq.eyebrow'))}</span>
        <h2 className="mt-3 text-3xl md:text-[36px] font-extrabold tracking-tight text-[#0F4C3A]">
          {t(tk('wizard.blueprint.faq.title'))}
        </h2>
      </div>

      <div className="mx-auto mt-8 max-w-3xl divide-y divide-[#EFEBE4] rounded-[24px] border border-[#EFEBE4] bg-white">
        {FAQ_KEYS.map((item, index) => {
          const open = openIndex === index;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-5 text-start"
              >
                <span className="text-[15px] font-extrabold text-[#0F4C3A]">{t(tk(item.q))}</span>
                <ChevronDown size={18} className={`shrink-0 text-[#B8860B] transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && (
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#4A5A55]">{t(tk(item.a))}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EmbeddedFAQ;