// Generates scripts/lebanon-51-proposal.json — 51 MORE authentic Lebanese dishes to bring
// the accessible Lebanese pool to exactly 300 (99 legacy + 150 already proposed + 51 here).
// Same LEBANESE_REGION_META set; golden rule: keep it general (pan_lebanese).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// [name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100]
const ROWS = [
  // mezze_appetizers
  ['متبل الشمندر', 'Beetroot Mutabbal', 'Mutabbal de betterave', 'Mutabal de remolacha', 'Rote-Bete-Mutabal', 'mezze_appetizers', 'snacks', 'pan_lebanese', 70],
  ['بابا غنوج بالرمان', 'Baba Ghanouj with Pomegranate', 'Baba ganoush à la grenade', 'Baba ghanoush con granada', 'Baba-Ghanoush mit Granatapfel', 'mezze_appetizers', 'snacks', 'pan_lebanese', 90],
  ['فتة اللبن', 'Laban Fatteh', 'Fatté au laban', 'Fatteh de laban', 'Laban-Fatteh', 'mezze_appetizers', 'snacks', 'pan_lebanese', 125],
  ['حلوم بالزعتر والليمون', 'Halloumi with Zaatar and Lemon', 'Halloumi au zaatar et citron', 'Halloumi con zaatar y limón', 'Halloumi mit Zaatar und Zitrone', 'mezze_appetizers', 'snacks', 'pan_lebanese', 185],
  ['طرشي القرنبيط والجزر', 'Cauliflower and Carrot Pickles', 'Pickles de chou-fleur et carottes', 'Encurtidos de coliflor y zanahoria', 'Blumenkohl-Karotten-Gurken', 'mezze_appetizers', 'snacks', 'pan_lebanese', 30],
  ['بطاطا متبلة بالزعتر البلدي', 'Zaatar Seasoned Potatoes', 'Pommes de terre au zaatar', 'Patatas con zaatar', 'Zaatar-Kartoffeln', 'mezze_appetizers', 'snacks', 'pan_lebanese', 135],
  ['حمص محمص بالبهارات', 'Spiced Roasted Chickpeas', 'Pois chiches rôtis aux épices', 'Garbanzos tostados con especias', 'Gewürzte geröstete Kichererbsen', 'mezze_appetizers', 'snacks', 'pan_lebanese', 185],
  ['فول وحمص مسلوقان بالملح', 'Boiled Fava and Chickpeas', 'Fèves et pois chiches bouillis', 'Habas y garbanzos hervidos', 'Gekochte Bohnen und Kichererbsen', 'mezze_appetizers', 'snacks', 'pan_lebanese', 120],
  // salads
  ['سلطة الحمص والأفوكادو', 'Chickpea Avocado Salad', 'Salade pois chiches et avocat', 'Ensalada de garbanzos y aguacate', 'Kichererbsen-Avocado-Salat', 'salads', 'snacks', 'pan_lebanese', 110],
  ['سلطة الفول الأخضر والبندورة', 'Fresh Fava and Tomato Salad', 'Salade de fèves fraîches et tomate', 'Ensalada de habas frescas y tomate', 'Frische-Bohnen-Tomaten-Salat', 'salads', 'snacks', 'pan_lebanese', 65],
  ['سلطة الجزر المبشور بالليمون', 'Grated Carrot Salad', 'Salade de carottes râpées au citron', 'Ensalada de zanahoria rallada con limón', 'Karotten-Zitronen-Salat', 'salads', 'snacks', 'pan_lebanese', 45],
  ['سلطة الكرفس والتفاح', 'Celery Apple Salad', 'Salade de céleri et pomme', 'Ensalada de apio y manzana', 'Sellerie-Apfel-Salat', 'salads', 'snacks', 'pan_lebanese', 50],
  ['سلطة البقدونس والبندورة', 'Parsley Tomato Salad', 'Salade persil et tomate', 'Ensalada de perejil y tomate', 'Petersilien-Tomaten-Salat', 'salads', 'snacks', 'pan_lebanese', 40],
  ['سلطة الأرز بالليمون', 'Rice Salad with Lemon', 'Salade de riz au citron', 'Ensalada de arroz con limón', 'Reis-Zitronen-Salat', 'salads', 'snacks', 'pan_lebanese', 120],
  // soups
  ['شوربة البازيلاء', 'Pea Soup', 'Soupe de petits pois', 'Sopa de guisantes', 'Erbsensuppe', 'soups', 'dinner', 'pan_lebanese', 70],
  ['شوربة البرغل', 'Bulgur Soup', 'Soupe de boulgour', 'Sopa de bulgur', 'Bulgursuppe', 'soups', 'dinner', 'pan_lebanese', 80],
  ['شوربة القرع البلدي', 'Local Pumpkin Soup', 'Soupe de potiron locale', 'Sopa de calabaza local', 'Lokale Kürbissuppe', 'soups', 'dinner', 'pan_lebanese', 55],
  ['شوربة العدس الأحمر', 'Red Lentil Soup', 'Soupe de lentilles rouges', 'Sopa de lentejas rojas', 'Rote-Linsen-Suppe', 'soups', 'dinner', 'pan_lebanese', 85],
  // kibbeh_dishes
  ['كبة خضراء بالخضار', 'Green Vegetable Kibbeh', 'Kibbeh vert aux légumes', 'Kibbeh verde con verduras', 'Grünes Gemüse-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 150],
  ['كبة الحمص النباتية', 'Vegetarian Chickpea Kibbeh', 'Kibbeh de pois chiches végétarien', 'Kibbeh vegetariano de garbanzos', 'Vegetarisches Kichererbsen-Kibbeh', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 140],
  ['كبة بدبس الرمان', 'Kibbeh with Pomegranate Molasses', 'Kibbeh au jus de grenade', 'Kibbeh con melaza de granada', 'Kibbeh mit Granatapfelsirup', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 175],
  ['كبة النية بالبصل الأخضر', 'Raw Kibbeh with Scallions', 'Kibbeh nayé à la ciboule', 'Kibbeh crudo con cebolleta', 'Rohes Kibbeh mit Frühlingszwiebeln', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 160],
  // manakish_pies
  ['منقوشة بالسمسم والحبة السوداء', 'Sesame Black Seed Manakish', 'Manakish sésame et nigelle', 'Manakish de sésamo y neguilla', 'Sesam-Schwarzkümmel-Manakish', 'manakish_pies', 'breakfast', 'pan_lebanese', 205],
  ['منقوشة الكشك', 'Kishk Manakish', 'Manakish au kishk', 'Manakish de kishk', 'Kischk-Manakish', 'manakish_pies', 'breakfast', 'pan_lebanese', 210],
  ['كعك بالجبنة البلدي', 'Cheese Kaak', 'Kaak au fromage', 'Kaak de queso', 'Käse-Kaak', 'manakish_pies', 'breakfast', 'pan_lebanese', 240],
  ['منقوشة الزيت والزعتر', 'Oil and Zaatar Manakish', 'Manakish huile et zaatar', 'Manakish de aceite y zaatar', 'Öl-Zaatar-Manakish', 'manakish_pies', 'breakfast', 'pan_lebanese', 200],
  ['صفيحة بالحلوم', 'Halloumi Sfiha', 'Sfiha au halloumi', 'Sfiha de halloumi', 'Halloumi-Sfiha', 'manakish_pies', 'breakfast', 'pan_lebanese', 235],
  // mains_grills
  ['كباب عرائس', 'Arayes Kebab', 'Arayes (kébab en pain)', 'Arayes (kebab en pan)', 'Arayes (Kebab im Brot)', 'mains_grills', 'lunch', 'beirut', 200],
  ['كفتة حبّة بالبندورة', 'Kofta Balls in Tomato Sauce', 'Kefta en sauce tomate', 'Albóndigas de kofta en salsa de tomate', 'Kofta-Bällchen in Tomatensauce', 'mains_grills', 'lunch', 'pan_lebanese', 190],
  ['محشي الفليفلة باللحم', 'Stuffed Peppers with Meat', 'Poivrons farcis à la viande', 'Pimientos rellenos de carne', 'Gefüllte Paprika mit Fleisch', 'mains_grills', 'lunch', 'pan_lebanese', 155],
  ['جوانح دجاج بالكمون', 'Cumin Chicken Wings', 'Ailes de poulet au cumin', 'Alitas de pollo con comino', 'Hähnchenflügel mit Kreuzkümmel', 'mains_grills', 'lunch', 'pan_lebanese', 175],
  ['كفتة بالطحينة بالفرن', 'Baked Kofta with Tahini', 'Kefta à la tahini au four', 'Kofta con tahini al horno', 'Ofen-Kofta mit Tahini', 'mains_grills', 'lunch', 'pan_lebanese', 210],
  ['فراريج مشوية بالزعتر', 'Thyme Roasted Mini Chickens', 'Poussins rôtis au zaatar', 'Pollos pequeños asados con zaatar', 'Zaatar-Hähnchen vom Spieß', 'mains_grills', 'lunch', 'pan_lebanese', 185],
  ['طاجن الكوسا باللحم', 'Zucchini Meat Stew', 'Tajine de courgettes à la viande', 'Tajín de calabacín con carne', 'Zucchini-Fleischeintopf', 'mains_grills', 'lunch', 'pan_lebanese', 145],
  ['لفائف الدجاج بالزعتر البلدي', 'Zaatar Chicken Rolls', 'Roulés de poulet au zaatar', 'Rollos de pollo con zaatar', 'Zaatar-Hähnchenröllchen', 'mains_grills', 'lunch', 'pan_lebanese', 180],
  ['كبد الدجاج بالبندورة', 'Chicken Livers with Tomato', 'Foies de volaille à la tomate', 'Hígados de pollo con tomate', 'Hühnerlebern mit Tomate', 'mains_grills', 'lunch', 'pan_lebanese', 165],
  ['طاجن البامية بالدجاج', 'Chicken Okra Stew', 'Tajine de bamya au poulet', 'Tajín de okra con pollo', 'Okra-Hähnchen-Eintopf', 'mains_grills', 'lunch', 'pan_lebanese', 125],
  // rice_dishes
  ['برغل بالبندورة', 'Bulgur with Tomatoes', 'Boulgour à la tomate', 'Bulgur con tomate', 'Bulgur mit Tomaten', 'rice_dishes', 'lunch', 'pan_lebanese', 140],
  ['مقلوبة الخضار', 'Vegetable Maqluba', 'Maqlouba de légumes', 'Maqluba de verduras', 'Gemüse-Makluba', 'rice_dishes', 'lunch', 'pan_lebanese', 150],
  ['فريكة بالخضار', 'Freekeh with Vegetables', 'Freekeh aux légumes', 'Freekeh con verduras', 'Freekeh mit Gemüse', 'rice_dishes', 'lunch', 'pan_lebanese', 130],
  ['أرز أسمر بالخضار', 'Brown Rice with Vegetables', 'Riz complet aux légumes', 'Arroz integral con verduras', 'Vollkornreis mit Gemüse', 'rice_dishes', 'lunch', 'pan_lebanese', 145],
  ['رز مفلفل بالمكسرات', 'Rice with Mixed Nuts', 'Riz pilaf aux fruits secs', 'Arroz con frutos secos', 'Reis mit Nüssen', 'rice_dishes', 'lunch', 'pan_lebanese', 185],
  // fish_seafood
  ['بوري محشي بالأرز', 'Stuffed Mullet with Rice', 'Mulet farci au riz', 'Lisa rellena de arroz', 'Mit Reis gefüllte Meeräsche', 'fish_seafood', 'lunch', 'tarablus', 185],
  ['سمك مقلي بالزيت البلدي', 'Fish Fried in Olive Oil', 'Poisson frit à l’huile d’olive', 'Pescado frito en aceite de oliva', 'In Olivenöl gebratener Fisch', 'fish_seafood', 'lunch', 'pan_lebanese', 190],
  ['أخطبوط بالليمون', 'Octopus with Lemon', 'Poulpe au citron', 'Pulpo con limón', 'Oktopus mit Zitrone', 'fish_seafood', 'lunch', 'jbeil', 120],
  // sweets_desserts
  ['حلاوة السمسم', 'Sesame Halva', 'Halva au sésame', 'Halva de sésamo', 'Sesam-Halva', 'sweets_desserts', 'snacks', 'pan_lebanese', 230],
  ['بسبوسة جوز الهند البلدي', 'Local Coconut Basbousa', 'Basboussa locale à la noix de coco', 'Basbusa local de coco', 'Lokale Kokos-Basbousa', 'sweets_desserts', 'snacks', 'pan_lebanese', 250],
  ['كاستر بالحليب والفستق', 'Milk Custard with Pistachios', 'Crème au lait et pistaches', 'Natillas con pistachos', 'Milchpudding mit Pistazien', 'sweets_desserts', 'snacks', 'pan_lebanese', 115],
  ['معمول بالتمر والجوز', 'Date and Walnut Maamoul', 'Maamoul dattes et noix', 'Maamoul de dátiles y nuez', 'Dattel-Walnuss-Maamoul', 'sweets_desserts', 'snacks', 'pan_lebanese', 270],
  // dairy_eggs_drinks
  ['بيض مقلو بالزيت البلدي', 'Fried Eggs in Olive Oil', 'Œufs frits à l’huile d’olive', 'Huevos fritos en aceite de oliva', 'In Olivenöl gebratene Eier', 'dairy_eggs_drinks', 'breakfast', 'pan_lebanese', 155],
  ['مشروب ماء الورد بالعسل', 'Rose Water Drink with Honey', 'Boisson d’eau de rose au miel', 'Bebida de agua de rosas con miel', 'Rosenwasser-Getränk mit Honig', 'dairy_eggs_drinks', 'breakfast', 'pan_lebanese', 35],
];

const categories = ['mezze_appetizers', 'salads', 'soups', 'kibbeh_dishes', 'manakish_pies', 'mains_grills', 'rice_dishes', 'fish_seafood', 'sweets_desserts', 'dairy_eggs_drinks'];
const regions = ['pan_lebanese', 'levantine_shared', 'mena_shared', 'beirut', 'tarablus', 'sidon', 'jbeil', 'baalbek', 'zahle', 'jezzine'];
const meal_types = ['breakfast', 'lunch', 'snacks', 'dinner'];

const dishes = ROWS.map((r) => ({
  name_ar: r[0], name_en: r[1], name_fr: r[2], name_es: r[3], name_de: r[4],
  category: r[5], mealType: r[6], region: r[7], cal_100: r[8],
}));

const guard = (cond, msg) => { if (!cond) { console.error(msg); process.exit(1); } };
guard(dishes.length === 51, `expected 51 dishes, got ${dishes.length}`);
dishes.forEach((d) => {
  guard(categories.includes(d.category), `bad category ${d.category}: ${d.name_ar}`);
  guard(regions.includes(d.region), `bad region ${d.region}: ${d.name_ar}`);
  guard(meal_types.includes(d.mealType), `bad mealType ${d.mealType}: ${d.name_ar}`);
});
const names = dishes.map((d) => d.name_ar);
guard(new Set(names).size === names.length, 'duplicate Arabic names inside ROWS');
dishes.forEach((d) => guard(d.cal_100 >= 20 && d.cal_100 <= 900, `cal out of range ${d.cal_100}: ${d.name_ar}`));

const cats = {}; for (const d of dishes) cats[d.category] = (cats[d.category] || 0) + 1;
const rgns = {}; for (const d of dishes) rgns[d.region] = (rgns[d.region] || 0) + 1;

const out = { kitchen: 'lebanese', target_total: 300, new_dishes: 51, categories, regions, meal_types, dishes };
fs.writeFileSync(path.join(__dirname, 'lebanon-51-proposal.json'), JSON.stringify(out, null, 2));
console.log('categories', JSON.stringify(cats));
console.log('regions', JSON.stringify(rgns));
console.log('total', dishes.length);
console.log('wrote scripts/lebanon-51-proposal.json');