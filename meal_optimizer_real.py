#!/usr/bin/env python3
"""Read-only Supabase-backed meal optimizer with an explicit heuristic fallback."""

from __future__ import annotations

import json
import math
import os
import random
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Iterator

from dotenv import load_dotenv
from ortools.sat.python import cp_model
from supabase import create_client


TABLE_NAME = "dishes"
MAX_FETCH_LIMIT = 50
MEAL_SLOTS = ("Breakfast", "Lunch", "Dinner", "Snack")
KNOWN_REGIONS = "mena_shared, pan_american, pan_emirati, pan_saudi, null"
NUT_KEYWORDS = (
    "peanut", "almond", "cashew", "walnut", "pistachio", "hazelnut", "nut",
    "فول سوداني", "لوز", "كاجو", "جوز", "فستق", "بندق", "مكسرات",
)


@contextmanager
def _fixed_random_seed() -> Iterator[None]:
    """Use seed 42 without leaving a change to the caller's random state."""
    state = random.getstate()
    random.seed(42)
    try:
        yield
    finally:
        random.setstate(state)


def _error(message: str, warnings: list[str] | None = None) -> dict[str, Any]:
    return {"status": "error", "message": message, "warnings": warnings or [], "dishes": []}


def _supabase_client() -> Any:
    load_dotenv(Path(__file__).resolve().parent / ".env", override=False)
    url = os.getenv("SUPABASE_URL")
    anon_key = os.getenv("SUPABASE_ANON_KEY")
    if not url or not anon_key:
        raise RuntimeError("SUPABASE_URL and SUPABASE_ANON_KEY must be set.")
    return create_client(url, anon_key)


def _matches_heuristic_allergen(dish: dict[str, Any], keywords: tuple[str, ...]) -> bool:
    searchable = " ".join(
        str(dish.get(column) or "")
        for column in ("name_ar", "name_en", "name_fr", "name_es", "name_de")
    ).casefold()
    return any(keyword.casefold() in searchable for keyword in keywords)


def _normalize_dish(row: dict[str, Any]) -> dict[str, Any] | None:
    # `cal_100` and `protein` are the nutrition values used by the requested
    # per-dish model. Do not rescale them by serving size here.
    calories = row.get("cal_100")
    protein = row.get("protein")
    if calories is None or protein is None:
        return None

    name = next(
        (row.get(column) for column in ("name_en", "name_ar", "name_fr", "name_es", "name_de") if row.get(column)),
        "Unnamed dish",
    )
    return {
        "id": str(row.get("id", "")),
        "name": str(name),
        "calories": int(round(float(calories))),
        "protein": int(round(protein)),
        "region": row.get("region"),
        "meal_type": row.get("meal_type"),
    }


def fetch_filtered_dishes(
    user_profile: dict[str, Any], limit: int = 50, allow_heuristic: bool = False
) -> dict[str, Any]:
    """Fetch at most 50 rows, then optionally apply name-based allergy heuristics."""
    exclusions = [str(item).casefold() for item in (user_profile.get("allergen_exclusions") or [])]
    if exclusions and not allow_heuristic:
        return _error(
            "dishes has no allergen column; cannot safely enforce exclusions: "
            f"{', '.join(exclusions)}."
        )

    unsupported = [item for item in exclusions if item not in {"nut", "nuts"}]
    if unsupported:
        return _error(
            "No heuristic keyword list is configured for allergen exclusion(s): "
            f"{', '.join(unsupported)}."
        )

    bounded_limit = min(max(int(limit), 1), MAX_FETCH_LIMIT)
    warnings: list[str] = []
    if exclusions and allow_heuristic:
        warnings.append("heuristic allergen filter, not medical guarantee")

    client = _supabase_client()

    def base_query() -> Any:
        return (
            client.table(TABLE_NAME)
            .select("*")
            .gte("cal_100", 100)
            .lte("cal_100", 900)
        )

    cuisine = user_profile.get("cuisine_preference")
    if cuisine:
        # region is only a proxy; matching is attempted but is not mandatory.
        cuisine_response = (
            base_query()
            .ilike("region", f"%{str(cuisine)}%")
            .limit(bounded_limit)
            .execute()
        )
        rows = cuisine_response.data or []
        if not rows:
            warnings.append(
                f"cuisine preference '{cuisine}' not found in current regions "
                f"({KNOWN_REGIONS}), ignoring"
            )
            rows = (base_query().limit(bounded_limit).execute().data or [])[:MAX_FETCH_LIMIT]
    else:
        rows = (base_query().limit(bounded_limit).execute().data or [])[:MAX_FETCH_LIMIT]

    # Allergen heuristics run only after the bounded database fetch.
    if exclusions and allow_heuristic:
        rows = [row for row in rows if not _matches_heuristic_allergen(row, NUT_KEYWORDS)]

    dishes = [normalized for row in rows if (normalized := _normalize_dish(row)) is not None]
    return {"status": "ok", "warnings": warnings, "dishes": dishes[:MAX_FETCH_LIMIT]}


def optimize_meal_plan(
    user_profile: dict[str, Any], allow_heuristic: bool = False
) -> dict[str, Any]:
    """Optimize a four-dish plan within calorie/protein tolerances."""
    base_result: dict[str, Any] = {
        "warnings": [],
        "selected_dishes": [],
        "total_calories": 0,
        "total_protein": 0,
    }
    with _fixed_random_seed():
        try:
            fetched = fetch_filtered_dishes(
                user_profile, limit=MAX_FETCH_LIMIT, allow_heuristic=allow_heuristic
            )
        except Exception as exc:
            # Suppress SDK exception text so credentials/request details cannot leak.
            return {**base_result, "status": "error", "message": f"Supabase request failed ({type(exc).__name__}); details suppressed."}

        base_result["warnings"] = fetched.get("warnings", [])
        if fetched.get("status") != "ok":
            return {**base_result, "status": "error", "message": fetched.get("message", "Dish fetch failed.")}

        dishes = fetched.get("dishes", [])[:MAX_FETCH_LIMIT]
        if not dishes:
            return {**base_result, "status": "no_dishes", "message": "No dishes remained after filters."}

        try:
            target_calories = int(user_profile.get("target_calories", 2000))
            target_protein = int(user_profile.get("target_protein", 150))
        except (TypeError, ValueError):
            return {**base_result, "status": "error", "message": "Nutrition targets must be numeric."}
        if target_calories <= 0 or target_protein < 0:
            return {**base_result, "status": "error", "message": "target_calories must be positive and target_protein non-negative."}

        model = cp_model.CpModel()
        choices = [model.NewBoolVar(f"pick_{i}") for i in range(len(dishes))]
        total_calories = sum(
            dishes[i]["calories"] * choices[i] for i in range(len(dishes))
        )
        total_protein = sum(
            dishes[i]["protein"] * choices[i] for i in range(len(dishes))
        )
        model.Add(total_calories >= math.ceil(target_calories * 0.90))
        model.Add(total_calories <= math.floor(target_calories * 1.10))
        model.Add(total_protein >= math.ceil(target_protein * 0.85))
        model.Add(total_protein <= math.floor(target_protein * 1.15))
        model.Add(sum(choices) >= 1)
        model.Minimize(sum(choices))

        solver = cp_model.CpSolver()
        solver.parameters.num_search_workers = 1
        solver.parameters.random_seed = 42
        solver.parameters.max_time_in_seconds = 10.0
        status = solver.Solve(model)
        if status not in (cp_model.OPTIMAL, cp_model.FEASIBLE):
            return {
                **base_result,
                "status": "no_solution",
                "message": f"No dish combination met the target ranges (solver status: {solver.StatusName(status)}).",
            }

        selected = [
            dishes[i] for i in range(len(dishes)) if solver.Value(choices[i])
        ]
        return {
            "status": "ok",
            "warnings": base_result["warnings"],
            "selected_dishes": selected,
            "total_calories": sum(dish["calories"] for dish in selected),
            "total_protein": sum(dish["protein"] for dish in selected),
        }


if __name__ == "__main__":
    profile = {
        "target_calories": 2000,
        "target_protein": 150,
        "allergen_exclusions": ["nuts"],
        "cuisine_preference": "Italian",
    }
    print(json.dumps(optimize_meal_plan(profile, allow_heuristic=True), ensure_ascii=False, indent=2))
