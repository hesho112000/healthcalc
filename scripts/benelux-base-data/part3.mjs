import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['cheese_tart', 'bean_stew', 'trout_almond'],
  ['poffertjes', 'stroopwafel', 'gouda', 'hutspot', 'kibbeling', 'appeltaart', 'pannenkoeken', 'ontbijtkoek', 'tompouce', 'kroket', 'hachee'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
