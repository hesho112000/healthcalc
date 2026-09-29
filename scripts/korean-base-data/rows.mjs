// Shared row helper for the premium Korean base 200.
// kcal is COMPUTED (never hand-typed): cal = round(4P + 4C + 9F).
//
// Token choice: MASCULINE 'كوري' only (no feminine 'كورية').
// Reason: a pre-existing Thai row is named
//   'كاري على الطريقة الفيتنامية تايلندي أصيل' ("Vietnamese-style curry", pan_thai).
// If the feminine 'كورية' were registered in kitchenAuthenticity TOKEN_REGIONS, that Thai
// row would resolve to 'pan_korean' and hasForeignNationalityFor('thai', ...)
// would REJECT one of the Thai kitchen's own 300 dishes. Authoring every Korean name with
// the masculine 'كوري' keeps all 400 new rows mappable and leaves that Thai row untouched.
export const T = 'كوري';

// id, name_ar, name_en, name_fr, name_es, name_de, category, mealType, P, C, F, cooking
export const B = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, protein, carbs, fat, cooking) => ({
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
});