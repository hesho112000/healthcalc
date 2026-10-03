import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../benelux-base-data/rows.mjs';

export default buildRows(
  ['chicken_leek', 'berry_crumble', 'potato_pancake'],
  ['kletskoppen', 'arretje', 'vla', 'hangop', 'stoofpeertjes', 'wentelteefjes', 'broodje_kroket', 'patat_speciaal', 'kapsalon', 'sate_kip', 'huzarensalade'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
