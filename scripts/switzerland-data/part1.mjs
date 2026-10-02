import { B, diasporaFor } from '../switzerland-base-data/rows.mjs';

const P = 'pan_swiss';
const ZRH = 'zurich';
const BRN = 'bern';
const GVA = 'geneva';

export default [
  B('فوندو الجبن بصلصة الثوم', 'Cheese Fondue with Garlic Sauce', 'Fondue au fromage a l ail', 'Fondue de queso con ajo', 'Kaesefondue mit Knoblauchsauce', 'street_snacks', 'lunch', 10, 4, 14, 'simmering', P, diasporaFor(P)),
  B('أقراص الجبن', 'Cheese Crisps', 'Chips au fromage', 'Croquetas de queso', 'Kaese-Chips', 'street_snacks', 'snack', 7, 6, 18, 'baking', P, diasporaFor(P)),
  B('برغر الخضار', 'Vegetable Burger', 'Burger vegetal', 'Hamburguesa vegetal', 'Gemuese-Burger', 'vegetable_mains', 'lunch', 9, 17, 11, 'grilling', P, diasporaFor(P)),
  B('سلطة الروبيان', 'Shrimp Salad', 'Salade de crevettes', 'Ensalada de gambas', 'Garnelen-Salat', 'fish_seafood', 'lunch', 13, 10, 8, 'tossing', P, diasporaFor(P)),
  B('فيليه السلمون المدخن', 'Smoked Salmon Fillet', 'Filet de saumon fume', 'Filete de salmon ahumado', 'Raeucherlachs', 'fish_seafood', 'lunch', 18, 1, 8, 'grilling', P, diasporaFor(P)),
  B('سلطة التونة', 'Tuna Salad', 'Salade de thon', 'Ensalada de atun', 'Thunfisch-Salat', 'fish_seafood', 'lunch', 16, 6, 9, 'tossing', P, diasporaFor(P)),
  B('شوربة القمح', 'Wheat Soup', 'Soupe de ble', 'Sopa de trigo', 'Weizensuppe', 'soups_stews', 'lunch', 5, 17, 3, 'simmering', P, diasporaFor(P)),
  B('فطيرة الخضار', 'Vegetable Pie', 'Tourte aux legumes', 'Pastel de verduras', 'Gemuese-Pastete', 'vegetable_mains', 'dinner', 7, 22, 11, 'baking', P, diasporaFor(P)),
  B('مقبلات السبانخ', 'Spinach Spread', 'Epinards a tartiner', 'Espinaca para untar', 'Spinat-Aufstrich', 'condiments_sauces', 'snack', 4, 5, 4, 'assembling', P, diasporaFor(P)),
  B('سلطة البصل بالخل', 'Onion Salad with Vinegar', 'Salade d oignons au vinaigre', 'Ensalada de cebolla con vinagre', 'Zwiebelsalat mit Essig', 'condiments_sauces', 'snack', 1, 10, 3, 'tossing', P, diasporaFor(P)),
  B('فطيرة البصل', 'Onion Pie', 'Tourte aux oignons', 'Empanadilla de cebolla', 'Zwiebel-Pastete', 'vegetable_mains', 'dinner', 6, 22, 11, 'baking', P, diasporaFor(P)),
  B('كعك الحنطة السوداء', 'Buckwheat Pancakes', 'Galettes de sarrasin', 'Panqueques de alforfon', 'Buchweizenpfannkuchen', 'breakfast_items', 'breakfast', 5, 28, 8, 'frying', P, diasporaFor(P)),
  B('قرص البطاطس بالكريمة', 'Potato Gratin', 'Gratin de pommes de terre', 'Gratin de patatas', 'Kartoffelgratin', 'vegetable_mains', 'dinner', 6, 24, 12, 'baking', P, diasporaFor(P)),
  B('كعكة الكريمة', 'Cream Pie', 'Gateau a la creme', 'Bizcocho de nata', 'Rahmkuchen', 'rice_cakes_sweets', 'snack', 5, 28, 13, 'baking', P, diasporaFor(P)),
  B('خبز الجاوة بالحبوب', 'Roasted Bread with Grains', 'Pain grille aux graines', 'Pan tostado con granos', 'Roestbrot mit Koernern', 'breakfast_items', 'snack', 7, 27, 5, 'baking', P, diasporaFor(P)),
  B('سلطة الخيار بالشيح', 'Cucumber Salad with Dill', 'Salade de concombre a l aneth', 'Ensalada de pepino con eneldo', 'Gurkensalat mit Dill', 'vegetable_mains', 'lunch', 1, 7, 4, 'tossing', P, diasporaFor(P)),
  B('لبن بالعسل والشوفان', 'Honey Yogurt with Oats', 'Yaourt au miel et avoine', 'Yogur con miel y avena', 'Honigjoghurt mit Hafer', 'breakfast_items', 'breakfast', 6, 20, 5, 'assembling', P, diasporaFor(P)),

  B('أرز الزعفران بالجبن', 'Saffron Risotto with Cheese', 'Risotto au safran et fromage', 'Risotto con azafran y queso', 'Safranrisotto mit Kaese', 'rice_dishes', 'dinner', 8, 28, 8, 'simmering', ZRH, diasporaFor(ZRH)),
  B('فيليه السلمون بالليمون', 'Salmon Fillet with Lemon', 'Filet de saumon au citron', 'Filete de salmon con limon', 'Lachsfilet mit Zitrone', 'fish_seafood', 'dinner', 20, 1, 9, 'grilling', ZRH, diasporaFor(ZRH)),
  B('كاري الدجاج بالأرز', 'Chicken Curry with Rice', 'Curry de poulet au riz', 'Curry de pollo con arroz', 'Haehnchen-Curry mit Reis', 'poultry_mains', 'dinner', 16, 24, 10, 'simmering', ZRH, diasporaFor(ZRH)),
  B('أقراص الخضار بصلصة الأعشاب', 'Vegetable Fritters with Herb Sauce', 'Beignets de legumes sauce herbes', 'Tortitas de verduras con salsa de hierbas', 'Gemuese-Laibchen mit Kraeutersauce', 'street_snacks', 'snack', 5, 17, 11, 'frying', ZRH, diasporaFor(ZRH)),
  B('شوربة الدجاج بالنودلز', 'Chicken Noodle Soup', 'Soupe de poulet aux nouilles', 'Sopa de pollo con fideos', 'Huhnernudelsuppe', 'soups_stews', 'lunch', 10, 16, 4, 'simmering', ZRH, diasporaFor(ZRH)),
  B('سلطة البصل بالزيت', 'Onion Salad with Oil', 'Salade d oignons a l huile', 'Ensalada de cebolla con aceite', 'Zwiebelsalat mit Oel', 'condiments_sauces', 'snack', 1, 10, 5, 'tossing', ZRH, diasporaFor(ZRH)),
  B('شوربة الذرة الحلوة', 'Sweet Corn Soup', 'Veloute de mais doux', 'Crema de maiz dulce', 'Suessmais-Suppe', 'soups_stews', 'lunch', 4, 18, 4, 'simmering', ZRH, diasporaFor(ZRH)),
  B('رغيف الجبن المخمر', 'Cheese Bread Roll', 'Petit pain au fromage', 'Panecillo de queso', 'Kaesebroetli', 'breakfast_items', 'snack', 8, 24, 10, 'baking', ZRH, diasporaFor(ZRH)),
  B('مرق الدجاج بالأعشاب', 'Chicken Stock with Herbs', 'Bouillon de poulet aux herbes', 'Caldo de pollo con hierbas', 'Haehnchenbruehe mit Kraeutern', 'soups_stews', 'dinner', 9, 3, 5, 'simmering', ZRH, diasporaFor(ZRH)),

  B('معكرونة البطاطس والجبن', 'Potato and Cheese Pasta', 'Pates de pomme de terre au fromage', 'Pasta de papa y queso', 'Kaesekartoffeln', 'noodle_dishes', 'dinner', 9, 26, 10, 'simmering', BRN, diasporaFor(BRN)),
  B('خبز محمص بالزيت', 'Toasted Bread with Oil', 'Pain grille a l huile', 'Pan tostado con aceite', 'Roestbrot mit Oel', 'breakfast_items', 'snack', 6, 26, 6, 'baking', BRN, diasporaFor(BRN)),
  B('بازلاء بالجزر', 'Peas with Carrots', 'Petits pois aux carottes', 'Guisantes con zanahoria', 'Erbsen mit Karotten', 'vegetable_mains', 'lunch', 5, 13, 4, 'steaming', BRN, diasporaFor(BRN)),
  B('شريحة دجاج مقلية', 'Fried Chicken Steak', 'Escalope de poulet panee', 'Escalope de pollo empanado', 'Panierte Haehnchenbrust', 'poultry_mains', 'dinner', 18, 10, 12, 'frying', BRN, diasporaFor(BRN)),
  B('سلطة الخضراوات المبكرة', 'Early Vegetable Salad', 'Salade de legumes de saison', 'Ensalada de verduras de temporada', 'Fruehlings-Gemuesesalat', 'vegetable_mains', 'lunch', 3, 9, 6, 'tossing', BRN, diasporaFor(BRN)),
  B('قرص الطماطم بالأعشاب', 'Tomato Patty with Herbs', 'Galette de tomates aux herbes', 'Torta de tomate con hierbas', 'Tomaten-Laibchen mit Kraeuter', 'vegetable_mains', 'lunch', 4, 18, 8, 'frying', BRN, diasporaFor(BRN)),
  B('شوربة الفاصولياء الحمراء بالخضار', 'Red Bean and Vegetable Soup', 'Soupe de haricots rouges aux legumes', 'Sopa de judias rojas con verduras', 'Rote-Bohnen-Gemuesesuppe', 'soups_stews', 'lunch', 6, 18, 3, 'simmering', BRN, diasporaFor(BRN)),
  B('لبن بالبرتقال', 'Orange Yogurt', 'Yaourt a l orange', 'Yogur a la naranja', 'Orangenjoghurt', 'breakfast_items', 'breakfast', 5, 18, 4, 'assembling', BRN, diasporaFor(BRN)),

  B('سافل الجبن', 'Cheese Souffle', 'Souffle au fromage', 'Souffle de queso', 'Kaese-Souffle', 'street_snacks', 'lunch', 10, 8, 14, 'baking', GVA, diasporaFor(GVA)),
  B('سلطة الكينوا بالليمون', 'Quinoa Salad with Lemon', 'Salade de quinoa au citron', 'Ensalada de quinoa con limon', 'Quinoa-Salat mit Zitrone', 'vegetable_mains', 'lunch', 6, 14, 7, 'tossing', GVA, diasporaFor(GVA)),
  B('سلطة الخس مع الحمص', 'Lettuce Salad with Chickpeas', 'Salade de laitue aux pois chiches', 'Ensalada de lechuga con garbanzos', 'Salat mit Kichererbsen', 'vegetable_mains', 'lunch', 7, 12, 7, 'tossing', GVA, diasporaFor(GVA)),
  B('مقبلات الثوم الأخضر', 'Green Garlic Spread', 'Pesto d ail vert', 'Pesto de ajo verde', 'Gruener Knoblauchaufstrich', 'condiments_sauces', 'snack', 3, 8, 9, 'assembling', GVA, diasporaFor(GVA)),
  B('تارت الفراولة', 'Strawberry Tart', 'Tarte aux fraises', 'Tarta de fresa', 'Erdbeertarte', 'rice_cakes_sweets', 'snack', 4, 29, 10, 'baking', GVA, diasporaFor(GVA)),
  B('شوربة السمك بالكرفس', 'Fish Soup with Celery', 'Soupe de poisson au celeri', 'Sopa de pescado con apio', 'Fischsuppe mit Sellerie', 'fish_seafood', 'lunch', 10, 8, 4, 'simmering', GVA, diasporaFor(GVA)),
  B('قرص الخبز بالتين', 'Fig Bread Loaf', 'Pain aux figues', 'Pan de higos', 'Feigenbrot', 'breakfast_items', 'breakfast', 6, 30, 6, 'baking', GVA, diasporaFor(GVA)),
  B('صدر الدجاج بالليمون', 'Chicken Breast with Lemon', 'Blanc de poulet au citron', 'Pechuga de pollo con limon', 'Haehnchenbrust mit Zitrone', 'poultry_mains', 'dinner', 22, 2, 8, 'grilling', GVA, diasporaFor(GVA)),
];