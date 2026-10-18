const express = require("express");
const artifactController = require("../controllers/artifactController");

const router = express.Router();

router.get("/", artifactController.getAll);
router.get("/:id", artifactController.getById);
router.post("/", artifactController.create);
router.put("/:id", artifactController.update);
router.delete("/:id", artifactController.remove);

module.exports = router;
