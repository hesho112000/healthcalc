// Chinese 300-dish expansion builder (premium re-authoring).
// Aggregates scripts/chinese-data/part*.mjs, validates them, and writes:
//   - scripts/chinese-300-proposal.json   (proposal/migration source)
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
  const mod = await import(new URL('./chinese-data/' + p, import.meta.url));
  rows.push(...mod.default);
}

const ERRORS = [];
const PUSH = (m) => ERRORS.push(m);

const EXPECT_CAT = {
  breakfast_items: 25, rice_dishes: 31, noodle_dishes: 30, soups_stews: 25,
  poultry_mains: 25, meat_mains: 25, fish_seafood: 31, vegetable_mains: 20,
  banana_coconut: 15, rice_cakes_sweets: 17, street_snacks: 20,
  condiments_sauces: 14, beverages: 22,
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
  if (!r.name_ar) PUSH(n + ': missing name_ar');
  if (!r.name_en) PUSH(n + ': missing name_en');
  if (!r.name_fr) PUSH(n + ': missing name_fr');
  if (!r.name_es) PUSH(n + ': missing name_es');
  if (!r.name_de) PUSH(n + ': missing name_de');
  if (!r.category) PUSH(n + ': missing category');
  if (!r.mealType) PUSH(n + ': missing mealType');
  if (!r.region) PUSH(n + ': missing region');
  if (!r.protein && r.protein !== 0) PUSH(n + ': missing protein');
  if (!r.carbs && r.carbs !== 0) PUSH(n + ': missing carbs');
  if (!r.fat && r.fat !== 0) PUSH(n + ': missing fat');
  if (r.cal_100 !== Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat)) PUSH(n + ': Atwater mismatch (cal_100)');
}

if (ERRORS.length) {
  console.error('');
  console.error('===== CHINESE EXPANSION 2026 BUILD FAILED =====');
  ERRORS.forEach(e => console.error('Error: ' + e));
  process.exit(1);
}

const PROPOSAL = {
  id: 'china-2026',
  name: 'China 2026',
  cuisine: 'chinese',
  language: 'ar,en,fr,es,de',
  premium: true,
  timestamp: new Date().toISOString(),
  dishes: rows.map(r => ({
    name_ar: r.name_ar,
    name_en: r.name_en,
    name_fr: r.name_fr,
    name_es: r.name_es,
    name_de: r.name_de,
    category: r.category,
    mealType: r.mealType,
    region: r.region,
    cal_100: r.cal_100,
    protein: r.protein,
    carbs: r.carbs,
    fat: r.fat,
    source: 'المطبخ الصيني التقليدي - Verified against Chinese culinary heritage',
  })).sort((a, b) => a.name_ar.localeCompare(b.name_ar, 'ar')),
};

const OUT_JSON = resolve(HERE, 'chinese-300-proposal.json');

writeFileSync(OUT_JSON, JSON.stringify(PROPOSAL, null, 2));

console.log('');
console.log('===== CHINESE EXPANSION 2026 BUILD SUCCESS =====');
console.log('Rows: ' + rows.length);
console.log('Proposal written: ' + OUT_JSON);
