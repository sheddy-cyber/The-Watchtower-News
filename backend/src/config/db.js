// backend/src/config/db.js
const { PrismaClient } = require("@prisma/client");

// Singleton pattern — prevents multiple Prisma instances in dev hot-reloads
const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

module.exports = prisma;
