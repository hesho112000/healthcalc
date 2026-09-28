// Vietnamese base part 3 of 6: soups_stews (12) + poultry_mains (10) = 22 rows.
// Halal notes: Canh chua and canh măng are classically pork-based; authored as chicken and
// fish. Cơm vịt (duck) and gà (chicken) are naturally halal. No alcohol in any broth.
import { B, T } from './rows.mjs';

export default [
  // --- soups_stews (12) ---
  B(`كانغ تشوا بالدجاج ${T}`, 'Sour soup with chicken', 'Soupe aigre au poulet', 'Sopa agria con pollo', 'Saure Hühnersuppe', 'soups_stews', 'lunch', 12, 7, 5, 'simmered'),
  B(`كانغ تشوا بالسمك ${T}`, 'Sour fish soup', 'Soupe aigre au poisson', 'Sopa agria con pescado', 'Saure Fischsuppe', 'soups_stews', 'dinner', 14, 6, 5, 'simmered'),
  B(`كانغ مانغ تشوا ${T}`, 'Sour bamboo shoot soup', 'Soupe aigre aux pousses de bambou', 'Sopa agria con brotes de bambú', 'Sauerer Bambussprossensuppe', 'soups_stews', 'lunch', 8, 8, 3, 'simmered'),
  B(`كانغ داو ${T}`, 'Peanut soup', 'Soupe aux cacahuetes', 'Sopa de cacahuete', 'Erdnusssuppe', 'soups_stews', 'lunch', 8, 12, 5, 'simmered'),
  B(`كانغ كا ${T}`, 'Fish soup with herbs', 'Soupe de poisson aux herbes', 'Sopa de pescado con hierbas', 'Fischsuppe mit Kräutern', 'soups_stews', 'dinner', 13, 5, 4, 'simmered'),
  B(`كانغ بيه داو ${T}`, 'Winter melon soup with meat', 'Soupe au winter melon', 'Sopa de melón de invierno', 'Wintermelone-Suppe', 'soups_stews', 'lunch', 9, 6, 4, 'simmered'),
  B(`كانغ راو دي ${T}`, 'Water spinach soup', 'Soupe de water spinach', 'Sopa de tallo de agua', 'Wasserspinat-Suppe', 'soups_stews', 'lunch', 5, 7, 3, 'simmered'),
  B(`سوب راوت ${T}`, 'Vegetable soup', 'Soupe de legumes', 'Sopa de verduras', 'Gemüsesuppe', 'soups_stews', 'lunch', 4, 8, 3, 'simmered'),
  B(`لاو كا ${T}`, 'Fish hotpot', 'Fondue de poisson', 'Hot pot de pescado', 'Fisch-Hotpot', 'soups_stews', 'dinner', 15, 8, 8, 'simmered'),
  B(`لاو توم ${T}`, 'Shrimp hotpot', 'Fondue aux crevettes', 'Hot pot de camarones', 'Garnelen-Hotpot', 'soups_stews', 'dinner', 16, 9, 8, 'simmered'),
  B(`كانغ مانغ داو فو ${T}`, 'Bamboo shoot and tofu soup', 'Soupe aux pousses de bambou et tofu', 'Sopa de brotes de bambú y tofu', 'Bambus-Tofu-Suppe', 'soups_stews', 'lunch', 8, 9, 4, 'simmered'),
  B(`كانغ غا ${T}`, 'Chicken soup with ginger', 'Soupe de poulet au gingembre', 'Sopa de pollo con jengibre', 'Hühnersuppe mit Ingwer', 'soups_stews', 'dinner', 13, 5, 5, 'simmered'),

  // --- poultry_mains (10) ---
  B(`غا نونغ ${T}`, 'Grilled chicken', 'Poulet grille', 'Pollo a la parrilla', 'Gegrilltes Hähnchen', 'poultry_mains', 'dinner', 22, 2, 9, 'grilled'),
  B(`غا کي زاو ${T}`, 'Stir-fried lemongrass chicken', 'Poulet frit a la citronnelle', 'Pollo salteado con lemongrass', 'Huhn mit Zitronengras gebraten', 'poultry_mains', 'dinner', 19, 7, 11, 'stir-fried'),
  B(`غا کي راوت ${T}`, 'Chicken with lemongrass and spice', 'Poulet a la citronnelle et epices', 'Pollo con lemongrass y especias', 'Huhn mit Zitronengras und Gewürzen', 'poultry_mains', 'dinner', 19, 6, 10, 'grilled'),
  B(`غا خاو راوت ${T}`, 'Chicken braised in caramel', 'Poulet caramelise', 'Pollo caramelizado', 'Karamellisiertes Hähnchen', 'poultry_mains', 'dinner', 20, 9, 10, 'simmered'),
  B(`غا تشي او ${T}`, 'Chicken with lemongrass and chilli', 'Poulet a la citronnelle et piment', 'Pollo con柠檬hierbabuena y chile', 'Huhn mit Zitronengras und Chili', 'poultry_mains', 'dinner', 18, 5, 10, 'stir-fried'),
  B(`غا مقلي بالبرتقال ${T}`, 'Orange chicken', 'Poulet a l orange', 'Pollo a la naranja', 'Huhn mit Orange', 'poultry_mains', 'dinner', 17, 12, 8, 'stir-fried'),
  B(`غا تشو تشي ${T}`, 'Shredded chicken with herbs', 'Poulet effiloche aux herbes', 'Pollo deshebrado con hierbas', 'Hähnchen mit Kräutern', 'poultry_mains', 'lunch', 20, 5, 8, 'steamed'),
  B(`غا كاري ${T}`, 'Vietnamese chicken curry', 'Curry de poulet vietnamien', 'Curry de pollo vietnamita', 'Vietnamesisches Huhncurry', 'poultry_mains', 'dinner', 16, 14, 11, 'simmered'),
  B(`فيت مقلي بالصلصة ${T}`, 'Fried duck with tamarind sauce', 'Canard frit a la sauce de tamarin', 'Pato frito con salsa de tamarindo', 'Gebratene Ente mit Tamarindensauce', 'poultry_mains', 'dinner', 20, 11, 14, 'fried'),
  B(`غا ساو بالليمون ${T}`, 'Chicken with lemon sauce', 'Poulet a la sauce citronnee', 'Pollo con salsa de limón', 'Huhn mit Zitronensauce', 'poultry_mains', 'dinner', 18, 8, 9, 'simmered'),
];
