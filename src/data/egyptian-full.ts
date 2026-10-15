// Single source of truth for Egyptian cuisine - generated from Egyptian-Kitchen-Full-Accurate.json (146 dishes, 10 categories)
import egyptianKitchenFull from './egyptian-full-100-USDA.json';

export interface EgyptianFullDish {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr?: string;
  nameEs?: string;
  nameDe?: string;
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
    nameEn?: string;
    nameFr?: string;
    nameEs?: string;
    nameDe?: string;
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
  grains_cereals: 'breakfast',
  bread_bakery: 'breakfast',
  legumes: 'lunch',
  vegetables: 'lunch',
  fruits: 'snack',
  meats: 'lunch',
  poultry: 'lunch',
  fish_seafood: 'lunch',
  dairy_eggs: 'breakfast',
  fats_oils: 'lunch',
  sweets_desserts: 'snack',
  beverages: 'snack',
  nuts_seeds: 'snack',
  mixed_dishes: 'lunch',
  spices_misc: 'lunch',
  // keep any old IDs mapped as fallback
  soups: 'dinner',
  salads: 'lunch',
  brik: 'snack',
  main_stews: 'lunch',
  couscous: 'lunch',
  seafood: 'lunch',
  meats_poultry: 'lunch',
  bakery: 'breakfast',
  sweets: 'snack',
  drinks_spices: 'snack',
  carbs_mahashi: 'lunch',
  breakfast: 'breakfast',
  drinks: 'juice',
};

const round1 = (n: number): number => Math.round(n * 10) / 10;

const raw = (egyptianKitchenFull as unknown as { categories: KitchenCategory[] }).categories;

type EgyptianHalalReplacement = Pick<EgyptianFullDish, 'nameAr' | 'nameEn' | 'nameFr' | 'nameEs' | 'nameDe'> & {
  cal_100?: number;
  cal_serv?: number;
  p?: number;
  c?: number;
  f?: number;
};

const HALAL_REPLACEMENTS: Record<string, EgyptianHalalReplacement> = {
  'Pork Meat': {
    nameAr: 'لحم بقري',
    nameEn: 'Beef meat',
    nameFr: 'Viande de bœuf',
    nameEs: 'Carne de res',
    nameDe: 'Rindfleisch',
    cal_100: 217,
    cal_serv: 434,
    p: 20,
    c: 0.5,
    f: 15,
  },
  'Non-Alcoholic Beer': {
    nameAr: 'مشروب شعير غير مخمر',
    nameEn: 'Malted grain beverage',
    nameFr: 'Boisson maltée non fermentée',
    nameEs: 'Bebida de malta sin fermentar',
    nameDe: 'Unvergorenes Malzgetränk',
  },
  'Beef Frankfurter': {
    nameAr: 'سجق بقري حلال فرانكفورتر',
    nameEn: 'Halal Beef Frankfurter',
    nameFr: 'Frankfurter de bœuf halal',
    nameEs: 'Salchicha frankfurter de res halal',
    nameDe: 'Halale Rinder-Frankfurter',
  },
  'Beef Sausage': {
    nameAr: 'سجق بقري حلال',
    nameEn: 'Halal Beef Sausage',
    nameFr: 'Saucisse de bœuf halal',
    nameEs: 'Salchicha de res halal',
    nameDe: 'Halale Rinderwurst',
  },
  'Grilled Beef Sausage': {
    nameAr: 'سجق بقري مشوي حلال',
    nameEn: 'Grilled Halal Beef Sausage',
    nameFr: 'Saucisse de bœuf grillée halal',
    nameEs: 'Salchicha de res a la parrilla halal',
    nameDe: 'Gegrillte Halal-Rinderwurst',
  },
  'Chicken Frankfurter': {
    nameAr: 'سجق دجاج حلال فرانكفورتر',
    nameEn: 'Halal Chicken Frankfurter',
    nameFr: 'Frankfurter de poulet halal',
    nameEs: 'Salchicha de pollo halal',
    nameDe: 'Halale Hähnchen-Frankfurter',
  },
  'Turkey Frankfurter': {
    nameAr: 'سجق ديك رومي حلال فرانكفورتر',
    nameEn: 'Halal Turkey Frankfurter',
    nameFr: 'Frankfurter de dinde halal',
    nameEs: 'Salchicha de pavo halal',
    nameDe: 'Halale Truthahn-Frankfurter',
  },
  'Meat & Sausage Pizza': {
    nameAr: 'بيتزا لحم بقري وسجق حلال',
    nameEn: 'Halal Beef and Sausage Pizza',
    nameFr: 'Pizza au bœuf et à la saucisse halal',
    nameEs: 'Pizza de res y salchicha halal',
    nameDe: 'Halal-Pizza mit Rindfleisch und Wurst',
  },
};

for (const category of raw) {
  for (const dish of category.dishes) {
    const replacement = HALAL_REPLACEMENTS[dish.nameEn ?? ''];
    if (!replacement) continue;
    Object.assign(dish, {
      name: replacement.nameAr,
      nameEn: replacement.nameEn,
      nameFr: replacement.nameFr,
      nameEs: replacement.nameEs,
      nameDe: replacement.nameDe,
      ...(replacement.cal_100 !== undefined ? { cal_100: replacement.cal_100 } : {}),
      ...(replacement.cal_serv !== undefined ? { cal_serv: replacement.cal_serv } : {}),
      ...(replacement.p !== undefined ? { p: replacement.p } : {}),
      ...(replacement.c !== undefined ? { c: replacement.c } : {}),
      ...(replacement.f !== undefined ? { f: replacement.f } : {}),
    });
  }
}

const normalizeMeal = (m?: string): string | undefined => {
  if (!m) return undefined;
  const aliases: Record<string, string> = { snacks: 'snack', drinks: 'drink' };
  return aliases[m] ?? m;
};

export const EGYPTIAN_FULL: EgyptianFullDish[] = raw.flatMap((cat) =>
  cat.dishes.map((d, i) => {
    const halalReplacement = HALAL_REPLACEMENTS[d.nameEn ?? ''];
    const servingGrams = d.serv_g;
    const ratio = servingGrams / 100;
    const dishMeal = normalizeMeal(d.mealTypes?.[0] ?? d.mealType);
    return {
      id: `${cat.id}_${i + 1}`,
      nameAr: halalReplacement?.nameAr ?? d.name,
      nameEn: halalReplacement?.nameEn ?? d.nameEn ?? d.name,
      nameFr: halalReplacement?.nameFr ?? d.nameFr,
      nameEs: halalReplacement?.nameEs ?? d.nameEs,
      nameDe: halalReplacement?.nameDe ?? d.nameDe,
      mealType: dishMeal ?? CATEGORY_MEAL[cat.id] ?? 'lunch',
      grams: servingGrams,
      kcal: halalReplacement?.cal_serv ?? d.cal_serv,
      protein: round1((halalReplacement?.p ?? d.p) * ratio),
      carbs: round1((halalReplacement?.c ?? d.c) * ratio),
      fat: round1((halalReplacement?.f ?? d.f) * ratio),
      cal100: halalReplacement?.cal_100 ?? d.cal_100,
      servG: servingGrams,
      healthy: d.healthy,
      source: d.source,
      p100: halalReplacement?.p ?? d.p,
      c100: halalReplacement?.c ?? d.c,
      f100: halalReplacement?.f ?? d.f,
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
