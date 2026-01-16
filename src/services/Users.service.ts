import "dotenv/config";
import { sql } from "drizzle-orm";
import type { UsersServiceInterface } from "@/types/types";
import db from "../db/index";
import { userPassageAttemptsTable } from "@/db/schema";
import { UserPassageAttempts } from "@/db/schema";

class UsersService implements UsersServiceInterface {
  async updatePassageAttempts(
    userId: string,
    passageId: number,
    correctlyAnswered: boolean
  ): Promise<UserPassageAttempts> {
    const rows = await db
      .insert(userPassageAttemptsTable)
      .values({
        user_id: userId,
        passage_id: passageId,
        correctly_answered: correctlyAnswered,
        last_attempted_at: new Date(),
        total_attempts: 1,
      })
      .onConflictDoUpdate({
        target: [
          userPassageAttemptsTable.user_id,
          userPassageAttemptsTable.passage_id,
        ],
        set: {
          correctly_answered: correctlyAnswered,
          last_attempted_at: new Date(),
          total_attempts: sql`${userPassageAttemptsTable.total_attempts} + 1`,
        },
      })
      .returning();

    const userPassageAttempts = rows[0];
    return userPassageAttempts;
  }
}

const usersService = new UsersService();
export default usersService;
