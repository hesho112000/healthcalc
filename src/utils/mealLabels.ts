import { translations } from '../i18n/translations';
import { Language } from '../types';

type MealLabelKey = 'mealBreakfast' | 'mealLunch' | 'mealDinner' | 'mealMorningSnack' | 'mealAfternoonSnack' | 'mealSnack';

const MEAL_KEY_FOR_LABEL: Record<string, MealLabelKey> = {
  breakfast: 'mealBreakfast',
  lunch: 'mealLunch',
  dinner: 'mealDinner',
  'morning snack': 'mealMorningSnack',
  'afternoon snack': 'mealAfternoonSnack',
  snack: 'mealSnack',
};

export const normalizeMealKey = (label: string | undefined): string => {
  if (!label) return '';
  const cleaned = label
    .toLowerCase()
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2B00}-\u{2BFF}\s]+/gu, ' ')
    .replace(/[^a-z ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned === 'snack am' || cleaned.includes('morning snack') || cleaned.includes('mid-morning snack')) return 'morning snack';
  if (cleaned === 'snack pm' || cleaned.includes('afternoon snack') || cleaned.includes('mid-afternoon snack')) return 'afternoon snack';
  return cleaned;
};

export const getMealLabel = (label: string | undefined, lang: Language): string => {
  if (!label) return '';
  const key = MEAL_KEY_FOR_LABEL[normalizeMealKey(label)];
  if (!key) return label;
  const value = translations[lang]?.[key];
  if (!value) {
    if (lang !== 'en') {
      console.warn(`[healthcalc] Missing ${lang} translation for meal "${label}" — falling back to English.`);
    }
    return translations.en[key] ?? label;
  }
  return value;
};

/* ─── Meal / dish name (nameAr/nameEn/name) with language fallbacks ─── */

export interface MealNameLike {
  meal?: string;
  name?: string;
  nameEn?: string;
  nameAr?: string;
}

export const getMealName = (meal: MealNameLike | string | null | undefined, lang: Language): string => {
  if (!meal) return '';
  if (typeof meal === 'string') return getMealLabel(meal, lang);
  const en = meal.nameEn ?? meal.name;
  if (lang === 'ar') {
    if (meal.nameAr) return meal.nameAr;
    if (en) {
      console.warn(`[healthcalc] Missing Arabic name for "${en}" — falling back to English. Add nameAr to the meal data.`);
      return en;
    }
    return getMealLabel(meal.meal, lang);
  }
  if (en) return en;
  return getMealLabel(meal.meal, lang);
};

/* ─── Food item translation (English → Arabic) with console.warn fallback ─── */

const warnedItems = new Set<string>();

const ITEM_AR: Record<string, string> = {
  // healthPlans.ts mealPool
  'Oatmeal with berries': 'شوفان مع التوت',
  'Greek yogurt': 'زبادي يوناني',
  'Green tea': 'شاي أخضر',
  'Egg white omelette': 'أومليت بياض البيض',
  'Whole wheat toast': 'توست قمح كامل',
  'Avocado': 'أفوكادو',
  'Smoothie bowl': 'وعاء سموثي',
  'Chia seeds': 'بذور الشيا',
  'Banana': 'موزة',
  'Grilled chicken breast': 'صدر دجاج مشوي',
  'Brown rice': 'أرز بني',
  'Steamed broccoli': 'بروكلي على البخار',
  'Salmon fillet': 'فيليه سلمون',
  'Quinoa salad': 'سلطة كينوا',
  'Mixed greens': 'خضار ورقية مشكلة',
  'Turkey wrap': 'ساندوتش ديك رومي',
  'Sweet potato fries': 'بطاطا حلوة مقلية',
  'Side salad': 'سلطة جانبية',
  'Baked fish': 'سمك مشوي',
  'Roasted vegetables': 'خضار مشوية',
  'Couscous': 'كسكس',
  'Stir-fry vegetables': 'خضار سوتيه',
  'Tofu': 'توفو',
  'Lentil soup': 'شوربة عدس',
  'Mixed salad': 'سلطة مشكلة',
  'Whole grain bread': 'خبز قمح كامل',
  'Apple slices': 'شرائح تفاح',
  'Almond butter': 'زبدة لوز',
  'Honey drizzle': 'عسل',
  'Trail mix': 'خليط مكسرات',
  'Dark chocolate': 'شوكولاتة داكنة',

  // healthPlans.ts MEAL_POOLS_BY_CUISINE
  'Ful Medames': 'فول مدمس',
  'Taameya (falafel)': 'طعمية (فلافل)',
  'Egyptian bread': 'عيش بلدي',
  'Pickled vegetables': 'مخلل',
  'Koshari bowl': 'طبق كشري',
  'Molokhia soup': 'شوربة ملوخية',
  'Rice': 'أرز',
  'Bread': 'خبز',
  'Grilled kofta': 'كفتة مشوية',
  'Salad': 'سلطة',
  'Yogurt': 'زبادي',
  'Chebab (Emirati pancakes)': 'تشيباب (بان كيك إماراتي)',
  'Date syrup': 'دبس التمر',
  'Laban': 'لبن',
  'Kabsa (spiced rice)': 'كبسة (أرز متبل)',
  'Lamb': 'لحم ضأن',
  'Vegetable salad': 'سلطة خضار',
  'Yogurt sauce': 'صلصة زبادي',
  'Shawarma wrap': 'ساندوتش شاورما',
  'Hummus': 'حمص',
  'Pickles': 'مخلل',
  'Garlic sauce': 'صلصة ثوم',
  'Overnight oats': 'شوفان منقوع',
  'Mixed berries': 'توت مشكل',
  'Almond milk': 'حليب لوز',
  'Grilled salmon': 'سلمون مشوي',
  'Quinoa': 'كينوا',
  'Olive oil dressing': 'صلصة زيت زيتون',
  'Mixed green salad': 'سلطة خضراء مشكلة',
  'Tofu scramble': 'توفو مقلي',
  'Tomatoes': 'طماطم',
  'Chickpea curry': 'كاري حمص',
  'Raita': 'رائيتا',
  'Papadum': 'بابادوم',
  'Bean burrito bowl': 'طبق بوريتو فاصوليا',
  'Guacamole': 'جواكامولي',
  'Salsa': 'صلصة سالسا',
  'Lettuce': 'خس',

  // LabToPlanPage.tsx conditionContent (diabetes / hypertension)
  'Steel-cut oatmeal (50g)': 'شوفان مقطع (50 جم)',
  'Chopped walnuts (15g)': 'جوز مفروم (15 جم)',
  'Blueberries (80g)': 'توت أزرق (80 جم)',
  'Cinnamon sprinkle': 'رشة قرفة',
  'Greek yogurt (100g)': 'زبادي يوناني (100 جم)',
  'Almonds (8 pieces)': 'لوز (8 حبات)',
  'Chia seeds (1 tsp)': 'بذور شيا (ملعقة صغيرة)',
  'Grilled chicken breast (130g)': 'صدر دجاج مشوي (130 جم)',
  'Grilled chicken breast (120g)': 'صدر دجاج مشوي (120 جم)',
  'Quinoa (120g cooked)': 'كينوا مطبوخة (120 جم)',
  'Roasted non-starchy vegetables': 'خضار غير نشوية مشوية',
  'Olive oil & lemon dressing (1 tbsp)': 'صلصة زيت زيتون وليمون (ملعقة كبيرة)',
  'Apple slices (100g)': 'شرائح تفاح (100 جم)',
  'Peanut butter (1 tbsp)': 'زبدة فول سوداني (ملعقة كبيرة)',
  'Baked salmon (120g)': 'سلمون مشوي (120 جم)',
  'Sweet potato (100g)': 'بطاطا حلوة (100 جم)',
  'Steamed broccoli & green beans': 'بروكلي وفاصوليا خضراء على البخار',
  'Herbal tea': 'شاي أعشاب',
  'Oatmeal (50g) with flaxseeds': 'شوفان (50 جم) مع بذور الكتان',
  'Sliced banana (80g)': 'موزة شرائح (80 جم)',
  'Unsalted almonds (10g)': 'لوز غير مملح (10 جم)',
  'Low-fat milk (200ml)': 'حليب قليل الدسم (200 مل)',
  'Carrot sticks (100g)': 'أعواد جزر (100 جم)',
  'Hummus (2 tbsp)': 'حمص (ملعقتان كبيرتان)',
  'Whole-grain crackers (4)': 'بسكويت قمح كامل (4 قطع)',
  'Brown rice (150g cooked)': 'أرز بني مطبوخ (150 جم)',
  'Steamed spinach & tomatoes': 'سبانخ وطماطم على البخار',
  'Olive oil (1 tbsp)': 'زيت زيتون (ملعقة كبيرة)',
  'Mixed berries (100g)': 'توت مشكل (100 جم)',
  'Pumpkin seeds (1 tbsp)': 'بذور اليقطين (ملعقة كبيرة)',
  'Baked cod (120g)': 'سمك قد مشوي (120 جم)',
  'Roasted sweet potato (100g)': 'بطاطا حلوة مشوية (100 جم)',
  'Kale & beet salad': 'سلطة كرنب وبنجر',
};

export const getFoodItemText = (item: string, nameAr?: string, nameEn?: string, lang: Language = 'en'): string => {
  if (lang !== 'ar') return item ?? '';
  const normalized = (item || '').trim();
  if (!normalized) return item;
  if (/[\u0600-\u06FF]/.test(normalized)) return item;
  if (!/[A-Za-z]/.test(normalized)) return item;
  if (nameEn && normalized.toLowerCase() === nameEn.toLowerCase()) return nameAr || normalized;
  const hit = ITEM_AR[normalized];
  if (hit) return hit;
  if (!warnedItems.has(normalized)) {
    warnedItems.add(normalized);
    console.warn(`[healthcalc] No Arabic translation for item "${normalized}" — add it to ITEM_AR in src/utils/mealLabels.ts.`);
  }
  return item;
};