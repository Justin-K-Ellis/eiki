"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import itemService from "@/services/Items.service";
import usersService from "@/services/Users.service";

export async function scoreAnswer(
  optionId: number,
  passageId: number
): Promise<boolean | null> {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) return null;
  const user = await currentUser();
  if (user === null) return null;

  try {
    const isCorrect = await itemService.scoreAnswer(passageId, optionId);
    await usersService.updatePassageAttempts(user.id, passageId, isCorrect!);
    return isCorrect;
  } catch (error) {
    console.error(error);
    return null;
  }
}
