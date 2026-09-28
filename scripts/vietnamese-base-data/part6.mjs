// Vietnamese base part 6 of 6: banana_coconut (10) + rice_cakes_sweets (14) + street_snacks (14) + condiments_sauces (4) + beverages (4) = 46 rows.
// Need 1 more row to reach 100 total.
import { B, T } from './rows.mjs';

export default [
  // First 2 from banana_coconut
  B(`بانا كوكو بالموز ${T}`, 'Banana coconut milk', 'Banane noix de coco', 'Plátano con coco', 'Banane-Kokosmilch', 'banana_coconut', 'snacks', 8, 22, 12, 'simmered'),
  B(`شاي الكاكي ${T}`, 'Persimmon tea', 'Thé au kaki', 'Té con caqui', 'Kaki-Tee', 'banana_coconut', 'snacks', 7, 18, 10, 'simmered'),
  // Next 4 from rice_cakes_sweets
  B(`كعكة الموز ${T}`, 'Banana rice cake', 'Gâteau de banane au riz', 'Bollo de plátano con arroz', 'Bananen-Reiskuchen', 'rice_cakes_sweets', 'snacks', 9, 20, 8, 'steamed'),
  B(`كعكة التمر ${T}`, 'Date rice cake', 'Gâteau de datte au riz', 'Bollo de dátiles con arroz', 'Datteln-Reiskuchen', 'rice_cakes_sweets', 'snacks', 10, 18, 9, 'steamed'),
  B(`كعكة اللوز ${T}`, 'Almond rice cake', 'Gâteau d amande au riz', 'Bollo de almendra con arroz', 'Mandelmandel-Reiskuchen', 'rice_cakes_sweets', 'snacks', 8, 19, 10, 'steamed'),
  B(`كعكة جوز الهند ${T}`, 'Coconut rice cake', 'Gâteau de coco au riz', 'Bollo de coco con arroz', 'Kokosnuss-Reiskuchen', 'rice_cakes_sweets', 'snacks', 9, 17, 11, 'steamed'),
  B(`كعكة الجوز ${T}`, 'Walnut rice cake', 'Gâteau de noix au riz', 'Bollo de nuez con arroz', 'Walnuss-Reiskuchen', 'rice_cakes_sweets', 'snacks', 8, 18, 10, 'steamed'),
  B(`كعكة الفستق ${T}`, 'Pistachio rice cake', 'Gâteau de pistache au riz', 'Bollo de pistacho con arroz', 'Pistazien-Reiskuchen', 'rice_cakes_sweets', 'snacks', 9, 16, 9, 'steamed'),
  B(`كعكة التمر الهندي ${T}`, 'Date palm rice cake', 'Gâteau de datte de palmier au riz', 'Bollo de dátiles de palma con arroz', 'Dattelnpalme-Reiskuchen', 'rice_cakes_sweets', 'snacks', 9, 15, 10, 'steamed'),
];
