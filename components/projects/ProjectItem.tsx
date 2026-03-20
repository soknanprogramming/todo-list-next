"use client";

import { useState, useActionState, startTransition, useEffect } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { updateProject } from "@/actions/project/updateProject";
import { deleteProject } from "@/actions/project/deleteProject";
import { Project } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { IoMdEye } from "react-icons/io";

interface ProjectWithCount extends Project {
  _count: { tasks: number };
}
interface Props {
  project: ProjectWithCount;
  className?: string;
}

export default function ProjectItem({ project, className = ""}: Props) {
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(project.name);
  const [savedByKey, setSavedByKey] = useState<boolean>(false); // track Enter key save
  const [stateUpdateProject, updateProjectAction] = useActionState(updateProject, null);

  const router = useRouter();

  useEffect(() => {
    if (!stateUpdateProject?.message) return;

    alert(stateUpdateProject.message);
    router.refresh();
  }, [stateUpdateProject, router]);


  async function save() {
    if (project.name === name) {
      setEditing(false);
      setSavedByKey(false);
      return;
    }

    const confirmed: boolean = confirm(
      `Are you sure you want to save this project name "${name}"?`,
    );

    if (confirmed) {
      const formData = new FormData();
      formData.append("id", project.id.toString());
      formData.append("project_name", name);
      startTransition(() => {
        updateProjectAction(formData); // call inside startTransition
      });
      
    } else {
      setName(project.name);
    }
    setEditing(false);
    setSavedByKey(false); // reset the flag
  }

  async function handleDelete() {
    const confirmed: boolean = confirm(
      `Are you sure you want to delete this project name ${project.name} ?`,
    );

    if (confirmed) {
      // Call the server action
      await deleteProject(project.id);
      // Optionally, re-render or notify parent component
      console.log("Project deleted");
    }
  }

  return (
    <div className={`${className} bg-amber-200 p-2 flex items-center justify-between`}>
      {editing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => {
            if (!savedByKey) save(); // only call if not already saved via Enter
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setSavedByKey(true);
              save();
            }
            if (e.key === "Escape") {
              setName(project.name);
              setEditing(false);
              setSavedByKey(false);
            }
          }}
          className="border px-2"
          autoFocus
        />
      ) : (
        <p className="text-lg text-red-900">{project.name}</p>
      )}

      <div className="flex space-x-2">
        <div className="flex items-center">
          <p className="text-gray-500 text-sm">Tasks: {project._count.tasks}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleDelete}
            className="bg-red-300 rounded-sm hover:cursor-pointer hover:bg-red-400 p-1"
          >
            <RiDeleteBin2Line />
          </button>

          <button
            onClick={() => setEditing(true)}
            className="bg-blue-300 rounded-sm hover:cursor-pointer hover:bg-blue-400 p-1"
          >
            <MdDriveFileRenameOutline />
          </button>
          <button
            onClick={() => router.push(`/projects/lists_project/${project.id}`)}
            className="bg-green-300 rounded-sm hover:cursor-pointer hover:bg-green-400 p-1"
          >
            <IoMdEye />
          </button>
        </div>
      </div>
    </div>
  );
}
