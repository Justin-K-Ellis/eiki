"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import itemService from "@/services/Items.service";
import usersService from "@/services/Users.service";

export async function scoreAnswer(
  optionId: number,
  passageId: number,
): Promise<boolean> {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    throw new Error("User not authenticated.");
  }
  const user = await currentUser();
  if (user === null) {
    throw new Error("User not found.");
  }

  try {
    const isCorrect = await itemService.scoreAnswer(passageId, optionId);
    await usersService.updatePassageAttempts(user.id, passageId, isCorrect);
    revalidatePath("/");
    return isCorrect;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong when scoring item.");
  }
}
