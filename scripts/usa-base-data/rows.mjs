// Row helper for the USA kitchen. Mirrors scripts/taiwan-base-data/rows.mjs.
// kcal is never hand-typed: it is Math.round(4P + 4C + 9F) and the builder
// re-derives it independently, so a drifting macro is a hard failure.
//
// diaspora is the full diaspora_priority array for the dish, e.g.
//   ['american', 'western', 'comfort_food', 'soul_food']
// The base three tags are always present; the last entry is the region extra.

export const BASE_DIASPORA = ['american', 'western', 'comfort_food'];

// Region -> extra diaspora tag (appended to BASE_DIASPORA).
export const REGION_DIASPORA = {
  soul_food: 'soul_food',
  bbq: 'bbq',
  texas: 'tex_mex',
  cajun: 'cajun',
  southwest: 'native_american',
  california: 'italian_american',
  hawaii: 'asian_american',
  new_england: 'italian_american',
  mid_atlantic: 'italian_american',
};

export const diasporaFor = (region) => {
  const extra = REGION_DIASPORA[region];
  return extra ? [...BASE_DIASPORA, extra] : [...BASE_DIASPORA];
};

export const B = (
  name_ar,
  name_en,
  name_fr,
  name_es,
  name_de,
  category,
  mealType,
  protein,
  carbs,
  fat,
  cooking,
  region,
  diaspora
) => ({
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
  diaspora_priority: diaspora,
});
