"use server";

import { ActionResult } from "@/types/ActionResult";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function addTask(
    prevState: ActionResult | null,
    formData: FormData,
) : Promise<ActionResult> {
    const session = await auth();

    if (!session) {
        return { success: false, message: "Unauthorized" };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const priority = formData.get("priority") as string;
    const user_id = session?.user?.id as string;
    const project_id = formData.get("project_id") as string;
    
}





    


}