export const REGION_DEMONYM = {
  pan_chile: 'التشيلي',
  santiago: 'السانتياغوي',
  valparaiso: 'الفالبارايسي',
  arica: 'الأريكي',
  atacama: 'الأتاكامي',
  coquimbo: 'الكوكيمباني',
  maule: 'الموليني',
  bio_bio: 'البيوبياني',
  araucania: 'الأراوكاني',
  los_lagos: 'اللوس لاغوسي',
  aysen: 'الأيسيني',
  magallanes: 'الماغاياني',
};

const BASE_DIASPORA = ['chilean', 'south_american', 'latin_american'];
const REGION_DIASPORA = {
  pan_chile: 'chilean_cuisine',
  santiago: 'santiaguino',
  valparaiso: 'valparaisino',
  arica: 'ariqueno',
  atacama: 'atacameno',
  coquimbo: 'coquimbano',
  maule: 'maulino',
  bio_bio: 'penquista',
  araucania: 'araucanian',
  los_lagos: 'chilote',
  aysen: 'aysenino',
  magallanes: 'magallanico',
};

export const diasporaFor = (region) => {
  if (!Object.hasOwn(REGION_DEMONYM, region)) throw new Error(`Unknown Chile region: ${region}`);
  return [...BASE_DIASPORA, REGION_DIASPORA[region]];
};

export const B = (id, nameAr, nameEn, nameFr, nameEs, nameDe, category, mealType, protein, carbs, fat, cooking, region) => {
  if (!id || !nameAr || !nameEn || !nameFr || !nameEs || !nameDe) throw new Error('Chile dish ID and all five names are required');
  if (![protein, carbs, fat].every((value) => Number.isFinite(value) && value >= 0)) throw new Error(`Invalid macros for ${id}`);
  const demonym = REGION_DEMONYM[region];
  if (!demonym) throw new Error(`Unknown Chile region: ${region}`);

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
