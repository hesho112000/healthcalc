// Injector for the 200 NEW Ghanaian dishes proposed in scripts/ghana-200-proposal.json
// (migrate-ghana-legacy.js already inserted the 100 legacy rows). Dedupes by exact name_ar
// against the live dishes table. protein/carbs/fat are populated (Atwater-consistent with
// cal_100). Rows tagged african_shared are also credited to the Ghanaian card at runtime via
// the 'africa-ghana-2026' source prefix.
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

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const prop = JSON.parse(fs.readFileSync(path.join(__dirname, 'scripts/ghana-200-proposal.json'), 'utf8'));

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
      .eq('name_ar', nameAr)
      .maybeSingle();
    if (existing) {
      skipped++;
      skippedNames.push(nameAr);
      console.log(`Skip ${i + 1}/${TOTAL} [ghanaian] "${nameAr}" already exists (id=${existing.id})`);
      continue;
    }
    const { error } = await supabase.from('dishes').insert({
      name_ar: nameAr,
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
      source: 'africa-ghana-2026 - Verified against Ghanaian Culinary Heritage',
      confidence: null,
      confidence_label: null,
      confidence_color: null,
    });
    if (error) throw new Error(`insert failed: ${error.message}`);
    inserted++;
    console.log(`Insert ${i + 1}/${TOTAL} [ghanaian] "${nameAr}" (region=${d.region}, meal=${d.mealType}, cal=${d.cal_100}, p${d.protein}/c${d.carbs}/f${d.fat})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${TOTAL} ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== GHANA 2026 MIGRATION =====');
console.log(`Total rows   : ${TOTAL}`);
console.log(`Inserted     : ${inserted}`);
console.log(`Skipped      : ${skipped}`);
console.log(`Failed       : ${failed}`);
if (skippedNames.length) console.log('Skipped names:', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;