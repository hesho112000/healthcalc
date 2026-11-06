import type { TranslationKeys } from '../translationTypes';
import en from './en';

/**
 * Hindi locale.
 *
 * The dictionary starts from English and overrides the strings that have been
 * translated so far. Untranslated keys therefore inherit English instead of
 * rendering the raw key, which keeps the UI usable during the rollout.
 */
const hi: TranslationKeys = {
  ...en,

  // Header / navigation
  searchPlaceholder: 'स्वास्थ्य कैलकुलेटर खोजें...',
  searchResultsTitle: 'खोज परिणाम',
  searchResultsFor: 'के लिए परिणाम',
  home: 'होम',
  weightLoss: 'वज़न और फ़िटनेस',
  diabetes: 'मधुमेह और उच्च रक्तचाप',

  'nav.home': 'होम',
  'nav.calculators': 'कैलकुलेटर और फ़िटनेस',
  'nav.advancedCare': 'स्वास्थ्य उपकरण',
  'nav.myHealthHub': 'मेरा स्वास्थ्य केंद्र',
  'nav.resources': 'संसाधन',
  'nav.about': 'परिचय',
  'nav.contact': 'संपर्क',
  'nav.login': 'लॉग इन',
  'nav.startNow': 'अभी शुरू करें',
  'nav.profile': 'प्रोफ़ाइल',
  'nav.signOut': 'साइन आउट',
  'nav.foodLibrary': 'खाद्य पुस्तकालय',

  // Hero
  heroTitle: 'आपका व्यक्तिगत स्वास्थ्य और फ़िटनेस ब्लूप्रिंट',
  heroSubtitle:
    'मुफ़्त AI-आधारित BMI, BMR और TDEE कैलकुलेटर, साथ ही मधुमेह, उच्च रक्तचाप, कोलेस्ट्रॉल और गाउट के लिए उन्नत देखभाल।',
  heroCTA: 'मुफ़्त शुरू करें',

  // Form labels
  age: 'उम्र',
  gender: 'लिंग',
  male: 'पुरुष',
  female: 'महिला',
  height: 'लंबाई',
  weightLabel: 'वज़न',
  activityLevel: 'गतिविधि स्तर',
  goal: 'मुख्य लक्ष्य',
  sedentary: 'बैठे रहने वाला (बहुत कम व्यायाम)',
  light: 'हल्का सक्रिय (सप्ताह में 1-3 दिन)',
  moderate: 'मध्यम सक्रिय (सप्ताह में 3-5 दिन)',
  active: 'सक्रिय (सप्ताह में 6-7 दिन)',
  maintain: 'वज़न बनाए रखें',
  gainMuscle: 'मांसपेशियाँ बढ़ाएँ',

  // Results
  calculate: 'गणना करें',
  dailyCalories: 'दैनिक कैलोरी',
  macros: 'मैक्रोन्यूट्रिएंट',
  protein: 'प्रोटीन',
  carbs: 'कार्बोहाइड्रेट',
  fat: 'वसा',
  mealPlan: '1-दिन की भोजन योजना',
  workoutPlan: 'व्यायाम दिनचर्या',

  // Resource hub
  'resources.hero.eyebrow': 'संसाधन',
  'resources.hero.title': 'सीखें। पकाएँ। आगे बढ़ें।',
  'resources.hero.subtitle':
    'लेख, व्यंजन और व्यायाम मार्गदर्शिकाएँ — सभी आपकी स्वास्थ्य यात्रा के अनुरूप।',
  'resources.categories.all': 'सभी',
  'resources.categories.articles': 'लेख',
  'resources.categories.recipes': 'व्यंजन',
  'resources.categories.exercises': 'व्यायाम',
  'resources.tag.article': 'लेख',
  'resources.tag.recipe': 'व्यंजन',
  'resources.tag.exercise': 'व्यायाम मार्गदर्शिका',
  'resources.articles.title': 'लेख',
  'resources.recipes.title': 'व्यंजन',
  'resources.exercises.title': 'व्यायाम मार्गदर्शिकाएँ',

  // Recipe page
  'recipe.notFound': 'व्यंजन नहीं मिला',
  'recipe.backToResources': 'संसाधनों पर वापस जाएँ',
  'recipe.ingredients': 'सामग्री',
  'recipe.instructions': 'विधि',
  'recipe.nutrition': 'पोषण तथ्य',
  'recipe.prepTime': 'तैयारी का समय',
  'recipe.calories': 'कैलोरी',
  'recipe.protein': 'प्रोटीन',
  'recipe.carbs': 'कार्बोहाइड्रेट',
  'recipe.fat': 'वसा',

  // Footer
  privacyPolicy: 'गोपनीयता नीति',
  termsOfService: 'सेवा की शर्तें',
  medicalDisclaimer: 'चिकित्सा अस्वीकरण',
  contactUs: 'संपर्क करें',
  sendMessage: 'संदेश भेजें',
};

export default hi;
