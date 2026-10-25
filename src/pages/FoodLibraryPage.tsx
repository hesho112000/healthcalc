import React, { useState, useMemo } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { FOODS_DATABASE, CUISINE_META, CUISINE_GROUPS, Cuisine, FoodItem } from '../utils/calculations_expanded';
import Flag, { isCountryCode } from '../components/common/Flag';
import { useLanguage } from '../context/LanguageContext';
import { getPortionMeasure } from '../utils/cuisineCatalog';
import type { Language } from '../types';

const ARABIC_SCRIPT = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
const PAGE_SIZE = 50;
const LOAD_MORE_LABEL: Record<Language, string> = {
  en: 'Load more',
  fr: 'Charger plus',
  es: 'Cargar más',
  ar: 'تحميل المزيد',
  de: 'Mehr laden',
};
const FOOD_KEYS = new WeakMap<FoodItem, number>();
FOODS_DATABASE.forEach((food, index) => FOOD_KEYS.set(food, index));

const MemoizedFoodRow: React.FC<{ food: FoodItem }> = React.memo(({ food }) => {
  const { language, t } = useLanguage();
  const englishName = [food.name_en, food.name]
    .map((name) => typeof name === 'string' ? name.trim() : '')
    .find((name) => name.length > 0 && !ARABIC_SCRIPT.test(name))
    ?? t('foodLibUnknownName');
  const name = language === 'ar'
    ? (typeof food.name_ar === 'string' ? food.name_ar.trim() : '') || englishName
    : englishName;
  const gramsSuffix = ({ en: 'g', fr: 'g', es: 'g', ar: 'جم', de: 'g' } satisfies Record<Language, string>)[language];
  const cuisineName = (meta: { label_ar: string; label_en: string }): string => language === 'ar' ? meta.label_ar : meta.label_en;

  return (
    <tr className="border-b last:border-0 hover:bg-green-50/50 transition group">
      <td className="py-4 px-6">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-gray-900 group-hover:text-green-700 transition">{name}</span>
          {food.verified && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-[8px] font-bold text-white" title={`USDA ${t('foodLibColCalories')}`}>{t('foodLibUsdaBadge')} ✓</span>
          )}
        </div>
        {language === 'ar' && food.name_en !== name && (
          <div className="text-xs text-gray-400">{food.name_en}</div>
        )}
      </td>
      <td className="py-4 px-4">
        <div className="flex flex-wrap gap-1">
          {food.cuisine.slice(0, 2).map((c) => (
            <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 border">
              {CUISINE_META[c] && isCountryCode(CUISINE_META[c].flag)
                ? <Flag countryCode={CUISINE_META[c].flag} alt={`${cuisineName(CUISINE_META[c])} flag`} className="h-3 w-4" />
                : CUISINE_META[c]?.flag}
              {' '}{CUISINE_META[c] ? cuisineName(CUISINE_META[c]) : c}
            </span>
          ))}
        </div>
      </td>
      <td className="py-4 px-4 text-sm text-gray-600">
        <div>{getPortionMeasure(food.portion, language)}</div>
        <span className="inline-block mt-1 bg-gray-100 border text-gray-600 px-2 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap">
          {food.portion.grams}{gramsSuffix} • {food.calories} kcal
        </span>
      </td>
      <td className="py-4 px-3 text-center">
        <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
          food.calories < 100 ? 'bg-green-100 text-green-700' :
          food.calories < 180 ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {food.calories}
        </span>
      </td>
      <td className="py-4 px-3 text-center text-sm font-bold text-gray-700">{food.protein}{gramsSuffix}</td>
      <td className="py-4 px-3 text-center text-sm text-gray-500">{food.carbs}{gramsSuffix}</td>
      <td className="py-4 px-3 text-center text-sm text-gray-500">{food.fat}{gramsSuffix}</td>
    </tr>
  );
});

const FoodLibraryPage: React.FC = () => {
  const { language, t, dir } = useLanguage();
  const englishArabicLabel = (english: string, arabic: string): string => ({
    en: english,
    fr: english,
    es: english,
    ar: arabic,
    de: english,
  } satisfies Record<Language, string>)[language];
  const cuisineName = (meta: { label_ar: string; label_en: string }): string => englishArabicLabel(meta.label_en, meta.label_ar);
  const orderedCuisineGroups = useMemo(
    () => [...CUISINE_GROUPS].sort((a, b) => (a.region === 'Special Diets' ? 1 : 0) - (b.region === 'Special Diets' ? 1 : 0)),
    [],
  );
  const [search, setSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | 'all'>('all');
  const [calorieFilter, setCalorieFilter] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<'calories' | 'protein' | 'name'>('calories');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredFoods = useMemo(() => {
    let foods = [...FOODS_DATABASE];
    const searchTerm = search.trim().toLocaleLowerCase(language);

    if (searchTerm) {
      foods = foods.filter((food) => [food.name, food.name_ar, food.name_en].some(
        (name) => typeof name === 'string' && name.toLocaleLowerCase(language).includes(searchTerm),
      ));
    }

    if (selectedCuisine !== 'all') {
      foods = foods.filter(f => f.cuisine.includes(selectedCuisine));
    }

    foods = foods.filter(f => f.calories >= calorieFilter[0] && f.calories <= calorieFilter[1]);

    foods.sort((a, b) => {
      if (sortBy === 'calories') return a.calories - b.calories;
      if (sortBy === 'protein') return b.protein - a.protein;
      const nameA = language === 'ar' ? a.name_ar || a.name_en : a.name_en || a.name;
      const nameB = language === 'ar' ? b.name_ar || b.name_en : b.name_en || b.name;
      const displayNameA = nameA.trim() && !ARABIC_SCRIPT.test(nameA) ? nameA : a.name.trim() && !ARABIC_SCRIPT.test(a.name) ? a.name : t('foodLibUnknownName');
      const displayNameB = nameB.trim() && !ARABIC_SCRIPT.test(nameB) ? nameB : b.name.trim() && !ARABIC_SCRIPT.test(b.name) ? b.name : t('foodLibUnknownName');
      return displayNameA.localeCompare(displayNameB, language);
    });

    return foods;
  }, [search, selectedCuisine, calorieFilter, sortBy, language, t]);
  const visibleFoods = useMemo(() => filteredFoods.slice(0, visibleCount), [filteredFoods, visibleCount]);

  const calorieOptions: { label: string; range: [number, number] }[] = [
    { label: t('foodLibCalLow'), range: [0, 150] },
    { label: t('foodLibCalMid'), range: [150, 250] },
    { label: t('foodLibCalHigh'), range: [250, 500] },
    { label: t('foodLibCalAll'), range: [0, 500] },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]" dir={dir}>
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-3">📚 {t('foodLibTitle')}</h1>
          <p className="text-lg opacity-90">{t('foodLibSubtitle')}</p>
          <div className="mt-4 inline-flex bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm">
            🔍 {t('foodLibSearchBadge')}
          </div>
        </div>
      </div>

      <section aria-label={t('foodLibSearchLabel')} className="sticky top-[72px] z-30 border-b border-gray-200 bg-white/90 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="grid gap-3 lg:grid-cols-[minmax(220px,1fr)_minmax(190px,0.8fr)_minmax(180px,0.65fr)] lg:items-end">
            <div>
              <label htmlFor="food-library-search" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-gray-500">🔍 {t('foodLibSearchLabel')}</label>
              <div className="relative">
                <Search size={17} aria-hidden="true" className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="food-library-search"
                  type="search"
                  placeholder={t('foodLibSearchPlaceholder')}
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white ps-10 pe-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="food-library-cuisine" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-gray-500">🍽️ {t('foodLibCuisineLabel')}</label>
              <div className="relative">
                <select
                  id="food-library-cuisine"
                  value={selectedCuisine}
                  onChange={(e) => { setSelectedCuisine(e.target.value as Cuisine | 'all'); setVisibleCount(PAGE_SIZE); }}
                  className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white ps-4 pe-10 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                >
                  <option value="all">🌍 {t('foodLibAllCuisines')} ({FOODS_DATABASE.length})</option>
                  {orderedCuisineGroups.map((group) => (
                    <optgroup key={group.region} label={englishArabicLabel(group.region, group.regionAr)}>
                      {group.items.map((item) => (
                        <option key={item.id} value={item.id}>
                          {englishArabicLabel(item.nameEn, item.nameAr)}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="food-library-sort" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-gray-500">📊 {t('foodLibSortLabel')}</label>
              <div className="relative">
                <select
                  id="food-library-sort"
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value as 'calories' | 'protein' | 'name'); setVisibleCount(PAGE_SIZE); }}
                  className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white ps-4 pe-10 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                >
                  <option value="calories">🔥 {t('foodLibSortCalories')}</option>
                  <option value="protein">💪 {t('foodLibSortHighProtein')}</option>
                  <option value="name">🔤 {t('foodLibSortName')}</option>
                </select>
                <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5 border-t border-gray-100 pt-3">
            <span className="me-1 text-[11px] font-bold uppercase tracking-wide text-gray-500">{t('foodLibCaloriesFilter')}</span>
            {calorieOptions.map((opt) => (
              <button
                type="button"
                key={opt.range.join('-')}
                aria-pressed={calorieFilter[0] === opt.range[0] && calorieFilter[1] === opt.range[1]}
                onClick={() => { setCalorieFilter(opt.range); setVisibleCount(PAGE_SIZE); }}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition sm:px-4 ${
                  calorieFilter[0] === opt.range[0] && calorieFilter[1] === opt.range[1]
                    ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-400 hover:text-emerald-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
            <span className="ms-auto text-xs text-gray-400">{filteredFoods.length} {t('foodLibResults')}</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Food table */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b text-[11px] uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4 font-bold text-start">{t('foodLibColItem')}</th>
                  <th className="px-4 py-4 font-bold text-start">{t('foodLibColCuisine')}</th>
                  <th className="px-4 py-4 font-bold text-start">{t('foodLibColPortion')}</th>
                  <th className="px-3 py-4 font-bold text-center">🔥 {t('foodLibColCalories')}</th>
                  <th className="px-3 py-4 font-bold text-center">💪 {t('foodLibColProtein')}</th>
                  <th className="px-3 py-4 font-bold text-center">🍞 {t('foodLibColCarbs')}</th>
                  <th className="px-3 py-4 font-bold text-center">🥑 {t('foodLibColFat')}</th>
                </tr>
              </thead>
              <tbody>
                {visibleFoods.map((food) => (
                  <MemoizedFoodRow key={FOOD_KEYS.get(food)} food={food} />
                ))}
              </tbody>
            </table>
          </div>

          {filteredFoods.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-500 font-medium">{t('foodLibNoResults')}</p>
              <button onClick={() => { setSearch(''); setSelectedCuisine('all'); setCalorieFilter([0, 500]); setVisibleCount(PAGE_SIZE); }} className="mt-3 text-green-600 font-bold text-sm">
                {t('foodLibClearFilters')}
              </button>
            </div>
          )}
          {visibleCount < filteredFoods.length && (
            <div className="border-t p-4 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, filteredFoods.length))}
                className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition"
              >
                {LOAD_MORE_LABEL[language]} ({Math.min(PAGE_SIZE, filteredFoods.length - visibleCount)})
              </button>
            </div>
          )}
        </div>

        {/* SEO Footer */}
        <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6">
          <h3 className="font-bold mb-2">💡 {t('foodLibSeoTitle')}</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            {t('foodLibSeoBody')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodLibraryPage;
