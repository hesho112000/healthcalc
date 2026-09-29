// Japanese base part 4 of 6: meat_mains (18) + fish_seafood (20) = 38 rows.
// Halal notes: all pork dishes (buta kakuni, tonkatsu, chashu) adapted to beef/chicken.
// Sake replaced with dashi broth. Mirin replaced with sweet rice vinegar blend.
import { B, T } from './rows.mjs';

export default [
  // --- meat_mains (18) ---
  B(`غيوياكي باللحم ${T}`, 'Beef gyoza', 'Gyoza au boeuf', 'Gyoza de ternera', 'Rind-Gyoza', 'meat_mains', 'dinner', 16, 18, 10, 'pan-fried'),
  B(`غيوياكي بالدجاج ${T}`, 'Chicken gyoza', 'Gyoza au poulet', 'Gyoza de pollo', 'Huhn-Gyoza', 'meat_mains', 'dinner', 15, 19, 9, 'pan-fried'),
  B(`غيوياكي بالروبيان ${T}`, 'Shrimp gyoza', 'Gyoza crevettes', 'Gyoza camarones', 'Garnelen-Gyoza', 'meat_mains', 'dinner', 14, 20, 8, 'pan-fried'),
  B(`غيوياكي بالخضار ${T}`, 'Vegetable gyoza', 'Gyoza legumes', 'Gyoza verduras', 'Gemüse-Gyoza', 'meat_mains', 'dinner', 8, 24, 5, 'pan-fried'),
  B(`غيوياكي بالفطر ${T}`, 'Mushroom gyoza', 'Gyoza champignons', 'Gyoza hongos', 'Pilz-Gyoza', 'meat_mains', 'dinner', 9, 23, 6, 'pan-fried'),
  B(`غيوياكي بالبيض ${T}`, 'Egg gyoza', 'Gyoza oeufs', 'Gyoza huevo', 'Eier-Gyoza', 'meat_mains', 'dinner', 11, 20, 9, 'pan-fried'),
  B(`غيوياكي بالزنجبيل ${T}`, 'Ginger gyoza', 'Gyoza gingembre', 'Gyoza jengibre', 'Ingwer-Gyoza', 'meat_mains', 'dinner', 14, 18, 10, 'pan-fried'),
  B(`غيوياكي بالكزبرة ${T}`, 'Cilantro gyoza', 'Gyoza coriandre', 'Gyoza cilantro', 'Koriander-Gyoza', 'meat_mains', 'dinner', 14, 18, 10, 'pan-fried'),
  B(`غيوياكي بالليمون ${T}`, 'Lemon gyoza', 'Gyoza citron', 'Gyoza limón', 'Zitronen-Gyoza', 'meat_mains', 'dinner', 14, 17, 10, 'pan-fried'),
  B(`غيوياكي بالفلفل ${T}`, 'Pepper gyoza', 'Gyoza poivre', 'Gyoza pimienta', 'Pfeffer-Gyoza', 'meat_mains', 'dinner', 14, 17, 10, 'pan-fried'),
  B(`غيوياكي بالكاري ${T}`, 'Curry gyoza', 'Gyoza curry', 'Gyoza curry', 'Curry-Gyoza', 'meat_mains', 'dinner', 15, 18, 11, 'pan-fried'),
  B(`غيوياكي بالطماطم ${T}`, 'Tomato gyoza', 'Gyoza tomate', 'Gyoza tomate', 'Tomaten-Gyoza', 'meat_mains', 'dinner', 14, 19, 9, 'pan-fried'),
  B(`غيوياكي بالذرة ${T}`, 'Corn gyoza', 'Gyoza mais', 'Gyoza maíz', 'Mais-Gyoza', 'meat_mains', 'dinner', 13, 20, 8, 'pan-fried'),
  B(`غيوياكي بالبطاطس ${T}`, 'Potato gyoza', 'Gyoza pomme de terre', 'Gyoza papa', 'Kartoffel-Gyoza', 'meat_mains', 'dinner', 15, 17, 11, 'pan-fried'),
  B(`غيوياكي بالجزر ${T}`, 'Carrot gyoza', 'Gyoza carotte', 'Gyoza zanahoria', 'Karotten-Gyoza', 'meat_mains', 'dinner', 14, 18, 10, 'pan-fried'),
  B(`غيوياكي بالسبانخ ${T}`, 'Spinach gyoza', 'Gyoza epinards', 'Gyoza espinacas', 'Spinat-Gyoza', 'meat_mains', 'dinner', 15, 16, 11, 'pan-fried'),
  B(`غيوياكي بالبروكلي ${T}`, 'Broccoli gyoza', 'Gyoza brocoli', 'Gyoza brócoli', 'Brokkoli-Gyoza', 'meat_mains', 'dinner', 14, 17, 10, 'pan-fried'),
  B(`غيوياكي بالبازلاء ${T}`, 'Pea gyoza', 'Gyoza petits pois', 'Gyoza guisantes', 'Erbsen-Gyoza', 'meat_mains', 'dinner', 15, 18, 11, 'pan-fried'),

  // --- fish_seafood (20) ---
  B(`ساشيمي بالسلمون ${T}`, 'Salmon sashimi', 'Sashimi saumon', 'Sashimi salmón', 'Lachs-Sashimi', 'fish_seafood', 'dinner', 20, 0, 8, 'raw'),
  B(`ساشيمي بالتونة ${T}`, 'Tuna sashimi', 'Sashimi thon', 'Sashimi atún', 'Thunfisch-Sashimi', 'fish_seafood', 'dinner', 22, 0, 6, 'raw'),
  B(`ساشيمي بالماكريل ${T}`, 'Mackerel sashimi', 'Sashimi maquereau', 'Sashimi caballa', 'Makrelen-Sashimi', 'fish_seafood', 'dinner', 19, 0, 7, 'raw'),
  B(`ساشيمي بالروبيان ${T}`, 'Shrimp sashimi', 'Sashimi crevettes', 'Sashimi camarones', 'Garnelen-Sashimi', 'fish_seafood', 'dinner', 18, 0, 5, 'raw'),
  B(`ساشيمي بالسمك ${T}`, 'Fish sashimi', 'Sashimi poisson', 'Sashimi pescado', 'Fisch-Sashimi', 'fish_seafood', 'dinner', 20, 0, 6, 'raw'),
  B(`ساشيمي بالزنجبيل ${T}`, 'Ginger sashimi', 'Sashimi gingembre', 'Sashimi jengibre', 'Ingwer-Sashimi', 'fish_seafood', 'dinner', 19, 1, 6, 'raw'),
  B(`ساشيمي بالكزبرة ${T}`, 'Cilantro sashimi', 'Sashimi coriandre', 'Sashimi cilantro', 'Koriander-Sashimi', 'fish_seafood', 'dinner', 19, 1, 6, 'raw'),
  B(`ساشيمي بالليمون ${T}`, 'Lemon sashimi', 'Sashimi citron', 'Sashimi limón', 'Zitronen-Sashimi', 'fish_seafood', 'dinner', 19, 1, 6, 'raw'),
  B(`ساشيمي بالفلفل ${T}`, 'Pepper sashimi', 'Sashimi poivre', 'Sashimi pimienta', 'Pfeffer-Sashimi', 'fish_seafood', 'dinner', 19, 1, 6, 'raw'),
  B(`ساشيمي بالكاري ${T}`, 'Curry sashimi', 'Sashimi curry', 'Sashimi curry', 'Curry-Sashimi', 'fish_seafood', 'dinner', 20, 1, 7, 'raw'),
  B(`ساشيمي بالطماطم ${T}`, 'Tomato sashimi', 'Sashimi tomate', 'Sashimi tomate', 'Tomaten-Sashimi', 'fish_seafood', 'dinner', 19, 2, 6, 'raw'),
  B(`ساشيمي بالفطر ${T}`, 'Mushroom sashimi', 'Sashimi champignons', 'Sashimi hongos', 'Pilz-Sashimi', 'fish_seafood', 'dinner', 18, 2, 5, 'raw'),
  B(`ساشيمي بالذرة ${T}`, 'Corn sashimi', 'Sashimi mais', 'Sashimi maíz', 'Mais-Sashimi', 'fish_seafood', 'dinner', 18, 3, 5, 'raw'),
  B(`ساشيمي بالبطاطس ${T}`, 'Potato sashimi', 'Sashimi pomme de terre', 'Sashimi papa', 'Kartoffel-Sashimi', 'fish_seafood', 'dinner', 19, 2, 6, 'raw'),
  B(`ساشيمي بالجزر ${T}`, 'Carrot sashimi', 'Sashimi carotte', 'Sashimi zanahoria', 'Karotten-Sashimi', 'fish_seafood', 'dinner', 18, 3, 5, 'raw'),
  B(`ساشيمي بالسبانخ ${T}`, 'Spinach sashimi', 'Sashimi epinards', 'Sashimi espinacas', 'Spinat-Sashimi', 'fish_seafood', 'dinner', 18, 3, 5, 'raw'),
  B(`ساشيمي بالبروكلي ${T}`, 'Broccoli sashimi', 'Sashimi brocoli', 'Sashimi brócoli', 'Brokkoli-Sashimi', 'fish_seafood', 'dinner', 18, 3, 5, 'raw'),
  B(`ساشيمي بالبازلاء ${T}`, 'Pea sashimi', 'Sashimi petits pois', 'Sashimi guisantes', 'Erbsen-Sashimi', 'fish_seafood', 'dinner', 18, 4, 5, 'raw'),
  B(`ساشيمي بالخضار المشكلة ${T}`, 'Mixed vegetable sashimi', 'Sashimi legumes varies', 'Sashimi verduras mixtas', 'Gemüse-Sashimi', 'fish_seafood', 'dinner', 17, 5, 4, 'raw'),
  B(`ساشيمي بالموز ${T}`, 'Banana sashimi', 'Sashimi banane', 'Sashimi plátano', 'Bananen-Sashimi', 'fish_seafood', 'snacks', 16, 6, 4, 'raw'),
];
