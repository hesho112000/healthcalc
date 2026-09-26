// Generates scripts/libya-46-proposal.json — 46 additional NEW authentic Libyan dishes
// to bring the accessible Libyan pool to ~250. Region tags follow the approved
// LIBYAN_REGION_META set (pan_libyan + tripoli/benghazi/misrata/zwara/sabratha/ghadames/kufra).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// [name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100]
const ROWS = [
  // soups
  ['شربة كوارع بالبهارات', 'Spiced Tripe Sharba', 'Charba de tripes aux épices', 'Sharba de callos con especias', 'Gewürzte Kutteln-Scharba', 'soups', 'lunch', 'tripoli', 85],
  ['شربة كسكسي بالبصل', 'Couscous Onion Sharba', 'Charba de couscous aux oignons', 'Sharba de cuscús con cebolla', 'Couscous-Zwiebel-Scharba', 'soups', 'lunch', 'benghazi', 90],
  ['شربة الباذنجان', 'Eggplant Sharba', 'Charba d’aubergines', 'Sharba de berenjena', 'Auberginen-Scharba', 'soups', 'lunch', 'pan_libyan', 45],
  ['شربة الكوسة بالزنجبيل', 'Zucchini and Ginger Sharba', 'Charba de courgettes au gingembre', 'Sharba de calabacín y jengibre', 'Zucchini-Ingwer-Scharba', 'soups', 'lunch', 'pan_libyan', 50],
  ['شربة الجزر والعدس', 'Carrot and Lentil Sharba', 'Charba carotte et lentilles', 'Sharba de zanahoria y lentejas', 'Karotten-Linsen-Scharba', 'soups', 'lunch', 'pan_libyan', 60],
  ['شربة الطماطم بالريحان', 'Tomato Basil Sharba', 'Charba tomate et basilic', 'Sharba de tomate y albahaca', 'Tomaten-Basilikum-Scharba', 'soups', 'lunch', 'misrata', 42],
  // couscous_bazeen
  ['كسكسي بالبازلاء', 'Couscous with Peas', 'Couscous aux petits pois', 'Cuscús con guisantes', 'Couscous mit Erbsen', 'couscous_bazeen', 'lunch', 'misrata', 150],
  ['ريفيسة بالخضار', 'Reffissa with Vegetables', 'Reffissa aux légumes', 'Reffissa con verduras', 'Reffissa mit Gemüse', 'couscous_bazeen', 'lunch', 'pan_libyan', 120],
  ['بازين بالصلصة الحمراء', 'Bazin with Red Sauce', 'Bazin à la sauce rouge', 'Bazin con salsa roja', 'Bazin mit roter Sauce', 'couscous_bazeen', 'lunch', 'pan_libyan', 165],
  ['كسكسي بالروبيان', 'Couscous with Shrimp', 'Couscous aux crevettes', 'Cuscús con gambas', 'Couscous mit Garnelen', 'couscous_bazeen', 'lunch', 'benghazi', 155],
  ['ريفيسة بالدجاج', 'Reffissa with Chicken', 'Reffissa au poulet', 'Reffissa con pollo', 'Reffissa mit Hähnchen', 'couscous_bazeen', 'lunch', 'pan_libyan', 130],
  ['كسكسي بالكبدة والزبيب', 'Couscous with Liver and Raisins', 'Couscous au foie et raisins', 'Cuscús con hígado y pasas', 'Couscous mit Leber und Rosinen', 'couscous_bazeen', 'lunch', 'pan_libyan', 170],
  ['كسكسي العيد بالسمن البلدي', 'Eid Couscous with Samna', 'Couscous de l’Aïd au samna', 'Cuscús festivo con mantequilla clarificada', 'Eid-Couscous mit Samna', 'couscous_bazeen', 'lunch', 'pan_libyan', 180],
  ['المصلوح', 'Maslouh Couscous Dumpling', 'Maslouh (boulette de couscous)', 'Masluah (bola de cuscús)', 'Maslouh (Couscous-Klößchen)', 'couscous_bazeen', 'lunch', 'pan_libyan', 165],
  // main_dishes
  ['طاجين المرقاز البلدي', 'Homemade Sausage Tajine', 'Tajine de merguez maison', 'Tajín de salchichas caseras', 'Haus-Tajine mit Merguez', 'main_dishes', 'lunch', 'pan_libyan', 210],
  ['كفتة مقلية بالبيض', 'Fried Kofta with Eggs', 'Kefta frite aux œufs', 'Kefta frita con huevos', 'Gebratene Kofta mit Eiern', 'main_dishes', 'lunch', 'pan_libyan', 175],
  ['لوبيا مدمسة باللحم', 'Stewed Beans with Meat', 'Haricots mijotés à la viande', 'Judías estofadas con carne', 'Geschmorte Bohnen mit Fleisch', 'main_dishes', 'lunch', 'pan_libyan', 140],
  ['مقرونة باللحم المفروم', 'Baked Pasta with Minced Meat', 'Pâtes gratinées à la viande hachée', 'Pasta gratinada con carne picada', 'Nudelauflauf mit Hackfleisch', 'main_dishes', 'lunch', 'pan_libyan', 210],
  ['دجاج بالبصل والقرع', 'Chicken with Onions and Pumpkin', 'Poulet aux oignons et potiron', 'Pollo con cebolla y calabaza', 'Hähnchen mit Zwiebeln und Kürbis', 'main_dishes', 'lunch', 'pan_libyan', 175],
  ['رقاق محشي باللحم', 'Filled Rgag with Meat', 'Rgage farci à la viande', 'Rgag relleno de carne', 'Mit Fleisch gefülltes Rgag', 'main_dishes', 'lunch', 'ghadames', 210],
  ['كبدة مقلية بالبصل', 'Fried Liver with Onions', 'Foie frit aux oignons', 'Hígado frito con cebolla', 'Gebratene Leber mit Zwiebeln', 'main_dishes', 'lunch', 'tripoli', 165],
  // grilled_meats
  ['المشاوي المختلطة الليبية', 'Libyan Mixed Grill', 'Grillade libyenne mixte', 'Mezcla libia a la brasa', 'Libysche gemischte Grillplatte', 'grilled_meats', 'lunch', 'pan_libyan', 200],
  ['كباب لحم الجمل', 'Camel Meat Kebab', 'Kébab de chameau', 'Kebab de camello', 'Kamelfleisch-Kebab', 'grilled_meats', 'lunch', 'kufra', 190],
  ['جوانح دجاج بالسمسم', 'Sesame Chicken Wings', 'Ailes de poulet au sésame', 'Alitas de pollo con sésamo', 'Hähnchenflügel mit Sesam', 'grilled_meats', 'lunch', 'pan_libyan', 165],
  ['قطع ضأن بالزعتر البري', 'Wild Thyme Lamb Chops', 'Agneau au thym sauvage', 'Cordero con tomillo silvestre', 'Lammstücke mit wildem Thymian', 'grilled_meats', 'lunch', 'pan_libyan', 195],
  ['سجق ليبي مشوي بالكمون', 'Grilled Libyan Sausage with Cumin', 'Saucisse libyenne grillée au cumin', 'Salchicha libia con comino', 'Gegrillte libysche Wurst mit Kreuzkümmel', 'grilled_meats', 'lunch', 'misrata', 220],
  ['كبدة غنم مشوية بالفلفل', 'Grilled Lamb Liver with Pepper', 'Foie d’agneau grillé au poivre', 'Hígado de cordero a la brasa con pimienta', 'Gegrillte Lammleber mit Pfeffer', 'grilled_meats', 'lunch', 'pan_libyan', 150],
  // fish_seafood
  ['بوري محشي بالكزبرة', 'Stuffed Mullet with Cilantro', 'Mulet farci à la coriandre', 'Lisa rellena de cilantro', 'Gefüllte Meeräsche mit Koriander', 'fish_seafood', 'lunch', 'sabratha', 165],
  ['حبار محشي بالأرز', 'Stuffed Squid with Rice', 'Calmars farcis au riz', 'Calamar relleno de arroz', 'Mit Reis gefüllter Tintenfisch', 'fish_seafood', 'lunch', 'pan_libyan', 175],
  ['سلطان إبراهيم مقلي بالفرملة', 'Fried Red Mullet with Fermla', 'Rouget frit à la fermla', 'Salmonete frito con fermla', 'Gebratene Meerbarbe mit Fermla', 'fish_seafood', 'lunch', 'zwara', 150],
  ['جراد البحر المشوي بالليمون', 'Grilled Lobster with Lemon', 'Homard grillé au citron', 'Langosta a la brasa con limón', 'Gegrillter Hummer mit Zitrone', 'fish_seafood', 'lunch', 'benghazi', 130],
  ['سلطعون بالصلصة الحمراء', 'Crab in Tomato Sauce', 'Crabe à la sauce tomate', 'Cangrejo en salsa de tomate', 'Krabbe in Tomatensauce', 'fish_seafood', 'lunch', 'sabratha', 120],
  ['حوت مطبوخ بالبخار', 'Steamed Fish Libyan Style', 'Poisson cuit à la vapeur', 'Pescado al vapor', 'Gedünsteter Fisch', 'fish_seafood', 'lunch', 'zwara', 140],
  // salads_sides
  ['سلطة البطاطا والبنجر', 'Potato and Beet Salad', 'Salade pommes de terre et betterave', 'Ensalada de patata y remolacha', 'Kartoffel-Rote-Bete-Salat', 'salads_sides', 'lunch', 'pan_libyan', 110],
  ['سلطة الذرة والطماطم', 'Corn and Tomato Salad', 'Salade maïs et tomate', 'Ensalada de maíz y tomate', 'Mais-Tomaten-Salat', 'salads_sides', 'lunch', 'pan_libyan', 90],
  // breads_pastries
  ['خبز التنور الليبي', 'Libyan Tannur Bread', 'Pain tannour libyen', 'Pan tandur libio', 'Libysches Tannur-Brot', 'breads_pastries', 'breakfast', 'pan_libyan', 220],
  ['خبز الحليب الليبي', 'Libyan Milk Bread', 'Pain au lait libyen', 'Pan de leche libio', 'Libysches Milchbrot', 'breads_pastries', 'breakfast', 'pan_libyan', 240],
  // sweets_desserts
  ['حلوى الخروب', 'Carob Sweet', 'Douceur de caroube', 'Dulce de algarroba', 'Johannisbrot-Süßigkeit', 'sweets_desserts', 'snacks', 'ghadames', 300],
  ['أصابع التمر بالمكسرات', 'Date Nut Fingers', 'Doigts de dattes aux noix', 'Deditos de dátiles y nueces', 'Dattel-Nuss-Stangen', 'sweets_desserts', 'snacks', 'pan_libyan', 370],
  ['بسبوسة جوز الهند الليبية', 'Libyan Coconut Basbousa', 'Basboussa libyenne à la noix de coco', 'Basbusa libia de coco', 'Libysche Kokos-Basbousa', 'sweets_desserts', 'snacks', 'pan_libyan', 400],
  ['الحيوص', 'Jewious Walnut Honey Sweet', 'Jewious (sweet aux noix)', 'Yewius (dulce de nuez)', 'Jewious (Walnuss-Honig-Süß)', 'sweets_desserts', 'snacks', 'tripoli', 450],
  ['حلوى التين بالجوز', 'Fig and Walnut Sweet', 'Douceur de figues et noix', 'Dulce de higos y nueces', 'Feigen-Walnuss-Süßigkeit', 'sweets_desserts', 'snacks', 'ghadames', 340],
  // dairy_eggs_fruits
  ['حليب اللوز', 'Almond Milk', 'Lait d’amandes', 'Leche de almendras', 'Mandelmilch', 'dairy_eggs_fruits', 'breakfast', 'pan_libyan', 40],
  ['جبنة مصفاة بالزيتون', 'Strained Cheese with Olives', 'Fromage égoutté aux olives', 'Queso escurrido con aceitunas', 'Abgetropfter Käse mit Oliven', 'dairy_eggs_fruits', 'breakfast', 'pan_libyan', 240],
  ['ليمون بلدي', 'Local Lemon', 'Citron local', 'Limón local', 'Lokale Zitrone', 'dairy_eggs_fruits', 'breakfast', 'zwara', 30],
  ['جوز بلدي', 'Local Walnuts', 'Noix locales', 'Nueces locales', 'Lokale Walnüsse', 'dairy_eggs_fruits', 'breakfast', 'pan_libyan', 65],
];

const categories = ['breakfast', 'breads_pastries', 'soups', 'salads_sides', 'couscous_bazeen', 'main_dishes', 'grilled_meats', 'fish_seafood', 'sweets_desserts', 'dairy_eggs_fruits'];
const regions = ['pan_libyan', 'maghreb_shared', 'tripoli', 'benghazi', 'misrata', 'zwara', 'sabratha', 'ghadames', 'kufra'];
const meal_types = ['breakfast', 'lunch', 'snacks'];

const dishes = ROWS.map((r) => ({
  name_ar: r[0], name_en: r[1], name_fr: r[2], name_es: r[3], name_de: r[4],
  category: r[5], mealType: r[6], region: r[7], cal_100: r[8],
}));

const guard = (cond, msg) => { if (!cond) { console.error(msg); process.exit(1); } };
guard(dishes.length === 46, `expected 46 dishes, got ${dishes.length}`);
dishes.forEach((d) => { guard(categories.includes(d.category), `bad category ${d.category}`); guard(regions.includes(d.region), `bad region ${d.region}`); guard(meal_types.includes(d.mealType), `bad mealType ${d.mealType}`); });
const names = dishes.map((d) => d.name_ar);
guard(new Set(names).size === names.length, 'duplicate Arabic names inside ROWS');
dishes.forEach((d) => guard(d.cal_100 >= 20 && d.cal_100 <= 900, `cal out of range ${d.cal_100}`));

const cats = {}; for (const d of dishes) cats[d.category] = (cats[d.category] || 0) + 1;
const rgns = {}; for (const d of dishes) rgns[d.region] = (rgns[d.region] || 0) + 1;

const out = { kitchen: 'libyan', target_total: 250, new_dishes: 46, categories, regions, meal_types, dishes };
fs.writeFileSync(path.join(__dirname, 'libya-46-proposal.json'), JSON.stringify(out, null, 2));
console.log('categories', JSON.stringify(cats));
console.log('regions', JSON.stringify(rgns));
console.log('total', dishes.length);
console.log('wrote scripts/libya-46-proposal.json');