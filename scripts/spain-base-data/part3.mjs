import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['bean_stew', 'orange_salad'],
  ['leche_frita', 'torrijas', 'ensaimada', 'migas', 'callos', 'rabo_toro', 'merluza_vasca', 'boquerones', 'espetos', 'papas_arrugas', 'gofio_miel', 'tumbet', 'carrilleras', 'pollo_ajillo', 'queso_manchego'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
