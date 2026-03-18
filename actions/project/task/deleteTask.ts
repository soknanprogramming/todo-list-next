"use server";

import { ActionResult } from "@/types/ActionResult";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function deleteTask(
  prevState: ActionResult | null,
  formDate: FormData,
): Promise<ActionResult> {
  const session = await auth();
  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  const taskId = formDate.get("taskId") as string;

  const task = await prisma.task.findUnique({
    where: {
        id: Number(taskId)
    }
  })


  if (!task) {
    return { success: false, message: "Task not found" };
  } else if (task.userId !== Number(session.user?.id)) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.task.delete({
        where: {
            id: Number(taskId)
        }
    })
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong"}
  }
  return { success: true, message: "Task delete successfully"}
}
