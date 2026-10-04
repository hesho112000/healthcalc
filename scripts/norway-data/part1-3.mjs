import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../norway-base-data/rows.mjs';

export default buildRows(
  ['fish_soup_potato', 'wholegrain_porridge'],
  ['gravet_orret_salat', 'torsk_dill_saus', 'laks_hvitlok', 'breiflabb_gryte', 'krabbe_suppe', 'reke_omelett', 'laks_omelett', 'fiske_wrap', 'kylling_wrap', 'laks_ris_bol', 'kylling_quinoa', 'kalkun_stek', 'lammekoteletter_mynte', 'kjottkaker_rotmos', 'kalv_kotelett', 'biff_sopp_saus', 'gronnsak_grateng', 'kålrabi_salat', 'brokkoli_salat', 'spinat_omelett', 'sopp_omelett', 'lefse', 'rugbrod_hummus', 'eple_kanel_kompott', 'pære_kompott', 'plomme_kompott', 'jordbaer_fromasj', 'solbaer_fromasj', 'havre_kjeks', 'kardemomme_kake'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
