import { B, T } from './rows.mjs';

export default [
  // vegetable_mains (12)
  B(`خضار مقلية بالثوم ${T}`, 'Garlic fried vegetables', 'Legumes frits a l ail', 'Verduras fritas con ajo', 'Gebratener Gemuese-Knoblauch', 'vegetable_mains', 'lunch', 5, 14, 8, 'stir-fried', 'pan_taiwanese'),
  B(`لفائف الخضار المقلية ${T}`, 'Fried vegetable rolls', 'Rouleaux de legumes frites', 'Rollitos de verduras fritos', 'Gebratene Gemueserollen', 'vegetable_mains', 'lunch', 6, 18, 7, 'fried', 'tainan'),
  B(`بروكلي مبخر بالثوم ${T}`, 'Steamed garlic broccoli', 'Brocoli vapeur a l ail', 'Brocoli al vapor con ajo', 'Gedaempfter Knoblauchbrokkoli', 'vegetable_mains', 'lunch', 6, 11, 5, 'steamed', 'taipei'),
  B(`لفائف فطر الخضار ${T}`, 'Mushroom vegetable rolls', 'Rouleaux de legumes aux champignons', 'Rollitos de verduras con setas', 'Gemuese-Fungusrollen', 'vegetable_mains', 'lunch', 6, 17, 7, 'pan-fried', 'nantou'),
  B(`بيض الطماطم المخبوز ${T}`, 'Baked tomato eggs', 'Oeufs de tomates au four', 'Huevos de tomate al horno', 'Gebackene Tomateneier', 'vegetable_mains', 'breakfast', 11, 10, 9, 'baked', 'pan_taiwanese'),
  B(`خضار الريحان ${T}`, 'Basil vegetables', 'Legumes au basilic', 'Verduras con albahaca', 'Basilikum-Gemuese', 'vegetable_mains', 'lunch', 5, 12, 7, 'stir-fried', 'tainan'),
  B(`سلطة الخضار المعلبة ${T}`, 'Pickled vegetable salad', 'Salade de legumes marinés', 'Ensalada de verduras encurtidas', 'Eingelegter Gemuesesalat', 'vegetable_mains', 'lunch', 4, 10, 4, 'raw', 'chiayi'),
  B(`باذناع مقلي بالثوم ${T}`, 'Garlic fried eggplant', 'Aubergine fritee a l ail', 'Berenjena frita con ajo', 'Gebratene Knoblauch-Aubergine', 'vegetable_mains', 'lunch', 5, 14, 8, 'pan-fried', 'yilan'),
  B(`معكرونة الخضار المطهوة ${T}`, 'Stir-fried vegetable noodles', 'Nouilles de legumes sautees', 'Fideos de verduras salteados', 'Gemuestenudeln gebratener Gemuese', 'vegetable_mains', 'lunch', 7, 30, 7, 'stir-fried', 'yilan'),
  B(`قرنبيط مقلي بالثوم ${T}`, 'Garlic fried cauliflower', 'Chou-fleur frit a l ail', 'Coliflor frita con ajo', 'Gebratener Knoblauch-Blumenkohl', 'vegetable_mains', 'lunch', 6, 13, 8, 'fried', 'chiayi'),
  B(`لحم نباتي مقرمش ${T}`, 'Crispy vegetable patty', 'Galette de legumes croustillante', 'Hamburguesa de verduras crujiente', 'Knusprige Gemueseplatte', 'vegetable_mains', 'lunch', 9, 20, 9, 'pan-fried', 'nantou'),
  B(`شوربة الخضار المطهوة ${T}`, 'Braised vegetable soup', 'Soupe de legumes braisee', 'Sopa de verduras guisada', 'Geschmorte Gemuesesuppe', 'vegetable_mains', 'lunch', 5, 13, 4, 'simmered', 'hualien'),

  // street_snacks (12)
  B(`لحم مقرمش مقلي ${T}`, 'Crispy fried meat roll', 'Rouleau de viande croustillant', 'Rollito de carne crujiente', 'Knusprige Fleischrolle', 'street_snacks', 'lunch', 16, 20, 11, 'fried', 'taipei'),
  B(`كعك الأرز المخبوز ${T}`, 'Baked rice cake roll', 'Gateau de riz au four', 'Pastel de arroz al horno', 'Gebackener Reiskuchen', 'street_snacks', 'lunch', 8, 24, 8, 'baked', 'tainan'),
  B(`أسياخ لحم البقر المشوية ${T}`, 'Grilled beef skewer', 'Brochette de boeuf grillee', 'Pincho de ternera a la parrilla', 'Gegrilltes Rindfleischspiess', 'street_snacks', 'lunch', 20, 8, 13, 'grilled', 'kaohsiung'),
  B(`كعك السمك المقرمش ${T}`, 'Crispy fish cake', 'Gaufrette de poisson croustillante', 'Pastel de pescado crujiente', 'Knuspriger Fischlaibchen', 'street_snacks', 'lunch', 11, 16, 7, 'pan-fried', 'taipei'),
  B(`أسياخ الخضار ${T}`, 'Vegetable skewer', 'Brochette de legumes', 'Pincho de verduras', 'Gemuessespies', 'street_snacks', 'lunch', 6, 15, 5, 'grilled', 'hsinchu'),
  B(`قرص البطاطا الحلو ${T}`, 'Sweet potato cake', 'Gateau de patate douce', 'Pastel de boniato', 'Suesskartoffelkuchen', 'street_snacks', 'snack', 5, 20, 7, 'pan-fried', 'tainan'),
  B(`لفائف اللحم المطهي ${T}`, 'Braised meat roll', 'Rouleau de viande braise', 'Rollito de carne guisada', 'Geschmorte Fleischrolle', 'street_snacks', 'lunch', 17, 19, 10, 'simmered', 'tainan'),
  B(`كعك الأرز المقرمش ${T}`, 'Crispy rice cracker', 'Galette de riz croustillante', 'Galleta de arroz crujiente', 'Knuspriger Reiscracker', 'street_snacks', 'snack', 6, 22, 6, 'baked', 'chiayi'),
  B(`أسياخ لحم البقر الحارة ${T}`, 'Spicy beef skewer', 'Brochette de boeuf epicee', 'Pincho de ternera picante', 'Wuerziges Rindfleischspiess', 'street_snacks', 'lunch', 21, 7, 13, 'grilled', 'tainan'),
  B(`سمك مقرمش صغير ${T}`, 'Small crispy fish fritter', 'Petit beignet de poisson', 'Pescadito crujiente', 'Knusperige Fischbeisschen', 'street_snacks', 'snack', 13, 14, 8, 'fried', 'keelung'),
  B(`فطائر الخضار المبخرة ${T}`, 'Steamed vegetable buns', 'Buns aux legumes vapeur', 'Bollos de verduras al vapor', 'Gedaempfte Gemuesebroetchen', 'street_snacks', 'lunch', 7, 19, 6, 'steamed', 'nantou'),
  B(`قرص الأرز الحلو ${T}`, 'Sweet rice disc', 'Disque de riz sucre', 'Disco de arroz dulce', 'SuessReisscheibe', 'street_snacks', 'snack', 5, 23, 5, 'baked', 'hualien'),
];
