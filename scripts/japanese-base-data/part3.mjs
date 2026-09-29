// Japanese base part 3 of 6: soups_stews (18) + poultry_mains (18) = 36 rows.
// Halal notes: all pork dishes adapted to chicken/beef/duck. Sake replaced with dashi
// broth. Mirin replaced with sweet rice vinegar blend. No alcohol in any dish.
import { B, T } from './rows.mjs';

export default [
  // --- soups_stews (18) ---
  B(`ميسو شيرو بالخضار ${T}`, 'Vegetable miso soup', 'Soupe miso aux legumes', 'Sopa miso de verduras', 'Gemüse-Miso-Suppe', 'soups_stews', 'lunch', 6, 8, 3, 'simmered'),
  B(`ميسو شيرو بالفطر ${T}`, 'Mushroom miso soup', 'Soupe miso champignons', 'Sopa miso de hongos', 'Pilz-Miso-Suppe', 'soups_stews', 'lunch', 7, 7, 4, 'simmered'),
  B(`ميسو شيرو بالدجاج ${T}`, 'Chicken miso soup', 'Soupe miso poulet', 'Sopa miso de pollo', 'Huhn-Miso-Suppe', 'soups_stews', 'lunch', 9, 6, 4, 'simmered'),
  B(`ميسو شيرو باللحم ${T}`, 'Beef miso soup', 'Soupe miso boeuf', 'Sopa miso de ternera', 'Rind-Miso-Suppe', 'soups_stews', 'lunch', 11, 5, 5, 'simmered'),
  B(`ميسو شيرو بالروبيان ${T}`, 'Shrimp miso soup', 'Soupe miso crevettes', 'Sopa miso de camarones', 'Garnelen-Miso-Suppe', 'soups_stews', 'lunch', 10, 6, 4, 'simmered'),
  B(`ميسو شيرو بالسمك ${T}`, 'Fish miso soup', 'Soupe miso poisson', 'Sopa miso de pescado', 'Fisch-Miso-Suppe', 'soups_stews', 'lunch', 10, 6, 4, 'simmered'),
  B(`ميسو شيرو بالبيض ${T}`, 'Egg miso soup', 'Soupe miso oeufs', 'Sopa miso de huevo', 'Eier-Miso-Suppe', 'soups_stews', 'lunch', 8, 6, 5, 'simmered'),
  B(`ميسو شيرو بالزنجبيل ${T}`, 'Ginger miso soup', 'Soupe miso gingembre', 'Sopa miso jengibre', 'Ingwer-Miso-Suppe', 'soups_stews', 'lunch', 6, 7, 3, 'simmered'),
  B(`ميسو شيرو بالكزبرة ${T}`, 'Cilantro miso soup', 'Soupe miso coriandre', 'Sopa miso cilantro', 'Koriander-Miso-Suppe', 'soups_stews', 'lunch', 6, 7, 3, 'simmered'),
  B(`ميسو شيرو بالليمون ${T}`, 'Lemon miso soup', 'Soupe miso citron', 'Sopa miso limón', 'Zitronen-Miso-Suppe', 'soups_stews', 'lunch', 6, 6, 3, 'simmered'),
  B(`ميسو شيرو بالفلفل ${T}`, 'Pepper miso soup', 'Soupe miso poivre', 'Sopa miso pimienta', 'Pfeffer-Miso-Suppe', 'soups_stews', 'lunch', 6, 6, 3, 'simmered'),
  B(`ميسو شيرو بالكاري ${T}`, 'Curry miso soup', 'Soupe miso curry', 'Sopa miso curry', 'Curry-Miso-Suppe', 'soups_stews', 'lunch', 7, 7, 4, 'simmered'),
  B(`سوكيياكي بالدجاج ${T}`, 'Chicken sukiyaki', 'Sukiyaki au poulet', 'Sukiyaki de pollo', 'Huhn-Sukiyaki', 'soups_stews', 'dinner', 16, 10, 10, 'simmered'),
  B(`سوكيياكي باللحم ${T}`, 'Beef sukiyaki', 'Sukiyaki au boeuf', 'Sukiyaki de ternera', 'Rind-Sukiyaki', 'soups_stews', 'dinner', 18, 8, 12, 'simmered'),
  B(`سوكيياكي بالروبيان ${T}`, 'Shrimp sukiyaki', 'Sukiyaki crevettes', 'Sukiyaki camarones', 'Garnelen-Sukiyaki', 'soups_stews', 'dinner', 17, 9, 11, 'simmered'),
  B(`سوكيياكي بالخضار ${T}`, 'Vegetable sukiyaki', 'Sukiyaki legumes', 'Sukiyaki verduras', 'Gemüse-Sukiyaki', 'soups_stews', 'dinner', 8, 14, 5, 'simmered'),
  B(`سوكيياكي بالفطر ${T}`, 'Mushroom sukiyaki', 'Sukiyaki champignons', 'Sukiyaki hongos', 'Pilz-Sukiyaki', 'soups_stews', 'dinner', 9, 13, 6, 'simmered'),
  B(`سوكيياكي بالبيض ${T}`, 'Egg sukiyaki', 'Sukiyaki oeufs', 'Sukiyaki huevo', 'Eier-Sukiyaki', 'soups_stews', 'dinner', 12, 10, 9, 'simmered'),

  // --- poultry_mains (18) ---
  B(`توري ياكي ${T}`, 'Grilled chicken', 'Poulet grille', 'Pollo a la parrilla', 'Gegrilltes Hähnchen', 'poultry_mains', 'dinner', 22, 3, 9, 'grilled'),
  B(`توري ياكي بالزنجبيل ${T}`, 'Ginger grilled chicken', 'Poulet grille gingembre', 'Pollo asado jengibre', 'Gegrilltes Hähnchen mit Ingwer', 'poultry_mains', 'dinner', 21, 4, 8, 'grilled'),
  B(`توري ياكي بالثوم ${T}`, 'Garlic grilled chicken', 'Poulet grille ail', 'Pollo asado ajo', 'Gegrilltes Hähnchen mit Knoblauch', 'poultry_mains', 'dinner', 20, 5, 7, 'grilled'),
  B(`توري ياكي بالبصل ${T}`, 'Onion grilled chicken', 'Poulet grille oignon', 'Pollo asado cebolla', 'Gegrilltes Hähnchen mit Zwiebel', 'poultry_mains', 'dinner', 21, 3, 8, 'grilled'),
  B(`توري ياكي بالكزبرة ${T}`, 'Cilantro grilled chicken', 'Poulet grille coriandre', 'Pollo asado cilantro', 'Gegrilltes Hähnchen mit Koriander', 'poultry_mains', 'dinner', 20, 4, 7, 'grilled'),
  B(`توري ياكي بالليمون ${T}`, 'Lemon grilled chicken', 'Poulet grille citron', 'Pollo asado limón', 'Gegrilltes Hähnchen mit Zitrone', 'poultry_mains', 'dinner', 21, 2, 8, 'grilled'),
  B(`توري ياكي بالفلفل ${T}`, 'Pepper grilled chicken', 'Poulet grille poivre', 'Pollo asado pimienta', 'Gegrilltes Hähnchen mit Pfeffer', 'poultry_mains', 'dinner', 20, 3, 7, 'grilled'),
  B(`توري ياكي بالكاري ${T}`, 'Curry grilled chicken', 'Poulet grille curry', 'Pollo asado curry', 'Gegrilltes Hähnchen mit Curry', 'poultry_mains', 'dinner', 21, 4, 8, 'grilled'),
  B(`توري ياكي بالطماطم ${T}`, 'Tomato grilled chicken', 'Poulet grille tomate', 'Pollo asado tomate', 'Gegrilltes Hähnchen mit Tomate', 'poultry_mains', 'dinner', 20, 5, 7, 'grilled'),
  B(`توري ياكي بالفطر ${T}`, 'Mushroom grilled chicken', 'Poulet grille champignons', 'Pollo asado hongos', 'Gegrilltes Hähnchen mit Pilzen', 'poultry_mains', 'dinner', 21, 3, 8, 'grilled'),
  B(`توري ياكي بالذرة ${T}`, 'Corn grilled chicken', 'Poulet grille mais', 'Pollo asado maíz', 'Gegrilltes Hähnchen mit Mais', 'poultry_mains', 'dinner', 20, 4, 7, 'grilled'),
  B(`توري ياكي بالبطاطس ${T}`, 'Potato grilled chicken', 'Poulet grille pomme de terre', 'Pollo asado papa', 'Gegrilltes Hähnchen mit Kartoffel', 'poultry_mains', 'dinner', 21, 2, 8, 'grilled'),
  B(`توري ياكي بالجزر ${T}`, 'Carrot grilled chicken', 'Poulet grille carotte', 'Pollo asado zanahoria', 'Gegrilltes Hähnchen mit Karotte', 'poultry_mains', 'dinner', 20, 3, 7, 'grilled'),
  B(`توري ياكي بالسبانخ ${T}`, 'Spinach grilled chicken', 'Poulet grille epinards', 'Pollo asado espinacas', 'Gegrilltes Hähnchen mit Spinat', 'poultry_mains', 'dinner', 21, 2, 8, 'grilled'),
  B(`توري ياكي بالبروكلي ${T}`, 'Broccoli grilled chicken', 'Poulet grille brocoli', 'Pollo asado brócoli', 'Gegrilltes Hähnchen mit Brokkoli', 'poultry_mains', 'dinner', 20, 3, 7, 'grilled'),
  B(`توري ياكي بالبازلاء ${T}`, 'Pea grilled chicken', 'Poulet grille petits pois', 'Pollo asado guisantes', 'Gegrilltes Hähnchen mit Erbsen', 'poultry_mains', 'dinner', 21, 4, 8, 'grilled'),
  B(`توري ياكي بالخضار المشكلة ${T}`, 'Mixed vegetable grilled chicken', 'Poulet grille legumes varies', 'Pollo asado verduras mixtas', 'Gegrilltes Hähnchen mit gemischtem Gemüse', 'poultry_mains', 'dinner', 20, 5, 7, 'grilled'),
  B(`توري ياكي بالدجاج والخضار ${T}`, 'Chicken grilled chicken with vegetables', 'Poulet grille poulet legumes', 'Pollo asado pollo verduras', 'Huhn-Gemüse-Gegrillt', 'poultry_mains', 'dinner', 22, 3, 9, 'grilled'),
];
