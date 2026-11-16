import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  throw new Error('Missing SUPABASE_URL (or VITE_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY.');
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});

const recipes = [
  {
    id: '6ef638d9-b5b9-4d65-b15d-8f5c0d1be001',
    name_en: 'Grilled chicken Cobb salad American',
    name_ar: 'سلطة كوب بالدجاج المشوي',
    name_fr: 'Salade Cobb au poulet grillé',
    name_es: 'Ensalada Cobb con pollo a la parrilla',
    name_de: 'Cobb-Salat mit gegrilltem Hähnchen',
    meal_type: 'salad',
    serving_g: 250,
    calories: 290,
    protein: 26,
    carbs: 8,
    fat: 17,
  },
  {
    id: '6ef638d9-b5b9-4d65-b15d-8f5c0d1be002',
    name_en: 'Buffalo chicken lettuce wraps American',
    name_ar: 'لفائف الخس بالدجاج بصلصة بافلو',
    name_fr: 'Wraps de poulet Buffalo en feuilles de laitue',
    name_es: 'Rollitos de lechuga con pollo Buffalo',
    name_de: 'Buffalo-Hähnchen-Wraps in Salatblättern',
    meal_type: 'lunch',
    serving_g: 200,
    calories: 216,
    protein: 24,
    carbs: 9,
    fat: 9,
  },
  {
    id: '6ef638d9-b5b9-4d65-b15d-8f5c0d1be003',
    name_en: 'Turkey meatloaf with cauliflower mash American',
    name_ar: 'رغيف الديك الرومي مع هريس القرنبيط',
    name_fr: 'Pain de viande de dinde avec purée de chou-fleur',
    name_es: 'Pastel de pavo con puré de coliflor',
    name_de: 'Putenhackbraten mit Blumenkohlpüree',
    meal_type: 'dinner',
    serving_g: 300,
    calories: 336,
    protein: 36,
    carbs: 20,
    fat: 13,
  },
  {
    id: '6ef638d9-b5b9-4d65-b15d-8f5c0d1be004',
    name_en: 'Loaded baked sweet potato American',
    name_ar: 'بطاطا حلوة مشوية محشوة',
    name_fr: 'Patate douce au four garnie',
    name_es: 'Batata asada cargada',
    name_de: 'Gefüllte Ofensüßkartoffel',
    meal_type: 'lunch',
    serving_g: 300,
    calories: 312,
    protein: 13,
    carbs: 50,
    fat: 7,
  },
  {
    id: '6ef638d9-b5b9-4d65-b15d-8f5c0d1be005',
    name_en: 'Crispy baked chicken tenders almond crust American',
    name_ar: 'أصابع الدجاج المقرمشة المخبوزة بطبقة اللوز',
    name_fr: 'Aiguillettes de poulet croustillantes au four et aux amandes',
    name_es: 'Tiras de pollo crujientes al horno con almendra',
    name_de: 'Knusprige Hähnchenstreifen aus dem Ofen mit Mandelkruste',
    meal_type: 'dinner',
    serving_g: 150,
    calories: 263,
    protein: 28,
    carbs: 14,
    fat: 11,
  },
];

const toPer100 = (value, servingG) => Number(((value * 100) / servingG).toFixed(2));

const lookupById = async (id) => {
  const { data, error } = await supabase
    .from('dishes')
    .select('id,name_en')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
};

const lookupByName = async (name) => {
  const { data, error } = await supabase
    .from('dishes')
    .select('id,name_en')
    .eq('name_en', name)
    .limit(2);
  if (error) throw error;
  return data ?? [];
};

const pending = [];
for (const recipe of recipes) {
  const byId = await lookupById(recipe.id);
  if (byId) {
    if (byId.name_en !== recipe.name_en) {
      throw new Error(`ID ${recipe.id} is already assigned to a different dish.`);
    }
    console.log(`Already registered: ${recipe.name_en} (${recipe.id})`);
    continue;
  }

  const byName = await lookupByName(recipe.name_en);
  if (byName.length) {
    throw new Error(`Name "${recipe.name_en}" already exists with ID ${byName[0].id}. No rows were inserted.`);
  }
  pending.push(recipe);
}

for (const recipe of pending) {
  const { serving_g: servingG, calories, protein, carbs, fat, ...names } = recipe;
  const row = {
    ...names,
    cal_100: toPer100(calories, servingG),
    protein: toPer100(protein, servingG),
    carbs: toPer100(carbs, servingG),
    fat: toPer100(fat, servingG),
    fiber: null,
    sugar: null,
    sodium: null,
    sat_fat: null,
    base_serving_g: servingG,
    base_cal_serv: calories,
    meal_type: recipe.meal_type,
    region: 'pan_american',
    source: 'healthcalc-content-us-2026',
    healthy: true,
    is_fried: false,
    is_sweet: false,
  };

  const { data, error } = await supabase
    .from('dishes')
    .insert(row)
    .select('id,name_en')
    .single();
  if (error) throw new Error(`Could not register "${recipe.name_en}": ${error.message}`);
  console.log(`Registered: ${data.name_en} (${data.id})`);
}

console.log(`Done. ${recipes.length} recipe dish records are registered.`);
