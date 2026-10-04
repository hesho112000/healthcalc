import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../finland-base-data/rows.mjs';
export default buildRows(
  ['kasviskeitto'],
  ['pinaattilaatikko', 'kuhakeitto', 'jauhelihapihvi'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
