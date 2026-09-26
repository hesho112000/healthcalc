// Authoring script for the Pakistani 200-dish proposal (scripts/pakistan-200-proposal.json).
// R(ar, en, fr, es, de, category, mealType, region, cal_100, protein, carbs, fat).
// Macronutrients may be authored explicitly (grams per 100 g); otherwise they are estimated
// from a per-category template. cal_100 is ALWAYS recomputed as round(4P + 4C + 9F) of the
// final macros, so calories and macros are internally consistent and never NULL. Regions:
// pan_pakistani by default (golden rule), regional anchors for famous authentic dishes
// (punjab / sindh / kpk / balochistan / gilgit_baltistan), asian_shared for dishes shared
// across the northern subcontinent. Emphasizes Pakistani staples (biryani variants, nihari,
// haleem, karahi, sajji, chapli kebab, kebabs, naan/paratha, lassi/chai).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat) => ({
  name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat,
});

const dishes = [];

// ============================================================ PAN_PAKISTANI (149)
// --- breakfast_items (17) -----------------------------------------------------
dishes.push(
  R('باراتا ألو سادة باكستانية', 'Plain aloo paratha Pakistani', 'Paratha aloo nature pakistanais', 'Paratha aloo simple paquistaní', 'Pakistanisches einfaches Aloo-Paratha', 'breakfast_items', 'breakfast', 'pan_pakistani', 285),
  R('باراتا بتر لايت باكستانية', 'Butter paratha light Pakistani', 'Paratha au beurre léger pakistanais', 'Paratha con mantequilla ligero paquistaní', 'Pakistanisches leichtes Butter-Paratha', 'breakfast_items', 'breakfast', 'pan_pakistani', 300),
  R('باراتا دال لايت باكستانية', 'Dal paratha light Pakistani', 'Paratha de lentilles léger pakistanais', 'Paratha de lentejas ligero paquistaní', 'Pakistanisches leichtes Dal-Paratha', 'breakfast_items', 'breakfast', 'pan_pakistani', 265),
  R('باراتا بياز لايت باكستانية', 'Onion paratha light Pakistani', 'Paratha à l\'oignon léger pakistanais', 'Paratha de cebolla ligero paquistaní', 'Pakistanisches leichtes Zwiebel-Paratha', 'breakfast_items', 'breakfast', 'pan_pakistani', 270),
  R('باراتا سبزي لايت باكستانية', 'Vegetable paratha light Pakistani', 'Paratha de légumes léger pakistanais', 'Paratha de verduras ligero paquistaní', 'Pakistanisches leichtes Gemüse-Paratha', 'breakfast_items', 'breakfast', 'pan_pakistani', 265),
  R('روتي بيض ماسالا لايت باكستانية', 'Egg masala roti light Pakistani', 'Roti aux œufs et masala léger pakistanais', 'Roti de huevo masala ligero paquistaní', 'Pakistanisches leichtes Eier-Masala-Roti', 'breakfast_items', 'breakfast', 'pan_pakistani', 195),
  R('أومليت ماسالا حار باكستاني', 'Spicy masala omelette Pakistani', 'Omelette masala épicée pakistanaise', 'Tortilla masala picante paquistaní', 'Pakistanisches würziges Masala-Omelett', 'breakfast_items', 'breakfast', 'pan_pakistani', 165),
  R('شانا ماسالا فطار لايت باكستانية', 'Chana masala breakfast light Pakistani', 'Chana masala petit-déjeuner léger pakistanais', 'Chana masala desayuno ligero paquistaní', 'Pakistanisches leichtes Chana-Masala-Frühstück', 'breakfast_items', 'breakfast', 'pan_pakistani', 150),
  R('حليم فطار لايت باكستاني', 'Haleem breakfast light Pakistani', 'Haleem petit-déjeuner léger pakistanais', 'Haleem desayuno ligero paquistaní', 'Pakistanisches leichtes Haleem-Frühstück', 'breakfast_items', 'breakfast', 'pan_pakistani', 145),
  R('دال ماش فطار لايت باكستانية', 'Dal mash breakfast light Pakistani', 'Dal mash petit-déjeuner léger pakistanais', 'Dal mash desayuno ligero paquistaní', 'Pakistanisches leichtes Dal-Mash-Frühstück', 'breakfast_items', 'breakfast', 'pan_pakistani', 130),
  R('سوجي حلوة فطار لايت باكستانية', 'Suji halwa breakfast light Pakistani', 'Halwa de semoule petit-déjeuner léger pakistanais', 'Halwa de sémola desayuno ligero paquistaní', 'Pakistanisches leichtes Suji-Halwa-Frühstück', 'breakfast_items', 'breakfast', 'pan_pakistani', 210),
  R('داليا حلوة لايت باكستانية', 'Sweet dalia light Pakistani', 'Dalia sucré léger pakistanais', 'Dalia dulce ligero paquistaní', 'Pakistanisches leichtes süßes Dalia', 'breakfast_items', 'breakfast', 'pan_pakistani', 140),
  R('أندا بهوجي فطار لايت باكستاني', 'Anda bhurji breakfast light Pakistani', 'Bhurji aux œufs petit-déjeuner léger pakistanais', 'Bhurji de huevo desayuno ligero paquistaní', 'Pakistanisches leichtes Eier-Bhurji-Frühstück', 'breakfast_items', 'breakfast', 'pan_pakistani', 170),
  R('بوري ألو ماسالا لايت باكستانية', 'Aloo masala puri light Pakistani', 'Puri aloo masala léger pakistanais', 'Puri aloo masala ligero paquistaní', 'Pakistanisches leichtes Aloo-Masala-Puri', 'breakfast_items', 'breakfast', 'pan_pakistani', 210),
  R('بوري قيمه لايت باكستانية', 'Qeema puri light Pakistani', 'Puri au qeema léger pakistanais', 'Puri de qeema ligero paquistaní', 'Pakistanisches leichtes Qeema-Puri', 'breakfast_items', 'breakfast', 'pan_pakistani', 220),
  R('شاي دود فطار باكستاني', 'Doodh patti breakfast Pakistani', 'Doodh patti petit-déjeuner pakistanais', 'Doodh patti desayuno paquistaní', 'Pakistanisches Doodh-Patti-Frühstück', 'breakfast_items', 'breakfast', 'pan_pakistani', 90),
  R('ألو تشات فطار لايت باكستانية', 'Aloo chaat breakfast light Pakistani', 'Aloo chaat petit-déjeuner léger pakistanais', 'Aloo chaat desayuno ligero paquistaní', 'Pakistanisches leichtes Aloo-Chaat-Frühstück', 'breakfast_items', 'breakfast', 'pan_pakistani', 150),
);
// --- breads_flatbreads (10) ---------------------------------------------------
dishes.push(
  R('نان شورت باكستاني', 'Short naan Pakistani', 'Naan court pakistanais', 'Naan corto paquistaní', 'Pakistanisches Short-Naan', 'breads_flatbreads', 'lunch', 'pan_pakistani', 245),
  R('نان بيتي باكستاني', 'Naan-e-beti Pakistani', 'Naan-e-beti pakistanais', 'Naan-e-beti paquistaní', 'Pakistanisches Naan-e-Beti', 'breads_flatbreads', 'lunch', 'pan_pakistani', 250),
  R('نان تكري باكستاني', 'Naan-e-takri Pakistani', 'Naan-e-takri pakistanais', 'Naan-e-takri paquistaní', 'Pakistanisches Naan-e-Takri', 'breads_flatbreads', 'lunch', 'pan_pakistani', 255),
  R('نان ثوم لايت باكستاني', 'Garlic naan light Pakistani', 'Naan à l\'ail léger pakistanais', 'Naan de ajo ligero paquistaní', 'Pakistanisches leichtes Knoblauch-Naan', 'breads_flatbreads', 'lunch', 'pan_pakistani', 250),
  R('روتي ماكي لايت باكستانية', 'Makki ki roti light Pakistani', 'Roti de maïs léger pakistanais', 'Roti de maíz ligero paquistaní', 'Pakistanisches leichtes Makki-Ki-Roti', 'breads_flatbreads', 'lunch', 'pan_pakistani', 205),
  R('روتي بيزان لايت باكستانية', 'Besan roti light Pakistani', 'Roti de besan léger pakistanais', 'Roti de besan ligero paquistaní', 'Pakistanisches leichtes Besan-Roti', 'breads_flatbreads', 'lunch', 'pan_pakistani', 185),
  R('كولشا مالح لايت باكستانية', 'Salted kulcha light Pakistani', 'Kulcha salé léger pakistanais', 'Kulcha salado ligero paquistaní', 'Pakistanisches leichtes gesalzenes Kulcha', 'breads_flatbreads', 'lunch', 'pan_pakistani', 215),
  R('فولكا روتي لايت باكستانية', 'Phulka light Pakistani', 'Phulka léger pakistanais', 'Phulka ligero paquistaní', 'Pakistanisches leichtes Phulka', 'breads_flatbreads', 'lunch', 'pan_pakistani', 175),
  R('رومالي روتي لايت باكستانية', 'Roomali roti light Pakistani', 'Roti roomali léger pakistanais', 'Roti roomali ligero paquistaní', 'Pakistanisches leichtes Roomali-Roti', 'breads_flatbreads', 'lunch', 'pan_pakistani', 190),
  R('تافتان مالح لايت باكستاني', 'Salted taftan light Pakistani', 'Taftan salé léger pakistanais', 'Taftan salado ligero paquistaní', 'Pakistanisches leichtes gesalzenes Taftan', 'breads_flatbreads', 'lunch', 'pan_pakistani', 220),
);
// --- rice_biryani (12) --------------------------------------------------------
dishes.push(
  R('برياني كراتشي حار باكستاني', 'Spicy Karachi biryani Pakistani', 'Biryani épicé de Karachi pakistanais', 'Biryani picante de Karachi paquistaní', 'Pakistanisches würziges Karachi-Biryani', 'rice_biryani', 'lunch', 'pan_pakistani', 240),
  R('برياني سندي حار باكستانية', 'Sindhi biryani Pakistani', 'Biryani sindhi pakistanais', 'Biryani sindhi paquistaní', 'Pakistanisches Sindhi-Biryani', 'rice_biryani', 'lunch', 'pan_pakistani', 250),
  R('برياني ميمون باكستانية', 'Memoni biryani Pakistani', 'Biryani memoni pakistanais', 'Biryani memoni paquistaní', 'Pakistanisches Memoni-Biryani', 'rice_biryani', 'lunch', 'pan_pakistani', 245),
  R('برياني ألو مرغ لايت باكستاني', 'Aloo murgh biryani light Pakistani', 'Biryani aloo murgh léger pakistanais', 'Biryani aloo murgh ligero paquistaní', 'Pakistanisches leichtes Aloo-Murgh-Biryani', 'rice_biryani', 'lunch', 'pan_pakistani', 225),
  R('برياني دجاج حيدر آبادي باكستانية', 'Hyderabadi chicken biryani Pakistani', 'Biryani de poulet hyderabadi pakistanais', 'Biryani de pollo hyderabadi paquistaní', 'Pakistanisches Hyderabadi-Hühner-Biryani', 'rice_biryani', 'lunch', 'pan_pakistani', 240),
  R('بلاو يخني لحم لايت باكستاني', 'Yakhni mutton pulao light Pakistani', 'Pulao yakhni à la viande léger pakistanais', 'Pulao yakhni de carne ligero paquistaní', 'Pakistanisches leichtes Yakhni-Fleisch-Pulao', 'rice_biryani', 'lunch', 'pan_pakistani', 215),
  R('بلاو سبزي باكستاني', 'Sabzi pulao Pakistani', 'Pulao de légumes pakistanais', 'Pulao de verduras paquistaní', 'Pakistanisches Gemüse-Pulao', 'rice_biryani', 'lunch', 'pan_pakistani', 175),
  R('بلاو فطر لايت باكستاني', 'Mushroom pulao light Pakistani', 'Pulao aux champignons léger pakistanais', 'Pulao de champiñones ligero paquistaní', 'Pakistanisches leichtes Pilz-Pulao', 'rice_biryani', 'lunch', 'pan_pakistani', 165),
  R('رز بسمتي ماسالا لايت باكستاني', 'Masala basmati rice light Pakistani', 'Riz basmati masala léger pakistanais', 'Arroz basmati masala ligero paquistaní', 'Pakistanischer leichter Masala-Basmati', 'rice_biryani', 'lunch', 'pan_pakistani', 160),
  R('رز كالا زيرا لايت باكستاني', 'Black cumin rice light Pakistani', 'Riz au cumin noir léger pakistanais', 'Arroz de comino negro ligero paquistaní', 'Pakistanischer leichter Schwarzkümmel-Reis', 'rice_biryani', 'lunch', 'pan_pakistani', 150),
  R('تيهري باكستانية لايت', 'Tehari light Pakistani', 'Tehari léger pakistanais', 'Tehari ligero paquistaní', 'Pakistanisches leichtes Tehari', 'rice_biryani', 'lunch', 'pan_pakistani', 210),
  R('بلاو دجاج مشوي لايت باكستاني', 'Grilled chicken pulao light Pakistani', 'Pulao de poulet grillé léger pakistanais', 'Pulao de pollo a la parrilla ligero paquistaní', 'Pakistanisches leichtes gegrilltes Hühner-Pulao', 'rice_biryani', 'lunch', 'pan_pakistani', 200),
);
// --- dals_legumes (8) ---------------------------------------------------------
dishes.push(
  R('دال ماشاني لايت باكستانية', 'Dal mashani light Pakistani', 'Dal mashani léger pakistanais', 'Dal mashani ligero paquistaní', 'Pakistanisches leichtes Dal-Mashani', 'dals_legumes', 'lunch', 'pan_pakistani', 115),
  R('دال مونغ لايت باكستانية', 'Moong dal light Pakistani', 'Dal de moong léger pakistanais', 'Dal de moong ligero paquistaní', 'Pakistanisches leichtes Moong-Dal', 'dals_legumes', 'lunch', 'pan_pakistani', 100),
  R('دال مسور لايت باكستانية', 'Masoor dal light Pakistani', 'Dal masoor léger pakistanais', 'Dal masoor ligero paquistaní', 'Pakistanisches leichtes Masoor-Dal', 'dals_legumes', 'lunch', 'pan_pakistani', 100),
  R('دال أراهار لايت باكستانية', 'Arhar dal light Pakistani', 'Dal arhar léger pakistanais', 'Dal arhar ligero paquistaní', 'Pakistanisches leichtes Arhar-Dal', 'dals_legumes', 'lunch', 'pan_pakistani', 105),
  R('شانا دال مالح باكستانية', 'Salted chana dal Pakistani', 'Chana dal salé pakistanais', 'Chana dal salado paquistaní', 'Pakistanisches gesalzenes Chana-Dal', 'dals_legumes', 'lunch', 'pan_pakistani', 115),
  R('راجما لايت باكستانية', 'Rajma light Pakistani', 'Rajma léger pakistanais', 'Rajma ligero paquistaní', 'Pakistanisches leichtes Rajma', 'dals_legumes', 'lunch', 'pan_pakistani', 160),
  R('لوبيا كاري باكستانية', 'Lobhia curry Pakistani', 'Curry de pois à œil noir pakistanais', 'Curry de frijol de ojo negro paquistaní', 'Pakistanisches Augenbohnen-Curry', 'dals_legumes', 'lunch', 'pan_pakistani', 110),
  R('أوراد دال حار لايت باكستانية', 'Spicy urad dal light Pakistani', 'Urad dal épicé léger pakistanais', 'Urad dal picante ligero paquistaní', 'Pakistanisches leichtes würziges Urad-Dal', 'dals_legumes', 'lunch', 'pan_pakistani', 110),
);
// --- vegetarian_mains (20) ----------------------------------------------------
dishes.push(
  R('ألو ماسالا لايت باكستانية', 'Aloo masala light Pakistani', 'Masala de pommes de terre léger pakistanais', 'Masala de patata ligero paquistaní', 'Pakistanisches leichtes Aloo-Masala', 'vegetarian_mains', 'lunch', 'pan_pakistani', 115),
  R('ألو متار لايت باكستانية', 'Aloo matar light Pakistani', 'Aloo matar léger pakistanais', 'Aloo matar ligero paquistaní', 'Pakistanisches leichtes Aloo-Matar', 'vegetarian_mains', 'lunch', 'pan_pakistani', 130),
  R('متار بانير لايت باكستانية', 'Matar paneer light Pakistani', 'Matar paneer léger pakistanais', 'Matar paneer ligero paquistaní', 'Pakistanisches leichtes Matar-Paneer', 'vegetarian_mains', 'lunch', 'pan_pakistani', 180),
  R('بانير تيكا ماسالا لايت باكستاني', 'Paneer tikka masala light Pakistani', 'Paneer tikka masala léger pakistanais', 'Paneer tikka masala ligero paquistaní', 'Pakistanisches leichtes Paneer-Tikka-Masala', 'vegetarian_mains', 'lunch', 'pan_pakistani', 185),
  R('شانا ماسالا حار لايت باكستانية', 'Spicy chana masala light Pakistani', 'Chana masala épicé léger pakistanais', 'Chana masala picante ligero paquistaní', 'Pakistanisches leichtes würziges Chana-Masala', 'vegetarian_mains', 'lunch', 'pan_pakistani', 140),
  R('سبزي بهارتا لايت باكستانية', 'Sabzi bharta light Pakistani', 'Bharta de légumes léger pakistanais', 'Bharta de verduras ligero paquistaní', 'Pakistanisches leichtes Gemüse-Bharta', 'vegetarian_mains', 'lunch', 'pan_pakistani', 90),
  R('باينغان ماسالا لايت باكستانية', 'Baingan masala light Pakistani', 'Masala d\'aubergine léger pakistanais', 'Masala de berenjena ligero paquistaní', 'Pakistanisches leichtes Auberginen-Masala', 'vegetarian_mains', 'lunch', 'pan_pakistani', 90),
  R('بهيندي بهونا لايت باكستانية', 'Bhindi bhuna light Pakistani', 'Bhindi bhuna léger pakistanais', 'Bhindi bhuna ligero paquistaní', 'Pakistanisches leichtes Bhindi-Bhuna', 'vegetarian_mains', 'lunch', 'pan_pakistani', 85),
  R('كريلا حار لايت باكستانية', 'Karela spicy light Pakistani', 'Karela épicé léger pakistanais', 'Karela picante ligero paquistaní', 'Pakistanisches leichtes würziges Karela', 'vegetarian_mains', 'lunch', 'pan_pakistani', 70),
  R('بالاك ماسالا لايت باكستانية', 'Palak masala light Pakistani', 'Masala d\'épinards léger pakistanais', 'Masala de espinacas ligero paquistaní', 'Pakistanisches leichtes Spinat-Masala', 'vegetarian_mains', 'lunch', 'pan_pakistani', 80),
  R('فطر بهونا لايت باكستاني', 'Mushroom bhuna light Pakistani', 'Bhuna de champignons léger pakistanais', 'Bhuna de champiñones ligero paquistaní', 'Pakistanisches leichtes Pilz-Bhuna', 'vegetarian_mains', 'lunch', 'pan_pakistani', 95),
  R('بطاطا حلوة كاري لايت باكستانية', 'Sweet potato curry light Pakistani', 'Curry de patate douce léger pakistanais', 'Curry de boniato ligero paquistaní', 'Pakistanisches leichtes Süßkartoffel-Curry', 'vegetarian_mains', 'lunch', 'pan_pakistani', 95),
  R('قرنبيط ماسالا لايت باكستانية', 'Cauliflower masala light Pakistani', 'Masala de chou-fleur léger pakistanais', 'Masala de coliflor ligero paquistaní', 'Pakistanisches leichtes Blumenkohl-Masala', 'vegetarian_mains', 'lunch', 'pan_pakistani', 75),
  R('سبزي جوش لايت باكستانية', 'Sabzi josh light Pakistani', 'Sabzi josh léger pakistanais', 'Sabzi josh ligero paquistaní', 'Pakistanisches leichtes Sabzi-Josh', 'vegetarian_mains', 'lunch', 'pan_pakistani', 100),
  R('ميثي ماسالا لايت باكستانية', 'Methi masala light Pakistani', 'Masala de fenugrec léger pakistanais', 'Masala de fenogreco ligero paquistaní', 'Pakistanisches leichtes Methi-Masala', 'vegetarian_mains', 'lunch', 'pan_pakistani', 85),
  R('ساغ مخلوط لايت باكستاني', 'Mixed saag light Pakistani', 'Saag mélangé léger pakistanais', 'Saag mixto ligero paquistaní', 'Pakistanisches leichtes gemischtes Saag', 'vegetarian_mains', 'lunch', 'pan_pakistani', 70),
  R('بالاك بانير لايت باكستانية', 'Palak paneer light Pakistani', 'Palak paneer léger pakistanais', 'Palak paneer ligero paquistaní', 'Pakistanisches leichtes Palak-Paneer', 'vegetarian_mains', 'lunch', 'pan_pakistani', 150),
  R('متار كوفتا لايت باكستانية', 'Matar kofta light Pakistani', 'Kofta de petits pois léger pakistanais', 'Kofta de guisantes ligero paquistaní', 'Pakistanisches leichtes Matar-Kofta', 'vegetarian_mains', 'lunch', 'pan_pakistani', 140),
  R('فاصوليا خضراء ماسالا لايت باكستانية', 'Green beans masala light Pakistani', 'Masala de haricots verts léger pakistanais', 'Masala de judías verdes ligero paquistaní', 'Pakistanisches leichtes Bohnen-Masala', 'vegetarian_mains', 'lunch', 'pan_pakistani', 80),
  R('جزر متار ماسالا لايت باكستانية', 'Carrot pea masala light Pakistani', 'Masala carotte petits pois léger pakistanais', 'Masala zanahoria guisantes ligero paquistaní', 'Pakistanisches leichtes Karotten-Erbsen-Masala', 'vegetarian_mains', 'lunch', 'pan_pakistani', 85),
);
// --- poultry_mains (16) -------------------------------------------------------
dishes.push(
  R('كراهي مخصوص لايت باكستاني', 'Special karahi light Pakistani', 'Karahi spécial léger pakistanais', 'Karahi especial ligero paquistaní', 'Pakistanisches leichtes Spezial-Karahi', 'poultry_mains', 'lunch', 'pan_pakistani', 215),
  R('دجاج كاري ماسالا حار باكستانية', 'Spicy masala chicken curry Pakistani', 'Curry de poulet masala épicé pakistanais', 'Curry de pollo masala picante paquistaní', 'Pakistanisches würziges Masala-Hühner-Curry', 'poultry_mains', 'lunch', 'pan_pakistani', 175),
  R('دجاج زبادي لايت باكستاني', 'Yogurt chicken light Pakistani', 'Poulet au yaourt léger pakistanais', 'Pollo al yogur ligero paquistaní', 'Pakistanisches leichtes Joghurt-Hähnchen', 'poultry_mains', 'lunch', 'pan_pakistani', 155),
  R('دجاج بياز لايت باكستاني', 'Onion chicken light Pakistani', 'Poulet à l\'oignon léger pakistanais', 'Pollo con cebolla ligero paquistaní', 'Pakistanisches leichtes Zwiebel-Hähnchen', 'poultry_mains', 'lunch', 'pan_pakistani', 160),
  R('دجاج تندوري كلاسيك باكستاني', 'Tandoori chicken classic Pakistani', 'Poulet tandoori classique pakistanais', 'Pollo tandoori clásico paquistaní', 'Pakistanisches klassisches Tandoori-Hähnchen', 'poultry_mains', 'lunch', 'pan_pakistani', 185),
  R('دجاج تيكا بتر لايت باكستاني', 'Butter chicken tikka light Pakistani', 'Chicken tikka au beurre léger pakistanais', 'Pollo tikka a la mantequilla ligero paquistaní', 'Pakistanisches leichtes Butter-Chicken-Tikka', 'poultry_mains', 'lunch', 'pan_pakistani', 190),
  R('دجاج أخضر كاري لايت باكستاني', 'Green chicken curry light Pakistani', 'Curry de poulet vert léger pakistanais', 'Curry de pollo verde ligero paquistaní', 'Pakistanisches leichtes grünes Hühner-Curry', 'poultry_mains', 'lunch', 'pan_pakistani', 160),
  R('دجاج بهونا لايت باكستاني', 'Bhuna chicken light Pakistani', 'Poulet bhuna léger pakistanais', 'Pollo bhuna ligero paquistaní', 'Pakistanisches leichtes Bhuna-Hähnchen', 'poultry_mains', 'lunch', 'pan_pakistani', 170),
  R('دجاج حار ماسالا باكستاني', 'Spicy chicken masala Pakistani', 'Poulet masala épicé pakistanais', 'Pollo masala picante paquistaní', 'Pakistanisches würziges Hühner-Masala', 'poultry_mains', 'lunch', 'pan_pakistani', 190),
  R('دجاج كاري بطاطا لايت باكستاني', 'Potato chicken curry light Pakistani', 'Curry de poulet aux pommes de terre léger pakistanais', 'Curry de pollo con patatas ligero paquistaní', 'Pakistanisches leichtes Kartoffel-Hühner-Curry', 'poultry_mains', 'lunch', 'pan_pakistani', 165),
  R('دجاج مشوي ماسالا لايت باكستاني', 'Grilled masala chicken light Pakistani', 'Poulet grillé masala léger pakistanais', 'Pollo a la parrilla masala ligero paquistaní', 'Pakistanisches leichtes gegrilltes Masala-Hähnchen', 'poultry_mains', 'lunch', 'pan_pakistani', 180),
  R('دجاج سبانخ لايت باكستاني', 'Spinach chicken light Pakistani', 'Poulet aux épinards léger pakistanais', 'Pollo con espinacas ligero paquistaní', 'Pakistanisches leichtes Spinat-Hähnchen', 'poultry_mains', 'lunch', 'pan_pakistani', 150),
  R('دجاج تشابلي كباب لايت باكستاني', 'Chicken chapli kebab light Pakistani', 'Kebab chapli de poulet léger pakistanais', 'Kebab chapli de pollo ligero paquistaní', 'Pakistanisches leichtes Hühner-Chapli-Kebab', 'poultry_mains', 'lunch', 'pan_pakistani', 195),
  R('دجاج كاري حيدر آبادي لايت باكستاني', 'Hyderabadi chicken curry light Pakistani', 'Curry de poulet hyderabadi léger pakistanais', 'Curry de pollo hyderabadi ligero paquistaní', 'Pakistanisches leichtes Hyderabadi-Hühner-Curry', 'poultry_mains', 'lunch', 'pan_pakistani', 160),
  R('دجاج بياز ماسالا لايت باكستاني', 'Onion masala chicken light Pakistani', 'Poulet oignon masala léger pakistanais', 'Pollo cebolla masala ligero paquistaní', 'Pakistanisches leichtes Zwiebel-Masala-Hähnchen', 'poultry_mains', 'lunch', 'pan_pakistani', 170),
  R('دجاج تيكا مشوي حار باكستاني', 'Spicy grilled chicken tikka Pakistani', 'Chicken tikka grillé épicé pakistanais', 'Pollo tikka a la parrilla picante paquistaní', 'Pakistanisches würziges gegrilltes Chicken-Tikka', 'poultry_mains', 'lunch', 'pan_pakistani', 195),
);
// --- meat_mains (15) ----------------------------------------------------------
dishes.push(
  R('نهاري لحم بقري لايت باكستاني', 'Beef nihari light Pakistani', 'Nihari de bœuf léger pakistanais', 'Nihari de res ligero paquistaní', 'Pakistanisches leichtes Rindfleisch-Nihari', 'meat_mains', 'lunch', 'pan_pakistani', 195),
  R('حليم لحم لايت باكستاني', 'Beef haleem light Pakistani', 'Haleem de bœuf léger pakistanais', 'Haleem de res ligero paquistaní', 'Pakistanisches leichtes Rindfleisch-Haleem', 'meat_mains', 'lunch', 'pan_pakistani', 185),
  R('كراهي لحم مخصوص باكستاني', 'Special mutton karahi Pakistani', 'Karahi de mouton spécial pakistanais', 'Karahi de cordero especial paquistaní', 'Pakistanisches Spezial-Lamm-Karahi', 'meat_mains', 'lunch', 'pan_pakistani', 250),
  R('قيمه ماسالا لايت باكستانية', 'Keema masala light Pakistani', 'Keema masala léger pakistanais', 'Keema masala ligero paquistaní', 'Pakistanisches leichtes Keema-Masala', 'meat_mains', 'lunch', 'pan_pakistani', 185),
  R('قورمة رويال لايت باكستانية', 'Royal qorma light Pakistani', 'Qorma royal léger pakistanais', 'Qorma real ligero paquistaní', 'Pakistanisches leichtes königliches Qorma', 'meat_mains', 'lunch', 'pan_pakistani', 200),
  R('لحم ضأن ماسالا لايت باكستاني', 'Mutton masala light Pakistani', 'Mouton masala léger pakistanais', 'Cordero masala ligero paquistaní', 'Pakistanisches leichtes Lamm-Masala', 'meat_mains', 'lunch', 'pan_pakistani', 195),
  R('ألو قيمه لايت باكستانية', 'Aloo keema light Pakistani', 'Keema aux pommes de terre léger pakistanais', 'Keema con patatas ligero paquistaní', 'Pakistanisches leichtes Aloo-Keema', 'meat_mains', 'lunch', 'pan_pakistani', 195),
  R('لحم ضأن كاري حار باكستاني', 'Spicy mutton curry Pakistani', 'Curry de mouton épicé pakistanais', 'Curry de cordero picante paquistaní', 'Pakistanisches würziges Lamm-Curry', 'meat_mains', 'lunch', 'pan_pakistani', 200),
  R('روغان جوش لايت باكستاني', 'Rogan josh light Pakistani', 'Rogan josh léger pakistanais', 'Rogan josh ligero paquistaní', 'Pakistanisches leichtes Rogan-Josh', 'meat_mains', 'lunch', 'pan_pakistani', 210),
  R('كباب قيمه لايت باكستاني', 'Qeema kebab light Pakistani', 'Kebab de qeema léger pakistanais', 'Kebab de qeema ligero paquistaní', 'Pakistanisches leichtes Qeema-Kebab', 'meat_mains', 'lunch', 'pan_pakistani', 220),
  R('لحم ضأن سبانخ لايت باكستاني', 'Mutton spinach light Pakistani', 'Mouton aux épinards léger pakistanais', 'Cordero con espinacas ligero paquistaní', 'Pakistanisches leichtes Spinat-Lamm', 'meat_mains', 'lunch', 'pan_pakistani', 185),
  R('لحم بقري ماسالا حار لايت باكستاني', 'Spicy beef masala light Pakistani', 'Bœuf masala épicé léger pakistanais', 'Res masala picante ligera paquistaní', 'Pakistanisches leichtes würziges Rind-Masala', 'meat_mains', 'lunch', 'pan_pakistani', 200),
  R('قيمه بيض لايت باكستانية', 'Keema egg light Pakistani', 'Keema aux œufs léger pakistanais', 'Keema con huevo ligero paquistaní', 'Pakistanisches leichtes Eier-Keema', 'meat_mains', 'lunch', 'pan_pakistani', 190),
  R('لحم ضأن جوز الهند لايت باكستاني', 'Coconut mutton light Pakistani', 'Mouton au coco léger pakistanais', 'Cordero con coco ligero paquistaní', 'Pakistanisches leichtes Kokos-Lamm', 'meat_mains', 'lunch', 'pan_pakistani', 190),
  R('كباب شيش لايت باكستاني', 'Shish kebab light Pakistani', 'Kebab shish léger pakistanais', 'Kebab shish ligero paquistaní', 'Pakistanisches leichtes Shish-Kebab', 'meat_mains', 'lunch', 'pan_pakistani', 230),
);
// --- seafood_mains (8) --------------------------------------------------------
dishes.push(
  R('كاري سمك حار باكستانية', 'Spicy fish curry Pakistani', 'Curry de poisson épicé pakistanais', 'Curry de pescado picante paquistaní', 'Pakistanisches würziges Fisch-Curry', 'seafood_mains', 'lunch', 'pan_pakistani', 140),
  R('سمك تندوري باكستاني', 'Tandoori fish Pakistani', 'Poisson tandoori pakistanais', 'Pescado tandoori paquistaní', 'Pakistanischer Tandoori-Fisch', 'seafood_mains', 'lunch', 'pan_pakistani', 160),
  R('روبيان ماسالا لايت باكستاني', 'Prawn masala light Pakistani', 'Crevettes masala légères pakistanaises', 'Gambas masala ligeras paquistaníes', 'Pakistanische leichte Garnelen-Masala', 'seafood_mains', 'lunch', 'pan_pakistani', 120),
  R('روبيان ثوم لايت باكستاني', 'Garlic prawns light Pakistani', 'Crevettes à l\'ail légères pakistanaises', 'Gambas al ajillo ligeras paquistaníes', 'Pakistanische leichte Knoblauch-Garnelen', 'seafood_mains', 'lunch', 'pan_pakistani', 115),
  R('سمك كاري جوز الهند لايت باكستاني', 'Coconut fish curry light Pakistani', 'Curry de poisson au coco léger pakistanais', 'Curry de pescado con coco ligero paquistaní', 'Pakistanisches leichtes Kokos-Fisch-Curry', 'seafood_mains', 'lunch', 'pan_pakistani', 150),
  R('روبيان كاري حار لايت باكستاني', 'Spicy prawn curry light Pakistani', 'Curry de crevettes épicé léger pakistanais', 'Curry de gambas picante ligero paquistaní', 'Pakistanisches leichtes würziges Garnelen-Curry', 'seafood_mains', 'lunch', 'pan_pakistani', 125),
  R('كراهي سمك لايت باكستانية', 'Fish karahi light Pakistani', 'Karahi de poisson léger pakistanais', 'Karahi de pescado ligero paquistaní', 'Pakistanisches leichtes Fisch-Karahi', 'seafood_mains', 'lunch', 'pan_pakistani', 150),
  R('سمك مشوي حار باكستاني', 'Spicy grilled fish Pakistani', 'Poisson grillé épicé pakistanais', 'Pescado a la parrilla picante paquistaní', 'Pakistanischer würziger gegrillter Fisch', 'seafood_mains', 'lunch', 'pan_pakistani', 165),
);
// --- soups_salads (8) ---------------------------------------------------------
dishes.push(
  R('شوربة حليم لايت باكستانية', 'Haleem soup light Pakistani', 'Soupe de haleem légère pakistanaise', 'Sopa de haleem ligera paquistaní', 'Pakistanische leichte Haleem-Suppe', 'soups_salads', 'dinner', 'pan_pakistani', 85),
  R('شوربة يخني دجاج لايت باكستانية', 'Yakhni chicken soup light Pakistani', 'Soupe yakhni au poulet légère pakistanaise', 'Sopa yakhni de pollo ligera paquistaní', 'Pakistanische leichte Yakhni-Hühnersuppe', 'soups_salads', 'dinner', 'pan_pakistani', 60),
  R('شوربة خضار لايت باكستانية', 'Vegetable soup light Pakistani', 'Soupe de légumes légère pakistanaise', 'Sopa de verduras ligera paquistaní', 'Pakistanische leichte Gemüsesuppe', 'soups_salads', 'dinner', 'pan_pakistani', 50),
  R('شوربة طماطم لايت باكستانية', 'Tomato soup light Pakistani', 'Soupe de tomates légère pakistanaise', 'Sopa de tomate ligera paquistaní', 'Pakistanische leichte Tomatensuppe', 'soups_salads', 'dinner', 'pan_pakistani', 55),
  R('شوربة عدس حار لايت باكستانية', 'Spicy lentil soup light Pakistani', 'Soupe de lentilles épicée légère pakistanaise', 'Sopa de lentejas picante ligera paquistaní', 'Pakistanische leichte würzige Linsensuppe', 'soups_salads', 'dinner', 'pan_pakistani', 75),
  R('سلطة خيار لايت باكستانية', 'Cucumber salad light Pakistani', 'Salade de concombre légère pakistanaise', 'Ensalada de pepino ligera paquistaní', 'Pakistanischer leichter Gurkensalat', 'soups_salads', 'snacks', 'pan_pakistani', 35),
  R('سلطة طماطم وبصل باكستانية', 'Tomato onion salad Pakistani', 'Salade tomate oignon pakistanaise', 'Ensalada de tomate y cebolla paquistaní', 'Pakistanischer Tomaten-Zwiebel-Salat', 'soups_salads', 'snacks', 'pan_pakistani', 40),
  R('سلطة رايتا لايت باكستانية', 'Raita salad light Pakistani', 'Salade raita légère pakistanaise', 'Ensalada raita ligera paquistaní', 'Pakistanischer leichter Raita-Salat', 'soups_salads', 'snacks', 'pan_pakistani', 45),
);
// --- street_snacks (10) -------------------------------------------------------
dishes.push(
  R('غول غابي لايت باكستانية', 'Gol gappay light Pakistani', 'Gol gappay léger pakistanais', 'Gol gappay ligero paquistaní', 'Pakistanische leichte Gol-Gappay', 'street_snacks', 'snacks', 'pan_pakistani', 120),
  R('بهيل بوري لايت باكستانية', 'Bhel puri light Pakistani', 'Bhel puri léger pakistanais', 'Bhel puri ligero paquistaní', 'Pakistanisches leichtes Bhel-Puri', 'street_snacks', 'snacks', 'pan_pakistani', 190),
  R('ألو تيكي تشات لايت باكستانية', 'Aloo tikki chaat light Pakistani', 'Aloo tikki chaat léger pakistanais', 'Aloo tikki chaat ligero paquistaní', 'Pakistanisches leichtes Aloo-Tikki-Chaat', 'street_snacks', 'snacks', 'pan_pakistani', 180),
  R('داهي بوري لايت باكستانية', 'Dahi puri light Pakistani', 'Dahi puri léger pakistanais', 'Dahi puri ligero paquistaní', 'Pakistanisches leichtes Dahi-Puri', 'street_snacks', 'snacks', 'pan_pakistani', 160),
  R('ساموسا تشات لايت باكستانية', 'Samosa chaat light Pakistani', 'Samosa chaat léger pakistanais', 'Samosa chaat ligero paquistaní', 'Pakistanisches leichtes Samosa-Chaat', 'street_snacks', 'snacks', 'pan_pakistani', 195),
  R('داهي بارا لايت باكستانية', 'Dahi bara light Pakistani', 'Dahi bara léger pakistanais', 'Dahi bara ligero paquistaní', 'Pakistanisches leichtes Dahi-Bara', 'street_snacks', 'snacks', 'pan_pakistani', 150),
  R('كولتشا تشات ماسالا باكستانية', 'Kulcha chaat masala Pakistani', 'Kulcha chaat masala pakistanais', 'Kulcha chaat masala paquistaní', 'Pakistanisches Kulcha-Chaat-Masala', 'street_snacks', 'snacks', 'pan_pakistani', 190),
  R('باكورا قرنبيط لايت باكستانية', 'Cauliflower pakora light Pakistani', 'Pakora de chou-fleur léger pakistanais', 'Pakora de coliflor ligero paquistaní', 'Pakistanisches leichtes Blumenkohl-Pakora', 'street_snacks', 'snacks', 'pan_pakistani', 145),
  R('باكورا ماسالا لايت باكستانية', 'Masala pakora light Pakistani', 'Pakora masala léger pakistanais', 'Pakora masala ligero paquistaní', 'Pakistanisches leichtes Masala-Pakora', 'street_snacks', 'snacks', 'pan_pakistani', 165),
  R('مخلوط نامكين لايت باكستاني', 'Mixed namkeen light Pakistani', 'Namkeen mélangé léger pakistanais', 'Namkeen mixto ligero paquistaní', 'Pakistanisches leichtes gemischtes Namkeen', 'street_snacks', 'snacks', 'pan_pakistani', 200),
);
// --- condiments (7) -----------------------------------------------------------
dishes.push(
  R('صلصة زبادي خيار باكستانية', 'Cucumber yogurt chutney Pakistani', 'Chutney yaourt concombre pakistanais', 'Chutney de yogur y pepino paquistaní', 'Pakistanisches Gurken-Joghurt-Chutney', 'condiments', 'snacks', 'pan_pakistani', 45),
  R('صلصة نعناع باكستانية', 'Mint chutney Pakistani', 'Chutney à la menthe pakistanais', 'Chutney de menta paquistaní', 'Pakistanisches Minz-Chutney', 'condiments', 'snacks', 'pan_pakistani', 80),
  R('مخلل مانجو حار باكستاني', 'Spicy mango pickle Pakistani', 'Achar de mangue épicé pakistanais', 'Encurtido de mango picante paquistaní', 'Pakistanisches würziges Mango-Pickle', 'condiments', 'snacks', 'pan_pakistani', 70),
  R('مخلل ليمون باكستاني', 'Lemon pickle Pakistani', 'Achar de citron pakistanais', 'Encurtido de limón paquistaní', 'Pakistanisches Zitronen-Pickle', 'condiments', 'snacks', 'pan_pakistani', 65),
  R('صلصة تمر هندي باكستانية', 'Tamarind chutney Pakistani', 'Chutney au tamarin pakistanais', 'Chutney de tamarindo paquistaní', 'Pakistanisches Tamarinden-Chutney', 'condiments', 'snacks', 'pan_pakistani', 115),
  R('مخلل خضار مشكل باكستاني', 'Mixed vegetable pickle Pakistani', 'Achar de légumes mélangés pakistanais', 'Encurtido de verduras mixtas paquistaní', 'Pakistanisches gemischtes Gemüse-Pickle', 'condiments', 'snacks', 'pan_pakistani', 55),
  R('صلصة ثوم لبن لايت باكستانية', 'Garlic yogurt chutney light Pakistani', 'Chutney yaourt ail léger pakistanais', 'Chutney yogur ajo ligero paquistaní', 'Pakistanisches leichtes Knoblauch-Joghurt-Chutney', 'condiments', 'snacks', 'pan_pakistani', 50),
);
// --- desserts_sweets (10) -----------------------------------------------------
dishes.push(
  R('جاليبي باكستانية', 'Jalebi Pakistani', 'Jalebi pakistanais', 'Jalebi paquistaní', 'Pakistanisches Jalebi', 'desserts_sweets', 'snacks', 'pan_pakistani', 350),
  R('زردة لايت باكستانية', 'Zarda light Pakistani', 'Zarda léger pakistanais', 'Zarda ligero paquistaní', 'Pakistanisches leichtes Zarda', 'desserts_sweets', 'snacks', 'pan_pakistani', 190),
  R('فيرني كلاسيك باكستانية', 'Classic firni Pakistani', 'Firni classique pakistanais', 'Firni clásico paquistaní', 'Pakistanisches klassisches Firni', 'desserts_sweets', 'snacks', 'pan_pakistani', 110),
  R('خير مالكي باكستانية', 'Royal kheer Pakistani', 'Kheer royal pakistanais', 'Kheer real paquistaní', 'Pakistanisches königliches Kheer', 'desserts_sweets', 'snacks', 'pan_pakistani', 120),
  R('شير خورما كلاسيك باكستانية', 'Classic sheer khurma Pakistani', 'Sheer khurma classique pakistanais', 'Sheer khurma clásico paquistaní', 'Pakistanisches klassisches Sheer-Khurma', 'desserts_sweets', 'snacks', 'pan_pakistani', 150),
  R('رابرا لايت باكستانية', 'Rabri light Pakistani', 'Rabri léger pakistanais', 'Rabri ligero paquistaní', 'Pakistanisches leichtes Rabri', 'desserts_sweets', 'snacks', 'pan_pakistani', 160),
  R('جولاب جامون لايت باكستاني', 'Gulab jamun light Pakistani', 'Gulab jamun léger pakistanais', 'Gulab jamun ligero paquistaní', 'Pakistanisches leichtes Gulab-Jamun', 'desserts_sweets', 'snacks', 'pan_pakistani', 265),
  R('حلوة جزر باكستانية', 'Gajar halwa Pakistani', 'Halwa de carottes pakistanais', 'Halwa de zanahoria paquistaní', 'Pakistanisches Karotten-Halwa', 'desserts_sweets', 'snacks', 'pan_pakistani', 250),
  R('كولفي باكستاني', 'Kulfi Pakistani', 'Kulfi pakistanais', 'Kulfi paquistaní', 'Pakistanisches Kulfi', 'desserts_sweets', 'snacks', 'pan_pakistani', 230),
  R('بيسان لادو لايت باكستاني', 'Besan laddu light Pakistani', 'Laddu de besan léger pakistanais', 'Laddu de besan ligero paquistaní', 'Pakistanisches leichtes Besan-Laddu', 'desserts_sweets', 'snacks', 'pan_pakistani', 300),
);
// --- beverages (8) ------------------------------------------------------------
dishes.push(
  R('لاسي مانجو باكستاني', 'Mango lassi Pakistani', 'Lassi à la mangue pakistanais', 'Lassi de mango paquistaní', 'Pakistanischer Mango-Lassi', 'beverages', 'snacks', 'pan_pakistani', 110),
  R('لاسي مملح باكستاني', 'Salted lassi Pakistani', 'Lassi salé pakistanais', 'Lassi salado paquistaní', 'Pakistanischer gesalzener Lassi', 'beverages', 'snacks', 'pan_pakistani', 65),
  R('لاسي حار باكستاني', 'Spiced lassi Pakistani', 'Lassi épicé pakistanais', 'Lassi especiado paquistaní', 'Pakistanischer würziger Lassi', 'beverages', 'snacks', 'pan_pakistani', 70),
  R('نيمبو باني لايت باكستاني', 'Nimbu pani light Pakistani', 'Nimbu pani léger pakistanais', 'Nimbu pani ligero paquistaní', 'Pakistanisches leichtes Nimbu-Pani', 'beverages', 'snacks', 'pan_pakistani', 35),
  R('شاي كشميري باكستاني', 'Kashmiri chai Pakistani', 'Thé cachemiri pakistanais', 'Té de Cachemira paquistaní', 'Pakistanischer Kashmiri-Tee', 'beverages', 'snacks', 'pan_pakistani', 75),
  R('عصير مانجو باكستاني', 'Mango juice Pakistani', 'Jus de mangue pakistanais', 'Zumo de mango paquistaní', 'Pakistanischer Mangosaft', 'beverages', 'snacks', 'pan_pakistani', 55),
  R('عصير قصب لايت باكستاني', 'Sugarcane juice light Pakistani', 'Jus de canne léger pakistanais', 'Zumo de caña ligero paquistaní', 'Pakistanischer leichter Zuckerrohrsaft', 'beverages', 'snacks', 'pan_pakistani', 90),
  R('شاش لايت باكستاني', 'Chaas light Pakistani', 'Chaas léger pakistanais', 'Chaas ligero paquistaní', 'Pakistanisches leichtes Chaas', 'beverages', 'snacks', 'pan_pakistani', 30),
);

// ============================================================ REGIONAL (27)
// --- punjab (9) ---------------------------------------------------------------
dishes.push(
  R('سارسون كا ساغ لايت باكستاني', 'Sarson ka saag light Pakistani', 'Sarson ka saag léger pakistanais', 'Sarson ka saag ligero paquistaní', 'Pakistanisches leichtes Sarson-ka-Saag', 'vegetarian_mains', 'lunch', 'punjab', 150),
  R('ماكي كي روتي لايت باكستانية', 'Makki ki roti light Pakistani', 'Makki ki roti léger pakistanais', 'Makki ki roti ligero paquistaní', 'Pakistanisches leichtes Makki-Ki-Roti', 'breads_flatbreads', 'lunch', 'punjab', 210),
  R('لاسي لاهوري باكستاني', 'Lahori lassi Pakistani', 'Lassi de Lahore pakistanais', 'Lassi de Lahore paquistaní', 'Pakistanischer Lahore-Lassi', 'beverages', 'snacks', 'punjab', 120),
  R('غول غابي لاهوري لايت باكستانية', 'Lahori gol gappay light Pakistani', 'Gol gappay de Lahore léger pakistanais', 'Gol gappay de Lahore ligero paquistaní', 'Pakistanische leichte Lahore-Gol-Gappay', 'street_snacks', 'snacks', 'punjab', 125),
  R('تشورما لايت باكستانية', 'Churma light Pakistani', 'Churma léger pakistanais', 'Churma ligero paquistaní', 'Pakistanisches leichtes Churma', 'desserts_sweets', 'snacks', 'punjab', 230),
  R('دال ماشاني لاهوري لايت باكستانية', 'Lahori dal mashani light Pakistani', 'Dal mashani de Lahore léger pakistanais', 'Dal mashani de Lahore ligero paquistaní', 'Pakistanisches leichtes Lahori-Dal-Mashani', 'dals_legumes', 'lunch', 'punjab', 120),
  R('ألو بهوجيا بنجابي لايت باكستانية', 'Aloo bhujia Punjabi Pakistani', 'Bhujia de pommes de terre punjabi pakistanais', 'Bhujia de patata punyabí paquistaní', 'Pakistanisches punjabisches Aloo-Bhujia', 'vegetarian_mains', 'lunch', 'punjab', 150),
  R('تشوري باكستانية', 'Choori Pakistani', 'Choori pakistanais', 'Choori paquistaní', 'Pakistanisches Choori', 'breakfast_items', 'breakfast', 'punjab', 240),
  R('فولكا بنجابي لايت باكستانية', 'Phulka Punjabi Pakistani', 'Phulka punjabi pakistanais', 'Phulka punyabí paquistaní', 'Pakistanisches punjabisches Phulka', 'breads_flatbreads', 'lunch', 'punjab', 175),
);
// --- sindh (7) ----------------------------------------------------------------
dishes.push(
  R('برياني سندي كلاسيك باكستانية', 'Classic Sindhi biryani Pakistani', 'Biryani sindhi classique pakistanais', 'Biryani sindhi clásico paquistaní', 'Pakistanisches klassisches Sindhi-Biryani', 'rice_biryani', 'lunch', 'sindh', 250),
  R('كاري سندية لايت باكستانية', 'Sindhi karhi light Pakistani', 'Karhi sindhi léger pakistanais', 'Karhi sindhi ligero paquistaní', 'Pakistanisches leichtes Sindhi-Karhi', 'vegetarian_mains', 'lunch', 'sindh', 120),
  R('سمك سندي كاري لايت باكستانية', 'Sindhi fish curry light Pakistani', 'Curry de poisson sindhi léger pakistanais', 'Curry de pescado sindhi ligero paquistaní', 'Pakistanisches leichtes Sindhi-Fisch-Curry', 'seafood_mains', 'lunch', 'sindh', 145),
  R('بلاو سندي لايت باكستاني', 'Sindhi pulao light Pakistani', 'Pulao sindhi léger pakistanais', 'Pulao sindhi ligero paquistaní', 'Pakistanisches leichtes Sindhi-Pulao', 'rice_biryani', 'lunch', 'sindh', 195),
  R('دال هزارة باكستانية', 'Hazara dal Pakistani', 'Dal hazara pakistanais', 'Dal hazara paquistaní', 'Pakistanisches Hazara-Dal', 'dals_legumes', 'lunch', 'sindh', 110),
  R('حلوى سندية لايت باكستانية', 'Sindhi halwa light Pakistani', 'Halwa sindhi léger pakistanais', 'Halwa sindhi ligero paquistaní', 'Pakistanisches leichtes Sindhi-Halwa', 'desserts_sweets', 'snacks', 'sindh', 260),
  R('خير سندي لايت باكستانية', 'Sindhi kheer light Pakistani', 'Kheer sindhi léger pakistanais', 'Kheer sindhi ligero paquistaní', 'Pakistanisches leichtes Sindhi-Kheer', 'desserts_sweets', 'snacks', 'sindh', 115),
);
// --- kpk (5) ------------------------------------------------------------------
dishes.push(
  R('تشابلي كباب لايت باكستاني', 'Chapli kebab light Pakistani', 'Kebab chapli léger pakistanais', 'Kebab chapli ligero paquistaní', 'Pakistanisches leichtes Chapli-Kebab', 'meat_mains', 'lunch', 'kpk', 200),
  R('كباب بهاري بيشاوري لايت باكستاني', 'Peshawari bihari kebab light Pakistani', 'Kebab bihari de Peshawar léger pakistanais', 'Kebab bihari de Peshawar ligero paquistaní', 'Pakistanisches leichtes Peshawari-Bihari-Kebab', 'meat_mains', 'lunch', 'kpk', 220),
  R('لحم نامكين لايت باكستاني', 'Namkeen gosht Pakistani', 'Namkeen gosht pakistanais', 'Namkeen gosht paquistaní', 'Pakistanisches Namkeen-Gosht', 'meat_mains', 'lunch', 'kpk', 240),
  R('كابولي بلاو لايت باكستاني', 'Kabuli pulao light Pakistani', 'Pulao kaboulien léger pakistanais', 'Pulao afgano ligero paquistaní', 'Pakistanisches leichtes Kabuli-Pulao', 'rice_biryani', 'lunch', 'kpk', 210),
  R('شاي جوز تشيترال لايت باكستاني', 'Chitral walnut chai light Pakistani', 'Thé aux noix de Chitral léger pakistanais', 'Té de nuez de Chitral ligero paquistaní', 'Pakistanischer leichter Chitral-Walnus-Tee', 'beverages', 'snacks', 'kpk', 40),
);
// --- balochistan (4) ----------------------------------------------------------
dishes.push(
  R('ساجي لحم كلاسيك بلوتشي', 'Classic balochi sajji Pakistani', 'Sajji baloutchi classique pakistanais', 'Sajji baluchi clásico paquistaní', 'Pakistanisches klassisches Balochi-Sajji', 'meat_mains', 'lunch', 'balochistan', 300),
  R('دم بخت لايت بلوتشي', 'Dumpukht light Pakistani', 'Dumpukht léger pakistanais', 'Dumpukht ligero paquistaní', 'Pakistanisches leichtes Dumpukht', 'meat_mains', 'lunch', 'balochistan', 240),
  R('كراهي بلوتشي لايت باكستاني', 'Balochi karahi light Pakistani', 'Karahi baloutchi léger pakistanais', 'Karahi baluchi ligero paquistaní', 'Pakistanisches leichtes Balochi-Karahi', 'meat_mains', 'lunch', 'balochistan', 245),
  R('خورش بلوتشي لايت باكستاني', 'Balochi khurosh light Pakistani', 'Khurosh baloutchi léger pakistanais', 'Khurosh baluchi ligero paquistaní', 'Pakistanisches leichtes Balochi-Khurosh', 'seafood_mains', 'lunch', 'balochistan', 180),
);
// --- gilgit_baltistan (2) -----------------------------------------------------
dishes.push(
  R('مانتو دجاج جيلجيت باكستاني', 'Gilgit mantu chicken Pakistani', 'Mantu de poulet du Gilgit pakistanais', 'Mantu de pollo de Gilgit paquistaní', 'Pakistanisches Gilgit-Hühner-Mantu', 'poultry_mains', 'lunch', 'gilgit_baltistan', 190),
  R('تشاي جيلجيت حار باكستاني', 'Gilgit spicy chai Pakistani', 'Thé épicé du Gilgit pakistanais', 'Té picante de Gilgit paquistaní', 'Pakistanischer würziger Gilgit-Tee', 'beverages', 'snacks', 'gilgit_baltistan', 60),
);

// ============================================================ ASIAN_SHARED (3)
dishes.push(
  R('ساموسة خضار مقلية باكستانية', 'Fried vegetable samosa Pakistani', 'Samosa de légumes frite pakistanaise', 'Samosa de verduras frita paquistaní', 'Pakistanische frittierte Gemüse-Samosa', 'street_snacks', 'snacks', 'asian_shared', 215),
  R('ساموسة لحم مقلية باكستانية', 'Fried meat samosa Pakistani', 'Samosa de viande frite pakistanaise', 'Samosa de carne frita paquistaní', 'Pakistanische frittierte Fleisch-Samosa', 'street_snacks', 'snacks', 'asian_shared', 260),
  R('شاي حليب ماسالا باكستاني', 'Milk masala chai Pakistani', 'Chai masala au lait pakistanais', 'Chai masala con leche paquistaní', 'Pakistanischer Milch-Masala-Chai', 'beverages', 'snacks', 'asian_shared', 50),
);

// ============================================================ PAN_PAKISTANI TOP-UP (21)
dishes.push(
  R('روبيان كاري جوز الهند لايت باكستاني', 'Coconut prawn curry light Pakistani', 'Curry de crevettes au coco léger pakistanais', 'Curry de gambas con coco ligero paquistaní', 'Pakistanisches leichtes Kokos-Garnelen-Curry', 'seafood_mains', 'lunch', 'pan_pakistani', 135),
  R('لحم ضأن ماسالا حار لايت باكستاني', 'Spicy mutton masala light Pakistani', 'Mouton masala épicé léger pakistanais', 'Cordero masala picante ligero paquistaní', 'Pakistanisches leichtes würziges Lamm-Masala', 'meat_mains', 'lunch', 'pan_pakistani', 205),
  R('دجاج بهونا ماسالا لايت باكستاني', 'Bhuna masala chicken light Pakistani', 'Poulet bhuna masala léger pakistanais', 'Pollo bhuna masala ligero paquistaní', 'Pakistanisches leichtes Bhuna-Masala-Hähnchen', 'poultry_mains', 'lunch', 'pan_pakistani', 175),
  R('حليم دجاج لايت باكستاني', 'Chicken haleem light Pakistani', 'Haleem de poulet léger pakistanais', 'Haleem de pollo ligero paquistaní', 'Pakistanisches leichtes Hühner-Haleem', 'meat_mains', 'lunch', 'pan_pakistani', 175),
  R('نهاري دجاج حار لايت باكستاني', 'Spicy chicken nihari light Pakistani', 'Nihari de poulet épicé léger pakistanais', 'Nihari de pollo picante ligero paquistaní', 'Pakistanisches leichtes würziges Hühner-Nihari', 'meat_mains', 'lunch', 'pan_pakistani', 185),
  R('كراهي دجاج بياز لايت باكستاني', 'Onion chicken karahi light Pakistani', 'Karahi de poulet à l\'oignon léger pakistanais', 'Karahi de pollo con cebolla ligero paquistaní', 'Pakistanisches leichtes Zwiebel-Hühner-Karahi', 'poultry_mains', 'lunch', 'pan_pakistani', 210),
  R('قورمة خضار لايت باكستانية', 'Vegetable qorma light Pakistani', 'Qorma de légumes léger pakistanais', 'Qorma de verduras ligero paquistaní', 'Pakistanisches leichtes Gemüse-Qorma', 'vegetarian_mains', 'lunch', 'pan_pakistani', 150),
  R('برياني بيض لايت باكستاني', 'Egg biryani light Pakistani', 'Biryani aux œufs léger pakistanais', 'Biryani de huevo ligero paquistaní', 'Pakistanisches leichtes Eier-Biryani', 'rice_biryani', 'lunch', 'pan_pakistani', 185),
  R('كباب دجاج لايت باكستاني', 'Chicken kebab light Pakistani', 'Kebab de poulet léger pakistanais', 'Kebab de pollo ligero paquistaní', 'Pakistanisches leichtes Hühner-Kebab', 'poultry_mains', 'lunch', 'pan_pakistani', 180),
  R('ساجي دجاج لايت باكستاني', 'Chicken sajji light Pakistani', 'Sajji de poulet léger pakistanais', 'Sajji de pollo ligero paquistaní', 'Pakistanisches leichtes Hühner-Sajji', 'poultry_mains', 'lunch', 'pan_pakistani', 190),
  R('شامي كباب لايت باكستاني', 'Shami kebab light Pakistani', 'Shami kebab léger pakistanais', 'Shami kebab ligero paquistaní', 'Pakistanisches leichtes Shami-Kebab', 'meat_mains', 'lunch', 'pan_pakistani', 240),
  R('قيمه خضار لايت باكستانية', 'Vegetable keema light Pakistani', 'Keema de légumes léger pakistanais', 'Keema de verduras ligero paquistaní', 'Pakistanisches leichtes Gemüse-Keema', 'meat_mains', 'lunch', 'pan_pakistani', 180),
  R('دجاج كورما لايت باكستاني', 'Chicken korma light Pakistani', 'Korma de poulet léger pakistanais', 'Korma de pollo ligero paquistaní', 'Pakistanisches leichtes Hühner-Korma', 'poultry_mains', 'lunch', 'pan_pakistani', 175),
  R('روبيان بتر ماسالا لايت باكستاني', 'Butter prawn masala light Pakistani', 'Crevettes au beurre masala légères pakistanaises', 'Gambas a la mantequilla masala ligeras paquistaníes', 'Pakistanische leichte Butter-Garnelen-Masala', 'seafood_mains', 'lunch', 'pan_pakistani', 150),
  R('ألو لحم كاري لايت باكستاني', 'Aloo beef curry light Pakistani', 'Curry de bœuf aux pommes de terre léger pakistanais', 'Curry de res con patatas ligero paquistaní', 'Pakistanisches leichtes Aloo-Rind-Curry', 'meat_mains', 'lunch', 'pan_pakistani', 195),
  R('دجاج كاري زنجبيل لايت باكستاني', 'Ginger chicken curry light Pakistani', 'Curry de poulet au gingembre léger pakistanais', 'Curry de pollo al jengibre ligero paquistaní', 'Pakistanisches leichtes Ingwer-Hühner-Curry', 'poultry_mains', 'lunch', 'pan_pakistani', 165),
  R('دال باري كاري لايت باكستانية', 'Dal bari curry light Pakistani', 'Curry de dal bari léger pakistanais', 'Curry de dal bari ligero paquistaní', 'Pakistanisches leichtes Dal-Bari-Curry', 'dals_legumes', 'lunch', 'pan_pakistani', 110),
  R('شاي هيل لايت باكستاني', 'Cardamom tea light Pakistani', 'Thé à la cardamome léger pakistanais', 'Té de cardamomo ligero paquistaní', 'Pakistanischer leichter Kardamom-Tee', 'beverages', 'snacks', 'pan_pakistani', 35),
  R('باكورا بطاطا لايت باكستانية', 'Potato pakora light Pakistani', 'Pakora de pommes de terre léger pakistanais', 'Pakora de patata ligero paquistaní', 'Pakistanisches leichtes Kartoffel-Pakora', 'street_snacks', 'snacks', 'pan_pakistani', 155),
  R('كاري بيض حار لايت باكستاني', 'Spicy egg curry light Pakistani', 'Curry d\'œufs épicé léger pakistanais', 'Curry de huevo picante ligero paquistaní', 'Pakistanisches leichtes würziges Eier-Curry', 'meat_mains', 'lunch', 'pan_pakistani', 160),
  R('لحم ضأن فلفلي حار لايت باكستاني', 'Mutton peppery light Pakistani', 'Mouton poivré léger pakistanais', 'Cordero picante ligero paquistaní', 'Pakistanisches leichtes pfeffriges Lamm', 'meat_mains', 'lunch', 'pan_pakistani', 195),
);

// ============================================================ MACROS
const MACRO_TPL = {
  breakfast_items: [7, 28, 7],
  breads_flatbreads: [8, 38, 5],
  rice_biryani: [6, 30, 4],
  dals_legumes: [7, 16, 3],
  vegetarian_mains: [5, 12, 6],
  poultry_mains: [24, 6, 8],
  meat_mains: [23, 3, 12],
  seafood_mains: [20, 5, 6],
  soups_salads: [4, 10, 2],
  street_snacks: [6, 22, 8],
  condiments: [3, 8, 5],
  desserts_sweets: [6, 30, 12],
  beverages: [2, 10, 2],
};
const r1 = (v) => Math.round(v * 10) / 10;
for (const d of dishes) {
  const [tp, tc, tf] = MACRO_TPL[d.category];
  if (d.protein == null || d.carbs == null || d.fat == null) {
    const tcal = 4 * tp + 4 * tc + 9 * tf;
    const s = d.cal_100 / tcal;
    d.protein = r1(tp * s);
    d.carbs = r1(tc * s);
    d.fat = r1(tf * s);
  } else {
    d.protein = r1(d.protein); d.carbs = r1(d.carbs); d.fat = r1(d.fat);
  }
  d.cal_100 = Math.round(4 * d.protein + 4 * d.carbs + 9 * d.fat);
}

// ============================================================ ASSERT
const byRegion = {};
for (const d of dishes) byRegion[d.region] = (byRegion[d.region] ?? 0) + 1;
const byCategory = {};
for (const d of dishes) byCategory[d.category] = (byCategory[d.category] ?? 0) + 1;
const byMeal = {};
for (const d of dishes) byMeal[d.mealType] = (byMeal[d.mealType] ?? 0) + 1;

console.log('TOTAL dishes:', dishes.length);
console.log('By region:', JSON.stringify(byRegion, null, 0));
console.log('By category:', JSON.stringify(byCategory, null, 0));
console.log('By meal:', JSON.stringify(byMeal, null, 0));

if (dishes.length !== 200) {
  console.error(`\nEXPECTED 200 dishes, got ${dishes.length}. Fix before writing.`);
  process.exit(1);
}

fs.writeFileSync(
  path.join(__dirname, 'pakistan-200-proposal.json'),
  JSON.stringify(
    {
      meta: { target: 300, new_dishes: dishes.length, with_macros: true },
      categories: Object.keys(byCategory),
      regions: Object.keys(byRegion),
      meal_types: Object.keys(byMeal),
      dishes,
    },
    null,
    2
  )
);
console.log('\nWrote scripts/pakistan-200-proposal.json');