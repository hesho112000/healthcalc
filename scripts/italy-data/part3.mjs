import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../italy-base-data/rows.mjs';

export default buildRows(
  ['chickpea_soup', 'apple_tart', 'rice_salad'],
  ['fagioli_tonno', 'farinata', 'piadina', 'suppli', 'polpette', 'bistecca', 'cassata', 'sfogliatella', 'biscotti', 'granita', 'zeppole'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
