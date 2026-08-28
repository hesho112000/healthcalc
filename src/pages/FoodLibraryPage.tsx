import React, { useState, useMemo } from 'react';
import { FOODS_DATABASE, CUISINE_META, Cuisine, FoodItem } from '../utils/calculations_expanded';
import { useLanguage } from '../context/LanguageContext';

const FoodLibraryPage: React.FC = () => {
  const { language } = useLanguage();
  const cuisineName = (meta: { label_ar: string; label_en: string }): string => (language === 'ar' ? meta.label_ar : meta.label_en);
  const [search, setSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | 'all'>('all');
  const [calorieFilter, setCalorieFilter] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<'calories' | 'protein' | 'name'>('calories');

  const filteredFoods = useMemo(() => {
    let foods = [...FOODS_DATABASE];

    // بحث
    if (search) {
      foods = foods.filter(f => 
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.name_en.toLowerCase().includes(search.toLowerCase())
      );
    }

    // فلتر مطبخ
    if (selectedCuisine !== 'all') {
      foods = foods.filter(f => f.cuisine.includes(selectedCuisine));
    }

    // فلتر سعرات
    foods = foods.filter(f => f.calories >= calorieFilter[0] && f.calories <= calorieFilter[1]);

    // ترتيب
    foods.sort((a, b) => {
      if (sortBy === 'calories') return a.calories - b.calories;
      if (sortBy === 'protein') return b.protein - a.protein;
      return a.name.localeCompare(b.name);
    });

    return foods;
  }, [search, selectedCuisine, calorieFilter, sortBy]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-3">📚 مكتبة السعرات الحرارية</h1>
          <p className="text-lg opacity-90">35+ صنف أكل من 10 مطابخ عالمية بسعرات دقيقة من USDA</p>
          <div className="mt-4 inline-flex bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm">
            🔍 ابحث عن أي أكل + فلتر بالمطبخ + رتب بالبروتين
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8 sticky top-20 z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* بحث */}
            <div className="md:col-span-5">
              <label className="text-xs font-bold text-gray-500 mb-2 block">🔍 ابحث</label>
              <input
                type="text"
                placeholder="فول، كشري، كبسة، سوشي..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition"
              />
            </div>

            {/* مطبخ */}
            <div className="md:col-span-4">
              <label className="text-xs font-bold text-gray-500 mb-2 block">🍽️ المطبخ</label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none bg-white"
              >
                <option value="all">🌍 كل المطابخ ({FOODS_DATABASE.length})</option>
                {Object.entries(CUISINE_META).map(([key, meta]) => (
                  <option key={key} value={key}>
                    {meta.flag} {cuisineName(meta)}
                  </option>
                ))}
              </select>
            </div>

            {/* ترتيب */}
            <div className="md:col-span-3">
              <label className="text-xs font-bold text-gray-500 mb-2 block">📊 ترتيب</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none bg-white"
              >
                <option value="calories">🔥 الأقل سعرات</option>
                <option value="protein">💪 الأعلى بروتين</option>
                <option value="name">🔤 أبجدي</option>
              </select>
            </div>
          </div>

          {/* فلتر سعرات */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-xs font-bold text-gray-500">سعرات:</span>
            <div className="flex gap-2">
              {[
                { label: 'قليل <150', range: [0, 150] as [number, number] },
                { label: 'متوسط 150-250', range: [150, 250] as [number, number] },
                { label: 'عالي >250', range: [250, 500] as [number, number] },
                { label: 'الكل', range: [0, 500] as [number, number] },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setCalorieFilter(opt.range)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                    calorieFilter[0] === opt.range[0] && calorieFilter[1] === opt.range[1]
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <span className="ml-auto text-xs text-gray-400">
              {filteredFoods.length} نتيجة
            </span>
          </div>
        </div>

        {/* مطابخ سريعة */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCuisine('all')}
            className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition ${
              selectedCuisine === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            🌍 الكل
          </button>
          {Object.entries(CUISINE_META).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => setSelectedCuisine(key as Cuisine)}
              className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition flex items-center gap-1.5 ${
                selectedCuisine === key ? 'bg-green-500 text-white border-green-500' : `bg-white hover:bg-gray-50 ${meta.color}`
              }`}
            >
              <span>{meta.flag}</span> {cuisineName(meta)}
            </button>
          ))}
        </div>

        {/* جدول الأكل */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b text-[11px] uppercase tracking-wider text-gray-500">
                  <th className="text-right py-4 px-6 font-bold">الصنف</th>
                  <th className="text-right py-4 px-4 font-bold">المطبخ</th>
                  <th className="text-right py-4 px-4 font-bold">الكمية</th>
                  <th className="text-center py-4 px-3 font-bold">🔥 سعرات</th>
                  <th className="text-center py-4 px-3 font-bold">💪 بروتين</th>
                  <th className="text-center py-4 px-3 font-bold">🍞 كارب</th>
                  <th className="text-center py-4 px-3 font-bold">🥑 دهون</th>
                </tr>
              </thead>
              <tbody>
                {filteredFoods.map((food, idx) => (
                  <tr key={idx} className="border-b last:border-0 hover:bg-green-50/50 transition group">
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 group-hover:text-green-700 transition">{food.name}</div>
                      <div className="text-xs text-gray-400">{food.name_en}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {food.cuisine.slice(0, 2).map((c) => (
                          <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 border">
                            {CUISINE_META[c]?.flag} {CUISINE_META[c] ? cuisineName(CUISINE_META[c]) : c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{food.portion}</td>
                    <td className="py-4 px-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                        food.calories < 100 ? 'bg-green-100 text-green-700' :
                        food.calories < 180 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {food.calories}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center text-sm font-bold text-gray-700">{food.protein}ج</td>
                    <td className="py-4 px-3 text-center text-sm text-gray-500">{food.carbs}ج</td>
                    <td className="py-4 px-3 text-center text-sm text-gray-500">{food.fat}ج</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredFoods.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-500 font-medium">مفيش نتائج للبحث ده</p>
              <button onClick={() => { setSearch(''); setSelectedCuisine('all'); setCalorieFilter([0, 500]); }} className="mt-3 text-green-600 font-bold text-sm">
                مسح الفلاتر
              </button>
            </div>
          )}
        </div>

        {/* SEO Footer */}
        <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6">
          <h3 className="font-bold mb-2">💡 ليه مكتبة healthcalc دقيقة؟</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            كل السعرات محسوبة من <strong>USDA FoodData Central</strong> - أكبر قاعدة بيانات أكل في العالم.
            بنحسب كل صنف بالجرام، مش تقديري. تقدر تستخدم المكتبة دي في أي نظام غذائي: تخسيس، تضخيم، كيتو، أو نباتي.
            المطابخ: مصري، خليجي، شامي، مغربي، تركي، هندي، متوسطي، آسيوي.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodLibraryPage;
