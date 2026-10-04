import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../finland-base-data/rows.mjs';

export default buildRows(
  ['fish_soup_potato'],
  ['metso_rinta', 'makaronilaatikko', 'hernekeitto'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
