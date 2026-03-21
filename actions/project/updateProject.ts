"use server";

import prisma from "@/lib/prisma";
import { ActionResult } from "@/types/ActionResult";
import { auth } from "@/auth";
import z from "zod";

const updateProjectSchema = z.object({
  project_name: z
    .string()
    .min(1, { message: "Project name required" })
    .max(20, { message: "Project name must be less than 20 characters" }),
});

export async function updateProject(
  prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: "Not authenticated" };
  }

  const id = formData.get("id") as string;
  const result = updateProjectSchema.safeParse({
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

  if (!id || isNaN(Number(id))) {
    return { success: false, message: "Invalid project ID" };
  }

  try {
      await prisma.project.update({
    where: { id: Number(id) },
    data: { name: project_name },
  });
    return { success: true, message: "Project updated" };
  } catch (e) {
    return { success: false, message: `Something went wrong: ${e}` };
  }
}
