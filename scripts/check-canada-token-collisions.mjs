// Token collision scan for the Canada kitchen. Run BEFORE wiring the كندي /
// كندية tokens into kitchenAuthenticity.ts to prove no existing dish resolves
// to pan_canadian, and AFTER migration to prove exactly 200 rows do.
//
//   node scripts/check-canada-token-collisions.mjs            # post-migration (default --expect=200)
//   node scripts/check-canada-token-collisions.mjs --expect=0 # pre-migration baseline
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
  (process.argv.find((a) => a.startsWith('--expect=')) || '--expect=200').split('=')[1]
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

// The tokens this migration registers -> pan_canadian. Stored normalized.
const CANADA_TOKENS = new Set(['كندي', 'كنديه']);
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
  return n.split(/\s+/).some((t) => CANADA_TOKENS.has(t.replace(/^ال/, '')));
});

const byRegion = {};
for (const h of hits) byRegion[h.region ?? '(null)'] = (byRegion[h.region ?? '(null)'] || 0) + 1;
console.log('rows whose nationality resolves to pan_canadian:', hits.length);
console.log('by region:', JSON.stringify(byRegion, null, 0));

const CANADA_REGIONS = new Set([
  'pan_canadian', 'quebec', 'ontario', 'british_columbia', 'prairies',
  'atlantic_canada', 'northern_canada', 'indigenous_canada',
]);
const foreign = hits.filter((h) => !CANADA_REGIONS.has(h.region));
console.log('\nCOLLISIONS (resolve to pan_canadian but not a Canada-region row):', foreign.length);
for (const f of foreign) console.log(`  id=${f.id} region=${f.region} "${f.name_ar}"`);

const substring = rows.filter((r) => (r.name_ar ?? '').includes('كندي') || (r.name_ar ?? '').includes('كنديه'));
const notToken = substring.filter((r) => !hits.includes(r));
console.log('\nsubstring matches that are NOT whole-word tokens (do not resolve):', notToken.length);
for (const r of notToken.slice(0, 20)) console.log(`  id=${r.id} region=${r.region} "${r.name_ar}"`);

const fails = [];
if (foreign.length !== 0) fails.push(`${foreign.length} foreign row(s) resolve to pan_canadian`);
if (notToken.length !== 0) fails.push(`${notToken.length} substring-only match(es) - token not a whole word`);
if (hits.length !== EXPECT) fails.push(`expected ${EXPECT} pan_canadian rows, found ${hits.length}`);

if (fails.length === 0) {
  console.log(`\nOK: ${hits.length} rows resolve to pan_canadian, exactly the expected ${EXPECT}.`);
  console.log('OK: no collisions, no foreign rows, no substring-only matches.');
} else {
  console.log('\nFAIL:');
  for (const f of fails) console.log(`  - ${f}`);
  process.exitCode = 1;
}