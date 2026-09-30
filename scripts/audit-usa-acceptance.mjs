// Post-migration acceptance audit for the USA kitchen. Read-only: queries the
// live dishes table and asserts every requirement of the 500-row migration.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const rows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase
    .from('dishes')
    .select('id,name_ar,name_en,name_fr,name_es,name_de,meal_type,region,cal_100,protein,carbs,fat,source,diaspora_priority')
    .order('id')
    .range(from, from + 999);
  if (error) throw error;
  rows.push(...data);
  if (data.length < 1000) break;
}

const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const USA_REGIONS = new Set([
  'pan_american', 'new_england', 'mid_atlantic', 'south', 'deep_south', 'cajun',
  'texas', 'southwest', 'california', 'pacific_northwest', 'midwest', 'hawaii',
  'alaska', 'soul_food', 'bbq', 'native_american',
]);
const SOURCE = 'americas-usa-2026';

const us = rows.filter((r) => (r.source ?? '').startsWith(SOURCE));
console.log(`total live rows            : ${rows.length}`);
console.log(`USA rows (source prefix)   : ${us.length}`);

ok(rows.length === 11922, `expected 11922 live rows, found ${rows.length}`);
ok(us.length === 500, `expected 500 USA rows, found ${us.length}`);

let badToken = 0, badRegion = 0, foreignSrc = 0;
for (const r of us) {
  const toks = (r.name_ar ?? '').trim().split(/\s+/);
  if (!toks.includes('أمريكي')) badToken++;
  if (!USA_REGIONS.has(r.region)) badRegion++;
  if (!(r.source ?? '').startsWith(SOURCE)) foreignSrc++;
}
ok(badToken === 0, `${badToken} row(s) missing the أمريكي token`);
ok(badRegion === 0, `${badRegion} row(s) outside the USA region set`);
ok(foreignSrc === 0, `${foreignSrc} row(s) with a foreign source prefix`);
console.log(`missing أمريكي token       : ${badToken}`);

const byRegion = {};
for (const r of us) byRegion[r.region] = (byRegion[r.region] || 0) + 1;
console.log(`distinct regions used      : ${Object.keys(byRegion).length} / 16`);
console.log(`region distribution        : ${JSON.stringify(byRegion)}`);
ok(Object.keys(byRegion).length === 16, `only ${Object.keys(byRegion).length}/16 regions used`);

let drift = 0, not100 = 0;
for (const r of us) {
  const expect = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  if (r.cal_100 !== expect) drift++;
  if (r.protein + r.carbs + r.fat <= 0) not100++;
}
ok(drift === 0, `${drift} row(s) with Atwater drift`);
ok(not100 === 0, `${not100} row(s) with no macros`);
console.log(`Atwater drift rows         : ${drift}`);

const LANG = ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de'];
let missingLang = 0, latinAr = 0, sameAsAr = 0;
for (const r of us) {
  for (const k of LANG) if (!(r[k] ?? '').trim()) missingLang++;
  if (/[A-Za-z]/.test(r.name_ar ?? '')) latinAr++;
  for (const k of LANG.slice(1)) if (r[k] === r.name_ar) sameAsAr++;
}
ok(missingLang === 0, `${missingLang} empty translation field(s)`);
ok(latinAr === 0, `${latinAr} Arabic name(s) containing Latin chars`);
ok(sameAsAr === 0, `${sameAsAr} untranslated field(s) identical to name_ar`);
console.log(`empty translation fields   : ${missingLang}`);
console.log(`latin chars in Arabic names: ${latinAr}`);

const seen = new Map();
for (const r of rows) {
  const k = (r.name_ar ?? '').replace(/\s+/g, ' ').trim();
  if (!seen.has(k)) seen.set(k, []);
  seen.get(k).push(r);
}
const dups = [...seen.entries()].filter(([, v]) => v.length > 1);
const usDups = dups.filter(([k]) => k.split(/\s+/).includes('أمريكي'));
ok(usDups.length === 0, `${usDups.length} duplicated USA Arabic name(s)`);
console.log(`duplicate USA names       : ${usDups.length}`);

// halal: word-boundary ban list
const BANNED = {
  pork: ['خنزير', 'لحم الخنزير', 'شحم الخنزير', 'دهن الخنزير', 'شيتلينز', 'هام هوك', 'أندويلي', 'تاسو', 'فات باك', 'سولت بورك', 'سبير رابس', 'كانتري هام', 'pork', 'bacon', 'lard', 'chitlins', 'chitterlings', 'ham hock', 'andouille', 'tasso', 'fatback', 'salt pork', 'pulled pork', 'country ham', 'spare ribs', 'baby back ribs', 'riblets', 'pig', 'swine', 'hog', 'ham', 'porc', 'jambon', 'cerdo', 'tocino', 'jamón', 'schweine', 'speck', 'schinken'],
  alcohol: ['كحول', 'خمر', 'نبيذ', 'بيرة', 'ويسكي', 'بوربون', 'براندي', 'روم', 'فودكا', 'ساكي', 'نبيذ الطبخ', 'جعة', 'لايجر', 'ستاوت', 'alcohol', 'beer', 'wine', 'whiskey', 'whisky', 'bourbon', 'brandy', 'rum', 'vodka', 'sake', 'cooking wine', 'beer-battered', 'beer batter', 'lager', 'stout', 'porter', 'ale', 'cider', 'mead', 'liquor', 'spirits', 'bière', 'vin', 'cerveza', 'vino', 'bier', 'wein'],
  blood: ['دم', 'دمية', 'blood', 'black pudding', 'blood sausage', 'boudin noir'],
  game: ['غزال', 'أرنب', 'خنزير بري', 'ديك بري', 'ظبي', 'venison', 'rabbit', 'hare', 'wild boar', 'pheasant', 'wild duck', 'quail', 'grouse', 'elk', 'moose'],
};
const HALAL_QUALIFIERS = ['لحم البقر', 'دجاج', 'ديك رومي', 'لحم الضأن', 'سمك', 'تونة', 'سلمون', 'روبيان', 'جمبري', 'توفو', 'خضار', 'نباتي', 'beef', 'chicken', 'turkey', 'lamb', 'fish', 'salmon', 'tuna', 'shrimp', 'prawn', 'tofu', 'vegetable', 'vegan', 'plant-based'];
const isAscii = (w) => /^[A-Za-z]/.test(w);
function hasWord(hay, w) {
  if (isAscii(w)) return new RegExp(`(?<![A-Za-z])${w}(?![A-Za-z])`, 'i').test(hay);
  return new RegExp(`(^|[^ء-ي])${w}($|[^ء-ي])`).test(hay);
}
let halal = 0;
for (const r of us) {
  const hay = `${r.name_ar ?? ''} ${r.name_en ?? ''} ${r.name_fr ?? ''} ${r.name_es ?? ''} ${r.name_de ?? ''}`;
  const qual = HALAL_QUALIFIERS.some((q) => hasWord(hay, q));
  for (const [cat, words] of Object.entries(BANNED)) {
    for (const w of words) {
      if (!hasWord(hay, w)) continue;
      if (cat === 'pork' && qual) continue;
      fails.push(`halal: ${cat} "${w}" in "${r.name_en}"`);
      halal++;
    }
  }
}
console.log(`halal violations           : ${halal}`);

let noMeal = 0;
for (const r of us) if (!(r.meal_type ?? '').trim()) noMeal++;
ok(noMeal === 0, `${noMeal} row(s) with a blank meal_type`);
console.log(`blank meal_type            : ${noMeal}`);

// diaspora_priority: every USA row must have >= 3 tags
let noDiaspora = 0;
const diasporaCounts = {};
for (const r of us) {
  const dp = r.diaspora_priority;
  if (!Array.isArray(dp) || dp.length < 3) { noDiaspora++; continue; }
  for (const t of dp) diasporaCounts[t] = (diasporaCounts[t] || 0) + 1;
}
ok(noDiaspora === 0, `${noDiaspora} row(s) without diaspora_priority`);
console.log(`rows without diaspora     : ${noDiaspora}`);
console.log(`diaspora tag breakdown     : ${JSON.stringify(diasporaCounts)}`);

console.log('\n' + (fails.length ? `FAIL (${fails.length}):` : 'ALL USA ACCEPTANCE CHECKS PASSED'));
for (const f of fails) console.log(`  - ${f}`);
if (fails.length) process.exitCode = 1;
