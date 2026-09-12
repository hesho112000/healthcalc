import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Microscope, Stethoscope } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LabInterpreter, { conditionEmoji, isLabCondition, type LabCondition } from '../components/lab/LabInterpreter';
import { translations } from '../i18n/translations';

type TKey = keyof typeof translations.en;

const conditionTitleKeys: Record<LabCondition, TKey> = {
  diabetes: 'advanced.condition.diabetes.title',
  hypertension: 'advanced.condition.hypertension.title',
  cholesterol: 'advanced.condition.cholesterol.title',
  gout: 'advanced.condition.gout.title',
  liver: 'advanced.condition.liver.title',
  kidney: 'advanced.condition.kidney.title',
  thyroid: 'advanced.condition.thyroid.title',
};

const conditionDescKeys: Record<LabCondition, TKey> = {
  diabetes: 'advanced.condition.diabetes.desc',
  hypertension: 'advanced.condition.hypertension.desc',
  cholesterol: 'advanced.condition.cholesterol.desc',
  gout: 'advanced.condition.gout.desc',
  liver: 'advanced.condition.liver.desc',
  kidney: 'advanced.condition.kidney.desc',
  thyroid: 'advanced.condition.thyroid.desc',
};

const AdvancedLabPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const [searchParams] = useSearchParams();
  const raw = searchParams.get('condition');
  const condition: LabCondition = isLabCondition(raw) ? raw : 'diabetes';
  const isIbs = raw === 'ibs';

  const title = isIbs
    ? t('advanced.lab.ibs.title')
    : t(conditionTitleKeys[condition]);
  const subtitle = isIbs
    ? t('advanced.lab.ibs.desc')
    : t(conditionDescKeys[condition]);

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 12% 18%, rgba(15,76,58,.08) 0%, transparent 46%), radial-gradient(circle at 88% 12%, rgba(212,175,55,.09) 0%, transparent 42%), radial-gradient(circle at 72% 85%, rgba(15,76,58,.06) 0%, transparent 46%)',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-5 pt-10 md:pt-14 pb-4">
          <Link
            to="/advanced-care"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0F4C3A] hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={2.5} className="rtl:rotate-180" />
            {t('advanced.lab.back')}
          </Link>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-end gap-6 justify-between">
            <div>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(15,76,58,0.18)] bg-white/70 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37] shadow-[0_8px_32px_rgba(15,23,42,0.06)]">
                {isIbs ? '🌿' : conditionEmoji[condition]}
                {t('advanced.lab.eyebrow')}
              </span>
              <h1 className="mt-4 text-3xl md:text-[42px] font-extrabold leading-tight tracking-tight text-[#0F4C3A]">
                {title}
              </h1>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#6B7A75]">{subtitle}</p>
            </div>
            <div className="hidden md:flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-[#4ade80]/20 to-[#D4AF37]/25 border border-white/70 shadow-[inset_0_0_0_8px_rgba(255,255,255,0.6)]">
              <Microscope size={44} strokeWidth={1.6} className="text-[#0F4C3A]" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative max-w-5xl mx-auto px-5 py-10 md:py-14">
        {isIbs ? (
          <div className="rounded-[28px] border border-[#D4AF37] bg-gradient-to-b from-[#FDFBF7] to-[rgba(212,175,55,0.06)] p-8 md:p-10 text-center shadow-[0_18px_50px_rgba(212,175,55,0.12)]">
            <span className="inline-flex w-16 h-16 rounded-full bg-[#F4F1EB] items-center justify-center text-3xl">🌿</span>
            <h2 className="mt-5 text-2xl font-extrabold text-[#0F4C3A]">{t('advanced.lab.ibs.title')}</h2>
            <p className="mt-3 max-w-xl mx-auto text-[15px] leading-relaxed text-[#6B7A75]">{t('advanced.lab.ibs.desc')}</p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-[#0F4C3A] text-[13px] font-extrabold px-5 py-2.5">
              <Stethoscope size={16} strokeWidth={2.4} />
              {t('advanced.lab.interpretation')}
            </span>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex items-center gap-3 flex-wrap">
                {(
                  [
                    ['diabetes', 'advanced.condition.diabetes.title'],
                    ['hypertension', 'advanced.condition.hypertension.title'],
                    ['cholesterol', 'advanced.condition.cholesterol.title'],
                    ['gout', 'advanced.condition.gout.title'],
                    ['liver', 'advanced.condition.liver.title'],
                    ['kidney', 'advanced.condition.kidney.title'],
                    ['thyroid', 'advanced.condition.thyroid.title'],
                  ] as const
                ).map(([id, key]) => (
                  <Link
                    key={id}
                    to={`/advanced-care/lab?condition=${id}`}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-bold transition-all ${
                      condition === id
                        ? 'bg-[#0F4C3A] text-white shadow-[0_8px_20px_rgba(15,76,58,0.25)]'
                        : 'bg-white text-[#0F4C3A] border border-[#EFEBE4] hover:border-[#D4AF37]'
                    }`}
                  >
                    <span>{conditionEmoji[id as LabCondition]}</span>
                    {t(key as TKey)}
                  </Link>
                ))}
              </div>
            </div>
            <LabInterpreter conditions={[condition]} />
          </>
        )}
      </section>
    </div>
  );
};

export default AdvancedLabPage;