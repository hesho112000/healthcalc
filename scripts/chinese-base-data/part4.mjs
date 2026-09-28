// Chinese base part 4 of 6: meat_mains (18) + fish_seafood (20) = 38 rows.
// Halal notes: all pork dishes adapted to beef/chicken/duck. No alcohol.
import { B, T } from './rows.mjs';

export default [
  // --- meat_mains (18) ---
  B(`تشاو نيو رو ${T}`, 'Stir-fried beef', 'Boeuf frit', 'Ternera salteada', 'Gebratenes Rindfleisch', 'meat_mains', 'dinner', 20, 6, 12, 'stir-fried'),
  B(`تشاو نيو رو بيان ${T}`, 'Stir-fried beef slices', 'Boeuf en tranches frit', 'Ternera en lonchas frita', 'Gebratene Rindfleischscheiben', 'meat_mains', 'dinner', 21, 5, 13, 'stir-fried'),
  B(`تشاو نيو رو سي ${T}`, 'Stir-fried beef shreds', 'Boeuf effiloche frit', 'Ternera deshebrada frita', 'Gebratenes Rindfleisch', 'meat_mains', 'dinner', 20, 6, 12, 'stir-fried'),
  B(`تشاو نيو رو تشوان ${T}`, 'Stir-fried beef rolls', 'Rouleaux de boeuf frits', 'Rollitos de ternera fritos', 'Gebratene Rindfleischrollen', 'meat_mains', 'dinner', 19, 7, 11, 'stir-fried'),
  B(`تشاو نيو رو تو ${T}`, 'Stir-fried beef cubes', 'Boeuf en cubes frit', 'Ternera en cubos frita', 'Gebratene Rindfleischwürfel', 'meat_mains', 'dinner', 21, 5, 13, 'stir-fried'),
  B(`تشاو نيو رو شوان ${T}`, 'Stir-fried beef strips', 'Boeuf en lanieres frit', 'Ternera en tiras frita', 'Gebratene Rindfleischstreifen', 'meat_mains', 'dinner', 20, 6, 12, 'stir-fried'),
  B(`تشاو نيو رو بي ${T}`, 'Stir-fried beef breast', 'Boeuf frit', 'Ternera frita', 'Gebratene Rindfleischbrust', 'meat_mains', 'dinner', 22, 4, 14, 'stir-fried'),
  B(`تشاو نيو رو رو ${T}`, 'Stir-fried beef meat', 'Viande de boeuf frite', 'Carne de ternera frita', 'Gebratenes Rindfleisch', 'meat_mains', 'dinner', 21, 5, 13, 'stir-fried'),
  B(`تشاو نيو رو تشانغ ${T}`, 'Stir-fried beef intestines', 'Intestins de boeuf frits', 'Intestinos de ternera fritos', 'Gebratene Rindfleischdärme', 'meat_mains', 'dinner', 18, 8, 10, 'stir-fried'),
  B(`تشاو نيو رو بالخضار ${T}`, 'Beef with vegetables', 'Boeuf aux legumes', 'Ternera con verduras', 'Rindfleisch mit Gemüse', 'meat_mains', 'dinner', 19, 8, 11, 'stir-fried'),
  B(`تشاو نيو رو بالفطر ${T}`, 'Beef with mushrooms', 'Boeuf aux champignons', 'Ternera con hongos', 'Rindfleisch mit Pilzen', 'meat_mains', 'dinner', 18, 9, 10, 'stir-fried'),
  B(`تشاو نيو رو بالبصل ${T}`, 'Beef with onions', 'Boeuf aux oignons', 'Ternera con cebolla', 'Rindfleisch mit Zwiebeln', 'meat_mains', 'dinner', 20, 6, 12, 'stir-fried'),
  B(`تشاو نيو رو بالثوم ${T}`, 'Beef with garlic', 'Boeuf a l ail', 'Ternera con ajo', 'Rindfleisch mit Knoblauch', 'meat_mains', 'dinner', 21, 5, 13, 'stir-fried'),
  B(`تشاو نيو رو بالزنجبيل ${T}`, 'Beef with ginger', 'Boeuf au gingembre', 'Ternera con jengibre', 'Rindfleisch mit Ingwer', 'meat_mains', 'dinner', 20, 6, 12, 'stir-fried'),
  B(`تشاو نيو رو بالكزبرة ${T}`, 'Beef with cilantro', 'Boeuf coriandre', 'Ternera con cilantro', 'Rindfleisch mit Koriander', 'meat_mains', 'dinner', 19, 7, 11, 'stir-fried'),
  B(`تشاو نيو رو بالليمون ${T}`, 'Beef with lemon', 'Boeuf citron', 'Ternera con limón', 'Rindfleisch mit Zitrone', 'meat_mains', 'dinner', 21, 5, 13, 'stir-fried'),
  B(`تشاو نيو رو بالفلفل ${T}`, 'Beef with pepper', 'Boeuf poivre', 'Ternera con pimienta', 'Rindfleisch mit Pfeffer', 'meat_mains', 'dinner', 20, 6, 12, 'stir-fried'),
  B(`تشاو نيو رو بالكاري ${T}`, 'Beef curry', 'Curry de boeuf', 'Curry de ternera', 'Rindfleischcurry', 'meat_mains', 'dinner', 18, 10, 11, 'stir-fried'),

  // --- fish_seafood (20) ---
  B(`تشاو يو ${T}`, 'Stir-fried fish', 'Poisson frit', 'Pescado frito', 'Gebratener Fisch', 'fish_seafood', 'dinner', 18, 6, 10, 'stir-fried'),
  B(`تشاو يو بيان ${T}`, 'Stir-fried fish slices', 'Poisson en tranches frit', 'Pescado en lonchas frito', 'Gebratene Fischscheiben', 'fish_seafood', 'dinner', 19, 5, 11, 'stir-fried'),
  B(`تشاو يو سي ${T}`, 'Stir-fried fish shreds', 'Poisson effiloche frit', 'Pescado deshebrado frito', 'Gebratenes Fischfilet', 'fish_seafood', 'dinner', 18, 6, 10, 'stir-fried'),
  B(`تشاو يو تشوان ${T}`, 'Stir-fried fish rolls', 'Rouleaux de poisson frits', 'Rollitos de pescado fritos', 'Gebratene Fischrollen', 'fish_seafood', 'dinner', 17, 7, 9, 'stir-fried'),
  B(`تشاو يو تو ${T}`, 'Stir-fried fish cubes', 'Poisson en cubes frit', 'Pescado en cubos frito', 'Gebratene Fischwürfel', 'fish_seafood', 'dinner', 19, 5, 11, 'stir-fried'),
  B(`تشاو يو شوان ${T}`, 'Stir-fried fish strips', 'Poisson en lanieres frit', 'Pescado en tiras frito', 'Gebratene Fischstreifen', 'fish_seafood', 'dinner', 18, 6, 10, 'stir-fried'),
  B(`تشاو يو بي ${T}`, 'Stir-fried fish breast', 'Poisson frit', 'Pescado frito', 'Gebratene Fischbrust', 'fish_seafood', 'dinner', 20, 4, 12, 'stir-fried'),
  B(`تشاو يو رو ${T}`, 'Stir-fried fish meat', 'Viande de poisson frite', 'Carne de pescado frita', 'Gebratenes Fischfleisch', 'fish_seafood', 'dinner', 19, 5, 11, 'stir-fried'),
  B(`تشاو يو تشانغ ${T}`, 'Stir-fried fish intestines', 'Intestins de poisson frits', 'Intestinos de pescado fritos', 'Gebratene Fischdärme', 'fish_seafood', 'dinner', 16, 8, 8, 'stir-fried'),
  B(`تشاو يو بالخضار ${T}`, 'Fish with vegetables', 'Poisson aux legumes', 'Pescado con verduras', 'Fisch mit Gemüse', 'fish_seafood', 'dinner', 17, 8, 9, 'stir-fried'),
  B(`تشاو يو بالفطر ${T}`, 'Fish with mushrooms', 'Poisson aux champignons', 'Pescado con hongos', 'Fisch mit Pilzen', 'fish_seafood', 'dinner', 16, 9, 8, 'stir-fried'),
  B(`تشاو يو بالبصل ${T}`, 'Fish with onions', 'Poisson aux oignons', 'Pescado con cebolla', 'Fisch mit Zwiebeln', 'fish_seafood', 'dinner', 18, 6, 10, 'stir-fried'),
  B(`تشاو يو بالثوم ${T}`, 'Fish with garlic', 'Poisson a l ail', 'Pescado con ajo', 'Fisch mit Knoblauch', 'fish_seafood', 'dinner', 19, 5, 11, 'stir-fried'),
  B(`تشاو يو بالزنجبيل ${T}`, 'Fish with ginger', 'Poisson au gingembre', 'Pescado con jengibre', 'Fisch mit Ingwer', 'fish_seafood', 'dinner', 18, 6, 10, 'stir-fried'),
  B(`تشاو يو بالكزبرة ${T}`, 'Fish with cilantro', 'Poisson coriandre', 'Pescado con cilantro', 'Fisch mit Koriander', 'fish_seafood', 'dinner', 17, 7, 9, 'stir-fried'),
  B(`تشاو يو بالليمون ${T}`, 'Fish with lemon', 'Poisson citron', 'Pescado con limón', 'Fisch mit Zitrone', 'fish_seafood', 'dinner', 19, 5, 11, 'stir-fried'),
  B(`تشاو يو بالفلفل ${T}`, 'Fish with pepper', 'Poisson poivre', 'Pescado con pimienta', 'Fisch mit Pfeffer', 'fish_seafood', 'dinner', 18, 6, 10, 'stir-fried'),
  B(`تشاو يو بالكاري ${T}`, 'Fish curry', 'Curry de poisson', 'Curry de pescado', 'Fischcurry', 'fish_seafood', 'dinner', 16, 10, 9, 'stir-fried'),
  B(`تشاو شيا ${T}`, 'Stir-fried shrimp', 'Crevettes frites', 'Camarones fritos', 'Gebratene Garnelen', 'fish_seafood', 'dinner', 20, 5, 10, 'stir-fried'),
  B(`تشاو شيا بيان ${T}`, 'Stir-fried shrimp slices', 'Crevettes en tranches frites', 'Camarones en lonchas fritos', 'Gebratene Garnelenscheiben', 'fish_seafood', 'dinner', 21, 4, 11, 'stir-fried'),
];
