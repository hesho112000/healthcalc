// Migrates the 150 Taiwan BASE dishes (src/data/taiwan-full.ts -> TAIWAN_FULL)
// to Supabase. Awaits the 'asia_migration' secret key (falls back to the service role key).
// protein/carbs/fat are per-100 g in the file and cal_100 is already Atwater-consistent
// (round(4P+4C+9F)); the migrator recomputes and repairs any drift.
// Region: per-row (pan_taiwanese plus the 12 regional anchors: taipei, tainan, taichung,
// kaohsiung, hsinchu, hualien, taitung, keelung, chiayi, nantou, yilan, pingtung).
// asian_shared is deliberately unused (kept at 0, same rule as Korea).
// The base rows carry a fixed 100 g serving, so base_serving_g = 100 and base_cal_serv = cal_100.
//
// HALAL: Taiwan is pork-heavy by nature. This set was authored halal-first: pork,
// pork lard, blood and wild game are all absent, and the pork-leaning classics were
// rebuilt on halal proteins (lu rou fan -> beef lu rou fan, gong wan -> beef balls,
// etc.). See scripts/taiwan-halal-scan.cjs, which the builder runs as a hard gate.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// This script lives in scripts/, so the repo root is one level up.
const ROOT = path.resolve(__dirname, '..');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or (asia_migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const raw = fs.readFileSync(path.join(ROOT, 'src/data/taiwan-full.ts'), 'utf8');
const m = raw.match(/export const TAIWAN_FULL: KitchenDish\[\] = (\[[\s\S]*?\])\s*;/);
if (!m) { console.error('Could not extract TAIWAN_FULL array'); process.exit(1); }
const rows = JSON.parse(m[1]);

const MEAL = { breakfast: 'breakfast', lunch: 'lunch', dinner: 'dinner', snacks: 'snacks', side: 'lunch', salad: 'snacks', fruit: 'snacks' };

// Golden rule for this migration: Taiwan stands entirely on pan_taiwanese + its 12
// regional anchors. asian_shared must never be written.
const ALLOWED_REGIONS = new Set([
  'pan_taiwanese', 'taipei', 'tainan', 'taichung', 'kaohsiung', 'hsinchu',
  'hualien', 'taitung', 'keelung', 'chiayi', 'nantou', 'yilan', 'pingtung',
]);

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
  // No lower/upper clamp: clamping would break Atwater consistency, and the
  // requirement is that cal_100 === round(4P + 4C + 9F) for every row. Low-calorie
  // teas legitimately land at 4-8 kcal per 100 g, matching the expansion teas.
  if (cal100 > 900) { cal100 = 900; }
  const baseCalServ = Math.round(cal100 * (g / 100) * 10) / 10;
  const nameEn = (r.nameEn ?? '').trim();
  const nameFr = (r.nameFr ?? '').trim();
  const nameEs = (r.nameEs ?? '').trim();
  const nameDe = (r.nameDe ?? '').trim();
  if (![nameAr, nameEn, nameFr, nameEs, nameDe].every((v) => typeof v === 'string' && v.trim().length > 0)) badLangs.push(nameAr);
  const meal = MEAL[r.mealType] ?? 'lunch';
  const region = ALLOWED_REGIONS.has(r.region) ? r.region : 'pan_taiwanese';
  if (!ALLOWED_REGIONS.has(r.region)) console.warn(`Row ${i + 1} illegal region "${r.region}", defaulted to pan_taiwanese`);

  try {
    const { data: existing } = await supabase.from('dishes').select('id').eq('name_ar', nameAr).maybeSingle();
    if (existing) { skipped++; skippedNames.push(nameAr); console.log(`Skip ${i + 1}/${rows.length} "${nameAr}" (id=${existing.id})`); continue; }
    const { error } = await supabase.from('dishes').insert({
      name_ar: nameAr, name_en: nameEn, name_fr: nameFr, name_es: nameEs, name_de: nameDe,
      meal_type: meal,
      cal_100: cal100, protein: p100, carbs: c100, fat: f100,
      fiber: null, sugar: null, sodium: null, sat_fat: null,
      base_serving_g: g, base_cal_serv: baseCalServ, serving_unit: null, serving_description: null,
      healthy: null, is_fried: null, is_sweet: null,
      source: 'asia-taiwan-2026 - Verified against Taiwanese culinary heritage',
      confidence: null, confidence_label: null, confidence_color: null,
      region, region_confidence: null,
    });
    if (error) throw new Error(error.message);
    inserted++;
    console.log(`Insert ${i + 1}/${rows.length} "${nameAr}" (region=${region}, meal=${meal}, cal=${cal100}, g=${g})`);
  } catch (err) {
    failed++;
    console.error(`Failed ${i + 1}/${rows.length} ("${nameAr}"): ${err.message}`);
  }
}

console.log('\n===== TAIWAN LEGACY 2026 MIGRATION =====');
console.log(`Total rows      : ${rows.length}`);
console.log(`Inserted        : ${inserted}`);
console.log(`Skipped (exists): ${skipped}`);
console.log(`Failed          : ${failed}`);
if (atwaterFixed.length) console.log('Atwater fixed   :', atwaterFixed.join(' | '));
if (badLangs.length) console.warn('Empty lang fields:', badLangs.join(' | '));
if (skippedNames.length) console.log('Skipped names  :', skippedNames.join(' | '));

if (failed > 0) process.exitCode = 1;
