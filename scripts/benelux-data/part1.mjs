import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../benelux-base-data/rows.mjs';

export default buildRows(
  ['mustard_chicken', 'leek_soup', 'herb_cod'],
  ['chicon_salade', 'waterzooi_fish', 'crevettes_croquettes', 'stoemp', 'flamiche', 'tarte_sucre', 'mattentaart', 'cramique', 'couque_dinant', 'cuberdon', 'boulettes_tomate'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
