import { B, diasporaFor } from './rows.mjs';

const P = 'pan_austrian';
const V = 'vienna';
const T = 'tyrol';

export default [
  // ---- pan_austrian: the national canon (19) ----
  B('شنيتزل لحم العجل', 'Wiener Schnitzel', 'Escalope de veau viennoise', 'Escalope de ternera a la vienesa', 'Wiener Schnitzel', 'meat_mains', 'dinner', 17, 8, 14, 'frying', P, diasporaFor(P)),
  B('قطع لحم البقر المطبوخة على الطاولة', 'Tafelspitz', 'Boeuf bouilli a la table', 'Bife de mesa hervido', 'Tafelspitz', 'meat_mains', 'dinner', 19, 6, 12, 'boiling', P, diasporaFor(P)),
  B('غولاش اللحم البقر', 'Gulasch', 'Goulash de boeuf', 'Goulash de res', 'Gulasch', 'soups_stews', 'dinner', 16, 7, 13, 'braising', P, diasporaFor(P)),
  B('معكرونة الجبن', 'Käsespätzle', 'Spaetzle au fromage', 'Espaetzle con queso', 'Käsespaetzle', 'noodle_dishes', 'lunch', 11, 32, 14, 'simmering', P, diasporaFor(P)),
  B('لفافة التفاح', 'Apfelstrudel', 'Strudel aux pommes', 'Strudel de manzana', 'Apfelstrudel', 'rice_cakes_sweets', 'snack', 5, 38, 12, 'baking', P, diasporaFor(P)),
  B('لفافة جبن القشمة', 'Topfenstrudel', 'Strudel au fromage blanc', 'Strudel de queso fresco', 'Topfenstrudel', 'rice_cakes_sweets', 'snack', 7, 34, 13, 'baking', P, diasporaFor(P)),
  B('كيكة الإمبراطور المفرومة', 'Kaiserschmarrn', 'Kaiserschmarrn', 'Kaiserschmarrn', 'Kaiserschmarrn', 'breakfast_items', 'breakfast', 9, 38, 12, 'frying', P, diasporaFor(P)),
  B('كرتوفل كنودل', 'Kartoffelknödel', 'Croquettes de pomme de terre', 'Knodel de papa', 'Kartoffelknödel', 'vegetable_mains', 'lunch', 7, 32, 9, 'boiling', P, diasporaFor(P)),
  B('كنودل القمح الأسمر', 'Germknödel', 'Boules de blé complet', 'Puchero de trigo integral', 'Germknödel', 'rice_cakes_sweets', 'snack', 6, 34, 7, 'boiling', P, diasporaFor(P)),
  B('كنودل المشمش', 'Marillenknödel', 'Boules a l abricot', 'Puchero de albaricoque', 'Marillenknödel', 'rice_cakes_sweets', 'snack', 6, 36, 8, 'boiling', P, diasporaFor(P)),
  B('تورته شوكولا', 'Sachertorte', 'Gateau Sacher', 'Pastel Sacher', 'Sachertorte', 'rice_cakes_sweets', 'snack', 6, 44, 15, 'baking', P, diasporaFor(P)),
  B('تورته لينزر بالفستق', 'Linzer Torte', 'Torte de Linz', 'Torta de Linz', 'Linzer Torte', 'rice_cakes_sweets', 'snack', 5, 46, 14, 'baking', P, diasporaFor(P)),
  B('نودل الخشخاش', 'Mohnnudeln', 'Nilles au pavot', 'Fideos de amapola', 'Mohnnudeln', 'rice_cakes_sweets', 'snack', 7, 36, 11, 'boiling', P, diasporaFor(P)),
  B('مخبوزات الخبز الحلوة', 'Buchteln', 'Brioches sucrees', 'Bollos dulces', 'Buchteln', 'breakfast_items', 'snack', 8, 40, 12, 'baking', P, diasporaFor(P)),
  B('فطائر رقيقة', 'Palatschinken', 'Crepes autrichiennes', 'Crepes austriacas', 'Palatschinken', 'breakfast_items', 'breakfast', 7, 32, 9, 'frying', P, diasporaFor(P)),
  B('أقواس الفانيليا', 'Vanillekipferl', 'Biscuits a la vanille', 'Galletas de vainilla', 'Vanillekipferl', 'rice_cakes_sweets', 'snack', 5, 38, 15, 'baking', P, diasporaFor(P)),
  B('برقوق مشوية بالقرفة', 'Zwetschkenroester', 'Prunes roties a la cannelle', 'Ciruelas asadas con canela', 'Zwetschkenroester', 'fruit', 'snack', 1, 24, 0, 'roasting', P, diasporaFor(P)),
  B('حساء الفلاح', 'Bauernsuppe', 'Soupe paysanne', 'Sopa campesina', 'Bauernsuppe', 'soups_stews', 'lunch', 6, 16, 4, 'simmering', P, diasporaFor(P)),
  B('عصير التفاح', 'Apfelsaft', 'Jus de pomme', 'Zumo de manzana', 'Apfelsaft', 'beverages', 'breakfast', 0, 11, 0, 'pressing', P, diasporaFor(P)),

  // ---- vienna (9) ----
  B('لحم بقر مشوي مع بطاطس مهروسة', 'Rindbraten mit Kartoffelpueree', 'Boeuf roti avec puree de pommes de terre', 'Carne de res asada con puré de papa', 'Rindbraten mit Kartoffelpueree', 'meat_mains', 'dinner', 18, 12, 13, 'roasting', V, diasporaFor(V)),
  B('شرائح لحم البقر مع البصل والمعكرونة', 'Zwiebelrostbraten mit Spatzle', 'Rostebeef a l oignon avec spaetzle', 'Filete de res con cebolla y espaetzle', 'Zwiebelrostbraten mit Spatzle', 'meat_mains', 'dinner', 19, 22, 12, 'grilling', V, diasporaFor(V)),
  B('مرق لحم العجل بالخضار', 'Kalbsgulasch', 'Ragout de veau', 'Guiso de ternera', 'Kalbsgulasch', 'soups_stews', 'dinner', 15, 8, 11, 'braising', V, diasporaFor(V)),
  B('فخذ دجاج مخبوز بالثوم والزعتر', 'Backhendl mit Knoblauch', 'Poulet roti a l ail et au thym', 'Muslo de pollo al horno con ajo y tomillo', 'Backhendl mit Knoblauch', 'poultry_mains', 'dinner', 20, 3, 12, 'roasting', V, diasporaFor(V)),
  B('قهوة بالحليب الرغوية', 'Milchkaffee', 'Cafe au lait', 'Cafe con leche', 'Milchkaffee', 'beverages', 'breakfast', 2, 6, 3, 'brewing', V, diasporaFor(V)),
  B('مثلثات الجوز المحلاة', 'Nusskipfel', 'Triangles aux noix', 'Triangulos de nuez', 'Nusskipfel', 'rice_cakes_sweets', 'snack', 6, 32, 16, 'baking', V, diasporaFor(V)),
  B('تورته بكريمة اللوز', 'Esterhazy Torte', 'Torte Esterhazy', 'Torta Esterhazy', 'Esterhazy Torte', 'rice_cakes_sweets', 'snack', 5, 40, 18, 'baking', V, diasporaFor(V)),
  B('بطاطس مخبوزة بالثوم والزعتر', 'Knoblauchrohkartoffeln', 'Pommes de terre a l ail', 'Patatas al ajo y tomillo', 'Knoblauchrohkartoffeln', 'street_snacks', 'snack', 4, 22, 9, 'roasting', V, diasporaFor(V)),
  B('شريحة لحم البقر مع الخردل', 'Rindersteak mit Meerrettich', 'Entrecote de boeuf au raifort', 'Filete de res con rábano picante', 'Rindersteak mit Meerrettich', 'meat_mains', 'dinner', 21, 3, 14, 'grilling', V, diasporaFor(V)),

  // ---- tyrol, first half (6) ----
  B('شوربة سمك التروت', 'Forellensuppe', 'Soupe de truite', 'Sopa de trucha', 'Forellensuppe', 'soups_stews', 'lunch', 9, 10, 5, 'simmering', T, diasporaFor(T)),
  B('نودلز إصبع الطهي', 'Schlipfnudeln', 'Spaetzles doigts', 'Fideos de dedo', 'Schlipfnudeln', 'noodle_dishes', 'lunch', 6, 34, 7, 'boiling', T, diasporaFor(T)),
  B('كروكيت الجبن المقلي', 'Kaesekroketten', 'Croquettes au fromage', 'Croquetas de queso', 'Kaesekroketten', 'street_snacks', 'snack', 8, 22, 12, 'frying', T, diasporaFor(T)),
  B('سبانخ مع البيض', 'Spinat mit Ei', 'Epinards a l oeuf', 'Espinacas con huevo', 'Spinat mit Ei', 'vegetable_mains', 'lunch', 8, 6, 8, 'simmering', T, diasporaFor(T)),
  B('بولينتا بالجبن', 'Polenta mit Käse', 'Polenta au fromage', 'Polenta con queso', 'Polenta mit Käse', 'vegetable_mains', 'dinner', 7, 28, 10, 'simmering', T, diasporaFor(T)),
  B('خبز جبن الألب', 'Almkäsebrot', 'Pain au fromage d alpage', 'Pan con queso de alta montana', 'Almkäsebrot', 'street_snacks', 'snack', 9, 20, 13, 'assembling', T, diasporaFor(T)),
];