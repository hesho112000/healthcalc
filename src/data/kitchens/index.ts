// Dynamic kitchens registry - auto-discovers every kitchen in src/data.
// Rich kitchens (Egyptian/Tunisian/Syrian/Palestinian/Lebanese/Jordanian) come from
// *-full-100-USDA.json (categories + confidence). All other kitchens come from the
// *-full.ts adapters (flattened to the same normalized shape, confidence 70%).

export interface KitchenDish {
  name: string;
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
}

export interface KitchenCategory {
  id: string;
  name_ar: string;
  count: number;
  dishes: KitchenDish[];
}

export interface KitchenInfo {
  id: string;
  kitchen: string;
  city: string;
  country: string;
  flag: string;
  total: number;
  conf100: number;
  conf85: number;
  conf70: number;
  sample: KitchenDish | null;
  dishes: KitchenDish[];
  categories: KitchenCategory[];
  portion_guide?: string;
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
  japanese: 'طوكيو 🇯🇵',
  greek: 'أثينا 🇬🇷',
  jamaican: 'كينغستون 🇯🇲',
  kenyan: 'نيروبي 🇰🇪',
  korean: 'سيول 🇰🇷',
  kuwaiti: 'مدينة الكويت 🇰🇼',
  mexican: 'مدينة مكسيكو 🇲🇽',
  libyan: 'طرابلس 🇱🇾',
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
  spanish: 'مدريد 🇪🇸',
  'south-african': 'كيب تاون 🇿🇦',
  turkish: 'اسطنبول 🇹🇷',
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
};

const COUNTRY_BY_ID: Record<string, string> = {
  egyptian: 'مصر 🇪🇬',
  tunisian: 'تونس 🇹🇳',
  syrian: 'سوريا 🇸🇾',
  palestinian: 'فلسطين 🇵🇸',
  lebanese: 'لبنان 🇱🇧',
  jordanian: 'الأردن 🇯🇴',
  algerian: 'الجزائر 🇩🇿',
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
  japanese: 'اليابان 🇯🇵',
  greek: 'اليونان 🇬🇷',
  jamaican: 'جامايكا 🇯🇲',
  kenyan: 'كينيا 🇰🇪',
  korean: 'كوريا 🇰🇷',
  kuwaiti: 'الكويت 🇰🇼',
  mexican: 'المكسيك 🇲🇽',
  libyan: 'ليبيا 🇱🇾',
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
  spanish: 'إسبانيا 🇪🇸',
  'south-african': 'جنوب أفريقيا 🇿🇦',
  turkish: 'تركيا 🇹🇷',
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
  british: 'المطبخ البريطاني',
  brazilian: 'المطبخ البرازيلي',
  chilean: 'المطبخ التشيلي',
  colombian: 'المطبخ الكولومبي',
  'costa-rican': 'المطبخ الكوستاريكي',
  cuban: 'المطبخ الكوبي',
  emirati: 'المطبخ الإماراتي',
  ethiopian: 'المطبخ الإثيوبي',
  french: 'المطبخ الفرنسي',
  italian: 'المطبخ الإيطالي',
  indian: 'المطبخ الهندي',
  japanese: 'المطبخ الياباني',
  greek: 'المطبخ اليوناني',
  jamaican: 'المطبخ الجامايكي',
  kenyan: 'المطبخ الكيني',
  korean: 'المطبخ الكوري',
  kuwaiti: 'المطبخ الكويتي',
  mexican: 'المطبخ المكسيكي',
  libyan: 'المطبخ الليبي',
  moroccan: 'المطبخ المغربي',
  'new-zealand': 'المطبخ النيوزيلندي',
  omani: 'المطبخ العماني',
  pakistani: 'المطبخ الباكستاني',
  peruvian: 'المطبخ البيروفي',
  saudi: 'المطبخ السعودي',
  nigerian: 'المطبخ النيجيري',
  qatar: 'المطبخ القطري',
  rwandan: 'المطبخ الرواندي',
  swiss: 'المطبخ السويسري',
  thai: 'المطبخ التايلاندي',
  spanish: 'المطبخ الإسباني',
  'south-african': 'المطبخ الجنوب أفريقي',
  turkish: 'المطبخ التركي',
  venezuelan: 'المطبخ الفنزويلي',
};

function basenameId(path: string): string {
  const file = path.split('/').pop() || '';
  return file.replace(/\.(json|ts)$/, '').replace(/-full(?:-100-USDA)?$/, '').replace(/-kitchen$/, '');
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
    };
  }
  const grams = raw.grams || 100;
  const kcal = raw.kcal ?? 0;
  const cal100 = Math.max(0, Math.round((kcal * 100) / grams));
  return {
    name: raw.name_ar ?? raw.nameAr ?? raw.name_en ?? raw.nameEn ?? '',
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
    flag: country.split(' ').pop() ?? '🏳️',
    total: data.total_dishes ?? dishes.length,
    conf100: dishes.filter((d) => d.confidence === 100).length,
    conf85: dishes.filter((d) => d.confidence === 85).length,
    conf70: dishes.filter((d) => d.confidence === 70).length,
    sample: dishes[0] ?? null,
    dishes,
    categories,
    portion_guide: data.portion_guide,
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

function assemble(): KitchenInfo[] {
  const out: KitchenInfo[] = [];
  for (const [path, mod] of Object.entries(jsonModules)) {
    out.push(buildRich(path, mod));
  }
  const richIds = new Set(out.map((k) => k.id));
  for (const [path, mod] of Object.entries(tsModules)) {
    const id = basenameId(path);
    if (richIds.has(id)) continue;
    out.push(buildBasic(path, mod));
  }
  for (const [path, mod] of Object.entries(dietModules)) {
    out.push(buildDiet(path, mod));
  }
  return out;
}

export const kitchensRegistry: KitchenInfo[] = assemble();
export const totalDishesAll = kitchensRegistry.reduce((s, k) => s + k.total, 0);