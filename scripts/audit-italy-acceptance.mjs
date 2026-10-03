// Read-only post-migration acceptance audit for Italy (150 base + 150 expansion).
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { scan } = require('./italy-halal-scan.cjs');
const URL = process.env.SUPABASE_URL;
const KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error('Missing Supabase credentials');
const supabase = createClient(URL, KEY, { auth: { persistSession: false } });
const SOURCE = 'europe-italy-2026';
const EXPECTED_TOTAL = 14572;
const EXPECTED_ITALY = 300;
const REGION_TOKEN = {
  pan_italian: 'ايطالي', rome: 'روماني', milan: 'ميلاني', naples: 'نابولي',
  sicily: 'صقلي', tuscany: 'توسكاني', venice: 'بندقي', florence: 'فلورنسي',
  bologna: 'بولوني', turin: 'توريني', genoa: 'جنوي', sardinia: 'سرديني',
  puglia: 'بوليزي',
};
const BASE_DIASPORA = ['italian', 'western', 'comfort_food'];
const EXTRA = { rome: 'roman', milan: 'milanese', sicily: 'sicilian' };
const fold = (s) => String(s ?? '').replace(/[ً-ْٰ]/g, '').replace(/ـ/g, '').replace(/[أإآ]/g, 'ا')
  .replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/\s+/g, ' ').trim();
const rows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase.from('dishes')
    .select('id,name_ar,name_en,name_fr,name_es,name_de,meal_type,region,cal_100,protein,carbs,fat,source,diaspora_priority')
    .order('id').range(from, from + 999);
  if (error) throw error;
  rows.push(...data);
  if (data.length < 1000) break;
}
const fails = [];
const ok = (condition, message) => { if (!condition) fails.push(message); };
const italy = rows.filter((r) => (r.source ?? '').startsWith(SOURCE));
console.log(`total live rows: ${rows.length}`);
console.log(`Italy source rows: ${italy.length}`);
ok(rows.length === EXPECTED_TOTAL, `expected ${EXPECTED_TOTAL} total rows, found ${rows.length}`);
ok(italy.length === EXPECTED_ITALY, `expected ${EXPECTED_ITALY} Italy rows, found ${italy.length}`);
let badToken = 0, badRegion = 0, badDiaspora = 0, badAtwater = 0, badLanguage = 0;
const byRegion = {};
for (const r of italy) {
  const tokens = fold(r.name_ar).split(/\s+/).filter((w) => Object.values(REGION_TOKEN).includes(w));
  if (tokens.length !== 1 || tokens[0] !== REGION_TOKEN[r.region]) badToken++;
  if (!(r.region in REGION_TOKEN) || r.region === 'asian_shared') badRegion++;
  byRegion[r.region] = (byRegion[r.region] ?? 0) + 1;
  const expectedDiaspora = EXTRA[r.region] ? [...BASE_DIASPORA, EXTRA[r.region]] : BASE_DIASPORA;
  if (!Array.isArray(r.diaspora_priority) || JSON.stringify(r.diaspora_priority) !== JSON.stringify(expectedDiaspora)) badDiaspora++;
  if (Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat) !== r.cal_100) badAtwater++;
  const names = [r.name_ar, r.name_en, r.name_fr, r.name_es, r.name_de];
  if (names.some((v) => typeof v !== 'string' || !v.trim() || v.includes('�')) || /[A-Za-z]/.test(r.name_ar ?? '')) badLanguage++;
}
const expectedByRegion = Object.fromEntries(Object.keys(REGION_TOKEN).map((r) => [r, r === 'pan_italian' ? 84 : 18]));
for (const [region, count] of Object.entries(expectedByRegion)) if (byRegion[region] !== count) fails.push(`${region}: expected ${count}, found ${byRegion[region] ?? 0}`);
ok(Object.keys(byRegion).length === 13, `expected 13 Italy region keys, found ${Object.keys(byRegion).length}`);
ok(badToken === 0, `${badToken} row(s) with missing/mismatched demonym`);
ok(badRegion === 0, `${badRegion} row(s) with invalid region`);
ok(badDiaspora === 0, `${badDiaspora} row(s) with incorrect diaspora_priority`);
ok(badAtwater === 0, `${badAtwater} row(s) with Atwater drift`);
ok(badLanguage === 0, `${badLanguage} row(s) with missing/corrupt language data`);
const halal = scan(italy.map((r) => ({ nameAr: r.name_ar, nameEn: r.name_en, nameFr: r.name_fr, nameEs: r.name_es, nameDe: r.name_de })));
ok(halal.length === 0, `${halal.length} halal violation(s)`);
console.log(`region distribution: ${JSON.stringify(byRegion)}`);
console.log(`demonym errors: ${badToken}; diaspora errors: ${badDiaspora}; Atwater errors: ${badAtwater}`);
console.log(`halal violations: ${halal.length}`);
for (const h of halal) console.log(`  HALAL [${h.kind}] ${h.term}: ${h.nameEn}`);
console.log(fails.length ? `\nFAIL (${fails.length}):` : '\nALL ITALY ACCEPTANCE CHECKS PASSED');
for (const f of fails) console.log(`  - ${f}`);
if (fails.length) process.exitCode = 1;
