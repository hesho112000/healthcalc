import React, { useState } from 'react';
import { FOODS_DATABASE, Cuisine, getFoodsByCuisine, generateMealWithCuisine } from '../utils/calculations';
import { MEAL_POOLS_BY_CUISINE, getMealPlanByCuisine } from '../utils/healthPlans';

interface CuisineSelectorProps {
  targetCalories: number;
  profile: { age: number; weight: number; height: number; gender: string };
  labs?: Record<string, number>;
}

const CUISINE_OPTIONS = [
  { id: 'egyptian' as Cuisine, label: 'مصري', flag: '🇪🇬', desc: 'فول، كشري، طعمية، قريش' },
  { id: 'khaleeji' as Cuisine, label: 'خليجي', flag: '🇸🇦', desc: 'كبسة، مجبوس، شاورما، هريس' },
  { id: 'healthy' as Cuisine, label: 'صحي عالمي', flag: '🥗', desc: 'شوفان، سلمون، كينوا، أفوكادو' },
  { id: 'vegetarian' as Cuisine, label: 'نباتي', flag: '🌱', desc: 'عدس، فول، خضار، شوفان' },
];

export const CuisineSelector: React.FC<CuisineSelectorProps> = ({ targetCalories, profile, labs = {} }) => {
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine>('egyptian');
  const [selectedDay, setSelectedDay] = useState(1);

  const mealPlan = getMealPlanByCuisine(selectedCuisine, selectedDay, profile, labs);
  const foods = getFoodsByCuisine(selectedCuisine, targetCalories);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Dropdown اختيار المطبخ */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>🍽️</span> اختار نوع الأكل اللي بتحبه
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {CUISINE_OPTIONS.map((cuisine) => (
            <button
              key={cuisine.id}
              onClick={() => setSelectedCuisine(cuisine.id)}
              className={`relative p-4 rounded-xl border-2 text-right transition-all ${
                selectedCuisine === cuisine.id
                  ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{cuisine.flag}</span>
                    <span className="font-bold text-gray-900">{cuisine.label}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{cuisine.desc}</p>
                </div>
                {selectedCuisine === cuisine.id && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* قائمة الأكل الدقيقة بالسعرات */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>📊</span> جدول السعرات الدقيقة - {CUISINE_OPTIONS.find(c => c.id === selectedCuisine)?.label}
          </span>
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            مصدر: USDA FoodData Central
          </span>
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-right py-3 px-3 font-bold">الصنف</th>
                <th className="text-right py-3 px-3 font-bold">الكمية</th>
                <th className="text-center py-3 px-3 font-bold">سعرات</th>
                <th className="text-center py-3 px-3 font-bold">بروتين</th>
                <th className="text-center py-3 px-3 font-bold">كارب</th>
                <th className="text-center py-3 px-3 font-bold">دهون</th>
              </tr>
            </thead>
            <tbody>
              {foods.slice(0, 8).map((food, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-3">
                    <div className="font-medium text-gray-900">{food.name}</div>
                    <div className="text-xs text-gray-400">{food.name_en}</div>
                  </td>
                  <td className="py-3 px-3 text-gray-600">{food.portion}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-bold">
                      {food.calories}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center text-gray-700">{food.protein}ج</td>
                  <td className="py-3 px-3 text-center text-gray-700">{food.carbs}ج</td>
                  <td className="py-3 px-3 text-center text-gray-700">{food.fat}ج</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* جميع الأرقام لكل حصة مذكورة ومحسوبة بدقة من قاعدة بيانات وزارة الزراعة الأمريكية</p>
      </div>

      {/* خطة الوجبات المقترحة */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span>🗓️</span> خطة اليوم - {selectedDay}
          </h3>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`w-8 h-8 rounded-full text-sm font-bold transition ${
                  selectedDay === day ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {mealPlan.map((meal, idx) => (
            <div key={idx} className="border rounded-xl p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    {meal.meal === 'الفطار' ? '🌅' : meal.meal === 'الغدا' ? '☀️' : meal.meal === 'العشا' ? '🌙' : '🍎'} {meal.meal}
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{meal.cuisine || selectedCuisine}</span>
                  </h4>
                  <p className="text-xs text-green-600 mt-1">💡 {meal.tips}</p>
                </div>
                <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {meal.calories} سعر
                </span>
              </div>
              <ul className="mt-3 space-y-1">
                {meal.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-800">إجمالي اليوم:</span>
            <span className="text-xl font-extrabold text-green-700">
              {mealPlan.reduce((sum, m) => sum + m.calories, 0)} سعر حراري
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            الهدف: {targetCalories} سعر - الفرق: {Math.abs(targetCalories - mealPlan.reduce((sum, m) => sum + m.calories, 0))} سعر
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuisineSelector;
