import { B, diasporaFor } from '../austria-base-data/rows.mjs';

const P = 'pan_austrian';
const V = 'vienna';
const T = 'tyrol';
const S = 'salzburg';

export default [
  // ---- pan_austrian: national expansion (10) ----
  B('كرات الخبز الأبيض', 'Semmelknödel', 'Boules de pain blanc', 'Puchero de pan blanco', 'Semmelknödel', 'vegetable_mains', 'lunch', 7, 30, 7, 'boiling', P, diasporaFor(P)),
  B('كرات الخبز المطوية', 'Serviettenknödel', 'Knödli de serviette', 'Puchero de pan doblado', 'Serviettenknödel', 'soups_stews', 'lunch', 8, 22, 6, 'simmering', P, diasporaFor(P)),
  B('دجاج الفلفل الأحمر', 'Paprikahendl', 'Poulet au paprika', 'Pollo con paprika', 'Paprikahendl', 'poultry_mains', 'dinner', 19, 4, 12, 'braising', P, diasporaFor(P)),
  B('قهوة بالإسبريسو والحليب', 'Einspänner', 'Cafe Einspaenner', 'Cafe Einspaenner', 'Einspänner', 'beverages', 'breakfast', 2, 5, 3, 'brewing', P, diasporaFor(P)),
  B('تورته جوز الهند', 'Malakofftorte', 'Torte Malakoff', 'Torta Malakoff', 'Malakofftorte', 'rice_cakes_sweets', 'snack', 5, 36, 16, 'baking', P, diasporaFor(P)),
  B('تورته دوبو', 'Dobostorte', 'Torte Dobos', 'Torta Dobos', 'Dobostorte', 'rice_cakes_sweets', 'snack', 5, 42, 16, 'baking', P, diasporaFor(P)),
  B('لفافة الجوز', 'Nussstrudel', 'Strudel aux noix', 'Strudel de nuez', 'Nussstrudel', 'rice_cakes_sweets', 'snack', 5, 35, 12, 'baking', P, diasporaFor(P)),
  B('سلطة البطاطس الدافئة', 'Lauwarmer Erdäpfelsalat', 'Salade de pommes de terre tiedes', 'Ensalada de papa caliente', 'Lauwarmer Erdäpfelsalat', 'vegetable_mains', 'lunch', 3, 16, 7, 'boiling', P, diasporaFor(P)),
  B('شوربة الخبز واللحم', 'Fleischbrotsuppe', 'Soupe de pain de viande', 'Sopa de pan con carne', 'Fleischbrotsuppe', 'soups_stews', 'lunch', 7, 9, 4, 'simmering', P, diasporaFor(P)),
  B('كيكة الجبن', 'Käsekuchen', 'Gateau au fromage', 'Tarta de queso', 'Käsekuchen', 'rice_cakes_sweets', 'snack', 6, 26, 16, 'baking', P, diasporaFor(P)),

  // ---- vienna (10) ----
  B('قهوة ميلانجي', 'Melange', 'Cafe Melange', 'Cafe Melange', 'Melange', 'beverages', 'breakfast', 2, 5, 3, 'brewing', V, diasporaFor(V)),
  B('وجبة الخبز والجبن', 'Wiener Jause', 'Gouter viennois', 'Tentempie vienés', 'Wiener Jause', 'breakfast_items', 'breakfast', 9, 22, 8, 'assembling', V, diasporaFor(V)),
  B('ساندويتش الشنيتزل', 'Schnitzelsemmerl', 'Sandwich schnitzel', 'Bocadillo de schnitzel', 'Schnitzelsemmerl', 'street_snacks', 'snack', 16, 26, 11, 'frying', V, diasporaFor(V)),
  B('غولاش لحم العجل', 'Wiener Gulasch', 'Goulash de veau', 'Goulash de ternera', 'Wiener Gulasch', 'soups_stews', 'dinner', 16, 7, 12, 'braising', V, diasporaFor(V)),
  B('بيض في صلصة الطماطم', 'Wiener Ei', 'Oeuf a la sauce tomate', 'Huevo vienés', 'Wiener Ei', 'breakfast_items', 'breakfast', 12, 2, 9, 'frying', V, diasporaFor(V)),
  B('كعك الخميرة الدائري', 'Guglhupf', 'Guglhupf', 'Guglhupf', 'Guglhupf', 'breakfast_items', 'breakfast', 6, 38, 12, 'baking', V, diasporaFor(V)),
  B('كرات العجين المحلاة', 'Faschingskrapfen', 'Beignets de carnaval', 'Bunuelos de carnaval', 'Faschingskrapfen', 'rice_cakes_sweets', 'snack', 6, 34, 14, 'frying', V, diasporaFor(V)),
  B('لحم العجل المشوي بالخضار', 'Kalbsbraten mit Gemuese', 'Roti de veau aux légumes', 'Asado de ternera con verduras', 'Kalbsbraten mit Gemuese', 'meat_mains', 'dinner', 18, 8, 12, 'roasting', V, diasporaFor(V)),
  B('رغيف الخبز الصغير', 'Zacherl', 'Petite brioche viennoise', 'Panecillo dulce', 'Zacherl', 'breakfast_items', 'breakfast', 9, 44, 5, 'baking', V, diasporaFor(V)),
  B('لفافة الخشخاش', 'Mohnstrudel', 'Strudel au pavot', 'Strudel de amapola', 'Mohnstrudel', 'rice_cakes_sweets', 'snack', 5, 35, 12, 'baking', V, diasporaFor(V)),

  // ---- tyrol (10) ----
  B('طبق الجبن المبشور', 'Tiroler Gröstl', 'Grostl du Tyrol', 'Grostl tirolés', 'Tiroler Gröstl', 'breakfast_items', 'breakfast', 12, 26, 9, 'sauteing', T, diasporaFor(T)),
  B('كرات الجبن المضغوط', 'Kaspressknödel', 'Boules au fromage presse', 'Puchero de queso prensado', 'Kaspressknödel', 'vegetable_mains', 'dinner', 9, 31, 9, 'boiling', T, diasporaFor(T)),
  B('بيض مخفوق', 'Eierspeis', 'Oeufs brouilles', 'Huevos revueltos', 'Eierspeis', 'breakfast_items', 'breakfast', 11, 3, 10, 'sauteing', T, diasporaFor(T)),
  B('سمك التروت المدخن', 'Räucherforelle', 'Truite fumée', 'Trucha ahumada', 'Räucherforelle', 'fish_seafood', 'dinner', 20, 1, 6, 'grilling', T, diasporaFor(T)),
  B('لحم الضأن بالروزماري', 'Lammbraten mit Rosmarin', 'Agneau au romarin', 'Cordero al romero', 'Lammbraten mit Rosmarin', 'meat_mains', 'dinner', 19, 3, 13, 'roasting', T, diasporaFor(T)),
  B('جبن الجبال مع الحبوب', 'Bergkäse mit Körnern', 'Fromage de montagne aux graines', 'Queso de montaña con granos', 'Bergkäse mit Körnern', 'street_snacks', 'snack', 11, 21, 12, 'assembling', T, diasporaFor(T)),
  B('جبن الماعز الطازج', 'Frischer Ziegenkaese', 'Chevreau frais', 'Queso de cabra fresco', 'Frischer Ziegenkaese', 'street_snacks', 'snack', 12, 3, 17, 'assembling', T, diasporaFor(T)),
  B('شاي أعشاب الألب', 'Alpenkraeutertee', 'Tisane des Alpes', 'Infusión de hierbas alpinas', 'Alpenkraeutertee', 'beverages', 'snack', 0, 1, 0, 'brewing', T, diasporaFor(T)),
  B('عصير التوت الشجبي', 'Himbeersaft', 'Jus de framboises', 'Zumo de frambuesa', 'Himbeersaft', 'beverages', 'breakfast', 0, 10, 0, 'pressing', T, diasporaFor(T)),
  B('لفائف البقر بالخضار', 'Rinderrouladen mit Gemuese', 'Roulades de boeuf aux légumes', 'Rollitos de res con verduras', 'Rinderrouladen mit Gemuese', 'meat_mains', 'dinner', 19, 9, 12, 'braising', T, diasporaFor(T)),

  // ---- salzburg, first block (4) ----
  B('سمك الكارب المقلي', 'Gebratener Karpfen', 'Carpe frite', 'Carpa frita', 'Gebratener Karpfen', 'fish_seafood', 'dinner', 19, 3, 9, 'frying', S, diasporaFor(S)),
  B('سمك النهر بالخضار', 'Huchen mit Gemuese', 'Huchon aux légumes', 'Salmón con verduras', 'Huchen mit Gemuese', 'fish_seafood', 'dinner', 20, 4, 8, 'steaming', S, diasporaFor(S)),
  B('لفائف الملفوف', 'Kohlrouladen mit Kidneybohnen', 'Rouleaux de chou aux haricots rouges', 'Rollitos de col con alubias', 'Kohlrouladen mit Kidneybohnen', 'meat_mains', 'dinner', 13, 20, 8, 'simmering', S, diasporaFor(S)),
  B('الملفوف المخلل مع البطاطس', 'Sauerkraut mit Kartoffeln', 'Choucroute aux pommes de terre', 'Chucrut con patatas', 'Sauerkraut mit Kartoffeln', 'vegetable_mains', 'lunch', 3, 18, 9, 'simmering', S, diasporaFor(S)),
];