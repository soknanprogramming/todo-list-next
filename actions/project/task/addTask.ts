"use server";

import { ActionResult } from "@/types/ActionResult";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import z from "zod";

const addTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(20, { message: "Title must be less than 20 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(200, { message: "Description must be less than 200 characters" }),
});

export async function addTask(
  prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const session = await auth();

  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const completed: boolean = false;
  const dueDateString = formData.get("due_date") as string;
  const dueDate = new Date(dueDateString);
  const priority = formData.get("priority") as string;
  const priorityNumber = Number(priority);
  if (isNaN(priorityNumber)) {
    return { success: false, message: "Invalid priority" };
  } else if (![1, 2, 3].includes(priorityNumber)) {
    return { success: false, message: "Priority must be 1, 2, or 3" };
  }
  const user_id = session?.user?.id as string;
  const project_id = formData.get("project_id") as string;
  const tags = formData.getAll("tags") as string[];

  const result = addTaskSchema.safeParse({
    title,
    description,
  });

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues.map((error) => error.message).join(", "),
    };
  }

  // check what this project belong to this user
  const project = await prisma.project.findUnique({
    where: {
      id: Number(project_id),
    },
  });

  if (!project) {
    return { success: false, message: "Project not found" };
  } else if (project.userId !== Number(user_id)) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.task.create({
      data: {
        title,
        description,
        completed,
        dueDate,
        priority: priorityNumber,
        userId: Number(user_id),
        projectId: Number(project_id),
        tags: {
          connect: tags.map((id) => ({ id: Number(id) })),
        },
      },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }

  return {
    success: true,
    message: "Task added successfully",
  };
}
