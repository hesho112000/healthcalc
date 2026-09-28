// Chinese base part 5 of 6: vegetable_mains (15) + banana_coconut (10) = 25 rows.
// Halal notes: all dishes are plant-based or use halal protein. No alcohol.
import { B, T } from './rows.mjs';

export default [
  // --- vegetable_mains (15) ---
  B(`تشاو تساي ${T}`, 'Stir-fried vegetables', 'Legumes frits', 'Verduras salteadas', 'Gebratenes Gemüse', 'vegetable_mains', 'lunch', 6, 10, 5, 'stir-fried'),
  B(`تشاو تساي بيان ${T}`, 'Stir-fried vegetable slices', 'Legumes en tranches frits', 'Verduras en lonchas fritas', 'Gebratene Gemüsescheiben', 'vegetable_mains', 'lunch', 5, 11, 4, 'stir-fried'),
  B(`تشاو تساي سي ${T}`, 'Stir-fried vegetable shreds', 'Legumes effiloches frits', 'Verduras deshebradas fritas', 'Gebratene Gemüse', 'vegetable_mains', 'lunch', 6, 9, 5, 'stir-fried'),
  B(`تشاو تساي تشوان ${T}`, 'Stir-fried vegetable rolls', 'Rouleaux de legumes frits', 'Rollitos de verduras fritos', 'Gebratene Gemüserollen', 'vegetable_mains', 'lunch', 5, 10, 4, 'stir-fried'),
  B(`تشاو تساي تو ${T}`, 'Stir-fried vegetable cubes', 'Legumes en cubes frits', 'Verduras en cubos fritas', 'Gebratene Gemüsewürfel', 'vegetable_mains', 'lunch', 6, 8, 5, 'stir-fried'),
  B(`تشاو تساي شوان ${T}`, 'Stir-fried vegetable strips', 'Legumes en lanieres frits', 'Verduras en tiras fritas', 'Gebratene Gemüsestreifen', 'vegetable_mains', 'lunch', 5, 9, 4, 'stir-fried'),
  B(`تشاو تساي بي ${T}`, 'Stir-fried vegetable breast', 'Legumes frits', 'Verduras fritas', 'Gebratene Gemüsebrust', 'vegetable_mains', 'lunch', 7, 7, 6, 'stir-fried'),
  B(`تشاو تساي رو ${T}`, 'Stir-fried vegetable meat', 'Viande de legumes frite', 'Carne de verduras frita', 'Gebratene Gemüse', 'vegetable_mains', 'lunch', 6, 8, 5, 'stir-fried'),
  B(`تشاو تساي تشانغ ${T}`, 'Stir-fried vegetable intestines', 'Intestins de legumes frits', 'Intestinos de verduras fritos', 'Gebratene Gemüsedärme', 'vegetable_mains', 'lunch', 4, 12, 3, 'stir-fried'),
  B(`تشاو تساي بالفطر ${T}`, 'Vegetables with mushrooms', 'Legumes aux champignons', 'Verduras con hongos', 'Gemüse mit Pilzen', 'vegetable_mains', 'lunch', 7, 8, 6, 'stir-fried'),
  B(`تشاو تساي بالبصل ${T}`, 'Vegetables with onions', 'Legumes aux oignons', 'Verduras con cebolla', 'Gemüse mit Zwiebeln', 'vegetable_mains', 'lunch', 6, 9, 5, 'stir-fried'),
  B(`تشاو تساي بالثوم ${T}`, 'Vegetables with garlic', 'Legumes a l ail', 'Verduras con ajo', 'Gemüse mit Knoblauch', 'vegetable_mains', 'lunch', 5, 10, 4, 'stir-fried'),
  B(`تشاو تساي بالزنجبيل ${T}`, 'Vegetables with ginger', 'Legumes au gingembre', 'Verduras con jengibre', 'Gemüse mit Ingwer', 'vegetable_mains', 'lunch', 6, 8, 5, 'stir-fried'),
  B(`تشاو تساي بالكزبرة ${T}`, 'Vegetables with cilantro', 'Legumes coriandre', 'Verduras con cilantro', 'Gemüse mit Koriander', 'vegetable_mains', 'lunch', 5, 9, 4, 'stir-fried'),
  B(`تشاو تساي بالليمون ${T}`, 'Vegetables with lemon', 'Legumes citron', 'Verduras con limón', 'Gemüse mit Zitrone', 'vegetable_mains', 'lunch', 6, 7, 5, 'stir-fried'),

  // --- banana_coconut (10) ---
  B(`جياو تساي بالموز ${T}`, 'Banana with coconut', 'Banane a la noix de coco', 'Plátano con coco', 'Banane mit Kokosnuss', 'banana_coconut', 'snacks', 7, 20, 8, 'steamed'),
  B(`جياو تساي بجوز الهند ${T}`, 'Coconut with banana', 'Noix de coco et banane', 'Coco con plátano', 'Kokosnuss mit Banane', 'banana_coconut', 'snacks', 6, 21, 7, 'steamed'),
  B(`جياو تساي بالموز وجوز الهند ${T}`, 'Banana coconut dessert', 'Dessert banane noix de coco', 'Postre de plátano y coco', 'Bananen-Kokosnuss-Dessert', 'banana_coconut', 'snacks', 8, 19, 9, 'steamed'),
  B(`جياو تساي بالموز والزنجبيل ${T}`, 'Ginger banana dessert', 'Dessert banane gingembre', 'Postre de plátano jengibre', 'Bananen-Ingwer-Dessert', 'banana_coconut', 'snacks', 7, 20, 8, 'steamed'),
  B(`جياو تساي بالموز والثوم ${T}`, 'Garlic banana dessert', 'Dessert banane ail', 'Postre de plátano ajo', 'Bananen-Knoblauch-Dessert', 'banana_coconut', 'snacks', 6, 21, 7, 'steamed'),
  B(`جياو تساي بالموز والبصل ${T}`, 'Onion banana dessert', 'Dessert banane oignon', 'Postre de plátano cebolla', 'Bananen-Zwiebel-Dessert', 'banana_coconut', 'snacks', 7, 19, 8, 'steamed'),
  B(`جياو تساي بالموز والكزبرة ${T}`, 'Cilantro banana dessert', 'Dessert banane coriandre', 'Postre de plátano cilantro', 'Bananen-Koriander-Dessert', 'banana_coconut', 'snacks', 6, 20, 7, 'steamed'),
  B(`جياو تساي بالموز والليمون ${T}`, 'Lemon banana dessert', 'Dessert banane citron', 'Postre de plátano limón', 'Bananen-Zitronen-Dessert', 'banana_coconut', 'snacks', 7, 18, 8, 'steamed'),
  B(`جياو تساي بالموز والفلفل ${T}`, 'Pepper banana dessert', 'Dessert banane poivre', 'Postre de plátano pimienta', 'Bananen-Pfeffer-Dessert', 'banana_coconut', 'snacks', 6, 19, 7, 'steamed'),
  B(`جياو تساي بالموز والكاري ${T}`, 'Curry banana dessert', 'Dessert banane curry', 'Postre de plátano curry', 'Bananen-Curry-Dessert', 'banana_coconut', 'snacks', 7, 20, 8, 'steamed'),
];
