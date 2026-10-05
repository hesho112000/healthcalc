export const REGION_DEMONYM = {
  pan_argentina: 'الأرجنتيني',
  buenos_aires: 'البوينس آيرسي',
  cordoba: 'الكوردوبي',
  mendoza: 'المندوسي',
  patagonia: 'الباتاغوني',
  salta: 'السالتي',
  tucuman: 'التوكوماني',
  corrientes: 'الكورينتيني',
  chaco: 'الشاكي',
  misiones: 'الميسيوني',
  santiago_del_estero: 'السنتياغوي',
};

const BASE_DIASPORA = ['argentinian', 'south_american', 'latin_american'];
const REGION_DIASPORA = {
  pan_argentina: 'argentine_cuisine',
  buenos_aires: 'porteño',
  cordoba: 'cordobes',
  mendoza: 'mendocino',
  patagonia: 'patagonian',
  salta: 'salteno',
  tucuman: 'tucumano',
  corrientes: 'correntino',
  chaco: 'chaqueno',
  misiones: 'misionero',
  santiago_del_estero: 'santiagueno',
};

export const diasporaFor = (region) => {
  if (!Object.hasOwn(REGION_DEMONYM, region)) throw new Error(`Unknown Argentina region: ${region}`);
  return [...BASE_DIASPORA, REGION_DIASPORA[region]];
};

export const B = (id, nameAr, nameEn, nameFr, nameEs, nameDe, category, mealType, protein, carbs, fat, cooking, region) => {
  if (!id || !nameAr || !nameEn || !nameFr || !nameEs || !nameDe) throw new Error('Argentina dish ID and all five names are required');
  if (![protein, carbs, fat].every((value) => Number.isFinite(value) && value >= 0)) throw new Error(`Invalid macros for ${id}`);
  const demonym = REGION_DEMONYM[region];
  if (!demonym) throw new Error(`Unknown Argentina region: ${region}`);

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
