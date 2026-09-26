// Generates scripts/lebanon-150-proposal.json — 150 NEW authentic Lebanese dishes
// to bring the Lebanese pool to 300 (100 migrated legacy + 150 new). Region tags follow
// LEBANESE_REGION_META (pan_lebanese + beirut/tarablus/sidon/jbeil/baalbek/zahle/jezzine
// + levantine_shared/mena_shared). "منشوش" golden rule: keep it general (pan_lebanese).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// [name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100]
const ROWS = [
  // mezze_appetizers
  ['حمص باللحم المفروم', 'Hummus with Minced Meat', 'Houmous à la viande hachée', 'Hummus con carne picada', 'Hummus mit Hackfleisch', 'mezze_appetizers', 'snacks', 'beirut', 210],
  ['متبل الباذنجان بالرمان', 'Eggplant Mutabbal with Pomegranate', 'Mutabbal d’aubergine à la grenade', 'Mutabal de berenjena con granada', 'Auberginen-Mutabal mit Granatapfel', 'mezze_appetizers', 'snacks', 'pan_lebanese', 95],
  ['بابا غنوج بالفحم', 'Charcoal Baba Ghanouj', 'Baba ganoush au charbon', 'Baba ghanoush a las brasas', 'Kohle-Baba-Ghanoush', 'mezze_appetizers', 'snacks', 'pan_lebanese', 85],
  ['فول مدمس بالطحينة', 'Foul with Tahini', 'Foul à la tahini', 'Ful con tahini', 'Ful mit Tahini', 'mezze_appetizers', 'breakfast', 'pan_lebanese', 160],
  ['تبولة الحمص', 'Chickpea Tabouli', 'Taboulé de pois chiches', 'Tabule de garbanzos', 'Kichererbsen-Taboulé', 'mezze_appetizers', 'snacks', 'pan_lebanese', 140],
  ['فتة الباذنجان باللبن', 'Eggplant Fatteh with Yogurt', 'Fatté d’aubergine au yaourt', 'Fatteh de berenjena con yogur', 'Auberginen-Fatteh mit Joghurt', 'mezze_appetizers', 'snacks', 'pan_lebanese', 135],
  ['فتة الحمص باللحم', 'Hummus Fatteh with Meat', 'Fatté de houmous à la viande', 'Fatteh de hummus con carne', 'Hummus-Fatteh mit Fleisch', 'mezze_appetizers', 'lunch', 'beirut', 185],
  ['لبنة بالزعتر البلدي', 'Labneh with Zaatar', 'Labneh au zaatar', 'Labneh con zaatar', 'Labneh mit Zaatar', 'mezze_appetizers', 'breakfast', 'pan_lebanese', 105],
  ['ورق عنب بالزيت البلدي', 'Vine Leaves in Olive Oil', 'Feuilles de vigne à l’huile d’olive', 'Hojas de parra en aceite de oliva', 'Weinblätter in Olivenöl', 'mezze_appetizers', 'lunch', 'pan_lebanese', 120],
  ['محاشي كوسا وباذنجان باللبن', 'Stuffed Zucchini and Eggplant with Yogurt', 'Courgettes et aubergines farcies au laban', 'Calabacín y berenjena rellenos en laban', 'Gefüllte Zucchini und Aubergine in Laban', 'mezze_appetizers', 'lunch', 'pan_lebanese', 140],
  ['مقدوس بزيت الزيتون البلدي', 'Makdous in Olive Oil', 'Makdous à l’huile d’olive', 'Makdus en aceite de oliva', 'Makdous in Olivenöl', 'mezze_appetizers', 'snacks', 'jezzine', 150],
  ['محمرة', 'Muhammara', 'Mohammara (poivrons et noix)', 'Muhammara (pimiento y nuez)', 'Muhammara (Paprika und Walnuss)', 'mezze_appetizers', 'snacks', 'levantine_shared', 170],
  ['حلوم مقلي بالعسل', 'Fried Halloumi with Honey', 'Halloumi frit au miel', 'Halloumi frito con miel', 'Gebratener Halloumi mit Honig', 'mezze_appetizers', 'snacks', 'pan_lebanese', 220],
  ['سمبوسك بيروتي باللحمة', 'Beirut Sambousek with Meat', 'Samoussek beyrouthin à la viande', 'Sambusak de Beirut con carne', 'Beiruter Sambusak mit Fleisch', 'mezze_appetizers', 'snacks', 'beirut', 195],
  ['أفوكادو بلبن', 'Avocado with Laban', 'Avocat au laban', 'Aguacate con laban', 'Avocado mit Laban', 'mezze_appetizers', 'snacks', 'pan_lebanese', 145],
  ['بطاطا بالثوم والليمون', 'Potato with Garlic and Lemon', 'Pommes de terre ail et citron', 'Patatas con ajo y limón', 'Kartoffeln mit Knoblauch und Zitrone', 'mezze_appetizers', 'snacks', 'pan_lebanese', 140],
  ['فطر بالثوم والزعتر', 'Mushrooms with Garlic and Thyme', 'Champignons à l’ail et au thym', 'Champiñones con ajo y tomillo', 'Pilze mit Knoblauch und Thymian', 'mezze_appetizers', 'snacks', 'pan_lebanese', 85],
  ['جبنة عكاوي بالزيتون', 'Akkawi Cheese with Olives', 'Akkawi aux olives', 'Queso akkawi con aceitunas', 'Akkawi-Käse mit Oliven', 'mezze_appetizers', 'breakfast', 'pan_lebanese', 165],
  ['شنكليش بالفلفل البلدي', 'Shanklish with Pepper', 'Chanklich au poivre', 'Shanklish con pimiento', 'Schanklisch mit Pfeffer', 'mezze_appetizers', 'snacks', 'pan_lebanese', 155],
  ['مخلل خضار بلدي', 'Local Mixed Pickles', 'Pickles maison', 'Encurtidos caseros', 'Hausgemachte gemischte Gurken', 'mezze_appetizers', 'snacks', 'pan_lebanese', 35],
  ['زيتون بلدي بالليمون', 'Local Olives with Lemon', 'Olives locales au citron', 'Aceitunas locales con limón', 'Lokale Oliven mit Zitrone', 'mezze_appetizers', 'snacks', 'pan_lebanese', 65],
  ['لبنة بجوز', 'Labneh with Walnuts', 'Labneh aux noix', 'Labneh con nueces', 'Labneh mit Walnüssen', 'mezze_appetizers', 'breakfast', 'pan_lebanese', 130],
  ['الباذنجان المقلي بالثوم', 'Fried Eggplant with Garlic', 'Aubergine frite à l’ail', 'Berenjena frita con ajo', 'Gebratene Aubergine mit Knoblauch', 'mezze_appetizers', 'snacks', 'pan_lebanese', 135],
  ['محشي ورق الملفوف', 'Stuffed Cabbage Rolls', 'Choux farci', 'Rollos de col rellena', 'Gefüllte Kohlrouladen', 'mezze_appetizers', 'lunch', 'levantine_shared', 150],
  ['أصابع الحلوم المقلية', 'Fried Halloumi Fingers', 'Bâtonnets de halloumi frits', 'Palitos de halloumi frito', 'Gebratene Halloumi-Stäbchen', 'mezze_appetizers', 'snacks', 'pan_lebanese', 260],
  ['فول أخضر مسلوق بالملح', 'Boiled Fava Beans', 'Fèves fraîches bouillies', 'Habas verdes hervidas', 'Gekochte Saubohnen', 'mezze_appetizers', 'snacks', 'pan_lebanese', 100],
  ['سمبوسك بالجبنة البلدي', 'Sambousek with Local Cheese', 'Samoussek au fromage local', 'Sambusak con queso local', 'Sambusak mit lokalem Käse', 'mezze_appetizers', 'snacks', 'pan_lebanese', 175],
  ['مكسرات مشكلة بلدية', 'Local Mixed Nuts', 'Fruits secs mélangés locaux', 'Frutos secos variados locales', 'Gemischt lokale Nüsse', 'mezze_appetizers', 'snacks', 'pan_lebanese', 520],
  // salads
  ['سلطة الجرجير والرمان', 'Arugula Pomegranate Salad', 'Salade de roquette et grenade', 'Ensalada de rúcula y granada', 'Rucola-Granatapfel-Salat', 'salads', 'snacks', 'pan_lebanese', 40],
  ['سلطة الشمندر البلدي', 'Local Beet Salad', 'Salade de betterave locale', 'Ensalada de remolacha local', 'Lokaler Rote-Bete-Salat', 'salads', 'snacks', 'pan_lebanese', 60],
  ['سلطة الباذنجان البلدي المحمر', 'Roasted Local Eggplant Salad', 'Salade d’aubergine locale rissolée', 'Ensalada de berenjena local asada', 'Rösti lokale Auberginen-Salat', 'salads', 'snacks', 'pan_lebanese', 90],
  ['سلطة الحمص المقرمش', 'Crispy Chickpea Salad', 'Salade de pois chiches croustillants', 'Ensalada de garbanzos crujientes', 'Knuspriger Kichererbsen-Salat', 'salads', 'snacks', 'pan_lebanese', 135],
  ['سلطة الخيار البلدي والنعناع', 'Cucumber and Mint Salad', 'Salade de concombre à la menthe', 'Ensalada de pepino con menta', 'Gurken-Minz-Salat', 'salads', 'snacks', 'pan_lebanese', 55],
  ['سلطة الفريكة بالبقدونس', 'Freekeh Parsley Salad', 'Salade de freekeh au persil', 'Ensalada de freekeh con perejil', 'Freekeh-Petersilien-Salat', 'salads', 'snacks', 'pan_lebanese', 70],
  ['سلطة العدس بالزعتر', 'Lentil Salad with Zaatar', 'Salade de lentilles au zaatar', 'Ensalada de lentejas con zaatar', 'Linsen-Salat mit Zaatar', 'salads', 'snacks', 'pan_lebanese', 75],
  ['سلطة القرنبيط بالطحينة', 'Cauliflower Tahini Salad', 'Salade de chou-fleur à la tahini', 'Ensalada de coliflor con tahini', 'Blumenkohl-Tahini-Salat', 'salads', 'snacks', 'pan_lebanese', 90],
  ['سلطة الرجلة', 'Purslane Salad', 'Salade de pourpier', 'Ensalada de verdolaga', 'Portulak-Salat', 'salads', 'snacks', 'pan_lebanese', 35],
  ['سلطة الزيتون المشكل', 'Mixed Olive Salad', 'Salade d’olives assorties', 'Ensalada de aceitunas variadas', 'Gemischter Oliven-Salat', 'salads', 'snacks', 'pan_lebanese', 90],
  ['سلطة البندورة والرمان', 'Tomato Pomegranate Salad', 'Salade tomate et grenade', 'Ensalada de tomate y granada', 'Tomaten-Granatapfel-Salat', 'salads', 'snacks', 'pan_lebanese', 45],
  ['سلطة الملفوف بالليمون', 'Cabbage Lemon Salad', 'Salade de chou au citron', 'Ensalada de col con limón', 'Kohl-Zitronen-Salat', 'salads', 'snacks', 'pan_lebanese', 40],
  ['سلطة البرغل بالخيار', 'Bulgur and Cucumber Salad', 'Salade de boulgour au concombre', 'Ensalada de bulgur con pepino', 'Bulgur-Gurken-Salat', 'salads', 'snacks', 'pan_lebanese', 60],
  ['سلطة الهندبة بالبصل', 'Chicory Onion Salad', 'Salade de chicorée aux oignons', 'Ensalada de achicoria con cebolla', 'Chicorée-Zwiebel-Salat', 'salads', 'snacks', 'pan_lebanese', 70],
  // soups
  ['شوربة العدس بالليمون', 'Lentil Soup with Lemon', 'Soupe de lentilles au citron', 'Sopa de lentejas con limón', 'Linsensuppe mit Zitrone', 'soups', 'lunch', 'pan_lebanese', 90],
  ['شوربة العدس والسبانخ', 'Lentil Spinach Soup', 'Soupe de lentilles et épinards', 'Sopa de lentejas y espinacas', 'Linsen-Spinat-Suppe', 'soups', 'lunch', 'pan_lebanese', 90],
  ['شوربة المعكرونة بالدجاج', 'Chicken Pasta Soup', 'Soupe de pâtes au poulet', 'Sopa de pasta con pollo', 'Hähnchen-Nudelsuppe', 'soups', 'dinner', 'pan_lebanese', 120],
  ['شوربة الخضار اللبنانية', 'Lebanese Vegetable Soup', 'Soupe de légumes libanaise', 'Sopa de verduras libanesa', 'Libanesische Gemüsesuppe', 'soups', 'dinner', 'pan_lebanese', 60],
  ['شوربة الكوسا', 'Zucchini Soup', 'Soupe de courgettes', 'Sopa de calabacín', 'Zucchinisuppe', 'soups', 'dinner', 'pan_lebanese', 50],
  ['شوربة الفطر بالبقدونس', 'Mushroom Parsley Soup', 'Soupe de champignons au persil', 'Sopa de champiñones con perejil', 'Pilz-Petersilien-Suppe', 'soups', 'dinner', 'pan_lebanese', 75],
  ['شوربة الطماطم بالريحان', 'Tomato Basil Soup', 'Soupe tomate et basilic', 'Sopa de tomate y albahaca', 'Tomaten-Basilikum-Suppe', 'soups', 'dinner', 'pan_lebanese', 65],
  ['شوربة البطاطا والكراث', 'Potato Leek Soup', 'Soupe pommes de terre et poireau', 'Sopa de patata y puerro', 'Kartoffel-Lauch-Suppe', 'soups', 'dinner', 'pan_lebanese', 80],
  ['شوربة اللوبياء الخضراء', 'Green Bean Soup', 'Soupe de haricots verts', 'Sopa de judías verdes', 'Grüne-Bohnen-Suppe', 'soups', 'dinner', 'pan_lebanese', 65],
  ['شوربة الفريكة بالدجاج', 'Freekeh Chicken Soup', 'Soupe de freekeh au poulet', 'Sopa de freekeh con pollo', 'Freekeh-Hähnchen-Suppe', 'soups', 'lunch', 'pan_lebanese', 110],
  // kibbeh_dishes
  ['كبة زنود الست', 'Kibbeh Zannoud el Sit', 'Kibbeh zanoud al-sit (rouleaux)', 'Kibbeh zanud as-sitt (rollos)', 'Kibbeh-Röllchen Zanoud el-Sit', 'kibbeh_dishes', 'snacks', 'pan_lebanese', 155],
  ['كبة باللبن البلدي', 'Kibbeh in Laban', 'Kibbeh au laban', 'Kibbeh en laban', 'Kibbeh in Laban', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 165],
  ['كبة السايح إلى الفرن', 'Kibbeh Sayeh Baked in Tray', 'Kibbeh sayé au four', 'Kibbeh sayeh al horno', 'Kibbeh Sayeh aus dem Ofen', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 175],
  ['كبة مشوية على الفحم', 'Charcoal Grilled Kibbeh', 'Kibbeh grillé au charbon', 'Kibbeh a la brasa', 'Kibbeh vom Holzkohlegrill', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 195],
  ['كبة محشية بالجوز', 'Kibbeh Stuffed with Walnuts', 'Kibbeh farci aux noix', 'Kibbeh relleno de nueces', 'Kibbeh mit Walnussfüllung', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 190],
  ['كبة بالصينية والصنوبر', 'Baked Kibbeh with Pine Nuts', 'Kibbeh au four aux pignons', 'Kibbeh al horno con piñones', 'Ofen-Kibbeh mit Pinienkernen', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 180],
  ['كبة بالبصل المكرمل', 'Kibbeh with Caramelized Onions', 'Kibbeh aux oignons caramélisés', 'Kibbeh con cebolla caramelizada', 'Kibbeh mit karamellisierten Zwiebeln', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 170],
  ['كبة مقلية صغيرة بلحم الضان', 'Small Fried Lamb Kibbeh', 'Petits kibbeh frits à l’agneau', 'Kibbeh frito pequeño de cordero', 'Kleine Lamm-Kibbeh frittiert', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 210],
  ['كبة بالسبانخ', 'Kibbeh with Spinach', 'Kibbeh aux épinards', 'Kibbeh con espinacas', 'Kibbeh mit Spinat', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 160],
  ['كبة بالكراث', 'Kibbeh with Leeks', 'Kibbeh aux poireaux', 'Kibbeh con puerro', 'Kibbeh mit Lauch', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 165],
  ['كبة العجين الحلبية', 'Aleppo-Style Thin Kibbeh', 'Kibbeh fine à l’aleppoise', 'Kibbeh fino a la aleppina', 'Dünnes Aleppo-Kibbeh', 'kibbeh_dishes', 'lunch', 'levantine_shared', 185],
  ['كبة بلبن بالمكسرات', 'Kibbeh in Laban with Nuts', 'Kibbeh au laban aux noix', 'Kibbeh en laban con nueces', 'Kibbeh in Laban mit Nüssen', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 175],
  ['كبة محشية بالحلوم', 'Kibbeh Stuffed with Halloumi', 'Kibbeh farci au halloumi', 'Kibbeh relleno de halloumi', 'Kibbeh mit Halloumi-Füllung', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 200],
  ['كبة القريشة بالجبن البلدي', 'Kibbeh with Local Cheese', 'Kibbeh au fromage local', 'Kibbeh con queso local', 'Kibbeh mit lokalem Käse', 'kibbeh_dishes', 'lunch', 'pan_lebanese', 195],
  // manakish_pies
  ['منقوشة جبنة بلدية', 'Manakish with Local Cheese', 'Manakish au fromage local', 'Manakish con queso local', 'Manakish mit lokalem Käse', 'manakish_pies', 'breakfast', 'pan_lebanese', 215],
  ['منقوشة باللبنة والزعتر', 'Manakish Labneh Zaatar', 'Manakish labneh zaatar', 'Manakish de labneh y zaatar', 'Labneh-Zaatar-Manakish', 'manakish_pies', 'breakfast', 'pan_lebanese', 200],
  ['منقوشة الباذنجان', 'Eggplant Manakish', 'Manakish à l’aubergine', 'Manakish de berenjena', 'Auberginen-Manakish', 'manakish_pies', 'breakfast', 'pan_lebanese', 190],
  ['منقوشة باللحم المفروم', 'Manakish with Minced Meat', 'Manakish à la viande hachée', 'Manakish con carne picada', 'Manakish mit Hackfleisch', 'manakish_pies', 'breakfast', 'pan_lebanese', 245],
  ['صفيحة بالجبنة البلدي', 'Cheese Sfiha', 'Sfiha au fromage', 'Sfiha de queso', 'Käse-Sfiha', 'manakish_pies', 'breakfast', 'pan_lebanese', 215],
  ['صفيحة اللحم الطرية', 'Soft Meat Sfiha', 'Sfiha à la viande tendre', 'Sfiha de carne tierna', 'Zarte Fleisch-Sfiha', 'manakish_pies', 'breakfast', 'pan_lebanese', 235],
  ['لحم بعجين بالبصل الحار', 'Spicy Onion Lahm b Ajin', 'Lahm b ajin aux oignons épicés', 'Lahm bi ajin con cebolla picante', 'Scharfes Lamm im Fladenbrot', 'manakish_pies', 'breakfast', 'pan_lebanese', 220],
  ['فطاير الجبنة بالزعتر', 'Cheese Fatayer with Zaatar', 'Fatayer au fromage et zaatar', 'Fatayer de queso con zaatar', 'Käse-Fatayer mit Zaatar', 'manakish_pies', 'breakfast', 'pan_lebanese', 195],
  ['فطاير السبانخ بالصنوبر', 'Spinach Fatayer with Pine Nuts', 'Fatayer aux épinards et pignons', 'Fatayer de espinacas con piñones', 'Spinat-Fatayer mit Pinienkernen', 'manakish_pies', 'breakfast', 'pan_lebanese', 185],
  ['فطارة اللحمة بالعجين المورق', 'Flaky Meat Fatayer', 'Fatayer de viande feuilleté', 'Fatayer de carne hojaldrado', 'Blätterteig-Fleisch-Fatayer', 'manakish_pies', 'breakfast', 'pan_lebanese', 235],
  ['معجنات الكشك بالبصل', 'Kishk Pies with Onions', 'Chaussons au kishk et oignons', 'Empanadas de kishk con cebolla', 'Kischk-Taschen mit Zwiebeln', 'manakish_pies', 'breakfast', 'pan_lebanese', 210],
  ['منقوشة بالحلوم والزعتر', 'Halloumi Zaatar Manakish', 'Manakish halloumi zaatar', 'Manakish de halloumi y zaatar', 'Halloumi-Zaatar-Manakish', 'manakish_pies', 'breakfast', 'pan_lebanese', 225],
  ['منقوشة الفطر', 'Mushroom Manakish', 'Manakish aux champignons', 'Manakish de champiñones', 'Pilz-Manakish', 'manakish_pies', 'breakfast', 'pan_lebanese', 190],
  ['معجنات الجبنة البيضاء', 'White Cheese Pastries', 'Chaussons au fromage blanc', 'Empanadas de queso blanco', 'Weißkäse-Gebäck', 'manakish_pies', 'breakfast', 'pan_lebanese', 205],
  ['رغيف الزعتر البلدي', 'Local Zaatar Loaf', 'Pain au zaatar maison', 'Pan de zaatar casero', 'Hausgemachtes Zaatar-Brot', 'manakish_pies', 'breakfast', 'pan_lebanese', 270],
  // mains_grills
  ['شيش طاووق بالثوم البلدي', 'Shish Taouk with Garlic', 'Chich taouk à l’ail', 'Shish taouk con ajo', 'Shish-Taouk mit Knoblauch', 'mains_grills', 'lunch', 'pan_lebanese', 205],
  ['كفتة مشوية بالبقدونس', 'Grilled Parsley Kofta', 'Kefta grillée au persil', 'Kofta a la brasa con perejil', 'Gegrillte Petersilien-Kofta', 'mains_grills', 'lunch', 'pan_lebanese', 190],
  ['كباب الكرز', 'Cherry Kebab', 'Kébab à la sauce cerise', 'Kebab de cereza', 'Kirsch-Kebab', 'mains_grills', 'lunch', 'zahle', 175],
  ['ريش غنم بالزعتر البلدي', 'Lamb Ribs with Zaatar', 'Côtelettes d’agneau au zaatar', 'Costillas de cordero con zaatar', 'Lammrippchen mit Zaatar', 'mains_grills', 'lunch', 'pan_lebanese', 215],
  ['مشاوي مشكلة لبنانية', 'Lebanese Mixed Grill', 'Grillade libanaise mixte', 'Mezcla libanesa a la brasa', 'Libanesische gemischte Grillplatte', 'mains_grills', 'lunch', 'beirut', 200],
  ['دجاج مشوي بالليمون والثوم', 'Lemon Garlic Grilled Chicken', 'Poulet grillé citron ail', 'Pollo asado con limón y ajo', 'Gegrilltes Hähnchen mit Zitrone und Knoblauch', 'mains_grills', 'lunch', 'pan_lebanese', 170],
  ['فاروج محشي بالأرز واللحم', 'Stuffed Chicken with Rice', 'Poulet farci au riz et viande', 'Pollo relleno de arroz y carne', 'Gefülltes Hähnchen mit Reis', 'mains_grills', 'lunch', 'pan_lebanese', 195],
  ['لحم بلبن بزبدة الصنوبر', 'Meat in Laban with Pine Nut Butter', 'Viande au laban beurre de pignons', 'Carne en laban con mantequilla de piñones', 'Fleisch in Laban mit Pinienbutter', 'mains_grills', 'lunch', 'pan_lebanese', 180],
  ['فريكة بلحم الضأن', 'Freekeh with Lamb', 'Freekeh à l’agneau', 'Freekeh con cordero', 'Freekeh mit Lamm', 'mains_grills', 'lunch', 'baalbek', 175],
  ['طاجن بامية باللحم', 'Lamb Okra Stew', 'Tajine de bamya à la viande', 'Tajín de okra con carne', 'Okra-Fleischeintopf', 'mains_grills', 'lunch', 'pan_lebanese', 130],
  ['طاجن لسان العصفور بالخضار', 'Vegetable Orzo Stew', 'Tajine de orzo aux légumes', 'Tajín de "lengua de pájaro" con verduras', 'Gemüse-Orzo-Tajine', 'mains_grills', 'lunch', 'pan_lebanese', 150],
  ['مسقعة صيداوية بالباذنجان', 'Sidon Moussaka with Eggplant', 'Moussaka de Sidon à l’aubergine', 'Moussaka de Sidón con berenjena', 'Sidon-Moussaka mit Aubergine', 'mains_grills', 'lunch', 'sidon', 135],
  ['شاورما اللحم بالطحينة', 'Meat Shawarma with Tahini', 'Chawarma de viande à la tahini', 'Shawarma de carne con tahini', 'Fleisch-Shawarma mit Tahini', 'mains_grills', 'lunch', 'beirut', 205],
  ['شاورما دجاج بالثومية', 'Chicken Shawarma with Garlic Sauce', 'Chawarma de poulet à la toum', 'Shawarma de pollo con salsa de ajo', 'Hähnchen-Shawarma mit Toum', 'mains_grills', 'lunch', 'pan_lebanese', 195],
  ['كوسا بلبن', 'Zucchini in Laban', 'Courgettes au laban', 'Calabacín en laban', 'Zucchini in Laban', 'mains_grills', 'lunch', 'pan_lebanese', 150],
  ['سلق باللحم والثوم', 'Swiss Chard with Meat and Garlic', 'Blette à la viande et à l’ail', 'Acelga con carne y ajo', 'Mangold mit Fleisch und Knoblauch', 'mains_grills', 'lunch', 'pan_lebanese', 140],
  ['جوانح دجاج محمرة بالرمان', 'Pomegranate Glazed Wings', 'Ailes de poulet à la grenade', 'Alitas con granada', 'Flügel mit Granatapfelglasur', 'mains_grills', 'lunch', 'pan_lebanese', 185],
  ['كبد الدجاج بالليمون', 'Chicken Livers with Lemon', 'Foies de volaille au citron', 'Hígados de pollo con limón', 'Hühnerlebern mit Zitrone', 'mains_grills', 'lunch', 'beirut', 175],
  ['كفتة بلبن', 'Kofta in Laban', 'Kefta au laban', 'Kofta en laban', 'Kofta in Laban', 'mains_grills', 'lunch', 'pan_lebanese', 205],
  ['دجاج بالبطاطا في الفرن', 'Baked Chicken with Potatoes', 'Poulet aux pommes de terre au four', 'Pollo con patatas al horno', 'Ofenhähnchen mit Kartoffeln', 'mains_grills', 'lunch', 'pan_lebanese', 185],
  ['محاشي الخضار المشكل', 'Assorted Stuffed Vegetables', 'Légumes farcis variés', 'Verduras rellenas variadas', 'Gefülltes Gemüse-Mischgericht', 'mains_grills', 'lunch', 'pan_lebanese', 150],
  ['طبق الشاورما مع الرز والثومية', 'Shawarma Plate with Rice and Toum', 'Assiette chawarma riz et toum', 'Plato de shawarma con arroz y toum', 'Shawarma-Teller mit Reis und Toum', 'mains_grills', 'lunch', 'beirut', 230],
  ['طاجن الكشك بالدجاج', 'Kishk Chicken Stew', 'Tajine de kishk au poulet', 'Tajín de kishk con pollo', 'Kischk-Hühnereintopf', 'mains_grills', 'lunch', 'pan_lebanese', 165],
  ['السماقية بالجوز واللحم', 'Sumac Stew with Walnuts and Meat', 'Ragoût au sumac, noix et viande', 'Guiso de suma, nuez y carne', 'Sumach-Eintopf mit Walnüssen und Fleisch', 'mains_grills', 'lunch', 'mena_shared', 185],
  // rice_dishes
  ['رز مفلفل بالشعيرية', 'Fluffy Rice with Vermicelli', 'Riz pilaf au vermicelle', 'Arroz esponjoso con fideos', 'Luftiger Reis mit Fadennudeln', 'rice_dishes', 'lunch', 'pan_lebanese', 165],
  ['رز باللحم المفروم والصنوبر', 'Rice with Minced Meat and Pine Nuts', 'Riz à la viande hachée et pignons', 'Arroz con carne picada y piñones', 'Reis mit Hackfleisch und Pinienkernen', 'rice_dishes', 'lunch', 'pan_lebanese', 190],
  ['رز محمر بالبهارات', 'Brown Rice with Spices', 'Riz doré aux épices', 'Arroz dorado con especias', 'Gewürzter goldener Reis', 'rice_dishes', 'lunch', 'pan_lebanese', 175],
  ['فريكة بزيت الزيتون', 'Freekeh with Olive Oil', 'Freekeh à l’huile d’olive', 'Freekeh con aceite de oliva', 'Freekeh mit Olivenöl', 'rice_dishes', 'lunch', 'pan_lebanese', 150],
  ['برغل بزيت الزيتون', 'Bulgur with Olive Oil', 'Boulgour à l’huile d’olive', 'Bulgur con aceite de oliva', 'Bulgur mit Olivenöl', 'rice_dishes', 'lunch', 'pan_lebanese', 145],
  ['مقلوبة الباذنجان', 'Eggplant Maqluba', 'Maqlouba d’aubergine', 'Maqluba de berenjena', 'Auberginen-Makluba', 'rice_dishes', 'lunch', 'pan_lebanese', 175],
  ['مقلوبة الدجاج', 'Chicken Maqluba', 'Maqlouba au poulet', 'Maqluba de pollo', 'Hähnchen-Makluba', 'rice_dishes', 'lunch', 'pan_lebanese', 170],
  ['رشتة باللحم والحمص', 'Rishta with Meat and Chickpeas', 'Richta à la viande et pois chiches', 'Rishta con carne y garbanzos', 'Rishta mit Fleisch und Kichererbsen', 'rice_dishes', 'lunch', 'pan_lebanese', 180],
  ['كشكة اللبن بالرز', 'Kishk Rice Porridge', 'Bouillie de kishk au riz', 'Gachas de kishk con arroz', 'Kischk-Reis-Brei', 'rice_dishes', 'lunch', 'baalbek', 145],
  ['رز باللحم المحمر', 'Rice with Browned Meat', 'Riz à la viande rissolée', 'Arroz con carne dorada', 'Reis mit angebratenem Fleisch', 'rice_dishes', 'lunch', 'pan_lebanese', 165],
  ['رز بزيت الزيتون والصنوبر', 'Rice with Olive Oil and Pine Nuts', 'Riz huile d’olive et pignons', 'Arroz con aceite de oliva y piñones', 'Reis mit Olivenöl und Pinienkernen', 'rice_dishes', 'lunch', 'pan_lebanese', 160],
  ['مفتول بالخضار', 'Miftul with Vegetables', 'Miftoul aux légumes', 'Miftul con verduras', 'Miftul mit Gemüse', 'rice_dishes', 'lunch', 'pan_lebanese', 160],
  ['رز أصفر بالهيل', 'Yellow Rice with Cardamom', 'Riz jaune à la cardamome', 'Arroz amarillo con cardamomo', 'Gelber Reis mit Kardamom', 'rice_dishes', 'lunch', 'pan_lebanese', 150],
  ['حشوة الرز للخضار', 'Rice Stuffing for Vegetables', 'Farce de riz pour légumes', 'Relleno de arroz para verduras', 'Reisfüllung für Gemüse', 'rice_dishes', 'lunch', 'pan_lebanese', 175],
  ['شوربة الأرز باليانسون', 'Rice Anise Soup', 'Soupe de riz à l’anis', 'Sopa de arroz con anís', 'Reis-Anissuppe', 'rice_dishes', 'dinner', 'pan_lebanese', 90],
  // fish_seafood
  ['سمك مشوي بالفحم بالبهارات البلدي', 'Charcoal Grilled Fish', 'Poisson grillé au charbon', 'Pescado a la brasa', 'Holzkohle-gegrillter Fisch', 'fish_seafood', 'lunch', 'pan_lebanese', 175],
  ['سلطان إبراهيم بالثوم', 'Red Mullet with Garlic', 'Rouget à l’ail', 'Salmonete con ajo', 'Meerbarbe mit Knoblauch', 'fish_seafood', 'lunch', 'pan_lebanese', 150],
  ['روبيان بالليمون والثوم', 'Shrimp with Lemon and Garlic', 'Crevettes citron ail', 'Gambas con limón y ajo', 'Garnelen mit Zitrone und Knoblauch', 'fish_seafood', 'lunch', 'jbeil', 125],
  ['سردين مقلي بالزيت البلدي', 'Fried Sardines in Olive Oil', 'Sardines frites à l’huile d’olive', 'Sardinas fritas en aceite de oliva', 'Gebratene Sardinen in Olivenöl', 'fish_seafood', 'lunch', 'pan_lebanese', 185],
  ['سمك بوري بالفرن', 'Baked Mullet', 'Mulet au four', 'Lisa al horno', 'Gebackene Meeräsche', 'fish_seafood', 'lunch', 'pan_lebanese', 165],
  ['حبار مقلي بالثوم', 'Fried Squid with Garlic', 'Calmars frits à l’ail', 'Calamar frito con ajo', 'Gebratener Tintenfisch mit Knoblauch', 'fish_seafood', 'lunch', 'jbeil', 170],
  ['سمك بالحمرة والثوم', 'Fish with Red Sauce and Garlic', 'Poisson sauce rouge à l’ail', 'Pescado en salsa roja con ajo', 'Fisch in roter Knoblauchsauce', 'fish_seafood', 'lunch', 'tarablus', 175],
  ['صيادية بالرز الأصفر', 'Sayadieh with Yellow Rice', 'Sayadieh au riz jaune', 'Sayadiye con arroz amarillo', 'Sayadieh mit gelbem Reis', 'fish_seafood', 'lunch', 'tarablus', 165],
  // sweets_desserts
  ['كنافة بالقشطة البلدي', 'Kanafeh with Local Cream', 'Kanafé à la crème', 'Kanafe con crema', 'Kanafeh mit Creme', 'sweets_desserts', 'snacks', 'pan_lebanese', 225],
  ['معمول الجوز', 'Walnut Maamoul', 'Maamoul aux noix', 'Maamoul de nuez', 'Walnuss-Maamoul', 'sweets_desserts', 'snacks', 'pan_lebanese', 265],
  ['معمول العيد بالسميد', 'Eid Semolina Maamoul', 'Maamoul de l’Aïd à la semoule', 'Maamoul festivo de sémola', 'Grieß-Maamoul zum Fest', 'sweets_desserts', 'snacks', 'pan_lebanese', 250],
  ['برازق البلدي', 'Local Barazek', 'Barazek local', 'Barazek local', 'Lokales Barazek', 'sweets_desserts', 'snacks', 'pan_lebanese', 345],
  ['قطايف بالقشطة والصنوبر', 'Qatayef with Cream and Pine Nuts', 'Katayef crème et pignons', 'Qatayef con crema y piñones', 'Qatayef mit Creme und Pinienkernen', 'sweets_desserts', 'snacks', 'pan_lebanese', 245],
  ['قطايف محمرة بالعسل', 'Fried Qatayef with Honey', 'Katayef dorés au miel', 'Qatayef dorados con miel', 'Goldbraune Qatayef mit Honig', 'sweets_desserts', 'snacks', 'pan_lebanese', 265],
  ['بقلاوة الجوز الفاخرة', 'Deluxe Walnut Baklava', 'Baklava de luxe aux noix', 'Baklava de lujo con nuez', 'Luxus-Walnuss-Baklava', 'sweets_desserts', 'snacks', 'tarablus', 330],
  ['زلابية بعسل البلدي', 'Zalabia with Honey', 'Zlabia au miel', 'Zalabia con miel', 'Zalabia mit Honig', 'sweets_desserts', 'snacks', 'pan_lebanese', 285],
  ['مهلبية بماء الزهر والفستق', 'Muhallabieh with Orange Blossom and Pistachios', 'Mhalabieh à la fleur d’oranger et pistaches', 'Muhalabiya con flor de azahar y pistachos', 'Muhallabieh mit Orangenblüte und Pistazien', 'sweets_desserts', 'snacks', 'pan_lebanese', 125],
  ['رز بالحليب والفستق', 'Rice Pudding with Pistachios', 'Riz au lait aux pistaches', 'Arroz con leche y pistachos', 'Milchreis mit Pistazien', 'sweets_desserts', 'snacks', 'pan_lebanese', 145],
  ['مغلي بالفستق والبهارات', 'Meghli with Pistachios and Spices', 'Meghli aux pistaches et épices', 'Meghli con pistachos y especias', 'Meghli mit Pistazien und Gewürzen', 'sweets_desserts', 'snacks', 'pan_lebanese', 105],
  ['حلاوة الطحينية بالفستق', 'Tahini Halva with Pistachios', 'Halva de tahini aux pistaches', 'Halva de tahini con pistacho', 'Tahini-Halva mit Pistazien', 'sweets_desserts', 'snacks', 'pan_lebanese', 210],
  ['بسبوسة بالسميد والفستق', 'Semolina Pistachio Basbousa', 'Basboussa semoule pistache', 'Basbusa de sémola y pistachos', 'Grieß-Pistazien-Basbousa', 'sweets_desserts', 'snacks', 'pan_lebanese', 240],
  ['شعيرية محمرة بالعسل', 'Fried Vermicelli with Honey', 'Vermicelle doré au miel', 'Fideos dorados con miel', 'Goldene Fadennudeln mit Honig', 'sweets_desserts', 'snacks', 'pan_lebanese', 225],
  // dairy_eggs_drinks
  ['لبنة بالفلفل البلدي', 'Labneh with Local Pepper', 'Labneh au poivre', 'Labneh con pimiento local', 'Labneh mit heimischem Pfeffer', 'dairy_eggs_drinks', 'breakfast', 'pan_lebanese', 95],
  ['سحلب بالصنوبر', 'Salep with Pine Nuts', 'Sahlab aux pignons', 'Sahlab con piñones', 'Sahlab mit Pinienkernen', 'dairy_eggs_drinks', 'breakfast', 'pan_lebanese', 125],
  ['قشطة بلدية بالعسل', 'Local Cream with Honey', 'Crème locale au miel', 'Crema local con miel', 'Lokale Sahne mit Honig', 'dairy_eggs_drinks', 'breakfast', 'pan_lebanese', 115],
  ['بيض بالصنوبر', 'Eggs with Pine Nuts', 'Œufs aux pignons', 'Huevos con piñones', 'Eier mit Pinienkernen', 'dairy_eggs_drinks', 'breakfast', 'pan_lebanese', 175],
  ['عجة الخضار البلدي', 'Local Vegetable Omelette', 'Omelette aux légumes', 'Tortilla de verduras', 'Gemüseomelett', 'dairy_eggs_drinks', 'breakfast', 'pan_lebanese', 125],
  ['اللبن البلدي بالنعناع', 'Laban with Mint', 'Laban à la menthe', 'Laban con menta', 'Laban mit Minze', 'dairy_eggs_drinks', 'breakfast', 'pan_lebanese', 60],
  ['عصير الليموناضة بالنعناع البلدي', 'Local Lemonade with Mint', 'Citronnade locale à la menthe', 'Limonada local con menta', 'Lokale Limonade mit Minze', 'dairy_eggs_drinks', 'breakfast', 'pan_lebanese', 30],
  ['مشروب الميرمية بالعسل', 'Sage Drink with Honey', 'Boisson de sauge au miel', 'Bebida de salvia con miel', 'Salbeigetränk mit Honig', 'dairy_eggs_drinks', 'breakfast', 'pan_lebanese', 35],
];

const categories = ['mezze_appetizers', 'salads', 'soups', 'kibbeh_dishes', 'manakish_pies', 'mains_grills', 'rice_dishes', 'fish_seafood', 'sweets_desserts', 'dairy_eggs_drinks'];
const regions = ['pan_lebanese', 'levantine_shared', 'mena_shared', 'beirut', 'tarablus', 'sidon', 'jbeil', 'baalbek', 'zahle', 'jezzine'];
const meal_types = ['breakfast', 'lunch', 'snacks', 'dinner'];

const dishes = ROWS.map((r) => ({
  name_ar: r[0], name_en: r[1], name_fr: r[2], name_es: r[3], name_de: r[4],
  category: r[5], mealType: r[6], region: r[7], cal_100: r[8],
}));

const guard = (cond, msg) => { if (!cond) { console.error(msg); process.exit(1); } };
guard(dishes.length === 150, `expected 150 dishes, got ${dishes.length}`);
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

const out = { kitchen: 'lebanese', target_total: 300, new_dishes: 150, categories, regions, meal_types, dishes };
fs.writeFileSync(path.join(__dirname, 'lebanon-150-proposal.json'), JSON.stringify(out, null, 2));
console.log('categories', JSON.stringify(cats));
console.log('regions', JSON.stringify(rgns));
console.log('total', dishes.length);
console.log('wrote scripts/lebanon-150-proposal.json');