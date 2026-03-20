"use server";

import { ActionResult } from "@/types/ActionResult";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import z from "zod";

const addTagSchema = z.object({
  tag: z
    .string()
    .min(1, { message: "Tag is required" })
    .max(10, { message: "Tag must be less than 10 characters" }),
});

export async function addTag(
  prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const session = await auth();
  if (!session) {
    return { success: false, message: "Unauthorized" };
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

  const { tag } = result.data;

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
