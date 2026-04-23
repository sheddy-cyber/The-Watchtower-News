// backend/src/controllers/bookmarkController.js
const prisma = require("../config/db");

// GET /api/bookmarks
const getBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: req.user.sub },
      include: {
        article: {
          select: {
            id: true, title: true, slug: true, category: true,
            author: true, excerpt: true, imageUrl: true, publishedAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(bookmarks.map((b) => b.article));
  } catch (err) {
    next(err);
  }
};

// POST /api/bookmarks/:id
const addBookmark = async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id);
    const article = await prisma.article.findUnique({ where: { id: articleId } });
    if (!article) return res.status(404).json({ error: "Article not found." });

    await prisma.bookmark.upsert({
      where: { userId_articleId: { userId: req.user.sub, articleId } },
      update: {},
      create: { userId: req.user.sub, articleId },
    });
    res.status(201).json({ message: "Bookmarked." });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/bookmarks/:id
const removeBookmark = async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id);
    await prisma.bookmark.deleteMany({
      where: { userId: req.user.sub, articleId },
    });
    res.json({ message: "Bookmark removed." });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBookmarks, addBookmark, removeBookmark };
