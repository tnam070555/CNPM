const test = require("node:test");
const assert = require("node:assert");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../src/repositories/userRepository");
const authService = require("../src/services/authService");

process.env.JWT_SECRET = "test-secret";
const fakeUser = { id: 1, username: "admin", role: "admin", password_hash: bcrypt.hashSync("123456", 4) };

test("thiếu mật khẩu thì ném lỗi 400", async () => {
  await assert.rejects(
    () => authService.login({ username: "admin" }),
    (err) => err.status === 400
  );
});

test("tài khoản không tồn tại thì ném lỗi 401", async (t) => {
  t.mock.method(userRepository, "findByUsername", async () => undefined);
  await assert.rejects(
    () => authService.login({ username: "khong-co", password: "123456" }),
    (err) => err.status === 401
  );
});

test("sai mật khẩu thì ném lỗi 401", async (t) => {
  t.mock.method(userRepository, "findByUsername", async () => fakeUser);
  await assert.rejects(
    () => authService.login({ username: "admin", password: "sai-mat-khau" }),
    (err) => err.status === 401
  );
});

test("đăng nhập đúng thì trả token hợp lệ", async (t) => {
  t.mock.method(userRepository, "findByUsername", async () => fakeUser);
  const result = await authService.login({ username: "admin", password: "123456" });
  const payload = jwt.verify(result.token, "test-secret");
  assert.strictEqual(payload.username, "admin");
  assert.strictEqual(payload.role, "admin");
});
