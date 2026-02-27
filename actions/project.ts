"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const addProject = async (
  prevState: { success: boolean; message: string },
  formData: FormData,
) => {
  const session = await auth();
  // Temporary debug
  console.log("SESSION:", JSON.stringify(session, null, 2));

  if (!session?.user?.id) {
    return { success: false, message: "Not authenticated" };
  }

  const projectName = formData.get("project_name");

  if (!projectName || typeof projectName !== "string") {
    return { success: false, message: "Project name required" };
  }

  try {
    await prisma.project.create({
      data: {
        name: projectName,
        userId: parseInt(session.user.id),
      },
    });
    return { success: true, message: "Project created ✅" };
  } catch (e) {
    return { success: false, message: "Something went wrong ❌" };
  }
};