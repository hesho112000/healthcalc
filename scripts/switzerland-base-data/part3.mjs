import { B, diasporaFor } from './rows.mjs';

const BRN = 'bern';
const TCN = 'ticino';
const VAL = 'valais';
const GRS = 'grisons';
const VUD = 'vaud';
const ARG = 'aargau';
const STG = 'st_gallen';

export default [
  B('كعك البقدونس', 'Parsley Cake', 'Gateau au persil', 'Bizcocho de perejil', 'Petersilienkuchen', 'rice_cakes_sweets', 'snack', 4, 30, 10, 'baking', BRN, diasporaFor(BRN)),

  B('فيليه السمك المقلي', 'Fried Fish Fillet', 'Filet de poisson frit', 'Filete de pescado frito', 'Gebackener Fisch', 'fish_seafood', 'dinner', 15, 12, 9, 'frying', TCN, diasporaFor(TCN)),

  B('خبز بالعسل والجبن', 'Bread with Honey and Cheese', 'Pain au miel et fromage', 'Pan con miel y queso', 'Brot mit Honig und Kaese', 'breakfast_items', 'breakfast', 7, 26, 8, 'baking', VAL, diasporaFor(VAL)),
  B('شوربة السبانخ بالقشدة', 'Creamy Spinach Soup', 'Veloute d epinards a la creme', 'Crema de espinacas con nata', 'Rahm-Spinat-Suppe', 'soups_stews', 'lunch', 3, 11, 6, 'simmering', VAL, diasporaFor(VAL)),
  B('شوربة البصل الباردة', 'Chilled Onion Soup', 'Soupe froide a l oignon', 'Sopa fria de cebolla', 'Kalte Zwiebelsuppe', 'soups_stews', 'lunch', 2, 12, 5, 'simmering', VAL, diasporaFor(VAL)),

  B('نودلات الحنطة السوداء', 'Buckwheat Noodles', 'Pates de sarrasin', 'Pasta de alforfon', 'Pizokel', 'noodle_dishes', 'lunch', 5, 26, 6, 'boiling', GRS, diasporaFor(GRS)),
  B('قرص البطاطس المبشور', 'Grated Potato Cake', 'Galette de pommes de terre rapees', 'Torta de papa rallada', 'Maluns', 'vegetable_mains', 'lunch', 4, 22, 7, 'frying', GRS, diasporaFor(GRS)),
  B('لفائف الملفوف بالصلصة', 'Cabbage Rolls with Sauce', 'Rouleaux de chou en sauce', 'Rollitos de col en salsa', 'Capuns mit Sauce', 'vegetable_mains', 'dinner', 7, 16, 9, 'simmering', GRS, diasporaFor(GRS)),
  B('كعكة الجوز الكاملة', 'Whole Nut Cake', 'Gateau aux noix entieres', 'Bizcocho de frutos secos enteros', 'Ganznusskuchen', 'rice_cakes_sweets', 'snack', 5, 30, 13, 'baking', GRS, diasporaFor(GRS)),
  B('سلطة الهليون', 'Leek Salad', 'Salade de poireaux', 'Ensalada de puerro', 'Porree-Salat', 'vegetable_mains', 'lunch', 2, 10, 6, 'tossing', GRS, diasporaFor(GRS)),
  B('شوربة الشعير بالبطاطس', 'Barley Potato Soup', 'Soupe d orge aux pommes de terre', 'Sopa de cebada con patatas', 'Gerstensuppe mit Kartoffeln', 'soups_stews', 'lunch', 5, 20, 3, 'simmering', GRS, diasporaFor(GRS)),
  B('معجون الفلفل الحلو', 'Sweet Pepper Spread', 'Poivron doux a tartiner', 'Pimiento dulce para untar', 'Sueszer Paprika-Aufstrich', 'condiments_sauces', 'snack', 2, 8, 7, 'assembling', GRS, diasporaFor(GRS)),
  B('بيض مسلوق بزيت الزيتون', 'Boiled Egg with Olive Oil', 'Oeuf dur a l huile d olive', 'Huevo cocido con aceite de oliva', 'Gekochtes Ei mit Olivenoel', 'breakfast_items', 'breakfast', 7, 1, 9, 'boiling', GRS, diasporaFor(GRS)),
  B('شاي الاعشاب الجبلية', 'Alpine Herbal Tea', 'Tisane des Alpes', 'Infusion de hierbas alpinas', 'Alpenkraeutertee', 'beverages', 'snack', 0, 2, 0, 'brewing', GRS, diasporaFor(GRS)),

  B('لحم البقر المطهو ببطء', 'Slow-Cooked Beef', 'Boeuf braise', 'Ternera braseada', 'Geschmortes Rindfleisch', 'meat_mains', 'dinner', 19, 5, 12, 'braising', VUD, diasporaFor(VUD)),
  B('بيض مقلي بالزيت', 'Fried Egg in Oil', 'Oeuf frit a l huile', 'Huevo frito en aceite', 'Spiegelei in Oel', 'breakfast_items', 'breakfast', 7, 1, 11, 'frying', VUD, diasporaFor(VUD)),
  B('سلمون مشوي بالعسل', 'Honey Glazed Salmon', 'Saumon au miel', 'Salmon con miel', 'Honiglasiertes Lachs', 'fish_seafood', 'dinner', 20, 8, 10, 'grilling', VUD, diasporaFor(VUD)),
  B('شوربة الكرفس', 'Celery Soup', 'Soupe de celeri', 'Sopa de apio', 'Selleriesuppe', 'soups_stews', 'lunch', 2, 10, 4, 'simmering', VUD, diasporaFor(VUD)),
  B('فطيرة التين', 'Fig Tart', 'Tarte aux figues', 'Tarta de higos', 'Feigentarte', 'rice_cakes_sweets', 'snack', 4, 29, 10, 'baking', VUD, diasporaFor(VUD)),
  B('سلطة الطحينة والخضار', 'Tahini Vegetable Salad', 'Salade de tahini et legumes', 'Ensalada de tahini y verduras', 'Tahini-Gemuese-Salat', 'vegetable_mains', 'lunch', 5, 13, 9, 'tossing', VUD, diasporaFor(VUD)),
  B('مقبلات التين الجافة', 'Dried Fig Spread', 'Figue seche a tartiner', 'Higo seco para untar', 'Trockenfeigen-Aufstrich', 'condiments_sauces', 'snack', 2, 12, 3, 'assembling', VUD, diasporaFor(VUD)),
  B('شوربة البطاطس بالخبز', 'Potato Bread Soup', 'Soupe de pommes de terre au pain', 'Sopa de patata con pan', 'Kartoffel-Brot-Suppe', 'soups_stews', 'lunch', 4, 18, 4, 'simmering', VUD, diasporaFor(VUD)),
  B('بسكويت الشوفان بالعسل', 'Oat Biscuit with Honey', 'Biscuit d avoine au miel', 'Galleta de avena con miel', 'Hafer-Honig-Kekse', 'rice_cakes_sweets', 'snack', 5, 28, 10, 'baking', VUD, diasporaFor(VUD)),

  B('كعك الجزر', 'Carrot Cake', 'Gateau aux carottes', 'Bizcocho de zanahoria', 'Rueeblitorte', 'rice_cakes_sweets', 'snack', 4, 30, 10, 'baking', ARG, diasporaFor(ARG)),
  B('سلطة الجزر بالزبدة', 'Carrot Salad with Butter', 'Salade de carottes au beurre', 'Ensalada de zanahoria con mantequilla', 'Karottensalat mit Butter', 'vegetable_mains', 'lunch', 2, 12, 7, 'tossing', ARG, diasporaFor(ARG)),
  B('شوربة الفاصولياء الحمراء', 'Red Bean Soup', 'Soupe de haricots rouges', 'Sopa de judias rojas', 'Rote-Bohnen-Suppe', 'soups_stews', 'lunch', 6, 16, 3, 'simmering', ARG, diasporaFor(ARG)),
  B('شريحة لحم البقر بالزعتر', 'Grilled Beef Steak with Thyme', 'Entrecote de boeuf grillee au thym', 'Solomillo de res a la plancha con tomillo', 'Rindersteak vom Grill mit Thymian', 'meat_mains', 'dinner', 21, 2, 12, 'grilling', ARG, diasporaFor(ARG)),
  B('شرائح التفاح بالقرفة', 'Cinnamon Apple Slices', 'Tranches de pomme a la cannelle', 'Rodajas de manzana con canela', 'Apfelscheiben mit Zimt', 'fruit', 'snack', 1, 16, 1, 'assembling', ARG, diasporaFor(ARG)),
  B('كعك العسل', 'Honey Cake', 'Gateau au miel', 'Bizcocho de miel', 'Honigkuchen', 'rice_cakes_sweets', 'snack', 4, 31, 9, 'baking', ARG, diasporaFor(ARG)),
  B('معجون الطماطم المجففة', 'Dried Tomato Spread', 'Concentre de tomates seches', 'Tomate seca para untar', 'Getrocknete Tomaten-Aufstrich', 'condiments_sauces', 'snack', 3, 12, 5, 'simmering', ARG, diasporaFor(ARG)),
  B('سلطة الكوسا بالزيت', 'Zucchini Salad with Oil', 'Salade de courgette a l huile', 'Ensalada de calabacin con aceite', 'Zucchini-Salat mit Oel', 'vegetable_mains', 'lunch', 3, 10, 7, 'tossing', ARG, diasporaFor(ARG)),
  B('مرقة الدجاج المنزلية', 'Home Chicken Stock', 'Bouillon de poulet maison', 'Caldo de pollo casero', 'Huehnerbruehe selbst gemacht', 'soups_stews', 'dinner', 9, 3, 6, 'simmering', ARG, diasporaFor(ARG)),

  B('نودلات السمك الأبيض', 'Plain Fish Noodles', 'Pates au poisson', 'Pasta de pescado', 'Fischspaetzle', 'noodle_dishes', 'lunch', 9, 26, 5, 'boiling', STG, diasporaFor(STG)),
  B('شوربة الخضار البسيطة', 'Simple Vegetable Broth', 'Bouillon de legumes simple', 'Caldo de verduras sencillo', 'Einfache Gemuesebruehe', 'soups_stews', 'lunch', 3, 12, 4, 'simmering', STG, diasporaFor(STG)),
  B('قرص البطاطس بالزبدة', 'Potato Cake with Butter', 'Galette de pommes de terre au beurre', 'Torta de patata con mantequilla', 'Butter-Kartoffelkuchen', 'breakfast_items', 'breakfast', 5, 25, 11, 'baking', STG, diasporaFor(STG)),
  B('سلطة الدجاج بالخضار', 'Chicken and Vegetable Salad', 'Salade de poulet aux legumes', 'Ensalada de pollo con verduras', 'Huhn-Gemuese-Salat', 'poultry_mains', 'lunch', 14, 9, 9, 'tossing', STG, diasporaFor(STG)),
  B('سلطة الفاصولياء الخضراء', 'Green Bean Salad', 'Salade de haricots verts', 'Ensalada de judias verdes', 'Gruene-Bohnen-Salat', 'vegetable_mains', 'lunch', 3, 10, 6, 'tossing', STG, diasporaFor(STG)),
  B('عصير التفاح الطازج', 'Fresh Apple Juice', 'Jus de pomme frais', 'Zumo de manzana fresco', 'Frischer Apfelsaft', 'beverages', 'snack', 0, 12, 0, 'brewing', STG, diasporaFor(STG)),
  B('قرص البطاطس المهروسة بالصلصة', 'Potato Dumplings with Sauce', 'Ravioiles de pommes de terre', 'Empanadillas de patata', 'Kartoffelklosschen mit Sauce', 'vegetable_mains', 'dinner', 6, 20, 6, 'boiling', STG, diasporaFor(STG)),
  B('شوربة الجزر بالزبدة', 'Carrot Soup with Butter', 'Veloute de carottes au beurre', 'Sopa de zanahoria con mantequilla', 'Karottensuppe mit Butter', 'soups_stews', 'lunch', 2, 12, 5, 'simmering', STG, diasporaFor(STG)),
  B('سلطة الخضار المشوية', 'Grilled Vegetable Salad', 'Salade de legumes grilles', 'Ensalada de verduras asadas', 'Grill-Gemuesesalat', 'vegetable_mains', 'lunch', 3, 12, 7, 'grilling', STG, diasporaFor(STG)),
];