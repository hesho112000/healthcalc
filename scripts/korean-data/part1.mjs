import { E, T } from './rows.mjs';

// breakfast_items (12)
export default [
  E(`عصيدة الأرز بالفولك ${T}`, 'Abalone rice porridge', 'Bouillie de riz aux ormeaux', 'Gachas de arroz con abulon', 'Reisbrei mit Abalone', 'breakfast_items', 'breakfast', 8, 14, 2, 'simmered', 'jeju'),
  E(`عصيدة الدجاج بالجينسنغ ${T}`, 'Ginseng chicken rice porridge', 'Bouillie de poulet au ginseng', 'Gachas de pollo con ginseng', 'Huhn-Ginseng-Reisbrei', 'breakfast_items', 'breakfast', 12, 13, 3, 'simmered', 'pan_korean'),
  E(`عصيدة اليقطين ${T}`, 'Pumpkin rice porridge', 'Bouillie de potiron', 'Gachas de calabaza', 'Kuerbis-Reisbrei', 'breakfast_items', 'breakfast', 3, 20, 1, 'simmered', 'pan_korean'),
  E(`عصيدة الفاصولياء الحمراء ${T}`, 'Red bean rice porridge', 'Bouillie de haricots rouges', 'Gachas de judia roja', 'Rote-Bohnen-Reisbrei', 'breakfast_items', 'breakfast', 4, 22, 1, 'simmered', 'pan_korean'),
  E(`حساء التوفو الحريري بالفطور ${T}`, 'Soft tofu breakfast stew', 'Ragout de tofu soyeux', 'Guiso de tofu suave', 'Seidentofu-Eintopf', 'breakfast_items', 'breakfast', 10, 6, 6, 'simmered', 'pan_korean'),
  E(`ماكريل مشوي مع الأرز ${T}`, 'Grilled mackerel with rice', 'Maquereau grille au riz', 'Caballa a la parrilla con arroz', 'Gegrillte Makrele mit Reis', 'breakfast_items', 'breakfast', 18, 18, 8, 'grilled', 'busan'),
  E(`كسترد البيض المطهو بالبخار ${T}`, 'Gyeranjjim steamed egg custard', 'Creme d oeuf vapeur', 'Flan de huevo al vapor', 'Gedampfter Eierstich', 'breakfast_items', 'breakfast', 9, 3, 6, 'steamed', 'pan_korean'),
  E(`حساء براعم الصويا مع الأرز ${T}`, 'Soybean sprout hangover soup with rice', 'Soupe de germes de soja au riz', 'Sopa de brotes de soja con arroz', 'Sojasprossen-Suppe mit Reis', 'breakfast_items', 'breakfast', 7, 16, 3, 'simmered', 'jeonju'),
  E(`حساء سمك القد المجفف مع الأرز ${T}`, 'Dried pollack soup with rice', 'Soupe de colin seche au riz', 'Sopa de abadejo seco con arroz', 'Getrocknete-Pollack-Suppe mit Reis', 'breakfast_items', 'breakfast', 14, 12, 2, 'simmered', 'gangneung'),
  E(`حساء الأعشاب البحرية باللحم والأرز ${T}`, 'Seaweed soup with beef and rice', 'Soupe d algues au boeuf et riz', 'Sopa de algas con ternera y arroz', 'Algensuppe mit Rind und Reis', 'breakfast_items', 'breakfast', 12, 14, 5, 'simmered', 'busan'),
  E(`حساء عظام البقر مع الأرز ${T}`, 'Beef bone soup with rice', 'Soupe a l os de boeuf au riz', 'Sopa de hueso de ternera con arroz', 'Rinderknochen-Suppe mit Reis', 'breakfast_items', 'breakfast', 15, 12, 8, 'simmered', 'seoul'),
  E(`توفو مقلي بصلصة الصويا ${T}`, 'Pan-fried tofu with soy', 'Tofu poele a la sauce soja', 'Tofu a la plancha con soja', 'Gebratener Tofu mit Sojasauce', 'breakfast_items', 'breakfast', 11, 5, 8, 'pan-fried', 'pan_korean'),

  // rice_dishes (20)
  E(`بيبيمباب لحم البقر في جونجو ${T}`, 'Jeonju beef bibimbap', 'Bibimbap au boeuf de Jeonju', 'Bibimbap de ternera de Jeonju', 'Jeonju-Rindfleisch-Bibimbap', 'rice_dishes', 'lunch', 16, 32, 12, 'stir-fried', 'jeonju'),
  E(`بيبيمباب القدر الحجري ${T}`, 'Stone pot bibimbap', 'Bibimbap en pot de pierre', 'Bibimbap en olla de piedra', 'Bibimbap im Steintopf', 'rice_dishes', 'lunch', 15, 33, 12, 'stir-fried', 'jeonju'),
  E(`بيبيمباب الخضار ${T}`, 'Vegetable bibimbap', 'Bibimbap aux legumes', 'Bibimbap de verduras', 'Gemuese-Bibimbap', 'rice_dishes', 'lunch', 9, 38, 8, 'stir-fried', 'jeonju'),
  E(`بيبيمباب الأعشاب البرية ${T}`, 'Wild herb bibimbap', 'Bibimbap aux herbes sauvages', 'Bibimbap de hierbas silvestres', 'Wildkraeuter-Bibimbap', 'rice_dishes', 'lunch', 10, 36, 9, 'stir-fried', 'goryeong'),
  E(`وعاء أرز الأخطبوط الحار ${T}`, 'Spicy octopus rice bowl', 'Bol de riz au poulpe epice', 'Bol de arroz con pulpo picante', 'Scharfe Oktopus-Reisschale', 'rice_dishes', 'lunch', 18, 30, 8, 'stir-fried', 'busan'),
  E(`أرز الكيمتشي المقلي الحار ${T}`, 'Spicy kimchi fried rice', 'Riz saute au kimchi epice', 'Arroz frito con kimchi picante', 'Scharfer Kimchi-Bratreis', 'rice_dishes', 'lunch', 8, 36, 11, 'stir-fried', 'pan_korean'),
  E(`أرز الجمبري المقلي بالثوم ${T}`, 'Garlic shrimp fried rice', 'Riz saute aux crevettes a l ail', 'Arroz frito con gambas al ajo', 'Knoblauch-Garnelen-Bratreis', 'rice_dishes', 'lunch', 15, 34, 9, 'stir-fried', 'incheon'),
  E(`وعاء أرز بولغوغي ${T}`, 'Bulgogi rice bowl', 'Bol de riz au bulgogi', 'Bol de arroz con bulgogi', 'Bulgogi-Reisschale', 'rice_dishes', 'lunch', 20, 30, 13, 'stir-fried', 'seoul'),
  E(`وعاء أرز داكغالبي ${T}`, 'Dakgalbi rice bowl', 'Bol de riz au dakgalbi', 'Bol de arroz con dakgalbi', 'Dakgalbi-Reisschale', 'rice_dishes', 'lunch', 19, 31, 11, 'stir-fried', 'chuncheon'),
  E(`وعاء أرز التونة بالكيمتشي ${T}`, 'Tuna kimchi rice bowl', 'Bol de riz au thon et kimchi', 'Bol de arroz con atun y kimchi', 'Thunfisch-Kimchi-Reisschale', 'rice_dishes', 'lunch', 17, 31, 10, 'stir-fried', 'pan_korean'),
  E(`وعاء أرز البيض ${T}`, 'Egg rice bowl', 'Bol de riz aux oeufs', 'Bol de arroz con huevo', 'Eier-Reisschale', 'rice_dishes', 'lunch', 11, 34, 9, 'pan-fried', 'pan_korean'),
  E(`وعاء أرز الأنشوجة ${T}`, 'Anchovy rice bowl', 'Bol de riz aux anchois', 'Bol de arroz con anchoas', 'Sardellen-Reisschale', 'rice_dishes', 'lunch', 13, 33, 7, 'stir-fried', 'busan'),
  E(`أرز السلطعون بصلصة الصويا ${T}`, 'Soy crab rice', 'Riz au crabe a la sauce soja', 'Arroz con cangrejo en salsa de soja', 'Sojasossen-Krabben-Reis', 'rice_dishes', 'lunch', 19, 28, 6, 'simmered', 'pan_korean'),
  E(`أرز براعم الصويا ${T}`, 'Soybean sprout rice', 'Riz aux germes de soja', 'Arroz con brotes de soja', 'Sojasprossen-Reis', 'rice_dishes', 'lunch', 9, 35, 6, 'simmered', 'jeonju'),
  E(`أرز الشعير المخلوط ${T}`, 'Barley mixed rice', 'Riz melange a l orge', 'Arroz mezclado con cebada', 'Gersten-Mischreis', 'rice_dishes', 'lunch', 7, 36, 3, 'steamed', 'pan_korean'),
  E(`أرز الفجل ${T}`, 'Radish rice', 'Riz au radis', 'Arroz con rabano', 'Rettich-Reis', 'rice_dishes', 'lunch', 6, 34, 4, 'steamed', 'pan_korean'),
  E(`أرز اللحم المفروم ${T}`, 'Minced beef rice', 'Riz a la viande hachee', 'Arroz con carne picada', 'Hackfleisch-Reis', 'rice_dishes', 'lunch', 16, 32, 12, 'stir-fried', 'pan_korean'),
  E(`أرز المحار ${T}`, 'Oyster rice', 'Riz aux huitres', 'Arroz con ostras', 'Austern-Reis', 'rice_dishes', 'lunch', 14, 33, 5, 'simmered', 'tongyeong'),
  E(`أرز الفطر ${T}`, 'Mushroom rice', 'Riz aux champignons', 'Arroz con setas', 'Pilz-Reis', 'rice_dishes', 'lunch', 8, 35, 5, 'steamed', 'pan_korean'),
  E(`أرز الكراث البري ${T}`, 'Wild chive rice', 'Riz aux ciboulettes sauvages', 'Arroz con cebollino silvestre', 'Wildschnittlauch-Reis', 'rice_dishes', 'lunch', 7, 36, 5, 'steamed', 'goryeong'),
];
