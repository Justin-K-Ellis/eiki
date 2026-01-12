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

  console.log(`
    passage: ${passageId}
    option: ${optionId}
    `);
  const isCorrect = await itemService.scoreAnswer(passageId, optionId);
  console.log(`Got it right? ${isCorrect}`);
  //   const userPassageData = usersService.updatePassageAttempts(
  //     parseInt(user.id),
  //     passageId,
  //     isCorrect
  //   );

  //   return isCorrect;
}
