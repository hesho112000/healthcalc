// Token collision scan for the UK kitchen. Run BEFORE wiring the British /
// Scottish / Welsh / Irish nationality tokens into kitchenAuthenticity.ts to prove no existing
// dish resolves to pan_british, and AFTER migration to prove exactly 400 rows do.
//
//   node scripts/check-uk-token-collisions.mjs            # post-migration (default --expect=400)
//   node scripts/check-uk-token-collisions.mjs --expect=0 # pre-migration baseline
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
  (process.argv.find((a) => a.startsWith('--expect=')) || '--expect=400').split('=')[1]
);
if (!Number.isFinite(EXPECT)) throw new Error(`bad --expect value in ${process.argv.join(' ')}`);

// Normalization mirrors normalizeArabicName() in src/utils/kitchenAuthenticity.ts.
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

// Stored normalized: masculine/feminine British, Scottish, Welsh and Irish forms.
const UK_TOKENS = new Set([
  'بريطاني', 'بريطانيه',
  'اسكتلندي', 'اسكتلنديه',
  'ويلزي', 'ويلزيه',
  'ايرلندي', 'ايرلنديه',
]);
// 'البريطاني问题是...' is a whole word, but a name like 'البريطانيةcca' would only
// substring-match. Those must not resolve, so we track them separately below.
const TOKEN_ROOTS = ['بريطاني', 'اسكتلندي', 'ويلزي', 'ايرلندي'];

const rows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase.from('dishes').select('id,name_ar,region').order('id').range(from, from + 999);
  if (error) throw error;
  rows.push(...data);
  if (data.length < 1000) break;
}
console.log('total live rows:', rows.length);

const hits = rows.filter((r) => {
  const n = norm(r.name_ar);
  return n.split(/\s+/).some((t) => UK_TOKENS.has(t.replace(/^ال/, '')));
});

const byRegion = {};
for (const h of hits) byRegion[h.region ?? '(null)'] = (byRegion[h.region ?? '(null)'] || 0) + 1;
console.log('rows whose nationality resolves to pan_british:', hits.length);
console.log('by region:', JSON.stringify(byRegion, null, 0));

const UK_REGIONS = new Set([
  'pan_british', 'london', 'south_east', 'south_west', 'east_anglia', 'midlands',
  'north_west', 'yorkshire', 'north_east', 'lowlands', 'highlands', 'wales', 'ulster',
]);
const foreign = hits.filter((h) => !UK_REGIONS.has(h.region));
console.log('\nCOLLISIONS (resolve to pan_british but not a UK-region row):', foreign.length);
for (const f of foreign) console.log(`  id=${f.id} region=${f.region} "${f.name_ar}"`);

const substring = rows.filter((r) => {
  const words = norm(r.name_ar).split(/\s+/).map((t) => t.replace(/^ال/, ''));
  return words.some((t) => TOKEN_ROOTS.some((token) => t.includes(token) && !UK_TOKENS.has(t)));
});
const notToken = substring.filter((r) => !hits.includes(r));
console.log('\nsubstring matches that are NOT whole-word tokens (do not resolve):', notToken.length);
for (const r of notToken.slice(0, 20)) console.log(`  id=${r.id} region=${r.region} "${r.name_ar}"`);

const fails = [];
if (foreign.length !== 0) fails.push(`${foreign.length} foreign row(s) resolve to pan_british`);
if (notToken.length !== 0) fails.push(`${notToken.length} substring-only match(es) - token not a whole word`);
if (hits.length !== EXPECT) fails.push(`expected ${EXPECT} pan_british rows, found ${hits.length}`);

if (fails.length === 0) {
  console.log(`\nOK: ${hits.length} rows resolve to pan_british, exactly the expected ${EXPECT}.`);
  console.log('OK: no collisions, no foreign rows, no substring-only matches.');
} else {
  console.log('\nFAIL:');
  for (const f of fails) console.log(`  - ${f}`);
  process.exitCode = 1;
}