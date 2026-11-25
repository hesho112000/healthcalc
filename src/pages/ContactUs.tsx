import React, { useState } from 'react';
import { Mail, Clock, Globe, ShieldCheck, MessageSquare, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import type { Language } from '../types';

type Copy = {
  badge: string; title: string; subtitle: string; intro: string;
  getInTouch: string; email: string; website: string; response: string; responseValue: string;
  whyTitle: string; why: string[];
  formTitle: string; name: string; emailLabel: string; message: string; namePh: string; emailPh: string; msgPh: string; send: string; sending: string;
  sentTitle: string; sentDesc: string; error: string; privacy: string;
};

const COPY: Record<Language, Copy> = {
  en: {
    badge: 'Contact & Support', title: 'Contact Health Fingerprint', subtitle: 'We usually respond within 24–48 business hours.',
    intro: 'Have a question about our calculators, found an issue in a recipe or article, or want to suggest a feature? We welcome feedback from readers, health-conscious users, and partners. Our goal is to keep Health Fingerprint accurate, useful, and easy to understand. When you contact us, please include as much detail as possible so we can help quickly.',
    getInTouch: 'Get in touch', email: 'Email', website: 'Website', response: 'Response time', responseValue: 'Within 24–48 business hours',
    whyTitle: 'How we can help', why: ['Report a calculator bug, incorrect nutrition value, or broken page.', 'Suggest new recipes, health tools, or educational topics.', 'Ask about editorial sources, updates, or content corrections.', 'Business, partnership, or media inquiries.'],
    formTitle: 'Send us a message', name: 'Name', emailLabel: 'Email', message: 'Message', namePh: 'Your full name', emailPh: 'you@example.com', msgPh: 'Tell us how we can help...', send: 'Send message', sending: 'Sending...',
    sentTitle: 'Message sent', sentDesc: 'Thank you for contacting Health Fingerprint. We have received your message and will respond as soon as possible.',
    error: 'Something went wrong. Please try again or email us directly.', privacy: 'We use your message only to respond to your inquiry. Please do not submit sensitive medical information, diagnoses, or emergency requests through this form.'
  },
  ar: {
    badge: 'التواصل والدعم', title: 'تواصل مع Health Fingerprint', subtitle: 'نرد عادةً خلال 24–48 ساعة عمل.',
    intro: 'هل لديك سؤال حول الحاسبات، أو لاحظت مشكلة في وصفة أو مقال، أو تريد اقتراح ميزة جديدة؟ نرحب بملاحظات القراء والمستخدمين المهتمين بالصحة والشركاء. هدفنا هو الحفاظ على Health Fingerprint دقيقة ومفيدة وسهلة الفهم. عند التواصل معنا، يرجى تضمين أكبر قدر ممكن من التفاصيل حتى نتمكن من المساعدة بسرعة.',
    getInTouch: 'معلومات التواصل', email: 'البريد الإلكتروني', website: 'الموقع', response: 'وقت الاستجابة', responseValue: 'خلال 24–48 ساعة عمل',
    whyTitle: 'كيف يمكننا المساعدة', why: ['الإبلاغ عن خطأ في حاسبة أو قيمة غذائية غير صحيحة أو صفحة معطلة.', 'اقتراح وصفات جديدة أو أدوات صحية أو مواضيع تعليمية.', 'السؤال عن المصادر التحريرية أو التحديثات أو تصحيح المحتوى.', 'استفسارات الأعمال أو الشراكات أو الإعلام.'],
    formTitle: 'أرسل لنا رسالة', name: 'الاسم', emailLabel: 'البريد الإلكتروني', message: 'الرسالة', namePh: 'اسمك الكامل', emailPh: 'you@example.com', msgPh: 'أخبرنا كيف يمكننا مساعدتك...', send: 'إرسال الرسالة', sending: 'جارٍ الإرسال...',
    sentTitle: 'تم إرسال الرسالة', sentDesc: 'شكرًا لتواصلك مع Health Fingerprint. تلقينا رسالتك وسنرد في أقرب وقت ممكن.',
    error: 'حدث خطأ. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة.', privacy: 'نستخدم رسالتك فقط للرد على استفسارك. يرجى عدم إرسال معلومات طبية حساسة أو تشخيصات أو طلبات طارئة عبر هذا النموذج.'
  },
  fr: {
    badge: 'Contact et support', title: 'Contacter Health Fingerprint', subtitle: 'Nous répondons généralement sous 24 à 48 heures ouvrables.',
    intro: 'Vous avez une question sur nos calculateurs, trouvé un problème dans une recette ou un article, ou souhaitez suggérer une fonctionnalité ? Nous accueillons les retours des lecteurs, des utilisateurs soucieux de leur santé et des partenaires. Notre objectif est de garder Health Fingerprint précis, utile et facile à comprendre. Merci d’inclure autant de détails que possible.',
    getInTouch: 'Nous contacter', email: 'E-mail', website: 'Site web', response: 'Délai de réponse', responseValue: 'Sous 24 à 48 heures ouvrables',
    whyTitle: 'Comment nous pouvons aider', why: ['Signaler un bug de calculateur, une valeur nutritionnelle incorrecte ou une page cassée.', 'Suggérer de nouvelles recettes, outils santé ou sujets éducatifs.', 'Poser des questions sur les sources, mises à jour ou corrections.', 'Demandes commerciales, partenariats ou médias.'],
    formTitle: 'Envoyer un message', name: 'Nom', emailLabel: 'E-mail', message: 'Message', namePh: 'Votre nom complet', emailPh: 'you@example.com', msgPh: 'Dites-nous comment nous pouvons aider...', send: 'Envoyer le message', sending: 'Envoi...',
    sentTitle: 'Message envoyé', sentDesc: 'Merci d’avoir contacté Health Fingerprint. Nous avons bien reçu votre message et répondrons dès que possible.',
    error: 'Une erreur s’est produite. Veuillez réessayer ou nous écrire directement.', privacy: 'Nous utilisons votre message uniquement pour répondre à votre demande. N’envoyez pas d’informations médicales sensibles ou de demandes d’urgence via ce formulaire.'
  },
  es: {
    badge: 'Contacto y soporte', title: 'Contactar con Health Fingerprint', subtitle: 'Normalmente respondemos en 24–48 horas laborables.',
    intro: '¿Tienes una pregunta sobre nuestras calculadoras, encontraste un problema en una receta o artículo, o quieres sugerir una función? Agradecemos los comentarios de lectores, usuarios y socios. Nuestro objetivo es mantener Health Fingerprint preciso, útil y fácil de entender. Incluye todos los detalles posibles para ayudarte rápidamente.',
    getInTouch: 'Ponte en contacto', email: 'Correo', website: 'Sitio web', response: 'Tiempo de respuesta', responseValue: 'Dentro de 24–48 horas laborables',
    whyTitle: 'Cómo podemos ayudar', why: ['Informar de un error en calculadoras, valores nutricionales o páginas.', 'Sugerir nuevas recetas, herramientas de salud o temas educativos.', 'Preguntar sobre fuentes editoriales, actualizaciones o correcciones.', 'Consultas comerciales, asociaciones o medios.'],
    formTitle: 'Envíanos un mensaje', name: 'Nombre', emailLabel: 'Correo electrónico', message: 'Mensaje', namePh: 'Tu nombre completo', emailPh: 'you@example.com', msgPh: 'Cuéntanos cómo podemos ayudarte...', send: 'Enviar mensaje', sending: 'Enviando...',
    sentTitle: 'Mensaje enviado', sentDesc: 'Gracias por contactar con Health Fingerprint. Hemos recibido tu mensaje y responderemos lo antes posible.',
    error: 'Algo salió mal. Inténtalo de nuevo o escríbenos directamente.', privacy: 'Usamos tu mensaje solo para responder a tu consulta. No envíes información médica sensible, diagnósticos ni solicitudes de emergencia por este formulario.'
  },
  hi: {
    badge: 'संपर्क और सहायता', title: 'Health Fingerprint से संपर्क करें', subtitle: 'हम आमतौर पर 24–48 कार्य घंटों में जवाब देते हैं।',
    intro: 'क्या आपके पास हमारे कैलकुलेटर के बारे में कोई प्रश्न है, किसी रेसिपी या लेख में समस्या मिली है, या कोई फीचर सुझाना चाहते हैं? हम पाठकों, स्वास्थ्य-जागरूक उपयोगकर्ताओं और साझेदारों की प्रतिक्रिया का स्वागत करते हैं। हमारा लक्ष्य Health Fingerprint को सटीक, उपयोगी और समझने में आसान बनाए रखना है। कृपया संपर्क करते समय जितना संभव हो उतना विवरण दें।',
    getInTouch: 'संपर्क करें', email: 'ईमेल', website: 'वेबसाइट', response: 'प्रतिक्रिया समय', responseValue: '24–48 कार्य घंटों के भीतर',
    whyTitle: 'हम कैसे मदद कर सकते हैं', why: ['कैलकुलेटर बग, गलत पोषण मान या टूटा हुआ पेज रिपोर्ट करें।', 'नई रेसिपी, स्वास्थ्य टूल या शैक्षिक विषय सुझाएँ।', 'संपादकीय स्रोतों, अपडेट या सुधारों के बारे में पूछें।', 'व्यावसायिक, साझेदारी या मीडिया पूछताछ।'],
    formTitle: 'हमें संदेश भेजें', name: 'नाम', emailLabel: 'ईमेल', message: 'संदेश', namePh: 'आपका पूरा नाम', emailPh: 'you@example.com', msgPh: 'बताएँ हम आपकी कैसे मदद कर सकते हैं...', send: 'संदेश भेजें', sending: 'भेजा जा रहा है...',
    sentTitle: 'संदेश भेज दिया गया', sentDesc: 'Health Fingerprint से संपर्क करने के लिए धन्यवाद। हमें आपका संदेश मिल गया है और हम जल्द ही जवाब देंगे।',
    error: 'कुछ गलत हो गया। कृपया फिर से प्रयास करें या सीधे ईमेल करें।', privacy: 'हम आपके संदेश का उपयोग केवल आपकी पूछताछ का जवाब देने के लिए करते हैं। कृपया इस फॉर्म के माध्यम से संवेदनशील चिकित्सा जानकारी, निदान या आपातकालीन अनुरोध न भेजें।'
  },
  de: {
    badge: 'Kontakt & Support', title: 'Health Fingerprint kontaktieren', subtitle: 'Wir antworten in der Regel innerhalb von 24–48 Werktunden.',
    intro: 'Haben Sie Fragen zu unseren Rechnern, einen Fehler in einem Rezept oder Artikel gefunden oder möchten Sie eine Funktion vorschlagen? Wir freuen uns über Feedback. Bitte geben Sie möglichst viele Details an, damit wir schnell helfen können.',
    getInTouch: 'Kontakt', email: 'E-Mail', website: 'Website', response: 'Antwortzeit', responseValue: 'Innerhalb von 24–48 Werktunden',
    whyTitle: 'Wobei wir helfen können', why: ['Fehler bei Rechnern, Nährwerten oder Seiten melden.', 'Neue Rezepte, Tools oder Themen vorschlagen.', 'Fragen zu Quellen, Updates oder Korrekturen.', 'Geschäftliche oder Medienanfragen.'],
    formTitle: 'Nachricht senden', name: 'Name', emailLabel: 'E-Mail', message: 'Nachricht', namePh: 'Ihr vollständiger Name', emailPh: 'you@example.com', msgPh: 'Wie können wir helfen...', send: 'Nachricht senden', sending: 'Wird gesendet...',
    sentTitle: 'Nachricht gesendet', sentDesc: 'Vielen Dank für Ihre Nachricht. Wir melden uns so schnell wie möglich.',
    error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.', privacy: 'Wir verwenden Ihre Nachricht nur zur Beantwortung Ihrer Anfrage. Senden Sie keine sensiblen medizinischen Informationen über dieses Formular.'
  },
};

const ContactUs: React.FC = () => {
  const { language, dir } = useLanguage();
  const c = COPY[language] || COPY.en;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '5a5b7396-f494-4c4c-8537-5287489b7d40',
          name: formData.name, email: formData.email, message: formData.message,
        }),
      });
      const result = await response.json();
      if (result.success) { setSubmitted(true); setFormData({ name: '', email: '', message: '' }); }
      else setError(c.error);
    } catch { setError(c.error); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]" dir={dir}>
      <SEO title={`${c.title} | Health Fingerprint`} description={c.subtitle} url="/contact" />
      <div className="bg-gradient-to-r from-[#0F4C3A] to-[#1a6b53] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-[#D4A017]">{c.badge}</span>
          <h1 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight mt-4">{c.title}</h1>
          <p className="text-white/85 mt-3 max-w-3xl leading-relaxed">{c.intro}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-5">
            <div className="card">
              <h2 className="text-base font-bold text-gray-900 mb-5">{c.getInTouch}</h2>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3"><Mail className="w-5 h-5 text-[#0F4C3A] mt-0.5" /><div><p className="font-semibold text-gray-900">{c.email}</p><a href="mailto:contact@healthfingerprint.com" className="text-gray-500 hover:text-[#0F4C3A]">contact@healthfingerprint.com</a></div></div>
                <div className="flex gap-3"><Globe className="w-5 h-5 text-[#0F4C3A] mt-0.5" /><div><p className="font-semibold text-gray-900">{c.website}</p><a href="https://healthfingerprint.com" className="text-gray-500 hover:text-[#0F4C3A]">www.healthfingerprint.com</a></div></div>
                <div className="flex gap-3"><Clock className="w-5 h-5 text-[#0F4C3A] mt-0.5" /><div><p className="font-semibold text-gray-900">{c.response}</p><p className="text-gray-500">{c.responseValue}</p></div></div>
              </div>
            </div>
            <div className="card">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"><MessageSquare size={18} className="text-[#0F4C3A]" />{c.whyTitle}</h2>
              <ul className="space-y-3 text-sm text-gray-600">
                {c.why.map((item, i) => <li key={i} className="flex gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4A017] shrink-0" />{item}</li>)}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-base font-bold text-gray-900 mb-5">{c.formTitle}</h2>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><ShieldCheck className="w-8 h-8 text-emerald-600" /></div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{c.sentTitle}</h3>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">{c.sentDesc}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div><label htmlFor="contact-name" className="label">{c.name}</label><input id="contact-name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" placeholder={c.namePh} name="contact-name" /></div>
                  <div><label htmlFor="contact-email" className="label">{c.emailLabel}</label><input id="contact-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-field" placeholder={c.emailPh} name="contact-email" /></div>
                  <div><label htmlFor="contact-message" className="label">{c.message}</label><textarea id="contact-message" required rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="input-field resize-none" placeholder={c.msgPh} name="contact-message" /></div>
                  {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg flex gap-2"><AlertCircle size={16} className="mt-0.5 shrink-0" />{error}</div>}
                  <div className="text-xs text-gray-500 bg-amber-50 border border-amber-100 rounded-lg p-3">{c.privacy}</div>
                  <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>{isSubmitting ? c.sending : c.send}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
