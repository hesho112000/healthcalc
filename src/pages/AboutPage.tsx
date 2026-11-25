import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ClipboardCheck, HeartPulse, ShieldCheck, Target, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import type { Language } from '../types';

type AboutCopy = {
  badge: string; title: string; subtitle: string;
  missionTitle: string; mission: string[];
  differentTitle: string; different: { title: string; desc: string }[];
  approachTitle: string; steps: { title: string; desc: string }[];
  trustTitle: string; trust: string[];
  editorialTitle: string; editorial: string;
  disclaimer: string; cta: string;
};

const COPY: Record<Language, AboutCopy> = {
  en: {
    badge: 'About Health Fingerprint',
    title: 'Evidence-based health tools, made practical',
    subtitle: 'Health Fingerprint helps people understand their bodies, plan smarter meals, and build sustainable habits with calculators, nutrition data, and clear educational guides.',
    missionTitle: 'Our mission',
    mission: [
      'We created Health Fingerprint to make reliable health guidance easier to access. Many people struggle to translate nutrition advice, calorie targets, lab values, and medical guidelines into everyday decisions. Our platform brings those pieces together in one place with practical tools you can actually use.',
      'Our calculators estimate BMR, TDEE, BMI, body fat, ideal weight, and macros using established formulas. Our food library and recipe collection help you turn numbers into meals. Our articles explain health topics in plain language while pointing readers toward evidence-based habits and professional care when needed.',
      'We focus on clarity, usefulness, and responsibility. Health information should empower people, not confuse them. That means showing how estimates are calculated, explaining limitations, and encouraging users to treat digital tools as support for informed decisions rather than a replacement for medical care.',
    ],
    differentTitle: 'What makes us different',
    different: [
      { title: 'Practical calculators', desc: 'We turn health formulas into simple tools for daily planning, from calories and macros to body composition estimates.' },
      { title: 'Nutrition-first approach', desc: 'Our food library, recipes, and meal planning features help users apply health targets in real kitchens and real routines.' },
      { title: 'Clear educational content', desc: 'We write guides that explain the “why” behind numbers, including BMR, TDEE, blood sugar, heart health, and lifestyle habits.' },
      { title: 'Responsible guidance', desc: 'We include limitations, review dates, and medical disclaimers so users understand what tools can and cannot do.' },
    ],
    approachTitle: 'Our approach',
    steps: [
      { title: 'Measure', desc: 'Start with accurate inputs and trusted formulas to estimate your baseline health metrics.' },
      { title: 'Plan', desc: 'Use meal plans, recipes, and calculators to build a realistic routine around your goals.' },
      { title: 'Improve', desc: 'Track progress, adjust targets over time, and use educational resources to make sustainable changes.' },
    ],
    trustTitle: 'Trust and transparency',
    trust: [
      'We aim to use reputable sources such as WHO, CDC, NIH, ADA, USDA, and peer-reviewed guidance where relevant.',
      'We update content periodically and display last-updated dates on key educational pages.',
      'We clearly separate educational information from personalized medical advice.',
    ],
    editorialTitle: 'Editorial standards',
    editorial: 'Our content is created for educational purposes and reviewed for clarity, usefulness, and responsible wording. We avoid exaggerated claims, explain assumptions behind calculators, and encourage readers to consult qualified healthcare professionals for diagnosis, treatment, or individualized medical decisions. If you notice an error or outdated information, please contact us so we can review it.',
    disclaimer: 'Health Fingerprint is an educational platform. Calculator results, articles, recipes, and meal plans are for informational purposes only and do not replace professional medical advice, diagnosis, or treatment.',
    cta: 'Explore health calculators',
  },
  ar: {
    badge: 'حول Health Fingerprint',
    title: 'أدوات صحية مبنية على الأدلة وبطريقة عملية',
    subtitle: 'تساعد Health Fingerprint الأشخاص على فهم أجسامهم، وتخطيط وجبات أذكى، وبناء عادات مستدامة من خلال الحاسبات وبيانات التغذية والأدلة التعليمية الواضحة.',
    missionTitle: 'مهمتنا',
    mission: [
      'أنشأنا Health Fingerprint لجعل الإرشادات الصحية الموثوقة أسهل في الوصول إليها. كثير من الأشخاص يجدون صعوبة في تحويل نصائح التغذية وأهداف السعرات وقيم التحاليل والإرشادات الطبية إلى قرارات يومية. تجمع منصتنا هذه العناصر في مكان واحد مع أدوات عملية يمكن استخدامها فعليًا.',
      'تقدّر حاسباتنا معدل الأيض الأساسي BMR، وإجمالي استهلاك الطاقة TDEE، ومؤشر كتلة الجسم BMI، ونسبة الدهون، والوزن المثالي، والمغذيات الكبرى باستخدام معادلات معتمدة. تساعدك مكتبة الطعام والوصفات على تحويل الأرقام إلى وجبات. وتشرح مقالاتنا الموضوعات الصحية بلغة واضحة مع التركيز على العادات المبنية على الأدلة والرعاية المهنية عند الحاجة.',
      'نركز على الوضوح والفائدة والمسؤولية. يجب أن تمكّن المعلومات الصحية الناس لا أن تربكهم. لذلك نوضح كيفية حساب التقديرات، ونشرح الحدود، ونشجع المستخدمين على اعتبار الأدوات الرقمية دعمًا لاتخاذ قرارات واعية وليس بديلًا عن الرعاية الطبية.',
    ],
    differentTitle: 'ما الذي يميزنا',
    different: [
      { title: 'حاسبات عملية', desc: 'نحوّل المعادلات الصحية إلى أدوات بسيطة للتخطيط اليومي، من السعرات والمغذيات إلى تقديرات تركيب الجسم.' },
      { title: 'نهج يركز على التغذية', desc: 'تساعد مكتبة الطعام والوصفات وخطط الوجبات المستخدمين على تطبيق الأهداف الصحية في الحياة الواقعية.' },
      { title: 'محتوى تعليمي واضح', desc: 'نكتب أدلة تشرح معنى الأرقام مثل BMR وTDEE وسكر الدم وصحة القلب والعادات اليومية.' },
      { title: 'إرشاد مسؤول', desc: 'نضيف حدود الاستخدام وتواريخ التحديث وإخلاء المسؤولية الطبية ليعرف المستخدم ما تقدمه الأدوات وما لا تقدمه.' },
    ],
    approachTitle: 'منهجنا',
    steps: [
      { title: 'قِس', desc: 'ابدأ بمدخلات دقيقة ومعادلات موثوقة لتقدير مؤشراتك الصحية الأساسية.' },
      { title: 'خطط', desc: 'استخدم خطط الوجبات والوصفات والحاسبات لبناء روتين واقعي حول أهدافك.' },
      { title: 'حسّن', desc: 'تابع التقدم، وعدّل الأهداف مع الوقت، واستخدم الموارد التعليمية لإجراء تغييرات مستدامة.' },
    ],
    trustTitle: 'الثقة والشفافية',
    trust: [
      'نسعى للاعتماد على مصادر موثوقة مثل WHO وCDC وNIH وADA وUSDA والإرشادات العلمية ذات الصلة.',
      'نحدّث المحتوى دوريًا ونعرض تاريخ آخر تحديث في الصفحات التعليمية المهمة.',
      'نفصل بوضوح بين المعلومات التعليمية والنصيحة الطبية المخصصة.',
    ],
    editorialTitle: 'المعايير التحريرية',
    editorial: 'يتم إنشاء المحتوى لأغراض تعليمية ومراجعته من حيث الوضوح والفائدة والصياغة المسؤولة. نتجنب الادعاءات المبالغ فيها، ونشرح الافتراضات وراء الحاسبات، ونشجع القراء على استشارة مختصين مؤهلين للتشخيص أو العلاج أو القرارات الطبية الفردية. إذا لاحظت خطأ أو معلومة قديمة، يرجى التواصل معنا لمراجعتها.',
    disclaimer: 'Health Fingerprint منصة تعليمية. نتائج الحاسبات والمقالات والوصفات وخطط الوجبات لأغراض معلوماتية فقط ولا تغني عن الاستشارة الطبية المهنية أو التشخيص أو العلاج.',
    cta: 'استكشف الحاسبات الصحية',
  },
  fr: {
    badge: 'À propos de Health Fingerprint',
    title: 'Des outils de santé fondés sur les preuves, vraiment pratiques',
    subtitle: 'Health Fingerprint aide chacun à mieux comprendre son corps, planifier des repas plus intelligents et adopter des habitudes durables grâce à des calculateurs, des données nutritionnelles et des guides clairs.',
    missionTitle: 'Notre mission',
    mission: [
      'Nous avons créé Health Fingerprint pour rendre les conseils de santé fiables plus accessibles. Beaucoup de personnes ont du mal à transformer les recommandations nutritionnelles, les objectifs caloriques, les résultats d’analyses et les directives médicales en décisions quotidiennes. Notre plateforme réunit ces éléments dans un seul endroit avec des outils pratiques.',
      'Nos calculateurs estiment le BMR, le TDEE, l’IMC, la masse grasse, le poids idéal et les macros à l’aide de formules reconnues. Notre bibliothèque alimentaire et nos recettes aident à transformer les chiffres en repas. Nos articles expliquent les sujets de santé avec un langage clair tout en orientant vers des habitudes fondées sur les preuves et des soins professionnels si nécessaire.',
      'Nous privilégions la clarté, l’utilité et la responsabilité. L’information santé doit donner du pouvoir aux utilisateurs, pas les confondre. Cela signifie expliquer les calculs, leurs limites et rappeler que les outils numériques soutiennent la décision, sans remplacer un avis médical.',
    ],
    differentTitle: 'Ce qui nous distingue',
    different: [
      { title: 'Calculateurs pratiques', desc: 'Nous transformons les formules de santé en outils simples pour la planification quotidienne.' },
      { title: 'Approche nutrition', desc: 'Notre bibliothèque alimentaire, nos recettes et nos plans aident à appliquer les objectifs dans la vraie vie.' },
      { title: 'Contenu éducatif clair', desc: 'Nous expliquons le “pourquoi” derrière les chiffres : BMR, TDEE, glycémie, cœur et habitudes de vie.' },
      { title: 'Conseils responsables', desc: 'Nous affichons les limites, les dates de mise à jour et les avertissements médicaux.' },
    ],
    approachTitle: 'Notre approche',
    steps: [
      { title: 'Mesurer', desc: 'Commencez avec des données précises et des formules fiables pour estimer vos indicateurs de base.' },
      { title: 'Planifier', desc: 'Utilisez les plans de repas, recettes et calculateurs pour créer une routine réaliste.' },
      { title: 'Améliorer', desc: 'Suivez vos progrès, ajustez vos objectifs et utilisez nos ressources pour des changements durables.' },
    ],
    trustTitle: 'Confiance et transparence',
    trust: [
      'Nous nous appuyons sur des sources réputées comme l’OMS, CDC, NIH, ADA, USDA et des recommandations scientifiques pertinentes.',
      'Nous mettons le contenu à jour périodiquement et affichons les dates de dernière mise à jour.',
      'Nous distinguons clairement l’information éducative du conseil médical personnalisé.',
    ],
    editorialTitle: 'Normes éditoriales',
    editorial: 'Notre contenu est créé à des fins éducatives et relu pour sa clarté, son utilité et sa formulation responsable. Nous évitons les promesses exagérées, expliquons les hypothèses des calculateurs et encourageons les lecteurs à consulter des professionnels de santé qualifiés pour tout diagnostic, traitement ou décision médicale individuelle. Si vous repérez une erreur, contactez-nous.',
    disclaimer: 'Health Fingerprint est une plateforme éducative. Les résultats des calculateurs, articles, recettes et plans de repas sont fournis à titre informatif uniquement et ne remplacent pas un avis médical professionnel.',
    cta: 'Explorer les calculateurs de santé',
  },
  es: {
    badge: 'Sobre Health Fingerprint',
    title: 'Herramientas de salud basadas en evidencia y fáciles de usar',
    subtitle: 'Health Fingerprint ayuda a las personas a entender su cuerpo, planificar mejores comidas y crear hábitos sostenibles con calculadoras, datos nutricionales y guías educativas claras.',
    missionTitle: 'Nuestra misión',
    mission: [
      'Creamos Health Fingerprint para hacer que la orientación de salud confiable sea más accesible. Muchas personas tienen dificultades para convertir consejos de nutrición, objetivos de calorías, valores de laboratorio y guías médicas en decisiones diarias. Nuestra plataforma reúne todo en un solo lugar con herramientas prácticas.',
      'Nuestras calculadoras estiman BMR, TDEE, IMC, grasa corporal, peso ideal y macros usando fórmulas reconocidas. Nuestra biblioteca de alimentos y recetas ayuda a convertir números en comidas. Nuestros artículos explican temas de salud en lenguaje claro y promueven hábitos basados en evidencia y atención profesional cuando es necesario.',
      'Nos enfocamos en la claridad, la utilidad y la responsabilidad. La información de salud debe empoderar, no confundir. Por eso explicamos cómo se calculan las estimaciones, sus limitaciones y recordamos que las herramientas digitales apoyan decisiones informadas, pero no reemplazan la atención médica.',
    ],
    differentTitle: 'Qué nos hace diferentes',
    different: [
      { title: 'Calculadoras prácticas', desc: 'Convertimos fórmulas de salud en herramientas simples para la planificación diaria.' },
      { title: 'Enfoque nutricional', desc: 'Nuestra biblioteca de alimentos, recetas y planes ayudan a aplicar objetivos en la vida real.' },
      { title: 'Contenido educativo claro', desc: 'Explicamos el “por qué” detrás de los números: BMR, TDEE, glucosa, corazón y hábitos.' },
      { title: 'Orientación responsable', desc: 'Incluimos límites, fechas de actualización y avisos médicos para mayor transparencia.' },
    ],
    approachTitle: 'Nuestro enfoque',
    steps: [
      { title: 'Medir', desc: 'Comienza con datos precisos y fórmulas confiables para estimar tus métricas base.' },
      { title: 'Planificar', desc: 'Usa planes de comida, recetas y calculadoras para crear una rutina realista.' },
      { title: 'Mejorar', desc: 'Sigue tu progreso, ajusta objetivos y usa recursos educativos para cambios sostenibles.' },
    ],
    trustTitle: 'Confianza y transparencia',
    trust: [
      'Buscamos apoyarnos en fuentes confiables como OMS, CDC, NIH, ADA, USDA y guías científicas relevantes.',
      'Actualizamos el contenido periódicamente y mostramos fechas de última actualización.',
      'Distinguimos claramente la información educativa del consejo médico personalizado.',
    ],
    editorialTitle: 'Estándares editoriales',
    editorial: 'Nuestro contenido se crea con fines educativos y se revisa por claridad, utilidad y redacción responsable. Evitamos promesas exageradas, explicamos los supuestos de las calculadoras y animamos a consultar profesionales de salud cualificados para diagnóstico, tratamiento o decisiones médicas individuales. Si encuentras un error, contáctanos.',
    disclaimer: 'Health Fingerprint es una plataforma educativa. Los resultados de calculadoras, artículos, recetas y planes de comida son solo informativos y no reemplazan el consejo, diagnóstico o tratamiento médico profesional.',
    cta: 'Explorar calculadoras de salud',
  },
  hi: {
    badge: 'Health Fingerprint के बारे में',
    title: 'साक्ष्य-आधारित स्वास्थ्य टूल, व्यावहारिक रूप में',
    subtitle: 'Health Fingerprint लोगों को कैलकुलेटर, पोषण डेटा और स्पष्ट शैक्षिक गाइड की मदद से अपने शरीर को समझने, बेहतर भोजन योजना बनाने और टिकाऊ आदतें विकसित करने में मदद करता है।',
    missionTitle: 'हमारा मिशन',
    mission: [
      'हमने Health Fingerprint को विश्वसनीय स्वास्थ्य मार्गदर्शन को अधिक सुलभ बनाने के लिए बनाया। कई लोगों को पोषण सलाह, कैलोरी लक्ष्य, लैब वैल्यू और मेडिकल दिशानिर्देशों को रोजमर्रा के निर्णयों में बदलना मुश्किल लगता है। हमारा प्लेटफ़ॉर्म इन सभी को व्यावहारिक टूल के साथ एक जगह लाता है।',
      'हमारे कैलकुलेटर स्थापित फ़ॉर्मूलों का उपयोग करके BMR, TDEE, BMI, बॉडी फैट, आदर्श वजन और मैक्रोज़ का अनुमान लगाते हैं। हमारी फूड लाइब्रेरी और रेसिपी संग्रह नंबरों को भोजन में बदलने में मदद करते हैं। हमारे लेख स्वास्थ्य विषयों को सरल भाषा में समझाते हैं और जरूरत पड़ने पर साक्ष्य-आधारित आदतों तथा पेशेवर देखभाल की ओर मार्गदर्शन करते हैं।',
      'हम स्पष्टता, उपयोगिता और जिम्मेदारी पर ध्यान देते हैं। स्वास्थ्य जानकारी लोगों को सशक्त बनाए, भ्रमित नहीं। इसलिए हम बताते हैं कि अनुमान कैसे निकाले जाते हैं, उनकी सीमाएँ क्या हैं, और डिजिटल टूल को चिकित्सा देखभाल का विकल्प नहीं बल्कि सूचित निर्णयों का सहायक मानने के लिए प्रोत्साहित करते हैं।',
    ],
    differentTitle: 'हम अलग क्यों हैं',
    different: [
      { title: 'व्यावहारिक कैलकुलेटर', desc: 'हम कैलोरी, मैक्रोज़ और बॉडी कंपोज़िशन जैसे स्वास्थ्य फ़ॉर्मूलों को सरल दैनिक टूल में बदलते हैं।' },
      { title: 'पोषण-केंद्रित दृष्टिकोण', desc: 'हमारी फूड लाइब्रेरी, रेसिपी और मील प्लानिंग फीचर वास्तविक जीवन में लक्ष्यों को लागू करने में मदद करते हैं।' },
      { title: 'स्पष्ट शैक्षिक सामग्री', desc: 'हम BMR, TDEE, ब्लड शुगर, हृदय स्वास्थ्य और आदतों के पीछे का “क्यों” समझाते हैं।' },
      { title: 'जिम्मेदार मार्गदर्शन', desc: 'हम सीमाएँ, अपडेट तिथि और मेडिकल अस्वीकरण शामिल करते हैं ताकि उपयोगकर्ता टूल की सही भूमिका समझें।' },
    ],
    approachTitle: 'हमारा दृष्टिकोण',
    steps: [
      { title: 'मापें', desc: 'सटीक इनपुट और विश्वसनीय फ़ॉर्मूलों से अपने बेसलाइन स्वास्थ्य मेट्रिक्स का अनुमान लगाएँ।' },
      { title: 'योजना बनाएं', desc: 'मील प्लान, रेसिपी और कैलकुलेटर का उपयोग करके अपने लक्ष्यों के अनुसार वास्तविक दिनचर्या बनाएँ।' },
      { title: 'सुधारें', desc: 'प्रगति ट्रैक करें, समय के साथ लक्ष्य समायोजित करें और टिकाऊ बदलावों के लिए शैक्षिक संसाधनों का उपयोग करें।' },
    ],
    trustTitle: 'विश्वास और पारदर्शिता',
    trust: [
      'हम प्रासंगिक होने पर WHO, CDC, NIH, ADA, USDA और वैज्ञानिक मार्गदर्शन जैसे विश्वसनीय स्रोतों का उपयोग करने का प्रयास करते हैं।',
      'हम सामग्री को समय-समय पर अपडेट करते हैं और महत्वपूर्ण शैक्षिक पेजों पर अंतिम अपडेट तिथि दिखाते हैं।',
      'हम शैक्षिक जानकारी और व्यक्तिगत चिकित्सा सलाह के बीच स्पष्ट अंतर रखते हैं।',
    ],
    editorialTitle: 'संपादकीय मानक',
    editorial: 'हमारी सामग्री शैक्षिक उद्देश्यों के लिए बनाई जाती है और स्पष्टता, उपयोगिता तथा जिम्मेदार भाषा के लिए समीक्षा की जाती है। हम बढ़ा-चढ़ाकर दावे नहीं करते, कैलकुलेटर की मान्यताओं को समझाते हैं, और निदान, उपचार या व्यक्तिगत चिकित्सा निर्णयों के लिए योग्य स्वास्थ्य पेशेवर से सलाह लेने के लिए प्रोत्साहित करते हैं। यदि आपको कोई त्रुटि मिले, तो कृपया हमसे संपर्क करें।',
    disclaimer: 'Health Fingerprint एक शैक्षिक प्लेटफ़ॉर्म है। कैलकुलेटर परिणाम, लेख, रेसिपी और भोजन योजनाएँ केवल जानकारी के लिए हैं और पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं हैं।',
    cta: 'स्वास्थ्य कैलकुलेटर देखें',
  },
  de: {
    badge: 'Über Health Fingerprint',
    title: 'Evidenzbasierte Gesundheitstools, praktisch gemacht',
    subtitle: 'Health Fingerprint hilft Menschen, ihren Körper zu verstehen, Mahlzeiten smarter zu planen und nachhaltige Gewohnheiten aufzubauen.',
    missionTitle: 'Unsere Mission',
    mission: [
      'Wir haben Health Fingerprint gegründet, um verlässliche Gesundheitsinformationen leichter zugänglich zu machen. Viele Menschen tun sich schwer, Ernährungstipps, Kalorienziele, Laborwerte und medizinische Leitlinien in den Alltag zu übertragen. Unsere Plattform bringt diese Elemente mit praktischen Tools zusammen.',
      'Unsere Rechner schätzen BMR, TDEE, BMI, Körperfett, Idealgewicht und Makros mit etablierten Formeln. Unsere Lebensmitteldatenbank und Rezepte helfen, Zahlen in Mahlzeiten zu verwandeln. Unsere Artikel erklären Gesundheitsthemen klar und verweisen bei Bedarf auf professionelle Versorgung.',
      'Wir setzen auf Klarheit, Nutzen und Verantwortung. Gesundheitsinformationen sollen stärken, nicht verwirren. Deshalb erklären wir Berechnungen, Grenzen und dass digitale Tools keine medizinische Versorgung ersetzen.',
    ],
    differentTitle: 'Was uns auszeichnet',
    different: [
      { title: 'Praktische Rechner', desc: 'Wir machen Gesundheitsformeln zu einfachen Tools für die tägliche Planung.' },
      { title: 'Ernährungsfokus', desc: 'Lebensmitteldatenbank, Rezepte und Pläne helfen, Ziele im Alltag umzusetzen.' },
      { title: 'Klare Inhalte', desc: 'Wir erklären das Warum hinter BMR, TDEE, Blutzucker, Herzgesundheit und Gewohnheiten.' },
      { title: 'Verantwortungsvolle Hinweise', desc: 'Wir zeigen Grenzen, Aktualisierungsdaten und medizinische Haftungsausschlüsse.' },
    ],
    approachTitle: 'Unser Ansatz',
    steps: [
      { title: 'Messen', desc: 'Beginnen Sie mit genauen Eingaben und verlässlichen Formeln.' },
      { title: 'Planen', desc: 'Nutzen Sie Pläne, Rezepte und Rechner für eine realistische Routine.' },
      { title: 'Verbessern', desc: 'Verfolgen Sie Fortschritte und passen Sie Ziele nachhaltig an.' },
    ],
    trustTitle: 'Vertrauen und Transparenz',
    trust: [
      'Wir orientieren uns an renommierten Quellen wie WHO, CDC, NIH, ADA und USDA.',
      'Wir aktualisieren Inhalte regelmäßig und zeigen Aktualisierungsdaten an.',
      'Wir trennen Bildungsinhalte klar von personalisierter medizinischer Beratung.',
    ],
    editorialTitle: 'Redaktionelle Standards',
    editorial: 'Unsere Inhalte dienen Bildungszwecken und werden auf Klarheit, Nutzen und verantwortungsvolle Formulierungen geprüft. Wir vermeiden überzogene Aussagen, erklären Annahmen hinter Rechnern und ermutigen dazu, qualifizierte Fachleute für Diagnose oder Behandlung zu konsultieren.',
    disclaimer: 'Health Fingerprint ist eine Bildungsplattform. Rechnerergebnisse, Artikel, Rezepte und Pläne dienen nur Informationszwecken und ersetzen keine professionelle medizinische Beratung.',
    cta: 'Gesundheitsrechner entdecken',
  },
};

const AboutPage: React.FC = () => {
  const { language, dir } = useLanguage();
  const c = COPY[language] || COPY.en;
  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <SEO title={`${c.badge} | Health Fingerprint`} description={c.subtitle} url="/about" />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_120%_at_50%_0%,rgba(212,160,23,0.12),rgba(255,255,255,0)_60%)]" />
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
          <span className="hero-eyebrow">{c.badge}</span>
          <h1 className="hero-title mx-auto"><span className="hero-title-line1">{c.title}</span></h1>
          <p className="mx-auto mt-4 max-w-3xl text-[#4A5A55] leading-relaxed">{c.subtitle}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <span className="hero-eyebrow">{c.missionTitle}</span>
          <div className="mt-5 space-y-4 text-[#4A5A55] leading-relaxed">
            {c.mission.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
        <div className="rounded-[32px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-8 text-white shadow-[0_24px_60px_rgba(15,76,58,0.18)]">
          <h2 className="text-xl font-extrabold text-[#FDFBF7]">{c.trustTitle}</h2>
          <ul className="mt-5 space-y-4">
            {c.trust.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-white/90">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#D4A017]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-14">
        <div className="text-center"><span className="hero-eyebrow justify-center">{c.differentTitle}</span></div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {c.different.map((card, i) => (
            <div key={i} className="rounded-3xl border border-[#EFEBE4] bg-white p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F1EB] flex items-center justify-center text-[#0F4C3A]">
                {[<BookOpen size={22} />, <HeartPulse size={22} />, <ClipboardCheck size={22} />, <ShieldCheck size={22} />][i]}
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-[#0F4C3A]">{card.title}</h3>
              <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-14">
        <div className="text-center"><span className="hero-eyebrow justify-center">{c.approachTitle}</span></div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.steps.map((step, i) => (
            <div key={i} className="rounded-3xl border border-[#EFEBE4] bg-white p-7 text-center shadow-[0_10px_30px_rgba(15,76,58,0.05)]">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-[#0F4C3A] text-[#D4A017] flex items-center justify-center">
                {[<Target size={24} />, <BookOpen size={24} />, <Users size={24} />][i]}
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-[#0F4C3A]">{step.title}</h3>
              <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-14">
        <div className="rounded-[32px] bg-[#F4F1EB] border border-[#EFEBE4] p-8">
          <h2 className="text-2xl font-extrabold text-[#0F4C3A]">{c.editorialTitle}</h2>
          <p className="mt-4 text-[#4A5A55] leading-relaxed">{c.editorial}</p>
          <p className="mt-4 text-sm text-[#4A5A55] leading-relaxed border-t border-[#E5DDD0] pt-4">{c.disclaimer}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-[32px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] px-8 py-14 text-center">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-[#D4A017] px-8 py-4 text-base font-extrabold text-[#0F4C3A] hover:bg-[#B8860B] transition-colors">
            {c.cta} <ArrowRight size={18} className="rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
