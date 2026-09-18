import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock, Dumbbell, Flame, Lightbulb, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { EXERCISE_GUIDES, getExerciseGuideBySlug, pickText } from '../data/exerciseGuides';
import { translations } from '../i18n/translations';

type TKey = keyof typeof translations.en;

const DIFFICULTY_STYLES: Record<string, string> = {
  easy: 'bg-[#0F4C3A]/10 text-[#0F4C3A]',
  medium: 'bg-[#D4AF37]/20 text-[#9c7c1a]',
  hard: 'bg-red-100 text-red-700',
};

const ExerciseGuidePage: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const guide = getExerciseGuideBySlug(slug ?? '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const related = useMemo(() => {
    if (!guide) return [];
    const same = EXERCISE_GUIDES.filter((g) => g.slug !== guide.slug && g.category === guide.category);
    const others = EXERCISE_GUIDES.filter((g) => g.slug !== guide.slug && g.category !== guide.category);
    return [...same, ...others].slice(0, 3);
  }, [guide]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6" dir={dir}>
        <div className="text-center max-w-md animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-[#F4F1EB] flex items-center justify-center mx-auto mb-6 text-4xl">🏃</div>
          <h1 className="text-2xl font-extrabold text-gray-900">{t('exercise.notFound')}</h1>
          <Link
            to="/resources"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-extrabold text-[#0F4C3A] hover:bg-[#C9A032] transition-colors"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t('exercise.backToResources')}
          </Link>
        </div>
      </div>
    );
  }

  const title = pickText(guide.title, language);
  const description = pickText(guide.description, language);
  const benefits = pickText(guide.benefits, language);
  const instructions = pickText(guide.instructions, language);
  const tips = pickText(guide.tips, language);

  const difficultyKey = `exercise.difficulty.${guide.difficulty}` as TKey;
  const equipmentKey = `exercise.equipment.${guide.equipment}` as TKey;
  const categoryKey = `exercise.category.${guide.category}` as TKey;

  const stats = [
    { icon: Clock, label: t('exercise.stats.duration'), value: `${guide.duration} min` },
    {
      icon: TrendingUp,
      label: t('exercise.stats.difficulty'),
      value: (
        <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${DIFFICULTY_STYLES[guide.difficulty]}`}>
          {t(difficultyKey)}
        </span>
      ),
    },
    { icon: Flame, label: t('exercise.stats.calories'), value: `${guide.caloriesBurned} kcal` },
    { icon: Dumbbell, label: t('exercise.stats.equipment'), value: t(equipmentKey) },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <div className="max-w-[760px] mx-auto px-6 pt-16 pb-20">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#6B7A75]">
          <Link to="/resources" className="font-bold text-[#0F4C3A] hover:text-[#D4AF37] transition-colors">
            {t('nav.resources')}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-bold text-[#0F4C3A]">Exercises</span>
          <span aria-hidden="true">/</span>
          <span className="font-semibold truncate max-w-[320px]">{title}</span>
        </div>

        <Link
          to="/resources"
          className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0F4C3A] hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {t('exercise.backToResources')}
        </Link>

        <header className="mt-8 rounded-[32px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-8 text-center shadow-[0_18px_44px_rgba(15,76,58,0.18)]">
          <div className="mx-auto w-20 h-20 rounded-3xl bg-[#F4F1EB] flex items-center justify-center text-5xl shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
            {guide.icon}
          </div>
          <span className="mt-5 inline-block rounded-full bg-[#0F4C3A] border border-[#D4AF37] px-4 py-1.5 text-xs font-extrabold tracking-wide uppercase text-[#FDFBF7]">
            {t(categoryKey)}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#FDFBF7]">{title}</h1>
          <p className="mt-3 text-[#D8E6DF] leading-relaxed">{description}</p>
        </header>

        <section className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-[#EFEBE4] bg-white p-4 text-center">
              <div className="mx-auto w-9 h-9 rounded-xl bg-[#0F4C3A]/5 text-[#D4AF37] flex items-center justify-center">
                <stat.icon size={17} />
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#6B7A75]">{stat.label}</p>
              <div className="mt-1 text-sm font-extrabold text-[#0F4C3A]">{stat.value}</div>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-[#EFEBE4] bg-white p-6">
          <div className="flex items-center gap-2 text-[#0F4C3A]">
            <Check size={18} className="text-[#D4AF37]" />
            <h2 className="text-lg font-extrabold">{t('exercise.benefits')}</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {benefits.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#4A5A55]">
                <Check size={17} className="mt-0.5 shrink-0 text-[#0F4C3A]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0F4C3A]">{t('exercise.instructions')}</h2>
          <ol className="mt-5 space-y-3">
            {instructions.map((step, i) => (
              <li key={i} className="flex items-start gap-4 rounded-2xl bg-[#F4F1EB] border border-[#EFEBE4] p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F4C3A] text-sm font-extrabold text-[#D4AF37]">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-relaxed text-[#4A5A55]">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-6 rounded-3xl bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-6 sm:p-7 shadow-[0_18px_44px_rgba(15,76,58,0.18)]">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Lightbulb size={18} />
            <h2 className="text-lg font-extrabold uppercase tracking-wide">{t('exercise.tips')}</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#FDFBF7]">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-sm">
                  💡
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-extrabold tracking-tight text-[#0F4C3A]">{t('exercise.suitableFor')}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {guide.suitableFor.map((id) => (
              <span
                key={id}
                className="rounded-full border border-[#0F4C3A]/20 bg-[#0F4C3A]/5 px-4 py-2 text-xs font-extrabold text-[#0F4C3A]"
              >
                {t((`exercise.condition.${id}`) as TKey)}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0F4C3A]">{t('exercise.related')}</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/resources/exercise/${item.slug}`}
                className="rounded-3xl border border-[#EFEBE4] bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,76,58,0.10)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="rounded-full bg-[#F4F1EB] px-3 py-1 text-[10px] font-extrabold tracking-wide uppercase text-[#0F4C3A]">
                    {t((`exercise.category.${item.category}`) as TKey)}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-extrabold text-[#0F4C3A] leading-snug line-clamp-2">
                  {pickText(item.title, language)}
                </h3>
                <p className="mt-2 text-xs font-bold text-[#6B7A75]">{item.duration} min</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] px-8 py-12 text-center shadow-[0_24px_60px_rgba(15,76,58,0.25)]">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_140%_at_50%_0%,rgba(212,175,55,0.18),rgba(255,255,255,0)_60%)]" />
          <div className="relative">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#D4AF37] text-[#0F4C3A] flex items-center justify-center">
              <Dumbbell size={22} />
            </div>
            <h3 className="mt-4 text-2xl font-extrabold text-[#FDFBF7] tracking-tight">{t('exercise.cta.title')}</h3>
            <Link
              to="/advanced-care"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-extrabold text-[#0F4C3A] shadow-[0_10px_30px_rgba(212,175,55,0.45)] hover:bg-[#C9A032] transition-colors"
            >
              {t('exercise.cta.button')}
              <ArrowRight size={17} className="rtl:rotate-180" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExerciseGuidePage;