import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../benelux-base-data/rows.mjs';

export default buildRows(
  ['pumpkin_soup', 'carrot_salad', 'cheese_omelette'],
  ['beschuit_muisjes', 'bami_goreng', 'gromperezopp', 'kuddelfleck', 'verwurelter', 'aeppelkuch', 'boxemannchen', 'bretzel', 'feschzopp', 'quiche_leek', 'apfelkuechle'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
