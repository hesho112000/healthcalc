// Shared row helper for the premium Taiwan base 150.
// kcal is COMPUTED (never hand-typed): cal = round(4P + 4C + 9F).
//
// Token: 'تايوان' (masc/neut place name). kitchenAuthenticity TOKEN_REGIONS also
// registers the adjectival 'تايواني' and its normalized feminine 'تايوانيه'.
// Pre-flight scan (scripts/check-taiwan-token-collisions.mjs) proved that NONE of
// these tokens appear as a whole word in any of the 11,122 pre-existing live rows,
// so registering them retags nothing outside the new Taiwanese set. Unlike the
// Korean 'كوري' (which collided with the South-Indian "Kori" dishes) no guard
// regex is required here.
export const T = 'تايوان';

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
