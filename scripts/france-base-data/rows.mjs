export const BASE_DIASPORA = ['french', 'western', 'comfort_food'];
export const REGION_DIASPORA = { paris: 'parisian', provence: 'mediterranean' };

// Each anchor owns one stable Arabic token; no French row belongs in asian_shared.
export const REGION_DEMONYM = {
  pan_french: 'فرنسي',
  paris: 'باريسي',
  normandy: 'نورماندي',
  provence: 'بروفنسي',
  lyon: 'ليوني',
  bordeaux: 'بوردوي',
  alsace: 'ألزاسي',
  brittany: 'بريتوني',
  burgundy: 'بورغندي',
  toulouse: 'تولوزي',
  marseille: 'مارسيلي',
  loire: 'لوارَوي',
  corsica: 'كورسيكي',
};

const REGIONS = [
  ['pan_french', 'مطابخ فرنسا', 'French', 'française', 'francesa', 'französische'],
  ['paris', 'مطابخ باريس', 'Parisian', 'À la parisienne :', 'Al estilo parisino:', 'Pariser Art:'],
  ['normandy', 'مطابخ نورمانيا', 'Norman', 'À la normande :', 'Al estilo normando:', 'Normannische Art:'],
  ['provence', 'مطابخ بروفانس', 'Provençal', 'À la provençale :', 'Al estilo provenzal:', 'Provenzalische Art:'],
  ['lyon', 'مطابخ ليون', 'Lyonnaise', 'À la lyonnaise :', 'Al estilo lionés:', 'Lyoner Art:'],
  ['bordeaux', 'مطابخ بوردو', 'Bordelais', 'À la bordelaise :', 'Al estilo bordelés:', 'Bordelaiser Art:'],
  ['alsace', 'مطابخ الألزاس', 'Alsatian', 'À l’alsacienne :', 'Al estilo alsaciano:', 'Elsässische Art:'],
  ['brittany', 'مطابخ بريتاني', 'Breton', 'À la bretonne :', 'Al estilo bretón:', 'Bretonische Art:'],
  ['burgundy', 'مطابخ بورغونيا', 'Burgundian', 'À la bourguignonne :', 'Al estilo borgoñón:', 'Burgundische Art:'],
  ['toulouse', 'مطابخ تولوز', 'Toulouse', 'À la toulousaine :', 'Al estilo tolosano:', 'Toulouser Art:'],
  ['marseille', 'مطابخ مرسيليا', 'Marseille', 'À la marseillaise :', 'Al estilo marsellés:', 'Marseiller Art:'],
  ['loire', 'مطابخ وادي اللوار', 'Loire Valley', 'À la ligérienne :', 'Al estilo del Loira:', 'Loiretal-Art:'],
  ['corsica', 'مطابخ كورسيكا', 'Corsican', 'À la corse :', 'Al estilo corso:', 'Korsische Art:'],
];

const profile = (ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking) =>
  ({ ar, en, fr, es, de, category, meal, protein, carbs, fat, cooking });

export const BASE_REGIONAL_RECIPES = {
  herb_chicken: profile('دجاج مشوي بالأعشاب', 'Herb-Roasted Chicken', 'Poulet rôti aux herbes', 'Pollo asado a las hierbas', 'Kräuter-Brathähnchen', 'poultry_mains', 'dinner', 22, 2, 9, 'roasting'),
  market_tart: profile('تارت الخضار الموسمية', 'Market Vegetable Tart', 'Tarte aux légumes du marché', 'Tarta de verduras de temporada', 'Marktgemüsetarte', 'vegetable_mains', 'lunch', 8, 24, 12, 'baking'),
  fish_ragout: profile('يخنة السمك بالأعشاب', 'Herbed Fish Ragout', 'Ragoût de poisson aux herbes', 'Guiso de pescado a las hierbas', 'Kräuter-Fischragout', 'fish_seafood', 'dinner', 19, 8, 7, 'simmering'),
  apple_cake: profile('كعكة التفاح واللوز', 'Apple Almond Cake', 'Gâteau aux pommes et aux amandes', 'Pastel de manzana y almendra', 'Apfel-Mandel-Kuchen', 'rice_cakes_sweets', 'snack', 6, 39, 13, 'baking'),
  beef_shallot: profile('لحم البقر بالكراث', 'Beef with Shallots', 'Bœuf aux échalotes', 'Ternera con chalotas', 'Rindfleisch mit Schalotten', 'meat_mains', 'dinner', 23, 5, 14, 'braising'),
  lentil_soup: profile('حساء العدس بالخضار', 'Lentil Vegetable Soup', 'Soupe de lentilles aux légumes', 'Sopa de lentejas y verduras', 'Linsengemüsesuppe', 'soups_stews', 'lunch', 8, 20, 5, 'simmering'),
  cheese_galette: profile('غاليت الجبن والبصل', 'Cheese and Onion Galette', 'Galette au fromage et aux oignons', 'Galette de queso y cebolla', 'Käse-Zwiebel-Galette', 'street_snacks', 'snack', 12, 27, 15, 'baking'),
  bean_stew: profile('يخنة الفاصولياء البيضاء', 'White Bean Herb Stew', 'Mijoté de haricots blancs aux herbes', 'Estofado de alubias blancas y hierbas', 'Weiße-Bohnen-Kräutereintopf', 'soups_stews', 'dinner', 10, 25, 7, 'stewing'),
  lemon_trout: profile('سمك التروت بالليمون', 'Lemon Trout', 'Truite au citron', 'Trucha al limón', 'Forelle mit Zitrone', 'fish_seafood', 'dinner', 21, 2, 9, 'grilling'),
  pear_tart: profile('تارت الكمثرى والجوز', 'Pear and Walnut Tart', 'Tarte aux poires et aux noix', 'Tarta de pera y nueces', 'Birnen-Walnuss-Tarte', 'rice_cakes_sweets', 'snack', 5, 41, 15, 'baking'),
  potato_gratin: profile('غراتان البطاطس بالثوم', 'Garlic Potato Gratin', 'Gratin de pommes de terre à l’ail', 'Gratén de patata al ajo', 'Knoblauch-Kartoffelgratin', 'vegetable_mains', 'dinner', 7, 25, 12, 'baking'),
  herb_omelette: profile('عجة الأعشاب والجبن', 'Herb and Cheese Omelette', 'Omelette aux herbes et au fromage', 'Tortilla de hierbas y queso', 'Kräuter-Käse-Omelett', 'breakfast_items', 'breakfast', 13, 4, 12, 'pan_frying'),
};

export const BASE_NATIONAL_RECIPES = {
  coq_raisin: profile('دجاج مطهو بعصير العنب', 'Coq au Vin with Grape Juice (Halal)', 'Coq au Vin halal au jus de raisin', 'Pollo halal al estilo Coq au Vin con zumo de uva', 'Halales Coq au Vin Huhn mit Traubensaft', 'poultry_mains', 'dinner', 22, 6, 10, 'braising'),
  boeuf_bourguignon: profile('لحم بقري بورغندي حلال', 'Bœuf Bourguignon with Halal Beef, No Wine', 'Bœuf bourguignon au bœuf halal, sans vin', 'Boeuf bourguignon con ternera halal, sin vino', 'Bœuf Bourguignon mit Halal-Rind, ohne Wein', 'meat_mains', 'dinner', 23, 8, 12, 'braising'),
  cassoulet: profile('كاسوليه بالفاصولياء وبط السلال', 'Cassoulet with Halal Duck and Beef Sausage', 'Cassoulet aux haricots, canard et saucisse de bœuf halal', 'Cassoulet de alubias con pato y salchicha halal de res', 'Cassoulet mit Bohnen, Ente und Halal-Rinderwurst', 'meat_mains', 'dinner', 19, 18, 11, 'slow_cooking'),
  ratatouille: profile('راتاتوي بالخضار الصيفية', 'Ratatouille of Summer Vegetables', 'Ratatouille aux légumes d’été', 'Ratatouille de verduras de verano', 'Ratatouille aus Sommergemüse', 'vegetable_mains', 'dinner', 3, 12, 7, 'stewing'),
  quiche_lorraine: profile('كيش لورين بديك رومي مدخن', 'Quiche Lorraine with Turkey Bacon (Halal)', 'Quiche lorraine halal à la dinde fumée', 'Quiche Lorraine halal con pavo ahumado', 'Halale Quiche Lorraine mit Putenrauchfleisch', 'breakfast_items', 'breakfast', 12, 22, 18, 'baking'),
  croque_monsieur: profile('ساندويتش جبن وديك رومي محمص', 'Croque Monsieur with Halal Turkey', 'Croque-monsieur au fromage et à la dinde halal', 'Croque monsieur de queso y pavo halal', 'Croque Monsieur mit Halal-Pute und Käse', 'street_snacks', 'lunch', 17, 29, 14, 'grilling'),
  bouillabaisse: profile('حساء مرسيليا بالسمك والزعفران', 'Marseille Bouillabaisse with Saffron', 'Bouillabaisse de Marseille au safran', 'Bullabesa marsellesa al azafrán', 'Marseiller Bouillabaisse mit Safran', 'fish_seafood', 'dinner', 17, 8, 6, 'simmering'),
  crepes: profile('كريب فرنسي رقيق', 'French Butter Crêpes', 'Crêpes françaises au beurre', 'Crepes francesas con mantequilla', 'Französische Butter-Crêpes', 'breakfast_items', 'breakfast', 7, 34, 10, 'pan_frying'),
  souffle: profile('سوفليه الجبن الهوائي', 'Cheese Soufflé', 'Soufflé au fromage', 'Soufflé de queso', 'Käsesoufflé', 'vegetable_mains', 'dinner', 13, 9, 11, 'baking'),
  tarte_tatin: profile('تارت التفاح المقلوبة', 'Apple Tarte Tatin', 'Tarte Tatin aux pommes', 'Tarta Tatin de manzana', 'Apfel-Tarte-Tatin', 'rice_cakes_sweets', 'snack', 3, 43, 14, 'baking'),
  creme_brulee: profile('كريم بروليه بالفانيليا', 'Vanilla Crème Brûlée', 'Crème brûlée à la vanille', 'Crema quemada de vainilla', 'Vanille-Crème-brûlée', 'rice_cakes_sweets', 'snack', 5, 24, 17, 'baking'),
  macarons: profile('ماكرون اللوز والفانيليا', 'Almond Vanilla Macarons', 'Macarons aux amandes et à la vanille', 'Macarons de almendra y vainilla', 'Mandel-Vanille-Macarons', 'rice_cakes_sweets', 'snack', 7, 69, 12, 'baking'),
  baguette: profile('خبز باغيت فرنسي', 'Traditional French Baguette', 'Baguette traditionnelle française', 'Baguette tradicional francesa', 'Traditionelles französisches Baguette', 'breakfast_items', 'breakfast', 9, 56, 2, 'baking'),
  onion_soup: profile('حساء البصل الفرنسي بالجبن', 'French Onion Soup with Cheese', 'Soupe à l’oignon gratinée au fromage', 'Sopa de cebolla gratinada con queso', 'Französische Zwiebelsuppe mit Käse', 'soups_stews', 'lunch', 7, 14, 7, 'simmering'),
  steak_frites: profile('لحم بقري مشوي مع البطاطس', 'Halal Beef Steak Frites', 'Steak de bœuf halal et pommes frites', 'Filete de res halal con patatas fritas', 'Halales Rindersteak mit Pommes frites', 'meat_mains', 'dinner', 25, 24, 18, 'grilling'),
  salade_lyonnaise: profile('سلطة ليون بالبيض والديك الرومي', 'Lyon Salad with Egg and Turkey', 'Salade lyonnaise à l’œuf et à la dinde', 'Ensalada lionesa con huevo y pavo', 'Lyoner Salat mit Ei und Pute', 'vegetable_mains', 'lunch', 13, 7, 12, 'tossing'),
  panisse: profile('بانيس مقرمش من الحمص', 'Crisp Chickpea Panisse', 'Panisse croustillante aux pois chiches', 'Panisse crujiente de garbanzos', 'Knusprige Kichererbsen-Panisse', 'street_snacks', 'snack', 8, 31, 9, 'frying'),
  pommes_anna: profile('بطاطس آنا بالزبدة', 'Pommes Anna Layered Potatoes', 'Pommes Anna aux pommes de terre et beurre', 'Patatas Anna en capas con mantequilla', 'Pommes Anna mit Kartoffeln und Butter', 'vegetable_mains', 'dinner', 4, 25, 12, 'baking'),
  poulet_chasseur: profile('دجاج الصياد بمرق العنب', 'Chicken Chasseur with Grape Juice Stock', 'Poulet chasseur halal au jus de raisin', 'Pollo cazador halal con caldo y zumo de uva', 'Halales Jägerhuhn mit Traubensaftfond', 'poultry_mains', 'dinner', 21, 7, 9, 'braising'),
};

export const EXPANSION_REGIONAL_RECIPES = {
  mustard_chicken: profile('دجاج بالخردل والأعشاب', 'Mustard Herb Chicken', 'Poulet à la moutarde et aux herbes', 'Pollo a la mostaza y hierbas', 'Senf-Kräuter-Hähnchen', 'poultry_mains', 'dinner', 23, 3, 10, 'roasting'),
  squash_potage: profile('حساء القرع والكستناء', 'Squash and Chestnut Potage', 'Velouté de courge et de châtaignes', 'Crema de calabaza y castañas', 'Kürbis-Maronen-Suppe', 'soups_stews', 'lunch', 4, 19, 6, 'simmering'),
  herb_cod: profile('سمك القد بقشرة الأعشاب', 'Herb-Crusted Cod', 'Cabillaud en croûte d’herbes', 'Bacalao con costra de hierbas', 'Kabeljau mit Kräuterkruste', 'fish_seafood', 'dinner', 22, 9, 8, 'baking'),
  mushroom_galette: profile('غاليت الفطر والبصل', 'Mushroom Onion Galette', 'Galette aux champignons et aux oignons', 'Galette de setas y cebolla', 'Pilz-Zwiebel-Galette', 'street_snacks', 'lunch', 8, 26, 13, 'baking'),
  beef_carrot: profile('لحم بقري مطهو بالجزر', 'Slow-Braised Beef and Carrots', 'Bœuf mijoté aux carottes et au jus de raisin', 'Ternera estofada con zanahorias y zumo de uva', 'Rinderschmorbraten mit Karotten und Traubensaft', 'meat_mains', 'dinner', 22, 10, 12, 'slow_cooking'),
  spinach_tart: profile('تارت السبانخ وجبن الماعز', 'Spinach and Goat Cheese Tart', 'Tarte aux épinards et au chèvre', 'Tarta de espinacas y queso de cabra', 'Spinat-Ziegenkäse-Tarte', 'vegetable_mains', 'lunch', 10, 21, 14, 'baking'),
  orange_duck: profile('بط بالبرتقال والزعتر', 'Orange Thyme Duck', 'Canard à l’orange et au thym', 'Pato a la naranja y al tomillo', 'Ente mit Orange und Thymian', 'meat_mains', 'dinner', 21, 10, 15, 'roasting'),
  chicken_lentils: profile('دجاج بالعدس والكراث', 'Chicken with Lentils and Leeks', 'Poulet aux lentilles et aux poireaux', 'Pollo con lentejas y puerros', 'Hähnchen mit Linsen und Lauch', 'poultry_mains', 'dinner', 21, 16, 8, 'stewing'),
  pear_clafoutis: profile('كلافوتي الكمثرى والفانيليا', 'Pear Vanilla Clafoutis', 'Clafoutis aux poires et à la vanille', 'Clafoutis de pera y vainilla', 'Birnen-Vanille-Clafoutis', 'rice_cakes_sweets', 'snack', 6, 32, 9, 'baking'),
  potato_galette: profile('غاليت البطاطس وإكليل الجبل', 'Rosemary Potato Galette', 'Galette de pommes de terre au romarin', 'Galette de patata al romero', 'Rosmarin-Kartoffel-Galette', 'vegetable_mains', 'dinner', 5, 27, 11, 'baking'),
  mushroom_souffle: profile('سوفليه الفطر والجبن', 'Mushroom Cheese Soufflé', 'Soufflé aux champignons et au fromage', 'Soufflé de setas y queso', 'Pilz-Käsesoufflé', 'vegetable_mains', 'dinner', 12, 10, 12, 'baking'),
  leek_potato: profile('حساء الكراث والبطاطس', 'Leek and Potato Soup', 'Soupe de poireaux et pommes de terre', 'Sopa de puerro y patata', 'Lauch-Kartoffel-Suppe', 'soups_stews', 'lunch', 5, 16, 6, 'simmering'),
};

export const EXPANSION_NATIONAL_RECIPES = {
  salade_nicoise: profile('سلطة نيس بالتونة والبيض', 'Salade Niçoise with Tuna and Egg', 'Salade niçoise au thon et à l’œuf', 'Ensalada nizarda con atún y huevo', 'Nizza-Salat mit Thunfisch und Ei', 'fish_seafood', 'lunch', 16, 9, 10, 'tossing'),
  pissaladiere: profile('فطيرة بصل الأنشوفة', 'Pissaladière with Anchovy and Onion', 'Pissaladière aux anchois et aux oignons', 'Pissaladière de anchoas y cebolla', 'Pissaladière mit Sardellen und Zwiebeln', 'street_snacks', 'lunch', 10, 34, 12, 'baking'),
  brandade: profile('برانداد سمك القد بزيت الزيتون', 'Cod Brandade with Olive Oil', 'Brandade de morue à l’huile d’olive', 'Brandada de bacalao con aceite de oliva', 'Kabeljau-Brandade mit Olivenöl', 'fish_seafood', 'dinner', 19, 12, 11, 'baking'),
  dauphinois: profile('غراتان دوفينوا بالكريمة', 'Gratin Dauphinois', 'Gratin dauphinois à la crème', 'Gratén dauphinois con nata', 'Gratin Dauphinois mit Sahne', 'vegetable_mains', 'dinner', 6, 24, 14, 'baking'),
  pot_au_feu: profile('بوت أو فو بلحم بقري حلال', 'Pot-au-Feu with Halal Beef', 'Pot-au-feu au bœuf halal et aux légumes', 'Pot-au-feu de ternera halal con verduras', 'Pot-au-feu mit Halal-Rind und Gemüse', 'meat_mains', 'dinner', 20, 8, 9, 'simmering'),
  flammekueche: profile('فطيرة ألزاسية بالديك الرومي', 'Alsatian Tart with Smoked Turkey', 'Tarte flambée alsacienne à la dinde fumée', 'Tarta alsaciana con pavo ahumado', 'Elsässer Flammkuchen mit Putenrauchfleisch', 'street_snacks', 'lunch', 12, 32, 13, 'baking'),
  socca: profile('سوكّا الحمص بزيت الزيتون', 'Chickpea Socca with Olive Oil', 'Socca niçoise à l’huile d’olive', 'Socca nizarda con aceite de oliva', 'Kichererbsen-Socca mit Olivenöl', 'street_snacks', 'snack', 8, 31, 8, 'baking'),
  cherry_clafoutis: profile('كلافوتي الكرز', 'Cherry Clafoutis', 'Clafoutis aux cerises', 'Clafoutis de cerezas', 'Kirsch-Clafoutis', 'rice_cakes_sweets', 'snack', 6, 34, 8, 'baking'),
  gougeres: profile('غوجير الجبن المخبوزة', 'Baked Cheese Gougères', 'Gougères au fromage cuites au four', 'Gougères de queso al horno', 'Gebackene Käse-Gougères', 'street_snacks', 'snack', 12, 25, 14, 'baking'),
  pike_quenelles: profile('كينيل سمك الكراكي', 'Pike Fish Quenelles', 'Quenelles de brochet', 'Quenelles de lucio', 'Hechtfisch-Quenelles', 'fish_seafood', 'dinner', 17, 14, 9, 'poaching'),
  orange_chicken: profile('دجاج بالبرتقال والزيتون', 'Orange Olive Chicken', 'Poulet à l’orange et aux olives', 'Pollo a la naranja y aceitunas', 'Orangen-Oliven-Hähnchen', 'poultry_mains', 'dinner', 22, 8, 11, 'roasting'),
  pan_bagnat: profile('ساندويتش نيس بالتونة والخضار', 'Pan Bagnat Tuna Sandwich', 'Pan bagnat niçois au thon et aux légumes', 'Pan bagnat nizardo de atún y verduras', 'Nizza-Sandwich Pan Bagnat mit Thunfisch', 'street_snacks', 'lunch', 17, 33, 12, 'assembling'),
  pistou_soup: profile('حساء الخضار بصلصة البيستو', 'Vegetable Soup with Pistou', 'Soupe au pistou aux légumes', 'Sopa de verduras con pistou', 'Gemüsesuppe mit Pistou', 'soups_stews', 'lunch', 7, 19, 7, 'simmering'),
  hachis: profile('هاشي بارمانتييه بلحم بقري حلال', 'Hachis Parmentier with Halal Beef', 'Hachis parmentier au bœuf halal', 'Hachis parmentier de ternera halal', 'Hachis Parmentier mit Halal-Rind', 'meat_mains', 'dinner', 16, 20, 12, 'baking'),
  apple_tart: profile('تارت التفاح بالقرفة', 'Apple Cinnamon Tart', 'Tarte aux pommes et à la cannelle', 'Tarta de manzana y canela', 'Apfel-Zimt-Tarte', 'rice_cakes_sweets', 'snack', 4, 42, 13, 'baking'),
  zucchini_gratin: profile('غراتان الكوسة بالجبن', 'Zucchini Cheese Gratin', 'Gratin de courgettes au fromage', 'Gratén de calabacín con queso', 'Zucchini-Käse-Gratin', 'vegetable_mains', 'dinner', 9, 12, 12, 'baking'),
  lentil_salad: profile('سلطة العدس بالخردل', 'Mustard Lentil Salad', 'Salade de lentilles à la moutarde', 'Ensalada de lentejas a la mostaza', 'Linsensalat mit Senf', 'vegetable_mains', 'lunch', 10, 18, 7, 'tossing'),
  chicken_volaille: profile('دجاج بالكريمة والفطر', 'Chicken with Cream and Mushrooms', 'Poulet à la crème et aux champignons', 'Pollo con nata y champiñones', 'Hähnchen mit Sahne und Pilzen', 'poultry_mains', 'dinner', 23, 5, 13, 'simmering'),
  almond_financier: profile('كيكة اللوز الصغيرة', 'Almond Financier Cakes', 'Financiers aux amandes', 'Bizcochos financier de almendra', 'Mandel-Financiers', 'rice_cakes_sweets', 'snack', 7, 42, 18, 'baking'),
};

export function B(profileRow, region) {
  const token = REGION_DEMONYM[region];
  if (!token) throw new Error(`Unknown France region: ${region}`);
  const extra = REGION_DIASPORA[region];
  const national = region === 'pan_french';
  const descriptor = REGIONS.find(([id]) => id === region);
  return {
    id: '',
    nameAr: `${national ? '' : `${descriptor[1]} `}${profileRow.ar} ${token}`.trim(),
    nameEn: `${national ? 'French ' : `${descriptor[2]} `}${profileRow.en}`,
    nameFr: `${national ? 'Cuisine française : ' : `${descriptor[3]} `}${profileRow.fr}`,
    nameEs: `${national ? 'Cocina francesa: ' : `${descriptor[4]} `}${profileRow.es}`,
    nameDe: `${national ? 'Französische Küche: ' : `${descriptor[5]} `}${profileRow.de}`,
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
      if (!recipes[key]) throw new Error(`Unknown France recipe profile: ${key}`);
      rows.push(B(recipes[key], region));
    }
  }
  for (const key of nationalKeys) {
    if (!recipes[key]) throw new Error(`Unknown France recipe profile: ${key}`);
    rows.push(B(recipes[key], 'pan_french'));
  }
  return rows;
}
