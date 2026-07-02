const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const DB_FILE = ':memory:';
const db = new sqlite3.Database(DB_FILE);

function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function getQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function allQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

async function safeQuery(sql, params = []) {
  return allQuery(sql, params);
}

async function initializeDatabase() {
  await runQuery(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `);

  const existing = await getQuery('SELECT COUNT(*) AS count FROM users');
  if (existing && existing.count === 0) {
    const users = [
      { username: 'admin', password: 'Admin@123', role: 'admin' },
      { username: 'user', password: 'User@123', role: 'user' },
      { username: 'guest', password: 'Guest@123', role: 'guest' }
    ];

    for (const user of users) {
      const hashed = await bcrypt.hash(user.password, 10);
      await runQuery(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [user.username, hashed, user.role]
      );
    }
  }
}

module.exports = {
  db,
  initializeDatabase,
  runQuery,
  getQuery,
  allQuery,
  safeQuery
};
