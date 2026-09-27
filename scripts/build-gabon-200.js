// Authoring script for the Gabonese 200-dish proposal (scripts/gabon-200-proposal.json).
// 200 NEW dishes (the 100 base rows live in src/data/gabonese-full.ts). Mirrors the
// Seychelles/Mauritius authoring pattern: R() helper + per-category macro templates.
// Regions: pan_gabonese by default (golden rule), regional anchors (libreville,
// port_gentil, franceville, lambarene, oyem, mayumba), african_shared for dishes
// shared across the wider Central African table. All Arabic names carry the token
// غابوني أصيل (strict halal: no pork, no alcohol - no palm wine, no mbouity).
// Anchors: nyembwe/moambe, dongo-dongo, saka-saka/pondu, mafe, poisson sale,
// liboke/maboke, okok, odika, bongolo, attieke, fufu, chikwangue, gari, atanga,
// degue, muamba, nkumu, maquis brochettes, Port-Gentil seafood.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, protein, carbs, fat) => {
  const cal_100 = Math.round(4 * protein + 4 * carbs + 9 * fat);
  return { name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat };
};

const dishes = [];
const T = 'غابوني أصيل';

// --- breakfast_items (14) ----------------------------------------------------
dishes.push(
  R(`ديجييه بالتمر ${T}`, 'Degue with dates Gabonese', 'Dégué aux dattes gabonais', 'Dégué con dátiles gabonés', 'Dégué mit Datteln gabonesisch', 'breakfast_items', 'breakfast', 'pan_gabonese', 6, 40, 4),
  R(`غاري بالتمر ${T}`, 'Gari with dates Gabonese', 'Gari aux dattes gabonais', 'Gari con dátiles gabonés', 'Gari mit Datteln gabonesisch', 'breakfast_items', 'breakfast', 'pan_gabonese', 3, 44, 2),
  R(`عجين المانوك بالجوزة ${T}`, 'Cassava dough with coconut Gabonese', 'Pâte de manioc à la noix de coco gabonaise', 'Masa de yuca con coco gabonesa', 'Maniokteig mit Kokos gabonesisch', 'breakfast_items', 'breakfast', 'pan_gabonese', 2, 34, 8),
  R(`فطيرة الدجاج ${T}`, 'Chicken pie Gabonese', 'Tourte au poulet gabonaise', 'Empanada de pollo gabonesa', 'Hühnchen-Pastete gabonesisch', 'breakfast_items', 'breakfast', 'libreville', 11, 26, 13),
  R(`بيض مقلية بالفلفل ${T}`, 'Fried eggs with pepper Gabonese', 'Oeufs frits au poivre gabonais', 'Huevos fritos con pimiento gaboneses', 'Gebratene Eier mit Pfeffer gabonesisch', 'breakfast_items', 'breakfast', 'pan_gabonese', 11, 2, 12),
  R(`شوفان بالموز والقرفة ${T}`, 'Oatmeal with banana and cinnamon Gabonese', 'Flocons d avoine banane cannelle gabonais', 'Avena con plátano y canela gabonesa', 'Haferbrei mit Banane und Zimt gabonesisch', 'breakfast_items', 'breakfast', 'pan_gabonese', 5, 30, 4),
  R(`خبز الزنجبيل ${T}`, 'Ginger bread Gabonese', 'Pain au gingembre gabonais', 'Pan de jengibre gabonés', 'Ingwerbrot gabonesisch', 'breakfast_items', 'breakfast', 'libreville', 4, 32, 8),
  R(`موز بالعسل ${T}`, 'Banana with honey Gabonese', 'Banane au miel gabonaise', 'Plátano con miel gabonés', 'Banane mit Honig gabonesisch', 'breakfast_items', 'breakfast', 'pan_gabonese', 1, 26, 1),
  R(`شاي بالقرفة ${T}`, 'Cinnamon tea Gabonese', 'Thé à la cannelle gabonais', 'Té con canela gabonés', 'Zimttee gabonesisch', 'breakfast_items', 'breakfast', 'pan_gabonese', 0, 12, 2),
  R(`كرواسون بالجوزة ${T}`, 'Coconut croissant Gabonese', 'Croissant à la noix de coco gabonais', 'Croissant de coco gabonés', 'Kokos-Croissant gabonesisch', 'breakfast_items', 'breakfast', 'libreville', 6, 34, 15),
  R(`سلطة فواكه صباحية ${T}`, 'Breakfast fruit salad Gabonese', 'Salade de fruits du matin gabonaise', 'Ensalada de frutas de la mañana gabonesa', 'Frühstücks-Obstsalat gabonesisch', 'breakfast_items', 'breakfast', 'pan_gabonese', 1, 15, 1),
  R(`عصير الموز بالحليب ${T}`, 'Banana milk drink Gabonese', 'Jus de banane au lait gabonais', 'Zumo de plátano con leche gabonés', 'Bananen-Milch-Getränk gabonesisch', 'breakfast_items', 'breakfast', 'pan_gabonese', 2, 14, 3),
  R(`خبز المانوك بالatangا ${T}`, 'Cassava bread with atanga Gabonese', 'Pain de manioc à l atanga gabonais', 'Pan de yuca con atanga gabonés', 'Maniokbrot mit Atanga gabonesisch', 'breakfast_items', 'breakfast', 'port_gentil', 4, 40, 9),
  R(`بيض بالطماطم ${T}`, 'Eggs with tomato Gabonese', 'Oeufs à la tomate gabonais', 'Huevos con tomate gaboneses', 'Eier mit Tomate gabonesisch', 'breakfast_items', 'breakfast', 'pan_gabonese', 10, 4, 10),
);
// --- breads_flatbreads (16) -------------------------------------------------
dishes.push(
  R(`خبز المانوك الطازج ${T}`, 'Fresh cassava bread Gabonese', 'Pain de manioc frais gabonais', 'Pan de yuca fresca gabonés', 'Frisches Maniokbrot gabonesisch', 'breads_flatbreads', 'lunch', 'pan_gabonese', 3, 40, 6),
  R(`كعك المانوك بالموز ${T}`, 'Cassava banana cake Gabonese', 'Gâteau de manioc à la banane gabonais', 'Bizcocho de yuca con plátano gabonés', 'Maniok-Bananenkuchen gabonesisch', 'breads_flatbreads', 'lunch', 'pan_gabonese', 4, 46, 10),
  R(`رول المانوك بالجبن ${T}`, 'Cassava roll with cheese Gabonese', 'Rouleau de manioc au fromage gabonais', 'Rollo de yuca con queso gabonés', 'Maniokrolle mit Käse gabonesisch', 'breads_flatbreads', 'lunch', 'pan_gabonese', 8, 34, 12),
  R(`خبز الذرة الحلو ${T}`, 'Sweet corn bread Gabonese', 'Pain de maïs doux gabonais', 'Pan de maíz dulce gabonés', 'Süßmaisbrot gabonesisch', 'breads_flatbreads', 'lunch', 'pan_gabonese', 4, 38, 7),
  R(`خبز جوز الهند ${T}`, 'Coconut bread Gabonese', 'Pain à la noix de coco gabonais', 'Pan de coco gabonés', 'Kokosbrot gabonesisch', 'breads_flatbreads', 'lunch', 'port_gentil', 5, 36, 11),
  R(`كعك الليمون ${T}`, 'Lemon cake Gabonese', 'Gâteau au citron gabonais', 'Bizcocho de limón gabonés', 'Zitronenkuchen gabonesisch', 'breads_flatbreads', 'lunch', 'libreville', 4, 40, 11),
  R(`فطيرة المانوك ${T}`, 'Cassava pastry Gabonese', 'Tourte au manioc gabonais', 'Empanada de yuca gabonesa', 'Maniok-Pastete gabonesisch', 'breads_flatbreads', 'lunch', 'pan_gabonese', 4, 36, 10),
  R(`خبز الموز بالتمر ${T}`, 'Banana bread with dates Gabonese', 'Pain à la banane aux dattes gabonais', 'Pan de plátano con dátiles gabonés', 'Bananenbrot mit Datteln gabonesisch', 'breads_flatbreads', 'lunch', 'pan_gabonese', 4, 42, 8),
  R(`توست المانوك بالجبن ${T}`, 'Cassava cheese toast Gabonese', 'Toast de manioc au fromage gabonais', 'Tostada de yuca con queso gabonesa', 'Maniok-Käse-Toast gabonesisch', 'breads_flatbreads', 'lunch', 'pan_gabonese', 8, 30, 11),
  R(`كعك السمسم ${T}`, 'Sesame cake Gabonese', 'Gâteau au sésame gabonais', 'Bizcocho de sésamo gabonés', 'Sesamkuchen gabonesisch', 'breads_flatbreads', 'lunch', 'pan_gabonese', 5, 38, 10),
  R(`كعك الأرز ${T}`, 'Rice cake Gabonese', 'Gâteau de riz gabonais', 'Bizcocho de arroz gabonés', 'Reiskuchen gabonesisch', 'breads_flatbreads', 'lunch', 'pan_gabonese', 4, 40, 7),
  R(`خبز الموز المجفف ${T}`, 'Dried banana bread Gabonese', 'Pain à la banane séchée gabonais', 'Pan de plátano seco gabonés', 'Brot aus getrockneter Banane gabonesisch', 'breads_flatbreads', 'lunch', 'pan_gabonese', 4, 44, 6),
  R(`فطيرة الموز ${T}`, 'Banana pastry Gabonese', 'Tourte à la banane gabonais', 'Empanada de plátano gabonesa', 'Bananen-Pastete gabonesisch', 'breads_flatbreads', 'lunch', 'pan_gabonese', 4, 38, 9),
  R(`رول الجوزة ${T}`, 'Coconut roll Gabonese', 'Rouleau à la noix de coco gabonais', 'Rollo de coco gabonés', 'Kokosrolle gabonesisch', 'breads_flatbreads', 'lunch', 'port_gentil', 5, 36, 10),
  R(`كعك الطيب ${T}`, 'Zeste cake Gabonese', 'Gâteau au zeste gabonais', 'Bizcocho de ralladura gabonés', 'Zitruschalen-Kuchen gabonesisch', 'breads_flatbreads', 'lunch', 'pan_gabonese', 4, 39, 10),
  R(`خبز بالعسل والحليب ${T}`, 'Honey milk bread Gabonese', 'Pain au miel et au lait gabonais', 'Pan con miel y leche gabonés', 'Brot mit Honig und Milch gabonesisch', 'breads_flatbreads', 'lunch', 'pan_gabonese', 6, 38, 8),
);
// --- rice_grains (12) -------------------------------------------------------
dishes.push(
  R(`أرز بالبصل والجزر ${T}`, 'Rice with onion and carrot Gabonese', 'Riz aux oignons et carottes gabonais', 'Arroz con cebolla y zanahoria gabonés', 'Reis mit Zwiebeln und Karotten gabonesisch', 'rice_grains', 'lunch', 'pan_gabonese', 4, 46, 5),
  R(`أرز بجوزة الهند والفلفل ${T}`, 'Coconut rice with pepper Gabonese', 'Riz au lait de coco et poivre gabonais', 'Arroz con leche de coco y pimienta gabonés', 'Kokosmilchreis mit Pfeffer gabonesisch', 'rice_grains', 'lunch', 'pan_gabonese', 4, 44, 8),
  R(`أرز بالدجاج والفواكه ${T}`, 'Chicken rice with fruit Gabonese', 'Riz au poulet et aux fruits gabonais', 'Arroz con pollo y fruta gabonés', 'Huhnereis mit Obst gabonesisch', 'rice_grains', 'lunch', 'pan_gabonese', 9, 42, 6),
  R(`أرز بالسمك المدخن ${T}`, 'Rice with smoked fish Gabonese', 'Riz au poisson fumé gabonais', 'Arroz con pescado ahumado gabonés', 'Reis mit Räucherfisch gabonesisch', 'rice_grains', 'lunch', 'port_gentil', 12, 40, 6),
  R(`أرز بسمتي ${T}`, 'Basmati rice Gabonese', 'Riz basmati gabonais', 'Arroz basmati gabonés', 'Basmati-Reis gabonesisch', 'rice_grains', 'lunch', 'libreville', 4, 45, 2),
  R(`أرز بالقرفة والمكسرات ${T}`, 'Rice with cinnamon and nuts Gabonese', 'Riz à la cannelle et aux noix gabonais', 'Arroz con canela y frutos secos gabonés', 'Reis mit Zimt und Nüssen gabonesisch', 'rice_grains', 'lunch', 'pan_gabonese', 5, 44, 6),
  R(`أرز بالخضروات المشكلة ${T}`, 'Mixed vegetable rice Gabonese', 'Riz aux légumes variés gabonais', 'Arroz con verduras variadas gabonés', 'Reis mit gemischtem Gemüse gabonesisch', 'rice_grains', 'lunch', 'pan_gabonese', 4, 44, 5),
  R(`أرز بالشعيرية ${T}`, 'Vermicelli rice Gabonese', 'Riz vermicelle gabonais', 'Arroz fideo gabonés', 'Vermicelli-Reis gabonesisch', 'rice_grains', 'lunch', 'pan_gabonese', 4, 45, 4),
  R(`أرز بالبهارات ${T}`, 'Spiced rice Gabonese', 'Riz aux épices gabonais', 'Arroz con especias gabonés', 'Gewürzreis gabonesisch', 'rice_grains', 'lunch', 'pan_gabonese', 4, 45, 5),
  R(`أرز بالحليب ${T}`, 'Rice pudding Gabonese', 'Riz au lait gabonais', 'Arroz con leche gabonés', 'Reispudding gabonesisch', 'rice_grains', 'breakfast', 'pan_gabonese', 4, 34, 6),
  R(`أرز بالمانجو ${T}`, 'Mango rice Gabonese', 'Riz à la mangue gabonais', 'Arroz con mango gabonés', 'Mangoreis gabonesisch', 'rice_grains', 'lunch', 'pan_gabonese', 3, 46, 4),
  R(`أرز بالبازلاء والجزر ${T}`, 'Rice with peas and carrot Gabonese', 'Riz aux petits pois et carottes gabonais', 'Arroz con guisantes y zanahoria gabonés', 'Reis mit Erbsen und Karotten gabonesisch', 'rice_grains', 'lunch', 'pan_gabonese', 4, 44, 4),
);
// --- dals_legumes (14) ------------------------------------------------------
dishes.push(
  R(`فول مدمس ${T}`, 'Mashed beans Gabonese', 'Haricots écrasés gabonais', 'Frijoles majados gaboneses', 'Stampfbohnen gabonesisch', 'dals_legumes', 'lunch', 'pan_gabonese', 8, 22, 6),
  R(`عدس أحمر ${T}`, 'Red lentils Gabonese', 'Lentilles corail gabonaises', 'Lentejas rojas gabonesas', 'Rote Linsen gabonesisch', 'dals_legumes', 'lunch', 'pan_gabonese', 9, 20, 2),
  R(`فول سوداني محمص ${T}`, 'Roasted groundnuts Gabonese', 'Arachides grillées gabonaises', 'Cacahuetes tostadas gabonesas', 'Geröstete Erdnüsse gabonesisch', 'dals_legumes', 'snacks', 'pan_gabonese', 25, 10, 45),
  R(`حمص مطبوخ ${T}`, 'Chickpeas Gabonese', 'Pois chiches cuits gabonais', 'Garbanzos cocidos gaboneses', 'Gekochte Kichererbsen gabonesisch', 'dals_legumes', 'lunch', 'pan_gabonese', 9, 27, 3),
  R(`معجون الفول السوداني ${T}`, 'Groundnut paste Gabonese', 'Pâte d arachide gabonaise', 'Pasta de cacahuete gabonesa', 'Erdnusspaste gabonesisch', 'dals_legumes', 'lunch', 'pan_gabonese', 24, 16, 48),
  R(`فاصولياء بيضاء ${T}`, 'White beans Gabonese', 'Haricots blancs gabonais', 'Alubias blancas gabonesas', 'Weiße Bohnen gabonesisch', 'dals_legumes', 'lunch', 'pan_gabonese', 9, 24, 2),
  R(`عدس بهار ${T}`, 'Spiced lentils Gabonese', 'Lentilles aux épices gabonaises', 'Lentejas con especias gabonesas', 'Gewürzlinsen gabonesisch', 'dals_legumes', 'lunch', 'pan_gabonese', 9, 23, 4),
  R(`لوبيا حمراء ${T}`, 'Red kidney beans Gabonese', 'Haricots rouges gabonais', 'Alubias rojas gabonesas', 'Rote Kidneybohnen gabonesisch', 'dals_legumes', 'lunch', 'pan_gabonese', 9, 24, 2),
  R(`فول الصويا ${T}`, 'Soy beans Gabonese', 'Soja gabonais', 'Soja gabonés', 'Sojabohnen gabonesisch', 'dals_legumes', 'lunch', 'pan_gabonese', 36, 30, 20),
  R(`بازلاء مطبوخة ${T}`, 'Cooked peas Gabonese', 'Petits pois cuits gabonais', 'Guisantes cocidos gaboneses', 'Gekochte Erbsen gabonesisch', 'dals_legumes', 'lunch', 'pan_gabonese', 6, 18, 2),
  R(`حمص بالطحينة ${T}`, 'Chickpeas with tahini Gabonese', 'Pois chiches au tahini gabonais', 'Garbanzos con tahini gaboneses', 'Kichererbsen mit Tahini gabonesisch', 'dals_legumes', 'lunch', 'pan_gabonese', 10, 24, 10),
  R(`عدس بالبرغل ${T}`, 'Lentils with bulgur Gabonese', 'Lentilles au boulgour gabonaises', 'Lentejas con bulgur gabonesas', 'Linsen mit Bulgur gabonesisch', 'dals_legumes', 'lunch', 'pan_gabonese', 9, 32, 3),
  R(`فول بالسمن ${T}`, 'Beans with ghee Gabonese', 'Haricots au ghee gabonais', 'Alubias con ghee gabonesas', 'Bohnen mit Ghee gabonesisch', 'dals_legumes', 'lunch', 'pan_gabonese', 8, 22, 9),
  R(`فول مجفف ${T}`, 'Dried beans Gabonese', 'Haricots secs gabonais', 'Alubias secas gabonesas', 'Trockenbohnen gabonesisch', 'dals_legumes', 'lunch', 'pan_gabonese', 22, 60, 2),
);
// --- vegetarian_mains (18) --------------------------------------------------
dishes.push(
  R(`ساكا ساكا بالخضار ${T}`, 'Saka-saka with vegetables Gabonese', 'Saka-saka aux légumes gabonais', 'Saka-saka con verduras gabonés', 'Saka-Saka mit Gemüse gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 7, 15, 15),
  R(`بونغولو بالبصل ${T}`, 'Bongolo with onion Gabonese', 'Bongolo aux oignons gabonais', 'Bongolo con cebolla gabonés', 'Bongolo mit Zwiebeln gabonesisch', 'vegetarian_mains', 'lunch', 'port_gentil', 5, 13, 9),
  R(`قرع بالجوزة ${T}`, 'Squash with coconut Gabonese', 'Courges à la noix de coco gabonaises', 'Calabaza con coco gabonesa', 'Kürbis mit Kokos gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 4, 16, 9),
  R(`طاجين الخضار ${T}`, 'Vegetable tagine Gabonese', 'Tajine de légumes gabonais', 'Tajín de verduras gabonés', 'Gemüse-Tajine gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 4, 22, 9),
  R(`كوسة محمصة ${T}`, 'Roasted courgette Gabonese', 'Courgette rôtie gabonaise', 'Calabacín asado gabonés', 'Geröstete Zucchini gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 3, 9, 6),
  R(`باذنجان بالجوزة ${T}`, 'Aubergine with coconut Gabonese', 'Aubergine à la noix de coco gabonaise', 'Berenjena con coco gabonesa', 'Aubergine mit Kokos gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 3, 12, 10),
  R(`بونغولو بالفول السوداني ${T}`, 'Bongolo with groundnuts Gabonese', 'Bongolo aux arachides gabonais', 'Bongolo con cacahuetes gabonés', 'Bongolo mit Erdnüssen gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 8, 15, 14),
  R(`قرع محمص بالسمسم ${T}`, 'Roasted squash with sesame Gabonese', 'Courges rôties au sésame gabonaises', 'Calabaza asada con sésamo gabonesa', 'Gerösteter Kürbis mit Sesam gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 5, 18, 9),
  R(`سبانخ بالسمن ${T}`, 'Spinach with ghee Gabonese', 'Épinards au ghee gabonais', 'Espinacas con ghee gaboneses', 'Spinat mit Ghee gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 5, 8, 13),
  R(`ورق الموز بالصلصة ${T}`, 'Banana leaf with sauce Gabonese', 'Feuille de banane à la sauce gabonaise', 'Hoja de plátano con salsa gabonesa', 'Bananenblatt mit Sauce gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 4, 14, 8),
  R(`طاجين الفاصولياء ${T}`, 'Bean tagine Gabonese', 'Tajine aux haricots gabonais', 'Tajín de judías gabonés', 'Bohnen-Tajine gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 9, 26, 8),
  R(`خضار بالكسكسو ${T}`, 'Vegetables with couscous Gabonese', 'Légumes au couscous gabonais', 'Verduras con cuscús gabonés', 'Gemüse mit Couscous gabonesisch', 'vegetarian_mains', 'lunch', 'franceville', 5, 34, 6),
  R(`قرع بالتمر ${T}`, 'Squash with dates Gabonese', 'Courges aux dattes gabonaises', 'Calabaza con dátiles gabonesa', 'Kürbis mit Datteln gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 4, 24, 6),
  R(`بامية بالسمسم ${T}`, 'Okra with sesame Gabonese', 'Okra au sésame gabonaise', 'Okra con sésamo gabonesa', 'Okra mit Sesam gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 5, 14, 9),
  R(`جزر مقلي ${T}`, 'Fried carrot Gabonese', 'Carottes frites gabonaises', 'Zanahorias fritas gabonesas', 'Frittierte Karotten gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 2, 14, 8),
  R(`لفائف الملفوف ${T}`, 'Cabbage rolls Gabonese', 'Rouleaux de chou gabonais', 'Rollos de col gaboneses', 'Kohlrollen gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 6, 20, 8),
  R(`فطر مشوي ${T}`, 'Grilled mushrooms Gabonese', 'Champignons grillés gabonais', 'Hongos a la parrilla gaboneses', 'Gegrillte Pilze gabonesisch', 'vegetarian_mains', 'lunch', 'pan_gabonese', 4, 6, 7),
  R(`طاجين النكومو ${T}`, 'Nkumu tagine Gabonese', 'Tajine de nkumu gabonais', 'Tajín de nkumu gabonés', 'Nkumu-Tajine gabonesisch', 'vegetarian_mains', 'lunch', 'oyem', 6, 12, 9),
);
// --- poultry_mains (10) -----------------------------------------------------
dishes.push(
  R(`دجاج مشوي بالثوم ${T}`, 'Grilled chicken with garlic Gabonese', 'Poulet grillé à l ail gabonais', 'Pollo a la parrilla con ajo gabonés', 'Grillhähnchen mit Knoblauch gabonesisch', 'poultry_mains', 'lunch', 'pan_gabonese', 22, 3, 12),
  R(`دجاج مقلي ${T}`, 'Fried chicken Gabonese', 'Poulet frit gabonais', 'Pollo frito gabonés', 'Frittiertes Hähnchen gabonesisch', 'poultry_mains', 'lunch', 'pan_gabonese', 21, 8, 15),
  R(`دجاج بالليمون والثوم ${T}`, 'Chicken with lemon and garlic Gabonese', 'Poulet au citron et à l ail gabonais', 'Pollo con limón y ajo gabonés', 'Huhn mit Zitrone und Knoblauch gabonesisch', 'poultry_mains', 'lunch', 'libreville', 20, 3, 11),
  R(`أسياخ دجاج ${T}`, 'Chicken skewers Gabonese', 'Brochettes de poulet gabonaises', 'Pinchos de pollo gaboneses', 'Hähnchenspieße gabonesisch', 'poultry_mains', 'lunch', 'libreville', 20, 2, 10),
  R(`كبد دجاج مشوي ${T}`, 'Grilled chicken liver Gabonese', 'Foie de poulet grillé gabonais', 'Hígado de pollo a la parrilla gabonés', 'Gegrillte Hähnchenleber gabonesisch', 'poultry_mains', 'lunch', 'pan_gabonese', 19, 2, 9),
  R(`دجاج بالحار ${T}`, 'Spicy chicken Gabonese', 'Poulet épicé gabonais', 'Pollo picante gabonés', 'Scharfes Hähnchen gabonesisch', 'poultry_mains', 'lunch', 'pan_gabonese', 20, 4, 13),
  R(`دجاج بالقرفة ${T}`, 'Chicken with cinnamon Gabonese', 'Poulet à la cannelle gabonais', 'Pollo con canela gabonés', 'Huhn mit Zimt gabonesisch', 'poultry_mains', 'lunch', 'pan_gabonese', 20, 4, 12),
  R(`دجاج بالزنجبيل ${T}`, 'Chicken with ginger Gabonese', 'Poulet au gingembre gabonais', 'Pollo con jengibre gabonés', 'Huhn mit Ingwer gabonesisch', 'poultry_mains', 'lunch', 'pan_gabonese', 20, 3, 11),
  R(`أسياخ دجاج بالثوم ${T}`, 'Garlic chicken skewers Gabonese', 'Brochettes de poulet à l ail gabonaises', 'Pinchos de pollo con ajo gaboneses', 'Knoblauch-Hähnchenspieße gabonesisch', 'poultry_mains', 'lunch', 'port_gentil', 20, 2, 10),
  R(`دجاج مشوي بالليمون ${T}`, 'Grilled lemon chicken Gabonese', 'Poulet grillé au citron gabonais', 'Pollo a la parrilla con limón gabonés', 'Gegrilltes Zitronenhähnchen gabonesisch', 'poultry_mains', 'lunch', 'mayumba', 21, 2, 11),
);
// --- meat_mains (16) --------------------------------------------------------
dishes.push(
  R(`لحم بقر مشوي بالثوم ${T}`, 'Grilled beef with garlic Gabonese', 'Boeuf grillé à l ail gabonais', 'Carne de res a la parrilla con ajo gabonesa', 'Gegrilltes Rindfleisch mit Knoblauch gabonesisch', 'meat_mains', 'lunch', 'pan_gabonese', 24, 2, 14),
  R(`لحم ماعز مشوي بالليمون ${T}`, 'Grilled goat with lemon Gabonese', 'Chevreau grillé au citron gabonais', 'Cabra a la parrilla con limón gabonesa', 'Gegrilltes Ziegenfleisch mit Zitrone gabonesisch', 'meat_mains', 'lunch', 'lambarene', 20, 2, 13),
  R(`أسياخ لحم بقر ${T}`, 'Beef skewers Gabonese', 'Brochettes de boeuf gabonaises', 'Pinchos de carne de res gaboneses', 'Rindfleischspieße gabonesisch', 'meat_mains', 'lunch', 'libreville', 23, 2, 12),
  R(`لحم بقر بالمشاوي ${T}`, 'Beef with barbecue sauce Gabonese', 'Boeuf à la sauce barbecue gabonais', 'Carne de res con salsa barbacoa gabonesa', 'Rindfleisch mit Barbecuesauce gabonesisch', 'meat_mains', 'lunch', 'pan_gabonese', 22, 8, 14),
  R(`لحم غنم بالقرفة ${T}`, 'Lamb with cinnamon Gabonese', 'Agneau à la cannelle gabonais', 'Cordero con canela gabonés', 'Lamm mit Zimt gabonesisch', 'meat_mains', 'lunch', 'franceville', 20, 3, 15),
  R(`لحم بقر مقلي ${T}`, 'Fried beef Gabonese', 'Boeuf frit gabonais', 'Carne de res frita gabonesa', 'Frittiertes Rindfleisch gabonesisch', 'meat_mains', 'lunch', 'pan_gabonese', 23, 8, 16),
  R(`لحم ماعز بالنيمبيو ${T}`, 'Goat in nyembwe sauce Gabonese', 'Chevreau à la nyembwe gabonais', 'Cabra con nyembwe gabonesa', 'Ziegenfleisch in Nyembwe-Sauce gabonesisch', 'meat_mains', 'lunch', 'oyem', 19, 6, 16),
  R(`بط مشوي بالزعتر ${T}`, 'Roast duck with thyme Gabonese', 'Canard rôti au thym gabonais', 'Pato asado con tomillo gabonés', 'Gebratene Ente mit Thymian gabonesisch', 'meat_mains', 'lunch', 'franceville', 19, 2, 14),
  R(`لحم بقر بالزنجبيل ${T}`, 'Beef with ginger Gabonese', 'Boeuf au gingembre gabonais', 'Carne de res con jengibre gabonesa', 'Rindfleisch mit Ingwer gabonesisch', 'meat_mains', 'lunch', 'pan_gabonese', 22, 3, 13),
  R(`كبد بقر مشوي ${T}`, 'Grilled beef liver Gabonese', 'Foie de boeuf grillé gabonais', 'Hígado de res a la parrilla gabonés', 'Gegrillte Rinderleber gabonesisch', 'meat_mains', 'lunch', 'pan_gabonese', 20, 2, 10),
  R(`لحم بقر بالبصل والبهارات ${T}`, 'Beef with onion and spices Gabonese', 'Boeuf aux oignons et épices gabonais', 'Carne de res con cebolla y especias gabonesa', 'Rindfleisch mit Zwiebeln und Gewürzen gabonesisch', 'meat_mains', 'lunch', 'pan_gabonese', 22, 5, 13),
  R(`لحم غنم مشوي ${T}`, 'Grilled lamb Gabonese', 'Agneau grillé gabonais', 'Cordero a la parrilla gabonés', 'Gegrilltes Lamm gabonesisch', 'meat_mains', 'lunch', 'franceville', 21, 2, 15),
  R(`شريحة لحم بقر مشوية ${T}`, 'Grilled beef steak Gabonese', 'Steak de boeuf grillé gabonais', 'Filete de res a la parrilla gabonés', 'Gegrilltes Rindsteak gabonesisch', 'meat_mains', 'lunch', 'libreville', 24, 1, 13),
  R(`لحم بقر بالسمن ${T}`, 'Beef with ghee Gabonese', 'Boeuf au ghee gabonais', 'Carne de res con ghee gabonesa', 'Rindfleisch mit Ghee gabonesisch', 'meat_mains', 'lunch', 'pan_gabonese', 22, 2, 15),
  R(`لحم بقر بالفلفل الحار ${T}`, 'Beef with hot pepper Gabonese', 'Boeuf au piment fort gabonais', 'Carne de res con chile picante gabonesa', 'Rindfleisch mit scharfer Chili gabonesisch', 'meat_mains', 'lunch', 'moanda', 22, 3, 13),
  R(`أسياخ لحم غنم ${T}`, 'Lamb skewers Gabonese', 'Brochettes d agneau gabonaises', 'Pinchos de cordero gaboneses', 'Lammspieße gabonesisch', 'meat_mains', 'lunch', 'lambarene', 21, 2, 13),
);
// --- seafood_mains (28) -----------------------------------------------------
dishes.push(
  R(`سمك مشوي بالليمون ${T}`, 'Grilled fish with lemon Gabonese', 'Poisson grillé au citron gabonais', 'Pescado a la parrilla con limón gabonés', 'Gegrillter Fisch mit Zitrone gabonesisch', 'seafood_mains', 'lunch', 'port_gentil', 20, 1, 8),
  R(`سمك مدخن بالطماطم ${T}`, 'Smoked fish with tomato Gabonese', 'Poisson fumé à la tomate gabonais', 'Pescado ahumado con tomate gabonés', 'Räucherfisch mit Tomate gabonesisch', 'seafood_mains', 'lunch', 'pan_gabonese', 18, 5, 9),
  R(`كابيتان مشوي بالثوم ${T}`, 'Grilled capitaine with garlic Gabonese', 'Capitaine grillé à l ail gabonais', 'Capitán a la parrilla con ajo gabonés', 'Gegrillter Capitain mit Knoblauch gabonesisch', 'seafood_mains', 'lunch', 'port_gentil', 22, 1, 7),
  R(`بونغو مشوي بالفلفل ${T}`, 'Grilled bongo with pepper Gabonese', 'Bongo grillé au poivre gabonais', 'Bongo a la parrilla con pimienta gabonés', 'Gegrillter Bongo mit Pfeffer gabonesisch', 'seafood_mains', 'lunch', 'mayumba', 20, 1, 7),
  R(`سمك بالأوديكا ${T}`, 'Fish with odika sauce Gabonese', 'Poisson à l odika gabonais', 'Pescado con salsa de odika gabonés', 'Fisch mit Odika-Sauce gabonesisch', 'seafood_mains', 'lunch', 'franceville', 17, 8, 14),
  R(`سمك بالساكا ساكا ${T}`, 'Fish with saka-saka Gabonese', 'Poisson au saka-saka gabonais', 'Pescado con saka-saka gabonés', 'Fisch mit Saka-Saka gabonesisch', 'seafood_mains', 'lunch', 'pan_gabonese', 16, 9, 12),
  R(`سمك بالدونغو دونغو ${T}`, 'Fish with dongo-dongo Gabonese', 'Poisson au dongo-dongo gabonais', 'Pescado con dongo-dongo gabonés', 'Fisch mit Dongo-Dongo gabonesisch', 'seafood_mains', 'lunch', 'pan_gabonese', 16, 7, 12),
  R(`سمك مملح مشوي ${T}`, 'Grilled salted fish Gabonese', 'Poisson salé grillé gabonais', 'Pescado salado a la parrilla gabonés', 'Gegrillter gesalzener Fisch gabonesisch', 'seafood_mains', 'lunch', 'port_gentil', 20, 1, 8),
  R(`تونة مشوية بالثوم ${T}`, 'Grilled tuna with garlic Gabonese', 'Thon grillé à l ail gabonais', 'Atún a la parrilla con ajo gabonés', 'Gegrillter Thunfisch mit Knoblauch gabonesisch', 'seafood_mains', 'lunch', 'port_gentil', 22, 1, 6),
  R(`سردين مشوي بالليمون ${T}`, 'Grilled sardines with lemon Gabonese', 'Sardines grillées au citron gabonaises', 'Sardinas a la parrilla con limón gaboneses', 'Gegrillte Sardinen mit Zitrone gabonesisch', 'seafood_mains', 'lunch', 'mayumba', 19, 1, 9),
  R(`بوري مشوي بالزعتر ${T}`, 'Grilled sea bream with thyme Gabonese', 'Daurade grillée au thym gabonaise', 'Denton a la parrilla con tomillo gabonés', 'Gegrillte Meerbrasse mit Thymian gabonesisch', 'seafood_mains', 'lunch', 'port_gentil', 21, 1, 7),
  R(`دنيس متبّل بالثوم ${T}`, 'Spiced sea bass with garlic Gabonese', 'Bar cuit aux épices et à l ail gabonais', 'Lubina especiada con ajo gabonesa', 'Gewürz-Seezunge mit Knoblauch gabonesisch', 'seafood_mains', 'lunch', 'mayumba', 20, 2, 8),
  R(`حبار مشوي بالليمون ${T}`, 'Grilled calamari with lemon Gabonese', 'Calamars grillés au citron gabonais', 'Calamar a la parrilla con limón gabonés', 'Gegrillter Kalamar mit Zitrone gabonesisch', 'seafood_mains', 'lunch', 'port_gentil', 19, 4, 8),
  R(`أخطبوط مشوي بالزعتر ${T}`, 'Grilled octopus with thyme Gabonese', 'Poulpe grillé au thym gabonais', 'Pulpo a la parrilla con tomillo gabonés', 'Gegrillter Oktopus mit Thymian gabonesisch', 'seafood_mains', 'lunch', 'mayumba', 20, 2, 7),
);
// --- seafood_mains (14 more) -----------------------------------------------
dishes.push(
  R(`روبيان مشوي بالثوم ${T}`, 'Grilled prawns with garlic Gabonese', 'Crevettes grillées à l ail gabonaises', 'Camarones a la parrilla con ajo gaboneses', 'Gegrillte Garnelen mit Knoblauch gabonesisch', 'seafood_mains', 'lunch', 'port_gentil', 19, 2, 9),
  R(`جمبري مشوي ${T}`, 'Grilled prawns Gabonese', 'Gambas grillées gabonaises', 'Langostinos a la parrilla gaboneses', 'Gegrillte Garnelen gabonesisch', 'seafood_mains', 'lunch', 'mayumba', 19, 1, 9),
  R(`سلطعون مشوي ${T}`, 'Grilled crab Gabonese', 'Crabe grillé gabonais', 'Cangrejo a la parrilla gabonés', 'Gegrillter Krebs gabonesisch', 'seafood_mains', 'lunch', 'mayumba', 18, 2, 8),
  R(`لانغوست مشوي بالثوم ${T}`, 'Grilled langouste with garlic Gabonese', 'Langouste grillée à l ail gabonaise', 'Langosta a la parrilla con ajo gabonesa', 'Gegrillte Languste mit Knoblauch gabonesisch', 'seafood_mains', 'lunch', 'mayumba', 20, 1, 8),
  R(`سمك بالليبوكة ${T}`, 'Fish with liboke Gabonese', 'Poisson au liboke gabonais', 'Pescado con liboke gabonés', 'Fisch mit Liboke gabonesisch', 'seafood_mains', 'lunch', 'lambarene', 17, 9, 13),
  R(`سمك بالنيمبيو ${T}`, 'Fish in nyembwe sauce Gabonese', 'Poisson à la nyembwe gabonais', 'Pescado en nyembwe gabonés', 'Fisch in Nyembwe-Sauce gabonesisch', 'seafood_mains', 'lunch', 'pan_gabonese', 16, 8, 15),
  R(`سمك مقلي بالثوم ${T}`, 'Fried fish with garlic Gabonese', 'Poisson frit à l ail gabonais', 'Pescado frito con ajo gabonés', 'Frittierter Fisch mit Knoblauch gabonesisch', 'seafood_mains', 'lunch', 'port_gentil', 19, 10, 13),
  R(`محار مشوي ${T}`, 'Grilled oysters Gabonese', 'Huîtres grillées gabonaises', 'Ostras a la parrilla gabonesas', 'Gegrillte Austern gabonesisch', 'seafood_mains', 'lunch', 'mayumba', 12, 4, 9),
  R(`ماكريل مشوي بالثوم ${T}`, 'Grilled mackerel with garlic Gabonese', 'Maquereau grillé à l ail gabonais', 'Caballa a la parrilla con ajo gabonesa', 'Gegrillte Makrele mit Knoblauch gabonesisch', 'seafood_mains', 'lunch', 'port_gentil', 20, 1, 10),
  R(`سمك في الفرن بالثوم ${T}`, 'Oven-baked fish with garlic Gabonese', 'Poisson au four à l ail gabonais', 'Pescado al horno con ajo gabonés', 'Fisch aus dem Ofen mit Knoblauch gabonesisch', 'seafood_mains', 'lunch', 'pan_gabonese', 20, 3, 10),
  R(`سلمون مشوي بالليمون ${T}`, 'Grilled salmon with lemon Gabonese', 'Saumon grillé au citron gabonais', 'Salmón a la parrilla con limón gabonés', 'Gegrillter Lachs mit Zitrone gabonesisch', 'seafood_mains', 'lunch', 'libreville', 21, 1, 11),
  R(`سمك بالبلحِيخ ${T}`, 'Fish with maboke leaves Gabonese', 'Poisson aux feuilles de maboke gabonais', 'Pescado con hojas de maboke gabonés', 'Fisch mit Maboke-Blättern gabonesisch', 'seafood_mains', 'lunch', 'lambarene', 17, 8, 13),
  R(`روبيان بالجوزة ${T}`, 'Prawns with coconut Gabonese', 'Crevettes à la noix de coco gabonaises', 'Camarones con coco gaboneses', 'Garnelen mit Kokos gabonesisch', 'seafood_mains', 'lunch', 'port_gentil', 18, 4, 13),
  R(`روبيان بالقصدير ${T}`, 'Tinned prawns Gabonese', 'Crevettes en boîte gabonaises', 'Camarones en lata gaboneses', 'Garnelen aus der Dose gabonesisch', 'seafood_mains', 'lunch', 'pan_gabonese', 19, 2, 9),
);
// --- soups_salads (18) -----------------------------------------------------
dishes.push(
  R(`شوربة الدجاج بالنيمبيو ${T}`, 'Chicken nyembwe soup Gabonese', 'Soupe de poulet à la nyembwe gabonaise', 'Sopa de pollo con nyembwe gabonesa', 'Hühnernyembwe-Suppe gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 9, 8, 14),
  R(`شوربة السمك بالتمر ${T}`, 'Fish soup with dates Gabonese', 'Soupe de poisson aux dattes gabonaise', 'Sopa de pescado con dátiles gabonesa', 'Fischsuppe mit Datteln gabonesisch', 'soups_salads', 'lunch', 'port_gentil', 14, 10, 7),
  R(`شوربة الروبيان بالجوزة ${T}`, 'Prawn soup with coconut Gabonese', 'Soupe de crevettes à la noix de coco gabonaise', 'Sopa de camarones con coco gabonesa', 'Garnelensuppe mit Kokos gabonesisch', 'soups_salads', 'lunch', 'port_gentil', 13, 9, 9),
  R(`شوربة المانوك ${T}`, 'Cassava soup Gabonese', 'Soupe de manioc gabonaise', 'Sopa de yuca gabonesa', 'Manioksuppe gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 3, 16, 7),
  R(`شوربة العدس بالحار ${T}`, 'Spicy lentil soup Gabonese', 'Soupe de lentilles épicée gabonaise', 'Sopa de lentejas picante gabonesa', 'Scharfe Linsensuppe gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 7, 20, 4),
  R(`مرقة اللحم بالبصل ${T}`, 'Meat broth with onion Gabonese', 'Bouillon de viande aux oignons gabonais', 'Caldo de carne con cebolla gabonés', 'Fleischbrühe mit Zwiebeln gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 9, 6, 7),
  R(`شوربة الفول بالسمن ${T}`, 'Bean soup with ghee Gabonese', 'Soupe de haricots au ghee gabonaise', 'Sopa de judías con ghee gabonesa', 'Bohnensuppe mit Ghee gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 7, 20, 8),
  R(`شوربة الطماطم ${T}`, 'Tomato soup Gabonese', 'Soupe de tomate gabonaise', 'Sopa de tomate gabonesa', 'Tomatensuppe gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 2, 12, 6),
  R(`شوربة الباذنجان ${T}`, 'Aubergine soup Gabonese', 'Soupe d aubergine gabonaise', 'Sopa de berenjena gabonesa', 'Auberginensuppe gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 2, 13, 7),
  R(`شوربة الكوسة ${T}`, 'Courgette soup Gabonese', 'Soupe de courgette gabonaise', 'Sopa de calabacín gabonesa', 'Zucchinisuppe gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 2, 11, 6),
  R(`سلطة المانوك ${T}`, 'Cassava salad Gabonese', 'Salade de manioc gabonaise', 'Ensalada de yuca gabonesa', 'Manioksalat gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 3, 24, 9),
  R(`سلطة الخضر ${T}`, 'Mixed vegetable salad Gabonese', 'Salade de légumes variée gabonaise', 'Ensalada de verduras variadas gabonesa', 'Gemischter Gemüsesalat gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 3, 12, 7),
  R(`سلطة الطماطم بالبصل ${T}`, 'Tomato and onion salad Gabonese', 'Salade de tomates et oignons gabonaise', 'Ensalada de tomate y cebolla gabonesa', 'Tomaten-Zwiebel-Salat gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 2, 11, 6),
  R(`سلطة خيار ${T}`, 'Cucumber salad Gabonese', 'Salade de concombre gabonaise', 'Ensalada de pepino gabonesa', 'Gurkensalat gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 1, 6, 5),
  R(`سلطة جزر ${T}`, 'Carrot salad Gabonese', 'Salade de carottes gabonaise', 'Ensalada de zanahoria gabonesa', 'Karottensalat gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 1, 10, 5),
  R(`سلطة أفوكادو ${T}`, 'Avocado salad Gabonese', 'Salade d avocat gabonaise', 'Ensalada de aguacate gabonesa', 'Avocadosalat gabonesisch', 'soups_salads', 'lunch', 'libreville', 2, 9, 12),
  R(`سلطة خضراء ${T}`, 'Green salad Gabonese', 'Salade verte gabonaise', 'Ensalada verde gabonesa', 'Grüner Salat gabonesisch', 'soups_salads', 'lunch', 'pan_gabonese', 2, 8, 6),
  R(`سلطة جوز الهند ${T}`, 'Coconut salad Gabonese', 'Salade à la noix de coco gabonaise', 'Ensalada de coco gabonesa', 'Kokossalat gabonesisch', 'soups_salads', 'lunch', 'port_gentil', 2, 8, 10),
);
// --- street_snacks (20) -----------------------------------------------------
dishes.push(
  R(`مشاوي لحم ${T}`, 'Beef brochettes Gabonese', 'Brochettes de boeuf gabonaises', 'Pinchos de carne de res gaboneses', 'Rindfleisch-Brochettes gabonesisch', 'street_snacks', 'snacks', 'libreville', 22, 3, 13),
  R(`مشاوي دجاج ${T}`, 'Chicken brochettes Gabonese', 'Brochettes de poulet gabonaises', 'Pinchos de pollo gaboneses', 'Hähnchen-Brochettes gabonesisch', 'street_snacks', 'snacks', 'libreville', 21, 3, 12),
  R(`مشاوي سمك ${T}`, 'Fish brochettes Gabonese', 'Brochettes de poisson gabonaises', 'Pinchos de pescado gaboneses', 'Fisch-Brochettes gabonesisch', 'street_snacks', 'snacks', 'port_gentil', 19, 3, 9),
  R(`ساندويتش لحم ${T}`, 'Beef sandwich Gabonese', 'Sandwich au boeuf gabonais', 'Sándwich de carne de res gabonés', 'Rindfleisch-Sandwich gabonesisch', 'street_snacks', 'lunch', 'libreville', 18, 24, 10),
  R(`ساندويتش دجاج ${T}`, 'Chicken sandwich Gabonese', 'Sandwich au poulet gabonais', 'Sándwich de pollo gabonés', 'Hähnchen-Sandwich gabonesisch', 'street_snacks', 'lunch', 'libreville', 17, 24, 9),
  R(`ساندويتش السمك المدخن ${T}`, 'Smoked fish sandwich Gabonese', 'Sandwich au poisson fumé gabonais', 'Sándwich de pescado ahumado gabonés', 'Sandwich mit Räucherfisch gabonesisch', 'street_snacks', 'lunch', 'port_gentil', 15, 23, 8),
  R(`بيغيه بالتمر ${T}`, 'Beignets with dates Gabonese', 'Beignets aux dattes gabonais', 'Buñuelos con dátiles gaboneses', 'Beignets mit Datteln gabonesisch', 'street_snacks', 'snacks', 'libreville', 5, 34, 14),
  R(`سكون بالجوزة ${T}`, 'Coconut scone Gabonese', 'Scone à la noix de coco gabonais', 'Scone de coco gabonés', 'Kokos-Scone gabonesisch', 'street_snacks', 'snacks', 'libreville', 5, 30, 12),
  R(`بطاطا مقلية ${T}`, 'French fries Gabonese', 'Frites de pomme de terre gabonaises', 'Patatas fritas gabonesas', 'Pommes frites gabonesisch', 'street_snacks', 'snacks', 'pan_gabonese', 3, 30, 13),
  R(`فول بالزيت ${T}`, 'Beans in oil Gabonese', 'Haricots à l huile gabonais', 'Alubias fritas en aceite gabonesas', 'Bohnen in Öl gabonesisch', 'street_snacks', 'snacks', 'pan_gabonese', 8, 16, 12),
  R(`كعك مقلي ${T}`, 'Fried cake Gabonese', 'Gâteau frit gabonais', 'Bizcocho frito gabonés', 'Frittierter Kuchen gabonesisch', 'street_snacks', 'snacks', 'pan_gabonese', 4, 32, 12),
  R(`موز مقلي ${T}`, 'Fried plantain Gabonese', 'Banane plantain frite gabonaise', 'Plátano frito gabonés', 'Fritierte Kochbanane gabonesisch', 'street_snacks', 'snacks', 'port_gentil', 2, 30, 12),
  R(`عصير القصب ${T}`, 'Sugarcane juice Gabonese', 'Jus de canne à sucre gabonais', 'Zumo de caña de azúcar gabonés', 'Zuckerrohrsaft gabonesisch', 'street_snacks', 'snacks', 'pan_gabonese', 0, 26, 0),
  R(`مكسرات محمصة ${T}`, 'Roasted mixed nuts Gabonese', 'Noix grillées gabonaises', 'Frutos secos tostados gaboneses', 'Geröstete Nüsse gabonesisch', 'street_snacks', 'snacks', 'pan_gabonese', 18, 12, 40),
  R(`تمر بالسكر ${T}`, 'Dates with sugar Gabonese', 'Dattes au sucre gabonaises', 'Dátiles con azúcar gaboneses', 'Datten mit Zucker gabonesisch', 'street_snacks', 'snacks', 'pan_gabonese', 2, 40, 1),
  R(`كسكسو بالخضار ${T}`, 'Couscous with vegetables Gabonese', 'Couscous aux légumes gabonais', 'Cuscús con verduras gabonés', 'Couscous mit Gemüse gabonesisch', 'street_snacks', 'lunch', 'african_shared', 6, 34, 6),
  R(`فطائر الجبن ${T}`, 'Cheese pastries Gabonese', 'Feuilletés au fromage gabonais', 'Empanadillas de queso gabonesas', 'Käsepastete gabonesisch', 'street_snacks', 'snacks', 'libreville', 9, 26, 13),
  R(`لوز محمص ${T}`, 'Roasted almonds Gabonese', 'Amandes grillées gabonaises', 'Almendras tostadas gabonesas', 'Geröstete Mandeln gabonesisch', 'street_snacks', 'snacks', 'pan_gabonese', 21, 10, 45),
  R(`بيض بالخبز ${T}`, 'Eggs with bread Gabonese', 'Oeufs avec pain gabonais', 'Huevos con pan gaboneses', 'Eier mit Brot gabonesisch', 'street_snacks', 'snacks', 'pan_gabonese', 11, 18, 10),
  R(`فول بالسمن والفلفل ${T}`, 'Beans with ghee and pepper Gabonese', 'Haricots au ghee et poivre gabonais', 'Alubias con ghee y pimienta gabonesas', 'Bohnen mit Ghee und Pfeffer gabonesisch', 'street_snacks', 'snacks', 'lambarene', 8, 18, 12),
);
// --- condiments (8) ---------------------------------------------------------
dishes.push(
  R(`صلصة النيمبيو ${T}`, 'Nyembwe sauce Gabonese', 'Sauce à la nyembwe gabonaise', 'Salsa de nyembwe gabonesa', 'Nyembwe-Sauce gabonesisch', 'condiments', 'lunch', 'pan_gabonese', 5, 8, 18),
  R(`صلصة الأوديكا ${T}`, 'Odika sauce Gabonese', 'Sauce à l odika gabonaise', 'Salsa de odika gabonesa', 'Odika-Sauce gabonesisch', 'condiments', 'lunch', 'franceville', 4, 9, 15),
  R(`صلصة الفلفل الحار ${T}`, 'Hot pepper sauce Gabonese', 'Sauce au piment fort gabonaise', 'Salsa de chile picante gabonesa', 'Scharfe Chilisauce gabonesisch', 'condiments', 'lunch', 'pan_gabonese', 2, 8, 6),
  R(`صلصة الفول السوداني ${T}`, 'Groundnut sauce Gabonese', 'Sauce aux arachides gabonaise', 'Salsa de cacahuete gabonesa', 'Erdnusssauce gabonesisch', 'condiments', 'lunch', 'pan_gabonese', 8, 10, 16),
  R(`صلصة السمسم ${T}`, 'Sesame sauce Gabonese', 'Sauce au sésame gabonaise', 'Salsa de sésamo gabonesa', 'Sesamsauce gabonesisch', 'condiments', 'lunch', 'pan_gabonese', 6, 8, 14),
  R(`مخلل المانوك ${T}`, 'Cassava pickle Gabonese', 'Cornichons de manioc gabonais', 'Encurtido de yuca gabonés', 'Eingelegter Maniok gabonesisch', 'condiments', 'lunch', 'pan_gabonese', 2, 20, 8),
  R(`مخلل البصل ${T}`, 'Onion pickle Gabonese', 'Oignons marinés gabonais', 'Cebollitas encurtidas gaboneses', 'Eingelegte Zwiebeln gabonesisch', 'condiments', 'lunch', 'pan_gabonese', 1, 12, 5),
  R(`صلصة الزنجبيل ${T}`, 'Ginger sauce Gabonese', 'Sauce au gingembre gabonaise', 'Salsa de jengibre gabonesa', 'Ingwersauce gabonesisch', 'condiments', 'lunch', 'pan_gabonese', 1, 14, 5),
);
// --- desserts_sweets (10) ---------------------------------------------------
dishes.push(
  R(`كعك الموز بالعسل ${T}`, 'Honey banana cake Gabonese', 'Gâteau banane au miel gabonais', 'Bizcocho de plátano con miel gabonés', 'Bananenkuchen mit Honig gabonesisch', 'desserts_sweets', 'snacks', 'pan_gabonese', 4, 42, 10),
  R(`بسكويت المانوك ${T}`, 'Cassava biscuits Gabonese', 'Biscuits de manioc gabonais', 'Galletas de yuca gaboneses', 'Maniok-Kekse gabonesisch', 'desserts_sweets', 'snacks', 'pan_gabonese', 5, 40, 12),
  R(`كيك الشوكولاتة ${T}`, 'Chocolate cake Gabonese', 'Gâteau au chocolat gabonais', 'Bizcocho de chocolate gabonés', 'Schokoladenkuchen gabonesisch', 'desserts_sweets', 'snacks', 'libreville', 5, 40, 14),
  R(`كريب بالتمر ${T}`, 'Sweet crepe with dates Gabonese', 'Crêpe sucrée aux dattes gabonaise', 'Crepa dulce con dátiles gabonesa', 'Süße Crepes mit Datteln gabonesisch', 'desserts_sweets', 'snacks', 'libreville', 6, 40, 8),
  R(`حلوى جوز الهند ${T}`, 'Coconut candy Gabonese', 'Bonbons à la noix de coco gabonais', 'Caramelo de coco gabonés', 'Kokosbonbons gabonesisch', 'desserts_sweets', 'snacks', 'pan_gabonese', 2, 30, 12),
);
// --- desserts_sweets (5 more) -----------------------------------------------
dishes.push(
  R(`مثلجات الفاكهة ${T}`, 'Fruit ice cream Gabonese', 'Glace aux fruits gabonaise', 'Helado de frutas gabonés', 'Fruchteis gabonesisch', 'desserts_sweets', 'snacks', 'libreville', 2, 24, 10),
  R(`بودينغ المانوك ${T}`, 'Cassava pudding Gabonese', 'Pudding de manioc gabonais', 'Pudin de yuca gabonés', 'Maniokpudding gabonesisch', 'desserts_sweets', 'snacks', 'pan_gabonese', 3, 32, 8),
  R(`حلوى التمر والجوز ${T}`, 'Date and coconut sweet Gabonese', 'Confiture de dattes et noix de coco gabonaise', 'Dulce de dátiles y coco gabonés', 'Dattel-Kokos-Süßigkeit gabonesisch', 'desserts_sweets', 'snacks', 'oyem', 3, 36, 7),
  R(`تارت المانوك ${T}`, 'Cassava tart Gabonese', 'Tarte au manioc gabonaise', 'Tarta de yuca gabonesa', 'Manioktarte gabonesisch', 'desserts_sweets', 'snacks', 'port_gentil', 4, 38, 11),
  R(`كيك المانوك بالشوكولاتة ${T}`, 'Cassava chocolate cake Gabonese', 'Gâteau au manioc et chocolat gabonais', 'Bizcocho de yuca con chocolate gabonés', 'Maniok-Schokoladenkuchen gabonesisch', 'desserts_sweets', 'snacks', 'libreville', 6, 42, 12),
);
// --- beverages (16) ---------------------------------------------------------
dishes.push(
  R(`قهوة غابونية ${T}`, 'Gabonese coffee', 'Café gabonais', 'Café gabonés', 'Gabonesischer Kaffee', 'beverages', 'breakfast', 'pan_gabonese', 2, 3, 3),
  R(`شاي بالحليب ${T}`, 'Milk tea', 'Thé au lait gabonais', 'Té con leche gabonés', 'Tee mit Milch gabonesisch', 'beverages', 'breakfast', 'pan_gabonese', 2, 12, 3),
  R(`عصير المانجو ${T}`, 'Mango juice', 'Jus de mangue gabonais', 'Zumo de mango gabonés', 'Mangosaft gabonesisch', 'beverages', 'snacks', 'pan_gabonese', 1, 16, 0),
  R(`عصير الأناناس ${T}`, 'Pineapple juice', 'Jus d ananas gabonais', 'Zumo de piña gabonés', 'Ananassaft gabonesisch', 'beverages', 'snacks', 'pan_gabonese', 1, 14, 0),
);
// --- beverages (4 more) -----------------------------------------------------
dishes.push(
  R(`عصير الماراكوجا ${T}`, 'Passion fruit juice', 'Jus de fruit de la passion gabonais', 'Zumo de maracuyá gabonés', 'Passionsfruchtsaft gabonesisch', 'beverages', 'snacks', 'pan_gabonese', 1, 12, 0),
  R(`عصير الليمون بالنعناع ${T}`, 'Mint lemonade', 'Limonade à la menthe gabonaise', 'Limonada con menta gabonesa', 'Minzzitronade gabonesisch', 'beverages', 'snacks', 'pan_gabonese', 0, 12, 0),
  R(`عصير الموز بالتمر ${T}`, 'Banana and date shake', 'Smoothie banane et dattes gabonais', 'Batido de plátano y dátiles gabonés', 'Bananen-Dattel-Shake gabonesisch', 'beverages', 'snacks', 'lambarene', 2, 24, 3),
  R(`ماء جوز الهند ${T}`, 'Coconut water', 'Eau de coco gabonaise', 'Agua de coco gabonesa', 'Kokoswasser gabonesisch', 'beverages', 'snacks', 'port_gentil', 1, 6, 2),
);
// --- beverages (4 more) -----------------------------------------------------
dishes.push(
  R(`شاي بالنعناع ${T}`, 'Mint tea', 'Thé à la menthe gabonais', 'Té con menta gabonés', 'Pfefferminztee gabonesisch', 'beverages', 'breakfast', 'pan_gabonese', 0, 8, 0),
  R(`قهوة بالحليب ${T}`, 'Coffee with milk', 'Café au lait gabonais', 'Café con leche gabonés', 'Kaffee mit Milch gabonesisch', 'beverages', 'breakfast', 'pan_gabonese', 3, 12, 3),
  R(`شاي الزنجبيل بالعسل ${T}`, 'Ginger tea with honey', 'Thé au gingembre et miel gabonais', 'Té de jengibre con miel gabonés', 'Ingwertee mit Honig gabonesisch', 'beverages', 'breakfast', 'pan_gabonese', 0, 12, 1),
);
// --- beverages (4 more) -----------------------------------------------------
dishes.push(
  R(`شاي القرفة بالعسل ${T}`, 'Cinnamon honey tea', 'Thé à la cannelle et au miel gabonais', 'Té de canela con miel gabonés', 'Zimt-Honigtee gabonesisch', 'beverages', 'breakfast', 'pan_gabonese', 0, 14, 1),
  R(`عصير البابايا ${T}`, 'Papaya juice', 'Jus de papaye gabonais', 'Zumo de papaya gabonés', 'Papayasaft gabonesisch', 'beverages', 'snacks', 'pan_gabonese', 1, 13, 0),
);
// --- beverages (2 more) -----------------------------------------------------
dishes.push(
);
// --- beverages (2 more) -----------------------------------------------------
dishes.push(
  R(`شاي بالليمون ${T}`, 'Lemon tea', 'Thé au citron gabonais', 'Té con limón gabonés', 'Zitronentee gabonesisch', 'beverages', 'breakfast', 'pan_gabonese', 0, 11, 0),
  R(`مشروب التمر الهندي ${T}`, 'Tamarind drink', 'Boisson de tamarin gabonaise', 'Bebida de tamarindo gabonesa', 'Tamarindengetränk gabonesisch', 'beverages', 'snacks', 'pan_gabonese', 1, 14, 0),
);


// --- beverages (1 more) ------------------------------------------------------
dishes.push(
);

// --- beverages (1 more) ------------------------------------------------------
dishes.push(
  R(`عصير التمر ${T}`, 'Date juice', 'Jus de dattes gabonais', 'Zumo de dátiles gabonés', 'Dattensaft gabonesisch', 'beverages', 'snacks', 'pan_gabonese', 1, 28, 0),
);

// --- validation -------------------------------------------------------------
const byCategory = {};
const byRegion = {};
const byMeal = {};
const seen = new Map();
const dups = [];
const badTok = [];
const badRange = [];
const badLang = [];
const badAtwater = [];
const hitsPorkOrAlcohol = [];
const TOKEN = 'غابوني';
const ASIL = 'أصيل';
const PORK_OR_ALCOHOL = /\bpork\b|\bham\b|\bbacon\b|saucisson|chorizo|jamon|schwein|schinken|wurst|\bwine\b|\bbeer\b|cognac|\brhum\b|cerveza|\bvino\b|\bwein\b|liko|arack|mbouity|بيرة|خمر|نبيذ/i;

dishes.forEach((d, i) => {
  byCategory[d.category] = (byCategory[d.category] || 0) + 1;
  byRegion[d.region] = (byRegion[d.region] || 0) + 1;
  byMeal[d.mealType] = (byMeal[d.mealType] || 0) + 1;
  if (seen.has(d.name_ar)) dups.push(`${d.name_ar} (also #${seen.get(d.name_ar)})`);
  else seen.set(d.name_ar, i + 1);
  if (!d.name_ar.includes(TOKEN)) badTok.push(d.name_ar);
  if (!d.name_ar.trim().endsWith(ASIL)) badTok.push(`${d.name_ar} (missing ${ASIL})`);
  for (const k of ['name_en', 'name_fr', 'name_es', 'name_de']) {
    if (!d[k] || d[k].length < 3) badLang.push(`${d.name_ar} -> ${k}`);
  }
  if (d.cal_100 < 20 || d.cal_100 > 900) badRange.push(`${d.name_ar}(${d.cal_100})`);
  if (d.cal_100 !== Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat)) badAtwater.push(d.name_ar);
  if (PORK_OR_ALCOHOL.test([d.name_ar, d.name_en, d.name_fr, d.name_es, d.name_de].join(' '))) {
    hitsPorkOrAlcohol.push(d.name_ar);
  }
  if (!/^[a-z_]+$/.test(d.region)) badLang.push(`${d.name_ar} -> region ${d.region}`);
  if (!/^[a-z_]+$/.test(d.category)) badLang.push(`${d.name_ar} -> category ${d.category}`);
});

if (dishes.length !== 200) {
  console.error(`\nEXPECTED 200 dishes, got ${dishes.length}. Fix before writing.`);
  process.exit(1);
}
if (dups.length || badTok.length || badRange.length || badLang.length || badAtwater.length || hitsPorkOrAlcohol.length) {
  console.error('\nVALIDATION FAILED:');
  if (dups.length) console.error(`Duplicate names: ${dups.join(', ')}`);
  if (badTok.length) console.error(`Token problem: ${badTok.join(', ')}`);
  if (badLang.length) console.error(`Bad language/region/category: ${badLang.join(', ')}`);
  if (badRange.length) console.error(`Bad cal range: ${badRange.join(', ')}`);
  if (badAtwater.length) console.error(`Atwater mismatch: ${badAtwater.join(', ')}`);
  if (hitsPorkOrAlcohol.length) console.error(`Pork/alcohol: ${hitsPorkOrAlcohol.join(', ')}`);
  process.exit(1);
}

fs.writeFileSync(
  path.join(__dirname, 'gabon-200-proposal.json'),
  JSON.stringify(
    {
      meta: { target: 200, new_dishes: dishes.length, legacy_dishes: 100, with_macros: true },
      categories: Object.keys(byCategory),
      regions: Object.keys(byRegion),
      meal_types: Object.keys(byMeal),
      dishes,
    },
    null,
    2
  )
);
console.log(`\nWrote scripts/gabon-200-proposal.json (${dishes.length} dishes)`);
console.log(`Categories (${Object.keys(byCategory).length}): ${Object.keys(byCategory).join(', ')}`);
console.log(`Regions (${Object.keys(byRegion).length}): ${Object.keys(byRegion).join(', ')}`);
console.log(`Meal types: ${Object.keys(byMeal).join(', ')}`);
console.log(`Region distribution: ${JSON.stringify(byRegion)}`);
console.log(`Category distribution: ${JSON.stringify(byCategory)}`);
