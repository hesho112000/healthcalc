// Thai base part 7 of 9: vegetable_mains (6) + banana_coconut (4) = 10 rows.
import { B, T } from './rows.mjs';

export default [
  // --- vegetable_mains (6) ---
  B(`خضار مشوية ${T}`, 'Pak ruam roast vegetables', 'Legumes rotis', 'Verduras asadas', 'Geröstetes Gemüse', 'vegetable_mains', 'lunch', 5, 12, 6, 'roasted'),
  B(`خضار مقلة مشكلة ${T}`, 'Pad pak ruam mixed vegetables', 'Legumes melanges sautes', 'Verduras mixtas salteadas', 'Pfannengerichtetes Gemüse', 'vegetable_mains', 'lunch', 4, 10, 5, 'stir-fried'),
  B(`كاري الخضار ${T}`, 'Gaeng phak ruam vegetable curry', 'Curry de legumes', 'Curry de verduras', 'Gemüsecurry', 'vegetable_mains', 'dinner', 5, 12, 7, 'simmered'),
  B(`كاري الفاصولياء الخضراء ${T}`, 'Kheaw kuai pad green bean curry', 'Curry de haricots verts', 'Curry de ejotes', 'Curry mit grünen Bohnen', 'vegetable_mains', 'dinner', 6, 12, 6, 'simmered'),
  B(`قرنبيط مقلي مقرمش ${T}`, 'Kalam dwar cauliflower fritters', 'Beignets de chou fleur', 'Bunuelos de coliflor', 'Blumenkohl-Beignets', 'vegetable_mains', 'lunch', 5, 11, 9, 'deep-fried'),
  B(`باذنجان مشوي ${T}`, 'Makhue pha grilled eggplant', 'Aubergine grillee', 'Berenjena a la parrilla', 'Gegrillte Aubergine', 'vegetable_mains', 'lunch', 4, 12, 7, 'grilled'),

  // --- banana_coconut (4) ---
  B(`كعك الموز ${T}`, 'Khanom khod banana pancake', 'Pancake banane khanom khod', 'Panqueque de platano', 'Bananenpfannkuchen', 'banana_coconut', 'snacks', 3, 27, 7, 'griddled'),
  B(`دوريان مقلي ${T}`, 'Thurian tod fried durian', 'Durian frit', 'Durian frito', 'Frittierte Durian', 'banana_coconut', 'snacks', 3, 30, 12, 'deep-fried'),
  B(`حليب جوز الهند ${T}`, 'Kathi coconut milk', 'Lait de coco', 'Leche de coco', 'Kokosmilch', 'banana_coconut', 'snacks', 2, 3, 20, 'raw'),
  B(`جوز الهند المحمص ${T}`, 'Maproa khan toasted coconut', 'Noix de coco grillee', 'Coco tostado', 'Geröstete Kokosnuss', 'banana_coconut', 'snacks', 3, 12, 17, 'toasted'),
];
