import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import linkRoutes from "./routes/linkRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// health check
app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

// routes
app.use("/", linkRoutes);

// connect db + start server
const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected!");
    return sequelize.sync(); // creates table automatically
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB error:", err));
