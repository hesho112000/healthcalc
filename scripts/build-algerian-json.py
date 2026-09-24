# -*- coding: utf-8 -*-
"""Build src/data/algerian-full-100-USDA.json from src/data/algerian-full.ts,
mirroring the Moroccan/Libyan kitchen pipeline (5 languages, enriched fields)
and expanding with ~100 culinary-realistic variants (confidence 65, "variant")."""
import json
import os
import re
import sys

from algerian_translations import CATS, CAT_ORDER, T

PROJECT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_TS = os.path.join(PROJECT, "src", "data", "algerian-full.ts")
OUT_JSON = os.path.join(PROJECT, "src", "data", "algerian-full-100-USDA.json")

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

LEGUME_WORDS = ["loubia", "lentil", "foul", "fava", "chickpea", "حمص", "لوبيا", "عدس", "فول"]
VEG_WORDS = ["salad", "veg", "potato", "omelet", "okra", "dolma", "سلطة", "خضار", "بطاطا",
             "باذنجان", "كوسة", "جزر", "فلفل", "زهرة", "كرنب", "دولمة", "مشروم", "خيار", "بصل", "طماطم", "بازيلاء"]
FRUIT_WORDS = ["apple", "orange", "banana", "watermelon", "mango", "dates", "raisin", "تفاح",
               "برتقال", "موز", "دلاع", "مانجو", "تمر", "زبيب"]
SWEET_WORDS = ["makroud", "kaabour", "menina", "hlou", "sweet", "honey", "مقروط", "كعبور", "منينة", "حلو"]
DAIRY_WORDS = ["yogurt", "jben", "cheese", "egg", "tuna", "زبادي", "جبن", "بيض", "تونة", "لبنة"]
SOUP_WORDS = ["chorba", "soup", "harira", "شربة", "شوربة", "حريرة"]

FRIED_IDS = {"dz_sfenj_dz", "dz_brick_tuna_dz", "dz_hout_mhamar"}  # fried; names carry no "fried" word

SAT_CAT = {
    "breakfast": 0.32, "breads_pastries": 0.30, "soups": 0.22, "salads_sides": 0.22,
    "couscous_rechta": 0.30, "main_dishes": 0.32, "grilled_meats": 0.35,
    "fish_seafood": 0.10, "sweets_desserts": 0.30, "dairy_eggs_fruits": 0.40,
}

PIECE_WORDS = ["خبز", "كسرة", "مسمن", "بغرير", "محجوبة", "سفنج", "غرايف", "بوراك", "بريك", "مقروط",
               "كعبور", "قرنطيطة", "كارنتيكا"]


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
    elif cat == "couscous_rechta":
        fiber = 3.0
    elif cat == "soups":
        fiber = 1.8
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
        sugar = 25.0
        if "makroud" in text or "مقروط" in text:
            sugar = 12.0
        elif "kaabour" in text or "كعبور" in text:
            sugar = 12.0
        elif "menina" in text or "منينة" in text:
            sugar = 10.0
    elif any(w in text for w in DAIRY_WORDS):
        if "yogurt" in text or "زبادي" in text:
            sugar = 4.0
        elif "tuna" in text or "تونة" in text:
            sugar = 0.0
        elif "cheese" in text or "جبن" in text:
            sugar = 2.0
        else:
            sugar = 1.0
    elif cat == "soups":
        sugar = 2.0
    else:
        sugar = 1.0

    if cat == "soups":
        sodium = 380.0
    elif cat == "salads_sides":
        sodium = 160.0
    elif cat == "main_dishes":
        sodium = 300.0
    elif cat == "couscous_rechta":
        sodium = 280.0
    elif cat == "grilled_meats":
        sodium = 160.0
    elif cat == "breads_pastries":
        sodium = 420.0
    elif cat == "sweets_desserts":
        sodium = 60.0
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
        if any(w in text for w in ["خبز", "كسرة", "مسمن", "بغرير", "سفنج", "غرايف", "محجوبة"]):
            sodium = 400.0
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
    elif cat == "sweets_desserts":
        sat_factor = 0.30
    elif cat in ("salads_sides", "dairy_eggs_fruits", "breakfast", "breads_pastries"):
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
    # couscous & rechta (18)
    dict(base="كسكسي بلحم الخروف", ar="كسكسي بلحم البقر", en="Couscous with Beef", fr="Couscous au Bœuf", es="Cuscús con Ternera", de="Couscous mit Rindfleisch", d=(1, 0, -1, 0, 0, 0)),
    dict(base="كسكسي بلحم الخروف", ar="كسكسي باللحم والحمص", en="Couscous with Meat and Chickpeas", fr="Couscous à la Viande et Pois Chiches", es="Cuscús con Carne y Garbanzos", de="Couscous mit Fleisch und Kichererbsen", d=(2, 6, 0.5, 2, 0, 0)),
    dict(base="كسكسي بلحم الخروف", ar="كسكسي بلحم الخروف والزبيب", en="Couscous with Lamb and Raisins", fr="Couscous à l'Agneau aux Raisins", es="Cuscús con Cordero y Pasas", de="Couscous mit Lamm und Rosinen", d=(0, 3, 0, 0.5, 6, 0), sweet=True),
    dict(base="كسكسي بالدجاج", ar="كسكسي بالدجاج والحمص", en="Couscous with Chicken and Chickpeas", fr="Couscous au Poulet et Pois Chiches", es="Cuscús con Pollo y Garbanzos", de="Couscous mit Hähnchen und Kichererbsen", d=(2, 6, 0.5, 2, 0, 0)),
    dict(base="كسكسي بالدجاج", ar="كسكسي بالدجاج والزبيب", en="Couscous with Chicken and Raisins", fr="Couscous au Poulet aux Raisins", es="Cuscús con Pollo y Pasas", de="Couscous mit Hähnchen und Rosinen", d=(1, 3, 0, 0.5, 6, 0), sweet=True),
    dict(base="كسكسي بالدجاج", ar="كسكسي بالدجاج والزيتون", en="Couscous with Chicken and Olives", fr="Couscous au Poulet aux Olives", es="Cuscús con Pollo y Aceitunas", de="Couscous mit Hähnchen und Oliven", d=(1, 1, 0.5, 0, 0, 90)),
    dict(base="كسكسي بالحوت", ar="كسكسي بالحوت والخضار", en="Couscous with Fish and Vegetables", fr="Couscous au Poisson et Légumes", es="Cuscús con Pescado y Verduras", de="Couscous mit Fisch und Gemüse", d=(0, 4, 0, 1.5, 0, 0)),
    dict(base="كسكسي بالحوت", ar="كسكسي بالحوت والطماطم", en="Couscous with Fish and Tomato", fr="Couscous au Poisson et Tomates", es="Cuscús con Pescado y Tomate", de="Couscous mit Fisch und Tomaten", d=(0, 2, 0, 1, 0, 20)),
    dict(base="كسكسي بالخضار", ar="كسكسي بالخضار والحمص", en="Vegetable Couscous with Chickpeas", fr="Couscous aux Légumes et Pois Chiches", es="Cuscús de Verduras con Garbanzos", de="Gemüse-Couscous mit Kichererbsen", d=(3, 5, 0.5, 2, 0, 0)),
    dict(base="كسكسي بالخضار", ar="كسكسي بالخضار والقرع", en="Vegetable Couscous with Pumpkin", fr="Couscous aux Légumes et Potiron", es="Cuscús de Verduras con Calabaza", de="Gemüse-Couscous mit Kürbis", d=(1, 5, 0, 2, 0, 0)),
    dict(base="شخشوخة", ar="شخشوخة بالدجاج", en="Chakhchoukha with Chicken", fr="Chakhchoukha au Poulet", es="Chakhchoukha con Pollo", de="Chakhchoukha mit Hähnchen", d=(2, 0, 0.5, 0, 0, 10)),
    dict(base="شخشوخة", ar="شخشوخة باللحم", en="Chakhchoukha with Meat", fr="Chakhchoukha à la Viande", es="Chakhchoukha con Carne", de="Chakhchoukha mit Fleisch", d=(3, 0, 0.5, 0, 0, 10)),
    dict(base="شخشوخة مقرة", ar="شخشوخة مقرة بالدجاج", en="Chakhchoukha Mokra with Chicken", fr="Chakhchoukha Mokra au Poulet", es="Chakhchoukha Mokra con Pollo", de="Chakhchoukha Mokra mit Hähnchen", d=(2, 0, 0.5, 0, 0, 10)),
    dict(base="رشتة", ar="رشتة بالدجاج", en="Rechta with Chicken", fr="Rechta au Poulet", es="Rechta con Pollo", de="Rechta mit Hähnchen", d=(3, 0, 0.5, 0, 0, 10)),
    dict(base="رشتة", ar="رشتة بالخضار", en="Rechta with Vegetables", fr="Rechta aux Légumes", es="Rechta con Verduras", de="Rechta mit Gemüse", d=(1, 5, 0, 1.5, 0, 0)),
    dict(base="تليتلي", ar="تليتلي بالدجاج", en="Tlitli with Chicken", fr="Tlitli au Poulet", es="Tlitli con Pollo", de="Tlitli mit Hähnchen", d=(3, 0, 0.5, 0, 0, 10)),
    dict(base="بركوكس", ar="بركوكس باللحم والحمص", en="Berkoukes with Meat and Chickpeas", fr="Berkoukes à la Viande et Pois Chiches", es="Berkoukes con Carne y Garbanzos", de="Berkoukes mit Fleisch und Kichererbsen", d=(3, 6, 0.5, 2, 0, 10)),
    dict(base="تريدة", ar="تريدة بالدجاج", en="Trida with Chicken", fr="Trida au Poulet", es="Trida con Pollo", de="Trida mit Hähnchen", d=(3, 0, 0.5, 0, 0, 10)),
    dict(base="كسكسي بلحم الخروف", ar="كسكسي بلحم الخروف واللفت", en="Couscous with Lamb and Turnips", fr="Couscous à l'Agneau et Navets", es="Cuscús con Cordero y Nabos", de="Couscous mit Lamm und Steckrüben", d=(0, 4, 0, 1.5, 0, 0)),
    dict(base="كسكسي بالدجاج", ar="كسكسي بالدجاج والكوسة", en="Couscous with Chicken and Zucchini", fr="Couscous au Poulet et Courgettes", es="Cuscús con Pollo y Calabacín", de="Couscous mit Hähnchen und Zucchini", d=(0, 3, 0, 1.5, 0, 0)),
    dict(base="كسكسي بالدجاج", ar="كسكسي بالحمام", en="Couscous with Pigeon", fr="Couscous au Pigeon", es="Cuscús con Pichón", de="Couscous mit Taube", d=(2, 0, 1, 0, 0, 10)),
    dict(base="شخشوخة مقرة", ar="شخشوخة مقرة باللحم", en="Chakhchoukha Mokra with Meat", fr="Chakhchoukha Mokra à la Viande", es="Chakhchoukha Mokra con Carne", de="Chakhchoukha Mokra mit Fleisch", d=(3, 0, 0.5, 0, 0, 10)),
    dict(base="رشتة", ar="رشتة باللحم", en="Rechta with Meat", fr="Rechta à la Viande", es="Rechta con Carne", de="Rechta mit Fleisch", d=(3, 0, 0.5, 0, 0, 10)),
    dict(base="حريرة", ar="حريرة بالعدس", en="Harira with Lentils", fr="Harira aux Lentilles", es="Harira con Lentejas", de="Harira mit Linsen", d=(2, 4, 0, 1.5, 0, 10)),
    dict(base="لحم بقري مشوي", ar="لحم بقري مشوي بزيت الزيتون والثوم", en="Grilled Beef with Olive Oil and Garlic", fr="Bœuf Grillé à l'Huile d'Olive et Ail", es="Ternera a la Parrilla con Aceite de Oliva y Ajo", de="Gegrilltes Rindfleisch mit Olivenöl und Knoblauch", d=(0, 1, 0.5, 0, 0, 20)),
    dict(base="صدر دجاج مشوي", ar="صدر دجاج مشوي بالبقدونس والثوم", en="Grilled Chicken Breast with Parsley and Garlic", fr="Poitrine de Poulet Grillé au Persil et Ail", es="Pechuga de Pollo a la Parrilla con Perejil y Ajo", de="Gegrillte Hähnchenbrust mit Petersilie und Knoblauch", d=(0, 1, 0.5, 0, 0, 20)),
    dict(base="سلطة مشوية", ar="سلطة مشوية بالتونة", en="Mechouia Salad with Tuna", fr="Salade Mechouia au Thon", es="Ensalada Mechouia con Atún", de="Mechouia-Salat mit Thunfisch", d=(6, 0, 0.5, 0.5, 0, 40)),
    dict(base="كعبور", ar="كعبور بالسمسم", en="Kaabour with Sesame", fr="Kaabour au Sésame", es="Kaabour con Sésamo", de="Kaabour mit Sesam", d=(1, 1, 1, 0.5, 0, 0), sweet=True),
    dict(base="مقروط بالفرن", ar="مقروط بالتمر", en="Makroud with Dates", fr="Makroud aux Dattes", es="Makroud con Dátiles", de="Makroud mit Datteln", d=(1, 3, 0.5, 1, 4, 0), sweet=True),
    # main dishes (11)
    dict(base="دولمة", ar="دولمة بالخضار", en="Dolma with Vegetables", fr="Dolma aux Légumes", es="Dolma con Verduras", de="Dolma mit Gemüse", d=(1, 6, 0, 2, 0, 10)),
    dict(base="متوم", ar="متوم بالدجاج", en="Mtewem with Chicken", fr="Mtewem au Poulet", es="Mtewem con Pollo", de="Mtewem mit Hähnchen", d=(3, 0, 0.5, 0, 0, 10)),
    dict(base="شطيطحة باللحم", ar="شطيطحة باللحم والحمص", en="Chtitha with Meat and Chickpeas", fr="Chtitha à la Viande et Pois Chiches", es="Chtitha con Carne y Garbanzos", de="Chtitha mit Fleisch und Kichererbsen", d=(0, 5, 0, 2, 0, 10)),
    dict(base="طاجين الزيتون", ar="طاجين الزيتون بالدجاج", en="Olive Tajine with Chicken", fr="Tajine aux Olives au Poulet", es="Tajine de Aceitunas con Pollo", de="Oliven-Tajine mit Hähnchen", d=(3, 0, 0.5, 0, 0, 60)),
    dict(base="لوبيا", ar="لوبيا باللحم", en="Loubia with Meat", fr="Loubia à la Viande", es="Loubia con Carne", de="Loubia mit Fleisch", d=(3, 4, 0.5, 1, 0, 20)),
    dict(base="كفتة طاجين", ar="كفتة طاجين بالبيض", en="Kefta Tajine with Eggs", fr="Tajine de Kefta aux Œufs", es="Tajine de Kefta con Huevos", de="Kefta-Tajine mit Eiern", d=(2, 1, 1.5, 0, 0, 40)),
    dict(base="فلفل محشي", ar="فلفل محشي بالدجاج", en="Stuffed Peppers with Chicken", fr="Poivrons Farcis au Poulet", es="Pimientos Rellenos con Pollo", de="Gefüllte Paprika mit Hähnchen", d=(2, 1, 0.5, 0.5, 0, 10)),
    dict(base="طاجين بونارين", ar="طاجين بونارين بالدجاج", en="Tajine Bounarine with Chicken", fr="Tajine Bounarine au Poulet", es="Tajine Bounarine con Pollo", de="Tajine Bounarine mit Hähnchen", d=(3, 0, 0.5, 0, 0, 10)),
    dict(base="طاجين الخضار", ar="طاجين الخضار بالحمص", en="Vegetable Tajine with Chickpeas", fr="Tajine de Légumes aux Pois Chiches", es="Tajine de Verduras con Garbanzos", de="Gemüse-Tajine mit Kichererbsen", d=(3, 5, 0.5, 2, 0, 0)),
    dict(base="روز جاري", ar="روز جاري بالدجاج", en="Rouz Djari with Chicken", fr="Rouz Djari au Poulet", es="Rouz Djari con Pollo", de="Rouz Djari mit Hähnchen", d=(3, 0, 0.5, 0, 0, 10)),
    dict(base="كفتة السردين", ar="كفتة سردين بالبقدونس", en="Sardine Kefta with Parsley", fr="Kefta de Sardines au Persil", es="Kefta de Sardinas con Perejil", de="Sardinen-Kefta mit Petersilie", d=(1, 1, 0.5, 0, 0, 20)),
    dict(base="طاجين الجبن", ar="طاجين الجبن بالدجاج", en="Cheese Tajine with Chicken", fr="Tajine au Fromage et Poulet", es="Tajine con Queso y Pollo", de="Käse-Tajine mit Hähnchen", d=(3, 0, 0.5, 0, 0, 40)),
    # grilled meats (14)
    dict(base="لحم خروف مشوي", ar="لحم خروف مشوي بالشرمولة", en="Grilled Lamb with Chermoula", fr="Agneau Grillé à la Chermoula", es="Cordero a la Parrilla con Chermoula", de="Gegrilltes Lamm mit Chermoula", d=(0, 1, 0.5, 0, 0, 30)),
    dict(base="لحم خروف مشوي", ar="لحم خروف مشوي بالكمون", en="Grilled Lamb with Cumin", fr="Agneau Grillé au Cumin", es="Cordero a la Parrilla con Comino", de="Gegrilltes Lamm mit Kreuzkümmel", d=(0, 0, 0.5, 0, 0, 20)),
    dict(base="لحم خروف مشوي", ar="لحم خروف مشوي بالليمون والثوم", en="Grilled Lamb with Lemon and Garlic", fr="Agneau Grillé au Citron et Ail", es="Cordero a la Parrilla con Limón y Ajo", de="Gegrilltes Lamm mit Zitrone und Knoblauch", d=(0, 1, 0.5, 0, 0, 20)),
    dict(base="لحم خروف مشوي", ar="لحم خروف مشوي برأس الحانوت", en="Grilled Lamb with Ras el Hanout", fr="Agneau Grillé au Ras el Hanout", es="Cordero a la Parrilla con Ras el Hanout", de="Gegrilltes Lamm mit Ras el Hanout", d=(0, 1, 0.5, 0, 0, 25)),
    dict(base="لحم بقري مشوي", ar="لحم بقري مشوي بالشرمولة", en="Grilled Beef with Chermoula", fr="Bœuf Grillé à la Chermoula", es="Ternera a la Parrilla con Chermoula", de="Gegrilltes Rindfleisch mit Chermoula", d=(0, 1, 0.5, 0, 0, 30)),
    dict(base="لحم بقري مشوي", ar="لحم بقري مشوي بزيت الزيتون والروزماري", en="Grilled Beef with Olive Oil and Rosemary", fr="Bœuf Grillé à l'Huile d'Olive et Romarin", es="Ternera a la Parrilla con Aceite de Oliva y Romero", de="Gegrilltes Rindfleisch mit Olivenöl und Rosmarin", d=(0, 0, 0.5, 0, 0, 20)),
    dict(base="صدر دجاج مشوي", ar="صدر دجاج مشوي بالشرمولة", en="Grilled Chicken Breast with Chermoula", fr="Poitrine de Poulet Grillé à la Chermoula", es="Pechuga de Pollo a la Parrilla con Chermoula", de="Gegrillte Hähnchenbrust mit Chermoula", d=(0, 1, 0.5, 0, 0, 30)),
    dict(base="صدر دجاج مشوي", ar="صدر دجاج مشوي بالليمون والزعتر", en="Grilled Chicken Breast with Lemon and Thyme", fr="Poitrine de Poulet Grillé au Citron et Thym", es="Pechuga de Pollo a la Parrilla con Limón y Tomillo", de="Gegrillte Hähnchenbrust mit Zitrone und Thymian", d=(0, 1, 0.5, 0, 0, 20)),
    dict(base="صدر رومي مشوي", ar="صدر رومي مشوي بالشرمولة", en="Grilled Turkey Breast with Chermoula", fr="Poitrine de Dinde Grillé à la Chermoula", es="Pechuga de Pavo a la Parrilla con Chermoula", de="Gegrillte Putenbrust mit Chermoula", d=(0, 1, 0.5, 0, 0, 30)),
    dict(base="مرقاز مشوي", ar="مرقاز مشوية بالشرمولة", en="Grilled Merguez with Chermoula", fr="Merguez Grillées à la Chermoula", es="Merguez a la Parrilla con Chermoula", de="Gegrillte Merguez mit Chermoula", d=(0, 0, 0.5, 0, 0, 30)),
    dict(base="مرقاز مشوي", ar="مرقاز مشوية بالبقدونس والثوم", en="Grilled Merguez with Parsley and Garlic", fr="Merguez Grillées au Persil et Ail", es="Merguez a la Parrilla con Perejil y Ajo", de="Gegrillte Merguez mit Petersilie und Knoblauch", d=(0, 1, 0.5, 0, 0, 20)),
    dict(base="حمام مشوي", ar="حمام مشوي بالزعفران", en="Grilled Pigeon with Saffron", fr="Pigeon Grillé au Safran", es="Pichón a la Parrilla con Azafrán", de="Gegrillte Taube mit Safran", d=(0, 0, 0.5, 0, 0, 15)),
    dict(base="سمان مشوي", ar="سمان مشوي بالشرمولة", en="Grilled Quail with Chermoula", fr="Caille Grillé à la Chermoula", es="Codorniz a la Parrilla con Chermoula", de="Gegrillte Wachtel mit Chermoula", d=(0, 1, 0.5, 0, 0, 30)),
    dict(base="لحم أرانب مشوي", ar="لحم أرانب مشوي بالشرمولة", en="Grilled Rabbit with Chermoula", fr="Lapin Grillé à la Chermoula", es="Conejo a la Parrilla con Chermoula", de="Gegrilltes Kaninchen mit Chermoula", d=(0, 1, 0.5, 0, 0, 30)),
    # soups (7)
    dict(base="شربة فريك باللحم", ar="شربة فريك بالخضار", en="Chorba Frik with Vegetables", fr="Chorba Frik aux Légumes", es="Chorba Frik con Verduras", de="Chorba Frik mit Gemüse", d=(0, 3, 0, 1.5, 0, 10)),
    dict(base="شربة فريك باللحم", ar="شربة فريك بالحمص", en="Chorba Frik with Chickpeas", fr="Chorba Frik aux Pois Chiches", es="Chorba Frik con Garbanzos", de="Chorba Frik mit Kichererbsen", d=(2, 5, 0.5, 2, 0, 10)),
    dict(base="شربة بيضاء", ar="شربة بيضاء بالخضار", en="Chorba Beida with Vegetables", fr="Chorba Beida aux Légumes", es="Chorba Beida con Verduras", de="Chorba Beida mit Gemüse", d=(0, 3, 0, 1.5, 0, 10)),
    dict(base="حريرة", ar="حريرة بالحمص", en="Harira with Chickpeas", fr="Harira aux Pois Chiches", es="Harira con Garbanzos", de="Harira mit Kichererbsen", d=(2, 5, 0.5, 2, 0, 10)),
    dict(base="حريرة", ar="حريرة بالدجاج", en="Harira with Chicken", fr="Harira au Poulet", es="Harira con Pollo", de="Harira mit Hähnchen", d=(2, 2, 0.5, 0.5, 0, 10)),
    dict(base="شوربة العدس", ar="شوربة العدس بالخضار", en="Lentil Soup with Vegetables", fr="Soupe aux Lentilles et Légumes", es="Sopa de Lentejas con Verduras", de="Linsensuppe mit Gemüse", d=(0, 3, 0, 1.5, 0, 10)),
    dict(base="شوربة الدجاج", ar="شوربة الدجاج بالخضار", en="Chicken Soup with Vegetables", fr="Soupe au Poulet aux Légumes", es="Sopa de Pollo con Verduras", de="Hühnersuppe mit Gemüse", d=(0, 2, 0, 1, 0, 10)),
    # salads & sides (7)
    dict(base="سلطة", ar="سلطة بالتونة", en="Salad with Tuna", fr="Salade au Thon", es="Ensalada con Atún", de="Salat mit Thunfisch", d=(6, 1, 0.5, 0.5, 0, 40)),
    dict(base="سلطة", ar="سلطة بالجبن", en="Salad with Cheese", fr="Salade au Fromage", es="Ensalada con Queso", de="Salat mit Käse", d=(3, 1, 2, 0, 0, 60)),
    dict(base="سلطة مشوية", ar="سلطة مشوية بالبصل", en="Mechouia Salad with Onions", fr="Salade Mechouia aux Oignons", es="Ensalada Mechouia con Cebolla", de="Mechouia-Salat mit Zwiebeln", d=(0, 2, 0.5, 0.5, 0, 20)),
    dict(base="حميس", ar="حميس بالبيض", en="Hmiss with Eggs", fr="Hmiss aux Œufs", es="Hmiss con Huevos", de="Hmiss mit Eiern", d=(3, 1, 1.5, 0.5, 0, 40)),
    dict(base="مدربل بالباذنجان", ar="مدربل بالبطاطس", en="Mderbel with Potatoes", fr="Mderbel aux Pommes de Terre", es="Mderbel con Patatas", de="Mderbel mit Kartoffeln", d=(0, 5, 0.5, 1, 0, 20)),
    dict(base="بطاطا كوشة", ar="بطاطا كوشة بالثوم", en="Batata Koucha with Garlic", fr="Batata Koucha à l'Ail", es="Batata Koucha con Ajo", de="Batata Koucha mit Knoblauch", d=(0, 1, 0.5, 0.5, 0, 15)),
    dict(base="سلطة الأرز", ar="سلطة الأرز بالبازيلاء", en="Rice Salad with Peas", fr="Salade de Riz aux Petits Pois", es="Ensalada de Arroz con Guisantes", de="Reissalat mit Erbsen", d=(1, 4, 0, 1.5, 0, 10)),
    # breakfast (12)
    dict(base="كسرة", ar="كسرة بالسمسم", en="Kesra with Sesame", fr="Kesra au Sésame", es="Kesra con Sésamo", de="Kesra mit Sesam", d=(1, 1, 1, 0.5, 0, 10)),
    dict(base="كسرة", ar="كسرة بالزيتون", en="Kesra with Olives", fr="Kesra aux Olives", es="Kesra con Aceitunas", de="Kesra mit Oliven", d=(1, 1, 1, 0.5, 0, 80)),
    dict(base="مسمن", ar="مسمن بالعسل", en="Msemen with Honey", fr="M'semen au Miel", es="Msemen con Miel", de="Msemen mit Honig", d=(0, 2, 0.5, 0, 8, 0), sweet=True),
    dict(base="مسمن", ar="مسمن بالجبن", en="Msemen with Cheese", fr="M'semen au Fromage", es="Msemen con Queso", de="Msemen mit Käse", d=(3, 1, 2, 0, 0, 60)),
    dict(base="بغرير", ar="بغرير بالعسل والزبدة", en="Baghrir with Honey and Butter", fr="Baghrir au Miel et Beurre", es="Baghrir con Miel y Mantequilla", de="Baghrir mit Honig und Butter", d=(0, 2, 1, 0, 8, 0), sweet=True),
    dict(base="محجوبة", ar="محجوبة بالبصل والطماطم", en="Mahjoua with Onion and Tomato", fr="Mahjoua aux Oignons et Tomates", es="Mahjoua con Cebolla y Tomate", de="Mahjoua mit Zwiebeln und Tomaten", d=(0, 3, 0.5, 1, 0, 15)),
    dict(base="سفنج", ar="سفنج بالعسل", en="Sfenj with Honey", fr="Sfenj au Miel", es="Sfenj con Miel", de="Sfenj mit Honig", d=(0, 2, 0.5, 0, 8, 0), sweet=True, fried=True),
    dict(base="غرايف", ar="غرايف بالعسل والزبدة", en="Ghrayef with Honey and Butter", fr="Ghrayef au Miel et Beurre", es="Ghrayef con Miel y Mantequilla", de="Ghrayef mit Honig und Butter", d=(0, 2, 1, 0, 8, 0), sweet=True),
    dict(base="جبن", ar="جبن بالزيتون", en="Jben with Olives", fr="Jben aux Olives", es="Jben con Aceitunas", de="Jben mit Oliven", d=(0, 1, 1, 0, 0, 90)),
    dict(base="فول عشا", ar="فول العشا بالكمون", en="Foul Medames with Cumin", fr="Fèves au Cumin", es="Foul con Comino", de="Foul mit Kreuzkümmel", d=(0, 1, 0, 0.5, 0, 20)),
    dict(base="أومليت بالخضار", ar="أومليت بالخضار والجبن", en="Vegetable Omelette with Cheese", fr="Omelette aux Légumes et Fromage", es="Tortilla de Verduras con Queso", de="Gemüse-Omelett mit Käse", d=(2, 0, 1.5, 0, 0, 50)),
    dict(base="بسيسة", ar="بسيسة باللوز", en="Bsisa with Almonds", fr="Bsissa aux Amandes", es="Bsisa con Almendras", de="Bsisa mit Mandeln", d=(1, 1, 1, 0.5, 0, 0)),
    # breads & pastries (3)
    dict(base="خبز طاجين", ar="خبز طاجين بالسمسم", en="Khobz Tadjine with Sesame", fr="Khobz Tadjine au Sésame", es="Khobz Tadjine con Sésamo", de="Khobz Tadjine mit Sesam", d=(1, 1, 0.5, 0.5, 0, 10)),
    dict(base="خبز طاجين", ar="خبز طاجين بالشعير", en="Barley Khobz Tadjine", fr="Khobz Tadjine à l'Orge", es="Khobz Tadjine de Cebada", de="Khobz Tadjine aus Gerste", d=(1, 2, -0.5, 1, 0, 0)),
    dict(base="خبز مطلوع", ar="خبز مطلوع بالسمسم", en="Matlou3 Bread with Sesame", fr="Pain Matlou3 au Sésame", es="Pan Matlou3 con Sésamo", de="Matlou3-Brot mit Sesam", d=(1, 1, 0.5, 0.5, 0, 10)),
    # fish & seafood (6)
    dict(base="حوت مشوي", ar="حوت مشوي بالشرمولة", en="Grilled Fish with Chermoula", fr="Poisson Grillé à la Chermoula", es="Pescado a la Parrilla con Chermoula", de="Gegrillter Fisch mit Chermoula", d=(0, 1, 0.5, 0, 0, 40)),
    dict(base="حوت مشوي", ar="حوت مشوي بالليمون والثوم", en="Grilled Fish with Lemon and Garlic", fr="Poisson Grillé au Citron et Ail", es="Pescado a la Parrilla con Limón y Ajo", de="Gegrillter Fisch mit Zitrone und Knoblauch", d=(0, 1, 0.5, 0, 0, 20)),
    dict(base="سردين مشوي", ar="سردين محشي بالشرمولة", en="Stuffed Sardines with Chermoula", fr="Sardines Farcies à la Chermoula", es="Sardinas Rellenas con Chermoula", de="Gefüllte Sardinen mit Chermoula", d=(2, 1, 1, 0, 0, 40)),
    dict(base="جمبري مشوي", ar="جمبري مشوي بالثوم والليمون", en="Grilled Shrimp with Garlic and Lemon", fr="Crevettes Grillées à l'Ail et Citron", es="Gambas a la Parrilla con Ajo y Limón", de="Gegrillte Garnelen mit Knoblauch und Zitrone", d=(0, 1, 0.5, 0, 0, 20)),
    dict(base="حوت محمر", ar="حوت محمر بالشرمولة", en="Fried Fish with Chermoula", fr="Poisson Frit à la Chermoula", es="Pescado Frito con Chermoula", de="Gebratener Fisch mit Chermoula", d=(0, 1, 1, 0, 0, 40), fried=True),
    dict(base="حوت محمر", ar="حوت محمر بالبقدونس", en="Fried Fish with Parsley", fr="Poisson Frit au Persil", es="Pescado Frito con Perejil", de="Gebratener Fisch mit Petersilie", d=(0, 0, 0.5, 0, 0, 20), fried=True),
    # sweets & desserts (6)
    dict(base="مقروط بالفرن", ar="مقروط بالعسل", en="Makroud with Honey", fr="Makroud au Miel", es="Makroud con Miel", de="Makroud mit Honig", d=(0, 2, 0.5, 0, 8, 0), sweet=True),
    dict(base="مقروط بالفرن", ar="مقروط باللوز", en="Makroud with Almonds", fr="Makroud aux Amandes", es="Makroud con Almendras", de="Makroud mit Mandeln", d=(1, 1, 1, 0.5, 0, 0), sweet=True),
    dict(base="كعبور", ar="كعبور باللوز", en="Kaabour with Almonds", fr="Kaabour aux Amandes", es="Kaabour con Almendras", de="Kaabour mit Mandeln", d=(1, 1, 1, 0.5, 0, 0), sweet=True),
    dict(base="منينة", ar="منينة بالعسل", en="Menina with Honey", fr="Menina au Miel", es="Menina con Miel", de="Menina mit Honig", d=(1, 2, 1, 0, 8, 0), sweet=True),
    dict(base="طاجين حلو", ar="طاجين حلو بالتمور", en="Sweet Tajine with Dates", fr="Tajine Sucré aux Dattes", es="Tajine Dulce con Dátiles", de="Süßer Tajine mit Datteln", d=(0, 3, 0, 0.5, 6, 0), sweet=True),
    dict(base="لحم لحلو", ar="لحم لحلو باللوز", en="Lham Lahlou with Almonds", fr="Lham Lahlou aux Amandes", es="Lham Lahlou con Almendras", de="Lham Lahlou mit Mandeln", d=(1, 2, 1, 0.5, 0, 0), sweet=True),
    # dairy, eggs & fruits (4)
    dict(base="زبادي", ar="زبادي بالعسل", en="Yogurt with Honey", fr="Yaourt au Miel", es="Yogur con Miel", de="Joghurt mit Honig", d=(1, 3, 0, 0, 8, 0), sweet=True),
    dict(base="تمر", ar="تمر مع اللوز", en="Dates with Almonds", fr="Dattes aux Amandes", es="Dátiles con Almendras", de="Datteln mit Mandeln", d=(2, 3, 3, 0.5, 2, 0)),
    dict(base="موز", ar="موز بالزبادي", en="Banana with Yogurt", fr="Banane au Yaourt", es="Plátano con Yogur", de="Banane mit Joghurt", d=(1, 3, 0, 1, 6, 0), sweet=True),
    dict(base="تفاح", ar="تفاح بالقرفة", en="Apple with Cinnamon", fr="Pomme à la Cannelle", es="Manzana con Canela", de="Apfel mit Zimt", d=(0, 2, 0, 0.5, 4, 0)),
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
        is_fried = ("fried" in en.lower()) or ("مقلي" in ar) or ("محمر" in ar) or (d["id"] in FRIED_IDS)
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
            "source": "المطبخ الجزائري التقليدي - أرقام محسوبة",
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
        cat = next(cid for cid in CAT_ORDER if any(x["name"] == base["name"] for x in cats_out[cid]["dishes"]))

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
        is_fried = bool(v.get("fried")) or ("fried" in v["en"].lower()) or ("مقلي" in v["ar"]) or ("محمر" in v["ar"])
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
            "source": "المطبخ الجزائري - variant",
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
        "kitchen": "المطبخ الجزائري الشامل",
        "kitchen_en": "Algerian Kitchen - Complete",
        "last_updated": "2026-09",
        "sources": [
            "Algerian-Full-100-USDA.json (existing project file)",
            "Expanded with traditional variants",
        ],
        "disclaimer": "السعرات لكل 100جم مطبوخ. الأرقام تقديرية وقابلة للمراجعة.",
        "portion_guide": "كسكسي 350جم, شخشوخة 350جم, شربة 300مل, كسرة 80جم",
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
            if not dish["serving_options"]:
                errors.append(f"{dish['name']}: no serving_options")
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
    print("VALIDATION PASSED: all names present, no dup Arabic names, cal_100 within [20, 900], serving_options present")
    return 0


if __name__ == "__main__":
    sys.exit(main())