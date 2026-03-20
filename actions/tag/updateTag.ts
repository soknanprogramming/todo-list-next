"use server";

import { ActionResult } from "@/types/ActionResult";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import z from "zod";

const addTagSchema = z.object({
  tag: z
    .string()
    .min(1, { message: "Tag is required" })
    .max(10, { message: "Tag must be less than 10 characters" }),
});

export async function updateTag(
  prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const session = await auth();

  const id = formData.get("id") as string;

  if (!id || isNaN(Number(id))) {
    return { success: false, message: "Invalid tag ID" };
  }

  const result = addTagSchema.safeParse({
    tag: formData.get("tag"),
  });

  if (!result.success) {
    return {
      success: false,
      message:
        result.error.issues.map((e) => e.message).join(", ") || "Invalid input",
    };
  }

  const { tag: tag_name } = result.data;

  if (!session) {
    return { success: false, message: "Unauthorized" };
  } else if (!tag_name || tag_name.trim() === "") {
    return { success: false, message: "Tag is required" };
  }

  try {
    await prisma.tag.update({
      where: {
        id: Number(id),
      },
      data: {
        name: tag_name,
      },
    });

    revalidatePath("/tags");

    return { success: true, message: "Tag added successfully" };
  } catch (error) {
    console.error("Error adding tag:", error);
    return { success: false, message: "Error adding tag" };
  }
}
