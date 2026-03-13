"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProject(id: number, name: string) {
  await prisma.project.update({
    where: { id },
    data: { name },
  });

  revalidatePath("/projects/lists_project");
}