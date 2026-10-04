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
    تايلندي: 'pan_thai',
    فيتنامي: 'pan_vietnamese',
    ياباني: 'pan_japanese',
    صيني: 'pan_chinese',
    // Korean: MASCULINE 'كوري' only, deliberately NO feminine 'كوريه'.
    // A pre-existing Thai row is named 'كاري على الطريقة الفيتنامية تايلندي أصيل'
    // ("Vietnamese-style curry", pan_thai). Registering the feminine form would make
    // that Thai row resolve to pan_korean and hasForeignNationalityFor('thai', ...)
    // would REJECT one of Thailand's own 300 dishes. All 400 Korean rows are authored
    // with the masculine 'كوري' (expansion rows use 'كوري أصيل', which still resolves),
    // so every Korean row is mappable without touching the Thai kitchen.
    كوري: 'pan_korean',
    // Taiwan: 'تايوان' is unambiguous - the token is the endonym and appears in
    // every one of the 300 Taiwan rows, and no other kitchen uses it. The feminine
    // 'تايوانية' is registered as its normalized form 'تايوانيه' so it cannot
    // re-grab rows that nationalityRegion() has already resolved to another kitchen.
    تايوان: 'pan_taiwanese',
    تايوانيه: 'pan_taiwanese',
  أمريكي: 'pan_american', امريكي: 'pan_american',
  أمريكية: 'pan_american', امريكيه: 'pan_american',
  كندي: 'pan_canadian', كنديه: 'pan_canadian', كانادي: 'pan_canadian', كاناديه: 'pan_canadian',
   أسترالي: 'pan_australasian', استرالي: 'pan_australasian',
   أسترالية: 'pan_australasian', استراليه: 'pan_australasian',
   نيوزيلندي: 'pan_australasian', نيوزيلندية: 'pan_australasian', نيوزيلنديه: 'pan_australasian',
   بريطاني: 'pan_british',
   البريطانية: 'pan_british',
   انجلسي: 'pan_british',
   انجلسيه: 'pan_british',
   بريطانى: 'pan_british',
   // Germany: 'ألماني' and 'الماني' both normalize to 'الماني', and the feminine
   // 'ألمانية'/'الألمانية' normalize to 'المانيه'. Only the normalized forms are
   // registered, matching the australasian entries above.
   الماني: 'pan_german', المانيه: 'pan_german',
   // Germany gives every one of its 13 anchors its own demonym, but they all
   // belong to the same kitchen, so all 13 map to 'pan_german'. Registering them
   // is what makes hasForeignNationalityFor('german', ...) resolve for the 255
   // non-pan rows instead of returning null.
   // The feminine forms end in ة, which normalizeArabicName() folds to ه and
   // which therefore stays distinct from the masculine ending ي - so both are
   // registered rather than collapsing to one key per demonym.
   بافاري: 'pan_german', بافاريه: 'pan_german',
   برليني: 'pan_german', برلينيه: 'pan_german',
   هامبورغي: 'pan_german', هامبورغيه: 'pan_german',
   هيسي: 'pan_german', هيسيه: 'pan_german',
   راينلاندي: 'pan_german', راينلانديه: 'pan_german',
   ساكسوني: 'pan_german', ساكسونيه: 'pan_german',
   هانزياتي: 'pan_german', هانزياتيه: 'pan_german',
   تورينغي: 'pan_german', تورينغيه: 'pan_german',
   براندنبورغي: 'pan_german', براندنبورغيه: 'pan_german',
   شوابي: 'pan_german', شوابيه: 'pan_german',
   سارلاندي: 'pan_german', سارلانديه: 'pan_german',
بريميني: 'pan_german', بريمينيه: 'pan_german',
    سويسري: 'pan_swiss', سويسريه: 'pan_swiss',
    زوريخي: 'pan_swiss', زوريخيه: 'pan_swiss',
    برني: 'pan_swiss', برنيه: 'pan_swiss',
    جنيفي: 'pan_swiss', جنيفيه: 'pan_swiss',
    لوسيرني: 'pan_swiss', لوسيرنيه: 'pan_swiss',
    بازلي: 'pan_swiss', بازليه: 'pan_swiss',
    لوزاني: 'pan_swiss', لوزانيه: 'pan_swiss',
    تيسيني: 'pan_swiss', تيسينيه: 'pan_swiss',
    فاليزي: 'pan_swiss', فاليزيه: 'pan_swiss',
    غريزوني: 'pan_swiss', غريزونيه: 'pan_swiss',
    فودي: 'pan_swiss', فوديه: 'pan_swiss',
    ارغاوي: 'pan_swiss', ارغاويه: 'pan_swiss',
     سانت_غاليني: 'pan_swiss', سانت_غالينيه: 'pan_swiss',
     // Austria: the national and nine regional demonyms all resolve to the
     // pan-Austrian family; feminine forms are stored in their normalized form.
     نمساوي: 'pan_austrian', نمساوية: 'pan_austrian', نمساوى: 'pan_austrian', نمساويه: 'pan_austrian',
     فييني: 'pan_austrian', فيينيه: 'pan_austrian',
     تيرولي: 'pan_austrian', تيروليه: 'pan_austrian',
     سالزبورغي: 'pan_austrian', سالزبورغيه: 'pan_austrian',
     شتيرياني: 'pan_austrian', شتيريانيه: 'pan_austrian',
     كارينثياني: 'pan_austrian', كارينثيانيه: 'pan_austrian',
      نمساوي_عالي: 'pan_austrian', نمساويه_عاليه: 'pan_austrian',
      نمساوي_سفلي: 'pan_austrian', نمساويه_سفليه: 'pan_austrian',
      بورغنلاندي: 'pan_austrian', بورغنلانديه: 'pan_austrian',
      فورارلبرغي: 'pan_austrian', فورارلبرغيه: 'pan_austrian',
      // France: the national and twelve regional demonyms resolve to pan_french.
      فرنسي: 'pan_french', فرنسية: 'pan_french', فرنسى: 'pan_french', فرنسيه: 'pan_french',
      باريسي: 'pan_french', باريسيه: 'pan_french',
      نورماندي: 'pan_french', نورمانديه: 'pan_french',
      بروفنسي: 'pan_french', بروفنسيه: 'pan_french',
      ليوني: 'pan_french', ليونيه: 'pan_french',
      بوردوي: 'pan_french', بوردويه: 'pan_french',
      الزاسي: 'pan_french', الزاسيه: 'pan_french',
      بريتوني: 'pan_french', بريتونيه: 'pan_french',
      بورغندي: 'pan_french', بورغنديه: 'pan_french',
      تولوزي: 'pan_french', تولوزيه: 'pan_french',
      مارسيلي: 'pan_french', مارسيليه: 'pan_french',
      لواروي: 'pan_french', لوارويه: 'pan_french',
      كورسيكي: 'pan_french', كورسيكيه: 'pan_french',
     // Benelux: the national and twelve regional demonyms resolve to pan_benelux.
     بنيلوكسي: 'pan_benelux', بنيلوكسية: 'pan_benelux', بنيلوكسيه: 'pan_benelux',
     بنلوكسي: 'pan_benelux', بنلوكسية: 'pan_benelux', بنلوكسيه: 'pan_benelux',
     بلجيكي: 'pan_benelux', بلجيكية: 'pan_benelux', بلجيكيه: 'pan_benelux',
     هولندي: 'pan_benelux', هولندية: 'pan_benelux', هولنديه: 'pan_benelux',
     لوكسمبورغي: 'pan_benelux', لوكسمبورغية: 'pan_benelux', لوكسمبورغيه: 'pan_benelux',
     بروكسلي: 'pan_benelux', بروكسليه: 'pan_benelux',
     فلمنكي: 'pan_benelux', فلمنكيه: 'pan_benelux',
     والوني: 'pan_benelux', والونيه: 'pan_benelux',
     انتويربي: 'pan_benelux', انتويربيه: 'pan_benelux',
     امستردامي: 'pan_benelux', امسترداميه: 'pan_benelux',
     روتردامي: 'pan_benelux', روترداميه: 'pan_benelux',
     لاهايي: 'pan_benelux', لاهاييه: 'pan_benelux',
     اوتريختي: 'pan_benelux', اوتريختيه: 'pan_benelux',
     هولندي_شمالي: 'pan_benelux', هولنديه_شماليه: 'pan_benelux',
     لوكسمبورغي_جنوبي: 'pan_benelux', لوكسمبورغيه_جنوبيه: 'pan_benelux',
     ارديني: 'pan_benelux', اردينيه: 'pan_benelux',
     // Italy: the national and twelve regional demonyms resolve to pan_italian.
     ايطالي: 'pan_italian', ايطالية: 'pan_italian', ايطاليه: 'pan_italian',
     إيطالي: 'pan_italian', إيطالية: 'pan_italian', إيطاليه: 'pan_italian',
     طلياني: 'pan_italian', طليانية: 'pan_italian', طليانيه: 'pan_italian',
     روماني: 'pan_italian', رومانيه: 'pan_italian',
     ميلاني: 'pan_italian', ميلانيه: 'pan_italian',
     نابولي: 'pan_italian', نابوليه: 'pan_italian',
     صقلي: 'pan_italian', صقليه: 'pan_italian',
     توسكاني: 'pan_italian', توسكانيه: 'pan_italian',
     بندقي: 'pan_italian', بندقيه: 'pan_italian',
     فلورنسي: 'pan_italian', فلورنسيه: 'pan_italian',
     بولوني: 'pan_italian', بولونيه: 'pan_italian',
     توريني: 'pan_italian', تورينيه: 'pan_italian',
     جنوي: 'pan_italian', جنويه: 'pan_italian',
     سرديني: 'pan_italian', سردينيه: 'pan_italian',
     بوليزي: 'pan_italian', بوليزيه: 'pan_italian',
     // Spain: the national and twelve regional demonyms resolve to pan_spanish.
     اسباني: 'pan_spanish', اسبانية: 'pan_spanish', اسبانى: 'pan_spanish', اسبانيه: 'pan_spanish',
     إسباني: 'pan_spanish', إسبانية: 'pan_spanish', إسبانى: 'pan_spanish', إسبانيه: 'pan_spanish',
     مدريدي: 'pan_spanish', مدريدية: 'pan_spanish', مدريديه: 'pan_spanish',
     برشلوني: 'pan_spanish', برشلونية: 'pan_spanish', برشلونيه: 'pan_spanish',
     فالنسي: 'pan_spanish', فالنسية: 'pan_spanish', فالنسيه: 'pan_spanish',
     اشبيلي: 'pan_spanish', اشبيلية: 'pan_spanish', اشبيليه: 'pan_spanish',
     إشبيلي: 'pan_spanish', إشبيلية: 'pan_spanish', إشبيليه: 'pan_spanish',
     باسكي: 'pan_spanish', باسكية: 'pan_spanish', باسكيه: 'pan_spanish',
     غاليسي: 'pan_spanish', غاليسية: 'pan_spanish', غاليسيه: 'pan_spanish',
     اندلسي: 'pan_spanish', اندلسية: 'pan_spanish', اندلسيه: 'pan_spanish',
     أندلسي: 'pan_spanish', أندلسية: 'pan_spanish', أندلسيه: 'pan_spanish',
     قشتالي: 'pan_spanish', قشتالية: 'pan_spanish', قشتاليه: 'pan_spanish',
     اراغوني: 'pan_spanish', اراغونية: 'pan_spanish', اراغونيه: 'pan_spanish',
     أراغوني: 'pan_spanish', أراغونية: 'pan_spanish', أراغونيه: 'pan_spanish',
     كتالوني: 'pan_spanish', كتالونية: 'pan_spanish', كتالونيه: 'pan_spanish',
     كناري: 'pan_spanish', كنارية: 'pan_spanish', كناريه: 'pan_spanish',
      بلياري: 'pan_spanish', بليارية: 'pan_spanish', بلياريه: 'pan_spanish',
      // Greece: the national and ten regional demonyms resolve to pan_greek.
      يوناني: 'pan_greek', يونانية: 'pan_greek', يونانيه: 'pan_greek',
      إغريقي: 'pan_greek', إغريقية: 'pan_greek', إغريقيه: 'pan_greek',
      اغريقي: 'pan_greek', اغريقية: 'pan_greek', اغريقيه: 'pan_greek',
      أثيني: 'pan_greek', أثينية: 'pan_greek', أثينيه: 'pan_greek',
      اثيني: 'pan_greek', اثينية: 'pan_greek', اثينيه: 'pan_greek',
      سالونيكي: 'pan_greek', سالونيكية: 'pan_greek', سالونيكيه: 'pan_greek',
      كريتي: 'pan_greek', كريتية: 'pan_greek', كريتيه: 'pan_greek',
      سانتوريني: 'pan_greek', سانتورينية: 'pan_greek', سانتورينيه: 'pan_greek',
      ميكوني: 'pan_greek', ميكونية: 'pan_greek', ميكونيه: 'pan_greek',
      كورفي: 'pan_greek', كورفية: 'pan_greek', كورفيه: 'pan_greek',
      رودسي: 'pan_greek', رودسية: 'pan_greek', رودسيه: 'pan_greek',
      بيلوبونيزي: 'pan_greek', بيلوبونيزية: 'pan_greek', بيلوبونيزيه: 'pan_greek',
      إبيري: 'pan_greek', إبيرية: 'pan_greek', إبيريه: 'pan_greek',
      ابيري: 'pan_greek', ابيرية: 'pan_greek', ابيريه: 'pan_greek',
      مقدوني_يوناني: 'pan_greek', مقدونية_يونانية: 'pan_greek', مقدونيه_يونانيه: 'pan_greek',
      // Turkey: the national and fifteen regional demonyms resolve to pan_turkish.
      تركي: 'pan_turkish', تركية: 'pan_turkish', تركيه: 'pan_turkish',
      إسطنبولي: 'pan_turkish', إسطنبولية: 'pan_turkish', إسطنبوليه: 'pan_turkish',
      اسطنبولي: 'pan_turkish', اسطنبولية: 'pan_turkish', اسطنبوليه: 'pan_turkish',
      أنقري: 'pan_turkish', أنقرية: 'pan_turkish', أنقريه: 'pan_turkish',
      انقري: 'pan_turkish', انقرية: 'pan_turkish', انقريه: 'pan_turkish',
      إزميري: 'pan_turkish', إزميرية: 'pan_turkish', إزميريه: 'pan_turkish',
      ازميري: 'pan_turkish', ازميرية: 'pan_turkish', ازميريه: 'pan_turkish',
      بورصي: 'pan_turkish', بورصية: 'pan_turkish', بورصيه: 'pan_turkish',
      أنطالي: 'pan_turkish', أنطالية: 'pan_turkish', أنطاليه: 'pan_turkish',
      انطالي: 'pan_turkish', انطالية: 'pan_turkish', انطاليه: 'pan_turkish',
      عنتابي: 'pan_turkish', عنتابية: 'pan_turkish', عنتابيه: 'pan_turkish',
      قوني: 'pan_turkish', قونية: 'pan_turkish', قونيه: 'pan_turkish',
      أدني: 'pan_turkish', أدنية: 'pan_turkish', أدنيه: 'pan_turkish',
      ادني: 'pan_turkish', ادنية: 'pan_turkish', ادنيه: 'pan_turkish',
      طرابزوني: 'pan_turkish', طرابزونية: 'pan_turkish', طرابزونيه: 'pan_turkish',
      دياربكري: 'pan_turkish', دياربكرية: 'pan_turkish', دياربكريه: 'pan_turkish',
      قيصري: 'pan_turkish', قيصرية: 'pan_turkish', قيصريه: 'pan_turkish',
      مارديني: 'pan_turkish', ماردينية: 'pan_turkish', ماردينيه: 'pan_turkish',
      أورفاوي: 'pan_turkish', أورفاوية: 'pan_turkish', أورفاويه: 'pan_turkish',
      اورفاوي: 'pan_turkish', اورفاوية: 'pan_turkish', اورفاويه: 'pan_turkish',
      وانلي: 'pan_turkish', وانلية: 'pan_turkish', وانليه: 'pan_turkish',
      أسكي_شهيرلي: 'pan_turkish', أسكي_شهيرلية: 'pan_turkish', أسكي_شهيرليه: 'pan_turkish',
      اسكي_شهيرلي: 'pan_turkish', اسكي_شهيرلية: 'pan_turkish', اسكي_شهيرليه: 'pan_turkish',
      };

// Tokens that LOOK like nationalities but are common Arabic nouns (nose-ambiguity guard).
const NO_RETAG_TOKENS = new Set(['صيني', 'صينيه', 'سوداني', 'سودانيه', 'شامي', 'شاميه']);
const TAMARIND_HINDI = /تمر\s*(?:ال)?هندي/;
// 'كوري' is a real Korean nationality token, but it is ALSO the South-Indian dish
// prefix in "Kori ..." names (Kori ruti / Kori dosa / Kori gassi), e.g. the live
// Karnataka row 'كوري روتي لايت هندي'. nationalityRegion() returns the FIRST token it
// can map, so without this guard that Indian row would resolve to pan_korean and the
// Indian kitchen would reject one of its own dishes. Neutralize the word 'كوري' when it
// heads one of these dish names, exactly like TAMARIND_HINDI does for 'تمر هندي'.
const KORI_SOUTH_INDIAN = /كوري\s*(?:روتي|دوسا|غاسي|راث)/;
// 'يوناني' is the Greek demonym, but the legacy USDA 'زبادي يوناني' (Greek yogurt)
// snack rows carry no region and live in many kitchens; neutralize the compound
// exactly like TAMARIND_HINDI does for 'تمر هندي'.
const GREEK_YOGURT = /زبادي\s*(?:ال)?يونان[يى]/;
// 'تركي' is the Turkish demonym, but it ALSO means the turkey bird in 'لحم تركي'
// (Canadian smoked-turkey sandwiches) and heads the compound 'قهوة تركية'
// (Turkish coffee, a Tunisian live row). Neutralize both exactly like GREEK_YOGURT.
const TURKEY_BIRD_COFFEE = /لحم\s*تركي[هة]?|قهوة\s*تركي[هة]?/;

export const LEVANTINE_BARE = new Set(['تبوله', 'فتوش']);

// Returns the kitchen region a nationality adjective in the name refers to, or null.
export function nationalityRegion(name: string | null | undefined): string | null {
  if (!name) return null;
  let norm = normalizeArabicName(name);
  if (TAMARIND_HINDI.test(norm)) norm = norm.replace(TAMARIND_HINDI, 'تمر');
  if (KORI_SOUTH_INDIAN.test(norm)) norm = norm.replace(KORI_SOUTH_INDIAN, '');
  if (GREEK_YOGURT.test(norm)) norm = norm.replace(GREEK_YOGURT, 'زبادي');
  if (TURKEY_BIRD_COFFEE.test(norm)) norm = norm.replace(TURKEY_BIRD_COFFEE, '');
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
    // The Thai card counts its own region-tagged rows; asian_shared rows authored
    // with the asia-thailand-2026 prefix are credited in useKitchenDishCounts.
    thai: new Set(['pan_thai', 'bangkok', 'chiang_mai', 'isan', 'hua_hin', 'pattaya', 'phuket', 'songkhla', 'krabi']),
    // The Vietnamese card counts its own region-tagged rows; asian_shared rows authored
    // with the asia-vietnam-2026 prefix are credited in useKitchenDishCounts.
    vietnamese: new Set(['pan_vietnamese']),
    // The Japanese card counts its own region-tagged rows; asian_shared rows authored
    // with the asia-japan-2026 prefix are credited in useKitchenDishCounts.
    japanese: new Set(['pan_japanese', 'tokyo', 'osaka', 'kyoto', 'hokkaido', 'fukuoka', 'sapporo', 'sendai', 'nagoya']),
// The Chinese card counts its own region-tagged rows; asian_shared rows authored
    // with the asia-china-2026 prefix are credited in useKitchenDishCounts.
    chinese: new Set(['pan_chinese', 'asian_shared']),
    // The Korean card counts its own region-tagged rows. asian_shared is deliberately
    // absent from the set: the Korean pass kept asian_shared at 0 (no dish was forced
    // into the shared pool), so crediting it here would only mis-tag future rows.
    korean: new Set([
      'pan_korean', 'seoul', 'busan', 'jeju', 'jeonju', 'andong', 'goryeong', 'gangneung',
      'incheon', 'daegu', 'gwangju', 'daejeon', 'ulsan', 'suwon', 'chuncheon', 'mokpo',
      'yeosu', 'pohang', 'gyeongju', 'tongyeong', 'sunchang', 'boseong', 'namhae',
    ]),
    // The Taiwan card counts its own region-tagged rows: the pan bucket plus all 12
    // regional anchors. asian_shared is deliberately absent, matching the Korean
    // treatment - the Taiwan pass kept asian_shared at 0.
    taiwanese: new Set([
      'pan_taiwanese', 'taipei', 'tainan', 'taichung', 'kaohsiung', 'hsinchu',
      'hualien', 'taitung', 'keelung', 'chiayi', 'nantou', 'yilan', 'pingtung',
    ]),
    american: new Set([
      'pan_american', 'new_england', 'mid_atlantic', 'south', 'deep_south', 'cajun',
      'texas', 'southwest', 'california', 'pacific_northwest', 'midwest', 'hawaii',
      'alaska', 'soul_food', 'bbq', 'native_american',
    ]),
    canadian: new Set([
      'pan_canadian', 'quebec', 'ontario', 'british_columbia', 'prairies',
      'atlantic_canada', 'northern_canada', 'indigenous_canada',
    ]),
         australasian: new Set([
           'pan_australasian', 'nsw', 'victoria', 'queensland', 'western_australia',
           'south_australia', 'tasmania', 'northern_territory', 'auckland', 'wellington',
           'canterbury', 'otago', 'maori'],
         ),
         british: new Set([
           'pan_british', 'london', 'south_east', 'south_west', 'east_anglia',
           'midlands', 'north_west', 'yorkshire', 'north_east',
           'lowlands', 'highlands', 'wales', 'ulster'],
         ),
         // The German card counts its own region-tagged rows across all 13 anchors.
         // asian_shared is deliberately absent, matching the Korean/Taiwan treatment -
         // the Germany pass kept asian_shared at 0.
         german: new Set([
           'pan_german', 'bavaria', 'berlin', 'hamburg', 'hesse', 'rhineland',
           'saxony', 'lower_saxony', 'thuringia', 'brandenburg',
'baden_wurttemberg', 'saarland', 'bremen'],
          ),
           swiss: new Set([
             'pan_swiss', 'zurich', 'bern', 'geneva', 'lucerne', 'basel', 'lausanne',
             'ticino', 'valais', 'grisons', 'vaud', 'aargau', 'st_gallen'],
           ),
            austrian: new Set([
              'pan_austrian', 'vienna', 'tyrol', 'salzburg', 'styria', 'carinthia',
              'upper_austria', 'lower_austria', 'burgenland', 'vorarlberg',
            ]),
            french: new Set([
              'pan_french', 'paris', 'normandy', 'provence', 'lyon', 'bordeaux',
              'alsace', 'brittany', 'burgundy', 'toulouse', 'marseille', 'loire', 'corsica',
            ]),
            benelux: new Set([
              'pan_benelux', 'brussels', 'flanders', 'wallonia', 'antwerp',
              'amsterdam', 'rotterdam', 'hague', 'utrecht', 'holland_north',
              'luxembourg_city', 'luxembourg_south', 'ardennes',
            ]),
            italian: new Set([
              'pan_italian', 'rome', 'milan', 'naples', 'sicily', 'tuscany',
              'venice', 'florence', 'bologna', 'turin', 'genoa', 'sardinia',
              'puglia',
            ]),
            spanish: new Set([
              'pan_spanish', 'madrid', 'barcelona', 'valencia', 'seville',
              'basque', 'galicia', 'andalusia', 'castile', 'aragon', 'catalonia',
              'canary_islands', 'balearic',
            ]),
            greek: new Set([
              'pan_greek', 'athens', 'thessaloniki', 'crete', 'santorini',
              'mykonos', 'corfu', 'rhodes', 'peloponnese', 'epirus', 'macedonia_gr',
            ]),
            turkish: new Set([
              'pan_turkish', 'istanbul', 'ankara', 'izmir', 'bursa', 'antalya',
              'gaziantep', 'konya', 'adana', 'trabzon', 'diyarbakir', 'kayseri',
              'mardin', 'sanliurfa', 'van', 'eskisehir',
            ]),
            // Nordic + Ukraine kitchens: the src/data/<country>-full.ts files carry a
// pan_<demonym> row plus nine regional anchors each, so the family sets must
// list all ten or useKitchenDishes drops the anchors from the live pool.
            norwegian: new Set([
              'pan_norwegian', 'oslo', 'bergen', 'stavanger', 'trondheim',
              'tromso', 'bodo', 'alesund', 'lofoten', 'kristiansand',
            ]),
            swedish: new Set([
              'pan_swedish', 'stockholm', 'gothenburg', 'malmo', 'uppsala',
              'visby', 'orebro', 'linkoping', 'umea', 'kiruna',
            ]),
            danish: new Set([
              'pan_danish', 'copenhagen', 'aarhus', 'odense', 'aalborg',
              'roskilde', 'helsingor', 'esbjerg', 'skagen', 'ronne',
            ]),
            finnish: new Set([
              'pan_finnish', 'helsinki', 'tampere', 'turku', 'oulu',
              'jyvaskyla', 'kuopio', 'rovaniemi', 'vaasa', 'pori',
            ]),
            ukrainian: new Set([
              'pan_ukrainian', 'kyiv', 'lviv', 'odesa', 'kharkiv',
              'dnipro', 'chernihiv', 'poltava', 'vinnytsia', 'zaporizhzhia',
            ]),
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
     // Thai family: own pan_thai + regional anchors (Bangkok, Chiang Mai, Isan,
     // Hua Hin, Pattaya, Phuket, Songkhla, Krabi) + the shared Asian pool. Names
     // carry تايلندي (base rows) and تايلندي أصيل (expansion rows) which now
     // map to 'pan_thai'.
     thai: new Set([
       'pan_thai', 'asian_shared', 'bangkok', 'chiang_mai', 'isan', 'hua_hin', 'pattaya',
       'phuket', 'songkhla', 'krabi',
     ]),
     // Vietnamese family: own pan_vietnamese + the shared Asian pool. Names
     // carry فيتنامي (base rows) and فيتنامي أصيل (expansion rows) which now
     // map to 'pan_vietnamese'.
vietnamese: new Set([
        'pan_vietnamese', 'asian_shared',
      ]),
      japanese: new Set([
        'pan_japanese', 'tokyo', 'osaka', 'kyoto', 'hokkaido', 'fukuoka', 'sapporo',
        'sendai', 'nagoya',
      ]),
     // Chinese family: own pan_chinese + the shared Asian pool. Names
     // carry صيني (base rows) and صيني أصيل (expansion rows) which now
     // map to 'pan_chinese'.
      chinese: new Set([
        'pan_chinese', 'asian_shared',
      ]),
      // Korean family: own pan_korean + regional anchors (Seoul, Busan, Jeju, Jeonju,
      // Andong, Goryeong, Gangneung, Incheon, Daegu, Gwangju, Daejeon, Ulsan, Suwon,
      // Chuncheon, Mokpo, Yeosu, Pohang, Gyeongju, Tongyeong, Sunchang, Boseong, Namhae).
      // asian_shared is included for future rows but currently holds 0 Korean dishes.
      // Names carry كوري (base rows) and كوري أصيل (expansion rows), which both now
      // map to 'pan_korean'.
      korean: new Set([
        'pan_korean', 'asian_shared', 'seoul', 'busan', 'jeju', 'jeonju', 'andong',
        'goryeong', 'gangneung', 'incheon', 'daegu', 'gwangju', 'daejeon', 'ulsan',
        'suwon', 'chuncheon', 'mokpo', 'yeosu', 'pohang', 'gyeongju', 'tongyeong',
         'sunchang', 'boseong', 'namhae',
       ]),
      // Taiwan family: own pan_taiwanese + all 12 regional anchors (Taipei, Tainan,
      // Taichung, Kaohsiung, Hsinchu, Hualien, Taitung, Keelung, Chiayi, Nantou,
      // Yilan, Pingtung). asian_shared is included for future rows but currently
      // holds 0 Taiwan dishes. Names carry تايوان (base) and تايوان أصيل (expansion),
      // both of which map to 'pan_taiwanese'.
      taiwanese: new Set([
        'pan_taiwanese', 'asian_shared', 'taipei', 'tainan', 'taichung', 'kaohsiung',
        'hsinchu', 'hualien', 'taitung', 'keelung', 'chiayi', 'nantou', 'yilan', 'pingtung',
      ]),
       american: new Set([
         'pan_american', 'new_england', 'mid_atlantic', 'south', 'deep_south', 'cajun',
         'texas', 'southwest', 'california', 'pacific_northwest', 'midwest', 'hawaii',
         'alaska', 'soul_food', 'bbq', 'native_american',
       ]),
        canadian: new Set([
          'pan_canadian', 'quebec', 'ontario', 'british_columbia', 'prairies',
          'atlantic_canada', 'northern_canada', 'indigenous_canada',
        ]),
         australasian: new Set([
           'pan_australasian', 'nsw', 'victoria', 'queensland', 'western_australia',
           'south_australia', 'tasmania', 'northern_territory', 'auckland', 'wellington',
           'canterbury', 'otago', 'maori'],
         ),
         british: new Set([
           'pan_british', 'london', 'south_east', 'south_west', 'east_anglia',
           'midlands', 'north_west', 'yorkshire', 'north_east',
           'lowlands', 'highlands', 'wales', 'ulster'],
         ),
         // German family: own pan_german + all 12 Laender anchors (Bavaria, Berlin,
         // Hamburg, Hesse, Rhineland, Saxony, Lower Saxony, Thuringia, Brandenburg,
         // Baden-Wuerttemberg, Saarland, Bremen). asian_shared is deliberately absent,
         // matching the Korean/Taiwan treatment - the Germany pass kept it at 0.
         german: new Set([
           'pan_german', 'bavaria', 'berlin', 'hamburg', 'hesse', 'rhineland',
           'saxony', 'lower_saxony', 'thuringia', 'brandenburg',
'baden_wurttemberg', 'saarland', 'bremen'],
          ),
           swiss: new Set([
             'pan_swiss', 'zurich', 'bern', 'geneva', 'lucerne', 'basel', 'lausanne',
             'ticino', 'valais', 'grisons', 'vaud', 'aargau', 'st_gallen'],
           ),
            austrian: new Set([
              'pan_austrian', 'vienna', 'tyrol', 'salzburg', 'styria', 'carinthia',
              'upper_austria', 'lower_austria', 'burgenland', 'vorarlberg',
            ]),
            french: new Set([
              'pan_french', 'paris', 'normandy', 'provence', 'lyon', 'bordeaux',
              'alsace', 'brittany', 'burgundy', 'toulouse', 'marseille', 'loire', 'corsica',
            ]),
            benelux: new Set([
              'pan_benelux', 'brussels', 'flanders', 'wallonia', 'antwerp',
              'amsterdam', 'rotterdam', 'hague', 'utrecht', 'holland_north',
              'luxembourg_city', 'luxembourg_south', 'ardennes',
            ]),
            italian: new Set([
              'pan_italian', 'rome', 'milan', 'naples', 'sicily', 'tuscany',
              'venice', 'florence', 'bologna', 'turin', 'genoa', 'sardinia',
              'puglia',
            ]),
            spanish: new Set([
              'pan_spanish', 'madrid', 'barcelona', 'valencia', 'seville',
              'basque', 'galicia', 'andalusia', 'castile', 'aragon', 'catalonia',
              'canary_islands', 'balearic',
            ]),
            greek: new Set([
              'pan_greek', 'athens', 'thessaloniki', 'crete', 'santorini',
              'mykonos', 'corfu', 'rhodes', 'peloponnese', 'epirus', 'macedonia_gr',
            ]),
            turkish: new Set([
              'pan_turkish', 'istanbul', 'ankara', 'izmir', 'bursa', 'antalya',
              'gaziantep', 'konya', 'adana', 'trabzon', 'diyarbakir', 'kayseri',
              'mardin', 'sanliurfa', 'van', 'eskisehir',
            ]),
            // NOTE: the Nordic + Ukraine kitchens (norwegian, swedish, danish,
            // finnish, ukrainian) are deliberately NOT listed here yet. They have
            // static src/data/<country>-full.ts files only, with no rows in the
            // live dishes table, so they resolve through the static registry path
            // in useKitchenDishes. Adding them here would make
            // scripts/test-multi-kitchen-generator.ts (which enumerates these keys
            // and asserts a non-empty live pool) fail. Add them together with the
            // corresponding Supabase rows.
     };

 // True when a dish may be served in the given kitchen's plans.
export function isAuthenticForKitchen(kitchenId: string, region: string | null | undefined, name: string | null | undefined): boolean {
  const fam = KITCHEN_REGION_FAMILIES[kitchenId];
  if (fam && region && !fam.has(region)) return false;
  if (kitchenId === 'saudi' && LEVANTINE_BARE.has(normalizeArabicName(name ?? ''))) return false;
  return !hasForeignNationalityFor(kitchenId, name);
}
