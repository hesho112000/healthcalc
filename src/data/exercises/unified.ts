import type { Exercise, ExerciseDifficulty, ExerciseEquipment, ExerciseType, MuscleGroup } from './types';
import { balanceExercises } from './balance-full';
import { cardioExercises } from './cardio-full';
import { flexibilityExercises } from './flexibility-full';
import { functionalExercises } from './functional-full';
import { hiitExercises } from './hiit-full';
import { mindbodyExercises } from './mindbody-full';
import { strengthExercises } from './strength-full';

export type UnifiedEquipment = ExerciseEquipment | 'medicine_ball' | 'rings' | 'jump_rope' | 'chair' | 'wall' | 'water' | 'resistance-band' | 'dumbbell' | 'bike' | 'treadmill';

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
  targetAudience?: string[];
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
const PENDING_REVIEW: Pick<UnifiedExercise, 'reviewStatus'> = {
  reviewStatus: 'needs_review',
};

const LEGACY_UNIQUE_EXERCISES: UnifiedExercise[] = [
  {
    id: 'legacy-strength-barbell-row', type: 'strength' as const, category: 'strength' as ExerciseType,
    name: 'Barbell Row', nameEn: 'Barbell Row', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'barbell', muscleGroup: 'back', goals: ['gain_muscle', 'maintain'], difficulty: 'intermediate',
    sets: 3, reps: '8-12', sourceSets: '3×8-12', duration: '15 min', sourceFile: 'legacy-unique', calories: 100, refs: [], ...PENDING_REVIEW,
  },
  {
    id: 'legacy-strength-triceps-dip', type: 'strength' as const, category: 'strength' as ExerciseType,
    name: 'Triceps Dip', nameEn: 'Triceps Dip', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'bodyweight', muscleGroup: 'triceps', goals: ['gain_muscle', 'maintain'], difficulty: 'intermediate',
    sets: 3, reps: '8-12', sourceSets: '3×8-12', duration: '12 min', sourceFile: 'legacy-unique', calories: 70, refs: [], ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-wall-ball', type: 'functional', category: 'functional',
    name: 'Wall Ball', nameEn: 'Wall Ball', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'medicine_ball', muscleGroup: 'full_body', goals: ['lose_weight', 'gain_muscle'], difficulty: 'intermediate',
    sets: 4, reps: '12', sourceSets: '4×12', duration: '12 min', sourceFile: 'legacy-unique', calories: 120, refs: [], ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-clean-and-jerk', type: 'functional', category: 'functional',
    name: 'Clean & Jerk', nameEn: 'Clean & Jerk', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'barbell', muscleGroup: 'full_body', goals: ['gain_muscle'], difficulty: 'advanced',
    sets: 5, reps: '3', sourceSets: '5×3', duration: '15 min', sourceFile: 'legacy-unique', calories: 150, refs: [], ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-snatch', type: 'functional', category: 'functional',
    name: 'Snatch', nameEn: 'Snatch', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'barbell', muscleGroup: 'full_body', goals: ['gain_muscle'], difficulty: 'advanced',
    sets: 5, reps: '3', sourceSets: '5×3', duration: '15 min', sourceFile: 'legacy-unique', calories: 150, refs: [], ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-thruster', type: 'functional', category: 'functional',
    name: 'Thruster', nameEn: 'Thruster', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'barbell', muscleGroup: 'full_body', goals: ['lose_weight', 'gain_muscle'], difficulty: 'advanced',
    sets: 4, reps: '8', sourceSets: '4×8', duration: '15 min', sourceFile: 'legacy-unique', calories: 140, refs: [], ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-ring-dip', type: 'functional', category: 'functional',
    name: 'Ring Dip', nameEn: 'Ring Dip', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'rings', muscleGroup: 'triceps', goals: ['gain_muscle'], difficulty: 'advanced',
    sets: 3, reps: '6-8', sourceSets: '3×6-8', duration: '12 min', sourceFile: 'legacy-unique', calories: 100, refs: [], ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-handstand-push-up', type: 'functional', category: 'functional',
    name: 'Handstand Push-Up', nameEn: 'Handstand Push-Up', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'bodyweight', muscleGroup: 'shoulders', goals: ['gain_muscle'], difficulty: 'advanced',
    sets: 3, reps: '5', sourceSets: '3×5', duration: '12 min', sourceFile: 'legacy-unique', calories: 100, refs: [], ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-pistol-squat', type: 'functional', category: 'functional',
    name: 'Pistol Squat', nameEn: 'Pistol Squat', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'bodyweight', muscleGroup: 'quads', goals: ['gain_muscle', 'maintain'], difficulty: 'advanced',
    sets: 3, reps: '6 per side', sourceSets: '3×6 per side', duration: '12 min', sourceFile: 'legacy-unique', calories: 100, refs: [], ...PENDING_REVIEW,
  },
  {
    id: 'legacy-crossfit-double-unders', type: 'hiit' as const, category: 'hiit' as ExerciseType,
    name: 'Double Unders', nameEn: 'Double Unders', nameFr: PENDING_TRANSLATION, nameEs: PENDING_TRANSLATION, nameDe: PENDING_TRANSLATION, nameAr: PENDING_TRANSLATION,
    equipment: 'jump_rope', muscleGroup: 'cardio_system', goals: ['lose_weight', 'cardio_health'], difficulty: 'advanced',
    sets: 5, reps: '30 seconds', sourceSets: '5×30 seconds', duration: '12 min', sourceFile: 'legacy-unique', calories: 120, refs: [], ...PENDING_REVIEW,
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

const BODY_CONCERN_EXERCISES: UnifiedExercise[] = [
  // 1. Belly Fat (bc1-bc8)
  { id: 'bc1', sourceFile: 'body-concerns', type: 'core' as ExerciseType, category: 'core' as ExerciseType, name: 'Bicycle Crunches', nameEn: 'Bicycle Crunches', nameAr: 'كرانش الدراجة', nameFr: 'Crunchs à vélo', nameEs: 'Abdominales bicicleta', nameDe: 'Fahrrad-Crunches', equipment: 'bodyweight', muscleGroup: 'core', goals: ['lose_weight','maintain'], difficulty: 'intermediate', sets: 3, reps: '12-15', sourceSets: '3×12-15', duration: '12 min', calories: 80, refs: [], ...PENDING_REVIEW },
  { id: 'bc2', sourceFile: 'body-concerns', type: 'core' as ExerciseType, category: 'core' as ExerciseType, name: 'Leg Raises', nameEn: 'Leg Raises', nameAr: 'رفع الساقين', nameFr: 'Relevés de jambes', nameEs: 'Elevación de piernas', nameDe: 'Beinheben', equipment: 'bodyweight', muscleGroup: 'core', goals: ['lose_weight','maintain'], difficulty: 'beginner', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },
  { id: 'bc3', sourceFile: 'body-concerns', type: 'core' as ExerciseType, category: 'core' as ExerciseType, name: 'Plank Variations', nameEn: 'Plank Variations', nameAr: 'تغيرات البلانك', nameFr: 'Variations de planche', nameEs: 'Variantes de plancha', nameDe: 'Plank-Variationen', equipment: 'bodyweight', muscleGroup: 'core', goals: ['lose_weight','maintain'], difficulty: 'intermediate', sets: 3, reps: '3-4', sourceSets: '3×3-4', duration: '12 min', calories: 80, refs: [], ...PENDING_REVIEW },
  { id: 'bc4', sourceFile: 'body-concerns', type: 'hiit' as ExerciseType, category: 'hiit' as ExerciseType, name: 'Mountain Climbers', nameEn: 'Mountain Climbers', nameAr: 'متسلق الجبال', nameFr: 'Montées de genoux', nameEs: 'Escaladores de montaña', nameDe: 'Bergsteiger', equipment: 'bodyweight', muscleGroup: 'core', goals: ['lose_weight','cardio_health'], difficulty: 'intermediate', sets: 4, reps: '40-45', sourceSets: '4×40-45', duration: '15 min', calories: 120, refs: [], ...PENDING_REVIEW },
  { id: 'bc5', sourceFile: 'body-concerns', type: 'core' as ExerciseType, category: 'core' as ExerciseType, name: 'Dead Bug', nameEn: 'Dead Bug', nameAr: 'الخلية الميتة', nameFr: 'Dead Bug', nameEs: 'Bug muerto', nameDe: 'Dead Bug', equipment: 'bodyweight', muscleGroup: 'core', goals: ['lose_weight','maintain','mobility'], difficulty: 'beginner', sets: 3, reps: '8-10', sourceSets: '3×8-10', duration: '10 min', calories: 60, refs: [], ...PENDING_REVIEW },
  { id: 'bc6', sourceFile: 'body-concerns', type: 'core' as ExerciseType, category: 'core' as ExerciseType, name: 'Hollow Body Hold', nameEn: 'Hollow Body Hold', nameAr: 'حمل الجسم المجوف', nameFr: 'Gainage corps creux', nameEs: 'Isometría cuerpo hueco', nameDe: 'Hohlkörper-Halte', equipment: 'bodyweight', muscleGroup: 'core', goals: ['lose_weight','maintain'], difficulty: 'intermediate', sets: 3, reps: '3-5', sourceSets: '3×3-5', duration: '10 min', calories: 60, refs: [], ...PENDING_REVIEW },
  { id: 'bc7', sourceFile: 'body-concerns', type: 'core' as ExerciseType, category: 'core' as ExerciseType, name: 'V-Ups', nameEn: 'V-Ups', nameAr: 'رفع الجسم على شكل V', nameFr: 'V-ups', nameEs: 'Abdominales en V', nameDe: 'V-Ups', equipment: 'bodyweight', muscleGroup: 'core', goals: ['lose_weight','gain_muscle'], difficulty: 'intermediate', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '12 min', calories: 80, refs: [], ...PENDING_REVIEW },
  { id: 'bc8', sourceFile: 'body-concerns', type: 'core' as ExerciseType, category: 'core' as ExerciseType, name: 'Reverse Crunches', nameEn: 'Reverse Crunches', nameAr: 'كرانش عكسي', nameFr: 'Crunch inversé', nameEs: 'Crunch inverso', nameDe: 'Umgekehrte Crunches', equipment: 'bodyweight', muscleGroup: 'core', goals: ['lose_weight','maintain'], difficulty: 'beginner', sets: 3, reps: '12-15', sourceSets: '3×12-15', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },

  // 2. Love Handles (bc9-bc16)
  { id: 'bc9', sourceFile: 'body-concerns', type: 'core' as ExerciseType, category: 'core' as ExerciseType, name: 'Russian Twists', nameEn: 'Russian Twists', nameAr: 'اللف الروسي', nameFr: 'Torsions russes', nameEs: 'Giros rusos', nameDe: 'Russische Drehungen', equipment: 'bodyweight', muscleGroup: 'core', goals: ['lose_weight','maintain'], difficulty: 'intermediate', sets: 3, reps: '12-15', sourceSets: '3×12-15', duration: '12 min', calories: 80, refs: [], ...PENDING_REVIEW },
  { id: 'bc10', sourceFile: 'body-concerns', type: 'core' as ExerciseType, category: 'core' as ExerciseType, name: 'Side Planks', nameEn: 'Side Planks', nameAr: 'بلانك جانبي', nameFr: 'Planche latérale', nameEs: 'Plancha lateral', nameDe: 'Seitplank', equipment: 'bodyweight', muscleGroup: 'core', goals: ['lose_weight','maintain'], difficulty: 'beginner', sets: 3, reps: '3-4', sourceSets: '3×3-4', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },
  { id: 'bc11', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Woodchoppers', nameEn: 'Woodchoppers', nameAr: 'قطع الخشب', nameFr: 'Fendeurs de bois', nameEs: 'Cortadores de madera', nameDe: 'Holzfällerbewegung', equipment: 'dumbbells', muscleGroup: 'core', goals: ['lose_weight','gain_muscle'], difficulty: 'intermediate', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '12 min', calories: 90, refs: [], ...PENDING_REVIEW },
  { id: 'bc12', sourceFile: 'body-concerns', type: 'core' as ExerciseType, category: 'core' as ExerciseType, name: 'Hanging Oblique Knee Raises', nameEn: 'Hanging Oblique Knee Raises', nameAr: 'رفع الركبتين المائل مع تعليق', nameFr: 'Relevés de genoux obliques en suspension', nameEs: 'Elevación oblicua de rodillas colgado', nameDe: 'Hängendes schräges Knieheben', equipment: 'pull_up_bar', muscleGroup: 'core', goals: ['lose_weight','gain_muscle'], difficulty: 'advanced', sets: 3, reps: '8-10', sourceSets: '3×8-10', duration: '12 min', calories: 100, refs: [], ...PENDING_REVIEW },
  { id: 'bc13', sourceFile: 'body-concerns', type: 'core' as ExerciseType, category: 'core' as ExerciseType, name: 'Windshield Wipers', nameEn: 'Windshield Wipers', nameAr: 'مساحات الزجاج', nameFr: 'Essuie-glaces', nameEs: 'Limpiaparabrisas', nameDe: 'Scheibenwischer', equipment: 'bodyweight', muscleGroup: 'core', goals: ['lose_weight','gain_muscle'], difficulty: 'advanced', sets: 3, reps: '8-10', sourceSets: '3×8-10', duration: '12 min', calories: 100, refs: [], ...PENDING_REVIEW },
  { id: 'bc14', sourceFile: 'body-concerns', type: 'core' as ExerciseType, category: 'core' as ExerciseType, name: 'Side Bends', nameEn: 'Side Bends', nameAr: 'انحناءات جانبية', nameFr: 'Inclinaisons latérales', nameEs: 'Inclinaciones laterales', nameDe: 'Seitneigungen', equipment: 'dumbbells', muscleGroup: 'core', goals: ['lose_weight','maintain'], difficulty: 'beginner', sets: 3, reps: '12-15', sourceSets: '3×12-15', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },
  { id: 'bc15', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Standing Oblique Twists', nameEn: 'Standing Oblique Twists', nameAr: 'تدوير جانبي واقف', nameFr: 'Rotations obliques debout', nameEs: 'Giros oblicuos de pie', nameDe: 'Stehende schräge Drehungen', equipment: 'bodyweight', muscleGroup: 'core', goals: ['lose_weight','maintain'], difficulty: 'beginner', sets: 3, reps: '12-15', sourceSets: '3×12-15', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },
  { id: 'bc16', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Diagonal Lunges', nameEn: 'Diagonal Lunges', nameAr: 'اندفاع قطري', nameFr: 'Fentes diagonales', nameEs: 'Zancadas diagonales', nameDe: 'Diagonale Ausfallschritte', equipment: 'bodyweight', muscleGroup: 'core', goals: ['lose_weight','gain_muscle','mobility'], difficulty: 'intermediate', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '12 min', calories: 90, refs: [], ...PENDING_REVIEW },

  // 3. Chest Sagging (bc17-bc24)
  { id: 'bc17', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Incline Push-ups', nameEn: 'Incline Push-ups', nameAr: 'ضغط مائل', nameFr: 'Pompes inclinées', nameEs: 'Flexiones inclinadas', nameDe: 'Schrägliegestütze', equipment: 'bodyweight', muscleGroup: 'chest', goals: ['gain_muscle','maintain'], difficulty: 'beginner', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },
  { id: 'bc18', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Incline Dumbbell Press', nameEn: 'Incline Dumbbell Press', nameAr: 'ضغط دمبل مائل', nameFr: 'Développé incliné avec haltères', nameEs: 'Press inclinado con mancuernas', nameDe: 'Schrägbankdrücken mit Kurzhanteln', equipment: 'dumbbells', muscleGroup: 'chest', goals: ['gain_muscle','maintain'], difficulty: 'intermediate', sets: 3, reps: '8-12', sourceSets: '3×8-12', duration: '12 min', calories: 90, refs: [], ...PENDING_REVIEW },
  { id: 'bc19', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Chest Fly', nameEn: 'Chest Fly', nameAr: 'طيران الصدر', nameFr: 'Écarté poitrine', nameEs: 'Apertura de pecho', nameDe: 'Brustfly', equipment: 'dumbbells', muscleGroup: 'chest', goals: ['gain_muscle','maintain'], difficulty: 'intermediate', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '12 min', calories: 80, refs: [], ...PENDING_REVIEW },
  { id: 'bc20', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Incline Bench Press', nameEn: 'Incline Bench Press', nameAr: 'ضغط بار مائل', nameFr: 'Développé couché incliné', nameEs: 'Press inclinado con barra', nameDe: 'Schrägbankdrücken', equipment: 'barbell', muscleGroup: 'chest', goals: ['gain_muscle','maintain'], difficulty: 'intermediate', sets: 3, reps: '8-12', sourceSets: '3×8-12', duration: '12 min', calories: 100, refs: [], ...PENDING_REVIEW },
  { id: 'bc21', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Dumbbell Pullover', nameEn: 'Dumbbell Pullover', nameAr: 'سحب دمبل فوق الرأس', nameFr: "Pullover avec haltère", nameEs: 'Pullover con mancuerna', nameDe: 'Kurzhantel-Pullover', equipment: 'dumbbells', muscleGroup: 'chest', goals: ['gain_muscle','maintain'], difficulty: 'intermediate', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 80, refs: [], ...PENDING_REVIEW },
  { id: 'bc22', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Pec Deck', nameEn: 'Pec Deck', nameAr: 'ماكينة الصدر', nameFr: 'Pec Deck', nameEs: 'Pec Deck', nameDe: 'Pec-Deck-Maschine', equipment: 'machine', muscleGroup: 'chest', goals: ['gain_muscle','maintain'], difficulty: 'beginner', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },
  { id: 'bc23', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Cable Crossover (low-to-high)', nameEn: 'Cable Crossover (low-to-high)', nameAr: 'تقاطع كابل من أسفل لأعلى', nameFr: "Crossover à la poulie (bas-haut)", nameEs: 'Cruce de poleas (de abajo a arriba)', nameDe: 'Kabelkreuz (unten-nach-oben)', equipment: 'cable', muscleGroup: 'chest', goals: ['gain_muscle','maintain'], difficulty: 'intermediate', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '12 min', calories: 90, refs: [], ...PENDING_REVIEW },
  { id: 'bc24', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Decline Push-ups', nameEn: 'Decline Push-ups', nameAr: 'ضغط مائل للأسفل', nameFr: 'Pompes déclives', nameEs: 'Flexiones declinadas', nameDe: 'Negative Liegestütze', equipment: 'bodyweight', muscleGroup: 'chest', goals: ['gain_muscle','maintain'], difficulty: 'advanced', sets: 3, reps: '6-10', sourceSets: '3×6-10', duration: '10 min', calories: 80, refs: [], ...PENDING_REVIEW },

  // 4. Arm Fat (bc25-bc32)
  { id: 'bc25', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Triceps Dips', nameEn: 'Triceps Dips', nameAr: 'حفر ثلاثية الرؤوس', nameFr: 'Dips triceps', nameEs: 'Fondos de tríceps', nameDe: 'Trizeps-Dips', equipment: 'bodyweight', muscleGroup: 'triceps', goals: ['gain_muscle','maintain'], difficulty: 'intermediate', sets: 3, reps: '8-12', sourceSets: '3×8-12', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },
  { id: 'bc26', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Overhead Triceps Extension', nameEn: 'Overhead Triceps Extension', nameAr: 'تمديد ثلاثية الرؤوس فوق الرأس', nameFr: 'Extension triceps au-dessus de la tête', nameEs: 'Extensión de tríceps por encima de la cabeza', nameDe: 'Überkopf-Trizepsstreckung', equipment: 'dumbbells', muscleGroup: 'triceps', goals: ['gain_muscle','maintain'], difficulty: 'intermediate', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },
  { id: 'bc27', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Triceps Kickbacks', nameEn: 'Triceps Kickbacks', nameAr: 'ركلات ثلاثية الرؤوس', nameFr: "Extensions triceps à l'arrière", nameEs: 'Patada de tríceps', nameDe: 'Trizeps-Kickbacks', equipment: 'dumbbells', muscleGroup: 'triceps', goals: ['gain_muscle','maintain'], difficulty: 'beginner', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 60, refs: [], ...PENDING_REVIEW },
  { id: 'bc28', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Skull Crushers', nameEn: 'Skull Crushers', nameAr: 'سحق الجمجمة', nameFr: 'Skull crushers', nameEs: 'Skull crushers', nameDe: 'Skull Crushers', equipment: 'barbell', muscleGroup: 'triceps', goals: ['gain_muscle','maintain'], difficulty: 'intermediate', sets: 3, reps: '8-12', sourceSets: '3×8-12', duration: '10 min', calories: 80, refs: [], ...PENDING_REVIEW },
  { id: 'bc29', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Close-Grip Push-ups', nameEn: 'Close-Grip Push-ups', nameAr: 'ضغط ضيق المسافة', nameFr: 'Pompes prise serrée', nameEs: 'Flexiones con agarre estrecho', nameDe: 'Enggrip-Liegestütze', equipment: 'bodyweight', muscleGroup: 'triceps', goals: ['gain_muscle','maintain'], difficulty: 'intermediate', sets: 3, reps: '8-12', sourceSets: '3×8-12', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },
  { id: 'bc30', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Hammer Curls', nameEn: 'Hammer Curls', nameAr: 'ثنيات المطرقة', nameFr: 'Curls marteau', nameEs: 'Curls martillo', nameDe: 'Hammer-Curls', equipment: 'dumbbells', muscleGroup: 'biceps', goals: ['gain_muscle','maintain'], difficulty: 'beginner', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },
  { id: 'bc31', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Concentration Curls', nameEn: 'Concentration Curls', nameAr: 'تمارين التركيز للذراع', nameFr: 'Curls concentrés', nameEs: 'Curls de concentración', nameDe: 'Konzentrations-Curls', equipment: 'dumbbells', muscleGroup: 'biceps', goals: ['gain_muscle','maintain'], difficulty: 'beginner', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },
  { id: 'bc32', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Diamond Push-ups', nameEn: 'Diamond Push-ups', nameAr: 'ضغط الماس', nameFr: 'Pompes diamant', nameEs: 'Flexiones diamante', nameDe: 'Diamant-Liegestütze', equipment: 'bodyweight', muscleGroup: 'triceps', goals: ['gain_muscle','maintain'], difficulty: 'intermediate', sets: 3, reps: '8-12', sourceSets: '3×8-12', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },

  // 5. Thigh Fat (bc33-bc40)
  { id: 'bc33', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Sumo Squats', nameEn: 'Sumo Squats', nameAr: 'سكوات سومو', nameFr: 'Squats sumo', nameEs: 'Sentadillas sumo', nameDe: 'Sumo-Kniebeugen', equipment: 'bodyweight', muscleGroup: 'quads', goals: ['lose_weight','gain_muscle'], difficulty: 'intermediate', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '12 min', calories: 90, refs: [], ...PENDING_REVIEW },
  { id: 'bc34', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Curtsy Lunges', nameEn: 'Curtsy Lunges', nameAr: 'اندفاع مع تقاطع', nameFr: "Fentes révérence", nameEs: 'Zancadas de cortesía', nameDe: 'Reverenz-Ausfallschritte', equipment: 'bodyweight', muscleGroup: 'glutes', goals: ['lose_weight','gain_muscle'], difficulty: 'intermediate', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '12 min', calories: 90, refs: [], ...PENDING_REVIEW },
  { id: 'bc35', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Side Lunges', nameEn: 'Side Lunges', nameAr: 'اندفاع جانبي', nameFr: 'Fentes latérales', nameEs: 'Zancadas laterales', nameDe: 'Seitliche Ausfallschritte', equipment: 'bodyweight', muscleGroup: 'glutes', goals: ['lose_weight','gain_muscle'], difficulty: 'intermediate', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '12 min', calories: 90, refs: [], ...PENDING_REVIEW },
  { id: 'bc36', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Bulgarian Split Squats', nameEn: 'Bulgarian Split Squats', nameAr: 'سكوات بلغاري مقسم', nameFr: 'Split squats bulgares', nameEs: 'Sentadillas búlgaras', nameDe: 'Bulgarische Split-Kniebeugen', equipment: 'bodyweight', muscleGroup: 'quads', goals: ['lose_weight','gain_muscle'], difficulty: 'intermediate', sets: 3, reps: '8-10', sourceSets: '3×8-10', duration: '12 min', calories: 90, refs: [], ...PENDING_REVIEW },
  { id: 'bc37', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Hip Thrusts', nameEn: 'Hip Thrusts', nameAr: 'دفع الورك', nameFr: 'Relevés de hanches', nameEs: 'Elevación de caderas', nameDe: 'Hüftstoß', equipment: 'bodyweight', muscleGroup: 'glutes', goals: ['gain_muscle','maintain'], difficulty: 'intermediate', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 80, refs: [], ...PENDING_REVIEW },
  { id: 'bc38', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Glute Bridges', nameEn: 'Glute Bridges', nameAr: 'جسر الألوية', nameFr: 'Pont fessier', nameEs: 'Puente glúteo', nameDe: 'Gesäßbrücke', equipment: 'bodyweight', muscleGroup: 'glutes', goals: ['lose_weight','maintain'], difficulty: 'beginner', sets: 3, reps: '12-15', sourceSets: '3×12-15', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },
  { id: 'bc39', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Wall Sits', nameEn: 'Wall Sits', nameAr: 'جلوس على الحائط', nameFr: 'Position murale isométrique', nameEs: 'Sentadilla estática contra pared', nameDe: 'Wandsitzen', equipment: 'bodyweight', muscleGroup: 'quads', goals: ['lose_weight','maintain'], difficulty: 'beginner', sets: 3, reps: '3-5', sourceSets: '3×3-5', duration: '10 min', calories: 60, refs: [], ...PENDING_REVIEW },
  { id: 'bc40', sourceFile: 'body-concerns', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Step-Ups', nameEn: 'Step-Ups', nameAr: 'صعود السلم', nameFr: 'Montées sur step', nameEs: 'Subidas al banco', nameDe: 'Step-ups', equipment: 'bodyweight', muscleGroup: 'quads', goals: ['lose_weight','gain_muscle'], difficulty: 'beginner', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 70, refs: [], ...PENDING_REVIEW },

  // 6. Low-Impact / Senior Friendly (li1-li8)
  { id: 'li1', sourceFile: 'low-impact', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Chair Squats', nameEn: 'Chair Squats', nameAr: 'سكوات الكرسي', nameFr: 'Squats sur chaise', nameEs: 'Sentadillas en silla', nameDe: 'Stuhl-Kniebeugen', equipment: 'chair', muscleGroup: 'quads', goals: ['maintain','mobility'], difficulty: 'beginner', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 50, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li2', sourceFile: 'low-impact', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Wall Push-ups', nameEn: 'Wall Push-ups', nameAr: 'ضغط الحائط', nameFr: 'Pompes au mur', nameEs: 'Flexiones en la pared', nameDe: 'Wand-Liegestütze', equipment: 'wall', muscleGroup: 'chest', goals: ['maintain','mobility'], difficulty: 'beginner', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 40, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li3', sourceFile: 'low-impact', type: 'cardio' as ExerciseType, category: 'cardio' as ExerciseType, name: 'Seated Marching', nameEn: 'Seated Marching', nameAr: 'مشي جالس', nameFr: 'Marche assise', nameEs: 'Marcha sentada', nameDe: 'Sitzendes Marschieren', equipment: 'chair', muscleGroup: 'cardio_system', goals: ['cardio_health','mobility'], difficulty: 'beginner', sets: 3, reps: '30-60 sec', sourceSets: '3×30-60 sec', duration: '10 min', calories: 40, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li4', sourceFile: 'low-impact', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Standing Calf Raises', nameEn: 'Standing Calf Raises', nameAr: 'رفع العجل واقف', nameFr: 'Relevés de mollets debout', nameEs: 'Elevación de pantorrillas de pie', nameDe: 'Stehende Wadenheben', equipment: 'bodyweight', muscleGroup: 'calves', goals: ['maintain','balance'], difficulty: 'beginner', sets: 3, reps: '12-15', sourceSets: '3×12-15', duration: '8 min', calories: 30, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li5', sourceFile: 'low-impact', type: 'flexibility' as ExerciseType, category: 'flexibility' as ExerciseType, name: 'Heel Slides', nameEn: 'Heel Slides', nameAr: 'انزلاق الكعب', nameFr: 'Glissements de talon', nameEs: 'Deslizamientos de talón', nameDe: 'Fersenrutschen', equipment: 'bodyweight', muscleGroup: 'mobility', goals: ['mobility','maintain'], difficulty: 'beginner', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '8 min', calories: 25, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li6', sourceFile: 'low-impact', type: 'cardio' as ExerciseType, category: 'cardio' as ExerciseType, name: 'Water Aerobics', nameEn: 'Water Aerobics', nameAr: 'تمارين مائية', nameFr: 'Aquagym', nameEs: 'Aeróbic acuático', nameDe: 'Wassergymnastik', equipment: 'water', muscleGroup: 'full_body', goals: ['cardio_health','mobility','maintain'], difficulty: 'beginner', sets: 1, reps: '30 min', sourceSets: '1×30 min', duration: '30 min', calories: 150, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li7', sourceFile: 'low-impact', type: 'flexibility' as ExerciseType, category: 'flexibility' as ExerciseType, name: 'Gentle Yoga Flow', nameEn: 'Gentle Yoga Flow', nameAr: 'تدفق يوغا لطيف', nameFr: 'Yoga doux', nameEs: 'Yoga suave', nameDe: 'Sanfter Yoga-Flow', equipment: 'bodyweight', muscleGroup: 'full_body', goals: ['mobility','maintain'], difficulty: 'beginner', sets: 1, reps: '15-20 min', sourceSets: '1×15-20 min', duration: '20 min', calories: 60, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li8', sourceFile: 'low-impact', type: 'mindbody' as ExerciseType, category: 'mindbody' as ExerciseType, name: 'Tai Chi Walking', nameEn: 'Tai Chi Walking', nameAr: 'مشي تاي تشي', nameFr: 'Marche Tai Chi', nameEs: 'Caminata Tai Chi', nameDe: 'Tai Chi Gehen', equipment: 'bodyweight', muscleGroup: 'full_body', goals: ['balance','mobility','mind_body'], difficulty: 'beginner', sets: 1, reps: '15-20 min', sourceSets: '1×15-20 min', duration: '20 min', calories: 70, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },

  // 7. Low-Impact / Senior Friendly Part 2 (li9-li16)
  { id: 'li9', sourceFile: 'low-impact', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Leg Extensions with Chair', nameEn: 'Leg Extensions with Chair', nameAr: 'تمديد الساق مع الكرسي', nameFr: 'Extensions de jambe sur chaise', nameEs: 'Extensiones de pierna con silla', nameDe: 'Beinstreckung mit Stuhl', equipment: 'chair', muscleGroup: 'quads', goals: ['maintain','mobility'], difficulty: 'beginner', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 40, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li10', sourceFile: 'low-impact', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Resistance Band Rows', nameEn: 'Resistance Band Rows', nameAr: 'تمارين سحب بالشريط', nameFr: 'Tirages avec bande élastique', nameEs: 'Remos con banda elástica', nameDe: 'Rudern mit Widerstandsband', equipment: 'resistance-band', muscleGroup: 'back', goals: ['maintain','mobility'], difficulty: 'beginner', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '10 min', calories: 50, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li11', sourceFile: 'low-impact', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Seated Shoulder Press', nameEn: 'Seated Shoulder Press', nameAr: 'ضغط الكتف جالس', nameFr: 'Développé épaules assis', nameEs: 'Press de hombros sentado', nameDe: 'Sitzender Schulterdruck', equipment: 'dumbbell', muscleGroup: 'shoulders', goals: ['maintain','mobility'], difficulty: 'beginner', sets: 3, reps: '8-10', sourceSets: '3×8-10', duration: '10 min', calories: 50, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li12', sourceFile: 'low-impact', type: 'cardio' as ExerciseType, category: 'cardio' as ExerciseType, name: 'Recumbent Bike', nameEn: 'Recumbent Bike', nameAr: 'دراجة مستلقية', nameFr: 'Vélo couché', nameEs: 'Bicicleta reclinada', nameDe: 'Liegerad', equipment: 'bike', muscleGroup: 'cardio_system', goals: ['cardio_health','mobility'], difficulty: 'beginner', sets: 1, reps: '20-30 min', sourceSets: '1×20-30 min', duration: '25 min', calories: 100, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li13', sourceFile: 'low-impact', type: 'cardio' as ExerciseType, category: 'cardio' as ExerciseType, name: 'Slow Walking on Treadmill', nameEn: 'Slow Walking on Treadmill', nameAr: 'مشي بطيء على المشاية', nameFr: 'Marche lente sur tapis', nameEs: 'Caminata lenta en cinta', nameDe: 'Langsames Gehen auf Laufband', equipment: 'treadmill', muscleGroup: 'cardio_system', goals: ['cardio_health','mobility'], difficulty: 'beginner', sets: 1, reps: '20-30 min', sourceSets: '1×20-30 min', duration: '25 min', calories: 100, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li14', sourceFile: 'low-impact', type: 'balance' as ExerciseType, category: 'balance' as ExerciseType, name: 'Bird Dog', nameEn: 'Bird Dog', nameAr: 'تمرين الطير والكلب', nameFr: 'Chien-oiseau', nameEs: 'Perro-pájaro', nameDe: 'Vogel-Hund', equipment: 'bodyweight', muscleGroup: 'core', goals: ['balance','mobility','maintain'], difficulty: 'beginner', sets: 3, reps: '8-10', sourceSets: '3×8-10', duration: '10 min', calories: 40, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li15', sourceFile: 'low-impact', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Modified Plank on Knees', nameEn: 'Modified Plank on Knees', nameAr: 'بلانك معدل على الركبتين', nameFr: 'Planche modifiée sur les genoux', nameEs: 'Plancha modificada en rodillas', nameDe: 'Modifizierter Plank auf Knien', equipment: 'bodyweight', muscleGroup: 'core', goals: ['maintain','mobility'], difficulty: 'beginner', sets: 3, reps: '20-30 sec', sourceSets: '3×20-30 sec', duration: '8 min', calories: 30, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
  { id: 'li16', sourceFile: 'low-impact', type: 'strength' as ExerciseType, category: 'strength' as ExerciseType, name: 'Seated Leg Lifts', nameEn: 'Seated Leg Lifts', nameAr: 'رفع الساقين جالس', nameFr: 'Relevés de jambes assis', nameEs: 'Elevación de piernas sentado', nameDe: 'Sitzende Beinheben', equipment: 'chair', muscleGroup: 'core', goals: ['maintain','mobility'], difficulty: 'beginner', sets: 3, reps: '10-12', sourceSets: '3×10-12', duration: '8 min', calories: 30, refs: [], targetAudience: ['seniors','low-impact','beginners'], ...PENDING_REVIEW },
];


export const UNIFIED_EXERCISES: UnifiedExercise[] = [
  ...SOURCE_GROUPS.flatMap(({ sourceFile, exercises }) => exercises.map((exercise) => canonicalize(exercise, sourceFile))),
  ...LEGACY_UNIQUE_EXERCISES,
  ...BODY_CONCERN_EXERCISES,
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
