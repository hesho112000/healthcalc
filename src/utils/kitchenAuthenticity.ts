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
  ليبي: 'pan_libyan', ليبيه: 'pan_libyan',
  لبناني: 'pan_lebanese', لبنانيه: 'pan_lebanese',
  سوري: 'pan_syrian', سوريه: 'pan_syrian',
  أردني: 'pan_jordanian', أردنيه: 'pan_jordanian',
  شامي: 'mena_shared', شاميه: 'mena_shared',
  فلسطيني: 'pan_palestinian', فلسطينيه: 'pan_palestinian',
  يمني: 'mena_shared', يمنيه: 'mena_shared',
  عراقي: 'mena_shared', عراقيه: 'mena_shared',
  هندي: 'pan_indian', هنديه: 'pan_indian',
  تركي: 'global', تركيه: 'global',
  باكستاني: 'pan_pakistani', باكستانيه: 'pan_pakistani',
  اندونيسي: 'pan_indonesian', اندونيسيه: 'pan_indonesian',
  ماليزي: 'pan_malaysian', ماليزيه: 'pan_malaysian',
  نيجيري: 'pan_nigerian', نيجيريه: 'pan_nigerian',
   اثيوبي: 'pan_ethiopian', اثيوبيه: 'pan_ethiopian',
   كيني: 'pan_kenyan', كينيه: 'pan_kenyan',
   افريقي: 'pan_south_african', افريقيه: 'pan_south_african',
   غاني: 'pan_ghanaian', غانيه: 'pan_ghanaian',
   رواندي: 'pan_rwandan', روانديه: 'pan_rwandan',
   سيشيلي: 'pan_seychellois', سيشيليه: 'pan_seychellois',
    موريشوسي: 'pan_mauritian', موريشوسيه: 'pan_mauritian',
    غابوني: 'pan_gabonese', غابونيه: 'pan_gabonese',
    بوتسواناوي: 'pan_botswanan', بوتسواناويه: 'pan_botswanan',
    فلبيني: 'pan_filipino', فلبينيه: 'pan_filipino',
  };

// Tokens that LOOK like nationalities but are common Arabic nouns (nose-ambiguity guard).
const NO_RETAG_TOKENS = new Set(['صيني', 'صينيه', 'سوداني', 'سودانيه', 'شامي', 'شاميه']);
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
// Lebanon's card additionally credits its shared Levantine/MENA family rows in
// useKitchenDishCounts (only ones authored with the levant-2026 source prefix),
// so the live card count shows all 300 rows migrated for LB.
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
  libyan: new Set(['pan_libyan', 'tripoli', 'benghazi', 'misrata', 'zwara', 'sabratha', 'ghadames', 'kufra']),
  lebanese: new Set(['pan_lebanese', 'beirut', 'tarablus', 'sidon', 'jbeil', 'baalbek', 'zahle', 'jezzine']),
  syrian: new Set([
    'pan_syrian', 'damascus', 'aleppo', 'homs', 'hama', 'lataqia', 'tartus',
    'dayr_ez_zawr', 'hasakah', 'swaida', 'daraa', 'idlib', 'raqqa',
  ]),
  jordanian: new Set([
    'pan_jordanian', 'amman', 'irbid', 'zarqa', 'balqa', 'mafraq', 'jerash',
    'ajloun', 'karak', 'tafilah', 'maan', 'aqaba', 'madaba',
  ]),
  palestinian: new Set([
    'pan_palestinian', 'jerusalem', 'gaza', 'nablus', 'hebron', 'jenin',
    'tulkarim', 'ramallah', 'bethlehem', 'jaffa', 'haifa', 'safad', 'qalqilya', 'tubas',
  ]),
  // India's card counts its own region-tagged rows; asian_shared rows authored with the
  // asia-india-2026 prefix are credited in useKitchenDishCounts (set is region-only).
  indian: new Set(['pan_indian', 'tamil_nadu', 'kerala', 'karnataka', 'hyderabad', 'punjab', 'delhi', 'lucknow', 'kashmir', 'rajasthan', 'gujarat', 'maharashtra', 'goa', 'bengal', 'bihar']),
  // Pakistan's card counts its own region-tagged rows; asian_shared rows authored with
  // the asia-pakistan-2026 prefix are credited in useKitchenDishCounts (set is region-only).
  pakistani: new Set(['pan_pakistani', 'punjab', 'sindh', 'kpk', 'balochistan', 'gilgit_baltistan']),
  // Indonesia's card counts its own region-tagged rows; asian_shared rows authored with
  // the asia-indonesia-2026 prefix are credited in useKitchenDishCounts (set is region-only).
  indonesian: new Set(['pan_indonesian', 'java', 'sumatra', 'bali', 'sulawesi']),
  // Malaysia's card counts its own region-tagged rows; asian_shared rows authored with
  // the asia-malaysia-2026 prefix are credited in useKitchenDishCounts (set is region-only).
  malaysian: new Set(['pan_malaysian', 'peninsular_malaysia', 'borneo']),
  // Nigeria's card counts its own region-tagged rows; african_shared rows authored with
  // the africa-nigeria-2026 prefix are credited in useKitchenDishCounts (set is region-only).
  nigerian: new Set(['pan_nigerian', 'yoruba', 'igbo', 'hausa', 'efik_calabar', 'niger_delta']),
  // Ethiopia's card counts its own region-tagged rows; african_shared rows authored with
  // the africa-ethiopia-2026 prefix are credited in useKitchenDishCounts (set is region-only).
  ethiopian: new Set(['pan_ethiopian', 'amhara', 'oromia', 'tigray', 'addis_ababa', 'afar', 'sidama']),
   // Kenya's card counts its own region-tagged rows; african_shared rows authored with
   // the africa-kenya-2026 prefix are credited in useKitchenDishCounts (set is region-only).
   kenyan: new Set(['pan_kenyan', 'nairobi', 'mombasa', 'kisumu', 'nakuru', 'nyeri']),
   // South Africa's card counts its own region-tagged rows; african_shared rows authored
   // with the africa-south-africa-2026 prefix are credited in useKitchenDishCounts (set is region-only).
   'south-african': new Set(['pan_south_african', 'cape_town', 'johannesburg', 'durban', 'pretoria', 'port_elizabeth']),
   // Ghana's card counts its own region-tagged rows; african_shared rows authored
   // with the africa-ghana-2026 prefix are credited in useKitchenDishCounts (set is region-only).
   ghanaian: new Set(['pan_ghanaian', 'accra', 'kumasi', 'tamale']),
   // Rwanda's card counts its own region-tagged rows; african_shared rows authored with
   // the africa-rwanda-2026 prefix are credited in useKitchenDishCounts (set is region-only).
   rwandan: new Set(['pan_rwandan', 'kigali', 'butare', 'musanze', 'rwamagana', 'gisenyi']),
   // Seychelles' card counts its own region-tagged rows; african_shared rows authored with
   // the africa-seychelles-2026 prefix are credited in useKitchenDishCounts (set is region-only).
   seychellois: new Set(['pan_seychellois', 'mahe', 'praslin', 'la_digue', 'outer_islands']),
   // Mauritius' card counts its own region-tagged rows; african_shared rows authored with
   // the africa-mauritius-2026 prefix are credited in useKitchenDishCounts (set is region-only).
    mauritian: new Set(['pan_mauritian', 'port_louis', 'curepipe', 'quatre_bornes', 'vacoas', 'mahebourg', 'flacq']),
    // Gabon's card counts its own region-tagged rows; african_shared rows authored with
    // the africa-gabon-2026 prefix are credited in useKitchenDishCounts (set is region-only).
    gabonese: new Set(['pan_gabonese', 'libreville', 'port_gentil', 'franceville', 'lambarene', 'oyem', 'moanda', 'mayumba']),
    // Botswana's card counts its own region-tagged rows; african_shared rows authored with
    // the africa-botswana-2026 prefix are credited in useKitchenDishCounts (set is region-only).
    botswanan: new Set(['pan_botswanan', 'gaborone', 'francistown', 'maun', 'serowe', 'molepoloni', 'palapye', 'kanye', 'jwaneng']),
    // The Filipino card counts its own region-tagged rows; asian_shared rows authored
    // with the asia-philippines-2026 prefix are credited in useKitchenDishCounts.
    filipino: new Set(['pan_filipino', 'manila', 'cebu', 'davao', 'iloilo', 'bacolod', 'baguio', 'cagayan_de_oro', 'zamboanga', 'bicol']),
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
  libyan: new Set(['pan_libyan', 'maghreb_shared', 'tripoli', 'benghazi', 'misrata', 'zwara', 'sabratha', 'ghadames', 'kufra']),
  lebanese: new Set(['pan_lebanese', 'levantine_shared', 'mena_shared', 'beirut', 'tarablus', 'sidon', 'jbeil', 'baalbek', 'zahle', 'jezzine']),
  syrian: new Set([
    'pan_syrian', 'levantine_shared', 'mena_shared', 'damascus', 'aleppo', 'homs',
    'hama', 'lataqia', 'tartus', 'dayr_ez_zawr', 'hasakah', 'swaida', 'daraa', 'idlib', 'raqqa',
  ]),
  jordanian: new Set([
    'pan_jordanian', 'levantine_shared', 'mena_shared', 'amman', 'irbid', 'zarqa',
    'balqa', 'mafraq', 'jerash', 'ajloun', 'karak', 'tafilah', 'maan', 'aqaba', 'madaba',
  ]),
  palestinian: new Set([
    'pan_palestinian', 'levantine_shared', 'mena_shared', 'jerusalem', 'gaza', 'nablus',
    'hebron', 'jenin', 'tulkarim', 'ramallah', 'bethlehem', 'jaffa', 'haifa', 'safad',
    'qalqilya', 'tubas',
  ]),
  // India's OWN rows are pan_indian + regional anchors + asian_shared. Every
  // Indian-authored name carries the هندي nationality adjective (which now maps to
  // 'pan_indian'), so the guard accepts them without needing a 'global' escape hatch.
  indian: new Set([
    'pan_indian', 'asian_shared', 'tamil_nadu', 'kerala', 'karnataka',
    'hyderabad', 'punjab', 'delhi', 'lucknow', 'kashmir', 'rajasthan', 'gujarat',
    'maharashtra', 'goa', 'bengal', 'bihar',
  ]),
  // Pakistani family mirrors India: own pan region + provincial anchors + the shared
  // South Asian pool. Names carry باكستاني which now maps to 'pan_pakistani'.
  pakistani: new Set([
    'pan_pakistani', 'asian_shared', 'punjab', 'sindh', 'kpk', 'balochistan', 'gilgit_baltistan',
  ]),
  // Indonesian family mirrors the Indian/Pakistani pattern: own pan region + regional
  // anchors across the archipelago + the shared South-East Asian pool. Names carry
  // إندونيسي which now maps to 'pan_indonesian'.
  indonesian: new Set([
    'pan_indonesian', 'asian_shared', 'java', 'sumatra', 'bali', 'sulawesi',
  ]),
  // Malaysian family mirrors Indonesia: own pan region + Peninsular/Borneo anchors
  // + the shared South-East Asian pool. Names carry ماليزي which maps to 'pan_malaysian'.
  malaysian: new Set([
    'pan_malaysian', 'asian_shared', 'peninsular_malaysia', 'borneo',
  ]),
  // Nigerian family mirrors the South Asian pattern: own pan region + regional anchors
  // (Hausa/Yoruba/Igbo/Efik-Calabar/Niger-Delta) + the shared West African pool. Names
  // carry نيجيري which now maps to 'pan_nigerian'.
  nigerian: new Set([
    'pan_nigerian', 'african_shared', 'yoruba', 'igbo', 'hausa', 'efik_calabar', 'niger_delta',
  ]),
  // Ethiopian family mirrors Nigeria: own pan region + regional anchors (Amhara, Oromia,
  // Tigray, Addis Ababa, Afar, Sidama) + the shared East African pool. Names carry إثيوبي
  // (normalized اثيوبي) which now maps to 'pan_ethiopian'.
  ethiopian: new Set([
    'pan_ethiopian', 'african_shared', 'amhara', 'oromia', 'tigray', 'addis_ababa', 'afar', 'sidama',
  ]),
   // Kenyan family mirrors Ethiopia: own pan_kenyan + regional anchors (Nairobi, Mombasa,
   // Kisumu, Nakuru, Nyeri) + the shared East African pool. Names carry كيني/كينيه which now
   // map to 'pan_kenyan'.
   kenyan: new Set([
     'pan_kenyan', 'african_shared', 'nairobi', 'mombasa', 'kisumu', 'nakuru', 'nyeri',
   ]),
   // South African family mirrors Kenya/Nigeria/Ethiopia: own pan_south_african + regional
   // anchors (Cape Town, Johannesburg, Durban, Pretoria, Port Elizabeth) + the shared
   // African pool. Names carry افريقي/افريقيه which now maps to 'pan_south_african'.
   'south-african': new Set([
     'pan_south_african', 'african_shared', 'cape_town', 'johannesburg', 'durban', 'pretoria', 'port_elizabeth',
   ]),
   // Ghanaian family mirrors South Africa: own pan_ghanaian + regional anchors (Accra,
   // Kumasi, Tamale) + the shared African pool. Names carry غاني/غانيه which now map to
   // 'pan_ghanaian'.
   ghanaian: new Set([
     'pan_ghanaian', 'african_shared', 'accra', 'kumasi', 'tamale',
   ]),
   // Rwandan family mirrors Ghana: own pan_rwandan + regional anchors (Kigali, Butare,
   // Musanze, Rwamagana, Gisenyi) + the shared East African pool. Names carry رواندي
   // (normalized رواندي) which now maps to 'pan_rwandan'.
   rwandan: new Set([
     'pan_rwandan', 'african_shared', 'kigali', 'butare', 'musanze', 'rwamagana', 'gisenyi',
   ]),
   // Seychellois family mirrors Ghana: own pan_seychellois + regional anchors (Mahe, Praslin,
   // La Digue, Outer Islands) + the shared African/Indian Ocean pool. Names carry سيشيلي
   // (normalized سيشيلي, and the feminine سيشيليه) which now map to 'pan_seychellois'.
   seychellois: new Set([
     'pan_seychellois', 'african_shared', 'mahe', 'praslin', 'la_digue', 'outer_islands',
   ]),
    // Mauritian family mirrors Ghana: own pan_mauritian + regional anchors (Port Louis,
    // Curepipe, Quatre Bornes, Vacoas, Mahebourg, Flacq) + the shared African/Indian Ocean
    // pool. Names carry موريشوسي (normalized موريشوسي, and the feminine موريشوسيه) which now
    // map to 'pan_mauritian'.
     mauritian: new Set([
       'pan_mauritian', 'african_shared', 'port_louis', 'curepipe', 'quatre_bornes',
       'vacoas', 'mahebourg', 'flacq',
     ]),
     // Gabonese family mirrors Ghana: own pan_gabonese + regional anchors (Libreville,
     // Port-Gentil, Franceville, Lambarene, Oyem, Moanda, Mayumba) + the shared Central
     // African pool. Names carry غابوني (normalized غابوني, and the feminine غابونيه)
     // which now map to 'pan_gabonese'.
     gabonese: new Set([
       'pan_gabonese', 'african_shared', 'libreville', 'port_gentil', 'franceville',
       'lambarene', 'oyem', 'moanda', 'mayumba',
     ]),
     // Botswanan family mirrors Gabon: own pan_botswanan + regional anchors (Gaborone,
     // Francistown, Maun, Serowe, Molepoloni, Palapye, Kanye, Jwaneng) + the shared
     // African pool. Names carry بوتسواناوي (normalized بوتسواناوي, and the feminine
     // بوتسواناويه) which now map to 'pan_botswanan'.
     botswanan: new Set([
       'pan_botswanan', 'african_shared', 'gaborone', 'francistown', 'maun', 'serowe',
       'molepoloni', 'palapye', 'kanye', 'jwaneng',
     ]),
     // Filipino family: own pan_filipino + regional anchors (Manila, Cebu, Davao,
     // Iloilo, Bacolod, Baguio, Cagayan de Oro, Zamboanga, Bicol) + the shared Asian
     // pool. Names carry فلبيني (normalized فلبيني, and the feminine فلبينيه) which
     // now map to 'pan_filipino'.
     filipino: new Set([
       'pan_filipino', 'asian_shared', 'manila', 'cebu', 'davao', 'iloilo', 'bacolod',
       'baguio', 'cagayan_de_oro', 'zamboanga', 'bicol',
     ]),
  };

// True when a dish may be served in the given kitchen's plans.
export function isAuthenticForKitchen(kitchenId: string, region: string | null | undefined, name: string | null | undefined): boolean {
  const fam = KITCHEN_REGION_FAMILIES[kitchenId];
  if (fam && region && !fam.has(region)) return false;
  if (kitchenId === 'saudi' && LEVANTINE_BARE.has(normalizeArabicName(name ?? ''))) return false;
  return !hasForeignNationalityFor(kitchenId, name);
}