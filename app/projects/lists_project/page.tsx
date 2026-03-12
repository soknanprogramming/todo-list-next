import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import ProjectItem from "@/components/ProjectItem";

export default async function ListsProject() {
  const session = await auth();

  if (!session?.user?.id) {
    return <div>Not logged in</div>;
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: parseInt(session?.user?.id ?? "0"),
    },
    orderBy: {
      id: "desc", // 'asc' = oldest first, 'desc' = newest first
    },
  });

  return (
    <div>
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}
