import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['roast_chicken', 'tomato_rice'],
  ['paella', 'paella_marisco', 'gazpacho', 'salmorejo', 'tortilla', 'churros', 'fabada', 'cocido', 'pulpo', 'pisto', 'albondigas', 'empanada', 'patatas_bravas', 'croquetas', 'pan_tomate', 'gambas_ajillo'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
