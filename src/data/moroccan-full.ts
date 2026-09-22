// Single source of truth for Moroccan cuisine - generated from moroccan-full-100-USDA.json (219 dishes, 10 categories)
import moroccanKitchenFull from './moroccan-full-100-USDA.json';

export interface MoroccanFullDish {
  id: string;
  nameAr: string;
  nameEn: string;
  mealType: string;
  grams: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  cal100: number;
  servG: number;
  healthy: boolean;
  source: string;
  p100: number;
  c100: number;
  f100: number;
  confidence: number;
  confidenceLabel: string;
  confidenceColor: 'green' | 'yellow' | 'orange';
  cooking?: string;
  note?: string;
}

type KitchenCategory = {
  id: string;
  name_ar: string;
  count: number;
  dishes: Array<{
    name: string;
    name_en?: string;
    cal_100: number;
    p: number;
    c: number;
    f: number;
    serv_g: number;
    cal_serv: number;
    healthy: boolean;
    source: string;
    notes: string;
    confidence: number;
    confidence_label: string;
    confidence_color: 'green' | 'yellow' | 'orange';
    mealType?: string;
    mealTypes?: string[];
  }>;
};

const CATEGORY_MEAL: Record<string, string> = {
  breakfast: 'breakfast',
  breads_pastries: 'breakfast',
  soups: 'dinner',
  salads_sides: 'lunch',
  couscous_tagines: 'lunch',
  main_dishes: 'lunch',
  grilled_meats: 'lunch',
  fish_seafood: 'lunch',
  sweets_desserts: 'snack',
  dairy_eggs_fruits: 'breakfast',
};

const round1 = (n: number): number => Math.round(n * 10) / 10;

const raw = (moroccanKitchenFull as unknown as { categories: KitchenCategory[] }).categories;

const normalizeMeal = (m?: string): string | undefined => {
  if (!m) return undefined;
  const aliases: Record<string, string> = { snacks: 'snack', drinks: 'drink' };
  return aliases[m] ?? m;
};

export const MOROCCAN_FULL: MoroccanFullDish[] = raw.flatMap((cat) =>
  cat.dishes.map((d, i) => {
    const ratio = d.serv_g / 100;
    const dishMeal = normalizeMeal(d.mealTypes?.[0] ?? d.mealType);
    return {
      id: `${cat.id}_${i + 1}`,
      nameAr: d.name,
      nameEn: d.name_en ?? d.name,
      mealType: dishMeal ?? CATEGORY_MEAL[cat.id] ?? 'lunch',
      grams: d.serv_g,
      kcal: d.cal_serv,
      protein: round1(d.p * ratio),
      carbs: round1(d.c * ratio),
      fat: round1(d.f * ratio),
      cal100: d.cal_100,
      servG: d.serv_g,
      healthy: d.healthy,
      source: d.source,
      p100: d.p,
      c100: d.c,
      f100: d.f,
      confidence: d.confidence,
      confidenceLabel: d.confidence_label,
      confidenceColor: d.confidence_color,
      note: d.notes || undefined,
    };
  }),
);