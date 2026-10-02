import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['cheese_galette', 'bean_stew', 'lemon_trout'],
  ['creme_brulee', 'macarons', 'baguette', 'onion_soup', 'steak_frites'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
