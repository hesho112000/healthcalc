// Kitchen authenticity helpers: Arabic-name normalization + nationality detection.

export function normalizeArabicName(s: string): string {
  return (s ?? '')
    .replace(/[\u064B-\u0652\u0670]/g, '')
    .replace(/\u0640/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim();
}

// Nationality-adjective -> kitchen region. Keys are NORMALIZED forms (ة->ه).
const TOKEN_REGIONS: Record<string, string> = {
  سعودي: 'pan_saudi', سعوديه: 'pan_saudi',
  قطري: 'pan_qatari', قطريه: 'pan_qatari',
  بحريني: 'pan_bahraini', بحرينيه: 'pan_bahraini',
  عماني: 'pan_omani', عمانيه: 'pan_omani',
  كويتي: 'pan_kuwaiti', كويتيه: 'pan_kuwaiti',
  إماراتي: 'pan_emirati', إماراتيه: 'pan_emirati', اماراتي: 'pan_emirati', اماراتيه: 'pan_emirati',
  مغربي: 'pan_moroccan', مغربيه: 'pan_moroccan',
  مصري: 'pan_egyptian', مصريه: 'pan_egyptian',
  تونسي: 'pan_tunisian', تونسيه: 'pan_tunisian',
  جزائري: 'pan_algerian', جزائريه: 'pan_algerian',
  لبناني: 'mena_shared', لبنانيه: 'mena_shared',
  سوري: 'mena_shared', سوريه: 'mena_shared',
  شامي: 'mena_shared', شاميه: 'mena_shared',
  أردني: 'mena_shared', أردنيه: 'mena_shared',
  فلسطيني: 'mena_shared', فلسطينيه: 'mena_shared',
  يمني: 'mena_shared', يمنيه: 'mena_shared',
  عراقي: 'mena_shared', عراقيه: 'mena_shared',
  هندي: 'global', هنديه: 'global',
  تركي: 'global', تركيه: 'global',
  باكستاني: 'global', باكستانيه: 'global',
};

// Tokens that LOOK like nationalities but are common Arabic nouns.
const NO_RETAG_TOKENS = new Set(['صيني', 'صينيه', 'سوداني', 'سودانيه']);
const TAMARIND_HINDI = /تمر\s*(?:ال)?هندي/;

export const LEVANTINE_BARE = new Set(['تبوله', 'فتوش']);

// Returns the kitchen region a nationality adjective in the name refers to, or null.
export function nationalityRegion(name: string | null | undefined): string | null {
  if (!name) return null;
  let norm = normalizeArabicName(name);
  if (TAMARIND_HINDI.test(norm)) norm = norm.replace(TAMARIND_HINDI, 'تمر');
  for (const t of norm.split(/\s+/)) {
    if (NO_RETAG_TOKENS.has(t)) continue;
    const base = t.replace(/^ال/, '');
    if (TOKEN_REGIONS[base]) return TOKEN_REGIONS[base];
  }
  return null;
}

// True when the name's nationality adjective points OUTSIDE the kitchen's own family.
// e.g. "مجبوس قطري" is foreign for saudi (pan_qatari not in saudi's family) but native for qatar.
// Kitchens without a region family (diets, global cuisines) accept every nationality.
export function hasForeignNationalityFor(kitchenId: string, name: string | null | undefined): boolean {
  const fam = KITCHEN_REGION_FAMILIES[kitchenId];
  if (!fam) return false;
  const nat = nationalityRegion(name);
  if (!nat) return false;
  return !fam.has(nat);
}

// Regions counted as a kitchen's OWN dishes for the cuisine-card counts.
// Shared pools (gulf_shared/mena_shared/maghreb_shared) are excluded; the
// unlabeled Saudi legacy rows (region = null) are attributed to saudi.
export const KITCHEN_COUNT_REGIONS: Record<string, ReadonlySet<string | null>> = {
  saudi: new Set(['pan_saudi', 'hijazi', 'najdi', 'janubi', 'sharqi', null]),
  emirati: new Set(['pan_emirati', 'ras_al_khaimah']),
  kuwaiti: new Set(['pan_kuwaiti']),
  qatar: new Set(['pan_qatari']),
  bahraini: new Set(['pan_bahraini']),
  omani: new Set(['pan_omani']),
  moroccan: new Set(['pan_moroccan', 'fes', 'marrakech', 'tangier', 'essouira', 'chefchaouen', 'sahara']),
  egyptian: new Set(['pan_egyptian', 'alexandria', 'delta', 'upper_egypt', 'sinai', 'nubia']),
  tunisian: new Set(['pan_tunisian', 'tunis', 'sfax', 'sousse', 'nabeul', 'gabes', 'medenine', 'bizerte']),
  algerian: new Set(['pan_algerian', 'alger', 'oran', 'constantine', 'annaba', 'tlemcen', 'bejaia', 'kabylie']),
};

// Region family a given kitchen may draw from.
export const KITCHEN_REGION_FAMILIES: Record<string, ReadonlySet<string>> = {
  saudi: new Set(['pan_saudi', 'gulf_shared', 'hijazi', 'najdi', 'janubi', 'sharqi']),
  emirati: new Set(['pan_emirati', 'gulf_shared']),
  kuwaiti: new Set(['pan_kuwaiti', 'gulf_shared']),
  qatar: new Set(['pan_qatari', 'gulf_shared']),
  bahraini: new Set(['pan_bahraini', 'gulf_shared']),
  omani: new Set(['pan_omani', 'gulf_shared']),
  moroccan: new Set(['pan_moroccan', 'maghreb_shared', 'fes', 'marrakech', 'tangier', 'essouira', 'chefchaouen', 'sahara']),
  egyptian: new Set(['pan_egyptian', 'mena_shared', 'cairo', 'alexandria', 'delta', 'upper_egypt', 'sinai', 'nubia']),
  tunisian: new Set(['pan_tunisian', 'maghreb_shared', 'tunis', 'sfax', 'sousse', 'nabeul', 'gabes', 'medenine', 'bizerte']),
  algerian: new Set(['pan_algerian', 'maghreb_shared', 'alger', 'oran', 'constantine', 'annaba', 'tlemcen', 'bejaia', 'kabylie']),
};

// True when a dish may be served in the given kitchen's plans.
export function isAuthenticForKitchen(kitchenId: string, region: string | null | undefined, name: string | null | undefined): boolean {
  const fam = KITCHEN_REGION_FAMILIES[kitchenId];
  if (fam && region && !fam.has(region)) return false;
  if (kitchenId === 'saudi' && LEVANTINE_BARE.has(normalizeArabicName(name ?? ''))) return false;
  return !hasForeignNationalityFor(kitchenId, name);
}