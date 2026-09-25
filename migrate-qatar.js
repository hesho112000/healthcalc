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

const qat = JSON.parse(fs.readFileSync(path.join(__dirname, 'scripts/qatar-200-proposal.json'), 'utf-8'));

const rows = qat.dishes.map((d) => ({
  kitchen: 'qatar',
  name_ar: d.name_ar,
  name_en: d.name_en,
  name_fr: d.name_fr,
  name_es: d.name_es,
  name_de: d.name_de,
  cal_100: d.cal_100,
  mealType: d.mealType,
  region: d.region,
}));

const TOTAL = rows.length;
let inserted = 0;
let skipped = 0;
let failed = 0;
const skippedNames = [];

for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  try {
    const { data: existing, error: checkErr } = await supabase
      .from('dishes')
      .select('id')
      .eq('name_ar', r.name_ar)
      .maybeSingle();
    if (checkErr) throw new Error(`duplicate check failed: ${checkErr.message}`);
    if (existing) {
      skipped++;
      skippedNames.push(r.name_ar);
      console.log(`Skip ${i + 1}/${TOTAL} [qatar] "${r.name_ar}" already exists (id=${existing.id})`);
      continue;
    }
    const { error: insertErr } = await supabase.from('dishes').insert({
      name_ar: r.name_ar,
      name_en: r.name_en,
      name_fr: r.name_fr,
      name_es: r.name_es,
      name_de: r.name_de,
      cal_100: r.cal_100,
      protein: null,
      carbs: null,
      fat: null,
      fiber: null,
      sugar: null,
      sodium: null,
      sat_fat: null,
      base_serving_g: null,
      base_cal_serv: null,
      meal_type: r.mealType,
      region: r.region,
      region_confidence: null,
      source: 'gulf-expansion-qatar-2026',
      confidence: null,
      confidence_label: null,
      confidence_color: null,
    });
    if (insertErr) throw new Error(`insert failed: ${insertErr.message}`);
    inserted++;
    console.log(`Insert ${i + 1}/${TOTAL} [qatar] "${r.name_ar}" (region=${r.region}, meal=${r.mealType})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${TOTAL} ("${r.name_ar}"): ${err.message}`);
  }
}

console.log('\n===== QATAR 2026 MIGRATION =====');
console.log(`Total rows   : ${TOTAL}`);
console.log(`Inserted     : ${inserted}`);
console.log(`Skipped      : ${skipped}`);
console.log(`Failed       : ${failed}`);
if (skippedNames.length) console.log('Skipped names:', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;