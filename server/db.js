const Database = require('better-sqlite3');

// This creates app.db file if it doesn't exist
const db = new Database('app.db');

// Create users table (only if it doesn't exist yet)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    has_paid INTEGER DEFAULT 0,
    college TEXT,
    graduation_year TEXT,
    career_goal TEXT
  )
`);

module.exports = db;