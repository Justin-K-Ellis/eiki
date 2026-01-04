import type { ItemsServiceInterface } from "@/types/types";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { passagesTable } from "@/db/schema";
import "dotenv/config";
import { asc } from "drizzle-orm";
import { TitleData } from "@/types/types";

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
}

const itemService = new ItemService();
export default itemService;
