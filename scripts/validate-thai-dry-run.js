// Dry-run validator for the Thai 300-dish proposal (100 base + 200 expansion).
// READ-ONLY: queries the live dishes table for name collisions, never writes.
// Reports:
//  - duplicate Arabic/English names inside the 300-row set and across base vs expansion
//  - collisions with the existing ~9,100 dishes in Supabase
//  - 5-language completeness, per-100 g macros, Atwater consistency
//  - halal scan, authenticity token, Arabic-script integrity
//  - category/region/mealType vocabulary versus what is already live
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or (asia_migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const base = JSON.parse(fs.readFileSync(path.join(__dirname, 'thai-100-proposal.json'), 'utf8')).dishes;
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, 'thai-200-proposal.json'), 'utf8')).dishes;

// Normalize both shapes into one row shape.
const norm = (d) => ({
  name_ar: (d.name_ar ?? d.nameAr ?? '').trim(),
  name_en: (d.name_en ?? d.nameEn ?? '').trim(),
  name_fr: (d.name_fr ?? d.nameFr ?? '').trim(),
  name_es: (d.name_es ?? d.nameEs ?? '').trim(),
  name_de: (d.name_de ?? d.nameDe ?? '').trim(),
  category: d.category ?? null,
  mealType: d.mealType ?? null,
  region: d.region ?? 'pan_thai',
  grams: d.grams ?? 100,
  cal_100: d.cal_100 ?? d.kcal,
  protein: d.protein,
  carbs: d.carbs,
  fat: d.fat,
});

const rows = [...base.map((d) => ({ ...norm(d), src: 'base' })), ...exp.map((d) => ({ ...norm(d), src: 'expansion' }))];

const problems = [];
const P = (m) => problems.push(m);

const LATIN_IN_AR = /[A-Za-z]/;
const NON_ARABIC_SCRIPT = /[\uFFFD\u0600-\u06FF]/;
const PORK = /(pork|bacón|bacon|ham|swine|cerdo|schwein|chorizo|หมู)/i;
const ALCOHOL = /(beer|wine|rum|vodka|whisky|whiskey|lager|birre|cerveza|bier|wein|alkohol|champagne|cider)/i;

console.log('\n============ THAILAND 300-DISH DRY RUN ============');
console.log(`base rows       : ${base.length}`);
console.log(`expansion rows  : ${exp.length}`);
console.log(`combined        : ${rows.length}`);

// ---- per-row integrity -------------------------------------------------------
for (const r of rows) {
  const tag = `[${r.src}] ${r.name_en || '?'}`;

  for (const k of ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de']) {
    if (!r[k]) P(`${tag}: missing ${k}`);
  }
  if (r.name_ar && LATIN_IN_AR.test(r.name_ar)) P(`${tag}: Latin chars in name_ar`);
  if (r.name_ar && NON_ARABIC_SCRIPT.test(r.name_ar.replace(/[\u0600-\u06FF]/g, ''))) P(`${tag}: bad script in name_ar`);
  if (r.grams !== 100) P(`${tag}: grams=${r.grams}, expected 100`);
  if (PORK.test(r.name_en)) P(`${tag}: pork reference -> ${r.name_en}`);
  if (ALCOHOL.test(r.name_en)) P(`${tag}: alcohol reference -> ${r.name_en}`);

  const atwater = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  if (r.cal_100 !== atwater) P(`${tag}: kcal ${r.cal_100} != Atwater ${atwater}`);
  if (r.cal_100 < 20 || r.cal_100 > 900) P(`${tag}: kcal ${r.cal_100} out of range`);
}

// ---- authenticity token ------------------------------------------------------
const tokenised = rows.filter((r) => r.name_ar.includes('تايلندي'));
const untokenised = rows.filter((r) => !r.name_ar.includes('تايلندي'));
const doubled = rows.filter((r) => (r.name_ar.match(/تايلندي/g) || []).length > 1);

// ---- duplicates inside the 300 ----------------------------------------------
const dupAr = new Map();
const dupEn = new Map();
for (const r of rows) {
  const ak = r.name_ar.toLowerCase();
  const ek = r.name_en.toLowerCase();
  if (dupAr.has(ak)) P(`duplicate Arabic name: "${r.name_ar}" (${dupAr.get(ak)} vs ${r.src})`);
  else dupAr.set(ak, r.src);
  if (dupEn.has(ek)) P(`duplicate English name: "${r.name_en}" (${dupEn.get(ek)} vs ${r.src})`);
  else dupEn.set(ek, r.src);
}

// ---- live DB (read-only) -----------------------------------------------------
const liveAr = new Set();
const liveRegions = new Set();
let liveCount = 0;
const PAGE = 1000;
for (let from = 0; ; from += PAGE) {
  const { data, error } = await supabase
    .from('dishes')
    .select('name_ar, region, meal_type')
    .order('id', { ascending: true })
    .range(from, from + PAGE - 1);
  if (error) { console.error('Query failed:', error.message); process.exit(1); }
  for (const r of data ?? []) {
    if (r.name_ar) liveAr.add(r.name_ar.trim());
    if (r.region) liveRegions.add(r.region);
  }
  liveCount += (data ?? []).length;
  if ((data ?? []).length < PAGE) break;
}

const liveCollisions = rows.filter((r) => liveAr.has(r.name_ar)).map((r) => `${r.name_en} (${r.src})`);

// ---- report ------------------------------------------------------------------
const tally = (key) => {
  const o = {};
  for (const r of rows) o[r[key]] = (o[r[key]] || 0) + 1;
  return o;
};

console.log(`\nlive dishes in DB: ${liveCount}`);
console.log('\n-- Integrity --');
console.log(`rows with تايلندي token : ${tokenised.length} / ${rows.length}`);
console.log(`rows without token       : ${untokenised.length}`);
console.log(`doubled token            : ${doubled.length}`);
const inSetDupAr = rows.length - dupAr.size;
const inSetDupEn = rows.length - dupEn.size;
console.log(`duplicate Arabic names   : ${inSetDupAr}`);
console.log(`duplicate English names  : ${inSetDupEn}`);
console.log(`collisions with live DB  : ${liveCollisions.length}`);
if (liveCollisions.length) console.log(`  ${liveCollisions.join('\n  ')}`);

console.log('\n-- Distribution --');
console.log('category  :', JSON.stringify(tally('category')));
console.log('region    :', JSON.stringify(tally('region')));
console.log('mealType  :', JSON.stringify(tally('mealType')));

const propRegions = new Set(Object.keys(tally('region')));
const unknownRegions = [...propRegions].filter((g) => !liveRegions.has(g));

console.log('\n-- Vocabulary vs live DB --');
console.log(`regions not yet live    : ${unknownRegions.length ? unknownRegions.join(', ') : 'none'}`);

console.log('\n-- Problems --');
if (problems.length === 0) console.log('none');
else {
  for (const p of problems) console.log(' -', p);
  console.log(`\n${problems.length} problem(s).`);
}
console.log('\nNo writes were performed. Awaiting explicit approval before migration.');
