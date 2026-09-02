import {
  Exercise,
  ExerciseDifficulty,
  ExerciseEquipment,
  ExerciseType,
  MuscleGroup,
  EXERCISES_DATABASE,
} from '../../utils/calculations_expanded';

export type WorkoutGoal = 'lose_weight' | 'gain_muscle' | 'maintain' | 'cardio';
export type WorkoutLevel = 'beginner' | 'intermediate' | 'advanced';
export type WorkoutEquipment = 'bodyweight' | 'dumbbells' | 'gym';
export type WorkoutFocus =
  | 'fullBody'
  | 'upperBody'
  | 'lowerBody'
  | 'push'
  | 'pull'
  | 'legs'
  | 'cardio'
  | 'hiit'
  | 'flexibility'
  | 'mindbody';

export interface WorkoutDayPlan {
  day: number;
  label: string;
  focus: WorkoutFocus | 'rest';
  exercises: Exercise[];
  calorieBurnTarget: number;
  workoutGoal: string;
  sessionMinutes: number;
}

export interface WeeklyWorkoutPlan {
  days: WorkoutDayPlan[];
  weeklyCalories: number;
  trainingSessions: number;
}

export interface WorkoutPlanInputs {
  goal: WorkoutGoal;
  level: WorkoutLevel;
  days: 3 | 4 | 5;
  minutes: number;
  equipment: WorkoutEquipment;
  bmi?: number;
  safety?: string[];
  seedOffset?: number;
}

const GYM_EQUIPMENT: ExerciseEquipment[] = [
  'bodyweight', 'dumbbells', 'barbell', 'kettlebell', 'band', 'machine', 'cable',
  'cardio_machine', 'stability_ball', 'bosu', 'mat', 'pull_up_bar', 'foam_roller', 'none',
];
const DW_EQUIPMENT: ExerciseEquipment[] = [
  'bodyweight', 'dumbbells', 'kettlebell', 'band', 'stability_ball', 'bosu', 'mat',
  'pull_up_bar', 'foam_roller', 'none',
];
const BW_EQUIPMENT: ExerciseEquipment[] = [
  'bodyweight', 'band', 'stability_ball', 'bosu', 'mat', 'pull_up_bar', 'foam_roller', 'none',
];

const LEVEL_DIFFICULTY: Record<WorkoutLevel, ExerciseDifficulty[]> = {
  beginner: ['beginner'],
  intermediate: ['beginner', 'intermediate'],
  advanced: ['beginner', 'intermediate', 'advanced'],
};

const FOCUS_TYPE: Record<WorkoutFocus, ExerciseType[]> = {
  fullBody: ['strength', 'functional', 'balance'],
  upperBody: ['strength', 'functional'],
  lowerBody: ['strength', 'functional', 'balance'],
  push: ['strength', 'functional'],
  pull: ['strength', 'functional'],
  legs: ['strength', 'functional', 'balance'],
  cardio: ['cardio', 'hiit'],
  hiit: ['hiit', 'cardio'],
  flexibility: ['flexibility', 'balance'],
  mindbody: ['mindbody', 'flexibility'],
};

const FOCUS_MUSCLES: Record<WorkoutFocus, MuscleGroup[]> = {
  fullBody: ['full_body', 'chest', 'back', 'shoulders', 'quads', 'hamstrings', 'glutes', 'core'],
  upperBody: ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'core'],
  lowerBody: ['quads', 'hamstrings', 'glutes', 'calves', 'core'],
  push: ['chest', 'shoulders', 'triceps', 'core'],
  pull: ['back', 'biceps', 'core'],
  legs: ['quads', 'hamstrings', 'glutes', 'calves', 'core'],
  cardio: ['cardio_system'],
  hiit: ['cardio_system'],
  flexibility: ['mobility', 'posture'],
  mindbody: ['mind'],
};

const TEMPLATES: Record<number, Record<WorkoutGoal, WorkoutFocus[]>> = {
  3: {
    lose_weight: ['fullBody', 'cardio', 'hiit'],
    gain_muscle: ['fullBody', 'fullBody', 'fullBody'],
    maintain: ['fullBody', 'cardio', 'mindbody'],
    cardio: ['cardio', 'hiit', 'cardio'],
  },
  4: {
    lose_weight: ['upperBody', 'hiit', 'lowerBody', 'cardio'],
    gain_muscle: ['upperBody', 'lowerBody', 'upperBody', 'lowerBody'],
    maintain: ['upperBody', 'cardio', 'lowerBody', 'flexibility'],
    cardio: ['cardio', 'hiit', 'cardio', 'fullBody'],
  },
  5: {
    lose_weight: ['upperBody', 'cardio', 'lowerBody', 'hiit', 'fullBody'],
    gain_muscle: ['push', 'pull', 'legs', 'upperBody', 'lowerBody'],
    maintain: ['upperBody', 'cardio', 'lowerBody', 'flexibility', 'mindbody'],
    cardio: ['push', 'cardio', 'pull', 'hiit', 'cardio'],
  },
};

const SESSION_SLOTS: Record<number, number> = { 20: 4, 30: 5, 45: 6, 60: 7 };

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function inBmiRange(ex: Exercise, bmi?: number): boolean {
  if (bmi === undefined || !ex.bmiRange) return true;
  return bmi >= ex.bmiRange[0] && bmi <= ex.bmiRange[1];
}

function safeFor(ex: Exercise, safety?: string[]): boolean {
  if (!safety || safety.length === 0) return true;
  if (!ex.contraindications || ex.contraindications.length === 0) return true;
  return !ex.contraindications.some(c => safety.includes(c));
}

function pickExercises(
  focus: WorkoutFocus,
  inputs: WorkoutPlanInputs,
  dayIndex: number,
  usedIds: Set<string>,
): Exercise[] {
  const allowedEquipment = inputs.equipment === 'gym' ? GYM_EQUIPMENT
    : inputs.equipment === 'dumbbells' ? DW_EQUIPMENT : BW_EQUIPMENT;
  const allowedDifficulty = LEVEL_DIFFICULTY[inputs.level];
  const allowedTypes = FOCUS_TYPE[focus];
  const focusMuscles = FOCUS_MUSCLES[focus];
  const count = SESSION_SLOTS[inputs.minutes] || 5;

  const candidates = EXERCISES_DATABASE.filter(ex =>
    allowedTypes.includes(ex.type) &&
    allowedEquipment.includes(ex.equipment) &&
    allowedDifficulty.includes(ex.difficulty) &&
    inBmiRange(ex, inputs.bmi) &&
    safeFor(ex, inputs.safety)
  );

  const focused = shuffle(candidates, 1000 + dayIndex * 7 + (inputs.seedOffset || 0))
    .sort((a, b) => {
      const aFocus = focusMuscles.includes(a.muscleGroup) ? 0 : 1;
      const bFocus = focusMuscles.includes(b.muscleGroup) ? 0 : 1;
      return aFocus - bFocus;
    });

  const result: Exercise[] = [];
  for (const ex of focused) {
    if (result.length >= count) break;
    if (!usedIds.has(ex.id)) {
      usedIds.add(ex.id);
      result.push(ex);
    }
  }
  if (result.length < count) {
    for (const ex of focused) {
      if (result.length >= count) break;
      if (!result.includes(ex)) result.push(ex);
    }
  }
  return result;
}

const TRAINING_SLOTS: Record<number, number[]> = {
  3: [0, 2, 4],
  4: [0, 1, 3, 5],
  5: [0, 1, 2, 3, 4],
};

export function generateWeeklyPlan(inputs: WorkoutPlanInputs): WeeklyWorkoutPlan {
  const template = TEMPLATES[inputs.days][inputs.goal];
  const slots = TRAINING_SLOTS[inputs.days];
  const usedIds = new Set<string>();
  const days: WorkoutDayPlan[] = [];

  for (let i = 0; i < 7; i++) {
    const slotIndex = slots.indexOf(i);
    if (slotIndex === -1) {
      days.push({
        day: i + 1,
        label: 'Rest',
        focus: 'rest',
        exercises: [],
        calorieBurnTarget: 0,
        workoutGoal: 'rest',
        sessionMinutes: 0,
      });
      continue;
    }
    const focus = template[slotIndex];
    const exercises = pickExercises(focus, inputs, i, usedIds);
    const burn = exercises.reduce((sum, e) => sum + e.calories, 0);
    days.push({
      day: i + 1,
      label: focus,
      focus,
      exercises,
      calorieBurnTarget: burn,
      workoutGoal: focus,
      sessionMinutes: inputs.minutes,
    });
  }

  return {
    days,
    weeklyCalories: days.reduce((sum, d) => sum + d.calorieBurnTarget, 0),
    trainingSessions: template.length,
  };
}

export function toThirtyDayPlan(weekly: WeeklyWorkoutPlan): WorkoutDayPlan[] {
  return Array.from({ length: 30 }, (_, i) => {
    const source = weekly.days[i % 7];
    return {
      ...source,
      day: i + 1,
      label: `Day ${i + 1}`,
    };
  });
}