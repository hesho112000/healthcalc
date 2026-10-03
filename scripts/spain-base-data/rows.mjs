export const BASE_DIASPORA = ['spanish', 'western', 'comfort_food', 'mediterranean'];
export const REGION_DIASPORA = { madrid: 'madrilenian', barcelona: 'catalan', andalusia: 'andalusian' };

// Each anchor owns one stable Arabic token; no Spanish row belongs in asian_shared.
export const REGION_DEMONYM = {
  pan_spanish: 'إسباني',
  madrid: 'مدريدي',
  barcelona: 'برشلوني',
  valencia: 'فالنسي',
  seville: 'إشبيلي',
  basque: 'باسكي',
  galicia: 'غاليسي',
  andalusia: 'أندلسي',
  castile: 'قشتالي',
  aragon: 'أراغوني',
  catalonia: 'كتالوني',
  canary_islands: 'كناري',
  balearic: 'بلياري',
};

const REGIONS = [
  ['pan_spanish', 'مطابخ إسبانيا', 'Spanish', 'espagnole', 'española', 'spanische'],
  ['madrid', 'مطابخ مدريد', 'Madrid', 'À la madrilène : ', 'Al estilo madrileño: ', 'Madrider Art: '],
  ['barcelona', 'مطابخ برشلونة', 'Barcelona', 'À la barcelonaise : ', 'Al estilo barcelonés: ', 'Barcelona-Art: '],
  ['valencia', 'مطابخ فالنسيا', 'Valencian', 'À la valencienne : ', 'Al estilo valenciano: ', 'Valencianische Art: '],
  ['seville', 'مطابخ إشبيلية', 'Sevillian', 'À la sévillane : ', 'Al estilo sevillano: ', 'Sevillanische Art: '],
  ['basque', 'مطابخ الباسك', 'Basque', 'À la basque : ', 'Al estilo vasco: ', 'Baskische Art: '],
  ['galicia', 'مطابخ غاليسيا', 'Galician', 'À la galicienne : ', 'Al estilo gallego: ', 'Galicische Art: '],
  ['andalusia', 'مطابخ الأندلس', 'Andalusian', 'À l’andalouse : ', 'Al estilo andaluz: ', 'Andalusische Art: '],
  ['castile', 'مطابخ قشتالة', 'Castilian', 'À la castillane : ', 'Al estilo castellano: ', 'Kastilische Art: '],
  ['aragon', 'مطابخ أراغون', 'Aragonese', 'À l’aragonaise : ', 'Al estilo aragonés: ', 'Aragonesische Art: '],
  ['catalonia', 'مطابخ كتالونيا', 'Catalan', 'À la catalane : ', 'Al estilo catalán: ', 'Katalanische Art: '],
  ['canary_islands', 'مطابخ جزر الكناري', 'Canarian', 'À la canarienne : ', 'Al estilo canario: ', 'Kanarische Art: '],
  ['balearic', 'مطابخ البليار', 'Balearic', 'À la baléare : ', 'Al estilo balear: ', 'Balearische Art: '],
];

const profile = (ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking) =>
  ({ ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking });

export const BASE_REGIONAL_RECIPES = {
  roast_chicken: profile('دجاج مشوي بالأعشاب', 'Herb-Roasted Chicken', 'Poulet rôti aux herbes', 'Pollo asado a las hierbas', 'Kräuter-Brathähnchen', 'poultry_mains', 'dinner', 22, 2, 9, 'roasting'),
  tomato_rice: profile('أرز بالطماطم والفلفل', 'Tomato Pepper Rice', 'Riz à la tomate et au poivron', 'Arroz con tomate y pimiento', 'Tomaten-Paprika-Reis', 'rice_dishes', 'lunch', 4, 27, 5, 'simmering'),
  grilled_fish: profile('سمك مشوي بالليمون', 'Grilled Fish with Lemon', 'Poisson grillé au citron', 'Pescado a la parrilla con limón', 'Gegrillter Fisch mit Zitrone', 'fish_seafood', 'dinner', 21, 2, 8, 'grilling'),
  paprika_soup: profile('حساء الخضار بالبابريكا', 'Paprika Vegetable Soup', 'Soupe de légumes au paprika', 'Sopa de verduras con pimentón', 'Paprika-Gemüsesuppe', 'soups_stews', 'lunch', 3, 12, 4, 'simmering'),
  bean_stew: profile('يخنة الفاصولياء بالخضار', 'Bean and Vegetable Stew', 'Mijoté de haricots et légumes', 'Estofado de alubias con verduras', 'Bohnen-Gemüse-Eintopf', 'soups_stews', 'dinner', 8, 22, 4, 'stewing'),
  orange_salad: profile('سلطة البرتقال والزيتون', 'Orange and Olive Salad', 'Salade d’orange et d’olives', 'Ensalada de naranja y aceituna', 'Orangen-Oliven-Salat', 'vegetable_mains', 'lunch', 2, 12, 7, 'tossing'),
};

export const BASE_NATIONAL_RECIPES = {
  paella: profile('باييا بالدجاج والخضار', 'Chicken Paella Valenciana, Halal', 'Paella valencienne au poulet halal', 'Paella valenciana con pollo halal', 'Paella Valenciana mit Halal-Hähnchen', 'rice_dishes', 'dinner', 12, 22, 7, 'simmering'),
  paella_marisco: profile('باييا بالمأكولات البحرية', 'Seafood Paella', 'Paella aux fruits de mer', 'Paella de marisco', 'Meeresfrüchte-Paella', 'rice_dishes', 'dinner', 14, 22, 6, 'simmering'),
  gazpacho: profile('غازباتشو بالطماطم والخيار', 'Gazpacho Andalusian Cold Soup', 'Gazpacho andalou', 'Gazpacho andaluz', 'Andalusische Gazpacho', 'soups_stews', 'lunch', 2, 8, 5, 'blending'),
  salmorejo: profile('سالموريخو بالطماطم والخبز', 'Salmorejo Cordobés', 'Salmorejo de Cordoue', 'Salmorejo cordobés', 'Salmorejo aus Córdoba', 'soups_stews', 'lunch', 3, 10, 6, 'blending'),
  tortilla: profile('تورتيلا البطاطس والبيض', 'Tortilla Española, Potato Omelette', 'Tortilla espagnole aux pommes de terre', 'Tortilla española de patatas', 'Spanische Tortilla mit Kartoffeln', 'breakfast_items', 'breakfast', 8, 14, 9, 'pan_frying'),
  churros: profile('تشوروس بالشوكولاتة الساخنة', 'Churros with Hot Chocolate', 'Churros au chocolat chaud', 'Churros con chocolate caliente', 'Churros mit heißer Schokolade', 'rice_cakes_sweets', 'breakfast', 5, 40, 13, 'frying'),
  fabada: profile('فابادا بالفاصولياء ولحم بقري حلال', 'Fabada with White Beans and Halal Beef', 'Fabada aux haricots blancs et au bœuf halal', 'Fabada con fabes y ternera halal', 'Fabada mit weißen Bohnen und Halal-Rind', 'soups_stews', 'dinner', 11, 19, 7, 'stewing'),
  cocido: profile('كوسيدو بالحمص ولحم بقري حلال', 'Cocido Madrileño with Halal Beef and Chickpeas', 'Cocido madrilène au bœuf halal et aux pois chiches', 'Cocido madrileño con ternera halal y garbanzos', 'Cocido Madrileño mit Halal-Rind und Kichererbsen', 'soups_stews', 'dinner', 13, 16, 8, 'simmering'),
  pulpo: profile('أخطبوط بالبابريكا وزيت الزيتون', 'Pulpo a la Gallega with Paprika', 'Poulpe à la galicienne au paprika', 'Pulpo a la gallega con pimentón', 'Oktopus auf galicische Art mit Paprika', 'fish_seafood', 'dinner', 16, 5, 7, 'boiling'),
  pisto: profile('بيستو بالخضار المطهوة', 'Pisto Manchego with Egg', 'Pisto manchego à l’œuf', 'Pisto manchego con huevo', 'Pisto Manchego mit Ei', 'vegetable_mains', 'lunch', 4, 11, 6, 'stewing'),
  albondigas: profile('ألبونديغاس بصلصة الطماطم', 'Albóndigas in Tomato Sauce, Halal Beef', 'Albóndigas à la sauce tomate au bœuf halal', 'Albóndigas en salsa de tomate de ternera halal', 'Albóndigas in Tomatensoße mit Halal-Rind', 'meat_mains', 'dinner', 15, 8, 10, 'simmering'),
  empanada: profile('إمبانادا بالتونة والفلفل', 'Galician Tuna Empanada', 'Empanada galicienne au thon', 'Empanada gallega de atún', 'Galicische Thunfisch-Empanada', 'street_snacks', 'lunch', 11, 26, 10, 'baking'),
  patatas_bravas: profile('بطاطس برافاس بالصلصة الحارة', 'Patatas Bravas with Spicy Sauce', 'Patatas bravas à la sauce épicée', 'Patatas bravas con salsa picante', 'Patatas Bravas mit scharfer Soße', 'street_snacks', 'snack', 4, 26, 11, 'frying'),
  croquetas: profile('كروكيتاس بالدجاج', 'Chicken Croquetas, Halal', 'Croquetas au poulet halal', 'Croquetas de pollo halal', 'Hähnchen-Kroketten, halal', 'street_snacks', 'snack', 11, 18, 12, 'frying'),
  pan_tomate: profile('خبز بالطماطم وزيت الزيتون', 'Pan con Tomate, Tomato Bread', 'Pain à la tomate et à l’huile d’olive', 'Pan con tomate y aceite de oliva', 'Brot mit Tomate und Olivenöl', 'breakfast_items', 'breakfast', 4, 30, 8, 'assembling'),
  gambas_ajillo: profile('جمبري بالثوم وزيت الزيتون', 'Gambas al Ajillo, Garlic Shrimp', 'Gambas al ajillo à l’ail', 'Gambas al ajillo', 'Gambas al Ajillo mit Knoblauch', 'fish_seafood', 'dinner', 14, 2, 9, 'pan_frying'),
  bocadillo_calamares: profile('ساندويتش الحبار المقلي', 'Madrid Calamari Sandwich', 'Bocadillo de calamars frits', 'Bocadillo de calamares', 'Madrider Calamari-Sandwich', 'street_snacks', 'lunch', 13, 30, 10, 'frying'),
  bacalao_pilpil: profile('باكالاو بيل بيل بالثوم', 'Basque Cod Pil Pil with Garlic', 'Morue pil pil basque à l’ail', 'Bacalao al pil pil vasco', 'Baskischer Kabeljau Pil Pil', 'fish_seafood', 'dinner', 19, 3, 10, 'pan_frying'),
  marmitako: profile('مارميتاكو يخنة التونة والبطاطس', 'Marmitako Basque Tuna Stew', 'Marmitako basque au thon', 'Marmitako de bonito con patatas', 'Marmitako, baskischer Thunfischeintopf', 'soups_stews', 'dinner', 15, 12, 6, 'simmering'),
  pimientos_padron: profile('فلفل بادرون المقلي', 'Padrón Peppers with Sea Salt', 'Piments de Padrón au sel marin', 'Pimientos de Padrón con sal marina', 'Padrón-Paprika mit Meersalz', 'vegetable_mains', 'snack', 2, 6, 4, 'frying'),
  espinacas_garabanzos: profile('سبانخ بالحمص والكمون', 'Seville Spinach with Chickpeas', 'Épinards aux pois chiches de Séville', 'Espinacas con garbanzos de Sevilla', 'Spinat mit Kichererbsen aus Sevilla', 'vegetable_mains', 'lunch', 6, 14, 6, 'stewing'),
  berenjenas_miel: profile('باذنجان مقلي بالعسل', 'Fried Eggplant with Honey', 'Aubergines frites au miel', 'Berenjenas fritas con miel', 'Frittierte Auberginen mit Honig', 'vegetable_mains', 'snack', 2, 22, 8, 'frying'),
  huevos_rotos: profile('بيض مهشم مع البطاطس والفلفل', 'Huevos Rotos with Potatoes and Peppers', 'Huevos rotos aux pommes de terre et poivrons', 'Huevos rotos con patatas y pimientos', 'Huevos Rotos mit Kartoffeln und Paprika', 'breakfast_items', 'lunch', 10, 20, 13, 'frying'),
  ajo_blanco: profile('آخو بلانكو حساء اللوز البارد', 'Ajo Blanco Almond Cold Soup', 'Ajo blanco aux amandes', 'Ajo blanco de almendras', 'Ajo Blanco, kalte Mandelsuppe', 'soups_stews', 'lunch', 5, 12, 9, 'blending'),
  zarzuela: profile('يخنة المأكولات البحرية الكتالونية', 'Zarzuela Seafood Stew, No Wine', 'Zarzuela de fruits de mer, sans vin', 'Zarzuela de marisco, sin vino', 'Zarzuela, Meeresfrüchteeintopf, ohne Wein', 'soups_stews', 'dinner', 16, 6, 7, 'simmering'),
  escalivada: profile('إسكاليفادا الخضار المشوية', 'Escalivada Roasted Vegetables', 'Escalivada de légumes rôtis', 'Escalivada de verduras asadas', 'Escalivada, geröstetes Gemüse', 'vegetable_mains', 'lunch', 2, 11, 5, 'roasting'),
  fideua: profile('فيديوا بالمأكولات البحرية', 'Fideuà with Seafood', 'Fideuà aux fruits de mer', 'Fideuà de marisco', 'Fideuà mit Meeresfrüchten', 'noodle_dishes', 'dinner', 13, 24, 6, 'simmering'),
  arroz_negro: profile('أرز أسود بالحبار', 'Black Rice with Squid', 'Riz noir au calmar', 'Arroz negro con chipirones', 'Schwarzer Reis mit Tintenfisch', 'rice_dishes', 'dinner', 13, 23, 5, 'simmering'),
  caldo_gallego: profile('كالدو بالخضار الورقية والفاصولياء', 'Caldo Gallego with Greens and Beans, Halal', 'Caldo gallego aux légumes verts, version halal', 'Caldo gallego con grelos y alubias, versión halal', 'Caldo Gallego mit Gemüse und Bohnen, halal', 'soups_stews', 'lunch', 7, 15, 4, 'simmering'),
  tarta_santiago: profile('تارت سانتياغو باللوز', 'Tarta de Santiago Almond Cake', 'Tarte de Saint-Jacques aux amandes', 'Tarta de Santiago de almendras', 'Santiago-Mandelkuchen', 'rice_cakes_sweets', 'snack', 8, 44, 16, 'baking'),
  crema_catalana: profile('كريما كتالانية بالقرفة', 'Crema Catalana with Cinnamon', 'Crema catalana à la cannelle', 'Crema catalana con canela', 'Crema Catalana mit Zimt', 'rice_cakes_sweets', 'snack', 4, 22, 11, 'baking'),
  flan: profile('فلان بالكراميل', 'Caramel Flan', 'Flan au caramel', 'Flan de huevo con caramelo', 'Karamell-Flan', 'rice_cakes_sweets', 'snack', 5, 24, 7, 'baking'),
  leche_frita: profile('حليب مقلي بالقرفة', 'Leche Frita with Cinnamon', 'Lait frit à la cannelle', 'Leche frita con canela', 'Leche Frita mit Zimt', 'rice_cakes_sweets', 'snack', 5, 30, 12, 'frying'),
  torrijas: profile('توريخاس بالعسل والقرفة', 'Torrijas with Honey and Cinnamon', 'Torrijas au miel et à la cannelle', 'Torrijas con miel y canela', 'Torrijas mit Honig und Zimt', 'rice_cakes_sweets', 'snack', 6, 34, 10, 'frying'),
  ensaimada: profile('إنسايمادا بالزبدة', 'Ensaimada with Butter, Halal', 'Ensaimada au beurre halal', 'Ensaimada con mantequilla halal', 'Ensaimada mit Butter, halal', 'breakfast_items', 'breakfast', 6, 46, 14, 'baking'),
  migas: profile('ميغاس بالثوم والعنب', 'Migas with Garlic and Grapes, Halal', 'Migas à l’ail et aux raisins, version halal', 'Migas con ajo y uvas, versión halal', 'Migas mit Knoblauch und Trauben, halal', 'street_snacks', 'lunch', 6, 32, 9, 'pan_frying'),
  callos: profile('كالوس بالكرشة الحلال والحمص', 'Callos a la Madrileña with Halal Beef Tripe', 'Callos à la madrilène aux tripes de bœuf halal', 'Callos a la madrileña con callos de res halal', 'Callos a la Madrileña mit Halal-Rinderkutteln', 'meat_mains', 'dinner', 15, 6, 8, 'stewing'),
  rabo_toro: profile('ذيل الثور المطهو بالخضار', 'Rabo de Toro Oxtail Stew, No Wine', 'Rabo de toro aux légumes, sans vin', 'Rabo de toro con verduras, sin vino', 'Rabo de Toro mit Gemüse, ohne Wein', 'meat_mains', 'dinner', 22, 6, 12, 'braising'),
  merluza_vasca: profile('هيك بصلصة خضراء بالمحار', 'Merluza en Salsa Verde with Clams, No Wine', 'Merlu en sauce verte aux palourdes, sans vin', 'Merluza en salsa verde con almejas, sin vino', 'Merluza in grüner Soße mit Venusmuscheln, ohne Wein', 'fish_seafood', 'dinner', 18, 4, 8, 'simmering'),
  boquerones: profile('أنشوجة بالخل والبقدونس', 'Boquerones en Vinagre, Marinated Anchovies', 'Anchois marinés au vinaigre', 'Boquerones en vinagre', 'Boquerones en Vinagre, marinierte Sardellen', 'fish_seafood', 'snack', 14, 3, 8, 'marinating'),
  espetos: profile('سردين مشوي على الأسياخ', 'Espetos, Grilled Sardine Skewers', 'Espetos de sardines grillées', 'Espetos de sardinas', 'Espetos, gegrillte Sardinenspieße', 'fish_seafood', 'dinner', 19, 1, 10, 'grilling'),
  papas_arrugas: profile('بطاطس كنارية بصلصة الموجو الخضراء', 'Papas Arrugadas with Mojo Verde', 'Pommes de terre ridées au mojo vert', 'Papas arrugadas con mojo verde', 'Runzelkartoffeln mit Mojo Verde', 'vegetable_mains', 'lunch', 3, 21, 6, 'boiling'),
  gofio_miel: profile('غوفيو بالحليب والعسل', 'Canarian Gofio with Milk and Honey', 'Gofio canarien au lait et au miel', 'Gofio canario con leche y miel', 'Kanarischer Gofio mit Milch und Honig', 'breakfast_items', 'breakfast', 6, 30, 5, 'simmering'),
  tumbet: profile('تومبيت بالخضار المشوية', 'Tumbet Mallorcan Vegetable Bake', 'Tumbet majorquin aux légumes', 'Tumbet mallorquín de verduras', 'Tumbet, mallorquinischer Gemüseauflauf', 'vegetable_mains', 'dinner', 3, 14, 6, 'baking'),
  carrilleras: profile('خدود بقر مطهوة بالخضار', 'Braised Beef Cheeks with Vegetables, No Wine', 'Joues de bœuf braisées aux légumes, sans vin', 'Carrilleras de ternera con verduras, sin vino', 'Geschmorte Rinderbäckchen mit Gemüse, ohne Wein', 'meat_mains', 'dinner', 21, 5, 13, 'braising'),
  pollo_ajillo: profile('دجاج بالثوم والليمون', 'Pollo al Ajillo with Lemon, No Wine', 'Poulet à l’ail et au citron, sans vin', 'Pollo al ajillo con limón, sin vino', 'Knoblauchhähnchen mit Zitrone, ohne Wein', 'poultry_mains', 'dinner', 23, 3, 11, 'pan_frying'),
  queso_manchego: profile('جبن منتشيغو بمعجون السفرجل', 'Manchego Cheese with Membrillo', 'Fromage manchego au membrillo', 'Queso manchego con membrillo', 'Manchego mit Quittenpaste', 'street_snacks', 'snack', 18, 12, 22, 'assembling'),
};

export const EXPANSION_REGIONAL_RECIPES = {
  garlic_paprika_chicken: profile('دجاج بالثوم والبابريكا', 'Garlic Paprika Chicken', 'Poulet à l’ail et au paprika', 'Pollo al ajo y pimentón', 'Knoblauch-Paprika-Hähnchen', 'poultry_mains', 'dinner', 23, 2, 10, 'roasting'),
  paprika_potato: profile('بطاطس مطهوة بالبابريكا', 'Paprika Potatoes', 'Pommes de terre au paprika', 'Patatas al pimentón', 'Paprikakartoffeln', 'vegetable_mains', 'lunch', 3, 23, 6, 'stewing'),
  pepper_salad: profile('سلطة الفلفل المشوي', 'Roasted Pepper Salad', 'Salade de poivrons rôtis', 'Ensalada de pimientos asados', 'Gerösteter Paprikasalat', 'vegetable_mains', 'lunch', 2, 9, 5, 'tossing'),
  lentil_stew: profile('يخنة العدس بالخضار', 'Lentil and Vegetable Stew', 'Mijoté de lentilles et légumes', 'Estofado de lentejas con verduras', 'Linsen-Gemüse-Eintopf', 'soups_stews', 'dinner', 9, 21, 3, 'stewing'),
  lemon_almond_cake: profile('كعكة اللوز بالليمون', 'Lemon Almond Cake', 'Gâteau au citron et aux amandes', 'Pastel de limón y almendra', 'Zitronen-Mandelkuchen', 'rice_cakes_sweets', 'snack', 7, 41, 14, 'baking'),
  zucchini_garlic: profile('كوسة سوتيه بالثوم', 'Sautéed Zucchini with Garlic', 'Courgettes sautées à l’ail', 'Calabacín salteado con ajo', 'Zucchini mit Knoblauch sautiert', 'vegetable_mains', 'lunch', 2, 7, 5, 'pan_frying'),
};

export const EXPANSION_NATIONAL_RECIPES = {
  paella_verduras: profile('باييا بالخضار الموسمية', 'Vegetable Paella', 'Paella aux légumes de saison', 'Paella de verduras', 'Gemüsepaella', 'rice_dishes', 'dinner', 5, 24, 6, 'simmering'),
  arroz_pollo_campo: profile('أرز بالدجاج والخرشوف', 'Country Chicken Rice with Artichokes', 'Riz au poulet et aux artichauts', 'Arroz con pollo y alcachofas', 'Hähnchenreis mit Artischocken', 'rice_dishes', 'dinner', 13, 24, 6, 'simmering'),
  sopa_ajo: profile('حساء الثوم القشتالي بالبيض', 'Castilian Garlic Soup with Egg', 'Soupe à l’ail castillane à l’œuf', 'Sopa de ajo castellana con huevo', 'Kastilische Knoblauchsuppe mit Ei', 'soups_stews', 'lunch', 6, 14, 6, 'simmering'),
  sopa_pescado: profile('حساء السمك بالزعفران', 'Spanish Fish Soup with Saffron, No Wine', 'Soupe de poisson au safran, sans vin', 'Sopa de pescado con azafrán, sin vino', 'Fischsuppe mit Safran, ohne Wein', 'soups_stews', 'dinner', 13, 7, 5, 'simmering'),
  lentejas_verduras: profile('عدس بالخضار على الطريقة الإسبانية', 'Lentils with Vegetables, Halal', 'Lentilles aux légumes, version halal', 'Lentejas con verduras, versión halal', 'Linsen mit Gemüse, halal', 'soups_stews', 'lunch', 9, 20, 3, 'stewing'),
  alubias_tolosa: profile('فاصولياء تولوسا بلحم بقري حلال', 'Alubias de Tolosa with Halal Beef', 'Haricots de Tolosa au bœuf halal', 'Alubias de Tolosa con ternera halal', 'Tolosa-Bohnen mit Halal-Rind', 'soups_stews', 'dinner', 11, 18, 6, 'stewing'),
  pochas_navarra: profile('بوتشاس نافارا بالخضار', 'Pochas a la Navarra with Vegetables', 'Pochas à la navarraise aux légumes', 'Pochas a la navarra con verduras', 'Pochas a la Navarra mit Gemüse', 'soups_stews', 'dinner', 8, 18, 4, 'stewing'),
  esgarraet: profile('إسغاراييت بالفلفل والباكالاو', 'Esgarraet, Pepper and Cod Salad', 'Esgarraet aux poivrons et à la morue', 'Esgarraet con pimientos y bacalao', 'Esgarraet, Paprika-Kabeljau-Salat', 'vegetable_mains', 'lunch', 9, 7, 6, 'assembling'),
  esqueixada: profile('إسكيشادا سلطة الباكالاو والطماطم', 'Esqueixada Cod and Tomato Salad', 'Esqueixada à la morue et à la tomate', 'Esqueixada con bacalao y tomate', 'Esqueixada, Kabeljau-Tomaten-Salat', 'fish_seafood', 'lunch', 10, 6, 6, 'assembling'),
  calcots_romesco: profile('كالسوتس بصلصة الروميسكو', 'Calçots with Romesco Sauce', 'Calçots à la sauce romesco', 'Calçots con salsa romesco', 'Calçots mit Romesco-Soße', 'vegetable_mains', 'lunch', 3, 10, 8, 'grilling'),
  alcachofas_ajillo: profile('خرشوف بالثوم والبقدونس', 'Artichokes with Garlic and Parsley', 'Artichauts à l’ail et au persil', 'Alcachofas al ajillo con perejil', 'Artischocken mit Knoblauch und Petersilie', 'vegetable_mains', 'lunch', 3, 9, 5, 'pan_frying'),
  setas_plancha: profile('فطر مشوي بالثوم', 'Grilled Oyster Mushrooms with Garlic', 'Pleurotes grillés à l’ail', 'Setas a la plancha con ajo', 'Austernpilze vom Grill mit Knoblauch', 'vegetable_mains', 'lunch', 4, 5, 4, 'grilling'),
  patatas_pobre: profile('بطاطس فقيرة بالفلفل والبصل', 'Patatas a lo Pobre with Peppers', 'Patatas a lo pobre aux poivrons', 'Patatas a lo pobre con pimientos', 'Arme-Leute-Kartoffeln mit Paprika', 'vegetable_mains', 'lunch', 3, 22, 7, 'stewing'),
  piquillos_bacalao: profile('فلفل بيكيو محشو بالباكالاو', 'Piquillo Peppers Stuffed with Cod', 'Piments piquillo farcis à la morue', 'Pimientos de piquillo rellenos de bacalao', 'Piquillo-Paprika mit Kabeljau gefüllt', 'fish_seafood', 'dinner', 12, 8, 7, 'baking'),
  txuleta: profile('ضلع بقر مشوي حلال', 'Txuleta a la Parrilla, Halal Beef', 'Txuleta grillée au bœuf halal', 'Txuleta a la parrilla de ternera halal', 'Txuleta vom Grill, Halal-Rind', 'meat_mains', 'dinner', 26, 0, 16, 'grilling'),
  cordero_segovia: profile('حمل مشوي على الطريقة السيغوفية', 'Segovia Roast Lamb', 'Agneau rôti de Ségovie', 'Cordero asado de Segovia', 'Lammbraten aus Segovia', 'meat_mains', 'dinner', 24, 1, 14, 'roasting'),
  cordero_miel: profile('ضأن بالعسل واللوز', 'Lamb with Honey and Almonds', 'Agneau au miel et aux amandes', 'Cordero a la miel con almendras', 'Lamm mit Honig und Mandeln', 'meat_mains', 'dinner', 22, 12, 13, 'braising'),
  pollo_pepitoria: profile('دجاج بيبيتوريا باللوز والزعفران', 'Pollo en Pepitoria with Almond and Saffron', 'Poulet en pepitoria aux amandes et au safran', 'Pollo en pepitoria con almendra y azafrán', 'Hähnchen in Pepitoria mit Mandel und Safran', 'poultry_mains', 'dinner', 21, 6, 11, 'stewing'),
  estofado_ternera: profile('يخنة لحم بقري بالجزر', 'Spanish Beef Stew with Carrots, No Wine', 'Ragoût de bœuf aux carottes, sans vin', 'Estofado de ternera con zanahorias, sin vino', 'Rindereintopf mit Karotten, ohne Wein', 'meat_mains', 'dinner', 21, 8, 11, 'stewing'),
  albondigas_almendra: profile('ألبونديغاس بصلصة اللوز', 'Meatballs in Almond Sauce, Halal Beef', 'Boulettes à la sauce d’amandes au bœuf halal', 'Albóndigas en salsa de almendras de ternera halal', 'Fleischbällchen in Mandelsoße mit Halal-Rind', 'meat_mains', 'dinner', 16, 7, 12, 'simmering'),
  pinchitos: profile('أسياخ دجاج متبلة بينتشيتوس', 'Pinchitos Morunos, Spiced Chicken Skewers', 'Pinchitos morunos au poulet épicé', 'Pinchitos morunos de pollo', 'Pinchitos Morunos, gewürzte Hähnchenspieße', 'poultry_mains', 'dinner', 22, 3, 8, 'grilling'),
  pollo_chilindron: profile('دجاج تشيليندرون بالفلفل', 'Pollo al Chilindrón with Peppers', 'Poulet au chilindrón aux poivrons', 'Pollo al chilindrón con pimientos', 'Hähnchen Chilindrón mit Paprika', 'poultry_mains', 'dinner', 22, 7, 9, 'stewing'),
  ternasco: profile('تيرناسكو مشوي بالبطاطس', 'Ternasco Asado with Potatoes', 'Ternasco rôti aux pommes de terre', 'Ternasco asado con patatas', 'Ternasco-Braten mit Kartoffeln', 'meat_mains', 'dinner', 23, 10, 13, 'roasting'),
  bacalao_ajoarriero: profile('باكالاو آخوأرييرو بالفلفل', 'Bacalao Ajoarriero with Peppers', 'Morue ajoarriero aux poivrons', 'Bacalao ajoarriero con pimientos', 'Kabeljau Ajoarriero mit Paprika', 'fish_seafood', 'dinner', 19, 6, 9, 'stewing'),
  trucha_horno: profile('تروت مخبوز بالثوم', 'Baked Trout with Garlic', 'Truite au four à l’ail', 'Trucha al horno con ajo', 'Forelle aus dem Ofen mit Knoblauch', 'fish_seafood', 'dinner', 21, 2, 9, 'baking'),
  almejas_verde: profile('محار بالصلصة الخضراء', 'Clams in Green Sauce, No Wine', 'Palourdes en sauce verte, sans vin', 'Almejas en salsa verde, sin vino', 'Venusmuscheln in grüner Soße, ohne Wein', 'fish_seafood', 'dinner', 13, 5, 6, 'simmering'),
  mejillones_escabeche: profile('بلح البحر بالإسكابيتش', 'Mussels in Escabeche', 'Moules à l’escabèche', 'Mejillones en escabeche', 'Miesmuscheln in Escabeche', 'fish_seafood', 'snack', 12, 6, 7, 'marinating'),
  chipirones_tinta: profile('حبار صغير بالحبر', 'Chipirones en su Tinta', 'Petits calamars à l’encre', 'Chipirones en su tinta', 'Kleine Tintenfische in Tinte', 'fish_seafood', 'dinner', 15, 4, 6, 'simmering'),
  sepia_plancha: profile('سيبيا مشوية بالبقدونس', 'Grilled Cuttlefish with Parsley', 'Seiche grillée au persil', 'Sepia a la plancha con perejil', 'Sepia vom Grill mit Petersilie', 'fish_seafood', 'dinner', 17, 2, 5, 'grilling'),
  gambas_gabardina: profile('جمبري مقلي بالعجينة', 'Gambas en Gabardina, Battered Shrimp', 'Crevettes en gabardine', 'Gambas en gabardina', 'Garnelen im Teigmantel', 'fish_seafood', 'snack', 12, 14, 10, 'frying'),
  tortilla_espinacas: profile('تورتيلا بالسبانخ', 'Spinach Tortilla', 'Tortilla aux épinards', 'Tortilla de espinacas', 'Spinat-Tortilla', 'breakfast_items', 'breakfast', 8, 8, 9, 'pan_frying'),
  revuelto_setas: profile('بيض مخفوق بالفطر', 'Revuelto de Setas, Scrambled Eggs with Mushrooms', 'Œufs brouillés aux champignons', 'Revuelto de setas', 'Rührei mit Pilzen', 'breakfast_items', 'breakfast', 10, 3, 11, 'pan_frying'),
  huevos_flamenca: profile('بيض فلامنكو بالطماطم والخضار', 'Huevos a la Flamenca with Vegetables', 'Œufs à la flamenca aux légumes', 'Huevos a la flamenca con verduras', 'Eier a la Flamenca mit Gemüse', 'breakfast_items', 'breakfast', 9, 8, 10, 'baking'),
  ensaladilla_rusa: profile('إنسالاديا روسا بالتونة والبطاطس', 'Ensaladilla Rusa with Tuna', 'Salade russe au thon', 'Ensaladilla rusa con atún', 'Russischer Salat mit Thunfisch', 'vegetable_mains', 'lunch', 7, 14, 9, 'tossing'),
  ensalada_malaguena: profile('سلطة ملقا بالبرتقال والباكالاو', 'Málaga Salad with Orange and Cod', 'Salade de Málaga à l’orange et à la morue', 'Ensalada malagueña con naranja y bacalao', 'Málaga-Salat mit Orange und Kabeljau', 'vegetable_mains', 'lunch', 7, 9, 6, 'tossing'),
  pipirrana: profile('بيبيرانا سلطة الأندلس', 'Pipirrana Andalusian Salad', 'Pipirrana andalouse', 'Pipirrana andaluza', 'Pipirrana, andalusischer Salat', 'vegetable_mains', 'lunch', 2, 8, 5, 'tossing'),
  mollete_tomate: profile('خبز موليتي بالطماطم وزيت الزيتون', 'Mollete with Tomato and Olive Oil', 'Mollete à la tomate et à l’huile d’olive', 'Mollete con tomate y aceite de oliva', 'Mollete mit Tomate und Olivenöl', 'breakfast_items', 'breakfast', 5, 32, 9, 'assembling'),
  magdalenas: profile('ماغداليناس بالليمون', 'Lemon Magdalenas', 'Magdalenas au citron', 'Magdalenas de limón', 'Zitronen-Magdalenas', 'rice_cakes_sweets', 'breakfast', 6, 45, 13, 'baking'),
  rosquillas: profile('روسكياس بالقرفة', 'Rosquillas with Cinnamon', 'Rosquillas à la cannelle', 'Rosquillas con canela', 'Rosquillas mit Zimt', 'rice_cakes_sweets', 'snack', 6, 48, 12, 'frying'),
  pestinos: profile('بيستينيوس بالعسل', 'Pestiños with Honey', 'Pestiños au miel', 'Pestiños con miel', 'Pestiños mit Honig', 'rice_cakes_sweets', 'snack', 5, 44, 14, 'frying'),
  roscon: profile('روسكون دي رييس بزهر البرتقال', 'Roscón de Reyes with Orange Blossom', 'Roscón de Reyes à la fleur d’oranger', 'Roscón de Reyes con azahar', 'Roscón de Reyes mit Orangenblüte', 'rice_cakes_sweets', 'snack', 7, 50, 12, 'baking'),
  panellets: profile('بانييتس بالصنوبر', 'Panellets with Pine Nuts', 'Panellets aux pignons', 'Panellets con piñones', 'Panellets mit Pinienkernen', 'rice_cakes_sweets', 'snack', 8, 46, 18, 'baking'),
  turron: profile('تورون باللوز والعسل', 'Turrón de Alicante Almond Nougat', 'Turrón d’Alicante aux amandes', 'Turrón de Alicante', 'Turrón de Alicante, Mandelnougat', 'rice_cakes_sweets', 'snack', 9, 55, 20, 'confectioning'),
  mazapan: profile('مازابان طليطلة', 'Toledo Mazapán, Marzipan', 'Massepain de Tolède', 'Mazapán de Toledo', 'Toledo-Marzipan', 'rice_cakes_sweets', 'snack', 8, 58, 18, 'confectioning'),
  polvorones: profile('بولفورونيس باللوز والزبدة', 'Polvorones with Almond, Butter Version', 'Polvorones aux amandes au beurre', 'Polvorones de almendra con mantequilla', 'Polvorones mit Mandel und Butter', 'rice_cakes_sweets', 'snack', 6, 52, 20, 'baking'),
  natillas: profile('ناتياس بالقرفة', 'Natillas with Cinnamon', 'Natillas à la cannelle', 'Natillas con canela', 'Natillas mit Zimt', 'rice_cakes_sweets', 'snack', 4, 18, 7, 'simmering'),
  quesada: profile('كيسادا باسييغا بالزبادي', 'Quesada Pasiega, Cantabrian Cheesecake', 'Quesada pasiega de Cantabrie', 'Quesada pasiega de Cantabria', 'Quesada Pasiega, kantabrischer Käsekuchen', 'rice_cakes_sweets', 'snack', 8, 34, 12, 'baking'),
};

export function B(profileRow, region) {
  const token = REGION_DEMONYM[region];
  if (!token) throw new Error(`Unknown Spain region: ${region}`);
  const extra = REGION_DIASPORA[region];
  const national = region === 'pan_spanish';
  const descriptor = REGIONS.find(([id]) => id === region);
  return {
    id: '',
    nameAr: `${national ? '' : `${descriptor[1]} `}${profileRow.ar} ${token}`.trim(),
    nameEn: `${national ? 'Spanish ' : `${descriptor[2]} `}${profileRow.en}`,
    nameFr: `${national ? 'Cuisine espagnole : ' : `${descriptor[3]} `}${profileRow.fr}`,
    nameEs: `${national ? 'Cocina española: ' : `${descriptor[4]} `}${profileRow.es}`,
    nameDe: `${national ? 'Spanische Küche: ' : `${descriptor[5]} `}${profileRow.de}`,
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
      if (!recipes[key]) throw new Error(`Unknown Spain recipe profile: ${key}`);
      rows.push(B(recipes[key], region));
    }
  }
  for (const key of nationalKeys) {
    if (!recipes[key]) throw new Error(`Unknown Spain recipe profile: ${key}`);
    rows.push(B(recipes[key], 'pan_spanish'));
  }
  return rows;
}
