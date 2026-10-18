// Tạo database (nếu chưa có), tạo bảng và dữ liệu mẫu. Chạy lại nhiều lần vẫn an toàn.
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

async function main() {
  const dbName = process.env.DB_NAME;
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "UTF8MB4_UNICODE_CI",
    multipleStatements: true,
  });

  const schema = fs
    .readFileSync(path.join(__dirname, "schema.sql"), "utf8")
    .replace(/^\uFEFF/, ""); // bỏ ký tự BOM đầu file nếu có

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; USE \`${dbName}\`; ${schema}`
  );
  console.log("Đã khởi tạo database");
  await connection.end();
}

main().catch((err) => {
  console.error("Lỗi khởi tạo database:", err.message);
  process.exit(1);
});
