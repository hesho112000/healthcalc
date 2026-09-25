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

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'src/data/tunisian-full-100-USDA.json'), 'utf8'),
);

const CATEGORY_MEAL = {
  soups: 'lunch',
  salads: 'lunch',
  brik: 'snacks',
  main_stews: 'lunch',
  couscous: 'lunch',
  seafood: 'lunch',
  meats_poultry: 'lunch',
  bakery: 'breakfast',
  sweets: 'snacks',
  drinks_spices: 'snacks',
};

const NORMAL_MEAL = ['breakfast', 'lunch', 'dinner', 'snacks', 'snack', 'dessert', 'juice'];

function normalizeMeal(m) {
  const t = (m ?? '').toLowerCase();
  if (NORMAL_MEAL.includes(t)) {
    if (t === 'dinner') return 'lunch';
    if (t === 'snack' || t === 'dessert' || t === 'juice') return 'snacks';
    return t;
  }
  return null;
}

function resolveMealType(dish, catId) {
  const direct = normalizeMeal(dish.mealType);
  if (direct) return direct;
  if (Array.isArray(dish.mealTypes) && dish.mealTypes.length) {
    const fromArr = normalizeMeal(dish.mealTypes[0]);
    if (fromArr) return fromArr;
  }
  return CATEGORY_MEAL[catId] ?? 'lunch';
}

const dishes = data.categories.flatMap((c) => c.dishes.map((d) => ({ ...d, _catId: c.id })));

const TOTAL = dishes.length;
let inserted = 0;
let skipped = 0;
let failed = 0;
let servingInserted = 0;
let servingFailed = 0;
const skippedNames = [];
const badCal = [];
const badLangs = [];

for (let i = 0; i < dishes.length; i++) {
  const d = dishes[i];
  const nameAr = typeof d.name === 'string' ? d.name.trim() : '';
  if (!nameAr) {
    failed++;
    console.error(`Failed ${i + 1}/${TOTAL} entry missing Arabic name`);
    continue;
  }
  const cal100 = Number(d.cal_100);
  if (!Number.isFinite(cal100) || cal100 < 20 || cal100 > 900) badCal.push(nameAr);
  const langsOk = [d.name, d.name_en, d.name_fr, d.name_es, d.name_de].every(
    (v) => typeof v === 'string' && v.trim().length > 0,
  );
  if (!langsOk) badLangs.push(nameAr);

  try {
    const { data: existing } = await supabase.from('dishes').select('id').eq('name_ar', nameAr).maybeSingle();
    if (existing) {
      skipped++;
      skippedNames.push(nameAr);
      console.log(`Skip ${i + 1}/${TOTAL} "${nameAr}" already exists (id=${existing.id})`);
      continue;
    }

    const meal = resolveMealType(d, d._catId);
    const { data: insertedRow, error } = await supabase
      .from('dishes')
      .insert({
        name_ar: nameAr,
        name_en: d.name_en ?? null,
        name_fr: d.name_fr ?? null,
        name_es: d.name_es ?? null,
        name_de: d.name_de ?? null,
        meal_type: meal,
        cal_100: cal100,
        protein: d.p ?? null,
        carbs: d.c ?? null,
        fat: d.f ?? null,
        fiber: d.fiber_g ?? null,
        sugar: d.sugar_g ?? null,
        sodium: d.sodium_mg ?? null,
        sat_fat: d.sat_fat_g ?? null,
        base_serving_g: d.serv_g ?? null,
        base_cal_serv: d.cal_serv ?? null,
        serving_unit: d.serving_unit ?? null,
        serving_description: d.serving_description ?? null,
        healthy: d.healthy ?? null,
        is_fried: d.is_fried ?? null,
        is_sweet: d.is_sweet ?? null,
        source: d.source ?? 'المطبخ التونسي',
        confidence: d.confidence ?? null,
        confidence_label: d.confidence_label ?? null,
        confidence_color: d.confidence_color ?? null,
        region: 'pan_tunisian',
        region_confidence: null,
      })
      .select('id')
      .single();
    if (error) throw new Error(`insert failed: ${error.message}`);
    inserted++;

    for (const so of d.serving_options ?? []) {
      const { error: soErr } = await supabase.from('serving_options').insert({
        dish_id: insertedRow.id,
        label_ar: so.label ?? null,
        label_en: so.label_en ?? null,
        multiplier: so.multiplier ?? null,
        grams: so.g ?? null,
        kcal: so.kcal ?? null,
      });
      if (soErr) {
        servingFailed++;
        console.error(`  serving_options fail for "${nameAr}": ${soErr.message}`);
      } else {
        servingInserted++;
      }
    }

    console.log(
      `Insert ${i + 1}/${TOTAL} "${nameAr}" (meal=${meal}, cal=${cal100}, serving_options=${d.serving_options?.length ?? 0})`,
    );
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${TOTAL} ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== TUNISIA LEGACY 2026 MIGRATION =====');
console.log(`Total rows           : ${TOTAL}`);
console.log(`Inserted             : ${inserted}`);
console.log(`Skipped (exists)     : ${skipped}`);
console.log(`Failed               : ${failed}`);
console.log(`Serving options ins  : ${servingInserted}`);
console.log(`Serving options fail : ${servingFailed}`);
if (badCal.length) console.warn('Out-of-range cal_100:', badCal.join(' | '));
if (badLangs.length) console.warn('Empty lang fields:', badLangs.join(' | '));
if (skippedNames.length) console.log('Skipped names:', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;