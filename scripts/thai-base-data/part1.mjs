// Thai base part 1 of 9: breakfast_items (8) + rice_dishes (12) = 20 rows.
// Cross-checked against scripts/thai-200-proposal.json so no name collides.
import { B, T } from './rows.mjs';

export default [
  // --- breakfast_items (8) ---
  B(`خانوم جين مع لحم الدجاج ${T}`, 'Khanom jeen with chicken', 'Khanom jeen au poulet', 'Fideos khanom jeen con pollo', 'Khanom Jeen mit Huhn', 'breakfast_items', 'breakfast', 12, 20, 3, 'boiled'),
  B(`جوك الروبيان ${T}`, 'Jok prawn congee', 'Riz au lait aux crevettes', 'Arroz con camarones', 'Garnelen-Reisbrei', 'breakfast_items', 'breakfast', 9, 18, 2, 'boiled'),
  B(`خانوم كروك ${T}`, 'Khanom krok rice pancakes', 'Pancakes de riz khanom krok', 'Panqueques de arroz khanom krok', 'Reispfannkuchen Khanom Krok', 'breakfast_items', 'breakfast', 4, 27, 7, 'griddled'),
  B(`خانوم كان جين بالدجاج ${T}`, 'Khao kan jin chicken rice soup', 'Soupe de riz au poulet kan jin', 'Sopa de arroz con pollo kan jin', 'Reissuppe mit Huhn Kan Jin', 'breakfast_items', 'breakfast', 8, 20, 2, 'simmered'),
  B(`روتي بالدجاج والصلصة ${T}`, 'Roti with chicken curry', 'Roti au poulet en sauce', 'Roti con pollo en curry', 'Roti mit Huhn-Curry', 'breakfast_items', 'breakfast', 14, 24, 9, 'griddled'),
  B(`أرز مقلي بالدجاج والبيض ${T}`, 'Khao pad gio with chicken and egg', 'Riz frit au poulet et oeuf', 'Arroz frito con pollo y huevo', 'Gebratener Reis mit Huhn und Ei', 'breakfast_items', 'breakfast', 9, 29, 7, 'stir-fried'),
  B(`بيض مقلي بصلصة السمك ${T}`, 'Fried eggs with fish sauce', 'Oeufs frits a la sauce de poisson', 'Huevos fritos con salsa de pescado', 'Gebratene Eier mit Fischsauce', 'breakfast_items', 'breakfast', 13, 2, 11, 'fried'),
  B(`روتي بالموز والحليب المكثف ${T}`, 'Roti with banana and condensed milk', 'Roti a la banane et lait concentre', 'Roti con platano y leche condensada', 'Roti mit Banane und Kondensmilch', 'breakfast_items', 'breakfast', 6, 30, 9, 'griddled'),

  // --- rice_dishes (12) ---
  B(`أرز كاي مان غاي ${T}`, 'Khao man gai', 'Khao man gai au poulet', 'Arroz man gai con pollo', 'Khao Man Gai pochiertes Huhn', 'rice_dishes', 'lunch', 16, 30, 6, 'poached'),
  B(`أرز البط المشوي ${T}`, 'Khao ped yang roast duck rice', 'Riz au canard roti', 'Arroz con pato asado', 'Reis mit Gänsebraten', 'rice_dishes', 'lunch', 17, 29, 9, 'roasted'),
  B(`أرز مقلي بالريحان بالدجاج ${T}`, 'Khao pad krapow gai', 'Riz frit au poulet basilic', 'Arroz frito con pollo y albahaca', 'Gebratener Reis mit Huhn und Basilikum', 'rice_dishes', 'lunch', 13, 30, 9, 'stir-fried'),
  B(`أرز مقلي بالريحان وباللحم ${T}`, 'Khao pad krapow ped', 'Riz frit au boeuf basilic', 'Arroz frito con ternera y albahaca', 'Gebratener Reis mit Rind und Basilikum', 'rice_dishes', 'lunch', 14, 30, 10, 'stir-fried'),
  B(`أرز المورجي ${T}`, 'Khao pad krai mustard greens rice', 'Riz aux jeunes pousses de moutarde', 'Arroz con hojas de mostaza', 'Reis mit Senfkeimen', 'rice_dishes', 'lunch', 6, 31, 5, 'stir-fried'),
  B(`أرز السمك المطبوخ ${T}`, 'Khao pla steamed fish rice', 'Riz au poisson a la vapeur', 'Arroz con pescado al vapor', 'Reis mit gedampftem Fisch', 'rice_dishes', 'lunch', 16, 29, 5, 'steamed'),
  B(`أرز أبيض مبخر ${T}`, 'Khao niao plain steamed rice', 'Riz blanc a la vapeur', 'Arroz blanco al vapor', 'Gedämpfter weißer Reis', 'rice_dishes', 'lunch', 3, 28, 0.5, 'steamed'),
  B(`أرز مالح بالورق ${T}`, 'Khao tao kwa salted rice', 'Riz sale aux feuilles', 'Arroz salado con hojas', 'Gesalzenes Reis mit Blattgemüse', 'rice_dishes', 'lunch', 5, 30, 2, 'steamed'),
  B(`أرز لزج بالمانجو ${T}`, 'Mango sticky rice', 'Riz gluant a la mangue', 'Arroz pegajoso con mango', 'Klebriger Reis mit Mango', 'rice_dishes', 'lunch', 4, 31, 6, 'steamed'),
  B(`أرز بالأناناس بالكاري ${T}`, 'Khao suan pineapple curry rice', 'Riz a l ananas au curry', 'Arroz con piña y curry', 'Ananas-Reis mit Curry', 'rice_dishes', 'lunch', 8, 32, 7, 'simmered'),
  B(`أرز مقلي بالبصل ${T}`, 'Khao neow onion egg fried rice', 'Riz frit oignon et oeuf', 'Arroz frito con cebolla y huevo', 'Gebratener Reis mit Zwiebel und Ei', 'rice_dishes', 'lunch', 7, 31, 7, 'stir-fried'),
  B(`أرز مقلي بسمك الماكريل ${T}`, 'Khao pad pla tu mackerel fried rice', 'Riz frit au maquereau', 'Arroz frito con caballa', 'Gebratener Reis mit Makrelle', 'rice_dishes', 'lunch', 12, 30, 8, 'stir-fried'),
];
