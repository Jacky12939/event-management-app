// =============================================================
// src/lib/prisma.service.ts
// Service NestJS wrappant PrismaClient v7
// Grâce au path alias tsconfig, PrismaClient est correctement résolu
// =============================================================

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  // ✅ Correction : composition plutôt qu'héritage
  // "extends PrismaClient" casse avec les adapters Prisma v7
  private client: PrismaClient;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    this.client = new PrismaClient({ adapter } as any);
  }

  // Expose le client pour utilisation dans les services
  get db() {
    return this.client;
  }

  async onModuleInit() {
    await (this.client as any).$connect();
  }

  async onModuleDestroy() {
    await (this.client as any).$disconnect();
  }
}