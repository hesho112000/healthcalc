export type MealSlot = 'breakfast' | 'lunch' | 'dinner';

export const CUISINE_MEAL_WHITELIST: Record<string, Record<MealSlot, string[]>> = {
  egyptian: {
    breakfast: ['shakshouka', 'full medames', 'foul medames', 'ful medames', 'foul', 'ful', 'baladi', 'feteer'],
    lunch: ['koshari', 'hawawshi', 'molokhia', 'fatta', 'mahshi', 'stuffed vine', 'vine leaves', 'shish tawook', 'kofta', 'kebab', 'lentil', 'ful medames', 'foul medames', 'shakshouka'],
    dinner: ['lentil soup', 'chorba', 'shorbet', 'stuffed vine', 'vine leaves', 'kofta', 'pigeon', 'tawook', 'shish', 'freekeh', 'harira'],
  },
  gulf: {
    breakfast: ['balaleet', 'chebab', 'harees', 'thareed', 'madrouba', 'luqaimat', 'machboos', 'qeshta'],
    lunch: ['machboos', 'harees', 'thareed', 'madrouba', 'balaleet', 'muhammar', 'kabsa', 'biryani', 'saloona', 'margoog', 'shrimp', 'hammour'],
    dinner: ['thareed', 'madrouba', 'saloona', 'marchoud', 'fish', 'shawarma', 'machboos', 'biryani'],
  },
  american: {
    breakfast: ['pancake', 'waffle', 'french toast', 'oatmeal', 'omelette', 'bagel', 'toast', 'cinnamon', 'scrambled eggs'],
    lunch: ['burger', 'cheeseburger', 'caesar', 'sandwich', 'wrap', 'macaroni and cheese', 'mac and cheese', 'grilled chicken', 'turkey'],
    dinner: ['steak', 'meatloaf', 'roast chicken', 'grilled salmon', 'bbq', 'ribs', 'pot pie', 'caesar'],
  },
  italian: {
    breakfast: ['cornetto', 'cappuccino', 'frittata', 'frittata', 'crostata'],
    lunch: ['pasta', 'spaghetti', 'linguine', 'fettuccine', 'penne', 'lasagna', 'risotto', 'bruschetta', 'gnocchi', 'margherita', 'pizza'],
    dinner: ['risotto', 'ossobuco', 'scaloppine', 'parmigiana', 'piccata', 'minestrone', 'cioppino', 'tortellini', 'tiramisu', 'pizza'],
  },
  mexican: {
    breakfast: ['huevos', 'chilaquiles', 'breakfast burrito', 'nopal', 'tacos al pastor', 'machaca'],
    lunch: ['taco', 'burrito', 'quesadilla', 'enchilada', 'guacamole', 'guac', 'fajita', 'chile', 'molcajete'],
    dinner: ['taco', 'burrito', 'enchilada', 'chile', 'pozole', 'tamale', 'carnitas', 'fajita'],
  },
  indian: {
    breakfast: ['idli', 'dosa', 'poha', 'paratha', 'puri', 'upma', 'omelette'],
    lunch: ['biryani', 'tikka', 'masala', 'curry', 'naan', 'roti', 'dal', 'paneer', 'korma', 'vindaloo', 'saag'],
    dinner: ['biryani', 'tikka', 'masala', 'curry', 'naan', 'roti', 'dal', 'paneer', 'korma', 'saag', 'rogan'],
  },
  brazilian: {
    breakfast: ['pao de queijo', 'pão de queijo', 'tapioca', 'coxinha', 'pudim', 'acai'],
    lunch: ['feijoada', 'picanha', 'moqueca', 'coxinha', 'farofa', 'stroganoff', 'churrasco'],
    dinner: ['feijoada', 'picanha', 'moqueca', 'stroganoff', 'escondidinho', 'churrasco'],
  },
};

export const HEAVY_HINTS: string[] = [
  'koshari', 'hawawshi', 'feijoada', 'steak', 'fried', 'burger', 'cheeseburger', 'ribs', 'bbq',
  'deep fried', 'milanesa', 'parmigiana', 'carbonara', 'risotto', 'pizza', 'burrito', 'feast',
  'full english', 'poutine', 'lasagna', 'pasta with meat', 'machboos', 'biryani', 'kabsa', 'korma',
  'vindaloo', 'churrasco', 'stroganoff', 'fatta', 'meatloaf', 'pot pie', 'roast', 'shawarma plate',
];

export const isHeavyMeal = (name: string, calories?: number, fat?: number): boolean => {
  const n = (name || '').toLowerCase();
  const heavyHint = HEAVY_HINTS.some((h) => n.includes(h));
  const heavyMacro = (calories ?? 0) >= 520 && (fat ?? 0) >= 18;
  return heavyHint || heavyMacro;
};

export const matchesWhitelist = (cuisine: string, slot: MealSlot, name: string, cuisines?: string[]): boolean => {
  const wl = CUISINE_MEAL_WHITELIST[cuisine]?.[slot];
  if (!wl) return true;
  if (cuisines?.includes(cuisine)) return true;
  if (cuisines?.includes('all')) return true;
  const n = (name || '').toLowerCase();
  return wl.some((t) => n.includes(t));
};

export const isTimeSuitable = (slot: MealSlot, name: string, heavy: boolean, calories?: number, fat?: number): boolean => {
  if (slot === 'breakfast' && heavy) return false;
  if (slot === 'dinner') {
    const hintHeavy = HEAVY_HINTS.some((h) => (name || '').toLowerCase().includes(h));
    if (hintHeavy && ((calories ?? 0) >= 520 || (fat ?? 0) >= 25)) return false;
  }
  return true;
};