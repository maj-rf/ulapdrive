import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

// Prevent multiple instances of Prisma Client in development (hot reloading can create new instances)
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
