import { B, diasporaFor } from './rows.mjs';

const BER = 'berlin';
const RIN = 'rhineland';
const SAX = 'saxony';
const THU = 'thuringia';

export default [
  B('شوربة السمك بالبرلين', 'Berlin Fish Soup', 'Soupe de poisson berlinoise', 'Sopa de pescado berlinesa', 'Berliner Fischsuppe', 'soups_stews', 'lunch', 12, 14, 6, 'simmering', BER, diasporaFor(BER)),

  B('مكرونة الراين', 'Rhine Valley Pasta', 'Pates de la vallee du Rhin', 'Pasta del valle del Rin', 'Rheintal-Nudeln', 'noodle_dishes', 'lunch', 9, 27, 9, 'simmering', RIN, diasporaFor(RIN)),
  B('شورطة اللحم في الراين', 'Rhine Meat Stew', 'Ragoût de viande de la vallee du Rhin', 'Guiso de carne del valle del Rin', 'Rheintal-Fleischtopf', 'soups_stews', 'dinner', 15, 13, 11, 'stewing', RIN, diasporaFor(RIN)),
  B('شوربة البطاطس بالراين', 'Rhine Potato Soup', 'Veloute de pommes de terre rhénane', 'Crema de patata renana', 'Rheinische Kartoffelsuppe', 'soups_stews', 'lunch', 5, 18, 6, 'simmering', RIN, diasporaFor(RIN)),
  B('شوربة العدس بالراين', 'Rhine Lentil Soup', 'Soupe de lentilles de la vallee du Rhin', 'Sopa de lentejas del valle del Rin', 'Rheintal-Linsensuppe', 'soups_stews', 'lunch', 8, 22, 4, 'simmering', RIN, diasporaFor(RIN)),
  B('لحم البقر بالراين', 'Rhine Beef Roast', 'Roti de boeuf rhénan', 'Asado de res renano', 'Rheintal-Rinderbraten', 'meat_mains', 'dinner', 19, 4, 13, 'roasting', RIN, diasporaFor(RIN)),
  B('بطاطس بالراين', 'Rhine Potatoes', 'Pommes de terre de la vallee du Rhin', 'Patatas del valle del Rin', 'Rheintal-Kartoffeln', 'vegetable_mains', 'dinner', 4, 25, 7, 'roasting', RIN, diasporaFor(RIN)),
  B('سلطة الكرنب بالراين', 'Rhine Cabbage Salad', 'Salade de chou rhénane', 'Ensalada de col renana', 'Rheintal-Krautsalat', 'vegetable_mains', 'lunch', 3, 10, 6, 'tossing', RIN, diasporaFor(RIN)),
  B('شوربة الجزر بالراين', 'Rhine Carrot Soup', 'Veloute de carottes rhénane', 'Crema de zanahoria renana', 'Rheintal-Karottensuppe', 'soups_stews', 'lunch', 3, 13, 4, 'simmering', RIN, diasporaFor(RIN)),
  B('برجر الجبن بالراين', 'Rhine Cheese Burger', 'Burger au fromage rhénan', 'Hamburguesa de queso renana', 'Rheintal-Kaeseburger', 'vegetable_mains', 'lunch', 10, 16, 13, 'grilling', RIN, diasporaFor(RIN)),

  B('شوربة البصل بالساكسون', 'Saxon Onion Soup', 'Soupe aux oignons saxonne', 'Sopa de cebolla sajona', 'Sächsische Zwiebelsuppe', 'soups_stews', 'lunch', 4, 14, 6, 'simmering', SAX, diasporaFor(SAX)),
  B('طبق البطاطس بالساكسون', 'Saxon Potato Plate', 'Assiette de pommes de terre saxonne', 'Plato de patata sajono', 'Sächsische Kartoffelplatte', 'vegetable_mains', 'dinner', 4, 25, 7, 'roasting', SAX, diasporaFor(SAX)),
  B('سوبياء طورينغ', 'Thuringian Sausage', 'Saucisse de Thuringe', 'Salchicha de Turingia', 'Thüringer Rostbratwurst', 'meat_mains', 'dinner', 13, 9, 13, 'pan_frying', THU, diasporaFor(THU)),
  B('كبسة الدجاج بالساكسون', 'Saxon Chicken Casserole', 'Ragout de poulet saxon', 'Guiso de pollo sajono', 'Sächsischer Huhnkaps', 'poultry_mains', 'dinner', 16, 14, 10, 'stewing', SAX, diasporaFor(SAX)),
  B('شوربة المشروم بالساكسون', 'Saxon Mushroom Soup', 'Veloute de champignons saxon', 'Crema de champinones sajona', 'Sächsische Pilzsuppe', 'soups_stews', 'lunch', 4, 12, 5, 'simmering', SAX, diasporaFor(SAX)),
  B('قرص الزنبق بالساكسون', 'Saxon Quark Cake', 'Gâteau au fromage quark saxon', 'Bizcocho de requeson sajono', 'Sächsischer Quarkkuchen', 'rice_cakes_sweets', 'snack', 5, 28, 11, 'baking', SAX, diasporaFor(SAX)),
  B('سلطة البطاطس بالساكسون', 'Saxon Potato Salad', 'Salade de pommes de terre saxonne', 'Ensalada de patata sajona', 'Sächsischer Kartoffelsalat', 'vegetable_mains', 'lunch', 4, 21, 8, 'tossing', SAX, diasporaFor(SAX)),
  B('شوربة العدس بالساكسون', 'Saxon Lentil Soup', 'Soupe de lentilles saxonne', 'Sopa de lentejas sajona', 'Sächsische Linsensuppe', 'soups_stews', 'lunch', 8, 22, 4, 'simmering', SAX, diasporaFor(SAX)),
  B('لحم البقر بالساكسون', 'Saxon Beef Stew', 'Ragoût de boeuf saxon', 'Guiso de res sajono', 'Sächsischer Rinderbraten', 'meat_mains', 'dinner', 17, 12, 12, 'stewing', SAX, diasporaFor(SAX)),
  B('فطيرة التفاح بالساكسون', 'Saxon Apple Pie', 'Tourte aux pommes saxonne', 'Tarta de manzana sajona', 'Sächsischer Apfelkuchen', 'rice_cakes_sweets', 'snack', 3, 30, 10, 'baking', SAX, diasporaFor(SAX)),
  B('مشوي الخضار بالساكسون', 'Saxon Grilled Vegetables', 'Legumes grilles saxons', 'Verduras a la plancha sajonas', 'Sächsisches Grillgemüse', 'vegetable_mains', 'dinner', 5, 16, 9, 'grilling', SAX, diasporaFor(SAX)),
  B('قرص الجبن بالساكسون', 'Saxon Cheese Plate', 'Assiette de fromages saxonne', 'Plato de queso sajono', 'Sächsische Käseplatte', 'street_snacks', 'snack', 12, 3, 19, 'assembling', SAX, diasporaFor(SAX)),
  B('شوربة الجذور بالساكسون', 'Saxon Root Vegetable Soup', 'Veloute de racines saxonne', 'Crema de raiz sajona', 'Sächsische Wurzelsuppe', 'soups_stews', 'lunch', 4, 16, 4, 'simmering', SAX, diasporaFor(SAX)),
  B('برجر الفاصولياء بالساكسون', 'Saxon Bean Burger', 'Burger de haricots saxon', 'Hamburguesa de judias sajona', 'Sächsischer Bohnenburger', 'vegetable_mains', 'lunch', 9, 20, 8, 'grilling', SAX, diasporaFor(SAX)),

  B('كبسة الفاصولياء بالتورينغ', 'Thuringian Bean Casserole', 'Ragout de haricots de Thuringe', 'Guiso de judias de Turingia', 'Thüringer Bohnenbraten', 'vegetable_mains', 'dinner', 10, 22, 9, 'stewing', THU, diasporaFor(THU)),
  B('قرص البطاطس بالتورينغ', 'Thuringian Potato Dish', 'Plat de pommes de terre de Thuringe', 'Plato de patata de Turingia', 'Thüringer Kartoffelgericht', 'vegetable_mains', 'dinner', 4, 24, 8, 'roasting', THU, diasporaFor(THU)),
  B('شوربة اللحم بالتورينغ', 'Thuringian Meat Soup', 'Soupe de viande de Thuringe', 'Sopa de carne de Turingia', 'Thüringer Fleischsuppe', 'soups_stews', 'dinner', 13, 14, 8, 'stewing', THU, diasporaFor(THU)),
  B('فطيرة التفاح بالتورينغ', 'Thuringian Apple Pie', 'Tourte aux pommes de Thuringe', 'Tarta de manzana de Turingia', 'Thüringer Apfelkuchen', 'rice_cakes_sweets', 'snack', 3, 30, 10, 'baking', THU, diasporaFor(THU)),
  B('سلطة الفاصولياء الحمراء بالتورينغ', 'Thuringian Red Bean Salad', 'Salade de haricots rouges de Thuringe', 'Ensalada de judias rojas de Turingia', 'Thüringer rote-Bohnen-Salat', 'vegetable_mains', 'lunch', 8, 18, 5, 'tossing', THU, diasporaFor(THU)),
  B('شوربة الجزر بالتورينغ', 'Thuringian Carrot Soup', 'Veloute de carottes de Thuringe', 'Crema de zanahoria de Turingia', 'Thüringer Karottensuppe', 'soups_stews', 'lunch', 3, 13, 4, 'simmering', THU, diasporaFor(THU)),
  B('مقبلات الجبن بالتورينغ', 'Thuringian Cheese Snack', 'En-cas au fromage de Thuringe', 'Tentempié de queso de Turingia', 'Thüringer Käsestück', 'street_snacks', 'snack', 11, 3, 18, 'assembling', THU, diasporaFor(THU)),
  B('دجاج مشوي بالتورينغ', 'Thuringian Grilled Chicken', 'Poulet grille de Thuringe', 'Pollo a la plancha de Turingia', 'Thüringer Grillhähnchen', 'poultry_mains', 'dinner', 17, 3, 11, 'grilling', THU, diasporaFor(THU)),
  B('شوربة الفاصولياء بالتورينغ', 'Thuringian Bean Soup', 'Soupe de haricots de Thuringe', 'Sopa de judias de Turingia', 'Thüringer Bohnensuppe', 'soups_stews', 'lunch', 7, 18, 4, 'simmering', THU, diasporaFor(THU)),
  B('قرص اللحم بالتورينغ', 'Thuringian Meatloaf', 'Pain de viande de Thuringe', 'Pastel de carne de Turingia', 'Thüringer Hackbraten', 'meat_mains', 'dinner', 16, 14, 12, 'baking', THU, diasporaFor(THU)),
  B('سلطة الروتين بالتورينغ', 'Thuringian Beet Salad', 'Salade de betteraves de Thuringe', 'Ensalada de remolacha de Turingia', 'Thürischer Rote-Bete-Salat', 'vegetable_mains', 'lunch', 3, 11, 6, 'tossing', THU, diasporaFor(THU)),
  B('كعك الزنجبيل بالتورينغ', 'Thuringian Gingerbread', 'Pain d epice au gingembre', 'Bizcocho de jengibre de Turingia', 'Thüringer Lebkuchen', 'rice_cakes_sweets', 'snack', 4, 29, 9, 'baking', THU, diasporaFor(THU)),
];