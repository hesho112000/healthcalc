export type ExerciseType = 'strength' | 'cardio' | 'hiit' | 'flexibility' | 'balance' | 'functional' | 'mindbody';

export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type ExerciseGoal = 'lose_weight' | 'maintain' | 'gain_muscle' | 'cardio_health' | 'mobility';

export type ExerciseEquipment =
  | 'bodyweight'
  | 'dumbbells'
  | 'barbell'
  | 'kettlebell'
  | 'band'
  | 'machine'
  | 'cable'
  | 'cardio_machine'
  | 'stability_ball'
  | 'bosu'
  | 'mat'
  | 'pull_up_bar'
  | 'foam_roller'
  | 'none';

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'core'
  | 'full_body'
  | 'cardio_system'
  | 'posture'
  | 'mobility'
  | 'mind';

export interface Exercise {
  id: string;
  type: ExerciseType;
  nameEn: string;
  nameFr: string;
  nameEs: string;
  nameAr: string;
  equipment: ExerciseEquipment;
  muscleGroup: MuscleGroup;
  goals: string[];
  difficulty: ExerciseDifficulty;
  calories: number;
  duration: string;
  sets: string;
  bmiRange?: [number, number];
  contraindications?: string[];
  refs: string[];
  tipEn?: string;
  tipFr?: string;
  tipEs?: string;
  tipAr?: string;
}

export const CONTRA_KNEE = 'knee';
export const CONTRA_BACK = 'back';
export const CONTRA_SHOULDER = 'shoulder';
export const CONTRA_HYPERTENSION = 'hypertension';
export const CONTRA_DIABETES = 'diabetes';
export const CONTRA_PREGNANCY = 'pregnancy';
export const CONTRA_VERTIGO = 'vertigo';
export const CONTRA_WRIST = 'wrist';