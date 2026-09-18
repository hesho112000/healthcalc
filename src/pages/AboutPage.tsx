import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  HeartPulse,
  ScrollText,
  ShieldAlert,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SPLIT = (title: string) => {
  const words = title.split(' ');
  const last = words.pop() ?? '';
  return { line1: words.join(' '), line2: last };
};

const AboutPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const hero = SPLIT(t('about.hero.title'));

  const differentCards = [
    { emoji: '📚', title: t('about.different.card1.title'), desc: t('about.different.card1.desc') },
    { emoji: '🌍', title: t('about.different.card2.title'), desc: t('about.different.card2.desc') },
    { emoji: '🔬', title: t('about.different.card3.title'), desc: t('about.different.card3.desc') },
    { emoji: '📊', title: t('about.different.card4.title'), desc: t('about.different.card4.desc') },
  ];

  const steps = [
    { icon: HeartPulse, title: t('about.approach.step1.title'), desc: t('about.approach.step1.desc') },
    { icon: Target, title: t('about.approach.step2.title'), desc: t('about.approach.step2.desc') },
    { icon: TrendingUp, title: t('about.approach.step3.title'), desc: t('about.approach.step3.desc') },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_120%_at_50%_0%,rgba(212,175,55,0.12),rgba(255,255,255,0)_60%)]" />
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
          <span className="hero-eyebrow">{t('about.hero.eyebrow')}</span>
          <h1 className="hero-title mx-auto">
            <span className="hero-title-line1">{hero.line1}</span>
            {hero.line2 && <span className="hero-title-line2">{hero.line2}</span>}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#4A5A55] leading-relaxed">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="hero-eyebrow">{t('about.mission.title')}</span>
            <div className="mt-5 space-y-4 text-[#4A5A55] leading-relaxed">
              <p>{t('about.mission.p1')}</p>
              <p>{t('about.mission.p2')}</p>
              <p>{t('about.mission.p3')}</p>
            </div>
            
          </div>

          <div className="relative">
            <div className="rounded-[32px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-8 shadow-[0_24px_60px_rgba(15,76,58,0.18)]">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, emoji: '📚' },
                  { icon: HeartPulse, emoji: '🫀' },
                  { icon: ClipboardCheck, emoji: '🔬' },
                  { icon: TrendingUp, emoji: '📈' },
                ].map(({ icon: Icon, emoji }, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white/10 border border-white/15 flex flex-col items-center justify-center gap-2 py-8"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-[#0F4C3A] flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <span className="text-2xl">{emoji}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs font-extrabold tracking-[0.2em] text-[#D4AF37] uppercase">
                <ScrollText size={16} /> {t('about.hero.eyebrow')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-14">
        <div className="text-center">
          <span className="hero-eyebrow justify-center">{t('about.different.title')}</span>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {differentCards.map((card, i) => (
            <div
              key={i}
              className="rounded-3xl border border-[#EFEBE4] bg-white p-6 transition-transform hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,76,58,0.08)]"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F4F1EB] flex items-center justify-center text-2xl">
                {card.emoji}
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-[#0F4C3A]">{card.title}</h3>
              <p className="mt-2 text-sm text-[#6B7A75] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-14">
        <div className="text-center">
          <span className="hero-eyebrow justify-center">{t('about.approach.title')}</span>
        </div>
        <div className="mt-10 relative grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="hidden md:block absolute top-8 end-0 start-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          {steps.map((step, i) => (
            <div key={i} className="relative rounded-3xl border border-[#EFEBE4] bg-white p-7 text-center shadow-[0_10px_30px_rgba(15,76,58,0.05)]">
              <span className="absolute top-5 start-6 text-4xl font-extrabold text-[#D4AF37]/25">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="mx-auto w-14 h-14 rounded-2xl bg-[#0F4C3A] text-[#D4AF37] flex items-center justify-center">
                <step.icon size={24} />
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-[#0F4C3A]">{step.title}</h3>
              <p className="mt-2 text-sm text-[#6B7A75] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-14">
        <div className="rounded-[32px] bg-[#F4F1EB] border border-[#EFEBE4] p-8 text-center">
          <div className="text-4xl">💚</div>
          <span className="hero-eyebrow justify-center">{t('about.team.title')}</span>
          <p className="mt-4 mx-auto max-w-2xl text-[#4A5A55] leading-relaxed">
            {t('about.team.desc')}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            {['🥗', '🏋️', '🩺', '🧬'].map((emoji, i) => (
              <span key={i} className="w-12 h-12 rounded-full bg-white border border-[#EFEBE4] flex items-center justify-center text-xl">
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-14">
        <div className="flex items-start gap-3 rounded-3xl border border-[#D4AF37]/40 bg-[#FDFBF7] p-6 shadow-[0_10px_30px_rgba(15,76,58,0.06)]">
          <ShieldAlert size={22} className="shrink-0 mt-0.5 text-[#D4AF37]" />
          <p className="text-sm text-[#4A5A55] leading-relaxed">{t('about.disclaimer')}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] px-8 py-14 text-center shadow-[0_24px_60px_rgba(15,76,58,0.25)]">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_140%_at_50%_0%,rgba(212,175,55,0.18),rgba(255,255,255,0)_60%)]" />
          <h2 className="relative text-3xl md:text-4xl font-extrabold text-[#FDFBF7] tracking-tight">
            {t('about.cta.title')}
          </h2>
          <Link
            to="/advanced-care"
            className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-4 text-base font-extrabold text-[#0F4C3A] shadow-[0_10px_30px_rgba(212,175,55,0.45)] hover:bg-[#C9A032] transition-colors"
          >
            {t('about.cta.button')}
            <ArrowRight size={18} className="rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;