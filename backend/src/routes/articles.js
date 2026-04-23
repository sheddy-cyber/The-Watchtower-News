// backend/src/routes/articles.js
const { Router } = require("express");
const { query } = require("express-validator");
const ctrl = require("../controllers/articleController");
const { validate } = require("../middleware/validate");

const VALID_CATEGORIES = ["World", "Technology", "Business", "Health", "Sports"];

const router = Router();

router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("category").optional().isIn(VALID_CATEGORIES)
      .withMessage(`Category must be one of: ${VALID_CATEGORIES.join(", ")}`),
  ],
  validate,
  ctrl.listArticles
);

router.get("/trending", ctrl.getTrending);
router.get("/search", [query("q").optional().isString().trim()], validate, ctrl.searchArticles);
router.get("/:id", [query("id").optional().isInt()], ctrl.getArticle);

module.exports = router;
