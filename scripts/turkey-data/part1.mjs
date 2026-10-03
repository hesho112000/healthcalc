import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../turkey-base-data/rows.mjs';

export default buildRows(
  ['tomato_bulgur', 'chicken_skewers'],
  ['muska_boregi', 'dible', 'acem_pilavi', 'perde_pilavi', 'firik_pilavi', 'maklube', 'nokul', 'ay_coregi', 'tahini_corek', 'zeytinyagli_kabak', 'zeytinyagli_pirasa', 'zeytinyagli_enginar', 'zeytinyagli_bakla', 'zeytinyagli_bamya', 'zeytinyagli_kereviz', 'kabak_mucver', 'patlican_musakka', 'firinda_makarna'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
