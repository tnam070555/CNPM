const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

async function login(credentials) {
  const { username, password } = credentials || {};
  if (typeof username !== "string" || typeof password !== "string" || !username.trim() || !password) {
    throw httpError(400, "Cần nhập tên đăng nhập và mật khẩu");
  }

  const user = await userRepository.findByUsername(username.trim());
  // So khớp mật khẩu với bản băm; dùng chung một thông báo lỗi để không lộ "tài khoản có tồn tại không"
  const passwordOk = user && (await bcrypt.compare(password, user.password_hash));
  if (!passwordOk) {
    throw httpError(401, "Sai tên đăng nhập hoặc mật khẩu");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("Thiếu JWT_SECRET trong .env");
  }
  const token = jwt.sign(
    { sub: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  return { token, user: { id: user.id, username: user.username, role: user.role } };
}

module.exports = { login };
