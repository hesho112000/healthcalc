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

const JSON_PATH = path.join(__dirname, 'scripts', 'uae-150-data.json');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const raw = fs.readFileSync(JSON_PATH, 'utf-8');
const allDishes = JSON.parse(raw);
const TOTAL = allDishes.length;

const dishRow = (d) => {
  const row = {
    name_ar: d.name,
    name_en: d.name_en ?? null,
    name_fr: d.name_fr ?? null,
    name_es: d.name_es ?? null,
    name_de: d.name_de ?? null,
    cal_100: d.cal_100 ?? null,
    protein: d.p ?? null,
    carbs: d.c ?? null,
    fat: d.f ?? null,
    fiber: d.fiber_g ?? null,
    sugar: d.sugar_g ?? null,
    sodium: d.sodium_mg ?? null,
    sat_fat: d.sat_fat_g ?? null,
    base_serving_g: d.serv_g ?? null,
    base_cal_serv: d.cal_serv ?? null,
    meal_type: d.mealType ?? null,
    source: d.source ?? null,
    confidence: d.confidence ?? null,
    confidence_label: d.confidence_label ?? null,
    confidence_color: d.confidence_color ?? null,
  };
  if (d.region) row.region = d.region;
  if (d.region === 'ras_al_khaimah') row.region_confidence = 60;
  return row;
};

let inserted = 0;
let skipped = 0;
let failed = 0;

for (let i = 0; i < allDishes.length; i++) {
  const dish = allDishes[i];
  const index = i;
  const nameAr = dish.name;

  try {
    const { data: existing, error: checkErr } = await supabase
      .from('dishes')
      .select('id')
      .eq('name_ar', nameAr)
      .maybeSingle();

    if (checkErr) {
      throw new Error(`duplicate check failed: ${checkErr.message}`);
    }

    if (existing) {
      skipped++;
      console.log(`Skipped dish ${index + 1} of ${TOTAL}: "${nameAr}" already exists (id=${existing.id})`);
      continue;
    }

    const { data: insertedRow, error: insertErr } = await supabase
      .from('dishes')
      .insert(dishRow(dish))
      .select('id')
      .single();

    if (insertErr) {
      throw new Error(`insert failed: ${insertErr.message}`);
    }

    const dishId = insertedRow.id;

    const servingOptions = (dish.serving_options ?? []).map((so) => ({
      dish_id: dishId,
      label_ar: so.label ?? null,
      label_en: so.label_en ?? null,
      multiplier: so.multiplier ?? null,
      grams: so.g ?? null,
      kcal: so.kcal ?? null,
    }));

    if (servingOptions.length > 0) {
      const { error: soErr } = await supabase.from('serving_options').insert(servingOptions);
      if (soErr) {
        throw new Error(`serving_options insert failed: ${soErr.message}`);
      }
    }

    inserted++;
    console.log(`Inserted dish ${index + 1} of ${TOTAL}`);
  } catch (err) {
    failed++;
    console.error(`Failed dish ${index + 1} of ${TOTAL} ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== UAE MIGRATION SUMMARY =====');
console.log(`Total dishes in JSON : ${TOTAL}`);
console.log(`Inserted            : ${inserted}`);
console.log(`Skipped (duplicate) : ${skipped}`);
console.log(`Failed              : ${failed}`);

if (failed > 0) process.exitCode = 1;