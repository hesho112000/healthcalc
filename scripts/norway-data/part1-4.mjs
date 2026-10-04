import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../norway-base-data/rows.mjs';

export default buildRows(
  ['root_soup_herbs'],
  ['laks_paprika', 'torsk_brokkoli', 'orret_nepe', 'hyse_gryte', 'krabbe_pasta', 'fiskeboller_karry', 'kylling_karry_gryte', 'kylling_brokkoli_grateng', 'kalv_boller_dill', 'biff_erter_gryte', 'potet_grateng', 'rotkal_salat_eple', 'brokkoli_suppe', 'kavring', 'multe_yoghurt'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
