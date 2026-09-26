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
      const rows: { region: string | null; source: string | null }[] = [];
      const PAGE = 1000;
      try {
        for (let from = 0; ; from += PAGE) {
          const { data, error } = await supabaseClient!
            .from('dishes')
            .select('region, source')
            .order('id', { ascending: true })
            .range(from, from + PAGE - 1);
          if (error) throw error;
          rows.push(...((data ?? []) as { region: string | null; source: string | null }[]));
          if ((data ?? []).length < PAGE) break;
        }
        for (const [id, set] of Object.entries(KITCHEN_COUNT_REGIONS)) {
          out[id] = rows.reduce((n, r) => n + (set.has(r.region) ? 1 : 0), 0);
        }
        // Lebanon's card credits its shared Levantine/MENA family rows — only the
        // ones authored with the levant-2026 source prefix (own set is region-only).
        out.lebanese += rows.filter(
          (r) =>
            (r.region === 'levantine_shared' || r.region === 'mena_shared') &&
            (r.source ?? '').startsWith('levant-2026'),
        ).length;
        // Syria's card mirrors Lebanon: credits its own shared family rows, identified
        // by the levant-syria-2026 source prefix so Lebanese ones never double-count.
        out.syrian += rows.filter(
          (r) =>
            (r.region === 'levantine_shared' || r.region === 'mena_shared') &&
            (r.source ?? '').startsWith('levant-syria-'),
        ).length;
        // Jordan's card mirrors Lebanon/Syria: credits its own shared family rows,
        // identified by the levant-jordan- source prefix so Lebanese/Syrian ones
        // are never double-counted.
        out.jordanian += rows.filter(
          (r) =>
            (r.region === 'levantine_shared' || r.region === 'mena_shared') &&
            (r.source ?? '').startsWith('levant-jordan-'),
        ).length;
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