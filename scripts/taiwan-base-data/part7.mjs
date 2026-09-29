import { B, T } from './rows.mjs';

export default [
  // rice_cakes_sweets (12)
  B(`حلوى الفدانغ ${T}`, 'Pineapple cake', 'Gateau a l ananas', 'Pastel de piña', 'Ananaskuchen', 'rice_cakes_sweets', 'snack', 4, 26, 9, 'baked', 'chiayi'),
  B(`حلوى الشمس ${T}`, 'Sun cake', 'Gateau soleil', 'Pastel del sol', 'Sonnenkuchen', 'rice_cakes_sweets', 'snack', 5, 24, 10, 'baked', 'taichung'),
  B(`حلوى بيض الصفار ${T}`, 'Egg yolk pastry', 'Pate a jaune d oeuf', 'Pastel de yema', 'Eigelbogenpastete', 'rice_cakes_sweets', 'snack', 6, 22, 12, 'baked', 'pan_taiwanese'),
  B(`حلوى الجوز ${T}`, 'Walnut pastry', 'Pate aux noix', 'Pastel de nuez', 'Nuesspastete', 'rice_cakes_sweets', 'snack', 6, 21, 11, 'baked', 'chiayi'),
  B(`حلوى البودنغ حبة البازلاء ${T}`, 'Bean paste pudding', 'Pudding de paste de haricots', 'Pudin de pasta de judia', 'Bohnenpudding', 'rice_cakes_sweets', 'snack', 6, 26, 8, 'steamed', 'tainan'),
  B(`حلوى الذرة الحلوة ${T}`, 'Sweet corn cake', 'Gateau de mais sucre', 'Pastel de maiz dulce', 'Suesser Maiskuchen', 'rice_cakes_sweets', 'snack', 5, 25, 8, 'pan-fried', 'kaohsiung'),
  B(`آيس كريم التامو ${T}`, 'Taro ice cream', 'Glace au taro', 'Helado de taro', 'Taro-Eis', 'rice_cakes_sweets', 'snack', 4, 24, 9, 'frozen', 'tainan'),
  B(`حلوى السمسم المقرمشة ${T}`, 'Crispy sesame candy', 'Bonbon sesame croustillant', 'Caramelo crujiente de sesamo', 'Knusprige Sesambonbons', 'rice_cakes_sweets', 'snack', 6, 20, 11, 'fried', 'taipei'),
  B(`حلوى الفول الحلو ${T}`, 'Sweet bean paste cake', 'Gateau de paste de haricots', 'Pastel de pasta de judia dulce', 'Suesser Bohnenpastete', 'rice_cakes_sweets', 'snack', 7, 25, 8, 'steamed', 'hualien'),
  B(`حلوى جوز الهند ${T}`, 'Coconut cake', 'Gateau au noix de coco', 'Pastel de coco', 'Kokoskuchen', 'rice_cakes_sweets', 'snack', 5, 24, 10, 'baked', 'pingtung'),
  B(`كعك الأرز الحلو ${T}`, 'Sweet rice cake', 'Gateau de riz sucre', 'Pastel de arroz dulce', 'SuerReiskuchen', 'rice_cakes_sweets', 'snack', 5, 27, 7, 'steamed', 'yilan'),
  B(`حلوى الأرز اللزجة ${T}`, 'Sticky rice sweet', 'Riz gluant sucre', 'Arroz pegajoso dulce', 'Suer Klebreis', 'rice_cakes_sweets', 'snack', 5, 29, 6, 'steamed', 'nantou'),

  // condiments_sauces (8)
  B(`صلصة الصويا ${T}`, 'Soy sauce', 'Sauce soja', 'Salsa de soja', 'Sojasauce', 'condiments_sauces', 'lunch', 6, 6, 0, 'raw', 'pan_taiwanese'),
  B(`صلصة السمسم ${T}`, 'Sesame sauce', 'Sauce sesame', 'Salsa de sesamo', 'Sesamsauce', 'condiments_sauces', 'lunch', 6, 4, 12, 'raw', 'pan_taiwanese'),
  B(`صلصة الفلفل الحار ${T}`, 'Chili sauce', 'Sauce pimentee', 'Salsa de chile', 'Chilisauce', 'condiments_sauces', 'lunch', 3, 10, 2, 'raw', 'tainan'),
  B(`صلصة الخل المعتقة ${T}`, 'Aged vinegar sauce', 'Sauce au vinaigre age', 'Salsa de vinagre madurado', 'Sauce aus gereiftem Essig', 'condiments_sauces', 'lunch', 2, 6, 0, 'raw', 'tainan'),
  B(`صلصة الفطر المطبوخة ${T}`, 'Mushroom sauce', 'Sauce aux champignons', 'Salsa de setas', 'Pilzsauce', 'condiments_sauces', 'lunch', 4, 9, 3, 'simmered', 'nantou'),
  B(`صلصة السمك المبخرة ${T}`, 'Steamed fish sauce', 'Sauce poisson vapeur', 'Salsa de pescado al vapor', 'Gedaempfte Fischsauce', 'condiments_sauces', 'lunch', 8, 7, 4, 'simmered', 'keelung'),
  B(`صلصة التوابل ${T}`, 'Seasoned sauce', 'Sauce assaisonnee', 'Salsa sazonada', 'Gewuerzsauce', 'condiments_sauces', 'lunch', 4, 8, 2, 'raw', 'taipei'),
  B(`صلصة السمك المطهية ${T}`, 'Cooked fish sauce', 'Sauce poisson cuisinee', 'Salsa de pescado cocida', 'Gekochte Fischsauce', 'condiments_sauces', 'lunch', 9, 6, 3, 'simmered', 'pingtung'),

  // beverages (14)
  B(`شاي اللوتس ${T}`, 'Oolong tea', 'The oolong', 'Te oolong', 'Oolongtee', 'beverages', 'snack', 0, 1, 0, 'brewed', 'nantou'),
  B(`شاي الجبلي ${T}`, 'Mountain tea', 'The de montagne', 'Te de montana', 'Bergtee', 'beverages', 'snack', 0, 1, 0, 'brewed', 'chiayi'),
  B(`حليب الشاي اللؤلؤي ${T}`, 'Bubble milk tea', 'The au lait perle', 'Te con leche de perlas', 'Perlenmilchtee', 'beverages', 'snack', 3, 14, 4, 'brewed', 'taipei'),
  B(`شاي العسل البارد ${T}`, 'Cold honey tea', 'The froid au miel', 'Te fria con miel', 'Kalter Honigtee', 'beverages', 'snack', 0, 12, 0, 'brewed', 'tainan'),
  B(`شراب التفاح ${T}`, 'Apple juice', 'Jus de pomme', 'Zumo de manzana', 'Apfelsaft', 'beverages', 'snack', 0, 14, 0, 'raw', 'taipei'),
  B(`شاي الأزرق ${T}`, 'Blue tea', 'The bleu', 'Te azul', 'Blauer Tee', 'beverages', 'snack', 0, 2, 0, 'brewed', 'hsinchu'),
  B(`عصير المانجو ${T}`, 'Mango juice', 'Jus de mangue', 'Zumo de mango', 'Mangosaft', 'beverages', 'snack', 1, 15, 1, 'raw', 'taitung'),
  B(`عصير الليتشي ${T}`, 'Lychee juice', 'Jus de litchi', 'Zumo de lichi', 'Lycheisaft', 'beverages', 'snack', 1, 16, 0, 'raw', 'chiayi'),
  B(`شاي الليمون بالنعناع ${T}`, 'Mint lemon tea', 'The citron a la menthe', 'Te de limon con menta', 'Zitronenminztee', 'beverages', 'snack', 0, 8, 0, 'brewed', 'kaohsiung'),
  B(`عصير البطيخ ${T}`, 'Watermelon juice', 'Jus de pastèque', 'Zumo de sandía', 'Wassermelonensaft', 'beverages', 'snack', 1, 12, 0, 'raw', 'pingtung'),
  B(`عصير البرتقال ${T}`, 'Orange juice', 'Jus d orange', 'Zumo de naranja', 'Orangensaft', 'beverages', 'snack', 1, 13, 0, 'raw', 'taipei'),
  B(`عصير الليمون ${T}`, 'Lemon juice', 'Jus de citron', 'Zumo de limon', 'Zitronensaft', 'beverages', 'snack', 0, 5, 0, 'raw', 'taipei'),
  B(`عصير القصب ${T}`, 'Sugarcane juice', 'Jus de canne a sucre', 'Zumo de cana de azucar', 'Zuckerrohrsaft', 'beverages', 'snack', 0, 15, 0, 'raw', 'chiayi'),
  B(`حليب الصويا ${T}`, 'Soy milk', 'Lait de soja', 'Leche de soja', 'Sojamilch', 'beverages', 'snack', 4, 5, 2, 'raw', 'pan_taiwanese'),
];
