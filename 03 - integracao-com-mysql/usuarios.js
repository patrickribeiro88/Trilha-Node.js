const db = require('./db');

async function createUser(name, email, password) {
  const sql = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
  const result = await db.query(sql, [name, email, password]);
  return result.insertId;
}

async function getUsers() {
  const sql = `SELECT id, nome, email, criado_em FROM usuarios ORDER BY id`;
  return db.query(sql);
}

async function getUserById(id) {
  const sql = `SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?`;
  const rows = await db.query(sql, [id]);
  return rows[0] || null;
}

async function updateUser(id, name, email, password) {
  const sql = `UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?`;
  const result = await db.query(sql, [name, email, password, id]);
  return result.affectedRows;
}

async function deleteUser(id) {
  const sql = `DELETE FROM usuarios WHERE id = ?`;
  const result = await db.query(sql, [id]);
  return result.affectedRows;
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
