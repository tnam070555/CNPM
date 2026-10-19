require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const artifactRoutes = require("./routes/artifactRoutes");

if (!process.env.JWT_SECRET) {
  console.error("Thiếu JWT_SECRET trong .env, server không khởi động");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/artifacts", artifactRoutes);

app.listen(PORT, () => console.log(`Server chạy ở cổng ${PORT}`));
