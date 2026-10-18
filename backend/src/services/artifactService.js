const artifactRepository = require("../repositories/artifactRepository");

function getAllArtifacts() {
  return artifactRepository.findAll();
}

function getArtifactById(id) {
  const artifact = artifactRepository.findById(id);
  if (!artifact) {
    // Ném lỗi nghiệp vụ, controller sẽ quyết định trả mã HTTP nào
    const error = new Error("Không tìm thấy hiện vật");
    error.status = 404;
    throw error;
  }
  return artifact;
}

module.exports = { getAllArtifacts, getArtifactById };
