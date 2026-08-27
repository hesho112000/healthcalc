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