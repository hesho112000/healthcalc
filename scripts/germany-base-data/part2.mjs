import { B, diasporaFor } from './rows.mjs';

const BAV = 'bavaria';
const BER = 'berlin';
const HAM = 'hamburg';
const HES = 'hesse';
const RIN = 'rhineland';

export default [
  B('صحن المعجنات البافارية', 'Bavarian Dumpling Plate', 'Assiette de raviolis bavarois', 'Plato de ravioli bavaro', 'Bayerische Spätzleplatte', 'vegetable_mains', 'lunch', 8, 28, 8, 'simmering', BAV, diasporaFor(BAV)),
  B('شوربة الدجاج البافارية', 'Bavarian Chicken Soup', 'Soupe bavaroise au poulet', 'Sopa bavara de pollo', 'Bayerische Hühnersuppe', 'soups_stews', 'lunch', 10, 16, 5, 'simmering', BAV, diasporaFor(BAV)),

  B('قرص البطاطس البرليني', 'Berlin Potato Pancake', 'Galette de pommes de terre berlinoise', 'Panqueque de patata berlinesa', 'Berliner Kartoffelpuffer', 'breakfast_items', 'breakfast', 6, 24, 9, 'frying', BER, diasporaFor(BER)),
  B('لحم بقري مشوي برلين', 'Berlin Roast Beef', 'Roti de boeuf berlinois', 'Asado berlines de ternera', 'Berliner Rinderbraten', 'meat_mains', 'dinner', 20, 3, 13, 'roasting', BER, diasporaFor(BER)),
  B('كرات لحم برلين', 'Berlin Meatballs', 'Boulettes de viande berlinoises', 'Albondigas berlinesas', 'Berliner Frikadellen', 'meat_mains', 'dinner', 16, 6, 14, 'pan_frying', BER, diasporaFor(BER)),
  B('مخلل برلين', 'Berlin Pickles', 'Cornichons berlinois', 'Pepinillos berlineses', 'Berliner Essiggurken', 'condiments_sauces', 'snack', 1, 4, 0, 'pickling', BER, diasporaFor(BER)),
  B('شوربة لحم برلين', 'Berlin Meat Soup', 'Soupe de viande berlinoise', 'Sopa de carne berlinesa', 'Berliner Fleischsuppe', 'soups_stews', 'dinner', 13, 13, 8, 'stewing', BER, diasporaFor(BER)),
  B('كعك السمك البرليني', 'Berlin Fish Cake', 'Quiche au poisson berlinoise', 'Tarta de pescado berlinesa', 'Berliner Fischkuchen', 'fish_seafood', 'snack', 11, 20, 11, 'baking', BER, diasporaFor(BER)),
  B('شوربة الجزر المتبّلة للبرلين', 'Berlin Spiced Carrot Soup', 'Veloute de carottes aux epices', 'Crema de zanahoria especiada', 'Berliner Gewuerz-Karottensuppe', 'soups_stews', 'lunch', 3, 13, 4, 'simmering', BER, diasporaFor(BER)),
  B('فاصولياء برلين باللحم', 'Berlin Bean Stew', 'Ragoût de haricots berlinois', 'Guiso de judias berlines', 'Berliner Bohneneintopf', 'vegetable_mains', 'dinner', 12, 24, 8, 'stewing', BER, diasporaFor(BER)),
  B('برجر برلين بالخضار', 'Berlin Vegetable Burger', 'Burger berlinois aux legumes', 'Hamburguesa berlinesa de verduras', 'Berliner Gemüse-Burger', 'vegetable_mains', 'lunch', 9, 19, 10, 'grilling', BER, diasporaFor(BER)),
  B('صلصة السمك البرلينية', 'Berlin Fish Sauce', 'Sauce au poisson berlinoise', 'Sala de pescado berlinesa', 'Berliner Fischsauce', 'condiments_sauces', 'snack', 4, 8, 9, 'simmering', BER, diasporaFor(BER)),
  B('شوربة الفاصولياء بالبرلين', 'Berlin Bean Soup', 'Soupe de haricots berlinoise', 'Sopa de judias berlinesa', 'Berliner Bohnensuppe', 'soups_stews', 'lunch', 7, 18, 4, 'simmering', BER, diasporaFor(BER)),
  B('خبز البذور بالبرلين', 'Berlin Seeded Bread', 'Pain aux graines berlinois', 'Pan con semillas berlines', 'Berliner Saatbrot', 'breakfast_items', 'snack', 7, 26, 6, 'baking', BER, diasporaFor(BER)),
  B('فطيرة البطاطس البرلينية', 'Berlin Potato Pie', 'Tourte de pommes de terre berlinois', 'Tarta de patata berlinesa', 'Berliner Kartoffelauflauf', 'vegetable_mains', 'dinner', 5, 26, 10, 'baking', BER, diasporaFor(BER)),
  B('شوربة الكرنب بالحمص', 'Berlin Chickpea Cabbage Soup', 'Soupe de chou pois chiches', 'Sopa de col con garbanzos', 'Berliner Linsen-Krautsuppe', 'soups_stews', 'dinner', 8, 20, 4, 'simmering', BER, diasporaFor(BER)),

  B('سمك مدخن في هامبورغ', 'Hamburg Fish', 'Poisson fume de Hambourg', 'Pescado ahumado de Hamburgo', 'Hamburger Räucherfisch', 'fish_seafood', 'dinner', 15, 3, 10, 'grilling', HAM, diasporaFor(HAM)),
  B('برجر لحم هامبورغ', 'Hamburg Beef Patty', 'Boulette de boeuf de Hambourg', 'Hamburguesa deHamburgo', 'Hamburger Rindfleisch-Bratling', 'street_snacks', 'lunch', 15, 10, 12, 'grilling', HAM, diasporaFor(HAM)),
  B('شوربة الشوفان بهامبورغ', 'Hamburg Oatmeal Soup', 'Soupe de flocons d avoine', 'Sopa de avena de Hamburgo', 'Hamburger Hafergrütze', 'soups_stews', 'lunch', 5, 18, 4, 'simmering', HAM, diasporaFor(HAM)),
  B('فول هامبورغ', 'Hamburg Lentil Stew', 'Ragoût de lentilles de Hambourg', 'Guiso de lentejas de Hamburgo', 'Hamburger Linseneintopf', 'vegetable_mains', 'dinner', 9, 24, 5, 'stewing', HAM, diasporaFor(HAM)),
  B('بطاطس هامبورغ المقرمشة', 'Hamburg Crispy Potatoes', 'Pommes de terre croustillantes de Hambourg', 'Patatas crujientes de Hamburgo', 'Hamburger Knusperkartoffeln', 'vegetable_mains', 'lunch', 4, 26, 9, 'frying', HAM, diasporaFor(HAM)),
  B('شوربة البطاطس هامبورغ', 'Hamburg Potato Soup', 'Soupe de pommes de terre de Hambourg', 'Sopa de patata de Hamburgo', 'Hamburger Kartoffelsuppe', 'soups_stews', 'lunch', 5, 19, 6, 'simmering', HAM, diasporaFor(HAM)),
  B('سمك مشوي في هامبورغ', 'Hamburg Grilled Fish', 'Poisson grille de Hambourg', 'Pescado a la plancha de Hamburgo', 'Hamburger Grillfisch', 'fish_seafood', 'dinner', 17, 3, 11, 'grilling', HAM, diasporaFor(HAM)),
  B('بيض هامبورغ', 'Hamburg Egg Dish', 'Oeufs de Hambourg', 'Huevos de Hamburgo', 'Hamburger Eiergericht', 'breakfast_items', 'breakfast', 10, 6, 12, 'scrambling', HAM, diasporaFor(HAM)),
  B('صلصة الروبيان هامبورغ', 'Hamburg Prawn Sauce', 'Sauce aux crevettes de Hambourg', 'Salsa de camarones de Hamburgo', 'Hamburger Krabben-Sauce', 'condiments_sauces', 'snack', 5, 7, 10, 'simmering', HAM, diasporaFor(HAM)),
  B('مقبلات سمك هامبورغ', 'Hamburg Fish Tartare', 'Tartare de poisson de Hambourg', 'Tartar de pescado de Hamburgo', 'Hamburger Fischtartare', 'fish_seafood', 'lunch', 16, 3, 12, 'assembling', HAM, diasporaFor(HAM)),
  B('كعك البطاطس هامبورغ', 'Hamburg Potato Cake', 'Gâteau de pommes de terre de Hambourg', 'Bizcocho de patata de Hamburgo', 'Hamburger Kartoffelkuchen', 'breakfast_items', 'breakfast', 5, 26, 10, 'baking', HAM, diasporaFor(HAM)),
  B('حساء الخضار هامبورغ', 'Hamburg Vegetable Soup', 'Soupe de legumes de Hambourg', 'Sopa de verduras de Hamburgo', 'Hamburger Gemüsesuppe', 'soups_stews', 'lunch', 4, 15, 4, 'simmering', HAM, diasporaFor(HAM)),

  B('فول هايسي', 'Hesse Lentil Dish', 'Plat de lentilles de Hesse', 'Guiso de lentejas de Hesse', 'Hessische Linsen', 'vegetable_mains', 'dinner', 9, 23, 5, 'stewing', HES, diasporaFor(HES)),
  B('برجر هايسي', 'Hesse Burger', 'Burger de Hesse', 'Hamburguesa de Hesse', 'Hessischer Burger', 'street_snacks', 'lunch', 13, 12, 11, 'grilling', HES, diasporaFor(HES)),
  B('صحن البطاطس في هايسي', 'Hesse Potato Plate', 'Assiette de pommes de terre de Hesse', 'Plato de patata de Hesse', 'Hessische Kartoffelplatte', 'vegetable_mains', 'dinner', 4, 23, 8, 'roasting', HES, diasporaFor(HES)),
  B('شوربة الين في هايسي', 'Hesse Lentil Soup', 'Soupe de lentilles de Hesse', 'Sopa de lentejas de Hesse', 'Hessische Linsensuppe', 'soups_stews', 'lunch', 8, 22, 4, 'simmering', HES, diasporaFor(HES)),
  B('فطيرة الفاصولياء بهايسي', 'Hesse Bean Tart', 'Tarte aux haricots de Hesse', 'Tarta de judias de Hesse', 'Hessische Bohnentarte', 'vegetable_mains', 'snack', 7, 25, 9, 'baking', HES, diasporaFor(HES)),
  B('دجاج هايسي', 'Hesse Chicken', 'Poulet de Hesse', 'Pollo de Hesse', 'Hessisches Huhn', 'poultry_mains', 'dinner', 17, 3, 11, 'roasting', HES, diasporaFor(HES)),
  B('فطيرة التفاح في هايسي', 'Hesse Apple Pie', 'Tourte aux pommes de Hesse', 'Tarta de manzana de Hesse', 'Hessischer Apfelkuchen', 'rice_cakes_sweets', 'snack', 3, 30, 10, 'baking', HES, diasporaFor(HES)),
  B('شوربة الليمون في هايسي', 'Hesse Lemon Onion Soup', 'Soupe citron-oignon de Hesse', 'Sopa de limon y cebolla de Hesse', 'Hessische Zitronenzwiebelsuppe', 'soups_stews', 'lunch', 2, 12, 5, 'simmering', HES, diasporaFor(HES)),
  B('برجر الفطر في هايسي', 'Hesse Mushroom Burger', 'Burger aux champignons de Hesse', 'Hamburguesa de champinones de Hesse', 'Hessischer Pilzburger', 'vegetable_mains', 'lunch', 8, 18, 10, 'grilling', HES, diasporaFor(HES)),
  B('قرص الزنجبيل في هايسي', 'Hesse Ginger Cake', 'Gâteau au gingembre de Hesse', 'Bizcocho de jengibre de Hesse', 'Hessischer Ingwerkuchen', 'rice_cakes_sweets', 'snack', 4, 30, 11, 'baking', HES, diasporaFor(HES)),
  B('شوربة البصل في هايسي', 'Hesse Onion Soup', 'Soupe aux oignons de Hesse', 'Sopa de cebolla de Hesse', 'Hessische Zwiebelsuppe', 'soups_stews', 'lunch', 3, 13, 6, 'simmering', HES, diasporaFor(HES)),
  B('سلطة الروتين في هايسي', 'Hesse Beet Salad', 'Salade de betteraves de Hesse', 'Ensalada de.remolacha de Hesse', 'Hessische Rote-Bete-Salat', 'vegetable_mains', 'lunch', 3, 12, 7, 'tossing', HES, diasporaFor(HES)),

  B('فاصولياء بيضاء بالراين', 'Rhine White Beans', 'Haricots blancs de la vallee du Rhin', 'Judias blancas del valle del Rin', 'Rheintal-Weisse-Bohnen', 'vegetable_mains', 'dinner', 8, 22, 5, 'simmering', RIN, diasporaFor(RIN)),
];