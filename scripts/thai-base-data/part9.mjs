// Thai base part 9 of 9: condiments_sauces (3) + beverages (2) = 5 rows.
import { B, T } from './rows.mjs';

export default [
  B(`نام بلاء صوص السمك ${T}`, 'Nam pla fish sauce', 'Sauce de poisson', 'Salsa de pescado', 'Fischsauce', 'condiments_sauces', 'snacks', 8, 8, 0, 'raw'),
  B(`سكر جوز الهند ${T}`, 'Nam taan piib palm sugar', 'Sucre de palme', 'Azucar de palma', 'Palmzucker', 'condiments_sauces', 'snacks', 0, 22, 0, 'raw'),
  B(`معجون الفلفل الحار ${T}`, 'Nam prik chili paste', 'Pate de piment', 'Pasta de chile', 'Chili-Paste', 'condiments_sauces', 'snacks', 4, 12, 3, 'raw'),

  B(`شاي أحمر ${T}`, 'Cha rua Thai tea', 'The thai', 'Té tailandés', 'Thailändischer Tee', 'beverages', 'snacks', 2, 14, 2, 'brewed'),
  B(`قهوة تقليدية ${T}`, 'Gafe boran Thai coffee', 'Cafe thai', 'Café tailandés', 'Thailändischer Kaffee', 'beverages', 'snacks', 2, 12, 3, 'brewed'),
];
