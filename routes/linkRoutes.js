import express from "express";
import {
  createLink,
  getAllLinks,
  getStats,
  deleteLink,
  redirectLink,
} from "../controllers/linkController.js";

const router = express.Router();

router.post("/api/links", createLink);
router.get("/api/links", getAllLinks);
router.get("/api/links/:code", getStats);
router.delete("/api/links/:code", deleteLink);

// Redirect must be last
router.get("/:code", redirectLink);

export default router;
