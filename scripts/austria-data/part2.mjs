import { B, diasporaFor } from '../austria-base-data/rows.mjs';

const S = 'salzburg';
const ST = 'styria';
const C = 'carinthia';
const UA = 'upper_austria';

export default [
  // ---- salzburg, second block (6) ----
  B('فيليه البقر بالأعشاب', 'Rinderfilet mit Kraeutern', 'Filet de boeuf aux herbes', 'Filete de res con hierbas', 'Rinderfilet mit Kraeutern', 'meat_mains', 'dinner', 21, 3, 11, 'grilling', S, diasporaFor(S)),
  B('بطاطس مقلية بالبصل', 'Bratkartoffeln mit Zwiebeln', 'Pommes de terre de saute aux oignons', 'Patatas fritas con cebolla', 'Bratkartoffeln mit Zwiebeln', 'street_snacks', 'snack', 4, 25, 10, 'frying', S, diasporaFor(S)),
  B('معكرونة السبانخ', 'Nudeln mit Spinat', 'Nouilles aux épinards', 'Fideos con espinaca', 'Nudeln mit Spinat', 'noodle_dishes', 'dinner', 8, 31, 8, 'simmering', S, diasporaFor(S)),
  B('لفائف عجينة القرفة بالسكر', 'Zimtschnecken', 'Rouleaux a la cannelle sucre', 'Rollos de canela azucarados', 'Zimtschnecken', 'rice_cakes_sweets', 'snack', 6, 38, 14, 'baking', S, diasporaFor(S)),
  B('كيكة الخشخاش', 'Mohnkuchen', 'Gateau au pavot', 'Bizcocho de amapola', 'Mohnkuchen', 'rice_cakes_sweets', 'snack', 5, 34, 11, 'baking', S, diasporaFor(S)),
  B('خبز السكر', 'Zuckerbrot', 'Pain au sucre', 'Pan de azúcar', 'Zuckerbrot', 'breakfast_items', 'snack', 7, 36, 10, 'baking', S, diasporaFor(S)),

  // ---- styria (10) ----
  B('وجبة الخبز والجبن بزيت اليقطين', 'Steirische Jause', 'Gouter styrien', 'Tentempie estiria', 'Steirische Jause', 'breakfast_items', 'breakfast', 9, 23, 8, 'assembling', ST, diasporaFor(ST)),
  B('نودلز بذور اليقطين', 'Kürbiskernspätzle', 'Spaetzle aux graines de potiron', 'Espaetzle con semillas de calabaza', 'Kürbiskernspätzle', 'noodle_dishes', 'lunch', 10, 33, 11, 'simmering', ST, diasporaFor(ST)),
  B('شوربة البطاطس بالثوم البري', 'Bärlauch-Erdäpfelsuppe', 'Veloute de pomme de terre a l ail des ours', 'Crema de patata con ajo silvestre', 'Bärlauch-Erdäpfelsuppe', 'soups_stews', 'lunch', 3, 15, 5, 'simmering', ST, diasporaFor(ST)),
  B('زيت بذور اليقطين', 'Kürbiskernöl', 'Huile de graines de potiron', 'Aceite de semillas de calabaza', 'Kürbiskernöl', 'condiments_sauces', 'snack', 0, 0, 20, 'pressing', ST, diasporaFor(ST)),
  B('سمك الزندر المشوي بالخضار', 'Gebratener Zander mit Gemuese', 'Sole panee aux légumes', 'Lubina empanada con verduras', 'Gebratener Zander mit Gemuese', 'fish_seafood', 'dinner', 19, 6, 8, 'frying', ST, diasporaFor(ST)),
  B('نودلز اليقطين المطبوخة على البخار', 'Kürbisdampfnudel', 'Nouille vapeur au potiron', 'Fideos de calabaza al vapor', 'Kürbisdampfnudel', 'noodle_dishes', 'dinner', 7, 34, 8, 'steaming', ST, diasporaFor(ST)),
  B('الملفوف الأحمر بزيت بذور اليقطين', 'Rotkohl mit Kürbiskernöl', 'Chou rouge a l huile de potiron', 'Col lombarda con aceite de calabaza', 'Rotkohl mit Kürbiskernöl', 'vegetable_mains', 'lunch', 2, 14, 9, 'simmering', ST, diasporaFor(ST)),
  B('عصير العنب', 'Traubensaft', 'Jus de raisin', 'Zumo de uva', 'Traubensaft', 'beverages', 'breakfast', 0, 12, 0, 'pressing', ST, diasporaFor(ST)),
  B('عصير اليقطين', 'Kürbissaft', 'Jus de potiron', 'Zumo de calabaza', 'Kürbissaft', 'beverages', 'breakfast', 0, 7, 0, 'pressing', ST, diasporaFor(ST)),
  B('كيكة العسل', 'Bienenstark', 'Gateau au miel', 'Bizcocho de miel', 'Bienenstark', 'rice_cakes_sweets', 'snack', 5, 42, 9, 'baking', ST, diasporaFor(ST)),

  // ---- carinthia (10) ----
  B('لفافة تفاح ممدودة', 'Apfelstrukli', 'Strudel de pomme étiré', 'Strudel de manzana estirado', 'Apfelstrukli', 'rice_cakes_sweets', 'snack', 4, 33, 11, 'baking', C, diasporaFor(C)),
  B('سمك السايبلينغ المقلي', 'Gebratener Saibling', 'Omble chevalier sauté', 'Salvelino salteado', 'Gebratener Saibling', 'fish_seafood', 'dinner', 20, 2, 8, 'frying', C, diasporaFor(C)),
  B('دجاج مبشور بالخضار', 'Geschnetzeltes Huhn mit Gemuese', 'Poulet effiloche aux légumes', 'Pollo deshebrado con verduras', 'Geschnetzeltes Huhn mit Gemuese', 'poultry_mains', 'dinner', 20, 5, 10, 'sauteing', C, diasporaFor(C)),
  B('الفطر المطهو بالخضار', 'Geschmorte Schwammerl mit Gemuese', 'Chanterelles braisées aux légumes', 'Setas guisadas con verduras', 'Geschmorte Schwammerl mit Gemuese', 'vegetable_mains', 'dinner', 4, 10, 7, 'sauteing', C, diasporaFor(C)),
  B('شاي الزنجبيل', 'Ingwertee', 'Tisane de gingembre', 'Infusión de jengibre', 'Ingwertee', 'beverages', 'snack', 0, 1, 0, 'brewing', C, diasporaFor(C)),
  B('عصير البرقوق الشوكي', 'Schlehensaft', 'Jus de prunelles', 'Zumo de endrinas', 'Schlehensaft', 'beverages', 'breakfast', 0, 9, 0, 'pressing', C, diasporaFor(C)),
  B('شوربة ناي الكارينثي', 'Kärntner Najsuppe', 'Naisoupe de Carinthe', 'Sopa Nai de Carintia', 'Kärntner Najsuppe', 'soups_stews', 'lunch', 7, 16, 6, 'simmering', C, diasporaFor(C)),
  B('صدر العجل المطهو', 'Geschmorte Kalbsbrust', 'Poitrine de veau braisée', 'Pechuga de ternera guisada', 'Geschmorte Kalbsbrust', 'meat_mains', 'dinner', 19, 4, 11, 'braising', C, diasporaFor(C)),
  B('تورته جبن القشمة', 'Topfentorte', 'Torte au fromage blanc', 'Tarta de queso fresco', 'Topfentorte', 'rice_cakes_sweets', 'snack', 6, 28, 14, 'baking', C, diasporaFor(C)),
  B('خل الأعشاب', 'Kräuteressig', 'Vinaigre aux herbes', 'Vinagre de hierbas', 'Kräuteressig', 'condiments_sauces', 'snack', 0, 1, 0, 'simmering', C, diasporaFor(C)),

  // ---- upper_austria, first block (7) ----
  B('معجنات محشوة مسلوقة', 'Schlupfkrapfen', 'Raviolis farcis', 'Ravioles rellenos', 'Schlupfkrapfen', 'noodle_dishes', 'lunch', 6, 20, 7, 'boiling', UA, diasporaFor(UA)),
  B('شراب الإجاص', 'Birnenmost', 'Mout de poire', 'Mosto de pera', 'Birnenmost', 'beverages', 'snack', 0, 12, 0, 'pressing', UA, diasporaFor(UA)),
  B('بسكويت لينز المحشو', 'Linzer Augen', 'Lunettes de Linz', 'Galletas Linzer', 'Linzer Augen', 'rice_cakes_sweets', 'snack', 5, 57, 15, 'baking', UA, diasporaFor(UA)),
  B('ريسوتو الفطر', 'Pilzrisotto', 'Risotto aux champignons', 'Risotto de setas', 'Pilzrisotto', 'rice_dishes', 'dinner', 6, 30, 9, 'simmering', UA, diasporaFor(UA)),
  B('أومليت بالجبن', 'Omelette mit Käse', 'Omelette au fromage', 'Omelette con queso', 'Omelette mit Käse', 'breakfast_items', 'breakfast', 13, 3, 16, 'frying', UA, diasporaFor(UA)),
  B('اللبن الرائب', 'Buttermilch', 'Lait fermenté', 'Leche fermentada', 'Buttermilch', 'beverages', 'breakfast', 3, 5, 1, 'assembling', UA, diasporaFor(UA)),
  B('سمك البرش المقلي بالخضار', 'Gebratener Barsch mit Gemuese', 'Perche poêlée aux légumes', 'Percha a la plancha con verduras', 'Gebratener Barsch mit Gemuese', 'fish_seafood', 'dinner', 19, 5, 8, 'frying', UA, diasporaFor(UA)),
];
