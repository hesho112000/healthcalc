// Authoring script for the Indian 303-dish proposal (scripts/india-300-proposal.json).
// R(ar, en, fr, es, de, category, mealType, region, cal_100, protein, carbs, fat).
// Macronutrients may be authored explicitly (grams per 100 g); otherwise they are estimated
// from a per-category template. cal_100 is ALWAYS recomputed as round(4P + 4C + 9F) of the
// final macros, so calories and macros are internally consistent and never NULL. Regions:
// pan_indian by default (golden rule), regional anchors for famous authentic dishes,
// asian_shared for dishes also claimed by future Asian kitchens.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = (name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat) => ({
  name_ar, name_en, name_fr, name_es, name_de, category, mealType, region, cal_100, protein, carbs, fat,
});

const dishes = [];

// ============================================================ PAN_INDIAN (216)
// --- breakfast_items ---------------------------------------------------------
dishes.push(
  R('بوري مقلي هندية', 'Fried puri', 'Puri frit indien', 'Puri frito indio', 'Indisches frittiertes Puri', 'breakfast_items', 'breakfast', 'pan_indian', 320),
  R('بوري ألو هندية', 'Aloo puri', 'Puri aux pommes de terre', 'Puri de patata indio', 'Indisches Aloo-Puri', 'breakfast_items', 'breakfast', 'pan_indian', 300),
  R('بيزان تشيلا هندية', 'Besan chilla', 'Chilla de besan', 'Chilla de besan', 'Indisches Besan-Chilla', 'breakfast_items', 'breakfast', 'pan_indian', 160),
  R('دال تشيلا هندية', 'Dal chilla', 'Chilla de lentilles', 'Chilla de lentejas', 'Indisches Dal-Chilla', 'breakfast_items', 'breakfast', 'pan_indian', 170),
  R('باراثا سادة هندية', 'Plain paratha', 'Paratha nature', 'Paratha simple', 'Indisches Paratha natur', 'breakfast_items', 'breakfast', 'pan_indian', 285),
  R('باراثا ماسالا هندية', 'Masala paratha', 'Paratha masala', 'Paratha masala', 'Indisches Masala-Paratha', 'breakfast_items', 'breakfast', 'pan_indian', 290),
  R('باراثا بياز هندية', 'Onion paratha', 'Paratha à l\'oignon', 'Paratha de cebolla', 'Indisches Zwiebel-Paratha', 'breakfast_items', 'breakfast', 'pan_indian', 280),
  R('باراثا بتر هندية', 'Butter paratha', 'Paratha au beurre', 'Paratha con mantequilla', 'Indisches Butter-Paratha', 'breakfast_items', 'breakfast', 'pan_indian', 310),
  R('باراثا تشيز لايت هندية', 'Cheese paratha light', 'Paratha au fromage léger', 'Paratha de queso ligero', 'Indisches leichtes Käse-Paratha', 'breakfast_items', 'breakfast', 'pan_indian', 265),
  R('أوبما ليمون هندية', 'Lemon upma', 'Upma au citron', 'Upma al limón', 'Indisches Zitronen-Upma', 'breakfast_items', 'breakfast', 'pan_indian', 160),
  R('أوبما خضار هندية', 'Vegetable upma', 'Upma de légumes', 'Upma de verduras', 'Indisches Gemüse-Upma', 'breakfast_items', 'breakfast', 'pan_indian', 160),
  R('بوهة جاغري هندية', 'Poha with jaggery', 'Poha au jaggery', 'Poha con jaggery', 'Indisches Poha mit Jaggery', 'breakfast_items', 'breakfast', 'pan_indian', 185),
  R('بوهة ألو هندية', 'Aloo poha', 'Poha aux pommes de terre', 'Poha de patata', 'Indisches Aloo-Poha', 'breakfast_items', 'breakfast', 'pan_indian', 190),
  R('رافا إيدلي هندي', 'Rava idli', 'Idli de semoule', 'Idli de sémola', 'Indisches Rava-Idli', 'breakfast_items', 'breakfast', 'pan_indian', 150),
  R('إيدلي ميني هندي', 'Mini idli', 'Mini idli', 'Mini idli', 'Indisches Mini-Idli', 'breakfast_items', 'breakfast', 'pan_indian', 150),
  R('أوتابام أونيون هندي', 'Onion uttapam', 'Uttapam à l\'oignon', 'Uttapam de cebolla', 'Indisches Zwiebel-Uttapam', 'breakfast_items', 'breakfast', 'pan_indian', 175),
  R('أوتابام خضار هندي', 'Vegetable uttapam', 'Uttapam de légumes', 'Uttapam de verduras', 'Indisches Gemüse-Uttapam', 'breakfast_items', 'breakfast', 'pan_indian', 165),
  R('عجة بطاطا هندية', 'Potato omelette', 'Omelette aux pommes de terre', 'Tortilla de patata', 'Indisches Kartoffel-Omelett', 'breakfast_items', 'breakfast', 'pan_indian', 150),
  R('توست ماسالا هندي', 'Masala toast', 'Toast masala', 'Tostada masala', 'Indisches Masala-Toast', 'breakfast_items', 'breakfast', 'pan_indian', 170),
  R('موغ دال تشيلا هندية', 'Moong dal chilla', 'Chilla de moong dal', 'Chilla de moong dal', 'Indisches Moong-Dal-Chilla', 'breakfast_items', 'breakfast', 'pan_indian', 150),
  R('أوبما جوز الهند لايت هندية', 'Coconut upma light', 'Upma à la noix de coco léger', 'Upma de coco ligero', 'Indisches leichtes Kokos-Upma', 'breakfast_items', 'breakfast', 'pan_indian', 165),
  R('باراثا دال لايت هندية', 'Dal paratha light', 'Paratha de lentilles léger', 'Paratha de lentejas ligero', 'Indisches leichtes Dal-Paratha', 'breakfast_items', 'breakfast', 'pan_indian', 275),
  R('باراثا جوبي لايت هندية', 'Gobi paratha light', 'Paratha au chou-fleur léger', 'Paratha de coliflor ligero', 'Indisches leichtes Gobi-Paratha', 'breakfast_items', 'breakfast', 'pan_indian', 270),
);
// --- breads_flatbreads -------------------------------------------------------
dishes.push(
  R('نان قمح كامل هندي', 'Whole wheat naan', 'Naan complet', 'Naan integral', 'Indisches Vollkorn-Naan', 'breads_flatbreads', 'lunch', 'pan_indian', 255),
  R('نان ثوم لايت هندي', 'Garlic naan light', 'Naan à l\'ail léger', 'Naan de ajo ligero', 'Indisches leichtes Knoblauch-Naan', 'breads_flatbreads', 'lunch', 'pan_indian', 270),
  R('نان زعفران لايت هندي', 'Saffron naan light', 'Naan au safran léger', 'Naan de azafrán ligero', 'Indisches leichtes Safran-Naan', 'breads_flatbreads', 'lunch', 'pan_indian', 265),
  R('روتي جيرا هندي', 'Jeera roti', 'Roti au cumin', 'Roti de comino', 'Indisches Cumin-Roti', 'breads_flatbreads', 'lunch', 'pan_indian', 200),
  R('روتي بياز هندي', 'Onion roti', 'Roti à l\'oignon', 'Roti de cebolla', 'Indisches Zwiebel-Roti', 'breads_flatbreads', 'lunch', 'pan_indian', 205),
  R('تشاباتي بتر هندي', 'Butter chapati', 'Chapati au beurre', 'Chapati con mantequilla', 'Indisches Butter-Chapati', 'breads_flatbreads', 'lunch', 'pan_indian', 210),
  R('تشاباتي محشي هندي', 'Stuffed chapati', 'Chapati farci', 'Chapati relleno', 'Indisches gefülltes Chapati', 'breads_flatbreads', 'lunch', 'pan_indian', 195),
  R('كولشا ألو هندية', 'Aloo kulcha', 'Kulcha aux pommes de terre', 'Kulcha de patata', 'Indisches Aloo-Kulcha', 'breads_flatbreads', 'lunch', 'pan_indian', 260),
  R('بهاتورة هندية', 'Bhatura', 'Bhatura', 'Bhatura', 'Indisches Bhatura', 'breads_flatbreads', 'lunch', 'pan_indian', 330),
  R('رومالي روتي هندي', 'Roomali roti', 'Roti roomali', 'Roti roomali', 'Indisches Roomali-Roti', 'breads_flatbreads', 'lunch', 'pan_indian', 215),
  R('فولكا روتي هندي', 'Phulka roti', 'Roti phulka', 'Roti phulka', 'Indisches Phulka-Roti', 'breads_flatbreads', 'lunch', 'pan_indian', 180),
  R('ميل روتي هندي', 'Millet roti', 'Roti de millet', 'Roti de mijo', 'Indisches Hirse-Roti', 'breads_flatbreads', 'lunch', 'pan_indian', 200),
  R('بيزان روتي هندي', 'Besan roti', 'Roti de besan', 'Roti de besan', 'Indisches Besan-Roti', 'breads_flatbreads', 'lunch', 'pan_indian', 190),
  R('تندوري روتي لايت هندي', 'Tandoori roti light', 'Roti tandoori léger', 'Roti tandoori ligero', 'Indisches leichtes Tandoori-Roti', 'breads_flatbreads', 'lunch', 'pan_indian', 185),
);
// --- rice_biryani ------------------------------------------------------------
dishes.push(
  R('برياني بانير هندي', 'Paneer biryani', 'Biryani au paneer', 'Biryani de paneer', 'Indisches Paneer-Biryani', 'rice_biryani', 'lunch', 'pan_indian', 240),
  R('برياني ليمون هندي', 'Lemon biryani', 'Biryani au citron', 'Biryani de limón', 'Indisches Zitronen-Biryani', 'rice_biryani', 'lunch', 'pan_indian', 210),
  R('رز جوز الهند هندي', 'Coconut rice', 'Riz à la noix de coco', 'Arroz con coco', 'Indischer Kokosreis', 'rice_biryani', 'lunch', 'pan_indian', 185),
  R('رز ماسالا مقلي هندي', 'Masala fried rice', 'Riz frit masala', 'Arroz frito masala', 'Indischer Masala-Bratreis', 'rice_biryani', 'lunch', 'pan_indian', 195),
  R('برياني الفطر هندي', 'Mushroom biryani', 'Biryani aux champignons', 'Biryani de champiñones', 'Indisches Pilz-Biryani', 'rice_biryani', 'lunch', 'pan_indian', 200),
  R('بلياو خضار هندي', 'Vegetable pulao', 'Pulao de légumes', 'Pulao de verduras', 'Indisches Gemüse-Pulao', 'rice_biryani', 'lunch', 'pan_indian', 160),
  R('بلياو دجاج هندي', 'Chicken pulao', 'Pulao au poulet', 'Pulao de pollo', 'Indisches Hühner-Pulao', 'rice_biryani', 'lunch', 'pan_indian', 190),
  R('رز بسمتي زعفران لايت هندي', 'Saffron basmati light', 'Basmati au safran léger', 'Basmati de azafrán ligero', 'Indischer leichter Safran-Basmati', 'rice_biryani', 'lunch', 'pan_indian', 150),
  R('رز كركم لايت هندي', 'Turmeric rice light', 'Riz au curcuma léger', 'Arroz con cúrcuma ligero', 'Indischer leichter Kurkuma-Reis', 'rice_biryani', 'lunch', 'pan_indian', 140),
  R('برياني بيض لايت هندي', 'Egg biryani light', 'Biryani aux œufs léger', 'Biryani de huevo ligero', 'Indisches leichtes Eier-Biryani', 'rice_biryani', 'lunch', 'pan_indian', 180),
  R('برياني روبيان لايت هندي', 'Prawn biryani light', 'Biryani de crevettes léger', 'Biryani de gambas ligero', 'Indisches leichtes Garnelen-Biryani', 'rice_biryani', 'lunch', 'pan_indian', 190),
  R('برياني سمك لايت هندي', 'Fish biryani light', 'Biryani de poisson léger', 'Biryani de pescado ligero', 'Indisches leichtes Fisch-Biryani', 'rice_biryani', 'lunch', 'pan_indian', 195),
  R('رز بسمتي هيل لايت هندي', 'Cardamom basmati light', 'Basmati à la cardamome léger', 'Basmati de cardamomo ligero', 'Indischer leichter Kardamom-Basmati', 'rice_biryani', 'lunch', 'pan_indian', 145),
);
// --- dals_legumes ------------------------------------------------------------
dishes.push(
  R('دال فراي هندية', 'Dal fry', 'Dal fry', 'Dal fry', 'Indisches Dal Fry', 'dals_legumes', 'lunch', 'pan_indian', 140),
  R('توار دال هندية', 'Toor dal', 'Toor dal', 'Toor dal', 'Indisches Toor-Dal', 'dals_legumes', 'lunch', 'pan_indian', 110),
  R('مسور دال هندية', 'Masoor dal', 'Masoor dal', 'Masoor dal', 'Indisches Masoor-Dal', 'dals_legumes', 'lunch', 'pan_indian', 100),
  R('موغ دال هندية', 'Moong dal', 'Moong dal', 'Moong dal', 'Indisches Moong-Dal', 'dals_legumes', 'lunch', 'pan_indian', 95),
  R('أوراد دال هندية', 'Urad dal', 'Urad dal', 'Urad dal', 'Indisches Urad-Dal', 'dals_legumes', 'lunch', 'pan_indian', 105),
  R('شانا دال هندية', 'Chana dal', 'Chana dal', 'Chana dal', 'Indisches Chana-Dal', 'dals_legumes', 'lunch', 'pan_indian', 105),
  R('راجما ماسالا هندية', 'Rajma masala', 'Rajma masala', 'Rajma masala', 'Indisches Rajma-Masala', 'dals_legumes', 'lunch', 'pan_indian', 190),
  R('لوبية كاري هندية', 'Black-eyed pea curry', 'Curry de pois à œil noir', 'Curry de frijol de ojo negro', 'Indisches Augenbohnen-Curry', 'dals_legumes', 'lunch', 'pan_indian', 120),
  R('عدس كاري هندي', 'Lentil curry', 'Curry de lentilles', 'Curry de lentejas', 'Indisches Linsen-Curry', 'dals_legumes', 'lunch', 'pan_indian', 115),
  R('دال مسلوقة هندية', 'Boiled dal', 'Dal bouilli', 'Dal hervido', 'Indisches gekochtes Dal', 'dals_legumes', 'lunch', 'pan_indian', 85),
  R('دال كركم لايت هندية', 'Turmeric dal light', 'Dal au curcuma léger', 'Dal con cúrcuma ligero', 'Indisches leichtes Kurkuma-Dal', 'dals_legumes', 'lunch', 'pan_indian', 90),
  R('دال بالسبانخ لايت هندية', 'Spinach dal light', 'Dal aux épinards léger', 'Dal con espinacas ligero', 'Indisches leichtes Spinat-Dal', 'dals_legumes', 'lunch', 'pan_indian', 90),
);
// --- vegetarian_mains --------------------------------------------------------
dishes.push(
  R('ألو ماسالا هندية', 'Aloo masala', 'Masala de pommes de terre', 'Masala de patata', 'Indisches Aloo-Masala', 'vegetarian_mains', 'lunch', 'pan_indian', 125),
  R('ألو ماتار هندية', 'Aloo matar', 'Aloo matar', 'Aloo matar', 'Indisches Aloo-Matar', 'vegetarian_mains', 'lunch', 'pan_indian', 145),
  R('ماتار بانير هندية', 'Matar paneer', 'Matar paneer', 'Matar paneer', 'Indisches Matar-Paneer', 'vegetarian_mains', 'lunch', 'pan_indian', 185),
  R('شاهي بانير لايت هندية', 'Shahi paneer light', 'Shahi paneer léger', 'Shahi paneer ligero', 'Indisches leichtes Shahi-Paneer', 'vegetarian_mains', 'lunch', 'pan_indian', 215),
  R('بانير ماسالا هندية', 'Paneer masala', 'Paneer masala', 'Paneer masala', 'Indisches Paneer-Masala', 'vegetarian_mains', 'lunch', 'pan_indian', 180),
  R('بانير تيكا ماسالا هندي', 'Paneer tikka masala', 'Paneer tikka masala', 'Paneer tikka masala', 'Indisches Paneer-Tikka-Masala', 'vegetarian_mains', 'lunch', 'pan_indian', 190),
  R('تشولي ماسالا هندية', 'Chole masala', 'Chole masala', 'Chole masala', 'Indisches Chole-Masala', 'vegetarian_mains', 'lunch', 'pan_indian', 135),
  R('خضار بهارتا هندية', 'Vegetable bharta', 'Bharta de légumes', 'Bharta de verduras', 'Indisches Gemüse-Bharta', 'vegetarian_mains', 'lunch', 'pan_indian', 95),
  R('كوسا ماسالا هندية', 'Courgette masala', 'Masala de courgettes', 'Masala de calabacín', 'Indisches Zucchini-Masala', 'vegetarian_mains', 'lunch', 'pan_indian', 90),
  R('فطر ماسالا هندي', 'Mushroom masala', 'Masala aux champignons', 'Masala de champiñones', 'Indisches Pilz-Masala', 'vegetarian_mains', 'lunch', 'pan_indian', 110),
  R('باذنجان حار هندي', 'Spicy eggplant', 'Aubergine épicée', 'Berenjena picante', 'Indische würzige Aubergine', 'vegetarian_mains', 'lunch', 'pan_indian', 95),
  R('خضار جوز الهند هندية', 'Coconut vegetable curry', 'Curry de légumes au coco', 'Curry de verduras con coco', 'Indisches Kokos-Gemüse-Curry', 'vegetarian_mains', 'lunch', 'pan_indian', 140),
  R('كادي هندية', 'Kadhi', 'Kadhi', 'Kadhi', 'Indisches Kadhi', 'vegetarian_mains', 'lunch', 'pan_indian', 90),
  R('أربي ماسالا هندية', 'Arbi masala', 'Masala d\'arbi', 'Masala de arbi', 'Indisches Arbi-Masala', 'vegetarian_mains', 'lunch', 'pan_indian', 110),
  R('بطاطا حلوة كاري هندية', 'Sweet potato curry', 'Curry de patate douce', 'Curry de boniato', 'Indisches Süßkartoffel-Curry', 'vegetarian_mains', 'lunch', 'pan_indian', 105),
  R('قرع كاري هندية', 'Pumpkin curry', 'Curry de potiron', 'Curry de calabaza', 'Indisches Kürbis-Curry', 'vegetarian_mains', 'lunch', 'pan_indian', 70),
  R('ملفوف ماسالا هندية', 'Cabbage masala', 'Masala de chou', 'Masala de repollo', 'Indisches Kohl-Masala', 'vegetarian_mains', 'lunch', 'pan_indian', 70),
  R('فاصوليا خضراء ماسالا هندية', 'Green beans masala', 'Masala de haricots verts', 'Masala de judías verdes', 'Indisches Bohnen-Masala', 'vegetarian_mains', 'lunch', 'pan_indian', 75),
  R('كاري طماطم هندية', 'Tomato curry', 'Curry de tomates', 'Curry de tomate', 'Indisches Tomaten-Curry', 'vegetarian_mains', 'lunch', 'pan_indian', 70),
  R('بانير بهوجي لايت هندية', 'Paneer bhurji light', 'Paneer bhurji léger', 'Paneer bhurji ligero', 'Indisches leichtes Paneer-Bhurji', 'vegetarian_mains', 'lunch', 'pan_indian', 175),
  R('ميثي ماسالا لايت هندية', 'Methi masala light', 'Masala de fenugrec léger', 'Masala de fenogreco ligero', 'Indisches leichtes Methi-Masala', 'vegetarian_mains', 'lunch', 'pan_indian', 85),
  R('كاري بهارا لايت هندية', 'Karela sabzi light', 'Sabzi de karela léger', 'Sabzi de karela ligero', 'Indisches leichtes Karela-Sabzi', 'vegetarian_mains', 'lunch', 'pan_indian', 60),
  R('لوكي لايت هندية', 'Lauki light', 'Lauki léger', 'Lauki ligero', 'Indisches leichtes Lauki', 'vegetarian_mains', 'lunch', 'pan_indian', 40),
  R('كوفتا لوكي لايت هندية', 'Lauki kofta light', 'Kofta de lauki léger', 'Kofta de lauki ligero', 'Indisches leichtes Lauki-Kofta', 'vegetarian_mains', 'lunch', 'pan_indian', 120),
);
// --- poultry_mains -----------------------------------------------------------
dishes.push(
  R('دجاج ماسالا هندي', 'Chicken masala', 'Poulet masala', 'Pollo masala', 'Indisches Hühner-Masala', 'poultry_mains', 'lunch', 'pan_indian', 165),
  R('دجاج كاري جوز الهند هندي', 'Coconut chicken curry', 'Curry de poulet au coco', 'Curry de pollo con coco', 'Indisches Kokos-Hühner-Curry', 'poultry_mains', 'lunch', 'pan_indian', 175),
  R('دجاج 65 ماسالا هندي', 'Chicken 65 masala', 'Chicken 65 masala', 'Pollo 65 masala', 'Indisches Chicken-65-Masala', 'poultry_mains', 'lunch', 'pan_indian', 195),
  R('دجاج كاري أخضر هندي', 'Green chicken curry', 'Curry de poulet vert', 'Curry de pollo verde', 'Indisches grünes Hühner-Curry', 'poultry_mains', 'lunch', 'pan_indian', 160),
  R('دجاج كاري أصفر هندي', 'Yellow chicken curry', 'Curry de poulet jaune', 'Curry de pollo amarillo', 'Indisches gelbes Hühner-Curry', 'poultry_mains', 'lunch', 'pan_indian', 155),
  R('دجاج فلفل هندي', 'Pepper chicken', 'Poulet au poivre', 'Pollo con pimienta', 'Indisches Pfeffer-Hähnchen', 'poultry_mains', 'lunch', 'pan_indian', 170),
  R('دجاج تيكا سبيشال هندي', 'Chicken tikka special', 'Chicken tikka spécial', 'Pollo tikka especial', 'Indisches Chicken-Tikka-Spezial', 'poultry_mains', 'lunch', 'pan_indian', 195),
  R('دجاج وينجز تندوري هندي', 'Tandoori chicken wings', 'Ailes tandoori', 'Alitas tandoori', 'Indische Tandoori-Hähnchenflügel', 'poultry_mains', 'lunch', 'pan_indian', 210),
  R('دجاج مشوي ماسالا هندي', 'Grilled masala chicken', 'Poulet grillé masala', 'Pollo a la parrilla masala', 'Indisches gegrilltes Masala-Hähnchen', 'poultry_mains', 'lunch', 'pan_indian', 185),
  R('شيش دجاج هندي', 'Chicken shish', 'Chiche de poulet', 'Shish de pollo', 'Indisches Hühner-Shish', 'poultry_mains', 'lunch', 'pan_indian', 170),
  R('دجاج جاف ماسالا هندي', 'Dry masala chicken', 'Poulet masala sec', 'Pollo masala seco', 'Indisches trockenes Masala-Hähnchen', 'poultry_mains', 'lunch', 'pan_indian', 175),
  R('دجاج حار هندي', 'Spicy chicken', 'Poulet épicé', 'Pollo picante', 'Indisches würziges Hähnchen', 'poultry_mains', 'lunch', 'pan_indian', 190),
  R('كباب دجاج هندي', 'Chicken kebab', 'Kebab de poulet', 'Kebab de pollo', 'Indisches Hühner-Kebab', 'poultry_mains', 'lunch', 'pan_indian', 185),
  R('دجاج كاري أبيض هندي', 'White chicken curry', 'Curry de poulet blanc', 'Curry de pollo blanco', 'Indisches weißes Hühner-Curry', 'poultry_mains', 'lunch', 'pan_indian', 150),
  R('دجاج بهونا لايت هندي', 'Bhuna chicken light', 'Poulet bhuna léger', 'Pollo bhuna ligero', 'Indisches leichtes Bhuna-Hähnchen', 'poultry_mains', 'lunch', 'pan_indian', 165),
  R('دجاج زبادي لايت هندي', 'Yogurt chicken light', 'Poulet au yaourt léger', 'Pollo al yogur ligero', 'Indisches leichtes Joghurt-Hähnchen', 'poultry_mains', 'lunch', 'pan_indian', 155),
  R('دجاج تمر هندي لايت هندي', 'Tamarind chicken light', 'Poulet au tamarin léger', 'Pollo al tamarindo ligero', 'Indisches leichtes Tamarinden-Hähnchen', 'poultry_mains', 'lunch', 'pan_indian', 160),
  R('دجاج زنجبيل لايت هندي', 'Ginger chicken light', 'Poulet au gingembre léger', 'Pollo al jengibre ligero', 'Indisches leichtes Ingwer-Hähnchen', 'poultry_mains', 'lunch', 'pan_indian', 170),
  R('دجاج ثوم لايت هندي', 'Garlic chicken light', 'Poulet à l\'ail léger', 'Pollo al ajo ligero', 'Indisches leichtes Knoblauch-Hähnchen', 'poultry_mains', 'lunch', 'pan_indian', 165),
  R('دجاج سبانخ لايت هندي', 'Spinach chicken light', 'Poulet aux épinards léger', 'Pollo con espinacas ligero', 'Indisches leichtes Spinat-Hähnchen', 'poultry_mains', 'lunch', 'pan_indian', 150),
);
// --- meat_mains --------------------------------------------------------------
dishes.push(
  R('لحم ضأن ماسالا هندي', 'Mutton masala', 'Mouton masala', 'Cordero masala', 'Indisches Lamm-Masala', 'meat_mains', 'lunch', 'pan_indian', 200),
  R('ماتون تيكا ماسالا هندي', 'Mutton tikka masala', 'Mouton tikka masala', 'Cordero tikka masala', 'Indisches Lamm-Tikka-Masala', 'meat_mains', 'lunch', 'pan_indian', 205),
  R('سيخ كباب مشوي هندي', 'Grilled seekh kebab', 'Seekh kebab grillé', 'Seekh kebab a la parrilla', 'Indisches gegrilltes Seekh-Kebab', 'meat_mains', 'lunch', 'pan_indian', 245),
  R('لحم بهونا هندي', 'Bhuna meat', 'Viande bhuna', 'Carne bhuna', 'Indisches Bhuna-Fleisch', 'meat_mains', 'lunch', 'pan_indian', 195),
  R('لحم ضأن جوز الهند هندي', 'Coconut mutton curry', 'Curry de mouton au coco', 'Curry de cordero con coco', 'Indisches Kokos-Lamm-Curry', 'meat_mains', 'lunch', 'pan_indian', 185),
  R('نيهاري لحم هندي', 'Mutton nihari', 'Nihari de mouton', 'Nihari de cordero', 'Indisches Lamm-Nihari', 'meat_mains', 'lunch', 'pan_indian', 210),
  R('كيما ماتار هندية', 'Keema matar', 'Keema matar', 'Keema matar', 'Indisches Keema-Matar', 'meat_mains', 'lunch', 'pan_indian', 190),
  R('لحم بقري كاري هندي', 'Beef curry', 'Curry de bœuf', 'Curry de res', 'Indisches Rindfleisch-Curry', 'meat_mains', 'lunch', 'pan_indian', 190),
  R('لحم ضأن كورما هندي', 'Mutton korma', 'Korma de mouton', 'Korma de cordero', 'Indisches Lamm-Korma', 'meat_mains', 'lunch', 'pan_indian', 205),
  R('كباب لحم ماسالا هندي', 'Meat masala kebab', 'Kebab de viande masala', 'Kebab de carne masala', 'Indisches Fleisch-Masala-Kebab', 'meat_mains', 'lunch', 'pan_indian', 230),
  R('لحم ضأن زبادي لايت هندي', 'Yogurt mutton light', 'Mouton au yaourt léger', 'Cordero al yogur ligero', 'Indisches leichtes Joghurt-Lamm', 'meat_mains', 'lunch', 'pan_indian', 195),
  R('لحم ضأن سبانخ لايت هندي', 'Mutton spinach light', 'Mouton aux épinards léger', 'Cordero con espinacas ligero', 'Indisches leichtes Spinat-Lamm', 'meat_mains', 'lunch', 'pan_indian', 185),
  R('لحم ضأن ثوم لايت هندي', 'Garlic mutton light', 'Mouton à l\'ail léger', 'Cordero al ajo ligero', 'Indisches leichtes Knoblauch-Lamm', 'meat_mains', 'lunch', 'pan_indian', 190),
);
// --- seafood_mains -----------------------------------------------------------
dishes.push(
  R('سمك ماسالا هندي', 'Fish masala', 'Poisson masala', 'Pescado masala', 'Indisches Fisch-Masala', 'seafood_mains', 'lunch', 'pan_indian', 135),
  R('كاري سمك جوز الهند هندي', 'Coconut fish curry', 'Curry de poisson au coco', 'Curry de pescado con coco', 'Indisches Kokos-Fisch-Curry', 'seafood_mains', 'lunch', 'pan_indian', 150),
  R('روبيان ماسالا هندي', 'Prawn masala', 'Crevettes masala', 'Gambas masala', 'Indisches Garnelen-Masala', 'seafood_mains', 'lunch', 'pan_indian', 120),
  R('روبيان كاري جوز الهند هندي', 'Prawn coconut curry', 'Curry de crevettes au coco', 'Curry de gambas con coco', 'Indisches Kokos-Garnelen-Curry', 'seafood_mains', 'lunch', 'pan_indian', 130),
  R('سمك كاري حار هندي', 'Spicy fish curry', 'Curry de poisson épicé', 'Curry de pescado picante', 'Indisches würziges Fisch-Curry', 'seafood_mains', 'lunch', 'pan_indian', 145),
  R('روبيان ثوم هندي', 'Garlic prawns', 'Crevettes à l\'ail', 'Gambas al ajillo', 'Indische Knoblauch-Garnelen', 'seafood_mains', 'lunch', 'pan_indian', 115),
  R('سمك ماسالا جاف هندي', 'Dry fish masala', 'Poisson masala sec', 'Pescado masala seco', 'Indisches trockenes Fisch-Masala', 'seafood_mains', 'lunch', 'pan_indian', 140),
  R('روبيان زنجبيل لايت هندي', 'Ginger prawns light', 'Crevettes au gingembre légères', 'Gambas al jengibre ligeras', 'Indische leichte Ingwer-Garnelen', 'seafood_mains', 'lunch', 'pan_indian', 115),
);
// --- soups_salads ------------------------------------------------------------
dishes.push(
  R('شوربة دال هندية', 'Dal soup', 'Soupe de dal', 'Sopa de dal', 'Indische Dal-Suppe', 'soups_salads', 'dinner', 'pan_indian', 80),
  R('شوربة دجاج هندية', 'Chicken soup', 'Soupe au poulet', 'Sopa de pollo', 'Indische Hühnersuppe', 'soups_salads', 'dinner', 'pan_indian', 70),
  R('شوربة خضار هندية', 'Vegetable soup', 'Soupe de légumes', 'Sopa de verduras', 'Indische Gemüsesuppe', 'soups_salads', 'dinner', 'pan_indian', 55),
  R('شوربة سمك هندية', 'Fish soup', 'Soupe de poisson', 'Sopa de pescado', 'Indische Fischsuppe', 'soups_salads', 'dinner', 'pan_indian', 65),
  R('شوربة ماش لايت هندية', 'Moong soup light', 'Soupe de moong légère', 'Sopa de moong ligera', 'Indische leichte Moong-Suppe', 'soups_salads', 'dinner', 'pan_indian', 60),
  R('شوربة جزر هندية', 'Carrot soup', 'Soupe de carottes', 'Sopa de zanahoria', 'Indische Karottensuppe', 'soups_salads', 'dinner', 'pan_indian', 45),
  R('شوربة طماطم متبلة هندية', 'Spiced tomato soup', 'Soupe de tomates épicée', 'Sopa de tomate especiada', 'Indische gewürzte Tomatensuppe', 'soups_salads', 'dinner', 'pan_indian', 55),
  R('سلطة بومباي هندية', 'Bombay salad', 'Salade de Bombay', 'Ensalada de Bombay', 'Indischer Bombay-Salat', 'soups_salads', 'snacks', 'pan_indian', 70),
  R('سلطة خيار وطماطم هندية', 'Cucumber tomato salad', 'Salade concombre tomate', 'Ensalada de pepino y tomate', 'Indischer Gurken-Tomaten-Salat', 'soups_salads', 'snacks', 'pan_indian', 45),
  R('سلطة بصل وطماطم هندية', 'Onion tomato salad', 'Salade oignon tomate', 'Ensalada de cebolla y tomate', 'Indischer Zwiebel-Tomaten-Salat', 'soups_salads', 'snacks', 'pan_indian', 40),
  R('سلطة بانير هندية', 'Paneer salad', 'Salade au paneer', 'Ensalada de paneer', 'Indischer Paneer-Salat', 'soups_salads', 'snacks', 'pan_indian', 85),
  R('سلطة جزر وكرنب هندية', 'Carrot cabbage salad', 'Salade carotte chou', 'Ensalada de zanahoria y repollo', 'Indischer Karotten-Kohl-Salat', 'soups_salads', 'snacks', 'pan_indian', 42),
  R('سلطة فاصوليا هندية', 'Bean salad', 'Salade de haricots', 'Ensalada de judías', 'Indischer Bohnensalat', 'soups_salads', 'snacks', 'pan_indian', 85),
  R('سلطة مانجو هندية', 'Mango salad', 'Salade de mangue', 'Ensalada de mango', 'Indischer Mango-Salat', 'soups_salads', 'snacks', 'pan_indian', 60),
);
// --- street_snacks -----------------------------------------------------------
dishes.push(
  R('بهيل بوري هندي', 'Bhel puri', 'Bhel puri', 'Bhel puri', 'Indisches Bhel-Puri', 'street_snacks', 'snacks', 'pan_indian', 180),
  R('باني بوري هندي', 'Pani puri', 'Pani puri', 'Pani puri', 'Indisches Pani-Puri', 'street_snacks', 'snacks', 'pan_indian', 170),
  R('ساموسا تشات هندية', 'Samosa chaat', 'Samosa chaat', 'Samosa chaat', 'Indisches Samosa-Chaat', 'street_snacks', 'snacks', 'pan_indian', 200),
  R('داهي بوري هندية', 'Dahi puri', 'Dahi puri', 'Dahi puri', 'Indisches Dahi-Puri', 'street_snacks', 'snacks', 'pan_indian', 165),
  R('داهي بهالا هندية', 'Dahi bhalla', 'Dahi bhalla', 'Dahi bhalla', 'Indisches Dahi-Bhalla', 'street_snacks', 'snacks', 'pan_indian', 150),
  R('ألو تيكي هندية', 'Aloo tikki', 'Aloo tikki', 'Aloo tikki', 'Indisches Aloo-Tikki', 'street_snacks', 'snacks', 'pan_indian', 185),
  R('كاتشوري حارة هندية', 'Spicy kachori', 'Kachori épicé', 'Kachori picante', 'Indisches würziges Kachori', 'street_snacks', 'snacks', 'pan_indian', 250),
  R('بوندي ماسالا هندية', 'Boondi masala', 'Boondi masala', 'Boondi masala', 'Indisches Boondi-Masala', 'street_snacks', 'snacks', 'pan_indian', 145),
  R('فطر باكورا هندي', 'Mushroom pakora', 'Pakora de champignons', 'Pakora de champiñones', 'Indisches Pilz-Pakora', 'street_snacks', 'snacks', 'pan_indian', 140),
  R('كورن تشات هندي', 'Corn chaat', 'Chaat de maïs', 'Chaat de maíz', 'Indisches Mais-Chaat', 'street_snacks', 'snacks', 'pan_indian', 160),
  R('ألو تشات هندية', 'Aloo chaat', 'Chaat de pommes de terre', 'Chaat de patata', 'Indisches Aloo-Chaat', 'street_snacks', 'snacks', 'pan_indian', 155),
  R('باكورا البصل الهندية', 'Onion pakora', 'Pakora à l\'oignon', 'Pakora de cebolla', 'Indisches Zwiebel-Pakora', 'street_snacks', 'snacks', 'pan_indian', 195),
  R('بانير باكورا لايت هندية', 'Paneer pakora light', 'Pakora de paneer léger', 'Pakora de paneer ligero', 'Indisches leichtes Paneer-Pakora', 'street_snacks', 'snacks', 'pan_indian', 190),
  R('ألو بوندا لايت هندية', 'Aloo bonda light', 'Bonda de pommes de terre léger', 'Bonda de patata ligero', 'Indisches leichtes Aloo-Bonda', 'street_snacks', 'snacks', 'pan_indian', 190),
);
// --- condiments --------------------------------------------------------------
dishes.push(
  R('صلصة النعناع الهندية', 'Mint chutney', 'Chutney à la menthe', 'Chutney de menta', 'Indisches Minz-Chutney', 'condiments', 'snacks', 'pan_indian', 85),
  R('صلصة التمر الهندي الحامضة', 'Tamarind chutney', 'Chutney au tamarin', 'Chutney de tamarindo', 'Indisches Tamarinden-Chutney', 'condiments', 'snacks', 'pan_indian', 120),
  R('صلصة جوز الهند الهندية', 'Coconut chutney', 'Chutney à la noix de coco', 'Chutney de coco', 'Indisches Kokos-Chutney', 'condiments', 'snacks', 'pan_indian', 155),
  R('مخلل مانجو هندي', 'Mango pickle', 'Achar de mangue', 'Encurtido de mango', 'Indisches Mango-Pickle', 'condiments', 'snacks', 'pan_indian', 65),
  R('مخلل ليمون هندي', 'Lemon pickle', 'Achar de citron', 'Encurtido de limón', 'Indisches Zitronen-Pickle', 'condiments', 'snacks', 'pan_indian', 70),
  R('مخلل فلفل أخضر هندي', 'Green chilli pickle', 'Achar de piment vert', 'Encurtido de chile verde', 'Indisches grünes Chili-Pickle', 'condiments', 'snacks', 'pan_indian', 75),
  R('صلصة كزبرة هندية', 'Coriander chutney', 'Chutney à la coriandre', 'Chutney de cilantro', 'Indisches Koriander-Chutney', 'condiments', 'snacks', 'pan_indian', 80),
  R('صلصة بصل هندية', 'Onion chutney', 'Chutney d\'oignon', 'Chutney de cebolla', 'Indisches Zwiebel-Chutney', 'condiments', 'snacks', 'pan_indian', 60),
  R('صلصة ثوم هندية', 'Garlic chutney', 'Chutney à l\'ail', 'Chutney de ajo', 'Indisches Knoblauch-Chutney', 'condiments', 'snacks', 'pan_indian', 70),
  R('صلصة زبادي هندية', 'Yogurt chutney', 'Chutney au yaourt', 'Chutney de yogur', 'Indisches Joghurt-Chutney', 'condiments', 'snacks', 'pan_indian', 55),
  R('صلصة فلفل حار هندية', 'Hot chilli chutney', 'Chutney au piment fort', 'Chutney de chile picante', 'Indisches scharfes Chili-Chutney', 'condiments', 'snacks', 'pan_indian', 85),
);
// --- desserts_sweets ---------------------------------------------------------
dishes.push(
  R('جولاب جامون هندي', 'Gulab jamun', 'Gulab jamun', 'Gulab jamun', 'Indisches Gulab Jamun', 'desserts_sweets', 'snacks', 'pan_indian', 340),
  R('جاليبي هندية', 'Jalebi', 'Jalebi', 'Jalebi', 'Indisches Jalebi', 'desserts_sweets', 'snacks', 'pan_indian', 360),
  R('خير أرز هندي', 'Rice kheer', 'Kheer de riz', 'Kheer de arroz', 'Indischer Reiskheer', 'desserts_sweets', 'snacks', 'pan_indian', 120),
  R('حلوى سوجي هندية', 'Suji halwa', 'Halwa de semoule', 'Halwa de sémola', 'Indisches Suji-Halwa', 'desserts_sweets', 'snacks', 'pan_indian', 280),
  R('مونغ لادو هندي', 'Moong laddu', 'Laddu de moong', 'Laddu de moong', 'Indisches Moong-Laddu', 'desserts_sweets', 'snacks', 'pan_indian', 350),
  R('بيسان لادو هندي', 'Besan laddu', 'Laddu de besan', 'Laddu de besan', 'Indisches Besan-Laddu', 'desserts_sweets', 'snacks', 'pan_indian', 370),
  R('بارفي فستق هندية', 'Pistachio barfi', 'Barfi aux pistaches', 'Barfi de pistacho', 'Indisches Pistazien-Barfi', 'desserts_sweets', 'snacks', 'pan_indian', 390),
  R('باياسام هندية', 'Payasam', 'Payasam', 'Payasam', 'Indisches Payasam', 'desserts_sweets', 'snacks', 'pan_indian', 150),
  R('فالودا هندية', 'Falooda', 'Falooda', 'Falooda', 'Indisches Falooda', 'desserts_sweets', 'snacks', 'pan_indian', 145),
  R('كولفي مانجو هندي', 'Mango kulfi', 'Kulfi à la mangue', 'Kulfi de mango', 'Indisches Mango-Kulfi', 'desserts_sweets', 'snacks', 'pan_indian', 185),
  R('شاهي توكدا هندي', 'Shahi tukda', 'Shahi tukda', 'Shahi tukda', 'Indisches Shahi-Tukda', 'desserts_sweets', 'snacks', 'pan_indian', 285),
  R('رابري هندية', 'Rabri', 'Rabri', 'Rabri', 'Indisches Rabri', 'desserts_sweets', 'snacks', 'pan_indian', 160),
);
// --- beverages ---------------------------------------------------------------
dishes.push(
  R('لاسي مانجو هندي', 'Mango lassi', 'Lassi à la mangue', 'Lassi de mango', 'Indischer Mango-Lassi', 'beverages', 'snacks', 'pan_indian', 115),
  R('لاسي مملح هندي', 'Salted lassi', 'Lassi salé', 'Lassi salado', 'Indischer gesalzener Lassi', 'beverages', 'snacks', 'pan_indian', 65),
  R('لاسي حلو هندي', 'Sweet lassi', 'Lassi sucré', 'Lassi dulce', 'Indischer süßer Lassi', 'beverages', 'snacks', 'pan_indian', 110),
  R('نيمبو باني هندي', 'Nimbu pani', 'Nimbu pani', 'Nimbu pani', 'Indisches Nimbu-Pani', 'beverages', 'snacks', 'pan_indian', 35),
  R('جال جيرا هندي', 'Jaljeera', 'Jaljeera', 'Jaljeera', 'Indisches Jaljeera', 'beverages', 'snacks', 'pan_indian', 25),
  R('شاي زنجبيل بالليمون هندي', 'Ginger lemon tea', 'Thé au gingembre et citron', 'Té de jengibre y limón', 'Indischer Ingwer-Zitronen-Tee', 'beverages', 'snacks', 'pan_indian', 30),
  R('شاي هيل هندي', 'Cardamom tea', 'Thé à la cardamome', 'Té de cardamomo', 'Indischer Kardamom-Tee', 'beverages', 'snacks', 'pan_indian', 40),
  R('شاي ماسالا مثلج هندي', 'Iced masala chai', 'Chai masala glacé', 'Chai masala helado', 'Indischer Eis-Masala-Chai', 'beverages', 'snacks', 'pan_indian', 50),
  R('عصير مانجو هندي', 'Mango juice', 'Jus de mangue', 'Zumo de mango', 'Indischer Mangosaft', 'beverages', 'snacks', 'pan_indian', 55),
  R('عصير قصب هندي', 'Sugarcane juice', 'Jus de canne', 'Zumo de caña', 'Indischer Zuckerrohrsaft', 'beverages', 'snacks', 'pan_indian', 90),
  R('شاش هندي', 'Chaas', 'Chaas', 'Chaas', 'Indisches Chaas', 'beverages', 'snacks', 'pan_indian', 30),
  R('عصير بطيخ هندي', 'Watermelon juice', 'Jus de pastèque', 'Zumo de sandía', 'Indischer Wassermelonensaft', 'beverages', 'snacks', 'pan_indian', 45),
  R('عصير جزر وزنجبيل هندي', 'Carrot ginger juice', 'Jus carotte gingembre', 'Zumo de zanahoria y jengibre', 'Indischer Karotten-Ingwer-Saft', 'beverages', 'snacks', 'pan_indian', 40),
);

// ============================================================ REGIONAL
// --- tamil_nadu --------------------------------------------------------------
dishes.push(
  R('ميدو فادا هندية', 'Medu vada', 'Medu vada', 'Medu vada', 'Indisches Medu-Vada', 'breakfast_items', 'breakfast', 'tamil_nadu', 210),
  R('رافا دوسة هندية', 'Rava dosa', 'Dosa de semoule', 'Dosa de sémola', 'Indisches Rava-Dosa', 'breakfast_items', 'breakfast', 'tamil_nadu', 165),
  R('إيدلي سامبار هندي', 'Idli sambar', 'Idli sambar', 'Idli sambar', 'Indisches Idli-Sambar', 'breakfast_items', 'breakfast', 'tamil_nadu', 145),
  R('كوتو باروتا هندي', 'Kothu parotta', 'Kothu parotta', 'Kothu parotta', 'Indisches Kothu-Parotta', 'rice_biryani', 'lunch', 'tamil_nadu', 245),
  R('قهوة فيلتر هندية', 'Filter coffee', 'Café filtre', 'Café de filtro', 'Indischer Filterkaffee', 'beverages', 'snacks', 'tamil_nadu', 60),
  R('سمك تشيتيناد لايت هندي', 'Chettinad fish light', 'Poisson chettinad léger', 'Pescado chettinad ligero', 'Indischer leichter Chettinad-Fisch', 'seafood_mains', 'lunch', 'tamil_nadu', 150),
  R('باينجان تشيتيناد هندي', 'Chettinad eggplant', 'Aubergine chettinad', 'Berenjena chettinad', 'Indisches Chettinad-Auberginengericht', 'vegetarian_mains', 'lunch', 'tamil_nadu', 105),
  R('روبيان تشيتيناد لايت هندي', 'Chettinad prawns light', 'Crevettes chettinad légères', 'Gambas chettinad ligeras', 'Indische leichte Chettinad-Garnelen', 'seafood_mains', 'lunch', 'tamil_nadu', 125),
  R('كارا كوزهامبو لايت هندي', 'Kara kuzhambu light', 'Kuzhambu léger', 'Kuzhambu ligero', 'Indisches leichtes Kara-Kuzhambu', 'vegetarian_mains', 'lunch', 'tamil_nadu', 75),
  R('برياني تشيتيناد لايت هندي', 'Chettinad biryani light', 'Biryani chettinad léger', 'Biryani chettinad ligero', 'Indisches leichtes Chettinad-Biryani', 'rice_biryani', 'lunch', 'tamil_nadu', 235),
);
// --- kerala ------------------------------------------------------------------
dishes.push(
  R('إيديامبام هندي', 'Idiyappam', 'Idiyappam', 'Idiyappam', 'Indisches Idiyappam', 'breakfast_items', 'breakfast', 'kerala', 130),
  R('باثيري هندية', 'Pathiri', 'Pathiri', 'Pathiri', 'Indisches Pathiri', 'breakfast_items', 'breakfast', 'kerala', 150),
  R('دجاج روست كيرلا هندي', 'Kerala chicken roast', 'Poulet rôti du Kerala', 'Pollo asado de Kerala', 'Indisches Kerala-Hähnchen-Roast', 'poultry_mains', 'lunch', 'kerala', 185),
  R('سمك موليه كيرلا لايت هندي', 'Meen molee light', 'Meen molee léger', 'Meen molee ligero', 'Indisches leichtes Meen-Molee', 'seafood_mains', 'lunch', 'kerala', 155),
  R('سمك بوليشاثو لايت هندي', 'Meen pollichathu light', 'Pollichathu léger', 'Pollichathu ligero', 'Indisches leichtes Meen-Pollichathu', 'seafood_mains', 'lunch', 'kerala', 150),
  R('لحم بقري مقلي كيرلا لايت هندي', 'Kerala beef fry light', 'Bœuf frit du Kerala léger', 'Carne frita de Kerala ligera', 'Indisches leichtes Kerala-Rindfleisch', 'meat_mains', 'lunch', 'kerala', 195),
  R('إريسيري لايت هندي', 'Erissery light', 'Erissery léger', 'Erissery ligero', 'Indisches leichtes Erissery', 'vegetarian_mains', 'lunch', 'kerala', 95),
  R('أولان لايت هندي', 'Olan light', 'Olan léger', 'Olan ligero', 'Indisches leichtes Olan', 'vegetarian_mains', 'lunch', 'kerala', 80),
  R('كاري كادال لايت هندي', 'Kadala curry light', 'Curry de kadala léger', 'Curry de kadala ligero', 'Indisches leichtes Kadala-Curry', 'dals_legumes', 'lunch', 'kerala', 115),
  R('كاري بطاطا كيرلا لايت هندي', 'Kerala potato curry light', 'Curry de pommes de terre du Kerala léger', 'Curry de patata de Kerala ligero', 'Indisches leichtes Kerala-Kartoffel-Curry', 'vegetarian_mains', 'lunch', 'kerala', 100),
);
// --- karnataka ---------------------------------------------------------------
dishes.push(
  R('نير دوسة هندية', 'Neer dosa', 'Neer dosa', 'Neer dosa', 'Indisches Neer-Dosa', 'breakfast_items', 'breakfast', 'karnataka', 140),
  R('ميسور ماسالا دوسة هندية', 'Mysore masala dosa', 'Dosa masala de Mysore', 'Dosa masala de Mysore', 'Indisches Mysore-Masala-Dosa', 'breakfast_items', 'breakfast', 'karnataka', 175),
  R('راغي مودي لايت هندية', 'Ragi mudde light', 'Ragi mudde léger', 'Ragi mudde ligero', 'Indisches leichtes Ragi-Mudde', 'vegetarian_mains', 'lunch', 'karnataka', 130),
  R('كوري روتي لايت هندي', 'Kori rotti light', 'Kori rotti léger', 'Kori rotti ligero', 'Indisches leichtes Kori-Rotti', 'poultry_mains', 'lunch', 'karnataka', 150),
  R('سمك مانغلور لايت هندي', 'Mangalorean fish curry light', 'Curry de poisson mangalorien léger', 'Curry de pescado mangaloreño ligero', 'Indisches leichtes Mangalore-Fisch-Curry', 'seafood_mains', 'lunch', 'karnataka', 140),
  R('باند كاري لايت هندي', 'Pandi curry light', 'Pandi curry léger', 'Pandi curry ligero', 'Indisches leichtes Pandi-Curry', 'meat_mains', 'lunch', 'karnataka', 180),
  R('كارا باث لايت هندي', 'Kara bath light', 'Kara bath léger', 'Kara bath ligero', 'Indisches leichtes Kara-Bath', 'breakfast_items', 'breakfast', 'karnataka', 155),
  R('ميسور باك لايت هندية', 'Mysore pak light', 'Mysore pak léger', 'Mysore pak ligero', 'Indisches leichtes Mysore-Pak', 'desserts_sweets', 'snacks', 'karnataka', 330),
  R('أكي روتي لايت هندية', 'Akki roti light', 'Akki roti léger', 'Akki roti ligero', 'Indisches leichtes Akki-Roti', 'breads_flatbreads', 'lunch', 'karnataka', 175),
);
// --- hyderabad (telangana) ---------------------------------------------------
dishes.push(
  R('برياني خضار حيدر أباد لايت هندي', 'Hyderabadi veg biryani light', 'Biryani de légumes hyderabadi léger', 'Biryani de verduras de Hyderabad ligero', 'Indisches leichtes Hyderabadi-Gemüse-Biryani', 'rice_biryani', 'lunch', 'hyderabad', 225),
  R('ميرش كا سالان لايت هندي', 'Mirchi ka salan light', 'Mirchi ka salan léger', 'Mirchi ka salan ligero', 'Indisches leichtes Mirchi-ka-Salan', 'vegetarian_mains', 'lunch', 'hyderabad', 130),
  R('بغار باينجان لايت هندي', 'Bagara baingan light', 'Bagara baingan léger', 'Bagara baingan ligero', 'Indisches leichtes Bagara-Baingan', 'vegetarian_mains', 'lunch', 'hyderabad', 115),
  R('دبل كا ميثا لايت هندية', 'Double ka meetha light', 'Double ka meetha léger', 'Double ka meetha ligero', 'Indisches leichtes Double-ka-Meetha', 'desserts_sweets', 'snacks', 'hyderabad', 250),
  R('دجاج كاري حيدر أباد لايت هندي', 'Hyderabadi chicken curry light', 'Curry de poulet hyderabadi léger', 'Curry de pollo de Hyderabad ligero', 'Indisches leichtes Hyderabadi-Hühner-Curry', 'poultry_mains', 'lunch', 'hyderabad', 160),
  R('لحم حيدر أباد لايت هندي', 'Hyderabadi mutton curry light', 'Curry de mouton hyderabadi léger', 'Curry de cordero de Hyderabad ligero', 'Indisches leichtes Hyderabadi-Lamm-Curry', 'meat_mains', 'lunch', 'hyderabad', 190),
  R('كيما حيدر أباد لايت هندي', 'Hyderabadi keema light', 'Keema hyderabadi léger', 'Keema de Hyderabad ligero', 'Indisches leichtes Hyderabadi-Keema', 'meat_mains', 'lunch', 'hyderabad', 195),
  R('برياني حيدر أباد لحم لايت هندي', 'Hyderabadi mutton biryani light', 'Biryani de mouton hyderabadi léger', 'Biryani de cordero de Hyderabad ligero', 'Indisches leichtes Hyderabadi-Lamm-Biryani', 'rice_biryani', 'lunch', 'hyderabad', 260),
  R('كاجا لايت هندية', 'Khaja light', 'Khaja léger', 'Khaja ligero', 'Indisches leichtes Khaja', 'desserts_sweets', 'snacks', 'hyderabad', 320),
  R('فيرني حيدر أباد لايت هندية', 'Phirni light', 'Phirni léger', 'Phirni ligero', 'Indisches leichtes Phirni', 'desserts_sweets', 'snacks', 'hyderabad', 130),
);
// --- punjab ------------------------------------------------------------------
dishes.push(
  R('سارسون دا ساگ هندي', 'Sarson ka saag', 'Sarson ka saag', 'Sarson ka saag', 'Indisches Sarson-ka-Saag', 'vegetarian_mains', 'lunch', 'punjab', 155),
  R('ماكي دي روتي هندية', 'Makki di roti', 'Makki di roti', 'Makki di roti', 'Indisches Makki-di-Roti', 'breads_flatbreads', 'lunch', 'punjab', 215),
  R('أمريتساري كباب لحم هندي', 'Amritsari meat kebab', 'Kebab de viande amritsari', 'Kebab de carne amritsari', 'Indisches Amritsari-Fleisch-Kebab', 'meat_mains', 'lunch', 'punjab', 240),
  R('سمك أمريتساري مقلي لايت هندي', 'Amritsari fish fry light', 'Poisson frit amritsari léger', 'Pescado frito amritsari ligero', 'Indisches leichtes Amritsari-Fischgericht', 'seafood_mains', 'lunch', 'punjab', 200),
  R('دال ماخاني كريمي هندية', 'Creamy dal makhani', 'Dal makhani crémeux', 'Dal makhani cremoso', 'Indisches cremiges Dal-Makhani', 'dals_legumes', 'lunch', 'punjab', 195),
  R('لاسي زعفران هندي', 'Saffron lassi', 'Lassi au safran', 'Lassi de azafrán', 'Indischer Safran-Lassi', 'beverages', 'snacks', 'punjab', 130),
);
// --- delhi -------------------------------------------------------------------
dishes.push(
  R('شوليه باتوريه لايت هندية', 'Chole bhature light', 'Chole bhature léger', 'Chole bhature ligero', 'Indisches leichtes Chole-Bhature', 'vegetarian_mains', 'lunch', 'delhi', 230),
  R('دجاج كاري دلهي لايت هندي', 'Delhi chicken curry light', 'Curry de poulet de Delhi léger', 'Curry de pollo de Delhi ligero', 'Indisches leichtes Delhi-Hühner-Curry', 'poultry_mains', 'lunch', 'delhi', 165),
  R('تيكي تشات دلهي لايت هندية', 'Delhi tikki chaat light', 'Tikki chaat de Delhi léger', 'Tikki chaat de Delhi ligero', 'Indisches leichtes Delhi-Tikki-Chaat', 'street_snacks', 'snacks', 'delhi', 175),
  R('شيش كباب دلهي لايت هندي', 'Delhi seekh kebab light', 'Seekh kebab de Delhi léger', 'Seekh kebab de Delhi ligero', 'Indisches leichtes Delhi-Seekh-Kebab', 'meat_mains', 'lunch', 'delhi', 235),
  R('عجة ماسالا دلهي لايت هندية', 'Delhi masala omelette light', 'Omelette masala de Delhi légère', 'Tortilla masala de Delhi ligera', 'Indisches leichtes Delhi-Masala-Omelett', 'breakfast_items', 'breakfast', 'delhi', 165),
  R('بابدي تشات لايت هندية', 'Papdi chaat light', 'Papdi chaat léger', 'Papdi chaat ligero', 'Indisches leichtes Papdi-Chaat', 'street_snacks', 'snacks', 'delhi', 170),
);
// --- lucknow -----------------------------------------------------------------
dishes.push(
  R('غالوتي كباب لايت هندي', 'Galouti kebab light', 'Galouti kebab léger', 'Galouti kebab ligero', 'Indisches leichtes Galouti-Kebab', 'meat_mains', 'lunch', 'lucknow', 265),
  R('شامي كباب لايت هندي', 'Shami kebab light', 'Shami kebab léger', 'Shami kebab ligero', 'Indisches leichtes Shami-Kebab', 'meat_mains', 'lunch', 'lucknow', 245),
  R('نيهاري لكناو لايت هندي', 'Lucknowi nihari light', 'Nihari lucknowi léger', 'Nihari lucknowi ligero', 'Indisches leichtes Lucknowi-Nihari', 'meat_mains', 'lunch', 'lucknow', 215),
  R('كاكوري كباب لايت هندي', 'Kakori kebab light', 'Kakori kebab léger', 'Kakori kebab ligero', 'Indisches leichtes Kakori-Kebab', 'meat_mains', 'lunch', 'lucknow', 255),
  R('فيرني لكناو لايت هندية', 'Lucknowi phirni light', 'Phirni lucknowi léger', 'Phirni lucknowi ligero', 'Indisches leichtes Lucknowi-Phirni', 'desserts_sweets', 'snacks', 'lucknow', 130),
);
// --- kashmir -----------------------------------------------------------------
dishes.push(
  R('دجاج يخني كشميري لايت هندي', 'Kashmiri yakhni chicken light', 'Yakhni de poulet cachemiri léger', 'Yakhni de pollo de Cachemira ligero', 'Indisches leichtes Kashmiri-Hühner-Yakhni', 'poultry_mains', 'lunch', 'kashmir', 160),
  R('لوتس يخني كشميري لايت هندي', 'Nadru yakhni light', 'Yakhni de nénuphar léger', 'Yakhni de loto ligero', 'Indisches leichtes Nadru-Yakhni', 'vegetarian_mains', 'lunch', 'kashmir', 70),
  R('غوشتابا كشميري لايت هندي', 'Gushtaba light', 'Gushtaba léger', 'Gushtaba ligero', 'Indisches leichtes Gushtaba', 'meat_mains', 'lunch', 'kashmir', 200),
  R('كاهوا كشميرية', 'Kashmiri kahwa', 'Kahwa cachemiri', 'Kahwa de Cachemira', 'Kashmirischer Kahwa', 'beverages', 'snacks', 'kashmir', 20),
  R('دجاج كشميري بالزعفران لايت هندي', 'Kashmiri saffron chicken light', 'Poulet cachemiri au safran léger', 'Pollo de Cachemira al azafrán ligero', 'Indisches leichtes Kashmiri-Safran-Hähnchen', 'poultry_mains', 'lunch', 'kashmir', 165),
);
// --- rajasthan ---------------------------------------------------------------
dishes.push(
  R('دال باتي تشورما لايت هندية', 'Dal baati churma light', 'Dal baati churma léger', 'Dal baati churma ligero', 'Indisches leichtes Dal-Baati-Churma', 'vegetarian_mains', 'lunch', 'rajasthan', 220),
  R('غاتي كي سبزي لايت هندية', 'Gatte ki sabzi light', 'Gatte ki sabzi léger', 'Gatte ki sabzi ligero', 'Indisches leichtes Gatte-ki-Sabzi', 'vegetarian_mains', 'lunch', 'rajasthan', 145),
  R('لعل ماس لايت هندي', 'Laal maas light', 'Laal maas léger', 'Laal maas ligero', 'Indisches leichtes Laal-Maas', 'meat_mains', 'lunch', 'rajasthan', 235),
  R('كير سانجري لايت هندية', 'Ker sangri light', 'Ker sangri léger', 'Ker sangri ligero', 'Indisches leichtes Ker-Sangri', 'vegetarian_mains', 'lunch', 'rajasthan', 110),
  R('باجرا كي روتي لايت هندية', 'Bajra roti light', 'Roti de bajra léger', 'Roti de bajra ligero', 'Indisches leichtes Bajra-Roti', 'breads_flatbreads', 'lunch', 'rajasthan', 205),
);
// --- gujarat -----------------------------------------------------------------
dishes.push(
  R('فافدا لايت هندية', 'Fafda light', 'Fafda léger', 'Fafda ligero', 'Indisches leichtes Fafda', 'street_snacks', 'snacks', 'gujarat', 160),
  R('ثيبلا لايت هندية', 'Thepla light', 'Thepla léger', 'Thepla ligero', 'Indisches leichtes Thepla', 'breads_flatbreads', 'lunch', 'gujarat', 215),
  R('هاندفو لايت هندي', 'Handvo light', 'Handvo léger', 'Handvo ligero', 'Indisches leichtes Handvo', 'vegetarian_mains', 'lunch', 'gujarat', 185),
  R('شريكهاند لايت هندية', 'Shrikhand light', 'Shrikhand léger', 'Shrikhand ligero', 'Indisches leichtes Shrikhand', 'desserts_sweets', 'snacks', 'gujarat', 160),
  R('أونديهيو لايت هندية', 'Undhiyu light', 'Undhiyu léger', 'Undhiyu ligero', 'Indisches leichtes Undhiyu', 'vegetarian_mains', 'lunch', 'gujarat', 130),
  R('خاخرة لايت هندية', 'Khakhra light', 'Khakhra léger', 'Khakhra ligero', 'Indisches leichtes Khakhra', 'breads_flatbreads', 'snacks', 'gujarat', 180),
);
// --- maharashtra -------------------------------------------------------------
dishes.push(
  R('فادا باف لايت هندي', 'Vada pav light', 'Vada pav léger', 'Vada pav ligero', 'Indisches leichtes Vada-Pav', 'street_snacks', 'snacks', 'maharashtra', 250),
  R('ميسال باف لايت هندية', 'Misal pav light', 'Misal pav léger', 'Misal pav ligero', 'Indisches leichtes Misal-Pav', 'vegetarian_mains', 'lunch', 'maharashtra', 190),
  R('بوران بولي لايت هندية', 'Puran poli light', 'Puran poli léger', 'Puran poli ligero', 'Indisches leichtes Puran-Poli', 'breakfast_items', 'breakfast', 'maharashtra', 230),
  R('باكري لايت هندية', 'Bhakri light', 'Bhakri léger', 'Bhakri ligero', 'Indisches leichtes Bhakri', 'breads_flatbreads', 'lunch', 'maharashtra', 210),
  R('سابودانا كيشدي لايت هندية', 'Sabudana khichdi light', 'Khichdi de sabudana léger', 'Khichdi de sabudana ligero', 'Indisches leichtes Sabudana-Khichdi', 'breakfast_items', 'breakfast', 'maharashtra', 165),
  R('موداك لايت هندي', 'Modak light', 'Modak léger', 'Modak ligero', 'Indisches leichtes Modak', 'desserts_sweets', 'snacks', 'maharashtra', 200),
);
// --- goa ---------------------------------------------------------------------
dishes.push(
  R('فيندالو لايت هندي', 'Vindaloo light', 'Vindaloo léger', 'Vindaloo ligero', 'Indisches leichtes Vindaloo', 'meat_mains', 'lunch', 'goa', 250),
  R('شاكوتي لايت هندية', 'Xacuti light', 'Xacuti léger', 'Xacuti ligero', 'Indisches leichtes Xacuti', 'poultry_mains', 'lunch', 'goa', 220),
  R('سمك ريتشادو لايت هندي', 'Fish recheado light', 'Poisson recheado léger', 'Pescado recheado ligero', 'Indisches leichtes Fisch-Recheado', 'seafood_mains', 'lunch', 'goa', 190),
  R('ببيبينكا لايت هندية', 'Bebinca light', 'Bebinca léger', 'Bebinca ligero', 'Indisches leichtes Bebinca', 'desserts_sweets', 'snacks', 'goa', 260),
  R('بالشاو روبيان لايت هندي', 'Prawn balchao light', 'Balchao de crevettes léger', 'Balchao de gambas ligero', 'Indisches leichtes Garnelen-Balchao', 'seafood_mains', 'lunch', 'goa', 180),
);
// --- bengal ------------------------------------------------------------------
dishes.push(
  R('ماشر جول لايت هندي', 'Macher jhol light', 'Macher jhol léger', 'Macher jhol ligero', 'Indisches leichtes Macher-Jhol', 'seafood_mains', 'lunch', 'bengal', 130),
  R('شينغري مالاي كاري لايت هندي', 'Chingri malai curry light', 'Chingri malai curry léger', 'Chingri malai curry ligero', 'Indisches leichtes Chingri-Malai-Curry', 'seafood_mains', 'lunch', 'bengal', 165),
  R('راسغولا لايت هندية', 'Rasgulla light', 'Rasgulla léger', 'Rasgulla ligero', 'Indisches leichtes Rasgulla', 'desserts_sweets', 'snacks', 'bengal', 210),
  R('ميشتيدوي لايت هندية', 'Mishti doi light', 'Mishti doi léger', 'Mishti doi ligero', 'Indisches leichtes Mishti-Doi', 'desserts_sweets', 'snacks', 'bengal', 115),
  R('بهابا إليش لايت هندي', 'Bhapa ilish light', 'Bhapa ilish léger', 'Bhapa ilish ligero', 'Indisches leichtes Bhapa-Ilish', 'seafood_mains', 'lunch', 'bengal', 175),
  R('إيغ رول كولكاتا لايت هندي', 'Kolkata egg roll light', 'Egg roll de Calcutta léger', 'Egg roll de Calcuta ligero', 'Indisches leichtes Kolkata-Egg-Roll', 'street_snacks', 'snacks', 'bengal', 220),
);
// --- bihar -------------------------------------------------------------------
dishes.push(
  R('ساتو باراثا لايت هندية', 'Sattu paratha light', 'Paratha au sattu léger', 'Paratha de sattu ligero', 'Indisches leichtes Sattu-Paratha', 'breakfast_items', 'breakfast', 'bihar', 275),
  R('ثيكوا لايت هندية', 'Thekua light', 'Thekua léger', 'Thekua ligero', 'Indisches leichtes Thekua', 'desserts_sweets', 'snacks', 'bihar', 300),
  R('غوغني لايت هندية', 'Ghugni light', 'Ghugni léger', 'Ghugni ligero', 'Indisches leichtes Ghugni', 'street_snacks', 'snacks', 'bihar', 105),
  R('دال بيثا لايت هندية', 'Dal pitha light', 'Dal pitha léger', 'Dal pitha ligero', 'Indisches leichtes Dal-Pitha', 'vegetarian_mains', 'lunch', 'bihar', 175),
);

// ============================================================ ASIAN_SHARED
dishes.push(
  R('ساموسة لحم مقلية هندية', 'Fried meat samosa', 'Samosa de viande frite', 'Samosa de carne frita', 'Indische frittierte Fleisch-Samosa', 'street_snacks', 'snacks', 'asian_shared', 265),
  R('ساموسة خضار مقلية هندية', 'Fried veg samosa', 'Samosa de légumes frite', 'Samosa de verduras frita', 'Indische frittierte Gemüse-Samosa', 'street_snacks', 'snacks', 'asian_shared', 220),
  R('ماسالا تشاي هندية بالزنجبيل والهيل', 'Ginger cardamom masala chai', 'Chai masala au gingembre et cardamome', 'Chai masala de jengibre y cardamomo', 'Masala-Chai mit Ingwer und Kardamom', 'beverages', 'snacks', 'asian_shared', 45),
  R('كولفي فستق هندي', 'Pistachio kulfi', 'Kulfi aux pistaches', 'Kulfi de pistacho', 'Indisches Pistazien-Kulfi', 'desserts_sweets', 'snacks', 'asian_shared', 255),
  R('رز بسمتي سادة هندي', 'Plain steamed basmati rice', 'Riz basmati cuit à la vapeur', 'Arroz basmati al vapor', 'Indischer gedämpfter Basmati-Reis', 'rice_biryani', 'lunch', 'asian_shared', 130),
  R('دال أصفر سادة هندية', 'Plain yellow dal', 'Dal jaune nature', 'Dal amarillo simple', 'Einfaches gelbes indisches Dal', 'dals_legumes', 'lunch', 'asian_shared', 95),
);

// --- pan_indian top-up -------------------------------------------------------
dishes.push(
  R('برياني مخلط لايت هندي', 'Mixed biryani light', 'Biryani mélangé léger', 'Biryani mixto ligero', 'Indisches leichtes Misch-Biryani', 'rice_biryani', 'lunch', 'pan_indian', 215),
  R('قرنبيط ماسالا جاف لايت هندي', 'Dry cauliflower masala light', 'Masala de chou-fleur sec léger', 'Masala de coliflor seco ligero', 'Indisches leichtes trockenes Blumenkohl-Masala', 'vegetarian_mains', 'lunch', 'pan_indian', 75),
  R('بطاطا زبادي لايت هندية', 'Yogurt potatoes light', 'Pommes de terre au yaourt légères', 'Patatas al yogur ligeras', 'Indische leichte Joghurt-Kartoffeln', 'vegetarian_mains', 'lunch', 'pan_indian', 95),
  R('دجاج بياز لايت هندي', 'Onion chicken light', 'Poulet à l\'oignon léger', 'Pollo con cebolla ligero', 'Indisches leichtes Zwiebel-Hähnchen', 'poultry_mains', 'lunch', 'pan_indian', 160),
  R('لحم ضأن بياز لايت هندي', 'Onion mutton light', 'Mouton à l\'oignon léger', 'Cordero con cebolla ligero', 'Indisches leichtes Zwiebel-Lamm', 'meat_mains', 'lunch', 'pan_indian', 190),
  R('كباب دجاج تندوري لايت هندي', 'Tandoori chicken kebab light', 'Kebab de poulet tandoori léger', 'Kebab de pollo tandoori ligero', 'Indisches leichtes Tandoori-Hähnchen-Kebab', 'poultry_mains', 'lunch', 'pan_indian', 195),
  R('روبيان مقلي جوز الهند لايت هندي', 'Coconut fried prawns light', 'Crevettes frites au coco légères', 'Gambas fritas con coco ligeras', 'Indische leichte Kokos-Garnelen', 'seafood_mains', 'lunch', 'pan_indian', 150),
  R('شوربة حمص لايت هندية', 'Chickpea soup light', 'Soupe de pois chiches légère', 'Sopa de garbanzos ligera', 'Indische leichte Kichererbsensuppe', 'soups_salads', 'dinner', 'pan_indian', 70),
  R('سلطة عدس هندية', 'Lentil salad', 'Salade de lentilles', 'Ensalada de lentejas', 'Indischer Linsensalat', 'soups_salads', 'snacks', 'pan_indian', 95),
  R('مخلل خضار مشكل هندي', 'Mixed vegetable pickle', 'Achar de légumes mélangés', 'Encurtido de verduras mixtas', 'Indisches gemischtes Gemüse-Pickle', 'condiments', 'snacks', 'pan_indian', 55),
);

// ============================================================ GLOBAL STAPLES + MACROS
// Three globally recognised staples (explicit macros supplied; the rest are category-estimated).
dishes.push(
  R('بتر دجاج كلاسيكي هندي', 'Butter chicken (Murgh Makhani)', 'Poulet au beurre classique indien', 'Pollo a la mantequilla clásico indio', 'Indisches klassisches Butter-Chicken', 'poultry_mains', 'lunch', 'pan_indian', 190, 23, 6, 9),
  R('دوسا ماسالا كلاسيك هندية', 'Masala dosa classic', 'Dosa masala classique indien', 'Dosa masala clásico indio', 'Indisches klassisches Masala-Dosa', 'breakfast_items', 'breakfast', 'tamil_nadu', 175, 6, 22, 7),
  R('دجاج تندوري كلاسيك هندي', 'Tandoori chicken classic', 'Poulet tandoori classique indien', 'Pollo tandoori clásico indio', 'Indisches klassisches Tandoori-Hähnchen', 'poultry_mains', 'lunch', 'pan_indian', 180, 27, 1, 8),
);

// Per-category macro templates (grams per 100 g) used to estimate P/C/F when not authored.
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

if (dishes.length !== 303) {
  console.error(`\nEXPECTED 303 dishes, got ${dishes.length}. Fix before writing.`);
  process.exit(1);
}

fs.writeFileSync(
  path.join(__dirname, 'india-300-proposal.json'),
  JSON.stringify(
    {
      meta: { target: 400, new_dishes: dishes.length, with_macros: true },
      categories: Object.keys(byCategory),
      regions: Object.keys(byRegion),
      meal_types: Object.keys(byMeal),
      dishes,
    },
    null,
    2
  )
);
console.log('\nWrote scripts/india-300-proposal.json');