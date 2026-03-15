"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function refreshAndRedirect(path: string = "/") {
  revalidatePath(path, "layout");
  redirect(path);
}