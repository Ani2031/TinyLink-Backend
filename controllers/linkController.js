import Link from "../models/Link.js";
import crypto from "crypto";

/** Helper function to generate random codes */
function generateCode() {
  return crypto.randomBytes(4).toString("hex").slice(0, 6);
}

/** Create a short link */
export const createLink = async (req, res) => {
  try {
    const { url, code } = req.body;

    if (!url) return res.status(400).json({ error: "URL is required" });

    const finalCode = code || generateCode();

    const exists = await Link.findByPk(finalCode);
    if (exists) return res.status(409).json({ error: "Code already exists" });

    const newLink = await Link.create({
      code: finalCode,
      targetUrl: url,
    });

    return res.json(newLink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

/** List all links */
export const getAllLinks = async (req, res) => {
  try {
    const links = await Link.findAll({
      order: [["created_at", "DESC"]],
    });
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

/** Get stats for a code */
export const getStats = async (req, res) => {
  try {
    const link = await Link.findByPk(req.params.code);

    if (!link) return res.status(404).json({ error: "Not found" });

    res.json(link);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

/** Delete a link */
export const deleteLink = async (req, res) => {
  try {
    const deleted = await Link.destroy({
      where: { code: req.params.code },
    });

    if (!deleted) return res.status(404).json({ error: "Code not found" });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

/** Redirect logic */
export const redirectLink = async (req, res) => {
  try {
    const link = await Link.findByPk(req.params.code);

    if (!link) return res.status(404).send("Not Found");

    // update clicks
    await link.update({
      totalClicks: link.totalClicks + 1,
      lastClickedAt: new Date(),
    });

    return res.redirect(302, link.targetUrl);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
