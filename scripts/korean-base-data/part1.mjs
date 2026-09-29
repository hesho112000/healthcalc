// Korean base part 1 of 6: breakfast_items (15) + rice_dishes (20) = 35 rows.
// Halal notes: no pork anywhere (pork belly -> beef brisket, pork broth -> beef/chicken
// broth, spam -> beef and chicken). No alcohol (soju/makgeolli -> beef broth,
// rice vinegar, perilla extract and fruit vinegar, all alcohol-free).
// Arabic names are written in pure Arabic script; every one carries the masculine
// كوري token so nationality resolution maps to pan_korean.
import { B, T } from './rows.mjs';

export default [
  // --- breakfast_items (15) ---
  B(`غوكباب لحم البقر ${T}`, 'Beef gukbap rice soup', 'Riz dans un bouillon de boeuf', 'Arroz en caldo de ternera', 'Rissuppe mit Rindfleisch', 'breakfast_items', 'breakfast', 9, 30, 5, 'simmered'),
  B(`ميوكوك لحم البقر ${T}`, 'Beef seaweed soup', 'Soupe aux algues et au boeuf', 'Sopa de algas con ternera', 'Rindfleisch-Meersalzen-Suppe', 'breakfast_items', 'breakfast', 11, 8, 4, 'simmered'),
  B(`كونغنامول غو لحم البقر ${T}`, 'Beef soybean sprout soup', 'Soupe de pousses de soja et de boeuf', 'Sopa de germenes de soja y ternera', 'Rindfleisch-Sojohackensuppe', 'breakfast_items', 'breakfast', 10, 9, 3, 'simmered'),
  B(`سوبيان غوك ${T}`, 'Soybean paste soup', 'Soupe a la pate de soja', 'Sopa de pasta de soja', 'Sojabohnenpastete-Suppe', 'breakfast_items', 'breakfast', 6, 9, 3, 'simmered'),
  B(`جيدان جام ${T}`, 'Steamed egg custard', 'Oeuf cuit a la vapeur', 'Huevo al vapor', 'Dampfgegartes Ei', 'breakfast_items', 'breakfast', 12, 4, 7, 'steamed'),
  B(`غيدران ماري ${T}`, 'Rolled Korean omelette', 'Omelette coreennee', 'Tortilla coreana enrollada', 'Koreanisches Omelett', 'breakfast_items', 'breakfast', 13, 3, 9, 'griddled'),
  B(`غيدران فري ${T}`, 'Korean fried eggs', 'Oeufs au plat', 'Huevos fritos', 'Gebratene Eier', 'breakfast_items', 'breakfast', 13, 1, 10, 'pan-fried'),
  B(`سوجام باب ${T}`, 'Salted steamed rice', 'Riz cuit au sel', 'Arroz cocido con sal', 'Gesalzener Reis', 'breakfast_items', 'breakfast', 4, 30, 1, 'steamed'),
  B(`جوك لحم البقر ${T}`, 'Beef rice porridge', 'Porridge de riz au boeuf', 'Gachas de arroz con ternera', 'Rindfleisch-Reisbrei', 'breakfast_items', 'breakfast', 7, 22, 4, 'simmered'),
  B(`توست بالبيض ${T}`, 'Korean egg toast', 'Toast aux oeufs', 'Tosta coreana con huevo', 'Koreanischer Eier-Toast', 'breakfast_items', 'breakfast', 9, 20, 8, 'griddled'),
  B(`جوموك باب ${T}`, 'Korean breakfast rice ball', 'Boule de riz coreenne', 'Bola de arroz coreana', 'Koreanischer Reiskugel', 'breakfast_items', 'breakfast', 8, 30, 5, 'steamed'),
  B(`كيمباب ${T}`, 'Kimbap breakfast roll', 'Kimbap au debit', 'Kimbap coreano', 'Koreanische Kimbap-Rolle', 'breakfast_items', 'breakfast', 8, 28, 6, 'steamed'),
  B(`سيغومتشي نامول ${T}`, 'Blanched spinach', 'Epinards blanchis', 'Espinacas blanqueadas', 'Blattspinat', 'breakfast_items', 'breakfast', 4, 4, 1, 'simmered'),
  B(`كونغنامول ${T}`, 'Seasoned soybean sprouts', 'Pousses de soja assaisonnees', 'Brotes de soja sazonados', 'Wuerzige Sojohacken', 'breakfast_items', 'breakfast', 5, 8, 2, 'simmered'),
  B(`دولغا جوك ${T}`, 'Sesame rice porridge', 'Porridge de riz au sesame', 'Gachas de arroz con sesamo', 'Sesam-Reisbrei', 'breakfast_items', 'breakfast', 5, 24, 6, 'simmered'),

  // --- rice_dishes (20) ---
  B(`بيبارباب ${T}`, 'Bibimbap', 'Bibimbap', 'Bibimbap', 'Bibimbap', 'rice_dishes', 'lunch', 13, 42, 11, 'stir-fried'),
  B(`بولوغوجي لحم البقر ${T}`, 'Beef bulgogi', 'Bulgogi de boeuf', 'Bulgogi de ternera', 'Rindfleisch-Bulgogi', 'rice_dishes', 'lunch', 22, 24, 12, 'grilled'),
  B(`تشادول باغي ${T}`, 'Diced beef rice bowl', 'Bol de riz au boeuf en cubes', 'Bol de arroz con ternera en dados', 'Reisschale mit gewuerfeltem Rindfleisch', 'rice_dishes', 'lunch', 20, 28, 9, 'stir-fried'),
  B(`كيمتشي بوكمباب ${T}`, 'Kimchi fried rice', 'Riz saute au kimchi', 'Arroz frito con kimchi', 'Kimchi gebratener Reis', 'rice_dishes', 'lunch', 9, 36, 8, 'stir-fried'),
  B(`داك بوكمباب ${T}`, 'Chicken fried rice', 'Riz saute au poulet', 'Arroz frito con pollo', 'Huhn-Gebratener-Reis', 'rice_dishes', 'lunch', 14, 33, 9, 'stir-fried'),
  B(`ساوي بوكمباب ${T}`, 'Shrimp fried rice', 'Riz saute aux crevettes', 'Arroz frito con camarones', 'Garnelen-Gebratener-Reis', 'rice_dishes', 'lunch', 13, 32, 8, 'stir-fried'),
  B(`سوجوجي نامول باب ${T}`, 'Beef and vegetable rice bowl', 'Bol de riz au boeuf et aux legumes', 'Bol de arroz con ternera y verduras', 'Reisschale mit Rindfleisch und Gemuese', 'rice_dishes', 'lunch', 18, 34, 7, 'simmered'),
  B(`كودورو جوريم ${T}`, 'Braised mackerel with rice', 'Maquereau braise avec riz', 'Caballa guisada con arroz', 'Geschmortes Makrelen-Reisgericht', 'rice_dishes', 'dinner', 20, 26, 11, 'simmered'),
  B(`غالتشي جوريم ${T}`, 'Braised hairtail with rice', 'Poisson-ruban braise avec riz', 'Cinuron de pez guisado con arroz', 'Haifischrücken-Reisgericht', 'rice_dishes', 'dinner', 19, 25, 10, 'simmered'),
  B(`جوجي بوكمباب ${T}`, 'Clam fried rice', 'Riz saute aux palourdes', 'Arroz frito con almejas', 'Muschel-Gebratener-Reis', 'rice_dishes', 'lunch', 12, 33, 7, 'stir-fried'),
  B(`بوسوت بوكمباب ${T}`, 'Mushroom fried rice', 'Riz saute aux champignons', 'Arroz frito con hongos', 'Pilz-Gebratener-Reis', 'rice_dishes', 'lunch', 7, 35, 6, 'stir-fried'),
  B(`تشوتشي باب ${T}`, 'Japchae rice bowl', 'Bol de riz au japchae', 'Bol de arroz con japchae', 'Reisschale mit Japchae', 'rice_dishes', 'lunch', 12, 40, 9, 'stir-fried'),
  B(`بولوغوجي بوسوت ${T}`, 'Mushroom bulgogi rice bowl', 'Bol de riz au bulgogi de champignons', 'Bol de arroz con bulgogi de hongos', 'Reisschale mit Pilz-Bulgogi', 'rice_dishes', 'dinner', 20, 30, 10, 'stir-fried'),
  B(`هايمول بيبارباب ${T}`, 'Seafood bibimbap', 'Bibimbap aux fruits de mer', 'Bibimbap de mariscos', 'Bibimbap mit Meeresfruechten', 'rice_dishes', 'lunch', 20, 40, 8, 'stir-fried'),
  B(`دوبو كيمتشي ${T}`, 'Braised tofu with kimchi', 'Tofu braise au kimchi', 'Tofu guisado con kimchi', 'Kimchi-Tofu-Eintopf', 'rice_dishes', 'dinner', 13, 12, 8, 'simmered'),
  B(`سوجوجي غوتشوجانغ باب ${T}`, 'Beef gochujang rice bowl', 'Bol de riz au boeuf et gochujang', 'Bol de arroz con ternera y gochujang', 'Reisschale mit Rindfleisch-Gochujang', 'rice_dishes', 'lunch', 21, 30, 10, 'stir-fried'),
  B(`بوكم ميونتشي ${T}`, 'Stir-fried dried anchovies', 'Anchois seches sautes', 'Anchoas fritas', 'Gebratene Sardinen', 'rice_dishes', 'side', 14, 12, 9, 'stir-fried'),
  B(`هوانتاي تشاي بوكم ${T}`, 'Stir-fried salted pollock and vegetables', 'Morue salee sautee aux legumes', 'Abadejo salado salteado con verduras', 'Gesalzter Kabeljau mit Gemuese gebraten', 'rice_dishes', 'dinner', 18, 15, 8, 'stir-fried'),
  B(`داك غوتشوجانغ باب ${T}`, 'Spicy chicken rice bowl', 'Bol de riz au poulet et gochujang', 'Bol de arroz con pollo y gochujang', 'Reisschale mit Huhn und Gochujang', 'rice_dishes', 'lunch', 23, 29, 10, 'stir-fried'),
  B(`غالبي باب ${T}`, 'Short rib rice bowl', 'Bol de riz aux cotes de boeuf', 'Bol de arroz con costillas de ternera', 'Reisschale mit Rinderrippen', 'rice_dishes', 'dinner', 22, 30, 12, 'simmered'),
];
