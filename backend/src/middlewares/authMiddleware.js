const jwt = require("jsonwebtoken");

// Yêu cầu request phải có header: Authorization: Bearer <token>
function authenticate(req, res, next) {
  const [scheme, token] = (req.headers.authorization || "").split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Thiếu token đăng nhập" });
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
}

// Chỉ cho phép một số vai trò (ví dụ: admin)
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Không đủ quyền" });
    }
    next();
  };
}

module.exports = { authenticate, requireRole };
