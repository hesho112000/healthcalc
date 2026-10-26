import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Flame, Activity } from 'lucide-react';
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

  const calories = Math.round(dish?.cal_100 ?? 0);
  const protein = Math.round(dish?.protein ?? 0);
  const carbs = Math.round(dish?.carbs ?? 0);
  const fat = Math.round(dish?.fat ?? 0);
  const fiber = Math.round(dish?.fiber ?? 0);
  const sugar = Math.round(dish?.sugar ?? 0);
  const sodium = Math.round(dish?.sodium ?? 0);
  const satFat = Math.round(dish?.sat_fat ?? 0);

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
    if (protein >= 20) {
      parts.push(`At ${protein}g of protein per 100g, it makes a solid protein source for meals and recovery.`);
    } else if (protein >= 12) {
      parts.push(`It provides a moderate amount of protein to help keep you satisfied.`);
    }
    if (carbs >= 40) {
      parts.push(`With ${carbs}g of carbs per 100g, it is fairly energy-dense and useful around active periods.`);
    }
    if (fat >= 18) {
      parts.push(`The fat content is ${fat}g per 100g, so portion awareness helps keep overall intake balanced.`);
    } else if (fat <= 5) {
      parts.push(`Low in fat at ${fat}g per 100g, it can suit lighter meal plans.`);
    }
    if (fiber >= 5) {
      parts.push(`It contains ${fiber}g of fiber, which supports digestion and steady energy.`);
    }
    if (sugar > 15) {
      parts.push(`Sugar content is ${sugar}g per 100g, so consider pairing it with fiber or protein to smooth absorption.`);
    }
    if (sodium >= 400) {
      parts.push(`Sodium is ${sodium}mg per 100g, so balance it with lower-sodium sides and hydration.`);
    }

    if (!parts.length) {
      parts.push(`This dish offers ${calories} kcal per 100g with a straightforward macronutrient profile you can fit into your daily targets.`);
    }

    return parts.slice(0, 2).join(' ');
  };

  const description = `${name} nutrition: ${calories} kcal per 100g, ${protein}g protein. ${generateHealthDescription()}`;

  const nutritionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NutritionInformation',
    name,
    calories: `${calories} calories`,
    proteinContent: `${protein} g`,
    carbohydrateContent: `${carbs} g`,
    fatContent: `${fat} g`,
    fiberContent: `${fiber} g`,
    sugarContent: `${sugar} g`,
    sodiumContent: `${sodium} mg`,
    saturatedFatContent: `${satFat} g`,
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
              {calories} kcal / 100g
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
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{calories} kcal</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Protein</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{protein} g</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Carbs</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{carbs} g</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Fat</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fat} g</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Fiber</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fiber} g</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Sugar</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{sugar} g</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Sodium</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{sodium} mg</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">Saturated Fat</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{satFat} g</dd>
            </div>
          </dl>
        </section>

        <section className="mt-6 rounded-3xl border border-[#EFEBE4] bg-white p-6">
          <h2 className="text-lg font-extrabold text-[#0F4C3A]">Health Profile</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#4A5A55]">{generateHealthDescription()}</p>
        </section>
      </div>
    </div>
  );
};

export default DishDetailPage;
