// Tạo (hoặc đặt lại mật khẩu) tài khoản admin theo ADMIN_USERNAME / ADMIN_PASSWORD trong .env
require("dotenv").config();
const bcrypt = require("bcryptjs");
const pool = require("../src/config/db");
const userRepository = require("../src/repositories/userRepository");

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    throw new Error("Thiếu ADMIN_USERNAME hoặc ADMIN_PASSWORD trong .env");
  }
  if (password.length < 6) {
    throw new Error("ADMIN_PASSWORD cần ít nhất 6 ký tự");
  }

  const hash = await bcrypt.hash(password, 10);
  const existing = await userRepository.findByUsername(username);
  if (existing) {
    await userRepository.updatePassword(existing.id, hash);
    console.log("Đã cập nhật mật khẩu admin");
  } else {
    await userRepository.create(username, hash, "admin");
    console.log("Đã tạo tài khoản admin");
  }
  await pool.end();
}

main().catch((err) => {
  console.error("Lỗi:", err.message);
  process.exit(1);
});
