import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import ProjectItem from "@/components/projects/ProjectItem";

export default async function ListsProject() {
  const session = await auth();

  if (!session?.user?.id) {
    return <div>Not logged in</div>;
  }

  let projects = [];

  try {
    projects = await prisma.project.findMany({
      where: {
        userId: parseInt(session?.user?.id ?? "0"),
      },
      orderBy: {
        id: "desc", // 'asc' = oldest first, 'desc' = newest first
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    // throw new Error("Error fetching projects");
    return <div>Error fetching projects</div>;
  }

  return (
    <div>
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}
