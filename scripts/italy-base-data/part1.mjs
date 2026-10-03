import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['roast_chicken', 'tomato_pasta', 'grilled_fish'],
  ['pizza_margherita', 'carbonara', 'amatriciana', 'bolognese', 'lasagna', 'ossobuco', 'risotto_milanese', 'tiramisu', 'gelato', 'focaccia', 'bruschetta'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
