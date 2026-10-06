export const REGION_DEMONYM = {
  pan_peru: 'البيروفي',
  lima: 'الليميني',
  arequipa: 'الأريكِيبي',
  huancayo: 'الهوانكايي',
  cusco: 'الكوسكي',
  piura: 'البيوري',
  puno: 'البونوي',
  ayacucho: 'الأياكوتشاني',
  amazonas: 'الأمازوني',
  cajamarca: 'الكاخاماركي',
  ancash: 'الأنكاشي',
  tacna: 'التاكني',
  loreto: 'اللوريتاني',
  lambayeque: 'اللامبايكاني',
  ica: 'الإيكي',
  callao: 'الكالاووي',
};

const BASE_DIASPORA = ['peruvian', 'south_american', 'latin_american'];
const REGION_DIASPORA = {
  pan_peru: 'peruvian_cuisine',
  lima: 'limeno',
  arequipa: 'arequipeno',
  huancayo: 'huancaino',
  cusco: 'cusqueno',
  piura: 'piurano',
  puno: 'puneno',
  ayacucho: 'ayacuchano',
  amazonas: 'amazonense',
  cajamarca: 'cajamarquino',
  ancash: 'ancashino',
  tacna: 'tacneno',
  loreto: 'loretano',
  lambayeque: 'lambayecano',
  ica: 'iqueno',
  callao: 'chalaco',
};

export const diasporaFor = (region) => {
  if (!Object.hasOwn(REGION_DEMONYM, region)) throw new Error(`Unknown Peru region: ${region}`);
  return [...BASE_DIASPORA, REGION_DIASPORA[region]];
};

export const B = (id, nameAr, nameEn, nameFr, nameEs, nameDe, category, mealType, protein, carbs, fat, cooking, region) => {
  if (!id || !nameAr || !nameEn || !nameFr || !nameEs || !nameDe) throw new Error('Peru dish ID and all five names are required');
  if (![protein, carbs, fat].every((value) => Number.isFinite(value) && value >= 0)) throw new Error(`Invalid macros for ${id}`);
  const demonym = REGION_DEMONYM[region];
  if (!demonym) throw new Error(`Unknown Peru region: ${region}`);

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
