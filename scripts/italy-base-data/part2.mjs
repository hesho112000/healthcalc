import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['veg_soup', 'butter_pasta', 'bean_stew'],
  ['caprese', 'minestrone', 'pesto', 'pizza_marinara', 'spaghetti_vongole', 'penne_arrabbiata', 'gnocchi', 'ravioli', 'risotto_funghi', 'parmigiana', 'polenta'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
