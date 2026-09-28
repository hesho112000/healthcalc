// Chinese expansion part 5 of 6: vegetable_mains (20) + banana_coconut (15) = 35 rows.
// All dishes are distinct from the base 200 and parts 1-4. Halal: no pork, no alcohol.
import { R, T } from './rows.mjs';

export default [
  // --- vegetable_mains (20) ---
  R(`تشاو تساي بالزنجبيل ${T}`, 'Ginger stir-fried vegetables', 'Legumes frits gingembre', 'Verduras salteadas jengibre', 'Gebratenes Gemüse mit Ingwer', 'vegetable_mains', 'lunch', 'pan_chinese', 5, 9, 4),
  R(`تشاو تساي بالثوم ${T}`, 'Garlic stir-fried vegetables', 'Legumes frits ail', 'Verduras salteadas ajo', 'Gebratenes Gemüse mit Knoblauch', 'vegetable_mains', 'lunch', 'pan_chinese', 4, 10, 3),
  R(`تشاو تساي بالبصل ${T}`, 'Onion stir-fried vegetables', 'Legumes frits oignon', 'Verduras salteadas cebolla', 'Gebratenes Gemüse mit Zwiebel', 'vegetable_mains', 'lunch', 'pan_chinese', 5, 8, 4),
  R(`تشاو تساي بالكزبرة ${T}`, 'Cilantro stir-fried vegetables', 'Legumes frits coriandre', 'Verduras salteadas cilantro', 'Gebratenes Gemüse mit Koriander', 'vegetable_mains', 'lunch', 'pan_chinese', 4, 9, 3),
  R(`تشاو تساي بالليمون ${T}`, 'Lemon stir-fried vegetables', 'Legumes frits citron', 'Verduras salteadas limón', 'Gebratenes Gemüse mit Zitrone', 'vegetable_mains', 'lunch', 'pan_chinese', 5, 7, 4),
  R(`تشاو تساي بالفلفل ${T}`, 'Pepper stir-fried vegetables', 'Legumes frits poivre', 'Verduras salteadas pimienta', 'Gebratenes Gemüse mit Pfeffer', 'vegetable_mains', 'lunch', 'pan_chinese', 4, 8, 3),
  R(`تشاو تساي بالكاري ${T}`, 'Curry stir-fried vegetables', 'Legumes frits curry', 'Verduras salteadas curry', 'Gebratenes Gemüse mit Curry', 'vegetable_mains', 'lunch', 'pan_chinese', 5, 9, 4),
  R(`تشاو تساي بالطماطم ${T}`, 'Tomato stir-fried vegetables', 'Legumes frits tomate', 'Verduras salteadas tomate', 'Gebratenes Gemüse mit Tomate', 'vegetable_mains', 'lunch', 'pan_chinese', 4, 10, 3),
  R(`تشاو تساي بالفطر ${T}`, 'Mushroom stir-fried vegetables', 'Legumes frits champignons', 'Verduras salteadas hongos', 'Gebratenes Gemüse mit Pilzen', 'vegetable_mains', 'lunch', 'pan_chinese', 5, 8, 4),
  R(`تشاو تساي بالذرة ${T}`, 'Corn stir-fried vegetables', 'Legumes frits mais', 'Verduras salteadas maíz', 'Gebratenes Gemüse mit Mais', 'vegetable_mains', 'lunch', 'pan_chinese', 4, 9, 3),
  R(`تشاو تساي بالبطاطس ${T}`, 'Potato stir-fried vegetables', 'Legumes frits pomme de terre', 'Verduras salteadas papa', 'Gebratenes Gemüse mit Kartoffel', 'vegetable_mains', 'lunch', 'pan_chinese', 5, 7, 4),
  R(`تشاو تساي بالجزر ${T}`, 'Carrot stir-fried vegetables', 'Legumes frits carotte', 'Verduras salteadas zanahoria', 'Gebratenes Gemüse mit Karotte', 'vegetable_mains', 'lunch', 'pan_chinese', 4, 8, 3),
  R(`تشاو تساي بالسبانخ ${T}`, 'Spinach stir-fried vegetables', 'Legumes frits epinards', 'Verduras salteadas espinacas', 'Gebratenes Gemüse mit Spinat', 'vegetable_mains', 'lunch', 'pan_chinese', 5, 6, 4),
  R(`تشاو تساي بالبروكلي ${T}`, 'Broccoli stir-fried vegetables', 'Legumes frits brocoli', 'Verduras salteadas brócoli', 'Gebratenes Gemüse mit Brokkoli', 'vegetable_mains', 'lunch', 'pan_chinese', 4, 7, 3),
  R(`تشاو تساي بالبازلاء ${T}`, 'Pea stir-fried vegetables', 'Legumes frits petits pois', 'Verduras salteadas guisantes', 'Gebratenes Gemüse mit Erbsen', 'vegetable_mains', 'lunch', 'pan_chinese', 5, 8, 4),
  R(`تشاو تساي بالخضار المشكلة ${T}`, 'Mixed vegetable stir-fried vegetables', 'Legumes frits legumes varies', 'Verduras salteadas verduras mixtas', 'Gebratenes Gemüse mit gemischtem Gemüse', 'vegetable_mains', 'lunch', 'pan_chinese', 4, 9, 3),
  R(`تشاو تساي بيان بالزنجبيل ${T}`, 'Ginger stir-fried vegetable slices', 'Legumes en tranches gingembre', 'Verduras en lonchas jengibre', 'Gebratene Gemüsescheiben mit Ingwer', 'vegetable_mains', 'lunch', 'pan_chinese', 5, 8, 4),
  R(`تشاو تساي بيان بالثوم ${T}`, 'Garlic stir-fried vegetable slices', 'Legumes en tranches ail', 'Verduras en lonchas ajo', 'Gebratene Gemüsescheiben mit Knoblauch', 'vegetable_mains', 'lunch', 'pan_chinese', 4, 9, 3),
  R(`تشاو تساي بيان بالبصل ${T}`, 'Onion stir-fried vegetable slices', 'Legumes en tranches oignon', 'Verduras en lonchas cebolla', 'Gebratene Gemüsescheiben mit Zwiebel', 'vegetable_mains', 'lunch', 'pan_chinese', 5, 7, 4),
  R(`تشاو تساي بيان بالكزبرة ${T}`, 'Cilantro stir-fried vegetable slices', 'Legumes en tranches coriandre', 'Verduras en lonchas cilantro', 'Gebratene Gemüsescheiben mit Koriander', 'vegetable_mains', 'lunch', 'pan_chinese', 4, 8, 3),

  // --- banana_coconut (15) ---
  R(`جياو تساي بالموز بالزنجبيل ${T}`, 'Ginger banana with coconut', 'Banane gingembre noix de coco', 'Plátano jengibre coco', 'Banane mit Ingwer und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 6, 19, 7),
  R(`جياو تساي بالموز بالثوم ${T}`, 'Garlic banana with coconut', 'Banane ail noix de coco', 'Plátano ajo coco', 'Banane mit Knoblauch und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 5, 20, 6),
  R(`جياو تساي بالموز بالبصل ${T}`, 'Onion banana with coconut', 'Banane oignon noix de coco', 'Plátano cebolla coco', 'Banane mit Zwiebel und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 6, 18, 7),
  R(`جياو تساي بالموز بالكزبرة ${T}`, 'Cilantro banana with coconut', 'Banane coriandre noix de coco', 'Plátano cilantro coco', 'Banane mit Koriander und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 5, 19, 6),
  R(`جياو تساي بالموز بالليمون ${T}`, 'Lemon banana with coconut', 'Banane citron noix de coco', 'Plátano limón coco', 'Banane mit Zitrone und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 6, 17, 7),
  R(`جياو تساي بالموز بالفلفل ${T}`, 'Pepper banana with coconut', 'Banane poivre noix de coco', 'Plátano pimienta coco', 'Banane mit Pfeffer und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 5, 18, 6),
  R(`جياو تساي بالموز بالكاري ${T}`, 'Curry banana with coconut', 'Banane curry noix de coco', 'Plátano curry coco', 'Banane mit Curry und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 6, 19, 7),
  R(`جياو تساي بالموز بالطماطم ${T}`, 'Tomato banana with coconut', 'Banane tomate noix de coco', 'Plátano tomate coco', 'Banane mit Tomate und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 5, 20, 6),
  R(`جياو تساي بالموز بالفطر ${T}`, 'Mushroom banana with coconut', 'Banane champignons noix de coco', 'Plátano hongos coco', 'Banane mit Pilzen und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 6, 18, 7),
  R(`جياو تساي بالموز بالذرة ${T}`, 'Corn banana with coconut', 'Banane mais noix de coco', 'Plátano maíz coco', 'Banane mit Mais und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 5, 19, 6),
  R(`جياو تساي بالموز بالبطاطس ${T}`, 'Potato banana with coconut', 'Banane pomme de terre noix de coco', 'Plátano papa coco', 'Banane mit Kartoffel und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 6, 17, 7),
  R(`جياو تساي بالموز بالجزر ${T}`, 'Carrot banana with coconut', 'Banane carotte noix de coco', 'Plátano zanahoria coco', 'Banane mit Karotte und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 5, 18, 6),
  R(`جياو تساي بالموز بالسبانخ ${T}`, 'Spinach banana with coconut', 'Banane epinards noix de coco', 'Plátano espinacas coco', 'Banane mit Spinat und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 6, 16, 7),
  R(`جياو تساي بالموز بالبروكلي ${T}`, 'Broccoli banana with coconut', 'Banane brocoli noix de coco', 'Plátano brócoli coco', 'Banane mit Brokkoli und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 5, 17, 6),
  R(`جياو تساي بالموز بالبازلاء ${T}`, 'Pea banana with coconut', 'Banane petits pois noix de coco', 'Plátano guisantes coco', 'Banane mit Erbsen und Kokosnuss', 'banana_coconut', 'snacks', 'pan_chinese', 6, 18, 7),
];
