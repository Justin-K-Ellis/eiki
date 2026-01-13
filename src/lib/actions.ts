"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import itemService from "@/services/Items.service";
import usersService from "@/services/Users.service";

export async function scoreAnswer(
  optionId: number,
  passageId: number
): Promise<void> {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) return;
  const user = await currentUser();
  if (user === null) return;

  try {
    const isCorrect = await itemService.scoreAnswer(passageId, optionId);
    const userPassageData = await usersService.updatePassageAttempts(
      user.id,
      passageId,
      isCorrect
    );
    console.log(userPassageData);
  } catch (error) {
    console.error(error);
  }
}
