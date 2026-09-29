// Injector for the 200 NEW Korean expansion dishes proposed in
// scripts/korean-expansion-200-proposal.json (migrate-korea-legacy.js already inserts
// the 200 base rows). Dedupes by exact name_ar against the live dishes table.
// protein/carbs/fat are populated (Atwater-consistent with cal_100).
// Region tags are per-row (pan_korean plus regional anchors such as busan, jeonju,
// seoul, jeju). asian_shared is deliberately unused (kept at 0 by request).
// Halal: no pork, no alcohol.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or (asia_migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const prop = JSON.parse(fs.readFileSync(path.join(__dirname, 'scripts/korean-expansion-200-proposal.json'), 'utf8'));

const TOTAL = prop.dishes.length;
let inserted = 0;
let skipped = 0;
let failed = 0;
const skippedNames = [];

for (let i = 0; i < TOTAL; i++) {
  const d = prop.dishes[i];
  const nameAr = d.name_ar.trim();
  try {
    const { data: existing } = await supabase
      .from('dishes')
      .select('id')
      .eq('name_ar', d.name_ar)
      .maybeSingle();
    if (existing) {
      skipped++;
      skippedNames.push(d.name_ar);
      console.log(`Skip ${i + 1}/${TOTAL} [korea] "${d.name_ar}" already exists (id=${existing.id})`);
      continue;
    }
    const { error } = await supabase.from('dishes').insert({
      name_ar: d.name_ar,
      name_en: d.name_en,
      name_fr: d.name_fr,
      name_es: d.name_es,
      name_de: d.name_de,
      cal_100: d.cal_100,
      protein: d.protein,
      carbs: d.carbs,
      fat: d.fat,
      fiber: null,
      sugar: null,
      sodium: null,
      sat_fat: null,
      base_serving_g: null,
      base_cal_serv: null,
      meal_type: d.mealType,
      region: d.region,
      region_confidence: null,
      source: d.source,
      confidence: null,
      confidence_label: null,
      confidence_color: null,
    });
    if (error) throw new Error(`insert failed: ${error.message}`);
    inserted++;
    console.log(`Insert ${i + 1}/${TOTAL} [korea] "${d.name_ar}" (region=${d.region}, meal=${d.mealType}, cal=${d.cal_100}, p${d.protein}/c${d.carbs}/f${d.fat})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${TOTAL} ("${d.name_ar}"): ${err.message}`);
  }
}

console.log('\n===== KOREA 2026 MIGRATION =====');
console.log(`Total rows   : ${TOTAL}`);
console.log(`Inserted     : ${inserted}`);
console.log(`Skipped      : ${skipped}`);
console.log(`Failed       : ${failed}`);
if (skippedNames.length) console.log('Skipped names:', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;
