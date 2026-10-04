import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../ukraine-base-data/rows.mjs';

export default buildRows(
  ['chicken_kyiv'],
  ['kholodets_turkey', 'solyanka_chicken'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);

