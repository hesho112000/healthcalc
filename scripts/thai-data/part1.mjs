// Thai expansion part 1 of 5: breakfast_items (16) + rice_dishes (20) = 36 rows.
import { R, T } from './rows.mjs';

export default [
  // --- breakfast_items (16) ---
  R(`جوك بالدجاج ${T}`, 'Chicken rice porridge', 'Riz au lait au poulet', 'Arroz con pollo', 'Huhn-Reisbrei', 'breakfast_items', 'breakfast', 'pan_thai', 6, 20, 1.5),
  R(`جوك بالفاصوليا الحمراء ${T}`, 'Red bean rice porridge', 'Riz au lait aux haricots rouges', 'Arroz con judías rojas', 'Reisbrei mit roten Bohnen', 'breakfast_items', 'breakfast', 'pan_thai', 5, 22, 1),
  R(`كعك أرز بالتمر ${T}`, 'Rice pancake with dates', 'Pancake de riz aux dattes', 'Panqueque de arroz con dátiles', 'Reispfannkuchen mit Datteln', 'breakfast_items', 'breakfast', 'pan_thai', 4, 33, 6),
  R(`أرز مبخر بالدجاج والأعشاب ${T}`, 'Steamed rice parcels with chicken and herbs', 'Riz vapeur au poulet et herbes', 'Arroz al vapor con pollo y hierbas', 'Gedämpfter Reis mit Huhn und Kräutern', 'breakfast_items', 'breakfast', 'isan', 13, 30, 7),
  R(`أرز مقلي بالبيض والسمسم ${T}`, 'Fried rice with egg and sesame', 'Riz frit oeuf sésame', 'Arroz frito con huevo y sésamo', 'Gebratener Reis mit Ei und Sesam', 'breakfast_items', 'breakfast', 'pan_thai', 8, 30, 8),
  R(`خبز بالزبدة والمرق ${T}`, 'Bread with butter and gravy', 'Pain au beurre et sauce', 'Pan con mantequilla y salsa', 'Brot mit Butter und Soße', 'breakfast_items', 'breakfast', 'pan_thai', 8, 30, 13),
  R(`جوز مطحون مع الأرز ${T}`, 'Rice with ground coconut', 'Riz à la noix de coco moulue', 'Arroz con coco molido', 'Reis mit gemahlener Kokosnuss', 'breakfast_items', 'breakfast', 'pan_thai', 4, 30, 8),
  R(`جوك بالفاصوليا المطحونة ${T}`, 'Ground bean rice porridge', 'Riz au lait aux haricots moulus', 'Arroz con leche de judías molidas', 'Reisbrei mit gemahlenen Bohnen', 'breakfast_items', 'breakfast', 'pan_thai', 6, 21, 1.5),
  R(`بيض مقلي بزيت السمسم ${T}`, 'Eggs fried in sesame oil', 'Oeufs frits à huile de sésame', 'Huevos fritos con aceite de sésamo', 'In Sesamöl gebratene Eier', 'breakfast_items', 'breakfast', 'asian_shared', 13, 1, 12),
  R(`شاي بالحليب المكثف ${T}`, 'Milk tea with condensed milk', 'Thé au lait concentré', 'Té con leche condensada', 'Tee mit Kondensmilch', 'breakfast_items', 'breakfast', 'bangkok', 2, 14, 2),
  R(`جوك بالسمسم الأسود ${T}`, 'Rice porridge with black sesame', 'Riz au lait au sésame noir', 'Arroz con sésamo negro', 'Reisbrei mit schwarzem Sesam', 'breakfast_items', 'breakfast', 'pan_thai', 4, 21, 2.5),
  R(`أرز لزج مشوي ${T}`, 'Grilled sticky rice', 'Riz gluant grillé', 'Arroz pegajoso a la parrilla', 'Gegrillter klebriger Reis', 'breakfast_items', 'breakfast', 'chiang_mai', 4, 30, 2),
  R(`فول مقلي للفطور ${T}`, 'Fried beans breakfast', 'Haricots frits', 'Judías fritas', 'Gebratene Bohnen', 'breakfast_items', 'breakfast', 'pan_thai', 9, 26, 5),
  R(`كعك أرز بالدجاج ${T}`, 'Chicken rice cake', 'Pancake de riz au poulet', 'Panqueque de arroz con pollo', 'Reiskuchen mit Huhn', 'breakfast_items', 'breakfast', 'pan_thai', 9, 28, 7),
  R(`فول مدمس بالعسل ${T}`, 'Sweet bean paste', 'Pâte de haricots sucrée', 'Pasta de judías dulce', 'Süße Bohnenpaste', 'breakfast_items', 'breakfast', 'asian_shared', 5, 27, 3),
  R(`حساء الأرز بالدجاج والزنجبيل ${T}`, 'Ginger chicken rice soup', 'Soupe de riz au poulet et gingembre', 'Sopa de arroz con pollo y jengibre', 'Reissuppe mit Huhn und Ingwer', 'breakfast_items', 'breakfast', 'hua_hin', 7, 19, 2.5),

  // --- rice_dishes (20) ---
  R(`أرز خاو سوي بالدجاج ${T}`, 'Khao soi chicken', 'Khao soi au poulet', 'Khao soi con pollo', 'Khao Soi mit Huhn', 'rice_dishes', 'lunch', 'chiang_mai', 14, 28, 12),
  R(`خاو سوي باللحم ${T}`, 'Khao soi with beef', 'Khao soi au boeuf', 'Khao soi con ternera', 'Khao Soi mit Rindfleisch', 'rice_dishes', 'lunch', 'chiang_mai', 15, 27, 13),
  R(`أرز كاي لا مان غاي ${T}`, 'Khao lai man gai', 'Riz lai au poulet', 'Arroz lai con pollo', 'Reis mit pochiertem Huhn', 'rice_dishes', 'lunch', 'bangkok', 15, 31, 6),
  R(`أرز ماسمان ${T}`, 'Massaman rice plate', 'Riz au massaman', 'Arroz con massaman', 'Massaman-Reisplatte', 'rice_dishes', 'lunch', 'pattaya', 13, 31, 12),
  R(`أرز مقلي بالأناناس والجمبري ${T}`, 'Pineapple prawn fried rice', 'Riz frit ananas crevettes', 'Arroz frito con piña y camarones', 'Gebratener Reis mit Ananas und Garnelen', 'rice_dishes', 'lunch', 'phuket', 11, 32, 8),
  R(`أرز مقلي بالبازلاء والذرة ${T}`, 'Fried rice with peas and corn', 'Riz frit petits pois mais', 'Arroz frito con guisantes y maíz', 'Gebratener Reis mit Erbsen und Mais', 'rice_dishes', 'lunch', 'pan_thai', 7, 33, 7),
  R(`أرز بالستيو الأحمر ${T}`, 'Red braised rice', 'Riz braise rouge', 'Arroz rojo braseado', 'Roter geschmorter Reis', 'rice_dishes', 'lunch', 'pan_thai', 12, 30, 7),
  R(`أرز لزج بجوز الهند ${T}`, 'Coconut sticky rice plate', 'Riz gluant au lait de coco', 'Arroz pegajoso con leche de coco', 'Klebriger Reis mit Kokosmilch', 'rice_dishes', 'lunch', 'pan_thai', 4, 31, 6),
  R(`أرز بالكاري الأصفر بالدجاج ${T}`, 'Yellow chicken curry rice', 'Riz au curry jaune au poulet', 'Arroz con curry amarillo de pollo', 'Reis mit gelbem Huhn-Curry', 'rice_dishes', 'lunch', 'songkhla', 12, 30, 9),
  R(`أرز بالكمون في الجنوب ${T}`, 'Southern cumin rice', 'Riz au cumin du sud', 'Arroz con comino del sur', 'Reis mit Kreuzkümmel aus dem Süden', 'rice_dishes', 'lunch', 'asian_shared', 4, 31, 3),
  R(`أرز كاري هاينان ${T}`, 'Hainanese curry rice', 'Riz curry de Hainan', 'Arroz curry de Hainan', 'Hainan-Curry-Reis', 'rice_dishes', 'lunch', 'hua_hin', 14, 30, 11),
  R(`أرز مقلي صيني بالخضار ${T}`, 'Chinese fried rice with vegetables', 'Riz frit chinois aux légumes', 'Arroz frito chino con verduras', 'Chinesischer gebratener Reis', 'rice_dishes', 'lunch', 'bangkok', 8, 32, 8),
  R(`أرز مقلي بالدجاج والكاري ${T}`, 'Chicken curry fried rice', 'Riz frit au curry de poulet', 'Arroz frito con curry de pollo', 'Gebratener Reis mit Huhn-Curry', 'rice_dishes', 'lunch', 'pan_thai', 12, 31, 9),
  R(`أرز بالسمسم مع اللحم ${T}`, 'Sesame rice with beef', 'Riz au sesame avec boeuf', 'Arroz con sésamo y ternera', 'Sesamreis mit Rindfleisch', 'rice_dishes', 'lunch', 'pan_thai', 14, 30, 9),
  R(`أرز دجاج على البخار ${T}`, 'Steamed chicken rice', 'Riz au poulet à la vapeur', 'Arroz al vapor con pollo', 'Gedämpfter Reis mit Huhn', 'rice_dishes', 'lunch', 'bangkok', 16, 30, 6),
  R(`أرز بامبو لزج في الشمال ${T}`, 'Northern sticky bamboo rice', 'Riz au bambou du nord', 'Arroz de bambú del norte', 'Klebriger Bambusreis des Nordens', 'rice_dishes', 'lunch', 'chiang_mai', 4, 32, 3),
  R(`أرز بالمانجو والدجاج ${T}`, 'Mango chicken rice', 'Riz au poulet à la mangue', 'Arroz con pollo y mango', 'Reis mit Mango und Huhn', 'rice_dishes', 'lunch', 'pan_thai', 13, 32, 7),
  R(`أرز مقلي بالكاري الأخضر ${T}`, 'Green curry fried rice', 'Riz frit au curry vert', 'Arroz frito con curry verde', 'Gebratener Reis mit grünem Curry', 'rice_dishes', 'lunch', 'pan_thai', 11, 30, 9),
  R(`أرز جوز الهند بالخضار ${T}`, 'Coconut rice with vegetables', 'Riz au lait de coco aux légumes', 'Arroz con leche de coco y verduras', 'Reis mit Kokosmilch und Gemüse', 'rice_dishes', 'lunch', 'pan_thai', 5, 32, 7),
  R(`أرز لحم مع الصلصة ${T}`, 'Beef rice with gravy', 'Riz au boeuf en sauce', 'Arroz con ternera en gravy', 'Rindfleischreis mit Soße', 'rice_dishes', 'lunch', 'pattaya', 15, 30, 10),
];
