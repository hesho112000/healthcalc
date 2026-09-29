// Shared row helper for the premium Taiwan expansion 150.
// kcal is COMPUTED (never hand-typed): cal = round(4P + 4C + 9F).
//
// Token: 'تايوان أصيل' (authentic Taiwanese). The nationality scanner in
// kitchenAuthenticity matches the 'تايوان' token inside this phrase, so these
// rows resolve to pan_taiwanese exactly like the base set.
// Pre-flight scan proved neither 'تايوان' nor 'تايواني' appears as a whole word
// in any of the 11,122 pre-existing live rows -> no TAIWAN_COLLISION guard needed.
export const T = 'تايوان أصيل';

export const B = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, protein, carbs, fat, cooking, region) => ({
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
