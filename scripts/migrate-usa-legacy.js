// Injector for the 250 USA base rows authored in scripts/usa-250-proposal.json
// (emitted by scripts/build-usa-base-250.js). Reads the JSON proposal and
// inserts each row into the live dishes table. Dedupes by exact name_ar.
// Source tag: americas-usa-2026.
//
// HALAL: no pork, no alcohol, no blood, no wild game. The base set was
// authored halal-first and passes the hard gate in scripts/usa-halal-scan.cjs.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or (asia_migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const ALLOWED_REGIONS = new Set([
  'pan_american', 'new_england', 'mid_atlantic', 'south', 'deep_south', 'cajun',
  'texas', 'southwest', 'california', 'pacific_northwest', 'midwest', 'hawaii',
  'alaska', 'soul_food', 'bbq', 'native_american',
]);

const MEAL = {
  breakfast: 'breakfast', lunch: 'lunch', dinner: 'dinner', snack: 'snack',
  snacks: 'lunch', side: 'lunch', salad: 'snacks', fruit: 'snacks',
};

const prop = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/usa-250-proposal.json'), 'utf8'));
const rows = prop.dishes;
if (!Array.isArray(rows) || !rows.length) {
  console.error('No dishes found in scripts/usa-250-proposal.json');
  process.exit(1);
}

const TOTAL = rows.length;
let inserted = 0;
let skipped = 0;
let failed = 0;
const skippedNames = [];
const atwaterFixed = [];

for (let i = 0; i < TOTAL; i++) {
  const r = rows[i];
  const nameAr = (r.name_ar ?? '').trim();
  const p100 = Number(r.protein) || 0;
  const c100 = Number(r.carbs) || 0;
  const f100 = Number(r.fat) || 0;
  const g = Number(r.grams) || 100;
  const atwaterCal = Math.round(4 * p100 + 4 * c100 + 9 * f100);
  let cal100 = Number(r.cal_100) || 0;
  if (cal100 !== atwaterCal) {
    atwaterFixed.push(`${nameAr} (${cal100}->${atwaterCal})`);
    cal100 = atwaterCal;
  }
  if (cal100 > 900) cal100 = 900;
  const baseCalServ = Math.round(cal100 * (g / 100) * 10) / 10;
  const nameEn = (r.name_en ?? '').trim();
  const nameFr = (r.name_fr ?? '').trim();
  const nameEs = (r.name_es ?? '').trim();
  const nameDe = (r.name_de ?? '').trim();
  if (![nameAr, nameEn, nameFr, nameEs, nameDe].every((v) => typeof v === 'string' && v.trim().length > 0)) {
    console.error(`Row ${i + 1}: empty language field`);
    failed++;
    continue;
  }
  const meal = MEAL[r.mealType] ?? 'lunch';
  const region = ALLOWED_REGIONS.has(r.region) ? r.region : 'pan_american';
  if (!ALLOWED_REGIONS.has(r.region)) console.warn(`Row ${i + 1} illegal region "${r.region}", defaulted to pan_american`);

  try {
    const { data: existing } = await supabase
      .from('dishes')
      .select('id')
      .eq('name_ar', nameAr)
      .maybeSingle();
    if (existing) {
      skipped++;
      skippedNames.push(nameAr);
      console.log(`Skip ${i + 1}/${TOTAL} "${nameAr}" (id=${existing.id})`);
      continue;
    }
    const { error } = await supabase.from('dishes').insert({
      name_ar: nameAr, name_en: nameEn, name_fr: nameFr, name_es: nameEs, name_de: nameDe,
      meal_type: meal,
      cal_100: cal100, protein: p100, carbs: c100, fat: f100,
      fiber: null, sugar: null, sodium: null, sat_fat: null,
      base_serving_g: g, base_cal_serv: baseCalServ, serving_unit: null, serving_description: null,
      healthy: null, is_fried: null, is_sweet: null,
      source: 'americas-usa-2026 - Verified against American culinary heritage',
      confidence: null, confidence_label: null, confidence_color: null,
      region, region_confidence: null,
      diaspora_priority: r.diaspora_priority ?? null,
    });
    if (error) throw new Error(error.message);
    inserted++;
    console.log(`Insert ${i + 1}/${TOTAL} "${nameAr}" (region=${region}, meal=${meal}, cal=${cal100}, g=${g})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${TOTAL} ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== USA LEGACY 2026 MIGRATION =====');
console.log(`Total rows      : ${TOTAL}`);
console.log(`Inserted        : ${inserted}`);
console.log(`Skipped (exists): ${skipped}`);
console.log(`Failed          : ${failed}`);
if (atwaterFixed.length) console.log('Atwater fixed   :', atwaterFixed.join(' | '));
if (skippedNames.length) console.log('Skipped names  :', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;
