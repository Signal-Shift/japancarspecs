import { PrismaClient } from "@prisma/client"

/**
 * SQLite URL is relative to the `prisma/` folder (see Prisma docs). Using
 * `file:./dev.db` creates `prisma/dev.db`, not a nested `prisma/prisma/` path.
 */
if (!process.env.DATABASE_URL?.trim()) {
  process.env.DATABASE_URL = "file:./dev.db"
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
