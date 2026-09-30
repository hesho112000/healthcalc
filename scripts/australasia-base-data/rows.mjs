export const BASE_DIASPORA = ['australasian', 'oceania', 'western'];

export const REGION_DIASPORA = {
  maori: 'indigenous',
  tasmania: 'seafood',
  queensland: 'tropical',
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
) => {
  const normalizedName = name_ar
    .replace(/الأسترالي(?:ة)?/, 'أسترالي')
    .replace(/النيوزيلندي(?:ة)?/, 'نيوزيلندي');
  const hasNationality = /(?:^|\s)(?:أسترالي|نيوزيلندي)(?:\s|$)/.test(normalizedName);
  const isNewZealand = ['auckland', 'wellington', 'canterbury', 'otago', 'maori'].includes(region);

  return {
    id: '',
    nameAr: hasNationality ? normalizedName : `${normalizedName} ${isNewZealand ? 'نيوزيلندي' : 'أسترالي'}`,
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
  };
};
