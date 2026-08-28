import React from 'react'

export default function SimpleBlueprint({ onClose, selectedCuisine, dayMeals, onFullPlan }: any) {
  const meals = dayMeals?.meals ?? []
  const pick = (index: number, fallback: string) => {
    const m = meals[index]
    return m?.items?.[0] || fallback
  }
  return (
    <div className="fixed inset-0 bg-black/70 z-[99999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Personalized Health Blueprint - Day 1</h2>
          <button onClick={onClose} className="text-3xl leading-none cursor-pointer">×</button>
        </div>
        <div className="p-6">
          <div className="bg-blue-50 p-3 rounded-lg mb-4 text-sm">
            Cuisine: {selectedCuisine} (change from outside cards)
          </div>
          <div className="space-y-3">
            <div className="border p-3 rounded-lg">🍳 Breakfast: {pick(0, 'Ful Medames + Apple + Orange Juice')}</div>
            <div className="border p-3 rounded-lg">🍎 Snacks: {pick(1, 'Fruits + Juices')}</div>
            <div className="border p-3 rounded-lg">🍱 Lunch: {pick(2, 'Kabsa')}</div>
            <div className="border p-3 rounded-lg">🍲 Dinner: {pick(4, 'Grilled Chicken')}</div>
          </div>
          {onFullPlan ? (
            <button
              onClick={onFullPlan}
              className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all"
            >
              📅 Open Full 30-Day Plan with PDF / Print
            </button>
          ) : (
            <p className="text-xs text-gray-400 mt-4">Get the full 30-day plan with PDF export from the "Full 30-Day Plan" button.</p>
          )}
        </div>
        <div className="p-6 border-t">
          <button onClick={onClose} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold cursor-pointer">Close</button>
        </div>
      </div>
    </div>
  )
}