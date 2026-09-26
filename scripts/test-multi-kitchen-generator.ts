// End-to-end check of the generic useKitchenDishes(| path: for EVERY kitchen with a
// region family (Saudi, Gulf 6, Morocco, Egypt, Tunisia, Algeria, Libya, Lebanon),
// fetch the live Supabase rows → filter with isAuthenticForKitchen (family + foreign
// nationality guard) → build a KitchenInfo exactly like the hook → generateWeeklyPlan.
// FAILS if any kitchen yields an empty pool or its plan contains an inauthentic dish.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { KitchenDish, KitchenInfo } from '../src/data/kitchens';
import { isAuthenticForKitchen, KITCHEN_REGION_FAMILIES, KITCHEN_COUNT_REGIONS } from '../src/utils/kitchenAuthenticity';
import { generateWeeklyPlan } from '../src/utils/mealPlanGenerator';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
});

interface DishRow {
  id: string;
  name_ar: string | null;
  name_en: string | null;
  cal_100: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  base_serving_g: number | null;
  base_cal_serv: number | null;
  meal_type: string | null;
  source: string | null;
  confidence: number | null;
  confidence_label: string | null;
  confidence_color: string | null;
  region: string | null;
}

async function fetchAllDishes(): Promise<DishRow[]> {
  const out: DishRow[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .order('name_ar', { ascending: true })
      .order('id', { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    const rows = (data ?? []) as DishRow[];
    out.push(...rows);
    if (rows.length < PAGE) break;
  }
  return out;
}

function rowToDish(r: DishRow): KitchenDish {
  const cal100 = r.cal_100 ?? 0;
  const baseCal = r.base_cal_serv ?? 0;
  const servingsG = r.base_serving_g ?? 100;
  return {
    name: r.name_ar ?? r.name_en ?? '',
    cal_100: cal100,
    p: r.protein ?? 0,
    c: r.carbs ?? 0,
    f: r.fat ?? 0,
    serv_g: servingsG,
    cal_serv: baseCal > 0 ? baseCal : Math.round((cal100 * servingsG) / 100),
    healthy: cal100 <= 350,
    confidence: r.confidence ?? 70,
    confidence_label: r.confidence_label ?? '70% - تقديري',
    confidence_color: (r.confidence_color as KitchenDish['confidence_color']) ?? 'orange',
    source: r.source ?? '',
    notes: '',
    mealType: r.meal_type ?? undefined,
    region: r.region ?? undefined,
  };
}

async function main() {
  const rows = await fetchAllDishes();
  const ids = Object.keys(KITCHEN_REGION_FAMILIES);
  let failures = 0;

  for (const id of ids) {
    // Must match src/hooks/useKitchenDishes.ts: null-region legacy rows go to Saudi only.
    const pool = (r: DishRow) =>
      r.region != null ? isAuthenticForKitchen(id, r.region, r.name_ar) : id === 'saudi' && isAuthenticForKitchen('saudi', null, r.name_ar);
    const dishes = rows.filter(pool).map(rowToDish);
    if (!dishes.length) {
      failures++;
      console.log(`\nFAIL ${id}: empty pool (expected >= 1 dish)`);
      continue;
    }
    const kitchen: KitchenInfo = {
      id,
      kitchen: `المطبخ ${id}`,
      city: id,
      country: id,
      flag: '',
      total: dishes.length,
      conf100: 0,
      conf85: 0,
      conf70: 0,
      sample: dishes[0] ?? null,
      dishes,
      categories: [],
      regions: [...new Set(dishes.map((d) => d.region).filter((r): r is string => !!r))],
      rich: true,
    };

    const plan = generateWeeklyPlan({
      age: 35,
      height: 172,
      weight: 82,
      gender: 'male',
      targetCalories: 2000,
      goal: 'loss',
      conditions: [],
      kitchens: [kitchen],
      region: undefined,
    });

    let violations = 0;
    const used = new Set<string>();
    for (const day of plan) {
      for (const meal of day.meals) {
        for (const item of meal.dishes) {
          used.add(item.dish.name);
          if (!isAuthenticForKitchen(id, item.dish.region, item.dish.name)) {
            violations++;
            console.log(`  VIOLATION: ${item.dish.name} | region=${item.dish.region} | source=${item.dish.source}`);
          }
        }
      }
    }

    const own = KITCHEN_COUNT_REGIONS[id];
    const countShown = dishes.length;
    const status = violations === 0 && plan.length === 7 ? 'PASS' : 'FAIL';
    if (status === 'FAIL') failures++;
    console.log(
      `[${status}] ${id.padEnd(9)} pool=${String(countShown).padStart(3)} uniqueUsed=${String(used.size).padStart(3)} ` +
        `violations=${violations} days=${plan.length} regions=${[...new Set(dishes.map((d) => d.region))].join('|')}`,
    );
  }

  if (failures) {
    console.log(`\nFAILED kitchens: ${failures}`);
    process.exit(1);
  }
  console.log('\nPASS: all family kitchens generate valid isolation-clean plans.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});