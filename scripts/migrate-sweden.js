import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { createClient } from '@supabase/supabase-js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error('Missing Supabase credentials');

const REGIONS = new Set([
  'pan_swedish', 'stockholm', 'gothenburg', 'malmo', 'uppsala', 'umea',
  'kiruna', 'visby', 'orebro', 'linkoping',
]);
const source = fs.readFileSync(path.join(ROOT, 'src/data/sweden-full.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
const exports = {};
new Function('exports', compiled.outputText)(exports);
const dishes = exports.SWEDEN_FULL;

if (!Array.isArray(dishes) || dishes.length !== 350) {
  throw new Error(`Expected 350 Sweden dishes; found ${dishes?.length ?? 'none'}`);
}

const sourceIds = new Set();
for (const [index, dish] of dishes.entries()) {
  const names = [dish.nameAr, dish.nameEn, dish.nameFr, dish.nameEs, dish.nameDe];
  if (names.some((name) => typeof name !== 'string' || !name.trim())) {
    throw new Error(`Dish ${index + 1} is missing a translated name`);
  }
  if (!REGIONS.has(dish.region)) throw new Error(`Dish ${index + 1} has unknown region: ${dish.region}`);
  if (![dish.kcal, dish.protein, dish.carbs, dish.fat, dish.grams].every(Number.isFinite)) {
    throw new Error(`Dish ${index + 1} has invalid nutrition or serving data`);
  }
  const atwaterCalories = Math.round(4 * dish.protein + 4 * dish.carbs + 9 * dish.fat);
  if (atwaterCalories !== dish.kcal) throw new Error(`Dish ${index + 1} has inconsistent calories`);
  if (sourceIds.has(dish.id)) throw new Error(`Duplicate Sweden dish id at row ${index + 1}`);
  sourceIds.add(dish.id);
}

const supabase = createClient(URL, KEY, { auth: { persistSession: false } });
const existingRows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase
    .from('dishes')
    .select('source')
    .like('source', 'sweden-full.ts:%')
    .order('id', { ascending: true })
    .range(from, from + 999);
  if (error) throw new Error(`Existing-row lookup failed: ${error.message}`);
  existingRows.push(...(data ?? []));
  if ((data ?? []).length < 1000) break;
}

const existingSources = new Set(existingRows.map((row) => row.source));
const pending = dishes.filter((dish) => !existingSources.has(`sweden-full.ts:${dish.id}`));
const rows = pending.map((dish) => ({
  name_ar: dish.nameAr,
  name_en: dish.nameEn,
  name_fr: dish.nameFr,
  name_es: dish.nameEs,
  name_de: dish.nameDe,
  cal_100: dish.kcal,
  protein: dish.protein,
  carbs: dish.carbs,
  fat: dish.fat,
  fiber: null,
  sugar: null,
  sodium: null,
  sat_fat: null,
  base_serving_g: dish.grams,
  base_cal_serv: dish.kcal,
  serving_unit: null,
  serving_description: null,
  healthy: null,
  is_fried: null,
  is_sweet: null,
  meal_type: dish.mealType,
  region: dish.region,
  region_confidence: null,
  source: `sweden-full.ts:${dish.id}`,
  confidence: null,
  confidence_label: null,
  confidence_color: null,
  diaspora_priority: dish.diaspora_priority ?? null,
}));

let inserted = 0;
for (let i = 0; i < rows.length; i += 50) {
  const batch = rows.slice(i, i + 50);
  const { error } = await supabase.from('dishes').insert(batch);
  if (error) throw new Error(`Insert failed for batch ${i / 50 + 1}: ${error.message}`);
  inserted += batch.length;
}

console.log(`Sweden migration: ${dishes.length} source rows, ${inserted} inserted, ${dishes.length - inserted} skipped as existing`);
