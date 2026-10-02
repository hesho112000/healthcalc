import { B, diasporaFor } from './rows.mjs';

const T = 'tyrol';
const S = 'salzburg';
const ST = 'styria';
const C = 'carinthia';
const UA = 'upper_austria';

export default [
  // ---- tyrol, second half (3) ----
  B('كبة جبن الألب', 'Käseknödel', 'Boules au fromage', 'Puchero de queso de alta montana', 'Käseknödel', 'vegetable_mains', 'dinner', 9, 30, 9, 'boiling', T, diasporaFor(T)),
  B('فطيرة التفاح المحمّرة', 'Apfelkiachl', 'Beignets a la pomme', 'Frituras de manzana', 'Apfelkiachl', 'rice_cakes_sweets', 'snack', 4, 30, 11, 'frying', T, diasporaFor(T)),
  B('سمك التروت المشوي بالليمون', 'Forelle mit Zitrone', 'Truite grillee au citron', 'Trucha a la plancha con limon', 'Forelle mit Zitrone', 'fish_seafood', 'dinner', 20, 2, 8, 'grilling', T, diasporaFor(T)),

  // ---- salzburg (9) ----
  B('نوكرل البطاطس', 'Salzburger Nockerl', 'Nockerl de pomme de terre', 'Nockerl de papa', 'Salzburger Nockerl', 'vegetable_mains', 'dinner', 7, 33, 8, 'boiling', S, diasporaFor(S)),
  B('طبق لحم الفلاح', 'Bauernschmaus', 'Assiette fermiere', 'Plato campesino', 'Bauernschmaus', 'meat_mains', 'dinner', 17, 10, 14, 'roasting', S, diasporaFor(S)),
  B('كرة موتسارت بالشوكولا واللوز', 'Mozartkugel', 'Boule Mozart', 'Bola Mozart', 'Mozartkugel', 'rice_cakes_sweets', 'snack', 7, 38, 20, 'baking', S, diasporaFor(S)),
  B('الخبز والجبن والفجل', 'Salzburger Jause', 'Pain au fromage et radis', 'Pan con queso y rabanito', 'Salzburger Jause', 'breakfast_items', 'breakfast', 8, 18, 9, 'assembling', S, diasporaFor(S)),
  B('خبز الجبن الذائب', 'Kaesebrot', 'Pain au fromage fondu', 'Pan con queso fundido', 'Kaesebrot', 'breakfast_items', 'breakfast', 9, 20, 11, 'assembling', S, diasporaFor(S)),
  B('شوربة الخضار بالكريمة', 'Gemuesecremesuppe', 'Veloute de legumes a la creme', 'Crema de verduras', 'Gemuesecremesuppe', 'soups_stews', 'lunch', 3, 11, 6, 'simmering', S, diasporaFor(S)),
  B('بطاطس مقرمشة بالزعتر', 'Knusprige Kartoffeln', 'Pommes de terre croustillantes', 'Patatas crujientes con romero', 'Knusprige Kartoffeln', 'vegetable_mains', 'lunch', 4, 24, 10, 'roasting', S, diasporaFor(S)),
  B('زبادي بالحليب مع الفواكه', 'Joghurt mit Obst', 'Yaourt aux fruits', 'Yogur con frutas', 'Joghurt mit Obst', 'fruit', 'snack', 4, 14, 3, 'assembling', S, diasporaFor(S)),
  B('كعك بالزبدة المحلاة', 'Schleifen', 'Petits beurre sucre', 'Galletas de mantequilla', 'Schleifen', 'rice_cakes_sweets', 'snack', 6, 40, 17, 'baking', S, diasporaFor(S)),

  // ---- styria (9) ----
  B('قرص اليقطين', 'Kuerbiskuchen', 'Galette de potiron', 'Bunuelo de calabaza', 'Kuerbiskuchen', 'breakfast_items', 'breakfast', 5, 30, 10, 'frying', ST, diasporaFor(ST)),
  B('شوربة اليقطين بالقشدة', 'Kuerbissuppe mit Sahnemilch', 'Veloute de potiron a la creme', 'Crema de calabaza con nata', 'Kuerbissuppe mit Sahnemilch', 'soups_stews', 'lunch', 3, 13, 6, 'simmering', ST, diasporaFor(ST)),
  B('قليتات اليقطين', 'Kuerbisfrikadelle', 'Beignets de potiron', 'Frituras de calabaza', 'Kuerbisfrikadelle', 'street_snacks', 'snack', 4, 26, 11, 'frying', ST, diasporaFor(ST)),
  B('خل التفاح', 'Apfelessig', 'Vinaigre de pomme', 'Vinagre de manzana', 'Apfelessig', 'condiments_sauces', 'snack', 0, 1, 0, 'simmering', ST, diasporaFor(ST)),
  B('صلصة بزيت بذور اليقطين', 'Kuerbiskernoel-Dressing', 'Vinaigrette a l huile de graines', 'Alino con aceite de semillas', 'Kuerbiskernoel-Dressing', 'condiments_sauces', 'snack', 1, 2, 12, 'tossing', ST, diasporaFor(ST)),
  B('كبة السبانخ', 'Spinatknödel', 'Boules d epinards', 'Puchero de espinaca', 'Spinatknödel', 'vegetable_mains', 'dinner', 8, 26, 9, 'boiling', ST, diasporaFor(ST)),
  B('خبز التفاح بالقرفة', 'Apfelbrot mit Zimt', 'Pain aux pommes a la cannelle', 'Pan de manzana con canela', 'Apfelbrot mit Zimt', 'breakfast_items', 'breakfast', 4, 34, 8, 'baking', ST, diasporaFor(ST)),
  B('ريسوتو اليقطين', 'Kuerbisrisotto', 'Risotto au potiron', 'Risotto de calabaza', 'Kuerbisrisotto', 'rice_dishes', 'dinner', 6, 32, 10, 'simmering', ST, diasporaFor(ST)),
  B('لحم البقر مع خضار الجبال', 'Rindfleisch mit Gebirgsgemuese', 'Boeuf aux legumes de montagne', 'Res con verduras de montana', 'Rindfleisch mit Gebirgsgemuese', 'meat_mains', 'dinner', 18, 8, 12, 'braising', ST, diasporaFor(ST)),

  // ---- carinthia (9) ----
  B('كبة الجبن المحلاة', 'Kaerntner Kasnudeln', 'Kasnudeln au fromage', 'Kasnudeln con queso', 'Kaerntner Kasnudeln', 'noodle_dishes', 'lunch', 11, 30, 12, 'boiling', C, diasporaFor(C)),
  B('مرق اللحم الجبلي', 'Gebirgsrindsuppe', 'Bouillon de boeuf de montagne', 'Caldo de res de montana', 'Gebirgsrindsuppe', 'soups_stews', 'lunch', 9, 7, 4, 'simmering', C, diasporaFor(C)),
  B('بطاطس بطبقة الجبن', 'Kaesegratin', 'Gratin de pommes de terre au fromage', 'Patatas gratinadas con queso', 'Kaesegratin', 'vegetable_mains', 'lunch', 7, 25, 13, 'baking', C, diasporaFor(C)),
  B('دجاج بالكاري', 'Huehnercurry', 'Curry de poulet', 'Curry de pollo', 'Huehnercurry', 'poultry_mains', 'dinner', 15, 14, 10, 'simmering', C, diasporaFor(C)),
  B('لحم البقر بالأعشاب', 'Kraeuterfleisch', 'Boeuf aux herbes', 'Res con hierbas', 'Kraeuterfleisch', 'meat_mains', 'dinner', 19, 4, 11, 'braising', C, diasporaFor(C)),
  B('شوربة البصل بالجبن', 'Zwiebelsuppe mit Käse', 'Soupe a l oignon au fromage', 'Sopa de cebolla con queso', 'Zwiebelsuppe mit Käse', 'soups_stews', 'lunch', 5, 12, 8, 'simmering', C, diasporaFor(C)),
  B('سلطة البازلاء والأعشاب', 'Erbsensalat mit Kraeutern', 'Salade de petits pois aux herbes', 'Ensalada de guisantes con hierbas', 'Erbsensalat mit Kraeutern', 'vegetable_mains', 'lunch', 5, 10, 4, 'tossing', C, diasporaFor(C)),
  B('لفائف عجينة القرفة', 'Schnecken', 'Rouleaux a la cannelle', 'Rollos de canela', 'Schnecken', 'rice_cakes_sweets', 'snack', 6, 38, 14, 'baking', C, diasporaFor(C)),
  B('خضار سوتيه بالثوم', 'Gemuese-Soete mit Knoblauch', 'Legumes sautes a l ail', 'Verduras salteadas con ajo', 'Gemuese-Soete mit Knoblauch', 'vegetable_mains', 'dinner', 3, 10, 8, 'sauteing', C, diasporaFor(C)),

  // ---- upper_austria, first half (3) ----
  B('معجنات الجبن المخبوزة', 'Kaeseflaschen', 'Petits pains au fromage', 'Panecillos de queso', 'Kaeseflaschen', 'noodle_dishes', 'lunch', 10, 30, 13, 'baking', UA, diasporaFor(UA)),
  B('فيليه المرواريا بالليمون', 'Felchen mit Zitrone', 'Omble chevalier au citron', 'Omblio al limon', 'Felchen mit Zitrone', 'fish_seafood', 'dinner', 19, 2, 7, 'grilling', UA, diasporaFor(UA)),
  B('كعك الجوز', 'Nusskuchen', 'Gateau aux noix', 'Bizcocho de nuez', 'Nusskuchen', 'rice_cakes_sweets', 'snack', 6, 36, 16, 'baking', UA, diasporaFor(UA)),
];