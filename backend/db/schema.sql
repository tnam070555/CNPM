CREATE TABLE IF NOT EXISTS artifacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  zone VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4;

INSERT INTO artifacts (name, description, zone)
SELECT 'Trống đồng Đông Sơn', 'Hiện vật tiêu biểu của văn hóa Đông Sơn.', 'Khu A' FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM artifacts WHERE name = 'Trống đồng Đông Sơn');

INSERT INTO artifacts (name, description, zone)
SELECT 'Bình gốm Chu Đậu', 'Gốm men trắng vẽ lam thế kỷ 15.', 'Khu B' FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM artifacts WHERE name = 'Bình gốm Chu Đậu');

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4;
