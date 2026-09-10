import React from 'react';
import { ArrowRight, BarChart3, ClipboardList, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface StepData {
  num: string;
  numberCircle: string;
  numberText: string;
  iconCircle: string;
  iconColor: string;
  icon: React.ReactNode;
  titleKey: 'howItWorks.step1.title' | 'howItWorks.step2.title' | 'howItWorks.step3.title';
  descKey: 'howItWorks.step1.desc' | 'howItWorks.step2.desc' | 'howItWorks.step3.desc';
}

const steps: StepData[] = [
  {
    num: '1',
    numberCircle: 'bg-[#0F4C3A]',
    numberText: 'text-white',
    iconCircle: 'bg-[rgba(15,76,58,0.06)]',
    iconColor: 'text-[#0F4C3A]',
    icon: <ClipboardList size={34} strokeWidth={2.2} />,
    titleKey: 'howItWorks.step1.title',
    descKey: 'howItWorks.step1.desc',
  },
  {
    num: '2',
    numberCircle: 'bg-[#D4AF37]',
    numberText: 'text-white',
    iconCircle: 'bg-[rgba(212,175,55,0.12)]',
    iconColor: 'text-[#D4AF37]',
    icon: <Sparkles size={34} strokeWidth={2.2} />,
    titleKey: 'howItWorks.step2.title',
    descKey: 'howItWorks.step2.desc',
  },
  {
    num: '3',
    numberCircle: 'bg-[#F4F1EB]',
    numberText: 'text-[#0F4C3A]',
    iconCircle: 'bg-[rgba(15,76,58,0.06)]',
    iconColor: 'text-[#0F4C3A]',
    icon: <BarChart3 size={34} strokeWidth={2.2} />,
    titleKey: 'howItWorks.step3.title',
    descKey: 'howItWorks.step3.desc',
  },
];

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="howitworks-section py-12 lg:py-24">
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="trust2-eyebrow">{t('howItWorks.eyebrow')}</span>
          <h2 className="text-[36px] leading-tight font-extrabold text-[#0F4C3A] mt-3">{t('howItWorks.title')}</h2>
          <p className="text-base text-[#6B7A75] mt-2">{t('howItWorks.subtitle')}</p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-14 lg:gap-0">
          {steps.map((step, i) => (
            <React.Fragment key={step.num}>
              <div className="flex-1 lg:max-w-[330px] flex justify-center">
                <div className="group relative w-full text-center bg-white rounded-3xl p-10 px-8 shadow-[0_6px_20px_rgba(15,76,58,0.06)] border-2 border-transparent hover:border-[#D4AF37] hover:shadow-[0_18px_40px_rgba(15,76,58,0.14)] hover:-translate-y-1.5 transition-all duration-300">
                  <div className="-mt-8 mb-6 flex justify-center">
                    <span
                      className={`num w-16 h-16 rounded-full ${step.numberCircle} ${step.numberText} flex items-center justify-center text-[28px] font-extrabold leading-none shadow-[0_6px_16px_rgba(15,76,58,0.18)]`}
                    >
                      {step.num}
                    </span>
                  </div>
                  <span
                    className={`w-20 h-20 mx-auto mb-6 rounded-full ${step.iconCircle} ${step.iconColor} flex items-center justify-center`}
                  >
                    {step.icon}
                  </span>
                  <h3 className="text-[#0F4C3A] text-[20px] font-extrabold">{t(step.titleKey)}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#6B7A75]">{t(step.descKey)}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center w-10 shrink-0">
                  <ArrowRight size={26} strokeWidth={2} className="text-[#D4AF37] opacity-40 rtl:rotate-180" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-center gap-3 flex-wrap">
          <span className="rounded-full bg-[#F4F1EB] text-[#0F4C3A] text-[13px] font-bold px-4 py-2">{t('howItWorks.badge1')}</span>
          <span className="rounded-full bg-[#F4F1EB] text-[#0F4C3A] text-[13px] font-bold px-4 py-2">{t('howItWorks.badge2')}</span>
          <span className="rounded-full bg-[#F4F1EB] text-[#0F4C3A] text-[13px] font-bold px-4 py-2">{t('howItWorks.badge3')}</span>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;