import "dotenv/config";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq, and, asc } from "drizzle-orm";

import {
  passagesTable,
  optionsTable,
  userPassageAttemptsTable,
} from "@/db/schema";
import db from "../db/index";
import type {
  ItemInterface,
  ItemsServiceInterface,
  UserItemProgress,
} from "@/types/types";

class ItemService implements ItemsServiceInterface {
  async getItemList(unitIdentifier: number): Promise<UserItemProgress[]> {
    // Get all passage ids and titles
    const titles = await db
      .select({ id: passagesTable.id, title: passagesTable.title })
      .from(passagesTable)
      .where(eq(passagesTable.unit, unitIdentifier))
      .orderBy(asc(passagesTable.readability_score));

    // Check auth status
    const { isAuthenticated } = await auth();
    if (!isAuthenticated) {
      throw new Error("User not authenticated.");
    }
    const user = await currentUser();

    // Get all user completion data
    const progressData = await db
      .select({
        correctlyAnswered: userPassageAttemptsTable.correctly_answered,
        totalAttempts: userPassageAttemptsTable.total_attempts,
        passageId: userPassageAttemptsTable.passage_id,
      })
      .from(userPassageAttemptsTable)
      .where(eq(userPassageAttemptsTable.user_id, user!.id));

    // Merge title list and user data
    const userItemProgressData: UserItemProgress[] = [];

    for (const title of titles) {
      // Add title data if user has answered before
      for (const row of progressData) {
        if (title.id === row.passageId) {
          const itemData: UserItemProgress = {
            id: title.id,
            title: title.title,
            correctlyAnswered: row.correctlyAnswered,
            totalAttempts: row.totalAttempts,
          };
          if (!userItemProgressData.some((item) => item.id === itemData.id)) {
            userItemProgressData.push(itemData);
          }
        }
      }
      // Add title data if user has not answered yet
      if (!userItemProgressData.some((item) => item.id === title.id)) {
        const itemData: UserItemProgress = {
          id: title.id,
          title: title.title,
          correctlyAnswered: false,
          totalAttempts: 0,
        };
        userItemProgressData.push(itemData);
      }
    }
    return userItemProgressData;
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

  async getUserItemProgress(passageId: number): Promise<{
    correctlyAnswered: boolean | null;
    totalAttempts: number | null;
  }> {
    const user = await currentUser();
    const [data] = await db
      .select({
        correctlyAnswered: userPassageAttemptsTable.correctly_answered,
        totalAttempts: userPassageAttemptsTable.total_attempts,
      })
      .from(userPassageAttemptsTable)
      .where(
        and(
          eq(userPassageAttemptsTable.passage_id, passageId),
          eq(userPassageAttemptsTable.user_id, user!.id),
        ),
      );
    return data;
  }

  async scoreAnswer(
    passageId: number,
    optionId: number,
  ): Promise<boolean | null> {
    const rows = await db
      .select({ isAnswerKey: optionsTable.is_answer_key })
      .from(optionsTable)
      .where(
        and(
          eq(optionsTable.id, optionId),
          eq(optionsTable.passage_id, passageId),
        ),
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
