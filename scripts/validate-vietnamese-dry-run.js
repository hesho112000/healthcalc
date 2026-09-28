// Vietnamese 300-dish dry-run validator (read-only).
// Combines scripts/vietnamese-100-proposal.json (base) + scripts/vietnamese-200-proposal.json (expansion)
// and validates against the live Supabase dishes table.
// READ-ONLY: performs no writes.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or (asia_migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const base = JSON.parse(fs.readFileSync(path.join(HERE, 'vietnamese-100-proposal.json'), 'utf8'));
const expansion = JSON.parse(fs.readFileSync(path.join(HERE, 'vietnamese-200-proposal.json'), 'utf8'));

const baseRows = base.dishes;
const expansionRows = expansion.dishes;
const combined = [...baseRows, ...expansionRows];

console.log('base rows      :', baseRows.length);
console.log('expansion rows :', expansionRows.length);
console.log('combined       :', combined.length);

// Fetch live dish names for collision check
const liveNames = new Set();
let liveCount = 0;
{
  let from = 0;
  for (;;) {
    const { data, error } = await supabase.from('dishes').select('name_ar').order('id').range(from, from + 999);
    if (error) throw error;
    for (const r of data) liveNames.add(r.name_ar);
    liveCount += data.length;
    if (data.length < 1000) break;
    from += 1000;
  }
}
console.log('live dishes in DB:', liveCount);

// Integrity checks
const TOKEN = 'فيتنامي';
let withToken = 0;
let withoutToken = 0;
let doubledToken = 0;
const arabicNames = new Set();
const englishNames = new Set();
let dupArabic = 0;
let dupEnglish = 0;
let liveCollisions = 0;
const problems = [];

for (const d of combined) {
  const ar = d.name_ar;
  const en = d.name_en;

  // Token check
  const tokenCount = (ar.match(new RegExp(TOKEN, 'g')) || []).length;
  if (tokenCount === 0) {
    withoutToken++;
    problems.push('No token: ' + ar);
  } else if (tokenCount === 1) {
    withToken++;
  } else {
    doubledToken++;
    problems.push('Doubled token: ' + ar);
  }

  // Duplicate check
  if (arabicNames.has(ar)) {
    dupArabic++;
    problems.push('Duplicate Arabic: ' + ar);
  } else {
    arabicNames.add(ar);
  }
  if (englishNames.has(en)) {
    dupEnglish++;
    problems.push('Duplicate English: ' + en);
  } else {
    englishNames.add(en);
  }

  // Live collision
  if (liveNames.has(ar)) {
    liveCollisions++;
    problems.push('Live collision: ' + ar);
  }

  // Language completeness
  for (const k of ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de']) {
    if (!d[k] || !String(d[k]).trim()) {
      problems.push('Empty ' + k + ': ' + ar);
    }
  }

  // Atwater consistency
  const expected = Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat);
  if (d.cal_100 !== expected) {
    problems.push('Atwater mismatch: ' + en + ' (cal_100=' + d.cal_100 + ', expected=' + expected + ')');
  }

  // Halal: no pork/alcohol in English name
  const PORK = /\b(pork|bacon|ham|prosciutto|chorizo|salami|pepperoni|lard|gelatin)\b/i;
  const ALCOHOL = /\b(beer|wine|vodka|rum|whiskey|whisky|brandy|champagne|sake|mirin|rice wine|alcohol|liqueur|cocktail)\b/i;
  if (PORK.test(en)) problems.push('PORK: ' + en);
  if (ALCOHOL.test(en)) problems.push('ALCOHOL: ' + en);
}

console.log('');
console.log('-- Integrity --');
console.log('rows with ' + TOKEN + ' token :', withToken + ' / ' + combined.length);
console.log('rows without token       :', withoutToken);
console.log('doubled token            :', doubledToken);
console.log('duplicate Arabic names   :', dupArabic);
console.log('duplicate English names  :', dupEnglish);
console.log('collisions with live DB  :', liveCollisions);

// Distribution
const catDist = {};
const regionDist = {};
const mealDist = {};
for (const d of combined) {
  catDist[d.category] = (catDist[d.category] || 0) + 1;
  regionDist[d.region] = (regionDist[d.region] || 0) + 1;
  mealDist[d.mealType] = (mealDist[d.mealType] || 0) + 1;
}
console.log('');
console.log('-- Distribution --');
console.log('category  :', JSON.stringify(catDist));
console.log('region    :', JSON.stringify(regionDist));
console.log('mealType  :', JSON.stringify(mealDist));

// Vocabulary vs live DB
const liveRegions = new Set();
{
  const { data } = await supabase.from('dishes').select('region').not('region', 'is', null);
  for (const r of data) liveRegions.add(r.region);
}
const notLive = Object.keys(regionDist).filter(r => !liveRegions.has(r));
console.log('');
console.log('regions not yet live    :', notLive.join(', ') || '(none)');

console.log('');
console.log('-- Problems --');
if (problems.length === 0) {
  console.log('none');
} else {
  problems.forEach(p => console.log('  ' + p));
}

console.log('');
console.log('No writes were performed. Awaiting explicit approval before migration.');
