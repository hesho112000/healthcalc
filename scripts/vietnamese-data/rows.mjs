// Shared row helper for the premium Vietnamese 200-dish expansion.
// kcal is COMPUTED (never hand-typed) so the set is Atwater-consistent by construction:
//   cal_100 = round(4P + 4C + 9F)
export const T = 'فيتنامي أصيل';
export const TOKEN = 'فيتنامي';
export const ASIL = 'أصيل';

export const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, protein, carbs, fat) => ({
  name_ar,
  name_en,
  name_fr,
  name_es,
  name_de,
  category,
  mealType,
  region,
  cal_100: Math.round(4 * protein + 4 * carbs + 9 * fat),
  protein,
  carbs,
  fat,
});
