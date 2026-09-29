import { B, T } from './rows.mjs';

export default [
  // breakfast_items (10)
  B(`فول تاوتيان ${T}`, 'Douhua sweet breakfast', 'Douhua doux', 'Tofu dulce de desayuno', 'Suesser Douhua', 'breakfast_items', 'breakfast', 5, 12, 3, 'simmered', 'pan_taiwanese'),
  B(`خبز صيني بحشوة اللحم ${T}`, 'Chinese bread with meat filling', 'Pain chinois a la viande', 'Pan chino relleno de carne', 'Chinesisches Brot mit Fuellung', 'breakfast_items', 'breakfast', 9, 30, 9, 'griddled', 'taipei'),
  B(`عصيدة الدجاج ${T}`, 'Chicken congee', 'Congee de poulet', 'Congee de pollo', 'Huhn-Congee', 'breakfast_items', 'breakfast', 8, 15, 2, 'simmered', 'pan_taiwanese'),
  B(`حليب الصويا الحلو ${T}`, 'Sweet soy milk', 'Lait de soja sucre', 'Leche de soja dulce', 'Susse Sojamilch', 'breakfast_items', 'breakfast', 4, 8, 2, 'raw', 'pan_taiwanese'),
  B(`خبز اليانغ ${T}`, 'Yang bread', 'Pain Yang', 'Pan Yang', 'Yang-Brot', 'breakfast_items', 'breakfast', 8, 28, 7, 'griddled', 'tainan'),
  B(`كعك الفجل الحلو ${T}`, 'Sweet radish cake', 'Gateau de radis sucre', 'Pastel de rabano dulce', 'Suesser Rettichkuchen', 'breakfast_items', 'breakfast', 3, 20, 4, 'pan-fried', 'taichung'),
  B(`عصيدة الفول الحلوة ${T}`, 'Sweet mung bean congee', 'Congee de haricots mung sucre', 'Congee de mung dulce', 'Susse Mungobohnen-Congee', 'breakfast_items', 'breakfast', 5, 18, 1, 'simmered', 'pan_taiwanese'),
  B(`عجة الدجاج ${T}`, 'Chicken omelette', 'Omelette au poulet', 'Tortilla de pollo', 'Huehnchenomelett', 'breakfast_items', 'breakfast', 12, 4, 11, 'pan-fried', 'pan_taiwanese'),
  B(`خبز اليوسفي المبشور ${T}`, 'Shredded mandarin bread', 'Pain aux mandarines effiloche', 'Pan de mandarina rallada', 'Zitrusfruechte-Brot', 'breakfast_items', 'breakfast', 5, 30, 7, 'griddled', 'hsinchu'),
  B(`عصيدة الدجاج بالشعرية ${T}`, 'Chicken vermicelli congee', 'Congee au poulet et vermicelles', 'Congee de pollo y fideos', 'Huhn-Vermicelli-Congee', 'breakfast_items', 'breakfast', 8, 16, 2, 'simmered', 'keelung'),

  // rice_dishes (16)
  B(`أرز لوتشو لحم البقر ${T}`, 'Beef lu rou rice', 'Riz braise au boeuf', 'Arroz guisado de ternera', 'Geschmortes Rindfleisch-Reis', 'rice_dishes', 'lunch', 18, 28, 12, 'simmered', 'taipei'),
  B(`أرز اللحم المطهو ${T}`, 'Braised meat rice', 'Riz a la viande braisee', 'Arroz con carne guisada', 'Geschmortes Fleisch-Reis', 'rice_dishes', 'lunch', 17, 29, 11, 'simmered', 'pan_taiwanese'),
  B(`أرز الدجاج ${T}`, 'Chicken rice', 'Riz au poulet', 'Arroz con pollo', 'Haehnchen-Reis', 'rice_dishes', 'lunch', 16, 27, 8, 'simmered', 'chiayi'),
  B(`أرز الخضار المقلي ${T}`, 'Vegetable fried rice', 'Riz saute aux legumes', 'Arroz frito con verduras', 'Gemuese-Bratreis', 'rice_dishes', 'lunch', 7, 35, 9, 'stir-fried', 'pan_taiwanese'),
  B(`أرز البيض المقلي ${T}`, 'Egg fried rice', 'Riz saute aux oeufs', 'Arroz frito con huevo', 'Eier-Bratreis', 'rice_dishes', 'lunch', 9, 34, 10, 'stir-fried', 'pan_taiwanese'),
  B(`أرز لحم البقر الحار ${T}`, 'Spicy beef rice', 'Riz au boeuf epice', 'Arroz con ternera picante', 'Scharfes Rindfleisch-Reis', 'rice_dishes', 'lunch', 19, 27, 12, 'stir-fried', 'kaohsiung'),
  B(`أرز الدجاج بالزعتر ${T}`, 'Thyme chicken rice', 'Riz au poulet au thym', 'Arroz con pollo y tomillo', 'Thymian-Haehnchen-Reis', 'rice_dishes', 'lunch', 16, 28, 8, 'simmered', 'hualien'),
  B(`أرز المأكولات البحرية ${T}`, 'Seafood rice', 'Riz aux fruits de mer', 'Arroz con mariscos', 'Meeresfruechte-Reis', 'rice_dishes', 'lunch', 17, 28, 8, 'stir-fried', 'keelung'),
  B(`أرز السمك المجفف ${T}`, 'Dried fish rice', 'Riz au poisson seche', 'Arroz con pescado seco', 'Getrockneter Fisch-Reis', 'rice_dishes', 'lunch', 14, 30, 7, 'simmered', 'pingtung'),
  B(`أرز الفاصولياء الحلوة ${T}`, 'Sweet bean rice', 'Riz aux haricots doux', 'Arroz con judia dulce', 'Susser Bohnen-Reis', 'rice_dishes', 'lunch', 8, 33, 5, 'simmered', 'taitung'),
  B(`أرز لحم البقر المشوي ${T}`, 'Grilled beef rice', 'Riz au boeuf grille', 'Arroz con ternera a la parrilla', 'Gegrilltes Rindfleisch-Reis', 'rice_dishes', 'lunch', 20, 26, 13, 'grilled', 'tainan'),
  B(`أرز الدجاج المقرمش ${T}`, 'Crispy chicken rice', 'Riz au poulet croustillant', 'Arroz con pollo crujiente', 'Knuspriges Haehnchen-Reis', 'rice_dishes', 'lunch', 18, 27, 11, 'fried', 'kaohsiung'),
  B(`أرز الفطر ${T}`, 'Mushroom rice', 'Riz aux champignons', 'Arroz con setas', 'Pilz-Reis', 'rice_dishes', 'lunch', 8, 32, 6, 'simmered', 'nantou'),
  B(`أرز الخضار المطهو ${T}`, 'Braised vegetable rice', 'Riz aux legumes braises', 'Arroz con verduras guisadas', 'Geschmortes Gemuese-Reis', 'rice_dishes', 'lunch', 7, 33, 7, 'simmered', 'yilan'),
  B(`أرز الدجاج بالزنجبيل ${T}`, 'Ginger chicken rice', 'Riz au poulet au gingembre', 'Arroz con pollo y jengibre', 'Ingwer-Haehnchen-Reis', 'rice_dishes', 'lunch', 16, 28, 8, 'simmered', 'taipei'),
  B(`أرز السمك المبخر ${T}`, 'Steamed fish rice', 'Riz au poisson vapeur', 'Arroz con pescado al vapor', 'Gedaempfter Fisch-Reis', 'rice_dishes', 'lunch', 16, 28, 6, 'steamed', 'hualien'),
];
