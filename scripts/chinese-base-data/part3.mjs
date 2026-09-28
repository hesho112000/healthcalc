// Chinese base part 3 of 6: soups_stews (18) + poultry_mains (18) = 36 rows.
// Halal notes: all pork dishes adapted to beef/chicken/duck. No alcohol.
import { B, T } from './rows.mjs';

export default [
  // --- soups_stews (18) ---
  B(`تان تان تانغ ${T}`, 'Hot and sour soup', 'Soupe aigre et piquante', 'Sopa agria y picante', 'Saure scharfe Suppe', 'soups_stews', 'lunch', 8, 6, 4, 'simmered'),
  B(`سي تشوان تانغ ${T}`, 'Sichuan spicy soup', 'Soupe epicee du Sichuan', 'Sopa picante de Sichuan', 'Scharfe Sichuan-Suppe', 'soups_stews', 'dinner', 10, 5, 6, 'simmered'),
  B(`دونغ بو تانغ ${T}`, 'Winter melon soup', 'Soupe au melon dhiver', 'Sopa de melón de invierno', 'Wintermelonensuppe', 'soups_stews', 'lunch', 6, 8, 3, 'simmered'),
  B(`تشين تانغ ${T}`, 'Clear chicken soup', 'Soupe claire au poulet', 'Sopa clara de pollo', 'Klare Hühnersuppe', 'soups_stews', 'lunch', 12, 3, 4, 'simmered'),
  B(`نيو رو تانغ ${T}`, 'Beef brisket soup', 'Soupe de poitrine de boeuf', 'Sopa de pecho de ternera', 'Rindfleischbrustsuppe', 'soups_stews', 'dinner', 14, 4, 6, 'simmered'),
  B(`يو تانغ ${T}`, 'Fish soup', 'Soupe de poisson', 'Sopa de pescado', 'Fischsuppe', 'soups_stews', 'dinner', 13, 3, 5, 'simmered'),
  B(`شياو تانغ ${T}`, 'Shrimp soup', 'Soupe aux crevettes', 'Sopa de camarones', 'Garnelensuppe', 'soups_stews', 'lunch', 12, 4, 4, 'simmered'),
  B(`تو فو تانغ ${T}`, 'Tofu soup', 'Soupe au tofu', 'Sopa de tofu', 'Tofusuppe', 'soups_stews', 'lunch', 9, 5, 4, 'simmered'),
  B(`تساي تانغ ${T}`, 'Vegetable soup', 'Soupe de legumes', 'Sopa de verduras', 'Gemüsesuppe', 'soups_stews', 'lunch', 5, 7, 3, 'simmered'),
  B(`لاو هو تانغ ${T}`, 'Old Beijing soup', 'Soupe de Pekin', 'Sopa de Pekín', 'Pekinger Suppe', 'soups_stews', 'lunch', 11, 4, 5, 'simmered'),
  B(`تشو تانغ ${T}`, 'Bamboo shoot soup', 'Soupe aux pousses de bambou', 'Sopa de brotes de bambú', 'Bambussprossensuppe', 'soups_stews', 'lunch', 7, 6, 3, 'simmered'),
  B(`مو رو تانغ ${T}`, 'Mushroom soup', 'Soupe aux champignons', 'Sopa de hongos', 'Pilzsuppe', 'soups_stews', 'lunch', 6, 5, 4, 'simmered'),
  B(`دون تانغ ${T}`, 'Egg drop soup', 'Soupe aux oeufs', 'Sopa de huevo', 'Eier-Suppe', 'soups_stews', 'lunch', 8, 4, 5, 'simmered'),
  B(`سي تانغ ${T}`, 'Tomato soup', 'Soupe a la tomate', 'Sopa de tomate', 'Tomatensuppe', 'soups_stews', 'lunch', 5, 8, 3, 'simmered'),
  B(`هوانغ تانغ ${T}`, 'Pumpkin soup', 'Soupe a la citrouille', 'Sopa de calabaza', 'Kürbissuppe', 'soups_stews', 'lunch', 4, 9, 2, 'simmered'),
  B(`باي تانغ ${T}`, 'Cabbage soup', 'Soupe au chou', 'Sopa de repollo', 'Kohlsuppe', 'soups_stews', 'lunch', 5, 6, 3, 'simmered'),
  B(`لو تانغ ${T}`, 'Radish soup', 'Soupe au radis', 'Sopa de rábano', 'Rettichsuppe', 'soups_stews', 'lunch', 4, 7, 2, 'simmered'),
  B(`تسون تانغ ${T}`, 'Corn soup', 'Soupe au mais', 'Sopa de maíz', 'Maissuppe', 'soups_stews', 'lunch', 5, 8, 3, 'simmered'),

  // --- poultry_mains (18) ---
  B(`كونغ باو جي دينغ ${T}`, 'Kung Pao chicken', 'Poulet Kung Pao', 'Pollo Kung Pao', 'Kung-Pao-Hähnchen', 'poultry_mains', 'dinner', 18, 12, 14, 'stir-fried'),
  B(`تشاو جي دينغ ${T}`, 'Stir-fried chicken cubes', 'Poulet en cubes frit', 'Pollo en cubos frito', 'Gebratene Huhnwürfel', 'poultry_mains', 'dinner', 19, 8, 12, 'stir-fried'),
  B(`تشاو جي تشانغ ${T}`, 'Stir-fried chicken wings', 'Ailes de poulet frites', 'Alitas de pollo fritas', 'Gebratene Hühnchenflügel', 'poultry_mains', 'dinner', 20, 6, 15, 'stir-fried'),
  B(`تشاو جي توي ${T}`, 'Stir-fried chicken feet', 'Pieds de poulet frits', 'Patas de pollo fritas', 'Gebratene Hühnerfüße', 'poultry_mains', 'dinner', 15, 10, 8, 'stir-fried'),
  B(`تشاو جي تشوان ${T}`, 'Stir-fried chicken rolls', 'Rouleaux de poulet frits', 'Rollitos de pollo fritos', 'Gebratene Hühnchenrollen', 'poultry_mains', 'dinner', 17, 9, 11, 'stir-fried'),
  B(`تشاو جي سي ${T}`, 'Stir-fried chicken shreds', 'Poulet effiloche frit', 'Pollo deshebrado frito', 'Gebratenes Hähnchen', 'poultry_mains', 'dinner', 18, 7, 12, 'stir-fried'),
  B(`تشاو جي بي ${T}`, 'Stir-fried chicken breast', 'Blanc de poulet frit', 'Pechuga de pollo frita', 'Gebratene Hähnchenbrust', 'poultry_mains', 'dinner', 20, 5, 10, 'stir-fried'),
  B(`تشاو جي رو ${T}`, 'Stir-fried chicken meat', 'Viande de poulet frite', 'Carne de pollo frita', 'Gebratenes Hühnerfleisch', 'poultry_mains', 'dinner', 19, 6, 11, 'stir-fried'),
  B(`تشاو جي شوان ${T}`, 'Stir-fried chicken slices', 'Poulet en tranches frit', 'Pollo en lonchas frito', 'Gebratene Hühnchenscheiben', 'poultry_mains', 'dinner', 18, 7, 10, 'stir-fried'),
  B(`تشاو جي دينغ بالخضار ${T}`, 'Chicken cubes with vegetables', 'Poulet en cubes et legumes', 'Pollo en cubos con verduras', 'Huhnwürfel mit Gemüse', 'poultry_mains', 'dinner', 17, 10, 11, 'stir-fried'),
  B(`تشاو جي تشانغ بالخضار ${T}`, 'Chicken wings with vegetables', 'Ailes de poulet et legumes', 'Alitas de pollo con verduras', 'Hühnchenflügel mit Gemüse', 'poultry_mains', 'dinner', 18, 8, 12, 'stir-fried'),
  B(`تشاو جي توي بالخضار ${T}`, 'Chicken feet with vegetables', 'Pieds de poulet et legumes', 'Patas de pollo con verduras', 'Hühnerfüße mit Gemüse', 'poultry_mains', 'dinner', 14, 12, 7, 'stir-fried'),
  B(`تشاو جي تشوان بالخضار ${T}`, 'Chicken rolls with vegetables', 'Rouleaux de poulet et legumes', 'Rollitos de pollo con verduras', 'Hühnchenrollen mit Gemüse', 'poultry_mains', 'dinner', 16, 10, 10, 'stir-fried'),
  B(`تشاو جي سي بالخضار ${T}`, 'Chicken shreds with vegetables', 'Poulet effiloche et legumes', 'Pollo deshebrado con verduras', 'Hähnchen mit Gemüse', 'poultry_mains', 'dinner', 17, 8, 11, 'stir-fried'),
  B(`تشاو جي بي بالخضار ${T}`, 'Chicken breast with vegetables', 'Blanc de poulet et legumes', 'Pechuga de pollo con verduras', 'Hähnchenbrust mit Gemüse', 'poultry_mains', 'dinner', 19, 6, 9, 'stir-fried'),
  B(`تشاو جي رو بالخضار ${T}`, 'Chicken meat with vegetables', 'Viande de poulet et legumes', 'Carne de pollo con verduras', 'Hühnerfleisch mit Gemüse', 'poultry_mains', 'dinner', 18, 7, 10, 'stir-fried'),
  B(`تشاو جي شوان بالخضار ${T}`, 'Chicken slices with vegetables', 'Poulet en tranches et legumes', 'Pollo en lonchas con verduras', 'Hühnchenscheiben mit Gemüse', 'poultry_mains', 'dinner', 17, 8, 9, 'stir-fried'),
  B(`تشاو جي دينغ بالدجاج والخضار ${T}`, 'Chicken cubes with chicken and vegetables', 'Poulet en cubes poulet legumes', 'Pollo en cubos pollo verduras', 'Huhnwürfel mit Huhn und Gemüse', 'poultry_mains', 'dinner', 18, 9, 12, 'stir-fried'),
];
