// Validates scripts/lebanon-150-proposal.json against schema, cal_100 range, internal
// duplicates, and the LIVE dishes table (by normalized Arabic name) — including the 100
// legacy Lebanese rows migrated just before.
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

const prop = JSON.parse(fs.readFileSync(path.join(__dirname, process.argv[2] ?? 'lebanon-150-proposal.json'), 'utf8'));

const norm = (s) => (s ?? '').replace(/[\u064B-\u0652\u0670]/g, '').replace(/\u0640/g, '').replace(/[أإآ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/\s+/g, ' ').trim();

let errors = 0;
const err = (m) => { errors++; console.error('ERROR:', m); };

const dset = prop.dishes;
const langKeys = ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de'];
dset.forEach((d, i) => {
  if (!d || typeof d !== 'object') return err(`row ${i} not an object`);
  for (const k of [...langKeys, 'category', 'mealType', 'region']) {
    if (typeof d[k] !== 'string' || !d[k].trim()) err(`row ${i} (${d.name_ar}) missing ${k}`);
  }
  for (const k of langKeys) if (d[k] && !d[k].trim()) err(`row ${i} empty ${k}`);
  if (!(d.cal_100 >= 20 && d.cal_100 <= 900)) err(`row ${i} (${d.name_ar}) cal_100 ${d.cal_100} out of [20,900]`);
});

const norms = dset.map((d) => norm(d.name_ar));
const dupNorm = norms.find((n, i) => norms.indexOf(n) !== i);
if (dupNorm) err(`internal normalized dup: ${dupNorm}`);

const cats = new Set(prop.categories);
const rgns = new Set(prop.regions);
const mts = new Set(prop.meal_types);
for (const d of dset) {
  if (!cats.has(d.category)) err(`bad category ${d.category} (${d.name_ar})`);
  if (!rgns.has(d.region)) err(`bad region ${d.region} (${d.name_ar})`);
  if (!mts.has(d.mealType)) err(`bad mealType ${d.mealType} (${d.name_ar})`);
}

const dbNames = new Set();
let from = 0;
for (;;) {
  const { data, error } = await supabase.from('dishes').select('name_ar').range(from, from + 999);
  if (error) { console.error('DB error:', error.message); process.exit(1); }
  if (!data.length) break;
  for (const r of data) dbNames.add(norm(r.name_ar));
  from += data.length;
  if (data.length < 1000) break;
}
const dups = [];
for (const d of dset) if (dbNames.has(norm(d.name_ar))) dups.push(d.name_ar);
if (dups.length) { err(`dups vs live DB (${dups.length}):`); for (const x of dups) console.error('   ', x); }
if (!dups.length) console.log('0 dups vs live DB');

// Count occupied regions per current proposal phase (informational fallback ratio).
const regionCounts = {};
for (const d of dset) regionCounts[d.region] = (regionCounts[d.region] || 0) + 1;

console.log('\n===== LEBANON PROPOSAL VALIDATION =====');
console.log('schema/lang/cal errors', errors);
console.log('proposal dishes      ', dset.length);
console.log('region distribution  ', JSON.stringify(regionCounts));
console.log('db names scanned     ', dbNames.size);
if (errors) process.exit(1);
console.log('VALIDATION PASSED');