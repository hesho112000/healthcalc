// Vietnamese base 100 builder (premium re-authoring).
// Aggregates scripts/vietnamese-base-data/part*.mjs, validates them, and writes:
//   - src/data/vietnamese-full.ts           (app data file, VietnameseFullDish shape preserved)
//   - scripts/vietnamese-100-proposal.json   (proposal/migration source)
// READ-ONLY with respect to Supabase.
// kcal is COMPUTED, never hand-typed: round(4P + 4C + 9F).
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const PARTS = [
  'part1.mjs', 'part2.mjs', 'part3.mjs', 'part4.mjs', 'part5.mjs', 'part6.mjs',
];

const rows = [];
for (const p of PARTS) {
  const mod = await import(new URL('./vietnamese-base-data/' + p, import.meta.url));
  rows.push(...mod.default);
}

const ERRORS = [];
const PUSH = (m) => ERRORS.push(m);

const EXPECT_CAT = {
  breakfast_items: 8, rice_dishes: 12, noodle_dishes: 14, soups_stews: 12,
  poultry_mains: 10, meat_mains: 18, fish_seafood: 17, vegetable_mains: 0,
  banana_coconut: 2, rice_cakes_sweets: 7, street_snacks: 0,
  condiments_sauces: 0, beverages: 0,
};

const CAT_COUNT = {};
for (const r of rows) {
  CAT_COUNT[r.category] = (CAT_COUNT[r.category] || 0) + 1;
}

for (const cat of Object.keys(EXPECT_CAT)) {
  const expected = EXPECT_CAT[cat];
  const got = CAT_COUNT[cat] || 0;
  if (got !== expected) PUSH('Category ' + cat + ': expected ' + expected + ', got ' + got);
}

for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  const n = String(i + 1);
  if (!r.nameAr) PUSH(n + ': missing nameAr');
  if (!r.nameEn) PUSH(n + ': missing nameEn');
  if (!r.nameFr) PUSH(n + ': missing nameFr');
  if (!r.nameEs) PUSH(n + ': missing nameEs');
  if (!r.nameDe) PUSH(n + ': missing nameDe');
  if (!r.category) PUSH(n + ': missing category');
  if (!r.mealType) PUSH(n + ': missing mealType');
  if (!r.protein && r.protein !== 0) PUSH(n + ': missing protein');
  if (!r.carbs && r.carbs !== 0) PUSH(n + ': missing carbs');
  if (!r.fat && r.fat !== 0) PUSH(n + ': missing fat');
  if (!r.grams && r.grams !== 0) PUSH(n + ': missing grams');
  if (r.grams !== 100) PUSH(n + ': grams must be 100');
  if (r.kcal !== Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat)) PUSH(n + ': Atwater mismatch (kcal)');
}

if (ERRORS.length) {
  console.error('');
  console.error('===== VIETNAMESE BASE 2026 BUILD FAILED =====');
  ERRORS.forEach(e => console.error('Error: ' + e));
  process.exit(1);
}

const PROPOSAL = {
  id: 'vietnam-2026',
  name: 'Vietnam 2026',
  cuisine: 'vietnamese',
  language: 'ar,en,fr,es,de',
  premium: true,
  timestamp: new Date().toISOString(),
  dishes: rows.map(r => ({
    name_ar: r.nameAr,
    name_en: r.nameEn,
    name_fr: r.nameFr,
    name_es: r.nameEs,
    name_de: r.nameDe,
    category: r.category,
    mealType: r.mealType,
    region: 'pan_vietnamese',
    cal_100: r.kcal,
    protein: r.protein,
    carbs: r.carbs,
    fat: r.fat,
    grams: r.grams,
    source: 'المطبخ الفيتنامي التقليدي - أرقام محسوبة',
  })).sort((a, b) => a.name_ar.localeCompare(b.name_ar, 'ar')),
};

const OUT_DIR = resolve(HERE, '../src/data');
const OUT_TS = resolve(OUT_DIR, 'vietnamese-full.ts');
const OUT_JSON = resolve(HERE, 'vietnamese-100-proposal.json');

const TS_CONTENT = '// Vietnamese Full Dishes (premium 100)\n' +
  '// Generated automatically from scripts/vietnamese-base-data/part*.mjs\n' +
  '// Do not edit manually. To re-author, modify the .mjs source parts.\n\n' +
  "import type { VietnameseFullDish } from '../types';\n\n" +
  'export const VIETNAMESE_FULL: VietnameseFullDish[] = ' + JSON.stringify(rows, null, 2) + ';\n';

writeFileSync(OUT_TS, TS_CONTENT);
writeFileSync(OUT_JSON, JSON.stringify(PROPOSAL, null, 2));

console.log('');
console.log('===== VIETNAMESE BASE 2026 BUILD SUCCESS =====');
console.log('Rows: ' + rows.length);
console.log('App file written: ' + OUT_TS);
console.log('Proposal written: ' + OUT_JSON);
