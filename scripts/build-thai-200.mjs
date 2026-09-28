// Thai 200-dish expansion builder.
// Aggregates the part files, validates them, and writes scripts/thai-200-proposal.json.
// READ-ONLY with respect to Supabase: this script never touches the database.
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

const PARTS = [
  'part1.mjs', 'part2.mjs', 'part3.mjs', 'part4a.mjs', 'part4b.mjs',
  'part5a1.mjs', 'part5a2.mjs', 'part5a3.mjs', 'part5a4.mjs',
  'part5b1.mjs', 'part5b2.mjs', 'part5b3.mjs', 'part5b4.mjs', 'part5b5.mjs', 'part5b6.mjs',
];

const rows = [];
for (const p of PARTS) {
  const mod = await import(new URL(`./thai-data/${p}`, import.meta.url));
  rows.push(...mod.default);
}

const errors = [];
const push = (m) => errors.push(m);

// --- expected category counts -------------------------------------------------
const EXPECT_CAT = {
  breakfast_items: 16, rice_dishes: 20, noodle_dishes: 22, soups_stews: 18,
  poultry_mains: 18, meat_mains: 18, fish_seafood: 22, vegetable_mains: 14,
  banana_coconut: 10, rice_cakes_sweets: 14, street_snacks: 14,
  condiments_sauces: 8, beverages: 6,
};
// --- expected region counts ---------------------------------------------------
const EXPECT_REGION = {
  pan_thai: 120, chiang_mai: 14, isan: 14, bangkok: 12, phuket: 10,
  krabi: 8, pattaya: 8, songkhla: 6, hua_hin: 4, asian_shared: 4,
};

if (rows.length !== 200) push(`row count is ${rows.length}, expected 200`);

const byCat = {};
const byRegion = {};
for (const r of rows) {
  byCat[r.category] = (byCat[r.category] || 0) + 1;
  byRegion[r.region] = (byRegion[r.region] || 0) + 1;
}
for (const [c, n] of Object.entries(EXPECT_CAT)) {
  if ((byCat[c] || 0) !== n) push(`category ${c}: ${byCat[c] || 0}, expected ${n}`);
}
for (const c of Object.keys(byCat)) {
  if (!(c in EXPECT_CAT)) push(`unexpected category ${c}`);
}
for (const [g, n] of Object.entries(EXPECT_REGION)) {
  if ((byRegion[g] || 0) !== n) push(`region ${g}: ${byRegion[g] || 0}, expected ${n}`);
}
for (const g of Object.keys(byRegion)) {
  if (!(g in EXPECT_REGION)) push(`unexpected region ${g}`);
}

// --- per-row checks -----------------------------------------------------------
const LATIN = /[A-Za-z]/;
// Latin-script fields must not contain Arabic or Thai script characters
const NON_LATIN_SCRIPT = /[\u0600-\u06FF\u0750-\u077F\u0E00-\u0E7F]/;
const PORK = /(pork| свинина|cerdo|schwein| Schweine|หมู|สามีเนื้อ)/i;
const ALCOHOL = /(beer|wine|rum|vodka|whisky|whiskey|酒|.alert|biere|cerveza|bier|wein| Alkohol)/i;
const seenEn = new Map();
const seenAr = new Map();

for (const [i, r] of rows.entries()) {
  const tag = `#${i + 1} ${r.name_en || '?'}`;

  for (const k of ['name_ar', 'name_en', 'name_fr', 'name_es', 'name_de']) {
    if (!r[k] || typeof r[k] !== 'string' || !r[k].trim()) push(`${tag}: missing ${k}`);
  }
  if (r.name_ar && LATIN.test(r.name_ar)) push(`${tag}: Latin chars in name_ar -> ${r.name_ar}`);
  if (r.name_ar && /[\uFFFD]/.test(r.name_ar)) push(`${tag}: replacement char in name_ar -> ${r.name_ar}`);

  // Arabic must carry the authenticity token
  if (r.name_ar && !r.name_ar.includes('تايلندي')) push(`${tag}: name_ar missing تايلندي -> ${r.name_ar}`);
  // must not be a doubled token
  const tokenCount = (r.name_ar.match(/تايلندي/g) || []).length;
  if (tokenCount !== 1) push(`${tag}: تايلندي appears ${tokenCount} times -> ${r.name_ar}`);
  if (r.name_ar && !r.name_ar.endsWith('تايلندي أصيل')) push(`${tag}: name_ar must end with "تايلندي أصيل" -> ${r.name_ar}`);

  // Latin-script fields must not contain the token
  for (const k of ['name_en', 'name_fr', 'name_es', 'name_de']) {
    if (r[k] && NON_LATIN_SCRIPT.test(r[k])) push(`${tag}: ${k} contains Arabic/Thai script -> ${r[k]}`);
  }

  // halal
  if (PORK.test(r.name_en) || PORK.test(r.name_ar)) push(`${tag}: pork reference`);
  if (ALCOHOL.test(r.name_en)) push(`${tag}: alcohol reference -> ${r.name_en}`);

  // macros
  for (const k of ['protein', 'carbs', 'fat']) {
    if (typeof r[k] !== 'number' || Number.isNaN(r[k])) push(`${tag}: ${k} not a number`);
  }
  if (r.protein > 40) push(`${tag}: protein ${r.protein} out of range`);
  if (r.carbs > 50) push(`${tag}: carbs ${r.carbs} out of range`);
  if (r.fat > 30) push(`${tag}: fat ${r.fat} out of range`);
  if (r.protein < 0 || r.carbs < 0 || r.fat < 0) push(`${tag}: negative macro`);

  // Atwater
  const expect = Math.round(4 * r.protein + 4 * r.carbs + 9 * r.fat);
  if (r.cal_100 !== expect) push(`${tag}: kcal ${r.cal_100} != Atwater ${expect}`);
  if (r.cal_100 < 0 || r.cal_100 > 900) push(`${tag}: kcal ${r.cal_100} out of range`);

  // meal type
  if (!['breakfast', 'lunch', 'dinner', 'snacks'].includes(r.mealType)) push(`${tag}: bad mealType ${r.mealType}`);

  // duplicates (English + Arabic)
  const ek = (r.name_en || '').toLowerCase().trim();
  const ak = (r.name_ar || '').trim();
  if (seenEn.has(ek)) push(`${tag}: duplicate name_en "${ek}" (also #${seenEn.get(ek)})`);
  else seenEn.set(ek, i + 1);
  if (seenAr.has(ak)) push(`${tag}: duplicate name_ar (also #${seenAr.get(ak)})`);
  else seenAr.set(ak, i + 1);
}

// --- report -------------------------------------------------------------------
console.log('rows:', rows.length);
console.log('categories:', JSON.stringify(byCat, null, 0));
console.log('regions:', JSON.stringify(byRegion, null, 0));
const meal = {};
for (const r of rows) meal[r.mealType] = (meal[r.mealType] || 0) + 1;
console.log('meal types:', JSON.stringify(meal, null, 0));

if (errors.length) {
  console.log('\nFAILED with ' + errors.length + ' error(s):');
  for (const e of errors) console.log(' -', e);
  process.exit(1);
}

const out = {
  kitchen: 'thai',
  phase: 'expansion',
  count: rows.length,
  generated_at: new Date().toISOString(),
  by_category: byCat,
  by_region: byRegion,
  by_meal_type: meal,
  dishes: rows.map((r, i) => ({ id: i + 1, ...r })),
};
const target = resolve(HERE, 'thai-200-proposal.json');
writeFileSync(target, JSON.stringify(out, null, 2), 'utf8');
console.log('\nOK: wrote', target);
