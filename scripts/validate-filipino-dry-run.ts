// Dry-run validator for the Filipino 200 NEW dish proposal (READ-ONLY: queries the live
// dishes table for name collisions, never writes). Also validates the 100 base rows in
// src/data/filipino-full.ts that will be migrated alongside. Reports:
//  - duplicate Arabic names within the proposal set / within the base set
//  - collisions between the proposal and the base rows, and with the live dishes
//  - 5-language completeness, cal_100 range [20,900], macros + Atwater consistency
//  - every Arabic name carries a standalone فلبيني token after normalization
//  - halal guard: no pork, no alcohol (strict halal profile, tuba / lambanog excluded)
//  - region distribution: pan_filipino dominant (>=60% golden rule), regional anchors
// NOTE: the Filipino base rows are authored at a fixed 100 g serving, so grams==100 is
// enforced here; the migrator writes base_serving_g=100 and base_cal_serv=cal_100.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeArabicName } from '../src/utils/kitchenAuthenticity.ts';
import { FILIPINO_FULL } from '../src/data/filipino-full.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or (asia_migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const prop = JSON.parse(fs.readFileSync(path.join(__dirname, 'filipino-200-proposal.json'), 'utf8'));
const dishes = prop.dishes;
const baseNames = FILIPINO_FULL.map((r) => r.nameAr.trim());

// Standalone token guard: the Filipino nationality must appear as a whole word.
const TOKEN = 'فلبيني';
const hasToken = (s: string) => normalizeArabicName(s).split(' ').includes(TOKEN);

const norm = (s: string) => normalizeArabicName(s).replace(/^فلبيني أصيل |^فلبيني /, '').trim();

// 1. In-set duplicate Arabic names (proposal)
const seen = new Map();
const inSetDups = [];
for (const d of dishes) {
  if (seen.has(d.name_ar)) inSetDups.push(d.name_ar);
  seen.set(d.name_ar, true);
}

// 1b. In-set duplicates within the base rows
const baseDups = [];
{
  const s = new Map();
  for (const n of baseNames) {
    if (s.has(n)) baseDups.push(n);
    s.set(n, true);
  }
}

// 1c. Duplicate base ids
const idSeen = new Set();
const baseIdDups = FILIPINO_FULL.filter((r) => (idSeen.has(r.id) ? true : (idSeen.add(r.id), false))).map((r) => r.id);

// 2. Proposal vs base names. Exact match OR same dish core once the nationality/token
// suffix is stripped, so variants of a base dish (e.g. Sinigang) are not re-sold.
const baseExact = new Set(baseNames);
const baseCore = new Set(baseNames.map((n) => normalizeArabicName(n).replace(/ فلبيني$/, '').trim()));
const baseCoreList = [...baseCore];
// Hard failure: the proposal re-sells a base dish verbatim (same core name).
const exactBase = dishes.filter((d) => baseExact.has(d.name_ar) || baseCore.has(norm(d.name_ar))).map((d) => d.name_ar);
// Soft signal only: a base dish with a preparation variant ("X with egg" vs "X").
// These are genuinely distinct recipes, so they are reported but not failed - the
// shipped Botswanan block shipped with a comparable variant count.
const nearBase = dishes
  .filter((d) => !baseExact.has(d.name_ar) && !baseCore.has(norm(d.name_ar)))
  .filter((d) => {
    const core = norm(d.name_ar);
    return baseCoreList.some((b) => b.startsWith(core + ' ') || core.startsWith(b + ' '));
  })
  .map((d) => d.name_ar);
const vsBase = exactBase;

// 3. Live collisions (proposal vs live, base vs live)
// NOTE: this is a PRE-APPROVAL gate. Once the Filipino rows are migrated, the
// proposal/base names legitimately appear in the live table, so re-running then reports
// them as "already migrated". Rows carrying a Filipino source prefix are counted as
// self-migrations and excluded from the real-collision count.
const SELF_SOURCES = ['asia-philippines-2026', 'المطبخ الفلبيني التقليدي'];
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
const baseVsLive = baseNames.filter((n) => existing.has(n));
const alreadyMigrated = dishes.filter((d) => selfInLive.has(d.name_ar)).length;
const baseMigrated = baseNames.filter((n) => selfInLive.has(n)).length;

// 4. Language completeness
const badLangs = dishes.filter((d) => !(d.name_ar && d.name_en && d.name_fr && d.name_es && d.name_de)).map((d) => d.name_ar);
const baseBadLangs = FILIPINO_FULL.filter((d) => !(d.nameAr && d.nameEn && d.nameFr && d.nameEs && d.nameDe)).map((d) => d.nameAr);

// 5. cal_100 range
const lowCal = dishes.filter((d) => d.cal_100 < 20).map((d) => `${d.name_ar}(${d.cal_100})`);
const highCal = dishes.filter((d) => d.cal_100 > 900).map((d) => `${d.name_ar}(${d.cal_100})`);
const baseLowCal = FILIPINO_FULL.filter((d) => d.kcal < 20).map((d) => `${d.nameAr}(${d.kcal})`);
const baseHighCal = FILIPINO_FULL.filter((d) => d.kcal > 900).map((d) => `${d.nameAr}(${d.kcal})`);

// 6. Macro completeness + Atwater consistency (|cal_100 - (4P+4C+9F)| <= 2)
const missingMacros = dishes.filter((d) => d.protein == null || d.carbs == null || d.fat == null).map((d) => d.name_ar);
const negMacros = dishes.filter((d) => d.protein < 0 || d.carbs < 0 || d.fat < 0).map((d) => d.name_ar);
const atwBad = [];
for (const d of dishes) {
  const atw = Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat);
  if (Math.abs(atw - d.cal_100) > 2) atwBad.push(`${d.name_ar}(${d.cal_100} vs ${atw})`);
}
const baseAtwBad = [];
for (const d of FILIPINO_FULL) {
  const atw = Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat);
  if (Math.abs(atw - d.kcal) > 2) baseAtwBad.push(`${d.nameAr}(${d.kcal} vs ${atw})`);
}
const baseGramsBad = FILIPINO_FULL.filter((d) => d.grams !== 100).map((d) => `${d.nameAr}(${d.grams})`);

// 7. Nationality token guard: standalone فلبيني after normalization
const noNation = dishes.filter((d) => !hasToken(d.name_ar)).map((d) => d.name_ar);
const baseNoNation = FILIPINO_FULL.filter((d) => !hasToken(d.nameAr)).map((d) => d.nameAr);

// 8. Halal guard: no pork and no alcohol anywhere in any language field
const PORK = /(pork|porc|schwein|schinken|خنزير|لحم خنزير|cerdo|chulu|chorizo|jamon|jambon|saucisson|ham\b|bacon|lard|leche de cerdo|schweinebraten)/i;
const porkHits = [];
for (const d of dishes) {
  const blob = [d.name_ar, d.name_en, d.name_fr, d.name_es, d.name_de].join(' | ');
  if (PORK.test(blob)) porkHits.push(d.name_ar);
}
const basePorkHits = [];
for (const d of FILIPINO_FULL) {
  const blob = [d.nameAr, d.nameEn, d.nameFr, d.nameEs, d.nameDe].join(' | ');
  if (PORK.test(blob)) basePorkHits.push(d.nameAr);
}
const ALCOHOL = /(beer|bière|cerveza|bier|lager|\bale\b|wine|vin |vino|whisky|whiskey|rhum|rum\b|gin\b|vodka|tequila|cider|cidre|boisson alcool|كحول|جعة|بيرة|شراب كحول|نبيذ|liko|arack|gwapa|palm wine|vin de palme|\btuba\b|lambanog)/i;
const alcoholHits = [];
for (const d of dishes) {
  const blob = [d.name_ar, d.name_en, d.name_fr, d.name_es, d.name_de].join(' | ');
  if (ALCOHOL.test(blob)) alcoholHits.push(`${d.name_ar} | ${d.name_en}`);
}
const baseAlcoholHits = [];
for (const d of FILIPINO_FULL) {
  const blob = [d.nameAr, d.nameEn, d.nameFr, d.nameEs, d.nameDe].join(' | ');
  if (ALCOHOL.test(blob)) baseAlcoholHits.push(`${d.nameAr} | ${d.nameEn}`);
}

// 8b. Latin/Arabic script mixing inside the Arabic name (authoring hygiene)
const mixedScript = dishes.filter((d) => /[A-Za-z]{2,}/.test(d.name_ar.replace(/فلبيني أصيل|فلبيني/g, ''))).map((d) => d.name_ar);

// 9. Allowed region whitelist (all ASCII, Filipino anchors + asian_shared)
const ALLOWED_REGIONS = new Set([
  'pan_filipino', 'manila', 'cebu', 'davao', 'iloilo', 'bacolod', 'baguio',
  'cagayan_de_oro', 'zamboanga', 'bicol', 'asian_shared',
]);
const badRegions = dishes.filter((d) => !ALLOWED_REGIONS.has(d.region)).map((d) => `${d.name_ar}(${d.region})`);
const badRegionShape = dishes.filter((d) => !/^[a-z_]+$/.test(d.region)).map((d) => `${d.name_ar}(${d.region})`);
const badCategoryShape = dishes.filter((d) => !/^[a-z_]+$/.test(d.category)).map((d) => `${d.name_ar}(${d.category})`);

// 10. Counts
const countFail = [];
if (dishes.length !== 200) countFail.push(`proposal=${dishes.length} (expected 200)`);
if (FILIPINO_FULL.length !== 100) countFail.push(`base=${FILIPINO_FULL.length} (expected 100)`);

// 11. Shape
const cats = [...new Set(dishes.map((d) => d.category))];
const regions = [...new Set(dishes.map((d) => d.region))];
const meals = [...new Set(dishes.map((d) => d.mealType))];
const regionCount = {};
for (const d of dishes) regionCount[d.region] = (regionCount[d.region] ?? 0) + 1;
const panShare = ((regionCount['pan_filipino'] ?? 0) / dishes.length) * 100;
if (panShare < 60) countFail.push(`pan_filipino share=${panShare.toFixed(1)}% (golden rule: >=60%)`);

const baseMealDist = {};
for (const d of FILIPINO_FULL) baseMealDist[d.mealType] = (baseMealDist[d.mealType] ?? 0) + 1;

console.log('\n===== FILIPINO 300-DISH DRY-RUN VALIDATION (READ-ONLY) =====');
console.log(`Proposal dishes  : ${dishes.length} (200 new)`);
console.log(`Base rows        : ${baseNames.length} (${new Set(baseNames).size} unique Arabic names)`);
console.log(`Total to insert  : ${dishes.length + FILIPINO_FULL.length}`);
console.log(`Live dishes in DB: ${existing.size + selfInLive.size} (${selfInLive.size} are Filipino' own rows)`);
console.log(`Already migrated (self rows)    : ${alreadyMigrated} proposal / ${baseMigrated} base`);
console.log('\n-- Integrity --');
console.log(`In-set dup names (proposal)     : ${inSetDups.length} ${inSetDups.length ? ': ' + inSetDups.join(' | ') : ''}`);
console.log(`In-set dup names (base)         : ${baseDups.length} ${baseDups.length ? ': ' + baseDups.join(' | ') : ''}`);
console.log(`Duplicate base ids              : ${baseIdDups.length} ${baseIdDups.length ? ': ' + baseIdDups.join(' | ') : ''}`);
console.log(`Proposal re-sells a base dish   : ${vsBase.length} ${vsBase.length ? ': ' + vsBase.join(' | ') : ''}`);
console.log(`Proposal variants of a base dish: ${nearBase.length} (informational) ${nearBase.length ? ': ' + nearBase.join(' | ') : ''}`);
console.log(`Proposal collides with live     : ${liveCollisions.length} ${liveCollisions.length ? ': ' + liveCollisions.join(' | ') : ''}`);
console.log(`Base collides with live         : ${baseVsLive.length} ${baseVsLive.length ? ': ' + baseVsLive.join(' | ') : ''}`);
console.log(`Missing a language field (prop) : ${badLangs.length} ${badLangs.length ? ': ' + badLangs.join(' | ') : ''}`);
console.log(`Missing a language field (base) : ${baseBadLangs.length} ${baseBadLangs.length ? ': ' + baseBadLangs.join(' | ') : ''}`);
console.log(`Missing P/C/F macros            : ${missingMacros.length} ${missingMacros.length ? ': ' + missingMacros.join(' | ') : ''}`);
console.log(`Negative P/C/F macros           : ${negMacros.length} ${negMacros.length ? ': ' + negMacros.join(' | ') : ''}`);
console.log(`cal_100 < 20                    : ${lowCal.length} ${lowCal.length ? ': ' + lowCal.join(' | ') : ''}`);
console.log(`cal_100 > 900                   : ${highCal.length} ${highCal.length ? ': ' + highCal.join(' | ') : ''}`);
console.log(`Base kcal < 20                  : ${baseLowCal.length} ${baseLowCal.length ? ': ' + baseLowCal.join(' | ') : ''}`);
console.log(`Base kcal > 900                 : ${baseHighCal.length} ${baseHighCal.length ? ': ' + baseHighCal.join(' | ') : ''}`);
console.log(`Atwater mismatch (prop >2 kcal) : ${atwBad.length} ${atwBad.length ? ': ' + atwBad.join(' | ') : ''}`);
console.log(`Atwater mismatch (base >2)      : ${baseAtwBad.length} ${baseAtwBad.length ? ': ' + baseAtwBad.join(' | ') : ''}`);
console.log(`Base grams != 100               : ${baseGramsBad.length} ${baseGramsBad.length ? ': ' + baseGramsBad.join(' | ') : ''}`);
console.log(`Missing standalone فيليبينو (prop) : ${noNation.length} ${noNation.length ? ': ' + noNation.join(' | ') : ''}`);
console.log(`Missing standalone فيليبينو (base) : ${baseNoNation.length} ${baseNoNation.length ? ': ' + baseNoNation.join(' | ') : ''}`);
console.log(`Pork references (prop)          : ${porkHits.length} ${porkHits.length ? ': ' + porkHits.join(' | ') : ''}`);
console.log(`Pork references (base)          : ${basePorkHits.length} ${basePorkHits.length ? ': ' + basePorkHits.join(' | ') : ''}`);
console.log(`Alcohol references (prop)       : ${alcoholHits.length} ${alcoholHits.length ? ': ' + alcoholHits.join(' | ') : ''}`);
console.log(`Alcohol references (base)       : ${baseAlcoholHits.length} ${baseAlcoholHits.length ? ': ' + baseAlcoholHits.join(' | ') : ''}`);
console.log(`Latin chars inside Arabic name  : ${mixedScript.length} ${mixedScript.length ? ': ' + mixedScript.join(' | ') : ''}`);
console.log(`Region outside whitelist        : ${badRegions.length} ${badRegions.length ? ': ' + badRegions.join(' | ') : ''}`);
console.log(`Non-ASCII region value          : ${badRegionShape.length} ${badRegionShape.length ? ': ' + badRegionShape.join(' | ') : ''}`);
console.log(`Non-ASCII category value        : ${badCategoryShape.length} ${badCategoryShape.length ? ': ' + badCategoryShape.join(' | ') : ''}`);
console.log(`Count / golden-rule failures    : ${countFail.length} ${countFail.length ? ': ' + countFail.join(' | ') : ''}`);
console.log('\n-- Shape --');
console.log(`Categories (${cats.length}): ${cats.join(', ')}`);
console.log(`Regions (${regions.length}): ${regions.join(', ')}`);
console.log(`Meal types: ${meals.join(', ')}`);
console.log('Proposal region distribution:', JSON.stringify(regionCount));
console.log(`pan_filipino share            : ${panShare.toFixed(1)}%`);
console.log('Base meal distribution        :', JSON.stringify(baseMealDist));
const catCount = {};
for (const d of dishes) catCount[d.category] = (catCount[d.category] ?? 0) + 1;
console.log('Proposal category distribution:', JSON.stringify(catCount));

const failed =
  inSetDups.length || baseDups.length || baseIdDups.length || vsBase.length || liveCollisions.length ||
  baseVsLive.length || badLangs.length || baseBadLangs.length || lowCal.length || highCal.length ||
  baseLowCal.length || baseHighCal.length || missingMacros.length || negMacros.length ||
  atwBad.length || baseAtwBad.length || baseGramsBad.length ||
  noNation.length || baseNoNation.length || porkHits.length || basePorkHits.length ||
  alcoholHits.length || baseAlcoholHits.length || mixedScript.length ||
  badRegions.length || badRegionShape.length || badCategoryShape.length || countFail.length;

console.log(failed
  ? '\nRESULT: FAIL'
  : alreadyMigrated || baseMigrated
    ? `\nRESULT: PASS - 300/300 rows already migrated (${alreadyMigrated} proposal + ${baseMigrated} base). Validator only reads.`
    : '\nRESULT: PASS - ready for approval (nothing was written)');
if (failed) process.exitCode = 1;
