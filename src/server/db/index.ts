import { PrismaClient } from "@prisma/client/extension";

const createPrismaClient = () => {
  const prisma = new PrismaClient();
  return prisma;
}

const globalPrismaClient = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
}

export const db = globalPrismaClient.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalPrismaClient.prisma = db;
}