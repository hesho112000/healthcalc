import { useEffect, useState } from 'react';
import { supabaseClient, hasSupabaseConfig } from '../lib/supabaseClient';
import { KITCHEN_COUNT_REGIONS } from '../utils/kitchenAuthenticity';

// Live per-kitchen dish counts fetched from the dishes table via the region-tag
// mapping in KITCHEN_COUNT_REGIONS. Returns {} until loaded, when Supabase is
// unconfigured, or on error — callers fall back to their local registry totals.
export function useKitchenDishCounts(): Record<string, number> {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!hasSupabaseConfig()) return;
    let cancelled = false;
    (async () => {
      const out: Record<string, number> = {};
      const regions: (string | null)[] = [];
      const PAGE = 1000;
      try {
        for (let from = 0; ; from += PAGE) {
          const { data, error } = await supabaseClient!
            .from('dishes')
            .select('region')
            .order('id', { ascending: true })
            .range(from, from + PAGE - 1);
          if (error) throw error;
          const rows = (data ?? []) as { region: string | null }[];
          regions.push(...rows.map((r) => r.region));
          if (rows.length < PAGE) break;
        }
        for (const [id, set] of Object.entries(KITCHEN_COUNT_REGIONS)) {
          out[id] = regions.reduce((n, region) => n + (set.has(region) ? 1 : 0), 0);
        }
        if (!cancelled) setCounts(out);
      } catch {
        if (!cancelled) setCounts({});
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return counts;
}