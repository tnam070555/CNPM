require("dotenv").config();
const mysql = require("mysql2/promise");

// Pool = nhóm kết nối tới database, dùng chung cho toàn ứng dụng
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "UTF8MB4_UNICODE_CI",
});

module.exports = pool;
