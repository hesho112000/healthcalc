# healthcalc

## Development

Commits are gated by a Husky pre-commit hook that runs `tsc --noEmit`, `npm run build`, and the data-quality regression gate (`npm run validate:baseline`). Do not bypass it with `--no-verify`.

The regression gate runs `npm run validate` and compares issue counters against the committed baseline in `scripts/validation-baseline.json`. Pre-existing local data debt is tolerated; the commit is blocked only when a counter gets worse. After intentionally resolving issues, lock in the improvement with `npm run validate:baseline:update` and commit the updated baseline.