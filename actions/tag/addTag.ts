"use server";

import { ActionResult } from "@/types/ActionResult";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function addTag(
  prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const session = await auth();
  if (!session) {
    return { success: false, message: "Unauthorized" };
  }
  const tag = formData.get("tag") as string;

  if (!tag || tag.trim() === "") {
    return { success: false, message: "Tag is required" };
  }

  try {
    await prisma.tag.create({
      data: {
        name: tag,
      },
    });

    return { success: true, message: "Tag added successfully" };
  } catch (error) {
    console.error("Error adding tag:", error);
    return { success: false, message: "Error adding tag" };
  }
}
