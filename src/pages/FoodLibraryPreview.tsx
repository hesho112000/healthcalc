import React, { useMemo, useState } from 'react';
import { Check, ChevronDown, Filter, Leaf, Search, SlidersHorizontal, X } from 'lucide-react';

type Variation = 1 | 2 | 3;
type CalorieRange = 'all' | 'under-250' | '250-450' | 'over-450';
type Diet = 'all' | 'vegetarian' | 'vegan' | 'high-protein';
type Dish = {
  name: string;
  cuisine: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prep: string;
  emoji: string;
  color: string;
  vegetarian: boolean;
  vegan: boolean;
};

const dishes: Dish[] = [
  { name: 'Avocado chickpea toast', cuisine: 'Mediterranean', calories: 342, protein: 13, carbs: 39, fat: 16, prep: '10 min', emoji: '🥑', color: 'bg-lime-100', vegetarian: true, vegan: true },
  { name: 'Miso-glazed salmon bowl', cuisine: 'Japanese', calories: 486, protein: 36, carbs: 52, fat: 15, prep: '25 min', emoji: '🍣', color: 'bg-orange-100', vegetarian: false, vegan: false },
  { name: 'Lemon herb lentil soup', cuisine: 'Mediterranean', calories: 228, protein: 14, carbs: 34, fat: 5, prep: '30 min', emoji: '🍲', color: 'bg-yellow-100', vegetarian: true, vegan: true },
  { name: 'Chicken shawarma plate', cuisine: 'Middle Eastern', calories: 518, protein: 42, carbs: 44, fat: 19, prep: '35 min', emoji: '🍗', color: 'bg-amber-100', vegetarian: false, vegan: false },
  { name: 'Crispy tofu noodle salad', cuisine: 'Thai', calories: 395, protein: 21, carbs: 48, fat: 14, prep: '20 min', emoji: '🥗', color: 'bg-emerald-100', vegetarian: true, vegan: true },
  { name: 'Berry overnight oats', cuisine: 'American', calories: 286, protein: 12, carbs: 44, fat: 8, prep: '5 min', emoji: '🫐', color: 'bg-violet-100', vegetarian: true, vegan: false },
  { name: 'Black bean taco bowl', cuisine: 'Mexican', calories: 428, protein: 19, carbs: 62, fat: 12, prep: '20 min', emoji: '🌮', color: 'bg-red-100', vegetarian: true, vegan: true },
  { name: 'Spinach feta omelette', cuisine: 'French', calories: 312, protein: 24, carbs: 7, fat: 22, prep: '12 min', emoji: '🍳', color: 'bg-green-100', vegetarian: true, vegan: false },
  { name: 'Ginger beef rice bowl', cuisine: 'Korean', calories: 552, protein: 38, carbs: 66, fat: 16, prep: '25 min', emoji: '🍚', color: 'bg-rose-100', vegetarian: false, vegan: false },
  { name: 'Roasted veggie quinoa', cuisine: 'Mediterranean', calories: 374, protein: 16, carbs: 55, fat: 11, prep: '30 min', emoji: '🥙', color: 'bg-teal-100', vegetarian: true, vegan: true },
  { name: 'Coconut chickpea curry', cuisine: 'Indian', calories: 461, protein: 18, carbs: 58, fat: 18, prep: '35 min', emoji: '🍛', color: 'bg-orange-100', vegetarian: true, vegan: true },
  { name: 'Turkey lettuce wraps', cuisine: 'Chinese', calories: 264, protein: 31, carbs: 18, fat: 9, prep: '18 min', emoji: '🥬', color: 'bg-lime-100', vegetarian: false, vegan: false },
  { name: 'Dark chocolate chia pudding', cuisine: 'American', calories: 198, protein: 8, carbs: 23, fat: 10, prep: '8 min', emoji: '🍫', color: 'bg-stone-100', vegetarian: true, vegan: true },
  { name: 'Herby white bean salad', cuisine: 'Italian', calories: 336, protein: 17, carbs: 42, fat: 10, prep: '15 min', emoji: '🫘', color: 'bg-yellow-100', vegetarian: true, vegan: true },
  { name: 'Grilled shrimp couscous', cuisine: 'Moroccan', calories: 407, protein: 32, carbs: 49, fat: 9, prep: '22 min', emoji: '🍤', color: 'bg-pink-100', vegetarian: false, vegan: false },
  { name: 'Peanut butter banana smoothie', cuisine: 'American', calories: 389, protein: 22, carbs: 43, fat: 16, prep: '5 min', emoji: '🍌', color: 'bg-yellow-100', vegetarian: true, vegan: false },
];

const calorieOptions: { value: CalorieRange; label: string }[] = [
  { value: 'all', label: 'Any calories' },
  { value: 'under-250', label: 'Under 250' },
  { value: '250-450', label: '250–450' },
  { value: 'over-450', label: '450+' },
];
const cuisines = ['All cuisines', ...Array.from(new Set(dishes.map((dish) => dish.cuisine)))];

const FoodLibraryPreview: React.FC = () => {
  const [variation, setVariation] = useState<Variation>(1);
  const [search, setSearch] = useState('');
  const [calorieRange, setCalorieRange] = useState<CalorieRange>('all');
  const [cuisine, setCuisine] = useState('All cuisines');
  const [diet, setDiet] = useState<Diet>('all');
  const [sort, setSort] = useState('recommended');
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredDishes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return dishes
      .filter((dish) => !query || `${dish.name} ${dish.cuisine}`.toLowerCase().includes(query))
      .filter((dish) => cuisine === 'All cuisines' || dish.cuisine === cuisine)
      .filter((dish) => {
        if (calorieRange === 'under-250') return dish.calories < 250;
        if (calorieRange === '250-450') return dish.calories >= 250 && dish.calories <= 450;
        if (calorieRange === 'over-450') return dish.calories > 450;
        return true;
      })
      .filter((dish) => {
        if (diet === 'vegetarian') return dish.vegetarian;
        if (diet === 'vegan') return dish.vegan;
        if (diet === 'high-protein') return dish.protein >= 25;
        return true;
      })
      .sort((a, b) => {
        if (sort === 'calories') return a.calories - b.calories;
        if (sort === 'protein') return b.protein - a.protein;
        return dishes.indexOf(a) - dishes.indexOf(b);
      });
  }, [search, calorieRange, cuisine, diet, sort]);

  const resetFilters = () => {
    setCalorieRange('all');
    setCuisine('All cuisines');
    setDiet('all');
    setSort('recommended');
  };

  const searchField = (compact = false) => (
    <label className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 ${compact ? 'h-11' : 'h-12'} focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10`}>
      <Search size={18} className="shrink-0 text-slate-400" aria-hidden="true" />
      <span className="sr-only">Search dishes or cuisines</span>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search dishes, ingredients, cuisines…"
        className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />
      {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search" className="text-slate-400 hover:text-slate-700"><X size={16} /></button>}
    </label>
  );

  const calorieChoices = (small = false) => (
    <div className="flex flex-wrap gap-2" aria-label="Filter by calories">
      {calorieOptions.map((option) => (
        <button
          type="button"
          key={option.value}
          aria-pressed={calorieRange === option.value}
          onClick={() => setCalorieRange(option.value)}
          className={`rounded-full border font-semibold transition ${small ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'} ${calorieRange === option.value ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-800'}`}
        >{option.label}</button>
      ))}
    </div>
  );

  const cuisineSelect = (small = false) => (
    <label className="relative block">
      <span className="sr-only">Cuisine</span>
      <select value={cuisine} onChange={(event) => setCuisine(event.target.value)} className={`w-full appearance-none rounded-xl border border-slate-200 bg-white pr-10 text-slate-700 outline-none focus:border-emerald-500 ${small ? 'h-11 pl-3 text-sm' : 'h-12 pl-4 text-sm'}`}>
        {cuisines.map((option) => <option key={option}>{option}</option>)}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
    </label>
  );

  const fullFilters = () => (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <fieldset className="min-w-0">
        <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Calories</legend>
        {calorieChoices(true)}
      </fieldset>
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Cuisine</label>
        {cuisineSelect(true)}
      </div>
      <div>
        <label htmlFor="diet-filter" className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Dietary preference</label>
        <select id="diet-filter" value={diet} onChange={(event) => setDiet(event.target.value as Diet)} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-500">
          <option value="all">Any preference</option><option value="vegetarian">Vegetarian</option><option value="vegan">Vegan</option><option value="high-protein">High protein</option>
        </select>
      </div>
      <div>
        <label htmlFor="sort-dishes" className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Sort by</label>
        <select id="sort-dishes" value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-500">
          <option value="recommended">Recommended</option><option value="calories">Lowest calories</option><option value="protein">Highest protein</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f8f4] text-slate-900">
      <nav aria-label="Food library preview variations" className="sticky top-[72px] z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <span className="hidden shrink-0 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400 md:block">Preview</span>
          {([
            { id: 1, title: '01 · Glass Dock' },
            { id: 2, title: '02 · Accordion' },
            { id: 3, title: '03 · Bottom Sheet' },
          ] as const).map((item) => (
            <button key={item.id} type="button" aria-pressed={variation === item.id} onClick={() => setVariation(item.id)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${variation === item.id ? 'bg-emerald-800 text-white shadow' : 'text-slate-600 hover:bg-slate-100'}`}>
              {item.title}
            </button>
          ))}
          <span className="ml-auto hidden shrink-0 text-xs font-medium text-slate-400 sm:block">Sandbox · Food discovery</span>
        </div>
      </nav>

      <main>
        <section className="mx-auto max-w-7xl px-4 pb-7 pt-9 sm:px-6 lg:px-8 lg:pt-12">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-emerald-800"><Leaf size={14} /> Food Library · UI concept</p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Find your next feel-good meal.</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">Explore balanced dishes from around the world. Choose a search and filter experience to preview.</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl">🥗</span>
              <div><div className="text-lg font-extrabold leading-5">{filteredDishes.length}</div><div className="mt-1 text-xs text-slate-500">recipes to explore</div></div>
            </div>
          </div>
        </section>

        {variation === 1 && (
          <section aria-label="Glass Dock filters" className="sticky top-[128px] z-30 border-y border-slate-200 bg-white/90 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
              <div className="grid gap-3 lg:grid-cols-[minmax(220px,1fr)_auto_190px] lg:items-center">
                {searchField(true)}
                <div className="flex items-center gap-2"><span className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-slate-400">Calories</span>{calorieChoices(true)}</div>
                {cuisineSelect(true)}
              </div>
            </div>
          </section>
        )}

        {variation === 2 && (
          <section aria-label="Accordion filters" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="sticky top-[128px] z-30 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
              <div className="flex items-center gap-3">
                {searchField(true)}
                <button type="button" aria-expanded={accordionOpen} aria-controls="preview-accordion-filters" onClick={() => setAccordionOpen((open) => !open)} className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-bold transition ${accordionOpen ? 'border-emerald-800 bg-emerald-800 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-500'}`}>
                  <SlidersHorizontal size={16} /> Filter{(cuisine !== 'All cuisines' || calorieRange !== 'all' || diet !== 'all') && <span className="h-2 w-2 rounded-full bg-amber-400" />}
                </button>
              </div>
            </div>
            {accordionOpen && <div id="preview-accordion-filters" className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">{fullFilters()}</div>}
          </section>
        )}

        {variation === 3 && (
          <section aria-label="Bottom sheet filters" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              {searchField()}
              <button type="button" onClick={() => setSheetOpen(true)} className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-emerald-800 px-4 text-sm font-bold text-white transition hover:bg-emerald-900 sm:px-5"><Filter size={17} /> Filter</button>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-4 pb-16 pt-7 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div><h2 className="text-lg font-extrabold text-slate-900">Popular picks</h2><p className="mt-0.5 text-sm text-slate-500">Good food, thoughtfully portioned.</p></div>
            <button type="button" onClick={() => { setSearch(''); resetFilters(); }} className="text-sm font-semibold text-emerald-800 hover:text-emerald-950">Clear filters</button>
          </div>
          {filteredDishes.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDishes.map((dish) => (
                <article key={dish.name} className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_14px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                  <div className={`relative flex h-32 items-center justify-center ${dish.color}`}>
                    <span aria-hidden="true" className="text-6xl drop-shadow-sm transition-transform duration-200 group-hover:scale-110">{dish.emoji}</span>
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-600 backdrop-blur">{dish.prep}</span>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between gap-3"><div><p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700">{dish.cuisine}</p><h3 className="mt-1 font-extrabold leading-snug text-slate-900">{dish.name}</h3></div><span className="shrink-0 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-extrabold text-emerald-800">{dish.calories} <span className="font-semibold">kcal</span></span></div>
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500"><span className="rounded-full bg-slate-50 px-2.5 py-1">{dish.protein}g protein</span><span className="rounded-full bg-slate-50 px-2.5 py-1">{dish.carbs}g carbs</span><span className="rounded-full bg-slate-50 px-2.5 py-1">{dish.fat}g fat</span>{dish.vegan && <span className="inline-flex items-center gap-1 rounded-full bg-lime-50 px-2.5 py-1 text-lime-800"><Check size={12} /> Vegan</span>}</div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><p className="text-lg font-bold text-slate-700">No dishes match those filters</p><p className="mt-1 text-sm text-slate-500">Try another search or clear a filter.</p><button type="button" onClick={() => { setSearch(''); resetFilters(); }} className="mt-4 rounded-full bg-emerald-800 px-4 py-2 text-sm font-bold text-white">Reset filters</button></div>
          )}
          <p className="mt-8 text-center text-xs text-slate-400">Sample dishes for layout preview · Filter controls are interactive</p>
        </section>
      </main>

      {variation === 3 && sheetOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/45 backdrop-blur-[2px] sm:items-center sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setSheetOpen(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="filter-sheet-title" className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:max-w-2xl sm:rounded-3xl sm:p-7">
            <div className="mb-6 flex items-start justify-between border-b border-slate-100 pb-5">
              <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Personalize your plate</p><h2 id="filter-sheet-title" className="mt-1 text-2xl font-black">Filters</h2><p className="mt-1 text-sm text-slate-500">Fine-tune what sounds good today.</p></div>
              <button type="button" aria-label="Close filters" onClick={() => setSheetOpen(false)} className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"><X size={19} /></button>
            </div>
            {fullFilters()}
            <div className="mt-7 flex items-center justify-between gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={resetFilters} className="px-2 py-2 text-sm font-bold text-slate-500 hover:text-slate-900">Reset all</button><button type="button" onClick={() => setSheetOpen(false)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900"><Check size={16} /> Show {filteredDishes.length} dishes</button></div>
          </section>
        </div>
      )}
    </div>
  );
};

export default FoodLibraryPreview;
