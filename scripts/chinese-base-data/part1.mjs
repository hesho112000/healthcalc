// Chinese base part 1 of 6: breakfast_items (15) + rice_dishes (20) = 35 rows.
// Halal notes: all pork dishes adapted to beef/chicken/duck. Cooking wine replaced with
// broth. Lard replaced with vegetable oil. No alcohol in any dish.
import { B, T } from './rows.mjs';

export default [
  // --- breakfast_items (15) ---
  B(`كون تياو بالدجاج ${T}`, 'Chicken rice noodles', 'Nouilles de riz au poulet', 'Fideos de arroz con pollo', 'Huhnreisnudeln', 'breakfast_items', 'breakfast', 10, 18, 4, 'simmered'),
  B(`كون تياو باللحم ${T}`, 'Beef rice noodles', 'Nouilles de riz au boeuf', 'Fideos de arroz con ternera', 'Rindfleischreisnudeln', 'breakfast_items', 'breakfast', 12, 16, 5, 'simmered'),
  B(`كون تياو بالروبيان ${T}`, 'Shrimp rice noodles', 'Nouilles de riz aux crevettes', 'Fideos de arroz con camarones', 'Garnelenreisnudeln', 'breakfast_items', 'breakfast', 11, 17, 4, 'simmered'),
  B(`يو تياو ${T}`, 'Fried dough sticks', 'Beignets de pate frite', 'Churros chinos', 'Gebratene Teigstangen', 'breakfast_items', 'breakfast', 8, 35, 12, 'fried'),
  B(`تشاو فان ${T}`, 'Fried rice', 'Riz frit', 'Arroz frito', 'Gebratener Reis', 'breakfast_items', 'breakfast', 9, 30, 8, 'stir-fried'),
  B(`تشاو مين ${T}`, 'Fried noodles', 'Nouilles frites', 'Fideos fritos', 'Gebratene Nudeln', 'breakfast_items', 'breakfast', 10, 28, 9, 'stir-fried'),
  B(`باو تسي بالدجاج ${T}`, 'Chicken steamed buns', 'Buns vapeur au poulet', 'Bollos al vapor con pollo', 'Hähnchenbuns', 'breakfast_items', 'breakfast', 12, 25, 6, 'steamed'),
  B(`باو تسي بالخضار ${T}`, 'Vegetable steamed buns', 'Buns vapeur aux legumes', 'Bollos al vapor con verduras', 'Gemüsebuns', 'breakfast_items', 'breakfast', 8, 28, 4, 'steamed'),
  B(`جياو تسي بالدجاج ${T}`, 'Chicken dumplings', 'Raviolis au poulet', 'Empanadillas de pollo', 'Hähnchenravioli', 'breakfast_items', 'breakfast', 14, 22, 8, 'steamed'),
  B(`جياو تسي بالخضار ${T}`, 'Vegetable dumplings', 'Raviolis aux legumes', 'Empanadillas de verduras', 'Gemüseravioli', 'breakfast_items', 'breakfast', 9, 24, 5, 'steamed'),
  B(`شياو لونغ باو ${T}`, 'Soup dumplings', 'Raviolis en soupe', 'Empanadillas en sopa', 'Suppenravioli', 'breakfast_items', 'breakfast', 13, 20, 7, 'steamed'),
  B(`هوا جوان ${T}`, 'Scallion pancakes', 'Galettes aux oignons verts', 'Tortitas de cebolla', 'Frühlingszwiebelkuchen', 'breakfast_items', 'breakfast', 7, 30, 10, 'griddled'),
  B(`تسون بين ${T}`, 'Sticky rice rolls', 'Rouleaux de riz gluant', 'Rollitos de arroz pegajoso', 'Klebrige Reisrollen', 'breakfast_items', 'breakfast', 6, 32, 5, 'steamed'),
  B(`دان بين ${T}`, 'Egg pancakes', 'Galettes aux oeufs', 'Tortitas de huevo', 'Eierkuchen', 'breakfast_items', 'breakfast', 11, 20, 9, 'griddled'),
  B(`لاو بين ${T}`, 'Old Beijing pancakes', 'Galettes de Pekin', 'Tortitas de Pekín', 'Pekinger Kuchen', 'breakfast_items', 'breakfast', 8, 28, 7, 'griddled'),

  // --- rice_dishes (20) ---
  B(`تشاو فان بالدجاج ${T}`, 'Chicken fried rice', 'Riz frit au poulet', 'Arroz frito con pollo', 'Huhnreis', 'rice_dishes', 'lunch', 11, 28, 8, 'stir-fried'),
  B(`تشاو فان باللحم ${T}`, 'Beef fried rice', 'Riz frit au boeuf', 'Arroz frito con ternera', 'Rindfleischreis', 'rice_dishes', 'lunch', 13, 26, 9, 'stir-fried'),
  B(`تشاو فان بالروبيان ${T}`, 'Shrimp fried rice', 'Riz frit aux crevettes', 'Arroz frito con camarones', 'Garnelenreis', 'rice_dishes', 'lunch', 12, 27, 8, 'stir-fried'),
  B(`تشاو فان بالخضار ${T}`, 'Vegetable fried rice', 'Riz frit aux legumes', 'Arroz frito con verduras', 'Gemüse-Reis', 'rice_dishes', 'lunch', 8, 30, 6, 'stir-fried'),
  B(`تشاو فان بالبيض ${T}`, 'Egg fried rice', 'Riz frit aux oeufs', 'Arroz frito con huevo', 'Eierreis', 'rice_dishes', 'lunch', 10, 29, 8, 'stir-fried'),
  B(`تشاو فان بالدجاج والخضار ${T}`, 'Chicken vegetable fried rice', 'Riz frit poulet legumes', 'Arroz frito pollo verduras', 'Huhn-Gemüse-Reis', 'rice_dishes', 'lunch', 11, 27, 8, 'stir-fried'),
  B(`تشاو فان باللحم والخضار ${T}`, 'Beef vegetable fried rice', 'Riz frit boeuf legumes', 'Arroz frito ternera verduras', 'Rind-Gemüse-Reis', 'rice_dishes', 'lunch', 12, 26, 9, 'stir-fried'),
  B(`تشاو فان بالروبيان والخضار ${T}`, 'Shrimp vegetable fried rice', 'Riz frit crevettes legumes', 'Arroz frito camarones verduras', 'Garnelen-Gemüse-Reis', 'rice_dishes', 'lunch', 11, 27, 8, 'stir-fried'),
  B(`تشاو فان بالدجاج والبيض ${T}`, 'Chicken egg fried rice', 'Riz frit poulet oeufs', 'Arroz frito pollo huevo', 'Huhn-Eier-Reis', 'rice_dishes', 'lunch', 12, 26, 9, 'stir-fried'),
  B(`تشاو فان باللحم والبيض ${T}`, 'Beef egg fried rice', 'Riz frit boeuf oeufs', 'Arroz frito ternera huevo', 'Rind-Eier-Reis', 'rice_dishes', 'lunch', 13, 25, 10, 'stir-fried'),
  B(`تشاو فان بالروبيان والبيض ${T}`, 'Shrimp egg fried rice', 'Riz frit crevettes oeufs', 'Arroz frito camarones huevo', 'Garnelen-Eier-Reis', 'rice_dishes', 'lunch', 12, 26, 9, 'stir-fried'),
  B(`تشاو فان بالخضار والبيض ${T}`, 'Vegetable egg fried rice', 'Riz frit legumes oeufs', 'Arroz frito verduras huevo', 'Gemüse-Eier-Reis', 'rice_dishes', 'lunch', 9, 28, 7, 'stir-fried'),
  B(`تشاو فان بالدجاج والروبيان ${T}`, 'Chicken shrimp fried rice', 'Riz frit poulet crevettes', 'Arroz frito pollo camarones', 'Huhn-Garnelen-Reis', 'rice_dishes', 'lunch', 13, 25, 10, 'stir-fried'),
  B(`تشاو فان باللحم والروبيان ${T}`, 'Beef shrimp fried rice', 'Riz frit boeuf crevettes', 'Arroz frito ternera camarones', 'Rind-Garnelen-Reis', 'rice_dishes', 'lunch', 14, 24, 11, 'stir-fried'),
  B(`تشاو فان بالدجاج واللحم ${T}`, 'Chicken beef fried rice', 'Riz frit poulet boeuf', 'Arroz frito pollo ternera', 'Huhn-Rind-Reis', 'rice_dishes', 'lunch', 14, 24, 11, 'stir-fried'),
  B(`تشاو فان بالدجاج واللحم والروبيان ${T}`, 'Chicken beef shrimp fried rice', 'Riz frit poulet boeuf crevettes', 'Arroz frito pollo ternera camarones', 'Huhn-Rind-Garnelen-Reis', 'rice_dishes', 'lunch', 15, 23, 12, 'stir-fried'),
  B(`تشاو فان بالخضار والدجاج واللحم ${T}`, 'Vegetable chicken beef fried rice', 'Riz frit legumes poulet boeuf', 'Arroz frito verduras pollo ternera', 'Gemüse-Huhn-Rind-Reis', 'rice_dishes', 'lunch', 13, 25, 10, 'stir-fried'),
  B(`تشاو فان بالخضار والروبيان والبيض ${T}`, 'Vegetable shrimp egg fried rice', 'Riz frit legumes crevettes oeufs', 'Arroz frito verduras camarones huevo', 'Gemüse-Garnelen-Eier-Reis', 'rice_dishes', 'lunch', 10, 27, 8, 'stir-fried'),
  B(`تشاو فان بالدجاج والخضار والبيض ${T}`, 'Chicken vegetable egg fried rice', 'Riz frit poulet legumes oeufs', 'Arroz frito pollo verduras huevo', 'Huhn-Gemüse-Eier-Reis', 'rice_dishes', 'lunch', 11, 26, 9, 'stir-fried'),
  B(`تشاو فان باللحم والخضار والبيض ${T}`, 'Beef vegetable egg fried rice', 'Riz frit boeuf legumes oeufs', 'Arroz frito ternera verduras huevo', 'Rind-Gemüse-Eier-Reis', 'rice_dishes', 'lunch', 12, 25, 10, 'stir-fried'),
];
