import { defineCdnfig } from "@prisma/config";

export default defineConfig({
  earlyAccess: true,
  datasource:{
   url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/eventdb"
 }
});
