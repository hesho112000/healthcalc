// Phase C only: insert the 175-row France expansion proposal. Not run during Phase A.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const URL = process.env.SUPABASE_URL;
const KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error('Missing Supabase credentials');
const supabase = createClient(URL, KEY, { auth: { persistSession: false } });
const dishes = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/france-expansion-175-proposal.json'), 'utf8')).dishes;
const REGIONS = new Set(['pan_french', 'paris', 'normandy', 'provence', 'lyon', 'bordeaux', 'alsace', 'brittany', 'burgundy', 'toulouse', 'marseille', 'loire', 'corsica']);
if (!Array.isArray(dishes) || dishes.length !== 175) throw new Error('France expansion proposal must contain 175 dishes');
let inserted = 0, skipped = 0, failed = 0;
for (const [i, d] of dishes.entries()) {
  const nameAr = String(d.name_ar ?? '').trim();
  const kcal = Math.round(4 * Number(d.protein) + 4 * Number(d.carbs) + 9 * Number(d.fat));
  if (!REGIONS.has(d.region) || !nameAr || kcal !== d.cal_100) { console.error(`Invalid expansion row ${i + 1}: ${nameAr}`); failed++; continue; }
  try {
    const { data: existing, error: lookupError } = await supabase.from('dishes').select('id').eq('name_ar', nameAr).maybeSingle();
    if (lookupError) throw lookupError;
    if (existing) { skipped++; continue; }
    const grams = Number(d.grams) || 100;
    const { error } = await supabase.from('dishes').insert({
      name_ar: nameAr, name_en: d.name_en, name_fr: d.name_fr, name_es: d.name_es, name_de: d.name_de,
      meal_type: d.mealType, cal_100: kcal, protein: d.protein, carbs: d.carbs, fat: d.fat,
      fiber: null, sugar: null, sodium: null, sat_fat: null,
      base_serving_g: grams, base_cal_serv: Math.round(kcal * grams) / 100,
      serving_unit: null, serving_description: null, healthy: null, is_fried: null, is_sweet: null,
      source: d.source, confidence: null, confidence_label: null, confidence_color: null,
      region: d.region, region_confidence: null, diaspora_priority: d.diaspora_priority,
    });
    if (error) throw error;
    inserted++;
  } catch (error) { failed++; console.error(`Failed expansion row ${i + 1} (${nameAr}): ${error.message}`); }
}
console.log(`France expansion migration: ${dishes.length} rows, ${inserted} inserted, ${skipped} existing, ${failed} failed`);
if (failed) process.exitCode = 1;
