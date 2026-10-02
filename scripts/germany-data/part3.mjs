import { B, diasporaFor } from '../germany-base-data/rows.mjs';

const BER = 'berlin';
const HAM = 'hamburg';
const HES = 'hesse';
const RIN = 'rhineland';
const SAX = 'saxony';

export default [
  B('شوربة الجزر المبرّكة بالبرلين', 'Berlin Carrot Cream Soup', 'Veloute de carottes a la creme berlinoise', 'Crema de zanahoria con nata berlinesa', 'Berliner Rühm-Karottensuppe', 'soups_stews', 'lunch', 3, 13, 6, 'simmering', BER, diasporaFor(BER)),
  B('برجر الفاصولياء بالبرلين', 'Berlin Bean Burger', 'Burger de haricots berlinois', 'Hamburguesa de judias berlinesa', 'Berliner Bohnenburger', 'vegetable_mains', 'lunch', 9, 20, 8, 'grilling', BER, diasporaFor(BER)),
  B('شوربة البطاطس بالبرلين', 'Berlin Potato Cream Soup', 'Veloute de pommes de terre berlinoise', 'Crema de patata berlinesa', 'Berliner Kartoffelcremesuppe', 'soups_stews', 'lunch', 5, 18, 7, 'simmering', BER, diasporaFor(BER)),
  B('فطيرة السمك بالبرلين', 'Berlin Fish Tart', 'Tourte au poisson de Berlin', 'Tarta de pescado de Berlín', 'Berliner Fischauflauf', 'fish_seafood', 'snack', 11, 20, 11, 'baking', BER, diasporaFor(BER)),
  B('سلطة الجرجير بالبرلين', 'Berlin Arugula Salad', 'Salade de roquette berlinoise', 'Ensalada de rúcula berlinesa', 'Berliner Rucolasalat', 'vegetable_mains', 'lunch', 4, 8, 9, 'tossing', BER, diasporaFor(BER)),
  B('شوربة الحنطة بالبرلين', 'Berlin Wheat Soup', 'Veloute de ble berlinois', 'Crema de trigo berlinesa', 'Berliner Weizensuppe', 'soups_stews', 'lunch', 5, 17, 4, 'simmering', BER, diasporaFor(BER)),
  B('قرص الشوكولاتة بالبرلين', 'Berlin Chocolate Cake', 'Gâteau chocolat berlinois', 'Bizcocho de chocolate berlines', 'Berliner Schokoladenkuchen', 'rice_cakes_sweets', 'snack', 4, 31, 13, 'baking', BER, diasporaFor(BER)),
  B('شوربة المشروم بالبرلين', 'Berlin Mushroom Soup', 'Veloute de champignons berlinoise', 'Crema de champinones berlinesa', 'Berliner Pilzsuppe', 'soups_stews', 'lunch', 4, 12, 5, 'simmering', BER, diasporaFor(BER)),

  B('شوربة السمك بهامبورغ', 'Hamburg Fish Soup', 'Veloute de poisson de Hambourg', 'Crema de pescado de Hamburgo', 'Hamburger Fischsuppe', 'soups_stews', 'lunch', 12, 15, 6, 'simmering', HAM, diasporaFor(HAM)),
  B('برجر الفاصولياء بهامبورغ', 'Hamburg Bean Burger', 'Burger de haricots de Hambourg', 'Hamburguesa de judias de Hamburgo', 'Hamburger Bohnenburger', 'vegetable_mains', 'lunch', 9, 20, 8, 'grilling', HAM, diasporaFor(HAM)),
  B('شوربة البطاطس بهامبورغ', 'Hamburg Potato Cream Soup', 'Veloute de pommes de terre de Hambourg', 'Crema de patata de Hamburgo', 'Hamburger Kartoffelcremesuppe', 'soups_stews', 'lunch', 5, 18, 7, 'simmering', HAM, diasporaFor(HAM)),
  B('فطيرة السمك بهامبورغ', 'Hamburg Fish Tart', 'Tourte au poisson de Hambourg', 'Tarta de pescado de Hamburgo', 'Hamburger Fischauflauf', 'fish_seafood', 'snack', 11, 21, 11, 'baking', HAM, diasporaFor(HAM)),
  B('مقبلات السمك بهامبورغ', 'Hamburg Fish Platter', 'Assiette de poisson de Hambourg', 'Plato de pescado de Hamburgo', 'Hamburger Fischplatte', 'fish_seafood', 'dinner', 14, 12, 10, 'grilling', HAM, diasporaFor(HAM)),
  B('شوربة العدس بهامبورغ', 'Hamburg Lentil Soup', 'Veloute de lentilles de Hambourg', 'Crema de lentejas de Hamburgo', 'Hamburger Linsensuppe', 'soups_stews', 'lunch', 8, 22, 4, 'simmering', HAM, diasporaFor(HAM)),
  B('كعك الزنجبيل بهامبورغ', 'Hamburg Ginger Cake', 'Gâteau au gingembre de Hambourg', 'Bizcocho de jengibre de Hamburgo', 'Hamburger Ingwerkuchen', 'rice_cakes_sweets', 'snack', 4, 30, 11, 'baking', HAM, diasporaFor(HAM)),
  B('سلطة البازلاء بهامبورغ', 'Hamburg Pea Salad', 'Salade de petits pois de Hambourg', 'Ensalada de guisantes de Hamburgo', 'Hamburger Erbsensalat', 'vegetable_mains', 'lunch', 6, 14, 6, 'tossing', HAM, diasporaFor(HAM)),

  B('شوربة العدس كريمة بهايسي', 'Hesse Creamy Lentil Soup', 'Veloute de lentilles a la creme de Hesse', 'Crema de lentejas con nata de Hesse', 'Hessische Cremelinsensuppe', 'soups_stews', 'lunch', 8, 22, 6, 'simmering', HES, diasporaFor(HES)),
  B('برجر الفاصولياء بهايسي', 'Hesse Bean Burger', 'Burger de haricots de Hesse', 'Hamburguesa de judias de Hesse', 'Hessischer Bohnenburger', 'vegetable_mains', 'lunch', 9, 20, 8, 'grilling', HES, diasporaFor(HES)),
  B('شوربة البطاطس كريمة بهايسي', 'Hesse Creamy Potato Soup', 'Veloute de pommes de terre a la creme de Hesse', 'Crema de patata con nata de Hesse', 'Hessische Cremekartoffelsuppe', 'soups_stews', 'lunch', 5, 18, 7, 'simmering', HES, diasporaFor(HES)),
  B('فطيرة التفاح بالكريمة في هايسي', 'Hesse Cream Apple Pie', 'Tourte pommes creme de Hesse', 'Tarta de manzana con crema de Hesse', 'Hessischer Sahne-Apfelkuchen', 'rice_cakes_sweets', 'snack', 4, 30, 12, 'baking', HES, diasporaFor(HES)),
  B('شوربة الجذور بهايسي', 'Hesse Root Soup', 'Veloute de racines de Hesse', 'Crema de raíces de Hesse', 'Hessische Wurzelsuppe', 'soups_stews', 'lunch', 4, 16, 4, 'simmering', HES, diasporaFor(HES)),
  B('سلطة الشمندر والبنفسج بهايسي', 'Hesse Beetroot Salad', 'Salade de betteraves violettes', 'Ensalada de remolacha morada de Hesse', 'Hessischer Rote-Bete-Salat', 'vegetable_mains', 'lunch', 3, 11, 6, 'tossing', HES, diasporaFor(HES)),
  B('مقبلات الجبن بهايسي', 'Hesse Cheese Platter', 'Plateau de fromages de Hesse', 'Plato de quesos de Hesse', 'Hessische Käseplatte', 'street_snacks', 'snack', 12, 4, 19, 'assembling', HES, diasporaFor(HES)),
  B('كعك الشوفان بهايسي', 'Hesse Oat Cake', 'Gâteau d avoine de Hesse', 'Bizcocho de avena de Hesse', 'Hessischer Haferkuchen', 'rice_cakes_sweets', 'snack', 5, 28, 9, 'baking', HES, diasporaFor(HES)),

  B('شوربة الكرم بالراين', 'Rhine Cream Soup', 'Veloute rhénane a la creme', 'Crema renana con nata', 'Rheinische Cremesuppe', 'soups_stews', 'lunch', 4, 13, 7, 'simmering', RIN, diasporaFor(RIN)),
  B('برجر الفاصولياء بالراين', 'Rhine Bean Burger', 'Burger de haricots rhénan', 'Hamburguesa de judias renana', 'Rheintal-Bohnenburger', 'vegetable_mains', 'lunch', 9, 20, 8, 'grilling', RIN, diasporaFor(RIN)),
  B('شوربة اللحم بالراين', 'Rhine Beef Soup', 'Veloute de boeuf rhénane', 'Crema de res renana', 'Rheintal-Rindfleischsuppe', 'soups_stews', 'dinner', 13, 14, 8, 'stewing', RIN, diasporaFor(RIN)),
  B('مكرونة السميد بالراين', 'Rhine Semolina Pasta', 'Pates de semoule rhénanes', 'Pasta de sémola renana', 'Rheintal-Grießnudeln', 'noodle_dishes', 'lunch', 8, 26, 7, 'simmering', RIN, diasporaFor(RIN)),
  B('فطيرة التفاح بالراين', 'Rhine Apple Pie', 'Tourte aux pommes rhénane', 'Tarta de manzana renana', 'Rheintal-Apfelkuchen', 'rice_cakes_sweets', 'snack', 3, 30, 10, 'baking', RIN, diasporaFor(RIN)),
  B('شوربة البصل بالراين', 'Rhine Onion Soup', 'Veloute d oignon rhénane', 'Crema de cebolla renana', 'Rheintal-Zwiebelsuppe', 'soups_stews', 'lunch', 3, 13, 6, 'simmering', RIN, diasporaFor(RIN)),
  B('سلطة الملفوف بالراين', 'Rhine Slaw', 'Salade de chou renane', 'Ensalada de col rena', 'Rheintal-Gemuesesalat', 'vegetable_mains', 'lunch', 3, 10, 6, 'tossing', RIN, diasporaFor(RIN)),
  B('قرص الفاصولياء بالراين', 'Rhine Bean Plate', 'Assiette de haricots rhénane', 'Plato de judias renano', 'Rheintal-Bohnenplatte', 'vegetable_mains', 'dinner', 8, 24, 6, 'simmering', RIN, diasporaFor(RIN)),

  B('شوربة العدس المتبّلة بالساكسون', 'Saxon Spiced Lentil Soup', 'Veloute de lentilles aux epices saxonne', 'Crema de lentejas especiada sajona', 'Sächsische Gewürzlinsensuppe', 'soups_stews', 'lunch', 8, 22, 6, 'simmering', SAX, diasporaFor(SAX)),
  B('برجر الفاصولياء المخبوز بالساكسون', 'Saxon Bean Patty', 'Galette de haricots saxonne', 'Bollo de judinas sajono', 'Sächsischer Bohnen-Laibchen', 'vegetable_mains', 'lunch', 9, 20, 8, 'grilling', SAX, diasporaFor(SAX)),
  B('شوربة البطاطس بالساكسون', 'Saxon Potato Cream Soup', 'Veloute de pommes de terre saxonne', 'Crema de patata sajona', 'Sächsische Kartoffelcremesuppe', 'soups_stews', 'lunch', 5, 18, 7, 'simmering', SAX, diasporaFor(SAX)),
  B('فطيرة الزنجبيل بالساكسون', 'Saxon Ginger Pie', 'Tourte au gingembre saxonne', 'Tarta de jengibre sajona', 'Sächsischer Ingwerkuchen', 'rice_cakes_sweets', 'snack', 4, 30, 11, 'baking', SAX, diasporaFor(SAX)),
  B('مقبلات لحم البقر بالساكسون', 'Saxon Beef Platter', 'Assiette de boeuf saxonne', 'Plato de res sajono', 'Sächsische Rindfleischplatte', 'meat_mains', 'lunch', 16, 8, 12, 'tossing', SAX, diasporaFor(SAX)),
  B('شوربة المشروم الكريمية بالساكسون', 'Saxon Creamy Mushroom Soup', 'Veloute de champignons a la creme saxonne', 'Crema de champinones con nata sajona', 'Sächsische Rahmpilzsuppe', 'soups_stews', 'lunch', 4, 12, 7, 'simmering', SAX, diasporaFor(SAX)),
];