import { sql, eq, and, count } from "drizzle-orm";

import db from "@/db/index";
import {
  CEFRLevel,
  passagesTable,
  userPassageAttemptsTable,
  type UserPassageAttempts,
} from "@/db/schema";
import type { UsersServiceInterface } from "@/types/types";

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

  async getNumOfCompletedPassagesByCEFR(
    userId: string,
    level: CEFRLevel,
  ): Promise<number> {
    const rows = await db
      .select({ count: count() })
      .from(userPassageAttemptsTable)
      .innerJoin(
        passagesTable,
        eq(userPassageAttemptsTable.passage_id, passagesTable.id),
      )
      .where(
        and(
          eq(userPassageAttemptsTable.correctly_answered, true),
          eq(passagesTable.cefr_level, level),
          eq(userPassageAttemptsTable.user_id, userId),
        ),
      );
    return rows[0].count;
  }
}

const usersService = new UsersService();
export default usersService;
