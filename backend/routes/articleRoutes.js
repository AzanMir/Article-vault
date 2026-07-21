const express = require("express");
const router = express.Router();

const {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getMyArticles,
} = require("../controllers/articleController");

const { protect } = require("../middleware/authMiddleware");

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Article Routes Working" });
});

// Public routes
router.get("/", getAllArticles);

// Private routes — must come before /:id to avoid "my-articles" being parsed as an ID
router.get("/my-articles", protect, getMyArticles);
router.post("/", protect, createArticle);

// Parameterized routes
router.get("/:id", getArticleById);
router.put("/:id", protect, updateArticle);
router.delete("/:id", protect, deleteArticle);

module.exports = router;
