import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { KitchenDish, KitchenInfo } from '../src/data/kitchens';
import { isAuthenticForKitchen } from '../src/utils/kitchenAuthenticity';
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
  return {
    name: r.name_ar ?? r.name_en ?? '',
    cal_100: cal100,
    p: r.protein ?? 0,
    c: r.carbs ?? 0,
    f: r.fat ?? 0,
    serv_g: r.base_serving_g ?? 100,
    cal_serv: r.base_cal_serv ?? 0,
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
  const dishes = rows.filter((r) => isAuthenticForKitchen('saudi', r.region, r.name_ar)).map(rowToDish);
  console.log(`Saudi kitchen pool: ${dishes.length} dishes`);

  const kitchen: KitchenInfo = {
    id: 'saudi',
    kitchen: 'المطبخ السعودي',
    city: 'الرياض 🇸🇦',
    country: 'السعودية 🇸🇦',
    flag: '🇸🇦',
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

  const regionsToTest = ['all', 'hijazi', 'najdi', 'sharqi'];
  let violations = 0;

  for (const requestedRegion of regionsToTest) {
    const plan = generateWeeklyPlan({
      age: 35,
      height: 172,
      weight: 82,
      gender: 'male',
      targetCalories: 2000,
      goal: 'loss',
      conditions: [],
      kitchens: [kitchen],
      region: requestedRegion,
    });
    const usedSet = new Set<string>();
    for (const day of plan) {
      for (const meal of day.meals) {
        for (const item of meal.dishes) {
          usedSet.add(item.dish.name + '|' + (item.dish.region ?? ''));
          if (!isAuthenticForKitchen('saudi', item.dish.region, item.dish.name)) {
            violations++;
            console.log(`  VIOLATION [${requestedRegion}]: ${item.dish.name} | region=${item.dish.region} | source=${item.dish.source}`);
          }
        }
      }
    }
    const usedCount = usedSet.size;
    console.log(
      `[${requestedRegion}] plan cooked with ${usedCount} unique dishes; ` +
        `days: ${plan.map((d) => d.totalCal).join(', ')}`,
    );
    if (requestedRegion === 'all') {
      const regions = new Map<string, number>();
      for (const key of usedSet) {
        const region = key.split('|')[1] || 'NULL';
        regions.set(region, (regions.get(region) ?? 0) + 1);
      }
      console.log('  unique dishes by region:', [...regions.entries()].sort().map(([k, v]) => `${k}:${v}`).join(' '));
    }
  }

  if (violations > 0) {
    console.log(`\nFAIL: ${violations} foreign/inauthentic dishes appeared.`);
    process.exit(1);
  }
  console.log('\nPASS: every generated dish belongs to the Saudi kitchen family.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});