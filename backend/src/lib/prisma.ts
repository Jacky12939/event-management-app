// =============================================================
// src/lib/prisma.ts
// Singleton PrismaClient — Prisma v7 avec adapter pg
// Le path alias dans tsconfig.json fait pointer @prisma/client
// vers le client réellement généré dans node_modules/.prisma/client
// =============================================================

import { PrismaClient } from "@prisma/client";

// Utilise l'initialisation standart en local :
export const prisma = new PrismaClient();

export default prisma;
