require("dotenv").config();
const express = require("express");
const artifactRoutes = require("./routes/artifactRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/artifacts", artifactRoutes);

app.listen(PORT, () => console.log(`Server chạy ở cổng ${PORT}`));
