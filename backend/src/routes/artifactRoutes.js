const express = require("express");
const artifactController = require("../controllers/artifactController");
const { authenticate, requireRole } = require("../middlewares/authMiddleware");

const router = express.Router();

// Công khai: du khách xem
router.get("/", artifactController.getAll);
router.get("/:id", artifactController.getById);

// Chỉ admin đã đăng nhập
router.post("/", authenticate, requireRole("admin"), artifactController.create);
router.put("/:id", authenticate, requireRole("admin"), artifactController.update);
router.delete("/:id", authenticate, requireRole("admin"), artifactController.remove);

module.exports = router;
