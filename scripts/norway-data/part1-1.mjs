import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../norway-base-data/rows.mjs';

export default buildRows(
  ['barley_soup', 'rye_breakfast'],
  ['steikt_torsk', 'orret_mandler', 'laksesuppe', 'fiskepudding', 'torrfisk', 'muslinger_urter', 'seafood_chowder', 'kamskjell', 'laks_burger', 'stekt_sild', 'sei_luk', 'laks_pasta', 'fiskegryte_ris', 'kjottboller_brun', 'lammekoteletter', 'oksegryte', 'kylling_salat', 'erter_stuing', 'rotkal_stuing', 'gulrot_stuing', 'potetball', 'svele_brunost', 'rommevafler', 'riskrem', 'trollkrem', 'bondepiker', 'kanelbolle', 'hveteboller', 'multekrem', 'eplekake'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
