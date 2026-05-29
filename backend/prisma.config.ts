// =============================================================
// prisma.config.ts  (racine du dossier backend/)
// Prisma v7.8 — structure conforme aux vrais types @prisma/config
// Causes des erreurs corrigées :
//   - "migrate" → n'existe pas, la bonne clé est "migrations"
//   - "migrations" ne prend pas d'adapter (adapter = PrismaClient uniquement)
//   - "earlyAccess" n'existe pas non plus dans PrismaConfig
// =============================================================

import { defineConfig } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
  schema: './prisma/schema.prisma',

  // ✅ Requis pour que "prisma migrate dev" trouve la base
  datasource: {
    url: process.env.DATABASE_URL as string,
  },

  // ✅ Nom correct : "migrations" (pas "migrate")
  // Optionnel : configure le dossier des fichiers de migration
  migrations: {
    path: './prisma/migrations',
  },
});