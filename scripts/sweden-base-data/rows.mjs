export const BASE_DIASPORA = ['swedish', 'scandinavian', 'western', 'high_protein'];
export const REGION_DIASPORA = { stockholm: 'stockholmer', malmo: 'scanian', kiruna: 'arctic' };

// Each anchor owns one stable Arabic token; no Swedish row belongs in asian_shared.
export const REGION_DEMONYM = {
  pan_swedish: 'سويدي',
  stockholm: 'ستوكهولمي',
  gothenburg: 'غوتنبرغي',
  malmo: 'مالموي',
  uppsala: 'أوبسالي',
  umea: 'أوميوي',
  kiruna: 'كيروني',
  visby: 'فيسبوي',
  orebro: 'أوريبروي',
  linkoping: 'لينشوبينغي',
};

const REGIONS = [
  ['pan_swedish', 'مطابخ السويد', 'Swedish', 'Cuisine suédoise : ', 'Cocina sueca: ', 'Schwedische Küche: '],
  ['stockholm', 'مطابخ ستوكهولم', 'Stockholm', 'À la stockholmaise : ', 'Al estilo de Estocolmo: ', 'Stockholmer Art: '],
  ['gothenburg', 'مطابخ غوتنبرغ', 'Gothenburg', 'À la gothobourgeoise : ', 'Al estilo de Gotemburgo: ', 'Göteborger Art: '],
  ['malmo', 'مطابخ مالمو', 'Malmö', 'À la malmoïte : ', 'Al estilo de Malmö: ', 'Malmö-Art: '],
  ['uppsala', 'مطابخ أوبسالا', 'Uppsala', 'À l’upsalienne : ', 'Al estilo de Upsala: ', 'Uppsala-Art: '],
  ['umea', 'مطابخ أوميو', 'Umeå', 'À l’uméenne : ', 'Al estilo de Umeå: ', 'Umeå-Art: '],
  ['kiruna', 'مطابخ كيرونا', 'Kiruna', 'À la kirunaise : ', 'Al estilo de Kiruna: ', 'Kiruna-Art: '],
  ['visby', 'مطابخ فيسبي', 'Visby', 'À la visbyite : ', 'Al estilo de Visby: ', 'Visby-Art: '],
  ['orebro', 'مطابخ أوريبرو', 'Örebro', 'À l’örebroise : ', 'Al estilo de Örebro: ', 'Örebro-Art: '],
  ['linkoping', 'مطابخ لينشوبينغ', 'Linköping', 'À la linköpingoise : ', 'Al estilo de Linköping: ', 'Linköping-Art: '],
];

const profile = (ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking) =>
  ({ ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking });

export const BASE_REGIONAL_RECIPES = {
  grilled_salmon_dill: profile('سلمون مشوي بالشبت', 'Grilled Salmon with Dill', 'Saumon grillé à l’aneth', 'Salmón a la parrilla con eneldo', 'Gegrillter Lachs mit Dill', 'fish_seafood', 'dinner', 23, 1, 12, 'grilling'),
  root_veg_stew: profile('يخنة الخضار الجذرية بالشعير', 'Root Vegetable and Barley Stew', 'Mijoté de légumes-racines à l’orge', 'Estofado de verduras de raíz con cebada', 'Wurzelgemüse-Gersten-Eintopf', 'vegetable_mains', 'dinner', 4, 17, 4, 'stewing'),
  yellow_pea_soup: profile('شوربة البازلاء الصفراء بالجزر', 'Yellow Pea Soup with Carrots', 'Soupe de pois jaunes aux carottes', 'Sopa de guisantes amarillos con zanahorias', 'Gelbe Erbsensuppe mit Karotten', 'soups_stews', 'lunch', 7, 17, 3, 'simmering'),
  rye_egg: profile('خبز الجاودار بالبيض المسلوق', 'Rye Bread with Boiled Egg', 'Pain de seigle à l’œuf dur', 'Pan de centeno con huevo cocido', 'Roggenbrot mit gekochtem Ei', 'breakfast_items', 'breakfast', 9, 21, 8, 'assembling'),
  reindeer_stew: profile('يخنة الرنة بالجذور', 'Reindeer Stew with Root Vegetables', 'Mijoté de renne aux légumes-racines', 'Guiso de reno con verduras de raíz', 'Rentier-Eintopf mit Wurzelgemüse', 'meat_mains', 'dinner', 19, 5, 10, 'stewing'),
  elk_patties: profile('أقراص الأيل بالبطاطس', 'Elk Patties with Potatoes', 'Galettes d’élan aux pommes de terre', 'Tortitas de alce con patatas', 'Elchpflanzerl mit Kartoffeln', 'meat_mains', 'dinner', 20, 8, 9, 'pan_frying'),
  salmon_soup_potato: profile('شوربة السلمون بالبطاطس', 'Salmon Soup with Potatoes', 'Soupe de saumon aux pommes de terre', 'Sopa de salmón con patatas', 'Lachssuppe mit Kartoffeln', 'soups_stews', 'lunch', 12, 9, 5, 'simmering'),
  oat_bilberry_cinnamon: profile('عصيدة الشوفان بالتوت الأزرق والقرفة', 'Oat Porridge with Blueberries and Cinnamon', 'Bouillie d’avoine aux myrtilles et à la cannelle', 'Gachas de avena con arándanos y canela', 'Haferbrei mit Blaubeeren und Zimt', 'breakfast_items', 'breakfast', 5, 24, 4, 'simmering'),
};

export const BASE_NATIONAL_RECIPES = {
  kottbullar: profile('كفتة سويدية بلحم بقري حلال', 'Köttbullar Halal Beef Meatballs with Cream Sauce', 'Boulettes suédoises au bœuf halal, sauce crème', 'Albóndigas suecas de ternera halal con crema', 'Köttbullar, Halal-Rinderhackbällchen mit Sahnesoße', 'meat_mains', 'dinner', 16, 6, 11, 'simmering'),
  kottbullar_lingon: profile('كفتة سويدية بالتوت البري حلال', 'Köttbullar with Lingonberries, Halal Beef', 'Boulettes suédoises aux airelles, bœuf halal', 'Albóndigas suecas con arándanos rojos, ternera halal', 'Köttbullar mit Preiselbeeren, Halal-Rind', 'meat_mains', 'dinner', 16, 9, 11, 'simmering'),
  pyttipanna: profile('بيتيبانا لحم بقري حلال بالبيض', 'Pyttipanna Halal Beef Hash with Fried Egg', 'Pyttipanna au bœuf halal et à l’œuf', 'Pyttipanna con ternera halal y huevo', 'Pyttipanna, Halal-Rinderhack mit Spiegelei', 'meat_mains', 'dinner', 15, 12, 10, 'pan_frying'),
  wallenbergare: profile('فالنبرغ لحم عجل حلال', 'Wallenbergare Halal Veal Patty', 'Wallenbergare au veau halal', 'Wallenbergare con ternera halal', 'Wallenbergare, Halal-Kalbsschnitzel', 'meat_mains', 'dinner', 17, 5, 12, 'pan_frying'),
  biff_lindstrom: profile('بيف ليندستروم بالبنجر حلال', 'Biff à la Lindström, Halal Beef with Beetroot', 'Bifteck Lindström à la betterave, bœuf halal', 'Bistec Lindström con remolacha, ternera halal', 'Biff à la Lindström, Halal-Rind mit Roter Bete', 'meat_mains', 'dinner', 17, 5, 11, 'pan_frying'),
  kaldolmar: profile('ملفوف محشو باللحم البقري حلال', 'Kåldolmar Cabbage Rolls with Halal Beef', 'Kåldolmar au bœuf halal', 'Kåldolmar con ternera halal', 'Kåldolmar, Kohlrouladen mit Halal-Rind', 'meat_mains', 'dinner', 13, 10, 8, 'simmering'),
  lammstek: profile('روستو ضأن بالأعشاب حلال', 'Herb Roast Halal Lamb', 'Rôti d’agneau aux herbes halal', 'Asado de cordero con hierbas halal', 'Halal-Lammbraten mit Kräutern', 'meat_mains', 'dinner', 23, 1, 13, 'roasting'),
  kalops: profile('كالوبس يخنة لحم بقري حلال', 'Kalops Halal Beef Stew with Allspice', 'Kalops au bœuf halal et au piment de la Jamaïque', 'Kalops con ternera halal y pimienta de Jamaica', 'Kalops, Halal-Rindereintopf mit Piment', 'meat_mains', 'dinner', 18, 7, 10, 'stewing'),
  sjomansbiff: profile('ستيومانس بيف بالبطاطس حلال', 'Sjömansbiff Halal Beef and Potato Bake, No Beer', 'Sjömansbiff au bœuf halal, sans bière', 'Sjömansbiff con ternera halal, sin cerveza', 'Sjömansbiff, Halal-Rind-Kartoffelauflauf, ohne Bier', 'meat_mains', 'dinner', 15, 11, 9, 'baking'),
  kylling_stek_gulrot: profile('دجاج مشوي بالجزر', 'Roast Chicken with Carrots', 'Poulet rôti aux carottes', 'Pollo asado con zanahorias', 'Brathähnchen mit Karotten', 'poultry_mains', 'dinner', 22, 4, 9, 'roasting'),
  kalkon_biffar: profile('أقراص ديك رومي مشوية', 'Grilled Turkey Patties', 'Galettes de dinde grillées', 'Tortitas de pavo a la plancha', 'Putenpflanzerl vom Grill', 'poultry_mains', 'dinner', 20, 3, 8, 'grilling'),
  kylling_dill_gryta: profile('يخنة الدجاج بالشبت', 'Chicken Stew with Dill', 'Mijoté de poulet à l’aneth', 'Guiso de pollo con eneldo', 'Hähncheneintopf mit Dill', 'poultry_mains', 'dinner', 19, 5, 8, 'stewing'),
  stekt_stromming: profile('رنجة مقلية بالبطاطس المهروسة', 'Fried Herring with Mashed Potatoes', 'Hareng frit à la purée de pommes de terre', 'Arenque frito con puré de patatas', 'Gebratener Strömling mit Kartoffelpüree', 'fish_seafood', 'dinner', 15, 13, 9, 'pan_frying'),
  inlagd_sill: profile('رنجة متبلة بالخل والبصل', 'Pickled Herring with Vinegar and Onion', 'Hareng mariné au vinaigre et à l’oignon', 'Arenque encurtido con vinagre y cebolla', 'Eingelegter Hering mit Essig und Zwiebeln', 'fish_seafood', 'lunch', 10, 6, 5, 'marinating'),
  senap_sill: profile('رنجة بصلصة الخردل', 'Mustard Herring', 'Hareng à la moutarde', 'Arenque a la mostaza', 'Senfhering', 'fish_seafood', 'lunch', 10, 7, 6, 'marinating'),
  gravad_lax: profile('جرافلاكس بالشبت والخردل', 'Gravad Lax with Dill and Mustard Sauce', 'Gravlax à l’aneth, sauce moutarde', 'Gravlax con eneldo y salsa de mostaza', 'Graved Lachs mit Dill und Senfsoße', 'fish_seafood', 'snack', 19, 4, 10, 'marinating'),
  varmrokt_lax: profile('سلمون مدخن ساخن بالفجل', 'Hot-Smoked Salmon with Horseradish', 'Saumon fumé à chaud au raifort', 'Salmón ahumado en caliente con rábano picante', 'Warmer Räucherlachs mit Meerrettich', 'fish_seafood', 'snack', 19, 2, 11, 'smoking'),
  lax_pudding: profile('بودنغ السلمون بالبطاطس', 'Salmon and Potato Pudding', 'Pudding de saumon aux pommes de terre', 'Pudín de salmón con patatas', 'Lachs-Kartoffelpudding', 'fish_seafood', 'dinner', 14, 12, 7, 'baking'),
  stekt_gos: profile('زاندر مقلي بالزبدة', 'Pan-Fried Pike-Perch with Butter', 'Sandre poêlé au beurre', 'Lucioperca a la plancha con mantequilla', 'Zander in Butter gebraten', 'fish_seafood', 'dinner', 20, 1, 7, 'pan_frying'),
  stekt_abborre: profile('قاروص النهر مقلي بالشبت', 'Pan-Fried Perch with Dill', 'Perche poêlée à l’aneth', 'Perca a la plancha con eneldo', 'Barsch in der Pfanne mit Dill', 'fish_seafood', 'dinner', 19, 1, 7, 'pan_frying'),
  fiskgryta_saffran: profile('يخنة السمك بالزعفران', 'Saffron Fish Stew, No Wine', 'Mijoté de poisson au safran, sans vin', 'Guiso de pescado con azafrán, sin vino', 'Safran-Fischeintopf, ohne Wein', 'fish_seafood', 'dinner', 14, 6, 6, 'simmering'),
  rak_sallad: profile('سلطة الروبيان بالشبت', 'Shrimp Salad with Dill', 'Salade de crevettes à l’aneth', 'Ensalada de gambas con eneldo', 'Garnelensalat mit Dill', 'fish_seafood', 'lunch', 12, 4, 8, 'tossing'),
  kraft_sallad: profile('سلطة جراد البحر بالشبت', 'Crayfish Salad with Dill', 'Salade d’écrevisses à l’aneth', 'Ensalada de cangrejos de río con eneldo', 'Krebssalat mit Dill', 'fish_seafood', 'lunch', 11, 3, 5, 'boiling'),
  artsoppa: profile('شوربة البازلاء بلحم بقري حلال', 'Ärtsoppa Yellow Pea Soup with Halal Beef', 'Ärtsoppa au bœuf halal', 'Ärtsoppa con ternera halal', 'Ärtsoppa, Erbsensuppe mit Halal-Rind', 'soups_stews', 'dinner', 10, 18, 4, 'simmering'),
  spenatsoppa: profile('شوربة السبانخ بالبيض', 'Spinach Soup with Egg', 'Soupe d’épinards à l’œuf', 'Sopa de espinacas con huevo', 'Spinatsuppe mit Ei', 'soups_stews', 'lunch', 6, 7, 5, 'simmering'),
  rotmos_smor: profile('هريس الجذور بالزبدة', 'Root Vegetable Mash with Butter', 'Purée de légumes-racines au beurre', 'Puré de verduras de raíz con mantequilla', 'Wurzelgemüsepüree mit Butter', 'vegetable_mains', 'dinner', 3, 15, 6, 'boiling'),
  rodbetsallad: profile('سلطة البنجر بالتفاح والفجل', 'Beetroot Salad with Apple and Horseradish', 'Salade de betterave à la pomme et au raifort', 'Ensalada de remolacha con manzana y rábano picante', 'Rote-Bete-Salat mit Apfel und Meerrettich', 'vegetable_mains', 'lunch', 2, 9, 4, 'tossing'),
  filmjolk_frukost: profile('فيلميلك بالتوت والشوفان', 'Filmjölk with Berries and Oats', 'Filmjölk aux baies et à l’avoine', 'Filmjölk con bayas y avena', 'Filmjölk mit Beeren und Hafer', 'breakfast_items', 'breakfast', 6, 20, 4, 'assembling'),
  knackebrod_ost: profile('خبز مقرمش بالجبن والخيار', 'Crispbread with Cheese and Cucumber', 'Knäckebröd au fromage et au concombre', 'Knäckebröd con queso y pepino', 'Knäckebröd mit Käse und Gurke', 'breakfast_items', 'breakfast', 9, 20, 7, 'assembling'),
  havregrot_blaabar: profile('عصيدة الشوفان بالتوت الأزرق', 'Oat Porridge with Blueberries', 'Bouillie d’avoine aux myrtilles', 'Gachas de avena con arándanos', 'Haferbrei mit Blaubeeren', 'breakfast_items', 'breakfast', 5, 23, 4, 'simmering'),
  renskav: profile('رينسكاف رنة مقلية بالفطر', 'Renskav Sautéed Reindeer with Mushrooms', 'Renskav sauté aux champignons', 'Renskav salteado con setas', 'Renskav mit Pilzen gebraten', 'meat_mains', 'dinner', 21, 4, 11, 'pan_frying'),
  renskav_gryta: profile('يخنة الرنة بالفطر', 'Reindeer Stew with Mushrooms', 'Mijoté de renne aux champignons', 'Guiso de reno con setas', 'Rentier-Eintopf mit Pilzen', 'meat_mains', 'dinner', 20, 5, 9, 'stewing'),
  renskav_potatis: profile('رينسكاف بالبطاطس المهروسة', 'Renskav with Mashed Potatoes', 'Renskav à la purée de pommes de terre', 'Renskav con puré de patatas', 'Renskav mit Kartoffelpüree', 'meat_mains', 'dinner', 19, 13, 10, 'pan_frying'),
  renstek: profile('روستو رنة بالعرعر', 'Roast Reindeer with Juniper', 'Rôti de renne au genévrier', 'Asado de reno con enebro', 'Rentierbraten mit Wacholder', 'meat_mains', 'dinner', 23, 1, 11, 'roasting'),
  suovas: profile('سووفاس رنة مدخنة بالخبز', 'Suovas Smoked Reindeer with Flatbread', 'Suovas de renne fumé au pain plat', 'Suovas de reno ahumado con pan plano', 'Suovas, geräuchertes Rentier mit Fladenbrot', 'meat_mains', 'lunch', 20, 12, 7, 'smoking'),
  torkat_renkott: profile('رنة مجففة وجبة خفيفة', 'Dried Reindeer Snack, Torkat Renkött', 'Torkat renkött, renne séché', 'Torkat renkött, reno seco', 'Torkat Renkött, getrocknetes Rentier', 'meat_mains', 'snack', 26, 1, 6, 'drying'),
  renkottbullar: profile('كرات الرنة بالتوت البري', 'Reindeer Meatballs with Lingonberries', 'Boulettes de renne aux airelles', 'Albóndigas de reno con arándanos rojos', 'Rentierbällchen mit Preiselbeeren', 'meat_mains', 'dinner', 19, 6, 10, 'simmering'),
  ren_gryta_lingon: profile('يخنة الرنة بالتوت البري', 'Reindeer Stew with Lingonberries', 'Mijoté de renne aux airelles', 'Guiso de reno con arándanos rojos', 'Rentier-Eintopf mit Preiselbeeren', 'meat_mains', 'dinner', 20, 7, 9, 'stewing'),
  renfars_biffar: profile('أقراص الرنة بالبصل', 'Reindeer Patties with Onion', 'Galettes de renne à l’oignon', 'Tortitas de reno con cebolla', 'Rentierpflanzerl mit Zwiebeln', 'meat_mains', 'dinner', 20, 4, 10, 'pan_frying'),
  ren_rokt_kall: profile('رنة مدخنة باردة بالخردل', 'Cold-Smoked Reindeer with Mustard', 'Renne fumé à froid à la moutarde', 'Reno ahumado en frío con mostaza', 'Kaltgeräuchertes Rentier mit Senf', 'meat_mains', 'snack', 22, 2, 7, 'smoking'),
  algbiffar: profile('أقراص الأيل بالتوت البري', 'Elk Patties with Lingonberries', 'Galettes d’élan aux airelles', 'Tortitas de alce con arándanos rojos', 'Elchpflanzerl mit Preiselbeeren', 'meat_mains', 'dinner', 21, 6, 9, 'pan_frying'),
  algbullar: profile('كرات الأيل بالكريمة', 'Elk Meatballs with Cream Sauce', 'Boulettes d’élan à la crème', 'Albóndigas de alce con crema', 'Elchbällchen mit Sahnesoße', 'meat_mains', 'dinner', 19, 6, 11, 'simmering'),
  rarak: profile('روراكا بطاطس مقلية ببيض السمك', 'Råraka Potato Cake with Fish Roe', 'Råraka aux œufs de poisson', 'Råraka con huevas', 'Råraka, Kartoffelkuchen mit Fischrogen', 'fish_seafood', 'snack', 8, 18, 8, 'pan_frying'),
  sik_rokt: profile('وايتفيش مدخن بالفجل', 'Smoked Whitefish with Horseradish', 'Corégone fumé au raifort', 'Corégono ahumado con rábano picante', 'Geräucherte Maräne mit Meerrettich', 'fish_seafood', 'snack', 18, 2, 8, 'smoking'),
  stromming_lada: profile('رنجة مخبوزة بالبطاطس', 'Baked Herring with Potatoes', 'Hareng au four aux pommes de terre', 'Arenque al horno con patatas', 'Ofenhering mit Kartoffeln', 'fish_seafood', 'dinner', 13, 12, 7, 'baking'),
  abborre_rodbet: profile('قاروص النهر بالبنجر', 'Perch with Beetroot', 'Perche à la betterave', 'Perca con remolacha', 'Barsch mit Roter Bete', 'fish_seafood', 'dinner', 18, 5, 6, 'pan_frying'),
  gos_citron_sas: profile('زاندر بصلصة الليمون', 'Pike-Perch with Lemon Sauce', 'Sandre à la sauce citron', 'Lucioperca con salsa de limón', 'Zander mit Zitronensoße', 'fish_seafood', 'dinner', 19, 4, 6, 'simmering'),
  lax_gryta_purjo: profile('يخنة السلمون بالكراث', 'Salmon Stew with Leeks', 'Mijoté de saumon aux poireaux', 'Guiso de salmón con puerros', 'Lachseintopf mit Lauch', 'fish_seafood', 'dinner', 17, 6, 8, 'stewing'),
  rakgryta: profile('يخنة الروبيان بالشبت والكريمة', 'Shrimp Stew with Dill and Cream', 'Mijoté de crevettes à l’aneth et à la crème', 'Guiso de gambas con eneldo y crema', 'Garneleneintopf mit Dill und Sahne', 'fish_seafood', 'dinner', 13, 5, 8, 'simmering'),
  fiskgratang_spenat: profile('غراتن السمك بالسبانخ', 'Fish Gratin with Spinach', 'Gratin de poisson aux épinards', 'Gratinado de pescado con espinacas', 'Fischgratin mit Spinat', 'fish_seafood', 'dinner', 13, 8, 8, 'baking'),
  kottfarssas: profile('صلصة اللحم البقري حلال بالباستا', 'Köttfärssås Halal Beef Sauce with Pasta', 'Köttfärssås au bœuf halal avec pâtes', 'Köttfärssås con ternera halal y pasta', 'Köttfärssås, Halal-Rinderhacksoße mit Nudeln', 'noodle_dishes', 'dinner', 14, 20, 8, 'simmering'),
  korv_stroganoff: profile('ستروغانوف السجق البقري حلال', 'Korv Stroganoff with Halal Beef Sausage', 'Korv stroganoff à la saucisse de bœuf halal', 'Korv stroganoff con salchicha de ternera halal', 'Korv Stroganoff mit Halal-Rinderwurst', 'meat_mains', 'dinner', 12, 14, 9, 'simmering'),
  kyckling_stroganoff: profile('ستروغانوف الدجاج بالأرز', 'Chicken Stroganoff with Rice', 'Stroganoff de poulet au riz', 'Stroganoff de pollo con arroz', 'Hähnchen-Stroganoff mit Reis', 'poultry_mains', 'dinner', 18, 18, 8, 'simmering'),
  kalkongryta: profile('يخنة ديك رومي بالخضار', 'Turkey Stew with Vegetables', 'Mijoté de dinde aux légumes', 'Guiso de pavo con verduras', 'Puteneintopf mit Gemüse', 'poultry_mains', 'dinner', 20, 6, 7, 'stewing'),
  lammfarsbiff: profile('أقراص ضأن بالشبت حلال', 'Lamb Patties with Dill, Halal', 'Galettes d’agneau à l’aneth halal', 'Tortitas de cordero con eneldo halal', 'Lammpflanzerl mit Dill, halal', 'meat_mains', 'dinner', 19, 4, 11, 'pan_frying'),
  nasselsoppa: profile('شوربة القراص بالبيض', 'Nettle Soup with Egg', 'Soupe d’orties à l’œuf', 'Sopa de ortigas con huevo', 'Brennnesselsuppe mit Ei', 'soups_stews', 'lunch', 5, 6, 5, 'simmering'),
  kantsoppa: profile('شوربة الكانتاريل بالكريمة', 'Chanterelle Soup with Cream', 'Soupe de chanterelles à la crème', 'Sopa de rebozuelos con crema', 'Pfifferlingscremesuppe', 'soups_stews', 'lunch', 3, 6, 6, 'simmering'),
  blomkalssoppa_ost: profile('شوربة القرنبيط بالجبن', 'Cauliflower Soup with Cheese', 'Soupe de chou-fleur au fromage', 'Sopa de coliflor con queso', 'Blumenkohlsuppe mit Käse', 'soups_stews', 'lunch', 4, 8, 5, 'simmering'),
  kroppkakor: profile('كروبكاكور بطاطس محشوة بالفطر', 'Kroppkakor Potato Dumplings with Mushrooms', 'Kroppkakor farcis aux champignons', 'Kroppkakor rellenos de setas', 'Kroppkakor, Kartoffelklöße mit Pilzen', 'vegetable_mains', 'dinner', 6, 22, 8, 'boiling'),
  palt: profile('بالت بطاطس بالزبدة', 'Palt Potato Dumplings with Butter', 'Palt au beurre', 'Palt con mantequilla', 'Palt, Kartoffelklöße mit Butter', 'vegetable_mains', 'dinner', 6, 24, 7, 'boiling'),
};

export const EXPANSION_REGIONAL_RECIPES = { ...BASE_REGIONAL_RECIPES };

export const EXPANSION_NATIONAL_RECIPES = {
  janssons: profile('غراتن البطاطس بالأنشوجة', 'Janssons Temptation Potato Anchovy Gratin', 'Janssons frestelse, gratin de pommes de terre aux anchois', 'Janssons, gratinado de patatas con anchoas', 'Janssons Versuchung, Kartoffel-Sardellen-Gratin', 'fish_seafood', 'dinner', 7, 15, 9, 'baking'),
  lax_ugn_dill: profile('سلمون بالفرن بالشبت والليمون', 'Oven Salmon with Dill and Lemon', 'Saumon au four à l’aneth et au citron', 'Salmón al horno con eneldo y limón', 'Ofenlachs mit Dill und Zitrone', 'fish_seafood', 'dinner', 23, 1, 13, 'baking'),
  lax_sparris: profile('سلمون مقلي بالهليون', 'Pan-Seared Salmon with Asparagus', 'Saumon poêlé aux asperges', 'Salmón a la plancha con espárragos', 'Gebratener Lachs mit Spargel', 'fish_seafood', 'dinner', 22, 2, 12, 'pan_frying'),
  gos_dill_sas: profile('زاندر بصلصة الشبت', 'Pike-Perch with Dill Sauce', 'Sandre à la sauce d’aneth', 'Lucioperca con salsa de eneldo', 'Zander mit Dillsoße', 'fish_seafood', 'dinner', 19, 4, 6, 'simmering'),
  sik_ugn: profile('سمك وايتفيش مخبوز بالأعشاب', 'Baked Whitefish with Herbs', 'Corégone au four aux herbes', 'Corégono al horno con hierbas', 'Ofenmaräne mit Kräutern', 'fish_seafood', 'dinner', 19, 1, 6, 'baking'),
  rakmacka: profile('شطيرة الروبيان بالبيض المفتوحة', 'Open Shrimp Sandwich with Egg, Räkmacka', 'Räkmacka aux crevettes et à l’œuf', 'Räkmacka con gambas y huevo', 'Räkmacka, Garnelenbrot mit Ei', 'street_snacks', 'lunch', 13, 16, 9, 'assembling'),
  skagen_sallad: profile('سلطة سكاغن بالروبيان', 'Skagen Shrimp Salad', 'Salade Skagen aux crevettes', 'Ensalada Skagen con gambas', 'Skagen-Garnelensalat', 'fish_seafood', 'lunch', 12, 5, 9, 'tossing'),
  fiskbullar_dill: profile('كرات السمك بصلصة الشبت', 'Fish Balls with Dill Sauce', 'Boulettes de poisson à la sauce d’aneth', 'Bolitas de pescado con salsa de eneldo', 'Fischbällchen mit Dillsoße', 'fish_seafood', 'dinner', 12, 7, 6, 'simmering'),
  senap_sill_macka: profile('شطيرة رنجة الخردل', 'Open Mustard Herring Sandwich', 'Smörgås au hareng à la moutarde', 'Sándwich de arenque a la mostaza', 'Senfhering-Brot', 'street_snacks', 'lunch', 11, 16, 8, 'assembling'),
  knacke_rom: profile('خبز مقرمش ببيض السمك', 'Crispbread with Fish Roe', 'Knäckebröd aux œufs de poisson', 'Knäckebröd con huevas', 'Knäckebröd mit Fischrogen', 'street_snacks', 'snack', 9, 17, 7, 'assembling'),
  kottgryta_svamp: profile('يخنة لحم بقري بالفطر حلال', 'Halal Beef and Mushroom Stew', 'Ragoût de bœuf halal aux champignons', 'Estofado de ternera halal con setas', 'Halal-Rindereintopf mit Pilzen', 'meat_mains', 'dinner', 18, 6, 10, 'stewing'),
  lammkarre_rosmarin: profile('ضلوع ضأن بإكليل الجبل حلال', 'Halal Lamb Rack with Rosemary', 'Carré d’agneau au romarin halal', 'Rejilla de cordero con romero halal', 'Halal-Lammkarree mit Rosmarin', 'meat_mains', 'dinner', 23, 0, 14, 'roasting'),
  kottfars_limpa: profile('رغيف اللحم البقري حلال', 'Köttfärslimpa Halal Beef Meatloaf', 'Pain de viande au bœuf halal', 'Pastel de carne de ternera halal', 'Köttfärslimpa, Halal-Rinderhackbraten', 'meat_mains', 'dinner', 17, 8, 11, 'baking'),
  notbog_gryta: profile('يخنة كتف البقر حلال', 'Halal Beef Chuck Stew', 'Ragoût de paleron halal', 'Estofado de aguja de ternera halal', 'Halal-Rinderschulter-Eintopf', 'meat_mains', 'dinner', 19, 6, 10, 'stewing'),
  kyllingfile_citron: profile('فيليه دجاج بالليمون والأعشاب', 'Lemon Chicken Fillet with Herbs', 'Filet de poulet au citron et aux herbes', 'Filete de pollo con limón y hierbas', 'Zitronen-Hähnchenfilet mit Kräutern', 'poultry_mains', 'dinner', 22, 1, 6, 'pan_frying'),
  kylling_gryta_paprika: profile('يخنة الدجاج بالفلفل', 'Chicken Stew with Peppers', 'Mijoté de poulet aux poivrons', 'Guiso de pollo con pimientos', 'Hähncheneintopf mit Paprika', 'poultry_mains', 'dinner', 19, 7, 7, 'stewing'),
  andbrost_apelsin: profile('صدر بطة بالبرتقال', 'Duck Breast with Orange', 'Magret de canard à l’orange', 'Pechuga de pato con naranja', 'Entenbrust mit Orange', 'poultry_mains', 'dinner', 20, 6, 12, 'roasting'),
  rotfruktsgryta_korn: profile('يخنة الجذور بالشعير والأعشاب', 'Root Vegetable and Barley Stew with Herbs', 'Mijoté de légumes-racines à l’orge et aux herbes', 'Guiso de verduras de raíz con cebada y hierbas', 'Wurzelgemüse-Gersten-Eintopf mit Kräutern', 'vegetable_mains', 'dinner', 4, 18, 4, 'stewing'),
  palsternacka_pure: profile('هريس الجزر الأبيض بالزبدة', 'Parsnip Purée with Butter', 'Purée de panais au beurre', 'Puré de chirivía con mantequilla', 'Pastinakenpüree mit Butter', 'vegetable_mains', 'lunch', 2, 12, 6, 'boiling'),
  brysselkal_gratang: profile('غراتن كرنب بروكسل', 'Brussels Sprouts Gratin', 'Gratin de choux de Bruxelles', 'Gratinado de coles de Bruselas', 'Rosenkohlgratin', 'vegetable_mains', 'dinner', 5, 9, 8, 'baking'),
  gulbeta_soppa: profile('شوربة البنجر بالكريمة', 'Beetroot Soup with Cream', 'Soupe de betterave à la crème', 'Sopa de remolacha con crema', 'Rote-Bete-Suppe mit Sahne', 'soups_stews', 'lunch', 3, 9, 5, 'simmering'),
  svampsoppa: profile('شوربة الفطر بالكريمة', 'Creamy Mushroom Soup', 'Soupe de champignons à la crème', 'Sopa de setas cremosa', 'Pilzcremesuppe', 'soups_stews', 'lunch', 4, 7, 6, 'simmering'),
  gronkal_stuvning: profile('كرنب أخضر مطهو بالكريمة', 'Creamed Kale', 'Chou frisé à la crème', 'Col rizada en crema', 'Grünkohl in Sahne', 'vegetable_mains', 'lunch', 4, 7, 6, 'simmering'),
  frukost_pannkakor: profile('فطائر سويدية بالتوت البري', 'Swedish Pancakes with Lingonberries', 'Crêpes suédoises aux airelles', 'Tortitas suecas con arándanos rojos', 'Schwedische Pfannkuchen mit Preiselbeeren', 'breakfast_items', 'breakfast', 6, 30, 9, 'pan_frying'),
  saffranspannkaka: profile('فطيرة الزعفران بالأرز', 'Saffron Rice Pancake, Gotland Style', 'Pancake au safran et au riz de Gotland', 'Tortita de azafrán con arroz de Gotland', 'Safran-Reis-Pfannkuchen aus Gotland', 'rice_cakes_sweets', 'snack', 5, 28, 8, 'baking'),
  risgrynsgrot: profile('عصيدة الأرز بالقرفة', 'Rice Porridge with Cinnamon', 'Bouillie de riz à la cannelle', 'Gachas de arroz con canela', 'Milchreisbrei mit Zimt', 'breakfast_items', 'breakfast', 4, 24, 3, 'simmering'),
  kanelbulle: profile('لفائف القرفة السويدية', 'Swedish Cinnamon Buns, Kanelbulle', 'Kanelbulle à la cannelle', 'Kanelbulle con canela', 'Kanelbulle, Zimtschnecke', 'rice_cakes_sweets', 'breakfast', 6, 40, 11, 'baking'),
  kardemummabulle: profile('لفائف الهيل', 'Cardamom Buns', 'Boulés à la cardamome', 'Bollos de cardamomo', 'Kardamom-Schnecken', 'breakfast_items', 'breakfast', 6, 41, 11, 'baking'),
  smultron_yoghurt: profile('زبادي بالفراولة البرية', 'Yogurt with Wild Strawberries', 'Yaourt aux fraises des bois', 'Yogur con fresas silvestres', 'Joghurt mit Walderdbeeren', 'breakfast_items', 'breakfast', 6, 17, 4, 'assembling'),
  ostkaka: profile('كعكة الجبن السويدية بالكريمة', 'Ostkaka Swedish Cheesecake with Cream', 'Ostkaka à la crème', 'Ostkaka con crema', 'Ostkaka, schwedischer Käsekuchen', 'rice_cakes_sweets', 'snack', 8, 26, 10, 'baking'),
  algstek: profile('روستو الأيل بالعرعر', 'Elk Roast with Juniper', 'Rôti d’élan au genévrier', 'Asado de alce con enebro', 'Elchbraten mit Wacholder', 'meat_mains', 'dinner', 24, 1, 10, 'roasting'),
  alggryta: profile('يخنة الأيل بالجذور', 'Elk Stew with Root Vegetables', 'Mijoté d’élan aux légumes-racines', 'Guiso de alce con verduras de raíz', 'Elch-Eintopf mit Wurzelgemüse', 'meat_mains', 'dinner', 21, 6, 8, 'stewing'),
  algfars_limpa: profile('رغيف لحم الأيل بالفلفل الحلو', 'Elk Meatloaf with Allspice', 'Pain de viande d’élan au piment de la Jamaïque', 'Pastel de carne de alce con pimienta de Jamaica', 'Elch-Hackbraten mit Piment', 'meat_mains', 'dinner', 19, 7, 10, 'baking'),
  alg_burgare: profile('برغر الأيل بالبصل المكرمل', 'Elk Burger with Caramelized Onion', 'Burger d’élan à l’oignon caramélisé', 'Hamburguesa de alce con cebolla caramelizada', 'Elchburger mit karamellisierten Zwiebeln', 'meat_mains', 'lunch', 19, 13, 10, 'pan_frying'),
  algskav: profile('أيلسكاف مقلي بالفطر', 'Elk Sauté with Mushrooms', 'Élan sauté aux champignons', 'Alce salteado con setas', 'Elch mit Pilzen gebraten', 'meat_mains', 'dinner', 21, 3, 10, 'pan_frying'),
  hjortstek: profile('روستو الغزال بالأعشاب', 'Venison Roast with Herbs', 'Rôti de chevreuil aux herbes', 'Asado de venado con hierbas', 'Rehbraten mit Kräutern', 'meat_mains', 'dinner', 24, 1, 9, 'roasting'),
  hjortgryta: profile('يخنة الغزال بالفطر', 'Venison Stew with Mushrooms', 'Mijoté de chevreuil aux champignons', 'Guiso de venado con setas', 'Reh-Eintopf mit Pilzen', 'meat_mains', 'dinner', 22, 4, 8, 'stewing'),
  hjortbullar: profile('كرات الغزال بالكريمة', 'Venison Meatballs with Cream Sauce', 'Boulettes de chevreuil à la crème', 'Albóndigas de venado con crema', 'Rehbällchen mit Sahnesoße', 'meat_mains', 'dinner', 19, 5, 11, 'simmering'),
  orrbrost: profile('صدر التتهيج بالفرن بالجذور', 'Roast Grouse Breast with Root Vegetables', 'Poitrine de tétras rôtie aux légumes-racines', 'Pechuga de urogallo asada con verduras de raíz', 'Birkhuhnbrust aus dem Ofen mit Wurzelgemüse', 'poultry_mains', 'dinner', 22, 3, 8, 'roasting'),
  tjaderbrost: profile('صدر الديك البري بالتوت البري', 'Roast Capercaillie with Lingonberries', 'Grand tétras rôti aux airelles', 'Urogallo asado con arándanos rojos', 'Auerhahn mit Preiselbeeren gebraten', 'poultry_mains', 'dinner', 22, 4, 8, 'roasting'),
  rapphons: profile('سمان مشوي بالأعشاب', 'Roast Quail with Herbs', 'Cailles rôties aux herbes', 'Codornices asadas con hierbas', 'Wachteln mit Kräutern gebraten', 'poultry_mains', 'dinner', 21, 1, 9, 'roasting'),
  vildand_apple: profile('بطة برية بالفرن بالتفاح', 'Wild Duck with Apple', 'Canard sauvage à la pomme', 'Pato salvaje con manzana', 'Wildente mit Apfel', 'poultry_mains', 'dinner', 19, 6, 11, 'roasting'),
  hjortfars_limpa: profile('رغيف لحم الغزال بالأعشاب', 'Venison Meatloaf with Herbs', 'Pain de viande de chevreuil aux herbes', 'Pastel de carne de venado con hierbas', 'Reh-Hackbraten mit Kräutern', 'meat_mains', 'dinner', 19, 7, 10, 'baking'),
  ren_gryta_selleri: profile('يخنة الرنة بالكرفس', 'Reindeer Stew with Celeriac', 'Mijoté de renne au céleri-rave', 'Guiso de reno con apionabo', 'Rentier-Eintopf mit Sellerie', 'meat_mains', 'dinner', 20, 6, 9, 'stewing'),
  orrgryta: profile('يخنة التتهيج بالجذور', 'Grouse Stew with Root Vegetables', 'Mijoté de tétras aux légumes-racines', 'Guiso de urogallo con verduras de raíz', 'Birkhuhn-Eintopf mit Wurzelgemüse', 'poultry_mains', 'dinner', 20, 5, 8, 'stewing'),
  raggmunk: profile('راغمونك بطاطس مقلي بالبيض', 'Raggmunk Potato Pancake with Fried Egg', 'Raggmunk à l’œuf au plat', 'Raggmunk con huevo frito', 'Raggmunk, Kartoffelpuffer mit Spiegelei', 'vegetable_mains', 'lunch', 7, 18, 9, 'pan_frying'),
  filmjolk_granola: profile('فيلميلك بالجرانولا والتفاح', 'Filmjölk with Granola and Apple', 'Filmjölk au granola et à la pomme', 'Filmjölk con granola y manzana', 'Filmjölk mit Granola und Apfel', 'breakfast_items', 'breakfast', 7, 24, 5, 'assembling'),
  ris_a_la_malta: profile('أرز بالكريمة والبرتقال', 'Ris à la Malta Rice Cream with Orange', 'Ris à la Malta à l’orange', 'Ris à la Malta con naranja', 'Ris à la Malta mit Orange', 'rice_cakes_sweets', 'snack', 4, 24, 8, 'assembling'),
  chokladboll: profile('كرات الشوكولاتة بالشوفان', 'Chocolate Oat Balls', 'Boules d’avoine au chocolat', 'Bolas de avena con chocolate', 'Schoko-Hafer-Kugeln', 'rice_cakes_sweets', 'snack', 4, 26, 12, 'confectioning'),
  pepparkaka: profile('بسكويت الزنجبيل السويدي', 'Swedish Ginger Thins, Pepparkaka', 'Pepparkaka au gingembre', 'Pepparkaka con jengibre', 'Pepparkaka, schwedische Ingwerplätzchen', 'rice_cakes_sweets', 'snack', 4, 44, 10, 'baking'),
  lussekatt: profile('لفائف الزعفران', 'Saffron Buns, Lussekatter', 'Lussekatter au safran', 'Lussekatter con azafrán', 'Lussekatter, Safranbrötchen', 'breakfast_items', 'breakfast', 6, 42, 9, 'baking'),
  semla: profile('سيملا باللوز والكريمة', 'Semla Almond Cream Bun', 'Semla aux amandes et à la crème', 'Semla con almendra y crema', 'Semla, Mandel-Sahne-Brötchen', 'rice_cakes_sweets', 'snack', 7, 36, 14, 'baking'),
  prinsesstarta: profile('كعكة الأميرة بالكاسترد', 'Princess Cake with Custard', 'Gâteau princesse à la crème pâtissière', 'Tarta princesa con crema', 'Prinzessinnentorte mit Vanillecreme', 'rice_cakes_sweets', 'snack', 5, 30, 11, 'baking'),
  kladdkaka: profile('كعكة الشوكولاتة اللزجة', 'Kladdkaka Sticky Chocolate Cake', 'Kladdkaka au chocolat fondant', 'Kladdkaka de chocolate fundente', 'Kladdkaka, saftiger Schokokuchen', 'rice_cakes_sweets', 'snack', 5, 34, 12, 'baking'),
  pannacotta_hallon: profile('باناكوتا بالتوت', 'Pannacotta with Raspberries', 'Panna cotta aux framboises', 'Panna cotta con frambuesas', 'Panna Cotta mit Himbeeren', 'rice_cakes_sweets', 'snack', 3, 16, 9, 'simmering'),
  nyponsoppa: profile('شوربة ثمر الورد بالزبادي', 'Rose Hip Soup with Yogurt', 'Soupe d’églantier au yaourt', 'Sopa de escaramujo con yogur', 'Hagebuttensuppe mit Joghurt', 'rice_cakes_sweets', 'snack', 2, 14, 2, 'simmering'),
  aggost: profile('إيغوست بالتوت', 'Äggost Egg Cheese with Berries', 'Äggost aux baies', 'Äggost con bayas', 'Äggost mit Beeren', 'rice_cakes_sweets', 'snack', 8, 18, 6, 'simmering'),
  tunnbrod_ost: profile('خبز رقيق شمالي بالجبن', 'Tunnbröd Thin Bread with Cheese', 'Tunnbröd au fromage', 'Tunnbröd con queso', 'Tunnbröd mit Käse', 'breakfast_items', 'breakfast', 8, 30, 6, 'baking'),
  havredryck_bar: profile('مشروب الشوفان بالتوت', 'Oat Drink with Berries', 'Boisson d’avoine aux baies', 'Bebida de avena con bayas', 'Haferdrink mit Beeren', 'beverages', 'breakfast', 3, 16, 3, 'blending'),
  morotssoppa_kram: profile('شوربة الجزر بالزنجبيل والكريمة', 'Carrot Soup with Ginger and Cream', 'Soupe de carottes au gingembre et à la crème', 'Sopa de zanahoria con jengibre y crema', 'Karotten-Ingwer-Suppe mit Sahne', 'soups_stews', 'lunch', 2, 11, 5, 'simmering'),
};

export function B(profileRow, region) {
  const token = REGION_DEMONYM[region];
  if (!token) throw new Error(`Unknown Sweden region: ${region}`);
  const extra = REGION_DIASPORA[region];
  const national = region === 'pan_swedish';
  const descriptor = REGIONS.find(([id]) => id === region);
  return {
    id: '',
    nameAr: `${national ? '' : `${descriptor[1]} `}${profileRow.ar} ${token}`.trim(),
    nameEn: `${national ? 'Swedish ' : `${descriptor[2]} `}${profileRow.en}`,
    nameFr: `${national ? 'Cuisine suédoise : ' : `${descriptor[3]} `}${profileRow.fr}`,
    nameEs: `${national ? 'Cocina sueca: ' : `${descriptor[4]} `}${profileRow.es}`,
    nameDe: `${national ? 'Schwedische Küche: ' : `${descriptor[5]} `}${profileRow.de}`,
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
      if (!recipes[key]) throw new Error(`Unknown Sweden recipe profile: ${key}`);
      rows.push(B(recipes[key], region));
    }
  }
  for (const key of nationalKeys) {
    if (!recipes[key]) throw new Error(`Unknown Sweden recipe profile: ${key}`);
    rows.push(B(recipes[key], 'pan_swedish'));
  }
  return rows;
}
