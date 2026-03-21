"use client";

import BackButton from "@/components/button/BackButton";
import WindowAddTask from "@/components/projects/task/WindowAddTask";
import { Project } from "@/generated/prisma/client";
import { useRememberTaskParam } from "@/stores/useRememberTaskParam";
import { useState } from "react";

interface Props {
  project: Project;
}


export default function UserFeature({ project }: Props) {
  const [openAddTaskWindow, setOpenAddTaskWindow] = useState<boolean>(false);
  const { setUnVisit } = useRememberTaskParam();


  return (
    <nav className="">
      <div className="flex space-x-1">
        <BackButton onClick={setUnVisit} url="/projects" className="hover:cursor-pointer bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 hover:text-white px-1 py-0.5 rounded-sm">
          Go Back
        </BackButton>
        <button onClick={() => setOpenAddTaskWindow(true)} className="hover:cursor-pointer bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 hover:text-white px-1 py-0.5 rounded-sm">Add Task</button>
      </div>
      {
        openAddTaskWindow && <WindowAddTask project={project} onClose={() => setOpenAddTaskWindow(false)} />
      }
    </nav>
  );
}
