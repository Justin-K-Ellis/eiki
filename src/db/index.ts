import { drizzle } from "drizzle-orm/node-postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set.");
}

const db = drizzle(process.env.DATABASE_URL);

export default db;
