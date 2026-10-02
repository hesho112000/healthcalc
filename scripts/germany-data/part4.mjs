import { B, diasporaFor } from '../germany-base-data/rows.mjs';

const THU = 'thuringia';
const BRA = 'brandenburg';
const LOW = 'lower_saxony';
const BAD = 'baden_wurttemberg';
const SAA = 'saarland';
const SAX = 'saxony';
const BRE = 'bremen';

export default [
  B('شوربة الفاصولياء الكريمية بالتورينغ', 'Thuringian Bean Cream Soup', 'Veloute de haricots creme de Thuringe', 'Crema de judias de Turingia', 'Thüringer Bohnencremesuppe', 'soups_stews', 'lunch', 7, 19, 6, 'simmering', THU, diasporaFor(THU)),
  B('برجر الفاصولياء بالتورينغ', 'Thuringian Bean Burger', 'Burger de haricots de Thuringe', 'Hamburguesa de judias de Turingia', 'Thüringer Bohnenburger', 'vegetable_mains', 'lunch', 9, 20, 8, 'grilling', THU, diasporaFor(THU)),
  B('شوربة البطاطس بالتورينغ', 'Thuringian Potato Cream Soup', 'Veloute de pommes de terre de Thuringe', 'Crema de patata de Turingia', 'Thüringer Kartoffelcremesuppe', 'soups_stews', 'lunch', 5, 18, 7, 'simmering', THU, diasporaFor(THU)),
  B('قرص الشوفان بالتورينغ', 'Thuringian Oatcake', 'Galette d avoine de Thuringe', 'Galleta de avena de Turingia', 'Thüringer Haferkuchen', 'rice_cakes_sweets', 'snack', 5, 28, 9, 'baking', THU, diasporaFor(THU)),
  B('مقبلات لحم البقر بالتورينغ', 'Thuringian Beef Platter', 'Assiette de boeuf de Thuringe', 'Plato de res de Turingia', 'Thüringer Rindfleischplatte', 'meat_mains', 'lunch', 16, 8, 12, 'tossing', THU, diasporaFor(THU)),
  B('شوربة الجزر الكريمية بالتورينغ', 'Thuringian Carrot Cream Soup', 'Veloute de carottes a la creme de Thuringe', 'Crema de zanahoria con nata de Turingia', 'Thüringer Karottencremesuppe', 'soups_stews', 'lunch', 3, 13, 6, 'simmering', THU, diasporaFor(THU)),
  B('سلطة الكرنب بالتورينغ', 'Thuringian Cabbage Salad', 'Salade de chou de Thuringe', 'Ensalada de col de Turingia', 'Thüringer Krautsalat', 'vegetable_mains', 'lunch', 3, 10, 6, 'tossing', THU, diasporaFor(THU)),

  B('شوربة الفاصولياء بالبراندنبورغ', 'Brandenburg Bean Cream Soup', 'Veloute de haricots creme brandebourgeoise', 'Crema de judias de Brandeburgo', 'Brandenburger Bohnencremesuppe', 'soups_stews', 'lunch', 7, 19, 6, 'simmering', BRA, diasporaFor(BRA)),
  B('برجر الفاصولياء بالبراندنبورغ', 'Brandenburg Bean Burger', 'Burger de haricots brandebourgeois', 'Hamburguesa de judias de Brandeburgo', 'Brandenburger Bohnenburger', 'vegetable_mains', 'lunch', 9, 20, 8, 'grilling', BRA, diasporaFor(BRA)),
  B('شوربة البطاطس الكريمية بالبراندنبورغ', 'Brandenburg Potato Cream Soup', 'Veloute de pommes de terre creme de Brandebourg', 'Crema de patata con nata de Brandeburgo', 'Brandenburger Kartoffelcremesuppe', 'soups_stews', 'lunch', 5, 18, 7, 'simmering', BRA, diasporaFor(BRA)),
  B('فطيرة الشمندر بالبراندنبورغ', 'Brandenburg Beet Pie', 'Tourte de betteraves brandebourgeoise', 'Tarta de remolacha de Brandeburgo', 'Brandenburger Rote-Bete-Tarte', 'vegetable_mains', 'snack', 4, 24, 9, 'baking', BRA, diasporaFor(BRA)),
  B('مقبلات لحم البقر بالبراندنبورغ', 'Brandenburg Beef Platter', 'Assiette de boeuf brandebourgeoise', 'Plato de res de Brandeburgo', 'Brandenburger Rindfleischplatte', 'meat_mains', 'lunch', 16, 8, 12, 'tossing', BRA, diasporaFor(BRA)),
  B('شوربة الجزر الكريمية بالبراندنبورغ', 'Brandenburg Carrot Cream Soup', 'Veloute de carottes a la creme de Brandebourg', 'Crema de zanahoria con nata de Brandeburgo', 'Brandenburger Karottencremesuppe', 'soups_stews', 'lunch', 3, 13, 6, 'simmering', BRA, diasporaFor(BRA)),
  B('قرص الفاصولياء بالبراندنبورغ', 'Brandenburg Bean Plate', 'Assiette de haricots brandebourgeoise', 'Plato de judias de Brandeburgo', 'Brandenburger Bohnenplatte', 'vegetable_mains', 'dinner', 8, 24, 6, 'simmering', BRA, diasporaFor(BRA)),

  B('شوربة الفاصولياء بهانزياتي', 'Hanseatic Bean Cream Soup', 'Veloute de haricots creme hanseatique', 'Crema de judias hanseatica', 'Hanseatische Bohnencremesuppe', 'soups_stews', 'lunch', 7, 19, 6, 'simmering', LOW, diasporaFor(LOW)),
  B('برجر الفاصولياء بهانزياتي', 'Hanseatic Bean Burger', 'Burger de haricots hanseatique', 'Hamburguesa de judias hanseatica', 'Hanseatischer Bohnenburger', 'vegetable_mains', 'lunch', 9, 20, 8, 'grilling', LOW, diasporaFor(LOW)),
  B('شوربة البطاطس بهانزياتي', 'Hanseatic Potato Cream Soup', 'Veloute de pommes de terre hanseatique', 'Crema de patata hanseatica', 'Hanseatische Kartoffelcremesuppe', 'soups_stews', 'lunch', 5, 18, 7, 'simmering', LOW, diasporaFor(LOW)),
  B('مقبلات السمك بهانزياتي', 'Hanseatic Fish Platter', 'Assiette de poisson hanseatique', 'Plato de pescado hanseatico', 'Hanseatische Fischplatte', 'fish_seafood', 'lunch', 14, 12, 10, 'grilling', LOW, diasporaFor(LOW)),
  B('شوربة العدس بهانزياتي', 'Hanseatic Lentil Cream Soup', 'Veloute de lentilles creme hanseatique', 'Crema de lentejas hanseatica', 'Hanseatische Cremelinsensuppe', 'soups_stews', 'lunch', 8, 22, 6, 'simmering', LOW, diasporaFor(LOW)),
  B('فطيرة التفاح والقرفة بهانزياتي', 'Hanseatic Cinnamon Apple Pie', 'Tourte pommes cannelle hanseatique', 'Tarta de manzana y canela hanseatica', 'Hanseatischer Apfel-Zimkuchen', 'rice_cakes_sweets', 'snack', 3, 30, 10, 'baking', LOW, diasporaFor(LOW)),
  B('قرص الفاصولياء بهانزياتي', 'Hanseatic Bean Plate', 'Assiette de haricots hanseatique', 'Plato de judias hanseatico', 'Hanseatische Bohnenplatte', 'vegetable_mains', 'dinner', 8, 24, 6, 'simmering', LOW, diasporaFor(LOW)),

  B('شوربة الفاصولياء بالشوابي', 'Swabian Bean Cream Soup', 'Veloute de haricots creme swabienne', 'Crema de judias suaba', 'Schwäbische Bohnencremesuppe', 'soups_stews', 'lunch', 7, 19, 6, 'simmering', BAD, diasporaFor(BAD)),
  B('برجر الفاصولياء بالشوابي', 'Swabian Bean Burger', 'Burger de haricots swabien', 'Hamburguesa de judias suaba', 'Schwäbischer Bohnenburger', 'vegetable_mains', 'lunch', 9, 20, 8, 'grilling', BAD, diasporaFor(BAD)),
  B('شوربة البطاطس بالشوابي', 'Swabian Potato Cream Soup', 'Veloute de pommes de terre a la creme swabienne', 'Crema de patata con nata suaba', 'Schwäbische Kartoffelcremesuppe', 'soups_stews', 'lunch', 5, 18, 7, 'simmering', BAD, diasporaFor(BAD)),
  B('مقبلات الجبن بالشوابي', 'Swabian Cheese Platter', 'Plateau de fromages swabien', 'Plato de quesos suabos', 'Schwäbische Käseplatte', 'street_snacks', 'snack', 12, 4, 19, 'assembling', BAD, diasporaFor(BAD)),
  B('فطيرة التفاح بالشوابي', 'Swabian Apple Pie', 'Tourte aux pommes swabienne', 'Tarta de manzana suaba', 'Schwäbischer Apfelkuchen', 'rice_cakes_sweets', 'snack', 3, 30, 10, 'baking', BAD, diasporaFor(BAD)),
  B('شوربة الجزر الكريمية بالشوابي', 'Swabian Carrot Cream Soup', 'Veloute de carottes creme swabienne', 'Crema de zanahoria con nata suaba', 'Schwäbische Karottencremesuppe', 'soups_stews', 'lunch', 3, 13, 6, 'simmering', BAD, diasporaFor(BAD)),
  B('قرص الفاصولياء بالشوابي', 'Swabian Bean Plate', 'Assiette de haricots swabienne', 'Plato de judias suabo', 'Schwäbische Bohnenplatte', 'vegetable_mains', 'dinner', 8, 24, 6, 'simmering', BAD, diasporaFor(BAD)),

  B('شوربة الفاصولياء بسارلاند', 'Saarland Bean Cream Soup', 'Veloute de haricots creme de Sarre', 'Crema de judias de Sarre', 'Saarländische Bohnencremesuppe', 'soups_stews', 'lunch', 7, 19, 6, 'simmering', SAA, diasporaFor(SAA)),
  B('برجر الفاصولياء بسارلاند', 'Saarland Bean Burger', 'Burger de haricots de Sarre', 'Hamburguesa de judias de Sarre', 'Saarländischer Bohnenburger', 'vegetable_mains', 'lunch', 9, 20, 8, 'grilling', SAA, diasporaFor(SAA)),
  B('شوربة البطاطس الكريمية بسارلاند', 'Saarland Potato Cream Soup', 'Veloute de pommes de terre creme de Sarre', 'Crema de patata con nata de Sarre', 'Saarländische Kartoffelcremesuppe', 'soups_stews', 'lunch', 5, 18, 7, 'simmering', SAA, diasporaFor(SAA)),
  B('مقبلات الجبن بسارلاند', 'Saarland Cheese Platter', 'Plateau de fromages sarrois', 'Tabla de quesos de Sarre', 'Saarländischer Käseteller', 'street_snacks', 'snack', 12, 4, 19, 'assembling', SAA, diasporaFor(SAA)),
  B('فطيرة تفاحة بسارلاند', 'Saarland Apple Tart', 'Tourte pommes de Sarre', 'Tarta de manzana sarra', 'Saarländischer Apfeltarte', 'rice_cakes_sweets', 'snack', 3, 30, 10, 'baking', SAA, diasporaFor(SAA)),
  B('شوربة الجزر بسارلاند', 'Saarland Carrot Cream Soup', 'Veloute de carottes creme de Sarre', 'Crema de zanahoria de Sarre', 'Saarländische Karottencremesuppe', 'soups_stews', 'lunch', 3, 13, 6, 'simmering', SAA, diasporaFor(SAA)),

  B('شوربة الفاصولياء بريميني', 'Bremen Bean Cream Soup', 'Veloute de haricots creme de Bremen', 'Crema de judias de Bremen', 'Bremer Bohnencremesuppe', 'soups_stews', 'lunch', 7, 19, 6, 'simmering', BRE, diasporaFor(BRE)),
  B('برجر الفاصولياء بريميني', 'Bremen Bean Burger', 'Burger de haricots de Bremen', 'Hamburguesa de judias de Bremen', 'Bremer Bohnenburger', 'vegetable_mains', 'lunch', 9, 20, 8, 'grilling', BRE, diasporaFor(BRE)),
  B('شوربة البطاطس بريميني', 'Bremen Potato Cream Soup', 'Veloute de pommes de terre a la creme de Bremen', 'Crema de patata con nata de Bremen', 'Bremer Kartoffelcremesuppe', 'soups_stews', 'lunch', 5, 18, 7, 'simmering', BRE, diasporaFor(BRE)),
  B('فطيرة السمك بريميني', 'Bremen Fish Pie', 'Tourte au poisson de Bremen', 'Tarta de pescado de Bremen', 'Bremer Fischkuchen', 'fish_seafood', 'snack', 11, 21, 11, 'baking', BRE, diasporaFor(BRE)),
  B('مقبلات السمك بريميني', 'Bremen Fish Platter', 'Assiette de poisson de Bremen', 'Plato de pescado de Bremen', 'Bremer Fischplatte', 'fish_seafood', 'lunch', 14, 12, 10, 'grilling', BRE, diasporaFor(BRE)),
  B('شوربة العدس بريميني', 'Bremen Lentil Cream Soup', 'Veloute de lentilles creme de Bremen', 'Crema de lentejas de Bremen', 'Bremer Cremelinsensuppe', 'soups_stews', 'lunch', 8, 22, 6, 'simmering', BRE, diasporaFor(BRE)),
  B('فطيرة التفاح بريميني', 'Bremen Apple Pie', 'Tourte aux pommes de Bremen', 'Tarta de manzana de Bremen', 'Bremer Apfelkuchen', 'rice_cakes_sweets', 'snack', 3, 30, 10, 'baking', BRE, diasporaFor(BRE)),
  B('قرص الفاصولياء بريميني', 'Bremen Bean Plate', 'Assiette de haricots de Bremen', 'Plato de judias de Bremen', 'Bremer Bohnenplatte', 'vegetable_mains', 'dinner', 8, 24, 6, 'simmering', BRE, diasporaFor(BRE)),
  B('شوربة البصل بريميني', 'Bremen Onion Soup', 'Veloute d oignon de Bremen', 'Crema de cebolla de Bremen', 'Bremer Zwiebelsuppe', 'soups_stews', 'lunch', 3, 13, 6, 'simmering', BRE, diasporaFor(BRE)),
  B('فطيرة الشوفان بسارلاند', 'Saarland Oatcake', 'Galette d avoine de Sarre', 'Galleta de avena de Sarre', 'Saarländischer Haferkuchen', 'rice_cakes_sweets', 'snack', 5, 28, 9, 'baking', SAA, diasporaFor(SAA)),
  B('كعك الزنجبيل بالبراندنبورغ', 'Brandenburg Gingerbread', 'Pain d epice de Brandebourg', 'Bizcocho de jengibre de Brandeburgo', 'Brandenburger Lebkuchen', 'rice_cakes_sweets', 'snack', 4, 29, 9, 'baking', BRA, diasporaFor(BRA)),
  B('مقبلات الجبن بالساكسون', 'Saxon Cheese Platter', 'Plateau de fromages de Saxe', 'Tabla de quesos de Sajonia', 'Sächsischer Käseteller', 'street_snacks', 'snack', 12, 4, 19, 'assembling', SAX, diasporaFor(SAX)),
];