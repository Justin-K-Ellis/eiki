import type { ItemsServiceInterface } from "@/types/types";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { passagesTable, optionsTable } from "@/db/schema";
import "dotenv/config";
import { asc } from "drizzle-orm";
import { TitleData, ItemInterface } from "@/types/types";

class ItemService implements ItemsServiceInterface {
  private db = drizzle(process.env.DATABASE_URL!);

  async getItemList(unitIdentifier: number): Promise<TitleData[]> {
    const titles = await this.db
      .select({ id: passagesTable.id, title: passagesTable.title })
      .from(passagesTable)
      .where(eq(passagesTable.unit, unitIdentifier))
      .orderBy(asc(passagesTable.readability_score));
    return titles;
  }

  async getItem(id: number): Promise<ItemInterface> {
    const [passage] = await this.db
      .select()
      .from(passagesTable)
      .where(eq(passagesTable.id, id));

    const options = await this.db
      .select()
      .from(optionsTable)
      .where(eq(optionsTable.passage_id, passage.id))
      .orderBy(asc(optionsTable.text));

    return { passage, options };
  }
}

const itemService = new ItemService();
export default itemService;
