// Regenerates scripts/_db-names.json (raw name_ar array) from the LIVE dishes table.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['levant-migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SERVICE_KEY in .env');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const names = [];
let from = 0;
for (;;) {
  const { data, error } = await supabase.from('dishes').select('name_ar').order('id').range(from, from + 999);
  if (error) { console.error('DB error:', error.message); process.exit(1); }
  if (!data.length) break;
  for (const r of data) names.push(r.name_ar);
  from += data.length;
  if (data.length < 1000) break;
}

fs.writeFileSync(path.join(__dirname, '_db-names.json'), JSON.stringify(names, null, 2));
console.log('wrote scripts/_db-names.json:', names.length, 'names');