// =============================================================
// src/lib/prisma.ts
// Singleton PrismaClient — Prisma v7 avec adapter pg
// Le path alias dans tsconfig.json fait pointer @prisma/client
// vers le client réellement généré dans node_modules/.prisma/client
// =============================================================

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter } as any);

export default prisma;