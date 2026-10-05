export const REGION_DEMONYM = {
  pan_colombia: 'الكولومبي',
  antioquia: 'الأنتيوكي',
  bogota: 'البوغوتي',
  caribe: 'الكاريبي',
  pacifico: 'الهادئ',
  santander: 'السانتانديري',
  valle: 'الفاليي',
  llanos: 'اللانيري',
  narino: 'النارينيسي',
  tolima: 'التوليمي',
  boyaca: 'البوياكاني',
  cundinamarca: 'الكنديناماركي',
};

const BASE_DIASPORA = ['colombian', 'south_american', 'latin_american'];
const REGION_DIASPORA = {
  pan_colombia: 'colombian_cuisine',
  antioquia: 'antioqueno',
  bogota: 'bogotano',
  caribe: 'caribbean_colombian',
  pacifico: 'pacific_colombian',
  santander: 'santandereano',
  valle: 'valluno',
  llanos: 'llanero',
  narino: 'narino_cuisine',
  tolima: 'tolimense',
  boyaca: 'boyacense',
  cundinamarca: 'cundinamarques',
};

export const diasporaFor = (region) => {
  if (!Object.hasOwn(REGION_DEMONYM, region)) throw new Error(`Unknown Colombia region: ${region}`);
  return [...BASE_DIASPORA, REGION_DIASPORA[region]];
};

export const B = (id, nameAr, nameEn, nameFr, nameEs, nameDe, category, mealType, protein, carbs, fat, cooking, region) => {
  if (!id || !nameAr || !nameEn || !nameFr || !nameEs || !nameDe) throw new Error('Colombia dish ID and all five names are required');
  if (![protein, carbs, fat].every((value) => Number.isFinite(value) && value >= 0)) throw new Error(`Invalid macros for ${id}`);
  const demonym = REGION_DEMONYM[region];
  if (!demonym) throw new Error(`Unknown Colombia region: ${region}`);

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
