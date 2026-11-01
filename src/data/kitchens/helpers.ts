import type { Language } from '../../types';
import type { KitchenCategory, KitchenDish, KitchenInfo } from './index';

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
  if (lang === 'ar') return k.kitchen;
  if (lang === 'fr') return k.kitchenFr ?? k.kitchenEn ?? k.kitchen;
  if (lang === 'es') return k.kitchenEs ?? k.kitchenEn ?? k.kitchen;
  if (lang === 'de') return k.kitchenDe ?? k.kitchenEn ?? k.kitchen;
  return k.kitchenEn ?? k.kitchen;
}

export function getKitchenCountry(k: KitchenInfo | null | undefined, lang: Language): string {
  if (!k) return '';
  return lang === 'ar' ? k.country : (k.countryEn ?? k.country);
}

export function getKitchenCity(k: KitchenInfo | null | undefined, lang: Language): string {
  if (!k) return '';
  return lang === 'ar' ? k.city : (k.cityEn ?? k.city);
}
