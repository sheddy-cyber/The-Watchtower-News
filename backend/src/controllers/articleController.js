// backend/src/controllers/articleController.js
const prisma = require("../config/db");

const PAGE_SIZE = 12;

// GET /api/articles?page=1&category=World
const listArticles = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const where = req.query.category ? { category: req.query.category } : {};

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        select: {
          id: true, title: true, slug: true, category: true,
          author: true, excerpt: true, imageUrl: true,
          trending: true, views: true, publishedAt: true,
        },
      }),
      prisma.article.count({ where }),
    ]);

    res.json({ articles, total, page, pages: Math.ceil(total / PAGE_SIZE) });
  } catch (err) {
    next(err);
  }
};

// GET /api/articles/:id
const getArticle = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const article = await prisma.article.findUnique({ where: { id } });
    if (!article) return res.status(404).json({ error: "Article not found." });

    // Increment view count (fire-and-forget)
    prisma.article.update({ where: { id }, data: { views: { increment: 1 } } }).catch(() => {});

    res.json(article);
  } catch (err) {
    next(err);
  }
};

// GET /api/articles/trending
const getTrending = async (req, res, next) => {
  try {
    const articles = await prisma.article.findMany({
      where: { trending: true },
      orderBy: { views: "desc" },
      take: 8,
      select: { id: true, title: true, slug: true, category: true, author: true, imageUrl: true, views: true },
    });
    res.json(articles);
  } catch (err) {
    next(err);
  }
};

// GET /api/articles/search?q=climate
const searchArticles = async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.json([]);

    // PostgreSQL full-text search — plainto_tsquery is injection-safe via tagged template
    const rows = await prisma.$queryRaw`
      SELECT
        id, title, slug, category, author, excerpt,
        "imageUrl", trending, views, "publishedAt"
      FROM "Article"
      WHERE to_tsvector('english', title || ' ' || excerpt || ' ' || content)
            @@ plainto_tsquery('english', ${q})
      ORDER BY views DESC
      LIMIT 20
    `;

    // Prisma $queryRaw returns BigInt for numeric columns — serialize safely
    const articles = rows.map((r) => ({
      ...r,
      id: Number(r.id),
      views: Number(r.views),
    }));

    res.json(articles);
  } catch (err) {
    next(err);
  }
};

module.exports = { listArticles, getArticle, getTrending, searchArticles };
