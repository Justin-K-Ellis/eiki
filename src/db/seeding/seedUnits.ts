import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { unitsTable } from "../schema";
import type { UnitDTO } from "../schema";

const db = drizzle(process.env.DATABASE_URL!);

export default async function seedUnits() {
  const units: UnitDTO[] = [
    {
      en_name: "Unit 1 (A1)",
      ja_name: "単元１（A1）",
      cefr_level: "A1",
      unit_identifier: 1,
    },
    {
      en_name: "Unit 2 (A2)",
      ja_name: "単元２（A2）",
      cefr_level: "A2",
      unit_identifier: 2,
    },
    {
      en_name: "Unit 3 (B1)",
      ja_name: "単元３（B1）",
      cefr_level: "B1",
      unit_identifier: 3,
    },
    {
      en_name: "Unit 4 (B2)",
      ja_name: "単元４（B2）",
      cefr_level: "B2",
      unit_identifier: 4,
    },
    {
      en_name: "Unit 5 (C1)",
      ja_name: "単元５（C1）",
      cefr_level: "C1",
      unit_identifier: 5,
    },
    {
      en_name: "Unit 6 (C2)",
      ja_name: "単元６（C2）",
      cefr_level: "C2",
      unit_identifier: 6,
    },
  ];

  try {
    console.log("Seeding units...");
    for (const unit of units) {
      await db.insert(unitsTable).values(unit);
    }
    console.log("Units seeded.");
  } catch (error) {
    console.warn(`!! Something went wrong when seeding the DB !!\n`);
    console.error(error);
  }
}
