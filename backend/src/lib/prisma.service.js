// =============================================================
// src/lib/prisma.service.ts
// Service NestJS wrappant PrismaClient v7
// Grâce au path alias tsconfig, PrismaClient est correctement résolu
// =============================================================
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
let PrismaService = class PrismaService {
    constructor() {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
        const adapter = new PrismaPg(pool);
        this.client = new PrismaClient({ adapter });
    }
    // Expose le client pour utilisation dans les services
    get db() {
        return this.client;
    }
    async onModuleInit() {
        await this.client.$connect();
    }
    async onModuleDestroy() {
        await this.client.$disconnect();
    }
};
PrismaService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], PrismaService);
export { PrismaService };
//# sourceMappingURL=prisma.service.js.map