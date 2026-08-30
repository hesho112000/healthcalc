import { CUISINE_GROUPS } from './cuisineCatalog';

interface GeoEntry {
  re: RegExp;
  cuisine: string;
  countryEn: string;
  countryAr: string;
}

const GEO_ENTRIES: GeoEntry[] = [
  { re: /^America\/Sao_Paulo|^America\/Araguaina|^America\/Bahia|^America\/Belem|^America\/Boa_Vista|^America\/Campo_Grande|^America\/Cuiaba|^America\/Eirunepe|^America\/Fortaleza|^America\/Maceio|^America\/Manaus|^America\/Noronha|^America\/Porto_Velho|^America\/Recife|^America\/Rio_Branco|^America\/Rio/gi, cuisine: 'brazilian', countryEn: 'Brazil', countryAr: 'البرازيل' },
  { re: /^America\/Lima/i, cuisine: 'peruvian', countryEn: 'Peru', countryAr: 'بيرو' },
  { re: /^America\/(Mexico|Baja_California|Baja_Sure|Chihuahua|Hermosillo|Mazatlan|Ojinaga|Tijuana)/i, cuisine: 'mexican', countryEn: 'Mexico', countryAr: 'المكسيك' },
  { re: /^America\/(Argentina|Argentina\/)/i, cuisine: 'argentinian', countryEn: 'Argentina', countryAr: 'الأرجنتين' },
  { re: /^America\/Canada|^America\/(Toronto|Vancouver|Montreal|Halifax|Winnipeg|Edmonton|Regina|St_Johns)/i, cuisine: 'canadian', countryEn: 'Canada', countryAr: 'كندا' },
  { re: /^America\/Havana/i, cuisine: 'cuban', countryEn: 'Cuba', countryAr: 'كوبا' },
  { re: /^America\/Costa_Rica/i, cuisine: 'costa_rican', countryEn: 'Costa Rica', countryAr: 'كوستاريكا' },
  { re: /^America\/Jamaica/i, cuisine: 'jamaican', countryEn: 'Jamaica', countryAr: 'جامايكا' },
  { re: /^America\/Bogota/i, cuisine: 'colombian', countryEn: 'Colombia', countryAr: 'كولومبيا' },
  { re: /^America\/Santiago/i, cuisine: 'chilean', countryEn: 'Chile', countryAr: 'تشيلي' },
  { re: /^America\/Caracas/i, cuisine: 'venezuelan', countryEn: 'Venezuela', countryAr: 'فنزويلا' },
  { re: /^America\/|^US\/|^US/i, cuisine: 'american', countryEn: 'United States', countryAr: 'الولايات المتحدة' },
  { re: /^Africa\/Cairo/i, cuisine: 'egyptian', countryEn: 'Egypt', countryAr: 'مصر' },
  { re: /^Africa\/Tripoli/i, cuisine: 'libyan', countryEn: 'Libya', countryAr: 'ليبيا' },
  { re: /^Africa\/Tunis/i, cuisine: 'tunisian', countryEn: 'Tunisia', countryAr: 'تونس' },
  { re: /^Africa\/Algiers/i, cuisine: 'algerian', countryEn: 'Algeria', countryAr: 'الجزائر' },
  { re: /^Africa\/Casablanca|^Africa\/El_Aaiun/i, cuisine: 'moroccan', countryEn: 'Morocco', countryAr: 'المغرب' },
  { re: /^Africa\//i, cuisine: 'african', countryEn: 'Africa', countryAr: 'أفريقيا' },
  { re: /^Asia\/Riyadh/i, cuisine: 'saudi', countryEn: 'Saudi Arabia', countryAr: 'السعودية' },
  { re: /^Asia\/Dubai/i, cuisine: 'emirati', countryEn: 'United Arab Emirates', countryAr: 'الإمارات' },
  { re: /^Asia\/(Doha|Qatar)/i, cuisine: 'qatar', countryEn: 'Qatar', countryAr: 'قطر' },
  { re: /^Asia\/Kuwait/i, cuisine: 'kuwaiti', countryEn: 'Kuwait', countryAr: 'الكويت' },
  { re: /^Asia\/Bahrain/i, cuisine: 'bahraini', countryEn: 'Bahrain', countryAr: 'البحرين' },
  { re: /^Asia\/(Muscat|Aden)/i, cuisine: 'omani', countryEn: 'Oman', countryAr: 'عُمان' },
  { re: /^Asia\/Kolkata|^Asia\/Calcutta/i, cuisine: 'indian', countryEn: 'India', countryAr: 'الهند' },
  { re: /^Asia\/Karachi/i, cuisine: 'pakistani', countryEn: 'Pakistan', countryAr: 'باكستان' },
  { re: /^Asia\/Shanghai|^Asia\/Hong_Kong/i, cuisine: 'chinese', countryEn: 'China', countryAr: 'الصين' },
  { re: /^Asia\/Tokyo/i, cuisine: 'japanese', countryEn: 'Japan', countryAr: 'اليابان' },
  { re: /^Asia\/Seoul/i, cuisine: 'korean', countryEn: 'South Korea', countryAr: 'كوريا' },
  { re: /^Asia\/Bangkok/i, cuisine: 'thai', countryEn: 'Thailand', countryAr: 'تايلند' },
  { re: /^Asia\/(Istanbul|Damascus)/i, cuisine: 'turkish', countryEn: 'Turkey', countryAr: 'تركيا' },
  { re: /^Europe\/Rome|^Europe\/Milan|^Europe\/Naples|^Europe\/Bologna/i, cuisine: 'italian', countryEn: 'Italy', countryAr: 'إيطاليا' },
  { re: /^Europe\/Madrid|^Europe\/Lisbon/i, cuisine: 'spanish', countryEn: 'Spain', countryAr: 'إسبانيا' },
  { re: /^Europe\/Paris/i, cuisine: 'french', countryEn: 'France', countryAr: 'فرنسا' },
  { re: /^Europe\/Athens/i, cuisine: 'greek', countryEn: 'Greece', countryAr: 'اليونان' },
  { re: /^Europe\/London|^Europe\/Dublin|^Europe\/Belfast/i, cuisine: 'british', countryEn: 'United Kingdom', countryAr: 'بريطانيا' },
  { re: /^Europe\/Zurich|^Europe\/Geneva|^Europe\/Bern/i, cuisine: 'swiss', countryEn: 'Switzerland', countryAr: 'سويسرا' },
  { re: /^Europe\/Berlin|^Europe\/Vienna/i, cuisine: 'german', countryEn: 'Germany', countryAr: 'ألمانيا' },
  { re: /^Europe\//i, cuisine: 'italian', countryEn: 'Europe', countryAr: 'أوروبا' },
  { re: /^Pacific\/Auckland/i, cuisine: 'new_zealand', countryEn: 'New Zealand', countryAr: 'نيوزيلندا' },
  { re: /^Australia|^Pacific|^Etc\//i, cuisine: 'australian', countryEn: 'Australia', countryAr: 'أستراليا' },
];

const languageFallback = (lang: string): GeoEntry | null => {
  if (lang.startsWith('ar')) return { re: /x/i, cuisine: 'egyptian', countryEn: 'Egypt', countryAr: 'مصر' };
  if (lang.startsWith('fr')) return { re: /x/i, cuisine: 'french', countryEn: 'France', countryAr: 'فرنسا' };
  if (lang.startsWith('es')) return { re: /x/i, cuisine: 'spanish', countryEn: 'Spain', countryAr: 'إسبانيا' };
  if (lang.startsWith('de')) return { re: /x/i, cuisine: 'german', countryEn: 'Germany', countryAr: 'ألمانيا' };
  if (lang.startsWith('pt')) return { re: /x/i, cuisine: 'brazilian', countryEn: 'Brazil', countryAr: 'البرازيل' };
  return null;
};

const resolve = (): GeoEntry | null => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz) {
      for (const entry of GEO_ENTRIES) {
        if (entry.re.test(tz)) return entry;
      }
    }
  } catch {}
  try {
    const lang = typeof navigator !== 'undefined' ? (navigator.language || 'en').toLowerCase() : 'en';
    return languageFallback(lang);
  } catch {}
  return null;
};

export const detectCuisineByLocation = (): string => resolve()?.cuisine ?? 'american';

export const getGeoMeta = (): { cuisine: string; countryEn: string; countryAr: string } | null => {
  const entry = resolve();
  if (!entry) return null;
  return { cuisine: entry.cuisine, countryEn: entry.countryEn, countryAr: entry.countryAr };
};

export const getCuisineLocalName = (cuisine: string, lang: string): string => {
  for (const group of CUISINE_GROUPS) {
    const item = group.items.find((c) => c.id === cuisine);
    if (item) return lang === 'ar' ? item.nameAr : item.nameEn;
  }
  return cuisine;
};