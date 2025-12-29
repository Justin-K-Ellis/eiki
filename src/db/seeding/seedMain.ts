import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { unitsTable } from "../schema";
import type { UnitDTO } from "../schema";

import seedUnits from "./seedUnits";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  await seedUnits();
}

main();
