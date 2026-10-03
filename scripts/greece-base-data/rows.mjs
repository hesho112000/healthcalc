export const BASE_DIASPORA = ['greek', 'western', 'mediterranean', 'comfort_food'];
export const REGION_DIASPORA = { athens: 'athenian', crete: 'cretan' };

// Each anchor owns one stable Arabic token; no Greek row belongs in asian_shared.
export const REGION_DEMONYM = {
  pan_greek: 'يوناني',
  athens: 'أثيني',
  thessaloniki: 'سالونيكي',
  crete: 'كريتي',
  santorini: 'سانتوريني',
  mykonos: 'ميكوني',
  corfu: 'كورفي',
  rhodes: 'رودسي',
  peloponnese: 'بيلوبونيزي',
  epirus: 'إبيري',
  macedonia_gr: 'مقدوني_يوناني',
};

const REGIONS = [
  ['pan_greek', 'مطابخ اليونان', 'Greek', 'grecque', 'griega', 'griechische'],
  ['athens', 'مطابخ أثينا', 'Athenian', 'À l’athénienne : ', 'Al estilo ateniense: ', 'Athener Art: '],
  ['thessaloniki', 'مطابخ سالونيك', 'Thessaloniki', 'À la thessalonicienne : ', 'Al estilo de Tesalónica: ', 'Thessaloniki-Art: '],
  ['crete', 'مطابخ كريت', 'Cretan', 'À la crétoise : ', 'Al estilo cretense: ', 'Kretische Art: '],
  ['santorini', 'مطابخ ثيرا', 'Santorini', 'À la santorinienne : ', 'Al estilo de Santorini: ', 'Santorin-Art: '],
  ['mykonos', 'مطابخ ميكونوس', 'Mykonos', 'À la mykonienne : ', 'Al estilo de Miconos: ', 'Mykonos-Art: '],
  ['corfu', 'مطابخ كورفو', 'Corfiot', 'À la coriote : ', 'Al estilo corfiota: ', 'Korfu-Art: '],
  ['rhodes', 'مطابخ رودس', 'Rhodian', 'À la rhodienne : ', 'Al estilo rodio: ', 'Rhodos-Art: '],
  ['peloponnese', 'مطابخ البيلوبونيز', 'Peloponnesian', 'À la péloponnésienne : ', 'Al estilo peloponeso: ', 'Peloponnesische Art: '],
  ['epirus', 'مطابخ إبيروس', 'Epirote', 'À l’épirote : ', 'Al estilo epirota: ', 'Epirotische Art: '],
  ['macedonia_gr', 'مطابخ مقدونيا اليونانية', 'Greek Macedonian', 'À la macédonienne grecque : ', 'Al estilo macedonio griego: ', 'Griechisch-mazedonische Art: '],
];

const profile = (ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking) =>
  ({ ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking });

export const BASE_REGIONAL_RECIPES = {
  lemon_chicken: profile('دجاج بالليمون والأوريغانو', 'Lemon Oregano Chicken', 'Poulet au citron et à l’origan', 'Pollo al limón y orégano', 'Zitronen-Oregano-Hähnchen', 'poultry_mains', 'dinner', 23, 3, 9, 'roasting'),
  grilled_fish: profile('سمك مشوي بالليمون', 'Grilled Fish with Lemon', 'Poisson grillé au citron', 'Pescado a la parrilla con limón', 'Gegrillter Fisch mit Zitrone', 'fish_seafood', 'dinner', 21, 2, 8, 'grilling'),
  veg_stew: profile('يخنة الخضار بزيت الزيتون', 'Olive Oil Vegetable Stew', 'Mijoté de légumes à l’huile d’olive', 'Estofado de verduras con aceite de oliva', 'Gemüseeintopf mit Olivenöl', 'vegetable_mains', 'dinner', 3, 14, 6, 'stewing'),
  yogurt_honey: profile('زبادي بالعسل والجوز', 'Yogurt with Honey and Walnuts', 'Yaourt au miel et aux noix', 'Yogur con miel y nueces', 'Joghurt mit Honig und Walnüssen', 'breakfast_items', 'breakfast', 8, 18, 8, 'assembling'),
};

export const BASE_NATIONAL_RECIPES = {
  moussaka: profile('موساكا بالضأن الحلال والباشاميل', 'Moussaka with Halal Lamb and Béchamel', 'Moussaka à l’agneau halal et à la béchamel', 'Moussaka con cordero halal y bechamel', 'Moussaka mit Halal-Lamm und Béchamel', 'meat_mains', 'dinner', 12, 10, 12, 'baking'),
  souvlaki_chicken: profile('سيخ سوفلاكي دجاج حلال', 'Chicken Souvlaki, Halal', 'Souvlaki au poulet halal', 'Souvlaki de pollo halal', 'Hähnchen-Souvlaki, halal', 'poultry_mains', 'dinner', 24, 3, 8, 'grilling'),
  gyros_chicken: profile('يروس دجاج حلال مع تزاتزيكي', 'Chicken Gyros with Tzatziki, Halal', 'Gyros au poulet halal avec tzatziki', 'Gyros de pollo halal con tzatziki', 'Hähnchen-Gyros mit Tzatziki, halal', 'street_snacks', 'lunch', 15, 20, 10, 'grilling'),
  souvlaki_lamb: profile('سيخ سوفلاكي ضأن حلال', 'Lamb Souvlaki, Halal', 'Souvlaki à l’agneau halal', 'Souvlaki de cordero halal', 'Lamm-Souvlaki, halal', 'meat_mains', 'dinner', 23, 2, 12, 'grilling'),
  spanakopita: profile('سباناكوبيتا بالسبانخ والفيتا', 'Spanakopita with Spinach and Feta', 'Spanakopita aux épinards et à la feta', 'Spanakopita con espinacas y feta', 'Spanakopita mit Spinat und Feta', 'street_snacks', 'snack', 8, 22, 14, 'baking'),
  greek_salad: profile('سلطة يونانية بالفيتا والزيتون', 'Greek Salad with Feta and Olives', 'Salade grecque à la feta et aux olives', 'Ensalada griega con feta y aceitunas', 'Griechischer Salat mit Feta und Oliven', 'vegetable_mains', 'lunch', 5, 7, 12, 'tossing'),
  baklava: profile('بقلاوة بالجوز والعسل', 'Baklava with Walnuts and Honey', 'Baklava aux noix et au miel', 'Baklava con nueces y miel', 'Baklava mit Walnüssen und Honig', 'rice_cakes_sweets', 'snack', 6, 48, 22, 'baking'),
  dolmades: profile('أوراق عنب محشوة بالأرز', 'Dolmades, Stuffed Grape Leaves', 'Dolmades, feuilles de vigne farcies', 'Dolmadas, hojas de parra rellenas', 'Dolmades, gefüllte Weinblätter', 'street_snacks', 'snack', 4, 18, 6, 'simmering'),
  saganaki: profile('ساغاناكي جبن مقلي', 'Saganaki Fried Cheese', 'Saganaki, fromage frit', 'Saganaki, queso frito', 'Saganaki, gebratener Käse', 'street_snacks', 'snack', 18, 6, 20, 'pan_frying'),
  tzatziki: profile('تزاتزيكي بالخيار والثوم', 'Tzatziki with Cucumber and Garlic', 'Tzatziki au concombre et à l’ail', 'Tzatziki con pepino y ajo', 'Tzatziki mit Gurke und Knoblauch', 'condiments_sauces', 'snack', 5, 4, 8, 'mixing'),
  kleftiko: profile('كليفتيكو ضأن مطهو بالليمون', 'Kleftiko Slow Lamb with Lemon', 'Kleftiko à l’agneau et au citron', 'Kleftiko de cordero al limón', 'Kleftiko, geschmortes Lamm mit Zitrone', 'meat_mains', 'dinner', 24, 3, 13, 'slow_cooking'),
  pastitsio: profile('باستيتسيو باللحم البقري الحلال', 'Pastitsio with Halal Beef', 'Pastitsio au bœuf halal', 'Pastitsio con ternera halal', 'Pastitsio mit Halal-Rind', 'noodle_dishes', 'dinner', 13, 22, 12, 'baking'),
  loukoumades: profile('لوكوماديس بالعسل والقرفة', 'Loukoumades with Honey and Cinnamon', 'Loukoumades au miel et à la cannelle', 'Loukoumades con miel y canela', 'Loukoumades mit Honig und Zimt', 'rice_cakes_sweets', 'snack', 4, 42, 13, 'frying'),
  galaktoboureko: profile('غالاكتوبوريكو بالسميد والكاسترد', 'Galaktoboureko Semolina Custard Pie', 'Galaktoboureko à la semoule', 'Galaktoboureko con sémola', 'Galaktoboureko mit Grießpudding', 'rice_cakes_sweets', 'snack', 6, 38, 12, 'baking'),
  avgolemono: profile('حساء أفغوليمونو بالدجاج والليمون', 'Avgolemono Chicken Lemon Soup', 'Soupe avgolemono au poulet et au citron', 'Sopa avgolemono de pollo y limón', 'Avgolemono, Hühner-Zitronensuppe', 'soups_stews', 'lunch', 8, 8, 5, 'simmering'),
  fasolada: profile('فاسولادا حساء الفاصولياء', 'Fasolada White Bean Soup', 'Fasolada aux haricots blancs', 'Fasolada de alubias blancas', 'Fasolada, weiße Bohnensuppe', 'soups_stews', 'lunch', 7, 19, 4, 'simmering'),
  gigantes: profile('فاصولياء غيغانتس بالطماطم', 'Gigantes Plaki, Giant Beans in Tomato', 'Gigantes plaki à la tomate', 'Gigantes plaki con tomate', 'Gigantes Plaki in Tomatensoße', 'vegetable_mains', 'dinner', 8, 22, 5, 'baking'),
  briam: profile('بريام خضار مشوية بالفرن', 'Briam Roasted Vegetables', 'Briam de légumes rôtis', 'Briam de verduras asadas', 'Briam, Ofengemüse', 'vegetable_mains', 'dinner', 3, 13, 7, 'roasting'),
  gemista: profile('خضار محشوة بالأرز والأعشاب', 'Gemista, Stuffed Tomatoes and Peppers', 'Gemista, tomates et poivrons farcis', 'Gemista, tomates y pimientos rellenos', 'Gemista, gefüllte Tomaten und Paprika', 'vegetable_mains', 'dinner', 4, 20, 5, 'baking'),
  youvetsi: profile('يوفتسي لحم ضأن بالأورزو', 'Youvetsi Lamb with Orzo', 'Youvetsi à l’agneau et à l’orzo', 'Youvetsi de cordero con orzo', 'Youvetsi, Lamm mit Kritharaki', 'meat_mains', 'dinner', 17, 22, 10, 'baking'),
  stifado: profile('ستيفادو لحم بقري بالبصل الصغير', 'Beef Stifado with Shallots', 'Stifado de bœuf aux échalotes', 'Stifado de ternera con chalotas', 'Rinder-Stifado mit Schalotten', 'meat_mains', 'dinner', 21, 8, 10, 'stewing'),
  soutzoukakia: profile('أسياخ لحم بقري بصلصة الطماطم', 'Soutzoukakia in Tomato Sauce, Halal Beef', 'Soutzoukakia à la sauce tomate au bœuf halal', 'Soutzoukakia en salsa de tomate de ternera halal', 'Soutzoukakia in Tomatensoße mit Halal-Rind', 'meat_mains', 'dinner', 17, 9, 11, 'simmering'),
  paidakia: profile('ضلوع ضأن مشوية بالأوريغانو', 'Paidakia Grilled Lamb Chops', 'Côtelettes d’agneau grillées à l’origan', 'Chuletas de cordero a la parrilla', 'Gegrillte Lammkoteletts mit Oregano', 'meat_mains', 'dinner', 25, 1, 15, 'grilling'),
  psari_plaki: profile('سمك بلاكي بالطماطم والخضار', 'Psari Plaki, Baked Fish with Tomatoes', 'Poisson plaki à la tomate', 'Pescado plaki con tomate', 'Plaki-Fisch mit Tomaten', 'fish_seafood', 'dinner', 20, 6, 7, 'baking'),
  octapodi: profile('أخطبوط مشوي بالليمون', 'Grilled Octopus with Lemon', 'Poulpe grillé au citron', 'Pulpo a la parrilla con limón', 'Gegrillter Oktopus mit Zitrone', 'fish_seafood', 'dinner', 17, 3, 6, 'grilling'),
  garides_saganaki: profile('جمبري ساغاناكي بالفيتا والطماطم', 'Shrimp Saganaki with Feta and Tomato', 'Crevettes saganaki à la feta et à la tomate', 'Gambas saganaki con feta y tomate', 'Garnelen-Saganaki mit Feta und Tomate', 'fish_seafood', 'dinner', 16, 6, 9, 'simmering'),
  melitzanosalata: profile('ميليتزانوسالاتا باذنجان مدخن', 'Melitzanosalata, Smoky Eggplant Dip', 'Melitzanosalata d’aubergines fumées', 'Melitzanosalata de berenjena ahumada', 'Melitzanosalata, Auberginen-Dip', 'condiments_sauces', 'snack', 2, 7, 6, 'roasting'),
  taramosalata: profile('تاراموسالاتا ببطارخ السمك', 'Taramosalata, Fish Roe Dip', 'Taramosalata aux œufs de poisson', 'Taramosalata de huevas de pescado', 'Taramosalata, Fischrogen-Dip', 'condiments_sauces', 'snack', 5, 4, 14, 'blending'),
  feta_me_meli: profile('فيتا مخبوزة بالعسل والسمسم', 'Baked Feta with Honey and Sesame', 'Feta au four au miel et au sésame', 'Feta al horno con miel y sésamo', 'Ofenfeta mit Honig und Sesam', 'street_snacks', 'snack', 14, 10, 18, 'baking'),
  horiatiko_psomi: profile('خبز ريفي تقليدي', 'Greek Village Bread', 'Pain de village grec', 'Pan de pueblo griego', 'Griechisches Dorfbrot', 'breakfast_items', 'breakfast', 9, 52, 3, 'baking'),
  rizogalo: profile('ريزوغالو أرز بالحليب والقرفة', 'Rizogalo Rice Pudding with Cinnamon', 'Rizogalo à la cannelle', 'Rizogalo con canela', 'Rizogalo, Milchreis mit Zimt', 'rice_cakes_sweets', 'snack', 4, 24, 5, 'simmering'),
};

export const EXPANSION_REGIONAL_RECIPES = {
  herb_chicken: profile('دجاج مشوي بالأعشاب', 'Herb-Roasted Chicken', 'Poulet rôti aux herbes', 'Pollo asado a las hierbas', 'Kräuter-Brathähnchen', 'poultry_mains', 'dinner', 22, 2, 9, 'roasting'),
  tomato_rice: profile('أرز بالطماطم والفلفل', 'Tomato Pepper Rice', 'Riz à la tomate et au poivron', 'Arroz con tomate y pimiento', 'Tomaten-Paprika-Reis', 'rice_dishes', 'lunch', 4, 27, 5, 'simmering'),
  bean_salad: profile('سلطة الفاصولياء بالبقدونس', 'White Bean Salad with Parsley', 'Salade de haricots blancs au persil', 'Ensalada de alubias con perejil', 'Weißer Bohnensalat mit Petersilie', 'vegetable_mains', 'lunch', 8, 18, 5, 'tossing'),
  lemon_potatoes: profile('بطاطس مشوية بالليمون', 'Lemon Roasted Potatoes', 'Pommes de terre rôties au citron', 'Patatas asadas al limón', 'Zitronen-Röstkartoffeln', 'vegetable_mains', 'dinner', 3, 24, 6, 'roasting'),
};

export const EXPANSION_NATIONAL_RECIPES = {
  pastitsada: profile('باستيتسادا دجاج بالطماطم والقرفة', 'Pastitsada Chicken with Tomato and Cinnamon', 'Pastitsada au poulet et à la cannelle', 'Pastitsada de pollo con tomate y canela', 'Pastitsada, Hähnchen mit Tomate und Zimt', 'poultry_mains', 'dinner', 20, 10, 9, 'stewing'),
  sofrito: profile('سوفريتو لحم عجل بالثوم والبقدونس', 'Sofrito Veal with Garlic and Parsley', 'Sofrito de veau à l’ail et au persil', 'Sofrito de ternera con ajo y perejil', 'Sofrito, Kalbfleisch mit Knoblauch', 'meat_mains', 'dinner', 22, 5, 11, 'braising'),
  bourdeto: profile('بورديتو سمك حار بالبابريكا', 'Bourdeto Spicy Fish Stew', 'Bourdeto de poisson épicé', 'Bourdeto de pescado picante', 'Bourdeto, scharfer Fischeintopf', 'fish_seafood', 'dinner', 19, 5, 6, 'simmering'),
  bianco: profile('بيانكو سمك بالثوم والليمون', 'Bianco Fish with Garlic and Lemon', 'Bianco de poisson à l’ail et au citron', 'Bianco de pescado con ajo y limón', 'Bianco, Fisch mit Knoblauch und Zitrone', 'fish_seafood', 'dinner', 20, 4, 7, 'simmering'),
  savoro: profile('سافورو سمك متبل بالخل وإكليل الجبل', 'Savoro Fish with Vinegar and Rosemary', 'Savoro de poisson au vinaigre et au romarin', 'Savoro de pescado con vinagre y romero', 'Savoro, Fisch mit Essig und Rosmarin', 'fish_seafood', 'dinner', 18, 6, 8, 'marinating'),
  bouyiourdi: profile('بويووردي فيتا بالطماطم والفلفل', 'Bouyiourdi Baked Feta with Tomato and Peppers', 'Bouyiourdi à la feta, tomate et poivrons', 'Bouyiourdi con feta, tomate y pimientos', 'Bouyiourdi, Ofenfeta mit Tomate und Paprika', 'street_snacks', 'snack', 11, 8, 13, 'baking'),
  keftedes: profile('كفتيدس لحم بقري بالنعناع', 'Keftedes, Greek Beef Meatballs with Mint', 'Keftedes au bœuf et à la menthe', 'Keftedes de ternera con menta', 'Keftedes, Hackbällchen mit Minze', 'meat_mains', 'dinner', 18, 6, 11, 'frying'),
  biftekia: profile('بيفتيكيا مشوية بالأوريغانو', 'Biftekia Grilled Beef Patties', 'Biftekia grillés à l’origan', 'Biftekia a la parrilla con orégano', 'Biftekia, gegrillte Rinderfrikadellen', 'meat_mains', 'dinner', 20, 5, 12, 'grilling'),
  giouvarlakia: profile('يوفارلاكيا بمرق الليمون', 'Giouvarlakia Meatball Soup with Lemon', 'Giouvarlakia en soupe au citron', 'Giouvarlakia en sopa de limón', 'Giouvarlakia, Hackbällchensuppe mit Zitrone', 'soups_stews', 'dinner', 12, 8, 7, 'simmering'),
  kakavia: profile('كاكافيا حساء الصيادين', 'Kakavia Fisherman Soup', 'Kakavia, soupe du pêcheur', 'Kakavia, sopa del pescador', 'Kakavia, Fischersuppe', 'soups_stews', 'dinner', 15, 6, 5, 'simmering'),
  revithada: profile('ريفيثادا حساء الحمص بالليمون', 'Revithada Chickpea Soup with Lemon', 'Revithada aux pois chiches et au citron', 'Revithada de garbanzos con limón', 'Revithada, Kichererbsensuppe mit Zitrone', 'soups_stews', 'lunch', 8, 21, 5, 'simmering'),
  fava: profile('فافا بالبصل والليمون', 'Santorini Fava with Onion and Lemon', 'Fava de Santorin à l’oignon et au citron', 'Fava de Santorini con cebolla y limón', 'Santorin-Fava mit Zwiebel und Zitrone', 'vegetable_mains', 'lunch', 8, 20, 5, 'simmering'),
  papoutsakia: profile('بابوتساكيا باذنجان محشو باللحم', 'Papoutsakia, Stuffed Eggplant with Halal Beef', 'Papoutsakia, aubergines farcies au bœuf halal', 'Papoutsakia, berenjenas rellenas de ternera halal', 'Papoutsakia, gefüllte Auberginen mit Halal-Rind', 'vegetable_mains', 'dinner', 10, 9, 11, 'baking'),
  arakas: profile('أراكاس بازلاء بالشبت والبصل', 'Arakas, Peas with Dill and Onion', 'Arakas aux petits pois et à l’aneth', 'Arakas con guisantes y eneldo', 'Arakas, Erbsen mit Dill und Zwiebel', 'vegetable_mains', 'lunch', 5, 13, 5, 'stewing'),
  spanakorizo: profile('سباناكوريزو أرز بالسبانخ', 'Spanakorizo, Spinach Rice', 'Spanakorizo au riz et aux épinards', 'Spanakorizo con arroz y espinacas', 'Spanakorizo, Spinatreis', 'rice_dishes', 'lunch', 4, 24, 6, 'simmering'),
  prasorizo: profile('براسوريزو أرز بالكراث', 'Prasorizo, Leek Rice', 'Prasorizo au riz et aux poireaux', 'Prasorizo con arroz y puerros', 'Prasorizo, Lauchreis', 'rice_dishes', 'lunch', 4, 25, 5, 'simmering'),
  horta: profile('خضار برية مسلوقة بزيت الزيتون', 'Horta, Boiled Wild Greens with Olive Oil', 'Horta, herbes bouillies à l’huile d’olive', 'Horta, hierbas hervidas con aceite de oliva', 'Horta, gekochte Wildkräuter mit Olivenöl', 'vegetable_mains', 'lunch', 3, 5, 6, 'boiling'),
  kolokithokeftedes: profile('كولوكيثوكفتيدس أقراص الكوسة', 'Kolokithokeftedes, Zucchini Fritters', 'Kolokithokeftedes, beignets de courgettes', 'Kolokithokeftedes, buñuelos de calabacín', 'Kolokithokeftedes, Zucchinipuffer', 'street_snacks', 'snack', 5, 14, 8, 'frying'),
  domatokeftedes: profile('دوماتوكفتيدس أقراص الطماطم', 'Tomatokeftedes, Santorini Tomato Fritters', 'Tomatokeftedes, beignets de tomate', 'Tomatokeftedes, buñuelos de tomate', 'Tomatokeftedes, Tomatenpuffer', 'street_snacks', 'snack', 3, 15, 7, 'frying'),
  tirokafteri: profile('تيروكافتيري جبن حار بالفلفل', 'Tirokafteri, Spicy Feta Dip', 'Tirokafteri à la feta épicée', 'Tirokafteri con feta picante', 'Tirokafteri, scharfer Feta-Dip', 'condiments_sauces', 'snack', 9, 4, 13, 'blending'),
  skordalia: profile('سكورداليا بالثوم والبطاطس', 'Skordalia, Garlic Potato Dip', 'Skordalia à l’ail et aux pommes de terre', 'Skordalia con ajo y patata', 'Skordalia, Knoblauch-Kartoffel-Dip', 'condiments_sauces', 'snack', 4, 18, 8, 'mashing'),
  elies: profile('زيتون متبل بالأعشاب', 'Marinated Olives with Herbs', 'Olives marinées aux herbes', 'Aceitunas marinadas con hierbas', 'Marinierte Oliven mit Kräutern', 'condiments_sauces', 'snack', 1, 4, 11, 'marinating'),
  ladera_fasolakia: profile('فاصوليا خضراء بزيت الزيتون والطماطم', 'Fasolakia Ladera, Green Beans in Olive Oil', 'Fasolakia ladera à l’huile d’olive', 'Fasolakia ladera con aceite de oliva', 'Fasolakia Ladera, grüne Bohnen in Olivenöl', 'vegetable_mains', 'lunch', 3, 12, 6, 'stewing'),
  revithokeftedes: profile('ريفيثوكفتيدس أقراص الحمص', 'Revithokeftedes, Chickpea Fritters', 'Revithokeftedes, beignets de pois chiches', 'Revithokeftedes, buñuelos de garbanzos', 'Revithokeftedes, Kichererbsenpuffer', 'street_snacks', 'snack', 7, 18, 9, 'frying'),
  kalitsounia: profile('كاليتسونيا بالجبن والنعناع', 'Kalitsounia, Cretan Cheese Pastries', 'Kalitsounia crétois au fromage', 'Kalitsounia cretenses con queso', 'Kalitsounia, kretische Käsetaschen', 'street_snacks', 'snack', 8, 26, 12, 'baking'),
  sfakianopita: profile('سفاكيانوبيتا بالجبن والعسل', 'Sfakianopita, Sfakia Cheese Pie with Honey', 'Sfakianopita au fromage et au miel', 'Sfakianopita con queso y miel', 'Sfakianopita, Käsefladen mit Honig', 'breakfast_items', 'breakfast', 9, 30, 11, 'pan_frying'),
  bougatsa: profile('بوغاتسا بالكاسترد والقرفة', 'Bougatsa with Custard and Cinnamon', 'Bougatsa à la crème et à la cannelle', 'Bougatsa con crema y canela', 'Bougatsa mit Pudding und Zimt', 'breakfast_items', 'breakfast', 6, 32, 12, 'baking'),
  diples: profile('ديبليس بالعسل والجوز', 'Diples with Honey and Walnuts', 'Diples au miel et aux noix', 'Diples con miel y nueces', 'Diples mit Honig und Walnüssen', 'rice_cakes_sweets', 'snack', 5, 46, 15, 'frying'),
  koulourakia: profile('كولوراكيا بالسمسم', 'Koulourakia Sesame Cookies', 'Koulourakia au sésame', 'Koulourakia con sésamo', 'Koulourakia mit Sesam', 'rice_cakes_sweets', 'snack', 7, 55, 13, 'baking'),
  melomakarona: profile('ميلوماكارونا بالعسل والجوز', 'Melomakarona Honey Walnut Cookies', 'Melomakarona au miel et aux noix', 'Melomakarona con miel y nueces', 'Melomakarona mit Honig und Walnüssen', 'rice_cakes_sweets', 'snack', 5, 50, 16, 'baking'),
  karidopita: profile('كاريدوبيتا كعكة الجوز بالقرفة', 'Karidopita Walnut Cake with Cinnamon', 'Karidopita aux noix et à la cannelle', 'Karidopita con nueces y canela', 'Karidopita, Walnusskuchen mit Zimt', 'rice_cakes_sweets', 'snack', 7, 44, 18, 'baking'),
};

export function B(profileRow, region) {
  const token = REGION_DEMONYM[region];
  if (!token) throw new Error(`Unknown Greece region: ${region}`);
  const extra = REGION_DIASPORA[region];
  const national = region === 'pan_greek';
  const descriptor = REGIONS.find(([id]) => id === region);
  return {
    id: '',
    nameAr: `${national ? '' : `${descriptor[1]} `}${profileRow.ar} ${token}`.trim(),
    nameEn: `${national ? 'Greek ' : `${descriptor[2]} `}${profileRow.en}`,
    nameFr: `${national ? 'Cuisine grecque : ' : `${descriptor[3]} `}${profileRow.fr}`,
    nameEs: `${national ? 'Cocina griega: ' : `${descriptor[4]} `}${profileRow.es}`,
    nameDe: `${national ? 'Griechische Küche: ' : `${descriptor[5]} `}${profileRow.de}`,
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
      if (!recipes[key]) throw new Error(`Unknown Greece recipe profile: ${key}`);
      rows.push(B(recipes[key], region));
    }
  }
  for (const key of nationalKeys) {
    if (!recipes[key]) throw new Error(`Unknown Greece recipe profile: ${key}`);
    rows.push(B(recipes[key], 'pan_greek'));
  }
  return rows;
}
