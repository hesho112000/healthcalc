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
  region?: string;
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

const DAY_LOW = 0.9;
const DAY_HIGH = 1.1;
const MEAL_LOW = 0.8;
const MAX_GAP_FILL_STEPS = 12;
const MIN_REGION_DISHES = 7;
const WEEK_MAX_USES = 2;

// Small generic side/snack/fruit items used only to top up a meal that
// sits under 80% of its budget (spec: "if Lunch is short 150 kcal -> fruit").
const FILLER_SNACKS: KitchenDish[] = [
  {
    name: 'تفاحة (سناك خفيف)',
    cal_100: 52,
    p: 0.3,
    c: 14,
    f: 0.2,
    serv_g: 130,
    cal_serv: 68,
    healthy: true,
    confidence: 100,
    confidence_label: '100% - دقيق',
    confidence_color: 'green',
    source: 'USDA - Apple raw',
    notes: 'سناك فواكه خفيف لتكملة الوجبة',
    mealType: 'snacks',
    mealTypes: ['snacks'],
  },
  {
    name: 'زبادي يوناني (سناك)',
    cal_100: 59,
    p: 10,
    c: 3.6,
    f: 0.4,
    serv_g: 100,
    cal_serv: 59,
    healthy: true,
    confidence: 100,
    confidence_label: '100% - دقيق',
    confidence_color: 'green',
    source: 'USDA - Yogurt Greek plain',
    notes: 'طبق جانبي خفيف',
    mealType: 'snacks',
    mealTypes: ['snacks'],
  },
  {
    name: 'حفنة لوز (سناك)',
    cal_100: 579,
    p: 21,
    c: 22,
    f: 50,
    serv_g: 28,
    cal_serv: 162,
    healthy: true,
    confidence: 100,
    confidence_label: '100% - دقيق',
    confidence_color: 'green',
    source: 'USDA - Almonds',
    notes: 'حفنة صغيرة 28جم',
    mealType: 'snacks',
    mealTypes: ['snacks'],
  },
  {
    name: 'خيار مع لبن (سناك)',
    cal_100: 16,
    p: 1.5,
    c: 3,
    f: 0.2,
    serv_g: 120,
    cal_serv: 32,
    healthy: true,
    confidence: 70,
    confidence_label: '70% - تقديري',
    confidence_color: 'green',
    source: 'تقديري من بيانات محلية',
    notes: 'سناك خفيف',
    mealType: 'snacks',
    mealTypes: ['snacks'],
  },
  {
    name: 'برتقالة (فاكهة)',
    cal_100: 47,
    p: 0.9,
    c: 12,
    f: 0.1,
    serv_g: 131,
    cal_serv: 62,
    healthy: true,
    confidence: 100,
    confidence_label: '100% - دقيق',
    confidence_color: 'green',
    source: 'USDA - Orange',
    notes: 'فاكهة طازجة',
    mealType: 'snacks',
    mealTypes: ['snacks'],
  },
];

interface CooldownOpts {
  today: number;
  days: number;
  lastUsed: Map<string, number>;
}

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

function buildPool(dishes: KitchenDish[], conditions: SuitabilityCondition[], meal: PlanMealType, regionPriority?: Set<string>): PoolItem[] {
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
  const bySuit = (s: Suitability) => out.filter((x) => x.suit === s);
  const prioritize = (arr: PoolItem[]) => {
    if (!regionPriority || regionPriority.size === 0) return arr;
    const prio = arr.filter((x) => regionPriority.has(x.dish.name));
    const rest = arr.filter((x) => !regionPriority.has(x.dish.name));
    return [...prio, ...rest];
  };
  return [...prioritize(bySuit('suitable')), ...prioritize(bySuit('neutral'))];
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
  cooldown: CooldownOpts,
  weekCap = 0,
): PlanDish[] {
  if (!pool.length) {
    const avail = fallback.filter((f) => weekCap <= 0 || (used.get(f.name) ?? 0) < weekCap);
    const fb = avail[0] ?? fallback[0] ?? FILLER_SNACKS[1];
    if (!fb) return [];
    const grams = fb.serv_g > 0 ? fb.serv_g : 100;
    used.set(fb.name, (used.get(fb.name) ?? 0) + 1);
    dayNames.add(fb.name);
    return [{ dish: fb, mealTypes: ['snacks'], servings: 1, grams, calories: fb.cal_serv }];
  }
  const freshCheck = (x: PoolItem) => {
    if (dayNames.has(x.dish.name)) return false;
    if (cooldown.days === 0) return true;
    const last = cooldown.lastUsed.get(x.dish.name);
    return last == null || cooldown.today - last >= cooldown.days;
  };
  // Relaxed variety: prefer dishes that are (a) not used today and (b) past the
  // variety cooldown (no repeat days 1-4, 2-day gap days 5-6, 1-day gap day 7).
  // Fall back to the full pool when too few fresh remain so later days still fill.
  let base = pool;
  if (dayNames.size) {
    const fresh = pool.filter(freshCheck);
    if (fresh.length >= 2) base = fresh;
  }
  if (weekCap > 0) {
    const under = base.filter((x) => (used.get(x.dish.name) ?? 0) < weekCap);
    if (under.length) base = under;
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
    if (total >= budget * DAY_LOW) break;
    const c = it.dish.cal_serv;
    if (total + c <= budget * DAY_HIGH) {
      chosen.push({ dish: it.dish, mealTypes: it.keys, servings: 1, grams: it.dish.serv_g, calories: c });
      total += c;
      used.set(it.dish.name, (used.get(it.dish.name) ?? 0) + 1);
      dayNames.add(it.dish.name);
    }
  }
  let improved = true;
  while (improved && total < budget * DAY_LOW) {
    improved = false;
    for (const d of chosen) {
      const next = d.servings === 1 ? 1.5 : d.servings === 1.5 ? 2 : 0;
      if (!next) continue;
      const bump = Math.round(d.dish.cal_serv * next) - d.calories;
      if (bump > 0 && total + bump <= budget * DAY_HIGH) {
        d.servings = next;
        d.calories = Math.round(d.dish.cal_serv * next);
        d.grams = Math.round(d.dish.serv_g * next);
        total = chosen.reduce((s, x) => s + x.calories, 0);
        improved = true;
        break;
      }
    }
  }
  // Per-meal gap fill: under 80% of budget -> add a small side/snack/fruit.
  if (total < budget * MEAL_LOW) {
    fillMeal(pool, chosen, budget, maxDishes, used, dayNames, total, weekCap);
  }
  return chosen;
}

function pushDish(chosen: PlanDish[], dish: KitchenDish, keys: PlanMealType[], used: Map<string, number>, dayNames: Set<string>) {
  chosen.push({ dish, mealTypes: keys, servings: 1, grams: dish.serv_g, calories: dish.cal_serv });
  used.set(dish.name, (used.get(dish.name) ?? 0) + 1);
  dayNames.add(dish.name);
}

function fillMeal(pool: PoolItem[], chosen: PlanDish[], budget: number, maxDishes: number, used: Map<string, number>, dayNames: Set<string>, startTotal: number, weekCap = 0) {
  let total = startTotal;
  const inMeal = new Set(chosen.map((x) => x.dish.name));
  const smalls = pool
    .filter((x) => x.dish.cal_serv > 0 && !inMeal.has(x.dish.name) && x.dish.cal_serv <= budget * 0.35 && (weekCap <= 0 || (used.get(x.dish.name) ?? 0) < weekCap))
    .sort((a, b) => a.dish.cal_serv - b.dish.cal_serv);
  for (const it of smalls) {
    if (total >= budget * MEAL_LOW || chosen.length >= maxDishes) break;
    const c = it.dish.cal_serv;
    if (total + c <= budget * DAY_HIGH) {
      pushDish(chosen, it.dish, it.keys, used, dayNames);
      total += c;
      inMeal.add(it.dish.name);
    }
  }
  if (total >= budget * MEAL_LOW) return;
  const freshFillers = FILLER_SNACKS.filter((f) => weekCap <= 0 || (used.get(f.name) ?? 0) < weekCap);
  const fillerCandidates = freshFillers.length ? freshFillers : FILLER_SNACKS;
  for (const filler of fillerCandidates) {
    if (total >= budget * MEAL_LOW || chosen.length >= maxDishes) break;
    if (inMeal.has(filler.name)) continue;
    const c = filler.cal_serv;
    if (total + c <= budget * DAY_HIGH) {
      pushDish(chosen, filler, ['snacks'], used, dayNames);
      total += c;
      inMeal.add(filler.name);
    }
  }
}

// Day-level gap fill: a day under 90% of target gets one extra dish (repeats
// allowed) and/or its existing dishes scaled to 1.5x/2x servings until the day
// reaches >= 90% (never exceeding 110%).
function gapFillDay(
  meals: PlanMeal[],
  target: number,
  pools: Record<PlanMealType, PoolItem[]>,
  dayNames: Set<string>,
  used: Map<string, number>,
  cooldown: CooldownOpts,
  weekCap = 0,
) {
  const dayTotal = () => meals.reduce((s, m) => s + m.totalCal, 0);
  // (a) add one more dish to the meal with the most room
  let guard = 0;
  while (dayTotal() < target * DAY_LOW && guard < MAX_GAP_FILL_STEPS) {
    guard += 1;
    const dayRoom = target * DAY_HIGH - dayTotal();
    if (dayRoom < 1) break;
    let bestMeal: PlanMeal | null = null;
    let bestSpace = -1;
    for (const m of meals) {
      const space = m.targetCal * DAY_HIGH - m.totalCal;
      if (space > bestSpace) {
        bestSpace = space;
        bestMeal = m;
      }
    }
    if (!bestMeal || bestSpace < 1) break;
    const pool = pools[bestMeal.mealType] ?? [];
    if (!pool.length) break;
    const inMeal = new Set(bestMeal.dishes.map((x) => x.dish.name));
    const room = Math.min(dayRoom, bestSpace);
    const fits = pool
      .filter((x) => x.dish.cal_serv > 0 && !inMeal.has(x.dish.name) && x.dish.cal_serv <= room && (weekCap <= 0 || (used.get(x.dish.name) ?? 0) < weekCap))
      .sort((a, b) => a.dish.cal_serv - b.dish.cal_serv);
    const pick = fits[0];
    if (!pick) break;
    pushDish(bestMeal.dishes, pick.dish, pick.keys, used, dayNames);
    bestMeal.totalCal = bestMeal.dishes.reduce((s, x) => s + x.calories, 0);
  }
  // (b) scale existing servings by +0.5 steps (1 -> 1.5 -> 2)
  guard = 0;
  let changed = true;
  while (changed && dayTotal() < target * DAY_LOW && guard < MAX_GAP_FILL_STEPS) {
    guard += 1;
    changed = false;
    const dayRoom = target * DAY_HIGH - dayTotal();
    if (dayRoom < 1) break;
    let bestD: PlanDish | null = null;
    let bestMeal: PlanMeal | null = null;
    let bestBump = 0;
    for (const m of meals) {
      for (const d of m.dishes) {
        const next = d.servings === 1 ? 1.5 : d.servings === 1.5 ? 2 : 0;
        if (!next) continue;
        const bump = Math.round(d.dish.cal_serv * next) - d.calories;
        if (bump > 0 && bump <= dayRoom && (!bestD || bump < bestBump)) {
          bestD = d;
          bestMeal = m;
          bestBump = bump;
        }
      }
    }
    if (bestD && bestMeal) {
      const next = bestD.servings === 1 ? 1.5 : 2;
      bestD.servings = next;
      bestD.calories = Math.round(bestD.dish.cal_serv * next);
      bestD.grams = Math.round(bestD.dish.serv_g * next);
      bestMeal.totalCal = bestMeal.dishes.reduce((s, x) => s + x.calories, 0);
      changed = true;
    }
  }
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

  const requestedRegion = options.region?.trim();
  const kitchenId = options.kitchens[0]?.id ?? '';
  const generalRank = (d: KitchenDish): number => {
    if (!d.region) return 2;
    if (kitchenId === 'saudi') return d.region === 'pan_saudi' ? 0 : -1;
    if (kitchenId === 'emirati') return d.region === 'pan_emirati' ? 0 : d.region === 'gulf_shared' ? 1 : -1;
    if (kitchenId === 'kuwaiti') return d.region === 'pan_kuwaiti' ? 0 : d.region === 'gulf_shared' ? 1 : -1;
    if (kitchenId === 'qatar') return d.region === 'pan_qatari' ? 0 : d.region === 'gulf_shared' ? 1 : -1;
    if (kitchenId === 'bahraini') return d.region === 'pan_bahraini' ? 0 : d.region === 'gulf_shared' ? 1 : -1;
    if (kitchenId === 'omani') return d.region === 'pan_omani' ? 0 : d.region === 'gulf_shared' ? 1 : -1;
    return -1;
  };
  const isGeneralDish = (d: KitchenDish) => generalRank(d) >= 0;
  let pools: Record<PlanMealType, PoolItem[]>;
  if (requestedRegion && requestedRegion !== 'all') {
    pools = { breakfast: [], lunch: [], dinner: [], snacks: [] };
    const regionDishes = allDishes.filter((d) => d.region === requestedRegion);
    let fallbackLogged = false;
    for (const meal of MEAL_ORDER) {
      const mealRegionDishes = regionDishes.filter((d) => mealKeysOf(d).includes(meal));
      const priority = new Set(mealRegionDishes.map((d) => d.name));
      let src = mealRegionDishes;
      if (mealRegionDishes.length < MIN_REGION_DISHES) {
        const generalForMeal = allDishes
          .filter((d) => isGeneralDish(d) && mealKeysOf(d).includes(meal))
          .sort((a, b) => generalRank(a) - generalRank(b));
        const names = new Set(src.map((d) => d.name));
        const fillers = generalForMeal.filter((d) => !names.has(d.name));
        src = [...src, ...fillers];
        if (!fallbackLogged) {
          fallbackLogged = true;
          console.log(
            `[Plan Generator] Region "${requestedRegion}" has ${mealRegionDishes.length} meal-${meal} dish(es) (<${MIN_REGION_DISHES}); pulled ${fillers.length} general dish(es) to fill the gap`,
          );
        }
      }
      pools[meal] = buildPool(src, conditions, meal, priority);
    }
  } else {
    pools = {
      breakfast: buildPool(allDishes, conditions, 'breakfast'),
      lunch: buildPool(allDishes, conditions, 'lunch'),
      dinner: buildPool(allDishes, conditions, 'dinner'),
      snacks: buildPool(allDishes, conditions, 'snacks'),
    };
  }

  const used = new Map<string, number>();
  const lastUsedDay = new Map<string, number>();
  const days: PlanDay[] = [];

  for (let day = 1; day <= 7; day++) {
    // Variety cooldown: days 1-4 no repeat, days 5-6 repeat after 2 days, day 7 after 1 day.
    const cooldownDays = day <= 4 ? Infinity : day >= 7 ? 1 : 2;
    const coopts: CooldownOpts = { today: day, days: cooldownDays, lastUsed: lastUsedDay };
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
        const chosen = selectDishes(pools[meal], budget, maxDishes, seed, used, maxUses, dayUsed, allDishes, coopts, WEEK_MAX_USES);
        const totalCal = chosen.reduce((s, x) => s + x.calories, 0);
        dayTotal += totalCal;
        meals.push({ mealType: meal, label: MEAL_LABELS[meal], dishes: chosen, totalCal, targetCal: budget });
      });
      // Day-level gap fill: if still under 90%, add a dish / scale servings.
      if (dayTotal < target * DAY_LOW) {
        gapFillDay(meals, target, pools, dayUsed, used, coopts, WEEK_MAX_USES);
        dayTotal = meals.reduce((s, m) => s + m.totalCal, 0);
      }
      const inRange = dayTotal >= target * DAY_LOW && dayTotal <= target * DAY_HIGH;
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
    for (const m of final.meals) for (const d of m.dishes) lastUsedDay.set(d.dish.name, day);
    days.push({
      day,
      label: DAY_LABELS[day - 1],
      meals: final.meals,
      totalCal: final.dayTotal,
      targetCal: target,
    });
  }

  const within = (p: PlanDay) => p.totalCal >= target * DAY_LOW && p.totalCal <= target * DAY_HIGH;
  const okDays = days.filter(within).length;
  console.log('[Plan Generator]');
  console.log(`  Target: ${target} kcal`);
  for (const d of days) {
    const pct = Math.round((d.totalCal / target) * 100);
    console.log(`  Day ${d.day}: ${d.totalCal} (${pct}%) ${within(d) ? 'OK' : 'UNDER'}`);
  }
  console.log(`  Days within +/-10%: ${okDays}/7`);

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