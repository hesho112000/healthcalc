import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../spain-base-data/rows.mjs';

export default buildRows(
  ['garlic_paprika_chicken', 'paprika_potato'],
  ['paella_verduras', 'arroz_pollo_campo', 'sopa_ajo', 'sopa_pescado', 'lentejas_verduras', 'alubias_tolosa', 'pochas_navarra', 'esgarraet', 'esqueixada', 'calcots_romesco', 'alcachofas_ajillo', 'setas_plancha', 'patatas_pobre', 'piquillos_bacalao', 'txuleta', 'cordero_segovia'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
