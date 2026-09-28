// Authoring script for the Botswanan 200-dish proposal (scripts/botswana-200-proposal.json).
// 200 NEW dishes (the 100 base rows live in src/data/botswanan-full.ts). Mirrors the
// Seychelles/Mauritius/Gabon authoring pattern: R() helper + per-category macro templates.
// Regions: pan_botswanan by default (golden rule), regional anchors (gaborone,
// francistown, maun, serowe, molepoloni, palapye, kanye, jwaneng), african_shared for
// dishes shared across the wider Southern African table. All Arabic names carry the
// token بوتسواناوي أصيل (strict halal: no pork, no alcohol - gwapa excluded).
// Anchors: seswaa, ditsama, dikgokgo, mofuo, bogobe, diphwue, phwue, morogo,
// tsimologo, kgaare/morula, mongongo, tsa-dine, vetkoek, magwinya, Okavango fish.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, protein, carbs, fat) => {
  const cal_100 = Math.round(4 * protein + 4 * carbs + 9 * fat);
  return { name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat };
};

const dishes = [];
const T = 'بوتسواناوي أصيل';

// --- breakfast_items (14) ----------------------------------------------------
dishes.push(
  R(`بوغوبي بالموروغو ${T}`, 'Bogobe with morogo Botswanan', 'Bogobe au morogo botswanane', 'Bogobe con morogo botswanés', 'Bogobe mit Morogo botswanisch', 'breakfast_items', 'breakfast', 'pan_botswanan', 6, 30, 4),
  R(`باب بأوراق البطيخ ${T}`, 'Pap with melon leaves Botswanan', 'Pap aux feuilles de melon botswanane', 'Pap con hojas de melón botswanés', 'Pap mit Melonenblättern botswanisch', 'breakfast_items', 'breakfast', 'pan_botswanan', 5, 28, 3),
  R(`ديفويي بالتسيمولوغو ${T}`, 'Diphwue with tsimologo Botswanan', 'Diphwue au tsimologo botswanane', 'Diphwue con tsimologo botswanés', 'Diphwue mit Tsimologo botswanisch', 'breakfast_items', 'breakfast', 'pan_botswanan', 12, 26, 7),
  R(`فويي بأوراق البطيخ ${T}`, 'Phwue with melon leaves Botswanan', 'Phwue aux feuilles de melon botswanane', 'Phwue con hojas de melón botswanés', 'Phwue mit Melonenblättern botswanisch', 'breakfast_items', 'breakfast', 'pan_botswanan', 5, 27, 3),
  R(`موروغو بالموز ${T}`, 'Morogo with banana Botswanan', 'Morogo à la banane botswanane', 'Morogo con plátano botswanés', 'Morogo mit Banane botswanisch', 'breakfast_items', 'breakfast', 'pan_botswanan', 5, 14, 4),
  R(`تسيمولوغو بالموز ${T}`, 'Tsimologo with banana Botswanan', 'Tsimologo à la banane botswanane', 'Tsimologo con plátano botswanés', 'Tsimologo mit Banane botswanisch', 'breakfast_items', 'breakfast', 'pan_botswanan', 24, 10, 11),
  R(`فيتكويك بالشاتني ${T}`, 'Vetkoek with chutney Botswanan', 'Vetkoek au chutney botswanane', 'Vetkoek con chutney botswanés', 'Vetkoek mit Chutney botswanisch', 'breakfast_items', 'breakfast', 'gaborone', 5, 40, 13),
  R(`ماغوينيا بالريليش ${T}`, 'Magwinya with relish Botswanan', 'Magwinya à la relish botswanane', 'Magwinya con ensalada botswanés', 'Magwinya mit Relish botswanisch', 'breakfast_items', 'breakfast', 'gaborone', 4, 36, 15),
  R(`تسا ديني بالعسل ${T}`, 'Tsa-dine with honey Botswanan', 'Tsa-dine au miel botswanane', 'Tsa-dine con miel botswanés', 'Tsa-dine mit Honig botswanisch', 'breakfast_items', 'breakfast', 'pan_botswanan', 2, 18, 3),
  R(`كغاري بالعسل ${T}`, 'Kgaare with honey Botswanan', 'Kgaare au miel botswanane', 'Kgaare con miel botswanés', 'Kgaare mit Honig botswanisch', 'breakfast_items', 'breakfast', 'pan_botswanan', 2, 28, 1),
  R(`مورولا بالعسل ${T}`, 'Morula with honey Botswanan', 'Morula au miel botswanane', 'Morula con miel botswanés', 'Morula mit Honig botswanisch', 'breakfast_items', 'breakfast', 'pan_botswanan', 2, 26, 1),
  R(`مونغونغو بالعسل ${T}`, 'Mongongo with honey Botswanan', 'Mongongo au miel botswanane', 'Mongongo con miel botswanés', 'Mongongo mit Honig botswanisch', 'breakfast_items', 'breakfast', 'pan_botswanan', 16, 14, 42),
  R(`بابايا ${T}`, 'Papaya Botswanan', 'Papaye botswanane', 'Papaya botswanés', 'Papaya botswanisch', 'breakfast_items', 'breakfast', 'pan_botswanan', 1, 12, 0),
  R(`مانجو ${T}`, 'Mango Botswanan', 'Mangue botswanane', 'Mango botswanés', 'Mango botswanisch', 'breakfast_items', 'breakfast', 'pan_botswanan', 1, 15, 0),
);
// --- breads_flatbreads (16) -------------------------------------------------
dishes.push(
  R(`فيتكويك ${T}`, 'Vetkoek Botswanan', 'Vetkoek botswanane', 'Vetkoek botswanés', 'Vetkoek botswanisch', 'breads_flatbreads', 'lunch', 'gaborone', 6, 42, 14),
  R(`ماغوينيا ${T}`, 'Magwinya Botswanan', 'Magwinya botswanane', 'Magwinya botswanés', 'Magwinya botswanisch', 'breads_flatbreads', 'lunch', 'gaborone', 5, 38, 17),
  R(`باب بالموروغو ${T}`, 'Pap with morogo Botswanan', 'Pap au morogo botswanane', 'Pap con morogo botswanés', 'Pap mit Morogo botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 5, 27, 3),
  R(`بوغوبي بالثوم ${T}`, 'Bogobe with garlic Botswanan', 'Bogobe à l ail botswanane', 'Bogobe con ajo botswanés', 'Bogobe mit Knoblauch botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 6, 30, 4),
  R(`ديفويي بالموروغو ${T}`, 'Diphwue with morogo Botswanan', 'Diphwue au morogo botswanane', 'Diphwue con morogo botswanés', 'Diphwue mit Morogo botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 5, 29, 3),
  R(`فويي بالموروغو ${T}`, 'Phwue with morogo Botswanan', 'Phwue au morogo botswanane', 'Phwue con morogo botswanés', 'Phwue mit Morogo botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 5, 28, 3),
  R(`موروغو بالباب ${T}`, 'Morogo with pap Botswanan', 'Morogo au pap botswanane', 'Morogo con pap botswanés', 'Morogo mit Pap botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 5, 27, 3),
  R(`تسيمولوغو بالباب ${T}`, 'Tsimologo with pap Botswanan', 'Tsimologo au pap botswanane', 'Tsimologo con pap botswanés', 'Tsimologo mit Pap botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 17, 24, 7),
  R(`كغاري بالباب ${T}`, 'Kgaare with pap Botswanan', 'Kgaare au pap botswanane', 'Kgaare con pap botswanés', 'Kgaare mit Pap botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 3, 24, 2),
  R(`مورولا بالباب ${T}`, 'Morula with pap Botswanan', 'Morula au pap botswanane', 'Morula con pap botswanés', 'Morula mit Pap botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 3, 22, 2),
  R(`مونغونغو بالباب ${T}`, 'Mongongo with pap Botswanan', 'Mongongo au pap botswanane', 'Mongongo con pap botswanés', 'Mongongo mit Pap botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 10, 26, 18),
  R(`بطيخ بالباب ${T}`, 'Watermelon with pap Botswanan', 'Pastèque au pap botswanane', 'Sandía con pap botswanés', 'Wassermelone mit Pap botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 1, 12, 0),
  R(`تسا ديني بالباب ${T}`, 'Tsa-dine with pap Botswanan', 'Tsa-dine au pap botswanane', 'Tsa-dine con pap botswanés', 'Tsa-dine mit Pap botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 2, 16, 3),
  R(`موز بالباب ${T}`, 'Banana with pap Botswanan', 'Banane au pap botswanane', 'Plátano con pap botswanés', 'Banane mit Pap botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 2, 30, 1),
  R(`بابايا بالباب ${T}`, 'Papaya with pap Botswanan', 'Papaye au pap botswanane', 'Papaya con pap botswanés', 'Papaya mit Pap botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 1, 20, 0),
  R(`مانجو بالباب ${T}`, 'Mango with pap Botswanan', 'Mangue au pap botswanane', 'Mango con pap botswanés', 'Mango mit Pap botswanisch', 'breads_flatbreads', 'lunch', 'pan_botswanan', 1, 22, 0),
);
// --- grains_pap (12) --------------------------------------------------------
dishes.push(
  R(`بوغوبي ${T}`, 'Bogobe Botswanan', 'Bogobe botswanane', 'Bogobe botswanés', 'Bogobe botswanisch', 'grains_pap', 'lunch', 'pan_botswanan', 8, 55, 2),
  R(`باب ${T}`, 'Pap Botswanan', 'Pap botswanane', 'Pap botswanés', 'Pap botswanisch', 'grains_pap', 'lunch', 'pan_botswanan', 7, 50, 2),
  R(`ديفويي ${T}`, 'Diphwue Botswanan', 'Diphwue botswanane', 'Diphwue botswanés', 'Diphwue botswanisch', 'grains_pap', 'lunch', 'pan_botswanan', 8, 52, 2),
  R(`فويي ${T}`, 'Phwue Botswanan', 'Phwue botswanane', 'Phwue botswanés', 'Phwue botswanisch', 'grains_pap', 'lunch', 'pan_botswanan', 7, 48, 2),
  R(`بوغوبي بالسمسم ${T}`, 'Bogobe with sesame Botswanan', 'Bogobe au sésame botswanane', 'Bogobe con sésamo botswanés', 'Bogobe mit Sesam botswanisch', 'grains_pap', 'lunch', 'molepoloni', 8, 54, 4),
  R(`باب بالسمسم ${T}`, 'Pap with sesame Botswanan', 'Pap au sésame botswanane', 'Pap con sésamo botswanés', 'Pap mit Sesam botswanisch', 'grains_pap', 'lunch', 'palapye', 7, 49, 4),
  R(`ديفويي بالسمسم ${T}`, 'Diphwue with sesame Botswanan', 'Diphwue au sésame botswanane', 'Diphwue con sésamo botswanés', 'Diphwue mit Sesam botswanisch', 'grains_pap', 'lunch', 'kanye', 8, 51, 4),
  R(`فويي بالسمسم ${T}`, 'Phwue with sesame Botswanan', 'Phwue au sésame botswanane', 'Phwue con sésamo botswanés', 'Phwue mit Sesam botswanisch', 'grains_pap', 'lunch', 'jwaneng', 7, 47, 4),
  R(`بوغوبي بالزنجبيل ${T}`, 'Bogobe with ginger Botswanan', 'Bogobe au gingembre botswanane', 'Bogobe con jengibre botswanés', 'Bogobe mit Ingwer botswanisch', 'grains_pap', 'lunch', 'pan_botswanan', 8, 54, 3),
  R(`باب بالزنجبيل ${T}`, 'Pap with ginger Botswanan', 'Pap au gingembre botswanane', 'Pap con jengibre botswanés', 'Pap mit Ingwer botswanisch', 'grains_pap', 'lunch', 'pan_botswanan', 7, 49, 3),
  R(`ديفويي بالزنجبيل ${T}`, 'Diphwue with ginger Botswanan', 'Diphwue au gingembre botswanane', 'Diphwue con jengibre botswanés', 'Diphwue mit Ingwer botswanisch', 'grains_pap', 'lunch', 'pan_botswanan', 8, 51, 3),
  R(`فويي بالزنجبيل ${T}`, 'Phwue with ginger Botswanan', 'Phwue au gingembre botswanane', 'Phwue con jengibre botswanés', 'Phwue mit Ingwer botswanisch', 'grains_pap', 'lunch', 'pan_botswanan', 7, 47, 3),
);
// --- dals_legumes (14) ------------------------------------------------------
dishes.push(
  R(`فول مدمس ${T}`, 'Mashed beans Botswanan', 'Haricots écrasés botswananes', 'Frijoles majadas botswanesas', 'Stampfbohnen botswanisch', 'dals_legumes', 'lunch', 'pan_botswanan', 8, 22, 6),
  R(`عدس أحمر ${T}`, 'Red lentils Botswanan', 'Lentilles corail botswananes', 'Lentejas rojas botswanesas', 'Rote Linsen botswanisch', 'dals_legumes', 'lunch', 'pan_botswanan', 9, 20, 2),
  R(`فول سوداني محمص ${T}`, 'Roasted groundnuts Botswanan', 'Arachides grillées botswananes', 'Cacahuetes tostadas botswanesas', 'Geröstete Erdnüsse botswanisch', 'dals_legumes', 'snacks', 'pan_botswanan', 25, 10, 45),
  R(`حمص مطبوخ ${T}`, 'Chickpeas Botswanan', 'Pois chiches cuits botswanane', 'Garbanzos cocidos botswaneses', 'Gekochte Kichererbsen botswanisch', 'dals_legumes', 'lunch', 'pan_botswanan', 9, 27, 3),
  R(`فاصولياء بيضاء ${T}`, 'White beans Botswanan', 'Haricots blancs botswananes', 'Alubias blancas botswanesas', 'Weiße Bohnen botswanisch', 'dals_legumes', 'lunch', 'pan_botswanan', 9, 24, 2),
  R(`عدس بهار ${T}`, 'Spiced lentils Botswanan', 'Lentilles aux épices botswananes', 'Lentejas con especias botswanesas', 'Gewürzlinsen botswanisch', 'dals_legumes', 'lunch', 'pan_botswanan', 9, 23, 4),
  R(`لوبيا حمراء ${T}`, 'Red kidney beans Botswanan', 'Haricots rouges botswananes', 'Alubias rojas botswanesas', 'Rote Kidneybohnen botswanisch', 'dals_legumes', 'lunch', 'pan_botswanan', 9, 24, 2),
  R(`بازلاء مطبوخة ${T}`, 'Cooked peas Botswanan', 'Petits pois cuits botswanane', 'Guisantes cocidos botswaneses', 'Gekochte Erbsen botswanisch', 'dals_legumes', 'lunch', 'pan_botswanan', 6, 18, 2),
  R(`حمص بالطحينة ${T}`, 'Chickpeas with tahini Botswanan', 'Pois chiches au tahini botswanane', 'Garbanzos con tahini botswaneses', 'Kichererbsen mit Tahini botswanisch', 'dals_legumes', 'lunch', 'pan_botswanan', 10, 24, 10),
  R(`عدس بالبرغل ${T}`, 'Lentils with bulgur Botswanan', 'Lentilles au boulgour botswanane', 'Lentejas con bulgur botswanesas', 'Linsen mit Bulgur botswanisch', 'dals_legumes', 'lunch', 'pan_botswanan', 9, 32, 3),
  R(`فول بالسمن ${T}`, 'Beans with ghee Botswanan', 'Haricots au ghee botswanane', 'Alubias con ghee botswanesas', 'Bohnen mit Ghee botswanisch', 'dals_legumes', 'lunch', 'pan_botswanan', 8, 22, 9),
  R(`فول مجفف ${T}`, 'Dried beans Botswanan', 'Haricots secs botswanane', 'Alubias secas botswanesas', 'Trockenbohnen botswanisch', 'dals_legumes', 'lunch', 'pan_botswanan', 22, 60, 2),
  R(`فول بالزيت ${T}`, 'Beans in oil Botswanan', 'Haricots à l huile botswanane', 'Alubias fritas en aceite botswanesas', 'Bohnen in Öl botswanisch', 'dals_legumes', 'snacks', 'pan_botswanan', 8, 16, 12),
  R(`فول بالسمن والفلفل ${T}`, 'Beans with ghee and pepper Botswanan', 'Haricots au ghee et poivre botswanane', 'Alubias con ghee y pimienta botswanesas', 'Bohnen mit Ghee und Pfeffer botswanisch', 'dals_legumes', 'snacks', 'pan_botswanan', 8, 18, 12),
);
// --- morogo_greens (14) -----------------------------------------------------
dishes.push(
  R(`موروغو ${T}`, 'Morogo Botswanan', 'Morogo botswanane', 'Morogo botswanés', 'Morogo botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 5, 8, 4),
  R(`موروغو المورولا ${T}`, 'Marula morogo Botswanan', 'Morogo à la morula botswanane', 'Morogo de morula botswanés', 'Morula-Morogo botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 5, 9, 4),
  R(`موروغو المونغونغو ${T}`, 'Mongongo morogo Botswanan', 'Morogo au mongongo botswanane', 'Morogo de mongongo botswanés', 'Mongongo-Morogo botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 6, 8, 9),
  R(`موروغو ديد الموباني ${T}`, 'Mopane worm morogo Botswanan', 'Morogo aux larves de mopane botswanane', 'Morogo con orugues de mopane botswanés', 'Mopane-Raupen-Morogo botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 14, 7, 8),
  R(`موروغو بأوراق البطيخ ${T}`, 'Morogo with melon leaves Botswanan', 'Morogo aux feuilles de melon botswanane', 'Morogo con hojas de melón botswanés', 'Morogo mit Melonenblättern botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 5, 9, 4),
  R(`موروغو بالزيت ${T}`, 'Morogo with oil Botswanan', 'Morogo à l huile botswanane', 'Morogo en aceite botswanés', 'Morogo mit Öl botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 5, 8, 6),
  R(`موروغو ببوغوبي ${T}`, 'Morogo with bogobe Botswanan', 'Morogo au bogobe botswanane', 'Morogo con bogobe botswanés', 'Morogo mit Bogobe botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 6, 30, 4),
  R(`موروغو بديفويي ${T}`, 'Morogo with diphwue Botswanan', 'Morogo au diphwue botswanane', 'Morogo con diphwue botswanés', 'Morogo mit Diphwue botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 5, 28, 3),
  R(`موروغو بفويي ${T}`, 'Morogo with phwue Botswanan', 'Morogo au phwue botswanane', 'Morogo con phwue botswanés', 'Morogo mit Phwue botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 5, 27, 3),
  R(`موروغو بالثوم ${T}`, 'Morogo with garlic Botswanan', 'Morogo à l ail botswanane', 'Morogo con ajo botswanés', 'Morogo mit Knoblauch botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 5, 8, 5),
  R(`موروغو بالزنجبيل ${T}`, 'Morogo with ginger Botswanan', 'Morogo au gingembre botswanane', 'Morogo con jengibre botswanés', 'Morogo mit Ingwer botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 5, 8, 5),
  R(`موروغو بالفلفل ${T}`, 'Morogo with pepper Botswanan', 'Morogo au poivre botswanane', 'Morogo con pimienta botswanés', 'Morogo mit Pfeffer botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 5, 8, 5),
  R(`موروغو بالليمون ${T}`, 'Morogo with lemon Botswanan', 'Morogo au citron botswanane', 'Morogo con limón botswanés', 'Morogo mit Zitrone botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 5, 8, 5),
  R(`موروغو بالعسل ${T}`, 'Morogo with honey Botswanan', 'Morogo au miel botswanane', 'Morogo con miel botswanés', 'Morogo mit Honig botswanisch', 'morogo_greens', 'lunch', 'pan_botswanan', 5, 10, 4),
);
// --- vegetarian_mains (18) --------------------------------------------------
dishes.push(
  R(`قرع بالجوزة ${T}`, 'Squash with coconut Botswanan', 'Courges à la noix de coco botswananes', 'Calabaza con coco botswanés', 'Kürbis mit Kokos botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 4, 16, 9),
  R(`طاجين الخضار ${T}`, 'Vegetable tagine Botswanan', 'Tajine de légumes botswanane', 'Tajín de verduras botswanés', 'Gemüse-Tajine botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 4, 22, 9),
  R(`كوسة محمصة ${T}`, 'Roasted courgette Botswanan', 'Courgette rôtie botswanane', 'Calabacín asado botswanés', 'Geröstete Zucchini botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 3, 9, 6),
  R(`باذنجان بالجوزة ${T}`, 'Aubergine with coconut Botswanan', 'Aubergine à la noix de coco botswanane', 'Berenjena con coco botswanés', 'Aubergine mit Kokos botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 3, 12, 10),
  R(`قرع محمص بالسمسم ${T}`, 'Roasted squash with sesame Botswanan', 'Courges rôties au sésame botswananes', 'Calabaza asada con sésamo botswanés', 'Gerösteter Kürbis mit Sesam botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 5, 18, 9),
  R(`سبانخ بالسمن ${T}`, 'Spinach with ghee Botswanan', 'Épinards au ghee botswanane', 'Espinacas con ghee botswanes', 'Spinat mit Ghee botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 5, 8, 13),
  R(`طاجين الفاصولياء ${T}`, 'Bean tagine Botswanan', 'Tajine aux haricots botswanane', 'Tajín de judías botswanés', 'Bohnen-Tajine botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 9, 26, 8),
  R(`خضار بالكسكسو ${T}`, 'Vegetables with couscous Botswanan', 'Légumes au couscous botswanane', 'Verduras con cuscús botswanés', 'Gemüse mit Couscous botswanisch', 'vegetarian_mains', 'lunch', 'francistown', 5, 34, 6),
  R(`قرع بالتمر ${T}`, 'Squash with dates Botswanan', 'Courges aux dattes botswananes', 'Calabaza con dátiles botswanés', 'Kürbis mit Datteln botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 4, 24, 6),
  R(`بامية بالسمسم ${T}`, 'Okra with sesame Botswanan', 'Okra au sésame botswanane', 'Okra con sésamo botswanés', 'Okra mit Sesam botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 5, 14, 9),
  R(`جزر مقلي ${T}`, 'Fried carrot Botswanan', 'Carottes frites botswananes', 'Zanahorias fritas botswanes', 'Frittierte Karotten botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 2, 14, 8),
  R(`لفائف الملفوف ${T}`, 'Cabbage rolls Botswanan', 'Rouleaux de chou botswanane', 'Rollos de col botswanes', 'Kohlrollen botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 6, 20, 8),
  R(`فطر مشوي ${T}`, 'Grilled mushrooms Botswanan', 'Champignons grillés botswanane', 'Hongos a la parrilla botswanes', 'Gegrillte Pilze botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 4, 6, 7),
  R(`طماطم مشوية ${T}`, 'Roasted tomato Botswanan', 'Tomates rôties botswananes', 'Tomates asadas botswanes', 'Geröstete Tomaten botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 2, 8, 1),
  R(`بطاطا مشوية ${T}`, 'Roast potato Botswanan', 'Pommes de terre rôties botswananes', 'Patatas asadas botswanes', 'Gebratene Kartoffel botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 2, 20, 0),
  R(`بطاطا مقلية ${T}`, 'French fries Botswanan', 'Frites de pomme de terre botswananes', 'Patatas fritas botswanes', 'Pommes frites botswanisch', 'vegetarian_mains', 'snacks', 'african_shared', 3, 30, 13),
  R(`خضار مشوية ${T}`, 'Grilled vegetables Botswanan', 'Légumes grillés botswanane', 'Verduras a la parrilla botswanes', 'Gegrilltes Gemüse botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 3, 10, 5),
  R(`خضار بالزيت ${T}`, 'Vegetables in oil Botswanan', 'Légumes à l huile botswanane', 'Verduras en aceite botswanes', 'Gemüse in Öl botswanisch', 'vegetarian_mains', 'lunch', 'pan_botswanan', 3, 12, 8),
);
// --- poultry_mains (10) -----------------------------------------------------
dishes.push(
  R(`دجاج مشوي بالثوم ${T}`, 'Grilled chicken with garlic Botswanan', 'Poulet grillé à l ail botswanane', 'Pollo a la parrilla con ajo botswanés', 'Grillhähnchen mit Knoblauch botswanisch', 'poultry_mains', 'lunch', 'pan_botswanan', 22, 3, 12),
  R(`دجاج مقلي ${T}`, 'Fried chicken Botswanan', 'Poulet frit botswanane', 'Pollo frito botswanés', 'Frittiertes Hähnchen botswanisch', 'poultry_mains', 'lunch', 'pan_botswanan', 21, 8, 15),
  R(`دجاج بالليمون والثوم ${T}`, 'Chicken with lemon and garlic Botswanan', 'Poulet au citron et à l ail botswanane', 'Pollo con limón y ajo botswanés', 'Huhn mit Zitrone und Knoblauch botswanisch', 'poultry_mains', 'lunch', 'gaborone', 20, 3, 11),
  R(`أسياخ دجاج ${T}`, 'Chicken skewers Botswanan', 'Brochettes de poulet botswananes', 'Pinchos de pollo botswaneses', 'Hähnchenspieße botswanisch', 'poultry_mains', 'lunch', 'gaborone', 20, 2, 10),
  R(`كبد دجاج مشوي ${T}`, 'Grilled chicken liver Botswanan', 'Foie de poulet grillé botswanane', 'Hígado de pollo a la parrilla botswanés', 'Gegrillte Hähnchenleber botswanisch', 'poultry_mains', 'lunch', 'pan_botswanan', 19, 2, 9),
  R(`دجاج بالحار ${T}`, 'Spicy chicken Botswanan', 'Poulet épicé botswanane', 'Pollo picante botswanés', 'Scharfes Hähnchen botswanisch', 'poultry_mains', 'lunch', 'pan_botswanan', 20, 4, 13),
  R(`دجاج بالقرفة ${T}`, 'Chicken with cinnamon Botswanan', 'Poulet à la cannelle botswanane', 'Pollo con canela botswanés', 'Huhn mit Zimt botswanisch', 'poultry_mains', 'lunch', 'pan_botswanan', 20, 4, 12),
  R(`دجاج بالزنجبيل ${T}`, 'Chicken with ginger Botswanan', 'Poulet au gingembre botswanane', 'Pollo con jengibre botswanés', 'Huhn mit Ingwer botswanisch', 'poultry_mains', 'lunch', 'pan_botswanan', 20, 3, 11),
  R(`أسياخ دجاج بالثوم ${T}`, 'Garlic chicken skewers Botswanan', 'Brochettes de poulet à l ail botswananes', 'Pinchos de pollo con ajo botswaneses', 'Knoblauch-Hähnchenspieße botswanisch', 'poultry_mains', 'lunch', 'francistown', 20, 2, 10),
  R(`دجاج مشوي بالليمون ${T}`, 'Grilled lemon chicken Botswanan', 'Poulet grillé au citron botswanane', 'Pollo a la parrilla con limón botswanés', 'Gegrilltes Zitronenhähnchen botswanisch', 'poultry_mains', 'lunch', 'maun', 21, 2, 11),
);
// --- meat_mains (22) --------------------------------------------------------
dishes.push(
  R(`لحم بقر مشوي بالثوم ${T}`, 'Grilled beef with garlic Botswanan', 'Boeuf grillé à l ail botswanane', 'Carne de res a la parrilla con ajo botswanés', 'Gegrilltes Rindfleisch mit Knoblauch botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 24, 2, 14),
  R(`لحم ماعز مشوي بالليمون ${T}`, 'Grilled goat with lemon Botswanan', 'Chevreau grillé au citron botswanane', 'Cabra a la parrilla con limón botswanés', 'Gegrilltes Ziegenfleisch mit Zitrone botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 20, 2, 13),
  R(`أسياخ لحم بقر ${T}`, 'Beef skewers Botswanan', 'Brochettes de boeuf botswananes', 'Pinchos de carne de res botswaneses', 'Rindfleischspieße botswanisch', 'meat_mains', 'lunch', 'gaborone', 23, 2, 12),
  R(`لحم بقر بالمشاوي ${T}`, 'Beef with barbecue sauce Botswanan', 'Boeuf à la sauce barbecue botswanane', 'Carne de res con salsa barbacoa botswanés', 'Rindfleisch mit Barbecuesauce botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 22, 8, 14),
  R(`لحم غنم بالقرفة ${T}`, 'Lamb with cinnamon Botswanan', 'Agneau à la cannelle botswanane', 'Cordero con canela botswanés', 'Lamm mit Zimt botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 20, 3, 15),
  R(`لحم بقر مقلي ${T}`, 'Fried beef Botswanan', 'Boeuf frit botswanane', 'Carne de res frita botswanés', 'Frittiertes Rindfleisch botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 23, 8, 16),
  R(`لحم بقر بالزنجبيل ${T}`, 'Beef with ginger Botswanan', 'Boeuf au gingembre botswanane', 'Carne de res con jengibre botswanés', 'Rindfleisch mit Ingwer botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 22, 3, 13),
  R(`كبد بقر مشوي ${T}`, 'Grilled beef liver Botswanan', 'Foie de boeuf grillé botswanane', 'Hígado de res a la parrilla botswanés', 'Gegrillte Rinderleber botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 20, 2, 10),
  R(`لحم بقر بالبصل والبهارات ${T}`, 'Beef with onion and spices Botswanan', 'Boeuf aux oignons et épices botswanane', 'Carne de res con cebolla y especias botswanés', 'Rindfleisch mit Zwiebeln und Gewürzen botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 22, 5, 13),
  R(`لحم غنم مشوي ${T}`, 'Grilled lamb Botswanan', 'Agneau grillé botswanane', 'Cordero a la parrilla botswanés', 'Gegrilltes Lamm botswanisch', 'meat_mains', 'lunch', 'serowe', 21, 2, 15),
  R(`شريحة لحم بقر مشوية ${T}`, 'Grilled beef steak Botswanan', 'Steak de boeuf grillé botswanane', 'Filete de res a la parrilla botswanés', 'Gegrilltes Rindsteak botswanisch', 'meat_mains', 'lunch', 'gaborone', 24, 1, 13),
  R(`لحم بقر بالسمن ${T}`, 'Beef with ghee Botswanan', 'Boeuf au ghee botswanane', 'Carne de res con ghee botswanés', 'Rindfleisch mit Ghee botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 22, 2, 15),
  R(`لحم بقر بالفلفل الحار ${T}`, 'Beef with hot pepper Botswanan', 'Boeuf au piment fort botswanane', 'Carne de res con chile picante botswanés', 'Rindfleisch mit scharfer Chili botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 22, 3, 13),
  R(`أسياخ لحم غنم ${T}`, 'Lamb skewers Botswanan', 'Brochettes d agneau botswananes', 'Pinchos de cordero botswaneses', 'Lammspieße botswanisch', 'meat_mains', 'lunch', 'serowe', 21, 2, 13),
  R(`لحم ماعز بالثوم ${T}`, 'Goat with garlic Botswanan', 'Chevreau à l ail botswanane', 'Cabra con ajo botswanés', 'Ziegenfleisch mit Knoblauch botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 19, 2, 12),
  R(`لحم ماعز بالزنجبيل ${T}`, 'Goat with ginger Botswanan', 'Chevreau au gingembre botswanane', 'Cabra con jengibre botswanés', 'Ziegenfleisch mit Ingwer botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 19, 2, 12),
  R(`لحم ماعز بالليمون ${T}`, 'Goat with lemon Botswanan', 'Chevreau au citron botswanane', 'Cabra con limón botswanés', 'Ziegenfleisch mit Zitrone botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 19, 2, 12),
  R(`لحم ماعز بالفلفل ${T}`, 'Goat with pepper Botswanan', 'Chevreau au poivre botswanane', 'Cabra con pimienta botswanés', 'Ziegenfleisch mit Pfeffer botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 19, 2, 12),
  R(`لحم ماعز بالقرفة ${T}`, 'Goat with cinnamon Botswanan', 'Chevreau à la cannelle botswanane', 'Cabra con canela botswanés', 'Ziegenfleisch mit Zimt botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 19, 2, 12),
  R(`لحم ماعز بالعسل ${T}`, 'Goat with honey Botswanan', 'Chevreau au miel botswanane', 'Cabra con miel botswanés', 'Ziegenfleisch mit Honig botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 19, 4, 12),
  R(`لحم ماعز بالثوم والفلفل ${T}`, 'Goat with garlic and pepper Botswanan', 'Chevreau à l ail et au poivre botswanane', 'Cabra con ajo y pimienta botswanés', 'Ziegenfleisch mit Knoblauch und Pfeffer botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 19, 2, 12),
  R(`لحم ماعز بالزنجبيل والليمون ${T}`, 'Goat with ginger and lemon Botswanan', 'Chevreau au gingembre et au citron botswanane', 'Cabra con jengibre y limón botswanés', 'Ziegenfleisch mit Ingwer und Zitrone botswanisch', 'meat_mains', 'lunch', 'pan_botswanan', 19, 2, 12),
);
// --- fish_mains (18) --------------------------------------------------------
dishes.push(
  R(`سمك مشوي بالليمون ${T}`, 'Grilled fish with lemon Botswanan', 'Poisson grillé au citron botswanane', 'Pescado a la parrilla con limón botswanés', 'Gegrillter Fisch mit Zitrone botswanisch', 'fish_mains', 'lunch', 'maun', 20, 1, 8),
  R(`سمك مدخن بالطماطم ${T}`, 'Smoked fish with tomato Botswanan', 'Poisson fumé à la tomate botswanane', 'Pescado ahumado con tomate botswanés', 'Räucherfisch mit Tomate botswanisch', 'fish_mains', 'lunch', 'pan_botswanan', 18, 5, 9),
  R(`تيلابيا مشوي بالثوم ${T}`, 'Grilled tilapia with garlic Botswanan', 'Tilapia grillé à l ail botswanane', 'Tilapia a la parrilla con ajo botswanés', 'Gegrillte Tilapia mit Knoblauch botswanisch', 'fish_mains', 'lunch', 'maun', 22, 1, 7),
  R(`سمك القط مشوي بالفلفل ${T}`, 'Grilled catfish with pepper Botswanan', 'Silure grillé au poivre botswanane', 'Bagre a la parrilla con pimienta botswanés', 'Gegrillter Wels mit Pfeffer botswanisch', 'fish_mains', 'lunch', 'maun', 20, 1, 7),
  R(`سمك البريم مشوي بالزعتر ${T}`, 'Grilled bream with thyme Botswanan', 'Bar grillé au thym botswanane', 'Dorado a la parrilla con tomillo botswanés', 'Gegrillte Brasse mit Thymian botswanisch', 'fish_mains', 'lunch', 'maun', 21, 1, 7),
  R(`سمك القصب مشوي بالثوم ${T}`, 'Grilled reedfish with garlic Botswanan', 'Poisson de roseau grillé à l ail botswanane', 'Pescado de caña a la parrilla con ajo botswanés', 'Gegrillter Schilffisch mit Knoblauch botswanisch', 'fish_mains', 'lunch', 'maun', 20, 1, 7),
  R(`سمك مملح مشوي ${T}`, 'Grilled salted fish Botswanan', 'Poisson salé grillé botswanane', 'Pescado salado a la parrilla botswanés', 'Gegrillter gesalzener Fisch botswanisch', 'fish_mains', 'lunch', 'pan_botswanan', 20, 1, 8),
  R(`تيلابيا مقلي بالثوم ${T}`, 'Fried tilapia with garlic Botswanan', 'Tilapia frit à l ail botswanane', 'Tilapia frito con ajo botswanés', 'Frittierte Tilapia mit Knoblauch botswanisch', 'fish_mains', 'lunch', 'maun', 19, 10, 13),
  R(`سمك القط مقلي ${T}`, 'Fried catfish Botswanan', 'Silure frit botswanane', 'Bagre frito botswanés', 'Frittierter Wels botswanisch', 'fish_mains', 'lunch', 'maun', 19, 10, 13),
  R(`سمك البريم مقلي ${T}`, 'Fried bream Botswanan', 'Bar frit botswanane', 'Dorado frito botswanés', 'Frittierte Brasse botswanisch', 'fish_mains', 'lunch', 'maun', 19, 10, 13),
  R(`سمك القصب مقلي ${T}`, 'Fried reedfish Botswanan', 'Poisson de roseau frit botswanane', 'Pescado de caña frito botswanés', 'Frittierter Schilffisch botswanisch', 'fish_mains', 'lunch', 'maun', 19, 10, 13),
  R(`سمك في الفرن بالثوم ${T}`, 'Oven-baked fish with garlic Botswanan', 'Poisson au four à l ail botswanane', 'Pescado al horno con ajo botswanés', 'Fisch aus dem Ofen mit Knoblauch botswanisch', 'fish_mains', 'lunch', 'pan_botswanan', 20, 3, 10),
  R(`سمك بالباب ${T}`, 'Fish with pap Botswanan', 'Poisson au pap botswanane', 'Pescado con pap botswanés', 'Fisch mit Pap botswanisch', 'fish_mains', 'lunch', 'pan_botswanan', 16, 22, 6),
  R(`سمك ببوغوبي ${T}`, 'Fish with bogobe Botswanan', 'Poisson au bogobe botswanane', 'Pescado con bogobe botswanés', 'Fisch mit Bogobe botswanisch', 'fish_mains', 'lunch', 'pan_botswanan', 16, 24, 5),
  R(`سمك بديفويي ${T}`, 'Fish with diphwue Botswanan', 'Poisson au diphwue botswanane', 'Pescado con diphwue botswanés', 'Fisch mit Diphwue botswanisch', 'fish_mains', 'lunch', 'pan_botswanan', 16, 23, 5),
  R(`سمك بفويي ${T}`, 'Fish with phwue Botswanan', 'Poisson au phwue botswanane', 'Pescado con phwue botswanés', 'Fisch mit Phwue botswanisch', 'fish_mains', 'lunch', 'pan_botswanan', 16, 22, 5),
  R(`سمك بالموروغو ${T}`, 'Fish with morogo Botswanan', 'Poisson au morogo botswanane', 'Pescado con morogo botswanés', 'Fisch mit Morogo botswanisch', 'fish_mains', 'lunch', 'pan_botswanan', 15, 8, 8),
  R(`سمك مدخن بالباب ${T}`, 'Smoked fish with pap Botswanan', 'Poisson fumé au pap botswanane', 'Pescado ahumado con pap botswanés', 'Räucherfisch mit Pap botswanisch', 'fish_mains', 'lunch', 'pan_botswanan', 15, 20, 6),
);
// --- soups_salads (14) ------------------------------------------------------
dishes.push(
  R(`شوربة الدجاج ${T}`, 'Chicken soup Botswanan', 'Soupe de poulet botswanane', 'Sopa de pollo botswanés', 'Hühnersuppe botswanisch', 'soups_salads', 'lunch', 'pan_botswanan', 9, 8, 14),
  R(`شوربة السمك ${T}`, 'Fish soup Botswanan', 'Soupe de poisson botswanane', 'Sopa de pescado botswanés', 'Fischsuppe botswanisch', 'soups_salads', 'lunch', 'maun', 14, 10, 7),
  R(`شوربة التيلابيا ${T}`, 'Tilapia soup Botswanan', 'Soupe de tilapia botswanane', 'Sopa de tilapia botswanés', 'Tilapiasuppe botswanisch', 'soups_salads', 'lunch', 'maun', 13, 9, 7),
  R(`شوربة سمك القط ${T}`, 'Catfish soup Botswanan', 'Soupe de silure botswanane', 'Sopa de bagre botswanés', 'Welsensuppe botswanisch', 'soups_salads', 'lunch', 'maun', 13, 9, 7),
  R(`شوربة البريم ${T}`, 'Bream soup Botswanan', 'Soupe de bar botswanane', 'Sopa de dorado botswanés', 'Brassensuppe botswanisch', 'soups_salads', 'lunch', 'maun', 13, 9, 7),
  R(`شوربة سمك القصب ${T}`, 'Reedfish soup Botswanan', 'Soupe de poisson de roseau botswanane', 'Sopa de pescado de caña botswanés', 'Schilffischsuppe botswanisch', 'soups_salads', 'lunch', 'maun', 13, 9, 7),
  R(`شوربة العدس بالحار ${T}`, 'Spicy lentil soup Botswanan', 'Soupe de lentilles épicée botswanane', 'Sopa de lentejas picante botswanés', 'Scharfe Linsensuppe botswanisch', 'soups_salads', 'lunch', 'pan_botswanan', 7, 20, 4),
  R(`مرقة اللحم بالبصل ${T}`, 'Meat broth with onion Botswanan', 'Bouillon de viande aux oignons botswanane', 'Caldo de carne con cebolla botswanés', 'Fleischbrühe mit Zwiebeln botswanisch', 'soups_salads', 'lunch', 'pan_botswanan', 9, 6, 7),
  R(`شوربة الفول بالسمن ${T}`, 'Bean soup with ghee Botswanan', 'Soupe de haricots au ghee botswanane', 'Sopa de judías con ghee botswanés', 'Bohnensuppe mit Ghee botswanisch', 'soups_salads', 'lunch', 'pan_botswanan', 7, 20, 8),
  R(`شوربة الطماطم ${T}`, 'Tomato soup Botswanan', 'Soupe de tomate botswanane', 'Sopa de tomate botswanés', 'Tomatensuppe botswanisch', 'soups_salads', 'lunch', 'pan_botswanan', 2, 12, 6),
  R(`سلطة الخضر ${T}`, 'Mixed vegetable salad Botswanan', 'Salade de légumes variée botswanane', 'Ensalada de verduras variadas botswanés', 'Gemischter Gemüsesalat botswanisch', 'soups_salads', 'lunch', 'pan_botswanan', 3, 12, 7),
  R(`سلطة الطماطم بالبصل ${T}`, 'Tomato and onion salad Botswanan', 'Salade de tomates et oignons botswanane', 'Ensalada de tomate y cebolla botswanés', 'Tomaten-Zwiebel-Salat botswanisch', 'soups_salads', 'lunch', 'pan_botswanan', 2, 11, 6),
  R(`سلطة خيار ${T}`, 'Cucumber salad Botswanan', 'Salade de concombre botswanane', 'Ensalada de pepino botswanés', 'Gurkensalat botswanisch', 'soups_salads', 'lunch', 'pan_botswanan', 1, 6, 5),
  R(`سلطة جزر ${T}`, 'Carrot salad Botswanan', 'Salade de carottes botswanane', 'Ensalada de zanahoria botswanés', 'Karottensalat botswanisch', 'soups_salads', 'lunch', 'pan_botswanan', 1, 10, 5),
);
// --- street_snacks (14) -----------------------------------------------------
dishes.push(
  R(`مشاوي لحم ${T}`, 'Beef brochettes Botswanan', 'Brochettes de boeuf botswananes', 'Pinchos de carne de res botswaneses', 'Rindfleisch-Brochettes botswanisch', 'street_snacks', 'snacks', 'gaborone', 22, 3, 13),
  R(`مشاوي دجاج ${T}`, 'Chicken brochettes Botswanan', 'Brochettes de poulet botswananes', 'Pinchos de pollo botswaneses', 'Hähnchen-Brochettes botswanisch', 'street_snacks', 'snacks', 'gaborone', 21, 3, 12),
  R(`مشاوي سمك ${T}`, 'Fish brochettes Botswanan', 'Brochettes de poisson botswananes', 'Pinchos de pescado botswaneses', 'Fisch-Brochettes botswanisch', 'street_snacks', 'snacks', 'maun', 19, 3, 9),
  R(`ساندويتش لحم ${T}`, 'Beef sandwich Botswanan', 'Sandwich au boeuf botswanane', 'Sándwich de carne de res botswanés', 'Rindfleisch-Sandwich botswanisch', 'street_snacks', 'lunch', 'gaborone', 18, 24, 10),
  R(`ساندويتش دجاج ${T}`, 'Chicken sandwich Botswanan', 'Sandwich au poulet botswanane', 'Sándwich de pollo botswanés', 'Hähnchen-Sandwich botswanisch', 'street_snacks', 'lunch', 'gaborone', 17, 24, 9),
  R(`ساندويتش السمك المدخن ${T}`, 'Smoked fish sandwich Botswanan', 'Sandwich au poisson fumé botswanane', 'Sándwich de pescado ahumado botswanés', 'Sandwich mit Räucherfisch botswanisch', 'street_snacks', 'lunch', 'maun', 15, 23, 8),
  R(`فيتكويك بالتمر ${T}`, 'Vetkoek with dates Botswanan', 'Vetkoek aux dattes botswanane', 'Vetkoek con dátiles botswanés', 'Vetkoek mit Datteln botswanisch', 'street_snacks', 'snacks', 'gaborone', 5, 34, 14),
  R(`ماغوينيا بالتمر ${T}`, 'Magwinya with dates Botswanan', 'Magwinya aux dattes botswanane', 'Magwinya con dátiles botswanés', 'Magwinya mit Datteln botswanisch', 'street_snacks', 'snacks', 'gaborone', 5, 34, 14),
  R(`موز مقلي ${T}`, 'Fried plantain Botswanan', 'Banane plantain frite botswanane', 'Plátano frito botswanés', 'Fritierte Kochbanane botswanisch', 'street_snacks', 'snacks', 'pan_botswanan', 2, 30, 12),
  R(`عصير القصب ${T}`, 'Sugarcane juice Botswanan', 'Jus de canne à sucre botswanane', 'Zumo de caña de azúcar botswanés', 'Zuckerrohrsaft botswanisch', 'street_snacks', 'snacks', 'pan_botswanan', 0, 26, 0),
  R(`مكسرات محمصة ${T}`, 'Roasted mixed nuts Botswanan', 'Noix grillées botswananes', 'Frutos secos tostados botswaneses', 'Geröstete Nüsse botswanisch', 'street_snacks', 'snacks', 'pan_botswanan', 18, 12, 40),
  R(`تمر بالسكر ${T}`, 'Dates with sugar Botswanan', 'Dattes au sucre botswananes', 'Dátiles con azúcar botswaneses', 'Datteln mit Zucker botswanisch', 'street_snacks', 'snacks', 'pan_botswanan', 2, 40, 1),
  R(`بيض بالخبز ${T}`, 'Eggs with bread Botswanan', 'Oeufs avec pain botswanane', 'Huevos con pan botswaneses', 'Eier mit Brot botswanisch', 'street_snacks', 'snacks', 'pan_botswanan', 11, 18, 10),
  R(`فطائر الجبن ${T}`, 'Cheese pastries Botswanan', 'Feuilletés au fromage botswanane', 'Empanadillas de queso botswanesas', 'Käsepastete botswanisch', 'street_snacks', 'snacks', 'francistown', 9, 26, 13),
);
// --- condiments (8) ---------------------------------------------------------
dishes.push(
  R(`صلصة الفلفل الحار ${T}`, 'Hot pepper sauce Botswanan', 'Sauce au piment fort botswanane', 'Salsa de chile picante botswanés', 'Scharfe Chilisauce botswanisch', 'condiments', 'lunch', 'pan_botswanan', 2, 8, 6),
  R(`صلصة الفول السوداني ${T}`, 'Groundnut sauce Botswanan', 'Sauce aux arachides botswanane', 'Salsa de cacahuete botswanés', 'Erdnusssauce botswanisch', 'condiments', 'lunch', 'pan_botswanan', 8, 10, 16),
  R(`صلصة السمسم ${T}`, 'Sesame sauce Botswanan', 'Sauce au sésame botswanane', 'Salsa de sésamo botswanés', 'Sesamsauce botswanisch', 'condiments', 'lunch', 'pan_botswanan', 6, 8, 14),
  R(`مخلل البصل ${T}`, 'Onion pickle Botswanan', 'Oignons marinés botswanane', 'Cebollitas encurtidas botswaneses', 'Eingelegte Zwiebeln botswanisch', 'condiments', 'lunch', 'pan_botswanan', 1, 12, 5),
  R(`صلصة الزنجبيل ${T}`, 'Ginger sauce Botswanan', 'Sauce au gingembre botswanane', 'Salsa de jengibre botswanés', 'Ingwersauce botswanisch', 'condiments', 'lunch', 'pan_botswanan', 1, 14, 5),
  R(`صلصة الطماطم ${T}`, 'Tomato sauce Botswanan', 'Sauce de tomate botswanane', 'Salsa de tomate botswanés', 'Tomatensauce botswanisch', 'condiments', 'lunch', 'pan_botswanan', 2, 10, 4),
  R(`صلصة الثوم ${T}`, 'Garlic sauce Botswanan', 'Sauce à l ail botswanane', 'Salsa de ajo botswanés', 'Knoblauchsauce botswanisch', 'condiments', 'lunch', 'pan_botswanan', 2, 8, 5),
  R(`صلصة الليمون ${T}`, 'Lemon sauce Botswanan', 'Sauce au citron botswanane', 'Salsa de limón botswanés', 'Zitronensauce botswanisch', 'condiments', 'lunch', 'pan_botswanan', 1, 8, 4),
);
// --- desserts_sweets (10) ---------------------------------------------------
dishes.push(
  R(`كعك الموز بالعسل ${T}`, 'Honey banana cake Botswanan', 'Gâteau banane au miel botswanane', 'Bizcocho de plátano con miel botswanés', 'Bananenkuchen mit Honig botswanisch', 'desserts_sweets', 'snacks', 'pan_botswanan', 4, 42, 10),
  R(`بسكويت المانوك ${T}`, 'Cassava biscuits Botswanan', 'Biscuits de manioc botswanane', 'Galletas de yuca botswaneses', 'Maniok-Kekse botswanisch', 'desserts_sweets', 'snacks', 'pan_botswanan', 5, 40, 12),
  R(`كيك الشوكولاتة ${T}`, 'Chocolate cake Botswanan', 'Gâteau au chocolat botswanane', 'Bizcocho de chocolate botswanés', 'Schokoladenkuchen botswanisch', 'desserts_sweets', 'snacks', 'gaborone', 5, 40, 14),
  R(`كريب بالتمر ${T}`, 'Sweet crepe with dates Botswanan', 'Crêpe sucrée aux dattes botswanane', 'Crepa dulce con dátiles botswanés', 'Süße Crepes mit Datteln botswanisch', 'desserts_sweets', 'snacks', 'gaborone', 6, 40, 8),
  R(`حلوى جوز الهند ${T}`, 'Coconut candy Botswanan', 'Bonbons à la noix de coco botswanane', 'Caramelo de coco botswanés', 'Kokosbonbons botswanisch', 'desserts_sweets', 'snacks', 'pan_botswanan', 2, 30, 12),
  R(`مثلجات الفاكهة ${T}`, 'Fruit ice cream Botswanan', 'Glace aux fruits botswanane', 'Helado de frutas botswanés', 'Fruchteis botswanisch', 'desserts_sweets', 'snacks', 'gaborone', 2, 24, 10),
  R(`بودينغ المانوك ${T}`, 'Cassava pudding Botswanan', 'Pudding de manioc botswanane', 'Pudin de yuca botswanés', 'Maniokpudding botswanisch', 'desserts_sweets', 'snacks', 'pan_botswanan', 3, 32, 8),
  R(`حلوى التمر والجوز ${T}`, 'Date and coconut sweet Botswanan', 'Confiture de dattes et noix de coco botswanane', 'Dulce de dátiles y coco botswanés', 'Dattel-Kokos-Süßigkeit botswanisch', 'desserts_sweets', 'snacks', 'serowe', 3, 36, 7),
  R(`تارت المانوك ${T}`, 'Cassava tart Botswanan', 'Tarte au manioc botswanane', 'Tarta de yuca botswanés', 'Manioktarte botswanisch', 'desserts_sweets', 'snacks', 'maun', 4, 38, 11),
  R(`كيك المانوك بالشوكولاتة ${T}`, 'Cassava chocolate cake Botswanan', 'Gâteau au manioc et chocolat botswanane', 'Bizcocho de yuca con chocolate botswanés', 'Maniok-Schokoladenkuchen botswanisch', 'desserts_sweets', 'snacks', 'gaborone', 6, 42, 12),
);
// --- beverages (16) ---------------------------------------------------------
dishes.push(
  R(`قهوة بوتسواناوية ${T}`, 'Botswanan coffee', 'Café botswanane', 'Café botswanés', 'Botswanischer Kaffee', 'beverages', 'breakfast', 'pan_botswanan', 2, 3, 3),
  R(`شاي بالحليب ${T}`, 'Milk tea Botswanan', 'Thé au lait botswanane', 'Té con leche botswanés', 'Tee mit Milch botswanisch', 'beverages', 'breakfast', 'pan_botswanan', 2, 12, 3),
  R(`عصير المانجو ${T}`, 'Mango juice Botswanan', 'Jus de mangue botswanane', 'Zumo de mango botswanés', 'Mangosaft botswanisch', 'beverages', 'snacks', 'pan_botswanan', 1, 16, 0),
  R(`عصير الأناناس ${T}`, 'Pineapple juice Botswanan', 'Jus d ananas botswanane', 'Zumo de piña botswanés', 'Ananassaft botswanisch', 'beverages', 'snacks', 'pan_botswanan', 1, 14, 0),
  R(`عصير المورولا ${T}`, 'Morula juice Botswanan', 'Jus de morula botswanane', 'Zumo de morula botswanés', 'Morulasaft botswanisch', 'beverages', 'snacks', 'pan_botswanan', 1, 18, 0),
  R(`عصير الكغاري ${T}`, 'Kgaare juice Botswanan', 'Jus de kgaare botswanane', 'Zumo de kgaare botswanés', 'Kgaare-Saft botswanisch', 'beverages', 'snacks', 'pan_botswanan', 1, 16, 0),
  R(`عصير الموز بالتمر ${T}`, 'Banana and date shake Botswanan', 'Smoothie banane et dattes botswanane', 'Batido de plátano y dátiles botswanés', 'Bananen-Dattel-Shake botswanisch', 'beverages', 'snacks', 'maun', 2, 24, 3),
  R(`شاي بالنعناع ${T}`, 'Mint tea Botswanan', 'Thé à la menthe botswanane', 'Té con menta botswanés', 'Pfefferminztee botswanisch', 'beverages', 'breakfast', 'pan_botswanan', 0, 8, 0),
  R(`قهوة بالحليب ${T}`, 'Coffee with milk Botswanan', 'Café au lait botswanane', 'Café con leche botswanés', 'Kaffee mit Milch botswanisch', 'beverages', 'breakfast', 'pan_botswanan', 3, 12, 3),
  R(`شاي الزنجبيل بالعسل ${T}`, 'Ginger tea with honey Botswanan', 'Thé au gingembre et miel botswanane', 'Té de jengibre con miel botswanés', 'Ingwertee mit Honig botswanisch', 'beverages', 'breakfast', 'pan_botswanan', 0, 12, 1),
  R(`شاي القرفة بالعسل ${T}`, 'Cinnamon honey tea Botswanan', 'Thé à la cannelle et au miel botswanane', 'Té de canela con miel botswanés', 'Zimt-Honigtee botswanisch', 'beverages', 'breakfast', 'pan_botswanan', 0, 14, 1),
  R(`عصير البابايا ${T}`, 'Papaya juice Botswanan', 'Jus de papaye botswanane', 'Zumo de papaya botswanés', 'Papayasaft botswanisch', 'beverages', 'snacks', 'pan_botswanan', 1, 13, 0),
  R(`شاي بالليمون ${T}`, 'Lemon tea Botswanan', 'Thé au citron botswanane', 'Té con limón botswanés', 'Zitronentee botswanisch', 'beverages', 'breakfast', 'pan_botswanan', 0, 11, 0),
  R(`مشروب التمر الهندي ${T}`, 'Tamarind drink Botswanan', 'Boisson de tamarin botswanane', 'Bebida de tamarindo botswanés', 'Tamarindengetränk botswanisch', 'beverages', 'snacks', 'pan_botswanan', 1, 14, 0),
  R(`عصير التمر ${T}`, 'Date juice Botswanan', 'Jus de dattes botswanane', 'Zumo de dátiles botswanés', 'Dattensaft botswanisch', 'beverages', 'snacks', 'pan_botswanan', 1, 28, 0),
  R(`ماء جوز الهند ${T}`, 'Coconut water Botswanan', 'Eau de coco botswanane', 'Agua de coco botswanés', 'Kokoswasser botswanisch', 'beverages', 'snacks', 'maun', 1, 6, 2),
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
const TOKEN = 'بوتسواناوي';
const ASIL = 'أصيل';
const PORK_OR_ALCOHOL = /\bpork\b|\bham\b|\bbacon\b|saucisson|chorizo|jamon|schwein|schinken|wurst|\bwine\b|\bbeer\b|cognac|\brhum\b|cerveza|\bvino\b|\bwein\b|liko|arack|gwapa|بيرة|خمر|نبيذ/i;

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
  path.join(__dirname, 'botswana-200-proposal.json'),
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
console.log(`\nWrote scripts/botswana-200-proposal.json (${dishes.length} dishes)`);
console.log(`Categories (${Object.keys(byCategory).length}): ${Object.keys(byCategory).join(', ')}`);
console.log(`Regions (${Object.keys(byRegion).length}): ${Object.keys(byRegion).join(', ')}`);
console.log(`Meal types: ${Object.keys(byMeal).join(', ')}`);
console.log(`Region distribution: ${JSON.stringify(byRegion)}`);
console.log(`Category distribution: ${JSON.stringify(byCategory)}`);
