const artifactRepository = require("../repositories/artifactRepository");

// Lớp 2: logic nghiệp vụ (kiểm tra dữ liệu, quyết định lỗi gì)
function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function checkId(id) {
  if (!Number.isInteger(id)) throw httpError(400, "id không hợp lệ");
}

function checkData(data) {
  if (!data || typeof data.name !== "string" || data.name.trim() === "") {
    throw httpError(400, "Tên hiện vật là bắt buộc");
  }
}

async function getAllArtifacts() {
  return artifactRepository.findAll();
}

async function getArtifactById(id) {
  checkId(id);
  const artifact = await artifactRepository.findById(id);
  if (!artifact) throw httpError(404, "Không tìm thấy hiện vật");
  return artifact;
}

async function createArtifact(data) {
  checkData(data);
  return artifactRepository.create({
    name: data.name.trim(),
    description: data.description ?? null,
    zone: data.zone ?? null,
  });
}

async function updateArtifact(id, data) {
  checkId(id);
  checkData(data);
  const existing = await artifactRepository.findById(id);
  if (!existing) throw httpError(404, "Không tìm thấy hiện vật");
  return artifactRepository.update(id, {
    name: data.name.trim(),
    description: data.description ?? null,
    zone: data.zone ?? null,
  });
}

async function deleteArtifact(id) {
  checkId(id);
  const deleted = await artifactRepository.remove(id);
  if (!deleted) throw httpError(404, "Không tìm thấy hiện vật");
}

module.exports = {
  getAllArtifacts,
  getArtifactById,
  createArtifact,
  updateArtifact,
  deleteArtifact,
};
