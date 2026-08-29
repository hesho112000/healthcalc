import type { RegionalFood } from '../cuisineCatalog';

export const FOODS: Record<string, RegionalFood[]> = {
  australian: [
    { name_en: 'Vegemite Toast', name_ar: 'توست الفيجمايت', mealType: 'breakfast', calories: 150, protein: 5, carbs: 18, fat: 6 },
    { name_en: 'Avocado Smash on Sourdough', name_ar: 'خبز الصردو مع الأفوكادو المهروس', mealType: 'breakfast', calories: 378, protein: 9, carbs: 39.6, fat: 19.8 },
    { name_en: 'Scrambled Eggs with Smoked Salmon', name_ar: 'بيض مخفوق مع السلمون المدخن', mealType: 'breakfast', calories: 228, protein: 15.6, carbs: 2.4, fat: 16.8 },
    { name_en: 'Weet-Bix with Milk and Banana', name_ar: 'رقائق ويت-بيكس مع الحليب والموز', mealType: 'breakfast', calories: 195, protein: 9, carbs: 30, fat: 4.5 },
    { name_en: 'Australian Meat Pie', name_ar: 'فطيرة اللحم الأسترالية', mealType: 'lunch', calories: 522, protein: 16.2, carbs: 45, fat: 30.6 },
    { name_en: 'Sausage Roll', name_ar: 'لفائف النقانق', mealType: 'lunch', calories: 450, protein: 13.5, carbs: 40.5, fat: 25.5 },
    { name_en: 'Barramundi Fish Burger', name_ar: 'برغر سمك الباراموندي', mealType: 'lunch', calories: 300, protein: 26, carbs: 30, fat: 10 },
    { name_en: 'Chicken and Avocado Roll', name_ar: 'لفافة الدجاج والأفوكادو', mealType: 'lunch', calories: 660, protein: 36, carbs: 54, fat: 30 },
    { name_en: 'BBQ Grilled Kangaroo Steak', name_ar: 'شريحة الكنغر المشوية على الفحم', mealType: 'dinner', calories: 250, protein: 46, carbs: 0, fat: 6.4 },
    { name_en: 'Roast Lamb with Roasted Vegetables', name_ar: 'لحم الضأن المشوي مع الخضروات', mealType: 'dinner', calories: 550, protein: 60, carbs: 2.5, fat: 32.5 },
    { name_en: 'Australian Fish and Chips', name_ar: 'السمك المقلي والبطاطس الأسترالي', mealType: 'dinner', calories: 570, protein: 33, carbs: 57, fat: 21 },
    { name_en: 'Chicken Parmigiana', name_ar: 'دجاج بارميجيانا', mealType: 'dinner', calories: 550, protein: 40, carbs: 35, fat: 27.5 },
    { name_en: 'Lamington', name_ar: 'لامينغتون', mealType: 'snack', calories: 272, protein: 3.2, carbs: 44, fat: 9.6 },
    { name_en: 'Pavlova', name_ar: 'بافلوفا', mealType: 'snack', calories: 270, protein: 3, carbs: 45, fat: 9 },
  ],
};