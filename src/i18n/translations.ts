import { Language } from '../types';

type TranslationKeys = {
  // Header
  appName: string;
  tagline: string;
  searchPlaceholder: string;
  // Nav
  home: string;
  weightLoss: string;
  diabetes: string;
  premium: string;
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroCTA: string;
  // Module titles
  module1Title: string;
  module1Desc: string;
  module2Title: string;
  module2Desc: string;
  module3Title: string;
  module3Desc: string;
  // Form labels
  age: string;
  gender: string;
  male: string;
  female: string;
  height: string;
  weightLabel: string;
  activityLevel: string;
  goal: string;
  // Activity levels
  sedentary: string;
  light: string;
  moderate: string;
  active: string;
  veryActive: string;
  // Goals
  loseWeight: string;
  maintain: string;
  gainMuscle: string;
  // Results
  calculate: string;
  dailyCalories: string;
  macros: string;
  protein: string;
  carbs: string;
  fat: string;
  mealPlan: string;
  workoutPlan: string;
  // Units
  kg: string;
  cm: string;
  years: string;
  // Diabetes
  fastingGlucose: string;
  postPrandialGlucose: string;
  hba1c: string;
  systolicBP: string;
  diastolicBP: string;
  analyzeLabs: string;
  labResults: string;
  // Premium
  unlockPremium: string;
  premiumPrice: string;
  premiumDesc: string;
  // Footer
  privacyPolicy: string;
  termsOfService: string;
  medicalDisclaimer: string;
  contactUs: string;
  allRights: string;
  disclaimer: string;
  // Contact
  contactName: string;
  contactEmail: string;
  contactMessage: string;
  contactSupportBadge: string;
  contactRespondSubtitle: string;
  contactGetInTouch: string;
  contactInfoEmail: string;
  contactInfoWebsite: string;
  contactInfoResponseTime: string;
  contactResponseTimeValue: string;
  contactFormTitle: string;
  contactPlaceholderMessage: string;
  contactSentTitle: string;
  contactSentDesc: string;
  sendMessage: string;
  // Homepage
  healthTools: string;
  healthToolsDesc: string;
  getStarted: string;
  // Calculator
  enterDetails: string;
  enterDetailsDesc: string;
  yourProfile: string;
  // Misc
  sponsored: string;
  sponsoredAd: string;
  cmUnit: string;
  kgUnit: string;
  mmolUnit: string;
  mgUnit: string;
  resultCategory: string;
  recommendation: string;
  locked: string;
  unlock: string;
  // BMI Calculator
  bmiTitle: string;
  bmiSubtitle: string;
  bmiYourDetails: string;
  bmiYourBmi: string;
  bmiKgM2: string;
  bmiUnderweight: string;
  bmiNormal: string;
  bmiOverweight: string;
  bmiObese: string;
  bmiRisk: string;
  bmiValue: string;
  bmiHealthyRange: string;
  bmiIdealWeight: string;
  bmiCrossPromo: string;
  bmiCrossPromoDiabetes: string;
  bmiCrossPromoCholesterol: string;
  bmiCrossPromoGeneral: string;
  bmiRecommendations: string;
  bmiRecUnder1: string;
  bmiRecUnder2: string;
  bmiRecUnder3: string;
  bmiRecNormal1: string;
  bmiRecNormal2: string;
  bmiRecNormal3: string;
  bmiRecOver1: string;
  bmiRecOver2: string;
  bmiRecOver3: string;
  bmiRecObese1: string;
  bmiRecObese2: string;
  bmiRecObese3: string;
  bmiFormulaTitle: string;
  bmiFormulaExample: string;
  bmiFormulaNote: string;
  bmiTableTitle: string;
  bmiRiskTitle: string;
  bmiEmptyTitle: string;
  bmiEmptyDesc: string;
  bmiCalculator: string;
  // Calculators Hub
  calcNav: string;
  calcTitle: string;
  calcSubtitle: string;
  calcSharedProfile: string;
  calcSharedHint: string;
  calcSedentary: string;
  calcLight: string;
  calcModerate: string;
  calcActive: string;
  calcVeryActive: string;
  calcBmiTitle: string;
  calcBmiSubtitle: string;
  calcBmiValue: string;
  calcBmiHealthy: string;
  calcBmiUnder: string;
  calcBmiNormal: string;
  calcBmiOver: string;
  calcBmiObese: string;
  calcBmrTitle: string;
  calcBmrSubtitle: string;
  calcBmrLabel: string;
  calcTdee: string;
  calcGoalLose: string;
  calcGoalMaintain: string;
  calcGoalGain: string;
  calcCalTitle: string;
  calcCalSubtitle: string;
  calcDailyTarget: string;
  calcIdealTitle: string;
  calcIdealSubtitle: string;
  calcIdealMin: string;
  calcIdealMid: string;
  calcIdealMax: string;
  calcIdealBelow: string;
  calcIdealBelowDesc: string;
  calcIdealAbove: string;
  calcIdealAboveDesc: string;
  calcIdealPerfect: string;
  calcIdealPerfectDesc: string;
  calcBridgeTitle: string;
  calcBridgeDesc: string;
  calcBridgeCalTitle: string;
  calcBridgeCalDesc: string;
  calcBridgeAdvanced: string;
  calcBridgeAdvancedDesc: string;
  calcBridgeWeight: string;
  calcBridgeWeightDesc: string;
  calcSaved: string;
  calcSavedDesc: string;
  calcSummary: string;
  calcGoAdvanced: string;
  calcHowTitle: string;
  calcHow1: string;
  calcHow2: string;
  calcHow3: string;
  calcEmptyTitle: string;
  calcEmptyDesc: string;
  calcEduFormula: string;
  calcEduFormulaNote: string;
  calcEduBmiTable: string;
  // Fitness & Health Calculator
  fcNav: string;
  fcTitle: string;
  fcSubtitle: string;
  fcProfile: string;
  fcProfileHint: string;
  fcSedentary: string;
  fcLight: string;
  fcModerate: string;
  fcActive: string;
  fcVeryActive: string;
  fcTabBmi: string;
  fcTabBmr: string;
  fcTabCal: string;
  fcTabIdeal: string;
  fcBmiYourBmi: string;
  fcBmiRisk: string;
  fcBmiValue: string;
  fcBmiHealthy: string;
  fcBmiIdeal: string;
  fcBmiUnder: string;
  fcBmiNormal: string;
  fcBmiOver: string;
  fcBmiObese: string;
  fcBmrLabel: string;
  fcBmrDesc: string;
  fcBmrTdee: string;
  fcBmrTdeeDesc: string;
  fcCalDaily: string;
  fcCalLose: string;
  fcCalMaintain: string;
  fcCalGain: string;
  fcCalMacros: string;
  fcIdealMin: string;
  fcIdealMid: string;
  fcIdealMax: string;
  fcIdealBelow: string;
  fcIdealBelowDesc: string;
  fcIdealAbove: string;
  fcIdealAboveDesc: string;
  fcIdealPerfect: string;
  fcIdealPerfectDesc: string;
  fcBridgeBmi: string;
  fcBridgeBmiDesc: string;
  fcBridgeBmr: string;
  fcBridgeBmrDesc: string;
  fcBridgeCal: string;
  fcBridgeCalDesc: string;
  fcBridgeIdeal: string;
  fcBridgeIdealDesc: string;
  fcSaved: string;
  fcSavedDesc: string;
  fcViewFormula: string;
  fcViewBmiTable: string;
  fcViewRisks: string;
  fcFormulaNote: string;
  fcCtaLabel: string;
  fcCtaHeadline: string;
  fcCtaSub: string;
  fcCtaButton: string;
  fcCtaLaunch: string;
  fcCtaLaunchSub: string;
  fcRedirecting: string;
  // Smartwatch Sync
  swNav: string;
  swTitle: string;
  swSubtitle: string;
  swHeroDesc: string;
  swDashboard: string;
  swGuide: string;
  swGuideLabel: string;
  swSettings: string;
  swConnected: string;
  swNotConnected: string;
  swLastSync: string;
  swNeverSynced: string;
  swSyncing: string;
  swSyncNow: string;
  swDisconnect: string;
  swConnectWatch: string;
  swHealthPlatform: string;
  swAppleHealth: string;
  swGoogleHealthConnect: string;
  swWebBrowser: string;
  swActive: string;
  swInactive: string;
  swHeartRate: string;
  swSteps: string;
  swActiveCalories: string;
  swSleep: string;
  swWeight: string;
  swSpO2: string;
  swStress: string;
  swFloors: string;
  swBpm: string;
  swKcal: string;
  swHrs: string;
  swResting: string;
  swDeep: string;
  swMinCardio: string;
  swStepsUnit: string;
  swFloorsUnit: string;
  swAiHealthTips: string;
  swDynamicPlan: string;
  swCalorieAdj: string;
  swKcalPerDay: string;
  swActivityGoal: string;
  swStepsPerDay: string;
  swHydration: string;
  swLitersPerDay: string;
  swRestDay: string;
  swRecommended: string;
  swActiveDay: string;
  swSyncHistory: string;
  swNoDataYet: string;
  swNoDataDesc: string;
  swSetupGuide: string;
  swSetupGuideDesc: string;
  swPrev: string;
  swNext: string;
  swSupportedWatches: string;
  swConnectionSettings: string;
  swAutoSync: string;
  swAutoSyncDesc: string;
  swSyncNotifications: string;
  swSyncNotifDesc: string;
  swDataPermissions: string;
  swGranted: string;
  swAdvanced: string;
  swExportData: string;
  swClearHistory: string;
  swDisconnectRemove: string;
  swInstallTitle: string;
  swInstallIos: string;
  swInstallAndroid: string;
  swInstallWeb: string;
  swConnectIosTitle: string;
  swConnectAndroidTitle: string;
  swConnectWebTitle: string;
  swPairWatch: string;
  swPairIosTitle: string;
  swPairAndroidTitle: string;
  swPairWebTitle: string;
  swTrackProgress: string;
  swGuideStep1: string;
  swGuideStep2: string;
  swGuideStep3: string;
  swGuideStep4: string;
  swGuideStep5: string;
  // Smartwatch Sync — Setup Guide (platform-specific)
  syncGuideInstallTitleIos: string;
  syncGuideInstallTitleAndroid: string;
  syncGuideInstallTitleWeb: string;
  syncGuideConnectTitleIos: string;
  syncGuideConnectTitleAndroid: string;
  syncGuideConnectTitleWeb: string;
  syncGuidePairTitle: string;
  syncGuideTrackTitle: string;
  syncGuideInstallIos1: string;
  syncGuideInstallIos2: string;
  syncGuideInstallIos3: string;
  syncGuideInstallIos4: string;
  syncGuideInstallIos5: string;
  syncGuideInstallAndroid1: string;
  syncGuideInstallAndroid2: string;
  syncGuideInstallAndroid3: string;
  syncGuideInstallAndroid4: string;
  syncGuideInstallAndroid5: string;
  syncGuideInstallWeb1: string;
  syncGuideInstallWeb2: string;
  syncGuideInstallWeb3: string;
  syncGuideInstallWeb4: string;
  syncGuideConnectIos1: string;
  syncGuideConnectIos2: string;
  syncGuideConnectIos3: string;
  syncGuideConnectIos4: string;
  syncGuideConnectIos5: string;
  syncGuideConnectAndroid1: string;
  syncGuideConnectAndroid2: string;
  syncGuideConnectAndroid3: string;
  syncGuideConnectAndroid4: string;
  syncGuideConnectAndroid5: string;
  syncGuideConnectWeb1: string;
  syncGuideConnectWeb2: string;
  syncGuideConnectWeb3: string;
  syncGuideConnectWeb4: string;
  syncGuideConnectWeb5: string;
  syncGuidePairIos1: string;
  syncGuidePairIos2: string;
  syncGuidePairIos3: string;
  syncGuidePairIos4: string;
  syncGuidePairIos5: string;
  syncGuidePairAndroid1: string;
  syncGuidePairAndroid2: string;
  syncGuidePairAndroid3: string;
  syncGuidePairAndroid4: string;
  syncGuidePairAndroid5: string;
  syncGuidePairWeb1: string;
  syncGuidePairWeb2: string;
  syncGuidePairWeb3: string;
  syncGuidePairWeb4: string;
  syncGuideTrack1: string;
  syncGuideTrack2: string;
  syncGuideTrack3: string;
  syncGuideTrack4: string;
  syncGuideTrack5: string;
  // Smartwatch Sync — Action feedback
  swSyncCompleteToast: string;
  swExportedToast: string;
  swNothingToExport: string;
  swHistoryClearedToast: string;
  swDisconnectedToast: string;
  // Smartwatch Sync — Stress levels & units
  swStressLow: string;
  swStressModerate: string;
  swStressHigh: string;
  swKm: string;
  // Install Banner
  installTitle: string;
  installIosHint: string;
  installHint: string;
  installBtn: string;
  installNotNow: string;
  // Dashboard Widget
  widgetTitle: string;
  widgetLastSync: string;
  widgetNever: string;
  widgetSyncing: string;
  widgetSync: string;
  widgetViewAll: string;
  widgetHeart: string;
  widgetCalories: string;
  widgetSleepLabel: string;
  widgetNoData: string;
  widgetConnectWatch: string;
  // Dashboard Page
  dashWelcome: string;
  dashPremium: string;
  dashFreePlan: string;
  dashRenews: string;
  dashHealthHistory: string;
  dashProfileSettings: string;
  dashTotalRecords: string;
  dashModulesUsed: string;
  dashMemberSince: string;
  dashNA: string;
  dashAll: string;
  dashLoading: string;
  dashNoRecords: string;
  dashNoRecordsDesc: string;
  dashTryCalc: string;
  dashDate: string;
  dashModule: string;
  dashKeyData: string;
  dashNotes: string;
  dashActions: string;
  dashDelete: string;
  dashPrev: string;
  dashPageOf: string;
  dashNext: string;
  dashProfileInfo: string;
  dashName: string;
  dashEmail: string;
  dashEmailCantChange: string;
  dashSubscription: string;
  dashUpgrade: string;
  dashSaveChanges: string;
  dashChangePassword: string;
  dashCurrentPassword: string;
  dashNewPassword: string;
  dashMinChars: string;
  dashConfirmPassword: string;
  dashUpdatePassword: string;
  dashProfileUpdated: string;
  dashPasswordsNoMatch: string;
  dashPasswordMin: string;
  dashPasswordChanged: string;
  dashDeleteConfirm: string;
  // Auth Pages
  authWelcomeBack: string;
  authSignInDesc: string;
  authEmailAddress: string;
  authPassword: string;
  authSigningIn: string;
  authNoAccount: string;
  authCreateOne: string;
  authCreateAccount: string;
  authRegisterDesc: string;
  authFullName: string;
  authConfirmPassword: string;
  authRepeatPassword: string;
  authCreatingAccount: string;
  authAlreadyHave: string;
  authSignIn: string;
  authPasswordsMatch: string;
  authPasswordMin6: string;
  authRegisterFailed: string;
  authLoginFailed: string;
  // Header
  headerDashboard: string;
  headerSignOut: string;
  headerSignIn: string;
  headerSignUp: string;
  headerNoResults: string;
  // Footer
  footerTagline: string;
  footerQuickLinks: string;
  footerLegal: string;
  footerHealthGuides: string;
  // Home Page
  homeAIPill: string;
  homeHowItWorks: string;
  homeHowItWorksDesc: string;
  homeStep: string;
  homeEnterProfile: string;
  homeEnterProfileDesc: string;
  homeGetPlan: string;
  homeGetPlanDesc: string;
  homeTrackAdapt: string;
  homeTrackAdaptDesc: string;
  homeSpecializedPlans: string;
  homeSpecializedPlansDesc: string;
  homeScienceBased: string;
  homeScienceBasedDesc: string;
  homeMultiLang: string;
  homeMultiLangDesc: string;
  homePrivacyFirst: string;
  homePrivacyFirstDesc: string;
  homeMobileFriendly: string;
  homeMobileFriendlyDesc: string;
  homeInstantResults: string;
  homeInstantResultsDesc: string;
  homeLabInterpreter: string;
  homeLabInterpreterDesc: string;
  homeWhyTitle: string;
  homeWhySubtitle: string;
  homeGuidelinesTitle: string;
  homeGuidelinesSubtitle: string;
  // Medical Disclaimer
  mdDismiss: string;
  // Breadcrumbs
  bcHome: string;
  bcLanding: string;
  bcLandingWeightLossHypertension: string;
  bcLandingDiabetesMealPlan40f: string;
  bcLandingMuscleBuilding80kg: string;
  bcLandingPcosWeightLoss: string;
  bcLandingKetoDiabetes: string;
  bcLandingSeniorFitness: string;
  bcLandingPostPregnancyWeightLoss: string;
  bcLandingAthleticPerformance: string;
  // Common
  commonComplete: string;
  commonDailyProgress: string;
  commonDay: string;
  commonDays: string;
  commonBest: string;
  commonToday: string;
  commonDone: string;
  commonPending: string;
  commonJourney: string;
  commonCompleted: string;
  commonSmartSwap: string;
  commonStreak: string;
  commonPrint: string;
  commonEmail: string;
  commonCancel: string;
  commonSave: string;
  commonDelete: string;
  commonLoading: string;
  commonExercises: string;
  commonTotalSets: string;
  commonRestDay: string;
  commonExInfo: string;
  // Missing keys for HomePage + MedicalDisclaimer
  mdTitle: string;
  homeWeightLossDesc: string;
  homeDiabetesDesc: string;
  homeHypertension: string;
  homeHypertensionDesc: string;
  homeCholesterol: string;
  homeCholesterolDesc: string;
  homeLiver: string;
  homeLiverDesc: string;
  homeKidney: string;
  homeKidneyDesc: string;
  homeGout: string;
  homeGoutDesc: string;
  homeIBS: string;
  homeIBSDesc: string;
  homeThyroid: string;
  homeThyroidDesc: string;
  homeSmartwatchDesc: string;
  premiumRequired: string;
  loading: string;
  premiumUnlockDescription: string;
  upgradeToPremium: string;
  loginRequired: string;
  loginToSubscribe: string;
  ok: string;
  notFoundTitle: string;
  notFoundDesc: string;
  backToHome: string;
  saveProgress: string;
  saved: string;
  saving: string;
  loginToSave: string;
  failedToSave: string;
  plan: string;
  dayLabel: string;
  streak: string;
  days: string;
  best: string;
  today: string;
  done: string;
  pending: string;
  journey: string;
  allComplete: string;
  dailyProgress: string;
  completed: string;
  proteinLabel: string;
  carbsLabel: string;
  fatLabel: string;
  smartSwap: string;
  mealPlanTitle: string;
  mealPlanSubtitle: string;
  dailyCaloricTarget: string;
  waterGoal: string;
  mealsDone: string;
  downloadPdf: string;
  emailPlan: string;
  progressTracker: string;
  ofMeals: string;
  water: string;
  eaten: string;
  mealsCompleted: string;
  close: string;
  altOptions: string;
  kcal: string;
  dashOfflineTitle: string;
  dashOfflineDesc: string;
  backendUnavailable: string;
  chooseCuisine: string;
  // Food library
  foodLibTitle: string;
  foodLibSubtitle: string;
  foodLibSearchBadge: string;
  foodLibSearchLabel: string;
  foodLibSearchPlaceholder: string;
  foodLibCuisineLabel: string;
  foodLibAllCuisines: string;
  foodLibSortLabel: string;
  foodLibSortCalories: string;
  foodLibSortHighProtein: string;
  foodLibSortName: string;
  foodLibCaloriesFilter: string;
  foodLibCalLow: string;
  foodLibCalMid: string;
  foodLibCalHigh: string;
  foodLibCalAll: string;
  foodLibResults: string;
  foodLibAll: string;
  foodLibColItem: string;
  foodLibColCuisine: string;
  foodLibColPortion: string;
  foodLibColCalories: string;
  foodLibColProtein: string;
  foodLibColCarbs: string;
  foodLibColFat: string;
  foodLibUsdaBadge: string;
  foodLibNoResults: string;
  foodLibClearFilters: string;
  foodLibSeoTitle: string;
  foodLibSeoBody: string;
  // Checkout / payment
  coAnnualSub: string;
  coAdvancedSuite: string;
  coAnnualBilling: string;
  coFullName: string;
  coEmailAddress: string;
  coCardNumber: string;
  coExpiryDate: string;
  coCvv: string;
  coSecurityNote: string;
  coPay: string;
  coProcessing: string;
  coVerifyWait: string;
  coPaymentSuccess: string;
  coWelcomeSuite: string;
  coRedirecting: string;
  coPaymentFailed: string;
  coTryAgain: string;
  coPaymentFailedFallback: string;
  cuSelected: string;
  cuNone: string;
  cuClear: string;
  adviceTitle: string;
  adviceLive: string;
  adviceBmi: string;
  adviceIdealWeight: string;
  adviceBmr: string;
  adviceGoalDeficit: string;
  adviceGoalSurplus: string;
  adviceGoalMaintain: string;
  adviceRecLoss: string;
  adviceProteinDay: string;
  adviceWaterDay: string;
  adviceMacros: string;
  adviceWeightMult: string;
  adviceWaterMult: string;
  adviceCatUnderweight: string;
  adviceCatNormal: string;
  adviceCatOverweight: string;
  adviceCatObese: string;
  adviceCondDiabetes: string;
  adviceCondDiabetesTip: string;
  adviceCondBp: string;
  adviceCondBpTip: string;
  adviceCondCholesterol: string;
  adviceCondCholesterolTip: string;
  cuisine: string;
  changeFromMain: string;
  print: string;
  todayPlan: string;
  noLabData: string;
  noLabDataDesc: string;
  wbTitle: string;
  wbSubtitle: string;
  wbDay: string;
  wbType: string;
  wbAuto: string;
  wbBurnTarget: string;
  wbGoal: string;
  wbExercisesDone: string;
  wbEmailPlan: string;
  wbDailyProgress: string;
  wbOfEx: string;
  wbLevelBeginner: string;
  wbLevelIntermediate: string;
  wbLevelAdvanced: string;
  wbDone: string;
  wbExercisesCompleted: string;
  mbBuild: string;
  mbPicked: string;
  mbUse: string;
  mbDetectedCuisine: string;
  mbDetectedRegion: string;
  mbAutoFill: string;
  mbGenerate30: string;
  mbDishes: string;
  mbTarget: string;
  mbSmartPortions: string;
  mbShowPlan: string;
  mbHidePlan: string;
  mbDish: string;
  mbGrams: string;
  mbCalories: string;
  mbProtein: string;
  mbTotal: string;
  mbCarbsFat: string;
  mbAdaptiveDesc: string;
  mbHeavy: string;
  mbExtras: string;
  mbBread: string;
  mbSalads: string;
  mbSides: string;
  mbDrinks: string;
  mbFruits: string;
  wlHeroPill: string;
  wlGoalSelector: string;
  wlExerciseType: string;
  wlAutoRecommend: string;
  wlFullWorkout: string;
  wlWorkoutHint: string;
  wlAgeYears: string;
  wlWorkoutDaysPerWeek: string;
  wlDays: string;
  wlSedentary: string;
  wlModerate: string;
  wlVeryActive: string;
  wlCaloriesSchedule: string;
  wlUsdaAccurate: string;
  wlCompleteAllMeals: string;
  wlFullPlan: string;
  wlSuggestions: string;
  wlCaloriesItem: string;
  wlProteinUnit: string;
  dbLabInterpreter: string;
  dbLabsEmpty: string;
  dbBpClassification: string;
  dbSystolicRange: string;
  dbDiastolicRange: string;
  dbRecommendations: string;
  dbBpClassifier: string;
  dbBpEmpty: string;
  db30DayMealPlan: string;
  dbFoundation: string;
  unitUs: string;
  ltpEmptyPrompt: string;
  pmIncExportDesc: string;
  pmCSVExport: string;
  pmEmail: string;
  pmIncExport: string;
  pmIncAIDesc: string;
  pmIncAI: string;
  pmIncTrackingDesc: string;
  pmIncTracking: string;
  pmIncPlansDesc: string;
  pmIncPlans: string;
  pmIncludeSub: string;
  pmWhatsIncluded: string;
  pmGuidelinesTitle: string;
  pmTriggersLogged: string;
  pmMilestones: string;
  pmDayStreak: string;
  pmCheckIns: string;
  pmAvg: string;
  pmRecentTrends: string;
  pmAdd: string;
  pmUnit: string;
  pmMilestoneDescPlaceholder: string;
  pmMilestoneCurrent: string;
  pmMilestoneTarget: string;
  pmWeeklyMilestones: string;
  pmTriggerPrefix: string;
  pmSaveTrigger: string;
  pmNotesPlaceholder: string;
  pmNotes: string;
  pmSeverity: string;
  pmSelectCustom: string;
  pmTriggerFood: string;
  pmSelectOption: string;
  pmSymptom: string;
  pmLogTrigger: string;
  pmSymptomLogSub: string;
  pmSymptomLog: string;
  pmDayLabel: string;
  pmSaveCheckIn: string;
  pmLogToday: string;
  pmCancel: string;
  pmDayOf30: string;
  pmDailyCheckIn: string;
  pm30DayPlanLabel: string;
  pmTabGuidelines: string;
  pmTabAnalytics: string;
  pmTabCheckin: string;
  pmTabPlan30: string;
  pmAIAutoAdj: string;
  pmStreakInfo: string;
  pmCheckInStreak: string;
  pmHealthScore: string;
  pmPlansGenerated: string;
  pmGeneratePlan: string;
  pmLabValues: string;
  pmPatientProfile: string;
  pmCustomized: string;
  pm30DayJourney: string;
  pmClickActivate: string;
  pmClickDeactivate: string;
  pmPremium: string;
  pmActive: string;
  pmConditionSub: string;
  pmConditionModules: string;
  pmCrossAdvisory: string;
  pmSuiteActiveSub: string;
  pmSuiteActive: string;
  pmHeroSub: string;
  pmFreeModules: string;
  pmSuiteBadge: string;
  ltpEmailReady: string;
  ltpEmailOpened: string;
  ltpEmailReport: string;
  ltpPrintReport: string;
  ltpClinicalSummary: string;
  ltpWeight: string;
  ltpDate: string;
  ltpWeightTrend: string;
  ltpFasting: string;
  ltpBPTrend: string;
  ltpPostprandial: string;
  ltpPostShort: string;
  ltpGlucoseTrend: string;
  ltpNoProgress: string;
  ltpClearAll: string;
  ltpEntries: string;
  ltpProgressTracking: string;
  ltpStatusOver: string;
  ltpStatusBelow: string;
  ltpStatusAttention: string;
  ltpStatusOnTrack: string;
  ltpStatusSafe: string;
  ltpActual: string;
  ltpTarget: string;
  ltpMetric: string;
  ltpDailyTracking: string;
  ltpShuffle: string;
  ltpMealSummary: string;
  ltpDailyMealPlan: string;
  ltpAHAGuidelines: string;
  ltpWeightAware: string;
  ltpDASHAligned: string;
  ltpDASHMeals: string;
  ltpHTPlan30: string;
  ltpBMITarget: string;
  ltpExercise: string;
  ltpPotassium: string;
  ltpSodium: string;
  ltpBPTarget: string;
  ltpAHATargets: string;
  ltpReading: string;
  ltpBPProfile: string;
  ltpHTSub: string;
  ltpHTPlan: string;
  ltpADAGuidelines: string;
  ltpAgeAdjusted: string;
  ltpExerciseProtocol: string;
  ltpCompleteExercises: string;
  ltpDownloadPrint: string;
  ltpOpenFullPlan: string;
  ltpADAAligned: string;
  ltpDiabetesMeals: string;
  ltpDiaPlan30: string;
  ltpFiberGoal: string;
  ltpCarbBudget: string;
  ltpGITarget: string;
  ltpCarbPerMeal: string;
  ltpPostMeal: string;
  ltpADATargets: string;
  ltpStatus: string;
  ltpGlucoseProfile: string;
  ltpFree: string;
  ltpDiaSub: string;
  ltpDiabetesPlan: string;
  ltpFat: string;
  ltpCarbs: string;
  ltpProtein: string;
  ltpTargetsSub: string;
  ltpDailyTargets: string;
  ltpRisk: string;
  ltpGlucose: string;
  ltpProgress: string;
  ltpShow: string;
  ltpHide: string;
  ltpEvaluate: string;
  ltpStage2: string;
  ltpStage1: string;
  ltpElevated: string;
  ltpNormal: string;
  ltpDiaShort: string;
  ltpSysShort: string;
  ltpDiastolicLabel: string;
  ltpSystolicLabel: string;
  ltpDiastolic: string;
  ltpSystolic: string;
  ltpBloodPressure: string;
  ltpHba1cRange: string;
  ltpPostRange: string;
  ltpPostLabel: string;
  ltpFastingRange: string;
  ltpFastingLabel: string;
  ltpBloodGlucose: string;
  ltpUserProfile: string;
  ltpProfileLabSub: string;
  ltpProfileLab: string;
  ltpHeroDesc: string;
  ltpHeroTitle: string;
  ltpEngine: string;
  unitMetric: string;



  // Meal labels
  mealBreakfast: string;
  mealLunch: string;
  mealDinner: string;
  mealMorningSnack: string;
  mealAfternoonSnack: string;
  mealSnack: string;
};

export const translations: Record<Language, TranslationKeys> = {
  en: {
    appName: 'HealthCalc.ai',
    mealBreakfast: 'Breakfast',
    mealLunch: 'Lunch',
    mealDinner: 'Dinner',
    mealMorningSnack: 'Morning Snack',
    mealAfternoonSnack: 'Afternoon Snack',
    mealSnack: 'Snack',
    tagline: 'Your AI Health Companion',
    searchPlaceholder: 'Search health calculators...',
    home: 'Home',
    weightLoss: 'Weight & Fitness',
    diabetes: 'Diabetes & Hypertension',
    premium: 'Advanced Care',
    heroTitle: 'Your Personalized Health & Fitness Blueprint',
    heroSubtitle: 'Science-backed calculators, meal plans, and workout routines powered by internationally recognized medical guidelines (ADA, DASH, USDA, ACSM).',
    heroCTA: 'Get Started Free',
    healthTools: 'Health Tools',
    healthToolsDesc: 'Professional calculators and planners backed by international medical guidelines',
    getStarted: 'Get Started',
    enterDetails: 'Enter Your Details',
    enterDetailsDesc: 'Fill in your profile information and click Calculate to get your personalized health plan.',
    yourProfile: 'Your Profile',
    module1Title: 'Weight Loss, Muscle Gain & Workout Planner',
    module1Desc: 'Get personalized calorie targets, macro breakdowns, meal plans, and workout routines based on your body metrics and goals.',
    module2Title: 'Diabetes & Hypertension Suite',
    module2Desc: 'Interactive calculators, meal planners, custom workouts, and lab result interpretation based on ADA and AHA guidelines.',
    module3Title: 'Advanced Health Conditions',
    module3Desc: 'Specialized nutrition and exercise plans for IBS, Gout, Kidney disease, Liver conditions, and more.',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    height: 'Height',
    weightLabel: 'Weight',
    activityLevel: 'Activity Level',
    goal: 'Primary Goal',
    sedentary: 'Sedentary (Little or no exercise)',
    light: 'Lightly Active (1-3 days/week)',
    moderate: 'Moderately Active (3-5 days/week)',
    active: 'Active (6-7 days/week)',
    veryActive: 'Very Active (Hard exercise daily)',
    loseWeight: 'Lose Weight',
    maintain: 'Maintain Weight',
    gainMuscle: 'Gain Muscle',
    calculate: 'Calculate',
    dailyCalories: 'Daily Calories',
    macros: 'Macronutrient Breakdown',
    protein: 'Protein',
    carbs: 'Carbohydrates',
    fat: 'Fat',
    mealPlan: '1-Day Meal Plan',
    workoutPlan: 'Workout Routine',
    kg: 'kg',
    cm: 'cm',
    years: 'years',
    fastingGlucose: 'Fasting Blood Glucose',
    postPrandialGlucose: 'Post-Prandial Glucose (2hr)',
    hba1c: 'HbA1c',
    systolicBP: 'Systolic Blood Pressure',
    diastolicBP: 'Diastolic Blood Pressure',
    analyzeLabs: 'Analyze Lab Results',
    labResults: 'Lab Results Interpretation',
    unlockPremium: 'Unlock Advanced Health Suite',
    premiumPrice: '$15/year',
    premiumDesc: 'Get specialized plans for IBS, Gout, Kidney & Liver conditions with personalized nutrition and exercise programs.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    medicalDisclaimer: 'Medical Disclaimer',
    contactUs: 'Contact Us',
    allRights: '© 2026 HealthCalc.ai. All rights reserved.',
    disclaimer: 'HealthCalc.ai provides information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your physician before starting any diet or workout program.',
    contactName: 'Full Name',
    contactEmail: 'Email Address',
    contactMessage: 'Your Message',
    contactSupportBadge: 'Support',
    contactRespondSubtitle: 'We typically respond within 48 business hours',
    contactGetInTouch: 'Get in Touch',
    contactInfoEmail: 'Email',
    contactInfoWebsite: 'Website',
    contactInfoResponseTime: 'Response Time',
    contactResponseTimeValue: 'Within 48 business hours',
    contactFormTitle: 'Send a Message',
    contactPlaceholderMessage: 'How can we help you?',
    contactSentTitle: 'Message Sent!',
    contactSentDesc: 'Thank you for contacting us. We will respond within 48 business hours.',
    sendMessage: 'Send Message',
    sponsored: 'Sponsored',
    sponsoredAd: 'Sponsored Ad',
    cmUnit: 'cm',
    kgUnit: 'kg',
    mmolUnit: 'mmol/L',
    mgUnit: 'mg/dL',
    resultCategory: 'Category',
    recommendation: 'Recommendation',
    locked: 'Locked',
    unlock: 'Unlock Now',
    bmiTitle: 'Body Mass Index Calculator',
    bmiSubtitle: 'Calculate your BMI instantly with a clean, evidence-based assessment. Know where you stand — and what to do next.',
    bmiYourDetails: 'Your Details',
    bmiYourBmi: 'Your BMI',
    bmiKgM2: 'kg/m²',
    bmiUnderweight: 'Underweight',
    bmiNormal: 'Normal Weight',
    bmiOverweight: 'Overweight',
    bmiObese: 'Obese',
    bmiRisk: 'Health Risk',
    bmiValue: 'BMI Value',
    bmiHealthyRange: 'Healthy Range',
    bmiIdealWeight: 'Ideal Weight Range',
    bmiCrossPromo: 'Personalized Health Plan Available',
    bmiCrossPromoDiabetes: 'Your BMI suggests diabetes risk — explore our Diabetes Management module.',
    bmiCrossPromoCholesterol: 'Your BMI suggests cardiovascular risk — explore our Cholesterol module.',
    bmiCrossPromoGeneral: 'Explore Advanced Care for a personalized 30-day health journey.',
    bmiRecommendations: 'Recommendations',
    bmiRecUnder1: 'Increase caloric intake with nutrient-dense whole foods (nuts, avocados, whole grains).',
    bmiRecUnder2: 'Incorporate strength training to build lean muscle mass gradually.',
    bmiRecUnder3: 'Consult a healthcare provider to rule out underlying medical conditions.',
    bmiRecNormal1: 'Maintain your current balanced diet rich in fruits, vegetables, and lean proteins.',
    bmiRecNormal2: 'Stay active with at least 150 minutes of moderate exercise per week.',
    bmiRecNormal3: 'Monitor your BMI annually to stay within the healthy range.',
    bmiRecOver1: 'Reduce refined carbohydrates and increase vegetable intake at each meal.',
    bmiRecOver2: 'Aim for 200–300 minutes of moderate-intensity exercise per week.',
    bmiRecOver3: 'Consider a structured meal plan to manage portions and calorie intake.',
    bmiRecObese1: 'Consult a physician or registered dietitian for a personalized weight management plan.',
    bmiRecObese2: 'Start with low-impact exercises (walking, swimming) and progressively increase.',
    bmiRecObese3: 'Monitor related health markers: blood pressure, blood glucose, and cholesterol.',
    bmiFormulaTitle: 'BMI Formula & Calculation',
    bmiFormulaExample: 'Example: 70 kg ÷ (1.70 m)² = 70 ÷ 2.89 = 24.2 (Normal)',
    bmiFormulaNote: 'BMI is a screening tool, not a diagnostic measure. It does not account for muscle mass, bone density, or body composition. Athletes may have a high BMI due to muscle mass.',
    bmiTableTitle: 'BMI Categories Reference',
    bmiRiskTitle: 'Health Risks by BMI Category',
    bmiEmptyTitle: 'Enter your details to calculate BMI',
    bmiEmptyDesc: 'Fill in the form on the left and click Calculate to see your personalized BMI assessment.',
    bmiCalculator: 'BMI Calculator',
    calcNav: 'Calculators',
    calcTitle: 'Health Calculators',
    calcSubtitle: 'Calculate your BMI, BMR, daily calories, and ideal weight — then seamlessly bridge your results into a personalized 30-day health journey.',
    calcSharedProfile: 'Your Shared Profile',
    calcSharedHint: 'Your inputs are shared across all calculators. Update once — results update everywhere.',
    calcSedentary: 'Sedentary',
    calcLight: 'Light',
    calcModerate: 'Moderate',
    calcActive: 'Active',
    calcVeryActive: 'Very Active',
    calcBmiTitle: 'BMI Calculator',
    calcBmiSubtitle: 'Body Mass Index — understand your weight category',
    calcBmiValue: 'BMI Value',
    calcBmiHealthy: 'Healthy Range (18.5–24.9)',
    calcBmiUnder: 'Underweight',
    calcBmiNormal: 'Normal Weight',
    calcBmiOver: 'Overweight',
    calcBmiObese: 'Obese',
    calcBmrTitle: 'BMR Calculator',
    calcBmrSubtitle: 'Basal Metabolic Rate — calories your body burns at rest',
    calcBmrLabel: 'BMR (Mifflin-St Jeor)',
    calcTdee: 'TDEE (Total Daily)',
    calcGoalLose: 'Lose Weight',
    calcGoalMaintain: 'Maintain',
    calcGoalGain: 'Gain Muscle',
    calcCalTitle: 'Calorie Calculator',
    calcCalSubtitle: 'Daily calorie & macronutrient targets based on your goals',
    calcDailyTarget: 'Your Daily Calorie Target',
    calcIdealTitle: 'Ideal Weight Calculator',
    calcIdealSubtitle: 'Healthy weight range for your height (BMI 18.5–24.9)',
    calcIdealMin: 'Lower Bound',
    calcIdealMid: 'Ideal Midpoint',
    calcIdealMax: 'Upper Bound',
    calcIdealBelow: 'Below Ideal Range',
    calcIdealBelowDesc: 'above your current weight to reach the ideal midpoint.',
    calcIdealAbove: 'Above Ideal Range',
    calcIdealAboveDesc: 'below the ideal midpoint for your height.',
    calcIdealPerfect: 'Within Ideal Range',
    calcIdealPerfectDesc: 'Your weight is within the healthy BMI range. Keep it up!',
    calcBridgeTitle: 'Use in Advanced Care →',
    calcBridgeDesc: 'Save your BMI to auto-calibrate your 30-day health journey.',
    calcBridgeCalTitle: 'Customize My 30-Day Plan →',
    calcBridgeCalDesc: 'Use your calorie targets to calibrate meals and exercises.',
    calcBridgeAdvanced: 'Start Your Health Journey →',
    calcBridgeAdvancedDesc: 'Bridge your results to a personalized 30-day plan.',
    calcBridgeWeight: 'Get My Personalized Plan →',
    calcBridgeWeightDesc: 'Use your ideal weight as a milestone in your health journey.',
    calcSaved: '✓ Saved to Profile',
    calcSavedDesc: 'Your data is ready for Advanced Care.',
    calcSummary: 'Your Results Summary',
    calcGoAdvanced: 'Go to Advanced Care →',
    calcHowTitle: 'How It Works',
    calcHow1: 'Fill in your shared profile above — age, gender, height, weight, and activity level.',
    calcHow2: 'Open any calculator accordion and click Calculate to see your results instantly.',
    calcHow3: 'Save your results and bridge them directly into your personalized 30-day health journey.',
    calcEmptyTitle: 'Run a calculator to see results',
    calcEmptyDesc: 'Your results and the Advanced Care bridge will appear here.',
    calcEduFormula: 'Formulas & Science',
    calcEduFormulaNote: 'BMR uses the Mifflin-St Jeor equation (widely regarded as the most accurate). TDEE multiplies BMR by your activity factor. BMI is a screening tool — it does not account for muscle mass or body composition.',
    calcEduBmiTable: 'BMI Categories Reference',
    fcNav: 'Fitness & Health Calculator',
    fcTitle: 'Fitness & Health Calculator',
    fcSubtitle: 'Calculate your BMI, BMR, daily calories, and ideal weight — then bridge your results into a personalized 30-day health journey.',
    fcProfile: 'Your Health Profile',
    fcProfileHint: 'Your inputs are shared across all calculators. Update once — results update everywhere.',
    fcSedentary: 'Sedentary',
    fcLight: 'Light',
    fcModerate: 'Moderate',
    fcActive: 'Active',
    fcVeryActive: 'Very Active',
    fcTabBmi: 'BMI',
    fcTabBmr: 'BMR',
    fcTabCal: 'Calories',
    fcTabIdeal: 'Ideal Weight',
    fcBmiYourBmi: 'Your BMI',
    fcBmiRisk: 'Health Risk',
    fcBmiValue: 'BMI Value',
    fcBmiHealthy: 'Healthy Range (18.5–24.9)',
    fcBmiIdeal: 'Ideal Weight Range',
    fcBmiUnder: 'Underweight',
    fcBmiNormal: 'Normal Weight',
    fcBmiOver: 'Overweight',
    fcBmiObese: 'Obese',
    fcBmrLabel: 'Basal Metabolic Rate',
    fcBmrDesc: 'Calories your body burns at complete rest — the foundation of your energy needs.',
    fcBmrTdee: 'Total Daily Energy Expenditure',
    fcBmrTdeeDesc: 'BMR × your activity factor — the calories you actually burn each day.',
    fcCalDaily: 'Your Daily Calorie Target',
    fcCalLose: 'Weight Loss',
    fcCalMaintain: 'Maintain',
    fcCalGain: 'Muscle Gain',
    fcCalMacros: 'Recommended Daily Macros',
    fcIdealMin: 'Lower Bound',
    fcIdealMid: 'Ideal Midpoint',
    fcIdealMax: 'Upper Bound',
    fcIdealBelow: 'Below Ideal Range',
    fcIdealBelowDesc: 'above your current weight to reach the ideal midpoint.',
    fcIdealAbove: 'Above Ideal Range',
    fcIdealAboveDesc: 'below the ideal midpoint for your height.',
    fcIdealPerfect: 'Within Ideal Range',
    fcIdealPerfectDesc: 'Your weight is within the healthy BMI range. Keep it up!',
    fcBridgeBmi: 'Use in Advanced Care →',
    fcBridgeBmiDesc: 'Save your BMI to auto-calibrate your 30-day health journey.',
    fcBridgeBmr: 'Customize My 30-Day Plan →',
    fcBridgeBmrDesc: 'Use your metabolic rate to calibrate your nutrition plan.',
    fcBridgeCal: 'Start Your Health Journey →',
    fcBridgeCalDesc: 'Bridge your calorie targets to a personalized 30-day plan.',
    fcBridgeIdeal: 'Get My Personalized Plan →',
    fcBridgeIdealDesc: 'Use your ideal weight as a milestone in your health journey.',
    fcSaved: '✓ Saved to Profile',
    fcSavedDesc: 'Your data is ready for Advanced Care.',
    fcViewFormula: 'View Clinical Details — Formulas & Science',
    fcViewBmiTable: 'View Clinical Details — BMI Categories',
    fcViewRisks: 'View Clinical Details — Health Risks',
    fcFormulaNote: 'BMR uses the Mifflin-St Jeor equation (most accurate). TDEE = BMR × activity factor. BMI is a screening tool — it does not account for muscle mass or body composition.',
    fcCtaLabel: 'Your data is ready',
    fcCtaHeadline: 'Unlock Your Custom 30-Day Weight & Fitness Journey Now',
    fcCtaSub: 'Your calculated BMI, BMR, and calorie targets have been saved. Let\'s build your personalized Weight & Fitness plan.',
    fcCtaButton: 'Go to My Weight & Fitness Plan →',
    fcCtaLaunch: 'Save & Go to My Weight & Fitness Plan',
    fcCtaLaunchSub: 'One click — your metrics transfer instantly, zero re-entry required',
    fcRedirecting: 'Redirecting to your Weight & Fitness plan in',
    // Smartwatch Sync
    swNav: 'Smartwatch',
    swTitle: 'Smartwatch Sync',
    swSubtitle: 'Connect your smartwatch to sync your health data automatically',
    swHeroDesc: 'Sync steps, heart rate, sleep, and more from your favorite health platform.',
    swDashboard: 'Dashboard',
    swGuide: 'Guide',
    swGuideLabel: 'Setup Guide',
    swSettings: 'Settings',
    swConnected: 'Connected',
    swNotConnected: 'Not Connected',
    swLastSync: 'Last sync',
    swNeverSynced: 'Never synced',
    swSyncing: 'Syncing...',
    swSyncNow: 'Sync Now',
    swDisconnect: 'Disconnect',
    swConnectWatch: 'Connect Watch',
    swHealthPlatform: 'Health Platform',
    swAppleHealth: 'Apple Health',
    swGoogleHealthConnect: 'Google Health Connect',
    swWebBrowser: 'Web Browser',
    swActive: 'Active',
    swInactive: 'Inactive',
    swHeartRate: 'Heart Rate',
    swSteps: 'Steps',
    swActiveCalories: 'Active Calories',
    swSleep: 'Sleep',
    swWeight: 'Weight',
    swSpO2: 'Blood Oxygen (SpO2)',
    swStress: 'Stress',
    swFloors: 'Floors',
    swBpm: 'bpm',
    swKcal: 'kcal',
    swHrs: 'hrs',
    swResting: 'Resting',
    swDeep: 'Deep',
    swMinCardio: 'min cardio',
    swStepsUnit: 'steps',
    swFloorsUnit: 'floors',
    swAiHealthTips: 'AI Health Tips',
    swDynamicPlan: 'Dynamic Plan',
    swCalorieAdj: 'Calorie Adjustment',
    swKcalPerDay: 'kcal/day',
    swActivityGoal: 'Activity Goal',
    swStepsPerDay: 'steps/day',
    swHydration: 'Hydration',
    swLitersPerDay: 'liters/day',
    swRestDay: 'Rest Day',
    swRecommended: 'Recommended',
    swActiveDay: 'Active Day',
    swSyncHistory: 'Sync History',
    swNoDataYet: 'No data yet',
    swNoDataDesc: 'Connect your watch and sync to see your health metrics here.',
    swSetupGuide: 'Setup Guide',
    swSetupGuideDesc: 'Follow these simple steps to connect your smartwatch.',
    swPrev: 'Previous',
    swNext: 'Next',
    swSupportedWatches: 'Supported Watches',
    swConnectionSettings: 'Connection Settings',
    swAutoSync: 'Auto Sync',
    swAutoSyncDesc: 'Automatically sync your health data when the app opens.',
    swSyncNotifications: 'Sync Notifications',
    swSyncNotifDesc: 'Get notified when a new sync completes.',
    swDataPermissions: 'Data Permissions',
    swGranted: 'Granted',
    swAdvanced: 'Advanced',
    swExportData: 'Export Data',
    swClearHistory: 'Clear History',
    swDisconnectRemove: 'Disconnecting will remove all synced data from this device.',
    swInstallTitle: 'Install the App',
    swInstallIos: 'Open Apple Health and allow HealthCalc.ai to read your health data.',
    swInstallAndroid: 'Open Google Health Connect and allow HealthCalc.ai to access your health data.',
    swInstallWeb: 'Use the web dashboard to sync via your browser.',
    swConnectIosTitle: 'Connect Apple Health',
    swConnectAndroidTitle: 'Connect Google Health Connect',
    swConnectWebTitle: 'Connect Web Browser',
    swPairWatch: 'Pair Your Watch',
    swPairIosTitle: 'Pair with Apple Watch',
    swPairAndroidTitle: 'Pair with Wear OS Watch',
    swPairWebTitle: 'Pair via Browser',
    swTrackProgress: 'Track Progress',
    swGuideStep1: 'Download HealthCalc.ai on your phone.',
    swGuideStep2: 'Open Settings and tap Connect Watch.',
    swGuideStep3: 'Grant permission to your health platform.',
    swGuideStep4: 'Start syncing your daily activity automatically.',
    swGuideStep5: 'View insights and AI tips on your dashboard.',
    syncGuideInstallTitleIos: 'Install on iPhone (Safari)',
    syncGuideInstallTitleAndroid: 'Install on Android (Chrome)',
    syncGuideInstallTitleWeb: 'Install PWA',
    syncGuideConnectTitleIos: 'Connect Apple Health',
    syncGuideConnectTitleAndroid: 'Connect Google Health Connect',
    syncGuideConnectTitleWeb: 'Connect Health App',
    syncGuidePairTitle: 'Pair Your Smartwatch',
    syncGuideTrackTitle: 'Sync & Track Your Progress',
    syncGuideInstallIos1: 'Open HealthCalc.ai in Safari.',
    syncGuideInstallIos2: 'Tap the Share button (square with arrow) at the bottom.',
    syncGuideInstallIos3: 'Scroll down and tap "Add to Home Screen".',
    syncGuideInstallIos4: 'Tap "Add" in the top right corner.',
    syncGuideInstallIos5: 'The HealthCalc.ai app icon now appears on your home screen!',
    syncGuideInstallAndroid1: 'Open HealthCalc.ai in Chrome.',
    syncGuideInstallAndroid2: 'Tap the three-dot menu (⋮) in the top right.',
    syncGuideInstallAndroid3: 'Tap "Add to Home screen" or "Install app".',
    syncGuideInstallAndroid4: 'Tap "Add" or "Install" to confirm.',
    syncGuideInstallAndroid5: 'The HealthCalc.ai app icon now appears on your home screen!',
    syncGuideInstallWeb1: 'Open HealthCalc.ai in your browser.',
    syncGuideInstallWeb2: 'Click the install icon in the address bar.',
    syncGuideInstallWeb3: 'Click "Install" when prompted.',
    syncGuideInstallWeb4: 'The app is now installed!',
    syncGuideConnectIos1: 'Open your iPhone Settings.',
    syncGuideConnectIos2: 'Tap "Privacy & Security" → "Health".',
    syncGuideConnectIos3: 'Find "HealthCalc.ai" and tap it.',
    syncGuideConnectIos4: 'Enable all health data categories you want to sync.',
    syncGuideConnectIos5: 'Return to HealthCalc.ai and tap "Sync Now".',
    syncGuideConnectAndroid1: 'Open Google Health Connect app (install from Play Store if needed).',
    syncGuideConnectAndroid2: 'Tap "Permissions" → "Apps".',
    syncGuideConnectAndroid3: 'Find "HealthCalc.ai" and grant read access.',
    syncGuideConnectAndroid4: 'Enable: Heart Rate, Steps, Sleep, Weight, Calories.',
    syncGuideConnectAndroid5: 'Return to HealthCalc.ai and tap "Sync Now".',
    syncGuideConnectWeb1: 'Open your phone\'s health app.',
    syncGuideConnectWeb2: 'Navigate to connected apps or sharing settings.',
    syncGuideConnectWeb3: 'Search for "HealthCalc.ai" and authorize it.',
    syncGuideConnectWeb4: 'Grant permissions for: Heart Rate, Steps, Sleep, Calories.',
    syncGuideConnectWeb5: 'Return to HealthCalc.ai and tap "Sync Now".',
    syncGuidePairIos1: 'Ensure your Apple Watch is paired via the Watch app.',
    syncGuidePairIos2: 'Open the Watch app on your iPhone.',
    syncGuidePairIos3: 'Verify "Health" is enabled under "Privacy".',
    syncGuidePairIos4: 'Your watch data automatically flows to Apple Health.',
    syncGuidePairIos5: 'HealthCalc.ai reads this data through Apple Health sync.',
    syncGuidePairAndroid1: 'Open your smartwatch companion app (Samsung Health, Fitbit, Garmin, etc.).',
    syncGuidePairAndroid2: 'Go to Settings → Connected Apps or Data Sharing.',
    syncGuidePairAndroid3: 'Enable "Google Health Connect" sync.',
    syncGuidePairAndroid4: 'Ensure Heart Rate, Steps, Sleep, and Calories are enabled.',
    syncGuidePairAndroid5: 'HealthCalc.ai reads this data through Google Health Connect.',
    syncGuidePairWeb1: 'Open your smartwatch companion app.',
    syncGuidePairWeb2: 'Check that the watch is connected to your phone.',
    syncGuidePairWeb3: 'Enable data sharing with your phone\'s health app.',
    syncGuidePairWeb4: 'HealthCalc.ai will sync the data automatically.',
    syncGuideTrack1: 'Return to the Smartwatch Sync dashboard.',
    syncGuideTrack2: 'Tap "Sync Now" to pull your latest health data.',
    syncGuideTrack3: 'View your daily metrics: heart rate, steps, sleep, and calories.',
    syncGuideTrack4: 'The AI engine uses this data to adjust your 30-day plan.',
    syncGuideTrack5: 'Your streak counter and plan progress update automatically.',
    swSyncCompleteToast: 'Health data synced successfully!',
    swExportedToast: 'Your health data was exported as CSV.',
    swNothingToExport: 'No synced data available to export yet.',
    swHistoryClearedToast: 'Sync history cleared.',
    swDisconnectedToast: 'Watch disconnected. All synced data removed from this device.',
    swStressLow: 'Low',
    swStressModerate: 'Moderate',
    swStressHigh: 'High',
    swKm: 'km',
    // Install Banner
    installTitle: 'Install HealthCalc.ai',
    installIosHint: 'Tap Share, then Add to Home Screen',
    installHint: 'Add HealthCalc.ai to your home screen for a faster experience',
    installBtn: 'Install App',
    installNotNow: 'Not Now',
    // Dashboard Widget
    widgetTitle: 'Smartwatch Data',
    widgetLastSync: 'Last sync',
    widgetNever: 'Never',
    widgetSyncing: 'Syncing...',
    widgetSync: 'Sync',
    widgetViewAll: 'View All',
    widgetHeart: 'Heart Rate',
    widgetCalories: 'Calories',
    widgetSleepLabel: 'Sleep',
    widgetNoData: 'No smartwatch data yet',
    widgetConnectWatch: 'Connect your watch to start tracking',
    // Dashboard Page
    dashWelcome: 'Welcome back',
    dashPremium: 'Premium',
    dashFreePlan: 'Free Plan',
    dashRenews: 'Renews',
    dashHealthHistory: 'Health History',
    dashProfileSettings: 'Profile Settings',
    dashTotalRecords: 'Total Records',
    dashModulesUsed: 'Modules Used',
    dashMemberSince: 'Member Since',
    dashNA: 'N/A',
    dashAll: 'All',
    dashLoading: 'Loading...',
    dashNoRecords: 'No records found',
    dashNoRecordsDesc: 'Your saved results will appear here once you start using our calculators.',
    dashTryCalc: 'Try a Calculator',
    dashDate: 'Date',
    dashModule: 'Module',
    dashKeyData: 'Key Data',
    dashNotes: 'Notes',
    dashActions: 'Actions',
    dashDelete: 'Delete',
    dashPrev: 'Previous',
    dashPageOf: 'of',
    dashNext: 'Next',
    dashProfileInfo: 'Profile Information',
    dashName: 'Full Name',
    dashEmail: 'Email',
    dashEmailCantChange: 'Email address cannot be changed',
    dashSubscription: 'Subscription',
    dashUpgrade: 'Upgrade to Premium',
    dashSaveChanges: 'Save Changes',
    dashChangePassword: 'Change Password',
    dashCurrentPassword: 'Current Password',
    dashNewPassword: 'New Password',
    dashMinChars: 'Minimum 8 characters',
    dashConfirmPassword: 'Confirm Password',
    dashUpdatePassword: 'Update Password',
    dashProfileUpdated: 'Profile updated successfully!',
    dashPasswordsNoMatch: 'Passwords do not match',
    dashPasswordMin: 'Password must be at least 8 characters',
    dashPasswordChanged: 'Password changed successfully!',
    dashDeleteConfirm: 'Are you sure you want to delete this record? This action cannot be undone.',
    // Auth Pages
    authWelcomeBack: 'Welcome Back',
    authSignInDesc: 'Sign in to access your personalized health plans',
    authEmailAddress: 'Email Address',
    authPassword: 'Password',
    authSigningIn: 'Signing in...',
    authNoAccount: 'Don\'t have an account?',
    authCreateOne: 'Create one',
    authCreateAccount: 'Create Account',
    authRegisterDesc: 'Join HealthCalc.ai and start your health journey today',
    authFullName: 'Full Name',
    authConfirmPassword: 'Confirm Password',
    authRepeatPassword: 'Repeat Password',
    authCreatingAccount: 'Creating account...',
    authAlreadyHave: 'Already have an account?',
    authSignIn: 'Sign In',
    authPasswordsMatch: 'Passwords match!',
    authPasswordMin6: 'At least 6 characters',
    authRegisterFailed: 'Registration failed. Please try again.',
    authLoginFailed: 'Invalid email or password.',
    // Header
    headerDashboard: 'Dashboard',
    headerSignOut: 'Sign Out',
    headerSignIn: 'Sign In',
    headerSignUp: 'Sign Up',
    headerNoResults: 'No results found',
    // Footer
    footerTagline: 'Your AI Health Companion',
    footerQuickLinks: 'Quick Links',
    footerLegal: 'Legal',
    footerHealthGuides: 'Health Guides',
    // Home Page
    homeAIPill: 'AI-Powered',
    homeHowItWorks: 'How It Works',
    homeHowItWorksDesc: 'Get your personalized health plan in three simple steps',
    homeStep: 'Step',
    homeEnterProfile: 'Enter Your Profile',
    homeEnterProfileDesc: 'Tell us your age, height, weight, activity level, and goals.',
    homeGetPlan: 'Get Your Plan',
    homeGetPlanDesc: 'Receive personalized calorie targets, meal plans, and workouts instantly.',
    homeTrackAdapt: 'Track & Adapt',
    homeTrackAdaptDesc: 'Sync your smartwatch and let AI adapt your plan as you progress.',
    homeSpecializedPlans: 'Specialized Plans',
    homeSpecializedPlansDesc: 'Tailored programs for weight loss, diabetes, hypertension, and more.',
    homeScienceBased: 'Science-Based',
    homeScienceBasedDesc: 'Built on ADA, DASH, USDA, and ACSM medical guidelines.',
    homeMultiLang: 'Multilingual',
    homeMultiLangDesc: 'Available in English, French, Spanish, and Arabic.',
    homePrivacyFirst: 'Privacy First',
    homePrivacyFirstDesc: 'Your health data is encrypted and never shared without consent.',
    homeMobileFriendly: 'Mobile Friendly',
    homeMobileFriendlyDesc: 'Works seamlessly on any device, anywhere.',
    homeInstantResults: 'Instant Results',
    homeInstantResultsDesc: 'See your calculated health metrics in real time.',
    homeLabInterpreter: 'Lab Interpreter',
    homeLabInterpreterDesc: 'Understand your blood test results with AI-powered analysis.',
    homeWhyTitle: 'Why Choose HealthCalc.ai?',
    homeWhySubtitle: 'Everything you need to take control of your health in one place',
    homeGuidelinesTitle: 'Based on International Guidelines',
    homeGuidelinesSubtitle: 'Our recommendations align with globally recognized medical standards',
    // Medical Disclaimer
    mdDismiss: 'Dismiss',
    // Breadcrumbs
    bcHome: 'Home',
    bcLanding: 'Health Guides',
    bcLandingWeightLossHypertension: 'Weight Loss with High Blood Pressure',
    bcLandingDiabetesMealPlan40f: 'Diabetes Meal Plan Over 40',
    bcLandingMuscleBuilding80kg: 'Muscle Building Plan (80kg)',
    bcLandingPcosWeightLoss: 'PCOS Weight Loss Plan',
    bcLandingKetoDiabetes: 'Keto Nutrition for Type 2 Diabetes',
    bcLandingSeniorFitness: 'Senior Fitness Plan',
    bcLandingPostPregnancyWeightLoss: 'Post-Pregnancy Weight Loss',
    bcLandingAthleticPerformance: 'Athletic Performance Nutrition',
    // Common
    commonComplete: 'Complete',
    commonDailyProgress: 'Daily Progress',
    commonDay: 'Day',
    commonDays: 'Days',
    commonBest: 'Best',
    commonToday: 'Today',
    commonDone: 'Done',
    commonPending: 'Pending',
    commonJourney: 'Journey',
    commonCompleted: 'Completed',
    commonSmartSwap: 'Smart Swap',
    commonStreak: 'Streak',
    commonPrint: 'Print',
    commonEmail: 'Email',
    commonCancel: 'Cancel',
    commonSave: 'Save',
    commonDelete: 'Delete',
    commonLoading: 'Loading...',
    commonExercises: 'Exercises',
    commonTotalSets: 'Total Sets',
    commonRestDay: 'Rest Day',
    commonExInfo: 'Exercise Info',
    mdTitle: 'Medical Disclaimer',
    homeWeightLossDesc: 'Calorie deficit & macro tracking',
    homeDiabetesDesc: 'Low-glycemic & glucose monitoring',
    homeHypertension: 'Hypertension',
    homeHypertensionDesc: 'DASH diet & sodium control',
    homeCholesterol: 'Cholesterol',
    homeCholesterolDesc: 'Heart-healthy omega-3 meals',
    homeLiver: 'Liver Health',
    homeLiverDesc: 'Detox-supporting nutrition',
    homeKidney: 'Kidney Disease',
    homeKidneyDesc: 'Low sodium & potassium plans',
    homeGout: 'Gout',
    homeGoutDesc: 'Low-purine anti-inflammatory',
    homeIBS: 'IBS',
    homeIBSDesc: 'Low-FODMAP meal plans',
    homeThyroid: 'Thyroid Health',
    homeThyroidDesc: 'TSH-based nutrition & follow-up',
    homeSmartwatchDesc: 'Real-time health data integration',
    premiumRequired: 'Premium Required',
    loading: 'Loading...',
    premiumUnlockDescription: 'Unlock the Advanced Health Suite with full access to all condition modules.',
    upgradeToPremium: 'Upgrade — $15/year',
    loginRequired: 'Login Required',
    loginToSubscribe: 'Please create an account or log in to subscribe to the Advanced Health Suite.',
    ok: 'OK',
    notFoundTitle: 'Page Not Found',
    notFoundDesc: "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
    backToHome: 'Back to Home',
    saveProgress: 'Save Progress',
    saved: 'Saved!',
    saving: 'Saving...',
    loginToSave: 'Login to Save',
    failedToSave: 'Failed to save',
    plan: 'Plan',
    dayLabel: 'Day',
    streak: 'Streak',
    days: 'days',
    best: 'Best',
    today: 'Today',
    done: 'Done',
    pending: 'Pending',
    journey: 'Journey',
    allComplete: 'All Complete!',
    dailyProgress: 'Daily Progress',
    completed: 'completed',
    proteinLabel: 'Protein',
    carbsLabel: 'Carbs',
    fatLabel: 'Fat',
    smartSwap: 'Smart Swap',
    mealPlanTitle: 'Your Personalized Health Blueprint',
    mealPlanSubtitle: 'HealthCalc.ai — Science-Based Nutrition Planning',
    dailyCaloricTarget: 'Daily Caloric Target',
    waterGoal: 'Water Goal',
    mealsDone: 'Meals Done',
    downloadPdf: 'Download PDF',
    emailPlan: 'Email Plan',
    progressTracker: 'Progress Tracker',
    ofMeals: 'of meals',
    water: 'water',
    eaten: 'Eaten',
    mealsCompleted: 'meals completed',
    close: 'Close',
    altOptions: 'Alternative Options',
    kcal: 'kcal',
    dashOfflineTitle: 'Offline Mode',
    dashOfflineDesc: 'Server is unavailable. Health history is stored locally on this device.',
    backendUnavailable: 'Server is currently unavailable. All calculators work locally without a connection.',
    chooseCuisine: 'Choose your cuisine',
    // Food library
    foodLibTitle: 'Calorie Library',
    foodLibSubtitle: '60+ dish categories from global kitchens with accurate USDA calories',
    foodLibSearchBadge: 'Search any food + filter by cuisine + sort by protein',
    foodLibSearchLabel: 'Search',
    foodLibSearchPlaceholder: 'e.g. tamales, koshari, sushi...',
    foodLibCuisineLabel: 'Cuisine',
    foodLibAllCuisines: 'All cuisines',
    foodLibSortLabel: 'Sort',
    foodLibSortCalories: 'Lowest calories',
    foodLibSortHighProtein: 'Highest protein',
    foodLibSortName: 'Alphabetical',
    foodLibCaloriesFilter: 'Calories:',
    foodLibCalLow: 'Low <150',
    foodLibCalMid: 'Medium 150-250',
    foodLibCalHigh: 'High >250',
    foodLibCalAll: 'All',
    foodLibResults: 'results',
    foodLibAll: 'All',
    foodLibColItem: 'Item',
    foodLibColCuisine: 'Cuisine',
    foodLibColPortion: 'Portion',
    foodLibColCalories: 'Calories',
    foodLibColProtein: 'Protein',
    foodLibColCarbs: 'Carbs',
    foodLibColFat: 'Fat',
    foodLibUsdaBadge: 'USDA',
    foodLibNoResults: 'No results for this search',
    foodLibClearFilters: 'Clear filters',
    foodLibSeoTitle: 'Why is the HealthCalc library accurate?',
    foodLibSeoBody: 'Every calorie comes from USDA FoodData Central, the world\'s largest food database. Each item is calculated per gram, not estimated. Use the library in any diet: weight loss, muscle gain, keto, or plant-based. Kitchens: Mediterranean, Gulf, Levant, North African, Asian, European and more.',
    coAnnualSub: 'Annual subscription · Cancel anytime',
    coAdvancedSuite: 'Advanced Health Suite',
    coAnnualBilling: 'Annual billing · Renews automatically',
    coFullName: 'Full Name',
    coEmailAddress: 'Email Address',
    coCardNumber: 'Card Number',
    coExpiryDate: 'Expiry Date',
    coCvv: 'CVV',
    coSecurityNote: 'Your payment info is encrypted and secure. This is a demo — no real charges will be made.',
    coPay: 'Pay',
    coProcessing: 'Processing Payment...',
    coVerifyWait: 'Please wait while we verify your payment.',
    coPaymentSuccess: 'Payment Successful!',
    coWelcomeSuite: 'Welcome to the Advanced Health Suite.',
    coRedirecting: 'Redirecting you now...',
    coPaymentFailed: 'Payment Failed',
    coTryAgain: 'Try Again',
    coPaymentFailedFallback: 'Payment failed. Please try again.',
    cuSelected: 'Selected Cuisine',
    cuNone: 'None',
    cuClear: 'Clear',
    adviceTitle: 'Personal Health Advice',
    adviceLive: 'Live update',
    adviceBmi: 'BMI',
    adviceIdealWeight: 'Ideal weight',
    adviceBmr: 'BMR',
    adviceGoalDeficit: 'Goal: 500 kcal daily deficit ≈ 0.5 kg/week loss.',
    adviceGoalSurplus: 'Goal: 300 kcal daily surplus plus resistance training to build muscle.',
    adviceGoalMaintain: 'Goal: maintain weight by balancing intake with expenditure.',
    adviceRecLoss: 'Recommended weight loss: {loss} kg to reach your ideal weight (~{weeks} weeks at 0.5 kg/week).',
    adviceProteinDay: 'Protein / day',
    adviceWaterDay: 'Water / day',
    adviceMacros: 'Macros (your target)',
    adviceWeightMult: 'weight × 1.6–2.2 g',
    adviceWaterMult: 'weight × 0.033 L',
    adviceCatUnderweight: 'Underweight',
    adviceCatNormal: 'Normal',
    adviceCatOverweight: 'Overweight',
    adviceCatObese: 'Obese',
    adviceCondDiabetes: 'Diabetes',
    adviceCondDiabetesTip: 'Choose low-glycemic carbs, spread meals evenly, and monitor HbA1c. Prefer fiber-rich vegetables.',
    adviceCondBp: 'Blood Pressure',
    adviceCondBpTip: 'Reduce sodium below 5g/day, avoid processed & pickled foods, and include potassium-rich vegetables.',
    adviceCondCholesterol: 'Cholesterol',
    adviceCondCholesterolTip: 'Keep saturated fat under 7% of calories, focus on LDL, and raise fiber with oats, legumes & fruit.',
    cuisine: 'Cuisine',
    changeFromMain: 'Change from main page',
    print: 'Print',
    todayPlan: 'Today\'s Plan',
    noLabData: 'No lab data yet',
    noLabDataDesc: 'Enter your blood test results on the main page, then click "Evaluate & Generate Plan".',
    wbTitle: 'Your Personalized Workout Blueprint',
    wbSubtitle: 'HealthCalc.ai — Science-Based Exercise Planning',
    wbDay: 'Day',
    wbType: 'Type:',
    wbAuto: 'Auto Recommend',
    wbBurnTarget: 'Calorie Burn Target',
    wbGoal: 'Workout Goal',
    wbExercisesDone: 'Exercises Done',
    wbEmailPlan: 'Email Plan',
    wbDailyProgress: 'Daily Progress',
    wbOfEx: 'of {n}',
    wbLevelBeginner: 'Beginner',
    wbLevelIntermediate: 'Intermediate',
    wbLevelAdvanced: 'Advanced',
    wbDone: 'Done',
    wbExercisesCompleted: 'exercises completed',
    mbBuild: 'Build Your Meals',
    mbPicked: '{n} picked',
    mbUse: 'Use',
    mbDetectedCuisine: 'We detected you are in {country} — {cuisine} plan',
    mbDetectedRegion: 'Detected region: {country} — {cuisine} cuisine',
    mbAutoFill: 'Auto-filled with {cuisine} favorites — adjust freely',
    mbGenerate30: 'Generate My 30-Day Plan',
    mbDishes: '{min}–{max} dishes',
    mbTarget: 'Target {kcal} kcal',
    mbSmartPortions: 'Smart adaptive portions',
    mbShowPlan: 'Show {meal} Plan – {kcal} kcal',
    mbHidePlan: 'Hide {meal} Plan – {kcal} kcal',
    mbDish: 'Dish',
    mbGrams: 'Grams',
    mbCalories: 'kcal',
    mbProtein: 'Protein',
    mbTotal: 'Total',
    mbCarbsFat: 'Carbs {carbs}g · Fat {fat}g',
    mbAdaptiveDesc: 'Portions auto-resize so the meal always lands on target — add or remove dishes and portions shrink or grow.',
    mbHeavy: 'Heavy',
    mbExtras: 'Extras',
    mbBread: 'Bread',
    mbSalads: 'Salads',
    mbSides: 'Sides',
    mbDrinks: 'Drinks',
    mbFruits: 'Fruits',
    wlHeroPill: '10 Kitchens · USDA Verified · Mifflin-St Jeor',
    wlGoalSelector: 'Goal Selector — recalculates all plans instantly',
    wlExerciseType: 'Exercise Type',
    wlAutoRecommend: 'Auto Recommend',
    wlFullWorkout: 'Full 30-Day Workout Plan',
    wlWorkoutHint: 'Select exercise type above, then click the button to open the plan',
    wlAgeYears: 'years',
    wlWorkoutDaysPerWeek: 'Workout Days Per Week',
    wlDays: '{n} days',
    wlSedentary: 'Sedentary',
    wlModerate: 'Moderate',
    wlVeryActive: 'Very Active',
    wlCaloriesSchedule: 'Calories Schedule — {cuisine}',
    wlUsdaAccurate: 'USDA Verified',
    wlCompleteAllMeals: 'Complete all meals',
    wlFullPlan: 'Full 30-Day Plan',
    wlSuggestions: 'Suggestions from {cuisine} kitchen',
    wlCaloriesItem: '{name} - {kcal} kcal',
    wlProteinUnit: 'g',
    dbLabInterpreter: 'Lab Results Interpreter',
    dbLabsEmpty: 'Enter your lab values on the left panel to get instant interpretation based on ADA medical guidelines.',
    dbBpClassification: 'Blood Pressure Classification (AHA)',
    dbSystolicRange: 'Systolic Range',
    dbDiastolicRange: 'Diastolic Range',
    dbRecommendations: 'Recommendations',
    dbBpClassifier: 'Blood Pressure Classifier',
    dbBpEmpty: 'Enter your blood pressure readings to get classified according to AHA guidelines with personalized recommendations.',
    db30DayMealPlan: '30-Day Diabetes Meal Plan',
    dbFoundation: 'Foundation',
    unitMetric: 'Metric',
    unitUs: 'US',
    ltpEngine: 'Smart Health Engine',
    ltpHeroTitle: 'Diabetes & Hypertension Suite',
    ltpHeroDesc: 'Enter your profile and lab values to instantly receive personalized meal plans, exercise routines, and progress tracking — all aligned with ADA and AHA clinical guidelines.',
    ltpProfileLab: 'Profile & Lab Values',
    ltpProfileLabSub: 'Enter your metrics for personalized ADA & AHA evaluation',
    ltpUserProfile: 'User Profile',
    ltpBloodGlucose: 'Blood Glucose',
    ltpFastingLabel: 'Fasting (mg/dL)',
    ltpFastingRange: 'Normal: 70–99 · Pre: 100–125 · Diabetes: ≥126',
    ltpPostLabel: 'Postprandial 2hr (mg/dL)',
    ltpPostRange: 'Normal: <140 · Pre: 140–199 · Diabetes: ≥200',
    ltpHba1cRange: 'Normal: <5.7% · Pre: 5.7–6.4% · Diabetes: ≥6.5%',
    ltpBloodPressure: 'Blood Pressure',
    ltpSystolic: 'Systolic',
    ltpDiastolic: 'Diastolic',
    ltpSystolicLabel: 'Systolic (mmHg)',
    ltpDiastolicLabel: 'Diastolic (mmHg)',
    ltpSysShort: 'Sys',
    ltpDiaShort: 'Dia',
    ltpNormal: 'Normal (AHA):',
    ltpElevated: 'Elevated:',
    ltpStage1: 'Stage 1 HTN:',
    ltpStage2: 'Stage 2 HTN:',
    ltpEvaluate: 'Evaluate & Generate Plan',
    ltpHide: 'Hide',
    ltpShow: 'Show',
    ltpProgress: 'Progress',
    ltpGlucose: 'Glucose',
    ltpRisk: 'Risk',
    ltpDailyTargets: 'Your Daily Targets',
    ltpTargetsSub: 'Calculated from age, weight, height, and activity level',
    ltpProtein: 'Protein:',
    ltpCarbs: 'Carbs:',
    ltpFat: 'Fat:',
    ltpDiabetesPlan: 'Diabetes Management Plan',
    ltpDiaSub: 'ADA guideline-based · Low-GI · Carb-counted · Age-adjusted',
    ltpFree: 'Free',
    ltpGlucoseProfile: 'Glucose Profile',
    ltpStatus: 'Status',
    ltpADATargets: 'ADA Targets',
    ltpPostMeal: 'Post-meal',
    ltpCarbPerMeal: 'Carb/Meal',
    ltpGITarget: 'GI Target',
    ltpCarbBudget: 'Carb Budget',
    ltpFiberGoal: 'Fiber Goal',
    ltpDiaPlan30: '30-Day Diabetes Meal & Workout Plan',
    ltpDiabetesMeals: 'Diabetes Meals',
    ltpADAAligned: 'ADA-Aligned',
    ltpOpenFullPlan: 'Open Full 30-Day Plan with PDF / Print',
    ltpDownloadPrint: 'Download or print your complete personalized plan',
    ltpCompleteExercises: 'Complete all exercises',
    ltpExerciseProtocol: 'Exercise Protocol',
    ltpAgeAdjusted: 'Age-Adjusted',
    ltpADAGuidelines: 'ADA Guidelines',
    ltpHTPlan: 'Hypertension Management Plan',
    ltpHTSub: 'AHA guideline-based · DASH diet · Low-sodium · Weight-aware',
    ltpBPProfile: 'BP Profile',
    ltpReading: 'Reading',
    ltpAHATargets: 'AHA Targets',
    ltpBPTarget: 'BP Target',
    ltpSodium: 'Sodium',
    ltpPotassium: 'Potassium',
    ltpExercise: 'Exercise',
    ltpBMITarget: 'BMI Target',
    ltpHTPlan30: '30-Day Hypertension Meal & Workout Plan',
    ltpDASHMeals: 'DASH Meals',
    ltpDASHAligned: 'DASH-Aligned',
    ltpWeightAware: 'Weight-Aware',
    ltpAHAGuidelines: 'AHA Guidelines',
    ltpDailyMealPlan: 'Daily Meal Plan',
    ltpMealSummary: '{kcal} kcal · Avg GI: {gi} · {target} kcal target',
    ltpShuffle: 'Shuffle',
    ltpDailyTracking: 'Daily Tracking',
    ltpMetric: 'Metric',
    ltpTarget: 'Target',
    ltpActual: 'Actual',
    ltpStatusSafe: 'Safe',
    ltpStatusOnTrack: 'On Track',
    ltpStatusAttention: 'Needs Attention',
    ltpStatusBelow: 'Below Target',
    ltpStatusOver: 'Over Limit',
    ltpProgressTracking: 'Progress Tracking',
    ltpEntries: '{n} entries',
    ltpClearAll: 'Clear All',
    ltpNoProgress: 'No readings yet. Click "{action}" to log your first entry.',
    ltpGlucoseTrend: 'Glucose Trend (Recent 7)',
    ltpPostShort: 'Post.',
    ltpPostprandial: 'Postprandial',
    ltpBPTrend: 'Blood Pressure Trend (Recent 7)',
    ltpFasting: 'Fasting',
    ltpWeightTrend: 'Weight Trend',
    ltpDate: 'Date',
    ltpWeight: 'Weight',
    ltpClinicalSummary: 'Clinical Summary',
    ltpPrintReport: 'Print / Download Report',
    ltpEmailReport: 'Email Report',
    ltpEmailOpened: 'Email client opened',
    ltpEmailReady: 'Your full health report with profile, plans, and progress is ready to send.',
    ltpEmptyPrompt: 'Enter your profile and lab values above, then click "{action}".',
    pmSuiteBadge: 'Advanced Health Suite',
    pmFreeModules: '{n} Free Modules',
    pmHeroSub: '30-day structured health journeys with AI-adaptive plans, daily tracking, and clinical export for 8 conditions.',
    pmSuiteActive: 'Advanced Care Suite Active',
    pmSuiteActiveSub: 'Full access to all modules including {n} free condition programs.',
    pmCrossAdvisory: 'Cross-Condition Advisory',
    pmConditionModules: 'Condition Modules',
    pmConditionSub: 'Select conditions to activate 30-day health journeys',
    pmActive: 'Active',
    pmPremium: 'Premium',
    pmClickDeactivate: 'Click to deactivate ↑',
    pmClickActivate: 'Click to activate →',
    pm30DayJourney: '30-Day Health Journey',
    pmCustomized: 'Customized',
    pmPatientProfile: 'Patient Profile',
    pmLabValues: 'Lab Values',
    pmGeneratePlan: 'Generate 30-Day Plan',
    pmPlansGenerated: 'Plans generated & customized',
    pmHealthScore: 'Health Score',
    pmCheckInStreak: 'Check-In Streak',
    pmStreakInfo: 'Current: {c} days · Longest: {l} days',
    pmAIAutoAdj: 'AI Auto-Adjustment: {type}',
    pmTabPlan30: '30-Day Plan',
    pmTabCheckin: 'Daily Check-In',
    pmTabAnalytics: 'Analytics & Streaks',
    pmTabGuidelines: 'Guidelines',
    pm30DayPlanLabel: '{name} — 30-Day Plan',
    pmDailyCheckIn: 'Daily Check-In',
    pmDayOf30: 'Day {n} of 30 · Log your daily markers',
    pmCancel: 'Cancel',
    pmLogToday: 'Log Today',
    pmSaveCheckIn: 'Save Check-In',
    pmDayLabel: 'Day {n}',
    pmSymptomLog: 'Symptom Trigger Log',
    pmSymptomLogSub: 'Record flare-ups and identify patterns',
    pmLogTrigger: 'Log Trigger',
    pmSymptom: 'Symptom',
    pmSelectOption: 'Select...',
    pmTriggerFood: 'Possible Trigger Food/Cause',
    pmSelectCustom: 'Select or type custom...',
    pmSeverity: 'Severity (1-10): {n}',
    pmNotes: 'Notes',
    pmNotesPlaceholder: 'Additional context...',
    pmSaveTrigger: 'Save Trigger',
    pmTriggerPrefix: 'Trigger:',
    pmWeeklyMilestones: 'Weekly Milestones',
    pmMilestoneTarget: 'Target: {t} {u}',
    pmMilestoneCurrent: '(current: {n})',
    pmMilestoneDescPlaceholder: 'Milestone description',
    pmUnit: 'Unit',
    pmAdd: 'Add',
    pmRecentTrends: 'Recent Trends',
    pmAvg: 'Avg: {n}',
    pmCheckIns: 'Check-Ins',
    pmDayStreak: 'Day Streak',
    pmMilestones: 'Milestones',
    pmTriggersLogged: 'Triggers Logged',
    pmGuidelinesTitle: 'Medical Guidelines & Recommendations',
    pmWhatsIncluded: 'What\'s Included?',
    pmIncludeSub: 'Complete condition-specific health management',
    pmIncPlans: '30-Day Plans',
    pmIncPlansDesc: 'Structured daily journeys with meals, exercises, and clinical goals',
    pmIncTracking: 'Daily Tracking',
    pmIncTrackingDesc: 'Check-in logs, symptom triggers, and medication compliance',
    pmIncAI: 'AI Adaptation',
    pmIncAIDesc: 'Smart auto-adjustments based on your tracking data',
    pmIncExport: 'Clinical Export',
    pmIncExportDesc: 'PDF/CSV reports for physician consultations',
    pmCSVExport: 'CSV Export',
    pmEmail: 'Email'






























  },
  fr: {
    appName: 'HealthCalc.ai',
    mealBreakfast: 'Petit-déjeuner',
    mealLunch: 'Déjeuner',
    mealDinner: 'Dîner',
    mealMorningSnack: 'Collation du matin',
    mealAfternoonSnack: 'Collation de l\'après-midi',
    mealSnack: 'Collation',
    tagline: 'Votre Compagnon Santé IA',
    searchPlaceholder: 'Rechercher des calculateurs de santé...',
    home: 'Accueil',
    weightLoss: 'Poids & Fitness',
    diabetes: 'Diabète & Hypertension',
    premium: 'Soins Avancés',
    heroTitle: 'Votre Plan Santé & Fitness Personnalisé',
    heroSubtitle: 'Calculateurs basés sur la science, plans alimentaires et routines d\'entraînement conformes aux directives médicales internationales (ADA, DASH, USDA, ACSM).',
    heroCTA: 'Commencer Gratuitement',
    healthTools: 'Outils de Sante',
    healthToolsDesc: 'Calculateurs et planificateurs professionnels bases sur des guidelines medicales internationales',
    getStarted: 'Commencer',
    enterDetails: 'Entrez Vos Coordonnees',
    enterDetailsDesc: 'Remplissez les informations de votre profil et cliquez sur Calculer pour obtenir votre plan sante personnalise.',
    yourProfile: 'Votre Profil',
    module1Title: 'Perte de Poids, Prise de Muscle & Planificateur d\'Entraînement',
    module1Desc: 'Obtenez des objectifs caloriques personnalisés, des répartitions de macronutriments, des repas et des routines d\'entraînement basés sur vos métriques.',
    module2Title: 'Suite Diabète & Hypertension',
    module2Desc: 'Calculateurs interactifs, planificateurs de repas, entraînements personnalisés et interprétation des résultats de laboratoire selon les directives ADA et AHA.',
    module3Title: 'Conditions de Santé Avancées',
    module3Desc: 'Plans de nutrition et d\'exercice spécialisés pour le syndrome du côlon irritable, la goutte, les maladies rénales, les conditions hépatiques et plus.',
    age: 'Âge',
    gender: 'Genre',
    male: 'Homme',
    female: 'Femme',
    height: 'Taille',
    weightLabel: 'Poids',
    activityLevel: 'Niveau d\'Activité',
    goal: 'Objectif Principal',
    sedentary: 'Sédentaire (Peu ou pas d\'exercice)',
    light: 'Légèrement Actif (1-3 jours/semaine)',
    moderate: 'Modérément Actif (3-5 jours/semaine)',
    active: 'Actif (6-7 jours/semaine)',
    veryActive: 'Très Actif (Exercice intense quotidiennement)',
    loseWeight: 'Perdre du Poids',
    maintain: 'Maintenir le Poids',
    gainMuscle: 'Prendre du Muscle',
    calculate: 'Calculer',
    dailyCalories: 'Calories Journalières',
    macros: 'Répartition des Macronutriments',
    protein: 'Protéines',
    carbs: 'Glucides',
    fat: 'Lipides',
    mealPlan: 'Plan Alimentaire (1 Jour)',
    workoutPlan: 'Routine d\'Entraînement',
    kg: 'kg',
    cm: 'cm',
    years: 'ans',
    fastingGlucose: 'Glucose Sanguin à Jeun',
    postPrandialGlucose: 'Glucose Post-Prandial (2h)',
    hba1c: 'HbA1c',
    systolicBP: 'Pression Artérielle Systolique',
    diastolicBP: 'Pression Artérielle Diastolique',
    analyzeLabs: 'Analyser les Résultats',
    labResults: 'Interprétation des Résultats',
    unlockPremium: 'Débloquer la Suite Santé Avancée',
    premiumPrice: '15$/an',
    premiumDesc: 'Obtenez des plans spécialisés pour le SCI, la goutte, les maladies rénales et hépatiques avec des programmes personnalisés.',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfService: 'Conditions d\'Utilisation',
    medicalDisclaimer: 'Avertissement Médical',
    contactUs: 'Contactez-nous',
    allRights: '© 2026 HealthCalc.ai. Tous droits réservés.',
    disclaimer: 'HealthCalc.ai fournit des informations à des fins éducatives uniquement. Ce n\'est pas un substitut à un avis médical professionnel, un diagnostic ou un traitement. Consultez toujours votre médecin avant de commencer un régime ou un programme d\'exercice.',
    contactName: 'Nom Complet',
    contactEmail: 'Adresse Email',
    contactMessage: 'Votre Message',
    contactSupportBadge: 'Assistance',
    contactRespondSubtitle: 'Nous répondons généralement sous 48 heures ouvrées',
    contactGetInTouch: 'Nous Contacter',
    contactInfoEmail: 'Email',
    contactInfoWebsite: 'Site Web',
    contactInfoResponseTime: 'Délai de Réponse',
    contactResponseTimeValue: 'Sous 48 heures ouvrées',
    contactFormTitle: 'Envoyer un Message',
    contactPlaceholderMessage: 'Comment pouvons-nous vous aider ?',
    contactSentTitle: 'Message Envoyé !',
    contactSentDesc: 'Merci de nous avoir contactés. Nous répondrons sous 48 heures ouvrées.',
    sendMessage: 'Envoyer le Message',
    sponsored: 'Sponsorisé',
    sponsoredAd: 'Publicité Sponsorisée',
    cmUnit: 'cm',
    kgUnit: 'kg',
    mmolUnit: 'mmol/L',
    mgUnit: 'mg/dL',
    resultCategory: 'Catégorie',
    recommendation: 'Recommandation',
    locked: 'Verrouillé',
    unlock: 'Débloquer',
    bmiTitle: 'Calculateur d\'Indice de Masse Corporelle',
    bmiSubtitle: 'Calculez votre IMC instantanément avec une évaluation propre et basée sur des preuves. Savoir où vous en êtes — et quoi faire ensuite.',
    bmiYourDetails: 'Vos Coordonnées',
    bmiYourBmi: 'Votre IMC',
    bmiKgM2: 'kg/m²',
    bmiUnderweight: 'Insuffisance pondérale',
    bmiNormal: 'Poids Normal',
    bmiOverweight: 'Surpoids',
    bmiObese: 'Obèse',
    bmiRisk: 'Risque Sanitaire',
    bmiValue: 'Valeur IMC',
    bmiHealthyRange: 'Fourchette Saine',
    bmiIdealWeight: 'Poids Idéal',
    bmiCrossPromo: 'Plan de Santé Personnalisé Disponible',
    bmiCrossPromoDiabetes: 'Votre IMC suggère un risque de diabète — découvrez notre module Gestion du Diabète.',
    bmiCrossPromoCholesterol: 'Votre IMC suggère un risque cardiovasculaire — découvrez notre module Cholestérol.',
    bmiCrossPromoGeneral: 'Explorez les Soins Avancés pour un parcours santé personnalisé de 30 jours.',
    bmiRecommendations: 'Recommandations',
    bmiRecUnder1: 'Augmentez l\'apport calorique avec des aliments entiers riches en nutriments (noix, avocats, céréales complètes).',
    bmiRecUnder2: 'Incorporez la musculation pour construire progressivement la masse musculaire.',
    bmiRecUnder3: 'Consultez un professionnel de santé pour écarter les conditions médicales sous-jacentes.',
    bmiRecNormal1: 'Maintenez votre régime alimentaire équilibré riche en fruits, légumes et protéines maigres.',
    bmiRecNormal2: 'Restez actif avec au moins 150 minutes d\'exercice modéré par semaine.',
    bmiRecNormal3: 'Surveillez votre IMC annuellement pour rester dans la fourchette saine.',
    bmiRecOver1: 'Réduisez les glucides raffinés et augmentez l\'apport en légumes à chaque repas.',
    bmiRecOver2: 'Visez 200 à 300 minutes d\'exercice d\'intensité modérée par semaine.',
    bmiRecOver3: 'Envisagez un plan alimentaire structuré pour gérer les portions et les calories.',
    bmiRecObese1: 'Consultez un médecin ou diététicien pour un plan de gestion du poids personnalisé.',
    bmiRecObese2: 'Commencez par des exercices à faible impact (marche, natation) et augmentez progressivement.',
    bmiRecObese3: 'Surveillez les marqueurs de santé liés : tension artérielle, glycémie et cholestérol.',
    bmiFormulaTitle: 'Formule et Calcul de l\'IMC',
    bmiFormulaExample: 'Exemple : 70 kg ÷ (1,70 m)² = 70 ÷ 2,89 = 24,2 (Normal)',
    bmiFormulaNote: 'L\'IMC est un outil de dépistage, pas une mesure diagnostique. Il ne tient pas compte de la masse musculaire, de la densité osseuse ou de la composition corporelle.',
    bmiTableTitle: 'Tableau des Catégories d\'IMC',
    bmiRiskTitle: 'Risques Sanitaires par Catégorie d\'IMC',
    bmiEmptyTitle: 'Entrez vos coordonnées pour calculer l\'IMC',
    bmiEmptyDesc: 'Remplissez le formulaire à gauche et cliquez sur Calculer pour obtenir votre évaluation personnalisée.',
    bmiCalculator: 'Calculateur IMC',
    calcNav: 'Calculateurs',
    calcTitle: 'Calculateurs de Santé',
    calcSubtitle: 'Calculez votre IMC, MB, calories journalières et poids idéal — puis reliez directement vos résultats à un parcours santé personnalisé de 30 jours.',
    calcSharedProfile: 'Votre Profil Partagé',
    calcSharedHint: 'Vos entrées sont partagées entre tous les calculateurs. Mettez à jour une fois — les résultats se mettent à jour partout.',
    calcSedentary: 'Sédentaire',
    calcLight: 'Léger',
    calcModerate: 'Modéré',
    calcActive: 'Actif',
    calcVeryActive: 'Très Actif',
    calcBmiTitle: 'Calculateur IMC',
    calcBmiSubtitle: 'Indice de Masse Corporelle — comprenez votre catégorie de poids',
    calcBmiValue: 'Valeur IMC',
    calcBmiHealthy: 'Fourchette Saine (18,5–24,9)',
    calcBmiUnder: 'Insuffisance pondérale',
    calcBmiNormal: 'Poids Normal',
    calcBmiOver: 'Surpoids',
    calcBmiObese: 'Obèse',
    calcBmrTitle: 'Calculateur MB',
    calcBmrSubtitle: 'Métabolisme de Base — calories brûlées au repos',
    calcBmrLabel: 'MB (Mifflin-St Jeor)',
    calcTdee: 'TDEE (Total Quotidien)',
    calcGoalLose: 'Perdre du Poids',
    calcGoalMaintain: 'Maintenir',
    calcGoalGain: 'Prendre du Muscle',
    calcCalTitle: 'Calculateur de Calories',
    calcCalSubtitle: 'Objectifs caloriques et macronutriments selon vos objectifs',
    calcDailyTarget: 'Votre Objectif Calorique Quotidien',
    calcIdealTitle: 'Calculateur Poids Idéal',
    calcIdealSubtitle: 'Fourchette de poids saine pour votre taille (IMC 18,5–24,9)',
    calcIdealMin: 'Limite Inférieure',
    calcIdealMid: 'Point Milieu Idéal',
    calcIdealMax: 'Limite Supérieure',
    calcIdealBelow: 'Inférieur à la Fourchette Idéale',
    calcIdealBelowDesc: 'au-dessus de votre poids actuel pour atteindre le milieu idéal.',
    calcIdealAbove: 'Supérieur à la Fourchette Idéale',
    calcIdealAboveDesc: 'en dessous du point milieu idéal pour votre taille.',
    calcIdealPerfect: 'Dans la Fourchette Idéale',
    calcIdealPerfectDesc: 'Votre poids est dans la fourchette IMC saine. Continuez !',
    calcBridgeTitle: 'Utiliser dans Soins Avancés →',
    calcBridgeDesc: 'Enregistrez votre IMC pour calibrer automatiquement votre parcours santé de 30 jours.',
    calcBridgeCalTitle: 'Personnaliser Mon Plan 30 Jours →',
    calcBridgeCalDesc: 'Utilisez vos objectifs caloriques pour calibrer les repas et exercices.',
    calcBridgeAdvanced: 'Commencer Votre Parcours Santé →',
    calcBridgeAdvancedDesc: 'Reliez vos résultats à un parcours santé personnalisé de 30 jours.',
    calcBridgeWeight: 'Obtenir Mon Plan Personnalisé →',
    calcBridgeWeightDesc: 'Utilisez votre poids idéal comme jalon dans votre parcours santé.',
    calcSaved: '✓ Enregistré dans le Profil',
    calcSavedDesc: 'Vos données sont prêtes pour Soins Avancés.',
    calcSummary: 'Résumé de Vos Résultats',
    calcGoAdvanced: 'Aller aux Soins Avancés →',
    calcHowTitle: 'Comment Ça Marche',
    calcHow1: 'Remplissez votre profil partagé ci-dessus — âge, genre, taille, poids et niveau d\'activité.',
    calcHow2: 'Ouvrez un calculateur et cliquez sur Calculer pour voir vos résultats instantanément.',
    calcHow3: 'Enregistrez vos résultats et reliez-les directement à votre parcours santé de 30 jours.',
    calcEmptyTitle: 'Lancez un calculateur pour voir les résultats',
    calcEmptyDesc: 'Vos résultats et le pont vers Soins Avancés apparaîtront ici.',
    calcEduFormula: 'Formules & Science',
    calcEduFormulaNote: 'Le MB utilise l\'équation de Mifflin-St Jeor (considérée comme la plus précise). Le TDEE multiplie le MB par votre facteur d\'activité. L\'IMC est un outil de dépistage — il ne tient pas compte de la masse musculaire.',
    calcEduBmiTable: 'Tableau des Catégories d\'IMC',
    fcNav: 'Calculateur Fitness & Santé',
    fcTitle: 'Calculateur Fitness & Santé',
    fcSubtitle: 'Calculez votre IMC, MB, calories journalières et poids idéal — puis reliez vos résultats à un parcours santé personnalisé de 30 jours.',
    fcProfile: 'Votre Profil Santé',
    fcProfileHint: 'Vos entrées sont partagées entre tous les calculateurs. Mettez à jour une fois — les résultats se mettent à jour partout.',
    fcSedentary: 'Sédentaire',
    fcLight: 'Léger',
    fcModerate: 'Modéré',
    fcActive: 'Actif',
    fcVeryActive: 'Très Actif',
    fcTabBmi: 'IMC',
    fcTabBmr: 'MB',
    fcTabCal: 'Calories',
    fcTabIdeal: 'Poids Idéal',
    fcBmiYourBmi: 'Votre IMC',
    fcBmiRisk: 'Risque Sanitaire',
    fcBmiValue: 'Valeur IMC',
    fcBmiHealthy: 'Fourchette Saine (18,5–24,9)',
    fcBmiIdeal: 'Poids Idéal',
    fcBmiUnder: 'Insuffisance pondérale',
    fcBmiNormal: 'Poids Normal',
    fcBmiOver: 'Surpoids',
    fcBmiObese: 'Obèse',
    fcBmrLabel: 'Métabolisme de Base',
    fcBmrDesc: 'Calories brûlées au repos complet — la base de vos besoins énergétiques.',
    fcBmrTdee: 'Dépense Énergétique Totale Quotidienne',
    fcBmrTdeeDesc: 'MB × votre facteur d\'activité — les calories que vous brûlez réellement chaque jour.',
    fcCalDaily: 'Votre Objectif Calorique Quotidien',
    fcCalLose: 'Perte de Poids',
    fcCalMaintain: 'Maintenir',
    fcCalGain: 'Prise de Muscle',
    fcCalMacros: 'Macronutriments Recommandés',
    fcIdealMin: 'Limite Inférieure',
    fcIdealMid: 'Point Milieu Idéal',
    fcIdealMax: 'Limite Supérieure',
    fcIdealBelow: 'Inférieur à la Fourchette Idéale',
    fcIdealBelowDesc: 'au-dessus de votre poids actuel pour atteindre le milieu idéal.',
    fcIdealAbove: 'Supérieur à la Fourchette Idéale',
    fcIdealAboveDesc: 'en dessous du point milieu idéal pour votre taille.',
    fcIdealPerfect: 'Dans la Fourchette Idéale',
    fcIdealPerfectDesc: 'Votre poids est dans la fourchette IMC saine. Continuez !',
    fcBridgeBmi: 'Utiliser dans Soins Avancés →',
    fcBridgeBmiDesc: 'Enregistrez votre IMC pour calibrer automatiquement votre parcours santé.',
    fcBridgeBmr: 'Personnaliser Mon Plan 30 Jours →',
    fcBridgeBmrDesc: 'Utilisez votre métabolisme pour calibrer votre plan nutritionnel.',
    fcBridgeCal: 'Commencer Votre Parcours Santé →',
    fcBridgeCalDesc: 'Reliez vos objectifs caloriques à un parcours personnalisé de 30 jours.',
    fcBridgeIdeal: 'Obtenir Mon Plan Personnalisé →',
    fcBridgeIdealDesc: 'Utilisez votre poids idéal comme jalon dans votre parcours santé.',
    fcSaved: '✓ Enregistré dans le Profil',
    fcSavedDesc: 'Vos données sont prêtes pour Soins Avancés.',
    fcViewFormula: 'Voir Détails Cliniques — Formules & Science',
    fcViewBmiTable: 'Voir Détails Cliniques — Catégories d\'IMC',
    fcViewRisks: 'Voir Détails Cliniques — Risques Sanitaires',
    fcFormulaNote: 'Le MB utilise l\'équation de Mifflin-St Jeor (la plus précise). TDEE = MB × facteur d\'activité. L\'IMC est un outil de dépistage — il ne tient pas compte de la masse musculaire.',
    fcCtaLabel: 'Vos données sont prêtes',
    fcCtaHeadline: 'Débloquez Votre Parcours Poids & Fitness Personnalisé de 30 Jours Maintenant',
    fcCtaSub: 'Votre IMC, MB et objectifs caloriques ont été enregistrés. Créons votre plan Poids & Fitness personnalisé.',
    fcCtaButton: 'Aller à Mon Plan Poids & Fitness →',
    fcCtaLaunch: 'Enregistrer & Aller à Mon Plan Poids & Fitness',
    fcCtaLaunchSub: 'Un seul clic — vos données transférées instantanément, zéro ressaisie',
    fcRedirecting: 'Redirection vers votre plan Poids & Fitness dans',
    // Smartwatch Sync
    swNav: 'Montre',
    swTitle: 'Synchronisation Montre',
    swSubtitle: 'Connectez votre montre connectée pour synchroniser automatiquement vos données de santé',
    swHeroDesc: 'Synchronisez pas, fréquence cardiaque, sommeil et plus depuis votre plateforme santé préférée.',
    swDashboard: 'Tableau de Bord',
    swGuide: 'Guide',
    swGuideLabel: 'Guide d\'Installation',
    swSettings: 'Paramètres',
    swConnected: 'Connectée',
    swNotConnected: 'Non Connectée',
    swLastSync: 'Dernière synchro',
    swNeverSynced: 'Jamais synchronisée',
    swSyncing: 'Synchronisation...',
    swSyncNow: 'Synchroniser Maintenant',
    swDisconnect: 'Déconnecter',
    swConnectWatch: 'Connecter la Montre',
    swHealthPlatform: 'Plateforme Santé',
    swAppleHealth: 'Apple Health',
    swGoogleHealthConnect: 'Google Health Connect',
    swWebBrowser: 'Navigateur Web',
    swActive: 'Actif',
    swInactive: 'Inactif',
    swHeartRate: 'Fréquence Cardiaque',
    swSteps: 'Pas',
    swActiveCalories: 'Calories Actives',
    swSleep: 'Sommeil',
    swWeight: 'Poids',
    swSpO2: 'Oxygène Sanguin (SpO2)',
    swStress: 'Stress',
    swFloors: 'Étages',
    swBpm: 'bpm',
    swKcal: 'kcal',
    swHrs: 'h',
    swResting: 'Repos',
    swDeep: 'Profond',
    swMinCardio: 'min de cardio',
    swStepsUnit: 'pas',
    swFloorsUnit: 'étages',
    swAiHealthTips: 'Conseils Santé IA',
    swDynamicPlan: 'Plan Dynamique',
    swCalorieAdj: 'Ajustement Calorique',
    swKcalPerDay: 'kcal/jour',
    swActivityGoal: 'Objectif d\'Activité',
    swStepsPerDay: 'pas/jour',
    swHydration: 'Hydratation',
    swLitersPerDay: 'litres/jour',
    swRestDay: 'Jour de Repos',
    swRecommended: 'Recommandé',
    swActiveDay: 'Jour Actif',
    swSyncHistory: 'Historique de Synchro',
    swNoDataYet: 'Pas encore de données',
    swNoDataDesc: 'Connectez votre montre et synchronisez pour voir vos métriques ici.',
    swSetupGuide: 'Guide d\'Installation',
    swSetupGuideDesc: 'Suivez ces étapes simples pour connecter votre montre connectée.',
    swPrev: 'Précédent',
    swNext: 'Suivant',
    swSupportedWatches: 'Montres Compatibles',
    swConnectionSettings: 'Paramètres de Connexion',
    swAutoSync: 'Synchro Auto',
    swAutoSyncDesc: 'Synchronisez automatiquement vos données de santé à l\'ouverture de l\'application.',
    swSyncNotifications: 'Notifications de Synchro',
    swSyncNotifDesc: 'Soyez notifié quand une nouvelle synchronisation se termine.',
    swDataPermissions: 'Autorisations des Données',
    swGranted: 'Accordées',
    swAdvanced: 'Avancé',
    swExportData: 'Exporter les Données',
    swClearHistory: 'Effacer l\'Historique',
    swDisconnectRemove: 'La déconnexion supprimera toutes les données synchronisées de cet appareil.',
    swInstallTitle: 'Installer l\'Application',
    swInstallIos: 'Ouvrez Apple Health et autorisez HealthCalc.ai à lire vos données de santé.',
    swInstallAndroid: 'Ouvrez Google Health Connect et autorisez HealthCalc.ai à accéder à vos données de santé.',
    swInstallWeb: 'Utilisez le tableau de bord web pour synchroniser via votre navigateur.',
    swConnectIosTitle: 'Connecter Apple Health',
    swConnectAndroidTitle: 'Connecter Google Health Connect',
    swConnectWebTitle: 'Connecter le Navigateur Web',
    swPairWatch: 'Associer Votre Montre',
    swPairIosTitle: 'Associer avec Apple Watch',
    swPairAndroidTitle: 'Associer avec une Montre Wear OS',
    swPairWebTitle: 'Associer via le Navigateur',
    swTrackProgress: 'Suivre les Progrès',
    swGuideStep1: 'Téléchargez HealthCalc.ai sur votre téléphone.',
    swGuideStep2: 'Ouvrez les Paramètres et touchez Connecter la Montre.',
    swGuideStep3: 'Accordez l\'autorisation à votre plateforme santé.',
    swGuideStep4: 'Commencez à synchroniser automatiquement votre activité quotidienne.',
    swGuideStep5: 'Consultez analyses et conseils IA sur votre tableau de bord.',
    syncGuideInstallTitleIos: 'Installer sur iPhone (Safari)',
    syncGuideInstallTitleAndroid: 'Installer sur Android (Chrome)',
    syncGuideInstallTitleWeb: 'Installer la PWA',
    syncGuideConnectTitleIos: 'Connecter Apple Health',
    syncGuideConnectTitleAndroid: 'Connecter Google Health Connect',
    syncGuideConnectTitleWeb: 'Connecter l\'Application Santé',
    syncGuidePairTitle: 'Associez Votre Montre Connectée',
    syncGuideTrackTitle: 'Synchronisez & Suivez Vos Progrès',
    syncGuideInstallIos1: 'Ouvrez HealthCalc.ai dans Safari.',
    syncGuideInstallIos2: 'Touchez le bouton Partager (carré avec flèche) en bas.',
    syncGuideInstallIos3: 'Faites défiler et touchez « Sur l\'écran d\'accueil ».',
    syncGuideInstallIos4: 'Touchez « Ajouter » en haut à droite.',
    syncGuideInstallIos5: 'L\'icône de l\'application HealthCalc.ai apparaît maintenant sur votre écran d\'accueil !',
    syncGuideInstallAndroid1: 'Ouvrez HealthCalc.ai dans Chrome.',
    syncGuideInstallAndroid2: 'Touchez le menu trois points (⋮) en haut à droite.',
    syncGuideInstallAndroid3: 'Touchez « Ajouter à l\'écran d\'accueil » ou « Installer l\'application ».',
    syncGuideInstallAndroid4: 'Touchez « Ajouter » ou « Installer » pour confirmer.',
    syncGuideInstallAndroid5: 'L\'icône de l\'application HealthCalc.ai apparaît maintenant sur votre écran d\'accueil !',
    syncGuideInstallWeb1: 'Ouvrez HealthCalc.ai dans votre navigateur.',
    syncGuideInstallWeb2: 'Cliquez sur l\'icône d\'installation dans la barre d\'adresse.',
    syncGuideInstallWeb3: 'Cliquez sur « Installer » lorsque vous y êtes invité.',
    syncGuideInstallWeb4: 'L\'application est maintenant installée !',
    syncGuideConnectIos1: 'Ouvrez les Réglages de votre iPhone.',
    syncGuideConnectIos2: 'Touchez « Confidentialité et sécurité » → « Santé ».',
    syncGuideConnectIos3: 'Trouvez « HealthCalc.ai » et touchez-le.',
    syncGuideConnectIos4: 'Activez toutes les catégories de données de santé à synchroniser.',
    syncGuideConnectIos5: 'Revenez à HealthCalc.ai et touchez « Synchroniser Maintenant ».',
    syncGuideConnectAndroid1: 'Ouvrez l\'application Google Health Connect (installez-la depuis le Play Store si nécessaire).',
    syncGuideConnectAndroid2: 'Touchez « Autorisations » → « Applications ».',
    syncGuideConnectAndroid3: 'Trouvez « HealthCalc.ai » et accordez l\'accès en lecture.',
    syncGuideConnectAndroid4: 'Activez : Fréquence Cardiaque, Pas, Sommeil, Poids, Calories.',
    syncGuideConnectAndroid5: 'Revenez à HealthCalc.ai et touchez « Synchroniser Maintenant ».',
    syncGuideConnectWeb1: 'Ouvrez l\'application santé de votre téléphone.',
    syncGuideConnectWeb2: 'Accédez aux applications connectées ou aux paramètres de partage.',
    syncGuideConnectWeb3: 'Recherchez « HealthCalc.ai » et autorisez-le.',
    syncGuideConnectWeb4: 'Accordez les permissions pour : Fréquence Cardiaque, Pas, Sommeil, Calories.',
    syncGuideConnectWeb5: 'Revenez à HealthCalc.ai et touchez « Synchroniser Maintenant ».',
    syncGuidePairIos1: 'Assurez-vous que votre Apple Watch est associée via l\'application Watch.',
    syncGuidePairIos2: 'Ouvrez l\'application Watch sur votre iPhone.',
    syncGuidePairIos3: 'Vérifiez que « Santé » est activé sous « Confidentialité ».',
    syncGuidePairIos4: 'Les données de votre montre transitent automatiquement vers Apple Health.',
    syncGuidePairIos5: 'HealthCalc.ai lit ces données via la synchronisation Apple Health.',
    syncGuidePairAndroid1: 'Ouvrez l\'application compagnon de votre montre (Samsung Health, Fitbit, Garmin, etc.).',
    syncGuidePairAndroid2: 'Allez dans Paramètres → Applications connectées ou Partage de données.',
    syncGuidePairAndroid3: 'Activez la synchronisation « Google Health Connect ».',
    syncGuidePairAndroid4: 'Assurez-vous que Fréquence Cardiaque, Pas, Sommeil et Calories sont activés.',
    syncGuidePairAndroid5: 'HealthCalc.ai lit ces données via Google Health Connect.',
    syncGuidePairWeb1: 'Ouvrez l\'application compagnon de votre montre.',
    syncGuidePairWeb2: 'Vérifiez que la montre est connectée à votre téléphone.',
    syncGuidePairWeb3: 'Activez le partage de données avec l\'application santé de votre téléphone.',
    syncGuidePairWeb4: 'HealthCalc.ai synchronisera les données automatiquement.',
    syncGuideTrack1: 'Revenez au tableau de bord de synchronisation.',
    syncGuideTrack2: 'Touchez « Synchroniser Maintenant » pour récupérer vos dernières données.',
    syncGuideTrack3: 'Consultez vos métriques quotidiennes : fréquence cardiaque, pas, sommeil et calories.',
    syncGuideTrack4: 'Le moteur IA utilise ces données pour ajuster votre plan de 30 jours.',
    syncGuideTrack5: 'Votre compteur de série et la progression du plan se mettent à jour automatiquement.',
    swSyncCompleteToast: 'Données de santé synchronisées avec succès !',
    swExportedToast: 'Vos données de santé ont été exportées en CSV.',
    swNothingToExport: 'Aucune donnée synchronisée disponible à exporter pour le moment.',
    swHistoryClearedToast: 'Historique de synchronisation effacé.',
    swDisconnectedToast: 'Montre déconnectée. Toutes les données synchronisées ont été supprimées de cet appareil.',
    swStressLow: 'Faible',
    swStressModerate: 'Modéré',
    swStressHigh: 'Élevé',
    swKm: 'km',
    // Install Banner
    installTitle: 'Installer HealthCalc.ai',
    installIosHint: 'Touchez Partager, puis Ajouter à l\'écran d\'accueil',
    installHint: 'Ajoutez HealthCalc.ai à votre écran d\'accueil pour une expérience plus rapide',
    installBtn: 'Installer l\'App',
    installNotNow: 'Plus Tard',
    // Dashboard Widget
    widgetTitle: 'Données Montre',
    widgetLastSync: 'Dernière synchro',
    widgetNever: 'Jamais',
    widgetSyncing: 'Synchronisation...',
    widgetSync: 'Synchroniser',
    widgetViewAll: 'Voir Tout',
    widgetHeart: 'Fréquence Cardiaque',
    widgetCalories: 'Calories',
    widgetSleepLabel: 'Sommeil',
    widgetNoData: 'Pas encore de données montre',
    widgetConnectWatch: 'Connectez votre montre pour commencer le suivi',
    // Dashboard Page
    dashWelcome: 'Bon retour',
    dashPremium: 'Premium',
    dashFreePlan: 'Plan Gratuit',
    dashRenews: 'Renouvellement',
    dashHealthHistory: 'Historique Santé',
    dashProfileSettings: 'Paramètres du Profil',
    dashTotalRecords: 'Enregistrements Totaux',
    dashModulesUsed: 'Modules Utilisés',
    dashMemberSince: 'Membre Depuis',
    dashNA: 'S/O',
    dashAll: 'Tous',
    dashLoading: 'Chargement...',
    dashNoRecords: 'Aucun enregistrement trouvé',
    dashNoRecordsDesc: 'Vos résultats enregistrés apparaîtront ici dès que vous utiliserez nos calculateurs.',
    dashTryCalc: 'Essayer un Calculateur',
    dashDate: 'Date',
    dashModule: 'Module',
    dashKeyData: 'Données Clés',
    dashNotes: 'Notes',
    dashActions: 'Actions',
    dashDelete: 'Supprimer',
    dashPrev: 'Précédent',
    dashPageOf: 'sur',
    dashNext: 'Suivant',
    dashProfileInfo: 'Informations du Profil',
    dashName: 'Nom Complet',
    dashEmail: 'Email',
    dashEmailCantChange: 'L\'adresse email ne peut pas être modifiée',
    dashSubscription: 'Abonnement',
    dashUpgrade: 'Passer à Premium',
    dashSaveChanges: 'Enregistrer les Modifications',
    dashChangePassword: 'Changer le Mot de Passe',
    dashCurrentPassword: 'Mot de Passe Actuel',
    dashNewPassword: 'Nouveau Mot de Passe',
    dashMinChars: 'Minimum 8 caractères',
    dashConfirmPassword: 'Confirmer le Mot de Passe',
    dashUpdatePassword: 'Mettre à Jour le Mot de Passe',
    dashProfileUpdated: 'Profil mis à jour avec succès !',
    dashPasswordsNoMatch: 'Les mots de passe ne correspondent pas',
    dashPasswordMin: 'Le mot de passe doit contenir au moins 8 caractères',
    dashPasswordChanged: 'Mot de passe modifié avec succès !',
    dashDeleteConfirm: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ? Cette action est irréversible.',
    // Auth Pages
    authWelcomeBack: 'Bon Retour',
    authSignInDesc: 'Connectez-vous pour accéder à vos plans de santé personnalisés',
    authEmailAddress: 'Adresse Email',
    authPassword: 'Mot de Passe',
    authSigningIn: 'Connexion...',
    authNoAccount: 'Pas encore de compte ?',
    authCreateOne: 'Créez-en un',
    authCreateAccount: 'Créer un Compte',
    authRegisterDesc: 'Rejoignez HealthCalc.ai et commencez votre parcours santé aujourd\'hui',
    authFullName: 'Nom Complet',
    authConfirmPassword: 'Confirmer le Mot de Passe',
    authRepeatPassword: 'Répéter le Mot de Passe',
    authCreatingAccount: 'Création du compte...',
    authAlreadyHave: 'Vous avez déjà un compte ?',
    authSignIn: 'Se Connecter',
    authPasswordsMatch: 'Les mots de passe correspondent !',
    authPasswordMin6: 'Au moins 6 caractères',
    authRegisterFailed: 'Échec de l\'inscription. Veuillez réessayer.',
    authLoginFailed: 'Email ou mot de passe invalide.',
    // Header
    headerDashboard: 'Tableau de Bord',
    headerSignOut: 'Déconnexion',
    headerSignIn: 'Connexion',
    headerSignUp: 'Inscription',
    headerNoResults: 'Aucun résultat trouvé',
    // Footer
    footerTagline: 'Votre Compagnon Santé IA',
    footerQuickLinks: 'Liens Rapides',
    footerLegal: 'Mentions Légales',
    footerHealthGuides: 'Guides Santé',
    // Home Page
    homeAIPill: 'Propulsé par IA',
    homeHowItWorks: 'Comment Ça Marche',
    homeHowItWorksDesc: 'Obtenez votre plan de santé personnalisé en trois étapes simples',
    homeStep: 'Étape',
    homeEnterProfile: 'Entrez Votre Profil',
    homeEnterProfileDesc: 'Indiquez votre âge, taille, poids, niveau d\'activité et objectifs.',
    homeGetPlan: 'Obtenez Votre Plan',
    homeGetPlanDesc: 'Recevez instantanément objectifs caloriques, plans alimentaires et entraînements personnalisés.',
    homeTrackAdapt: 'Suivez & Adaptez',
    homeTrackAdaptDesc: 'Synchronisez votre montre et laissez l\'IA adapter votre plan selon vos progrès.',
    homeSpecializedPlans: 'Plans Spécialisés',
    homeSpecializedPlansDesc: 'Programmes adaptés pour perte de poids, diabète, hypertension et plus.',
    homeScienceBased: 'Basé sur la Science',
    homeScienceBasedDesc: 'Construit sur les directives médicales ADA, DASH, USDA et ACSM.',
    homeMultiLang: 'Multilingue',
    homeMultiLangDesc: 'Disponible en anglais, français, espagnol et arabe.',
    homePrivacyFirst: 'Confidentialité d\'Abord',
    homePrivacyFirstDesc: 'Vos données de santé sont chiffrées et jamais partagées sans consentement.',
    homeMobileFriendly: 'Optimisé Mobile',
    homeMobileFriendlyDesc: 'Fonctionne parfaitement sur tout appareil, partout.',
    homeInstantResults: 'Résultats Instantanés',
    homeInstantResultsDesc: 'Visualisez vos métriques de santé calculées en temps réel.',
    homeLabInterpreter: 'Interprète d\'Analyses',
    homeLabInterpreterDesc: 'Comprenez vos résultats sanguins avec une analyse propulsée par l\'IA.',
    homeWhyTitle: 'Pourquoi Choisir HealthCalc.ai ?',
    homeWhySubtitle: 'Tout ce dont vous avez besoin pour prendre soin de votre santé au même endroit',
    homeGuidelinesTitle: 'Basé sur les Directives Internationales',
    homeGuidelinesSubtitle: 'Nos recommandations respectent les normes médicales mondialement reconnues',
    // Medical Disclaimer
    mdDismiss: 'Fermer',
    // Breadcrumbs
    bcHome: 'Accueil',
    bcLanding: 'Guides Santé',
    bcLandingWeightLossHypertension: 'Perte de Poids avec Hypertension',
    bcLandingDiabetesMealPlan40f: 'Plan Repas Diabète après 40 Ans',
    bcLandingMuscleBuilding80kg: 'Plan Musculation (80 kg)',
    bcLandingPcosWeightLoss: 'Perte de Poids avec SOPK',
    bcLandingKetoDiabetes: 'Nutrition Keto pour Diabète de Type 2',
    bcLandingSeniorFitness: 'Plan Fitness Seniors',
    bcLandingPostPregnancyWeightLoss: 'Perte de Poids après Grossesse',
    bcLandingAthleticPerformance: 'Nutrition Performance Athlétique',
    // Common
    commonComplete: 'Terminer',
    commonDailyProgress: 'Progression Quotidienne',
    commonDay: 'Jour',
    commonDays: 'Jours',
    commonBest: 'Meilleur',
    commonToday: 'Aujourd\'hui',
    commonDone: 'Terminé',
    commonPending: 'En Attente',
    commonJourney: 'Parcours',
    commonCompleted: 'Complété',
    commonSmartSwap: 'Échange Malin',
    commonStreak: 'Série',
    commonPrint: 'Imprimer',
    commonEmail: 'Email',
    commonCancel: 'Annuler',
    commonSave: 'Enregistrer',
    commonDelete: 'Supprimer',
    commonLoading: 'Chargement...',
    commonExercises: 'Exercices',
    commonTotalSets: 'Séries Totales',
    commonRestDay: 'Jour de Repos',
    commonExInfo: 'Infos Exercice',
    mdTitle: 'Avertissement Médical',
    homeWeightLossDesc: 'Déficit calorique et suivi des macronutriments',
    homeDiabetesDesc: 'Index glycémique bas et surveillance de la glycémie',
    homeHypertension: 'Hypertension',
    homeHypertensionDesc: 'Régime DASH et contrôle du sodium',
    homeCholesterol: 'Cholestérol',
    homeCholesterolDesc: 'Repas sains riches en oméga-3',
    homeLiver: 'Santé du Foie',
    homeLiverDesc: 'Nutrition de soutien à la détox',
    homeKidney: 'Maladie Rénale',
    homeKidneyDesc: 'Plans pauvres en sodium et potassium',
    homeGout: 'Goutte',
    homeGoutDesc: 'Anti-inflammatoire pauvre en purines',
    homeIBS: 'SCI (Syndrome de l\'Intestin Irritable)',
    homeIBSDesc: 'Plans de repas pauvres en FODMAP',
    homeThyroid: 'Santé de la thyroïde',
    homeThyroidDesc: 'Nutrition basée sur la TSH et suivi',
    homeSmartwatchDesc: 'Intégration de données de santé en temps réel',
    premiumRequired: 'Premium Requis',
    loading: 'Chargement...',
    premiumUnlockDescription: 'Débloquez la Suite Santé Avancée avec un accès complet à tous les modules.',
    upgradeToPremium: 'Passer à Premium — 15$/an',
    loginRequired: 'Connexion Requise',
    loginToSubscribe: 'Veuillez créer un compte ou vous connecter pour vous abonner.',
    ok: 'OK',
    notFoundTitle: 'Page Non Trouvée',
    notFoundDesc: "La page que vous cherchez n'existe pas ou a été déplacée. Revenons sur la bonne voie.",
    backToHome: "Retour à l'Accueil",
    saveProgress: 'Sauvegarder la Progression',
    saved: 'Sauvegardé !',
    saving: 'Sauvegarde...',
    loginToSave: 'Connectez-vous pour Sauvegarder',
    failedToSave: 'Échec de la sauvegarde',
    plan: 'Plan',
    dayLabel: 'Jour',
    streak: 'Série',
    days: 'jours',
    best: 'Meilleur',
    today: "Aujourd'hui",
    done: 'Fait',
    pending: 'En attente',
    journey: 'Parcours',
    allComplete: 'Tout Terminé !',
    dailyProgress: 'Progrès Quotidien',
    completed: 'terminé',
    proteinLabel: 'Protéines',
    carbsLabel: 'Glucides',
    fatLabel: 'Lipides',
    smartSwap: 'Substitution Intelligente',
    mealPlanTitle: 'Votre Plan Santé Personnalisé',
    mealPlanSubtitle: 'HealthCalc.ai — Nutrition Basée sur la Science',
    dailyCaloricTarget: 'Objectif Calorique Quotidien',
    waterGoal: 'Objectif Hydratation',
    mealsDone: 'Repas Terminés',
    downloadPdf: 'Télécharger PDF',
    emailPlan: 'Envoyer le Plan',
    progressTracker: 'Suivi de Progression',
    ofMeals: 'repas',
    water: 'eau',
    eaten: 'Mangé',
    mealsCompleted: 'repas terminés',
    close: 'Fermer',
    altOptions: 'Options Alternatives',
    kcal: 'kcal',
    dashOfflineTitle: 'Mode Hors Ligne',
    dashOfflineDesc: 'Le serveur est indisponible. L\'historique de santé est stocké localement.',
    backendUnavailable: 'Le serveur est actuellement indisponible. Tous les calculateurs fonctionnent localement.',
    chooseCuisine: 'Choisissez votre cuisine',
    // Food library
    foodLibTitle: 'Bibliothèque de Calories',
    foodLibSubtitle: 'Plus de 60 catégories de plats de cuisines du monde avec des calories USDA précises',
    foodLibSearchBadge: 'Recherchez un aliment + filtrez par cuisine + triez par protéines',
    foodLibSearchLabel: 'Rechercher',
    foodLibSearchPlaceholder: 'ex. tamales, couscous, sushi...',
    foodLibCuisineLabel: 'Cuisine',
    foodLibAllCuisines: 'Toutes les cuisines',
    foodLibSortLabel: 'Trier',
    foodLibSortCalories: 'Moins de calories',
    foodLibSortHighProtein: 'Plus de protéines',
    foodLibSortName: 'Alphabétique',
    foodLibCaloriesFilter: 'Calories:',
    foodLibCalLow: 'Faible <150',
    foodLibCalMid: 'Moyen 150-250',
    foodLibCalHigh: 'Élevé >250',
    foodLibCalAll: 'Tous',
    foodLibResults: 'résultats',
    foodLibAll: 'Tous',
    foodLibColItem: 'Plat',
    foodLibColCuisine: 'Cuisine',
    foodLibColPortion: 'Portion',
    foodLibColCalories: 'Calories',
    foodLibColProtein: 'Protéines',
    foodLibColCarbs: 'Glucides',
    foodLibColFat: 'Lipides',
    foodLibUsdaBadge: 'USDA',
    foodLibNoResults: 'Aucun résultat pour cette recherche',
    foodLibClearFilters: 'Effacer les filtres',
    foodLibSeoTitle: 'Pourquoi la bibliothèque HealthCalc est-elle précise ?',
    foodLibSeoBody: 'Chaque calorie provient de USDA FoodData Central, la plus grande base de données alimentaires au monde. Chaque plat est calculé au gramme près, sans approximation. Utilisez la bibliothèque dans tout régime : perte de poids, prise de masse, cétogène ou végétal. Cuisines : méditerranéenne, du Golfe, du Levant, d\'Afrique du Nord, asiatique, européenne et plus.',
    coAnnualSub: 'Abonnement annuel · Annulable à tout moment',
    coAdvancedSuite: 'Pack Santé Avancé',
    coAnnualBilling: 'Facturation annuelle · Renouvellement automatique',
    coFullName: 'Nom Complet',
    coEmailAddress: 'Adresse Email',
    coCardNumber: 'Numéro de Carte',
    coExpiryDate: 'Date d\'Expiration',
    coCvv: 'CVV',
    coSecurityNote: 'Vos informations de paiement sont chiffrées et sécurisées. Ceci est une démo — aucun paiement réel ne sera effectué.',
    coPay: 'Payer',
    coProcessing: 'Traitement du Paiement...',
    coVerifyWait: 'Veuillez patienter pendant la vérification de votre paiement.',
    coPaymentSuccess: 'Paiement Réussi !',
    coWelcomeSuite: 'Bienvenue dans le Pack Santé Avancé.',
    coRedirecting: 'Redirection en cours...',
    coPaymentFailed: 'Paiement Échoué',
    coTryAgain: 'Réessayer',
    coPaymentFailedFallback: 'Échec du paiement. Veuillez réessayer.',
    cuSelected: 'Cuisine sélectionnée',
    cuNone: 'Aucune',
    cuClear: 'Effacer',
    adviceTitle: 'Conseils de santé personnels',
    adviceLive: 'Mise à jour en direct',
    adviceBmi: 'IMC',
    adviceIdealWeight: 'Poids idéal',
    adviceBmr: 'MB',
    adviceGoalDeficit: 'Objectif : déficit de 500 kcal/jour ≈ 0,5 kg/semaine.',
    adviceGoalSurplus: 'Objectif : surplus de 300 kcal/jour plus entraînement de résistance pour la masse musculaire.',
    adviceGoalMaintain: 'Objectif : maintenir le poids en équilibrant apports et dépenses.',
    adviceRecLoss: 'Perte de poids recommandée : {loss} kg pour atteindre votre poids idéal (~{weeks} semaines à 0,5 kg/semaine).',
    adviceProteinDay: 'Protéines / jour',
    adviceWaterDay: 'Eau / jour',
    adviceMacros: 'Macros (votre objectif)',
    adviceWeightMult: 'poids × 1,6–2,2 g',
    adviceWaterMult: 'poids × 0,033 L',
    adviceCatUnderweight: 'Insuffisance pondérale',
    adviceCatNormal: 'Normal',
    adviceCatOverweight: 'Surpoids',
    adviceCatObese: 'Obésité',
    adviceCondDiabetes: 'Diabète',
    adviceCondDiabetesTip: 'Choisissez des glucides à faible index glycémique, répartissez les repas et surveillez l\'HbA1c. Privilégiez les légumes riches en fibres.',
    adviceCondBp: 'Tension artérielle',
    adviceCondBpTip: 'Réduisez le sodium sous 5 g/jour, évitez les aliments transformés et marinés, et incluez des légumes riches en potassium.',
    adviceCondCholesterol: 'Cholestérol',
    adviceCondCholesterolTip: 'Maintenez les graisses saturées sous 7 % des calories, surveillez le LDL et augmentez les fibres avec avoine, légumineuses et fruits.',
    cuisine: 'Cuisine',
    changeFromMain: 'Modifiable depuis la page principale',
    print: 'Imprimer',
    todayPlan: 'Plan du jour',
    noLabData: 'Aucune donnée de laboratoire pour le moment',
    noLabDataDesc: 'Saisissez vos résultats sanguins sur la page principale, puis cliquez sur « Évaluer et Générer le Plan ».',
    wbTitle: 'Votre Plan Entraînement Personnalisé',
    wbSubtitle: 'HealthCalc.ai — Des exercices fondés sur la science',
    wbDay: 'Jour',
    wbType: 'Type :',
    wbAuto: 'Recommandation automatique',
    wbBurnTarget: 'Objectif de dépense calorique',
    wbGoal: 'Objectif de la séance',
    wbExercisesDone: 'Exercices Effectués',
    wbEmailPlan: 'Envoyer par email',
    wbDailyProgress: 'Progression quotidienne',
    wbOfEx: 'sur {n}',
    wbLevelBeginner: 'Débutant',
    wbLevelIntermediate: 'Intermédiaire',
    wbLevelAdvanced: 'Avancé',
    wbDone: 'Fait',
    wbExercisesCompleted: 'exercices effectués',
    mbBuild: 'Composez vos repas',
    mbPicked: '{n} sélectionnés',
    mbUse: 'Utiliser',
    mbDetectedCuisine: 'Nous avons détecté que vous êtes en {country} — plan {cuisine}',
    mbDetectedRegion: 'Région détectée : {country} — cuisine {cuisine}',
    mbAutoFill: 'Rempli automatiquement avec les favoris {cuisine} — ajustez librement',
    mbGenerate30: 'Générer Mon Plan 30 Jours',
    mbDishes: '{min}–{max} plats',
    mbTarget: 'Objectif {kcal} kcal',
    mbSmartPortions: 'Portions adaptatives intelligentes',
    mbShowPlan: 'Afficher le plan {meal} – {kcal} kcal',
    mbHidePlan: 'Masquer le plan {meal} – {kcal} kcal',
    mbDish: 'Plat',
    mbGrams: 'Grammes',
    mbCalories: 'kcal',
    mbProtein: 'Protéines',
    mbTotal: 'Total',
    mbCarbsFat: 'Glucides {carbs}g · Lipides {fat}g',
    mbAdaptiveDesc: 'Les portions s\'ajustent automatiquement pour que le repas atteigne toujours l\'objectif — ajoutez ou retirez des plats et les portions rétrécissent ou grandissent.',
    mbHeavy: 'Lourd',
    mbExtras: 'Extras',
    mbBread: 'Pain',
    mbSalads: 'Salades',
    mbSides: 'Accompagnements',
mbDrinks: 'Boissons',
    mbFruits: 'Fruits',
    wlHeroPill: '10 cuisines · USDA vérifié · Mifflin-St Jeor',
    wlGoalSelector: 'Sélecteur d\'objectif — recalcule instantanément tous les plans',
    wlExerciseType: 'Type d\'exercice',
    wlAutoRecommend: 'Recommandation automatique',
    wlFullWorkout: 'Plan d\'entraînement complet 30 jours',
    wlWorkoutHint: 'Sélectionnez un type d\'exercice ci-dessus, puis cliquez sur le bouton pour ouvrir le plan.',
    wlAgeYears: 'ans',
    wlWorkoutDaysPerWeek: 'Jours d\'entraînement par semaine',
    wlDays: '{n} jours',
    wlSedentary: 'Sédentaire',
    wlModerate: 'Modéré',
    wlVeryActive: 'Très actif',
    wlCaloriesSchedule: 'Calendrier des calories — {cuisine}',
    wlUsdaAccurate: 'Vérifié USDA',
    wlCompleteAllMeals: 'Terminer tous les repas',
    wlFullPlan: 'Plan complet 30 jours',
    wlSuggestions: 'Suggestions de la cuisine {cuisine}',
    wlCaloriesItem: '{name} - {kcal} kcal',
    wlProteinUnit: 'g',
    dbLabInterpreter: 'Interpréteur de Résultats de Laboratoire',
    dbLabsEmpty: 'Entrez vos valeurs de laboratoire dans le panneau de gauche pour une interprétation instantanée basée sur les directives médicales de l\'ADA.',
    dbBpClassification: 'Classification de la Pression Artérielle (AHA)',
    dbSystolicRange: 'Plage Systolique',
    dbDiastolicRange: 'Plage Diastolique',
    dbRecommendations: 'Recommandations',
    dbBpClassifier: 'Classificateur de Pression Artérielle',
    dbBpEmpty: 'Entrez vos lectures de pression artérielle pour les classer selon les directives AHA avec des recommandations personnalisées.',
    db30DayMealPlan: 'Plan de Repas Diabète - 30 Jours',
    dbFoundation: 'Fondation',
    unitMetric: 'Métrique',
    unitUs: 'US',
    ltpEngine: 'Moteur de Santé Intelligent',
    ltpHeroTitle: 'Suite Diabète & Hypertension',
    ltpHeroDesc: 'Entrez votre profil et vos valeurs de laboratoire pour recevoir instantanément des plans de repas personnalisés, des routines d\'exercice et un suivi de progression — le tout aligné sur les directives cliniques ADA et AHA.',
    ltpProfileLab: 'Profil & Valeurs de Laboratoire',
    ltpProfileLabSub: 'Saisissez vos données pour une évaluation personnalisée ADA & AHA',
    ltpUserProfile: 'Profil Utilisateur',
    ltpBloodGlucose: 'Glycémie',
    ltpFastingLabel: 'À jeun (mg/dL)',
    ltpFastingRange: 'Normal : 70–99 · Pré-diabète : 100–125 · Diabète : ≥126',
    ltpPostLabel: 'Postprandiale 2h (mg/dL)',
    ltpPostRange: 'Normal : <140 · Pré-diabète : 140–199 · Diabète : ≥200',
    ltpHba1cRange: 'Normal : <5,7 % · Pré-diabète : 5,7–6,4 % · Diabète : ≥6,5 %',
    ltpBloodPressure: 'Pression Artérielle',
    ltpSystolic: 'Systolique',
    ltpDiastolic: 'Diastolique',
    ltpSystolicLabel: 'Systolique (mmHg)',
    ltpDiastolicLabel: 'Diastolique (mmHg)',
    ltpSysShort: 'Sys',
    ltpDiaShort: 'Dia',
    ltpNormal: 'Normale (AHA) :',
    ltpElevated: 'Élevée :',
    ltpStage1: 'Stade 1 HTA :',
    ltpStage2: 'Stade 2 HTA :',
    ltpEvaluate: 'Évaluer et Générer le Plan',
    ltpHide: 'Masquer',
    ltpShow: 'Afficher',
    ltpProgress: 'Progression',
    ltpGlucose: 'Glucose',
    ltpRisk: 'Risque',
    ltpDailyTargets: 'Vos Objectifs Quotidiens',
    ltpTargetsSub: 'Calculés à partir de l\'âge, du poids, de la taille et du niveau d\'activité',
    ltpProtein: 'Protéines :',
    ltpCarbs: 'Glucides :',
    ltpFat: 'Lipides :',
    ltpDiabetesPlan: 'Plan de Gestion du Diabète',
    ltpDiaSub: 'Basé sur les directives ADA · IG bas · Glucides comptés · Ajusté à l\'âge',
    ltpFree: 'Gratuit',
    ltpGlucoseProfile: 'Profil Glycémique',
    ltpStatus: 'Statut',
    ltpADATargets: 'Objectifs ADA',
    ltpPostMeal: 'Après le repas',
    ltpCarbPerMeal: 'Glucides/Repas',
    ltpGITarget: 'Cible IG',
    ltpCarbBudget: 'Budget Glucides',
    ltpFiberGoal: 'Objectif Fibres',
    ltpDiaPlan30: 'Plan de Repas et d\'Exercice Diabète - 30 Jours',
    ltpDiabetesMeals: 'Repas Diabète',
    ltpADAAligned: 'Conforme ADA',
    ltpOpenFullPlan: 'Ouvrir le Plan Complet 30 Jours en PDF / Impression',
    ltpDownloadPrint: 'Téléchargez ou imprimez votre plan personnalisé complet',
    ltpCompleteExercises: 'Terminer tous les exercices',
    ltpExerciseProtocol: 'Protocole d\'Exercice',
    ltpAgeAdjusted: 'Ajusté à l\'âge',
    ltpADAGuidelines: 'Directives ADA',
    ltpHTPlan: 'Plan de Gestion de l\'Hypertension',
    ltpHTSub: 'Basé sur les directives AHA · Régime DASH · Faible teneur en sodium · Conscience du poids',
    ltpBPProfile: 'Profil TA',
    ltpReading: 'Lecture',
    ltpAHATargets: 'Objectifs AHA',
    ltpBPTarget: 'Cible Pression',
    ltpSodium: 'Sodium',
    ltpPotassium: 'Potassium',
    ltpExercise: 'Exercice',
    ltpBMITarget: 'Cible IMC',
    ltpHTPlan30: 'Plan de Repas et d\'Exercice Hypertension - 30 Jours',
    ltpDASHMeals: 'Repas DASH',
    ltpDASHAligned: 'Conforme DASH',
    ltpWeightAware: 'Sensible au poids',
    ltpAHAGuidelines: 'Directives AHA',
    ltpDailyMealPlan: 'Plan de Repas Quotidien',
    ltpMealSummary: '{kcal} kcal · IG moyen : {gi} · objectif {target} kcal',
    ltpShuffle: 'Mélanger',
    ltpDailyTracking: 'Suivi Quotidien',
    ltpMetric: 'Métrique',
    ltpTarget: 'Objectif',
    ltpActual: 'Réel',
    ltpStatusSafe: 'Sûr',
    ltpStatusOnTrack: 'Sur la bonne voie',
    ltpStatusAttention: 'Nécessite une attention',
    ltpStatusBelow: 'Sous l\'objectif',
    ltpStatusOver: 'Dépassement',
    ltpProgressTracking: 'Suivi de la Progression',
    ltpEntries: '{n} entrées',
    ltpClearAll: 'Tout Effacer',
    ltpNoProgress: 'Aucune lecture pour le moment. Cliquez sur « {action} » pour enregistrer votre première entrée.',
    ltpGlucoseTrend: 'Tendance de la Glycémie (7 derniers)',
    ltpPostShort: 'Post.',
    ltpPostprandial: 'Postprandiale',
    ltpBPTrend: 'Tendance de la Pression Artérielle (7 derniers)',
    ltpFasting: 'À jeun',
    ltpWeightTrend: 'Tendance du Poids',
    ltpDate: 'Date',
    ltpWeight: 'Poids',
    ltpClinicalSummary: 'Résumé Clinique',
    ltpPrintReport: 'Imprimer / Télécharger le Rapport',
    ltpEmailReport: 'Envoyer par E-mail',
    ltpEmailOpened: 'Client e-mail ouvert',
    ltpEmailReady: 'Votre rapport de santé complet avec profil, plans et progression est prêt à être envoyé.',
    ltpEmptyPrompt: 'Entrez votre profil et vos valeurs de laboratoire ci-dessus, puis cliquez sur « {action} ».',
    pmSuiteBadge: 'Suite Santé Avancée',
    pmFreeModules: '{n} Modules Gratuits',
    pmHeroSub: 'Parcours de santé structurés de 30 jours avec plans adaptatifs IA, suivi quotidien et export clinique pour 8 pathologies.',
    pmSuiteActive: 'Suite de Soins Avancés Active',
    pmSuiteActiveSub: 'Accès complet à tous les modules, y compris {n} programmes de santé gratuits.',
    pmCrossAdvisory: 'Conseil Inter-Pathologies',
    pmConditionModules: 'Modules de Pathologie',
    pmConditionSub: 'Sélectionnez des pathologies pour activer des parcours de santé de 30 jours',
    pmActive: 'Actif',
    pmPremium: 'Premium',
    pmClickDeactivate: 'Cliquez pour désactiver ↑',
    pmClickActivate: 'Cliquez pour activer →',
    pm30DayJourney: 'Parcours de Santé de 30 Jours',
    pmCustomized: 'Personnalisé',
    pmPatientProfile: 'Profil Patient',
    pmLabValues: 'Valeurs de Laboratoire',
    pmGeneratePlan: 'Générer le Plan de 30 Jours',
    pmPlansGenerated: 'Plans générés et personnalisés',
    pmHealthScore: 'Score de Santé',
    pmCheckInStreak: 'Série d\'Enregistrements',
    pmStreakInfo: 'Actuel : {c} jours · Maximum : {l} jours',
    pmAIAutoAdj: 'Ajustement Automatique IA : {type}',
    pmTabPlan30: 'Plan de 30 Jours',
    pmTabCheckin: 'Enregistrement Quotidien',
    pmTabAnalytics: 'Analyses & Séries',
    pmTabGuidelines: 'Directives',
    pm30DayPlanLabel: '{name} — Plan de 30 Jours',
    pmDailyCheckIn: 'Enregistrement Quotidien',
    pmDayOf30: 'Jour {n} sur 30 · Enregistrez vos marqueurs quotidiens',
    pmCancel: 'Annuler',
    pmLogToday: 'Enregistrer Aujourd\'hui',
    pmSaveCheckIn: 'Enregistrer',
    pmDayLabel: 'Jour {n}',
    pmSymptomLog: 'Journal des Déclencheurs',
    pmSymptomLogSub: 'Enregistrez les poussées et identifiez les schémas',
    pmLogTrigger: 'Enregistrer un Déclencheur',
    pmSymptom: 'Symptôme',
    pmSelectOption: 'Sélectionner...',
    pmTriggerFood: 'Aliment/Déclencheur Possible',
    pmSelectCustom: 'Sélectionnez ou saisissez une valeur personnalisée...',
    pmSeverity: 'Sévérité (1-10) : {n}',
    pmNotes: 'Notes',
    pmNotesPlaceholder: 'Contexte supplémentaire...',
    pmSaveTrigger: 'Enregistrer le Déclencheur',
    pmTriggerPrefix: 'Déclencheur :',
    pmWeeklyMilestones: 'Objectifs Hebdomadaires',
    pmMilestoneTarget: 'Objectif : {t} {u}',
    pmMilestoneCurrent: '(actuel : {n})',
    pmMilestoneDescPlaceholder: 'Description de l\'objectif',
    pmUnit: 'Unité',
    pmAdd: 'Ajouter',
    pmRecentTrends: 'Tendances Récentes',
    pmAvg: 'Moy : {n}',
    pmCheckIns: 'Enregistrements',
    pmDayStreak: 'Série de Jours',
    pmMilestones: 'Objectifs',
    pmTriggersLogged: 'Déclencheurs Enregistrés',
    pmGuidelinesTitle: 'Directives Médicales & Recommandations',
    pmWhatsIncluded: 'Qu\'est-ce qui est inclus ?',
    pmIncludeSub: 'Gestion de santé complète spécifique à la pathologie',
    pmIncPlans: 'Plans de 30 Jours',
    pmIncPlansDesc: 'Parcours quotidiens structurés avec repas, exercices et objectifs cliniques',
    pmIncTracking: 'Suivi Quotidien',
    pmIncTrackingDesc: 'Journal des enregistrements, déclencheurs de symptômes et observance des médicaments',
    pmIncAI: 'Adaptation IA',
    pmIncAIDesc: 'Ajustements automatiques intelligents basés sur vos données de suivi',
    pmIncExport: 'Export Clinique',
    pmIncExportDesc: 'Rapports PDF/CSV pour les consultations médicales',
    pmCSVExport: 'Export CSV',
    pmEmail: 'E-mail'
  },
  es: {
    appName: 'HealthCalc.ai',
    mealBreakfast: 'Desayuno',
    mealLunch: 'Almuerzo',
    mealDinner: 'Cena',
    mealMorningSnack: 'Merienda de la mañana',
    mealAfternoonSnack: 'Merienda de la tarde',
    mealSnack: 'Merienda',
    tagline: 'Tu Compañero de Salud IA',
    searchPlaceholder: 'Buscar calculadoras de salud...',
    home: 'Inicio',
    weightLoss: 'Peso y Fitness',
    diabetes: 'Diabetes e Hipertensión',
    premium: 'Atención Avanzada',
    heroTitle: 'Tu Plan Personalizado de Salud y Fitness',
    heroSubtitle: 'Calculadoras basadas en ciencia, planes de comidas y rutinas de ejercicio respaldados por guías médicas internacionales (ADA, DASH, USDA, ACSM).',
    heroCTA: 'Empezar Gratis',
    healthTools: 'Herramientas de Salud',
    healthToolsDesc: 'Calculadoras y planificadores profesionales respaldados por guias medicas internacionales',
    getStarted: 'Empezar',
    enterDetails: 'Ingresa Tus Datos',
    enterDetailsDesc: 'Completa tu perfil y haz clic en Calcular para obtener tu plan de salud personalizado.',
    yourProfile: 'Tu Perfil',
    module1Title: 'Pérdida de Peso, Ganancia Muscular y Planificador de Ejercicios',
    module1Desc: 'Obtén objetivos calóricos personalizados, distribución de macronutrientes, planes de comidas y rutinas de ejercicio basados en tus métricas.',
    module2Title: 'Suite de Diabetes e Hipertensión',
    module2Desc: 'Calculadoras interactivas, planificadores de comidas, ejercicios personalizados e interpretación de resultados de laboratorio según guías ADA y AHA.',
    module3Title: 'Condiciones de Salud Avanzadas',
    module3Desc: 'Planes especializados de nutrición y ejercicio para SII, Gota, enfermedades renales, condiciones hepáticas y más.',
    age: 'Edad',
    gender: 'Género',
    male: 'Hombre',
    female: 'Mujer',
    height: 'Altura',
    weightLabel: 'Peso',
    activityLevel: 'Nivel de Actividad',
    goal: 'Objetivo Principal',
    sedentary: 'Sedentario (Poco o nada de ejercicio)',
    light: 'Ligeramente Activo (1-3 días/semana)',
    moderate: 'Moderadamente Activo (3-5 días/semana)',
    active: 'Activo (6-7 días/semana)',
    veryActive: 'Muy Activo (Ejercicio intenso diario)',
    loseWeight: 'Perder Peso',
    maintain: 'Mantener Peso',
    gainMuscle: 'Ganar Músculo',
    calculate: 'Calcular',
    dailyCalories: 'Calorías Diarias',
    macros: 'Distribución de Macronutrientes',
    protein: 'Proteínas',
    carbs: 'Carbohidratos',
    fat: 'Grasas',
    mealPlan: 'Plan de Comidas (1 Día)',
    workoutPlan: 'Rutina de Ejercicio',
    kg: 'kg',
    cm: 'cm',
    years: 'años',
    fastingGlucose: 'Glucosa en Ayunas',
    postPrandialGlucose: 'Glucosa Postprandial (2h)',
    hba1c: 'HbA1c',
    systolicBP: 'Presión Arterial Sistólica',
    diastolicBP: 'Presión Arterial Diastólica',
    analyzeLabs: 'Analizar Resultados',
    labResults: 'Interpretación de Resultados',
    unlockPremium: 'Desbloquear Suite Avanzada',
    premiumPrice: '$15/año',
    premiumDesc: 'Obtén planes especializados para SII, Gota, enfermedades renales y hepáticas con programas personalizados.',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    medicalDisclaimer: 'Aviso Médico',
    contactUs: 'Contáctenos',
    allRights: '© 2026 HealthCalc.ai. Todos los derechos reservados.',
    disclaimer: 'HealthCalc.ai proporciona información solo para fines educativos. No sustituye el consejo médico profesional, el diagnóstico o el tratamiento. Siempre consulte a su médico antes de comenzar cualquier dieta o programa de ejercicios.',
    contactName: 'Nombre Completo',
    contactEmail: 'Correo Electrónico',
    contactMessage: 'Tu Mensaje',
    contactSupportBadge: 'Soporte',
    contactRespondSubtitle: 'Normalmente respondemos en un plazo de 48 horas laborables',
    contactGetInTouch: 'Póngase en Contacto',
    contactInfoEmail: 'Correo Electrónico',
    contactInfoWebsite: 'Sitio Web',
    contactInfoResponseTime: 'Tiempo de Respuesta',
    contactResponseTimeValue: 'En un plazo de 48 horas laborables',
    contactFormTitle: 'Enviar un Mensaje',
    contactPlaceholderMessage: '¿Cómo podemos ayudarle?',
    contactSentTitle: '¡Mensaje Enviado!',
    contactSentDesc: 'Gracias por contactarnos. Responderemos en un plazo de 48 horas laborables.',
    sendMessage: 'Enviar Mensaje',
    sponsored: 'Patrocinado',
    sponsoredAd: 'Publicidad Patrocinada',
    cmUnit: 'cm',
    kgUnit: 'kg',
    mmolUnit: 'mmol/L',
    mgUnit: 'mg/dL',
    resultCategory: 'Categoría',
    recommendation: 'Recomendación',
    locked: 'Bloqueado',
    unlock: 'Desbloquear',
    bmiTitle: 'Calculadora de Índice de Masa Corporal',
    bmiSubtitle: 'Calcula tu IMC al instante con una evaluación limpia y basada en evidencia. Saber dónde estás — y qué hacer después.',
    bmiYourDetails: 'Tus Datos',
    bmiYourBmi: 'Tu IMC',
    bmiKgM2: 'kg/m²',
    bmiUnderweight: 'Bajo Peso',
    bmiNormal: 'Peso Normal',
    bmiOverweight: 'Sobrepeso',
    bmiObese: 'Obeso',
    bmiRisk: 'Riesgo de Salud',
    bmiValue: 'Valor IMC',
    bmiHealthyRange: 'Rango Saludable',
    bmiIdealWeight: 'Peso Ideal',
    bmiCrossPromo: 'Plan de Salud Personalizado Disponible',
    bmiCrossPromoDiabetes: 'Tu IMC sugiere riesgo de diabetes — explora nuestro módulo de Gestión de Diabetes.',
    bmiCrossPromoCholesterol: 'Tu IMC sugiere riesgo cardiovascular — explora nuestro módulo de Colesterol.',
    bmiCrossPromoGeneral: 'Explora Atención Avanzada para un camino de salud personalizado de 30 días.',
    bmiRecommendations: 'Recomendaciones',
    bmiRecUnder1: 'Aumenta la ingesta calórica con alimentos densos en nutrientes (nueces, aguacates, granos integrales).',
    bmiRecUnder2: 'Incorpora entrenamiento de fuerza para construir masa muscular gradualmente.',
    bmiRecUnder3: 'Consulta a un profesional de salud para descartar condiciones médicas subyacentes.',
    bmiRecNormal1: 'Mantén tu dieta equilibrada rica en frutas, verduras y proteínas magras.',
    bmiRecNormal2: 'Mantente activo con al menos 150 minutos de ejercicio moderado por semana.',
    bmiRecNormal3: 'Monitorea tu IMC anualmente para mantenerlo en el rango saludable.',
    bmiRecOver1: 'Reduce los carbohidratos refinados y aumenta la ingesta de verduras en cada comida.',
    bmiRecOver2: 'Apunta a 200-300 minutos de ejercicio de intensidad moderada por semana.',
    bmiRecOver3: 'Considera un plan de comidas estructurado para gestionar porciones y calorías.',
    bmiRecObese1: 'Consulta a un médico o dietista para un plan de manejo de peso personalizado.',
    bmiRecObese2: 'Comienza con ejercicios de bajo impacto (caminar, nadar) y aumenta progresivamente.',
    bmiRecObese3: 'Monitorea los marcadores de salud relacionados: presión arterial, glucosa y colesterol.',
    bmiFormulaTitle: 'Fórmula y Cálculo del IMC',
    bmiFormulaExample: 'Ejemplo: 70 kg ÷ (1,70 m)² = 70 ÷ 2,89 = 24,2 (Normal)',
    bmiFormulaNote: 'El IMC es una herramienta de detección, no una medida diagnóstica. No tiene en cuenta la masa muscular, la densidad ósea o la composición corporal.',
    bmiTableTitle: 'Tabla de Categorías de IMC',
    bmiRiskTitle: 'Riesgos de Salud por Categoría de IMC',
    bmiEmptyTitle: 'Ingresa tus datos para calcular el IMC',
    bmiEmptyDesc: 'Completa el formulario a la izquierda y haz clic en Calcular para ver tu evaluación personalizada.',
    bmiCalculator: 'Calculadora IMC',
    calcNav: 'Calculadoras',
    calcTitle: 'Calculadoras de Salud',
    calcSubtitle: 'Calcula tu IMC, TMB, calorías diarias y peso ideal — y vincula tus resultados a un viaje de salud personalizado de 30 días.',
    calcSharedProfile: 'Tu Perfil Compartido',
    calcSharedHint: 'Tus datos se comparten entre todas las calculadoras. Actualiza una vez — los resultados se actualizan en todas partes.',
    calcSedentary: 'Sedentario',
    calcLight: 'Ligero',
    calcModerate: 'Moderado',
    calcActive: 'Activo',
    calcVeryActive: 'Muy Activo',
    calcBmiTitle: 'Calculadora IMC',
    calcBmiSubtitle: 'Índice de Masa Corporal — comprende tu categoría de peso',
    calcBmiValue: 'Valor IMC',
    calcBmiHealthy: 'Rango Saludable (18,5–24,9)',
    calcBmiUnder: 'Bajo Peso',
    calcBmiNormal: 'Peso Normal',
    calcBmiOver: 'Sobrepeso',
    calcBmiObese: 'Obeso',
    calcBmrTitle: 'Calculadora TMB',
    calcBmrSubtitle: 'Tasa Metabólica Basal — calorías quemadas en reposo',
    calcBmrLabel: 'TMB (Mifflin-St Jeor)',
    calcTdee: 'TDEE (Total Diario)',
    calcGoalLose: 'Perder Peso',
    calcGoalMaintain: 'Mantener',
    calcGoalGain: 'Ganar Músculo',
    calcCalTitle: 'Calculadora de Calorías',
    calcCalSubtitle: 'Objetivos calóricos y de macronutrientes según tus metas',
    calcDailyTarget: 'Tu Objetivo Calórico Diario',
    calcIdealTitle: 'Calculadora de Peso Ideal',
    calcIdealSubtitle: 'Rango de peso saludable para tu estatura (IMC 18,5–24,9)',
    calcIdealMin: 'Límite Inferior',
    calcIdealMid: 'Punto Medio Ideal',
    calcIdealMax: 'Límite Superior',
    calcIdealBelow: 'Por Debajo del Rango Ideal',
    calcIdealBelowDesc: 'por encima de tu peso actual para alcanzar el punto medio ideal.',
    calcIdealAbove: 'Por Encima del Rango Ideal',
    calcIdealAboveDesc: 'por debajo del punto medio ideal para tu estatura.',
    calcIdealPerfect: 'Dentro del Rango Ideal',
    calcIdealPerfectDesc: 'Tu peso está dentro del rango IMC saludable. ¡Sigue así!',
    calcBridgeTitle: 'Usar en Atención Avanzada →',
    calcBridgeDesc: 'Guarda tu IMC para calibrar automáticamente tu viaje de salud de 30 días.',
    calcBridgeCalTitle: 'Personalizar Mi Plan 30 Días →',
    calcBridgeCalDesc: 'Usa tus objetivos calóricos para calibrar comidas y ejercicios.',
    calcBridgeAdvanced: 'Comenzar Tu Viaje de Salud →',
    calcBridgeAdvancedDesc: 'Vincula tus resultados a un viaje de salud personalizado de 30 días.',
    calcBridgeWeight: 'Obtener Mi Plan Personalizado →',
    calcBridgeWeightDesc: 'Usa tu peso ideal como hito en tu viaje de salud.',
    calcSaved: '✓ Guardado en el Perfil',
    calcSavedDesc: 'Tus datos están listos para Atención Avanzada.',
    calcSummary: 'Resumen de Tus Resultados',
    calcGoAdvanced: 'Ir a Atención Avanzada →',
    calcHowTitle: 'Cómo Funciona',
    calcHow1: 'Completa tu perfil compartido arriba — edad, género, estatura, peso y nivel de actividad.',
    calcHow2: 'Abre cualquier calculadora y haz clic en Calcular para ver tus resultados al instante.',
    calcHow3: 'Guarda tus resultados y vincúlalos directamente a tu viaje de salud de 30 días.',
    calcEmptyTitle: 'Ejecuta una calculadora para ver resultados',
    calcEmptyDesc: 'Tus resultados y el puente a Atención Avanzada aparecerán aquí.',
    calcEduFormula: 'Fórmulas y Ciencia',
    calcEduFormulaNote: 'La TMB usa la ecuación de Mifflin-St Jeor (considerada la más precisa). El TDEE multiplica la TMB por tu factor de actividad. El IMC es una herramienta de detección — no tiene en cuenta la masa muscular.',
    calcEduBmiTable: 'Tabla de Categorías de IMC',
    fcNav: 'Calculadora Fitness y Salud',
    fcTitle: 'Calculadora Fitness y Salud',
    fcSubtitle: 'Calcula tu IMC, TMB, calorías diarias y peso ideal — y vincula tus resultados a un viaje de salud personalizado de 30 días.',
    fcProfile: 'Tu Perfil de Salud',
    fcProfileHint: 'Tus datos se comparten entre todas las calculadoras. Actualiza una vez — los resultados se actualizan en todas partes.',
    fcSedentary: 'Sedentario',
    fcLight: 'Ligero',
    fcModerate: 'Moderado',
    fcActive: 'Activo',
    fcVeryActive: 'Muy Activo',
    fcTabBmi: 'IMC',
    fcTabBmr: 'TMB',
    fcTabCal: 'Calorías',
    fcTabIdeal: 'Peso Ideal',
    fcBmiYourBmi: 'Tu IMC',
    fcBmiRisk: 'Riesgo de Salud',
    fcBmiValue: 'Valor IMC',
    fcBmiHealthy: 'Rango Saludable (18,5–24,9)',
    fcBmiIdeal: 'Peso Ideal',
    fcBmiUnder: 'Bajo Peso',
    fcBmiNormal: 'Peso Normal',
    fcBmiOver: 'Sobrepeso',
    fcBmiObese: 'Obeso',
    fcBmrLabel: 'Tasa Metabólica Basal',
    fcBmrDesc: 'Calorías quemadas en reposo completo — la base de tus necesidades energéticas.',
    fcBmrTdee: 'Gasto Energético Total Diario',
    fcBmrTdeeDesc: 'TMB × tu factor de actividad — las calorías que realmente quemas cada día.',
    fcCalDaily: 'Tu Objetivo Calórico Diario',
    fcCalLose: 'Pérdida de Peso',
    fcCalMaintain: 'Mantener',
    fcCalGain: 'Ganar Músculo',
    fcCalMacros: 'Macronutrientes Recomendados',
    fcIdealMin: 'Límite Inferior',
    fcIdealMid: 'Punto Medio Ideal',
    fcIdealMax: 'Límite Superior',
    fcIdealBelow: 'Por Debajo del Rango Ideal',
    fcIdealBelowDesc: 'por encima de tu peso actual para alcanzar el punto medio ideal.',
    fcIdealAbove: 'Por Encima del Rango Ideal',
    fcIdealAboveDesc: 'por debajo del punto medio ideal para tu estatura.',
    fcIdealPerfect: 'Dentro del Rango Ideal',
    fcIdealPerfectDesc: 'Tu peso está dentro del rango IMC saludable. ¡Sigue así!',
    fcBridgeBmi: 'Usar en Atención Avanzada →',
    fcBridgeBmiDesc: 'Guarda tu IMC para calibrar automáticamente tu viaje de salud.',
    fcBridgeBmr: 'Personalizar Mi Plan 30 Días →',
    fcBridgeBmrDesc: 'Usa tu tasa metabólica para calibrar tu plan de nutrición.',
    fcBridgeCal: 'Comenzar Tu Viaje de Salud →',
    fcBridgeCalDesc: 'Vincula tus objetivos calóricos a un viaje personalizado de 30 días.',
    fcBridgeIdeal: 'Obtener Mi Plan Personalizado →',
    fcBridgeIdealDesc: 'Usa tu peso ideal como hito en tu viaje de salud.',
    fcSaved: '✓ Guardado en el Perfil',
    fcSavedDesc: 'Tus datos están listos para Atención Avanzada.',
    fcViewFormula: 'Ver Detalles Clínicos — Fórmulas y Ciencia',
    fcViewBmiTable: 'Ver Detalles Clínicos — Categorías de IMC',
    fcViewRisks: 'Ver Detalles Clínicos — Riesgos de Salud',
    fcFormulaNote: 'La TMB usa la ecuación de Mifflin-St Jeor (la más precisa). TDEE = TMB × factor de actividad. El IMC es una herramienta de detección — no tiene en cuenta la masa muscular.',
    fcCtaLabel: 'Tus datos están listos',
    fcCtaHeadline: 'Desbloquea Tu Viaje de Peso y Fitness Personalizado de 30 Días Ahora',
    fcCtaSub: 'Tu IMC, TMB y objetivos calóricos han sido guardados. Construyamos tu plan de Peso y Fitness personalizado.',
    fcCtaButton: 'Ir a Mi Plan de Peso y Fitness →',
    fcCtaLaunch: 'Guardar e Ir a Mi Plan de Peso y Fitness',
    fcCtaLaunchSub: 'Un clic — tus métricas se transfieren al instante, cero reinscripción',
    fcRedirecting: 'Redirigiendo a tu plan de Peso y Fitness en',
    // Smartwatch Sync
    swNav: 'Reloj',
    swTitle: 'Sincronización de Reloj Inteligente',
    swSubtitle: 'Conecta tu reloj inteligente para sincronizar tus datos de salud automáticamente',
    swHeroDesc: 'Sincroniza pasos, frecuencia cardíaca, sueño y más desde tu plataforma de salud favorita.',
    swDashboard: 'Panel',
    swGuide: 'Guía',
    swGuideLabel: 'Guía de Configuración',
    swSettings: 'Ajustes',
    swConnected: 'Conectado',
    swNotConnected: 'No Conectado',
    swLastSync: 'Última sincronización',
    swNeverSynced: 'Nunca sincronizado',
    swSyncing: 'Sincronizando...',
    swSyncNow: 'Sincronizar Ahora',
    swDisconnect: 'Desconectar',
    swConnectWatch: 'Conectar Reloj',
    swHealthPlatform: 'Plataforma de Salud',
    swAppleHealth: 'Apple Health',
    swGoogleHealthConnect: 'Google Health Connect',
    swWebBrowser: 'Navegador Web',
    swActive: 'Activo',
    swInactive: 'Inactivo',
    swHeartRate: 'Frecuencia Cardíaca',
    swSteps: 'Pasos',
    swActiveCalories: 'Calorías Activas',
    swSleep: 'Sueño',
    swWeight: 'Peso',
    swSpO2: 'Oxígeno en Sangre (SpO2)',
    swStress: 'Estrés',
    swFloors: 'Pisos',
    swBpm: 'ppm',
    swKcal: 'kcal',
    swHrs: 'h',
    swResting: 'En Reposo',
    swDeep: 'Profundo',
    swMinCardio: 'min de cardio',
    swStepsUnit: 'pasos',
    swFloorsUnit: 'pisos',
    swAiHealthTips: 'Consejos de Salud con IA',
    swDynamicPlan: 'Plan Dinámico',
    swCalorieAdj: 'Ajuste de Calorías',
    swKcalPerDay: 'kcal/día',
    swActivityGoal: 'Meta de Actividad',
    swStepsPerDay: 'pasos/día',
    swHydration: 'Hidratación',
    swLitersPerDay: 'litros/día',
    swRestDay: 'Día de Descanso',
    swRecommended: 'Recomendado',
    swActiveDay: 'Día Activo',
    swSyncHistory: 'Historial de Sincronización',
    swNoDataYet: 'Aún no hay datos',
    swNoDataDesc: 'Conecta tu reloj y sincroniza para ver tus métricas aquí.',
    swSetupGuide: 'Guía de Configuración',
    swSetupGuideDesc: 'Sigue estos sencillos pasos para conectar tu reloj inteligente.',
    swPrev: 'Anterior',
    swNext: 'Siguiente',
    swSupportedWatches: 'Relojes Compatibles',
    swConnectionSettings: 'Ajustes de Conexión',
    swAutoSync: 'Sincronización Automática',
    swAutoSyncDesc: 'Sincroniza automáticamente tus datos de salud al abrir la aplicación.',
    swSyncNotifications: 'Notificaciones de Sincronización',
    swSyncNotifDesc: 'Recibe una notificación cuando se complete una nueva sincronización.',
    swDataPermissions: 'Permisos de Datos',
    swGranted: 'Concedidos',
    swAdvanced: 'Avanzado',
    swExportData: 'Exportar Datos',
    swClearHistory: 'Borrar Historial',
    swDisconnectRemove: 'Al desconectar se eliminarán todos los datos sincronizados de este dispositivo.',
    swInstallTitle: 'Instalar la Aplicación',
    swInstallIos: 'Abre Apple Health y permite que HealthCalc.ai lea tus datos de salud.',
    swInstallAndroid: 'Abre Google Health Connect y permite que HealthCalc.ai acceda a tus datos de salud.',
    swInstallWeb: 'Usa el panel web para sincronizar desde tu navegador.',
    swConnectIosTitle: 'Conectar Apple Health',
    swConnectAndroidTitle: 'Conectar Google Health Connect',
    swConnectWebTitle: 'Conectar Navegador Web',
    swPairWatch: 'Vincula Tu Reloj',
    swPairIosTitle: 'Vincular con Apple Watch',
    swPairAndroidTitle: 'Vincular con Reloj Wear OS',
    swPairWebTitle: 'Vincular desde el Navegador',
    swTrackProgress: 'Seguir Progreso',
    swGuideStep1: 'Descarga HealthCalc.ai en tu teléfono.',
    swGuideStep2: 'Abre Ajustes y toca Conectar Reloj.',
    swGuideStep3: 'Otorga permisos a tu plataforma de salud.',
    swGuideStep4: 'Empieza a sincronizar tu actividad diaria automáticamente.',
    swGuideStep5: 'Consulta análisis y consejos de IA en tu panel.',
    syncGuideInstallTitleIos: 'Instalar en iPhone (Safari)',
    syncGuideInstallTitleAndroid: 'Instalar en Android (Chrome)',
    syncGuideInstallTitleWeb: 'Instalar PWA',
    syncGuideConnectTitleIos: 'Conectar Apple Health',
    syncGuideConnectTitleAndroid: 'Conectar Google Health Connect',
    syncGuideConnectTitleWeb: 'Conectar App de Salud',
    syncGuidePairTitle: 'Vincula Tu Reloj Inteligente',
    syncGuideTrackTitle: 'Sincroniza y Sigue Tu Progreso',
    syncGuideInstallIos1: 'Abre HealthCalc.ai en Safari.',
    syncGuideInstallIos2: 'Toca el botón Compartir (cuadrado con flecha) en la parte inferior.',
    syncGuideInstallIos3: 'Desplázate hacia abajo y toca "Añadir a pantalla de inicio".',
    syncGuideInstallIos4: 'Toca "Añadir" en la esquina superior derecha.',
    syncGuideInstallIos5: '¡El ícono de la aplicación HealthCalc.ai ahora aparece en tu pantalla de inicio!',
    syncGuideInstallAndroid1: 'Abre HealthCalc.ai en Chrome.',
    syncGuideInstallAndroid2: 'Toca el menú de tres puntos (⋮) en la parte superior derecha.',
    syncGuideInstallAndroid3: 'Toca "Añadir a pantalla de inicio" o "Instalar aplicación".',
    syncGuideInstallAndroid4: 'Toca "Añadir" o "Instalar" para confirmar.',
    syncGuideInstallAndroid5: '¡El ícono de la aplicación HealthCalc.ai ahora aparece en tu pantalla de inicio!',
    syncGuideInstallWeb1: 'Abre HealthCalc.ai en tu navegador.',
    syncGuideInstallWeb2: 'Haz clic en el ícono de instalación en la barra de direcciones.',
    syncGuideInstallWeb3: 'Haz clic en "Instalar" cuando se te solicite.',
    syncGuideInstallWeb4: '¡La aplicación ya está instalada!',
    syncGuideConnectIos1: 'Abre los Ajustes de tu iPhone.',
    syncGuideConnectIos2: 'Toca "Privacidad y seguridad" → "Salud".',
    syncGuideConnectIos3: 'Busca "HealthCalc.ai" y tócalo.',
    syncGuideConnectIos4: 'Activa todas las categorías de datos de salud que quieras sincronizar.',
    syncGuideConnectIos5: 'Regresa a HealthCalc.ai y toca "Sincronizar Ahora".',
    syncGuideConnectAndroid1: 'Abre la aplicación Google Health Connect (instálala desde Play Store si es necesario).',
    syncGuideConnectAndroid2: 'Toca "Permisos" → "Aplicaciones".',
    syncGuideConnectAndroid3: 'Busca "HealthCalc.ai" y otorga acceso de lectura.',
    syncGuideConnectAndroid4: 'Activa: Frecuencia Cardíaca, Pasos, Sueño, Peso, Calorías.',
    syncGuideConnectAndroid5: 'Regresa a HealthCalc.ai y toca "Sincronizar Ahora".',
    syncGuideConnectWeb1: 'Abre la aplicación de salud de tu teléfono.',
    syncGuideConnectWeb2: 'Ve a aplicaciones conectadas o ajustes de uso compartido.',
    syncGuideConnectWeb3: 'Busca "HealthCalc.ai" y autorízala.',
    syncGuideConnectWeb4: 'Otorga permisos para: Frecuencia Cardíaca, Pasos, Sueño, Calorías.',
    syncGuideConnectWeb5: 'Regresa a HealthCalc.ai y toca "Sincronizar Ahora".',
    syncGuidePairIos1: 'Asegúrate de que tu Apple Watch esté vinculado mediante la aplicación Watch.',
    syncGuidePairIos2: 'Abre la aplicación Watch en tu iPhone.',
    syncGuidePairIos3: 'Verifica que "Salud" esté activado en "Privacidad".',
    syncGuidePairIos4: 'Los datos de tu reloj fluyen automáticamente a Apple Health.',
    syncGuidePairIos5: 'HealthCalc.ai lee estos datos mediante la sincronización con Apple Health.',
    syncGuidePairAndroid1: 'Abre la aplicación compañera de tu reloj (Samsung Health, Fitbit, Garmin, etc.).',
    syncGuidePairAndroid2: 'Ve a Ajustes → Aplicaciones conectadas o Uso compartido de datos.',
    syncGuidePairAndroid3: 'Activa la sincronización de "Google Health Connect".',
    syncGuidePairAndroid4: 'Asegúrate de que Frecuencia Cardíaca, Pasos, Sueño y Calorías estén activados.',
    syncGuidePairAndroid5: 'HealthCalc.ai lee estos datos a través de Google Health Connect.',
    syncGuidePairWeb1: 'Abre la aplicación compañera de tu reloj.',
    syncGuidePairWeb2: 'Verifica que el reloj esté conectado a tu teléfono.',
    syncGuidePairWeb3: 'Activa el uso compartido de datos con la aplicación de salud de tu teléfono.',
    syncGuidePairWeb4: 'HealthCalc.ai sincronizará los datos automáticamente.',
    syncGuideTrack1: 'Regresa al panel de Sincronización del Reloj Inteligente.',
    syncGuideTrack2: 'Toca "Sincronizar Ahora" para obtener tus últimos datos de salud.',
    syncGuideTrack3: 'Consulta tus métricas diarias: frecuencia cardíaca, pasos, sueño y calorías.',
    syncGuideTrack4: 'El motor de IA usa estos datos para ajustar tu plan de 30 días.',
    syncGuideTrack5: 'Tu contador de racha y el progreso del plan se actualizan automáticamente.',
    swSyncCompleteToast: '¡Datos de salud sincronizados con éxito!',
    swExportedToast: 'Tus datos de salud fueron exportados como CSV.',
    swNothingToExport: 'Aún no hay datos sincronizados disponibles para exportar.',
    swHistoryClearedToast: 'Historial de sincronización borrado.',
    swDisconnectedToast: 'Reloj desconectado. Todos los datos sincronizados fueron eliminados de este dispositivo.',
    swStressLow: 'Bajo',
    swStressModerate: 'Moderado',
    swStressHigh: 'Alto',
    swKm: 'km',
    // Install Banner
    installTitle: 'Instalar HealthCalc.ai',
    installIosHint: 'Toca Compartir, luego Añadir a Pantalla de Inicio',
    installHint: 'Añade HealthCalc.ai a tu pantalla de inicio para una experiencia más rápida',
    installBtn: 'Instalar App',
    installNotNow: 'Ahora No',
    // Dashboard Widget
    widgetTitle: 'Datos del Reloj',
    widgetLastSync: 'Última sincronización',
    widgetNever: 'Nunca',
    widgetSyncing: 'Sincronizando...',
    widgetSync: 'Sincronizar',
    widgetViewAll: 'Ver Todo',
    widgetHeart: 'Frecuencia Cardíaca',
    widgetCalories: 'Calorías',
    widgetSleepLabel: 'Sueño',
    widgetNoData: 'Aún no hay datos del reloj',
    widgetConnectWatch: 'Conecta tu reloj para empezar a registrar',
    // Dashboard Page
    dashWelcome: 'Bienvenido de nuevo',
    dashPremium: 'Premium',
    dashFreePlan: 'Plan Gratuito',
    dashRenews: 'Renovación',
    dashHealthHistory: 'Historial de Salud',
    dashProfileSettings: 'Ajustes del Perfil',
    dashTotalRecords: 'Registros Totales',
    dashModulesUsed: 'Módulos Usados',
    dashMemberSince: 'Miembro Desde',
    dashNA: 'N/D',
    dashAll: 'Todos',
    dashLoading: 'Cargando...',
    dashNoRecords: 'No se encontraron registros',
    dashNoRecordsDesc: 'Tus resultados guardados aparecerán aquí cuando empieces a usar nuestras calculadoras.',
    dashTryCalc: 'Probar una Calculadora',
    dashDate: 'Fecha',
    dashModule: 'Módulo',
    dashKeyData: 'Datos Clave',
    dashNotes: 'Notas',
    dashActions: 'Acciones',
    dashDelete: 'Eliminar',
    dashPrev: 'Anterior',
    dashPageOf: 'de',
    dashNext: 'Siguiente',
    dashProfileInfo: 'Información del Perfil',
    dashName: 'Nombre Completo',
    dashEmail: 'Correo Electrónico',
    dashEmailCantChange: 'El correo electrónico no se puede cambiar',
    dashSubscription: 'Suscripción',
    dashUpgrade: 'Mejorar a Premium',
    dashSaveChanges: 'Guardar Cambios',
    dashChangePassword: 'Cambiar Contraseña',
    dashCurrentPassword: 'Contraseña Actual',
    dashNewPassword: 'Nueva Contraseña',
    dashMinChars: 'Mínimo 8 caracteres',
    dashConfirmPassword: 'Confirmar Contraseña',
    dashUpdatePassword: 'Actualizar Contraseña',
    dashProfileUpdated: '¡Perfil actualizado con éxito!',
    dashPasswordsNoMatch: 'Las contraseñas no coinciden',
    dashPasswordMin: 'La contraseña debe tener al menos 8 caracteres',
    dashPasswordChanged: '¡Contraseña cambiada con éxito!',
    dashDeleteConfirm: '¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.',
    // Auth Pages
    authWelcomeBack: 'Bienvenido de Nuevo',
    authSignInDesc: 'Inicia sesión para acceder a tus planes de salud personalizados',
    authEmailAddress: 'Correo Electrónico',
    authPassword: 'Contraseña',
    authSigningIn: 'Iniciando sesión...',
    authNoAccount: '¿No tienes una cuenta?',
    authCreateOne: 'Crea una',
    authCreateAccount: 'Crear Cuenta',
    authRegisterDesc: 'Únete a HealthCalc.ai y comienza tu viaje de salud hoy',
    authFullName: 'Nombre Completo',
    authConfirmPassword: 'Confirmar Contraseña',
    authRepeatPassword: 'Repetir Contraseña',
    authCreatingAccount: 'Creando cuenta...',
    authAlreadyHave: '¿Ya tienes una cuenta?',
    authSignIn: 'Iniciar Sesión',
    authPasswordsMatch: '¡Las contraseñas coinciden!',
    authPasswordMin6: 'Al menos 6 caracteres',
    authRegisterFailed: 'Error al registrarse. Inténtalo de nuevo.',
    authLoginFailed: 'Correo o contraseña incorrectos.',
    // Header
    headerDashboard: 'Panel',
    headerSignOut: 'Cerrar Sesión',
    headerSignIn: 'Iniciar Sesión',
    headerSignUp: 'Registrarse',
    headerNoResults: 'Sin resultados',
    // Footer
    footerTagline: 'Tu Compañero de Salud IA',
    footerQuickLinks: 'Enlaces Rápidos',
    footerLegal: 'Legal',
    footerHealthGuides: 'Guías de Salud',
    // Home Page
    homeAIPill: 'Impulsado por IA',
    homeHowItWorks: 'Cómo Funciona',
    homeHowItWorksDesc: 'Obtén tu plan de salud personalizado en tres sencillos pasos',
    homeStep: 'Paso',
    homeEnterProfile: 'Ingresa Tu Perfil',
    homeEnterProfileDesc: 'Cuéntanos tu edad, estatura, peso, nivel de actividad y objetivos.',
    homeGetPlan: 'Obtén Tu Plan',
    homeGetPlanDesc: 'Recibe objetivos calóricos, planes de comidas y ejercicios personalizados al instante.',
    homeTrackAdapt: 'Registra y Adapta',
    homeTrackAdaptDesc: 'Sincroniza tu reloj y deja que la IA adapte tu plan según tu progreso.',
    homeSpecializedPlans: 'Planes Especializados',
    homeSpecializedPlansDesc: 'Programas diseñados para pérdida de peso, diabetes, hipertensión y más.',
    homeScienceBased: 'Basado en la Ciencia',
    homeScienceBasedDesc: 'Basado en las guías médicas ADA, DASH, USDA y ACSM.',
    homeMultiLang: 'Multilingüe',
    homeMultiLangDesc: 'Disponible en inglés, francés, español y árabe.',
    homePrivacyFirst: 'Privacidad Primero',
    homePrivacyFirstDesc: 'Tus datos de salud están cifrados y nunca se comparten sin consentimiento.',
    homeMobileFriendly: 'Compatible con Móvil',
    homeMobileFriendlyDesc: 'Funciona perfectamente en cualquier dispositivo y lugar.',
    homeInstantResults: 'Resultados Instantáneos',
    homeInstantResultsDesc: 'Ve tus métricas de salud calculadas en tiempo real.',
    homeLabInterpreter: 'Intérprete de Análisis',
    homeLabInterpreterDesc: 'Comprende tus análisis de sangre con un análisis impulsado por IA.',
    homeWhyTitle: '¿Por Qué Elegir HealthCalc.ai?',
    homeWhySubtitle: 'Todo lo que necesitas para cuidar tu salud en un solo lugar',
    homeGuidelinesTitle: 'Basado en Guías Internacionales',
    homeGuidelinesSubtitle: 'Nuestras recomendaciones siguen estándares médicos reconocidos mundialmente',
    // Medical Disclaimer
    mdDismiss: 'Cerrar',
    // Breadcrumbs
    bcHome: 'Inicio',
    bcLanding: 'Guías de Salud',
    bcLandingWeightLossHypertension: 'Pérdida de Peso con Hipertensión',
    bcLandingDiabetesMealPlan40f: 'Plan de Comidas para Diabetes después de los 40',
    bcLandingMuscleBuilding80kg: 'Plan de Musculación (80 kg)',
    bcLandingPcosWeightLoss: 'Pérdida de Peso con SOP',
    bcLandingKetoDiabetes: 'Nutrición Keto para Diabetes Tipo 2',
    bcLandingSeniorFitness: 'Plan de Fitness para Mayores',
    bcLandingPostPregnancyWeightLoss: 'Pérdida de Peso Postparto',
    bcLandingAthleticPerformance: 'Nutrición para Rendimiento Atlético',
    // Common
    commonComplete: 'Completar',
    commonDailyProgress: 'Progreso Diario',
    commonDay: 'Día',
    commonDays: 'Días',
    commonBest: 'Mejor',
    commonToday: 'Hoy',
    commonDone: 'Hecho',
    commonPending: 'Pendiente',
    commonJourney: 'Viaje',
    commonCompleted: 'Completado',
    commonSmartSwap: 'Cambio Inteligente',
    commonStreak: 'Racha',
    commonPrint: 'Imprimir',
    commonEmail: 'Correo',
    commonCancel: 'Cancelar',
    commonSave: 'Guardar',
    commonDelete: 'Eliminar',
    commonLoading: 'Cargando...',
    commonExercises: 'Ejercicios',
    commonTotalSets: 'Series Totales',
    commonRestDay: 'Día de Descanso',
    commonExInfo: 'Info del Ejercicio',
    mdTitle: 'Aviso Médico',
    homeWeightLossDesc: 'Déficit calórico y seguimiento de macros',
    homeDiabetesDesc: 'Índice glucémico bajo y monitoreo de glucosa',
    homeHypertension: 'Hipertensión',
    homeHypertensionDesc: 'Dieta DASH y control de sodio',
    homeCholesterol: 'Colesterol',
    homeCholesterolDesc: 'Comidas saludables con omega-3',
    homeLiver: 'Salud Hepática',
    homeLiverDesc: 'Nutrición de apoyo a la desintoxicación',
    homeKidney: 'Enfermedad Renal',
    homeKidneyDesc: 'Planes bajos en sodio y potasio',
    homeGout: 'Gota',
    homeGoutDesc: 'Antiinflamatorio bajo en purinas',
    homeIBS: 'SII (Síndrome de Intestino Irritable)',
    homeIBSDesc: 'Planes de comidas bajas en FODMAP',
    homeThyroid: 'Salud de la Tiroides',
    homeThyroidDesc: 'Nutrición basada en TSH y seguimiento',
    homeSmartwatchDesc: 'Integración de datos de salud en tiempo real',
    premiumRequired: 'Premium Requerido',
    loading: 'Cargando...',
    premiumUnlockDescription: 'Desbloquea la Suite de Salud Avanzada con acceso completo a todos los módulos.',
    upgradeToPremium: 'Actualizar — $15/año',
    loginRequired: 'Inicio de Sesión Requerido',
    loginToSubscribe: 'Por favor crea una cuenta o inicia sesión para suscribirte.',
    ok: 'Aceptar',
    notFoundTitle: 'Página No Encontrada',
    notFoundDesc: 'La página que buscas no existe o ha sido movida. Volvamos al camino correcto.',
    backToHome: 'Volver al Inicio',
    saveProgress: 'Guardar Progreso',
    saved: '¡Guardado!',
    saving: 'Guardando...',
    loginToSave: 'Inicia Sesión para Guardar',
    failedToSave: 'Error al guardar',
    plan: 'Plan',
    dayLabel: 'Día',
    streak: 'Racha',
    days: 'días',
    best: 'Mejor',
    today: 'Hoy',
    done: 'Hecho',
    pending: 'Pendiente',
    journey: 'Recorrido',
    allComplete: '¡Todo Completado!',
    dailyProgress: 'Progreso Diario',
    completed: 'completado',
    proteinLabel: 'Proteínas',
    carbsLabel: 'Carbohidratos',
    fatLabel: 'Grasas',
    smartSwap: 'Intercambio Inteligente',
    mealPlanTitle: 'Tu Plan de Salud Personalizado',
    mealPlanSubtitle: 'HealthCalc.ai — Nutrición Basada en Ciencia',
    dailyCaloricTarget: 'Objetivo Calórico Diario',
    waterGoal: 'Objetivo de Agua',
    mealsDone: 'Comidas Completadas',
    downloadPdf: 'Descargar PDF',
    emailPlan: 'Enviar Plan por Email',
    progressTracker: 'Seguimiento de Progreso',
    ofMeals: 'comidas',
    water: 'agua',
    eaten: 'Comido',
    mealsCompleted: 'comidas completadas',
    close: 'Cerrar',
    altOptions: 'Opciones Alternativas',
    kcal: 'kcal',
    dashOfflineTitle: 'Modo Sin Conexión',
    dashOfflineDesc: 'El servidor no está disponible. El historial se almacena localmente.',
    backendUnavailable: 'El servidor no está disponible. Todas las calculadoras funcionan localmente.',
    chooseCuisine: 'Elige tu cocina',
    // Food library
    foodLibTitle: 'Biblioteca de Calorías',
    foodLibSubtitle: 'Más de 60 categorías de platos de cocinas del mundo con calorías USDA precisas',
    foodLibSearchBadge: 'Busca cualquier alimento + filtra por cocina + ordena por proteína',
    foodLibSearchLabel: 'Buscar',
    foodLibSearchPlaceholder: 'ej. tamales, cuscús, sushi...',
    foodLibCuisineLabel: 'Cocina',
    foodLibAllCuisines: 'Todas las cocinas',
    foodLibSortLabel: 'Ordenar',
    foodLibSortCalories: 'Menos calorías',
    foodLibSortHighProtein: 'Más proteína',
    foodLibSortName: 'Alfabético',
    foodLibCaloriesFilter: 'Calorías:',
    foodLibCalLow: 'Bajo <150',
    foodLibCalMid: 'Medio 150-250',
    foodLibCalHigh: 'Alto >250',
    foodLibCalAll: 'Todos',
    foodLibResults: 'resultados',
    foodLibAll: 'Todos',
    foodLibColItem: 'Plato',
    foodLibColCuisine: 'Cocina',
    foodLibColPortion: 'Porción',
    foodLibColCalories: 'Calorías',
    foodLibColProtein: 'Proteína',
    foodLibColCarbs: 'Carbohidratos',
    foodLibColFat: 'Grasa',
    foodLibUsdaBadge: 'USDA',
    foodLibNoResults: 'Sin resultados para esta búsqueda',
    foodLibClearFilters: 'Limpiar filtros',
    foodLibSeoTitle: '¿Por qué es precisa la biblioteca de HealthCalc?',
    foodLibSeoBody: 'Cada caloría proviene de USDA FoodData Central, la base de datos de alimentos más grande del mundo. Cada plato se calcula por gramo, no por estimación. Usa la biblioteca en cualquier dieta: pérdida de peso, ganancia muscular, cetogénica o vegetal. Cocinas: mediterránea, del Golfo, levantina, norteafricana, asiática, europea y más.',
    coAnnualSub: 'Suscripción anual · Cancela cuando quieras',
    coAdvancedSuite: 'Suite de Salud Avanzada',
    coAnnualBilling: 'Facturación anual · Renovación automática',
    coFullName: 'Nombre Completo',
    coEmailAddress: 'Correo Electrónico',
    coCardNumber: 'Número de Tarjeta',
    coExpiryDate: 'Fecha de Vencimiento',
    coCvv: 'CVV',
    coSecurityNote: 'Tu información de pago está cifrada y segura. Esto es una demo — no se realizará ningún cargo real.',
    coPay: 'Pagar',
    coProcessing: 'Procesando Pago...',
    coVerifyWait: 'Espera mientras verificamos tu pago.',
    coPaymentSuccess: '¡Pago Exitoso!',
    coWelcomeSuite: 'Bienvenido a la Suite de Salud Avanzada.',
    coRedirecting: 'Redirigiendo ahora...',
    coPaymentFailed: 'Pago Fallido',
    coTryAgain: 'Reintentar',
    coPaymentFailedFallback: 'Error en el pago. Inténtalo de nuevo.',
    cuSelected: 'Cocina seleccionada',
    cuNone: 'Ninguna',
    cuClear: 'Limpiar',
    adviceTitle: 'Consejos de salud personales',
    adviceLive: 'Actualización en vivo',
    adviceBmi: 'IMC',
    adviceIdealWeight: 'Peso ideal',
    adviceBmr: 'TMB',
    adviceGoalDeficit: 'Objetivo: déficit diario de 500 kcal ≈ 0,5 kg/semana.',
    adviceGoalSurplus: 'Objetivo: superávit diario de 300 kcal más entrenamiento de fuerza para ganar músculo.',
    adviceGoalMaintain: 'Objetivo: mantener el peso equilibrando la ingesta con el gasto.',
    adviceRecLoss: 'Pérdida de peso recomendada: {loss} kg para alcanzar tu peso ideal (~{weeks} semanas a 0,5 kg/semana).',
    adviceProteinDay: 'Proteína / día',
    adviceWaterDay: 'Agua / día',
    adviceMacros: 'Macros (tu objetivo)',
    adviceWeightMult: 'peso × 1,6–2,2 g',
    adviceWaterMult: 'peso × 0,033 L',
    adviceCatUnderweight: 'Bajo peso',
    adviceCatNormal: 'Normal',
    adviceCatOverweight: 'Sobrepeso',
    adviceCatObese: 'Obesidad',
    adviceCondDiabetes: 'Diabetes',
    adviceCondDiabetesTip: 'Elige carbohidratos de bajo índice glucémico, reparte las comidas y controla la HbA1c. Prefiere verduras ricas en fibra.',
    adviceCondBp: 'Presión arterial',
    adviceCondBpTip: 'Reduce el sodio por debajo de 5 g/día, evita los alimentos procesados y encurtidos, e incluye verduras ricas en potasio.',
    adviceCondCholesterol: 'Colesterol',
    adviceCondCholesterolTip: 'Mantén las grasas saturadas por debajo del 7 % de las calorías, controla el LDL y aumenta la fibra con avena, legumbres y fruta.',
    cuisine: 'Cocina',
    changeFromMain: 'Cámbialo desde la página principal',
    print: 'Imprimir',
    todayPlan: 'Plan de hoy',
    noLabData: 'Aún no hay datos de laboratorio',
    noLabDataDesc: 'Introduce tus resultados de análisis en la página principal y haz clic en "Evaluar y Generar Plan".',
    wbTitle: 'Tu Plan de Ejercicio Personalizado',
    wbSubtitle: 'HealthCalc.ai — Planificación de ejercicio basada en la ciencia',
    wbDay: 'Día',
    wbType: 'Tipo:',
    wbAuto: 'Recomendación automática',
    wbBurnTarget: 'Objetivo de quema de calorías',
    wbGoal: 'Objetivo de ejercicio',
    wbExercisesDone: 'Ejercicios Completados',
    wbEmailPlan: 'Enviar por correo',
    wbDailyProgress: 'Progreso diario',
    wbOfEx: 'de {n}',
    wbLevelBeginner: 'Principiante',
    wbLevelIntermediate: 'Intermedio',
    wbLevelAdvanced: 'Avanzado',
    wbDone: 'Hecho',
    wbExercisesCompleted: 'ejercicios completados',
    mbBuild: 'Construye tus comidas',
    mbPicked: '{n} elegidos',
    mbUse: 'Usar',
    mbDetectedCuisine: 'Detectamos que estás en {country} — plan {cuisine}',
    mbDetectedRegion: 'Región detectada: {country} — cocina {cuisine}',
    mbAutoFill: 'Rellenado automáticamente con los favoritos de {cuisine} — ajústalo libremente',
    mbGenerate30: 'Generar Mi Plan de 30 Días',
    mbDishes: '{min}–{max} platos',
    mbTarget: 'Objetivo {kcal} kcal',
    mbSmartPortions: 'Porciones adaptativas inteligentes',
    mbShowPlan: 'Mostrar plan de {meal} – {kcal} kcal',
    mbHidePlan: 'Ocultar plan de {meal} – {kcal} kcal',
    mbDish: 'Plato',
    mbGrams: 'Gramos',
    mbCalories: 'kcal',
    mbProtein: 'Proteína',
    mbTotal: 'Total',
    mbCarbsFat: 'Carbohidratos {carbs}g · Grasas {fat}g',
    mbAdaptiveDesc: 'Las porciones se ajustan automáticamente para que la comida llegue siempre al objetivo: añade o quita platos y las porciones se reducen o crecen.',
    mbHeavy: 'Pesado',
    mbExtras: 'Extras',
    mbBread: 'Pan',
    mbSalads: 'Ensaladas',
    mbSides: 'Guarniciones',
    mbDrinks: 'Bebidas',
    mbFruits: 'Frutas',
    wlHeroPill: '10 cocinas · USDA verificado · Mifflin-St Jeor',
    wlGoalSelector: 'Selector de objetivo: recalcula todos los planes al instante',
    wlExerciseType: 'Tipo de ejercicio',
    wlAutoRecommend: 'Recomendación automática',
    wlFullWorkout: 'Plan de ejercicio completo de 30 días',
    wlWorkoutHint: 'Selecciona un tipo de ejercicio arriba y luego haz clic en el botón para abrir el plan.',
    wlAgeYears: 'años',
    wlWorkoutDaysPerWeek: 'Días de ejercicio por semana',
    wlDays: '{n} días',
    wlSedentary: 'Sedentario',
    wlModerate: 'Moderado',
    wlVeryActive: 'Muy activo',
    wlCaloriesSchedule: 'Horario de calorías — {cuisine}',
    wlUsdaAccurate: 'Verificado por USDA',
    wlCompleteAllMeals: 'Completar todas las comidas',
    wlFullPlan: 'Plan completo de 30 días',
    wlSuggestions: 'Sugerencias de la cocina {cuisine}',
    wlCaloriesItem: '{name} - {kcal} kcal',
    wlProteinUnit: 'g',
    dbLabInterpreter: 'Interpretador de Resultados de Laboratorio',
    dbLabsEmpty: 'Introduce tus valores de laboratorio en el panel izquierdo para obtener una interpretación instantánea según las guías médicas de la ADA.',
    dbBpClassification: 'Clasificación de la Presión Arterial (AHA)',
    dbSystolicRange: 'Rango Sistólico',
    dbDiastolicRange: 'Rango Diastólico',
    dbRecommendations: 'Recomendaciones',
    dbBpClassifier: 'Clasificador de Presión Arterial',
    dbBpEmpty: 'Introduce tus lecturas de presión arterial para clasificarlas según las guías de la AHA con recomendaciones personalizadas.',
    db30DayMealPlan: 'Plan de Comidas para Diabetes - 30 Días',
    dbFoundation: 'Fundación',
    unitMetric: 'Métrico',
    unitUs: 'US',
    ltpEngine: 'Motor de Salud Inteligente',
    ltpHeroTitle: 'Suite Diabetes e Hipertensión',
    ltpHeroDesc: 'Introduce tu perfil y valores de laboratorio para recibir al instante planes de comidas personalizados, rutinas de ejercicio y seguimiento de progreso, todo alineado con las guías clínicas de ADA y AHA.',
    ltpProfileLab: 'Perfil y Valores de Laboratorio',
    ltpProfileLabSub: 'Introduce tus métricas para una evaluación personalizada según ADA y AHA',
    ltpUserProfile: 'Perfil de Usuario',
    ltpBloodGlucose: 'Glucosa en Sangre',
    ltpFastingLabel: 'En ayunas (mg/dL)',
    ltpFastingRange: 'Normal: 70–99 · Pre: 100–125 · Diabetes: ≥126',
    ltpPostLabel: 'Posprandial 2h (mg/dL)',
    ltpPostRange: 'Normal: <140 · Pre: 140–199 · Diabetes: ≥200',
    ltpHba1cRange: 'Normal: <5.7% · Pre: 5.7–6.4% · Diabetes: ≥6.5%',
    ltpBloodPressure: 'Presión Arterial',
    ltpSystolic: 'Sistólica',
    ltpDiastolic: 'Diastólica',
    ltpSystolicLabel: 'Sistólica (mmHg)',
    ltpDiastolicLabel: 'Diastólica (mmHg)',
    ltpSysShort: 'Sis',
    ltpDiaShort: 'Dia',
    ltpNormal: 'Normal (AHA):',
    ltpElevated: 'Elevada:',
    ltpStage1: 'Etapa 1 HTA:',
    ltpStage2: 'Etapa 2 HTA:',
    ltpEvaluate: 'Evaluar y Generar Plan',
    ltpHide: 'Ocultar',
    ltpShow: 'Mostrar',
    ltpProgress: 'Progreso',
    ltpGlucose: 'Glucosa',
    ltpRisk: 'Riesgo',
    ltpDailyTargets: 'Tus Objetivos Diarios',
    ltpTargetsSub: 'Calculados a partir de edad, peso, estatura y nivel de actividad',
    ltpProtein: 'Proteína:',
    ltpCarbs: 'Carbohidratos:',
    ltpFat: 'Grasa:',
    ltpDiabetesPlan: 'Plan de Manejo de la Diabetes',
    ltpDiaSub: 'Basado en guías de la ADA · IG bajo · Carbohidratos contados · Ajustado a la edad',
    ltpFree: 'Gratis',
    ltpGlucoseProfile: 'Perfil de Glucosa',
    ltpStatus: 'Estado',
    ltpADATargets: 'Metas ADA',
    ltpPostMeal: 'Después de la comida',
    ltpCarbPerMeal: 'Carb/Comida',
    ltpGITarget: 'Objetivo GI',
    ltpCarbBudget: 'Presupuesto de Carbohidratos',
    ltpFiberGoal: 'Meta de Fibra',
    ltpDiaPlan30: 'Plan de Comidas y Ejercicio para Diabetes - 30 Días',
    ltpDiabetesMeals: 'Comidas para Diabetes',
    ltpADAAligned: 'Alineado con ADA',
    ltpOpenFullPlan: 'Abrir Plan Completo de 30 Días con PDF / Imprimir',
    ltpDownloadPrint: 'Descarga o imprime tu plan personalizado completo',
    ltpCompleteExercises: 'Completar todos los ejercicios',
    ltpExerciseProtocol: 'Protocolo de Ejercicio',
    ltpAgeAdjusted: 'Ajustado a la edad',
    ltpADAGuidelines: 'Guías ADA',
    ltpHTPlan: 'Plan de Manejo de la Hipertensión',
    ltpHTSub: 'Basado en guías de la AHA · Dieta DASH · Bajo en sodio · Consciente del peso',
    ltpBPProfile: 'Perfil de PA',
    ltpReading: 'Lectura',
    ltpAHATargets: 'Metas AHA',
    ltpBPTarget: 'Objetivo de PA',
    ltpSodium: 'Sodio',
    ltpPotassium: 'Potasio',
    ltpExercise: 'Ejercicio',
    ltpBMITarget: 'Objetivo IMC',
    ltpHTPlan30: 'Plan de Comidas y Ejercicio para Hipertensión - 30 Días',
    ltpDASHMeals: 'Comidas DASH',
    ltpDASHAligned: 'Alineado con DASH',
    ltpWeightAware: 'Consciente del peso',
    ltpAHAGuidelines: 'Guías AHA',
    ltpDailyMealPlan: 'Plan de Comidas Diario',
    ltpMealSummary: '{kcal} kcal · GI medio: {gi} · objetivo {target} kcal',
    ltpShuffle: 'Mezclar',
    ltpDailyTracking: 'Seguimiento Diario',
    ltpMetric: 'Métrica',
    ltpTarget: 'Objetivo',
    ltpActual: 'Real',
    ltpStatusSafe: 'Seguro',
    ltpStatusOnTrack: 'En camino',
    ltpStatusAttention: 'Requiere atención',
    ltpStatusBelow: 'Por debajo del objetivo',
    ltpStatusOver: 'Sobre el límite',
    ltpProgressTracking: 'Seguimiento del Progreso',
    ltpEntries: '{n} registros',
    ltpClearAll: 'Borrar Todo',
    ltpNoProgress: 'Aún no hay lecturas. Haz clic en "{action}" para registrar tu primera entrada.',
    ltpGlucoseTrend: 'Tendencia de Glucosa (últimos 7)',
    ltpPostShort: 'Post.',
    ltpPostprandial: 'Posprandial',
    ltpBPTrend: 'Tendencia de Presión Arterial (últimos 7)',
    ltpFasting: 'En ayunas',
    ltpWeightTrend: 'Tendencia de Peso',
    ltpDate: 'Fecha',
    ltpWeight: 'Peso',
    ltpClinicalSummary: 'Resumen Clínico',
    ltpPrintReport: 'Imprimir / Descargar Informe',
    ltpEmailReport: 'Enviar Informe por Correo',
    ltpEmailOpened: 'Cliente de correo abierto',
    ltpEmailReady: 'Tu informe de salud completo con perfil, planes y progreso está listo para enviarse.',
    ltpEmptyPrompt: 'Introduce tu perfil y valores de laboratorio arriba y luego haz clic en "{action}".',
    pmSuiteBadge: 'Suite de Salud Avanzada',
    pmFreeModules: '{n} Módulos Gratuitos',
    pmHeroSub: 'Rutas de salud estructuradas de 30 días con planes adaptativos de IA, seguimiento diario y exportación clínica para 8 afecciones.',
    pmSuiteActive: 'Suite de Cuidados Avanzados Activa',
    pmSuiteActiveSub: 'Acceso completo a todos los módulos, incluidos {n} programas gratuitos.',
    pmCrossAdvisory: 'Asesoría Inter-afecciones',
    pmConditionModules: 'Módulos de Afecciones',
    pmConditionSub: 'Selecciona afecciones para activar rutas de salud de 30 días',
    pmActive: 'Activo',
    pmPremium: 'Premium',
    pmClickDeactivate: 'Clic para desactivar ↑',
    pmClickActivate: 'Clic para activar →',
    pm30DayJourney: 'Ruta de Salud de 30 Días',
    pmCustomized: 'Personalizado',
    pmPatientProfile: 'Perfil del Paciente',
    pmLabValues: 'Valores de Laboratorio',
    pmGeneratePlan: 'Generar Plan de 30 Días',
    pmPlansGenerated: 'Planes generados y personalizados',
    pmHealthScore: 'Puntaje de Salud',
    pmCheckInStreak: 'Racha de Registros',
    pmStreakInfo: 'Actual: {c} días · Mayor: {l} días',
    pmAIAutoAdj: 'Autoajuste de IA: {type}',
    pmTabPlan30: 'Plan de 30 Días',
    pmTabCheckin: 'Registro Diario',
    pmTabAnalytics: 'Análisis y Rachas',
    pmTabGuidelines: 'Guías',
    pm30DayPlanLabel: '{name} — Plan de 30 Días',
    pmDailyCheckIn: 'Registro Diario',
    pmDayOf30: 'Día {n} de 30 · Registra tus marcadores diarios',
    pmCancel: 'Cancelar',
    pmLogToday: 'Registrar Hoy',
    pmSaveCheckIn: 'Guardar Registro',
    pmDayLabel: 'Día {n}',
    pmSymptomLog: 'Registro de Desencadenantes',
    pmSymptomLogSub: 'Registra brotes e identifica patrones',
    pmLogTrigger: 'Registrar Desencadenante',
    pmSymptom: 'Síntoma',
    pmSelectOption: 'Seleccionar...',
    pmTriggerFood: 'Posible Alimento/Causa Desencadenante',
    pmSelectCustom: 'Selecciona o escribe una personalizada...',
    pmSeverity: 'Severidad (1-10): {n}',
    pmNotes: 'Notas',
    pmNotesPlaceholder: 'Contexto adicional...',
    pmSaveTrigger: 'Guardar Desencadenante',
    pmTriggerPrefix: 'Desencadenante:',
    pmWeeklyMilestones: 'Metas Semanales',
    pmMilestoneTarget: 'Objetivo: {t} {u}',
    pmMilestoneCurrent: '(actual: {n})',
    pmMilestoneDescPlaceholder: 'Descripción de la meta',
    pmUnit: 'Unidad',
    pmAdd: 'Agregar',
    pmRecentTrends: 'Tendencias Recientes',
    pmAvg: 'Prom: {n}',
    pmCheckIns: 'Registros',
    pmDayStreak: 'Racha de Días',
    pmMilestones: 'Metas',
    pmTriggersLogged: 'Desencadenantes Registrados',
    pmGuidelinesTitle: 'Guías Médicas y Recomendaciones',
    pmWhatsIncluded: '¿Qué está incluido?',
    pmIncludeSub: 'Gestión de salud completa específica de la afección',
    pmIncPlans: 'Planes de 30 Días',
    pmIncPlansDesc: 'Rutas diarias estructuradas con comidas, ejercicios y objetivos clínicos',
    pmIncTracking: 'Seguimiento Diario',
    pmIncTrackingDesc: 'Registros, desencadenantes de síntomas y cumplimiento de medicación',
    pmIncAI: 'Adaptación IA',
    pmIncAIDesc: 'Autoajustes inteligentes basados en tus datos de seguimiento',
    pmIncExport: 'Exportación Clínica',
    pmIncExportDesc: 'Informes PDF/CSV para consultas médicas',
    pmCSVExport: 'Exportación CSV',
    pmEmail: 'Correo'
  },
  ar: {
    appName: 'HealthCalc.ai',
    mealBreakfast: 'الإفطار',
    mealLunch: 'الغداء',
    mealDinner: 'العشاء',
    mealMorningSnack: 'وجبة خفيفة صباحية',
    mealAfternoonSnack: 'وجبة خفيفة مسائية',
    mealSnack: 'وجبة خفيفة',
    tagline: 'رفيقك الصحي بالذكاء الاصطناعي',
    searchPlaceholder: 'ابحث عن حاسبات صحية...',
    home: 'الرئيسية',
    weightLoss: 'الوزن واللياقة',
    diabetes: 'السكري وارتفاع ضغط الدم',
    premium: 'رعاية متقدمة',
    heroTitle: 'خطتك الشخصية للصحة واللياقة',
    heroSubtitle: 'حاسبات مدعومة بالعلم، خطط وجبات، وتمارين مدعمة بإرشادات طبية معترف بها دولياً (ADA, DASH, USDA, ACSM).',
    heroCTA: 'ابدأ مجاناً',
    healthTools: 'الأدوات الصحية',
    healthToolsDesc: 'حاسبات ومخططات مهنية مدعمة بإرشادات طبية دولية',
    getStarted: 'ابدأ',
    enterDetails: 'أدخل بياناتك',
    enterDetailsDesc: 'املأ معلومات ملفك الشخصي واضغط حسب للحصول على خطتك الصحية المخصصة.',
    yourProfile: 'ملفك الشخصي',
    module1Title: 'فقدان الوزن، اكتساب العضلات ومخطط التمارين',
    module1Desc: 'احصل على أهداف سعرية مخصصة، توزيع المغذيات الكبيرة، خطط وجبات، وروتين تمارين بناءً على قياساتك وأهدافك.',
    module2Title: 'مجموعة السكري وارتفاع ضغط الدم',
    module2Desc: 'حاسبات تفاعلية، مخططات وجبات، تمارين مخصصة، وتفسير نتائج المختبر وفقاً لإرشادات ADA و AHA.',
    module3Title: 'الحالات الصحية المتقدمة',
    module3Desc: 'خطط متخصصة للتغذية والتمارين لمتلازمة القولون العصبي، النقرس، أمراض الكلى، مشاكل الكبد والمزيد.',
    age: 'العمر',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    height: 'الطول',
    weightLabel: 'الوزن',
    activityLevel: 'مستوى النشاط',
    goal: 'الهدف الرئيسي',
    sedentary: 'خامل (قليل أو لا تمارين)',
    light: 'نشط قليلاً (1-3 أيام/أسبوع)',
    moderate: 'نشط بشكل معتدل (3-5 أيام/أسبوع)',
    active: 'نشط (6-7 أيام/أسبوع)',
    veryActive: 'نشط جداً (تمارين يومية مكثفة)',
    loseWeight: 'فقدان الوزن',
    maintain: 'الحفاظ على الوزن',
    gainMuscle: 'اكتساب العضلات',
    calculate: 'احسب',
    dailyCalories: 'السعرات اليومية',
    macros: 'توزيع المغذيات الكبيرة',
    protein: 'البروتين',
    carbs: 'الكربوهيدرات',
    fat: 'الدهون',
    mealPlan: 'خطة وجبة واحدة',
    workoutPlan: 'روتين التمارين',
    kg: 'كجم',
    cm: 'سم',
    years: 'سنوات',
    fastingGlucose: 'السكر الترشحي',
    postPrandialGlucose: 'سكر ما بعد الوجبة (ساعتين)',
    hba1c: 'هيموجلوبين السكر',
    systolicBP: 'الضغط الانقباضي',
    diastolicBP: 'الضغط الانبساطي',
    analyzeLabs: 'تحليل نتائج المختبر',
    labResults: 'تفسير نتائج المختبر',
    unlockPremium: 'فتح المجموعة المتقدمة',
    premiumPrice: '15$/سنة',
    premiumDesc: 'احصل على خطط متخصصة للقولون العصبي، النقرس، أمراض الكلى والكبد مع برامج مخصصة.',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    medicalDisclaimer: 'إخلاء مسؤولية طبية',
    contactUs: 'اتصل بنا',
    allRights: '© 2026 HealthCalc.ai. جميع الحقوق محفوظة.',
    disclaimer: 'توفر HealthCalc.ai معلومات لأغراض تعليمية فقط. وهي ليست بديلاً عن النصيحة الطبية المهنية أو التشخيص أو العلاج. استشر طبيبك دائماً قبل بدء أي نظام غذائي أو برنامج تمارين.',
    contactName: 'الاسم الكامل',
    contactEmail: 'البريد الإلكتروني',
    contactMessage: 'رسالتك',
    contactSupportBadge: 'الدعم',
    contactRespondSubtitle: 'نرد عادةً خلال 48 ساعة عمل',
    contactGetInTouch: 'تواصل معنا',
    contactInfoEmail: 'البريد الإلكتروني',
    contactInfoWebsite: 'الموقع الإلكتروني',
    contactInfoResponseTime: 'وقت الاستجابة',
    contactResponseTimeValue: 'خلال 48 ساعة عمل',
    contactFormTitle: 'أرسل رسالة',
    contactPlaceholderMessage: 'كيف يمكننا مساعدتك؟',
    contactSentTitle: 'تم إرسال الرسالة!',
    contactSentDesc: 'شكراً لتواصلك معنا. سنرد خلال 48 ساعة عمل.',
    sendMessage: 'إرسال الرسالة',
    sponsored: 'مطلوب',
    sponsoredAd: 'إعلان ممول',
    cmUnit: 'سم',
    kgUnit: 'كجم',
    mmolUnit: 'ممول/لتر',
    mgUnit: 'ملغ/ديسيلتر',
    resultCategory: 'الفئة',
    recommendation: 'التوصية',
    locked: 'مقفل',
    unlock: 'فتح الآن',
    bmiTitle: 'حاسبة مؤشر كتلة الجسم',
    bmiSubtitle: 'احسب مؤشر كتلة جسمك فوراً بتقييم نظيف ومبني على الأدلة. اعرف أين تقف — وما الذي يجب فعله بعد ذلك.',
    bmiYourDetails: 'بياناتك',
    bmiYourBmi: 'مؤشر كتلة جسمك',
    bmiKgM2: 'كجم/م²',
    bmiUnderweight: 'نقص الوزن',
    bmiNormal: 'وزن طبيعي',
    bmiOverweight: 'زيادة الوزن',
    bmiObese: 'سمنة',
    bmiRisk: 'مستوى المخاطر الصحية',
    bmiValue: 'قيمة المؤشر',
    bmiHealthyRange: 'النطاق الصحي',
    bmiIdealWeight: 'الوزن المثالي',
    bmiCrossPromo: 'خطة صحية متاحة لشخصك',
    bmiCrossPromoDiabetes: 'مؤشر كتلة جسمك يشير إلى خطر الإصابة بالسكري — استكشف وحدة إدارة السكري.',
    bmiCrossPromoCholesterol: 'مؤشر كتلة جسمك يشير إلى خطر قلبي وعائي — استكشف وحدة الكوليسترول.',
    bmiCrossPromoGeneral: 'استكشف الرعاية المتقدمة لرحلة صحية مخصصة لمدة 30 يوماً.',
    bmiRecommendations: 'التوصيات',
    bmiRecUnder1: 'زيادة السعرات الغذائية مع الأكيدة المغذية (المكسرات، الأفوكادو، الحبوب الكاملة).',
    bmiRecUnder2: 'دمج تمارين بناء العضلات لزيادة الكتلة العضلانية تدريجياً.',
    bmiRecUnder3: 'استشارة طبيب لاستبعاد أي حالات طبية قد تسبب نقص الوزن.',
    bmiRecNormal1: 'الحفاظ على نظام غذائي متوازن غني بالفواكه والخضروات والبروتينات النحيلة.',
    bmiRecNormal2: 'البقاء نشطاً بممارسة 150 دقيقة على الأقل من التمارين المعتدلة أسبوعياً.',
    bmiRecNormal3: 'مراقبة مؤشر كتلة الجسم سنوياً للبقاء ضمن النطاق الصحي.',
    bmiRecOver1: 'تقليل الكربوهيدرات المكررة وزيادة تناول الخضروات في كل وجبة.',
    bmiRecOver2: 'السعي لممارسة 200-300 دقيقة من التمارين المعتدلة أسبوعياً.',
    bmiRecOver3: 'التخطيط لوجبات منظمة لإدارة الحصص والسعرات الغذائية.',
    bmiRecObese1: 'استشارة طبيب أو أخصائي تغذية للحصول على خطة إدارة وزن مخصصة.',
    bmiRecObese2: 'البدء بتمارين منخفضة التأثير (المشي، السباحة) وزيادة التدريجية.',
    bmiRecObese3: 'مراقبة المؤشرات الصحية ذات الصلة: ضغط الدم، سكر الدم، والكوليسترول.',
    bmiFormulaTitle: 'صيغة وحساب مؤشر كتلة الجسم',
    bmiFormulaExample: 'مثال: 70 كجم ÷ (1.70 م)² = 70 ÷ 2.89 = 24.2 (طبيعي)',
    bmiFormulaNote: 'مؤشر كتلة الجسم أداة فحص وليس مقياساً تشخيصياً. لا يأخذ في الاعتبار كتلة العضلات أو كثافة العظام أو تكوين الجسم.',
    bmiTableTitle: 'جدول فئات مؤشر كتلة الجسم',
    bmiRiskTitle: 'المخاطر الصحية حسب فئة مؤشر كتلة الجسم',
    bmiEmptyTitle: 'أدخل بياناتك لحساب المؤشر',
    bmiEmptyDesc: 'املأ النموذج على اليسار واضغط احسب لتقييمك الشخصي.',
    bmiCalculator: 'حاسبة مؤشر كتلة الجسم',
    calcNav: 'الحاسبات',
    calcTitle: 'الحاسبات الصحية',
    calcSubtitle: 'احسب مؤشر كتلة جسمك، معدل الأيض الأساسي، السعرات اليومية والوزن المثالي — ثم اربط نتائجك برحلة صحية مخصصة لمدة 30 يوماً.',
    calcSharedProfile: 'ملفك المشترك',
    calcSharedHint: 'مدخلاتك مشتركة بين جميع الحاسبات. حدّث مرة واحدة — النتائج تتحدث في كل مكان.',
    calcSedentary: 'خامل',
    calcLight: 'خفيف',
    calcModerate: 'معتدل',
    calcActive: 'نشط',
    calcVeryActive: 'نشط جداً',
    calcBmiTitle: 'حاسبة مؤشر كتلة الجسم',
    calcBmiSubtitle: 'مؤشر كتلة الجسم — اعرف فئة وزنك',
    calcBmiValue: 'قيمة المؤشر',
    calcBmiHealthy: 'النطاق الصحي (18.5–24.9)',
    calcBmiUnder: 'نقص الوزن',
    calcBmiNormal: 'وزن طبيعي',
    calcBmiOver: 'زيادة الوزن',
    calcBmiObese: 'سمنة',
    calcBmrTitle: 'حاسبة معدل الأيض',
    calcBmrSubtitle: 'معدل الأيض الأساسي — السعرات التي يحرقها الجسم أثناء الراحة',
    calcBmrLabel: 'معدل الأيض (Mifflin-St Jeor)',
    calcTdee: 'إجمالي اليومي',
    calcGoalLose: 'فقدان الوزن',
    calcGoalMaintain: 'الحفاظ',
    calcGoalGain: 'اكتساب العضلات',
    calcCalTitle: 'حاسبة السعرات',
    calcCalSubtitle: 'أهداف السعرات والمغذيات الكبيرة بناءً على أهدافك',
    calcDailyTarget: 'هدفك اليومي من السعرات',
    calcIdealTitle: 'حاسبة الوزن المثالي',
    calcIdealSubtitle: 'نطاق الوزن الصحي لطولك (مؤشر كتلة الجسم 18.5–24.9)',
    calcIdealMin: 'الحد الأدنى',
    calcIdealMid: 'النقطة المتوسطة المثالية',
    calcIdealMax: 'الحد الأقصى',
    calcIdealBelow: 'أقل من النطاق المثالي',
    calcIdealBelowDesc: 'فوق وزنك الحالي للوصول إلى المتوسط المثالي.',
    calcIdealAbove: 'أعلى من النطاق المثالي',
    calcIdealAboveDesc: 'تحت المتوسط المثالي لطولك.',
    calcIdealPerfect: 'ضمن النطاق المثالي',
    calcIdealPerfectDesc: 'وزنك ضمن نطاق مؤشر كتلة الجسم الصحي. واصل!',
    calcBridgeTitle: 'استخدم في الرعاية المتقدمة →',
    calcBridgeDesc: 'احفظ مؤشر كتلة جسمك لمعايرة تلقائية لرحلتك الصحية لمدة 30 يوماً.',
    calcBridgeCalTitle: 'خصص خطة 30 يومي →',
    calcBridgeCalDesc: 'استهدف سعراتك لمعايرة الوجبات والتمارين.',
    calcBridgeAdvanced: 'ابدأ رحلتك الصحية →',
    calcBridgeAdvancedDesc: 'اربط نتائجك برحلة صحية مخصصة لمدة 30 يوماً.',
    calcBridgeWeight: 'احصل على خطة مخصصة →',
    calcBridgeWeightDesc: 'استخدم وزنك المثالي كإنجاز في رحلتك الصحية.',
    calcSaved: '✓ تم الحفظ في الملف',
    calcSavedDesc: 'بياناتك جاهزة للرعاية المتقدمة.',
    calcSummary: 'ملخص نتائجك',
    calcGoAdvanced: 'الذهاب للرعاية المتقدمة →',
    calcHowTitle: 'كيف يعمل',
    calcHow1: 'املأ ملفك المشترك أعلاه — العمر، الجنس، الطول، الوزن ومستوى النشاط.',
    calcHow2: 'افتح أي حاسبة واضغط احسب لرؤية نتائجك فوراً.',
    calcHow3: 'احفظ نتائجك واربطها مباشرة برحلتك الصحية لمدة 30 يوماً.',
    calcEmptyTitle: 'شغّل حاسبة لرؤية النتائج',
    calcEmptyDesc: 'نتائجك والجسر إلى الرعاية المتقدمة سيظهران هنا.',
    calcEduFormula: 'الصيغ والعلم',
    calcEduFormulaNote: 'يستخدم معدل الأيض معادلة Mifflin-St Jeor (تعتبر الأكثر دقة). يضرب المعدل اليومي الكلي المعدل في عامل النشاط. مؤشر كتلة الجسم أداة فحص — لا يأخذ في الاعتبار كتلة العضلات.',
    calcEduBmiTable: 'جدول فئات مؤشر كتلة الجسم',
    fcNav: 'حاسبة اللياقة والصحة',
    fcTitle: 'حاسبة اللياقة والصحة',
    fcSubtitle: 'احسب مؤشر كتلة جسمك، معدل الأيض الأساسي، السعرات اليومية والوزن المثالي — ثم اربط نتائجك برحلة صحية مخصصة لمدة 30 يوماً.',
    fcProfile: 'ملفك الصحي',
    fcProfileHint: 'مدخلاتك مشتركة بين جميع الحاسبات. حدّث مرة واحدة — النتائج تتحدث في كل مكان.',
    fcSedentary: 'خامل',
    fcLight: 'خفيف',
    fcModerate: 'معتدل',
    fcActive: 'نشط',
    fcVeryActive: 'نشط جداً',
    fcTabBmi: 'مؤشر الكتلة',
    fcTabBmr: 'المعدل الأيضي',
    fcTabCal: 'السعرات',
    fcTabIdeal: 'الوزن المثالي',
    fcBmiYourBmi: 'مؤشر كتلة جسمك',
    fcBmiRisk: 'مستوى المخاطر الصحية',
    fcBmiValue: 'قيمة المؤشر',
    fcBmiHealthy: 'النطاق الصحي (18.5–24.9)',
    fcBmiIdeal: 'الوزن المثالي',
    fcBmiUnder: 'نقص الوزن',
    fcBmiNormal: 'وزن طبيعي',
    fcBmiOver: 'زيادة الوزن',
    fcBmiObese: 'سمنة',
    fcBmrLabel: 'معدل الأيض الأساسي',
    fcBmrDesc: 'السعرات التي يحرقها الجسم أثناء الراحة التامة — الأساس لاحتياجاتك الطاقية.',
    fcBmrTdee: 'إجمالي الإنفاق اليومي للطاقة',
    fcBmrTdeeDesc: 'المعدل الأيضي × عامل النشاط — السعرات التي تحرقها فعلياً كل يوم.',
    fcCalDaily: 'هدفك اليومي من السعرات',
    fcCalLose: 'فقدان الوزن',
    fcCalMaintain: 'الحفاظ',
    fcCalGain: 'اكتساب العضلات',
    fcCalMacros: 'المغذيات الكبيرة الموصى بها',
    fcIdealMin: 'الحد الأدنى',
    fcIdealMid: 'النقطة المتوسطة المثالية',
    fcIdealMax: 'الحد الأقصى',
    fcIdealBelow: 'أقل من النطاق المثالي',
    fcIdealBelowDesc: 'فوق وزنك الحالي للوصول إلى المتوسط المثالي.',
    fcIdealAbove: 'أعلى من النطاق المثالي',
    fcIdealAboveDesc: 'تحت المتوسط المثالي لطولك.',
    fcIdealPerfect: 'ضمن النطاق المثالي',
    fcIdealPerfectDesc: 'وزنك ضمن نطاق مؤشر كتلة الجسم الصحي. واصل!',
    fcBridgeBmi: 'استخدم في الرعاية المتقدمة →',
    fcBridgeBmiDesc: 'احفظ مؤشر كتلة جسمك لمعايرة تلقائية لرحلتك الصحية.',
    fcBridgeBmr: 'خصص خطة 30 يومي →',
    fcBridgeBmrDesc: 'استخدم معدل الأيضي لمعايرة خطة التغذية الخاصة بك.',
    fcBridgeCal: 'ابدأ رحلتك الصحية →',
    fcBridgeCalDesc: 'اربط أهداف السعرات برحلة مخصصة لمدة 30 يوماً.',
    fcBridgeIdeal: 'احصل على خطة مخصصة →',
    fcBridgeIdealDesc: 'استخدم وزنك المثالي كإنجاز في رحلتك الصحية.',
    fcSaved: '✓ تم الحفظ في الملف',
    fcSavedDesc: 'بياناتك جاهزة للرعاية المتقدمة.',
    fcViewFormula: 'عرض التفاصيل الطبية — الصيغ والعلم',
    fcViewBmiTable: 'عرض التفاصيل الطبية — فئات مؤشر كتلة الجسم',
    fcViewRisks: 'عرض التفاصيل الطبية — المخاطر الصحية',
    fcFormulaNote: 'يستخدم معدل الأيض معادلة Mifflin-St Jeor (الأكثر دقة). المعدل اليومي الكلي = المعدل الأيضي × عامل النشاط. مؤشر كتلة الجسم أداة فحص — لا يأخذ في الاعتبار كتلة العضلات.',
    fcCtaLabel: 'بياناتك جاهزة',
    fcCtaHeadline: 'افتح رحلة الوزن واللياقة المخصصة لمدة 30 يوماً الآن',
    fcCtaSub: 'تم حفظ مؤشر كتلة جسمك ومعدل الأيضي وأهداف السعرات. لنبني خطة الوزن واللياقة المخصصة.',
    fcCtaButton: 'انتقل إلى خطة الوزن واللياقة →',
    fcCtaLaunch: 'احفظ وانتقل إلى خطة الوزن واللياقة',
    fcCtaLaunchSub: 'نقرة واحدة — بياناتك تُنقل فوراً، صفر إعادة إدخال',
    fcRedirecting: 'جارٍ التحويل إلى خطة الوزن واللياقة في',
    // Smartwatch Sync
    swNav: 'الساعة الذكية',
    swTitle: 'مزامنة الساعة الذكية',
    swSubtitle: 'اربط ساعتك الذكية لمزامنة بياناتك الصحية تلقائياً',
    swHeroDesc: 'زامن الخطوات ومعدل ضربات القلب والنوم والمزيد من منصتك الصحية المفضلة.',
    swDashboard: 'لوحة التحكم',
    swGuide: 'الدليل',
    swGuideLabel: 'دليل الإعداد',
    swSettings: 'الإعدادات',
    swConnected: 'متصل',
    swNotConnected: 'غير متصل',
    swLastSync: 'آخر مزامنة',
    swNeverSynced: 'لم تتم المزامنة أبداً',
    swSyncing: 'جارٍ المزامنة...',
    swSyncNow: 'مزامنة الآن',
    swDisconnect: 'قطع الاتصال',
    swConnectWatch: 'ربط الساعة',
    swHealthPlatform: 'منصة الصحة',
    swAppleHealth: 'Apple Health',
    swGoogleHealthConnect: 'Google Health Connect',
    swWebBrowser: 'المتصفح',
    swActive: 'نشط',
    swInactive: 'غير نشط',
    swHeartRate: 'معدل ضربات القلب',
    swSteps: 'الخطوات',
    swActiveCalories: 'السعرات النشطة',
    swSleep: 'النوم',
    swWeight: 'الوزن',
    swSpO2: 'أكسجين الدم (SpO2)',
    swStress: 'التوتر',
    swFloors: 'الطوابق',
    swBpm: 'ن/د',
    swKcal: 'سعرة',
    swHrs: 'ساعة',
    swResting: 'أثناء الراحة',
    swDeep: 'عميق',
    swMinCardio: 'دقيقة كارديو',
    swStepsUnit: 'خطوة',
    swFloorsUnit: 'طابق',
    swAiHealthTips: 'نصائح صحية بالذكاء الاصطناعي',
    swDynamicPlan: 'خطة ديناميكية',
    swCalorieAdj: 'تعديل السعرات',
    swKcalPerDay: 'سعرة/يوم',
    swActivityGoal: 'هدف النشاط',
    swStepsPerDay: 'خطوة/يوم',
    swHydration: 'الترطيب',
    swLitersPerDay: 'لتر/يوم',
    swRestDay: 'يوم الراحة',
    swRecommended: 'موصى به',
    swActiveDay: 'يوم نشط',
    swSyncHistory: 'سجل المزامنة',
    swNoDataYet: 'لا توجد بيانات بعد',
    swNoDataDesc: 'اربط ساعتك وزامنها لرؤية مؤشراتك الصحية هنا.',
    swSetupGuide: 'دليل الإعداد',
    swSetupGuideDesc: 'اتبع هذه الخطوات البسيطة لربط ساعتك الذكية.',
    swPrev: 'السابق',
    swNext: 'التالي',
    swSupportedWatches: 'الساعات المدعومة',
    swConnectionSettings: 'إعدادات الاتصال',
    swAutoSync: 'المزامنة التلقائية',
    swAutoSyncDesc: 'مزامنة بياناتك الصحية تلقائياً عند فتح التطبيق.',
    swSyncNotifications: 'إشعارات المزامنة',
    swSyncNotifDesc: 'احصل على إشعار عند اكتمال عملية مزامنة جديدة.',
    swDataPermissions: 'أذونات البيانات',
    swGranted: 'ممنوح',
    swAdvanced: 'متقدم',
    swExportData: 'تصدير البيانات',
    swClearHistory: 'مسح السجل',
    swDisconnectRemove: 'سيؤدي قطع الاتصال إلى حذف جميع البيانات المتزامنة من هذا الجهاز.',
    swInstallTitle: 'تثبيت التطبيق',
    swInstallIos: 'افتح Apple Health واسمح لـ HealthCalc.ai بقراءة بياناتك الصحية.',
    swInstallAndroid: 'افتح Google Health Connect واسمح لـ HealthCalc.ai بالوصول إلى بياناتك الصحية.',
    swInstallWeb: 'استخدم لوحة التحكم على الويب للمزامنة عبر متصفحك.',
    swConnectIosTitle: 'ربط Apple Health',
    swConnectAndroidTitle: 'ربط Google Health Connect',
    swConnectWebTitle: 'ربط المتصفح',
    swPairWatch: 'اقتران ساعتك',
    swPairIosTitle: 'الاقتران مع Apple Watch',
    swPairAndroidTitle: 'الاقتران مع ساعة Wear OS',
    swPairWebTitle: 'الاقتران عبر المتصفح',
    swTrackProgress: 'تتبع التقدم',
    swGuideStep1: 'حمّل تطبيق HealthCalc.ai على هاتفك.',
    swGuideStep2: 'افتح الإعدادات واضغط ربط الساعة.',
    swGuideStep3: 'امنح الإذن لمنصتك الصحية.',
    swGuideStep4: 'ابدأ مزامنة نشاطك اليومي تلقائياً.',
    swGuideStep5: 'شاهد التحليلات والنصائح الذكية في لوحة التحكم.',
    syncGuideInstallTitleIos: 'التثبيت على آيفون (Safari)',
    syncGuideInstallTitleAndroid: 'التثبيت على أندرويد (Chrome)',
    syncGuideInstallTitleWeb: 'تثبيت تطبيق الويب',
    syncGuideConnectTitleIos: 'ربط Apple Health',
    syncGuideConnectTitleAndroid: 'ربط Google Health Connect',
    syncGuideConnectTitleWeb: 'ربط تطبيق الصحة',
    syncGuidePairTitle: 'اقتران ساعتك الذكية',
    syncGuideTrackTitle: 'زامن وتتبع تقدمك',
    syncGuideInstallIos1: 'افتح HealthCalc.ai في Safari.',
    syncGuideInstallIos2: 'اضغط زر المشاركة (مربع بسهم) في الأسفل.',
    syncGuideInstallIos3: 'مرر للأسفل واضغط "إضافة إلى الشاشة الرئيسية".',
    syncGuideInstallIos4: 'اضغط "إضافة" في الزاوية العلوية اليمنى.',
    syncGuideInstallIos5: 'ستظهر أيقونة تطبيق HealthCalc.ai الآن على شاشتك الرئيسية!',
    syncGuideInstallAndroid1: 'افتح HealthCalc.ai في Chrome.',
    syncGuideInstallAndroid2: 'اضغط قائمة النقاط الثلاث (⋮) في أعلى اليمين.',
    syncGuideInstallAndroid3: 'اضغط "إضافة إلى الشاشة الرئيسية" أو "تثبيت التطبيق".',
    syncGuideInstallAndroid4: 'اضغط "إضافة" أو "تثبيت" للتأكيد.',
    syncGuideInstallAndroid5: 'ستظهر أيقونة تطبيق HealthCalc.ai الآن على شاشتك الرئيسية!',
    syncGuideInstallWeb1: 'افتح HealthCalc.ai في متصفحك.',
    syncGuideInstallWeb2: 'اضغط أيقونة التثبيت في شريط العنوان.',
    syncGuideInstallWeb3: 'اضغط "تثبيت" عند ظهور المطالبة.',
    syncGuideInstallWeb4: 'تم تثبيت التطبيق بنجاح!',
    syncGuideConnectIos1: 'افتح إعدادات الآيفون.',
    syncGuideConnectIos2: 'اضغط "الخصوصية والأمان" ← "الصحة".',
    syncGuideConnectIos3: 'ابحث عن "HealthCalc.ai" واضغط عليه.',
    syncGuideConnectIos4: 'فعّل جميع فئات البيانات الصحية التي تريد مزامنتها.',
    syncGuideConnectIos5: 'عد إلى HealthCalc.ai واضغط "مزامنة الآن".',
    syncGuideConnectAndroid1: 'افتح تطبيق Google Health Connect (ثبّته من متجر Play إذا لزم الأمر).',
    syncGuideConnectAndroid2: 'اضغط "الأذونات" ← "التطبيقات".',
    syncGuideConnectAndroid3: 'ابحث عن "HealthCalc.ai" وامنحه إذن القراءة.',
    syncGuideConnectAndroid4: 'فعّل: معدل ضربات القلب، الخطوات، النوم، الوزن، السعرات.',
    syncGuideConnectAndroid5: 'عد إلى HealthCalc.ai واضغط "مزامنة الآن".',
    syncGuideConnectWeb1: 'افتح تطبيق الصحة على هاتفك.',
    syncGuideConnectWeb2: 'انتقل إلى التطبيقات المتصلة أو إعدادات المشاركة.',
    syncGuideConnectWeb3: 'ابحث عن "HealthCalc.ai" وامنحه الإذن.',
    syncGuideConnectWeb4: 'امنح الأذونات لـ: معدل ضربات القلب، الخطوات، النوم، السعرات.',
    syncGuideConnectWeb5: 'عد إلى HealthCalc.ai واضغط "مزامنة الآن".',
    syncGuidePairIos1: 'تأكد من اقتران ساعة Apple Watch عبر تطبيق Watch.',
    syncGuidePairIos2: 'افتح تطبيق Watch على آيفونك.',
    syncGuidePairIos3: 'تحقق من تفعيل "الصحة" ضمن "الخصوصية".',
    syncGuidePairIos4: 'تنتقل بيانات ساعتك تلقائياً إلى Apple Health.',
    syncGuidePairIos5: 'يقرأ HealthCalc.ai هذه البيانات عبر مزامنة Apple Health.',
    syncGuidePairAndroid1: 'افتح تطبيق المرافق لساعتك (Samsung Health أو Fitbit أو Garmin وغيرها).',
    syncGuidePairAndroid2: 'انتقل إلى الإعدادات ← التطبيقات المتصلة أو مشاركة البيانات.',
    syncGuidePairAndroid3: 'فعّل مزامنة "Google Health Connect".',
    syncGuidePairAndroid4: 'تأكد من تفعيل معدل ضربات القلب والخطوات والنوم والسعرات.',
    syncGuidePairAndroid5: 'يقرأ HealthCalc.ai هذه البيانات عبر Google Health Connect.',
    syncGuidePairWeb1: 'افتح تطبيق المرافق لساعتك الذكية.',
    syncGuidePairWeb2: 'تحقق من اتصال الساعة بهاتفك.',
    syncGuidePairWeb3: 'فعّل مشاركة البيانات مع تطبيق الصحة على هاتفك.',
    syncGuidePairWeb4: 'سيقوم HealthCalc.ai بمزامنة البيانات تلقائياً.',
    syncGuideTrack1: 'عد إلى لوحة تحكم مزامنة الساعة الذكية.',
    syncGuideTrack2: 'اضغط "مزامنة الآن" لجلب أحدث بياناتك الصحية.',
    syncGuideTrack3: 'شاهد مؤشراتك اليومية: معدل ضربات القلب، الخطوات، النوم، والسعرات.',
    syncGuideTrack4: 'يستخدم محرك الذكاء الاصطناعي هذه البيانات لتعديل خطتك لمدة 30 يوماً.',
    syncGuideTrack5: 'يتم تحديث عداد السلسلة وتقدم الخطة تلقائياً.',
    swSyncCompleteToast: 'تمت مزامنة البيانات الصحية بنجاح!',
    swExportedToast: 'تم تصدير بياناتك الصحية كملف CSV.',
    swNothingToExport: 'لا توجد بيانات متزامنة متاحة للتصدير بعد.',
    swHistoryClearedToast: 'تم مسح سجل المزامنة.',
    swDisconnectedToast: 'تم قطع اتصال الساعة وحذف جميع البيانات المتزامنة من هذا الجهاز.',
    swStressLow: 'منخفض',
    swStressModerate: 'متوسط',
    swStressHigh: 'مرتفع',
    swKm: 'كم',
    // Install Banner
    installTitle: 'ثبّت HealthCalc.ai',
    installIosHint: 'اضغط مشاركة، ثم إضافة إلى الشاشة الرئيسية',
    installHint: 'أضف HealthCalc.ai إلى شاشتك الرئيسية لتجربة أسرع',
    installBtn: 'تثبيت التطبيق',
    installNotNow: 'ليس الآن',
    // Dashboard Widget
    widgetTitle: 'بيانات الساعة',
    widgetLastSync: 'آخر مزامنة',
    widgetNever: 'أبداً',
    widgetSyncing: 'جارٍ المزامنة...',
    widgetSync: 'مزامنة',
    widgetViewAll: 'عرض الكل',
    widgetHeart: 'نبض القلب',
    widgetCalories: 'السعرات',
    widgetSleepLabel: 'النوم',
    widgetNoData: 'لا توجد بيانات من الساعة بعد',
    widgetConnectWatch: 'اربط ساعتك لبدء التتبع',
    // Dashboard Page
    dashWelcome: 'مرحباً بعودتك',
    dashPremium: 'مميز',
    dashFreePlan: 'الخطة المجانية',
    dashRenews: 'التجديد',
    dashHealthHistory: 'السجل الصحي',
    dashProfileSettings: 'إعدادات الملف الشخصي',
    dashTotalRecords: 'إجمالي السجلات',
    dashModulesUsed: 'الوحدات المستخدمة',
    dashMemberSince: 'عضو منذ',
    dashNA: 'غير متوفر',
    dashAll: 'الكل',
    dashLoading: 'جارٍ التحميل...',
    dashNoRecords: 'لا توجد سجلات',
    dashNoRecordsDesc: 'ستظهر نتائجك المحفوظة هنا عندما تبدأ باستخدام حاسباتنا.',
    dashTryCalc: 'جرّب حاسبة',
    dashDate: 'التاريخ',
    dashModule: 'الوحدة',
    dashKeyData: 'البيانات الرئيسية',
    dashNotes: 'ملاحظات',
    dashActions: 'الإجراءات',
    dashDelete: 'حذف',
    dashPrev: 'السابق',
    dashPageOf: 'من',
    dashNext: 'التالي',
    dashProfileInfo: 'معلومات الملف الشخصي',
    dashName: 'الاسم الكامل',
    dashEmail: 'البريد الإلكتروني',
    dashEmailCantChange: 'لا يمكن تغيير البريد الإلكتروني',
    dashSubscription: 'الاشتراك',
    dashUpgrade: 'الترقية إلى المميز',
    dashSaveChanges: 'حفظ التغييرات',
    dashChangePassword: 'تغيير كلمة المرور',
    dashCurrentPassword: 'كلمة المرور الحالية',
    dashNewPassword: 'كلمة المرور الجديدة',
    dashMinChars: '8 أحرف على الأقل',
    dashConfirmPassword: 'تأكيد كلمة المرور',
    dashUpdatePassword: 'تحديث كلمة المرور',
    dashProfileUpdated: 'تم تحديث الملف الشخصي بنجاح!',
    dashPasswordsNoMatch: 'كلمتا المرور غير متطابقتين',
    dashPasswordMin: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
    dashPasswordChanged: 'تم تغيير كلمة المرور بنجاح!',
    dashDeleteConfirm: 'هل أنت متأكد من حذف هذا السجل؟ لا يمكن التراجع عن هذا الإجراء.',
    // Auth Pages
    authWelcomeBack: 'مرحباً بعودتك',
    authSignInDesc: 'سجّل الدخول للوصول إلى خططك الصحية المخصصة',
    authEmailAddress: 'البريد الإلكتروني',
    authPassword: 'كلمة المرور',
    authSigningIn: 'جارٍ تسجيل الدخول...',
    authNoAccount: 'ليس لديك حساب؟',
    authCreateOne: 'أنشئ حساباً',
    authCreateAccount: 'إنشاء حساب',
    authRegisterDesc: 'انضم إلى HealthCalc.ai وابدأ رحلتك الصحية اليوم',
    authFullName: 'الاسم الكامل',
    authConfirmPassword: 'تأكيد كلمة المرور',
    authRepeatPassword: 'أعد كتابة كلمة المرور',
    authCreatingAccount: 'جارٍ إنشاء الحساب...',
    authAlreadyHave: 'لديك حساب بالفعل؟',
    authSignIn: 'تسجيل الدخول',
    authPasswordsMatch: 'كلمتا المرور متطابقتان!',
    authPasswordMin6: '6 أحرف على الأقل',
    authRegisterFailed: 'فشل التسجيل. يرجى المحاولة مرة أخرى.',
    authLoginFailed: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
    // Header
    headerDashboard: 'لوحة التحكم',
    headerSignOut: 'تسجيل الخروج',
    headerSignIn: 'تسجيل الدخول',
    headerSignUp: 'إنشاء حساب',
    headerNoResults: 'لا توجد نتائج',
    // Footer
    footerTagline: 'رفيقك الصحي بالذكاء الاصطناعي',
    footerQuickLinks: 'روابط سريعة',
    footerLegal: 'قانوني',
    footerHealthGuides: 'أدلة صحية',
    // Home Page
    homeAIPill: 'مدعوم بالذكاء الاصطناعي',
    homeHowItWorks: 'كيف يعمل',
    homeHowItWorksDesc: 'احصل على خطتك الصحية المخصصة في ثلاث خطوات بسيطة',
    homeStep: 'الخطوة',
    homeEnterProfile: 'أدخل ملفك الشخصي',
    homeEnterProfileDesc: 'أخبرنا عمرك وطولك ووزنك ومستوى نشاطك وأهدافك.',
    homeGetPlan: 'احصل على خطتك',
    homeGetPlanDesc: 'استلم أهداف السعرات وخطط الوجبات والتمارين المخصصة فوراً.',
    homeTrackAdapt: 'تابع وتكيّف',
    homeTrackAdaptDesc: 'زامن ساعتك ودع الذكاء الاصطناعي يكيّف خطتك مع تقدمك.',
    homeSpecializedPlans: 'خطط متخصصة',
    homeSpecializedPlansDesc: 'برامج مصممة لفقدان الوزن والسكري وضغط الدم والمزيد.',
    homeScienceBased: 'مبني على العلم',
    homeScienceBasedDesc: 'وفق الإرشادات الطبية الدولية ADA و DASH و USDA و ACSM.',
    homeMultiLang: 'متعدد اللغات',
    homeMultiLangDesc: 'متوفر بالإنجليزية والفرنسية والإسبانية والعربية.',
    homePrivacyFirst: 'الخصوصية أولاً',
    homePrivacyFirstDesc: 'بياناتك الصحية مشفرة ولا تُشارك أبداً دون موافقتك.',
    homeMobileFriendly: 'متوافق مع الجوال',
    homeMobileFriendlyDesc: 'يعمل بسلاسة على أي جهاز وفي أي مكان.',
    homeInstantResults: 'نتائج فورية',
    homeInstantResultsDesc: 'شاهد مؤشراتك الصحية محسوبة في الوقت الفعلي.',
    homeLabInterpreter: 'مفسّر التحاليل',
    homeLabInterpreterDesc: 'افهم نتائج تحاليل دمك بتحليل مدعوم بالذكاء الاصطناعي.',
    homeWhyTitle: 'لماذا تختار HealthCalc.ai؟',
    homeWhySubtitle: 'كل ما تحتاجه للسيطرة على صحتك في مكان واحد',
    homeGuidelinesTitle: 'بناءً على إرشادات دولية',
    homeGuidelinesSubtitle: 'تتوافق توصياتنا مع المعايير الطبية المعترف بها عالمياً',
    // Medical Disclaimer
    mdDismiss: 'إغلاق',
    // Breadcrumbs
    bcHome: 'الرئيسية',
    bcLanding: 'أدلة الصحة',
    bcLandingWeightLossHypertension: 'فقدان الوزن مع ارتفاع ضغط الدم',
    bcLandingDiabetesMealPlan40f: 'خطة وجبات السكري بعد سن الأربعين',
    bcLandingMuscleBuilding80kg: 'خطة بناء العضلات (80 كجم)',
    bcLandingPcosWeightLoss: 'فقدان الوزن مع تكيس المبايض',
    bcLandingKetoDiabetes: 'تغذية الكيتو للسكري من النوع الثاني',
    bcLandingSeniorFitness: 'خطة لياقة كبار السن',
    bcLandingPostPregnancyWeightLoss: 'فقدان الوزن بعد الحمل',
    bcLandingAthleticPerformance: 'تغذية الأداء الرياضي',
    // Common
    commonComplete: 'إكمال',
    commonDailyProgress: 'التقدم اليومي',
    commonDay: 'يوم',
    commonDays: 'أيام',
    commonBest: 'الأفضل',
    commonToday: 'اليوم',
    commonDone: 'منجز',
    commonPending: 'قيد الانتظار',
    commonJourney: 'رحلة',
    commonCompleted: 'مكتمل',
    commonSmartSwap: 'بديل ذكي',
    commonStreak: 'سلسلة',
    commonPrint: 'طباعة',
    commonEmail: 'البريد',
    commonCancel: 'إلغاء',
    commonSave: 'حفظ',
    commonDelete: 'حذف',
    commonLoading: 'جارٍ التحميل...',
    commonExercises: 'التمارين',
    commonTotalSets: 'إجمالي المجموعات',
    commonRestDay: 'يوم الراحة',
    commonExInfo: 'معلومات التمرين',
    mdTitle: 'إخلاء المسؤولية الطبية',
    homeWeightLossDesc: 'عجز سعرات حرارية وتتبع المغذيات الكبرى',
    homeDiabetesDesc: 'مؤشر جلايسيمي منخفض ومراقبة السكر',
    homeHypertension: 'ارتفاع ضغط الدم',
    homeHypertensionDesc: 'نظام DASH والتحكم بالصوديوم',
    homeCholesterol: 'الكوليسترول',
    homeCholesterolDesc: 'وجبات صحية غنية بالأوميغا 3',
    homeLiver: 'صحة الكبد',
    homeLiverDesc: 'تغذية داعمة لتنقية الجسم',
    homeKidney: 'أمراض الكلى',
    homeKidneyDesc: 'خطط منخفضة الصوديوم والبوتاسيوم',
    homeGout: 'النقرس',
    homeGoutDesc: 'مضاد للالتهاب منخفض البروتينات',
    homeIBS: 'متلازمة القولون العصبي',
    homeIBSDesc: 'خطط وجبات منخفضة FODMAP',
    homeThyroid: 'صحة الغدة الدرقية',
    homeThyroidDesc: 'تغذية مبنية على TSH ومتابعة',
    homeSmartwatchDesc: 'تكامل بيانات الصحة في الوقت الفعلي',
    premiumRequired: 'الاشتراك المميز مطلوب',
    loading: 'جارٍ التحميل...',
    premiumUnlockDescription: 'افتح مجموعة الصحة المتقدمة مع الوصول الكامل لجميع الوحدات.',
    upgradeToPremium: 'ترقية — 15$/سنة',
    loginRequired: 'تسجيل الدخول مطلوب',
    loginToSubscribe: 'يرجى إنشاء حساب أو تسجيل الدخول للاشتراك.',
    ok: 'موافق',
    notFoundTitle: 'الصفحة غير موجودة',
    notFoundDesc: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نعاود المسار الصحيح.',
    backToHome: 'العودة إلى الصفحة الرئيسية',
    saveProgress: 'حفظ التقدم',
    saved: 'تم الحفظ!',
    saving: 'جاري الحفظ...',
    loginToSave: 'سجل الدخول للحفظ',
    failedToSave: 'فشل الحفظ',
    plan: 'خطة',
    dayLabel: 'يوم',
    streak: 'سلسلة',
    days: 'أيام',
    best: 'أفضل',
    today: 'اليوم',
    done: 'تم',
    pending: 'قيد الانتظار',
    journey: 'الرحلة',
    allComplete: 'اكتمل كل شيء!',
    dailyProgress: 'التقدم اليومي',
    completed: 'مكتمل',
    proteinLabel: 'بروتين',
    carbsLabel: 'كربوهيدرات',
    fatLabel: 'دهون',
    smartSwap: 'بديل ذكي',
    mealPlanTitle: 'خطتك الصحية المخصصة',
    mealPlanSubtitle: 'HealthCalc.ai — تغذية مبنية على العلم',
    dailyCaloricTarget: 'الهدف اليومي للسعرات',
    waterGoal: 'هدف الشرب',
    mealsDone: 'الوجبات المكتملة',
    downloadPdf: 'تحميل PDF',
    emailPlan: 'إرسال الخطة بالبريد',
    progressTracker: 'تتبع التقدم',
    ofMeals: 'وجبات',
    water: 'ماء',
    eaten: 'أكل',
    mealsCompleted: 'وجبات مكتملة',
    close: 'إغلاق',
    altOptions: 'خيارات بديلة',
    kcal: 'كيلو كالوري',
    dashOfflineTitle: 'وضع عدم الاتصال',
    dashOfflineDesc: 'الخادم غير متاح. يتم تخزين السجل الصحي محلياً على هذا الجهاز.',
    backendUnavailable: 'الخادم غير متاح حالياً. جميع الآلات الحاسبة تعمل محلياً بدون اتصال.',
    chooseCuisine: 'اختر مطبخك',
    // Food library
    foodLibTitle: 'مكتبة السعرات الحرارية',
    foodLibSubtitle: '60+ صنف أكل من مطابخ عالمية بسعرات دقيقة من USDA',
    foodLibSearchBadge: 'ابحث عن أي أكل + فلتر بالمطبخ + رتب بالبروتين',
    foodLibSearchLabel: 'ابحث',
    foodLibSearchPlaceholder: 'فول، كشري، كبسة، سوشي...',
    foodLibCuisineLabel: 'المطبخ',
    foodLibAllCuisines: 'كل المطابخ',
    foodLibSortLabel: 'ترتيب',
    foodLibSortCalories: 'الأقل سعرات',
    foodLibSortHighProtein: 'الأعلى بروتين',
    foodLibSortName: 'أبجدي',
    foodLibCaloriesFilter: 'سعرات:',
    foodLibCalLow: 'قليل <150',
    foodLibCalMid: 'متوسط 150-250',
    foodLibCalHigh: 'عالي >250',
    foodLibCalAll: 'الكل',
    foodLibResults: 'نتيجة',
    foodLibAll: 'الكل',
    foodLibColItem: 'الصنف',
    foodLibColCuisine: 'المطبخ',
    foodLibColPortion: 'الكمية',
    foodLibColCalories: 'سعرات',
    foodLibColProtein: 'بروتين',
    foodLibColCarbs: 'كارب',
    foodLibColFat: 'دهون',
    foodLibUsdaBadge: 'USDA',
    foodLibNoResults: 'لا توجد نتائج لهذا البحث',
    foodLibClearFilters: 'مسح الفلاتر',
    foodLibSeoTitle: 'ليه مكتبة healthcalc دقيقة؟',
    foodLibSeoBody: 'كل السعرات محسوبة من USDA FoodData Central - أكبر قاعدة بيانات أكل في العالم. بنحسب كل صنف بالجرام، مش تقديري. تقدر تستخدم المكتبة دي في أي نظام غذائي: تخسيس، تضخيم، كيتو، أو نباتي. المطابخ: متوسطي، خليجي، شامي، شمال أفريقي، آسيوي، أوروبي وأكثر.',
    coAnnualSub: 'اشتراك سنوي · إلغاء في أي وقت',
    coAdvancedSuite: 'حزمة الصحة المتقدمة',
    coAnnualBilling: 'فوترة سنوية · تتجدد تلقائياً',
    coFullName: 'الاسم الكامل',
    coEmailAddress: 'البريد الإلكتروني',
    coCardNumber: 'رقم البطاقة',
    coExpiryDate: 'تاريخ الانتهاء',
    coCvv: 'CVV',
    coSecurityNote: 'معلوماتك المالية مشفّرة وآمنة. دي نسخة تجريبية — مش هنتحرك أي مبالغ حقيقية.',
    coPay: 'ادفع',
    coProcessing: 'جارٍ معالجة الدفع...',
    coVerifyWait: 'من فضلك انتظر بينما نتحقق من الدفع.',
    coPaymentSuccess: 'تم الدفع بنجاح!',
    coWelcomeSuite: 'أهلاً بك في حزمة الصحة المتقدمة.',
    coRedirecting: 'جارٍ تحويلك الآن...',
    coPaymentFailed: 'فشل الدفع',
    coTryAgain: 'حاول مرة أخرى',
    coPaymentFailedFallback: 'فشل الدفع. يرجى المحاولة مرة أخرى.',
    cuSelected: 'المطبخ المحدد',
    cuNone: 'لم يتم الاختيار',
    cuClear: 'مسح',
    adviceTitle: 'الدليل الصحي الشخصي',
    adviceLive: 'تحديث مباشر',
    adviceBmi: 'مؤشر كتلة الجسم',
    adviceIdealWeight: 'الوزن المثالي',
    adviceBmr: 'معدل الأيض الأساسي',
    adviceGoalDeficit: 'هدفك: خفض 500 سعر يوميًا لفقدان ~0.5 كجم أسبوعيًا.',
    adviceGoalSurplus: 'هدفك: زيادة 300 سعر يوميًا مع تدريب مقاومة لبناء العضلات.',
    adviceGoalMaintain: 'هدفك: الحفاظ على الوزن عبر موازنة السعرات مع الإنفاق.',
    adviceRecLoss: 'نوصي بفقدان {loss} كجم للوصول للوزن المثالي (~{weeks} أسبوع بمعدل 0.5 كجم/أسبوع).',
    adviceProteinDay: 'البروتين / اليوم',
    adviceWaterDay: 'الماء / اليوم',
    adviceMacros: 'المغذيات (هدفك)',
    adviceWeightMult: 'كمية الوزن × 1.6–2.2 جم',
    adviceWaterMult: 'الوزن × 0.033 لتر',
    adviceCatUnderweight: 'نحافة',
    adviceCatNormal: 'طبيعي',
    adviceCatOverweight: 'وزن زائد',
    adviceCatObese: 'سمنة',
    adviceCondDiabetes: 'سكري',
    adviceCondDiabetesTip: 'اختر كربوهيدرات منخفضة المؤشر الجلايسيمي، ووزّع الوجبات بالتساوي، وتابع فحص HbA1c. فضّل الخضروات الغنية بالألياف.',
    adviceCondBp: 'ضغط الدم',
    adviceCondBpTip: 'قلل الصوديوم لأقل من 5 جم يوميًا، وتجنب الأطعمة المصنعة والمخللات، وادمج الخضروات الغنية بالبوتاسيوم.',
    adviceCondCholesterol: 'كوليسترول',
    adviceCondCholesterolTip: 'أبقِ الدهون المشبعة أقل من 7% من السعرات، وركّز على مستوى LDL، وزد الألياف بالشوفان والبقوليات والفواكه.',
    cuisine: 'المطبخ',
    changeFromMain: 'غيّره من الصفحة الرئيسية',
    print: 'طباعة',
    todayPlan: 'خطة اليوم',
    noLabData: 'لا توجد بيانات تحاليل بعد',
    noLabDataDesc: 'أدخل نتائج فحص الدم من الصفحة الرئيسية ثم اضغط «تقييم وتوليد الخطة».',
    wbTitle: 'خطة التمرين المخصصة لك',
    wbSubtitle: 'HealthCalc.ai — تمارين علمية',
    wbDay: 'اليوم',
    wbType: 'نوع التمرين:',
    wbAuto: 'توصية تلقائية',
    wbBurnTarget: 'هدف حرق السعرات',
    wbGoal: 'هدف التمرين',
    wbExercisesDone: 'التمارين المنجزة',
    wbEmailPlan: 'إرسال بالبريد',
    wbDailyProgress: 'التقدم اليومي',
    wbOfEx: 'من {n}',
    wbLevelBeginner: 'مبتدئ',
    wbLevelIntermediate: 'متوسط',
    wbLevelAdvanced: 'متقدم',
    wbDone: 'تم',
    wbExercisesCompleted: 'تمارين منجزة',
    mbBuild: 'ابني وجباتك',
    mbPicked: '{n} اختيار',
    mbUse: 'استخدم',
    mbDetectedCuisine: 'اكتشفنا أنك في {country} — خطة {cuisine}',
    mbDetectedRegion: 'اكتشفنا منطقتك: {country} — مطبخ {cuisine}',
    mbAutoFill: 'تم ملؤها تلقائيًا باختيارات المطبخ المفضلة — عدّل بحرية',
    mbGenerate30: 'أنشئ خطتي لـ 30 يومًا',
    mbDishes: 'من {min} إلى {max} أطباق',
    mbTarget: 'الهدف {kcal} سعرة',
    mbSmartPortions: 'حِصص متكيفة تلقائيًا',
    mbShowPlan: '{meal} - {kcal} سعرة',
    mbHidePlan: '{meal} - {kcal} سعرة',
    mbDish: 'الطبق',
    mbGrams: 'الجرام',
    mbCalories: 'السعرات',
    mbProtein: 'بروتين',
    mbTotal: 'الإجمالي',
    mbCarbsFat: 'كربوهيدرات {carbs} جم · دهون {fat} جم',
    mbAdaptiveDesc: 'تتغير الحصص تلقائيًا لتظل الوجبة دائمًا عند الهدف — أضف أو احذف أطباقًا وتتقلص الحصص أو تكبر.',
    mbHeavy: 'ثقيلة',
    mbExtras: 'إضافات',
    mbBread: 'خبز',
    mbSalads: 'سلطات',
    mbSides: 'أطباق جانبية',
    mbDrinks: 'مشروبات',
    mbFruits: 'فواكه',
    wlHeroPill: '10 مطابخ · دقيق من USDA · Mifflin-St Jeor',
    wlGoalSelector: 'اختر هدفك — إعادة حساب الخطط تلقائيًا',
    wlExerciseType: 'نوع التمرين',
    wlAutoRecommend: 'توصية تلقائية',
    wlFullWorkout: 'خطة التمرين الكاملة - 30 يوم',
    wlWorkoutHint: 'اختر نوع التمرين أعلاه ثم اضغط الزر لفتح الخطة',
    wlAgeYears: 'سنة',
    wlWorkoutDaysPerWeek: 'أيام التمرين في الأسبوع',
    wlDays: '{n} أيام',
    wlSedentary: 'خامل',
    wlModerate: 'معتدل',
    wlVeryActive: 'نشيط جدًا',
    wlCaloriesSchedule: 'جدول السعرات - {cuisine}',
    wlUsdaAccurate: 'دقيق',
    wlCompleteAllMeals: 'أكمل جميع الوجبات',
    wlFullPlan: 'الخطة الكاملة - 30 يوم',
    wlSuggestions: 'اقتراحات من مطبخ {cuisine}',
    wlCaloriesItem: '{name} - {kcal} سعر',
    wlProteinUnit: 'ج',
    dbLabInterpreter: 'مفسّر نتائج المختبر',
    dbLabsEmpty: 'أدخل قيم المختبر الخاصة بك في اللوحة اليسرى للحصول على تفسير فوري وفقًا للإرشادات الطبية لـ ADA.',
    dbBpClassification: 'تصنيف ضغط الدم (AHA)',
    dbSystolicRange: 'النطاق الانقباضي',
    dbDiastolicRange: 'النطاق الانبساطي',
    dbRecommendations: 'التوصيات',
    dbBpClassifier: 'مصنّف ضغط الدم',
    dbBpEmpty: 'أدخل قراءات ضغط الدم لديك ليتم تصنيفها وفقًا لإرشادات AHA مع توصيات مخصصة.',
    db30DayMealPlan: 'خطة وجبات السكري - 30 يوم',
    dbFoundation: 'الأساس',
    unitMetric: 'متري',
    unitUs: 'أمريكي',
    ltpEngine: 'محرك الصحة الذكي',
    ltpHeroTitle: 'مجموعة السكري وارتفاع ضغط الدم',
    ltpHeroDesc: 'أدخل ملفك وقيم المختبر لتتلقى فورًا خطط وجبات مخصصة وتمارين وتتبع تقدم — كل ذلك متوافق مع الإرشادات السريرية لـ ADA و AHA.',
    ltpProfileLab: 'الملف وقيم المختبر',
    ltpProfileLabSub: 'أدخل بياناتك للحصول على تقييم شخصي وفقًا لـ ADA و AHA',
    ltpUserProfile: 'الملف الشخصي',
    ltpBloodGlucose: 'سكر الدم',
    ltpFastingLabel: 'صائم (ملغ/دل)',
    ltpFastingRange: 'طبيعي: 70–99 · ما قبل السكري: 100–125 · سكري: ≥126',
    ltpPostLabel: 'بعد الأكل بساعتين (ملغ/دل)',
    ltpPostRange: 'طبيعي: أقل من 140 · ما قبل السكري: 140–199 · سكري: ≥200',
    ltpHba1cRange: 'طبيعي: أقل من 5.7% · ما قبل السكري: 5.7–6.4% · سكري: ≥6.5%',
    ltpBloodPressure: 'ضغط الدم',
    ltpSystolic: 'الانقباضي',
    ltpDiastolic: 'الانبساطي',
    ltpSystolicLabel: 'الانقباضي (مم زئبق)',
    ltpDiastolicLabel: 'الانبساطي (مم زئبق)',
    ltpSysShort: 'انق',
    ltpDiaShort: 'انب',
    ltpNormal: 'طبيعي (AHA):',
    ltpElevated: 'مرتفع:',
    ltpStage1: 'المرحلة 1:',
    ltpStage2: 'المرحلة 2:',
    ltpEvaluate: 'تقييم وإنشاء الخطة',
    ltpHide: 'إخفاء',
    ltpShow: 'إظهار',
    ltpProgress: 'التقدم',
    ltpGlucose: 'الجلوكوز',
    ltpRisk: 'الخطر',
    ltpDailyTargets: 'أهدافك اليومية',
    ltpTargetsSub: 'محسوبة من العمر والوزن والطول ومستوى النشاط',
    ltpProtein: 'بروتين:',
    ltpCarbs: 'كربوهيدرات:',
    ltpFat: 'دهون:',
    ltpDiabetesPlan: 'خطة إدارة السكري',
    ltpDiaSub: 'مبني على إرشادات ADA · مؤشر سكري منخفض · كربوهيدرات محسوبة · مُعدّل حسب العمر',
    ltpFree: 'مجاني',
    ltpGlucoseProfile: 'ملف الجلوكوز',
    ltpStatus: 'الحالة',
    ltpADATargets: 'أهداف ADA',
    ltpPostMeal: 'بعد الوجبة',
    ltpCarbPerMeal: 'كربوهيدرات/وجبة',
    ltpGITarget: 'هدف المؤشر السكري',
    ltpCarbBudget: 'ميزانية الكربوهيدرات',
    ltpFiberGoal: 'هدف الألياف',
    ltpDiaPlan30: 'خطة وجبات وتمارين السكري - 30 يوم',
    ltpDiabetesMeals: 'وجبات السكري',
    ltpADAAligned: 'متوافق مع ADA',
    ltpOpenFullPlan: 'فتح الخطط الكاملة - 30 يوم مع PDF / الطباعة',
    ltpDownloadPrint: 'حمّل أو اطبع خطتك الشخصية الكاملة',
    ltpCompleteExercises: 'أكمل جميع التمارين',
    ltpExerciseProtocol: 'بروتوكول التمرين',
    ltpAgeAdjusted: 'مُعدّل حسب العمر',
    ltpADAGuidelines: 'إرشادات ADA',
    ltpHTPlan: 'خطة إدارة ارتفاع ضغط الدم',
    ltpHTSub: 'مبني على إرشادات AHA · حمية DASH · قليل الصوديوم · مراعٍ للوزن',
    ltpBPProfile: 'ملف ضغط الدم',
    ltpReading: 'القراءة',
    ltpAHATargets: 'أهداف AHA',
    ltpBPTarget: 'هدف ضغط الدم',
    ltpSodium: 'الصوديوم',
    ltpPotassium: 'البوتاسيوم',
    ltpExercise: 'التمرين',
    ltpBMITarget: 'هدف مؤشر كتلة الجسم',
    ltpHTPlan30: 'خطة وجبات وتمارين ارتفاع ضغط الدم - 30 يوم',
    ltpDASHMeals: 'وجبات DASH',
    ltpDASHAligned: 'متوافق مع DASH',
    ltpWeightAware: 'مراعٍ للوزن',
    ltpAHAGuidelines: 'إرشادات AHA',
    ltpDailyMealPlan: 'خطة الوجبات اليومية',
    ltpMealSummary: '{kcal} سعر · متوسط المؤشر السكري: {gi} · الهدف {target} سعر',
    ltpShuffle: 'تبديل',
    ltpDailyTracking: 'التتبع اليومي',
    ltpMetric: 'القياس',
    ltpTarget: 'الهدف',
    ltpActual: 'الفعلي',
    ltpStatusSafe: 'آمن',
    ltpStatusOnTrack: 'على المسار الصحيح',
    ltpStatusAttention: 'يحتاج إلى انتباه',
    ltpStatusBelow: 'أقل من الهدف',
    ltpStatusOver: 'تجاوز الحد',
    ltpProgressTracking: 'تتبع التقدم',
    ltpEntries: '{n} إدخال',
    ltpClearAll: 'مسح الكل',
    ltpNoProgress: 'لا توجد قراءات بعد. اضغط "{action}" لتسجيل أول إدخال.',
    ltpGlucoseTrend: 'اتجاه الجلوكوز (آخر 7)',
    ltpPostShort: 'بعد.',
    ltpPostprandial: 'بعد الأكل',
    ltpBPTrend: 'اتجاه ضغط الدم (آخر 7)',
    ltpFasting: 'صائم',
    ltpWeightTrend: 'اتجاه الوزن',
    ltpDate: 'التاريخ',
    ltpWeight: 'الوزن',
    ltpClinicalSummary: 'الملخص السريري',
    ltpPrintReport: 'طباعة / تنزيل التقرير',
    ltpEmailReport: 'إرسال التقرير بالبريد',
    ltpEmailOpened: 'تم فتح برنامج البريد',
    ltpEmailReady: 'تقريرك الصحي الكامل مع الملف والخطط والتقدم جاهز للإرسال.',
    ltpEmptyPrompt: 'أدخل ملفك وقيم المختبر أعلاه ثم اضغط "{action}".',
    pmSuiteBadge: 'حزمة الصحة المتقدمة',
    pmFreeModules: '{n} وحدات مجانية',
    pmHeroSub: 'رحلات صحية منظمة لمدة 30 يومًا مع خطط متكيفة بالذكاء الاصطناعي وتتبع يومي وتصدير سريري لـ 8 حالات.',
    pmSuiteActive: 'حزمة الرعاية المتقدمة مفعّلة',
    pmSuiteActiveSub: 'وصول كامل إلى جميع الوحدات بما في ذلك {n} برامج مجانية.',
    pmCrossAdvisory: 'استشارة مشتركة بين الحالات',
    pmConditionModules: 'وحدات الحالات',
    pmConditionSub: 'اختر الحالات لتفعيل رحلات صحية لمدة 30 يومًا',
    pmActive: 'مفعّل',
    pmPremium: 'متميز',
    pmClickDeactivate: 'اضغط للإلغاء ↑',
    pmClickActivate: 'اضغط للتفعيل →',
    pm30DayJourney: 'رحلة صحية لمدة 30 يومًا',
    pmCustomized: 'مخصص',
    pmPatientProfile: 'الملف الطبي للمريض',
    pmLabValues: 'قيم المختبر',
    pmGeneratePlan: 'إنشاء خطة الـ 30 يوم',
    pmPlansGenerated: 'تم إنشاء الخطط وتخصيصها',
    pmHealthScore: 'درجة الصحة',
    pmCheckInStreak: 'سلسلة تسجيل الدخول',
    pmStreakInfo: 'الحالية: {c} أيام · الأطول: {l} أيام',
    pmAIAutoAdj: 'تعديل ذكي تلقائي: {type}',
    pmTabPlan30: 'خطة 30 يوم',
    pmTabCheckin: 'تسجيل يومي',
    pmTabAnalytics: 'التحليلات والسلاسل',
    pmTabGuidelines: 'الإرشادات',
    pm30DayPlanLabel: '{name} — خطة 30 يوم',
    pmDailyCheckIn: 'تسجيل يومي',
    pmDayOf30: 'اليوم {n} من 30 · سجل مؤشراتك اليومية',
    pmCancel: 'إلغاء',
    pmLogToday: 'سجل اليوم',
    pmSaveCheckIn: 'حفظ التسجيل',
    pmDayLabel: 'اليوم {n}',
    pmSymptomLog: 'سجل محفّزات الأعراض',
    pmSymptomLogSub: 'سجّل النوبات وحدد الأنماط',
    pmLogTrigger: 'تسجيل محفّز',
    pmSymptom: 'العرض',
    pmSelectOption: 'اختر...',
    pmTriggerFood: 'طعام/سبب محفّز محتمل',
    pmSelectCustom: 'اختر أو اكتب قيمة مخصصة...',
    pmSeverity: 'الشدة (1-10): {n}',
    pmNotes: 'ملاحظات',
    pmNotesPlaceholder: 'سياق إضافي...',
    pmSaveTrigger: 'حفظ المحفّز',
    pmTriggerPrefix: 'المحفّز:',
    pmWeeklyMilestones: 'أهداف أسبوعية',
    pmMilestoneTarget: 'الهدف: {t} {u}',
    pmMilestoneCurrent: '(الحالي: {n})',
    pmMilestoneDescPlaceholder: 'وصف الهدف',
    pmUnit: 'الوحدة',
    pmAdd: 'إضافة',
    pmRecentTrends: 'الاتجاهات الأخيرة',
    pmAvg: 'المتوسط: {n}',
    pmCheckIns: 'التسجيلات',
    pmDayStreak: 'سلسلة الأيام',
    pmMilestones: 'الأهداف',
    pmTriggersLogged: 'المحفّزات المسجلة',
    pmGuidelinesTitle: 'الإرشادات الطبية والتوصيات',
    pmWhatsIncluded: 'ما المكوّن؟',
    pmIncludeSub: 'إدارة صحية كاملة خاصة بالحالة',
    pmIncPlans: 'خطط 30 يوم',
    pmIncPlansDesc: 'رحلات يومية منظمة مع وجبات وتمارين وأهداف سريرية',
    pmIncTracking: 'تتبع يومي',
    pmIncTrackingDesc: 'سجلات التسجيل ومحفّزات الأعراض والالتزام بالأدوية',
    pmIncAI: 'تكيّف ذكي',
    pmIncAIDesc: 'تعديلات ذكية تلقائية بناءً على بيانات تتبعك',
    pmIncExport: 'تصدير سريري',
    pmIncExportDesc: 'تقارير PDF/CSV لاستشارات الأطباء',
    pmCSVExport: 'تصدير CSV',
    pmEmail: 'بريد'










  },
};

export const getTranslation = (lang: Language, key: keyof TranslationKeys): string => {
  return translations[lang]?.[key] || translations.en[key] || key;
};
