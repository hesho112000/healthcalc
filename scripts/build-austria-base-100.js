// Validate the Austria base set and emit its proposal plus 100-row TS bundle.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { scan } = require('./austria-halal-scan.cjs');
const ROOT = process.cwd();
const DATA = resolve(ROOT, 'scripts/austria-base-data');
const OUT_JSON = resolve(ROOT, 'scripts/austria-100-proposal.json');
const OUT_TS = resolve(ROOT, 'src/data/austria-full.ts');
const SOURCE_TAG = 'europe-austria-2026';
const SOURCE = `${SOURCE_TAG} - Verified against Austrian culinary heritage (9 regions and the national anchor)`;
const REGIONS = [
  'pan_austrian', 'vienna', 'tyrol', 'salzburg', 'styria', 'carinthia',
  'upper_austria', 'lower_austria', 'burgenland', 'vorarlberg',
];
const TOKENS = [
  'النمساوي', 'الفييني', 'التيرولي', 'السالزبورغي', 'الشتيرياني',
  'الكارينثياني', 'النمساوي_عالي', 'النمساوي_سفلي', 'البورغنلاندي', 'الفورارلبرغي',
];
const REGION_TOKEN = Object.fromEntries(REGIONS.map((r, i) => [r, TOKENS[i]]));
const BARE_TOKENS = TOKENS.map((t) => t.replace(/^ال/, ''));
const BASE_DIASPORA = ['austrian', 'western', 'comfort_food'];
const REGION_DIASPORA = { vienna: 'viennese', tyrol: 'alpine' };
const CATEGORIES = new Set([
  'breakfast_items', 'rice_dishes', 'noodle_dishes', 'soups_stews', 'poultry_mains',
  'meat_mains', 'fish_seafood', 'vegetable_mains', 'street_snacks', 'rice_cakes_sweets',
  'condiments_sauces', 'beverages', 'fruit',
]);
const MEALS = new Set(['breakfast', 'lunch', 'dinner', 'snack']);
const LANG = ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe'];
const norm = (s) => String(s ?? '').normalize('NFC').replace(/\s+/g, ' ').trim().toLocaleLowerCase();
const foldArabic = (s) => String(s ?? '').replace(/[ً-ْٰ]/g, '').replace(/ـ/g, '')
  .replace(/[أإآ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
  .replace(/ى/g, 'ي').replace(/ة/g, 'ه');
const bare = (s) => s.replace(/^ال/, '');

const rows = [];
for (let i = 1; i <= 3; i++) {
  const file = join(DATA, `part${i}.mjs`);
  if (!existsSync(file)) throw new Error(`Missing ${file}`);
  rows.push(...(await import(pathToFileURL(file).href)).default);
}

const errors = [];
const seen = Object.fromEntries(LANG.map((k) => [k, new Map()]));
rows.forEach((r, i) => {
  const label = `#${i + 1} ${r.nameEn || r.nameAr}`;
  for (const k of LANG) {
    if (typeof r[k] !== 'string' || !r[k].trim()) errors.push(`${label}: missing ${k}`);
    else {
      if (r[k].includes('\uFFFD') || r[k].includes('?')) errors.push(`${label}: corrupted ${k}`);
      const key = norm(r[k]);
      if (seen[k].has(key)) errors.push(`${label}: duplicate ${k} with ${seen[k].get(key)}`);
      else seen[k].set(key, label);
    }
  }
  if (/[A-Za-z]/.test(r.nameAr ?? '')) errors.push(`${label}: Latin character in nameAr`);
  if (!CATEGORIES.has(r.category)) errors.push(`${label}: invalid category ${r.category}`);
  if (!MEALS.has(r.mealType)) errors.push(`${label}: invalid mealType ${r.mealType}`);
  if (!REGIONS.includes(r.region) || r.region === 'asian_shared') errors.push(`${label}: invalid region ${r.region}`);
  if (r.grams !== 100) errors.push(`${label}: grams must be 100`);
  if (![r.protein, r.carbs, r.fat].every((n) => Number.isFinite(n) && n >= 0 && n <= 100)) errors.push(`${label}: invalid macros`);
  if (r.protein + r.carbs + r.fat > 100) errors.push(`${label}: macro sum exceeds 100g`);
  const kcal = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  if (r.kcal !== kcal) errors.push(`${label}: Atwater mismatch (${r.kcal} != ${kcal})`);
  const tokens = foldArabic(r.nameAr).split(/\s+/).map(bare).filter((t) => BARE_TOKENS.includes(t));
  if (tokens.length !== 1 || tokens[0] !== bare(REGION_TOKEN[r.region] ?? '')) errors.push(`${label}: wrong regional demonym (${tokens.join(', ') || 'none'})`);
  const extra = REGION_DIASPORA[r.region];
  const expected = extra ? [...BASE_DIASPORA, extra] : BASE_DIASPORA;
  if (!Array.isArray(r.diaspora_priority) || norm(r.diaspora_priority.join('|')) !== norm(expected.join('|'))) errors.push(`${label}: incorrect diaspora_priority`);
});
if (rows.length !== 100) errors.push(`expected 100 base rows, got ${rows.length}`);

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
  const names = new Set(live.filter((r) => !(r.source ?? '').startsWith(SOURCE_TAG)).map((r) => foldArabic(norm(r.name_ar))));
  for (const r of rows) if (names.has(foldArabic(norm(r.nameAr)))) errors.push(`live Arabic duplicate: ${r.nameAr}`);
  console.log(`live rows scanned: ${live.length}`);
} else {
  console.log('WARN: Supabase credentials absent; live duplicate check skipped');
}

console.log(`base rows: ${rows.length}; halal violations: ${halal.length}`);
if (errors.length) {
  console.error(`\nBASE BUILD FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 80)) console.error(`  - ${e}`);
  process.exit(1);
}

const proposal = rows.map((r, i) => ({
  id: `at-base-${String(i + 1).padStart(3, '0')}`,
  name_ar: r.nameAr, name_en: r.nameEn, name_fr: r.nameFr, name_es: r.nameEs, name_de: r.nameDe,
  category: r.category, mealType: r.mealType, region: r.region, cal_100: r.kcal,
  protein: r.protein, carbs: r.carbs, fat: r.fat, source: SOURCE,
  diaspora_priority: r.diaspora_priority, grams: r.grams, cooking: r.cooking,
}));
writeFileSync(OUT_JSON, `${JSON.stringify({ dishes: proposal }, null, 2)}\n`, 'utf8');
const tsRows = proposal.map((r) => ({
  id: r.id, nameAr: r.name_ar, nameEn: r.name_en, nameFr: r.name_fr, nameEs: r.name_es, nameDe: r.name_de,
  category: r.category, mealType: r.mealType, grams: r.grams, kcal: r.cal_100,
  protein: r.protein, carbs: r.carbs, fat: r.fat, cooking: r.cooking, region: r.region,
  diaspora_priority: r.diaspora_priority,
}));
writeFileSync(OUT_TS, `// AUTO-GENERATED by scripts/build-austria-base-100.js. Do not edit.\n// Austria base set: 100 rows, 100 g basis; Atwater checked.\nexport interface KitchenDish {\n  id: string; nameAr: string; nameEn: string; nameFr: string; nameEs: string; nameDe: string;\n  category: string; mealType: string; grams: number; kcal: number; protein: number; carbs: number; fat: number;\n  cooking?: string; region?: string; diaspora_priority?: string[];\n}\n\nexport const AUSTRIA_FULL: KitchenDish[] = ${JSON.stringify(tsRows, null, 2)};\n`, 'utf8');
console.log(`VALIDATION PASSED; wrote ${OUT_JSON} and ${OUT_TS} (${proposal.length} rows)`);
