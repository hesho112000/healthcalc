import { Language } from '../types';

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalDocument {
  badge: string;
  updated: string;
  intro: string | null;
  sections: LegalSection[];
}

const L = (lang: Language, docs: Record<Language, LegalDocument>): LegalDocument => docs[lang] ?? docs.en;

export const privacyPolicyDocs: Record<Language, LegalDocument> = {
  en: {
    badge: 'Legal',
    updated: 'Last updated: January 1, 2026',
    intro: null,
    sections: [
      { heading: '1. Information We Collect', body: 'HealthCalc.ai is designed with privacy in mind. All health calculations are performed locally in your browser. We do not collect, store, or transmit any personal health information you enter into our calculators.' },
      { heading: '1. Non-Personal Information', body: 'We may collect non-personal information such as: browser type and version; operating system; pages visited and time spent; referring website addresses.' },
      { heading: '2. How We Use Information', body: 'Non-personal information is used solely for: improving our website and user experience; analytics to understand usage patterns; serving relevant advertisements through Google AdSense.' },
      { heading: '3. Cookies and Advertising', body: 'We use cookies for functionality and to serve personalized ads through Google AdSense. Google\'s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the internet. You may opt out of personalized advertising by visiting Google Ads Settings.' },
      { heading: '4. Data Security', body: 'We implement appropriate security measures to protect the non-personal information we collect. However, no method of transmission over the Internet is 100% secure.' },
      { heading: '5. Third-Party Services', body: 'We use Google AdSense for advertising. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting the Google Ads Settings page.' },
      { heading: '6. Children\'s Privacy', body: 'Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13.' },
      { heading: '7. Changes to This Policy', body: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated effective date.' },
      { heading: '8. Contact Us', body: 'If you have any questions about this Privacy Policy, please contact us at privacy@healthcalc.ai.' },
    ],
  },
  fr: {
    badge: 'Légal',
    updated: 'Dernière mise à jour : 1er janvier 2026',
    intro: null,
    sections: [
      { heading: '1. Informations que nous collectons', body: 'HealthCalc.ai est conçu dans le respect de la vie privée. Tous les calculs de santé sont effectués localement dans votre navigateur. Nous ne collectons, ne stockons ni ne transmettons aucune donnée de santé personnelle saisie dans nos calculateurs.' },
      { heading: '1. Informations non personnelles', body: 'Nous pouvons collecter des informations non personnelles telles que : type et version du navigateur ; système d\'exploitation ; pages visitées et temps passé ; adresses des sites référents.' },
      { heading: '2. Utilisation des informations', body: 'Les informations non personnelles sont utilisées uniquement pour : améliorer notre site et l\'expérience utilisateur ; analyse statistique pour comprendre les utilisations ; diffusion de publicités pertinentes via Google AdSense.' },
      { heading: '3. Cookies et publicité', body: 'Nous utilisons des cookies pour le fonctionnement et pour diffuser des annonces personnalisées via Google AdSense. L\'utilisation de cookies publicitaires par Google permet à Google et à ses partenaires de diffuser des annonces basées sur votre visite sur notre site et/ou d\'autres sites sur Internet. Vous pouvez désactiver la publicité personnalisée via les paramètres des annonces Google.' },
      { heading: '4. Sécurité des données', body: 'Nous mettons en œuvre des mesures de sécurité appropriées pour protéger les informations non personnelles que nous collectons. Cependant, aucune méthode de transmission sur Internet n\'est 100 % sécurisée.' },
      { heading: '5. Services tiers', body: 'Nous utilisons Google AdSense pour la publicité. Google peut utiliser des cookies pour diffuser des annonces basées sur vos visites antérieures sur notre site ou d\'autres sites. Vous pouvez désactiver la publicité personnalisée via la page des paramètres des annonces Google.' },
      { heading: '6. Vie privée des enfants', body: 'Nos services ne s\'adressent pas aux personnes de moins de 13 ans. Nous ne collectons pas sciemment des informations personnelles auprès d\'enfants de moins de 13 ans.' },
      { heading: '7. Modifications de la politique', body: 'Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de toute modification en publiant la nouvelle politique sur cette page avec une date d\'entrée en vigueur actualisée.' },
      { heading: '8. Nous contacter', body: 'Si vous avez des questions sur cette politique de confidentialité, contactez-nous à privacy@healthcalc.ai.' },
    ],
  },
  es: {
    badge: 'Legal',
    updated: 'Última actualización: 1 de enero de 2026',
    intro: null,
    sections: [
      { heading: '1. Información que recopilamos', body: 'HealthCalc.ai está diseñado pensando en la privacidad. Todos los cálculos de salud se realizan localmente en tu navegador. No recopilamos, almacenamos ni transmitimos ninguna información de salud personal que ingreses en nuestras calculadoras.' },
      { heading: '1. Información no personal', body: 'Podemos recopilar información no personal como: tipo y versión del navegador; sistema operativo; páginas visitadas y tiempo dedicado; direcciones de sitios web de referencia.' },
      { heading: '2. Cómo usamos la información', body: 'La información no personal se utiliza únicamente para: mejorar nuestro sitio web y la experiencia del usuario; análisis para comprender patrones de uso; mostrar anuncios relevantes a través de Google AdSense.' },
      { heading: '3. Cookies y publicidad', body: 'Usamos cookies para el funcionamiento y para mostrar anuncios personalizados a través de Google AdSense. El uso de cookies publicitarias por parte de Google permite que Google y sus socios muestren anuncios basados ​​en tu visita a nuestro sitio y/u otros sitios en Internet. Puedes desactivar la publicidad personalizada visitando la configuración de anuncios de Google.' },
      { heading: '4. Seguridad de los datos', body: 'Implementamos medidas de seguridad apropiadas para proteger la información no personal que recopilamos. Sin embargo, ningún método de transmisión por Internet es 100% seguro.' },
      { heading: '5. Servicios de terceros', body: 'Usamos Google AdSense para publicidad. Google puede usar cookies para mostrar anuncios basados ​​en tus visitas anteriores a nuestro sitio web u otros sitios. Puedes desactivar la publicidad personalizada visitando la página de configuración de anuncios de Google.' },
      { heading: '6. Privacidad de los niños', body: 'Nuestros servicios no están dirigidos a personas menores de 13 años. No recopilamos a sabiendas información personal de niños menores de 13 años.' },
      { heading: '7. Cambios en esta política', body: 'Podemos actualizar esta política de privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva política en esta página con una fecha de entrada en vigor actualizada.' },
      { heading: '8. Contacto', body: 'Si tienes preguntas sobre esta política de privacidad, contáctanos en privacy@healthcalc.ai.' },
    ],
  },
  ar: {
    badge: 'قانوني',
    updated: 'آخر تحديث: 1 يناير 2026',
    intro: null,
    sections: [
      { heading: '1. المعلومات التي نجمعها', body: 'تم تصميم موقع HealthCalc.ai مع التركيز على الخصوصية. تُجرى جميع حسابات الصحة محلياً في متصفحك. نحن لا نجمع أو نخزن أو نرسل أي معلومات صحية شخصية تُدخلها في حساباتنا.' },
      { heading: '1. المعلومات غير الشخصية', body: 'قد نجمع معلومات غير شخصية مثل: نوع إصدار المتصفح؛ نظام التشغيل؛ الصفحات التي تمت زيارتها والوقت المستغرق؛ عناوين المواقع المحيلة.' },
      { heading: '2. كيفية استخدام المعلومات', body: 'تُستخدم المعلومات غير الشخصية فقط من أجل: تحسين موقعنا وتجربة المستخدم؛ التحليلات لفهم أنماط الاستخدام؛ عرض إعلانات ذات صلة عبر Google AdSense.' },
      { heading: '3. ملفات تعريف الارتباط والإعلانات', body: 'نستخدم ملفات تعريف الارتباط للوظائف وعرض إعلانات مخصصة عبر Google AdSense. يتيح استخدام Google لملفات تعريف الارتباط الإعلانية لها ولشركائها عرض إعلانات بناءً على زيارتك لموقعنا و/أو مواقع أخرى على الإنترنت. يمكنك إلغاء الاشتراك في الإعلانات المخصصة بزيارة إعدادات إعلانات Google.' },
      { heading: '4. أمان البيانات', body: 'ننفذ إجراءات أمنية مناسبة لحماية المعلومات غير الشخصية التي نجمعها. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة 100%.' },
      { heading: '5. خدمات الطرف الثالث', body: 'نستخدم Google AdSense للإعلانات. قد يستخدم Google ملفات تعريف الارتباط لعرض إعلانات بناءً على زياراتك السابقة لموقعنا أو مواقع أخرى. يمكنك إلغاء الاشتراك في الإعلانات المخصصة بزيارة صفحة إعدادات إعلانات Google.' },
      { heading: '6. خصوصية الأطفال', body: 'خدماتنا غير موجهة للأفراد دون سن 13 عاماً. نحن لا نجمع عن قصد معلومات شخصية من الأطفال دون سن 13 عاماً.' },
      { heading: '7. التغييرات على هذه السياسة', body: 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات عن طريق نشر سياسة الخصوصية الجديدة على هذه الصفحة مع تاريخ سريان محدّث.' },
      { heading: '8. اتصل بنا', body: 'إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، فيرجى الاتصال بنا على privacy@healthcalc.ai.' },
    ],
  },
};

export const termsOfServiceDocs: Record<Language, LegalDocument> = {
  en: {
    badge: 'Legal',
    updated: 'Last updated: January 1, 2026',
    intro: null,
    sections: [
      { heading: '1. Acceptance of Terms', body: 'By accessing and using HealthCalc.ai, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.' },
      { heading: '2. Medical Disclaimer', body: 'HealthCalc.ai provides information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your physician before starting any diet or workout program. The calculations and recommendations provided are based on general guidelines (ADA, DASH, USDA, ACSM) and may not be suitable for all individuals.' },
      { heading: '3. Use of Service', body: 'You agree to use HealthCalc.ai only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that your use of the service does not violate any applicable laws or regulations.' },
      { heading: '4. Intellectual Property', body: 'All content, features, and functionality of HealthCalc.ai, including but not limited to text, graphics, logos, icons, images, data compilations, and software, are the exclusive property of HealthCalc.ai and are protected by international copyright, trademark, and other intellectual property laws.' },
      { heading: '5. Limitation of Liability', body: 'In no event shall HealthCalc.ai be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. We shall not be responsible for any health decisions made based on the information provided by our calculators.' },
      { heading: '6. Accuracy of Information', body: 'While we strive to provide accurate calculations based on recognized medical guidelines, we make no warranties about the completeness, reliability, or accuracy of this information. The results should be used as general guidelines only.' },
      { heading: '7. Third-Party Links', body: 'Our service may contain links to third-party websites or services (including advertisements). We are not responsible for the content, privacy policies, or practices of any third-party sites or services.' },
      { heading: '8. Changes to Terms', body: 'We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes are posted constitutes acceptance of the modified terms.' },
      { heading: '9. Governing Law', body: 'These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.' },
      { heading: '10. Contact', body: 'For questions about these Terms, contact us at legal@healthcalc.ai.' },
    ],
  },
  fr: {
    badge: 'Conditions',
    updated: 'Dernière mise à jour : 1er janvier 2026',
    intro: null,
    sections: [
      { heading: '1. Acceptation des conditions', body: 'En accédant à HealthCalc.ai et en l\'utilisant, vous acceptez d\'être lié par les présentes conditions d\'utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser notre service.' },
      { heading: '2. Avertissement médical', body: 'HealthCalc.ai fournit des informations à des fins éducatives uniquement. Ce n\'est pas un substitut à un avis, un diagnostic ou un traitement médical professionnel. Consultez toujours votre médecin avant de commencer un régime ou un programme d\'exercice. Les calculs et recommandations fournis sont basés sur des directives générales (ADA, DASH, USDA, ACSM) et peuvent ne pas convenir à tous.' },
      { heading: '3. Utilisation du service', body: 'Vous acceptez d\'utiliser HealthCalc.ai uniquement à des fins légales et conformément à ces conditions. Vous êtes responsable de vous assurer que votre utilisation du service ne viole aucune loi ou réglementation applicable.' },
      { heading: '4. Propriété intellectuelle', body: 'Tout le contenu, les fonctionnalités de HealthCalc.ai, y compris mais sans s\'y limiter le texte, les graphiques, les logos, les icônes, les images, les compilations de données et les logiciels, sont la propriété exclusive de HealthCalc.ai et sont protégés par les lois internationales sur le droit d\'auteur, les marques et autres droits de propriété intellectuelle.' },
      { heading: '5. Limitation de responsabilité', body: 'En aucun cas HealthCalc.ai ne pourra être tenu responsable de dommages indirects, accessoires, spéciaux, consécutifs ou punitifs résultant de votre utilisation ou de l\'impossibilité d\'utiliser le service. Nous ne serons pas responsables des décisions de santé prises sur la base des informations fournies par nos calculateurs.' },
      { heading: '6. Exactitude des informations', body: 'Bien que nous nous efforcions de fournir des calculs précis basés sur des directives médicales reconnues, nous ne garantissons pas l\'exhaustivité, la fiabilité ou l\'exactitude de ces informations. Les résultats doivent être utilisés à titre indicatif uniquement.' },
      { heading: '7. Liens vers des tiers', body: 'Notre service peut contenir des liens vers des sites web ou services tiers (y compris des publicités). Nous ne sommes pas responsables du contenu, des politiques de confidentialité ou des pratiques des sites ou services tiers.' },
      { heading: '8. Modifications des conditions', body: 'Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet immédiatement après leur publication. Votre utilisation continue du service après la publication des modifications constitue une acceptation des conditions modifiées.' },
      { heading: '9. Droit applicable', body: 'Ces conditions sont régies et interprétées conformément aux lois applicables, sans égard aux principes de conflit de lois.' },
      { heading: '10. Contact', body: 'Pour toute question sur ces conditions, contactez-nous à legal@healthcalc.ai.' },
    ],
  },
  es: {
    badge: 'Legal',
    updated: 'Última actualización: 1 de enero de 2026',
    intro: null,
    sections: [
      { heading: '1. Aceptación de los términos', body: 'Al acceder y utilizar HealthCalc.ai, aceptas y te obligas por estos Términos de Servicio. Si no estás de acuerdo con estos términos, por favor no utilices nuestro servicio.' },
      { heading: '2. Aviso médico', body: 'HealthCalc.ai proporciona información solo con fines educativos. No sustituye el consejo, diagnóstico o tratamiento médico profesional. Consulta siempre a tu médico antes de comenzar cualquier dieta o programa de ejercicio. Los cálculos y recomendaciones se basan en pautas generales (ADA, DASH, USDA, ACSM) y pueden no ser adecuados para todos.' },
      { heading: '3. Uso del servicio', body: 'Aceptas utilizar HealthCalc.ai solo para fines legales y de acuerdo con estos Términos. Eres responsable de garantizar que tu uso del servicio no viole ninguna ley o regulación aplicable.' },
      { heading: '4. Propiedad intelectual', body: 'Todo el contenido, las funciones de HealthCalc.ai, incluidos entre otros textos, gráficos, logotipos, iconos, imágenes, compilaciones de datos y software, son propiedad exclusiva de HealthCalc.ai y están protegidos por las leyes internacionales de derechos de autor, marcas y otras leyes de propiedad intelectual.' },
      { heading: '5. Limitación de responsabilidad', body: 'En ningún caso HealthCalc.ai será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos resultantes de tu uso o imposibilidad de usar el servicio. No seremos responsables de ninguna decisión de salud tomada basándose en la información proporcionada por nuestras calculadoras.' },
      { heading: '6. Exactitud de la información', body: 'Si bien nos esforzamos por proporcionar cálculos precisos basados ​​en pautas médicas reconocidas, no garantizamos la integridad, confiabilidad o precisión de esta información. Los resultados deben usarse solo como pautas generales.' },
      { heading: '7. Enlaces de terceros', body: 'Nuestro servicio puede contener enlaces a sitios web o servicios de terceros (incluidos anuncios). No somos responsables del contenido, las políticas de privacidad o las prácticas de ningún sitio o servicio de terceros.' },
      { heading: '8. Cambios en los términos', body: 'Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación. Tu uso continuo del servicio después de los cambios constituye la aceptación de los términos modificados.' },
      { heading: '9. Ley aplicable', body: 'Estos Términos se regirán e interpretarán de acuerdo con las leyes aplicables, sin consideración a los principios de conflicto de leyes.' },
      { heading: '10. Contacto', body: 'Para preguntas sobre estos Términos, contáctanos en legal@healthcalc.ai.' },
    ],
  },
  ar: {
    badge: 'الشروط',
    updated: 'آخر تحديث: 1 يناير 2026',
    intro: null,
    sections: [
      { heading: '1. قبول الشروط', body: 'باستخدامك للموقع HealthCalc.ai، فإنك تقبل وتوافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على هذه الشروط، فيرجى عدم استخدام خدمتنا.' },
      { heading: '2. إخلاء المسؤولية الطبية', body: 'يوفر HealthCalc.ai المعلومات لأغراض تعليمية فقط. وهو ليس بديلاً عن النصيحة الطبية المهنية أو التشخيص أو العلاج. استشر طبيبك دائماً قبل البدء في أي برنامج حمية أو تمارين. تستند الحسابات والتوصيات المقدمة إلى إرشادات عامة (ADA, DASH, USDA, ACSM) وقد لا تكون مناسبة للجميع.' },
      { heading: '3. استخدام الخدمة', body: 'أنت توافق على استخدام HealthCalc.ai فقط للأغراض القانونية ووفقاً لهذه الشروط. أنت مسؤول عن ضمان أن استخدامك للخدمة لا ينتهك أي قوانين أو لوائح سارية.' },
      { heading: '4. الملكية الفكرية', body: 'جميع المحتويات والميزات والوظائف الخاصة بـ HealthCalc.ai، بما في ذلك على سبيل المثال لا الحصر النصوص والرسومات والشعارات والأيقونات والصور والبيانات المجمعة والبرمجيات، هي ملكية حصرية لـ HealthCalc.ai ومحمية بموجب قوانين حقوق النشر والعلامات التجارية وقوانين الملكية الفكرية الدولية.' },
      { heading: '5. تحديد المسؤولية', body: 'لا تتحمل HealthCalc.ai بأي حال من الأحوال المسؤولية عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية ناتجة عن استخدامك للخدمة أو عدم قدرتك على استخدامها. لن نكون مسؤولين عن أي قرارات صحية تُتخذ بناءً على المعلومات المقدمة من حساباتنا.' },
      { heading: '6. دقة المعلومات', body: 'بينما نسعى لتقديم حسابات دقيقة بناءً على إرشادات طبية معترف بها، فإننا لا نقدم أي ضمانات حول اكتمال هذه المعلومات أو موثوقيتها أو دقتها. يجب استخدام النتائج كإرشادات عامة فقط.' },
      { heading: '7. روابط الطرف الثالث', body: 'قد تحتوي خدمتنا على روابط لمواقع أو خدمات طرف ثالث (بما في ذلك الإعلانات). نحن غير مسؤولين عن محتوى أو سياسات الخصوصية أو ممارسات أي مواقع أو خدمات خارجية.' },
      { heading: '8. التغييرات على الشروط', body: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. ستكون التغييرات سارية المفعول فور نشرها. استمرارك في استخدام الخدمة بعد نشر التغييرات يشكل قبولاً للشروط المعدّلة.' },
      { heading: '9. القانون الحاكم', body: 'تخضع هذه الشروط وتُفسر وفقاً للقوانين المعمول بها، دون اعتبار لمبادئ تضارب القوانين.' },
      { heading: '10. الاتصال', body: 'للاستفسار عن هذه الشروط، يرجى الاتصال بنا على legal@healthcalc.ai.' },
    ],
  },
};

export const medicalDisclaimerDocs: Record<Language, LegalDocument> = {
  en: {
    badge: 'Important Notice',
    updated: 'Effective Date: January 1, 2026',
    intro: 'HealthCalc.ai provides information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your physician before starting any diet or workout program.',
    sections: [
      { heading: 'General Information', body: 'The content provided on HealthCalc.ai, including but not limited to calculators, meal plans, workout routines, lab result interpretations, and health recommendations, is designed for general informational and educational purposes only. This content is not intended to be a substitute for professional medical advice, diagnosis, or treatment.' },
      { heading: 'Not Medical Advice', body: 'The information provided by HealthCalc.ai should not be used as a substitute for consultation with a qualified healthcare professional. The calculations are based on general formulas and published medical guidelines (ADA, DASH, USDA, ACSM) and may not account for individual health conditions, medications, allergies, or other factors that may affect your specific needs.' },
      { heading: 'No Doctor-Patient Relationship', body: 'Use of HealthCalc.ai does not establish a doctor-patient relationship between you and HealthCalc.ai or its operators. The results and recommendations generated by our tools should be reviewed by a qualified healthcare provider before implementation.' },
      { heading: 'Lab Results Interpretation', body: 'Our Lab Results Interpreter provides general interpretations based on published medical guidelines. These interpretations are preliminary and should not replace a review by your physician or laboratory medicine specialist. Abnormal results should always be discussed with your healthcare provider.' },
      { heading: 'Medical Guidelines Referenced', body: 'ADA — American Diabetes Association: diabetes-related calculations and lab interpretations. DASH — Dietary Approaches to Stop Hypertension: blood pressure and dietary recommendations. USDA — United States Department of Agriculture: nutritional guidelines and macro calculations. ACSM — American College of Sports Medicine: exercise and fitness recommendations.' },
      { heading: 'Emergency Situations', body: 'If you think you may have a medical emergency, call your doctor or emergency services immediately. HealthCalc.ai is not designed to handle emergency situations and should never be used as a resource for emergency medical advice.' },
      { heading: 'Assumption of Risk', body: 'You acknowledge that any use of information from HealthCalc.ai is at your own risk. You are responsible for consulting with a qualified healthcare professional before making any health-related decisions based on the content provided by our service.' },
    ],
  },
  fr: {
    badge: 'Avis important',
    updated: 'Date d\'entrée en vigueur : 1er janvier 2026',
    intro: 'HealthCalc.ai fournit des informations à des fins éducatives uniquement. Ce n\'est pas un substitut à un avis, un diagnostic ou un traitement médical professionnel. Consultez toujours votre médecin avant de commencer un régime ou un programme d\'exercice.',
    sections: [
      { heading: 'Informations générales', body: 'Le contenu fourni sur HealthCalc.ai, y compris mais sans s\'y limiter les calculateurs, les plans de repas, les routines d\'exercice, les interprétations de résultats de laboratoire et les recommandations de santé, est conçu à des fins d\'information et d\'éducation générales uniquement. Ce contenu ne vise pas à remplacer un avis, un diagnostic ou un traitement médical professionnel.' },
      { heading: 'Pas un avis médical', body: 'Les informations fournies par HealthCalc.ai ne doivent pas être utilisées comme substitut à une consultation auprès d\'un professionnel de santé qualifié. Les calculs sont basés sur des formules générales et des directives médicales publiées (ADA, DASH, USDA, ACSM) et peuvent ne pas tenir compte des conditions de santé individuelles, des médicaments, des allergies ou d\'autres facteurs pouvant affecter vos besoins spécifiques.' },
      { heading: 'Pas de relation médecin-patient', body: 'L\'utilisation de HealthCalc.ai ne crée pas de relation médecin-patient entre vous et HealthCalc.ai ou ses opérateurs. Les résultats et recommandations générés par nos outils doivent être examinés par un professionnel de santé qualifié avant leur mise en œuvre.' },
      { heading: 'Interprétation des résultats de laboratoire', body: 'Notre interpréteur de résultats de laboratoire fournit des interprétations générales basées sur des directives médicales publiées. Ces interprétations sont préliminaires et ne doivent pas remplacer un examen par votre médecin ou un biologiste. Les résultats anormaux doivent toujours être discutés avec votre professionnel de santé.' },
      { heading: 'Directives médicales de référence', body: 'ADA — American Diabetes Association : calculs liés au diabète et interprétations de laboratoire. DASH — Dietary Approaches to Stop Hypertension : tension artérielle et recommandations alimentaires. USDA — United States Department of Agriculture : recommandations nutritionnelles et calculs de macronutriments. ACSM — American College of Sports Medicine : recommandations d\'exercice et de condition physique.' },
      { heading: 'Situations d\'urgence', body: 'Si vous pensez avoir une urgence médicale, appelez immédiatement votre médecin ou les services d\'urgence. HealthCalc.ai n\'est pas conçu pour gérer les situations d\'urgence et ne doit jamais être utilisé comme ressource pour des conseils médicaux d\'urgence.' },
      { heading: 'Acceptation du risque', body: 'Vous reconnaissez que toute utilisation des informations de HealthCalc.ai se fait à vos propres risques. Vous êtes responsable de consulter un professionnel de santé qualifié avant de prendre toute décision liée à la santé basée sur le contenu fourni par notre service.' },
    ],
  },
  es: {
    badge: 'Aviso importante',
    updated: 'Fecha de vigencia: 1 de enero de 2026',
    intro: 'HealthCalc.ai proporciona información solo con fines educativos. No sustituye el consejo, diagnóstico o tratamiento médico profesional. Consulta siempre a tu médico antes de comenzar cualquier dieta o programa de ejercicio.',
    sections: [
      { heading: 'Información general', body: 'El contenido proporcionado en HealthCalc.ai, incluidos entre otros calculadoras, planes de comidas, rutinas de ejercicio, interpretaciones de resultados de laboratorio y recomendaciones de salud, está diseñado solo con fines informativos y educativos generales. Este contenido no pretende sustituir el consejo, diagnóstico o tratamiento médico profesional.' },
      { heading: 'No es consejo médico', body: 'La información proporcionada por HealthCalc.ai no debe usarse como sustituto de la consulta con un profesional de salud calificado. Los cálculos se basan en fórmulas generales y pautas médicas publicadas (ADA, DASH, USDA, ACSM) y pueden no tener en cuenta afecciones de salud individuales, medicamentos, alergias u otros factores que puedan afectar tus necesidades específicas.' },
      { heading: 'No existe relación médico-paciente', body: 'El uso de HealthCalc.ai no establece una relación médico-paciente entre tú y HealthCalc.ai o sus operadores. Los resultados y recomendaciones generados por nuestras herramientas deben ser revisados ​​por un proveedor de salud calificado antes de su implementación.' },
      { heading: 'Interpretación de resultados de laboratorio', body: 'Nuestro intérprete de resultados de laboratorio proporciona interpretaciones generales basadas en pautas médicas publicadas. Estas interpretaciones son preliminares y no deben reemplazar la revisión de tu médico o especialista en medicina de laboratorio. Los resultados anormales siempre deben discutirse con tu proveedor de salud.' },
      { heading: 'Pautas médicas de referencia', body: 'ADA — Asociación Estadounidense de Diabetes: cálculos relacionados con diabetes e interpretaciones de laboratorio. DASH — Enfoques Dietéticos para Detener la Hipertensión: presión arterial y recomendaciones dietéticas. USDA — Departamento de Agricultura de EE. UU.: pautas nutricionales y cálculos de macronutrientes. ACSM — Colegio Estadounidense de Medicina Deportiva: recomendaciones de ejercicio y aptitud física.' },
      { heading: 'Situaciones de emergencia', body: 'Si crees que puedes tener una emergencia médica, llama a tu médico o a los servicios de emergencia de inmediato. HealthCalc.ai no está diseñado para manejar situaciones de emergencia y nunca debe usarse como recurso para consejos médicos de emergencia.' },
      { heading: 'Asunción de riesgos', body: 'Reconoces que cualquier uso de la información de HealthCalc.ai es bajo tu propio riesgo. Eres responsable de consultar a un profesional de salud calificado antes de tomar cualquier decisión relacionada con la salud basada en el contenido proporcionado por nuestro servicio.' },
    ],
  },
  ar: {
    badge: 'إشعار مهم',
    updated: 'تاريخ السريان: 1 يناير 2026',
    intro: 'يوفر HealthCalc.ai المعلومات لأغراض تعليمية فقط. وهو ليس بديلاً عن النصيحة الطبية المهنية أو التشخيص أو العلاج. استشر طبيبك دائماً قبل البدء في أي برنامج حمية أو تمارين.',
    sections: [
      { heading: 'معلومات عامة', body: 'المحتوى المقدم على HealthCalc.ai، بما في ذلك على سبيل المثال لا الحصر الحسابات، وخطط الوجبات، وبرامج التمارين، وتفسيرات نتائج المختبر، والتوصيات الصحية، مصمم لأغراض إعلامية وتعليمية عامة فقط. لا يُقصد من هذا المحتوى أن يكون بديلاً عن النصيحة الطبية المهنية أو التشخيص أو العلاج.' },
      { heading: 'ليس نصيحة طبية', body: 'لا ينبغي استخدام المعلومات المقدمة من HealthCalc.ai كبديل عن استشارة أخصائي رعاية صحية مؤهل. تستند الحسابات إلى صيغ عامة وإرشادات طبية منشورة (ADA, DASH, USDA, ACSM) وقد لا تأخذ في الاعتبار الحالات الصحية الفردية أو الأدوية أو الحساسية أو عوامل أخرى قد تؤثر على احتياجاتك الخاصة.' },
      { heading: 'لا توجد علاقة طبيب-مريض', body: 'لا يُنشئ استخدام HealthCalc.ai علاقة طبيب-مريض بينك وبين HealthCalc.ai أو مشغليه. يجب مراجعة النتائج والتوصيات الناتجة عن أدواتنا من قبل مقدم رعاية صحية مؤهل قبل تطبيقها.' },
      { heading: 'تفسير نتائج المختبر', body: 'توفر أداة تفسير نتائج المختبر لدينا تفسيرات عامة بناءً على إرشادات طبية منشورة. هذه التفسيرات أولية ولا ينبغي أن تحل محل مراجعة طبيبك أو اختصاصي طب المختبرات. يجب دائماً مناقشة النتائج غير الطبيعية مع مقدم الرعاية الصحية الخاص بك.' },
      { heading: 'الإرشادات الطبية المرجعية', body: 'ADA — الجمعية الأمريكية للسكري: حسابات متعلقة بالسكري وتفسيرات المختبر. DASH — الأساليب الغذائية لوقف ارتفاع ضغط الدم: ضغط الدم والتوصيات الغذائية. USDA — وزارة الزراعة الأمريكية: الإرشادات الغذائية وحسابات المغذيات الكبرى. ACSM — الكلية الأمريكية للطب الرياضي: توصيات التمارين واللياقة البدنية.' },
      { heading: 'حالات الطوارئ', body: 'إذا كنت تعتقد أن لديك حالة طارئة، فاتصل بطبيبك أو بخدمات الطوارئ فوراً. HealthCalc.ai غير مصمم للتعامل مع حالات الطوارئ ولا ينبغي أبداً استخدامه كمصدر لنصائح طبية طارئة.' },
      { heading: 'تحمل المخاطر', body: 'أنت تقر بأن أي استخدام للمعلومات من HealthCalc.ai يكون على مسؤوليتك الخاصة. أنت مسؤول عن استشارة أخصائي رعاية صحية مؤهل قبل اتخاذ أي قرارات متعلقة بالصحة بناءً على المحتوى المقدم من خدماتنا.' },
    ],
  },
};

export const getLegalDoc = (lang: Language, docs: Record<Language, LegalDocument>): LegalDocument => L(lang, docs);