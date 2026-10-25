import { useMemo } from 'react';

export interface Dish {
  id: string;
  name_en?: string | null;
  name_ar?: string | null;
  name_fr?: string | null;
  name_es?: string | null;
  name_de?: string | null;
  cal_100?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fat?: number | null;
  region?: string | null;
  meal_type?: string | null;
}

const UNNAMED_PATTERN = /^unnamed/i;

const MEAL_EMOJI: Record<string, string> = {
  breakfast: '🥣', lunch: '🍲', dinner: '🍽️', snacks: '🍎', snack: '🍎',
};

export function resolveDishName(dish: Dish, locale: string): string {
  const key = (`name_${locale}` as keyof Dish);
  const candidates: Array<string | null | undefined> = [
    dish[key] as string | null | undefined,
    dish.name_en, dish.name_ar, dish.name_fr, dish.name_es, dish.name_de,
  ];
  for (const c of candidates) {
    if (typeof c === 'string') {
      const trimmed = c.trim();
      if (trimmed.length > 0 && !UNNAMED_PATTERN.test(trimmed)) return trimmed;
    }
  }
  return '';
}

export function isValidDish(dish: Dish, locale: string): boolean {
  return resolveDishName(dish, locale).length > 0;
}

function Macro({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-slate-50 py-1.5 border border-slate-100">
      <span className={`text-xs font-bold ${color}`}>{value}g</span>
      <span className="text-[9px] uppercase tracking-wider text-slate-500">{label}</span>
    </div>
  );
}

export default function DishCard({ dish, locale }: { dish: Dish; locale: string }) {
  const name = useMemo(() => resolveDishName(dish, locale) || '—', [dish, locale]);
  const calories = Math.round(dish.cal_100 ?? 0);
  const protein  = Math.round(dish.protein  ?? 0);
  const carbs    = Math.round(dish.carbs    ?? 0);
  const fat      = Math.round(dish.fat      ?? 0);
  const emoji    = MEAL_EMOJI[(dish.meal_type ?? '').toLowerCase()] ?? '🍽️';

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-xl hover:shadow-emerald-500/10">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-50">
        <span className="text-6xl opacity-80 transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
          {emoji}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-emerald-600 shadow-sm backdrop-blur">
          {calories} kcal <span className="text-[10px] text-slate-400">/ 100g</span>
        </span>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-slate-800">{name}</h3>
        {dish.region ? (
          <span className="mt-1 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-600">
            {dish.region.replace('pan_', '').replace('_', ' ')}
          </span>
        ) : (
          <span className="mt-1 block h-[14px]" />
        )}

        <dl className="mt-3 grid grid-cols-3 gap-2">
          <Macro label="P" value={protein} color="text-sky-600" />
          <Macro label="C" value={carbs}   color="text-amber-600" />
          <Macro label="F" value={fat}     color="text-rose-600" />
        </dl>
      </div>
    </article>
  );
}
