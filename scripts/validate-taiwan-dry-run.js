// Read-only combined validation of the full Taiwan 300 before any DB write.
// Checks the union of base + expansion, then confirms against the LIVE DB.
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { scan } = require('./taiwan-halal-scan.cjs');

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const base = JSON.parse(readFileSync('scripts/taiwan-150-proposal.json', 'utf8')).dishes;
const exp = JSON.parse(readFileSync('scripts/taiwan-expansion-150-proposal.json', 'utf8')).dishes;
const all = [...base, ...exp];

const errors = [];
const REGIONS = new Set([
  'pan_taiwanese', 'taipei', 'tainan', 'taichung', 'kaohsiung', 'hsinchu',
  'hualien', 'taitung', 'keelung', 'chiayi', 'nantou', 'yilan', 'pingtung',
]);

console.log('base rows      :', base.length);
console.log('expansion rows :', exp.length);
console.log('TOTAL          :', all.length);
if (all.length !== 300) errors.push(`expected 300, got ${all.length}`);

// id uniqueness
const ids = new Set();
for (const r of all) {
  if (ids.has(r.id)) errors.push(`duplicate id ${r.id}`);
  ids.add(r.id);
}
// arabic uniqueness
const ar = new Map();
for (const r of all) {
  const k = r.name_ar.replace(/\s+/g, ' ').trim();
  if (ar.has(k)) errors.push(`duplicate Arabic "${k}" (${ar.get(k)} vs ${r.id})`);
  ar.set(k, r.id);
}
// token exactly once
let tokBad = 0;
for (const r of all) {
  const n = (r.name_ar.match(/تايوان/g) || []).length;
  if (n !== 1) { errors.push(`token count ${n} in ${r.name_ar}`); tokBad++; }
}
console.log('rows with exactly one تايوان token:', all.length - tokBad, '/', all.length);

// Atwater re-derivation across all 300
const drift = all.filter((r) => r.cal_100 !== Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat));
console.log('Atwater drift  :', drift.length);
if (drift.length) errors.push(`${drift.length} Atwater drift row(s)`);

// region legality + asian_shared
const byRegion = {};
for (const r of all) {
  byRegion[r.region] = (byRegion[r.region] || 0) + 1;
  if (!REGIONS.has(r.region)) errors.push(`illegal region ${r.region} in ${r.id}`);
}
console.log('asian_shared   :', byRegion.asian_shared || 0);
if (byRegion.asian_shared) errors.push('asian_shared must be 0');
console.log('regions used   :', Object.keys(byRegion).length, 'of 13 (12 anchors + pan_taiwanese)');
console.log('by region      :', JSON.stringify(byRegion));

// halal
const halal = scan(all);
console.log('halal issues   :', halal.length);
for (const p of halal) errors.push(`HALAL [${p.kind}] "${p.term}" -> ${p.nameAr}`);

// live DB
const url = process.env.SUPABASE_URL;
const key = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(url, key, { auth: { persistSession: false } });
const live = [];
let from = 0;
for (;;) {
  const { data, error } = await supabase.from('dishes').select('id,name_ar,region,source').order('id').range(from, from + 999);
  if (error) throw error;
  live.push(...data);
  if (data.length < 1000) break;
  from += 1000;
}
console.log('live DB rows   :', live.length);

// Re-runnable in both states: exclude rows this migration already inserted, so a
// pre-migration run reports 0 clashes and a post-migration run does not flag
// the 300 rows it just wrote as clashes with themselves.
const SOURCE_PREFIX = 'asia-taiwan-2026';
const foreign = live.filter((r) => !(r.source ?? '').startsWith(SOURCE_PREFIX));
const liveAr = new Set(foreign.map((r) => (r.name_ar || '').replace(/\s+/g, ' ').trim()));
const clash = all.filter((r) => liveAr.has(r.name_ar.replace(/\s+/g, ' ').trim()));
console.log('non-Taiwan live rows:', foreign.length);
console.log('live name clashes:', clash.length);
for (const c of clash) errors.push(`LIVE CLASH: ${c.nameAr}`);

// pre-existing Taiwan rows (re-run safety)
const preTaiwan = foreign.filter((r) => REGIONS.has(r.region));
console.log('foreign live rows on a Taiwan region:', preTaiwan.length);
for (const p of preTaiwan) errors.push(`PRE-EXISTING TAIWAN ROW: ${p.name_ar} (${p.region})`);

if (errors.length) {
  console.log(`\nDRY RUN FAILED with ${errors.length} error(s):`);
  for (const e of errors.slice(0, 50)) console.log('  -', e);
  process.exit(1);
}
console.log('\n*** DRY RUN CLEAN - 300 rows validated ***');
