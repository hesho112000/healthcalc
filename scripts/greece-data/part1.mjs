import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../greece-base-data/rows.mjs';

export default buildRows(
  ['herb_chicken', 'tomato_rice'],
  ['pastitsada', 'sofrito', 'bourdeto', 'bianco', 'savoro', 'bouyiourdi', 'keftedes', 'biftekia', 'giouvarlakia', 'kakavia', 'revithada', 'fava', 'papoutsakia', 'arakas', 'spanakorizo', 'prasorizo'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
