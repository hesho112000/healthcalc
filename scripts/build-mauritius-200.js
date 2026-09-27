// Authoring script for the Mauritian 200-dish proposal (scripts/mauritius-200-proposal.json).
// 200 NEW dishes (the 100 base rows live in src/data/mauritian-full.ts). Mirrors the
// Seychelles authoring pattern: R() helper + per-category macro templates.
// Regions: pan_mauritian by default (golden rule), regional anchors (port_louis, curepipe,
// quatre_bornes, vacoas, mahebourg, flacq), african_shared for dishes
// shared across the wider African/Indian Ocean table. All Arabic names carry the موريشوسي أصيل
// token (strict halal profile: no pork, no alcohol). Emphasizes: Dholl Puri, Gateau Piment,
// Rougaille, Briani, Mine Frire, Achards, chutney, seafood curries, tropical fruits.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, protein, carbs, fat) => {
  const cal_100 = Math.round(4 * protein + 4 * carbs + 9 * fat);
  return { name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat };
};

const dishes = [];
const T = 'موريشوسي أصيل';

// ============================================================ PAN_MAURITIAN + REGIONAL (200)
// --- breakfast_items (14) ----------------------------------------------------
dishes.push(
  R(`شاي بالحليب ${T}`, 'Milk tea Mauritian', 'Thé au lait mauricien', 'Té con leche mauriciano', 'Milchtee mauritisch', 'breakfast_items', 'breakfast', 'pan_mauritian', 2, 10, 2),
  R(`عصير مانجو بالزنجبيل ${T}`, 'Ginger mango juice Mauritian', 'Jus de mangue au gingembre mauricien', 'Jugo de mango con jengibre mauriciano', 'Mango-Ingwer-Saft mauritisch', 'breakfast_items', 'breakfast', 'pan_mauritian', 1, 18, 0),
  R(`دهورل بوري بالخضار ${T}`, 'Dholl puri with vegetables Mauritian', 'Dholl puri aux légumes mauricien', 'Dholl puri con verduras mauriciano', 'Dholl Puri mit Gemüse mauritisch', 'breakfast_items', 'breakfast', 'port_louis', 8, 32, 5),
  R(`جاتو بيمان بالجبن ${T}`, 'Gateau piment with cheese Mauritian', 'Gateau piment au fromage mauricien', 'Gateau piment con queso mauriciano', 'Gateau Piment mit Käse mauritisch', 'breakfast_items', 'breakfast', 'pan_mauritian', 9, 28, 10),
  R(`فارتا بالبيض ${T}`, 'Farata with egg Mauritian', 'Farata à l œuf mauricien', 'Farata con huevo mauriciano', 'Farata mit Ei mauritisch', 'breakfast_items', 'breakfast', 'pan_mauritian', 8, 32, 8),
  R(`بيض مسلوق ${T}`, 'Boiled eggs Mauritian', 'Œufs durs mauricien', 'Huevos cocidos mauricianos', 'Gekochte Eier mauritisch', 'breakfast_items', 'breakfast', 'pan_mauritian', 12, 2, 9),
  R(`فول مدمس بزيت الزيتون ${T}`, 'Mashed beans with olive oil Mauritian', 'Haricots écrasés à l huile d olive mauricien', 'Frijoles majados con aceite de oliva mauriciano', 'Stampfbohnen mit Olivenöl mauritisch', 'breakfast_items', 'breakfast', 'pan_mauritian', 7, 22, 5),
  R(`شوفان بالموز ${T}`, 'Banana oatmeal Mauritian', 'Flocons d avoine à la banane mauricien', 'Avena con plátano mauriciano', 'Bananen-Haferflocken mauritisch', 'breakfast_items', 'breakfast', 'pan_mauritian', 5, 26, 4),
  R(`دقيق الذرة بالتمر ${T}`, 'Cornmeal with dates Mauritian', 'Semoule de maïs aux dattes mauricienne', 'Harina de maíz con dátiles mauriciano', 'Maisgrieß mit Datteln mauritisch', 'breakfast_items', 'breakfast', 'pan_mauritian', 4, 28, 2),
  R(`حليب جوز الهند ${T}`, 'Coconut milk Mauritian', 'Lait de coco mauricien', 'Leche de coco mauriciana', 'Kokosmilch mauritisch', 'breakfast_items', 'breakfast', 'pan_mauritian', 2, 6, 20),
  R(`خبز الزنجبيل ${T}`, 'Ginger bread Mauritian', 'Pain au gingembre mauricien', 'Pan de jengibre mauriciano', 'Ingwerbrot mauritisch', 'breakfast_items', 'breakfast', 'pan_mauritian', 4, 32, 8),
  R(`موز بالعسل ${T}`, 'Banana with honey Mauritian', 'Banane au miel mauricienne', 'Plátano con miel mauriciano', 'Banane mit Honig mauritisch', 'breakfast_items', 'breakfast', 'curepipe', 1, 26, 1),
  R(`ساموسا خضار ${T}`, 'Vegetable samosa Mauritian', 'Samossa légumes mauricien', 'Samosa verduras mauriciano', 'Gemüse-Samosa mauritisch', 'breakfast_items', 'breakfast', 'port_louis', 5, 28, 10),
  R(`كرواسون ${T}`, 'Croissant Mauritian', 'Croissant mauricien', 'Croissant mauriciano', 'Croissant mauritisch', 'breakfast_items', 'breakfast', 'pan_mauritian', 6, 32, 14),
);
// --- breads_flatbreads (16) --------------------------------------------------
dishes.push(
  R(`خبز جوز الهند الطازج ${T}`, 'Fresh coconut bread Mauritian', 'Pain à la noix de coco fraîche mauricien', 'Pan de coco fresco mauriciano', 'Frisches Kokosbrot mauritisch', 'breads_flatbreads', 'lunch', 'pan_mauritian', 6, 32, 10),
  R(`خبز الموز بالتمر ${T}`, 'Banana bread with dates Mauritian', 'Pain à la banane aux dattes mauricien', 'Pan de plátano con dátiles mauriciano', 'Bananenbrot mit Datteln mauritisch', 'breads_flatbreads', 'lunch', 'pan_mauritian', 4, 36, 7),
  R(`رقائق خبز الشجرة ${T}`, 'Breadfruit chips Mauritian', 'Chips de fruit à pain mauricien', 'Chips de fruta del pan mauriciano', 'Brotfrucht-Chips mauritisch', 'breads_flatbreads', 'lunch', 'pan_mauritian', 2, 32, 8),
  R(`خبز الجوز المجروش ${T}`, 'Bread with desiccated coconut Mauritian', 'Pain au coco râpé mauricien', 'Pan con coco rallado mauriciano', 'Brot mit geraspelter Kokos mauritisch', 'breads_flatbreads', 'lunch', 'pan_mauritian', 6, 34, 11),
  R(`كعك الموز بالبخار ${T}`, 'Steamed banana cake Mauritian', 'Gâteau à la vapeur à la banane mauricien', 'Bizcocho al vapor de plátano mauriciano', 'Dampf-Bananenkuchen mauritisch', 'breads_flatbreads', 'lunch', 'pan_mauritian', 4, 34, 5),
  R(`خبز الذرة الحلو ${T}`, 'Sweet corn bread Mauritian', 'Pain de maïs doux mauricien', 'Pan de maíz dulce mauriciano', 'Süßmaisbrot mauritisch', 'breads_flatbreads', 'lunch', 'pan_mauritian', 4, 30, 5),
  R(`رول الموز بالتمر ${T}`, 'Banana date rolls Mauritian', 'Rouleaux banane dattes mauricien', 'Rollos de plátano y dátiles mauriciano', 'Bananen-Dattel-Rollen mauritisch', 'breads_flatbreads', 'lunch', 'pan_mauritian', 4, 34, 6),
  R(`كعك الأرز الحلو ${T}`, 'Sweet rice cake Mauritian', 'Gâteau de riz sucré mauricien', 'Bizcocho de arroz dulce mauriciano', 'Süßer Reiskuchen mauritisch', 'breads_flatbreads', 'lunch', 'pan_mauritian', 4, 32, 6),
  R(`خبز الفول المدمس ${T}`, 'Bean bread Mauritian', 'Pain aux haricots écrasés mauricien', 'Pan de frijoles majadas mauriciano', 'Bohnenbrot mauritisch', 'breads_flatbreads', 'lunch', 'pan_mauritian', 7, 30, 5),
  R(`خبز الموز الأخضر ${T}`, 'Green banana bread Mauritian', 'Pain banane verte mauricien', 'Pan de plátano verde mauriciano', 'Grünes Bananenbrot mauritisch', 'breads_flatbreads', 'lunch', 'pan_mauritian', 4, 34, 6),
  R(`توست جوز الهند ${T}`, 'Coconut toast Mauritian', 'Pain grillé à la noix de coco mauricien', 'Tostada de coco mauriciana', 'Kokos-Toast mauritisch', 'breads_flatbreads', 'lunch', 'pan_mauritian', 5, 28, 8),
  R(`خبز البطاطا الحلوة ${T}`, 'Sweet potato bread Mauritian', 'Pain à la patate douce mauricien', 'Pan de batata dulce mauriciano', 'Süßkartoffelbrot mauritisch', 'breads_flatbreads', 'lunch', 'quatre_bornes', 4, 30, 5),
  R(`خبز الكسافا ${T}`, 'Cassava bread Mauritian', 'Pain de manioc mauricien', 'Pan de yuca mauriciano', 'Maniokbrot mauritisch', 'breads_flatbreads', 'lunch', 'pan_mauritian', 2, 32, 4),
  R(`خبز الفول بالبهارات ${T}`, 'Spiced bean bread Mauritian', 'Pain aux haricots épicé mauricien', 'Pan de habas con especias mauriciano', 'Gewürztes Bohnenbrot mauritisch', 'breads_flatbreads', 'lunch', 'african_shared', 7, 28, 5),
  R(`كعك الموز المقلي ${T}`, 'Fried banana cake Mauritian', 'Gâteau banane frit mauricien', 'Bizcocho de plátano frito mauriciano', 'Frittierter Bananenkuchen mauritisch', 'breads_flatbreads', 'lunch', 'pan_mauritian', 3, 34, 10),
  R(`خبز المانجو ${T}`, 'Mango bread Mauritian', 'Pain à la mangue mauricien', 'Pan de mango mauriciano', 'Mangobrot mauritisch', 'breads_flatbreads', 'lunch', 'curepipe', 3, 32, 6),
);
// --- rice_biryani (12) ------------------------------------------------------
dishes.push(
  R(`أرز البرياني كريولي ${T}`, 'Creole biryani Mauritian', 'Biryani créole mauricien', 'Biryani criollo mauriciano', 'Kreolisches Biryani mauritisch', 'rice_biryani', 'lunch', 'pan_mauritian', 8, 36, 7),
  R(`أرز الدجاج بالكاري ${T}`, 'Chicken curry rice Mauritian', 'Riz au curry de poulet mauricien', 'Arroz con curry de pollo mauriciano', 'Hähnchen-Curry-Reis mauritisch', 'rice_biryani', 'lunch', 'pan_mauritian', 14, 26, 7),
  R(`أرز جوز الهند المفلفل ${T}`, 'Spiced coconut rice Mauritian', 'Riz aux épices et noix de coco mauricien', 'Arroz con especias y coco mauriciano', 'Gewürz-Kokos-Reis mauritisch', 'rice_biryani', 'lunch', 'pan_mauritian', 4, 30, 5),
  R(`أرز السمك بالزنجبيل ${T}`, 'Fish rice with ginger Mauritian', 'Riz au poisson au gingembre mauricien', 'Arroz con pescado y jengibre mauriciano', 'Fischreis mit Ingwer mauritisch', 'rice_biryani', 'lunch', 'pan_mauritian', 16, 24, 5),
  R(`أرز الروبيان ${T}`, 'Prawn rice Mauritian', 'Riz aux crevettes mauricien', 'Arroz con camarones mauriciano', 'Garnelenreis mauritisch', 'rice_biryani', 'lunch', 'pan_mauritian', 17, 24, 6),
  R(`أرز الكاري بالزعفران ${T}`, 'Saffron curry rice Mauritian', 'Riz au curry au safran mauricien', 'Arroz al curry con azafrán mauriciano', 'Safran-Curry-Reis mauritisch', 'rice_biryani', 'lunch', 'pan_mauritian', 6, 32, 5),
  R(`أرز بالخضار والتمر ${T}`, 'Vegetable rice with dates Mauritian', 'Riz aux légumes et dattes mauricien', 'Arroz con verduras y dátiles mauriciano', 'Gemüse-Dattel-Reis mauritisch', 'rice_biryani', 'lunch', 'port_louis', 5, 32, 4),
  R(`أرز الأخطبوط ${T}`, 'Octopus rice Mauritian', 'Riz au poulpe mauricien', 'Arroz con pulpo mauriciano', 'Oktopusreis mauritisch', 'rice_biryani', 'lunch', 'pan_mauritian', 18, 24, 6),
  R(`أرز جوز الهند الحلو ${T}`, 'Sweet coconut rice Mauritian', 'Riz sucré à la noix de coco mauricien', 'Arroz dulce de coco mauriciano', 'Süßer Kokosreis mauritisch', 'rice_biryani', 'lunch', 'pan_mauritian', 4, 32, 5),
  R(`أرز مخلوط كريولي ${T}`, 'Creole mixed rice Mauritian', 'Riz mixte créole mauricien', 'Arroz mixto criollo mauriciano', 'Kreolischer Mischreis mauritisch', 'rice_biryani', 'lunch', 'pan_mauritian', 6, 30, 5),
  R(`أرز الحبوب الكاملة ${T}`, 'Whole grain rice Mauritian', 'Riz complet mauricien', 'Arroz integral mauriciano', 'Vollkornreis mauritisch', 'rice_biryani', 'lunch', 'pan_mauritian', 6, 28, 3),
  R(`أرز الدجاج بجوز الهند ${T}`, 'Chicken rice with coconut Mauritian', 'Riz au poulet à la noix de coco mauricien', 'Arroz con pollo y coco mauriciano', 'Hähnchenreis mit Kokos mauritisch', 'rice_biryani', 'lunch', 'pan_mauritian', 14, 24, 8),
);
// --- dals_legumes (14) ------------------------------------------------------
dishes.push(
  R(`عدس كريولي ${T}`, 'Creole lentils Mauritian', 'Lentilles créoles mauriciennes', 'Lentejas criollas mauricianas', 'Kreolische Linsen mauritisch', 'dals_legumes', 'lunch', 'pan_mauritian', 8, 20, 4),
  R(`عدس أحمر ${T}`, 'Red lentils Mauritian', 'Lentilles rouges mauriciennes', 'Lentejas rojas mauricianas', 'Rote Linsen mauritisch', 'dals_legumes', 'lunch', 'pan_mauritian', 8, 20, 3),
  R(`دال العدس بالتمر ${T}`, 'Lentil dal with dates Mauritian', 'Dal de lentilles aux dattes mauricien', 'Dal de lentejas con dátiles mauriciano', 'Linsen-Dal mit Datteln mauritisch', 'dals_legumes', 'lunch', 'pan_mauritian', 8, 22, 4),
  R(`حمص بالسبانخ ${T}`, 'Chickpea spinach stew Mauritian', 'Ragoût de pois chiches aux épinards mauricien', 'Guiso de garbanzos y espinacas mauriciano', 'Kichererbsen-Spinat-Eintopf mauritisch', 'dals_legumes', 'lunch', 'pan_mauritian', 8, 20, 5),
  R(`فول سوداني مطبوخ ${T}`, 'Boiled peanuts Mauritian', 'Arachides cuites mauriciennes', 'Maníes cocidos mauricianos', 'Gekochte Erdnüsse mauritisch', 'dals_legumes', 'lunch', 'african_shared', 8, 12, 9),
  R(`فول الكسافا ${T}`, 'Cassava beans Mauritian', 'Haricots de manioc mauricien', 'Frijoles de yuca mauriciano', 'Maniokbohnen mauritisch', 'dals_legumes', 'lunch', 'pan_mauritian', 5, 20, 3),
  R(`لوبيا كريولي ${T}`, 'Creole cowpeas Mauritian', 'Niébé créole mauricien', 'Caupí criollo mauriciano', 'Kreolische Augenbohnen mauritisch', 'dals_legumes', 'lunch', 'pan_mauritian', 7, 20, 3),
  R(`حمص بالطماطم ${T}`, 'Chickpea tomato stew Mauritian', 'Ragoût de pois chiches à la tomate mauricien', 'Guiso de garbanzos con tomate mauriciano', 'Kichererbsen-Tomaten-Eintopf mauritisch', 'dals_legumes', 'lunch', 'pan_mauritian', 7, 22, 4),
  R(`فول بالبهارات ${T}`, 'Spiced beans Mauritian', 'Haricots aux épices mauricien', 'Frijoles con especias mauriciano', 'Gewürzbohnen mauritisch', 'dals_legumes', 'lunch', 'port_louis', 7, 20, 2),
  R(`عدس بالبامية ${T}`, 'Lentils with okra Mauritian', 'Lentilles au gombo mauriciennes', 'Lentejas con okra mauriciano', 'Linsen mit Okra mauritisch', 'dals_legumes', 'lunch', 'pan_mauritian', 8, 20, 5),
  R(`حمص مقلي ${T}`, 'Fried chickpeas Mauritian', 'Pois chiches frits mauricien', 'Garbanzos fritos mauricianos', 'Frittierte Kichererbsen mauritisch', 'dals_legumes', 'lunch', 'pan_mauritian', 8, 22, 8),
  R(`فول مدمس بالأرز ${T}`, 'Mashed beans with rice Mauritian', 'Haricots écrasés au riz mauricien', 'Frijoles majadas con arroz mauriciano', 'Stampfbohnen mit Reis mauritisch', 'dals_legumes', 'lunch', 'pan_mauritian', 7, 26, 4),
  R(`فول الصويا ${T}`, 'Soya beans Mauritian', 'Haricots de soja mauricien', 'Frijoles de soja mauriciano', 'Sojabohnen mauritisch', 'dals_legumes', 'lunch', 'pan_mauritian', 12, 12, 6),
  R(`عدس أصفر ${T}`, 'Yellow lentils Mauritian', 'Lentilles jaunes mauriciennes', 'Lentejas amarillas mauricianas', 'Gelbe Linsen mauritisch', 'dals_legumes', 'lunch', 'pan_mauritian', 8, 20, 3),
);
// --- vegetarian_mains (18) --------------------------------------------------
dishes.push(
  R(`روغاي الخضار ${T}`, 'Vegetable rougaille Mauritian', 'Rougaille légumes mauricienne', 'Rougaille verduras mauriciana', 'Gemüse-Rougaille mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 4, 18, 7),
  R(`كاري الخضار بجوز الهند ${T}`, 'Coconut vegetable curry Mauritian', 'Curry de légumes au lait de coco mauricien', 'Curry de verduras con coco mauriciano', 'Kokos-Gemüse-Curry mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 5, 18, 10),
  R(`يخنة اليقطين ${T}`, 'Pumpkin stew Mauritian', 'Ragoût de courge mauricien', 'Guiso de calabaza mauriciano', 'Kürbis-Eintopf mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 3, 20, 6),
  R(`يخنة البامية ${T}`, 'Okra stew Mauritian', 'Ragoût de gombo mauricien', 'Guiso de okra mauriciano', 'Okra-Eintopf mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 3, 14, 7),
  R(`يخنة الباذنجان ${T}`, 'Aubergine stew Mauritian', 'Ragoût d aubergines mauricien', 'Guiso de berenjena mauriciano', 'Auberginen-Eintopf mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 3, 16, 8),
  R(`خضار مشوية بالأعشاب ${T}`, 'Grilled vegetables with herbs Mauritian', 'Légumes grillés aux herbes mauricien', 'Verduras asadas con hierbas mauriciano', 'Gegrilltes Gemüse mit Kräutern mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 3, 12, 5),
  R(`كسافا محمصة ${T}`, 'Roasted cassava Mauritian', 'Manioc rôti mauricien', 'Yuca asada mauriciana', 'Gerösteter Maniok mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 3, 26, 4),
  R(`تارو بالصلصة ${T}`, 'Taro with sauce Mauritian', 'Taro en sauce mauricien', 'Taro en salsa mauriciano', 'Taro mit Sauce mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 3, 26, 6),
  R(`بطاطا حلوة بالبهارات ${T}`, 'Sweet potato with spices Mauritian', 'Patate douce aux épices mauricienne', 'Batata dulce con especias mauriciano', 'Süßkartoffel mit Gewürzen mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 2, 24, 4),
  R(`سبانخ بجوز الهند ${T}`, 'Spinach with coconut Mauritian', 'Épinards à la noix de coco mauricien', 'Espinacas con coco mauriciano', 'Spinat mit Kokos mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 4, 8, 8),
  R(`بازلاء بجوز الهند ${T}`, 'Peas with coconut Mauritian', 'Petits pois à la noix de coco mauricien', 'Guisantes con coco mauriciano', 'Erbsen mit Kokos mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 5, 14, 6),
  R(`قرع بالسمسم ${T}`, 'Pumpkin with sesame Mauritian', 'Courge au sésame mauricienne', 'Calabaza con sésamo mauriciano', 'Kürbis mit Sesam mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 4, 14, 8),
  R(`مخلل الخضار ${T}`, 'Pickled vegetables Mauritian', 'Légumes marinés mauricien', 'Verduras encurtidas mauriciano', 'Eingelegtes Gemüse mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 2, 10, 3),
  R(`طبخة الخضار ${T}`, 'Mixed vegetable stew Mauritian', 'Ragoût de légumes mauricien', 'Guiso de verduras mauriciano', 'Gemüse-Eintopf mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 3, 16, 6),
  R(`موز في الكاري ${T}`, 'Plantain in curry Mauritian', 'Banane plantain au curry mauricien', 'Plátano en curry mauriciano', 'Kochbanane im Curry mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 3, 28, 6),
  R(`كوسة محمصة ${T}`, 'Roasted courgette Mauritian', 'Courgette rôtie mauricienne', 'Calabacín asado mauriciano', 'Geröstete Zucchini mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 2, 8, 6),
  R(`جزر محمص ${T}`, 'Roasted carrot Mauritian', 'Carotte rôtie mauricienne', 'Zanahoria asada mauriciana', 'Geröstete Karotte mauritisch', 'vegetarian_mains', 'lunch', 'pan_mauritian', 2, 12, 6),
  R(`ذرة بالكاجو ${T}`, 'Corn with cashew Mauritian', 'Maïs aux noix de cajou mauricien', 'Maíz con anacardo mauriciano', 'Mais mit Cashew mauritisch', 'vegetarian_mains', 'lunch', 'quatre_bornes', 4, 20, 8),
);
// --- poultry_mains (10) -----------------------------------------------------
dishes.push(
  R(`دجاج كريولي ${T}`, 'Creole chicken Mauritian', 'Poulet créole mauricien', 'Pollo criollo mauriciano', 'Kreolisches Hähnchen mauritisch', 'poultry_mains', 'lunch', 'pan_mauritian', 20, 8, 11),
  R(`دجاج مشوي بالأعشاب ${T}`, 'Grilled chicken with herbs Mauritian', 'Poulet grillé aux herbes mauricien', 'Pollo asado con hierbas mauriciano', 'Gegrilltes Hähnchen mit Kräutern mauritisch', 'poultry_mains', 'lunch', 'pan_mauritian', 24, 4, 10),
  R(`كاري الدجاج بالبهارات ${T}`, 'Chicken curry with spices Mauritian', 'Curry de poulet aux épices mauricien', 'Curry de pollo con especias mauriciano', 'Hähnchen-Curry mit Gewürzen mauritisch', 'poultry_mains', 'lunch', 'pan_mauritian', 17, 13, 12),
  R(`دجاج بالزنجبيل ${T}`, 'Chicken with ginger Mauritian', 'Poulet au gingembre mauricien', 'Pollo con jengibre mauriciano', 'Ingwer-Hähnchen mauritisch', 'poultry_mains', 'lunch', 'pan_mauritian', 22, 6, 10),
  R(`دجاج بالثوم ${T}`, 'Garlic chicken Mauritian', 'Poulet à l ail mauricien', 'Pollo con ajo mauriciano', 'Knoblauch-Hähnchen mauritisch', 'poultry_mains', 'lunch', 'pan_mauritian', 22, 6, 11),
  R(`أسياخ الدجاج المشوية ${T}`, 'Grilled chicken drumsticks Mauritian', 'Piloncs de poulet grillés mauricien', 'Muslos de pollo asados mauriciano', 'Gegrillte Hähnchenkeulen mauritisch', 'poultry_mains', 'lunch', 'pan_mauritian', 23, 3, 12),
  R(`دجاج مبخر بالأعشاب ${T}`, 'Steamed chicken with herbs Mauritian', 'Poulet à la vapeur aux herbes mauricien', 'Pollo al vapor con hierbas mauriciano', 'Gedämpftes Hähnchen mit Kräutern mauritisch', 'poultry_mains', 'lunch', 'pan_mauritian', 19, 6, 8),
  R(`دجاج بالليمون والزعتر ${T}`, 'Lemon thyme chicken Mauritian', 'Poulet au citron et thym mauricien', 'Pollo con limón y tomillo mauriciano', 'Zitronen-Thymian-Hähnchen mauritisch', 'poultry_mains', 'lunch', 'port_louis', 23, 4, 9),
  R(`دجاج بجوز الهند ${T}`, 'Coconut chicken Mauritian', 'Poulet à la noix de coco mauricien', 'Pollo con coco mauriciano', 'Kokos-Hähnchen mauritisch', 'poultry_mains', 'lunch', 'pan_mauritian', 19, 8, 11),
  R(`أسياخ الدجاج بالبهارات ${T}`, 'Chicken skewers with spices Mauritian', 'Brochettes de poulet aux épices mauriciennes', 'Pinchos de pollo con especias mauriciano', 'Hähnchen-Spieße mit Gewürzen mauritisch', 'poultry_mains', 'lunch', 'pan_mauritian', 20, 8, 12),
);
// --- meat_mains (16) --------------------------------------------------------
dishes.push(
  R(`لحم بقري كريولي ${T}`, 'Creole beef Mauritian', 'Bœuf créole mauricien', 'Res criollo mauriciano', 'Kreolisches Rindfleisch mauritisch', 'meat_mains', 'lunch', 'pan_mauritian', 20, 8, 12),
  R(`لحم بقري مشوي بالبهارات ${T}`, 'Grilled beef with spices Mauritian', 'Bœuf grillé aux épices mauricien', 'Res asado con especias mauriciano', 'Gegrilltes Rindfleisch mit Gewürzen mauritisch', 'meat_mains', 'lunch', 'pan_mauritian', 23, 3, 13),
  R(`كاري اللحم بالبهارات ${T}`, 'Beef curry with spices Mauritian', 'Curry de bœuf aux épices mauricien', 'Curry de res con especias mauriciano', 'Rindfleisch-Curry mit Gewürzen mauritisch', 'meat_mains', 'lunch', 'pan_mauritian', 16, 13, 12),
  R(`لحم بقري بالفلفل ${T}`, 'Beef with peppers Mauritian', 'Bœuf aux poivrons mauricien', 'Res con pimientos mauriciano', 'Rindfleisch mit Paprika mauritisch', 'meat_mains', 'lunch', 'port_louis', 20, 8, 12),
  R(`لحم مفروم بالأعشاب ${T}`, 'Minced beef with herbs Mauritian', 'Viande hachée aux herbes mauricienne', 'Carne picada con hierbas mauriciano', 'Hackfleisch mit Kräutern mauritisch', 'meat_mains', 'lunch', 'pan_mauritian', 19, 10, 12),
  R(`لحم بقري بالصلصة الحارة ${T}`, 'Beef in hot sauce Mauritian', 'Bœuf en sauce piquante mauricien', 'Res en salsa picante mauriciano', 'Rindfleisch in scharfer Sauce mauritisch', 'meat_mains', 'lunch', 'pan_mauritian', 19, 8, 12),
  R(`كبد الدجاج المشوي ${T}`, 'Grilled chicken liver Mauritian', 'Foie de poulet grillé mauricien', 'Hígado de pollo asado mauriciano', 'Gegrillte Hähnchenleber mauritisch', 'meat_mains', 'lunch', 'pan_mauritian', 18, 6, 12),
  R(`لحم بقري بالكاجو ${T}`, 'Beef with cashew Mauritian', 'Bœuf aux noix de cajou mauricien', 'Res con anacardo mauriciano', 'Rindfleisch mit Cashew mauritisch', 'meat_mains', 'lunch', 'pan_mauritian', 18, 12, 13),
  R(`لحم بقري بالخضار ${T}`, 'Beef stew with vegetables Mauritian', 'Ragoût de bœuf aux légumes mauricien', 'Guiso de res con verduras mauriciano', 'Rindfleisch-Eintopf mit Gemüse mauritisch', 'meat_mains', 'lunch', 'pan_mauritian', 18, 12, 11),
  R(`كبدة البقر المشوية ${T}`, 'Grilled beef liver Mauritian', 'Foie de bœuf grillé mauricien', 'Hígado de res asado mauriciano', 'Gegrillte Rinderleber mauritisch', 'meat_mains', 'lunch', 'pan_mauritian', 20, 6, 10),
  R(`لحم بقري على الفحم ${T}`, 'Charcoal grilled beef Mauritian', 'Bœuf grillé à la braise mauricien', 'Res a la brasa mauriciano', 'Rindfleisch am Holzkohlegrill mauritisch', 'meat_mains', 'lunch', 'flacq', 23, 3, 14),
  R(`شرائح اللحم المشوية ${T}`, 'Grilled beef slices Mauritian', 'Tranches de bœuf grillées mauriciennes', 'Filetes de res asados mauriciano', 'Gegrillte Rindfleischscheiben mauritisch', 'meat_mains', 'lunch', 'pan_mauritian', 22, 4, 13),
  R(`لحم البقر بالباذنجان ${T}`, 'Beef with aubergine Mauritian', 'Bœuf à l aubergine mauricien', 'Res con berenjena mauriciano', 'Rindfleisch mit Aubergine mauritisch', 'meat_mains', 'lunch', 'pan_mauritian', 19, 10, 11),
  R(`لحم بقري بالبهارات المشكلة ${T}`, 'Beef with mixed spices Mauritian', 'Bœuf aux épices mélangées mauricien', 'Res con mezcla de especias mauriciano', 'Rindfleisch mit Gewürzmischung mauritisch', 'meat_mains', 'lunch', 'pan_mauritian', 20, 9, 12),
  R(`كباب اللحم ${T}`, 'Beef kebab Mauritian', 'Kebab de bœuf mauricien', 'Kebab de res mauriciano', 'Rindfleisch-Kebab mauritisch', 'meat_mains', 'lunch', 'pan_mauritian', 20, 10, 14),
  R(`لحم بقري المطبوخ البطيء ${T}`, 'Slow cooked beef Mauritian', 'Bœuf confit lentement mauricien', 'Res cocido lentamente mauriciano', 'Langsam geschmortes Rindfleisch mauritisch', 'meat_mains', 'lunch', 'curepipe', 19, 10, 11),
);
// --- seafood_mains (28) -----------------------------------------------------
dishes.push(
  R(`سمك جوب المشوي ${T}`, 'Grilled jobfish Mauritian', 'Thon job grillé mauricien', 'Atún job asado mauriciano', 'Gegrillter Jobfisch mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 23, 2, 6),
  R(`كاري الأخطبوط بالبهارات ${T}`, 'Octopus curry with spices Mauritian', 'Curry de poulpe aux épices mauricien', 'Curry de pulpo con especias mauriciano', 'Oktopus-Curry mit Gewürzen mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 18, 14, 11),
  R(`أخطبوط مشوي ${T}`, 'Grilled octopus Mauritian', 'Poulpe grillé mauricien', 'Pulpo asado mauriciano', 'Gegrillter Oktopus mauritisch', 'seafood_mains', 'lunch', 'vacoas', 20, 4, 8),
  R(`أخطبوط بالبهارات ${T}`, 'Octopus with spices Mauritian', 'Poulpe aux épices mauricien', 'Pulpo con especias mauriciano', 'Oktopus mit Gewürzen mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 19, 8, 9),
  R(`سمك القرش المشوي بالثوم ${T}`, 'Garlic grilled shark Mauritian', 'Requin grillé à l ail mauricien', 'Tiburón asado con ajo mauriciano', 'Gegrillter Haifisch mit Knoblauch mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 24, 2, 7),
  R(`سمك الببغاء المشوي ${T}`, 'Grilled parrotfish Mauritian', 'Poisson perroquet grillé mauricien', 'Pez loro asado mauriciano', 'Gegrillter Papageienfisch mauritisch', 'seafood_mains', 'lunch', 'vacoas', 21, 2, 6),
  R(`سمك القرميد المشوي ${T}`, 'Grilled red mullet Mauritian', 'Rouget grillé mauricien', 'Mújol rojo asado mauriciano', 'Gegrillte Meerbarbe mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 20, 2, 7),
  R(`سمك الملك المشوي ${T}`, 'Grilled kingfish Mauritian', 'Poisson roi grillé mauricien', 'Pez rey asado mauriciano', 'Gegrillter Königsfisch mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 22, 2, 8),
  R(`شريحة التونة المشوية ${T}`, 'Grilled tuna steak Mauritian', 'Steak de thon grillé mauricien', 'Filete de atún asado mauriciano', 'Gegrillter Thunfischsteak mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 24, 2, 7),
  R(`سمك البونيتو ${T}`, 'Bonito fish Mauritian', 'Bonite mauricienne', 'Bonito mauriciano', 'Bonito mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 22, 2, 8),
  R(`سمك الجير المشوي ${T}`, 'Grilled trevally Mauritian', 'Carangue grillée mauricienne', 'Jurel asado mauriciano', 'Gegrillter Trevallies mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 21, 2, 7),
  R(`سمك القرموري المشوي ${T}`, 'Grilled catfish Mauritian', 'Poisson-chat grillé mauricien', 'Bagre asado mauriciano', 'Gegrillter Wels mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 20, 2, 6),
  R(`سمك التونة بالبرتقال ${T}`, 'Tuna with orange Mauritian', 'Thon à l orange mauricien', 'Atún con naranja mauriciano', 'Thunfisch mit Orange mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 22, 8, 7),
  R(`سمك بالليمون والبهارات ${T}`, 'Fish with lemon and spices Mauritian', 'Poisson au citron et aux épices mauricien', 'Pescado con limón y especias mauriciano', 'Fisch mit Zitrone und Gewürzen mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 21, 4, 8),
  R(`سمك مشوي بالثوم والليمون ${T}`, 'Grilled fish with garlic and lemon Mauritian', 'Poisson grillé à l ail et au citron mauricien', 'Pescado asado con ajo y limón mauriciano', 'Gegrillter Fisch mit Knoblauch und Zitrone mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 22, 3, 8),
  R(`سمك بالكركم ${T}`, 'Fish with turmeric Mauritian', 'Poisson au curcuma mauricien', 'Pescado con cúrcuma mauriciano', 'Fisch mit Kurkuma mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 21, 4, 8),
  R(`سمك مشوي على البخار ${T}`, 'Grilled fish fillet Mauritian', 'Filet de poisson grillé mauricien', 'Filete de pescado asado mauriciano', 'Gegrilltes Fischfilet mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 23, 2, 7),
  R(`روبيان مشوي ${T}`, 'Grilled prawns Mauritian', 'Crevettes grillées mauriciennes', 'Camarones asados mauricianos', 'Gegrillte Garnelen mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 21, 2, 8),
  R(`روبيان بالثوم ${T}`, 'Garlic prawns Mauritian', 'Crevettes à l ail mauriciennes', 'Camarones con ajo mauriciano', 'Knoblauch-Garnelen mauritisch', 'seafood_mains', 'lunch', 'mahebourg', 20, 4, 12),
  R(`أسياخ الروبيان ${T}`, 'Prawn skewers Mauritian', 'Brochettes de crevettes mauriciennes', 'Pinchos de camarones mauriciano', 'Garnelen-Spieße mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 21, 3, 9),
  R(`لوبستر مشوي ${T}`, 'Grilled lobster Mauritian', 'Homard grillé mauricien', 'Langosta asada mauriciana', 'Gegrillter Hummer mauritisch', 'seafood_mains', 'lunch', 'flacq', 22, 2, 9),
  R(`سلطعون البحر ${T}`, 'Sea crab Mauritian', 'Crabe de mer mauricien', 'Cangrejo de mar mauriciano', 'Meerkrabbe mauritisch', 'seafood_mains', 'lunch', 'vacoas', 19, 3, 8),
  R(`محار مشوي ${T}`, 'Grilled clams Mauritian', 'Palourdes grillées mauriciennes', 'Almejas asadas mauricianas', 'Gegrillte Muscheln mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 14, 6, 3),
  R(`كاليماري المشوي ${T}`, 'Grilled calamari Mauritian', 'Calamars grillés mauricien', 'Calamares asados mauriciano', 'Gegrillter Kalamari mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 18, 4, 7),
  R(`قنفذ البحر ${T}`, 'Sea urchin Mauritian', 'Oursin mauricien', 'Erizo de mar mauriciano', 'Seeigel mauritisch', 'seafood_mains', 'lunch', 'vacoas', 9, 4, 5),
  R(`سمك القرش بصلصة جوز الهند ${T}`, 'Shark in coconut sauce Mauritian', 'Requin en sauce de noix de coco mauricien', 'Tiburón en salsa de coco mauriciano', 'Haifisch in Kokossauce mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 22, 6, 11),
  R(`تونة معلبة بالزيت ${T}`, 'Tuna in oil Mauritian', 'Thon à l huile mauricien', 'Atún en aceite mauriciano', 'Thunfisch in Öl mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 24, 1, 9),
  R(`سمك كريولي ${T}`, 'Creole fish Mauritian', 'Poisson créole mauricien', 'Pescado criollo mauriciano', 'Kreolischer Fisch mauritisch', 'seafood_mains', 'lunch', 'pan_mauritian', 21, 6, 9),
);
// --- soups_salads (18) ------------------------------------------------------
dishes.push(
  R(`مرقة السمك بالخضار ${T}`, 'Fish broth with vegetables Mauritian', 'Bouisson de poisson aux légumes mauricien', 'Caldo de pescado con verduras mauriciano', 'Fischbouillon mit Gemüse mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 8, 16, 6),
  R(`شوربة الروبيان ${T}`, 'Prawn soup Mauritian', 'Soupe de crevettes mauricienne', 'Sopa de camarones mauriciana', 'Garnelensuppe mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 11, 7, 5),
  R(`شوربة المرقة بالكمون ${T}`, 'Fish broth with cumin Mauritian', 'Bouillon au cumin mauricien', 'Caldo de pescado con comino mauriciano', 'Fischbouillon mit Kreuzkümmel mauritisch', 'soups_salads', 'lunch', 'port_louis', 9, 12, 5),
  R(`حساء الكسافا بالتمر ${T}`, 'Cassava soup with dates Mauritian', 'Soupe de manioc aux dattes mauricienne', 'Sopa de yuca con dátiles mauriciano', 'Manioksuppe mit Datteln mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 2, 20, 2),
  R(`شوربة السمك الحارة ${T}`, 'Spicy fish soup Mauritian', 'Soupe de poisson épicée mauricienne', 'Sopa de pescado picante mauriciana', 'Scharfe Fischsuppe mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 10, 7, 5),
  R(`شوربة الخضار السميكة ${T}`, 'Thick vegetable soup Mauritian', 'Soupe de légumes épaisse mauricienne', 'Sopa de verduras espesa mauriciana', 'Dicke Gemüsesuppe mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 3, 14, 4),
  R(`سلطة السمك ${T}`, 'Fish salad Mauritian', 'Salade de poisson mauricienne', 'Ensalada de pescado mauriciana', 'Fischsalat mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 14, 8, 6),
  R(`سلطة التونة ${T}`, 'Tuna salad Mauritian', 'Salade de thon mauricienne', 'Ensalada de atún mauriciana', 'Thunfischsalat mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 16, 6, 8),
  R(`سلطة الموز المقلي ${T}`, 'Fried plantain salad Mauritian', 'Salade de plantain frit mauricienne', 'Ensalada de plátano frito mauriciano', 'Salat aus frittierter Kochbanane mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 2, 18, 2),
  R(`سلطة الفواكه الاستوائية ${T}`, 'Tropical fruit salad Mauritian', 'Salade de fruits tropicaux mauricienne', 'Ensalada de frutas tropicales mauriciana', 'Tropischer Obstsalat mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 1, 16, 1),
  R(`سلطة أوراق الشجر ${T}`, 'Leaf salad Mauritian', 'Salade de feuilles mauricienne', 'Ensalada de hojas mauriciana', 'Blattsalat mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 3, 9, 2),
  R(`سلطة الخيار بالليمون ${T}`, 'Cucumber salad with lemon Mauritian', 'Salade de concombre au citron mauricienne', 'Ensalada de pepino con limón mauriciano', 'Gurkensalat mit Zitrone mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 1, 7, 1),
  R(`سلطة براعم منبتة ${T}`, 'Sprouted seed salad Mauritian', 'Salade de germes mauricienne', 'Ensalada de brotes mauriciana', 'Sprossensalat mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 5, 14, 4),
  R(`سلطة الجزر بالبرتقال ${T}`, 'Carrot salad with orange Mauritian', 'Salade de carottes à l orange mauricienne', 'Ensalada de zanahoria con naranja mauriciano', 'Karottensalat mit Orange mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 1, 12, 2),
  R(`سلطة الخس والطماطم ${T}`, 'Lettuce and tomato salad Mauritian', 'Salade de laitue et tomates mauricienne', 'Ensalada de lechuga y tomate mauriciano', 'Salat aus Salat und Tomate mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 2, 8, 3),
  R(`سلطة الحمص بالليمون ${T}`, 'Chickpea salad with lemon Mauritian', 'Salade de pois chiches au citron mauricienne', 'Ensalada de garbanzos con limón mauriciano', 'Kichererbsensalat mit Zitrone mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 6, 16, 4),
  R(`سلطة بذور الجوز ${T}`, 'Grated coconut salad Mauritian', 'Salade de noix de coco râpée mauricienne', 'Ensalada de coco rallado mauriciano', 'Salat aus geriebener Kokos mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 2, 10, 8),
  R(`سلطة البطيخ بالفلفل ${T}`, 'Watermelon salad with chilli Mauritian', 'Salade de pastèque au piment mauricienne', 'Ensalada de sandía con chile mauriciano', 'Wassermelonensalat mit Chili mauritisch', 'soups_salads', 'lunch', 'pan_mauritian', 1, 10, 1),
);
// --- street_snacks (20) -----------------------------------------------------
dishes.push(
  R(`سمك مملح مقرمش ${T}`, 'Crispy salted fish Mauritian', 'Poisson salé croustillant mauricien', 'Pescado salado crujiente mauriciano', 'Knuspriger gesalzener Fisch mauritisch', 'street_snacks', 'snacks', 'pan_mauritian', 21, 4, 10),
  R(`سمك مقرمش بالبهارات ${T}`, 'Crispy fish with spices Mauritian', 'Poisson croustillant aux épices mauricien', 'Pescado crujiente con especias mauriciano', 'Knuspriger Fisch mit Gewürzen mauritisch', 'street_snacks', 'snacks', 'port_louis', 20, 8, 12),
  R(`كفتة السمك ${T}`, 'Fish fritters Mauritian', 'Beignets de poisson mauricien', 'Buñuelos de pescado mauriciano', 'Fischklößchen mauritisch', 'street_snacks', 'snacks', 'pan_mauritian', 11, 14, 9),
  R(`روغاي مقرمش ${T}`, 'Crispy rougaille Mauritian', 'Rougaille croustillante mauricienne', 'Rougaille crujiente mauriciana', 'Knusprige Rougaille mauritisch', 'street_snacks', 'snacks', 'pan_mauritian', 4, 26, 10),
  R(`بسكويت السمك ${T}`, 'Fish crackers Mauritian', 'Biscuits au poisson mauricien', 'Galletas de pescado mauriciano', 'Fischcracker mauritisch', 'street_snacks', 'snacks', 'pan_mauritian', 8, 20, 6),
  R(`بطاطا مقلية بالبهارات ${T}`, 'Spiced french fries Mauritian', 'Frites aux épices mauriciennes', 'Patatas fritas con especias mauriciano', 'Gewürzkartoffeln mauritisch', 'street_snacks', 'snacks', 'african_shared', 3, 24, 9),
  R(`بطاطا حلوة مقلية ${T}`, 'Sweet potato fries Mauritian', 'Frites de patate douce mauriciennes', 'Patatas de batata dulce mauriciano', 'Süßkartoffel-Pommes mauritisch', 'street_snacks', 'snacks', 'african_shared', 2, 24, 8),
  R(`ذرة مشوية ${T}`, 'Roasted corn Mauritian', 'Maïs grillé mauricien', 'Maíz asado mauriciano', 'Gerösteter Mais mauritisch', 'street_snacks', 'snacks', 'african_shared', 4, 20, 2),
  R(`فول سوداني محمص ${T}`, 'Roasted peanuts Mauritian', 'Arachides grillées mauriciennes', 'Maníes asados mauricianos', 'Geröstete Erdnüsse mauritisch', 'street_snacks', 'snacks', 'african_shared', 13, 18, 16),
  R(`كاجو محمص ${T}`, 'Roasted cashew Mauritian', 'Noix de cajou grillées mauriciennes', 'Anacardos asados mauricianos', 'Geröstete Cashew mauritisch', 'street_snacks', 'snacks', 'flacq', 6, 20, 14),
  R(`أسياخ اللحم المشوية ${T}`, 'Grilled meat skewers Mauritian', 'Brochettes de viande grillées mauriciennes', 'Pinchos de carne asados mauriciano', 'Gegrillte Fleischspieße mauritisch', 'street_snacks', 'snacks', 'pan_mauritian', 19, 8, 12),
  R(`دهورل بوري مقرمش ${T}`, 'Crispy dholl puri Mauritian', 'Dholl puri croustillant mauricien', 'Dholl puri crujiente mauriciano', 'Knuspriger Dholl Puri mauritisch', 'street_snacks', 'snacks', 'pan_mauritian', 3, 38, 8),
  R(`جاتو بيمان مقرمش ${T}`, 'Crispy gateau piment Mauritian', 'Gateau piment croustillant mauricien', 'Gateau piment crujiente mauriciano', 'Knuspriger Gateau Piment mauritisch', 'street_snacks', 'snacks', 'pan_mauritian', 4, 40, 9),
  R(`سندوتش السمك المشوي ${T}`, 'Grilled fish sandwich Mauritian', 'Sandwich au poisson grillé mauricien', 'Sándwich de pescado asado mauriciano', 'Fisch-Sandwich gegrillt mauritisch', 'street_snacks', 'snacks', 'pan_mauritian', 12, 20, 8),
  R(`سمك مقرمش بالكسافا ${T}`, 'Crispy fish with cassava Mauritian', 'Poisson croustillant au manioc mauricien', 'Pescado crujiente con yuca mauriciano', 'Knuspriger Fisch mit Maniok mauritisch', 'street_snacks', 'snacks', 'vacoas', 19, 10, 11),
  R(`موزة مقرمشة ${T}`, 'Crispy banana Mauritian', 'Banane croustillante mauricienne', 'Plátano crujiente mauriciano', 'Knusprige Banane mauritisch', 'street_snacks', 'snacks', 'pan_mauritian', 1, 30, 10),
  R(`بسكويت جوز الهند ${T}`, 'Coconut biscuits Mauritian', 'Biscuits à la noix de coco mauricien', 'Galletas de coco mauriciano', 'Kokosbiscuits mauritisch', 'street_snacks', 'snacks', 'pan_mauritian', 5, 30, 10),
  R(`كفتة الخضار ${T}`, 'Vegetable fritters Mauritian', 'Beignets de légumes mauricien', 'Buñuelos de verduras mauriciano', 'Gemüsebeignets mauritisch', 'street_snacks', 'snacks', 'pan_mauritian', 5, 18, 9),
  R(`بسكويت مملح ${T}`, 'Salted crackers Mauritian', 'Biscuits salés mauricien', 'Galletas saladas mauriciano', 'Salzcracker mauritisch', 'street_snacks', 'snacks', 'pan_mauritian', 7, 20, 5),
  R(`مقرمشات بذور السمسم ${T}`, 'Sesame crisps Mauritian', 'Crispés au sésame mauricien', 'Crisp de sésamo mauriciano', 'Sesam-Crisps mauritisch', 'street_snacks', 'snacks', 'pan_mauritian', 7, 22, 14),
);
// --- condiments (8) ---------------------------------------------------------
dishes.push(
  R(`تتبيلة كريولي ${T}`, 'Creole achards pickle Mauritian', 'Achards créole mauricien', 'Achards criollo mauriciano', 'Kreolische Achards-Einlege mauritisch', 'condiments', 'snacks', 'pan_mauritian', 1, 12, 2),
  R(`صلصة الفلفل الحار بالثوم ${T}`, 'Chilli garlic sauce Mauritian', 'Sauce piment à l ail mauricienne', 'Salsa de chile con ajo mauriciano', 'Chili-Knoblauch-Sauce mauritisch', 'condiments', 'snacks', 'pan_mauritian', 1, 8, 4),
  R(`صلصة جوز الهند الكريمية ${T}`, 'Creamy coconut sauce Mauritian', 'Sauce crémeuse à la noix de coco mauricienne', 'Salsa cremosa de coco mauriciana', 'Cremige Kokossauce mauritisch', 'condiments', 'snacks', 'pan_mauritian', 2, 8, 16),
  R(`مخلل البصل بالليمون ${T}`, 'Lemon pickled onions Mauritian', 'Oignons marinés au citron mauricien', 'Cebollas encurtidas en limón mauriciano', 'Eingelegte Zwiebeln in Zitrone mauritisch', 'condiments', 'snacks', 'pan_mauritian', 1, 8, 1),
  R(`صلصة الفول السميكة ${T}`, 'Thick bean sauce Mauritian', 'Sauce épaisse de haricots mauricienne', 'Salsa espesa de frijoles mauriciano', 'Dicke Bohnensauce mauritisch', 'condiments', 'snacks', 'curepipe', 6, 12, 6),
  R(`صلصة الثوم والكاجو ${T}`, 'Garlic cashew sauce Mauritian', 'Sauce ail cajou mauricienne', 'Salsa de ajo y anacardo mauriciano', 'Knoblauch-Cashew-Sauce mauritisch', 'condiments', 'snacks', 'pan_mauritian', 3, 8, 12),
  R(`خلطة البهارات الكريولية ${T}`, 'Creole spice blend Mauritian', 'Mélange d épices créole mauricien', 'Mezcla de especias criolla mauriciano', 'Kreolische Gewürzmischung mauritisch', 'condiments', 'snacks', 'pan_mauritian', 3, 14, 4),
  R(`صلصة السمك ${T}`, 'Fish sauce Mauritian', 'Sauce de poisson mauricienne', 'Salsa de pescado mauriciana', 'Fischsauce mauritisch', 'condiments', 'snacks', 'african_shared', 4, 6, 8),
);
// --- desserts_sweets (10) ---------------------------------------------------
dishes.push(
  R(`كعكة الموز بالسمن ${T}`, 'Banana cake with butter Mauritian', 'Gâteau à la banane au beurre mauricien', 'Bizcocho de plátano con mantequilla mauriciano', 'Bananenkuchen mit Butter mauritisch', 'desserts_sweets', 'snacks', 'pan_mauritian', 4, 40, 10),
  R(`حلوى جوز الهند المبشور ${T}`, 'Shredded coconut sweet Mauritian', 'Confiserie à la noix de coco râpée mauricienne', 'Dulce de coco rallado mauriciano', 'Süßigkeit aus geriebener Kokos mauritisch', 'desserts_sweets', 'snacks', 'pan_mauritian', 3, 26, 12),
  R(`كعكة الكسافا الحلوة ${T}`, 'Sweet cassava cake Mauritian', 'Gâteau de manioc sucré mauricien', 'Bizcocho de yuca dulce mauriciano', 'Süßer Maniokkuchen mauritisch', 'desserts_sweets', 'snacks', 'african_shared', 3, 36, 10),
  R(`بودينغ خبز الشجرة ${T}`, 'Breadfruit pudding Mauritian', 'Pudding au fruit à pain mauricien', 'Pudin de fruta del pan mauriciano', 'Brotfrucht-Pudding mauritisch', 'desserts_sweets', 'snacks', 'curepipe', 2, 30, 8),
  R(`بوظة جوز الهند ${T}`, 'Coconut ice cream Mauritian', 'Glace à la noix de coco mauricienne', 'Helado de coco mauriciana', 'Kokoseis mauritisch', 'desserts_sweets', 'snacks', 'pan_mauritian', 3, 22, 12),
  R(`كعكة المانجو ${T}`, 'Mango cake Mauritian', 'Gâteau à la mangue mauricien', 'Bizcocho de mango mauriciano', 'Mangokuchen mauritisch', 'desserts_sweets', 'snacks', 'pan_mauritian', 2, 34, 8),
  R(`حلوى الموز بالسمسم ${T}`, 'Banana sesame sweet Mauritian', 'Confiserie banane sésame mauricienne', 'Dulce de plátano y sésamo mauriciano', 'Bananen-Sesam-Süßigkeit mauritisch', 'desserts_sweets', 'snacks', 'pan_mauritian', 3, 32, 9),
  R(`حلوى التمر ${T}`, 'Date sweet Mauritian', 'Confiserie aux dattes mauricienne', 'Dulce de dátiles mauriciano', 'Dattel-Süßigkeit mauritisch', 'desserts_sweets', 'snacks', 'curepipe', 2, 36, 8),
  R(`حلوى الجزر المشوي ${T}`, 'Roasted carrot sweet Mauritian', 'Confiserie de carotte rôtie mauricienne', 'Dulce de zanahoria asada mauriciano', 'Geröstete Karotten-Süßigkeit mauritisch', 'desserts_sweets', 'snacks', 'pan_mauritian', 2, 30, 8),
  R(`بوظة المانجو ${T}`, 'Mango ice cream Mauritian', 'Glace à la mangue mauricienne', 'Helado de mango mauriciana', 'Mangoeis mauritisch', 'desserts_sweets', 'snacks', 'flacq', 2, 24, 11),
);
// --- beverages (16) ---------------------------------------------------------
dishes.push(
  R(`ماء جوز الهند ${T}`, 'Coconut water Mauritian', 'Eau de coco mauricienne', 'Agua de coco mauriciana', 'Kokoswasser mauritisch', 'beverages', 'snacks', 'pan_mauritian', 1, 10, 0),
  R(`عصير القصب بالقرفة ${T}`, 'Cinnamon sugarcane juice Mauritian', 'Jus de canne à la cannelle mauricien', 'Jugo de caña con canela mauriciano', 'Zuckerrohrsaft mit Zimt mauritisch', 'beverages', 'snacks', 'pan_mauritian', 1, 18, 0),
  R(`عصير المانجو ${T}`, 'Mango juice Mauritian', 'Jus de mangue mauricien', 'Jugo de mango mauriciano', 'Mangosaft mauritisch', 'beverages', 'snacks', 'pan_mauritian', 1, 15, 0),
  R(`عصير الباشن فروت ${T}`, 'Passion fruit juice Mauritian', 'Jus de fruit de la passion mauricien', 'Jugo de maracuyá mauriciano', 'Passionsfruchtsaft mauritisch', 'beverages', 'snacks', 'pan_mauritian', 1, 12, 0),
  R(`عصير البابايا ${T}`, 'Papaya juice Mauritian', 'Jus de papaye mauricien', 'Jugo de papaya mauriciano', 'Papayasaft mauritisch', 'beverages', 'snacks', 'pan_mauritian', 1, 13, 0),
  R(`عصير الجوافة ${T}`, 'Guava juice Mauritian', 'Jus de goyave mauricien', 'Jugo de guayaba mauriciano', 'Guavensaft mauritisch', 'beverages', 'snacks', 'pan_mauritian', 1, 14, 0),
  R(`عصير الأناناس ${T}`, 'Pineapple juice Mauritian', 'Jus d ananas mauricien', 'Jugo de piña mauriciano', 'Ananassaft mauritisch', 'beverages', 'snacks', 'pan_mauritian', 1, 13, 0),
  R(`عصير البرتقال ${T}`, 'Orange juice Mauritian', 'Jus d orange mauricien', 'Jugo de naranja mauriciano', 'Orangensaft mauritisch', 'beverages', 'snacks', 'pan_mauritian', 1, 12, 0),
  R(`عصير الليمون بالنعناع ${T}`, 'Lemon juice with mint Mauritian', 'Jus de citron à la menthe mauricien', 'Jugo de limón con menta mauriciano', 'Zitronensaft mit Minze mauritisch', 'beverages', 'snacks', 'pan_mauritian', 1, 10, 0),
  R(`شراب الزنجبيل والليمون ${T}`, 'Ginger and lemon drink Mauritian', 'Boisson gingembre citron mauricienne', 'Bebida de jengibre y limón mauriciano', 'Ingwer-Zitronen-Getränk mauritisch', 'beverages', 'snacks', 'pan_mauritian', 1, 12, 0),
  R(`شاي أسود ${T}`, 'Black tea Mauritian', 'Thé noir mauricien', 'Té negro mauriciano', 'Schwarzer Tee mauritisch', 'beverages', 'snacks', 'pan_mauritian', 1, 5, 0),
  R(`قهوة بالحليب ${T}`, 'Coffee with milk Mauritian', 'Café au lait mauricien', 'Café con leche mauriciano', 'Kaffee mit Milch mauritisch', 'beverages', 'snacks', 'pan_mauritian', 2, 8, 2),
  R(`حليب جوز الهند المشروب ${T}`, 'Coconut milk drink Mauritian', 'Boisson au lait de coco mauricienne', 'Bebida de leche de coco mauriciana', 'Kokosmilch-Getränk mauritisch', 'beverages', 'snacks', 'pan_mauritian', 2, 6, 20),
  R(`عصير الكركديه ${T}`, 'Hibiscus drink Mauritian', 'Boisson à l hibiscus mauricienne', 'Bebida de hibisco mauriciana', 'Hibiskusgetränk mauritisch', 'beverages', 'snacks', 'african_shared', 1, 12, 0),
  R(`ماء جوز الهند المرطب ${T}`, 'Coconut cooling water Mauritian', 'Eau de coco rafraîchissante mauricienne', 'Agua de coco refrescante mauriciana', 'Erfrischendes Kokoswasser mauritisch', 'beverages', 'snacks', 'pan_mauritian', 1, 10, 0),
  R(`عصير الموز بالأناناس ${T}`, 'Banana pineapple juice Mauritian', 'Jus banane ananas mauricien', 'Jugo de plátano y piña mauriciano', 'Bananen-Ananassaft mauritisch', 'beverages', 'snacks', 'pan_mauritian', 1, 20, 0),
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
  if (!d.name_ar.includes('موريشوسي')) badTok.push(d.name_ar);
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
  path.join(__dirname, 'mauritius-200-proposal.json'),
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
console.log(`\nWrote scripts/mauritius-200-proposal.json (${dishes.length} dishes)`);
console.log(`Categories (${Object.keys(byCategory).length}): ${Object.keys(byCategory).join(', ')}`);
console.log(`Regions (${Object.keys(byRegion).length}): ${Object.keys(byRegion).join(', ')}`);
console.log(`Meal types: ${Object.keys(byMeal).join(', ')}`);
console.log(`Region distribution: ${JSON.stringify(byRegion)}`);
console.log(`Category distribution: ${JSON.stringify(byCategory)}`);
