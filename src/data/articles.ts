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

HbA1c (glycated hemoglobin) measures the average amount of glucose attached to your red blood cells over the past 8–12 weeks. [The CDC explains how the A1C test reflects average blood sugar over roughly three months](https://www.cdc.gov/diabetes/diabetes-testing/prediabetes-a1c-test.html). Unlike a finger-stick test, which gives a single snapshot, HbA1c shows the bigger picture — how well your blood sugar has been controlled over time.

Hemoglobin is the protein inside red blood cells that carries oxygen. When glucose is present in your blood, it binds to hemoglobin. The more glucose you have circulating, the more hemoglobin becomes glycated. Since red blood cells live about 3 months, the HbA1c percentage reflects roughly a 3-month average.

## Why It Matters

Your HbA1c number is one important blood test for diagnosing and monitoring diabetes. [The CDC describes the commonly used A1C ranges for prediabetes and diabetes](https://www.cdc.gov/diabetes/diabetes-testing/prediabetes-a1c-test.html):

- Below 5.7% — normal range.
- 5.7–6.4% — prediabetes.
- 6.5% or higher — diabetes (confirmed on a second test).

Lowering HbA1c may reduce the risk of complications affecting the eyes, kidneys, and nerves. The size of any benefit varies by person; discuss your individual targets with your clinician.

## How to Move the Number

Your HbA1c responds slowly but steadily to consistent habits:

- **Test regularly** — every 3–6 months as advised by your doctor.
- **Choose low-glycemic foods** — legumes, whole grains, vegetables, and lean proteins.
- **Move more** — 150 minutes of moderate activity weekly helps your body use insulin better.
- **Keep numbers together** — your doctor combines HbA1c with home glucose readings to adjust treatment.
- **Stay consistent** — daily habits beat dramatic short-term changes.

## What Can Fool the Result

Certain situations can make HbA1c less reliable: recent blood loss or transfusions, anemia, pregnancy, kidney disease, and some hemoglobin variants. [The NIDDK explains factors that can affect A1C test accuracy](https://www.niddk.nih.gov/health-information/diagnostic-tests/a1c-test). If your result doesn't match your home readings, discuss this with your clinician.

## The Bottom Line

 HbA1c is a powerful, evidence-based benchmark for your metabolic health. Pair it with regular glucose checks, a sustainable eating pattern, and activity you enjoy — and you give yourself the clearest picture of lasting control.

## How to Use a Result in Real Life

### Compare like with like

An A1C result is most useful as part of a trend. A clinician may order it every three months while a treatment plan is changing, then less often once glucose is stable. Bring your home meter or continuous glucose monitor (CGM) reports to the visit. If your sensor shows frequent overnight lows while A1C remains high, an average alone can hide important swings. Ask what the number means alongside time-in-range, symptoms, medicines, and your personal goals.

### Make a plan that fits an ordinary week

For a US household, useful changes do not require specialty products. At a supermarket, compare unsweetened oatmeal, beans, frozen vegetables, plain yogurt, eggs, and whole-grain bread. A breakfast of oats with berries and nuts, or eggs with beans and a corn tortilla, adds fiber or protein that can slow digestion. At lunch, a bean-and-vegetable bowl is often more practical than trying to overhaul every meal. Portion, medication, and glucose responses differ, so record what works rather than assuming one menu fits everyone.

## Build a Monitoring Routine

### Match checks to the question

Finger-stick checks answer a moment-specific question, such as how a meal or workout affects glucose. A CGM estimates glucose in fluid under the skin and reveals direction and patterns between checks. Neither replaces clinical interpretation. If readings seem inconsistent with how you feel, follow the device instructions for confirmation and contact your care team. People using insulin or medicines that can cause low glucose need an individualized plan for exercise, driving, illness, and missed meals.

In the United States, access varies by insurance, clinic, and device eligibility. Ask a diabetes educator, pharmacist, or clinician which supplies are covered and how to use them safely. Keep a brief note of medication changes, illness, sleep disruption, and unusual activity beside readings; these details can explain a surprising result better than a long food diary.

## When A1C Needs Context

 Anemia, recent blood loss or transfusion, pregnancy, kidney disease, and some inherited hemoglobin differences can alter the relationship between A1C and average glucose. A clinician may use another test or rely more on direct glucose records in those situations. Do not change a prescription based on one lab result. Ask whether the test was done at the expected interval, whether the lab value matches your daily experience, and what next step is safest. The goal is a shared plan that improves health while avoiding troublesome lows and unnecessary blame.

## A Brief Visit Checklist

Before an appointment, write down one question you most want answered, such as whether your target should change or what to do about overnight lows. Bring medication names, recent lab results, and a few representative glucose readings rather than trying to remember every detail. If transportation, appointment cost, or language access makes follow-up difficult, tell the clinic; staff may know about community services or remote visits. Ask for the plan in writing, including when to repeat the test and whom to contact if readings change. A clear next step turns a lab result into useful care.`,
    ar: `## ما هو اختبار HbA1c؟

يقيس HbA1c (الهيموغلوبين السكري) متوسط كمية الجلوكوز المرتبطة بخلايا الدم الحمراء خلال آخر 8 إلى 12 أسبوعًا. وعلى عكس اختبار وخز الإصبع الذي يمنحك لقطة واحدة فقط، يُظهر HbA1c الصورة الكاملة — أي مدى جودة ضبط سكر الدم لديك عبر الزمن.

الهيموغلوبين بروتين موجود داخل خلايا الدم الحمراء ينقل الأكسجين. وعندما يوجد الجلوكوز في الدم، يرتبط بالهيموغلوبين. وكلما زاد الجلوكوز في مجرى الدم، أصبح المزيد من الهيموغلوبين سكريًا. وبما أن خلايا الدم الحمراء تعيش نحو ثلاثة أشهر، فإن نسبة HbA1c تعكس متوسطًا يمتد لحوالي ثلاثة أشهر.

## لماذا يهم هذا الاختبار؟

يُعد رقم HbA1c أهم فحص دم لتشخيص مرض السكري ومتابعته:

- أقل من 5.7% — نطاق طبيعي.
- من 5.7% إلى 6.4% — مرحلة ما قبل السكري.
- 6.5% أو أكثر — إصابة بالسكري (بعد تأكيد الفحص مرة ثانية).

قد يساعد خفض HbA1c على تقليل خطر المضاعفات التي تصيب العينين والكليتين والأعصاب. ويختلف حجم الفائدة من شخص لآخر؛ ناقش أهدافك الفردية مع طبيبك.

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
      'Lowering HbA1c may reduce the risk of complications; individual results vary.',
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

Age is only one risk factor. A healthy-looking person in their 30s can still have elevated pressure, especially with weight gain, salty processed food, and stress. Early detection may reduce the risk of damage that can accumulate over time. Ask a healthcare professional how often you should have your blood pressure checked.

## The Takeaway

 Don't wait for symptoms — they may never come. Measure your blood pressure regularly, follow your doctor's plan, and keep building the small daily habits that protect your heart for decades.

## Get a Reliable Reading at Home

### Use a repeatable setup

Choose a validated automatic cuff that fits your upper arm; a cuff that is too small can produce a falsely high result. For 30 minutes beforehand, avoid exercise, nicotine, and caffeinated drinks. Empty your bladder, sit quietly for five minutes, rest your back against the chair, keep both feet flat, and support your arm at heart level. Place the cuff on bare skin. Take two readings about one minute apart and record both with the date and time. Bring the monitor to a clinic visit occasionally so staff can compare it with their equipment.

For example, someone who gets a high reading after rushing through a pharmacy may repeat it calmly at home for a week. A log is more informative than a single number, but do not delay urgent care for severe symptoms. Chest pain, trouble breathing, new weakness, confusion, or a sudden severe headache alongside a very high reading warrants emergency evaluation. Follow local emergency guidance rather than trying to lower pressure rapidly on your own.

## What the Numbers Do and Do Not Say

Blood pressure has two values: systolic pressure while the heart contracts and diastolic pressure between beats. Diagnosis depends on repeated measurements and a clinician's assessment, not one isolated result. US professional guidelines use categories to guide follow-up, but thresholds and treatment decisions depend on overall risk, age, pregnancy, kidney health, and other conditions. Ask your clinician which target applies to you and when to recheck.

### Lifestyle is helpful, not a substitute for care

Regular movement, a pattern rich in vegetables, fruit, beans, whole grains, and unsalted nuts, and less sodium can help many people. A practical grocery-store step is to compare two canned soups or sauces and choose the lower-sodium option, then add frozen vegetables or beans. A short walk after dinner may be easier to sustain than an ambitious new workout. These steps support care; they do not make prescribed medicine unnecessary.

## Bring Better Questions to Your Appointment

 Ask whether home or 24-hour monitoring would clarify your pattern, whether any medicine or supplement could affect readings, and when a follow-up is needed. Share missed doses honestly so your clinician can solve barriers without judgment. If cost, transportation, or pharmacy access is an issue, ask about lower-cost options or community health resources. A clear plan should say what to do after an unusual reading, how often to measure, and which symptoms require prompt help.

## Screening Is Different From Diagnosis

Blood pressure screening is useful because hypertension often has no symptoms, but a screening result is not the whole diagnosis. A clinician may repeat measurements on another day or recommend home monitoring to reduce the effects of a rushed visit or unfamiliar setting. Pregnancy, kidney disease, sleep apnea, and some over-the-counter products can change the care plan. Bring a complete medication and supplement list, including cold remedies, and ask before making changes. Consistent follow-up can identify a rising pattern early and help you choose a safe response rather than reacting to one surprising number.`,
    ar: `## خرافة 1: «ارتفاع ضغط الدم يسبب أعراضًا واضحة»

معظم المصابين بارتفاع ضغط الدم لا يشعرون بأي شيء — وهذا ما يجعله خطيرًا. نادرًا ما يسبب صداعًا أو دوارًا أو احمرارًا في الوجه إلا عندما ترتفع المستويات بشكل خطير. الطريقة الوحيدة الموثوقة لمعرفة أرقامك هي قياسها. إذا تجاوزت الأربعين، أو كنت تعاني زيادة الوزن، أو لديك تاريخ عائلي، فافحص بانتظام في المنزل أو لدى الصيدلية.

## خرافة 2: «الملح وحده يسبب ارتفاع ضغط الدم»

الملح مهم، لكنه ليس القصة كاملة. الإفراط في الصوديوم يجعل الجسم يحتفظ بالسوائل، مما يرفع الضغط لدى من هم حسّاسون للملح. لكن السعرات والكحول والخمول والتوتر والوراثة تلعب دورًا لا يقل أهمية. تقليل الملح يساعد، لكنه يعمل بشكل أفضل مع نمط غذائي متوازن ونشاط منتظم والتحكم في الوزن.

## خرافة 3: «يمكنني التوقف عن دوائي بمجرد انخفاض الأرقام»

التوقف المفاجئ قد يسبب عودة الضغط بسرعة، وأحيانًا أعلى من البداية. عادةً ما توصف أدوية الضغط لإبقائك ضمن نطاق صحي — وليست علاجًا نهائيًا. لا توقف أو تعدّل الدواء بنفسك أبدًا. إذا أردت تقليله، اعمل مع طبيبك على تغييرات تدريجية مع تحسين نمط حياتك.

## خرافة 4: «قراءة الصيدلي صحيحة دائمًا»

قراءة مرتفعة واحدة لا تؤكد الإصابة. يتقلب ضغط الدم مع التوتر والكافيين والتمارين وحتى وقت اليوم. عادةً ما يؤكد الأطباء التشخيص عبر عدة زيارات أو بجهاز مراقبة لمدة 24 ساعة. للاستخدام المنزلي، خذ قراءتين صباحًا وقراءتين مساءً لمدة أسبوع، ثم خذ المتوسط إلى موعدك الطبي.

## خرافة 5: «أنا صغير جدًا على القلق بشأن ضغط الدم»

العمر مجرد عامل واحد من عوامل الخطر. فالشخص الذي يبدو بصحة جيدة في الثلاثينيات قد يكون ضغطه مرتفعًا، خاصة مع زيادة الوزن والأطعمة المصنعة المالحة والتوتر. قد يساعد الاكتشاف المبكر على تقليل خطر الأضرار التي قد تتراكم بمرور الوقت. اسأل مختص الرعاية الصحية عن عدد مرات فحص ضغط الدم المناسبة لك.

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

 A cholesterol panel shows LDL, HDL, total cholesterol, and triglycerides. Talk to your doctor about your target levels — they depend on your age and risk profile. Nutrition won't always replace medication, but it makes every dose work better.

## Turn the Advice Into a US Grocery Plan

### Build a flexible plate

At a neighborhood supermarket, start with affordable staples: oats, dry or no-salt-added canned beans, brown rice, frozen vegetables, apples, peanut butter, and plain yogurt. A bowl of oatmeal with fruit at breakfast, bean chili at lunch, or lentils with vegetables at dinner can add soluble fiber without complicated cooking. Use olive or canola oil in place of butter when it suits the recipe. Frozen produce is nutritious and often reduces waste; rinsing canned beans can lower some of their sodium.

For a familiar meal, keep the flavor and change the balance: serve a smaller portion of a creamy pasta with extra vegetables and beans, choose grilled chicken or fish more often, or use avocado and tomato in place of a high-saturated-fat spread. These are options, not rules. Cultural foods, budget, allergies, and preferences matter; the best pattern is one a household can repeat.

## Understand the Biology and Your Lab Report

LDL particles carry cholesterol through the blood. When too many circulate over time, cholesterol can enter artery walls and contribute to plaque. HDL participates in cholesterol transport, while triglycerides reflect another type of circulating fat; a panel is interpreted as a whole. Food choices can influence these values, but genes, thyroid function, diabetes, age, and some medicines also matter. That is why two people eating similarly may have different results.

### Ask about risk, not just one target

In US care, clinicians may combine cholesterol measurements with age, blood pressure, smoking history, diabetes, and family history to estimate cardiovascular risk. Ask when to repeat the panel, whether a family pattern suggests inherited risk, and whether medication is recommended. Statins and other lipid-lowering therapies reduce risk for many people. Nutrition complements appropriate treatment; it should not be used as a reason to stop a prescribed medicine without medical guidance.

## Make Progress Measurable

 Choose one or two changes for the next month, such as adding beans several times weekly or taking a brisk 10-minute walk after lunch. Check labels for saturated fat, fiber, and sodium, and look past front-of-package claims. A clinician or registered dietitian can help adapt the plan to kidney disease, diabetes, pregnancy, food insecurity, or a medication schedule. If a change is too costly or difficult, say so; a workable alternative is better than an ideal plan that never happens.

## Be Cautious With Supplements

Products marketed for heart health can interact with prescriptions, vary in quality, or lack strong evidence for lowering cardiovascular risk. “Natural” on a package does not guarantee safety. Before using a supplement, share its exact name and dose with a pharmacist or clinician, especially if you take a statin, blood thinner, or medicine for blood pressure. A food-first pattern is usually easier to evaluate and can provide fiber and other nutrients together. If your cholesterol remains elevated despite careful habits, that is not proof you failed; inherited biology and other health factors can make medication an important part of prevention.`,
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

 A single flare needs evaluation: long-term untreated gout can damage joints and kidneys. Medication to lower urate may be appropriate; your doctor can advise whether you need it. During a flare, anti-inflammatory treatment can shorten symptoms. Let your blood tests guide the decision — not just your pain.

## A Practical Eating Pattern During the Week

### Use familiar, lower-purine choices

There is no single gout diet that treats every person, but a balanced pattern can support overall health. Build meals around vegetables, fruit, whole grains, beans, eggs, and low-fat dairy if tolerated. In a US grocery store, useful options include oatmeal, plain yogurt, frozen vegetables, brown rice, and canned beans rinsed under water. Keep water available through the day, especially during hot weather or exercise, unless a clinician has limited your fluids for another condition.

You do not need to eliminate every plant food that contains purines. Research does not show the same gout risk from vegetables such as spinach, peas, lentils, or mushrooms as from certain animal foods. Avoid extreme fasting or rapid weight-loss plans; sudden changes in metabolism and dehydration may trigger symptoms. Gradual weight management, if appropriate, is safer and easier to maintain.

## Recognize Triggers Without Over-Restricting

Common contributors include dehydration, heavy alcohol use, and sugar-sweetened drinks. Reducing large portions of organ meats and some seafood may help people with gout, but individual patterns vary. Keep a short, nonjudgmental log of flares, meals, fluids, illness, and medicine changes. One episode after a meal does not prove a cause; look for repeated patterns and review them with a clinician. Restrictive eating can make it harder to get adequate nutrition and does not replace urate-lowering therapy when that treatment is indicated.

### Plan for restaurants and travel

At a diner, consider eggs, oatmeal, vegetables, or a bean-based side, and request water or an unsweetened drink. At a barbecue or family gathering, choose the foods that fit your needs without turning the meal into a test of willpower. During travel, carry a refillable water bottle and take prescribed medicine as directed. If you have kidney disease, heart failure, or a fluid restriction, ask your care team before increasing water intake.

## Flares Need Medical Care

 A hot, swollen joint can have causes other than gout, including infection, so a first episode needs prompt assessment. Contact a clinician early when symptoms begin; anti-inflammatory treatment works best when selected safely for your health history. Do not start, stop, or change urate-lowering medicine during a flare unless your prescriber tells you to. Seek urgent care for fever, rapidly worsening redness, severe illness, or inability to use the joint. Long-term prevention may include medication, regular lab monitoring, and a realistic food and hydration plan.

## Keep a Flare Plan Ready

Ask your clinician which number to call during business hours and where to go after hours. Keep the prescribed flare medicine and instructions accessible, and note any allergies or kidney, stomach, or heart conditions that affect treatment choices. If a flare limits walking, arrange help with errands and protect the joint from unnecessary pressure while following medical advice. A written plan is especially useful when traveling or when more than one clinician is involved. Review it after a medication change or a new diagnosis so the instructions stay current. Preparation cannot prevent every attack, but it can reduce delay and uncertainty when symptoms start.`,
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

 Pick one habit this week: a fixed wake-up time, no screens an hour before bed, or a 10-minute morning walk in sunlight. Consistency beats intensity.

## What Happens Across a Night

Sleep cycles through non-rapid eye movement (NREM) and rapid eye movement (REM) stages several times. Deep NREM sleep supports physical restoration, while REM sleep is involved in learning, emotion, and memory. The balance shifts toward more REM later in the night, so routinely cutting sleep short can remove part of that stage-rich morning period. There is no perfect nightly score: normal sleep varies with age, stress, illness, and schedule. A steady opportunity for sleep matters more than chasing every tracker metric.

### Circadian timing is part of the biology

The brain's internal clock coordinates sleepiness, alertness, temperature, and hormone rhythms. Morning light helps set that clock; bright light late at night can delay it for some people. Caffeine blocks adenosine signaling, a process that contributes to sleep pressure, and its effects can last many hours. Alcohol may make a person feel sleepy at first but can fragment sleep later. These mechanisms explain why timing can matter as much as the bedtime routine.

## A Realistic Plan for US Schedules

Work shifts, long commutes, caregiving, school schedules, and noisy housing can make a consistent bedtime difficult. Start with a repeatable wake time on most days and protect a sleep window that allows seven or more hours when possible. If you work nights, use a dark, cool room and reduce morning light on the trip home; discuss persistent fatigue with a clinician. A short wind-down routine can be reading, a warm shower, or calm breathing rather than an elaborate set of purchases.

For families, agree on one small household cue, such as dimming shared screens or preparing school items earlier. For a college student, moving the final coffee earlier and getting daylight between classes may be more realistic than a perfect schedule. Keep a simple two-week log of bedtime, wake time, naps, caffeine, and daytime alertness. It can reveal patterns without requiring an expensive wearable.

## When to Seek Help

 Loud snoring, witnessed pauses in breathing, gasping, morning headaches, or severe daytime sleepiness can signal sleep apnea. Risk is not limited to one body type; ask about evaluation if symptoms persist. Chronic insomnia is treatable, and cognitive behavioral therapy for insomnia (CBT-I) is often recommended as a first-line approach. A clinician can also review pain, mood, medication effects, restless legs, and shift-work concerns. Seek help sooner if sleepiness makes driving or operating equipment unsafe. Better sleep is a health behavior, not a personal virtue test.

## Track Symptoms, Not Just Hours

Two people can spend the same time in bed and feel very different the next day. Note whether you wake refreshed, struggle to stay alert, or have trouble concentrating, and include naps and shift changes in your log. A wearable can estimate patterns, but consumer devices do not diagnose a sleep disorder. If the data makes you anxious, stop checking it and focus on how you function. Ask a clinician about persistent symptoms, especially when they affect work, school, caregiving, or driving. The best sleep plan is measured by safer, more restorative days—not by a perfect streak on an app.`,
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

 PCOS is a medical condition, not a personal failure. Small, steady changes — one better breakfast, one more evening walk — compound into meaningful improvement over months. Work with a doctor and registered dietitian who take insulin resistance seriously, because the right team changes everything.

## How Diagnosis and Testing Work

PCOS is diagnosed from a pattern, not from one ultrasound image or a single hormone result. Clinicians generally assess irregular or absent ovulation, signs of higher androgen activity such as acne or unwanted hair growth, and ovarian appearance when imaging is appropriate. Other causes, including thyroid conditions and elevated prolactin, may need to be ruled out. The exact approach varies by age and symptoms, so a clinician should interpret results in context rather than applying an online checklist.

### Useful questions for a US appointment

Ask whether glucose testing, cholesterol measurements, blood pressure, and screening for sleep or mood concerns are appropriate. Some people with PCOS have insulin resistance even when their weight is within a typical range, and some do not; body size alone cannot diagnose it. A primary care clinician, gynecologist, endocrinologist, or registered dietitian may each help with part of the plan. Bring a list of cycle dates, symptoms, medications, and family history to make a short appointment more productive.

## Choose Habits That Are Sustainable

There is no required PCOS menu. A balanced pattern with fiber-rich carbohydrates, protein, unsaturated fats, and vegetables can support energy and cardiovascular health. Examples from an American supermarket include oatmeal with plain yogurt and berries, a bean-and-vegetable burrito, or salmon with brown rice and frozen broccoli. If grocery costs are a concern, canned beans, eggs, store-brand oats, and frozen produce can be practical options. Regular meals may help some people avoid intense hunger; others prefer a different rhythm. Track how you feel and ask a dietitian for culturally familiar choices.

Movement can improve insulin sensitivity even before the scale changes. Walking, dancing, cycling, resistance exercises, or active play all count. Begin with a manageable target, such as a ten-minute walk after dinner, and build gradually. Sleep and stress support matter too, but no routine can guarantee a particular hormone result. Supplements advertised as a cure often have limited evidence and can interact with medicines; discuss them before use.

## Treatment Can Address Different Goals

 Treatment is individualized. Metformin may be considered for glucose-related goals, while hormonal contraceptives may help regulate cycles or acne for some people. Other options may support fertility or specific symptoms. These choices depend on medical history, pregnancy plans, side effects, and preferences. Medication is not a failure, and lifestyle changes are not a substitute for care when treatment is needed. PCOS can change over time, so revisit the plan if cycles, mood, sleep, or metabolic results shift. You deserve care that treats symptoms seriously and avoids blaming language.

## Monitor More Than One Marker

Ask what success should look like for your own goals. Regular cycles may matter to one person, while another may prioritize acne, fertility, glucose, cholesterol, or energy. No single body measurement captures all of these outcomes. Agree on which labs or symptoms to review and when to follow up, and keep copies of results if you see several specialists. If a plan causes unwanted effects or is too difficult to maintain, report that early so it can be adjusted. PCOS care is often a series of informed decisions over time, not a one-time instruction sheet.`,
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

 Pick one meal a day — often breakfast or lunch — and eat that meal mindfully. When the habit stabilizes, expand to a second. Mindful eating isn't about perfection; it's about returning, again and again, to the present moment of the meal.

## Make It Work in a Busy Day

Mindfulness does not require a silent room or a long meditation. Before opening lunch at a desk, pause for one slow breath and notice whether you feel hungry, tired, rushed, or stressed. If your break is short, put the phone aside for the first few bites and then eat as needed. At a family dinner, conversation can be part of the pleasure; attention does not mean eating alone or policing every bite. The aim is to notice enough to make a choice, not to follow a rigid ritual.

### Use attention, not food rules

Try describing the first bite: temperature, texture, flavor, and how satisfying it feels. Halfway through, check whether you want more and whether the food still tastes as good. This creates room to respond to comfort and preference. It does not require stopping at a prescribed number or ignoring physical hunger. Hunger and fullness are signals, not grades. Some people have muted signals because of medication, stress, illness, or a history of restrictive eating; external meal structure may be more helpful for them.

## Navigate Common US Eating Situations

At a drive-through or campus dining hall, take a moment to choose what will be filling and enjoyable within your budget. You might add fruit, vegetables, beans, or yogurt when available, while still selecting a familiar main dish. At a baseball game, a celebration, or a work lunch, decide what you genuinely want rather than labeling foods good or bad. If a meal is rushed, return to the practice at the next opportunity; one distracted meal does not undo anything.

For grocery shopping, use a list and notice which foods make easy meals at home. Keep convenient options like canned beans, frozen vegetables, fruit, and whole-grain bread if they suit your household. Mindful eating can include planning: a snack before a long commute may prevent arriving uncomfortably hungry. People managing diabetes or other conditions should follow their medical meal plan and use mindfulness as an addition, not a replacement.

## When Mindfulness Is Not the Main Tool

 If eating brings panic, intense guilt, binge episodes, or severe restriction, seek support from a qualified clinician or eating-disorder professional instead of trying to fix it with willpower. Food insecurity also changes what choices are possible; community food programs and a social worker may be more useful than another set of meal rules. A gentle practice can improve awareness, but it cannot solve every emotional, medical, or economic barrier. Start with one nonjudgmental observation, and treat yourself with the same patience you would offer a friend.

## Try a Two-Minute Practice

At your next snack, pause to notice the food and your surroundings. Take one comfortable breath, look at the portion, and check whether you feel physical hunger or another need such as rest or company. Eat a few bites at a relaxed pace and notice flavor and texture. You are free to continue eating; the purpose is observation, not restraint. If the practice feels uncomfortable, return to a familiar routine or ask a professional for guidance. Repeating a small, safe experiment can teach you what attention feels like without turning every meal into a project.`,
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

 Twice a week: 8–12 reps of chair squats, wall push-ups, seated rows with a band, and hip bridges — two sets each, with 60 seconds of rest. When two sets feel easy, add a third. That's it. Consistency — two honest sessions a week — changes more than any intense weekend workout.

## Why Muscle Helps Regulate Glucose

When a muscle contracts, it moves glucose transporters toward the cell surface through pathways that do not rely entirely on insulin. After exercise, muscles also become more responsive to insulin as they replenish stored glycogen. Over time, progressive resistance training can increase or preserve lean muscle, giving the body more tissue that can use and store glucose. These effects complement medication and aerobic activity; they do not mean that every workout produces the same glucose response.

### Start with access, not equipment

In the United States, a community recreation center, YMCA, physical therapy clinic, or home routine may all be reasonable starting points. A sturdy chair, a light resistance band, or bodyweight movements can provide a training stimulus. If cost or transportation is a barrier, ask a diabetes educator or community health program about local options. Choose exercises you can perform safely in a small space, and increase resistance only after technique feels steady.

## Build a Safe, Repeatable Session

Two nonconsecutive sessions each week is a realistic entry point for many adults. Work the large muscle groups with a chair squat or sit-to-stand, wall push-up, band row, and calf raise. Start with one set of 8–12 controlled repetitions, rest between movements, and stop before form breaks down. If the session feels manageable over several weeks, add a set or slightly more resistance. A five-minute warm-up and cool-down can make movement more comfortable.

People using insulin or medicines that can cause hypoglycemia should ask their care team how to check glucose and adjust food or medication around exercise. Keep fast-acting carbohydrate available if advised, carry identification, and learn your personal low-glucose symptoms. Some people see a short glucose rise after hard lifting, while others drop during or later; a log helps identify your pattern. Never change medication doses without a prescribed plan.

## Adapt for Complications and Everyday Life

Check feet for blisters and wear supportive shoes. Eye disease, neuropathy, heart disease, kidney disease, joint pain, or blood-pressure concerns may call for modified movements or clinical guidance before vigorous lifting. Avoid breath-holding during repetitions; exhale through the effort. Stop for chest pressure, faintness, unusual shortness of breath, or symptoms of low glucose and follow your emergency plan.

Try attaching training to a dependable cue, such as Monday and Thursday after work or before a favorite TV program. Mark sessions on a calendar and record energy, glucose observations, and resistance used. Progress is not limited to a heavier weight: getting out of a chair more easily, carrying groceries, and feeling confident are meaningful outcomes. A diabetes care team can help you adapt the plan as your health or schedule changes.`,
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

const HIGH_PROTEIN_MEAL_PREP: Article = {
  id: 'high-protein-meal-prep-weight-loss',
  slug: 'high-protein-meal-prep-weight-loss',
  category: 'nutrition',
  icon: '🥗',
  readTime: 7,
  publishedAt: '2026-11-03',
  tags: ['protein', 'meal-prep', 'weight-management', 'nutrition'],
  title: {
    en: 'High-Protein Meal Prep for Weight Loss',
    ar: 'تحضير وجبات غنية بالبروتين لدعم إدارة الوزن',
  },
  excerpt: {
    en: 'A practical, flexible US grocery-store approach to preparing filling meals with protein, fiber, and realistic portions.',
    ar: 'طريقة عملية ومرنة للتسوق وتحضير وجبات مشبعة تجمع البروتين والألياف وحصصًا مناسبة.',
  },
  content: {
    en: `## Why Meal Prep Can Help

Meal preparation is not a requirement for weight loss, but it can make a helpful choice easier on a busy day. Protein supports tissue repair and helps many people feel satisfied after eating. Pairing a protein source with vegetables, fruit, or whole grains adds fiber and volume, which can make meals more sustaining. The goal is not to maximize protein or eat identical containers all week. It is to create a few convenient building blocks that fit your appetite, budget, culture, and health needs.

Weight change is influenced by many factors, including energy intake, activity, sleep, medicines, stress, and health conditions. A meal-prep routine cannot guarantee a particular result. It can reduce last-minute decisions, make portions more predictable, and help you notice which meals keep you comfortable between meals. Use it as a tool, not a test of discipline.

## Start With a Simple Formula

### Choose a protein anchor

For each meal, select a protein you enjoy: chicken breast, eggs, salmon, canned tuna, beans, lentils, tofu, edamame, cottage cheese, or plain Greek yogurt. Portions depend on your needs; a palm-sized serving is an easy visual starting point for many adults, not a prescription. If you have kidney disease or have been given a protein limit, ask your clinician or registered dietitian before increasing intake.

### Add produce and a satisfying carbohydrate

Fill out the meal with colorful vegetables or fruit and a source of carbohydrate such as brown rice, oats, potatoes, corn tortillas, quinoa, or whole-grain bread. Carbohydrates are not automatically a barrier to weight management. Fiber-rich choices digest more slowly and supply nutrients. Add flavor with citrus, herbs, salsa, mustard, vinegar, garlic, or a modest amount of dressing instead of relying on a single bland menu.

## A US Grocery-Store Prep Session

Choose two proteins, two vegetables, and one or two grains for several mix-and-match meals. For example, roast chicken breast and broccoli, cook a pot of brown rice, and rinse canned black beans. In another batch, bake salmon and roast sweet potatoes with frozen green beans. Fresh, frozen, and canned foods can all work; compare sodium on canned items and rinse beans when useful. Store-brand oats, eggs, frozen vegetables, and dry beans can help manage cost.

Set aside about an hour on a day that suits your household. Wash produce, cook foods to safe temperatures, divide portions into shallow containers, and refrigerate promptly. Keep cooked food cold and use it within recommended food-safety windows; freeze portions you will not eat soon. Pack sauces separately so vegetables do not become soggy. If the week changes, ingredients can be repurposed into soup, wraps, salads, or grain bowls.

## Sample Mix-and-Match Meals

### Breakfast and lunch ideas

Prepare overnight oats with plain yogurt, berries, and chia seeds, or cook egg-and-vegetable cups that can be reheated. For lunch, combine chicken, brown rice, spinach, salsa, and avocado; swap in beans or tofu when you want a plant-based meal. A tuna-and-white-bean salad with whole-grain crackers is another portable option. These examples are not fixed calorie prescriptions. Adjust amounts to hunger, activity, medication needs, and advice from your care team.

### Dinner without a separate menu

Serve a shared meal and portion your plate in a way that feels satisfying: protein, a generous vegetable side, and a grain or starchy vegetable. For instance, use roasted salmon, broccoli, and a baked potato, then change seasonings across the week. A family can share the same base foods while choosing different sauces or portions. This lowers the burden of preparing a separate meal and supports habits that can last beyond a short-term plan.

## Avoid Common Prep Problems

Cooking too many portions of one recipe can lead to boredom. Prepare components rather than identical meals, rotate seasonings, and leave a couple of meals flexible. Another common issue is making portions so small that hunger returns quickly. Include enough food to feel satisfied and add a planned snack, such as fruit with yogurt or vegetables with hummus, if your schedule calls for it.

Do not judge a meal by a front-label claim or by its protein number alone. Check the ingredient list, fiber, sodium, and added sugars in packaged sauces and snacks. Convenience foods can be part of a balanced routine; choosing plain frozen vegetables or lower-sodium canned beans is an option, not a moral rule. If tracking food increases anxiety or restrictive behavior, step away from tracking and seek support from a qualified professional.

## Make the Routine Personal

Start with two meals for the week rather than preparing every breakfast, lunch, and dinner. Notice which foods are affordable and enjoyable, then repeat the successful parts. People with diabetes may need to coordinate meal timing and carbohydrate portions with medication. People who are pregnant, recovering from illness, or managing digestive or kidney conditions may need individualized advice. A registered dietitian can help adapt protein targets and recipes to those needs.

The most useful meal prep is flexible enough to survive a busy Wednesday. Keep a few quick options available, use leftovers safely, and allow restaurant meals or family dinners without treating them as failure. A repeatable structure—protein, produce, fiber-rich carbohydrates, and flavor—can support fullness and make nutritious meals easier to reach while you pursue gradual, sustainable weight change.`,
    ar: `## لماذا قد يساعد تحضير الوجبات؟

تحضير الطعام ليس شرطًا لإنقاص الوزن، لكنه يجعل الخيارات المناسبة أسهل في الأيام المزدحمة. يساعد البروتين على إصلاح الأنسجة وقد يزيد الشعور بالشبع لدى كثيرين. وعند جمعه مع الخضروات أو الفاكهة أو الحبوب الكاملة، تضيف الألياف حجمًا ومغذيات تساعد على استمرار الشبع. الهدف هو تجهيز مكونات مرنة تناسب ذوقك وميزانيتك، لا تناول وجبات متطابقة طوال الأسبوع.

## ابدأ بتركيبة بسيطة

اختر مصدر بروتين تستمتع به، مثل الدجاج أو البيض أو السمك أو الفاصوليا أو العدس أو التوفو أو اللبن اليوناني. أضف الخضروات أو الفاكهة ومصدرًا للكربوهيدرات الغنية بالألياف مثل الشوفان أو الأرز البني أو البطاطا أو خبز الحبوب الكاملة. يمكن استخدام الليمون والأعشاب والصلصة والخل لإضافة النكهة. إذا كانت لديك حالة صحية أو حدّ طبي للبروتين، استشر طبيبك أو اختصاصي التغذية قبل تغيير الكمية.

## تسوق وجهّز ما يناسب أسبوعك

اختر نوعين من البروتين ونوعين من الخضار وحبوبًا أو اثنتين، ثم حضّرها بطرق مختلفة. الدجاج مع الأرز والخضار يمكن أن يصبح وعاءً أو لفافة، ويمكن استبدال الدجاج بالفاصوليا أو التوفو. المنتجات الطازجة والمجمدة والمعلبة خيارات ممكنة؛ قارن الصوديوم واشطف الفاصوليا المعلبة عند الحاجة. قسّم الطعام المطبوخ في أوعية ضحلة وبرّده سريعًا، وجمّد الحصص التي لن تستخدمها قريبًا.

## اجعل الخطة واقعية

ابدأ بتحضير وجبتين فقط، ولا تجعل الحصص صغيرة لدرجة تعود الجوع سريعًا. حضّر المكونات بدلًا من وجبات متطابقة، وغيّر التوابل وأضف وجبات مرنة للعائلة أو المطعم. الأطعمة الجاهزة قد تناسب نمطًا متوازنًا؛ لا حاجة إلى اعتبار الطعام جيدًا أو سيئًا. إذا زاد تتبع الطعام القلق أو السلوك التقييدي، أوقفه واطلب الدعم المناسب.

قد يحتاج المصابون بالسكري إلى تنسيق توقيت الوجبات والكربوهيدرات مع الأدوية، وقد يحتاج مرضى الكلى إلى هدف بروتين خاص. يستطيع اختصاصي التغذية تعديل الخطة لهذه الاحتياجات. أفضل تحضير هو ما يمكن الاستمرار عليه في يوم مزدحم: بروتين وخضار وألياف ونكهة، مع مرونة تسمح بالتدرج دون السعي إلى الكمال.`,
  },
  takeaways: {
    en: [
      'Meal prep can reduce daily decisions, but it is optional and should stay flexible.',
      'Pair a protein source with produce and a fiber-rich carbohydrate for satisfying meals.',
      'Use affordable fresh, frozen, and canned ingredients and follow safe storage practices.',
      'Avoid overly small portions and adapt protein goals to medical advice.',
      'Start with a few repeatable meals rather than an all-or-nothing weekly plan.',
    ],
    ar: [
      'تحضير الوجبات اختياري ويساعد على تقليل القرارات اليومية إذا بقي مرنًا.',
      'اجمع البروتين مع الخضار أو الفاكهة ومصدر للكربوهيدرات الغنية بالألياف.',
      'استخدم مكونات طازجة أو مجمدة أو معلبة واتبع قواعد حفظ الطعام الآمن.',
      'تجنب الحصص الصغيرة جدًا واستشر المختص بشأن احتياجات البروتين الطبية.',
      'ابدأ بعدد قليل من الوجبات السهلة بدل خطة أسبوعية صارمة.',
    ],
  },
};

const READ_NUTRITION_LABELS: Article = {
  id: 'how-to-read-nutrition-labels',
  slug: 'how-to-read-nutrition-labels',
  category: 'nutrition',
  icon: '🏷️',
  readTime: 7,
  publishedAt: '2026-11-03',
  tags: ['nutrition-label', 'serving-size', 'added-sugar', 'sodium'],
  title: {
    en: 'How to Read Nutrition Labels',
    ar: 'كيف تقرأ الملصق الغذائي',
  },
  excerpt: {
    en: 'A practical guide to serving sizes, calories, nutrients, ingredients, and comparing packaged foods in US stores.',
    ar: 'دليل عملي لفهم الحصة والسعرات والمغذيات والمكونات ومقارنة الأطعمة المعبأة.',
  },
  content: {
    en: `## Start With the Serving Size

The Nutrition Facts label is designed to help you compare packaged foods, but its numbers describe a stated serving—not automatically the entire package. Look first at serving size and servings per container. A drink bottle or snack bag may contain more than one serving, so eating or drinking all of it can mean consuming multiple servings of the listed calories and nutrients. The amount shown is a reference for the label, not a recommendation for how much you must eat.

### Compare the amount you actually use

If one cereal lists a serving as one cup and another lists three-quarters of a cup, compare the labels using the same amount before deciding which better fits your needs. You can use the serving values, calculate a proportional amount, or compare per 100 grams when packages provide that information. At home, a measuring cup can teach what a serving looks like; you do not need to measure every meal indefinitely.

## Understand Calories and Daily Value

Calories estimate energy in one labeled serving. Individual energy needs vary with body size, age, activity, health, and goals, so a single number is not a universal limit. The % Daily Value (%DV) gives context for how much a nutrient in one serving contributes to a general daily reference. As a quick guide, 5% DV or less is considered low and 20% DV or more high for a nutrient, but these are comparison tools rather than personal prescriptions.

For example, a person watching sodium may compare two canned soups and choose the one with less sodium per serving, while someone trying to increase fiber may compare oatmeal or whole-grain bread. The best choice depends on the whole diet, medical advice, price, taste, and how the food will be used. A label does not determine whether a food is “good” or “bad.”

## Know Which Nutrients to Check

### Nutrients many people limit

The label lists saturated fat, sodium, and added sugars because consuming too much of these can affect health for many people. Check serving size before comparing. Sauces, packaged soups, frozen entrées, and snacks can contribute sodium across the day. Added sugars are separate from naturally occurring sugars in plain milk and whole fruit. Ingredients such as syrups, honey, and words ending in “-ose” can indicate added sweeteners, though the label’s added-sugar line is the quickest comparison.

### Nutrients to get enough of

Dietary fiber, vitamin D, calcium, iron, and potassium are among the nutrients listed on many labels. Fiber supports digestive health and can help meals feel filling; beans, oats, fruit, vegetables, and whole grains are useful sources. Calcium and vitamin D support bone health, while iron is essential for oxygen transport. Needs vary, and a food label is only one part of a varied eating pattern. If a clinician has given you a specific target, use that guidance rather than a general %DV.

## Read the Ingredient List

Ingredients are listed by weight, from most to least, so the first few usually make up most of the product. The list can help identify whole grains, allergens, oils, flavorings, and sweeteners that are not obvious from the front of the package. A long list does not automatically mean a product is unhealthy, and unfamiliar words do not necessarily signal danger. People with allergies should read the allergen statement and manufacturing notes, and contact the company if the information is unclear.

In US stores, front-of-package phrases such as “natural,” “multigrain,” or “made with whole grains” are not a substitute for checking the Nutrition Facts panel and ingredients. Look for a whole grain near the start of the ingredient list if that is a priority. Compare similar products rather than expecting one package to meet every goal.

## Compare Foods for Your Needs

### Make a quick side-by-side check

When choosing between two yogurts, compare serving size, added sugars, protein, and saturated fat. For bread, look at fiber, sodium, and whether a whole grain appears early in the ingredients. For canned beans, sodium and serving size may matter; draining and rinsing can reduce some surface sodium. For a frozen meal, compare sodium and portion size, then consider adding fruit or vegetables if that makes the meal more satisfying.

Do not compare unrelated foods as if one label could settle the question. A granola bar and a bowl of oatmeal serve different purposes. Allergies, diabetes, kidney disease, pregnancy, and medications can change which nutrients deserve attention. A registered dietitian can explain how to use labels without creating unnecessary restrictions.

## Use the Label Without Losing Perspective

Labels are tools for informed choices, not a scorecard for your worth or your health. A food that is convenient, affordable, and enjoyable can have a place in a balanced pattern. If numbers cause anxiety or lead to skipping meals, take a break from label checking and ask a healthcare professional for support. For most shopping trips, choose one priority—such as more fiber or less sodium—compare a few similar items, and move on. Small, repeatable decisions matter more than perfect shopping.

US Nutrition Facts labels follow federal requirements, but recipes and serving sizes change, so check the current package. When medical needs are complex, rely on your clinician or dietitian for individualized targets. With practice, the process becomes simple: check the serving, compare the nutrient that matters to you, scan ingredients when needed, and choose a product that fits your real life.`,
    ar: `## ابدأ بحجم الحصة

تصف أرقام الملصق الغذائي حصة محددة، وليس العبوة كلها بالضرورة. ابدأ بحجم الحصة وعدد الحصص في العبوة؛ فقد تحتوي زجاجة أو كيس وجبات خفيفة على أكثر من حصة. الكمية المكتوبة مرجع للمقارنة وليست توصية ملزمة بكمية ما ينبغي تناوله.

## افهم السعرات والقيمة اليومية

تقدّر السعرات الطاقة في الحصة، وتختلف احتياجات الأشخاص حسب العمر والنشاط والصحة والأهداف. تمنحك نسبة القيمة اليومية سياقًا عامًا؛ فالنسبة المنخفضة أو المرتفعة تساعد على مقارنة المنتجات، لكنها ليست وصفة شخصية. قارن منتجات متشابهة وبالحصة نفسها، مع مراعاة السعر والطعم وما يناسب احتياجاتك.

## اختر المغذيات التي تهمك

قد يقارن من يراقب الصوديوم بين الحساء المعلب، بينما يقارن من يريد زيادة الألياف بين الشوفان أو الخبز. يعرض الملصق الدهون المشبعة والصوديوم والسكريات المضافة، كما يعرض عناصر مثل الألياف والكالسيوم والحديد والبوتاسيوم. تختلف الأولويات باختلاف الحالة الصحية؛ اتبع هدف الطبيب إذا أعطاك هدفًا محددًا.

## اقرأ المكونات وقارن بذكاء

تُرتب المكونات عادة حسب الوزن من الأكبر إلى الأصغر. تساعد القائمة على التعرف إلى الحبوب الكاملة والمحليات ومسببات الحساسية، لكن طول القائمة لا يعني تلقائيًا أن المنتج غير صحي. العبارات على واجهة العبوة لا تغني عن قراءة جدول الحقائق الغذائية.

قارن منتجات متشابهة: في اللبن انظر إلى حجم الحصة والسكريات المضافة والبروتين، وفي الخبز انظر إلى الألياف والصوديوم ومصدر الحبوب. لا يوجد ملصق واحد يحدد قيمة الطعام كلها. استخدم الملصق كأداة للاختيار، لا كاختبار للكمال، واطلب مساعدة اختصاصي التغذية عند وجود احتياجات طبية معقدة.`,
  },
  takeaways: {
    en: [
      'Check serving size and servings per package before interpreting any other number.',
      'Use %DV to compare similar products, not as an individualized prescription.',
      'Compare nutrients that match your needs, such as sodium, added sugars, or fiber.',
      'Ingredient lists are ordered by weight; front-label claims are not a substitute.',
      'Labels are tools for practical choices, not judgments about foods or people.',
    ],
    ar: [
      'تحقق من حجم الحصة وعدد الحصص قبل تفسير بقية الأرقام.',
      'استخدم القيمة اليومية لمقارنة المنتجات المتشابهة لا كوصفة شخصية.',
      'قارن المغذيات المناسبة لاحتياجاتك مثل الصوديوم أو السكريات أو الألياف.',
      'ترتب المكونات حسب الوزن ولا تغني العبارات التسويقية عن الجدول.',
      'الملصق أداة للاختيار العملي وليس حكمًا على الطعام أو الشخص.',
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
  HIGH_PROTEIN_MEAL_PREP,
  READ_NUTRITION_LABELS,
];

export const getArticleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug);
