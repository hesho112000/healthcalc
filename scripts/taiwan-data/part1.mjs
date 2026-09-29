import { B, T } from './rows.mjs';

export default [
  // breakfast_items (8)
  B(`فطائر الفول المخبوزة ${T}`, 'Baked red bean buns', 'Boulanges aux haricots rouges', 'Bollos de judia roja al horno', 'Gebackene rote Bohnenbroetchen', 'breakfast_items', 'breakfast', 7, 28, 6, 'baked', 'chiayi'),
  B(`عجة لحم البقر مع الخضار ${T}`, 'Beef omelette with vegetables', 'Omelette au boeuf et legumes', 'Tortilla de ternera con verduras', 'Rindfleischomelett mit Gemuese', 'breakfast_items', 'breakfast', 18, 10, 13, 'pan-fried', 'tainan'),
  B(`عصيدة الأرز البسمتي ${T}`, 'Basmati congee', 'Congee de riz basmati', 'Congee de arroz basmati', 'Basmati-Reiscongee', 'breakfast_items', 'breakfast', 5, 19, 1, 'simmered', 'taipei'),
  B(`خبز الموز المقلي ${T}`, 'Fried banana bread', 'Pain banane frit', 'Pan de platano frito', 'Gebratene Bananenbrot', 'breakfast_items', 'breakfast', 5, 30, 9, 'pan-fried', 'tainan'),
  B(`حليب السمسم الحلو ${T}`, 'Sweet sesame milk', 'Lait sesame sucre', 'Leche de sesamo dulce', 'Suesse Sesammilch', 'breakfast_items', 'breakfast', 5, 8, 5, 'raw', 'chiayi'),
  B(`كعك الأرز المبخر ${T}`, 'Steamed rice cake', 'Gateau de riz vapeur', 'Pastel de arroz al vapor', 'Gedaempfter Reiskuchen', 'breakfast_items', 'breakfast', 5, 26, 5, 'steamed', 'taichung'),
  B(`بيض مخبوز بالخضار ${T}`, 'Baked eggs with vegetables', 'Oeufs au four aux legumes', 'Huevos al horno con verduras', 'Gebackene Eier mit Gemuese', 'breakfast_items', 'breakfast', 12, 11, 10, 'baked', 'pan_taiwanese'),
  B(`عصيدة الذرة الحلوة ${T}`, 'Sweet corn congee', 'Congee de mais sucre', 'Congee de maiz dulce', 'Suer Maiscongee', 'breakfast_items', 'breakfast', 5, 20, 2, 'simmered', 'kaohsiung'),

  // rice_dishes (14)
  B(`أرز الدجاج بالتوابل ${T}`, 'Spiced chicken rice', 'Riz au poulet epice', 'Arroz con pollo especiado', 'Gewuerztes Haehnchen-Reis', 'rice_dishes', 'lunch', 17, 28, 9, 'simmered', 'taipei'),
  B(`أرز لحم البقر مع بيض ${T}`, 'Beef rice with egg', 'Riz au boeuf et oeuf', 'Arroz con ternera y huevo', 'Rindfleisch-Reis mit Ei', 'rice_dishes', 'lunch', 19, 28, 12, 'simmered', 'tainan'),
  B(`أرز الفطر الحلو ${T}`, 'Sweet mushroom rice', 'Riz doux aux champignons', 'Arroz dulce con setas', 'Suess Pilz-Reis', 'rice_dishes', 'lunch', 8, 32, 6, 'simmered', 'nantou'),
  B(`أرز الخردل الأصفر ${T}`, 'Yellow mustard rice', 'Riz a la moutarde jaune', 'Arroz con mostaza amarilla', 'Reis mit gelber Senf', 'rice_dishes', 'lunch', 8, 32, 6, 'simmered', 'taichung'),
  B(`أرز الروبيان المعطر ${T}`, 'Fragrant prawn rice', 'Riz aux crevettes parfume', 'Arroz con gambas fragantes', 'Duftende Garnelen-Reis', 'rice_dishes', 'lunch', 18, 28, 9, 'stir-fried', 'keelung'),
  B(`أرز الكاجو المحمر ${T}`, 'Roasted cashew rice', 'Riz aux noix de cajou grillees', 'Arroz con anacardos tostados', 'Reis mit geroesteten Cashewnuessen', 'rice_dishes', 'lunch', 10, 30, 10, 'stir-fried', 'taichung'),
  B(`أرز الدجاج والجوز ${T}`, 'Chicken rice with walnuts', 'Riz au poulet et noix', 'Arroz con pollo y nueces', 'Haehnchen-Reis mit Nuessen', 'rice_dishes', 'lunch', 17, 28, 10, 'simmered', 'chiayi'),
  B(`أرز الخضار المقطع ${T}`, 'Sliced vegetable rice', 'Riz aux legumes tranches', 'Arroz con verduras en rodajas', 'Geschmittenes Gemuese-Reis', 'rice_dishes', 'lunch', 8, 32, 7, 'simmered', 'yilan'),
  B(`أرز لحم الدجاج المتبل ${T}`, 'Braised chicken rice', 'Riz au poulet braise', 'Arroz con pollo guisado', 'Geschmortes Haehnchen-Reis', 'rice_dishes', 'lunch', 18, 28, 9, 'simmered', 'tainan'),
  B(`أرز السمك بالخل ${T}`, 'Fish rice with vinegar', 'Riz au poisson au vinaigre', 'Arroz con pescado y vinagre', 'Fisch-Reis mit Essig', 'rice_dishes', 'lunch', 16, 29, 7, 'simmered', 'tainan'),
  B(`أرز الدجاج الحار ${T}`, 'Spicy chicken rice', 'Riz au poulet epice', 'Arroz con pollo picante', 'Scharfer Haehnchen-Reis', 'rice_dishes', 'lunch', 18, 27, 10, 'stir-fried', 'kaohsiung'),
  B(`أرز الشعيرات المطبوخ ${T}`, 'Cooked vermicelli rice', 'Riz de vermicelles cuit', 'Arroz de fideos cocido', 'Gekochter Vermicelli-Reis', 'rice_dishes', 'lunch', 9, 31, 6, 'simmered', 'taipei'),
  B(`أرز الخضار المطهية الرفيعة ${T}`, 'Finely braised vegetable rice', 'Riz fin aux legumes braises', 'Arroz fino con verduras guisadas', 'Feiner Gemuese-Reis', 'rice_dishes', 'lunch', 7, 33, 7, 'simmered', 'yilan'),
  B(`أرز سمك السلمون ${T}`, 'Salmon rice', 'Riz au saumon', 'Arroz con salmon', 'Lachs-Reis', 'rice_dishes', 'lunch', 19, 27, 11, 'steamed', 'hualien'),
];
