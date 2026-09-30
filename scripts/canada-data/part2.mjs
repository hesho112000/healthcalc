import { B, diasporaFor } from '../canada-base-data/rows.mjs';

const R = 'pan_canadian';
const Q = 'quebec';
const O = 'ontario';
const BC = 'british_columbia';
const P = 'prairies';
const A = 'atlantic_canada';
const N = 'northern_canada';
const I = 'indigenous_canada';

export default [
  B('كريب القيقب كندي', 'Maple Crepes', 'Crêpes à l\'érable', 'Crepes de arce', 'Ahorn-Crepes', 'breakfast_items', 'breakfast', 5, 48, 9, 'frying', Q, diasporaFor(Q)),
  B('وافل القيقب كندي', 'Maple Syrup Waffles', 'Gaufres au sirop d\'érable', 'Waffles con sirope de arce', 'Ahornsirup-Waffeln', 'breakfast_items', 'breakfast', 5, 50, 10, 'grilling', Q, diasporaFor(Q)),
  B('كعك مونتريال بالجبن كندي', 'Montreal Bagel with Cheese', 'Bagel au fromage de Montréal', 'Bagel con queso de Montreal', 'Montreal-Bagel mit Käse', 'breakfast_items', 'breakfast', 11, 46, 5, 'baking', Q, diasporaFor(Q)),
  B('سكون كندي', 'Canadian Scones', 'Scones canadiens', 'Scones canadienses', 'Kanadische Scones', 'breakfast_items', 'breakfast', 4, 50, 14, 'baking', R, diasporaFor(R)),
  B('كويش كندي', 'Canadian Quiche', 'Quiche canadienne', 'Quiche canadiense', 'Kanadische Quiche', 'breakfast_items', 'breakfast', 10, 6, 14, 'baking', R, diasporaFor(R)),
  B('هوت ديش البراري كندي', 'Prairie Hotdish', 'Hotdish des prairies', 'Hotdish de las praderas', 'Prairie-Hotdish', 'rice_dishes', 'dinner', 12, 20, 12, 'baking', P, diasporaFor(P)),
  B('شوربة الأرز البري كندي', 'Wild Rice Porridge', 'Porridge au riz sauvage', 'Porridge de arroz silvestre', 'Wildreis-Porridge', 'rice_dishes', 'breakfast', 3, 24, 2, 'boiling', I, diasporaFor(I)),
  B('ماكاروني بالجبن كندي', 'Canadian Mac and Cheese', 'Macaroni au fromage canadien', 'Macarrones con queso canadiense', 'Kanadische Mac and Cheese', 'noodle_dishes', 'dinner', 11, 26, 12, 'baking', R, diasporaFor(R)),
  B('سباغيتي بولونيز كندي', 'Canadian Spaghetti Bolognese', 'Spaghetti bolognaise canadien', 'Espaguetis boloneses canadienses', 'Kanadische Spaghetti Bolognese', 'noodle_dishes', 'dinner', 12, 30, 8, 'boiling', R, diasporaFor(R)),
  B('لازانيا كندي', 'Canadian Lasagna', 'Lasagne canadienne', 'Lasaña canadiense', 'Kanadische Lasagne', 'noodle_dishes', 'dinner', 13, 24, 12, 'baking', R, diasporaFor(R)),
  B('حساء البصل كندي', 'Canadian Onion Soup', 'Soupe à l\'oignon canadienne', 'Sopa de cebolla canadiense', 'Kanadische Zwiebelsuppe', 'soups_stews', 'lunch', 2, 14, 6, 'boiling', Q, diasporaFor(Q)),
  B('يخنة لحم الأونتاريو كندي', 'Ontario Beef Stew', 'Ragoût de bœuf de l\'Ontario', 'Estofado de res de Ontario', 'Ontario-Rindfleisch-Eintopf', 'soups_stews', 'dinner', 14, 10, 12, 'stewing', O, diasporaFor(O)),
  B('حساء الذرة كندي', 'Canadian Corn Chowder', 'Chaudrée de maïs canadienne', 'Crema de maíz canadiense', 'Kanadische Mais-Chowder', 'soups_stews', 'lunch', 3, 14, 6, 'boiling', R, diasporaFor(R)),
  B('تشيلي اللحم البقري كندي', 'Canadian Beef Chili', 'Chili de bœuf canadien', 'Chili de res canadiense', 'Kanadischer Rindfleisch-Chili', 'soups_stews', 'dinner', 15, 14, 10, 'stewing', R, diasporaFor(R)),
  B('سمك القد والفاصوليا كندي', 'Newfoundland Cod and Beans', 'Morue et haricots de Terre-Neuve', 'Bacalao y frijoles de Terranova', 'Neufundland-Kabeljau mit Bohnen', 'soups_stews', 'dinner', 16, 12, 5, 'stewing', A, diasporaFor(A)),
  B('فطيرة الديك الرومي كندي', 'Canadian Turkey Tourtière', 'Tourtière à la dinde canadienne', 'Tourtière de pavo canadiense', 'Kanadische Puten-Tourtière', 'poultry_mains', 'dinner', 14, 22, 14, 'baking', Q, diasporaFor(Q)),
  B('دجاج مشوي بالقيقب كندي', 'Maple Roast Chicken', 'Poulet rôti au sirop d\'érable', 'Pollo asado con arce', 'Ahorn-Gebratenes Hähnchen', 'poultry_mains', 'dinner', 20, 6, 12, 'roasting', Q, diasporaFor(Q)),
  B('دجاج كاري كندي', 'Canadian Chicken Curry', 'Curry de poulet canadien', 'Curry de pollo canadiense', 'Kanadisches Hähnchencurry', 'poultry_mains', 'dinner', 18, 12, 10, 'stewing', R, diasporaFor(R)),
  B('دجاج بارميزان كندي', 'Canadian Chicken Parmesan', 'Poulet parmesan canadien', 'Pollo parmesano canadiense', 'Kanadisches Hähnchen-Parmesan', 'poultry_mains', 'dinner', 18, 10, 14, 'baking', R, diasporaFor(R)),
  B('ميت لوف كندي', 'Canadian Meatloaf', 'Pain de viande canadien', 'Pastel de carne canadiense', 'Kanadischer Hackbraten', 'meat_mains', 'dinner', 16, 8, 14, 'baking', R, diasporaFor(R)),
  B('ويلينغتون اللحم كندي', 'Canadian Beef Wellington', 'Beef wellington canadien', 'Beef Wellington canadiense', 'Kanadisches Beef Wellington', 'meat_mains', 'dinner', 20, 15, 16, 'baking', R, diasporaFor(R)),
  B('سلاوبي جوز كندي', 'Canadian Sloppy Joes', 'Sloppy Joes canadiens', 'Sloppy Joes canadienses', 'Kanadische Sloppy Joes', 'meat_mains', 'lunch', 14, 18, 12, 'grilling', R, diasporaFor(R)),
  B('لحم بقري مشوي كندي', 'Canadian Pulled Beef', 'Bœuf effiloché canadien', 'Res deshilachada canadiense', 'Kanadisches Rindfleisch-Pulled', 'meat_mains', 'lunch', 20, 5, 8, 'roasting', R, diasporaFor(R)),
  B('شوت لحم الضأن كندي', 'Canadian Mutton Chop', 'Côte d\'agneau canadienne', 'Chuleta de cordero canadiense', 'Kanadische Lammkotelette', 'meat_mains', 'dinner', 20, 0, 16, 'grilling', O, diasporaFor(O)),
  B('رنة مشوية كندي', 'Roasted Reindeer', 'Caribou rôti canadien', 'Caribú asado canadiense', 'Gebratenes Karibu', 'meat_mains', 'dinner', 22, 0, 5, 'roasting', N, diasporaFor(N)),
  B('لوبستر نوفا سكوشا كندي', 'Nova Scotia Lobster', 'Homard de la Nouvelle-Écosse', 'Langosta de Nueva Escocia', 'Nova-Scotia-Hummer', 'fish_seafood', 'dinner', 18, 1, 1, 'boiling', A, diasporaFor(A)),
  B('موسير ماريتايم كندي', 'Maritime Scallops', 'Coquilles Saint-Jacques maritimes', 'Vieiras marítimas', 'Maritime Jakobsmuscheln', 'fish_seafood', 'dinner', 15, 3, 2, 'steaming', A, diasporaFor(A)),
  B('سمك وبطاطس مقلية كندي', 'Canadian Fish and Chips', 'Poisson et frites canadiens', 'Pescado y papas canadienses', 'Kanadische Fish and Chips', 'fish_seafood', 'lunch', 13, 25, 10, 'frying', A, diasporaFor(A)),
  B('سمك تروت القطب كندي', 'Arctic Char', 'Truite arctique canadienne', 'Trucha ártica canadiense', 'Kanadische Arktische Forelle', 'fish_seafood', 'dinner', 18, 0, 5, 'grilling', N, diasporaFor(N)),
  B('تروت ستيل هيد بي سي كندي', 'BC Steelhead Trout', 'Truite steelhead de la C.-B.', 'Trucha steelhead de BC', 'BC-Steelhead-Forelle', 'fish_seafood', 'dinner', 19, 0, 8, 'grilling', BC, diasporaFor(BC)),
  B('سمك هاليبوت باسيفيك كندي', 'Pacific Halibut', 'Flétan du Pacifique canadien', 'Bacalao del Pacífico canadiense', 'Kanadischer Pazifischer Seeteufel', 'fish_seafood', 'dinner', 18, 0, 5, 'grilling', BC, diasporaFor(BC)),
  B('سمك بيرش البراري كندي', 'Prairie Perch', 'Perche des prairies canadien', 'Perca de las praderas canadiense', 'Prairie-Barsch', 'fish_seafood', 'lunch', 17, 0, 4, 'frying', P, diasporaFor(P)),
  B('بطاطس بي إي آي كندي', 'PEI Potatoes', 'Pommes de terre de l\'Î.-P.-É.', 'Papas de PEI', 'PEI-Kartoffeln', 'vegetable_mains', 'dinner', 2, 15, 0, 'boiling', A, diasporaFor(A)),
  B('أخوات الثلاث كندي', 'Three Sisters Stew', 'Ragoût des trois sœurs', 'Estofado de las tres hermanas', 'Kanadischer Drei-Schwestern-Eintopf', 'vegetable_mains', 'dinner', 4, 20, 3, 'stewing', I, diasporaFor(I)),
  B('خضار ستير فراي كندي', 'Canadian Veggie Stir Fry', 'Sauté de légumes canadien', 'Salteado de verduras canadiense', 'Kanadisches Gemüsesauté', 'vegetable_mains', 'dinner', 4, 18, 6, 'stir_frying', R, diasporaFor(R)),
  B('برجر الفاصوليا كندي', 'Canadian Bean Burger', 'Burger aux haricots canadien', 'Hamburguesa de frijol canadiense', 'Kanadische Bohnen-Burger', 'vegetable_mains', 'lunch', 8, 30, 8, 'grilling', R, diasporaFor(R)),
  B('توت هاكلبري بي سي كندي', 'BC Huckleberries', 'Mûres sauvages de la C.-B.', 'Arándanos silvestres de BC', 'BC-Heidelbeeren', 'fruit', 'snack', 1, 16, 0, 'raw', BC, diasporaFor(BC)),
  B('توت السحابة كندي', 'Canadian Cloudberries', 'Lingues canadiennes', 'Bayas de nube canadienses', 'Kanadische Waldbeeren', 'fruit', 'snack', 0, 8, 2, 'raw', N, diasporaFor(N)),
  B('توت العناب كندي', 'Canadian Gooseberries', 'Groseilles canadiennes', 'Uvas pasas canadienses', 'Kanadische Stachelbeeren', 'fruit', 'snack', 1, 10, 0, 'raw', A, diasporaFor(A)),
  B('فطيرة القيقب كندي', 'Canadian Maple Pie', 'Tarte à l\'érable canadienne', 'Tarta de arce canadiense', 'Kanadischer Ahornkuchen', 'rice_cakes_sweets', 'snack', 3, 45, 12, 'baking', Q, diasporaFor(Q)),
  B('كريب التفاح الأونتاريو كندي', 'Ontario Apple Crisp', 'Crisp aux pommes de l\'Ontario', 'Crisp de manzana de Ontario', 'Ontario-Apfelkuchen', 'rice_cakes_sweets', 'snack', 2, 42, 12, 'baking', O, diasporaFor(O)),
  B('فطيرة توت ساسكاتون كندي', 'Saskatoon Berry Pie', 'Tarte aux amélanches canadienne', 'Tarta de bayas de Saskatoon canadiense', 'Kanadischer Saskatoon-Kuchen', 'rice_cakes_sweets', 'snack', 3, 40, 12, 'baking', P, diasporaFor(P)),
  B('صلصة القيقب كندي', 'Canadian Maple Glaze', 'Glace au sirop d\'érable canadienne', 'Glaseado de arce canadiense', 'Kanadische Ahornglasur', 'condiments_sauces', 'snack', 0, 70, 1, 'reduction', R, diasporaFor(R)),
  B('مربى التوت البري كندي', 'Canadian Cranberry Relish', 'Relish aux canneberges canadien', 'Chutney de arándanos canadiense', 'Kanadische Preiselbeeren-Relish', 'condiments_sauces', 'dinner', 0, 40, 0, 'boiling', R, diasporaFor(R)),
  B('عسل الأزهار البرية كندي', 'Canadian Wildflower Honey', 'Miel de fleurs sauvages canadien', 'Miel de flores silvestres canadiense', 'Kanadischer Wildblütenhonig', 'condiments_sauces', 'breakfast', 0, 82, 0, 'collection', R, diasporaFor(R)),
  B('شوكولاتة ساخنة كندي', 'Canadian Hot Chocolate', 'Chocolat chaud canadien', 'Chocolate caliente canadiense', 'Kanadischer Kakao', 'beverages', 'snack', 4, 22, 8, 'brewing', R, diasporaFor(R)),
  B('ليمونادة كندي', 'Canadian Lemonade', 'Limonade canadienne', 'Limónada canadiense', 'Kanadische Limonade', 'beverages', 'snack', 0, 12, 0, 'mixing', R, diasporaFor(R)),
  B('بينيغ كيبك كندي', 'Quebec Beignet', 'Beignet de Québec', 'Beignet de Quebec', 'Quebec-Beignet', 'street_snacks', 'snack', 4, 48, 16, 'frying', Q, diasporaFor(Q)),
  B('كورن دوج كندي', 'Canadian Corn Dogs', 'Corn-dogs canadiens', 'Perros calientes canadienses', 'Kanadische Corn-Dogs', 'street_snacks', 'snack', 8, 28, 14, 'frying', R, diasporaFor(R)),
  B('راب الدجاج كندي', 'Canadian Chicken Wrap', 'Wrap de poulet canadien', 'Wrap de pollo canadiense', 'Kanadisches Hähnchen-Wrap', 'street_snacks', 'lunch', 14, 30, 8, 'grilling', R, diasporaFor(R)),
];