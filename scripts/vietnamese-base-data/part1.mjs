// Vietnamese base part 1 of 6: breakfast_items (8) + rice_dishes (12) = 20 rows.
// Halal notes: every row is pork-free and alcohol-free. Cơm tấm is classically served with
// grilled PORK chop; authored here as beef and chicken. Cơm vịt (duck) is naturally halal.
import { B, T } from './rows.mjs';

export default [
  // --- breakfast_items (8) ---
  B(`شاوا بالدجاج ${T}`, 'Chicken rice congee', 'Congee de riz au poulet', 'Congee de arroz con pollo', 'Huhnreisbrei Congee', 'breakfast_items', 'breakfast', 8, 17, 2, 'simmered'),
  B(`شاوا بالروبيان ${T}`, 'Shrimp rice congee', 'Congee de riz aux crevettes', 'Congee de arroz con camarones', 'Garnelenreisbrei Congee', 'breakfast_items', 'breakfast', 9, 16, 2, 'simmered'),
  B(`شاوا بالفول ${T}`, 'Mung bean rice congee', 'Congee de riz aux haricots mungo', 'Congee de arroz con judía mung', 'Reisbrei mit Mungobohnen', 'breakfast_items', 'breakfast', 6, 22, 2, 'simmered'),
  B(`بانِه مِي بالبيض ${T}`, 'Egg baguette sandwich', 'Baguette vietnamienne a l oeuf', 'Baguete vietnamita con huevo', 'Vietnamesisches Baguette mit Ei', 'breakfast_items', 'breakfast', 9, 23, 7, 'griddled'),
  B(`بانِه مِي بالدجاج ${T}`, 'Shredded chicken baguette', 'Baguette au poulet effiloche', 'Baguete de pollo deshebrado', 'Baguette mit Hähnchen', 'breakfast_items', 'breakfast', 14, 21, 7, 'grilled'),
  B(`بانِه مِي بالخضار ${T}`, 'Vegetable baguette', 'Baguette aux légumes', 'Baguete con verduras', 'Baguette mit Gemüse', 'breakfast_items', 'breakfast', 7, 24, 5, 'griddled'),
  B(`بانِه كيون بالخضار ${T}`, 'Steamed rice rolls with vegetables', 'Rouleaux de riz cuits a la vapeur', 'Rollitos de arroz al vapor con verduras', 'Gedämpfte Reisrollen mit Gemüse', 'breakfast_items', 'breakfast', 6, 21, 4, 'steamed'),
  B(`فو غا بالدجاج ${T}`, 'Chicken pho', 'Pho au poulet', 'Pho de pollo', 'Huhn-Pho', 'breakfast_items', 'breakfast', 11, 8, 3.5, 'simmered'),

  // --- rice_dishes (12) ---
  B(`كورم تام باو ${T}`, 'Broken rice with grilled beef', 'Riz casse au boeuf grille', 'Arroz quebrado con ternera asada', 'Gebrochener Reis mit Rindersteak', 'rice_dishes', 'lunch', 12, 28, 8, 'grilled'),
  B(`كورم تام غا ${T}`, 'Broken rice with chicken', 'Riz casse au poulet', 'Arroz quebrado con pollo', 'Gebrochener Reis mit Huhn', 'rice_dishes', 'lunch', 13, 29, 6, 'grilled'),
  B(`كورم غا هوي آن ${T}`, 'Hoi An chicken rice', 'Riz au poulet de Hoi An', 'Arroz con pollo de Hoi An', 'Hoi-An-Reis mit Huhn', 'rice_dishes', 'lunch', 14, 27, 7, 'grilled'),
  B(`كورم فيت بثلاث أرجل ${T}`, 'Duck leg rice', 'Riz au canard', 'Arroz con pato', 'Reis mit Entenkeule', 'rice_dishes', 'lunch', 15, 26, 10, 'roasted'),
  B(`كورم كا خو ${T}`, 'Rice with braised fish', 'Riz au poisson braise', 'Arroz con pescado braseado', 'Reis mit geschmortem Fisch', 'rice_dishes', 'lunch', 15, 26, 7, 'simmered'),
  B(`كورم راوموينغ ${T}`, 'Rice with stir-fried water spinach', 'Riz aux water spinach frits', 'Arroz con tallo de Ipomoea frita', 'Reis mit gebratenem Wasserspinat', 'rice_dishes', 'lunch', 6, 28, 7, 'stir-fried'),
  B(`كورم توم رانغ ${T}`, 'Rice with fried shrimp', 'Riz aux crevettes frites', 'Arroz con camarones fritos', 'Reis mit gebratenen Garnelen', 'rice_dishes', 'lunch', 13, 27, 8, 'stir-fried'),
  B(`كورم غاو لوت ${T}`, 'Brown sticky rice', 'Riz gluant brun', 'Arroz pegajoso integral', 'Brauner Klebreis', 'rice_dishes', 'lunch', 5, 30, 3, 'steamed'),
  B(`كورم داو فو ${T}`, 'Rice with braised tofu', 'Riz au tofu braise', 'Arroz con tofu braseado', 'Reis mit geschmortem Tofu', 'rice_dishes', 'lunch', 9, 27, 7, 'simmered'),
  B(`كورم باو زاو ${T}`, 'Rice with stir-fried beef', 'Riz au boeuf frit', 'Arroz con ternera salteada', 'Reis mit angebratenem Rindfleisch', 'rice_dishes', 'lunch', 14, 26, 9, 'stir-fried'),
  B(`كورم باو نونغ ${T}`, 'Rice with grilled beef', 'Riz au boeuf grille', 'Arroz con ternera a la parrilla', 'Reis mit gegrilltem Rindfleisch', 'rice_dishes', 'lunch', 15, 26, 8, 'grilled'),
  B(`كورم توم تشام ${T}`, 'Rice with braised fish in caramel', 'Riz au poisson caramelise', 'Arroz con pescado caramelizado', 'Reis mit karamellisiertem Fisch', 'rice_dishes', 'lunch', 14, 27, 7, 'simmered'),
];
