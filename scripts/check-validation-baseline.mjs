// Regression gate for data quality. Runs the full validator, then compares the
// resulting issue counters against a committed baseline snapshot. The commit is
// blocked ONLY when a counter gets worse than the baseline (new issues); the
// pre-existing local data debt is tolerated so it can be paid down over time.
//
// Usage:
//   node scripts/check-validation-baseline.mjs            # check (exit 1 on regression)
//   node scripts/check-validation-baseline.mjs --update   # accept current counts as the new baseline
//
// The baseline (scripts/validation-baseline.json) must be committed. When you
// legitimately pay down debt, re-run with --update and commit the smaller baseline.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VALIDATOR = path.join(ROOT, 'scripts', 'validate-data.mjs');
const REPORT_PATH = path.join(ROOT, 'scripts', 'validation-report.json');
const BASELINE_PATH = path.join(ROOT, 'scripts', 'validation-baseline.json');
const UPDATE = process.argv.includes('--update');

const SEVERITIES = ['CRITICAL', 'WARNING', 'INFO'];

function color(text, value) {
  if (!process.stdout.isTTY) return text;
  return `\u001b[${value}m${text}\u001b[0m`;
}

// Counters that must never increase. Volume totals (record counts) are excluded
// on purpose: adding well-formed records must not look like a regression.
function buildCounters(report) {
  const counters = {};
  const { bySeverity = {}, byCategory = {} } = report.summary ?? {};

  for (const sev of ['CRITICAL', 'WARNING', 'INFO']) {
    counters[`summary.bySeverity.${sev}`] = bySeverity[sev] ?? 0;
  }
  for (const [section, counts] of Object.entries(byCategory)) {
    for (const sev of ['CRITICAL', 'WARNING', 'INFO']) {
      counters[`summary.byCategory.${section}.${sev}`] = counts[sev] ?? 0;
    }
  }

  const metricKeys = {
    kitchens: ['duplicates', 'missingTranslations', 'misplacedDietKitchens', 'invalidRecords'],
    exercises: ['missingTranslations', 'invalidRecords', 'duplicates'],
    dishes: ['missingTranslations', 'halalViolations', 'invalidMacros', 'macroMismatches', 'duplicateIds'],
  };
  for (const [section, keys] of Object.entries(metricKeys)) {
    for (const key of keys) {
      counters[`metrics.${section}.${key}`] = report.metrics?.[section]?.[key] ?? 0;
    }
  }
  return counters;
}

function fmt(n) {
  return String(n).padStart(6);
}

function main() {
  const baselinePath = BASELINE_PATH;
  const reportPath = REPORT_PATH;

  console.log('\n[baseline] Running full validator (scripts/validate-data.mjs)...');
  const run = spawnSync(process.execPath, [path.join('scripts', 'validate-data.mjs')], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  if (run.error) {
    console.error(`[baseline] FAIL: could not run validator: ${run.error.message}`);
    process.exit(1);
  }

  let report;
  try {
    report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
  } catch (e) {
    console.error(`\n[validation-baseline] FAIL: could not read ${path.relative(ROOT, REPORT_PATH)}: ${e.message}`);
    process.exit(1);
  }

  const current = buildCounters(report);

  if (process.argv.includes('--update')) {
    const payload = { generatedAt: new Date().toISOString(), counters: current };
    fs.writeFileSync(BASELINE_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
    console.log(`\n[validation-baseline] Baseline updated: ${path.relative(ROOT, BASELINE_PATH)}`);
    console.log(`[validation-baseline] ${Object.keys(current).length} counters recorded.`);
    return;
  }

  if (!fs.existsSync(BASELINE_PATH)) {
    console.error(`\n[validation-baseline] FAIL: no baseline found at ${path.relative(ROOT, BASELINE_PATH)}`);

    console.error('[validation-baseline] Create it once with: node scripts/check-validation-baseline.mjs --update');
    process.exitCode = 1;
    return;
  }

  const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8')).counters ?? {};
  const keys = [...new Set([...Object.keys(baseline), ...Object.keys(current)])].sort();

  const regressions = [];
  const improvements = [];
  for (const key of keys) {
    const before = baseline[key] ?? 0;
    const now = current[key] ?? 0;
    if (now > before) regressions.push({ key, before, now });
    else if (now < before) improvements.push({ key, before, now });
  }

  const failed = regressions.length > 0;
  console.log('\n==========================================================');
  console.log(failed ? ' DATA VALIDATION REGRESSION  [BLOCKED]' : ' DATA VALIDATION REGRESSION  [PASS]');
  console.log('==========================================================');
  console.log(`critical: ${current['summary.bySeverity.CRITICAL']}  warning: ${current['summary.bySeverity.WARNING']}  info: ${current['summary.bySeverity.INFO']}`);

  if (failed) {
    console.error('\nNew/worse issues vs baseline:');
    for (const r of regressions) console.error(`  + ${r.key}: ${r.before} -> ${r.now}`);
    console.error('\nFix the regressions, or (only after review) accept them with:');
    console.error('  node scripts/check-validation-baseline.mjs --update');
  } else if (improvements.length) {
    console.log('\nImprovements vs baseline (run the --update command to lock them in):');
    for (const i of improvements) console.log(`  - ${i.key}: ${i.before} -> ${i.now}`);
  } else {
    console.log('\nNo change vs baseline. No data-quality regressions detected.');
  }

  process.exitCode = failed ? 1 : 0;
}

main();
