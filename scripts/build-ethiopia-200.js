// Authoring script for the Ethiopian 200-dish proposal (scripts/ethiopia-200-proposal.json).
// 200 NEW dishes (the 100 legacy rows live in src/data/ethiopian-full.ts). Mirrors the
// Nigeria/Malaysia/Indonesia authoring pattern: R() helper + per-category macro templates.
// Regions: pan_ethiopian by default (golden rule), regional anchors (amhara, oromia, tigray,
// addis_ababa, afar, sidama), african_shared for dishes shared across East Africa (credited to
// the Ethiopian card at runtime via the source prefix). All Arabic names carry an
// إثيوبي/إثيوبية token (halal profile: no pork). Emphasizes Injera, Doro Wat, Tibs, Shiro, Kitfo.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100) => ({
  name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100,
});

const dishes = [];

// ============================================================ PAN_ETHIOPIAN + REGIONAL (200)
// --- breakfast_items (14) ----------------------------------------------------
dishes.push(
  R('فول مدمس فطار إثيوبي', 'Foul breakfast Ethiopian', 'Foul petit-déjeuner éthiopien', 'Foul desayuno etíope', 'Foul äthiopisches Frühstück', 'breakfast_items', 'breakfast', 'pan_ethiopian', 115),
  R('بولاغا عصيدة فطار إثيوبية', 'Bulaga porridge breakfast Ethiopian', 'Bouillie bulaga petit-déjeuner éthiopien', 'Gachas bulaga desayuno etíope', 'Bulaga-Brei äthiopisches Frühstück', 'breakfast_items', 'breakfast', 'amhara', 130),
  R('تشيتشا حبوب محمصة فطار إثيوبية', 'Checha roasted grains breakfast Ethiopian', 'Checha céréales grillées petit-déjeuner éthiopien', 'Checha cereales tostadas desayuno etíope', 'Checha geröstete Körner äthiopisches Frühstück', 'breakfast_items', 'breakfast', 'amhara', 150),
  R('إنجيرا فطار كامل إثيوبي', 'Full injera breakfast Ethiopian', 'Injera petit-déjeuner complet éthiopien', 'Injera desayuno completo etíope', 'Injera-Spezialfrühstück äthiopisch', 'breakfast_items', 'breakfast', 'pan_ethiopian', 150),
  R('غينفو بالحليب فطار إثيوبي', 'Genfo with milk breakfast Ethiopian', 'Genfo au lait petit-déjeuner éthiopien', 'Genfo con leche desayuno etíope', 'Genfo mit Milch äthiopisches Frühstück', 'breakfast_items', 'breakfast', 'amhara', 165),
  R('بيض مقلي فطار إثيوبي', 'Fried eggs breakfast Ethiopian', 'Œufs frits petit-déjeuner éthiopien', 'Huevos fritos desayuno etíope', 'Spiegeleier äthiopisches Frühstück', 'breakfast_items', 'breakfast', 'pan_ethiopian', 125),
  R('كولو محمص فطار إثيوبي', 'Kolo roasted grain mix Ethiopian', 'Kolo mélange de céréales grillées éthiopien', 'Kolo mezcla de granos tostados etíope', 'Kolo-Geröstete Körnermischung äthiopisch', 'breakfast_items', 'breakfast', 'amhara', 380),
  R('دابو مع جبن فطار إثيوبي', 'Dabo with cheese breakfast Ethiopian', 'Dabo au fromage petit-déjeuner éthiopien', 'Dabo con queso desayuno etíope', 'Dabo mit Käse äthiopisches Frühstück', 'breakfast_items', 'breakfast', 'addis_ababa', 210),
  R('شاي زنجبيل فطار إثيوبي', 'Ginger tea breakfast Ethiopian', 'Thé au gingembre petit-déjeuner éthiopien', 'Té de jengibre desayuno etíope', 'Ingwertee äthiopisches Frühstück', 'breakfast_items', 'breakfast', 'pan_ethiopian', 40),
  R('قهوة بالحليب فطار إثيوبية', 'Coffee with milk breakfast Ethiopian', 'Café au lait petit-déjeuner éthiopien', 'Café con leche desayuno etíope', 'Kaffee mit Milch äthiopisches Frühstück', 'breakfast_items', 'breakfast', 'pan_ethiopian', 50),
  R('أرز بالحليب فطار إثيوبي', 'Rice with milk breakfast Ethiopian', 'Riz au lait petit-déjeuner éthiopien', 'Arroz con leche desayuno etíope', 'Reis mit Milch äthiopisches Frühstück', 'breakfast_items', 'breakfast', 'pan_ethiopian', 140),
  R('فطائر موز فطار إثيوبية', 'Banana pancakes breakfast Ethiopian', 'Crêpes à la banane petit-déjeuner éthiopien', 'Panqueques de plátano desayuno etíope', 'Bananenpfannkuchen äthiopisches Frühstück', 'breakfast_items', 'breakfast', 'sidama', 190),
  R('عسل مع دابو فطار إثيوبي', 'Honey with dabo breakfast Ethiopian', 'Miel avec dabo petit-déjeuner éthiopien', 'Miel con dabo desayuno etíope', 'Honig mit Dabo äthiopisches Frühstück', 'breakfast_items', 'breakfast', 'pan_ethiopian', 215),
  R('بيض مخفوق بخضار فطار إثيوبي', 'Scrambled eggs vegetables breakfast Ethiopian', 'Œufs brouillés aux légumes petit-déjeuner éthiopien', 'Huevos revueltos con verduras desayuno etíope', 'Rührei mit Gemüse äthiopisches Frühstück', 'breakfast_items', 'breakfast', 'addis_ababa', 130),
);
// --- breads_flatbreads (24) --------------------------------------------------
dishes.push(
  R('إنجيرا تيفف أبيض خبز إثيوبي', 'White teff injera Ethiopian', 'Injera de teff blanc éthiopien', 'Injera de tef blanco etíope', 'Weißes Teff-Injera äthiopisch', 'breads_flatbreads', 'breakfast', 'pan_ethiopian', 100),
  R('إنجيرا حمراء خبز إثيوبي', 'Red injera Ethiopian', 'Injera rouge éthiopien', 'Injera rojo etíope', 'Rotes Injera äthiopisch', 'breads_flatbreads', 'breakfast', 'pan_ethiopian', 95),
  R('إنجيرا ذرة خبز إثيوبي', 'Corn injera Ethiopian', 'Injera de maïs éthiopien', 'Injera de maíz etíope', 'Mais-Injera äthiopisch', 'breads_flatbreads', 'breakfast', 'sidama', 90),
  R('إنجيرا مخلوطة خبز إثيوبي', 'Mixed grain injera Ethiopian', 'Injera de céréales mélangées éthiopien', 'Injera de granos mixtos etíope', 'Mischgetreide-Injera äthiopisch', 'breads_flatbreads', 'breakfast', 'pan_ethiopian', 95),
  R('إنجيرا سورجو خبز إثيوبي', 'Sorghum injera Ethiopian', 'Injera de sorgho éthiopien', 'Injera de sorgo etíope', 'Sorghum-Injera äthiopisch', 'breads_flatbreads', 'breakfast', 'afar', 100),
  R('أنشابارو خبز قمح كامل إثيوبي', 'Anchabaro whole wheat bread Ethiopian', 'Pain complet anchabaro éthiopien', 'Pan integral anchabaro etíope', 'Anchabaro-Vollkornbrot äthiopisch', 'breads_flatbreads', 'breakfast', 'amhara', 180),
  R('دابو سمسم خبز إثيوبي', 'Sesame dabo bread Ethiopian', 'Pain dabo au sésame éthiopien', 'Pan dabo con sésamo etíope', 'Sesam-Dabo-Brot äthiopisch', 'breads_flatbreads', 'breakfast', 'amhara', 205),
  R('دابو بطاطس خبز إثيوبي', 'Potato dabo bread Ethiopian', 'Pain dabo aux pommes de terre éthiopien', 'Pan dabo de patata etíope', 'Kartoffel-Dabo-Brot äthiopisch', 'breads_flatbreads', 'breakfast', 'addis_ababa', 170),
  R('كيتا دقيق خبز إثيوبي', 'Flour kita bread Ethiopian', 'Pain kita de farine éthiopien', 'Pan kita de harina etíope', 'Mehl-Kita-Brot äthiopisch', 'breads_flatbreads', 'breakfast', 'amhara', 175),
  R('أنباشا عسل خبز إثيوبي', 'Honey ambasha bread Ethiopian', 'Pain ambasha au miel éthiopien', 'Pan ambasha de miel etíope', 'Honig-Ambasha-Brot äthiopisch', 'breads_flatbreads', 'breakfast', 'amhara', 210),
  R('قوروشا خبز شعير إثيوبي', 'Qorosha barley bread Ethiopian', 'Pain d orge qorosha éthiopien', 'Pan de cebada qorosha etíope', 'Qorosha-Gerstenbrot äthiopisch', 'breads_flatbreads', 'breakfast', 'tigray', 175),
  R('هيمباشا فانيليا خبز إثيوبي', 'Vanilla himbasha bread Ethiopian', 'Pain himbasha à la vanille éthiopien', 'Pan himbasha de vainilla etíope', 'Vanille-Himbasha-Brot äthiopisch', 'breads_flatbreads', 'breakfast', 'pan_ethiopian', 195),
  R('دابو جبنة خبز إثيوبي', 'Cheese dabo bread Ethiopian', 'Pain dabo au fromage éthiopien', 'Pan dabo con queso etíope', 'Käse-Dabo-Brot äthiopisch', 'breads_flatbreads', 'breakfast', 'addis_ababa', 205),
  R('إنجيرا شعير زنجبيل خبز إثيوبي', 'Barley ginger injera Ethiopian', 'Injera d orge au gingembre éthiopien', 'Injera de cebada con jengibre etíope', 'Gersten-Ingwer-Injera äthiopisch', 'breads_flatbreads', 'breakfast', 'pan_ethiopian', 100),
  R('خبز قمح كامل إثيوبي', 'Whole wheat bread Ethiopian', 'Pain de blé complet éthiopien', 'Pan de trigo integral etíope', 'Vollkornbrot äthiopisch', 'breads_flatbreads', 'breakfast', 'pan_ethiopian', 195),
  R('خبز جوز هند إثيوبي', 'Coconut bread Ethiopian', 'Pain à la noix de coco éthiopien', 'Pan de coco etíope', 'Kokosbrot äthiopisch', 'breads_flatbreads', 'breakfast', 'sidama', 215),
  R('خبز حلو معطر إثيوبي', 'Sweet spiced bread Ethiopian', 'Pain sucré épicé éthiopien', 'Pan dulce especiado etíope', 'Süßes Gewürzbrot äthiopisch', 'breads_flatbreads', 'breakfast', 'addis_ababa', 205),
  R('دابو حليب خبز إثيوبي', 'Milk dabo bread Ethiopian', 'Pain dabo au lait éthiopien', 'Pan dabo con leche etíope', 'Milch-Dabo-Brot äthiopisch', 'breads_flatbreads', 'breakfast', 'amhara', 190),
  R('كيتا محلى خبز إثيوبي', 'Sweet kita bread Ethiopian', 'Kita sucré éthiopien', 'Kita dulce etíope', 'Süßes Kita-Brot äthiopisch', 'breads_flatbreads', 'breakfast', 'oromia', 200),
  R('خبز الذرة الأصفر إثيوبي', 'Yellow corn bread Ethiopian', 'Pain de maïs jaune éthiopien', 'Pan de maíz amarillo etíope', 'Gelbes Maisbrot äthiopisch', 'breads_flatbreads', 'breakfast', 'pan_ethiopian', 185),
  R('خبز تيفف إثيوبي', 'Teff bread Ethiopian', 'Pain de teff éthiopien', 'Pan de tef etíope', 'Teffbrot äthiopisch', 'breads_flatbreads', 'breakfast', 'pan_ethiopian', 200),
  R('قرص طحين إثيوبي', 'Flour round bread Ethiopian', 'Pain rond de farine éthiopien', 'Pan redondo de harina etíope', 'Rundes Mehlbrot äthiopisch', 'breads_flatbreads', 'breakfast', 'afar', 180),
  R('خبز سورجو إثيوبي', 'Sorghum bread Ethiopian', 'Pain de sorgho éthiopien', 'Pan de sorgo etíope', 'Sorghumbrot äthiopisch', 'breads_flatbreads', 'breakfast', 'afar', 190),
  R('خبز سمسم أسود إثيوبي', 'Black sesame bread Ethiopian', 'Pain au sésame noir éthiopien', 'Pan de sésamo negro etíope', 'Schwarzbrot mit Sesam äthiopisch', 'breads_flatbreads', 'breakfast', 'tigray', 215),
);
// --- rice_biryani (10) -------------------------------------------------------
dishes.push(
  R('تبيس رايس أرز لحم إثيوبي', 'Tibs rice Ethiopian', 'Riz aux tibs éthiopien', 'Arroz con tibs etíope', 'Tibs-Reis äthiopisch', 'rice_biryani', 'lunch', 'addis_ababa', 220),
  R('أرز دورو وات دجاج إثيوبي', 'Doro wat rice Ethiopian', 'Riz au doro wat éthiopien', 'Arroz con doro wat etíope', 'Doro-Wat-Reis äthiopisch', 'rice_biryani', 'lunch', 'pan_ethiopian', 210),
  R('أرز شيرو إثيوبي', 'Shiro rice Ethiopian', 'Riz au shiro éthiopien', 'Arroz con shiro etíope', 'Shiro-Reis äthiopisch', 'rice_biryani', 'lunch', 'pan_ethiopian', 150),
  R('أرز ميسير إثيوبي', 'Misir rice Ethiopian', 'Riz au misir éthiopien', 'Arroz con misir etíope', 'Misir-Reis äthiopisch', 'rice_biryani', 'lunch', 'pan_ethiopian', 160),
  R('أرز زعفران إثيوبي', 'Saffron rice Ethiopian', 'Riz au safran éthiopien', 'Arroz con azafrán etíope', 'Safranreis äthiopisch', 'rice_biryani', 'lunch', 'tigray', 215),
  R('أرز مبخر إثيوبي', 'Steamed spiced rice Ethiopian', 'Riz épicé à la vapeur éthiopien', 'Arroz especiado al vapor etíope', 'Gedämpfter Gewürzreis äthiopisch', 'rice_biryani', 'lunch', 'addis_ababa', 230),
  R('أرز جوز هند حار إثيوبي', 'Spicy coconut rice Ethiopian', 'Riz épicé à la noix de coco éthiopien', 'Arroz picante con coco etíope', 'Würziger Kokosreis äthiopisch', 'rice_biryani', 'lunch', 'sidama', 220),
  R('أرز خضار إثيوبي', 'Vegetable rice Ethiopian', 'Riz aux légumes éthiopien', 'Arroz con verduras etíope', 'Gemüsereis äthiopisch', 'rice_biryani', 'lunch', 'pan_ethiopian', 175),
  R('أرز دجاج كاري إثيوبي', 'Chicken curry rice Ethiopian', 'Riz au curry de poulet éthiopien', 'Arroz con curry de pollo etíope', 'Hähnchen-Curry-Reis äthiopisch', 'rice_biryani', 'lunch', 'addis_ababa', 225),
  R('أرز عيد إثيوبي', 'Festive rice Ethiopian', 'Riz de fête éthiopien', 'Arroz festivo etíope', 'Festtagsreis äthiopisch', 'rice_biryani', 'lunch', 'pan_ethiopian', 200),
);
// --- dals_legumes (16) -------------------------------------------------------
dishes.push(
  R('كيك وات عدس أصفر إثيوبي', 'Kik wat yellow lentils Ethiopian', 'Kik wat lentilles jaunes éthiopien', 'Kik wat lentejas amarillas etíope', 'Kik-Wat gelbe Linsen äthiopisch', 'dals_legumes', 'lunch', 'pan_ethiopian', 150),
  R('أزيفا عدس بني إثيوبي', 'Azeefa brown lentils Ethiopian', 'Azeefa lentilles brunes éthiopien', 'Azeefa lentejas marrones etíope', 'Azeefa braune Linsen äthiopisch', 'dals_legumes', 'lunch', 'tigray', 130),
  R('شيرو فول إثيوبي', 'Chickpea shiro Ethiopian', 'Shiro de pois chiches éthiopien', 'Shiro de garbanzos etíope', 'Kichererbsen-Shiro äthiopisch', 'dals_legumes', 'lunch', 'pan_ethiopian', 140),
  R('مسير حمص إثيوبي', 'Chickpea masala Ethiopian', 'Pois chiches masala éthiopiens', 'Garbanzos masala etíopes', 'Kichererbsen-Masala äthiopisch', 'dals_legumes', 'lunch', 'pan_ethiopian', 145),
  R('عدس مع خضار إثيوبي', 'Lentils with vegetables Ethiopian', 'Lentilles aux légumes éthiopien', 'Lentejas con verduras etíope', 'Linsen mit Gemüse äthiopisch', 'dals_legumes', 'lunch', 'pan_ethiopian', 120),
  R('فاصولياء بيضاء إثيوبية', 'White beans Ethiopian', 'Haricots blancs éthiopiens', 'Frijoles blancos etíopes', 'Weiße Bohnen äthiopisch', 'dals_legumes', 'lunch', 'tigray', 150),
  R('حب العزيز مطهو إثيوبي', 'Stewed tiger nuts Ethiopian', 'Souchets mijotés éthiopiens', 'Chufas guisadas etíopes', 'Geschmorte Erdmandeln äthiopisch', 'dals_legumes', 'lunch', 'oromia', 185),
  R('عدس أحمر أليتشا إثيوبي', 'Mild red lentils Ethiopian', 'Lentilles rouges douces éthiopien', 'Lentejas rojas suaves etíope', 'Mildef rote Linsen äthiopisch', 'dals_legumes', 'lunch', 'pan_ethiopian', 110),
  R('بازلاء مطهوة إثيوبية', 'Stewed peas Ethiopian', 'Pois mijotés éthiopiens', 'Guisantes guisados etíopes', 'Geschmorte Erbsen äthiopisch', 'dals_legumes', 'lunch', 'pan_ethiopian', 125),
  R('فول مع بصل إثيوبي', 'Foul with onions Ethiopian', 'Fèves aux oignons éthiopien', 'Habas con cebolla etíope', 'Foul mit Zwiebeln äthiopisch', 'dals_legumes', 'lunch', 'amhara', 130),
  R('شيرو مع زبدة إثيوبي', 'Shiro with butter Ethiopian', 'Shiro au beurre éthiopien', 'Shiro con mantequilla etíope', 'Shiro mit Butter äthiopisch', 'dals_legumes', 'lunch', 'amhara', 165),
  R('عدس برتقالي حار إثيوبي', 'Spicy orange lentils Ethiopian', 'Lentilles orangées épicées éthiopien', 'Lentejas naranjas picantes etíope', 'Würzige orangefarbene Linsen äthiopisch', 'dals_legumes', 'lunch', 'pan_ethiopian', 145),
  R('حمص مطهو إثيوبي', 'Stewed chickpeas Ethiopian', 'Pois chiches mijotés éthiopiens', 'Garbanzos guisados etíopes', 'Geschmorte Kichererbsen äthiopisch', 'dals_legumes', 'lunch', 'pan_ethiopian', 135),
  R('فاصولياء حمراء إثيوبية', 'Red beans Ethiopian', 'Haricots rouges éthiopiens', 'Frijoles rojos etíopes', 'Rote Bohnen äthiopisch', 'dals_legumes', 'lunch', 'pan_ethiopian', 155),
  R('عدس أخضر مطهو إثيوبي', 'Stewed green lentils Ethiopian', 'Lentilles vertes mijotées éthiopien', 'Lentejas verdes guisadas etíope', 'Geschmorte grüne Linsen äthiopisch', 'dals_legumes', 'lunch', 'sidama', 130),
  R('شيرو خفيف إثيوبي', 'Light shiro Ethiopian', 'Shiro léger éthiopien', 'Shiro ligero etíope', 'Leichtes Shiro äthiopisch', 'dals_legumes', 'lunch', 'pan_ethiopian', 120),
);
// --- vegetarian_mains (22) ---------------------------------------------------
dishes.push(
  R('أتاكيلت كامل إثيوبي', 'Atakilt full Ethiopian', 'Atakilt complet éthiopien', 'Atakilt completo etíope', 'Atakilt komplett äthiopisch', 'vegetarian_mains', 'lunch', 'pan_ethiopian', 90),
  R('غومن مع جزر إثيوبي', 'Gomen with carrots Ethiopian', 'Gomen aux carottes éthiopien', 'Gomen con zanahorias etíope', 'Gomen mit Karotten äthiopisch', 'vegetarian_mains', 'lunch', 'pan_ethiopian', 85),
  R('تيكيل غومن بطاطس إثيوبي', 'Tikil gomen with potato Ethiopian', 'Tikil gomen aux pommes de terre éthiopien', 'Tikil gomen con patata etíope', 'Tikil-Gomen mit Kartoffel äthiopisch', 'vegetarian_mains', 'lunch', 'pan_ethiopian', 95),
  R('دينيش كاري إثيوبي', 'Curried potatoes Ethiopian', 'Pommes de terre au curry éthiopien', 'Patatas al curry etíope', 'Curry-Kartoffeln äthiopisch', 'vegetarian_mains', 'lunch', 'sidama', 100),
  R('بامية مطهوة إثيوبية', 'Stewed okra Ethiopian', 'Gombo mijoté éthiopien', 'Quingombó guisado etíope', 'Geschmorte Okra äthiopisch', 'vegetarian_mains', 'lunch', 'pan_ethiopian', 80),
  R('قرع مطهو إثيوبي', 'Stewed pumpkin Ethiopian', 'Courge mijotée éthiopienne', 'Calabaza guisada etíope', 'Geschmorter Kürbis äthiopisch', 'vegetarian_mains', 'lunch', 'oromia', 110),
  R('ملفوف مطهو إثيوبي', 'Stewed cabbage Ethiopian', 'Chou mijoté éthiopien', 'Repollo guisado etíope', 'Geschmorter Kohl äthiopisch', 'vegetarian_mains', 'lunch', 'pan_ethiopian', 85),
  R('سبانخ بالثوم إثيوبي', 'Spinach with garlic Ethiopian', 'Épinards à l ail éthiopien', 'Espinacas con ajo etíope', 'Spinat mit Knoblauch äthiopisch', 'vegetarian_mains', 'lunch', 'pan_ethiopian', 75),
  R('باذنجان مطهو إثيوبي', 'Stewed eggplant Ethiopian', 'Aubergine mijotée éthiopienne', 'Berenjena guisada etíope', 'Geschmorte Aubergine äthiopisch', 'vegetarian_mains', 'lunch', 'oromia', 90),
  R('لكيلو خضار حار إثيوبي', 'Leko spicy vegetables Ethiopian', 'Leko légumes épicés éthiopien', 'Leko verduras picantes etíope', 'Leko würziges Gemüse äthiopisch', 'vegetarian_mains', 'lunch', 'pan_ethiopian', 95),
  R('بيض مع خضار إثيوبي', 'Eggs with vegetables Ethiopian', 'Œufs aux légumes éthiopien', 'Huevos con verduras etíope', 'Eier mit Gemüse äthiopisch', 'vegetarian_mains', 'lunch', 'pan_ethiopian', 130),
  R('شمندر مطهو إثيوبي', 'Stewed beetroot Ethiopian', 'Betterave mijotée éthiopienne', 'Remolacha guisada etíope', 'Geschmorte Rote Bete äthiopisch', 'vegetarian_mains', 'lunch', 'tigray', 95),
  R('جزر وبازلاء مطهوان إثيوبيان', 'Carrots and peas Ethiopian', 'Carottes et petits pois éthiopiens', 'Zanahorias y guisantes etíopes', 'Karotten und Erbsen äthiopisch', 'vegetarian_mains', 'lunch', 'pan_ethiopian', 100),
  R('فطر مطهو إثيوبي', 'Stewed mushrooms Ethiopian', 'Champignons mijotés éthiopiens', 'Setas guisadas etíopes', 'Geschmorte Pilze äthiopisch', 'vegetarian_mains', 'lunch', 'addis_ababa', 85),
  R('قرنبيط مطهو إثيوبي', 'Stewed cauliflower Ethiopian', 'Chou-fleur mijoté éthiopien', 'Coliflor guisada etíope', 'Geschmorter Blumenkohl äthiopisch', 'vegetarian_mains', 'lunch', 'pan_ethiopian', 90),
  R('يخنة خضار مشكلة إثيوبية', 'Mixed vegetable stew Ethiopian', 'Ragoût de légumes mélangés éthiopien', 'Guiso de verduras mixtas etíope', 'Gemüseeintopf Mix äthiopisch', 'vegetarian_mains', 'lunch', 'pan_ethiopian', 95),
  R('فلفل محشي خضار إثيوبي', 'Stuffed vegetable pepper Ethiopian', 'Poivron farci aux légumes éthiopien', 'Pimiento relleno de verduras etíope', 'Gefüllte Gemüsepaprika äthiopisch', 'vegetarian_mains', 'lunch', 'oromia', 120),
  R('كوسة مطهوة إثيوبية', 'Stewed zucchini Ethiopian', 'Courgette mijotée éthiopienne', 'Calabacín guisado etíope', 'Geschmorte Zucchini äthiopisch', 'vegetarian_mains', 'lunch', 'sidama', 85),
  R('يخنة إنسيت إثيوبية', 'Enset stew Ethiopian', 'Ragoût d ensète éthiopien', 'Guiso de ensete etíope', 'Enset-Eintopf äthiopisch', 'vegetarian_mains', 'lunch', 'sidama', 110),
  R('خضار بالجبن إثيوبي', 'Vegetables with cheese Ethiopian', 'Légumes au fromage éthiopien', 'Verduras con queso etíope', 'Gemüse mit Käse äthiopisch', 'vegetarian_mains', 'lunch', 'pan_ethiopian', 130),
  R('أوراق القرع مطهوة إثيوبية', 'Stewed pumpkin leaves Ethiopian', 'Feuilles de courge mijotées éthiopien', 'Hojas de calabaza guisadas etíope', 'Geschmorte Kürbisblätter äthiopisch', 'vegetarian_mains', 'lunch', 'oromia', 90),
  R('بامية وطماطم إثيوبي', 'Okra with tomato Ethiopian', 'Gombo à la tomate éthiopien', 'Quingombó con tomate etíope', 'Okra mit Tomate äthiopisch', 'vegetarian_mains', 'lunch', 'pan_ethiopian', 85),
);
// --- poultry_mains (12) ------------------------------------------------------
dishes.push(
  R('دورو وات دجاج منزلي إثيوبي', 'Homestyle doro wat Ethiopian', 'Doro wat maison éthiopien', 'Doro wat casero etíope', 'Hausgemachtes Doro-Wat äthiopisch', 'poultry_mains', 'lunch', 'pan_ethiopian', 200),
  R('دورو تيبس بصل إثيوبي', 'Doro tibs with onion Ethiopian', 'Doro tibs aux oignons éthiopien', 'Doro tibs con cebolla etíope', 'Doro-Tibs mit Zwiebeln äthiopisch', 'poultry_mains', 'lunch', 'amhara', 190),
  R('دجاج مشوي حار إثيوبي', 'Spicy grilled chicken Ethiopian', 'Poulet grillé épicé éthiopien', 'Pollo a la parrilla picante etíope', 'Scharfes Grillhähnchen äthiopisch', 'poultry_mains', 'lunch', 'addis_ababa', 210),
  R('دجاج بزبدة نباتية إثيوبي', 'Chicken with niter butter Ethiopian', 'Poulet au beurre niter éthiopien', 'Pollo con mantequilla niter etíope', 'Hähnchen mit Niter-Butter äthiopisch', 'poultry_mains', 'lunch', 'amhara', 220),
  R('دجاج كاري إثيوبي', 'Chicken curry Ethiopian', 'Curry de poulet éthiopien', 'Curry de pollo etíope', 'Hähnchen-Curry äthiopisch', 'poultry_mains', 'lunch', 'addis_ababa', 215),
  R('دجاج مقلي مقرمش إثيوبي', 'Crispy fried chicken Ethiopian', 'Poulet frit croustillant éthiopien', 'Pollo frito crujiente etíope', 'Knuspriges Brathähnchen äthiopisch', 'poultry_mains', 'lunch', 'pan_ethiopian', 230),
  R('دجاج بعصير الليمون إثيوبي', 'Chicken with lemon juice Ethiopian', 'Poulet au jus de citron éthiopien', 'Pollo con jugo de limón etíope', 'Hähnchen mit Zitronensaft äthiopisch', 'poultry_mains', 'lunch', 'pan_ethiopian', 195),
  R('دجاج بالثوم والزنجبيل إثيوبي', 'Chicken garlic ginger Ethiopian', 'Poulet à l ail et au gingembre éthiopien', 'Pollo con ajo y jengibre etíope', 'Knoblauch-Ingwer-Hähnchen äthiopisch', 'poultry_mains', 'lunch', 'pan_ethiopian', 205),
  R('دجاج بالفلفل الحلو إثيوبي', 'Chicken with bell pepper Ethiopian', 'Poulet au poivron éthiopien', 'Pollo con pimiento morrón etíope', 'Hähnchen mit Paprika äthiopisch', 'poultry_mains', 'lunch', 'pan_ethiopian', 205),
  R('دجاج مع بطاطس إثيوبي', 'Chicken with potatoes Ethiopian', 'Poulet aux pommes de terre éthiopien', 'Pollo con patatas etíope', 'Hähnchen mit Kartoffeln äthiopisch', 'poultry_mains', 'lunch', 'tigray', 215),
  R('دجاج بصلصة طماطم إثيوبي', 'Chicken in tomato stew Ethiopian', 'Poulet à la sauce tomate éthiopien', 'Pollo en salsa de tomate etíope', 'Hähnchen in Tomatensauce äthiopisch', 'poultry_mains', 'lunch', 'pan_ethiopian', 200),
  R('صدر دجاج مشوي إثيوبي', 'Grilled chicken breast Ethiopian', 'Blanc de poulet grillé éthiopien', 'Pechuga de pollo a la parrilla etíope', 'Gegrillte Hähnchenbrust äthiopisch', 'poultry_mains', 'lunch', 'addis_ababa', 165),
);
// --- meat_mains (22) ---------------------------------------------------------
dishes.push(
  R('كيتفو أصلي إثيوبي', 'Classic kitfo Ethiopian', 'Kitfo classique éthiopien', 'Kitfo clásico etíope', 'Klassisches Kitfo äthiopisch', 'meat_mains', 'lunch', 'pan_ethiopian', 235),
  R('كيتفو مطهو إثيوبي', 'Cooked kitfo leb leb Ethiopian', 'Kitfo cuit éthiopien', 'Kitfo cocinado etíope', 'Gekochtes Kitfo äthiopisch', 'meat_mains', 'lunch', 'pan_ethiopian', 225),
  R('تبيس كلاسيكي إثيوبي', 'Classic tibs Ethiopian', 'Tibs classiques éthiopiens', 'Tibs clásicos etíopes', 'Klassische Tibs äthiopisch', 'meat_mains', 'lunch', 'pan_ethiopian', 210),
  R('تبيس لحم بقري حار إثيوبي', 'Spicy beef tibs Ethiopian', 'Tibs de bœuf épicés éthiopiens', 'Tibs de res picantes etíopes', 'Würzige Rindfleisch-Tibs äthiopisch', 'meat_mains', 'lunch', 'pan_ethiopian', 215),
  R('تبيس لحم غنم إثيوبي', 'Lamb tibs Ethiopian', 'Tibs d agneau éthiopiens', 'Tibs de cordero etíopes', 'Lamm-Tibs äthiopisch', 'meat_mains', 'lunch', 'pan_ethiopian', 205),
  R('زيلزيل تيبس متبل إثيوبي', 'Spiced zilzil tibs Ethiopian', 'Zilzil tibs épicés éthiopiens', 'Zilzil tibs especiados etíopes', 'Gewürzte Zilzil-Tibs äthiopisch', 'meat_mains', 'lunch', 'amhara', 220),
  R('لحم غنم مشوي إثيوبي', 'Grilled lamb Ethiopian', 'Agneau grillé éthiopien', 'Cordero a la parrilla etíope', 'Gegrilltes Lamm äthiopisch', 'meat_mains', 'lunch', 'afar', 200),
  R('سيغا تيبس بصل إثيوبي', 'Siga tibs with onion Ethiopian', 'Siga tibs aux oignons éthiopien', 'Siga tibs con cebolla etíope', 'Siga-Tibs mit Zwiebeln äthiopisch', 'meat_mains', 'lunch', 'addis_ababa', 210),
  R('لحم بقري مع خردل إثيوبي', 'Beef with mustard Ethiopian', 'Bœuf à la moutarde éthiopien', 'Res con mostaza etíope', 'Rind mit Senf äthiopisch', 'meat_mains', 'lunch', 'tigray', 205),
  R('يخنة لحم بقري إثيوبية', 'Beef stew Ethiopian', 'Ragoût de bœuf éthiopien', 'Guiso de res etíope', 'Rindereintopf äthiopisch', 'meat_mains', 'lunch', 'pan_ethiopian', 215),
  R('لحم مع بطاطس وجزر إثيوبي', 'Beef with potatoes carrots Ethiopian', 'Bœuf aux pommes de terre et carottes éthiopien', 'Res con patatas y zanahorias etíope', 'Rind mit Kartoffeln und Karotten äthiopisch', 'meat_mains', 'lunch', 'pan_ethiopian', 195),
  R('لحم غنم بسمسم إثيوبي', 'Lamb with sesame Ethiopian', 'Agneau au sésame éthiopien', 'Cordero con sésamo etíope', 'Lamm mit Sesam äthiopisch', 'meat_mains', 'lunch', 'tigray', 210),
  R('لحم بقري مفلفل إثيوبي', 'Peppered beef Ethiopian', 'Bœuf au poivre éthiopien', 'Res con pimienta etíope', 'Pfeffriges Rind äthiopisch', 'meat_mains', 'lunch', 'oromia', 210),
  R('كباب لحم إثيوبي', 'Beef kebab Ethiopian', 'Kébab de bœuf éthiopien', 'Kebab de res etíope', 'Rindfleisch-Kebab äthiopisch', 'meat_mains', 'lunch', 'addis_ababa', 225),
  R('لحم بصلصة الشطة إثيوبي', 'Beef in hot sauce Ethiopian', 'Bœuf en sauce piquante éthiopien', 'Res en salsa picante etíope', 'Rind in scharfer Sauce äthiopisch', 'meat_mains', 'lunch', 'amhara', 215),
  R('تبيس ذيل بقري إثيوبي', 'Oxtail tibs Ethiopian', 'Tibs de queue de bœuf éthiopiens', 'Tibs de rabo de res etíopes', 'Ochsenschwanz-Tibs äthiopisch', 'meat_mains', 'lunch', 'oromia', 225),
  R('كبدة لحم مطهوة إثيوبية', 'Stewed beef liver Ethiopian', 'Foie de bœuf mijoté éthiopien', 'Hígado de res guisado etíope', 'Geschmorte Rinderleber äthiopisch', 'meat_mains', 'lunch', 'pan_ethiopian', 175),
  R('كرشة مطهوة إثيوبية', 'Stewed tripe Ethiopian', 'Tripes mijotées éthiopien', 'Callos guisados etíopes', 'Geschmorte Kutteln äthiopisch', 'meat_mains', 'lunch', 'pan_ethiopian', 155),
  R('لحم عجل مطهو إثيوبي', 'Stewed veal Ethiopian', 'Veau mijoté éthiopien', 'Ternera guisada etíope', 'Geschmortes Kalb äthiopisch', 'meat_mains', 'lunch', 'pan_ethiopian', 190),
  R('لحم بالنعناع إثيوبي', 'Beef with mint Ethiopian', 'Bœuf à la menthe éthiopien', 'Res con menta etíope', 'Rind mit Minze äthiopisch', 'meat_mains', 'lunch', 'sidama', 200),
  R('لحم جمال مطهو إثيوبي', 'Stewed camel meat Ethiopian', 'Viande de chameau mijotée éthiopien', 'Carne de camello guisada etíope', 'Geschmortes Kamelfleisch äthiopisch', 'meat_mains', 'lunch', 'afar', 195),
  R('تبيس لحم مشكل إثيوبي', 'Mixed meat tibs Ethiopian', 'Tibs de viandes mélangées éthiopien', 'Tibs de carnes mixtas etíope', 'Gemischte Fleisch-Tibs äthiopisch', 'meat_mains', 'lunch', 'addis_ababa', 220),
);
// --- seafood_mains (4) -------------------------------------------------------
dishes.push(
  R('سمك بلطي مشوي إثيوبي', 'Grilled tilapia Ethiopian', 'Tilapia grillé éthiopien', 'Tilapia a la parrilla etíope', 'Gegrillte Tilapia äthiopisch', 'seafood_mains', 'lunch', 'pan_ethiopian', 175),
  R('سمك بصلصة حمراء إثيوبي', 'Fish in red sauce Ethiopian', 'Poisson en sauce rouge éthiopien', 'Pescado en salsa roja etíope', 'Fisch in roter Sauce äthiopisch', 'seafood_mains', 'lunch', 'afar', 190),
  R('تبيس سمك مقلي إثيوبي', 'Fried fish tibs Ethiopian', 'Tibs de poisson frit éthiopien', 'Tibs de pescado frito etíope', 'Gebratene Fisch-Tibs äthiopisch', 'seafood_mains', 'lunch', 'pan_ethiopian', 185),
  R('سمك مسلوق بالبهارات إثيوبي', 'Poached spiced fish Ethiopian', 'Poisson pochet aux épices éthiopien', 'Pescado escalfado especiado etíope', 'Pochierter Gewürzfisch äthiopisch', 'seafood_mains', 'lunch', 'tigray', 160),
);
// --- soups_salads (16) -------------------------------------------------------
dishes.push(
  R('شوربة عدس إثيوبية', 'Lentil soup Ethiopian', 'Soupe de lentilles éthiopienne', 'Sopa de lentejas etíope', 'Linsensuppe äthiopisch', 'soups_salads', 'lunch', 'pan_ethiopian', 95),
  R('شوربة خضار إثيوبية', 'Vegetable soup Ethiopian', 'Soupe de légumes éthiopienne', 'Sopa de verduras etíope', 'Gemüsesuppe äthiopisch', 'soups_salads', 'lunch', 'pan_ethiopian', 60),
  R('شوربة دجاج بالزنجبيل إثيوبية', 'Chicken ginger soup Ethiopian', 'Soupe de poulet au gingembre éthiopienne', 'Sopa de pollo con jengibre etíope', 'Hühner-Ingwersuppe äthiopisch', 'soups_salads', 'lunch', 'pan_ethiopian', 85),
  R('شوربة لحم إثيوبية', 'Beef soup Ethiopian', 'Soupe de bœuf éthiopienne', 'Sopa de res etíope', 'Rindfleischsuppe äthiopisch', 'soups_salads', 'lunch', 'pan_ethiopian', 105),
  R('شوربة شعير إثيوبية', 'Barley soup Ethiopian', 'Soupe d orge éthiopienne', 'Sopa de cebada etíope', 'Gerstensuppe äthiopisch', 'soups_salads', 'lunch', 'amhara', 90),
  R('شوربة ذرة إثيوبية', 'Corn soup Ethiopian', 'Soupe de maïs éthiopienne', 'Sopa de maíz etíope', 'Maissuppe äthiopisch', 'soups_salads', 'lunch', 'sidama', 80),
  R('سلطة خضار مقرمشة إثيوبية', 'Crunchy vegetable salad Ethiopian', 'Salade de légumes croquante éthiopienne', 'Ensalada crujiente de verduras etíope', 'Knackiger Gemüsesalat äthiopisch', 'soups_salads', 'lunch', 'addis_ababa', 50),
  R('سلطة طماطم وخيار إثيوبية', 'Tomato cucumber salad Ethiopian', 'Salade de tomates et concombres éthiopienne', 'Ensalada de tomate y pepino etíope', 'Tomaten-Gurken-Salat äthiopisch', 'soups_salads', 'lunch', 'pan_ethiopian', 30),
  R('سلطة شمندر بالليمون إثيوبية', 'Beetroot salad Ethiopian', 'Salade de betterave éthiopienne', 'Ensalada de remolacha etíope', 'Rote-Bete-Salat äthiopisch', 'soups_salads', 'lunch', 'tigray', 45),
  R('سلطة كرنب إثيوبية', 'Cabbage salad Ethiopian', 'Salade de chou éthiopienne', 'Ensalada de repollo etíope', 'Kohlsalat äthiopisch', 'soups_salads', 'lunch', 'pan_ethiopian', 35),
  R('سلطة جزر وبازلاء إثيوبية', 'Carrot pea salad Ethiopian', 'Salade de carottes et petits pois éthiopienne', 'Ensalada de zanahoria y guisantes etíope', 'Karotten-Erbsen-Salat äthiopisch', 'soups_salads', 'lunch', 'pan_ethiopian', 50),
  R('سلطة أفوكادو بالليمون إثيوبية', 'Avocado lemon salad Ethiopian', 'Salade d avocat au citron éthiopienne', 'Ensalada de aguacate con limón etíope', 'Avocado-Zitronen-Salat äthiopisch', 'soups_salads', 'lunch', 'oromia', 120),
  R('سلطة بابايا إثيوبية', 'Papaya salad Ethiopian', 'Salade de papaye éthiopienne', 'Ensalada de papaya etíope', 'Papayasalat äthiopisch', 'soups_salads', 'lunch', 'sidama', 45),
  R('سلطة فول بالبصل إثيوبية', 'Bean salad Ethiopian', 'Salade de haricots éthiopienne', 'Ensalada de frijoles etíope', 'Bohnensalat äthiopisch', 'soups_salads', 'lunch', 'amhara', 85),
  R('سلطة بطاطس بالشطة إثيوبية', 'Spicy potato salad Ethiopian', 'Salade de pommes de terre épicée éthiopienne', 'Ensalada de patata picante etíope', 'Scharfer Kartoffelsalat äthiopisch', 'soups_salads', 'lunch', 'pan_ethiopian', 110),
  R('سلطة خيار بالزبادي إثيوبية', 'Cucumber yogurt salad Ethiopian', 'Salade de concombres au yaourt éthiopienne', 'Ensalada de pepino con yogur etíope', 'Gurken-Joghurt-Salat äthiopisch', 'soups_salads', 'lunch', 'afar', 55),
);
// --- street_snacks (22) ------------------------------------------------------
dishes.push(
  R('سامبوسا لحم شوارع إثيوبية', 'Lamb sambusa Ethiopian', 'Sambusa à l agneau éthiopien', 'Sambusa de cordero etíope', 'Lamm-Sambusa äthiopisch', 'street_snacks', 'snacks', 'african_shared', 285),
  R('سامبوسا خضار شوارع إثيوبية', 'Vegetable sambusa Ethiopian', 'Sambusa aux légumes éthiopien', 'Sambusa de verduras etíope', 'Gemüse-Sambusa äthiopisch', 'street_snacks', 'snacks', 'african_shared', 250),
  R('سانبوسا عدس شوارع إثيوبي', 'Lentil sambusa Ethiopian', 'Sambusa aux lentilles éthiopien', 'Sambusa de lentejas etíope', 'Linsen-Sambusa äthiopisch', 'street_snacks', 'snacks', 'pan_ethiopian', 245),
  R('سانبوسا دجاج شوارع إثيوبي', 'Chicken sambusa Ethiopian', 'Sambusa au poulet éthiopien', 'Sambusa de pollo etíope', 'Hähnchen-Sambusa äthiopisch', 'street_snacks', 'snacks', 'addis_ababa', 270),
  R('كولو محمص شوارع إثيوبي', 'Roasted kolo street Ethiopian', 'Kolo grillé de rue éthiopien', 'Kolo tostado callejero etíope', 'Geröstetes Kolo Straße äthiopisch', 'street_snacks', 'snacks', 'amhara', 370),
  R('ذرة مشوية شوارع إثيوبية', 'Roasted corn street Ethiopian', 'Maïs grillé de rue éthiopien', 'Maíz asado callejero etíope', 'Gerösteter Mais Straße äthiopisch', 'street_snacks', 'snacks', 'pan_ethiopian', 125),
  R('بطاطا مقلية شوارع إثيوبية', 'Fried potatoes street Ethiopian', 'Frites de rue éthiopienne', 'Patatas fritas callejeras etíopes', 'Pommes frites Straße äthiopisch', 'street_snacks', 'snacks', 'african_shared', 170),
  R('بيض مقلي مسلوق شوارع إثيوبي', 'Fried boiled eggs street Ethiopian', 'Œufs frits de rue éthiopien', 'Huevos fritos callejeros etíopes', 'Gebratene Eier Straße äthiopisch', 'street_snacks', 'snacks', 'pan_ethiopian', 160),
  R('فول شوارع إثيوبي', 'Foul street Ethiopian', 'Foul de rue éthiopien', 'Foul callejero etíope', 'Foul Straße äthiopisch', 'street_snacks', 'snacks', 'african_shared', 115),
  R('لقيمات عسل شوارع إثيوبية', 'Honey fritters street Ethiopian', 'Beignets au miel de rue éthiopien', 'Buñuelos de miel callejeros etíopes', 'Honig-Krapfen Straße äthiopisch', 'street_snacks', 'snacks', 'pan_ethiopian', 260),
  R('حمص محمص إثيوبي', 'Roasted chickpeas Ethiopian', 'Pois chiches grillés éthiopien', 'Garbanzos tostados etíopes', 'Geröstete Kichererbsen äthiopisch', 'street_snacks', 'snacks', 'pan_ethiopian', 200),
  R('فول سوداني محمص شوارع إثيوبي', 'Roasted groundnuts street Ethiopian', 'Arachides grillées de rue éthiopien', 'Maníes tostados callejeros etíopes', 'Geröstete Erdnüsse Straße äthiopisch', 'street_snacks', 'snacks', 'pan_ethiopian', 315),
  R('موز مقلي شوارع إثيوبي', 'Fried banana street Ethiopian', 'Banane frite de rue éthiopien', 'Plátano frito callejero etíope', 'Frittierte Banane Straße äthiopisch', 'street_snacks', 'snacks', 'sidama', 165),
  R('فطائر محشوة صغيرة إثيوبية', 'Stuffed dumplings Ethiopian', 'Beignets farcis éthiopiens', 'Empanadillas rellenas etíopes', 'Gefüllte Teigtaschen äthiopisch', 'street_snacks', 'snacks', 'addis_ababa', 240),
  R('خبز مشوي مع عسل شوارع إثيوبي', 'Grilled bread honey street Ethiopian', 'Pain grillé au miel de rue éthiopien', 'Pan asado con miel callejero etíope', 'Geröstetes Brot mit Honig Straße äthiopisch', 'street_snacks', 'snacks', 'amhara', 240),
  R('صحن حمص بالطحينة إثيوبي', 'Hummus plate Ethiopian', 'Assiette de houmous éthiopien', 'Plato de hummus etíope', 'Hummus-Teller äthiopisch', 'street_snacks', 'snacks', 'addis_ababa', 160),
  R('كباب حواري إثيوبي', 'Street kebab Ethiopian', 'Kébab de rue éthiopien', 'Kebab callejero etíope', 'Straßen-Kebab äthiopisch', 'street_snacks', 'snacks', 'pan_ethiopian', 220),
  R('شيبسي بطاطا شوارع إثيوبي', 'Potato chips street Ethiopian', 'Chips de rue éthiopiens', 'Patatas fritas chips etíopes', 'Kartoffelchips Straße äthiopisch', 'street_snacks', 'snacks', 'african_shared', 185),
  R('ذرة حلوة مسلوقة شوارع إثيوبية', 'Boiled sweet corn street Ethiopian', 'Maïs doux bouilli de rue éthiopien', 'Maíz dulce hervido callejero etíope', 'Gekochter Süßmais Straße äthiopisch', 'street_snacks', 'snacks', 'pan_ethiopian', 120),
  R('كعك السمسم شوارع إثيوبي', 'Sesame cookies street Ethiopian', 'Biscuits au sésame de rue éthiopien', 'Galletas de sésamo callejeras etíopes', 'Sesamkekse Straße äthiopisch', 'street_snacks', 'snacks', 'tigray', 295),
  R('لوز محمص شوارع إثيوبي', 'Roasted almonds street Ethiopian', 'Amandes grillées de rue éthiopien', 'Almendras tostadas callejeras etíopes', 'Geröstete Mandeln Straße äthiopisch', 'street_snacks', 'snacks', 'tigray', 320),
  R('إنجيرا بالفلفل شوارع إثيوبي', 'Injera with chili street Ethiopian', 'Injera au piment de rue éthiopien', 'Injera con chile callejero etíope', 'Injera mit Chili Straße äthiopisch', 'street_snacks', 'snacks', 'pan_ethiopian', 100),
);
// --- condiments (8) ----------------------------------------------------------
dishes.push(
  R('بريبري صلصة حارة إثيوبية', 'Berbere hot paste Ethiopian', 'Pâte pimentée berbere éthiopienne', 'Pasta picante berbere etíope', 'Berbere-Scharfe Paste äthiopisch', 'condiments', 'snacks', 'amhara', 240),
  R('متميتا بهارات حارة إثيوبية', 'Mitmita hot spice Ethiopian', 'Épice piquante mitmita éthiopienne', 'Especia picante mitmita etíope', 'Mitmita-Scharfes Gewürz äthiopisch', 'condiments', 'snacks', 'pan_ethiopian', 320),
  R('كيب نتر زبدة إثيوبية', 'Niter kibe butter Ethiopian', 'Beurre niter kibe éthiopien', 'Mantequilla niter kibe etíope', 'Niter-Kibe-Butter äthiopisch', 'condiments', 'snacks', 'amhara', 500),
  R('عيب قشطة إثيوبي', 'Ayib cream Ethiopian', 'Crème ayib éthiopienne', 'Crema ayib etíope', 'Ayib-Sahne äthiopisch', 'condiments', 'snacks', 'oromia', 110),
  R('صلصة تمر هندي إثيوبية', 'Tamarind sauce Ethiopian', 'Sauce au tamarin éthiopienne', 'Salsa de tamarindo etíope', 'Tamarinden-Sauce äthiopisch', 'condiments', 'snacks', 'afar', 90),
  R('شطة ثوم إثيوبية', 'Garlic chili paste Ethiopian', 'Pâte pimentée à l ail éthiopienne', 'Pasta de chile y ajo etíope', 'Knoblauch-Chili-Paste äthiopisch', 'condiments', 'snacks', 'pan_ethiopian', 70),
  R('بهارات شوربة إثيوبية', 'Soup spice blend Ethiopian', 'Mélange d épices pour soupe éthiopien', 'Mezcla de especias para sopa etíope', 'Suppengewürzmischung äthiopisch', 'condiments', 'snacks', 'amhara', 300),
  R('صلصة طماطم معدة إثيوبية', 'Prepared tomato sauce Ethiopian', 'Sauce tomate préparée éthiopienne', 'Salsa de tomate preparada etíope', 'Fertige Tomatensauce äthiopisch', 'condiments', 'snacks', 'addis_ababa', 85),
);
// --- desserts_sweets (8) -----------------------------------------------------
dishes.push(
  R('حلاوة طحينة إثيوبية', 'Tahini halva Ethiopian', 'Halva au tahin éthiopien', 'Halva de tahini etíope', 'Tahini-Halva äthiopisch', 'desserts_sweets', 'snacks', 'pan_ethiopian', 300),
  R('حلوى سمسم إثيوبية', 'Sesame candy Ethiopian', 'Bonbon au sésame éthiopien', 'Caramelo de sésamo etíope', 'Sesamsüßigkeit äthiopisch', 'desserts_sweets', 'snacks', 'pan_ethiopian', 320),
  R('تمر بالسمسم إثيوبي', 'Dates with sesame Ethiopian', 'Dattes au sésame éthiopien', 'Dátiles con sésamo etíope', 'Datteln mit Sesam äthiopisch', 'desserts_sweets', 'snacks', 'afar', 285),
  R('كعكة عسل إثيوبية', 'Honey cake Ethiopian', 'Gâteau au miel éthiopien', 'Pastel de miel etíope', 'Honigkuchen äthiopisch', 'desserts_sweets', 'snacks', 'amhara', 260),
  R('أرز حلو إثيوبي', 'Sweet rice pudding Ethiopian', 'Riz au lait sucré éthiopien', 'Arroz con leche dulce etíope', 'Süßer Reisbrei äthiopisch', 'desserts_sweets', 'snacks', 'pan_ethiopian', 150),
  R('فاكهة بالعسل إثيوبية', 'Fruit with honey Ethiopian', 'Fruits au miel éthiopiens', 'Fruta con miel etíope', 'Obst mit Honig äthiopisch', 'desserts_sweets', 'snacks', 'pan_ethiopian', 90),
  R('بسكويت سميد إثيوبي', 'Semolina cookies Ethiopian', 'Biscuits à la semoule éthiopiens', 'Galletas de sémola etíopes', 'Grießkekse äthiopisch', 'desserts_sweets', 'snacks', 'pan_ethiopian', 250),
  R('جوز هند حلو إثيوبي', 'Sweet coconut Ethiopian', 'Noix de coco sucrée éthiopienne', 'Coco dulce etíope', 'Süße Kokosnuss äthiopisch', 'desserts_sweets', 'snacks', 'sidama', 265),
);
// --- beverages (22) ----------------------------------------------------------
dishes.push(
  R('بن إثيوبي سادة', 'Black coffee Ethiopian', 'Café noir éthiopien', 'Café negro etíope', 'Schwarzer Kaffee äthiopisch', 'beverages', 'snacks', 'pan_ethiopian', 20),
  R('قهوة بالحليب إثيوبية', 'Coffee with milk Ethiopian', 'Café au lait éthiopien', 'Café con leche etíope', 'Kaffee mit Milch äthiopisch', 'beverages', 'snacks', 'pan_ethiopian', 45),
  R('بونة معسولة إثيوبية', 'Honeyed coffee Ethiopian', 'Café au miel éthiopien', 'Café con miel etíope', 'Honig-Kaffee äthiopisch', 'beverages', 'snacks', 'amhara', 60),
  R('شاي أحمر إثيوبي', 'Black tea Ethiopian', 'Thé noir éthiopien', 'Té negro etíope', 'Schwarzer Tee äthiopisch', 'beverages', 'snacks', 'pan_ethiopian', 20),
  R('شاي بالزنجبيل إثيوبي', 'Ginger tea Ethiopian', 'Thé au gingembre éthiopien', 'Té de jengibre etíope', 'Ingwertee äthiopisch', 'beverages', 'snacks', 'pan_ethiopian', 25),
  R('إسبريسو إثيوبي', 'Espresso Ethiopian', 'Espresso éthiopien', 'Espresso etíope', 'Espresso äthiopisch', 'beverages', 'snacks', 'addis_ababa', 20),
  R('قهوة الهيل إثيوبية', 'Cardamom coffee Ethiopian', 'Café à la cardamome éthiopien', 'Café con cardamomo etíope', 'Kardamom-Kaffee äthiopisch', 'beverages', 'snacks', 'amhara', 25),
  R('عيران إثيوبي', 'Ayran drink Ethiopian', 'Ayran éthiopien', 'Ayran etíope', 'Ayran äthiopisch', 'beverages', 'snacks', 'afar', 50),
  R('عصير مانجو طازج إثيوبي', 'Fresh mango juice Ethiopian', 'Jus de mangue frais éthiopien', 'Jugo de mango fresco etíope', 'Frischer Mangosaft äthiopisch', 'beverages', 'snacks', 'oromia', 55),
  R('عصير بابايا إثيوبي', 'Papaya juice Ethiopian', 'Jus de papaye éthiopien', 'Jugo de papaya etíope', 'Papayasaft äthiopisch', 'beverages', 'snacks', 'oromia', 45),
  R('عصير أفوكادو إثيوبي', 'Avocado shake Ethiopian', 'Smoothie d avocat éthiopien', 'Batido de aguacate etíope', 'Avocado-Shake äthiopisch', 'beverages', 'snacks', 'addis_ababa', 85),
  R('عصير ليمون طازج إثيوبي', 'Fresh lemon juice Ethiopian', 'Jus de citron frais éthiopien', 'Jugo de limón fresco etíope', 'Frischer Zitronensaft äthiopisch', 'beverages', 'snacks', 'pan_ethiopian', 30),
  R('عصير برتقال إثيوبي', 'Orange juice Ethiopian', 'Jus d orange éthiopien', 'Jugo de naranja etíope', 'Orangensaft äthiopisch', 'beverages', 'snacks', 'pan_ethiopian', 45),
  R('عصير أناناس إثيوبي', 'Pineapple juice Ethiopian', 'Jus d ananas éthiopien', 'Jugo de piña etíope', 'Ananassaft äthiopisch', 'beverages', 'snacks', 'afar', 50),
  R('عصير رمان إثيوبي', 'Pomegranate juice Ethiopian', 'Jus de grenade éthiopien', 'Jugo de granada etíope', 'Granatapfelsaft äthiopisch', 'beverages', 'snacks', 'tigray', 55),
  R('عصير جوافة إثيوبي', 'Guava juice Ethiopian', 'Jus de goyave éthiopien', 'Jugo de guayaba etíope', 'Guavensaft äthiopisch', 'beverages', 'snacks', 'sidama', 50),
  R('لبن رائب إثيوبي', 'Buttermilk Ethiopian', 'Babeurre éthiopien', 'Suero de leche etíope', 'Buttermilch äthiopisch', 'beverages', 'snacks', 'pan_ethiopian', 60),
  R('حليب طازج إثيوبي', 'Fresh milk Ethiopian', 'Lait frais éthiopien', 'Leche fresca etíope', 'Frische Milch äthiopisch', 'beverages', 'snacks', 'pan_ethiopian', 65),
  R('شراب شعير إثيوبي', 'Barley drink Ethiopian', 'Boisson d orge éthiopien', 'Bebida de cebada etíope', 'Gerstengetränk äthiopisch', 'beverages', 'snacks', 'sidama', 45),
  R('عصير التين الشوكي إثيوبي', 'Prickly pear juice Ethiopian', 'Jus de figue de barbarie éthiopien', 'Jugo de tuna etíope', 'Kaktusfeigensaft äthiopisch', 'beverages', 'snacks', 'tigray', 50),
  R('ماء جوز هند إثيوبي', 'Coconut water Ethiopian', 'Eau de coco éthiopienne', 'Agua de coco etíope', 'Kokoswasser äthiopisch', 'beverages', 'snacks', 'sidama', 20),
  R('عصير موز بالحليب إثيوبي', 'Banana milk shake Ethiopian', 'Lait de banane éthiopien', 'Batido de plátano etíope', 'Bananen-Milchshake äthiopisch', 'beverages', 'snacks', 'oromia', 80),
);

// ============================================================ MACROS
const MACRO_TPL = {
  breakfast_items: [6, 26, 6],
  breads_flatbreads: [7, 36, 4],
  rice_biryani: [6, 30, 4],
  dals_legumes: [8, 15, 4],
  vegetarian_mains: [5, 13, 6],
  poultry_mains: [22, 7, 9],
  meat_mains: [22, 4, 12],
  seafood_mains: [19, 6, 7],
  soups_salads: [5, 10, 3],
  street_snacks: [6, 22, 9],
  condiments: [3, 8, 6],
  desserts_sweets: [5, 30, 12],
  beverages: [2, 10, 2],
};
const r1 = (v) => Math.round(v * 10) / 10;
for (const d of dishes) {
  const [tp, tc, tf] = MACRO_TPL[d.category];
  const tcal = 4 * tp + 4 * tc + 9 * tf;
  const s = d.cal_100 / tcal;
  d.protein = r1(tp * s);
  d.carbs = r1(tc * s);
  d.fat = r1(tf * s);
  d.cal_100 = Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat);
}

// ============================================================ ASSERT
const byRegion = {};
for (const d of dishes) byRegion[d.region] = (byRegion[d.region] ?? 0) + 1;
const byCategory = {};
for (const d of dishes) byCategory[d.category] = (byCategory[d.category] ?? 0) + 1;
const byMeal = {};
for (const d of dishes) byMeal[d.mealType] = (byMeal[d.mealType] ?? 0) + 1;

const names = dishes.map((d) => d.name_ar);
const dups = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
const badTok = dishes.filter((d) => !/اثيوبي/.test(d.name_ar.replace(/[إأآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')));
const badRange = dishes.filter((d) => d.cal_100 < 20 || d.cal_100 > 900);

console.log('TOTAL dishes:', dishes.length);
console.log('By region:', JSON.stringify(byRegion, null, 0));
console.log('By category:', JSON.stringify(byCategory, null, 0));
console.log('By meal:', JSON.stringify(byMeal, null, 0));
if (dups.length) console.error('DUPLICATE names:', dups.join(' | '));
if (badTok.length) console.error('MISSING TOKEN:', badTok.map((d) => d.name_ar).join(' | '));
if (badRange.length) console.error('OUT OF RANGE:', badRange.map((d) => `${d.name_ar}:${d.cal_100}`).join(' | '));

if (dishes.length !== 200) {
  console.error(`\nEXPECTED 200 dishes, got ${dishes.length}. Fix before writing.`);
  process.exit(1);
}
if (dups.length || badTok.length || badRange.length) process.exit(1);

fs.writeFileSync(
  path.join(__dirname, 'ethiopia-200-proposal.json'),
  JSON.stringify(
    {
      meta: { target: 200, new_dishes: dishes.length, legacy_dishes: 0, with_macros: true },
      categories: Object.keys(byCategory),
      regions: Object.keys(byRegion),
      meal_types: Object.keys(byMeal),
      dishes,
    },
    null,
    2
  )
);
console.log('\nWrote scripts/ethiopia-200-proposal.json');