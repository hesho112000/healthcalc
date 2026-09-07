// Single source of truth for Egyptian cuisine - generated from Egyptian-Kitchen-Full-Accurate.json (146 dishes, 10 categories)
import egyptianKitchenFull from './egyptian-full-100-USDA.json';

export interface EgyptianFullDish {
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
  }>;
};

const CATEGORY_MEAL: Record<string, string> = {
  soups: 'dinner',
  meats: 'lunch',
  poultry: 'lunch',
  seafood: 'lunch',
  carbs_mahashi: 'lunch',
  breakfast: 'breakfast',
  salads: 'dinner',
  bakery: 'breakfast',
  sweets: 'snack',
  drinks: 'juice',
};

const round1 = (n: number): number => Math.round(n * 10) / 10;

const raw = (egyptianKitchenFull as unknown as { categories: KitchenCategory[] }).categories;

export const EGYPTIAN_FULL: EgyptianFullDish[] = raw.flatMap((cat) =>
  cat.dishes.map((d, i) => {
    const ratio = d.serv_g / 100;
    return {
      id: `${cat.id}_${i + 1}`,
      nameAr: d.name,
      nameEn: d.name,
      mealType: CATEGORY_MEAL[cat.id] ?? 'lunch',
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

export const EGYPTIAN_PORTION_GUIDE: string[] = (
  (egyptianKitchenFull as unknown as { portion_guide: string }).portion_guide || ''
)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export const EGYPTIAN_SOURCES: string[] =
  (egyptianKitchenFull as unknown as { sources: string[] }).sources || [];

export const EGYPTIAN_DISCLAIMER = 'المصدر: المعهد القومي للتغذية + USDA - السعرات تختلف حسب كمية السمن';

export const isMinistryVerified = (source?: string): boolean =>
  !!source && (source.includes('المعهد القومي') || source.includes('مؤكد'));