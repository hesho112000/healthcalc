// Validates the Germany base 175 and emits:
//   - scripts/germany-175-proposal.json
//   - src/data/germany-full.ts
//
// Mirrors scripts/build-uk-base-200.js: kcal is never hand-typed, the row helper
// computes round(4P + 4C + 9F) and this script re-derives it independently, so a
// drifting macro is a hard failure rather than a silent pass.
//
// Germany differs from the UK builders in two ways:
//   1. Every region owns its own demonym (13 distinct tokens, one per region)
//      rather than sharing a single pan-European token.
//   2. The halal gate from scripts/germany-halal-scan.cjs runs here too, so a
//      banned dish fails the build rather than waiting for the CLI scanner.
//
// The TS bundle mirrors the UK handoff (GERMANY_FULL consumed by calculations.ts in
// Phase C). It holds the 175 base rows only; the 175 expansion rows stay in
// scripts/germany-expansion-175-proposal.json until they are migrated.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { scan } = require('./germany-halal-scan.cjs');

const BASE = './germany-base-data';
const OUT_JSON = 'scripts/germany-175-proposal.json';
const OUT_TS = 'src/data/germany-full.ts';
const SOURCE_TAG = 'europe-germany-2026';
const EXPECTED_ROWS = 175;

const CATEGORIES = new Set([
  'breakfast_items', 'rice_dishes', 'noodle_dishes', 'soups_stews', 'poultry_mains',
  'meat_mains', 'fish_seafood', 'vegetable_mains', 'street_snacks', 'rice_cakes_sweets',
  'condiments_sauces', 'beverages', 'fruit',
]);
const MEALS = new Set(['breakfast', 'lunch', 'dinner', 'snack']);
const REGIONS = [
  'pan_german', 'bavaria', 'berlin', 'hamburg', 'hesse', 'rhineland', 'saxony',
  'thuringia', 'brandenburg', 'lower_saxony', 'baden_wurttemberg', 'saarland', 'bremen',
];
const REGION_SET = new Set(REGIONS);
// Stored-normalized forms, one per region, exactly as scripts/germany-base-data/rows.mjs emits them.
const TOKENS = [
  'الالماني', 'البافاري', 'البرليني', 'الهامبورغي', 'الهيسي', 'الراينلاندي', 'الساكسوني',
  'التورينغي', 'البراندنبورغي', 'الهانزياتي', 'الشوابي', 'السارلاندي', 'البريميني',
];
const REGION_TOKEN = Object.fromEntries(REGIONS.map((r, i) => [r, TOKENS[i]]));
// A name may carry the demonym with or without the definite article
// ("الپافاري" vs "بافاري"), exactly as the row helper's hasToken() allows.
const bare = (t) => t.replace(/^ال/, '');
const BARE_TOKENS = TOKENS.map(bare);
const BARE_REGION_TOKEN = Object.fromEntries(REGIONS.map((r) => [r, bare(REGION_TOKEN[r])]));
const EXPECTED_REGION_DIASPORA = {
  bavaria: 'bavarian',
  saxony: 'east_german',
  thuringia: 'east_german',
  lower_saxony: 'hanseatic',
  brandenburg: 'east_german',
  rhineland: 'rhine',
  baden_wurttemberg: 'swabian',
};

// A hand-authored name may use the orthographic variants of a demonym
// (أ/إ/آ -> ا, ة/ه, ى/ي). Fold before counting so the same rule the row helper
// uses in scripts/germany-base-data/rows.mjs is enforced here.
const fold = (s) => s.replace(/[أإآ]/g, 'ا').replace(/[ةه]/g, 'ه').replace(/ى/g, 'ي');
const norm = (s) => s.replace(/\s+/g, ' ').trim();

let rows = [];
const BASE_ABS = resolve(process.cwd(), 'scripts', 'germany-base-data');
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
    if (/[\u0400-\u04FF\u4E00-\u9FFF]/.test(v)) errors.push(`${tag}: ${k} contains Cyrillic/CJK -> "${v}"`);
  }
  const ar = r.nameAr || '';
  if (/[A-Za-z]/.test(ar)) errors.push(`${tag}: nameAr contains latin chars -> "${ar}"`);
  for (const k of ['nameEn', 'nameFr', 'nameEs', 'nameDe']) {
    if (r[k] === ar) errors.push(`${tag}: ${k} identical to nameAr (untranslated)`);
  }
  if (!CATEGORIES.has(r.category)) errors.push(`${tag}: bad category "${r.category}"`);
  if (!MEALS.has(r.mealType)) errors.push(`${tag}: bad mealType "${r.mealType}"`);
  if (!REGION_SET.has(r.region)) errors.push(`${tag}: bad region "${r.region}"`);
  if (r.region === 'asian_shared') errors.push(`${tag}: asian_shared must stay 0`);
  if (r.grams !== 100) errors.push(`${tag}: grams must be 100, got ${r.grams}`);

  for (const k of ['protein', 'carbs', 'fat']) {
    if (typeof r[k] !== 'number' || r[k] < 0) errors.push(`${tag}: bad ${k}`);
    if (r[k] > 100) errors.push(`${tag}: ${k} > 100 (impossible)`);
  }
  if (r.protein + r.carbs + r.fat > 100) errors.push(`${tag}: macros sum > 100g`);
  const expect = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  if (r.kcal !== expect) errors.push(`${tag}: Atwater drift kcal=${r.kcal} expected ${expect}`);

  // Exactly one demonym, and it must be the one this region owns.
  const toks = fold(ar).split(/\s+/).map(bare).filter((t) => BARE_TOKENS.includes(t));
  if (toks.length !== 1) errors.push(`${tag}: expected exactly 1 nationality token, found ${toks.length}`);
  else if (toks[0] !== BARE_REGION_TOKEN[r.region]) {
    errors.push(`${tag}: region ${r.region} must use "${BARE_REGION_TOKEN[r.region]}", found "${toks[0]}"`);
  }

  if (!Array.isArray(r.diaspora_priority) || r.diaspora_priority.length < 3) {
    errors.push(`${tag}: diaspora_priority must be an array with >= 3 tags`);
  } else {
    for (const t of ['german', 'western', 'comfort_food']) {
      if (!r.diaspora_priority.includes(t)) errors.push(`${tag}: diaspora_priority missing "${t}"`);
    }
    const extra = EXPECTED_REGION_DIASPORA[r.region];
    if (extra) {
      if (!r.diaspora_priority.includes(extra)) errors.push(`${tag}: region ${r.region} must add "${extra}"`);
    } else if (r.diaspora_priority.length !== 3) {
      errors.push(`${tag}: region ${r.region} has no extra tag, expected exactly 3, got ${r.diaspora_priority.length}`);
    }
  }

  for (const k of ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe']) {
    const key = norm(String(r[k])).toLowerCase();
    const map = k === 'nameAr' ? seenAr : seenEn;
    if (map.has(key)) errors.push(`${tag}: duplicate ${k} with ${map.get(key)}`);
    else map.set(key, tag);
  }
});

if (rows.length !== EXPECTED_ROWS) errors.push(`expected ${EXPECTED_ROWS} rows, got ${rows.length}`);

for (const region of REGIONS) {
  if (!rows.some((r) => r.region === region)) errors.push(`region "${region}" has no rows`);
}

// ---- halal gate ----
const halal = scan(rows);
for (const p of halal) errors.push(`HALAL [${p.kind}] "${p.term}" -> ${p.nameAr} | ${p.nameEn}`);

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
  const liveAr = new Set(foreign.map((r) => fold(norm(r.name_ar || ''))));
  for (const r of rows) {
    if (liveAr.has(fold(norm(r.nameAr)))) errors.push(`live DB duplicate Arabic: ${r.nameAr}`);
  }
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
console.log('halal issues:', halal.length);
for (const w of warn) console.log('WARN:', w);
if (errors.length) {
  console.log(`\nFAILED with ${errors.length} error(s):`);
  for (const e of errors.slice(0, 60)) console.log('  -', e);
  process.exit(1);
}
console.log('\nVALIDATION PASSED');

// ---------- emit ----------
const SOURCE = `${SOURCE_TAG} - Verified against German culinary heritage (13 Laender)`;
const payload = rows.map((r, i) => ({
  id: `de-base-${String(i + 1).padStart(3, '0')}`,
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
  grams: r.grams,
  cooking: r.cooking,
}));
writeFileSync(OUT_JSON, JSON.stringify({ dishes: payload }, null, 2) + '\n', 'utf8');
console.log(`wrote ${OUT_JSON}`);

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const body = rows
  .map(
    (r, i) => `    {
      "id": "de-base-${String(i + 1).padStart(3, '0')}",
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
  `// AUTO-GENERATED by scripts/build-germany-base-175.js - do not edit by hand.
// Germany kitchen, ${rows.length} dishes, 100 g serving basis.
// kcal = round(4*protein + 4*carbs + 9*fat) (Atwater), verified by the builder.
// Halal: no pork, no alcohol, no blood, no liver, no wild game.
// Tokens: one distinct demonym per region across all 13 anchors. asian_shared intentionally 0.
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

export const GERMANY_FULL: KitchenDish[] = [
${body}
];
`,
  'utf8'
);
console.log(`wrote ${OUT_TS}`);