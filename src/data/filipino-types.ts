export interface FilipinoFullDish {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  nameEs: string;
  nameDe: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'side' | 'salad' | 'fruit';
  grams: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  cooking?: string;
}
