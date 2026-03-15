import UserFeature from "./user_feature";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import TaskCard from "@/components/projects/task/TaskCard";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (Number.isNaN(Number(id))) {
    return <h1>Invalid ID</h1>;
  }

  const session = await auth();
  let project;
  try {
    project = await prisma.project.findUnique({
      where: {
        id: Number(id),
      },
    });
  } catch {
    return <h1>Project not found and may by error too</h1>;
  }

  if (!session) {
    return <h1>You are not logged in</h1>;
  }

  if (!project) {
    return <h1>Project not found</h1>;
  }

  if (String(project.userId) !== session?.user?.id) {
    return <h1>You are not authorized to view this project</h1>;
  }

  let tasks = [];
  try {
    tasks = await prisma.task.findMany({
      where: {
        projectId: project.id,
      },
      include: {
        tags: true,
      },
    });
  } catch {
    return <h1>Tasks not found and may by error too</h1>;
  }

  return (
    <div>
      <div className="my-2">
        <UserFeature project={project} />
      </div>
      <div>Project Name: {project.name}</div>
      <div>
        <p>Tasks</p>
        <div className="grid 2xl:grid-cols-3 gap-2">
          {tasks.map((task) => (
            <TaskCard className="" key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
