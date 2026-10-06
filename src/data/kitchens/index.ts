// Dynamic kitchens registry - auto-discovers every kitchen in src/data.
// Rich kitchens (Egyptian/Tunisian/Syrian/Palestinian/Lebanese/Jordanian) come from
// *-full-100-USDA.json (categories + confidence). All other kitchens come from the
// *-full.ts adapters (flattened to the same normalized shape, confidence 70%).

import type { Language } from '../../types';

export interface KitchenDish {
  name: string;
  nameAr?: string;
  nameEn?: string;
  nameFr?: string;
  nameEs?: string;
  nameDe?: string;
  cal_100: number;
  p: number;
  c: number;
  f: number;
  serv_g: number;
  cal_serv: number;
  healthy: boolean;
  confidence: number;
  confidence_label: string;
  confidence_color: 'green' | 'yellow' | 'orange';
  source: string;
  notes: string;
  mealType?: string;
  mealTypes?: string[];
  region?: string;
}

export interface KitchenCategory {
  id: string;
  name_ar: string;
  nameEn?: string;
  nameFr?: string;
  nameEs?: string;
  nameDe?: string;
  count: number;
  dishes: KitchenDish[];
}

export const KITCHEN_REGION_KITCHEN_IDS = {
  'north-america': ['usa', 'canada', 'mexican', 'cuban', 'jamaican', 'costa-rican'],
  'south-america': ['argentinian', 'colombian', 'peruvian', 'chilean', 'brazilian', 'venezuelan'],
} as const;

export type KitchenRegionId = keyof typeof KITCHEN_REGION_KITCHEN_IDS;

const KITCHEN_REGION_BY_ID = new Map<string, KitchenRegionId>(
  Object.entries(KITCHEN_REGION_KITCHEN_IDS).flatMap(([regionId, kitchenIds]) =>
    kitchenIds.map((kitchenId) => [kitchenId, regionId as KitchenRegionId]),
  ),
);

export interface KitchenInfo {
  id: string;
  kitchen: string;
  city: string;
  country: string;
  kitchenEn?: string;
  cityEn?: string;
  countryEn?: string;
  description?: string;
  flag: string;
  total: number;
  conf100: number;
  conf85: number;
  conf70: number;
  sample: KitchenDish | null;
  dishes: KitchenDish[];
  categories: KitchenCategory[];
  portion_guide?: string;
  regions?: string[];
  regionId?: KitchenRegionId;
  rich: boolean;
}

const CITY_BY_WORD: Record<string, string> = {
  'مصري': 'القاهرة 🇪🇬',
  'تونسي': 'تونس 🇹🇳',
  'سوري': 'دمشق 🇸🇾',
  'فلسطيني': 'القدس 🇵🇸',
  'لبناني': 'بيروت 🇱🇧',
  'أردني': 'عمّان 🇯🇴',
};

const CITY_BY_ID: Record<string, string> = {
  egyptian: 'القاهرة 🇪🇬',
  tunisian: 'تونس 🇹🇳',
  syrian: 'دمشق 🇸🇾',
  palestinian: 'القدس 🇵🇸',
  lebanese: 'بيروت 🇱🇧',
  jordanian: 'عمّان 🇯🇴',
  algerian: 'الجزائر 🇩🇿',
  argentinian: 'بوينس آيرس 🇦🇷',
  american: 'نيويورك 🇺🇸',
  bahraini: 'المنامة 🇧🇭',
  australian: 'سيدني 🇦🇺',
  chinese: 'بكين 🇨🇳',
  british: 'لندن 🇬🇧',
  brazilian: 'ساو باولو 🇧🇷',
  chilean: 'سانتياغو 🇨🇱',
  colombian: 'بوغوتا 🇨🇴',
  'costa-rican': 'سان خوسيه 🇨🇷',
  cuban: 'هافانا 🇨🇺',
  emirati: 'دبي 🇦🇪',
  ethiopian: 'أديس أبابا 🇪🇹',
  french: 'باريس 🇫🇷',
  italian: 'روما 🇮🇹',
  indian: 'مومباي 🇮🇳',
  indonesian: 'جاكرتا 🇮🇩',
  japanese: 'طوكيو 🇯🇵',
  greek: 'أثينا 🇬🇷',
  jamaican: 'كينغستون 🇯🇲',
  kenyan: 'نيروبي 🇰🇪',
  korean: 'سيول 🇰🇷',
  taiwanese: 'تايبيه 🇹🇼',
  kuwaiti: 'مدينة الكويت 🇰🇼',
  mexican: 'مدينة مكسيكو 🇲🇽',
  libyan: 'طرابلس 🇱🇾',
  malaysian: 'كوالالمبور 🇲🇾',
  moroccan: 'الدار البيضاء 🇲🇦',
  'new-zealand': 'أوكلاند 🇳🇿',
  omani: 'مسقط 🇴🇲',
  pakistani: 'كراتشي 🇵🇰',
  peruvian: 'ليما 🇵🇪',
  saudi: 'الرياض 🇸🇦',
  nigerian: 'لاغوس 🇳🇬',
  qatar: 'الدوحة 🇶🇦',
  rwandan: 'كيغالي 🇷🇼',
  swiss: 'جنيف 🇨🇭',
  thai: 'بانكوك 🇹🇭',
  vietnamese: 'هانوي 🇻🇳',
  spanish: 'مدريد 🇪🇸',
  'south-african': 'كيب تاون 🇿🇦',
  ghanaian: 'أكرا 🇬🇭',
  seychellois: 'فيكتوريا 🇸🇨',
  mauritian: 'بورت لويس 🇲🇺',
  gabonese: 'ليبرفيل 🇬🇦',
  botswanan: 'غابورون 🇧🇼',
  filipino: 'مانيلا 🇵🇭',
  turkish: 'اسطنبول 🇹🇷',
  turkey: 'اسطنبول 🇹🇷',
  uk: 'لندن 🇬🇧',
  germany: 'برلين 🇩🇪',
  austria: 'فيينا 🇦🇹',
  benelux: 'أمستردام 🇳🇱',
  usa: 'نيويورك 🇺🇸',
  canada: 'أوتاوا 🇨🇦',
  australasia: 'سيدني 🇦🇺',
  norway: 'أوسلو 🇳🇴',
  sweden: 'ستوكهولم 🇸🇪',
  denmark: 'كوبنهاغن 🇩🇰',
  finland: 'هلسنكي 🇫🇮',
  ukraine: 'كييف 🇺🇦',
  venezuelan: 'كراكاس 🇻🇪',
};

const COUNTRY_BY_WORD: Record<string, string> = {
  'مصري': 'مصر 🇪🇬',
  'تونسي': 'تونس 🇹🇳',
  'سوري': 'سوريا 🇸🇾',
  'فلسطيني': 'فلسطين 🇵🇸',
  'لبناني': 'لبنان 🇱🇧',
  'أردني': 'الأردن 🇯🇴',
  'مغربي': 'المغرب 🇲🇦',
  'سعودي': 'السعودية 🇸🇦',
  'ياباني': 'اليابان 🇯🇵',
};

const COUNTRY_BY_ID: Record<string, string> = {
  egyptian: 'مصر 🇪🇬',
  tunisian: 'تونس 🇹🇳',
  syrian: 'سوريا 🇸🇾',
  palestinian: 'فلسطين 🇵🇸',
  lebanese: 'لبنان 🇱🇧',
  jordanian: 'الأردن 🇯🇴',
  algerian: 'الجزائر 🇩🇿',
  argentinian: 'الأرجنتين 🇦🇷',
  american: 'الولايات المتحدة 🇺🇸',
  bahraini: 'البحرين 🇧🇭',
  australian: 'أستراليا 🇦🇺',
  chinese: 'الصين 🇨🇳',
  british: 'بريطانيا 🇬🇧',
  brazilian: 'البرازيل 🇧🇷',
  chilean: 'تشيلي 🇨🇱',
  colombian: 'كولومبيا 🇨🇴',
  'costa-rican': 'كوستاريكا 🇨🇷',
  cuban: 'كوبا 🇨🇺',
  emirati: 'الإمارات 🇦🇪',
  ethiopian: 'إثيوبيا 🇪🇹',
  french: 'فرنسا 🇫🇷',
  italian: 'إيطاليا 🇮🇹',
  indian: 'الهند 🇮🇳',
  indonesian: 'إندونيسيا 🇮🇩',
  japanese: 'اليابان 🇯🇵',
  greek: 'اليونان 🇬🇷',
  jamaican: 'جامايكا 🇯🇲',
  kenyan: 'كينيا 🇰🇪',
  korean: 'كوريا 🇰🇷',
  taiwanese: 'تايوان 🇹🇼',
  kuwaiti: 'الكويت 🇰🇼',
  mexican: 'المكسيك 🇲🇽',
  libyan: 'ليبيا 🇱🇾',
  malaysian: 'ماليزيا 🇲🇾',
  moroccan: 'المغرب 🇲🇦',
  'new-zealand': 'نيوزيلندا 🇳🇿',
  omani: 'عمان 🇴🇲',
  pakistani: 'باكستان 🇵🇰',
  peruvian: 'بيرو 🇵🇪',
  saudi: 'السعودية 🇸🇦',
  nigerian: 'نيجيريا 🇳🇬',
  qatar: 'قطر 🇶🇦',
  rwandan: 'رواندا 🇷🇼',
  swiss: 'سويسرا 🇨🇭',
  thai: 'تايلاند 🇹🇭',
  vietnamese: 'فيتنام 🇻🇳',
  spanish: 'إسبانيا 🇪🇸',
  'south-african': 'جنوب أفريقيا 🇿🇦',
  ghanaian: 'غانا 🇬🇭',
  seychellois: 'سيشل 🇸🇨',
  mauritian: 'موريشيوس 🇲🇺',
  gabonese: 'غابون 🇬🇦',
  botswanan: 'بوتسوانا 🇧🇼',
  filipino: 'الفلبين 🇵🇭',
  turkish: 'تركيا 🇹🇷',
  turkey: 'تركيا 🇹🇷',
  uk: 'بريطانيا 🇬🇧',
  germany: 'ألمانيا 🇩🇪',
  austria: 'النمسا 🇦🇹',
  benelux: 'بنيلوكس 🇳🇱',
  usa: 'الولايات المتحدة 🇺🇸',
  canada: 'كندا 🇨🇦',
  australasia: 'أستراليا ونيوزيلندا 🇦🇺',
  norway: 'النرويج 🇳🇴',
  sweden: 'السويد 🇸🇪',
  denmark: 'الدنمارك 🇩🇰',
  finland: 'فنلندا 🇫🇮',
  ukraine: 'أوكرانيا 🇺🇦',
  'eastern-european': 'أوروبا الشرقية 🇵🇱',
  venezuelan: 'فنزويلا 🇻🇪',
};

const NAME_BY_ID: Record<string, string> = {
  egyptian: 'المطبخ المصري',
  tunisian: 'المطبخ التونسي',
  syrian: 'المطبخ السوري',
  palestinian: 'المطبخ الفلسطيني',
  lebanese: 'المطبخ اللبناني',
  jordanian: 'المطبخ الأردني',
  algerian: 'المطبخ الجزائري',
  american: 'المطبخ الأمريكي',
  bahraini: 'المطبخ البحريني',
  australian: 'المطبخ الأسترالي',
  chinese: 'المطبخ الصيني',
  japanese: 'المطبخ الياباني',
  british: 'المطبخ البريطاني',
  brazilian: 'المطبخ البرازيلي',
  argentinian: 'الأرجنتين',
  chilean: 'المطبخ التشيلي',
  colombian: 'كولومبيا',
  'costa-rican': 'المطبخ الكوستاريكي',
  cuban: 'المطبخ الكوبي',
  emirati: 'المطبخ الإماراتي',
  ethiopian: 'المطبخ الإثيوبي',
  french: 'المطبخ الفرنسي',
  italian: 'المطبخ الإيطالي',
  indian: 'المطبخ الهندي',
  indonesian: 'المطبخ الإندونيسي',
  malaysian: 'المطبخ الماليزي',
  greek: 'المطبخ اليوناني',
  jamaican: 'المطبخ الجامايكي',
  kenyan: 'المطبخ الكيني',
  korean: 'المطبخ الكوري',
  taiwanese: 'المطبخ التايواني',
  kuwaiti: 'المطبخ الكويتي',
  mexican: 'المكسيك',
  libyan: 'المطبخ الليبي',
  moroccan: 'المطبخ المغربي',
  'new-zealand': 'المطبخ النيوزيلندي',
  omani: 'المطبخ العماني',
  pakistani: 'المطبخ الباكستاني',
  peruvian: 'بيرو',
  saudi: 'المطبخ السعودي',
  nigerian: 'المطبخ النيجيري',
  qatar: 'المطبخ القطري',
  rwandan: 'المطبخ الرواندي',
  swiss: 'المطبخ السويسري',
  thai: 'المطبخ التايلندي',
  vietnamese: 'المطبخ الفيتنامي',
  spanish: 'المطبخ الإسباني',
  'south-african': 'المطبخ الجنوب أفريقي',
ghanaian: 'المطبخ الغاني',
  seychellois: 'المطبخ السيشيلي',
  mauritian: 'المطبخ الموريشيوسي',
  gabonese: 'المطبخ الغابوني',
  botswanan: 'المطبخ البوتسواناوي',
  filipino: 'المطبخ الفلبيني',
  turkish: 'المطبخ التركي',
  turkey: 'المطبخ التركي',
  uk: 'المطبخ البريطاني',
  germany: 'المطبخ الألماني',
  austria: 'المطبخ النمساوي',
  benelux: 'مطبخ البنيلوكس',
  usa: 'المطبخ الأمريكي',
  canada: 'المطبخ الكندي',
  australasia: 'المطبخ الأسترالي والنيوزيلندي',
  norway: 'المطبخ النرويجي',
  sweden: 'المطبخ السويدي',
  denmark: 'المطبخ الدنماركي',
  finland: 'المطبخ الفنلندي',
  ukraine: 'المطبخ الأوكراني',
  'eastern-european': 'أوروبا الشرقية',
  venezuelan: 'المطبخ الفنزويلي',
};

const CITY_EN_BY_ID: Record<string, string> = {
  egyptian: 'Cairo', tunisian: 'Tunis', syrian: 'Damascus', palestinian: 'Jerusalem', lebanese: 'Beirut', jordanian: 'Amman',
  algerian: 'Algiers', american: 'New York', bahraini: 'Manama', australian: 'Sydney', chinese: 'Beijing', british: 'London',
  brazilian: 'São Paulo', argentinian: 'Buenos Aires', chilean: 'Santiago', colombian: 'Bogotá', 'costa-rican': 'San José', cuban: 'Havana', emirati: 'Dubai',
  ethiopian: 'Addis Ababa', french: 'Paris', italian: 'Rome', indian: 'Mumbai', indonesian: 'Jakarta', japanese: 'Tokyo',
  greek: 'Athens', jamaican: 'Kingston', kenyan: 'Nairobi', korean: 'Seoul', taiwanese: 'Taipei', kuwaiti: 'Kuwait City',
  mexican: 'Mexico City', libyan: 'Tripoli', malaysian: 'Kuala Lumpur', moroccan: 'Casablanca', 'new-zealand': 'Auckland',
  omani: 'Muscat', pakistani: 'Karachi', peruvian: 'Lima', saudi: 'Riyadh', nigerian: 'Lagos', qatar: 'Doha',
  rwandan: 'Kigali', swiss: 'Geneva', thai: 'Bangkok', vietnamese: 'Hanoi', spanish: 'Madrid', 'south-african': 'Cape Town',
  ghanaian: 'Accra', seychellois: 'Victoria', mauritian: 'Port Louis', gabonese: 'Libreville', botswanan: 'Gaborone',
  filipino: 'Manila', turkish: 'Istanbul', turkey: 'Istanbul', uk: 'London', germany: 'Berlin', austria: 'Vienna',
  benelux: 'Amsterdam', usa: 'New York', canada: 'Ottawa', australasia: 'Sydney', norway: 'Oslo', sweden: 'Stockholm',
  denmark: 'Copenhagen', finland: 'Helsinki', ukraine: 'Kyiv', venezuelan: 'Caracas',
};

const COUNTRY_EN_BY_ID: Record<string, string> = {
  egyptian: 'Egypt', tunisian: 'Tunisia', syrian: 'Syria', palestinian: 'Palestine', lebanese: 'Lebanon', jordanian: 'Jordan',
  algerian: 'Algeria', american: 'United States', bahraini: 'Bahrain', australian: 'Australia', chinese: 'China',
  british: 'United Kingdom', brazilian: 'Brazil', argentinian: 'Argentina', chilean: 'Chile', colombian: 'Colombia', 'costa-rican': 'Costa Rica',
  cuban: 'Cuba', emirati: 'UAE', ethiopian: 'Ethiopia', french: 'France', italian: 'Italy', indian: 'India',
  indonesian: 'Indonesia', japanese: 'Japan', greek: 'Greece', jamaican: 'Jamaica', kenyan: 'Kenya', korean: 'Korea',
  taiwanese: 'Taiwan', kuwaiti: 'Kuwait', mexican: 'Mexico', libyan: 'Libya', malaysian: 'Malaysia', moroccan: 'Morocco',
  'new-zealand': 'New Zealand', omani: 'Oman', pakistani: 'Pakistan', peruvian: 'Peru', saudi: 'Saudi Arabia',
  nigerian: 'Nigeria', qatar: 'Qatar', rwandan: 'Rwanda', swiss: 'Switzerland', thai: 'Thailand', vietnamese: 'Vietnam',
  spanish: 'Spain', 'south-african': 'South Africa', ghanaian: 'Ghana', seychellois: 'Seychelles', mauritian: 'Mauritius',
  gabonese: 'Gabon', botswanan: 'Botswana', filipino: 'Philippines', turkish: 'Turkey', turkey: 'Turkey', uk: 'United Kingdom',
  germany: 'Germany', austria: 'Austria', benelux: 'Benelux', usa: 'United States', canada: 'Canada',
  australasia: 'Australia & New Zealand', norway: 'Norway', sweden: 'Sweden', denmark: 'Denmark', finland: 'Finland',
  ukraine: 'Ukraine',
  'eastern-european': 'Eastern Europe',
  venezuelan: 'Venezuela',
};

const KITCHEN_DESCRIPTION_BY_ID: Record<string, string> = {
  'eastern-european': 'Polish, Russian, Czech, Hungarian',
  mexican: 'Tacos, Burritos, Guacamole',
  argentinian: 'Asado, Empanadas, Chimichurri',
  colombian: 'Arepas, Bandeja Paisa, Ajiaco',
  peruvian: 'Ceviche, Lomo Saltado, Causa',
};

const KITCHEN_EN_BY_ID: Record<string, string> = {
  egyptian: 'Egyptian Kitchen', tunisian: 'Tunisian Kitchen', syrian: 'Syrian Kitchen', palestinian: 'Palestinian Kitchen',
  lebanese: 'Lebanese Kitchen', jordanian: 'Jordanian Kitchen', algerian: 'Algerian Kitchen', american: 'American Kitchen',
  bahraini: 'Bahraini Kitchen', australian: 'Australian Kitchen', chinese: 'Chinese Kitchen', japanese: 'Japanese Kitchen',
   british: 'British Kitchen', brazilian: 'Brazilian Kitchen', argentinian: 'Argentina', chilean: 'Chilean Kitchen', colombian: 'Colombia',
  'costa-rican': 'Costa Rican Kitchen', cuban: 'Cuban Kitchen', emirati: 'Emirati Kitchen', ethiopian: 'Ethiopian Kitchen',
  french: 'French Kitchen', italian: 'Italian Kitchen', indian: 'Indian Kitchen', indonesian: 'Indonesian Kitchen',
  malaysian: 'Malaysian Kitchen', greek: 'Greek Kitchen', jamaican: 'Jamaican Kitchen', kenyan: 'Kenyan Kitchen',
   korean: 'Korean Kitchen', taiwanese: 'Taiwanese Kitchen', kuwaiti: 'Kuwaiti Kitchen', mexican: 'Mexico',
  libyan: 'Libyan Kitchen', moroccan: 'Moroccan Kitchen', 'new-zealand': 'New Zealand Kitchen', omani: 'Omani Kitchen',
  pakistani: 'Pakistani Kitchen', peruvian: 'Peru', saudi: 'Saudi Kitchen', nigerian: 'Nigerian Kitchen',
  qatar: 'Qatari Kitchen', rwandan: 'Rwandan Kitchen', swiss: 'Swiss Kitchen', thai: 'Thai Kitchen',
  vietnamese: 'Vietnamese Kitchen', spanish: 'Spanish Kitchen', 'south-african': 'South African Kitchen',
  ghanaian: 'Ghanaian Kitchen', seychellois: 'Seychellois Kitchen', mauritian: 'Mauritian Kitchen',
  gabonese: 'Gabonese Kitchen', botswanan: 'Botswanan Kitchen', filipino: 'Filipino Kitchen', turkish: 'Turkish Kitchen',
  turkey: 'Turkish Kitchen', uk: 'British Kitchen', germany: 'German Kitchen', austria: 'Austrian Kitchen',
  benelux: 'Benelux Kitchen', usa: 'American Kitchen', canada: 'Canadian Kitchen', australasia: 'Australasian Kitchen',
  norway: 'Norwegian Kitchen', sweden: 'Swedish Kitchen', denmark: 'Danish Kitchen', finland: 'Finnish Kitchen',
  ukraine: 'Ukrainian Kitchen',
  'eastern-european': 'Eastern European',
  venezuelan: 'Venezuelan Kitchen',
};

const DIET_NAME_EN: Record<string, string> = {
  keto: 'Keto Kitchen', vegan: 'Vegan Kitchen', vegetarian: 'Vegetarian Kitchen', 'high-protein': 'High-Protein Kitchen',
  mediterranean: 'Mediterranean Kitchen', 'low-carb': 'Low-Carb Diet', dash: 'DASH Diet', 'gluten-free': 'Gluten-Free Diet',
  'intermittent-fasting': 'Intermittent Fasting Diet', paleo: 'Paleo Diet',
};

const DIET_COUNTRY_EN: Record<string, string> = {
  keto: 'USA - Keto 🇺🇸', vegan: 'Global - Vegan 🌱', vegetarian: 'Global - Vegetarian 🌿', 'high-protein': 'Global - Protein 💪',
  mediterranean: 'Greece - Mediterranean 🫒', 'low-carb': 'Diet - Low Carb 🥬', dash: 'USA - DASH 🫀',
  'gluten-free': 'Global - Gluten-Free 🌾', 'intermittent-fasting': 'Global - Intermittent Fasting ⏱️', paleo: 'Global - Paleo 🏹',
};

function basenameId(path: string): string {
  const file = path.split('/').pop() || '';
  const id = file.replace(/\.(json|ts)$/, '').replace(/-full(?:-100-USDA)?$/, '').replace(/-kitchen$/, '');
  if (id === 'mexico') return 'mexican';
  if (id === 'argentina') return 'argentinian';
  if (id === 'colombia') return 'colombian';
  if (id === 'peru') return 'peruvian';
  return id;
}

function matchCountry(name: string, id: string): string {
  for (const [word, country] of Object.entries(COUNTRY_BY_WORD)) {
    if (name.includes(word)) return country;
  }
  return COUNTRY_BY_ID[id] ?? CITY_BY_ID[id] ?? name;
}

function matchCity(name: string, id: string): string {
  for (const [word, city] of Object.entries(CITY_BY_WORD)) {
    if (name.includes(word)) return city;
  }
  return CITY_BY_ID[id] ?? 'مدينة';
}

function toKitchenDish(raw: any): KitchenDish | null {
  if (!raw || typeof raw !== 'object') return null;
  if ('cal_100' in raw) {
    return {
      name: raw.name ?? '',
      nameAr: raw.name ?? raw.nameAr ?? raw.name_ar ?? undefined,
      nameEn: raw.nameEn ?? raw.name_en ?? undefined,
      nameFr: raw.nameFr ?? raw.name_fr ?? undefined,
      nameEs: raw.nameEs ?? raw.name_es ?? undefined,
      nameDe: raw.nameDe ?? raw.name_de ?? undefined,
      cal_100: raw.cal_100 ?? 0,
      p: raw.p ?? 0,
      c: raw.c ?? 0,
      f: raw.f ?? 0,
      serv_g: raw.serv_g ?? 100,
      cal_serv: raw.cal_serv ?? 0,
      healthy: !!raw.healthy,
      confidence: raw.confidence ?? 70,
      confidence_label: raw.confidence_label ?? '70% - تقديري',
      confidence_color: (raw.confidence_color as KitchenDish['confidence_color']) ?? 'orange',
      source: raw.source ?? '',
      notes: raw.notes ?? '',
      mealTypes: Array.isArray(raw.mealTypes) ? raw.mealTypes : undefined,
      region: typeof raw.region === 'string' && raw.region ? raw.region : undefined,
    };
  }
  const grams = raw.grams || 100;
  const kcal = raw.kcal ?? 0;
  const cal100 = Math.max(0, Math.round((kcal * 100) / grams));
  return {
    name: raw.name_ar ?? raw.nameAr ?? raw.name_en ?? raw.nameEn ?? '',
    nameAr: raw.name_ar ?? raw.nameAr ?? undefined,
    nameEn: raw.nameEn ?? raw.name_en ?? undefined,
    nameFr: raw.nameFr ?? raw.name_fr ?? undefined,
    nameEs: raw.nameEs ?? raw.name_es ?? undefined,
    nameDe: raw.nameDe ?? raw.name_de ?? undefined,
    cal_100: cal100,
    p: raw.protein ?? 0,
    c: raw.carbs ?? 0,
    f: raw.fat ?? 0,
    serv_g: grams,
    cal_serv: raw.kcal ?? 0,
    healthy: cal100 <= 150,
    confidence: 70,
    confidence_label: '70% - تقديري',
    confidence_color: 'orange' as const,
    source: 'تقديري من بيانات محلية',
    notes: raw.note ?? '',
    mealType: raw.mealType,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jsonModules = import.meta.glob('../*-full-100-USDA.json', { eager: true }) as Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tsModules = import.meta.glob('../*-full.ts', { eager: true }) as Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dietModules = import.meta.glob('../*-diet-100-medical.json', { eager: true }) as Record<string, any>;

const DIET_NAME: Record<string, string> = {
  keto: 'المطبخ الكيتو',
  vegan: 'المطبخ النباتي الصرف',
  vegetarian: 'المطبخ النباتي العام',
  'high-protein': 'المطبخ عالي البروتين',
  mediterranean: 'المطبخ المتوسطي',
  'low-carb': 'الدايت قليل الكربوهيدرات',
  dash: 'دايت DASH للضغط',
  'gluten-free': 'دايت خالٍ من الغلوتين',
  'intermittent-fasting': 'دايت الصيام المتقطع',
  paleo: 'دايت باليو',
};

const DIET_COUNTRY: Record<string, string> = {
  keto: 'أمريكا - كيتو 🇺🇸',
  vegan: 'نباتي عالمي 🌱',
  vegetarian: 'نباتي عام 🌿',
  'high-protein': 'عالمي - بروتين 💪',
  mediterranean: 'اليونان - متوسطي 🫒',
  'low-carb': 'دايت - قليل الكربوهيدرات 🥬',
  dash: 'أمريكا - DASH 🫀',
  'gluten-free': 'عالمي - خالٍ من الغلوتين 🌾',
  'intermittent-fasting': 'عالمي - صيام متقطع ⏱️',
  paleo: 'عالمي - باليو 🏹',
};

function buildDiet(path: string, mod: any): KitchenInfo {
  const list: any[] = Array.isArray(mod.default) ? mod.default : Array.isArray(mod) ? mod : [];
  const dishes = list.map(toKitchenDish).filter((d: KitchenDish | null): d is KitchenDish => !!d);
  const base = (path.split('/').pop() || '').replace(/\.json$/, '').replace(/-diet-100-medical$/, '');
  const name = DIET_NAME[base] ?? `دايت ${base}`;
  const country = DIET_COUNTRY[base] ?? 'عالمي دايت 🌍';
  return {
    id: `diet-${base}`,
    kitchen: name,
    city: name,
    country,
    kitchenEn: DIET_NAME_EN[base] ?? `${base} diet`,
    cityEn: DIET_NAME_EN[base] ?? `${base} diet`,
    countryEn: DIET_COUNTRY_EN[base] ?? 'Global diet 🌍',
    flag: country.split(' ').pop() ?? '🏳️',
    total: dishes.length,
    conf100: 0,
    conf85: 0,
    conf70: dishes.length,
    sample: dishes[0] ?? null,
    dishes,
    categories: [],
    rich: false,
  };
}

function buildRich(path: string, mod: any): KitchenInfo {
  const data = mod.default ?? mod;
  const categories: KitchenCategory[] = (data.categories ?? []).map((c: any) => ({
    id: c.id ?? '',
    name_ar: c.name_ar ?? '',
    nameEn: c.name?.en ?? c.nameEn ?? c.name_en ?? undefined,
    nameFr: c.name?.fr ?? c.nameFr ?? c.name_fr ?? undefined,
    nameEs: c.name?.es ?? c.nameEs ?? c.name_es ?? undefined,
    nameDe: c.name?.de ?? c.nameDe ?? c.name_de ?? undefined,
    count: c.count ?? c.dishes?.length ?? 0,
    dishes: (c.dishes ?? []).map(toKitchenDish).filter((d: KitchenDish | null): d is KitchenDish => !!d),
  }));
  const dishes = categories.flatMap((c) => c.dishes);
  const id = basenameId(path);
  const name = typeof data.kitchen === 'string' ? data.kitchen : NAME_BY_ID[id] ?? id;
  const city = matchCity(name, id);
  const country = matchCountry(name, id);
  return {
    id,
    kitchen: name,
    city,
    country,
    kitchenEn: typeof data.kitchen_en === 'string' ? data.kitchen_en : KITCHEN_EN_BY_ID[id],
    cityEn: CITY_EN_BY_ID[id],
    countryEn: COUNTRY_EN_BY_ID[id],
    flag: country.split(' ').pop() ?? '🏳️',
    total: data.total_dishes ?? dishes.length,
    conf100: dishes.filter((d) => d.confidence === 100).length,
    conf85: dishes.filter((d) => d.confidence === 85).length,
    conf70: dishes.filter((d) => d.confidence === 70).length,
    sample: dishes[0] ?? null,
    dishes,
    categories,
    portion_guide: data.portion_guide,
    regions: Array.isArray(data.regions) ? data.regions.filter((r: unknown): r is string => typeof r === 'string') : undefined,
    regionId: KITCHEN_REGION_BY_ID.get(id),
    rich: true,
  };
}

function buildBasic(path: string, mod: any): KitchenInfo {
  const id = basenameId(path);
  const entry = Object.entries(mod).find(([k, v]) => k.endsWith('_FULL') && Array.isArray(v));
  const rawList: any[] = (entry?.[1] as any[]) ?? [];
  const dishes = rawList.map(toKitchenDish).filter((d: KitchenDish | null): d is KitchenDish => !!d);
  const name = NAME_BY_ID[id] ?? id;
  const city = CITY_BY_ID[id] ?? name;
  const country = COUNTRY_BY_ID[id] ?? city;
  return {
    id,
    kitchen: name,
    city,
    country,
    kitchenEn: KITCHEN_EN_BY_ID[id],
    cityEn: CITY_EN_BY_ID[id],
    countryEn: COUNTRY_EN_BY_ID[id],
    description: KITCHEN_DESCRIPTION_BY_ID[id],
    flag: country.split(' ').pop() ?? '🏳️',
    total: dishes.length,
    conf100: 0,
    conf85: 0,
    conf70: dishes.length,
    sample: dishes[0] ?? null,
    dishes,
    categories: [],
    regionId: KITCHEN_REGION_BY_ID.get(id),
    rich: false,
  };
}

function assemble(): KitchenInfo[] {
  const out: KitchenInfo[] = [];
  for (const [path, mod] of Object.entries(jsonModules)) {
    out.push(buildRich(path, mod));
  }
  const richIds = new Set(out.map((k) => k.id));
  for (const [path, mod] of Object.entries(tsModules)) {
    const id = basenameId(path);
    if (richIds.has(id) || path.endsWith('/peruvian-full.ts')) continue;
    out.push(buildBasic(path, mod));
  }
  for (const [path, mod] of Object.entries(dietModules)) {
    out.push(buildDiet(path, mod));
  }
  return out;
}

export const kitchensRegistry: KitchenInfo[] = assemble();
export const totalDishesAll = kitchensRegistry.reduce((s, k) => s + k.total, 0);

export function getDishName(dish: KitchenDish | null | undefined, lang: Language): string {
  if (!dish) return '';
  if (lang === 'ar') return dish.nameAr ?? dish.name ?? dish.nameEn ?? '';
  if (lang === 'fr') return dish.nameFr ?? dish.nameEn ?? dish.name ?? '';
  if (lang === 'es') return dish.nameEs ?? dish.nameEn ?? dish.name ?? '';
  if (lang === 'de') return dish.nameDe ?? dish.nameEn ?? dish.name ?? '';
  return dish.nameEn ?? dish.name ?? '';
}

export function getCategoryName(cat: KitchenCategory | null | undefined, lang: Language): string {
  if (!cat) return '';
  if (lang === 'ar') return cat.name_ar ?? cat.nameEn ?? '';
  if (lang === 'fr') return cat.nameFr ?? cat.nameEn ?? cat.name_ar ?? '';
  if (lang === 'es') return cat.nameEs ?? cat.nameEn ?? cat.name_ar ?? '';
  if (lang === 'de') return cat.nameDe ?? cat.nameEn ?? cat.name_ar ?? '';
  return cat.nameEn ?? cat.name_ar ?? '';
}

export function getKitchenName(k: KitchenInfo | null | undefined, lang: Language): string {
  if (!k) return '';
  return lang === 'ar' ? k.kitchen : (k.kitchenEn ?? k.kitchen);
}

export function getKitchenCountry(k: KitchenInfo | null | undefined, lang: Language): string {
  if (!k) return '';
  return lang === 'ar' ? k.country : (k.countryEn ?? k.country);
}

export function getKitchenCity(k: KitchenInfo | null | undefined, lang: Language): string {
  if (!k) return '';
  return lang === 'ar' ? k.city : (k.cityEn ?? k.city);
}
