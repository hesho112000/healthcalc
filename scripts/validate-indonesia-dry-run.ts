// Dry-run validator for the Indonesian 300-dish proposal (READ-ONLY: queries the live dishes
// table for name collisions, never writes). Reports:
//  - duplicate Arabic names within the proposal set
//  - collisions with the existing live dishes in Supabase (5,231 rows expected)
//  - 5-language completeness, cal_100 range [20,900], category/region/mealType shape
//  - every Arabic name carries an Indonesian nationality token (needed so kitchenAuthenticity
//    accepts the rows for the Indonesian kitchen and treats them as foreign for the others)
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeArabicName } from '../src/utils/kitchenAuthenticity.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or (asia_migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const prop = JSON.parse(fs.readFileSync(path.join(__dirname, 'indonesia-300-proposal.json'), 'utf8'));
const dishes = prop.dishes;

// 1. In-set duplicate Arabic names
const seen = new Map();
const inSetDups = [];
for (const d of dishes) {
  if (seen.has(d.name_ar)) inSetDups.push(d.name_ar);
  seen.set(d.name_ar, true);
}

// 2. Live collisions
const existing = new Set();
const PAGE = 1000;
for (let from = 0; ; from += PAGE) {
  const { data, error } = await supabase.from('dishes').select('name_ar').order('id', { ascending: true }).range(from, from + PAGE - 1);
  if (error) { console.error('Query failed:', error.message); process.exit(1); }
  for (const r of data ?? []) existing.add(r.name_ar);
  if ((data ?? []).length < PAGE) break;
}
const liveCollisions = dishes.filter((d) => existing.has(d.name_ar)).map((d) => d.name_ar);

// 3. Language completeness
const badLangs = dishes.filter((d) => !(d.name_ar && d.name_en && d.name_fr && d.name_es && d.name_de)).map((d) => d.name_ar);

// 4. cal_100 range
const lowCal = dishes.filter((d) => d.cal_100 < 20).map((d) => `${d.name_ar}(${d.cal_100})`);
const highCal = dishes.filter((d) => d.cal_100 > 900).map((d) => `${d.name_ar}(${d.cal_100})`);

// 5. Macro completeness + Atwater consistency (|cal_100 - (4P+4C+9F)| <= 2)
const missingMacros = dishes.filter((d) => d.protein == null || d.carbs == null || d.fat == null).map((d) => d.name_ar);
const atwBad = [];
for (const d of dishes) {
  const atw = Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat);
  if (Math.abs(atw - d.cal_100) > 2) atwBad.push(`${d.name_ar}(${d.cal_100} vs ${atw})`);
}

// 6. Nationality token guard: every Arabic name must carry andonesi/andonesie after normalization
const noNation = dishes.filter((d) => {
  const n = normalizeArabicName(d.name_ar);
  return !n.includes('اندونيسي');
}).map((d) => d.name_ar);

// 7. Shape
const cats = [...new Set(dishes.map((d) => d.category))];
const regions = [...new Set(dishes.map((d) => d.region))];
const meals = [...new Set(dishes.map((d) => d.mealType))];

console.log('\n===== INDONESIA 300 DISH DRY-RUN VALIDATION =====');
console.log(`Proposal dishes : ${dishes.length} (legacy: 0, all authored fresh)`);
console.log(`Live dishes in DB: ${existing.size}`);
console.log('\n-- Integrity --');
console.log(`In-set duplicate Arabic names : ${inSetDups.length} ${inSetDups.length ? ': ' + inSetDups.join(' | ') : ''}`);
console.log(`Proposal collides with live   : ${liveCollisions.length} ${liveCollisions.length ? ': ' + liveCollisions.join(' | ') : ''}`);
console.log(`Missing a language field      : ${badLangs.length} ${badLangs.length ? ': ' + badLangs.join(' | ') : ''}`);
console.log(`cal_100 < 20                  : ${lowCal.length} ${lowCal.length ? ': ' + lowCal.join(' | ') : ''}`);
console.log(`cal_100 > 900                 : ${highCal.length} ${highCal.length ? ': ' + highCal.join(' | ') : ''}`);
console.log(`Missing P/C/F macros          : ${missingMacros.length} ${missingMacros.length ? ': ' + missingMacros.join(' | ') : ''}`);
console.log(`Atwater mismatch (>2 kcal)    : ${atwBad.length} ${atwBad.length ? ': ' + atwBad.join(' | ') : ''}`);
console.log(`Missing &andonesi token       : ${noNation.length} ${noNation.length ? ': ' + noNation.join(' | ') : ''}`);
console.log('\n-- Shape --');
console.log(`Categories (${cats.length}): ${cats.join(', ')}`);
console.log(`Regions (${regions.length}): ${regions.join(', ')}`);
console.log(`Meal types: ${meals.join(', ')}`);
const regionCount = {};
for (const d of dishes) regionCount[d.region] = (regionCount[d.region] ?? 0) + 1;
console.log('Region distribution:', JSON.stringify(regionCount));

if (inSetDups.length || liveCollisions.length || badLangs.length || lowCal.length || highCal.length || missingMacros.length || atwBad.length || noNation.length) process.exitCode = 1;