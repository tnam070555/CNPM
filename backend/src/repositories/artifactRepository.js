const pool = require("../config/db");

// Lớp 3: chỉ làm việc với database, không chứa logic nghiệp vụ
async function findAll() {
  const [rows] = await pool.query(
    "SELECT id, name, description, zone FROM artifacts ORDER BY id"
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query(
    "SELECT id, name, description, zone FROM artifacts WHERE id = ?",
    [id]
  );
  return rows[0];
}

async function create({ name, description, zone }) {
  const [result] = await pool.query(
    "INSERT INTO artifacts (name, description, zone) VALUES (?, ?, ?)",
    [name, description, zone]
  );
  return findById(result.insertId);
}

async function update(id, { name, description, zone }) {
  await pool.query(
    "UPDATE artifacts SET name = ?, description = ?, zone = ? WHERE id = ?",
    [name, description, zone, id]
  );
  return findById(id); // không có id này thì trả về undefined
}

async function remove(id) {
  const [result] = await pool.query("DELETE FROM artifacts WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };
