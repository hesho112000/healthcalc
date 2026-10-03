import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['rice_pudding', 'potato_gratin', 'egg_salad'],
  ['oliebollen', 'uitsmijter', 'mosselen', 'bouneschlupp', 'gromperekichelcher', 'friture_moselle', 'quetschentaart', 'kachkeis', 'kniddelen', 'bouchee_reine', 'staerzelen'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
