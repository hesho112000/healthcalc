# -*- coding: utf-8 -*-
"""Build src/data/libyan-full-100-USDA.json from src/data/libyan-full.ts,
mirroring the Moroccan kitchen pipeline (5 languages, enriched fields) and then
expanding with ~100 culinary-realistic variants (confidence 65, "variant")."""
import json
import os
import re
import sys

from libyan_translations import CATS, CAT_ORDER, T

PROJECT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_TS = os.path.join(PROJECT, "src", "data", "libyan-full.ts")
OUT_JSON = os.path.join(PROJECT, "src", "data", "libyan-full-100-USDA.json")

LINE_RE = re.compile(
    r'\{\s*"id":"([^"]+)",\s*"nameAr":"([^"]*)",\s*"nameEn":"([^"]*)",'
    r'\s*"mealType":"([^"]*)",\s*"grams":([\d.]+),\s*"kcal":([\d.]+),'
    r'\s*"protein":([\d.]+),\s*"carbs":([\d.]+),\s*"fat":([\d.]+)(?:,\s*"cooking":"([^"]*)")?\s*\}'
)

MEAL_MAP = {
    "breakfast": ["breakfast"],
    "lunch": ["lunch", "dinner"],
    "dinner": ["dinner"],
    "side": ["lunch", "dinner"],
    "fruit": ["snacks", "breakfast"],
}

LEGUME_WORDS = ["loubia", "fasolia", "lentil", "foul", "fava", "chickpea", "بازيلاء", "حمص", "لوبيا", "فاصوليا", "عدس", "فول"]
VEG_WORDS = ["salad", "veg", "potato", "omelet", "okra", "dolma", "cabbage", "سلطة", "خضار", "بطاطا", "باذنجان", "كوسة", "جزر", "ملفوف", "ضولمة", "مشروم", "خيار", "فلفل", "زهرة"]
FRUIT_WORDS = ["apple", "orange", "banana", "watermelon", "mango", "dates", "raisin", "تفاح", "برتقال", "موز", "دلاع", "مانجو", "تمر", "زبيب"]
SWEET_WORDS = ["muhallabia", "maqroud", "jowaziat", "basbousa", "luqaimat", "asida", "cake", "sweet", "honey", "مهلبية", "مقروط", "جوزيات", "بسبوسة"]
DAIRY_WORDS = ["yogurt", "jben", "cheese", "labneh", "qarish", "زبادي", "لبنة", "جبن", "قريش", "egg", "بيض", "tuna", "تونة"]
SOUP_WORDS = ["shorba", "soup", "hasa", "شربة", "شوربة", "حساء"]

FRIED_IDS = {"lib_sfinz"}  # fried dough pieces (name carries no "fried" word)

# default sat factor by category
SAT_CAT = {
    "breakfast": 0.32, "breads_pastries": 0.30, "soups": 0.25, "salads_sides": 0.20,
    "couscous_bazeen": 0.30, "main_dishes": 0.32, "grilled_meats": 0.35,
    "fish_seafood": 0.10, "sweets_desserts": 0.30, "dairy_eggs_fruits": 0.50,
}

PIECE_WORDS = ["خبز", "سفنز", "بوريك", "مبطن", "لقيمات", "كعك", "جوزيات", "مقروط", "بسبوسة", "مهلبية", "خبزة"]


def r1(x):
    return round(x * 10) / 10


def estimates(cat, name_en, name_ar, fat):
    text = name_en.lower() + " " + name_ar

    if any(w in text for w in LEGUME_WORDS):
        fiber = 6.0
    elif any(w in text for w in VEG_WORDS):
        fiber = 3.0
    elif any(w in text for w in FRUIT_WORDS):
        if "watermelon" in text or "دلاع" in text:
            fiber = 0.4
        elif "date" in text or "تمر" in text or "raisin" in text or "زبيب" in text:
            fiber = 3.0
        elif "mango" in text or "مانجو" in text:
            fiber = 1.6
        elif "banana" in text or "موز" in text:
            fiber = 2.6
        else:
            fiber = 2.0
    elif cat == "couscous_bazeen":
        fiber = 3.0
    elif cat == "soups":
        fiber = 2.0
    elif cat in ("breakfast", "breads_pastries"):
        fiber = 2.5
    elif cat == "sweets_desserts":
        fiber = 1.5
    elif cat in ("grilled_meats", "main_dishes", "fish_seafood", "dairy_eggs_fruits"):
        fiber = 0.0
    else:
        fiber = 1.0

    if any(w in text for w in FRUIT_WORDS):
        if "date" in text or "تمر" in text or "raisin" in text or "زبيب" in text:
            sugar = 12.0
        elif "banana" in text or "موز" in text:
            sugar = 12.0
        elif "orange" in text or "برتقال" in text:
            sugar = 9.0
        elif "watermelon" in text or "دلاع" in text:
            sugar = 8.0
        elif "mango" in text or "مانجو" in text:
            sugar = 13.0
        elif "apple" in text or "تفاح" in text:
            sugar = 10.0
        else:
            sugar = 10.0
    elif cat == "sweets_desserts":
        sugar = 22.0
        if "luqaimat" in text or "لقيمات" in text or "muhallabia" in text or "مهلبية" in text:
            sugar = 12.0
        elif "basbousa" in text or "بسبوسة" in text or "jowaziat" in text or "جوزيات" in text:
            sugar = 30.0
    elif any(w in text for w in DAIRY_WORDS):
        if "yogurt" in text or "زبادي" in text:
            sugar = 4.0
        elif "tuna" in text or "تونة" in text:
            sugar = 0.0
        elif "cheese" in text or "جبن" in text or "labneh" in text or "لبنة" in text or "qarish" in text or "قريش" in text:
            sugar = 2.0
        else:
            sugar = 1.0
    elif cat == "soups":
        sugar = 2.0
    else:
        sugar = 1.0

    if cat == "soups":
        sodium = 350.0
    elif cat == "salads_sides":
        sodium = 150.0
    elif cat == "main_dishes":
        sodium = 280.0
    elif cat == "couscous_bazeen":
        sodium = 260.0
    elif cat == "grilled_meats":
        sodium = 150.0
    elif cat == "breads_pastries":
        sodium = 400.0
    elif cat == "sweets_desserts":
        sodium = 100.0
    elif cat == "dairy_eggs_fruits":
        if any(w in text for w in FRUIT_WORDS):
            sodium = 50.0
        elif "egg" in text or "بيض" in text:
            sodium = 70.0
        elif "tuna" in text or "تونة" in text:
            sodium = 60.0
        else:
            sodium = 50.0
    elif cat == "breakfast":
        if any(w in text for w in ["خبز", "مسمن", "شكشوكة"]):
            sodium = 380.0
        else:
            sodium = 180.0
    else:
        sodium = 150.0

    if cat == "fish_seafood":
        sat_factor = 0.10
    elif cat == "grilled_meats":
        sat_factor = 0.35
    elif cat == "main_dishes" and not any(w in text for w in LEGUME_WORDS + VEG_WORDS + SOUP_WORDS):
        sat_factor = 0.35
    elif cat in ("salads_sides", "dairy_eggs_fruits", "breakfast", "breads_pastries", "sweets_desserts"):
        sat_factor = 0.30
    else:
        sat_factor = 0.30

    sat_fat = r1(fat * sat_factor) if fat > 0 else 0.0
    return r1(fiber), r1(sugar), r1(sodium), sat_fat


def serving_fields(serv_g, cal_serv, name_ar):
    unit = "قطعة" if any(w in name_ar for w in PIECE_WORDS) else "حصة"
    desc = f"{unit} {int(serv_g)}جم"
    opts = []
    for label, label_en, mult in (("نص", "Half", 0.5), ("كامل", "Full", 1.0), ("مضاعف", "Double", 2.0)):
        opts.append({
            "label": label,
            "label_en": label_en,
            "multiplier": mult,
            "g": int(round(serv_g * mult)),
            "kcal": int(round(cal_serv * mult)),
        })
    return unit, desc, opts


# ---------------- VARIANTS ----------------
# base = cleaned Arabic name of the base dish; d = (dp, dc, df, d_fiber, d_sugar, d_sodium)
V = [
    # couscous & bazeen (18)
    dict(base="بازين بلحم الخروف", ar="بازين بلحم البقر", en="Bazeen with Beef", fr="Bazeen au Bœuf", es="Bazeen con Ternera", de="Bazeen mit Rindfleisch", d=(1, 0, -0.5, 0, 0, 0)),
    dict(base="بازين بلحم الخروف", ar="بازين باللحم والحمص", en="Bazeen with Meat and Chickpeas", fr="Bazeen à la Viande et Pois Chiches", es="Bazeen con Carne y Garbanzos", de="Bazeen mit Fleisch und Kichererbsen", d=(2, 6, 0.5, 2, 0, 0)),
    dict(base="بازين بلحم الخروف", ar="بازين بالخضار", en="Bazeen with Vegetables", fr="Bazeen aux Légumes", es="Bazeen con Verduras", de="Bazeen mit Gemüse", d=(0, 6, -1, 1.5, 0, 0)),
    dict(base="بازين بلحم الخروف", ar="بازين بالبامية", en="Bazeen with Okra", fr="Bazeen au Gombo", es="Bazeen con Quingombó", de="Bazeen mit Okra", d=(0, 2, 0, 1.5, 0, 0)),
    dict(base="بازين بالدجاج", ar="بازين بالدجاج والخضار", en="Bazeen with Chicken and Vegetables", fr="Bazeen au Poulet et Légumes", es="Bazeen con Pollo y Verduras", de="Bazeen mit Hähnchen und Gemüse", d=(0, 2, 0, 1.5, 0, 0)),
    dict(base="بازين بالدجاج", ar="بازين بالدجاج والحمص", en="Bazeen with Chicken and Chickpeas", fr="Bazeen au Poulet et Pois Chiches", es="Bazeen con Pollo y Garbanzos", de="Bazeen mit Hähnchen und Kichererbsen", d=(2, 6, 0.5, 2, 0, 0)),
    dict(base="بازين بالحوت", ar="بازين بالحوت والخضار", en="Bazeen with Fish and Vegetables", fr="Bazeen au Poisson et Légumes", es="Bazeen con Pescado y Verduras", de="Bazeen mit Fisch und Gemüse", d=(0, 2, 0, 1, 0, 0)),
    dict(base="بازين بالزكرة", ar="بازين بالزكرة والحمص", en="Bazeen Zekra with Chickpeas", fr="Bazeen Zekra aux Pois Chiches", es="Bazeen Zekra con Garbanzos", de="Bazeen Zekra mit Kichererbsen", d=(1, 3, 0.5, 1, 0, 0)),
    dict(base="كسكسي بلحم الخروف", ar="كسكسي بلحم البقر", en="Couscous with Beef", fr="Couscous au Bœuf", es="Cuscús con Ternera", de="Couscous mit Rindfleisch", d=(1, 0, -1, 0, 0, 0)),
    dict(base="كسكسي بلحم الخروف", ar="كسكسي باللحم والحمص", en="Couscous with Meat and Chickpeas", fr="Couscous à la Viande et Pois Chiches", es="Cuscús con Carne y Garbanzos", de="Couscous mit Fleisch und Kichererbsen", d=(2, 6, 0.5, 2, 0, 0)),
    dict(base="كسكسي بلحم الخروف", ar="كسكسي باللحم والزيتون", en="Couscous with Meat and Olives", fr="Couscous à la Viande aux Olives", es="Cuscús con Carne y Aceitunas", de="Couscous mit Fleisch und Oliven", d=(1, 1, 1, 0, 0, 90)),
    dict(base="كسكسي بلحم الخروف", ar="كسكسي باللحم والكوسة والجزر", en="Couscous with Meat, Zucchini and Carrots", fr="Couscous à la Viande, Courgettes et Carottes", es="Cuscús con Carne, Calabacín y Zanahorias", de="Couscous mit Fleisch, Zucchini und Karotten", d=(0, 4, 0, 1.5, 0, 0)),
    dict(base="كسكسي بالدجاج", ar="كسكسي بالدجاج والزبيب", en="Couscous with Chicken and Raisins", fr="Couscous au Poulet aux Raisins", es="Cuscús con Pollo y Pasas", de="Couscous mit Hähnchen und Rosinen", d=(2, 3, 0, 0.5, 5, 0)),
    dict(base="كسكسي بالدجاج", ar="كسكسي بالدجاج والحمص", en="Couscous with Chicken and Chickpeas", fr="Couscous au Poulet et Pois Chiches", es="Cuscús con Pollo y Garbanzos", de="Couscous mit Hähnchen und Kichererbsen", d=(2, 6, 0.5, 2, 0, 0)),
    dict(base="كسكسي بالدجاج", ar="كسكسي بالدجاج والزيتون", en="Couscous with Chicken and Olives", fr="Couscous au Poulet aux Olives", es="Cuscús con Pollo y Aceitunas", de="Couscous mit Hähnchen und Oliven", d=(1, 1, 1, 0, 0, 80)),
    dict(base="كسكسي بالحوت", ar="كسكسي بالحوت والخضار", en="Couscous with Fish and Vegetables", fr="Couscous au Poisson et Légumes", es="Cuscús con Pescado y Verduras", de="Couscous mit Fisch und Gemüse", d=(0, 3, 0, 1, 0, 0)),
    dict(base="كسكسي بالخضار", ar="كسكسي بالخضار والحمص", en="Vegetable Couscous with Chickpeas", fr="Couscous aux Légumes et Pois Chiches", es="Cuscús de Verduras con Garbanzos", de="Gemüse-Couscous mit Kichererbsen", d=(3, 5, 0.5, 2, 0, 0)),
    dict(base="كسكسي بالخضار", ar="كسكسي بالخضار والقرع", en="Vegetable Couscous with Pumpkin", fr="Couscous aux Légumes et Potiron", es="Cuscús de Verduras con Calabaza", de="Gemüse-Couscous mit Kürbis", d=(0, 5, 0, 2, 0, 0)),
    # main dishes (15)
    dict(base="رز مبكبك باللحم", ar="رز مبكبك باللحم والبازيلاء", en="Mbakbak Rice with Meat and Peas", fr="Riz Mbakbak à la Viande et Petits Pois", es="Arroz Mbakbak con Carne y Guisantes", de="Mbakbak-Reis mit Fleisch und Erbsen", d=(1, 4, 0, 1.5, 0, 10)),
    dict(base="رز مبكبك باللحم", ar="رز مبكبك باللحم والزبيب", en="Mbakbak Rice with Meat and Raisins", fr="Riz Mbakbak à la Viande et Raisins", es="Arroz Mbakbak con Carne y Pasas", de="Mbakbak-Reis mit Fleisch und Rosinen", d=(1, 3, 0, 0.5, 6, 0)),
    dict(base="رز مبكبك بالدجاج", ar="رز مبكبك بالدجاج والخضار", en="Mbakbak Rice with Chicken and Vegetables", fr="Riz Mbakbak au Poulet et Légumes", es="Arroz Mbakbak con Pollo y Verduras", de="Mbakbak-Reis mit Hähnchen und Gemüse", d=(0, 3, 0, 1.5, 0, 0)),
    dict(base="مبطن", ar="مبطن بالجبن", en="Mbatten Stuffed with Cheese", fr="Mbatten Farci au Fromage", es="Mbatten Relleno de Queso", de="Mbatten mit Käse gefüllt", d=(3, 3, 4, 0, 0, 80), sat=0.5),
    dict(base="مبطن", ar="مبطن باللحم والبيض", en="Mbatten with Meat and Eggs", fr="Mbatten à la Viande et Œufs", es="Mbatten con Carne y Huevos", de="Mbatten mit Fleisch und Eiern", d=(4, 5, 1, 0.5, 0, 40)),
    dict(base="مبطن بالفرن", ar="مبطن بالفرن بالجبن والبيض", en="Oven-Baked Mbatten with Cheese and Eggs", fr="Mbatten au Four au Fromage et Œufs", es="Mbatten al Horno con Queso y Huevos", de="Ofen-Mbatten mit Käse und Eiern", d=(3, 4, 1.5, 0, 0, 50)),
    dict(base="عصبان", ar="عصبان بالأرز", en="Osban Stuffed with Rice", fr="Osban Farci au Riz", es="Osban Relleno de Arroz", de="Osban mit Reis gefüllt", d=(1, 6, 0, 0.5, 0, 20)),
    dict(base="عصبان", ar="عصبان باللحم المفروم", en="Osban with Minced Meat", fr="Osban à la Viande Hachée", es="Osban con Carne Picada", de="Osban mit Hackfleisch", d=(2, 2, 1, 0, 0, 20)),
    dict(base="مقلوبة باللحم", ar="مقلوبة باللحم والزهرة", en="Maqluba with Meat and Cauliflower", fr="Maqluba à la Viande et Chou-fleur", es="Maqluba con Carne y Coliflor", de="Maqluba mit Fleisch und Blumenkohl", d=(1, 6, 0, 1.5, 0, 10)),
    dict(base="مقلوبة باللحم", ar="مقلوبة باللحم والباذنجان", en="Maqluba with Meat and Eggplant", fr="Maqluba à la Viande et Aubergine", es="Maqluba con Carne y Berenjena", de="Maqluba mit Fleisch und Aubergine", d=(1, 3, 1, 1.5, 0, 10)),
    dict(base="مقلوبة بالدجاج", ar="مقلوبة بالدجاج والخضار", en="Maqluba with Chicken and Vegetables", fr="Maqluba au Poulet et Légumes", es="Maqluba con Pollo y Verduras", de="Maqluba mit Hähnchen und Gemüse", d=(0, 4, 0, 1.5, 0, 0)),
    dict(base="ملفوف محشي", ar="ملفوف محشي بالأرز واللحم", en="Stuffed Cabbage with Rice and Meat", fr="Choux Farcis au Riz et Viande", es="Repollo Relleno con Arroz y Carne", de="Gefüllter Kohl mit Reis und Fleisch", d=(2, 2, 0.5, 1.5, 0, 20)),
    dict(base="ملفوف محشي", ar="ملفوف محشي بالدجاج", en="Stuffed Cabbage with Chicken", fr="Choux Farcis au Poulet", es="Repollo Relleno con Pollo", de="Gefüllter Kohl mit Hähnchen", d=(1, 0, 0, 0.5, 0, 10)),
    dict(base="ضولمة", ar="ضولمة بالخضار", en="Dolma with Vegetables", fr="Dolma aux Légumes", es="Dolma con Verduras", de="Dolma mit Gemüse", d=(1, 6, 0, 2, 0, 10)),
    dict(base="ضولمة", ar="ضولمة بالكوسة", en="Dolma with Stuffed Zucchini", fr="Dolma aux Courgettes Farcies", es="Dolma con Calabacines Rellenos", de="Dolma mit gefüllten Zucchini", d=(1, 4, 0.5, 1.5, 0, 10)),
    # grilled meats (12)
    dict(base="لحم خروف مشوي", ar="لحم خروف مشوي بالشرمولة", en="Grilled Lamb with Chermoula", fr="Agneau Grillé à la Chermoula", es="Cordero a la Parrilla con Chermoula", de="Gegrilltes Lamm mit Chermoula", d=(1, 1, 0.5, 0, 0, 30)),
    dict(base="لحم خروف مشوي", ar="لحم خروف مشوي بالكمون", en="Grilled Lamb with Cumin", fr="Agneau Grillé au Cumin", es="Cordero a la Parrilla con Comino", de="Gegrilltes Lamm mit Kreuzkümmel", d=(1, 0, 0.5, 0, 0, 20)),
    dict(base="لحم بقري مشوي", ar="لحم بقري مشوي بالزعتر والليمون", en="Grilled Beef with Thyme and Lemon", fr="Bœuf Grillé au Thym et Citron", es="Ternera a la Parrilla con Tomillo y Limón", de="Gegrilltes Rindfleisch mit Thymian und Zitrone", d=(1, 1, 0.5, 0, 0, 20)),
    dict(base="لحم معيز مشوي", ar="لحم معيز مشوي بالشرمولة", en="Grilled Goat with Chermoula", fr="Chèvre Grillée à la Chermoula", es="Cabra a la Parrilla con Chermoula", de="Gegrillte Ziege mit Chermoula", d=(1, 1, 0.5, 0, 0, 30)),
    dict(base="صدر دجاج مشوي", ar="صدر دجاج مشوي بالشرمولة", en="Grilled Chicken Breast with Chermoula", fr="Poitrine de Poulet Grillé à la Chermoula", es="Pechuga de Pollo a la Parrilla con Chermoula", de="Gegrillte Hähnchenbrust mit Chermoula", d=(2, 1, 0.5, 0, 0, 30)),
    dict(base="صدر دجاج مشوي", ar="صدر دجاج مشوي بالليمون والزعتر", en="Grilled Chicken Breast with Lemon and Thyme", fr="Poitrine de Poulet Grillé au Citron et Thym", es="Pechuga de Pollo a la Parrilla con Limón y Tomillo", de="Gegrillte Hähnchenbrust mit Zitrone und Thymian", d=(2, 1, 0.5, 0, 0, 20)),
    dict(base="صدر رومي مشوي", ar="صدر رومي مشوي بالشرمولة", en="Grilled Turkey Breast with Chermoula", fr="Poitrine de Dinde Grillé à la Chermoula", es="Pechuga de Pavo a la Parrilla con Chermoula", de="Gegrillte Putenbrust mit Chermoula", d=(1, 1, 0.5, 0, 0, 30)),
    dict(base="بط مشوي", ar="بط مشوي بالبرتقال", en="Grilled Duck with Orange Sauce", fr="Canard Grillé à l'Orange", es="Pato a la Parrilla con Naranja", de="Gegrillte Ente mit Orange", d=(2, 2, 1, 0.5, 8, 20), sweet=True),
    dict(base="حمام مشوي", ar="حمام مشوي بالزعفران", en="Grilled Pigeon with Saffron", fr="Pigeon Grillé au Safran", es="Pichón a la Parrilla con Azafrán", de="Gegrillte Taube mit Safran", d=(1, 0, 0.5, 0, 0, 10)),
    dict(base="كباب لحم مشوي", ar="كباب لحم بالبقدونس", en="Lamb Kebab with Parsley", fr="Kebab d'Agneau au Persil", es="Brocheta de Cordero con Perejil", de="Lamm-Kebab mit Petersilie", d=(1, 1, 0.5, 0, 0, 20)),
    dict(base="كباب لحم مشوي", ar="كباب لحم بالتتبيلة الحارة", en="Lamb Kebab with Spicy Marinade", fr="Kebab d'Agneau à la Marinade Épicée", es="Brocheta de Cordero con Marinada Picante", de="Lamm-Kebab mit scharfer Marinade", d=(1, 1, 0.5, 0, 0, 40)),
    dict(base="كفتة مشوية", ar="كفتة مشوية بالبقدونس والكمون", en="Grilled Kofta with Parsley and Cumin", fr="Kofta Grillée au Persil et Cumin", es="Kofta a la Parrilla con Perejil y Comino", de="Gegrillte Kofta mit Petersilie und Kreuzkümmel", d=(2, 1, 1, 0, 0, 20)),
    # soups (9)
    dict(base="شربة باللحم", ar="شربة باللحم والعدس", en="Shorba with Meat and Lentils", fr="Shorba à la Viande et Lentilles", es="Shorba con Carne y Lentejas", de="Shorba mit Fleisch und Linsen", d=(2, 4, 0.5, 2, 0, 20)),
    dict(base="شربة باللحم", ar="شربة باللحم والحمص", en="Shorba with Meat and Chickpeas", fr="Shorba à la Viande et Pois Chiches", es="Shorba con Carne y Garbanzos", de="Shorba mit Fleisch und Kichererbsen", d=(2, 5, 0.5, 2, 0, 20)),
    dict(base="شربة باللحم", ar="شربة بالخضار", en="Vegetable Shorba", fr="Shorba aux Légumes", es="Shorba con Verduras", de="Shorba mit Gemüse", d=(1, 3, 0, 1.5, 0, 10)),
    dict(base="شربة بالدجاج", ar="شربة بالدجاج والشعيرية", en="Chicken Shorba with Vermicelli", fr="Shorba de Poulet aux Vermicelles", es="Shorba de Pollo con Fideos", de="Hähnchen-Shorba mit Fadennudeln", d=(2, 6, 0.5, 0.5, 0, 10)),
    dict(base="شربة بالدجاج", ar="شربة بالدجاج والخضار", en="Chicken Shorba with Vegetables", fr="Shorba de Poulet aux Légumes", es="Shorba de Pollo con Verduras", de="Hähnchen-Shorba mit Gemüse", d=(1, 2, 0, 1, 0, 10)),
    dict(base="شوربة العدس", ar="شوربة العدس بالجزر", en="Lentil Soup with Carrots", fr="Soupe aux Lentilles et Carottes", es="Sopa de Lentejas con Zanahorias", de="Linsensuppe mit Karotten", d=(1, 4, 0, 1.5, 0, 10)),
    dict(base="شوربة العدس", ar="شوربة العدس بالكمون", en="Lentil Soup with Cumin", fr="Soupe aux Lentilles au Cumin", es="Sopa de Lentejas con Comino", de="Linsensuppe mit Kreuzkümmel", d=(0, 1, 0, 0, 0, 20)),
    dict(base="شوربة العدس الحمراء", ar="شوربة العدس الحمراء بالطماطم", en="Red Lentil Soup with Tomato", fr="Soupe de Lentilles Rouges à la Tomate", es="Sopa de Lentejas Rojas con Tomate", de="Rote-Linsen-Suppe mit Tomaten", d=(1, 3, 0.5, 1, 0, 20)),
    dict(base="حساء الدجاج", ar="حساء الدجاج بالمعكرونة", en="Chicken Soup with Pasta", fr="Hasa de Poulet aux Pâtes", es="Sopa de Pollo con Pasta", de="Hühnersuppe mit Pasta", d=(2, 8, 0.5, 0.5, 0, 10)),
    # salads & sides (10)
    dict(base="سلطة خضراء", ar="سلطة الطماطم والبصل", en="Tomato and Onion Salad", fr="Salade de Tomates et Oignons", es="Ensalada de Tomate y Cebolla", de="Tomaten-Zwiebel-Salat", d=(1, 4, 0, 1, 0, 10)),
    dict(base="سلطة خضراء", ar="سلطة الخيار", en="Cucumber Salad", fr="Salade de Concombres", es="Ensalada de Pepino", de="Gurkensalat", d=(0, 2, 0, 0.5, 0, 10)),
    dict(base="سلطة خضراء", ar="سلطة الجزر", en="Carrot Salad", fr="Salade de Carottes", es="Ensalada de Zanahoria", de="Karottensalat", d=(1, 6, 0, 1.5, 2, 10)),
    dict(base="سلطة خضراء", ar="سلطة الفلفل المشوي", en="Grilled Pepper Salad", fr="Salade de Poivrons Grillés", es="Ensalada de Pimientos Asados", de="Gegrillter Paprikasalat", d=(1, 5, 0.5, 1.5, 4, 10)),
    dict(base="سلطة الطحينة", ar="سلطة الطحينة بالخيار", en="Tahini Salad with Cucumber", fr="Salade de Tahini au Concombre", es="Ensalada de Tahini con Pepino", de="Tahini-Salat mit Gurke", d=(0, 1, 0, 0.5, 0, 10)),
    dict(base="سلطة الطحينة", ar="سلطة الطحينة بالليمون", en="Tahini Salad with Lemon", fr="Salade de Tahini au Citron", es="Ensalada de Tahini con Limón", de="Tahini-Salat mit Zitrone", d=(0, 1, 0, 0, 0, 10)),
    dict(base="سلطة التونة", ar="سلطة التونة بالبصل", en="Tuna Salad with Onion", fr="Salade de Thon aux Oignons", es="Ensalada de Atún con Cebolla", de="Thunfischsalat mit Zwiebeln", d=(1, 2, 1, 0.5, 0, 30)),
    dict(base="بطاطا بالفرن", ar="بطاطا بالفرن بالزعتر والليمون", en="Oven-Baked Potatoes with Thyme and Lemon", fr="Pommes de Terre au Four au Thym et Citron", es="Patatas al Horno con Tomillo y Limón", de="Ofenkartoffeln mit Thymian und Zitrone", d=(1, 3, 0.5, 0.5, 0, 20)),
    dict(base="بطاطا بالفرن", ar="بطاطا بالفرن بالبابريكا", en="Oven-Baked Potatoes with Paprika", fr="Pommes de Terre au Four à la Paprika", es="Patatas al Horno con Pimentón", de="Ofenkartoffeln mit Paprika", d=(1, 3, 0.5, 0.5, 0, 30)),
    dict(base="بطاطا مهروسة", ar="بطاطا مهروسة بالثوم", en="Mashed Potatoes with Garlic", fr="Purée de Pommes de Terre à l'Ail", es="Puré de Patatas con Ajo", de="Kartoffelpüree mit Knoblauch", d=(1, 3, 0.5, 0.5, 0, 10)),
    # breakfast (9)
    dict(base="شكشوكة", ar="شكشوكة بالبطاطس", en="Shakshouka with Potatoes", fr="Chakchouka aux Pommes de Terre", es="Shakshuka con Patatas", de="Schakschuka mit Kartoffeln", d=(2, 7, 1, 1, 0, 30)),
    dict(base="شكشوكة", ar="شكشوكة بالباذنجان", en="Shakshouka with Eggplant", fr="Chakchouka à l'Aubergine", es="Shakshuka con Berenjena", de="Schakschuka mit Aubergine", d=(1, 4, 1, 2, 0, 20)),
    dict(base="فول بالطماطم", ar="فول بالكمون", en="Foul with Cumin", fr="Fèves au Cumin", es="Habas con Comino", de="Foul mit Kreuzkümmel", d=(0, 1, 0, 0.5, 0, 20)),
    dict(base="فول بالطماطم", ar="فول بزيت الزيتون", en="Foul with Olive Oil", fr="Fèves à l'Huile d'Olive", es="Habas con Aceite de Oliva", de="Foul mit Olivenöl", d=(0, 0, 1, 0, 0, 10)),
    dict(base="سفنز", ar="سفنز بالعسل", en="Sfinz with Honey", fr="Sfinz au Miel", es="Sfinz con Miel", de="Sfinz mit Honig", d=(0, 2, 1, 0, 8, 0), sweet=True),
    dict(base="سفنز", ar="سفنز بالجبن", en="Sfinz with Cheese", fr="Sfinz au Fromage", es="Sfinz con Queso", de="Sfinz mit Käse", d=(4, 1, 2, 0, 0, 60)),
    dict(base="زبادي", ar="زبادي بالعسل", en="Yogurt with Honey", fr="Yaourt au Miel", es="Yogur con Miel", de="Joghurt mit Honig", d=(1, 3, 0, 0, 8, 0), sweet=True),
    dict(base="جبنة بيضاء", ar="جبنة بيضاء بالزيتون", en="White Cheese with Olives", fr="Fromage Blanc aux Olives", es="Queso Blanco con Aceitunas", de="Weißkäse mit Oliven", d=(0, 1, 1, 0, 0, 80)),
    dict(base="أومليت بالخضار", ar="أومليت بالجبن", en="Omelette with Cheese", fr="Omelette au Fromage", es="Tortilla con Queso", de="Omelett mit Käse", d=(4, 1, 3, 0, 0, 60), sat=0.5),
    # breads & pastries (6)
    dict(base="خبزة بلدي", ar="خبزة بلدي بالسمسم", en="Baladi Bread with Sesame", fr="Pain Baladi au Sésame", es="Pan Baladi con Sésamo", de="Baladi-Brot mit Sesam", d=(1, 2, 1, 0.5, 0, 10)),
    dict(base="خبزة بلدي", ar="خبزة بلدي بالزيتون", en="Baladi Bread with Olives", fr="Pain Baladi aux Olives", es="Pan Baladi con Aceitunas", de="Baladi-Brot mit Oliven", d=(1, 2, 1, 0.5, 0, 80)),
    dict(base="خبزة التنور", ar="خبزة التنور بالسمسم", en="Tanoor Bread with Sesame", fr="Pain Tanoor au Sésame", es="Pan Tanoor con Sésamo", de="Tanoor-Brot mit Sesam", d=(1, 1, 0.5, 0.5, 0, 10)),
    dict(base="بوريك", ar="بوريك بالجبن", en="Bureek with Cheese", fr="Bureek au Fromage", es="Bureek con Queso", de="Bureek mit Käse", d=(3, 1, 3, 0, 0, 80), sat=0.5),
    dict(base="بوريك", ar="بوريك بالخضار", en="Bureek with Vegetables", fr="Bureek aux Légumes", es="Bureek con Verduras", de="Bureek mit Gemüse", d=(1, 4, 1, 1, 0, 20)),
    dict(base="خبزة ملة", ar="خبزة ملة بالحبة السوداء", en="Mella Bread with Black Seed", fr="Pain Mella aux Graines de Nigelle", es="Pan Mella con Semillas de Nigella", de="Mella-Brot mit Schwarzkümmel", d=(1, 1, 0.5, 0.5, 0, 10)),
    # fish & seafood (8)
    dict(base="حوت مشوي مشكل", ar="حوت مشوي بالشرمولة", en="Grilled Fish with Chermoula", fr="Poisson Grillé à la Chermoula", es="Pescado a la Parrilla con Chermoula", de="Gegrillter Fisch mit Chermoula", d=(2, 1, 0.5, 0, 0, 40)),
    dict(base="حوت مشوي مشكل", ar="حوت مشوي بالليمون والزعتر", en="Grilled Fish with Lemon and Thyme", fr="Poisson Grillé au Citron et Thym", es="Pescado a la Parrilla con Limón y Tomillo", de="Gegrillter Fisch mit Zitrone und Thymian", d=(2, 1, 0.5, 0, 0, 20)),
    dict(base="سردين مشوي", ar="سردين محشي بالشرمولة", en="Stuffed Sardines with Chermoula", fr="Sardines Farcies à la Chermoula", es="Sardinas Rellenas con Chermoula", de="Gefüllte Sardinen mit Chermoula", d=(3, 2, 1, 0, 0, 40)),
    dict(base="جمبري مشوي", ar="جمبري مشوي بالشرمولة", en="Grilled Shrimp with Chermoula", fr="Crevettes Grillées à la Chermoula", es="Gambas a la Parrilla con Chermoula", de="Gegrillte Garnelen mit Chermoula", d=(2, 1, 0.5, 0, 0, 40)),
    dict(base="تونة مشوية", ar="تونة مشوية بالسمسم", en="Grilled Tuna with Sesame", fr="Thon Grillé au Sésame", es="Atún a la Parrilla con Sésamo", de="Gegrillter Thunfisch mit Sesam", d=(1, 1, 0.5, 0, 0, 10)),
    dict(base="كاليماري مشوي", ar="كاليماري مشوي بالليمون", en="Grilled Calamari with Lemon", fr="Calamar Grillé au Citron", es="Calamar a la Parrilla con Limón", de="Gegrillter Calamari mit Zitrone", d=(1, 1, 0.5, 0, 0, 20)),
    dict(base="طاجين الحوت", ar="طاجين الحوت بالبطاطس", en="Fish Tajeen with Potatoes", fr="Tajeen de Poisson aux Pommes de Terre", es="Tajeen de Pescado con Patatas", de="Fisch-Tajeen mit Kartoffeln", d=(2, 6, 0.5, 1, 0, 20)),
    dict(base="طاجين الحوت", ar="طاجين الحوت بالخضار", en="Fish Tajeen with Vegetables", fr="Tajeen de Poisson aux Légumes", es="Tajeen de Pescado con Verduras", de="Fisch-Tajeen mit Gemüse", d=(1, 4, 0, 1.5, 0, 20)),
    # sweets & desserts (9)
    dict(base="عصيدة بالعسل", ar="عصيدة بالتمور", en="Asida with Dates", fr="Assida aux Dattes", es="Asida con Dátiles", de="Asida mit Datteln", d=(0, 4, 0, 0.5, 12, 0), sweet=True),
    dict(base="عصيدة بالعسل", ar="عصيدة بالزبدة", en="Asida with Butter", fr="Assida au Beurre", es="Asida con Mantequilla", de="Asida mit Butter", d=(0, 1, 2, 0, 2, 0), sweet=True),
    dict(base="عصيدة بالعسل", ar="عصيدة بالسمسم", en="Asida with Sesame", fr="Assida au Sésame", es="Asida con Sésamo", de="Asida mit Sesam", d=(1, 1, 1, 0.5, 0, 0), sweet=True),
    dict(base="عصيدة بالعسل", ar="لقيمات بالعسل", en="Luqaimat with Honey", fr="Loukmates au Miel", es="Luqaimat con Miel", de="Luqaimat mit Honig", d=(2, 8, 2, 0.5, 10, 0), sweet=True, fried=True),
    dict(base="عصيدة بالعسل", ar="مهلبية", en="Muhallabia (Milk Pudding)", fr="Muhallabia (Pudding au Lait)", es="Muhallabia (Pudin de Leche)", de="Muhallabia (Milchpudding)", d=(1, 5, 0.5, 0, 10, 0), sweet=True),
    dict(base="عصيدة بالعسل", ar="مقروط بالتمر", en="Maqroud with Dates", fr="Maqroud aux Dattes", es="Maqroud con Dátiles", de="Maqroud mit Datteln", d=(2, 6, 1, 1, 8, 0), sweet=True),
    dict(base="عصيدة بالعسل", ar="كعك بالتمر", en="Date Cake (Kaak bel Tamar)", fr="Gâteau aux Dattes (Kaak)", es="Pastel de Dátiles (Kaak)", de="Dattelkuchen (Kaak)", d=(2, 8, 2, 1, 10, 0), sweet=True),
    dict(base="عصيدة بالعسل", ar="جوزيات بالشراب", en="Jowaziat in Syrup", fr="Jowaziat au Sirop", es="Jowaziat en Almíbar", de="Jowaziat in Sirup", d=(2, 5, 3, 0.5, 10, 0), sweet=True),
    dict(base="عصيدة بالعسل", ar="بسبوسة بالحليب", en="Basbousa with Milk", fr="Basbousa au Lait", es="Basbousa con Leche", de="Basbousa mit Milch", d=(2, 8, 2, 0.5, 12, 0), sweet=True),
    # dairy, eggs & fruits (5)
    dict(base="تونة بالماء", ar="تونة بزيت الزيتون", en="Tuna in Olive Oil", fr="Thon à l'Huile d'Olive", es="Atún en Aceite de Oliva", de="Thunfisch in Olivenöl", d=(2, 0, 4, 0, 0, -10)),
    dict(base="بيض مسلوق", ar="بيض مسلوق بالزعتر", en="Boiled Eggs with Thyme", fr="Œufs Durs au Thym", es="Huevos Hervidos con Tomillo", de="Gekochte Eier mit Thymian", d=(1, 0, 0.5, 0, 0, 20)),
    dict(base="تمر", ar="تمر مع اللوز", en="Dates with Almonds", fr="Dattes aux Amandes", es="Dátiles con Almendras", de="Datteln mit Mandeln", d=(2, 2, 3, 0.5, 2, 0)),
    dict(base="مانجو", ar="مانجو بالزبادي", en="Mango with Yogurt", fr="Mangue au Yaourt", es="Mango con Yogur", de="Mango mit Joghurt", d=(1, 2, 0, 0, 4, 0), sweet=True),
    dict(base="تفاح", ar="تفاح بالقرفة", en="Apple with Cinnamon", fr="Pomme à la Cannelle", es="Manzana con Canela", de="Apfel mit Zimt", d=(0, 2, 0, 0.5, 4, 0), sweet=True),
]


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    if not os.path.exists(SRC_TS):
        print(f"SOURCE NOT FOUND: {SRC_TS}")
        return 2

    with open(SRC_TS, "r", encoding="utf-8-sig") as fh:
        content = fh.read()

    dishes = []
    malformed = []
    for m in LINE_RE.finditer(content):
        raw_id = m.group(1)
        slug = re.sub(r"_+", "_", raw_id.replace(" ", "_"))
        if slug != raw_id:
            malformed.append(f"{raw_id!r} -> {slug!r}")
        dishes.append({
            "id": slug,
            "raw_id": raw_id,
            "name_ar_raw": m.group(2),
            "name_en_raw": m.group(3),
            "meal_type": m.group(4),
            "grams": float(m.group(5)),
            "kcal": float(m.group(6)),
            "p": float(m.group(7)),
            "c": float(m.group(8)),
            "f": float(m.group(9)),
            "cooking": m.group(10) or "",
        })

    meal_types = sorted({d["meal_type"] for d in dishes})
    print("TOTAL ORIGINAL DISHES:", len(dishes))
    print("UNIQUE mealType VALUES:", ", ".join(meal_types))
    print("MALFORMED IDS:", "; ".join(malformed) if malformed else "none")
    print("FIRST 3 ENTRIES:")
    for d in dishes[:3]:
        print("  ", d["id"], "|", d["name_ar_raw"], "|", d["name_en_raw"], "|", d["meal_type"], f"({d['grams']}g, {d['kcal']}kcal)")

    missing = [d["id"] for d in dishes if d["id"] not in T]
    if missing:
        print("MISSING TRANSLATIONS:", ", ".join(missing))
        return 4

    cats_out = {}
    for cid in CAT_ORDER:
        cats_out[cid] = {
            "id": cid,
            "name_ar": CATS[cid]["name_ar"],
            "name_en": CATS[cid]["name_en"],
            "name_fr": CATS[cid]["name_fr"],
            "name_es": CATS[cid]["name_es"],
            "name_de": CATS[cid]["name_de"],
            "count": 0,
            "dishes": [],
        }

    ar_seen = {}
    base_by_cat = {}
    orig_count = 0

    for d in dishes:
        cid, ar, en, fr, es, de = T[d["id"]]
        cal_100 = r1(d["kcal"] * 100.0 / d["grams"])
        fiber, sugar, sodium, sat_fat = estimates(cid, en, ar, d["f"])
        meals = MEAL_MAP.get(d["meal_type"], ["lunch", "dinner"])
        is_fried = ("fried" in en.lower()) or ("مقلي" in ar) or (d["id"] in FRIED_IDS)
        is_sweet = (cid == "sweets_desserts") or any(w in en.lower() for w in ["sweet", "honey", "sugar"]) or any(w in ar for w in ["عسل", "حلو"])
        healthy = not (is_fried or is_sweet or cal_100 > 400 or sat_fat > 8 or sodium > 600)

        if ar in ar_seen:
            print(f"DUPLICATE ARABIC NAME: '{ar}' ({d['id']} vs {ar_seen[ar]})")
        ar_seen[ar] = d["id"]

        serv = int(d["grams"]) if d["grams"] == int(d["grams"]) else d["grams"]
        cal_serv = round(cal_100 * serv / 100.0)
        unit, desc, opts = serving_fields(serv, cal_serv, ar)

        dish = {
            "name": ar,
            "name_en": en,
            "name_fr": fr,
            "name_es": es,
            "name_de": de,
            "cal_100": cal_100,
            "p": r1(d["p"]),
            "c": r1(d["c"]),
            "f": r1(d["f"]),
            "fiber_g": fiber,
            "sugar_g": sugar,
            "sodium_mg": sodium,
            "sat_fat_g": sat_fat,
            "serv_g": serv,
            "cal_serv": cal_serv,
            "serving_unit": unit,
            "serving_description": desc,
            "serving_options": opts,
            "healthy": healthy,
            "is_fried": is_fried,
            "is_sweet": is_sweet,
            "mealType": meals[0],
            "mealTypes": meals,
            "source": "المطبخ الليبي التقليدي - أرقام محسوبة",
            "notes": "",
            "confidence": 70,
            "confidence_label": "70% - تقديري",
            "confidence_color": "orange",
        }
        cats_out[cid]["dishes"].append(dish)
        cats_out[cid]["count"] += 1
        base_by_cat[ar] = dish
        orig_count += 1

    # ---------------- variants ----------------
    dup_names = set()
    seen = set(ar_seen.keys())
    added = 0
    for v in V:
        base = base_by_cat.get(v["base"])
        if base is None:
            print(f"MISSING BASE DISH: '{v['base']}'")
            return 6
        cat = next(cid for cid in CAT_ORDER if base in cats_out[cid]["dishes"] and cats_out[cid]["id"] == cid) or next(
            cid for cid in CAT_ORDER if any(x["name"] == base["name"] for x in cats_out[cid]["dishes"]))

        dp, dc, df, dfib, dsug, dsod = v["d"]
        serv = base["serv_g"]
        scale = serv / 100.0
        p = r1(base["p"] + dp * scale)
        c = r1(base["c"] + dc * scale)
        f = r1(base["f"] + df * scale)
        cal_100 = r1(base["cal_100"] + 4 * dp + 4 * dc + 9 * df)
        cal_serv = int(round(cal_100 * serv / 100.0))

        fiber = r1((base.get("fiber_g") or 0) + dfib)
        sugar = r1((base.get("sugar_g") or 0) + dsug)
        sodium = r1((base.get("sodium_mg") or 0) + dsod)
        sat_factor = v.get("sat") or SAT_CAT.get(cat, 0.30)
        sat_fat = r1((base.get("sat_fat_g") or 0) + sat_factor * df)

        meals = v.get("meals") or base["mealTypes"]
        is_fried = bool(v.get("fried")) or ("fried" in v["en"].lower()) or ("مقلي" in v["ar"])
        is_sweet = bool(v.get("sweet")) or any(w in v["ar"] for w in ["عسل", "حلو", "سكر", "شراب"]) or any(w in v["en"].lower() for w in ["sweet", "honey", "sugar", "syrup"])
        healthy = not (is_fried or is_sweet or cal_100 > 400 or sat_fat > 8 or sodium > 600)

        if v["ar"] in seen:
            dup_names.add(v["ar"])
        seen.add(v["ar"])

        unit, desc, opts = serving_fields(serv, cal_serv, v["ar"])

        dish = {
            "name": v["ar"],
            "name_en": v["en"],
            "name_fr": v["fr"],
            "name_es": v["es"],
            "name_de": v["de"],
            "cal_100": cal_100,
            "p": p,
            "c": c,
            "f": f,
            "fiber_g": fiber,
            "sugar_g": sugar,
            "sodium_mg": sodium,
            "sat_fat_g": sat_fat,
            "serv_g": serv,
            "cal_serv": cal_serv,
            "serving_unit": unit,
            "serving_description": desc,
            "serving_options": opts,
            "healthy": healthy,
            "is_fried": is_fried,
            "is_sweet": is_sweet,
            "mealType": meals[0],
            "mealTypes": meals,
            "source": "المطبخ الليبي - variant",
            "notes": f"Variant of: {base['name_en']}",
            "confidence": 65,
            "confidence_label": "65% - تقديري (variant)",
            "confidence_color": "orange",
        }
        cats_out[cat]["dishes"].append(dish)
        cats_out[cat]["count"] += 1
        added += 1

    total = orig_count + added

    categories = [cats_out[cid] for cid in CAT_ORDER]

    out = {
        "kitchen": "المطبخ الليبي الشامل",
        "kitchen_en": "Libyan Kitchen - Complete",
        "last_updated": "2026-09",
        "sources": [
            "Libyan-Full-100-USDA.json (existing project file)",
            "Expanded with traditional variants",
        ],
        "disclaimer": "السعرات لكل 100جم مطبوخ. الأرقام تقديرية وقابلة للمراجعة.",
        "portion_guide": "بازين 350جم, كسكسي 350جم, شربة 300مل, خبزة 90جم",
        "total_dishes": total,
        "categories": categories,
    }

    # validation
    errors = []
    all_names = []
    for cat in categories:
        for dish in cat["dishes"]:
            missing_names = [k for k in ("name", "name_en", "name_fr", "name_es", "name_de") if not str(dish[k]).strip()]
            if missing_names:
                errors.append(f"{dish['name']}: empty names {missing_names}")
            if not (20 <= dish["cal_100"] <= 900):
                errors.append(f"{dish['name']}: cal_100 {dish['cal_100']} out of [20,900]")
            all_names.append(dish["name"])
    if dup_names:
        errors.append("Duplicate Arabic names (variants): " + ", ".join(sorted(dup_names)))

    if errors:
        print("VALIDATION ERRORS:")
        for e in errors:
            print("  -", e)
        return 2

    with open(OUT_JSON, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=2)
        fh.write("\n")

    print(f"\nWROTE {OUT_JSON}")
    print(f"ORIGINAL: {orig_count}  VARIANTS ADDED: {added}  TOTAL: {total}")
    print("CATEGORY COUNTS:")
    for cat in categories:
        print(f"  {cat['id']:18s} {cat['count']:3d}  {cat['name_ar']}")
    print("VALIDATION PASSED: all names present, no dup Arabic names, cal_100 within [20, 900]")
    return 0


if __name__ == "__main__":
    sys.exit(main())