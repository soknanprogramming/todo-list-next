"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProject(id: number) {
  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/projects/lists_project");
}