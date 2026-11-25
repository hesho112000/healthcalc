-- 009_insert_new_dishes.sql
-- Adds 15 new recipe-linked dishes for Food Library + Recipes page.
-- Idempotent: inserts only when id does not already exist.

INSERT INTO public.dishes (
  id,
  name_en, name_ar, name_fr, name_es, name_de,
  image_url,
  cal_100, protein, carbs, fat, fiber, sugar, sodium, sat_fat,
  region, meal_type, healthy, is_fried, is_sweet
)
VALUES
  ('db873d8b-26ff-47cb-b35a-a16220f40740'::uuid, 'Garlic Chicken Shawarma', 'شاورما دجاج بالثوم', 'Shawarma de poulet à l’ail', 'Shawarma de pollo al ajo', 'Garlic Chicken Shawarma', '/images/recipes/garlic-chicken-shawarma.webp', 185, 20, 10, 7, 1.8, 2.5, 420, 1.8, 'levantine', 'lunch', TRUE, FALSE, FALSE),
  ('1f17becd-da58-4ef7-9de1-1ab1cb537cdd'::uuid, 'Genoese Grilled Fish with Lemon', 'سمك مشوي على طريقة جنوة بالليمون', 'Poisson grillé génois au citron', 'Pescado a la parrilla genovés con limón', 'Genoese Grilled Fish with Lemon', '/images/recipes/genoese-grilled-fish-with-lemon.webp', 145, 22, 1.5, 6.5, 0.4, 0.6, 220, 1.2, 'italian', 'dinner', TRUE, FALSE, FALSE),
  ('de90fb66-0e3f-4584-9736-c96689c9218e'::uuid, 'Indian Plain Paratha', 'باراثا هندية سادة', 'Paratha nature indien', 'Paratha india simple', 'Indian Plain Paratha', '/images/recipes/indian-plain-paratha.webp', 290, 8, 50, 7, 6.5, 1.2, 180, 1.1, 'indian', 'breakfast', TRUE, FALSE, FALSE),
  ('5d9deafa-bf7b-4a74-80ce-6b173b7bf5d2'::uuid, 'Kgaare with Pap', 'كغاري مع باب', 'Kgaare avec pap', 'Kgaare con pap', 'Kgaare with Pap', '/images/recipes/kgaare-with-pap-botswanan.webp', 150, 11, 17, 4.2, 2.2, 2, 280, 1.5, 'botswanan', 'dinner', TRUE, FALSE, FALSE),
  ('7d667333-92c2-4372-a1cf-73e1372e00da'::uuid, 'Korean Corn Dog', 'كورندوج كوري', 'Corn dog coréen', 'Corn dog coreano', 'Korean Corn Dog', '/images/recipes/korean-corn-dog.webp', 250, 13, 27, 10, 2, 4, 620, 3.5, 'korean', 'snack', FALSE, FALSE, FALSE),
  ('3e432eaf-ef80-47f9-8ab2-77ce69b0f81a'::uuid, 'M''Bakbka (Bread in Broth)', 'مبكبكة (خبز في مرق)', 'M''Bakbka (pain au bouillon)', 'M''Bakbka (pan en caldo)', 'M''Bakbka (Bread in Broth)', '/images/recipes/mbakbka-bread-in-broth.webp', 145, 5.2, 23, 3.6, 4.5, 4.2, 390, 0.6, 'north_african', 'dinner', TRUE, FALSE, FALSE),
  ('cb592517-f0bb-4356-afd6-1931c7f09317'::uuid, 'Mafe Fish', 'سمك مافي', 'Poisson mafé', 'Pescado mafe', 'Mafe Fish', '/images/recipes/mafe-fish.webp', 160, 14, 5.5, 9, 1.8, 3.2, 340, 3.2, 'west_african', 'dinner', TRUE, FALSE, FALSE),
  ('f44017e9-78a3-4701-a0b6-fb03474e8c21'::uuid, 'Merluza Pollada with Cassava and Aji Sauce', 'ميرلوزا بويادا مع الكسافا وصلصة الآخي', 'Merluza pollada avec manioc et sauce aji', 'Merluza pollada con yuca y salsa ají', 'Merluza Pollada with Cassava and Aji Sauce', '/images/recipes/merluza-pollada-with-cassava-and-aji-sauce.webp', 170, 13.5, 18, 4.5, 2, 1.8, 310, 1.3, 'peruvian', 'lunch', TRUE, FALSE, FALSE),
  ('f4e1614e-98e8-4705-90a4-a3702e008e4f'::uuid, 'Plantain Stuffed with Black Beans and Panela', 'موز الجنة محشو بالفاصوليا السوداء والبانيلا', 'Plantain farci aux haricots noirs et panela', 'Plátano relleno de frijoles negros y panela', 'Plantain Stuffed with Black Beans and Panela', '/images/recipes/plantain-stuffed-with-black-beans-and-panela.webp', 165, 4.1, 31, 3.2, 5.2, 14, 160, 0.8, 'latin_american', 'lunch', TRUE, FALSE, FALSE),
  ('3fa4d7e5-f109-44e5-beef-d5599cd4a956'::uuid, 'Pomegranate Salad', 'سلطة الرمان', 'Salade à la grenade', 'Ensalada de granada', 'Pomegranate Salad', '/images/recipes/pomegranate-salad.webp', 65, 1.2, 7, 3.8, 2.1, 5, 90, 0.5, 'mediterranean', 'lunch', TRUE, FALSE, FALSE),
  ('c8bb22b3-ab97-4efa-b9a2-3ea909312a5e'::uuid, 'Rendang Kering (Malaysian Dry Beef Rendang)', 'ريندانغ كيرينغ (ريندانغ لحم بقري ماليزي جاف)', 'Rendang kering (rendang de bœuf sec malaisien)', 'Rendang kering (rendang seco de res malasio)', 'Rendang Kering (Malaysian Dry Beef Rendang)', '/images/recipes/rendang-kering-malaysian-dry-beef-rendang.webp', 210, 17, 3.5, 14, 0.8, 2, 360, 8.5, 'malaysian', 'dinner', FALSE, FALSE, FALSE),
  ('dccaaded-6613-4e83-af37-c5c112fe5789'::uuid, 'Smoked Beef Barbecue', 'لحم بقري مشوي مدخن', 'Barbecue de bœuf fumé', 'Barbacoa de res ahumada', 'Smoked Beef Barbecue', '/images/recipes/smoked-beef-barbecue.webp', 195, 21, 5, 10, 0.5, 4, 480, 7, 'american', 'dinner', FALSE, FALSE, FALSE),
  ('fb827064-280a-4330-b373-21d258421455'::uuid, 'Tampere Vegetable Soup', 'شوربة خضار تامبيري', 'Soupe de légumes de Tampere', 'Sopa de verduras de Tampere', 'Tampere Vegetable Soup', '/images/recipes/tampere-vegetable-soup.webp', 55, 1.7, 10, 1.2, 2.4, 2.8, 260, 0.2, 'finnish', 'lunch', TRUE, FALSE, FALSE),
  ('06699041-4583-40ab-ae61-b7f20d67ccbe'::uuid, 'Vegetable Soba', 'سوبا بالخضار', 'Soba aux légumes', 'Soba con verduras', 'Vegetable Soba', '/images/recipes/vegetable-soba.webp', 130, 4.6, 24, 2.3, 3.1, 3.5, 320, 0.4, 'japanese', 'lunch', TRUE, FALSE, FALSE),
  ('17189ef2-ab16-488b-a046-147c9d640c50'::uuid, 'Mutton Qorma (Pakistani Style)', 'قورمة لحم غنم على الطريقة الباكستانية', 'Qorma de mouton (style pakistanais)', 'Qorma de cordero (estilo pakistaní)', 'Mutton Qorma (Pakistani Style)', '/images/recipes/mutton-qorma-pakistani.webp', 205, 16, 4, 14, 0.8, 2.5, 360, 7.5, 'pakistani', 'dinner', FALSE, FALSE, FALSE)
ON CONFLICT (id) DO NOTHING;
