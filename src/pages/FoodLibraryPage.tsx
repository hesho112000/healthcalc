import React, { useState, useMemo } from 'react';
import { ChevronDown, Flame, Search, UtensilsCrossed } from 'lucide-react';
import { CUISINE_META, CUISINE_GROUPS } from '../utils/calculations_expanded';
import type { Cuisine } from '../utils/calculations_expanded';
import Flag, { isCountryCode } from '../components/common/Flag';
import { useLanguage } from '../context/LanguageContext';
import { getDishName, type KitchenDish } from '../data/kitchens';
import { useKitchenDishes } from '../hooks/useKitchenDishes';
import { KITCHEN_ID_ALIAS } from '../hooks/useKitchenDishCounts';
import { isAuthenticForKitchen, KITCHEN_REGION_FAMILIES } from '../utils/kitchenAuthenticity';
import type { Language } from '../types';

const PAGE_SIZE = 50;
const INVALID_DISH_NAME = 'unnamed food';
const LOAD_MORE_LABEL: Record<Language, string> = {
  en: 'Load more',
  fr: 'Charger plus',
  es: 'Cargar más',
  ar: 'تحميل المزيد',
  de: 'Mehr laden',
};
const CUISINE_IDS = [...new Set(CUISINE_GROUPS.flatMap((group) => group.items.map((item) => item.id)))];
const CARD_ART = [
  'from-emerald-100 via-teal-50 to-white text-emerald-800',
  'from-amber-100 via-orange-50 to-white text-orange-800',
  'from-sky-100 via-cyan-50 to-white text-cyan-800',
  'from-rose-100 via-pink-50 to-white text-rose-800',
  'from-violet-100 via-fuchsia-50 to-white text-violet-800',
  'from-lime-100 via-green-50 to-white text-green-800',
];
const isUsableName = (name: string | null | undefined): name is string =>
  typeof name === 'string' && name.trim().length > 0 && name.trim().toLocaleLowerCase() !== INVALID_DISH_NAME;

const getDisplayName = (dish: KitchenDish, language: Language): string => {
  const localized = getDishName(dish, language).trim();
  if (isUsableName(localized)) return localized;
  return [dish.nameEn, dish.name, dish.nameAr, dish.nameFr, dish.nameEs, dish.nameDe]
    .find(isUsableName)?.trim() ?? '';
};

const getDishCuisineIds = (dish: KitchenDish): string[] => {
  const nativeName = dish.nameAr ?? dish.name;
  if (!dish.region) {
    return isAuthenticForKitchen('saudi', null, nativeName) ? ['saudi'] : [];
  }
  return CUISINE_IDS.filter((id) => {
    const canonicalId = KITCHEN_ID_ALIAS[id] ?? id;
    return Boolean(KITCHEN_REGION_FAMILIES[canonicalId])
      && isAuthenticForKitchen(canonicalId, dish.region, nativeName);
  });
};

interface LibraryDish {
  dish: KitchenDish;
  name: string;
  cuisines: string[];
}

const FoodLibraryPage: React.FC = () => {
  const { language, t, dir } = useLanguage();
  const { allDishes, loading, error } = useKitchenDishes({ includeAllDishes: true });
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
  const [calorieFilter, setCalorieFilter] = useState<[number, number]>([0, Number.POSITIVE_INFINITY]);
  const [sortBy, setSortBy] = useState<'calories' | 'protein' | 'name'>('calories');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const libraryDishes = useMemo<LibraryDish[]>(() => allDishes.flatMap((dish) => {
    const name = getDisplayName(dish, language);
    if (!isUsableName(name)) return [];
    return [{ dish, name, cuisines: getDishCuisineIds(dish) }];
  }), [allDishes, language]);

  const filteredFoods = useMemo(() => {
    const searchTerm = search.trim().toLocaleLowerCase(language);
    return libraryDishes
      .filter(({ dish, name, cuisines }) => {
        if (selectedCuisine !== 'all' && !cuisines.includes(selectedCuisine)) return false;
        if (dish.cal_100 < calorieFilter[0] || dish.cal_100 > calorieFilter[1]) return false;
        if (!searchTerm) return true;
        return [name, dish.name, dish.nameAr, dish.nameEn, dish.nameFr, dish.nameEs, dish.nameDe]
          .some((candidate) => isUsableName(candidate) && candidate.toLocaleLowerCase(language).includes(searchTerm));
      })
      .sort((a, b) => {
        if (sortBy === 'calories') return a.dish.cal_100 - b.dish.cal_100;
        if (sortBy === 'protein') return b.dish.p - a.dish.p;
        return a.name.localeCompare(b.name, language);
      });
  }, [libraryDishes, search, selectedCuisine, calorieFilter, sortBy, language]);
  const visibleFoods = useMemo(() => filteredFoods.slice(0, visibleCount), [filteredFoods, visibleCount]);

  const calorieOptions: { label: string; range: [number, number] }[] = [
    { label: t('foodLibCalLow'), range: [0, 150] },
    { label: t('foodLibCalMid'), range: [150, 250] },
    { label: t('foodLibCalHigh'), range: [250, 500] },
    { label: t('foodLibCalAll'), range: [0, Number.POSITIVE_INFINITY] },
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
                  <option value="all">🌍 {t('foodLibAllCuisines')} ({libraryDishes.length})</option>
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
            <span aria-live="polite" className="ms-auto text-xs text-gray-400">{loading ? '…' : `${filteredFoods.length} ${t('foodLibResults')}`}</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading && libraryDishes.length === 0 ? (
          <div role="status" className="rounded-3xl border border-emerald-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><UtensilsCrossed size={26} /></div>
            <p className="font-semibold text-gray-700">Loading the food library…</p>
          </div>
        ) : error ? (
          <div role="alert" className="rounded-3xl border border-rose-200 bg-white px-6 py-12 text-center shadow-sm">
            <p className="font-bold text-rose-800">Unable to load dishes right now.</p>
            <p className="mt-2 text-sm text-gray-500">{error}</p>
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><Search size={25} /></div>
            <p className="font-semibold text-gray-700">{t('foodLibNoResults')}</p>
            <button type="button" onClick={() => { setSearch(''); setSelectedCuisine('all'); setCalorieFilter([0, Number.POSITIVE_INFINITY]); setSortBy('calories'); setVisibleCount(PAGE_SIZE); }} className="mt-3 text-sm font-bold text-green-700 hover:text-green-900">
              {t('foodLibClearFilters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleFoods.map(({ dish, name, cuisines }, index) => {
              const cuisineId = cuisines[0] as Cuisine | undefined;
              const cuisineMeta = cuisineId ? CUISINE_META[cuisineId] : undefined;
              const cuisineItem = cuisineId ? CUISINE_GROUPS.flatMap((group) => group.items).find((item) => item.id === cuisineId) : undefined;
              const cuisineLabel = cuisineMeta
                ? cuisineName(cuisineMeta)
                : cuisineItem ? englishArabicLabel(cuisineItem.nameEn, cuisineItem.nameAr) : '';
              const gramsSuffix = language === 'ar' ? 'جم' : 'g';

              return (
                <article key={dish.id ?? `${name}-${index}`} className="group overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(15,23,42,0.11)]">
                  <div className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${CARD_ART[index % CARD_ART.length]}`}>
                    <div aria-hidden="true" className="absolute -end-7 -top-10 h-36 w-36 rounded-full border-[22px] border-current opacity-[0.06]" />
                    <div aria-hidden="true" className="absolute -start-8 -bottom-14 h-36 w-36 rounded-full border-[22px] border-current opacity-[0.06]" />
                    <UtensilsCrossed aria-hidden="true" size={43} strokeWidth={1.5} className="relative drop-shadow-sm transition-transform duration-200 group-hover:scale-110" />
                    <span className="absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold text-gray-800 shadow-sm backdrop-blur">
                      <Flame size={14} className="text-orange-500" /> {Math.round(dish.cal_100)} kcal <span className="font-medium text-gray-500">/ 100g</span>
                    </span>
                    {dish.confidence >= 90 && <span className="absolute start-3 top-3 rounded-full border border-white/80 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-800 backdrop-blur">Verified</span>}
                  </div>

                  <div className="p-5">
                    {cuisineLabel && (
                      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-800">
                        {cuisineMeta && isCountryCode(cuisineMeta.flag)
                          ? <Flag countryCode={cuisineMeta.flag} alt={`${cuisineLabel} flag`} className="h-3 w-4" />
                          : <span aria-hidden="true">{cuisineMeta?.flag}</span>}
                        {cuisineLabel}
                      </p>
                    )}
                    <h2 className="min-h-[3.5rem] text-lg font-extrabold leading-snug text-gray-900">{name}</h2>

                    <div className="mt-4 grid grid-cols-3 divide-x divide-gray-100 rounded-2xl bg-gray-50 px-2 py-3 text-center">
                      {[
                        { label: t('foodLibColProtein'), value: dish.p },
                        { label: t('foodLibColCarbs'), value: dish.c },
                        { label: t('foodLibColFat'), value: dish.f },
                      ].map((macro) => (
                        <div key={macro.label} className="px-1">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{macro.label}</p>
                          <p className="mt-1 text-sm font-extrabold tabular-nums text-gray-800">{Math.round(macro.value)}g</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-3 text-xs text-gray-500">
                      <span>{t('foodLibColPortion')}: {Math.round(dish.serv_g)}{gramsSuffix}</span>
                      <span className="font-semibold tabular-nums">{Math.round(dish.cal_serv)} kcal / serving</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        {!loading && !error && visibleCount < filteredFoods.length && (
          <div className="mt-7 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, filteredFoods.length))}
              className="rounded-xl bg-green-700 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-green-800"
            >
              {LOAD_MORE_LABEL[language]} ({Math.min(PAGE_SIZE, filteredFoods.length - visibleCount)})
            </button>
          </div>
        )}

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
