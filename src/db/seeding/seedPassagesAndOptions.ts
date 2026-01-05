import fs from "fs/promises";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { passagesTable, optionsTable } from "../schema";
import rs from "text-readability";
import type { ItemContent } from "../../types/types";

const db = drizzle(process.env.DATABASE_URL!);

export default async function seedPassageAndOptions(): Promise<void> {
  const items: ItemContent[] | null = await getItems();
  if (!items) {
    throw new Error("No passages found.");
  }

  try {
    console.log("Seeding passages and options...");
    for (const item of items) {
      console.log(`Seeding ${item.title}...`);
      // Seed passage
      const readability = rs.fleschKincaidGrade(item.body);
      const [{ passageId }] = await db
        .insert(passagesTable)
        .values({
          title: item.title,
          body: item.body,
          ja_translation: item.ja_translation,
          cerf_level: item.cefr_level,
          unit: item.unit,
          readability_score: readability,
        })
        .returning({ passageId: passagesTable.id });

      // Seed answer key
      await db.insert(optionsTable).values({
        text: item.key,
        is_answer_key: true,
        passage_id: passageId,
      });

      // Seed distractors
      for (const dist of item.distractors) {
        await db.insert(optionsTable).values({
          text: dist,
          is_answer_key: false,
          passage_id: passageId,
        });
      }
    }
  } catch (error) {
    console.error(
      `!! Something went wrong when seeding the passages and options !!`
    );
    console.error(error);
  } finally {
    console.log("Seeding items complete.");
  }
}

// Helper
async function getItems(): Promise<ItemContent[] | null> {
  try {
    const fileUrl = new URL(
      "../../../assets/item-content.json",
      import.meta.url
    );
    const raw = await fs.readFile(fileUrl, { encoding: "utf8" });
    const items = JSON.parse(raw);
    return items;
  } catch (err) {
    console.error("Failed to load item-content.json:", err);
    return null;
  }
}

seedPassageAndOptions();
