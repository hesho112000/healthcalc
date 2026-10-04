import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  [
    'ukrainian_pork_sausage',
    'deruny_potato_pancakes',
    'kasha_grechnevaya',
    'okroshka_classic',
    'salat_vinegret',
    'borscht_green',
    'rassolnik',
    'sorrel_soup',
  ],
  [
    'chicken_kyiv',
    'kholodets_turkey',
    'solyanka_chicken',
  ],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
