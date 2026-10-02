export const BASE_DIASPORA = ['german', 'western', 'comfort_food'];

export const REGION_DIASPORA = {
  bavaria: 'bavarian',
  saxony: 'east_german',
  thuringia: 'east_german',
  lower_saxony: 'hanseatic',
  brandenburg: 'east_german',
  rhineland: 'rhine',
  baden_wurttemberg: 'swabian',
};

// One demonym per anchor, exactly 13 distinct values as required by Phase A:
// every region owns its own token so the builders' "exactly 1 nationality
// token" check is unambiguous. These are the stored-normalized forms used by
// scripts/check-germany-token-collisions.mjs (alef without hamza, ta-marbuta
// folded to ha, ya folded to alef maqsura).
export const REGION_DEMONYM = {
  pan_german: 'الالماني',
  bavaria: 'البافاري',
  berlin: 'البرليني',
  hamburg: 'الهامبورغي',
  hesse: 'الهيسي',
  rhineland: 'الراينلاندي',
  saxony: 'الساكسوني',
  thuringia: 'التورينغي',
  brandenburg: 'البراندنبورغي',
  lower_saxony: 'الهانزياتي',
  baden_wurttemberg: 'الشوابي',
  saarland: 'السارلاندي',
  bremen: 'البريميني',
};

const NORMALIZE = [
  [/الألمانية/g, 'الالماني'],
  [/الألمانيه/g, 'الالماني'],
  [/المانية/g, 'الماني'],
  [/المانيه/g, 'الماني'],
  [/البافارية/g, 'البافاري'],
  [/البافاريه/g, 'البافاري'],
  [/بافارية/g, 'بافاري'],
  [/بافاريه/g, 'بافاري'],
  [/البرلينية/g, 'البرليني'],
  [/البرلينيه/g, 'البرليني'],
  [/برلينية/g, 'برليني'],
  [/برلينيه/g, 'برليني'],
  [/الهامبورغية/g, 'الهامبورغي'],
  [/الهامبورغيه/g, 'الهامبورغي'],
  [/هامبورغية/g, 'هامبورغي'],
  [/هامبورغيه/g, 'هامبورغي'],
  [/الهيسية/g, 'الهيسي'],
  [/الهيسيه/g, 'الهيسي'],
  [/هيسية/g, 'هيسي'],
  [/هيسيه/g, 'هيسي'],
  [/الراينلندية/g, 'الراينلاندي'],
  [/الراينلانديه/g, 'الراينلاندي'],
  [/راينلندية/g, 'راينلاندي'],
  [/راينلانديه/g, 'راينلاندي'],
  [/الساكسونية/g, 'الساكسوني'],
  [/الساكسونيه/g, 'الساكسوني'],
  [/ساكسونية/g, 'ساكسوني'],
  [/ساكسونيه/g, 'ساكسوني'],
  [/التورينغية/g, 'التورينغي'],
  [/التورينغيه/g, 'التورينغي'],
  [/تورينغية/g, 'تورينغي'],
  [/تورينغيه/g, 'تورينغي'],
  [/البراندنبورغية/g, 'البراندنبورغي'],
  [/البراندنبورغيه/g, 'البراندنبورغي'],
  [/براندنبورغية/g, 'براندنبورغي'],
  [/براندنبورغيه/g, 'براندنبورغي'],
  [/الهانزياتية/g, 'الهانزياتي'],
  [/الهانزياتيه/g, 'الهانزياتي'],
  [/هانزياتية/g, 'هانزياتي'],
  [/هانزياتيه/g, 'هانزياتي'],
  [/الشوابية/g, 'الشوابي'],
  [/الشوابيه/g, 'الشوابي'],
  [/شوابية/g, 'شوابي'],
  [/شوابيه/g, 'شوابي'],
  [/السارلندية/g, 'السارلاندي'],
  [/السارلانديه/g, 'السارلاندي'],
  [/سارلندية/g, 'سارلاندي'],
  [/سارلانديه/g, 'سارلاندي'],
  [/البريمنية/g, 'البريميني'],
  [/البريمينيه/g, 'البريميني'],
  [/بريمنية/g, 'بريميني'],
  [/بريمينيه/g, 'بريميني'],
];

// Bare token roots (definite article stripped) for the hasToken() guard.
const TOKENS = new Set([
  'الماني', 'المانيه', 'المانية',
  'بافاري', 'بافاريه', 'بافارية',
  'برليني', 'برلينيه', 'برلينية',
  'هامبورغي', 'هامبورغيه', 'هامبورغية',
  'هيسي', 'هيسيه', 'هيسية',
  'راينلاندي', 'راينلانديه', 'راينلندية',
  'ساكسوني', 'ساكسونيه', 'ساكسونية',
  'تورينغي', 'تورينغيه', 'تورينغية',
  'براندنبورغي', 'براندنبورغيه', 'براندنبورغية',
  'هانزياتي', 'هانزياتيه', 'هانزياتية',
  'شوابي', 'شوابيه', 'شوابية',
  'سارلاندي', 'سارلانديه', 'سارلندية',
  'بريميني', 'بريمينيه', 'بريمنية',
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
  const demonym = REGION_DEMONYM[region] ?? 'الالماني';
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