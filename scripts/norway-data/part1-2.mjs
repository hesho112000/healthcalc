import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../norway-base-data/rows.mjs';

export default buildRows(
  ['pea_soup', 'oat_bread'],
  ['gravlaks_salat', 'torsk_erter', 'hyse_ovn', 'laks_quinoa', 'makrell_salat', 'reke_gryte', 'krabbe_eple_salat', 'laks_spinat', 'sei_suppe', 'fiske_brokkoli_grateng', 'oksestek', 'lammegryte_tomat', 'kjottkaker_erter', 'kalv_boller', 'biff_lok', 'kylling_erter', 'kylling_grill_salat', 'kylling_suppe_nudel', 'byggotto', 'rug_salat', 'potet_mos', 'rotmos', 'surkal', 'gronnsak_wok', 'skyr_notter', 'havre_pannekaker', 'eple_grot', 'bringebaer_fromasj', 'blabaer_kompott', 'suksesskake'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
