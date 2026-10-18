// Dữ liệu giả, sau này thay bằng truy vấn database
const artifacts = [
  { id: 1, name: "Trống đồng Đông Sơn", description: "Hiện vật tiêu biểu của văn hóa Đông Sơn.", zone: "Khu A" },
  { id: 2, name: "Bình gốm Chu Đậu", description: "Gốm men trắng vẽ lam thế kỷ 15.", zone: "Khu B" },
];

function findAll() {
  return artifacts;
}

function findById(id) {
  return artifacts.find((a) => a.id === id);
}

module.exports = { findAll, findById };
