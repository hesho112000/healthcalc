import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['fried_herring_onion', 'root_veg_barley_stew'],
  ['frikadeller', 'hakkebof', 'boller_karry', 'oksesteg', 'lammesteg', 'kyllingesteg', 'andesteg', 'gasesteg', 'kalvefrikasse', 'kod_gryde', 'gule_aerter', 'honesupp', 'gronlangkal', 'stegt_sild', 'marineret_sild', 'karrysild', 'roget_laks', 'gravad_laks', 'stegt_rodspatte', 'fiskefrikadeller', 'torsk_senap', 'laks_spinat', 'rejesalat', 'blamuslinger', 'hummer_bisque', 'rodkal', 'gulerodstuing', 'rugbrod_ost', 'havregrod_abler', 'rundstykke_ost'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
