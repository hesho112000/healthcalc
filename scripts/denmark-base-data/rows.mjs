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
  cod_egg_sauce: profile('قد بصلصة البيض', 'Cod with Egg Sauce', 'Cabillaud à la sauce aux œufs', 'Bacalao con salsa de huevo', 'Kabeljau mit Eiersoße', 'fish_seafood', 'dinner', 18, 3, 6, 'simmering'),
  rye_egg_cress: profile('خبز الجاودار بالبيض والجرجير', 'Rye Bread with Egg and Cress', 'Pain de seigle à l’œuf et au cresson', 'Pan de centeno con huevo y berro', 'Roggenbrot mit Ei und Kresse', 'breakfast_items', 'breakfast', 10, 20, 8, 'assembling'),
  beef_carrot_stew: profile('يخنة لحم بقري بالجزر حلال', 'Halal Beef Stew with Carrots', 'Ragoût de bœuf halal aux carottes', 'Estofado de ternera halal con zanahorias', 'Halal-Rindereintopf mit Karotten', 'meat_mains', 'dinner', 18, 8, 9, 'stewing'),
  rye_herring: profile('خبز الجاودار بالرنجة', 'Rye Bread with Herring', 'Pain de seigle au hareng', 'Pan de centeno con arenque', 'Roggenbrot mit Hering', 'breakfast_items', 'breakfast', 11, 19, 6, 'assembling'),
  chicken_root_stew: profile('يخنة الدجاج بالخضار الجذرية', 'Chicken and Root Vegetable Stew', 'Mijoté de poulet aux légumes-racines', 'Guiso de pollo con verduras de raíz', 'Hähnchen-Eintopf mit Wurzelgemüse', 'poultry_mains', 'dinner', 19, 7, 7, 'stewing'),
  skyr_berries: profile('سكاير بالتوت', 'Skyr with Berries', 'Skyr aux baies', 'Skyr con bayas', 'Skyr mit Beeren', 'breakfast_items', 'breakfast', 11, 18, 4, 'assembling'),
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
  millionbof: profile('ميليونبوف لحم بقري حلال بالبطاطس', 'Millionbøf Halal Beef in Onion Sauce with Mashed Potatoes', 'Millionbøf au bœuf halal et à la purée', 'Millionbøf con ternera halal y puré', 'Millionbøf, Halal-Rind in Zwiebelsoße mit Kartoffelpüree', 'meat_mains', 'dinner', 15, 12, 9, 'simmering'),
  kuldegryde: profile('يخنة لحم بقري حلال بالكراث', 'Kuldegryde Halal Beef Stew with Leeks', 'Kuldegryde au bœuf halal et aux poireaux', 'Kuldegryde con ternera halal y puerros', 'Kuldegryde, Halal-Rindereintopf mit Lauch', 'meat_mains', 'dinner', 18, 7, 9, 'stewing'),
  kogt_kalvekod: profile('عجل مسلوق بصلصة الفجل حلال', 'Boiled Halal Veal with Horseradish Sauce', 'Veau bouilli halal à la sauce raifort', 'Ternera hervida halal con salsa de rábano picante', 'Gekochtes Halal-Kalb mit Meerrettichsoße', 'meat_mains', 'dinner', 20, 3, 8, 'boiling'),
  lammekoteletter_bonner: profile('ضلوع ضأن بالفاصولياء الخضراء حلال', 'Halal Lamb Chops with Green Beans', 'Côtelettes d’agneau halal aux haricots verts', 'Chuletas de cordero halal con judías verdes', 'Halal-Lammkoteletts mit grünen Bohnen', 'meat_mains', 'dinner', 21, 6, 12, 'grilling'),
  kylling_frikadeller: profile('فريكاديلر الدجاج بالأعشاب', 'Chicken Frikadeller with Herbs', 'Frikadeller de poulet aux herbes', 'Frikadeller de pollo con hierbas', 'Hähnchen-Frikadellen mit Kräutern', 'poultry_mains', 'dinner', 17, 4, 8, 'pan_frying'),
  kylling_gryde_tomat: profile('يخنة الدجاج بالطماطم', 'Chicken Stew with Tomato', 'Mijoté de poulet à la tomate', 'Guiso de pollo con tomate', 'Hähnchen-Eintopf mit Tomate', 'poultry_mains', 'dinner', 18, 7, 7, 'stewing'),
  stegt_torsk_erter: profile('قد مقلي بالبازلاء بالكريمة', 'Pan-Fried Cod with Creamed Peas', 'Cabillaud poêlé aux petits pois à la crème', 'Bacalao a la plancha con guisantes en crema', 'Kabeljau in der Pfanne mit Sahneerbsen', 'fish_seafood', 'dinner', 19, 8, 6, 'pan_frying'),
  rodspatte_ovn: profile('روذسبات مخبوز بالليمون', 'Baked Plaice with Lemon', 'Plie au four au citron', 'Platija al horno con limón', 'Scholle aus dem Ofen mit Zitrone', 'fish_seafood', 'dinner', 19, 1, 6, 'baking'),
  lubbe_senap: profile('لينغ بصلصة الخردل والشبت', 'Ling with Mustard Dill Sauce', 'Lingue à la sauce moutarde et aneth', 'Maruca con salsa de mostaza y eneldo', 'Ling mit Senf-Dill-Soße', 'fish_seafood', 'dinner', 18, 4, 5, 'simmering'),
  rejer_avokado: profile('روبيان بالأفوكادو على الجاودار', 'Shrimp and Avocado on Rye Bread', 'Crevettes à l’avocat au pain de seigle', 'Gambas con aguacate en pan de centeno', 'Garnelen mit Avocado auf Roggenbrot', 'street_snacks', 'lunch', 12, 16, 8, 'assembling'),
  sild_karry_salat: profile('سلطة رنجة الكاري بالتفاح', 'Curry Herring Salad with Apple', 'Salade de hareng au curry et à la pomme', 'Ensalada de arenque al curry con manzana', 'Curryheringsalat mit Apfel', 'fish_seafood', 'lunch', 10, 8, 6, 'tossing'),
  blamuslinger_suppe: profile('شوربة بلح البحر بالكريمة', 'Creamy Mussel Soup', 'Soupe de moules à la crème', 'Sopa de mejillones cremosa', 'Muschelcremesuppe', 'soups_stews', 'dinner', 10, 6, 6, 'simmering'),
  laks_quinoa_dild: profile('سلمون بالكينوا والشبت', 'Salmon with Quinoa and Dill', 'Saumon au quinoa et à l’aneth', 'Salmón con quinoa y eneldo', 'Lachs mit Quinoa und Dill', 'fish_seafood', 'dinner', 21, 13, 9, 'pan_frying'),
  asparges_suppe: profile('شوربة الهليون بالكريمة', 'Creamy Asparagus Soup', 'Soupe d’asperges à la crème', 'Sopa de espárragos cremosa', 'Spargelcremesuppe', 'soups_stews', 'lunch', 3, 7, 6, 'simmering'),
  bonne_stuvning: profile('فاصولياء خضراء مطهوة بالكريمة', 'Creamed Green Beans', 'Haricots verts à la crème', 'Judías verdes en crema', 'Grüne Bohnen in Sahne', 'vegetable_mains', 'lunch', 3, 9, 5, 'simmering'),
  morbradgryde: profile('موربرادغريده لحم بقري حلال', 'Mørbradgryde Halal Beef Tenderloin Stew', 'Mørbradgryde au bœuf halal', 'Mørbradgryde con ternera halal', 'Mørbradgryde, Halal-Rinderfilet-Eintopf', 'meat_mains', 'dinner', 20, 5, 11, 'stewing'),
  kalverulle: profile('رول عجل بالأعشاب حلال', 'Halal Veal Roulade with Herbs', 'Roulade de veau halal aux herbes', 'Rollito de ternera halal con hierbas', 'Halal-Kalbsroulade mit Kräutern', 'meat_mains', 'dinner', 21, 3, 10, 'roasting'),
  lammebov: profile('كتف ضأن مطهو حلال', 'Braised Halal Lamb Shoulder', 'Épaule d’agneau braisée halal', 'Paleta de cordero estofada halal', 'Geschmorte Halal-Lammschulter', 'meat_mains', 'dinner', 21, 4, 13, 'braising'),
  kylling_ris_porre: profile('دجاج بالأرز والكراث', 'Chicken with Rice and Leeks', 'Poulet au riz et aux poireaux', 'Pollo con arroz y puerros', 'Hähnchen mit Reis und Lauch', 'rice_dishes', 'dinner', 16, 21, 7, 'simmering'),
  kylling_karbonader: profile('كاربوناد الدجاج بالبقدونس', 'Chicken Patties with Parsley', 'Galettes de poulet au persil', 'Tortitas de pollo con perejil', 'Hähnchenpflanzerl mit Petersilie', 'poultry_mains', 'dinner', 18, 4, 8, 'pan_frying'),
  and_gryde_porre: profile('يخنة البطة بالكراث', 'Duck Stew with Leeks', 'Mijoté de canard aux poireaux', 'Guiso de pato con puerros', 'Enten-Eintopf mit Lauch', 'poultry_mains', 'dinner', 19, 6, 11, 'stewing'),
  kalkun_gryde: profile('يخنة ديك رومي بالخضار', 'Turkey Stew with Vegetables', 'Mijoté de dinde aux légumes', 'Guiso de pavo con verduras', 'Puteneintopf mit Gemüse', 'poultry_mains', 'dinner', 20, 6, 7, 'stewing'),
  hjort_karbonader: profile('كاربوناد الغزال بالعرعر', 'Venison Patties with Juniper', 'Galettes de cerf au genévrier', 'Tortitas de venado con enebro', 'Hirschpflanzerl mit Wacholder', 'meat_mains', 'dinner', 20, 3, 9, 'pan_frying'),
  kanin_gryde_erter: profile('يخنة الأرنب بالبازلاء', 'Rabbit Stew with Peas', 'Mijoté de lapin aux petits pois', 'Guiso de conejo con guisantes', 'Kaninchen-Eintopf mit Erbsen', 'meat_mains', 'dinner', 19, 7, 7, 'stewing'),
  stegt_makrel_persille: profile('ماكريل مقلي بالبقدونس', 'Fried Mackerel with Parsley', 'Maquereau frit au persil', 'Caballa frita con perejil', 'Makrele mit Petersilie gebraten', 'fish_seafood', 'dinner', 16, 3, 11, 'pan_frying'),
  torsk_bagt_grontsager: profile('قد مخبوز بالخضار', 'Baked Cod with Vegetables', 'Cabillaud au four aux légumes', 'Bacalao al horno con verduras', 'Ofenkabeljau mit Gemüse', 'fish_seafood', 'dinner', 18, 6, 4, 'baking'),
  blamuslinger_tomat: profile('بلح البحر بالطماطم', 'Mussels in Tomato Sauce, No Wine', 'Moules à la tomate, sans vin', 'Mejillones en salsa de tomate, sin vino', 'Miesmuscheln in Tomatensoße, ohne Wein', 'fish_seafood', 'dinner', 12, 7, 5, 'simmering'),
  blomkal_gratin: profile('غراتن القرنبيط بالجبن', 'Cauliflower Gratin with Cheese', 'Gratin de chou-fleur au fromage', 'Gratinado de coliflor con queso', 'Blumenkohlgratin mit Käse', 'vegetable_mains', 'dinner', 4, 8, 9, 'baking'),
  porre_suppe: profile('شوربة الكراث بالبطاطس', 'Leek and Potato Soup', 'Soupe de poireaux aux pommes de terre', 'Sopa de puerros con patatas', 'Lauch-Kartoffel-Suppe', 'soups_stews', 'lunch', 3, 13, 4, 'simmering'),
  havregrod_kanel: profile('عصيدة الشوفان بالقرفة', 'Oat Porridge with Cinnamon', 'Bouillie d’avoine à la cannelle', 'Gachas de avena con canela', 'Haferbrei mit Zimt', 'breakfast_items', 'breakfast', 5, 22, 4, 'simmering'),
  kodfars_gratang: profile('غراتن لحم بقري مفروم بالبطاطس حلال', 'Halal Ground Beef and Potato Gratin', 'Gratin de bœuf haché halal aux pommes de terre', 'Gratinado de carne picada halal con patatas', 'Halal-Hackfleisch-Kartoffel-Gratin', 'meat_mains', 'dinner', 13, 14, 10, 'baking'),
  lammekolle: profile('ساق ضأن مشوية حلال', 'Roast Halal Leg of Lamb', 'Gigot d’agneau rôti halal', 'Pierna de cordero asada halal', 'Halal-Lammkeule gebraten', 'meat_mains', 'dinner', 23, 1, 12, 'roasting'),
  kalvekotelet: profile('ضلع عجل مشوي حلال', 'Grilled Halal Veal Chop', 'Côte de veau grillée halal', 'Chuleta de ternera a la parrilla halal', 'Gegrilltes Halal-Kalbskotelett', 'meat_mains', 'dinner', 23, 0, 12, 'grilling'),
  oksefile_sopp: profile('فيليه بقر بالفطر حلال', 'Halal Beef Fillet with Mushrooms', 'Filet de bœuf halal aux champignons', 'Filete de res halal con setas', 'Halal-Rinderfilet mit Pilzen', 'meat_mains', 'dinner', 24, 3, 13, 'pan_frying'),
  kodboller_tomat: profile('كرات لحم بقري بصلصة الطماطم حلال', 'Halal Beef Meatballs in Tomato Sauce', 'Boulettes de bœuf halal à la sauce tomate', 'Albóndigas de ternera halal en salsa de tomate', 'Halal-Rinderbällchen in Tomatensoße', 'meat_mains', 'dinner', 15, 8, 10, 'simmering'),
  kylling_karry_ananas: profile('دجاج بالكاري والأناناس', 'Chicken Curry with Pineapple', 'Poulet au curry et à l’ananas', 'Pollo al curry con piña', 'Hähnchen-Curry mit Ananas', 'poultry_mains', 'dinner', 18, 10, 8, 'simmering'),
  kalkun_karbonader: profile('كاربوناد ديك رومي بالبصل', 'Turkey Patties with Onion', 'Galettes de dinde à l’oignon', 'Tortitas de pavo con cebolla', 'Putenpflanzerl mit Zwiebeln', 'poultry_mains', 'dinner', 19, 4, 8, 'pan_frying'),
  vildand_roedkaal: profile('بطة برية بالكرنب الأحمر', 'Wild Duck with Red Cabbage', 'Canard sauvage au chou rouge', 'Pato salvaje con col roja', 'Wildente mit Rotkohl', 'poultry_mains', 'dinner', 19, 7, 12, 'roasting'),
  hjort_timjan: profile('يخنة الغزال بالزعتر', 'Venison Stew with Thyme', 'Mijoté de cerf au thym', 'Guiso de venado con tomillo', 'Hirsch-Eintopf mit Thymian', 'meat_mains', 'dinner', 21, 4, 9, 'stewing'),
  kanin_bryst: profile('صدر أرنب بالفرن بالخردل', 'Roast Rabbit with Mustard', 'Lapin rôti à la moutarde', 'Conejo asado con mostaza', 'Kaninchen mit Senf gebraten', 'meat_mains', 'dinner', 21, 2, 8, 'roasting'),
  laks_pasta_dild: profile('باستا السلمون بالشبت', 'Salmon Pasta with Dill', 'Pâtes au saumon et à l’aneth', 'Pasta con salmón y eneldo', 'Lachsnudeln mit Dill', 'noodle_dishes', 'dinner', 14, 24, 8, 'simmering'),
  torsk_friture: profile('قد مقلي بالبقسماط', 'Fried Cod with Breadcrumbs', 'Cabillaud frit à la chapelure', 'Bacalao frito con pan rallado', 'Kabeljau mit Paniermehl gebraten', 'fish_seafood', 'dinner', 17, 8, 7, 'pan_frying'),
  rejer_pasta: profile('باستا الروبيان بالثوم', 'Shrimp Pasta with Garlic', 'Pâtes aux crevettes et à l’ail', 'Pasta con gambas y ajo', 'Garnelennudeln mit Knoblauch', 'noodle_dishes', 'dinner', 14, 24, 7, 'simmering'),
  ollebrod: profile('أولبرود بلبن والعسل', 'Øllebrød Rye Porridge with Milk and Honey, No Beer', 'Øllebrød au lait et au miel, sans bière', 'Øllebrød con leche y miel, sin cerveza', 'Øllebrød mit Milch und Honig, ohne Bier', 'breakfast_items', 'breakfast', 5, 26, 3, 'simmering'),
  skyr_granola: profile('سكاير بالجرانولا والتفاح', 'Skyr with Granola and Apple', 'Skyr au granola et à la pomme', 'Skyr con granola y manzana', 'Skyr mit Granola und Apfel', 'breakfast_items', 'breakfast', 11, 20, 5, 'assembling'),
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
  hakket_kalv: profile('لحم عجل مفروم بالبصل حلال', 'Minced Halal Veal with Onion', 'Veau haché halal à l’oignon', 'Ternera picada halal con cebolla', 'Halal-Kalbshack mit Zwiebeln', 'meat_mains', 'dinner', 18, 4, 10, 'pan_frying'),
  oksefile_peber: profile('فيليه بقر بالفلفل حلال', 'Halal Beef Fillet with Pepper Sauce', 'Filet de bœuf halal à la sauce poivrée', 'Filete de res halal con salsa de pimienta', 'Halal-Rinderfilet mit Pfeffersoße', 'meat_mains', 'dinner', 24, 3, 13, 'pan_frying'),
  lammegryde_kal: profile('يخنة ضأن بالملفوف حلال', 'Halal Lamb and Cabbage Stew', 'Mijoté d’agneau halal au chou', 'Guiso de cordero halal con col', 'Halal-Lamm-Kohleintopf', 'meat_mains', 'dinner', 18, 6, 11, 'stewing'),
  kalkon_boller: profile('كرات ديك رومي بالشبت', 'Turkey Meatballs with Dill', 'Boulettes de dinde à l’aneth', 'Albóndigas de pavo con eneldo', 'Putenbällchen mit Dill', 'poultry_mains', 'dinner', 18, 4, 7, 'simmering'),
  and_bryst_kirsebaer: profile('صدر بطة بصلصة الكرز', 'Duck Breast with Cherry Sauce', 'Magret de canard à la sauce cerise', 'Pechuga de pato con salsa de cereza', 'Entenbrust mit Kirschsoße', 'poultry_mains', 'dinner', 19, 9, 12, 'roasting'),
  hjort_bof: profile('هاكبوف الغزال بالبصل المقلي', 'Venison Patty with Fried Onions', 'Galette de cerf aux oignons frits', 'Hamburguesa de venado con cebolla frita', 'Hirschpflanzerl mit Röstzwiebeln', 'meat_mains', 'dinner', 19, 5, 10, 'pan_frying'),
  kanin_frikadeller: profile('فريكاديلر الأرنب بالأعشاب', 'Rabbit Frikadeller with Herbs', 'Frikadeller de lapin aux herbes', 'Frikadeller de conejo con hierbas', 'Kaninchen-Frikadellen mit Kräutern', 'meat_mains', 'dinner', 17, 4, 8, 'pan_frying'),
  laks_porre: profile('سلمون بالكراث بالكريمة', 'Salmon with Creamed Leeks', 'Saumon aux poireaux à la crème', 'Salmón con puerros en crema', 'Lachs mit Sahnelauch', 'fish_seafood', 'dinner', 20, 5, 11, 'pan_frying'),
  makrel_stegt: profile('ماكريل مقلي بالطماطم', 'Fried Mackerel with Tomato', 'Maquereau frit à la tomate', 'Caballa frita con tomate', 'Makrele mit Tomate gebraten', 'fish_seafood', 'dinner', 16, 5, 11, 'pan_frying'),
  fiskesalat: profile('سلطة السمك المدخن بالخيار', 'Smoked Fish Salad with Cucumber', 'Salade de poisson fumé au concombre', 'Ensalada de pescado ahumado con pepino', 'Räucherfischsalat mit Gurke', 'fish_seafood', 'lunch', 12, 4, 7, 'tossing'),
  aeggekage: profile('إيغي كيكي بالبيض والشبت', 'Æggekage Herb Omelette with Dill', 'Æggekage aux herbes et à l’aneth', 'Æggekage con hierbas y eneldo', 'Æggekage, Kräuteromelett mit Dill', 'breakfast_items', 'breakfast', 10, 3, 9, 'pan_frying'),
  blomkal_stuvning: profile('قرنبيط مطهو بالكريمة', 'Creamed Cauliflower', 'Chou-fleur à la crème', 'Coliflor en crema', 'Blumenkohl in Sahne', 'vegetable_mains', 'lunch', 3, 8, 6, 'simmering'),
  kartoffel_salat: profile('سلطة البطاطس بالبقدونس', 'Potato Salad with Parsley', 'Salade de pommes de terre au persil', 'Ensalada de patatas con perejil', 'Kartoffelsalat mit Petersilie', 'vegetable_mains', 'lunch', 3, 18, 5, 'tossing'),
  frugtsalat: profile('سلطة الفواكه بالزبادي', 'Fruit Salad with Yogurt', 'Salade de fruits au yaourt', 'Ensalada de frutas con yogur', 'Obstsalat mit Joghurt', 'fruit', 'snack', 2, 14, 3, 'tossing'),
  hindbaer_fraiche: profile('توت بالكريمة المخفوقة', 'Raspberries with Whipped Cream', 'Framboises à la crème fouettée', 'Frambuesas con nata montada', 'Himbeeren mit Schlagsahne', 'rice_cakes_sweets', 'snack', 2, 14, 8, 'whipping'),
  stegt_kalvfile: profile('فيليه عجل مقلي حلال', 'Pan-Fried Halal Veal Fillet', 'Filet de veau poêlé halal', 'Filete de ternera a la plancha halal', 'Halal-Kalbsfilet in der Pfanne', 'meat_mains', 'dinner', 22, 1, 11, 'pan_frying'),
  kod_karry_gryde: profile('يخنة لحم بقري بالكاري حلال', 'Halal Beef Curry Stew', 'Mijoté de bœuf halal au curry', 'Guiso de ternera halal al curry', 'Halal-Rinder-Curry-Eintopf', 'meat_mains', 'dinner', 16, 10, 9, 'stewing'),
  lam_bonne_gryde: profile('يخنة ضأن بالفاصولياء حلال', 'Halal Lamb and Bean Stew', 'Mijoté d’agneau halal aux haricots', 'Guiso de cordero halal con alubias', 'Halal-Lamm-Bohnen-Eintopf', 'meat_mains', 'dinner', 17, 13, 10, 'stewing'),
  kalv_gryde_erter: profile('يخنة عجل بالبازلاء حلال', 'Halal Veal Stew with Peas', 'Mijoté de veau halal aux petits pois', 'Guiso de ternera halal con guisantes', 'Halal-Kalbseintopf mit Erbsen', 'meat_mains', 'dinner', 18, 8, 8, 'stewing'),
  okse_gryde_byg: profile('يخنة لحم بقري بالشعير حلال', 'Halal Beef and Barley Stew', 'Ragoût de bœuf halal à l’orge', 'Estofado de ternera halal con cebada', 'Halal-Rindereintopf mit Gerste', 'meat_mains', 'dinner', 15, 16, 8, 'stewing'),
  kylling_quinoa: profile('دجاج بالكينوا والخضار', 'Chicken with Quinoa and Vegetables', 'Poulet au quinoa et aux légumes', 'Pollo con quinoa y verduras', 'Hähnchen mit Quinoa und Gemüse', 'poultry_mains', 'dinner', 20, 13, 7, 'pan_frying'),
  kylling_gryde_paprika_tomat: profile('يخنة الدجاج بالفلفل والطماطم', 'Chicken Stew with Peppers and Tomato', 'Mijoté de poulet aux poivrons et à la tomate', 'Guiso de pollo con pimientos y tomate', 'Hähnchen-Eintopf mit Paprika und Tomate', 'poultry_mains', 'dinner', 19, 8, 7, 'stewing'),
  kalkunfile_ovn: profile('فيليه ديك رومي بالفرن بالأعشاب', 'Baked Turkey Fillet with Herbs', 'Filet de dinde au four aux herbes', 'Filete de pavo al horno con hierbas', 'Putenfilet aus dem Ofen mit Kräutern', 'poultry_mains', 'dinner', 23, 1, 7, 'baking'),
  andefrikadeller: profile('فريكاديلر البطة بالأعشاب', 'Duck Frikadeller with Herbs', 'Frikadeller de canard aux herbes', 'Frikadeller de pato con hierbas', 'Enten-Frikadellen mit Kräutern', 'poultry_mains', 'dinner', 17, 4, 10, 'pan_frying'),
  hjort_file: profile('فيليه غزال بالفرن بالجذور', 'Venison Fillet with Root Vegetables', 'Filet de cerf au four aux légumes-racines', 'Filete de venado al horno con verduras de raíz', 'Hirschfilet aus dem Ofen mit Wurzelgemüse', 'meat_mains', 'dinner', 23, 4, 10, 'baking'),
  kanin_lar: profile('فخذ أرنب مطهو بالأعشاب', 'Braised Rabbit Leg with Herbs', 'Cuisse de lapin braisée aux herbes', 'Pierna de conejo estofada con hierbas', 'Kaninchenkeule mit Kräutern geschmort', 'meat_mains', 'dinner', 21, 2, 8, 'braising'),
  orrhone_stegt: profile('تتهيج مشوي بالعرعر', 'Roast Grouse with Juniper', 'Tétras rôti au genévrier', 'Urogallo asado con enebro', 'Birkhuhn mit Wacholder gebraten', 'poultry_mains', 'dinner', 21, 1, 9, 'roasting'),
  torsk_karry: profile('قد بالكاري الخفيف', 'Cod with Mild Curry Sauce', 'Cabillaud à la sauce curry douce', 'Bacalao con salsa de curry suave', 'Kabeljau mit milder Currysoße', 'fish_seafood', 'dinner', 17, 5, 5, 'simmering'),
  laks_broccoli: profile('سلمون بالبروكلي بالبخار', 'Salmon with Steamed Broccoli', 'Saumon au brocoli vapeur', 'Salmón con brócoli al vapor', 'Lachs mit gedämpftem Brokkoli', 'fish_seafood', 'dinner', 22, 3, 12, 'baking'),
  sild_senap_dild: profile('رنجة بالخردل والشبت', 'Herring with Mustard and Dill', 'Hareng à la moutarde et à l’aneth', 'Arenque con mostaza y eneldo', 'Hering mit Senf und Dill', 'fish_seafood', 'lunch', 10, 7, 6, 'marinating'),
  morbrad_svamp: profile('موربراد بالفطر حلال', 'Halal Beef Tenderloin with Mushrooms', 'Mørbrad de bœuf halal aux champignons', 'Mørbrad de ternera halal con setas', 'Halal-Rinderfilet mit Champignons', 'meat_mains', 'dinner', 23, 3, 12, 'pan_frying'),
  kodboller_karry: profile('كرات لحم بقري بصلصة الكاري حلال', 'Halal Beef Meatballs with Curry', 'Boulettes de bœuf halal au curry', 'Albóndigas de ternera halal al curry', 'Halal-Rinderbällchen mit Curry', 'meat_mains', 'dinner', 15, 9, 10, 'simmering'),
  lammefars_boller: profile('كرات ضأن بالبقدونس حلال', 'Halal Lamb Patties with Parsley', 'Galettes d’agneau halal au persil', 'Tortitas de cordero halal con perejil', 'Halal-Lammpflanzerl mit Petersilie', 'meat_mains', 'dinner', 18, 4, 11, 'pan_frying'),
  kalv_karry: profile('يخنة عجل بالكاري حلال', 'Halal Veal Curry Stew', 'Mijoté de veau halal au curry', 'Estofado de ternera halal al curry', 'Halal-Kalbs-Curry-Eintopf', 'meat_mains', 'dinner', 17, 9, 9, 'stewing'),
  okse_suppe: profile('شوربة لحم بقري بالخضار حلال', 'Halal Beef and Vegetable Soup', 'Soupe de bœuf halal aux légumes', 'Sopa de ternera halal con verduras', 'Halal-Rinder-Gemüsesuppe', 'soups_stews', 'dinner', 14, 8, 4, 'simmering'),
  kylling_spyd: profile('أسياخ دجاج مشوية بالأعشاب', 'Grilled Chicken Skewers with Herbs', 'Brochettes de poulet grillées aux herbes', 'Brochetas de pollo a la parrilla con hierbas', 'Gegrillte Hähnchenspieße mit Kräutern', 'poultry_mains', 'dinner', 22, 2, 7, 'grilling'),
  kylling_gryde_broccoli: profile('يخنة الدجاج بالبروكلي', 'Chicken Stew with Broccoli', 'Mijoté de poulet au brocoli', 'Guiso de pollo con brócoli', 'Hähnchen-Eintopf mit Brokkoli', 'poultry_mains', 'dinner', 19, 5, 8, 'stewing'),
  kalkun_quinoa: profile('ديك رومي بالكينوا والأعشاب', 'Turkey with Quinoa and Herbs', 'Dinde au quinoa et aux herbes', 'Pavo con quinoa y hierbas', 'Pute mit Quinoa und Kräutern', 'poultry_mains', 'dinner', 21, 12, 7, 'pan_frying'),
  vildgas_apple: profile('إوزة برية بالفرن بالتفاح', 'Wild Goose with Apple', 'Oie sauvage à la pomme', 'Ganso salvaje con manzana', 'Wildgans mit Apfel', 'poultry_mains', 'dinner', 19, 6, 13, 'roasting'),
  hjort_lar: profile('فخذ غزال مطهو بالعرعر', 'Braised Venison Leg with Juniper', 'Cuisse de cerf braisée au genévrier', 'Pierna de venado estofada con enebro', 'Hirschkeule mit Wacholder geschmort', 'meat_mains', 'dinner', 22, 2, 9, 'braising'),
  kanin_karry: profile('يخنة الأرنب بالكاري', 'Rabbit Curry Stew', 'Mijoté de lapin au curry', 'Guiso de conejo al curry', 'Kaninchen-Curry-Eintopf', 'meat_mains', 'dinner', 19, 8, 7, 'stewing'),
  fasan_porre: profile('فيسان بالكراث بالكريمة', 'Pheasant with Creamed Leeks', 'Faisan aux poireaux à la crème', 'Faisán con puerros en crema', 'Fasan mit Sahnelauch', 'poultry_mains', 'dinner', 20, 5, 9, 'stewing'),
  torsk_ovn_dild: profile('قد بالفرن بالشبت', 'Baked Cod with Dill', 'Cabillaud au four à l’aneth', 'Bacalao al horno con eneldo', 'Ofenkabeljau mit Dill', 'fish_seafood', 'dinner', 18, 2, 4, 'baking'),
  makrel_ovn: profile('ماكريل مخبوز بالليمون', 'Baked Mackerel with Lemon', 'Maquereau au four au citron', 'Caballa al horno con limón', 'Ofenmakrele mit Zitrone', 'fish_seafood', 'dinner', 16, 2, 11, 'baking'),
  kanelsnegl: profile('كانلسنيغل بالقرفة', 'Kanelsnegl Cinnamon Snail', 'Kanelsnegl à la cannelle', 'Kanelsnegl con canela', 'Kanelsnegl, Zimtschnecke', 'rice_cakes_sweets', 'breakfast', 6, 39, 12, 'baking'),
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
