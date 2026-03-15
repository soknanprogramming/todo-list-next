import UserFeature from "./user_feature";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

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
  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!session) {
    return <h1>You are not logged in</h1>;
  }

  if (!project) {
    return <h1>Project not found</h1>;
  }

  if (String(project.userId) !== session?.user?.id) {
    return <h1>You are not authorized to view this project</h1>;
  }

  return (
    <div>
      <div className="my-2">
        <UserFeature project={project}/>
      </div>
      <div>Project Name: {project.name}</div>
    </div>
  );
}
