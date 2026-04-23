// backend/src/routes/bookmarks.js
const { Router } = require("express");
const ctrl = require("../controllers/bookmarkController");
const { requireAuth } = require("../middleware/auth");

const router = Router();

router.use(requireAuth); // all bookmark routes require auth

router.get("/", ctrl.getBookmarks);
router.post("/:id", ctrl.addBookmark);
router.delete("/:id", ctrl.removeBookmark);

module.exports = router;
