import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Calculator,
  ClipboardList,
  Compass,
  FileText,
  HeartPulse,
  Sparkles,
  Stethoscope,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

type FreeTitleKey = 'howItWorks.free.step1.title' | 'howItWorks.free.step2.title' | 'howItWorks.free.step3.title';
type FreeDescKey = 'howItWorks.free.step1.desc' | 'howItWorks.free.step2.desc' | 'howItWorks.free.step3.desc';
type AdvancedTitleKey =
  | 'howItWorks.advanced.step1.title'
  | 'howItWorks.advanced.step2.title'
  | 'howItWorks.advanced.step3.title'
  | 'howItWorks.advanced.step4.title';
type AdvancedDescKey =
  | 'howItWorks.advanced.step1.desc'
  | 'howItWorks.advanced.step2.desc'
  | 'howItWorks.advanced.step3.desc'
  | 'howItWorks.advanced.step4.desc';

interface FreeStep {
  icon: LucideIcon;
  titleKey: FreeTitleKey;
  descKey: FreeDescKey;
}

interface AdvancedStep {
  icon: LucideIcon;
  titleKey: AdvancedTitleKey;
  descKey: AdvancedDescKey;
}

const freeSteps: FreeStep[] = [
  { icon: UserPlus, titleKey: 'howItWorks.free.step1.title', descKey: 'howItWorks.free.step1.desc' },
  { icon: Calculator, titleKey: 'howItWorks.free.step2.title', descKey: 'howItWorks.free.step2.desc' },
  { icon: Compass, titleKey: 'howItWorks.free.step3.title', descKey: 'howItWorks.free.step3.desc' },
];

const advancedSteps: AdvancedStep[] = [
  { icon: FileText, titleKey: 'howItWorks.advanced.step1.title', descKey: 'howItWorks.advanced.step1.desc' },
  { icon: ClipboardList, titleKey: 'howItWorks.advanced.step2.title', descKey: 'howItWorks.advanced.step2.desc' },
  { icon: Activity, titleKey: 'howItWorks.advanced.step3.title', descKey: 'howItWorks.advanced.step3.desc' },
  { icon: Stethoscope, titleKey: 'howItWorks.advanced.step4.title', descKey: 'howItWorks.advanced.step4.desc' },
];

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();
  const arrow = <ArrowRight size={18} strokeWidth={2.5} className="rtl:rotate-180" />;

  return (
    <section className="howitworks-section py-12 lg:py-24">
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto">
          <span className="trust2-eyebrow">{t('howItWorks.eyebrow')}</span>
          <h2 className="text-[36px] leading-tight font-extrabold text-[#0F4C3A] mt-3">{t('howItWorks.title')}</h2>
          <p className="text-base text-[#6B7A75] mt-2">{t('howItWorks.subtitle')}</p>
        </div>

        <div className="relative mt-12 lg:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
            <div className="relative flex flex-col bg-white rounded-3xl p-10 px-8 border-t-4 border-t-[#0F4C3A] shadow-[0_6px_20px_rgba(15,76,58,0.06)]">
              <span className="self-start rounded-full bg-[#0F4C3A] text-white text-[11px] font-bold px-3 py-1 tracking-wide">
                {t('howItWorks.free.badge')}
              </span>
              <span className="w-20 h-20 rounded-full bg-[#0F4C3A] text-white flex items-center justify-center mt-6">
                <Sparkles size={34} strokeWidth={2.2} />
              </span>
              <h3 className="text-[#0F4C3A] text-[24px] font-extrabold mt-5">{t('howItWorks.free.title')}</h3>
              <p className="text-[#6B7A75] text-[14px] mt-1">{t('howItWorks.free.subtitle')}</p>

              <div className="mt-7 space-y-5 flex-1">
                {freeSteps.map(({ icon: Icon, titleKey, descKey }) => (
                  <div key={titleKey} className="flex items-start gap-3">
                    <span className="w-9 h-9 shrink-0 rounded-full bg-[rgba(15,76,58,0.06)] text-[#0F4C3A] flex items-center justify-center mt-0.5">
                      <Icon size={16} strokeWidth={2.2} />
                    </span>
                    <div>
                      <b className="block text-[#0F4C3A] text-[15px] font-bold">{t(titleKey)}</b>
                      <p className="text-[#6B7A75] text-[13px] leading-relaxed mt-1">{t(descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-start gap-3">
                <Link to="/fitness" className="btn-secondary">
                  {t('howItWorks.free.cta')} {arrow}
                </Link>
                <span className="text-[12px] text-[#6B7A75]">{t('howItWorks.free.note')}</span>
              </div>
            </div>

            <div className="relative flex flex-col rounded-3xl p-10 px-8 border-2 border-[#D4AF37] bg-gradient-to-b from-[#FDFBF7] to-[rgba(15,76,58,0.03)] shadow-[0_10px_30px_rgba(212,175,55,0.15)]">
              <span className="absolute -top-3.5 end-8 rounded-full bg-[#D4AF37] text-[#0F4C3A] text-[10px] font-extrabold tracking-wide px-3 py-1">
                {t('howItWorks.advanced.floatingBadge')}
              </span>
              <span className="self-start rounded-full bg-[#D4AF37] text-[#0F4C3A] text-[11px] font-bold px-3 py-1 tracking-wide">
                {t('howItWorks.advanced.badge')}
              </span>
              <span className="w-20 h-20 rounded-full bg-[#D4AF37] text-[#0F4C3A] flex items-center justify-center mt-6">
                <HeartPulse size={34} strokeWidth={2.2} />
              </span>
              <h3 className="text-[#0F4C3A] text-[24px] font-extrabold mt-5">{t('howItWorks.advanced.title')}</h3>
              <p className="text-[#6B7A75] text-[14px] mt-1">{t('howItWorks.advanced.subtitle')}</p>

              <div className="mt-7 space-y-5 flex-1">
                {advancedSteps.map(({ icon: Icon, titleKey, descKey }) => (
                  <div key={titleKey} className="flex items-start gap-3">
                    <span className="w-9 h-9 shrink-0 rounded-full bg-[rgba(212,175,55,0.12)] text-[#D4AF37] flex items-center justify-center mt-0.5">
                      <Icon size={16} strokeWidth={2.2} />
                    </span>
                    <div>
                      <b className="block text-[#0F4C3A] text-[15px] font-bold">{t(titleKey)}</b>
                      <p className="text-[#6B7A75] text-[13px] leading-relaxed mt-1">{t(descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-start gap-3">
                <Link to="/advanced-care" className="btn-primary">
                  {t('howItWorks.advanced.cta')} {arrow}
                </Link>
                <span className="text-[12px] text-[#6B7A75]">{t('howItWorks.advanced.note')}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-10">
            <span className="w-10 h-10 rounded-full bg-white border-2 border-[#D4AF37] text-[#0F4C3A] text-[13px] font-extrabold flex items-center justify-center">
              {t('howItWorks.or')}
            </span>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <span className="rounded-full bg-[#F4F1EB] text-[#0F4C3A] text-[13px] font-bold px-5 py-2">
            {t('howItWorks.bottom.trust')}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;