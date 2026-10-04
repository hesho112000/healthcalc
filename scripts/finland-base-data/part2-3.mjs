import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';
export default buildRows(
  ['vispipuuro'],
  ['kalakakku', 'lohimureke', 'kaalikeitto'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
