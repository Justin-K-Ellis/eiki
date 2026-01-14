import type { ItemsServiceInterface } from "@/types/types";
import { eq, and } from "drizzle-orm";
import { passagesTable, optionsTable } from "@/db/schema";
import "dotenv/config";
import { asc } from "drizzle-orm";
import { TitleData, ItemInterface } from "@/types/types";
import db from "../db/index";

class ItemService implements ItemsServiceInterface {
  async getItemList(unitIdentifier: number): Promise<TitleData[]> {
    const titles = await db
      .select({ id: passagesTable.id, title: passagesTable.title })
      .from(passagesTable)
      .where(eq(passagesTable.unit, unitIdentifier))
      .orderBy(asc(passagesTable.readability_score));
    return titles;
  }

  async getItem(id: number): Promise<ItemInterface> {
    const [passage] = await db
      .select()
      .from(passagesTable)
      .where(eq(passagesTable.id, id));

    const options = await db
      .select()
      .from(optionsTable)
      .where(eq(optionsTable.passage_id, passage.id))
      .orderBy(asc(optionsTable.text));

    return { passage, options };
  }

  async scoreAnswer(
    passageId: number,
    optionId: number
  ): Promise<boolean | null> {
    const rows = await db
      .select({ isAnswerKey: optionsTable.is_answer_key })
      .from(optionsTable)
      .where(
        and(
          eq(optionsTable.id, optionId),
          eq(optionsTable.passage_id, passageId)
        )
      );

    const isCorrect = rows[0].isAnswerKey;

    if (isCorrect === null) {
      console.error("Option id does not match passage id.");
      return null;
    }

    return isCorrect;
  }
}

const itemService = new ItemService();
export default itemService;
