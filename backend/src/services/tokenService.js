// backend/src/services/tokenService.js
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const prisma = require("../config/db");

const generateAccessToken = (user) =>
  jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" }
  );

const generateRefreshToken = async (userId) => {
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await prisma.refreshToken.create({
    data: { token, userId, expiresAt },
  });

  return token;
};

/**
 * Rotate refresh token — invalidates the old one, issues a new one.
 * Returns { accessToken, refreshToken } or throws on invalid/expired token.
 */
const rotateRefreshToken = async (incomingToken) => {
  const existing = await prisma.refreshToken.findUnique({
    where: { token: incomingToken },
    include: { user: true },
  });

  if (!existing || existing.expiresAt < new Date()) {
    // If token is expired or not found, delete it if it exists and reject
    if (existing) await prisma.refreshToken.delete({ where: { id: existing.id } });
    throw Object.assign(new Error("Invalid or expired refresh token."), { statusCode: 401 });
  }

  // Delete the used token (rotation)
  await prisma.refreshToken.delete({ where: { id: existing.id } });

  // Issue new token pair
  const accessToken = generateAccessToken(existing.user);
  const refreshToken = await generateRefreshToken(existing.user.id);

  return { accessToken, refreshToken };
};

const revokeAllUserTokens = async (userId) => {
  await prisma.refreshToken.deleteMany({ where: { userId } });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  rotateRefreshToken,
  revokeAllUserTokens,
};
