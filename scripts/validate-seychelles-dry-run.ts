// Dry-run validator for the Seychellois 200 NEW dish proposal (READ-ONLY: queries the live
// dishes table for name collisions, never writes). Also validates the 100 legacy rows in
// src/data/seychellois-full.ts that will be migrated in parallel. Reports:
//  - duplicate Arabic names within the proposal set / within the legacy set
//  - collisions between the proposal and the legacy rows, and with the live dishes
//  - 5-language completeness, cal_100 range [20,900], macros + Atwater consistency
//  - every Arabic name carries a standalone سيشيلي token after normalization
//  - halal guard: no pork, no alcohol (strict halal profile)
//  - region distribution: pan_seychellois dominant, regional anchors + african_shared
// NOTE: the Seychelles legacy rows are authored at a fixed 100 g serving, so grams==100 is
// enforced here; the migrator writes base_serving_g=100 and base_cal_serv=cal_100.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeArabicName } from '../src/utils/kitchenAuthenticity.ts';
import { SEYCHELLOIS_FULL } from '../src/data/seychellois-full.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or (asia_migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const prop = JSON.parse(fs.readFileSync(path.join(__dirname, 'seychelles-200-proposal.json'), 'utf8'));
const dishes = prop.dishes;
const legacyNames = SEYCHELLOIS_FULL.map((r) => r.nameAr.trim());

// Standalone token guard: "سيشيلي" must appear as a whole word, not glued to another word.
const TOKEN = 'سيشيلي';
const hasToken = (s: string) => normalizeArabicName(s).split(' ').includes(TOKEN);

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

// 1c. Duplicate legacy ids
const idSeen = new Set();
const legacyIdDups = SEYCHELLOIS_FULL.filter((r) => (idSeen.has(r.id) ? true : (idSeen.add(r.id), false))).map((r) => r.id);

// 2. Proposal vs legacy names
const vsLegacy = dishes.filter((d) => legacyNames.includes(d.name_ar)).map((d) => d.name_ar);

// 3. Live collisions (proposal vs live, legacy vs live)
// NOTE: this is a PRE-APPROVAL gate. Once the Seychelles rows are migrated, the
// proposal/legacy names legitimately appear in the live table, so re-running then reports
// them as "already migrated". Rows carrying a Seychelles source prefix are counted as
// self-migrations and excluded from the real-collision count.
const SELF_SOURCES = ['africa-seychelles-2026', 'المطبخ السيشيلي التقليدي'];
const isSelfRow = (src) => SELF_SOURCES.some((p) => (src ?? '').startsWith(p));
const existing = new Set();
const selfInLive = new Set();
const PAGE = 1000;
for (let from = 0; ; from += PAGE) {
  const { data, error } = await supabase.from('dishes').select('name_ar,source').order('id', { ascending: true }).range(from, from + PAGE - 1);
  if (error) { console.error('Query failed:', error.message); process.exit(1); }
  for (const r of data ?? []) {
    if (isSelfRow(r.source)) { selfInLive.add(r.name_ar); continue; }
    existing.add(r.name_ar);
  }
  if ((data ?? []).length < PAGE) break;
}
const liveCollisions = dishes.filter((d) => existing.has(d.name_ar)).map((d) => d.name_ar);
const legacyVsLive = legacyNames.filter((n) => existing.has(n));
const alreadyMigrated = dishes.filter((d) => selfInLive.has(d.name_ar)).length;
const legacyMigrated = legacyNames.filter((n) => selfInLive.has(n)).length;

// 4. Language completeness
const badLangs = dishes.filter((d) => !(d.name_ar && d.name_en && d.name_fr && d.name_es && d.name_de)).map((d) => d.name_ar);
const legacyBadLangs = SEYCHELLOIS_FULL.filter((d) => !(d.nameAr && d.nameEn && d.nameFr && d.nameEs && d.nameDe)).map((d) => d.nameAr);

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
for (const d of SEYCHELLOIS_FULL) {
  const atw = Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat);
  if (Math.abs(atw - d.kcal) > 2) legacyAtwBad.push(`${d.nameAr}(${d.kcal} vs ${atw})`);
}
const legacyGramsBad = SEYCHELLOIS_FULL.filter((d) => d.grams !== 100).map((d) => `${d.nameAr}(${d.grams})`);

// 7. Nationality token guard: standalone سيشيلي after normalization
const noNation = dishes.filter((d) => !hasToken(d.name_ar)).map((d) => d.name_ar);
const legacyNoNation = SEYCHELLOIS_FULL.filter((d) => !hasToken(d.nameAr)).map((d) => d.nameAr);

// 8. Halal guard: no pork and no alcohol anywhere in any language field
const PORK = /(pork|porc|schwein|خنزير|لحم خنزير|cerdo|chulu)/i;
const porkHits = [];
for (const d of dishes) {
  const blob = [d.name_ar, d.name_en, d.name_fr, d.name_es, d.name_de].join(' | ');
  if (PORK.test(blob)) porkHits.push(d.name_ar);
}
const legacyPorkHits = [];
for (const d of SEYCHELLOIS_FULL) {
  const blob = [d.nameAr, d.nameEn, d.nameFr, d.nameEs, d.nameDe].join(' | ');
  if (PORK.test(blob)) legacyPorkHits.push(d.nameAr);
}
const ALCOHOL = /(beer|bière|cerveza|bier|lager|ale\b|wine|vin |vino|whisky|whiskey|rhum|rum\b|gin\b|vodka|cider|cidre|boisson alcool|كحول|جعة|بيرة|شراب كحول|نبيذ|whisky)/i;
const alcoholHits = [];
for (const d of dishes) {
  const blob = [d.name_ar, d.name_en, d.name_fr, d.name_es, d.name_de].join(' | ');
  if (ALCOHOL.test(blob)) alcoholHits.push(`${d.name_ar} | ${d.name_en}`);
}
const legacyAlcoholHits = [];
for (const d of SEYCHELLOIS_FULL) {
  const blob = [d.nameAr, d.nameEn, d.nameFr, d.nameEs, d.nameDe].join(' | ');
  if (ALCOHOL.test(blob)) legacyAlcoholHits.push(`${d.nameAr} | ${d.nameEn}`);
}

// 9. Allowed region whitelist
const ALLOWED_REGIONS = new Set(['pan_seychellois', 'mahe', 'praslin', 'la_digue', 'outer_islands', 'african_shared']);
const badRegions = dishes.filter((d) => !ALLOWED_REGIONS.has(d.region)).map((d) => `${d.name_ar}(${d.region})`);

// 10. Counts
const countFail = [];
if (dishes.length !== 200) countFail.push(`proposal=${dishes.length} (expected 200)`);
if (SEYCHELLOIS_FULL.length !== 100) countFail.push(`legacy=${SEYCHELLOIS_FULL.length} (expected 100)`);

// 11. Shape
const cats = [...new Set(dishes.map((d) => d.category))];
const regions = [...new Set(dishes.map((d) => d.region))];
const meals = [...new Set(dishes.map((d) => d.mealType))];
const regionCount = {};
for (const d of dishes) regionCount[d.region] = (regionCount[d.region] ?? 0) + 1;
const panShare = ((regionCount['pan_seychellois'] ?? 0) / dishes.length) * 100;
if (panShare < 60) countFail.push(`pan_seychellois share=${panShare.toFixed(1)}% (golden rule: >=60%)`);

const legacyMealDist = {};
for (const d of SEYCHELLOIS_FULL) legacyMealDist[d.mealType] = (legacyMealDist[d.mealType] ?? 0) + 1;

console.log('\n===== SEYCHELLES 300-DISH DRY-RUN VALIDATION (READ-ONLY) =====');
console.log(`Proposal dishes  : ${dishes.length} (200 new)`);
console.log(`Legacy rows      : ${legacyNames.length} (${new Set(legacyNames).size} unique Arabic names)`);
console.log(`Total to insert  : ${dishes.length + SEYCHELLOIS_FULL.length}`);
console.log(`Live dishes in DB: ${existing.size + selfInLive.size} (${selfInLive.size} are Seychelles' own rows)`);
console.log(`Already migrated (self rows)    : ${alreadyMigrated} proposal / ${legacyMigrated} legacy`);
console.log('\n-- Integrity --');
console.log(`In-set dup names (proposal)     : ${inSetDups.length} ${inSetDups.length ? ': ' + inSetDups.join(' | ') : ''}`);
console.log(`In-set dup names (legacy)       : ${legacyDups.length} ${legacyDups.length ? ': ' + legacyDups.join(' | ') : ''}`);
console.log(`Duplicate legacy ids            : ${legacyIdDups.length} ${legacyIdDups.length ? ': ' + legacyIdDups.join(' | ') : ''}`);
console.log(`Proposal collides with legacy   : ${vsLegacy.length} ${vsLegacy.length ? ': ' + vsLegacy.join(' | ') : ''}`);
console.log(`Proposal collides with live     : ${liveCollisions.length} ${liveCollisions.length ? ': ' + liveCollisions.join(' | ') : ''}`);
console.log(`Legacy collides with live       : ${legacyVsLive.length} ${legacyVsLive.length ? ': ' + legacyVsLive.join(' | ') : ''}`);
console.log(`Missing a language field (prop) : ${badLangs.length} ${badLangs.length ? ': ' + badLangs.join(' | ') : ''}`);
console.log(`Missing a language field (leg)  : ${legacyBadLangs.length} ${legacyBadLangs.length ? ': ' + legacyBadLangs.join(' | ') : ''}`);
console.log(`Missing P/C/F macros            : ${missingMacros.length} ${missingMacros.length ? ': ' + missingMacros.join(' | ') : ''}`);
console.log(`cal_100 < 20                    : ${lowCal.length} ${lowCal.length ? ': ' + lowCal.join(' | ') : ''}`);
console.log(`cal_100 > 900                   : ${highCal.length} ${highCal.length ? ': ' + highCal.join(' | ') : ''}`);
console.log(`Atwater mismatch (prop >2 kcal) : ${atwBad.length} ${atwBad.length ? ': ' + atwBad.join(' | ') : ''}`);
console.log(`Atwater mismatch (legacy >2)    : ${legacyAtwBad.length} ${legacyAtwBad.length ? ': ' + legacyAtwBad.join(' | ') : ''}`);
console.log(`Legacy grams != 100             : ${legacyGramsBad.length} ${legacyGramsBad.length ? ': ' + legacyGramsBad.join(' | ') : ''}`);
console.log(`Missing standalone سيشيلي (prop): ${noNation.length} ${noNation.length ? ': ' + noNation.join(' | ') : ''}`);
console.log(`Missing standalone سيشيلي (leg) : ${legacyNoNation.length} ${legacyNoNation.length ? ': ' + legacyNoNation.join(' | ') : ''}`);
console.log(`Pork references (prop)          : ${porkHits.length} ${porkHits.length ? ': ' + porkHits.join(' | ') : ''}`);
console.log(`Pork references (legacy)        : ${legacyPorkHits.length} ${legacyPorkHits.length ? ': ' + legacyPorkHits.join(' | ') : ''}`);
console.log(`Alcohol references (prop)      : ${alcoholHits.length} ${alcoholHits.length ? ': ' + alcoholHits.join(' | ') : ''}`);
console.log(`Alcohol references (legacy)    : ${legacyAlcoholHits.length} ${legacyAlcoholHits.length ? ': ' + legacyAlcoholHits.join(' | ') : ''}`);
console.log(`Region outside whitelist        : ${badRegions.length} ${badRegions.length ? ': ' + badRegions.join(' | ') : ''}`);
console.log(`Count / golden-rule failures    : ${countFail.length} ${countFail.length ? ': ' + countFail.join(' | ') : ''}`);
console.log('\n-- Shape --');
console.log(`Categories (${cats.length}): ${cats.join(', ')}`);
console.log(`Regions (${regions.length}): ${regions.join(', ')}`);
console.log(`Meal types: ${meals.join(', ')}`);
console.log('Proposal region distribution:', JSON.stringify(regionCount));
console.log(`pan_seychellois share      : ${panShare.toFixed(1)}%`);
console.log('Legacy meal distribution  :', JSON.stringify(legacyMealDist));
const catCount = {};
for (const d of dishes) catCount[d.category] = (catCount[d.category] ?? 0) + 1;
console.log('Proposal category distribution:', JSON.stringify(catCount));

const failed =
  inSetDups.length || legacyDups.length || legacyIdDups.length || vsLegacy.length || liveCollisions.length ||
  legacyVsLive.length || badLangs.length || legacyBadLangs.length || lowCal.length || highCal.length ||
  missingMacros.length || atwBad.length || legacyAtwBad.length || legacyGramsBad.length ||
  noNation.length || legacyNoNation.length || porkHits.length || legacyPorkHits.length ||
  alcoholHits.length || legacyAlcoholHits.length || badRegions.length || countFail.length;

console.log(failed
  ? '\nRESULT: FAIL'
  : alreadyMigrated || legacyMigrated
    ? `\nRESULT: PASS - 300/300 rows already migrated (${alreadyMigrated} proposal + ${legacyMigrated} legacy). Validator only reads.`
    : '\nRESULT: PASS - ready for approval (nothing was written)');
if (failed) process.exitCode = 1;
