const artifactService = require("../services/artifactService");

function getAll(req, res) {
  const data = artifactService.getAllArtifacts();
  res.json(data);
}

function getById(req, res) {
  try {
    const id = Number(req.params.id);
    const data = artifactService.getArtifactById(id);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

module.exports = { getAll, getById };
