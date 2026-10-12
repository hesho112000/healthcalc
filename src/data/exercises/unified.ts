import type { Exercise, ExerciseDifficulty, ExerciseEquipment, ExerciseType, MuscleGroup } from './types';
import { balanceExercises } from './balance-full';
import { cardioExercises } from './cardio-full';
import { flexibilityExercises } from './flexibility-full';
import { functionalExercises } from './functional-full';
import { hiitExercises } from './hiit-full';
import { mindbodyExercises } from './mindbody-full';
import { strengthExercises } from './strength-full';

export type UnifiedEquipment = ExerciseEquipment | 'medicine_ball' | 'rings' | 'jump_rope';

export interface UnifiedExercise extends Omit<Exercise, 'equipment' | 'sets'> {
  name: string;
  category: ExerciseType;
  equipment: UnifiedEquipment;
  sets: number;
  reps: string | null;
  sourceSets: string;
  sourceFile: string;
  aliases?: string[];
  reviewStatus?: 'needs_review';
}

export interface UnifiedExerciseType {
  id: ExerciseType;
  legacyTypes: string[];
  subtypes: string[];
}

const LEGACY_ALIASES: Record<string, string[]> = {
  ca6: ['Stair Climber'],
  ca7: ['Elliptical'],
  ca18: ['Skater Jump'],
  fl10: ['Downward Dog'],
  fl18: ['Child Pose'],
  ba3: ['Tree Pose'],
  fu4: ['Farmer Carry'],
  fu28: ['Turkish Get-Up'],
  hi7: ['Sprint on Bike'],
  st2: ['Push-Up'],
  st7: ['Dumbbell Lunges'],
  st8: ['Overhead Press'],
  st10: ['Dumbbell Curl'],
  st18: ['Pull-Up'],
};

const SOURCE_GROUPS: { sourceFile: string; exercises: Exercise[] }[] = [
  { sourceFile: 'balance-full.ts', exercises: balanceExercises },
  { sourceFile: 'cardio-full.ts', exercises: cardioExercises },
  { sourceFile: 'flexibility-full.ts', exercises: flexibilityExercises },
  { sourceFile: 'functional-full.ts', exercises: functionalExercises },
  { sourceFile: 'hiit-full.ts', exercises: hiitExercises },
  { sourceFile: 'mindbody-full.ts', exercises: mindbodyExercises },
  { sourceFile: 'strength-full.ts', exercises: strengthExercises },
];

const canonicalize = (exercise: Exercise, sourceFile: string): UnifiedExercise => {
  const prescription = exercise.sets.match(/^\s*(\d+)\s*[×x]\s*(.+?)\s*$/i);
  const prescribedReps = prescription?.[2] ?? null;
  return {
    ...exercise,
    name: exercise.nameEn,
    category: exercise.type,
    equipment: exercise.equipment,
    sets: prescription ? Number(prescription[1]) : 1,
    reps: prescribedReps && !/\bmin(?:ute)?s?\b/i.test(prescribedReps) ? prescribedReps : null,
    sourceSets: exercise.sets,
    sourceFile,
    ...(LEGACY_ALIASES[exercise.id] ? { aliases: [...LEGACY_ALIASES[exercise.id]] } : {}),
  };
};

const PENDING_TRANSLATION = '';
const PENDING_REVIEW: Pick<UnifiedExercise, 'calories' | 'refs' | 'reviewStatus'> = {
  calories: 0,
  refs: [],
  reviewStatus: 'needs_review',
};

const LEGACY_UNIQUE_EXERCISES: UnifiedExercise[] = [
  {
    id: 'legacy-strength-barbell-row', type: 'strength', category: 'strength',
    name: 'Barbell Row', nameEn: 'Barbell Row', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'barbell', muscleGroup: 'back', goals: ['gain_muscle', 'maintain'], difficulty: 'intermediate',
    sets: 3, reps: '8-12', sourceSets: '3×8-12', duration: '15 min', sourceFile: 'legacy-unique', ...PENDING_REVIEW,
  },
  {
    id: 'legacy-strength-triceps-dip', type: 'strength', category: 'strength',
    name: 'Triceps Dip', nameEn: 'Triceps Dip', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'bodyweight', muscleGroup: 'triceps', goals: ['gain_muscle', 'maintain'], difficulty: 'intermediate',
    sets: 3, reps: '8-12', sourceSets: '3×8-12', duration: '12 min', sourceFile: 'legacy-unique', ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-wall-ball', type: 'functional', category: 'functional',
    name: 'Wall Ball', nameEn: 'Wall Ball', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'medicine_ball', muscleGroup: 'full_body', goals: ['lose_weight', 'gain_muscle'], difficulty: 'intermediate',
    sets: 4, reps: '12', sourceSets: '4×12', duration: '12 min', sourceFile: 'legacy-unique', ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-clean-and-jerk', type: 'functional', category: 'functional',
    name: 'Clean & Jerk', nameEn: 'Clean & Jerk', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'barbell', muscleGroup: 'full_body', goals: ['gain_muscle'], difficulty: 'advanced',
    sets: 5, reps: '3', sourceSets: '5×3', duration: '15 min', sourceFile: 'legacy-unique', ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-snatch', type: 'functional', category: 'functional',
    name: 'Snatch', nameEn: 'Snatch', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'barbell', muscleGroup: 'full_body', goals: ['gain_muscle'], difficulty: 'advanced',
    sets: 5, reps: '3', sourceSets: '5×3', duration: '15 min', sourceFile: 'legacy-unique', ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-thruster', type: 'functional', category: 'functional',
    name: 'Thruster', nameEn: 'Thruster', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'barbell', muscleGroup: 'full_body', goals: ['lose_weight', 'gain_muscle'], difficulty: 'advanced',
    sets: 4, reps: '8', sourceSets: '4×8', duration: '15 min', sourceFile: 'legacy-unique', ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-ring-dip', type: 'functional', category: 'functional',
    name: 'Ring Dip', nameEn: 'Ring Dip', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'rings', muscleGroup: 'triceps', goals: ['gain_muscle'], difficulty: 'advanced',
    sets: 3, reps: '6-8', sourceSets: '3×6-8', duration: '12 min', sourceFile: 'legacy-unique', ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-handstand-push-up', type: 'functional', category: 'functional',
    name: 'Handstand Push-Up', nameEn: 'Handstand Push-Up', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'bodyweight', muscleGroup: 'shoulders', goals: ['gain_muscle'], difficulty: 'advanced',
    sets: 3, reps: '5', sourceSets: '3×5', duration: '12 min', sourceFile: 'legacy-unique', ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-pistol-squat', type: 'functional', category: 'functional',
    name: 'Pistol Squat', nameEn: 'Pistol Squat', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'bodyweight', muscleGroup: 'quads', goals: ['gain_muscle', 'maintain'], difficulty: 'advanced',
    sets: 3, reps: '6 per side', sourceSets: '3×6 per side', duration: '12 min', sourceFile: 'legacy-unique', ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-double-unders', type: 'hiit', category: 'hiit',
    name: 'Double Unders', nameEn: 'Double Unders', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'jump_rope', muscleGroup: 'cardio_system', goals: ['lose_weight', 'cardio_health'], difficulty: 'advanced',
    sets: 5, reps: '30 seconds', sourceSets: '5×30 seconds', duration: '12 min', sourceFile: 'legacy-unique', ...PENDING_REVIEW,
  },
];

export const UNIFIED_EXERCISE_TYPES: UnifiedExerciseType[] = [
  {
    id: 'cardio',
    legacyTypes: ['cardio', 'swimming', 'cycling', 'running', 'boxing', 'dance'],
    subtypes: [
      'Treadmill Walk', 'Stationary Bike', 'Outdoor Walk', 'Sprint Intervals',
      'Freestyle Laps', 'Breaststroke', 'Backstroke', 'Butterfly', 'Kickboard Drills', 'Interval Sprints',
      'Endurance Ride', 'Hill Climb', 'Interval Blocks', 'Recovery Spin', 'Tempo Ride', 'Standing Climb', 'Sprint Repeats',
      'Easy Run', 'Tempo Run', 'Fartlek', 'Hill Repeats', 'Long Run', 'Track Intervals', 'Progression Run', 'Recovery Jog',
      'Heavy Bag', 'Speed Bag', 'Pad Work', 'Double-End Bag', 'Footwork Drills', 'Body Hooks', 'Uppercut Combo', 'Sparring Rounds',
      'Zumba', 'Hip-Hop Routine', 'Salsa Basics', 'Ballet Barre', 'Jazz Cardio', 'Latin Fusion', 'Dance HIIT', 'Afrobeat Flow', 'Cardio Core Dance',
    ],
  },
  { id: 'strength', legacyTypes: ['strength'], subtypes: [] },
  { id: 'hiit', legacyTypes: ['hiit'], subtypes: [] },
  {
    id: 'flexibility',
    legacyTypes: ['yoga', 'pilates'],
    subtypes: [
      'Sun Salutation', 'Warrior I', 'Warrior II', 'Bridge Pose', 'Cobra Pose', 'Plank Pose', 'Triangle Pose', 'Crow Pose', 'Corpse Pose',
      'The Hundred', 'Roll-Up', 'Leg Circle', 'Double Leg Stretch', 'Single Leg Stretch', 'Scissor Kick', 'Side Plank', 'Teaser', 'Bridge Lift',
    ],
  },
  { id: 'balance', legacyTypes: [], subtypes: [] },
  { id: 'functional', legacyTypes: ['crossfit'], subtypes: ['Row 500m Sprint', 'Rope Climb'] },
  {
    id: 'mindbody',
    legacyTypes: ['tai_chi'],
    subtypes: ['Opening Form', 'Ward Off', 'Repulse Monkey', 'Brush Knee', 'Cloud Hands', 'Golden Rooster', 'Fair Lady Works Shuttles', 'Closing Form'],
  },
];

export const UNIFIED_EXERCISES: UnifiedExercise[] = [
  ...SOURCE_GROUPS.flatMap(({ sourceFile, exercises }) => exercises.map((exercise) => canonicalize(exercise, sourceFile))),
  ...LEGACY_UNIQUE_EXERCISES,
];

export const UNIFIED_EXERCISE_COUNT = UNIFIED_EXERCISES.length;
