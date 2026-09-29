# South Korean Kitchen - Full 400-Dish Proposal (PREVIEW, NOT YET MIGRATED)

- **200 base (legacy) + 200 expansion = 400** dishes, each with Arabic / English / French / Spanish / German names.
- `cal_100` is **computed** as `round(4P + 4C + 9F)` in the generators, so the set is Atwater-consistent by construction (never hand-typed).
- Every Arabic name carries the **masculine** `كوري` token (base) / `كوري أصيل` (expansion) so the nationality guard in `src/utils/kitchenAuthenticity.ts` maps all 400 to `pan_korean`.
- **Halal: strictly no pork and no alcohol.** Traditional pork belly (삼겹살) and alcoholic soju/makgeolli were replaced with beef/chicken/seafood, beef broth, rice vinegar and pear juice.
- **Golden rule honoured:** whenever a regional attribution was uncertain the dish was tagged `pan_korean`.

## Region distribution

| region | rows |
| --- | ---: |
| pan_korean | 314 |
| busan | 24 |
| jeonju | 12 |
| seoul | 9 |
| mokpo | 6 |
| goryeong | 5 |
| gangneung | 4 |
| incheon | 3 |
| pohang | 3 |
| namhae | 3 |
| daegu | 3 |
| boseong | 3 |
| chuncheon | 2 |
| tongyeong | 2 |
| sunchang | 2 |
| jeju | 1 |
| daejeon | 1 |
| andong | 1 |
| yeosu | 1 |
| gwangju | 1 |

## Category distribution

| category | rows |
| --- | ---: |
| breakfast_items | 27 |
| rice_dishes | 40 |
| noodle_dishes | 40 |
| soups_stews | 40 |
| poultry_mains | 31 |
| meat_mains | 38 |
| fish_seafood | 38 |
| vegetable_mains | 36 |
| street_snacks | 34 |
| rice_cakes_sweets | 30 |
| condiments_sauces | 20 |
| beverages | 26 |

## breakfast_items (27)

| # | set | Arabic name | English name | region | meal | kcal | P | C | F |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| 1 | base | غوكباب لحم البقر كوري | Beef gukbap rice soup | pan_korean | breakfast | 201 | 9 | 30 | 5 |
| 2 | base | ميوكوك لحم البقر كوري | Beef seaweed soup | pan_korean | breakfast | 112 | 11 | 8 | 4 |
| 3 | base | كونغنامول غو لحم البقر كوري | Beef soybean sprout soup | pan_korean | breakfast | 103 | 10 | 9 | 3 |
| 4 | base | سوبيان غوك كوري | Soybean paste soup | pan_korean | breakfast | 87 | 6 | 9 | 3 |
| 5 | base | جيدان جام كوري | Steamed egg custard | pan_korean | breakfast | 127 | 12 | 4 | 7 |
| 6 | base | غيدران ماري كوري | Rolled Korean omelette | pan_korean | breakfast | 145 | 13 | 3 | 9 |
| 7 | base | غيدران فري كوري | Korean fried eggs | pan_korean | breakfast | 146 | 13 | 1 | 10 |
| 8 | base | سوجام باب كوري | Salted steamed rice | pan_korean | breakfast | 145 | 4 | 30 | 1 |
| 9 | base | جوك لحم البقر كوري | Beef rice porridge | pan_korean | breakfast | 152 | 7 | 22 | 4 |
| 10 | base | توست بالبيض كوري | Korean egg toast | pan_korean | breakfast | 188 | 9 | 20 | 8 |
| 11 | base | جوموك باب كوري | Korean breakfast rice ball | pan_korean | breakfast | 197 | 8 | 30 | 5 |
| 12 | base | كيمباب كوري | Kimbap breakfast roll | pan_korean | breakfast | 198 | 8 | 28 | 6 |
| 13 | base | سيغومتشي نامول كوري | Blanched spinach | pan_korean | breakfast | 41 | 4 | 4 | 1 |
| 14 | base | كونغنامول كوري | Seasoned soybean sprouts | pan_korean | breakfast | 70 | 5 | 8 | 2 |
| 15 | base | دولغا جوك كوري | Sesame rice porridge | pan_korean | breakfast | 170 | 5 | 24 | 6 |
| 16 | exp | عصيدة الأرز بالفولك كوري أصيل | Abalone rice porridge | jeju | breakfast | 106 | 8 | 14 | 2 |
| 17 | exp | عصيدة الدجاج بالجينسنغ كوري أصيل | Ginseng chicken rice porridge | pan_korean | breakfast | 127 | 12 | 13 | 3 |
| 18 | exp | عصيدة اليقطين كوري أصيل | Pumpkin rice porridge | pan_korean | breakfast | 101 | 3 | 20 | 1 |
| 19 | exp | عصيدة الفاصولياء الحمراء كوري أصيل | Red bean rice porridge | pan_korean | breakfast | 113 | 4 | 22 | 1 |
| 20 | exp | حساء التوفو الحريري بالفطور كوري أصيل | Soft tofu breakfast stew | pan_korean | breakfast | 118 | 10 | 6 | 6 |
| 21 | exp | ماكريل مشوي مع الأرز كوري أصيل | Grilled mackerel with rice | busan | breakfast | 216 | 18 | 18 | 8 |
| 22 | exp | كسترد البيض المطهو بالبخار كوري أصيل | Gyeranjjim steamed egg custard | pan_korean | breakfast | 102 | 9 | 3 | 6 |
| 23 | exp | حساء براعم الصويا مع الأرز كوري أصيل | Soybean sprout hangover soup with rice | jeonju | breakfast | 119 | 7 | 16 | 3 |
| 24 | exp | حساء سمك القد المجفف مع الأرز كوري أصيل | Dried pollack soup with rice | gangneung | breakfast | 122 | 14 | 12 | 2 |
| 25 | exp | حساء الأعشاب البحرية باللحم والأرز كوري أصيل | Seaweed soup with beef and rice | busan | breakfast | 149 | 12 | 14 | 5 |
| 26 | exp | حساء عظام البقر مع الأرز كوري أصيل | Beef bone soup with rice | seoul | breakfast | 180 | 15 | 12 | 8 |
| 27 | exp | توفو مقلي بصلصة الصويا كوري أصيل | Pan-fried tofu with soy | pan_korean | breakfast | 136 | 11 | 5 | 8 |

## rice_dishes (40)

| # | set | Arabic name | English name | region | meal | kcal | P | C | F |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| 28 | base | بيبارباب كوري | Bibimbap | pan_korean | lunch | 319 | 13 | 42 | 11 |
| 29 | base | بولوغوجي لحم البقر كوري | Beef bulgogi | pan_korean | lunch | 292 | 22 | 24 | 12 |
| 30 | base | تشادول باغي كوري | Diced beef rice bowl | pan_korean | lunch | 273 | 20 | 28 | 9 |
| 31 | base | كيمتشي بوكمباب كوري | Kimchi fried rice | pan_korean | lunch | 252 | 9 | 36 | 8 |
| 32 | base | داك بوكمباب كوري | Chicken fried rice | pan_korean | lunch | 269 | 14 | 33 | 9 |
| 33 | base | ساوي بوكمباب كوري | Shrimp fried rice | pan_korean | lunch | 252 | 13 | 32 | 8 |
| 34 | base | سوجوجي نامول باب كوري | Beef and vegetable rice bowl | pan_korean | lunch | 271 | 18 | 34 | 7 |
| 35 | base | كودورو جوريم كوري | Braised mackerel with rice | pan_korean | dinner | 283 | 20 | 26 | 11 |
| 36 | base | غالتشي جوريم كوري | Braised hairtail with rice | pan_korean | dinner | 266 | 19 | 25 | 10 |
| 37 | base | جوجي بوكمباب كوري | Clam fried rice | pan_korean | lunch | 243 | 12 | 33 | 7 |
| 38 | base | بوسوت بوكمباب كوري | Mushroom fried rice | pan_korean | lunch | 222 | 7 | 35 | 6 |
| 39 | base | تشوتشي باب كوري | Japchae rice bowl | pan_korean | lunch | 289 | 12 | 40 | 9 |
| 40 | base | بولوغوجي بوسوت كوري | Mushroom bulgogi rice bowl | pan_korean | dinner | 290 | 20 | 30 | 10 |
| 41 | base | هايمول بيبارباب كوري | Seafood bibimbap | pan_korean | lunch | 312 | 20 | 40 | 8 |
| 42 | base | دوبو كيمتشي كوري | Braised tofu with kimchi | pan_korean | dinner | 172 | 13 | 12 | 8 |
| 43 | base | سوجوجي غوتشوجانغ باب كوري | Beef gochujang rice bowl | pan_korean | lunch | 294 | 21 | 30 | 10 |
| 44 | base | بوكم ميونتشي كوري | Stir-fried dried anchovies | pan_korean | side | 185 | 14 | 12 | 9 |
| 45 | base | هوانتاي تشاي بوكم كوري | Stir-fried salted pollock and vegetables | pan_korean | dinner | 204 | 18 | 15 | 8 |
| 46 | base | داك غوتشوجانغ باب كوري | Spicy chicken rice bowl | pan_korean | lunch | 298 | 23 | 29 | 10 |
| 47 | base | غالبي باب كوري | Short rib rice bowl | pan_korean | dinner | 316 | 22 | 30 | 12 |
| 48 | exp | بيبيمباب لحم البقر في جونجو كوري أصيل | Jeonju beef bibimbap | jeonju | lunch | 300 | 16 | 32 | 12 |
| 49 | exp | بيبيمباب القدر الحجري كوري أصيل | Stone pot bibimbap | jeonju | lunch | 300 | 15 | 33 | 12 |
| 50 | exp | بيبيمباب الخضار كوري أصيل | Vegetable bibimbap | jeonju | lunch | 260 | 9 | 38 | 8 |
| 51 | exp | بيبيمباب الأعشاب البرية كوري أصيل | Wild herb bibimbap | goryeong | lunch | 265 | 10 | 36 | 9 |
| 52 | exp | وعاء أرز الأخطبوط الحار كوري أصيل | Spicy octopus rice bowl | busan | lunch | 264 | 18 | 30 | 8 |
| 53 | exp | أرز الكيمتشي المقلي الحار كوري أصيل | Spicy kimchi fried rice | pan_korean | lunch | 275 | 8 | 36 | 11 |
| 54 | exp | أرز الجمبري المقلي بالثوم كوري أصيل | Garlic shrimp fried rice | incheon | lunch | 277 | 15 | 34 | 9 |
| 55 | exp | وعاء أرز بولغوغي كوري أصيل | Bulgogi rice bowl | seoul | lunch | 317 | 20 | 30 | 13 |
| 56 | exp | وعاء أرز داكغالبي كوري أصيل | Dakgalbi rice bowl | chuncheon | lunch | 299 | 19 | 31 | 11 |
| 57 | exp | وعاء أرز التونة بالكيمتشي كوري أصيل | Tuna kimchi rice bowl | pan_korean | lunch | 282 | 17 | 31 | 10 |
| 58 | exp | وعاء أرز البيض كوري أصيل | Egg rice bowl | pan_korean | lunch | 261 | 11 | 34 | 9 |
| 59 | exp | وعاء أرز الأنشوجة كوري أصيل | Anchovy rice bowl | busan | lunch | 247 | 13 | 33 | 7 |
| 60 | exp | أرز السلطعون بصلصة الصويا كوري أصيل | Soy crab rice | pan_korean | lunch | 242 | 19 | 28 | 6 |
| 61 | exp | أرز براعم الصويا كوري أصيل | Soybean sprout rice | jeonju | lunch | 230 | 9 | 35 | 6 |
| 62 | exp | أرز الشعير المخلوط كوري أصيل | Barley mixed rice | pan_korean | lunch | 199 | 7 | 36 | 3 |
| 63 | exp | أرز الفجل كوري أصيل | Radish rice | pan_korean | lunch | 196 | 6 | 34 | 4 |
| 64 | exp | أرز اللحم المفروم كوري أصيل | Minced beef rice | pan_korean | lunch | 300 | 16 | 32 | 12 |
| 65 | exp | أرز المحار كوري أصيل | Oyster rice | tongyeong | lunch | 233 | 14 | 33 | 5 |
| 66 | exp | أرز الفطر كوري أصيل | Mushroom rice | pan_korean | lunch | 217 | 8 | 35 | 5 |
| 67 | exp | أرز الكراث البري كوري أصيل | Wild chive rice | goryeong | lunch | 217 | 7 | 36 | 5 |

## noodle_dishes (40)

| # | set | Arabic name | English name | region | meal | kcal | P | C | F |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| 68 | base | جاجانغميون لحم البقر كوري | Beef jajangmyeon | pan_korean | lunch | 354 | 14 | 52 | 10 |
| 69 | base | جامبونغ كوري | Spicy seafood jjamppong | pan_korean | lunch | 337 | 18 | 46 | 9 |
| 70 | base | كالغوكسو كوري | Kalguksu knife-cut noodles | pan_korean | lunch | 315 | 15 | 48 | 7 |
| 71 | base | بيبيم غوكسو كوري | Spicy bibim guksu | pan_korean | lunch | 324 | 13 | 50 | 8 |
| 72 | base | كونغغوكسو كوري | Soy milk kongguksu | pan_korean | breakfast | 270 | 10 | 44 | 6 |
| 73 | base | سالغوكسو كوري | Sallguksu rice noodles | pan_korean | lunch | 289 | 11 | 50 | 5 |
| 74 | base | بوكم غوكسو كوري | Stir-fried noodles | pan_korean | lunch | 341 | 13 | 52 | 9 |
| 75 | base | كامجاغوكسو كوري | Potato starch noodles | pan_korean | lunch | 273 | 4 | 62 | 1 |
| 76 | base | ياتشي غوكسو كوري | Vegetable noodles | pan_korean | lunch | 285 | 10 | 50 | 5 |
| 77 | base | هايمول غوكسو كوري | Seafood noodles | pan_korean | lunch | 324 | 17 | 46 | 8 |
| 78 | base | نينغميون كوري | Naengmyeon cold buckwheat noodles | pan_korean | lunch | 284 | 12 | 50 | 4 |
| 79 | base | تشيوتشي كوري | Japchae glass noodles | pan_korean | lunch | 288 | 10 | 44 | 8 |
| 80 | base | كيمتشي غوكسو كوري | Kimchi noodles | pan_korean | lunch | 294 | 10 | 50 | 6 |
| 81 | base | أوموك غوكسو كوري | Eomuk fish cake noodles | pan_korean | lunch | 306 | 15 | 48 | 6 |
| 82 | base | ونمين كوري | Onmen wheat noodle soup | pan_korean | lunch | 281 | 13 | 46 | 5 |
| 83 | base | هوانتاي غوكسو كوري | Salted pollock noodle soup | pan_korean | dinner | 298 | 17 | 44 | 6 |
| 84 | base | ميميل غوكسو كوري | Buckwheat noodles | pan_korean | lunch | 284 | 12 | 50 | 4 |
| 85 | base | سوجوجي غوكسو كوري | Beef noodle soup | pan_korean | dinner | 303 | 16 | 44 | 7 |
| 86 | base | ساوي غوكسو كوري | Shrimp noodle soup | pan_korean | dinner | 303 | 16 | 44 | 7 |
| 87 | base | تشادول غوكسو كوري | Diced beef noodles | pan_korean | lunch | 324 | 15 | 48 | 8 |
| 88 | exp | شعيرية الأرز الباردة بالخل كوري أصيل | Vinegary cold noodles | pan_korean | lunch | 220 | 6 | 40 | 4 |
| 89 | exp | حساء الشعيرية البارد كوري أصيل | Mul naengmyeon cold noodle soup | pan_korean | lunch | 245 | 8 | 42 | 5 |
| 90 | exp | شعيرية الحنطة الحارة الباردة كوري أصيل | Bibim naengmyeon spicy cold noodles | pan_korean | lunch | 254 | 6 | 44 | 6 |
| 91 | exp | شعيرية الولائم كوري أصيل | Janchi guksu banquet noodles | pan_korean | lunch | 224 | 7 | 40 | 4 |
| 92 | exp | شعيرية الجيلاتين المطاطية كوري أصيل | Jjolmyeon chewy cold noodles | pan_korean | lunch | 245 | 5 | 45 | 5 |
| 93 | exp | شعيرية براعم الصويا كوري أصيل | Soybean sprout noodles | jeonju | lunch | 229 | 8 | 38 | 5 |
| 94 | exp | شعيرية سمك القد المجفف كوري أصيل | Dried pollack noodles | gangneung | lunch | 224 | 11 | 36 | 4 |
| 95 | exp | شعيرية الدجاج المقطعة كوري أصيل | Chicken knife-cut noodles | pan_korean | lunch | 263 | 14 | 36 | 7 |
| 96 | exp | شعيرية المحار المقطعة كوري أصيل | Clam knife-cut noodles | tongyeong | lunch | 241 | 12 | 37 | 5 |
| 97 | exp | شعيرية القمح المطاطية كوري أصيل | Wheat noodles | pan_korean | lunch | 231 | 7 | 44 | 3 |
| 98 | exp | شعيرية الكمثرى الباردة كوري أصيل | Pear cold noodles | pan_korean | lunch | 228 | 6 | 42 | 4 |
| 99 | exp | شعيرية السمسم الباردة كوري أصيل | Sesame cold noodles | pan_korean | lunch | 277 | 9 | 40 | 9 |
| 100 | exp | شعيرية الفلفل الباردة كوري أصيل | Spicy cold noodles | pan_korean | lunch | 245 | 7 | 43 | 5 |
| 101 | exp | حساء الشعيرية بالماكريل كوري أصيل | Mackerel noodle soup | busan | lunch | 263 | 16 | 34 | 7 |
| 102 | exp | حساء الشعيرية بلحم البقر كوري أصيل | Beef and leek noodle soup | seoul | lunch | 263 | 15 | 35 | 7 |
| 103 | exp | حساء الشعيرية بالمحار الأخضر كوري أصيل | Green mussel noodle soup | mokpo | lunch | 241 | 14 | 35 | 5 |
| 104 | exp | حساء الشعيرية بالفطر كوري أصيل | Mushroom noodle soup | pan_korean | lunch | 220 | 8 | 38 | 4 |
| 105 | exp | شعيرية الأرز الحارة كوري أصيل | Spicy rice noodles | pan_korean | lunch | 259 | 8 | 41 | 7 |
| 106 | exp | حساء العجين الممزق كوري أصيل | Hand-torn dough soup | pan_korean | lunch | 241 | 9 | 40 | 5 |
| 107 | exp | حساء الشعيرية بالجبن كوري أصيل | Cheese ramyeon noodles | pan_korean | lunch | 328 | 13 | 42 | 12 |

## soups_stews (40)

| # | set | Arabic name | English name | region | meal | kcal | P | C | F |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| 108 | base | كيمتشي جيجي لحم البقر كوري | Beef kimchi stew | pan_korean | dinner | 227 | 18 | 14 | 11 |
| 109 | base | دوجانج جيجي كوري | Soybean paste stew | pan_korean | dinner | 197 | 16 | 13 | 9 |
| 110 | base | سوندوبو جيجي كوري | Soft tofu stew | pan_korean | dinner | 189 | 15 | 12 | 9 |
| 111 | base | سوجوجي جونغول كوري | Beef jeongol stew | pan_korean | dinner | 261 | 20 | 16 | 13 |
| 112 | base | غالبي جوم كوري | Braised beef short ribs | pan_korean | dinner | 279 | 24 | 12 | 15 |
| 113 | base | داك بوكم تانغ كوري | Spicy braised chicken stew | pan_korean | dinner | 260 | 24 | 14 | 12 |
| 114 | base | هايمول جوم كوري | Stewed seafood | pan_korean | dinner | 217 | 22 | 12 | 9 |
| 115 | base | دونغتي جيجي كوري | Pollock stew | pan_korean | dinner | 200 | 19 | 13 | 8 |
| 116 | base | كيمتشي غوكي جيجي كوري | Spicy beef kimchi stew | pan_korean | dinner | 240 | 19 | 14 | 12 |
| 117 | base | ياتشي جونغول كوري | Vegetable jeongol stew | pan_korean | dinner | 192 | 12 | 18 | 8 |
| 118 | base | هايمول دوك بيجي كوري | Spicy seafood ttukbaegi | pan_korean | dinner | 230 | 21 | 14 | 10 |
| 119 | base | جوجي توك كوري | Steamed clams in broth | pan_korean | dinner | 145 | 17 | 8 | 5 |
| 120 | base | جوجي دوبو كوري | Clam and tofu stew | pan_korean | dinner | 175 | 17 | 11 | 7 |
| 121 | base | تشاي جانغ كوري | Glass noodle stew | pan_korean | dinner | 191 | 14 | 18 | 7 |
| 122 | base | بيوتشو جيجي كوري | Napa cabbage stew | pan_korean | dinner | 184 | 13 | 15 | 8 |
| 123 | base | مو جيجي كوري | Radish stew | pan_korean | dinner | 167 | 12 | 14 | 7 |
| 124 | base | كونغغي جيجي كوري | Bean sprout stew | pan_korean | dinner | 171 | 14 | 13 | 7 |
| 125 | base | دويسوب غوك كوري | Perilla leaf soup | pan_korean | dinner | 113 | 9 | 8 | 5 |
| 126 | base | سوجوجي مو كوري | Beef and radish soup | pan_korean | dinner | 162 | 17 | 10 | 6 |
| 127 | base | هايمول دوجانغ كوري | Seafood soybean paste stew | pan_korean | dinner | 192 | 18 | 12 | 8 |
| 128 | exp | حساء ضلع البقر كوري أصيل | Beef short rib soup | seoul | dinner | 202 | 22 | 6 | 10 |
| 129 | exp | حساء عظام البقر الأبيض كوري أصيل | Ox bone soup | pan_korean | dinner | 181 | 20 | 5 | 9 |
| 130 | exp | حساء صدر البقر كوري أصيل | Beef brisket soup | pan_korean | dinner | 186 | 19 | 5 | 10 |
| 131 | exp | حساء البقر الحار بالكراث كوري أصيل | Spicy beef and leek soup | pan_korean | dinner | 177 | 17 | 7 | 9 |
| 132 | exp | حساء دجاج الجينسنغ كوري أصيل | Samgyetang ginseng chicken stew | pan_korean | dinner | 236 | 24 | 8 | 12 |
| 133 | exp | حساء عظام الدجاج كوري أصيل | Chicken bone soup | pan_korean | dinner | 164 | 18 | 5 | 8 |
| 134 | exp | حساء كعك الأرز كوري أصيل | Rice cake soup | pan_korean | dinner | 189 | 10 | 26 | 5 |
| 135 | exp | حساء الزلابية كوري أصيل | Dumpling soup | pan_korean | dinner | 216 | 12 | 24 | 8 |
| 136 | exp | حساء الأعشاب البحرية كوري أصيل | Seaweed soup | busan | dinner | 84 | 6 | 6 | 4 |
| 137 | exp | حساء براعم الصويا الحار كوري أصيل | Spicy soybean sprout soup | jeonju | dinner | 100 | 7 | 9 | 4 |
| 138 | exp | حساء القد المجفف كوري أصيل | Dried pollack soup | gangneung | dinner | 103 | 14 | 5 | 3 |
| 139 | exp | حساء المحار الصغير كوري أصيل | Small clam soup | mokpo | dinner | 95 | 11 | 6 | 3 |
| 140 | exp | يخنة السمك الحارة كوري أصيل | Spicy fish stew | busan | dinner | 167 | 18 | 8 | 7 |
| 141 | exp | حساء بيض القد كوري أصيل | Pollack roe soup | pohang | dinner | 143 | 15 | 5 | 7 |
| 142 | exp | حساء سمك اللوش كوري أصيل | Loach soup | namhae | dinner | 152 | 14 | 6 | 8 |
| 143 | exp | حساء عمود البقر بالبطاطس كوري أصيل | Beef spine and potato soup | daejeon | dinner | 244 | 20 | 14 | 12 |
| 144 | exp | حساء علاج الإدمان كوري أصيل | Hangover beef soup | seoul | dinner | 190 | 17 | 8 | 10 |
| 145 | exp | حساء الدجاج الحار كوري أصيل | Spicy chicken soup | daegu | dinner | 189 | 18 | 9 | 9 |
| 146 | exp | حساء كرشة البقر كوري أصيل | Beef tripe soup | pan_korean | dinner | 199 | 19 | 6 | 11 |
| 147 | exp | يخنة بلح البحر كوري أصيل | Mussel stew | pohang | dinner | 149 | 16 | 10 | 5 |

## poultry_mains (31)

| # | set | Arabic name | English name | region | meal | kcal | P | C | F |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| 148 | base | داكغالبي كوري | Dakgalbi spicy marinated chicken | pan_korean | dinner | 256 | 25 | 12 | 12 |
| 149 | base | داك بولوغوجي كوري | Chicken bulgogi | pan_korean | dinner | 239 | 25 | 10 | 11 |
| 150 | base | دجاج كانغ مقلي كوري | Korean fried chicken | pan_korean | dinner | 282 | 25 | 14 | 14 |
| 151 | base | دالدوري تانغ كوري | Daldori-tang pine nut chicken soup | pan_korean | dinner | 232 | 22 | 9 | 12 |
| 152 | base | داكجون كوري | Crispy fried chicken patty | pan_korean | dinner | 249 | 20 | 13 | 13 |
| 153 | base | يانيوم تشيكين كوري | Marinated soy chicken | pan_korean | dinner | 239 | 24 | 11 | 11 |
| 154 | base | غان جانغ داكغالبي كوري | Soy-marinated chicken galbi | pan_korean | dinner | 239 | 26 | 9 | 11 |
| 155 | base | داك غوي كوري | Grilled chicken | pan_korean | dinner | 211 | 26 | 2 | 11 |
| 156 | base | تشي سامغي تانغ كوري | Ginseng chicken soup | pan_korean | dinner | 219 | 22 | 8 | 11 |
| 157 | base | داك بوكم كوري | Spicy stir-fried chicken | pan_korean | dinner | 252 | 24 | 12 | 12 |
| 158 | base | تشيز داكغالبي كوري | Cheese-topped chicken galbi | pan_korean | dinner | 270 | 25 | 11 | 14 |
| 159 | base | داك غانغجونغ كوري | Sweet and spicy glazed chicken | pan_korean | dinner | 260 | 23 | 15 | 12 |
| 160 | base | ماون داكغالبي كوري | Extra spicy dakgalbi | pan_korean | dinner | 265 | 25 | 12 | 13 |
| 161 | base | داك بال كوري | Braised chicken feet | pan_korean | snacks | 228 | 20 | 10 | 12 |
| 162 | base | داك نوري كوري | Poached chicken breast | pan_korean | dinner | 193 | 26 | 2 | 9 |
| 163 | exp | دجاج أندونغ المطهو كوري أصيل | Andong braised chicken | andong | dinner | 213 | 21 | 12 | 9 |
| 164 | exp | دجاج مطهو بصلصة الصويا كوري أصيل | Soy braised chicken | pan_korean | dinner | 210 | 22 | 8 | 10 |
| 165 | exp | دجاج غالبي مع كعك الأرز كوري أصيل | Chicken galbi with rice cakes | chuncheon | dinner | 241 | 20 | 20 | 9 |
| 166 | exp | بولغوغي الدجاج بالجبن كوري أصيل | Cheese chicken bulgogi | pan_korean | dinner | 236 | 22 | 10 | 12 |
| 167 | exp | دجاج مشوي بالجينسنغ كوري أصيل | Ginseng roasted chicken | pan_korean | dinner | 219 | 24 | 6 | 11 |
| 168 | exp | دجاج مقلي بصلصة الصويا والثوم كوري أصيل | Soy garlic fried chicken | pan_korean | dinner | 287 | 20 | 18 | 15 |
| 169 | exp | دجاج مقلي بصلصة حارة كوري أصيل | Spicy glazed fried chicken | pan_korean | dinner | 300 | 19 | 20 | 16 |
| 170 | exp | أسياخ الدجاج المشوية كوري أصيل | Grilled chicken skewers | pan_korean | dinner | 202 | 23 | 5 | 10 |
| 171 | exp | يخنة الدجاج بالبطاطس كوري أصيل | Chicken and potato stew | pan_korean | dinner | 221 | 19 | 16 | 9 |
| 172 | exp | أقدام الدجاج الحارة كوري أصيل | Spicy chicken feet | daegu | snacks | 178 | 18 | 4 | 10 |
| 173 | exp | صدر الدجاج المدخن كوري أصيل | Smoked chicken breast | pan_korean | dinner | 161 | 26 | 3 | 5 |
| 174 | exp | كرات الدجاج على الأسياخ كوري أصيل | Chicken meatball skewers | pan_korean | dinner | 207 | 18 | 9 | 11 |
| 175 | exp | دجاج بالكاري كوري أصيل | Curry chicken | pan_korean | dinner | 218 | 20 | 12 | 10 |
| 176 | exp | إسكالوب الدجاج كوري أصيل | Chicken cutlet | pan_korean | dinner | 256 | 19 | 18 | 12 |
| 177 | exp | دجاج بصلصة الصويا اللامعة كوري أصيل | Soy glazed chicken | pan_korean | dinner | 222 | 21 | 12 | 10 |
| 178 | exp | دجاج بالعسل والزبدة كوري أصيل | Honey butter chicken | pan_korean | dinner | 286 | 18 | 22 | 14 |

## meat_mains (38)

| # | set | Arabic name | English name | region | meal | kcal | P | C | F |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| 179 | base | غالبي لحم البقر كوري | Grilled beef ribs | pan_korean | dinner | 268 | 26 | 5 | 16 |
| 180 | base | غان جانغ غالبي كوري | Soy-marinated beef ribs | pan_korean | dinner | 266 | 25 | 10 | 14 |
| 181 | base | شوت بول غالبي كوري | Charcoal-grilled beef ribs | pan_korean | dinner | 272 | 27 | 5 | 16 |
| 182 | base | إل إيه غالبي كوري | LA-style beef ribs | pan_korean | dinner | 287 | 26 | 12 | 15 |
| 183 | base | يانيوم غالبي كوري | Spicy marinated ribs | pan_korean | dinner | 270 | 25 | 11 | 14 |
| 184 | base | سوغاليبي سال كوري | Beef rib plate | pan_korean | dinner | 273 | 26 | 4 | 17 |
| 185 | base | غات سال كوري | Beef brisket plate | pan_korean | dinner | 260 | 25 | 4 | 16 |
| 186 | base | دوسيم كوري | Beef sirloin steak | pan_korean | dinner | 251 | 27 | 2 | 15 |
| 187 | base | جيه يوك لحم البقر كوري | Spicy stir-fried beef | pan_korean | dinner | 261 | 24 | 12 | 13 |
| 188 | base | يوكغي جانغ لحم البقر كوري | Beef yukgaejang soup | pan_korean | dinner | 211 | 20 | 8 | 11 |
| 189 | base | يوكهوي كوري | Yukhoe beef tartare | pan_korean | dinner | 221 | 22 | 4 | 13 |
| 190 | base | بوسوت سوجوجي كوري | Beef with mushrooms | pan_korean | dinner | 240 | 24 | 9 | 12 |
| 191 | base | غالبي سانتشي كوري | Ribs with mountain vegetables | pan_korean | dinner | 260 | 24 | 14 | 12 |
| 192 | base | سوجوجي بوكم كوري | Stir-fried beef | pan_korean | dinner | 257 | 25 | 10 | 13 |
| 193 | base | سوجوجي جيجي كوري | Beef stew | pan_korean | dinner | 248 | 23 | 12 | 12 |
| 194 | base | بوسوت جيجي كوري | Mushroom stew | pan_korean | dinner | 197 | 14 | 15 | 9 |
| 195 | base | سوجوجي كوتليت كوري | Beef cutlet | pan_korean | dinner | 252 | 24 | 12 | 12 |
| 196 | base | غالبي أفن كوري | Oven-baked beef ribs | pan_korean | dinner | 270 | 25 | 11 | 14 |
| 197 | exp | شرائح بولغوغي البقر كوري أصيل | Bulgogi beef slices | seoul | dinner | 237 | 22 | 8 | 13 |
| 198 | exp | بولغوغي البقر الحار كوري أصيل | Spicy beef bulgogi | pan_korean | dinner | 241 | 22 | 9 | 13 |
| 199 | exp | ضلوع البقر المطهوة كوري أصيل | Galbi jjim braised short ribs | seoul | dinner | 280 | 24 | 10 | 16 |
| 200 | exp | تارتار البقر بالكمثرى كوري أصيل | Beef tartare with Asian pear | seoul | dinner | 194 | 20 | 6 | 10 |
| 201 | exp | ستيك ضلع البقر كوري أصيل | Beef rib eye steak | pan_korean | dinner | 274 | 26 | 2 | 18 |
| 202 | exp | لسان البقر المشوي كوري أصيل | Grilled beef tongue | pan_korean | dinner | 222 | 21 | 3 | 14 |
| 203 | exp | لحم البقر المقلي بالخضار كوري أصيل | Stir-fried beef and vegetables | pan_korean | dinner | 227 | 20 | 12 | 11 |
| 204 | exp | جابتشاي البقر كوري أصيل | Beef japchae glass noodles | seoul | dinner | 241 | 16 | 24 | 9 |
| 205 | exp | البقر الحار مع الحبار كوري أصيل | Spicy stir-fried beef and squid | pan_korean | dinner | 232 | 22 | 9 | 12 |
| 206 | exp | أقراص لحم البقر كوري أصيل | Beef wanja patties | pan_korean | dinner | 221 | 18 | 8 | 13 |
| 207 | exp | كرات اللحم بصلصة الصويا كوري أصيل | Beef meatballs in soy | pan_korean | dinner | 233 | 19 | 10 | 13 |
| 208 | exp | قديد البقر كوري أصيل | Korean beef jerky | pan_korean | snacks | 226 | 35 | 8 | 6 |
| 209 | exp | البقر المطهو بصلصة الصويا كوري أصيل | Soy braised beef | pan_korean | dinner | 250 | 24 | 7 | 14 |
| 210 | exp | البقر المشوي بالثوم كوري أصيل | Grilled beef with garlic | pan_korean | dinner | 256 | 25 | 3 | 16 |
| 211 | exp | بولغوغي البقر بالفطر كوري أصيل | Beef bulgogi with mushrooms | pan_korean | dinner | 228 | 21 | 9 | 12 |
| 212 | exp | البقر المطهو مع الفجل كوري أصيل | Beef and radish braise | pan_korean | dinner | 237 | 22 | 8 | 13 |
| 213 | exp | ستيك أقراص البقر كوري أصيل | Beef patty steak | pan_korean | dinner | 265 | 23 | 5 | 17 |
| 214 | exp | البقر المشوي المتبل كوري أصيل | Grilled marinated beef | pan_korean | dinner | 255 | 24 | 6 | 15 |
| 215 | exp | يخنة البقر الحارة كوري أصيل | Spicy beef stew | pan_korean | dinner | 245 | 21 | 11 | 13 |
| 216 | exp | أسياخ البقر المشوية كوري أصيل | Beef skewers | pan_korean | dinner | 243 | 23 | 4 | 15 |

## fish_seafood (38)

| # | set | Arabic name | English name | region | meal | kcal | P | C | F |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| 217 | base | شوروبي كوري | Grilled mackerel | pan_korean | dinner | 230 | 22 | 4 | 14 |
| 218 | base | غالتشي غوي كوري | Grilled hairtail | pan_korean | dinner | 217 | 21 | 4 | 13 |
| 219 | base | كودورو غوي كوري | Grilled mackerel fillet | pan_korean | dinner | 226 | 22 | 3 | 14 |
| 220 | base | سامتشي غوي كوري | Grilled Spanish mackerel | pan_korean | dinner | 217 | 21 | 4 | 13 |
| 221 | base | ناكجي بوكم كوري | Stir-fried octopus | pan_korean | dinner | 201 | 20 | 10 | 9 |
| 222 | base | مونغو بوكم كوري | Stir-fried squid | pan_korean | dinner | 188 | 19 | 10 | 8 |
| 223 | base | هايمول بجن كوري | Seafood pancake | pan_korean | snacks | 241 | 14 | 26 | 9 |
| 224 | base | كيمتشي جون كوري | Kimchi pancake | pan_korean | snacks | 216 | 8 | 28 | 8 |
| 225 | base | هايمول بخار كوري | Steamed seafood | pan_korean | dinner | 201 | 22 | 8 | 9 |
| 226 | base | ساوي غوي كوري | Grilled prawns | pan_korean | dinner | 212 | 22 | 4 | 12 |
| 227 | base | ساوي بوكم كوري | Stir-fried prawns | pan_korean | dinner | 215 | 21 | 8 | 11 |
| 228 | base | أوجينغو بوكم كوري | Stir-fried small squid | pan_korean | dinner | 184 | 19 | 9 | 8 |
| 229 | base | جوجي غوي كوري | Grilled clams | pan_korean | dinner | 155 | 17 | 6 | 7 |
| 230 | base | هونغو غوي كوري | Grilled eel | pan_korean | dinner | 240 | 22 | 2 | 16 |
| 231 | base | غاداشي غوي كوري | Grilled Spanish mackerel fillet | pan_korean | dinner | 204 | 20 | 4 | 12 |
| 232 | base | سايونسون جوريم كوري | Braised fish with vegetables | pan_korean | dinner | 196 | 19 | 12 | 8 |
| 233 | base | أوموك بوكم كوري | Stir-fried fish cake | pan_korean | snacks | 192 | 14 | 16 | 8 |
| 234 | base | ميوك جوجي غوك كوري | Seaweed and clam soup | pan_korean | dinner | 141 | 14 | 10 | 5 |
| 235 | exp | ماكريل مشوي بالملح كوري أصيل | Salt-grilled mackerel | busan | dinner | 204 | 20 | 4 | 12 |
| 236 | exp | ماكريل مطهو كوري أصيل | Braised mackerel | yeosu | dinner | 225 | 21 | 6 | 13 |
| 237 | exp | سمك البوريان مشوي كوري أصيل | Grilled saury | pan_korean | dinner | 183 | 18 | 3 | 11 |
| 238 | exp | سمك الروبيان المشوي كوري أصيل | Grilled yellow croaker | mokpo | dinner | 178 | 19 | 3 | 10 |
| 239 | exp | سمك المسطوح المشوي كوري أصيل | Grilled flatfish | busan | dinner | 152 | 17 | 3 | 8 |
| 240 | exp | سمك الصخر المشوي كوري أصيل | Grilled rockfish | pohang | dinner | 160 | 19 | 3 | 8 |
| 241 | exp | سلطعون مبخر كوري أصيل | Steamed crab | pan_korean | dinner | 152 | 18 | 2 | 8 |
| 242 | exp | أخطبوط مطهو كوري أصيل | Braised octopus | busan | dinner | 189 | 21 | 6 | 9 |
| 243 | exp | أخطبوط مقلي حار كوري أصيل | Spicy stir-fried octopus | busan | dinner | 207 | 20 | 7 | 11 |
| 244 | exp | جمبري مشوي كوري أصيل | Grilled shrimp | incheon | dinner | 177 | 21 | 3 | 9 |
| 245 | exp | محار مشوي كوري أصيل | Grilled scallops | mokpo | dinner | 151 | 17 | 5 | 7 |
| 246 | exp | المحار المطهو كوري أصيل | Braised razor clams | namhae | dinner | 129 | 15 | 6 | 5 |
| 247 | exp | محار مقلي حار كوري أصيل | Spicy stir-fried razor clams | namhae | dinner | 151 | 15 | 7 | 7 |
| 248 | exp | حبار مشوي كوري أصيل | Grilled squid | pan_korean | dinner | 160 | 18 | 4 | 8 |
| 249 | exp | حبار مقلي حار كوري أصيل | Spicy stir-fried squid | busan | dinner | 186 | 18 | 6 | 10 |
| 250 | exp | انقليس مطهو كوري أصيل | Simmered eel | pan_korean | dinner | 244 | 22 | 3 | 16 |
| 251 | exp | سردين مشوي كوري أصيل | Grilled sardines | busan | dinner | 182 | 20 | 3 | 10 |
| 252 | exp | أخطبوط مبخر كوري أصيل | Steamed octopus | busan | dinner | 155 | 20 | 3 | 7 |
| 253 | exp | حساء السلطعون الحار كوري أصيل | Spicy crab soup | mokpo | dinner | 176 | 18 | 8 | 8 |
| 254 | exp | أنشوجة مشوية كوري أصيل | Grilled anchovies | busan | snacks | 199 | 22 | 3 | 11 |

## vegetable_mains (36)

| # | set | Arabic name | English name | region | meal | kcal | P | C | F |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| 255 | base | بيوك كيمتشي كوري | Napa cabbage kimchi | pan_korean | side | 53 | 2 | 9 | 1 |
| 256 | base | كاكدوكي كوري | Cubed radish kimchi | pan_korean | side | 49 | 2 | 8 | 1 |
| 257 | base | تشونغغاك كيمتشي كوري | Green radish kimchi | pan_korean | side | 53 | 2 | 9 | 1 |
| 258 | base | يولمو كيمتشي كوري | Young radish kimchi | pan_korean | side | 49 | 2 | 8 | 1 |
| 259 | base | أوي صوباكي كوري | Stuffed cucumber kimchi | pan_korean | side | 57 | 2 | 10 | 1 |
| 260 | base | دونغتشيمي كوري | Radish water kimchi | pan_korean | side | 36 | 2 | 7 | 0 |
| 261 | base | بوتشو كيمتشي كوري | Radish and cucumber kimchi | pan_korean | side | 53 | 2 | 9 | 1 |
| 262 | base | غوجي نامول كوري | Stir-fried eggplant | pan_korean | side | 84 | 2 | 10 | 4 |
| 263 | base | غامجا تيمغيم كوري | Sweet potato fritters | pan_korean | snacks | 210 | 4 | 26 | 10 |
| 264 | base | تانغسو غوي كوري | Roasted sweet potato | pan_korean | snacks | 113 | 2 | 24 | 1 |
| 265 | base | ياتشي تيمغيم كوري | Vegetable fritters | pan_korean | snacks | 227 | 6 | 26 | 11 |
| 266 | base | هوباك جون كوري | Zucchini pancake | pan_korean | snacks | 172 | 5 | 20 | 8 |
| 267 | base | بوسوت بوكم كوري | Stir-fried mushrooms | pan_korean | side | 102 | 4 | 8 | 6 |
| 268 | base | دوبو غوي كوري | Grilled tofu | pan_korean | side | 127 | 12 | 4 | 7 |
| 269 | base | نيوتاري بوسوت كوري | Enoki mushrooms | pan_korean | side | 53 | 4 | 7 | 1 |
| 270 | base | دوراجي موتشيم كوري | Seasoned bellflower root | pan_korean | side | 57 | 3 | 9 | 1 |
| 271 | base | غوصاري كوري | Seasoned fernbrake | pan_korean | side | 62 | 3 | 8 | 2 |
| 272 | base | مولغوكي كوري | Watercress salad | pan_korean | side | 41 | 4 | 4 | 1 |
| 273 | exp | كيمتشي اليقطين الشتوي كوري أصيل | Winter melon kimchi | pan_korean | side | 37 | 2 | 5 | 1 |
| 274 | exp | كيمتشي المورقوفليش كوري أصيل | Mustard leaf kimchi | sunchang | side | 37 | 2 | 5 | 1 |
| 275 | exp | كيمتشي الخيار كوري أصيل | Cucumber kimchi | jeonju | side | 37 | 2 | 5 | 1 |
| 276 | exp | كيمتشي البصل الأخضر كوري أصيل | Green onion kimchi | pan_korean | side | 33 | 2 | 4 | 1 |
| 277 | exp | كيمتشي الفجل بمحلول الملح كوري أصيل | Saltwater radish kimchi | pan_korean | side | 53 | 4 | 7 | 1 |
| 278 | exp | كيمتشي اليوسني كوري أصيل | Water spinach kimchi | sunchang | side | 41 | 3 | 5 | 1 |
| 279 | exp | كيمتشي براعم الفول كوري أصيل | Bean sprout kimchi | jeonju | side | 41 | 3 | 5 | 1 |
| 280 | exp | سلطة الأعشاب البحرية كوري أصيل | Seaweed salad | pan_korean | side | 71 | 3 | 8 | 3 |
| 281 | exp | سبانخ متبل كوري أصيل | Seasoned spinach | pan_korean | side | 63 | 4 | 5 | 3 |
| 282 | exp | فطر الملك المشوي كوري أصيل | Grilled king oyster mushroom | pan_korean | side | 80 | 3 | 8 | 4 |
| 283 | exp | كوسا مقلي كوري أصيل | Stir-fried zucchini | pan_korean | side | 85 | 2 | 8 | 5 |
| 284 | exp | باذنجان مطهو كوري أصيل | Braised eggplant | pan_korean | side | 101 | 2 | 12 | 5 |
| 285 | exp | أوراق البطاطا الحلوة المقلي كوري أصيل | Stir-fried sweet potato leaves | pan_korean | side | 88 | 4 | 9 | 4 |
| 286 | exp | الفصليص البري المقلي بالثوم كوري أصيل | Stir-fried bracken with garlic | jeonju | side | 75 | 4 | 8 | 3 |
| 287 | exp | أوراق السوسية المشوية كوري أصيل | Grilled perilla leaves | pan_korean | side | 88 | 5 | 8 | 4 |
| 288 | exp | جذر اللوتس المبخر كوري أصيل | Steamed lotus root | pan_korean | side | 93 | 3 | 18 | 1 |
| 289 | exp | التوفو المقلي كوري أصيل | Stir-fried tofu | pan_korean | side | 149 | 11 | 6 | 9 |
| 290 | exp | الخضار المسلوقة بالسمسم كوري أصيل | Boiled greens with sesame | pan_korean | side | 67 | 3 | 7 | 3 |

## street_snacks (34)

| # | set | Arabic name | English name | region | meal | kcal | P | C | F |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| 291 | base | توكبوكي لحم البقر كوري | Beef tteokbokki | pan_korean | lunch | 288 | 14 | 40 | 8 |
| 292 | base | توكبوكي لحم الدجاج كوري | Chicken tteokbokki | pan_korean | lunch | 292 | 15 | 40 | 8 |
| 293 | base | تشيز توكبوكي كوري | Cheese tteokbokki | pan_korean | lunch | 311 | 13 | 40 | 11 |
| 294 | base | سوسونداي لحم البقر كوري | Beef blood sausage | pan_korean | snacks | 200 | 15 | 8 | 12 |
| 295 | base | سوجوجي غوتشانغ كوري | Beef tripe skewers | pan_korean | snacks | 213 | 20 | 4 | 13 |
| 296 | base | مونغو كوتشي كوري | Octopus skewer | pan_korean | snacks | 176 | 18 | 8 | 8 |
| 297 | base | تاكوياكي كوري | Takoyaki octopus balls | pan_korean | snacks | 196 | 9 | 22 | 8 |
| 298 | base | أوجينغو تيمغيم كوري | Fried squid | pan_korean | snacks | 239 | 15 | 20 | 11 |
| 299 | base | كيم ماري كوري | Seaweed sweet potato roll | pan_korean | snacks | 203 | 5 | 30 | 7 |
| 300 | base | غيلريسي كيمباب كوري | Street kimbap roll | pan_korean | snacks | 219 | 9 | 30 | 7 |
| 301 | base | هوتوك كوري | Hotteok sweet pancake | pan_korean | snacks | 254 | 7 | 34 | 10 |
| 302 | base | سيوت هوتوك كوري | Sesame hotteok | pan_korean | snacks | 263 | 8 | 33 | 11 |
| 303 | base | بونغيبانغ كوري | Bungeoppang red bean fish cake | pan_korean | snacks | 228 | 7 | 32 | 8 |
| 304 | base | كوابيجي كوري | Kkwaebagi stuffed fried bread | pan_korean | snacks | 285 | 10 | 32 | 13 |
| 305 | base | يانغتوك كوري | Yangtteok rice skewer | pan_korean | snacks | 184 | 5 | 32 | 4 |
| 306 | base | مول ماندو كوري | Steamed dumplings | pan_korean | snacks | 185 | 9 | 26 | 5 |
| 307 | exp | تيكبوكي بالجبن الحار كوري أصيل | Spicy rice cake with cheese | pan_korean | snacks | 250 | 10 | 30 | 10 |
| 308 | exp | تيكبوكي مخبوز كوري أصيل | Baked tteokbokki | pan_korean | snacks | 249 | 10 | 32 | 9 |
| 309 | exp | تيكبوكي السلطعون كوري أصيل | Crab tteokbokki | incheon | snacks | 241 | 11 | 29 | 9 |
| 310 | exp | تيكبوكي بالشعيرية الفورية كوري أصيل | Spicy rice cake with instant noodles | pan_korean | snacks | 274 | 10 | 36 | 10 |
| 311 | exp | كورن دوج كوري أصيل | Korean corn dog | busan | snacks | 298 | 9 | 34 | 14 |
| 312 | exp | أسياخ أقدام الدجاج المقلي كوري أصيل | Fried chicken feet skewers | daegu | snacks | 234 | 19 | 8 | 14 |
| 313 | exp | أسياخ انقليس مشوية كوري أصيل | Grilled eel skewers | busan | snacks | 227 | 21 | 2 | 15 |
| 314 | exp | خبز الكيمتشي بالجبن كوري أصيل | Kimchi and cheese bread | pan_korean | snacks | 255 | 9 | 30 | 11 |
| 315 | exp | كعكة الدونوت بالسكر كوري أصيل | Sugar doughnut | busan | snacks | 318 | 6 | 42 | 14 |
| 316 | exp | تشيورو كوري أصيل | Korean churro | busan | snacks | 317 | 6 | 44 | 13 |
| 317 | exp | أسياخ البطاطا الحلوة المشوية كوري أصيل | Grilled sweet potato skewers | pan_korean | snacks | 117 | 3 | 24 | 1 |
| 318 | exp | فطيرة الشارع كوري أصيل | Street crepe | busan | snacks | 252 | 7 | 38 | 8 |
| 319 | exp | بطاطا مقرمشة بالملح كوري أصيل | Salted potato wedges | pan_korean | snacks | 197 | 3 | 26 | 9 |
| 320 | exp | عوامة السمك كوري أصيل | Fish cake stick | busan | snacks | 140 | 8 | 18 | 4 |
| 321 | exp | أسياخ المحار المشوية كوري أصيل | Grilled mussel skewers | mokpo | snacks | 143 | 16 | 4 | 7 |
| 322 | exp | أسياخ الحبار الحارة كوري أصيل | Spicy squid skewers | busan | snacks | 173 | 18 | 5 | 9 |
| 323 | exp | يخنة كعك الأرز بالزلابية كوري أصيل | Rice cake and dumpling hotpot | pan_korean | snacks | 237 | 11 | 28 | 9 |
| 324 | exp | خبز مشوي بالملح كوري أصيل | Salted grilled bread | pan_korean | snacks | 176 | 9 | 26 | 4 |

## rice_cakes_sweets (30)

| # | set | Arabic name | English name | region | meal | kcal | P | C | F |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| 325 | base | توك كوري | Plain steamed rice cake | pan_korean | snacks | 137 | 4 | 28 | 1 |
| 326 | base | تشابشال توك كوري | Glutinous rice cake | pan_korean | snacks | 145 | 4 | 30 | 1 |
| 327 | base | تشابشال أبوب كوري | Glutinous rice candy | pan_korean | snacks | 146 | 2 | 30 | 2 |
| 328 | base | مونغيونري توك كوري | Mungyeong rice cake | pan_korean | snacks | 162 | 6 | 30 | 2 |
| 329 | base | كول توك كوري | Honey rice cake | pan_korean | snacks | 162 | 4 | 32 | 2 |
| 330 | base | جابتوك كوري | Stuffed rice cake | pan_korean | snacks | 192 | 7 | 32 | 4 |
| 331 | base | سونغبيون كوري | Songpyeon rice cake | pan_korean | snacks | 158 | 5 | 30 | 2 |
| 332 | base | بوغي توك كوري | Bukkiteok rice cake | pan_korean | snacks | 158 | 5 | 30 | 2 |
| 333 | base | إنجول توك كوري | Injeolmi rice cake | pan_korean | snacks | 158 | 5 | 30 | 2 |
| 334 | base | يوت كوري | Yot Korean malt candy | pan_korean | snacks | 150 | 1 | 32 | 2 |
| 335 | base | يوغوا كوري | Yu-gwa candied nuts | pan_korean | snacks | 236 | 6 | 26 | 12 |
| 336 | base | ياغوا كوري | Yakgwa ginger candy | pan_korean | snacks | 182 | 2 | 30 | 6 |
| 337 | base | هيانغوا كوري | Hyangga jujube candy | pan_korean | snacks | 161 | 1 | 28 | 5 |
| 338 | base | سيكهي كوري | Sikhye sweet rice drink | pan_korean | snacks | 96 | 2 | 22 | 0 |
| 339 | base | ميشوت غارو كوري | Roasted grain drink | pan_korean | snacks | 114 | 4 | 20 | 2 |
| 340 | base | كودو توك كوري | Cut rice cake strip | pan_korean | snacks | 175 | 5 | 32 | 3 |
| 341 | exp | كعك الأرز المشوي كوري أصيل | Grilled rice cake stick | pan_korean | snacks | 126 | 5 | 22 | 2 |
| 342 | exp | كعك الأرز بالبطاطا الحلوة كوري أصيل | Sweet potato rice cake | pan_korean | snacks | 129 | 4 | 26 | 1 |
| 343 | exp | كعك الأرز بالأرز الأسود كوري أصيل | Black rice cake | goryeong | snacks | 121 | 4 | 24 | 1 |
| 344 | exp | كعك الأرز بعجينة الفاصولياء كوري أصيل | Red bean paste rice cake | pan_korean | snacks | 141 | 6 | 27 | 1 |
| 345 | exp | كعك الأرز بالفول السوداني كوري أصيل | Peanut rice cake | pan_korean | snacks | 177 | 7 | 26 | 5 |
| 346 | exp | كعك الأرز بالجوز كوري أصيل | Walnut rice cake | pan_korean | snacks | 178 | 6 | 25 | 6 |
| 347 | exp | كعك الأرز بالقرفة كوري أصيل | Cinnamon rice cake | pan_korean | snacks | 143 | 4 | 25 | 3 |
| 348 | exp | كعك الأرز باليقطين كوري أصيل | Pumpkin rice cake | pan_korean | snacks | 121 | 4 | 24 | 1 |
| 349 | exp | كعك الأرز ملفوف بالأعشاب كوري أصيل | Seaweed rice cake wrap | busan | snacks | 139 | 6 | 22 | 3 |
| 350 | exp | كعك الأرز بالسمسم كوري أصيل | Sesame rice cake | goryeong | snacks | 152 | 5 | 24 | 4 |
| 351 | exp | كعك الأرز بالعسل كوري أصيل | Honey glazed rice cake | goryeong | snacks | 138 | 4 | 26 | 2 |
| 352 | exp | كعك الأرز بمسحوق الفول كوري أصيل | Rice cake with bean powder | pan_korean | snacks | 164 | 7 | 25 | 4 |
| 353 | exp | كعك الأرز اللزج كوري أصيل | Chewy glutinous rice cake | pan_korean | snacks | 125 | 4 | 25 | 1 |
| 354 | exp | كعك الأرز بالسكر كوري أصيل | Sugar coated rice cake | pan_korean | snacks | 142 | 4 | 27 | 2 |

## condiments_sauces (20)

| # | set | Arabic name | English name | region | meal | kcal | P | C | F |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| 355 | base | سوجوجي سوس كوري | Soy-based dipping sauce | pan_korean | snacks | 82 | 6 | 10 | 2 |
| 356 | base | غوتشوجانغ كوري | Gochujang chili paste | pan_korean | snacks | 85 | 3 | 16 | 1 |
| 357 | base | دوجانج كوري | Doenjang soybean paste | pan_korean | snacks | 81 | 6 | 12 | 1 |
| 358 | base | غيان جانغ كوري | Ganjang soy sauce | pan_korean | snacks | 48 | 4 | 8 | 0 |
| 359 | base | بيجاز كوري | Vinegar dipping sauce | pan_korean | snacks | 28 | 1 | 6 | 0 |
| 360 | base | سوجوجي سوس حار كوري | Spicy soy dipping sauce | pan_korean | snacks | 82 | 5 | 11 | 2 |
| 361 | base | تشو تشو سوس كوري | Teochew-style soy vinegar sauce | pan_korean | snacks | 65 | 4 | 10 | 1 |
| 362 | base | فلفل حار سوس كوري | Hot pepper sauce | pan_korean | snacks | 49 | 2 | 8 | 1 |
| 363 | base | سمك سوس كوري | Fish-based dipping sauce | pan_korean | snacks | 86 | 8 | 9 | 2 |
| 364 | base | دولغا سوس كوري | Sesame dipping sauce | pan_korean | snacks | 102 | 4 | 8 | 6 |
| 365 | exp | صلصة السسام الحارة كوري أصيل | Ssamjang dipping paste | pan_korean | snacks | 116 | 8 | 12 | 4 |
| 366 | exp | صلصة الفول التخميرية الحارة كوري أصيل | Fermented soybean chili paste | jeonju | snacks | 111 | 7 | 14 | 3 |
| 367 | exp | صلصة الفلفل الحار التفتي كوري أصيل | Chili dipping sauce | pan_korean | snacks | 61 | 3 | 10 | 1 |
| 368 | exp | صلصة الخل الأسود كوري أصيل | Black vinegar sauce | pan_korean | snacks | 49 | 2 | 8 | 1 |
| 369 | exp | معجون الخردل كوري أصيل | Mustard paste | jeonju | snacks | 67 | 4 | 6 | 3 |
| 370 | exp | صلصة الثوم والفلفل كوري أصيل | Garlic and chili sauce | pan_korean | snacks | 45 | 2 | 7 | 1 |
| 371 | exp | صلصة زيت السمسم كوري أصيل | Sesame oil sauce | pan_korean | snacks | 96 | 2 | 4 | 8 |
| 372 | exp | صلصة التتبيل بالصويا كوري أصيل | Soy marinating sauce | pan_korean | snacks | 70 | 5 | 8 | 2 |
| 373 | exp | صلصة الخل بالبرقوق كوري أصيل | Plum vinegar sauce | gwangju | snacks | 49 | 1 | 9 | 1 |
| 374 | exp | صلصة الثوم المعمر كوري أصيل | Aged garlic sauce | pan_korean | snacks | 53 | 3 | 8 | 1 |

## beverages (26)

| # | set | Arabic name | English name | region | meal | kcal | P | C | F |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| 375 | base | بوريتشي كوري | Barley tea | pan_korean | snacks | 28 | 1 | 6 | 0 |
| 376 | base | غول ميونغ جاتشي كوري | Whole brown rice tea | pan_korean | snacks | 65 | 2 | 12 | 1 |
| 377 | base | أوكسونسوتشي كوري | Corn silk tea | pan_korean | snacks | 32 | 1 | 7 | 0 |
| 378 | base | إيمبي كوري | Ember roasted rice drink | pan_korean | snacks | 101 | 3 | 20 | 1 |
| 379 | base | سوبيان ميلك كوري | Soy milk | pan_korean | snacks | 76 | 5 | 5 | 4 |
| 380 | base | دوبيو ميلك كوري | Soft tofu milk | pan_korean | snacks | 63 | 4 | 5 | 3 |
| 381 | base | سوجوجي زنجبيل كوري | Ginger soy drink | pan_korean | snacks | 57 | 2 | 10 | 1 |
| 382 | base | أوريمي سول كوري | Rice fermentation water | pan_korean | snacks | 64 | 2 | 14 | 0 |
| 383 | base | تشا فا كوري | Sorghum tea | pan_korean | snacks | 36 | 1 | 8 | 0 |
| 384 | base | سوجوجي حلو كوري | Sweet soy milk drink | pan_korean | snacks | 104 | 5 | 12 | 4 |
| 385 | base | ميسوت ثوا كوري | Sweet barley drink | pan_korean | snacks | 93 | 3 | 18 | 1 |
| 386 | base | توك مقلول كوري | Roasted rice tea | pan_korean | snacks | 81 | 2 | 16 | 1 |
| 387 | base | مورو كوري | Brown rice vinegar drink | pan_korean | snacks | 40 | 1 | 9 | 0 |
| 388 | base | دولغا برو كوري | Roasted soybean drink | pan_korean | snacks | 114 | 4 | 20 | 2 |
| 389 | exp | شاي الشعير والأرز كوري أصيل | Roasted barley and rice tea | boseong | snacks | 65 | 2 | 12 | 1 |
| 390 | exp | شاي الأقحوان كوري أصيل | Chrysanthemum tea | pan_korean | snacks | 36 | 1 | 8 | 0 |
| 391 | exp | شاي الزنجبيل كوري أصيل | Ginger tea | pan_korean | snacks | 40 | 1 | 9 | 0 |
| 392 | exp | شاي التمر الجوجي كوري أصيل | Jujube tea | pan_korean | snacks | 48 | 1 | 11 | 0 |
| 393 | exp | شاي الذرة كوري أصيل | Corn tea | pan_korean | snacks | 57 | 2 | 10 | 1 |
| 394 | exp | ماء الشعربه كوري أصيل | Barley water | busan | snacks | 48 | 2 | 10 | 0 |
| 395 | exp | شاي الحنطة السوداء المبخر كوري أصيل | Steamed buckwheat tea | gangneung | snacks | 53 | 2 | 9 | 1 |
| 396 | exp | شاي ورقة الكاكا كوري أصيل | Persimmon leaf tea | boseong | snacks | 28 | 1 | 6 | 0 |
| 397 | exp | شاي إبرة الصنوبر كوري أصيل | Pine needle tea | boseong | snacks | 24 | 1 | 5 | 0 |
| 398 | exp | ماء العسل بالليمون كوري أصيل | Honey lemon water | pan_korean | snacks | 48 | 0 | 12 | 0 |
| 399 | exp | ماء الأرز بالعسل كوري أصيل | Rice water with honey | pan_korean | snacks | 56 | 1 | 13 | 0 |
| 400 | exp | شاي فول الصويا المثلج كوري أصيل | Iced soybean tea | pan_korean | snacks | 58 | 4 | 6 | 2 |

Total rows rendered: 400

---

**Nothing has been written to Supabase.** After approval the next steps are:
1. `migrate-korea-legacy.js` - insert the 200 base rows (region `pan_korean`, 100 g serving).
2. `migrate-korea.js` - insert the 200 expansion rows (regional tags, `asia-korea-2026` source).
3. Register `كوري` in `TOKEN_REGIONS` plus the `korean` entries in `KITCHEN_COUNT_REGIONS` / `KITCHEN_REGION_FAMILIES`.
4. Credit `asian_shared` rows via the `asia-korea-2026` source prefix in `useKitchenDishCounts` (no-op today: 0 asian_shared rows).
5. `npx tsc --noEmit`, `npm run test:kitchens`, `npm run build`, then commit and push.
