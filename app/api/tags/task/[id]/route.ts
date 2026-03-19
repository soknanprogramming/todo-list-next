import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized not logged in" }, { status: 401 });
  }

  const { id: taskIdParam } = await params; // ✅ unwrap the Promise
  const taskId = Number(taskIdParam);

  if (isNaN(taskId))
    return NextResponse.json({ message: "Invalid task id" }, { status: 400 });

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: { userId: true },
    });
    // check authorization
    if (task?.userId !== Number(session?.user?.id)) {
        // console.log(`userId ${task?.userId} !== session?.user?.id ${session?.user?.id}`)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { message: "Error fetching task" },
      { status: 500 },
    );
  }

  try {
    const resultTaskOnlyTask = await prisma.task.findUnique({
      where: { id: taskId },
      select: {
        tags: true,
      },
    });
    const tags = resultTaskOnlyTask?.tags ?? [];

    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { message: "Error fetching tags" },
      { status: 500 },
    );
  }
}
