// Token collision scan for the Germany kitchen. Run BEFORE wiring the 13 German
// demonyms into kitchenAuthenticity.ts to prove no existing dish resolves to a
// German region, and AFTER migration to prove exactly 350 rows do.
//
//   node scripts/check-germany-token-collisions.mjs            # post-migration (default --expect=350)
//   node scripts/check-germany-token-collisions.mjs --expect=0 # pre-migration baseline
//
// Germany differs from the UK: all 13 regions own a distinct demonym, so a single
// "pan_british" bucket is replaced by a per-region breakdown.
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
  (process.argv.find((a) => a.startsWith('--expect=')) || '--expect=350').split('=')[1]
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

// Stored normalized bare forms, one per region. The article is stripped before
// matching because a hand-authored name may or may not carry it.
const REGION_TOKEN = {
  pan_german: 'الماني',
  bavaria: 'بافاري',
  berlin: 'برليني',
  hamburg: 'هامبورغي',
  hesse: 'هيسي',
  rhineland: 'راينلاندي',
  saxony: 'ساكسوني',
  thuringia: 'تورينغي',
  brandenburg: 'براندنبورغي',
  lower_saxony: 'هانزياتي',
  baden_wurttemberg: 'شوابي',
  saarland: 'سارلاندي',
  bremen: 'بريميني',
};
const GERMAN_REGIONS = new Set(Object.keys(REGION_TOKEN));
// Feminine / orthographic variants of the same demonym.
const ALL_TOKENS = new Set(Object.values(REGION_TOKEN).flatMap((t) => [t, `${t}ه`]));
const TOKEN_ROOTS = Object.values(REGION_TOKEN);
const tokenOf = (word) => ALL_TOKENS.has(word);

const rows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase.from('dishes').select('id,name_ar,region').order('id').range(from, from + 999);
  if (error) throw error;
  rows.push(...data);
  if (data.length < 1000) break;
}
console.log('total live rows:', rows.length);

const hits = [];
for (const r of rows) {
  const words = norm(r.name_ar).split(/\s+/).map((t) => t.replace(/^ال/, ''));
  const toks = words.filter(tokenOf);
  if (toks.length) hits.push({ ...r, tokens: toks });
}

const byRegion = {};
for (const h of hits) byRegion[h.region ?? '(null)'] = (byRegion[h.region ?? '(null)'] || 0) + 1;
console.log('rows whose demonym resolves to a German region:', hits.length);
console.log('by region:', JSON.stringify(byRegion));

// A row is a collision when it carries a German demonym but is not tagged with
// the region that owns that demonym.
const mismatched = hits.filter((h) => {
  const owners = h.tokens.map((t) => Object.entries(REGION_TOKEN).find(([, v]) => v === t)?.[0]);
  return !owners.includes(h.region);
});
console.log('\nCOLLISIONS (German demonym but a different/no region):', mismatched.length);
for (const f of mismatched) console.log(`  id=${f.id} region=${f.region} tokens=${f.tokens.join(',')} "${f.name_ar}"`);

const substring = rows.filter((r) => {
  const words = norm(r.name_ar).split(/\s+/).map((t) => t.replace(/^ال/, ''));
  return words.some((t) => TOKEN_ROOTS.some((token) => t.includes(token) && !tokenOf(t)));
});
const notToken = substring.filter((r) => !hits.includes(r));
console.log('\nsubstring matches that are NOT whole-word tokens (do not resolve):', notToken.length);
for (const r of notToken.slice(0, 20)) console.log(`  id=${r.id} region=${r.region} "${r.name_ar}"`);

const foreign = rows.filter((r) => GERMAN_REGIONS.has(r.region) && !hits.includes(r));
console.log('\nGerman-region rows with no German demonym:', foreign.length);
for (const r of foreign.slice(0, 20)) console.log(`  id=${r.id} region=${r.region} "${r.name_ar}"`);

const fails = [];
if (mismatched.length !== 0) fails.push(`${mismatched.length} row(s) carry a German demonym but the wrong region`);
if (notToken.length !== 0) fails.push(`${notToken.length} substring-only match(es) - token not a whole word`);
if (foreign.length !== 0) fails.push(`${foreign.length} German-region row(s) without a German demonym`);
if (hits.length !== EXPECT) fails.push(`expected ${EXPECT} German rows, found ${hits.length}`);

if (fails.length === 0) {
  console.log(`\nOK: ${hits.length} rows resolve to a German region, exactly the expected ${EXPECT}.`);
  console.log('OK: no collisions, no foreign rows, no substring-only matches.');
} else {
  console.log('\nFAIL:');
  for (const f of fails) console.log(`  - ${f}`);
  process.exitCode = 1;
}