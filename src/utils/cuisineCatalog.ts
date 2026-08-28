import { FOODS as NORTH_AFRICA_FOODS } from './regional/north-africa';
import { FOODS as GULF_FOODS } from './regional/gulf';
import { FOODS as ASIA_FOODS } from './regional/asia';
import { FOODS as EUROPE_FOODS } from './regional/europe';
import { FOODS as NORTH_AMERICA_FOODS } from './regional/north-america';
import { FOODS as SOUTH_AMERICA_FOODS } from './regional/south-america';
import { FOODS as AUSTRALIA_FOODS } from './regional/australia';
import { FOODS as LEVANTINE_AFRICA_FOODS } from './regional/levantine-africa';
import { FOODS as SPECIAL_DIETS_FOODS } from './regional/special-diets';

export type Cuisine = string;
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface RegionalFood {
  name_en: string;
  name_ar: string;
  mealType: MealType;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface CuisineGroupItem {
  id: string;
  nameAr: string;
  nameEn: string;
}

export interface CuisineGroup {
  region: string;
  regionAr: string;
  items: CuisineGroupItem[];
}

export const CUISINE_GROUPS: CuisineGroup[] = [
  {
    region: 'North Africa',
    regionAr: 'مطابخ شمال أفريقيا',
    items: [
      { id: 'egyptian', nameAr: 'مصري', nameEn: 'Egyptian' },
      { id: 'libyan', nameAr: 'ليبي', nameEn: 'Libyan' },
      { id: 'tunisian', nameAr: 'تونسي', nameEn: 'Tunisian' },
      { id: 'algerian', nameAr: 'جزائري', nameEn: 'Algerian' },
      { id: 'moroccan', nameAr: 'مغربي', nameEn: 'Moroccan' },
    ],
  },
  {
    region: 'Gulf',
    regionAr: 'مطبخ الخليج',
    items: [
      { id: 'saudi', nameAr: 'سعودي', nameEn: 'Saudi' },
      { id: 'emirati', nameAr: 'إماراتي', nameEn: 'Emirati' },
      { id: 'omani', nameAr: 'عماني', nameEn: 'Omani' },
      { id: 'kuwaiti', nameAr: 'كويتي', nameEn: 'Kuwaiti' },
      { id: 'qatar', nameAr: 'قطري', nameEn: 'Qatari' },
      { id: 'bahraini', nameAr: 'بحريني', nameEn: 'Bahraini' },
    ],
  },
  {
    region: 'Asia',
    regionAr: 'مطبخ آسيا',
    items: [
      { id: 'indian', nameAr: 'هندي', nameEn: 'Indian' },
      { id: 'pakistani', nameAr: 'باكستاني', nameEn: 'Pakistani' },
      { id: 'chinese', nameAr: 'صيني', nameEn: 'Chinese' },
      { id: 'korean', nameAr: 'كوري', nameEn: 'Korean' },
      { id: 'japanese', nameAr: 'ياباني', nameEn: 'Japanese' },
      { id: 'thai', nameAr: 'تايلندي', nameEn: 'Thai' },
    ],
  },
  {
    region: 'European',
    regionAr: 'المطبخ الأوروبي',
    items: [
      { id: 'italian', nameAr: 'إيطالي', nameEn: 'Italian' },
      { id: 'french', nameAr: 'فرنسي', nameEn: 'French' },
      { id: 'spanish', nameAr: 'إسباني', nameEn: 'Spanish' },
      { id: 'greek', nameAr: 'يوناني', nameEn: 'Greek' },
      { id: 'turkish', nameAr: 'تركي', nameEn: 'Turkish' },
      { id: 'german', nameAr: 'ألماني', nameEn: 'German' },
    ],
  },
  {
    region: 'North America',
    regionAr: 'أمريكا الشمالية',
    items: [
      { id: 'american', nameAr: 'أمريكي', nameEn: 'American' },
      { id: 'mexican', nameAr: 'مكسيكي', nameEn: 'Mexican' },
      { id: 'canadian', nameAr: 'كندي', nameEn: 'Canadian' },
      { id: 'cuban', nameAr: 'كوبي', nameEn: 'Cuban' },
      { id: 'jamaican', nameAr: 'جامايكي', nameEn: 'Jamaican' },
      { id: 'costa_rican', nameAr: 'كوستاريكي', nameEn: 'Costa Rican' },
    ],
  },
  {
    region: 'South America',
    regionAr: 'أمريكا الجنوبية',
    items: [
      { id: 'brazilian', nameAr: 'برازيلي', nameEn: 'Brazilian' },
      { id: 'argentinian', nameAr: 'أرجنتيني', nameEn: 'Argentinian' },
      { id: 'peruvian', nameAr: 'بيروفي', nameEn: 'Peruvian' },
      { id: 'colombian', nameAr: 'كولومبي', nameEn: 'Colombian' },
      { id: 'chilean', nameAr: 'تشيلي', nameEn: 'Chilean' },
      { id: 'venezuelan', nameAr: 'فنزويلي', nameEn: 'Venezuelan' },
    ],
  },
  {
    region: 'Australia',
    regionAr: 'أستراليا',
    items: [
      { id: 'australian', nameAr: 'أسترالي', nameEn: 'Australian' },
    ],
  },
  {
    region: 'Middle East & Levant',
    regionAr: 'الشرق الأوسط والشام',
    items: [
      { id: 'middle_eastern', nameAr: 'شرق أوسطي', nameEn: 'Middle Eastern' },
    ],
  },
  {
    region: 'Africa',
    regionAr: 'أفريقيا',
    items: [
      { id: 'african', nameAr: 'أفريقي', nameEn: 'African' },
    ],
  },
  {
    region: 'Special Diets',
    regionAr: 'أنظمة غذائية خاصة',
    items: [
      { id: 'mediterranean', nameAr: 'متوسطي', nameEn: 'Mediterranean' },
      { id: 'keto', nameAr: 'كيتو', nameEn: 'Keto' },
      { id: 'high_protein', nameAr: 'عالي البروتين', nameEn: 'High Protein' },
      { id: 'vegetarian', nameAr: 'نباتي', nameEn: 'Vegetarian' },
    ],
  },
];

export const CUISINE_FLAGS: Record<string, string> = {
  egyptian: '🇪🇬', libyan: '🇱🇾', tunisian: '🇹🇳', algerian: '🇩🇿', moroccan: '🇲🇦',
  saudi: '🇸🇦', emirati: '🇦🇪', omani: '🇴🇲', kuwaiti: '🇰🇼', qatar: '🇶🇦', bahraini: '🇧🇭',
  indian: '🇮🇳', pakistani: '🇵🇰', chinese: '🇨🇳', korean: '🇰🇷', japanese: '🇯🇵', thai: '🇹🇭',
  italian: '🇮🇹', french: '🇫🇷', spanish: '🇪🇸', greek: '🇬🇷', turkish: '🇹🇷', german: '🇩🇪',
  american: '🇺🇸', mexican: '🇲🇽', canadian: '🇨🇦', cuban: '🇨🇺', jamaican: '🇯🇲', costa_rican: '🇨🇷',
  brazilian: '🇧🇷', argentinian: '🇦🇷', peruvian: '🇵🇪', colombian: '🇨🇴', chilean: '🇨🇱', venezuelan: '🇻🇪',
  australian: '🇦🇺',
  middle_eastern: '🧆', african: '🌍', mediterranean: '🫒', keto: '🥑', high_protein: '💪', vegetarian: '🌱',
};

export const REGIONAL_FOODS: Record<string, RegionalFood[]> = {
  ...NORTH_AFRICA_FOODS,
  ...GULF_FOODS,
  ...ASIA_FOODS,
  ...EUROPE_FOODS,
  ...NORTH_AMERICA_FOODS,
  ...SOUTH_AMERICA_FOODS,
  ...AUSTRALIA_FOODS,
  ...LEVANTINE_AFRICA_FOODS,
  ...SPECIAL_DIETS_FOODS,
};

export interface FruitJuiceInfo {
  name_en: string;
  name_ar: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: MealType;
  type: 'fruit' | 'juice';
  benefits: string;
}

export const FRUITS: FruitJuiceInfo[] = [
  { name_en: 'Apple', name_ar: 'تفاحة', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, mealType: 'breakfast', type: 'fruit', benefits: 'Rich in fiber & Vitamin C' },
  { name_en: 'Banana', name_ar: 'موزة', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, mealType: 'breakfast', type: 'fruit', benefits: 'Potassium & natural energy' },
  { name_en: 'Orange', name_ar: 'برتقالة', calories: 62, protein: 1.2, carbs: 15.5, fat: 0.2, mealType: 'breakfast', type: 'fruit', benefits: 'Vitamin C power' },
  { name_en: 'Mango', name_ar: 'مانجو', calories: 100, protein: 1.4, carbs: 25, fat: 0.6, mealType: 'breakfast', type: 'fruit', benefits: 'Rich in Vitamin A & C' },
  { name_en: 'Strawberries', name_ar: 'فراولة', calories: 50, protein: 1, carbs: 12, fat: 0.5, mealType: 'breakfast', type: 'fruit', benefits: 'Vitamin C & antioxidants' },
  { name_en: 'Watermelon', name_ar: 'بطيخ', calories: 46, protein: 0.9, carbs: 11.5, fat: 0.2, mealType: 'breakfast', type: 'fruit', benefits: 'Hydration & lycopene' },
  { name_en: 'Pineapple', name_ar: 'أناناس', calories: 82, protein: 0.9, carbs: 21.6, fat: 0.2, mealType: 'breakfast', type: 'fruit', benefits: 'Bromelain & Vitamin C' },
  { name_en: 'Kiwi', name_ar: 'كيوي', calories: 42, protein: 0.8, carbs: 10, fat: 0.4, mealType: 'breakfast', type: 'fruit', benefits: 'Vitamin C & fiber' },
  { name_en: 'Avocado', name_ar: 'أفوكادو', calories: 160, protein: 2, carbs: 9, fat: 15, mealType: 'breakfast', type: 'fruit', benefits: 'Healthy fats & potassium' },
  { name_en: 'Grapes', name_ar: 'عنب', calories: 62, protein: 0.6, carbs: 16, fat: 0.2, mealType: 'snack', type: 'fruit', benefits: 'Antioxidants & quick energy' },
  { name_en: 'Peach', name_ar: 'خوخ', calories: 59, protein: 1.4, carbs: 14, fat: 0.4, mealType: 'snack', type: 'fruit', benefits: 'Vitamins A & C' },
  { name_en: 'Pear', name_ar: 'كمثرى', calories: 101, protein: 0.6, carbs: 27, fat: 0.2, mealType: 'snack', type: 'fruit', benefits: 'Fiber & Vitamin C' },
  { name_en: 'Blueberries', name_ar: 'توت أزرق', calories: 84, protein: 1.1, carbs: 21, fat: 0.5, mealType: 'breakfast', type: 'fruit', benefits: 'Antioxidants' },
  { name_en: 'Raspberries', name_ar: 'توت', calories: 64, protein: 1.5, carbs: 14.7, fat: 0.8, mealType: 'snack', type: 'fruit', benefits: 'Fiber & Vitamin C' },
  { name_en: 'Blackberries', name_ar: 'عليق أسود', calories: 62, protein: 2, carbs: 14, fat: 0.7, mealType: 'snack', type: 'fruit', benefits: 'Antioxidants & fiber' },
  { name_en: 'Cherries', name_ar: 'كرز', calories: 77, protein: 1.3, carbs: 19, fat: 0.4, mealType: 'snack', type: 'fruit', benefits: 'Melatonin & antioxidants' },
  { name_en: 'Pomegranate', name_ar: 'رمان', calories: 83, protein: 1.7, carbs: 19, fat: 1.2, mealType: 'snack', type: 'fruit', benefits: 'Polyphenol powerhouse' },
  { name_en: 'Papaya', name_ar: 'بابايا', calories: 59, protein: 0.9, carbs: 15, fat: 0.4, mealType: 'breakfast', type: 'fruit', benefits: 'Digestive enzymes & Vitamin C' },
  { name_en: 'Guava', name_ar: 'جوافة', calories: 68, protein: 2.6, carbs: 14, fat: 1, mealType: 'breakfast', type: 'fruit', benefits: 'Vitamin C champion' },
  { name_en: 'Cantaloupe', name_ar: 'شمام', calories: 54, protein: 1.3, carbs: 13, fat: 0.3, mealType: 'breakfast', type: 'fruit', benefits: 'Vitamin A & hydration' },
  { name_en: 'Honeydew Melon', name_ar: 'قندولة', calories: 61, protein: 0.9, carbs: 16, fat: 0.2, mealType: 'snack', type: 'fruit', benefits: 'Hydration & Vitamin C' },
  { name_en: 'Plum', name_ar: 'برقوق', calories: 76, protein: 0.8, carbs: 19, fat: 0.4, mealType: 'snack', type: 'fruit', benefits: 'Fiber & Vitamin C' },
  { name_en: 'Apricot', name_ar: 'مشمش', calories: 48, protein: 0.7, carbs: 11, fat: 0.4, mealType: 'snack', type: 'fruit', benefits: 'Vitamin A & fiber' },
  { name_en: 'Fig', name_ar: 'تين', calories: 74, protein: 0.8, carbs: 19, fat: 0.3, mealType: 'snack', type: 'fruit', benefits: 'Fiber & minerals' },
  { name_en: 'Dates (3 pcs)', name_ar: 'تمر (3 حبات)', calories: 66, protein: 0.5, carbs: 18, fat: 0.1, mealType: 'snack', type: 'fruit', benefits: 'Natural energy & fiber' },
  { name_en: 'Lemon', name_ar: 'ليمون', calories: 29, protein: 1.1, carbs: 9, fat: 0.3, mealType: 'snack', type: 'fruit', benefits: 'Vitamin C boost' },
  { name_en: 'Lime', name_ar: 'ليمون أخضر', calories: 20, protein: 0.2, carbs: 7, fat: 0.1, mealType: 'snack', type: 'fruit', benefits: 'Vitamin C & refreshment' },
  { name_en: 'Grapefruit', name_ar: 'جريب فروت', calories: 52, protein: 1, carbs: 13, fat: 0.2, mealType: 'snack', type: 'fruit', benefits: 'Vitamin C & fiber' },
  { name_en: 'Starfruit', name_ar: 'فاكهة النجمة', calories: 41, protein: 1, carbs: 9, fat: 0.4, mealType: 'snack', type: 'fruit', benefits: 'Low-sugar Vitamin C' },
  { name_en: 'Dragon Fruit', name_ar: 'بيتايا', calories: 60, protein: 1.2, carbs: 13, fat: 0.4, mealType: 'snack', type: 'fruit', benefits: 'Fiber & antioxidants' },
  { name_en: 'Passion Fruit', name_ar: 'فاكهة الآلام', calories: 68, protein: 2.5, carbs: 16, fat: 0.5, mealType: 'snack', type: 'fruit', benefits: 'Fiber & Vitamin C' },
  { name_en: 'Coconut (fresh)', name_ar: 'جوز هند طازج', calories: 160, protein: 1.5, carbs: 7, fat: 15, mealType: 'snack', type: 'fruit', benefits: 'Healthy MCT fats' },
  { name_en: 'Cranberries', name_ar: 'توت بري', calories: 46, protein: 0.4, carbs: 12, fat: 0.1, mealType: 'snack', type: 'fruit', benefits: 'Antioxidants' },
];

export const JUICES: FruitJuiceInfo[] = [
  { name_en: 'Orange Juice', name_ar: 'عصير برتقال', calories: 110, protein: 1.7, carbs: 25.5, fat: 0.4, mealType: 'snack', type: 'juice', benefits: 'Vitamin C & potassium' },
  { name_en: 'Mango Juice', name_ar: 'عصير مانجو', calories: 120, protein: 1, carbs: 27, fat: 0.6, mealType: 'snack', type: 'juice', benefits: 'Vitamin A & C' },
  { name_en: 'Strawberry Juice', name_ar: 'عصير فراولة', calories: 100, protein: 1, carbs: 24, fat: 0.3, mealType: 'snack', type: 'juice', benefits: 'Rich in Vitamin C' },
  { name_en: 'Lemon Juice', name_ar: 'عصير ليمون', calories: 50, protein: 1, carbs: 15, fat: 0.2, mealType: 'snack', type: 'juice', benefits: 'Vitamin C & antioxidants' },
  { name_en: 'Carrot Juice', name_ar: 'عصير جزر', calories: 80, protein: 2, carbs: 19, fat: 0.3, mealType: 'snack', type: 'juice', benefits: 'Beta-carotene (Vitamin A)' },
  { name_en: 'Pomegranate Juice', name_ar: 'عصير رمان', calories: 130, protein: 0.5, carbs: 32, fat: 0.7, mealType: 'snack', type: 'juice', benefits: 'Polyphenols & immunity' },
  { name_en: 'Guava Juice', name_ar: 'عصير جوافة', calories: 90, protein: 2, carbs: 22, fat: 0.5, mealType: 'snack', type: 'juice', benefits: 'Vitamin C champion' },
  { name_en: 'Apple Juice', name_ar: 'عصير تفاح', calories: 115, protein: 0.2, carbs: 28, fat: 0.3, mealType: 'snack', type: 'juice', benefits: 'Quick natural energy' },
  { name_en: 'Grape Juice', name_ar: 'عصير عنب', calories: 150, protein: 0.5, carbs: 37, fat: 0.3, mealType: 'snack', type: 'juice', benefits: 'Resveratrol antioxidants' },
  { name_en: 'Pineapple Juice', name_ar: 'عصير أناناس', calories: 130, protein: 0.8, carbs: 33, fat: 0.1, mealType: 'snack', type: 'juice', benefits: 'Bromelain & Vitamin C' },
  { name_en: 'Watermelon Juice', name_ar: 'عصير بطيخ', calories: 70, protein: 1, carbs: 18, fat: 0.3, mealType: 'snack', type: 'juice', benefits: 'Hydration & lycopene' },
  { name_en: 'Tomato Juice', name_ar: 'عصير طماطم', calories: 41, protein: 1.8, carbs: 10, fat: 0.1, mealType: 'snack', type: 'juice', benefits: 'Lycopene & Vitamin K' },
  { name_en: 'Cranberry Juice', name_ar: 'عصير توت بري', calories: 110, protein: 0.4, carbs: 27, fat: 0.2, mealType: 'snack', type: 'juice', benefits: 'Urinary tract health' },
  { name_en: 'Grapefruit Juice', name_ar: 'عصير جريب فروت', calories: 96, protein: 1.3, carbs: 22, fat: 0.3, mealType: 'snack', type: 'juice', benefits: 'Vitamin C & metabolism' },
  { name_en: 'Mixed Berry Juice', name_ar: 'عصير توت مشكل', calories: 120, protein: 1, carbs: 28, fat: 0.5, mealType: 'snack', type: 'juice', benefits: 'Antioxidant blend' },
  { name_en: 'Peach Juice', name_ar: 'عصير خوخ', calories: 110, protein: 1.5, carbs: 25, fat: 0.3, mealType: 'snack', type: 'juice', benefits: 'Vitamins & soft fiber' },
  { name_en: 'Papaya Juice', name_ar: 'عصير بابايا', calories: 115, protein: 0.8, carbs: 28, fat: 0.3, mealType: 'snack', type: 'juice', benefits: 'Digestive enzymes & Vitamin C' },
  { name_en: 'Coconut Water', name_ar: 'ماء جوز الهند', calories: 46, protein: 1.7, carbs: 9, fat: 0.5, mealType: 'snack', type: 'juice', benefits: 'Electrolytes & hydration' },
  { name_en: 'Multi-Fruit Cocktail', name_ar: 'كوكتيل فواكه', calories: 120, protein: 0.8, carbs: 29, fat: 0.2, mealType: 'snack', type: 'juice', benefits: 'Vitamin C mix' },
  { name_en: 'Avocado Smoothie', name_ar: 'سموثي أفوكادو', calories: 180, protein: 2, carbs: 26, fat: 7, mealType: 'snack', type: 'juice', benefits: 'Healthy fats & energy' },
  { name_en: 'Sugarcane Juice', name_ar: 'عصير قصب', calories: 120, protein: 0.3, carbs: 30, fat: 0.2, mealType: 'snack', type: 'juice', benefits: 'Quick energy & electrolytes' },
];