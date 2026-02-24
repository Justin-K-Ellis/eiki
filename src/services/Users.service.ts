import { sql } from "drizzle-orm";

import db from "@/db/index";
import {
  userPassageAttemptsTable,
  type UserPassageAttempts,
} from "@/db/schema";
import type { UsersServiceInterface } from "@/types/types";

class UsersService implements UsersServiceInterface {
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
}

const usersService = new UsersService();
export default usersService;
