import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  [
    'zrazy_mushroom',
    'ikra_buriakova',
    'chicken_fricassee',
    'varenyky_cherry',
    'fish_cutlets',
    'beef_stroganoff',
    'kutia_rice',
    'paska_bread',
  ],
  [
    'holubtsi_beef',
    'syrnyky_cottage',
    'halushky_mushroom',
    'mushroom_stew',
    'rye_bread',
    'beetroot_soup',
    'pampushky_garlic',
    'stuffed_peppers',
    'millet_porridge',
    'turkey_meatballs',
    'pumpkin_soup',
    'uzvar',
    'varenyky_potato',
    'borscht_beef',
  ],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
