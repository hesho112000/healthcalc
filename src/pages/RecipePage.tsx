import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChefHat, Clock, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getRecipeBySlug, lt } from '../data/recipes';

const RecipePage: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const recipe = getRecipeBySlug(slug ?? '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6" dir={dir}>
        <div className="text-center max-w-md animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-[#F4F1EB] flex items-center justify-center mx-auto mb-6 text-4xl">🍳</div>
          <h1 className="text-2xl font-extrabold text-gray-900">{t('recipe.notFound')}</h1>
          <Link
            to="/resources"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-extrabold text-[#0F4C3A] hover:bg-[#C9A032] transition-colors"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t('recipe.backToResources')}
          </Link>
        </div>
      </div>
    );
  }

  const ingredients = recipe.ingredients[language as 'en' | 'ar'] ?? recipe.ingredients.en;
  const instructions = recipe.instructions[language as 'en' | 'ar'] ?? recipe.instructions.en;

  const nutritionRows = [
    { label: t('recipe.calories'), value: `${recipe.nutrition.calories} kcal` },
    { label: t('recipe.protein'), value: `${recipe.nutrition.protein} g` },
    { label: t('recipe.carbs'), value: `${recipe.nutrition.carbs} g` },
    { label: t('recipe.fat'), value: `${recipe.nutrition.fat} g` },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <div className="max-w-[720px] mx-auto px-6 pt-16 pb-20">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#0F4C3A] hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t('recipe.backToResources')}
          </Link>
          <span className="text-sm font-semibold text-[#6B7A75] truncate max-w-[260px]">
            {lt(recipe.title, language)}
          </span>
        </div>

        <header className="mt-8 rounded-[32px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-8 text-center shadow-[0_18px_44px_rgba(15,76,58,0.18)]">
          <div className="mx-auto w-20 h-20 rounded-3xl bg-[#F4F1EB] flex items-center justify-center text-5xl shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
            {recipe.emoji}
          </div>
          <span className="mt-5 inline-block rounded-full bg-[#D4AF37] px-4 py-1.5 text-xs font-extrabold tracking-wide uppercase text-[#0F4C3A]">
            {lt(recipe.cuisine, language)}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#FDFBF7]">{lt(recipe.title, language)}</h1>
          <p className="mt-3 text-[#D8E6DF] leading-relaxed">{lt(recipe.description, language)}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-[#FDFBF7]">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={16} className="text-[#D4AF37]" />
              {t('recipe.prepTime')}: {lt(recipe.prepTime, language)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Flame size={16} className="text-[#D4AF37]" />
              {recipe.nutrition.calories} kcal
            </span>
          </div>
        </header>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-[#EFEBE4] bg-white p-6">
            <div className="flex items-center gap-2 text-[#0F4C3A]">
              <ChefHat size={18} className="text-[#D4AF37]" />
              <h2 className="text-lg font-extrabold">{t('recipe.ingredients')}</h2>
            </div>
            <ul className="mt-4 space-y-2.5">
              {ingredients.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[#4A5A55]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-[#EFEBE4] bg-[#F4F1EB] p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#0F4C3A]">
              {t('recipe.nutrition')}
            </h2>
            <dl className="mt-4 divide-y divide-[#E4DFD4]">
              {nutritionRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2.5">
                  <dt className="text-sm font-semibold text-[#6B7A75]">{row.label}</dt>
                  <dd className="text-sm font-extrabold text-[#0F4C3A]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-[#EFEBE4] bg-white p-6">
          <h2 className="text-lg font-extrabold text-[#0F4C3A]">{t('recipe.instructions')}</h2>
          <ol className="mt-4 space-y-4">
            {instructions.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-xs font-extrabold text-[#0F4C3A]">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-relaxed text-[#4A5A55]">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] px-8 py-12 text-center shadow-[0_24px_60px_rgba(15,76,58,0.25)]">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_140%_at_50%_0%,rgba(212,175,55,0.18),rgba(255,255,255,0)_60%)]" />
          <div className="relative">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#D4AF37] text-[#0F4C3A] flex items-center justify-center">
              <Check size={22} />
            </div>
            <h3 className="mt-4 text-2xl font-extrabold text-[#FDFBF7] tracking-tight">{t('article.cta.title')}</h3>
            <Link
              to="/advanced-care"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-extrabold text-[#0F4C3A] shadow-[0_10px_30px_rgba(212,175,55,0.45)] hover:bg-[#C9A032] transition-colors"
            >
              {t('article.cta.button')}
              <ArrowRight size={17} className="rtl:rotate-180" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecipePage;