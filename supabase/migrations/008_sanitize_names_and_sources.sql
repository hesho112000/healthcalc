-- Sanitize hallucinated city-style dish names and a mislabeled source identifier.
-- Updates are keyed by stable dish UUIDs so no deprecated terms are reintroduced
-- into the codebase by this migration file.

UPDATE public.dishes SET name_en = 'German Bean Burger' WHERE id = 'b9dcc214-ea99-44f5-a1ca-98e58054d497';
UPDATE public.dishes SET name_en = 'German Beef Patty' WHERE id = '1cd553e6-f588-4858-a1a7-785f4614efc3';
UPDATE public.dishes SET name_en = 'German Crispy Potatoes' WHERE id = '613a8a47-db81-40a3-8025-cb9ad575765d';
UPDATE public.dishes SET name_en = 'German Egg Dish' WHERE id = '28030d56-3e16-4aa2-ad7b-c00121afd38c';
UPDATE public.dishes SET name_en = 'German Fish' WHERE id = 'cdbd5de4-3dac-49b1-bca4-9345d0568e6e';
UPDATE public.dishes SET name_en = 'German Fish Platter' WHERE id = '38d6ba30-30c9-40db-9b0b-dbe0ed4855b1';
UPDATE public.dishes SET name_en = 'German Fish Soup' WHERE id = 'e640c209-88c8-497f-8dd5-bbdb2aacfb93';
UPDATE public.dishes SET name_en = 'German Fish Tart' WHERE id = '7bcfadea-d73d-4079-9260-4228947a7d4e';
UPDATE public.dishes SET name_en = 'German Fish Tartare' WHERE id = '94da6474-966e-40c2-98a1-4c600ae813ef';
UPDATE public.dishes SET name_en = 'German Ginger Cake' WHERE id = '3e61833f-9948-466b-9e52-0f37846f29b9';
UPDATE public.dishes SET name_en = 'German Grilled Fish' WHERE id = 'a55dc4a8-34b7-452c-a05a-e73892a4c1f6';
UPDATE public.dishes SET name_en = 'German Lentil Soup' WHERE id = '1315040b-ac14-4220-8d8b-e9fc485ce5b8';
UPDATE public.dishes SET name_en = 'German Lentil Stew' WHERE id = '28d30c16-fad0-47ea-bc7a-f8e87588a0b9';
UPDATE public.dishes SET name_en = 'German Oatmeal Soup' WHERE id = '03133086-98d7-475a-ad09-a293bb3f154b';
UPDATE public.dishes SET name_en = 'German Pea Salad' WHERE id = 'f1b802e4-95aa-4585-9f80-8fd66dd0e620';
UPDATE public.dishes SET name_en = 'German Potato Cake' WHERE id = '6683d7ec-8982-4971-80fd-e24bf71f4ed2';
UPDATE public.dishes SET name_en = 'German Potato Cream Soup' WHERE id = 'fa2769cd-147f-45e4-a428-657c80c52196';
UPDATE public.dishes SET name_en = 'German Potato Soup' WHERE id = '04fdf74f-1a63-4b07-a1b5-63dfea2fa731';
UPDATE public.dishes SET name_en = 'German Prawn Sauce' WHERE id = '200f903e-10fc-4952-988a-90ee879343da';
UPDATE public.dishes SET name_en = 'German Vegetable Soup' WHERE id = 'ba9b6d5c-06c8-4bb7-be17-dd3d61507682';
UPDATE public.dishes SET name_en = 'Classic Burger' WHERE id = '74f4c802-39fd-40a8-a8a7-ab813f3fcc58';

UPDATE public.dishes
SET source = 'cl_beef_grill_cl'
WHERE id = 'a07e23c0-3a46-4d0c-a904-0b6cab8e86ce';
