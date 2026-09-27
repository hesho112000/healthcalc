// Authoring script for the Seychellois 200-dish proposal (scripts/seychelles-200-proposal.json).
// 200 NEW dishes (the 100 base rows live in src/data/seychellois-full.ts).
// Regions: pan_seychellois by default (golden rule), regional anchors (mahe, praslin, la_digue,
// outer_islands), african_shared for dishes shared across the wider African/Indian Ocean table.
// All Arabic names carry the سيشيلي أصيل token (strict halal profile: no pork, no alcohol).
// Emphasizes: Ladob, octopus curry, bouillon broth, jobfish, shark, breadfruit, taro, cassava,
// octopus, achards, kat-kat, gato pima, kachouma, Creole curry, breadfruit chips, callaloo-style
// greens, job fish, French fries, samosa-style fritters, sugarcane juice, coconut milk.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, protein, carbs, fat) => {
  const cal_100 = Math.round(4 * protein + 4 * carbs + 9 * fat);
  return { name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat };
};

const dishes = [];
const T = 'سيشيلي أصيل';

// ============================================================ PAN_SEYCHELLOIS + REGIONAL (200)
// --- breakfast_items (14) ----------------------------------------------------
dishes.push(
  R(`شاي بالحليب ${T}`, 'Milk tea Seychellois', 'Thé au lait seychellois', 'Té con leche seychellense', 'Milchtee seychellisch', 'breakfast_items', 'breakfast', 'pan_seychellois', 2, 8, 2),
  R(`عصير مانجو بالزنجبيل ${T}`, 'Ginger mango juice Seychellois', 'Jus de mangue au gingembre seychellois', 'Jugo de mango con jengibre seychellense', 'Mango-Ingwer-Saft seychellisch', 'breakfast_items', 'breakfast', 'pan_seychellois', 1, 18, 0),
  R(`كات كات بالشوكولاتة ${T}`, 'Kat-kat with chocolate Seychellois', 'Kat-kat au chocolat seychellois', 'Kat-kat con chocolate seychellense', 'Kat-kat mit Schokolade seychellisch', 'breakfast_items', 'breakfast', 'mahe', 4, 40, 10),
  R(`جاتو بيماد بالتمر ${T}`, 'Gato pima with dates Seychellois', 'Gato pima aux dattes seychellois', 'Gato pima con dátiles seychellense', 'Gato-pima mit Datteln seychellisch', 'breakfast_items', 'breakfast', 'pan_seychellois', 4, 42, 9),
  R(`عجة البصل والزنجبيل ${T}`, 'Onion ginger omelette Seychellois', 'Omelette oignon gingembre seychelloise', 'Omeleta de cebolla y jengibre seychellense', 'Zwiebel-Ingwer-Omelette seychellisch', 'breakfast_items', 'breakfast', 'pan_seychellois', 9, 7, 11),
  R(`بيض مسلوق بالطحينة ${T}`, 'Boiled eggs with tahini Seychellois', 'Œufs durs au tahini seychellois', 'Huevos cocidos con tahini seychellense', 'Gekochte Eier mit Tahini seychellisch', 'breakfast_items', 'breakfast', 'pan_seychellois', 12, 3, 9),
  R(`فول مدمس بزيت الزيتون ${T}`, 'Mashed beans with olive oil Seychellois', 'Haricots écrasés à l huile d olive seychellois', 'Frijoles majados con aceite de oliva seychellense', 'Stampfbohnen mit Olivenöl seychellisch', 'breakfast_items', 'breakfast', 'pan_seychellois', 7, 22, 5),
  R(`شوفان بالموز ${T}`, 'Banana oatmeal Seychellois', 'Flocons d avoine à la banane seychellois', 'Avena con plátano seychellense', 'Bananen-Haferflocken seychellisch', 'breakfast_items', 'breakfast', 'pan_seychellois', 5, 26, 4),
  R(`دقيق الذرة بالتمر ${T}`, 'Cornmeal with dates Seychellois', 'Semoule de maïs aux dattes seychelloise', 'Harina de maíz con dátiles seychellense', 'Maisgrieß mit Datteln seychellisch', 'breakfast_items', 'breakfast', 'pan_seychellois', 4, 28, 2),
  R(`كاشواما مثلجة ${T}`, 'Iced kachouma Seychellois', 'Kachouma glacé seychellois', 'Kachouma helado seychellense', 'Eisgekühlter Kachouma seychellisch', 'breakfast_items', 'breakfast', 'pan_seychellois', 1, 12, 0),
  R(`عصير القصب بالليمون ${T}`, 'Sugarcane juice with lemon Seychellois', 'Jus de canne au citron seychellois', 'Jugo de caña con limón seychellense', 'Zuckerrohrsaft mit Zitrone seychellisch', 'breakfast_items', 'breakfast', 'pan_seychellois', 1, 18, 0),
  R(`حليب جوز الهند الطازج ${T}`, 'Fresh coconut milk Seychellois', 'Lait de coco frais seychellois', 'Leche de coco fresca seychellense', 'Frische Kokosmilch seychellisch', 'breakfast_items', 'breakfast', 'mahe', 2, 6, 20),
  R(`خبز الزنجبيل ${T}`, 'Ginger bread Seychellois', 'Pain au gingembre seychellois', 'Pan de jengibre seychellense', 'Ingwerbrot seychellisch', 'breakfast_items', 'breakfast', 'pan_seychellois', 4, 32, 8),
  R(`موز بالعسل ${T}`, 'Banana with honey Seychellois', 'Banane au miel seychelloise', 'Plátano con miel seychellense', 'Banane mit Honig seychellisch', 'breakfast_items', 'breakfast', 'praslin', 1, 26, 1),
);
// --- breads_flatbreads (16) --------------------------------------------------
dishes.push(
  R(`خبز جوز الهند الطازج ${T}`, 'Fresh coconut bread Seychellois', 'Pain à la noix de coco fraîche seychellois', 'Pan de coco fresco seychellense', 'Frisches Kokosbrot seychellisch', 'breads_flatbreads', 'lunch', 'mahe', 6, 32, 10),
  R(`خبز الموز بالتمر ${T}`, 'Banana bread with dates Seychellois', 'Pain à la banane aux dattes seychellois', 'Pan de plátano con dátiles seychellense', 'Bananenbrot mit Datteln seychellisch', 'breads_flatbreads', 'lunch', 'pan_seychellois', 4, 36, 7),
  R(`رقائق خبز الشجرة ${T}`, 'Breadfruit chips Seychellois', 'Chips de fruit à pain seychellois', 'Chips de fruta del pan seychellense', 'Brotfrucht-Chips seychellisch', 'breads_flatbreads', 'lunch', 'pan_seychellois', 2, 32, 8),
  R(`خبز الجوز المجروش ${T}`, 'Bread with desiccated coconut Seychellois', 'Pain au coco râpé seychellois', 'Pan con coco rallado seychellense', 'Brot mit geraspelter Kokos seychellisch', 'breads_flatbreads', 'lunch', 'pan_seychellois', 6, 34, 11),
  R(`كعك الموز بالبخار ${T}`, 'Steamed banana cake Seychellois', 'Gâteau à la vapeur à la banane seychellois', 'Bizcocho al vapor de plátano seychellense', 'Dampf-Bananenkuchen seychellisch', 'breads_flatbreads', 'lunch', 'pan_seychellois', 4, 34, 5),
  R(`خبز الذرة الحلو ${T}`, 'Sweet corn bread Seychellois', 'Pain de maïs doux seychellois', 'Pan de maíz dulce seychellense', 'Süßmaisbrot seychellisch', 'breads_flatbreads', 'lunch', 'pan_seychellois', 4, 30, 5),
  R(`رول الموز بالتمر ${T}`, 'Banana date rolls Seychellois', 'Rouleaux banane dattes seychellois', 'Rollos de plátano y dátiles seychellense', 'Bananen-Dattel-Rollen seychellisch', 'breads_flatbreads', 'lunch', 'pan_seychellois', 4, 34, 6),
  R(`كعك الأرز الحلو ${T}`, 'Sweet rice cake Seychellois', 'Gâteau de riz sucré seychellois', 'Bizcocho de arroz dulce seychellense', 'Süßer Reiskuchen seychellisch', 'breads_flatbreads', 'lunch', 'pan_seychellois', 4, 32, 6),
  R(`خبز الفول المدمس ${T}`, 'Bean bread Seychellois', 'Pain aux haricots écrasés seychellois', 'Pan de frijoles majadas seychellense', 'Bohnenbrot seychellisch', 'breads_flatbreads', 'lunch', 'pan_seychellois', 7, 30, 5),
  R(`خبز الموز الأخضر ${T}`, 'Green banana bread Seychellois', 'Pain banane verte seychellois', 'Pan de plátano verde seychellense', 'Grünes Bananenbrot seychellisch', 'breads_flatbreads', 'lunch', 'pan_seychellois', 4, 34, 6),
  R(`توست جوز الهند ${T}`, 'Coconut toast Seychellois', 'Pain grillé à la noix de coco seychellois', 'Tostada de coco seychellense', 'Kokos-Toast seychellisch', 'breads_flatbreads', 'lunch', 'pan_seychellois', 5, 28, 8),
  R(`خبز البطاطا الحلوة ${T}`, 'Sweet potato bread Seychellois', 'Pain à la patate douce seychellois', 'Pan de batata dulce seychellense', 'Süßkartoffelbrot seychellisch', 'breads_flatbreads', 'lunch', 'outer_islands', 4, 30, 5),
  R(`خبز الكسافا ${T}`, 'Cassava bread Seychellois', 'Pain de manioc seychellois', 'Pan de yuca seychellense', 'Maniokbrot seychellisch', 'breads_flatbreads', 'lunch', 'pan_seychellois', 2, 32, 4),
  R(`خبز الفول بالبهارات ${T}`, 'Spiced bean bread Seychellois', 'Pain aux haricots épicé seychellois', 'Pan de habas con especias seychellense', 'Gewürztes Bohnenbrot seychellisch', 'breads_flatbreads', 'lunch', 'african_shared', 7, 28, 5),
  R(`كعك الموز المقلي ${T}`, 'Fried banana cake Seychellois', 'Gâteau banane frit seychellois', 'Bizcocho de plátano frito seychellense', 'Frittierter Bananenkuchen seychellisch', 'breads_flatbreads', 'lunch', 'pan_seychellois', 3, 34, 10),
  R(`خبز المانجو ${T}`, 'Mango bread Seychellois', 'Pain à la mangue seychellois', 'Pan de mango seychellense', 'Mangobrot seychellisch', 'breads_flatbreads', 'lunch', 'praslin', 3, 32, 6),
);
// --- rice_biryani (12) ------------------------------------------------------
dishes.push(
  R(`أرز البرياني الكيريولي ${T}`, 'Creole biryani Seychellois', 'Biryani créole seychellois', 'Biryani criollo seychellense', 'Kreolisches Biryani seychellisch', 'rice_biryani', 'lunch', 'pan_seychellois', 8, 36, 7),
  R(`أرز الدجاج بالكاري ${T}`, 'Chicken curry rice Seychellois', 'Riz au curry de poulet seychellois', 'Arroz con curry de pollo seychellense', 'Hähnchen-Curry-Reis seychellisch', 'rice_biryani', 'lunch', 'pan_seychellois', 14, 26, 7),
  R(`أرز جوز الهند المفلفل ${T}`, 'Spiced coconut rice Seychellois', 'Riz aux épices et noix de coco seychellois', 'Arroz con especias y coco seychellense', 'Gewürz-Kokos-Reis seychellisch', 'rice_biryani', 'lunch', 'pan_seychellois', 4, 30, 5),
  R(`أرز السمك بالزنجبيل ${T}`, 'Fish rice with ginger Seychellois', 'Riz au poisson au gingembre seychellois', 'Arroz con pescado y jengibre seychellense', 'Fischreis mit Ingwer seychellisch', 'rice_biryani', 'lunch', 'pan_seychellois', 16, 24, 5),
  R(`أرز الروبيان ${T}`, 'Prawn rice Seychellois', 'Riz aux crevettes seychellois', 'Arroz con camarones seychellense', 'Garnelenreis seychellisch', 'rice_biryani', 'lunch', 'pan_seychellois', 17, 24, 6),
  R(`أرز الكاري بالزعفران ${T}`, 'Saffron curry rice Seychellois', 'Riz au curry au safran seychellois', 'Arroz al curry con azafrán seychellense', 'Safran-Curry-Reis seychellisch', 'rice_biryani', 'lunch', 'pan_seychellois', 6, 32, 5),
  R(`أرز بالخضار والتمر ${T}`, 'Vegetable rice with dates Seychellois', 'Riz aux légumes et dattes seychellois', 'Arroz con verduras y dátiles seychellense', 'Gemüse-Dattel-Reis seychellisch', 'rice_biryani', 'lunch', 'mahe', 5, 32, 4),
  R(`أرز الأخطبوط ${T}`, 'Octopus rice Seychellois', 'Riz au poulpe seychellois', 'Arroz con pulpo seychellense', 'Oktopusreis seychellisch', 'rice_biryani', 'lunch', 'pan_seychellois', 18, 24, 6),
  R(`أرز جوز الهند الحلو ${T}`, 'Sweet coconut rice Seychellois', 'Riz sucré à la noix de coco seychellois', 'Arroz dulce de coco seychellense', 'Süßer Kokosreis seychellisch', 'rice_biryani', 'lunch', 'pan_seychellois', 4, 32, 5),
  R(`أرز مخلوط كيريولي ${T}`, 'Creole mixed rice Seychellois', 'Riz mixte créole seychellois', 'Arroz mixto criollo seychellense', 'Kreolischer Mischreis seychellisch', 'rice_biryani', 'lunch', 'pan_seychellois', 6, 30, 5),
  R(`أرز الحبوب الكاملة ${T}`, 'Whole grain rice Seychellois', 'Riz complet seychellois', 'Arroz integral seychellense', 'Vollkornreis seychellisch', 'rice_biryani', 'lunch', 'pan_seychellois', 6, 28, 3),
  R(`أرز الدجاج بجوز الهند ${T}`, 'Chicken rice with coconut Seychellois', 'Riz au poulet à la noix de coco seychellois', 'Arroz con pollo y coco seychellense', 'Hähnchenreis mit Kokos seychellisch', 'rice_biryani', 'lunch', 'pan_seychellois', 14, 24, 8),
);
// --- dals_legumes (14) ------------------------------------------------------
dishes.push(
  R(`عدس كيريولي ${T}`, 'Creole lentils Seychellois', 'Lentilles créoles seychelloises', 'Lentejas criollas seychellense', 'Kreolische Linsen seychellisch', 'dals_legumes', 'lunch', 'pan_seychellois', 8, 20, 4),
  R(`عدس أحمر ${T}`, 'Red lentils Seychellois', 'Lentilles rouges seychelloises', 'Lentejas rojas seychellense', 'Rote Linsen seychellisch', 'dals_legumes', 'lunch', 'pan_seychellois', 8, 20, 3),
  R(`دال العدس بالتمر ${T}`, 'Lentil dal with dates Seychellois', 'Dal de lentilles aux dattes seychellois', 'Dal de lentejas con dátiles seychellense', 'Linsen-Dal mit Datteln seychellisch', 'dals_legumes', 'lunch', 'pan_seychellois', 8, 22, 4),
  R(`حمص بالسبانخ ${T}`, 'Chickpea spinach stew Seychellois', 'Ragoût de pois chiches aux épinards seychellois', 'Guiso de garbanzos y espinacas seychellense', 'Kichererbsen-Spinat-Eintopf seychellisch', 'dals_legumes', 'lunch', 'pan_seychellois', 8, 20, 5),
  R(`فول سوداني مطبوخ ${T}`, 'Boiled peanuts Seychellois', 'Arachides cuites seychelloises', 'Maníes cocidos seychellense', 'Gekochte Erdnüsse seychellisch', 'dals_legumes', 'lunch', 'african_shared', 8, 12, 9),
  R(`فول الكسافا ${T}`, 'Cassava beans Seychellois', 'Haricots de manioc seychellois', 'Frijoles de yuca seychellense', 'Maniokbohnen seychellisch', 'dals_legumes', 'lunch', 'pan_seychellois', 5, 20, 3),
  R(`لوبيا كيريولي ${T}`, 'Creole cowpeas Seychellois', 'Niébé créole seychellois', 'Caupí criollo seychellense', 'Kreolische Augenbohnen seychellisch', 'dals_legumes', 'lunch', 'pan_seychellois', 7, 20, 3),
  R(`حمص بالطماطم ${T}`, 'Chickpea tomato stew Seychellois', 'Ragoût de pois chiches à la tomate seychellois', 'Guiso de garbanzos con tomate seychellense', 'Kichererbsen-Tomaten-Eintopf seychellisch', 'dals_legumes', 'lunch', 'pan_seychellois', 7, 22, 4),
  R(`فول بالبهارات ${T}`, 'Spiced beans Seychellois', 'Haricots aux épices seychellois', 'Frijoles con especias seychellense', 'Gewürzbohnen seychellisch', 'dals_legumes', 'lunch', 'mahe', 7, 20, 2),
  R(`عدس بالبامية ${T}`, 'Lentils with okra Seychellois', 'Lentilles au gombo seychelloises', 'Lentejas con okra seychellense', 'Linsen mit Okra seychellisch', 'dals_legumes', 'lunch', 'pan_seychellois', 8, 20, 5),
  R(`حمص مقلي ${T}`, 'Fried chickpeas Seychellois', 'Pois chiches frits seychellois', 'Garbanzos fritos seychellense', 'Frittierte Kichererbsen seychellisch', 'dals_legumes', 'lunch', 'pan_seychellois', 8, 22, 8),
  R(`فول مدمس بالأرز ${T}`, 'Mashed beans with rice Seychellois', 'Haricots écrasés au riz seychellois', 'Frijoles majadas con arroz seychellense', 'Stampfbohnen mit Reis seychellisch', 'dals_legumes', 'lunch', 'pan_seychellois', 7, 26, 4),
  R(`فول الصويا ${T}`, 'Soya beans Seychellois', 'Haricots de soja seychellois', 'Frijoles de soja seychellense', 'Sojabohnen seychellisch', 'dals_legumes', 'lunch', 'pan_seychellois', 12, 12, 6),
  R(`عدس أصفر ${T}`, 'Yellow lentils Seychellois', 'Lentilles jaunes seychelloises', 'Lentejas amarillas seychellense', 'Gelbe Linsen seychellisch', 'dals_legumes', 'lunch', 'pan_seychellois', 8, 20, 3),
);
// --- vegetarian_mains (18) --------------------------------------------------
dishes.push(
  R(`لادوب الخضار ${T}`, 'Vegetable ladob Seychellois', 'Ladob de légumes seychellois', 'Ladob de verduras seychellense', 'Gemüse-Ladob seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 4, 24, 8),
  R(`كاري الخضار الجوزي ${T}`, 'Coconut vegetable curry Seychellois', 'Curry de légumes au lait de coco seychellois', 'Curry de verduras con coco seychellense', 'Kokos-Gemüse-Curry seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 5, 18, 10),
  R(`يخنة اليقطين ${T}`, 'Pumpkin stew Seychellois', 'Ragoût de courge seychellois', 'Guiso de calabaza seychellense', 'Kürbis-Eintopf seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 3, 20, 6),
  R(`يخنة البامية ${T}`, 'Okra stew Seychellois', 'Ragoût de gombo seychellois', 'Guiso de okra seychellense', 'Okra-Eintopf seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 3, 14, 7),
  R(`يخنة الباذنجان ${T}`, 'Aubergine stew Seychellois', 'Ragoût d aubergines seychellois', 'Guiso de berenjena seychellense', 'Auberginen-Eintopf seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 3, 16, 8),
  R(`خضار مشوية بالأعشاب ${T}`, 'Grilled vegetables with herbs Seychellois', 'Légumes grillés aux herbes seychellois', 'Verduras asadas con hierbas seychellense', 'Gegrilltes Gemüse mit Kräutern seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 3, 12, 5),
  R(`كسافا محمصة ${T}`, 'Roasted cassava Seychellois', 'Manioc rôti seychellois', 'Yuca asada seychellense', 'Gerösteter Maniok seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 3, 26, 4),
  R(`تارو بالصلصة ${T}`, 'Taro with sauce Seychellois', 'Taro en sauce seychellois', 'Taro en salsa seychellense', 'Taro mit Sauce seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 3, 26, 6),
  R(`بطاطا حلوة بالبهارات ${T}`, 'Sweet potato with spices Seychellois', 'Patate douce aux épices seychelloise', 'Batata dulce con especias seychellense', 'Süßkartoffel mit Gewürzen seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 2, 24, 4),
  R(`سبانخ بجوز الهند ${T}`, 'Spinach with coconut Seychellois', 'Épinards à la noix de coco seychellois', 'Espinacas con coco seychellense', 'Spinat mit Kokos seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 4, 8, 8),
  R(`بازلاء بجوز الهند ${T}`, 'Peas with coconut Seychellois', 'Petits pois à la noix de coco seychellois', 'Guisantes con coco seychellense', 'Erbsen mit Kokos seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 5, 14, 6),
  R(`قرع بالسمسم ${T}`, 'Pumpkin with sesame Seychellois', 'Courge au sésame seychelloise', 'Calabaza con sésamo seychellense', 'Kürbis mit Sesam seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 4, 14, 8),
  R(`مخلل الخضار ${T}`, 'Pickled vegetables Seychellois', 'Légumes marinés seychellois', 'Verduras encurtidas seychellense', 'Eingelegtes Gemüse seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 2, 10, 3),
  R(`طبخة الخضار ${T}`, 'Mixed vegetable stew Seychellois', 'Ragoût de légumes seychellois', 'Guiso de verduras seychellense', 'Gemüse-Eintopf seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 3, 16, 6),
  R(`موز في الكاري ${T}`, 'Plantain in curry Seychellois', 'Banane plantain au curry seychellois', 'Plátano en curry seychellense', 'Kochbanane im Curry seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 3, 28, 6),
  R(`كوسة محمصة ${T}`, 'Roasted courgette Seychellois', 'Courgette rôtie seychelloise', 'Calabacín asado seychellense', 'Geröstete Zucchini seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 2, 8, 6),
  R(`جزر محمص ${T}`, 'Roasted carrot Seychellois', 'Carotte rôtie seychelloise', 'Zanahoria asada seychellense', 'Geröstete Karotte seychellisch', 'vegetarian_mains', 'lunch', 'pan_seychellois', 2, 12, 6),
  R(`ذرة بالكاجو ${T}`, 'Corn with cashew Seychellois', 'Maïs aux noix de cajou seychellois', 'Maíz con anacardo seychellense', 'Mais mit Cashew seychellisch', 'vegetarian_mains', 'lunch', 'outer_islands', 4, 20, 8),
);
// --- poultry_mains (10) -----------------------------------------------------
dishes.push(
  R(`دجاج كيريولي ${T}`, 'Creole chicken Seychellois', 'Poulet créole seychellois', 'Pollo criollo seychellense', 'Kreolisches Hähnchen seychellisch', 'poultry_mains', 'lunch', 'pan_seychellois', 20, 8, 11),
  R(`دجاج مشوي بالأعشاب ${T}`, 'Grilled chicken with herbs Seychellois', 'Poulet grillé aux herbes seychellois', 'Pollo asado con hierbas seychellense', 'Gegrilltes Hähnchen mit Kräutern seychellisch', 'poultry_mains', 'lunch', 'pan_seychellois', 24, 4, 10),
  R(`كاري الدجاج بالبهارات ${T}`, 'Chicken curry with spices Seychellois', 'Curry de poulet aux épices seychellois', 'Curry de pollo con especias seychellense', 'Hähnchen-Curry mit Gewürzen seychellisch', 'poultry_mains', 'lunch', 'pan_seychellois', 17, 13, 12),
  R(`دجاج بالزنجبيل ${T}`, 'Chicken with ginger Seychellois', 'Poulet au gingembre seychellois', 'Pollo con jengibre seychellense', 'Ingwer-Hähnchen seychellisch', 'poultry_mains', 'lunch', 'pan_seychellois', 22, 6, 10),
  R(`دجاج بالثوم ${T}`, 'Garlic chicken Seychellois', 'Poulet à l ail seychellois', 'Pollo con ajo seychellense', 'Knoblauch-Hähnchen seychellisch', 'poultry_mains', 'lunch', 'pan_seychellois', 22, 6, 11),
  R(`أسياخ الدجاج المشوية ${T}`, 'Grilled chicken drumsticks Seychellois', 'Piloncs de poulet grillés seychellois', 'Muslos de pollo asados seychellense', 'Gegrillte Hähnchenkeulen seychellisch', 'poultry_mains', 'lunch', 'pan_seychellois', 23, 3, 12),
  R(`دجاج مبخر بالأعشاب ${T}`, 'Steamed chicken with herbs Seychellois', 'Poulet à la vapeur aux herbes seychellois', 'Pollo al vapor con hierbas seychellense', 'Gedämpftes Hähnchen mit Kräutern seychellisch', 'poultry_mains', 'lunch', 'pan_seychellois', 19, 6, 8),
  R(`دجاج بالليمون والزعتر ${T}`, 'Lemon thyme chicken Seychellois', 'Poulet au citron et thym seychellois', 'Pollo con limón y tomillo seychellense', 'Zitronen-Thymian-Hähnchen seychellisch', 'poultry_mains', 'lunch', 'mahe', 23, 4, 9),
  R(`دجاج بجوز الهند ${T}`, 'Coconut chicken Seychellois', 'Poulet à la noix de coco seychellois', 'Pollo con coco seychellense', 'Kokos-Hähnchen seychellisch', 'poultry_mains', 'lunch', 'pan_seychellois', 19, 8, 11),
  R(`أسياخ الدجاج بالبهارات ${T}`, 'Chicken skewers with spices Seychellois', 'Brochettes de poulet aux épices seychelloises', 'Pinchos de pollo con especias seychellense', 'Hähnchen-Spieße mit Gewürzen seychellisch', 'poultry_mains', 'lunch', 'pan_seychellois', 20, 8, 12),
);
// --- meat_mains (16) --------------------------------------------------------
dishes.push(
  R(`لحم بقري كيريولي ${T}`, 'Creole beef Seychellois', 'Bœuf créole seychellois', 'Res criollo seychellense', 'Kreolisches Rindfleisch seychellisch', 'meat_mains', 'lunch', 'pan_seychellois', 20, 8, 12),
  R(`لحم بقري مشوي بالبهارات ${T}`, 'Grilled beef with spices Seychellois', 'Bœuf grillé aux épices seychellois', 'Res asado con especias seychellense', 'Gegrilltes Rindfleisch mit Gewürzen seychellisch', 'meat_mains', 'lunch', 'pan_seychellois', 23, 3, 13),
  R(`كاري اللحم بالبهارات ${T}`, 'Beef curry with spices Seychellois', 'Curry de bœuf aux épices seychellois', 'Curry de res con especias seychellense', 'Rindfleisch-Curry mit Gewürzen seychellisch', 'meat_mains', 'lunch', 'pan_seychellois', 16, 13, 12),
  R(`لحم بقري بالفلفل ${T}`, 'Beef with peppers Seychellois', 'Bœuf aux poivrons seychellois', 'Res con pimientos seychellense', 'Rindfleisch mit Paprika seychellisch', 'meat_mains', 'lunch', 'mahe', 20, 8, 12),
  R(`لحم مفروم بالأعشاب ${T}`, 'Minced beef with herbs Seychellois', 'Viande hachée aux herbes seychelloise', 'Carne picada con hierbas seychellense', 'Hackfleisch mit Kräutern seychellisch', 'meat_mains', 'lunch', 'pan_seychellois', 19, 10, 12),
  R(`لحم بقري بالصلصة الحارة ${T}`, 'Beef in hot sauce Seychellois', 'Bœuf en sauce piquante seychellois', 'Res en salsa picante seychellense', 'Rindfleisch in scharfer Sauce seychellisch', 'meat_mains', 'lunch', 'pan_seychellois', 19, 8, 12),
  R(`كبد الدجاج المشوي ${T}`, 'Grilled chicken liver Seychellois', 'Foie de poulet grillé seychellois', 'Hígado de pollo asado seychellense', 'Gegrillte Hähnchenleber seychellisch', 'meat_mains', 'lunch', 'pan_seychellois', 18, 6, 12),
  R(`لحم بقري بالكاجو ${T}`, 'Beef with cashew Seychellois', 'Bœuf aux noix de cajou seychellois', 'Res con anacardo seychellense', 'Rindfleisch mit Cashew seychellisch', 'meat_mains', 'lunch', 'pan_seychellois', 18, 12, 13),
  R(`لحم بقري بالخضار ${T}`, 'Beef stew with vegetables Seychellois', 'Ragoût de bœuf aux légumes seychellois', 'Guiso de res con verduras seychellense', 'Rindfleisch-Eintopf mit Gemüse seychellisch', 'meat_mains', 'lunch', 'pan_seychellois', 18, 12, 11),
  R(`كبدة البقر المشوية ${T}`, 'Grilled beef liver Seychellois', 'Foie de bœuf grillé seychellois', 'Hígado de res asado seychellense', 'Gegrillte Rinderleber seychellisch', 'meat_mains', 'lunch', 'pan_seychellois', 20, 6, 10),
  R(`لحم بقري على الفحم ${T}`, 'Charcoal grilled beef Seychellois', 'Bœuf grillé à la braise seychellois', 'Res a la brasa seychellense', 'Rindfleisch am Holzkohlegrill seychellisch', 'meat_mains', 'lunch', 'outer_islands', 23, 3, 14),
  R(`شرائح اللحم المشوية ${T}`, 'Grilled beef slices Seychellois', 'Tranches de bœuf grillées seychelloises', 'Filetes de res asados seychellense', 'Gegrillte Rindfleischscheiben seychellisch', 'meat_mains', 'lunch', 'pan_seychellois', 22, 4, 13),
  R(`لحم البقر بالباذنجان ${T}`, 'Beef with aubergine Seychellois', 'Bœuf à l aubergine seychellois', 'Res con berenjena seychellense', 'Rindfleisch mit Aubergine seychellisch', 'meat_mains', 'lunch', 'pan_seychellois', 19, 10, 11),
  R(`لحم بقري بالبهارات المشكلة ${T}`, 'Beef with mixed spices Seychellois', 'Bœuf aux épices mélangées seychellois', 'Res con mezcla de especias seychellense', 'Rindfleisch mit Gewürzmischung seychellisch', 'meat_mains', 'lunch', 'pan_seychellois', 20, 9, 12),
  R(`كباب اللحم ${T}`, 'Beef kebab Seychellois', 'Kebab de bœuf seychellois', 'Kebab de res seychellense', 'Rindfleisch-Kebab seychellisch', 'meat_mains', 'lunch', 'pan_seychellois', 20, 10, 14),
  R(`لحم بقري المطبوخ البطيء ${T}`, 'Slow cooked beef Seychellois', 'Bœuf confit lentement seychellois', 'Res cocido lentamente seychellense', 'Langsam geschmortes Rindfleisch seychellisch', 'meat_mains', 'lunch', 'la_digue', 19, 10, 11),
);
// --- seafood_mains (28) -----------------------------------------------------
dishes.push(
  R(`سمك جوب المشوي ${T}`, 'Grilled jobfish Seychellois', 'Thon job grillé seychellois', 'Atún job asado seychellense', 'Gegrillter Jobfisch seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 23, 2, 6),
  R(`كاري الأخطبوط بالبهارات ${T}`, 'Octopus curry with spices Seychellois', 'Curry de poulpe aux épices seychellois', 'Curry de pulpo con especias seychellense', 'Oktopus-Curry mit Gewürzen seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 18, 14, 11),
  R(`أخطبوط مشوي ${T}`, 'Grilled octopus Seychellois', 'Poulpe grillé seychellois', 'Pulpo asado seychellense', 'Gegrillter Oktopus seychellisch', 'seafood_mains', 'lunch', 'la_digue', 20, 4, 8),
  R(`أخطبوط بالبهارات ${T}`, 'Octopus with spices Seychellois', 'Poulpe aux épices seychellois', 'Pulpo con especias seychellense', 'Oktopus mit Gewürzen seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 19, 8, 9),
  R(`سمك القرش المشوي بالثوم ${T}`, 'Garlic grilled shark Seychellois', 'Requin grillé à l ail seychellois', 'Tiburón asado con ajo seychellense', 'Gegrillter Haifisch mit Knoblauch seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 24, 2, 7),
  R(`سمك الببغاء المشوي ${T}`, 'Grilled parrotfish Seychellois', 'Poisson perroquet grillé seychellois', 'Pez loro asado seychellense', 'Gegrillter Papageienfisch seychellisch', 'seafood_mains', 'lunch', 'la_digue', 21, 2, 6),
  R(`سمك القرميد المشوي ${T}`, 'Grilled red mullet Seychellois', 'Rouget grillé seychellois', 'Mújol rojo asado seychellense', 'Gegrillte Meerbarbe seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 20, 2, 7),
  R(`سمك الملك المشوي ${T}`, 'Grilled kingfish Seychellois', 'Poisson roi grillé seychellois', 'Pez rey asado seychellense', 'Gegrillter Königsfisch seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 22, 2, 8),
  R(`شريحة التونة المشوية ${T}`, 'Grilled tuna steak Seychellois', 'Steak de thon grillé seychellois', 'Filete de atún asado seychellense', 'Gegrillter Thunfischsteak seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 24, 2, 7),
  R(`سمك البونيتو ${T}`, 'Bonito fish Seychellois', 'Bonite seychellois', 'Bonito seychellense', 'Bonito seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 22, 2, 8),
  R(`سمك الجير المشوي ${T}`, 'Grilled trevally Seychellois', 'Carangue grillée seychelloise', 'Jurel asado seychellense', 'Gegrillter Trevallies seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 21, 2, 7),
  R(`سمك القرموري المشوي ${T}`, 'Grilled catfish Seychellois', 'Poisson-chat grillé seychellois', 'Bagre asado seychellense', 'Gegrillter Wels seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 20, 2, 6),
  R(`سمك التونة بالبرتقال ${T}`, 'Tuna with orange Seychellois', 'Thon à l orange seychellois', 'Atún con naranja seychellense', 'Thunfisch mit Orange seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 22, 8, 7),
  R(`سمك بالليمون والبهارات ${T}`, 'Fish with lemon and spices Seychellois', 'Poisson au citron et aux épices seychellois', 'Pescado con limón y especias seychellense', 'Fisch mit Zitrone und Gewürzen seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 21, 4, 8),
  R(`سمك مشوي بالثوم والليمون ${T}`, 'Grilled fish with garlic and lemon Seychellois', 'Poisson grillé à l ail et au citron seychellois', 'Pescado asado con ajo y limón seychellense', 'Gegrillter Fisch mit Knoblauch und Zitrone seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 22, 3, 8),
  R(`سمك بالكركم ${T}`, 'Fish with turmeric Seychellois', 'Poisson au curcuma seychellois', 'Pescado con cúrcuma seychellense', 'Fisch mit Kurkuma seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 21, 4, 8),
  R(`سمك مشوي على البخار ${T}`, 'Grilled fish fillet Seychellois', 'Filet de poisson grillé seychellois', 'Filete de pescado asado seychellense', 'Gegrilltes Fischfilet seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 23, 2, 7),
  R(`روبيان مشوي ${T}`, 'Grilled prawns Seychellois', 'Crevettes grillées seychelloises', 'Camarones asados seychellense', 'Gegrillte Garnelen seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 21, 2, 8),
  R(`روبيان بالثوم ${T}`, 'Garlic prawns Seychellois', 'Crevettes à l ail seychelloises', 'Camarones con ajo seychellense', 'Knoblauch-Garnelen seychellisch', 'seafood_mains', 'lunch', 'praslin', 20, 4, 12),
  R(`أسياخ الروبيان ${T}`, 'Prawn skewers Seychellois', 'Brochettes de crevettes seychelloises', 'Pinchos de camarones seychellense', 'Garnelen-Spieße seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 21, 3, 9),
  R(`لوبستر مشوي ${T}`, 'Grilled lobster Seychellois', 'Homard grillé seychellois', 'Langosta asada seychellense', 'Gegrillter Hummer seychellisch', 'seafood_mains', 'lunch', 'outer_islands', 22, 2, 9),
  R(`سلطعون البحر ${T}`, 'Sea crab Seychellois', 'Crabe de mer seychellois', 'Cangrejo de mar seychellense', 'Meerkrabbe seychellisch', 'seafood_mains', 'lunch', 'la_digue', 19, 3, 8),
  R(`محار مشوي ${T}`, 'Grilled clams Seychellois', 'Palourdes grillées seychelloises', 'Almejas asadas seychellense', 'Gegrillte Muscheln seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 14, 6, 3),
  R(`كاليماري المشوي ${T}`, 'Grilled calamari Seychellois', 'Calamars grillés seychellois', 'Calamares asados seychellense', 'Gegrillter Kalamari seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 18, 4, 7),
  R(`قنفذ البحر ${T}`, 'Sea urchin Seychellois', 'Oursin seychellois', 'Erizo de mar seychellense', 'Seeigel seychellisch', 'seafood_mains', 'lunch', 'la_digue', 9, 4, 5),
  R(`سمك القرش بصلصة جوز الهند ${T}`, 'Shark in coconut sauce Seychellois', 'Requin en sauce de noix de coco seychellois', 'Tiburón en salsa de coco seychellense', 'Haifisch in Kokossauce seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 22, 6, 11),
  R(`تونة معلبة بالزيت ${T}`, 'Tuna in oil Seychellois', 'Thon à l huile seychellois', 'Atún en aceite seychellense', 'Thunfisch in Öl seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 24, 1, 9),
  R(`سمك كيريولي ${T}`, 'Creole fish Seychellois', 'Poisson créole seychellois', 'Pescado criollo seychellense', 'Kreolischer Fisch seychellisch', 'seafood_mains', 'lunch', 'pan_seychellois', 21, 6, 9),
);
// --- soups_salads (18) ------------------------------------------------------
dishes.push(
  R(`مرقة السمك بالخضار ${T}`, 'Bouillon with vegetables Seychellois', 'Bouillon de poisson aux légumes seychellois', 'Caldo de pescado con verduras seychellense', 'Fischbouillon mit Gemüse seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 8, 16, 6),
  R(`شوربة الروبيان ${T}`, 'Prawn soup Seychellois', 'Soupe de crevettes seychelloise', 'Sopa de camarones seychellense', 'Garnelensuppe seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 11, 7, 5),
  R(`شوربة المرقة بالكمون ${T}`, 'Fish broth with cumin Seychellois', 'Bouillon au cumin seychellois', 'Caldo de pescado con comino seychellense', 'Fischbouillon mit Kreuzkümmel seychellisch', 'soups_salads', 'lunch', 'mahe', 9, 12, 5),
  R(`حساء الكسافا بالتمر ${T}`, 'Cassava soup with dates Seychellois', 'Soupe de manioc aux dattes seychelloise', 'Sopa de yuca con dátiles seychellense', 'Manioksuppe mit Datteln seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 2, 20, 2),
  R(`شوربة السمك الحارة ${T}`, 'Spicy fish soup Seychellois', 'Soupe de poisson épicée seychelloise', 'Sopa de pescado picante seychellense', 'Scharfe Fischsuppe seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 10, 7, 5),
  R(`شوربة الخضار السميكة ${T}`, 'Thick vegetable soup Seychellois', 'Soupe de légumes épaisse seychelloise', 'Sopa de verduras espesa seychellense', 'Dicke Gemüsesuppe seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 3, 14, 4),
  R(`سلطة السمك ${T}`, 'Fish salad Seychellois', 'Salade de poisson seychelloise', 'Ensalada de pescado seychellense', 'Fischsalat seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 14, 8, 6),
  R(`سلطة التونة ${T}`, 'Tuna salad Seychellois', 'Salade de thon seychelloise', 'Ensalada de atún seychellense', 'Thunfischsalat seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 16, 6, 8),
  R(`سلطة الموز المقلي ${T}`, 'Fried plantain salad Seychellois', 'Salade de plantain frit seychelloise', 'Ensalada de plátano frito seychellense', 'Salat aus frittierter Kochbanane seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 2, 18, 2),
  R(`سلطة الفواكه الاستوائية ${T}`, 'Tropical fruit salad Seychellois', 'Salade de fruits tropicaux seychelloise', 'Ensalada de frutas tropicales seychellense', 'Tropischer Obstsalat seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 1, 16, 1),
  R(`سلطة أوراق الشجر ${T}`, 'Leaf salad Seychellois', 'Salade de feuilles seychelloise', 'Ensalada de hojas seychellense', 'Blattsalat seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 3, 9, 2),
  R(`سلطة الخيار بالليمون ${T}`, 'Cucumber salad with lemon Seychellois', 'Salade de concombre au citron seychelloise', 'Ensalada de pepino con limón seychellense', 'Gurkensalat mit Zitrone seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 1, 7, 1),
  R(`سلطة براعم منبتة ${T}`, 'Sprouted seed salad Seychellois', 'Salade de germes seychelloise', 'Ensalada de brotes seychellense', 'Sprossensalat seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 5, 14, 4),
  R(`سلطة الجزر بالبرتقال ${T}`, 'Carrot salad with orange Seychellois', 'Salade de carottes à l orange seychelloise', 'Ensalada de zanahoria con naranja seychellense', 'Karottensalat mit Orange seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 1, 12, 2),
  R(`سلطة الخس والطماطم ${T}`, 'Lettuce and tomato salad Seychellois', 'Salade de laitue et tomates seychelloise', 'Ensalada de lechuga y tomate seychellense', 'Salat aus Salat und Tomate seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 2, 8, 3),
  R(`سلطة الحمص بالليمون ${T}`, 'Chickpea salad with lemon Seychellois', 'Salade de pois chiches au citron seychelloise', 'Ensalada de garbanzos con limón seychellense', 'Kichererbsensalat mit Zitrone seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 6, 16, 4),
  R(`سلطة بذور الجوز ${T}`, 'Grated coconut salad Seychellois', 'Salade de noix de coco râpée seychelloise', 'Ensalada de coco rallado seychellense', 'Salat aus geriebener Kokos seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 2, 10, 8),
  R(`سلطة البطيخ بالفلفل ${T}`, 'Watermelon salad with chilli Seychellois', 'Salade de pastèque au piment seychelloise', 'Ensalada de sandía con chile seychellense', 'Wassermelonensalat mit Chili seychellisch', 'soups_salads', 'lunch', 'pan_seychellois', 1, 10, 1),
);
// --- street_snacks (20) -----------------------------------------------------
dishes.push(
  R(`سمك مملح مقرمش ${T}`, 'Crispy salted fish Seychellois', 'Poisson salé croustillant seychellois', 'Pescado salado crujiente seychellense', 'Knuspriger gesalzener Fisch seychellisch', 'street_snacks', 'snacks', 'pan_seychellois', 21, 4, 10),
  R(`سمك مقرمش بالبهارات ${T}`, 'Crispy fish with spices Seychellois', 'Poisson croustillant aux épices seychellois', 'Pescado crujiente con especias seychellense', 'Knuspriger Fisch mit Gewürzen seychellisch', 'street_snacks', 'snacks', 'mahe', 20, 8, 12),
  R(`كفتة السمك ${T}`, 'Fish fritters Seychellois', 'Beignets de poisson seychellois', 'Buñuelos de pescado seychellense', 'Fischklößchen seychellisch', 'street_snacks', 'snacks', 'pan_seychellois', 11, 14, 9),
  R(`لادوب مقرمش ${T}`, 'Crispy ladob Seychellois', 'Ladob croustillant seychellois', 'Ladob crujiente seychellense', 'Knuspriger Ladob seychellisch', 'street_snacks', 'snacks', 'pan_seychellois', 4, 26, 10),
  R(`بسكويت السمك ${T}`, 'Fish crackers Seychellois', 'Biscuits au poisson seychellois', 'Galletas de pescado seychellense', 'Fischcracker seychellisch', 'street_snacks', 'snacks', 'pan_seychellois', 8, 20, 6),
  R(`بطاطا مقلية بالبهارات ${T}`, 'Spiced french fries Seychellois', 'Frites aux épices seychelloises', 'Patatas fritas con especias seychellense', 'Gewürzkartoffeln seychellisch', 'street_snacks', 'snacks', 'african_shared', 3, 24, 9),
  R(`بطاطا حلوة مقلية ${T}`, 'Sweet potato fries Seychellois', 'Frites de patate douce seychelloises', 'Patatas de batata dulce seychellense', 'Süßkartoffel-Pommes seychellisch', 'street_snacks', 'snacks', 'african_shared', 2, 24, 8),
  R(`ذرة مشوية ${T}`, 'Roasted corn Seychellois', 'Maïs grillé seychellois', 'Maíz asado seychellense', 'Gerösteter Mais seychellisch', 'street_snacks', 'snacks', 'african_shared', 4, 20, 2),
  R(`فول سوداني محمص ${T}`, 'Roasted peanuts Seychellois', 'Arachides grillées seychelloises', 'Maníes asados seychellense', 'Geröstete Erdnüsse seychellisch', 'street_snacks', 'snacks', 'african_shared', 13, 18, 16),
  R(`كاجو محمص ${T}`, 'Roasted cashew Seychellois', 'Noix de cajou grillées seychelloises', 'Anacardos asados seychellense', 'Geröstete Cashew seychellisch', 'street_snacks', 'snacks', 'outer_islands', 6, 20, 14),
  R(`أسياخ اللحم المشوية ${T}`, 'Grilled meat skewers Seychellois', 'Brochettes de viande grillées seychelloises', 'Pinchos de carne asados seychellense', 'Gegrillte Fleischspieße seychellisch', 'street_snacks', 'snacks', 'pan_seychellois', 19, 8, 12),
  R(`كات كات مقرمش ${T}`, 'Crispy kat-kat Seychellois', 'Kat-kat croustillant seychellois', 'Kat-kat crujiente seychellense', 'Knuspriger Kat-kat seychellisch', 'street_snacks', 'snacks', 'pan_seychellois', 3, 38, 8),
  R(`جاتو بيماد مقرمش ${T}`, 'Crispy gato pima Seychellois', 'Gato pima croustillant seychellois', 'Gato pima crujiente seychellense', 'Knuspriger Gato-pima seychellisch', 'street_snacks', 'snacks', 'pan_seychellois', 4, 40, 9),
  R(`سندوتش السمك المشوي ${T}`, 'Grilled fish sandwich Seychellois', 'Sandwich au poisson grillé seychellois', 'Sándwich de pescado asado seychellense', 'Fisch-Sandwich gegrillt seychellisch', 'street_snacks', 'snacks', 'pan_seychellois', 12, 20, 8),
  R(`سمك مقرمش بالكسافا ${T}`, 'Crispy fish with cassava Seychellois', 'Poisson croustillant au manioc seychellois', 'Pescado crujiente con yuca seychellense', 'Knuspriger Fisch mit Maniok seychellisch', 'street_snacks', 'snacks', 'la_digue', 19, 10, 11),
  R(`موزة مقرمشة ${T}`, 'Crispy banana Seychellois', 'Banane croustillante seychelloise', 'Plátano crujiente seychellense', 'Knusprige Banane seychellisch', 'street_snacks', 'snacks', 'pan_seychellois', 1, 30, 10),
  R(`بسكويت جوز الهند ${T}`, 'Coconut biscuits Seychellois', 'Biscuits à la noix de coco seychellois', 'Galletas de coco seychellense', 'Kokosbiscuits seychellisch', 'street_snacks', 'snacks', 'pan_seychellois', 5, 30, 10),
  R(`كفتة الخضار ${T}`, 'Vegetable fritters Seychellois', 'Beignets de légumes seychellois', 'Buñuelos de verduras seychellense', 'Gemüsebeignets seychellisch', 'street_snacks', 'snacks', 'pan_seychellois', 5, 18, 9),
  R(`بسكويت مملح ${T}`, 'Salted crackers Seychellois', 'Biscuits salés seychellois', 'Galletas saladas seychellense', 'Salzcracker seychellisch', 'street_snacks', 'snacks', 'pan_seychellois', 7, 20, 5),
  R(`مقرمشات بذور السمسم ${T}`, 'Sesame crisps Seychellois', 'Crispés au sésame seychellois', 'Crisp de sésamo seychellense', 'Sesam-Crisps seychellisch', 'street_snacks', 'snacks', 'pan_seychellois', 7, 22, 14),
);
// --- condiments (8) ---------------------------------------------------------
dishes.push(
  R(`تتبيلة كيريولي ${T}`, 'Creole achards pickle Seychellois', 'Achards créole seychellois', 'Achards criollo seychellense', 'Kreolische Achards-Einlege seychellisch', 'condiments', 'snacks', 'pan_seychellois', 1, 12, 2),
  R(`صلصة الفلفل الحار بالثوم ${T}`, 'Chilli garlic sauce Seychellois', 'Sauce piment à l ail seychelloise', 'Salsa de chile con ajo seychellense', 'Chili-Knoblauch-Sauce seychellisch', 'condiments', 'snacks', 'pan_seychellois', 1, 8, 4),
  R(`صلصة جوز الهند الكريمية ${T}`, 'Creamy coconut sauce Seychellois', 'Sauce crémeuse à la noix de coco seychelloise', 'Salsa cremosa de coco seychellense', 'Cremige Kokossauce seychellisch', 'condiments', 'snacks', 'pan_seychellois', 2, 8, 16),
  R(`مخلل البصل بالليمون ${T}`, 'Lemon pickled onions Seychellois', 'Oignons marinés au citron seychellois', 'Cebollas encurtidas en limón seychellense', 'Eingelegte Zwiebeln in Zitrone seychellisch', 'condiments', 'snacks', 'pan_seychellois', 1, 8, 1),
  R(`صلصة الفول السميكة ${T}`, 'Thick bean sauce Seychellois', 'Sauce épaisse de haricots seychelloise', 'Salsa espesa de frijoles seychellense', 'Dicke Bohnensauce seychellisch', 'condiments', 'snacks', 'praslin', 6, 12, 6),
  R(`صلصة الثوم والكاجو ${T}`, 'Garlic cashew sauce Seychellois', 'Sauce ail cajou seychelloise', 'Salsa de ajo y anacardo seychellense', 'Knoblauch-Cashew-Sauce seychellisch', 'condiments', 'snacks', 'pan_seychellois', 3, 8, 12),
  R(`خلطة البهارات الكيريولية ${T}`, 'Creole spice blend Seychellois', 'Mélange d épices créole seychellois', 'Mezcla de especias criolla seychellense', 'Kreolische Gewürzmischung seychellisch', 'condiments', 'snacks', 'pan_seychellois', 3, 14, 4),
  R(`صلصة السمك ${T}`, 'Fish sauce Seychellois', 'Sauce de poisson seychelloise', 'Salsa de pescado seychellense', 'Fischsauce seychellisch', 'condiments', 'snacks', 'african_shared', 4, 6, 8),
);
// --- desserts_sweets (10) ---------------------------------------------------
dishes.push(
  R(`كعكة الموز بالسمن ${T}`, 'Banana cake with butter Seychellois', 'Gâteau à la banane au beurre seychellois', 'Bizcocho de plátano con mantequilla seychellense', 'Bananenkuchen mit Butter seychellisch', 'desserts_sweets', 'snacks', 'pan_seychellois', 4, 40, 10),
  R(`حلوى جوز الهند المبشور ${T}`, 'Shredded coconut sweet Seychellois', 'Confiserie à la noix de coco râpée seychelloise', 'Dulce de coco rallado seychellense', 'Süßigkeit aus geriebener Kokos seychellisch', 'desserts_sweets', 'snacks', 'pan_seychellois', 3, 26, 12),
  R(`كعكة الكسافا الحلوة ${T}`, 'Sweet cassava cake Seychellois', 'Gâteau de manioc sucré seychellois', 'Bizcocho de yuca dulce seychellense', 'Süßer Maniokkuchen seychellisch', 'desserts_sweets', 'snacks', 'african_shared', 3, 36, 10),
  R(`بودينغ خبز الشجرة ${T}`, 'Breadfruit pudding Seychellois', 'Pudding au fruit à pain seychellois', 'Pudin de fruta del pan seychellense', 'Brotfrucht-Pudding seychellisch', 'desserts_sweets', 'snacks', 'praslin', 2, 30, 8),
  R(`بوظة جوز الهند ${T}`, 'Coconut ice cream Seychellois', 'Glace à la noix de coco seychelloise', 'Helado de coco seychellense', 'Kokoseis seychellisch', 'desserts_sweets', 'snacks', 'pan_seychellois', 3, 22, 12),
  R(`كعكة المانجو ${T}`, 'Mango cake Seychellois', 'Gâteau à la mangue seychellois', 'Bizcocho de mango seychellense', 'Mangokuchen seychellisch', 'desserts_sweets', 'snacks', 'pan_seychellois', 2, 34, 8),
  R(`حلوى الموز بالسمسم ${T}`, 'Banana sesame sweet Seychellois', 'Confiserie banane sésame seychelloise', 'Dulce de plátano y sésamo seychellense', 'Bananen-Sesam-Süßigkeit seychellisch', 'desserts_sweets', 'snacks', 'pan_seychellois', 3, 32, 9),
  R(`حلوى التمر ${T}`, 'Date sweet Seychellois', 'Confiserie aux dattes seychelloise', 'Dulce de dátiles seychellense', 'Dattel-Süßigkeit seychellisch', 'desserts_sweets', 'snacks', 'praslin', 2, 36, 8),
  R(`حلوى الجزر المشوي ${T}`, 'Roasted carrot sweet Seychellois', 'Confiserie de carotte rôtie seychelloise', 'Dulce de zanahoria asada seychellense', 'Geröstete Karotten-Süßigkeit seychellisch', 'desserts_sweets', 'snacks', 'pan_seychellois', 2, 30, 8),
  R(`بوظة المانجو ${T}`, 'Mango ice cream Seychellois', 'Glace à la mangue seychelloise', 'Helado de mango seychellense', 'Mangoeis seychellisch', 'desserts_sweets', 'snacks', 'outer_islands', 2, 24, 11),
);
// --- beverages (16) ---------------------------------------------------------
dishes.push(
  R(`كاشواما جوز الهند ${T}`, 'Kachouma coconut drink Seychellois', 'Kachouma boisson de coco seychellois', 'Kachouma bebida de coco seychellense', 'Kachouma Kokosgetränk seychellisch', 'beverages', 'snacks', 'pan_seychellois', 1, 10, 0),
  R(`عصير القصب بالقرفة ${T}`, 'Cinnamon sugarcane juice Seychellois', 'Jus de canne à la cannelle seychellois', 'Jugo de caña con canela seychellense', 'Zuckerrohrsaft mit Zimt seychellisch', 'beverages', 'snacks', 'pan_seychellois', 1, 18, 0),
  R(`عصير المانجو ${T}`, 'Mango juice Seychellois', 'Jus de mangue seychellois', 'Jugo de mango seychellense', 'Mangosaft seychellisch', 'beverages', 'snacks', 'pan_seychellois', 1, 15, 0),
  R(`عصير الباشن فروت ${T}`, 'Passion fruit juice Seychellois', 'Jus de fruit de la passion seychellois', 'Jugo de maracuyá seychellense', 'Passionsfruchtsaft seychellisch', 'beverages', 'snacks', 'pan_seychellois', 1, 12, 0),
  R(`عصير البابايا ${T}`, 'Papaya juice Seychellois', 'Jus de papaye seychellois', 'Jugo de papaya seychellense', 'Papayasaft seychellisch', 'beverages', 'snacks', 'pan_seychellois', 1, 13, 0),
  R(`عصير الجوافة ${T}`, 'Guava juice Seychellois', 'Jus de goyave seychellois', 'Jugo de guayaba seychellense', 'Guavensaft seychellisch', 'beverages', 'snacks', 'pan_seychellois', 1, 14, 0),
  R(`عصير الأناناس ${T}`, 'Pineapple juice Seychellois', 'Jus d ananas seychellois', 'Jugo de piña seychellense', 'Ananassaft seychellisch', 'beverages', 'snacks', 'pan_seychellois', 1, 13, 0),
  R(`عصير البرتقال ${T}`, 'Orange juice Seychellois', 'Jus d orange seychellois', 'Jugo de naranja seychellense', 'Orangensaft seychellisch', 'beverages', 'snacks', 'pan_seychellois', 1, 12, 0),
  R(`عصير الليمون بالنعناع ${T}`, 'Lemon juice with mint Seychellois', 'Jus de citron à la menthe seychellois', 'Jugo de limón con menta seychellense', 'Zitronensaft mit Minze seychellisch', 'beverages', 'snacks', 'pan_seychellois', 1, 10, 0),
  R(`شراب الزنجبيل والليمون ${T}`, 'Ginger and lemon drink Seychellois', 'Boisson gingembre citron seychelloise', 'Bebida de jengibre y limón seychellense', 'Ingwer-Zitronen-Getränk seychellisch', 'beverages', 'snacks', 'pan_seychellois', 1, 12, 0),
  R(`شاي أسود ${T}`, 'Black tea Seychellois', 'Thé noir seychellois', 'Té negro seychellense', 'Schwarzer Tee seychellisch', 'beverages', 'snacks', 'pan_seychellois', 1, 5, 0),
  R(`قهوة بالحليب ${T}`, 'Coffee with milk Seychellois', 'Café au lait seychellois', 'Café con leche seychellense', 'Kaffee mit Milch seychellisch', 'beverages', 'snacks', 'pan_seychellois', 2, 8, 2),
  R(`حليب جوز الهند المشروب ${T}`, 'Coconut milk drink Seychellois', 'Boisson au lait de coco seychelloise', 'Bebida de leche de coco seychellense', 'Kokosmilch-Getränk seychellisch', 'beverages', 'snacks', 'pan_seychellois', 2, 6, 20),
  R(`عصير الكركديه ${T}`, 'Hibiscus drink Seychellois', 'Boisson à l hibiscus seychelloise', 'Bebida de hibisco seychellense', 'Hibiskusgetränk seychellisch', 'beverages', 'snacks', 'african_shared', 1, 12, 0),
  R(`ماء جوز الهند المرطب ${T}`, 'Coconut cooling water Seychellois', 'Eau de coco rafraîchissante seychelloise', 'Agua de coco refrescante seychellense', 'Erfrischendes Kokoswasser seychellisch', 'beverages', 'snacks', 'pan_seychellois', 1, 10, 0),
  R(`عصير الموز بالأناناس ${T}`, 'Banana pineapple juice Seychellois', 'Jus banane ananas seychellois', 'Jugo de plátano y piña seychellense', 'Bananen-Ananassaft seychellisch', 'beverages', 'snacks', 'pan_seychellois', 1, 20, 0),
);

// ============================================================ BUILD OUTPUT
const byCategory = {};
const byRegion = {};
const byMeal = {};
for (const d of dishes) {
  byCategory[d.category] = (byCategory[d.category] || 0) + 1;
  byRegion[d.region] = (byRegion[d.region] || 0) + 1;
  byMeal[d.mealType] = (byMeal[d.mealType] || 0) + 1;
}

// Validation
const dups = [];
const seen = new Set();
const badTok = [];
const badRange = [];
for (const d of dishes) {
  if (seen.has(d.name_ar)) dups.push(d.name_ar);
  seen.add(d.name_ar);
  if (d.cal_100 < 20 || d.cal_100 > 900) badRange.push(`${d.name_ar}(${d.cal_100})`);
  if (!d.name_ar.includes('سيشيلي')) badTok.push(d.name_ar);
}

if (dishes.length !== 200) {
  console.error(`\nEXPECTED 200 dishes, got ${dishes.length}. Fix before writing.`);
  process.exit(1);
}
if (dups.length || badTok.length || badRange.length) {
  console.error('\nVALIDATION FAILED:');
  if (dups.length) console.error(`Duplicate names: ${dups.join(', ')}`);
  if (badTok.length) console.error(`Missing token: ${badTok.join(', ')}`);
  if (badRange.length) console.error(`Bad cal range: ${badRange.join(', ')}`);
  process.exit(1);
}

fs.writeFileSync(
  path.join(__dirname, 'seychelles-200-proposal.json'),
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
console.log(`\nWrote scripts/seychelles-200-proposal.json (${dishes.length} dishes)`);
console.log(`Categories (${Object.keys(byCategory).length}): ${Object.keys(byCategory).join(', ')}`);
console.log(`Regions (${Object.keys(byRegion).length}): ${Object.keys(byRegion).join(', ')}`);
console.log(`Meal types: ${Object.keys(byMeal).join(', ')}`);
console.log(`Region distribution: ${JSON.stringify(byRegion)}`);
console.log(`Category distribution: ${JSON.stringify(byCategory)}`);
