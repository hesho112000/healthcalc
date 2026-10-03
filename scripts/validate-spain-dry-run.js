// Read-only validation of both Spain proposals against the pre-migration database.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { scan } = require('./spain-halal-scan.cjs');
const URL = process.env.SUPABASE_URL;
const KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error('Missing Supabase credentials');
const supabase = createClient(URL, KEY, { auth: { persistSession: false } });
const base = JSON.parse(fs.readFileSync('scripts/spain-base-125-proposal.json', 'utf8')).dishes;
const expansion = JSON.parse(fs.readFileSync('scripts/spain-expansion-125-proposal.json', 'utf8')).dishes;
const rows = [...base, ...expansion];
const errors = [];
const REGIONS = ['pan_spanish', 'madrid', 'barcelona', 'valencia', 'seville', 'basque', 'galicia', 'andalusia', 'castile', 'aragon', 'catalonia', 'canary_islands', 'balearic'];
const TOKENS = ['اسباني', 'مدريدي', 'برشلوني', 'فالنسي', 'اشبيلي', 'باسكي', 'غاليسي', 'اندلسي', 'قشتالي', 'اراغوني', 'كتالوني', 'كناري', 'بلياري'];
const TOKEN = Object.fromEntries(REGIONS.map((r, i) => [r, TOKENS[i]]));
const fold = (s) => String(s ?? '').replace(/[ً-ْٰ]/g, '').replace(/ـ/g, '').replace(/[أإآ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
const baseDiaspora = ['spanish', 'western', 'comfort_food', 'mediterranean'];
const extra = { madrid: 'madrilenian', barcelona: 'catalan', andalusia: 'andalusian' };
console.log(`base rows: ${base.length}; expansion rows: ${expansion.length}; total: ${rows.length}`);
if (base.length !== 125 || expansion.length !== 125 || rows.length !== 250) errors.push('expected 125 base + 125 expansion = 250 rows');
const ids = new Set();
const names = Object.fromEntries(['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de'].map((k) => [k, new Set()]));
for (const r of rows) {
  if (ids.has(r.id)) errors.push(`duplicate id: ${r.id}`);
  ids.add(r.id);
  for (const [k, set] of Object.entries(names)) {
    const value = String(r[k] ?? '').normalize('NFC').replace(/\s+/g, ' ').trim().toLocaleLowerCase();
    if (!value || set.has(value)) errors.push(`${r.id}: empty/duplicate ${k}`);
    set.add(value);
  }
  if (/[A-Za-z]/.test(r.name_ar ?? '') || Object.values(r).some((v) => typeof v === 'string' && v.includes('�'))) errors.push(`${r.id}: corrupted Arabic/text`);
  if (!REGIONS.includes(r.region) || r.region === 'asian_shared') errors.push(`${r.id}: invalid region`);
  const token = fold(r.name_ar).split(/\s+/).filter((w) => TOKENS.includes(w));
  if (token.length !== 1 || token[0] !== TOKEN[r.region]) errors.push(`${r.id}: wrong demonym`);
  if (Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat) !== r.cal_100) errors.push(`${r.id}: Atwater mismatch`);
  const dp = extra[r.region] ? [...baseDiaspora, extra[r.region]] : baseDiaspora;
  if (JSON.stringify(r.diaspora_priority) !== JSON.stringify(dp)) errors.push(`${r.id}: diaspora mismatch`);
  if (!(r.source ?? '').startsWith('europe-spain-2026')) errors.push(`${r.id}: source mismatch`);
}
const halal = scan(rows.map((r) => ({ nameAr: r.name_ar, nameEn: r.name_en, nameFr: r.name_fr, nameEs: r.name_es, nameDe: r.name_de })));
for (const h of halal) errors.push(`HALAL [${h.kind}] ${h.term}: ${h.nameEn}`);
const live = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase.from('dishes').select('name_ar,region,source').order('id').range(from, from + 999);
  if (error) throw error;
  live.push(...data);
  if (data.length < 1000) break;
}
console.log(`live rows: ${live.length}; expected pre-Spain baseline: 14572`);
if (live.length !== 14572) errors.push(`expected 14572 pre-migration live rows, found ${live.length}`);
if (live.some((r) => (r.source ?? '').startsWith('europe-spain-2026'))) errors.push('Spain source rows already exist before migration');
const foreignNames = new Set(live.filter((r) => !(r.source ?? '').startsWith('europe-spain-2026')).map((r) => fold(r.name_ar).replace(/\s+/g, ' ').trim()));
for (const r of rows) if (foreignNames.has(fold(r.name_ar).replace(/\s+/g, ' ').trim())) errors.push(`live Arabic-name collision: ${r.name_ar}`);
console.log(`halal violations: ${halal.length}`);
if (errors.length) {
  console.error(`DRY RUN FAILED (${errors.length}):`);
  for (const e of errors.slice(0, 80)) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('DRY RUN CLEAN - 250 Spain rows validated');
