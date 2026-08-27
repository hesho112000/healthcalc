import type { RegionalFood } from '../cuisineCatalog';

export const FOODS: Record<string, RegionalFood[]> = {
  australian: [
    { name_en: 'Vegemite Toast', name_ar: 'توست الفيجمايت', mealType: 'breakfast', calories: 210, protein: 8, carbs: 28, fat: 7 },
    { name_en: 'Avocado Smash on Sourdough', name_ar: 'خبز الصردو مع الأفوكادو المهروس', mealType: 'breakfast', calories: 340, protein: 10, carbs: 34, fat: 18 },
    { name_en: 'Scrambled Eggs with Smoked Salmon', name_ar: 'بيض مخفوق مع السلمون المدخن', mealType: 'breakfast', calories: 320, protein: 24, carbs: 6, fat: 22 },
    { name_en: 'Weet-Bix with Milk and Banana', name_ar: 'رقائق ويت-بيكس مع الحليب والموز', mealType: 'breakfast', calories: 260, protein: 11, carbs: 42, fat: 5 },
    { name_en: 'Australian Meat Pie', name_ar: 'فطيرة اللحم الأسترالية', mealType: 'lunch', calories: 480, protein: 20, carbs: 46, fat: 24 },
    { name_en: 'Sausage Roll', name_ar: 'لفائف النقانق', mealType: 'lunch', calories: 360, protein: 14, carbs: 28, fat: 20 },
    { name_en: 'Barramundi Fish Burger', name_ar: 'برغر سمك الباراموندي', mealType: 'lunch', calories: 430, protein: 29, carbs: 41, fat: 15 },
    { name_en: 'Chicken and Avocado Roll', name_ar: 'لفافة الدجاج والأفوكادو', mealType: 'lunch', calories: 390, protein: 20, carbs: 33, fat: 19 },
    { name_en: 'BBQ Grilled Kangaroo Steak', name_ar: 'شريحة الكنغر المشوية على الفحم', mealType: 'dinner', calories: 370, protein: 35, carbs: 1, fat: 25 },
    { name_en: 'Roast Lamb with Roasted Vegetables', name_ar: 'لحم الضأن المشوي مع الخضروات', mealType: 'dinner', calories: 460, protein: 34, carbs: 22, fat: 24 },
    { name_en: 'Australian Fish and Chips', name_ar: 'السمك المقلي والبطاطس الأسترالي', mealType: 'dinner', calories: 700, protein: 30, carbs: 70, fat: 34 },
    { name_en: 'Chicken Parmigiana', name_ar: 'دجاج بارميجيانا', mealType: 'dinner', calories: 560, protein: 45, carbs: 28, fat: 28 },
    { name_en: 'Lamington', name_ar: 'لامينغتون', mealType: 'snack', calories: 280, protein: 3, carbs: 42, fat: 11 },
    { name_en: 'Pavlova', name_ar: 'بافلوفا', mealType: 'snack', calories: 270, protein: 2, carbs: 52, fat: 6 },
  ],
};