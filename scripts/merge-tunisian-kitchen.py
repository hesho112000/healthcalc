# -*- coding: utf-8 -*-
"""
merge-tunisian-kitchen.py

Merges two Tunisian kitchen datasets into one 5-language kitchen file:

  Source A : src/data/tunisian-full-100-USDA.json
             200 dishes, 10 categories, Arabic-only names, USDA + sources,
             accurate nutrition + confidence scores.
  Source B : Tunisian-Kitchen-Full-5langs.json
             419 flat dishes; first 131 have real 5-language names,
             TN-132+ are auto-generated garbage and are IGNORED.

  Output     : <parent>/tunisian-merged.json
  Report     : <parent>/mapping-report.json  (confident / ambiguous / no matches)

MATCHING STRATEGY (strict, in order; Arabic names normalized first):
  a) Exact normalized match.
  b) Substring match (B name inside A name, or vice versa).
  c) Token overlap (stopword prefixes stripped: بال وال ال لل في من على و;
     70%+ of Source B tokens must appear in Source A).
  d) Score each candidate; pick the top candidate ONLY if its score is
     >= 1.3x the second candidate. Otherwise the match is AMBIGUOUS.

  Confident matches  -> merged into the output.
  Ambiguous matches  -> kept as separate dishes (needs_review = true).
  No matches         -> kept as Source B only (needs_confidence_verification).

  Input files are NEVER modified (READ ONLY).

Usage:
  python scripts/merge-tunisian-kitchen.py
  python scripts/merge-tunisian-kitchen.py --src-a path --src-b path --out path
"""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
from pathlib import Path

# ---------------------------------------------------------------------------
# Path handling (read-only on all inputs)
# ---------------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUT_PARENT = PROJECT_ROOT.parent  # /Documents/Default Project/

DEFAULT_SRC_A = PROJECT_ROOT / "src" / "data" / "tunisian-full-100-USDA.json"
DEFAULT_SRC_B = OUT_PARENT / "Tunisian-Kitchen-Full-5langs.json"
SRC_B_FALLBACK = PROJECT_ROOT / "Tunisian-Kitchen-Full-5langs.json"
DEFAULT_OUT = OUT_PARENT / "tunisian-merged.json"
DEFAULT_REPORT = OUT_PARENT / "mapping-report.json"

SLICE_SIZE = 131  # only first 131 Source B entries are trusted/genuine

# ---------------------------------------------------------------------------
# Kitchen-level 5-language metadata
# ---------------------------------------------------------------------------

KITCHEN_NAME = {
    "ar": "المطبخ التونسي",
    "en": "Tunisian Kitchen",
    "fr": "Cuisine Tunisienne",
    "es": "Cocina Tunecina",
    "de": "Tunesische Küche",
}
COUNTRY = "Tunisia"
COUNTRY_FLAG = "🇹🇳"
LAST_UPDATED = "2026-09"

# ---------------------------------------------------------------------------
# Category id -> 5-language category names
# ---------------------------------------------------------------------------

CATEGORY_NAMES: dict[str, dict[str, str]] = {
    "soups": {
        "ar": "الشوربات",
        "en": "Soups",
        "fr": "Soupes",
        "es": "Sopas",
        "de": "Suppen",
    },
    "salads": {
        "ar": "السلطات والمقبلات",
        "en": "Salads & Appetizers",
        "fr": "Salades et entrées",
        "es": "Ensaladas y entrantes",
        "de": "Salate und Vorspeisen",
    },
    "brik": {
        "ar": "البريك والمبطن والمقبلات المقلية",
        "en": "Brik, Malsouka & Fried Delights",
        "fr": "Bricks, malsouka et beignets",
        "es": "Brik, malsouka y fritos",
        "de": "Brik, Malsouka & Gebratenes",
    },
    "main_stews": {
        "ar": "الأطباق الرئيسية (اليخنات والمرق)",
        "en": "Main Dishes & Stews",
        "fr": "Plats principaux et ragoûts",
        "es": "Platos principales y guisos",
        "de": "Hauptgerichte und Eintöpfe",
    },
    "couscous": {
        "ar": "الكسكسي والمسفوف",
        "en": "Couscous & Masfouf",
        "fr": "Couscous et masfouf",
        "es": "Cuscús y masfouf",
        "de": "Couscous & Masfouf",
    },
    "seafood": {
        "ar": "الأطباق البحرية والأسماك",
        "en": "Seafood & Fish",
        "fr": "Fruits de mer et poissons",
        "es": "Mariscos y pescados",
        "de": "Meeresfrüchte und Fisch",
    },
    "meats_poultry": {
        "ar": "اللحوم والدواجن والمشويات",
        "en": "Meats & Poultry",
        "fr": "Viandes et volailles",
        "es": "Carnes y aves",
        "de": "Fleisch und Geflügel",
    },
    "bakery": {
        "ar": "المخبوزات والمعجنات",
        "en": "Bakery & Pastries",
        "fr": "Boulangerie et pâtisseries",
        "es": "Panadería y repostería",
        "de": "Backwaren und Gebäck",
    },
    "sweets": {
        "ar": "الحلويات التونسية",
        "en": "Tunisian Sweets",
        "fr": "Douceurs tunisiennes",
        "es": "Dulces tunecinos",
        "de": "Tunesische Süßigkeiten",
    },
    "drinks_spices": {
        "ar": "المشروبات والمخزون",
        "en": "Drinks, Spices & Pantry",
        "fr": "Boissons, épices et garde-manger",
        "es": "Bebidas, especias y despensa",
        "de": "Getränke, Gewürze & Vorrat",
    },
    "vegetables": {
        "ar": "خضروات",
        "en": "Vegetables",
        "fr": "Légumes",
        "es": "Verduras",
        "de": "Gemüse",
    },
    "legumes": {
        "ar": "بقوليات",
        "en": "Legumes",
        "fr": "Légumineuses",
        "es": "Legumbres",
        "de": "Hülsenfrüchte",
    },
    "dairy": {
        "ar": "ألبان",
        "en": "Dairy",
        "fr": "Produits laitiers",
        "es": "Lácteos",
        "de": "Milchprodukte",
    },
    "eggs": {
        "ar": "بيض",
        "en": "Eggs",
        "fr": "Œufs",
        "es": "Huevos",
        "de": "Eier",
    },
    "pickles": {
        "ar": "مخللات",
        "en": "Pickles",
        "fr": "Cornichons et marinades",
        "es": "Encurtidos",
        "de": "Eingelegtes",
    },
    "jams": {
        "ar": "مربات",
        "en": "Jams",
        "fr": "Confitures",
        "es": "Mermeladas",
        "de": "Konfitüren",
    },
    "juices": {
        "ar": "عصائر",
        "en": "Juices",
        "fr": "Jus",
        "es": "Zumos",
        "de": "Säfte",
    },
    "fruits": {
        "ar": "فواكه",
        "en": "Fruits",
        "fr": "Fruits",
        "es": "Frutas",
        "de": "Obst",
    },
}

CATEGORY_ORDER = [
    "soups", "salads", "brik", "main_stews", "couscous",
    "seafood", "meats_poultry", "bakery", "sweets", "drinks_spices",
    "vegetables", "legumes", "dairy", "eggs", "pickles",
    "jams", "juices", "fruits",
]

# Fallback meal type hints for Source-A-only dishes (no mealTypes in A).
CATEGORY_MEALTYPES: dict[str, list[str]] = {
    "soups": ["lunch", "dinner"],
    "salads": ["dinner"],
    "brik": ["breakfast", "lunch"],
    "main_stews": ["lunch"],
    "couscous": ["lunch"],
    "seafood": ["lunch", "dinner"],
    "meats_poultry": ["lunch", "dinner"],
    "bakery": ["breakfast"],
    "sweets": ["snacks"],
    "drinks_spices": ["breakfast", "snacks"],
    "vegetables": ["lunch", "dinner"],
    "legumes": ["lunch"],
    "dairy": ["breakfast"],
    "eggs": ["breakfast"],
    "pickles": ["snacks"],
    "jams": ["breakfast", "snacks"],
    "juices": ["breakfast", "snacks"],
    "fruits": ["snacks", "breakfast"],
}

# ---------------------------------------------------------------------------
# Source B index_category (Arabic) -> output category id
# ---------------------------------------------------------------------------

INDEX_CATEGORY_TO_A: dict[str, str] = {
    "شوربة": "soups",
    "سلطات": "salads",
    "مقبلات": "brik",
    "بريك": "brik",
    "كسكسي": "couscous",
    "طواجن": "main_stews",
    "لحوم": "meats_poultry",
    "طيور": "meats_poultry",
    "دواجن": "meats_poultry",
    "أسماك": "seafood",
    "خضروات": "vegetables",
    "بقوليات": "legumes",
    "مخبوزات": "bakery",
    "حلويات": "sweets",
    "مربات": "jams",
    "بيض": "eggs",
    "ألبان": "dairy",
    "عصائر": "juices",
    "فواكه": "fruits",
    "مشروبات": "drinks_spices",
    "صلصات": "drinks_spices",
    "مخللات": "pickles",
    "توابل": "drinks_spices",
}

DEFAULT_CATEGORY = "main_stews"

_SWEET_WORDS = (
    "حلو", "بقلاوة", "مقروض", "غريبة", "زلابية", "كعك", "محلبية",
    "مهلبية", "بسيسة", "رفاويس", "قطايف", "حلاوة", "مخارق", "يويو",
    "ترتليت", "أصابع", "دبلة",
)


def infer_category_from_name(name_ar: str, index_category: str = "") -> str:
    """Fallback classification by Arabic keywords (used when index_category
    is absent or unmappable)."""
    text = f"{index_category} {name_ar}".strip()
    if "مخلل" in text:
        return "pickles"
    if "بيض" in text:
        return "eggs"
    if any(w in text for w in ("ألبان", "لبن", "رايب", "جبن")):
        return "dairy"
    if "مربى" in text or "مربات" in text:
        return "jams"
    if "عصير" in text or "عصائر" in text:
        return "juices"
    if any(w in text for w in ("فواكه", "فاكهة", "تمر")):
        return "fruits"
    if "شورب" in text or "مطبوخات" in text:
        return "soups"
    if "كسكسي" in text or "مسفوف" in text:
        return "couscous"
    if "سلط" in text:
        return "salads"
    if any(w in text for w in _SWEET_WORDS):
        return "sweets"
    if "بريك" in text or "مبطن" in text or "مقبلات" in text or "معقود" in text:
        return "brik"
    if "طاجين" in text:
        return "main_stews"
    if "سمك" in text or "حوت" in text or "قشري" in text or "بوري" in text:
        return "seafood"
    if "لحم" in text or "علوش" in text or "مرقاز" in text or "عصبان" in text or "كبدة" in text:
        return "meats_poultry"
    if "خبز" in text or "طابونة" in text or "فطير" in text or "ملاوي" in text or "بريوش" in text or "كسرى" in text or "باغات" in text:
        return "bakery"
    if any(w in text for w in ("بقوليات", "عدس", "حمص", "فول", "لوبيا", "جلبان")):
        return "legumes"
    if "خضر" in text:
        return "vegetables"
    if any(w in text for w in ("شاي", "قهوة", "شراب", "روزاطة", "هريسة", "توابل")):
        return "drinks_spices"
    return DEFAULT_CATEGORY


def category_for(index_category: str, name_ar: str) -> str:
    return INDEX_CATEGORY_TO_A.get(index_category) or infer_category_from_name(name_ar, index_category)


# ---------------------------------------------------------------------------
# Nutrition estimation rules (per dish-type)
# ---------------------------------------------------------------------------

FIBER_BY_TYPE = {"soup": 1.5, "salad": 2.5, "meat": 0.5, "legume": 5.0}
SUGAR_BY_TYPE = {"soup": 1.5, "salad": 2.5, "meat": 0.5, "dessert": 10.0}
SODIUM_BY_TYPE = {"soup": 150.0, "salad": 100.0, "meat": 200.0, "pickle": 800.0}
SAT_FAT_BY_TYPE = {"seafood": 1.0, "meat": 3.0, "vegetarian": 0.5, "fried": 4.0}

FIBER_DEFAULT = 1.0
SUGAR_DEFAULT = 1.0
SODIUM_DEFAULT = 150.0
SAT_FAT_DEFAULT = 1.5

# ---------------------------------------------------------------------------
# Confidence helpers
# ---------------------------------------------------------------------------

CONF_LABELS = {
    100: "100% - مصدر موثق",
    85: "85% - جيد",
    70: "70% - تقديري",
}


def confidence_meta(value):
    v = int(value) if value else 70
    if v not in CONF_LABELS:
        return v, f"{v}% - تقديري"
    return v, CONF_LABELS[v]


# ---------------------------------------------------------------------------
# Arabic name normalization + tokenization
# ---------------------------------------------------------------------------

def normalize_ar(name: str) -> str:
    """Strip tashkeel, unify alef/ya/ta-marbuta, collapse whitespace."""
    if not name:
        return ""
    s = unicodedata.normalize("NFKC", name)
    out: list[str] = []
    for ch in s:
        if unicodedata.category(ch) == "Mn":  # combining marks = tashkeel
            continue
        if ch in "أإآ":
            ch = "ا"
        elif ch == "ى":
            ch = "ي"
        elif ch == "ة":
            ch = "ه"
        out.append(ch)
    return re.sub(r"\s+", " ", "".join(out)).strip()


# Stopword PREFIXES stripped from tokens: في، من، على، بال، وال، ال، لل، و
STOPWORD_PREFIXES = ("بال", "وال", "ال", "لل", "في", "من", "على", "و")

_TOKEN_SPLIT = re.compile(r"[\s()\[\]{}،,.;؛!؟?/]+")


def tokens(norm: str) -> list[str]:
    """Tokenize a normalized Arabic name, stripping stopword prefixes."""
    if not norm:
        return []
    out: list[str] = []
    for raw in _TOKEN_SPLIT.split(norm):
        t = raw.strip()
        if not t:
            continue
        changed = True
        while changed and len(t) > 1:
            changed = False
            for p in STOPWORD_PREFIXES:
                if t.startswith(p) and len(t) > len(p):
                    t = t[len(p):]
                    changed = True
                    break
        if len(t) >= 2:
            out.append(t)
    return out


# ---------------------------------------------------------------------------
# Fuzzy matching (RULE 1)
# ---------------------------------------------------------------------------

MIN_SCORE = 0.70
SUBSTR_FLOOR = 0.80
TOKEN_BASE = 0.50
TOKEN_WEIGHT = 0.50
TOKEN_MIN_RATIO = 0.70
DISAMBIG_RATIO = 1.3
MAX_CANDIDATES_IN_REPORT = 5


def score_candidate(bn: str, b_tokens: list[str], an: str, a_tokens: list[str]):
    """Return a numeric score for (B, A) or None if below MIN_SCORE."""
    if not bn or not an:
        return None
    if bn == an:
        return 1.0  # (a) exact normalized match
    # (b) substring match
    short, long = (bn, an) if len(bn) <= len(an) else (an, bn)
    if len(short) >= 3 and short in long:
        return SUBSTR_FLOOR + 0.2 * (len(short) / len(long))
    # (c) token overlap
    if len(b_tokens) >= 2:
        a_set = set(a_tokens)
        b_unique = list(dict.fromkeys(b_tokens))
        present = sum(1 for t in b_unique if t in a_set)
        ratio = present / len(b_unique)
        if ratio >= TOKEN_MIN_RATIO:
            return TOKEN_BASE + TOKEN_WEIGHT * ratio
    return None


def resolve_candidates(candidates: list[dict]):
    """Decide confident / ambiguous using the 1.3x rule (RULE 1d)."""
    candidates.sort(key=lambda c: c["score"], reverse=True)
    if not candidates:
        return "no_match", None, []
    if len(candidates) == 1:
        return "confident", candidates[0], []
    top, second = candidates[0], candidates[1]
    if top["score"] >= DISAMBIG_RATIO * second["score"]:
        return "confident", top, []
    return "ambiguous", None, candidates


# ---------------------------------------------------------------------------
# Dish-type classification (drives nutrition estimation)
# ---------------------------------------------------------------------------

def classify_dish(index_category: str, category_id: str, name_ar: str, is_sweet: bool) -> str:
    text = f"{index_category} {category_id} {name_ar}".strip()
    if any(w in text for w in ("مخلل", "مخللات")):
        return "pickle"
    if is_sweet or any(w in text for w in _SWEET_WORDS):
        return "dessert"
    if "شورب" in text:
        return "soup"
    if "سلط" in text:
        return "salad"
    if index_category == "أسماك" or any(w in text for w in ("سمك", "حوت", "قشري", "بوري")):
        return "seafood"
    if index_category in ("لحوم", "طيور", "دواجن") or any(w in text for w in ("لحم", "دجاج", "علوش", "مرقاز")):
        return "meat"
    if index_category == "بقوليات" or any(w in text for w in ("عدس", "حمص", "فول", "جلبان", "لوبيا")):
        return "legume"
    if index_category == "خضروات" or "خضر" in text:
        return "vegetarian"
    return "other"


def estimate_nutrition(nutrition: dict, dish_type: str, is_fried: bool) -> dict:
    """Fill missing nutrition keys using per-type estimation rules."""
    nut = dict(nutrition)
    for key, table, default in (
        ("fiber_g", FIBER_BY_TYPE, FIBER_DEFAULT),
        ("sugar_g", SUGAR_BY_TYPE, SUGAR_DEFAULT),
        ("sodium_mg", SODIUM_BY_TYPE, SODIUM_DEFAULT),
    ):
        if nut.get(key) is None:
            nut[key] = table.get(dish_type, default)
    if nut.get("sat_fat_g") is None:
        nut["sat_fat_g"] = SAT_FAT_BY_TYPE.get("fried" if is_fried else dish_type, SAT_FAT_DEFAULT)
    return nut


# ---------------------------------------------------------------------------
# Schema mapping helpers
# ---------------------------------------------------------------------------

_LANG_KEYS = ("ar", "en", "fr", "es", "de")


def b_names(entry: dict) -> dict[str, str]:
    n = entry.get("names") or {}
    return {lk: (n.get(lk) or entry.get(f"name_{lk}") or "") for lk in _LANG_KEYS}


def a_placeholder_names(name_ar: str) -> dict[str, str]:
    return {"ar": name_ar, "en": name_ar, "fr": name_ar, "es": name_ar, "de": name_ar}


def normalize_meal_types(types) -> list[str]:
    mapping = {"snack": "snacks"}
    out: list[str] = []
    for t in types or []:
        t = mapping.get(t, t)
        if t not in out:
            out.append(t)
    return out or ["lunch"]


def a_nutrition(dish: dict) -> dict:
    return {
        "cal_100": dish.get("cal_100", 0),
        "protein_g": dish.get("p", 0),
        "carbs_g": dish.get("c", 0),
        "fat_g": dish.get("f", 0),
        "fiber_g": dish.get("fiber_g"),
        "sugar_g": dish.get("sugar_g"),
        "sodium_mg": dish.get("sodium_mg"),
        "sat_fat_g": dish.get("sat_fat_g"),
        "serving_g": dish.get("serv_g", 250),
        "cal_serving": dish.get("cal_serv", 0),
    }


def b_nutrition(entry: dict) -> dict:
    n = entry.get("nutrition") or {}
    serving_g = n.get("serving_g") or 250
    cal = n.get("cal_100") or 0
    return {
        "cal_100": n.get("cal_100", 0),
        "protein_g": n.get("protein_g", 0),
        "carbs_g": n.get("carbs_g", 0),
        "fat_g": n.get("fat_g", 0),
        "fiber_g": n.get("fiber_g"),
        "sugar_g": n.get("sugar_g"),
        "sodium_mg": n.get("sodium_mg"),
        "sat_fat_g": n.get("sat_fat_g"),
        "serving_g": serving_g,
        "cal_serving": n.get("cal_serving") or round(cal * serving_g / 100),
    }


def build_output_dish(*, dish_id, names, meal_types, nutrition, healthy, is_fried,
                      is_sweet, source, confidence, confidence_label, notes,
                      index_category, needs_verification=False, needs_review=False) -> dict:
    d = {
        "id": dish_id,
        "name": names,
        "mealTypes": meal_types,
        "nutrition": nutrition,
        "healthy": healthy,
        "is_fried": is_fried,
        "is_sweet": is_sweet,
        "source": source,
        "confidence": confidence,
        "confidence_label": confidence_label,
        "notes": notes,
        "index_category": index_category,
    }
    if needs_verification:
        d["needs_confidence_verification"] = True
    if needs_review:
        d["needs_review"] = True
    return d


# ---------------------------------------------------------------------------
# Main merge pipeline
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Merge Tunisian kitchen datasets (fuzzy matching).")
    parser.add_argument("--src-a", type=Path, default=DEFAULT_SRC_A)
    parser.add_argument("--src-b", type=Path, default=None, help="default: <parent>/Tunisian-Kitchen-Full-5langs.json or <project>/Tunisian-Kitchen-Full-5langs.json")
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT)
    parser.add_argument("--report", type=Path, default=DEFAULT_REPORT)
    args = parser.parse_args()

    src_a = args.src_a
    src_b = args.src_b or (DEFAULT_SRC_B if DEFAULT_SRC_B.exists() else SRC_B_FALLBACK)
    out = args.out
    report = args.report

    for p, name in ((src_a, "Source A"), (src_b, "Source B")):
        if not p.exists():
            raise FileNotFoundError(f"{name} not found: {p}")

    with open(src_a, "r", encoding="utf-8") as fh:
        data_a = json.load(fh)
    with open(src_b, "r", encoding="utf-8") as fh:
        data_b = json.load(fh)

    # --- 1. Eligible Source B slice (first SLICE_SIZE) --------------------
    b_slice = data_b[:SLICE_SIZE]

    # --- 2. Source A pool (flat, with normalized names + tokens) -----------
    a_pool: list[dict] = []
    a_total = 0
    for cat in data_a.get("categories", []):
        cat_id = cat.get("id", DEFAULT_CATEGORY)
        for n, dish in enumerate(cat.get("dishes", []), start=1):
            a_total += 1
            a_pool.append({
                "srcA_id": f"{cat_id}:{n:03d}",
                "cat": cat_id,
                "name": dish.get("name", ""),
                "norm": normalize_ar(dish.get("name", "")),
                "dish": dish,
            })
    for item in a_pool:
        item["tokens"] = tokens(item["norm"])

    # --- 3. Fuzzy matching -------------------------------------------------
    confident: list[dict] = []   # {"srcB_id","srcB_ar","a_item","score"}
    ambiguous: list[dict] = []   # {"srcB_id","srcB_ar","candidates":[...]}
    no_match: list[dict] = []    # {"srcB_id","srcB_ar"}

    for entry in b_slice:
        bn = normalize_ar(entry.get("name_ar") or (entry.get("names") or {}).get("ar", ""))
        bt = tokens(bn)
        candidates: list[dict] = []
        for a_item in a_pool:
            score = score_candidate(bn, bt, a_item["norm"], a_item["tokens"])
            if score is not None and score >= MIN_SCORE:
                candidates.append({
                    "score": round(score, 4),
                    "srcA_id": a_item["srcA_id"],
                    "srcA_ar": a_item["name"],
                    "a_item": a_item,
                })
        kind, top, all_cands = resolve_candidates(candidates)
        srcB_id = entry.get("id", "")
        srcB_ar = entry.get("name_ar") or (entry.get("names") or {}).get("ar", "")
        if kind == "confident":
            confident.append({"srcB_id": srcB_id, "srcB_ar": srcB_ar, "a_item": top["a_item"], "score": top["score"]})
            a_pool = [x for x in a_pool if x["srcA_id"] != top["a_item"]["srcA_id"]]
        elif kind == "ambiguous":
            ambiguous.append({
                "srcB_id": srcB_id,
                "srcB_ar": srcB_ar,
                "candidates": [
                    {"srcA_id": c["srcA_id"], "srcA_ar": c["srcA_ar"], "score": c["score"]}
                    for c in all_cands[:MAX_CANDIDATES_IN_REPORT]
                ],
            })
        else:
            no_match.append({"srcB_id": srcB_id, "srcB_ar": srcB_ar})

    # --- 4. Build output records ------------------------------------------
    records: list[tuple[str, dict]] = []   # (bucket_category_id, dish_record)
    a_only_counter = 0

    # 4a. Confident matches -> merged (nutrition from A, names from B)
    for m in confident:
        a_item = m["a_item"]
        dish = a_item["dish"]
        b_entry = next(e for e in b_slice if (e.get("id", "")) == m["srcB_id"])
        index_cat = b_entry.get("index_category", "")
        name_ar = dish.get("name", "")
        is_fried = bool(b_entry.get("is_fried", False))
        is_sweet = bool(b_entry.get("is_sweet", False))
        dish_type = classify_dish(index_cat, a_item["cat"], name_ar, is_sweet)
        nutrition = estimate_nutrition(a_nutrition(dish), dish_type, is_fried)
        bucket = category_for(index_cat, name_ar)
        conf, conf_label = confidence_meta(dish.get("confidence"))
        records.append((
            bucket,
            build_output_dish(
                dish_id=m["srcB_id"],
                names=b_names(b_entry),
                meal_types=normalize_meal_types(b_entry.get("meal_types")),
                nutrition=nutrition,
                healthy=bool(dish.get("healthy", False)),
                is_fried=is_fried,
                is_sweet=is_sweet,
                source=dish.get("source", ""),
                confidence=conf,
                confidence_label=dish.get("confidence_label") or conf_label,
                notes=dish.get("notes", ""),
                index_category=index_cat or bucket,
            ),
        ))

    # 4b. Ambiguous Source B entries -> separate dishes marked needs_review
    for m in ambiguous:
        b_entry = next(e for e in b_slice if (e.get("id", "")) == m["srcB_id"])
        entry_names = b_names(b_entry)
        index_cat = b_entry.get("index_category", "")
        name_ar = entry_names.get("ar", "")
        is_fried = bool(b_entry.get("is_fried", False))
        is_sweet = bool(b_entry.get("is_sweet", False))
        dish_type = classify_dish(index_cat, index_cat, name_ar, is_sweet)
        nutrition = estimate_nutrition(b_nutrition(b_entry), dish_type, is_fried)
        bucket = category_for(index_cat, name_ar)
        conf, conf_label = confidence_meta(85)
        records.append((
            bucket,
            build_output_dish(
                dish_id=b_entry.get("id", ""),
                names=entry_names,
                meal_types=normalize_meal_types(b_entry.get("meal_types")),
                nutrition=nutrition,
                healthy=bool(b_entry.get("healthy", False)),
                is_fried=is_fried,
                is_sweet=is_sweet,
                source=b_entry.get("source_cookbook", ""),
                confidence=conf,
                confidence_label=conf_label,
                notes="",
                index_category=index_cat or bucket,
                needs_review=True,
            ),
        ))

    # 4c. No-match Source B entries -> kept as Source B only
    for m in no_match:
        b_entry = next(e for e in b_slice if (e.get("id", "")) == m["srcB_id"])
        entry_names = b_names(b_entry)
        index_cat = b_entry.get("index_category", "")
        name_ar = entry_names.get("ar", "")
        is_fried = bool(b_entry.get("is_fried", False))
        is_sweet = bool(b_entry.get("is_sweet", False))
        dish_type = classify_dish(index_cat, index_cat, name_ar, is_sweet)
        nutrition = estimate_nutrition(b_nutrition(b_entry), dish_type, is_fried)
        bucket = category_for(index_cat, name_ar)
        conf, conf_label = confidence_meta(85)
        records.append((
            bucket,
            build_output_dish(
                dish_id=b_entry.get("id", ""),
                names=entry_names,
                meal_types=normalize_meal_types(b_entry.get("meal_types")),
                nutrition=nutrition,
                healthy=bool(b_entry.get("healthy", False)),
                is_fried=is_fried,
                is_sweet=is_sweet,
                source=b_entry.get("source_cookbook", ""),
                confidence=conf,
                confidence_label=conf_label,
                notes="",
                index_category=index_cat or bucket,
                needs_verification=True,
            ),
        ))

    # 4d. Remaining Source A dishes (no confident match) -> placeholders
    for a_item in a_pool:
        dish = a_item["dish"]
        a_cat_id = a_item["cat"]
        name_ar = dish.get("name", "")
        is_sweet = a_cat_id == "sweets"
        dish_type = classify_dish(a_cat_id, a_cat_id, name_ar, is_sweet)
        nutrition = estimate_nutrition(a_nutrition(dish), dish_type, False)
        a_only_counter += 1
        conf, conf_label = confidence_meta(dish.get("confidence"))
        records.append((
            a_cat_id,
            build_output_dish(
                dish_id=f"TN-U{a_only_counter:03d}",
                names=a_placeholder_names(name_ar),
                meal_types=normalize_meal_types(CATEGORY_MEALTYPES.get(a_cat_id, ["lunch"])),
                nutrition=nutrition,
                healthy=bool(dish.get("healthy", False)),
                is_fried=False,
                is_sweet=is_sweet,
                source=dish.get("source", ""),
                confidence=conf,
                confidence_label=dish.get("confidence_label") or conf_label,
                notes=dish.get("notes", ""),
                index_category=a_cat_id,
            ),
        ))

    # --- 5. Group into output categories -----------------------------------
    buckets: dict[str, list[dict]] = {cat_id: [] for cat_id in CATEGORY_ORDER}
    for bucket, rec in records:
        if bucket not in buckets:
            bucket = infer_category_from_name(rec["name"].get("ar", ""), rec.get("index_category", ""))
            if bucket not in buckets:
                bucket = DEFAULT_CATEGORY
        buckets[bucket].append(rec)

    categories: list[dict] = []
    for cat_id in CATEGORY_ORDER:
        categories.append({"id": cat_id, "name": CATEGORY_NAMES[cat_id], "dishes": buckets[cat_id]})

    # --- 6. Assemble + write outputs ---------------------------------------
    sources: list[str] = list(data_a.get("sources", []))
    for e in b_slice:
        src = e.get("source_cookbook", "").strip()
        if src and src not in sources:
            sources.append(src)

    merged = {
        "kitchen": KITCHEN_NAME,
        "country": COUNTRY,
        "country_flag": COUNTRY_FLAG,
        "last_updated": LAST_UPDATED,
        "sources": sources,
        "total_dishes": len(records),
        "categories": categories,
    }
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(merged, fh, ensure_ascii=False, indent=2)

    mapping_report = {
        "confident_matches": [
            {"srcB_id": m["srcB_id"], "srcB_ar": m["srcB_ar"],
             "srcA_id": m["a_item"]["srcA_id"], "srcA_ar": m["a_item"]["name"],
             "score": m["score"]}
            for m in confident
        ],
        "ambiguous_matches": [
            {"srcB_id": m["srcB_id"], "srcB_ar": m["srcB_ar"], "candidates": m["candidates"]}
            for m in ambiguous
        ],
        "no_matches": [{"srcB_id": m["srcB_id"], "srcB_ar": m["srcB_ar"]} for m in no_match],
    }
    with open(report, "w", encoding="utf-8") as fh:
        json.dump(mapping_report, fh, ensure_ascii=False, indent=2)

    # --- 7. Summary (RULE 4) ------------------------------------------------
    print("--- Match summary ---")
    print(f"Total confident matches: {len(confident)}")
    print(f"Total ambiguous: {len(ambiguous)}")
    print(f"Total no matches: {len(no_match)}")
    print("--- Source totals ---")
    print(f"Source A total: {a_total}")
    print(f"Source B (first 131) total: {len(b_slice)}")
    print(f"Skipped (generated): {len(data_b) - SLICE_SIZE}")
    print(f"Final total in output: {len(records)}")
    print("--- Count per category ---")
    for cat_id in CATEGORY_ORDER:
        print(f"{cat_id}: {len(buckets[cat_id])}")
    print("--- First 20 confident matches ---")
    for m in confident[:20]:
        print(f"{m['srcB_id']} {m['srcB_ar']} => ({m['a_item']['srcA_id']}) {m['a_item']['name']}  score={m['score']}")
    print(f"Written: {out}")
    print(f"Written: {report}")


if __name__ == "__main__":
    main()