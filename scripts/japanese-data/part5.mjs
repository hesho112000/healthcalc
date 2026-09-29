// Japanese expansion part 5 of 6: vegetable_mains (20) + banana_coconut (15) = 35 rows.
// All dishes are distinct from the base 200 and parts 1-4. Halal: no pork, no alcohol.
import { R, T } from './rows.mjs';

export default [
  // --- vegetable_mains (20) ---
  R(`ناسو دينغكو بالزنجبيل ${T}`, 'Aromatic ginger stir-fried eggplant', 'Aubergine frite gingembre', 'Berenjena frita jengibre', 'Gebratene Aubergine mit Ingwer', 'vegetable_mains', 'lunch', 'pan_japanese', 4, 12, 5),
  R(`ناسو دينغكو بالثوم ${T}`, 'Aromatic garlic stir-fried eggplant', 'Aubergine frite ail', 'Berenjena frita ajo', 'Gebratene Aubergine mit Knoblauch', 'vegetable_mains', 'lunch', 'pan_japanese', 3, 13, 4),
  R(`ناسو دينغكو بالبصل ${T}`, 'Aromatic onion stir-fried eggplant', 'Aubergine frite oignon', 'Berenjena frita cebolla', 'Gebratene Aubergine mit Zwiebel', 'vegetable_mains', 'lunch', 'pan_japanese', 4, 11, 5),
  R(`ناسو دينغكو بالكزبرة ${T}`, 'Aromatic cilantro stir-fried eggplant', 'Aubergine frite coriandre', 'Berenjena frita cilantro', 'Gebratene Aubergine mit Koriander', 'vegetable_mains', 'lunch', 'pan_japanese', 3, 12, 4),
  R(`ناسو دينغكو بالليمون ${T}`, 'Aromatic lemon stir-fried eggplant', 'Aubergine frite citron', 'Berenjena frita limón', 'Gebratene Aubergine mit Zitrone', 'vegetable_mains', 'lunch', 'pan_japanese', 4, 10, 5),
  R(`ناسو دينغكو بالفلفل ${T}`, 'Aromatic pepper stir-fried eggplant', 'Aubergine frite poivre', 'Berenjena frita pimienta', 'Gebratene Aubergine mit Pfeffer', 'vegetable_mains', 'lunch', 'pan_japanese', 3, 11, 4),
  R(`ناسو دينغكو بالكاري ${T}`, 'Aromatic curry stir-fried eggplant', 'Aubergine frite curry', 'Berenjena frita curry', 'Gebratene Aubergine mit Curry', 'vegetable_mains', 'lunch', 'pan_japanese', 4, 12, 5),
  R(`ناسو دينغكو بالطماطم ${T}`, 'Aromatic tomato stir-fried eggplant', 'Aubergine frite tomate', 'Berenjena frita tomate', 'Gebratene Aubergine mit Tomate', 'vegetable_mains', 'lunch', 'pan_japanese', 3, 13, 4),
  R(`ناسو دينغكو بالفطر ${T}`, 'Aromatic mushroom stir-fried eggplant', 'Aubergine frite champignons', 'Berenjena frita hongos', 'Gebratene Aubergine mit Pilzen', 'vegetable_mains', 'lunch', 'pan_japanese', 4, 11, 5),
  R(`ناسو دينغكو بالذرة ${T}`, 'Aromatic corn stir-fried eggplant', 'Aubergine frite mais', 'Berenjena frita maíz', 'Gebratene Aubergine mit Mais', 'vegetable_mains', 'lunch', 'pan_japanese', 3, 12, 4),
  R(`ناسو دينغكو بالبطاطس ${T}`, 'Aromatic potato stir-fried eggplant', 'Aubergine frite pomme de terre', 'Berenjena frita papa', 'Gebratene Aubergine mit Kartoffel', 'vegetable_mains', 'lunch', 'pan_japanese', 4, 10, 5),
  R(`ناسو دينغكو بالجزر ${T}`, 'Aromatic carrot stir-fried eggplant', 'Aubergine frite carotte', 'Berenjena frita zanahoria', 'Gebratene Aubergine mit Karotte', 'vegetable_mains', 'lunch', 'pan_japanese', 3, 11, 4),
  R(`ناسو دينغكو بالسبانخ ${T}`, 'Aromatic spinach stir-fried eggplant', 'Aubergine frite epinards', 'Berenjena frita espinacas', 'Gebratene Aubergine mit Spinat', 'vegetable_mains', 'lunch', 'pan_japanese', 4, 9, 5),
  R(`ناسو دينغكو بالبروكلي ${T}`, 'Aromatic broccoli stir-fried eggplant', 'Aubergine frite brocoli', 'Berenjena frita brócoli', 'Gebratene Aubergine mit Brokkoli', 'vegetable_mains', 'lunch', 'pan_japanese', 3, 10, 4),
  R(`ناسو دينغكو بالبازلاء ${T}`, 'Aromatic pea stir-fried eggplant', 'Aubergine frite petits pois', 'Berenjena frita guisantes', 'Gebratene Aubergine mit Erbsen', 'vegetable_mains', 'lunch', 'pan_japanese', 4, 11, 5),
  R(`ناسو دينغكو بالخضار المشكلة ${T}`, 'Aromatic mixed vegetable stir-fried eggplant', 'Aubergine frite legumes varies', 'Berenjena frita verduras mixtas', 'Gebratene Aubergine mit gemischtem Gemüse', 'vegetable_mains', 'lunch', 'pan_japanese', 3, 12, 4),
  R(`ناسو دينغكو بالموز ${T}`, 'Banana stir-fried eggplant', 'Aubergine frite banane', 'Berenjena frita plátano', 'Gebratene Aubergine mit Banane', 'vegetable_mains', 'lunch', 'pan_japanese', 4, 11, 5),
  R(`ناسو دينغكو بجوز الهند ${T}`, 'Coconut stir-fried eggplant', 'Aubergine frite noix de coco', 'Berenjena frita coco', 'Gebratene Aubergine mit Kokosnuss', 'vegetable_mains', 'lunch', 'pan_japanese', 3, 12, 4),
  R(`ناسو دينغكو بالموز وجوز الهند ${T}`, 'Banana coconut stir-fried eggplant', 'Aubergine frite banane noix de coco', 'Berenjena frita plátano coco', 'Gebratene Aubergine mit Banane und Kokosnuss', 'vegetable_mains', 'lunch', 'pan_japanese', 5, 10, 6),
  R(`ناسو دينغكو بالزنجبيل والثوم ${T}`, 'Ginger garlic stir-fried eggplant', 'Aubergine frite gingembre ail', 'Berenjena frita jengibre ajo', 'Gebratene Aubergine mit Ingwer und Knoblauch', 'vegetable_mains', 'lunch', 'pan_japanese', 3, 12, 4),

  // --- banana_coconut (15) ---
  R(`موتشي بالموز بالزنجبيل ${T}`, 'Aromatic ginger banana mochi', 'Mochi banane gingembre', 'Mochi plátano jengibre', 'Bananen-Mochi mit Ingwer', 'banana_coconut', 'snacks', 'pan_japanese', 4, 27, 3),
  R(`موتشي بالموز بالثوم ${T}`, 'Aromatic garlic banana mochi', 'Mochi banane ail', 'Mochi plátano ajo', 'Bananen-Mochi mit Knoblauch', 'banana_coconut', 'snacks', 'pan_japanese', 3, 28, 2),
  R(`موتشي بالموز بالبصل ${T}`, 'Aromatic onion banana mochi', 'Mochi banane oignon', 'Mochi plátano cebolla', 'Bananen-Mochi mit Zwiebel', 'banana_coconut', 'snacks', 'pan_japanese', 4, 26, 3),
  R(`موتشي بالموز بالكزبرة ${T}`, 'Aromatic cilantro banana mochi', 'Mochi banane coriandre', 'Mochi plátano cilantro', 'Bananen-Mochi mit Koriander', 'banana_coconut', 'snacks', 'pan_japanese', 3, 27, 2),
  R(`موتشي بالموز بالليمون ${T}`, 'Aromatic lemon banana mochi', 'Mochi banane citron', 'Mochi plátano limón', 'Bananen-Mochi mit Zitrone', 'banana_coconut', 'snacks', 'pan_japanese', 4, 25, 3),
  R(`موتشي بالموز بالفلفل ${T}`, 'Aromatic pepper banana mochi', 'Mochi banane poivre', 'Mochi plátano pimienta', 'Bananen-Mochi mit Pfeffer', 'banana_coconut', 'snacks', 'pan_japanese', 3, 26, 2),
  R(`موتشي بالموز بالكاري ${T}`, 'Aromatic curry banana mochi', 'Mochi banane curry', 'Mochi plátano curry', 'Bananen-Mochi mit Curry', 'banana_coconut', 'snacks', 'pan_japanese', 4, 27, 3),
  R(`موتشي بالموز بالطماطم ${T}`, 'Aromatic tomato banana mochi', 'Mochi banane tomate', 'Mochi plátano tomate', 'Bananen-Mochi mit Tomate', 'banana_coconut', 'snacks', 'pan_japanese', 3, 28, 2),
  R(`موتشي بالموز بالفطر ${T}`, 'Aromatic mushroom banana mochi', 'Mochi banane champignons', 'Mochi plátano hongos', 'Bananen-Mochi mit Pilzen', 'banana_coconut', 'snacks', 'pan_japanese', 4, 26, 3),
  R(`موتشي بالموز بالذرة ${T}`, 'Aromatic corn banana mochi', 'Mochi banane mais', 'Mochi plátano maíz', 'Bananen-Mochi mit Mais', 'banana_coconut', 'snacks', 'pan_japanese', 3, 27, 2),
  R(`موتشي بالموز بالبطاطس ${T}`, 'Aromatic potato banana mochi', 'Mochi banane pomme de terre', 'Mochi plátano papa', 'Bananen-Mochi mit Kartoffel', 'banana_coconut', 'snacks', 'pan_japanese', 4, 25, 3),
  R(`موتشي بالموز بالجزر ${T}`, 'Aromatic carrot banana mochi', 'Mochi banane carotte', 'Mochi plátano zanahoria', 'Bananen-Mochi mit Karotte', 'banana_coconut', 'snacks', 'pan_japanese', 3, 26, 2),
  R(`موتشي بالموز بالسبانخ ${T}`, 'Aromatic spinach banana mochi', 'Mochi banane epinards', 'Mochi plátano espinacas', 'Bananen-Mochi mit Spinat', 'banana_coconut', 'snacks', 'pan_japanese', 4, 24, 3),
  R(`موتشي بالموز بالبروكلي ${T}`, 'Aromatic broccoli banana mochi', 'Mochi banane brocoli', 'Mochi plátano brócoli', 'Bananen-Mochi mit Brokkoli', 'banana_coconut', 'snacks', 'pan_japanese', 3, 25, 2),
  R(`موتشي بالموز بالبازلاء ${T}`, 'Aromatic pea banana mochi', 'Mochi banane petits pois', 'Mochi plátano guisantes', 'Bananen-Mochi mit Erbsen', 'banana_coconut', 'snacks', 'pan_japanese', 4, 26, 3),
];

