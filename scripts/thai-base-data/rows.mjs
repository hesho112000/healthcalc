// Shared row helper for the premium Thai base 100.
// kcal is COMPUTED (never hand-typed): cal = round(4P + 4C + 9F).
export const T = 'تايلندي';

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
