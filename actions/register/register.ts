"use server"

import prisma from "@/lib/prisma";
import z from "zod";
import { ActionResult } from "@/types/ActionResult";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" }),
  email: z.string().email({ message: "Invalid email address" }).max(20, {
    message: "Email must be at most 20 characters long",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(30, {
      message: "Password must be at most 20 characters long",
    }),
});

export async function register(
  prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const result = registerSchema.safeParse({
    username,
    email,
    password,
  });

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues.map((e) => e.message).join(", "),
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (user) {
      return { success: false, message: "User already exists" };
    }
  } catch (e) {
    console.error("Failed to check if user exists:", e);
    return { success: false, message: "Failed to check if user exists" };
  }

  try {
    await prisma.user.create({
      data: {
        name: username as string,
        email: email as string,
        password: password as string,
      },
    });
    return { success: true, message: "User created" };
  } catch (e) {
    console.error("Failed to create user:", e);
    return { success: false, message: "Failed to create user" };
  }
}
