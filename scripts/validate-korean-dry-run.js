// Korean 400-dish dry-run validator (READ-ONLY: performs no writes).
// Combines scripts/korean-200-proposal.json (base, region pan_korean)
//       + scripts/korean-expansion-200-proposal.json (expansion, regional tags)
// and validates the union against the live Supabase dishes table and against the
// isolation rules in src/utils/kitchenAuthenticity.ts.
//
// Usage: node scripts/validate-korean-dry-run.js
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

const base = JSON.parse(fs.readFileSync(path.join(HERE, 'korean-200-proposal.json'), 'utf8')).dishes;
const expansion = JSON.parse(fs.readFileSync(path.join(HERE, 'korean-expansion-200-proposal.json'), 'utf8')).dishes;
const combined = [...base, ...expansion];

console.log('base rows      :', base.length);
console.log('expansion rows :', expansion.length);
console.log('combined       :', combined.length);
if (combined.length !== 400) console.error(`!! expected 400 combined, got ${combined.length}`);

// ---- live DB snapshot ----------------------------------------------------
const liveNames = new Set();
const liveRegions = new Set();
let liveCount = 0;
{
  let from = 0;
  for (;;) {
    const { data, error } = await supabase.from('dishes').select('id,name_ar,region').order('id').range(from, from + 999);
    if (error) throw error;
    for (const r of data) {
      liveNames.add(r.name_ar);
      if (r.region) liveRegions.add(r.region);
    }
    liveCount += data.length;
    if (data.length < 1000) break;
    from += 1000;
  }
}
console.log('live dishes in DB:', liveCount);

// ---- integrity -----------------------------------------------------------
const TOKEN = 'كوري';
let withToken = 0, withoutToken = 0, doubledToken = 0;
let dupArabic = 0, dupEnglish = 0, liveCollisions = 0;
const arabicNames = new Set();
const englishNames = new Set();
const problems = [];

for (const d of combined) {
  const ar = d.name_ar;
  const en = d.name_en;
  const tokenCount = (ar.match(new RegExp(TOKEN, 'g')) || []).length;
  if (tokenCount === 0) { withoutToken++; problems.push('No token: ' + ar); }
  else if (tokenCount === 1) withToken++;
  else { doubledToken++; problems.push('Doubled token: ' + ar); }

  if (arabicNames.has(ar)) { dupArabic++; problems.push('Duplicate Arabic: ' + ar); }
  else arabicNames.add(ar);
  if (englishNames.has(en)) { dupEnglish++; problems.push('Duplicate English: ' + en); }
  else englishNames.add(en);

  if (liveNames.has(ar)) { liveCollisions++; problems.push('Live collision: ' + ar); }

  for (const k of ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de']) {
    if (!d[k] || !String(d[k]).trim()) problems.push('Empty ' + k + ': ' + ar);
  }

  const expected = Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat);
  if (d.cal_100 !== expected) problems.push(`Atwater mismatch: ${en} (cal_100=${d.cal_100}, expected=${expected})`);
}

// ---- halal (strict: no pork, no alcohol) ---------------------------------
const PORK = /\b(pork|bacon|ham|prosciutto|chorizo|salami|pepperoni|lard|gelatin|tonkotsu|chashu|buta|jambon|schweine|cerdo|porc|خنزير)\b/i;
const AMBIG = /\b(sausage|blood sausage|offal|intestines)\b/i;
const HALAL_OK = /\b(beef|cattle|chicken|poultry|turkey|lamb|fish|salmon|crab|shrimp|prawn|tofu|mushroom|vegetable|plant|beet)\b/i;
const ALCOHOL = /\b(soju|makgeolli|beer|wine|vodka|whisky|whiskey|sake|brandy|rum|liqueur|alcohol|champagne|mirin|rice wine|cocktail|alcool|cerveza|vino|bier|wein|막걸리|소주)\b/i;
const ALCOHOL_AR = /(?:^|\s)(?:كحول|نبيذ|الكحول)(?:$|\s)/;
for (const d of combined) {
  for (const f of ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de']) {
    const v = String(d[f]);
    if (PORK.test(v)) problems.push('PORK in ' + f + ': ' + v);
    if (AMBIG.test(v) && !HALAL_OK.test(v)) problems.push('UNQUALIFIED PROTEIN in ' + f + ': ' + v);
    if (ALCOHOL.test(v)) problems.push('ALCOHOL in ' + f + ': ' + v);
  }
  if (d.name_ar.includes('خنزير')) problems.push('PORK (ar): ' + d.name_ar);
  if (d.name_ar.includes('소주') || d.name_ar.includes('막걸리')) problems.push('ALCOHOL (hangul): ' + d.name_ar);
  if (ALCOHOL_AR.test(d.name_ar)) problems.push('ALCOHOL (ar): ' + d.name_ar);
}

console.log('\n-- Integrity --');
console.log('rows with ' + TOKEN + ' token  :', withToken, '/', combined.length);
console.log('rows without token        :', withoutToken);
console.log('doubled token             :', doubledToken);
console.log('duplicate Arabic names    :', dupArabic);
console.log('duplicate English names   :', dupEnglish);
console.log('collisions with live DB   :', liveCollisions);

// ---- distributions -------------------------------------------------------
const catDist = {}, regionDist = {}, mealDist = {};
for (const d of combined) {
  catDist[d.category] = (catDist[d.category] || 0) + 1;
  regionDist[d.region] = (regionDist[d.region] || 0) + 1;
  mealDist[d.mealType] = (mealDist[d.mealType] || 0) + 1;
}
console.log('\n-- Distribution --');
console.log('category  :', JSON.stringify(catDist));
console.log('region    :', JSON.stringify(regionDist));
console.log('mealType  :', JSON.stringify(mealDist));

// ---- isolation / region vocabulary --------------------------------------
const KITCHEN_FAMILY = new Set(['pan_korean', 'asian_shared', 'seoul', 'busan', 'jeju', 'jeonju', 'andong', 'goryeong', 'gangneung', 'incheon', 'daegu', 'gwangju', 'daejeon', 'ulsan', 'suwon', 'chuncheon', 'mokpo', 'yeosu', 'pohang', 'gyeongju', 'tongyeong', 'sunchang', 'boseong', 'namhae']);
const outsideFamily = [...new Set(combined.filter(d => !KITCHEN_FAMILY.has(d.region)).map(d => d.region))];
if (outsideFamily.length) problems.push('Region outside Korean family: ' + outsideFamily.join(', '));

const notLive = Object.keys(regionDist).filter(r => !liveRegions.has(r));
console.log('\nregions not yet live       :', notLive.join(', ') || '(none)');
console.log('regions outside family     :', outsideFamily.join(', ') || '(none)');

console.log('\n-- Problems --');
if (problems.length === 0) console.log('none');
else problems.forEach(p => console.log('  ' + p));

console.log('\nNo writes were performed. Awaiting explicit approval before migration.');
