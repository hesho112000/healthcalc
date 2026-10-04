import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../denmark-base-data/rows.mjs';

export default buildRows(
  ['yellow_pea_carrot_soup', 'oat_berry_porridge'],
  ['stegt_aal', 'roget_sild', 'fiskefilet_remetoulade', 'torsk_dild', 'laks_rugbrod', 'rejemad', 'fiskesuppe_dk', 'torskerogn', 'sild_salat', 'oksegryde_erter', 'kalvekod_gryde', 'kylling_karry', 'kylling_persille', 'haregryde', 'hjortegryde', 'fasangryde', 'dadyr_stek', 'kanin_sovs', 'rodfrugt_salat', 'persillestuing', 'rosenkal_smor', 'kartoffelmos', 'brunede_kartofler', 'rodgrod_flode', 'risalamande', 'koldskal', 'aeblekage', 'aebleskiver', 'wienerbrod_kanel', 'tebirkes'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
