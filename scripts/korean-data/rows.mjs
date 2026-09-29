// Shared row helper for the premium Korean expansion 200.
// kcal is COMPUTED (never hand-typed): cal = round(4P + 4C + 9F).
//
// Token choice: MASCULINE 'كوري' only (no feminine 'كورية'), same reasoning as
// scripts/korean-base-data/rows.mjs: the feminine form would collide with a
// pre-existing Thai curry row and reject one of Thailand's own 300 dishes.
// Expansion names carry 'كوري أصيل' (the token 'كوري' still resolves them).
//
// Every row also declares its region tag: pan_korean (general), a regional anchor
// (seoul, busan, jeju, jeonju, ...) or asian_shared. When in doubt -> pan_korean.
export const T = 'كوري أصيل';

// name_ar, name_en, name_fr, name_es, name_de, category, mealType, P, C, F, cooking, region
export const E = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, protein, carbs, fat, cooking, region) => ({
  id: '',
  nameAr: name_ar,
  nameEn: name_en,
  nameFr: name_fr,
  nameEs: name_es,
  nameDe: name_de,
  category,
  mealType,
  grams: 100,
  kcal: Math.round(4 * protein + 4 * carbs + 9 * fat),
  protein,
  carbs,
  fat,
  cooking,
  region,
});
