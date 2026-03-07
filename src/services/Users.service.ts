import { sql, eq, and, count } from "drizzle-orm";

import db from "@/db/index";
import {
  passagesTable,
  userPassageAttemptsTable,
  type UserPassageAttempts,
} from "@/db/schema";
import { UsersServiceInterface, CEFRLevelCountMap } from "@/types/types";

/**
 * Service for all user progress data access.
 * Consumed by server actions — never imported by client components.
 */
class UsersService implements UsersServiceInterface {
  /**
   * Upserts a user's attempt record for a passage. On the first attempt,
   * inserts a new row with `total_attempts: 1`. On subsequent attempts,
   * increments `total_attempts` and updates `correctly_answered` and
   * `last_attempted_at`.
   *
   * @throws {Error} If the upsert returns no rows.
   */
  async updatePassageAttempts(
    userId: string,
    passageId: number,
    correctlyAnswered: boolean,
  ): Promise<UserPassageAttempts> {
    const now = new Date();
    const rows = await db
      .insert(userPassageAttemptsTable)
      .values({
        user_id: userId,
        passage_id: passageId,
        correctly_answered: correctlyAnswered,
        last_attempted_at: now,
        total_attempts: 1,
      })
      .onConflictDoUpdate({
        target: [
          userPassageAttemptsTable.user_id,
          userPassageAttemptsTable.passage_id,
        ],
        set: {
          correctly_answered: correctlyAnswered,
          last_attempted_at: now,
          total_attempts: sql`${userPassageAttemptsTable.total_attempts} + 1`,
        },
      })
      .returning();

    if (rows.length === 0) {
      throw new Error("No user passages to update.");
    }

    const userPassageAttempts = rows[0];
    return userPassageAttempts;
  }

  async getCompletionStats(userId: string): Promise<CEFRLevelCountMap> {
    const rows = await db
      .select({
        complete: count(passagesTable.cefr_level),
        cefrLevel: passagesTable.cefr_level,
      })
      .from(passagesTable)
      .innerJoin(
        userPassageAttemptsTable,
        eq(passagesTable.id, userPassageAttemptsTable.passage_id),
      )
      .where(
        and(
          eq(userPassageAttemptsTable.correctly_answered, true),
          eq(userPassageAttemptsTable.user_id, userId),
        ),
      )
      .groupBy(passagesTable.cefr_level);

    const hash = new CEFRLevelCountMap();
    for (const row of rows) {
      hash.set(row.cefrLevel, row.complete);
    }
    return hash;
  }
}

const usersService = new UsersService();
export default usersService;
