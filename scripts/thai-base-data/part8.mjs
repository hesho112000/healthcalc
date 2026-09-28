// Thai base part 8 of 9: rice_cakes_sweets (5) + street_snacks (4) = 9 rows.
import { B, T } from './rows.mjs';

export default [
  // --- rice_cakes_sweets (5) ---
  B(`توب تيم كروب ${T}`, 'Tub tim grob', 'Tub tim grob', 'Tub tim grob', 'Tub Tim Grob', 'rice_cakes_sweets', 'snacks', 3, 22, 7, 'simmered'),
  B(`ارز لزج بالبطاطا ${T}`, 'Khao niao man taro sticky rice', 'Riz gluant au taro', 'Arroz pegajoso con taro', 'Klebriger Taro-Reis', 'rice_cakes_sweets', 'snacks', 4, 27, 5, 'steamed'),
  B(`تونغ ييب عجين مقلي ${T}`, 'Thong yip fried dough', 'Pate frithee thong yip', 'Masa frita thong yip', 'Thong Yip Teigfrikaten', 'rice_cakes_sweets', 'snacks', 4, 26, 10, 'deep-fried'),
  B(`كعك الفول الأخضر ${T}`, 'Khanom thua mung bean cake', 'Gateau haricots mungo', 'Bizcocho de frijol mungo', 'Mungobohnen-Kuchen', 'rice_cakes_sweets', 'snacks', 7, 24, 8, 'steamed'),
  B(`كعك جوز الهند ${T}`, 'Khanom khom coconut pancakes', 'Pancakes kokos khanom khom', 'Panqueques de coco', 'Kokos-Pfannkuchen', 'rice_cakes_sweets', 'snacks', 4, 28, 8, 'griddled'),

  // --- street_snacks (4) ---
  B(`ارز لزج مبخر ${T}`, 'Khao tom mat sticky rice parcels', 'Riz gluant vapeur', 'Arroz pegajoso al vapor', 'Gedämpfte Klebreis-Päckchen', 'street_snacks', 'snacks', 5, 25, 5, 'steamed'),
  B(`حلوى الفاي ثونغ ${T}`, 'Fai thong sweet pastry', 'Patisserie sucree fai thong', 'Bolleria dulce fai thong', 'Süßes Fai-Thong-Gebäck', 'street_snacks', 'snacks', 3, 28, 11, 'deep-fried'),
  B(`كيك الموز بالطبقات ${T}`, 'Khanom chan banana layer cake', 'Gateau banane en couches', 'Bizcocho de platano en capas', 'Bananenschichttorte', 'street_snacks', 'snacks', 3, 26, 7, 'steamed'),
  B(`موز مقلي مقرمش ${T}`, 'Kluai tod crispy banana', 'Banane frite croustillante', 'Plátano frito crujiente', 'Knusprige frittierte Banane', 'street_snacks', 'snacks', 2, 24, 9, 'deep-fried'),
];
