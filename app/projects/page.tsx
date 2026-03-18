import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import ProjectItem from "@/components/projects/ProjectItem";
import AddProjectForm from "@/components/projects/AddProjectForm";

export default async function Project() {
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
      include: {
        _count: {
          select: {
            tasks: true,
          },
        },
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
    <div className="space-y-2">
      <AddProjectForm className="" />
      <div className="grid 2xl:grid-cols-3 gap-2">
        {projects.map((project) => (
          <ProjectItem className="rounded-sm" key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
