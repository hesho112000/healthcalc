import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabaseClient, hasSupabaseConfig } from '../lib/supabaseClient';
import type { KitchenDish, KitchenInfo } from '../data/kitchens';

export interface ServingOption {
  label: string;
  label_en: string | null;
  multiplier: number | null;
  grams: number | null;
  kcal: number | null;
}

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

interface ServingOptionRow {
  dish_id: string;
  label_ar: string | null;
  label_en: string | null;
  multiplier: number | null;
  grams: number | null;
  kcal: number | null;
}

function reconstructMealTypes(name: string, mealType: string | null): string[] | undefined {
  if (!mealType) return undefined;
  const t = mealType.toLowerCase();
  if (t === 'snacks' || t === 'snack' || t === 'dessert' || t === 'juice') return ['snacks'];
  if (t === 'lunch') {
    if (/تونة ماء/.test(name)) return ['lunch'];
    return ['lunch', 'dinner'];
  }
  if (t === 'breakfast') {
    if (/خبز|تميس|مطبق|فطيرة|فطائر|سمبوسك|كعك|كماج|قرصان|عصيدة|حليب|قهوة|شاي|تمر|عسل|زبادي|لبنة|جبنة بيضاء|مناقيش/.test(name)) return ['breakfast', 'snacks'];
    return ['breakfast'];
  }
  return [t];
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
    mealTypes: reconstructMealTypes(r.name_ar ?? r.name_en ?? '', r.meal_type),
    region: r.region ?? undefined,
  };
}

async function fetchAllDishes(): Promise<DishRow[]> {
  const { data, error } = await supabaseClient!.from('dishes').select('*').order('name_ar', { ascending: true });
  if (error) throw error;
  return (data ?? []) as DishRow[];
}

async function fetchAllServingOptions(): Promise<ServingOptionRow[]> {
  const out: ServingOptionRow[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabaseClient!.from('serving_options').select('*').order('id', { ascending: true }).range(from, from + PAGE - 1);
    if (error) throw error;
    const rows = (data ?? []) as ServingOptionRow[];
    out.push(...rows);
    if (rows.length < PAGE) break;
  }
  return out;
}

export interface UseDishesResult {
  kitchen: KitchenInfo | null;
  dishes: KitchenDish[];
  servingOptions: Record<string, ServingOption[]>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const KITCHEN_NAME = 'المطبخ السعودي';
const KITCHEN_CITY = 'الرياض 🇸🇦';
const KITCHEN_COUNTRY = 'السعودية 🇸🇦';
const KITCHEN_FLAG = '🇸🇦';

export function useDishes(): UseDishesResult {
  const [dishes, setDishes] = useState<KitchenDish[]>([]);
  const [servingOptions, setServingOptions] = useState<Record<string, ServingOption[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const refetch = useCallback(() => setTick((v) => v + 1), []);

  useEffect(() => {
    if (!hasSupabaseConfig()) {
      setDishes([]);
      setServingOptions({});
      setLoading(false);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const [rows, soRows] = await Promise.all([fetchAllDishes(), fetchAllServingOptions()]);
        if (cancelled) return;
        const map = new Map<string, DishRow>();
        for (const r of rows) map.set(r.id, r);
        const soMap: Record<string, ServingOption[]> = {};
        for (const so of soRows) {
          const dish = map.get(so.dish_id);
          if (!dish) continue;
          const key = dish.name_ar ?? dish.name_en ?? '';
          if (!soMap[key]) soMap[key] = [];
          soMap[key].push({
            label: so.label_ar ?? '',
            label_en: so.label_en,
            multiplier: so.multiplier,
            grams: so.grams,
            kcal: so.kcal,
          });
        }
        if (cancelled) return;
        setDishes(rows.map(rowToDish));
        setServingOptions(soMap);
        setLoading(false);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const kitchen = useMemo<KitchenInfo | null>(() => {
    if (!dishes.length) return null;
    return {
      id: 'saudi',
      kitchen: KITCHEN_NAME,
      city: KITCHEN_CITY,
      country: KITCHEN_COUNTRY,
      flag: KITCHEN_FLAG,
      total: dishes.length,
      conf100: dishes.filter((d) => d.confidence === 100).length,
      conf85: dishes.filter((d) => d.confidence === 85).length,
      conf70: dishes.filter((d) => d.confidence === 70).length,
      sample: dishes[0] ?? null,
      dishes,
      categories: [],
      regions: [...new Set(dishes.map((d) => d.region).filter((r): r is string => !!r))],
      rich: true,
    };
  }, [dishes]);

  return { kitchen, dishes, servingOptions, loading, error, refetch };
}