import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../denmark-base-data/rows.mjs';

export default buildRows(
  ['salmon_spinach_steam'],
  ['hjort_pasta', 'laks_ovn_erter', 'makrel_salat'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
