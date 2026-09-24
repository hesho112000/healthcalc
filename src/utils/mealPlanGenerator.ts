import { evaluateSuitability, type Suitability, type SuitabilityCondition } from './dishSuitability';
import type { KitchenDish, KitchenInfo } from '../data/kitchens';
import type { FoodItem } from './calculations';

export type PlanMealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface PlanDish {
  dish: KitchenDish;
  mealTypes: string[];
  servings: number;
  grams: number;
  calories: number;
}

export interface PlanMeal {
  mealType: PlanMealType;
  label: string;
  dishes: PlanDish[];
  totalCal: number;
  targetCal: number;
}

export interface PlanDay {
  day: number;
  label: string;
  meals: PlanMeal[];
  totalCal: number;
  targetCal: number;
}

export interface PlanOptions {
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female';
  targetCalories: number;
  goal: string;
  conditions?: SuitabilityCondition[];
  kitchens: KitchenInfo[];
  varietyAcrossDays?: boolean;
  maxDishesPerMeal?: number;
}

export const MEAL_ORDER: PlanMealType[] = ['breakfast', 'lunch', 'dinner', 'snacks'];

export const MEAL_ALLOCATION: Record<PlanMealType, number> = {
  breakfast: 0.25,
  lunch: 0.35,
  dinner: 0.25,
  snacks: 0.15,
};

const MEAL_LABELS: Record<PlanMealType, string> = {
  breakfast: 'الفطار',
  lunch: 'الغداء',
  dinner: 'العشاء',
  snacks: 'سناك',
};

const DAY_LABELS = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

interface PoolItem {
  dish: KitchenDish;
  keys: PlanMealType[];
  suit: Suitability;
}

function toFoodItem(d: KitchenDish): FoodItem {
  const sf = d.serv_g > 0 ? d.serv_g : 100;
  const k = sf / 100;
  return {
    name: d.name,
    name_en: d.name,
    name_ar: d.name,
    calories: d.cal_serv,
    protein: Math.round(d.p * k * 10) / 10,
    carbs: Math.round(d.c * k * 10) / 10,
    fat: Math.round(d.f * k * 10) / 10,
    category: '',
    cuisine: [],
    portion: { grams: sf, measure: `${sf} g` },
    healthy: d.healthy,
  };
}

function mealKeysOf(d: KitchenDish): PlanMealType[] {
  if (Array.isArray(d.mealTypes) && d.mealTypes.length) {
    const ks = d.mealTypes.filter((m): m is PlanMealType => (MEAL_ORDER as readonly string[]).includes(m));
    if (ks.length) return [...new Set(ks)];
  }
  if (d.mealType) {
    const t = d.mealType.toLowerCase();
    if (t === 'breakfast') return ['breakfast'];
    if (t === 'lunch') return ['lunch'];
    if (t === 'dinner') return ['dinner'];
    if (t === 'snacks' || t === 'snack' || t === 'dessert' || t === 'juice' || t === 'drinks' || t === 'beverages' || t === 'fruit') return ['snacks'];
    if (t === 'soup' || t === 'salad' || t === 'side') return ['dinner'];
    if (t === 'main' || t === 'grilled' || t === 'entree') return ['lunch'];
    if (t === 'bread' || t === 'bakery' || t === 'cheese' || t === 'dairy') return ['breakfast'];
  }
  const dn = d.name;
  if (/ترايفل|حلاوة|حلوى|بسبوسة|كنافة|قطايف|كيك|بسكويت|شوكولاتة/i.test(dn)) return ['snacks'];
  if (/مكرون|معكرون|شعرية|مقرونة|نودلز|pasta|macaroni|noodle/i.test(dn)) return ['lunch', 'dinner'];
  if (/رز|أرز|rice/i.test(dn) && !/بلبن|حليب|pudding|بودنج/i.test(dn)) return ['lunch', 'dinner'];
  if (/كسكسي|couscous/i.test(dn)) return ['lunch', 'dinner'];
  if (/خبز|عيش|bread/i.test(dn)) return ['breakfast'];
  if (/شوربة|سلطة|soup|salad/i.test(dn)) return ['dinner'];
  if (/عصير|juice|فواكه|فاكهة|حلويات|حلوى|شاي|قهوة|لبن|زبادي/i.test(dn)) return ['snacks'];
  if (/فول|طعمية|بيض|جبنة|عيش|طبق/i.test(dn)) return ['breakfast', 'dinner'];
  return ['lunch'];
}

function mulberry32(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: readonly T[], seed: number): T[] {
  const a = [...arr];
  const rnd = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPool(dishes: KitchenDish[], conditions: SuitabilityCondition[], meal: PlanMealType): PoolItem[] {
  const out: PoolItem[] = [];
  for (const dish of dishes) {
    const keys = mealKeysOf(dish);
    if (!keys.includes(meal)) continue;
    if (keys.some((k) => k !== meal)) {
      // keep dishes that can serve multiple meals but require matching the target meal
    }
    const suit = evaluateSuitability(toFoodItem(dish), conditions);
    if (suit === 'unsuitable') continue;
    out.push({ dish, keys, suit });
  }
  const suitable = out.filter((x) => x.suit === 'suitable');
  const neutral = out.filter((x) => x.suit !== 'suitable');
  return [...suitable, ...neutral];
}

function selectDishes(
  pool: PoolItem[],
  budget: number,
  maxDishes: number,
  seed: number,
  used: Map<string, number>,
  maxUses: number,
  dayNames: Set<string>,
  fallback: KitchenDish[],
): PlanDish[] {
  if (!pool.length) {
    const fb = fallback[0];
    if (!fb) return [];
    const grams = fb.serv_g > 0 ? fb.serv_g : 100;
    return [{ dish: fb, mealTypes: ['lunch'], servings: 1, grams, calories: fb.cal_serv }];
  }
  let base = pool;
  if (dayNames.size) {
    const fresh = pool.filter((x) => !dayNames.has(x.dish.name));
    if (fresh.length >= 2) base = fresh;
  }
  const preferred = base.filter((x) => (used.get(x.dish.name) ?? 0) < maxUses);
  const rest = base.filter((x) => (used.get(x.dish.name) ?? 0) >= maxUses);
  const order = (arr: PoolItem[]) => {
    const suitable = arr.filter((x) => x.suit === 'suitable');
    const neutral = arr.filter((x) => x.suit !== 'suitable');
    return [...seededShuffle(suitable, seed), ...seededShuffle(neutral, seed + 1)];
  };
  const cand = [...order(preferred), ...order(rest)];
  const chosen: PlanDish[] = [];
  let total = 0;
  for (const it of cand) {
    if (chosen.length >= maxDishes) break;
    if (total >= budget * 0.9) break;
    const c = it.dish.cal_serv;
    if (total + c <= budget * 1.1) {
      chosen.push({ dish: it.dish, mealTypes: it.keys, servings: 1, grams: it.dish.serv_g, calories: c });
      total += c;
      used.set(it.dish.name, (used.get(it.dish.name) ?? 0) + 1);
      dayNames.add(it.dish.name);
    }
  }
  let improved = true;
  while (improved && total < budget * 0.9) {
    improved = false;
    for (const d of chosen) {
      if (d.servings === 1 && total + d.calories <= budget * 1.1) {
        d.servings = 2;
        d.calories *= 2;
        d.grams *= 2;
        total = chosen.reduce((s, x) => s + x.calories, 0);
        improved = true;
        break;
      }
    }
  }
  if (total < budget * 0.8 && chosen.length < maxDishes) {
    const smalls = cand.filter(
      (x) => x.dish.cal_serv <= budget * 0.25 && !chosen.find((d) => d.dish.name === x.dish.name),
    );
    for (const it of smalls) {
      if (total + it.dish.cal_serv <= budget * 1.1) {
        chosen.push({ dish: it.dish, mealTypes: it.keys, servings: 1, grams: it.dish.serv_g, calories: it.dish.cal_serv });
        total = chosen.reduce((s, x) => s + x.calories, 0);
        used.set(it.dish.name, (used.get(it.dish.name) ?? 0) + 1);
        dayNames.add(it.dish.name);
        if (total >= budget * 0.8 || chosen.length >= maxDishes) break;
      }
    }
  }
  return chosen;
}

export function generateWeeklyPlan(options: PlanOptions): PlanDay[] {
  const target = Math.max(1200, Math.round(options.targetCalories || 2000));
  const maxDishes = options.maxDishesPerMeal ?? 5;
  const conditions = options.conditions ?? [];
  const varietyAcrossDays = options.varietyAcrossDays !== false;

  const seen = new Set<string>();
  const allDishes: KitchenDish[] = [];
  for (const k of options.kitchens) {
    if (!k || !k.dishes) continue;
    for (const d of k.dishes) {
      if (!seen.has(d.name)) {
        seen.add(d.name);
        allDishes.push(d);
      }
    }
  }

  const pools: Record<PlanMealType, PoolItem[]> = {
    breakfast: buildPool(allDishes, conditions, 'breakfast'),
    lunch: buildPool(allDishes, conditions, 'lunch'),
    dinner: buildPool(allDishes, conditions, 'dinner'),
    snacks: buildPool(allDishes, conditions, 'snacks'),
  };

  const used = new Map<string, number>();
  const days: PlanDay[] = [];

  for (let day = 1; day <= 7; day++) {
    let maxUses = varietyAcrossDays ? (day <= 4 ? 1 : 2) : 99;
    const maxAllowed = day <= 4 ? 1 : 3;
    let best: { meals: PlanMeal[]; dayTotal: number; inRange: boolean } | null = null;
    for (let attempt = 0; attempt < 4; attempt++) {
      const usageSnapshot = new Map(used);
      const dayUsed = new Set<string>();
      const meals: PlanMeal[] = [];
      let dayTotal = 0;
      MEAL_ORDER.forEach((meal, i) => {
        const budget = Math.round(target * MEAL_ALLOCATION[meal]);
        const seed = day * 100 + i + attempt * 7;
        const chosen = selectDishes(pools[meal], budget, maxDishes, seed, used, maxUses, dayUsed, allDishes);
        const totalCal = chosen.reduce((s, x) => s + x.calories, 0);
        dayTotal += totalCal;
        meals.push({ mealType: meal, label: MEAL_LABELS[meal], dishes: chosen, totalCal, targetCal: budget });
      });
      const inRange = dayTotal >= target * 0.9 && dayTotal <= target * 1.1;
      best = { meals, dayTotal, inRange };
      if (inRange) break;
      if (varietyAcrossDays && maxUses < maxAllowed) {
        maxUses += 1;
        used.clear();
        for (const [k, v] of usageSnapshot) used.set(k, v);
        continue;
      }
      break;
    }
    const final = best ?? { meals: [], dayTotal: 0, inRange: false };
    days.push({
      day,
      label: DAY_LABELS[day - 1],
      meals: final.meals,
      totalCal: final.dayTotal,
      targetCal: target,
    });
  }

  const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;
  if (isDev) {
    const weekDishes = new Set<string>();
    const counts = new Map<string, number>();
    for (const day of days) {
      let dayCount = 0;
      for (const meal of day.meals) {
        for (const d of meal.dishes) {
          dayCount += 1;
          weekDishes.add(d.dish.name);
          counts.set(d.dish.name, (counts.get(d.dish.name) ?? 0) + 1);
        }
      }
      console.log(
        `[DEV] ${day.label} (day ${day.day}): ${day.totalCal} kcal (${Math.round((day.totalCal / target) * 100)}% of ${target}) | ${dayCount} dishes`,
      );
    }
    const repeats = [...counts.entries()].filter(([, c]) => c > 2);
    console.log(`[DEV] Week total: ${days.reduce((s, d) => s + d.totalCal, 0)} kcal | unique dishes: ${weekDishes.size}`);
    console.log(`[DEV] Dishes repeated >2x: ${repeats.length}`, repeats.slice(0, 10));
  }

  return days;
}