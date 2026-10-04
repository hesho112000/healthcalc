import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  [
    'kovbasa_domashnya',
    'kartoplyanka',
    'banosh',
    'kulesha',
    'nalysnyky_cheese',
    'sirniki_raspberry',
    'syrnyky_blueberry',
    'medivnyk',
  ],
  [
    'fish_cutlets',
    'beef_stroganoff',
  ],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
