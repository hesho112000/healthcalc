import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, 'healthcalc.db');

let db = null;

export async function initDB() {
  const SQL = await initSqlJs();

  if (existsSync(DB_PATH)) {
    const buffer = readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      subscription_status TEXT NOT NULL DEFAULT 'free',
      subscription_end_date TEXT DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migration: add subscription_end_date if missing
  try {
    db.run(`ALTER TABLE users ADD COLUMN subscription_end_date TEXT DEFAULT NULL`);
  } catch (e) {
    // column already exists, ignore
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      plan_type TEXT NOT NULL DEFAULT 'annual',
      price REAL NOT NULL DEFAULT 15.00,
      currency TEXT NOT NULL DEFAULT 'USD',
      start_date DATETIME NOT NULL,
      end_date DATETIME NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS health_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      date DATETIME DEFAULT CURRENT_TIMESTAMP,
      module TEXT NOT NULL,
      inputs TEXT NOT NULL,
      results TEXT NOT NULL,
      notes TEXT DEFAULT '',
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  saveDB();
  return db;
}

export function saveDB() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    writeFileSync(DB_PATH, buffer);
  }
}

export function getDB() {
  if (!db) throw new Error('Database not initialized. Call initDB() first.');
  return db;
}

export default {
  get prepare() {
    return (sql) => {
      return {
        get: (...params) => {
          const stmt = db.prepare(sql);
          if (params.length > 0) stmt.bind(params);
          const result = stmt.step() ? stmt.getAsObject() : undefined;
          stmt.free();
          return result;
        },
        all: (...params) => {
          const results = [];
          const stmt = db.prepare(sql);
          if (params.length > 0) stmt.bind(params);
          while (stmt.step()) {
            results.push(stmt.getAsObject());
          }
          stmt.free();
          return results;
        },
        run: (...params) => {
          db.run(sql, params);
          saveDB();
          const lastId = db.exec("SELECT last_insert_rowid() as id")[0]?.values[0][0];
          return { lastInsertRowid: lastId, changes: db.getRowsModified() };
        },
      };
    };
  },
};
