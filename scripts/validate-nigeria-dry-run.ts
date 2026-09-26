// Dry-run validator for the Nigerian 200 NEW dish proposal (READ-ONLY: queries the live
// dishes table for name collisions, never writes). Also validates the 100 legacy rows in
// src/data/nigerian-full.ts that will be migrated in parallel. Reports:
//  - duplicate Arabic names within the proposal set / within the legacy set
//  - collisions between the proposal and the legacy rows, and with the live dishes
//  - 5-language completeness, cal_100 range [20,900], macros + Atwater consistency
//  - every Arabic name carries a Nigerian nationality token (so kitchenAuthenticity accepts
//    the rows for the Nigerian kitchen and treats them as foreign for the others)
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeArabicName } from '../src/utils/kitchenAuthenticity.ts';
import { NIGERIAN_FULL } from '../src/data/nigerian-full.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or (asia_migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const prop = JSON.parse(fs.readFileSync(path.join(__dirname, 'nigeria-200-proposal.json'), 'utf8'));
const dishes = prop.dishes;
const legacyNames = NIGERIAN_FULL.map((r) => r.nameAr.trim());

// 1. In-set duplicate Arabic names (proposal)
const seen = new Map();
const inSetDups = [];
for (const d of dishes) {
  if (seen.has(d.name_ar)) inSetDups.push(d.name_ar);
  seen.set(d.name_ar, true);
}

// 1b. In-set duplicates within the legacy rows
const legacyDups = [];
{
  const s = new Map();
  for (const n of legacyNames) {
    if (s.has(n)) legacyDups.push(n);
    s.set(n, true);
  }
}

// 2. Proposal vs legacy names
const vsLegacy = dishes.filter((d) => legacyNames.includes(d.name_ar)).map((d) => d.name_ar);

// 3. Live collisions (proposal vs live, legacy vs live)
const existing = new Set();
const PAGE = 1000;
for (let from = 0; ; from += PAGE) {
  const { data, error } = await supabase.from('dishes').select('name_ar').order('id', { ascending: true }).range(from, from + PAGE - 1);
  if (error) { console.error('Query failed:', error.message); process.exit(1); }
  for (const r of data ?? []) existing.add(r.name_ar);
  if ((data ?? []).length < PAGE) break;
}
const liveCollisions = dishes.filter((d) => existing.has(d.name_ar)).map((d) => d.name_ar);
const legacyVsLive = legacyNames.filter((n) => existing.has(n));

// 4. Language completeness
const badLangs = dishes.filter((d) => !(d.name_ar && d.name_en && d.name_fr && d.name_es && d.name_de)).map((d) => d.name_ar);
const legacyBadLangs = NIGERIAN_FULL.filter((d) => !(d.nameAr && d.nameEn && d.nameFr && d.nameEs && d.nameDe)).map((d) => d.nameAr);

// 5. cal_100 range
const lowCal = dishes.filter((d) => d.cal_100 < 20).map((d) => `${d.name_ar}(${d.cal_100})`);
const highCal = dishes.filter((d) => d.cal_100 > 900).map((d) => `${d.name_ar}(${d.cal_100})`);

// 6. Macro completeness + Atwater consistency (|cal_100 - (4P+4C+9F)| <= 2)
const missingMacros = dishes.filter((d) => d.protein == null || d.carbs == null || d.fat == null).map((d) => d.name_ar);
const atwBad = [];
for (const d of dishes) {
  const atw = Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat);
  if (Math.abs(atw - d.cal_100) > 2) atwBad.push(`${d.name_ar}(${d.cal_100} vs ${atw})`);
}
const legacyAtwBad = [];
for (const d of NIGERIAN_FULL) {
  const atw = Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat);
  if (Math.abs(atw - d.kcal) > 2) legacyAtwBad.push(`${d.nameAr}(${d.kcal} vs ${atw})`);
}

// 7. Nationality token guard: every Arabic name must carry نيجيري after normalization
const noNation = dishes.filter((d) => !normalizeArabicName(d.name_ar).includes('نيجيري')).map((d) => d.name_ar);
const legacyNoNation = NIGERIAN_FULL.filter((d) => !normalizeArabicName(d.nameAr).includes('نيجيري')).map((d) => d.nameAr);

// 8. Shape
const cats = [...new Set(dishes.map((d) => d.category))];
const regions = [...new Set(dishes.map((d) => d.region))];
const meals = [...new Set(dishes.map((d) => d.mealType))];
const regionCount = {};
for (const d of dishes) regionCount[d.region] = (regionCount[d.region] ?? 0) + 1;

// 9. Legacy per-100 proxies
const legacyGramsBad = NIGERIAN_FULL.filter((d) => d.grams !== 100).map((d) => `${d.id}:${d.grams}g`);

console.log('\n===== NIGERIA 200 DISH DRY-RUN VALIDATION =====');
console.log(`Proposal dishes : ${dishes.length} (all authored fresh)`);
console.log(`Legacy rows     : ${legacyNames.length} (${new Set(legacyNames).size} unique Arabic names)`);
console.log(`Live dishes in DB: ${existing.size}`);
console.log('\n-- Integrity --');
console.log(`In-set dup names (proposal)     : ${inSetDups.length} ${inSetDups.length ? ': ' + inSetDups.join(' | ') : ''}`);
console.log(`In-set dup names (legacy)       : ${legacyDups.length} ${legacyDups.length ? ': ' + legacyDups.join(' | ') : ''}`);
console.log(`Proposal collides with legacy   : ${vsLegacy.length} ${vsLegacy.length ? ': ' + vsLegacy.join(' | ') : ''}`);
console.log(`Proposal collides with live     : ${liveCollisions.length} ${liveCollisions.length ? ': ' + liveCollisions.join(' | ') : ''}`);
console.log(`Legacy collides with live       : ${legacyVsLive.length} ${legacyVsLive.length ? ': ' + legacyVsLive.join(' | ') : ''}`);
console.log(`Missing a language field (prop) : ${badLangs.length} ${badLangs.length ? ': ' + badLangs.join(' | ') : ''}`);
console.log(`Missing a language field (leg)  : ${legacyBadLangs.length} ${legacyBadLangs.length ? ': ' + legacyBadLangs.join(' | ') : ''}`);
console.log(`cal_100 < 20                    : ${lowCal.length} ${lowCal.length ? ': ' + lowCal.join(' | ') : ''}`);
console.log(`cal_100 > 900                   : ${highCal.length} ${highCal.length ? ': ' + highCal.join(' | ') : ''}`);
console.log(`Missing P/C/F macros            : ${missingMacros.length} ${missingMacros.length ? ': ' + missingMacros.join(' | ') : ''}`);
console.log(`Atwater mismatch (prop >2 kcal) : ${atwBad.length} ${atwBad.length ? ': ' + atwBad.join(' | ') : ''}`);
console.log(`Atwater mismatch (legacy >2)    : ${legacyAtwBad.length} ${legacyAtwBad.length ? ': ' + legacyAtwBad.join(' | ') : ''}`);
console.log(`Missing نيجيري token (proposal) : ${noNation.length} ${noNation.length ? ': ' + noNation.join(' | ') : ''}`);
console.log(`Missing نيجيري token (legacy)   : ${legacyNoNation.length} ${legacyNoNation.length ? ': ' + legacyNoNation.join(' | ') : ''}`);
console.log(`Legacy grams != 100             : ${legacyGramsBad.length} ${legacyGramsBad.length ? ': ' + legacyGramsBad.join(' | ') : ''}`);
console.log('\n-- Shape --');
console.log(`Categories (${cats.length}): ${cats.join(', ')}`);
console.log(`Regions (${regions.length}): ${regions.join(', ')}`);
console.log(`Meal types: ${meals.join(', ')}`);
console.log('Region distribution:', JSON.stringify(regionCount));
const catCount = {};
for (const d of dishes) catCount[d.category] = (catCount[d.category] ?? 0) + 1;
console.log('Category distribution:', JSON.stringify(catCount));

if (inSetDups.length || legacyDups.length || vsLegacy.length || liveCollisions.length || legacyVsLive.length || badLangs.length || legacyBadLangs.length || lowCal.length || highCal.length || missingMacros.length || atwBad.length || legacyAtwBad.length || noNation.length || legacyNoNation.length || legacyGramsBad.length) process.exitCode = 1;