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
