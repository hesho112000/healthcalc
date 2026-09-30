// Validates the Canada base 100 and emits:
//   - scripts/canada-100-proposal.json
//   - src/data/canada-full.ts
//
// Mirrors scripts/build-usa-base-250.js. kcal is never hand-typed: the row
// helper computes it as round(4P + 4C + 9F) and this script RE-DERIVES it
// independently, so a drifting macro is a hard failure rather than a silent pass.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const BASE = './canada-base-data';
const OUT_JSON = 'scripts/canada-100-proposal.json';
const OUT_TS = 'src/data/canada-full.ts';

const CATEGORIES = new Set([
  'breakfast_items', 'rice_dishes', 'noodle_dishes', 'soups_stews', 'poultry_mains',
  'meat_mains', 'fish_seafood', 'vegetable_mains', 'street_snacks', 'rice_cakes_sweets',
  'condiments_sauces', 'beverages', 'fruit',
]);
const MEALS = new Set(['breakfast', 'lunch', 'dinner', 'snack']);
const REGIONS = new Set([
  'pan_canadian', 'quebec', 'ontario', 'british_columbia', 'prairies',
  'atlantic_canada', 'northern_canada', 'indigenous_canada',
]);
const TOKENS = ['كندي'];

let rows = [];
const BASE_ABS = resolve(process.cwd(), 'scripts', 'canada-base-data');
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
  if (r.grams !== 100) errors.push(`${tag}: grams must be 100, got ${r.grams}`);

  for (const k of ['protein', 'carbs', 'fat']) {
    if (typeof r[k] !== 'number' || r[k] < 0) errors.push(`${tag}: bad ${k}`);
    if (r[k] > 100) errors.push(`${tag}: ${k} > 100 (impossible)`);
  }
  if (r.protein + r.carbs + r.fat > 100) errors.push(`${tag}: macros sum > 100g`);
  const expect = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  if (r.kcal !== expect) errors.push(`${tag}: Atwater drift kcal=${r.kcal} expected ${expect}`);

  const toks = TOKENS.filter((t) => ar.includes(t));
  if (toks.length !== 1) errors.push(`${tag}: expected exactly 1 token, found ${toks.length}`);

  if (!Array.isArray(r.diaspora_priority) || r.diaspora_priority.length < 3) {
    errors.push(`${tag}: diaspora_priority must be an array with >= 3 tags`);
  }

  const kar = ar.replace(/\s+/g, ' ').trim();
  if (seenAr.has(kar)) errors.push(`${tag}: duplicate Arabic name with ${seenAr.get(kar)}`);
  seenAr.set(kar, tag);
  const ken = r.nameEn.toLowerCase().replace(/\s+/g, ' ').trim();
  if (seenEn.has(ken)) errors.push(`${tag}: duplicate English name "${ken}" with ${seenEn.get(ken)}`);
  seenEn.set(ken, tag);
});

if (rows.length !== 100) errors.push(`expected 100 rows, got ${rows.length}`);

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
  const foreign = live.filter((r) => !(r.source ?? '').startsWith('americas-canada-2026'));
  const liveAr = new Set(foreign.map((r) => (r.name_ar || '').replace(/\s+/g, ' ').trim()));
  const liveEn = new Set(foreign.map((r) => (r.name_en || '').toLowerCase().replace(/\s+/g, ' ').trim()));
  for (const r of rows) {
    if (liveAr.has(r.nameAr.replace(/\s+/g, ' ').trim())) errors.push(`live DB duplicate Arabic: ${r.nameAr}`);
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
const SOURCE = 'americas-canada-2026 - Verified against Canadian culinary heritage';
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
  id: `canada-base-${String(i + 1).padStart(3, '0')}`,
  ...toDb(r),
  grams: r.grams,
  cooking: r.cooking,
}));
writeFileSync(OUT_JSON, JSON.stringify({ dishes: payload }, null, 2) + '\n', 'utf8');

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const body = rows
  .map(
    (r, i) => `    {
      "id": "canada-base-${String(i + 1).padStart(3, '0')}",
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
  `// AUTO-GENERATED by scripts/build-canada-base-100.js - do not edit by hand.
// Canada base kitchen, ${payload.length} dishes, 100 g serving basis.
// kcal = round(4*protein + 4*carbs + 9*fat) (Atwater), verified by the builder.
// Halal: no pork, no alcohol, no blood, no wild game.
// Token: كندي -> pan_canadian. asian_shared intentionally 0.
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

export const CANADA_FULL: KitchenDish[] = [
${body}
];
`,
  'utf8'
);
console.log(`wrote ${OUT_JSON} and ${OUT_TS}`);