export const BASE_DIASPORA = ['austrian', 'western', 'comfort_food'];

export const REGION_DIASPORA = {
  vienna: 'viennese',
  tyrol: 'alpine',
};

// One demonym per region, exactly 10 distinct values as required by Phase A:
// every region owns its own token so the builders' "exactly 1 nationality token"
// check is unambiguous, and so no Austrian name can resolve to a German anchor
// (pan_austrian "نمساوي" vs. the German "الماني", tyrol vs. bavaria, etc.).
// These are the stored-normalized forms used by
// scripts/check-austria-token-collisions.mjs (alef without hamza, ta-marbuta
// folded to ha, alef maqsura folded to ya).
export const REGION_DEMONYM = {
  pan_austrian: 'النمساوي',
  vienna: 'الفييني',
  tyrol: 'التيرولي',
  salzburg: 'السالزبورغي',
  styria: 'الشتيرياني',
  carinthia: 'الكارينثياني',
  upper_austria: 'النمساوي_عالي',
  lower_austria: 'النمساوي_سفلي',
  burgenland: 'البورغنلاندي',
  vorarlberg: 'الفورارلبرغي',
};

// Feminine / orthographic variants a hand-authored name may use. The two
// compound Upper/Lower Austria demonyms must be folded BEFORE the plain
// "نمسوي" rule, otherwise "نمسوية_عالية" would collapse to "نمسوي_عالية"
// and stop matching its region token.
const NORMALIZE = [
  [/النمسوية_العالية/g, 'النمساوي_عالي'],
  [/النمسوية_العاليه/g, 'النمساوي_عالي'],
  [/نمسوية_عالية/g, 'نمساوي_عالي'],
  [/نمسوية_عاليه/g, 'نمساوي_عالي'],
  [/النمسوية_السفلية/g, 'النمساوي_سفلي'],
  [/النمسوية_السفليه/g, 'النمساوي_سفلي'],
  [/نمسوية_سفلية/g, 'نمساوي_سفلي'],
  [/نمسوية_سفليه/g, 'نمساوي_سفلي'],
  [/النمسوية/g, 'النمساوي'],
  [/النمسويه/g, 'النمساوي'],
  [/النمسوية/g, 'النمساوي'],
  [/النمسوي/g, 'النمساوي'],
  [/نمسوية/g, 'نمساوي'],
  [/نمسويه/g, 'نمساوي'],
  [/نمسوية/g, 'نمساوي'],
  [/نمسوي/g, 'نمساوي'],
  [/الفينية/g, 'الفييني'],
  [/الفينيه/g, 'الفييني'],
  [/فية/g, 'فييني'],
  [/فينيه/g, 'فييني'],
  [/التيرولية/g, 'التيرولي'],
  [/التيروليه/g, 'التيرولي'],
  [/تيرولة/g, 'تيرولي'],
  [/تيروله/g, 'تيرولي'],
  [/السالزبورغية/g, 'السالزبورغي'],
  [/السالزبورغيه/g, 'السالزبورغي'],
  [/سالزبورغية/g, 'سالزبورغي'],
  [/سالزبورغيه/g, 'سالزبورغي'],
  [/الشتيرانية/g, 'الشتيرياني'],
  [/الشتيرانيه/g, 'الشتيرياني'],
  [/شتيرانية/g, 'شتيرياني'],
  [/شتيرانيه/g, 'شتيرياني'],
  [/الكارينثيانية/g, 'الكارينثياني'],
  [/الكارينثيانه/g, 'الكارينثياني'],
  [/كارينثيانية/g, 'كارينثياني'],
  [/كارينثيانه/g, 'كارينثياني'],
  [/البورغنلندية/g, 'البورغنلاندي'],
  [/البورغنلانديه/g, 'البورغنلاندي'],
  [/بورغنلندية/g, 'بورغنلاندي'],
  [/بورغنلانديه/g, 'بورغنلاندي'],
  [/الفورارلبرغية/g, 'الفورارلبرغي'],
  [/الفورارلبرغيه/g, 'الفورارلبرغي'],
  [/فورارلبرغية/g, 'فورارلبرغي'],
  [/فورارلبرغيه/g, 'فورارلبرغي'],
];

// Bare token roots (definite article stripped) for the hasToken() guard.
const TOKENS = new Set([
  'نمساوي', 'نمساويه', 'نمسويه', 'نمسوية',
  'نمساوي_عالي', 'نمساوي_عاليه', 'نمسوية_عالي', 'نمسويه_عالي',
  'نمساوي_سفلي', 'نمساوي_سفليه', 'نمسوية_سفلي', 'نمسويه_سفلي',
  'فييني', 'فيينيه', 'فيينية',
  'تيرولي', 'تيروليه', 'تيرولية',
  'سالزبورغي', 'سالزبورغيه', 'سالزبورغية',
  'شتيرياني', 'شتيرانيه', 'شتيرانية',
  'كارينثياني', 'كارينثيانه', 'كارينثيانية',
  'بورغنلاندي', 'بورغنلانديه', 'بورغنلندية',
  'فورارلبرغي', 'فورارلبرغيه', 'فورارلبرغية',
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
  const demonym = REGION_DEMONYM[region] ?? 'النمساوي';
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