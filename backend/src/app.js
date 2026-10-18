const express = require("express");
const artifactRoutes = require("./routes/artifactRoutes");

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/artifacts", artifactRoutes);

app.listen(3000, () => console.log("Server chạy ở cổng 3000"));
