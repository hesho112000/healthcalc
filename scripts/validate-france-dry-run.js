// Read-only validation of both France proposals against the pre-migration database.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { scan } = require('./france-halal-scan.cjs');
const URL = process.env.SUPABASE_URL;
const KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error('Missing Supabase credentials');
const supabase = createClient(URL, KEY, { auth: { persistSession: false } });
const base = JSON.parse(fs.readFileSync('scripts/france-175-proposal.json', 'utf8')).dishes;
const expansion = JSON.parse(fs.readFileSync('scripts/france-expansion-175-proposal.json', 'utf8')).dishes;
const rows = [...base, ...expansion];
const errors = [];
const REGIONS = ['pan_french', 'paris', 'normandy', 'provence', 'lyon', 'bordeaux', 'alsace', 'brittany', 'burgundy', 'toulouse', 'marseille', 'loire', 'corsica'];
const TOKENS = ['فرنسي', 'باريسي', 'نورماندي', 'بروفنسي', 'ليوني', 'بوردوي', 'الزاسي', 'بريتوني', 'بورغندي', 'تولوزي', 'مارسيلي', 'لواروي', 'كورسيكي'];
const TOKEN = Object.fromEntries(REGIONS.map((r, i) => [r, TOKENS[i]]));
const fold = (s) => String(s ?? '').replace(/[ً-ْٰ]/g, '').replace(/ـ/g, '').replace(/[أإآ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
const baseDiaspora = ['french', 'western', 'comfort_food'];
const extra = { paris: 'parisian', provence: 'mediterranean' };
console.log(`base rows: ${base.length}; expansion rows: ${expansion.length}; total: ${rows.length}`);
if (base.length !== 175 || expansion.length !== 175 || rows.length !== 350) errors.push('expected 175 base + 175 expansion = 350 rows');
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
  if (/[A-Za-z]/.test(r.name_ar ?? '') || Object.values(r).some((v) => typeof v === 'string' && v.includes('\uFFFD'))) errors.push(`${r.id}: corrupted Arabic/text`);
  if (!REGIONS.includes(r.region) || r.region === 'asian_shared') errors.push(`${r.id}: invalid region`);
  const token = fold(r.name_ar).split(/\s+/).filter((w) => TOKENS.includes(w));
  if (token.length !== 1 || token[0] !== TOKEN[r.region]) errors.push(`${r.id}: wrong demonym`);
  if (Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat) !== r.cal_100) errors.push(`${r.id}: Atwater mismatch`);
  const dp = extra[r.region] ? [...baseDiaspora, extra[r.region]] : baseDiaspora;
  if (JSON.stringify(r.diaspora_priority) !== JSON.stringify(dp)) errors.push(`${r.id}: diaspora mismatch`);
  if (!(r.source ?? '').startsWith('europe-france-2026')) errors.push(`${r.id}: source mismatch`);
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
console.log(`live rows: ${live.length}; expected pre-France baseline: 13522`);
if (live.length !== 13522) errors.push(`expected 13522 pre-migration live rows, found ${live.length}`);
if (live.some((r) => (r.source ?? '').startsWith('europe-france-2026'))) errors.push('France source rows already exist before migration');
const foreignNames = new Set(live.filter((r) => !(r.source ?? '').startsWith('europe-france-2026')).map((r) => fold(r.name_ar).replace(/\s+/g, ' ').trim()));
for (const r of rows) if (foreignNames.has(fold(r.name_ar).replace(/\s+/g, ' ').trim())) errors.push(`live Arabic-name collision: ${r.name_ar}`);
console.log(`halal violations: ${halal.length}`);
if (errors.length) {
  console.error(`DRY RUN FAILED (${errors.length}):`);
  for (const e of errors.slice(0, 80)) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('DRY RUN CLEAN - 350 France rows validated');
