// Japanese base part 1 of 6: breakfast_items (15) + rice_dishes (20) = 35 rows.
// Halal notes: all pork dishes adapted to chicken/beef/seafood. Sake replaced with
// dashi broth. Mirin replaced with sweet rice vinegar blend. No alcohol in any dish.
import { B, T } from './rows.mjs';

export default [
  // --- breakfast_items (15) ---
  B(`أونيجيري بالماكريل ${T}`, 'Salmon onigiri', 'Boule de riz au saumon', 'Bola de arroz con salmón', 'Lachs-Onigiri', 'breakfast_items', 'breakfast', 8, 28, 4, 'steamed'),
  B(`أونيجيري بالتونة ${T}`, 'Tuna onigiri', 'Boule de riz au thon', 'Bola de arroz con atún', 'Thunfisch-Onigiri', 'breakfast_items', 'breakfast', 10, 26, 5, 'steamed'),
  B(`أونيجيري بالسلمون ${T}`, 'Salmon onigiri', 'Boule de riz au saumon', 'Bola de arroz con salmón', 'Lachs-Onigiri', 'breakfast_items', 'breakfast', 9, 27, 4, 'steamed'),
  B(`أونيجيري بالخضار ${T}`, 'Vegetable onigiri', 'Boule de riz aux legumes', 'Bola de arroz con verduras', 'Gemüse-Onigiri', 'breakfast_items', 'breakfast', 5, 30, 3, 'steamed'),
  B(`أونيجيري بالفطر ${T}`, 'Mushroom onigiri', 'Boule de riz aux champignons', 'Bola de arroz con hongos', 'Pilz-Onigiri', 'breakfast_items', 'breakfast', 6, 29, 3, 'steamed'),
  B(`أونيجيري بالبيض ${T}`, 'Egg onigiri', 'Boule de riz aux oeufs', 'Bola de arroz con huevo', 'Eier-Onigiri', 'breakfast_items', 'breakfast', 8, 27, 5, 'steamed'),
  B(`أونيجيري بالدجاج ${T}`, 'Chicken onigiri', 'Boule de riz au poulet', 'Bola de arroz con pollo', 'Huhn-Onigiri', 'breakfast_items', 'breakfast', 9, 26, 5, 'steamed'),
  B(`أونيجيري باللحم ${T}`, 'Beef onigiri', 'Boule de riz au boeuf', 'Bola de arroz con ternera', 'Rind-Onigiri', 'breakfast_items', 'breakfast', 11, 24, 6, 'steamed'),
  B(`أونيجيري بالروبيان ${T}`, 'Shrimp onigiri', 'Boule de riz aux crevettes', 'Bola de arroz con camarones', 'Garnelen-Onigiri', 'breakfast_items', 'breakfast', 10, 25, 5, 'steamed'),
  B(`أونيجيري بالسمك ${T}`, 'Fish onigiri', 'Boule de riz au poisson', 'Bola de arroz con pescado', 'Fisch-Onigiri', 'breakfast_items', 'breakfast', 9, 26, 4, 'steamed'),
  B(`أونيجيري بالزنجبيل ${T}`, 'Ginger onigiri', 'Boule de riz gingembre', 'Bola de arroz jengibre', 'Ingwer-Onigiri', 'breakfast_items', 'breakfast', 5, 29, 3, 'steamed'),
  B(`أونيجيري بالكزبرة ${T}`, 'Cilantro onigiri', 'Boule de riz coriandre', 'Bola de arroz cilantro', 'Koriander-Onigiri', 'breakfast_items', 'breakfast', 5, 29, 3, 'steamed'),
  B(`أونيجيري بالليمون ${T}`, 'Lemon onigiri', 'Boule de riz citron', 'Bola de arroz limón', 'Zitronen-Onigiri', 'breakfast_items', 'breakfast', 5, 28, 3, 'steamed'),
  B(`أونيجيري بالفلفل ${T}`, 'Pepper onigiri', 'Boule de riz poivre', 'Bola de arroz pimienta', 'Pfeffer-Onigiri', 'breakfast_items', 'breakfast', 5, 28, 3, 'steamed'),
  B(`أونيجيري بالكاري ${T}`, 'Curry onigiri', 'Boule de riz curry', 'Bola de arroz curry', 'Curry-Onigiri', 'breakfast_items', 'breakfast', 6, 27, 4, 'steamed'),

  // --- rice_dishes (20) ---
  B(`تشاكان بالدجاج ${T}`, 'Chicken chazuke', 'Chazuke au poulet', 'Chazuke de pollo', 'Huhn-Chazuke', 'rice_dishes', 'lunch', 10, 25, 5, 'simmered'),
  B(`تشاكان بالسمك ${T}`, 'Fish chazuke', 'Chazuke au poisson', 'Chazuke de pescado', 'Fisch-Chazuke', 'rice_dishes', 'lunch', 11, 24, 6, 'simmered'),
  B(`تشاكان بالروبيان ${T}`, 'Shrimp chazuke', 'Chazuke aux crevettes', 'Chazuke de camarones', 'Garnelen-Chazuke', 'rice_dishes', 'lunch', 10, 25, 5, 'simmered'),
  B(`تشاكان بالخضار ${T}`, 'Vegetable chazuke', 'Chazuke aux legumes', 'Chazuke de verduras', 'Gemüse-Chazuke', 'rice_dishes', 'lunch', 6, 28, 3, 'simmered'),
  B(`تشاكان بالفطر ${T}`, 'Mushroom chazuke', 'Chazuke aux champignons', 'Chazuke de hongos', 'Pilz-Chazuke', 'rice_dishes', 'lunch', 7, 27, 4, 'simmered'),
  B(`تشاكان بالبيض ${T}`, 'Egg chazuke', 'Chazuke aux oeufs', 'Chazuke de huevo', 'Eier-Chazuke', 'rice_dishes', 'lunch', 9, 25, 6, 'simmered'),
  B(`تشاكان باللحم ${T}`, 'Beef chazuke', 'Chazuke au boeuf', 'Chazuke de ternera', 'Rind-Chazuke', 'rice_dishes', 'lunch', 12, 23, 7, 'simmered'),
  B(`تشاكان بالزنجبيل ${T}`, 'Ginger chazuke', 'Chazuke gingembre', 'Chazuke jengibre', 'Ingwer-Chazuke', 'rice_dishes', 'lunch', 6, 27, 3, 'simmered'),
  B(`تشاكان بالكزبرة ${T}`, 'Cilantro chazuke', 'Chazuke coriandre', 'Chazuke cilantro', 'Koriander-Chazuke', 'rice_dishes', 'lunch', 6, 27, 3, 'simmered'),
  B(`تشاكان بالليمون ${T}`, 'Lemon chazuke', 'Chazuke citron', 'Chazuke limón', 'Zitronen-Chazuke', 'rice_dishes', 'lunch', 6, 26, 3, 'simmered'),
  B(`تشاكان بالفلفل ${T}`, 'Pepper chazuke', 'Chazuke poivre', 'Chazuke pimienta', 'Pfeffer-Chazuke', 'rice_dishes', 'lunch', 6, 26, 3, 'simmered'),
  B(`تشاكان بالكاري ${T}`, 'Curry chazuke', 'Chazuke curry', 'Chazuke curry', 'Curry-Chazuke', 'rice_dishes', 'lunch', 7, 25, 4, 'simmered'),
  B(`تشاكان بالطماطم ${T}`, 'Tomato chazuke', 'Chazuke tomate', 'Chazuke tomate', 'Tomaten-Chazuke', 'rice_dishes', 'lunch', 6, 26, 3, 'simmered'),
  B(`تشاكان بالذرة ${T}`, 'Corn chazuke', 'Chazuke mais', 'Chazuke maíz', 'Mais-Chazuke', 'rice_dishes', 'lunch', 6, 27, 3, 'simmered'),
  B(`تشاكان بالبطاطس ${T}`, 'Potato chazuke', 'Chazuke pomme de terre', 'Chazuke papa', 'Kartoffel-Chazuke', 'rice_dishes', 'lunch', 7, 25, 4, 'simmered'),
  B(`تشاكان بالجزر ${T}`, 'Carrot chazuke', 'Chazuke carotte', 'Chazuke zanahoria', 'Karotten-Chazuke', 'rice_dishes', 'lunch', 6, 26, 3, 'simmered'),
  B(`تشاكان بالسبانخ ${T}`, 'Spinach chazuke', 'Chazuke epinards', 'Chazuke espinacas', 'Spinat-Chazuke', 'rice_dishes', 'lunch', 6, 25, 3, 'simmered'),
  B(`تشاكان بالبروكلي ${T}`, 'Broccoli chazuke', 'Chazuke brocoli', 'Chazuke brócoli', 'Brokkoli-Chazuke', 'rice_dishes', 'lunch', 6, 25, 3, 'simmered'),
  B(`تشاكان بالبازلاء ${T}`, 'Pea chazuke', 'Chazuke petits pois', 'Chazuke guisantes', 'Erbsen-Chazuke', 'rice_dishes', 'lunch', 7, 24, 4, 'simmered'),
  B(`تشاكان بالخضار المشكلة ${T}`, 'Mixed vegetable chazuke', 'Chazuke legumes varies', 'Chazuke verduras mixtas', 'Gemüse-Chazuke', 'rice_dishes', 'lunch', 6, 26, 3, 'simmered'),
];
