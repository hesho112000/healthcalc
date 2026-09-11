export type ExerciseDifficulty = 'easy' | 'med' | 'hard';
export type ExerciseImpact = 'low' | 'medium' | 'high';

export interface ExerciseTypeMeta {
  id: string;
  emoji: string;
  count: number;
}

export interface ExerciseItem {
  id: string;
  typeId: string;
  name: string;
  emoji: string;
  muscle: string;
  impact: ExerciseImpact;
  minutes: number;
  kcal: number;
  difficulty: ExerciseDifficulty;
}

export const WIZARD_EXERCISE_TYPES: ExerciseTypeMeta[] = [
  { id: 'cardio', emoji: '🏃', count: 8 },
  { id: 'strength', emoji: '💪', count: 12 },
  { id: 'hiit', emoji: '⚡', count: 10 },
  { id: 'yoga', emoji: '🧘', count: 15 },
  { id: 'pilates', emoji: '🤸', count: 10 },
  { id: 'tai_chi', emoji: '🌊', count: 8 },
  { id: 'crossfit', emoji: '🏋️', count: 12 },
  { id: 'swimming', emoji: '🏊', count: 6 },
  { id: 'cycling', emoji: '🚴', count: 7 },
  { id: 'running', emoji: '🏃‍♂️', count: 8 },
  { id: 'boxing', emoji: '🥊', count: 10 },
  { id: 'dance', emoji: '💃', count: 9 },
];

export const WIZARD_EXERCISES: ExerciseItem[] = [
  { id: 'cardio-1', typeId: 'cardio', name: 'Treadmill Walk', emoji: '🏃‍♀️', muscle: 'Full Body', impact: 'low', minutes: 20, kcal: 120, difficulty: 'easy' },
  { id: 'cardio-2', typeId: 'cardio', name: 'Stationary Bike', emoji: '🚴', muscle: 'Lower Body', impact: 'low', minutes: 30, kcal: 220, difficulty: 'med' },
  { id: 'cardio-3', typeId: 'cardio', name: 'Jump Rope', emoji: '🤸', muscle: 'Full Body', impact: 'high', minutes: 10, kcal: 150, difficulty: 'hard' },
  { id: 'cardio-4', typeId: 'cardio', name: 'Rowing Machine', emoji: '🚣', muscle: 'Full Body', impact: 'medium', minutes: 20, kcal: 180, difficulty: 'med' },
  { id: 'cardio-5', typeId: 'cardio', name: 'Stair Climber', emoji: '🪜', muscle: 'Lower Body', impact: 'high', minutes: 15, kcal: 200, difficulty: 'hard' },
  { id: 'cardio-6', typeId: 'cardio', name: 'Elliptical', emoji: '🏃‍♀️', muscle: 'Full Body', impact: 'low', minutes: 25, kcal: 180, difficulty: 'easy' },
  { id: 'cardio-7', typeId: 'cardio', name: 'Outdoor Walk', emoji: '🚶', muscle: 'Full Body', impact: 'low', minutes: 30, kcal: 130, difficulty: 'easy' },
  { id: 'cardio-8', typeId: 'cardio', name: 'Sprint Intervals', emoji: '⚡', muscle: 'Lower Body', impact: 'high', minutes: 15, kcal: 250, difficulty: 'hard' },

  { id: 'strength-1', typeId: 'strength', name: 'Barbell Squat', emoji: '🏋️', muscle: 'Lower Body', impact: 'medium', minutes: 20, kcal: 180, difficulty: 'med' },
  { id: 'strength-2', typeId: 'strength', name: 'Deadlift', emoji: '🏋️', muscle: 'Full Body', impact: 'medium', minutes: 20, kcal: 200, difficulty: 'hard' },
  { id: 'strength-3', typeId: 'strength', name: 'Bench Press', emoji: '🏋️', muscle: 'Upper Body', impact: 'medium', minutes: 20, kcal: 160, difficulty: 'med' },
  { id: 'strength-4', typeId: 'strength', name: 'Overhead Press', emoji: '🏋️', muscle: 'Upper Body', impact: 'medium', minutes: 15, kcal: 120, difficulty: 'med' },
  { id: 'strength-5', typeId: 'strength', name: 'Barbell Row', emoji: '🏋️', muscle: 'Upper Body', impact: 'medium', minutes: 15, kcal: 130, difficulty: 'easy' },
  { id: 'strength-6', typeId: 'strength', name: 'Pull-Up', emoji: '🤸', muscle: 'Upper Body', impact: 'medium', minutes: 15, kcal: 110, difficulty: 'med' },
  { id: 'strength-7', typeId: 'strength', name: 'Push-Up', emoji: '💪', muscle: 'Upper Body', impact: 'low', minutes: 10, kcal: 80, difficulty: 'easy' },
  { id: 'strength-8', typeId: 'strength', name: 'Dumbbell Lunges', emoji: '🦵', muscle: 'Lower Body', impact: 'medium', minutes: 15, kcal: 140, difficulty: 'med' },
  { id: 'strength-9', typeId: 'strength', name: 'Romanian Deadlift', emoji: '🏋️', muscle: 'Lower Body', impact: 'medium', minutes: 15, kcal: 150, difficulty: 'hard' },
  { id: 'strength-10', typeId: 'strength', name: 'Dumbbell Curl', emoji: '💪', muscle: 'Upper Body', impact: 'low', minutes: 10, kcal: 70, difficulty: 'easy' },
  { id: 'strength-11', typeId: 'strength', name: 'Triceps Dip', emoji: '💪', muscle: 'Upper Body', impact: 'low', minutes: 10, kcal: 90, difficulty: 'easy' },
  { id: 'strength-12', typeId: 'strength', name: 'Plank to Push-Up', emoji: '💪', muscle: 'Core', impact: 'medium', minutes: 12, kcal: 100, difficulty: 'med' },

  { id: 'hiit-1', typeId: 'hiit', name: 'Burpee', emoji: '💥', muscle: 'Full Body', impact: 'high', minutes: 10, kcal: 160, difficulty: 'hard' },
  { id: 'hiit-2', typeId: 'hiit', name: 'Mountain Climber', emoji: '⛰️', muscle: 'Core', impact: 'high', minutes: 10, kcal: 120, difficulty: 'med' },
  { id: 'hiit-3', typeId: 'hiit', name: 'Box Jump', emoji: '📦', muscle: 'Lower Body', impact: 'high', minutes: 12, kcal: 140, difficulty: 'hard' },
  { id: 'hiit-4', typeId: 'hiit', name: 'Battle Rope', emoji: '🪢', muscle: 'Full Body', impact: 'high', minutes: 10, kcal: 150, difficulty: 'hard' },
  { id: 'hiit-5', typeId: 'hiit', name: 'Kettlebell Swing', emoji: '🔔', muscle: 'Full Body', impact: 'high', minutes: 12, kcal: 150, difficulty: 'med' },
  { id: 'hiit-6', typeId: 'hiit', name: 'Jump Squat', emoji: '🦵', muscle: 'Lower Body', impact: 'high', minutes: 10, kcal: 120, difficulty: 'med' },
  { id: 'hiit-7', typeId: 'hiit', name: 'Sprint on Bike', emoji: '🚴', muscle: 'Lower Body', impact: 'high', minutes: 12, kcal: 160, difficulty: 'hard' },
  { id: 'hiit-8', typeId: 'hiit', name: 'High Knees', emoji: '🏃‍♀️', muscle: 'Full Body', impact: 'medium', minutes: 8, kcal: 100, difficulty: 'easy' },
  { id: 'hiit-9', typeId: 'hiit', name: 'Skater Jump', emoji: '⛸️', muscle: 'Lower Body', impact: 'high', minutes: 10, kcal: 110, difficulty: 'med' },
  { id: 'hiit-10', typeId: 'hiit', name: 'Plank Jack', emoji: '🕷️', muscle: 'Core', impact: 'medium', minutes: 8, kcal: 90, difficulty: 'easy' },

  { id: 'yoga-1', typeId: 'yoga', name: 'Downward Dog', emoji: '🧘', muscle: 'Full Body', impact: 'low', minutes: 10, kcal: 60, difficulty: 'easy' },
  { id: 'yoga-2', typeId: 'yoga', name: 'Sun Salutation', emoji: '🌞', muscle: 'Full Body', impact: 'low', minutes: 15, kcal: 90, difficulty: 'easy' },
  { id: 'yoga-3', typeId: 'yoga', name: 'Warrior I', emoji: '⚔️', muscle: 'Lower Body', impact: 'low', minutes: 10, kcal: 70, difficulty: 'easy' },
  { id: 'yoga-4', typeId: 'yoga', name: 'Warrior II', emoji: '⚔️', muscle: 'Lower Body', impact: 'low', minutes: 10, kcal: 70, difficulty: 'easy' },
  { id: 'yoga-5', typeId: 'yoga', name: 'Tree Pose', emoji: '🌳', muscle: 'Full Body', impact: 'low', minutes: 8, kcal: 50, difficulty: 'easy' },
  { id: 'yoga-6', typeId: 'yoga', name: 'Bridge Pose', emoji: '🌉', muscle: 'Lower Body', impact: 'low', minutes: 10, kcal: 60, difficulty: 'med' },
  { id: 'yoga-7', typeId: 'yoga', name: 'Cobra Pose', emoji: '🐍', muscle: 'Upper Body', impact: 'low', minutes: 8, kcal: 50, difficulty: 'easy' },
  { id: 'yoga-8', typeId: 'yoga', name: 'Child Pose', emoji: '🧒', muscle: 'Full Body', impact: 'low', minutes: 8, kcal: 40, difficulty: 'easy' },
  { id: 'yoga-9', typeId: 'yoga', name: 'Cat-Cow Stretch', emoji: '🐱', muscle: 'Core', impact: 'low', minutes: 8, kcal: 45, difficulty: 'easy' },
  { id: 'yoga-10', typeId: 'yoga', name: 'Plank Pose', emoji: '🪵', muscle: 'Core', impact: 'low', minutes: 10, kcal: 70, difficulty: 'med' },
  { id: 'yoga-11', typeId: 'yoga', name: 'Triangle Pose', emoji: '🔺', muscle: 'Full Body', impact: 'low', minutes: 10, kcal: 60, difficulty: 'med' },
  { id: 'yoga-12', typeId: 'yoga', name: 'Seated Forward Fold', emoji: '🧘', muscle: 'Full Body', impact: 'low', minutes: 8, kcal: 45, difficulty: 'easy' },
  { id: 'yoga-13', typeId: 'yoga', name: 'Crow Pose', emoji: '🐦', muscle: 'Full Body', impact: 'low', minutes: 10, kcal: 80, difficulty: 'hard' },
  { id: 'yoga-14', typeId: 'yoga', name: 'Half Moon Pose', emoji: '🌙', muscle: 'Full Body', impact: 'low', minutes: 8, kcal: 55, difficulty: 'med' },
  { id: 'yoga-15', typeId: 'yoga', name: 'Corpse Pose', emoji: '😌', muscle: 'Full Body', impact: 'low', minutes: 8, kcal: 30, difficulty: 'easy' },

  { id: 'pilates-1', typeId: 'pilates', name: 'The Hundred', emoji: '1️⃣0️⃣0️⃣', muscle: 'Core', impact: 'low', minutes: 10, kcal: 70, difficulty: 'med' },
  { id: 'pilates-2', typeId: 'pilates', name: 'Roll-Up', emoji: '🌀', muscle: 'Core', impact: 'low', minutes: 10, kcal: 60, difficulty: 'easy' },
  { id: 'pilates-3', typeId: 'pilates', name: 'Leg Circle', emoji: '⭕', muscle: 'Core', impact: 'low', minutes: 10, kcal: 55, difficulty: 'easy' },
  { id: 'pilates-4', typeId: 'pilates', name: 'Double Leg Stretch', emoji: '🦵', muscle: 'Core', impact: 'low', minutes: 10, kcal: 65, difficulty: 'med' },
  { id: 'pilates-5', typeId: 'pilates', name: 'Single Leg Stretch', emoji: '🦵', muscle: 'Core', impact: 'low', minutes: 10, kcal: 60, difficulty: 'med' },
  { id: 'pilates-6', typeId: 'pilates', name: 'Scissor Kick', emoji: '✂️', muscle: 'Core', impact: 'low', minutes: 10, kcal: 70, difficulty: 'hard' },
  { id: 'pilates-7', typeId: 'pilates', name: 'Side Plank', emoji: '🟨', muscle: 'Core', impact: 'low', minutes: 10, kcal: 65, difficulty: 'med' },
  { id: 'pilates-8', typeId: 'pilates', name: 'Teaser', emoji: '🕯️', muscle: 'Core', impact: 'low', minutes: 10, kcal: 80, difficulty: 'hard' },
  { id: 'pilates-9', typeId: 'pilates', name: 'Swimming', emoji: '🏊', muscle: 'Full Body', impact: 'low', minutes: 10, kcal: 75, difficulty: 'med' },
  { id: 'pilates-10', typeId: 'pilates', name: 'Bridge Lift', emoji: '🌉', muscle: 'Lower Body', impact: 'low', minutes: 10, kcal: 60, difficulty: 'easy' },

  { id: 'tai_chi-1', typeId: 'tai_chi', name: 'Opening Form', emoji: '☯️', muscle: 'Full Body', impact: 'low', minutes: 15, kcal: 60, difficulty: 'easy' },
  { id: 'tai_chi-2', typeId: 'tai_chi', name: 'Ward Off', emoji: '🛡️', muscle: 'Full Body', impact: 'low', minutes: 15, kcal: 65, difficulty: 'easy' },
  { id: 'tai_chi-3', typeId: 'tai_chi', name: 'Repulse Monkey', emoji: '🐒', muscle: 'Full Body', impact: 'low', minutes: 15, kcal: 60, difficulty: 'med' },
  { id: 'tai_chi-4', typeId: 'tai_chi', name: 'Brush Knee', emoji: '🦵', muscle: 'Lower Body', impact: 'low', minutes: 15, kcal: 65, difficulty: 'med' },
  { id: 'tai_chi-5', typeId: 'tai_chi', name: 'Cloud Hands', emoji: '☁️', muscle: 'Full Body', impact: 'low', minutes: 15, kcal: 70, difficulty: 'med' },
  { id: 'tai_chi-6', typeId: 'tai_chi', name: 'Golden Rooster', emoji: '🐓', muscle: 'Full Body', impact: 'low', minutes: 15, kcal: 55, difficulty: 'hard' },
  { id: 'tai_chi-7', typeId: 'tai_chi', name: 'Fair Lady Works Shuttles', emoji: '🧵', muscle: 'Full Body', impact: 'low', minutes: 15, kcal: 70, difficulty: 'med' },
  { id: 'tai_chi-8', typeId: 'tai_chi', name: 'Closing Form', emoji: '🌀', muscle: 'Full Body', impact: 'low', minutes: 15, kcal: 50, difficulty: 'easy' },

  { id: 'crossfit-1', typeId: 'crossfit', name: 'Wall Ball', emoji: '🧱', muscle: 'Full Body', impact: 'medium', minutes: 12, kcal: 150, difficulty: 'hard' },
  { id: 'crossfit-2', typeId: 'crossfit', name: 'Clean & Jerk', emoji: '🏋️', muscle: 'Full Body', impact: 'high', minutes: 15, kcal: 200, difficulty: 'hard' },
  { id: 'crossfit-3', typeId: 'crossfit', name: 'Snatch', emoji: '🏋️', muscle: 'Full Body', impact: 'high', minutes: 15, kcal: 210, difficulty: 'hard' },
  { id: 'crossfit-4', typeId: 'crossfit', name: 'Thruster', emoji: '🏋️', muscle: 'Full Body', impact: 'high', minutes: 12, kcal: 160, difficulty: 'hard' },
  { id: 'crossfit-5', typeId: 'crossfit', name: 'Ring Dip', emoji: '⭕', muscle: 'Upper Body', impact: 'medium', minutes: 12, kcal: 120, difficulty: 'med' },
  { id: 'crossfit-6', typeId: 'crossfit', name: 'Handstand Push-Up', emoji: '🤸', muscle: 'Upper Body', impact: 'medium', minutes: 12, kcal: 110, difficulty: 'hard' },
  { id: 'crossfit-7', typeId: 'crossfit', name: 'Pistol Squat', emoji: '🔫', muscle: 'Lower Body', impact: 'medium', minutes: 12, kcal: 130, difficulty: 'hard' },
  { id: 'crossfit-8', typeId: 'crossfit', name: 'Farmer Carry', emoji: '🧺', muscle: 'Full Body', impact: 'medium', minutes: 12, kcal: 120, difficulty: 'med' },
  { id: 'crossfit-9', typeId: 'crossfit', name: 'Double Unders', emoji: '🤸', muscle: 'Full Body', impact: 'high', minutes: 10, kcal: 100, difficulty: 'med' },
  { id: 'crossfit-10', typeId: 'crossfit', name: 'Turkish Get-Up', emoji: '🕴️', muscle: 'Full Body', impact: 'medium', minutes: 15, kcal: 130, difficulty: 'hard' },
  { id: 'crossfit-11', typeId: 'crossfit', name: 'Row 500m Sprint', emoji: '🚣', muscle: 'Full Body', impact: 'high', minutes: 10, kcal: 140, difficulty: 'med' },
  { id: 'crossfit-12', typeId: 'crossfit', name: 'Rope Climb', emoji: '🪢', muscle: 'Full Body', impact: 'medium', minutes: 10, kcal: 120, difficulty: 'hard' },

  { id: 'swimming-1', typeId: 'swimming', name: 'Freestyle Laps', emoji: '🏊', muscle: 'Full Body', impact: 'low', minutes: 25, kcal: 280, difficulty: 'med' },
  { id: 'swimming-2', typeId: 'swimming', name: 'Breaststroke', emoji: '🏊', muscle: 'Full Body', impact: 'low', minutes: 25, kcal: 240, difficulty: 'easy' },
  { id: 'swimming-3', typeId: 'swimming', name: 'Backstroke', emoji: '🏊', muscle: 'Full Body', impact: 'low', minutes: 25, kcal: 220, difficulty: 'easy' },
  { id: 'swimming-4', typeId: 'swimming', name: 'Butterfly', emoji: '🦋', muscle: 'Full Body', impact: 'low', minutes: 20, kcal: 300, difficulty: 'hard' },
  { id: 'swimming-5', typeId: 'swimming', name: 'Kickboard Drills', emoji: '🦵', muscle: 'Lower Body', impact: 'low', minutes: 15, kcal: 140, difficulty: 'easy' },
  { id: 'swimming-6', typeId: 'swimming', name: 'Interval Sprints', emoji: '⚡', muscle: 'Full Body', impact: 'medium', minutes: 20, kcal: 320, difficulty: 'hard' },

  { id: 'cycling-1', typeId: 'cycling', name: 'Endurance Ride', emoji: '🚴', muscle: 'Lower Body', impact: 'low', minutes: 40, kcal: 360, difficulty: 'easy' },
  { id: 'cycling-2', typeId: 'cycling', name: 'Hill Climb', emoji: '⛰️', muscle: 'Lower Body', impact: 'medium', minutes: 30, kcal: 320, difficulty: 'med' },
  { id: 'cycling-3', typeId: 'cycling', name: 'Interval Blocks', emoji: '⏱️', muscle: 'Lower Body', impact: 'medium', minutes: 30, kcal: 340, difficulty: 'hard' },
  { id: 'cycling-4', typeId: 'cycling', name: 'Recovery Spin', emoji: '🌀', muscle: 'Lower Body', impact: 'low', minutes: 25, kcal: 180, difficulty: 'easy' },
  { id: 'cycling-5', typeId: 'cycling', name: 'Tempo Ride', emoji: '⏩', muscle: 'Lower Body', impact: 'medium', minutes: 35, kcal: 350, difficulty: 'med' },
  { id: 'cycling-6', typeId: 'cycling', name: 'Standing Climb', emoji: '🧗', muscle: 'Lower Body', impact: 'medium', minutes: 20, kcal: 260, difficulty: 'med' },
  { id: 'cycling-7', typeId: 'cycling', name: 'Sprint Repeats', emoji: '💨', muscle: 'Lower Body', impact: 'medium', minutes: 25, kcal: 300, difficulty: 'hard' },

  { id: 'running-1', typeId: 'running', name: 'Easy Run', emoji: '🏃‍♂️', muscle: 'Full Body', impact: 'high', minutes: 30, kcal: 300, difficulty: 'easy' },
  { id: 'running-2', typeId: 'running', name: 'Tempo Run', emoji: '⏩', muscle: 'Full Body', impact: 'high', minutes: 25, kcal: 280, difficulty: 'med' },
  { id: 'running-3', typeId: 'running', name: 'Fartlek', emoji: '🎢', muscle: 'Full Body', impact: 'high', minutes: 25, kcal: 290, difficulty: 'med' },
  { id: 'running-4', typeId: 'running', name: 'Hill Repeats', emoji: '⛰️', muscle: 'Lower Body', impact: 'high', minutes: 20, kcal: 250, difficulty: 'hard' },
  { id: 'running-5', typeId: 'running', name: 'Long Run', emoji: '🛣️', muscle: 'Full Body', impact: 'high', minutes: 50, kcal: 520, difficulty: 'hard' },
  { id: 'running-6', typeId: 'running', name: 'Track Intervals', emoji: '🏟️', muscle: 'Full Body', impact: 'high', minutes: 25, kcal: 310, difficulty: 'hard' },
  { id: 'running-7', typeId: 'running', name: 'Progression Run', emoji: '📈', muscle: 'Full Body', impact: 'high', minutes: 30, kcal: 320, difficulty: 'med' },
  { id: 'running-8', typeId: 'running', name: 'Recovery Jog', emoji: '🐢', muscle: 'Full Body', impact: 'low', minutes: 20, kcal: 150, difficulty: 'easy' },

  { id: 'boxing-1', typeId: 'boxing', name: 'Shadow Boxing', emoji: '🥊', muscle: 'Full Body', impact: 'medium', minutes: 12, kcal: 130, difficulty: 'easy' },
  { id: 'boxing-2', typeId: 'boxing', name: 'Heavy Bag', emoji: '🪨', muscle: 'Full Body', impact: 'high', minutes: 12, kcal: 160, difficulty: 'med' },
  { id: 'boxing-3', typeId: 'boxing', name: 'Speed Bag', emoji: '⚡', muscle: 'Upper Body', impact: 'medium', minutes: 10, kcal: 100, difficulty: 'easy' },
  { id: 'boxing-4', typeId: 'boxing', name: 'Pad Work', emoji: '🧤', muscle: 'Full Body', impact: 'high', minutes: 12, kcal: 150, difficulty: 'med' },
  { id: 'boxing-5', typeId: 'boxing', name: 'Double-End Bag', emoji: '🎯', muscle: 'Full Body', impact: 'medium', minutes: 12, kcal: 130, difficulty: 'med' },
  { id: 'boxing-6', typeId: 'boxing', name: 'Jump Rope', emoji: '🤸', muscle: 'Full Body', impact: 'high', minutes: 10, kcal: 120, difficulty: 'easy' },
  { id: 'boxing-7', typeId: 'boxing', name: 'Footwork Drills', emoji: '🦶', muscle: 'Lower Body', impact: 'medium', minutes: 12, kcal: 110, difficulty: 'easy' },
  { id: 'boxing-8', typeId: 'boxing', name: 'Body Hooks', emoji: '🥊', muscle: 'Full Body', impact: 'high', minutes: 10, kcal: 140, difficulty: 'med' },
  { id: 'boxing-9', typeId: 'boxing', name: 'Uppercut Combo', emoji: '🦾', muscle: 'Upper Body', impact: 'high', minutes: 10, kcal: 130, difficulty: 'med' },
  { id: 'boxing-10', typeId: 'boxing', name: 'Sparring Rounds', emoji: '🛡️', muscle: 'Full Body', impact: 'high', minutes: 15, kcal: 200, difficulty: 'hard' },

  { id: 'dance-1', typeId: 'dance', name: 'Zumba', emoji: '💃', muscle: 'Full Body', impact: 'medium', minutes: 30, kcal: 280, difficulty: 'easy' },
  { id: 'dance-2', typeId: 'dance', name: 'Hip-Hop Routine', emoji: '🎧', muscle: 'Full Body', impact: 'medium', minutes: 25, kcal: 230, difficulty: 'med' },
  { id: 'dance-3', typeId: 'dance', name: 'Salsa Basics', emoji: '💃', muscle: 'Full Body', impact: 'medium', minutes: 25, kcal: 210, difficulty: 'easy' },
  { id: 'dance-4', typeId: 'dance', name: 'Ballet Barre', emoji: '🩰', muscle: 'Full Body', impact: 'low', minutes: 25, kcal: 180, difficulty: 'med' },
  { id: 'dance-5', typeId: 'dance', name: 'Jazz Cardio', emoji: '🎷', muscle: 'Full Body', impact: 'high', minutes: 25, kcal: 250, difficulty: 'med' },
  { id: 'dance-6', typeId: 'dance', name: 'Latin Fusion', emoji: '🔥', muscle: 'Full Body', impact: 'high', minutes: 25, kcal: 260, difficulty: 'med' },
  { id: 'dance-7', typeId: 'dance', name: 'Dance HIIT', emoji: '⚡', muscle: 'Full Body', impact: 'high', minutes: 20, kcal: 240, difficulty: 'hard' },
  { id: 'dance-8', typeId: 'dance', name: 'Afrobeat Flow', emoji: '🥁', muscle: 'Full Body', impact: 'medium', minutes: 25, kcal: 230, difficulty: 'med' },
  { id: 'dance-9', typeId: 'dance', name: 'Cardio Core Dance', emoji: '💫', muscle: 'Full Body', impact: 'high', minutes: 20, kcal: 220, difficulty: 'hard' },
];

export const getWizardExercisesByType = (typeId: string): ExerciseItem[] =>
  WIZARD_EXERCISES.filter((e) => e.typeId === typeId);

export const getWizardExerciseType = (typeId: string): ExerciseTypeMeta | undefined =>
  WIZARD_EXERCISE_TYPES.find((t) => t.id === typeId);