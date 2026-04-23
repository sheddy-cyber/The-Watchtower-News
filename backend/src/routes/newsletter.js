// backend/src/routes/newsletter.js
const { Router } = require("express");
const { body } = require("express-validator");
const ctrl = require("../controllers/newsletterController");
const { newsletterLimiter } = require("../middleware/rateLimiter");
const { validate } = require("../middleware/validate");

const router = Router();

router.post(
  "/subscribe",
  newsletterLimiter,
  [body("email").isEmail().normalizeEmail().withMessage("Valid email required.")],
  validate,
  ctrl.subscribe
);

router.get("/confirm/:token", ctrl.confirm);

router.post(
  "/unsubscribe",
  [body("token").notEmpty()],
  validate,
  ctrl.unsubscribe
);

module.exports = router;
