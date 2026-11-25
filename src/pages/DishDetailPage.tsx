import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Check, Flame, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import { getSupabaseClient } from '../lib/supabaseClient';
import { Dish } from '../components/food/DishCard';
import { getArticleBySlug, lt } from '../data/articles';
import { getRecipeBySlug, lt as recipeLt } from '../data/recipes';
import type { TranslationKeys } from '../i18n/translationTypes';

type DbDish = Dish & {
  fiber?: number | null;
  sugar?: number | null;
  sodium?: number | null;
  sat_fat?: number | null;
  healthy?: boolean | null;
  is_fried?: boolean | null;
  is_sweet?: boolean | null;
};

type RecipeLink = {
  keywords: string[];
  slug: string;
  title: string;
  dishIds?: string[];
};

const RECIPE_LINKS: RecipeLink[] = [
  { keywords: ['tortilla soup'], slug: 'chicken-tortilla-soup-light', title: 'Chicken Tortilla Soup (Light)' },
  { keywords: ['fajita', 'bell pepper'], slug: 'beef-bell-pepper-fajitas', title: 'Beef & Bell Pepper Fajitas' },
  { keywords: ['fajita', 'chicken'], slug: 'chicken-fajita-bowl', title: 'Chicken Fajita Bowl' },
  { keywords: ['burrito', 'beef'], slug: 'lean-beef-burrito-bowl', title: 'Lean Beef Burrito Bowl' },
  { keywords: ['shrimp', 'taco'], slug: 'shrimp-tacos-cabbage-slaw', title: 'Shrimp Tacos with Cabbage Slaw' },
  { keywords: ['quesadilla', 'black bean'], slug: 'black-bean-sweet-potato-quesadilla', title: 'Black Bean & Sweet Potato Quesadilla' },
  { keywords: ['fish taco', 'mango'], slug: 'grilled-fish-tacos-mango-salsa', title: 'Grilled Fish Tacos with Mango Salsa' },
  { keywords: ['mexican', 'quinoa'], slug: 'mexican-quinoa-salad', title: 'Mexican Quinoa Salad' },
  { keywords: ['enchilada', 'turkey'], slug: 'turkey-zucchini-enchiladas', title: 'Turkey & Zucchini Enchiladas' },
  { keywords: ['cauliflower rice', 'cilantro'], slug: 'cilantro-lime-cauliflower-rice-bowl', title: 'Cilantro Lime Cauliflower Rice Bowl' },
  { keywords: ['foul', 'medames', 'fava'], slug: 'foul-medames', title: 'Foul Medames Recipe' },
  { keywords: ['grilled chicken', 'brown rice'], slug: 'grilled-chicken-brown-rice', title: 'Grilled Chicken Recipe' },
  { keywords: ['tagine', 'tunisian'], slug: 'tunisian-vegetable-tagine', title: 'Tunisian Tagine Recipe' },
  { keywords: ['tabbouleh', 'lebanese'], slug: 'lebanese-tabbouleh', title: 'Lebanese Tabbouleh Recipe' },
  { keywords: ['kabsa', 'saudi'], slug: 'saudi-kabsa-lighter', title: 'Saudi Kabsa Recipe' },
  { keywords: ['lentil soup', 'moroccan'], slug: 'moroccan-lentil-soup', title: 'Moroccan Lentil Soup Recipe' },
  { keywords: ['salmon', 'grilled salmon'], slug: 'lemon-herb-grilled-salmon', title: 'Lemon Herb Grilled Salmon' },
  { keywords: ['avocado', 'chicken bowl'], slug: 'avocado-chicken-power-bowl', title: 'Avocado Chicken Power Bowl' },
  { keywords: ['turkey', 'meatballs', 'zucchini'], slug: 'lean-turkey-meatballs-zucchini', title: 'Lean Turkey Meatballs with Zucchini' },
  { keywords: ['yogurt', 'parfait', 'berries'], slug: 'greek-yogurt-berry-parfait', title: 'Greek Yogurt Berry Parfait' },
  {
    keywords: ['turkey', 'burger'],
    dishIds: ['bc320bd7-c128-40b8-bdf3-014535d56394'],
    slug: 'healthy-turkey-burger-bowl',
    title: 'Healthy Turkey Burger Bowl',
  },
  { keywords: ['lemon', 'chicken', 'broccoli'], slug: 'baked-lemon-chicken-broccoli', title: 'Baked Lemon Chicken & Broccoli' },
  { keywords: ['sweet potato', 'taco'], slug: 'sweet-potato-black-bean-tacos', title: 'Sweet Potato & Black Bean Tacos' },
  { keywords: ['cobb', 'salad'], slug: 'grilled-chicken-cobb-salad-vinaigrette', title: 'Grilled Chicken Cobb Salad' },
  { keywords: ['buffalo chicken', 'lettuce wraps'], slug: 'buffalo-chicken-lettuce-wraps', title: 'Buffalo Chicken Lettuce Wraps' },
  { keywords: ['turkey meatloaf', 'cauliflower mash'], slug: 'turkey-meatloaf-cauliflower-mash', title: 'Turkey Meatloaf with Cauliflower Mash' },
  { keywords: ['loaded baked sweet potato', 'black beans'], slug: 'loaded-baked-sweet-potato', title: 'Loaded Baked Sweet Potato' },
  { keywords: ['chicken tenders', 'almond crust'], slug: 'crispy-baked-chicken-tenders-almond', title: 'Crispy Baked Chicken Tenders with Almond Crust' },
  { keywords: ['maple', 'salmon'], slug: 'maple-glazed-salmon', title: 'Maple Glazed Salmon' },
  { keywords: ['beef', 'broccoli', 'stir'], slug: 'lean-beef-broccoli-stirfry', title: 'Lean Beef & Broccoli Stir-fry' },
  { keywords: ['quinoa', 'kale'], slug: 'quinoa-kale-power-salad', title: 'Quinoa & Kale Power Salad' },
  { keywords: ['cauliflower', 'pizza'], slug: 'cauliflower-crust-pizza', title: 'Cauliflower Crust Pizza' },
  { keywords: ['spaghetti squash', 'turkey'], slug: 'spaghetti-squash-turkey-meat-sauce', title: 'Spaghetti Squash with Turkey Meat Sauce' },
  { keywords: ['oatmeal', 'almond butter'], slug: 'almond-butter-protein-oatmeal', title: 'Almond Butter Protein Oatmeal' },
  { keywords: ['sweet potato', 'cottage cheese'], slug: 'baked-sweet-potato-cottage-cheese', title: 'Baked Sweet Potato with Cottage Cheese' },
  { keywords: ['shrimp', 'zucchini', 'skewer'], slug: 'grilled-shrimp-zucchini-skewers', title: 'Grilled Shrimp & Zucchini Skewers' },
  { keywords: ['chicken', 'avocado', 'wrap', 'lettuce'], slug: 'chicken-avocado-lettuce-wrap', title: 'Chicken Avocado Lettuce Wrap' },
  { keywords: ['lentil', 'soup'], slug: 'vegan-lentil-vegetable-soup', title: 'Vegan Lentil & Vegetable Soup' },
  { keywords: ['apple', 'cinnamon', 'oatmeal'], slug: 'apple-cinnamon-baked-oatmeal', title: 'Apple Cinnamon Baked Oatmeal' },
  { keywords: ['stuffed pepper', 'ground chicken'], slug: 'ground-chicken-stuffed-peppers', title: 'Ground Chicken Stuffed Bell Peppers' },
  { keywords: ['mediterranean', 'grilled chicken', 'salad'], slug: 'mediterranean-grilled-chicken-salad', title: 'Mediterranean Grilled Chicken Salad' },
  { keywords: ['cod', 'lemon', 'olives'], slug: 'baked-cod-lemon-olives', title: 'Baked Cod with Lemon & Olives' },
  { keywords: ['quinoa', 'tabbouleh', 'chickpeas'], slug: 'quinoa-tabbouleh-chickpeas', title: 'Quinoa Tabbouleh with Chickpeas' },
  { keywords: ['zucchini', 'noodles', 'pesto'], slug: 'zucchini-noodles-pesto', title: 'Zucchini Noodles with Pesto & Cherry Tomatoes' },
  { keywords: ['stuffed peppers', 'feta'], slug: 'greek-stuffed-peppers-feta', title: 'Greek Stuffed Peppers with Feta' },
  { keywords: ['shrimp', 'scampi', 'pasta'], slug: 'shrimp-scampi-whole-wheat', title: 'Shrimp Scampi with Whole Wheat Pasta' },
  { keywords: ['eggplant', 'parmesan'], slug: 'eggplant-parmesan-light', title: 'Eggplant Parmesan (Light & Baked)' },
  { keywords: ['tuscan', 'white bean', 'kale', 'soup'], slug: 'tuscan-white-bean-kale-soup', title: 'Tuscan White Bean & Kale Soup' },
  { keywords: ['caprese', 'avocado', 'salad'], slug: 'caprese-avocado-salad', title: 'Caprese Avocado Salad' },
  { keywords: ['salmon', 'asparagus'], slug: 'lemon-herb-salmon-asparagus', title: 'Lemon Herb Salmon with Asparagus' },
  {
    keywords: ['benelux', 'baked rice pudding'],
    dishIds: ['001ced3a-7ce8-4c1d-b2bd-b2c44852531f'],
    slug: 'benelux-baked-rice-pudding',
    title: 'Benelux Baked Rice Pudding',
  },
  {
    keywords: ['mathloutha'],
    dishIds: ['000b2d78-8a6e-4de2-ad35-3f1182dee8c7'],
    slug: 'chicken-mathloutha',
    title: 'Chicken Mathloutha',
  },
  {
    keywords: ['chicken pie rwandan'],
    dishIds: ['000d4261-8c95-4451-98c3-930e56024568'],
    slug: 'chicken-pie-rwandan',
    title: 'Chicken pie Rwandan',
  },
  {
    keywords: ['fasolada'],
    dishIds: ['000ef540-16db-416e-bf09-911a4fa0b551'],
    slug: 'greek-fasolada-white-bean-soup',
    title: 'Greek Fasolada White Bean Soup',
  },
  {
    keywords: ['pasta with fresh tomato sauce'],
    dishIds: ['000a7ad4-16e9-49d1-9eef-6e3125b620ba'],
    slug: 'italian-pasta-with-fresh-tomato-sauce',
    title: 'Italian Pasta with Fresh Tomato Sauce',
  },
  {
    keywords: ['niter kibe'],
    dishIds: ['00194379-897e-44f6-a571-be6ecbd431d6'],
    slug: 'niter-kibe-butter-african',
    title: 'Niter kibe butter African',
  },
  {
    keywords: ['pumpkin salad'],
    dishIds: ['00068af1-5832-48e8-bf81-9154fb12d825'],
    slug: 'pumpkin-salad',
    title: 'Pumpkin salad',
  },
  {
    keywords: ['puttu'],
    dishIds: ['000722e1-d5bb-4dbf-869a-b2e9fd904d48'],
    slug: 'puttu-indian',
    title: 'Puttu Indian',
  },
  {
    keywords: ['rice with beans rwandan'],
    dishIds: ['000fe281-b3dc-4c67-b48e-36b5244db6fc'],
    slug: 'rice-with-beans-rwandan',
    title: 'Rice with beans Rwandan',
  },
  {
    keywords: ['sevillian bean'],
    dishIds: ['001400e3-b7c9-4787-86af-56c901ff42d7'],
    slug: 'sevillian-bean-and-vegetable-stew',
    title: 'Sevillian Bean and Vegetable Stew',
  },
  {
    keywords: ['ardennes', 'potato gratin'],
    dishIds: ['002f3fdf-3efe-45a4-9f64-7587e1be9bcd'],
    slug: 'ardennes-creamy-potato-gratin',
    title: 'Ardennes Creamy Potato Gratin',
  },
  {
    keywords: ['couque de dinant'],
    dishIds: ['0032a8c0-3020-404f-a009-61e6f5ce5c0e'],
    slug: 'benelux-couque-de-dinant-honey-biscuit',
    title: 'Benelux Couque de Dinant Honey Biscuit',
  },
  {
    keywords: ['dried pollack'],
    dishIds: ['00266d3e-695a-41b4-83a9-5b837600a49d'],
    slug: 'dried-pollack-soup-with-rice',
    title: 'Dried pollack soup with rice',
  },
  {
    keywords: ['barley mushroom'],
    dishIds: ['0027826c-dc62-4658-8b9c-0bb6efcf4cbf'],
    slug: 'estonian-barley-mushroom-porridge',
    title: 'Estonian Barley Mushroom Porridge',
  },
  {
    keywords: ['labneh'],
    dishIds: ['001edee8-75f9-446e-9b23-670c228bc6c1'],
    slug: 'labneh-with-garlic-and-mint',
    title: 'Labneh with garlic and mint',
  },
  {
    keywords: ['makroud'],
    dishIds: ['0023143c-fdfc-4acf-8c74-f8f4a076d95e'],
    slug: 'makroud-with-almonds',
    title: 'Makroud with Almonds',
  },
  {
    keywords: ['onion grilled chicken'],
    dishIds: ['0028b6e6-a902-401c-93f9-2f3273b2e655'],
    slug: 'onion-grilled-chicken',
    title: 'Onion grilled chicken',
  },
  {
    keywords: ['minced meat and pine nuts'],
    dishIds: ['0022320b-0a66-40fc-b7f2-33f95486fce3'],
    slug: 'rice-with-minced-meat-and-pine-nuts',
    title: 'Rice with Minced Meat and Pine Nuts',
  },
  {
    keywords: ['spicy meatballs'],
    dishIds: ['00233ff2-7140-4d3a-8d87-2482816bbc36'],
    slug: 'spicy-meatballs',
    title: 'Spicy meatballs',
  },
  {
    keywords: ['rönttönen', 'fonttonen', 'berry pastries'],
    dishIds: ['0030a905-b309-4d98-bb3c-ad929aa53732'],
    slug: 'turku-ronttonen-berry-pastries',
    title: 'Turku Rönttönen Berry Pastries',
  },
  {
    keywords: ['cheeseburger'],
    dishIds: [
      'bc320bd7-c128-40b8-bdf3-014535d56394',
    ],
    slug: 'classic-cheeseburger',
    title: 'Classic Cheeseburger',
  },
  {
    keywords: ['buffalo wings', 'chicken wings'],
    dishIds: [
      '03eec373-9667-4848-b8bd-9cda1f89b67f', '1faef434-47f7-4be3-9f61-1e3843e4d239', '221c9a86-2d28-426c-b256-21e3fc8c3a9b', '45992185-29e0-44f9-a0e6-4b9608d10909',
      '5a8dd613-7b0a-47be-ab47-0c202c2556c3', '69a117b7-8632-4918-aaea-0b49924b0f50', '6fd3b017-9fe2-46e9-b252-e14e6c94b921', '745a4eda-5941-4d2c-afb7-fb0325c8cde5',
      '822d2e3c-d745-43b4-8487-1da74a0d0ad1', '92dfc9a6-e2b4-4416-a192-25df4e081f79', '93536f6b-a1b6-4e31-9a3a-48412135d7cd', '9e90f9f3-236f-4345-a64f-3f16cee16f61',
      'b5d77516-85aa-406d-814c-bd186e36d5f9', 'bd3cb85a-a32e-48a8-ac46-c101a38babcd', 'ec026a2a-6c38-4e98-a90f-733c1794873d', 'f0a6b948-897c-49f2-96b4-75ffbfe58602',
      'f86d46ad-a10d-422b-97a2-d3a26e015366', 'fc780a3d-e27d-4a80-9d27-b47340f0fc0d', 'feefeb14-6273-4e27-8d56-aa8fc2b0e3d7',
    ],
    slug: 'buffalo-chicken-wings',
    title: 'Buffalo Chicken Wings',
  },
  {
    keywords: ['pancake'],
    dishIds: [
      '03c2d710-2ba5-4d14-9013-21335425bdf7', '05e44470-789d-46c1-8e17-c290258b1d18', '0ac8b13d-4cdf-4f88-8bad-d9de97ba37bf', '187f58e4-d949-4cf4-b73f-e49518c0dbfc',
      '1a8d52e5-e705-433b-be77-909755dd03fe', '1d33abb3-d464-47be-8f14-fa75f7e4c7ef', '2001f2a3-3e7b-4e0d-ade2-bc43fefa3be7', '28bf68f4-50e6-49b4-a922-592c7f882b29',
      '295f49a8-2459-4e86-99f9-58f92136a930', '2dd695e7-9d00-4eff-b54e-90b9c3474f54', '2f29c8e6-2498-474a-b70e-cf5fc1513185', '349bb539-e320-4a4b-9fa9-a3a74d4152bb',
      '34fb7711-ba04-4055-8bf3-6a93aca8ab2f', '3c31e30d-7782-454f-95d6-653e23018923', '3c4e1bc2-5958-42f7-b8df-066343cb902c', '49e32e8b-bf74-4c25-b811-843630b6a49c',
      '4de26691-f6e3-4f16-bea4-51a8019fd88d', '4fd6302f-4832-4a22-8b1f-1763be47c3d2', '5223bae0-f575-4510-ba17-dd7455220485', '5a188f21-55f0-4aa1-9f18-8c88ed5d1912',
      '5fa540ff-64b8-4a2a-a0e8-09f6d9d7d118', '61c9b660-231b-4625-aa47-a330932bbcf9', '62a40af6-8948-4069-865c-e1e7c150f4fb', '64b26fab-461a-41e3-85d6-4770d6b9061d',
      '66596f70-b5ea-437a-96d3-b9e16ca74daf', '67fc8cae-1117-4b6f-871e-25d7c5edf649', '6933d693-9dba-4c0c-85df-da0cc1e0c9f3', '728cacb3-980b-4767-924c-8b53efc6e103',
      '74673f85-f156-41dc-bcde-c02ccc103245', '7fa3d09b-fab9-42dc-91d2-aed6d5c4b61e', '83c82bfc-02da-4753-9f0c-12ab6863819c', '8804a79d-9862-4cdd-86bf-6eff50b2f37f',
      '8b0efa48-6abc-467e-8665-71cd8c4f9bc6', '8d13f3a5-3919-4d03-9068-3e8296e3737f', '8f68341f-8dd0-4fda-a0a7-075f9ad030a2', '90bf4796-f0b1-43cf-9d7c-2c66a8d9f89d',
      '93d228fc-c252-4cfa-b061-a5b0cdafac85', '97b7a4c2-0698-47cc-b1ba-18945ade4707', '98efe4f6-8062-4f1d-941b-2add37a24a9e', '997ed050-a3bb-428e-bc41-a2de8926d018',
      '99b1cd77-d865-42a0-b45f-97650049b2c1', '9c42638e-b9f1-4d57-8c35-0bde4be2c293', '9ccd6f90-fd2c-41b3-ac6f-ed8fe67102e0', 'a1acd56c-5c3d-4d26-950f-e09e6740e4e8',
      'ac44efc7-1afb-430a-b09a-ee1997f40ff3', 'ace57363-dad3-449b-a64d-161206c9f61c', 'ae538ccf-8b1c-4be2-b06c-372a1be99aae', 'b059fc4c-5593-49c3-9f50-b225707f3ac6',
      'b443fa55-1e18-400d-b746-4af0489c2de2', 'b5151987-1aed-48f1-84cc-0f778942c9b3', 'b5743800-f279-4e67-a400-ee77bef17051', 'b94138ea-16be-4de6-a964-b78de54d85e0',
      'bf5cd26f-4c25-4487-8ba2-22f7696e3c51', 'c19f2d53-9fa5-43d6-88b2-5636e1b2eb35', 'c59586aa-27fb-489a-9b84-767dc6138c49', 'c9b7bc2e-22d5-415a-9c81-3005f6c8b601',
      'ccbea778-3c04-4f8b-81d1-9f975d953057', 'd020f082-d384-4dc0-85d2-878ee4f38771', 'd438265c-1e19-416c-ab86-ffa66feab5b3', 'd83c5cf0-70f9-4586-9663-8b0016a5b19c',
      'dba2ddaf-4ad4-4fcb-9d81-201118234e01', 'df26df25-8b60-40e0-8b60-70f6bac7c008', 'e1fd53ae-a6f8-4a28-8410-2cc4d6b602b0', 'e50b3588-d465-41a0-8315-7ef02984a0cb',
      'ec11e2f0-74c0-4624-a2e0-88ae8dd0d454', 'ef8a2716-8200-491d-ab0a-e01508d62b9e', 'f2043c72-9ca9-4c51-87c8-d1aa7d88cade', 'f5645e78-e32e-4ec5-ac05-9575fc89d826',
      'f883b1de-6c24-433f-9246-675b91303617', 'fcb25af4-4e7c-4ef1-939f-4de1a378beed', 'fd9a0767-846d-4d66-a5ef-ba874d7e3045',
    ],
    slug: 'buttermilk-pancakes',
    title: 'Buttermilk Pancakes',
  },
  {
    keywords: ['caesar salad'],
    dishIds: [
      '31bd427c-1d78-45fd-9be2-c3d21db623f6', '8fc6d02b-10ee-43cd-a0b1-d4c9a4acea60', 'a4469f5d-6901-4cf7-95da-a6fcf01d9b3b',
    ],
    slug: 'grilled-chicken-caesar-salad',
    title: 'Grilled Chicken Caesar Salad',
  },
  {
    keywords: ['mac and cheese', 'macaroni'],
    dishIds: [
      '0032831f-dcb1-4a9d-b8ae-d66981e95041', '04099e5e-41c9-4ad3-8c04-91e8415116c1', '2181ec35-af18-4bac-a901-6cad6d44d533', '229a73dd-f856-4891-988f-beded89911fa',
      '2f20239a-ea09-4489-846c-a2cc15981952', '33e04b8e-5f4b-41e2-9e61-35685199d0b4', '38886002-f531-45f5-ba62-d882d0cec5ab', '3c7c2254-6f93-44ff-a6e9-27cf2d51a166',
      '468a3406-c62e-43e8-bd8a-88d7c5fa3c1f', '50ddc9cb-3108-403b-9c50-1a3aba08cc12', '7cf99d03-485a-4741-a5df-ee39a2ef70ed', '8fba8928-0c31-4638-93ba-3a40240ebb03',
      '9d8e71be-ab52-4221-bcd2-a8d43971aabb', 'c354fd81-5553-4093-a1f6-73a9164f7036', 'd83971ce-9cc2-48b2-8373-3b5815c34717', 'd9c5f419-f9ff-4d6e-859b-04576715441d',
      'de258970-32c0-4ea7-8929-7357f0691528', 'e37be24c-7061-455a-a26f-208ad7dadea3', 'f806420a-9be9-47ba-91c6-45f62bba0097',
    ],
    slug: 'macaroni-and-cheese',
    title: 'Macaroni and Cheese',
  },
  {
    keywords: ['garlic chicken shawarma', 'shawarma chicken'],
    dishIds: ['db873d8b-26ff-47cb-b35a-a16220f40740'],
    slug: 'garlic-chicken-shawarma',
    title: 'Garlic Chicken Shawarma',
  },
  {
    keywords: ['genoese grilled fish', 'grilled fish lemon'],
    dishIds: ['1f17becd-da58-4ef7-9de1-1ab1cb537cdd'],
    slug: 'genoese-grilled-fish-with-lemon',
    title: 'Genoese Grilled Fish with Lemon',
  },
  {
    keywords: ['plain paratha', 'paratha indian'],
    dishIds: ['de90fb66-0e3f-4584-9736-c96689c9218e'],
    slug: 'indian-plain-paratha',
    title: 'Indian Plain Paratha',
  },
  {
    keywords: ['kgaare', 'pap botswanan'],
    dishIds: ['5d9deafa-bf7b-4a74-80ce-6b173b7bf5d2'],
    slug: 'kgaare-with-pap-botswanan',
    title: 'Kgaare with Pap',
  },
  {
    keywords: ['korean corn dog', 'corn dog'],
    dishIds: ['7d667333-92c2-4372-a1cf-73e1372e00da'],
    slug: 'korean-corn-dog',
    title: 'Korean Corn Dog',
  },
  {
    keywords: ['mbakbka', 'bread in broth'],
    dishIds: ['3e432eaf-ef80-47f9-8ab2-77ce69b0f81a'],
    slug: 'mbakbka-bread-in-broth',
    title: 'M\'Bakbka (Bread in Broth)',
  },
  {
    keywords: ['mafe fish', 'fish mafe'],
    dishIds: ['cb592517-f0bb-4356-afd6-1931c7f09317'],
    slug: 'mafe-fish',
    title: 'Mafe Fish',
  },
  {
    keywords: ['merluza pollada', 'cassava aji'],
    dishIds: ['f44017e9-78a3-4701-a0b6-fb03474e8c21'],
    slug: 'merluza-pollada-with-cassava-and-aji-sauce',
    title: 'Merluza Pollada with Cassava and Aji Sauce',
  },
  {
    keywords: ['plantain stuffed', 'black beans panela'],
    dishIds: ['f4e1614e-98e8-4705-90a4-a3702e008e4f'],
    slug: 'plantain-stuffed-with-black-beans-and-panela',
    title: 'Plantain Stuffed with Black Beans and Panela',
  },
  {
    keywords: ['pomegranate salad', 'salad pomegranate'],
    dishIds: ['3fa4d7e5-f109-44e5-beef-d5599cd4a956'],
    slug: 'pomegranate-salad',
    title: 'Pomegranate Salad',
  },
  {
    keywords: ['rendang kering', 'beef rendang'],
    dishIds: ['c8bb22b3-ab97-4efa-b9a2-3ea909312a5e'],
    slug: 'rendang-kering-malaysian-dry-beef-rendang',
    title: 'Rendang Kering (Malaysian Dry Beef Rendang)',
  },
  {
    keywords: ['smoked beef barbecue', 'beef barbecue'],
    dishIds: ['dccaaded-6613-4e83-af37-c5c112fe5789'],
    slug: 'smoked-beef-barbecue',
    title: 'Smoked Beef Barbecue',
  },
  {
    keywords: ['tampere vegetable soup', 'finnish vegetable soup'],
    dishIds: ['fb827064-280a-4330-b373-21d258421455'],
    slug: 'tampere-vegetable-soup',
    title: 'Tampere Vegetable Soup',
  },
  {
    keywords: ['vegetable soba', 'soba noodles'],
    dishIds: ['06699041-4583-40ab-ae61-b7f20d67ccbe'],
    slug: 'vegetable-soba',
    title: 'Vegetable Soba',
  },
  {
    keywords: ['mutton qorma', 'qorma pakistani'],
    dishIds: ['17189ef2-ab16-488b-a046-147c9d640c50'],
    slug: 'mutton-qorma-pakistani',
    title: 'Mutton Qorma (Pakistani Style)',
  },
  {
    keywords: ['lentil soup with cumin'],
    dishIds: ['00066fe2-9df7-4d62-a9c3-8f5ad49af26d'],
    slug: 'lentil-soup-with-cumin',
    title: 'Lentil Soup with Cumin',
  },
  {
    keywords: ['konya red lentil soup'],
    dishIds: ['06602999-c4d1-4a9b-83a6-74315b6a779a'],
    slug: 'konya-red-lentil-soup',
    title: 'Konya Red Lentil Soup',
  },
  {
    keywords: ['lentil soup with lemon'],
    dishIds: ['073ee840-7ca5-4158-a08a-4b76543e3cab'],
    slug: 'lentil-soup-with-lemon',
    title: 'Lentil Soup with Lemon',
  },
  {
    keywords: ['lentil soup with spinach'],
    dishIds: ['08d44471-7f24-4e62-87a9-b4b13c16a176'],
    slug: 'lentil-soup-with-spinach',
    title: 'Lentil soup with spinach',
  },
  {
    keywords: ['chilean lentil soup with egg and squash'],
    dishIds: ['091a3ad1-08f4-447c-9e5e-ecf867365c33'],
    slug: 'chilean-lentil-soup-with-egg-and-squash',
    title: 'Chilean Lentil Soup with Egg and Squash',
  },
  {
    keywords: ['lentil soup kenyan'],
    dishIds: ['093e0036-815f-4901-9fb2-dfbba78677b4'],
    slug: 'lentil-soup-kenyan',
    title: 'Lentil soup Kenyan',
  },
  {
    keywords: ['lentil soup with carrots'],
    dishIds: ['0b6e3041-05f7-44b9-8c97-e9904fbb7bb4'],
    slug: 'lentil-soup-with-carrots',
    title: 'Lentil Soup with Carrots',
  },
  {
    keywords: ['saarland lentil soup'],
    dishIds: ['107766a7-ae31-455a-854e-1f7ee2b8a0ad'],
    slug: 'saarland-lentil-soup',
    title: 'Saarland Lentil Soup',
  },
  {
    keywords: ['jordanian lentil soup with lemon'],
    dishIds: ['1112d879-ca84-43ff-b405-da86b30db01e'],
    slug: 'jordanian-lentil-soup-with-lemon',
    title: 'Jordanian lentil soup with lemon',
  },
  {
    keywords: ['lentil soup'],
    dishIds: ['113118f7-bc04-4eb8-bc7c-851f4927196f'],
    slug: 'lentil-soup',
    title: 'Lentil Soup',
  },
  {
    keywords: ['german lentil soup'],
    dishIds: ['1315040b-ac14-4220-8d8b-e9fc485ce5b8'],
    slug: 'german-lentil-soup',
    title: 'German Lentil Soup',
  },
  {
    keywords: ['canadian brown lentil soup'],
    dishIds: ['14ca0e8f-cf66-4e7e-b2e8-67d9ad512311'],
    slug: 'canadian-brown-lentil-soup',
    title: 'Canadian Brown Lentil Soup',
  },
  {
    keywords: ['diyarbakir red lentil soup'],
    dishIds: ['173f8dd4-b764-47ea-8474-cde762c7c4ca'],
    slug: 'diyarbakir-red-lentil-soup',
    title: 'Diyarbakir Red Lentil Soup',
  },
  {
    keywords: ['lentil soup with squash and chile'],
    dishIds: ['18630924-8d36-4ec7-ae82-87399e6c09a3'],
    slug: 'lentil-soup-with-squash-and-chile',
    title: 'Lentil Soup with Squash and Chile',
  },
  {
    keywords: ['green lentil soup'],
    dishIds: ['195d27b8-6d09-4ac3-8da7-e4ff521c361f'],
    slug: 'green-lentil-soup',
    title: 'Green Lentil Soup',
  },
  {
    keywords: ['trabzon red lentil soup'],
    dishIds: ['22c3dfd3-fd3f-4de9-9d74-6c869988b1b6'],
    slug: 'trabzon-red-lentil-soup',
    title: 'Trabzon Red Lentil Soup',
  },
  {
    keywords: ['mardin red lentil soup'],
    dishIds: ['27a190b6-c677-43dc-a857-45b0376d9097'],
    slug: 'mardin-red-lentil-soup',
    title: 'Mardin Red Lentil Soup',
  },
  {
    keywords: ['izmir red lentil soup'],
    dishIds: ['29210f45-9451-46cd-ae2d-e14503dfee88'],
    slug: 'izmir-red-lentil-soup',
    title: 'Izmir Red Lentil Soup',
  },
  {
    keywords: ['spicy lentil soup light pakistani'],
    dishIds: ['2a0ce7d8-8aab-439f-ac9f-dd4479ebcb4f'],
    slug: 'spicy-lentil-soup-light-pakistani',
    title: 'Spicy lentil soup light Pakistani',
  },
  {
    keywords: ['lentil soup'],
    dishIds: ['2eea0b44-969d-4560-a9fa-7dae3a030d24'],
    slug: 'lentil-soup-2',
    title: 'Lentil soup',
  },
  {
    keywords: ['lentil soup ghanaian'],
    dishIds: ['37d84e68-96fa-4744-b9d3-9686fdb8cc2f'],
    slug: 'lentil-soup-ghanaian',
    title: 'Lentil soup Ghanaian',
  },
  {
    keywords: ['armenian aveluk wild herb and lentil soup'],
    dishIds: ['41e7b041-233e-4878-a09a-dc7185986b09'],
    slug: 'armenian-aveluk-wild-herb-and-lentil-soup',
    title: 'Armenian Aveluk Wild Herb and Lentil Soup',
  },
  {
    keywords: ['bremen lentil soup'],
    dishIds: ['429e245d-ae53-4b4e-884b-90fb10933832'],
    slug: 'bremen-lentil-soup',
    title: 'Bremen Lentil Soup',
  },
  {
    keywords: ['lentil soup with zaatar'],
    dishIds: ['44af9972-6a80-4ec4-a92b-fe9145886763'],
    slug: 'lentil-soup-with-zaatar',
    title: 'Lentil soup with zaatar',
  },
  {
    keywords: ['adana red lentil soup'],
    dishIds: ['4544f4d9-17cb-4903-93ca-0cc0fc2a4be5'],
    slug: 'adana-red-lentil-soup',
    title: 'Adana Red Lentil Soup',
  },
  {
    keywords: ['rhine lentil soup'],
    dishIds: ['4a4568ab-8361-400c-90ba-c797ef0bf5be'],
    slug: 'rhine-lentil-soup',
    title: 'Rhine Lentil Soup',
  },
  {
    keywords: ['istanbul red lentil soup'],
    dishIds: ['4ad28f02-69f5-46e8-8c5f-7bdcb398e1e0'],
    slug: 'istanbul-red-lentil-soup',
    title: 'Istanbul Red Lentil Soup',
  },
  {
    keywords: ['omani lentil soup'],
    dishIds: ['52c9af1a-4eea-49de-936b-9ace2b73e6de'],
    slug: 'omani-lentil-soup',
    title: 'Omani Lentil Soup',
  },
  {
    keywords: ['lentil soup dinner ethiopian'],
    dishIds: ['53018189-5aa8-4b70-b2b8-90cff79b3eb9'],
    slug: 'lentil-soup-dinner-ethiopian',
    title: 'Lentil soup dinner Ethiopian',
  },
  {
    keywords: ['red lentil soup'],
    dishIds: ['55e26322-3d7e-48e5-824a-41d78665bf87'],
    slug: 'red-lentil-soup',
    title: 'Red Lentil Soup',
  },
  {
    keywords: ['red lentil soup'],
    dishIds: ['5aba8051-2eda-43eb-bf2c-22126dadc9d4'],
    slug: 'red-lentil-soup-2',
    title: 'Red Lentil Soup',
  },
  {
    keywords: ['hesse creamy lentil soup'],
    dishIds: ['65478cde-55a0-40f0-9e95-7b8b98b29b19'],
    slug: 'hesse-creamy-lentil-soup',
    title: 'Hesse Creamy Lentil Soup',
  },
  {
    keywords: ['kayseri red lentil soup'],
    dishIds: ['693ce72f-a9e6-430f-ab67-5f3709800aab'],
    slug: 'kayseri-red-lentil-soup',
    title: 'Kayseri Red Lentil Soup',
  },
  {
    keywords: ['red lentil soup'],
    dishIds: ['6bbbd637-0a7c-453c-844c-d21d310f766a'],
    slug: 'red-lentil-soup-3',
    title: 'Red Lentil Soup',
  },
  {
    keywords: ['rwandan lentil soup rwandan'],
    dishIds: ['70c90b24-e838-4461-9baf-6ef263f9d745'],
    slug: 'rwandan-lentil-soup-rwandan',
    title: 'Rwandan lentil soup Rwandan',
  },
  {
    keywords: ['spicy lentil soup gabonese'],
    dishIds: ['71059ed7-e534-4d94-a9b3-29972d7b4fb9'],
    slug: 'spicy-lentil-soup-gabonese',
    title: 'Spicy lentil soup Gabonese',
  },
  {
    keywords: ['red lentil soup with tomato'],
    dishIds: ['740c3d20-070c-41cc-8fc2-ff264115a61c'],
    slug: 'red-lentil-soup-with-tomato',
    title: 'Red Lentil Soup with Tomato',
  },
  {
    keywords: ['hesse lentil soup'],
    dishIds: ['74ca454a-9c1a-4ebf-a102-7a2fd0a798c1'],
    slug: 'hesse-lentil-soup',
    title: 'Hesse Lentil Soup',
  },
  {
    keywords: ['gaziantep red lentil soup'],
    dishIds: ['7c96d2d3-375c-4dc1-be0e-7a4901705390'],
    slug: 'gaziantep-red-lentil-soup',
    title: 'Gaziantep Red Lentil Soup',
  },
  {
    keywords: ['lentil soup'],
    dishIds: ['7efc9c11-9cd6-46fa-9fbb-143c2e60f797'],
    slug: 'lentil-soup-3',
    title: 'Lentil soup',
  },
  {
    keywords: ['bursa red lentil soup'],
    dishIds: ['818af2f7-87bb-45dc-902a-78d8e3688083'],
    slug: 'bursa-red-lentil-soup',
    title: 'Bursa Red Lentil Soup',
  },
  {
    keywords: ['levantine lentil soup with cumin'],
    dishIds: ['87215a8d-ff18-44d3-8ba2-255302a1a370'],
    slug: 'levantine-lentil-soup-with-cumin',
    title: 'Levantine lentil soup with cumin',
  },
  {
    keywords: ['lentil soup'],
    dishIds: ['87de4417-b84e-42e8-9ef8-15f3445e080a'],
    slug: 'lentil-soup-4',
    title: 'Lentil Soup',
  },
  {
    keywords: ['van red lentil soup'],
    dishIds: ['88a2283d-b21e-4d10-a46d-9b3b51767c7a'],
    slug: 'van-red-lentil-soup',
    title: 'Van Red Lentil Soup',
  },
  {
    keywords: ['creamy lentil soup'],
    dishIds: ['89488a90-0b34-4e48-8e5a-de363fe76722'],
    slug: 'creamy-lentil-soup',
    title: 'Creamy Lentil Soup',
  },
  {
    keywords: ['lentil soup with vegetables'],
    dishIds: ['8a737c6c-ded3-4cb4-b0be-e4af1d52db5a'],
    slug: 'lentil-soup-with-vegetables',
    title: 'Lentil Soup with Vegetables',
  },
  {
    keywords: ['cumin lentil soup'],
    dishIds: ['8c1e97c1-231a-435c-a021-629d092af5f5'],
    slug: 'cumin-lentil-soup',
    title: 'Cumin Lentil Soup',
  },
  {
    keywords: ['jordanian lentil soup with fried onions'],
    dishIds: ['8dcdc4fc-1728-4bec-a7c5-62e1f187d312'],
    slug: 'jordanian-lentil-soup-with-fried-onions',
    title: 'Jordanian lentil soup with fried onions',
  },
  {
    keywords: ['saxon spiced lentil soup'],
    dishIds: ['8e4a8e81-93b3-40b7-ba69-68753a9657bb'],
    slug: 'saxon-spiced-lentil-soup',
    title: 'Saxon Spiced Lentil Soup',
  },
  {
    keywords: ['lentil soup with lemon'],
    dishIds: ['93c69fbe-5280-4437-a6b2-6eb9dbf5a388'],
    slug: 'lentil-soup-with-lemon-2',
    title: 'Lentil Soup with Lemon',
  },
  {
    keywords: ['lentil soup ethiopian'],
    dishIds: ['971dc19c-ec5b-4973-b891-a0891060600a'],
    slug: 'lentil-soup-ethiopian',
    title: 'Lentil soup Ethiopian',
  },
  {
    keywords: ['ankara red lentil soup'],
    dishIds: ['a1d2173a-b3b8-4691-8a19-3ca1135be055'],
    slug: 'ankara-red-lentil-soup',
    title: 'Ankara Red Lentil Soup',
  },
  {
    keywords: ['saxon lentil soup'],
    dishIds: ['b2996c67-758d-4dbe-92ab-76ff2c200df7'],
    slug: 'saxon-lentil-soup',
    title: 'Saxon Lentil Soup',
  },
  {
    keywords: ['hanseatic lentil soup'],
    dishIds: ['b4d7f351-fb79-4f2f-a85f-278079c14423'],
    slug: 'hanseatic-lentil-soup',
    title: 'Hanseatic Lentil Soup',
  },
  {
    keywords: ['spicy lentil soup botswanan'],
    dishIds: ['b537bd21-819b-412e-a4e5-b0912726018c'],
    slug: 'spicy-lentil-soup-botswanan',
    title: 'Spicy lentil soup Botswanan',
  },
  {
    keywords: ['lentil soup pakistani'],
    dishIds: ['b76484ed-8269-4e06-ad9c-cf20bf283133'],
    slug: 'lentil-soup-pakistani',
    title: 'Lentil soup Pakistani',
  },
  {
    keywords: ['qatari lentil soup'],
    dishIds: ['bc0f0444-9e4d-4bb6-b948-3a40f64dae30'],
    slug: 'qatari-lentil-soup',
    title: 'Qatari Lentil Soup',
  },
  {
    keywords: ['lentil soup with carrots'],
    dishIds: ['bcb366b2-48ee-4221-94b4-6e3e8d8ce84e'],
    slug: 'lentil-soup-with-carrots-2',
    title: 'Lentil Soup with Carrots',
  },
  {
    keywords: ['norwegian lentil soup with carrots'],
    dishIds: ['bfb6c05a-c657-4218-9f4c-86eb2ef86d0d'],
    slug: 'norwegian-lentil-soup-with-carrots',
    title: 'Norwegian Lentil Soup with Carrots',
  },
  {
    keywords: ['palestinian lentil soup with lemon'],
    dishIds: ['c01105d1-97d2-4bbb-be8f-17d7a027d78a'],
    slug: 'palestinian-lentil-soup-with-lemon',
    title: 'Palestinian lentil soup with lemon',
  },
  {
    keywords: ['turkish classic red lentil soup, mercimek'],
    dishIds: ['c01719f8-15b7-48d0-a42f-21bacceaeddd'],
    slug: 'turkish-classic-red-lentil-soup-mercimek',
    title: 'Turkish Classic Red Lentil Soup, Mercimek',
  },
  {
    keywords: ['antalya red lentil soup'],
    dishIds: ['c4062e39-34fd-45cb-8a36-882efd47ffca'],
    slug: 'antalya-red-lentil-soup',
    title: 'Antalya Red Lentil Soup',
  },
  {
    keywords: ['ghanaian lentil soup ghanaian'],
    dishIds: ['c9f21a96-85e5-4db1-a585-6ecb956d471c'],
    slug: 'ghanaian-lentil-soup-ghanaian',
    title: 'Ghanaian lentil soup Ghanaian',
  },
  {
    keywords: ['lentil soup with cumin'],
    dishIds: ['cb1c27c2-441a-435c-9f4a-c7a4e9894a3b'],
    slug: 'lentil-soup-with-cumin-2',
    title: 'Lentil Soup with Cumin',
  },
  {
    keywords: ['lentil soup'],
    dishIds: ['cb3f0899-c210-4c90-98ae-c7573b3503a9'],
    slug: 'lentil-soup-5',
    title: 'Lentil soup',
  },
  {
    keywords: ['sanliurfa red lentil soup'],
    dishIds: ['d48651e0-1900-4e82-92cd-439acd6c4b62'],
    slug: 'sanliurfa-red-lentil-soup',
    title: 'Sanliurfa Red Lentil Soup',
  },
  {
    keywords: ['turkish red lentil soup'],
    dishIds: ['db797d08-dd06-46be-b6ed-a5cef0b09188'],
    slug: 'turkish-red-lentil-soup',
    title: 'Turkish Red Lentil Soup',
  },
  {
    keywords: ['palestinian yellow lentil soup'],
    dishIds: ['df319388-15e9-4bd7-9912-27a3bd6decc3'],
    slug: 'palestinian-yellow-lentil-soup',
    title: 'Palestinian yellow lentil soup',
  },
  {
    keywords: ['lentil soup'],
    dishIds: ['dfa546c6-db3e-4fd1-87b5-9ab1c7d8c554'],
    slug: 'lentil-soup-6',
    title: 'Lentil Soup',
  },
  {
    keywords: ['czech lentil soup'],
    dishIds: ['e0990c0b-88c7-4906-a706-d36877e13c67'],
    slug: 'czech-lentil-soup',
    title: 'Czech Lentil Soup',
  },
  {
    keywords: ['eskisehir red lentil soup'],
    dishIds: ['eef41807-535a-4c3f-a0f5-9d38aead9548'],
    slug: 'eskisehir-red-lentil-soup',
    title: 'Eskisehir Red Lentil Soup',
  },
  {
    keywords: ['bahraini lentil soup'],
    dishIds: ['efa9fffc-bc7f-451a-bf63-0e432fcc1c2f'],
    slug: 'bahraini-lentil-soup',
    title: 'Bahraini Lentil Soup',
  },
];

const NUTRITION_ARTICLE_SLUGS = [
  'understanding-hba1c',
  'lower-cholesterol-naturally',
  'strength-training-diabetes',
  'mindful-eating',
];

const DishDetailPage: React.FC = () => {
  const { dir, language, t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const [dish, setDish] = useState<DbDish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    async function load() {
      const supabase = await getSupabaseClient();
      if (cancelled) return;
      if (!id || !supabase) {
        if (!cancelled) {
          setError(t('dish.errorLoading'));
          setLoading(false);
        }
        return;
      }

      try {
        const { data, error: sbError } = await supabase
          .from('dishes')
          .select('*')
          .eq('id', id)
          .maybeSingle<DbDish>();

        if (cancelled) return;

        if (sbError) {
          setError(t('dish.errorLoading'));
        } else if (!data) {
          setError(t('dish.notFound'));
        } else {
          setDish(data);
        }
    } catch {
        if (!cancelled) {
          setError(t('dish.errorLoading'));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [id, t]);

  const locale = (language || 'en').split('-')[0] as keyof Pick<DbDish, 'name_en' | 'name_ar' | 'name_fr' | 'name_es' | 'name_de'>;
  const localeKey = `name_${locale}` as keyof DbDish;
  const name = dish ? ((dish[localeKey] as string) || dish.name_en || '') : '';
  const region = dish?.region ? String(dish.region).replace('pan_', '').replace(/_/g, ' ') : '';
  const mealType = dish?.meal_type ? String(dish.meal_type).replace(/_/g, ' ') : '';

  const fmt = (value: number | null | undefined, unit: string) =>
    value == null ? '—' : `${Math.round(value)}${unit}`;

  const caloriesRaw = dish?.cal_100 ?? null;
  const proteinRaw = dish?.protein ?? null;
  const carbsRaw = dish?.carbs ?? null;
  const fatRaw = dish?.fat ?? null;
  const fiberRaw = dish?.fiber ?? null;
  const sugarRaw = dish?.sugar ?? null;
  const sodiumRaw = dish?.sodium ?? null;
  const satFatRaw = dish?.sat_fat ?? null;

  const generateHealthDescription = () => {
    if (!dish) return '';
    const parts: string[] = [];
    const withValue = (key: keyof TranslationKeys, value: number) =>
      t(key).replace('{value}', String(value));

    if (dish.healthy) {
      parts.push(t('dish.profile.healthy'));
    }
    if (dish.is_fried) {
      parts.push(t('dish.profile.fried'));
    }
    if (dish.is_sweet) {
      parts.push(t('dish.profile.sweet'));
    }
    if ((proteinRaw ?? 0) >= 20) {
      parts.push(withValue('dish.profile.proteinHigh', proteinRaw ?? 0));
    } else if ((proteinRaw ?? 0) >= 12) {
      parts.push(t('dish.profile.proteinModerate'));
    }
    if ((carbsRaw ?? 0) >= 40) {
      parts.push(withValue('dish.profile.carbsHigh', carbsRaw ?? 0));
    }
    if ((fatRaw ?? 0) >= 18) {
      parts.push(withValue('dish.profile.fatHigh', fatRaw ?? 0));
    } else if ((fatRaw ?? 0) <= 5) {
      parts.push(withValue('dish.profile.fatLow', fatRaw ?? 0));
    }
    if ((fiberRaw ?? 0) >= 5) {
      parts.push(withValue('dish.profile.fiber', fiberRaw ?? 0));
    }
    if ((sugarRaw ?? 0) > 15) {
      parts.push(withValue('dish.profile.sugar', sugarRaw ?? 0));
    }
    if ((sodiumRaw ?? 0) >= 400) {
      parts.push(withValue('dish.profile.sodium', sodiumRaw ?? 0));
    }

    if (!parts.length) {
      parts.push(t('dish.profile.default').replace('{calories}', fmt(caloriesRaw, '')));
    }

    return parts.slice(0, 2).join(' ');
  };

  const description = t('dish.summary')
    .replace('{calories}', fmt(caloriesRaw, ''))
    .replace('{protein}', fmt(proteinRaw, ''));

  const healthBenefits = (() => {
    if (!dish) return [];
    const benefits: string[] = [];
    if (proteinRaw != null && proteinRaw >= 15) benefits.push(t('dish.profile.proteinHigh').replace('{value}', String(proteinRaw)));
    if (fiberRaw != null && fiberRaw >= 5) benefits.push(t('dish.profile.fiber').replace('{value}', String(fiberRaw)));
    if (fatRaw != null && fatRaw <= 5) benefits.push(t('dish.profile.fatLow').replace('{value}', String(fatRaw)));
    if (carbsRaw != null && carbsRaw <= 15) benefits.push(t('dish.profile.carbsLow').replace('{value}', String(carbsRaw)));
    if (dish.healthy === true) benefits.push(t('dish.profile.healthy'));
    if (dish.is_fried === true) benefits.push(t('dish.profile.fried'));
    return benefits;
  })();

  const matchedRecipe = (() => {
    if (!dish) return null;
    const searchText = (dish.name_en || '').toLowerCase();
    return RECIPE_LINKS
      .map((recipe, index) => ({
        recipe,
        index,
        matches: recipe.dishIds?.includes(dish.id)
          ? Number.MAX_SAFE_INTEGER
          : recipe.keywords.filter((keyword) => searchText.includes(keyword)).length,
      }))
      .filter((match) => match.matches > 0)
      .sort((a, b) => b.matches - a.matches || a.index - b.index)[0]?.recipe ?? null;
  })();
  const matchedRecipeData = matchedRecipe ? getRecipeBySlug(matchedRecipe.slug) : undefined;
  const matchedRecipeTitle = matchedRecipeData
    ? recipeLt(matchedRecipeData.title, language)
    : matchedRecipe?.title ?? '';

  const nutritionArticles = (() => {
    if (!dish) return [] as Array<{ slug: string; title: string }>;
    const slugs: string[] = [];

    if ((sugarRaw ?? 0) > 15 || (carbsRaw ?? 0) >= 40) slugs.push('understanding-hba1c');
    if ((fatRaw ?? 0) >= 18 || (sodiumRaw ?? 0) >= 400) slugs.push('lower-cholesterol-naturally');
    if ((proteinRaw ?? 0) >= 20) slugs.push('strength-training-diabetes');
    slugs.push('mindful-eating');

    return Array.from(new Set(slugs))
      .filter((slug) => NUTRITION_ARTICLE_SLUGS.includes(slug))
      .flatMap((slug) => {
        const article = getArticleBySlug(slug);
        return article ? [{ slug: article.slug, title: lt(article.title, language) }] : [];
      })
      .slice(0, 3);
  })();

  const nutritionJsonLd = {
    '@context': 'https://schema.org',
    // Informational food page, not an e-commerce product. Keeping this as
    // WebPage avoids Product rich-result requirements (offers/review/rating).
    '@type': 'WebPage',
    name,
    description: `${name} nutrition information per 100 g.`,
    image: dish?.image_url ? [`https://healthfingerprint.com${dish.image_url}`] : undefined,
    category: mealType || 'Food',
    url: `https://healthfingerprint.com/food-library/${dish?.id ?? id}`,
    additionalProperty: [
      ['Calories', caloriesRaw, 'kcal per 100 g'],
      ['Protein', proteinRaw, 'g per 100 g'],
      ['Carbohydrates', carbsRaw, 'g per 100 g'],
      ['Fat', fatRaw, 'g per 100 g'],
      ['Fiber', fiberRaw, 'g per 100 g'],
      ['Sugar', sugarRaw, 'g per 100 g'],
      ['Sodium', sodiumRaw, 'mg per 100 g'],
      ['Saturated fat', satFatRaw, 'g per 100 g'],
    ]
      .filter(([, value]) => value != null)
      .map(([propertyName, value, unitText]) => ({
        '@type': 'PropertyValue',
        name: propertyName,
        value,
        unitText,
      })),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6" dir={dir}>
        <div className="text-center text-sm font-semibold text-slate-500">{t('foodLibrary.loading')}</div>
      </div>
    );
  }

  if (error || !dish) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6" dir={dir}>
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">🍽️</div>
          <h1 className="text-2xl font-extrabold text-gray-900">{t('dish.notFound')}</h1>
          <p className="mt-2 text-sm text-slate-500">{error}</p>
          <Link to="/food-library" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4A017] px-6 py-3 text-sm font-extrabold text-[#0F4C3A] hover:bg-[#B8860B] transition-colors">
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t('nav.foodLibrary')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <SEO type="article" title={t('dish.seoTitle').replace('{name}', name)} description={description} url={`/food-library/${dish.id}`} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(nutritionJsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <div className="max-w-[720px] mx-auto px-6 pt-16 pb-20">
        <div className="flex items-center justify-between gap-3">
          <Link to="/food-library" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#0F4C3A] hover:text-[#D4A017] transition-colors">
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t('nav.foodLibrary')}
          </Link>
          <span className="text-sm font-semibold text-slate-500 truncate max-w-[260px]">{name}</span>
        </div>

        <header className="mt-8 rounded-[32px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-8 text-center shadow-[0_18px_44px_rgba(15,76,58,0.18)]">
          {dish.image_url ? (
            <img
              src={dish.image_url}
              alt={name}
              className="mx-auto h-32 w-32 rounded-3xl object-cover shadow-[0_10px_30px_rgba(212,160,23,0.3)]"
            />
          ) : (
            <div className="mx-auto w-20 h-20 rounded-3xl bg-[#F4F1EB] flex items-center justify-center text-5xl shadow-[0_10px_30px_rgba(212,160,23,0.3)]">
              🍽️
            </div>
          )}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {region && (
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-[#D8E6DF]">{region}</span>
            )}
            {mealType && (
              <span className="rounded-full bg-[#D4A017] px-3 py-1 text-xs font-extrabold text-[#0F4C3A]">{mealType}</span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#FDFBF7]">{name}</h1>
          <p className="mt-3 text-[#D8E6DF] leading-relaxed">{description}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-[#FDFBF7]">
            <span className="inline-flex items-center gap-1.5">
              <Flame size={16} className="text-[#D4A017]" />
              {fmt(caloriesRaw, ' kcal / 100g')}
            </span>
          </div>
        </header>

        <section className="mt-10 rounded-3xl border border-[#EFEBE4] bg-white p-6">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#0F4C3A]">
            <Activity size={18} className="text-[#D4A017]" />
            {t('dish.nutritionFacts')}
          </h2>
          <dl className="mt-4 divide-y divide-[#E4DFD4]">
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">{t('dish.calories')}</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(caloriesRaw, ' kcal')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">{t('protein')}</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(proteinRaw, ' g')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">{t('carbs')}</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(carbsRaw, ' g')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">{t('fat')}</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(fatRaw, ' g')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">{t('dish.fiber')}</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(fiberRaw, ' g')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">{t('dish.sugar')}</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(sugarRaw, ' g')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">{t('dish.sodium')}</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(sodiumRaw, ' mg')}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm font-semibold text-[#6B7A75]">{t('dish.saturatedFat')}</dt>
              <dd className="text-sm font-extrabold text-[#0F4C3A]">{fmt(satFatRaw, ' g')}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-6 rounded-3xl border border-[#EFEBE4] bg-white p-6">
          <h2 className="text-lg font-extrabold text-[#0F4C3A]">{t('dish.healthProfile')}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#4A5A55]">{generateHealthDescription() || t('dish.profile.empty')}</p>
        </section>

        {healthBenefits.length > 0 && (
          <section className="mt-6 rounded-3xl border border-[#EFEBE4] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#0F4C3A] mt-8 mb-4">{t('dish.healthBenefits')}</h3>
            <ul className="space-y-3">
              {healthBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#4A5A55]">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4A017]/10 text-[#0F4C3A]">
                    <Check size={14} />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {matchedRecipe && (
          <section className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
            <Link to={`/resources/recipe/${matchedRecipe.slug}`} className="mt-3 flex w-full items-center justify-between gap-3 rounded-2xl bg-[#0F4C3A] px-5 py-4 text-start text-sm font-extrabold text-[#FDFBF7] hover:bg-[#1a6b53] transition-colors">
              <span>
                <span className="block text-xs font-bold uppercase tracking-wide opacity-80">
                  {t('dish.recipe.view')}
                </span>
                <span className="mt-1 block">
                  {t('dish.recipe.prompt').replace('{recipe}', matchedRecipeTitle)}
                </span>
              </span>
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </section>
        )}

        {nutritionArticles.length > 0 && (
          <section className="mt-6 rounded-3xl border border-[#EFEBE4] bg-white p-6">
            <h2 className="text-lg font-extrabold text-[#0F4C3A]">{t('dish.readMoreTitle')}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4A5A55]">
              {t('dish.readMoreDescription')}
            </p>
            <ul className="mt-4 space-y-3">
              {nutritionArticles.map((article) => (
                <li key={article.slug}>
                  <Link
                    to={`/resources/article/${article.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-[#0F4C3A] hover:text-[#D4A017] transition-colors"
                  >
                    {article.title}
                    <ArrowRight size={16} className="rtl:rotate-180" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default DishDetailPage;
