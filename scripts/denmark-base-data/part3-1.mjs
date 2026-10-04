import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['veal_veg_stew'],
  ['stegt_kylling_citron', 'kod_boller_dild', 'laks_erter_gryde'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
