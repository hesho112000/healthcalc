export const BASE_DIASPORA = ['norwegian', 'scandinavian', 'western', 'high_protein'];
export const REGION_DIASPORA = { oslo: 'osloite', bergen: 'west_coast', tromso: 'arctic' };

// Each anchor owns one stable Arabic token; no Norwegian row belongs in asian_shared.
export const REGION_DEMONYM = {
  pan_norwegian: 'نرويجي',
  oslo: 'أوسلوي',
  bergen: 'برغني',
  trondheim: 'تروندهايمي',
  stavanger: 'ستافانغري',
  tromso: 'ترومسوي',
  lofoten: 'لوفوتني',
  kristiansand: 'كريستيانسندي',
  alesund: 'أولسوندي',
  bodo: 'بودوي',
};

const REGIONS = [
  ['pan_norwegian', 'مطابخ النرويج', 'Norwegian', 'Cuisine norvégienne : ', 'Cocina noruega: ', 'Norwegische Küche: '],
  ['oslo', 'مطابخ أوسلو', 'Oslo', 'À l’osloïte : ', 'Al estilo de Oslo: ', 'Oslo-Art: '],
  ['bergen', 'مطابخ برغن', 'Bergen', 'À la bergenoise : ', 'Al estilo de Bergen: ', 'Bergen-Art: '],
  ['trondheim', 'مطابخ تروندهايم', 'Trondheim', 'À la trondheimoise : ', 'Al estilo de Trondheim: ', 'Trondheim-Art: '],
  ['stavanger', 'مطابخ ستافانغر', 'Stavanger', 'À la stavangeroise : ', 'Al estilo de Stavanger: ', 'Stavanger-Art: '],
  ['tromso', 'مطابخ ترومسو', 'Tromsø', 'À la tromsøise : ', 'Al estilo de Tromsø: ', 'Tromsø-Art: '],
  ['lofoten', 'مطابخ لوفوتن', 'Lofoten', 'À la lofotienne : ', 'Al estilo de Lofoten: ', 'Lofoten-Art: '],
  ['kristiansand', 'مطابخ كريستيانسند', 'Kristiansand', 'À la kristiansandaise : ', 'Al estilo de Kristiansand: ', 'Kristiansand-Art: '],
  ['alesund', 'مطابخ أولسوند', 'Ålesund', 'À l’ålesundaise : ', 'Al estilo de Ålesund: ', 'Ålesund-Art: '],
  ['bodo', 'مطابخ بودو', 'Bodø', 'À la bodøise : ', 'Al estilo de Bodø: ', 'Bodø-Art: '],
];

const profile = (ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking) =>
  ({ ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking });

export const BASE_REGIONAL_RECIPES = {
  grilled_salmon: profile('سلمون مشوي بالأعشاب', 'Grilled Salmon with Herbs', 'Saumon grillé aux herbes', 'Salmón a la parrilla con hierbas', 'Gegrillter Lachs mit Kräutern', 'fish_seafood', 'dinner', 23, 1, 12, 'grilling'),
  root_veg_stew: profile('يخنة الخضار الجذرية', 'Root Vegetable Stew', 'Mijoté de légumes-racines', 'Estofado de verduras de raíz', 'Wurzelgemüse-Eintopf', 'vegetable_mains', 'dinner', 3, 14, 5, 'stewing'),
  barley_soup: profile('شوربة الشعير بالخضار', 'Barley Vegetable Soup', 'Soupe d’orge aux légumes', 'Sopa de cebada con verduras', 'Gersten-Gemüsesuppe', 'soups_stews', 'lunch', 4, 16, 3, 'simmering'),
  rye_breakfast: profile('خبز الجاودار بالجبن البني', 'Rye Bread with Brunost', 'Pain de seigle au brunost', 'Pan de centeno con brunost', 'Roggenbrot mit Brunost', 'breakfast_items', 'breakfast', 8, 26, 8, 'assembling'),
  poached_fish: profile('سمك مسلوق بالزبدة', 'Poached Fish with Butter', 'Poisson poché au beurre', 'Pescado escalfado con mantequilla', 'Pochierter Fisch mit Butter', 'fish_seafood', 'dinner', 19, 1, 7, 'poaching'),
  lamb_cabbage: profile('ضأن بالملفوف حلال', 'Lamb with Cabbage, Halal', 'Agneau au chou halal', 'Cordero con col halal', 'Lamm mit Kohl, halal', 'meat_mains', 'dinner', 18, 5, 12, 'stewing'),
  pea_soup: profile('شوربة البازلاء', 'Pea Soup', 'Soupe de pois', 'Sopa de guisantes', 'Erbsensuppe', 'soups_stews', 'lunch', 7, 17, 3, 'simmering'),
  oat_bread: profile('خبز الشوفان بالجبن', 'Oat Bread with Cheese', 'Pain d’avoine au fromage', 'Pan de avena con queso', 'Haferbrot mit Käse', 'breakfast_items', 'breakfast', 8, 27, 7, 'baking'),
};

export const BASE_NATIONAL_RECIPES = {
  gravlaks: profile('جرافلاكس سلمون متبل بالشبت', 'Gravlaks Cured Salmon with Dill', 'Gravlaks à l’aneth', 'Gravlaks con eneldo', 'Gravlaks mit Dill', 'fish_seafood', 'snack', 20, 3, 10, 'marinating'),
  ovnsbakt_laks: profile('سلمون مخبوز بالليمون', 'Oven-Baked Salmon with Lemon', 'Saumon au four au citron', 'Salmón al horno con limón', 'Ofenlachs mit Zitrone', 'fish_seafood', 'dinner', 24, 1, 13, 'baking'),
  torsk_gulrot: profile('قد مسلوق بالجزر', 'Poached Cod with Carrots', 'Cabillaud poché aux carottes', 'Bacalao escalfado con zanahorias', 'Pochierter Kabeljau mit Karotten', 'fish_seafood', 'dinner', 19, 4, 3, 'poaching'),
  fiskesuppe: profile('شوربة السمك بالكريمة', 'Creamy Fish Soup with Root Vegetables', 'Soupe de poisson à la crème', 'Sopa de pescado cremosa', 'Fischsuppe mit Sahne', 'soups_stews', 'dinner', 12, 7, 7, 'simmering'),
  bergen_fiskesuppe: profile('شوربة سمك برغن بالخضار', 'Bergen Fish Soup with Vegetables', 'Soupe de poisson de Bergen', 'Sopa de pescado de Bergen', 'Bergener Fischsuppe', 'soups_stews', 'lunch', 11, 8, 6, 'simmering'),
  fiskekaker: profile('أقراص السمك بالبطاطس', 'Fish Cakes with Potatoes', 'Croquettes de poisson aux pommes de terre', 'Tortitas de pescado con patatas', 'Fischfrikadellen mit Kartoffeln', 'fish_seafood', 'dinner', 14, 10, 6, 'pan_frying'),
  fiskegrateng: profile('غراتن السمك', 'Fish Gratin', 'Gratin de poisson', 'Gratinado de pescado', 'Fischgratin', 'fish_seafood', 'dinner', 13, 9, 8, 'baking'),
  fiskeboller: profile('كرات السمك بالصلصة البيضاء', 'Fish Balls in White Sauce', 'Boulettes de poisson en sauce blanche', 'Bolitas de pescado en salsa blanca', 'Fischbällchen in weißer Soße', 'fish_seafood', 'dinner', 13, 6, 6, 'simmering'),
  plukkfisk: profile('بلوكفيسك بالبطاطس', 'Plukkfisk Fish and Potato Mash', 'Plukkfisk à la purée de pommes de terre', 'Plukkfisk con puré de patatas', 'Plukkfisk mit Kartoffelpüree', 'fish_seafood', 'dinner', 13, 12, 6, 'simmering'),
  bacalao: profile('باكالاو بالطماطم', 'Bacalao Tomato Cod Stew, No Wine', 'Bacalao à la tomate, sans vin', 'Bacalao con tomate, sin vino', 'Bacalao mit Tomaten, ohne Wein', 'fish_seafood', 'dinner', 16, 8, 5, 'stewing'),
  klippfisk_stew: profile('يخنة السمك المملح بالطماطم', 'Klippfisk Stew with Tomato', 'Mijoté de morue séchée à la tomate', 'Estofado de klippfisk con tomate', 'Klippfisch-Eintopf mit Tomate', 'fish_seafood', 'dinner', 17, 7, 4, 'stewing'),
  makrell_tomat: profile('ماكريل بصلصة الطماطم', 'Mackerel in Tomato Sauce', 'Maquereau à la sauce tomate', 'Caballa en salsa de tomate', 'Makrele in Tomatensoße', 'fish_seafood', 'dinner', 15, 5, 10, 'simmering'),
  rekesalat: profile('سلطة الروبيان بالبيض', 'Shrimp and Egg Salad', 'Salade de crevettes aux œufs', 'Ensalada de gambas con huevo', 'Garnelen-Eiersalat', 'fish_seafood', 'lunch', 12, 4, 8, 'tossing'),
  krabbesalat: profile('سلطة السلطعون بالخيار', 'Crab Salad with Cucumber', 'Salade de crabe au concombre', 'Ensalada de cangrejo con pepino', 'Krabbensalat mit Gurke', 'fish_seafood', 'lunch', 11, 5, 6, 'tossing'),
  sildesalat: profile('سلطة الرنجة بالبنجر', 'Herring Salad with Beetroot', 'Salade de hareng à la betterave', 'Ensalada de arenque con remolacha', 'Heringssalat mit Roter Bete', 'fish_seafood', 'lunch', 10, 8, 6, 'tossing'),
  kjottkaker: profile('كعكات اللحم البقري حلال', 'Kjøttkaker Halal Beef Meat Cakes', 'Kjøttkaker au bœuf halal', 'Kjøttkaker con ternera halal', 'Kjøttkaker, Halal-Rinderfrikadellen', 'meat_mains', 'dinner', 17, 5, 11, 'pan_frying'),
  farikal: profile('فريكول ضأن بالملفوف حلال', 'Fårikål Halal Lamb and Cabbage Stew', 'Fårikål à l’agneau halal et au chou', 'Fårikål con cordero halal y col', 'Fårikål, Halal-Lamm-Kohleintopf', 'meat_mains', 'dinner', 17, 5, 12, 'stewing'),
  lapskaus: profile('لابسكوس لحم بقري حلال', 'Lapskaus Halal Beef and Vegetable Stew', 'Lapskaus au bœuf halal', 'Lapskaus con ternera halal', 'Lapskaus, Halal-Rindfleischeintopf', 'meat_mains', 'dinner', 16, 9, 8, 'stewing'),
  lammerack: profile('ضلوع ضأن مشوية بالأعشاب حلال', 'Herb-Roast Halal Lamb Rack', 'Carré d’agneau rôti aux herbes halal', 'Rejilla de cordero asado con hierbas halal', 'Halal-Lammkarree mit Kräutern', 'meat_mains', 'dinner', 23, 1, 15, 'roasting'),
  karbonade: profile('كاربوناد بقري حلال', 'Karbonade Halal Beef Patty', 'Karbonade au bœuf halal', 'Karbonade con ternera halal', 'Karbonade, Halal-Rindfleischpflanzerl', 'meat_mains', 'dinner', 18, 4, 12, 'pan_frying'),
  kylling_rot: profile('دجاج بالفرن بالخضار الجذرية', 'Oven Chicken with Root Vegetables', 'Poulet au four aux légumes-racines', 'Pollo al horno con verduras de raíz', 'Ofenhähnchen mit Wurzelgemüse', 'poultry_mains', 'dinner', 22, 8, 9, 'baking'),
  kyllingboller: profile('كرات الدجاج بالشبت', 'Chicken Meatballs with Dill', 'Boulettes de poulet à l’aneth', 'Albóndigas de pollo con eneldo', 'Hähnchenbällchen mit Dill', 'poultry_mains', 'dinner', 18, 5, 7, 'simmering'),
  ertesuppe: profile('شوربة البازلاء الصفراء بلحم بقري حلال', 'Yellow Pea Soup with Halal Beef', 'Soupe de pois jaunes au bœuf halal', 'Sopa de guisantes amarillos con ternera halal', 'Gelbe Erbsensuppe mit Halal-Rind', 'soups_stews', 'dinner', 10, 18, 4, 'simmering'),
  byggrynsgrot: profile('عصيدة الشعير بالحليب', 'Barley Porridge with Milk', 'Bouillie d’orge au lait', 'Gachas de cebada con leche', 'Gerstenbrei mit Milch', 'breakfast_items', 'breakfast', 5, 22, 4, 'simmering'),
  rommegrot: profile('روميغروت بالقرفة', 'Rømmegrøt Sour Cream Porridge with Cinnamon', 'Rømmegrøt à la cannelle', 'Rømmegrøt con canela', 'Rømmegrøt mit Zimt', 'breakfast_items', 'breakfast', 4, 16, 10, 'simmering'),
  havregrot: profile('عصيدة الشوفان بالتوت', 'Oat Porridge with Berries', 'Bouillie d’avoine aux baies', 'Gachas de avena con bayas', 'Haferbrei mit Beeren', 'breakfast_items', 'breakfast', 5, 20, 4, 'simmering'),
  vaflar_brunost: profile('فطائر بالجبن البني', 'Waffles with Brunost', 'Gaufres au brunost', 'Gofres con brunost', 'Waffeln mit Brunost', 'breakfast_items', 'breakfast', 7, 32, 11, 'baking'),
  grovt_brod_ost: profile('خبز أسمر بالجبن', 'Wholegrain Bread with Cheese', 'Pain complet au fromage', 'Pan integral con queso', 'Vollkornbrot mit Käse', 'breakfast_items', 'breakfast', 8, 26, 7, 'assembling'),
  skyr_bol: profile('سكاير بالتوت والجرانولا', 'Skyr Bowl with Berries and Granola', 'Skyr aux baies et au granola', 'Skyr con bayas y granola', 'Skyr mit Beeren und Granola', 'breakfast_items', 'breakfast', 12, 18, 4, 'assembling'),
  knekkebrod_egg: profile('خبز مقرمش بالبيض المسلوق', 'Crispbread with Boiled Egg', 'Knekkebrød à l’œuf dur', 'Knekkebrød con huevo cocido', 'Knäckebrot mit gekochtem Ei', 'breakfast_items', 'breakfast', 9, 20, 7, 'assembling'),
  rokt_laks: profile('سلمون مدخن بالأعشاب', 'Smoked Salmon with Herbs', 'Saumon fumé aux herbes', 'Salmón ahumado con hierbas', 'Geräucherter Lachs mit Kräutern', 'fish_seafood', 'snack', 18, 2, 11, 'smoking'),
  gravet_orret: profile('تراوت متبل بالشبت', 'Cured Trout with Dill', 'Truite marinée à l’aneth', 'Trucha curada con eneldo', 'Gravierte Forelle mit Dill', 'fish_seafood', 'snack', 20, 3, 9, 'marinating'),
  lutefisk: profile('لوتيفيسك بالزبدة', 'Lutefisk with Butter', 'Lutefisk au beurre', 'Lutefisk con mantequilla', 'Lutefisk mit Butter', 'fish_seafood', 'dinner', 18, 2, 6, 'simmering'),
  kveite: profile('هاليوبت مشوي بالليمون', 'Grilled Halibut with Lemon', 'Flétan grillé au citron', 'Fletán a la parrilla con limón', 'Gegrillter Heilbutt mit Zitrone', 'fish_seafood', 'dinner', 22, 1, 8, 'grilling'),
  breiflabb: profile('سمك الراهب بالفرن بالأعشاب', 'Baked Monkfish with Herbs', 'Lotte au four aux herbes', 'Rape al horno con hierbas', 'Seeteufel aus dem Ofen mit Kräutern', 'fish_seafood', 'dinner', 18, 1, 5, 'baking'),
  krabbe_gryte: profile('يخنة السلطعون بالكريمة', 'Crab Stew with Cream', 'Mijoté de crabe à la crème', 'Guiso de cangrejo con crema', 'Krabbeneintopf mit Sahne', 'fish_seafood', 'dinner', 13, 5, 8, 'stewing'),
  reke_smorbrod: profile('شطيرة الروبيان المفتوحة', 'Open Shrimp Sandwich', 'Smørrebrød aux crevettes', 'Sándwich abierto de gambas', 'Garnelen-Smørrebrød', 'street_snacks', 'lunch', 12, 18, 7, 'assembling'),
  laks_smorbrod: profile('شطيرة السلمون المفتوحة', 'Open Salmon Sandwich', 'Smørrebrød au saumon', 'Sándwich abierto de salmón', 'Lachs-Smørrebrød', 'street_snacks', 'lunch', 13, 17, 8, 'assembling'),
  eggerore_rug: profile('سلطة البيض على خبز الجاودار', 'Egg Salad on Rye Bread', 'Salade d’œufs au pain de seigle', 'Ensalada de huevo en pan de centeno', 'Eiersalat auf Roggenbrot', 'street_snacks', 'lunch', 9, 16, 8, 'assembling'),
  ost_smorbrod: profile('شطيرة الجبن والخيار', 'Open Cheese and Cucumber Sandwich', 'Smørrebrød au fromage et au concombre', 'Sándwich abierto de queso y pepino', 'Käse-Gurken-Smørrebrød', 'street_snacks', 'lunch', 10, 18, 8, 'assembling'),
  sodd: profile('شوربة سود باللحم البقري والكرات حلال', 'Sodd Halal Beef Soup with Meatballs', 'Sodd au bœuf halal et aux boulettes', 'Sodd con ternera halal y albóndigas', 'Sodd, Halal-Rindersuppe mit Fleischbällchen', 'soups_stews', 'dinner', 14, 8, 6, 'simmering'),
  kjottgryte_timian: profile('يخنة لحم بقري بالزعتر حلال', 'Halal Beef Stew with Thyme', 'Ragoût de bœuf halal au thym', 'Estofado de ternera halal con tomillo', 'Halal-Rindereintopf mit Thymian', 'meat_mains', 'dinner', 18, 7, 10, 'stewing'),
  lammeskank: profile('ساق ضأن مطهو بالجذور حلال', 'Braised Halal Lamb Shank with Root Vegetables', 'Jarret d’agneau braisé halal aux légumes-racines', 'Jarrete de cordero estofado halal con verduras de raíz', 'Geschmorte Halal-Lammhaxe mit Wurzelgemüse', 'meat_mains', 'dinner', 22, 5, 13, 'braising'),
  kalvestek: profile('روستو عجل بالأعشاب حلال', 'Roast Veal with Herbs, Halal', 'Rôti de veau aux herbes halal', 'Asado de ternera con hierbas halal', 'Kalbsbraten mit Kräutern, halal', 'meat_mains', 'dinner', 23, 1, 12, 'roasting'),
  kylling_gryte_krem: profile('يخنة دجاج بالكريمة', 'Creamy Chicken Stew', 'Mijoté de poulet à la crème', 'Guiso de pollo con crema', 'Hähncheneintopf mit Sahne', 'poultry_mains', 'dinner', 19, 5, 9, 'stewing'),
  andebryst: profile('صدر بطة بالفرن بالجذور', 'Roast Duck Breast with Root Vegetables', 'Magret de canard rôti aux légumes-racines', 'Pechuga de pato asada con verduras de raíz', 'Entenbrust aus dem Ofen mit Wurzelgemüse', 'poultry_mains', 'dinner', 20, 4, 12, 'roasting'),
  kylling_frikasse: profile('فريكاسيه دجاج بالجزر', 'Chicken Fricassee with Carrots', 'Fricassée de poulet aux carottes', 'Fricasé de pollo con zanahorias', 'Hähnchenfrikassee mit Karotten', 'poultry_mains', 'dinner', 17, 7, 8, 'simmering'),
  kremet_brokkoli: profile('بروكلي مطهو بالكريمة', 'Creamed Broccoli', 'Brocoli à la crème', 'Brócoli en crema', 'Brokkoli in Sahne', 'vegetable_mains', 'lunch', 4, 8, 6, 'simmering'),
  blomkal_grateng: profile('غراتن القرنبيط', 'Cauliflower Gratin', 'Gratin de chou-fleur', 'Gratinado de coliflor', 'Blumenkohlgratin', 'vegetable_mains', 'dinner', 5, 8, 9, 'baking'),
  nepe_pure: profile('هريس اللفت بالزبدة', 'Mashed Swede with Butter', 'Purée de rutabaga au beurre', 'Puré de nabo con mantequilla', 'Steckrübenpüree mit Butter', 'vegetable_mains', 'lunch', 2, 11, 6, 'boiling'),
  rodbet_salat: profile('سلطة البنجر بالجوز', 'Beetroot Salad with Walnuts', 'Salade de betterave aux noix', 'Ensalada de remolacha con nueces', 'Rote-Bete-Salat mit Walnüssen', 'vegetable_mains', 'lunch', 3, 10, 7, 'tossing'),
  eple_rodbet: profile('سلطة التفاح والبنجر', 'Apple and Beetroot Salad', 'Salade de pommes et de betteraves', 'Ensalada de manzana y remolacha', 'Apfel-Rote-Bete-Salat', 'vegetable_mains', 'lunch', 2, 12, 4, 'tossing'),
  sopp_stuing: profile('فطر مطهو بالكريمة', 'Creamed Mushrooms', 'Champignons à la crème', 'Setas en crema', 'Pilze in Sahne', 'vegetable_mains', 'lunch', 4, 6, 7, 'simmering'),
  gronnsak_gryte: profile('يخنة الخضار بالشعير', 'Vegetable and Barley Stew', 'Mijoté de légumes à l’orge', 'Guiso de verduras con cebada', 'Gemüse-Gersten-Eintopf', 'vegetable_mains', 'dinner', 5, 18, 4, 'stewing'),
  blomkal_suppe: profile('شوربة القرنبيط بالكريمة', 'Creamy Cauliflower Soup', 'Soupe de chou-fleur à la crème', 'Sopa de coliflor cremosa', 'Blumenkohlcremesuppe', 'soups_stews', 'lunch', 4, 9, 5, 'simmering'),
  potet_suppe: profile('شوربة البطاطس بالكراث', 'Potato and Leek Soup', 'Soupe de pommes de terre aux poireaux', 'Sopa de patata y puerro', 'Kartoffel-Lauch-Suppe', 'soups_stews', 'lunch', 3, 13, 4, 'simmering'),
  gulrot_suppe: profile('شوربة الجزر بالزنجبيل', 'Carrot Soup with Ginger', 'Soupe de carottes au gingembre', 'Sopa de zanahoria con jengibre', 'Karotten-Ingwer-Suppe', 'soups_stews', 'lunch', 2, 11, 4, 'simmering'),
  vafler_havre: profile('فطائر الشوفان بالتوت', 'Oat Waffles with Berries', 'Gaufres d’avoine aux baies', 'Gofres de avena con bayas', 'Haferwaffeln mit Beeren', 'breakfast_items', 'breakfast', 6, 30, 9, 'baking'),
  rug_grot: profile('عصيدة الجاودار بالحليب', 'Rye Porridge with Milk', 'Bouillie de seigle au lait', 'Gachas de centeno con leche', 'Roggenbrei mit Milch', 'breakfast_items', 'breakfast', 5, 21, 4, 'simmering'),
  brunost_egg_teller: profile('فطور الجبن البني والبيض', 'Brunost and Egg Breakfast Plate', 'Assiette brunost et œuf', 'Desayuno de brunost y huevo', 'Brunost-Ei-Frühstücksteller', 'breakfast_items', 'breakfast', 11, 14, 10, 'assembling'),
};

export const EXPANSION_REGIONAL_RECIPES = { ...BASE_REGIONAL_RECIPES };

export const EXPANSION_NATIONAL_RECIPES = {
  steikt_torsk: profile('قد مقلي بالزبدة', 'Pan-Seared Cod with Butter', 'Cabillaud poêlé au beurre', 'Bacalao a la plancha con mantequilla', 'Kabeljau in Butter gebraten', 'fish_seafood', 'dinner', 20, 1, 8, 'pan_frying'),
  orret_mandler: profile('تراوت باللوز', 'Trout with Almonds', 'Truite aux amandes', 'Trucha con almendras', 'Forelle mit Mandeln', 'fish_seafood', 'dinner', 21, 2, 10, 'pan_frying'),
  laksesuppe: profile('شوربة السلمون بالخضار الجذرية', 'Salmon Soup with Root Vegetables', 'Soupe de saumon aux légumes-racines', 'Sopa de salmón con verduras de raíz', 'Lachssuppe mit Wurzelgemüse', 'soups_stews', 'lunch', 13, 6, 7, 'simmering'),
  fiskepudding: profile('بودنغ السمك بالجزر', 'Fish Pudding with Carrots', 'Pudding de poisson aux carottes', 'Pudín de pescado con zanahorias', 'Fischpudding mit Karotten', 'fish_seafood', 'dinner', 13, 5, 5, 'baking'),
  torrfisk: profile('سمك مجفف خفيف', 'Stockfish Snack, Tørrfisk', 'Tørrfisk, stockfish séché', 'Tørrfisk, bacalao seco', 'Tørrfisk, Stockfisch-Snack', 'fish_seafood', 'snack', 24, 0, 3, 'drying'),
  muslinger_urter: profile('بلح البحر بالأعشاب', 'Mussels Steamed with Herbs, No Wine', 'Moules aux herbes, sans vin', 'Mejillones al vapor con hierbas, sin vino', 'Miesmuscheln mit Kräutern, ohne Wein', 'fish_seafood', 'dinner', 13, 5, 5, 'simmering'),
  seafood_chowder: profile('شوربة المأكولات البحرية', 'Seafood Chowder, No Wine', 'Chowder de fruits de mer, sans vin', 'Chowder de marisco, sin vino', 'Meeresfrüchte-Chowder, ohne Wein', 'soups_stews', 'dinner', 12, 8, 7, 'simmering'),
  kamskjell: profile('سكالوب مقلي مع هريس البازلاء', 'Seared Scallops with Pea Purée', 'Noix de Saint-Jacques poêlées, purée de pois', 'Vieiras a la plancha con puré de guisantes', 'Gebratene Jakobsmuscheln mit Erbsenpüree', 'fish_seafood', 'dinner', 15, 5, 7, 'pan_frying'),
  laks_burger: profile('برغر سلمون بالشبت', 'Salmon Burger with Dill', 'Burger de saumon à l’aneth', 'Hamburguesa de salmón con eneldo', 'Lachsburger mit Dill', 'fish_seafood', 'lunch', 16, 12, 8, 'pan_frying'),
  stekt_sild: profile('رنجة مقلية بالبطاطس', 'Fried Herring with Potatoes', 'Hareng frit aux pommes de terre', 'Arenque frito con patatas', 'Gebratener Hering mit Kartoffeln', 'fish_seafood', 'dinner', 15, 12, 9, 'pan_frying'),
  sei_luk: profile('ساي مقلي بالبصل', 'Pan-Fried Saithe with Onion', 'Lieu noir poêlé à l’oignon', 'Carbonero a la plancha con cebolla', 'Seelachs in der Pfanne mit Zwiebeln', 'fish_seafood', 'dinner', 19, 3, 6, 'pan_frying'),
  laks_pasta: profile('باستا سلمون بالشبت', 'Salmon Pasta with Dill', 'Pâtes au saumon et à l’aneth', 'Pasta con salmón y eneldo', 'Lachsnudeln mit Dill', 'noodle_dishes', 'dinner', 14, 24, 8, 'simmering'),
  fiskegryte_ris: profile('يخنة السمك بالأرز', 'Fish Stew with Rice', 'Mijoté de poisson au riz', 'Guiso de pescado con arroz', 'Fischeintopf mit Reis', 'rice_dishes', 'dinner', 13, 20, 5, 'simmering'),
  kjottboller_brun: profile('كرات لحم بقري بالصلصة البنية حلال', 'Halal Beef Meatballs in Brown Sauce', 'Boulettes de bœuf halal en sauce brune', 'Albóndigas de ternera halal en salsa marrón', 'Halal-Rinderbällchen in brauner Soße', 'meat_mains', 'dinner', 16, 6, 10, 'simmering'),
  lammekoteletter: profile('ضلوع ضأن مشوية بإكليل الجبل حلال', 'Grilled Halal Lamb Chops with Rosemary', 'Côtelettes d’agneau grillées au romarin halal', 'Chuletas de cordero a la parrilla con romero halal', 'Gegrillte Halal-Lammkoteletts mit Rosmarin', 'meat_mains', 'dinner', 23, 0, 14, 'grilling'),
  oksegryte: profile('يخنة لحم بقري بالجذور حلال', 'Halal Beef Stew with Root Vegetables', 'Ragoût de bœuf halal aux légumes-racines', 'Estofado de ternera halal con verduras de raíz', 'Halal-Rindereintopf mit Wurzelgemüse', 'meat_mains', 'dinner', 18, 8, 9, 'stewing'),
  kylling_salat: profile('سلطة الدجاج بالتوت البري', 'Chicken Salad with Lingonberries', 'Salade de poulet aux airelles', 'Ensalada de pollo con arándanos rojos', 'Hähnchensalat mit Preiselbeeren', 'poultry_mains', 'lunch', 16, 6, 7, 'tossing'),
  erter_stuing: profile('بازلاء مطهوة بالكريمة', 'Creamed Peas', 'Petits pois à la crème', 'Guisantes en crema', 'Erbsen in Sahne', 'vegetable_mains', 'lunch', 5, 11, 6, 'simmering'),
  rotkal_stuing: profile('كرنب مطهو بالكريمة', 'Creamed Cabbage', 'Chou à la crème', 'Col en crema', 'Kohl in Sahne', 'vegetable_mains', 'lunch', 3, 8, 6, 'simmering'),
  gulrot_stuing: profile('جزر مطهو بالكريمة', 'Creamed Carrots', 'Carottes à la crème', 'Zanahorias en crema', 'Karotten in Sahne', 'vegetable_mains', 'lunch', 2, 10, 5, 'simmering'),
  potetball: profile('كرات البطاطس بالشعير', 'Potato Dumplings with Barley Flour', 'Boulettes de pommes de terre à l’orge', 'Bolas de patata con cebada', 'Kartoffelklöße mit Gerste', 'vegetable_mains', 'dinner', 5, 22, 3, 'boiling'),
  svele_brunost: profile('سفيله بالجبن البني', 'Svele Pancakes with Brunost', 'Svele au brunost', 'Svele con brunost', 'Svele mit Brunost', 'breakfast_items', 'breakfast', 7, 30, 10, 'pan_frying'),
  rommevafler: profile('فطائر الكريمة الحامضة', 'Sour Cream Waffles', 'Gaufres à la crème aigre', 'Gofres de crema agria', 'Sauerrahm-Waffeln', 'breakfast_items', 'breakfast', 6, 31, 10, 'baking'),
  riskrem: profile('أرز بالكريمة وصلصة التوت', 'Riskrem Rice Cream with Berry Sauce', 'Riskrem à la sauce aux baies', 'Riskrem con salsa de bayas', 'Riskrem mit Beerensauce', 'rice_cakes_sweets', 'snack', 4, 24, 8, 'assembling'),
  trollkrem: profile('كريمة التوت البري', 'Trollkrem Lingonberry Cream', 'Trollkrem aux airelles', 'Trollkrem con arándanos rojos', 'Trollkrem, Preiselbeercreme', 'rice_cakes_sweets', 'snack', 2, 18, 4, 'whipping'),
  bondepiker: profile('فتات التفاح بالكريمة', 'Tilslørte Bondepiker Apple Trifle', 'Tilslørte bondepiker aux pommes', 'Tilslørte bondepiker de manzana', 'Tilslørte Bondepiker, Apfeltrifle', 'rice_cakes_sweets', 'snack', 2, 20, 7, 'assembling'),
  kanelbolle: profile('لفائف القرفة', 'Cinnamon Buns, Kanelbolle', 'Kanelbolle à la cannelle', 'Kanelbolle con canela', 'Kanelbolle, Zimtschnecken', 'rice_cakes_sweets', 'breakfast', 6, 40, 11, 'baking'),
  hveteboller: profile('كعك القمح بالهيل', 'Wheat Buns with Cardamom', 'Hvetebolle à la cardamome', 'Hvetebolle con cardamomo', 'Hvetebolle mit Kardamom', 'breakfast_items', 'breakfast', 7, 38, 8, 'baking'),
  multekrem: profile('كريمة التوت السحابي', 'Multekrem Cloudberry Cream', 'Multekrem aux mûres arctiques', 'Multekrem con mora ártica', 'Multekrem, Moltebeercreme', 'rice_cakes_sweets', 'snack', 2, 19, 5, 'whipping'),
  eplekake: profile('كعكة التفاح بالشوفان', 'Baked Apple Oat Cake', 'Gâteau aux pommes et à l’avoine', 'Pastel de manzana con avena', 'Apfel-Hafer-Kuchen', 'rice_cakes_sweets', 'snack', 4, 26, 8, 'baking'),
  gravlaks_salat: profile('سلطة السلمون المتبل بالخيار', 'Gravlaks Salad with Cucumber', 'Salade de gravlaks au concombre', 'Ensalada de gravlaks con pepino', 'Gravlakssalat mit Gurke', 'fish_seafood', 'lunch', 14, 4, 8, 'tossing'),
  torsk_erter: profile('قد مع هريس البازلاء', 'Cod with Pea Purée and Butter', 'Cabillaud à la purée de pois', 'Bacalao con puré de guisantes', 'Kabeljau mit Erbsenpüree', 'fish_seafood', 'dinner', 20, 5, 6, 'poaching'),
  hyse_ovn: profile('هادوك مخبوز بالطماطم', 'Baked Haddock with Tomato', 'Aiglefin au four à la tomate', 'Eglefino al horno con tomate', 'Schellfisch aus dem Ofen mit Tomate', 'fish_seafood', 'dinner', 19, 4, 4, 'baking'),
  laks_quinoa: profile('سلمون بالكينوا والخيار', 'Salmon with Quinoa and Cucumber', 'Saumon au quinoa et au concombre', 'Salmón con quinoa y pepino', 'Lachs mit Quinoa und Gurke', 'fish_seafood', 'dinner', 21, 14, 9, 'pan_frying'),
  makrell_salat: profile('سلطة الماكريل بالتفاح', 'Mackerel Salad with Apple', 'Salade de maquereau à la pomme', 'Ensalada de caballa con manzana', 'Makrelensalat mit Apfel', 'fish_seafood', 'lunch', 13, 6, 9, 'tossing'),
  reke_gryte: profile('يخنة الروبيان بالثوم', 'Shrimp Stew with Garlic', 'Mijoté de crevettes à l’ail', 'Guiso de gambas con ajo', 'Garneleneintopf mit Knoblauch', 'fish_seafood', 'dinner', 14, 5, 7, 'simmering'),
  krabbe_eple_salat: profile('سلطة السلطعون بالتفاح', 'Crab and Apple Salad', 'Salade de crabe à la pomme', 'Ensalada de cangrejo con manzana', 'Krabben-Apfel-Salat', 'fish_seafood', 'lunch', 11, 7, 5, 'tossing'),
  laks_spinat: profile('سلمون بالفرن بالسبانخ', 'Baked Salmon with Spinach', 'Saumon au four aux épinards', 'Salmón al horno con espinacas', 'Ofenlachs mit Spinat', 'fish_seafood', 'dinner', 23, 2, 13, 'baking'),
  sei_suppe: profile('شوربة ساي بالجزر', 'Saithe Soup with Carrots', 'Soupe de lieu noir aux carottes', 'Sopa de carbonero con zanahorias', 'Seelachssuppe mit Karotten', 'soups_stews', 'lunch', 12, 5, 3, 'simmering'),
  fiske_brokkoli_grateng: profile('غراتن السمك بالبروكلي', 'Fish and Broccoli Gratin', 'Gratin de poisson au brocoli', 'Gratinado de pescado con brócoli', 'Fisch-Brokkoli-Gratin', 'fish_seafood', 'dinner', 13, 8, 8, 'baking'),
  oksestek: profile('روستو بقر بالأعشاب حلال', 'Herb Roast Halal Beef', 'Rôti de bœuf aux herbes halal', 'Asado de res con hierbas halal', 'Halal-Rinderbraten mit Kräutern', 'meat_mains', 'dinner', 24, 1, 13, 'roasting'),
  lammegryte_tomat: profile('يخنة ضأن بالطماطم حلال', 'Halal Lamb Stew with Tomato', 'Mijoté d’agneau halal à la tomate', 'Guiso de cordero halal con tomate', 'Halal-Lammeintopf mit Tomate', 'meat_mains', 'dinner', 17, 7, 11, 'stewing'),
  kjottkaker_erter: profile('كعكات اللحم مع البازلاء حلال', 'Kjøttkaker with Creamed Peas, Halal Beef', 'Kjøttkaker aux petits pois, bœuf halal', 'Kjøttkaker con guisantes, ternera halal', 'Kjøttkaker mit Erbsen, Halal-Rind', 'meat_mains', 'dinner', 16, 9, 10, 'pan_frying'),
  kalv_boller: profile('كرات عجل بالكريمة حلال', 'Halal Veal Meatballs in Cream Sauce', 'Boulettes de veau halal à la crème', 'Albóndigas de ternera halal en crema', 'Halal-Kalbsbällchen in Sahnesoße', 'meat_mains', 'dinner', 15, 5, 11, 'simmering'),
  biff_lok: profile('بفتيك بالبصل حلال', 'Halal Beef Steak with Onions', 'Bifteck aux oignons halal', 'Bistec con cebolla halal', 'Halal-Rindersteak mit Zwiebeln', 'meat_mains', 'dinner', 24, 4, 13, 'pan_frying'),
  kylling_erter: profile('دجاج بالبازلاء والجزر', 'Chicken with Peas and Carrots', 'Poulet aux petits pois et carottes', 'Pollo con guisantes y zanahorias', 'Hähnchen mit Erbsen und Karotten', 'poultry_mains', 'dinner', 20, 8, 7, 'stewing'),
  kylling_grill_salat: profile('دجاج مشوي مع سلطة الحديقة', 'Grilled Chicken with Garden Salad', 'Poulet grillé à la salade du jardin', 'Pollo a la parrilla con ensalada de huerto', 'Gegrilltes Hähnchen mit Gartensalat', 'poultry_mains', 'lunch', 22, 4, 7, 'grilling'),
  kylling_suppe_nudel: profile('شوربة الدجاج بالشعيرية', 'Chicken Noodle Soup', 'Soupe de poulet aux vermicelles', 'Sopa de pollo con fideos', 'Hühnersuppe mit Fadennudeln', 'soups_stews', 'lunch', 11, 10, 3, 'simmering'),
  byggotto: profile('بيغوتو شعير بالفطر', 'Byggotto Barley Risotto with Mushrooms', 'Byggotto à l’orge et aux champignons', 'Byggotto de cebada con setas', 'Byggotto, Gerstenrisotto mit Pilzen', 'rice_dishes', 'dinner', 6, 22, 6, 'simmering'),
  rug_salat: profile('سلطة حبوب الجاودار بالخضار', 'Rye Berry Salad with Vegetables', 'Salade de grains de seigle aux légumes', 'Ensalada de grano de centeno con verduras', 'Roggenkornsalat mit Gemüse', 'vegetable_mains', 'lunch', 4, 18, 5, 'tossing'),
  potet_mos: profile('بطاطس مهروسة بالزبدة', 'Mashed Potatoes with Butter', 'Purée de pommes de terre au beurre', 'Puré de patatas con mantequilla', 'Kartoffelpüree mit Butter', 'vegetable_mains', 'lunch', 3, 18, 7, 'boiling'),
  rotmos: profile('هريس الخضار الجذرية', 'Root Vegetable Mash, Rotmos', 'Rotmos, purée de légumes-racines', 'Rotmos, puré de verduras de raíz', 'Rotmos, Wurzelgemüsepüree', 'vegetable_mains', 'dinner', 3, 15, 6, 'boiling'),
  surkal: profile('ملفوف حامض حلو بالتفاح', 'Sweet-and-Sour Cabbage with Apple', 'Chou aigre-doux à la pomme', 'Col agridulce con manzana', 'Süß-saurer Kohl mit Apfel', 'vegetable_mains', 'lunch', 2, 12, 5, 'stewing'),
  gronnsak_wok: profile('خضار سوتيه بالثوم', 'Sautéed Vegetables with Garlic', 'Légumes sautés à l’ail', 'Verduras salteadas con ajo', 'Gemüsepfanne mit Knoblauch', 'vegetable_mains', 'lunch', 3, 9, 6, 'pan_frying'),
  skyr_notter: profile('سكاير بالمكسرات والعسل', 'Skyr with Nuts and Honey', 'Skyr aux noix et au miel', 'Skyr con nueces y miel', 'Skyr mit Nüssen und Honig', 'breakfast_items', 'breakfast', 13, 14, 8, 'assembling'),
  havre_pannekaker: profile('فطائر الشوفان بالتوت البري', 'Oat Pancakes with Lingonberries', 'Crêpes d’avoine aux airelles', 'Tortitas de avena con arándanos rojos', 'Haferpfannkuchen mit Preiselbeeren', 'breakfast_items', 'breakfast', 6, 28, 9, 'pan_frying'),
  eple_grot: profile('عصيدة التفاح بالقرفة', 'Apple Porridge with Cinnamon', 'Bouillie de pommes à la cannelle', 'Gachas de manzana con canela', 'Apfelbrei mit Zimt', 'breakfast_items', 'breakfast', 2, 22, 3, 'simmering'),
  bringebaer_fromasj: profile('موس التوت بالكريمة', 'Raspberry Cream Mousse', 'Mousse aux framboises', 'Mousse de frambuesa', 'Himbeercreme', 'rice_cakes_sweets', 'snack', 3, 16, 8, 'whipping'),
  blabaer_kompott: profile('كومبوستو التوت الأزرق بالزبادي', 'Blueberry Compote with Yogurt', 'Compote de myrtilles au yaourt', 'Compota de arándanos con yogur', 'Blaubeerkompott mit Joghurt', 'rice_cakes_sweets', 'snack', 2, 14, 3, 'simmering'),
  suksesskake: profile('كعكة اللوز بالكاسترد', 'Almond Custard Cake, Light', 'Gâteau aux amandes et à la crème pâtissière', 'Pastel de almendra con crema', 'Mandel-Vanille-Kuchen', 'rice_cakes_sweets', 'snack', 6, 24, 12, 'baking'),
};

export function B(profileRow, region) {
  const token = REGION_DEMONYM[region];
  if (!token) throw new Error(`Unknown Norway region: ${region}`);
  const extra = REGION_DIASPORA[region];
  const national = region === 'pan_norwegian';
  const descriptor = REGIONS.find(([id]) => id === region);
  return {
    id: '',
    nameAr: `${national ? '' : `${descriptor[1]} `}${profileRow.ar} ${token}`.trim(),
    nameEn: `${national ? 'Norwegian ' : `${descriptor[2]} `}${profileRow.en}`,
    nameFr: `${national ? 'Cuisine norvégienne : ' : `${descriptor[3]} `}${profileRow.fr}`,
    nameEs: `${national ? 'Cocina noruega: ' : `${descriptor[4]} `}${profileRow.es}`,
    nameDe: `${national ? 'Norwegische Küche: ' : `${descriptor[5]} `}${profileRow.de}`,
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
      if (!recipes[key]) throw new Error(`Unknown Norway recipe profile: ${key}`);
      rows.push(B(recipes[key], region));
    }
  }
  for (const key of nationalKeys) {
    if (!recipes[key]) throw new Error(`Unknown Norway recipe profile: ${key}`);
    rows.push(B(recipes[key], 'pan_norwegian'));
  }
  return rows;
}
