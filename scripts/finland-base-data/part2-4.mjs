import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';
export default buildRows(
  ['hilla_kiisseli'],
  ['piimapannukakku', 'lohiperunavuoka'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
