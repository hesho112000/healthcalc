import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const APPLY = process.argv.includes('--apply');

async function fetchAll(table) {
  const out = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('id', { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    const rows = data ?? [];
    out.push(...rows);
    if (rows.length < PAGE) break;
  }
  return out;
}

const normalizeName = (s) =>
  (s ?? '')
    .replace(/[\u064B-\u0652\u0670]/g, '')
    .replace(/\u0640/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim();

// Which rows live in the SAUDI pool (region family kept for the saudi kitchen).
const SAUDI_FAMILY = new Set(['gulf_shared', 'pan_saudi', 'hijazi', 'najdi', 'janubi', 'sharqi']);

// Nationality-adjective -> correct region. Keys are NORMALIZED forms (ة->ه).
const TOKEN_REGIONS = {
  قطري: 'pan_qatari', قطريه: 'pan_qatari',
  بحريني: 'pan_bahraini', بحرينيه: 'pan_bahraini',
  عماني: 'pan_omani', عمانيه: 'pan_omani',
  كويتي: 'pan_kuwaiti', كويتيه: 'pan_kuwaiti',
  إماراتي: 'pan_emirati', إماراتيه: 'pan_emirati', اماراتي: 'pan_emirati', اماراتيه: 'pan_emirati',
  مغربي: 'pan_moroccan', مغربيه: 'pan_moroccan',
  مصري: 'pan_egyptian', مصريه: 'pan_egyptian',
  لبناني: 'mena_shared', لبنانيه: 'mena_shared',
  سوري: 'mena_shared', سوريه: 'mena_shared',
  شامي: 'mena_shared', شاميه: 'mena_shared',
  أردني: 'mena_shared', أردنيه: 'mena_shared',
  فلسطيني: 'mena_shared', فلسطينيه: 'mena_shared',
  يمني: 'mena_shared', يمنيه: 'mena_shared',
  عراقي: 'mena_shared', عراقيه: 'mena_shared',
  هندي: 'global', هنديه: 'global',
  تركي: 'global', تركيه: 'global',
  باكستاني: 'global', باكستانيه: 'global',
};

// Tokens that LOOK like nationalities but are common Arabic nouns.
const NO_RETAG_TOKENS = new Set(['صيني', 'صينيه', 'سوداني', 'سودانيه']);
const TAMARIND_HINDI = /تمر\s*(?:ال)?هندي/;

// Returns region if the name carries a nationality adjective, else null.
const nationalityRegion = (norm) => {
  if (TAMARIND_HINDI.test(norm)) {
    norm = norm.replace(TAMARIND_HINDI, 'تمر');
  }
  for (const t of norm.split(/\s+/)) {
    if (NO_RETAG_TOKENS.has(t)) continue;
    const base = t.replace(/^ال/, '');
    if (TOKEN_REGIONS[base]) return TOKEN_REGIONS[base];
  }
  return null;
};

const LEVANTINE_BARE = new Set(['تبوله', 'فتوش']);

async function main() {
  const rows = await fetchAll('dishes');
  const plan = [];
  for (const r of rows) {
    const current = r.region ?? null;
    const norm = normalizeName(r.name_ar);
    const isSaudiFamily = current === null || SAUDI_FAMILY.has(current);

    let target = null;
    const suffix = nationalityRegion(norm);
    if (suffix) {
      target = suffix;
    } else if (isSaudiFamily && LEVANTINE_BARE.has(norm)) {
      target = 'mena_shared';
    }
    if (target && target !== current) {
      plan.push({ id: r.id, name_ar: r.name_ar, from: current, to: target });
    }
  }

  const byTo = {};
  for (const p of plan) (byTo[p.to] = byTo[p.to] || []).push(p);

  const order = Object.keys(byTo).sort();
  for (const to of order) {
    const list = byTo[to];
    console.log(`\n=== ${to} (${list.length}) ===`);
    for (const p of list) console.log(`  [${p.from ?? 'NULL'}] ${p.name_ar}`);
  }
  console.log(`\nTOTAL retag rows: ${plan.length}`);

  if (APPLY && plan.length) {
    let ok = 0;
    let failed = 0;
    for (const p of plan) {
      const { error } = await supabase.from('dishes').update({ region: p.to }).eq('id', p.id);
      if (error) {
        failed++;
        console.error(`  FAIL ${p.name_ar} -> ${p.to}: ${error.message}`);
      } else {
        ok++;
      }
    }
    console.log(`Applied: ${ok} updated, ${failed} failed.`);
  } else if (APPLY) {
    console.log('Nothing to apply.');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});