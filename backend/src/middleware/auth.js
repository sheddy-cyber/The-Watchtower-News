// backend/src/middleware/auth.js
const jwt = require("jsonwebtoken");

/**
 * Require a valid JWT access token.
 * Attaches decoded user payload to req.user.
 */
const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required." });
  }

  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload; // { sub: userId, email, role }
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired.", code: "TOKEN_EXPIRED" });
    }
    return res.status(401).json({ error: "Invalid token." });
  }
};

/**
 * Optional auth — attaches user if token present, but never blocks.
 */
const optionalAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    try {
      req.user = jwt.verify(header.slice(7), process.env.JWT_ACCESS_SECRET);
    } catch {
      // silently ignore invalid/expired tokens
    }
  }
  next();
};

/**
 * Require a specific role (e.g. 'ADMIN').
 */
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Insufficient permissions." });
  }
  next();
};

module.exports = { requireAuth, optionalAuth, requireRole };
