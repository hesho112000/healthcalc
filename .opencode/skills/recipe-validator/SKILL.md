---
name: Recipe Validator
description: Use this skill when creating or updating recipes to ensure they meet HealthFingerprint's strict data, translation, and linking standards.
---

## Workflow
1. Check that the recipe has all 5 required translations: `en`, `ar`, `fr`, `es`, `hi`.
2. Scan the recipe text (titles, descriptions, ingredients, instructions) in ALL languages to ensure it does NOT contain any banned words: `pork`, `bacon`, `ham`, `lard`, `halal`. (Case-insensitive).
3. Ensure the `foodLibraryDishId` is present and matches a valid UUID.
4. Ensure `imageUrl` ends with `.webp` and points to `/images/recipes/`.
5. Ensure the JSON structure matches the `Recipe` interface in `src/data/recipes.ts`.
6. If any of these checks fail, STOP and report the exact error before saving the file.
