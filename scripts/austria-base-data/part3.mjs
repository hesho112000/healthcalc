import { B, diasporaFor } from './rows.mjs';

const UA = 'upper_austria';
const LA = 'lower_austria';
const BGL = 'burgenland';
const VLB = 'vorarlberg';

export default [
  // ---- upper_austria, second half (6) ----
  B('شوربة البطاطس بالقشدة', 'Kartoffelsuppe mit Sahnemilch', 'Veloute de pomme de terre a la creme', 'Crema de patata con nata', 'Kartoffelsuppe mit Sahnemilch', 'soups_stews', 'lunch', 3, 14, 6, 'simmering', UA, diasporaFor(UA)),
  B('دجاج بالزبدة والخل', 'Huehner in Butter', 'Poulet au beurre et au vinaigre', 'Pollo en mantequilla y vinagre', 'Huehner in Butter', 'poultry_mains', 'dinner', 18, 2, 13, 'braising', UA, diasporaFor(UA)),
  B('كرتوفل كنودل بالخضار', 'Kartoffelknödel mit Gemuese', 'Boules de pomme de terre aux legumes', 'Knodel de papa con verduras', 'Kartoffelknödel mit Gemuese', 'vegetable_mains', 'dinner', 6, 30, 8, 'boiling', UA, diasporaFor(UA)),
  B('جبن مدخن على الخبز', 'Raeucherkaese auf Brot', 'Fromage fume sur pain', 'Queso ahumado con pan', 'Raeucherkaese auf Brot', 'street_snacks', 'snack', 10, 18, 14, 'grilling', UA, diasporaFor(UA)),
  B('نودلز بالخضار', 'Nudeln mit Gemuese', 'Nouilles aux legumes', 'Fideos con verduras', 'Nudeln mit Gemuese', 'noodle_dishes', 'dinner', 8, 32, 9, 'simmering', UA, diasporaFor(UA)),
  B('كيكة بالليمون', 'Zitronenkuchen', 'Gateau citron', 'Bizcocho de limon', 'Zitronenkuchen', 'rice_cakes_sweets', 'snack', 4, 38, 13, 'baking', UA, diasporaFor(UA)),

  // ---- lower_austria (9) ----
  B('بصل أحمر مشوي بالزعتر', 'Rote Zwiebeln mit Thymian', 'Oignons rouges au thym', 'Cebollas rojas con tomillo', 'Rote Zwiebeln mit Thymian', 'vegetable_mains', 'dinner', 2, 12, 6, 'roasting', LA, diasporaFor(LA)),
  B('عدس مع الخضار', 'Linsen mit Gemuese', 'Lentilles aux legumes', 'Lentejas con verduras', 'Linsen mit Gemuese', 'soups_stews', 'dinner', 9, 20, 4, 'simmering', LA, diasporaFor(LA)),
  B('بطاطس مقرمشة بالقشدة الحامضة', 'Kartoffelkeile mit Sauerrahm', 'Pommes de terre a la creme fraiche', 'Patatas en gajos con nata agria', 'Kartoffelkeile mit Sauerrahm', 'street_snacks', 'snack', 5, 26, 10, 'frying', LA, diasporaFor(LA)),
  B('بيض مخبوز مع البصل والبطاطس', 'Gebackenes Ei mit Zwiebeln', 'Oeuf au four avec oignons et pommes de terre', 'Huevo al horno con cebolla y patata', 'Gebackenes Ei mit Zwiebeln', 'breakfast_items', 'lunch', 8, 8, 8, 'baking', LA, diasporaFor(LA)),
  B('فطر سوتيه بالثوم', 'Gebratene Pilze mit Knoblauch', 'Champignons sautes a l ail', 'Champinones salteados con ajo', 'Gebratene Pilze mit Knoblauch', 'vegetable_mains', 'dinner', 4, 5, 10, 'sauteing', LA, diasporaFor(LA)),
  B('شوربة الجزر بالقشدة', 'Karottensuppe mit Sahnemilch', 'Veloute de carottes a la creme', 'Crema de zanahoria con nata', 'Karottensuppe mit Sahnemilch', 'soups_stews', 'lunch', 3, 13, 7, 'simmering', LA, diasporaFor(LA)),
  B('سلطة الطماطم بالجبن', 'Tomatensalat mit Käse', 'Salade de tomates au fromage', 'Ensalada de tomate con queso', 'Tomatensalat mit Käse', 'vegetable_mains', 'lunch', 5, 6, 9, 'tossing', LA, diasporaFor(LA)),
  B('خضار مشوية على الفحم', 'Gemuese vom Rost', 'Legumes grillees', 'Verduras a la plancha', 'Gemuese vom Rost', 'vegetable_mains', 'dinner', 4, 9, 7, 'grilling', LA, diasporaFor(LA)),
  B('برغل بالخضار', 'Bulgur mit Gemuese', 'Boulgur aux legumes', 'Bulgur con verduras', 'Bulgur mit Gemuese', 'rice_dishes', 'dinner', 6, 26, 4, 'simmering', LA, diasporaFor(LA)),

  // ---- burgenland: apricots, paprika, must (9) ----
  B('مشمش مجفف', 'Getrocknete Marillen', 'Abricots secs', 'Albaricoques secos', 'Getrocknete Marillen', 'fruit', 'snack', 3, 32, 1, 'drying', BGL, diasporaFor(BGL)),
  B('عصير المشمش', 'Marillensaft', 'Jus d abricot', 'Zumo de albaricoque', 'Marillensaft', 'beverages', 'breakfast', 1, 13, 0, 'pressing', BGL, diasporaFor(BGL)),
  B('كيكة المشمش', 'Marillenkuchen', 'Gateau a l abricot', 'Bizcocho de albaricoque', 'Marillenkuchen', 'rice_cakes_sweets', 'snack', 4, 32, 10, 'baking', BGL, diasporaFor(BGL)),
  B('مربى المشمش', 'Marillenmarmelade', 'Confiture d abricot', 'Mermelada de albaricoque', 'Marillenmarmelade', 'condiments_sauces', 'snack', 1, 34, 0, 'simmering', BGL, diasporaFor(BGL)),
  B('بهارات البابريكا الحلوة', 'Suesz Paprika', 'Paprika doux', 'Paprika dulce', 'Suesz Paprika', 'condiments_sauces', 'snack', 1, 4, 2, 'drying', BGL, diasporaFor(BGL)),
  B('شراب التفاح غير المسكر', 'Apfelmost', 'Mout de pomme non sucre', 'Mosto de manzana sin azucar', 'Apfelmost', 'beverages', 'snack', 0, 12, 0, 'pressing', BGL, diasporaFor(BGL)),
  B('لحم بقر مشوي بالخضار', 'Rostbraten mit Gemuese', 'Rostebeef aux legumes', 'Filete de res con verduras', 'Rostbraten mit Gemuese', 'meat_mains', 'dinner', 20, 7, 13, 'grilling', BGL, diasporaFor(BGL)),
  B('خضار مطهوة بالبخار', 'Gekochtes Gemuese', 'Legumes cuits a la vapeur', 'Verduras cocidas al vapor', 'Gekochtes Gemuese', 'vegetable_mains', 'lunch', 3, 11, 3, 'steaming', BGL, diasporaFor(BGL)),
  B('لحم الضأن المشوي', 'Gebratenes Lamm', 'Agneau roti', 'Cordero asado', 'Gebratenes Lamm', 'meat_mains', 'dinner', 19, 3, 13, 'roasting', BGL, diasporaFor(BGL)),

  // ---- vorarlberg (9) ----
  B('قرص البطاطس المحمص', 'Roestipfanne', 'Galette de pommes de terre roties', 'Galuela de patata asada', 'Roestipfanne', 'street_snacks', 'snack', 5, 24, 10, 'frying', VLB, diasporaFor(VLB)),
  B('سجق البقر المشوي', 'Rinderbratwurst', 'Saucisse de boeuf grillée', 'Salchicha de res a la plancha', 'Rinderbratwurst', 'meat_mains', 'dinner', 16, 4, 15, 'grilling', VLB, diasporaFor(VLB)),
  B('خبز رقيق بالسمن', 'Flaedle', 'Pain plat au beurre', 'Pan plano con mantequilla', 'Flaedle', 'breakfast_items', 'breakfast', 7, 30, 10, 'baking', VLB, diasporaFor(VLB)),
  B('سبانخ بالجبن', 'Spinat mit Käse', 'Epinards au fromage', 'Espinacas con queso', 'Spinat mit Käse', 'vegetable_mains', 'lunch', 9, 7, 10, 'simmering', VLB, diasporaFor(VLB)),
  B('كرات لحم البقر في المرق', 'Rinderklosschen in Sosse', 'Boulettes de boeuf en sauce', 'Albondigas de res en salsa', 'Rinderklosschen in Sosse', 'meat_mains', 'dinner', 18, 9, 12, 'braising', VLB, diasporaFor(VLB)),
  B('منقوع الأعشاب الجبلية', 'Kraeutertee', 'Tisane de montagne', 'Infusion de hierbas de montana', 'Kraeutertee', 'beverages', 'snack', 0, 1, 0, 'brewing', VLB, diasporaFor(VLB)),
  B('شرائح فواكه مجففة', 'Trockenobst', 'Fruits secs', 'Fruta seca', 'Trockenobst', 'fruit', 'snack', 2, 26, 1, 'drying', VLB, diasporaFor(VLB)),
  B('جبنة غمس', 'Kaesefondue', 'Fondue au fromage', 'Fondue de queso', 'Kaesefondue', 'street_snacks', 'snack', 9, 8, 15, 'simmering', VLB, diasporaFor(VLB)),
  B('شوربة خضار الجبال', 'Gebirgsgemuese-Suppe', 'Soupe de legumes de montagne', 'Sopa de verduras de montana', 'Gebirgsgemuese-Suppe', 'soups_stews', 'lunch', 4, 12, 5, 'simmering', VLB, diasporaFor(VLB)),
];