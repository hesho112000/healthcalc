import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['tomato_salad', 'lemon_potato', 'almond_cake'],
  ['arancini', 'caponata', 'pasta_norma', 'frittata', 'panzanella', 'ribollita', 'pappa_pomodoro', 'cannoli', 'panna_cotta', 'fritto_misto', 'panettone'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
