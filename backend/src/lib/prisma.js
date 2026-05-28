import { PrismaClient } from "@prisma/client";
let prisma;
// Si on est en local avec SQLite, on initialise le client simplement
if (process.env.DATABASE_URL?.startsWith("file:")) {
    prisma = new PrismaClient();
}
else {
    // C'est le code de tes camarades pour la production / Docker (PostgreSQL)
    const { Pool } = require("pg");
    const { PrismaPg } = require("@prisma/adapter-pg");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter });
}
export { prisma };
export default prisma;
//# sourceMappingURL=prisma.js.map