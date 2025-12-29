import fs from "fs/promises";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { passagesTable, optionsTable } from "../schema";
import rs from "text-readability";

const db = drizzle(process.env.DATABASE_URL!);

export default async function seedPassageAndOptions(): Promise<void> {
  const passages = await getPassages();
  if (!passages) {
    throw new Error("No passages found.");
  }

  try {
    console.log("Seeding passages and options");
    for (const passage of passages) {
      // Seed passage
      const readability = rs.fleschKincaidGrade(passage.body);
      const passageId = await db
        .insert(passagesTable)
        .values({
          body: passage.body,
          ja_translation: passage.ja_translation,
          cerf_level: passage.cefr_level,
          unit_id: passage.unit_id,
          readability_score: readability,
        })
        .returning({ passageId: passagesTable.id });

      // Seed answer key
      await db.insert(optionsTable).values({
        text: passage.key,
        is_answer_key: true,
        passage_id: passageId[0].passageId,
      });

      // Seed distractors
      for (const dist of passage.distractors) {
        await db.insert(optionsTable).values({
          text: dist,
          is_answer_key: false,
          passage_id: passageId[0].passageId,
        });
      }
    }
  } catch (error) {
    console.error(
      `!! Something went wrong when seeding the passages and options !!`
    );
    console.error(error);
  }
}

// Helper
async function getPassages(): Promise<unknown[] | null> {
  try {
    const fileUrl = new URL(
      "../../../assets/item-content.json",
      import.meta.url
    );
    const raw = await fs.readFile(fileUrl, { encoding: "utf8" });
    const passages = JSON.parse(raw);
    return passages;
  } catch (err) {
    console.error("Failed to load item-content.json:", err);
    return null;
  }
}

seedPassageAndOptions();
