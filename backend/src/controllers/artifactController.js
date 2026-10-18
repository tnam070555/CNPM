const artifactService = require("../services/artifactService");

// Lớp 1: chỉ lo chuyện HTTP (nhận request, chọn mã trạng thái, trả JSON)
function handleError(res, err) {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: "Lỗi máy chủ" });
}

async function getAll(req, res) {
  try {
    res.json(await artifactService.getAllArtifacts());
  } catch (err) {
    handleError(res, err);
  }
}

async function getById(req, res) {
  try {
    res.json(await artifactService.getArtifactById(Number(req.params.id)));
  } catch (err) {
    handleError(res, err);
  }
}

async function create(req, res) {
  try {
    const created = await artifactService.createArtifact(req.body);
    res.status(201).json(created);
  } catch (err) {
    handleError(res, err);
  }
}

async function update(req, res) {
  try {
    res.json(await artifactService.updateArtifact(Number(req.params.id), req.body));
  } catch (err) {
    handleError(res, err);
  }
}

async function remove(req, res) {
  try {
    await artifactService.deleteArtifact(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    handleError(res, err);
  }
}

module.exports = { getAll, getById, create, update, remove };
