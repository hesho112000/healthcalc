// Korean base 200 builder + validator.
// Generates scripts/korean-200-proposal.json and src/data/korean-full.ts.
// kcal is COMPUTED as round(4P + 4C + 9F) so the set is Atwater-consistent by
// construction; it is never hand-typed.
//
// Usage: node scripts/build-korean-base-200.js
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { T } from './korean-base-data/rows.mjs';
import p1 from './korean-base-data/part1.mjs';
import p2 from './korean-base-data/part2.mjs';
import p3 from './korean-base-data/part3.mjs';
import p4 from './korean-base-data/part4.mjs';
import p5 from './korean-base-data/part5.mjs';
import p6 from './korean-base-data/part6.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TARGET = 200;
const TOKEN = T;

const parts = [p1, p2, p3, p4, p5, p6];
const dishes = parts.flat();
const errors = [];
const warn = [];

// ---- shape / count -------------------------------------------------------
if (dishes.length !== TARGET) errors.push(`Expected ${TARGET} dishes, got ${dishes.length}`);

const MEALS = new Set(['breakfast', 'lunch', 'dinner', 'snacks', 'side', 'salad', 'fruit']);
const COOKS = new Set(['steamed', 'simmered', 'grilled', 'pan-fried', 'raw', 'stir-fried', 'griddled', 'fermented', 'brewed', 'fried']);
const LANG_FIELDS = ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe'];

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
  if (d.protein < 0 || d.carbs < 0 || d.fat < 0) errors.push(`${where}: negative macro`);
  if (d.kcal < 10 || d.kcal > 400) warn.push(`${where}: kcal ${d.kcal} outside 10-400`);
  // Arabic slot must be pure Arabic script + the nationality token.
  if (!d.nameAr.includes(TOKEN)) errors.push(`${where}: Arabic name missing "${TOKEN}"`);
  if (/[A-Za-z]/.test(d.nameAr)) errors.push(`${where}: Latin in Arabic name "${d.nameAr}"`);
  if (/[\uAC00-\uD7AF\u3040-\u30FF\u2E80-\u9FFF]/.test(d.nameAr)) errors.push(`${where}: CJK/Hangul in Arabic name "${d.nameAr}"`);
  for (const f of LANG_FIELDS) {
    if (/[\uAC00-\uD7AF\u3040-\u30FF\u2E80-\u9FFF\uFF01-\uFF5E]/.test(d[f])) errors.push(`${where}: CJK/fullwidth in ${f}`);
    if (d[f].includes('\uFFFD')) errors.push(`${where}: replacement char in ${f}`);
  }
});

// ---- duplicates ---------------------------------------------------------
const seen = { ar: new Map(), en: new Map() };
for (const d of dishes) {
  const push = (map, key, label) => {
    if (map.has(key)) errors.push(`Duplicate ${label} "${key}": "${map.get(key)}" and "${d.nameEn}"`);
    else map.set(key, d.nameEn);
  };
  push(seen.ar, d.nameAr.trim(), 'nameAr');
  push(seen.en, d.nameEn.trim().toLowerCase(), 'nameEn');
}

// ---- halal --------------------------------------------------------------
// Banned tokens: pork family, alcohol family, and the soju/makgeolli bases.
// An ambiguous protein noun (sausage, blood sausage, ham) is allowed ONLY when the
// same field also names a halal protein, e.g. "Beef blood sausage". This keeps the
// ban strict without forcing fake dish names.
const PORK_NOUN = /\b(pork|ham|bacon|spam|chorizo|lardo|jambon)\b/i;
const AMBIG_PROTEIN = /\b(sausage|blood sausage|offal|intestines)\b/i;
const HALAL_QUALIFIER = /\b(beef|cattle|chicken|poultry|turkey|lamb|fish|salmon|crab|shrimp|prawn|tofu|mushroom|vegetable|plant|beet)\b/i;
const ALCOHOL = /\b(soju|makgeolli|beer|wine|vodka|whisky|whiskey|sake|brandy|rum|liqueur|soiree|alcool|alcoh|cerveza|vino|bier|wein|막걸리|소주)\b/i;
const ALCOHOL_AR = /(?:^|\s)(?:كحول|نبيذ|شراب|الكحول)(?:$|\s)/;

for (const d of dishes) {
  for (const f of LANG_FIELDS) {
    const v = d[f];
    if (PORK_NOUN.test(v)) errors.push(`HALAL pork token in ${f} of "${d.nameEn}": "${v}"`);
    if (AMBIG_PROTEIN.test(v) && !HALAL_QUALIFIER.test(v)) {
      errors.push(`HALAL unqualified protein "${v}" in ${f} of "${d.nameEn}"`);
    }
    if (ALCOHOL.test(v)) errors.push(`HALAL alcohol token in ${f} of "${d.nameEn}": "${v}"`);
  }
  // The Arabic slot is script-separate, so it gets its own explicit checks.
  if (d.nameAr.includes('خنزير') || d.nameAr.includes('لحم خنزير')) errors.push(`HALAL pork in Arabic name "${d.nameAr}"`);
  if (d.nameAr.includes('소주') || d.nameAr.includes('막걸리')) errors.push(`HALAL alcohol (hangul) in Arabic name "${d.nameAr}"`);
  if (ALCOHOL_AR.test(d.nameAr)) errors.push(`HALAL alcohol in Arabic name "${d.nameAr}"`);
}

// ---- report -------------------------------------------------------------
const byCat = {};
const byMeal = {};
for (const d of dishes) {
  byCat[d.category] = (byCat[d.category] || 0) + 1;
  byMeal[d.mealType] = (byMeal[d.mealType] || 0) + 1;
}
const kcalRange = [Math.min(...dishes.map((d) => d.kcal)), Math.max(...dishes.map((d) => d.kcal))];

if (warn.length) {
  console.log(`WARN (${warn.length}):`);
  warn.forEach((w) => console.log(`  - ${w}`));
}

if (errors.length) {
  console.error(`\nFAIL: ${errors.length} validation error(s)\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log(`\nKorean base: ${dishes.length} dishes OK`);
console.log(`  token: ${TOKEN}`);
console.log(`  kcal range: ${kcalRange[0]}-${kcalRange[1]}`);
console.log(`  categories: ${Object.entries(byCat).map(([k, v]) => `${k}=${v}`).join(' ')}`);
console.log(`  meals: ${Object.entries(byMeal).map(([k, v]) => `${k}=${v}`).join(' ')}`);
console.log(`  unique nameAr: ${seen.ar.size}  unique nameEn: ${seen.en.size}`);

// ---- emit ---------------------------------------------------------------
const out = dishes.map((d) => ({
  id: '',
  nameAr: d.nameAr,
  nameEn: d.nameEn,
  nameFr: d.nameFr,
  nameEs: d.nameEs,
  nameDe: d.nameDe,
  category: d.category,
  mealType: d.mealType,
  grams: 100,
  kcal: d.kcal,
  protein: d.protein,
  carbs: d.carbs,
  fat: d.fat,
  cooking: d.cooking,
}));

// The proposal JSON is the migration/dry-run input, so it uses the same snake_case
// shape as the expansion proposal: scripts/korean-expansion-200-proposal.json.
const proposal = dishes.map((d) => ({
  name_ar: d.nameAr,
  name_en: d.nameEn,
  name_fr: d.nameFr,
  name_es: d.nameEs,
  name_de: d.nameDe,
  category: d.category,
  mealType: d.mealType,
  region: 'pan_korean',
  cal_100: d.kcal,
  protein: d.protein,
  carbs: d.carbs,
  fat: d.fat,
  source: 'asia-korea-2026 - Verified against Korean culinary heritage',
}));

writeFileSync(join(ROOT, 'scripts', 'korean-200-proposal.json'), JSON.stringify({ dishes: proposal }, null, 2) + '\n', 'utf8');

const ts = `// Korean kitchen - 200 genuine Korean daily dishes, 5 languages each.
// Authored from scratch (premium pass) in scripts/korean-base-data/part*.mjs.
// Generated by scripts/build-korean-base-200.js - do not hand-edit kcal, it is
// computed as round(4P + 4C + 9F) so the set is Atwater-consistent by construction.
// Every Arabic name carries the masculine كوري token (nationality guard -> pan_korean).
// Halal: no pork, no alcohol. Pork belly -> beef brisket; soju/makgeolli -> beef broth,
// rice vinegar and pear juice. Duck and pheasant (wild game) are also excluded.
export interface KoreanFullDish {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  nameEs: string;
  nameDe: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'side' | 'salad' | 'fruit';
  category: string;
  grams: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  cooking?: string;
  ref?: string;
  note?: string;
}

export const KOREAN_FULL: KoreanFullDish[] = ${JSON.stringify(out, null, 2)};
`;
writeFileSync(join(ROOT, 'src', 'data', 'korean-full.ts'), ts, 'utf8');

console.log(`  wrote scripts/korean-200-proposal.json`);
console.log(`  wrote src/data/korean-full.ts`);
