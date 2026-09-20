const fs = require('fs');
const path = require('path');

// Read the source file
const sourcePath = 'C:\\Users\\ELFARES\\Desktop\\Egyptian-Kitchen-Full-5langs.json';
const rawData = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));

// Category mapping
const categoryMap = {
  'شوربة': { id: 'soups', name_ar: 'شوربة', serving_g: 250 },
  'صلصات': { id: 'sauces', name_ar: 'صلصات', serving_g: 50 },
  'لحوم': { id: 'meats', name_ar: 'لحوم', serving_g: 150 },
  'طيور': { id: 'poultry', name_ar: 'طيور', serving_g: 150 },
  'أسماك': { id: 'fish', name_ar: 'أسماك', serving_g: 150 },
  'خضروات': { id: 'vegetables', name_ar: 'خضروات', serving_g: 150 },
  'بقوليات': { id: 'legumes', name_ar: 'بقوليات', serving_g: 200 },
  'بيض': { id: 'eggs', name_ar: 'بيض', serving_g: 100 },
  'ألبان': { id: 'dairy', name_ar: 'ألبان', serving_g: 100 },
  'مخبوزات': { id: 'bakery', name_ar: 'مخبوزات', serving_g: 100 },
  'سلطات': { id: 'salads', name_ar: 'سلطات', serving_g: 150 },
  'مخللات': { id: 'pickles', name_ar: 'مخللات', serving_g: 50 },
  'عصائر': { id: 'juices', name_ar: 'عصائر', serving_g: 250 },
  'فواكه': { id: 'fruits', name_ar: 'فواكه', serving_g: 150 },
  'حلويات': { id: 'desserts', name_ar: 'حلويات', serving_g: 80 },
  'مقبلات': { id: 'appetizers', name_ar: 'مقبلات', serving_g: 100 },
  'مربات': { id: 'jams', name_ar: 'مربات', serving_g: 30 },
};

// Fried keywords
const friedKeywords = ['مقلي', 'محمر', 'كنتاكي', 'بانيه', 'ghee', 'fried', 'مقلية', 'محمرة', 'بانية', 'بانييه'];
const grilledKeywords = ['مشوي', 'مسلوق', 'grilled', 'boiled'];
const diabetesAvoidKeywords = ['سوبيا', 'عصير قصب', 'بلح', 'عسل', 'عصير مانجو', 'مربى'];
const kidneyAvoidKeywords = ['موز', 'برتقال', 'بطاطس'];

// Track duplicates
const nameCounts = {};
const duplicates = [];

// Process each dish
const processedDishes = rawData.map((dish, index) => {
  const category = categoryMap[dish.index_category] || { id: 'other', name_ar: dish.index_category, serving_g: 100 };
  
  // A) Fix serving size
  const serving_g = category.serving_g;
  const cal_serving = Math.round((dish.nutrition.cal_100 * serving_g) / 100);
  
  // B) Fix meal_types - replace "juices_fruit" with "snack"
  let meal_types = [...dish.meal_types];
  meal_types = meal_types.map(mt => mt === 'juices_fruit' ? 'snack' : mt);
  
  // C) Fix healthy flag
  let healthy = dish.healthy;
  const nameLower = (dish.name_ar + ' ' + dish.name_en).toLowerCase();
  
  // Apply rules in order
  if (dish.index_category === 'حلويات' || dish.index_category === 'مربات') {
    healthy = false;
  } else if (friedKeywords.some(kw => nameLower.includes(kw.toLowerCase()))) {
    healthy = false;
  } else if (dish.nutrition.sodium_mg > 800) {
    healthy = false;
  } else if (grilledKeywords.some(kw => nameLower.includes(kw.toLowerCase()))) {
    healthy = true;
  } else if (['سلطات', 'خضروات', 'فواكه', 'شوربة'].includes(dish.index_category) && dish.nutrition.cal_100 < 200) {
    healthy = true;
  } else {
    healthy = true;
  }
  
  // D) Gout fix
  let conditions = { ...dish.conditions };
  if (['طيور', 'أسماك', 'بقوليات'].includes(dish.index_category) && conditions.gout === 'allowed') {
    conditions.gout = 'limited';
  }
  
  // E) Diabetes fix
  if (diabetesAvoidKeywords.some(kw => nameLower.includes(kw.toLowerCase()))) {
    if (conditions['diabetes-insulin'] === 'allowed' || conditions['diabetes-insulin'] === 'limited') {
      conditions['diabetes-insulin'] = 'avoid';
    }
  }
  
  // F) Kidney-CKD fix
  if (kidneyAvoidKeywords.some(kw => nameLower.includes(kw.toLowerCase()))) {
    if (conditions['kidney-ckd'] === 'allowed') {
      conditions['kidney-ckd'] = 'limited';
    }
  }
  
  // G) Heart-lipids fix
  if (dish.nutrition.sodium_mg > 1000 && conditions['heart-lipids'] === 'allowed') {
    conditions['heart-lipids'] = 'limited';
  }
  
  // H) Source ID
  const source = 'source_id';
  
  // I) Detect duplicates
  const nameKey = dish.name_en.toLowerCase().trim();
  if (!nameCounts[nameKey]) {
    nameCounts[nameKey] = 0;
  }
  nameCounts[nameKey]++;
  const isDuplicate = nameCounts[nameKey] > 1;
  if (isDuplicate) {
    duplicates.push(dish.name_en);
  }
  
  return {
    ...dish,
    nutrition: {
      ...dish.nutrition,
      serving_g,
      cal_serving
    },
    meal_types,
    conditions,
    healthy,
    source_id: 'osoul-tabkh-abla-nazira',
    isDuplicate
  };
});

// Group by category
const categoriesMap = {};
processedDishes.forEach(dish => {
  const cat = categoryMap[dish.index_category] || { id: 'other', name_ar: dish.index_category };
  if (!categoriesMap[cat.id]) {
    categoriesMap[cat.id] = {
      id: cat.id,
      name_ar: cat.name_ar,
      count: 0,
      dishes: []
    };
  }
  categoriesMap[cat.id].dishes.push({
    name: dish.name_ar,
    cal_100: dish.nutrition.cal_100,
    p: dish.nutrition.protein_g,
    c: dish.nutrition.carbs_g,
    f: dish.nutrition.fat_g,
    serv_g: dish.nutrition.serving_g,
    cal_serv: dish.nutrition.cal_serving,
    healthy: dish.healthy,
    confidence: 100,
    confidence_label: '100% - موثوق',
    confidence_color: 'green',
    source: 'أصول الطهي - أبلة نظيرة (1941)',
    notes: '',
    mealType: dish.meal_types[0] || 'lunch'
  });
  categoriesMap[cat.id].count++;
});

// Convert to array
const categories = Object.values(categoriesMap);

// Build output
const output = {
  kitchen: 'المطبخ المصري',
  city: 'القاهرة 🇪🇬',
  country: 'مصر 🇪🇬',
  total_dishes: processedDishes.length,
  portion_guide: 'حجم الحصص الافتراضية حسب نوع الطبق',
  categories
};

// Write output
const outputPath = 'C:\\Users\\ELFARES\\Documents\\Default Project\\healthcalc-ai\\src\\data\\egyptian-full-100-USDA.json';
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

// Print stats
console.log('=== Processing Complete ===');
console.log(`Total dishes converted: ${processedDishes.length}`);
console.log('\nCategories created:');
categories.forEach(c => console.log(`  ${c.name_ar} (${c.id}): ${c.count} dishes`));

const mealTypesFixed = rawData.filter(d => d.meal_types.includes('juices_fruit')).length;
console.log(`\nDishes with fixed meal_types (juices_fruit -> snack): ${mealTypesFixed}`);

const healthyFixed = processedDishes.filter((d, i) => d.healthy !== rawData[i].healthy).length;
console.log(`Dishes with fixed healthy flag: ${healthyFixed}`);

const goutFixed = processedDishes.filter((d, i) => {
  const old = rawData[i].conditions.gout;
  return old === 'allowed' && d.conditions.gout === 'limited';
}).length;
console.log(`Dishes with fixed gout mapping: ${goutFixed}`);

const diabetesFixed = processedDishes.filter((d, i) => {
  const old = rawData[i].conditions['diabetes-insulin'];
  return (old === 'allowed' || old === 'limited') && d.conditions['diabetes-insulin'] === 'avoid';
}).length;
console.log(`Dishes with fixed diabetes mapping: ${diabetesFixed}`);

console.log(`\nDuplicates found (${duplicates.length}):`);
duplicates.forEach(d => console.log(`  - ${d}`));

console.log('\nOutput written to:', outputPath);