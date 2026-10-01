export const BASE_DIASPORA = ['british', 'western', 'comfort_food'];

export const REGION_DIASPORA = {
  london: 'multicultural',
  lowlands: 'scottish',
  highlands: 'scottish',
  wales: 'welsh',
  ulster: 'irish',
};

export const diasporaFor = (region) => {
  const extra = REGION_DIASPORA[region];
  return extra ? [...BASE_DIASPORA, extra] : [...BASE_DIASPORA];
};

// One demonym per anchor, matching the stored-normalized forms used by
// scripts/check-uk-token-collisions.mjs (alef without hamza, ta-marbuta folded
// to ha, definite article stripped).
export const REGION_DEMONYM = {
  pan_british: 'البريطاني',
  london: 'البريطاني',
  south_east: 'البريطاني',
  south_west: 'البريطاني',
  east_anglia: 'البريطاني',
  midlands: 'البريطاني',
  north_west: 'البريطاني',
  yorkshire: 'البريطاني',
  north_east: 'البريطاني',
  lowlands: 'الاسكتلندي',
  highlands: 'الاسكتلندي',
  wales: 'الويلزي',
  ulster: 'الايرلندي',
};

const NORMALIZE = [
  [/البريطانية/g, 'البريطاني'],
  [/البريطانيه/g, 'البريطاني'],
  [/بريطانية/g, 'بريطاني'],
  [/بريطانيه/g, 'بريطاني'],
  [/الاسكتلندية/g, 'الاسكتلندي'],
  [/الاسكتلنديه/g, 'الاسكتلندي'],
  [/اسكتلندية/g, 'اسكتلندي'],
  [/اسكتلنديه/g, 'اسكتلندي'],
  [/الويلزية/g, 'الويلزي'],
  [/الويلزيه/g, 'الويلزي'],
  [/ويلزية/g, 'ويلزي'],
  [/ويلزيه/g, 'ويلزي'],
  [/الايرلندية/g, 'الايرلندي'],
  [/الايرلنديه/g, 'الايرلندي'],
  [/ايرلندية/g, 'ايرلندي'],
  [/ايرلنديه/g, 'ايرلندي'],
];

const TOKENS = new Set([
  'بريطاني', 'بريطانية', 'بريطانيه', 'اسكتلندي', 'اسكتلندية', 'اسكتلنديه',
  'ويلزي', 'ويلزية', 'ويلزيه', 'ايرلندي', 'ايرلندية', 'ايرلنديه',
]);

const hasToken = (name) =>
  name.split(/\s+/).some((t) => {
    const bare = t.replace(/^ال/, '');
    if (TOKENS.has(bare)) return true;
    // Accept the orthographic variants a hand-authored name may use
    // (أ/إ/آ -> ا, ة/ه, ى/ي) so B() never appends a second demonym.
    const folded = bare.replace(/[أإآ]/g, 'ا').replace(/[ةه]/g, 'ه').replace(/ى/g, 'ي');
    return TOKENS.has(folded);
  });

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
  let normalizedName = name_ar;
  for (const [re, to] of NORMALIZE) normalizedName = normalizedName.replace(re, to);
  const demonym = REGION_DEMONYM[region] ?? 'البريطاني';
  if (!hasToken(normalizedName)) normalizedName = `${normalizedName} ${demonym}`;

  return {
    id: '',
    nameAr: normalizedName,
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
