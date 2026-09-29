// PRE-FLIGHT / POST-WIRING guard for the Taiwan nationality token.
// Scans every live dish name for the tokens that will be registered in
// TOKEN_REGIONS (تايوان, تايواني) and reports which rows would resolve to
// pan_taiwanese. Any row that resolves to pan_taiwanese but is NOT tagged with a
// Taiwanese region is a COLLISION: hasForeignNationalityFor() would make that
// kitchen REJECT one of its own dishes.
//
// Usage: node scripts/check-taiwan-token-collisions.mjs
//   (run BEFORE authoring to find pre-existing collisions, and AFTER wiring to
//    prove exactly 300 rows resolve and 0 collisions remain)
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing SUPABASE_URL or (asia_migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

// Mirrors normalizeArabicName in src/utils/kitchenAuthenticity.ts.
function norm(s) {
  return (s ?? '')
    .replace(/[\u064B-\u0652\u0670]/g, '')
    .replace(/\u0640/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim();
}

// The tokens this migration registers -> pan_taiwanese.
// Entries are stored in NORMALIZED form (ة -> ه) so they match after norm():
// تايوانية normalizes to تايوانيه, so the feminine alias is registered as-is.
const TAIWAN_TOKENS = new Set(['تايوان', 'تايواني', 'تايوانيه']);
// Any guard regex added to kitchenAuthenticity.ts must be mirrored here.
const COLLISION_GUARDS = [];
function applyGuards(s) {
  let n = s;
  for (const re of COLLISION_GUARDS) if (re.test(n)) n = n.replace(re, '');
  return n;
}

const rows = [];
let from = 0;
for (;;) {
  const { data, error } = await supabase.from('dishes').select('id,name_ar,region').order('id').range(from, from + 999);
  if (error) throw error;
  rows.push(...data);
  if (data.length < 1000) break;
  from += 1000;
}
console.log('total live rows:', rows.length);

// Resolve exactly like nationalityRegion(): first mappable token wins.
const hits = rows.filter((r) => {
  const n = applyGuards(norm(r.name_ar));
  return n.split(/\s+/).some((t) => TAIWAN_TOKENS.has(t.replace(/^ال/, '')));
});

const byRegion = {};
for (const h of hits) byRegion[h.region ?? '(null)'] = (byRegion[h.region ?? '(null)'] || 0) + 1;
console.log('rows whose nationality resolves to pan_taiwanese:', hits.length);
console.log('by region:', JSON.stringify(byRegion, null, 0));

const TAIWAN_REGIONS = new Set([
  'pan_taiwanese', 'asian_shared', 'taipei', 'tainan', 'taichung', 'kaohsiung',
  'hsinchu', 'hualien', 'taitung', 'keelung', 'chiayi', 'nantou', 'yilan', 'pingtung',
]);
const foreign = hits.filter((h) => !TAIWAN_REGIONS.has(h.region));
console.log('\nCOLLISIONS (resolve to pan_taiwanese but not a Taiwan-region row):', foreign.length);
for (const f of foreign) console.log(`  id=${f.id} region=${f.region} "${f.name_ar}"`);

// Substring sanity check: any name merely CONTAINING the letters without the
// token as a whole word is reported too (these do NOT resolve, but are worth eyeballing).
const substring = rows.filter((r) => (r.name_ar ?? '').includes('تايوان') || (r.name_ar ?? '').includes('تايواني'));
const notToken = substring.filter((r) => !hits.includes(r));
console.log('\nsubstring matches that are NOT whole-word tokens (do not resolve):', notToken.length);
for (const r of notToken.slice(0, 20)) console.log(`  id=${r.id} region=${r.region} "${r.name_ar}"`);

// Expected number of rows resolving to pan_taiwanese. Defaults to the finished
// migration (300); pass --expect=0 for a pre-migration baseline scan.
const EXPECT = Number(
  (process.argv.find((a) => a.startsWith('--expect=')) || '--expect=300').split('=')[1]
);
if (!Number.isFinite(EXPECT)) throw new Error(`bad --expect value in ${process.argv.join(' ')}`);

const fails = [];
if (foreign.length !== 0) fails.push(`${foreign.length} foreign row(s) resolve to pan_taiwanese`);
if (notToken.length !== 0) fails.push(`${notToken.length} substring-only match(es) - token not a whole word`);
if (hits.length !== EXPECT) fails.push(`expected ${EXPECT} pan_taiwanese rows, found ${hits.length}`);

if (fails.length === 0) {
  console.log(`\nOK: ${hits.length} rows resolve to pan_taiwanese, exactly the expected ${EXPECT}.`);
  console.log('OK: no collisions, no foreign rows, no substring-only matches.');
} else {
  console.log('\nFAIL:');
  for (const f of fails) console.log(`  - ${f}`);
  process.exitCode = 1;
}
