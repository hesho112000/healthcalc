export const BASE_DIASPORA = ['danish', 'scandinavian', 'western', 'high_protein'];
export const REGION_DIASPORA = { copenhagen: 'copenhagener', aarhus: 'jutland', ronne: 'bornholmian' };

// Each anchor owns one stable Arabic token; no Danish row belongs in asian_shared.
export const REGION_DEMONYM = {
  pan_danish: 'دنماركي',
  copenhagen: 'كوبنهاغني',
  aarhus: 'آرهوسي',
  odense: 'أودنسي',
  aalborg: 'أولبورغي',
  esbjerg: 'إسبيرغي',
  roskilde: 'روسكيلدي',
  helsingor: 'هلسينغوري',
  skagen: 'سكاغني',
  ronne: 'رونيي',
};

const REGIONS = [
  ['pan_danish', 'مطابخ الدنمارك', 'Danish', 'Cuisine danoise : ', 'Cocina danesa: ', 'Dänische Küche: '],
  ['copenhagen', 'مطابخ كوبنهاغن', 'Copenhagen', 'À la copenhagoise : ', 'Al estilo de Copenhague: ', 'Kopenhagener Art: '],
  ['aarhus', 'مطابخ آرهوس', 'Aarhus', 'À l’aarhusienne : ', 'Al estilo de Aarhus: ', 'Aarhus-Art: '],
  ['odense', 'مطابخ أودنسه', 'Odense', 'À l’odensienne : ', 'Al estilo de Odense: ', 'Odense-Art: '],
  ['aalborg', 'مطابخ أولبورغ', 'Aalborg', 'À l’aalborgienne : ', 'Al estilo de Aalborg: ', 'Aalborg-Art: '],
  ['esbjerg', 'مطابخ إسبيرغ', 'Esbjerg', 'À l’esbjergienne : ', 'Al estilo de Esbjerg: ', 'Esbjerg-Art: '],
  ['roskilde', 'مطابخ روسكيلده', 'Roskilde', 'À la roskildoise : ', 'Al estilo de Roskilde: ', 'Roskilde-Art: '],
  ['helsingor', 'مطابخ هلسينغور', 'Helsingør', 'À l’helsingöroise : ', 'Al estilo de Helsingør: ', 'Helsingør-Art: '],
  ['skagen', 'مطابخ سكاغن', 'Skagen', 'À la skagenaise : ', 'Al estilo de Skagen: ', 'Skagen-Art: '],
  ['ronne', 'مطابخ رونيه', 'Rønne', 'À la rønnoise : ', 'Al estilo de Rønne: ', 'Rønne-Art: '],
];

const profile = (ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking) =>
  ({ ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking });

export const BASE_REGIONAL_RECIPES = {
  fried_herring_onion: profile('رنجة مقلية بالبصل', 'Fried Herring with Onion', 'Hareng frit à l’oignon', 'Arenque frito con cebolla', 'Gebratener Hering mit Zwiebeln', 'fish_seafood', 'dinner', 15, 8, 9, 'pan_frying'),
  root_veg_barley_stew: profile('يخنة الخضار الجذرية بالشعير', 'Root Vegetable and Barley Stew', 'Mijoté de légumes-racines à l’orge', 'Estofado de verduras de raíz con cebada', 'Wurzelgemüse-Gersten-Eintopf', 'vegetable_mains', 'dinner', 4, 17, 4, 'stewing'),
  yellow_pea_carrot_soup: profile('شوربة البازلاء الصفراء بالجزر', 'Yellow Pea Soup with Carrots', 'Soupe de pois jaunes aux carottes', 'Sopa de guisantes amarillos con zanahorias', 'Gelbe Erbsensuppe mit Karotten', 'soups_stews', 'lunch', 7, 17, 3, 'simmering'),
  oat_berry_porridge: profile('عصيدة الشوفان بالتوت', 'Oat Porridge with Berries', 'Bouillie d’avoine aux baies', 'Gachas de avena con bayas', 'Haferbrei mit Beeren', 'breakfast_items', 'breakfast', 5, 22, 4, 'simmering'),
};

export const BASE_NATIONAL_RECIPES = {
  frikadeller: profile('فريكاديلر لحم بقري حلال', 'Frikadeller Halal Beef Meatballs', 'Frikadeller au bœuf halal', 'Frikadeller con ternera halal', 'Frikadeller, Halal-Rinderfrikadellen', 'meat_mains', 'dinner', 16, 5, 10, 'pan_frying'),
  hakkebof: profile('هاكبوف بصل مقلي حلال', 'Hakkebøf Halal Beef Patty with Fried Onions', 'Hakkebøf au bœuf halal et aux oignons frits', 'Hakkebøf con ternera halal y cebolla frita', 'Hakkebøf, Halal-Rindfleischpflanzerl mit Röstzwiebeln', 'meat_mains', 'dinner', 18, 4, 11, 'pan_frying'),
  boller_karry: profile('كرات لحم بقري بالكاري حلال', 'Boller i Karry, Halal Beef Meatballs in Curry', 'Boller i karry au bœuf halal', 'Boller i karry con ternera halal', 'Boller i Karry, Halal-Rinderbällchen in Curry', 'meat_mains', 'dinner', 14, 8, 9, 'simmering'),
  oksesteg: profile('روستو بقر بالأعشاب حلال', 'Herb Roast Halal Beef', 'Rôti de bœuf aux herbes halal', 'Asado de res con hierbas halal', 'Halal-Rinderbraten mit Kräutern', 'meat_mains', 'dinner', 24, 1, 13, 'roasting'),
  lammesteg: profile('روستو ضأن بإكليل الجبل حلال', 'Roast Halal Lamb with Rosemary', 'Rôti d’agneau au romarin halal', 'Asado de cordero con romero halal', 'Halal-Lammbraten mit Rosmarin', 'meat_mains', 'dinner', 23, 1, 13, 'roasting'),
  kyllingesteg: profile('دجاج مشوي بالجذور', 'Roast Chicken with Root Vegetables', 'Poulet rôti aux légumes-racines', 'Pollo asado con verduras de raíz', 'Brathähnchen mit Wurzelgemüse', 'poultry_mains', 'dinner', 22, 5, 9, 'roasting'),
  andesteg: profile('بطة مشوية بالتفاح', 'Roast Duck with Apple', 'Canard rôti à la pomme', 'Pato asado con manzana', 'Ente mit Apfel gebraten', 'poultry_mains', 'dinner', 20, 6, 12, 'roasting'),
  gasesteg: profile('إوزة مشوية بالتفاح', 'Roast Goose with Apple', 'Oie rôtie à la pomme', 'Ganso asado con manzana', 'Gans mit Apfel gebraten', 'poultry_mains', 'dinner', 19, 5, 14, 'roasting'),
  kalvefrikasse: profile('فريكاسيه عجل بالجذور حلال', 'Veal Fricassee with Root Vegetables, Halal', 'Fricassée de veau halal aux légumes-racines', 'Fricasé de ternera halal con verduras de raíz', 'Kalbfrikassee mit Wurzelgemüse, halal', 'meat_mains', 'dinner', 17, 7, 8, 'simmering'),
  kod_gryde: profile('يخنة لحم بقري بالجذور حلال', 'Halal Beef Stew with Root Vegetables', 'Ragoût de bœuf halal aux légumes-racines', 'Estofado de ternera halal con verduras de raíz', 'Halal-Rindereintopf mit Wurzelgemüse', 'meat_mains', 'dinner', 18, 8, 9, 'stewing'),
  gule_aerter: profile('شوربة البازلاء الصفراء بلحم بقري حلال', 'Gule Ærter Yellow Pea Soup with Halal Beef', 'Gule ærter au bœuf halal', 'Gule ærter con ternera halal', 'Gule Ærter, Erbsensuppe mit Halal-Rind', 'soups_stews', 'dinner', 10, 18, 4, 'simmering'),
  honesupp: profile('شوربة الدجاج بالخضار', 'Hønsekødssuppe Chicken Soup with Vegetables', 'Hønsekødssuppe aux légumes', 'Hønsekødssuppe con verduras', 'Hønsekødssuppe mit Gemüse', 'soups_stews', 'lunch', 11, 7, 3, 'simmering'),
  gronlangkal: profile('كرنب أخضر مطهو بلحم بقري حلال', 'Grønlangkål Kale Stew with Halal Beef', 'Grønlangkål au bœuf halal', 'Grønlangkål con ternera halal', 'Grønlangkål, Grünkohleintopf mit Halal-Rind', 'meat_mains', 'dinner', 12, 8, 8, 'stewing'),
  stegt_sild: profile('رنجة مقلية بالبطاطس', 'Fried Herring with Potatoes', 'Hareng frit aux pommes de terre', 'Arenque frito con patatas', 'Gebratener Hering mit Kartoffeln', 'fish_seafood', 'dinner', 15, 12, 9, 'pan_frying'),
  marineret_sild: profile('رنجة متبلة بالخل والبصل', 'Marinated Herring with Onion', 'Hareng mariné à l’oignon', 'Arenque marinado con cebolla', 'Marinierter Hering mit Zwiebeln', 'fish_seafood', 'lunch', 10, 6, 5, 'marinating'),
  karrysild: profile('رنجة بصلصة الكاري والبيض', 'Curry Herring with Egg', 'Hareng au curry et à l’œuf', 'Arenque al curry con huevo', 'Curryhering mit Ei', 'fish_seafood', 'lunch', 11, 6, 7, 'marinating'),
  roget_laks: profile('سلمون مدخن بالشبت', 'Smoked Salmon with Dill', 'Saumon fumé à l’aneth', 'Salmón ahumado con eneldo', 'Geräucherter Lachs mit Dill', 'fish_seafood', 'snack', 18, 2, 10, 'smoking'),
  gravad_laks: profile('جرافلاكس بالشبت والخردل', 'Gravad Laks with Dill and Mustard', 'Gravlax à l’aneth et à la moutarde', 'Gravlax con eneldo y mostaza', 'Graved Lachs mit Dill und Senf', 'fish_seafood', 'snack', 19, 4, 10, 'marinating'),
  stegt_rodspatte: profile('روذسبات مقلي بالزبدة', 'Pan-Fried Plaice with Butter', 'Plie poêlée au beurre', 'Platija a la plancha con mantequilla', 'Scholle in Butter gebraten', 'fish_seafood', 'dinner', 19, 1, 8, 'pan_frying'),
  fiskefrikadeller: profile('أقراص السمك بالشبت', 'Fiskefrikadeller Fish Patties with Dill', 'Fiskefrikadeller à l’aneth', 'Fiskefrikadeller con eneldo', 'Fiskefrikadeller mit Dill', 'fish_seafood', 'dinner', 14, 7, 6, 'pan_frying'),
  torsk_senap: profile('قد بصلصة الخردل', 'Cod with Mustard Sauce', 'Cabillaud à la sauce moutarde', 'Bacalao con salsa de mostaza', 'Kabeljau mit Senfsoße', 'fish_seafood', 'dinner', 18, 4, 5, 'simmering'),
  laks_spinat: profile('سلمون بالفرن بالسبانخ', 'Baked Salmon with Spinach', 'Saumon au four aux épinards', 'Salmón al horno con espinacas', 'Ofenlachs mit Spinat', 'fish_seafood', 'dinner', 23, 2, 13, 'baking'),
  rejesalat: profile('سلطة الروبيان بالشبت', 'Shrimp Salad with Dill', 'Salade de crevettes à l’aneth', 'Ensalada de gambas con eneldo', 'Garnelensalat mit Dill', 'fish_seafood', 'lunch', 12, 4, 8, 'tossing'),
  blamuslinger: profile('بلح البحر بالأعشاب', 'Mussels with Herbs, No Wine', 'Moules aux herbes, sans vin', 'Mejillones con hierbas, sin vino', 'Miesmuscheln mit Kräutern, ohne Wein', 'fish_seafood', 'dinner', 13, 5, 5, 'simmering'),
  hummer_bisque: profile('شوربة الكركند بالكريمة', 'Lobster Bisque with Cream, No Wine', 'Bisque de homard à la crème, sans vin', 'Bisque de langosta con crema, sin vino', 'Hummerbisque mit Sahne, ohne Wein', 'soups_stews', 'dinner', 11, 6, 7, 'simmering'),
  rodkal: profile('كرنب أحمر مطهو بالتفاح', 'Rødkål Braised Red Cabbage with Apple', 'Rødkål à la pomme', 'Rødkål con manzana', 'Rødkål mit Apfel geschmort', 'vegetable_mains', 'lunch', 2, 12, 5, 'stewing'),
  gulerodstuing: profile('جزر مطهو بالكريمة', 'Creamed Carrots', 'Carottes à la crème', 'Zanahorias en crema', 'Karotten in Sahne', 'vegetable_mains', 'lunch', 2, 10, 6, 'simmering'),
  rugbrod_ost: profile('خبز الجاودار بالجبن', 'Rye Bread with Cheese', 'Pain de seigle au fromage', 'Pan de centeno con queso', 'Roggenbrot mit Käse', 'breakfast_items', 'breakfast', 8, 26, 7, 'assembling'),
  havregrod_abler: profile('عصيدة الشوفان بالتفاح', 'Oat Porridge with Apple', 'Bouillie d’avoine à la pomme', 'Gachas de avena con manzana', 'Haferbrei mit Apfel', 'breakfast_items', 'breakfast', 5, 23, 4, 'simmering'),
  rundstykke_ost: profile('روندستيكة بالجبن', 'Rundstykke Breakfast Roll with Cheese', 'Rundstykke au fromage', 'Rundstykke con queso', 'Rundstykke mit Käse', 'breakfast_items', 'breakfast', 8, 32, 7, 'baking'),
};

export const EXPANSION_REGIONAL_RECIPES = { ...BASE_REGIONAL_RECIPES };

export const EXPANSION_NATIONAL_RECIPES = {
  stegt_aal: profile('ثعبان مقلي بالزبدة', 'Pan-Fried Eel with Butter', 'Anguille poêlée au beurre', 'Anguila a la plancha con mantequilla', 'Aal in Butter gebraten', 'fish_seafood', 'dinner', 19, 1, 10, 'pan_frying'),
  roget_sild: profile('رنجة مدخنة بالبيض', 'Smoked Herring with Egg', 'Hareng fumé à l’œuf', 'Arenque ahumado con huevo', 'Geräucherter Hering mit Ei', 'fish_seafood', 'snack', 16, 2, 9, 'smoking'),
  fiskefilet_remetoulade: profile('فيليه سمك مقلي بالريمولاد', 'Fried Fish Fillet with Remoulade', 'Filet de poisson frit à la rémoulade', 'Filete de pescado frito con remoulade', 'Gebratenes Fischfilet mit Remoulade', 'fish_seafood', 'lunch', 14, 12, 9, 'pan_frying'),
  torsk_dild: profile('قد بصلصة الشبت', 'Cod with Dill Sauce', 'Cabillaud à la sauce d’aneth', 'Bacalao con salsa de eneldo', 'Kabeljau mit Dillsoße', 'fish_seafood', 'dinner', 19, 4, 6, 'simmering'),
  laks_rugbrod: profile('شطيرة السلمون المدخن على الجاودار', 'Smoked Salmon on Rye Bread', 'Saumon fumé au pain de seigle', 'Salmón ahumado en pan de centeno', 'Räucherlachs auf Roggenbrot', 'street_snacks', 'lunch', 13, 17, 8, 'assembling'),
  rejemad: profile('شطيرة الروبيان المفتوحة', 'Open Shrimp Sandwich, Rejemad', 'Rejemad aux crevettes', 'Rejemad con gambas', 'Rejemad, Garnelenbrot', 'street_snacks', 'lunch', 13, 16, 8, 'assembling'),
  fiskesuppe_dk: profile('شوربة السمك بالكريمة والجذور', 'Creamy Fish Soup with Root Vegetables', 'Soupe de poisson à la crème et aux légumes-racines', 'Sopa de pescado cremosa con verduras de raíz', 'Fischsuppe mit Sahne und Wurzelgemüse', 'soups_stews', 'dinner', 12, 7, 7, 'simmering'),
  torskerogn: profile('بيض القد بالزبدة على الجاودار', 'Cod Roe on Rye Bread', 'Œufs de cabillaud au pain de seigle', 'Huevas de bacalao en pan de centeno', 'Kabeljaurogen auf Roggenbrot', 'street_snacks', 'snack', 10, 16, 8, 'assembling'),
  sild_salat: profile('سلطة الرنجة بالتفاح', 'Herring Salad with Apple', 'Salade de hareng à la pomme', 'Ensalada de arenque con manzana', 'Heringssalat mit Apfel', 'fish_seafood', 'lunch', 10, 7, 6, 'tossing'),
  oksegryde_erter: profile('يخنة لحم بقري بالبازلاء حلال', 'Halal Beef Stew with Peas', 'Ragoût de bœuf halal aux petits pois', 'Estofado de ternera halal con guisantes', 'Halal-Rindereintopf mit Erbsen', 'meat_mains', 'dinner', 17, 9, 9, 'stewing'),
  kalvekod_gryde: profile('يخنة عجل بالجزر حلال', 'Halal Veal Stew with Carrots', 'Mijoté de veau halal aux carottes', 'Guiso de ternera halal con zanahorias', 'Halal-Kalbseintopf mit Karotten', 'meat_mains', 'dinner', 19, 6, 9, 'stewing'),
  kylling_karry: profile('دجاج بالكاري والأرز', 'Chicken in Curry with Rice', 'Poulet au curry et au riz', 'Pollo al curry con arroz', 'Hähnchen in Curry mit Reis', 'poultry_mains', 'dinner', 18, 17, 8, 'simmering'),
  kylling_persille: profile('دجاج بصلصة البقدونس', 'Chicken with Parsley Sauce', 'Poulet à la sauce persil', 'Pollo con salsa de perejil', 'Hähnchen mit Petersiliensoße', 'poultry_mains', 'dinner', 20, 4, 8, 'simmering'),
  haregryde: profile('يخنة الأرنب البري بالجذور', 'Hare Stew with Root Vegetables', 'Mijoté de lièvre aux légumes-racines', 'Guiso de liebre con verduras de raíz', 'Hasen-Eintopf mit Wurzelgemüse', 'meat_mains', 'dinner', 20, 4, 8, 'stewing'),
  hjortegryde: profile('يخنة الغزال بالفطر', 'Venison Stew with Mushrooms', 'Mijoté de cerf aux champignons', 'Guiso de venado con setas', 'Hirsch-Eintopf mit Pilzen', 'meat_mains', 'dinner', 21, 4, 9, 'stewing'),
  fasangryde: profile('يخنة الفيسان بالجذور', 'Pheasant Stew with Root Vegetables', 'Mijoté de faisan aux légumes-racines', 'Guiso de faisán con verduras de raíz', 'Fasanen-Eintopf mit Wurzelgemüse', 'poultry_mains', 'dinner', 20, 5, 8, 'stewing'),
  dadyr_stek: profile('روستو غزال الدامة بالعرعر', 'Roast Fallow Deer with Juniper', 'Rôti de daim au genévrier', 'Asado de gamo con enebro', 'Damhirschbraten mit Wacholder', 'meat_mains', 'dinner', 24, 1, 9, 'roasting'),
  kanin_sovs: profile('أرنب بصلصة الخردل', 'Rabbit with Mustard Sauce', 'Lapin à la sauce moutarde', 'Conejo con salsa de mostaza', 'Kaninchen mit Senfsoße', 'meat_mains', 'dinner', 21, 3, 8, 'stewing'),
  rodfrugt_salat: profile('سلطة الجذور بالتفاح', 'Root Vegetable Salad with Apple', 'Salade de légumes-racines à la pomme', 'Ensalada de verduras de raíz con manzana', 'Wurzelgemüsesalat mit Apfel', 'vegetable_mains', 'lunch', 2, 10, 5, 'tossing'),
  persillestuing: profile('جذر البقدونس مطهو بالكريمة', 'Creamed Parsley Root', 'Racine de persil à la crème', 'Raíz de perejil en crema', 'Petersilienwurzel in Sahne', 'vegetable_mains', 'lunch', 2, 11, 6, 'simmering'),
  rosenkal_smor: profile('كرنب بروكسل بالزبدة', 'Brussels Sprouts with Butter', 'Choux de Bruxelles au beurre', 'Coles de Bruselas con mantequilla', 'Rosenkohl mit Butter', 'vegetable_mains', 'lunch', 3, 8, 6, 'simmering'),
  kartoffelmos: profile('بطاطس مهروسة بالزبدة', 'Mashed Potatoes with Butter', 'Purée de pommes de terre au beurre', 'Puré de patatas con mantequilla', 'Kartoffelpüree mit Butter', 'vegetable_mains', 'lunch', 3, 18, 7, 'boiling'),
  brunede_kartofler: profile('بطاطس مكرملة', 'Brunede Kartofler Caramelized Potatoes', 'Brunede kartofler caramélisées', 'Brunede kartofler caramelizadas', 'Brunede Kartofler, karamellisierte Kartoffeln', 'vegetable_mains', 'dinner', 3, 24, 8, 'pan_frying'),
  rodgrod_flode: profile('رودغرود بالكريمة', 'Rødgrød med Fløde Berry Pudding with Cream', 'Rødgrød med fløde à la crème', 'Rødgrød med fløde con crema', 'Rødgrød med Fløde mit Sahne', 'rice_cakes_sweets', 'snack', 2, 20, 6, 'simmering'),
  risalamande: profile('ريس ألاموند بصلصة الكرز', 'Risalamande with Cherry Sauce', 'Risalamande à la sauce cerise', 'Risalamande con salsa de cereza', 'Risalamande mit Kirschsoße', 'rice_cakes_sweets', 'snack', 4, 26, 8, 'assembling'),
  koldskal: profile('كولدسكول بالبسكويت', 'Koldskål Buttermilk Dessert with Biscuits', 'Koldskål aux biscuits', 'Koldskål con galletas', 'Koldskål mit Keksen', 'rice_cakes_sweets', 'snack', 4, 22, 5, 'assembling'),
  aeblekage: profile('ترايفل التفاح بالكريمة', 'Æblekage Apple Trifle with Cream', 'Æblekage à la crème', 'Æblekage con crema', 'Æblekage mit Sahne', 'rice_cakes_sweets', 'snack', 2, 20, 7, 'assembling'),
  aebleskiver: profile('إيبلسكيفر بالسكر', 'Æbleskiver Pancake Puffs with Sugar', 'Æbleskiver au sucre', 'Æbleskiver con azúcar', 'Æbleskiver mit Zucker', 'rice_cakes_sweets', 'snack', 4, 32, 10, 'pan_frying'),
  wienerbrod_kanel: profile('وينربرود بالقرفة', 'Wienerbrød Danish Pastry with Cinnamon', 'Wienerbrød à la cannelle', 'Wienerbrød con canela', 'Wienerbrød mit Zimt', 'rice_cakes_sweets', 'breakfast', 6, 38, 13, 'baking'),
  tebirkes: profile('تيبيركيس ببذور الخشخاش', 'Tebirkes Poppy Seed Rolls', 'Tebirkes aux graines de pavot', 'Tebirkes con semillas de amapola', 'Tebirkes mit Mohn', 'breakfast_items', 'breakfast', 7, 36, 10, 'baking'),
};

export function B(profileRow, region) {
  const token = REGION_DEMONYM[region];
  if (!token) throw new Error(`Unknown Denmark region: ${region}`);
  const extra = REGION_DIASPORA[region];
  const national = region === 'pan_danish';
  const descriptor = REGIONS.find(([id]) => id === region);
  return {
    id: '',
    nameAr: `${national ? '' : `${descriptor[1]} `}${profileRow.ar} ${token}`.trim(),
    nameEn: `${national ? 'Danish ' : `${descriptor[2]} `}${profileRow.en}`,
    nameFr: `${national ? 'Cuisine danoise : ' : `${descriptor[3]} `}${profileRow.fr}`,
    nameEs: `${national ? 'Cocina danesa: ' : `${descriptor[4]} `}${profileRow.es}`,
    nameDe: `${national ? 'Dänische Küche: ' : `${descriptor[5]} `}${profileRow.de}`,
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
      if (!recipes[key]) throw new Error(`Unknown Denmark recipe profile: ${key}`);
      rows.push(B(recipes[key], region));
    }
  }
  for (const key of nationalKeys) {
    if (!recipes[key]) throw new Error(`Unknown Denmark recipe profile: ${key}`);
    rows.push(B(recipes[key], 'pan_danish'));
  }
  return rows;
}
