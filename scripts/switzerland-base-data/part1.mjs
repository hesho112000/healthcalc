import { B, diasporaFor } from './rows.mjs';

const P = 'pan_swiss';
const ZRH = 'zurich';
const BRN = 'bern';
const GVA = 'geneva';

export default [
  B('ميويسلي بالشوفان والحليب', 'Muesli with Oats and Milk', 'Muesli aux flocons d avoine et au lait', 'Muesli con avena y leche', 'Muesli mit Haferflocken und Milch', 'breakfast_items', 'breakfast', 5, 24, 4, 'assembling', P, diasporaFor(P)),
  B('رغيف الزوف المجدول', 'Zopf Braided Loaf', 'Pain tresse Zopf', 'Pan trenzado Zopf', 'Zopf-Flechte', 'breakfast_items', 'breakfast', 7, 30, 3, 'baking', P, diasporaFor(P)),
  B('فوندو الجبن بمرق الليمون', 'Cheese Fondue with Lemon Broth', 'Fondue au bouillon citronne', 'Fondue de queso con caldo de limon', 'Kaesefondue mit Zitronenbouillon', 'street_snacks', 'lunch', 9, 3, 13, 'simmering', P, diasporaFor(P)),
  B('راكليت الجبن مع البطاطس', 'Raclette Cheese with Potatoes', 'Raclette au fromage avec pommes de terre', 'Raclette de queso con patatas', 'Raclette-Kaese mit Kartoffeln', 'vegetable_mains', 'lunch', 8, 22, 12, 'grilling', P, diasporaFor(P)),
  B('روستي البطاطس بالجبن', 'Rosti Potato with Cheese', 'Rossti au fromage', 'Rosti con queso', 'Roesti mit Kaese', 'vegetable_mains', 'lunch', 7, 24, 9, 'frying', P, diasporaFor(P)),
  B('شوربة الجذور بالقشدة', 'Root Vegetable Soup with Cream', 'Veloute de legumes-racine a la creme', 'Crema de raices con nata', 'Cremige Wurzelgemuessesuppe', 'soups_stews', 'lunch', 3, 12, 5, 'simmering', P, diasporaFor(P)),
  B('شوربة الشوفان بالخضروات', 'Oat and Vegetable Soup', 'Soupe d avoine aux legumes', 'Sopa de avena con verduras', 'Hafer-Gemuesesuppe', 'soups_stews', 'lunch', 4, 16, 3, 'simmering', P, diasporaFor(P)),
  B('سلطة البطاطس بالقشدة والبصل', 'Potato Salad with Cream and Onion', 'Salade de pommes de terre a la creme et a l oignon', 'Ensalada de patata con nata y cebolla', 'Rahmkartoffelsalat mit Zwiebeln', 'vegetable_mains', 'lunch', 4, 20, 8, 'tossing', P, diasporaFor(P)),
  B('خبز الثوم بزيت الزيتون', 'Garlic Bread with Olive Oil', 'Pain a l ail a l huile d olive', 'Pan de ajo con aceite de oliva', 'Knoblauchbrot mit Olivenoel', 'breakfast_items', 'snack', 6, 24, 8, 'baking', P, diasporaFor(P)),
  B('كعك التفاح بالزبدة', 'Apple Cake with Butter', 'Gateau aux pommes au beurre', 'Bizcocho de manzana con mantequilla', 'Butterapfelkuchen', 'rice_cakes_sweets', 'snack', 4, 31, 10, 'baking', P, diasporaFor(P)),
  B('شوربة الفاصولياء البيضاء بالزعتر', 'White Bean Soup with Thyme', 'Soupe de haricots blancs au thym', 'Sopa de judias blancas con tomillo', 'Weissbohnensuppe mit Thymian', 'soups_stews', 'lunch', 6, 17, 3, 'simmering', P, diasporaFor(P)),
  B('بيض مخبوز بالجبن الأزرق', 'Baked Eggs with Blue Cheese', 'Oeufs au four au fromage bleu', 'Huevos al horno con queso azul', 'Gebackene Eier mit Blaukaese', 'breakfast_items', 'breakfast', 9, 5, 11, 'baking', P, diasporaFor(P)),
  B('بطاطس مقلية بالجرجير', 'Fried Potatoes with Rocket', 'Pommes de terre frites a la roquette', 'Patatas fritas con rucula', 'Frittierte Kartoffeln mit Rucola', 'vegetable_mains', 'lunch', 4, 25, 9, 'frying', P, diasporaFor(P)),
  B('سلطة الخس بالجوز', 'Lettuce Salad with Walnuts', 'Salade de laitue aux noix', 'Ensalada de lechuga con nueces', 'Salat mit Walnuessen', 'vegetable_mains', 'lunch', 3, 9, 7, 'tossing', P, diasporaFor(P)),
  B('شوربة الجزر بزيت الزيتون', 'Carrot Soup with Olive Oil', 'Veloute de carottes a l huile d olive', 'Crema de zanahoria con aceite de oliva', 'Karottensuppe mit Olivenoel', 'soups_stews', 'lunch', 2, 11, 4, 'simmering', P, diasporaFor(P)),
  B('ماء الليمون الجبلي', 'Alpine Lemon Water', 'Eau citronnee des Alpes', 'Agua de limon alpina', 'Alpen-Zitronenwasser', 'beverages', 'snack', 0, 3, 0, 'brewing', P, diasporaFor(P)),
  B('صلصة الجوز بالعسل', 'Walnut Sauce with Honey', 'Sauce aux noix et au miel', 'Salsa de nueces con miel', 'Walnusssauce mit Honig', 'condiments_sauces', 'snack', 1, 15, 5, 'simmering', P, diasporaFor(P)),

  B('شرائح العجل المشوية', 'Sliced Veal Saute', 'Escalope de veau salee', 'Filetes de ternera salteados', 'Geschnetzeltes Kalbsfleisch', 'meat_mains', 'dinner', 19, 6, 12, 'frying', ZRH, diasporaFor(ZRH)),
  B('شنيتزل العجل بالليمون', 'Veal Schnitzel with Lemon', 'Escalope de veau au citron', 'Escalope de ternera con limon', 'Kalbsschnitzel mit Zitrone', 'meat_mains', 'dinner', 18, 8, 13, 'frying', ZRH, diasporaFor(ZRH)),
  B('برغر البقر بالجبن', 'Beef Burger with Cheese', 'Burger au fromage', 'Hamburguesa de queso', 'Kaeseburger', 'street_snacks', 'lunch', 15, 12, 13, 'grilling', ZRH, diasporaFor(ZRH)),
  B('فطيرة اللحم بالعجين', 'Meat Pastry', 'Tourte a la viande', 'Pastel de carne', 'Fleischpastete', 'street_snacks', 'snack', 11, 20, 11, 'baking', ZRH, diasporaFor(ZRH)),
  B('بيض في السمن', 'Eggs in Butter', 'Oeufs au beurre', 'Huevos a la mantequilla', 'Eier in Butter', 'breakfast_items', 'breakfast', 8, 1, 12, 'frying', ZRH, diasporaFor(ZRH)),
  B('جبن قابل للدهن', 'Soft Cheese Spread', 'Fromage a tartiner', 'Queso para untar', 'Weichkaese zum Streichen', 'condiments_sauces', 'snack', 6, 5, 10, 'assembling', ZRH, diasporaFor(ZRH)),
  B('صلصة التوت للجبن', 'Berry Sauce for Cheese', 'Sauce aux baies pour fromage', 'Salsa de bayas para queso', 'Beeren-Sauce fuer Kaese', 'condiments_sauces', 'snack', 0, 16, 0, 'simmering', ZRH, diasporaFor(ZRH)),
  B('مقرمشات البطاطس بالملح', 'Salted Potato Crisps', 'Chips au sel', 'Patatas fritas con sal', 'Kartoffel-Chips mit Salz', 'street_snacks', 'snack', 3, 26, 10, 'frying', ZRH, diasporaFor(ZRH)),
  B('شوربة اللحم بالخضار', 'Beef and Vegetable Soup', 'Soupe de boeuf aux legumes', 'Sopa de res con verduras', 'Rindfleisch-Gemuesesuppe', 'soups_stews', 'lunch', 9, 7, 5, 'simmering', ZRH, diasporaFor(ZRH)),

  B('قرص البطاطس المهروس', 'Mashed Potato Patty', 'Galette de pommes de terre liees', 'Torta de patata majada', 'Kartoffel-Laibchen', 'vegetable_mains', 'lunch', 4, 21, 7, 'frying', BRN, diasporaFor(BRN)),
  B('كعك البندق', 'Hazelnut Biscuit', 'Biscuit aux noisettes', 'Galleta de avellana', 'Haselnussguetzli', 'rice_cakes_sweets', 'snack', 5, 29, 12, 'baking', BRN, diasporaFor(BRN)),
  B('صينية اللحوم الباردة', 'Cold Meat Platter', 'Assiette de viandes froides', 'Plato de carnes frias', 'Gemischte kalte Fleischplatte', 'meat_mains', 'lunch', 16, 4, 14, 'boiling', BRN, diasporaFor(BRN)),
  B('شوربة الجذور البيضاء', 'White Root Soup', 'Soupe de legumes-racine blancs', 'Sopa de raices blancas', 'Weisse Wurzelsuppe', 'soups_stews', 'lunch', 3, 13, 4, 'simmering', BRN, diasporaFor(BRN)),
  B('معجون الخردل', 'Mustard Spread', 'Moutarde a tartiner', 'Mostaza para untar', 'Senf zum Streichen', 'condiments_sauces', 'snack', 4, 3, 3, 'assembling', BRN, diasporaFor(BRN)),
  B('شوربة الشعير بالخبز المحمص', 'Barley Soup with Toasted Bread', 'Soupe d orge au pain grille', 'Sopa de cebada con pan tostado', 'Gerstensuppe mit Toastbrot', 'soups_stews', 'lunch', 5, 19, 3, 'simmering', BRN, diasporaFor(BRN)),
  B('سلطة الباذنجان المشوي', 'Grilled Aubergine Salad', 'Salade d aubergine grillee', 'Ensalada de berenjena asada', 'Grill-Auberginen-Salat', 'vegetable_mains', 'lunch', 3, 11, 7, 'grilling', BRN, diasporaFor(BRN)),
  B('قرص اللحم المفروم بالبطاطس', 'Minced Beef Patty with Potatoes', 'Galette de viande hachee', 'Hamburguesa de carne picada', 'Hackfleisch-Laibchen mit Kartoffeln', 'meat_mains', 'dinner', 15, 20, 12, 'frying', BRN, diasporaFor(BRN)),

  B('شوربة الخرشوف', 'Artichoke Soup', 'Veloute d artichaut', 'Crema de alcachofa', 'Artischockensuppe', 'soups_stews', 'lunch', 2, 10, 4, 'simmering', GVA, diasporaFor(GVA)),
  B('سلطة الفراولة والسبانخ', 'Strawberry and Spinach Salad', 'Salade de fraises et epinards', 'Ensalada de fresas y espinacas', 'Erdbeer-Spinatsalat', 'vegetable_mains', 'lunch', 3, 14, 5, 'tossing', GVA, diasporaFor(GVA)),
  B('أقراص الكوسا', 'Zucchini Fritters', 'Beignets de courgette', 'Tortitas de calabacin', 'Zucchini-Laibchen', 'street_snacks', 'snack', 4, 16, 10, 'frying', GVA, diasporaFor(GVA)),
  B('صلصة الثوم المهروس', 'Crushed Garlic Sauce', 'Ail ecrase', 'Ajo majado', 'Knoblauchsauce', 'condiments_sauces', 'snack', 2, 6, 7, 'simmering', GVA, diasporaFor(GVA)),
  B('سلطة الطماطم بالثوم', 'Tomato Salad with Garlic', 'Salade de tomates a l ail', 'Ensalada de tomate con ajo', 'Tomatensalat mit Knoblauch', 'vegetable_mains', 'lunch', 2, 9, 6, 'tossing', GVA, diasporaFor(GVA)),
  B('شوربة السمك بالكمون', 'Fish Soup with Cumin', 'Soupe de poisson au cumin', 'Sopa de pescado con comino', 'Fischsuppe mit Kreuzkuemmel', 'fish_seafood', 'lunch', 9, 8, 4, 'simmering', GVA, diasporaFor(GVA)),
  B('كعكة الليمون', 'Lemon Cake', 'Gateau au citron', 'Bizcocho de limon', 'Zitronenkuchen', 'rice_cakes_sweets', 'snack', 4, 32, 10, 'baking', GVA, diasporaFor(GVA)),
  B('برغر البقر والفطر', 'Beef and Mushroom Burger', 'Burger au boeuf et champignons', 'Hamburguesa de res y champinones', 'Rinder-Pilz-Burger', 'street_snacks', 'lunch', 15, 12, 13, 'grilling', GVA, diasporaFor(GVA)),
];