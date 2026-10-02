// Post-migration acceptance audit for the Switzerland kitchen. Read-only: queries
// the live dishes table and asserts every requirement of the 250-row migration.
// Mirrors scripts/audit-germany-acceptance.mjs; Switzerland carries the Swiss
// ban list (Cervelat, Speck, Bratwurst, kirsch, absinthe, Chasselas) and per-region
// demonym matching instead of one shared pan token.
//
// NOT RUN IN PHASE A. Nothing is migrated yet, so this audit is expected to fail
// with 0 Switzerland rows until Phase C runs the two migration scripts.
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
const REGION_TOKEN = {
  pan_swiss: 'سويسري',
  zurich: 'زوريخي',
  bern: 'برني',
  geneva: 'جنيفي',
  lucerne: 'لوسيرني',
  basel: 'بازلي',
  lausanne: 'لوزاني',
  ticino: 'تيسيني',
  valais: 'فاليزي',
  grisons: 'غريزوني',
  vaud: 'فودي',
  aargau: 'ارغاوي',
  st_gallen: 'سانت_غاليني',
};
const SWISS_REGIONS = new Set(Object.keys(REGION_TOKEN));
const ALL_TOKENS = new Set(Object.values(REGION_TOKEN).flatMap((t) => [t, `${t}ه`]));
const SOURCE = 'europe-switzerland-2026';
const EXPECTED_REGION_DIASPORA = {
  ticino: 'italian_swiss',
  geneva: 'french_swiss',
  vaud: 'french_swiss',
  lausanne: 'french_swiss',
  zurich: 'german_swiss',
  bern: 'german_swiss',
  basel: 'german_swiss',
  lucerne: 'german_swiss',
  aargau: 'german_swiss',
  st_gallen: 'german_swiss',
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

const sw = rows.filter((r) => (r.source ?? '').startsWith(SOURCE));
console.log(`total live rows                 : ${rows.length}`);
console.log(`Switzerland rows (source prefix) : ${sw.length}`);

// Expected total after the 125 base + 125 expansion rows land on the current 13,072.
ok(rows.length === 13072, `expected 13072 live rows, found ${rows.length}`);
ok(sw.length === 250, `expected 250 Switzerland rows, found ${sw.length}`);

let badToken = 0, badTokenMatch = 0, badRegion = 0, foreignSrc = 0, shared = 0, badDiaspora = 0;
for (const r of sw) {
  const words = fold(r.name_ar).trim().split(/\s+/).map((w) => w.replace(/^ال/, '')).filter((w) => ALL_TOKENS.has(w));
  if (words.length !== 1) badToken++;
  else if (words[0] !== REGION_TOKEN[r.region]) badTokenMatch++;
  if (!SWISS_REGIONS.has(r.region)) badRegion++;
  if (r.region === 'asian_shared') shared++;
  if (!(r.source ?? '').startsWith(SOURCE)) foreignSrc++;
  const dp = r.diaspora_priority;
  if (!Array.isArray(dp)) { badDiaspora++; continue; }
  const extra = EXPECTED_REGION_DIASPORA[r.region];
  const want = extra ? ['swiss', 'western', 'comfort_food', extra] : ['swiss', 'western', 'comfort_food'];
  if (want.some((t) => !dp.includes(t)) || dp.length !== want.length) badDiaspora++;
}
ok(badToken === 0, `${badToken} row(s) without exactly 1 Swiss demonym`);
ok(badTokenMatch === 0, `${badTokenMatch} row(s) whose demonym does not match its region`);
ok(badRegion === 0, `${badRegion} row(s) outside the Swiss region set`);
ok(shared === 0, `${shared} Switzerland row(s) in asian_shared (must be 0)`);
ok(foreignSrc === 0, `${foreignSrc} row(s) with a foreign source prefix`);
ok(badDiaspora === 0, `${badDiaspora} row(s) with wrong diaspora_priority`);
console.log(`bad demonym count                 : ${badToken}`);
console.log(`demonym/region mismatch           : ${badTokenMatch}`);
console.log(`asian_shared Switzerland rows      : ${shared}`);
console.log(`wrong diaspora_priority           : ${badDiaspora}`);

const byRegion = {};
for (const r of sw) byRegion[r.region] = (byRegion[r.region] || 0) + 1;
console.log(`distinct regions used             : ${Object.keys(byRegion).length} / 13`);
console.log(`region distribution               : ${JSON.stringify(byRegion)}`);
ok(Object.keys(byRegion).length === 13, `only ${Object.keys(byRegion).length}/13 regions used`);

let drift = 0, not100 = 0;
for (const r of sw) {
  const expect = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  if (r.cal_100 !== expect) drift++;
  const isBev =
    /\b(?:water|tea|coffee|juice|lemonade|cordial|squash|schorle)\b/i.test(r.name_en ?? '') ||
    (r.name_ar ?? '').includes('شاي') ||
    (r.name_ar ?? '').includes('ماء');
  const isSeasoning =
    /\b(?:salt|pepper|spice|spices|seasoning|seasonings)\b/i.test(r.name_en ?? '') ||
    (r.name_ar ?? '').includes('ملح') ||
    (r.name_ar ?? '').includes('فلفل') ||
    (r.name_ar ?? '').includes('بهارات') ||
    (r.name_ar ?? '').includes('توابل');
  if (r.protein + r.carbs + r.fat <= 0 && !isBev && !isSeasoning) not100++;
}
ok(drift === 0, `${drift} row(s) with Atwater drift`);
ok(not100 === 0, `${not100} row(s) with no macros`);
console.log(`Atwater drift rows                : ${drift}`);

const LANG = ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de'];
let missingLang = 0, latinAr = 0, sameAsAr = 0, corrupt = 0;
for (const r of sw) {
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
const swDups = dups.filter(([k]) => k.split(/\s+/).some((w) => ALL_TOKENS.has(w.replace(/^ال/, ''))));
ok(swDups.length === 0, `${swDups.length} duplicated Swiss Arabic name(s)`);
console.log(`duplicate Swiss names             : ${swDups.length}`);

// Halal: five groups. Liver and game get no qualifier escape, matching
// scripts/switzerland-halal-scan.cjs, so a "beef liverwurst" would also fail.
// Only pork is excused, which is how Beef Cervelat / Beef Speck / Beef Bratwurst
// pass.
const BANNED = {
  pork: ['خنزير', 'لحم الخنزير', 'شحم الخنزير', 'دهن الخنزير', 'جامبون',
    'pork', 'bacon', 'lard', 'ham', 'gammon', 'chorizo', 'suet', 'pig', 'swine', 'hog',
    'porc', 'jambon', 'cerdo', 'tocino', 'jamón', 'morcilla',
    'schwein', 'schweinefleisch', 'schweinshaxe', 'speck', 'schinken', 'pancetta',
    'bratwurst', 'kaminwurst', 'cervelat', 'landjäger', 'landjager', 'bauernspeck', 'kugelwurst'],
  alcohol: ['كحول', 'خمر', 'نبيذ', 'بيرة', 'ويسكي', 'بوربون', 'براندي', 'روم', 'فودكا',
    'ساكي', 'جين', 'شيري', 'بورت', 'سابير', 'شربت',
    'alcohol', 'beer', 'wine', 'whiskey', 'whisky', 'bourbon', 'brandy', 'rum', 'vodka',
    'sake', 'cider', 'lager', 'stout', 'porter', 'mead', 'liquor', 'spirits', 'sherry',
    'gin', 'vermouth', 'schnapps', 'perry', 'kirsch', 'absinthe', 'cognac',
    'bière', 'vin', 'biere', 'cerveza', 'vino', 'kirschwasser',
    'bier', 'weissbier', 'weißbier', 'bockbier', 'radler', 'weisswein', 'weißwein',
    'eiswein', 'glühwein', 'schlüpfer', 'schluck', 'schnaps', 'obstler',
    'branntwein', 'weinbrand', 'sekt', 'champagner', 'prosecco', 'likör', 'liqueur',
    'apfelwein', 'rübel', 'ruebel',
    'chasselas', 'riesling', 'savagnin', 'syrah', 'chardonnay', 'pinot noir'],
  blood: ['دم', 'دمية', 'خ الدم', 'black pudding', 'blood sausage', 'boudin noir', 'blutwurst', 'blut'],
  liver: ['كبد', 'كبدة', 'liver', 'liverwurst', 'liver sausage', 'foie', 'foie gras', 'hígado',
    'leber', 'leberwurst', 'leberkäse', 'leberkase', 'leberknödel', 'leberkuchen'],
  game: ['غزال', 'أرنب', 'خنزير بري', 'ديك بري', 'ظبي', 'نورس',
    'venison', 'rabbit', 'hare', 'wild boar', 'wild duck', 'pheasant', 'quail',
    'grouse', 'moose', 'elk', 'chamois', 'caille', 'lièvre', 'boar', 'reindeer',
    'hirsch', 'reh', 'rehbock', 'hasenbraten', 'hase', 'hasen', 'kaninchen',
    'wildschwein', 'wildente', 'fasan', 'rebhuhn', 'elch', 'gams', 'gamsfleisch',
    'wildbret', 'steinbock'],
};
const HALAL_QUALIFIERS = [
  'لحم البقر', 'لحم العجل', 'دجاج', 'ديك رومي', 'لحم الضأن', 'سمك', 'تونة', 'سلمون',
  'روبيان', 'جمبري', 'توفو', 'خضار', 'نباتي', 'حلال',
  'beef', 'veal', 'chicken', 'turkey', 'lamb', 'fish', 'salmon', 'tuna', 'shrimp',
  'prawn', 'tofu', 'vegetable', 'vegan', 'plant-based', 'halal',
  'rind', 'rinder', 'rindfleisch', 'kalb', 'kalbs', 'huhn', 'hühner', 'hähnchen',
  'pute', 'puten', 'truthahn', 'trute', 'lamm', 'lammfleisch', 'fisch', 'seefisch',
  'lachs', 'garnelen', 'gemüse', 'gemuese', 'vegetarisch', 'pflanzlich',
];
const isAppleCider = (hay) => /\bapple\b/i.test(hay) || hay.includes('تفاح') || /apfel/i.test(hay);
const isFruitDrink = (hay) => /\b(?:fruit|saft|juice|schorle|nebel|limonade)\b/i.test(hay);
const isKirschbaum = (hay) => /kirschbaum/i.test(hay);
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
for (const r of sw) {
  const names = [r.name_ar, r.name_en, r.name_fr, r.name_es, r.name_de].filter((n) => typeof n === 'string');
  const hay = names.join(' ');
  const qual = HALAL_QUALIFIERS.some((q) => hasWord(hay, q));
  for (const [cat, words] of Object.entries(BANNED)) {
    for (const w of words) {
      if (!w) continue;
      const matchingNames = names.filter((name) => hasWord(name, w));
      if (!matchingNames.length) continue;
      // Only pork gets the qualifier / negation escape.
      if (cat === 'pork' && matchingNames.every((name) => isNegatedPork(name, w))) continue;
      if (cat === 'pork' && qual) continue;
      if (w === 'cider' && isAppleCider(hay)) continue;
      if (w === 'perry' && isAppleCider(hay)) continue;
      if ((w === 'bier' || w === 'rübel' || w === 'ruebel') && isFruitDrink(hay)) continue;
      if (w === 'kirsch' && isKirschbaum(hay)) continue;
      fails.push(`halal: ${cat} "${w}" in "${r.name_en}"`);
      halal++;
    }
  }
}
ok(halal === 0, `${halal} halal violation(s)`);
console.log(`halal violations                  : ${halal}`);

let noMeal = 0;
for (const r of sw) if (!(r.meal_type ?? '').trim()) noMeal++;
ok(noMeal === 0, `${noMeal} row(s) with a blank meal_type`);
console.log(`blank meal_type                   : ${noMeal}`);

let noDiaspora = 0;
const diasporaCounts = {};
for (const r of sw) {
  const dp = r.diaspora_priority;
  if (!Array.isArray(dp) || dp.length < 3) { noDiaspora++; continue; }
  for (const t of dp) diasporaCounts[t] = (diasporaCounts[t] || 0) + 1;
}
ok(noDiaspora === 0, `${noDiaspora} row(s) without diaspora_priority`);
console.log(`rows without diaspora             : ${noDiaspora}`);
console.log(`diaspora tag breakdown            : ${JSON.stringify(diasporaCounts)}`);

console.log('\n' + (fails.length ? `FAIL (${fails.length}):` : 'ALL SWITZERLAND ACCEPTANCE CHECKS PASSED'));
for (const f of fails) console.log(`  - ${f}`);
if (fails.length) process.exitCode = 1;