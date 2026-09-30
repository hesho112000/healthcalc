// Read-only union check of the Canada base + expansion proposals. Emits nothing.
// Mirrors scripts/validate-usa-dry-run.js.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { scan } = require('./canada-halal-scan.cjs');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const base = JSON.parse(fs.readFileSync('scripts/canada-100-proposal.json', 'utf8')).dishes;
const exp = JSON.parse(fs.readFileSync('scripts/canada-expansion-100-proposal.json', 'utf8')).dishes;
const all = [...base, ...exp];

const errors = [];
const REGIONS = new Set([
  'pan_canadian', 'quebec', 'ontario', 'british_columbia', 'prairies',
  'atlantic_canada', 'northern_canada', 'indigenous_canada',
]);
const SOURCE_PREFIX = 'americas-canada-2026';

console.log('base rows      :', base.length);
console.log('expansion rows :', exp.length);
console.log('TOTAL          :', all.length);
if (all.length !== 200) errors.push(`expected 200 rows, got ${all.length}`);

const seenIds = new Set();
const seenAr = new Set();
for (const r of all) {
  if (seenIds.has(r.id)) errors.push(`duplicate id: ${r.id}`);
  seenIds.add(r.id);
  const ar = (r.name_ar ?? '').replace(/\s+/g, ' ').trim();
  if (seenAr.has(ar)) errors.push(`duplicate Arabic name: ${ar}`);
  seenAr.add(ar);
  const toks = (r.name_ar ?? '').split(/\s+/).filter((t) => t.includes('كندي'));
  if (toks.length !== 1) errors.push(`${r.id}: expected exactly 1 كندي token, found ${toks.length}`);
  const expect = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  if (r.cal_100 !== expect) errors.push(`${r.id}: Atwater drift cal=${r.cal_100} expected ${expect}`);
  if (!REGIONS.has(r.region)) errors.push(`${r.id}: bad region "${r.region}"`);
  if (!Array.isArray(r.diaspora_priority) || r.diaspora_priority.length < 3) {
    errors.push(`${r.id}: diaspora_priority missing or too short`);
  }
}

const byRegion = {};
for (const r of all) byRegion[r.region] = (byRegion[r.region] || 0) + 1;
const regionCount = Object.keys(byRegion).length;
console.log('regions used   :', regionCount, 'of 8 (7 anchors + pan_canadian)');
console.log('by region      :', JSON.stringify(byRegion));
if (regionCount !== 8) errors.push(`expected 8 regions, found ${regionCount}`);

const halal = scan(all);
console.log('halal issues   :', halal.length);
for (const p of halal) errors.push(`HALAL [${p.kind}] "${p.term}" -> ${p.nameAr} | ${p.nameEn}`);

// ---- live DB checks ----
const live = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase.from('dishes').select('name_ar,region,source').order('id').range(from, from + 999);
  if (error) throw error;
  live.push(...data);
  if (data.length < 1000) break;
}
console.log('live DB rows   :', live.length);

const foreign = live.filter((r) => !(r.source ?? '').startsWith(SOURCE_PREFIX));
const liveAr = new Set(foreign.map((r) => (r.name_ar || '').replace(/\s+/g, ' ').trim()));
const clash = all.filter((r) => liveAr.has((r.name_ar || '').replace(/\s+/g, ' ').trim()));
console.log('non-Canada live rows:', foreign.length);
console.log('live name clashes:', clash.length);
for (const c of clash) errors.push(`LIVE CLASH: ${c.name_ar}`);

const preCa = foreign.filter((r) => REGIONS.has(r.region));
console.log('foreign live rows on a Canada region:', preCa.length);
for (const p of preCa) errors.push(`PRE-EXISTING CANADA ROW: ${p.name_ar} (${p.region})`);

if (errors.length) {
  console.log(`\nDRY RUN FAILED with ${errors.length} error(s):`);
  for (const e of errors.slice(0, 50)) console.log('  -', e);
  process.exit(1);
}
console.log('\n*** DRY RUN CLEAN - 200 rows validated ***');