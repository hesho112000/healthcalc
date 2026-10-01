// Validates the UK base 200 and emits:
//   - scripts/uk-200-proposal.json
//   - src/data/uk-full.ts
//
// Mirrors scripts/build-australasia-base-100.js. kcal is never hand-typed: the row
// helper computes it as round(4P + 4C + 9F) and this script re-derives it
// independently, so a drifting macro is a hard failure rather than a silent pass.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const BASE = './uk-base-data';
const OUT_JSON = 'scripts/uk-200-proposal.json';
const OUT_TS = 'src/data/uk-full.ts';
const SOURCE_TAG = 'europe-uk-2026';

const CATEGORIES = new Set([
  'breakfast_items', 'rice_dishes', 'noodle_dishes', 'soups_stews', 'poultry_mains',
  'meat_mains', 'fish_seafood', 'vegetable_mains', 'street_snacks', 'rice_cakes_sweets',
  'condiments_sauces', 'beverages', 'fruit',
]);
const MEALS = new Set(['breakfast', 'lunch', 'dinner', 'snack']);
const REGIONS = new Set([
  'pan_british', 'london', 'south_east', 'south_west', 'east_anglia', 'midlands',
  'north_west', 'yorkshire', 'north_east', 'lowlands', 'highlands', 'wales', 'ulster',
]);
const TOKENS = ['البريطاني', 'الاسكتلندي', 'الويلزي', 'الايرلندي'];
const EXPECTED_REGION_DIASPORA = {
  london: 'multicultural',
  lowlands: 'scottish',
  highlands: 'scottish',
  wales: 'welsh',
  ulster: 'irish',
};

// A hand-authored name may use the orthographic variants of a demonym
// (أ/إ/آ -> ا, ة/ه, ى/ي). Fold before counting so the same rule the row helper
// uses in scripts/uk-base-data/rows.mjs is enforced here.
const fold = (s) => s.replace(/[أإآ]/g, 'ا').replace(/[ةه]/g, 'ه').replace(/ى/g, 'ي');

let rows = [];
const BASE_ABS = resolve(process.cwd(), 'scripts', 'uk-base-data');
for (let i = 1; i <= 20; i++) {
  const file = join(BASE_ABS, `part${i}.mjs`);
  if (!existsSync(file)) break;
  const m = await import(pathToFileURL(file).href);
  rows = rows.concat(m.default);
}

const errors = [];
const warn = [];
const seenAr = new Map();
const seenEn = new Map();

rows.forEach((r, i) => {
  const tag = `#${i + 1} ${r.nameEn || r.nameAr}`;
  for (const [k, v] of Object.entries(r)) {
    if (k === 'id') continue;
    if (v === undefined || v === null || v === '') errors.push(`${tag}: empty field ${k}`);
  }
  for (const k of ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe']) {
    const v = r[k];
    if (typeof v !== 'string') { errors.push(`${tag}: ${k} not a string`); continue; }
    if (v.includes('\uFFFD')) errors.push(`${tag}: ${k} contains U+FFFD (corrupted)`);
    if (/\?/.test(v)) errors.push(`${tag}: ${k} contains '?' (corrupted)`);
  }
  const ar = r.nameAr || '';
  if (/[A-Za-z]/.test(ar)) errors.push(`${tag}: nameAr contains latin chars -> "${ar}"`);
  for (const k of ['nameEn', 'nameFr', 'nameEs', 'nameDe']) {
    if (r[k] === ar) errors.push(`${tag}: ${k} identical to nameAr (untranslated)`);
  }
  if (!CATEGORIES.has(r.category)) errors.push(`${tag}: bad category "${r.category}"`);
  if (!MEALS.has(r.mealType)) errors.push(`${tag}: bad mealType "${r.mealType}"`);
  if (!REGIONS.has(r.region)) errors.push(`${tag}: bad region "${r.region}"`);
  if (r.region === 'asian_shared') errors.push(`${tag}: asian_shared must stay 0`);
  if (r.grams !== 100) errors.push(`${tag}: grams must be 100, got ${r.grams}`);

  for (const k of ['protein', 'carbs', 'fat']) {
    if (typeof r[k] !== 'number' || r[k] < 0) errors.push(`${tag}: bad ${k}`);
    if (r[k] > 100) errors.push(`${tag}: ${k} > 100 (impossible)`);
  }
  if (r.protein + r.carbs + r.fat > 100) errors.push(`${tag}: macros sum > 100g`);
  const expect = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  if (r.kcal !== expect) errors.push(`${tag}: Atwater drift kcal=${r.kcal} expected ${expect}`);

  const toks = fold(ar).split(/\s+/).filter((t) => TOKENS.includes(t));
  if (toks.length !== 1) errors.push(`${tag}: expected exactly 1 nationality token, found ${toks.length}`);

  if (!Array.isArray(r.diaspora_priority) || r.diaspora_priority.length < 3) {
    errors.push(`${tag}: diaspora_priority must be an array with >= 3 tags`);
  } else {
    for (const t of ['british', 'western', 'comfort_food']) {
      if (!r.diaspora_priority.includes(t)) errors.push(`${tag}: diaspora_priority missing "${t}"`);
    }
    const extra = EXPECTED_REGION_DIASPORA[r.region];
    if (extra) {
      if (!r.diaspora_priority.includes(extra)) errors.push(`${tag}: region ${r.region} must add "${extra}"`);
    } else if (r.diaspora_priority.length !== 3) {
      errors.push(`${tag}: region ${r.region} has no extra tag, expected exactly 3, got ${r.diaspora_priority.length}`);
    }
  }

  const kar = ar.replace(/\s+/g, ' ').trim();
  if (seenAr.has(kar)) errors.push(`${tag}: duplicate Arabic name with ${seenAr.get(kar)}`);
  seenAr.set(kar, tag);
  const ken = r.nameEn.toLowerCase().replace(/\s+/g, ' ').trim();
  if (seenEn.has(ken)) errors.push(`${tag}: duplicate English name "${ken}" with ${seenEn.get(ken)}`);
  seenEn.set(ken, tag);
});

if (rows.length !== 200) errors.push(`expected 200 rows, got ${rows.length}`);

for (const region of REGIONS) {
  if (!rows.some((r) => r.region === region)) errors.push(`region "${region}" has no rows`);
}

// ---------- live DB duplicate check ----------
const url = process.env.SUPABASE_URL;
const key = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (url && key) {
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const live = [];
  let from = 0;
  for (;;) {
    const { data, error } = await supabase.from('dishes').select('name_ar,name_en,source').order('id').range(from, from + 999);
    if (error) throw error;
    live.push(...data);
    if (data.length < 1000) break;
    from += 1000;
  }
  const foreign = live.filter((r) => !(r.source ?? '').startsWith(SOURCE_TAG));
  const liveAr = new Set(foreign.map((r) => fold((r.name_ar || '').replace(/\s+/g, ' ').trim())));
  const liveEn = new Set(foreign.map((r) => (r.name_en || '').toLowerCase().replace(/\s+/g, ' ').trim()));
  for (const r of rows) {
    if (liveAr.has(fold(r.nameAr.replace(/\s+/g, ' ').trim()))) errors.push(`live DB duplicate Arabic: ${r.nameAr}`);
  }
  let enClash = 0;
  for (const r of rows) {
    if (liveEn.has(r.nameEn.toLowerCase().replace(/\s+/g, ' ').trim())) enClash++;
  }
  if (enClash) warn.push(`${enClash} English name(s) also exist in other kitchens (expected for generic pan-cuisine names; Arabic names are unique)`);
  console.log(`live DB rows scanned: ${live.length}`);
} else {
  warn.push('no Supabase creds; skipped live duplicate check');
}

// ---------- report ----------
const byCat = {};
const byRegion = {};
for (const r of rows) {
  byCat[r.category] = (byCat[r.category] || 0) + 1;
  byRegion[r.region] = (byRegion[r.region] || 0) + 1;
}
console.log('rows:', rows.length);
console.log('by category:', JSON.stringify(byCat));
console.log('by region  :', JSON.stringify(byRegion));
for (const w of warn) console.log('WARN:', w);
if (errors.length) {
  console.log(`\nFAILED with ${errors.length} error(s):`);
  for (const e of errors.slice(0, 60)) console.log('  -', e);
  process.exit(1);
}
console.log('\nVALIDATION PASSED');

// ---------- emit ----------
const SOURCE = `${SOURCE_TAG} - Verified against British culinary heritage (England, Scotland, Wales, Northern Ireland)`;
const toDb = (r) => ({
  name_ar: r.nameAr,
  name_en: r.nameEn,
  name_fr: r.nameFr,
  name_es: r.nameEs,
  name_de: r.nameDe,
  category: r.category,
  mealType: r.mealType,
  region: r.region,
  cal_100: r.kcal,
  protein: r.protein,
  carbs: r.carbs,
  fat: r.fat,
  source: SOURCE,
  diaspora_priority: r.diaspora_priority,
});

const payload = rows.map((r, i) => ({
  id: `uk-base-${String(i + 1).padStart(3, '0')}`,
  ...toDb(r),
  grams: r.grams,
  cooking: r.cooking,
}));
writeFileSync(OUT_JSON, JSON.stringify({ dishes: payload }, null, 2) + '\n', 'utf8');

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const body = rows
  .map(
    (r, i) => `    {
      "id": "uk-base-${String(i + 1).padStart(3, '0')}",
      "nameAr": "${esc(r.nameAr)}",
      "nameEn": "${esc(r.nameEn)}",
      "nameFr": "${esc(r.nameFr)}",
      "nameEs": "${esc(r.nameEs)}",
      "nameDe": "${esc(r.nameDe)}",
      "category": "${esc(r.category)}",
      "mealType": "${esc(r.mealType)}",
      "grams": ${r.grams},
      "kcal": ${r.kcal},
      "protein": ${r.protein},
      "carbs": ${r.carbs},
      "fat": ${r.fat},
      "cooking": "${esc(r.cooking)}",
      "region": "${esc(r.region)}",
      "diaspora_priority": [${r.diaspora_priority.map((t) => `'${String(t).replace(/'/g, "\\'")}'`).join(', ')}]
    }`
  )
  .join(',\n');

writeFileSync(
  OUT_TS,
  `// AUTO-GENERATED by scripts/build-uk-base-200.js - do not edit by hand.
// UK kitchen, ${payload.length} dishes, 100 g serving basis.
// kcal = round(4*protein + 4*carbs + 9*fat) (Atwater), verified by the builder.
// Halal: no pork, no alcohol, no blood, no wild game.
// Tokens: British / Scottish / Welsh / Irish -> pan_british anchor. asian_shared intentionally 0.
export interface KitchenDish {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  nameEs: string;
  nameDe: string;
  category: string;
  mealType: string;
  grams: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  cooking?: string;
  region?: string;
  diaspora_priority?: string[];
}

export const UK_FULL: KitchenDish[] = [
${body}
];
`,
  'utf8'
);
console.log(`wrote ${OUT_JSON} and ${OUT_TS}`);