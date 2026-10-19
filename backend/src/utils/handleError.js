// Trả lỗi có mã HTTP (400, 401, 404...) hoặc 500 nếu là lỗi bất ngờ
function handleError(res, err) {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: "Lỗi máy chủ" });
}

module.exports = handleError;
