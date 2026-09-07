import type { Cuisine } from './calculations_expanded';

export interface CuisineSwapItem {
  name: string;
  nameAr: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: string[];
  cuisine?: string;
}

export const cuisineMealsDB: Record<string, CuisineSwapItem[]> = {
  egyptian: [
    { name: 'Foul Medames', nameAr: 'فول', calories: 120, protein: 7.5, carbs: 15, fat: 2, mealType: ['breakfast', 'lunch'] },
    { name: 'Koshari', nameAr: 'كشري', calories: 165, protein: 5.5, carbs: 28, fat: 2, mealType: ['lunch'] },
    { name: 'Grilled Chicken + Molokhia', nameAr: 'فراخ مشوية + ملوخية', calories: 140, protein: 18, carbs: 5, fat: 6, mealType: ['lunch', 'dinner'] },
    { name: 'Taameya', nameAr: 'طعمية', calories: 330, protein: 13, carbs: 32, fat: 18, mealType: ['breakfast'] },
    { name: 'Grilled Fish Sayadeya', nameAr: 'سمك مشوي صيادية', calories: 180, protein: 22, carbs: 10, fat: 5, mealType: ['lunch'] },
    { name: 'Shawarma', nameAr: 'شاورما', calories: 250, protein: 20, carbs: 15, fat: 12, mealType: ['lunch', 'dinner'] },
    { name: 'Greek Yogurt + Honey', nameAr: 'زبادي يوناني + عسل', calories: 80, protein: 6, carbs: 10, fat: 1, mealType: ['breakfast', 'snack', 'dinner'] },
    { name: 'Feel Mahshi', nameAr: 'فيل محشي', calories: 210, protein: 12, carbs: 25, fat: 8, mealType: ['dinner'] },
    { name: 'Molokhia', nameAr: 'ملوخية', calories: 60, protein: 4, carbs: 5, fat: 3, mealType: ['lunch', 'dinner'] },
  ],
  mediterranean: [
    { name: 'Greek Salad', nameAr: 'سلطة يونانية', calories: 90, protein: 2, carbs: 6, fat: 7, mealType: ['lunch', 'dinner', 'snack'] },
    { name: 'Hummus + Pita', nameAr: 'حمص + خبز بيتا', calories: 160, protein: 8, carbs: 14, fat: 9, mealType: ['breakfast', 'snack'] },
    { name: 'Grilled Salmon', nameAr: 'سلمون مشوي', calories: 208, protein: 22, carbs: 0, fat: 12, mealType: ['lunch', 'dinner'] },
    { name: 'Fatteh', nameAr: 'فتة', calories: 150, protein: 9, carbs: 18, fat: 5, mealType: ['lunch'] },
    { name: 'Tabbouleh', nameAr: 'تبولة', calories: 65, protein: 2, carbs: 8, fat: 3, mealType: ['snack', 'lunch'] },
    { name: 'Falafel Salad', nameAr: 'سلطة طعمية', calories: 180, protein: 8, carbs: 16, fat: 10, mealType: ['lunch'] },
    { name: 'Quinoa Bowl', nameAr: 'بولة كينوا', calories: 170, protein: 7, carbs: 22, fat: 6, mealType: ['lunch', 'dinner'] },
  ],
  mexican: [
    { name: 'Chicken Fajita Bowl', nameAr: 'بولة فاهيتا فراخ', calories: 140, protein: 15, carbs: 12, fat: 5, mealType: ['lunch', 'dinner'] },
    { name: 'Guacamole + Tortilla', nameAr: 'جواكامولي + تورتيلا', calories: 200, protein: 3, carbs: 15, fat: 14, mealType: ['snack'] },
    { name: 'Bean Burrito', nameAr: 'بوريتو فاصوليا', calories: 240, protein: 11, carbs: 35, fat: 6, mealType: ['lunch', 'dinner'] },
  ],
  italian: [
    { name: 'Margherita Pizza Slice', nameAr: 'شريحة بيتزا مارغريتا', calories: 250, protein: 10, carbs: 30, fat: 10, mealType: ['lunch', 'dinner'] },
    { name: 'Pasta Primavera', nameAr: 'باستا بريمافيرا', calories: 150, protein: 6, carbs: 22, fat: 4, mealType: ['lunch'] },
    { name: 'Caprese Salad', nameAr: 'سلطة كابريزي', calories: 120, protein: 6, carbs: 5, fat: 9, mealType: ['lunch', 'dinner'] },
    { name: 'Minestrone Soup', nameAr: 'شوربة مينستروني', calories: 90, protein: 4, carbs: 12, fat: 2, mealType: ['dinner'] },
  ],
  tunisian: [
    { name: 'Lablabi', nameAr: 'لبلابي', calories: 130, protein: 8, carbs: 18, fat: 3, mealType: ['breakfast', 'lunch'] },
    { name: 'Tunisian Salad', nameAr: 'سلطة تونسية', calories: 110, protein: 3, carbs: 8, fat: 7, mealType: ['lunch'] },
  ],
  libyan: [
    { name: 'Bazeen', nameAr: 'بازين', calories: 180, protein: 7, carbs: 25, fat: 6, mealType: ['lunch'] },
    { name: 'Couscous + Vegetables', nameAr: 'كسكسي بالخضار', calories: 160, protein: 6, carbs: 24, fat: 4, mealType: ['lunch', 'dinner'] },
  ],
  default: [
    { name: 'Grilled Chicken Breast', nameAr: 'صدر فراخ مشوي', calories: 165, protein: 31, carbs: 0, fat: 3.6, mealType: ['lunch', 'dinner'] },
    { name: 'Brown Rice', nameAr: 'أرز بني', calories: 130, protein: 2.5, carbs: 28, fat: 0.3, mealType: ['lunch'] },
    { name: 'Oats', nameAr: 'شوفان', calories: 68, protein: 2.5, carbs: 12, fat: 1, mealType: ['breakfast', 'snack'] },
    { name: 'Boiled Eggs', nameAr: 'بيض مسلوق', calories: 140, protein: 12, carbs: 1, fat: 10, mealType: ['breakfast', 'snack'] },
    { name: 'Mixed Vegetable Salad', nameAr: 'سلطة خضار', calories: 45, protein: 2, carbs: 8, fat: 1, mealType: ['lunch', 'dinner'] },
  ],
};

const cuisineBucket = (cuisine: Cuisine | null): string => cuisine ?? 'default';

export const addCustomToCuisineDB = (
  item: { name: string; nameAr?: string; calories: number; protein: number; carbs: number; fat: number },
  cuisine: Cuisine | null,
  slot: string,
) => {
  const key = cuisineBucket(cuisine);
  const bucket = cuisineMealsDB[key] ?? (cuisineMealsDB[key] = []);
  const existing = bucket.find((i) => i.name.toLowerCase() === item.name.toLowerCase());
  if (!existing) {
    bucket.push({ name: item.name, nameAr: item.nameAr ?? item.name, calories: item.calories, protein: item.protein, carbs: item.carbs, fat: item.fat, mealType: [slot], cuisine: cuisine ?? undefined });
  } else if (!existing.mealType.includes(slot)) {
    existing.mealType.push(slot);
  }
};

export const getSwapOptions = (cuisine: Cuisine | null, slot: string): CuisineSwapItem[] => {
  const key = cuisineBucket(cuisine);
  const available = cuisineMealsDB[key] ?? cuisineMealsDB.default;
  const filtered = available.filter((m) => (m.mealType ?? []).includes(slot));
  return (filtered.length ? filtered : available).slice(0, 8);
};