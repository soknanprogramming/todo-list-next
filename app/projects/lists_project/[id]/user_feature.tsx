"use client";

import BackButton from "@/components/button/BackButton";
import WindowAddTask from "@/components/projects/task/WindowAddTask";
import { Project } from "@/generated/prisma/client";
import { useState } from "react";

interface Props {
  project: Project;
}


export default function UserFeature({ project }: Props) {
  const [openAddTaskWindow, setOpenAddTaskWindow] = useState<boolean>(false);

  return (
    <>
      <div className="flex space-x-1">
        <BackButton className="border px-1 py-0.5 rounded-sm">
          Go Back
        </BackButton>
        <button onClick={() => setOpenAddTaskWindow(true)} className="border px-1 py-0.5 rounded-sm">Add Task</button>
      </div>
      {
        openAddTaskWindow && <WindowAddTask project={project} onClose={() => setOpenAddTaskWindow(false)} />
      }
    </>
  );
}
