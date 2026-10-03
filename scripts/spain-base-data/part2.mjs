import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['grilled_fish', 'paprika_soup'],
  ['bocadillo_calamares', 'bacalao_pilpil', 'marmitako', 'pimientos_padron', 'espinacas_garabanzos', 'berenjenas_miel', 'huevos_rotos', 'ajo_blanco', 'zarzuela', 'escalivada', 'fideua', 'arroz_negro', 'caldo_gallego', 'tarta_santiago', 'crema_catalana', 'flan'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
