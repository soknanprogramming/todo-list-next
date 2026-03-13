"use server";

import { ActionResult } from "@/types/ActionResult";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateTag(
  id: number,
  tag_name: string,
): Promise<ActionResult> {
  const session = await auth();
  if (!session) {
    return { success: false, message: "Unauthorized" };
  } else   if (!tag_name || tag_name.trim() === "") {
    return { success: false, message: "Tag is required" };
  }

  try {
    await prisma.tag.update({
        where: {
        id: id,
      },
      data: {
        name: tag_name,
      },
    })

    revalidatePath("/tags");

    return { success: true, message: "Tag added successfully" };
  } catch (error) {
    console.error("Error adding tag:", error);
    return { success: false, message: "Error adding tag" };
  }
}
