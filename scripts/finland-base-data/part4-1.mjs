import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';
export default buildRows(
  ['perunarieska'],
  ['munakokkeli', 'sorsapaisti', 'katkarapukeitto'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
