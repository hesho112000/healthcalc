// Generates scripts/libya-49-proposal.json — 49 NEW authentic Libyan dishes.
// Region tags: pan_libyan (general, per golden rule), regional cities, maghreb_shared.
// Strict kitchenAuthenticity: NO borrowing from Moroccan/Tunisian/Algerian/Gulf-owned rows.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// [name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100]
const ROWS = [
  // soups
  ['شربة ليبية', 'Libyan Sharba', 'Charba libyenne', 'Sharba libia', 'Libysche Scharba', 'soups', 'lunch', 'tripoli', 65],
  ['شربة القرع', 'Libyan Pumpkin Sharba', 'Charba au potiron', 'Sharba de calabaza', 'Kürbis-Scharba', 'soups', 'lunch', 'pan_libyan', 50],
  ['شربة المقرونة', 'Libyan Pasta Sharba', 'Charba aux pâtes', 'Sharba de pasta', 'Nudel-Scharba', 'soups', 'lunch', 'pan_libyan', 120],
  ['شربة الفاصوليا', 'Libyan Bean Sharba', 'Charba aux haricots', 'Sharba de judías', 'Bohnen-Scharba', 'soups', 'lunch', 'pan_libyan', 55],
  ['شربة السمك الليبية', 'Libyan Fish Sharba', 'Charba de poisson', 'Sharba de pescado', 'Fisch-Scharba', 'soups', 'lunch', 'zwara', 70],
  ['شربة النعناع والليمون', 'Libyan Mint and Lemon Sharba', 'Charba menthe et citron', 'Sharba de menta y limón', 'Minze-Zitronen-Scharba', 'soups', 'lunch', 'pan_libyan', 40],
  // salads_sides
  ['سلطة الأعشاب الليبية', 'Libyan Herb Salad', 'Salade aux herbes libyenne', 'Ensalada de hierbas libia', 'Libyscher Kräutersalat', 'salads_sides', 'lunch', 'pan_libyan', 45],
  ['سلطة الباذنجان المطبوخ', 'Libyan Cooked Eggplant Salad', 'Salade d’aubergines cuites', 'Ensalada de berenjena cocida', 'Salat aus gekochter Aubergine', 'salads_sides', 'lunch', 'sabratha', 70],
  ['سلطة الفوقة بالطماطم', 'Fouka Tomato Salad', 'Salade fouka à la tomate', 'Ensalada fouka de tomate', 'Fouka-Tomatensalat', 'salads_sides', 'lunch', 'benghazi', 50],
  ['سلطة الجزر بالبرتقال', 'Libyan Carrot and Orange Salad', 'Salade carotte et orange', 'Ensalada de zanahoria y naranja', 'Karotten-Orangen-Salat', 'salads_sides', 'lunch', 'pan_libyan', 60],
  ['سلطة النعناع بالخيار', 'Libyan Mint and Cucumber Salad', 'Salade menthe et concombre', 'Ensalada de menta y pepino', 'Minze-Gurken-Salat', 'salads_sides', 'lunch', 'pan_libyan', 50],
  // breads_pastries
  ['خبز الشعير الليبي', 'Libyan Barley Bread', 'Pain d’orge libyen', 'Pan de cebada libio', 'Libysches Gerstenbrot', 'breads_pastries', 'breakfast', 'pan_libyan', 210],
  ['الرقاق', 'Rgag Flatbread', 'Pain rgag', 'Pan rgag', 'Rgag-Fladenbrot', 'breads_pastries', 'breakfast', 'maghreb_shared', 260],
  ['الشراك', 'Cherrak Bread', 'Pain cherrak', 'Pan cherrak', 'Cherrak-Brot', 'breads_pastries', 'breakfast', 'pan_libyan', 270],
  ['خبز البطاطس الليبي', 'Libyan Potato Bread', 'Pain de pommes de terre libyen', 'Pan de patata libio', 'Libysches Kartoffelbrot', 'breads_pastries', 'breakfast', 'misrata', 185],
  // couscous_bazeen
  ['بازين باللحم', 'Bazin with Meat', 'Bazin à la viande', 'Bazin con carne', 'Bazin mit Fleisch', 'couscous_bazeen', 'lunch', 'pan_libyan', 175],
  ['بازين بالصوص الأخضر', 'Bazin with Green Sauce', 'Bazin à la sauce verte', 'Bazin con salsa verde', 'Bazin mit grüner Sauce', 'couscous_bazeen', 'lunch', 'pan_libyan', 165],
  ['بازين باللبن', 'Bazin with Buttermilk', 'Bazin au lait fermenté', 'Bazin con leche', 'Bazin mit Buttermilch', 'couscous_bazeen', 'lunch', 'benghazi', 140],
  ['بازين القرع', 'Pumpkin Bazin', 'Bazin au potiron', 'Bazin de calabaza', 'Kürbis-Bazin', 'couscous_bazeen', 'lunch', 'pan_libyan', 160],
  ['عصيدة باللحم والبصل', 'Asida with Meat and Onions', 'Assida à la viande et aux oignons', 'Asida con carne y cebolla', 'Asida mit Fleisch und Zwiebeln', 'couscous_bazeen', 'lunch', 'pan_libyan', 150],
  ['كسكسي بلحم الجمل', 'Couscous with Camel Meat', 'Couscous à la viande de chameau', 'Cuscús con carne de camello', 'Couscous mit Kamelfleisch', 'couscous_bazeen', 'lunch', 'kufra', 170],
  ['ريفيسة بالسردين', 'Reffissa with Sardines', 'Reffissa aux sardines', 'Reffissa con sardinas', 'Reffissa mit Sardinen', 'couscous_bazeen', 'lunch', 'zwara', 120],
  ['كسكسي بالبصل', 'Onion Couscous', 'Couscous aux oignons', 'Cuscús con cebolla', 'Zwiebel-Couscous', 'couscous_bazeen', 'lunch', 'maghreb_shared', 160],
  // main_dishes
  ['مقرونة بالسردين', 'Libyan Pasta with Sardines', 'Pâtes libyennes aux sardines', 'Pasta libia con sardinas', 'Libysche Pasta mit Sardinen', 'main_dishes', 'lunch', 'benghazi', 190],
  ['مقرونة باللحم والكبدة', 'Libyan Pasta with Meat and Liver', 'Pâtes libyennes à la viande et au foie', 'Pasta libia con carne e hígado', 'Libysche Pasta mit Fleisch und Leber', 'main_dishes', 'lunch', 'pan_libyan', 205],
  ['القلية الليبية', 'Libyan Qalyah Stew', 'Qalya libyenne (ragoût de viande)', 'Qalya libia (guiso de carne)', 'Libysches Qalya', 'main_dishes', 'lunch', 'pan_libyan', 140],
  ['كبدة طرابلسية', 'Tripoli-Style Liver', 'Foie à la tripolitaine', 'Hígado a la tripolitana', 'Leber nach Tripolis-Art', 'main_dishes', 'lunch', 'tripoli', 155],
  ['كوارع محمرة بالبصل', 'Braised Ox Feet with Onions', 'Pieds de bœuf braisés aux oignons', 'Patas de buey estofadas con cebolla', 'Geschmorte Ochsenschlappen mit Zwiebeln', 'main_dishes', 'lunch', 'sabratha', 180],
  ['كوسة محشية باللحم', 'Libyan Stuffed Zucchini', 'Courgettes farcies libyennes', 'Calabacines rellenos libios', 'Libysche gefüllte Zucchini', 'main_dishes', 'lunch', 'pan_libyan', 145],
  // grilled_meats
  ['كباب لحم ليبي', 'Libyan Meat Kebab', 'Kébab de viande libyen', 'Kebab de carne libio', 'Libyscher Fleischkebab', 'grilled_meats', 'lunch', 'pan_libyan', 200],
  ['لحم الجمل المشوي بالكمون', 'Grilled Camel with Cumin', 'Chameau grillé au cumin', 'Camello asado con comino', 'Gegrilltes Kamel mit Kreuzkümmel', 'grilled_meats', 'lunch', 'kufra', 185],
  ['دبابيس دجاج مشوية بالشرمولة', 'Chicken Drumsticks in Chermoula', 'Pilons de poulet à la chermoula', 'Muslos de pollo a la chermula', 'Hähnchenkeulen mit Chermoula', 'grilled_meats', 'lunch', 'pan_libyan', 175],
  ['كبدة دجاج مشوية بالبهارات', 'Spiced Grilled Chicken Liver', 'Foie de poulet grillé aux épices', 'Hígado de pollo asado con especias', 'Gewürzte gegrillte Hühnerleber', 'grilled_meats', 'lunch', 'pan_libyan', 150],
  ['لحم خروف مشوي بالكزبرة والثوم', 'Grilled Lamb with Cilantro and Garlic', 'Agneau grillé à la coriandre et à l’ail', 'Cordero asado con cilantro y ajo', 'Gegrilltes Lamm mit Koriander und Knoblauch', 'grilled_meats', 'lunch', 'ghadames', 190],
  // fish_seafood
  ['سمك مقلي بالفرملة الليبية', 'Libyan Fried Fish with Fermla', 'Poisson frit à la fermla libyenne', 'Pescado frito con fermla libia', 'Libyscher Bratfisch mit Fermla', 'fish_seafood', 'lunch', 'zwara', 150],
  ['البوري المشوي بالثوم', 'Grilled Mullet with Garlic', 'Mulet grillé à l’ail', 'Lisa asada con ajo', 'Gegrillte Meeräsche mit Knoblauch', 'fish_seafood', 'lunch', 'pan_libyan', 170],
  ['كاليماري مقلي بالبيض والليمون', 'Fried Calamari with Egg and Lemon', 'Calmars frits aux œufs et citron', 'Calamar frito con huevo y limón', 'Frittierter Tintenfisch mit Ei und Zitrone', 'fish_seafood', 'lunch', 'pan_libyan', 170],
  ['جمبري بصلصة الطماطم', 'Shrimp in Tomato Sauce', 'Crevettes à la sauce tomate', 'Gambas en salsa de tomate', 'Garnelen in Tomatensauce', 'fish_seafood', 'lunch', 'sabratha', 130],
  ['سردين مقلي بالزيت', 'Libyan Fried Sardines', 'Sardines frites libyennes', 'Sardinas fritas libias', 'Libysche Brat-Sardinen', 'fish_seafood', 'lunch', 'benghazi', 195],
  // sweets_desserts
  ['غريبة السميد', 'Semolina Ghoriba', 'Ghriba de semoule', 'Goriba de sémola', 'Ghoriba aus Grieß', 'sweets_desserts', 'snacks', 'pan_libyan', 445],
  ['بسبوسة ليبية بالتمر', 'Libyan Date Basbousa', 'Basboussa libyenne aux dattes', 'Basbusa libia de dátiles', 'Libysche Dattel-Basbousa', 'sweets_desserts', 'snacks', 'misrata', 415],
  ['الرقاق بالعسل والسمسم', 'Rgag with Honey and Sesame', 'Rgage au miel et sésame', 'Rgag con miel y sésamo', 'Rgag mit Honig und Sesam', 'sweets_desserts', 'snacks', 'pan_libyan', 430],
  ['خلطة التمر والمكسرات', 'Libyan Date and Nut Mix', 'Mélange libyen de dattes et noix', 'Mezcla libia de dátiles y nueces', 'Libysche Dattel-Nuss-Mischung', 'sweets_desserts', 'snacks', 'kufra', 385],
  ['اللوزية الليبية', 'Libyan Louziya Almond Sweet', 'Louzia libyenne aux amandes', 'Luguía libia de almendras', 'Libysches Mandelkonfekt', 'sweets_desserts', 'snacks', 'tripoli', 460],
  ['كعك المن', 'Kaak el Mann Honey Sweet', 'Kaak el Mann au miel', 'Kaak el Mann de miel', 'Kaak el Mann (Honiggebäck)', 'sweets_desserts', 'snacks', 'pan_libyan', 400],
  // dairy_eggs_fruits
  ['زبادي بالعسل واللوز', 'Yogurt with Honey and Almonds', 'Yaourt au miel et aux amandes', 'Yogur con miel y almendras', 'Joghurt mit Honig und Mandeln', 'dairy_eggs_fruits', 'breakfast', 'pan_libyan', 110],
  ['تين مجفف بلدي', 'Local Dried Figs', 'Figues sèches locales', 'Higos secos locales', 'Getrocknete Feigen', 'dairy_eggs_fruits', 'breakfast', 'ghadames', 65],
  ['عصيدة بالحليب والسكر', 'Asida with Milk and Sugar', 'Assida au lait et sucre', 'Asida con leche y azúcar', 'Asida mit Milch und Zucker', 'dairy_eggs_fruits', 'breakfast', 'pan_libyan', 130],
  ['جبنة بلدية مملحة', 'Salted Local Cheese', 'Fromage local salé', 'Queso local salado', 'Gesalzener lokaler Käse', 'dairy_eggs_fruits', 'breakfast', 'misrata', 280],
];

const categories = ['breakfast', 'breads_pastries', 'soups', 'salads_sides', 'couscous_bazeen', 'main_dishes', 'grilled_meats', 'fish_seafood', 'sweets_desserts', 'dairy_eggs_fruits'];
const regions = ['pan_libyan', 'maghreb_shared', 'tripoli', 'benghazi', 'misrata', 'zwara', 'sabratha', 'ghadames', 'kufra'];
const meal_types = ['breakfast', 'lunch', 'snacks'];

const dishes = ROWS.map((r) => ({
  name_ar: r[0], name_en: r[1], name_fr: r[2], name_es: r[3], name_de: r[4],
  category: r[5], mealType: r[6], region: r[7], cal_100: r[8],
}));

const guard = (cond, msg) => { if (!cond) { console.error(msg); process.exit(1); } };
guard(dishes.length === 49, `expected 49 dishes, got ${dishes.length}`);
dishes.forEach((d) => { guard(categories.includes(d.category), `bad category ${d.category}`); guard(regions.includes(d.region), `bad region ${d.region}`); guard(meal_types.includes(d.mealType), `bad mealType ${d.mealType}`); });
const names = dishes.map((d) => d.name_ar);
guard(new Set(names).size === names.length, 'duplicate Arabic names inside ROWS');
dishes.forEach((d) => guard(d.cal_100 >= 20 && d.cal_100 <= 900, `cal out of range ${d.cal_100}`));

const cats = {}; for (const d of dishes) cats[d.category] = (cats[d.category] || 0) + 1;
const rgns = {}; for (const d of dishes) rgns[d.region] = (rgns[d.region] || 0) + 1;

const out = { kitchen: 'libyan', target_total: 250, new_dishes: 49, categories, regions, meal_types, dishes };
fs.writeFileSync(path.join(__dirname, 'libya-49-proposal.json'), JSON.stringify(out, null, 2));
console.log('categories', JSON.stringify(cats));
console.log('regions', JSON.stringify(rgns));
console.log('total', dishes.length);
console.log('wrote scripts/libya-49-proposal.json');