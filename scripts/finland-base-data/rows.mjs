export const BASE_DIASPORA = ['finnish', 'scandinavian', 'western', 'high_protein'];
export const REGION_DIASPORA = { helsinki: 'helsinkian', rovaniemi: 'arctic', tampere: 'pirkanmaa' };

// Each anchor owns one stable Arabic token; no Finnish row belongs in asian_shared.
export const REGION_DEMONYM = {
  pan_finnish: 'فنلندي',
  helsinki: 'هلسنكي',
  tampere: 'تامبيري',
  turku: 'توركوي',
  oulu: 'أولوي',
  rovaniemi: 'روفانيمي',
  jyvaskyla: 'يوفاسكولي',
  kuopio: 'كووبيوي',
  vaasa: 'فازي',
  pori: 'بوريي',
};

const REGIONS = [
  ['pan_finnish', 'مطابخ فنلندا', 'Finnish', 'Cuisine finlandaise : ', 'Cocina finlandesa: ', 'Finnische Küche: '],
  ['helsinki', 'مطابخ هلسنكي', 'Helsinki', 'À l’helsinkienne : ', 'Al estilo de Helsinki: ', 'Helsinki-Art: '],
  ['tampere', 'مطابخ تامبيره', 'Tampere', 'À la tampéroise : ', 'Al estilo de Tampere: ', 'Tampere-Art: '],
  ['turku', 'مطابخ توركو', 'Turku', 'À la turkoise : ', 'Al estilo de Turku: ', 'Turku-Art: '],
  ['oulu', 'مطابخ أولو', 'Oulu', 'À l’oulienne : ', 'Al estilo de Oulu: ', 'Oulu-Art: '],
  ['rovaniemi', 'مطابخ روفانييمي', 'Rovaniemi', 'À la rovaniémienne : ', 'Al estilo de Rovaniemi: ', 'Rovaniemi-Art: '],
  ['jyvaskyla', 'مطابخ يوفاسكولا', 'Jyväskylä', 'À la jyväskyläise : ', 'Al estilo de Jyväskylä: ', 'Jyväskylä-Art: '],
  ['kuopio', 'مطابخ كووبيو', 'Kuopio', 'À la kuopienne : ', 'Al estilo de Kuopio: ', 'Kuopio-Art: '],
  ['vaasa', 'مطابخ فازا', 'Vaasa', 'À la vaasaise : ', 'Al estilo de Vaasa: ', 'Vaasa-Art: '],
  ['pori', 'مطابخ بوري', 'Pori', 'À la porienne : ', 'Al estilo de Pori: ', 'Pori-Art: '],
];

const profile = (ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking) =>
  ({ ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking });

export const BASE_REGIONAL_RECIPES = {
  baked_salmon_dill: profile('سلمون بالفرن بالشبت', 'Baked Salmon with Dill', 'Saumon au four à l’aneth', 'Salmón al horno con eneldo', 'Ofenlachs mit Dill', 'fish_seafood', 'dinner', 23, 1, 13, 'baking'),
  reindeer_root_stew: profile('يخنة الرنة بالجذور', 'Reindeer Stew with Root Vegetables', 'Mijoté de renne aux légumes-racines', 'Guiso de reno con verduras de raíz', 'Rentier-Eintopf mit Wurzelgemüse', 'meat_mains', 'dinner', 19, 5, 10, 'stewing'),
  root_veg_soup_barley: profile('شوربة الجذور بالشعير', 'Root Vegetable Soup with Barley', 'Soupe de légumes-racines à l’orge', 'Sopa de verduras de raíz con cebada', 'Wurzelgemüsesuppe mit Gerste', 'soups_stews', 'lunch', 4, 16, 3, 'simmering'),
  oat_berry_porridge: profile('عصيدة الشوفان بالتوت', 'Oat Porridge with Berries', 'Bouillie d’avoine aux baies', 'Gachas de avena con bayas', 'Haferbrei mit Beeren', 'breakfast_items', 'breakfast', 5, 22, 4, 'simmering'),
  elk_mushroom_stew: profile('يخنة الأيل بالفطر', 'Elk Stew with Mushrooms', 'Mijoté d’élan aux champignons', 'Guiso de alce con setas', 'Elch-Eintopf mit Pilzen', 'meat_mains', 'dinner', 20, 5, 9, 'stewing'),
  fish_soup_potato: profile('شوربة السمك بالبطاطس', 'Fish Soup with Potatoes', 'Soupe de poisson aux pommes de terre', 'Sopa de pescado con patatas', 'Fischsuppe mit Kartoffeln', 'soups_stews', 'lunch', 11, 8, 4, 'simmering'),
  pea_soup_carrot: profile('شوربة البازلاء بالجزر', 'Pea Soup with Carrots', 'Soupe de pois aux carottes', 'Sopa de guisantes con zanahorias', 'Erbsensuppe mit Karotten', 'soups_stews', 'lunch', 7, 17, 3, 'simmering'),
  rye_cheese: profile('خبز الجاودار بالجبن', 'Rye Bread with Cheese', 'Pain de seigle au fromage', 'Pan de centeno con queso', 'Roggenbrot mit Käse', 'breakfast_items', 'breakfast', 8, 26, 7, 'assembling'),
};

export const BASE_NATIONAL_RECIPES = {
  lohikeitto: profile('لوهيكيتو شوربة السلمون بالكريمة', 'Lohikeitto Salmon Soup with Cream', 'Lohikeitto à la crème', 'Lohikeitto con crema', 'Lohikeitto mit Sahne', 'soups_stews', 'dinner', 12, 7, 7, 'simmering'),
  kalakeitto: profile('كالاكيتو شوربة السمك بالجذور', 'Kalakeitto Fish Soup with Root Vegetables', 'Kalakeitto aux légumes-racines', 'Kalakeitto con verduras de raíz', 'Kalakeitto mit Wurzelgemüse', 'soups_stews', 'lunch', 11, 7, 5, 'simmering'),
  karjalanpaisti: profile('كاريالانبايستي لحم بقري وضأن حلال', 'Karjalanpaisti Karelian Stew with Halal Beef and Lamb', 'Karjalanpaisti au bœuf et à l’agneau halal', 'Karjalanpaisti con ternera y cordero halal', 'Karjalanpaisti, Halal-Rind-Lamm-Eintopf', 'meat_mains', 'dinner', 18, 6, 10, 'stewing'),
  poronkaristys: profile('بورونكاريستيس رنة مقلية بالبطاطس', 'Poronkäristys Reindeer Sauté with Mashed Potatoes', 'Poronkäristys à la purée de pommes de terre', 'Poronkäristys con puré de patatas', 'Poronkäristys mit Kartoffelpüree', 'meat_mains', 'dinner', 20, 13, 9, 'pan_frying'),
  kaalikaaryleet: profile('ملفوف محشو باللحم البقري حلال', 'Kaalikääryleet Cabbage Rolls with Halal Beef', 'Kaalikääryleet au bœuf halal', 'Kaalikääryleet con ternera halal', 'Kaalikääryleet, Kohlrouladen mit Halal-Rind', 'meat_mains', 'dinner', 12, 11, 8, 'simmering'),
  jauhelihakastike: profile('صلصة اللحم البقري المفروم حلال بالبطاطس', 'Jauhelihakastike Halal Beef Sauce with Mashed Potatoes', 'Jauhelihakastike au bœuf halal et à la purée', 'Jauhelihakastike con ternera halal y puré', 'Jauhelihakastike, Halal-Hacksoße mit Kartoffelpüree', 'meat_mains', 'dinner', 14, 12, 8, 'simmering'),
  kalakukko: profile('كالاكوكو فطيرة السمك والجاودار', 'Kalakukko Rye Fish Pie', 'Kalakukko au seigle et au poisson', 'Kalakukko de centeno y pescado', 'Kalakukko, Roggen-Fisch-Pastete', 'fish_seafood', 'dinner', 13, 18, 7, 'baking'),
  riisipuuro: profile('عصيدة الأرز بالقرفة', 'Riisipuuro Rice Porridge with Cinnamon', 'Riisipuuro à la cannelle', 'Riisipuuro con canela', 'Riisipuuro mit Zimt', 'breakfast_items', 'breakfast', 4, 24, 3, 'simmering'),
  karjalanpiirakka: profile('فطائر كاريليا بالأرز وزبدة البيض', 'Karjalanpiirakka Karelian Pasties with Egg Butter', 'Karjalanpiirakka au beurre d’œuf', 'Karjalanpiirakka con mantequilla de huevo', 'Karjalanpiirakka mit Eibutter', 'breakfast_items', 'breakfast', 7, 26, 8, 'baking'),
  munakas_sieni: profile('أومليت الفطر الفنلندي', 'Finnish Mushroom Omelette', 'Omelette finlandaise aux champignons', 'Tortilla finlandesa de setas', 'Finnisches Pilzomelett', 'breakfast_items', 'breakfast', 9, 2, 9, 'pan_frying'),
};

export const EXPANSION_REGIONAL_RECIPES = { ...BASE_REGIONAL_RECIPES };

export const EXPANSION_NATIONAL_RECIPES = {
  hirvipata: profile('يخنة الأيل بالجذور', 'Hirvipata Elk Stew with Root Vegetables', 'Hirvipata aux légumes-racines', 'Hirvipata con verduras de raíz', 'Hirvipata mit Wurzelgemüse', 'meat_mains', 'dinner', 21, 6, 8, 'stewing'),
  janispata: profile('يخنة الأرنب البري بالجذور', 'Jänispata Hare Stew with Root Vegetables', 'Jänispata aux légumes-racines', 'Jänispata con verduras de raíz', 'Jänispata mit Wurzelgemüse', 'meat_mains', 'dinner', 20, 4, 8, 'stewing'),
  metso_rinta: profile('صدر تتهيج بالفرن بالتوت البري', 'Roast Grouse Breast with Lingonberries', 'Poitrine de tétras rôtie aux airelles', 'Pechuga de urogallo asada con arándanos rojos', 'Birkhuhnbrust mit Preiselbeeren gebraten', 'poultry_mains', 'dinner', 22, 3, 8, 'roasting'),
  makaronilaatikko: profile('غراتن المعكرونة باللحم البقري حلال', 'Makaronilaatikko Halal Beef Macaroni Casserole', 'Makaronilaatikko au bœuf halal', 'Makaronilaatikko con ternera halal', 'Makaronilaatikko, Halal-Rinder-Nudelauflauf', 'meat_mains', 'dinner', 12, 20, 9, 'baking'),
  hernekeitto: profile('شوربة البازلاء بلحم بقري حلال', 'Hernekeitto Pea Soup with Halal Beef', 'Hernekeitto au bœuf halal', 'Hernekeitto con ternera halal', 'Hernekeitto, Erbsensuppe mit Halal-Rind', 'soups_stews', 'dinner', 10, 18, 4, 'simmering'),
  muikku_paistettu: profile('مويكو مقلي بفتات الجاودار', 'Fried Vendace with Rye Crumbs', 'Muikku frit à la chapelure de seigle', 'Muikku frito con pan de centeno', 'Muikku mit Roggenpanade gebraten', 'fish_seafood', 'dinner', 16, 8, 9, 'pan_frying'),
  silakka_uuni: profile('سيلاكا مخبوزة بالبطاطس', 'Baked Baltic Herring with Potatoes', 'Hareng de la Baltique au four aux pommes de terre', 'Arenque del Báltico al horno con patatas', 'Ostseehering aus dem Ofen mit Kartoffeln', 'fish_seafood', 'dinner', 13, 12, 7, 'baking'),
  graavilohi_ruis: profile('جرافلوهي على خبز الجاودار', 'Graavilohi Cured Salmon on Rye Bread', 'Graavilohi au pain de seigle', 'Graavilohi en pan de centeno', 'Graavilohi auf Roggenbrot', 'street_snacks', 'lunch', 14, 17, 8, 'assembling'),
  mustikkapiirakka: profile('فطيرة التوت الأزرق بالزبادي', 'Mustikkapiirakka Blueberry Pie with Yogurt', 'Mustikkapiirakka au yaourt', 'Mustikkapiirakka con yogur', 'Mustikkapiirakka mit Joghurt', 'rice_cakes_sweets', 'snack', 4, 26, 8, 'baking'),
  korvapuusti: profile('كورفابوستي بالقرفة', 'Korvapuusti Cinnamon Ears', 'Korvapuusti à la cannelle', 'Korvapuusti con canela', 'Korvapuusti, Zimtschnecken', 'rice_cakes_sweets', 'breakfast', 6, 40, 11, 'baking'),
};

export function B(profileRow, region) {
  const token = REGION_DEMONYM[region];
  if (!token) throw new Error(`Unknown Finland region: ${region}`);
  const extra = REGION_DIASPORA[region];
  const national = region === 'pan_finnish';
  const descriptor = REGIONS.find(([id]) => id === region);
  return {
    id: '',
    nameAr: `${national ? '' : `${descriptor[1]} `}${profileRow.ar} ${token}`.trim(),
    nameEn: `${national ? 'Finnish ' : `${descriptor[2]} `}${profileRow.en}`,
    nameFr: `${national ? 'Cuisine finlandaise : ' : `${descriptor[3]} `}${profileRow.fr}`,
    nameEs: `${national ? 'Cocina finlandesa: ' : `${descriptor[4]} `}${profileRow.es}`,
    nameDe: `${national ? 'Finnische Küche: ' : `${descriptor[5]} `}${profileRow.de}`,
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
      if (!recipes[key]) throw new Error(`Unknown Finland recipe profile: ${key}`);
      rows.push(B(recipes[key], region));
    }
  }
  for (const key of nationalKeys) {
    if (!recipes[key]) throw new Error(`Unknown Finland recipe profile: ${key}`);
    rows.push(B(recipes[key], 'pan_finnish'));
  }
  return rows;
}
