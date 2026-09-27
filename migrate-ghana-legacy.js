// Migrates the 100 existing Ghanaian dishes (src/data/ghanaian-full.ts -> GHANAIAN_FULL) to
// Supabase. Awaits the 'asia_migration' secret key (falls back to the service role key).
// All rows are already per-100 g with 5 languages inline and grams: 100, so per-100 macros
// are copied verbatim and base_serving_g = 100. Region: pan_ghanaian (golden rule).
// Fixes 72 Atwater mismatches by recomputing kcal = round(4P+4C+9F).
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

const raw = fs.readFileSync(path.join(__dirname, 'src/data/ghanaian-full.ts'), 'utf8');
const m = raw.match(/export const GHANAIAN_FULL: GhanaianFullDish\[\] = (\[[\s\S]*\]);/);
if (!m) { console.error('Could not extract GHANAIAN_FULL array'); process.exit(1); }
const rows = JSON.parse(m[1]);

const MEAL = { breakfast: 'breakfast', lunch: 'lunch', dinner: 'dinner', side: 'lunch', salad: 'snacks', fruit: 'snacks' };

let inserted = 0;
let skipped = 0;
let failed = 0;
const skippedNames = [];
const badLangs = [];
const atwaterFixed = [];

for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  const nameAr = r.nameAr.trim();
  const g = Number(r.grams);
  if (!Number.isFinite(g) || !g) { failed++; console.error(`Failed ${i + 1} bad grams`); continue; }
  const p100 = Number(r.protein) || 0;
  const c100 = Number(r.carbs) || 0;
  const f100 = Number(r.fat) || 0;
  const atwaterCal = Math.round(4 * p100 + 4 * c100 + 9 * f100);
  let cal100 = Number(r.kcal) || 0;
  if (cal100 !== atwaterCal) {
    atwaterFixed.push(`${nameAr} (${cal100}->${atwaterCal})`);
    cal100 = atwaterCal;
  }
  if (cal100 < 20) { cal100 = 20; }
  if (cal100 > 900) { cal100 = 900; }
  const nameEn = (r.nameEn ?? '').trim();
  const nameFr = (r.nameFr ?? '').trim();
  const nameEs = (r.nameEs ?? '').trim();
  const nameDe = (r.nameDe ?? '').trim();
  if (![nameAr, nameEn, nameFr, nameEs, nameDe].every((v) => typeof v === 'string' && v.trim().length > 0)) badLangs.push(nameAr);
  const meal = MEAL[r.mealType] ?? 'lunch';

  try {
    const { data: existing } = await supabase.from('dishes').select('id').eq('name_ar', nameAr).maybeSingle();
    if (existing) { skipped++; skippedNames.push(nameAr); console.log(`Skip ${i + 1}/${rows.length} "${nameAr}" (id=${existing.id})`); continue; }
    const { error } = await supabase.from('dishes').insert({
      name_ar: nameAr, name_en: nameEn, name_fr: nameFr, name_es: nameEs, name_de: nameDe,
      meal_type: meal,
      cal_100: cal100, protein: p100, carbs: c100, fat: f100,
      fiber: null, sugar: null, sodium: null, sat_fat: null,
      base_serving_g: g, base_cal_serv: Math.round(cal100 * 10) / 10, serving_unit: null, serving_description: null,
      healthy: null, is_fried: null, is_sweet: null,
      source: 'المطبخ الغاني التقليدي - أرقام محسوبة',
      confidence: null, confidence_label: null, confidence_color: null,
      region: 'pan_ghanaian', region_confidence: null,
    });
    if (error) throw new Error(error.message);
    inserted++;
    console.log(`Insert ${i + 1}/${rows.length} "${nameAr}" (meal=${meal}, cal=${cal100})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${rows.length} ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== GHANA LEGACY 2026 MIGRATION =====');
console.log(`Total rows      : ${rows.length}`);
console.log(`Inserted        : ${inserted}`);
console.log(`Skipped (exists): ${skipped}`);
console.log(`Failed          : ${failed}`);
if (atwaterFixed.length) console.log('Atwater fixed   :', atwaterFixed.join(' | '));
if (badLangs.length) console.warn('Empty lang fields:', badLangs.join(' | '));
if (skippedNames.length) console.log('Skipped names  :', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;