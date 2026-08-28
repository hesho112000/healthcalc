import { FOODS as NORTH_AFRICA_FOODS } from './regional/north-africa';
import { FOODS as GULF_FOODS } from './regional/gulf';
import { FOODS as ASIA_FOODS } from './regional/asia';
import { FOODS as EUROPE_FOODS } from './regional/europe';
import { FOODS as NORTH_AMERICA_FOODS } from './regional/north-america';
import { FOODS as SOUTH_AMERICA_FOODS } from './regional/south-america';
import { FOODS as AUSTRALIA_FOODS } from './regional/australia';
import { FOODS as LEVANTINE_AFRICA_FOODS } from './regional/levantine-africa';
import { FOODS as SPECIAL_DIETS_FOODS } from './regional/special-diets';

export type Cuisine = string;
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'fruit' | 'juice';

export interface Portion {
  grams: number;
  measure: string;
  measureAr?: string;
  ml?: number;
  note?: string;
}

export const DEFAULT_PORTION: Portion = { grams: 150, measure: '1 serving (150g)', measureAr: 'حصة واحدة (150 جم)' };

export const PORTION_BY_MEALTYPE: Record<MealType, Portion> = {
  breakfast: { grams: 250, measure: '1 plate (250g)', measureAr: 'طبق واحد (250 جم)' },
  lunch: { grams: 300, measure: '1 plate (300g)', measureAr: 'طبق واحد (300 جم)' },
  dinner: { grams: 280, measure: '1 portion (280g)', measureAr: 'حصة واحدة (280 جم)' },
  snack: { grams: 60, measure: '1 serving (60g)', measureAr: 'حصة واحدة (60 جم)' },
  fruit: { grams: 120, measure: '1 serving (120g)', measureAr: 'حصة واحدة (120 جم)' },
  juice: { grams: 200, measure: '1 cup (200ml)', measureAr: 'كوب واحد (200 مل)', ml: 200, note: 'no added sugar' },
};

export interface PortionLike {
  grams?: number;
  measure?: string;
  measureEn?: string;
  measureAr?: string;
  ml?: number;
}

const warnedMeasures = new Set<string>();

export const getPortionMeasure = (portion: PortionLike | undefined, lang?: string): string => {
  if (!portion) return '';
  const en = portion.measureEn ?? portion.measure;
  if (lang === 'ar') {
    if (portion.measureAr) return portion.measureAr;
    if (en && !warnedMeasures.has(en)) {
      warnedMeasures.add(en);
      console.warn(`[healthcalc] Missing Arabic measure for "${en}" — falling back to "${portion.ml ? portion.ml + ' مل' : portion.grams ? portion.grams + ' جم' : en}".`);
    }
    if (portion.ml) return `${portion.ml} مل`;
    if (portion.grams) return `${portion.grams} جم`;
    return en || '';
  }
  return en ?? (portion.ml ? `${portion.ml}ml` : portion.grams ? `${portion.grams}g` : '');
};

export const getMeasure = (meal: { portion?: PortionLike } | undefined, lang?: string): string =>
  getPortionMeasure(meal?.portion, lang);

export const PORTION_OVERRIDES: Record<string, Portion> = {
  'Foul Medames with Olive Oil': { grams: 150, measure: '1 bowl (150g)' },
  'Ful Medames Qatari': { grams: 150, measure: '1 bowl (150g)' },
  'Ful Medames Bahraini': { grams: 150, measure: '1 bowl (150g)' },
  'Foul with Tahini': { grams: 150, measure: '1 plate (150g)' },
  'Egyptian Taameya Falafel': { grams: 100, measure: '4 pieces (100g)' },
  'Feteer Baladi with Honey': { grams: 120, measure: '1 piece (120g)' },
  'Basbousa Semolina Cake': { grams: 80, measure: '1 slice (80g)' },
  'Ghorayebah Shortbread': { grams: 60, measure: '2 pieces (60g)' },
  'Koshari': { grams: 250, measure: '1 plate (250g)' },
  'Molokhia with Chicken and Rice': { grams: 200, measure: '1 bowl (200g)' },
  'Tunisian Mlukhia Stew': { grams: 200, measure: '1 bowl (200g)' },
  'Stuffed Vine Leaves': { grams: 180, measure: '8 leaves (180g)' },
  'Egyptian Hawawshi': { grams: 200, measure: '1 piece (200g)' },
  'Egyptian Fatta with Lamb': { grams: 300, measure: '1 plate (300g)' },
  'Brik a l Oeuf': { grams: 90, measure: '1 piece (90g)' },
  'Makroud with Dates': { grams: 70, measure: '1 piece (70g)' },
  'Couscous with Seven Vegetables': { grams: 300, measure: '1 plate (300g)' },
  'Harira Soup with Dates': { grams: 250, measure: '1 bowl (250g)' },
  'Chicken Bastilla': { grams: 150, measure: '1 slice (150g)' },
  'Chebakia Sesame Pastry': { grams: 60, measure: '2 pieces (60g)' },
  'Sellou Flour and Nut Mix': { grams: 60, measure: '2 tablespoons (60g)' },
  'Msemen with Honey': { grams: 120, measure: '2 pieces (120g)' },
  'Baghrir Pancakes': { grams: 120, measure: '2 pancakes (120g)' },
  'Amlou with Bread': { grams: 60, measure: '1 slice + amlou (60g)' },
  'Bissara Fava Soup': { grams: 250, measure: '1 bowl (250g)' },
  'Kefta and Egg Tagine': { grams: 250, measure: '1 plate (250g)' },
  'Boulef': { grams: 200, measure: '1 plate (200g)' },
  'Msemmen': { grams: 120, measure: '2 pieces (120g)' },
  'Saudi Kabsa with Chicken': { grams: 300, measure: '1 plate (300g)' },
  'Machboos with Chicken': { grams: 300, measure: '1 plate (300g)' },
  'Regag Bread with Cheese': { grams: 100, measure: '2 rolls (100g)' },
  'Chebab Date Pancakes': { grams: 90, measure: '2 pancakes (90g)' },
  'Luqaimat with Date Syrup': { grams: 100, measure: '6 pieces (100g)' },
  'Luqaimat (Sweet Dumplings)': { grams: 100, measure: '6 pieces (100g)' },
  'Lugaimat (Sweet Dumplings)': { grams: 100, measure: '6 pieces (100g)' },
  'Dates with Arabic Gahwa': { grams: 60, measure: '3 dates + a cup (60g)' },
  'Gahwa with Dates': { grams: 40, measure: '2 dates + a cup (40g)' },
  'Motabbaq': { grams: 120, measure: '1 piece (120g)' },
  'Harees': { grams: 250, measure: '1 bowl (250g)' },
  'Jareesh (Crushed Wheat)': { grams: 250, measure: '1 bowl (250g)' },
  'Jireesh (Crushed Wheat)': { grams: 250, measure: '1 bowl (250g)' },
  'Jireesh Bahraini (Crushed Wheat)': { grams: 250, measure: '1 bowl (250g)' },
  'Qatari Jareesh': { grams: 250, measure: '1 bowl (250g)' },
  'Shuwa with Rice': { grams: 300, measure: '1 plate (300g)' },
  'Machboos Samak (Fish Rice)': { grams: 300, measure: '1 plate (300g)' },
  'Muhammar (Sweet Brown Rice)': { grams: 250, measure: '1 plate (250g)' },
  'Machboos Hammour (Grouper Rice)': { grams: 300, measure: '1 plate (300g)' },
  'Machboos Laham (Lamb Rice)': { grams: 300, measure: '1 plate (300g)' },
  'Samboosa with Meat': { grams: 90, measure: '2 pieces (90g)' },
  'Samboosa with Chicken': { grams: 90, measure: '2 pieces (90g)' },
  'Saleeg with Chicken': { grams: 300, measure: '1 plate (300g)' },
  'Madfoon with Lamb': { grams: 300, measure: '1 plate (300g)' },
  'Mandi Dajaj with Rice': { grams: 300, measure: '1 plate (300g)' },
  'Ghoozi (Stuffed Lamb with Rice)': { grams: 350, measure: '1 plate (350g)' },
  'Mishkak (Grilled Lamb Skewers) with Rice': { grams: 250, measure: '1 plate (250g)' },
  'Ful Medames': { grams: 150, measure: '1 bowl (150g)' },
  'Molokhia': { grams: 200, measure: '1 bowl (200g)' },
  'Labneh with Zaatar': { grams: 100, measure: '1 bowl (100g)' },
  'Manakish Zaatar': { grams: 120, measure: '1 piece (120g)' },
  'Shakshuka': { grams: 250, measure: '1 pan serving (250g)' },
  'Libyan Shakshouka': { grams: 250, measure: '1 pan serving (250g)' },
  'Chakchouka': { grams: 250, measure: '1 pan serving (250g)' },
  'Shawarma Chicken': { grams: 150, measure: '1 wrap (150g)' },
  'Kabsa-style Rice': { grams: 300, measure: '1 plate (300g)' },
  'Maqluba': { grams: 300, measure: '1 plate (300g)' },
  'Musakhan': { grams: 300, measure: '1 plate (300g)' },
  'Tabbouleh & Hummus Plate': { grams: 200, measure: '1 plate (200g)' },
  'Kibbeh': { grams: 180, measure: '2 pieces (180g)' },
  'Grilled Kofta': { grams: 200, measure: '1 plate (200g)' },
  'Sayadieh': { grams: 300, measure: '1 plate (300g)' },
  'Kanafeh': { grams: 120, measure: '1 piece (120g)' },
  'Halva': { grams: 60, measure: '1 piece (60g)' },
  'Hummus & Pita': { grams: 150, measure: '1 plate (150g)' },
  'Akara': { grams: 100, measure: '4 pieces (100g)' },
  'Jollof Rice with Chicken': { grams: 350, measure: '1 plate (350g)' },
  'Ugali with Sukuma Wiki': { grams: 300, measure: '1 plate (300g)' },
  'Injera with Doro Wat': { grams: 350, measure: '1 plate (350g)' },
  'Fufu with Egusi Soup': { grams: 350, measure: '1 plate (350g)' },
  'Bobotie': { grams: 300, measure: '1 slice (300g)' },
  'Mandazi': { grams: 80, measure: '2 pieces (80g)' },
  'Chin Chin': { grams: 60, measure: '1 handful (60g)' },
  'Pancakes with Maple Syrup': { grams: 90, measure: '2 pancakes + 20ml syrup (90g)' },
  'Maple Pancakes': { grams: 90, measure: '2 pancakes (90g)' },
  'Scrambled Eggs and Bacon': { grams: 120, measure: '2 eggs + 2 bacon (120g)' },
  'Scrambled Eggs with Smoked Salmon': { grams: 120, measure: '2 eggs + 50g salmon (120g)' },
  'Scrambled Eggs with Butter': { grams: 120, measure: '2 large eggs (120g)' },
  'Waffles with Butter': { grams: 90, measure: '1 waffle (90g)' },
  'Cinnamon French Toast': { grams: 120, measure: '2 slices (120g)' },
  'Cheeseburger': { grams: 230, measure: '1 burger (230g)' },
  'BBQ Pork Ribs': { grams: 250, measure: '5 ribs (250g)' },
  'Grilled Salmon': { grams: 150, measure: '1 fillet (150g)' },
  'Caesar Chicken Wrap': { grams: 200, measure: '1 wrap (200g)' },
  'Macaroni and Cheese': { grams: 220, measure: '1 cup (220g)' },
  'Chicken Pot Pie': { grams: 250, measure: '1 slice (250g)' },
  'New England Clam Chowder': { grams: 240, measure: '1 bowl (240g)' },
  'Chocolate Chip Cookies': { grams: 30, measure: '2 cookies (30g)' },
  'Apple Pie Slice': { grams: 120, measure: '1 slice (120g)' },
  'Huevos Rancheros': { grams: 220, measure: '1 plate (220g)' },
  'Chilaquiles with Eggs': { grams: 250, measure: '1 plate (250g)' },
  'Breakfast Burrito': { grams: 260, measure: '1 burrito (260g)' },
  'Huevos a la Mexicana': { grams: 200, measure: '1 plate (200g)' },
  'Tacos al Pastor': { grams: 180, measure: '2 tacos (180g)' },
  'Enchiladas Verdes': { grams: 250, measure: '2 enchiladas (250g)' },
  'Burrito Bowl': { grams: 300, measure: '1 bowl (300g)' },
  'Quesadilla de Pollo': { grams: 200, measure: '2 quesadillas (200g)' },
  'Carne Asada': { grams: 200, measure: '1 plate (200g)' },
  'Pozole Rojo': { grams: 300, measure: '1 bowl (300g)' },
  'Chiles Rellenos': { grams: 200, measure: '1 pepper (200g)' },
  'Mole Poblano with Chicken': { grams: 250, measure: '1 plate (250g)' },
  'Churros': { grams: 90, measure: '2 pieces (90g)' },
  'Tamales': { grams: 120, measure: '1 piece (120g)' },
  'Poutine': { grams: 300, measure: '1 bowl (300g)' },
  'Montreal Smoked Meat Sandwich': { grams: 250, measure: '1 sandwich (250g)' },
  'Cubano Sandwich': { grams: 250, measure: '1 sandwich (250g)' },
  'Ropa Vieja with Rice': { grams: 300, measure: '1 plate (300g)' },
  'Moros y Cristianos': { grams: 250, measure: '1 plate (250g)' },
  'Lechon Asado': { grams: 250, measure: '1 plate (250g)' },
  'Arroz con Pollo': { grams: 300, measure: '1 plate (300g)' },
  'Jerk Chicken': { grams: 220, measure: '1 plate (220g)' },
  'Jamaican Beef Pattie': { grams: 130, measure: '1 patty (130g)' },
  'Curry Chicken with Rice and Peas': { grams: 350, measure: '1 plate (350g)' },
  'Gallo Pinto': { grams: 250, measure: '1 plate (250g)' },
  'Casado': { grams: 350, measure: '1 plate (350g)' },
  'Ceviche Tico': { grams: 200, measure: '1 bowl (200g)' },
  'Pão de Queijo': { grams: 100, measure: '6 units (100g)' },
  'Tapioca de Queijo': { grams: 150, measure: '1 tapioca (150g)' },
  'Açaí na Tigela': { grams: 200, measure: '1 bowl (200g)' },
  'Feijoada': { grams: 250, measure: '1 bowl (250g)' },
  'Picanha': { grams: 180, measure: '1 slice + rice (180g)' },
  'Moqueca de Peixe': { grams: 250, measure: '1 bowl (250g)' },
  'Strogonoff de Frango': { grams: 220, measure: '1 plate (220g)' },
  'Churrasco': { grams: 250, measure: '1 plate (250g)' },
  'Coxinha': { grams: 90, measure: '1 piece (90g)' },
  'Brigadeiro': { grams: 30, measure: '1 piece (30g)' },
  'Medialunas': { grams: 100, measure: '2 medialunas (100g)' },
  'Milanesa a la Napolitana': { grams: 220, measure: '1 piece (220g)' },
  'Asado': { grams: 250, measure: '1 plate (250g)' },
  'Locro': { grams: 300, measure: '1 bowl (300g)' },
  'Parrillada': { grams: 300, measure: '1 plate (300g)' },
  'Empanada de Carne': { grams: 120, measure: '2 empanadas (120g)' },
  'Alfajores': { grams: 80, measure: '1 piece (80g)' },
  'Ceviche': { grams: 200, measure: '1 bowl (200g)' },
  'Lomo Saltado': { grams: 300, measure: '1 plate (300g)' },
  'Aji de Gallina': { grams: 250, measure: '1 plate (250g)' },
  'Pollo a la Brasa': { grams: 250, measure: '1 plate (250g)' },
  'Arroz con Pollo Costarricense': { grams: 300, measure: '1 plate (300g)' },
  'Arepa con Huevo': { grams: 150, measure: '1 arepa (150g)' },
  'Bandeja Paisa': { grams: 400, measure: '1 plate (400g)' },
  'Ajiaco': { grams: 300, measure: '1 bowl (300g)' },
  'Empanada Colombiana': { grams: 90, measure: '2 empanadas (90g)' },
  'Buñuelos': { grams: 60, measure: '2 pieces (60g)' },
  'Pastel de Choclo': { grams: 250, measure: '1 slice (250g)' },
  'Completo': { grams: 200, measure: '1 completo (200g)' },
  'Empanada de Pino': { grams: 120, measure: '2 empanadas (120g)' },
  'Arepa Reina Pepiada': { grams: 150, measure: '1 arepa (150g)' },
  'Cachapa': { grams: 150, measure: '1 piece (150g)' },
  'Pabellón Criollo': { grams: 300, measure: '1 plate (300g)' },
  'Hallaca': { grams: 200, measure: '1 piece (200g)' },
  'Tequeños': { grams: 90, measure: '3 pieces (90g)' },
  'Italian Frittata': { grams: 180, measure: '1 slice (180g)' },
  'Cornetto with Jam': { grams: 90, measure: '1 cornetto (90g)' },
  'Pizza Margherita': { grams: 150, measure: '1 slice of 12-inch (150g)' },
  'Spaghetti Carbonara': { grams: 200, measure: '1 plate (200g cooked)' },
  'Caprese Salad': { grams: 200, measure: '1 plate (200g)' },
  'Minestrone Soup': { grams: 250, measure: '1 bowl (250g)' },
  'Lasagna alla Bolognese': { grams: 200, measure: '1 piece 5x5 (200g)' },
  'Risotto ai Funghi': { grams: 250, measure: '1 bowl (250g)' },
  'Chicken Parmigiana': { grams: 250, measure: '1 piece (250g)' },
  'Cotoletta alla Milanese': { grams: 250, measure: '1 piece (250g)' },
  'Tiramisu': { grams: 120, measure: '1 piece (120g)' },
  'Gelato': { grams: 100, measure: '1 scoop (100g)' },
  'Butter Croissant': { grams: 60, measure: '1 croissant (60g)' },
  'Pain au Chocolat': { grams: 80, measure: '1 piece (80g)' },
  'Quiche Lorraine': { grams: 150, measure: '1 slice (150g)' },
  'French Onion Soup': { grams: 250, measure: '1 bowl (250g)' },
  'Coq au Vin': { grams: 300, measure: '1 bowl (300g)' },
  'Beef Bourguignon': { grams: 300, measure: '1 bowl (300g)' },
  'Steak Frites': { grams: 350, measure: '1 plate (350g)' },
  'Macaron': { grams: 20, measure: '2 macarons (20g)' },
  'Crêpes with Sugar': { grams: 90, measure: '1 crepe (90g)' },
  'Tortilla Española': { grams: 150, measure: '1 slice (150g)' },
  'Churros con Chocolate': { grams: 100, measure: '4 churros + dip (100g)' },
  'Paella Valenciana': { grams: 350, measure: '1 plate (350g)' },
  'Gazpacho': { grams: 250, measure: '1 bowl (250g)' },
  'Patatas Bravas': { grams: 200, measure: '1 plate (200g)' },
  'Greek Yogurt with Honey and Walnuts': { grams: 200, measure: '1 bowl (200g)' },
  'Spanakopita': { grams: 150, measure: '1 slice (150g)' },
  'Greek Salad': { grams: 200, measure: '1 bowl (200g)' },
  'Moussaka': { grams: 250, measure: '1 slice (250g)' },
  'Souvlaki Wrap': { grams: 250, measure: '1 wrap (250g)' },
  'Pastitsio': { grams: 250, measure: '1 slice (250g)' },
  'Keftedes': { grams: 200, measure: '4 meatballs (200g)' },
  'Baklava': { grams: 80, measure: '2 pieces (80g)' },
  'Menemen': { grams: 250, measure: '1 pan serving (250g)' },
  'Simit': { grams: 100, measure: '1 simit (100g)' },
  'İskender Kebab': { grams: 350, measure: '1 plate (350g)' },
  'Döner': { grams: 300, measure: '1 plate (300g)' },
  'Adana Kebab': { grams: 300, measure: '1 plate (300g)' },
  'Mercimek Çorbası': { grams: 250, measure: '1 bowl (250g)' },
  'Lahmacun': { grams: 150, measure: '1 lahmacun (150g)' },
  'Peynirli Pide': { grams: 250, measure: '1 pide (250g)' },
  'Künefe': { grams: 150, measure: '1 piece (150g)' },
  'Turkish Delight': { grams: 40, measure: '2 pieces (40g)' },
  'Bratwurst with Sauerkraut': { grams: 250, measure: '2 sausages (250g)' },
  'Currywurst': { grams: 300, measure: '1 plate (300g)' },
  'Wiener Schnitzel': { grams: 250, measure: '1 schnitzel (250g)' },
  'Bavarian Pretzel': { grams: 100, measure: '1 pretzel (100g)' },
  'Apfelstrudel': { grams: 150, measure: '1 slice (150g)' },
  'Masala Dosa': { grams: 150, measure: '1 dosa (150g)' },
  'Idli Sambar': { grams: 150, measure: '2 idli + sambar (150g)' },
  'Poha': { grams: 200, measure: '1 bowl (200g)' },
  'Chicken Biryani': { grams: 300, measure: '1 plate (300g)' },
  'Butter Chicken': { grams: 200, measure: '1 bowl (200g)', note: '100g steamed rice on the side' },
  'Dal Makhani': { grams: 250, measure: '1 bowl (250g)' },
  'Chana Masala': { grams: 250, measure: '1 bowl (250g)' },
  'Chicken Tikka Masala': { grams: 200, measure: '1 bowl (200g)' },
  'Palak Paneer': { grams: 200, measure: '1 bowl (200g)' },
  'Rogan Josh': { grams: 250, measure: '1 bowl (250g)' },
  'Samosa': { grams: 80, measure: '2 pieces (80g)' },
  'Jalebi': { grams: 60, measure: '2 pieces (60g)' },
  'Nihari': { grams: 300, measure: '1 bowl (300g)' },
  'Halwa Puri': { grams: 200, measure: '1 puri + halwa (200g)' },
  'Aloo Paratha': { grams: 150, measure: '1 paratha (150g)' },
  'Anda Paratha': { grams: 170, measure: '1 paratha (170g)' },
  'Chicken Karahi': { grams: 250, measure: '1 plate (250g)' },
  'Seekh Kebab': { grams: 200, measure: '3 skewers (200g)' },
  'Haleem': { grams: 300, measure: '1 bowl (300g)' },
  'Chapli Kebab': { grams: 160, measure: '2 patties (160g)' },
  'Gol Gappay': { grams: 100, measure: '8 pieces (100g)' },
  'Congee': { grams: 300, measure: '1 bowl (300g)' },
  'Kung Pao Chicken': { grams: 200, measure: '1 plate (200g)' },
  'Beef Chow Fun': { grams: 300, measure: '1 plate (300g)' },
  'Mapo Tofu': { grams: 200, measure: '1 bowl (200g)' },
  'Dan Dan Noodles': { grams: 300, measure: '1 bowl (300g)' },
  'Peking Duck': { grams: 200, measure: '2 rolls (200g)' },
  'Yangzhou Fried Rice': { grams: 200, measure: '1 cup (200g)' },
  'Spring Roll': { grams: 100, measure: '2 rolls (100g)' },
  'Sesame Balls': { grams: 50, measure: '3 balls (50g)' },
  'Bibimbap': { grams: 350, measure: '1 bowl (350g)' },
  'Bulgogi': { grams: 200, measure: '1 plate (200g)' },
  'Japchae': { grams: 250, measure: '1 bowl (250g)' },
  'Gimbap': { grams: 250, measure: '1 roll (250g)' },
  'Samgyeopsal': { grams: 200, measure: '1 serving (200g)' },
  'Galbi': { grams: 250, measure: '3 ribs (250g)' },
  'Tteokbokki': { grams: 200, measure: '1 bowl (200g)' },
  'Kimchi Pancake': { grams: 150, measure: '1 pancake (150g)' },
  'Miso Soup': { grams: 180, measure: '1 bowl (180ml)' },
  'Tamagoyaki': { grams: 100, measure: '2 slices (100g)' },
  'Sushi': { grams: 150, measure: '6 pieces (150g)' },
  'Ramen': { grams: 450, measure: '1 bowl (450g)' },
  'Kare Raisu': { grams: 400, measure: '1 plate (400g)' },
  'Teriyaki Salmon': { grams: 200, measure: '1 fillet (200g)' },
  'Katsudon': { grams: 350, measure: '1 bowl (350g)' },
  'Gyudon': { grams: 350, measure: '1 bowl (350g)' },
  'Shabu-Shabu': { grams: 300, measure: '1 pot (300g)' },
  'Tempura Udon': { grams: 400, measure: '1 bowl (400g)' },
  'Onigiri': { grams: 100, measure: '1 piece (100g)' },
  'Mochi': { grams: 60, measure: '2 pieces (60g)' },
  'Pad Thai': { grams: 250, measure: '1 plate (250g)' },
  'Green Curry': { grams: 200, measure: '1 bowl (200g)' },
  'Tom Yum Goong': { grams: 200, measure: '1 bowl (200g)' },
  'Massaman Curry': { grams: 250, measure: '1 bowl (250g)' },
  'Pad Krapow': { grams: 250, measure: '1 plate (250g)' },
  'Khao Soi': { grams: 350, measure: '1 bowl (350g)' },
  'Mango Sticky Rice': { grams: 200, measure: '1 bowl (200g)' },
  'Chicken Satay': { grams: 100, measure: '3 skewers (100g)' },
  'Vegemite Toast': { grams: 100, measure: '2 slices (100g)' },
  'Avocado Smash on Sourdough': { grams: 180, measure: '1 slice (180g)' },
  'Weet-Bix with Milk and Banana': { grams: 150, measure: '3 biscuits + milk (150g)' },
  'Australian Meat Pie': { grams: 180, measure: '1 pie (180g)' },
  'Sausage Roll': { grams: 150, measure: '1 roll (150g)' },
  'Barramundi Fish Burger': { grams: 200, measure: '1 burger (200g)' },
  'Australian Fish and Chips': { grams: 300, measure: '1 serving (300g)' },
  'BBQ Grilled Kangaroo Steak': { grams: 200, measure: '1 steak (200g)' },
  'Roast Lamb with Roasted Vegetables': { grams: 250, measure: '1 plate (250g)' },
  'Lamington': { grams: 80, measure: '1 piece (80g)' },
  'Pavlova': { grams: 100, measure: '1 slice (100g)' },
  'Greek Yogurt Parfait': { grams: 250, measure: '1 cup (250g)' },
  'Olive Oil Toast': { grams: 60, measure: '2 slices (60g)' },
  'Spinach & Feta Omelette': { grams: 200, measure: '3 eggs (200g)' },
  'Fattoush Salad': { grams: 200, measure: '1 bowl (200g)' },
  'Seafood Paella-Style': { grams: 350, measure: '1 plate (350g)' },
  'Chickpea & Vegetable Stew': { grams: 300, measure: '1 bowl (300g)' },
  'Grilled Chicken Souvlaki': { grams: 250, measure: '2 skewers (250g)' },
  'Baked Cod with Tomatoes & Olives': { grams: 220, measure: '1 fillet + veg (220g)' },
  'Stuffed Bell Peppers': { grams: 200, measure: '1 pepper (200g)' },
  'Lamb Kofta with Vegetables': { grams: 250, measure: '1 plate (250g)' },
  'Hummus & Vegetable Sticks': { grams: 150, measure: '3 tbsp + sticks (150g)' },
  'Feta with Black Olives': { grams: 60, measure: '50g feta + 10 olives (60g)' },
  'Falafel Bowl': { grams: 300, measure: '1 bowl (300g)' },
  'Lentil Soup with Bread': { grams: 250, measure: '1 bowl (250g)' },
  'Chickpea Salad': { grams: 250, measure: '1 bowl (250g)' },
  'Veggie Burger': { grams: 200, measure: '1 burger (200g)' },
  'Paneer Tikka with Vegetables': { grams: 250, measure: '1 plate (250g)' },
  'Tofu Stir Fry with Rice': { grams: 300, measure: '1 plate (300g)' },
  'Vegetable Curry with Chickpeas & Rice': { grams: 350, measure: '1 bowl (350g)' },
  'Veggie Pasta with Cheese': { grams: 300, measure: '1 plate (300g)' },
  'Trail Mix': { grams: 40, measure: '1 handful (40g)' },
  'Paneer Scramble on Toast': { grams: 200, measure: '1 plate (200g)' },
  'Oatmeal with Berries & Almonds': { grams: 250, measure: '1 bowl (250g)' },
  'Veggie Breakfast Bowl': { grams: 250, measure: '1 bowl (250g)' },
  'Cheese Omelette': { grams: 200, measure: '3 eggs (200g)' },
  'Avocado & Bacon': { grams: 150, measure: '1 plate (150g)' },
  'Steak with Butter': { grams: 200, measure: '1 steak (200g)' },
  'Bunless Cheeseburger': { grams: 180, measure: '1 patty (180g)' },
  'Cauliflower Fried Rice': { grams: 200, measure: '1 cup (200g)' },
  'Grilled Salmon with Asparagus': { grams: 220, measure: '1 fillet + asparagus (220g)' },
  'Bacon-Wrapped Chicken Thighs': { grams: 250, measure: '2 thighs (250g)' },
  'Zucchini Noodles with Beef Marinara': { grams: 300, measure: '1 bowl (300g)' },
  'Garlic Butter Shrimp': { grams: 180, measure: '1 plate (180g)' },
  'Chicken & Cheddar Lettuce Wraps': { grams: 250, measure: '3 wraps (250g)' },
  'Cheddar Cheese Cubes': { grams: 60, measure: '2 cubes (60g)' },
  'Mixed Nuts': { grams: 30, measure: '1 handful (30g)' },
  'Egg White Scramble with Chicken': { grams: 250, measure: '1 plate (250g)' },
  'Whey Protein Pancakes': { grams: 120, measure: '2 pancakes (120g)' },
  'Greek Yogurt Protein Bowl': { grams: 250, measure: '1 bowl (250g)' },
  'Grilled Chicken Breast': { grams: 150, measure: '1 breast (150g)' },
  'Tuna Steak': { grams: 150, measure: '1 steak (150g)' },
  'Lean Beef Bowl': { grams: 300, measure: '1 bowl (300g)' },
  'Chicken & Rice Protein Bowl': { grams: 350, measure: '1 bowl (350g)' },
  'Grilled Salmon Fillet': { grams: 150, measure: '1 fillet (150g)' },
  'Chicken Burrito Bowl': { grams: 300, measure: '1 bowl (300g)' },
  'Beef Steak with Sweet Potato': { grams: 300, measure: '1 plate (300g)' },
  'Turkey Pasta Protein Bowl': { grams: 300, measure: '1 plate (300g)' },
  'Cottage Cheese': { grams: 150, measure: '1 cup (150g)' },
  'Apple': { grams: 182, measure: '1 medium (182g)' },
  'Banana': { grams: 118, measure: '1 medium (118g)' },
  'Orange': { grams: 131, measure: '1 medium (131g)' },
  'Mango': { grams: 165, measure: '1 cup (165g)' },
  'Strawberries': { grams: 152, measure: '1 cup (152g)' },
  'Watermelon': { grams: 280, measure: '1 wedge (280g)' },
  'Grapes': { grams: 92, measure: '1 cup (92g)' },
  'Avocado': { grams: 100, measure: '½ medium (100g)' },
  'Guava': { grams: 100, measure: '1 medium (100g)' },
  'Dates (3 pcs)': { grams: 60, measure: '3 dates (60g)' },
  'Kiwi': { grams: 76, measure: '1 medium (76g)' },
  'Papaya': { grams: 140, measure: '1 cup (140g)' },
  'Pineapple': { grams: 165, measure: '1 cup (165g)' },
  'Blueberries': { grams: 148, measure: '1 cup (148g)' },
  'Passion Fruit': { grams: 100, measure: '2 fruits (100g)' },
  'Dragon Fruit': { grams: 100, measure: '½ fruit (100g)' },
  'Coconut Water': { grams: 250, measure: '1 bottle (250ml)', ml: 250 },
  'Avocado Smoothie': { grams: 250, measure: '1 glass (250ml)', ml: 250 },
  'Sugarcane Juice': { grams: 200, measure: '1 glass (200ml)', ml: 200, note: 'natural sugars' },
};

export const getPortion = (name: string, mealType?: MealType): Portion =>
  PORTION_OVERRIDES[name] ?? PORTION_BY_MEALTYPE[mealType ?? 'lunch'] ?? DEFAULT_PORTION;

export interface RegionalFood {
  name_en: string;
  name_ar: string;
  mealType: MealType;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion?: Portion;
}

export interface CuisineGroupItem {
  id: string;
  nameAr: string;
  nameEn: string;
}

export interface CuisineGroup {
  region: string;
  regionAr: string;
  items: CuisineGroupItem[];
}

export const CUISINE_GROUPS: CuisineGroup[] = [
  {
    region: 'North Africa',
    regionAr: 'مطابخ شمال أفريقيا',
    items: [
      { id: 'egyptian', nameAr: 'مصري', nameEn: 'Egyptian' },
      { id: 'libyan', nameAr: 'ليبي', nameEn: 'Libyan' },
      { id: 'tunisian', nameAr: 'تونسي', nameEn: 'Tunisian' },
      { id: 'algerian', nameAr: 'جزائري', nameEn: 'Algerian' },
      { id: 'moroccan', nameAr: 'مغربي', nameEn: 'Moroccan' },
    ],
  },
  {
    region: 'Gulf',
    regionAr: 'مطبخ الخليج',
    items: [
      { id: 'saudi', nameAr: 'سعودي', nameEn: 'Saudi' },
      { id: 'emirati', nameAr: 'إماراتي', nameEn: 'Emirati' },
      { id: 'omani', nameAr: 'عماني', nameEn: 'Omani' },
      { id: 'kuwaiti', nameAr: 'كويتي', nameEn: 'Kuwaiti' },
      { id: 'qatar', nameAr: 'قطري', nameEn: 'Qatari' },
      { id: 'bahraini', nameAr: 'بحريني', nameEn: 'Bahraini' },
    ],
  },
  {
    region: 'Asia',
    regionAr: 'مطبخ آسيا',
    items: [
      { id: 'indian', nameAr: 'هندي', nameEn: 'Indian' },
      { id: 'pakistani', nameAr: 'باكستاني', nameEn: 'Pakistani' },
      { id: 'chinese', nameAr: 'صيني', nameEn: 'Chinese' },
      { id: 'korean', nameAr: 'كوري', nameEn: 'Korean' },
      { id: 'japanese', nameAr: 'ياباني', nameEn: 'Japanese' },
      { id: 'thai', nameAr: 'تايلندي', nameEn: 'Thai' },
    ],
  },
  {
    region: 'European',
    regionAr: 'المطبخ الأوروبي',
    items: [
      { id: 'italian', nameAr: 'إيطالي', nameEn: 'Italian' },
      { id: 'french', nameAr: 'فرنسي', nameEn: 'French' },
      { id: 'spanish', nameAr: 'إسباني', nameEn: 'Spanish' },
      { id: 'greek', nameAr: 'يوناني', nameEn: 'Greek' },
      { id: 'turkish', nameAr: 'تركي', nameEn: 'Turkish' },
      { id: 'german', nameAr: 'ألماني', nameEn: 'German' },
    ],
  },
  {
    region: 'North America',
    regionAr: 'أمريكا الشمالية',
    items: [
      { id: 'american', nameAr: 'أمريكي', nameEn: 'American' },
      { id: 'mexican', nameAr: 'مكسيكي', nameEn: 'Mexican' },
      { id: 'canadian', nameAr: 'كندي', nameEn: 'Canadian' },
      { id: 'cuban', nameAr: 'كوبي', nameEn: 'Cuban' },
      { id: 'jamaican', nameAr: 'جامايكي', nameEn: 'Jamaican' },
      { id: 'costa_rican', nameAr: 'كوستاريكي', nameEn: 'Costa Rican' },
    ],
  },
  {
    region: 'South America',
    regionAr: 'أمريكا الجنوبية',
    items: [
      { id: 'brazilian', nameAr: 'برازيلي', nameEn: 'Brazilian' },
      { id: 'argentinian', nameAr: 'أرجنتيني', nameEn: 'Argentinian' },
      { id: 'peruvian', nameAr: 'بيروفي', nameEn: 'Peruvian' },
      { id: 'colombian', nameAr: 'كولومبي', nameEn: 'Colombian' },
      { id: 'chilean', nameAr: 'تشيلي', nameEn: 'Chilean' },
      { id: 'venezuelan', nameAr: 'فنزويلي', nameEn: 'Venezuelan' },
    ],
  },
  {
    region: 'Australia',
    regionAr: 'أستراليا',
    items: [
      { id: 'australian', nameAr: 'أسترالي', nameEn: 'Australian' },
    ],
  },
  {
    region: 'Middle East & Levant',
    regionAr: 'الشرق الأوسط والشام',
    items: [
      { id: 'middle_eastern', nameAr: 'شرق أوسطي', nameEn: 'Middle Eastern' },
    ],
  },
  {
    region: 'Africa',
    regionAr: 'أفريقيا',
    items: [
      { id: 'african', nameAr: 'أفريقي', nameEn: 'African' },
    ],
  },
  {
    region: 'Special Diets',
    regionAr: 'أنظمة غذائية خاصة',
    items: [
      { id: 'mediterranean', nameAr: 'متوسطي', nameEn: 'Mediterranean' },
      { id: 'keto', nameAr: 'كيتو', nameEn: 'Keto' },
      { id: 'high_protein', nameAr: 'عالي البروتين', nameEn: 'High Protein' },
      { id: 'vegetarian', nameAr: 'نباتي', nameEn: 'Vegetarian' },
    ],
  },
];

export const CUISINE_FLAGS: Record<string, string> = {
  egyptian: '🇪🇬', libyan: '🇱🇾', tunisian: '🇹🇳', algerian: '🇩🇿', moroccan: '🇲🇦',
  saudi: '🇸🇦', emirati: '🇦🇪', omani: '🇴🇲', kuwaiti: '🇰🇼', qatar: '🇶🇦', bahraini: '🇧🇭',
  indian: '🇮🇳', pakistani: '🇵🇰', chinese: '🇨🇳', korean: '🇰🇷', japanese: '🇯🇵', thai: '🇹🇭',
  italian: '🇮🇹', french: '🇫🇷', spanish: '🇪🇸', greek: '🇬🇷', turkish: '🇹🇷', german: '🇩🇪',
  american: '🇺🇸', mexican: '🇲🇽', canadian: '🇨🇦', cuban: '🇨🇺', jamaican: '🇯🇲', costa_rican: '🇨🇷',
  brazilian: '🇧🇷', argentinian: '🇦🇷', peruvian: '🇵🇪', colombian: '🇨🇴', chilean: '🇨🇱', venezuelan: '🇻🇪',
  australian: '🇦🇺',
  middle_eastern: '🧆', african: '🌍', mediterranean: '🫒', keto: '🥑', high_protein: '💪', vegetarian: '🌱',
};

export const REGIONAL_FOODS: Record<string, RegionalFood[]> = {
  ...NORTH_AFRICA_FOODS,
  ...GULF_FOODS,
  ...ASIA_FOODS,
  ...EUROPE_FOODS,
  ...NORTH_AMERICA_FOODS,
  ...SOUTH_AMERICA_FOODS,
  ...AUSTRALIA_FOODS,
  ...LEVANTINE_AFRICA_FOODS,
  ...SPECIAL_DIETS_FOODS,
};

export interface FruitJuiceInfo {
  name_en: string;
  name_ar: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: MealType;
  type: 'fruit' | 'juice';
  benefits: string;
  cuisine?: string[];
  portion?: Portion;
}

export const FRUITS: FruitJuiceInfo[] = [
  { name_en: 'Apple', name_ar: 'تفاحة', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, mealType: 'fruit', type: 'fruit', benefits: 'Rich in fiber & Vitamin C' },
  { name_en: 'Banana', name_ar: 'موزة', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, mealType: 'fruit', type: 'fruit', benefits: 'Potassium & natural energy' },
  { name_en: 'Orange', name_ar: 'برتقالة', calories: 62, protein: 1.2, carbs: 15.5, fat: 0.2, mealType: 'fruit', type: 'fruit', benefits: 'Vitamin C power' },
  { name_en: 'Mango', name_ar: 'مانجو', calories: 100, protein: 1.4, carbs: 25, fat: 0.6, mealType: 'fruit', type: 'fruit', benefits: 'Rich in Vitamin A & C' },
  { name_en: 'Strawberries', name_ar: 'فراولة', calories: 50, protein: 1, carbs: 12, fat: 0.5, mealType: 'fruit', type: 'fruit', benefits: 'Vitamin C & antioxidants' },
  { name_en: 'Watermelon', name_ar: 'بطيخ', calories: 46, protein: 0.9, carbs: 11.5, fat: 0.2, mealType: 'fruit', type: 'fruit', benefits: 'Hydration & lycopene' },
  { name_en: 'Pineapple', name_ar: 'أناناس', calories: 82, protein: 0.9, carbs: 21.6, fat: 0.2, mealType: 'fruit', type: 'fruit', benefits: 'Bromelain & Vitamin C' },
  { name_en: 'Kiwi', name_ar: 'كيوي', calories: 42, protein: 0.8, carbs: 10, fat: 0.4, mealType: 'fruit', type: 'fruit', benefits: 'Vitamin C & fiber' },
  { name_en: 'Avocado', name_ar: 'أفوكادو', calories: 160, protein: 2, carbs: 9, fat: 15, mealType: 'fruit', type: 'fruit', benefits: 'Healthy fats & potassium' },
  { name_en: 'Grapes', name_ar: 'عنب', calories: 62, protein: 0.6, carbs: 16, fat: 0.2, mealType: 'fruit', type: 'fruit', benefits: 'Antioxidants & quick energy' },
  { name_en: 'Peach', name_ar: 'خوخ', calories: 59, protein: 1.4, carbs: 14, fat: 0.4, mealType: 'fruit', type: 'fruit', benefits: 'Vitamins A & C' },
  { name_en: 'Pear', name_ar: 'كمثرى', calories: 101, protein: 0.6, carbs: 27, fat: 0.2, mealType: 'fruit', type: 'fruit', benefits: 'Fiber & Vitamin C' },
  { name_en: 'Blueberries', name_ar: 'توت أزرق', calories: 84, protein: 1.1, carbs: 21, fat: 0.5, mealType: 'fruit', type: 'fruit', benefits: 'Antioxidants' },
  { name_en: 'Raspberries', name_ar: 'توت', calories: 64, protein: 1.5, carbs: 14.7, fat: 0.8, mealType: 'fruit', type: 'fruit', benefits: 'Fiber & Vitamin C' },
  { name_en: 'Blackberries', name_ar: 'عليق أسود', calories: 62, protein: 2, carbs: 14, fat: 0.7, mealType: 'fruit', type: 'fruit', benefits: 'Antioxidants & fiber' },
  { name_en: 'Cherries', name_ar: 'كرز', calories: 77, protein: 1.3, carbs: 19, fat: 0.4, mealType: 'fruit', type: 'fruit', benefits: 'Melatonin & antioxidants' },
  { name_en: 'Pomegranate', name_ar: 'رمان', calories: 83, protein: 1.7, carbs: 19, fat: 1.2, mealType: 'fruit', type: 'fruit', benefits: 'Polyphenol powerhouse' },
  { name_en: 'Papaya', name_ar: 'بابايا', calories: 59, protein: 0.9, carbs: 15, fat: 0.4, mealType: 'fruit', type: 'fruit', benefits: 'Digestive enzymes & Vitamin C' },
  { name_en: 'Guava', name_ar: 'جوافة', calories: 68, protein: 2.6, carbs: 14, fat: 1, mealType: 'fruit', type: 'fruit', benefits: 'Vitamin C champion' },
  { name_en: 'Cantaloupe', name_ar: 'شمام', calories: 54, protein: 1.3, carbs: 13, fat: 0.3, mealType: 'fruit', type: 'fruit', benefits: 'Vitamin A & hydration' },
  { name_en: 'Honeydew Melon', name_ar: 'قندولة', calories: 61, protein: 0.9, carbs: 16, fat: 0.2, mealType: 'fruit', type: 'fruit', benefits: 'Hydration & Vitamin C' },
  { name_en: 'Plum', name_ar: 'برقوق', calories: 76, protein: 0.8, carbs: 19, fat: 0.4, mealType: 'fruit', type: 'fruit', benefits: 'Fiber & Vitamin C' },
  { name_en: 'Apricot', name_ar: 'مشمش', calories: 48, protein: 0.7, carbs: 11, fat: 0.4, mealType: 'fruit', type: 'fruit', benefits: 'Vitamin A & fiber' },
  { name_en: 'Fig', name_ar: 'تين', calories: 74, protein: 0.8, carbs: 19, fat: 0.3, mealType: 'fruit', type: 'fruit', benefits: 'Fiber & minerals' },
  { name_en: 'Dates (3 pcs)', name_ar: 'تمر (3 حبات)', calories: 66, protein: 0.5, carbs: 18, fat: 0.1, mealType: 'fruit', type: 'fruit', benefits: 'Natural energy & fiber' },
  { name_en: 'Lemon', name_ar: 'ليمون', calories: 29, protein: 1.1, carbs: 9, fat: 0.3, mealType: 'fruit', type: 'fruit', benefits: 'Vitamin C boost' },
  { name_en: 'Lime', name_ar: 'ليمون أخضر', calories: 20, protein: 0.2, carbs: 7, fat: 0.1, mealType: 'fruit', type: 'fruit', benefits: 'Vitamin C & refreshment' },
  { name_en: 'Grapefruit', name_ar: 'جريب فروت', calories: 52, protein: 1, carbs: 13, fat: 0.2, mealType: 'fruit', type: 'fruit', benefits: 'Vitamin C & fiber' },
  { name_en: 'Starfruit', name_ar: 'فاكهة النجمة', calories: 41, protein: 1, carbs: 9, fat: 0.4, mealType: 'fruit', type: 'fruit', benefits: 'Low-sugar Vitamin C' },
  { name_en: 'Dragon Fruit', name_ar: 'بيتايا', calories: 60, protein: 1.2, carbs: 13, fat: 0.4, mealType: 'fruit', type: 'fruit', benefits: 'Fiber & antioxidants' },
  { name_en: 'Passion Fruit', name_ar: 'فاكهة الآلام', calories: 68, protein: 2.5, carbs: 16, fat: 0.5, mealType: 'fruit', type: 'fruit', benefits: 'Fiber & Vitamin C' },
  { name_en: 'Coconut (fresh)', name_ar: 'جوز هند طازج', calories: 160, protein: 1.5, carbs: 7, fat: 15, mealType: 'fruit', type: 'fruit', benefits: 'Healthy MCT fats' },
  { name_en: 'Cranberries', name_ar: 'توت بري', calories: 46, protein: 0.4, carbs: 12, fat: 0.1, mealType: 'fruit', type: 'fruit', benefits: 'Antioxidants' },
];

export const JUICES: FruitJuiceInfo[] = [
  { name_en: 'Orange Juice', name_ar: 'عصير برتقال', calories: 110, protein: 1.7, carbs: 25.5, fat: 0.4, mealType: 'juice', type: 'juice', benefits: 'Vitamin C & potassium' },
  { name_en: 'Mango Juice', name_ar: 'عصير مانجو', calories: 120, protein: 1, carbs: 27, fat: 0.6, mealType: 'juice', type: 'juice', benefits: 'Vitamin A & C' },
  { name_en: 'Strawberry Juice', name_ar: 'عصير فراولة', calories: 100, protein: 1, carbs: 24, fat: 0.3, mealType: 'juice', type: 'juice', benefits: 'Rich in Vitamin C' },
  { name_en: 'Lemon Juice', name_ar: 'عصير ليمون', calories: 50, protein: 1, carbs: 15, fat: 0.2, mealType: 'juice', type: 'juice', benefits: 'Vitamin C & antioxidants' },
  { name_en: 'Carrot Juice', name_ar: 'عصير جزر', calories: 80, protein: 2, carbs: 19, fat: 0.3, mealType: 'juice', type: 'juice', benefits: 'Beta-carotene (Vitamin A)' },
  { name_en: 'Pomegranate Juice', name_ar: 'عصير رمان', calories: 130, protein: 0.5, carbs: 32, fat: 0.7, mealType: 'juice', type: 'juice', benefits: 'Polyphenols & immunity' },
  { name_en: 'Guava Juice', name_ar: 'عصير جوافة', calories: 90, protein: 2, carbs: 22, fat: 0.5, mealType: 'juice', type: 'juice', benefits: 'Vitamin C champion' },
  { name_en: 'Apple Juice', name_ar: 'عصير تفاح', calories: 115, protein: 0.2, carbs: 28, fat: 0.3, mealType: 'juice', type: 'juice', benefits: 'Quick natural energy' },
  { name_en: 'Grape Juice', name_ar: 'عصير عنب', calories: 150, protein: 0.5, carbs: 37, fat: 0.3, mealType: 'juice', type: 'juice', benefits: 'Resveratrol antioxidants' },
  { name_en: 'Pineapple Juice', name_ar: 'عصير أناناس', calories: 130, protein: 0.8, carbs: 33, fat: 0.1, mealType: 'juice', type: 'juice', benefits: 'Bromelain & Vitamin C' },
  { name_en: 'Watermelon Juice', name_ar: 'عصير بطيخ', calories: 70, protein: 1, carbs: 18, fat: 0.3, mealType: 'juice', type: 'juice', benefits: 'Hydration & lycopene' },
  { name_en: 'Tomato Juice', name_ar: 'عصير طماطم', calories: 41, protein: 1.8, carbs: 10, fat: 0.1, mealType: 'juice', type: 'juice', benefits: 'Lycopene & Vitamin K' },
  { name_en: 'Cranberry Juice', name_ar: 'عصير توت بري', calories: 110, protein: 0.4, carbs: 27, fat: 0.2, mealType: 'juice', type: 'juice', benefits: 'Urinary tract health' },
  { name_en: 'Grapefruit Juice', name_ar: 'عصير جريب فروت', calories: 96, protein: 1.3, carbs: 22, fat: 0.3, mealType: 'juice', type: 'juice', benefits: 'Vitamin C & metabolism' },
  { name_en: 'Mixed Berry Juice', name_ar: 'عصير توت مشكل', calories: 120, protein: 1, carbs: 28, fat: 0.5, mealType: 'juice', type: 'juice', benefits: 'Antioxidant blend' },
  { name_en: 'Peach Juice', name_ar: 'عصير خوخ', calories: 110, protein: 1.5, carbs: 25, fat: 0.3, mealType: 'juice', type: 'juice', benefits: 'Vitamins & soft fiber' },
  { name_en: 'Papaya Juice', name_ar: 'عصير بابايا', calories: 115, protein: 0.8, carbs: 28, fat: 0.3, mealType: 'juice', type: 'juice', benefits: 'Digestive enzymes & Vitamin C' },
  { name_en: 'Coconut Water', name_ar: 'ماء جوز الهند', calories: 46, protein: 1.7, carbs: 9, fat: 0.5, mealType: 'juice', type: 'juice', benefits: 'Electrolytes & hydration' },
  { name_en: 'Multi-Fruit Cocktail', name_ar: 'كوكتيل فواكه', calories: 120, protein: 0.8, carbs: 29, fat: 0.2, mealType: 'juice', type: 'juice', benefits: 'Vitamin C mix' },
  { name_en: 'Avocado Smoothie', name_ar: 'سموثي أفوكادو', calories: 180, protein: 2, carbs: 26, fat: 7, mealType: 'juice', type: 'juice', benefits: 'Healthy fats & energy' },
  { name_en: 'Sugarcane Juice', name_ar: 'عصير قصب', calories: 120, protein: 0.3, carbs: 30, fat: 0.2, mealType: 'juice', type: 'juice', benefits: 'Quick energy & electrolytes' },
];

const signatureFruits = (name_en: string): FruitJuiceInfo | undefined => FRUITS.find((f) => f.name_en === name_en);
const signatureJuices = (name_en: string): FruitJuiceInfo | undefined => JUICES.find((j) => j.name_en === name_en);

const CUISINE_SIGNATURE_FRUITS: Record<string, string[]> = {
  saudi: ['Dates (3 pcs)'],
  emirati: ['Dates (3 pcs)'],
  omani: ['Dates (3 pcs)'],
  kuwaiti: ['Dates (3 pcs)'],
  qatar: ['Dates (3 pcs)'],
  bahraini: ['Dates (3 pcs)'],
  egyptian: ['Guava', 'Mango'],
  indian: ['Mango'],
  mexican: ['Papaya'],
  african: ['Pineapple', 'Papaya'],
  brazilian: ['Passion Fruit'],
  thai: ['Pineapple', 'Mango'],
  moroccan: ['Orange'],
  tunisian: ['Fig'],
  middle_eastern: ['Fig'],
  greek: ['Grapes'],
  italian: ['Grapes'],
  turkish: ['Apricot'],
};

const CUISINE_SIGNATURE_DRINKS: Record<string, string[]> = {
  saudi: ['Sugarcane Juice'],
  emirati: ['Sugarcane Juice'],
  egyptian: ['Guava Juice', 'Mango Juice'],
  indian: ['Mango Juice'],
  pakistani: ['Mango Juice'],
  thai: ['Pineapple Juice'],
  mexican: ['Watermelon Juice'],
  brazilian: ['Coconut Water'],
  middle_eastern: ['Pomegranate Juice'],
  mediterranean: ['Pomegranate Juice'],
};

export const CUISINE_FRUITS: Record<string, FruitJuiceInfo[]> = {};
export const CUISINE_JUICES: Record<string, FruitJuiceInfo[]> = {};
CUISINE_GROUPS.flatMap((g) => g.items).forEach((c, i) => {
  const third = Math.floor(FRUITS.length / 3);
  const baseFruits = [FRUITS[i % FRUITS.length], FRUITS[(i + third) % FRUITS.length], FRUITS[(i + third * 2) % FRUITS.length]];
  const specialFruits = (CUISINE_SIGNATURE_FRUITS[c.id] ?? []).map(signatureFruits).filter(Boolean) as FruitJuiceInfo[];
  CUISINE_FRUITS[c.id] = [...baseFruits, ...specialFruits].map((f) => ({ ...f, mealType: 'fruit' as MealType, cuisine: [c.id] }));

  const quarter = Math.floor(JUICES.length / 3);
  const baseJuices = [JUICES[i % JUICES.length], JUICES[(i + quarter) % JUICES.length], JUICES[(i + quarter * 2) % JUICES.length]];
  const specialJuices = (CUISINE_SIGNATURE_DRINKS[c.id] ?? []).map(signatureJuices).filter(Boolean) as FruitJuiceInfo[];
  CUISINE_JUICES[c.id] = [...baseJuices, ...specialJuices].map((f) => ({ ...f, mealType: 'juice' as MealType, cuisine: [c.id] }));
});