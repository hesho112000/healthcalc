// Shared row helper for the premium Chinese base 200.
// kcal is COMPUTED (never hand-typed): cal = round(4P + 4C + 9F).
//
// Token choice: MASCULINE Arabic adjective for "Chinese" only, no feminine variant.
// Reason: a pre-existing Thai row uses the feminine form. If the feminine variant were
// registered in kitchenAuthenticity TOKEN_REGIONS, that Thai row would resolve to
// 'pan_chinese' and hasForeignNationalityFor('thai', ...) would REJECT one of the Thai
// kitchen's own dishes. Authoring every Chinese name with the masculine token keeps
// all 500 new rows mappable and leaves that Thai row untouched.
export const T = 'صيني';

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
