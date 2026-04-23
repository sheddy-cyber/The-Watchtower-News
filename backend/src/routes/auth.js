// backend/src/routes/auth.js
const { Router } = require("express");
const { body } = require("express-validator");
const ctrl = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");
const { validate } = require("../middleware/validate");

const router = Router();

const passwordRules = body("password")
  .isLength({ min: 8 }).withMessage("Password must be at least 8 characters.")
  .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter.")
  .matches(/[0-9]/).withMessage("Password must contain a number.");

router.post(
  "/register",
  authLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required.").isLength({ max: 100 }),
    body("email").isEmail().normalizeEmail().withMessage("Valid email required."),
    passwordRules,
  ],
  validate,
  ctrl.register
);

router.post(
  "/login",
  authLimiter,
  [
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty(),
  ],
  validate,
  ctrl.login
);

router.post("/logout", requireAuth, ctrl.logout);
router.post("/refresh", ctrl.refresh);
router.get("/me", requireAuth, ctrl.getMe);

router.post(
  "/verify-email",
  [body("token").notEmpty()],
  validate,
  ctrl.verifyEmail
);

router.post(
  "/forgot-password",
  authLimiter,
  [body("email").isEmail().normalizeEmail()],
  validate,
  ctrl.forgotPassword
);

router.post(
  "/reset-password",
  authLimiter,
  [
    body("token").notEmpty(),
    passwordRules,
  ],
  validate,
  ctrl.resetPassword
);

module.exports = router;
