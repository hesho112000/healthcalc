// Validates the Germany expansion 175 and emits:
//   - scripts/germany-expansion-175-proposal.json
//   - src/data/germany-full.ts  (base + expansion = 350 rows)
//
// Mirrors scripts/build-uk-expansion-200.js. Same row contract as the base
// builder (100 g basis, Atwater kcal, exactly one demonym and the one this
// region owns), plus the halal gate from scripts/germany-halal-scan.cjs and a
// collision check against the base set.
//
// This builder owns the final germany-full.ts: it merges the base proposal with
// the expansion it just validated, so the bundle always reflects all 350 rows.
// Run it AFTER build-germany-base-175.js, otherwise the bundle is base-only.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { scan } = require('./germany-halal-scan.cjs');

const BASE_JSON = 'scripts/germany-175-proposal.json';
const OUT_JSON = 'scripts/germany-expansion-175-proposal.json';
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
const TOKENS = [
  'الالماني', 'البافاري', 'البرليني', 'الهامبورغي', 'الهيسي', 'الراينلاندي', 'الساكسوني',
  'التورينغي', 'البراندنبورغي', 'الهانزياتي', 'الشوابي', 'السارلاندي', 'البريميني',
];
const REGION_TOKEN = Object.fromEntries(REGIONS.map((r, i) => [r, TOKENS[i]]));
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

const fold = (s) => s.replace(/[أإآ]/g, 'ا').replace(/[ةه]/g, 'ه').replace(/ى/g, 'ي');
const norm = (s) => s.replace(/\s+/g, ' ').trim();

let rows = [];
const DATA_ABS = resolve(process.cwd(), 'scripts', 'germany-data');
for (let i = 1; i <= 20; i++) {
  const file = join(DATA_ABS, `part${i}.mjs`);
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

// ---- must not collide with the base set ----
if (existsSync(BASE_JSON)) {
  const base = JSON.parse(readFileSync(BASE_JSON, 'utf8')).dishes;
  for (const k of ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de']) {
    const baseSet = new Set(base.map((r) => norm(String(r[k])).toLowerCase()));
    for (const r of rows) {
      const mine = k === 'name_ar' ? r.nameAr : r[k.replace('name_', 'name')];
      if (baseSet.has(norm(String(mine)).toLowerCase())) errors.push(`collides with base set (${k}): ${mine}`);
    }
  }
} else {
  warn.push(`${BASE_JSON} missing; skipped base collision check`);
}

// ---- live DB duplicate check (Arabic only) ----
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

const SOURCE = `${SOURCE_TAG} - Verified against German culinary heritage (13 Laender)`;
const payload = rows.map((r, i) => ({
  id: `de-exp-${String(i + 1).padStart(3, '0')}`,
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
}));
writeFileSync(OUT_JSON, JSON.stringify({ dishes: payload }, null, 2) + '\n', 'utf8');
console.log(`wrote ${OUT_JSON}`);

// ---------- combined TS bundle (base + expansion) ----------
// grams/cooking are absent from the migration payload but present on the
// in-memory rows, so index back into rows rather than defaulting.
const expTs = payload.map((p, i) => ({ ...p, grams: rows[i].grams, cooking: rows[i].cooking }));
if (!existsSync(BASE_JSON)) {
  console.error(`Cannot write ${OUT_TS}: ${BASE_JSON} missing. Run build-germany-base-175.js first.`);
  process.exit(1);
}
const baseRows = JSON.parse(readFileSync(BASE_JSON, 'utf8')).dishes;
const combined = [...baseRows, ...expTs];
if (combined.length !== EXPECTED_ROWS * 2) {
  console.error(`Cannot write ${OUT_TS}: expected ${EXPECTED_ROWS * 2} rows, got ${combined.length}`);
  process.exit(1);
}
const ids = new Set(combined.map((r) => r.id));
if (ids.size !== combined.length) {
  console.error(`Cannot write ${OUT_TS}: ${combined.length - ids.size} duplicate id(s)`);
  process.exit(1);
}

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const body = combined
  .map(
    (r) => `    {
      "id": "${esc(r.id)}",
      "nameAr": "${esc(r.name_ar)}",
      "nameEn": "${esc(r.name_en)}",
      "nameFr": "${esc(r.name_fr)}",
      "nameEs": "${esc(r.name_es)}",
      "nameDe": "${esc(r.name_de)}",
      "category": "${esc(r.category)}",
      "mealType": "${esc(r.mealType)}",
      "grams": ${r.grams},
      "kcal": ${r.cal_100},
      "protein": ${r.protein},
      "carbs": ${r.carbs},
      "fat": ${r.fat},
      "cooking": "${esc(r.cooking ?? '')}",
      "region": "${esc(r.region)}",
      "diaspora_priority": [${(r.diaspora_priority ?? []).map((t) => `'${String(t).replace(/'/g, "\\'")}'`).join(', ')}]
    }`
  )
  .join(',\n');

writeFileSync(
  OUT_TS,
  `// AUTO-GENERATED by scripts/build-germany-expansion-175.js (base rows from
// scripts/germany-175-proposal.json) - do not edit by hand.
// Germany kitchen, ${combined.length} dishes (${baseRows.length} base + ${payload.length} expansion), 100 g serving basis.
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
console.log(`wrote ${OUT_TS} (${combined.length} rows)`);