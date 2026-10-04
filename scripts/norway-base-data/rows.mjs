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
};

export const EXPANSION_REGIONAL_RECIPES = {
  grilled_salmon: BASE_REGIONAL_RECIPES.grilled_salmon,
  root_veg_stew: BASE_REGIONAL_RECIPES.root_veg_stew,
  barley_soup: BASE_REGIONAL_RECIPES.barley_soup,
  rye_breakfast: BASE_REGIONAL_RECIPES.rye_breakfast,
};

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
