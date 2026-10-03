export const BASE_DIASPORA = ['italian', 'western', 'comfort_food'];
export const REGION_DIASPORA = { rome: 'roman', milan: 'milanese', sicily: 'sicilian' };

// Each anchor owns one stable Arabic token; no Italian row belongs in asian_shared.
export const REGION_DEMONYM = {
  pan_italian: 'إيطالي',
  rome: 'روماني',
  milan: 'ميلاني',
  naples: 'نابولي',
  sicily: 'صقلي',
  tuscany: 'توسكاني',
  venice: 'بندقي',
  florence: 'فلورنسي',
  bologna: 'بولوني',
  turin: 'توريني',
  genoa: 'جنوي',
  sardinia: 'سرديني',
  puglia: 'بوليزي',
};

const REGIONS = [
  ['pan_italian', 'مطابخ إيطاليا', 'Italian', 'italienne', 'italiana', 'italienische'],
  ['rome', 'مطابخ روما', 'Roman', 'À la romaine : ', 'Al estilo romano: ', 'Römische Art: '],
  ['milan', 'مطابخ ميلانو', 'Milanese', 'À la milanaise : ', 'Al estilo milanés: ', 'Mailänder Art: '],
  ['naples', 'مطابخ نابوليتانا', 'Neapolitan', 'À la napolitaine : ', 'Al estilo napolitano: ', 'Neapolitanische Art: '],
  ['sicily', 'مطابخ صقلية', 'Sicilian', 'À la sicilienne : ', 'Al estilo siciliano: ', 'Sizilianische Art: '],
  ['tuscany', 'مطابخ توسكانا', 'Tuscan', 'À la toscane : ', 'Al estilo toscano: ', 'Toskanische Art: '],
  ['venice', 'مطابخ البندقية', 'Venetian', 'À la vénitienne : ', 'Al estilo veneciano: ', 'Venezianische Art: '],
  ['florence', 'مطابخ فلورنسا', 'Florentine', 'À la florentine : ', 'Al estilo florentino: ', 'Florentiner Art: '],
  ['bologna', 'مطابخ بولونيا', 'Bolognese', 'À la bolognaise : ', 'Al estilo boloñés: ', 'Bologneser Art: '],
  ['turin', 'مطابخ تورينو', 'Turin', 'À la turinoise : ', 'Al estilo turinés: ', 'Turiner Art: '],
  ['genoa', 'مطابخ جنوة', 'Genoese', 'À la génoise : ', 'Al estilo genovés: ', 'Genueser Art: '],
  ['sardinia', 'مطابخ سردينيا', 'Sardinian', 'À la sarde : ', 'Al estilo sardo: ', 'Sardische Art: '],
  ['puglia', 'مطابخ بوليا', 'Apulian', 'À la pouillaise : ', 'Al estilo apulio: ', 'Apulische Art: '],
];

const profile = (ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking) =>
  ({ ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking });

export const BASE_REGIONAL_RECIPES = {
  roast_chicken: profile('دجاج مشوي بالأعشاب', 'Herb-Roasted Chicken', 'Poulet rôti aux herbes', 'Pollo asado a las hierbas', 'Kräuter-Brathähnchen', 'poultry_mains', 'dinner', 22, 2, 9, 'roasting'),
  tomato_pasta: profile('باستا بصلصة الطماطم الطازجة', 'Pasta with Fresh Tomato Sauce', 'Pâtes à la sauce tomate fraîche', 'Pasta con salsa de tomate fresco', 'Pasta mit frischer Tomatensoße', 'noodle_dishes', 'dinner', 7, 30, 4, 'simmering'),
  grilled_fish: profile('سمك مشوي بالليمون', 'Grilled Fish with Lemon', 'Poisson grillé au citron', 'Pescado a la parrilla con limón', 'Gegrillter Fisch mit Zitrone', 'fish_seafood', 'dinner', 21, 2, 8, 'grilling'),
  veg_soup: profile('حساء خضار الحديقة', 'Garden Vegetable Soup', 'Soupe aux légumes du jardin', 'Sopa de verduras de la huerta', 'Gartengemüsesuppe', 'soups_stews', 'lunch', 3, 12, 3, 'simmering'),
  butter_pasta: profile('معكرونة بالجبن والزبدة', 'Butter and Cheese Pasta', 'Pâtes au beurre et au fromage', 'Pasta con mantequilla y queso', 'Butter-Käse-Nudeln', 'noodle_dishes', 'lunch', 9, 29, 11, 'boiling'),
  bean_stew: profile('يخنة الفاصولياء البيضاء', 'White Bean Stew', 'Mijoté de haricots blancs', 'Estofado de alubias blancas', 'Weißer Bohneneintopf', 'soups_stews', 'dinner', 9, 23, 5, 'stewing'),
  tomato_salad: profile('سلطة الطماطم والبصل', 'Tomato and Onion Salad', 'Salade de tomates et d’oignons', 'Ensalada de tomate y cebolla', 'Tomaten-Zwiebel-Salat', 'vegetable_mains', 'lunch', 2, 8, 5, 'tossing'),
  lemon_potato: profile('بطاطس مشوية بالليمون', 'Lemon Roasted Potatoes', 'Pommes de terre rôties au citron', 'Patatas asadas al limón', 'Zitronen-Röstkartoffeln', 'vegetable_mains', 'dinner', 3, 24, 6, 'roasting'),
  almond_cake: profile('كعكة اللوز', 'Almond Cake', 'Gâteau aux amandes', 'Pastel de almendra', 'Mandelkuchen', 'rice_cakes_sweets', 'snack', 7, 40, 15, 'baking'),
};

export const BASE_NATIONAL_RECIPES = {
  pizza_margherita: profile('بيتزا مارغريتا بالطماطم والموزاريلا', 'Pizza Margherita with Tomato and Mozzarella', 'Pizza Margherita à la tomate et à la mozzarella', 'Pizza margarita con tomate y mozzarella', 'Pizza Margherita mit Tomate und Mozzarella', 'street_snacks', 'dinner', 11, 30, 9, 'baking'),
  carbonara: profile('سباغيتي كاربونارا ببيكون الديك الرومي', 'Spaghetti Carbonara with Turkey Bacon, Halal', 'Spaghetti carbonara au bacon de dinde halal', 'Espaguetis carbonara con panceta de pavo halal', 'Spaghetti Carbonara mit Puten-Bacon, halal', 'noodle_dishes', 'dinner', 15, 28, 13, 'simmering'),
  amatriciana: profile('بوكاتيني أماتريتشانا ببيكون بقري حلال', 'Bucatini all’Amatriciana with Halal Beef Bacon', 'Bucatini all’amatriciana au bacon de bœuf halal', 'Bucatini all’amatriciana con panceta de res halal', 'Bucatini all’Amatriciana mit Rinderbacon, halal', 'noodle_dishes', 'dinner', 13, 29, 11, 'simmering'),
  bolognese: profile('تالياتيلي بالراغو ولحم بقري حلال', 'Tagliatelle al Ragù with Halal Beef', 'Tagliatelle au ragù de bœuf halal', 'Tallarines al ragú de ternera halal', 'Tagliatelle al Ragù mit Halal-Rind', 'noodle_dishes', 'dinner', 14, 27, 10, 'slow_cooking'),
  lasagna: profile('لازانيا براغو لحم بقري حلال', 'Lasagna with Halal Beef Ragù', 'Lasagnes au ragù de bœuf halal', 'Lasaña con ragú de ternera halal', 'Lasagne mit Halal-Rindfleischragout', 'noodle_dishes', 'dinner', 13, 22, 11, 'baking'),
  ossobuco: profile('أوسوبوكو ميلانيز بالغريمولاتا', 'Ossobuco alla Milanese with Gremolata, No Wine', 'Ossobuco à la milanaise au gremolata, sans vin', 'Ossobuco a la milanesa con gremolata, sin vino', 'Ossobuco alla Milanese mit Gremolata, ohne Wein', 'meat_mains', 'dinner', 24, 3, 12, 'braising'),
  risotto_milanese: profile('ريزوتو ميلانيز بالزعفران', 'Risotto alla Milanese with Saffron', 'Risotto à la milanaise au safran', 'Risotto a la milanesa con azafrán', 'Mailänder Risotto mit Safran', 'rice_dishes', 'dinner', 7, 27, 9, 'simmering'),
  tiramisu: profile('تيراميسو بالقهوة والماسكاربوني', 'Tiramisù with Coffee, No Marsala', 'Tiramisù au café, sans marsala', 'Tiramisú con café, sin marsala', 'Tiramisu mit Kaffee, ohne Marsala', 'rice_cakes_sweets', 'snack', 5, 30, 16, 'chilling'),
  gelato: profile('جيلاتو الفانيليا', 'Vanilla Gelato', 'Glace à la vanille', 'Helado de vainilla', 'Vanilleeis', 'rice_cakes_sweets', 'snack', 4, 24, 8, 'churning'),
  focaccia: profile('فوكاتشا جنوة بزيت الزيتون', 'Focaccia Genovese with Olive Oil', 'Focaccia génoise à l’huile d’olive', 'Focaccia genovesa con aceite de oliva', 'Focaccia Genovese mit Olivenöl', 'breakfast_items', 'breakfast', 8, 42, 11, 'baking'),
  bruschetta: profile('بروسكيتا بالطماطم والريحان', 'Tomato Basil Bruschetta', 'Bruschetta à la tomate et au basilic', 'Bruschetta con tomate y albahaca', 'Bruschetta mit Tomate und Basilikum', 'street_snacks', 'snack', 5, 28, 6, 'toasting'),
  caprese: profile('سلطة كابريزي', 'Caprese Salad with Mozzarella', 'Salade caprese à la mozzarella', 'Ensalada caprese con mozzarella', 'Caprese-Salat mit Mozzarella', 'vegetable_mains', 'lunch', 12, 4, 15, 'assembling'),
  minestrone: profile('حساء مينيستروني بالخضار', 'Minestrone Vegetable Soup', 'Soupe minestrone aux légumes', 'Sopa minestrone de verduras', 'Minestrone-Gemüsesuppe', 'soups_stews', 'lunch', 4, 14, 3, 'simmering'),
  pesto: profile('تروفي بالبيستو الجنوي', 'Trofie al Pesto Genovese', 'Trofie au pesto génois', 'Trofie al pesto genovés', 'Trofie mit Genueser Pesto', 'noodle_dishes', 'dinner', 9, 31, 13, 'boiling'),
  pizza_marinara: profile('بيتزا مارينارا بالثوم', 'Pizza Marinara with Garlic and Oregano', 'Pizza marinara à l’ail et à l’origan', 'Pizza marinara con ajo y orégano', 'Pizza Marinara mit Knoblauch und Oregano', 'street_snacks', 'dinner', 8, 32, 7, 'baking'),
  spaghetti_vongole: profile('سباغيتي بالمحار', 'Spaghetti alle Vongole with Clams', 'Spaghetti alle vongole aux palourdes', 'Espaguetis alle vongole con almejas', 'Spaghetti alle Vongole mit Venusmuscheln', 'noodle_dishes', 'dinner', 12, 30, 6, 'simmering'),
  penne_arrabbiata: profile('بيني أرابياتا بالفلفل الحار', 'Penne all’Arrabbiata with Chili', 'Penne all’arrabbiata au piment', 'Penne all’arrabbiata con guindilla', 'Penne all’Arrabbiata mit Peperoncino', 'noodle_dishes', 'dinner', 8, 31, 5, 'simmering'),
  gnocchi: profile('نيوكي البطاطس بالطماطم والريحان', 'Potato Gnocchi with Tomato and Basil', 'Gnocchi de pommes de terre à la tomate', 'Ñoquis de patata con tomate y albahaca', 'Kartoffelgnocchi mit Tomate und Basilikum', 'noodle_dishes', 'dinner', 6, 33, 4, 'boiling'),
  ravioli: profile('رافيولي بالسبانخ والريكوتا', 'Spinach Ricotta Ravioli', 'Ravioli aux épinards et à la ricotta', 'Ravioli de espinacas y ricotta', 'Spinat-Ricotta-Ravioli', 'noodle_dishes', 'dinner', 10, 28, 9, 'boiling'),
  risotto_funghi: profile('ريزوتو بالفطر', 'Mushroom Risotto', 'Risotto aux champignons', 'Risotto con champiñones', 'Pilzrisotto', 'rice_dishes', 'dinner', 7, 26, 9, 'simmering'),
  parmigiana: profile('بارميجيانا الباذنجان', 'Eggplant Parmigiana', 'Parmigiana d’aubergines', 'Parmigiana de berenjena', 'Auberginen-Parmigiana', 'vegetable_mains', 'dinner', 8, 12, 11, 'baking'),
  polenta: profile('بولنتا بالزبدة والجبن', 'Creamy Polenta with Butter and Cheese', 'Polenta crémeuse au beurre et au fromage', 'Polenta cremosa con mantequilla y queso', 'Cremige Polenta mit Butter und Käse', 'vegetable_mains', 'dinner', 6, 22, 8, 'simmering'),
  arancini: profile('أرانشيني بالراغو والبازلاء', 'Sicilian Arancini with Beef Ragù', 'Arancini siciliens au ragù de bœuf', 'Arancini sicilianos con ragú de ternera', 'Sizilianische Arancini mit Rinderragù', 'street_snacks', 'snack', 10, 26, 10, 'frying'),
  caponata: profile('كابوناتا الباذنجان', 'Sicilian Caponata with Eggplant', 'Caponata sicilienne aux aubergines', 'Caponata siciliana con berenjena', 'Sizilianische Caponata mit Auberginen', 'vegetable_mains', 'lunch', 2, 12, 7, 'stewing'),
  pasta_norma: profile('باستا نورما بالباذنجان والريكوتا', 'Pasta alla Norma with Eggplant', 'Pâtes alla norma aux aubergines', 'Pasta alla norma con berenjena', 'Pasta alla Norma mit Auberginen', 'noodle_dishes', 'dinner', 8, 30, 8, 'simmering'),
  frittata: profile('فريتاتا بالأعشاب', 'Italian Herb Frittata', 'Frittata aux herbes', 'Frittata con hierbas', 'Kräuter-Frittata', 'breakfast_items', 'breakfast', 11, 3, 12, 'pan_frying'),
  panzanella: profile('بانزانيلا سلطة الخبز والطماطم', 'Tuscan Panzanella Bread Salad', 'Panzanella toscane au pain et à la tomate', 'Panzanella toscana con pan y tomate', 'Toskanischer Panzanella-Brotsalat', 'vegetable_mains', 'lunch', 5, 22, 7, 'tossing'),
  ribollita: profile('ريبوليتا حساء الفاصوليا واللفت', 'Tuscan Ribollita Bean and Kale Soup', 'Ribollita toscane aux haricots', 'Ribollita toscana con alubias', 'Toskanische Ribollita mit Bohnen', 'soups_stews', 'lunch', 6, 18, 5, 'simmering'),
  pappa_pomodoro: profile('بابا بالبومودورو', 'Pappa al Pomodoro', 'Pappa al pomodoro', 'Pappa al pomodoro', 'Pappa al Pomodoro', 'soups_stews', 'lunch', 4, 17, 6, 'simmering'),
  cannoli: profile('كانولي بالريكوتا', 'Sicilian Cannoli with Ricotta', 'Cannoli siciliens à la ricotta', 'Cannoli sicilianos con ricotta', 'Sizilianische Cannoli mit Ricotta', 'rice_cakes_sweets', 'snack', 8, 42, 16, 'frying'),
  panna_cotta: profile('بانا كوتا بالفانيليا', 'Vanilla Panna Cotta', 'Panna cotta à la vanille', 'Panna cotta de vainilla', 'Panna Cotta mit Vanille', 'rice_cakes_sweets', 'snack', 3, 20, 12, 'chilling'),
  fritto_misto: profile('مأكولات بحرية مقلية مشكلة', 'Fritto Misto di Mare', 'Fritto misto di mare', 'Fritto misto di mare', 'Fritto misto di mare', 'fish_seafood', 'dinner', 16, 12, 11, 'frying'),
  panettone: profile('بانيتوني بالزبيب والبرتقال', 'Panettone with Raisins and Candied Orange', 'Panettone aux raisins secs et à l’orange confite', 'Panettone con pasas y naranja confitada', 'Panettone mit Rosinen und kandierter Orange', 'rice_cakes_sweets', 'snack', 7, 55, 10, 'baking'),
};

export const EXPANSION_REGIONAL_RECIPES = {
  garlic_chicken: profile('دجاج بالثوم وإكليل الجبل', 'Garlic Rosemary Chicken', 'Poulet à l’ail et au romarin', 'Pollo al ajo y romero', 'Knoblauch-Rosmarin-Hähnchen', 'poultry_mains', 'dinner', 23, 2, 10, 'roasting'),
  mushroom_pasta: profile('باستا بالفطر والبقدونس', 'Mushroom Parsley Pasta', 'Pâtes aux champignons et au persil', 'Pasta con champiñones y perejil', 'Pilz-Petersilien-Pasta', 'noodle_dishes', 'dinner', 8, 29, 7, 'simmering'),
  herb_fish: profile('سمك مخبوز بالأعشاب', 'Herb-Baked Fish', 'Poisson au four aux herbes', 'Pescado al horno con hierbas', 'Kräuter-Ofenfisch', 'fish_seafood', 'dinner', 20, 3, 7, 'baking'),
  zucchini_soup: profile('حساء الكوسة بالريحان', 'Zucchini Basil Soup', 'Soupe de courgettes au basilic', 'Sopa de calabacín con albahaca', 'Zucchini-Basilikum-Suppe', 'soups_stews', 'lunch', 3, 11, 4, 'simmering'),
  rosemary_beef: profile('لحم بقري بإكليل الجبل', 'Rosemary Beef', 'Bœuf au romarin', 'Ternera al romero', 'Rosmarin-Rindfleisch', 'meat_mains', 'dinner', 23, 3, 12, 'braising'),
  spinach_gratin: profile('غراتان السبانخ بالريكوتا', 'Spinach Ricotta Gratin', 'Gratin d’épinards à la ricotta', 'Gratén de espinacas con ricotta', 'Spinat-Ricotta-Gratin', 'vegetable_mains', 'dinner', 10, 8, 12, 'baking'),
  chickpea_soup: profile('حساء الحمص بإكليل الجبل', 'Chickpea Rosemary Soup', 'Soupe de pois chiches au romarin', 'Sopa de garbanzos al romero', 'Kichererbsen-Rosmarin-Suppe', 'soups_stews', 'lunch', 7, 19, 5, 'simmering'),
  apple_tart: profile('تارت التفاح باللوز', 'Apple Almond Tart', 'Tarte aux pommes et aux amandes', 'Tarta de manzana y almendra', 'Apfel-Mandel-Tarte', 'rice_cakes_sweets', 'snack', 5, 39, 14, 'baking'),
  rice_salad: profile('سلطة الأرز بالخضار', 'Rice Salad with Vegetables', 'Salade de riz aux légumes', 'Ensalada de arroz con verduras', 'Reissalat mit Gemüse', 'rice_dishes', 'lunch', 5, 26, 6, 'tossing'),
};

export const EXPANSION_NATIONAL_RECIPES = {
  pizza_quattro_formaggi: profile('بيتزا بالأجبان الأربعة', 'Quattro Formaggi Pizza', 'Pizza aux quatre fromages', 'Pizza cuatro quesos', 'Pizza Quattro Formaggi', 'street_snacks', 'dinner', 13, 29, 14, 'baking'),
  pizza_napoli: profile('بيتزا بالأنشوجة والكبر', 'Pizza Napoli with Anchovies and Capers', 'Pizza Napoli aux anchois et aux câpres', 'Pizza Napoli con anchoas y alcaparras', 'Pizza Napoli mit Sardellen und Kapern', 'street_snacks', 'dinner', 11, 30, 9, 'baking'),
  spaghetti_aglio_olio: profile('سباغيتي بالثوم وزيت الزيتون', 'Spaghetti Aglio e Olio', 'Spaghetti aglio e olio', 'Espaguetis aglio e olio', 'Spaghetti Aglio e Olio', 'noodle_dishes', 'dinner', 8, 31, 9, 'pan_frying'),
  pesto_trapanese: profile('بوسياتي ببيستو الطماطم واللوز', 'Busiate al Pesto Trapanese', 'Busiate au pesto trapanese', 'Busiate al pesto trapanés', 'Busiate mit Pesto Trapanese', 'noodle_dishes', 'dinner', 9, 30, 12, 'boiling'),
  cacio_pepe: profile('سباغيتي بالجبن والفلفل الأسود', 'Spaghetti Cacio e Pepe', 'Spaghetti cacio e pepe', 'Espaguetis cacio e pepe', 'Spaghetti Cacio e Pepe', 'noodle_dishes', 'dinner', 12, 30, 10, 'simmering'),
  pasta_e_ceci: profile('باستا بالحمص وإكليل الجبل', 'Pasta e Ceci with Rosemary', 'Pasta e ceci au romarin', 'Pasta e ceci con romero', 'Pasta e Ceci mit Rosmarin', 'noodle_dishes', 'dinner', 8, 28, 7, 'simmering'),
  pasta_e_fagioli: profile('باستا بالفاصولياء', 'Pasta e Fagioli', 'Pasta e fagioli', 'Pasta e fagioli', 'Pasta e Fagioli', 'noodle_dishes', 'dinner', 9, 29, 6, 'simmering'),
  tortellini_brodo: profile('تورتيليني بالجبن في مرق الدجاج', 'Cheese Tortellini in Chicken Broth', 'Tortellini au fromage en bouillon de poulet', 'Tortellini de queso en caldo de pollo', 'Käsetortellini in Hühnerbrühe', 'soups_stews', 'dinner', 11, 22, 8, 'simmering'),
  orecchiette: profile('أوريكيتي بأوراق البروكلي', 'Orecchiette with Broccoli Rabe', 'Orecchiette aux cime di rapa', 'Orecchiette con brócoli rabe', 'Orecchiette mit Stängelkohl', 'noodle_dishes', 'dinner', 9, 31, 7, 'boiling'),
  bigoli: profile('بيغولي براغو البط', 'Bigoli with Duck Ragù, No Wine', 'Bigoli au ragù de canard, sans vin', 'Bigoli con ragú de pato, sin vino', 'Bigoli mit Entenragù, ohne Wein', 'noodle_dishes', 'dinner', 13, 28, 11, 'slow_cooking'),
  risotto_pesce: profile('ريزوتو بالمأكولات البحرية', 'Seafood Risotto', 'Risotto aux fruits de mer', 'Risotto con marisco', 'Meeresfrüchte-Risotto', 'rice_dishes', 'dinner', 11, 26, 8, 'simmering'),
  risi_bisi: profile('ريزي وبيزي بالبازلاء', 'Risi e Bisi with Peas', 'Risi e bisi aux petits pois', 'Risi e bisi con guisantes', 'Risi e Bisi mit Erbsen', 'rice_dishes', 'dinner', 8, 27, 7, 'simmering'),
  pollo_cacciatora: profile('دجاج كاتشياتورا بالطماطم', 'Chicken Cacciatore, No Wine', 'Poulet cacciatore aux tomates, sans vin', 'Pollo a la cacciatora con tomate, sin vino', 'Hähnchen Cacciatore mit Tomaten, ohne Wein', 'poultry_mains', 'dinner', 22, 7, 10, 'braising'),
  vitello_tonnato: profile('فيتيلو توناتو بصلصة التونة', 'Vitello Tonnato, Halal Veal, No Wine', 'Vitello tonnato au thon, sans vin', 'Vitello tonnato con atún, sin vino', 'Vitello Tonnato mit Thunfisch, ohne Wein', 'meat_mains', 'lunch', 19, 3, 11, 'poaching'),
  branzino: profile('قاروص مشوي بالأعشاب', 'Branzino al Forno with Herbs', 'Bar rôti aux herbes', 'Lubina al horno con hierbas', 'Wolfsbarsch aus dem Ofen', 'fish_seafood', 'dinner', 22, 2, 9, 'baking'),
  calamari: profile('حبار مقلي بالليمون', 'Fried Calamari with Lemon', 'Calamars frits au citron', 'Calamares fritos con limón', 'Frittierte Calamari mit Zitrone', 'fish_seafood', 'snack', 15, 12, 10, 'frying'),
  baccala: profile('باكالا بالحليب والبولنتا', 'Baccalà alla Vicentina with Milk', 'Baccalà à la vicentina au lait', 'Bacalao a la vicentina con leche', 'Baccalà alla Vicentina mit Milch', 'fish_seafood', 'dinner', 20, 4, 10, 'slow_cooking'),
  sarde_beccafico: profile('سردين محشو بالزبيب والصنوبر', 'Sarde a Beccafico with Pine Nuts', 'Sardes a beccafico aux pignons', 'Sardinas a beccafico con piñones', 'Sarde a Beccafico mit Pinienkernen', 'fish_seafood', 'dinner', 18, 8, 11, 'baking'),
  involtini: profile('إنفولتيني لحم بقري بالجبن', 'Beef Involtini with Cheese', 'Involtini de bœuf au fromage', 'Involtini de ternera con queso', 'Rinderinvoltini mit Käse', 'meat_mains', 'dinner', 21, 4, 13, 'braising'),
  cotoletta: profile('كوتوليتا ميلانيز بالعجل', 'Cotoletta alla Milanese, Halal Veal', 'Cotoletta à la milanaise au veau halal', 'Cotoletta a la milanesa de ternera halal', 'Cotoletta alla Milanese mit Halal-Kalb', 'meat_mains', 'dinner', 24, 12, 14, 'frying'),
  pollo_parmigiana: profile('دجاج بارميجيانا بالموزاريلا', 'Chicken Parmigiana', 'Poulet parmigiana à la mozzarella', 'Pollo a la parmigiana con mozzarella', 'Hähnchen Parmigiana mit Mozzarella', 'poultry_mains', 'dinner', 23, 10, 13, 'baking'),
  peperonata: profile('بيبروناتا الفلفل المطهو', 'Peperonata Stewed Peppers', 'Peperonata aux poivrons', 'Peperonata con pimientos', 'Peperonata, geschmorte Paprika', 'vegetable_mains', 'dinner', 2, 12, 7, 'stewing'),
  fagioli_tonno: profile('سلطة الفاصولياء والتونة', 'Tuscan Bean and Tuna Salad', 'Salade de haricots au thon', 'Ensalada de alubias con atún', 'Bohnen-Thunfisch-Salat', 'vegetable_mains', 'lunch', 13, 14, 8, 'tossing'),
  farinata: profile('فاريناتا الحمص بزيت الزيتون', 'Ligurian Farinata Chickpea Flatbread', 'Farinata ligure à l’huile d’olive', 'Farinata ligur con aceite de oliva', 'Ligurische Farinata mit Olivenöl', 'street_snacks', 'snack', 7, 28, 9, 'baking'),
  piadina: profile('بيادينا بالجبن والجرجير', 'Piadina with Cheese and Arugula', 'Piadina au fromage et à la roquette', 'Piadina con queso y rúcula', 'Piadina mit Käse und Rucola', 'street_snacks', 'lunch', 10, 30, 10, 'pan_frying'),
  suppli: profile('سوبلي بالموزاريلا', 'Roman Supplì with Mozzarella', 'Supplì romains à la mozzarella', 'Supplì romanos con mozzarella', 'Römische Supplì mit Mozzarella', 'street_snacks', 'snack', 9, 25, 11, 'frying'),
  polpette: profile('كفتة بقري حلال بصلصة الطماطم', 'Polpette al Sugo, Halal Beef Meatballs', 'Polpette al sugo au bœuf halal', 'Polpette al sugo de ternera halal', 'Polpette al Sugo mit Halal-Rind', 'meat_mains', 'dinner', 17, 7, 11, 'simmering'),
  bistecca: profile('بيستيكا فيورنتينا بلحم بقري حلال', 'Bistecca alla Fiorentina, Halal Beef', 'Bistecca alla fiorentina au bœuf halal', 'Bistecca alla fiorentina de ternera halal', 'Bistecca alla Fiorentina mit Halal-Rind', 'meat_mains', 'dinner', 26, 0, 16, 'grilling'),
  cassata: profile('كساتا بالريكوتا والفواكه المسكرة', 'Sicilian Cassata Cake', 'Cassata sicilienne à la ricotta', 'Cassata siciliana con ricotta', 'Sizilianische Cassata mit Ricotta', 'rice_cakes_sweets', 'snack', 6, 52, 14, 'baking'),
  sfogliatella: profile('سفولياتيلا بالريكوتا والبرتقال', 'Neapolitan Sfogliatella', 'Sfogliatella napolitaine à la ricotta', 'Sfogliatella napolitana con ricotta', 'Neapolitanische Sfogliatella', 'rice_cakes_sweets', 'snack', 6, 40, 15, 'baking'),
  biscotti: profile('بسكويت اللوز كانتوتشي', 'Cantucci Almond Biscotti', 'Cantucci aux amandes', 'Cantucci de almendra', 'Cantuccini-Mandelgebäck', 'rice_cakes_sweets', 'snack', 8, 62, 14, 'baking'),
  granita: profile('غرانيتا الليمون', 'Sicilian Lemon Granita', 'Granita sicilienne au citron', 'Granita siciliana de limón', 'Sizilianische Zitronengranita', 'beverages', 'snack', 0, 24, 0, 'freezing'),
  zeppole: profile('زيبولي بالكاسترد', 'Zeppole di San Giuseppe with Custard', 'Zeppole à la crème pâtissière', 'Zeppole con crema pastelera', 'Zeppole mit Vanillecreme', 'rice_cakes_sweets', 'snack', 5, 38, 14, 'frying'),
};

export function B(profileRow, region) {
  const token = REGION_DEMONYM[region];
  if (!token) throw new Error(`Unknown Italy region: ${region}`);
  const extra = REGION_DIASPORA[region];
  const national = region === 'pan_italian';
  const descriptor = REGIONS.find(([id]) => id === region);
  return {
    id: '',
    nameAr: `${national ? '' : `${descriptor[1]} `}${profileRow.ar} ${token}`.trim(),
    nameEn: `${national ? 'Italian ' : `${descriptor[2]} `}${profileRow.en}`,
    nameFr: `${national ? 'Cuisine italienne : ' : `${descriptor[3]} `}${profileRow.fr}`,
    nameEs: `${national ? 'Cocina italiana: ' : `${descriptor[4]} `}${profileRow.es}`,
    nameDe: `${national ? 'Italienische Küche: ' : `${descriptor[5]} `}${profileRow.de}`,
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
      if (!recipes[key]) throw new Error(`Unknown Italy recipe profile: ${key}`);
      rows.push(B(recipes[key], region));
    }
  }
  for (const key of nationalKeys) {
    if (!recipes[key]) throw new Error(`Unknown Italy recipe profile: ${key}`);
    rows.push(B(recipes[key], 'pan_italian'));
  }
  return rows;
}
