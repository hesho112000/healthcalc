# -*- coding: utf-8 -*-
"""Convert Egyptianfood.csv (Egyptian National Institute of Nutrition) into
src/data/egyptian-full-100-USDA.json with 5-language names and enriched fields.

Usage:  python convert-egyptian-csv.py
Output: src/data/egyptian-full-100-USDA.json (UTF-8, 2-space indented)
"""
import csv
import json
import os
import re
import sys

from egyptian_translations1 import T1
from egyptian_translations2 import T2
from egyptian_translations3 import T3

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(BASE, "data-sources", "Egyptianfood.csv")
OUT_PATH = os.path.join(BASE, "src", "data", "egyptian-full-100-USDA.json")

HEADER = [
    "FOOD", "REFUSE", "WATER", "ENERGY", "PROTEIN", "FAT", "ASH", "FIBER",
    "CARBOHYDRATE", "SODIUM", "POTASSIUM", "CALCIUM", "PHOSPHORUS",
    "MAGNESIUM", "IRON", "ZINC", "COPPER", "VITAMIN_A", "VITAMIN_C",
    "THIAMIN", "REBOFLAVIN",
]

T = dict(T1)
T.update(T2)
T.update(T3)

# --- 15 categories (id: 5-language names) -------------------------------
CATS = {
    "grains_cereals": {
        "name_ar": "حبوب ونشويات",
        "name": {"ar": "حبوب ونشويات", "en": "Grains & Cereals", "fr": "Céréales et féculents", "es": "Cereales", "de": "Getreideprodukte"},
        "serv_g": 100, "meals": ("breakfast", "snacks"),
    },
    "bread_bakery": {
        "name_ar": "مخبوزات",
        "name": {"ar": "مخبوزات", "en": "Bread & Bakery", "fr": "Pain et boulangerie", "es": "Panadería", "de": "Brot und Gebäck"},
        "serv_g": 100, "meals": ("breakfast", "snacks"),
    },
    "legumes": {
        "name_ar": "بقوليات",
        "name": {"ar": "بقوليات", "en": "Legumes", "fr": "Légumineuses", "es": "Legumbres", "de": "Hülsenfrüchte"},
        "serv_g": 100, "meals": ("lunch", "dinner"),
    },
    "vegetables": {
        "name_ar": "خضروات",
        "name": {"ar": "خضروات", "en": "Vegetables", "fr": "Légumes", "es": "Verduras", "de": "Gemüse"},
        "serv_g": 150, "meals": ("lunch", "dinner"),
    },
    "fruits": {
        "name_ar": "فواكه",
        "name": {"ar": "فواكه", "en": "Fruits", "fr": "Fruits", "es": "Frutas", "de": "Obst"},
        "serv_g": 150, "meals": ("snacks", "breakfast"),
    },
    "meats": {
        "name_ar": "لحوم",
        "name": {"ar": "لحوم", "en": "Meats", "fr": "Viandes", "es": "Carnes", "de": "Fleisch"},
        "serv_g": 200, "meals": ("lunch", "dinner"),
    },
    "poultry": {
        "name_ar": "دواجن",
        "name": {"ar": "دواجن", "en": "Poultry", "fr": "Volaille", "es": "Aves", "de": "Geflügel"},
        "serv_g": 200, "meals": ("lunch", "dinner"),
    },
    "fish_seafood": {
        "name_ar": "أسماك ومأكولات بحرية",
        "name": {"ar": "أسماك ومأكولات بحرية", "en": "Fish & Seafood", "fr": "Poissons et fruits de mer", "es": "Pescado y mariscos", "de": "Fisch und Meeresfrüchte"},
        "serv_g": 200, "meals": ("lunch", "dinner"),
    },
    "dairy_eggs": {
        "name_ar": "ألبان وبيض",
        "name": {"ar": "ألبان وبيض", "en": "Dairy & Eggs", "fr": "Produits laitiers et œufs", "es": "Lácteos y huevos", "de": "Milchprodukte und Eier"},
        "serv_g": 100, "meals": ("breakfast", "snacks"),
    },
    "fats_oils": {
        "name_ar": "زيوت ودهون",
        "name": {"ar": "زيوت ودهون", "en": "Fats & Oils", "fr": "Matières grasses et huiles", "es": "Grasas y aceites", "de": "Fette und Öle"},
        "serv_g": 15, "meals": ("breakfast", "snacks"),
    },
    "sweets_desserts": {
        "name_ar": "حلويات",
        "name": {"ar": "حلويات", "en": "Sweets & Desserts", "fr": "Sucreries et desserts", "es": "Dulces y postres", "de": "Süßigkeiten und Desserts"},
        "serv_g": 60, "meals": ("snacks",),
    },
    "beverages": {
        "name_ar": "مشروبات",
        "name": {"ar": "مشروبات", "en": "Beverages", "fr": "Boissons", "es": "Bebidas", "de": "Getränke"},
        "serv_g": 250, "meals": ("snacks", "breakfast"),
    },
    "nuts_seeds": {
        "name_ar": "مكسرات وبذور",
        "name": {"ar": "مكسرات وبذور", "en": "Nuts & Seeds", "fr": "Noix et graines", "es": "Frutos secos y semillas", "de": "Nüsse und Samen"},
        "serv_g": 30, "meals": ("snacks",),
    },
    "mixed_dishes": {
        "name_ar": "أطباق مركبة",
        "name": {"ar": "أطباق مركبة", "en": "Mixed Dishes", "fr": "Plats composés", "es": "Platos combinados", "de": "Gemischte Gerichte"},
        "serv_g": 200, "meals": ("lunch", "dinner"),
    },
    "spices_misc": {
        "name_ar": "بهارات ومتفرقات",
        "name": {"ar": "بهارات ومتفرقات", "en": "Spices & Misc", "fr": "Épices et divers", "es": "Especias y varios", "de": "Gewürze und Sonstiges"},
        "serv_g": 10, "meals": ("snacks",),
    },
}

# Per-item serving-size overrides (grams), when category default is off.
SERV_OVERRIDES = {
    "sugarsucrose": 10, "sugarfructose": 10, "sweeteners": 10,
    "cornsyrup": 20, "molasses": 20, "honey": 20, "jams": 20,
    "jellypowder": 10, "gelatin": 10, "backingpowder": 5,
    "chickenstock": 10, "mayonnaise": 15, "saladdressing": 30,
    "oilvegetable": 15, "butteroilghee": 15, "butterunsalted": 15,
    "drinkcoffeeinstantpowder": 5, "drinkteainstantpowder": 5,
    "drinkfruitinstantpowder": 5, "drinkchocolateinstant": 20,
    "garlicbulb": 15, "toppingchocolate": 20,
    "salt_table_cooking": 5, "salttablecooking": 5, "saltsodiumreduced": 5,
    "yeastcompressed": 10, "yeastdried": 5,
    "chewinggum": 5,
}

# Explicit sugar estimates per 100g where category default is wrong.
SUGAR_OVERRIDES = {
    "honey": 82, "jams": 60, "cornsyrup": 40, "molasses": 56,
    "sugarsucrose": 99.5, "sugarfructose": 98.9, "sweeteners": 97.6,
    "toppingchocolate": 46, "milkchocolate": 51, "chocolatemilk": 51,
    "chocolatecoconuts": 45, "chocolatenuts": 44, "candyfruitfavorhard": 98,
    "candyfolia": 76, "candyhomosia": 86.5, "candyjellybeans": 84.9,
    "candykoozassal": 93.3, "candymalban": 93.5, "candynoghawithnuts": 84.2,
    "candysemsemia": 77.7, "candytoffee": 85, "candyassalia": 93.6,
    "orientalbaklava": 35, "orientalbaklavaassorted": 32,
    "orientalbalahelsham": 40, "orientalbasbusa": 40,
    "oriontalbasbusenuts": 42, "orientaleishsarayacream": 50,
    "orientalgohraiba": 40, "orientalkaakeid": 30, "orientalkatait": 40,
    "orientalkunafacream": 45, "orientalkunafanuts": 35,
    "orientallukmetelkady": 45, "orientalmaamout": 35,
}

# Corrected/extracted values (list of (row_no_1based, field, new_value, note)).
CORRECTIONS = [
    (312, "ENERGY", 224.0, "تصحيح خطأ طباعي: 22415.2 -> 224"),
    (322, "PROTEIN", 18.8, "تصحيح خطأ طباعي: 118 -> 18.8"),
]

# FRIED / SWEET keyword detection (source-food level, lowercased).
FRIED_WORDS = ("fried", "fride", "fired", "fritter", "french fry", "potato chips", "croquette")

def norm(s):
    return re.sub(r"[^a-z0-9]", "", s.strip().lower())

def to_num(v):
    if v is None:
        return None
    v = str(v).strip()
    if v == "" or v.upper() == "T":
        return None
    try:
        return float(v)
    except ValueError:
        return None

def estimate_sugar(cat, key):
    if key in SUGAR_OVERRIDES:
        return SUGAR_OVERRIDES[key]
    if cat == "sweets_desserts":
        return 25
    if cat == "fruits":
        return 10
    if cat == "dairy_eggs":
        return 4
    if cat in ("beverages",):
        return 8
    return 1

def estimate_fiber(cat, key):
    if cat == "legumes":
        return 6
    if cat == "vegetables":
        return 2.5
    if cat == "fruits":
        return 2
    if cat == "grains_cereals":
        return 3
    if cat == "nuts_seeds":
        return 4
    if cat == "mixed_dishes":
        return 1.5
    return 0

def estimate_sodium(cat, key):
    if cat == "fruits":
        return 10
    if cat == "fats_oils":
        return 10
    if cat == "nuts_seeds":
        return 15
    if cat == "sweets_desserts":
        return 60
    return 100

def sat_fat_for(cat, key, fat):
    if fat is None:
        return None
    if cat in ("meats", "poultry", "fish_seafood", "dairy_eggs"):
        return round(fat * 0.40, 2)
    if key in ("butteroilghee", "butterunsalted", "oilvegetable"):
        return round(fat * 0.62, 2)
    if cat in ("vegetables", "fruits", "beverages"):
        return 0
    return round(fat * 0.15, 2)

def main():
    if not os.path.exists(CSV_PATH):
        print("MISSING CSV:", CSV_PATH)
        sys.exit(1)

    rows = []
    with open(CSV_PATH, "r", encoding="utf-8-sig", newline="", errors="replace") as fh:
        reader = csv.reader(fh)
        for i, line in enumerate(reader):
            if i == 0:
                continue  # header
            if len(line) < 20:
                print("SHORT ROW line", i + 1, ":", len(line), line[:3])
            rows.append(line)

    total = len(rows)
    print("TOTAL DATA ROWS:", total)

    seen = {}
    missing = []
    dishes_by_cat = {cid: [] for cid in CATS}
    dupe_names = {}
    checked = 0

    for idx, line in enumerate(rows):
        row_no = idx + 2  # 1-based CSV line (header = 1)
        raw_ar, raw_food = line[0], line[0]
        key = norm(raw_food)
        n = seen.get(key, 0) + 1
        seen[key] = n
        lookup_key = key if n == 1 else "%s#%d" % (key, n)

        entry = T.get(lookup_key)
        if entry is None:
            missing.append((row_no, raw_food, key, lookup_key))
            continue

        ar, en, fr, es, de, cat, meals = entry
        if cat not in CATS:
            print("BAD CATEGORY for", raw_food, "->", cat)
            sys.exit(1)

        d = {}
        d["raw"] = raw_food
        d["ar"], d["en"], d["fr"], d["es"], d["de"] = ar, en, fr, es, de
        d["cat"] = cat
        d["meals"] = meals
        d["row_no"] = row_no
        d["key"] = lookup_key

        # numeric columns
        vals = {}
        for col_i, col_name in enumerate(HEADER[1:], start=1):
            raw_v = line[col_i] if col_i < len(line) else ""
            vals[col_name] = to_num(raw_v)

        # apply corrections
        for (crow, fld, newv, note) in CORRECTIONS:
            if crow == row_no:
                vals[fld] = newv
                d.setdefault("notes", []).append(note)
                d["corrected"] = True

        def v(fld):
            return vals.get(fld)

        cal = v("ENERGY") or 0.0
        p = v("PROTEIN") or 0.0
        fat = v("FAT") or 0.0
        carb = v("CARBOHYDRATE") or 0.0
        fibersrc = v("FIBER")
        sodium_src = v("SODIUM")
        fiber = fibersrc if (fibersrc is not None and fibersrc > 0) else estimate_fiber(cat, lookup_key)
        sodium = sodium_src if (sodium_src is not None and sodium_src >= 0) else estimate_sodium(cat, lookup_key)
        sugar = estimate_sugar(cat, lookup_key)
        sat_fat = sat_fat_for(cat, lookup_key, fat)

        serv_g = SERV_OVERRIDES.get(lookup_key, CATS[cat]["serv_g"])
        cal_serv = int(round(cal * serv_g / 100.0))
        cal_100 = int(round(cal))

        # healthy logic
        is_fried = any(w in norm(raw_food) for w in FRIED_WORDS)
        is_sweet = (cat == "sweets_desserts") or any(
            w in norm(ar) for w in ("sweet", "honey", "سكر", "عسل", "حلوى", "مربى")
        )
        if lookup_key == "sweetpotatos":
            is_sweet = False

        healthy = not (is_fried or is_sweet)
        if cal_100 > 400 or (sat_fat or 0) > 8 or sodium > 600:
            healthy = False

        confidence = 70 if d.get("corrected") else 85
        confidence_label = "70% - مصحح" if d.get("corrected") else "85% - تقديري"
        confidence_color = "orange" if d.get("corrected") else "yellow"

        meal_list = list(meals) if meals else list(CATS[cat]["meals"])
        meal_primary = meal_list[0] if meal_list else "lunch"

        notes = "؛ ".join(d.get("notes", []) or [])
        if notes:
            notes = notes + "."

        dish = {
            "name": ar,
            "nameEn": en,
            "nameFr": fr,
            "nameEs": es,
            "nameDe": de,
            "cal_100": cal_100,
            "p": round(p, 1),
            "c": round(carb, 1),
            "f": round(fat, 1),
            "fiber": round(fiber, 1),
            "sugar": round(sugar, 1),
            "sodium": round(sodium, 0),
            "sat_fat": sat_fat,
            "serv_g": serv_g,
            "cal_serv": cal_serv,
            "healthy": healthy,
            "is_fried": is_fried,
            "is_sweet": is_sweet,
            "mealType": meal_primary,
            "mealTypes": meal_list,
            "source": "المعهد القومي للتغذية المصري",
            "notes": notes,
            "confidence": confidence,
            "confidence_label": confidence_label,
            "confidence_color": confidence_color,
        }

        # duplicate-name check
        if ar in dupe_names:
            dupe_names[ar].append(row_no)
        else:
            dupe_names[ar] = [row_no]

        dishes_by_cat[cat].append(dish)
        checked += 1

    if missing:
        print("\nMISSING TRANSLATIONS (%d):" % len(missing))
        for (rn, raw, key, lk) in missing:
            print("  line %d  %r  key=%r lookup=%r" % (rn, raw, key, lk))
        sys.exit(2)

    if checked != total:
        print("Mismatch: converted", checked, "of", total)
        sys.exit(3)

    # duplicate arabic name report (allowed if source differs)
    dup_report = {k: v for k, v in dupe_names.items() if len(v) > 1}
    print("DUPLICATE ARABIC NAMES:", len(dup_report))
    for k, v in dup_report.items():
        print("   ", k, v)

    categories_out = []
    for cid, meta in CATS.items():
        dishes = dishes_by_cat.get(cid, [])
        cat_obj = {
            "id": cid,
            "name_ar": meta["name_ar"],
            "name": meta["name"],
            "count": len(dishes),
            "dishes": dishes,
        }
        categories_out.append(cat_obj)

    total_dishes = sum(c["count"] for c in categories_out)

    out = {
        "kitchen": "المطبخ المصري",
        "kitchen_en": "Egyptian Kitchen",
        "last_updated": "2026-09",
        "sources": [
            "المعهد القومي للتغذية، وزارة الصحة والسكان - جمهورية مصر العربية (1941)",
            "USDA FoodData Central (قيم تكميلية للألياف والسكر والدهون المشبعة)",
        ],
        "disclaimer": "القيم الغذائية لكل 100 جم جزء صالح للأكل. السعرات تقديرية وقد تختلف حسب طريقة الطبخ، خاصة كمية السمن والزيت. مشروبات الصحة تقدم كخيارات تكميلية.",
        "portion_guide": "حساء 250جم، أطباق رئيسية 200جم، سلطات وخضروات مطهوة 150جم، حبوب وخبز 100جم، حلويات 60جم، فواكه 150جم، ألبان وبيض 100جم، مكسرات 30جم، زيوت ودهون 15جم، مشروبات 250مل",
        "total_dishes": total_dishes,
        "categories": categories_out,
    }

    with open(OUT_PATH, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=2)

    print("\nWROTE", OUT_PATH)
    print("TOTAL DISHES WRITTEN:", total_dishes)
    print("\nPER-CATEGORY COUNTS:")
    for c in categories_out:
        print("  %-16s %3d" % (c["id"], c["count"]))
    print("\nFIRST 3 OF CATEGORY 'fish_seafood' (en):")
    for dish in dishes_by_cat["fish_seafood"][:3]:
        print("  -", dish["nameEn"], dish["cal_100"], "kcal", "serv", dish["serv_g"])

if __name__ == "__main__":
    main()