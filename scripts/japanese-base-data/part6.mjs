// Japanese base part 6 of 6: rice_cakes_sweets (12) + street_snacks (15) + condiments_sauces (10) + beverages (7) = 44 rows.
// Halal notes: all dishes are plant-based or use halal protein. No alcohol.
import { B, T } from './rows.mjs';

export default [
  // --- rice_cakes_sweets (12) ---
  B(`موتشي بالفول ${T}`, 'Red bean mochi', 'Mochi haricots rouges', 'Mochi frijoles rojos', 'Rote-Bohnen-Mochi', 'rice_cakes_sweets', 'snacks', 6, 26, 4, 'steamed'),
  B(`موتشي بالموز ${T}`, 'Rice cake banana mochi', 'Mochi banane riz', 'Mochi plátano arroz', 'Reis-Kuchen Bananen-Mochi', 'rice_cakes_sweets', 'snacks', 5, 27, 3, 'steamed'),
  B(`موتشي بجوز الهند ${T}`, 'Rice cake coconut mochi', 'Mochi riz noix de coco', 'Mochi arroz coco', 'Reis-Kuchen Kokosnuss-Mochi', 'rice_cakes_sweets', 'snacks', 4, 28, 2, 'steamed'),
  B(`موتشي بالزنجبيل ${T}`, 'Rice cake ginger mochi', 'Mochi riz gingembre', 'Mochi arroz jengibre', 'Reis-Kuchen Ingwer-Mochi', 'rice_cakes_sweets', 'snacks', 4, 27, 3, 'steamed'),
  B(`موتشي بالثوم ${T}`, 'Rice cake garlic mochi', 'Mochi riz ail', 'Mochi arroz ajo', 'Reis-Kuchen Knoblauch-Mochi', 'rice_cakes_sweets', 'snacks', 3, 28, 2, 'steamed'),
  B(`موتشي بالبصل ${T}`, 'Rice cake onion mochi', 'Mochi riz oignon', 'Mochi arroz cebolla', 'Reis-Kuchen Zwiebel-Mochi', 'rice_cakes_sweets', 'snacks', 4, 26, 3, 'steamed'),
  B(`موتشي بالكزبرة ${T}`, 'Rice cake cilantro mochi', 'Mochi riz coriandre', 'Mochi arroz cilantro', 'Reis-Kuchen Koriander-Mochi', 'rice_cakes_sweets', 'snacks', 3, 27, 2, 'steamed'),
  B(`موتشي بالليمون ${T}`, 'Rice cake lemon mochi', 'Mochi riz citron', 'Mochi arroz limón', 'Reis-Kuchen Zitronen-Mochi', 'rice_cakes_sweets', 'snacks', 4, 25, 3, 'steamed'),
  B(`موتشي بالفلفل ${T}`, 'Rice cake pepper mochi', 'Mochi riz poivre', 'Mochi arroz pimienta', 'Reis-Kuchen Pfeffer-Mochi', 'rice_cakes_sweets', 'snacks', 3, 26, 2, 'steamed'),
  B(`موتشي بالكاري ${T}`, 'Rice cake curry mochi', 'Mochi riz curry', 'Mochi arroz curry', 'Reis-Kuchen Curry-Mochi', 'rice_cakes_sweets', 'snacks', 4, 27, 3, 'steamed'),
  B(`موتشي بالطماطم ${T}`, 'Tomato mochi', 'Mochi tomate', 'Mochi tomate', 'Tomaten-Mochi', 'rice_cakes_sweets', 'snacks', 3, 28, 2, 'steamed'),
  B(`موتشي بالفطر ${T}`, 'Mushroom mochi', 'Mochi champignons', 'Mochi hongos', 'Pilz-Mochi', 'rice_cakes_sweets', 'snacks', 4, 26, 3, 'steamed'),

  // --- street_snacks (15) ---
  B(`تاكوياكي بالدجاج ${T}`, 'Chicken takoyaki', 'Takoyaki poulet', 'Takoyaki pollo', 'Huhn-Takoyaki', 'street_snacks', 'snacks', 12, 18, 8, 'griddled'),
  B(`تاكوياكي باللحم ${T}`, 'Beef takoyaki', 'Takoyaki boeuf', 'Takoyaki ternera', 'Rind-Takoyaki', 'street_snacks', 'snacks', 14, 16, 10, 'griddled'),
  B(`تاكوياكي بالروبيان ${T}`, 'Shrimp takoyaki', 'Takoyaki crevettes', 'Takoyaki camarones', 'Garnelen-Takoyaki', 'street_snacks', 'snacks', 13, 17, 9, 'griddled'),
  B(`تاكوياكي بالخضار ${T}`, 'Vegetable takoyaki', 'Takoyaki legumes', 'Takoyaki verduras', 'Gemüse-Takoyaki', 'street_snacks', 'snacks', 7, 22, 5, 'griddled'),
  B(`تاكوياكي بالفطر ${T}`, 'Mushroom takoyaki', 'Takoyaki champignons', 'Takoyaki hongos', 'Pilz-Takoyaki', 'street_snacks', 'snacks', 8, 21, 6, 'griddled'),
  B(`تاكوياكي بالبيض ${T}`, 'Egg takoyaki', 'Takoyaki oeufs', 'Takoyaki huevo', 'Eier-Takoyaki', 'street_snacks', 'snacks', 10, 18, 9, 'griddled'),
  B(`تاكوياكي بالزنجبيل ${T}`, 'Ginger takoyaki', 'Takoyaki gingembre', 'Takoyaki jengibre', 'Ingwer-Takoyaki', 'street_snacks', 'snacks', 11, 17, 9, 'griddled'),
  B(`تاكوياكي بالكزبرة ${T}`, 'Cilantro takoyaki', 'Takoyaki coriandre', 'Takoyaki cilantro', 'Koriander-Takoyaki', 'street_snacks', 'snacks', 11, 17, 9, 'griddled'),
  B(`تاكوياكي بالليمون ${T}`, 'Lemon takoyaki', 'Takoyaki citron', 'Takoyaki limón', 'Zitronen-Takoyaki', 'street_snacks', 'snacks', 11, 16, 9, 'griddled'),
  B(`تاكوياكي بالفلفل ${T}`, 'Pepper takoyaki', 'Takoyaki poivre', 'Takoyaki pimienta', 'Pfeffer-Takoyaki', 'street_snacks', 'snacks', 11, 16, 9, 'griddled'),
  B(`تاكوياكي بالكاري ${T}`, 'Curry takoyaki', 'Takoyaki curry', 'Takoyaki curry', 'Curry-Takoyaki', 'street_snacks', 'snacks', 12, 17, 10, 'griddled'),
  B(`تاكوياكي بالطماطم ${T}`, 'Tomato takoyaki', 'Takoyaki tomate', 'Takoyaki tomate', 'Tomaten-Takoyaki', 'street_snacks', 'snacks', 11, 18, 8, 'griddled'),
  B(`تاكوياكي بالذرة ${T}`, 'Corn takoyaki', 'Takoyaki mais', 'Takoyaki maíz', 'Mais-Takoyaki', 'street_snacks', 'snacks', 10, 19, 7, 'griddled'),
  B(`تاكوياكي بالبطاطس ${T}`, 'Potato takoyaki', 'Takoyaki pomme de terre', 'Takoyaki papa', 'Kartoffel-Takoyaki', 'street_snacks', 'snacks', 12, 16, 10, 'griddled'),
  B(`تاكوياكي بالجزر ${T}`, 'Carrot takoyaki', 'Takoyaki carotte', 'Takoyaki zanahoria', 'Karotten-Takoyaki', 'street_snacks', 'snacks', 11, 17, 9, 'griddled'),

  // --- condiments_sauces (10) ---
  B(`شويو ${T}`, 'Soy sauce', 'Sauce soja', 'Salsa de soja', 'Sojasauce', 'condiments_sauces', 'snacks', 8, 10, 2, 'fermented'),
  B(`شويو بالزنجبيل ${T}`, 'Ginger soy sauce', 'Sauce soja gingembre', 'Salsa de soja jengibre', 'Sojasauce mit Ingwer', 'condiments_sauces', 'snacks', 7, 11, 1, 'fermented'),
  B(`شويو بالثوم ${T}`, 'Garlic soy sauce', 'Sauce soja ail', 'Salsa de soja ajo', 'Sojasauce mit Knoblauch', 'condiments_sauces', 'snacks', 6, 12, 1, 'fermented'),
  B(`شويو بالبصل ${T}`, 'Onion soy sauce', 'Sauce soja oignon', 'Salsa de soja cebolla', 'Sojasauce mit Zwiebel', 'condiments_sauces', 'snacks', 7, 10, 2, 'fermented'),
  B(`شويو بالكزبرة ${T}`, 'Cilantro soy sauce', 'Sauce soja coriandre', 'Salsa de soja cilantro', 'Sojasauce mit Koriander', 'condiments_sauces', 'snacks', 6, 11, 1, 'fermented'),
  B(`شويو بالليمون ${T}`, 'Lemon soy sauce', 'Sauce soja citron', 'Salsa de soja limón', 'Sojasauce mit Zitrone', 'condiments_sauces', 'snacks', 7, 9, 2, 'fermented'),
  B(`شويو بالفلفل ${T}`, 'Pepper soy sauce', 'Sauce soja poivre', 'Salsa de soja pimienta', 'Sojasauce mit Pfeffer', 'condiments_sauces', 'snacks', 6, 10, 1, 'fermented'),
  B(`شويو بالكاري ${T}`, 'Curry soy sauce', 'Sauce soja curry', 'Salsa de soja curry', 'Sojasauce mit Curry', 'condiments_sauces', 'snacks', 8, 9, 3, 'fermented'),
  B(`شويو بالطماطم ${T}`, 'Tomato soy sauce', 'Sauce soja tomate', 'Salsa de soja tomate', 'Sojasauce mit Tomate', 'condiments_sauces', 'snacks', 7, 10, 2, 'fermented'),
  B(`شويو بالفطر ${T}`, 'Mushroom soy sauce', 'Sauce soja champignons', 'Salsa de soja hongos', 'Sojasauce mit Pilzen', 'condiments_sauces', 'snacks', 8, 8, 3, 'fermented'),

  // --- beverages (7) ---
  B(`شاي أخضر ${T}`, 'Green tea', 'The vert', 'Té verde', 'Grüner Tee', 'beverages', 'snacks', 1, 2, 0, 'brewed'),
  B(`شاي أخضر بالزنجبيل ${T}`, 'Ginger green tea', 'The vert gingembre', 'Té verde jengibre', 'Grüner Tee mit Ingwer', 'beverages', 'snacks', 2, 1, 0, 'brewed'),
  B(`شاي أخضر بالثوم ${T}`, 'Garlic green tea', 'The vert ail', 'Té verde ajo', 'Grüner Tee mit Knoblauch', 'beverages', 'snacks', 1, 2, 0, 'brewed'),
  B(`شاي أخضر بالبصل ${T}`, 'Onion green tea', 'The vert oignon', 'Té verde cebolla', 'Grüner Tee mit Zwiebel', 'beverages', 'snacks', 2, 1, 0, 'brewed'),
  B(`شاي أخضر بالكزبرة ${T}`, 'Cilantro green tea', 'The vert coriandre', 'Té verde cilantro', 'Grüner Tee mit Koriander', 'beverages', 'snacks', 1, 2, 0, 'brewed'),
  B(`شاي أخضر بالليمون ${T}`, 'Lemon green tea', 'The vert citron', 'Té verde limón', 'Grüner Tee mit Zitrone', 'beverages', 'snacks', 2, 1, 0, 'brewed'),
  B(`شاي أخضر بالفلفل ${T}`, 'Pepper green tea', 'The vert poivre', 'Té verde pimienta', 'Grüner Tee mit Pfeffer', 'beverages', 'snacks', 1, 2, 0, 'brewed'),
];
