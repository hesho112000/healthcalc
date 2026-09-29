// Japanese base part 5 of 6: vegetable_mains (15) + banana_coconut (10) = 25 rows.
// Halal notes: all dishes are plant-based or use halal protein. No alcohol.
import { B, T } from './rows.mjs';

export default [
  // --- vegetable_mains (15) ---
  B(`ناسو دينغكو ${T}`, 'Stir-fried eggplant', 'Aubergine frite', 'Berenjena frita', 'Gebratene Aubergine', 'vegetable_mains', 'lunch', 5, 12, 6, 'stir-fried'),
  B(`ناسو دينغكو بالزنجبيل ${T}`, 'Ginger stir-fried eggplant', 'Aubergine frite gingembre', 'Berenjena frita jengibre', 'Gebratene Aubergine mit Ingwer', 'vegetable_mains', 'lunch', 4, 13, 5, 'stir-fried'),
  B(`ناسو دينغكو بالثوم ${T}`, 'Garlic stir-fried eggplant', 'Aubergine frite ail', 'Berenjena frita ajo', 'Gebratene Aubergine mit Knoblauch', 'vegetable_mains', 'lunch', 3, 14, 4, 'stir-fried'),
  B(`ناسو دينغكو بالبصل ${T}`, 'Onion stir-fried eggplant', 'Aubergine frite oignon', 'Berenjena frita cebolla', 'Gebratene Aubergine mit Zwiebel', 'vegetable_mains', 'lunch', 4, 12, 5, 'stir-fried'),
  B(`ناسو دينغكو بالكزبرة ${T}`, 'Cilantro stir-fried eggplant', 'Aubergine frite coriandre', 'Berenjena frita cilantro', 'Gebratene Aubergine mit Koriander', 'vegetable_mains', 'lunch', 3, 13, 4, 'stir-fried'),
  B(`ناسو دينغكو بالليمون ${T}`, 'Lemon stir-fried eggplant', 'Aubergine frite citron', 'Berenjena frita limón', 'Gebratene Aubergine mit Zitrone', 'vegetable_mains', 'lunch', 4, 11, 5, 'stir-fried'),
  B(`ناسو دينغكو بالفلفل ${T}`, 'Pepper stir-fried eggplant', 'Aubergine frite poivre', 'Berenjena frita pimienta', 'Gebratene Aubergine mit Pfeffer', 'vegetable_mains', 'lunch', 3, 12, 4, 'stir-fried'),
  B(`ناسو دينغكو بالكاري ${T}`, 'Curry stir-fried eggplant', 'Aubergine frite curry', 'Berenjena frita curry', 'Gebratene Aubergine mit Curry', 'vegetable_mains', 'lunch', 4, 13, 5, 'stir-fried'),
  B(`ناسو دينغكو بالطماطم ${T}`, 'Tomato stir-fried eggplant', 'Aubergine frite tomate', 'Berenjena frita tomate', 'Gebratene Aubergine mit Tomate', 'vegetable_mains', 'lunch', 3, 14, 4, 'stir-fried'),
  B(`ناسو دينغكو بالفطر ${T}`, 'Mushroom stir-fried eggplant', 'Aubergine frite champignons', 'Berenjena frita hongos', 'Gebratene Aubergine mit Pilzen', 'vegetable_mains', 'lunch', 4, 12, 5, 'stir-fried'),
  B(`ناسو دينغكو بالذرة ${T}`, 'Corn stir-fried eggplant', 'Aubergine frite mais', 'Berenjena frita maíz', 'Gebratene Aubergine mit Mais', 'vegetable_mains', 'lunch', 3, 13, 4, 'stir-fried'),
  B(`ناسو دينغكو بالبطاطس ${T}`, 'Potato stir-fried eggplant', 'Aubergine frite pomme de terre', 'Berenjena frita papa', 'Gebratene Aubergine mit Kartoffel', 'vegetable_mains', 'lunch', 4, 11, 5, 'stir-fried'),
  B(`ناسو دينغكو بالجزر ${T}`, 'Carrot stir-fried eggplant', 'Aubergine frite carotte', 'Berenjena frita zanahoria', 'Gebratene Aubergine mit Karotte', 'vegetable_mains', 'lunch', 3, 12, 4, 'stir-fried'),
  B(`ناسو دينغكو بالسبانخ ${T}`, 'Spinach stir-fried eggplant', 'Aubergine frite epinards', 'Berenjena frita espinacas', 'Gebratene Aubergine mit Spinat', 'vegetable_mains', 'lunch', 4, 10, 5, 'stir-fried'),
  B(`ناسو دينغكو بالبروكلي ${T}`, 'Broccoli stir-fried eggplant', 'Aubergine frite brocoli', 'Berenjena frita brócoli', 'Gebratene Aubergine mit Brokkoli', 'vegetable_mains', 'lunch', 3, 11, 4, 'stir-fried'),

  // --- banana_coconut (10) ---
  B(`موتشي بالموز ${T}`, 'Banana mochi', 'Mochi banane', 'Mochi plátano', 'Bananen-Mochi', 'banana_coconut', 'snacks', 5, 28, 4, 'steamed'),
  B(`موتشي بجوز الهند ${T}`, 'Coconut mochi', 'Mochi noix de coco', 'Mochi coco', 'Kokosnuss-Mochi', 'banana_coconut', 'snacks', 4, 29, 3, 'steamed'),
  B(`موتشي بالموز وجوز الهند ${T}`, 'Banana coconut mochi', 'Mochi banane noix de coco', 'Mochi plátano coco', 'Bananen-Kokosnuss-Mochi', 'banana_coconut', 'snacks', 6, 27, 5, 'steamed'),
  B(`موتشي بالزنجبيل ${T}`, 'Ginger mochi', 'Mochi gingembre', 'Mochi jengibre', 'Ingwer-Mochi', 'banana_coconut', 'snacks', 4, 28, 3, 'steamed'),
  B(`موتشي بالثوم ${T}`, 'Garlic mochi', 'Mochi ail', 'Mochi ajo', 'Knoblauch-Mochi', 'banana_coconut', 'snacks', 3, 29, 2, 'steamed'),
  B(`موتشي بالبصل ${T}`, 'Onion mochi', 'Mochi oignon', 'Mochi cebolla', 'Zwiebel-Mochi', 'banana_coconut', 'snacks', 4, 27, 3, 'steamed'),
  B(`موتشي بالكزبرة ${T}`, 'Cilantro mochi', 'Mochi coriandre', 'Mochi cilantro', 'Koriander-Mochi', 'banana_coconut', 'snacks', 3, 28, 2, 'steamed'),
  B(`موتشي بالليمون ${T}`, 'Lemon mochi', 'Mochi citron', 'Mochi limón', 'Zitronen-Mochi', 'banana_coconut', 'snacks', 4, 26, 3, 'steamed'),
  B(`موتشي بالفلفل ${T}`, 'Pepper mochi', 'Mochi poivre', 'Mochi pimienta', 'Pfeffer-Mochi', 'banana_coconut', 'snacks', 3, 27, 2, 'steamed'),
  B(`موتشي بالكاري ${T}`, 'Curry mochi', 'Mochi curry', 'Mochi curry', 'Curry-Mochi', 'banana_coconut', 'snacks', 4, 28, 3, 'steamed'),
];
