const pool = require("../config/db");

async function findByUsername(username) {
  const [rows] = await pool.query(
    "SELECT id, username, password_hash, role FROM users WHERE username = ?",
    [username]
  );
  return rows[0];
}

async function create(username, passwordHash, role) {
  const [result] = await pool.query(
    "INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)",
    [username, passwordHash, role]
  );
  return result.insertId;
}

async function updatePassword(id, passwordHash) {
  await pool.query("UPDATE users SET password_hash = ? WHERE id = ?", [passwordHash, id]);
}

module.exports = { findByUsername, create, updatePassword };
