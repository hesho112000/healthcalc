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
        // Palestine's card mirrors the other Levant cards: credits its own shared
        // family rows, identified by the levant-palestine- source prefix.
        out.palestinian += rows.filter(
          (r) =>
            (r.region === 'levantine_shared' || r.region === 'mena_shared') &&
            (r.source ?? '').startsWith('levant-palestine-'),
        ).length;
        // India's card credits its own Asian-shared pool rows, identified by the
        // asia-india-2026 source prefix so other kitchens never double-count them.
        out.indian += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('asia-india-2026'),
        ).length;
        // Pakistan's card mirrors India: credits its own Asian-shared pool rows,
        // identified by the asia-pakistan-2026 source prefix.
        out.pakistani += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('asia-pakistan-2026'),
        ).length;
        // Indonesia's card mirrors India/Pakistan: credits its own Asian-shared pool
        // rows, identified by the asia-indonesia-2026 source prefix.
        out.indonesian += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('asia-indonesia-2026'),
        ).length;
        // Malaysia's card mirrors Indonesia: credits its own Asian-shared pool rows,
        // identified by the asia-malaysia-2026 source prefix.
        out.malaysian += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('asia-malaysia-2026'),
        ).length;
        // Nigeria's card mirrors the South Asian cards: credits its own African-shared
        // pool rows, identified by the africa-nigeria-2026 source prefix.
        out.nigerian += rows.filter(
          (r) => r.region === 'african_shared' && (r.source ?? '').startsWith('africa-nigeria-2026'),
        ).length;
        // Ethiopia's card mirrors Nigeria: credits its own African-shared pool rows,
        // identified by the africa-ethiopia-2026 source prefix.
        out.ethiopian += rows.filter(
          (r) => r.region === 'african_shared' && (r.source ?? '').startsWith('africa-ethiopia-2026'),
        ).length;
        // Kenya's card mirrors Ethiopia: credits its own African-shared pool rows,
        // identified by the africa-kenya-2026 source prefix.
        out.kenyan += rows.filter(
          (r) => r.region === 'african_shared' && (r.source ?? '').startsWith('africa-kenya-2026'),
        ).length;
        // South Africa's card mirrors Kenya: credits its own African-shared pool rows,
        // identified by the africa-south-africa-2026 source prefix.
        out['south-african'] += rows.filter(
          (r) => r.region === 'african_shared' && (r.source ?? '').startsWith('africa-south-africa-2026'),
        ).length;
        // Ghana's card mirrors South Africa: credits its own African-shared pool rows,
        // identified by the africa-ghana-2026 source prefix.
        out.ghanaian += rows.filter(
          (r) => r.region === 'african_shared' && (r.source ?? '').startsWith('africa-ghana-2026'),
        ).length;
        // Rwanda's card mirrors Ghana: credits its own African-shared pool rows,
        // identified by the africa-rwanda-2026 source prefix.
        out.rwandan += rows.filter(
          (r) => r.region === 'african_shared' && (r.source ?? '').startsWith('africa-rwanda-2026'),
        ).length;
        // Seychelles' card mirrors Ghana: credits its own African-shared pool rows,
        // identified by the africa-seychelles-2026 source prefix.
        out.seychellois += rows.filter(
          (r) => r.region === 'african_shared' && (r.source ?? '').startsWith('africa-seychelles-2026'),
        ).length;
        // Mauritius' card mirrors Ghana: credits its own African-shared pool rows,
        // identified by the africa-mauritius-2026 source prefix.
        out.mauritian += rows.filter(
          (r) => r.region === 'african_shared' && (r.source ?? '').startsWith('africa-mauritius-2026'),
        ).length;
        // Gabon's card mirrors Ghana: credits its own African-shared pool rows,
        // identified by the africa-gabon-2026 source prefix.
        out.gabonese += rows.filter(
          (r) => r.region === 'african_shared' && (r.source ?? '').startsWith('africa-gabon-2026'),
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