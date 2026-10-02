import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../france-base-data/rows.mjs';

export default buildRows(
  ['orange_duck', 'chicken_lentils', 'pear_clafoutis'],
  ['orange_chicken', 'pan_bagnat', 'pistou_soup', 'hachis', 'apple_tart'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
