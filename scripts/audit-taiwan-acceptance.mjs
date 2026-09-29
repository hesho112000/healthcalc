// Post-migration acceptance audit for the Taiwan kitchen. Read-only: queries the
// live dishes table and asserts every requirement of the 300-row migration.
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const ROOT = path.resolve(import.meta.dirname, '..');
for (const line of fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const rows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase
    .from('dishes')
    .select('id,name_ar,name_en,name_fr,name_es,name_de,meal_type,region,cal_100,protein,carbs,fat,source')
    .order('id')
    .range(from, from + 999);
  if (error) throw error;
  rows.push(...data);
  if (data.length < 1000) break;
}

const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const TAIWAN_REGIONS = new Set([
  'pan_taiwanese', 'taipei', 'tainan', 'taichung', 'kaohsiung', 'hsinchu',
  'hualien', 'taitung', 'keelung', 'chiayi', 'nantou', 'yilan', 'pingtung',
]);
const SOURCE = 'asia-taiwan-2026';

const tw = rows.filter((r) => (r.source ?? '').startsWith(SOURCE));
console.log(`total live rows            : ${rows.length}`);
console.log(`taiwan rows (source prefix): ${tw.length}`);

ok(rows.length === 11422, `expected 11422 live rows, found ${rows.length}`);
ok(tw.length === 300, `expected 300 Taiwan rows, found ${tw.length}`);

// --- nationality token + region ---
let badToken = 0, badRegion = 0, shared = 0, foreignSrc = 0;
for (const r of tw) {
  const toks = (r.name_ar ?? '').trim().split(/\s+/);
  if (!toks.includes('تايوان')) badToken++;
  if (r.region === 'asian_shared') shared++;
  else if (!TAIWAN_REGIONS.has(r.region)) badRegion++;
  if (!(r.source ?? '').startsWith(SOURCE)) foreignSrc++;
}
ok(badToken === 0, `${badToken} row(s) missing the تايوان token`);
ok(badRegion === 0, `${badRegion} row(s) outside the Taiwan region set`);
ok(shared === 0, `${shared} Taiwan row(s) in asian_shared (must be 0)`);
ok(foreignSrc === 0, `${foreignSrc} row(s) with a foreign source prefix`);
console.log(`missing تايوان token       : ${badToken}`);
console.log(`asian_shared Taiwan rows   : ${shared}`);

const byRegion = {};
for (const r of tw) byRegion[r.region] = (byRegion[r.region] || 0) + 1;
console.log(`distinct regions used      : ${Object.keys(byRegion).length} / 13`);
console.log(`region distribution        : ${JSON.stringify(byRegion)}`);
ok(Object.keys(byRegion).length === 13, `only ${Object.keys(byRegion).length}/13 regions used`);

// --- Atwater: cal_100 == round(4P + 4C + 9F) ---
let drift = 0, not100 = 0;
for (const r of tw) {
  const expect = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  if (r.cal_100 !== expect) drift++;
  if (r.protein + r.carbs + r.fat <= 0) not100++;
}
ok(drift === 0, `${drift} row(s) with Atwater drift`);
ok(not100 === 0, `${not100} row(s) with no macros`);
console.log(`Atwater drift rows         : ${drift}`);

// --- 5-language completeness + no Latin in Arabic ---
const LANG = ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de'];
let missingLang = 0, latinAr = 0, sameAsAr = 0;
for (const r of tw) {
  for (const k of LANG) if (!(r[k] ?? '').trim()) missingLang++;
  if (/[A-Za-z]/.test(r.name_ar ?? '')) latinAr++;
  for (const k of LANG.slice(1)) if (r[k] === r.name_ar) sameAsAr++;
}
ok(missingLang === 0, `${missingLang} empty translation field(s)`);
ok(latinAr === 0, `${latinAr} Arabic name(s) containing Latin chars`);
ok(sameAsAr === 0, `${sameAsAr} untranslated field(s) identical to nameAr`);
console.log(`empty translation fields   : ${missingLang}`);
console.log(`latin chars in Arabic names: ${latinAr}`);

// --- duplicate Arabic names, globally ---
const seen = new Map();
for (const r of rows) {
  const k = (r.name_ar ?? '').replace(/\s+/g, ' ').trim();
  if (!seen.has(k)) seen.set(k, []);
  seen.get(k).push(r);
}
const dups = [...seen.entries()].filter(([, v]) => v.length > 1);
const twDups = dups.filter(([k]) => (k.split(/\s+/).includes('تايوان')));
ok(twDups.length === 0, `${twDups.length} duplicated Taiwan Arabic name(s)`);
console.log(`duplicate Taiwan names     : ${twDups.length}`);

// --- halal: no pork / alcohol / blood / wild game ---
// Word-boundary matching only. Naive substring matching produces false
// positives here: "ham" occurs inside the French "champignons" and the Spanish
// "Hamburguesa", and "بيرة" (beer) occurs inside "كبيرة" (large).
const BANNED = {
  pork: ['خنزير', 'لحم الخنزير', 'شواء', 'شاومين', 'pork', 'bacon', 'ham', 'lard'],
  alcohol: ['كحول', 'خمر', 'بيرة', 'نبيذ', 'ويسكي', 'sake', 'beer', 'wine', 'whisky', 'whiskey', 'liqueur'],
  blood: ['دم', 'دمية', 'قشعريرة', 'blood'],
  wildgame: ['غزال', 'أرنب', 'خنزير بري', 'ديك بري', 'wild boar', 'venison', 'pheasant', 'wild duck', 'rabbit'],
};
const isAscii = (w) => /^[A-Za-z]/.test(w);
function hasWord(hay, w) {
  if (isAscii(w)) {
    return new RegExp(`(?<![A-Za-z])${w}(?![A-Za-z])`, 'i').test(hay);
  }
  // Arabic: bound on whitespace/punctuation so "بيرة" cannot match inside "كبيرة".
  return new RegExp(`(^|[^ء-ي])${w}($|[^ء-ي])`).test(hay);
}
let halal = 0;
for (const r of tw) {
  const hay = `${r.name_ar ?? ''} ${r.name_en ?? ''} ${r.name_fr ?? ''} ${r.name_es ?? ''} ${r.name_de ?? ''}`;
  for (const [cat, words] of Object.entries(BANNED)) {
    for (const w of words) {
      if (hasWord(hay, w)) { fails.push(`halal: ${cat} "${w}" in "${r.name_en}"`); halal++; }
    }
  }
}
console.log(`halal violations           : ${halal}`);

// --- meal_type populated ---
let noMeal = 0;
for (const r of tw) if (!(r.meal_type ?? '').trim()) noMeal++;
ok(noMeal === 0, `${noMeal} row(s) with a blank meal_type`);
console.log(`blank meal_type             : ${noMeal}`);

console.log('\n' + (fails.length ? `FAIL (${fails.length}):` : 'ALL TAIWAN ACCEPTANCE CHECKS PASSED'));
for (const f of fails) console.log(`  - ${f}`);
if (fails.length) process.exitCode = 1;
