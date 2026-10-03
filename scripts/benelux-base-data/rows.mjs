export const BASE_DIASPORA = ['benelux', 'western', 'comfort_food'];
export const REGION_DIASPORA = { brussels: 'belgian', amsterdam: 'dutch', luxembourg_city: 'luxembourgish' };

// Each anchor owns one stable Arabic token; no Benelux row belongs in asian_shared.
export const REGION_DEMONYM = {
  pan_benelux: 'بنيلوكسي',
  brussels: 'بروكسلي',
  flanders: 'فلمنكي',
  wallonia: 'والوني',
  antwerp: 'أنتويربي',
  amsterdam: 'أمستردامي',
  rotterdam: 'روتردامي',
  hague: 'لاهايي',
  utrecht: 'أوتريختي',
  holland_north: 'هولندي_شمالي',
  luxembourg_city: 'لوكسمبورغي',
  luxembourg_south: 'لوكسمبورغي_جنوبي',
  ardennes: 'أرديني',
};

const REGIONS = [
  ['pan_benelux', 'مطابخ البنيلوكس', 'Benelux', 'benelux', 'benelux', 'Benelux'],
  ['brussels', 'مطابخ بروكسل', 'Brussels', 'À la bruxelloise : ', 'Al estilo de Bruselas: ', 'Brüsseler Art: '],
  ['flanders', 'مطابخ فلاندرز', 'Flemish', 'À la flamande : ', 'Al estilo flamenco: ', 'Flämische Art: '],
  ['wallonia', 'مطابخ والونيا', 'Walloon', 'À la wallonne : ', 'Al estilo valón: ', 'Wallonische Art: '],
  ['antwerp', 'مطابخ أنتويرب', 'Antwerp', 'À l’anversoise : ', 'Al estilo de Amberes: ', 'Antwerpener Art: '],
  ['amsterdam', 'مطابخ أمستردام', 'Amsterdam', 'À l’amstellodamoise : ', 'Al estilo de Ámsterdam: ', 'Amsterdamer Art: '],
  ['rotterdam', 'مطابخ روتردام', 'Rotterdam', 'À la rotterdamoise : ', 'Al estilo de Róterdam: ', 'Rotterdamer Art: '],
  ['hague', 'مطابخ لاهاي', 'Hague', 'À la haguenoise : ', 'Al estilo de La Haya: ', 'Haager Art: '],
  ['utrecht', 'مطابخ أوتريخت', 'Utrecht', 'À l’utrechtoise : ', 'Al estilo de Utrecht: ', 'Utrechter Art: '],
  ['holland_north', 'مطابخ هولندا الشمالية', 'North Holland', 'À la nord-hollandaise : ', 'Al estilo de Holanda Septentrional: ', 'Nordholländische Art: '],
  ['luxembourg_city', 'مطابخ مدينة لوكسمبورغ', 'Luxembourg City', 'À la luxembourgeoise : ', 'Al estilo de la Ciudad de Luxemburgo: ', 'Luxemburger Art: '],
  ['luxembourg_south', 'مطابخ جنوب لوكسمبورغ', 'South Luxembourg', 'À la sud-luxembourgeoise : ', 'Al estilo del sur de Luxemburgo: ', 'Südluxemburger Art: '],
  ['ardennes', 'مطابخ الأردين', 'Ardennes', 'À l’ardennaise : ', 'Al estilo de las Ardenas: ', 'Ardennen-Art: '],
];

const profile = (ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking) =>
  ({ ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking });

export const BASE_REGIONAL_RECIPES = {
  herb_chicken: profile('دجاج مشوي بالأعشاب', 'Herb-Roasted Chicken', 'Poulet rôti aux herbes', 'Pollo asado a las hierbas', 'Kräuter-Brathähnchen', 'poultry_mains', 'dinner', 22, 2, 9, 'roasting'),
  potato_mash: profile('هريس الخضار الجذرية', 'Root Vegetable Mash', 'Purée de légumes racines', 'Puré de hortalizas de raíz', 'Wurzelgemüse-Stampf', 'vegetable_mains', 'dinner', 3, 21, 4, 'boiling'),
  fish_herb: profile('سمك مقلي بالأعشاب', 'Pan-Fried Fish with Herbs', 'Poisson poêlé aux herbes', 'Pescado a la plancha con hierbas', 'Kräuter-Bratfisch', 'fish_seafood', 'dinner', 20, 3, 8, 'pan_frying'),
  pear_cake: profile('كعكة الكمثرى بالزبدة', 'Pear Butter Cake', 'Gâteau aux poires et au beurre', 'Pastel de pera y mantequilla', 'Birnen-Butterkuchen', 'rice_cakes_sweets', 'snack', 5, 40, 13, 'baking'),
  beef_onion: profile('لحم بقري مطهو بالبصل', 'Braised Beef with Onions', 'Bœuf braisé aux oignons', 'Ternera braseada con cebolla', 'Rindfleisch mit Zwiebeln geschmort', 'meat_mains', 'dinner', 22, 6, 12, 'braising'),
  vegetable_soup: profile('حساء خضار الحديقة', 'Garden Vegetable Soup', 'Soupe aux légumes du jardin', 'Sopa de verduras de la huerta', 'Gartengemüsesuppe', 'soups_stews', 'lunch', 3, 12, 3, 'simmering'),
  cheese_tart: profile('تارت الجبن والبصل', 'Cheese and Onion Tart', 'Tarte au fromage et aux oignons', 'Tarta de queso y cebolla', 'Käse-Zwiebel-Tarte', 'street_snacks', 'lunch', 11, 26, 14, 'baking'),
  bean_stew: profile('يخنة الفاصولياء البيضاء', 'White Bean Herb Stew', 'Mijoté de haricots blancs aux herbes', 'Estofado de alubias blancas', 'Weiße-Bohnen-Eintopf', 'soups_stews', 'dinner', 9, 24, 5, 'stewing'),
  trout_almond: profile('سمك التروت باللوز', 'Trout with Almond Butter', 'Truite au beurre d’amandes', 'Trucha con mantequilla de almendra', 'Forelle mit Mandelbutter', 'fish_seafood', 'dinner', 21, 4, 12, 'pan_frying'),
  rice_pudding: profile('أرز بالحليب المخبوز', 'Baked Rice Pudding', 'Riz au lait cuit au four', 'Arroz con leche al horno', 'Gebackener Milchreis', 'rice_cakes_sweets', 'snack', 5, 33, 6, 'baking'),
  potato_gratin: profile('غراتان البطاطس بالكريمة', 'Creamy Potato Gratin', 'Gratin de pommes de terre à la crème', 'Gratén de patata con nata', 'Kartoffelgratin mit Sahne', 'vegetable_mains', 'dinner', 6, 24, 12, 'baking'),
  egg_salad: profile('سلطة البيض بالثوم المعمر', 'Egg and Chive Salad', 'Salade d’œufs à la ciboulette', 'Ensalada de huevo y cebollino', 'Eiersalat mit Schnittlauch', 'vegetable_mains', 'lunch', 10, 3, 11, 'tossing'),
};

export const BASE_NATIONAL_RECIPES = {
  carbonnade: profile('كاربوناد فلاماند بلحم بقري حلال', 'Carbonnade Flamande with Halal Beef, No Beer', 'Carbonnade flamande au bœuf halal, sans bière', 'Carbonada flamenca con ternera halal, sin cerveza', 'Flämische Carbonnade mit Halal-Rind, ohne Bier', 'meat_mains', 'dinner', 20, 9, 11, 'braising'),
  waterzooi: profile('واترزوي الدجاج بالكريمة', 'Ghent Chicken Waterzooi with Cream', 'Waterzooi de poulet à la crème', 'Waterzooi de pollo con nata', 'Genter Hühner-Waterzooi mit Sahne', 'poultry_mains', 'dinner', 18, 6, 8, 'simmering'),
  moules_frites: profile('بلح البحر مع البطاطس المقلية', 'Moules-Frites, Mussels with Fries', 'Moules-frites aux herbes', 'Mejillones con patatas fritas', 'Miesmuscheln mit Pommes frites', 'fish_seafood', 'dinner', 14, 18, 9, 'steaming'),
  stoofvlees: profile('ستوفليس بلحم بقري حلال', 'Stoofvlees Halal Beef Stew, No Beer', 'Stoofvlees au bœuf halal, sans bière', 'Stoofvlees de ternera halal, sin cerveza', 'Stoofvlees mit Halal-Rind, ohne Bier', 'meat_mains', 'dinner', 21, 7, 12, 'stewing'),
  gaufres_liege: profile('وافل لييج بالسكر', 'Liège Sugar Waffles', 'Gaufres de Liège au sucre perlé', 'Gofres de Lieja con azúcar perlado', 'Lütticher Waffeln mit Hagelzucker', 'rice_cakes_sweets', 'snack', 6, 55, 15, 'baking'),
  speculoos: profile('بسكويت سبيكولوس بالتوابل', 'Speculoos Spiced Biscuits', 'Biscuits spéculoos aux épices', 'Galletas speculoos especiadas', 'Spekulatius-Gewürzkekse', 'rice_cakes_sweets', 'snack', 5, 65, 18, 'baking'),
  chocolate_mousse: profile('موس الشوكولاتة الداكنة', 'Belgian Dark Chocolate Mousse', 'Mousse au chocolat noir belge', 'Mousse de chocolate negro belga', 'Belgische Mousse au Chocolat', 'rice_cakes_sweets', 'snack', 5, 28, 17, 'chilling'),
  frites: profile('بطاطس مقلية مرتين', 'Belgian Double-Fried Frites', 'Frites belges double cuisson', 'Patatas fritas belgas doble fritura', 'Belgische doppelt frittierte Pommes', 'street_snacks', 'snack', 4, 40, 15, 'frying'),
  vol_au_vent: profile('فول أو فان بالدجاج والفطر', 'Chicken Vol-au-vent with Mushrooms', 'Vol-au-vent au poulet et aux champignons', 'Volován de pollo con champiñones', 'Hähnchen-Vol-au-vent mit Pilzen', 'poultry_mains', 'dinner', 15, 16, 13, 'baking'),
  boulets_liege: profile('كرات لحم لييج بشراب التفاح', 'Liège Meatballs in Apple Syrup, Halal Beef', 'Boulets à la liégeoise au bœuf halal', 'Albóndigas de Lieja con sirope de manzana', 'Lütticher Fleischbällchen mit Apfelsirup', 'meat_mains', 'dinner', 18, 12, 11, 'simmering'),
  chicons_gratin: profile('غراتان الهندباء بالديك الرومي المدخن', 'Endive Gratin with Smoked Turkey, Halal', 'Chicons au gratin à la dinde fumée', 'Gratinado de endibias con pavo ahumado', 'Chicorée-Gratin mit Putenrauchfleisch', 'vegetable_mains', 'dinner', 10, 12, 12, 'baking'),
  tomate_crevettes: profile('طماطم محشوة بالجمبري الرمادي', 'Grey Shrimp Stuffed Tomato', 'Tomate aux crevettes grises', 'Tomate relleno de gambas grises', 'Mit Krabben gefüllte Tomate', 'fish_seafood', 'lunch', 10, 5, 6, 'assembling'),
  sole_meuniere: profile('سمك موسى بالزبدة والليمون', 'Sole Meunière with Butter and Lemon', 'Sole meunière au beurre et au citron', 'Lenguado a la meunière', 'Seezunge Müllerin Art', 'fish_seafood', 'dinner', 20, 3, 12, 'pan_frying'),
  anguilles_vert: profile('ثعبان السمك بصلصة الأعشاب الخضراء', 'Eel in Green Herb Sauce', 'Anguilles au vert', 'Anguila en salsa verde de hierbas', 'Aal in grüner Kräutersoße', 'fish_seafood', 'dinner', 17, 3, 12, 'simmering'),
  mitraillette: profile('ساندويتش ميترايليت بلحم بقري حلال', 'Mitraillette Sandwich with Halal Beef', 'Mitraillette au bœuf halal et aux frites', 'Bocadillo mitraillette de ternera halal', 'Mitraillette mit Halal-Rind und Pommes', 'street_snacks', 'lunch', 14, 30, 12, 'assembling'),
  asperges_flamande: profile('هليون بالبيض والزبدة', 'Asparagus Flemish Style with Egg and Butter', 'Asperges à la flamande aux œufs', 'Espárragos a la flamenca con huevo', 'Spargel auf flämische Art mit Ei', 'vegetable_mains', 'lunch', 8, 6, 14, 'boiling'),
  tarte_au_riz: profile('فطيرة الأرز بالكاسترد', 'Rice Tart with Custard', 'Tarte au riz de Verviers', 'Tarta de arroz con crema', 'Reisfladen aus Verviers', 'rice_cakes_sweets', 'snack', 6, 35, 9, 'baking'),
  filet_americain: profile('فيليه أمريكان بلحم بقري حلال', 'Filet Américain, Seasoned Raw Halal Beef', 'Filet américain au bœuf halal', 'Filete americano de ternera halal', 'Filet Américain aus Halal-Rind', 'meat_mains', 'lunch', 16, 2, 10, 'assembling'),
  stamppot: profile('ستامبوت الكرنب مع نقانق بقر حلال', 'Kale Stamppot with Halal Beef Sausage', 'Stamppot au chou frisé et saucisse de bœuf halal', 'Stamppot de col rizada con salchicha de res halal', 'Grünkohl-Stamppot mit Halal-Rinderwurst', 'meat_mains', 'dinner', 10, 18, 8, 'boiling'),
  erwtensoep: profile('حساء البازلاء الهولندي بلحم بقري حلال', 'Dutch Split Pea Soup with Halal Beef', 'Erwtensoep aux pois cassés et au bœuf halal', 'Sopa holandesa de guisantes con ternera halal', 'Holländische Erbsensuppe mit Halal-Rind', 'soups_stews', 'lunch', 9, 17, 4, 'simmering'),
  bitterballen: profile('بيتربالن اللحم البقري المقرمش', 'Crispy Beef Bitterballen', 'Bitterballen croustillants au bœuf', 'Bitterballen crujientes de ternera', 'Knusprige Rindfleisch-Bitterballen', 'street_snacks', 'snack', 12, 14, 13, 'frying'),
  haring: profile('سمك الرنجة بالبصل والمخلل', 'Hollandse Nieuwe Herring with Onion', 'Hareng frais aux oignons', 'Arenque fresco con cebolla', 'Matjeshering mit Zwiebeln', 'fish_seafood', 'snack', 16, 3, 10, 'curing'),
  poffertjes: profile('فطائر بوفرتييس الصغيرة', 'Poffertjes Mini Pancakes', 'Poffertjes, mini-crêpes au beurre', 'Poffertjes, minitortitas con mantequilla', 'Poffertjes, kleine Butterpfannkuchen', 'rice_cakes_sweets', 'snack', 6, 38, 9, 'pan_frying'),
  stroopwafel: profile('وافل ستروب بشراب الكراميل', 'Stroopwafel Caramel Syrup Waffle', 'Gaufre au sirop de caramel stroopwafel', 'Gofre stroopwafel con sirope de caramelo', 'Stroopwaffel mit Karamellsirup', 'rice_cakes_sweets', 'snack', 4, 66, 17, 'baking'),
  gouda: profile('طبق جبن غاودا المعتق', 'Aged Gouda Cheese Board', 'Plateau de gouda affiné', 'Tabla de queso gouda curado', 'Gereifter Gouda-Käseteller', 'street_snacks', 'snack', 25, 2, 31, 'aging'),
  hutspot: profile('هوتسبوت هريس الجزر والبطاطس', 'Hutspot Carrot and Potato Mash', 'Hutspot, purée de carottes et pommes de terre', 'Hutspot, puré de zanahoria y patata', 'Hutspot, Karotten-Kartoffel-Stampf', 'vegetable_mains', 'dinner', 4, 19, 5, 'boiling'),
  kibbeling: profile('قطع سمك القد المقلية', 'Kibbeling Fried Cod Bites', 'Kibbeling, bouchées de cabillaud frites', 'Kibbeling, bocados de bacalao frito', 'Kibbeling, frittierte Kabeljaustücke', 'fish_seafood', 'snack', 15, 12, 9, 'frying'),
  appeltaart: profile('فطيرة التفاح بالقرفة', 'Dutch Apple Pie with Cinnamon', 'Tarte aux pommes à la cannelle', 'Tarta de manzana holandesa', 'Holländischer Apfelkuchen', 'rice_cakes_sweets', 'snack', 4, 44, 14, 'baking'),
  pannenkoeken: profile('بانكيك بالتفاح', 'Dutch Apple Pancake', 'Crêpe hollandaise aux pommes', 'Panqueque holandés de manzana', 'Holländischer Apfelpfannkuchen', 'breakfast_items', 'breakfast', 7, 38, 9, 'pan_frying'),
  ontbijtkoek: profile('كعكة التوابل بالعسل', 'Ontbijtkoek Honey Spice Cake', 'Pain d’épices au miel ontbijtkoek', 'Bizcocho especiado de miel ontbijtkoek', 'Ontbijtkoek Honig-Gewürzkuchen', 'breakfast_items', 'breakfast', 5, 62, 6, 'baking'),
  tompouce: profile('شريحة تومبوس بالكاسترد', 'Tompouce Custard Slice', 'Tompouce à la crème pâtissière', 'Tompouce con crema pastelera', 'Tompouce mit Vanillepudding', 'rice_cakes_sweets', 'snack', 4, 42, 15, 'baking'),
  kroket: profile('كروكيت اللحم البقري', 'Crispy Beef Kroket', 'Kroket croustillant au bœuf', 'Croqueta kroket de ternera', 'Knusprige Rindfleisch-Krokette', 'street_snacks', 'snack', 12, 15, 12, 'frying'),
  hachee: profile('هاشي يخنة اللحم والبصل', 'Hachee Beef and Onion Stew', 'Hachee, ragoût de bœuf aux oignons', 'Hachee, estofado de ternera con cebolla', 'Hachee, Rindfleisch-Zwiebel-Schmorbraten', 'meat_mains', 'dinner', 20, 9, 11, 'stewing'),
  oliebollen: profile('كرات العجين المقلية بالزبيب', 'Oliebollen Raisin Doughnuts', 'Oliebollen aux raisins secs', 'Oliebollen con pasas', 'Oliebollen mit Rosinen', 'rice_cakes_sweets', 'snack', 5, 40, 13, 'frying'),
  uitsmijter: profile('بيض مقلي مع الجبن على الخبز', 'Uitsmijter Fried Eggs with Cheese', 'Uitsmijter aux œufs sur le plat et au fromage', 'Uitsmijter con huevos fritos y queso', 'Uitsmijter mit Spiegeleiern und Käse', 'breakfast_items', 'breakfast', 14, 18, 14, 'pan_frying'),
  mosselen: profile('بلح البحر بالكرفس والأعشاب', 'Zeeland Mussels with Celery and Herbs', 'Moules de Zélande au céleri', 'Mejillones de Zelanda con apio', 'Zeeländische Miesmuscheln mit Sellerie', 'fish_seafood', 'dinner', 13, 5, 4, 'steaming'),
  bouneschlupp: profile('بونشلوب حساء الفاصوليا الخضراء', 'Bouneschlupp Green Bean Soup', 'Bouneschlupp aux haricots verts', 'Bouneschlupp, sopa de judías verdes', 'Bouneschlupp, grüne Bohnensuppe', 'soups_stews', 'lunch', 5, 13, 4, 'simmering'),
  gromperekichelcher: profile('أقراص البطاطس المقلية', 'Gromperekichelcher Potato Fritters', 'Gromperekichelcher, beignets de pommes de terre', 'Gromperekichelcher, buñuelos de patata', 'Gromperekichelcher, Kartoffelpuffer', 'street_snacks', 'snack', 4, 25, 11, 'frying'),
  friture_moselle: profile('سمك الموزيل المقلي الصغير', 'Friture de la Moselle Fried River Fish', 'Friture de la Moselle', 'Fritura del Mosela', 'Mosel-Friture, frittierter Flussfisch', 'fish_seafood', 'dinner', 16, 10, 10, 'frying'),
  quetschentaart: profile('فطيرة البرقوق', 'Quetschentaart Plum Tart', 'Quetschentaart aux prunes', 'Quetschentaart, tarta de ciruelas', 'Quetschentaart, Zwetschgenkuchen', 'rice_cakes_sweets', 'snack', 4, 41, 11, 'baking'),
  kachkeis: profile('جبن كاشكيس المطبوخ', 'Kachkéis Cooked Cheese Spread', 'Kachkéis fondu au beurre', 'Kachkéis, queso fundido', 'Kachkéis, geschmolzener Kochkäse', 'street_snacks', 'snack', 14, 4, 16, 'melting'),
  kniddelen: profile('كنيدلن زلابية الدقيق بالزبدة', 'Kniddelen Flour Dumplings with Butter', 'Kniddelen au beurre et aux herbes', 'Kniddelen, ñoquis de harina con mantequilla', 'Kniddelen, Mehlnocken mit Butter', 'vegetable_mains', 'dinner', 6, 32, 8, 'boiling'),
  bouchee_reine: profile('بوشيه بالدجاج والكريمة', 'Bouchée à la Reine with Chicken', 'Bouchée à la reine au poulet', 'Volován a la reina con pollo', 'Königinpastetchen mit Hähnchen', 'poultry_mains', 'dinner', 15, 17, 13, 'baking'),
  staerzelen: profile('زلابية الحنطة السوداء بالكريمة', 'Stäerzelen Buckwheat Dumplings with Cream', 'Stäerzelen au sarrasin et à la crème', 'Stäerzelen de trigo sarraceno con nata', 'Stäerzelen, Buchweizennocken mit Sahne', 'vegetable_mains', 'dinner', 6, 28, 9, 'boiling'),
};

export const EXPANSION_REGIONAL_RECIPES = {
  mustard_chicken: profile('دجاج بالخردل', 'Mustard Chicken', 'Poulet à la moutarde', 'Pollo a la mostaza', 'Senf-Hähnchen', 'poultry_mains', 'dinner', 23, 3, 10, 'roasting'),
  leek_soup: profile('حساء الكراث والبطاطس', 'Leek and Potato Soup', 'Soupe de poireaux et pommes de terre', 'Sopa de puerro y patata', 'Lauch-Kartoffel-Suppe', 'soups_stews', 'lunch', 5, 16, 6, 'simmering'),
  herb_cod: profile('سمك القد بالأعشاب', 'Herb-Baked Cod', 'Cabillaud rôti aux herbes', 'Bacalao al horno con hierbas', 'Kabeljau mit Kräutern gebacken', 'fish_seafood', 'dinner', 21, 4, 7, 'baking'),
  mushroom_toast: profile('فطر بالكريمة على الخبز المحمص', 'Creamed Mushrooms on Toast', 'Champignons à la crème sur toast', 'Champiñones con nata sobre tostada', 'Champignons in Sahne auf Toast', 'street_snacks', 'lunch', 7, 22, 11, 'simmering'),
  beef_carrot: profile('لحم بقري مطهو بالجزر', 'Slow Beef with Carrots', 'Bœuf mijoté aux carottes', 'Ternera estofada con zanahorias', 'Rindfleisch mit Karotten geschmort', 'meat_mains', 'dinner', 22, 10, 12, 'slow_cooking'),
  spinach_tart: profile('تارت السبانخ والريكوتا', 'Spinach and Ricotta Tart', 'Tarte aux épinards et à la ricotta', 'Tarta de espinacas y ricotta', 'Spinat-Ricotta-Tarte', 'vegetable_mains', 'lunch', 10, 21, 13, 'baking'),
  chicken_leek: profile('دجاج بالكراث والكريمة', 'Chicken with Leeks and Cream', 'Poulet aux poireaux et à la crème', 'Pollo con puerros y nata', 'Hähnchen mit Lauch und Sahne', 'poultry_mains', 'dinner', 22, 6, 12, 'simmering'),
  berry_crumble: profile('كرامبل التوت بالشوفان', 'Berry Oat Crumble', 'Crumble aux fruits rouges et à l’avoine', 'Crumble de frutos rojos con avena', 'Beeren-Hafer-Crumble', 'rice_cakes_sweets', 'snack', 4, 38, 12, 'baking'),
  potato_pancake: profile('أقراص البطاطس المبشورة', 'Grated Potato Pancakes', 'Galettes de pommes de terre râpées', 'Tortitas de patata rallada', 'Reibekuchen', 'street_snacks', 'snack', 5, 27, 10, 'pan_frying'),
  pumpkin_soup: profile('حساء اليقطين بجوزة الطيب', 'Pumpkin Nutmeg Soup', 'Soupe de potiron à la muscade', 'Sopa de calabaza con nuez moscada', 'Kürbis-Muskat-Suppe', 'soups_stews', 'lunch', 3, 15, 5, 'simmering'),
  carrot_salad: profile('سلطة الجزر بالزبيب', 'Carrot Raisin Salad', 'Salade de carottes aux raisins secs', 'Ensalada de zanahoria y pasas', 'Karotten-Rosinen-Salat', 'vegetable_mains', 'lunch', 2, 18, 6, 'tossing'),
  cheese_omelette: profile('عجة الجبن بالأعشاب', 'Cheese and Herb Omelette', 'Omelette au fromage et aux herbes', 'Tortilla de queso y hierbas', 'Käse-Kräuter-Omelett', 'breakfast_items', 'breakfast', 13, 4, 12, 'pan_frying'),
};

export const EXPANSION_NATIONAL_RECIPES = {
  chicon_salade: profile('سلطة الهندباء بالبرتقال', 'Belgian Endive Salad with Orange', 'Salade de chicons à l’orange', 'Ensalada de endibias con naranja', 'Chicoréesalat mit Orange', 'vegetable_mains', 'lunch', 3, 10, 5, 'tossing'),
  waterzooi_fish: profile('واترزوي السمك بالكريمة', 'Ghent Fish Waterzooi with Cream', 'Waterzooi de poisson à la crème', 'Waterzooi de pescado con nata', 'Genter Fisch-Waterzooi mit Sahne', 'fish_seafood', 'dinner', 16, 6, 8, 'simmering'),
  crevettes_croquettes: profile('كروكيت الجمبري', 'Belgian Shrimp Croquettes', 'Croquettes aux crevettes grises', 'Croquetas de gambas grises', 'Krabbenkroketten', 'street_snacks', 'snack', 12, 13, 10, 'frying'),
  stoemp: profile('ستومب هريس البطاطس والجزر', 'Stoemp Potato and Carrot Mash', 'Stoemp aux carottes', 'Stoemp, puré de patata y zanahoria', 'Stoemp, Kartoffel-Karotten-Stampf', 'vegetable_mains', 'dinner', 4, 20, 5, 'boiling'),
  flamiche: profile('فلاميش فطيرة الكراث والجبن', 'Flamiche Leek and Cheese Tart', 'Flamiche aux poireaux et au fromage', 'Flamiche de puerros y queso', 'Flamiche, Lauch-Käse-Tarte', 'vegetable_mains', 'lunch', 9, 24, 13, 'baking'),
  tarte_sucre: profile('فطيرة السكر', 'Belgian Sugar Tart', 'Tarte au sucre', 'Tarta de azúcar', 'Zuckertorte aus Hennegau', 'rice_cakes_sweets', 'snack', 5, 50, 13, 'baking'),
  mattentaart: profile('ماتنتارت كعكة اللبن الرائب', 'Mattentaart Curd Cake', 'Mattentaart au lait caillé', 'Mattentaart de cuajada', 'Mattentaart, Quarkkuchen', 'rice_cakes_sweets', 'snack', 7, 36, 11, 'baking'),
  cramique: profile('خبز الزبيب كراميك', 'Cramique Raisin Brioche', 'Cramique aux raisins secs', 'Cramique, brioche con pasas', 'Cramique, Rosinenbrioche', 'breakfast_items', 'breakfast', 7, 48, 9, 'baking'),
  couque_dinant: profile('بسكويت العسل الصلب', 'Couque de Dinant Honey Biscuit', 'Couque de Dinant au miel', 'Couque de Dinant con miel', 'Dinanter Honiggebäck', 'rice_cakes_sweets', 'snack', 6, 74, 6, 'baking'),
  cuberdon: profile('حلوى التوت كوبردون', 'Cuberdon Berry Candies', 'Cuberdons à la framboise', 'Cuberdones de frambuesa', 'Cuberdon-Fruchtbonbons', 'rice_cakes_sweets', 'snack', 1, 90, 0, 'boiling'),
  boulettes_tomate: profile('كرات اللحم بصلصة الطماطم', 'Ballekes Meatballs in Tomato Sauce, Halal Beef', 'Boulettes sauce tomate au bœuf halal', 'Albóndigas ballekes en salsa de tomate', 'Ballekes, Fleischbällchen in Tomatensoße', 'meat_mains', 'dinner', 16, 8, 10, 'simmering'),
  tarte_fromage: profile('فطيرة الجبن الطازج', 'Fresh Cheese Tart', 'Tarte au fromage blanc', 'Tarta de queso fresco', 'Frischkäsetarte', 'rice_cakes_sweets', 'snack', 8, 34, 12, 'baking'),
  gaufres_bruxelles: profile('وافل بروكسل الخفيف', 'Brussels Waffles, Light and Crisp', 'Gaufres de Bruxelles', 'Gofres de Bruselas', 'Brüsseler Waffeln', 'rice_cakes_sweets', 'snack', 6, 48, 13, 'baking'),
  pralines: profile('حلوى برالين الشوكولاتة', 'Belgian Chocolate Pralines', 'Pralines belges au chocolat', 'Pralinés belgas de chocolate', 'Belgische Schokoladenpralinen', 'rice_cakes_sweets', 'snack', 5, 55, 26, 'confectioning'),
  tarte_sirop: profile('فطيرة شراب التفاح والكمثرى', 'Tarte au Sirop, Apple Pear Syrup Tart', 'Tarte au sirop de Liège', 'Tarta de sirope de Lieja', 'Lütticher Siruptarte', 'rice_cakes_sweets', 'snack', 4, 52, 10, 'baking'),
  andijvie: profile('ستامبوت الهندباء', 'Andijviestamppot Endive Mash', 'Stamppot à la scarole', 'Stamppot de escarola', 'Endivien-Stamppot', 'vegetable_mains', 'dinner', 4, 17, 5, 'boiling'),
  zuurkool: profile('ستامبوت الملفوف المخمر مع لحم بقري حلال', 'Zuurkoolstamppot with Halal Beef', 'Stamppot à la choucroute et au bœuf halal', 'Stamppot de chucrut con ternera halal', 'Sauerkraut-Stamppot mit Halal-Rind', 'meat_mains', 'dinner', 12, 16, 7, 'boiling'),
  kapucijners: profile('يخنة البازلاء الصفراء', 'Kapucijner Yellow Pea Stew', 'Ragoût de pois capucijners', 'Guiso de guisantes capuchinos', 'Kapucijner-Erbseneintopf', 'vegetable_mains', 'dinner', 7, 19, 3, 'stewing'),
  bruine_bonensoep: profile('حساء الفاصوليا البنية', 'Dutch Brown Bean Soup with Halal Beef', 'Soupe aux haricots bruns et au bœuf halal', 'Sopa de alubias pintas con ternera halal', 'Braune-Bohnen-Suppe mit Halal-Rind', 'soups_stews', 'lunch', 8, 18, 4, 'simmering'),
  mosterdsoep: profile('حساء الخردل بالكريمة', 'Groningen Mustard Soup', 'Soupe à la moutarde de Groningue', 'Sopa de mostaza de Groninga', 'Groninger Senfsuppe', 'soups_stews', 'lunch', 4, 9, 7, 'simmering'),
  zeeuwse_bolus: profile('كعكة القرفة الزيلاندية', 'Zeeuwse Bolus Cinnamon Bun', 'Bolus zélandais à la cannelle', 'Bolus de Zelanda con canela', 'Zeeuwse Bolus, Zimtschnecke', 'rice_cakes_sweets', 'snack', 6, 55, 12, 'baking'),
  haagse_bluf: profile('حلوى التوت المخفوقة', 'Haagse Bluf Berry Whip', 'Haagse bluf aux fruits rouges', 'Haagse bluf de frutos rojos', 'Haagse Bluf, Beerenschaum', 'rice_cakes_sweets', 'snack', 3, 24, 1, 'whipping'),
  kletskoppen: profile('بسكويت اللوز الرقيق', 'Kletskop Crisp Almond Cookies', 'Kletskoppen aux amandes', 'Kletskoppen de almendra', 'Kletskoppen-Mandelkekse', 'rice_cakes_sweets', 'snack', 7, 58, 20, 'baking'),
  arretje: profile('كعكة الشوكولاتة بالبسكويت', 'Arretje Chocolate Biscuit Cake', 'Gâteau arretje au chocolat et aux biscuits', 'Tarta arretje de chocolate y galleta', 'Arretje-Schoko-Kekskuchen', 'rice_cakes_sweets', 'snack', 5, 48, 22, 'chilling'),
  vla: profile('كاسترد الفانيليا فلا', 'Vanilla Vla Custard', 'Vla à la vanille', 'Vla de vainilla', 'Vanille-Vla', 'rice_cakes_sweets', 'snack', 4, 17, 3, 'simmering'),
  hangop: profile('زبادي مصفى بالعسل', 'Hangop Strained Yogurt with Honey', 'Hangop au miel', 'Hangop, yogur colado con miel', 'Hangop mit Honig', 'breakfast_items', 'breakfast', 7, 14, 4, 'straining'),
  stoofpeertjes: profile('كمثرى مطهوة بالقرفة', 'Stoofpeertjes Stewed Pears with Cinnamon, No Wine', 'Poires étuvées à la cannelle, sans vin', 'Peras estofadas con canela, sin vino', 'Geschmorte Birnen mit Zimt, ohne Wein', 'rice_cakes_sweets', 'snack', 1, 22, 0, 'stewing'),
  wentelteefjes: profile('خبز محمص بالقرفة والحليب', 'Wentelteefjes Cinnamon French Toast', 'Pain perdu à la cannelle', 'Torrijas de canela wentelteefjes', 'Wentelteefjes, Zimt-Armer-Ritter', 'breakfast_items', 'breakfast', 7, 30, 8, 'pan_frying'),
  broodje_kroket: profile('ساندويتش الكروكيت', 'Broodje Kroket on a Soft Roll', 'Broodje kroket au bœuf', 'Bocadillo broodje kroket de ternera', 'Broodje Kroket mit Rindfleisch', 'street_snacks', 'lunch', 11, 28, 9, 'frying'),
  patat_speciaal: profile('بطاطس مقلية بمايونيز الكاري والبصل', 'Patat Speciaal with Curry Mayo and Onion', 'Frites patat speciaal, mayonnaise au curry', 'Patatas speciaal con mayonesa de curry', 'Patat Speciaal mit Curry-Mayo', 'street_snacks', 'snack', 3, 38, 16, 'frying'),
  kapsalon: profile('كابسالون بالدجاج الشاورما', 'Kapsalon with Halal Chicken Shawarma', 'Kapsalon au poulet shawarma halal', 'Kapsalon con pollo shawarma halal', 'Kapsalon mit Halal-Hähnchen-Schawarma', 'street_snacks', 'dinner', 14, 30, 16, 'assembling'),
  sate_kip: profile('دجاج ساتيه بصلصة الفول السوداني', 'Dutch Chicken Satay with Peanut Sauce', 'Satay de poulet à la sauce arachide', 'Satay de pollo con salsa de cacahuete', 'Hähnchen-Satay mit Erdnusssoße', 'poultry_mains', 'dinner', 20, 8, 12, 'grilling'),
  huzarensalade: profile('سلطة البطاطس والبيض', 'Huzarensalade Potato and Egg Salad', 'Salade huzarensalade aux pommes de terre', 'Ensalada huzaren de patata y huevo', 'Huzarensalade mit Kartoffeln und Ei', 'vegetable_mains', 'lunch', 6, 14, 9, 'tossing'),
  beschuit_muisjes: profile('بسكويت الرسك بحبيبات اليانسون', 'Beschuit with Anise Muisjes', 'Biscotte aux muisjes d’anis', 'Beschuit con muisjes de anís', 'Beschuit mit Anis-Muisjes', 'breakfast_items', 'breakfast', 8, 72, 3, 'assembling'),
  bami_goreng: profile('نودلز بامي بالدجاج', 'Bami Goreng with Chicken', 'Nouilles bami goreng au poulet', 'Fideos bami goreng con pollo', 'Bami Goreng mit Hähnchen', 'noodle_dishes', 'dinner', 12, 38, 8, 'stir_frying'),
  gromperezopp: profile('حساء البطاطس والكراث', 'Gromperezopp Potato Leek Soup', 'Gromperezopp aux poireaux', 'Gromperezopp, sopa de patata y puerro', 'Gromperezopp, Kartoffel-Lauch-Suppe', 'soups_stews', 'lunch', 4, 14, 5, 'simmering'),
  kuddelfleck: profile('يخنة الكرشة بالخل', 'Kuddelfleck Tripe Stew, Halal', 'Kuddelfleck, tripes à la luxembourgeoise', 'Kuddelfleck, estofado de callos halal', 'Kuddelfleck, Kutteltopf', 'meat_mains', 'dinner', 14, 5, 7, 'stewing'),
  verwurelter: profile('عجين مقلي معقود بالسكر', 'Verwurelter Sugar Knots', 'Verwurelter, nœuds de pâte frits', 'Verwurelter, nudos de masa fritos', 'Verwurelter, frittierte Teigknoten', 'rice_cakes_sweets', 'snack', 5, 45, 14, 'frying'),
  aeppelkuch: profile('كعكة التفاح بالفانيليا', 'Äppelkuch Vanilla Apple Cake', 'Äppelkuch aux pommes', 'Äppelkuch, tarta de manzana', 'Äppelkuch, Apfelkuchen', 'rice_cakes_sweets', 'snack', 4, 42, 12, 'baking'),
  boxemannchen: profile('أقراص البريوش الصغيرة', 'Boxemännercher Brioche Figures', 'Boxemännercher en brioche', 'Boxemännercher, brioches', 'Boxemännchen, Brioche-Männchen', 'breakfast_items', 'breakfast', 8, 45, 10, 'baking'),
  bretzel: profile('بريتزل محلى باللوز', 'Luxembourg Sweet Almond Bretzel', 'Bretzel sucré aux amandes', 'Bretzel dulce con almendras', 'Luxemburger Mandelbrezel', 'rice_cakes_sweets', 'snack', 8, 50, 12, 'baking'),
  feschzopp: profile('حساء سمك الموزيل', 'Moselle Fish Soup with Vegetables', 'Soupe de poisson de la Moselle', 'Sopa de pescado del Mosela', 'Mosel-Fischsuppe mit Gemüse', 'soups_stews', 'dinner', 12, 6, 5, 'simmering'),
  quiche_leek: profile('كيش الكراث والجبن', 'Luxembourg Leek and Cheese Quiche', 'Quiche luxembourgeoise aux poireaux', 'Quiche de puerros y queso', 'Lauch-Käse-Quiche', 'vegetable_mains', 'lunch', 10, 22, 14, 'baking'),
  apfelkuechle: profile('قطع التفاح المقلية', 'Luxembourg Apple Fritters', 'Beignets de pommes à la cannelle', 'Buñuelos de manzana', 'Apfelküchle mit Zimtzucker', 'rice_cakes_sweets', 'snack', 4, 38, 12, 'frying'),
};

export function B(profileRow, region) {
  const token = REGION_DEMONYM[region];
  if (!token) throw new Error(`Unknown Benelux region: ${region}`);
  const extra = REGION_DIASPORA[region];
  const national = region === 'pan_benelux';
  const descriptor = REGIONS.find(([id]) => id === region);
  return {
    id: '',
    nameAr: `${national ? '' : `${descriptor[1]} `}${profileRow.ar} ${token}`.trim(),
    nameEn: `${national ? 'Benelux ' : `${descriptor[2]} `}${profileRow.en}`,
    nameFr: `${national ? 'Cuisine benelux : ' : `${descriptor[3]} `}${profileRow.fr}`,
    nameEs: `${national ? 'Cocina benelux: ' : `${descriptor[4]} `}${profileRow.es}`,
    nameDe: `${national ? 'Benelux-Küche: ' : `${descriptor[5]} `}${profileRow.de}`,
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
      if (!recipes[key]) throw new Error(`Unknown Benelux recipe profile: ${key}`);
      rows.push(B(recipes[key], region));
    }
  }
  for (const key of nationalKeys) {
    if (!recipes[key]) throw new Error(`Unknown Benelux recipe profile: ${key}`);
    rows.push(B(recipes[key], 'pan_benelux'));
  }
  return rows;
}
