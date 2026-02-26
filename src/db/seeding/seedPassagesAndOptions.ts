import "dotenv/config";
import fs from "fs/promises";
import rs from "text-readability";
import * as z from "zod";
import { ItemContentSchema } from "../../types/types";

import { passagesTable, optionsTable } from "../schema";
import type { ItemContent } from "../../types/types";
import db from "../index";

/**
 * Seeds the `passages` and `options` tables from `assets/item-content.json`.
 *
 * For each item, computes a Flesch-Kincaid readability score and inserts the
 * passage, its answer key, and its distractors. Uses `onConflictDoNothing` so
 * the script is safe to re-run — existing passages and their options are
 * skipped entirely.
 */
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
      const rows = await db
        .insert(passagesTable)
        .values({
          title: item.title,
          body: item.body,
          ja_translation: item.ja_translation,
          cefr_level: item.cefr_level,
          unit: item.unit,
          readability_score: readability,
        })
        .returning({ passageId: passagesTable.id })
        .onConflictDoNothing();

      if (rows.length === 0) continue; // skip to next passage
      const [{ passageId }] = rows;

      // Seed answer key
      await db
        .insert(optionsTable)
        .values({
          text: item.key,
          is_answer_key: true,
          passage_id: passageId,
        })
        .onConflictDoNothing();

      // Seed distractors
      for (const dist of item.distractors) {
        await db
          .insert(optionsTable)
          .values({
            text: dist,
            is_answer_key: false,
            passage_id: passageId,
          })
          .onConflictDoNothing();
      }
    }
    console.log("Seeding items complete.");
  } catch (error) {
    console.error(
      `!! Something went wrong when seeding the passages and options !!`,
    );
    console.error(error);
  }
}

/**
 * Reads and validates `assets/item-content.json` against `ItemContentSchema`.
 * Returns the parsed items, or `null` if the file is missing or invalid.
 */
async function getItems(): Promise<ItemContent[] | null> {
  try {
    const fileUrl = new URL(
      "../../../assets/item-content.json",
      import.meta.url,
    );
    const raw = await fs.readFile(fileUrl, { encoding: "utf8" });
    const items = z.array(ItemContentSchema).parse(JSON.parse(raw));
    return items;
  } catch (err) {
    console.error("Failed to load item-content.json:", err);
    return null;
  }
}

seedPassageAndOptions();
