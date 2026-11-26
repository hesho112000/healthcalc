#!/usr/bin/env python3
"""Small CP-SAT prototype for a one-day meal plan.

Install the only non-standard dependency with:
    python -m pip install ortools

The dataset is mock data (20 dishes) standing in for the Supabase dishes table.
All nutrition values are integer units so they can be used directly by CP-SAT.
"""

from __future__ import annotations

from typing import Any

from ortools.sat.python import cp_model


DISHES: list[dict[str, Any]] = [
    {
        "id": "dish_001",
        "name": "Oatmeal with Berries",
        "calories": 380,
        "protein": 14,
        "carbs": 68,
        "fat": 8,
        "cuisine": "American",
        "allergens": ["gluten"],
    },
    {
        "id": "dish_002",
        "name": "Greek Yogurt Parfait",
        "calories": 350,
        "protein": 25,
        "carbs": 45,
        "fat": 7,
        "cuisine": "Greek",
        "allergens": ["dairy"],
    },
    {
        "id": "dish_003",
        "name": "Spinach and Feta Omelet",
        "calories": 420,
        "protein": 32,
        "carbs": 8,
        "fat": 28,
        "cuisine": "Mediterranean",
        "allergens": ["eggs", "dairy"],
    },
    {
        "id": "dish_004",
        "name": "Almond Butter Toast",
        "calories": 410,
        "protein": 15,
        "carbs": 45,
        "fat": 20,
        "cuisine": "American",
        "allergens": ["nuts", "gluten"],
    },
    {
        "id": "dish_005",
        "name": "Avocado Toast",
        "calories": 390,
        "protein": 12,
        "carbs": 52,
        "fat": 16,
        "cuisine": "American",
        "allergens": ["gluten"],
    },
    {
        "id": "dish_006",
        "name": "Smoked Salmon Bagel",
        "calories": 460,
        "protein": 28,
        "carbs": 48,
        "fat": 16,
        "cuisine": "Scandinavian",
        "allergens": ["fish", "gluten"],
    },
    {
        "id": "dish_007",
        "name": "Grilled Chicken Quinoa Bowl",
        "calories": 620,
        "protein": 52,
        "carbs": 58,
        "fat": 18,
        "cuisine": "Mediterranean",
        "allergens": [],
    },
    {
        "id": "dish_008",
        "name": "Lentil Curry with Rice",
        "calories": 650,
        "protein": 28,
        "carbs": 95,
        "fat": 14,
        "cuisine": "Indian",
        "allergens": [],
    },
    {
        "id": "dish_009",
        "name": "Turkey Avocado Wrap",
        "calories": 590,
        "protein": 42,
        "carbs": 55,
        "fat": 20,
        "cuisine": "American",
        "allergens": ["gluten"],
    },
    {
        "id": "dish_010",
        "name": "Italian Caprese Chicken",
        "calories": 610,
        "protein": 55,
        "carbs": 35,
        "fat": 25,
        "cuisine": "Italian",
        "allergens": ["dairy"],
    },
    {
        "id": "dish_011",
        "name": "Tofu Vegetable Stir-Fry",
        "calories": 560,
        "protein": 30,
        "carbs": 62,
        "fat": 18,
        "cuisine": "Chinese",
        "allergens": ["soy"],
    },
    {
        "id": "dish_012",
        "name": "Walnut Pesto Pasta",
        "calories": 700,
        "protein": 24,
        "carbs": 82,
        "fat": 30,
        "cuisine": "Italian",
        "allergens": ["nuts", "gluten"],
    },
    {
        "id": "dish_013",
        "name": "Italian Grilled Salmon with Polenta",
        "calories": 680,
        "protein": 48,
        "carbs": 55,
        "fat": 28,
        "cuisine": "Italian",
        "allergens": ["fish"],
    },
    {
        "id": "dish_014",
        "name": "Beef with Roasted Potatoes",
        "calories": 720,
        "protein": 50,
        "carbs": 52,
        "fat": 30,
        "cuisine": "American",
        "allergens": [],
    },
    {
        "id": "dish_015",
        "name": "Chicken Fajita Plate",
        "calories": 640,
        "protein": 46,
        "carbs": 58,
        "fat": 22,
        "cuisine": "Mexican",
        "allergens": [],
    },
    {
        "id": "dish_016",
        "name": "Chickpea and Spinach Stew",
        "calories": 590,
        "protein": 24,
        "carbs": 80,
        "fat": 16,
        "cuisine": "Moroccan",
        "allergens": [],
    },
    {
        "id": "dish_017",
        "name": "Creamy Mushroom Risotto",
        "calories": 690,
        "protein": 20,
        "carbs": 90,
        "fat": 22,
        "cuisine": "Italian",
        "allergens": ["dairy"],
    },
    {
        "id": "dish_018",
        "name": "Cottage Cheese with Pineapple",
        "calories": 220,
        "protein": 24,
        "carbs": 22,
        "fat": 4,
        "cuisine": "American",
        "allergens": ["dairy"],
    },
    {
        "id": "dish_019",
        "name": "Apple with Peanut Butter",
        "calories": 280,
        "protein": 8,
        "carbs": 34,
        "fat": 15,
        "cuisine": "American",
        "allergens": ["nuts"],
    },
    {
        "id": "dish_020",
        "name": "Banana Protein Smoothie",
        "calories": 300,
        "protein": 30,
        "carbs": 35,
        "fat": 5,
        "cuisine": "American",
        "allergens": ["dairy"],
    },
]

MEAL_SLOTS = ("Breakfast", "Lunch", "Dinner", "Snack")
ALLERGY = "nuts"


def build_and_solve(
) -> tuple[cp_model.CpSolver, int, dict[str, dict[str, Any]]] | None:
    """Build the integer model, solve it, and return the selected slot/dish pairs."""
    model = cp_model.CpModel()

    # Keep only dishes safe for this user before creating decision variables.
    eligible_dishes = [
        dish
        for dish in DISHES
        if ALLERGY not in {allergen.casefold() for allergen in dish["allergens"]}
    ]
    if len({dish["id"] for dish in DISHES}) != len(DISHES):
        raise ValueError("Dish IDs must be unique.")
    if len(DISHES) != 20:
        raise ValueError(f"Expected 20 mock dishes, found {len(DISHES)}.")

    # pick[(slot, dish_id)] is 1 when that dish fills that meal slot, otherwise 0.
    pick = {
        (slot, dish["id"]): model.NewBoolVar(f"pick_{slot}_{dish['id']}")
        for slot in MEAL_SLOTS
        for dish in eligible_dishes
    }
    dish_by_id = {dish["id"]: dish for dish in eligible_dishes}

    # One dish in each of the four named slots means exactly four meals.
    for slot in MEAL_SLOTS:
        model.Add(sum(pick[(slot, dish_id)] for dish_id in dish_by_id) == 1)
    model.Add(sum(pick.values()) == 4)

    # A dish can fill at most one slot.
    for dish_id in dish_by_id:
        model.Add(sum(pick[(slot, dish_id)] for slot in MEAL_SLOTS) <= 1)

    total_calories = sum(
        dish["calories"] * pick[(slot, dish["id"])]
        for slot in MEAL_SLOTS
        for dish in eligible_dishes
    )
    total_protein = sum(
        dish["protein"] * pick[(slot, dish["id"])]
        for slot in MEAL_SLOTS
        for dish in eligible_dishes
    )
    model.Add(total_calories >= 1900)
    model.Add(total_calories <= 2100)
    model.Add(total_protein >= 150)

    # Soft preference: maximize this indicator, rather than making Italian
    # dinner a hard requirement that could make an otherwise valid plan infeasible.
    italian_dinner_choices = [
        pick[("Dinner", dish["id"])]
        for dish in eligible_dishes
        if dish["cuisine"].casefold() == "italian"
    ]
    if italian_dinner_choices:
        model.Maximize(sum(italian_dinner_choices))

    solver = cp_model.CpSolver()
    solver.parameters.num_search_workers = 1
    solver.parameters.random_seed = 0
    status = solver.Solve(model)

    if status not in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        print(f"No feasible meal plan found (solver status: {solver.StatusName(status)}).")
        return None

    selected = {
        slot: dish_by_id[dish_id]
        for slot in MEAL_SLOTS
        for dish_id in dish_by_id
        if solver.Value(pick[(slot, dish_id)])
    }
    return solver, status, selected


def main() -> None:
    result = build_and_solve()
    if result is None:
        raise SystemExit(1)

    solver, status, selected = result
    calories = sum(dish["calories"] for dish in selected.values())
    protein = sum(dish["protein"] for dish in selected.values())
    carbs = sum(dish["carbs"] for dish in selected.values())
    fat = sum(dish["fat"] for dish in selected.values())

    print(f"Meal plan ({solver.StatusName(status)})")
    for slot in MEAL_SLOTS:
        dish = selected[slot]
        print(
            f"- {slot}: {dish['name']} ({dish['cuisine']}) - "
            f"{dish['calories']} kcal, P {dish['protein']}g, "
            f"C {dish['carbs']}g, F {dish['fat']}g"
        )

    print(
        f"\nDaily total: {calories} kcal | "
        f"Protein {protein}g | Carbs {carbs}g | Fat {fat}g"
    )

    print(
        "\nSolver abstraction: the model declares Boolean meal choices, "
        "nutrition limits, uniqueness, and a soft cuisine preference; CP-SAT "
        "searches for an assignment satisfying them. CP-SAT fits this discrete "
        "combinatorial problem better than a basic continuous linear solver, "
        "which could choose fractional portions of dishes. Its integer and "
        "Boolean constraints express whole-dish selection and logical rules "
        "directly. The solver can be changed without rewriting the model."
    )


if __name__ == "__main__":
    main()
