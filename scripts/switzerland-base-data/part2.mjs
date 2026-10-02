import { B, diasporaFor } from './rows.mjs';

const GVA = 'geneva';
const LUZ = 'lucerne';
const BSL = 'basel';
const LSN = 'lausanne';
const TCN = 'ticino';
const VAL = 'valais';

export default [
  B('شوربة العدس', 'Lentil Soup', 'Soupe de lentilles', 'Sopa de lentejas', 'Linsensuppe', 'soups_stews', 'lunch', 7, 15, 3, 'simmering', GVA, diasporaFor(GVA)),

  B('كعكة البطاطس', 'Potato Cake', 'Galette de pomme de terre', 'Torta de patatas', 'Kartoffelkuchen', 'breakfast_items', 'breakfast', 5, 25, 10, 'baking', LUZ, diasporaFor(LUZ)),
  B('فطيرة لحم العجل', 'Veal Pie', 'Tourte au veau', 'Pastel de ternera', 'Kalbs-Pastete', 'street_snacks', 'snack', 12, 20, 12, 'baking', LUZ, diasporaFor(LUZ)),
  B('شوربة الشعير بالخضار', 'Creamy Barley Vegetable Soup', 'Veloute d orge aux legumes', 'Crema de cebada con verduras', 'Rahm-Gerstensuppe mit Gemuese', 'soups_stews', 'lunch', 5, 19, 5, 'simmering', LUZ, diasporaFor(LUZ)),
  B('معجون الفلفل الأحمر', 'Red Pepper Spread', 'Piment rouge a tartiner', 'Pimenton para untar', 'Rotpfeffer-Aufstrich', 'condiments_sauces', 'snack', 2, 7, 8, 'assembling', LUZ, diasporaFor(LUZ)),
  B('مرقة اللحم البقر', 'Beef Bouillon', 'Bouillon de boeuf', 'Caldo de res', 'Rinderbouillon', 'soups_stews', 'lunch', 8, 3, 4, 'simmering', LUZ, diasporaFor(LUZ)),
  B('سلطة الخس بالليمون', 'Lettuce Salad with Lemon', 'Salade de laitue au citron', 'Ensalada de lechuga con limon', 'Salat mit Zitrone und Olivenoel', 'vegetable_mains', 'lunch', 2, 8, 6, 'tossing', LUZ, diasporaFor(LUZ)),
  B('كعك الشعير بالتمر', 'Date Barley Cake', 'Gateau d orge aux dattes', 'Bizcocho de cebada con datiles', 'Dattel-Gerstenkuchen', 'rice_cakes_sweets', 'snack', 5, 31, 9, 'baking', LUZ, diasporaFor(LUZ)),
  B('شرائح اللحم المشوية', 'Grilled Beef Slices', 'Tranches de boeuf grillees', 'Filetes de res a la plancha', 'Gegrillte Rindersteaks', 'meat_mains', 'dinner', 20, 4, 11, 'grilling', LUZ, diasporaFor(LUZ)),
  B('حلوى اللوز بالسكر', 'Almond Dessert with Sugar', 'Dessert aux amandes sucre', 'Postre de almendras con azucar', 'Mandel-Dessert mit Zucker', 'rice_cakes_sweets', 'snack', 4, 30, 11, 'baking', LUZ, diasporaFor(LUZ)),

  B('شوربة الدقيق', 'Flour Thickening Soup', 'Soupe a la farine', 'Sopa de harina', 'Mehlsuppe', 'soups_stews', 'lunch', 4, 18, 5, 'simmering', BSL, diasporaFor(BSL)),
  B('بسكويت اللوز بالزعفران', 'Almond Saffron Biscuit', 'Biscuit aux amandes au safran', 'Galleta de almendras con azafran', 'Laeckerli', 'rice_cakes_sweets', 'snack', 5, 30, 11, 'baking', BSL, diasporaFor(BSL)),
  B('شوربة الملفوف', 'Cabbage Soup', 'Soupe au chou', 'Sopa de col', 'Krautsuppe', 'soups_stews', 'lunch', 3, 11, 4, 'simmering', BSL, diasporaFor(BSL)),
  B('شريحة لحم البقر بالزعتر', 'Beef Steak with Thyme', 'Entrecote de boeuf au thym', 'Solomillo de res con tomillo', 'Rindersteak mit Thymian', 'meat_mains', 'dinner', 21, 3, 12, 'grilling', BSL, diasporaFor(BSL)),
  B('لفائف الزبيب المخمر', 'Raisin Rolls', 'Brioches aux raisins', 'Bollos de pasas', 'Hefeteig-Rosinen', 'breakfast_items', 'breakfast', 6, 28, 9, 'baking', BSL, diasporaFor(BSL)),
  B('صدر الدجاج المشوي', 'Grilled Chicken Breast', 'Blanc de poulet grille', 'Pechuga de pollo a la plancha', 'Gegrillte Haehnchenbrust', 'poultry_mains', 'dinner', 22, 2, 7, 'grilling', BSL, diasporaFor(BSL)),
  B('بصل بالزبدة', 'Onion in Butter', 'Oignons au beurre', 'Cebolla a la mantequilla', 'Zwiebeln in Butter', 'vegetable_mains', 'lunch', 2, 10, 8, 'simmering', BSL, diasporaFor(BSL)),
  B('شوربة الطماطم بالكمون', 'Tomato and Cumin Soup', 'Veloute de tomates au cumin', 'Sopa de tomate con comino', 'Tomatensuppe mit Kreuzkuemmel', 'soups_stews', 'lunch', 2, 11, 4, 'simmering', BSL, diasporaFor(BSL)),
  B('قرص الشعير بالبيض', 'Barley and Egg Pancake', 'Galette d orge aux oeufs', 'Tortita de cebada con huevo', 'Gerstenpfannkuchen mit Ei', 'breakfast_items', 'breakfast', 7, 27, 9, 'frying', BSL, diasporaFor(BSL)),

  B('طبق البصل والبطاطس', 'Leek and Potato Dish', 'Papet de poireaux et pommes de terre', 'Papet de puerro y patatas', 'Papet Vaudois', 'vegetable_mains', 'lunch', 3, 18, 6, 'simmering', LSN, diasporaFor(LSN)),
  B('شرائح السلمون المطبوخة', 'Poached Salmon', 'Saumon poche', 'Salmon escalfado', 'Pochierter Lachs', 'fish_seafood', 'dinner', 22, 1, 9, 'poaching', LSN, diasporaFor(LSN)),
  B('بازلاء بالقرنبيط', 'Peas with Cauliflower', 'Petits pois au chou-fleur', 'Guisantes con coliflor', 'Erbsen mit Blumenkohl', 'vegetable_mains', 'lunch', 5, 13, 4, 'steaming', LSN, diasporaFor(LSN)),
  B('شوربة البصل', 'Onion Soup', 'Soupe a l oignon', 'Sopa de cebolla', 'Zwiebelsuppe', 'soups_stews', 'lunch', 2, 12, 5, 'simmering', LSN, diasporaFor(LSN)),
  B('شريحة لحم البقر بالفطر', 'Beef Steak with Mushrooms', 'Entrecote de boeuf aux champignons', 'Solomillo de res con champinones', 'Rindersteak mit Pilzen', 'meat_mains', 'dinner', 20, 4, 12, 'grilling', LSN, diasporaFor(LSN)),
  B('شوربة البازلاء', 'Pea Soup', 'Soupe de petits pois', 'Sopa de guisantes', 'Erbsensuppe', 'soups_stews', 'lunch', 4, 14, 3, 'simmering', LSN, diasporaFor(LSN)),
  B('كعكة الجوز', 'Walnut Cake', 'Gateau aux noix', 'Bizcocho de nueces', 'Nusskuchen', 'rice_cakes_sweets', 'snack', 4, 30, 11, 'baking', LSN, diasporaFor(LSN)),
  B('سلطة الفاصولياء الجافة', 'Dried Bean Salad', 'Salade de haricots secs', 'Ensalada de judias secas', 'Trockenbohnensalat', 'vegetable_mains', 'lunch', 6, 15, 5, 'tossing', LSN, diasporaFor(LSN)),
  B('شوربة الفطر', 'Mushroom Soup', 'Soupe de champignons', 'Sopa de champinones', 'Pilzsuppe', 'soups_stews', 'lunch', 3, 12, 4, 'simmering', LSN, diasporaFor(LSN)),

  B('بولينتا بالجبنة', 'Polenta with Cheese', 'Polenta au fromage', 'Polenta con queso', 'Polenta mit Kaese', 'vegetable_mains', 'lunch', 4, 25, 7, 'simmering', TCN, diasporaFor(TCN)),
  B('بيتزا تيسينو', 'Ticino Flatbread Pizza', 'Pizza tessine', 'Pizza tesina', 'Tessiner Fladen', 'street_snacks', 'dinner', 11, 26, 11, 'baking', TCN, diasporaFor(TCN)),
  B('سلطة الفطر بالزيت', 'Mushroom Salad with Oil', 'Salade de champignons a l huile', 'Ensalada de champinones con aceite', 'Pilzsalat mit Oel', 'vegetable_mains', 'lunch', 4, 10, 8, 'tossing', TCN, diasporaFor(TCN)),
  B('أرز بالجبن', 'Risotto with Cheese', 'Risotto au fromage', 'Risotto con queso', 'Risotto mit Kaese', 'rice_dishes', 'dinner', 7, 27, 7, 'simmering', TCN, diasporaFor(TCN)),
  B('معجنات الجبنة', 'Cheese Pasta', 'Pates au fromage', 'Pasta de queso', 'Kaesepasta', 'noodle_dishes', 'lunch', 9, 27, 8, 'simmering', TCN, diasporaFor(TCN)),
  B('شوربة الطماطم', 'Tomato Soup', 'Veloute de tomates', 'Sopa de tomate', 'Tomatensuppe', 'soups_stews', 'lunch', 2, 10, 4, 'simmering', TCN, diasporaFor(TCN)),
  B('خبز الفوكاتشا', 'Focaccia Bread', 'Pain a la focaccia', 'Pan de focaccia', 'Focaccia', 'breakfast_items', 'snack', 7, 26, 9, 'baking', TCN, diasporaFor(TCN)),
  B('شريحة لحم العجل', 'Veal Steak', 'Cote de veau', 'Solomillo de ternera', 'Kalbssteak', 'meat_mains', 'dinner', 20, 2, 11, 'grilling', TCN, diasporaFor(TCN)),

  B('راكليت الجبن المعتق', 'Aged Raclette Cheese', 'Raclette affine', 'Raclette curado', 'Reifer Raclettekaese', 'street_snacks', 'lunch', 9, 2, 14, 'grilling', VAL, diasporaFor(VAL)),
  B('راكليت بحبوب الانزيم النباتي', 'Halal Certified Raclette', 'Raclette a la presure vegetale', 'Raclette con cuajo vegetal', 'Raclette mit vegetabler Lab', 'street_snacks', 'lunch', 9, 2, 14, 'grilling', VAL, diasporaFor(VAL)),
  B('حلوى الكستناء', 'Chestnut Dessert', 'Dessert aux chatagnes', 'Postre de castanas', 'Marron-Dessert', 'rice_cakes_sweets', 'snack', 3, 28, 7, 'simmering', VAL, diasporaFor(VAL)),
  B('قرص الجبن المتنوع', 'Cheese Platter', 'Planche de fromages', 'Tabla de quesos', 'Kaeseplatte', 'street_snacks', 'snack', 12, 3, 18, 'assembling', VAL, diasporaFor(VAL)),
  B('شريحة لحم البقر المشوي', 'Grilled Beef Steak', 'Entrecote de boeuf grillee', 'Solomillo de res asado', 'Gegrilltes Rindersteak', 'meat_mains', 'dinner', 21, 3, 13, 'grilling', VAL, diasporaFor(VAL)),
  B('شوربة الجزر بالزعتر', 'Carrot Soup with Thyme', 'Veloute de carottes au thym', 'Sopa de zanahoria con tomillo', 'Karottensuppe mit Thymian', 'soups_stews', 'lunch', 2, 11, 4, 'simmering', VAL, diasporaFor(VAL)),
];