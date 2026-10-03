import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../greece-base-data/rows.mjs';

export default buildRows(
  ['bean_salad', 'lemon_potatoes'],
  ['horta', 'kolokithokeftedes', 'domatokeftedes', 'tirokafteri', 'skordalia', 'elies', 'ladera_fasolakia', 'revithokeftedes', 'kalitsounia', 'sfakianopita', 'bougatsa', 'diples', 'koulourakia', 'melomakarona', 'karidopita'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
