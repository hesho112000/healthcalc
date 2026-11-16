ALTER TABLE public.dishes
  ADD COLUMN IF NOT EXISTS image_url text;

UPDATE public.dishes
SET image_url = CASE
  WHEN region = 'pan_american' AND name_en = 'Cheeseburger'
    THEN '/images/recipes/classic-cheeseburger.webp'
  WHEN region = 'mid_atlantic' AND name_en = 'Buffalo wings'
    THEN '/images/recipes/buffalo-chicken-wings.webp'
  WHEN region = 'pan_american' AND name_en = 'Mac and cheese'
    THEN '/images/recipes/macaroni-and-cheese.webp'
  WHEN region = 'mid_atlantic' AND name_en = 'Macaroni cheese'
    THEN '/images/recipes/macaroni-and-cheese.webp'
  WHEN region = 'pan_american' AND name_en = 'American pancakes'
    THEN '/images/recipes/buttermilk-pancakes.webp'
  WHEN region = 'pan_american' AND name_en = 'Caesar salad'
    THEN '/images/recipes/grilled-chicken-caesar-salad.webp'
  WHEN region = 'pan_moroccan' AND name_en = 'Lentil Soup with Carrots'
    THEN '/images/recipes/moroccan-lentil-soup.webp'
  WHEN lower(btrim(name_en)) = 'moroccan lentil soup'
    THEN '/images/recipes/moroccan-lentil-soup.webp'
  ELSE image_url
END
WHERE (region = 'pan_american' AND name_en IN ('Cheeseburger', 'Mac and cheese', 'American pancakes', 'Caesar salad'))
   OR (region = 'mid_atlantic' AND name_en IN ('Buffalo wings', 'Macaroni cheese'))
   OR (region = 'pan_moroccan' AND name_en = 'Lentil Soup with Carrots')
   OR lower(btrim(name_en)) = 'moroccan lentil soup';
