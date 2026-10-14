CREATE TABLE IF NOT EXISTS public.exercises (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_ar TEXT,
  name_fr TEXT NOT NULL,
  name_es TEXT NOT NULL,
  name_de TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  muscle_group TEXT NOT NULL,
  equipment TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  calories NUMERIC NOT NULL DEFAULT 0,
  calories_per_session NUMERIC,
  duration TEXT NOT NULL DEFAULT '',
  sets INTEGER,
  reps INTEGER,
  reps_min INTEGER,
  reps_max INTEGER,
  timed_duration INTEGER,
  timed_duration_min INTEGER,
  timed_duration_max INTEGER,
  per_side BOOLEAN,
  unit TEXT CHECK (unit IS NULL OR unit IN ('reps', 'steps', 'meters')),
  rest_seconds INTEGER,
  source_sets TEXT NOT NULL,
  body_concerns TEXT[] NOT NULL DEFAULT '{}',
  target_audience TEXT[] NOT NULL DEFAULT '{}',
  goals TEXT[] NOT NULL DEFAULT '{}',
  bmi_range NUMERIC[],
  contraindications TEXT[] NOT NULL DEFAULT '{}',
  refs TEXT[] NOT NULL DEFAULT '{}',
  tip_en TEXT,
  tip_fr TEXT,
  tip_es TEXT,
  tip_ar TEXT,
  aliases TEXT[] NOT NULL DEFAULT '{}',
  reviewed_loanwords TEXT[] NOT NULL DEFAULT '{}',
  review_status TEXT,
  source_file TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS exercises_type_idx ON public.exercises (type);
CREATE INDEX IF NOT EXISTS exercises_muscle_group_idx ON public.exercises (muscle_group);
CREATE INDEX IF NOT EXISTS exercises_difficulty_idx ON public.exercises (difficulty);

ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.exercises TO anon, authenticated;
GRANT ALL ON public.exercises TO service_role;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'exercises'
      AND policyname = 'Exercises are readable by everyone'
  ) THEN
    CREATE POLICY "Exercises are readable by everyone"
      ON public.exercises
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END
$$;
