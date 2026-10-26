import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Check, Flame, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import { supabaseClient as supabase } from '../lib/supabaseClient';
import { Dish } from '../components/food/DishCard';

type DbDish = Dish & {
  fiber?: number | null;
  sugar?: number | null;
  sodium?: number | null;
  sat_fat?: number | null;
  healthy?: boolean | null;
  is_fried?: boolean | null;
  is_sweet?: boolean | null;
};

const RECIPE_LINKS = [
  { keywords: ['foul', 'medames', 'fava'], slug: 'foul-medames', title: 'Foul Medames Recipe' },
  { keywords: ['grilled chicken', 'brown rice'], slug: 'grilled-chicken-brown-rice', title: 'Grilled Chicken Recipe' },
  { keywords: ['tagine', 'tunisian'], slug: 'tunisian-vegetable-tagine', title: 'Tunisian Tagine Recipe' },
  { keywords: ['tabbouleh', 'lebanese'], slug: 'lebanese-tabbouleh', title: 'Lebanese Tabbouleh Recipe' },
  { keywords: ['kabsa', 'saudi'], slug: 'saudi-kabsa-lighter', title: 'Saudi Kabsa Recipe' },
  { keywords: ['lentil soup', 'moroccan'], slug: 'moroccan-lentil-soup', title: 'Moroccan Lentil Soup Recipe' },
];

const DishDetailPage: React.FC = () => {
  const { dir, language } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const [dish, setDish] = useState<DbDish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    async function load() {
      if (!id || !supabase) {
        setError('Missing dish id or database configuration.');
        if (!cancelled) setLoading(false);
        return;
      }

      const { data, error: sbError } = await supabase
        .from('dishes')
        .select('id,name_en,name_ar,name_fr,name_es,name_de,cal_100,protein,carbs,fat,fiber,sugar,sodium,sat_fat,region,meal_type,healthy,is_fried,is_sweet')
        .eq('id', id)
        .maybeSingle<DbDish>();

      if (sbError) {
        setError(sbError.message);
      } else if (!data) {
        setError('Dish not found.');
      } else {
        setDish(data);
      }

      if (!cancelled) setLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const locale = (language || 'en').split('-')[0] as keyof Pick<DbDish, 'name_en' | 'name_ar' | 'name_fr' | 'name_es' | 'name_de'>;
  const localeKey = `name_${locale}` as keyof DbDish;
  const name = dish ? ((dish[localeKey] as string) || dish.name_en || '') : '';
  const region = dish?.region ? String(dish.region).replace('pan_', '').replace(/_/g, ' ') : '';
  const mealType = dish?.meal_type ? String(dish.meal_type).replace(/_/g, ' ') : '';

  const fmt = (value: number | null | undefined, unit: string) =>
    value == null ? 'N/A' : `${Math.round(value)}${unit}`;

  const caloriesRaw = dish?.cal_100 ?? null;
  const proteinRaw = dish?.protein ?? null;
  const carbsRaw = dish?.carbs ?? null;
  const fatRaw = dish?.fat ?? null;
  const fiberRaw = dish?.fiber ?? null;
  const sugarRaw = dish?.sugar ?? null;
  const sodiumRaw = dish?.sodium ?? null;
  const satFatRaw = dish?.sat_fat ?? null;

  const generateHealthDescription = () => {
    if (!dish) return '';
    const parts: string[] = [];

    if (dish.healthy) {
      parts.push(`This dish is marked as a healthy choice, with balanced macros that fit well into a nutritious eating plan.`);
    }
    if (dish.is_fried) {
      parts.push(`It is prepared fried, so enjoy it in moderation alongside lighter options.`);
    }
    if (dish.is_sweet) {
      parts.push(`This is a sweet preparation, best kept as an occasional treat within a balanced diet.`);
    }
    if ((proteinRaw ?? 0) >= 20) {
      parts.push(`At ${proteinRaw ?? 0}g of protein per 100g, it makes a solid protein source for meals and recovery.`);
    } else if ((proteinRaw ?? 0) >= 12) {
      parts.push(`It provides a moderate amount of protein to help keep you satisfied.`);
    }
    if ((carbsRaw ?? 0) >= 40) {
      parts.push(`With ${carbsRaw ?? 0}g of carbs per 100g, it is fairly energy-dense and useful around active periods.`);
    }
    if ((fatRaw ?? 0) >= 18) {
      parts.push(`The fat content is ${fatRaw ?? 0}g per 100g, so portion awareness helps keep overall intake balanced.`);
    } else if ((fatRaw ?? 0) <= 5) {
      parts.push(`Low in fat at ${fatRaw ?? 0}g per 100g, it can suit lighter meal plans.`);
    }
    if ((fiberRaw ?? 0) >= 5) {
      parts.push(`It contains ${fiberRaw ?? 0}g of fiber, which supports digestion and steady energy.`);
    }
    if ((sugarRaw ?? 0) > 15) {
      parts.push(`Sugar content is ${sugarRaw ?? 0}g per 100g, so consider pairing it with fiber or protein to smooth absorption.`);
    }
    if ((sodiumRaw ?? 0) >= 400) {
      parts.push(`Sodium is ${sodiumRaw ?? 0}mg per 100g, so balance it with lower-sodium sides and hydration.`);
    }

    if (!parts.length) {
      parts.push(`This dish offers ${fmt(caloriesRaw, ' kcal')} per 100g with a straightforward macronutrient profile you can fit into your daily targets.`);
    }

    return parts.slice(0, 2).join(' ');
  };

  const description = `${name} nutrition: ${fmt(caloriesRaw, ' kcal')} per 100g, ${fmt(proteinRaw, 'g protein')}. ${generateHealthDescription()}`;

  const healthBenefits = (() => {
    if (!dish) return [];
    const benefits: string[] = [];
    if (proteinRaw != null && proteinRaw >= 15) benefits.push('High in protein, which supports muscle repair and growth.');
    if (fiberRaw != null && fiberRaw >= 5) benefits.push('Rich in dietary fiber, promoting healthy digestion.');
    if (fatRaw != null && fatRaw <= 5) benefits.push('Low in fat, making it a suitable choice for weight management.');
    if (carbsRaw != null && carbsRaw <= 15) benefits.push('Low in carbohydrates, fitting well into low-carb diets.');
    if (dish.healthy === true) benefits.push('Marked as a healthy choice by our nutritional guidelines.');
    if (dish.is_fried === true) benefits.push('Note: This dish is fried. Consume in moderation as part of a balanced diet.');
    return benefits;
  })();

  const matchedRecipe = (() => {
    if (!dish) return null;
    const searchText = (dish.name_en || '').toLowerCase();
    return RECIPE_LINKS.find(recipe => recipe.keywords.some(keyword => searchText.includes(keyword))) || null;
  })();

  const nutritionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NutritionInformation',
    name,
    calories: fmt(caloriesRaw, ' calories'),
    proteinContent: fmt(proteinRaw, ' g'),
    carbohydrateContent: fmt(carbsRaw, ' g'),
    fatContent: fmt(fatRaw, ' g'),
    fiberContent: fmt(fiberRaw, ' g'),
    sugarContent: fmt(sugarRaw, ' g'),
    sodiumContent: fmt(sodiumRaw, ' mg'),
    saturatedFatContent: fmt(satFatRaw, ' g'),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6" dir={dir}>
        <div className="text-center text-sm font-semibold text-slate-500">Loading dish…</div>
      </div>
    );
  }

  if (error || !dish) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6" dir={dir}>
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">🍽️</div>
          <h1 className="text-2xl font-extrabold text-gray-900">Dish not found</h1>
          <p className="mt-2 text-sm text-slate-500">{error}</p>
          <Link to="/food-library" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4A017] px-6 py-3 text-sm font-extrabold text-[#0F4C3A] hover:bg-[#B8860B] transition-colors">
            <ArrowLeft size={16} className="rtl:rotate-180" />
            Back to Food Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <SEO type="article" title={`${name} Nutrition Facts & Calories`} description={description} url={`/food-library/${dish.id}`} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(nutritionJsonLd)}</script>
      </Helmet>

      <div className="max-w-[720px] mx-auto px-6 pt-16 pb-20">
        <div className="flex items-center justify-between gap-3">
          <Link to="/food-library" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#0F4C3A] hover:text-[#D4A017] transition-colors">
            <ArrowLeft size={16} className="rtl:rotate-180" />
            Food Library
          </Link>
          <span className="text-sm font-semibold text-slate-500 truncate max-w-[260px]">{name}</span>
        </div>

        <header className="mt-8 rounded-[32px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-8 text-center shadow-[0_18px_44px_rgba(15,76,58,0.18)]">
          <div className="mx-auto w-20 h-20 rounded-3xl bg-[#F4F1EB] flex items-center justify-center text-5xl shadow-[0_10px_30px_rgba(212,160,23,0.3)]">
            🍽️
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {region && (
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-[#D8E6DF]">{region}</span>
            )}
            {mealType && (
              <span className="rounded-full bg-[#D4A017] px-3 py-1 text-xs font-extrabold text-[#0F4C3A]">{mealType}</span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#FDFBF7]">{name}</h1>
          <p className="mt-3 text-[#D8E6DF] leading-relaxed">{description}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-[#FDFBF7]">
            <span className="inline-flex items-center gap-1.5">
              <Flame size={16} className="text-[#D4A017]" />
              {fmt(caloriesRaw, ' kcal / 100g')}
            </span>
          </div>
        </header>

        <section className="mt-10 rounded-3xl border border-[#EFEBE4] bg-white p-6">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#0F4C3A]">
            <Activity size={18} className="text-[#D4A017]" />
            Nutrition Facts
          </h2>
          <dl className="mt-4 divide-y divide-[#E4DFD4]">
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Calories</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(caloriesRaw, ' kcal')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Protein</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(proteinRaw, ' g')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Carbs</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(carbsRaw, ' g')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Fat</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(fatRaw, ' g')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Fiber</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(fiberRaw, ' g')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Sugar</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(sugarRaw, ' g')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Sodium</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(sodiumRaw, ' mg')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Saturated Fat</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(satFatRaw, ' g')}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-6 rounded-3xl border border-[#EFEBE4] bg-white p-6">
          <h2 className="text-lg font-extrabold text-[#0F4C3A]">Health Profile</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#4A5A55]">{generateHealthDescription()}</p>
        </section>

        {healthBenefits.length > 0 && (
          <section className="mt-6 rounded-3xl border border-[#EFEBE4] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#0F4C3A] mt-8 mb-4">Health Benefits & Considerations</h3>
            <ul className="space-y-3">
              {healthBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#4A5A55]">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4A017]/10 text-[#0F4C3A]">
                    <Check size={14} />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {matchedRecipe && (
          <section className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-sm font-semibold text-emerald-900">Want to cook this? Check out our full recipe.</p>
            <Link to={`/resources/recipe/${matchedRecipe.slug}`} className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0F4C3A] px-5 py-3 text-sm font-extrabold text-[#FDFBF7] hover:bg-[#1a6b53] transition-colors">
              {matchedRecipe.title}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </section>
        )}
      </div>
    </div>
  );
};

export default DishDetailPage;
