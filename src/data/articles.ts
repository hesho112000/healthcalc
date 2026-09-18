import type { Language } from '../types';

export type LangText = { en: string; ar: string };

export type ArticleCategory = 'diabetes' | 'heart' | 'nutrition' | 'lifestyle' | 'fitness';

export interface Article {
  id: string;
  slug: string;
  category: ArticleCategory;
  title: LangText;
  excerpt: LangText;
  content: LangText;
  takeaways: { en: string[]; ar: string[] };
  readTime: number;
  publishedAt: string;
  icon: string;
  tags: string[];
}

export const lt = (text: LangText, lang: Language): string =>
  text[lang as keyof LangText] ?? text.en;

const HBA1C: Article = {
  id: 'understanding-hba1c',
  slug: 'understanding-hba1c',
  category: 'diabetes',
  icon: '🩸',
  readTime: 6,
  publishedAt: '2026-01-15',
  tags: ['diabetes', 'labs', 'blood-sugar'],
  title: {
    en: 'Understanding Your HbA1c: A Complete Guide',
    ar: 'فهم تحليل HbA1c: الدليل الشامل',
  },
  excerpt: {
    en: 'What your HbA1c really means, why it matters, and how to move the number in the right direction.',
    ar: 'ماذا يعني HbA1c حقًا، ولماذا يهم، وكيف تحرك الرقم في الاتجاه الصحيح.',
  },
  content: {
    en: `## What Is HbA1c?

HbA1c (glycated hemoglobin) measures the average amount of glucose attached to your red blood cells over the past 8–12 weeks. Unlike a finger-stick test, which gives a single snapshot, HbA1c shows the bigger picture — how well your blood sugar has been controlled over time.

Hemoglobin is the protein inside red blood cells that carries oxygen. When glucose is present in your blood, it binds to hemoglobin. The more glucose you have circulating, the more hemoglobin becomes glycated. Since red blood cells live about 3 months, the HbA1c percentage reflects roughly a 3-month average.

## Why It Matters

Your HbA1c number is the single most important blood test for diagnosing and monitoring diabetes:

- Below 5.7% — normal range.
- 5.7–6.4% — prediabetes.
- 6.5% or higher — diabetes (confirmed on a second test).

Each percentage point you lower your HbA1c meaningfully reduces the risk of complications affecting your eyes, kidneys, and nerves. Even a 1% drop can make a visible difference in long-term health outcomes.

## How to Move the Number

Your HbA1c responds slowly but steadily to consistent habits:

- **Test regularly** — every 3–6 months as advised by your doctor.
- **Choose low-glycemic foods** — legumes, whole grains, vegetables, and lean proteins.
- **Move more** — 150 minutes of moderate activity weekly helps your body use insulin better.
- **Keep numbers together** — your doctor combines HbA1c with home glucose readings to adjust treatment.
- **Stay consistent** — daily habits beat dramatic short-term changes.

## What Can Fool the Result

Certain situations can make HbA1c less reliable: recent blood loss or transfusions, anemia, pregnancy, kidney disease, and some hemoglobin variants. If your result doesn't match your home readings, discuss this with your clinician.

## The Bottom Line

HbA1c is a powerful, evidence-based benchmark for your metabolic health. Pair it with regular glucose checks, a sustainable eating pattern, and activity you enjoy — and you give yourself the clearest picture of lasting control.`,
    ar: `## ما هو اختبار HbA1c؟

يقيس HbA1c (الهيموغلوبين السكري) متوسط كمية الجلوكوز المرتبطة بخلايا الدم الحمراء خلال آخر 8 إلى 12 أسبوعًا. وعلى عكس اختبار وخز الإصبع الذي يمنحك لقطة واحدة فقط، يُظهر HbA1c الصورة الكاملة — أي مدى جودة ضبط سكر الدم لديك عبر الزمن.

الهيموغلوبين بروتين موجود داخل خلايا الدم الحمراء ينقل الأكسجين. وعندما يوجد الجلوكوز في الدم، يرتبط بالهيموغلوبين. وكلما زاد الجلوكوز في مجرى الدم، أصبح المزيد من الهيموغلوبين سكريًا. وبما أن خلايا الدم الحمراء تعيش نحو ثلاثة أشهر، فإن نسبة HbA1c تعكس متوسطًا يمتد لحوالي ثلاثة أشهر.

## لماذا يهم هذا الاختبار؟

يُعد رقم HbA1c أهم فحص دم لتشخيص مرض السكري ومتابعته:

- أقل من 5.7% — نطاق طبيعي.
- من 5.7% إلى 6.4% — مرحلة ما قبل السكري.
- 6.5% أو أكثر — إصابة بالسكري (بعد تأكيد الفحص مرة ثانية).

كل نقطة مئوية تنزلها من HbA1c تُقلل بشكل ملموس من خطر المضاعفات التي تصيب العينين والكليتين والأعصاب. حتى انخفاض بنسبة 1% يمكن أن يُحدث فرقًا واضحًا في صحتك على المدى الطويل.

## كيف تحرّك الرقم؟

يستجيب HbA1c ببطء ولكنه ثبات للعادات الصحيحة:

- **افحص بانتظام** — كل 3 إلى 6 أشهر حسب توجيه طبيبك.
- **اختر الأطعمة منخفضة المؤشر السكري** — البقوليات والحبوب الكاملة والخضروات والبروتينات الخالية من الدهون.
- **تحرك أكثر** — 150 دقيقة من النشاط المعتدل أسبوعيًا تساعد جسمك على استخدام الأنسولين بشكل أفضل.
- **اجمع الأرقام معًا** — يجمع طبيبك HbA1c مع قراءات سكر المنزل لضبط العلاج.
- **كن ثابتًا** — العادات اليومية تتفوق على التغييرات المفاجئة قصيرة المدى.

## ما الذي قد يشوه النتيجة؟

بعض الحالات تجعل HbA1c أقل دقة: فقدان الدم أو نقل الدم مؤخرًا، فقر الدم، الحمل، أمراض الكلى، وبعض أنواع الهيموغلوبين المختلفة. إذا لم تتطابق نتيجتك مع قراءاتك المنزلية، ناقش الأمر مع طبيبك.

## الخلاصة

HbA1c معيار قوي قائم على الأدلة لصحتك الأيضية. اجمع بينه وبين الفحص المنتظم للسكر ونمط غذائي مستدام ونشاط تستمتع به — وتمنح نفسك أوضح صورة للسيطرة الدائمة.`,
  },
  takeaways: {
    en: [
      'HbA1c reflects your average blood sugar over the past 8–12 weeks, not just today\'s reading.',
      'Below 5.7% is normal; 6.5% or higher indicates diabetes.',
      'Lowering HbA1c by 1% significantly reduces the risk of complications.',
      'Test every 3–6 months and combine the result with home glucose readings.',
      'Some conditions — anemia, pregnancy, kidney disease — can skew the result.',
    ],
    ar: [
      'يعكس HbA1c متوسط سكر الدم خلال آخر 8 إلى 12 أسبوعًا، وليس قراءة اليوم فقط.',
      'أقل من 5.7% طبيعي، و6.5% أو أكثر يشير إلى الإصابة بالسكري.',
      'خفض HbA1c بنسبة 1% يقلل خطر المضاعفات بشكل كبير.',
      'افحص كل 3 إلى 6 أشهر واجمع النتيجة مع قراءات سكر المنزل.',
      'بعض الحالات — فقر الدم، الحمل، أمراض الكلى — قد تشوه النتيجة.',
    ],
  },
};

const BLOOD_PRESSURE_MYTHS: Article = {
  id: 'blood-pressure-myths',
  slug: 'blood-pressure-myths',
  category: 'heart',
  icon: '🫀',
  readTime: 7,
  publishedAt: '2026-01-22',
  tags: ['heart', 'blood-pressure', 'lifestyle'],
  title: {
    en: '5 Blood Pressure Myths You Should Stop Believing',
    ar: '5 خرافات عن ضغط الدم عليك التوقف عن تصديقها',
  },
  excerpt: {
    en: 'Separating fact from fiction about salt, stress, and your heart.',
    ar: 'نفصل الحقيقة عن الخيال حول الملح والتوتر وقلبك.',
  },
  content: {
    en: `## Myth 1: "High Blood Pressure Gives You Symptoms"

Most people with hypertension feel completely fine — that's what makes it dangerous. It rarely causes headaches, dizziness, or flushing until levels are dangerously high. The only reliable way to know your numbers is to measure them. If you're over 40, are overweight, or have a family history, check regularly at home or at your pharmacy.

## Myth 2: "Salt Alone Causes High Blood Pressure"

Salt matters, but it's not the whole story. Excess sodium makes your body retain fluid, raising pressure in those who are salt-sensitive. Yet calories, alcohol, inactivity, stress, and genetics play an equally big role. Cutting back on salt helps, but it works best alongside a balanced eating pattern, regular movement, and weight control.

## Myth 3: "I Can Stop My Medication Once My Numbers Drop"

Stopping abruptly can cause your pressure to rebound quickly, sometimes above where it started. Antihypertensives are usually prescribed to keep you in a healthy range — not to cure you. Never stop or adjust medication on your own. If you want to reduce it, work with your doctor on gradual changes while improving your lifestyle.

## Myth 4: "The Pharmacist's Reading Is Always Right"

A single high reading doesn't confirm hypertension. Blood pressure fluctuates with stress, caffeine, exercise, and even the time of day. Doctors typically confirm a diagnosis over several visits or with a 24-hour monitor. For home use, take two readings in the morning and two in the evening for a week, then bring the average to your appointment.

## Myth 5: "I'm Too Young to Worry About Blood Pressure"

Age is only one risk factor. A healthy-looking person in their 30s can still have elevated pressure, especially with weight gain, salty processed food, and stress. Early detection in younger adults prevents damage that silently accumulates for years. Get measured once a year, whatever your age.

## The Takeaway

Don't wait for symptoms — they may never come. Measure your blood pressure regularly, follow your doctor's plan, and keep building the small daily habits that protect your heart for decades.`,
    ar: `## خرافة 1: «ارتفاع ضغط الدم يسبب أعراضًا واضحة»

معظم المصابين بارتفاع ضغط الدم لا يشعرون بأي شيء — وهذا ما يجعله خطيرًا. نادرًا ما يسبب صداعًا أو دوارًا أو احمرارًا في الوجه إلا عندما ترتفع المستويات بشكل خطير. الطريقة الوحيدة الموثوقة لمعرفة أرقامك هي قياسها. إذا تجاوزت الأربعين، أو كنت تعاني زيادة الوزن، أو لديك تاريخ عائلي، فافحص بانتظام في المنزل أو لدى الصيدلية.

## خرافة 2: «الملح وحده يسبب ارتفاع ضغط الدم»

الملح مهم، لكنه ليس القصة كاملة. الإفراط في الصوديوم يجعل الجسم يحتفظ بالسوائل، مما يرفع الضغط لدى من هم حسّاسون للملح. لكن السعرات والكحول والخمول والتوتر والوراثة تلعب دورًا لا يقل أهمية. تقليل الملح يساعد، لكنه يعمل بشكل أفضل مع نمط غذائي متوازن ونشاط منتظم والتحكم في الوزن.

## خرافة 3: «يمكنني التوقف عن دوائي بمجرد انخفاض الأرقام»

التوقف المفاجئ قد يسبب عودة الضغط بسرعة، وأحيانًا أعلى من البداية. عادةً ما توصف أدوية الضغط لإبقائك ضمن نطاق صحي — وليست علاجًا نهائيًا. لا توقف أو تعدّل الدواء بنفسك أبدًا. إذا أردت تقليله، اعمل مع طبيبك على تغييرات تدريجية مع تحسين نمط حياتك.

## خرافة 4: «قراءة الصيدلي صحيحة دائمًا»

قراءة مرتفعة واحدة لا تؤكد الإصابة. يتقلب ضغط الدم مع التوتر والكافيين والتمارين وحتى وقت اليوم. عادةً ما يؤكد الأطباء التشخيص عبر عدة زيارات أو بجهاز مراقبة لمدة 24 ساعة. للاستخدام المنزلي، خذ قراءتين صباحًا وقراءتين مساءً لمدة أسبوع، ثم خذ المتوسط إلى موعدك الطبي.

## خرافة 5: «أنا صغير جدًا على القلق بشأن ضغط الدم»

العمر مجرد عامل واحد من عوامل الخطر. فالشخص الذي يبدو بصحة جيدة في الثلاثينيات قد يكون ضغطه مرتفعًا، خاصة مع زيادة الوزن والأطعمة المصنعة المالحة والتوتر. الاكتشاف المبكر لدى البالغين الأصغر سنًا يمنع الأضرار التي تتراكم بصمت لسنوات. قس ضغطك مرة في السنة مهما كان عمرك.

## الخلاصة

لا تنتظر الأعراض — فقد لا تأتي أبدًا. قِس ضغطك بانتظام، واتبع خطة طبيبك، واستمر في بناء العادات اليومية الصغيرة التي تحمي قلبك لعقود.`,
  },
  takeaways: {
    en: [
      'Hypertension is silent — you usually cannot feel it.',
      'Salt matters, but diet, weight, stress, and genes matter too.',
      'Never stop blood-pressure medication on your own.',
      'Confirm high readings over several days or visits before panicking.',
      'Check your blood pressure yearly, at any age.',
    ],
    ar: [
      'ارتفاع الضغط صامت — غالبًا لا تشعر به.',
      'الملح مهم، لكن النظام الغذائي والوزن والتوتر والوراثة مهمة أيضًا.',
      'لا توقف دواء الضغط من تلقاء نفسك أبدًا.',
      'أكّد القراءات المرتفعة على مدار عدة أيام أو زيارات قبل القلق.',
      'افحص ضغطك سنويًا مهما كان عمرك.',
    ],
  },
};

const LOWER_CHOLESTEROL: Article = {
  id: 'lower-cholesterol-naturally',
  slug: 'lower-cholesterol-naturally',
  category: 'heart',
  icon: '❤️',
  readTime: 5,
  publishedAt: '2026-02-03',
  tags: ['heart', 'cholesterol', 'nutrition'],
  title: {
    en: 'How to Lower Cholesterol Naturally (Without Giving Up Flavor)',
    ar: 'كيف تخفض الكوليسترول طبيعيًا (دون التخلي عن النكهة)',
  },
  excerpt: {
    en: 'Heart-friendly swaps that keep your favorite meals delicious.',
    ar: 'بدائل صحية للقلب تحافظ على أطباقك المفضلة لذيذة.',
  },
  content: {
    en: `## It Starts With the Kitchen

Cholesterol isn't your enemy — your body needs it to make hormones and cell membranes. The problem starts when LDL ("bad") cholesterol builds up and oxidizes inside artery walls. The good news: food is one of the most powerful tools you have, and you don't need to surrender flavor to use it.

## Swap the Fat, Keep the Taste

The fats you choose matter more than the total amount:

- Replace butter and margarine with olive oil for cooking and dressing.
- Choose fatty fish (salmon, sardines, tuna) twice a week — omega-3s support heart health.
- Snack on a small handful of unsalted almonds or walnuts.
- Use avocado instead of cheese in sandwiches and salads.

## Fill Up on Soluble Fiber

Soluble fiber acts like a sponge: it binds cholesterol in the intestine so your body excretes more of it. Foods rich in soluble fiber include oats, barley, beans and lentils, okra, eggplant, apples, citrus fruits, and carrots. Aim for 10–25 grams a day — a bowl of oatmeal and a serving of beans gets you most of the way.

## Cook With Plants

Plant sterols and stanols naturally compete with cholesterol absorption. They appear naturally in vegetable oils, nuts, seeds, and whole grains. Some fortified yogurts and margarines add extra amounts. A colorful plate of vegetables at every meal quietly stacks the odds in your favor.

## Habits That Multiply Results

No single food works alone:

- **Move daily** — 30 minutes of walking improves HDL ("good") cholesterol.
- **Quit the habit** — smoking injures artery walls and lowers HDL; stopping raises it quickly.
- **Trim the waist** — even 5–10% weight loss reduces LDL.
- **Limit alcohol** — keep it modest, if you drink at all.

## Read the Label, Not the Claims

Foods labeled "low cholesterol" often still contain saturated fats and refined sugars. Check the back: prioritize monounsaturated fats, fiber, and foods you actually recognize as ingredients.

## Ask for the Numbers

A cholesterol panel shows LDL, HDL, total cholesterol, and triglycerides. Talk to your doctor about your target levels — they depend on your age and risk profile. Nutrition won't always replace medication, but it makes every dose work better.`,
    ar: `## يبدأ الأمر من المطبخ

الكوليسترول ليس عدوك — فجسمك يحتاجه لصنع الهرمونات وأغشية الخلايا. تبدأ المشكلة عندما يتراكم الكوليسترول الضار (LDL) ويتأكسد داخل جدران الشرايين. الخبر الجيد: الغذاء من أقوى الأدوات التي تملكها، ولا تحتاج للتخلي عن النكهة لاستخدامه.

## استبدل الدهون، واحتفظ بالطعم

الدهون التي تختارها أهم من الكمية الإجمالية:

- استبدل الزبدة والسمنة بزيت الزيتون للطبخ والتتبيل.
- اختر الأسماك الدهنية (السلمون والسردين والتونة) مرتين أسبوعيًا — أحماض أوميغا-3 تدعم صحة القلب.
- تناول حفنة صغيرة من اللوز أو الجوز غير المملح كوجبة خفيفة.
- استخدم الأفوكادو بدل الجبن في السندويشات والسلطات.

## املأ طبقك بالألياف القابلة للذوبان

تعمل الألياف القابلة للذوبان كإسفنجة: فهي ترتبط بالكوليسترول في الأمعاء ليطرحه الجسم بكميات أكبر. من الأطعمة الغنية بها: الشوفان والشعير والفاصوليا والعدس والبامية والباذنجان والتفاح والحمضيات والجزر. استهدف 10 إلى 25 غرامًا يوميًا — وعاء من الشوفان مع حصة من البقوليات يغطي معظم الحاجة.

## طهو نباتي

تتنافس الستيرولات النباتية والستانولات طبيعيًا مع امتصاص الكوليسترول. توجد طبيعيًا في الزيوت النباتية والمكسرات والبذور والحبوب الكاملة. بعض أنواع اللبن المدعم تضيف كميات إضافية. طبق مليء بالخضار الملونة في كل وجبة يرجّح الكفة لصالحك بهدوء.

## عادات تضاعف النتائج

لا يعمل أي طعام وحده:

- **تحرك يوميًا** — 30 دقيقة من المشي تحسن الكوليسترول الجيد (HDL).
- **توقف عن التدخين** — يجرح جدران الشرايين ويخفض HDL؛ والإقلاع يرفعه سريعًا.
- **قلّص محيط الخصر** — حتى إنقاص 5 إلى 10% من الوزن يخفض LDL.
- **قلّل الكحول** — اجعله معتدلًا، إن كنت تشربه أصلًا.

## اقرأ الملصق، لا الادعاءات

الأطعمة الموسومة «قليل الكوليسترول» غالبًا ما تحتوي دهونًا مشبعة وسكريات مكررة. انظر إلى الخلف: أعط الأولوية للدهون الأحادية غير المشبعة والألياف والأطعمة التي تعرف مكوناتها فعلًا.

## اطلب الأرقام

يُظهر فحص الدهون: LDL وHDL والكوليسترول الكلي والدهون الثلاثية. تحدث مع طبيبك عن المستويات المستهدفة لك — فهي تعتمد على عمرك وملف خطرك. التغذية لا تحل دائمًا محل الدواء، لكنها تجعل كل جرعة تعمل بشكل أفضل.`,
  },
  takeaways: {
    en: [
      'Food is your most powerful cholesterol tool — focus on fat quality, fiber, and plants.',
      'Replace saturated fats with olive oil, fish, nuts, and avocado.',
      'Eat 10–25 g of soluble fiber daily from oats, beans, and vegetables.',
      'Pair nutrition with movement, weight loss, and quitting smoking.',
      'Get a full lipid panel and know your individual targets.',
    ],
    ar: [
      'الطعام هو أقوى أدواتك للتحكم في الكوليسترول — ركّز على جودة الدهون والألياف والنباتات.',
      'استبدل الدهون المشبعة بزيت الزيتون والأسماك والمكسرات والأفوكادو.',
      'تناول 10 إلى 25 غرامًا من الألياف القابلة للذوبان يوميًا من الشوفان والبقوليات والخضار.',
      'اقرن التغذية بالحركة وإنقاص الوزن والإقلاع عن التدخين.',
      'أجرِ فحص دهون كامل واعرف مستوياتك المستهدفة.',
    ],
  },
};

const GOUT_FLARE_UPS: Article = {
  id: 'gout-flare-ups',
  slug: 'gout-flare-ups',
  category: 'nutrition',
  icon: '🦶',
  readTime: 6,
  publishedAt: '2026-02-18',
  tags: ['gout', 'nutrition', 'joints'],
  title: {
    en: 'Gout Flare-Ups: What to Eat and What to Avoid',
    ar: 'نوبات النقرس: ماذا تأكل وماذا تتجنب',
  },
  excerpt: {
    en: 'A practical food guide to calm the joint and prevent the next flare.',
    ar: 'دليل غذائي عملي لتهدئة المفصل ومنع النوبة القادمة.',
  },
  content: {
    en: `## What Happens During a Flare

Gout is a form of inflammatory arthritis caused by urate crystals settling in a joint — most often the big toe. When crystals form, the immune system mounts a furious response: swelling, heat, redness, and intense pain that often peaks at night. Between flares, many people feel completely normal, which makes prevention the real game.

## Eat to Lower Uric Acid

Uric acid forms when your body breaks down purines, compounds found in many foods. You don't need a miserable diet — you need smart adjustments:

- **Limit high-purine meats** — organ meats, game, and frequent red meat push urate up.
- **Avoid sugary drinks** — fructose, especially in sodas and juices, raises uric acid more than any food.
- **Choose fish wisely** — sardines, anchovies, and mackerel are high in purines; salmon and tuna are moderate.
- **Include low-fat dairy** — milk and yogurt may help your body excrete uric acid more easily.
- **Hydrate well** — water helps your kidneys flush urate; aim for 2–3 liters a day.

## Vegetables Are Friends, Not Foes

For decades people feared all purine-rich foods. Research now shows that purines from vegetables — peas, lentils, spinach, mushrooms, cauliflower — do not meaningfully raise gout risk. Keep them on your plate.

## The Alcohol Question

Beer is the worst offender: it raises urate and impairs its excretion. Spirits carry a moderate risk, while modest wine appears lower-risk. During an active flare, the safest choice is to skip alcohol entirely.

## Protein Without the Risk

Eggs, tofu, legumes, and low-fat dairy give you protein without driving urate up. If you love red meat, treat it as an occasional small serving, not a weekly staple.

## What to Watch in Daily Life

Excess weight multiplies gout risk, so gradual weight loss helps — but crash dieting and prolonged fasting can actually trigger flares. Sudden dehydration, injuries, and starting certain diuretics can also provoke attacks. Stay hydrated, move gently, and make changes slowly.

## When to See a Doctor

A single flare needs evaluation: long-term untreated gout can damage joints and kidneys. Medication to lower urate is safe and efficient; your doctor can tell you whether you need it. During a flare, anti-inflammatory treatment shortens symptoms dramatically. Let your blood tests guide the decision — not just your pain.`,
    ar: `## ما الذي يحدث أثناء النوبة؟

النقرس شكل من أشكال التهاب المفاصل الناجم عن ترسب بلورات اليورات في المفصل — وغالبًا إصبع القدم الكبير. عندما تتشكل البلورات، يطلق الجهاز المناعي استجابة عنيفة: تورم وحرارة واحمرار وألم شديد يبلغ ذروته غالبًا في الليل. بين النوبات يشعر كثيرون بأنهم طبيعيون تمامًا، وهذا ما يجعل الوقاية هي اللعبة الحقيقية.

## لتخفض حمض اليوريك، انتبه لما تأكل

يتشكل حمض اليوريك عندما يكسر الجسم البيورينات، وهي مركبات موجودة في كثير من الأطعمة. لا تحتاج إلى نظام قاسٍ — بل إلى تعديلات ذكية:

- **حد من اللحوم الغنية بالبيورينات** — الكبد والمخلفات واللحوم الحمراء المتكررة ترفع اليورات.
- **ابتعد عن المشروبات السكرية** — الفركتوز، خاصة في الصودا والعصائر، يرفع حمض اليوريك أكثر من أي طعام.
- **اختر السمك بحكمة** — السردين والأنشوجة والماكريل غنية بالبيورينات؛ أما السلمون والتونة فمعتدلة.
- **أدخل الألبان قليلة الدسم** — الحليب والزبادي قد يساعدان جسمك على طرد حمض اليوريك بسهولة أكبر.
- **اشرب الماء جيدًا** — يساعد الماء كليتيك على طرد اليورات؛ استهدف 2 إلى 3 لترات يوميًا.

## الخضار أصدقاء، لا أعداء

لسنوات خاف الناس من كل الأطعمة الغنية بالبيورينات. تظهر الأبحاث الآن أن بيورينات الخضار — البازلاء والعدس والسبانخ والفطر والقرنبيط — لا ترفع خطر النقرس بشكل ملموس. ابقها في طبقك.

## سؤال الكحول

البيرة هي الأسوأ: فهي ترفع اليورات وتضعف طرحه. المشروبات الروحية تحمل خطرًا معتدلًا، بينما يبدو النبيذ المعتدل أقل خطرًا. أثناء النوبة الحادة، الخيار الأضمن هو تجنب الكحول نهائيًا.

## بروتين بلا خطر

البيض والتوفو والبقوليات والألبان قليلة الدسم تمنحك البروتين دون رفع اليورات. إذا كنت تحب اللحوم الحمراء، عاملها كحصة صغيرة أحيانًا، لا كعنصر أسبوعي أساسي.

## ماذا تراقب في حياتك اليومية؟

الوزن الزائد يضاعف خطر النقرس، لذا يساعد فقدان الوزن التدريجي — لكن الأنظمة القاسية والصيام الطويل قد يثيران النوبات فعلًا. الجفاف المفاجئ والإصابات وبدء بعض مدرات البول قد تحفز أيضًا الهجمات. حافظ على الترطيب وتحرك بلطف وأجرِ التغييرات ببطء.

## متى تزور الطبيب؟

نوبة واحدة تستدعي التقييم: النقرس غير المعالج على المدى الطويل قد يؤذي المفاصل والكلى. أدوية خفض اليورات آمنة وفعالة، وطبيبك يخبرك إن كنت تحتاجها. أثناء النوبة، يختصر العلاج المضاد للالتهاب الأعراض بشكل كبير. دع تحاليل الدم توجه القرار — لا الألم وحده.`,
  },
  takeaways: {
    en: [
      'Gout flares come from urate crystals; prevention is key between attacks.',
      'Limit organ meats, red meat, beer, and sugary drinks.',
      'Vegetables and most plant proteins do not raise gout risk.',
      'Stay hydrated and lose weight gradually — never crash diet.',
      'Get a medical evaluation after a first flare.',
    ],
    ar: [
      'نوبات النقرس سببها بلورات اليورات؛ الوقاية هي المفتاح بين النوبات.',
      'حد من الكبد واللحوم الحمراء والبيرة والمشروبات السكرية.',
      'الخضار ومعظم البروتينات النباتية لا ترفع خطر النقرس.',
      'اشرب الماء بوفرة وأنقص وزنك تدريجيًا — لا تلجأ للأنظمة القاسية أبدًا.',
      'احصل على تقييم طبي بعد أول نوبة.',
    ],
  },
};

const SCIENCE_OF_SLEEP: Article = {
  id: 'science-of-sleep',
  slug: 'science-of-sleep',
  category: 'lifestyle',
  icon: '😴',
  readTime: 5,
  publishedAt: '2026-03-01',
  tags: ['sleep', 'lifestyle', 'recovery'],
  title: {
    en: 'The Science of Sleep: Why 7 Hours Matters',
    ar: 'علم النوم: لماذا تهم 7 ساعات',
  },
  excerpt: {
    en: 'How sleep quality shapes hormones, hunger, and recovery.',
    ar: 'كيف يؤثر جودة النوم على الهرمونات والجوع والتعافي.',
  },
  content: {
    en: `## Sleep Is Not Optional

Every major health guideline now treats sleep as a pillar of health — alongside food and movement. Adults need 7–9 hours a night, and consistently sleeping less changes how your body and brain behave in measurable ways.

## Your Body Runs on Cycles

While you sleep, your brain cycles between light, deep, and REM sleep. Each stage does a different job: deep sleep repairs tissue, secretes growth hormone, and consolidates memories. REM sharpens mood and learning. When you cut hours, you don't lose sleep uniformly — you lose deepest sleep first, which disrupts repair and immune function.

## The Metabolic Price

Short and poor sleep raises ghrelin (the "hunger hormone") and lowers leptin (the "fullness hormone"). The result: stronger cravings, larger portions, and a preference for calorie-dense foods. One large study found that sleeping fewer than 6 hours was associated with a significant increase in overall obesity risk. Blood sugar handling also worsens, because sleep-deprived muscles respond less to insulin.

## Immunity and Recovery

During deep sleep your immune system releases protective proteins and clears waste from the brain through the glymphatic system. That's why you sleep so much when you're sick — it's a repair state. Athletes who prioritize sleep recover faster and get injured less.

## What Actually Improves Sleep

- Keep a fixed schedule — even on weekends.
- Get morning light — daylight anchors your internal clock.
- Dim screens at night — especially for the last hour.
- Cool the bedroom — 16–19°C is the sweet spot.
- Watch caffeine — stop at least 8 hours before bed.
- Move daily — activity deepens sleep, but avoid hard training too close to bedtime.

## When It's Not Just "Bad Sleep"

Loud snoring with pauses, gasping, or severe daytime fatigue can signal sleep apnea — a treatable but serious condition linked to high blood pressure and diabetes. Persistent insomnia lasting over 3 months deserves professional help. You wouldn't endure months of unexplained chest pain; don't accept chronic sleep loss silently.

## Small Start

Pick one habit this week: a fixed wake-up time, no screens an hour before bed, or a 10-minute morning walk in sunlight. Consistency beats intensity.`,
    ar: `## النوم ليس ترفًا

تعامل كل التوصيات الصحية الكبرى الآن مع النوم كركيزة للصحة — جنبًا إلى جنب مع الغذاء والحركة. يحتاج البالغون إلى 7 إلى 9 ساعات ليلًا، والحرمان المستمر من النوم يغيّر سلوك جسمك وعقلك بطرق قابلة للقياس.

## جسدك يعمل بدورات

أثناء نومك، يعبر الدماغ بين النوم الخفيف والعميق ونوم حركة العين السريعة (REM). لكل مرحلة وظيفة مختلفة: النوم العميق يصلح الأنسجة ويفرز هرمون النمو ويرسّخ الذكريات، بينما نوم REM يحسّن المزاج والتعلم. عندما تقتطع الساعات، لا تخسر النوم بالتساوي — بل تخسر النوم العميق أولًا، ما يخل بنظام الإصلاح والمناعة.

## الثمن الأيضي

النوم القصير الرديء يرفع هرمون الجريلين (هرمون الجوع) ويخفض اللبتين (هرمون الشبع). النتيجة: رغبات أقوى وحصص أكبر وميل للأطعمة الكثيفة السعرات. وجدت دراسة كبيرة أن النوم لأقل من 6 ساعات ارتبط بزيادة ملحوظة في خطر السمنة عمومًا. كما تتدهور معالجة سكر الدم، لأن العضلات المحرومة من النوم تستجيب للأنسولين بشكل أضعف.

## المناعة والتعافي

خلال النوم العميق يطلق جهاز المناعة بروتينات واقية وينظّف الفضلات من الدماغ عبر الجهاز الجليمفاوي. لهذا ننام كثيرًا عند المرض — إنها حالة إصلاح. كذلك الرياضيون الذين يحرصون على النوم يتعافون أسرع ويصابون أقل.

## ما الذي يحسّن النوم فعلًا؟

- ثبّت مواعيدك — حتى في عطلات نهاية الأسبوع.
- احصل على ضوء الصباح — يثبّت ضوء النهار ساعتك الداخلية.
- اخفت الشاشات ليلًا — خاصة في الساعة الأخيرة.
- برّد غرفة النوم — 16 إلى 19 درجة مئوية هي النطاق المثالي.
- راقب الكافيين — توقف عنه قبل النوم بـ8 ساعات على الأقل.
- تحرك يوميًا — النشاط يعمّق النوم، لكن تجنّب التمرين العنيف قرب موعد النوم.

## متى لا يكون الأمر مجرد «نوم سيئ»؟

الشخير العالي مع توقف التنفس أو اللهاث أو التعب النهاري الشديد قد يشير إلى انقطاع التنفس أثناء النوم — وهي حالة قابلة للعلاج لكنها خطيرة ومرتبطة بارتفاع الضغط والسكري. الأرق المستمر لأكثر من 3 أشهر يستحق مساعدة متخصصة. لن تقبل بأشهر من ألم الصدر غير المفسر؛ فلا تقبل بفقدان النوم المزمن بصمت.

## ابدأ بخطوة صغيرة

اختر عادة واحدة هذا الأسبوع: موعد استيقاظ ثابت، أو لا شاشات قبل النوم بساعة، أو مشي صباحي 10 دقائق تحت الشمس. الثبات يتفوق على الشدة.`,
  },
  takeaways: {
    en: [
      'Adults need 7–9 hours; deep sleep repairs the body and brain.',
      'Poor sleep raises hunger hormones and worsens insulin sensitivity.',
      'Recovery, immunity, and even weight control depend on sleep.',
      'Fix your schedule, morning light, darkness, coolness, and caffeine timing.',
      'Snoring with pauses or chronic insomnia needs medical evaluation.',
    ],
    ar: [
      'يحتاج البالغون إلى 7 إلى 9 ساعات؛ النوم العميق يصلح الجسم والدماغ.',
      'قلة النوم ترفع هرمونات الجوع وتضعف استجابة الأنسولين.',
      'التعافي والمناعة وحتى ضبط الوزن تعتمد على النوم.',
      'ثبّت مواعيدك، احصل على ضوء الصباح، اخفت الشاشات، وبرّد الغرفة، واضبط الكافيين.',
      'الشخير مع توقف التنفس أو الأرق المزمن يتطلب تقييمًا طبيًا.',
    ],
  },
};

const PCOS_INSULIN: Article = {
  id: 'pcos-insulin-resistance',
  slug: 'pcos-insulin-resistance',
  category: 'lifestyle',
  icon: '🌸',
  readTime: 8,
  publishedAt: '2026-03-10',
  tags: ['pcos', 'insulin', 'hormones'],
  title: {
    en: 'PCOS and Insulin Resistance: Understanding the Connection',
    ar: 'متلازمة تكيس المبايض ومقاومة الأنسولين: فهم العلاقة',
  },
  excerpt: {
    en: 'What connects them — and how nutrition can make a real difference.',
    ar: 'ما الذي يربطهما — وكيف يمكن للتغذية أن تحدث فرقًا حقيقيًا.',
  },
  content: {
    en: `## One Term, Many Symptoms

Polycystic ovary syndrome (PCOS) affects up to 1 in 10 women of reproductive age. Its name focuses on the ovaries, but its effects spread widely: irregular periods, acne, excess hair growth, and — for many — weight gain that resists every attempt to lose it. The thread connecting these symptoms is often insulin resistance.

## The Insulin Connection

Insulin's job is to push glucose into cells. In insulin resistance, cells respond weakly, so the pancreas must produce more insulin to compensate. High insulin levels then stimulate the ovaries to make more testosterone and disrupt normal egg release. This is why so many PCOS features improve when insulin sensitivity improves — even without dramatic weight change.

## What the Food Does

Carbohydrates aren't the villain, but the type and balance matter:

- **Choose slow carbs** — whole grains, legumes, and vegetables release sugar gradually.
- **Pair carbs with protein** — add eggs, yogurt, chicken, or beans to every meal to blunt glucose spikes.
- **Prefer fiber at every meal** — fiber slows absorption and feeds good gut bacteria.
- **Limit added sugar** — sweets and sugary drinks spike insulin quickly.
- **Eat regular meals** — skipping meals tends to drive overeating and bigger spikes later.

## Movement Is Medicine

Exercise improves insulin sensitivity almost immediately, and the effect lasts hours. A mix works best: strength training builds muscle that uses glucose efficiently, while walking or cycling improves cardiovascular health. Aim for 150 minutes a week and two strength sessions — split however fits your life.

## Beyond the Plate

- Sleep 7 hours — poor sleep worsens insulin resistance.
- Manage stress — cortisol pushes glucose up and insulin along with it.
- Support hormones with sleep, not supplements — most "PCOS cures" are unproven.

## Medication Can Help

Metformin and other insulin-sensitizing medications are safe and effective for many women. Hormonal contraceptives regulate cycles when that's the goal. Don't see medication as a failure — see it as support while you build habits that last.

## You're Not Doing Anything Wrong

PCOS is a medical condition, not a personal failure. Small, steady changes — one better breakfast, one more evening walk — compound into meaningful improvement over months. Work with a doctor and registered dietitian who take insulin resistance seriously, because the right team changes everything.`,
    ar: `## مصطلح واحد، أعراض كثيرة

تصيب متلازمة تكيس المبايض (PCOS) امرأة من كل 10 في سن الإنجاب تقريبًا. الاسم يركز على المبيضين، لكن تأثيراتها واسعة: دورات غير منتظمة، وحب شباب، ونمو زائد للشعر، وبالنسبة لكثيرات زيادة وزن تقاوم كل محاولات النقصان. الخيط الذي يربط هذه الأعراض غالبًا هو مقاومة الأنسولين.

## علاقة الأنسولين

مهمة الأنسولين دفع الجلوكوز إلى الخلايا. في مقاومة الأنسولين تستجيب الخلايا بضعف، فيضطر البنكرياس لإنتاج كمية أكبر لتعويض ذلك. تحفز مستويات الأنسولين المرتفعة بعدها المبيضين على إنتاج مزيد من التستوستيرون وتخلّ بنزول البويضات المنتظم. لهذا تتحسن معظم ملامح المتلازمة عندما تتحسن حساسية الأنسولين — حتى دون تغيير درامي في الوزن.

## ماذا يفعل الطعام؟

الكربوهيدرات ليست الشر، لكن النوع والتوازن مهمان:

- **اختر الكربوهيدرات البطيئة** — الحبوب الكاملة والبقوليات والخضار تطلق السكر تدريجيًا.
- **اقرن الكربوهيدرات بالبروتين** — أضف البيض أو الزبادي أو الدجاج أو البقوليات لكل وجبة لتخفيف ارتفاع الجلوكوز.
- **فضّل الألياف في كل وجبة** — تُبطئ الامتصاص وتغذي البكتيريا النافعة.
- **قلّل السكر المضاف** — الحلويات والمشروبات المحلاة ترفع الأنسولين بسرعة.
- **تناول وجبات منتظمة** — تخطي الوجبات يدفع للإفراط لاحقًا وارتفاعات أكبر.

## الحركة دواء

يحسّن التمرين حساسية الأنسولين فورًا تقريبًا، ويستمر الأثر ساعات. المزيج الأفضل: تمارين القوة تبني عضلات تستخدم الجلوكوز بكفاءة، بينما المشي أو ركوب الدراجة يحسّن صحة القلب والأوعية. استهدف 150 دقيقة أسبوعيًا وجلستي قوة — ووزّعها حسب حياتك.

## ما أبعد من الطبق

- نم 7 ساعات — النوم الرديء يفاقم مقاومة الأنسولين.
- أدر التوتر — الكورتيزول يرفع الجلوكوز وما معه الأنسولين.
- ادعم الهرمونات بالنوم، لا بالمكملات — معظم «علاجات» المتلازمة غير مثبتة.

## والأدوية قد تساعد

الميتفورمين وأدوية تحسين حساسية الأنسولين آمنة وفعالة لكثير من النساء. كما تنظم حبوب منع الحمل الهرمونية الدورات عند الحاجة. لا تعتبر الدواء فشلًا — بل دعمًا أثناء بناء عادات تدوم.

## أنتِ لا ترتكبين أي خطأ

تكويس المبايض حالة طبية، لا فشل شخصي. التغييرات الصغيرة الثابتة — فطور أفضل، مشية مسائية إضافية — تتراكم لتتحول إلى تحسّن ملحوظ خلال الأشهر. اعمل مع طبيب وأخصائي تغذية يأخذان مقاومة الأنسولين على محمل الجد، فالفريق المناسب يغيّر كل شيء.`,
  },
  takeaways: {
    en: [
      'PCOS is often driven by insulin resistance, not just the ovaries.',
      'Slow carbs, protein pairing, and regular meals improve insulin sensitivity.',
      'Strength training plus 150 minutes of weekly movement is highly effective.',
      'Sleep and stress management directly affect PCOS symptoms.',
      'Medication is valid support — combine it with lasting habits.',
    ],
    ar: [
      'تكيس المبايض غالبًا ما يقوده مقاومة الأنسولين، لا المبيضين فقط.',
      'الكربوهيدرات البطيئة واقتران البروتين والوجبات المنتظمة تحسّن حساسية الأنسولين.',
      'تمارين القوة مع 150 دقيقة أسبوعيًا من الحركة فعالة جدًا.',
      'النوم وإدارة التوتر يؤثران مباشرة على أعراض المتلازمة.',
      'الدواء دعم مشروع — اجمع بينه وبين عادات تدوم.',
    ],
  },
};

const MINDFUL_EATING: Article = {
  id: 'mindful-eating',
  slug: 'mindful-eating',
  category: 'nutrition',
  icon: '🍃',
  readTime: 4,
  publishedAt: '2026-03-20',
  tags: ['mindful', 'nutrition', 'habits'],
  title: {
    en: 'Mindful Eating: A Beginner\'s Guide',
    ar: 'الأكل الواعي: دليل المبتدئين',
  },
  excerpt: {
    en: 'Simple techniques to slow down, savor, and listen to true hunger.',
    ar: 'تقنيات بسيطة لتهدّئ وتمضغ وتستجيب للجوع الحقيقي.',
  },
  content: {
    en: `## Why Mindless Eating Happens

Between screens, deadlines, and speed-eating, most meals happen on autopilot. You polish off a plate without tasting it, then reach for dessert without registering fullness. Mindful eating is the antidote: paying deliberate attention to food, sensation, and hunger during meals.

## It's Not a Diet

Mindful eating has no ingredient lists or forbidden foods. It's a skill you train, like a muscle. The goal isn't to eat less — it's to eat with awareness, which naturally improves portion control and food choices without the burden of strict rules.

## Check In With Hunger First

Before you eat, rate your hunger from 1 to 10. Aim to start meals around 3–4 (comfortable hunger) and stop around 6–7 (comfortably full). This simple rating replaces shoulds and shouldn'ts with honest body signals. True hunger builds gradually, anywhere in your body; emotional hunger appears suddenly and fixates on specific cravings.

## Slow the Pace

Your brain needs about 20 minutes to register fullness signals. Practical hacks that work:

- Put your fork down between bites.
- Chew slowly and thoroughly — aim for a relaxed rhythm.
- Eat with your non-dominant hand for a few meals to reset your speed.
- Serve your plate at the counter, not the table; you're far less likely to add a generous second serving.

## Engage All Senses

Look at the colors on your plate. Notice the aroma before the first bite. Feel textures — crunchy, creamy, warm, cold. When you eat with full attention, satisfaction rises and you need smaller amounts to feel fulfilled. This is why a small piece of really good chocolate beats a whole bar eaten while scrolling.

## Make a Meal Zone

Eat in a designated space whenever possible. No phone, no television, no keyboard. Many people are shocked at how different food tastes when they actually taste it. You'll also discover how fast the "finish the plate" reflex runs — and how easy it is to change.

## Start Small

Pick one meal a day — often breakfast or lunch — and eat that meal mindfully. When the habit stabilizes, expand to a second. Mindful eating isn't about perfection; it's about returning, again and again, to the present moment of the meal.`,
    ar: `## لماذا يحدث الأكل بلا وعي؟

بين الشاشات والمواعيد وسرعة الأكل، تمر معظم الوجبات على الطيار الآلي. تلتهم طبقك دون أن تتذوقه، ثم تمد يدك للحلوى دون أن تدرك الشبع. الأكل الواعي هو الترياق: الانتباه المتعمد للطعام والإحساس والجوع أثناء الوجبات.

## ليس نظامًا غذائيًا

لا قوائم مكونات ولا أطعمة محظورة في الأكل الواعي. إنه مهارة تدربها مثل العضلة. الهدف ليس أن تأكل أقل — بل أن تأكل بوعي، وهذا يحسّن التحكم في الحصص واختيار الطعام بشكل طبيعي دون ثقل القواعد الصارمة.

## افحص جوعك أولًا

قبل الأكل، قيّم جوعك من 1 إلى 10. ابدأ الوجبة حول 3 إلى 4 (جوع مريح) وتوقف حول 6 إلى 7 (شبع مريح). هذا التقييم البسيط يستبدل قوائم «يجب ولا يجب» بإشارات جسدية صادقة. الجوع الحقيقي ينمو تدريجيًا ويظهر في أي مكان بجسدك؛ أما الجوع العاطفي فيظهر فجأة ويتمسك برغبة محددة.

## أبطئ الوتيرة

يحتاج دماغك نحو 20 دقيقة لتسجيل إشارات الشبع. حيل عملية تنجح:

- ضع الشوكة بين اللقمات.
- امضغ ببطء وبشكل كامل — بإيقاع هادئ.
- كل بيدك غير المسيطرة في بعض الوجبات لإعادة ضبط السرعة.
- قدّم طبقك في المطبخ لا على المائدة؛ فتقل احتمالية إضافة حصة ثانية سخية كثيرًا.

## أشغل كل حواسك

انظر إلى ألوان طبقك. لاحظ الرائحة قبل اللقمة الأولى. أحس بالملمس — المقرمش والكريمي والدافئ والبارد. حين تأكل بانتباه كامل، ترتفع اللذة وتكفيك كميات أصغر لتشعر بالامتلاء. لهذا، قطعة شوكولاتة جيدة تفوق لوحًا كاملًا تُلتهم أثناء التمرير على الهاتف.

## اصنع منطقة للطعام

كل في مكان مخصص كلما أمكن. لا هاتف ولا تلفاز ولا لوحة مفاتيح. يندهش كثيرون عند اكتشاف كم يختلف طعم الطعام حين يتذوقونه فعلًا. ستكتشف أيضًا كم هي سرعة انعكاس «إنهاء الطبق» — وكم يسهل تغييرها.

## ابدأ صغيرًا

اختر وجبة واحدة يوميًا — غالبًا الفطور أو الغداء — وتناولها بوعي. عندما تستقر العادة، وسّعها إلى وجبة ثانية. الأكل الواعي ليس حول الكمال؛ بل حول العودة، مرارًا وتكرارًا، إلى اللحظة الحاضرة من الوجبة.`,
  },
  takeaways: {
    en: [
      'Mindful eating trains awareness — no forbidden foods, no strict rules.',
      'Rate your hunger 1–10 and start meals at comfortable hunger (3–4).',
      'Give your brain about 20 minutes to register fullness.',
      'Engage sight, smell, and texture to raise satisfaction.',
      'Start with one mindful meal a day and grow from there.',
    ],
    ar: [
      'الأكل الواعي يدرب الوعي — لا أطعمة محظورة ولا قواعد صارمة.',
      'قيّم جوعك من 1 إلى 10 وابدأ الوجبة عند جوع مريح (3 إلى 4).',
      'امنح دماغك نحو 20 دقيقة لتسجيل الشبع.',
      'أشغل البصر والشم والملمس لرفع المتعة.',
      'ابدأ بوجبة واعية واحدة يوميًا ثم وسّع.',
    ],
  },
};

const STRENGTH_TRAINING: Article = {
  id: 'strength-training-diabetes',
  slug: 'strength-training-diabetes',
  category: 'diabetes',
  icon: '🏋️',
  readTime: 7,
  publishedAt: '2026-04-02',
  tags: ['diabetes', 'fitness', 'strength'],
  title: {
    en: 'Strength Training with Diabetes: What You Need to Know',
    ar: 'تدريبات القوة مع السكري: ما تحتاج معرفته',
  },
  excerpt: {
    en: 'Why lifting weights helps blood sugar — and how to start safely.',
    ar: 'لماذا يساعد رفع الأثقال في ضبط سكر الدم — وكيف تبدأ بأمان.',
  },
  content: {
    en: `## Lifting Weights Is Blood-Sugar Medicine

Most people know aerobic exercise helps diabetes. Fewer know that strength training does something unique: it builds muscle that pulls glucose from your bloodstream even when you're resting. Muscle is the largest storage site for glucose, so adding it improves your body's handling of sugar around the clock.

## Why It Works

Muscle contractions make your cells more responsive to insulin — both during the workout and for hours afterward. Over weeks and months, steady training increases muscle mass, which raises your daily glucose storage capacity. Combined with aerobic activity, strength training has been shown to meaningfully improve HbA1c in people with type 2 diabetes.

## Before You Start

- Ask your doctor — especially if you have eye or kidney complications, or nerve damage affecting your feet.
- Check your feet — inspect for cuts or blisters before and after sessions.
- Warm up — 5–10 minutes of easy walking loosens muscles and protects joints.
- Have glucose with you — hypoglycemia can strike during or after training.

## The Right Way to Train

- Start light — bodyweight moves (squats, wall push-ups, chair stands) are a perfect beginning.
- Learn form first — good technique prevents injury and magnifies results.
- Progress gradually — add small weight or reps every 1–2 weeks, not all at once.
- Train 2–3 days a week — rest days allow muscles to grow and store more glycogen.
- Include the big movements — squats, presses, and rows recruit the largest muscles.

## The Timing Question

Blood sugar during strength training can behave differently than during cardio. Some people rise slightly, others dip. Keep a log for your first sessions and check your glucose before, halfway, and after. A small snack of protein plus carbohydrate beforehand may help steady morning sessions.

## Signs to Stop

Stop and treat immediately if you feel shaky, sweaty, dizzy, or confused — classic low-blood-sugar signs. Treat with 15 grams of fast carbs, rest 15 minutes, recheck, and repeat until you're above target. Never power through the symptoms.

## A Simple First Program

Twice a week: 8–12 reps of chair squats, wall push-ups, seated rows with a band, and hip bridges — two sets each, with 60 seconds of rest. When two sets feel easy, add a third. That's it. Consistency — two honest sessions a week — changes more than any intense weekend workout.`,
    ar: `## رفع الأثقال دواء لسكر الدم

معظم الناس يعرفون أن التمارين الهوائية تساعد في مرض السكري. لكن القليل يعرفون أن تمارين القوة تفعل شيئًا فريدًا: فهي تبني عضلات تسحب الجلوكوز من مجرى الدم حتى وأنت في راحة. العضلات هي أكبر موقع تخزين للجلوكوز، لذا فإن زيادتها تحسّن تعامل جسمك مع السكر على مدار الساعة.

## لماذا ينجح ذلك؟

تقلصات العضلات تجعل خلاياك أكثر استجابة للأنسولين — أثناء التمرين ولساعات بعده. وعلى مدى الأسابيع والأشهر يزيد التدريب المنتظم الكتلة العضلية، ما يرفع قدرتك اليومية على تخزين الجلوكوز. ومع ممارسة الهوائية، أظهرت الدراسات أن تمارين القوة تحسّن HbA1c بشكل ملموس لدى المصابين بالسكري من النوع الثاني.

## قبل أن تبدأ

- استشر طبيبك — خاصة إذا كنت تعاني مضاعفات في العين أو الكلى أو تلفًا عصبيًا في القدمين.
- افحص قدميك — تحقق من الجروح والبثور قبل الجلسات وبعدها.
- سخّن الجسم — مشي سهل من 5 إلى 10 دقائق يرخي العضلات ويحمي المفاصل.
- أحضر الجلوكوز معك — انخفاض السكر قد يحدث أثناء التدريب أو بعده.

## طريقة التدريب الصحيحة

- ابدأ بخفة — تمارين وزن الجسم (القرفصاء، والضغط على الحائط، والصعود من الكرسي) بداية مثالية.
- تعلّم الأداء أولًا — التقنية الجيدة تمنع الإصابات وتضاعف النتائج.
- تقدّم تدريجيًا — أضف وزنًا أو تكرارات صغيرة كل أسبوع إلى أسبوعين، لا دفعة واحدة.
- درّب 2 إلى 3 أيام أسبوعيًا — أيام الراحة تسمح للعضلات بالنمو وتخزين مزيد من الغليكوجين.
- اشمل الحركات الكبيرة — القرفصاء والضغط والشد تستهدف أكبر العضلات.

## مسألة التوقيت

قد يتصرف سكر الدم أثناء تمارين القوة بشكل مختلف عنه في الكارديو. بعض الناس يرتفع قليلًا، وآخرون ينخفضون. سجّل قياسات أولى جلساتك وافحص الجلوكوز قبل التمرين وفي منتصفه وبعده. وجبة خفيفة من البروتين مع كربوهيدرات قبل الجلسات الصباحية قد تثبت المستوى.

## علامات تستدعي التوقف

توقف وعالج فورًا إذا شعرت برجفة أو تعرقًا أو دوارًا أو تشوشًا — وهي علامات انخفاض السكر الكلاسيكية. عالجها بـ15 غرامًا من كربوهيدرات سريعة، وارتح 15 دقيقة، وأعد الفحص حتى تعود فوق الهدف. لا تتجاهل الأعراض أبدًا.

## برنامج أولي بسيط

مرتان أسبوعيًا: من 8 إلى 12 تكرارًا للقرفصاء على الكرسي، والضغط على الحائط، والشد الجالس بشريط مطاطي، ورفع الحوض — جلستان لكل حركة، مع راحة 60 ثانية. حين تصبح الجلستان سهلة، أضف ثالثة. هذا كل شيء. الثبات — جلستان صادقتان أسبوعيًا — يغيّر أكثر من أي تمرين مكثف في نهاية الأسبوع.`,
  },
  takeaways: {
    en: [
      'Strength training builds muscle that uses glucose 24/7.',
      'It improves HbA1c when combined with aerobic exercise.',
      'Ask your doctor first, especially with eye, kidney, or foot complications.',
      'Start with bodyweight moves, focus on form, and progress slowly.',
      'Keep fast carbs nearby and learn to treat low blood sugar.',
    ],
    ar: [
      'تمارين القوة تبني عضلات تستخدم الجلوكوز على مدار الساعة.',
      'تحسّن HbA1c عند اقترانها بالتمارين الهوائية.',
      'استشر طبيبك أولًا، خاصة مع مضاعفات العين أو الكلى أو القدم.',
      'ابدأ بحركات وزن الجسم وركّز على التقنية ثم تقدّم ببطء.',
      'أبقِ الكربوهيدرات السريعة قريبة وتعلّم علاج انخفاض السكر.',
    ],
  },
};

const INTERMITTENT_FASTING: Article = {
  id: 'intermittent-fasting-safety',
  slug: 'intermittent-fasting-safety',
  category: 'nutrition',
  icon: '⏳',
  readTime: 6,
  publishedAt: '2026-04-15',
  tags: ['fasting', 'nutrition', 'weight-loss'],
  title: {
    en: 'Intermittent Fasting: Safe or Not?',
    ar: 'الصيام المتقطع: آمن أم لا؟',
  },
  excerpt: {
    en: 'What the evidence really says — before you skip your first meal.',
    ar: 'ماذا تقول الأدلة فعلًا — قبل أن تتخطى وجبتك الأولى.',
  },
  content: {
    en: `## What Intermittent Fasting Actually Is

Intermittent fasting (IF) isn't a diet — it's an eating schedule that alternates periods of eating and not eating. Common patterns include 16:8 (16 hours fasting, 8 eating), 14:10, and alternate-day fasting. The food rules stay normal; the window changes.

## What the Evidence Shows

Short- and medium-term studies are genuinely promising: IF reliably reduces calories, improves insulin sensitivity, and promotes modest weight loss — roughly comparable to standard calorie restriction for most people. Some find it easier to follow than daily portion control, because there are no calorie-counting apps needed.

## Who Should NOT Fast

This is the most important section. Avoid IF — or do it only under medical supervision — if you:

- Have diabetes and use insulin or drugs that can cause hypoglycemia.
- Are pregnant, breastfeeding, or trying to conceive.
- Are under 18, or underweight.
- Have a history of disordered eating.
- Take certain blood-pressure or heart medications that require steady meals.

If you're not sure, ask your doctor before you begin.

## Hypoglycemia Is the Real Risk

For people on insulin or sulfonylureas, extended fasting can drop blood sugar dangerously. Even in healthy people, symptoms like shakiness, sweating, confusion, or irritability mean you should break the fast with a small balanced snack immediately. Your safety always beats the schedule.

## Common Side Effects and Fixes

- Headache or fatigue — often dehydration; prioritize water and a pinch of salt.
- Hunger pangs — usually pass after the first 1–2 weeks; tea and sparkling water help.
- Poor training performance — schedule harder workouts inside your eating window and lighter sessions during fasts.
- Low energy — ensure your meals cover protein, fiber, and healthy fats; a 500-calorie dinner of rice alone will fail.

## What to Eat When You Eat

The eating window is not a free-for-all. Prioritize protein, vegetables, whole grains, and healthy fats. Breaking the fast with a balanced meal — not a sugary pastry — keeps energy stable and cravings low.

## The Bottom Line

IF works for many people but is not magic and not for everyone. The best approach is the one you can sustain with a normal social life and stable blood sugar. When in doubt, talk to a professional — and always stop fasting if your body sends clear signals that something is wrong.`,
    ar: `## ما هو الصيام المتقطع فعلًا؟

الصيام المتقطع (IF) ليس نظامًا غذائيًا — بل جدول أكل يتبادل فترات الأكل وعدم الأكل. الأنماط الشائعة: 16:8 (صيام 16 ساعة وأكل 8)، و14:10، وصيام اليوم البديل. قواعد الطعام تبقى طبيعية؛ فقط تتغير النافذة الزمنية.

## ماذا تقول الأدلة؟

الدراسات قصيرة ومتوسطة المدى واعدة حقًا: الصيام المتقطع يخفض السعرات بشكل موثوق، ويحسّن حساسية الأنسولين، ويسهم في إنقاص وزن معتدل — مشابهة تقريبًا لتقييد السعرات التقليدي لدى معظم الناس. بعضهم يجده أسهل من ضبط الحصص اليومية لأنك لا تحتاج تطبيقات لحساب السعرات.

## من لا يجب أن يصوم؟

هذا أهم قسم. تجنّب الصيام المتقطع — أو التزم به تحت إشراف طبي فقط — إذا كنت:

- مصابًا بالسكري وتستخدم الأنسولين أو أدوية قد تسبب انخفاض السكر.
- حاملًا أو مرضعًا أو تخططين للحمل.
- دون 18 عامًا أو تعاني نقص الوزن.
- لديك تاريخ من اضطرابات الأكل.
- تتناول أدوية ضغط أو أدوية قلب معينة تتطلب وجبات منتظمة.

إذا لم تكن متأكدًا، اسأل طبيبك قبل البدء.

## انخفاض السكر هو الخطر الحقيقي

بالنسبة لمن يستخدمون الأنسولين أو أدوية السلفونيل يوريا، قد يهبط سكر الدم بشكل خطير أثناء الصيام الطويل. حتى لدى الأصحاء، أعراض مثل الرجفة أو التعرق أو التشوش أو الانفعال تعني أن عليك كسر الصوم فورًا بوجبة خفيفة متوازنة. سلامتك دائمًا أهم من الجدول.

## آثار جانبية شائعة وحلولها

- صداع أو إرهاق — غالبًا جفاف؛ أعطِ الأولوية للماء وقليل من الملح.
- مغص الجوع — يزول عادة بعد أول أسبوع أو أسبوعين؛ الشاي والماء الفوار يساعدان.
- ضعف أداء التمارين — رتب التدريبات الأصعب داخل نافذة الأكل والأخف أثناء الصيام.
- طاقة منخفضة — تأكد أن وجباتك تغطي البروتين والألياف والدهون الصحية؛ عشاء من الأرز وحده سيفشل.

## ماذا تأكل حين تأكل؟

نافذة الأكل ليست حلبة حرة. أعطِ الأولوية للبروتين والخضار والحبوب الكاملة والدهون الصحية. كسر الصوم بوجبة متوازنة — لا بمعجنات سكرية — يحافظ على ثبات الطاقة ويقلل الرغبة الشديدة.

## الخلاصة

ينجح الصيام المتقطع مع كثيرين، لكنه ليس سحرًا ولا يناسب الجميع. أفضل نهج هو ما تستطيع الحفاظ عليه بحياة اجتماعية طبيعية وسكر مستقر. وعند الشك، تحدث مع مختص — وتوقف الصيام دائمًا إذا أرسل جسدك إشارات واضحة أن ثمة خطأ.`,
  },
  takeaways: {
    en: [
      'IF is an eating schedule, not a food list — 16:8 and 14:10 are common.',
      'Evidence supports modest weight loss and better insulin sensitivity.',
      'Don\'t fast with insulin or sulfonylureas, during pregnancy, or with an eating-disorder history.',
      'Hypoglycemia risk is real — break the fast at the first warning signs.',
      'Prioritize protein, fiber, and healthy fats inside the eating window.',
    ],
    ar: [
      'الصيام المتقطع جدول أكل لا قائمة طعام — الأنماط الشائعة 16:8 و14:10.',
      'الأدلة تدعم إنقاص وزن معتدل وحساسية أنسولين أفضل.',
      'لا تصم مع استخدام الأنسولين أو السلفونيل يوريا أو الحمل أو تاريخ اضطرابات الأكل.',
      'خطر انخفاض السكر حقيقي — اكسر الصوم عند أولى علامات التحذير.',
      'أعطِ الأولوية للبروتين والألياف والدهون الصحية داخل نافذة الأكل.',
    ],
  },
};

export const ARTICLES: Article[] = [
  HBA1C,
  BLOOD_PRESSURE_MYTHS,
  LOWER_CHOLESTEROL,
  GOUT_FLARE_UPS,
  SCIENCE_OF_SLEEP,
  PCOS_INSULIN,
  MINDFUL_EATING,
  STRENGTH_TRAINING,
  INTERMITTENT_FASTING,
];

export const getArticleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug);