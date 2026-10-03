import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../benelux-base-data/rows.mjs';

export default buildRows(
  ['mushroom_toast', 'beef_carrot', 'spinach_tart'],
  ['tarte_fromage', 'gaufres_bruxelles', 'pralines', 'tarte_sirop', 'andijvie', 'zuurkool', 'kapucijners', 'bruine_bonensoep', 'mosterdsoep', 'zeeuwse_bolus', 'haagse_bluf'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
