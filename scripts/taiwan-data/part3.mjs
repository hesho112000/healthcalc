import { B, T } from './rows.mjs';

export default [
  // poultry_mains (10)
  B(`دجاج مبخر بالتوابل ${T}`, 'Steamed spiced chicken', 'Poulet vapeur epice', 'Pollo al vapor especiado', 'Gedaempftes Gewuerzthuhn', 'poultry_mains', 'dinner', 22, 7, 14, 'steamed', 'tainan'),
  B(`دجاج مقلي بالحلو ${T}`, 'Sweet fried chicken', 'Poulet frit sucre', 'Pollo frito dulce', 'Suess gebratenes Huhn', 'poultry_mains', 'dinner', 21, 13, 14, 'fried', 'kaohsiung'),
  B(`دجاج مقلي بالثوم ${T}`, 'Garlic fried chicken', 'Poulet frit a l ail', 'Pollo frito con ajo', 'Knoblauchgebratenes Huhn', 'poultry_mains', 'dinner', 22, 10, 14, 'fried', 'taipei'),
  B(`شرائح دجاج بالبهارات ${T}`, 'Sliced spiced chicken', 'Tranches de poulet aux epices', 'Lomo de pollo especiado', 'Gewuerzte Haehnchenscheiben', 'poultry_mains', 'lunch', 22, 6, 13, 'stir-fried', 'chiayi'),
  B(`دجاج مبخر بالفطر ${T}`, 'Steamed chicken with mushrooms', 'Poulet vapeur aux champignons', 'Pollo al vapor con setas', 'Dampfhuhn mit Pilzen', 'poultry_mains', 'dinner', 22, 8, 13, 'steamed', 'nantou'),
  B(`أسياخ دجاج مشوية ${T}`, 'Grilled chicken skewers', 'Brochettes de poulet grillees', 'Pinchos de pollo a la parrilla', 'Gegrillte Haehnchenspiesse', 'poultry_mains', 'dinner', 20, 8, 13, 'grilled', 'tainan'),
  B(`دجاج مقرمش بالعسل ${T}`, 'Honey crispy chicken', 'Poulet croustillant au miel', 'Pollo crujiente con miel', 'Knuspriges Honighuhn', 'poultry_mains', 'dinner', 21, 14, 13, 'fried', 'taipei'),
  B(`دجاج المطعم الحار ${T}`, 'Restaurant spicy chicken', 'Poulet epice de restaurant', 'Pollo picante de restaurante', 'Scharfes Restaurant-Haehnchen', 'poultry_mains', 'dinner', 21, 9, 14, 'stir-fried', 'kaohsiung'),
  B(`أسياخ دجاج مقدّمة ${T}`, 'Signature chicken skewers', 'Brochettes de poulet signature', 'Pinchos de pollo estrella', 'Signatur-Haehnchenspiesse', 'poultry_mains', 'dinner', 20, 8, 13, 'grilled', 'taichung'),
  B(`دجاج مع الفلفل الحلو ${T}`, 'Chicken with sweet pepper', 'Poulet au poivron doux', 'Pollo con pimiento dulce', 'Haehnchen mit suessem Paprika', 'poultry_mains', 'dinner', 22, 9, 13, 'stir-fried', 'tainan'),

  // meat_mains (14)
  B(`لحم البقر المقلي بالثوم ${T}`, 'Garlic fried beef', 'Boeuf frit a l ail', 'Ternera frita con ajo', 'Gebratenes Rindfleisch mit Knoblauch', 'meat_mains', 'dinner', 23, 9, 16, 'stir-fried', 'taipei'),
  B(`لحم البقر المطبوخ ببطء ${T}`, 'Slow cooked beef', 'Boeuf lentement cuit', 'Ternera cocida lentamente', 'Langsam gekochtes Rindfleisch', 'meat_mains', 'dinner', 22, 8, 14, 'simmered', 'taichung'),
  B(`شرائح اللحم البقري الحار ${T}`, 'Spicy beef slices', 'Tranches de boeuf epicees', 'Lomo de ternera picante', 'Scharfe Rindfleischscheiben', 'meat_mains', 'dinner', 23, 8, 14, 'stir-fried', 'kaohsiung'),
  B(`كرات اللحم الحار ${T}`, 'Spicy meatballs', 'Boulettes epicees', 'Albondigas picantes', 'Wuerzige Frikadellen', 'meat_mains', 'lunch', 20, 11, 13, 'stir-fried', 'tainan'),
  B(`لحم البقر المقرمش ${T}`, 'Crispy beef', 'Boeuf croustillant', 'Ternera crujiente', 'Knuspriges Rindfleisch', 'meat_mains', 'dinner', 24, 10, 15, 'fried', 'taipei'),
  B(`لحم البقر مع الخردل ${T}`, 'Beef with mustard', 'Boeuf a la moutarde', 'Ternera con mostaza', 'Rindfleisch mit Senf', 'meat_mains', 'dinner', 21, 11, 14, 'stir-fried', 'taichung'),
  B(`لحم البقر المحمر الجاف ${T}`, 'Dry seared beef', 'Boeuf saisi sec', 'Ternera sellada seca', 'Trocken angebratenes Rindfleisch', 'meat_mains', 'dinner', 24, 6, 16, 'grilled', 'tainan'),
  B(`لحم البقر المشوي الساخن ${T}`, 'Hot grilled beef', 'Boeuf grille chaud', 'Ternera caliente a la parrilla', 'Heiss gegrilltes Rindfleisch', 'meat_mains', 'dinner', 25, 5, 16, 'grilled', 'kaohsiung'),
  B(`لحم البقر المطبوخ بالثوم ${T}`, 'Garlic braised beef', 'Boeuf braise a l ail', 'Ternera guisada con ajo', 'Geschmortes Rindfleisch mit Knoblauch', 'meat_mains', 'dinner', 22, 9, 15, 'simmered', 'taipei'),
  B(`لحم البقر بالسمسم ${T}`, 'Sesame beef', 'Boeuf au sesame', 'Ternera con sesamo', 'Sesam-Rindfleisch', 'meat_mains', 'dinner', 22, 10, 14, 'stir-fried', 'chiayi'),
  B(`كرات لحم البقر الكبيرة ${T}`, 'Large beef meatballs', 'Groses boulettes de boeuf', 'Albondigas grandes de ternera', 'Grosse Rindfleischklosschen', 'meat_mains', 'lunch', 20, 12, 13, 'simmered', 'taichung'),
  B(`لحم البقر المقلي بالصويا ${T}`, 'Soy fried beef', 'Boeuf frit a la soja', 'Ternera frita con soja', 'Sojagebratenes Rindfleisch', 'meat_mains', 'dinner', 23, 10, 15, 'fried', 'kaohsiung'),
  B(`شرائح اللحم البقري المطبوخة ${T}`, 'Braised beef slices', 'Tranches de boeuf braisees', 'Lomo de ternera guisado', 'Geschmorte Rindfleischscheiben', 'meat_mains', 'dinner', 23, 9, 14, 'simmered', 'taichung'),
  B(`لحم البقر والخضار المشوية ${T}`, 'Grilled beef and vegetables', 'Boeuf et legumes grilles', 'Ternera y verduras a la parrilla', 'Gegrilltes Rindfleisch mit Gemuese', 'meat_mains', 'dinner', 22, 12, 14, 'grilled', 'yilan'),
];
