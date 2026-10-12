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
  reviewedLoanwords?: Array<'de' | 'fr' | 'es'>;
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

const GERMAN_NAME_OVERRIDES: Record<string, string> = {
  ba3: 'Yoga-Baumhaltung',
  ba4: 'BOSU-Kniebeugen',
  ba5: 'Tandemstand',
  ba6: 'Uhrzeiger-Reichweiten-Übung',
  ba7: 'Überkreuz-Step-ups',
  ba8: 'Flamingo-Stand mit geschlossenen Augen',
  ba9: 'Einbeiniges Kreuzheben (leicht)',
  ba10: 'Hüftkreis-Stabilisierung',
  ba11: 'Knieanziehen auf dem Gymnastikball',
  ba12: 'Fersenheben mit geschlossenen Augen',
  ba13: 'Gleichgewicht mit verschränkten Armen im Stand',
  ba14: 'Balancieren auf dem Schwebebalken',
  ba15: 'Gleichgewicht beim Aufstehen und Hinsetzen',
  ba16: 'Marschieren auf dem BOSU-Ball',
  ba17: 'Kreuzschritt-Gehen',
  ba18: 'Gleichgewichtsübung mit Wanddruck',
  ba19: 'Hütchen antippen',
  ba20: 'Yoga-Krieger III',
  ba21: 'Flugzeug-Antippübung',
  ba22: 'Step-Taps mit Zehenheben',
  ba23: 'Medizinball im Gleichgewicht fangen',
  ba24: 'Gehen mit Drehungen',
  ba25: 'Kniebeugen auf instabiler Unterlage',
  ba26: 'Golfschwung-Simulator',
  ba27: 'Überkreuz-Ausfallschritte im Gehen',
  ba28: 'Gehen mit Knieheben',
  ba29: 'Halbmondhaltung',
  ba30: 'Gleichgewichtsübungen auf der Koordinationsleiter',
  ca7: 'Crosstrainer',
  ca9: 'Liegeergometer',
  ca10: 'Power-Walking-Intervalle',
  ca11: 'Gehen auf dem Steigungslaufband',
  ca12: 'Wandern im Freien',
  ca13: 'Kickbox-Cardio',
  ca14: 'Aerobic-Tanzen',
  ca15: 'Seilspring-Übung',
  ca16: 'Geh-Lauf-Intervalle',
  ca17: 'Wassergymnastik',
  ca18: 'Skater-Sprünge mit geringer Belastung',
  ca19: 'Schattenboxen',
  ca20: 'Step-Aerobic mit geringer Belastung',
  ca21: 'Moderates Spinning',
  ca22: 'Trail-Laufintervalle',
  ca24: 'Ruderintervalle',
  ca25: 'Cardio-Training auf dem Stuhl',
  ca26: 'Mountainbiken auf befestigten Wegen',
  ca27: 'Leichte Schlagkombinationen (HIIT)',
  ca28: 'Leichter Schlittenschub',
  ca29: 'Niedrigintensives Ausdauertraining (LISS)',
  ca30: 'Vorbereitung auf einen betreuten Laufbandtest',
  fl1: 'Vinyasa-Yoga-Flow',
  fl4: 'Faszienrollen',
  fl6: 'Katze-Kuh-Dehnung',
  fl7: 'Stehende Dehnung der hinteren Oberschenkelmuskulatur',
  fl8: 'Brustöffner an der Tür',
  fl10: 'Herabschauender Hund',
  fl11: 'Sitzende Vorbeuge',
  fl13: 'Stehende Wadendehnung',
  fl14: 'Die beste Dehnung der Welt',
  fl15: 'Tiefe Kniebeuge halten',
  fl16: 'Schultermobilisierung mit Band',
  fl17: 'Beine an der Wand hochlagern',
  fl18: 'Kindeshaltung',
  fl19: 'Nadel einfädeln',
  fl20: 'Handgelenk-Dehnroutine',
  fl21: 'Ausfallschritt-Matrix',
  fl22: 'Wirbelsäulendrehung',
  fl23: 'Sprunggelenk-Mobilitätsübung',
  fl24: 'Wandgleiten zur Haltungskorrektur',
  fl25: 'Erholende Ganzkörperdehnung',
  fl26: 'Schulterdehnung an der Wand',
  fl27: 'PDF-Dehnroutine für die hintere Oberschenkelmuskulatur',
  fl28: 'Seitliche Quadrizeps-Dehnung im Liegen',
  fl29: 'Rotation der Brustwirbelsäule',
  fl30: 'Windmühlen-Dehnung mit Handtuch',
  fu4: 'Bauerngehen mit Gewichten',
  fu5: 'Bärenkrabbeln',
  fu6: 'Schulterheben mit Sandsack',
  fu7: 'TRX-Rudern',
  fu8: 'Holzhacker am Kabelzug',
  fu9: 'Reifen umdrehen (leicht)',
  fu10: 'Vom Kasten herabsteigen',
  fu11: 'Vorschlaghammer-Schwingen',
  fu12: 'Kreuzheben mit Widerstandsband',
  fu13: 'Kniender Latzug am Kabel',
  fu14: 'Marschieren mit Zusatzgewicht',
  fu15: 'Abwechselnde Wellen mit dem Kampftau',
  fu17: 'Band auseinanderziehen',
  fu18: 'TRX-Rollout',
  fu19: 'Wandsitz mit Trageübung',
  fu20: 'Medizinball-Rotationswurf',
  fu21: 'Schlitten rückwärts ziehen',
  fu22: 'Beinbeugen mit Gymnastikball',
  fu23: 'Seilklettern am Gerät',
  fu24: 'Hürdensteigen',
  fu25: 'Sandsack-Umsetzen',
  fu26: 'Balanciergang auf den Zehenspitzen',
  fu27: 'Fußarbeit mit dem Springseil',
  fu28: 'Türkisches Aufstehen (leicht)',
  fu29: 'Kniebeugen mit Gymnastikball an der Wand',
  fu30: 'Prowler-Schieben (leicht bis mittel)',
  hi5: 'Boxsprünge',
  hi6: 'Schläge mit dem Kampftau',
  hi7: 'Fahrradsprint-Intervalle',
  hi8: 'Liegestützstütz mit Hampelmannsprung',
  hi9: 'Schnelle seitliche Schrittfolgen',
  hi10: 'Kettlebell-Swing-Intervalle',
  hi11: 'SkiErg-Intervalle',
  hi12: 'Tabata-Liegestütze',
  hi13: 'Froschsprünge',
  hi14: 'Raupenübung mit Liegestütz',
  hi15: 'Hampelmänner mit geringer Belastung',
  hi16: 'Medizinball-Schläge',
  hi17: 'Assault-Bike-Sprints',
  hi18: 'Sprint-und-Seitwärtsschritt-Kombination',
  hi19: 'Fahrrad-Sprints in Rückenlage',
  hi20: 'Leichtes Umsetzen und Drücken mit Kurzhanteln',
  hi21: 'Bärengang-Sprints',
  hi22: '250-Meter-Rudersprints',
  hi23: 'Parkour-Runden im Freien',
  hi24: 'Tabata-Burpees',
  hi25: 'Schnelle Kastenaufstiege',
  hi26: 'Explosive Ausfallschritte',
  hi27: 'Plyometrische Liegestütze',
  hi28: 'Dynamischer Rumpfzirkel',
  hi29: 'Wasser-Rudersprints',
  hi30: 'Intensives Cardio-Intervall',
  mb3: 'Tiefenatmungsübungen',
  mb4: 'Körperreise zur Entspannung',
  mb6: 'Progressive Muskelentspannung',
  mb7: 'Geführte Visualisierung',
  mb8: 'Meditation der liebenden Güte',
  mb9: 'Qigong-Atemfluss',
  mb10: 'Achtsames Gehen',
  mb11: 'Boxatmung',
  mb12: 'Dankbarkeitstagebuch',
  mb13: 'Stuhl-Yoga',
  mb15: 'Stehmeditation',
  mb16: 'Klangbad-Entspannung',
  mb17: 'Chakra-Ausgleichsfluss',
  mb18: 'Körperwahrnehmungsroutine',
  mb19: 'Atemfokussierter Spaziergang',
  mb20: 'Schlafenszeit-Ritual',
  mb21: 'Wechselatmung mit Atemanhalten',
  mb22: 'Achtsames Tee-Ritual',
  mb23: 'Morgenintention festlegen',
  mb24: 'Spaziergänge voller Staunen',
  mb25: 'Kurzer Rückzugs-Flow',
  mb26: 'Gleichmäßige Atmung',
  mb27: 'Übung zur Naturverbundenheit',
  mb28: 'Digitale Auszeit',
  mb29: 'Ausdrucksschreiben',
  mb30: 'Achtsamer Körper-Reset',
  st19: 'Hüftheben mit Langhantel',
  st22: 'Gesichtszug am Kabel',
  st30: 'Pallof-Press',
  'legacy-strength-barbell-row': 'Langhantelrudern',
  'legacy-strength-triceps-dip': 'Trizeps-Dips',
  'legacy-crossfit-wall-ball': 'Medizinballwurf gegen die Wand',
  'legacy-crossfit-clean-and-jerk': 'Umsetzen und Stoßen',
  'legacy-crossfit-snatch': 'Reißen',
  'legacy-crossfit-thruster': 'Kniebeuge mit Überkopfdrücken',
  'legacy-crossfit-ring-dip': 'Dips an den Ringen',
  'legacy-crossfit-handstand-push-up': 'Liegestütze im Handstand',
  'legacy-crossfit-pistol-squat': 'Einbeinige Kniebeuge',
  'legacy-crossfit-double-unders': 'Doppeldurchschläge beim Seilspringen',
};

const FRENCH_NAME_OVERRIDES: Record<string, string> = {
  fu18: 'Déploiement du corps en TRX',
  hi24: 'Burpees Tabata',
  st25: 'Flexion de hanches buste penché (good morning)',
  'legacy-strength-barbell-row': 'Tirage horizontal à la barre',
  'legacy-strength-triceps-dip': 'Dips pour les triceps',
  'legacy-crossfit-wall-ball': 'Lancer de médecine-ball contre le mur',
  'legacy-crossfit-clean-and-jerk': 'Épaulé-jeté',
  'legacy-crossfit-snatch': 'Arraché',
  'legacy-crossfit-thruster': 'Squat avec développé au-dessus de la tête',
  'legacy-crossfit-ring-dip': 'Dips aux anneaux',
  'legacy-crossfit-handstand-push-up': 'Pompes en équilibre sur les mains',
  'legacy-crossfit-pistol-squat': 'Squat sur une jambe',
  'legacy-crossfit-double-unders': 'Doubles sauts à la corde',
};

const SPANISH_NAME_OVERRIDES: Record<string, string> = {
  ca13: 'Cardio de kickboxing',
  hi24: 'Burpees Tabata',
  'legacy-strength-barbell-row': 'Remo con barra',
  'legacy-strength-triceps-dip': 'Fondos de tríceps',
  'legacy-crossfit-wall-ball': 'Lanzamiento de balón medicinal contra la pared',
  'legacy-crossfit-clean-and-jerk': 'Cargada y envión',
  'legacy-crossfit-snatch': 'Arrancada',
  'legacy-crossfit-thruster': 'Sentadilla con press por encima de la cabeza',
  'legacy-crossfit-ring-dip': 'Fondos en anillas',
  'legacy-crossfit-handstand-push-up': 'Flexiones en pino',
  'legacy-crossfit-pistol-squat': 'Sentadilla a una pierna',
  'legacy-crossfit-double-unders': 'Saltos dobles de comba',
};

const REVIEWED_UNCHANGED_LOANWORDS: Record<string, Array<'de' | 'fr' | 'es'>> = {
  ca8: ['fr'],
  ca23: ['de'],
  fl3: ['de', 'fr', 'es'],
  hi1: ['de', 'fr', 'es'],
  mb1: ['de'],
  mb2: ['de', 'fr', 'es'],
  mb5: ['de'],
  mb14: ['de', 'fr', 'es'],
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
].map((exercise) => ({
  ...exercise,
  nameDe: GERMAN_NAME_OVERRIDES[exercise.id] ?? exercise.nameDe ?? '',
  nameFr: FRENCH_NAME_OVERRIDES[exercise.id] ?? exercise.nameFr,
  nameEs: SPANISH_NAME_OVERRIDES[exercise.id] ?? exercise.nameEs,
  ...(REVIEWED_UNCHANGED_LOANWORDS[exercise.id]
    ? { reviewedLoanwords: [...REVIEWED_UNCHANGED_LOANWORDS[exercise.id]] }
    : {}),
}));

export const UNIFIED_EXERCISE_COUNT = UNIFIED_EXERCISES.length;
