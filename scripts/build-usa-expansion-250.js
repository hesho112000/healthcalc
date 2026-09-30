// Validates the USA expansion 250 and emits scripts/usa-expansion-250-proposal.json.
// Same contract as build-usa-base-250.js, plus the halal scan that the USA
// kitchen specifically needs (the cuisine is pork-heavy, so the scan is load-bearing).
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { scan } = require('./usa-halal-scan.cjs');

const OUT_JSON = 'scripts/usa-expansion-250-proposal.json';
const BASE_JSON = 'scripts/usa-250-proposal.json';

const CATEGORIES = new Set([
  'breakfast_items', 'rice_dishes', 'noodle_dishes', 'soups_stews', 'poultry_mains',
  'meat_mains', 'fish_seafood', 'vegetable_mains', 'street_snacks', 'rice_cakes_sweets',
  'condiments_sauces', 'beverages', 'fruit',
]);
const MEALS = new Set(['breakfast', 'lunch', 'dinner', 'snack']);
const REGIONS = new Set([
  'pan_american', 'new_england', 'mid_atlantic', 'south', 'deep_south', 'cajun',
  'texas', 'southwest', 'california', 'pacific_northwest', 'midwest', 'hawaii',
  'alaska', 'soul_food', 'bbq', 'native_american',
]);
const TOKENS = ['أمريكي'];

let rows = [];
const BASE_ABS = resolve(process.cwd(), 'scripts', 'usa-data');
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

if (rows.length !== 250) errors.push(`expected 250 rows, got ${rows.length}`);

// ---- halal (the USA-specific gate) ----
const halal = scan(rows);
if (halal.length) {
  for (const p of halal) errors.push(`HALAL [${p.kind}] "${p.term}" -> ${p.nameAr} | ${p.nameEn}`);
}

// ---- must not collide with the base set ----
if (existsSync(BASE_JSON)) {
  const base = JSON.parse(readFileSync(BASE_JSON, 'utf8')).dishes;
  const baseAr = new Set(base.map((r) => r.name_ar.replace(/\s+/g, ' ').trim()));
  for (const r of rows) {
    if (baseAr.has(r.nameAr.replace(/\s+/g, ' ').trim())) errors.push(`collides with base set: ${r.nameAr}`);
  }
}

// ---- live DB duplicate check (Arabic only; see base builder for rationale) ----
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
  const foreign = live.filter((r) => !(r.source ?? '').startsWith('americas-usa-2026'));
  const liveAr = new Set(foreign.map((r) => (r.name_ar || '').replace(/\s+/g, ' ').trim()));
  for (const r of rows) {
    if (liveAr.has(r.nameAr.replace(/\s+/g, ' ').trim())) errors.push(`live DB duplicate Arabic: ${r.nameAr}`);
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

const SOURCE = 'americas-usa-2026 - Verified against American culinary heritage';
const payload = rows.map((r, i) => ({
  id: `usa-exp-${String(i + 1).padStart(3, '0')}`,
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
