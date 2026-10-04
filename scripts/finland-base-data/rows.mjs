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
  savukala_peruna: profile('سمك مدخن بالبطاطس الجديدة', 'Smoked Fish with New Potatoes', 'Poisson fumé aux pommes de terre nouvelles', 'Pescado ahumado con patatas nuevas', 'Geräucherter Fisch mit neuen Kartoffeln', 'fish_seafood', 'dinner', 18, 12, 9, 'grilling'),
  rontonen: profile('رونتونن معجنات التوت', 'Rönttönen Berry Pastries', 'Rönttönen aux baies', 'Rönttönen de bayas', 'Rönttönen mit Beeren', 'rice_cakes_sweets', 'snack', 3, 25, 7, 'baking'),
  vispipuuro: profile('فيسيبيورو عصيدة التوت المخفوقة', 'Vispipuuro Whipped Bilberry Porridge', 'Bouillie fouettée aux myrtilles', 'Gachas batidas de arándano', 'Gerührter Blaubeerbrei', 'breakfast_items', 'breakfast', 3, 20, 2, 'simmering'),
  hilla_kiisseli: profile('كييسلي التوت السحابي', 'Cloudberry Kiisseli', 'Kiisseli à la mûre arctique', 'Kiisseli de mora de los pantanos', 'Moltebeeren-Kiisseli', 'rice_cakes_sweets', 'snack', 1, 18, 0, 'simmering'),
  karpalo_kiisseli: profile('كييسلي التوت البري', 'Cranberry Kiisseli', 'Kiisseli aux canneberges', 'Kiisseli de arándano rojo', 'Preiselbeer-Kiisseli', 'rice_cakes_sweets', 'snack', 1, 17, 0, 'simmering'),
  tattaripuuro: profile('عصيدة الحنطة السوداء', 'Buckwheat Porridge', 'Bouillie de sarrasin', 'Gachas de trigo sarraceno', 'Buchweizenbrei', 'breakfast_items', 'breakfast', 5, 21, 3, 'simmering'),
  hapankorppu: profile('خبز الجاودار المقرمش', 'Rye Crispbread', 'Pain croustillant de seigle', 'Pan crujiente de centeno', 'Knäckebrot aus Roggen', 'breakfast_items', 'breakfast', 8, 58, 3, 'baking'),
  janssoninkiusaus: profile('غراتن البطاطس بالأنشوجة', 'Potato Anchovy Casserole', 'Gratin de pommes de terre aux anchois', 'Gratin de patatas con anchoas', 'Kartoffel-Sardellen-Auflauf', 'fish_seafood', 'lunch', 6, 14, 7, 'baking'),
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
  kaalilaatikko: profile('كاليلااتيكو كسرات الملفوف بحلال اللحم البقري', 'Kaalilaatikko Halal Beef Cabbage Casserole', 'Kaalilaatikko au bœuf halal', 'Kaalilaatikko con ternera halal', 'Kaalilaatikko, Halal-Rinder-Kohl-Auflauf', 'meat_mains', 'dinner', 10, 14, 5, 'baking'),
  maksalaatikko: profile('ماكسالاتيكو غراتن الكبد والأرز', 'Maksalaatikko Liver and Rice Casserole', 'Maksalaatikko au foie et au riz', 'Maksalaatikko de hígado y arroz', 'Maksalaatikko, Leber-Reis-Auflauf', 'meat_mains', 'dinner', 14, 16, 6, 'baking'),
  riisilaatikko: profile('ريسيلااتيكو غراتن الأرز بحلال اللحم البقري', 'Riisilaatikko Halal Beef Rice Casserole', 'Riisilaatikko au bœuf halal', 'Riisilaatikko con ternera halal', 'Riisilaatikko, Halal-Rinder-Auflauf', 'meat_mains', 'dinner', 11, 22, 5, 'baking'),
  lanttulaatikko: profile('لانتولااتيكو غراتن اللفت', 'Lanttulaatikko Rutabaga Casserole', 'Lanttulaatikko aux rutabagas', 'Lanttulaatikko de nabicol', 'Lanttulaatikko, Steckrüben-Auflauf', 'vegetable_mains', 'dinner', 3, 14, 3, 'baking'),
  mannapuuro: profile('عصيدة السميد', 'Semolina Porridge', 'Bouillie de semoule', 'Gachas de sémola', 'Grießbrei', 'breakfast_items', 'breakfast', 4, 23, 2, 'simmering'),
  kalakakku: profile('كرات السمك بالجاودار', 'Finnish Fish Cakes', 'Galettes de poisson finlandaises', 'Tortitas de pescado finlandesas', 'Finnische Fischfrikadellen', 'fish_seafood', 'lunch', 13, 10, 6, 'pan_frying'),
  lohimureke: profile('لوهيمووريكه قالب السلمون', 'Lohimureke Salmon Loaf', 'Lohimureke au saumon', 'Lohimureke de salmón', 'Lohimureke, Lachsauflauf', 'fish_seafood', 'dinner', 17, 3, 9, 'baking'),
  kaalikeitto: profile('شوربة الملفوف', 'Cabbage Soup', 'Soupe au chou', 'Sopa de col', 'Kohlsuppe', 'soups_stews', 'lunch', 5, 12, 2, 'simmering'),
  piimapannukakku: profile('بانوكاكو بييما بالفرن', 'Buttermilk Oven Pancake', 'Pannukakku au piimä', 'Pannukakku de suero de leche', 'Pannukakku mit Piimä', 'breakfast_items', 'breakfast', 6, 30, 5, 'baking'),
  lohiperunavuoka: profile('لوهيبيرونافووكا السلمون والبطاطس', 'Salmon and Potato Casserole', 'Gratin de saumon et pommes de terre', 'Gratin de salmón y patatas', 'Lachs-Kartoffel-Auflauf', 'fish_seafood', 'dinner', 15, 13, 8, 'baking'),
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
  rosolli: profile('روسولي سلطة البنجر', 'Rosolli Beet Salad', 'Rosolli, salade de betterave', 'Rosolli, ensalada de remolacha', 'Rosolli, Rote-Bete-Salat', 'vegetable_mains', 'lunch', 3, 12, 4, 'assembling'),
  sillisalaatti: profile('سلطة الرنجة', 'Herring Salad', 'Salade de hareng', 'Ensalada de arenque', 'Heringssalat', 'fish_seafood', 'lunch', 9, 6, 7, 'assembling'),
  uunilohi: profile('أونيلوكي سلمون بالفرن', 'Oven-Baked Salmon', 'Saumon au four', 'Salmón al horno', 'Lachs aus dem Ofen', 'fish_seafood', 'dinner', 20, 0, 11, 'baking'),
  lihakeitto: profile('ليهاكيتو شوربة اللحم البقري حلال', 'Lihakeitto Halal Beef Soup', 'Lihakeitto au bœuf halal', 'Lihakeitto con ternera halal', 'Lihakeitto, Halal-Rind-Suppe', 'soups_stews', 'dinner', 9, 8, 3, 'simmering'),
  silakkapihvi: profile('شرائح الرنجة المقلية', 'Fried Baltic Herring Patties', 'Galettes de hareng de la Baltique', 'Tortitas de arenque del Báltico', 'Ostseehering-Frikadellen', 'fish_seafood', 'dinner', 14, 8, 8, 'pan_frying'),
  kaalipiirakka: profile('كاليبييراكا فطيرة الملفوف', 'Cabbage Pie', 'Tourte au chou', 'Empanada de col', 'Kohlkuchen', 'vegetable_mains', 'lunch', 6, 18, 6, 'baking'),
  pannukakku: profile('بانوكاكو فطيرة الفرن الفنلندية', 'Finnish Oven Pancake', 'Pannukakku finlandais', 'Pannukakku finlandés', 'Finnischer Ofenpfannkuchen', 'breakfast_items', 'breakfast', 5, 25, 4, 'baking'),
  runebergintorttu: profile('تورت روبنبرغ', 'Runeberg Tortes', 'Tortes Runeberg', 'Tartas Runeberg', 'Runeberg-Törtchen', 'rice_cakes_sweets', 'snack', 5, 30, 9, 'baking'),
  pulla: profile('بولا خبز الهيل', 'Cardamom Bread', 'Pulla à la cardamome', 'Pulla de cardamomo', 'Kardamombrot Pulla', 'rice_cakes_sweets', 'breakfast', 7, 45, 8, 'baking'),
  lohipasteija: profile('لوهيباستييا معجنات السلمون', 'Salmon Pastries', 'Pâtisseries au saumon', 'Pasteles de salmón', 'Lachs-Pasteten', 'fish_seafood', 'snack', 11, 12, 8, 'baking'),
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
