// Validate and emit the halal Greece base proposal and typed bundle.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { existsSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { scan } = require('./greece-halal-scan.cjs');
const ROOT = process.cwd();
const SOURCE_TAG = 'europe-greece-2026';
const SOURCE = `${SOURCE_TAG} - Verified against Greek culinary heritage (11 regions)`;
const DATA = resolve(ROOT, 'scripts/greece-base-data');
const OUT = resolve(ROOT, 'scripts/greece-base-75-proposal.json');
const OUT_TS = resolve(ROOT, 'src/data/greece-full.ts');
const REGIONS = ['pan_greek', 'athens', 'thessaloniki', 'crete', 'santorini', 'mykonos', 'corfu', 'rhodes', 'peloponnese', 'epirus', 'macedonia_gr'];
const TOKENS = ['يوناني', 'اثيني', 'سالونيكي', 'كريتي', 'سانتوريني', 'ميكوني', 'كورفي', 'رودسي', 'بيلوبونيزي', 'ابيري', 'مقدوني_يوناني'];
const TOKEN = Object.fromEntries(REGIONS.map((r, i) => [r, TOKENS[i]]));
const BASE_DIASPORA = ['greek', 'western', 'mediterranean', 'comfort_food'];
const EXTRA = { athens: 'athenian', crete: 'cretan' };
const LANG = ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe'];
const CATEGORIES = new Set(['breakfast_items', 'rice_dishes', 'noodle_dishes', 'soups_stews', 'poultry_mains', 'meat_mains', 'fish_seafood', 'vegetable_mains', 'street_snacks', 'rice_cakes_sweets', 'condiments_sauces', 'beverages', 'fruit']);
const MEALS = new Set(['breakfast', 'lunch', 'dinner', 'snack']);
const fold = (s) => String(s ?? '').replace(/[ً-ْٰ]/g, '').replace(/ـ/g, '').replace(/[أإآ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
const norm = (s) => String(s ?? '').normalize('NFC').replace(/\s+/g, ' ').trim().toLocaleLowerCase();

const rows = [];
for (let i = 1; i <= 2; i++) {
  const file = join(DATA, `part${i}.mjs`);
  if (!existsSync(file)) throw new Error(`Missing ${file}`);
  rows.push(...(await import(pathToFileURL(file).href)).default);
}
const errors = [];
const seen = Object.fromEntries(LANG.map((k) => [k, new Set()]));
for (const [i, r] of rows.entries()) {
  const label = `#${i + 1} ${r.nameEn}`;
  for (const k of LANG) {
    if (typeof r[k] !== 'string' || !r[k].trim()) errors.push(`${label}: missing ${k}`);
    else {
      if (r[k].includes('�') || r[k].includes('?')) errors.push(`${label}: corrupted ${k}`);
      const key = norm(r[k]);
      if (seen[k].has(key)) errors.push(`${label}: duplicate ${k}: ${r[k]}`);
      seen[k].add(key);
    }
  }
  if (/[A-Za-z]/.test(r.nameAr)) errors.push(`${label}: Latin character in Arabic name`);
  if (!REGIONS.includes(r.region) || r.region === 'asian_shared') errors.push(`${label}: invalid region ${r.region}`);
  if (!CATEGORIES.has(r.category) || !MEALS.has(r.mealType)) errors.push(`${label}: invalid category or meal`);
  if (r.grams !== 100 || Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat) !== r.kcal) errors.push(`${label}: serving/Atwater mismatch`);
  const tokens = fold(r.nameAr).split(/\s+/).filter((w) => TOKENS.includes(w));
  if (tokens.length !== 1 || tokens[0] !== TOKEN[r.region]) errors.push(`${label}: wrong regional demonym`);
  const dp = EXTRA[r.region] ? [...BASE_DIASPORA, EXTRA[r.region]] : BASE_DIASPORA;
  if (JSON.stringify(r.diaspora_priority) !== JSON.stringify(dp)) errors.push(`${label}: diaspora_priority mismatch`);
}
if (rows.length !== 75) errors.push(`expected 75 base rows, got ${rows.length}`);
const halal = scan(rows);
for (const p of halal) errors.push(`HALAL [${p.kind}] ${p.term}: ${p.nameEn}`);

const url = process.env.SUPABASE_URL;
const key = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (url && key) {
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const live = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase.from('dishes').select('name_ar,source').order('id').range(from, from + 999);
    if (error) throw error;
    live.push(...data);
    if (data.length < 1000) break;
  }
  const names = new Set(live.filter((r) => !(r.source ?? '').startsWith(SOURCE_TAG)).map((r) => fold(norm(r.name_ar))));
  for (const r of rows) if (names.has(fold(norm(r.nameAr)))) errors.push(`live Arabic duplicate: ${r.nameAr}`);
  console.log(`live rows scanned: ${live.length}`);
} else console.log('WARN: Supabase credentials absent; live duplicate check skipped');

console.log(`base rows: ${rows.length}; halal violations: ${halal.length}`);
if (errors.length) {
  console.error(`BASE BUILD FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 80)) console.error(`  - ${e}`);
  process.exit(1);
}
const dishes = rows.map((r, i) => ({
  id: `gr-base-${String(i + 1).padStart(3, '0')}`,
  name_ar: r.nameAr, name_en: r.nameEn, name_fr: r.nameFr, name_es: r.nameEs, name_de: r.nameDe,
  category: r.category, mealType: r.mealType, region: r.region, cal_100: r.kcal,
  protein: r.protein, carbs: r.carbs, fat: r.fat, source: SOURCE,
  diaspora_priority: r.diaspora_priority, grams: r.grams, cooking: r.cooking,
}));
writeFileSync(OUT, `${JSON.stringify({ dishes }, null, 2)}\n`, 'utf8');
const tsRows = dishes.map((r) => ({
  id: r.id, nameAr: r.name_ar, nameEn: r.name_en, nameFr: r.name_fr, nameEs: r.name_es, nameDe: r.name_de,
  category: r.category, mealType: r.mealType, grams: r.grams, kcal: r.cal_100,
  protein: r.protein, carbs: r.carbs, fat: r.fat, cooking: r.cooking, region: r.region,
  diaspora_priority: r.diaspora_priority,
}));
writeFileSync(OUT_TS, `// AUTO-GENERATED by scripts/build-greece-base-75.js. Do not edit.\n// Greece base: 75 rows, 100 g serving; Atwater checked.\nexport interface KitchenDish { id: string; nameAr: string; nameEn: string; nameFr: string; nameEs: string; nameDe: string; category: string; mealType: string; grams: number; kcal: number; protein: number; carbs: number; fat: number; cooking?: string; region?: string; diaspora_priority?: string[]; }\nexport const GREECE_FULL: KitchenDish[] = ${JSON.stringify(tsRows, null, 2)};\n`, 'utf8');
console.log(`VALIDATION PASSED; wrote ${OUT} (${dishes.length} rows)`);
