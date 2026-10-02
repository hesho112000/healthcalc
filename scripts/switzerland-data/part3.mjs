import { B, diasporaFor } from '../switzerland-base-data/rows.mjs';

const BRN = 'bern';
const TCN = 'ticino';
const VAL = 'valais';
const GRS = 'grisons';
const VUD = 'vaud';
const ARG = 'aargau';
const STG = 'st_gallen';

export default [
  B('فطائر البطاطس بالتفاح', 'Potato Pancakes with Apples', 'Galettes de pommes de terre aux pommes', 'Tortitas de papa con manzana', 'Kartoffelpuffer mit Apfel', 'breakfast_items', 'breakfast', 5, 26, 9, 'frying', BRN, diasporaFor(BRN)),

  B('ريزوتو بالفطر', 'Mushroom Risotto', 'Risotto aux champignons', 'Risotto con champinones', 'Risotto mit Pilzen', 'rice_dishes', 'dinner', 8, 27, 8, 'simmering', TCN, diasporaFor(TCN)),
  

  B('لحم الضأن بالزعتر', 'Lamb with Thyme', 'Agneau au thym', 'Cordero con tomillo', 'Lamm mit Thymian', 'meat_mains', 'dinner', 21, 3, 12, 'roasting', VAL, diasporaFor(VAL)),
  B('كمثرى مخبوزة بالعسل', 'Baked Pear with Honey', 'Poire au four au miel', 'Pera al horno con miel', 'Gebackene Birne mit Honig', 'rice_cakes_sweets', 'snack', 1, 30, 5, 'baking', VAL, diasporaFor(VAL)),
  B('طباق الطماطم والفلفل', 'Tomato and Pepper Gratin', 'Gratin de tomates et de poivrons', 'Gratin de tomate y pimiento', 'Tomaten-Paprika-Gratin', 'vegetable_mains', 'dinner', 4, 21, 10, 'baking', VAL, diasporaFor(VAL)),

  B('ميويسلي بالتفاح', 'Muesli with Apple', 'Muesli aux pommes', 'Muesli con manzana', 'Bircher-Muesli mit Apfel', 'breakfast_items', 'breakfast', 6, 25, 5, 'assembling', GRS, diasporaFor(GRS)),
  B('كعك الجوز بالكراميل', 'Caramelised Walnut Cake', 'Gateau aux noix caramelisees', 'Bizcocho de nueces caramelizadas', 'Karamellisierter Nusskuchen', 'rice_cakes_sweets', 'snack', 5, 31, 12, 'baking', GRS, diasporaFor(GRS)),
  B('لحم البقر مع الفجل', 'Beef Roast with Horseradish', 'Roti de boeuf au raifort', 'Asado de res con rabano picante', 'Rinderbraten mit Meerrettich', 'meat_mains', 'dinner', 21, 3, 13, 'roasting', GRS, diasporaFor(GRS)),
  B('بطاطس بالروزماري', 'Roasted Potatoes with Rosemary', 'Pommes de terre au romarin', 'Patatas con romero', 'Kartoffeln mit Rosmarin', 'vegetable_mains', 'lunch', 3, 24, 8, 'roasting', GRS, diasporaFor(GRS)),
  B('خبز الجبن بالكراوية', 'Caraway Cheese Bread', 'Pain au fromage au carvi', 'Pan de queso con alcaravea', 'Kaesebrot mit Kuemmel', 'breakfast_items', 'snack', 8, 24, 9, 'baking', GRS, diasporaFor(GRS)),
  B('تارت المشمش', 'Apricot Tart', 'Tarte aux abricots', 'Tarta de albaricoque', 'Aprikosentarte', 'rice_cakes_sweets', 'snack', 4, 30, 10, 'baking', GRS, diasporaFor(GRS)),
  B('شوربة الشعير بالعسل', 'Barley Porridge with Honey', 'Porridge d orge au miel', 'Avena de cebada con miel', 'Gerstenbrei mit Honig', 'breakfast_items', 'breakfast', 5, 25, 4, 'simmering', GRS, diasporaFor(GRS)),
  B('ساندويتش الجبن والخيار', 'Cheese and Cucumber Sandwich', 'Sandwich fromage et concombre', 'Bocadillo de queso y pepino', 'Kaese-Gurken-Sandwich', 'street_snacks', 'snack', 8, 14, 8, 'assembling', GRS, diasporaFor(GRS)),
  B('ستوديل التفاح', 'Apple Strudel', 'Strudel aux pommes', 'Strudel de manzana', 'Apfelstrudel', 'rice_cakes_sweets', 'snack', 4, 30, 11, 'baking', GRS, diasporaFor(GRS)),

  B('سمك التراوت باللوز', 'Trout with Almonds', 'Truite aux amandes', 'Trucha con almendras', 'Forelle mit Mandeln', 'fish_seafood', 'dinner', 20, 2, 10, 'grilling', VUD, diasporaFor(VUD)),
  B('كيش الجبن والخضار', 'Cheese and Vegetable Quiche', 'Quiche fromage et legumes', 'Quiche de queso y verduras', 'Kaese-Gemuese-Quiche', 'street_snacks', 'lunch', 10, 18, 14, 'baking', VUD, diasporaFor(VUD)),
  B('خضار الجذور المشوية', 'Roasted Root Vegetables', 'Legumes-racines grilles', 'Verduras de raiz asadas', 'Geroestetes Wurzelgemuese', 'vegetable_mains', 'lunch', 3, 16, 7, 'roasting', VUD, diasporaFor(VUD)),
  B('تارت الليمون بالميرينغ', 'Lemon Meringue Pie', 'Tarte au citron meringuee', 'Tarta de limon con merengue', 'Zitronentarte mit Meringue', 'rice_cakes_sweets', 'snack', 4, 32, 11, 'baking', VUD, diasporaFor(VUD)),
  B('يخنة الفاصولياء بالخضار', 'Bean Casserole with Vegetables', 'Casserole de haricots aux legumes', 'Guiso de judias con verduras', 'Bohnen-Gemues-Pfanne', 'vegetable_mains', 'dinner', 8, 18, 8, 'simmering', VUD, diasporaFor(VUD)),
  B('سلطة لحم الضأن بالأعشاب', 'Lamb Salad with Herbs', 'Salade d agneau aux herbes', 'Ensalada de cordero con hierbas', 'Lammsalat mit Kraeutern', 'meat_mains', 'lunch', 19, 5, 11, 'tossing', VUD, diasporaFor(VUD)),
  B('كرات اللحم بالصلصة', 'Meatballs with Gravy', 'Boulettes de viande en sauce', 'Albondigas en salsa', 'Fleischklosschen mit Sosse', 'meat_mains', 'dinner', 17, 12, 13, 'braising', VUD, diasporaFor(VUD)),
  B('عصير العنب الطازج', 'Fresh Grape Juice', 'Jus de raisin frais', 'Zumo de uva fresco', 'Frischer Traubensaft', 'beverages', 'snack', 1, 12, 0, 'brewing', VUD, diasporaFor(VUD)),
  B('روستي بالفطر', 'Rosti with Mushrooms', 'Rossti aux champignons', 'Rosti con champinones', 'Roesti mit Pilzen', 'vegetable_mains', 'dinner', 6, 24, 10, 'frying', VUD, diasporaFor(VUD)),

  B('بروكلي بالبخار بالجبن', 'Steamed Broccoli with Cheese', 'Brocoli a la vapeur au fromage', 'Brocoli al vapor con queso', 'Gedaempfter Brokkoli mit Kaese', 'vegetable_mains', 'lunch', 7, 10, 9, 'steaming', ARG, diasporaFor(ARG)),
  B('شوربة القرع', 'Pumpkin Soup', 'Veloute de potiron', 'Crema de calabaza', 'Kuerbissuppe', 'soups_stews', 'lunch', 3, 13, 5, 'simmering', ARG, diasporaFor(ARG)),
  B('دجاج بالبابريكا', 'Paprika Chicken', 'Poulet au paprika', 'Pollo con paprika', 'Paprika-Huhn', 'poultry_mains', 'dinner', 20, 6, 11, 'roasting', ARG, diasporaFor(ARG)),
  B('سلطة البطاطس بالخردل', 'Potato Salad with Mustard', 'Salade de pommes de terre a la moutarde', 'Ensalada de patata con mostaza', 'Kartoffelsalat mit Senf', 'vegetable_mains', 'lunch', 4, 21, 8, 'tossing', ARG, diasporaFor(ARG)),
  B('رز بالحليب والعسل', 'Rice Pudding with Honey', 'Riz au lait au miel', 'Arroz con leche con miel', 'Reisbrei mit Honig', 'rice_dishes', 'snack', 4, 26, 6, 'simmering', ARG, diasporaFor(ARG)),
  B('مقبلات الجبن والعنب', 'Cheese with Grapes', 'Fromage et raisins', 'Queso y uvas', 'Kaese mit Trauben', 'street_snacks', 'snack', 7, 10, 11, 'assembling', ARG, diasporaFor(ARG)),
  B('ستوديل السبانخ', 'Spinach Strudel', 'Strudel aux epinards', 'Strudel de espinacas', 'Spinatstrudel', 'vegetable_mains', 'lunch', 6, 20, 11, 'baking', ARG, diasporaFor(ARG)),
  B('كعك السمك', 'Fish Cakes', 'Boulettes de poisson', 'Hamburguesas de pescado', 'Fischlaibchen', 'fish_seafood', 'lunch', 14, 14, 9, 'frying', ARG, diasporaFor(ARG)),
  B('شاي البابونج', 'Chamomile Tea', 'Tisane de camomille', 'Infusion de manzanilla', 'Kamillentee', 'beverages', 'snack', 0, 2, 0, 'brewing', ARG, diasporaFor(ARG)),

  B('جبن طازج بالأعشاب', 'Fresh Cheese with Herbs', 'Fromage frais aux herbes', 'Queso fresco con hierbas', 'Frischkaese mit Kraeutern', 'street_snacks', 'snack', 9, 3, 12, 'assembling', STG, diasporaFor(STG)),
  B('ملفوف بالخل', 'Cabbage with Vinegar', 'Chou a l vinaigre', 'Col con vinagre', 'Kraut mit Essig', 'vegetable_mains', 'lunch', 2, 12, 6, 'simmering', STG, diasporaFor(STG)),
  B('كانيلوني بالسبانخ', 'Cannelloni with Spinach', 'Cannelloni aux epinards', 'Canelones con espinacas', 'Cannelloni mit Spinat', 'noodle_dishes', 'dinner', 9, 26, 9, 'baking', STG, diasporaFor(STG)),
  B('حلوى التوت بالقشطة', 'Berry Cream Dessert', 'Dessert aux baies a la creme', 'Postre de bayas con nata', 'Beeren-Dessert mit Sahne', 'rice_cakes_sweets', 'snack', 3, 22, 11, 'assembling', STG, diasporaFor(STG)),
  B('ساندويتش الجبن الذائب', 'Melted Cheese Sandwich', 'Sandwich au fromage fondu', 'Bocadillo de queso fundido', 'Ueberbackenes Kaesesandwich', 'street_snacks', 'lunch', 10, 14, 12, 'grilling', STG, diasporaFor(STG)),
  B('بطة مشوية بالتفاح', 'Roast Duck with Apples', 'Canard roti aux pommes', 'Pato asado con manzana', 'Geröstete Ente mit Apfel', 'meat_mains', 'dinner', 19, 6, 12, 'roasting', STG, diasporaFor(STG)),
  B('كمثرى مطبوخة', 'Pear Compote', 'Compote de poires', 'Compota de peras', 'Birnen-Kompott', 'fruit', 'snack', 0, 20, 0, 'simmering', STG, diasporaFor(STG)),
  B('سلطة المعكرونة بالطماطم', 'Pasta Salad with Tomatoes', 'Salade de pates aux tomates', 'Ensalada de pasta con tomate', 'Pasta-Salat mit Tomaten', 'noodle_dishes', 'lunch', 8, 24, 9, 'tossing', STG, diasporaFor(STG)),
  B('خبز بالكريمة المحمّص', 'Bread with Custard', 'Pain perdu a la creme', 'Tostada de pan con crema', 'Armer Ritter mit Vanille', 'rice_cakes_sweets', 'snack', 7, 24, 12, 'frying', STG, diasporaFor(STG)),
];