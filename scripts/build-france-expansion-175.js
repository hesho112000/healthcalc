// Validate the expansion against its base set and emit the combined bundle.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { scan } = require('./france-halal-scan.cjs');
const ROOT = process.cwd();
const SOURCE_TAG = 'europe-france-2026';
const SOURCE = `${SOURCE_TAG} - Verified against French culinary heritage (13 regions)`;
const DATA = resolve(ROOT, 'scripts/france-data');
const BASE_JSON = resolve(ROOT, 'scripts/france-175-proposal.json');
const OUT = resolve(ROOT, 'scripts/france-expansion-175-proposal.json');
const OUT_TS = resolve(ROOT, 'src/data/france-full.ts');
const REGIONS = ['pan_french', 'paris', 'normandy', 'provence', 'lyon', 'bordeaux', 'alsace', 'brittany', 'burgundy', 'toulouse', 'marseille', 'loire', 'corsica'];
const TOKENS = ['فرنسي', 'باريسي', 'نورماندي', 'بروفنسي', 'ليوني', 'بوردوي', 'الزاسي', 'بريتوني', 'بورغندي', 'تولوزي', 'مارسيلي', 'لواروي', 'كورسيكي'];
const TOKEN = Object.fromEntries(REGIONS.map((r, i) => [r, TOKENS[i]]));
const BASE_DIASPORA = ['french', 'western', 'comfort_food'];
const EXTRA = { paris: 'parisian', provence: 'mediterranean' };
const LANG = ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe'];
const norm = (s) => String(s ?? '').normalize('NFC').replace(/\s+/g, ' ').trim().toLocaleLowerCase();
const fold = (s) => String(s ?? '').replace(/[ً-ْٰ]/g, '').replace(/ـ/g, '').replace(/[أإآ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
if (!existsSync(BASE_JSON)) throw new Error(`Missing ${BASE_JSON}; run build-france-base-175.js first`);
const base = JSON.parse(readFileSync(BASE_JSON, 'utf8')).dishes;
const rows = [];
for (let i = 1; i <= 4; i++) {
  const file = join(DATA, `part${i}.mjs`);
  if (!existsSync(file)) throw new Error(`Missing ${file}`);
  rows.push(...(await import(pathToFileURL(file).href)).default);
}
const errors = [];
const seen = Object.fromEntries(LANG.map((k) => [k, new Set()]));
const fields = { nameAr: 'name_ar', nameEn: 'name_en', nameFr: 'name_fr', nameEs: 'name_es', nameDe: 'name_de' };
const baseNames = Object.fromEntries(LANG.map((k) => [k, new Set(base.map((r) => norm(r[fields[k]])))]));
for (const [i, r] of rows.entries()) {
  const label = `#${i + 1} ${r.nameEn}`;
  for (const k of LANG) {
    if (typeof r[k] !== 'string' || !r[k].trim()) errors.push(`${label}: missing ${k}`);
    else {
      const key = norm(r[k]);
      if (seen[k].has(key) || baseNames[k].has(key)) errors.push(`${label}: duplicate/colliding ${k}`);
      seen[k].add(key);
      if (r[k].includes('\uFFFD') || r[k].includes('?')) errors.push(`${label}: corrupted ${k}`);
    }
  }
  if (/[A-Za-z]/.test(r.nameAr)) errors.push(`${label}: Latin character in Arabic name`);
  if (!REGIONS.includes(r.region) || r.region === 'asian_shared') errors.push(`${label}: invalid region ${r.region}`);
  if (r.grams !== 100 || Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat) !== r.kcal) errors.push(`${label}: serving/Atwater mismatch`);
  const tokens = fold(r.nameAr).split(/\s+/).filter((w) => TOKENS.includes(w));
  if (tokens.length !== 1 || tokens[0] !== TOKEN[r.region]) errors.push(`${label}: wrong regional demonym`);
  const dp = EXTRA[r.region] ? [...BASE_DIASPORA, EXTRA[r.region]] : BASE_DIASPORA;
  if (JSON.stringify(r.diaspora_priority) !== JSON.stringify(dp)) errors.push(`${label}: diaspora_priority mismatch`);
}
if (rows.length !== 175 || base.length !== 175) errors.push(`expected 175 + 175 rows, got ${base.length} + ${rows.length}`);
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

console.log(`expansion rows: ${rows.length}; halal violations: ${halal.length}`);
if (errors.length) {
  console.error(`EXPANSION BUILD FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 100)) console.error(`  - ${e}`);
  process.exit(1);
}
const dishes = rows.map((r, i) => ({
  id: `fr-exp-${String(i + 1).padStart(3, '0')}`,
  name_ar: r.nameAr, name_en: r.nameEn, name_fr: r.nameFr, name_es: r.nameEs, name_de: r.nameDe,
  category: r.category, mealType: r.mealType, region: r.region, cal_100: r.kcal,
  protein: r.protein, carbs: r.carbs, fat: r.fat, source: SOURCE,
  diaspora_priority: r.diaspora_priority, grams: r.grams, cooking: r.cooking,
}));
writeFileSync(OUT, `${JSON.stringify({ dishes }, null, 2)}\n`, 'utf8');
const toTs = (r) => ({ id: r.id, nameAr: r.name_ar, nameEn: r.name_en, nameFr: r.name_fr, nameEs: r.name_es, nameDe: r.name_de, category: r.category, mealType: r.mealType, grams: r.grams, kcal: r.cal_100, protein: r.protein, carbs: r.carbs, fat: r.fat, cooking: r.cooking, region: r.region, diaspora_priority: r.diaspora_priority });
const combined = [...base, ...dishes].map(toTs);
if (combined.length !== 350 || new Set(combined.map((r) => r.id)).size !== 350) throw new Error('Combined bundle must have 350 unique-ID rows');
writeFileSync(OUT_TS, `// AUTO-GENERATED by scripts/build-france-expansion-175.js. Do not edit.\n// France: 175 base + 175 expansion rows; 100 g basis; Atwater and halal checked.\nexport interface KitchenDish { id: string; nameAr: string; nameEn: string; nameFr: string; nameEs: string; nameDe: string; category: string; mealType: string; grams: number; kcal: number; protein: number; carbs: number; fat: number; cooking?: string; region?: string; diaspora_priority?: string[]; }\nexport const FRANCE_FULL: KitchenDish[] = ${JSON.stringify(combined, null, 2)};\n`, 'utf8');
console.log(`VALIDATION PASSED; wrote ${OUT} and ${OUT_TS} (${combined.length} rows)`);
