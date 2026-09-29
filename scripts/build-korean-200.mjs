// Korean expansion 200 builder + validator.
// Generates scripts/korean-expansion-200-proposal.json (the migration input).
// kcal is COMPUTED as round(4P + 4C + 9F) so the set is Atwater-consistent by
// construction; it is never hand-typed.
//
// Usage: node scripts/build-korean-200.mjs
import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { T } from './korean-data/rows.mjs';
import p1 from './korean-data/part1.mjs';
import p2 from './korean-data/part2.mjs';
import p3 from './korean-data/part3.mjs';
import p4 from './korean-data/part4.mjs';
import p5 from './korean-data/part5.mjs';
import p6 from './korean-data/part6.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TARGET = 200;
const TOKEN = T;
const REGIONS = new Set([
  'pan_korean', 'asian_shared',
  'seoul', 'busan', 'jeju', 'jeonju', 'andong', 'goryeong', 'gangneung',
  'incheon', 'daegu', 'gwangju', 'daejeon', 'ulsan', 'suwon', 'chuncheon',
  'mokpo', 'yeosu', 'pohang', 'gyeongju', 'tongyeong', 'sunchang', 'boseong', 'namhae',
]);
const MEALS = new Set(['breakfast', 'lunch', 'dinner', 'snacks', 'side', 'salad', 'fruit']);
const COOKS = new Set(['steamed', 'simmered', 'grilled', 'pan-fried', 'raw', 'stir-fried', 'griddled', 'fermented', 'brewed', 'fried']);
const LANG_FIELDS = ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe'];

const parts = [p1, p2, p3, p4, p5, p6];
const dishes = parts.flat();
const errors = [];

// ---- shape / count -------------------------------------------------------
if (dishes.length !== TARGET) errors.push(`Expected ${TARGET} dishes, got ${dishes.length}`);

dishes.forEach((d, i) => {
  const where = `#${i + 1} ${d.nameEn || '(no english name)'}`;
  if (d.grams !== 100) errors.push(`${where}: grams must be 100, got ${d.grams}`);
  const expected = Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat);
  if (d.kcal !== expected) errors.push(`${where}: kcal ${d.kcal} != Atwater ${expected}`);
  for (const f of LANG_FIELDS) {
    if (typeof d[f] !== 'string' || !d[f].trim()) errors.push(`${where}: ${f} is empty`);
  }
  if (!MEALS.has(d.mealType)) errors.push(`${where}: bad mealType "${d.mealType}"`);
  if (!COOKS.has(d.cooking)) errors.push(`${where}: bad cooking "${d.cooking}"`);
  if (!REGIONS.has(d.region)) errors.push(`${where}: bad region "${d.region}"`);
  if (d.protein < 0 || d.carbs < 0 || d.fat < 0) errors.push(`${where}: negative macro`);
  if (!d.nameAr.includes('كوري')) errors.push(`${where}: Arabic name missing "كوري"`);
  if (/[A-Za-z]/.test(d.nameAr)) errors.push(`${where}: Latin in Arabic name "${d.nameAr}"`);
  if (/[\uAC00-\uD7AF\u3040-\u30FF\u2E80-\u9FFF]/.test(d.nameAr)) errors.push(`${where}: CJK/Hangul in Arabic name "${d.nameAr}"`);
  for (const f of LANG_FIELDS) {
    if (/[\uAC00-\uD7AF\u3040-\u30FF\u2E80-\u9FFF\uFF01-\uFF5E]/.test(d[f])) errors.push(`${where}: CJK/fullwidth in ${f}`);
    if (d[f].includes('\uFFFD')) errors.push(`${where}: replacement char in ${f}`);
  }
});

// ---- duplicates (in-set and vs base) ------------------------------------
const base = JSON.parse(readFileSync(join(ROOT, 'scripts', 'korean-200-proposal.json'), 'utf8')).dishes;
const seenAr = new Map();
const seenEn = new Map();
base.forEach((d) => {
  seenAr.set(d.name_ar.trim(), d.name_en);
  seenEn.set(d.name_en.trim().toLowerCase(), d.name_en);
});
for (const d of dishes) {
  const ar = d.nameAr.trim();
  const en = d.nameEn.trim().toLowerCase();
  if (seenAr.has(ar)) errors.push(`Duplicate nameAr (base/set) "${ar}": "${seenAr.get(ar)}" and "${d.nameEn}"`);
  else seenAr.set(ar, d.nameEn);
  if (seenEn.has(en)) errors.push(`Duplicate nameEn (base/set) "${en}": "${seenEn.get(en)}" and "${d.nameEn}"`);
  else seenEn.set(en, d.nameEn);
}

// ---- halal ---------------------------------------------------------------
const PORK_NOUN = /\b(pork|ham|bacon|spam|chorizo|lardo|jambon)\b/i;
const AMBIG_PROTEIN = /\b(sausage|blood sausage|offal|intestines)\b/i;
const HALAL_QUALIFIER = /\b(beef|cattle|chicken|poultry|turkey|lamb|fish|salmon|crab|shrimp|prawn|tofu|mushroom|vegetable|plant|beet)\b/i;
const ALCOHOL = /\b(soju|makgeolli|beer|wine|vodka|whisky|whiskey|sake|brandy|rum|liqueur|soiree|alcool|alcoh|cerveza|vino|bier|wein|막걸리|소주)\b/i;
const ALCOHOL_AR = /(?:^|\s)(?:كحول|نبيذ|الكحول)(?:$|\s)/;

for (const d of dishes) {
  for (const f of LANG_FIELDS) {
    const v = d[f];
    if (PORK_NOUN.test(v)) errors.push(`HALAL pork token in ${f} of "${d.nameEn}": "${v}"`);
    if (AMBIG_PROTEIN.test(v) && !HALAL_QUALIFIER.test(v)) errors.push(`HALAL unqualified protein "${v}" in ${f} of "${d.nameEn}"`);
    if (ALCOHOL.test(v)) errors.push(`HALAL alcohol token in ${f} of "${d.nameEn}": "${v}"`);
  }
  if (d.nameAr.includes('خنزير')) errors.push(`HALAL pork in Arabic name "${d.nameAr}"`);
  if (d.nameAr.includes('소주') || d.nameAr.includes('막걸리')) errors.push(`HALAL alcohol (hangul) in Arabic name "${d.nameAr}"`);
  if (ALCOHOL_AR.test(d.nameAr)) errors.push(`HALAL alcohol in Arabic name "${d.nameAr}"`);
}

// ---- report --------------------------------------------------------------
const byCat = {};
const byRegion = {};
for (const d of dishes) {
  byCat[d.category] = (byCat[d.category] || 0) + 1;
  byRegion[d.region] = (byRegion[d.region] || 0) + 1;
}
if (errors.length) {
  console.error(`\nFAIL: ${errors.length} validation error(s)\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log(`\nKorean expansion: ${dishes.length} dishes OK`);
console.log(`  token: ${TOKEN}`);
console.log(`  categories: ${Object.entries(byCat).map(([k, v]) => `${k}=${v}`).join(' ')}`);
console.log(`  regions: ${Object.entries(byRegion).map(([k, v]) => `${k}=${v}`).join(' ')}`);

// ---- emit ----------------------------------------------------------------
const out = dishes.map((d) => ({
  name_ar: d.nameAr,
  name_en: d.nameEn,
  name_fr: d.nameFr,
  name_es: d.nameEs,
  name_de: d.nameDe,
  category: d.category,
  mealType: d.mealType,
  region: d.region,
  cal_100: d.kcal,
  protein: d.protein,
  carbs: d.carbs,
  fat: d.fat,
  source: 'asia-korea-2026 - Verified against Korean culinary heritage',
}));
writeFileSync(join(ROOT, 'scripts', 'korean-expansion-200-proposal.json'), JSON.stringify({ dishes: out }, null, 2) + '\n', 'utf8');
console.log(`  wrote scripts/korean-expansion-200-proposal.json`);
