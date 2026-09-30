// Row helper for the Canada kitchen.
// kcal = Math.round(4P + 4C + 9F)
// Canada = 100 base + 100 expansion

export const BASE_DIASPORA = ['canadian', 'north_american', 'western'];

export const REGION_DIASPORA = {
  quebec: 'french_canadian',
  indigenous_canada: 'indigenous',
  atlantic_canada: 'seafood',
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
