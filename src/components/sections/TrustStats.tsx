import React, { useEffect, useState } from 'react';
import { Heart, Star, TrendingDown, Users, type LucideIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Stat {
  icon: LucideIcon;
  value: string;
  labelKey: 'trust2.stat1.label' | 'trust2.stat2.label' | 'trust2.stat3.label' | 'trust2.stat4.label';
  circle: string;
  iconColor: string;
  numberColor: string;
  gold?: boolean;
}

const stats: Stat[] = [
  { icon: Users, value: '12,450+', labelKey: 'trust2.stat1.label', circle: '#F4F1EB', iconColor: '#0F4C3A', numberColor: '#0F4C3A' },
  { icon: Star, value: '4.9 / 5', labelKey: 'trust2.stat2.label', circle: '#FFF8E7', iconColor: '#D4AF37', numberColor: '#D4AF37', gold: true },
  { icon: TrendingDown, value: '3.2 kg', labelKey: 'trust2.stat3.label', circle: '#F4F1EB', iconColor: '#0F4C3A', numberColor: '#0F4C3A' },
  { icon: Heart, value: '92%', labelKey: 'trust2.stat4.label', circle: '#F4F1EB', iconColor: '#0F4C3A', numberColor: '#0F4C3A' },
];

const sources: { abbr: string; title: string }[] = [
  { abbr: 'WHO', title: 'World Health Organization' },
  { abbr: 'ADA', title: 'American Diabetes Association' },
  { abbr: 'NHS', title: 'UK National Health Service' },
  { abbr: 'MAYO CLINIC', title: 'Mayo Clinic' },
  { abbr: 'HARVARD MEDICAL', title: 'Harvard Medical School' },
];

const TrustStats: React.FC = () => {
  const { t } = useLanguage();
  // TODO: Replace with real-time data from Supabase/Firebase
  const activities = [
    t('trust2.activity.1'),
    t('trust2.activity.2'),
    t('trust2.activity.3'),
    t('trust2.activity.4'),
    t('trust2.activity.5'),
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % activities.length), 5000);
    return () => clearInterval(id);
  }, [activities.length]);

  return (
    <section className="trust2-section bg-[#FDFBF7] py-12 lg:py-24">
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="trust2-eyebrow">{t('trust2.eyebrow')}</span>
          <h2 className="text-[36px] leading-tight font-extrabold text-[#0F4C3A] mt-3">{t('trust2.title')}</h2>
          <p className="text-base text-[#6B7A75] mt-2">{t('trust2.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {stats.map(({ icon: Icon, value, labelKey, circle, iconColor, numberColor, gold }) => (
            <div
              key={labelKey}
              className={
                'text-center rounded-3xl px-6 py-8 bg-white transition-all duration-300 hover:-translate-y-1 shadow-[0_6px_14px_rgba(15,76,58,0.06)] ' +
                (gold
                  ? 'border-2 border-[#D4AF37] shadow-[0_8px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_16px_36px_rgba(212,175,55,0.35)]'
                  : 'hover:shadow-[0_16px_36px_rgba(15,76,58,0.14)]')
              }
            >
              <span
                className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: circle, color: iconColor }}
              >
                <Icon size={26} strokeWidth={2.5} />
              </span>
              <span className="num block text-[36px] leading-none font-extrabold" style={{ color: numberColor }}>
                {value}
              </span>
              <span className="block mt-2.5 text-[12px] font-bold tracking-[1px] text-[#6B7A75] uppercase">
                {t(labelKey)}
              </span>
            </div>
          ))}
        </div>

        <div className="my-10 h-px bg-[#E9E2D6]" />

        <div className="text-center mb-6">
          <h3 className="inline-block text-[#0F4C3A] text-sm font-extrabold uppercase tracking-[1px]">
            {t('trust2.sources.title')}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
          {sources.map(({ abbr, title }) => (
            <div
              key={abbr}
              title={title}
              className="h-[60px] bg-white border border-[#EFEBE4] rounded-xl px-6 py-4 shadow-[0_2px_6px_rgba(15,76,58,0.04)] hover:border-[#D4AF37] flex items-center justify-center transition-colors duration-200"
            >
              <span className="num text-[13px] leading-none text-[#0F4C3A] font-extrabold">{abbr}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-3xl p-6 shadow-[0_6px_14px_rgba(15,76,58,0.06)] max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-3 min-w-0">
              <span className="pulse-dot shrink-0 mt-1.5" />
              <div className="min-w-0">
                <span className="text-[#0F4C3A] block font-bold text-xs uppercase tracking-wider">
                  {t('trust2.live.label')}
                </span>
                <p key={idx} className="mt-2.5 text-sm text-[#6B7A75] leading-relaxed animate-fade-in">
                  {activities[idx]}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              <span className="px-4 py-2 rounded-full bg-[#F4F1EB] text-[#0F4C3A] text-xs font-bold shadow-[0_2px_6px_rgba(15,76,58,0.06)]">
                {t('trust2.badge.gdpr')}
              </span>
              <span className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#0F4C3A] text-xs font-bold shadow-[0_2px_6px_rgba(15,76,58,0.06)]">
                {t('trust2.badge.nhs')}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-[13px] text-[#6B7A75]">{t('trust2.footer')}</p>
      </div>
    </section>
  );
};

export default TrustStats;