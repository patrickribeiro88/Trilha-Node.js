const db = require('../db');

const TABLE = 'users';

async function getAll({ page = 1, limit = 10, name }) {
  const q = db(TABLE).select('*');
  if (name) q.where('name', 'like', `%${name}%`);

  const countResult = await q.clone().count({ count: '*' }).first();
  const total = Number(countResult.count || countResult['count(*)'] || 0);

  const offset = (page - 1) * limit;
  const data = await q.clone().limit(limit).offset(offset);

  return { total, page: Number(page), limit: Number(limit), data };
}

async function create(user) {
  const [id] = await db(TABLE).insert(user);
  return getById(id);
}

async function getById(id) {
  return db(TABLE).where('id', id).first();
}

async function updateById(id, patch) {
  await db(TABLE).where('id', id).update(patch);
  return getById(id);
}

async function removeById(id) {
  return db(TABLE).where('id', id).del();
}

module.exports = { getAll, create, getById, updateById, removeById };
