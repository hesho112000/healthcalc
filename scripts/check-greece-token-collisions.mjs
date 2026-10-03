// Read-only Greece demonym collision scan; use --expect=0 before migration.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const URL = process.env.SUPABASE_URL;
const KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error('Missing Supabase credentials');
const supabase = createClient(URL, KEY, { auth: { persistSession: false } });
const EXPECT = Number((process.argv.find((a) => a.startsWith('--expect=')) ?? '--expect=150').split('=')[1]);
if (!Number.isFinite(EXPECT)) throw new Error('Invalid --expect value');
const REGION_TOKEN = {
  pan_greek: 'يوناني', athens: 'اثيني', thessaloniki: 'سالونيكي', crete: 'كريتي',
  santorini: 'سانتوريني', mykonos: 'ميكوني', corfu: 'كورفي', rhodes: 'رودسي',
  peloponnese: 'بيلوبونيزي', epirus: 'ابيري', macedonia_gr: 'مقدوني_يوناني',
};
const REGIONS = new Set(Object.keys(REGION_TOKEN));
const norm = (s) => (s ?? '').replace(/[ً-ْٰ]/g, '').replace(/ـ/g, '').replace(/[أإآ]/g, 'ا')
  .replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/\s+/g, ' ').trim();
const TOKENS = new Set(Object.values(REGION_TOKEN));
const rows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase.from('dishes').select('id,name_ar,region').order('id').range(from, from + 999);
  if (error) throw error;
  rows.push(...data);
  if (data.length < 1000) break;
}
const wordsOf = (name) => norm(name).split(/\s+/).map((w) => w.replace(/^ال/, ''));
const hits = rows.map((r) => ({ ...r, tokens: wordsOf(r.name_ar).filter((w) => TOKENS.has(w)) })).filter((r) => r.tokens.length);
const mismatch = hits.filter((r) => r.tokens.length !== 1 || !r.tokens.includes(REGION_TOKEN[r.region]));
const foreign = hits.filter((r) => !REGIONS.has(r.region));
const substringOnly = rows.filter((r) => {
  if (hits.some((h) => h.id === r.id)) return false;
  return wordsOf(r.name_ar).some((w) => [...TOKENS].some((t) => w.includes(t)));
});
const byRegion = {};
for (const r of hits) byRegion[r.region ?? '(null)'] = (byRegion[r.region ?? '(null)'] ?? 0) + 1;
console.log(`live rows: ${rows.length}`);
console.log(`Greece demonym rows: ${hits.length} (expected ${EXPECT})`);
console.log(`by region: ${JSON.stringify(byRegion)}`);
console.log(`wrong-region/multiple-token rows: ${mismatch.length}`);
console.log(`rows on non-Greece regions: ${foreign.length}`);
console.log(`substring-only matches: ${substringOnly.length}`);
for (const r of [...mismatch, ...foreign, ...substringOnly].slice(0, 50)) console.log(`  id=${r.id} region=${r.region} tokens=${(r.tokens ?? []).join(',')} "${r.name_ar}"`);
const failures = [];
if (hits.length !== EXPECT) failures.push(`expected ${EXPECT} Greece demonym rows, found ${hits.length}`);
if (mismatch.length) failures.push(`${mismatch.length} row(s) have mismatched/repeated demonyms`);
if (foreign.length) failures.push(`${foreign.length} row(s) resolve to Greece on another region`);
if (substringOnly.length) failures.push(`${substringOnly.length} substring-only matches`);
if (failures.length) {
  console.error('FAIL:');
  for (const f of failures) console.error(`  - ${f}`);
  process.exitCode = 1;
} else console.log(`OK: exactly ${EXPECT} Greece rows; no demonym collisions.`);
