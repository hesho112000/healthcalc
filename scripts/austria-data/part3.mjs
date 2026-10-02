import { B, diasporaFor } from '../austria-base-data/rows.mjs';

const UA = 'upper_austria';
const LA = 'lower_austria';
const BGL = 'burgenland';
const VLB = 'vorarlberg';

export default [
  // ---- upper_austria, second block (3) ----
  B('سبانخ مع البطاطس', 'Spinat mit Kartoffeln', 'Epinards aux pommes de terre', 'Espinacas con patatas', 'Spinat mit Kartoffeln', 'vegetable_mains', 'lunch', 5, 20, 6, 'simmering', UA, diasporaFor(UA)),
  B('شاي النعناع', 'Pfefferminztee', 'Tisane a la menthe poivree', 'Infusion de menta', 'Pfefferminztee', 'beverages', 'snack', 0, 1, 0, 'brewing', UA, diasporaFor(UA)),
  B('عجائن مخمرة مطهوة على البخار', 'Dampfnudeln', 'Pates levees cuites a la vapeur', 'Bollos de masa al vapor', 'Dampfnudeln', 'rice_cakes_sweets', 'snack', 7, 36, 5, 'steaming', UA, diasporaFor(UA)),

  // ---- lower_austria (10) ----
  B('عصير العنب الطازج', 'Traubenmost', 'Mout de raisin', 'Mosto de uva', 'Traubenmost', 'beverages', 'snack', 0, 12, 0, 'pressing', LA, diasporaFor(LA)),
  B('لحم البقر المشوي مع الملفوف الأحمر', 'Rinderbraten mit Rotkohl', 'Roti de boeuf au chou rouge', 'Asado de res con col lombarda', 'Rinderbraten mit Rotkohl', 'meat_mains', 'dinner', 19, 10, 12, 'roasting', LA, diasporaFor(LA)),
  B('كرات العجين بعصير العنب', 'Mostknödel', 'Knodel au mout de raisin', 'Bolas de masa con mosto', 'Mostknödel', 'soups_stews', 'lunch', 6, 28, 7, 'boiling', LA, diasporaFor(LA)),
  B('خبز الثوم', 'Knoblauchbrot', 'Pain a l ail', 'Pan de ajo', 'Knoblauchbrot', 'street_snacks', 'snack', 7, 30, 9, 'baking', LA, diasporaFor(LA)),
  B('شوربة الشمندر', 'Rote-Rüben-Suppe', 'Veloute de betterave', 'Crema de remolacha', 'Rote-Rüben-Suppe', 'soups_stews', 'lunch', 3, 13, 4, 'simmering', LA, diasporaFor(LA)),
  B('زيت دوار الشمس', 'Sonnenblumenöl', 'Huile de tournesol', 'Aceite de girasol', 'Sonnenblumenöl', 'condiments_sauces', 'snack', 0, 0, 20, 'pressing', LA, diasporaFor(LA)),
  B('بيض مخفوق بالثوم المعمر', 'Rührei mit Schnittlauch', 'Oeufs brouilles a la ciboulette', 'Huevos revueltos con cebollino', 'Rührei mit Schnittlauch', 'breakfast_items', 'breakfast', 11, 2, 11, 'sauteing', LA, diasporaFor(LA)),
  B('خضار الفاصوليا', 'Fasolengemüse', 'Haricots mijotes', 'Judias guisadas', 'Fasolengemüse', 'vegetable_mains', 'lunch', 4, 11, 3, 'simmering', LA, diasporaFor(LA)),
  B('سمك السلور المقلي', 'Gebratener Wels', 'Poisson-chat frit', 'Siluro frito', 'Gebratener Wels', 'fish_seafood', 'dinner', 18, 3, 9, 'frying', LA, diasporaFor(LA)),
  B('خل العنب', 'Mostessig', 'Vinaigre de mout', 'Vinagre de mosto', 'Mostessig', 'condiments_sauces', 'snack', 0, 1, 0, 'simmering', LA, diasporaFor(LA)),

  // ---- burgenland (10) ----
  B('معكرونة الملفوف', 'Krautnudeln', 'Nouilles au chou', 'Fideos con col', 'Krautnudeln', 'noodle_dishes', 'dinner', 7, 33, 8, 'simmering', BGL, diasporaFor(BGL)),
  B('يخنة البقر بالفلفل الأحمر', 'Rindfleisch-Paprikagulasch', 'Goulash de boeuf au paprika', 'Goulash de res con paprika', 'Rindfleisch-Paprikagulasch', 'soups_stews', 'dinner', 17, 8, 12, 'braising', BGL, diasporaFor(BGL)),
  B('سلطة الفلفل الحلو', 'Paprikasalat', 'Salade de poivrons', 'Ensalada de pimiento', 'Paprikasalat', 'street_snacks', 'snack', 2, 8, 7, 'tossing', BGL, diasporaFor(BGL)),
  B('فلفل مقلي بالبصل', 'Gebratene Paprika mit Zwiebeln', 'Poivrons sautes aux oignons', 'Pimientos salteados con cebolla', 'Gebratene Paprika mit Zwiebeln', 'vegetable_mains', 'lunch', 2, 12, 9, 'sauteing', BGL, diasporaFor(BGL)),
  B('خبز القمح الكامل', 'Vollkornbrot', 'Pain complet', 'Pan integral', 'Vollkornbrot', 'breakfast_items', 'breakfast', 11, 44, 5, 'baking', BGL, diasporaFor(BGL)),
  B('فلفل حار', 'Paprika scharf', 'Paprika fort', 'Piment fort', 'Paprika scharf', 'condiments_sauces', 'snack', 2, 5, 3, 'drying', BGL, diasporaFor(BGL)),
  B('عصير البرقوق الأصفر', 'Mirabellensaft', 'Jus de mirabelle', 'Zumo de mirabel', 'Mirabellensaft', 'beverages', 'breakfast', 0, 12, 0, 'pressing', BGL, diasporaFor(BGL)),
  B('عنب المائدة', 'Tafeltrauben', 'Raisins de table', 'Uvas de mesa', 'Tafeltrauben', 'fruit', 'snack', 1, 17, 0, 'assembling', BGL, diasporaFor(BGL)),
  B('مشمش طازج', 'Frische Marillen', 'Abricots frais', 'Albaricoques frescos', 'Frische Marillen', 'fruit', 'snack', 1, 10, 0, 'assembling', BGL, diasporaFor(BGL)),
  B('شوربة الفلفل الحلو', 'Paprikasuppe', 'Soupe de poivrons', 'Crema de pimiento', 'Paprikasuppe', 'soups_stews', 'lunch', 3, 12, 5, 'simmering', BGL, diasporaFor(BGL)),

  // ---- vorarlberg (10) ----
  B('شوربة الشعير', 'Vorarlberger Gerstensuppe', 'Soupe d orge du Vorarlberg', 'Sopa de cebada de Vorarlberg', 'Vorarlberger Gerstensuppe', 'soups_stews', 'lunch', 4, 18, 5, 'simmering', VLB, diasporaFor(VLB)),
  B('مخلل الخيار', 'Eingelegte Gurken', 'Cornichons au vinaigre', 'Pepinillos en vinagre', 'Eingelegte Gurken', 'street_snacks', 'snack', 1, 6, 1, 'assembling', VLB, diasporaFor(VLB)),
  B('جبن الغنم الطازج', 'Frischer Schafkäse', 'Fromage de brebis frais', 'Queso de oveja fresco', 'Frischer Schafkäse', 'street_snacks', 'snack', 13, 3, 17, 'assembling', VLB, diasporaFor(VLB)),
  B('سمك الكراكي المقلي', 'Gebratener Hecht', 'Brochet frit', 'Lucio frito', 'Gebratener Hecht', 'fish_seafood', 'dinner', 18, 2, 7, 'frying', VLB, diasporaFor(VLB)),
  B('شاي البابونج', 'Kamillentee', 'Tisane de camomille', 'Infusion de manzanilla', 'Kamillentee', 'beverages', 'snack', 0, 1, 0, 'brewing', VLB, diasporaFor(VLB)),
  B('خبز الحبوب', 'Körnerbrot', 'Pain aux graines', 'Pan de semillas', 'Körnerbrot', 'breakfast_items', 'breakfast', 10, 38, 7, 'baking', VLB, diasporaFor(VLB)),
  B('خضار الملفوف السافوي', 'Wirsinggemüse', 'Chou de Milan mijote', 'Col de Milan guisada', 'Wirsinggemüse', 'vegetable_mains', 'lunch', 3, 10, 4, 'simmering', VLB, diasporaFor(VLB)),
  B('هليون مشوي', 'Gebratener Spargel', 'Asperges sautees', 'Esparragos salteados', 'Gebratener Spargel', 'vegetable_mains', 'lunch', 3, 8, 6, 'sauteing', VLB, diasporaFor(VLB)),
  B('خبز بعصير العنب', 'Mostbrot', 'Pain au mout', 'Pan de mosto', 'Mostbrot', 'breakfast_items', 'snack', 8, 42, 6, 'baking', VLB, diasporaFor(VLB)),
  B('مربى ثمار الورد البري', 'Hagebuttenmarmelade', 'Confiture d eglantine', 'Mermelada de escaramujo', 'Hagebuttenmarmelade', 'condiments_sauces', 'snack', 1, 45, 0, 'simmering', VLB, diasporaFor(VLB)),
];
