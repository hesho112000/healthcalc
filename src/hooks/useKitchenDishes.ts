import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabaseClient, hasSupabaseConfig } from '../lib/supabaseClient';
import type { KitchenDish, KitchenInfo } from '../data/kitchens';
import { kitchensRegistry } from '../data/kitchens';
import { isAuthenticForKitchen, KITCHEN_REGION_FAMILIES } from '../utils/kitchenAuthenticity';

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
    mealTypes: reconstructMealTypes(r.name_ar ?? r.name_en ?? '', r.meal_type),
    region: r.region ?? undefined,
  };
}

// Kitchen ids that have a region family (and therefore live Supabase data):
// every country cuisine that went through the Supabase migrations. Diets and
// global cuisines stay on their local registry files.
export const KITCHEN_FAMILY_IDS: string[] = Object.keys(KITCHEN_REGION_FAMILIES);

const PAGE = 1000;

// Module-level cache so all hook instances share a single fetch of the dishes table.
let dishesCache: Promise<DishRow[]> | null = null;

function loadAllDishes(): Promise<DishRow[]> {
  if (!dishesCache) {
    dishesCache = (async () => {
      if (!hasSupabaseConfig()) return [];
      const out: DishRow[] = [];
      for (let from = 0; ; from += PAGE) {
        const { data, error } = await supabaseClient!
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
    })();
  }
  return dishesCache;
}

export interface UseKitchenDishesResult {
  kitchens: Record<string, KitchenInfo>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Fetches the LIVE Supabase dishes for every kitchen with a region family.
 * Each kitchen is attributed only dishes whose region belongs to its family
 * (and whose name carries no FOREIGN nationality) — the same
 * KITCHEN_REGION_FAMILIES + isAuthenticForKitchen rules used everywhere else.
 * Falls back to the static registry when Supabase is unconfigured or empty.
 */
export function useKitchenDishes(): UseKitchenDishesResult {
  const [rows, setRows] = useState<DishRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const refetch = useCallback(() => {
    dishesCache = null;
    setTick((v) => v + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const all = await loadAllDishes();
        if (cancelled) return;
        setRows(all);
        setLoading(false);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
        setRows([]);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const kitchens = useMemo<Record<string, KitchenInfo>>(() => {
    const out: Record<string, KitchenInfo> = {};
    for (const k of kitchensRegistry) {
      if (!KITCHEN_FAMILY_IDS.includes(k.id)) continue;
      // Unlabeled legacy rows (region = null) are all Saudi-era content, so only
      // Saudi may draw from them. Every other kitchen gets region-tagged family rows.
      const pool = (r: DishRow) =>
        r.region != null ? isAuthenticForKitchen(k.id, r.region, r.name_ar) : k.id === 'saudi' && isAuthenticForKitchen('saudi', null, r.name_ar);
      const dishes = rows.filter(pool).map(rowToDish);
      if (!dishes.length) continue;
      out[k.id] = {
        id: k.id,
        kitchen: k.kitchen,
        city: k.city,
        country: k.country,
        flag: k.flag,
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
    }
    return out;
  }, [rows]);

  return { kitchens, loading, error, refetch };
}