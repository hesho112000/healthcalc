// Authoring script for the Ghanaian 200-dish proposal (scripts/ghana-200-proposal.json).
// 200 NEW dishes (the 100 legacy rows live in src/data/ghanaian-full.ts).
// Regions: pan_ghanaian by default (golden rule), regional anchors (accra, kumasi, tamale),
// african_shared for dishes shared across West Africa (credited to africa-ghana-2026 source).
// All Arabic names carry غاني أصيل token (halal profile: no pork).
// Emphasizes: Waakye, Banku, Fufu, Jollof, Kenkey, Red Red, Kelewele, Groundnut Soup,
// Palm Nut Soup, Light Soup, Okra Soup, Kontomire, Garden Egg Stew, Tilapia, Shito,
// Pepper Soup, Tuo Zaafi, Omo Tuo, Kokonte/Konkonte, Ampesi, Koko, Hausa Koko, Sobolo,
// Bofrot, Tatale, Adika, Pito, Abolo, Gari, Eto, Akple, Wele, Fante Kenkey, Abom.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, protein, carbs, fat) => {
  const cal_100 = Math.round(4 * protein + 4 * carbs + 9 * fat);
  return { name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat };
};

const dishes = [];
const T = 'غاني أصيل';

// ============================================================ PAN_GHANAIAN + REGIONAL (200)
// --- breakfast_items (14) ----------------------------------------------------
dishes.push(
  R(`واكاي مع سباغيتي ${T}`, 'Waakye with spaghetti Ghanaian', 'Waakye aux spaghetti ghanéen', 'Waakye con espaguetis ghanés', 'Waakye mit Spaghetti ghanaisch', 'breakfast_items', 'breakfast', 'pan_ghanaian', 7, 30, 4),
  R(`كوكو مع كوس ${T}`, 'Koko with koose Ghanaian', 'Koko avec koose ghanéen', 'Koko con koose ghanés', 'Koko mit Koose ghanaisch', 'breakfast_items', 'breakfast', 'pan_ghanaian', 5, 26, 5),
  R(`كوكو مع بانكيك ${T}`, 'Koko with pancake Ghanaian', 'Koko avec crêpe ghanéen', 'Koko con panqueque ghanés', 'Koko mit Pfannkuchen ghanaisch', 'breakfast_items', 'breakfast', 'pan_ghanaian', 5, 28, 5),
  R(`خبز أبولو ${T}`, 'Abolo steamed bread Ghanaian', 'Pain abolo cuit à la vapeur ghanéen', 'Pan abolo al vapor ghanés', 'Abolo-Dampfbrot ghanaisch', 'breakfast_items', 'breakfast', 'accra', 5, 30, 4),
  R(`أومو توو مع شوربة ${T}`, 'Omo tuo with soup Ghanaian', 'Omo tuo avec soupe ghanéen', 'Omo tuo con sopa ghanés', 'Omo Tuo mit Suppe ghanaisch', 'breakfast_items', 'breakfast', 'pan_ghanaian', 4, 26, 3),
  R(`غاري سوآكينغ ${T}`, 'Gari soaking Ghanaian', 'Gari trempé ghanéen', 'Gari remojado ghanés', 'Gari-Einweichen ghanaisch', 'breakfast_items', 'breakfast', 'pan_ghanaian', 3, 28, 4),
  R(`تاتالي بالمانجو ${T}`, 'Tatale with mango Ghanaian', 'Tatale à la mangue ghanéen', 'Tatale con mango ghanés', 'Tatale mit Mango ghanaisch', 'breakfast_items', 'breakfast', 'pan_ghanaian', 4, 30, 5),
  R(`بوفروت عسل ${T}`, 'Bofrot with honey Ghanaian', 'Bofrot au miel ghanéen', 'Bofrot con miel ghanés', 'Bofrot mit Honig ghanaisch', 'breakfast_items', 'breakfast', 'pan_ghanaian', 5, 32, 8),
  R(`أومليت بصل غاني ${T}`, 'Onion omelette Ghanaian', 'Omelette à l oignon ghanéen', 'Omeleta de cebolla ghanés', 'Zwiebel-Omelette ghanaisch', 'breakfast_items', 'breakfast', 'pan_ghanaian', 10, 6, 12),
  R(`بيض مسلوق فطور غاني ${T}`, 'Boiled egg breakfast Ghanaian', 'Œuf dur petit-déjeuner ghanéen', 'Huevo cocido desayuno ghanés', 'Gekochtes Ei Frühstück ghanaisch', 'breakfast_items', 'breakfast', 'pan_ghanaian', 11, 2, 8),
  R(`كينكي مينو ${T}`, 'Kenkey morning Ghanaian', 'Kenkey matinal ghanéen', 'Kenkey matutino ghanés', 'Kenkey am Morgen ghanaisch', 'breakfast_items', 'breakfast', 'pan_ghanaian', 4, 26, 2),
  R(`أمبسي مع فول ${T}`, 'Ampesi with beans Ghanaian', 'Ampesi aux haricots ghanéen', 'Ampesi con frijoles ghanés', 'Ampesi mit Bohnen ghanaisch', 'breakfast_items', 'breakfast', 'pan_ghanaian', 6, 26, 3),
  R(`سوبولو صباحي ${T}`, 'Morning sobolo Ghanaian', 'Sobolo du matin ghanéen', 'Sobolo matinal ghanés', 'Morgen-Sobolo ghanaisch', 'breakfast_items', 'breakfast', 'pan_ghanaian', 1, 8, 0),
  R(`شاي الهاوسا بالزنجبيل ${T}`, 'Ginger hausa tea Ghanaian', 'Thé hausa au gingembre ghanéen', 'Té hausa de jengibre ghanés', 'Ingwer-Hausa-Tee ghanaisch', 'breakfast_items', 'breakfast', 'tamale', 3, 20, 2),
);
// --- breads_flatbreads (24) --------------------------------------------------
dishes.push(
  R(`خبز أبولو مع صلصة ${T}`, 'Abolo bread with sauce Ghanaian', 'Pain abolo avec sauce ghanéen', 'Pan abolo con salsa ghanés', 'Abolo-Brot mit Sauce ghanaisch', 'breads_flatbreads', 'lunch', 'accra', 5, 32, 4),
  R(`خبز تاتالي ${T}`, 'Tatale bread Ghanaian', 'Pain tatale ghanéen', 'Pan tatale ghanés', 'Tatale-Brot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 4, 30, 6),
  R(`فطيرة محشوة لحم ${T}`, 'Meat stuffed pie Ghanaian', 'Tourte farcie à la viande ghanéenne', 'Pastel relleno de carne ghanés', 'Fleischpastete ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 10, 24, 14),
  R(`فطيرة سمك ${T}`, 'Fish pie Ghanaian', 'Tourte au poisson ghanéenne', 'Pastel de pescado ghanés', 'Fischpastete ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 12, 22, 12),
  R(`خبز الذرة الغاني ${T}`, 'Ghanaian corn bread Ghanaian', 'Pain de maïs ghanéen', 'Pan de maíz ghanés', 'Ghanaisches Maisbrot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 5, 28, 5),
  R(`بوفروت محشي ${T}`, 'Stuffed bofrot Ghanaian', 'Bofrot farci ghanéen', 'Bofrot relleno ghanés', 'Gefüllter Bofrot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 6, 30, 8),
  R(`بانيتو خبز ${T}`, 'Panito bread Ghanaian', 'Pain panito ghanéen', 'Pan panito ghanés', 'Panito-Brot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 5, 30, 4),
  R(`خبز الكاسافا ${T}`, 'Cassava bread Ghanaian', 'Pain de manioc ghanéen', 'Pan de yuca ghanés', 'Maniok-Brot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 3, 30, 3),
  R(`خبز البطاطا ${T}`, 'Potato bread Ghanaian', 'Pain de pommes de terre ghanéen', 'Pan de patata ghanés', 'Kartoffelbrot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 4, 28, 4),
  R(`خبز اليام ${T}`, 'Yam bread Ghanaian', 'Pain d igname ghanéen', 'Pan de ñame ghanés', 'Yams-Brot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 4, 30, 3),
  R(`ساندويتش كينكي ${T}`, 'Kenkey sandwich Ghanaian', 'Sandwich au kenkey ghanéen', 'Sándwich de kenkey ghanés', 'Kenkey-Sandwich ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 8, 26, 7),
  R(`خبز الهوسا ${T}`, 'Hausa bread Ghanaian', 'Pain hausa ghanéen', 'Pan hausa ghanés', 'Hausa-Brot ghanaisch', 'breads_flatbreads', 'lunch', 'tamale', 6, 30, 4),
  R(`روتي غاني ${T}`, 'Ghanaian roti Ghanaian', 'Roti ghanéen', 'Roti ghanés', 'Ghanaisches Roti ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 6, 28, 5),
  R(`خبز الزنجبيل ${T}`, 'Ginger bread Ghanaian', 'Pain au gingembre ghanéen', 'Pan de jengibre ghanés', 'Ingwerbrot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 5, 30, 5),
  R(`خبز الموز ${T}`, 'Banana bread Ghanaian', 'Pain à la banane ghanéen', 'Pan de plátano ghanés', 'Bananenbrot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 4, 32, 6),
  R(`خبز البلانتين ${T}`, 'Plantain bread Ghanaian', 'Pain de plantain ghanéen', 'Pan de plátano macho ghanés', 'Kochbananen-Brot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 4, 32, 5),
  R(`فطيرة الكونتومير ${T}`, 'Kontomire pie Ghanaian', 'Tourte au kontomire ghanéenne', 'Pastel de kontomire ghanés', 'Kontomire-Pastete ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 7, 24, 10),
  R(`خبز الأرز ${T}`, 'Rice bread Ghanaian', 'Pain de riz ghanéen', 'Pan de arroz ghanés', 'Reisbrot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 5, 30, 3),
  R(`خبز الأكلي ${T}`, 'Akple bread Ghanaian', 'Pain akple ghanéen', 'Pan akple ghanés', 'Akple-Brot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 4, 28, 2),
  R(`خبز الكوكوي ${T}`, 'Cocoyam bread Ghanaian', 'Pain de taro ghanéen', 'Pan de taro ghanés', 'Taro-Brot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 3, 28, 3),
  R(`خبز الجاري ${T}`, 'Gari bread Ghanaian', 'Pain de gari ghanéen', 'Pan de gari ghanés', 'Gari-Brot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 4, 30, 4),
  R(`فطيرة الدجاج ${T}`, 'Chicken pie Ghanaian', 'Tourte au poulet ghanéenne', 'Pastel de pollo ghanés', 'Hähnchenpastete ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 12, 22, 12),
  R(`خبز مع عسل ${T}`, 'Bread with honey Ghanaian', 'Pain au miel ghanéen', 'Pan con miel ghanés', 'Brot mit Honig ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 5, 32, 4),
  R(`خبز السمسم ${T}`, 'Sesame bread Ghanaian', 'Pain au sésame ghanéen', 'Pan de sésamo ghanés', 'Sesambrot ghanaisch', 'breads_flatbreads', 'lunch', 'pan_ghanaian', 7, 28, 8),
);
// --- rice_biryani (10) ------------------------------------------------------
dishes.push(
  R(`جولوف أرز وطني ${T}`, 'National jollof rice Ghanaian', 'Riz jollof national ghanéen', 'Arroz jollof nacional ghanés', 'Nationaler Jollof-Reis ghanaisch', 'rice_biryani', 'lunch', 'african_shared', 6, 38, 5),
  R(`جولوف بالدجاج ${T}`, 'Chicken jollof Ghanaian', 'Jollof au poulet ghanéen', 'Jollof de pollo ghanés', 'Hähnchen-Jollof ghanaisch', 'rice_biryani', 'lunch', 'pan_ghanaian', 12, 34, 7),
  R(`جولوف بالأسماك ${T}`, 'Fish jollof Ghanaian', 'Jollof au poisson ghanéen', 'Jollof de pescado ghanés', 'Fisch-Jollof ghanaisch', 'rice_biryani', 'lunch', 'pan_ghanaian', 10, 32, 6),
  R(`جولوف بالخضار ${T}`, 'Vegetable jollof Ghanaian', 'Jollof aux légumes ghanéen', 'Jollof de verduras ghanés', 'Gemüse-Jollof ghanaisch', 'rice_biryani', 'lunch', 'pan_ghanaian', 5, 36, 4),
  R(`واكاي رايس ${T}`, 'Omo tuo rice Ghanaian', 'Riz omo tuo ghanéen', 'Arroz omo tuo ghanés', 'Omo-Tuo-Reis ghanaisch', 'rice_biryani', 'lunch', 'pan_ghanaian', 5, 32, 3),
  R(`أرز بالكالولو ${T}`, 'Rice with palava sauce Ghanaian', 'Riz à la sauce palava ghanéen', 'Arroz con salsa palava ghanés', 'Reis mit Palava-Sauce ghanaisch', 'rice_biryani', 'lunch', 'pan_ghanaian', 6, 30, 5),
  R(`أرز بالأوكرو ${T}`, 'Rice with okra Ghanaian', 'Riz au gombo ghanéen', 'Arroz con okra ghanés', 'Reis mit Okra ghanaisch', 'rice_biryani', 'lunch', 'pan_ghanaian', 5, 30, 3),
  R(`أرز أبيض مع ستو ${T}`, 'White rice with stew Ghanaian', 'Riz blanc avec ragoût ghanéen', 'Arroz blanco con guiso ghanés', 'Weißer Reis mit Eintopf ghanaisch', 'rice_biryani', 'lunch', 'pan_ghanaian', 7, 32, 5),
  R(`أرز بالجوز ${T}`, 'Groundnut rice Ghanaian', 'Riz aux arachides ghanéen', 'Arroz con maní ghanés', 'Erdnuss-Reis ghanaisch', 'rice_biryani', 'lunch', 'pan_ghanaian', 7, 30, 7),
  R(`أرز بالتوو زافي ${T}`, 'Tuo zaafi rice Ghanaian', 'Riz tuo zaafi ghanéen', 'Arroz tuo zaafi ghanés', 'Tuo-Zaafi-Reis ghanaisch', 'rice_biryani', 'lunch', 'tamale', 5, 34, 3),
);
// --- dals_legumes (16) -----------------------------------------------------
dishes.push(
  R(`ريد ريد بالبلانتين ${T}`, 'Red red with plantain Ghanaian', 'Red red au plantain ghanéen', 'Red red con plátano ghanés', 'Red Red mit Kochbanane ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 8, 28, 6),
  R(`ريد ريد بالأرز ${T}`, 'Red red with rice Ghanaian', 'Red red au riz ghanéen', 'Red red con arroz ghanés', 'Red Red mit Reis ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 8, 30, 5),
  R(`فول بلاك آي ${T}`, 'Black-eyed peas stew Ghanaian', 'Ragoût de doliques ghanéen', 'Guiso de caupí ghanés', 'Augenbohnen-Eintopf ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 8, 24, 4),
  R(`فول بالكونتومير ${T}`, 'Beans with kontomire Ghanaian', 'Haricots au kontomire ghanéen', 'Frijoles con kontomire ghanés', 'Bohnen mit Kontomire ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 7, 22, 4),
  R(`فول بالجوز ستو ${T}`, 'Beans in groundnut stew Ghanaian', 'Haricots au ragoût d arachides ghanéen', 'Frijoles en guiso de maní ghanés', 'Bohnen im Erdnuss-Eintopf ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 8, 24, 6),
  R(`فول الكاكاو ${T}`, 'Cocoa bean Ghanaian', 'Haricots de cacao ghanéens', 'Frijoles de cacao ghanés', 'Kakaobohne ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 7, 22, 4),
  R(`عدس غاني حار ${T}`, 'Spicy Ghanaian lentils Ghanaian', 'Lentilles épicées ghanéennes', 'Lentejas picantes ghanés', 'Scharfe ghanaische Linsen ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 8, 18, 4),
  R(`حمص غاني ${T}`, 'Ghanaian chickpeas Ghanaian', 'Pois chiches ghanéens', 'Garbanzos ghanés', 'Ghanaische Kichererbsen ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 7, 20, 4),
  R(`فول بالمورينغا ${T}`, 'Moringa beans Ghanaian', 'Haricots au moringa ghanéens', 'Frijoles con moringa ghanés', 'Moringa-Bohnen ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 7, 20, 4),
  R(`فول الويل ${T}`, 'Wele beans Ghanaian', 'Haricots wele ghanéens', 'Frijoles wele ghanés', 'Wele-Bohnen ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 8, 22, 5),
  R(`فول بامبارا ${T}`, 'Bambara beans Ghanaian', 'Haricots bambara ghanéens', 'Frijoles bambara ghanés', 'Bambara-Bohnen ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 7, 22, 3),
  R(`فول بالجوز والفلفل ${T}`, 'Groundnut pepper beans Ghanaian', 'Haricots aux arachides et piment ghanéens', 'Frijoles con maní y chile ghanés', 'Erdnuss-Pfeffer-Bohnen ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 8, 22, 6),
  R(`سلطة فول غاني ${T}`, 'Ghanaian bean salad Ghanaian', 'Salade de haricots ghanéenne', 'Ensalada de frijoles ghanés', 'Ghanaischer Bohnensalat ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 6, 18, 3),
  R(`دال اللوبيا ${T}`, 'Cowpea dal Ghanaian', 'Dal de niébé ghanéen', 'Dal de caupí ghanés', 'Kuherbsen-Dal ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 8, 20, 3),
  R(`فول الفول السوداني ${T}`, 'Peanut beans Ghanaian', 'Haricots aux cacahuètes ghanéens', 'Frijoles con cacahuete ghanés', 'Erdnuss-Bohnen ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 9, 22, 7),
  R(`فول أصفر غاني ${T}`, 'Yellow beans Ghanaian', 'Haricots jaunes ghanéens', 'Frijoles amarillos ghanés', 'Gelbe Bohnen ghanaisch', 'dals_legumes', 'lunch', 'pan_ghanaian', 7, 22, 4),
);
// --- vegetarian_mains (22) --------------------------------------------------
dishes.push(
  R(`كونتومير ستو ${T}`, 'Kontomire stew Ghanaian', 'Ragoût kontomire ghanéen', 'Guiso kontomire ghanés', 'Kontomire-Eintopf ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 6, 16, 5),
  R(`بالافا سوس ${T}`, 'Palava sauce Ghanaian', 'Sauce palava ghanéenne', 'Salsa palava ghanés', 'Palava-Sauce ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 6, 14, 6),
  R(`ستو باذنجان ${T}`, 'Garden egg stew Ghanaian', 'Ragoût d aubergines africaines ghanéen', 'Guiso de berenjena africana ghanés', 'Afrikanischer Auberginen-Eintopf ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 5, 16, 5),
  R(`أوكرو ستو ${T}`, 'Okra stew Ghanaian', 'Ragoût de gombo ghanéen', 'Guiso de okra ghanés', 'Okra-Eintopf ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 5, 14, 5),
  R(`إيفو بري ${T}`, 'Efobree spinach stew Ghanaian', 'Ragoût d épinards efobree ghanéen', 'Guiso de espinacas efobree ghanés', 'Efobree-Spinat-Eintopf ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 6, 14, 6),
  R(`يخنة القرع ${T}`, 'Pumpkin stew Ghanaian', 'Ragoût de courge ghanéen', 'Guiso de calabaza ghanés', 'Kürbis-Eintopf ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 4, 18, 5),
  R(`يخنة اليام ${T}`, 'Yam stew Ghanaian', 'Ragoût d igname ghanéen', 'Guiso de ñame ghanés', 'Yams-Eintopf ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 4, 22, 5),
  R(`يخنة البلانتين ${T}`, 'Plantain stew Ghanaian', 'Ragoût de plantain ghanéen', 'Guiso de plátano ghanés', 'Kochbananen-Eintopf ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 3, 26, 5),
  R(`يخنة الكاسافا ${T}`, 'Cassava stew Ghanaian', 'Ragoût de manioc ghanéen', 'Guiso de yuca ghanés', 'Maniok-Eintopf ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 3, 26, 4),
  R(`كوكوي مسلوق ${T}`, 'Boiled cocoyam Ghanaian', 'Taro bouilli ghanéen', 'Taro cocido ghanés', 'Gekochter Taro ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 3, 24, 1),
  R(`غاري فوتو ${T}`, 'Gari foto Ghanaian', 'Gari foto ghanéen', 'Gari foto ghanés', 'Gari-Foto ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 5, 22, 5),
  R(`فوفو بالكونتومير ${T}`, 'Fufu with kontomire Ghanaian', 'Fufu au kontomire ghanéen', 'Fufu con kontomire ghanés', 'Fufu mit Kontomire ghanaisch', 'vegetarian_mains', 'lunch', 'kumasi', 4, 26, 4),
  R(`أمبيسي بالستو ${T}`, 'Ampesi with stew Ghanaian', 'Ampesi avec ragoût ghanéen', 'Ampesi con guiso ghanés', 'Ampesi mit Eintopf ghanaisch', 'vegetarian_mains', 'lunch', 'kumasi', 5, 24, 5),
  R(`بلاك آي ستو ${T}`, 'Black-eye stew Ghanaian', 'Ragoût de doliques ghanéen', 'Guiso de caupí ghanés', 'Augenbohnen-Eintopf ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 7, 20, 4),
  R(`يخنة الباذنجان بالشطة ${T}`, 'Garden egg pepper sauce Ghanaian', 'Ragoût d aubergines et piment ghanéen', 'Guiso de berenjena y chile ghanés', 'Auberginen-Pfeffersauce ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 5, 16, 6),
  R(`يخنة أوراق الكاسافا ${T}`, 'Cassava leaves stew Ghanaian', 'Ragoût de feuilles de manioc ghanéen', 'Guiso de hojas de yuca ghanés', 'Maniokblätter-Eintopf ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 6, 14, 6),
  R(`يخنة الجوز والسبانخ ${T}`, 'Groundnut spinach stew Ghanaian', 'Ragoût d arachides et épinards ghanéen', 'Guiso de maní y espinacas ghanés', 'Erdnuss-Spinat-Eintopf ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 7, 16, 7),
  R(`فوفو بالأوكرو ${T}`, 'Fufu with okra Ghanaian', 'Fufu au gombo ghanéen', 'Fufu con okra ghanés', 'Fufu mit Okra ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 4, 24, 4),
  R(`كوكو مبشور ${T}`, 'Grated cocoyam Ghanaian', 'Taro râpé ghanéen', 'Taro rallado ghanés', 'Geriebener Taro ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 4, 26, 4),
  R(`لمبزي بالحمص ${T}`, 'Ampesi chickpea Ghanaian', 'Ampesi aux pois chiches ghanéen', 'Ampesi con garbanzos ghanés', 'Ampesi mit Kichererbsen ghanaisch', 'vegetarian_mains', 'lunch', 'kumasi', 6, 22, 4),
  R(`أبومو ستو ${T}`, 'Abom stew Ghanaian', 'Ragoût abom ghanéen', 'Guiso abom ghanés', 'Abom-Eintopf ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 6, 18, 5),
  R(`سلطة دافئة غانية ${T}`, 'Warm Ghanaian salad Ghanaian', 'Salade tiède ghanéenne', 'Ensalada tibia ghanés', 'Warme ghanaische Salat ghanaisch', 'vegetarian_mains', 'lunch', 'pan_ghanaian', 5, 20, 4),
);
// --- poultry_mains (12) -----------------------------------------------------
dishes.push(
  R(`دجاج مشوي غاني ${T}`, 'Grilled Ghanaian chicken Ghanaian', 'Poulet grillé ghanéen', 'Pollo a la parrilla ghanés', 'Gegrilltes ghanaisches Hähnchen ghanaisch', 'poultry_mains', 'lunch', 'pan_ghanaian', 24, 4, 10),
  R(`دجاج بشيتو ${T}`, 'Chicken with shito Ghanaian', 'Poulet au shito ghanéen', 'Pollo con shito ghanés', 'Hähnchen mit Shito ghanaisch', 'poultry_mains', 'lunch', 'pan_ghanaian', 22, 6, 10),
  R(`دجاج بالجوز ${T}`, 'Groundnut chicken Ghanaian', 'Poulet aux arachides ghanéen', 'Pollo con maní ghanés', 'Erdnuss-Hähnchen ghanaisch', 'poultry_mains', 'lunch', 'pan_ghanaian', 18, 10, 9),
  R(`دجاج كونتومير ${T}`, 'Kontomire chicken Ghanaian', 'Poulet au kontomire ghanéen', 'Pollo con kontomire ghanés', 'Kontomire-Hähnchen ghanaisch', 'poultry_mains', 'lunch', 'pan_ghanaian', 18, 8, 8),
  R(`دجاج بالبلم ${T}`, 'Palm nut chicken Ghanaian', 'Poulet à la noix de palme ghanéen', 'Pollo con nuez de palma ghanés', 'Palmnuss-Hähnchen ghanaisch', 'poultry_mains', 'lunch', 'pan_ghanaian', 18, 10, 9),
  R(`دجاج لاليون ${T}`, 'Lalionet chicken Ghanaian', 'Poulet lalionet ghanéen', 'Pollo lalionet ghanés', 'Lalionet-Hähnchen ghanaisch', 'poultry_mains', 'lunch', 'pan_ghanaian', 20, 8, 8),
  R(`دجاج بالفلفل ${T}`, 'Pepper chicken Ghanaian', 'Poulet au piment ghanéen', 'Pollo con chile ghanés', 'Pfeffer-Hähnchen ghanaisch', 'poultry_mains', 'lunch', 'pan_ghanaian', 22, 6, 11),
  R(`دجاج مشوي بالأرز ${T}`, 'Grilled chicken with rice Ghanaian', 'Poulet grillé au riz ghanéen', 'Pollo a la parrilla con arroz ghanés', 'Gegrilltes Hähnchen mit Reis ghanaisch', 'poultry_mains', 'lunch', 'pan_ghanaian', 16, 24, 7),
  R(`دجاج مطهو بالطماطم ${T}`, 'Tomato chicken Ghanaian', 'Poulet à la tomate ghanéen', 'Pollo con tomate ghanés', 'Tomaten-Hähnchen ghanaisch', 'poultry_mains', 'lunch', 'pan_ghanaian', 18, 10, 8),
  R(`دجاج بالويلي ${T}`, 'Wele chicken Ghanaian', 'Poulet wele ghanéen', 'Pollo wele ghanés', 'Wele-Hähnchen ghanaisch', 'poultry_mains', 'lunch', 'accra', 18, 8, 8),
  R(`دجاج الغري ${T}`, 'Gari chicken Ghanaian', 'Poulet au gari ghanéen', 'Pollo con gari ghanés', 'Gari-Hähnchen ghanaisch', 'poultry_mains', 'lunch', 'pan_ghanaian', 18, 14, 7),
  R(`دجاج بالثوم ${T}`, 'Garlic chicken Ghanaian', 'Poulet à l ail ghanéen', 'Pollo con ajo ghanés', 'Knoblauch-Hähnchen ghanaisch', 'poultry_mains', 'lunch', 'pan_ghanaian', 22, 6, 10),
);
// --- meat_mains (22) --------------------------------------------------------
dishes.push(
  R(`لحم بقري مشوي ${T}`, 'Grilled beef Ghanaian', 'Bœuf grillé ghanéen', 'Res a la parrilla ghanés', 'Gegrilltes Rindfleisch ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 22, 4, 12),
  R(`ستو لحم الغوز ${T}`, 'Goat stew Ghanaian', 'Ragoût de chèvre ghanéen', 'Guiso de cabra ghanés', 'Ziegen-Eintopf ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 18, 8, 12),
  R(`تشيشينغا كباب ${T}`, 'Chichinga kebab Ghanaian', 'Chichinga kebab ghanéen', 'Chichinga kebab ghanés', 'Chichinga-Kebab ghanaisch', 'meat_mains', 'lunch', 'tamale', 20, 10, 14),
  R(`لحم مشوي مع بلانتين ${T}`, 'Grilled beef with plantain Ghanaian', 'Bœuf grillé au plantain ghanéen', 'Res a la parrilla con plátano ghanés', 'Gegrilltes Rind mit Kochbanane ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 20, 8, 12),
  R(`ستو قصي الأضلاع ${T}`, 'Beef ribs stew Ghanaian', 'Ragoût de côtes de bœuf ghanéen', 'Guiso de costillas de res ghanés', 'Rippchen-Eintopf ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 18, 8, 14),
  R(`لحم بالجوز ${T}`, 'Groundnut beef Ghanaian', 'Bœuf aux arachides ghanéen', 'Res con maní ghanés', 'Erdnuss-Rindfleisch ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 18, 10, 10),
  R(`لحم كونتومير ${T}`, 'Kontomire beef Ghanaian', 'Bœuf au kontomire ghanéen', 'Res con kontomire ghanés', 'Kontomire-Rindfleisch ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 18, 8, 9),
  R(`لحم بالنخيل ${T}`, 'Palm nut beef Ghanaian', 'Bœuf à la noix de palme ghanéen', 'Res con nuez de palma ghanés', 'Palmnuss-Rindfleisch ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 18, 10, 10),
  R(`كاري لحم غاني ${T}`, 'Ghanaian beef curry Ghanaian', 'Curry de bœuf ghanéen', 'Curry de res ghanés', 'Ghanaisches Rind-Curry ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 16, 12, 10),
  R(`لحم مطبوخ بالأوكرو ${T}`, 'Okra beef Ghanaian', 'Bœuf au gombo ghanéen', 'Res con okra ghanés', 'Okra-Rindfleisch ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 16, 10, 8),
  R(`لحم بالفلفل الحار ${T}`, 'Hot pepper beef Ghanaian', 'Bœuf au piment fort ghanéen', 'Res con chile picante ghanés', 'Scharfes Pfeffer-Rind ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 20, 6, 12),
  R(`لحم مطهو بالأرز ${T}`, 'Beef stew with rice Ghanaian', 'Ragoût de bœuf au riz ghanéen', 'Guiso de res con arroz ghanés', 'Rind-Eintopf mit Reis ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 16, 14, 8),
  R(`لحم مشوي مع البصل ${T}`, 'Beef with onion Ghanaian', 'Bœuf à l oignon ghanéen', 'Res con cebolla ghanés', 'Rindfleisch mit Zwiebeln ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 18, 8, 11),
  R(`لحم الغنم المشوي ${T}`, 'Grilled lamb Ghanaian', 'Agneau grillé ghanéen', 'Cordero a la parrilla ghanés', 'Gegrilltes Lamm ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 20, 4, 14),
  R(`ستو لحم الغنم ${T}`, 'Lamb stew Ghanaian', 'Ragoût d agneau ghanéen', 'Guiso de cordero ghanés', 'Lamm-Eintopf ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 18, 8, 12),
  R(`ستو لحم الفاخر ${T}`, 'Rich meat stew Ghanaian', 'Ragoût de viande riche ghanéen', 'Guiso de carne rica ghanés', 'Reicher Fleisch-Eintopf ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 16, 10, 12),
  R(`لحم بالعسل والثوم ${T}`, 'Honey garlic beef Ghanaian', 'Bœuf au miel et ail ghanéen', 'Res con miel y ajo ghanés', 'Honig-Knoblauch-Rind ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 20, 10, 10),
  R(`ستو كتلات ${T}`, 'Cutlet stew Ghanaian', 'Ragoût de côtelettes ghanéen', 'Guiso de chuletas ghanés', 'Kotelett-Eintopf ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 17, 10, 12),
  R(`لحم وكوكو ${T}`, 'Beef with cocoyam Ghanaian', 'Bœuf au taro ghanéen', 'Res con taro ghanés', 'Rindfleisch mit Taro ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 16, 14, 9),
  R(`لحم بالفلفل الأسود ${T}`, 'Beef black pepper stew Ghanaian', 'Ragoût de bœuf au poivre noir ghanéen', 'Guiso de res con pimienta negra ghanés', 'Rind-Schwarzpfeffer-Eintopf ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 16, 10, 9),
  R(`لحم بجلس ${T}`, 'Beef with beans Ghanaian', 'Bœuf aux haricots ghanéen', 'Res con frijoles ghanés', 'Rindfleisch mit Bohnen ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 16, 14, 8),
  R(`لحم بالفلفل الرومي ${T}`, 'Bell pepper beef Ghanaian', 'Bœuf au poivron ghanéen', 'Res con pimiento morrón ghanés', 'Paprika-Rind ghanaisch', 'meat_mains', 'lunch', 'pan_ghanaian', 18, 10, 10),
);
// --- seafood_mains (4) -----------------------------------------------------
dishes.push(
  R(`تيلابيا مشوية ${T}`, 'Grilled tilapia Ghanaian', 'Tilapia grillé ghanéen', 'Tilapia a la parrilla ghanés', 'Gegrillter Tilapia ghanaisch', 'seafood_mains', 'lunch', 'african_shared', 22, 2, 6),
  R(`سمك بالجوز ${T}`, 'Groundnut fish Ghanaian', 'Poisson aux arachides ghanéen', 'Pescado con maní ghanés', 'Erdnuss-Fisch ghanaisch', 'seafood_mains', 'lunch', 'pan_ghanaian', 20, 6, 9),
  R(`سمك بالشيتو ${T}`, 'Fish with shito Ghanaian', 'Poisson au shito ghanéen', 'Pescado con shito ghanés', 'Fisch mit Shito ghanaisch', 'seafood_mains', 'lunch', 'pan_ghanaian', 20, 4, 8),
  R(`سمك مملح ${T}`, 'Salted fish Ghanaian', 'Poisson salé ghanéen', 'Pescado salado ghanés', 'Gesalzener Fisch ghanaisch', 'seafood_mains', 'lunch', 'pan_ghanaian', 21, 2, 7),
);
// --- soups_salads (16) -----------------------------------------------------
dishes.push(
  R(`شوربة جوز غاني ${T}`, 'Groundnut soup Ghanaian', 'Soupe d arachides ghanéenne', 'Sopa de maní ghanés', 'Erdnusssuppe ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 7, 12, 8),
  R(`شوربة نخيل غاني ${T}`, 'Palm nut soup Ghanaian', 'Soupe de noix de palme ghanéenne', 'Sopa de nuez de palma ghanés', 'Palmnusssuppe ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 6, 10, 8),
  R(`شوربة خفيفة ${T}`, 'Light soup Ghanaian', 'Soupe légère ghanéenne', 'Sopa ligera ghanés', 'Leichte Suppe ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 5, 8, 4),
  R(`شوربة أوكرا ${T}`, 'Okra soup Ghanaian', 'Soupe de gombo ghanéenne', 'Sopa de okra ghanés', 'Okrasuppe ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 5, 10, 5),
  R(`شوربة فلفل ${T}`, 'Pepper soup Ghanaian', 'Soupe au piment ghanéenne', 'Sopa de pimiento ghanés', 'Pfeffersuppe ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 6, 8, 4),
  R(`شوربة كونتومير ${T}`, 'Kontomire soup Ghanaian', 'Soupe au kontomire ghanéenne', 'Sopa de kontomire ghanés', 'Kontomire-Suppe ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 5, 8, 5),
  R(`شوربة عدس غاني ${T}`, 'Ghanaian lentil soup Ghanaian', 'Soupe de lentilles ghanéenne', 'Sopa de lentejas ghanés', 'Ghanaische Linsensuppe ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 7, 14, 3),
  R(`شوربة ذرة وتوو ${T}`, 'Corn tuo soup Ghanaian', 'Soupe de maïs tuo ghanéenne', 'Sopa de maíz tuo ghanés', 'Mais-Tuo-Suppe ghanaisch', 'soups_salads', 'lunch', 'tamale', 4, 16, 3),
  R(`سلطة خضار غاني ${T}`, 'Ghanaian vegetable salad Ghanaian', 'Salade de légumes ghanéenne', 'Ensalada de verduras ghanés', 'Ghanaischer Gemüsesalat ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 2, 8, 1),
  R(`سلطة كونتومير ${T}`, 'Kontomire salad Ghanaian', 'Salade kontomire ghanéenne', 'Ensalada kontomire ghanés', 'Kontomire-Salat ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 4, 6, 2),
  R(`سلطة الأفوكادو الغانية ${T}`, 'Ghanaian avocado salad Ghanaian', 'Salade d avocat ghanéenne', 'Ensalada de aguacate ghanés', 'Ghanaischer Avocado-Salat ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 2, 8, 12),
  R(`سلطة الطماطم البلانتين ${T}`, 'Plantain tomato salad Ghanaian', 'Salade tomate plantain ghanéenne', 'Ensalada tomate plátano ghanés', 'Kochbananen-Tomatensalat ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 2, 16, 3),
  R(`سلطة المانجو ${T}`, 'Mango salad Ghanaian', 'Salade de mangue ghanéenne', 'Ensalada de mango ghanés', 'Mango-Salat ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 1, 16, 2),
  R(`سلطة الفاصوليا الخضراء ${T}`, 'Green bean salad Ghanaian', 'Salade de haricots verts ghanéenne', 'Ensalada de judías verdes ghanés', 'Grüner Bohnensalat ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 3, 8, 2),
  R(`سلطة الجزر الغانية ${T}`, 'Ghanaian carrot salad Ghanaian', 'Salade de carottes ghanéenne', 'Ensalada de zanahorias ghanés', 'Ghanaischer Möhrensalat ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 1, 10, 2),
  R(`سلطة البنجر الغانية ${T}`, 'Ghanaian beetroot salad Ghanaian', 'Salade de betterave ghanéenne', 'Ensalada de remolacha ghanés', 'Ghanaischer Rote-Bete-Salat ghanaisch', 'soups_salads', 'lunch', 'pan_ghanaian', 2, 10, 1),
);
// --- street_snacks (22) ----------------------------------------------------
dishes.push(
  R(`كيليويلي ${T}`, 'Kelewele Ghanaian', 'Kelewele ghanéen', 'Kelewele ghanés', 'Kelewele ghanaisch', 'street_snacks', 'snacks', 'accra', 3, 30, 9),
  R(`كيكيلي ${T}`, 'Kikeli puff puff Ghanaian', 'Kikeli beignet ghanéen', 'Kikeli buñuelo ghanés', 'Kikeli ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 5, 30, 8),
  R(`كوس فريترز ${T}`, 'Koose fritters Ghanaian', 'Beignets koose ghanéens', 'Buñuelos koose ghanés', 'Koose-Krapfen ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 6, 22, 7),
  R(`بوفروت ${T}`, 'Bofrot Ghanaian', 'Bofrot ghanéen', 'Bofrot ghanés', 'Bofrot ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 5, 32, 8),
  R(`تاتالي ${T}`, 'Tatale plantain Ghanaian', 'Tatale plantain ghanéen', 'Tatale plátano ghanés', 'Tatale Kochbanane ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 3, 30, 6),
  R(`شيتو مع خبز ${T}`, 'Shito with bread Ghanaian', 'Shito avec pain ghanéen', 'Shito con pan ghanés', 'Shito mit Brot ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 6, 24, 7),
  R(`بلانتين مقلي ${T}`, 'Fried plantain Ghanaian', 'Plantain frit ghanéen', 'Plátano frito ghanés', 'Frittierte Kochbanane ghanaisch', 'street_snacks', 'snacks', 'african_shared', 2, 28, 8),
  R(`موز بالحلوى ${T}`, 'Candied banana Ghanaian', 'Banane confite ghanéenne', 'Plátano confitado ghanés', 'Kandierte Banane ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 2, 34, 5),
  R(`ذرة مشوية ${T}`, 'Roasted corn Ghanaian', 'Maïs grillé ghanéen', 'Maíz tostado ghanés', 'Gerösteter Mais ghanaisch', 'street_snacks', 'snacks', 'african_shared', 4, 20, 2),
  R(`فول سوداني محمص ${T}`, 'Roasted groundnuts Ghanaian', 'Arachides grillées ghanéennes', 'Maníes tostados ghanés', 'Geröstete Erdnüsse ghanaisch', 'street_snacks', 'snacks', 'african_shared', 13, 18, 16),
  R(`صلصة الويل ${T}`, 'Wele sauce Ghanaian', 'Sauce wele ghanéenne', 'Salsa wele ghanés', 'Wele-Sauce ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 8, 10, 9),
  R(`أكلي ${T}`, 'Akple snack Ghanaian', 'Akple en-cas ghanéen', 'Akple aperitivo ghanés', 'Akple-Snack ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 4, 26, 3),
  R(`غاري مع جوز الهند ${T}`, 'Gari with coconut Ghanaian', 'Gari à la noix de coco ghanéen', 'Gari con coco ghanés', 'Gari mit Kokos ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 4, 26, 7),
  R(`بذور البطيخ المحمصة ${T}`, 'Roasted watermelon seeds Ghanaian', 'Graines de pastèque grillées ghanéennes', 'Semillas de sandía tostadas ghanés', 'Geröstete Wassermelonenkerne ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 6, 22, 6),
  R(`كعك الجوز ${T}`, 'Groundnut cake Ghanaian', 'Gâteau aux arachides ghanéen', 'Pastel de maní ghanés', 'Erdnusskuchen ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 12, 24, 18),
  R(`يام مقلي ${T}`, 'Fried yam Ghanaian', 'Ignames frites ghanéennes', 'Ñame frito ghanés', 'Frittierte Yams ghanaisch', 'street_snacks', 'snacks', 'african_shared', 3, 26, 8),
  R(`بطاطا مقلية غانية ${T}`, 'Ghanaian fries Ghanaian', 'Frites ghanéennes', 'Patatas fritas ghanés', 'Ghanaische Pommes ghanaisch', 'street_snacks', 'snacks', 'african_shared', 3, 24, 8),
  R(`رقائق بلانتين ${T}`, 'Plantain chips Ghanaian', 'Chips de plantain ghanéens', 'Chips de plátano ghanés', 'Kochbananen-Chips ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 2, 30, 10),
  R(`تاتالي بالجوز ${T}`, 'Tatale with nuts Ghanaian', 'Tatale aux noix ghanéen', 'Tatale con nueces ghanés', 'Tatale mit Nüssen ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 4, 28, 8),
  R(`أديكا ${T}`, 'Adika corn snack Ghanaian', 'Adika en-cas de maïs ghanéen', 'Adika aperitivo de maíz ghanés', 'Adika-Maissnack ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 5, 30, 6),
  R(`فول محمص ${T}`, 'Roasted beans snack Ghanaian', 'Haricots grillés en-cas ghanéens', 'Frijoles tostados aperitivo ghanés', 'Geröstete Bohnen snack ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 6, 24, 7),
  R(`شيبسي البطاطا ${T}`, 'Potato chips Ghanaian', 'Chips de pommes de terre ghanéens', 'Papas fritas chips ghanés', 'Kartoffelchips ghanaisch', 'street_snacks', 'snacks', 'pan_ghanaian', 3, 24, 9),
);
// --- condiments (8) ----------------------------------------------------------
dishes.push(
  R(`شيتو ${T}`, 'Shito sauce Ghanaian', 'Sauce shito ghanéenne', 'Salsa shito ghanés', 'Shito-Sauce ghanaisch', 'condiments', 'snacks', 'accra', 7, 12, 12),
  R(`فلفل أبيض ${T}`, 'Pepper white sauce Ghanaian', 'Sauce piment blanc ghanéenne', 'Salsa pimiento blanco ghanés', 'Weiße Pfeffersauce ghanaisch', 'condiments', 'snacks', 'pan_ghanaian', 2, 10, 6),
  R(`مكو ${T}`, 'Meko pepper sauce Ghanaian', 'Sauce piment meko ghanéenne', 'Salsa pimiento meko ghanés', 'Meko-Pfeffersauce ghanaisch', 'condiments', 'snacks', 'pan_ghanaian', 2, 8, 4),
  R(`صلصة البصل الحارة ${T}`, 'Hot onion sauce Ghanaian', 'Sauce oignon piquante ghanéenne', 'Salsa cebolla picante ghanés', 'Scharfe Zwiebelsauce ghanaisch', 'condiments', 'snacks', 'pan_ghanaian', 2, 10, 5),
  R(`صلصة الطماطم الشيتو ${T}`, 'Tomato shito Ghanaian', 'Shito à la tomate ghanéen', 'Shito de tomate ghanés', 'Tomaten-Shito ghanaisch', 'condiments', 'snacks', 'pan_ghanaian', 3, 12, 8),
  R(`تاكتاشي ${T}`, 'Taktakshi Ghanaian', 'Taktakshi ghanéen', 'Taktakshi ghanés', 'Taktakshi ghanaisch', 'condiments', 'snacks', 'pan_ghanaian', 3, 14, 6),
  R(`صلصة الفستق ${T}`, 'Groundnut paste Ghanaian', 'Pâte d arachides ghanéenne', 'Pasta de maní ghanés', 'Erdnusspaste ghanaisch', 'condiments', 'snacks', 'pan_ghanaian', 12, 14, 20),
  R(`صلصة الثوم والفلفل ${T}`, 'Garlic pepper sauce Ghanaian', 'Sauce ail et piment ghanéenne', 'Salsa ajo y chile ghanés', 'Knoblauch-Pfeffersauce ghanaisch', 'condiments', 'snacks', 'pan_ghanaian', 3, 10, 6),
);
// --- desserts_sweets (8) -----------------------------------------------------
dishes.push(
  R(`حلوى الجوز كعكة ${T}`, 'Groundnut cake sweet Ghanaian', 'Gâteau aux arachides sucré ghanéen', 'Pastel de maní dulce ghanés', 'Süßer Erdnusskuchen ghanaisch', 'desserts_sweets', 'snacks', 'pan_ghanaian', 12, 26, 20),
  R(`حلوى السمسم الغانية ${T}`, 'Ghanaian sesame candy Ghanaian', 'Bonbon au sésame ghanéen', 'Caramelo de sésamo ghanés', 'Ghanaisches Sesambonbon ghanaisch', 'desserts_sweets', 'snacks', 'pan_ghanaian', 6, 30, 14),
  R(`حلوى الكوكو ${T}`, 'Cocoa candy Ghanaian', 'Bonbon de cacao ghanéen', 'Caramelo de cacao ghanés', 'Kakao-Bonbon ghanaisch', 'desserts_sweets', 'snacks', 'pan_ghanaian', 4, 30, 10),
  R(`حلوى جوز الهند ${T}`, 'Coconut sweet Ghanaian', 'Bonbon à la noix de coco ghanéen', 'Caramelo de coco ghanés', 'Kokos-Bonbon ghanaisch', 'desserts_sweets', 'snacks', 'pan_ghanaian', 4, 28, 12),
  R(`حلوى المانجو ${T}`, 'Mango candy Ghanaian', 'Confiserie de mangue ghanéenne', 'Caramelo de mango ghanés', 'Mango-Bonbon ghanaisch', 'desserts_sweets', 'snacks', 'pan_ghanaian', 1, 30, 2),
  R(`حلوى البابايا ${T}`, 'Papaya candy Ghanaian', 'Confiserie de papaye ghanéenne', 'Caramelo de papaya ghanés', 'Papaya-Bonbon ghanaisch', 'desserts_sweets', 'snacks', 'pan_ghanaian', 1, 28, 2),
  R(`كعكة الجاري بالعسل ${T}`, 'Honey gari cake Ghanaian', 'Gâteau gari au miel ghanéen', 'Pastel gari con miel ghanés', 'Honig-Gari-Kuchen ghanaisch', 'desserts_sweets', 'snacks', 'pan_ghanaian', 5, 32, 8),
  R(`آزيما ${T}`, 'Azima dessert Ghanaian', 'Dessert azima ghanéen', 'Postre azima ghanés', 'Azima-Nachtisch ghanaisch', 'desserts_sweets', 'snacks', 'pan_ghanaian', 4, 30, 8),
);
// --- beverages (22) ----------------------------------------------------------
dishes.push(
  R(`سوبولو ${T}`, 'Sobolo drink Ghanaian', 'Sobolo boisson ghanéen', 'Sobolo bebida ghanés', 'Sobolo-Getränk ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 9, 0),
  R(`شاي الزنجبيل الغاني ${T}`, 'Ghanaian ginger tea Ghanaian', 'Thé au gingembre ghanéen', 'Té de jengibre ghanés', 'Ghanaischer Ingwertee ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 5, 0),
  R(`بيتو ${T}`, 'Pito beer Ghanaian', 'Bière pito ghanéenne', 'Cerveza pito ghanés', 'Pito-Bier ghanaisch', 'beverages', 'snacks', 'tamale', 1, 8, 0),
  R(`عصير المانجو ${T}`, 'Mango juice Ghanaian', 'Jus de mangue ghanéen', 'Jugo de mango ghanés', 'Mangosaft ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 18, 0),
  R(`عصير الأناناس ${T}`, 'Pineapple juice Ghanaian', 'Jus d ananas ghanéen', 'Jugo de piña ghanés', 'Ananassaft ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 16, 0),
  R(`عصير الأفوكادو ${T}`, 'Avocado shake Ghanaian', 'Frappé d avocat ghanéen', 'Batido de aguacate ghanés', 'Avocado-Shake ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 2, 12, 6),
  R(`عصير البابايا ${T}`, 'Papaya juice Ghanaian', 'Jus de papaye ghanéen', 'Jugo de papaya ghanés', 'Papayasaft ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 15, 0),
  R(`عصير الجوافة ${T}`, 'Guava juice Ghanaian', 'Jus de goyave ghanéen', 'Jugo de guayaba ghanés', 'Guavensaft ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 15, 0),
  R(`عصير البلانتين ${T}`, 'Plantain juice Ghanaian', 'Jus de plantain ghanéen', 'Jugo de plátano ghanés', 'Kochbananensaft ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 18, 0),
  R(`عصير السوبولو بالزنجبيل ${T}`, 'Ginger sobolo Ghanaian', 'Sobolo au gingembre ghanéen', 'Sobolo con jengibre ghanés', 'Ingwer-Sobolo ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 10, 0),
  R(`شراب النعناع ${T}`, 'Mint drink Ghanaian', 'Boisson à la menthe ghanéenne', 'Bebida de menta ghanés', 'Minzgetränk ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 14, 0),
  R(`شاي بالتوابل الغاني ${T}`, 'Ghanaian spiced tea Ghanaian', 'Thé épicé ghanéen', 'Té especiado ghanés', 'Ghanaischer Gewürztee ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 2, 10, 2),
  R(`عصير الليتشي ${T}`, 'Lychee juice Ghanaian', 'Jus de litchi ghanéen', 'Jugo de lichi ghanés', 'Litschisaft ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 16, 0),
  R(`عصير الجزر ${T}`, 'Carrot juice Ghanaian', 'Jus de carotte ghanéen', 'Zumo de zanahoria ghanés', 'Karottensaft ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 14, 0),
  R(`عصير البطيخ ${T}`, 'Watermelon juice Ghanaian', 'Jus de pastèque ghanéen', 'Jugo de sandía ghanés', 'Wassermelonensaft ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 14, 0),
  R(`كوكو سوبولو ${T}`, 'Koko drink Ghanaian', 'Boisson koko ghanéenne', 'Bebida koko ghanés', 'Koko-Getränk ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 3, 20, 2),
  R(`قهوة غانية ${T}`, 'Ghanaian coffee Ghanaian', 'Café ghanéen', 'Café ghanés', 'Ghanaischer Kaffee ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 6, 2),
  R(`شاي بالحليب الغاني ${T}`, 'Ghanaian milk tea Ghanaian', 'Thé au lait ghanéen', 'Té con leche ghanés', 'Ghanaischer Milchtee ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 2, 8, 2),
  R(`مشروب التمر الهندي ${T}`, 'Tamarind drink Ghanaian', 'Boisson au tamarin ghanéenne', 'Bebida de tamarindo ghanés', 'Tamarinden-Getränk ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 14, 1),
  R(`ليمونادة غانية ${T}`, 'Ghanaian lemonade Ghanaian', 'Limonade ghanéenne', 'Limonada ghanés', 'Ghanaische Limonade ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 14, 1),
  R(`عصير الأناناس بالزنجبيل ${T}`, 'Pineapple ginger juice Ghanaian', 'Jus ananas gingembre ghanéen', 'Jugo piña jengibre ghanés', 'Ananas-Ingwersaft ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 16, 1),
  R(`عصير الكوكو بالماء ${T}`, 'Coconut water Ghanaian', 'Eau de coco ghanéenne', 'Agua de coco ghanés', 'Kokoswasser ghanaisch', 'beverages', 'snacks', 'pan_ghanaian', 1, 8, 0),
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
  if (!d.name_ar.includes('غاني')) badTok.push(d.name_ar);
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
  path.join(__dirname, 'ghana-200-proposal.json'),
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
console.log(`\nWrote scripts/ghana-200-proposal.json (${dishes.length} dishes)`);
console.log(`Categories (${Object.keys(byCategory).length}): ${Object.keys(byCategory).join(', ')}`);
console.log(`Regions (${Object.keys(byRegion).length}): ${Object.keys(byRegion).join(', ')}`);
console.log(`Meal types: ${Object.keys(byMeal).join(', ')}`);
console.log(`Region distribution: ${JSON.stringify(byRegion)}`);
console.log(`Category distribution: ${JSON.stringify(byCategory)}`);