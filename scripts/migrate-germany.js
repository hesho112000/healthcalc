// Injector for the 175 NEW Germany expansion dishes proposed in
// scripts/germany-expansion-175-proposal.json (scripts/migrate-germany-legacy.js
// inserts the 175 base rows). Dedupes by exact name_ar against the live dishes
// table. protein/carbs/fat are populated (Atwater-consistent with cal_100).
// Region tags are per-row: pan_german plus the 12 Laender anchors.
// Source tag: europe-germany-2026.
//
// HALAL: no pork, no alcohol, no blood, no liver, no wild game. The expansion set
// was authored halal-first and passes the hard gate in scripts/germany-halal-scan.cjs.
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
  'pan_german', 'bavaria', 'berlin', 'hamburg', 'hesse', 'rhineland', 'saxony',
  'thuringia', 'brandenburg', 'lower_saxony', 'baden_wurttemberg', 'saarland', 'bremen',
]);

const prop = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/germany-expansion-175-proposal.json'), 'utf8'));

const TOTAL = prop.dishes.length;
if (!TOTAL) {
  console.error('No dishes found in scripts/germany-expansion-175-proposal.json');
  process.exit(1);
}

let inserted = 0;
let skipped = 0;
let failed = 0;
const skippedNames = [];
const atwaterFixed = [];

for (let i = 0; i < TOTAL; i++) {
  const d = prop.dishes[i];
  const nameAr = d.name_ar.trim();
  const p = Number(d.protein) || 0;
  const c = Number(d.carbs) || 0;
  const f = Number(d.fat) || 0;
  const atwaterCal = Math.round(4 * p + 4 * c + 9 * f);
  let cal100 = Number(d.cal_100) || 0;
  if (cal100 !== atwaterCal) {
    atwaterFixed.push(`${nameAr} (${cal100}->${atwaterCal})`);
    cal100 = atwaterCal;
  }
  const region = ALLOWED_REGIONS.has(d.region) ? d.region : 'pan_german';
  if (!ALLOWED_REGIONS.has(d.region)) console.warn(`Row ${i + 1} illegal region "${d.region}", defaulted to pan_german`);
  try {
    const { data: existing } = await supabase
      .from('dishes')
      .select('id')
      .eq('name_ar', nameAr)
      .maybeSingle();
    if (existing) {
      skipped++;
      skippedNames.push(nameAr);
      console.log(`Skip ${i + 1}/${TOTAL} [de] "${nameAr}" already exists (id=${existing.id})`);
      continue;
    }
    const { error } = await supabase.from('dishes').insert({
      name_ar: nameAr,
      name_en: d.name_en,
      name_fr: d.name_fr,
      name_es: d.name_es,
      name_de: d.name_de,
      cal_100: cal100,
      protein: p,
      carbs: c,
      fat: f,
      fiber: null,
      sugar: null,
      sodium: null,
      sat_fat: null,
      base_serving_g: null,
      base_cal_serv: null,
      meal_type: d.mealType,
      region,
      region_confidence: null,
      source: d.source,
      confidence: null,
      confidence_label: null,
      confidence_color: null,
      diaspora_priority: d.diaspora_priority ?? null,
    });
    if (error) throw new Error(`insert failed: ${error.message}`);
    inserted++;
    console.log(`Insert ${i + 1}/${TOTAL} [de] "${nameAr}" (region=${region}, meal=${d.mealType}, cal=${cal100}, p${p}/c${c}/f${f})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${TOTAL} ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== GERMANY 2026 MIGRATION (expansion) =====');
console.log(`Total rows   : ${TOTAL}`);
console.log(`Inserted     : ${inserted}`);
console.log(`Skipped      : ${skipped}`);
console.log(`Failed       : ${failed}`);
if (atwaterFixed.length) console.log('Atwater fixed:', atwaterFixed.join(' | '));
if (skippedNames.length) console.log('Skipped names:', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;