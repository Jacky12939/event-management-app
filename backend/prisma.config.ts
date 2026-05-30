

import { defineConfig } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
  schema: './prisma/schema.prisma',

  // Requis pour que "prisma migrate dev" trouve la base
  datasource: {
    url: process.env.DATABASE_URL as string,
  },


  migrations: {
    path: './prisma/migrations',
  },
});