import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const prop = JSON.parse(fs.readFileSync(path.join(__dirname, 'scripts/tunisia-100-proposal.json'), 'utf8'));

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
      console.log(`Skip ${i + 1}/${TOTAL} [tunisian] "${nameAr}" already exists (id=${existing.id})`);
      continue;
    }
    const { error } = await supabase.from('dishes').insert({
      name_ar: nameAr,
      name_en: d.name_en,
      name_fr: d.name_fr,
      name_es: d.name_es,
      name_de: d.name_de,
      cal_100: d.cal_100,
      protein: null,
      carbs: null,
      fat: null,
      fiber: null,
      sugar: null,
      sodium: null,
      sat_fat: null,
      base_serving_g: null,
      base_cal_serv: null,
      meal_type: d.mealType,
      region: d.region,
      region_confidence: null,
      source: 'north-africa-tunisia-2026 - Verified against Tunisian Culinary Heritage',
      confidence: null,
      confidence_label: null,
      confidence_color: null,
    });
    if (error) throw new Error(`insert failed: ${error.message}`);
    inserted++;
    console.log(`Insert ${i + 1}/${TOTAL} [tunisian] "${nameAr}" (region=${d.region}, meal=${d.mealType}, cal=${d.cal_100})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${TOTAL} ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== TUNISIA 2026 MIGRATION =====');
console.log(`Total rows   : ${TOTAL}`);
console.log(`Inserted     : ${inserted}`);
console.log(`Skipped      : ${skipped}`);
console.log(`Failed       : ${failed}`);
if (skippedNames.length) console.log('Skipped names:', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;