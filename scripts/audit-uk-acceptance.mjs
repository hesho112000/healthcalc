// Post-migration acceptance audit for the UK kitchen. Read-only: queries
// the live dishes table and asserts every requirement of the 400-row migration.
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
const UK_REGIONS = new Set([
  'pan_british', 'london', 'south_east', 'south_west', 'east_anglia', 'midlands',
  'north_west', 'yorkshire', 'north_east', 'lowlands', 'highlands', 'wales', 'ulster',
]);
const SOURCE = 'europe-uk-2026';
const NATIONALITY_TOKENS = ['البريطاني', 'الاسكتلندي', 'الويلزي', 'الايرلندي'];
const EXPECTED_REGION_DIASPORA = {
  london: 'multicultural',
  lowlands: 'scottish',
  highlands: 'scottish',
  wales: 'welsh',
  ulster: 'irish',
};
// Mirrors normalizeArabicName() in src/utils/kitchenAuthenticity.ts.
const fold = (s) =>
  (s ?? '')
    .replace(/[ً-ْٰ]/g, '')
    .replace(/ـ/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه');

const uk = rows.filter((r) => (r.source ?? '').startsWith(SOURCE));
console.log(`total live rows                 : ${rows.length}`);
console.log(`UK rows (source prefix)         : ${uk.length}`);

// Expected total after the 200 base + 200 expansion rows are migrated onto the current 12,322.
ok(rows.length === 12722, `expected 12722 live rows, found ${rows.length}`);
ok(uk.length === 400, `expected 400 UK rows, found ${uk.length}`);

let badToken = 0, badRegion = 0, foreignSrc = 0, shared = 0, badDiaspora = 0;
for (const r of uk) {
  const words = fold(r.name_ar).trim().split(/\s+/).filter((w) => NATIONALITY_TOKENS.includes(w));
  if (words.length !== 1) badToken++;
  if (!UK_REGIONS.has(r.region)) badRegion++;
  if (r.region === 'asian_shared') shared++;
  if (!(r.source ?? '').startsWith(SOURCE)) foreignSrc++;
  const dp = r.diaspora_priority;
  if (!Array.isArray(dp)) { badDiaspora++; continue; }
  const extra = EXPECTED_REGION_DIASPORA[r.region];
  const want = extra ? ['british', 'western', 'comfort_food', extra] : ['british', 'western', 'comfort_food'];
  if (want.some((t) => !dp.includes(t)) || dp.length !== want.length) badDiaspora++;
}
ok(badToken === 0, `${badToken} row(s) without exactly 1 British/Scottish/Welsh/Irish nationality token`);
ok(badRegion === 0, `${badRegion} row(s) outside the UK region set`);
ok(shared === 0, `${shared} UK row(s) in asian_shared (must be 0)`);
ok(foreignSrc === 0, `${foreignSrc} row(s) with a foreign source prefix`);
ok(badDiaspora === 0, `${badDiaspora} row(s) with wrong diaspora_priority`);
console.log(`bad nationality token            : ${badToken}`);
console.log(`asian_shared UK rows             : ${shared}`);
console.log(`wrong diaspora_priority          : ${badDiaspora}`);

const byRegion = {};
for (const r of uk) byRegion[r.region] = (byRegion[r.region] || 0) + 1;
console.log(`distinct regions used             : ${Object.keys(byRegion).length} / 13`);
console.log(`region distribution               : ${JSON.stringify(byRegion)}`);
ok(Object.keys(byRegion).length === 13, `only ${Object.keys(byRegion).length}/13 regions used`);

let drift = 0, not100 = 0;
for (const r of uk) {
  const expect = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  if (r.cal_100 !== expect) drift++;
  const isBev =
    /\b(?:water|tea|coffee|juice|lemonade|cordial|squash)\b/i.test(r.name_en ?? '') ||
    (r.name_ar ?? '').includes('شاي') ||
    (r.name_ar ?? '').includes('ماء');
  if (r.protein + r.carbs + r.fat <= 0 && !isBev) not100++;
}
ok(drift === 0, `${drift} row(s) with Atwater drift`);
ok(not100 === 0, `${not100} row(s) with no macros`);
console.log(`Atwater drift rows                : ${drift}`);

const LANG = ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de'];
let missingLang = 0, latinAr = 0, sameAsAr = 0, corrupt = 0;
for (const r of uk) {
  for (const k of LANG) if (!(r[k] ?? '').trim()) missingLang++;
  if (/[A-Za-z]/.test(r.name_ar ?? '')) latinAr++;
  for (const k of LANG) if ((r[k] ?? '').includes('\uFFFD')) corrupt++;
  for (const k of LANG.slice(1)) if (r[k] === r.name_ar) sameAsAr++;
}
ok(missingLang === 0, `${missingLang} empty translation field(s)`);
ok(latinAr === 0, `${latinAr} Arabic name(s) containing Latin chars`);
ok(sameAsAr === 0, `${sameAsAr} untranslated field(s) identical to name_ar`);
ok(corrupt === 0, `${corrupt} field(s) containing U+FFFD`);
console.log(`empty translation fields          : ${missingLang}`);
console.log(`latin chars in Arabic names      : ${latinAr}`);
console.log(`U+FFFD fields                    : ${corrupt}`);

const seen = new Map();
for (const r of rows) {
  const k = fold(r.name_ar).replace(/\s+/g, ' ').trim();
  if (!seen.has(k)) seen.set(k, []);
  seen.get(k).push(r);
}
const dups = [...seen.entries()].filter(([, v]) => v.length > 1);
const ukDups = dups.filter(([k]) => k.split(/\s+/).some((w) => NATIONALITY_TOKENS.includes(w)));
ok(ukDups.length === 0, `${ukDups.length} duplicated UK Arabic name(s)`);
console.log(`duplicate UK names                : ${ukDups.length}`);

// Halal: word-boundary ban list, with explicit negation handling for pork names.
const BANNED = {
  pork: ['خنزير', 'لحم الخنزير', 'شحم الخنزير', 'دهن الخنزير', 'هام هوك', 'جامبون',
    'أندويلي', 'تاسو', 'فات باك', 'سولت بورك', 'سبير رابس', 'كانتري هام',
    'pork', 'bacon', 'lard', 'gammon', 'chitlins', 'chitterlings', 'ham hock', 'andouille',
    'tasso', 'fatback', 'salt pork', 'pulled pork', 'country ham', 'spare ribs',
    'baby back ribs', 'riblets', 'pig', 'swine', 'hog', 'ham', 'chorizo', 'suet',
    'porc', 'jambon', 'cerdo', 'tocino', 'jamón', 'schweine', 'speck', 'schinken'],
  alcohol: ['كحول', 'خمر', 'نبيذ', 'بيرة', 'ويسكي', 'بوربون', 'براندي', 'روم', 'فودكا',
    'ساكي', 'نبيذ الطبخ', 'جعة', 'لايجر', 'ستاوت', 'جينيس', 'شيري', 'بورت',
    'alcohol', 'beer', 'wine', 'whiskey', 'whisky', 'bourbon', 'brandy', 'rum',
    'vodka', 'sake', 'cooking wine', 'beer-battered', 'beer batter', 'lager',
    'stout', 'porter', 'ale', 'cider', 'mead', 'liquor', 'spirits', 'guinness',
    'bière', 'vin', 'whisky', 'bourbon', 'cerveza', 'vino', 'bier', 'wein'],
  blood: ['دم', 'دمية', 'خ الدم', 'هاغيس', 'black pudding', 'blood sausage', 'boudin noir', 'haggis'],
  game: ['غزال', 'أرنب', 'خنزير بري', 'ديك بري', 'ظبي', 'venison', 'rabbit', 'hare',
    'wild boar', 'pheasant', 'wild duck', 'quail', 'grouse', 'elk', 'moose'],
};
const HALAL_QUALIFIERS = [
  'لحم البقر', 'دجاج', 'ديك رومي', 'لحم الضأن', 'سمك', 'تونة', 'سلمون',
  'روبيان', 'جمبري', 'توفو', 'خضار', 'نباتي',
  'beef', 'chicken', 'turkey', 'lamb', 'fish', 'salmon', 'tuna', 'shrimp',
  'prawn', 'tofu', 'vegetable', 'vegan', 'plant-based', 'halal',
];
const isAppleCider = (hay) => /\bapple\b/i.test(hay) || hay.includes('تفاح');
const isAscii = (w) => /^[A-Za-z]/.test(w);
function hasWord(hay, w) {
  if (isAscii(w)) return new RegExp(`(?<![A-Za-z])${w}(?![A-Za-z])`, 'i').test(hay);
  return new RegExp(`(^|[^ء-ي])${w}($|[^ء-ي])`).test(hay);
}
function isNegatedPork(name, term) {
  if (term === 'pork') return /\b(?:no|without)\s+pork\b|\bpork[- ]free\b/i.test(name);
  if (term === 'خنزير' || term === 'لحم الخنزير') return /بدون\s+(?:لحم\s+)?(?:ال)?خنزير/.test(name);
  return false;
}
let halal = 0;
for (const r of uk) {
  const names = [r.name_ar, r.name_en, r.name_fr, r.name_es, r.name_de].filter((n) => typeof n === 'string');
  const hay = names.join(' ');
  const qual = HALAL_QUALIFIERS.some((q) => hasWord(hay, q));
  for (const [cat, words] of Object.entries(BANNED)) {
    for (const w of words) {
      if (!w) continue;
      const matchingNames = names.filter((name) => hasWord(name, w));
      if (!matchingNames.length) continue;
      if (cat === 'pork' && matchingNames.every((name) => isNegatedPork(name, w))) continue;
      if (cat === 'pork' && qual) continue;
      if (w === 'cider' && isAppleCider(hay)) continue;
      fails.push(`halal: ${cat} "${w}" in "${r.name_en}"`);
      halal++;
    }
  }
}
ok(halal === 0, `${halal} halal violation(s)`);
console.log(`halal violations                  : ${halal}`);

let noMeal = 0;
for (const r of uk) if (!(r.meal_type ?? '').trim()) noMeal++;
ok(noMeal === 0, `${noMeal} row(s) with a blank meal_type`);
console.log(`blank meal_type                   : ${noMeal}`);

let noDiaspora = 0;
const diasporaCounts = {};
for (const r of uk) {
  const dp = r.diaspora_priority;
  if (!Array.isArray(dp) || dp.length < 3) { noDiaspora++; continue; }
  for (const t of dp) diasporaCounts[t] = (diasporaCounts[t] || 0) + 1;
}
ok(noDiaspora === 0, `${noDiaspora} row(s) without diaspora_priority`);
console.log(`rows without diaspora             : ${noDiaspora}`);
console.log(`diaspora tag breakdown            : ${JSON.stringify(diasporaCounts)}`);

console.log('\n' + (fails.length ? `FAIL (${fails.length}):` : 'ALL UK ACCEPTANCE CHECKS PASSED'));
for (const f of fails) console.log(`  - ${f}`);
if (fails.length) process.exitCode = 1;