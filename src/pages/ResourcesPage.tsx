import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Droplets,
  Dumbbell,
  Flame,
  FlaskConical,
  HeartPulse,
  Leaf,
  Mail,
  Moon,
  PersonStanding,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import { translations } from '../i18n/translations';
import { ARTICLES } from '../data/articles';
import { RECIPES } from '../data/recipes';
import { EXERCISE_GUIDES } from '../data/exerciseGuides';

type TKey = keyof typeof translations.en;

const k = (key: string) => key as TKey;

type Category = 'all' | 'articles' | 'recipes' | 'exercises';

const ART_GRADIENTS = [
  'from-[#0F4C3A] to-[#1a6b53]',
  'from-[#D4AF37] to-[#c9a52e]',
  'from-[#1a6b53] to-[#2a7a5d]',
  'from-[#0F4C3A] to-[#2a7a5d]',
  'from-[#c9a52e] to-[#D4AF37]',
  'from-[#1a6b53] to-[#3a8f6f]',
  'from-[#0F4C3A] to-[#1a6b53]',
  'from-[#D4AF37] to-[#b89230]',
  'from-[#2a7a5d] to-[#0F4C3A]',
];

const ART_ICONS: LucideIcon[] = [BookOpen, HeartPulse, Droplets, FlaskConical, Moon, Sparkles, Leaf, Dumbbell, Clock];

const RECIPE_EMOJIS = ['🫘', '🍗', '🥘', '🌿', '🍚', '🍲'];
const EX_ICONS: LucideIcon[] = [PersonStanding, Activity, Dumbbell, HeartPulse, Sparkles, Flame];

const SPLIT = (title: string) => {
  const words = title.split(' ');
  const last = words.pop() ?? '';
  return { line1: words.join(' '), line2: last };
};

const ResourcesPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const [category, setCategory] = useState<Category>('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const hero = SPLIT(t('resources.hero.title'));

  const showAll = category === 'all';
  const showArticles = showAll || category === 'articles';
  const showRecipes = showAll || category === 'recipes';
  const showExercises = showAll || category === 'exercises';

  const tabs: { id: Category; label: string }[] = [
    { id: 'all', label: t('resources.categories.all') },
    { id: 'articles', label: t('resources.categories.articles') },
    { id: 'recipes', label: t('resources.categories.recipes') },
    { id: 'exercises', label: t('resources.categories.exercises') },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
    <div className="mb-6 flex items-center gap-3">
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0F4C3A]">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/50 to-transparent rtl:bg-gradient-to-l" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <SEO title={t('seo.resources.title')} description={t('seo.resources.description')} url="/resources" />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_120%_at_50%_0%,rgba(212,175,55,0.12),rgba(255,255,255,0)_60%)]" />
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-10 text-center">
          <span className="hero-eyebrow">{t('resources.hero.eyebrow')}</span>
          <h1 className="hero-title mx-auto">
            <span className="hero-title-line1">{hero.line1}</span>
            {hero.line2 && <span className="hero-title-line2">{hero.line2}</span>}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#4A5A55] leading-relaxed">
            {t('resources.hero.subtitle')}
          </p>
        </div>

        <div className="relative flex flex-wrap justify-center gap-2 px-6 pb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategory(tab.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-extrabold transition-colors ${
                category === tab.id
                  ? 'bg-[#0F4C3A] text-[#FDFBF7] shadow-[0_8px_20px_rgba(15,76,58,0.25)]'
                  : 'bg-[#F4F1EB] text-[#4A5A55] hover:bg-[#EFEBE4]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 pb-20 space-y-16">
        {showArticles && (
          <section>
            <SectionHeading title={t('resources.articles.title')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ARTICLES.map((article, i) => {
                const id = i + 1;
                const Icon = ART_ICONS[i];
                return (
                  <Link
                    key={article.slug}
                    to={`/resources/article/${article.slug}`}
                    className="group rounded-3xl border border-[#EFEBE4] bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,76,58,0.10)]"
                  >
                    <div className={`h-36 bg-gradient-to-br ${ART_GRADIENTS[i]} relative flex items-center justify-center`}>
                      <Icon size={44} className="text-white/85" />
                      <span className="absolute top-3 start-3 rounded-full bg-[#FDFBF7]/90 px-3 py-1 text-[10px] font-extrabold tracking-wide uppercase text-[#0F4C3A]">
                        {t('resources.tag.article')}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-base font-extrabold text-[#0F4C3A] leading-snug">
                        {t(k(`resources.article.${id}.title`))}
                      </h3>
                      <p className="mt-2 text-sm text-[#6B7A75] leading-relaxed">
                        {t(k(`resources.article.${id}.desc`))}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#D4AF37]">
                          {t(k(`resources.article.${id}.readTime`))}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-extrabold text-[#0F4C3A]">
                          {t('common.readMore')}
                          <ArrowRight size={15} className="rtl:rotate-180" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {showRecipes && (
          <section>
            <SectionHeading title={t('resources.recipes.title')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {RECIPES.map((recipe, i) => {
                const id = i + 1;
                return (
                  <Link
                    key={recipe.slug}
                    to={`/resources/recipe/${recipe.slug}`}
                    className="group rounded-3xl border border-[#EFEBE4] bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,76,58,0.10)]"
                  >
                    <div className="h-32 bg-gradient-to-br from-[#F4F1EB] to-[#E9E5DB] relative flex items-center justify-center">
                      <span className="text-5xl drop-shadow-sm">{RECIPE_EMOJIS[i]}</span>
                      <span className="absolute top-3 start-3 rounded-full bg-[#D4AF37] px-3 py-1 text-[10px] font-extrabold tracking-wide uppercase text-[#0F4C3A]">
                        {t('resources.tag.recipe')}
                      </span>
                    </div>
                    <div className="p-6">
                      <p className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-[#D4AF37]">
                        {t(k(`resources.recipe.${id}.cuisine`))}
                      </p>
                      <h3 className="mt-1 text-base font-extrabold text-[#0F4C3A] leading-snug">
                        {t(k(`resources.recipe.${id}.name`))}
                      </h3>
                      <div className="mt-3 flex items-center gap-4 text-xs font-bold text-[#6B7A75]">
                        <span className="inline-flex items-center gap-1">
                          <Flame size={14} className="text-[#D4AF37]" />
                          {t(k(`resources.recipe.${id}.calories`))}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock size={14} className="text-[#0F4C3A]" />
                          {t(k(`resources.recipe.${id}.prepTime`))}
                        </span>
                      </div>
                      <div className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-[#0F4C3A]">
                        {t('common.viewRecipe')}
                        <ArrowRight size={15} className="rtl:rotate-180" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {showExercises && (
          <section>
            <SectionHeading title={t('resources.exercises.title')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {EXERCISE_GUIDES.map((guide, i) => {
                const id = i + 1;
                const Icon = EX_ICONS[i];
                return (
                  <Link
                    key={guide.slug}
                    to={`/resources/exercise/${guide.slug}`}
                    className="group rounded-3xl border border-[#EFEBE4] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,76,58,0.10)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#0F4C3A] text-[#D4AF37] flex items-center justify-center shrink-0">
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full bg-[#F4F1EB] px-3 py-1 text-[10px] font-extrabold tracking-wide uppercase text-[#0F4C3A]">
                        {t('resources.tag.exercise')}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-extrabold text-[#0F4C3A] leading-snug">
                      {t(k(`resources.exercise.${id}.title`))}
                    </h3>
                    <p className="mt-2 text-sm text-[#6B7A75] leading-relaxed">
                      {t(k(`resources.exercise.${id}.desc`))}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#0F4C3A]/5 px-3 py-1 text-xs font-bold text-[#0F4C3A]">
                        <Clock size={13} />
                        {t(k(`resources.exercise.${id}.duration`))}
                      </span>
                      <span className="rounded-full bg-[#D4AF37]/15 px-3 py-1 text-xs font-bold text-[#0F4C3A]">
                        {t(k(`resources.exercise.${id}.difficulty`))}
                      </span>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-[#0F4C3A]">
                      {t('common.viewGuide')}
                      <ArrowRight size={15} className="rtl:rotate-180" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] px-8 py-14 text-center shadow-[0_24px_60px_rgba(15,76,58,0.25)]">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_140%_at_50%_0%,rgba(212,175,55,0.18),rgba(255,255,255,0)_60%)]" />
          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-[#D4AF37] text-[#0F4C3A] flex items-center justify-center">
              <Mail size={24} />
            </div>
            <h2 className="mt-5 text-3xl font-extrabold text-[#FDFBF7] tracking-tight">
              {t('resources.newsletter.title')}
            </h2>
            <p className="mt-3 text-[#D8E6DF] leading-relaxed">
              {t('resources.newsletter.subtitle')}
            </p>
            {subscribed ? (
              <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-6 py-3 text-sm font-bold text-[#FDFBF7]">
                <Check size={16} className="text-[#D4AF37]" />
                {t('resources.newsletter.done')}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-7 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('resources.newsletter.placeholder')}
                  className="flex-1 rounded-full border border-white/25 bg-white/10 px-5 py-3.5 text-sm text-[#FDFBF7] placeholder-[#D8E6DF]/70 outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-extrabold text-[#0F4C3A] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:bg-[#C9A032] transition-colors"
                >
                  {t('resources.newsletter.cta')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;