const Article = require("../models/Article");

// @desc    Create a new article
// @route   POST /api/articles
// @access  Private
const createArticle = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const article = await Article.create({
      title,
      content,
      tags: tags || [],
      author: req.user._id,
    });

    // Populate author username before responding
    await article.populate("author", "username");

    res.status(201).json({
      message: "Article created successfully",
      article,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Get all articles (public)
// @route   GET /api/articles
// @access  Public
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: articles.length,
      articles,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Get single article by ID (public)
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "username"
    );

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.status(200).json({ article });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Update an article
// @route   PUT /api/articles/:id
// @access  Private (author only)
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    // Only the author can update
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this article",
      });
    }

    const { title, content, tags } = req.body;

    if (title !== undefined) article.title = title;
    if (content !== undefined) article.content = content;
    if (tags !== undefined) article.tags = tags;

    const updatedArticle = await article.save();
    await updatedArticle.populate("author", "username");

    res.status(200).json({
      message: "Article updated successfully",
      article: updatedArticle,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Delete an article
// @route   DELETE /api/articles/:id
// @access  Private (author only)
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    // Only the author can delete
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this article",
      });
    }

    await article.deleteOne();

    res.status(200).json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Get all articles by the logged-in user
// @route   GET /api/articles/my-articles
// @access  Private
const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user._id })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: articles.length,
      articles,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getMyArticles,
};
