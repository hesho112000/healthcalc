// Token collision scan for the USA kitchen. Run BEFORE wiring the أمريكي /
// امريكيه tokens into kitchenAuthenticity.ts to prove no existing dish resolves
// to pan_american, and AFTER migration to prove exactly 500 rows do.
//
//   node scripts/check-usa-token-collisions.mjs            # post-migration (default --expect=500)
//   node scripts/check-usa-token-collisions.mjs --expect=0 # pre-migration baseline
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const EXPECT = Number(
  (process.argv.find((a) => a.startsWith('--expect=')) || '--expect=500').split('=')[1]
);
if (!Number.isFinite(EXPECT)) throw new Error(`bad --expect value in ${process.argv.join(' ')}`);

// Normalization mirrors normalizeArabicName() in kitchenAuthenticity.ts.
function norm(s) {
  return (s ?? '')
    .replace(/[\u064B-\u0652\u0670]/g, '')
    .replace(/\u0640/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim();
}

// The tokens this migration registers -> pan_american. Stored normalized.
const USA_TOKENS = new Set(['امريكي', 'امريكيه']);
const COLLISION_GUARDS = [];
function applyGuards(s) {
  let n = s;
  for (const re of COLLISION_GUARDS) if (re.test(n)) n = n.replace(re, '');
  return n;
}

const rows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase.from('dishes').select('id,name_ar,region').order('id').range(from, from + 999);
  if (error) throw error;
  rows.push(...data);
  if (data.length < 1000) break;
}
console.log('total live rows:', rows.length);

const hits = rows.filter((r) => {
  const n = applyGuards(norm(r.name_ar));
  return n.split(/\s+/).some((t) => USA_TOKENS.has(t.replace(/^ال/, '')));
});

const byRegion = {};
for (const h of hits) byRegion[h.region ?? '(null)'] = (byRegion[h.region ?? '(null)'] || 0) + 1;
console.log('rows whose nationality resolves to pan_american:', hits.length);
console.log('by region:', JSON.stringify(byRegion, null, 0));

const USA_REGIONS = new Set([
  'pan_american', 'new_england', 'mid_atlantic', 'south', 'deep_south', 'cajun',
  'texas', 'southwest', 'california', 'pacific_northwest', 'midwest', 'hawaii',
  'alaska', 'soul_food', 'bbq', 'native_american',
]);
const foreign = hits.filter((h) => !USA_REGIONS.has(h.region));
console.log('\nCOLLISIONS (resolve to pan_american but not a USA-region row):', foreign.length);
for (const f of foreign) console.log(`  id=${f.id} region=${f.region} "${f.name_ar}"`);

const substring = rows.filter((r) => (r.name_ar ?? '').includes('امريكي') || (r.name_ar ?? '').includes('امريكيه'));
const notToken = substring.filter((r) => !hits.includes(r));
console.log('\nsubstring matches that are NOT whole-word tokens (do not resolve):', notToken.length);
for (const r of notToken.slice(0, 20)) console.log(`  id=${r.id} region=${r.region} "${r.name_ar}"`);

const fails = [];
if (foreign.length !== 0) fails.push(`${foreign.length} foreign row(s) resolve to pan_american`);
if (notToken.length !== 0) fails.push(`${notToken.length} substring-only match(es) - token not a whole word`);
if (hits.length !== EXPECT) fails.push(`expected ${EXPECT} pan_american rows, found ${hits.length}`);

if (fails.length === 0) {
  console.log(`\nOK: ${hits.length} rows resolve to pan_american, exactly the expected ${EXPECT}.`);
  console.log('OK: no collisions, no foreign rows, no substring-only matches.');
} else {
  console.log('\nFAIL:');
  for (const f of fails) console.log(`  - ${f}`);
  process.exitCode = 1;
}
