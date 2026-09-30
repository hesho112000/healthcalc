import { B, diasporaFor } from './rows.mjs';

const R = 'pan_canadian';
const Q = 'quebec';
const O = 'ontario';
const BC = 'british_columbia';
const P = 'prairies';
const A = 'atlantic_canada';
const N = 'northern_canada';
const I = 'indigenous_canada';

export default [
  B('صدر دجاج مدخن كندي', 'Canadian Smoked Chicken Breast', 'Poitrine de poulet fumée', 'Pechuga de pollo ahumada', 'Geräucherte Hähnchenbrust', 'poultry_mains', 'lunch', 25, 0, 3, 'smoking', R, diasporaFor(R)),
  B('لحم ضأن كندي مشوي', 'Roasted Canadian Lamb', 'Agneau canadien rôti', 'Cordero canadiense asado', 'Gebratenes kanadisches Lamm', 'meat_mains', 'dinner', 22, 0, 18, 'roasting', R, diasporaFor(R)),
  B('شوربة العدس كندي البنية', 'Canadian Brown Lentil Soup', 'Soupe aux lentilles brunes', 'Sopa de lentejas marrones', 'Braune Linsensuppe', 'soups_stews', 'lunch', 9, 20, 1, 'boiling', P, diasporaFor(P)),
  B('فطيرة الراعي كندي (حلال)', 'Halal Canadian Shepherd\'s Pie', 'Pâté chinois halal', 'Pastel de pastor canadiense halal', 'Halal-Hirtentorte', 'meat_mains', 'dinner', 15, 20, 12, 'baking', Q, diasporaFor(Q)),
  B('برجر لحم بقري كندي (حلال)', 'Halal Canadian Beef Burger', 'Burger au bœuf canadien halal', 'Hamburguesa de res canadiense halal', 'Halal-Kanadischer Rinderburger', 'meat_mains', 'lunch', 20, 25, 15, 'grilling', R, diasporaFor(R)),
  B('سلطة باستا كندي بالخضار', 'Canadian Veggie Pasta Salad', 'Salade de pâtes aux légumes', 'Ensalada de pasta con verduras', 'Nudelsalat mit Gemüse', 'vegetable_mains', 'lunch', 5, 28, 8, 'boiling', R, diasporaFor(R)),
  B('روبيان أتلانتيك كندي مسلوق', 'Boiled Atlantic Shrimp', 'Crevettes de l\'Atlantique bouillies', 'Camarones del Atlántico hervidos', 'Gekochte Atlantik-Garnelen', 'fish_seafood', 'dinner', 20, 0, 1, 'boiling', A, diasporaFor(A)),
  B('حساء الطماطم كندي المنزلي', 'Homemade Canadian Tomato Soup', 'Soupe à la tomate maison', 'Sopa de tomate casera', 'Hausgemachte Tomatensuppe', 'soups_stews', 'lunch', 2, 12, 4, 'boiling', O, diasporaFor(O)),
  B('خبز الذرة كندي الساخن', 'Warm Canadian Cornbread', 'Pain de maïs chaud', 'Pan de maíz caliente', 'Warmes Maisbrot', 'breakfast_items', 'breakfast', 5, 45, 10, 'baking', R, diasporaFor(R)),
  B('مربى الفراولة كندي الطبيعي', 'Canadian Strawberry Jam', 'Confiture de fraises canadienne', 'Mermelada de fresa canadiense', 'Kanadische Erdbeermarmelade', 'condiments_sauces', 'breakfast', 0, 60, 0, 'boiling', R, diasporaFor(R)),
  B('زبادي كندي بالعسل', 'Canadian Yogurt with Honey', 'Yaourt canadien au miel', 'Yogur canadiense con miel', 'Kanadischer Joghurt mit Honig', 'breakfast_items', 'breakfast', 4, 15, 3, 'chilling', R, diasporaFor(R)),
  B('أرز بري كندي مطبوخ', 'Cooked Canadian Wild Rice', 'Riz sauvage canadien cuit', 'Arroz silvestre canadiense cocido', 'Gekochter kanadischer Wildreis', 'rice_dishes', 'dinner', 4, 21, 1, 'boiling', O, diasporaFor(O)),
  B('كيكة القيقب كندية', 'Canadian Maple Cake', 'Gâteau à l\'érable canadien', 'Pastel de arce canadiense', 'Kanadischer Ahornkuchen', 'rice_cakes_sweets', 'snack', 4, 50, 15, 'baking', Q, diasporaFor(Q)),
  B('بسكويت الشاي كندي', 'Canadian Tea Biscuits', 'Biscuits à thé canadiens', 'Galletas de té canadienses', 'Kanadische Teekekse', 'rice_cakes_sweets', 'snack', 5, 55, 12, 'baking', A, diasporaFor(A)),
  B('مثلجات كندية بالقيقب', 'Canadian Maple Ice Cream', 'Crème glacée à l\'érable canadienne', 'Helado de arce canadiense', 'Kanadisches Ahorneis', 'beverages', 'snack', 3, 25, 11, 'freezing', Q, diasporaFor(Q)),
  B('ميلك شيك الفانيليا كندي', 'Canadian Vanilla Milkshake', 'Milk-shake à la vanille canadien', 'Malteada de vainilla canadiense', 'Kanadischer Vanille-Milchshake', 'beverages', 'snack', 4, 30, 10, 'mixing', R, diasporaFor(R)),
  B('عصير تفاح كندي طبيعي', 'Natural Canadian Apple Juice', 'Jus de pomme canadien naturel', 'Jugo de manzana canadiense natural', 'Natürlicher kanadischer Apfelsaft', 'beverages', 'snack', 0, 12, 0, 'pressing', O, diasporaFor(O)),
  B('مياه غازية كندية', 'Canadian Sparkling Water', 'Eau pétillante canadienne', 'Agua con gas canadiense', 'Kanadisches Sprudelwasser', 'beverages', 'snack', 0, 0, 0, 'bottling', R, diasporaFor(R)),
  B('كعكة التوت كندي الإسفنجية', 'Canadian Berry Sponge Cake', 'Gâteau éponge aux baies', 'Bizcocho de bayas', 'Beeren-Biskuitkuchen', 'rice_cakes_sweets', 'snack', 5, 45, 12, 'baking', R, diasporaFor(R)),
  B('مافن النخالة كندي', 'Canadian Bran Muffin', 'Muffin au son canadien', 'Muffin de salvado canadiense', 'Kanadischer Kleiemuffin', 'breakfast_items', 'breakfast', 5, 40, 10, 'baking', R, diasporaFor(R)),
  B('سلطة سيزر كندي (بدون لحم خنزير)', 'Canadian Caesar Salad (No Pork)', 'Salade César canadienne', 'Ensalada César canadiense', 'Kanadischer Caesar Salad', 'vegetable_mains', 'lunch', 3, 10, 15, 'mixing', R, diasporaFor(R)),
  B('أعواد الكرفس كندي بالجبن', 'Canadian Celery Sticks with Cheese', 'Bâtonnets de céleri au fromage', 'Apio con queso', 'Selleriestangen mit Käse', 'vegetable_mains', 'snack', 2, 3, 8, 'raw', R, diasporaFor(R)),
  B('حلوى القيقب كندي الصلبة', 'Canadian Maple Hard Candy', 'Sucreries à l\'érable', 'Caramelo duro de arce', 'Ahorn-Hartkaramellen', 'rice_cakes_sweets', 'snack', 0, 95, 0, 'boiling', Q, diasporaFor(Q)),
  B('دونات كندي مغطى بالسكر', 'Canadian Sugar Doughnut', 'Beignet au sucre canadien', 'Dona de azúcar canadiense', 'Kanadischer Zucker-Donut', 'street_snacks', 'snack', 4, 50, 18, 'frying', O, diasporaFor(O)),
  B('بسكويت الشوفان كندي', 'Canadian Oatmeal Cookie', 'Biscuit à l\'avoine canadien', 'Galleta de avena canadiense', 'Kanadischer Haferflockenkeks', 'rice_cakes_sweets', 'snack', 5, 60, 20, 'baking', R, diasporaFor(R)),
  B('فشار كندي بالزبدة', 'Canadian Butter Popcorn', 'Pop-corn au beurre canadien', 'Palomitas de maíz con mantequilla', 'Kanadisches Butterpopcorn', 'street_snacks', 'snack', 12, 50, 25, 'popping', R, diasporaFor(R)),
  B('حساء الدجاج كندي بالنودلز', 'Canadian Chicken Noodle Soup', 'Soupe poulet et nouilles', 'Sopa de pollo con fideos', 'Hühnernudelsuppe', 'soups_stews', 'lunch', 8, 15, 3, 'boiling', R, diasporaFor(R)),
  B('ديك رومي كندي مشوي', 'Roasted Canadian Turkey', 'Dinde canadienne rôtie', 'Pavo canadiense asado', 'Gebratene kanadische Pute', 'poultry_mains', 'dinner', 28, 0, 7, 'roasting', R, diasporaFor(R)),
  B('صلصة التوت البري كندي', 'Canadian Cranberry Sauce', 'Sauce aux canneberges', 'Salsa de arándanos', 'Preiselbeersoße', 'condiments_sauces', 'dinner', 0, 35, 0, 'boiling', R, diasporaFor(R)),
  B('حشوة الخبز كندي التقليدية', 'Traditional Canadian Stuffing', 'Farce traditionnelle', 'Relleno tradicional', 'Traditionelle Füllung', 'vegetable_mains', 'dinner', 4, 30, 8, 'baking', R, diasporaFor(R)),
  B('لفت مطبوخ كندي بالزبدة', 'Canadian Buttered Turnips', 'Navets au beurre', 'Nabos con mantequilla', 'Butterrüben', 'vegetable_mains', 'dinner', 1, 6, 4, 'boiling', A, diasporaFor(A)),
  B('كرنب كندي مسلوق', 'Boiled Canadian Cabbage', 'Chou canadien bouilli', 'Repollo canadiense hervido', 'Gekochter kanadischer Kohl', 'vegetable_mains', 'dinner', 1, 5, 0, 'boiling', A, diasporaFor(A)),
  B('جزر كندي مطهو بالبخار', 'Steamed Canadian Carrots', 'Carottes canadiennes à la vapeur', 'Zanahorias canadienses al vapor', 'Gedämpfte kanadische Karotten', 'vegetable_mains', 'dinner', 1, 10, 0, 'steaming', R, diasporaFor(R)),
  B('بازلاء كندية خضراء', 'Canadian Green Peas', 'Pois verts canadiens', 'Chícharos canadienses', 'Kanadische grüne Erbsen', 'vegetable_mains', 'dinner', 5, 14, 0, 'boiling', P, diasporaFor(P)),
  B('ذرة حلوة كندية معلبة', 'Canadian Canned Sweet Corn', 'Maïs sucré en conserve', 'Maíz dulce en conserva', 'Kanadischer Dosenmais', 'vegetable_mains', 'lunch', 3, 18, 1, 'boiling', O, diasporaFor(O)),
  B('بطاطا حلوة كندية مشوية', 'Baked Canadian Sweet Potato', 'Patate douce au four', 'Camote al horno', 'Gebackene Süßkartoffel', 'vegetable_mains', 'dinner', 2, 20, 0, 'baking', R, diasporaFor(R)),
  B('سمك سلمون مرقط كندي', 'Canadian Lake Trout', 'Truite grise canadienne', 'Trucha de lago canadiense', 'Kanadische Seeforelle', 'fish_seafood', 'dinner', 19, 0, 7, 'grilling', BC, diasporaFor(BC)),
  B('سمك وايت فيش كندي مقلي', 'Fried Canadian Whitefish', 'Grand corégone frit', 'Pescado blanco frito', 'Frittierter Felchen', 'fish_seafood', 'lunch', 18, 12, 10, 'frying', O, diasporaFor(O)),
  B('بلح البحر كندي المطهو بالبخار', 'Steamed PEI Mussels', 'Moules de l\'Î.-P.-É. à la vapeur', 'Mejillones de PEI al vapor', 'Gedämpfte PEI-Muscheln', 'fish_seafood', 'dinner', 12, 4, 2, 'steaming', A, diasporaFor(A)),
  B('محار كندي طازج (أتلانتيك)', 'Fresh Atlantic Oysters', 'Huîtres de l\'Atlantique fraîches', 'Ostiones del Atlántico frescos', 'Frische Atlantik-Austern', 'fish_seafood', 'snack', 9, 4, 2, 'raw', A, diasporaFor(A)),
  B('كابوريا كندي (دانجنيس)', 'Dungeness Crab', 'Crabe dormeur', 'Cangrejo Dungeness', 'Dungeness-Krabbe', 'fish_seafood', 'dinner', 19, 0, 1, 'boiling', BC, diasporaFor(BC)),
  B('شوربة السمك كندي الصافية', 'Clear Canadian Fish Soup', 'Soupe de poisson claire', 'Sopa de pescado clara', 'Klare Fischsuppe', 'soups_stews', 'lunch', 12, 2, 2, 'boiling', R, diasporaFor(R)),
  B('خبز القمح كندي الكامل', 'Canadian Whole Wheat Bread', 'Pain de blé entier canadien', 'Pan de trigo integral canadiense', 'Kanadisches Vollkornbrot', 'breakfast_items', 'breakfast', 9, 45, 3, 'baking', R, diasporaFor(R)),
  B('شطيرة الجبن كندي المشوية', 'Canadian Grilled Cheese', 'Sandwich au fromage grillé', 'Sándwich de queso a la parrilla', 'Kanadisches Grilled Cheese Sandwich', 'street_snacks', 'lunch', 12, 30, 18, 'grilling', R, diasporaFor(R)),
  B('لحم بقري كندي بالخضار', 'Canadian Beef with Vegetables', 'Bœuf aux légumes canadien', 'Res con verduras canadiense', 'Kanadisches Rindfleisch mit Gemüse', 'meat_mains', 'dinner', 18, 10, 8, 'stir_frying', R, diasporaFor(R)),
  B('يخنة اللحم كندي (ستيو)', 'Canadian Beef Stew', 'Ragoût de bœuf canadien', 'Estofado de res canadiense', 'Kanadischer Rindfleischeintopf', 'soups_stews', 'dinner', 15, 12, 10, 'stewing', R, diasporaFor(R)),
  B('شريحة لحم التونا كندي', 'Canadian Tuna Steak', 'Steak de thon canadien', 'Filete de atún canadiense', 'Kanadisches Thunfischsteak', 'fish_seafood', 'dinner', 23, 0, 5, 'grilling', BC, diasporaFor(BC)),
  B('سلطة التونا كندي بالمايونيز', 'Canadian Tuna Salad', 'Salade de thon au mayo', 'Ensalada de atún con mayonesa', 'Thunfischsalat mit Mayo', 'fish_seafood', 'lunch', 15, 2, 12, 'mixing', R, diasporaFor(R)),
  B('أصابع الدجاج كندي (حلال)', 'Halal Canadian Chicken Fingers', 'Doigts de poulet halal', 'Tiras de pollo halal', 'Halal-Chicken Fingers', 'poultry_mains', 'lunch', 15, 18, 12, 'frying', R, diasporaFor(R)),
  B('صينية خضار كندية مشوية', 'Roasted Canadian Veggie Tray', 'Plateau de légumes rôtis', 'Charola de verduras asadas', 'Gebratenes Gemüseblech', 'vegetable_mains', 'dinner', 3, 15, 5, 'roasting', R, diasporaFor(R)),
];
