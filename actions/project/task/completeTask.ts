"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { ActionResult } from "@/types/ActionResult";

export async function completeTask(
  prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const session = await auth();

  const taskId = Number(formData.get("taskId"));
  const completed: boolean = formData.get("taskCompleted") === "true";

  if (!session) {
    return { success: false, message: "Unauthorized" };
  }
  const user_id = session?.user?.id as string;

  // user_id have permission to this task or not
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      return { success: false, message: "Task not found" };
    } else if (task.userId !== Number(user_id)) {
      return { success: false, message: "Unauthorized" };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }

  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        completed: !completed,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }

  if (!completed) {
    return {
      success: true,
      message: "Task completed successfully",
    };
  } else {
    return {
      success: true,
      message: "Task changed uncompleted",
    };
  }
}
