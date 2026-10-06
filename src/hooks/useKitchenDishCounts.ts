import { useEffect, useState } from 'react';
import { supabaseClient, hasSupabaseConfig } from '../lib/supabaseClient';
import { KITCHEN_COUNT_REGIONS } from '../utils/kitchenAuthenticity';
import { EASTERN_EUROPEAN_FULL } from '../data/eastern-european-full';
import { ARGENTINA_FULL } from '../data/argentina-full';
import { COLOMBIA_FULL } from '../data/colombia-full';
import { PERU_FULL } from '../data/peru-full';
import { CHILE_FULL } from '../data/chile-full';
import { NORWAY_FULL } from '../data/norway-full';
import { SWEDEN_FULL } from '../data/sweden-full';
import { DENMARK_FULL } from '../data/denmark-full';
import { FINLAND_FULL } from '../data/finland-full';
import { UKRAINE_FULL } from '../data/ukraine-full';

// Live per-kitchen dish counts fetched from the dishes table via the region-tag
// mapping in KITCHEN_COUNT_REGIONS. Returns {} until loaded, when Supabase is
// unconfigured, or on error — callers fall back to their local registry totals.
// Registry ids (derived from the src/data/<file>-full.ts names) that differ from
// the canonical KITCHEN_COUNT_REGIONS id for the same kitchen.
export const KITCHEN_ID_ALIAS: Record<string, string> = {
  germany: 'german',
  canada: 'canadian',
  australasia: 'australasian',
  australian: 'australasian',
  'new-zealand': 'australasian',
  usa: 'american',
  uk: 'british',
  switzerland: 'swiss',
  taiwan: 'taiwanese',
  turkey: 'turkish',
  austria: 'austrian',
  // src/data/<country>-full.ts basenames vs the canonical demonym ids.
  norway: 'norwegian',
  sweden: 'swedish',
  denmark: 'danish',
  finland: 'finnish',
  ukraine: 'ukrainian',
};

// These kitchens use local full datasets rather than Supabase dish counts.
const LOCAL_ONLY_KITCHEN_COUNTS: Record<string, number> = {
  norwegian: NORWAY_FULL.length,
  swedish: SWEDEN_FULL.length,
  danish: DENMARK_FULL.length,
  finnish: FINLAND_FULL.length,
  ukrainian: UKRAINE_FULL.length,
  'eastern-european': EASTERN_EUROPEAN_FULL.length,
  argentinian: ARGENTINA_FULL.length,
  colombian: COLOMBIA_FULL.length,
  peruvian: PERU_FULL.length,
  chilean: CHILE_FULL.length,
};
const LOCAL_ONLY_KITCHEN_COUNTS_WITH_ALIASES = {
  ...LOCAL_ONLY_KITCHEN_COUNTS,
  ...Object.fromEntries(
    Object.entries(KITCHEN_ID_ALIAS)
      .filter(([, canonical]) => Object.prototype.hasOwnProperty.call(LOCAL_ONLY_KITCHEN_COUNTS, canonical))
      .map(([alias, canonical]) => [alias, LOCAL_ONLY_KITCHEN_COUNTS[canonical]]),
  ),
};
const LOCAL_ONLY_KITCHEN_IDS = new Set(Object.keys(LOCAL_ONLY_KITCHEN_COUNTS_WITH_ALIASES));

export function useKitchenDishCounts(): Record<string, number> {
  const [counts, setCounts] = useState<Record<string, number>>({ ...LOCAL_ONLY_KITCHEN_COUNTS_WITH_ALIASES });

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
          if (LOCAL_ONLY_KITCHEN_IDS.has(id)) continue;
          out[id] = rows.reduce((n, r) => n + (set.has(r.region) ? 1 : 0), 0);
        }
        Object.assign(out, LOCAL_ONLY_KITCHEN_COUNTS_WITH_ALIASES);
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
        // Botswana's card mirrors Gabon: credits its own African-shared pool rows,
        // identified by the africa-botswana-2026 source prefix.
        out.botswanan += rows.filter(
          (r) => r.region === 'african_shared' && (r.source ?? '').startsWith('africa-botswana-2026'),
        ).length;
        // The Filipino card mirrors the shared-pool kitchens: credits its own
        // asian_shared pool rows, identified by the asia-philippines-2026 source prefix.
        out.filipino += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('asia-philippines-2026'),
        ).length;
        // The Thai card mirrors the shared-pool kitchens: credits its own
        // asian_shared pool rows, identified by the asia-thailand-2026 source prefix.
        out.thai += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('asia-thailand-2026'),
        ).length;
        // The Vietnamese card mirrors the shared-pool kitchens: credits its own
        // asian_shared pool rows, identified by the asia-vietnam-2026 source prefix.
        out.vietnamese += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('asia-vietnam-2026'),
        ).length;
        // The Chinese card mirrors the shared-pool kitchens: credits its own
        // asian_shared pool rows, identified by the asia-china-2026 source prefix.
        out.chinese += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('asia-china-2026'),
        ).length;
        // The Korean card mirrors the shared-pool kitchens: credits its own
        // asian_shared pool rows, identified by the asia-korea-2026 source prefix.
        // Currently 0 (asian_shared deliberately left empty), but kept so the count
        // stays correct if any shared rows are ever added.
        out.korean += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('asia-korea-2026'),
        ).length;
        // The Taiwanese card mirrors the Korean card: credits its own asian_shared
        // pool rows, identified by the asia-taiwan-2026 source prefix. Currently 0
        // (asian_shared deliberately left empty), kept for future shared rows.
        out.taiwanese += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('asia-taiwan-2026'),
        ).length;
        // The American card mirrors the Taiwanese card: credits its own americas-usa-2026
        // rows that live outside its own region set (shared pools / future shared rows),
        // identified by the source prefix so no other kitchen's rows are pulled in.
        // Own region-tagged rows are already counted by KITCHEN_COUNT_REGIONS.american.
        out.american += rows.filter(
          (r) =>
            (r.source ?? '').startsWith('americas-usa-2026') &&
            !KITCHEN_COUNT_REGIONS.american.has(r.region),
        ).length;
        // Canada's card credits Canada-source rows outside its own region set.
        out.canadian += rows.filter(
          (r) =>
            (r.source ?? '').startsWith('americas-canada-2026') &&
            !KITCHEN_COUNT_REGIONS.canadian.has(r.region),
        ).length;
        // Britan's card mirrors Australasia: credit source-tagged shared-pool rows.
        out.british += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('europe-uk-2026'),
        ).length;
        // Australasia's card mirrors Taiwan: credit source-tagged shared-pool rows.
        out.australasian += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('oceania-australasia-2026'),
        ).length;
        // Germany's card mirrors Britain/Australasia: credit source-tagged shared-pool rows.
        out.german += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('europe-germany-2026'),
        ).length;
        // Austria's card mirrors Germany: credit source-tagged shared-pool rows.
        out.austrian += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('europe-austria-2026'),
        ).length;
        // France's card mirrors Austria: credit source-tagged shared-pool rows.
        out.french += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('europe-france-2026'),
        ).length;
        // Benelux's card mirrors France: credit source-tagged shared-pool rows.
        out.benelux += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('europe-benelux-2026'),
        ).length;
        // Italy's card mirrors Benelux: credit source-tagged shared-pool rows.
        out.italian += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('europe-italy-2026'),
        ).length;
        // Spain's card mirrors Italy: credit source-tagged shared-pool rows.
        out.spanish += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('europe-spain-2026'),
        ).length;
        // Greece's card mirrors Spain: credit source-tagged shared-pool rows.
        out.greek += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('europe-greece-2026'),
        ).length;
        // Turkey's card mirrors Greece: credit source-tagged shared-pool rows.
        out.turkish += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('europe-turkey-2026'),
        ).length;
        // Switzerland's card mirrors Germany: credit source-tagged shared-pool rows.
        out.swiss += rows.filter(
          (r) => r.region === 'asian_shared' && (r.source ?? '').startsWith('europe-switzerland-2026'),
        ).length;
        for (const [alias, canonical] of Object.entries(KITCHEN_ID_ALIAS)) {
          if (out[canonical] !== undefined) out[alias] = out[canonical];
        }
        if (!cancelled) setCounts(out);
      } catch {
        if (!cancelled) setCounts({ ...LOCAL_ONLY_KITCHEN_COUNTS_WITH_ALIASES });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return counts;
}
