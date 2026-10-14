import { useEffect, useState } from 'react';
import { UNIFIED_EXERCISES } from '../data/exercises/unified';
import type { ExerciseDifficulty, ExerciseType, MuscleGroup } from '../data/exercises/types';
import type { UnifiedEquipment, UnifiedExercise } from '../data/exercises/unified';
import { supabaseClient } from '../lib/supabaseClient';

type ExerciseRow = Record<string, unknown>;

const asString = (value: unknown, fallback = ''): string => typeof value === 'string' ? value : fallback;
const asNumber = (value: unknown): number | undefined => typeof value === 'number' && Number.isFinite(value) ? value : undefined;
const asStringArray = (value: unknown): string[] => Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

function rowToExercise(row: ExerciseRow): UnifiedExercise {
  const nameEn = asString(row.name_en);
  const bmiRange = Array.isArray(row.bmi_range) && row.bmi_range.length === 2
    ? [Number(row.bmi_range[0]), Number(row.bmi_range[1])] as [number, number]
    : undefined;
  const unit = row.unit === 'reps' || row.unit === 'steps' || row.unit === 'meters' ? row.unit : undefined;

  return {
    id: asString(row.id),
    type: asString(row.type, 'strength') as ExerciseType,
    category: asString(row.category, asString(row.type, 'strength')) as ExerciseType,
    name: asString(row.name, nameEn),
    nameEn,
    nameAr: asString(row.name_ar, nameEn),
    nameFr: asString(row.name_fr, nameEn),
    nameEs: asString(row.name_es, nameEn),
    nameDe: asString(row.name_de, nameEn),
    equipment: asString(row.equipment, 'none') as UnifiedEquipment,
    muscleGroup: asString(row.muscle_group, 'full_body') as MuscleGroup,
    goals: asStringArray(row.goals),
    difficulty: asString(row.difficulty, 'beginner') as ExerciseDifficulty,
    calories: asNumber(row.calories) ?? 0,
    caloriesPerSession: asNumber(row.calories_per_session),
    duration: asString(row.duration),
    sets: asNumber(row.sets) ?? null,
    reps: asNumber(row.reps),
    repsMin: asNumber(row.reps_min),
    repsMax: asNumber(row.reps_max),
    timedDuration: asNumber(row.timed_duration),
    timedDurationMin: asNumber(row.timed_duration_min),
    timedDurationMax: asNumber(row.timed_duration_max),
    perSide: typeof row.per_side === 'boolean' ? row.per_side : undefined,
    unit,
    restSeconds: asNumber(row.rest_seconds),
    sourceSets: asString(row.source_sets),
    bmiRange,
    contraindications: asStringArray(row.contraindications),
    refs: asStringArray(row.refs),
    tipEn: asString(row.tip_en) || undefined,
    tipFr: asString(row.tip_fr) || undefined,
    tipEs: asString(row.tip_es) || undefined,
    tipAr: asString(row.tip_ar) || undefined,
    sourceFile: asString(row.source_file),
    aliases: asStringArray(row.aliases),
    reviewedLoanwords: asStringArray(row.reviewed_loanwords).filter((language): language is 'de' | 'fr' | 'es' => ['de', 'fr', 'es'].includes(language)),
    reviewStatus: row.review_status === 'needs_review' ? 'needs_review' : undefined,
    targetAudience: asStringArray(row.target_audience),
    bodyConcerns: asStringArray(row.body_concerns),
  };
}

export interface UseUnifiedExercisesResult {
  exercises: UnifiedExercise[];
  loading: boolean;
  error: string | null;
}

export function useUnifiedExercises(): UseUnifiedExercisesResult {
  const [exercises, setExercises] = useState<UnifiedExercise[]>(UNIFIED_EXERCISES);
  const [loading, setLoading] = useState(!!supabaseClient);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const client = supabaseClient;
    if (!client) return;
    let cancelled = false;

    const load = async () => {
      try {
        const rows: ExerciseRow[] = [];
        for (let from = 0; ; from += 1000) {
          const { data, error: queryError } = await client
            .from('exercises')
            .select('*')
            .order('id', { ascending: true })
            .range(from, from + 999);
          if (queryError) throw queryError;
          rows.push(...((data ?? []) as ExerciseRow[]));
          if ((data ?? []).length < 1000) break;
        }

        if (cancelled) return;
        if (rows.length) setExercises(rows.map(rowToExercise));
        setError(null);
      } catch (cause) {
        if (!cancelled) setError(cause instanceof Error ? cause.message : String(cause));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { exercises, loading, error };
}
