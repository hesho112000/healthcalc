import { B, diasporaFor } from './rows.mjs';

const BRA = 'brandenburg';
const LOW = 'lower_saxony';
const BAD = 'baden_wurttemberg';
const SAA = 'saarland';
const BRE = 'bremen';

export default [
  B('شوربة البطاطس بالبراندنبورغ', 'Brandenburg Potato Soup', 'Veloute de pommes de terre brandebourgeoise', 'Crema de patata de Brandeburgo', 'Brandenburger Kartoffelsuppe', 'soups_stews', 'lunch', 5, 19, 6, 'simmering', BRA, diasporaFor(BRA)),
  B('قرص البطاطس بالبراندنبورغ', 'Brandenburg Potato Plate', 'Assiette de pommes de terre brandebourgeoise', 'Plato de patata de Brandeburgo', 'Brandenburger Kartoffelplatte', 'vegetable_mains', 'dinner', 4, 25, 7, 'roasting', BRA, diasporaFor(BRA)),
  B('شوربة الفاصولياء الحمراء بالبراندنبورغ', 'Brandenburg Red Bean Soup', 'Soupe de haricots rouges brandebourgeoise', 'Sopa de judias rojas de Brandeburgo', 'Brandenburger rote-Bohnen-Suppe', 'soups_stews', 'dinner', 8, 20, 4, 'simmering', BRA, diasporaFor(BRA)),
  B('كعب مقلي بالبراندنبورغ', 'Brandenburg Fried Dumpling', 'Beignet brandebourgeois', 'Buñuelo de Brandeburgo', 'Brandenburger Kartoffelklöße', 'street_snacks', 'snack', 5, 22, 9, 'frying', BRA, diasporaFor(BRA)),
  B('سلطة الشمندر بالبراندنبورغ', 'Brandenburg Beet Salad', 'Salade de betteraves brandebourgeoise', 'Ensalada de remolacha de Brandeburgo', 'Brandenburger Rote-Bete-Salat', 'vegetable_mains', 'lunch', 3, 11, 6, 'tossing', BRA, diasporaFor(BRA)),
  B('فطيرة البطاطس بالبراندنبورغ', 'Brandenburg Potato Pie', 'Tourte de pommes de terre brandebourgeoise', 'Tarta de patata de Brandeburgo', 'Brandenburger Kartoffelauflauf', 'vegetable_mains', 'dinner', 5, 26, 10, 'baking', BRA, diasporaFor(BRA)),
  B('شوربة الجزر بالبراندنبورغ', 'Brandenburg Carrot Soup', 'Veloute de carottes brandebourgeoise', 'Crema de zanahoria de Brandeburgo', 'Brandenburger Karottensuppe', 'soups_stews', 'lunch', 3, 13, 4, 'simmering', BRA, diasporaFor(BRA)),
  B('لحم البقر بالبراندنبورغ', 'Brandenburg Beef Stew', 'Ragoût de boeuf brandebourgeois', 'Guiso de res de Brandeburgo', 'Brandenburger Rinderbraten', 'meat_mains', 'dinner', 17, 12, 12, 'stewing', BRA, diasporaFor(BRA)),
  B('مقبلات السمك بالبراندنبورغ', 'Brandenburg Fish Snack', 'En-cas au poisson brandebourgeois', 'Tentempié de pescado de Brandeburgo', 'Brandenburger Fischbrotchen', 'fish_seafood', 'snack', 11, 14, 10, 'grilling', BRA, diasporaFor(BRA)),
  B('كعك الشوفان بالبراندنبورغ', 'Brandenburg Oatcake', 'Galette d avoine brandebourgeoise', 'Galleta de avena de Brandeburgo', 'Brandenburger Haferkuchen', 'rice_cakes_sweets', 'snack', 5, 27, 9, 'baking', BRA, diasporaFor(BRA)),
  B('شوربة الكرنب بالبراندنبورغ', 'Brandenburg Cabbage Soup', 'Soupe de chou brandebourgeoise', 'Sopa de col de Brandeburgo', 'Brandenburger Krautsuppe', 'soups_stews', 'lunch', 4, 15, 5, 'simmering', BRA, diasporaFor(BRA)),

  B('شوربة المشروم في هانزياتي', 'Hanseatic Mushroom Soup', 'Veloute de champignons hanseatique', 'Crema de champinones hanseatica', 'Hanseatische Pilzsuppe', 'soups_stews', 'lunch', 4, 12, 5, 'simmering', LOW, diasporaFor(LOW)),
  B('سمك مدخن في هانزياتي', 'Hanseatic Smoked Fish', 'Poisson fume hanseatique', 'Pescado ahumado hanseatico', 'Hanseatischer Räucherfisch', 'fish_seafood', 'dinner', 15, 3, 10, 'grilling', LOW, diasporaFor(LOW)),
  B('شوربة العدس في هانزياتي', 'Hanseatic Lentil Soup', 'Soupe de lentilles hanseatique', 'Sopa de lentejas hanseatica', 'Hanseatische Linsensuppe', 'soups_stews', 'lunch', 8, 22, 4, 'simmering', LOW, diasporaFor(LOW)),
  B('قرص البطاطس في هانزياتي', 'Hanseatic Potato Plate', 'Assiette de pommes de terre hanseatique', 'Plato de patata hanseatico', 'Hanseatische Kartoffelplatte', 'vegetable_mains', 'dinner', 4, 24, 7, 'roasting', LOW, diasporaFor(LOW)),
  B('برجر لحم في هانزياتي', 'Hanseatic Beef Burger', 'Burger de boeuf hanseatique', 'Hamburguesa de res hanseatica', 'Hanseatischer Rindfleischburger', 'street_snacks', 'lunch', 14, 13, 12, 'grilling', LOW, diasporaFor(LOW)),
  B('شوربة الخضار في هانزياتي', 'Hanseatic Vegetable Soup', 'Soupe de legumes hanseatique', 'Sopa de verduras hanseatica', 'Hanseatische Gemüsesuppe', 'soups_stews', 'lunch', 4, 15, 4, 'simmering', LOW, diasporaFor(LOW)),
  B('فطيرة التفاح في هانزياتي', 'Hanseatic Apple Pie', 'Tourte aux pommes hanseatique', 'Tarta de manzana hanseatica', 'Hanseatischer Apfelkuchen', 'rice_cakes_sweets', 'snack', 3, 30, 10, 'baking', LOW, diasporaFor(LOW)),
  B('سلطة الفاصولياء في هانزياتي', 'Hanseatic Bean Salad', 'Salade de haricots hanseatique', 'Ensalada de judias hanseatica', 'Hanseatischer Bohnensalat', 'vegetable_mains', 'lunch', 7, 17, 5, 'tossing', LOW, diasporaFor(LOW)),
  B('شوربة السمك في هانزياتي', 'Hanseatic Fish Soup', 'Soupe de poisson hanseatique', 'Sopa de pescado hanseatica', 'Hanseatische Fischsuppe', 'soups_stews', 'lunch', 12, 14, 6, 'simmering', LOW, diasporaFor(LOW)),
  B('مقبلات الجبن في هانزياتي', 'Hanseatic Cheese Snack', 'En-cas au fromage hanseatique', 'Tentempié de queso hanseatico', 'Hanseatischer Käsestück', 'street_snacks', 'snack', 11, 3, 18, 'assembling', LOW, diasporaFor(LOW)),
  B('قرص الزنجبيل في هانزياتي', 'Hanseatic Gingerbread', 'Pain d epice hanseatique', 'Bizcocho de jengibre hanseatico', 'Hanseatischer Lebkuchen', 'rice_cakes_sweets', 'snack', 4, 29, 9, 'baking', LOW, diasporaFor(LOW)),

  B('فطيرة الشوابي', 'Swabian Tart', 'Tarte swabienne', 'Tarta suaba', 'Schwäbische Tarte', 'rice_cakes_sweets', 'snack', 4, 28, 11, 'baking', BAD, diasporaFor(BAD)),
  B('قرص اللحم في شوابي', 'Swabian Meatloaf', 'Pain de viande swabien', 'Pastel de carne suabo', 'Schwäbischer Hackbraten', 'meat_mains', 'dinner', 16, 15, 12, 'baking', BAD, diasporaFor(BAD)),
  B('شوربة البطاطس في شوابي', 'Swabian Potato Soup', 'Veloute de pommes de terre swabienne', 'Crema de patata suaba', 'Schwäbische Kartoffelsuppe', 'soups_stews', 'lunch', 5, 19, 6, 'simmering', BAD, diasporaFor(BAD)),
  B('كعك الحلوى في شوابي', 'Swabian Cake', 'Gâteau swabien', 'Bizcocho suabo', 'Schwäbischer Kuchen', 'rice_cakes_sweets', 'snack', 5, 30, 12, 'baking', BAD, diasporaFor(BAD)),
  B('شوربة الفاصولياء في شوابي', 'Swabian Bean Soup', 'Soupe de haricots swabienne', 'Sopa de judias suaba', 'Schwäbische Bohnensuppe', 'soups_stews', 'lunch', 7, 19, 4, 'simmering', BAD, diasporaFor(BAD)),
  B('دجاج مشوي في شوابي', 'Swabian Grilled Chicken', 'Poulet grille swabien', 'Pollo a la plancha suabo', 'Schwäbisches Grillhähnchen', 'poultry_mains', 'dinner', 17, 3, 11, 'grilling', BAD, diasporaFor(BAD)),
  B('قرص البطاطس في شوابي', 'Swabian Potato Plate', 'Assiette de pommes de terre swabienne', 'Plato de patata suabo', 'Schwäbische Kartoffelplatte', 'vegetable_mains', 'dinner', 4, 24, 7, 'roasting', BAD, diasporaFor(BAD)),
  B('شوربة الجزر في شوابي', 'Swabian Carrot Soup', 'Veloute de carottes swabienne', 'Crema de zanahoria suaba', 'Schwäbische Karottensuppe', 'soups_stews', 'lunch', 3, 13, 4, 'simmering', BAD, diasporaFor(BAD)),
  B('سلطة الحساء في شوابي', 'Swabian Salad Plate', 'Assiette de salade swabienne', 'Plato de ensalada suabo', 'Schwäbischer Salatteller', 'vegetable_mains', 'lunch', 5, 12, 7, 'tossing', BAD, diasporaFor(BAD)),
  B('فاصولياء خضراء في شوابي', 'Swabian Green Beans', 'Haricots verts swabiens', 'Judias verdes suabas', 'Schwäbische grüne Bohnen', 'vegetable_mains', 'lunch', 3, 9, 6, 'simmering', BAD, diasporaFor(BAD)),
  B('شوربة البصل في شوابي', 'Swabian Onion Soup', 'Soupe aux oignons swabienne', 'Sopa de cebolla suaba', 'Schwäbische Zwiebelsuppe', 'soups_stews', 'lunch', 3, 14, 6, 'simmering', BAD, diasporaFor(BAD)),
  B('مقبلات الجبن في شوابي', 'Swabian Cheese Snack', 'En-cas au fromage swabien', 'Tentempié de queso suabo', 'Schwäbischer Käsestück', 'street_snacks', 'snack', 11, 3, 18, 'assembling', BAD, diasporaFor(BAD)),

  B('شوربة اللحم في سارلاند', 'Saarland Meat Soup', 'Soupe de viande de Sarre', 'Sopa de carne de Sarre', 'Saarländische Fleischsuppe', 'soups_stews', 'dinner', 13, 14, 8, 'stewing', SAA, diasporaFor(SAA)),
  B('شوربة البطاطس في سارلاند', 'Saarland Potato Soup', 'Veloute de pommes de terre de Sarre', 'Crema de patata de Sarre', 'Saarländische Kartoffelsuppe', 'soups_stews', 'lunch', 5, 19, 6, 'simmering', SAA, diasporaFor(SAA)),
  B('قرص الفاصولياء في سارلاند', 'Saarland Bean Plate', 'Assiette de haricots de Sarre', 'Plato de judias de Sarre', 'Saarländische Bohnenplatte', 'vegetable_mains', 'dinner', 8, 24, 6, 'simmering', SAA, diasporaFor(SAA)),
  B('فطيرة التفاح في سارلاند', 'Saarland Apple Pie', 'Tourte aux pommes de Sarre', 'Tarta de manzana de Sarre', 'Saarländischer Apfelkuchen', 'rice_cakes_sweets', 'snack', 3, 30, 10, 'baking', SAA, diasporaFor(SAA)),
  B('لحم البقر في سارلاند', 'Saarland Beef Stew', 'Ragoût de boeuf de Sarre', 'Guiso de res de Sarre', 'Saarländischer Rinderbraten', 'meat_mains', 'dinner', 17, 12, 12, 'stewing', SAA, diasporaFor(SAA)),
  B('شوربة العدس في سارلاند', 'Saarland Lentil Soup', 'Soupe de lentilles de Sarre', 'Sopa de lentejas de Sarre', 'Saarländische Linsensuppe', 'soups_stews', 'lunch', 8, 22, 4, 'simmering', SAA, diasporaFor(SAA)),
  B('سلطة الشمندر في سارلاند', 'Saarland Beet Salad', 'Salade de betteraves de Sarre', 'Ensalada de remolacha de Sarre', 'Saarländischer Rote-Bete-Salat', 'vegetable_mains', 'lunch', 3, 11, 6, 'tossing', SAA, diasporaFor(SAA)),
  B('قرص الجبن في سارلاند', 'Saarland Cheese Plate', 'Assiette de fromages de Sarre', 'Plato de queso de Sarre', 'Saarländische Käseplatte', 'street_snacks', 'snack', 12, 3, 19, 'assembling', SAA, diasporaFor(SAA)),
  B('شوربة الخضار في سارلاند', 'Saarland Vegetable Soup', 'Soupe de legumes de Sarre', 'Sopa de verduras de Sarre', 'Saarländische Gemüsesuppe', 'soups_stews', 'lunch', 4, 15, 4, 'simmering', SAA, diasporaFor(SAA)),

  B('شوربة السمك في بريميني', 'Bremen Fish Soup', 'Soupe de poisson de Bremen', 'Sopa de pescado de Bremen', 'Bremer Fischsuppe', 'soups_stews', 'lunch', 12, 14, 6, 'simmering', BRE, diasporaFor(BRE)),
  B('شوربة الشوفان في بريميني', 'Bremen Oatmeal Soup', 'Soupe de flocons d avoine de Bremen', 'Sopa de avena de Bremen', 'Bremer Hafergrütze', 'soups_stews', 'lunch', 5, 18, 4, 'simmering', BRE, diasporaFor(BRE)),
  B('سمك مدخن في بريميني', 'Bremen Smoked Fish', 'Poisson fume de Bremen', 'Pescado ahumado de Bremen', 'Bremer Räucherfisch', 'fish_seafood', 'dinner', 15, 3, 10, 'grilling', BRE, diasporaFor(BRE)),
  B('شوربة الفاصولياء في بريميني', 'Bremen Bean Soup', 'Soupe de haricots de Bremen', 'Sopa de judias de Bremen', 'Bremer Bohnensuppe', 'soups_stews', 'lunch', 7, 19, 4, 'simmering', BRE, diasporaFor(BRE)),
  B('فطيرة البطاطس في بريميني', 'Bremen Potato Pie', 'Tourte de pommes de terre de Bremen', 'Tarta de patata de Bremen', 'Bremer Kartoffelauflauf', 'vegetable_mains', 'dinner', 5, 26, 10, 'baking', BRE, diasporaFor(BRE)),
  B('قرص البطاطس في بريميني', 'Bremen Potato Plate', 'Assiette de pommes de terre de Bremen', 'Plato de patata de Bremen', 'Bremer Kartoffelplatte', 'vegetable_mains', 'dinner', 4, 24, 7, 'roasting', BRE, diasporaFor(BRE)),
  B('شوربة الجزر في بريميني', 'Bremen Carrot Soup', 'Veloute de carottes de Bremen', 'Crema de zanahoria de Bremen', 'Bremer Karottensuppe', 'soups_stews', 'lunch', 3, 13, 4, 'simmering', BRE, diasporaFor(BRE)),
  B('برجر لحم في بريميني', 'Bremen Beef Burger', 'Burger de boeuf de Bremen', 'Hamburguesa de res de Bremen', 'Bremer Rindfleischburger', 'street_snacks', 'lunch', 14, 13, 12, 'grilling', BRE, diasporaFor(BRE)),
  B('مقبلات الجبن في بريميني', 'Bremen Cheese Snack', 'En-cas au fromage de Bremen', 'Tentempié de queso de Bremen', 'Bremer Käsestück', 'street_snacks', 'snack', 11, 3, 18, 'assembling', BRE, diasporaFor(BRE)),
  B('شوربة العدس في بريميني', 'Bremen Lentil Soup', 'Soupe de lentilles de Bremen', 'Sopa de lentejas de Bremen', 'Bremer Linsensuppe', 'soups_stews', 'lunch', 8, 22, 4, 'simmering', BRE, diasporaFor(BRE)),
  B('كعك الزنجبيل في بريميني', 'Bremen Gingerbread', 'Pain d epice de Bremen', 'Bizcocho de jengibre de Bremen', 'Bremer Lebkuchen', 'rice_cakes_sweets', 'snack', 4, 29, 9, 'baking', BRE, diasporaFor(BRE)),
];