// Read-only check of both Austria proposals and the pre-migration live database.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { scan } = require('./austria-halal-scan.cjs');
const URL = process.env.SUPABASE_URL;
const KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error('Missing Supabase credentials');
const supabase = createClient(URL, KEY, { auth: { persistSession: false } });
const base = JSON.parse(fs.readFileSync('scripts/austria-100-proposal.json', 'utf8')).dishes;
const expansion = JSON.parse(fs.readFileSync('scripts/austria-expansion-100-proposal.json', 'utf8')).dishes;
const rows = [...base, ...expansion];
const errors = [];
const regions = [
  'pan_austrian', 'vienna', 'tyrol', 'salzburg', 'styria', 'carinthia',
  'upper_austria', 'lower_austria', 'burgenland', 'vorarlberg',
];
const token = {
  pan_austrian: 'النمساوي', vienna: 'الفييني', tyrol: 'التيرولي', salzburg: 'السالزبورغي',
  styria: 'الشتيرياني', carinthia: 'الكارينثياني', upper_austria: 'النمساوي_عالي',
  lower_austria: 'النمساوي_سفلي', burgenland: 'البورغنلاندي', vorarlberg: 'الفورارلبرغي',
};
const fold = (s) => String(s ?? '').replace(/[ً-ْٰ]/g, '').replace(/ـ/g, '').replace(/[أإآ]/g, 'ا')
  .replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
const bare = (s) => s.replace(/^ال/, '');
const baseTags = ['austrian', 'western', 'comfort_food'];
const extras = { vienna: 'viennese', tyrol: 'alpine' };
const ids = new Set();
const names = Object.fromEntries(['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de'].map((k) => [k, new Set()]));
console.log(`base rows: ${base.length}; expansion rows: ${expansion.length}; total: ${rows.length}`);
if (base.length !== 100 || expansion.length !== 100 || rows.length !== 200) errors.push('expected 100 base + 100 expansion = 200 rows');
for (const r of rows) {
  if (ids.has(r.id)) errors.push(`duplicate id: ${r.id}`);
  ids.add(r.id);
  for (const k of Object.keys(names)) {
    const value = String(r[k] ?? '').trim();
    if (!value) errors.push(`${r.id}: empty ${k}`);
    const key = value.normalize('NFC').replace(/\s+/g, ' ').toLowerCase();
    if (names[k].has(key)) errors.push(`duplicate ${k}: ${value}`);
    names[k].add(key);
  }
  if (/[A-Za-z]/.test(r.name_ar ?? '')) errors.push(`${r.id}: Latin in Arabic name`);
  if (Object.values(r).some((v) => typeof v === 'string' && v.includes('\uFFFD'))) errors.push(`${r.id}: U+FFFD found`);
  const expectedKcal = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  if (r.cal_100 !== expectedKcal) errors.push(`${r.id}: Atwater mismatch`);
  if (!regions.includes(r.region) || r.region === 'asian_shared') errors.push(`${r.id}: invalid region ${r.region}`);
  const tokens = fold(r.name_ar).split(/\s+/).map(bare).filter((w) => Object.values(token).map(bare).includes(w));
  if (tokens.length !== 1 || tokens[0] !== bare(token[r.region] ?? '')) errors.push(`${r.id}: wrong demonym`);
  const expectedDiaspora = extras[r.region] ? [...baseTags, extras[r.region]] : baseTags;
  if (JSON.stringify(r.diaspora_priority) !== JSON.stringify(expectedDiaspora)) errors.push(`${r.id}: diaspora mismatch`);
  if (!(r.source ?? '').startsWith('europe-austria-2026')) errors.push(`${r.id}: source tag mismatch`);
}
const halal = scan(rows.map((r) => ({
  nameAr: r.name_ar, nameEn: r.name_en, nameFr: r.name_fr, nameEs: r.name_es, nameDe: r.name_de,
})));
for (const h of halal) errors.push(`HALAL [${h.kind}] ${h.term}: ${h.nameEn}`);

const live = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase.from('dishes').select('name_ar,region,source').order('id').range(from, from + 999);
  if (error) throw error;
  live.push(...data);
  if (data.length < 1000) break;
}
console.log(`live rows: ${live.length}; expected pre-Austria baseline: 13322`);
if (live.length !== 13322) errors.push(`expected 13322 pre-migration live rows, found ${live.length}`);
const austriaLive = live.filter((r) => (r.source ?? '').startsWith('europe-austria-2026'));
if (austriaLive.length) errors.push(`expected no Austria rows before migration, found ${austriaLive.length}`);
const foreignNames = new Set(live.filter((r) => !(r.source ?? '').startsWith('europe-austria-2026')).map((r) => fold(r.name_ar).replace(/\s+/g, ' ').trim()));
for (const r of rows) if (foreignNames.has(fold(r.name_ar).replace(/\s+/g, ' ').trim())) errors.push(`live Arabic-name collision: ${r.name_ar}`);
console.log(`halal violations: ${halal.length}`);
if (errors.length) {
  console.error(`DRY RUN FAILED (${errors.length}):`);
  for (const e of errors.slice(0, 60)) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('DRY RUN CLEAN - 200 Austria rows validated');
