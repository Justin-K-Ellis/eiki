import { auth, currentUser } from "@clerk/nextjs/server";
import { eq, and, asc, count } from "drizzle-orm";

import {
  passagesTable,
  optionsTable,
  userPassageAttemptsTable,
  CEFRLevel,
} from "@/db/schema";
import db from "@/db/index";
import type {
  ItemInterface,
  ItemsServiceInterface,
  UserItemProgress,
} from "@/types/types";

/**
 * Service for all item (passage + option) data access.
 * Consumed by server components and server actions — never imported by client components.
 */
class ItemService implements ItemsServiceInterface {
  /**
   * Returns all passages for a given unit along with the current user's
   * progress on each. Unattempted passages default to `correctlyAnswered: false`
   * and `totalAttempts: 0`.
   *
   * @throws {Error} If the user is not authenticated.
   */

  async getItemList(unitIdentifier: number): Promise<UserItemProgress[]> {
    // Check auth status
    const { isAuthenticated } = await auth();
    if (!isAuthenticated) {
      throw new Error("User not authenticated.");
    }

    const user = await currentUser();
    if (!user) {
      throw new Error("User not found.");
    }

    // Get all user completion data
    const rows = await db
      .select({
        id: passagesTable.id,
        title: passagesTable.title,
        correctlyAnswered: userPassageAttemptsTable.correctly_answered,
        totalAttempts: userPassageAttemptsTable.total_attempts,
      })
      .from(passagesTable)
      .leftJoin(
        userPassageAttemptsTable,
        and(
          eq(userPassageAttemptsTable.passage_id, passagesTable.id),
          eq(userPassageAttemptsTable.user_id, user.id),
        ),
      )
      .where(eq(passagesTable.unit, unitIdentifier))
      .orderBy(asc(passagesTable.readability_score));

    const results: UserItemProgress[] = rows.map((row) => ({
      id: row.id,
      title: row.title,
      correctlyAnswered: row.correctlyAnswered ?? false,
      totalAttempts: row.totalAttempts ?? 0,
    }));

    return results;
  }

  /**
   * Returns a passage and its options by passage ID.
   *
   * @throws {Error} If no passage with the given ID exists.
   */
  async getItem(id: number): Promise<ItemInterface> {
    const rows = await db
      .select()
      .from(passagesTable)
      .where(eq(passagesTable.id, id));

    if (rows.length === 0) {
      throw new Error("Passage not found.");
    }
    const passage = rows[0];

    const options = await db
      .select()
      .from(optionsTable)
      .where(eq(optionsTable.passage_id, passage.id))
      .orderBy(asc(optionsTable.text));

    return { passage, options };
  }

  /**
   * Returns whether the given option is the answer key for the given passage.
   *
   * @throws {Error} If the optionId does not belong to the passageId.
   */
  async scoreAnswer(passageId: number, optionId: number): Promise<boolean> {
    const rows = await db
      .select({ isAnswerKey: optionsTable.is_answer_key })
      .from(optionsTable)
      .where(
        and(
          eq(optionsTable.id, optionId),
          eq(optionsTable.passage_id, passageId),
        ),
      );

    if (rows.length === 0) {
      throw new Error("Option id does not match passage id.");
    }

    const isCorrect = rows[0].isAnswerKey;
    return isCorrect;
  }

  async getNumOfPassagesByCEFR(level: CEFRLevel): Promise<number> {
    const rows = await db
      .select({ count: count() })
      .from(passagesTable)
      .where(eq(passagesTable.cefr_level, level));

    return rows[0].count;
  }
}

const itemService = new ItemService();
export default itemService;
