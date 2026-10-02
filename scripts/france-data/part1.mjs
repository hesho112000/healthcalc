import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../france-base-data/rows.mjs';

export default buildRows(
  ['mustard_chicken', 'squash_potage', 'herb_cod'],
  ['salade_nicoise', 'pissaladiere', 'brandade', 'dauphinois', 'pot_au_feu'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
