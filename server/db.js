import Database from "better-sqlite3";
const db = new Database("./catalyst.db");

const create_table_query = `CREATE TABLE IF NOT EXISTS jobs (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL,
  company     TEXT NOT NULL,
  role        TEXT NOT NULL,
  status      TEXT NOT NULL,
  url         TEXT,
  notes       TEXT,
  jd_text     TEXT,
  created_at  TEXT NOT NULL
)`;

// const dummy_insert_query = `
//   INSERT INTO jobs (id, user_id, company, role, status, url, notes, jd_text, created_at)
//   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
// `;

// db.prepare(dummy_insert_query).run(
//   "test-002",
//   "user-002",
//   "Rupeek",
//   "Software Engineer",
//   "applied",
//   "https://stripe.com",
//   null,
//   null,
//   new Date().toISOString(),
// );
// db.exec(create_table_query);

export default db;
