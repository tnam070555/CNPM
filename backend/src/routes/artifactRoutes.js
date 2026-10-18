const express = require("express");
const artifactController = require("../controllers/artifactController");

const router = express.Router();

router.get("/", artifactController.getAll);
router.get("/:id", artifactController.getById);

module.exports = router;
