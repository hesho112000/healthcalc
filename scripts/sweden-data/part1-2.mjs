import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../sweden-base-data/rows.mjs';

export default buildRows(
  ['salmon_soup_potato', 'oat_bilberry_cinnamon'],
  ['algstek', 'alggryta', 'algfars_limpa', 'alg_burgare', 'algskav', 'hjortstek', 'hjortgryta', 'hjortbullar', 'hjortfars_limpa', 'ren_gryta_selleri', 'orrbrost', 'tjaderbrost', 'rapphons', 'vildand_apple', 'orrgryta', 'raggmunk', 'filmjolk_granola', 'ris_a_la_malta', 'chokladboll', 'pepparkaka', 'lussekatt', 'semla', 'prinsesstarta', 'kladdkaka', 'pannacotta_hallon', 'nyponsoppa', 'aggost', 'tunnbrod_ost', 'havredryck_bar', 'morotssoppa_kram'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
