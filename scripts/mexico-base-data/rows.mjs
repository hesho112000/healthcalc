export const REGION_DEMONYM = {
  pan_mexican: 'المكسيكي',
  central_mexico: 'المكسيكي الوسطي',
  yucatan: 'اليوكاتاني',
  oaxaca: 'الأواكساكي',
  puebla: 'البوبلاني',
  jalisco: 'الخليسي',
  veracruz: 'الفيراكروزي',
  northern_mexico: 'المكسيكي الشمالي',
  baja_california: 'الباخاكاليفورني',
  chiapas: 'التشياباسي',
};

const BASE_DIASPORA = ['mexican', 'north_american', 'latin_american'];
const REGION_DIASPORA = {
  pan_mexican: 'mexican_cuisine',
  central_mexico: 'central_mexican',
  yucatan: 'yucatecan',
  oaxaca: 'oaxacan',
  puebla: 'poblano',
  jalisco: 'jaliscan',
  veracruz: 'veracruzano',
  northern_mexico: 'northern_mexican',
  baja_california: 'baja_californian',
  chiapas: 'chiapanecan',
};

export const diasporaFor = (region) => {
  if (!Object.hasOwn(REGION_DEMONYM, region)) throw new Error(`Unknown Mexico region: ${region}`);
  return [...BASE_DIASPORA, REGION_DIASPORA[region]];
};

export const B = (id, nameAr, nameEn, nameFr, nameEs, nameDe, category, mealType, protein, carbs, fat, cooking, region) => {
  if (!id || !nameAr || !nameEn || !nameFr || !nameEs || !nameDe) throw new Error('Mexico dish ID and all five names are required');
  if (![protein, carbs, fat].every((value) => Number.isFinite(value) && value >= 0)) throw new Error(`Invalid macros for ${id}`);
  const demonym = REGION_DEMONYM[region];
  if (!demonym) throw new Error(`Unknown Mexico region: ${region}`);

  return {
    id,
    nameAr: nameAr.includes(demonym) ? nameAr : `${nameAr} ${demonym}`,
    nameEn,
    nameFr,
    nameEs,
    nameDe,
    category,
    mealType,
    grams: 100,
    kcal: Math.round(4 * protein + 4 * carbs + 9 * fat),
    protein,
    carbs,
    fat,
    cooking,
    region,
    diaspora_priority: diasporaFor(region),
  };
};
