// Read-only union check of the Germany base + expansion proposals. Emits nothing.
// Mirrors scripts/validate-uk-dry-run.js. Germany differs in that all 13 regions
// own a distinct demonym, so the token check is per-region rather than "any of N".
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { scan } = require('./germany-halal-scan.cjs');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const base = JSON.parse(fs.readFileSync('scripts/germany-175-proposal.json', 'utf8')).dishes;
const exp = JSON.parse(fs.readFileSync('scripts/germany-expansion-175-proposal.json', 'utf8')).dishes;
const all = [...base, ...exp];

const errors = [];
const REGIONS = [
  'pan_german', 'bavaria', 'berlin', 'hamburg', 'hesse', 'rhineland', 'saxony',
  'thuringia', 'brandenburg', 'lower_saxony', 'baden_wurttemberg', 'saarland', 'bremen',
];
const REGION_SET = new Set(REGIONS);
const TOKENS = [
  'الالماني', 'البافاري', 'البرليني', 'الهامبورغي', 'الهيسي', 'الراينلاندي', 'الساكسوني',
  'التورينغي', 'البراندنبورغي', 'الهانزياتي', 'الشوابي', 'السارلاندي', 'البريميني',
];
const REGION_TOKEN = Object.fromEntries(REGIONS.map((r, i) => [r, TOKENS[i]]));
const bare = (t) => t.replace(/^ال/, '');
const BARE_TOKENS = TOKENS.map(bare);
const BARE_REGION_TOKEN = Object.fromEntries(REGIONS.map((r) => [r, bare(REGION_TOKEN[r])]));
const SOURCE_PREFIX = 'europe-germany-2026';

// Fold the orthographic demonym variants before counting tokens, matching the
// row helper and both builders.
const fold = (s) => s.replace(/[أإآ]/g, 'ا').replace(/[ةه]/g, 'ه').replace(/ى/g, 'ي');

console.log('base rows      :', base.length);
console.log('expansion rows :', exp.length);
console.log('TOTAL          :', all.length);
if (all.length !== 350) errors.push(`expected 350 rows, got ${all.length}`);

const seenIds = new Set();
const seenAr = new Set();
const seenEn = new Set();
for (const r of all) {
  if (seenIds.has(r.id)) errors.push(`duplicate id: ${r.id}`);
  seenIds.add(r.id);
  const ar = (r.name_ar ?? '').replace(/\s+/g, ' ').trim();
  if (seenAr.has(ar)) errors.push(`duplicate Arabic name: ${ar}`);
  seenAr.add(ar);
  const en = (r.name_en ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  if (seenEn.has(en)) errors.push(`duplicate English name: ${en}`);
  seenEn.add(en);
  const toks = fold(r.name_ar ?? '').split(/\s+/).map(bare).filter((t) => BARE_TOKENS.includes(t));
  if (toks.length !== 1) errors.push(`${r.id}: expected exactly 1 German demonym, found ${toks.length}`);
  else if (REGION_SET.has(r.region) && toks[0] !== BARE_REGION_TOKEN[r.region]) {
    errors.push(`${r.id}: region ${r.region} must use "${BARE_REGION_TOKEN[r.region]}", found "${toks[0]}"`);
  }
  const expect = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  if (r.cal_100 !== expect) errors.push(`${r.id}: Atwater drift cal=${r.cal_100} expected ${expect}`);
  if (!REGION_SET.has(r.region)) errors.push(`${r.id}: bad region "${r.region}"`);
  if (r.region === 'asian_shared') errors.push(`${r.id}: asian_shared must remain empty`);
  if (!Array.isArray(r.diaspora_priority) || r.diaspora_priority.length < 3) {
    errors.push(`${r.id}: diaspora_priority missing or too short`);
  }
  if (!(r.source ?? '').startsWith(SOURCE_PREFIX)) errors.push(`${r.id}: bad source "${r.source}"`);
}

const byRegion = {};
for (const r of all) byRegion[r.region] = (byRegion[r.region] || 0) + 1;
const regionCount = Object.keys(byRegion).length;
console.log('regions used   :', regionCount, 'of 13 (12 Laender + pan_german)');
console.log('by region      :', JSON.stringify(byRegion));
console.log('asian_shared   :', byRegion.asian_shared || 0);
if (regionCount !== 13) errors.push(`expected 13 regions, found ${regionCount}`);

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
const liveAr = new Set(foreign.map((r) => fold((r.name_ar || '').replace(/\s+/g, ' ').trim())));
const clash = all.filter((r) => liveAr.has(fold((r.name_ar || '').replace(/\s+/g, ' ').trim())));
console.log('non-DE live rows:', foreign.length);
console.log('live name clashes:', clash.length);
for (const c of clash) errors.push(`LIVE CLASH: ${c.name_ar}`);

const preDe = foreign.filter((r) => REGION_SET.has(r.region));
console.log('foreign live rows on a German region:', preDe.length);
for (const p of preDe) errors.push(`PRE-EXISTING GERMAN ROW: ${p.name_ar} (${p.region})`);

if (errors.length) {
  console.log(`\nDRY RUN FAILED with ${errors.length} error(s):`);
  for (const e of errors.slice(0, 50)) console.log('  -', e);
  process.exit(1);
}
console.log('\n*** DRY RUN CLEAN - 350 rows validated ***');