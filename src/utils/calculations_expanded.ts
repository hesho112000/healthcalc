export * from './calculations';

export const calculateIdealWeight = (height: number, gender: string): number => {
  const h = height / 100;
  return gender === 'male' ? Math.round(22 * h * h) : Math.round(21 * h * h);
};

export const calculateBodyFat = (waist: number, neck: number, height: number, gender: string): number => {
  if (gender === 'male') {
    return +(86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76).toFixed(1);
  }
  return +(163.205 * Math.log10(waist + 0.1 * waist - neck) - 97.684 * Math.log10(height) - 78.387).toFixed(1);
};

export const calculateWaterIntake = (weight: number): number => Math.round(weight * 0.033 * 1000);

export { FOODS_DATABASE, CUISINE_META, CUISINE_OPTIONS, getFoodsByCuisine, generateMealWithCuisine } from './calculations';
export type { Cuisine, FoodItem } from './calculations';

export type ExerciseType = 'strength' | 'cardio' | 'hiit' | 'flexibility' | 'balance' | 'functional' | 'mindbody';

export interface Exercise {
  id: string;
  nameEn: string;
  nameAr: string;
  type: ExerciseType;
  calories: number;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  bmiRange?: [number, number];
  goals?: string[];
}

export const EXERCISE_TYPE_LABELS: Record<ExerciseType, { en: string; ar: string }> = {
  strength: { en: 'Strength', ar: 'مقاومة وقوة' },
  cardio: { en: 'Cardio', ar: 'هوائية' },
  hiit: { en: 'HIIT', ar: 'كثافة عالية' },
  flexibility: { en: 'Flexibility', ar: 'مرونة وإطالة' },
  balance: { en: 'Balance', ar: 'توازن وثبات' },
  functional: { en: 'Functional', ar: 'وظيفية' },
  mindbody: { en: 'Mind-Body', ar: 'عقل وجسد' },
};

export const EXERCISES_DATABASE: Exercise[] = [
  // Strength (5)
  { id: 's1', nameEn: 'Barbell Squat', nameAr: 'سكوات بالباربيل', type: 'strength', calories: 120, duration: '20 min', difficulty: 'intermediate', bmiRange: [25, 40], goals: ['lose_weight', 'maintain'] },
  { id: 's2', nameEn: 'Push-Ups', nameAr: 'بنش برس', type: 'strength', calories: 80, duration: '15 min', difficulty: 'beginner', bmiRange: [18, 40], goals: ['lose_weight', 'maintain', 'gain_muscle'] },
  { id: 's3', nameEn: 'Dumbbell Row', nameAr: 'صف ل [[' , type: 'strength', calories: 90, duration: '18 min', difficulty: 'intermediate', bmiRange: [20, 35], goals: ['gain_muscle', 'maintain'] },
  { id: 's4', nameEn: 'Leg Press', nameAr: 'ضغط الرجلين', type: 'strength', calories: 110, duration: '20 min', difficulty: 'intermediate', bmiRange: [25, 38], goals: ['lose_weight', 'gain_muscle'] },
  { id: 's5', nameEn: 'Deadlift', nameAr: 'ديدلفت', type: 'strength', calories: 130, duration: '22 min', difficulty: 'advanced', bmiRange: [20, 35], goals: ['gain_muscle', 'maintain'] },

  // Cardio (5)
  { id: 'c1', nameEn: 'Brisk Walking', nameAr: 'مشي سريع', type: 'cardio', calories: 150, duration: '30 min', difficulty: 'beginner', bmiRange: [25, 45], goals: ['lose_weight', 'maintain'] },
  { id: 'c2', nameEn: 'Cycling', nameAr: 'ركوب الدراجة', type: 'cardio', calories: 200, duration: '30 min', difficulty: 'intermediate', bmiRange: [22, 40], goals: ['lose_weight', 'maintain'] },
  { id: 'c3', nameEn: 'Swimming', nameAr: 'سباحة', type: 'cardio', calories: 180, duration: '25 min', difficulty: 'intermediate', bmiRange: [25, 45], goals: ['lose_weight', 'maintain'] },
  { id: 'c4', nameEn: 'Jump Rope', nameAr: 'الحبال', type: 'cardio', calories: 220, duration: '15 min', difficulty: 'advanced', bmiRange: [20, 30], goals: ['lose_weight'] },
  { id: 'c5', nameEn: 'Rowing Machine', nameAr: 'المجداف', type: 'cardio', calories: 170, duration: '25 min', difficulty: 'intermediate', bmiRange: [22, 38], goals: ['lose_weight', 'maintain'] },

  // HIIT (5)
  { id: 'h1', nameEn: 'Burpees', nameAr: 'بربيز', type: 'hiit', calories: 250, duration: '20 min', difficulty: 'advanced', bmiRange: [20, 32], goals: ['lose_weight'] },
  { id: 'h2', nameEn: 'Mountain Climbers', nameAr: 'تسلق الجبال', type: 'hiit', calories: 200, duration: '15 min', difficulty: 'intermediate', bmiRange: [22, 35], goals: ['lose_weight', 'maintain'] },
  { id: 'h3', nameEn: 'Jump Squats', nameAr: 'قفز القرفصاء', type: 'hiit', calories: 220, duration: '18 min', difficulty: 'intermediate', bmiRange: [22, 35], goals: ['lose_weight'] },
  { id: 'h4', nameEn: 'High Knees', nameAr: 'رفع الركبتين', type: 'hiit', calories: 190, duration: '12 min', difficulty: 'beginner', bmiRange: [25, 40], goals: ['lose_weight', 'maintain'] },
  { id: 'h5', nameEn: 'Box Jumps', nameAr: 'قفز الصناديق', type: 'hiit', calories: 230, duration: '15 min', difficulty: 'advanced', bmiRange: [20, 30], goals: ['lose_weight', 'gain_muscle'] },

  // Flexibility (5)
  { id: 'f1', nameEn: 'Yoga Flow', nameAr: 'يوغا سلسلة', type: 'flexibility', calories: 100, duration: '30 min', difficulty: 'beginner', bmiRange: [18, 45], goals: ['lose_weight', 'maintain'] },
  { id: 'f2', nameEn: 'Static Stretching', nameAr: 'تمدد ساكن', type: 'flexibility', calories: 60, duration: '20 min', difficulty: 'beginner', bmiRange: [18, 45], goals: ['lose_weight', 'maintain', 'gain_muscle'] },
  { id: 'f3', nameEn: 'Pilates', nameAr: 'بيلاتس', type: 'flexibility', calories: 120, duration: '30 min', difficulty: 'intermediate', bmiRange: [20, 38], goals: ['lose_weight', 'maintain'] },
  { id: 'f4', nameEn: 'Foam Rolling', nameAr: 'لف بالاسفنج', type: 'flexibility', calories: 50, duration: '15 min', difficulty: 'beginner', bmiRange: [18, 45], goals: ['maintain', 'gain_muscle'] },
  { id: 'f5', nameEn: 'Dynamic Stretching', nameAr: 'تمدد حركي', type: 'flexibility', calories: 70, duration: '15 min', difficulty: 'beginner', bmiRange: [18, 45], goals: ['lose_weight', 'maintain'] },

  // Balance (5)
  { id: 'b1', nameEn: 'Single Leg Stand', nameAr: 'وقوف على رجل واحدة', type: 'balance', calories: 40, duration: '10 min', difficulty: 'beginner', bmiRange: [18, 45], goals: ['maintain'] },
  { id: 'b2', nameEn: 'Heel-to-Toe Walk', nameAr: 'مشي الكعب إلى أصابع القدم', type: 'balance', calories: 50, duration: '12 min', difficulty: 'beginner', bmiRange: [20, 40], goals: ['maintain'] },
  { id: 'b3', nameEn: 'Yoga Tree Pose', nameAr: 'وضعية الشجرة في اليوجا', type: 'balance', calories: 45, duration: '10 min', difficulty: 'beginner', bmiRange: [18, 40], goals: ['maintain'] },
  { id: 'b4', nameEn: 'BOSU Ball Squats', nameAr: 'سكوات على كرة BOSU', type: 'balance', calories: 80, duration: '15 min', difficulty: 'intermediate', bmiRange: [20, 35], goals: ['maintain', 'gain_muscle'] },
  { id: 'b5', nameEn: 'Tandem Stance', nameAr: 'وضعية الصفا', type: 'balance', calories: 35, duration: '8 min', difficulty: 'beginner', bmiRange: [18, 45], goals: ['maintain'] },

  // Functional (5)
  { id: 'fn1', nameEn: 'Kettlebell Swing', nameAr: 'تمساح بالكيتل بيل', type: 'functional', calories: 160, duration: '15 min', difficulty: 'intermediate', bmiRange: [22, 38], goals: ['lose_weight', 'gain_muscle'] },
  { id: 'fn2', nameEn: 'Battle Ropes', nameAr: 'حبال المعركة', type: 'functional', calories: 180, duration: '12 min', difficulty: 'advanced', bmiRange: [20, 32], goals: ['lose_weight'] },
  { id: 'fn3', nameEn: 'Medicine Ball Slam', nameAr: 'ضرب كرة الطب', type: 'functional', calories: 140, duration: '15 min', difficulty: 'intermediate', bmiRange: [22, 36], goals: ['lose_weight', 'maintain'] },
  { id: 'fn4', nameEn: 'Farmer Walk', nameAr: 'مشي المزارع', type: 'functional', calories: 100, duration: '10 min', difficulty: 'beginner', bmiRange: [22, 40], goals: ['maintain', 'gain_muscle'] },
  { id: 'fn5', nameEn: 'Bear Crawl', nameAr: 'زحف الدب', type: 'functional', calories: 130, duration: '12 min', difficulty: 'intermediate', bmiRange: [20, 35], goals: ['lose_weight', 'maintain'] },

  // Mind-Body (5)
  { id: 'm1', nameEn: 'Meditation', nameAr: 'تأمل', type: 'mindbody', calories: 30, duration: '20 min', difficulty: 'beginner', bmiRange: [18, 45], goals: ['lose_weight', 'maintain'] },
  { id: 'm2', nameEn: 'Tai Chi', nameAr: 'تاي تشي', type: 'mindbody', calories: 80, duration: '30 min', difficulty: 'beginner', bmiRange: [22, 42], goals: ['maintain'] },
  { id: 'm3', nameEn: 'Deep Breathing Exercises', nameAr: 'تمارين التنفس العميق', type: 'mindbody', calories: 20, duration: '10 min', difficulty: 'beginner', bmiRange: [18, 45], goals: ['lose_weight', 'maintain'] },
  { id: 'm4', nameEn: 'Body Scan Relaxation', nameAr: 'مسح الجسم والاسترخاء', type: 'mindbody', calories: 25, duration: '15 min', difficulty: 'beginner', bmiRange: [18, 45], goals: ['maintain'] },
  { id: 'm5', nameEn: 'Yin Yoga', nameAr: 'يوغا يين', type: 'mindbody', calories: 60, duration: '30 min', difficulty: 'beginner', bmiRange: [20, 42], goals: ['lose_weight', 'maintain'] },
];

export const getExercisesByType = (type: ExerciseType): Exercise[] =>
  EXERCISES_DATABASE.filter(e => e.type === type);

export const recommendExercises = (bmi: number, goal: string, fitnessLevel: string): Exercise[] => {
  return EXERCISES_DATABASE.filter(e => {
    const matchesBmi = !e.bmiRange || (bmi >= e.bmiRange[0] && bmi <= e.bmiRange[1]);
    const matchesGoal = !e.goals || e.goals.includes(goal);
    const matchesDifficulty = fitnessLevel === 'advanced' || e.difficulty === fitnessLevel || e.difficulty === 'beginner';
    return matchesBmi && matchesGoal && matchesDifficulty;
  }).slice(0, 6);
};

export const EXERCISE_TYPE_OPTIONS: ExerciseType[] = ['strength', 'cardio', 'hiit', 'flexibility', 'balance', 'functional', 'mindbody'];
