// Dry-run validator for the Palestinian 200-dish proposal (READ-ONLY: queries the live
// dishes table for name collisions, never writes). Reports:
//  - duplicate Arabic names within the proposal set
//  - collisions with the 100 legacy rows being migrated in parallel
//  - collisions with the existing 4,229+ dishes in Supabase
//  - 5-language completeness, cal_100 range [20,900], category/region/mealType shape
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['levant-migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or (levant-migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const prop = JSON.parse(fs.readFileSync(path.join(__dirname, 'palestine-201-proposal.json'), 'utf8'));
const legacy = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/palestinian-full-100-USDA.json'), 'utf8'));

const dishes = prop.dishes;
const legacyNames = legacy.map((r) => r.name_ar.trim());

// 1. In-set duplicate Arabic names
const seen = new Map();
const inSetDups = [];
for (const d of dishes) {
  if (seen.has(d.name_ar)) inSetDups.push(d.name_ar);
  seen.set(d.name_ar, true);
}

// 2. Proposal vs legacy names
const vsLegacy = dishes.filter((d) => legacyNames.includes(d.name_ar)).map((d) => d.name_ar);

// 3. Live collisions
const existing = new Set();
const PAGE = 1000;
for (let from = 0; ; from += PAGE) {
  const { data, error } = await supabase.from('dishes').select('name_ar').order('id', { ascending: true }).range(from, from + PAGE - 1);
  if (error) { console.error('Query failed:', error.message); process.exit(1); }
  for (const r of data ?? []) existing.add(r.name_ar);
  if ((data ?? []).length < PAGE) break;
}
const liveCollisions = dishes.filter((d) => existing.has(d.name_ar)).map((d) => d.name_ar);
const legacyVsLive = legacyNames.filter((n) => existing.has(n));

// 4. Language completeness
const badLangs = dishes.filter((d) => !(d.name_ar && d.name_en && d.name_fr && d.name_es && d.name_de)).map((d) => d.name_ar);

// 5. cal_100 range
const lowCal = dishes.filter((d) => d.cal_100 < 20).map((d) => `${d.name_ar}(${d.cal_100})`);
const highCal = dishes.filter((d) => d.cal_100 > 900).map((d) => `${d.name_ar}(${d.cal_100})`);

// 6. Categories / regions / mealTypes present
const cats = [...new Set(dishes.map((d) => d.category))];
const regions = [...new Set(dishes.map((d) => d.region))];
const meals = [...new Set(dishes.map((d) => d.mealType))];

console.log('\n===== PALESTINE 200 DISH DRY-RUN VALIDATION =====');
console.log(`Proposal dishes : ${dishes.length}`);
console.log(`Legacy rows     : ${legacy.length} (${legacyNames.length} unique Arabic names)`);
console.log(`Live dishes in DB: ${existing.size}`);
console.log('\n-- Integrity --');
console.log(`In-set duplicate Arabic names : ${inSetDups.length} ${inSetDups.length ? ': ' + inSetDups.join(' | ') : ''}`);
console.log(`Proposal collides with legacy : ${vsLegacy.length} ${vsLegacy.length ? ': ' + vsLegacy.join(' | ') : ''}`);
console.log(`Proposal collides with live   : ${liveCollisions.length} ${liveCollisions.length ? ': ' + liveCollisions.join(' | ') : ''}`);
console.log(`Legacy collides with live     : ${legacyVsLive.length} ${legacyVsLive.length ? ': ' + legacyVsLive.join(' | ') : ''}`);
console.log(`Missing a language field      : ${badLangs.length} ${badLangs.length ? ': ' + badLangs.join(' | ') : ''}`);
console.log(`cal_100 < 20                  : ${lowCal.length} ${lowCal.length ? ': ' + lowCal.join(' | ') : ''}`);
console.log(`cal_100 > 900                 : ${highCal.length} ${highCal.length ? ': ' + highCal.join(' | ') : ''}`);
console.log('\n-- Shape --');
console.log(`Categories (${cats.length}): ${cats.join(', ')}`);
console.log(`Regions (${regions.length}): ${regions.join(', ')}`);
console.log(`Meal types: ${meals.join(', ')}`);
const regionCount = {};
for (const d of dishes) regionCount[d.region] = (regionCount[d.region] ?? 0) + 1;
console.log('Region distribution:', JSON.stringify(regionCount));

if (inSetDups.length || vsLegacy.length || badLangs.length || lowCal.length || highCal.length) process.exitCode = 1;