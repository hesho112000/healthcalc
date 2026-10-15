import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const REPORT_PATH = path.join(ROOT, 'scripts', 'validation-report.json');
const LANGUAGES = ['Ar', 'En', 'Fr', 'Es', 'De'];
const KITCHEN_REGIONS = new Set(['Europe', 'Asia', 'Americas', 'MENA', 'Africa', 'Oceania', 'Diet Plans']);
const EXERCISE_TYPES = new Set(['cardio', 'strength', 'hiit', 'flexibility', 'balance', 'mindbody', 'functional']);
const EXERCISE_DIFFICULTIES = new Set(['beginner', 'intermediate', 'advanced']);
const DIET_KEYWORDS = /\b(?:diet|keto|vegan|vegetarian|high[ -]?protein|mediterranean|low[ -]?carb|dash|gluten[ -]?free|intermittent[ -]?fasting|paleo)\b/i;
const HALAL_KEYWORDS = /\b(?:pork|bacon|ham|lard|wine|beer|alcohol)\b/i;

const issues = { kitchens: [], exercises: [], dishes: [] };
const metrics = {
  kitchens: { total: 0, duplicates: 0, missingTranslations: 0, misplacedDietKitchens: 0, invalidRecords: 0 },
  exercises: { total: 0, missingTranslations: 0, invalidRecords: 0, duplicates: 0 },
  dishes: { total: 0, perKitchen: {}, missingTranslations: 0, halalViolations: 0, macroMismatches: 0, invalidMacros: 0, duplicateIds: 0 },
};

function addIssue(section, code, file, record, details) {
  issues[section].push({ code, file, record, details });
}

function color(text, value) {
  if (!process.stdout.isTTY || process.env.NO_COLOR) return text;
  return `\u001b[${value}m${text}\u001b[0m`;
}

function skipStringOrComment(text, index) {
  const char = text[index];
  if (char === '"' || char === "'" || char === '`') {
    const quote = char;
    let cursor = index + 1;
    while (cursor < text.length) {
      if (text[cursor] === '\\') cursor += 2;
      else if (text[cursor++] === quote) break;
    }
    return cursor;
  }
  if (char === '/' && text[index + 1] === '/') {
    const end = text.indexOf('\n', index + 2);
    return end < 0 ? text.length : end + 1;
  }
  if (char === '/' && text[index + 1] === '*') {
    const end = text.indexOf('*/', index + 2);
    return end < 0 ? text.length : end + 2;
  }
  return index;
}

function findBalancedEnd(text, start, open, close) {
  let depth = 0;
  for (let index = start; index < text.length;) {
    const skipped = skipStringOrComment(text, index);
    if (skipped !== index) {
      index = skipped;
      continue;
    }
    if (text[index] === open) depth++;
    else if (text[index] === close && --depth === 0) return index + 1;
    index++;
  }
  return -1;
}

function readQuoted(text, start) {
  const quote = text[start];
  let value = '';
  for (let index = start + 1; index < text.length;) {
    const char = text[index++];
    if (char === quote) return { value, end: index };
    if (char !== '\\') {
      value += char;
      continue;
    }
    const escaped = text[index++];
    const escapes = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v', '0': '\0' };
    value += escapes[escaped] ?? escaped;
  }
  return { value, end: text.length };
}

function readValue(text, start) {
  let index = start;
  while (/\s/.test(text[index] ?? '')) index++;
  const first = text[index];
  if (first === '"' || first === "'" || first === '`') return readQuoted(text, index);

  if (first === '{' || first === '[') {
    const end = findBalancedEnd(text, index, first, first === '{' ? '}' : ']');
    return { value: end < 0 ? text.slice(index).trim() : { raw: text.slice(index, end) }, end: end < 0 ? text.length : end };
  }

  let nested = 0;
  for (; index < text.length;) {
    const skipped = skipStringOrComment(text, index);
    if (skipped !== index) {
      index = skipped;
      continue;
    }
    const char = text[index];
    if (char === '(' || char === '[' || char === '{') nested++;
    else if (char === ')' || char === ']' || char === '}') {
      if (nested === 0) break;
      nested--;
    } else if (char === ',' && nested === 0) break;
    index++;
  }
  const raw = text.slice(start, index).trim();
  if (raw === 'null') return { value: null, end: index };
  if (raw === 'true') return { value: true, end: index };
  if (raw === 'false') return { value: false, end: index };
  if (/^-?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(raw)) return { value: Number(raw), end: index };
  return { value: raw, end: index };
}

function parseObject(objectText) {
  try {
    return JSON.parse(objectText);
  } catch {
    // TypeScript object literals are not always strict JSON; parse those below.
  }
  const result = {};
  let index = 1;
  while (index < objectText.length - 1) {
    while (/[\s,]/.test(objectText[index] ?? '')) index++;
    const skipped = skipStringOrComment(objectText, index);
    if (skipped !== index) {
      index = skipped;
      continue;
    }
    let key;
    if (objectText[index] === '"' || objectText[index] === "'") {
      const parsed = readQuoted(objectText, index);
      key = parsed.value;
      index = parsed.end;
    } else {
      const match = objectText.slice(index).match(/^[$A-Z_a-z][$\w]*/);
      if (!match) {
        index++;
        continue;
      }
      key = match[0];
      index += key.length;
    }
    while (/\s/.test(objectText[index] ?? '')) index++;
    if (objectText[index] !== ':') continue;
    const parsed = readValue(objectText, index + 1);
    result[key] = parsed.value;
    index = parsed.end;
    if (objectText[index] === ',') index++;
  }
  return result;
}

function scalarField(objectText, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(?:["']${escaped}["']|\\b${escaped}\\b)\\s*:\\s*(?:"((?:\\\\.|[^"\\\\])*)"|'((?:\\\\.|[^'\\\\])*)'|(-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?|null|true|false|[$A-Z_a-z][$\\w]*))`, 'i');
  const match = pattern.exec(objectText);
  if (!match) return undefined;
  if (match[1] !== undefined || match[2] !== undefined) return (match[1] ?? match[2]).replace(/\\([\\'"`])/g, '$1');
  if (match[3] === 'null') return null;
  if (match[3] === 'true') return true;
  if (match[3] === 'false') return false;
  return /^-?(?:\d|\.)/.test(match[3]) ? Number(match[3]) : match[3];
}

function getArrayRecords(text, wantedName) {
  const records = [];
  const objectLiteral = /\{[^{}]*\}/gs;
  for (const match of text.matchAll(objectLiteral)) {
    const raw = match[0];
    const record = parseObject(raw);
    for (const key of ['id', 'nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe', 'descriptionAr', 'descriptionEn', 'descriptionFr', 'descriptionEs', 'descriptionDe', 'descAr', 'descEn', 'descFr', 'descEs', 'descDe', 'type', 'difficulty', 'sets', 'sourceSets', 'reviewStatus', 'calories', 'kcal', 'cal_100', 'protein', 'carbs', 'fat', 'p', 'c', 'f']) {
      if (record[key] === undefined) record[key] = scalarField(raw, key);
    }
    if (typeof record.id !== 'string' || /[;{}]/.test(record.id) || /^(?:string|number|boolean|unknown|any)$/i.test(record.id)) continue;
    const name = text.slice(0, match.index).match(/export\s+const\s+([\w$]+)[\s\S]*$/)?.[1] ?? '';
    if (!wantedName || name === wantedName) records.push({ record, name, raw });
  }
  return records;
}

function getNamedArrayRecords(source, name) {
  const declaration = new RegExp(`(?:export\\s+)?const\\s+${name}\\s*(?::[^=]+)?=\\s*\\[`);
  const match = declaration.exec(source);
  if (!match) return [];
  const start = source.indexOf('[', match.index + match[0].lastIndexOf('['));
  const end = findBalancedEnd(source, start, '[', ']');
  if (end < 0) return [];
  return getArrayRecords(source.slice(start, end)).map((entry) => ({ ...entry, name }));
}

function getObjectMap(source, name) {
  const declaration = new RegExp(`(?:const|export\\s+const)\\s+${name}\\s*:[^=]+?=\\s*\\{`);
  const match = declaration.exec(source);
  if (!match) return {};
  const start = source.indexOf('{', match.index + match[0].length - 1);
  const end = findBalancedEnd(source, start, '{', '}');
  if (end < 0) return {};
  const raw = source.slice(start, end);
  const result = parseObject(raw);
  const property = /(?:^|[,{])\s*(?:'([^']+)'|"([^"]+)"|([\w$-]+))\s*:\s*(?:'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)")/g;
  for (let item; (item = property.exec(raw));) {
    const key = item[1] ?? item[2] ?? item[3];
    const value = item[4] ?? item[5];
    result[key] = value.replace(/\\(.)/g, '$1');
  }
  return result;
}

function getTopLevelArrays(source) {
  const arrays = new Map();
  const declaration = /export\s+const\s+([\w$]+)\s*(?::[^=]+)?=\s*\[/g;
  for (let match; (match = declaration.exec(source));) {
    const start = declaration.lastIndex - 1;
    const end = findBalancedEnd(source, start, '[', ']');
    if (end < 0) continue;
    const segment = source.slice(start, end);
    const records = getArrayRecords(`export const DATA = ${segment};`);
    arrays.set(match[1], records.map(({ record }) => record));
    declaration.lastIndex = end;
  }
  return arrays;
}

function normalizeKitchenId(fileName) {
  let id = fileName
    .replace(/\.(?:json|ts)$/i, '')
    .replace(/-diet-100-medical$/i, '')
    .replace(/-full(?:-100-USDA)?$/i, '')
    .replace(/-kitchen$/i, '')
    .toLowerCase();
  const aliases = { mexico: 'mexican', argentina: 'argentinian', colombia: 'colombian', peru: 'peruvian', chile: 'chilean' };
  return aliases[id] ?? id;
}

function rawKitchenId(fileName) {
  return fileName
    .replace(/\.(?:json|ts)$/i, '')
    .replace(/-diet-100-medical$/i, '')
    .replace(/-full(?:-100-USDA)?$/i, '')
    .replace(/-kitchen$/i, '');
}

const REGION_BY_KITCHEN = new Map();
for (const id of ['algerian', 'bahraini', 'egyptian', 'emirati', 'jordanian', 'kuwaiti', 'lebanese', 'libyan', 'moroccan', 'omani', 'palestinian', 'qatar', 'saudi', 'syrian', 'tunisian', 'turkey', 'turkish']) REGION_BY_KITCHEN.set(id, 'MENA');
for (const id of ['chinese', 'filipino', 'indian', 'indonesian', 'japanese', 'korean', 'malaysian', 'pakistani', 'taiwan', 'taiwanese', 'thai', 'vietnamese']) REGION_BY_KITCHEN.set(id, 'Asia');
for (const id of ['botswanan', 'ethiopian', 'gabonese', 'ghanaian', 'kenyan', 'mauritian', 'nigerian', 'rwandan', 'seychellois', 'south-african']) REGION_BY_KITCHEN.set(id, 'Africa');
for (const id of ['australia', 'australian', 'australasia', 'new-zealand']) REGION_BY_KITCHEN.set(id, 'Oceania');
for (const id of ['austria', 'benelux', 'british', 'danish', 'denmark', 'eastern-european', 'finland', 'finnish', 'france', 'french', 'germany', 'greece', 'greek', 'italian', 'italy', 'norway', 'norwegian', 'spain', 'spanish', 'sweden', 'swedish', 'swiss', 'switzerland', 'uk', 'ukraine', 'ukrainian']) REGION_BY_KITCHEN.set(id, 'Europe');
for (const id of ['american', 'argentina', 'argentinian', 'brazilian', 'canada', 'canadian', 'chile', 'chilean', 'colombia', 'colombian', 'costa-rican', 'cuban', 'jamaican', 'mexican', 'mexico', 'peru', 'peruvian', 'usa', 'venezuelan']) REGION_BY_KITCHEN.set(id, 'Americas');

function mapKitchenSource(source, id, sourceData, diet) {
  const arabic = getObjectMap(source, 'NAME_BY_ID');
  const english = getObjectMap(source, 'KITCHEN_EN_BY_ID');
  const descriptions = getObjectMap(source, 'KITCHEN_DESCRIPTION_BY_ID');
  const dietArabic = getObjectMap(source, 'DIET_NAME');
  const dietEnglish = getObjectMap(source, 'DIET_NAME_EN');
  const regionMap = getObjectMap(source, 'KITCHEN_REGION_KITCHEN_IDS');
  const explicitRegion = sourceData?.region ?? sourceData?.region_name ?? sourceData?.regionId;
  let region = diet ? 'Diet Plans' : typeof explicitRegion === 'string' ? explicitRegion : '';
  if (region === 'north-america' || region === 'south-america') region = 'Americas';
  if (!region) {
    for (const [regionName, ids] of Object.entries(regionMap)) {
      if (Array.isArray(ids) && ids.includes(id)) region = regionName.includes('america') ? 'Americas' : regionName;
    }
  }
  if (!region) region = REGION_BY_KITCHEN.get(id) ?? '';

  return {
    id,
    names: {
      Ar: (diet ? dietArabic : arabic)[id] ?? sourceData?.kitchen ?? '',
      En: (diet ? dietEnglish : english)[id] ?? sourceData?.kitchen_en ?? '',
      Fr: sourceData?.kitchen_fr ?? '',
      Es: sourceData?.kitchen_es ?? '',
      De: sourceData?.kitchen_de ?? '',
    },
    descriptions: {
      Ar: sourceData?.description_ar ?? '',
      En: descriptions[id] ?? sourceData?.description_en ?? '',
      Fr: sourceData?.description_fr ?? '',
      Es: sourceData?.description_es ?? '',
      De: sourceData?.description_de ?? '',
    },
    dishCount: Number(sourceData?.total_dishes ?? sourceData?.count ?? 0),
    region,
  };
}

function normalizedKitchenName(value) {
  return String(value).toLocaleLowerCase('en').replace(/\bkitchen\b/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function canonicalKitchenName(value) {
  const aliases = {
    america: 'united states', american: 'united states', usa: 'united states',
    argentina: 'argentina', argentinian: 'argentina', australia: 'australia', australian: 'australia',
    austria: 'austria', austrian: 'austria', brazil: 'brazil', brazilian: 'brazil',
    britain: 'united kingdom', british: 'united kingdom', uk: 'united kingdom',
    canada: 'canada', canadian: 'canada', chile: 'chile', chilean: 'chile',
    colombia: 'colombia', colombian: 'colombia', france: 'france', french: 'france',
    germany: 'germany', german: 'germany', mexico: 'mexico', mexican: 'mexico',
    peru: 'peru', peruvian: 'peru', spain: 'spain', spanish: 'spain',
    sweden: 'sweden', swedish: 'sweden', denmark: 'denmark', danish: 'denmark',
    finland: 'finland', finnish: 'finland', norway: 'norway', norwegian: 'norway',
    switzerland: 'switzerland', swiss: 'switzerland', turkey: 'turkey', turkish: 'turkey',
    venezuela: 'venezuela', venezuelan: 'venezuela',
  };
  return normalizedKitchenName(value).split(' ').map((word) => aliases[word] ?? word).join(' ');
}

function validateKitchens(indexSource) {
  const richFiles = fs.readdirSync(DATA_DIR).filter((file) => /-full-100-USDA\.json$/i.test(file));
  const richIds = new Set(richFiles.map(normalizeKitchenId));
  const kitchenFiles = fs.readdirSync(DATA_DIR).filter((file) =>
    /-full(?:-100-USDA)?\.ts$/i.test(file) && !['chilean-full.ts', 'peruvian-full.ts'].includes(file),
  ).filter((file) => !richIds.has(normalizeKitchenId(file)));
  const dietFiles = fs.readdirSync(DATA_DIR).filter((file) => /-diet-100-medical\.json$/i.test(file));
  const kitchens = [];
  const seenIds = new Map();
  const seenNames = new Map();
  const dietArabic = getObjectMap(indexSource, 'DIET_NAME');
  const dietEnglish = getObjectMap(indexSource, 'DIET_NAME_EN');

  for (const file of [...new Set([...kitchenFiles, ...richFiles, ...dietFiles])].sort()) {
    const diet = /-diet-100-medical\.json$/i.test(file);
    const rawId = rawKitchenId(file);
    const id = normalizeKitchenId(file);
    let data = {};
    let count = 0;
    if (file.endsWith('.json')) {
      try {
        data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
        count = Number(Array.isArray(data) ? data.length : data.total_dishes ?? data.dishes?.length ?? data.categories?.reduce((sum, category) => sum + (category.dishes?.length ?? 0), 0) ?? 0);
      } catch (error) {
        addIssue('kitchens', 'invalid-json', file, id, String(error));
      }
    } else {
      const text = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
      const arrays = getTopLevelArrays(text);
      const dishArray = [...arrays.entries()].find(([name]) => name.endsWith('_FULL'))?.[1] ?? [];
      count = dishArray.length;
      data = {};
    }
    const mapped = mapKitchenSource(indexSource, id, data, diet);
    mapped.dishCount = count || mapped.dishCount;
    if (diet) {
      mapped.names.Ar = dietArabic[id] ?? mapped.names.Ar;
      mapped.names.En = dietEnglish[id] ?? mapped.names.En;
    }
    kitchens.push({ ...mapped, file, diet, rawId });
  }

  metrics.kitchens.total = kitchens.length;
  for (const kitchen of kitchens) {
    const lowerId = kitchen.id.toLowerCase();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(kitchen.rawId)) {
      addIssue('kitchens', 'invalid-id', kitchen.file, kitchen.id, 'Expected lowercase words separated by hyphens.');
      metrics.kitchens.invalidRecords++;
    }
    if (seenIds.has(lowerId)) {
      addIssue('kitchens', 'duplicate-id', kitchen.file, kitchen.id, `Duplicates ${seenIds.get(lowerId)} (case-insensitive).`);
      metrics.kitchens.duplicates++;
    } else seenIds.set(lowerId, kitchen.file);

    const missing = [
      ...LANGUAGES.filter((language) => !String(kitchen.names[language] ?? '').trim()).map((language) => `name${language}`),
      ...LANGUAGES.filter((language) => !String(kitchen.descriptions[language] ?? '').trim()).map((language) => `description${language}`),
    ];
    if (missing.length) {
      addIssue('kitchens', 'missing-translations', kitchen.file, kitchen.id, missing);
      metrics.kitchens.missingTranslations++;
    }
    for (const language of LANGUAGES) {
      const name = String(kitchen.names[language] ?? '').trim();
      if (!name) continue;
      const key = `${language}:${normalizedKitchenName(name)}`;
      const duplicate = seenNames.get(key);
      if (duplicate && duplicate.id !== kitchen.id) {
        addIssue('kitchens', 'duplicate-name', kitchen.file, kitchen.id, { language, name, duplicates: duplicate.id });
        metrics.kitchens.duplicates++;
      } else seenNames.set(key, { id: kitchen.id, name });
    }
    if (kitchen.names.En) {
      const current = canonicalKitchenName(kitchen.names.En);
      for (const prior of kitchens.slice(0, kitchens.indexOf(kitchen))) {
        if (!prior.names.En || prior.id === kitchen.id) continue;
        const previous = canonicalKitchenName(prior.names.En);
        if (current && previous && current === previous && normalizedKitchenName(kitchen.names.En) !== normalizedKitchenName(prior.names.En)) {
          addIssue('kitchens', 'similar-name', kitchen.file, kitchen.id, { name: kitchen.names.En, similarTo: prior.names.En, similarKitchenId: prior.id });
          metrics.kitchens.duplicates++;
        }
      }
    }
    if (!KITCHEN_REGIONS.has(kitchen.region)) {
      addIssue('kitchens', 'invalid-region', kitchen.file, kitchen.id, `Region is missing or invalid: ${kitchen.region || '(empty)'}`);
      metrics.kitchens.invalidRecords++;
    }
    if (!Number.isFinite(kitchen.dishCount) || kitchen.dishCount <= 0) {
      addIssue('kitchens', 'invalid-dish-count', kitchen.file, kitchen.id, `Dish count must be positive; found ${kitchen.dishCount}.`);
      metrics.kitchens.invalidRecords++;
    }
    const hasDietName = Object.values(kitchen.names).some((name) => DIET_KEYWORDS.test(String(name)));
    if (hasDietName && kitchen.region !== 'Diet Plans') {
      addIssue('kitchens', 'misplaced-diet-kitchen', kitchen.file, kitchen.id, { names: kitchen.names, region: kitchen.region });
      metrics.kitchens.misplacedDietKitchens++;
    }
  }

  return kitchens;
}

function getDishNameFields(record) {
  return LANGUAGES.map((language) => record[`name${language}`]
    ?? record[`name_${language.toLowerCase()}`]
    ?? record.name?.[language.toLowerCase()]
    ?? (language === 'Ar' ? record.name : '')
    ?? '');
}

function getDishDescription(record, language) {
  const short = language.toLowerCase();
  return record[`description${language}`]
    ?? record[`description_${short}`]
    ?? record[`desc${language}`]
    ?? record.description?.[short]
    ?? record.descriptions?.[short]
    ?? '';
}

function validateDishes() {
  const files = fs.readdirSync(DATA_DIR).filter((file) => /-full\.ts$/i.test(file)).sort();
  const dishesByKitchen = new Map();
  const seenIds = new Map();

  for (const file of files) {
    const kitchenId = normalizeKitchenId(file);
    const text = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
    let records = getArrayRecords(text);
    if (!records.length) {
      const jsonFile = file.replace(/-full\.ts$/i, '-full-100-USDA.json');
      const jsonPath = path.join(DATA_DIR, jsonFile);
      if (fs.existsSync(jsonPath)) {
        try {
          const source = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
          records = (source.categories ?? []).flatMap((category) => category.dishes ?? []).map((dish) => ({
            record: {
              id: dish.id,
              nameAr: dish.nameAr ?? dish.name_ar ?? dish.name ?? '',
              nameEn: dish.nameEn ?? dish.name_en ?? '',
              nameFr: dish.nameFr ?? dish.name_fr ?? '',
              nameEs: dish.nameEs ?? dish.name_es ?? '',
              nameDe: dish.nameDe ?? dish.name_de ?? '',
              descriptionAr: dish.descriptionAr ?? dish.description_ar ?? '',
              descriptionEn: dish.descriptionEn ?? dish.description_en ?? '',
              descriptionFr: dish.descriptionFr ?? dish.description_fr ?? '',
              descriptionEs: dish.descriptionEs ?? dish.description_es ?? '',
              descriptionDe: dish.descriptionDe ?? dish.description_de ?? '',
              kcal: dish.kcal ?? dish.cal_100,
              protein: dish.protein ?? dish.p,
              carbs: dish.carbs ?? dish.c,
              fat: dish.fat ?? dish.f,
            },
            name: 'imported-json',
          }));
        } catch (error) {
          addIssue('dishes', 'invalid-source-json', jsonFile, kitchenId, String(error));
        }
      } else {
        addIssue('dishes', 'unparsed-source', file, kitchenId, 'No literal dish records or matching rich kitchen JSON were found.');
      }
    }
    if (!dishesByKitchen.has(kitchenId)) dishesByKitchen.set(kitchenId, 0);
    dishesByKitchen.set(kitchenId, dishesByKitchen.get(kitchenId) + records.length);
    metrics.dishes.total += records.length;

    for (const { record, name } of records) {
      const id = String(record.id ?? '');
      const key = `${kitchenId}:${id.toLowerCase()}`;
      if (seenIds.has(key)) {
        addIssue('dishes', 'duplicate-id', file, id, `Duplicate dish ID in kitchen ${kitchenId}; first seen in ${seenIds.get(key)}.`);
        metrics.dishes.duplicateIds++;
      } else seenIds.set(key, file);

      const missingNames = LANGUAGES.filter((language, index) => {
        const value = getDishNameFields(record)[index];
        return typeof value !== 'string' || !value.trim() || /^PENDING(?:_|$)/i.test(value);
      }).map((language) => `name${language}`);
      const missingDescriptions = LANGUAGES.filter((language) => {
        const value = getDishDescription(record, language);
        return typeof value !== 'string' || !value.trim();
      }).map((language) => `description${language}`);
      if (missingNames.length || missingDescriptions.length) {
        addIssue('dishes', 'missing-translations', file, id || `${name} row`, [...missingNames, ...missingDescriptions]);
        metrics.dishes.missingTranslations++;
      }

      const calories = record.calories ?? record.kcal ?? record.cal_100;
      const protein = record.protein ?? record.p;
      const carbs = record.carbs ?? record.c;
      const fat = record.fat ?? record.f;
      const macros = { calories: Number(calories), protein: Number(protein), carbs: Number(carbs), fat: Number(fat) };
      const invalidMacros = Object.entries(macros).filter(([, value]) => !Number.isFinite(value) || value <= 0).map(([key]) => key);
      if (invalidMacros.length) {
        addIssue('dishes', 'invalid-macros', file, id, { invalid: invalidMacros, values: macros });
        metrics.dishes.invalidMacros++;
      }
      if (Object.values(macros).every((value) => Number.isFinite(value) && value > 0)) {
        const expected = macros.protein * 4 + macros.carbs * 4 + macros.fat * 9;
        const deviation = Math.abs(macros.calories - expected) / expected;
        if (deviation > 0.1) {
          addIssue('dishes', 'macro-mismatch', file, id, { calories: macros.calories, calculated: Number(expected.toFixed(1)), deviationPercent: Number((deviation * 100).toFixed(1)) });
          metrics.dishes.macroMismatches++;
        }
      }

      const descriptions = LANGUAGES.map((language) => getDishDescription(record, language));
      const textToScan = [...getDishNameFields(record), ...descriptions].filter((value) => typeof value === 'string').join(' ');
      const found = textToScan.match(new RegExp(HALAL_KEYWORDS.source, 'ig'));
      if (found?.length) {
        addIssue('dishes', 'halal-violation', file, id, [...new Set(found.map((word) => word.toLowerCase()))]);
        metrics.dishes.halalViolations++;
      }
    }
  }

  metrics.dishes.perKitchen = Object.fromEntries([...dishesByKitchen.entries()].sort(([a], [b]) => a.localeCompare(b)));
  return files;
}

function exercisePrescription(record) {
  const source = record.sourceSets ?? record.sets;
  if (typeof source === 'number') return source > 0 ? source : null;
  if (typeof source !== 'string') return null;
  const match = source.match(/^\s*(\d+)\s*[×x]\s*(.+?)\s*$/i);
  return match && Number(match[1]) > 0 ? Number(match[1]) : null;
}

function validateExercises(unifiedSource) {
  const exerciseDir = path.join(DATA_DIR, 'exercises');
  const sourceFiles = fs.readdirSync(exerciseDir).filter((file) => /-full\.ts$/i.test(file)).sort();
  const exerciseRecords = [];
  for (const file of sourceFiles) {
    const text = fs.readFileSync(path.join(exerciseDir, file), 'utf8');
    exerciseRecords.push(...getArrayRecords(text).map(({ record }) => ({ record, file })));
  }
  for (const name of ['LEGACY_UNIQUE_EXERCISES', 'BODY_CONCERN_EXERCISES']) {
    exerciseRecords.push(...getNamedArrayRecords(unifiedSource, name).map(({ record }) => ({ record, file: 'unified.ts' })));
  }
  metrics.exercises.total = exerciseRecords.length;
  const seen = new Map();
  const unifiedAddsReviewFlag = /prescription\.sets\s*===\s*null\s*\?\s*\{\s*reviewStatus:\s*'needs_review'/m.test(unifiedSource);

  for (const { record, file } of exerciseRecords) {
    const id = String(record.id ?? '');
    const invalid = [];
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) invalid.push({ field: 'id', value: id || null });
    const idKey = id.toLowerCase();
    if (seen.has(idKey)) {
      addIssue('exercises', 'duplicate-id', file, id, `Duplicate ID; first seen in ${seen.get(idKey)}.`);
      metrics.exercises.duplicates++;
    } else seen.set(idKey, file);

    const missing = LANGUAGES.filter((language) => {
      const value = record[`name${language}`];
      return typeof value !== 'string' || !value.trim() || /^PENDING(?:_|$)/i.test(value);
    }).map((language) => `name${language}`);
    if (missing.length) {
      addIssue('exercises', 'missing-translations', file, id, missing);
      metrics.exercises.missingTranslations++;
    }

    const type = String(record.type ?? '').toLowerCase();
    if (!EXERCISE_TYPES.has(type)) invalid.push({ field: 'type', value: record.type ?? null });
    const difficulty = String(record.difficulty ?? '').toLowerCase();
    if (!EXERCISE_DIFFICULTIES.has(difficulty)) invalid.push({ field: 'difficulty', value: record.difficulty ?? null });

    const sets = exercisePrescription(record);
    if (sets === null && !unifiedAddsReviewFlag && record.reviewStatus !== 'needs_review') {
      invalid.push({ field: 'sets', value: record.sourceSets ?? record.sets ?? null, expected: 'number or null with needs_review' });
    }
    if (invalid.length) {
      addIssue('exercises', 'invalid-record', file, id, invalid);
      metrics.exercises.invalidRecords++;
    }
  }
  return exerciseRecords;
}

function sectionLine(title, data, count) {
  const state = count ? color('ISSUES', '31;1') : color('PASS', '32;1');
  console.log(`${state} ${title}: ${JSON.stringify(data)}`);
}

function printSummary() {
  const counts = Object.fromEntries(Object.entries(issues).map(([section, entries]) => [section, entries.length]));
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  console.log('\n' + color('DATA VALIDATION SUMMARY', '1;36'));
  console.log('Category   Records   Issues');
  console.log(`Kitchens   ${String(metrics.kitchens.total).padStart(7)}   ${String(counts.kitchens).padStart(6)}`);
  console.log(`Exercises  ${String(metrics.exercises.total).padStart(7)}   ${String(counts.exercises).padStart(6)}`);
  console.log(`Dishes     ${String(metrics.dishes.total).padStart(7)}   ${String(counts.dishes).padStart(6)}`);
  console.log(`TOTAL      ${String(metrics.kitchens.total + metrics.exercises.total + metrics.dishes.total).padStart(7)}   ${String(total).padStart(6)}`);
  console.log(`Detailed report: ${path.relative(ROOT, REPORT_PATH)}`);
  return { counts, total };
}

function main() {
  const kitchenIndex = fs.readFileSync(path.join(DATA_DIR, 'kitchens', 'index.ts'), 'utf8');
  const unifiedExercises = fs.readFileSync(path.join(DATA_DIR, 'exercises', 'unified.ts'), 'utf8');
  validateKitchens(kitchenIndex);
  validateExercises(unifiedExercises);
  validateDishes();

  sectionLine('KITCHENS', {
    total: metrics.kitchens.total,
    duplicates: metrics.kitchens.duplicates,
    missingTranslations: metrics.kitchens.missingTranslations,
    misplacedDietKitchens: metrics.kitchens.misplacedDietKitchens,
    invalidRecords: metrics.kitchens.invalidRecords,
  }, issues.kitchens.length);
  sectionLine('EXERCISES', {
    total: metrics.exercises.total,
    missingTranslations: metrics.exercises.missingTranslations,
    invalidRecords: metrics.exercises.invalidRecords,
    duplicates: metrics.exercises.duplicates,
  }, issues.exercises.length);
  sectionLine('DISHES', {
    total: metrics.dishes.total,
    kitchens: metrics.dishes.perKitchen,
    missingTranslations: metrics.dishes.missingTranslations,
    halalViolations: metrics.dishes.halalViolations,
    invalidMacros: metrics.dishes.invalidMacros,
    macroMismatches: metrics.dishes.macroMismatches,
    duplicateIds: metrics.dishes.duplicateIds,
  }, issues.dishes.length);

  const summary = printSummary();
  const report = {
    generatedAt: new Date().toISOString(),
    summary: { ...summary, records: { kitchens: metrics.kitchens.total, exercises: metrics.exercises.total, dishes: metrics.dishes.total } },
    metrics,
    issues,
  };
  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  process.exitCode = summary.total ? 1 : 0;
}

main();
