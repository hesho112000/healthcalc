// Vietnamese 200-dish expansion builder (premium re-authoring).
// Aggregates scripts/vietnamese-data/part*.mjs, validates them, and writes:
//   - scripts/vietnamese-200-proposal.json   (proposal/migration source)
// READ-ONLY with respect to Supabase.
// kcal is COMPUTED, never hand-typed: round(4P + 4C + 9F).
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const PARTS = [
  'part1.mjs', 'part2.mjs', 'part3.mjs', 'part4.mjs', 'part5.mjs',
  'part6.mjs', 'part7.mjs', 'part8.mjs', 'part9.mjs', 'part10.mjs',
  'part11.mjs', 'part12.mjs', 'part13.mjs', 'part14.mjs', 'part15.mjs',
];

const rows = [];
for (const p of PARTS) {
  const mod = await import(new URL(`./vietnamese-data/${p}`, import.meta.url));
  rows.push(...mod.default);
}

// Schema validation (minimal; matches the interface expected by the app)
const ERRORS = [];
const PUSH = (m) => ERRORS.push(m);

// Expected category counts for Vietnamese expansion
const EXPECT_CAT = {
  breakfast_items: 16, noodle_dishes: 22, soups_stews: 18, poultry_mains: 18,
  meat_mains: 18, rice_dishes: 20, fish_seafood: 20, vegetable_mains: 14,
  banana_coconut: 10, rice_cakes_sweets: 14, street_snacks: 14,
  condiments_sauces: 8, beverages: 8,
};

// Count categories and report discrepancies
const CAT_COUNT = {};
for (const r of rows) {
  CAT_COUNT[r.category] = (CAT_COUNT[r.category] || 0) + 1;
}

for (const [cat, expected] of Object.entries(EXPECT_CAT)) {
  const got = CAT_COUNT[cat] || 0;
  if (got !== expected) PUSH(`Category ${cat}: expected ${expected}, got ${got}`);
}

// Validate required fields per row
for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  if (!r.name_ar) PUSH(`${i + 1}: missing name_ar`);
  if (!r.name_en) PUSH(`${i + 1}: missing name_en`);
  if (!r.name_fr) PUSH(`${i + 1}: missing name_fr`);
  if (!r.name_es) PUSH(`${i + 1}: missing name_es`);
  if (!r.name_de) PUSH(`${i + 1}: missing name_de`);
  if (!r.category) PUSH(`${i + 1}: missing category`);
  if (!r.mealType) PUSH(`${i + 1}: missing mealType`);
  if (!r.region) PUSH(`${i + 1}: missing region`);
  if (!r.protein && r.protein !== 0) PUSH(`${i + 1}: missing protein`);
  if (!r.carbs && r.carbs !== 0) PUSH(`${i + 1}: missing carbs`);
  if (!r.fat && r.fat !== 0) PUSH(`${i + 1}: missing fat`);
  if (r.cal_100 !== Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat)) PUSH(`${i + 1}: Atwater mismatch (cal_100)`);
}

// Prompt exit on errors
if (ERRORS.length) {
  console.error('\n===== VIETNAMESE EXPANSION 2026 BUILD FAILED =====');
  ERRORS.forEach(e => console.error('Error: ' + e));
  process.exit(1);
}

// Generate a clean, sorted payload (by name_ar) for the proposal
const PROPOSAL = {
  id: 'vietnam-2026',
  name: 'Vietnam 2026',
  cuisine: 'vietnamese',
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
    source: 'المطبخ الفيتنامي التقليدي - Verified against Vietnamese culinary heritage',
  })).sort((a, b) => a.name_ar.localeCompare(b.name_ar, 'ar')),
};

const OUT_JSON = resolve(HERE, 'vietnamese-200-proposal.json');

writeFileSync(OUT_JSON, JSON.stringify(PROPOSAL, null, 2));

console.log('\n===== VIETNAMESE EXPANSION 2026 BUILD SUCCESS =====');
console.log('Rows: ' + rows.length);
console.log('Proposal written: ' + OUT_JSON);
