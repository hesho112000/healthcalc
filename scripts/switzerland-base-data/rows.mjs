export const BASE_DIASPORA = ['swiss', 'western', 'comfort_food'];

export const REGION_DIASPORA = {
  ticino: 'italian_swiss',
  geneva: 'french_swiss',
  vaud: 'french_swiss',
  lausanne: 'french_swiss',
  zurich: 'german_swiss',
  bern: 'german_swiss',
  basel: 'german_swiss',
  lucerne: 'german_swiss',
  aargau: 'german_swiss',
  st_gallen: 'german_swiss',
};

// One demonym per anchor, exactly 12 distinct values as required by Phase A:
// every region owns its own token so the builders' "exactly 1 nationality
// token" check is unambiguous. pan_swiss carries the pan-national token, which
// is why the German-speaking anchors use "german_swiss" in diaspora_priority
// rather than in the name. These are the display forms; the stored-normalized
// forms (alef without hamza, ta-marbuta folded to ha) live in the builders and
// in scripts/check-switzerland-token-collisions.mjs.
export const REGION_DEMONYM = {
  pan_swiss: 'السويسري',
  zurich: 'زوريخي',
  bern: 'برني',
  geneva: 'جنيفي',
  lucerne: 'لوسيرني',
  basel: 'بازلي',
  lausanne: 'لوزاني',
  ticino: 'تيسيني',
  valais: 'فاليزي',
  grisons: 'غريزوني',
  vaud: 'فودي',
  aargau: 'أرغاوي',
  st_gallen: 'سانت_غاليني',
};

// Bare token roots, definite article stripped, for the hasToken() guard. The
// ta-marbuta/ha and ya/alef-maqsura variants are listed so a hand-authored
// feminine form ("الفاليزية") is recognised instead of collecting a second
// demonym.
const TOKEN_ROOTS = [
  'سويسري', 'زوريخي', 'برني', 'جنيفي', 'لوسيرني', 'بازلي',
  'لوزاني', 'تيسيني', 'فاليزي', 'غريزوني', 'فودي', 'أرغاوي', 'سانت_غاليني',
];

const TOKENS = new Set(
  TOKEN_ROOTS.flatMap((t) => [t, `${t}ه`, t.replace(/[أإآ]/g, 'ا')])
);

// Normalize a feminine / orthographic variant of a demonym onto the canonical
// masculine form, article preserved. Produces exactly the four rewrites per
// region that Germany lists literally: el-X feminine, el-X feminine+ha, bare X
// feminine, bare X feminine+ha.
const NORMALIZE = TOKEN_ROOTS.flatMap((root) => {
  const folded = root.replace(/[أإآ]/g, 'ا');
  const article = /^[أإآ]/.test(root) ? '' : 'ال';
  return [
    [new RegExp(`${article}${folded}ة`, 'g'), `${article}${root}`],
    [new RegExp(`${article}${folded}ه`, 'g'), `${article}${root}`],
    [new RegExp(`${folded}ة`, 'g'), root],
    [new RegExp(`${folded}ه`, 'g'), root],
  ];
});

const hasToken = (name) =>
  name.split(/\s+/).some((t) => {
    const bare = t.replace(/^ال/, '');
    if (TOKENS.has(bare)) return true;
    // Accept the orthographic variants a hand-authored name may use
    // (أ/إ/آ -> ا, ة/ه, ى/ي) so B() never appends a second demonym.
    const folded = bare.replace(/[أإآ]/g, 'ا').replace(/[ةه]/g, 'ه').replace(/ى/g, 'ي');
    return TOKENS.has(folded);
  });

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
  let normalizedName = name_ar;
  for (const [re, to] of NORMALIZE) normalizedName = normalizedName.replace(re, to);
  const demonym = REGION_DEMONYM[region] ?? 'السويسري';
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