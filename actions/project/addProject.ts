"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import z from "zod";

const addProjectSchema = z.object({
  project_name: z
    .string()
    .min(1, { message: "Project name required" })
    .max(20, { message: "Project name must be less than 20 characters" }),
});

export const addProject = async (
  prevState: { success: boolean; message: string },
  formData: FormData,
): Promise<{ success: boolean; message: string }> => {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: "Not authenticated" };
  }

  const result = addProjectSchema.safeParse({
    project_name: formData.get("project_name"),
  });

  if (!result.success) {
    return {
      success: false,
      message:
        result.error.issues.map((e) => e.message).join(", ") || "Invalid input",
    };
  }

  const { project_name } = result.data;

  if (!project_name || typeof project_name !== "string") {
    return { success: false, message: "Project name required" };
  }

  try {
    await prisma.project.create({
      data: {
        name: project_name,
        userId: parseInt(session.user.id),
      },
    });
    return { success: true, message: "Project created" };
  } catch (e) {
    return { success: false, message: `Something went wrong: ${e}` };
  }
};
