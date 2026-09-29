// Migrates the 200 Japanese base dishes (src/data/japanese-full.ts -> JAPANESE_FULL)
// to Supabase. Awaits the 'asia_migration' secret key (falls back to the service role key).
// protein/carbs/fat are per-100 g in the file and kcal is already Atwater-consistent
// (round(4P+4C+9F)); the migrator recomputes and repairs any drift. Region: pan_japanese
// (golden rule). The base rows carry a fixed 100 g serving, so base_serving_g = 100 and
// base_cal_serv = cal_100.
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

const raw = fs.readFileSync(path.join(__dirname, 'src/data/japanese-full.ts'), 'utf8');
const m = raw.match(/export const JAPANESE_FULL: JapaneseFullDish\[\] = (\[[\s\S]*?\])\s*;/);
if (!m) { console.error('Could not extract JAPANESE_FULL array'); process.exit(1); }
const rows = JSON.parse(m[1]);

const MEAL = { breakfast: 'breakfast', lunch: 'lunch', dinner: 'dinner', snacks: 'snacks', side: 'lunch', salad: 'snacks', fruit: 'snacks' };

let inserted = 0;
let skipped = 0;
let failed = 0;
const skippedNames = [];
const badLangs = [];
const atwaterFixed = [];
const clamped = [];

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
  if (cal100 < 20) { clamped.push(`${nameAr} (${cal100}->20)`); cal100 = 20; }
  if (cal100 > 900) { cal100 = 900; }
  const baseCalServ = Math.round(cal100 * (g / 100) * 10) / 10;
  const nameEn = (r.nameEn ?? '').trim();
  const nameFr = (r.nameFr ?? '').trim();
  const nameEs = (r.nameEs ?? '').trim();
  const nameDe = (r.nameDe ?? '').trim();
  if (![nameAr, nameEn, nameFr, nameEs, nameDe].every((v) => typeof v === 'string' && v.trim().length > 0)) badLangs.push(nameAr);
  const meal = MEAL[r.mealType] ?? 'lunch';

  // Resolve duplicates: append "(Base)" to base rows that conflict with expansion
  let finalNameAr = nameAr;
  if (nameAr === 'موتشي بالبصل ياباني' || nameAr === 'موتشي بالثوم ياباني' || nameAr === 'موتشي بالزنجبيل ياباني' ||
      nameAr === 'موتشي بالفلفل ياباني' || nameAr === 'موتشي بالكاري ياباني' || nameAr === 'موتشي بالكزبرة ياباني' ||
      nameAr === 'موتشي بالليمون ياباني' || nameAr === 'موتشي بالموز ياباني' || nameAr === 'موتشي بجوز الهند ياباني') {
    finalNameAr = nameAr + ' (Base)';
  }
  if (nameAr === 'أونيجيري بالماكريل ياباني') {
    finalNameAr = nameAr + ' (Base)';
  }

  try {
    const { data: existing } = await supabase.from('dishes').select('id').eq('name_ar', finalNameAr).maybeSingle();
    if (existing) { skipped++; skippedNames.push(finalNameAr); console.log(`Skip ${i + 1}/${rows.length} "${finalNameAr}" (id=${existing.id})`); continue; }
    const { error } = await supabase.from('dishes').insert({
      name_ar: finalNameAr, name_en: nameEn, name_fr: nameFr, name_es: nameEs, name_de: nameDe,
      meal_type: meal,
      cal_100: cal100, protein: p100, carbs: c100, fat: f100,
      fiber: null, sugar: null, sodium: null, sat_fat: null,
      base_serving_g: g, base_cal_serv: baseCalServ, serving_unit: null, serving_description: null,
      healthy: null, is_fried: null, is_sweet: null,
      source: 'المطبخ الياباني التقليدي - أرقام محسوبة',
      confidence: null, confidence_label: null, confidence_color: null,
      region: 'pan_japanese', region_confidence: null,
    });
    if (error) throw new Error(error.message);
    inserted++;
    console.log(`Insert ${i + 1}/${rows.length} "${finalNameAr}" (meal=${meal}, cal=${cal100}, g=${g})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${rows.length} ("${finalNameAr}"): ${err.message}`);
  }
}

console.log('\n===== JAPAN LEGACY 2026 MIGRATION =====');
console.log(`Total rows      : ${rows.length}`);
console.log(`Inserted        : ${inserted}`);
console.log(`Skipped (exists): ${skipped}`);
console.log(`Failed          : ${failed}`);
if (atwaterFixed.length) console.log('Atwater fixed   :', atwaterFixed.join(' | '));
if (clamped.length) console.log('Clamped to 20   :', clamped.join(' | '));
if (badLangs.length) console.warn('Empty lang fields:', badLangs.join(' | '));
if (skippedNames.length) console.log('Skipped names  :', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;