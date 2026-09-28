// Chinese base part 6 of 6: rice_cakes_sweets (12) + street_snacks (15) + condiments_sauces (10) + beverages (7) = 44 rows.
// Halal notes: all dishes are plant-based or use halal protein. No alcohol.
import { B, T } from './rows.mjs';

export default [
  // --- rice_cakes_sweets (12) ---
  B(`نيان غاو ${T}`, 'New Year rice cake', 'Gateau de riz du Nouvel An', 'Pastel de arroz de Año Nuevo', 'Neujahrs-Reiskuchen', 'rice_cakes_sweets', 'snacks', 6, 28, 4, 'steamed'),
  B(`نيان غاو بالموز ${T}`, 'Banana New Year cake', 'Gateau de riz banane', 'Pastel de arroz plátano', 'Bananen-Neujahrskuchen', 'rice_cakes_sweets', 'snacks', 7, 26, 5, 'steamed'),
  B(`نيان غاو بجوز الهند ${T}`, 'Coconut New Year cake', 'Gateau de riz noix de coco', 'Pastel de arroz coco', 'Kokosnuss-Neujahrskuchen', 'rice_cakes_sweets', 'snacks', 6, 27, 4, 'steamed'),
  B(`نيان غاو بالزنجبيل ${T}`, 'Ginger New Year cake', 'Gateau de riz gingembre', 'Pastel de arroz jengibre', 'Ingwer-Neujahrskuchen', 'rice_cakes_sweets', 'snacks', 7, 25, 5, 'steamed'),
  B(`نيان غاو بالثوم ${T}`, 'Garlic New Year cake', 'Gateau de riz ail', 'Pastel de arroz ajo', 'Knoblauch-Neujahrskuchen', 'rice_cakes_sweets', 'snacks', 6, 26, 4, 'steamed'),
  B(`نيان غاو بالبصل ${T}`, 'Onion New Year cake', 'Gateau de riz oignon', 'Pastel de arroz cebolla', 'Zwiebel-Neujahrskuchen', 'rice_cakes_sweets', 'snacks', 7, 24, 5, 'steamed'),
  B(`نيان غاو بالكزبرة ${T}`, 'Cilantro New Year cake', 'Gateau de riz coriandre', 'Pastel de arroz cilantro', 'Koriander-Neujahrskuchen', 'rice_cakes_sweets', 'snacks', 6, 25, 4, 'steamed'),
  B(`نيان غاو بالليمون ${T}`, 'Lemon New Year cake', 'Gateau de riz citron', 'Pastel de arroz limón', 'Zitronen-Neujahrskuchen', 'rice_cakes_sweets', 'snacks', 7, 23, 5, 'steamed'),
  B(`نيان غاو بالفلفل ${T}`, 'Pepper New Year cake', 'Gateau de riz poivre', 'Pastel de arroz pimienta', 'Pfeffer-Neujahrskuchen', 'rice_cakes_sweets', 'snacks', 6, 24, 4, 'steamed'),
  B(`نيان غاو بالكاري ${T}`, 'Curry New Year cake', 'Gateau de riz curry', 'Pastel de arroz curry', 'Curry-Neujahrskuchen', 'rice_cakes_sweets', 'snacks', 7, 25, 5, 'steamed'),
  B(`نيان غاو بالطماطم ${T}`, 'Tomato New Year cake', 'Gateau de riz tomate', 'Pastel de arroz tomate', 'Tomaten-Neujahrskuchen', 'rice_cakes_sweets', 'snacks', 6, 26, 4, 'steamed'),
  B(`نيان غاو بالفطر ${T}`, 'Mushroom New Year cake', 'Gateau de riz champignons', 'Pastel de arroz hongos', 'Pilz-Neujahrskuchen', 'rice_cakes_sweets', 'snacks', 7, 24, 5, 'steamed'),

  // --- street_snacks (15) ---
  B(`شاو ماي ${T}`, 'Shumai dumplings', 'Raviolis shumai', 'Empanadillas shumai', 'Shumai-Ravioli', 'street_snacks', 'snacks', 12, 18, 6, 'steamed'),
  B(`شاو ماي بالدجاج ${T}`, 'Chicken shumai', 'Raviolis shumai au poulet', 'Empanadillas shumai de pollo', 'Hähnchen-Shumai', 'street_snacks', 'snacks', 13, 17, 7, 'steamed'),
  B(`شاو ماي باللحم ${T}`, 'Beef shumai', 'Raviolis shumai au boeuf', 'Empanadillas shumai de ternera', 'Rind-Shumai', 'street_snacks', 'snacks', 14, 16, 8, 'steamed'),
  B(`شاو ماي بالروبيان ${T}`, 'Shrimp shumai', 'Raviolis shumai aux crevettes', 'Empanadillas shumai de camarones', 'Garnelen-Shumai', 'street_snacks', 'snacks', 13, 17, 7, 'steamed'),
  B(`شاو ماي بالخضار ${T}`, 'Vegetable shumai', 'Raviolis shumai aux legumes', 'Empanadillas shumai de verduras', 'Gemüse-Shumai', 'street_snacks', 'snacks', 8, 20, 4, 'steamed'),
  B(`شاو ماي بالفطر ${T}`, 'Mushroom shumai', 'Raviolis shumai champignons', 'Empanadillas shumai de hongos', 'Pilz-Shumai', 'street_snacks', 'snacks', 9, 19, 5, 'steamed'),
  B(`شاو ماي بالبصل ${T}`, 'Onion shumai', 'Raviolis shumai oignon', 'Empanadillas shumai de cebolla', 'Zwiebel-Shumai', 'street_snacks', 'snacks', 10, 18, 6, 'steamed'),
  B(`شاو ماي بالثوم ${T}`, 'Garlic shumai', 'Raviolis shumai ail', 'Empanadillas shumai de ajo', 'Knoblauch-Shumai', 'street_snacks', 'snacks', 11, 17, 7, 'steamed'),
  B(`شاو ماي بالزنجبيل ${T}`, 'Ginger shumai', 'Raviolis shumai gingembre', 'Empanadillas shumai de jengibre', 'Ingwer-Shumai', 'street_snacks', 'snacks', 12, 16, 8, 'steamed'),
  B(`شاو ماي بالكزبرة ${T}`, 'Cilantro shumai', 'Raviolis shumai coriandre', 'Empanadillas shumai de cilantro', 'Koriander-Shumai', 'street_snacks', 'snacks', 11, 17, 7, 'steamed'),
  B(`شاو ماي بالليمون ${T}`, 'Lemon shumai', 'Raviolis shumai citron', 'Empanadillas shumai de limón', 'Zitronen-Shumai', 'street_snacks', 'snacks', 12, 15, 8, 'steamed'),
  B(`شاو ماي بالفلفل ${T}`, 'Pepper shumai', 'Raviolis shumai poivre', 'Empanadillas shumai de pimienta', 'Pfeffer-Shumai', 'street_snacks', 'snacks', 11, 16, 7, 'steamed'),
  B(`شاو ماي بالكاري ${T}`, 'Curry shumai', 'Raviolis shumai curry', 'Empanadillas shumai de curry', 'Curry-Shumai', 'street_snacks', 'snacks', 13, 15, 9, 'steamed'),
  B(`شاو ماي بالطماطم ${T}`, 'Tomato shumai', 'Raviolis shumai tomate', 'Empanadillas shumai de tomate', 'Tomaten-Shumai', 'street_snacks', 'snacks', 12, 16, 8, 'steamed'),
  B(`شاو ماي بالدجاج واللحم ${T}`, 'Chicken beef shumai', 'Raviolis shumai poulet boeuf', 'Empanadillas shumai pollo ternera', 'Huhn-Rind-Shumai', 'street_snacks', 'snacks', 15, 14, 10, 'steamed'),

  // --- condiments_sauces (10) ---
  B(`تشو تشو جيانغ ${T}`, 'Soy sauce', 'Sauce soja', 'Salsa de soja', 'Sojasauce', 'condiments_sauces', 'snacks', 8, 10, 2, 'fermented'),
  B(`تشو تشو جيانغ بالزنجبيل ${T}`, 'Ginger soy sauce', 'Sauce soja gingembre', 'Salsa de soja jengibre', 'Sojasauce mit Ingwer', 'condiments_sauces', 'snacks', 7, 11, 1, 'fermented'),
  B(`تشو تشو جيانغ بالثوم ${T}`, 'Garlic soy sauce', 'Sauce soja ail', 'Salsa de soja ajo', 'Sojasauce mit Knoblauch', 'condiments_sauces', 'snacks', 6, 12, 1, 'fermented'),
  B(`تشو تشو جيانغ بالبصل ${T}`, 'Onion soy sauce', 'Sauce soja oignon', 'Salsa de soja cebolla', 'Sojasauce mit Zwiebel', 'condiments_sauces', 'snacks', 7, 10, 2, 'fermented'),
  B(`تشو تشو جيانغ بالكزبرة ${T}`, 'Cilantro soy sauce', 'Sauce soja coriandre', 'Salsa de soja cilantro', 'Sojasauce mit Koriander', 'condiments_sauces', 'snacks', 6, 11, 1, 'fermented'),
  B(`تشو تشو جيانغ بالليمون ${T}`, 'Lemon soy sauce', 'Sauce soja citron', 'Salsa de soja limón', 'Sojasauce mit Zitrone', 'condiments_sauces', 'snacks', 7, 9, 2, 'fermented'),
  B(`تشو تشو جيانغ بالفلفل ${T}`, 'Pepper soy sauce', 'Sauce soja poivre', 'Salsa de soja pimienta', 'Sojasauce mit Pfeffer', 'condiments_sauces', 'snacks', 6, 10, 1, 'fermented'),
  B(`تشو تشو جيانغ بالكاري ${T}`, 'Curry soy sauce', 'Sauce soja curry', 'Salsa de soja curry', 'Sojasauce mit Curry', 'condiments_sauces', 'snacks', 8, 9, 3, 'fermented'),
  B(`تشو تشو جيانغ بالطماطم ${T}`, 'Tomato soy sauce', 'Sauce soja tomate', 'Salsa de soja tomate', 'Sojasauce mit Tomate', 'condiments_sauces', 'snacks', 7, 10, 2, 'fermented'),
  B(`تشو تشو جيانغ بالفطر ${T}`, 'Mushroom soy sauce', 'Sauce soja champignons', 'Salsa de soja hongos', 'Sojasauce mit Pilzen', 'condiments_sauces', 'snacks', 8, 8, 3, 'fermented'),

  // --- beverages (7) ---
  B(`تشا ${T}`, 'Tea', 'The', 'Té', 'Tee', 'beverages', 'snacks', 1, 2, 0, 'brewed'),
  B(`تشا بالزنجبيل ${T}`, 'Ginger tea', 'The gingembre', 'Té jengibre', 'Ingwer-Tee', 'beverages', 'snacks', 2, 3, 0, 'brewed'),
  B(`تشا بالثوم ${T}`, 'Garlic tea', 'The ail', 'Té ajo', 'Knoblauch-Tee', 'beverages', 'snacks', 1, 2, 0, 'brewed'),
  B(`تشا بالبصل ${T}`, 'Onion tea', 'The oignon', 'Té cebolla', 'Zwiebel-Tee', 'beverages', 'snacks', 2, 1, 0, 'brewed'),
  B(`تشا بالكزبرة ${T}`, 'Cilantro tea', 'The coriandre', 'Té cilantro', 'Koriander-Tee', 'beverages', 'snacks', 1, 2, 0, 'brewed'),
  B(`تشا بالليمون ${T}`, 'Lemon tea', 'The citron', 'Té limón', 'Zitronen-Tee', 'beverages', 'snacks', 2, 1, 0, 'brewed'),
  B(`تشا بالفلفل ${T}`, 'Pepper tea', 'The poivre', 'Té pimienta', 'Pfeffer-Tee', 'beverages', 'snacks', 1, 2, 0, 'brewed'),
];
