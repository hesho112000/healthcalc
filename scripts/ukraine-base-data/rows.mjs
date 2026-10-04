export const BASE_DIASPORA = ['ukrainian', 'east_european', 'slavic', 'high_protein'];
export const REGION_DIASPORA = { kyiv: 'kyivan', lviv: 'halych', odesa: 'black_sea' };

// Each anchor owns one stable Arabic token; no Ukrainian row belongs in asian_shared.
export const REGION_DEMONYM = {
  pan_ukrainian: 'أوكراني',
  kyiv: 'كييف',
  lviv: 'لفيف',
  odesa: 'أوديسا',
  kharkiv: 'خاركيف',
  poltava: 'بولتافا',
  dnipro: 'دنيبرو',
  chernihiv: 'تشيرنيهيف',
  zaporizhzhia: 'زابوريجيا',
  vinnytsia: 'فينيتسيا',
};

const REGIONS = [
  ['pan_ukrainian', 'مطابخ أوكرانيا', 'Ukrainian', 'Cuisine ukrainienne : ', 'Cocina ucraniana: ', 'Ukrainische Küche: '],
  ['kyiv', 'مطابخ كييف', 'Kyiv', 'À la kiévienne : ', 'Al estilo de Kyiv: ', 'Kiew-Art: '],
  ['lviv', 'مطابخ لفيف', 'Lviv', 'À la lvivienne : ', 'Al estilo de Lviv: ', 'Lwiw-Art: '],
  ['odesa', 'مطابخ أوديسا', 'Odesa', 'À l’odéssite : ', 'Al estilo de Odesa: ', 'Odessa-Art: '],
  ['kharkiv', 'مطابخ خاركيف', 'Kharkiv', 'À la kharkivienne : ', 'Al estilo de Járkov: ', 'Charkiw-Art: '],
  ['poltava', 'مطابخ بولتافا', 'Poltava', 'À la poltavienne : ', 'Al estilo de Poltava: ', 'Poltawa-Art: '],
  ['dnipro', 'مطابخ دنيبرو', 'Dnipro', 'À la dniprovienne : ', 'Al estilo de Dnipró: ', 'Dnipro-Art: '],
  ['chernihiv', 'مطابخ تشيرنيهيف', 'Chernihiv', 'À la tchernihivienne : ', 'Al estilo de Cherníhiv: ', 'Tschernihiw-Art: '],
  ['zaporizhzhia', 'مطابخ زابوريجيا', 'Zaporizhzhia', 'À la zaporogue : ', 'Al estilo de Zaporiyia: ', 'Saporischschja-Art: '],
  ['vinnytsia', 'مطابخ فينيتسيا', 'Vinnytsia', 'À la vinnytsane : ', 'Al estilo de Vínnitsa: ', 'Winnyzja-Art: '],
];

const profile = (ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking) =>
  ({ ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking });

export const BASE_REGIONAL_RECIPES = {
  borscht_beef: profile('بورش باللحم البقري حلال', 'Borscht with Halal Beef', 'Borsch au bœuf halal', 'Borsch con ternera halal', 'Borscht mit Halal-Rind', 'soups_stews', 'lunch', 7, 9, 4, 'simmering'),
  varenyky_potato: profile('فارينيكي بحشوة البطاطس', 'Varenyky with Potato Filling', 'Varenyky aux pommes de terre', 'Varenyky con patatas', 'Varenyky mit Kartoffeln', 'vegetable_mains', 'lunch', 5, 28, 3, 'simmering'),
  holubtsi_beef: profile('هولوبسي لفائف الملفوف باللحم البقري حلال', 'Holubtsi Cabbage Rolls with Halal Beef', 'Holubtsi au bœuf halal', 'Holubtsi con ternera halal', 'Holubtsi mit Halal-Rind', 'meat_mains', 'dinner', 11, 10, 7, 'simmering'),
  syrnyky_cottage: profile('سيرنيكي فطائر الجبن القريش', 'Syrnyky Cottage Cheese Pancakes', 'Syrnyky au fromage frais', 'Syrnyky con requesón', 'Syrnyky mit Quark', 'breakfast_items', 'breakfast', 12, 20, 6, 'pan_frying'),
  chicken_kyiv: profile('دجاج كييف بالدجاج حلال', 'Chicken Kyiv', 'Poulet Kiev', 'Pollo Kiev', 'Hähnchen Kiew', 'poultry_mains', 'dinner', 20, 8, 12, 'baking'),
  halushky_mushroom: profile('هالوشكي بالفطر', 'Halushky with Mushrooms', 'Halushky aux champignons', 'Halushky con setas', 'Halushky mit Pilzen', 'vegetable_mains', 'lunch', 6, 30, 5, 'simmering'),
  mushroom_stew: profile('يخنة الفطر', 'Mushroom Stew', 'Mijoté de champignons', 'Guiso de setas', 'Pilz-Eintopf', 'vegetable_mains', 'dinner', 4, 9, 4, 'stewing'),
  rye_bread: profile('خبز الجاودار الأسود', 'Black Rye Bread', 'Pain de seigle noir', 'Pan de centeno negro', 'Schwarzbrot', 'breakfast_items', 'breakfast', 7, 45, 2, 'baking'),
};

export const BASE_NATIONAL_RECIPES = {
  chicken_soup_ua: profile('شوربة الدجاج الأوكرانية حلال', 'Ukrainian Chicken Soup', 'Soupe de poulet ukrainienne', 'Sopa de pollo ucraniana', 'Ukrainische Hühnersuppe', 'soups_stews', 'lunch', 8, 9, 3, 'simmering'),
  olivie_chicken: profile('سلطة أوليفييه بالدجاج حلال', 'Olivie Salad with Halal Chicken', 'Salade olivie au poulet halal', 'Ensalada olivie con pollo halal', 'Olivie-Salat mit halal Hähnchen', 'street_snacks', 'lunch', 9, 8, 8, 'assembling'),
  grechka_beef: profile('الحنطة السوداء باللحم البقري حلال', 'Buckwheat with Halal Beef', 'Sarrasin au bœuf halal', 'Trigo sarraceno con ternera halal', 'Buchweizen mit Halal-Rind', 'meat_mains', 'dinner', 16, 22, 7, 'simmering'),
  beetroot_soup: profile('شوربة الشمندر باللحم البقري حلال', 'Beetroot Soup with Halal Beef', 'Soupe de betterave au bœuf halal', 'Sopa de remolacha con ternera halal', 'Rote-Bete-Suppe mit Halal-Rind', 'soups_stews', 'lunch', 6, 8, 3, 'simmering'),
  pampushky_garlic: profile('بامبوشكي بالثوم', 'Garlic Pampushky', 'Pampushky à l’ail', 'Pampushky al ajo', 'Pampushky mit Knoblauch', 'street_snacks', 'snack', 6, 38, 8, 'baking'),
  stuffed_peppers: profile('فلفل محشو باللحم البقري حلال والأرز', 'Stuffed Peppers with Halal Beef and Rice', 'Poivrons farcis au bœuf halal et riz', 'Pimientos rellenos de ternera halal y arroz', 'Gefüllte Paprika mit Halal-Rind und Reis', 'meat_mains', 'dinner', 13, 14, 6, 'baking'),
  millet_porridge: profile('عصيدة البرغل بالحليب', 'Millet Porridge', 'Bouillie de millet', 'Gachas de mijo', 'Hirsebrei', 'breakfast_items', 'breakfast', 4, 20, 3, 'simmering'),
  turkey_meatballs: profile('كرات الديك الرومي حلال', 'Halal Turkey Meatballs', 'Boulettes de dinde halal', 'Albóndigas de pavo halal', 'Halal-Truthahn-Bällchen', 'meat_mains', 'dinner', 17, 4, 9, 'pan_frying'),
  pumpkin_soup: profile('شوربة القرع', 'Pumpkin Soup', 'Soupe de potiron', 'Sopa de calabaza', 'Kürbissuppe', 'soups_stews', 'lunch', 3, 10, 4, 'simmering'),
  uzvar: profile('أوزفار مشروب الفواكه المجففة', 'Uzvar Dried Fruit Drink', 'Uzvar aux fruits secs', 'Uzvar de frutas secas', 'Uzvar mit Trockenfrüchten', 'beverages', 'snack', 0, 12, 0, 'simmering'),
};

export const EXPANSION_REGIONAL_RECIPES = { ...BASE_REGIONAL_RECIPES };

export const EXPANSION_NATIONAL_RECIPES = {
  kholodets_turkey: profile('خهلوديدتس بالديك الرومي حلال', 'Kholodets with Halal Turkey', 'Kholodets à la dinde halal', 'Kholodets con pavo halal', 'Kholodets mit halal Truthahn', 'meat_mains', 'lunch', 15, 1, 8, 'simmering'),
  solyanka_chicken: profile('سولينيكا بالدجاج حلال', 'Solyanka with Halal Chicken', 'Solyanka au poulet halal', 'Solyanka con pollo halal', 'Solyanka mit halal Hähnchen', 'soups_stews', 'lunch', 9, 6, 5, 'simmering'),
  zrazy_mushroom: profile('زرازي بالفطر', 'Zrazy with Mushrooms', 'Zrazy aux champignons', 'Zrazy con setas', 'Zrazy mit Pilzen', 'vegetable_mains', 'dinner', 7, 24, 6, 'pan_frying'),
  ikra_buriakova: profile('كافيار الشمندر', 'Beetroot Caviar', 'Caviar de betterave', 'Caviar de remolacha', 'Rote-Bete-Kaviar', 'vegetable_mains', 'snack', 2, 10, 3, 'simmering'),
  chicken_fricassee: profile('فريكاسه الدجاج حلال', 'Halal Chicken Fricassee', 'Fricassée de poulet halal', 'Fricasé de pollo halal', 'Halal-Hähnchen-Frikassee', 'poultry_mains', 'dinner', 18, 3, 9, 'stewing'),
  varenyky_cherry: profile('فارينيكي بالكرز', 'Varenyky with Cherries', 'Varenyky aux cerises', 'Varenyky con cerezas', 'Varenyky mit Kirschen', 'rice_cakes_sweets', 'snack', 5, 30, 4, 'simmering'),
  fish_cutlets: profile('كرات السمك الأوكرانية', 'Ukrainian Fish Cutlets', 'Croquettes de poisson ukrainiennes', 'Croquetas de pescado ucranianas', 'Ukrainische Fischfrikadellen', 'fish_seafood', 'lunch', 14, 9, 7, 'pan_frying'),
  beef_stroganoff: profile('بيف ستروجانوف باللحم البقري حلال', 'Halal Beef Stroganoff', 'Bœuf stroganoff halal', 'Stroganoff de ternera halal', 'Halal-Rinder-Stroganoff', 'meat_mains', 'dinner', 19, 4, 11, 'simmering'),
  kutia_rice: profile('كوتيا بالأرز والزبيب', 'Kutia with Rice and Raisins', 'Koutia au riz et raisins secs', 'Kutia con arroz y pasas', 'Kutia mit Reis und Rosinen', 'rice_cakes_sweets', 'snack', 4, 26, 4, 'simmering'),
  paska_bread: profile('بسكا خبز عيد الفصح', 'Paska Easter Bread', 'Paska brioche de Pâques', 'Paska pan de Pascua', 'Paska Osterbrot', 'rice_cakes_sweets', 'breakfast', 8, 42, 9, 'baking'),
};

export function B(profileRow, region) {
  const token = REGION_DEMONYM[region];
  if (!token) throw new Error(`Unknown Ukraine region: ${region}`);
  const extra = REGION_DIASPORA[region];
  const national = region === 'pan_ukrainian';
  const descriptor = REGIONS.find(([id]) => id === region);
  return {
    id: '',
    nameAr: `${national ? '' : `${descriptor[1]} `}${profileRow.ar} ${token}`.trim(),
    nameEn: `${national ? 'Ukrainian ' : `${descriptor[2]} `}${profileRow.en}`,
    nameFr: `${national ? 'Cuisine ukrainienne : ' : `${descriptor[3]} `}${profileRow.fr}`,
    nameEs: `${national ? 'Cocina ucraniana: ' : `${descriptor[4]} `}${profileRow.es}`,
    nameDe: `${national ? 'Ukrainische Küche: ' : `${descriptor[5]} `}${profileRow.de}`,
    category: profileRow.category,
    mealType: profileRow.meal,
    grams: 100,
    kcal: Math.round(4 * profileRow.protein + 4 * profileRow.carbs + 9 * profileRow.fat),
    protein: profileRow.protein,
    carbs: profileRow.carbs,
    fat: profileRow.fat,
    cooking: profileRow.cooking,
    region,
    diaspora_priority: extra ? [...BASE_DIASPORA, extra] : [...BASE_DIASPORA],
  };
}

export function buildRows(regionalKeys, nationalKeys, recipes) {
  const rows = [];
  for (const [region] of REGIONS) {
    for (const key of regionalKeys) {
      if (!recipes[key]) throw new Error(`Unknown Ukraine recipe profile: ${key}`);
      rows.push(B(recipes[key], region));
    }
  }
  for (const key of nationalKeys) {
    if (!recipes[key]) throw new Error(`Unknown Ukraine recipe profile: ${key}`);
    rows.push(B(recipes[key], 'pan_ukrainian'));
  }
  return rows;
}
