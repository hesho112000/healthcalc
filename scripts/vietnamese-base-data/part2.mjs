// Vietnamese base part 2 of 6: noodle_dishes (14) = 14 rows.
// Phở / bún / mì are the three great Vietnamese noodle families. Halal notes:
// Bún chả is classically pork (vịt quay + chả); authored here as beef.
// Phở uses beef/chicken broth; nước mắm (fish sauce) is fish-fermented, not alcohol.
import { B, T } from './rows.mjs';

export default [
  B(`فو باو ${T}`, 'Beef pho', 'Pho au boeuf', 'Pho de ternera', 'Rinder-Pho', 'noodle_dishes', 'lunch', 10, 9, 4, 'simmered'),
  B(`فو توم ${T}`, 'Shrimp pho', 'Pho aux crevettes', 'Pho de camarones', 'Garnelen-Pho', 'noodle_dishes', 'lunch', 11, 8, 3.5, 'simmered'),
  B(`فو خوا ${T}`, 'Old style Hanoi pho', 'Pho traditionnel de Hanoi', 'Pho tradicional de Hanói', 'Traditioneller Hanoi-Pho', 'noodle_dishes', 'lunch', 10, 8, 4.5, 'simmered'),
  B(`بون بو هويه ${T}`, 'Hue beef vermicelli soup', 'Soupe de vermicelles au boeuf de Hue', 'Sopa de fideos con ternera de Hue', 'Rindfleisch-Nudelsuppe Hue', 'noodle_dishes', 'dinner', 12, 12, 6, 'simmered'),
  B(`بون ثانغ ${T}`, 'Bun thang chicken noodle soup', 'Soupe de nouilles bun thang au poulet', 'Sopa de fideos bun thang con pollo', 'Bun-Thang-Nudelsuppe mit Huhn', 'noodle_dishes', 'lunch', 11, 11, 5, 'simmered'),
  B(`مي كوانغ ${T}`, 'Quang turmeric noodles', 'Nouilles au curcuma Quang', 'Fideos con cúrcuma Quang', 'Quang-Nudeln mit Kurkuma', 'noodle_dishes', 'dinner', 12, 18, 6, 'simmered'),
  B(`بون تشا باو ${T}`, 'Bun cha with beef', 'Bun cha au boeuf', 'Bun cha con ternera', 'Bun Cha mit Rindfleisch', 'noodle_dishes', 'dinner', 13, 12, 8, 'grilled'),
  B(`كاو لاو ${T}`, 'Cao lau noodles', 'Nouilles cao lau', 'Fideos cao lau', 'Cao-lau-Nudeln', 'noodle_dishes', 'dinner', 10, 20, 4, 'simmered'),
  B(`بون بي ${T}`, 'Bun bi beef noodle salad', 'Salade de nouilles bun bi au boeuf', 'Ensalada de fideos bun bi con ternera', 'Bun-Bi-Nudelsalat mit Rindfleisch', 'noodle_dishes', 'lunch', 7, 24, 5, 'simmered'),
  B(`بانِه بوت لوك ${T}`, 'Banh bot loc rice noodles', 'Nouilles de riz banh bot loc', 'Fideos de arroz banh bot loc', 'Banh-Bot-Loc-Reisnudeln', 'noodle_dishes', 'lunch', 8, 24, 4, 'simmered'),
  B(`مي زاو بالروبيان ${T}`, 'Stir-fried noodles with shrimp', 'Nouilles frites aux crevettes', 'Fideos salteados con camarones', 'Gebratene Nudeln mit Garnelen', 'noodle_dishes', 'dinner', 13, 25, 9, 'stir-fried'),
  B(`بانِه هوي ${T}`, 'Banhhoi rice noodle soup', 'Soupe de nouilles de riz banh hoi', 'Sopa de fideos de arroz banh hoi', 'Banh-Hoi-Reisnudelsuppe', 'noodle_dishes', 'lunch', 8, 19, 6, 'simmered'),
  B(`فو الخضار ${T}`, 'Vegetable pho', 'Pho aux legumes', 'Pho de verduras', 'Gemüse-Pho', 'noodle_dishes', 'lunch', 6, 9, 3, 'simmered'),
  B(`بون مي نام بو ${T}`, 'Southern rice vermicelli', 'Vermicelles de riz du Sud', 'Fideos de arroz del Sur', 'Südliche Reisnudeln', 'noodle_dishes', 'lunch', 9, 26, 5, 'simmered'),
];
